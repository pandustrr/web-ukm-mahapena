// File: src/pages/Portofolio.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

// Placeholder images (ganti dengan gambar aktual Anda)
// import placeholder1 from "../assets/portfolio/placeholder1.jpg";
// import placeholder2 from "../assets/portfolio/placeholder2.jpg";
// import placeholder3 from "../assets/portfolio/placeholder3.jpg";
// import placeholder4 from "../assets/portfolio/placeholder4.jpg";
// import placeholder5 from "../assets/portfolio/placeholder5.jpg";
// import placeholder6 from "../assets/portfolio/placeholder6.jpg";

const Portofolio = () => {
    const [activeCategory, setActiveCategory] = useState("all");
    
    // Data portofolio (ganti dengan data aktual Anda)
    const portfolioItems = [
        {
            id: 1,
            title: "Proyek Desain Grafis",
            category: "design",
            image: placeholder1,
            description: "Desain branding untuk perusahaan startup",
            link: "/portofolio/1"
        },
        {
            id: 2,
            title: "Pengembangan Website",
            category: "web",
            image: placeholder2,
            description: "Website e-commerce dengan fitur lengkap",
            link: "/portofolio/2"
        },
        {
            id: 3,
            title: "Aplikasi Mobile",
            category: "mobile",
            image: placeholder3,
            description: "Aplikasi kesehatan dan kebugaran",
            link: "/portofolio/3"
        },
        {
            id: 4,
            title: "Kampanye Media Sosial",
            category: "marketing",
            image: placeholder4,
            description: "Kampanye awareness untuk produk baru",
            link: "/portofolio/4"
        },
        {
            id: 5,
            title: "Ilustrasi Digital",
            category: "design",
            image: placeholder5,
            description: "Seri ilustrasi untuk buku anak",
            link: "/portofolio/5"
        },
        {
            id: 6,
            title: "UI/UX Design",
            category: "design",
            image: placeholder6,
            description: "Redesign aplikasi banking",
            link: "/portofolio/6"
        }
    ];

    // Kategori portofolio
    const categories = [
        { id: "all", name: "Semua" },
        { id: "design", name: "Desain" },
        { id: "web", name: "Web Development" },
        { id: "mobile", name: "Mobile App" },
        { id: "marketing", name: "Marketing" }
    ];

    // Filter items berdasarkan kategori aktif
    const filteredItems = activeCategory === "all" 
        ? portfolioItems 
        : portfolioItems.filter(item => item.category === activeCategory);

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 bg-gray-50 dark:bg-[#0a2a43] text-[#113F67] dark:text-[#A1E3F9]">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Portofolio Kami</h1>
                    <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                        Jelajahi karya-karya terbaik yang telah kami hasilkan bersama berbagai klien dan proyek.
                    </p>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                activeCategory === category.id
                                    ? "bg-[#3674B5] text-white dark:bg-[#5682B1]"
                                    : "bg-white dark:bg-[#113F67] text-[#113F67] dark:text-[#A1E3F9] hover:bg-[#3674B5] hover:text-white dark:hover:bg-[#5682B1]"
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map(item => (
                        <div 
                            key={item.id} 
                            className="bg-white dark:bg-[#113F67] rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105"
                        >
                            <div className="h-48 overflow-hidden">
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                    {item.description}
                                </p>
                                <Link
                                    to={item.link}
                                    className="inline-block px-4 py-2 bg-[#3674B5] dark:bg-[#5682B1] text-white rounded-lg text-sm font-medium hover:bg-[#2a5d93] dark:hover:bg-[#4571a0] transition-colors"
                                >
                                    Lihat Detail
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredItems.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Tidak ada proyek dalam kategori ini.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Portofolio;