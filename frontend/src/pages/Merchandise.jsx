import React, { useState, useEffect } from "react";
import axios from "axios";

const Merchandise = () => {
    // const tokenAdmin = localStorage.getItem('tokenAdmin');

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    // const [selectedCategory, setSelectedCategory] = useState("all");


    const [isVisible, setIsVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState("detail");

    const [showModalTerimakasih, setShowModalTerimakasih] = useState(false);

    const [PenguranganStok, setPenguranganStok] = useState(products); // isi awal dari products

    const [formData, setFormData] = useState({
        nama: "",
        noWa: "",
        alamat: "",
        catatan: "",
        jumlah: 1,
        ukuran: "",
        warna: ""
    });

    const handlePesan = (product) => {
        setSelectedProduct(product);

        setFormData({
            nama: "",
            noWa: "",
            alamat: "",
            catatan: "",
            jumlah: 1,
            ukuran: product.sizes && product.sizes.length > 0 ? product.sizes[0] : "",
            warna: product.colors && product.colors.length > 0 ? product.colors[0] : "",
        });

        setActiveTab("detail");
        setShowModal(true);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleJumlahChange = (change) => {
        setFormData(prev => {
            const newJumlah = prev.jumlah + change;
            if (newJumlah < 1) return { ...prev, jumlah: 1 };
            if (selectedProduct && newJumlah > selectedProduct.stock) return { ...prev, jumlah: selectedProduct.stock };
            return { ...prev, jumlah: newJumlah };
        });
    };

    const handleWhatsAppOrder = () => {
        if (!selectedProduct) return;
        setShowModalTerimakasih(true);
    };

    // Fungsi ketika klik OK di modal
    const confirmOrderAndGoWhatsApp = async () => {
        try {
            // 1. Kurangi stok di backend
            const response = await fetch(
                `http://localhost:8000/api/merchandise/${selectedProduct.id}/decrease-stock-public`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ jumlah: formData.jumlah })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                setShowModalTerimakasih(false);
                return;
            }

            // 2. Update stok di frontend
            setPenguranganStok(prev =>
                prev.map(p =>
                    p.id === selectedProduct.id ? { ...p, stock: data.stock } : p
                )
            );

            // 3. Tutup modal
            setShowModalTerimakasih(false);

            // 4. Redirect ke WhatsApp
            const message = `Halo, saya ingin memesan merchandise:\n\n` +
                `*Nama Produk:* ${selectedProduct.name}\n` +
                `*Harga:* ${selectedProduct.price}\n` +
                `*Jumlah:* ${formData.jumlah}\n` +
                (formData.ukuran ? `*Ukuran:* ${formData.ukuran}\n` : '') +
                (formData.warna ? `*Warna:* ${formData.warna}\n` : '') +
                `*Total:* ${formData.jumlah * parseFloat(selectedProduct.price)}\n\n` +
                `*Data Pemesan:*\n` +
                `Nama: ${formData.nama}\n` +
                `No. WhatsApp: ${formData.noWa}\n` +
                `Alamat: ${formData.alamat}\n` +
                (formData.catatan ? `Catatan: ${formData.catatan}\n` : '');

            const encodedMessage = encodeURIComponent(message);
            const phoneNumber = "6281556509656";
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');

        } catch (err) {
            console.error(err);
            alert("Terjadi kesalahan saat memesan.");
            setShowModalTerimakasih(false);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/categories");
                const categoriesFromApi = res.data;
                setCategories([{ id: "all", name: "Semua" }, ...categoriesFromApi]);
            } catch (err) {
                console.error("Gagal ambil data kategori:", err);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/merchandises");
                setProducts(res.data);
            } catch (err) {
                console.error("Gagal ambil produk:", err);
            }
        };
        fetchProducts();
    }, []);

    // Filter produk berdasarkan kategori
    const filteredProducts = selectedCategory === null
        ? products
        : products.filter(product => product.category_id === Number(selectedCategory));


    useEffect(() => {
        setIsVisible(true);
        const handleScroll = () => {
            const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .zoom-in');
            elements.forEach(el => {
                if (!el.closest('.modal')) {
                    const elementTop = el.getBoundingClientRect().top;
                    if (elementTop < window.innerHeight - 100) {
                        el.classList.add('visible');
                    }
                }
            });
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
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
                        backgroundImage: `url(https://images.pexels.com/photos/1884583/pexels-photo-1884583.jpeg)`
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/80 to-[#000000]/60 dark:from-[#000000]/90 dark:to-[#113F67]/70"></div>
                    <div className="absolute inset-0 bg-noise opacity-10 dark:opacity-20"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#A1E3F9] to-[#FFFFFF] dark:from-[#A1E3F9] dark:to-[#5682B1]">
                        Mahapena Merchandise
                    </h1>
                    <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto text-[#A1E3F9]/90 dark:text-[#A1E3F9] drop-shadow-sm">
                        Dukung kreativitas mahasiswa dengan merchandise eksklusif karya anggota UKM Mahapena
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

            {/* Kategori Produk */}
            <section className="py-10 bg-gradient-to-b from-gray-50 to-[#FFFFFF] dark:from-slate-800 dark:to-slate-800 relative overflow-hidden">
                {/* Background dots */}
                <div className="absolute inset-0 opacity-5 dark:opacity-15">
                    <div className="absolute inset-0 pattern-dots pattern-[#3674B5] dark:pattern-[#A1E3F9] pattern-opacity-20 dark:pattern-opacity-25 pattern-size-4"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Judul */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-[#3674B5] dark:text-[#A1E3F9] relative inline-block">
                            Kategori Produk
                            <span className="block w-16 h-1 bg-[#A1E3F9] dark:bg-[#3674B5] mx-auto mt-3 rounded-full"></span>
                        </h2>
                        <p className="text-[#113F67] dark:text-[#5682B1] mt-6 max-w-2xl mx-auto">
                            Jelajahi berbagai kategori merchandise eksklusif kami
                        </p>
                    </div>

                    {/* Tombol kategori */}
                    <div className="flex justify-center mb-12">
                        <div className="inline-flex rounded-md shadow-sm overflow-hidden border border-[#A1E3F9]/40 dark:border-[#3674B5]/40 bg-white dark:bg-slate-800 transition-colors duration-500">
                            {/* Tombol Semua */}
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`px-4 py-3 font-medium transition-all duration-300
            ${selectedCategory === null
                                        ? "bg-[#3674B5] text-white dark:bg-[#A1E3F9] dark:text-slate-900 shadow-md scale-105"
                                        : "bg-white dark:bg-slate-800 text-[#113F67] dark:text-gray-300 hover:bg-[#A1E3F9]/30 dark:hover:bg-[#3674B5]/40 hover:text-[#113F67] dark:hover:text-white"
                                    } rounded-l-md`}
                            >
                                Semua
                            </button>

                            {/* Tombol kategori lain */}
                            {categories
                                .filter(category => category.name.toLowerCase() !== "semua")
                                .map((category, idx) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`px-4 py-3 font-medium transition-all duration-300
                ${selectedCategory === category.id
                                                ? "bg-[#3674B5] text-white dark:bg-[#A1E3F9] dark:text-slate-900 shadow-md scale-105"
                                                : "bg-white dark:bg-slate-800 text-[#113F67] dark:text-gray-300 hover:bg-[#A1E3F9]/30 dark:hover:bg-[#3674B5]/40 hover:text-[#113F67] dark:hover:text-white"
                                            }
                ${idx === categories.length - 1 ? "rounded-r-md" : ""}`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                        </div>
                    </div>
                    {/* Category indicator */}
                    <div className="flex justify-center mt-2">
                        <div className="w-24 h-1 bg-[#A1E3F9]/30 dark:bg-[#113F67] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#3674B5] dark:bg-[#A1E3F9] transition-all duration-500 ease-out"
                                style={{
                                    width: `${selectedCategory === null
                                        ? 100 // Semua kategori aktif
                                        : ((categories.findIndex(cat => cat.id === selectedCategory) + 1) *
                                            (100 / (categories.length))) // indikator per kategori
                                        }%`
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products */}
            <section className="pt-16 pb-50 bg-white dark:bg-slate-800 relative overflow-hidden">

                {/* Subtle background elements */}
                {/* <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#A1E3F9]/10 dark:bg-[#A1E3F9]/20 blur-3xl"></div> */}
                <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#3674B5]/10 dark:bg-[#3674B5]/20 blur-3xl"></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Container produk */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="zoom-in bg-white dark:bg-[#113F67] rounded-lg shadow-md dark:shadow-xl hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 dark:border-[#3674B5]/30 relative"
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 dark:to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

                                <div className="relative overflow-hidden">
                                    <div className="relative h-48 sm:h-56 md:h-60 overflow-hidden">
                                        <img
                                            src={`http://localhost:8000/storage/${product.image}`}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/10 dark:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>

                                    <div className="absolute top-3 right-3 bg-[#113F67] text-white px-3 py-1 rounded-full text-sm font-medium z-20 shadow-md">
                                        {product.category?.name}
                                    </div>
                                    <div className="absolute top-3 left-3 bg-[#3674B5] text-white px-2 py-1 rounded text-sm font-medium z-20 shadow-md">
                                        Stok: {product.stock}
                                    </div>

                                    {/* Tombol Quick view */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                        <button
                                            onClick={() => handlePesan(product)}
                                            disabled={product.stock === 0}
                                            className={`py-2 px-5 rounded-full font-medium ${product.stock === 0
                                                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                                : "bg-white dark:bg-[#A1E3F9] text-[#113F67] hover:bg-[#113F67] dark:hover:bg-[#3674B5] hover:text-white"
                                                } transition-colors duration-300 shadow-lg`}
                                        >
                                            Lihat Detail
                                        </button>
                                    </div>
                                </div>

                                <div className="p-5 relative z-20 bg-white dark:bg-slate-800">
                                    <h3 className="text-xl font-semibold text-[#3674B5] dark:text-[#A1E3F9] mb-2 group-hover:text-[#113F67] dark:group-hover:text-[#5682B1] transition-colors duration-300">
                                        {product.name}
                                    </h3>
                                    <p className="text-xl font-bold text-[#113F67] dark:text-white mb-2">
                                        {product.price}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                        Stok: {product.stock}
                                    </p>
                                    <button
                                        onClick={() => handlePesan(product)}
                                        disabled={product.stock === 0}
                                        className={`w-full font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center relative overflow-hidden group ${product.stock === 0
                                            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                            : "bg-[#3674B5] hover:bg-[#113F67] text-white hover:shadow-md"
                                            }`}
                                    >
                                        <span className="relative z-10 flex items-center">
                                            {product.stock === 0 ? (
                                                "Stok Habis"
                                            ) : (
                                                <>
                                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.016a9.97 9.97 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.936 9.936 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488" />
                                                    </svg>
                                                    Pesan Via WA
                                                </>
                                            )}
                                        </span>
                                        {product.stock > 0 && (
                                            <span className="absolute inset-0 bg-gradient-to-r from-[#3674B5] to-[#113F67] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Kalau kosong */}
                    {filteredProducts.length === 0 && (
                        <div className="text-center py-16 fade-in">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-slate-700">
                                <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300">
                                Tidak ada produk dalam kategori ini
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">
                                Coba kategori lain untuk melihat lebih banyak pilihan
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Modal Pesanan */}
            {showModal && selectedProduct && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div
                        className="bg-white dark:bg-slate-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header Modal */}
                        <div className="p-6 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-[#3674B5] to-[#2c6099] text-white">
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-bold">Detail {selectedProduct.name}</h3>
                                <button
                                    onClick={() => setShowModal(false)}
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

                            {/* Tab Navigation */}
                            <div className="mt-4 flex border-b border-[#5682B1]">
                                <button
                                    onClick={() => setActiveTab("detail")}
                                    className={`py-2 px-4 font-medium ${activeTab === "detail"
                                        ? "text-white border-b-2 border-white"
                                        : "text-[#A1E3F9]"
                                        }`}
                                >
                                    Detail Produk
                                </button>
                                <button
                                    onClick={() => setActiveTab("pemesanan")}
                                    className={`py-2 px-4 font-medium ${activeTab === "pemesanan"
                                        ? "text-white border-b-2 border-white"
                                        : "text-[#A1E3F9]"
                                        }`}
                                >
                                    Pemesanan
                                </button>
                            </div>
                        </div>

                        {showModalTerimakasih && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                                <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                                    <h2 className="text-lg font-semibold mb-4">Terima Kasih 🎉</h2>
                                    <p className="text-gray-600 mb-6">Pesanan kamu berhasil, klik OK untuk melanjutkan ke WhatsApp.</p>
                                    <div className="flex justify-center gap-3">
                                        <button
                                            onClick={() => setShowModalTerimakasih(false)}
                                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            onClick={confirmOrderAndGoWhatsApp}
                                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                        >
                                            OK
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}


                        {/* Konten berdasarkan tab aktif */}
                        {activeTab === "detail" ? (
                            <div className="p-6 dark:bg-slate-800 dark:text-white">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Gambar Produk */}
                                    <div className="rounded-lg overflow-hidden">
                                        <img
                                            src={`http://localhost:8000/storage/${selectedProduct.image}`}
                                            alt={selectedProduct.name}
                                            className="w-full h-auto object-cover rounded-lg shadow-md"
                                            onError={(e) => {
                                                e.target.src = "https://via.placeholder.com/300?text=No+Image";
                                            }}
                                        />
                                    </div>
                                    {/* Detail Produk */}
                                    <div>
                                        <h4 className="text-2xl font-bold text-[#3674B5] dark:text-[#A1E3F9] mb-2">
                                            {selectedProduct.name}
                                        </h4>
                                        <p className="text-3xl font-bold text-[#113F67] dark:text-white mb-4">
                                            {selectedProduct.price}
                                        </p>

                                        <div className="mb-6">
                                            <div className="flex items-center mb-2">
                                                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                                    Stok: {selectedProduct.stock}
                                                </span>
                                                <span className="ml-3 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                                    Kategori: {selectedProduct.category?.name}
                                                </span>
                                            </div>

                                            <div className="mt-4 space-y-3">

                                                <div className="flex items-center">
                                                    <svg
                                                        className="w-5 h-5 text-[#3674B5] dark:text-[#A1E3F9] mt-0.5 mr-2"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                            clipRule="evenodd"
                                                        ></path>
                                                    </svg>
                                                    <span>
                                                        Min. Pemesanan: 1

                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Deskripsi Produk */}
                                        <div className="prose max-w-none dark:prose-invert">
                                            <h5 className="text-lg font-semibold text-[#3674B5] dark:text-[#A1E3F9] mb-2">
                                                Deskripsi Produk
                                            </h5>

                                            {/* Teks Deskripsi */}
                                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                                {selectedProduct.description || "-"}
                                            </p>

                                            {/* Pilihan Ukuran */}
                                            <h6 className="font-semibold text-[#113F67] dark:text-[#A1E3F9] mt-4 mb-2">
                                                Pilihan Ukuran
                                            </h6>
                                            {Array.isArray(selectedProduct.sizes) && selectedProduct.sizes.length > 0 ? (
                                                <ul className="text-gray-700 dark:text-gray-300 list-disc pl-5 mb-4">
                                                    {selectedProduct.sizes.map((size, index) => (
                                                        <li key={index}>{size}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-gray-700 dark:text-gray-300 mb-4">-</p>
                                            )}

                                            {/* Pilihan Warna */}
                                            <h6 className="font-semibold text-[#113F67] dark:text-[#A1E3F9] mt-4 mb-2">
                                                Pilihan Warna
                                            </h6>
                                            {Array.isArray(selectedProduct.colors) && selectedProduct.colors.length > 0 ? (
                                                <ul className="text-gray-700 dark:text-gray-300 list-disc pl-5 mb-4">
                                                    {selectedProduct.colors.map((color, index) => (
                                                        <li key={index}>{color}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-gray-700 dark:text-gray-300 mb-4">-</p>
                                            )}
                                        </div>


                                        {/* Tombol untuk beralih ke pemesanan */}
                                        <div className="mt-8">
                                            <button
                                                type="button"
                                                onClick={() => setActiveTab("pemesanan")}
                                                className="w-full py-3 bg-[#3674B5] hover:bg-[#113F67] text-white rounded-lg transition-colors duration-300 font-medium"
                                            >
                                                Pesan Sekarang
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="dark:bg-slate-800">
                                <div className="p-6">

                                    {/* Info Produk */}
                                    <div className="flex items-center mb-6 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600 shadow-sm">
                                        <div className="relative">
                                            <img
                                                src={`http://localhost:8000/storage/${selectedProduct.image}`}
                                                alt={selectedProduct.name}
                                                className="w-16 h-16 object-cover rounded-md mr-4"
                                            />
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#3674B5] rounded-full flex items-center justify-center text-white text-xs">
                                                {selectedProduct.stock}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-[#3674B5] dark:text-[#A1E3F9]">{selectedProduct.name}</h4>
                                            <p className="text-lg font-bold text-[#113F67] dark:text-white">{selectedProduct.price}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Kategori: {selectedProduct.category?.name}</p>
                                        </div>
                                    </div>

                                    {/* Form Pemesanan */}
                                    <div className="space-y-4">
                                        <div>
                                            {/* Jumlah + Ukuran + Warna sejajar */}
                                            <div className="flex items-start gap-6 flex-wrap">

                                                {/* Input Jumlah */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Jumlah
                                                    </label>
                                                    <div className="flex items-center max-w-xs rounded-lg overflow-hidden border border-gray-300 dark:border-slate-600 shadow-sm">
                                                        {/* Tombol - */}
                                                        <button
                                                            onClick={() => handleJumlahChange(-1)}
                                                            disabled={formData.jumlah <= 1}
                                                            className={`w-10 h-10 flex items-center justify-center font-bold 
        transition-colors duration-200
        ${formData.jumlah <= 1
                                                                    ? "bg-gray-200 text-gray-400 dark:bg-slate-700 dark:text-gray-500 cursor-not-allowed"
                                                                    : "bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700"}`}
                                                        >
                                                            −
                                                        </button>

                                                        {/* Input Jumlah */}
                                                        <input
                                                            type="number"
                                                            value={formData.jumlah}
                                                            readOnly
                                                            className="w-16 h-10 text-center font-semibold 
        bg-white dark:bg-slate-800 text-gray-800 dark:text-white
        border-x border-gray-300 dark:border-slate-600"
                                                        />

                                                        {/* Tombol + */}
                                                        <button
                                                            onClick={() => handleJumlahChange(1)}
                                                            disabled={formData.jumlah >= selectedProduct.stock}
                                                            className={`w-10 h-10 flex items-center justify-center font-bold 
        transition-colors duration-200
        ${formData.jumlah >= selectedProduct.stock
                                                                    ? "bg-gray-200 text-gray-400 dark:bg-slate-700 dark:text-gray-500 cursor-not-allowed"
                                                                    : "bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700"}`}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        Maksimal: {selectedProduct.stock} pcs
                                                    </p>
                                                </div>

                                                {/* Pilih Ukuran */}
                                                {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                            Pilih Ukuran
                                                        </label>
                                                        <div className="flex gap-2 flex-wrap">
                                                            {selectedProduct.sizes.map((size, index) => (
                                                                <button
                                                                    key={index}
                                                                    type="button"
                                                                    onClick={() => setFormData({ ...formData, ukuran: size })}
                                                                    className={`px-4 py-2 rounded-lg border transition-colors duration-200 
                                ${formData.ukuran === size
                                                                            ? "bg-[#3674B5] text-white border-[#3674B5]"
                                                                            : "bg-white dark:bg-slate-800 dark:text-white border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700"
                                                                        }`}
                                                                >
                                                                    {size}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Pilih Warna */}
                                                {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                            Pilih Warna
                                                        </label>
                                                        <div className="flex gap-2 flex-wrap">
                                                            {selectedProduct.colors.map((color, index) => (
                                                                <button
                                                                    key={index}
                                                                    type="button"
                                                                    onClick={() => setFormData({ ...formData, warna: color })}
                                                                    className={`px-4 py-2 rounded-lg border transition-colors duration-200 
                                ${formData.warna === color
                                                                            ? "bg-[#3674B5] text-white border-[#3674B5]"
                                                                            : "bg-white dark:bg-slate-800 dark:text-white border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700"
                                                                        }`}
                                                                >
                                                                    {color}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                            </div>
                                        </div>


                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Lengkap</label>
                                            <input
                                                type="text"
                                                name="nama"
                                                value={formData.nama}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#3674B5] focus:border-transparent transition-colors duration-200 bg-white dark:bg-slate-800 dark:text-white"
                                                placeholder="Masukkan nama lengkap"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nomor WhatsApp</label>
                                            <input
                                                type="tel"
                                                name="noWa"
                                                value={formData.noWa}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#3674B5] focus:border-transparent transition-colors duration-200 bg-white dark:bg-slate-800 dark:text-white"
                                                placeholder="Contoh: 081234567890"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alamat Pengiriman</label>
                                            <textarea
                                                name="alamat"
                                                value={formData.alamat}
                                                onChange={handleInputChange}
                                                rows="3"
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#3674B5] focus:border-transparent transition-colors duration-200 bg-white dark:bg-slate-800 dark:text-white"
                                                placeholder="Masukkan alamat lengkap untuk pengiriman"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Catatan (Opsional)</label>
                                            <textarea
                                                name="catatan"
                                                value={formData.catatan}
                                                onChange={handleInputChange}
                                                rows="2"
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#3674B5] focus:border-transparent transition-colors duration-200 bg-white dark:bg-slate-800 dark:text-white"
                                                placeholder="Catatan tambahan untuk pesanan"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700 rounded-b-xl">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        {/* Tombol Batal */}
                                        <button
                                            onClick={() => setShowModal(false)}
                                            className="px-6 py-3 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-all font-medium"
                                        >
                                            Batal
                                        </button>

                                        {/* Tombol Pesan via WhatsApp */}
                                        <button
                                            onClick={handleWhatsAppOrder}
                                            disabled={
                                                !formData.nama ||
                                                !formData.noWa ||
                                                !formData.alamat ||
                                                formData.jumlah < 1 ||
                                                formData.jumlah > selectedProduct.stock
                                            } className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium relative overflow-hidden group"
                                        >
                                            <span className="relative z-10 flex items-center">
                                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.016a9.97 9.97 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.936 9.936 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488" />
                                                </svg>
                                                Pesan Sekarang via WhatsApp
                                            </span>
                                            <span className="absolute inset-0 bg-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
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
            `}</style>
        </div>
    );
};

export default Merchandise;