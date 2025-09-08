// File: src/pages/Proker.jsx
import { useState, useEffect } from "react";

const Proker = () => {
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
                    <h1 className="text-4xl font-bold mb-4">Program Kerja</h1>
                    <p className="text-xl">Berbagai program unggulan kami untuk pengembangan mahasiswa</p>
                </div>
            </section>

            {/* Program List */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 fade-in">
                        <h2 className="text-3xl font-bold text-[#3674B5]">Program Unggulan</h2>
                        <div className="w-20 h-1 bg-[#A1E3F9] mx-auto mt-4"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { 
                                title: 'Workshop Kreatif', 
                                desc: 'Pelatihan untuk mengasah kreativitas dan skill praktis dengan mentor berpengalaman',
                                icon: '🎨'
                            },
                            { 
                                title: 'Kompetisi Inovasi', 
                                desc: 'Ajang adu gagasan dan terobosan kreatif mahasiswa dengan hadiah menarik',
                                icon: '🏆'
                            },
                            { 
                                title: 'Community Project', 
                                desc: 'Proyek kolaborasi untuk berkontribusi pada masyarakat dan lingkungan sekitar',
                                icon: '🤝'
                            },
                            { 
                                title: 'Seminar Nasional', 
                                desc: 'Diskusi dengan pakar industri untuk membuka wawasan dan jaringan profesional',
                                icon: '📢'
                            },
                            { 
                                title: 'Pelatihan Entrepreneurship', 
                                desc: 'Membangun jiwa wirausaha dengan pembekalan teori dan praktik bisnis',
                                icon: '💼'
                            },
                            { 
                                title: 'Festival Kreativitas', 
                                desc: 'Pameran karya dan pertunjukan untuk mengekspresikan bakat dan minat anggota',
                                icon: '🎭'
                            }
                        ].map((program, index) => (
                            <div key={index} className="fade-in bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <div className="w-14 h-14 bg-[#A1E3F9] rounded-xl flex items-center justify-center mb-4 text-2xl">
                                    {program.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-[#3674B5] mb-3">{program.title}</h3>
                                <p className="text-gray-600">{program.desc}</p>
                            </div>
                        ))}
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

export default Proker;