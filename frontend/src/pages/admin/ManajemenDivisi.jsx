// File: src/pages/admin/ManajemenDivisi.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function ManajemenDivisi() {
    const [divisis, setDivisis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        id: null,
        nama_divisi: "",
        singkatan_divisi: "",
        judul_deskripsi: "",
        deskripsi: "",
        pengertian: "",
    });

    // ✅ Ambil token dari sessionStorage (bukan localStorage lagi)
    const token = sessionStorage.getItem("adminToken");

    // Fetch data divisi
    const fetchDivisis = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:8000/api/admin/divisis", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDivisis(res.data);
        } catch (err) {
            console.error(err);
            alert("Gagal memuat data divisi");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDivisis();
    }, []);

    // Handle input form
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Reset form
    const resetForm = () => {
        setForm({
            id: null,
            nama_divisi: "",
            singkatan_divisi: "",
            judul_deskripsi: "",
            deskripsi: "",
            pengertian: "",
        });
    };

    // Simpan (tambah / update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (form.id) {
                // Update
                await axios.put(
                    `http://localhost:8000/api/admin/divisis/${form.id}`,
                    form,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                alert("✅ Divisi berhasil diperbarui");
            } else {
                // Create
                await axios.post("http://localhost:8000/api/admin/divisis", form, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert("✅ Divisi berhasil ditambahkan");
            }
            resetForm();
            fetchDivisis();
        } catch (err) {
            console.error(err);
            alert("❌ Gagal menyimpan data");
        }
    };

    // Edit data
    const handleEdit = (divisi) => {
        setForm(divisi);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Hapus data
    const handleDelete = async (id) => {
        if (!confirm("Yakin ingin menghapus divisi ini?")) return;
        try {
            await axios.delete(`http://localhost:8000/api/admin/divisis/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("✅ Divisi berhasil dihapus");
            fetchDivisis();
        } catch (err) {
            console.error(err);
            alert("❌ Gagal menghapus data");
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#113F67] mb-4">
                Manajemen Divisi
            </h1>

            {/* Form tambah / edit */}
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded p-4 mb-6 space-y-4"
            >
                <input
                    type="text"
                    name="nama_divisi"
                    value={form.nama_divisi}
                    onChange={handleChange}
                    placeholder="Nama Divisi"
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="singkatan_divisi"
                    value={form.singkatan_divisi}
                    onChange={handleChange}
                    placeholder="Singkatan Divisi"
                    className="w-full border p-2 rounded"
                />
                <input
                    type="text"
                    name="judul_deskripsi"
                    value={form.judul_deskripsi}
                    onChange={handleChange}
                    placeholder="Judul Deskripsi"
                    className="w-full border p-2 rounded"
                />
                <textarea
                    name="deskripsi"
                    value={form.deskripsi}
                    onChange={handleChange}
                    placeholder="Deskripsi"
                    className="w-full border p-2 rounded"
                ></textarea>
                <textarea
                    name="pengertian"
                    value={form.pengertian}
                    onChange={handleChange}
                    placeholder="Pengertian"
                    className="w-full border p-2 rounded"
                ></textarea>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        {form.id ? "Update" : "Tambah"} Divisi
                    </button>
                    {form.id && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Batal
                        </button>
                    )}
                </div>
            </form>

            {/* Tabel data */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full bg-white shadow-md rounded">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="p-2">Nama Divisi</th>
                            <th className="p-2">Singkatan</th>
                            <th className="p-2">Judul Deskripsi</th>
                            <th className="p-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {divisis.length > 0 ? (
                            divisis.map((d) => (
                                <tr key={d.id} className="border-t">
                                    <td className="p-2">{d.nama_divisi}</td>
                                    <td className="p-2">{d.singkatan_divisi}</td>
                                    <td className="p-2">{d.judul_deskripsi}</td>
                                    <td className="p-2 space-x-2">
                                        <button
                                            onClick={() => handleEdit(d)}
                                            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(d.id)}
                                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center p-4">
                                    Tidak ada data divisi
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ManajemenDivisi;
