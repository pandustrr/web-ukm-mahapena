// File: src/components/Footer.jsx
const Footer = () => {
    return (
        <footer className="bg-[#000000] text-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-[#A1E3F9]">UKM MAHAPENA</h3>
                        <p className="text-sm text-gray-300">
                            Unit Kegiatan Mahasiswa yang fokus pada pengembangan kreativitas dan inovasi mahasiswa.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-[#A1E3F9]">Kontak</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>Email: info@mahapena.ac.id</li>
                            <li>Phone: (021) 1234-5678</li>
                            <li>Alamat: Universitas Example, Jl. Example No. 123</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-[#A1E3F9]">Tautan Cepat</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><a href="#" className="hover:text-[#A1E3F9]">Beranda</a></li>
                            <li><a href="#" className="hover:text-[#A1E3F9]">Profil</a></li>
                            <li><a href="#" className="hover:text-[#A1E3F9]">Program Kerja</a></li>
                            <li><a href="#" className="hover:text-[#A1E3F9]">Blog</a></li>
                            <li><a href="#" className="hover:text-[#A1E3F9]">Store</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-300 text-center">
                    <p>&copy; {new Date().getFullYear()} UKM MAHAPENA. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer