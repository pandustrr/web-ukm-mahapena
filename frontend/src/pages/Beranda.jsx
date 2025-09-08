// File: src/pages/Beranda.jsx
import { useState, useEffect } from "react";
import heroBg from "../assets/hero-bg.jpg";

const Beranda = ({ setCurrentPage }) => {  // Terima prop setCurrentPage
    const [isVisible, setIsVisible] = useState(false);

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

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="pt-28 pb-20 md:pt-36 md:pb-28 relative text-white overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroBg})` }}
                ></div>

                {/* Overlay supaya teks tetap jelas */}
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <h1
                        className={`text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                            }`}
                    >
                        Selamat Datang di{" "}
                        <span className="bg-gradient-to-r from-[#A1E3F9] via-white to-[#A1E3F9] bg-clip-text text-transparent">
                            UKM MAHAPENA
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Wadah pengembangan kreativitas dan inovasi mahasiswa untuk
                        mengeksplorasi potensi diri.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => {
                                setCurrentPage("Profil"); // Pindah ke halaman Profil
                                window.scrollTo(0, 0); // Scroll ke atas
                            }}
                            className="bg-transparent hover:bg-white/10 text-white font-semibold py-3 px-8 rounded-lg border border-white transition-all duration-300 hover:scale-105"
                        >
                            Profil
                        </button>
                    </div>
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

            {/* Bagian lain dari Beranda.jsx */}
            {/* ... */}

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

export default Beranda;