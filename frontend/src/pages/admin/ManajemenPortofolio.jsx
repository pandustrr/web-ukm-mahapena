import { useEffect, useState } from "react";
import axios from "axios";

function ManajemenPortofolio() {
    const [portofolios, setPortofolios] = useState([]);
    const [formData, setFormData] = useState({
        judul: "",
        deskripsi: "",
        tahun: "",
        gambar: null,
    });
    const [editingId, setEditingId] = useState(null);

    const token = sessionStorage.getItem("adminToken");

    // Ambil data portofolio dari backend
    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/admin/portofolio", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPortofolios(res.data);
        } catch (err) {
            console.error("Gagal ambil data portofolio:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Tangani input form
    const handleChange = (e) => {
        if (e.target.name === "gambar") {
            setFormData({ ...formData, gambar: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    // Simpan / Update portofolio
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const form = new FormData();
            form.append("judul", formData.judul);
            form.append("deskripsi", formData.deskripsi);
            form.append("tahun", formData.tahun);
            if (formData.gambar) form.append("gambar", formData.gambar);

            if (editingId) {
                // update
                await axios.post(
                    `http://localhost:8000/api/admin/portofolio/${editingId}?_method=PUT`,
                    form,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
            } else {
                // create
                await axios.post("http://localhost:8000/api/admin/portofolio", form, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });
            }

            setFormData({ judul: "", deskripsi: "", tahun: "", gambar: null });
            setEditingId(null);
            fetchData();
        } catch (err) {
            console.error("Gagal simpan portofolio:", err);
        }
    };

    // Edit portofolio
    const handleEdit = (item) => {
        setFormData({
            judul: item.judul,
            deskripsi: item.deskripsi,
            tahun: item.tahun,
            gambar: null,
        });
        setEditingId(item.id);
    };

    // Hapus portofolio
    const handleDelete = async (id) => {
        if (!confirm("Yakin ingin menghapus portofolio ini?")) return;

        try {
            await axios.delete(`http://localhost:8000/api/admin/portofolio/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchData();
        } catch (err) {
            console.error("Gagal hapus portofolio:", err);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#113F67] mb-4">
                Manajemen Portofolio
            </h1>

            {/* Form tambah/edit */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-4 rounded-lg shadow mb-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="judul"
                        value={formData.judul}
                        onChange={handleChange}
                        placeholder="Judul Prestasi"
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="text"
                        name="tahun"
                        value={formData.tahun}
                        onChange={handleChange}
                        placeholder="Tahun"
                        className="border p-2 rounded"
                    />
                    <textarea
                        name="deskripsi"
                        value={formData.deskripsi}
                        onChange={handleChange}
                        placeholder="Deskripsi"
                        className="border p-2 rounded col-span-2"
                    ></textarea>
                    <input
                        type="file"
                        name="gambar"
                        onChange={handleChange}
                        className="border p-2 rounded col-span-2"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {editingId ? "Update" : "Tambah"} Portofolio
                </button>
            </form>

            {/* Tabel data */}
            <div className="bg-white p-4 rounded-lg shadow">
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Judul</th>
                            <th className="border px-4 py-2">Tahun</th>
                            <th className="border px-4 py-2">Deskripsi</th>
                            <th className="border px-4 py-2">Gambar</th>
                            <th className="border px-4 py-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {portofolios.map((item) => (
                            <tr key={item.id}>
                                <td className="border px-4 py-2">{item.judul}</td>
                                <td className="border px-4 py-2">{item.tahun}</td>
                                <td className="border px-4 py-2">{item.deskripsi}</td>
                                <td className="border px-4 py-2">
                                    {item.gambar && (
                                        <img
                                            src={`http://localhost:8000/storage/${item.gambar}`}
                                            alt={item.judul}
                                            className="h-16"
                                        />
                                    )}
                                </td>
                                <td className="border px-4 py-2 space-x-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="bg-red-600 text-white px-2 py-1 rounded"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {portofolios.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    Belum ada portofolio.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManajemenPortofolio;
