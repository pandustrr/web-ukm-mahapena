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
            const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .zoom-in');
            elements.forEach(el => {
                const elementTop = el.getBoundingClientRect().top;
                if (elementTop < window.innerHeight - 100) {
                    el.classList.add('visible');
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
        <div className="relative">
            {/* Floating decorative elements */}
            <div className="fixed top-20 left-10 w-16 h-16 rounded-full bg-[#A1E3F9]/20 blur-xl z-0 animate-pulse-slow dark:bg-[#113F67]/30"></div>
            <div className="fixed top-1/3 right-16 w-20 h-20 rounded-full bg-[#3674B5]/20 blur-xl z-0 animate-pulse-medium dark:bg-[#5682B1]/30"></div>
            <div className="fixed bottom-40 left-1/4 w-24 h-24 rounded-full bg-[#113F67]/10 blur-xl z-0 animate-pulse-slow dark:bg-[#3674B5]/20"></div>

            {/* Header bg */}
            <section className="pt-28 pb-20 md:pt-36 md:pb-28 relative text-white overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg)`
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/80 to-[#000000]/60 dark:from-[#000000]/90 dark:to-[#113F67]/70"></div>
                    <div className="absolute inset-0 bg-noise opacity-10 dark:opacity-20"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#A1E3F9] to-[#FFFFFF] dark:from-[#A1E3F9] dark:to-[#5682B1]">
                        Profil Mahapena
                    </h1>
                    <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto text-[#A1E3F9]/90 dark:text-[#A1E3F9] drop-shadow-sm">
                        Mengenal lebih dekat UKM Mahapena dan berbagai divisi yang membangun kreativitas mahasiswa
                    </p>

                    {/* Animated scroll indicator */}
                    <div className="mt-16 animate-bounce">
                        <div className="flex flex-col items-center">
                            <span className="text-sm mb-2 text-[#A1E3F9]/80 dark:text-[#A1E3F9]">Scroll untuk melihat</span>
                            <svg className="w-6 h-6 text-[#FFFFFF] dark:text-[#A1E3F9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
                    <svg
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                        className="w-full h-16 fill-current text-[#FFFFFF] dark:text-slate-800"
                    >
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V56.44Z"></path>
                    </svg>
                </div>
            </section>

            {/* Tentang Kami */}
            <section className="py-16 bg-gradient-to-b from-gray-50 to-[#FFFFFF] dark:from-slate-800 dark:to-slate-800 relative overflow-hidden">
                {/* Background dots */}
                <div className="absolute inset-0 opacity-5 dark:opacity-15">
                    <div className="absolute inset-0 pattern-dots pattern-[#3674B5] dark:pattern-[#A1E3F9] pattern-opacity-20 dark:pattern-opacity-25 pattern-size-4"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12 slide-in-left">
                        <h2 className="text-3xl font-extrabold text-[#3674B5] dark:text-[#A1E3F9] relative inline-block">
                            Tentang Kami
                            <span className="block w-16 h-1 bg-[#A1E3F9] dark:bg-[#3674B5] mx-auto mt-3 rounded-full"></span>
                        </h2>
                        <p className="text-[#113F67] dark:text-[#5682B1] mt-6 max-w-2xl mx-auto">
                            UKM Mahapena adalah Unit Kegiatan Mahasiswa yang fokus pada pengembangan kreativitas, inovasi, dan entrepreneurship mahasiswa
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center slide-in-right">
                        <div>
                            <p className="text-[#113F67] dark:text-[#5682B1] mb-6 leading-relaxed text-lg">
                                Didirikan tahun 2010, kami telah membantu ribuan mahasiswa mengembangkan potensi diri melalui berbagai program dan kegiatan yang dirancang untuk mengasah kemampuan soft skills dan hard skills yang dibutuhkan di dunia profesional.
                            </p>
                            <p className="text-[#113F67] dark:text-[#5682B1] leading-relaxed text-lg">
                                Dengan semangat kolaborasi dan inovasi, Mahapena terus berkontribusi dalam menciptakan lingkungan yang mendukung pengembangan kreativitas mahasiswa.
                            </p>
                        </div>
                        <div className="zoom-in">
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Kegiatan Mahapena"
                                className="rounded-xl shadow-xl border-4 border-[#A1E3F9] dark:border-[#3674B5] transform hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Visi Misi */}
            <section className="py-16 bg-white dark:bg-slate-800 relative overflow-hidden">
                {/* Subtle background elements */}
                <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#3674B5]/10 dark:bg-[#3674B5]/20 blur-3xl"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="zoom-in">
                            <div className="bg-gradient-to-br from-[#3674B5] to-[#113F67] dark:from-[#113F67] dark:to-[#3674B5] p-8 rounded-xl shadow-xl text-white">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold">Visi</h3>
                                </div>
                                <p className="text-[#A1E3F9] leading-relaxed text-lg">
                                    Menjadi wadah utama pengembangan kreativitas dan inovasi mahasiswa yang menghasilkan talenta-talenta unggul dan berkontribusi positif bagi masyarakat dan bangsa.
                                </p>
                            </div>
                        </div>

                        <div className="zoom-in" style={{ transitionDelay: "200ms" }}>
                            <div className="bg-gradient-to-br from-[#5682B1] to-[#3674B5] dark:from-[#3674B5] dark:to-[#5682B1] p-8 rounded-xl shadow-xl text-white">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold">Misi</h3>
                                </div>
                                <ul className="space-y-3 text-[#A1E3F9]">
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Menyelenggarakan program pengembangan kreativitas dan inovasi</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Membangun jiwa entrepreneurship mahasiswa</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Berkontribusi positif bagi masyarakat melalui karya kreatif</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Daftar Divisi */}
            <section className="py-16 bg-gradient-to-b from-gray-50 to-[#FFFFFF] dark:from-slate-800 dark:to-slate-800 relative overflow-hidden">
                {/* Background dots */}
                <div className="absolute inset-0 opacity-5 dark:opacity-15">
                    <div className="absolute inset-0 pattern-dots pattern-[#3674B5] dark:pattern-[#A1E3F9] pattern-opacity-20 dark:pattern-opacity-25 pattern-size-4"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12 slide-in-left">
                        <h2 className="text-3xl font-extrabold text-[#3674B5] dark:text-[#A1E3F9] relative inline-block">
                            Divisi
                            <span className="block w-16 h-1 bg-[#A1E3F9] dark:bg-[#3674B5] mx-auto mt-3 rounded-full"></span>
                        </h2>
                        <p className="text-[#113F67] dark:text-[#5682B1] mt-6 max-w-2xl mx-auto">
                            Jelajahi berbagai divisi yang membentuk UKM Mahapena
                        </p>
                    </div>

                    {/* Grid daftar divisi - Desain Minimalis */}
                    <div className="flex flex-wrap justify-center gap-4">
                        {divisi.map((d, index) => (
                            <button
                                key={d.id}
                                onClick={() => setSelectedDivisi(d)}
                                className="zoom-in bg-white dark:bg-[#113F67] rounded-xl shadow-md dark:shadow-xl hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 dark:border-[#3674B5]/30 cursor-pointer px-6 py-4 flex flex-col items-center justify-center text-center min-h-[120px] w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)]"
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <h3 className="text-lg font-semibold text-[#3674B5] dark:text-[#A1E3F9] mb-2 group-hover:text-[#113F67] dark:group-hover:text-[#5682B1] transition-colors duration-300">
                                    {d.nama}
                                </h3>
                                <p className="text-sm text-[#5682B1] dark:text-gray-300 bg-[#A1E3F9]/20 dark:bg-[#3674B5]/20 px-3 py-1 rounded-full">
                                    {d.singkatan}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal detail divisi */}
            {selectedDivisi && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div
                        className="bg-white dark:bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header Modal */}
                        <div className="p-6 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-[#3674B5] to-[#2c6099] text-white">
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-bold">{selectedDivisi.nama}</h3>
                                <button
                                    onClick={() => setSelectedDivisi(null)}
                                    className="text-white hover:text-gray-200 transition-colors duration-200"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-[#A1E3F9] mt-2">{selectedDivisi.singkatan}</p>
                        </div>

                        {/* Konten Modal */}
                        <div className="p-6 dark:bg-slate-800 dark:text-white">
                            <div className="prose max-w-none dark:prose-invert">
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {selectedDivisi.deskripsi}
                                </p>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700 rounded-b-xl">
                            <button
                                onClick={() => setSelectedDivisi(null)}
                                className="w-full px-6 py-3 bg-[#3674B5] hover:bg-[#113F67] text-white rounded-lg transition-colors duration-300 font-medium"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .slide-in-left {
                    opacity: 0;
                    transform: translateX(-30px);
                    transition: opacity 0.8s ease, transform 0.8s ease;
                }
                
                .slide-in-left.visible {
                    opacity: 1;
                    transform: translateX(0);
                }
                
                .slide-in-right {
                    opacity: 0;
                    transform: translateX(30px);
                    transition: opacity 0.8s ease, transform 0.8s ease;
                }
                
                .slide-in-right.visible {
                    opacity: 1;
                    transform: translateX(0);
                }
                
                .zoom-in {
                    opacity: 0;
                    transform: scale(0.95);
                    transition: opacity 0.5s ease, transform 0.5s ease;
                }
                
                .zoom-in.visible {
                    opacity: 1;
                    transform: scale(1);
                }
                
                .bg-noise {
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 0.2; }
                    50% { opacity: 0.4; }
                }
                
                .animate-pulse-slow {
                    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                
                .animate-pulse-medium {
                    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                
                .pattern-dots {
                    background-image: radial-gradient(currentColor 1px, transparent 1px);
                    background-size: 10px 10px;
                }
                
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default Profil;