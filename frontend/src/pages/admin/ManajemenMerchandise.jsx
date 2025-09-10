// File: src/pages/admin/ManajemenMerchandise.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function ManajemenMerchandise() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");

  const [merchandises, setMerchandises] = useState([]);
  const [editMerchId, setEditMerchId] = useState(null);

  const [merchName, setMerchName] = useState("");
  const [merchPrice, setMerchPrice] = useState("");
  const [merchStock, setMerchStock] = useState("");
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizeInput, setSizeInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const token = sessionStorage.getItem("adminToken");

  // ===============================
  // Fetch Categories
  // ===============================
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/admin/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
      if (!selectedCategory && res.data.length > 0) setSelectedCategory(res.data[0].id);
    } catch (err) {
      console.error("Error fetch categories:", err);
    }
  };

  // ===============================
  // Fetch Merchandise
  // ===============================
  const fetchMerchandises = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/admin/merchandises", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMerchandises(res.data);
    } catch (err) {
      console.error("Error fetch merchandises:", err);
    }
  };

  // ===============================
  // Tambah / Update Kategori
  // ===============================
  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    try {
      if (editCategoryId) {
        await axios.patch(
          `http://localhost:8000/api/admin/categories/${editCategoryId}`,
          { name: editCategoryName },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEditCategoryId(null);
        setEditCategoryName("");
      } else {
        await axios.post(
          "http://localhost:8000/api/admin/categories",
          { name: newCategoryName },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNewCategoryName("");
      }
      fetchCategories();
    } catch (err) {
      console.error("Error tambah/edit kategori:", err);
    }
  };

  const handleEditCategory = (cat) => {
    setEditCategoryId(cat.id);
    setEditCategoryName(cat.name);
  };

  const handleDeleteCategory = async (id) => {
    if (!confirm("Yakin hapus kategori ini?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/admin/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCategories();
    } catch (err) {
      console.error("Error hapus kategori:", err);
    }
  };

  // ===============================
  // Tambah / Update Merchandise
  // ===============================
  const handleSubmitMerchandise = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", merchName);
      formData.append("category_id", selectedCategory);
      formData.append("price", parseFloat(merchPrice));
      formData.append("stock", parseInt(merchStock));
      formData.append("description", description);

      sizes.forEach((s) => formData.append("sizes[]", s));
      colors.forEach((c) => formData.append("colors[]", c));
      if (image) formData.append("image", image);

      if (editMerchId) {
        await axios.patch(
          `http://localhost:8000/api/admin/merchandises/${editMerchId}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
          }
        );
        setEditMerchId(null);
      } else {
        await axios.post("http://localhost:8000/api/admin/merchandises", formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
      }

      // reset form
      setMerchName("");
      setMerchPrice("");
      setMerchStock("");
      setDescription("");
      setSizes([]);
      setColors([]);
      setSizeInput("");
      setColorInput("");
      setImage(null);

      fetchMerchandises();
    } catch (err) {
      console.error("Error simpan/update merchandise:", err);
    }
  };

  const handleEditMerch = (m) => {
    setEditMerchId(m.id);
    setMerchName(m.name);
    setMerchPrice(m.price);
    setMerchStock(m.stock);
    setDescription(m.description);
    setSizes(m.sizes || []);
    setColors(m.colors || []);
    setSelectedCategory(m.category_id);
  };

  const handleDeleteMerch = async (id) => {
    if (!confirm("Yakin hapus merchandise ini?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/admin/merchandises/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMerchandises();
    } catch (err) {
      console.error("Error hapus merchandise:", err);
    }
  };

  // ===============================
  // Size / Color
  // ===============================
  const handleAddSize = () => {
    if (sizeInput && !sizes.includes(sizeInput)) setSizes([...sizes, sizeInput]);
    setSizeInput("");
  };
  const handleRemoveSize = (s) => setSizes(sizes.filter((item) => item !== s));

  const handleAddColor = () => {
    if (colorInput && !colors.includes(colorInput)) setColors([...colors, colorInput]);
    setColorInput("");
  };
  const handleRemoveColor = (c) => setColors(colors.filter((item) => item !== c));

  useEffect(() => {
    fetchCategories();
    fetchMerchandises();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-[#113F67]">Manajemen Merchandise</h2>

      {/* Kategori */}
      <form onSubmit={handleSubmitCategory} className="mb-6">
        <h3 className="font-semibold mb-2">
          {editCategoryId ? "Edit Kategori" : "Tambah Kategori"}
        </h3>
        <input
          type="text"
          value={editCategoryId ? editCategoryName : newCategoryName}
          onChange={(e) =>
            editCategoryId
              ? setEditCategoryName(e.target.value)
              : setNewCategoryName(e.target.value)
          }
          placeholder="Nama kategori"
          className="border p-2 rounded mr-2"
        />
        <button
          type="submit"
          className="bg-[#3674B5] text-white px-4 py-2 rounded hover:bg-[#5682B1]"
        >
          {editCategoryId ? "Update" : "Tambah"}
        </button>
        {editCategoryId && (
          <button
            type="button"
            onClick={() => {
              setEditCategoryId(null);
              setEditCategoryName("");
            }}
            className="ml-2 px-3 py-2 rounded border hover:bg-gray-100"
          >
            Batal
          </button>
        )}
      </form>

      {/* List kategori */}
      <ul className="mb-6">
        {categories.map((cat) => (
          <li key={cat.id} className="mb-1 flex items-center gap-2">
            <span>{cat.name}</span>
            <button
              onClick={() => handleEditCategory(cat)}
              className="bg-yellow-400 px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteCategory(cat.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>

      {/* Merchandise Form */}
      <form onSubmit={handleSubmitMerchandise} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        <h3 className="font-semibold col-span-full mb-2">
          {editMerchId ? "Edit Merchandise" : "Tambah Merchandise"}
        </h3>
        <input
          type="text"
          value={merchName}
          onChange={(e) => setMerchName(e.target.value)}
          placeholder="Nama merchandise"
          className="border p-2 rounded"
        />
        <input
          type="number"
          value={merchPrice}
          onChange={(e) => setMerchPrice(e.target.value)}
          placeholder="Harga"
          className="border p-2 rounded"
        />
        <input
          type="number"
          value={merchStock}
          onChange={(e) => setMerchStock(e.target.value)}
          placeholder="Stock"
          className="border p-2 rounded"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Deskripsi"
          className="border p-2 rounded col-span-full"
        ></textarea>

        {/* Sizes */}
        <div className="col-span-full flex gap-2 items-center">
          <input
            type="text"
            value={sizeInput}
            onChange={(e) => setSizeInput(e.target.value)}
            placeholder="Size"
            className="border p-2 rounded flex-1"
          />
          <button type="button" onClick={handleAddSize} className="bg-[#3674B5] text-white px-2 py-1 rounded">
            Tambah
          </button>
        </div>
        <div className="col-span-full flex gap-2 flex-wrap">
          {sizes.map((s, i) => (
            <span key={i} className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1">
              {s}
              <button type="button" onClick={() => handleRemoveSize(s)} className="text-red-500 font-bold">
                &times;
              </button>
            </span>
          ))}
        </div>

        {/* Colors */}
        <div className="col-span-full flex gap-2 items-center">
          <input
            type="text"
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
            placeholder="Color"
            className="border p-2 rounded flex-1"
          />
          <button type="button" onClick={handleAddColor} className="bg-[#3674B5] text-white px-2 py-1 rounded">
            Tambah
          </button>
        </div>
        <div className="col-span-full flex gap-2 flex-wrap">
          {colors.map((c, i) => (
            <span key={i} className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1">
              {c}
              <button type="button" onClick={() => handleRemoveColor(c)} className="text-red-500 font-bold">
                &times;
              </button>
            </span>
          ))}
        </div>

        {/* Image */}
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 rounded col-span-full"
        />

        <button
          type="submit"
          className="bg-[#3674B5] text-white px-4 py-2 rounded hover:bg-[#5682B1] col-span-full"
        >
          {editMerchId ? "Update Merchandise" : "Tambah Merchandise"}
        </button>
      </form>

      {/* List Merchandise */}
      <div>
        <h3 className="font-semibold mb-2">Daftar Merchandise</h3>
        <table className="border w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Nama</th>
              <th className="p-2 border">Kategori</th>
              <th className="p-2 border">Harga</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Deskripsi</th>
              <th className="p-2 border">Sizes</th>
              <th className="p-2 border">Colors</th>
              <th className="p-2 border">Gambar</th>
              <th className="p-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {merchandises.map((m) => (
              <tr key={m.id}>
                <td className="p-2 border">{m.id}</td>
                <td className="p-2 border">{m.name}</td>
                <td className="p-2 border">{m.category_name}</td>
                <td className="p-2 border">{m.price}</td>
                <td className="p-2 border">{m.stock}</td>
                <td className="p-2 border">{m.description}</td>
                <td className="p-2 border">{m.sizes?.join(", ")}</td>
                <td className="p-2 border">{m.colors?.join(", ")}</td>
                <td className="p-2 border">
                  {m.image && (
                    <img
                      src={`http://localhost:8000/storage/${m.image}`}
                      alt={m.name}
                      className="w-16"
                    />
                  )}
                </td>
                <td className="p-2 border flex gap-1">
                  <button
                    onClick={() => handleEditMerch(m)}
                    className="bg-yellow-400 px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteMerch(m.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
