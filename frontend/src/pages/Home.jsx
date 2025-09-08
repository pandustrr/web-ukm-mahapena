// File: src/pages/Home.jsx
const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-[#113F67] to-[#113F67] text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Selamat Datang di UKM MAHAPENA</h1>
                        <p className="text-xl mb-8 max-w-3xl mx-auto">
                            Wadah pengembangan kreativitas dan inovasi mahasiswa untuk mengeksplorasi potensi diri.
                        </p>
                        <button className="bg-[#000000] hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                            Jelajahi Lebih Lanjut
                        </button>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#3674B5]">Tentang Kami</h2>
                        <div className="w-20 h-1 bg-[#A1E3F9] mx-auto mt-4"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-gray-700 mb-6">
                                UKM Mahapena adalah Unit Kegiatan Mahasiswa yang berfokus pada pengembangan kreativitas,
                                inovasi, dan entrepreneurship di kalangan mahasiswa. Kami menyediakan berbagai program
                                dan kegiatan untuk membantu mahasiswa mengembangkan potensi diri.
                            </p>
                            <p className="text-gray-700">
                                Sejak didirikan pada tahun 2010, kami telah melahirkan banyak talenta-talenta kreatif
                                yang berkontribusi positif baik di kampus maupun di masyarakat.
                            </p>
                        </div>
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                                alt="Kegiatan Mahapena"
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Programs Section */}
            <section className="py-16 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#3674B5]">Program Unggulan</h2>
                        <div className="w-20 h-1 bg-[#A1E3F9] mx-auto mt-4"></div>
                        <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
                            Berbagai program menarik yang kami tawarkan untuk pengembangan diri dan skill mahasiswa
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Workshop Kreatif', desc: 'Pelatihan untuk mengasah kreativitas dan skill praktis' },
                            { title: 'Kompetisi Inovasi', desc: 'Ajang adu gagasan dan terobosan kreatif mahasiswa' },
                            { title: 'Community Project', desc: 'Proyek kolaborasi untuk berkontribusi pada masyarakat' }
                        ].map((program, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                                <div className="w-12 h-12 bg-[#A1E3F9] rounded-full flex items-center justify-center mb-4">
                                    <span className="text-[#3674B5] font-bold">{index + 1}</span>
                                </div>
                                <h3 className="text-xl font-semibold text-[#3674B5] mb-3">{program.title}</h3>
                                <p className="text-gray-600">{program.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-[#5682B1] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-6">Tertarik Bergabung Dengan Kami?</h2>
                    <p className="text-xl mb-8 max-w-3xl mx-auto">
                        Daftar sekarang dan jadilah bagian dari komunitas kreatif dan inovatif di kampus ini.
                    </p>
                    <button className="bg-[#000000] hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg transition duration-300 mr-4">
                        Daftar Sekarang
                    </button>
                    <button className="bg-transparent hover:bg-[#3674B5] text-white font-bold py-3 px-8 rounded-lg border border-white transition duration-300">
                        Informasi Lebih Lanjut
                    </button>
                </div>
            </section>
        </div>
    )
}

export default Home