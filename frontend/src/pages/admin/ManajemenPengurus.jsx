  import { useEffect, useState } from "react";
  import axios from "axios";

  function ManajemenPengurus() {
    const [pengurus, setPengurus] = useState([]);
    const [divisis, setDivisis] = useState([]);
    const [periodes, setPeriodes] = useState([]);

    // filter state
    const [selectedPeriode, setSelectedPeriode] = useState("");
    const [selectedDivisi, setSelectedDivisi] = useState("");

    // form state
    const [formData, setFormData] = useState({
      id: null,
      nama: "",
      jabatan: "",
      prodi: "",
      angkatan: "",
      foto: null,
    });
    const [isEditing, setIsEditing] = useState(false);

    const token = sessionStorage.getItem("adminToken");
    const api = axios.create({
      baseURL: "http://localhost:8000/api/admin",
      headers: { Authorization: `Bearer ${token}` },
    });

    const fetchPeriodes = async () => {
      try {
        const res = await api.get("/periodes");
        setPeriodes(res.data);
      } catch (err) {
        console.error("Gagal ambil periode:", err);
      }
    };

    const fetchDivisis = async (periodeId) => {
      if (!periodeId) return setDivisis([]);
      try {
        const res = await api.get(`/divisi/periode/${periodeId}`);
        setDivisis(res.data);
      } catch (err) {
        console.error("Gagal ambil divisi:", err);
      }
    };

    const fetchPengurus = async () => {
      try {
        const res = await api.get("/pengurus");
        let data = res.data;
        if (selectedPeriode) {
          data = data.filter((p) => p.periode_id == selectedPeriode);
        }
        if (selectedDivisi) {
          data = data.filter((p) => p.divisi_id == selectedDivisi);
        }
        setPengurus(data);
      } catch (err) {
        console.error("Gagal ambil pengurus:", err);
      }
    };

    useEffect(() => {
      fetchPeriodes();
      fetchPengurus();
    }, []);

    useEffect(() => {
      fetchDivisis(selectedPeriode);
      fetchPengurus();
    }, [selectedPeriode, selectedDivisi]);

    // CRUD Pengurus
    const handleSubmitPengurus = async (e) => {
      e.preventDefault();
      const payload = new FormData();
      payload.append("periode_id", selectedPeriode);
      payload.append("divisi_id", selectedDivisi);
      payload.append("nama", formData.nama);
      payload.append("jabatan", formData.jabatan);
      payload.append("prodi", formData.prodi);
      payload.append("angkatan", formData.angkatan);
      if (formData.foto) payload.append("foto", formData.foto);

      try {
        if (isEditing) {
          await api.post(`/pengurus/${formData.id}?_method=PUT`, payload, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        } else {
          await api.post("/pengurus", payload, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        }
        resetFormPengurus();
        fetchPengurus();
      } catch (err) {
        console.error("Gagal simpan:", err);
      }
    };

    const handleEditPengurus = (p) => {
      setSelectedPeriode(p.periode_id);
      setSelectedDivisi(p.divisi_id);
      setFormData({
        id: p.id,
        nama: p.nama,
        jabatan: p.jabatan,
        prodi: p.prodi,
        angkatan: p.angkatan,
        foto: null,
      });
      setIsEditing(true);
    };

    const handleDeletePengurus = async (id) => {
      if (confirm("Yakin hapus pengurus ini?")) {
        try {
          await api.delete(`/pengurus/${id}`);
          fetchPengurus();
        } catch (err) {
          console.error("Gagal hapus:", err);
        }
      }
    };

    const resetFormPengurus = () => {
      setFormData({
        id: null,
        nama: "",
        jabatan: "",
        prodi: "",
        angkatan: "",
        foto: null,
      });
      setIsEditing(false);
    };

    return (
      <div>
        <h1 className="text-2xl font-bold text-[#113F67] mb-6">
          Manajemen Pengurus
        </h1>

        {/* STEP 1: Pilih Periode */}
        <div className="mb-4">
          <label className="font-medium mr-2">Pilih Periode:</label>
          <select
            value={selectedPeriode}
            onChange={(e) => setSelectedPeriode(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">-- Pilih Periode --</option>
            {periodes.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nama_periode}
              </option>
            ))}
          </select>
        </div>

        {/* STEP 2: Pilih Divisi */}
        {selectedPeriode && (
          <div className="mb-4">
            <label className="font-medium mr-2">Pilih Divisi:</label>
            <select
              value={selectedDivisi}
              onChange={(e) => setSelectedDivisi(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">-- Pilih Divisi --</option>
              {divisis.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nama_divisi}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* STEP 3: Form Pengurus */}
        {selectedPeriode && selectedDivisi && (
          <form
            onSubmit={handleSubmitPengurus}
            className="bg-white shadow-md rounded p-4 mb-6"
            encType="multipart/form-data"
          >
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nama"
                value={formData.nama}
                onChange={(e) =>
                  setFormData({ ...formData, nama: e.target.value })
                }
                className="border p-2 rounded col-span-1"
                required
              />
              <input
                type="text"
                placeholder="Jabatan"
                value={formData.jabatan}
                onChange={(e) =>
                  setFormData({ ...formData, jabatan: e.target.value })
                }
                className="border p-2 rounded col-span-1"
                required
              />
              <input
                type="text"
                placeholder="Prodi"
                value={formData.prodi}
                onChange={(e) =>
                  setFormData({ ...formData, prodi: e.target.value })
                }
                className="border p-2 rounded col-span-1"
                required
              />
              <input
                type="text"
                placeholder="Angkatan"
                value={formData.angkatan}
                onChange={(e) =>
                  setFormData({ ...formData, angkatan: e.target.value })
                }
                className="border p-2 rounded col-span-1"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, foto: e.target.files[0] })
                }
                className="border p-2 rounded col-span-2"
              />
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {isEditing ? "Update" : "Tambah"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetFormPengurus}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        )}

        {/* Tabel Pengurus */}
        <table className="w-full bg-white shadow-md rounded overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2">Foto</th>
              <th className="p-2">Nama</th>
              <th className="p-2">Jabatan</th>
              <th className="p-2">Prodi</th>
              <th className="p-2">Angkatan</th>
              <th className="p-2">Divisi</th>
              <th className="p-2">Periode</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pengurus.length > 0 ? (
              pengurus.map((p) => (
                <tr key={p.id} className="text-center border-b">
                  <td className="p-2">
                    {p.foto ? (
                      <img
                        src={`http://localhost:8000/storage/${p.foto}`}
                        alt={p.nama}
                        className="w-12 h-12 object-cover rounded-full mx-auto"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="p-2">{p.nama}</td>
                  <td className="p-2">{p.jabatan}</td>
                  <td className="p-2">{p.prodi}</td>
                  <td className="p-2">{p.angkatan}</td>
                  <td className="p-2">{p.divisi?.nama_divisi}</td>
                  <td className="p-2">{p.periode?.nama_periode}</td>
                  <td className="p-2 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEditPengurus(p)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePengurus(p.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  Belum ada pengurus
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  export default ManajemenPengurus;
