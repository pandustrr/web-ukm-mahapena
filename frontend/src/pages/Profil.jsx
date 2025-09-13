// File: src/pages/Profil.jsx
import { useState, useEffect } from "react";

const Profil = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [divisi, setDivisi] = useState([]);
    const [selectedDivisi, setSelectedDivisi] = useState(null);

    // Animasi fade-in
    useEffect(() => {
        setIsVisible(true);
        const handleScroll = () => {
            const elements = document.querySelectorAll(".fade-in");
            elements.forEach((el) => {
                const elementTop = el.getBoundingClientRect().top;
                if (elementTop < window.innerHeight - 100) {
                    el.classList.add("visible");
                }
            });
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Fetch data divisi dari API Laravel
    useEffect(() => {
        const fetchDivisi = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/divisi");
                const data = await res.json();
                setDivisi(data);
            } catch (error) {
                console.error("Gagal fetch divisi:", error);
            }
        };
        fetchDivisi();
    }, []);

    return (
        <div className="pt-24 pb-16 bg-[#FFFFFF] text-[#000000]">
            {/* Header */}
            <section className="py-12 bg-gradient-to-r from-[#113F67] to-[#3674B5] text-[#FFFFFF]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold mb-4">Profil Mahapena</h1>
                    <p className="text-xl text-[#A1E3F9]">
                        Mengenal lebih dekat UKM Mahapena
                    </p>
                </div>
            </section>

            {/* Tentang Kami */}
            <section className="py-16 bg-[#FFFFFF]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 fade-in">
                        <h2 className="text-3xl font-bold text-[#3674B5]">Tentang Kami</h2>
                        <div className="w-20 h-1 bg-[#A1E3F9] mx-auto mt-4"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center fade-in">
                        <div>
                            <p className="text-[#000000] mb-6 leading-relaxed">
                                UKM Mahapena adalah Unit Kegiatan Mahasiswa yang fokus pada
                                pengembangan kreativitas, inovasi, dan entrepreneurship
                                mahasiswa. Didirikan tahun 2010, kami telah membantu ribuan
                                mahasiswa mengembangkan potensi diri.
                            </p>
                            <p className="text-[#000000] leading-relaxed">
                                Kami menyediakan berbagai program dan kegiatan untuk membantu
                                mahasiswa mengasah kemampuan soft skills dan hard skills yang
                                dibutuhkan di dunia profesional.
                            </p>
                        </div>
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Kegiatan Mahapena"
                                className="rounded-lg shadow-lg border-4 border-[#A1E3F9]"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Visi Misi */}
            <section className="py-16 bg-[#F9FAFB]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="fade-in">
                            <div className="bg-[#FFFFFF] p-8 rounded-lg shadow-md border border-[#5682B1]/20">
                                <h3 className="text-2xl font-bold text-[#3674B5] mb-4">Visi</h3>
                                <p className="text-[#000000] leading-relaxed">
                                    Menjadi wadah utama pengembangan kreativitas dan inovasi
                                    mahasiswa yang menghasilkan talenta-talenta unggul dan
                                    berkontribusi positif.
                                </p>
                            </div>
                        </div>

                        <div className="fade-in">
                            <div className="bg-[#FFFFFF] p-8 rounded-lg shadow-md border border-[#5682B1]/20">
                                <h3 className="text-2xl font-bold text-[#3674B5] mb-4">Misi</h3>
                                <ul className="list-disc list-inside text-[#000000] space-y-2">
                                    <li>Menyelenggarakan program pengembangan kreativitas</li>
                                    <li>Membangun jiwa entrepreneurship mahasiswa</li>
                                    <li>Berkontribusi positif bagi masyarakat</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Daftar Divisi */}
            <section className="py-16 bg-[#FFFFFF]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 fade-in">
                        <h2 className="text-3xl font-bold text-[#3674B5]">Divisi</h2>
                        <div className="w-20 h-1 bg-[#A1E3F9] mx-auto mt-4"></div>
                    </div>

                    {/* Grid daftar divisi */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 fade-in">
                        {divisi.map((d) => (
                            <div
                                key={d.id}
                                className="p-6 bg-[#FFFFFF] shadow-md rounded-xl cursor-pointer hover:shadow-lg transition border border-[#5682B1]/20"
                                onClick={() => setSelectedDivisi(d)}
                            >
                                <h2 className="text-xl font-semibold text-[#113F67]">
                                    {d.nama}
                                </h2>
                                <p className="text-[#5682B1]">{d.singkatan}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal detail divisi */}
            {selectedDivisi && (
                <div className="fixed inset-0 bg-[#000000]/50 flex justify-center items-center z-50">
                    <div className="bg-[#FFFFFF] p-6 rounded-xl max-w-lg w-full shadow-lg relative border border-[#5682B1]/30">
                        <button
                            className="absolute top-3 right-3 text-[#5682B1] hover:text-[#3674B5]"
                            onClick={() => setSelectedDivisi(null)}
                        >
                            ✕
                        </button>
                        <h2 className="text-2xl font-bold text-[#113F67] mb-2">
                            {selectedDivisi.nama}
                        </h2>
                        <h3 className="text-[#5682B1] mb-4">{selectedDivisi.singkatan}</h3>
                        <p className="text-[#000000] leading-relaxed">
                            {selectedDivisi.deskripsi}
                        </p>
                    </div>
                </div>
            )}

            <style jsx>{`
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
        </div>
    );
};

export default Profil;
