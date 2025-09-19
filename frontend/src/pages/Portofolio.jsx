import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Portofolio = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [prestasi, setPrestasi] = useState([]);
    const navigate = useNavigate();

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

    // Ambil data prestasi dari backend
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/portofolio")
            .then((res) => setPrestasi(res.data))
            .catch((err) => console.error("Gagal ambil data portofolio:", err));
    }, []);

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="pt-28 pb-20 md:pt-36 md:pb-28 relative text-white dark:text-[#A1E3F9] overflow-hidden">
                {/* Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://i.pinimg.com/1200x/1c/54/5e/1c545e77e785fbe17cc65c1dc80bd047.jpg')",
                    }}
                ></div>
                <div className="absolute inset-0 bg-black/60 dark:bg-black/70"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <h1
                        className={`text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight transform transition-all duration-1000 ${
                            isVisible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-10 opacity-0"
                        }`}
                    >
                        Portofolio{" "}
                        <span className="bg-gradient-to-r from-[#A1E3F9] via-white to-[#A1E3F9] bg-clip-text text-transparent dark:from-[#3674B5] dark:to-[#5682B1]">
                            Prestasi UKM Mahapena
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Dokumentasi pencapaian dan prestasi terbaik UKM Mahapena, bukti nyata
                        kreativitas dan dedikasi.
                    </p>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
                    <svg
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                        className="w-full h-20 text-white fill-current"
                    >
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V56.44Z"></path>
                    </svg>
                </div>
            </section>

            {/* List Prestasi */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-[#113F67] dark:text-[#A1E3F9] mb-12">
                        Daftar Prestasi
                    </h2>

                    {prestasi.length === 0 ? (
                        <p className="text-center text-gray-500 dark:text-gray-400">
                            Belum ada data prestasi.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {prestasi.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => navigate(`/portofolio/${item.id}`)}
                                    className="fade-in cursor-pointer bg-white dark:bg-[#1E293B] rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105"
                                >
                                    {item.gambar && (
                                        <img
                                            src={`http://localhost:8000/storage/${item.gambar}`}
                                            alt={item.judul}
                                            className="w-full h-48 object-cover"
                                        />
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-[#113F67] dark:text-[#A1E3F9] mb-2">
                                            {item.judul}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-2 line-clamp-3">
                                            {item.deskripsi}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                            {new Date(item.tanggal).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

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

export default Portofolio;
