// File: src/pages/admin/ManajemenDivisi.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function ManajemenDivisi() {
    const [divisis, setDivisis] = useState([]);
    const [periodes, setPeriodes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedPeriode, setSelectedPeriode] = useState(""); // ✅ periode yg dipilih

    const [formDivisi, setFormDivisi] = useState({
        id: null,
        nama_divisi: "",
        singkatan_divisi: "",
        judul_deskripsi: "",
        deskripsi: "",
        pengertian: "",
        periode_id: "",
    });

    const [formPeriode, setFormPeriode] = useState({
        id: null,
        nama_periode: "",
    });

    const token = sessionStorage.getItem("adminToken");

    // ====== FETCH DATA ======
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

    const fetchPeriodes = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/admin/periodes", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPeriodes(res.data);
        } catch (err) {
            console.error(err);
            alert("Gagal memuat data periode");
        }
    };

    useEffect(() => {
        fetchDivisis();
        fetchPeriodes();
    }, []);

    // ====== FORM DIVISI ======
    const handleChangeDivisi = (e) => {
        setFormDivisi({ ...formDivisi, [e.target.name]: e.target.value });
    };

    const resetDivisi = () => {
        setFormDivisi({
            id: null,
            nama_divisi: "",
            singkatan_divisi: "",
            judul_deskripsi: "",
            deskripsi: "",
            pengertian: "",
            periode_id: selectedPeriode || "", // default ke periode terpilih
        });
    };

    const handleSubmitDivisi = async (e) => {
        e.preventDefault();
        try {
            if (formDivisi.id) {
                await axios.put(
                    `http://localhost:8000/api/admin/divisis/${formDivisi.id}`,
                    formDivisi,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                alert("✅ Divisi berhasil diperbarui");
            } else {
                await axios.post("http://localhost:8000/api/admin/divisis", formDivisi, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert("✅ Divisi berhasil ditambahkan");
            }
            resetDivisi();
            fetchDivisis();
        } catch (err) {
            console.error(err);
            alert("❌ Gagal menyimpan divisi");
        }
    };

    const handleEditDivisi = (divisi) => {
        setFormDivisi(divisi);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDeleteDivisi = async (id) => {
        if (!confirm("Yakin ingin menghapus divisi ini?")) return;
        try {
            await axios.delete(`http://localhost:8000/api/admin/divisis/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("✅ Divisi berhasil dihapus");
            fetchDivisis();
        } catch (err) {
            console.error(err);
            alert("❌ Gagal menghapus divisi");
        }
    };

    // ====== FORM PERIODE ======
    const handleChangePeriode = (e) => {
        setFormPeriode({ ...formPeriode, [e.target.name]: e.target.value });
    };

    const resetPeriode = () => {
        setFormPeriode({
            id: null,
            nama_periode: "",
        });
    };

    const handleSubmitPeriode = async (e) => {
        e.preventDefault();
        try {
            if (formPeriode.id) {
                await axios.put(
                    `http://localhost:8000/api/admin/periodes/${formPeriode.id}`,
                    formPeriode,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                alert("✅ Periode berhasil diperbarui");
            } else {
                await axios.post("http://localhost:8000/api/admin/periodes", formPeriode, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert("✅ Periode berhasil ditambahkan");
            }
            resetPeriode();
            fetchPeriodes();
        } catch (err) {
            console.error(err);
            alert("❌ Gagal menyimpan periode");
        }
    };

    const handleEditPeriode = (periode) => {
        setFormPeriode(periode);
    };

    const handleDeletePeriode = async (id) => {
        if (!confirm("Yakin ingin menghapus periode ini?")) return;
        try {
            await axios.delete(`http://localhost:8000/api/admin/periodes/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("✅ Periode berhasil dihapus");
            fetchPeriodes();
        } catch (err) {
            console.error(err);
            alert("❌ Gagal menghapus periode");
        }
    };

    // ✅ filter divisi sesuai periode yg dipilih
    const filteredDivisis = selectedPeriode
        ? divisis.filter((d) => String(d.periode_id) === String(selectedPeriode))
        : divisis;

    return (
        <div className="space-y-10">
            <h1 className="text-2xl font-bold text-[#113F67]">Manajemen Divisi & Periode</h1>

            {/* ====== FORM PERIODE ====== */}
            <div className="bg-white shadow-md rounded p-4">
                <h2 className="text-lg font-semibold mb-2">Kelola Periode</h2>
                <form onSubmit={handleSubmitPeriode} className="flex gap-2 mb-4">
                    <input
                        type="text"
                        name="nama_periode"
                        value={formPeriode.nama_periode}
                        onChange={handleChangePeriode}
                        placeholder="Contoh: 2024/2025"
                        className="border p-2 rounded flex-1"
                        required
                    />
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                        {formPeriode.id ? "Update" : "Tambah"}
                    </button>
                    {formPeriode.id && (
                        <button
                            type="button"
                            onClick={resetPeriode}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Batal
                        </button>
                    )}
                </form>
                <table className="w-full border">
                    <thead className="bg-green-600 text-white">
                        <tr>
                            <th className="p-2">Nama Periode</th>
                            <th className="p-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {periodes.length > 0 ? (
                            periodes.map((p) => (
                                <tr key={p.id} className="border-t">
                                    <td className="p-2">{p.nama_periode}</td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => handleEditPeriode(p)}
                                            className="px-3 py-1 bg-yellow-500 text-white rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeletePeriode(p.id)}
                                            className="px-3 py-1 bg-red-600 text-white rounded"
                                        >
                                            Hapus
                                        </button>
                                        {/* tombol pilih periode */}
                                        <button
                                            onClick={() => {
                                                setSelectedPeriode(p.id);
                                                resetDivisi();
                                            }}
                                            className={`px-3 py-1 ml-2 rounded ${
                                                selectedPeriode === String(p.id)
                                                    ? "bg-blue-700 text-white"
                                                    : "bg-blue-500 text-white"
                                            }`}
                                        >
                                            Pilih
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="text-center p-2">
                                    Belum ada periode
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ====== FORM DIVISI ====== */}
            {selectedPeriode && (
                <div className="bg-white shadow-md rounded p-4">
                    <h2 className="text-lg font-semibold mb-2">
                        Kelola Divisi (Periode:{" "}
                        {periodes.find((p) => String(p.id) === String(selectedPeriode))
                            ?.nama_periode || "-"}
                        )
                    </h2>
                    <form onSubmit={handleSubmitDivisi} className="space-y-2 mb-4">
                        {/* periode_id otomatis pakai yg dipilih */}
                        <input type="hidden" name="periode_id" value={selectedPeriode} />

                        <input
                            type="text"
                            name="nama_divisi"
                            value={formDivisi.nama_divisi}
                            onChange={handleChangeDivisi}
                            placeholder="Nama Divisi"
                            className="w-full border p-2 rounded"
                            required
                        />
                        <input
                            type="text"
                            name="singkatan_divisi"
                            value={formDivisi.singkatan_divisi}
                            onChange={handleChangeDivisi}
                            placeholder="Singkatan Divisi"
                            className="w-full border p-2 rounded"
                        />
                        <input
                            type="text"
                            name="judul_deskripsi"
                            value={formDivisi.judul_deskripsi}
                            onChange={handleChangeDivisi}
                            placeholder="Judul Deskripsi"
                            className="w-full border p-2 rounded"
                        />
                        <textarea
                            name="deskripsi"
                            value={formDivisi.deskripsi}
                            onChange={handleChangeDivisi}
                            placeholder="Deskripsi"
                            className="w-full border p-2 rounded"
                        ></textarea>
                        <textarea
                            name="pengertian"
                            value={formDivisi.pengertian}
                            onChange={handleChangeDivisi}
                            placeholder="Pengertian"
                            className="w-full border p-2 rounded"
                        ></textarea>

                        <div className="flex gap-2">
                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                                {formDivisi.id ? "Update" : "Tambah"} Divisi
                            </button>
                            {formDivisi.id && (
                                <button
                                    type="button"
                                    onClick={resetDivisi}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Batal
                                </button>
                            )}
                        </div>
                    </form>

                    <table className="w-full border">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="p-2">Nama Divisi</th>
                                <th className="p-2">Singkatan</th>
                                <th className="p-2">Judul Deskripsi</th>
                                <th className="p-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDivisis.length > 0 ? (
                                filteredDivisis.map((d) => (
                                    <tr key={d.id} className="border-t">
                                        <td className="p-2">{d.nama_divisi}</td>
                                        <td className="p-2">{d.singkatan_divisi}</td>
                                        <td className="p-2">{d.judul_deskripsi}</td>
                                        <td className="p-2">
                                            <button
                                                onClick={() => handleEditDivisi(d)}
                                                className="px-3 py-1 bg-yellow-500 text-white rounded mr-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteDivisi(d.id)}
                                                className="px-3 py-1 bg-red-600 text-white rounded"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center p-2">
                                        Belum ada divisi untuk periode ini
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ManajemenDivisi;
