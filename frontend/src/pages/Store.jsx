// File: src/pages/Store.jsx
import { useState, useEffect } from "react";

const Store = () => {
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
                    <h1 className="text-4xl font-bold mb-4">Mahapena Store</h1>
                    <p className="text-xl">Merchandise eksklusif dan produk kreatif karya anggota</p>
                </div>
            </section>

            {/* Products */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 fade-in">
                        <h2 className="text-3xl font-bold text-[#3674B5]">Produk Kami</h2>
                        <div className="w-20 h-1 bg-[#A1E3F9] mx-auto mt-4"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { 
                                name: 'Kaos Mahapena', 
                                price: 'Rp 120.000',
                                image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
                            },
                            { 
                                name: 'Totebag Kreatif', 
                                price: 'Rp 75.000',
                                image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
                            },
                            { 
                                name: 'Notebook Eksklusif', 
                                price: 'Rp 45.000',
                                image: 'https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
                            },
                            { 
                                name: 'Sticker Pack', 
                                price: 'Rp 25.000',
                                image: 'https://images.unsplash.com/photo-1584824486539-53bb4646bdbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
                            },
                            { 
                                name: 'Mousepad Design', 
                                price: 'Rp 65.000',
                                image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
                            },
                            { 
                                name: 'Pin Collection', 
                                price: 'Rp 15.000',
                                image: 'https://images.unsplash.com/photo-1589782182703-2aaa690365b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
                            }
                        ].map((product, index) => (
                            <div key={index} className="fade-in bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                                <div className="relative overflow-hidden">
                                    <img src={product.image} alt={product.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-[#3674B5] mb-2">{product.name}</h3>
                                    <p className="text-2xl font-bold text-[#113F67] mb-4">{product.price}</p>
                                    <button className="w-full bg-[#3674B5] hover:bg-[#2c6099] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
                                        Tambah ke Keranjang
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

export default Store;