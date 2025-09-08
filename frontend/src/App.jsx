// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="bg-green-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">UKM Mahapena</h1>
        <div className="space-x-4">
          <a href="#home" className="hover:underline">Beranda</a>
          <a href="#about" className="hover:underline">Tentang</a>
          <a href="#produk" className="hover:underline">Produk</a>
          <a href="#kontak" className="hover:underline">Kontak</a>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="bg-gray-100 text-center py-20">
        <h2 className="text-4xl font-bold mb-4">Selamat Datang di UKM Mahapena</h2>
        <p className="text-lg mb-6">Menyediakan produk berkualitas dari masyarakat lokal.</p>
        <a
          href="#produk"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Lihat Produk
        </a>
      </section>

      {/* Tentang Kami */}
      <section id="about" className="py-16 px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Tentang Kami</h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          UKM Mahapena adalah usaha kecil menengah yang bergerak di bidang makanan
          dan kerajinan tangan. Kami berkomitmen untuk mendukung produk lokal dan
          meningkatkan kesejahteraan masyarakat.
        </p>
      </section>

      {/* Produk */}
      <section id="produk" className="py-16 bg-gray-50 px-8">
        <h2 className="text-3xl font-bold text-center mb-10">Produk Unggulan</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <img
              src="https://via.placeholder.com/200"
              alt="Produk 1"
              className="mx-auto mb-4 rounded"
            />
            <h3 className="font-bold text-xl mb-2">Produk 1</h3>
            <p className="text-gray-600">Deskripsi singkat produk 1.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <img
              src="https://via.placeholder.com/200"
              alt="Produk 2"
              className="mx-auto mb-4 rounded"
            />
            <h3 className="font-bold text-xl mb-2">Produk 2</h3>
            <p className="text-gray-600">Deskripsi singkat produk 2.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <img
              src="data:image/jpeg;base64,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"
              alt="Produk 3"
              className="mx-auto mb-4 rounded"
            />
            <h3 className="font-bold text-xl mb-2">Produk 3</h3>
            <p className="text-gray-600">Deskripsi singkat produk 3.</p>
          </div>
        </div>
      </section>

      {/* Kontak */}
      <section id="kontak" className="py-16 px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Kontak Kami</h2>
        <p className="text-gray-600 mb-6">
          Hubungi kami untuk pemesanan atau informasi lebih lanjut.
        </p>
        <a
          href="https://wa.me/628123456789"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Hubungi via WhatsApp
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-green-600 text-white text-center py-4">
        <p>&copy; 2025 UKM Mahapena. Semua Hak Dilindungi.</p>
      </footer>
    </div>
  );
}

export default App;
