import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Editor } from "@tinymce/tinymce-react";

function EditBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("draft");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    content: "",
    excerpt: "",
    category_id: "",
    status: "draft",
    image: null, // simpan file
  });

  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const admin_id = sessionStorage.getItem("adminID");

  // ambil kategori dari API
  const handleCancle = () => {
    MySwal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak akan bisa mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, batal!",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire("Dibatalkan!", "Perubahan tidak disimpan.", "success");
        navigate("/admin/dashboard", { state: { page: "blog" } });
      }
    });
  };

  const createExcerpt = (text, wordLimit = 20) => {
    const words = text.split(" ");
    return (
      words.slice(0, wordLimit).join(" ") +
      (words.length > wordLimit ? "..." : "")
    );
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/categories")
      .then((res) => setCategories(res.data.data || res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/blogs/${id}`);
        const blog = res.data.data;
        // console.log(blog);
        setForm({
          title: blog.title || "",
          content: blog.content || "",
          excerpt: blog.excerpt || "",
          category_id: blog.category_id || "",
          status: blog.status || "",
        });
        // set preview ke gambar lama
        if (blog.featured_image) {
          setPreview(`http://localhost:8000/storage/${blog.featured_image}`);
        }
      } catch (err) {
        console.error("Gagal mengambil data blog", err);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    if (!e || !e.target) return;

    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFeaturedImage(files && files[0]);
      setPreview(URL.createObjectURL(files[0])); // buat preview
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      payload.append("title", form.title);
      payload.append("content", form.content);
      payload.append("excerpt", form.excerpt);
      payload.append("category_id", form.category_id);
      payload.append("status", form.status);

      if (featuredImage) {
        payload.append("featured_image", featuredImage);
      }
      payload.append("meta_title", title);
      payload.append("meta_description", createExcerpt(content, 20));

      // gunakan method override supaya Laravel menerima sebagai PUT
      payload.append("_method", "PUT");

      await axios.post(`http://localhost:8000/api/blogs/${id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // kembalikan ke Admin Dashboard dan render page 'blog'
      // jika kamu pakai state (setActivePage) pas di parent, gunakan itu:
      if (typeof setActivePage === "function") {
        setActivePage("blog");
      } else {
        // fallback: gunakan navigate dengan state
        navigate("/admin/dashboard", { state: { page: "blog" } });
      }

      setMessage("Blog berhasil diubah!");
      MySwal.fire("Diubah!", "Blog berhasil diubah!", "success");
      navigate("/admin/dashboard", { state: { page: "blog" } });
    } catch (err) {
      console.error(err);
      setMessage("Gagal menambahkan blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-15 bg-white p-6 rounded-xl ">
      <div className="flex ">
        <h1 className="text-2xl font-bold mb-4">Tambah Blog</h1>
      </div>
      {message && <p className="mb-4 text-blue-600">{message}</p>}

      <form onSubmit={handleSubmit} method="POST" className="space-y-4">
        {/* Judul */}
        <div>
          <label className="block font-medium">Judul</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>

        {/* Konten */}
        {/* <div>
          <label className="block font-medium">Konten</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows="6"
            className="w-full border p-2 rounded-md"
          />
        </div> */}
        <div>
          <label className="block font-medium mb-2">Konten</label>
          <Editor
            apiKey="g439ip37desi0389rkv49zztfy42nk9kik6fun5x3ii2dpf6" // bisa pakai gratis, atau daftar untuk API key
            init={{
              height: 400,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
                         alignleft aligncenter alignright alignjustify | \
                         bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={(newContent) =>
              setForm((prev) => ({ ...prev, content: newContent }))
            }
          />
        </div>

        {/* Kategori */}
        <div>
          <label className="block font-medium">Kategori</label>
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          >
            <option value="">Pilih kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Upload Gambar */}
        <div>
          <label className="block font-medium">Featured Image</label>
          <input
            name="featured_image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {preview && (
          <div className="mt-4">
            <p className="text-gray-600">Preview:</p>
            <img src={preview} alt="Preview" className="w-48 rounded shadow" />
          </div>
        )}

        {/* Tombol Simpan */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
          <button
            type="button"
            onClick={handleCancle}
            className="bg-red-600 text-white px-4 py-2 ml-2 rounded-md hover:bg-red-700"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBlog;
