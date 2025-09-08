// File: src/pages/Blog.jsx
import { useState, useEffect } from "react";

const Blog = () => {
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
                    <h1 className="text-4xl font-bold mb-4">Blog Mahapena</h1>
                    <p className="text-xl">Artikel dan berita terbaru seputar kegiatan kami</p>
                </div>
            </section>

            {/* Blog Content */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 fade-in">
                        <h2 className="text-3xl font-bold text-[#3674B5]">Artikel Terbaru</h2>
                        <div className="w-20 h-1 bg-[#A1E3F9] mx-auto mt-4"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { 
                                title: 'Workshop Design Thinking Sukses Digelar', 
                                desc: 'Pelatihan design thinking berhasil menarik 150 peserta dari berbagai fakultas',
                                date: '15 Nov 2023',
                                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
                            },
                            { 
                                title: 'Mahapena Raih Penghargaan Inovasi', 
                                desc: 'UKM Mahapena meraih penghargaan sebagai unit kegiatan paling inovatif',
                                date: '8 Nov 2023',
                                image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
                            },
                            { 
                                title: 'Open Recruitment Anggota Baru', 
                                desc: 'Pendaftaran anggota baru Mahapena dibuka hingga 30 November 2023',
                                date: '1 Nov 2023',
                                image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
                            }
                        ].map((article, index) => (
                            <div key={index} className="fade-in bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                                <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <span className="text-sm text-gray-500">{article.date}</span>
                                    <h3 className="text-xl font-semibold text-[#3674B5] mb-3 mt-2">{article.title}</h3>
                                    <p className="text-gray-600 mb-4">{article.desc}</p>
                                    <button className="text-[#113F67] font-medium hover:text-[#3674B5] transition-colors">
                                        Baca Selengkapnya →
                                    </button>
                                </div>
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

export default Blog;