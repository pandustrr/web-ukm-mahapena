// File: src/pages/PortofolioDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

const PortofolioDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/portofolio/${id}`)
            .then((res) => setData(res.data))
            .catch((err) => console.error("Gagal ambil detail:", err));
    }, [id]);

    if (!data) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500 dark:text-gray-400">Memuat data...</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            {/* Tombol kembali */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 mb-6 text-[#113F67] dark:text-[#A1E3F9] hover:underline"
            >
                <ArrowLeft size={18} /> Kembali
            </button>

            {/* Gambar utama */}
            {data.gambar && (
                <img
                    src={`http://localhost:8000/storage/${data.gambar}`}
                    alt={data.judul}
                    className="w-full h-96 object-cover rounded-lg shadow-lg mb-8"
                />
            )}

            {/* Konten */}
            <h1 className="text-4xl font-bold text-[#113F67] dark:text-[#A1E3F9] mb-4">
                {data.judul}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-6">
                Tahun: {data.tahun}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {data.deskripsi}
            </p>
        </div>
    );
};

export default PortofolioDetail;
