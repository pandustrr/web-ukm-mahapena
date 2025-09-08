// File: src/pages/Merchandise.jsx
import { useState, useEffect } from "react";

const Merchandise = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        nama: "",
        noWa: "",
        alamat: "",
        catatan: "",
        jumlah: 1
    });

    useEffect(() => {
        setIsVisible(true);

        const handleScroll = () => {
            const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .zoom-in');
            elements.forEach(el => {
                // pastikan elemen bukan modal
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


    const handlePesan = (product) => {
        setSelectedProduct(product);
        setFormData({
            nama: "",
            noWa: "",
            alamat: "",
            catatan: "",
            jumlah: 1
        });
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
        const newJumlah = Math.max(1, formData.jumlah + change);
        if (selectedProduct && newJumlah <= selectedProduct.stok) {
            setFormData(prev => ({
                ...prev,
                jumlah: newJumlah
            }));
        }
    };

    const generateWhatsAppMessage = () => {
        const totalHarga = parseInt(selectedProduct.price.replace(/\D/g, '')) * formData.jumlah;
        const message = `Halo, saya ingin memesan merchandise Mahapena:\n\n` +
            `*Produk:* ${selectedProduct.name}\n` +
            `*Harga:* ${selectedProduct.price} x ${formData.jumlah} = Rp ${totalHarga.toLocaleString('id-ID')}\n` +
            `*Nama:* ${formData.nama}\n` +
            `*No. WhatsApp:* ${formData.noWa}\n` +
            `*Alamat:* ${formData.alamat}\n` +
            `*Catatan:* ${formData.catatan || '-'}\n\n` +
            `Terima kasih!`;

        return encodeURIComponent(message);
    };

    const handleWhatsAppOrder = () => {
        const message = generateWhatsAppMessage();
        window.open(`https://wa.me/6281234567890?text=${message}`, '_blank');
    };

    const categories = ["Semua", "Baju", "Aksesoris", "Stationery", "Lainnya"];
    const [selectedCategory, setSelectedCategory] = useState("Semua");

    const products = [
        {
            name: 'Kaos Mahapena',
            price: 'Rp 120.000',
            category: 'Baju',
            stok: 15,
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
            name: 'Totebag Kreatif',
            price: 'Rp 75.000',
            category: 'Aksesoris',
            stok: 25,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
            name: 'Notebook Eksklusif',
            price: 'Rp 45.000',
            category: 'Stationery',
            stok: 30,
            image: 'https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
            name: 'Sticker Pack',
            price: 'Rp 25.000',
            category: 'Stationery',
            stok: 100,
            image: 'https://images.unsplash.com/photo-1584824486539-53bb4646bdbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
            name: 'Mousepad Design',
            price: 'Rp 65.000',
            category: 'Lainnya',
            stok: 20,
            image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
            name: 'Pin Collection',
            price: 'Rp 15.000',
            category: 'Aksesoris',
            stok: 50,
            image: 'https://images.unsplash.com/photo-1589782182703-2aaa690365b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        }
    ];

    const filteredProducts = selectedCategory === "Semua"
        ? products
        : products.filter(product => product.category === selectedCategory);

    return (
        <div className="relative">
            {/* Floating decorative elements */}
            <div className="fixed top-20 left-10 w-16 h-16 rounded-full bg-[#A1E3F9]/20 blur-xl z-0 animate-pulse-slow"></div>
            <div className="fixed top-1/3 right-16 w-20 h-20 rounded-full bg-[#3674B5]/20 blur-xl z-0 animate-pulse-medium"></div>
            <div className="fixed bottom-40 left-1/4 w-24 h-24 rounded-full bg-[#113F67]/10 blur-xl z-0 animate-pulse-slow"></div>

            {/* Header bg */}
            <section className="pt-28 pb-20 md:pt-36 md:pb-28 relative text-white overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(https://images.pexels.com/photos/1884583/pexels-photo-1884583.jpeg)`
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
                    <div className="absolute inset-0 bg-noise opacity-10"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="slide-in-left mb-6">
                        <div className="inline-flex items-center justify-center mb-4">
                            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#A1E3F9] to-white">Mahapena Merchandise</h1>
                        </div>
                    </div>
                    <div className="slide-in-right">
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-100 drop-shadow-md">
                            Dukung kreativitas mahasiswa dengan merchandise eksklusif karya anggota UKM Mahapena
                        </p>
                    </div>

                    {/* Animated scroll indicator */}
                    <div className="mt-16 animate-bounce">
                        <div className="flex flex-col items-center">
                            <span className="text-sm mb-2">Scroll untuk melihat</span>
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                        className="w-full h-16 text-white fill-current"
                    >
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V56.44Z"></path>
                    </svg>
                </div>
            </section>

            {/* Kategori Produk */}
            <section className="py-2 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-100 to-transparent"></div>
                    <div className="absolute inset-0 pattern-dots pattern-blue-500 pattern-opacity-20 pattern-size-4"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12">
                        <div className="inline-block relative">
                            <h2 className="text-3xl font-bold text-[#3674B5] relative z-10">Kategori Produk</h2>
                            <div className="absolute -bottom-2 left-0 right-0 h-2 bg-[#A1E3F9]/40 rounded-full"></div>
                            <div className="w-20 h-1 bg-[#A1E3F9] mx-auto mt-4"></div>
                        </div>
                        <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
                            Jelajahi berbagai kategori merchandise eksklusif kami
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 relative overflow-hidden group ${selectedCategory === category
                                        ? "bg-[#3674B5] text-white shadow-lg transform hover:scale-105"
                                        : "bg-white text-[#113F67] hover:bg-[#A1E3F9] hover:text-[#113F67] shadow-md hover:shadow-lg dark:bg-[#000000] dark:text-[#A1E3F9] dark:hover:bg-[#113F67] dark:hover:text-[#FFFFFF]"
                                    }`}
                            >
                                <span className="relative z-10">{category}</span>
                                {selectedCategory === category && (
                                    <span className="absolute inset-0 bg-gradient-to-r from-[#3674B5] to-[#2c6099]"></span>
                                )}
                                <span className="absolute inset-0 bg-gradient-to-r from-[#3674B5] to-[#2c6099] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            </button>
                        ))}
                    </div>

                    {/* Category indicator animation */}
                    <div className="flex justify-center mb-8">
                        <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#3674B5] transition-all duration-500 ease-out"
                                style={{
                                    width: `${(categories.findIndex(cat => cat === selectedCategory) + 1) * (100 / categories.length)}%`
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products */}
            <section className="py-12 bg-white relative overflow-hidden">
                {/* Subtle background elements */}
                <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#A1E3F9]/10 blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#3674B5]/10 blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product, index) => (
                            <div
                                key={index}
                                className="zoom-in bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 relative"
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                {/* Hover effect overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

                                <div className="relative overflow-hidden">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>

                                    <div className="absolute top-2 right-2 bg-[#113F67] text-white px-2 py-1 rounded-full text-xs font-medium z-20 shadow-md">
                                        {product.category}
                                    </div>
                                    <div className="absolute top-2 left-2 bg-[#3674B5] text-white px-1.5 py-0.5 rounded text-xs font-medium z-20 shadow-md">
                                        Stok: {product.stok}
                                    </div>

                                    {/* Quick view button that appears on hover */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                        <button
                                            onClick={() => handlePesan(product)}
                                            disabled={product.stok === 0}
                                            className={`py-1.5 px-4 rounded-full font-medium text-sm ${product.stok === 0
                                                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                                    : "bg-white text-[#113F67] hover:bg-[#113F67] hover:text-white"
                                                } transition-colors duration-300 shadow-lg`}
                                        >
                                            Lihat Detail
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4 relative z-20 bg-white">
                                    <h3 className="text-lg font-semibold text-[#3674B5] mb-1 group-hover:text-[#113F67] transition-colors duration-300 truncate">{product.name}</h3>
                                    <p className="text-xl font-bold text-[#113F67] mb-1">{product.price}</p>
                                    <p className="text-xs text-gray-600 mb-3">Stok: {product.stok}</p>
                                    <button
                                        onClick={() => handlePesan(product)}
                                        disabled={product.stok === 0}
                                        className={`w-full font-medium py-2 px-3 rounded-md transition-all duration-300 flex items-center justify-center relative overflow-hidden group text-sm ${product.stok === 0
                                                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                                : "bg-[#3674B5] hover:bg-[#2c6099] text-white hover:shadow-md"
                                            }`}
                                    >
                                        <span className="relative z-10 flex items-center">
                                            {product.stok === 0 ? (
                                                "Stok Habis"
                                            ) : (
                                                <>
                                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.016a9.97 9.97 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.936 9.936 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488" />
                                                    </svg>
                                                    Pesan Via WA
                                                </>
                                            )}
                                        </span>
                                        {product.stok > 0 && (
                                            <span className="absolute inset-0 bg-gradient-to-r from-[#3674B5] to-[#2c6099] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12 fade-in">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium text-gray-600">Tidak ada produk dalam kategori ini</h3>
                            <p className="text-gray-500 mt-2">Coba kategori lain untuk melihat lebih banyak pilihan</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Modal Pesanan */}
            {showModal && selectedProduct && (
                <div className="modal fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div
                        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#3674B5] to-[#2c6099] text-white">
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-bold">Pesan {selectedProduct.name}</h3>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-white hover:text-gray-200 transition-colors duration-200"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Info Produk */}
                            <div className="flex items-center mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                                <div className="relative">
                                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#3674B5] rounded-full flex items-center justify-center text-white text-xs">
                                        {selectedProduct.stok}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-[#3674B5]">{selectedProduct.name}</h4>
                                    <p className="text-lg font-bold text-[#113F67]">{selectedProduct.price}</p>
                                    <p className="text-sm text-gray-600">Kategori: {selectedProduct.category}</p>
                                </div>
                            </div>

                            {/* Form Pemesanan */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah</label>
                                    <div className="flex items-center max-w-xs">
                                        <button
                                            onClick={() => handleJumlahChange(-1)}
                                            disabled={formData.jumlah <= 1}
                                            className="w-10 h-10 rounded-l bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 transition-colors duration-200"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={formData.jumlah}
                                            readOnly
                                            className="w-16 h-10 text-center border-t border-b border-gray-300 font-medium"
                                        />
                                        <button
                                            onClick={() => handleJumlahChange(1)}
                                            disabled={formData.jumlah >= selectedProduct.stok}
                                            className="w-10 h-10 rounded-r bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 transition-colors duration-200"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Maksimal: {selectedProduct.stok} pcs
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        name="nama"
                                        value={formData.nama}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3674B5] focus:border-transparent transition-colors duration-200"
                                        placeholder="Masukkan nama lengkap"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp</label>
                                    <input
                                        type="tel"
                                        name="noWa"
                                        value={formData.noWa}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3674B5] focus:border-transparent transition-colors duration-200"
                                        placeholder="Contoh: 081234567890"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Pengiriman</label>
                                    <textarea
                                        name="alamat"
                                        value={formData.alamat}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3674B5] focus:border-transparent transition-colors duration-200"
                                        placeholder="Masukkan alamat lengkap untuk pengiriman"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Catatan (Opsional)</label>
                                    <textarea
                                        name="catatan"
                                        value={formData.catatan}
                                        onChange={handleInputChange}
                                        rows="2"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3674B5] focus:border-transparent transition-colors duration-200"
                                        placeholder="Catatan tambahan untuk pesanan"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all font-medium"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleWhatsAppOrder}
                                    disabled={!formData.nama || !formData.noWa || !formData.alamat}
                                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium relative overflow-hidden group"
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