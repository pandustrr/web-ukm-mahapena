import { useEffect, useState } from "react";
import axios from "axios";

function ManajemenAlumni() {
    const [alumnis, setAlumnis] = useState([]);
    const [formData, setFormData] = useState({
        nama: "",
        prodi: "",
        angkatan: "",
        jabatan: "",
        divisi: "",
        periode: "",
        foto: null,
    });
    const [editingId, setEditingId] = useState(null);

    const token = sessionStorage.getItem("adminToken");

    // Ambil data alumni
    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/admin/alumni", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAlumnis(res.data);
        } catch (err) {
            console.error("Gagal ambil data alumni:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Input handler
    const handleChange = (e) => {
        if (e.target.name === "foto") {
            setFormData({ ...formData, foto: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    // Simpan / Update
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData();
            form.append("nama", formData.nama);
            form.append("prodi", formData.prodi);
            form.append("angkatan", formData.angkatan);
            form.append("jabatan", formData.jabatan);
            form.append("divisi", formData.divisi);
            form.append("periode", formData.periode);
            if (formData.foto) form.append("foto", formData.foto);

            if (editingId) {
                await axios.post(
                    `http://localhost:8000/api/admin/alumni/${editingId}?_method=PUT`,
                    form,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                alert("Alumni berhasil diperbarui!");
            } else {
                await axios.post("http://localhost:8000/api/admin/alumni", form, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });
                alert("Alumni berhasil ditambahkan!");
            }

            setFormData({
                nama: "",
                prodi: "",
                angkatan: "",
                jabatan: "",
                divisi: "",
                periode: "",
                foto: null,
            });
            setEditingId(null);
            fetchData();
        } catch (err) {
            console.error("Gagal simpan alumni:", err);
        }
    };

    // Edit
    const handleEdit = (item) => {
        setFormData({
            nama: item.nama,
            prodi: item.prodi,
            angkatan: item.angkatan,
            jabatan: item.jabatan,
            divisi: item.divisi,
            periode: item.periode,
            foto: null,
        });
        setEditingId(item.id);
    };

    // Hapus
    const handleDelete = async (id) => {
        if (!confirm("Yakin ingin menghapus alumni ini?")) return;
        try {
            await axios.delete(`http://localhost:8000/api/admin/alumni/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchData();
        } catch (err) {
            console.error("Gagal hapus alumni:", err);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#113F67] mb-4">Manajemen Alumni</h1>

            {/* Form Tambah/Edit */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-4 rounded-lg shadow mb-6 space-y-3"
            >
                <input
                    type="text"
                    name="nama"
                    placeholder="Nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="prodi"
                    placeholder="Prodi"
                    value={formData.prodi}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="angkatan"
                    placeholder="Angkatan"
                    value={formData.angkatan}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="jabatan"
                    placeholder="Jabatan"
                    value={formData.jabatan}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="divisi"
                    placeholder="Divisi"
                    value={formData.divisi}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="periode"
                    placeholder="Periode"
                    value={formData.periode}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="file"
                    name="foto"
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {editingId ? "Update Alumni" : "Tambah Alumni"}
                </button>
            </form>

            {/* Tabel Alumni */}
            <div className="bg-white p-4 rounded-lg shadow">
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Nama</th>
                            <th className="border px-4 py-2">Prodi</th>
                            <th className="border px-4 py-2">Angkatan</th>
                            <th className="border px-4 py-2">Jabatan</th>
                            <th className="border px-4 py-2">Divisi</th>
                            <th className="border px-4 py-2">Periode</th>
                            <th className="border px-4 py-2">Foto</th>
                            <th className="border px-4 py-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alumnis.map((item) => (
                            <tr key={item.id}>
                                <td className="border px-4 py-2">{item.nama}</td>
                                <td className="border px-4 py-2">{item.prodi}</td>
                                <td className="border px-4 py-2">{item.angkatan}</td>
                                <td className="border px-4 py-2">{item.jabatan}</td>
                                <td className="border px-4 py-2">{item.divisi}</td>
                                <td className="border px-4 py-2">{item.periode}</td>
                                <td className="border px-4 py-2">
                                    {item.foto && (
                                        <img
                                            src={`http://localhost:8000/storage/${item.foto}`}
                                            alt={item.nama}
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
                        {alumnis.length === 0 && (
                            <tr>
                                <td colSpan="8" className="text-center py-4 text-gray-500">
                                    Belum ada data alumni.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManajemenAlumni;
