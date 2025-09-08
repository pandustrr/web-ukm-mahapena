// File: src/pages/Profil.jsx
import { useState, useEffect } from "react";

const Profil = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const handleScroll = () => {
            const elements = document.querySelectorAll('.fade-in');
            elements.forEach(el => {
                const elementTop = el.getBoundingClientRect().top;
                if (elementTop < window.innerHeight - 100) {
                    el.classList.add('visible');
                }
            });
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="pt-24 pb-16">
            {/* Header */}
            <section className="py-12 bg-gradient-to-r from-[#113F67] to-[#3674B5] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold mb-4">Profil Mahapena</h1>
                    <p className="text-xl">Mengenal lebih dekat UKM Mahapena</p>
                </div>
            </section>

            {/* Tentang Kami */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 fade-in">
                        <h2 className="text-3xl font-bold text-[#3674B5]">Tentang Kami</h2>
                        <div className="w-20 h-1 bg-[#A1E3F9] mx-auto mt-4"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center fade-in">
                        <div>
                            <p className="text-gray-700 mb-6">
                                UKM Mahapena adalah Unit Kegiatan Mahasiswa yang fokus pada pengembangan 
                                kreativitas, inovasi, dan entrepreneurship mahasiswa. Didirikan tahun 2010, 
                                kami telah membantu ribuan mahasiswa mengembangkan potensi diri.
                            </p>
                            <p className="text-gray-700">
                                Kami menyediakan berbagai program dan kegiatan untuk membantu mahasiswa 
                                mengasah kemampuan soft skills dan hard skills yang dibutuhkan di dunia profesional.
                            </p>
                        </div>
                        <div>
                            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                                 alt="Kegiatan Mahapena" className="rounded-lg shadow-lg" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Visi Misi */}
            <section className="py-16 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="fade-in">
                            <div className="bg-white p-8 rounded-lg shadow-md">
                                <h3 className="text-2xl font-bold text-[#3674B5] mb-4">Visi</h3>
                                <p className="text-gray-700">
                                    Menjadi wadah utama pengembangan kreativitas dan inovasi mahasiswa 
                                    yang menghasilkan talenta-talenta unggul dan berkontribusi positif.
                                </p>
                            </div>
                        </div>
                        
                        <div className="fade-in">
                            <div className="bg-white p-8 rounded-lg shadow-md">
                                <h3 className="text-2xl font-bold text-[#3674B5] mb-4">Misi</h3>
                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                    <li>Menyelenggarakan program pengembangan kreativitas</li>
                                    <li>Membangun jiwa entrepreneurship mahasiswa</li>
                                    <li>Berkontribusi positif bagi masyarakat</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .fade-in { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
                .fade-in.visible { opacity: 1; transform: translateY(0); }
            `}</style>
        </div>
    );
};

export default Profil;