// File: src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Halaman user biasa
import Navbar from "./components/Navbar";
import Beranda from "./pages/Beranda";
import Profil from "./pages/Profil";
import Proker from "./pages/Proker";
import Blog from "./pages/Blog";
import Merchandise from "./pages/Merchandise";
import Footer from "./components/Footer";

// Halaman admin
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateBlog from "./pages/admin/CreateBlog";
import EditBlog from "./pages/admin/EditBlog";
import DetailBlog from "./pages/DetailBlog";
import ManajemenProker from "./pages/admin/ManajemenProker";
import CreateProker from "./pages/admin/CreateProker";
import EditProker from "./pages/admin/EditProker";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <Router>
      <div
        className={`App min-h-screen flex flex-col ${isDarkMode ? "dark" : ""}`}
      >
        {/* Hanya tampilkan Navbar & Footer untuk halaman user biasa */}
        <Routes>
          <Route path="/admin/*" element={null} />
          <Route
            path="/*"
            element={
              <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            }
          />
          <Route path="/blog/detail/*" element={null} />
        </Routes>

        <main className="flex-grow">
          <Routes>
            {/* Halaman user biasa */}
            <Route path="/" element={<Beranda />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/proker" element={<Proker />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/detail/:id" element={<DetailBlog />} />
            <Route path="/merchandise" element={<Merchandise />} />

            {/* Halaman admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/proker/create" element={<CreateProker />} />
            <Route path="/admin/proker/update/:id" element={<EditProker />} />
            <Route path="/admin/blogs/create" element={<CreateBlog />} />
            <Route path="/admin/blogs/update/:id" element={<EditBlog />} />
          </Routes>
        </main>

        {/* Footer hanya tampil untuk halaman user biasa */}
        <Routes>
          <Route path="/admin/*" element={null} />
          <Route path="/blog/detail/*" element={null} />
          <Route path="/*" element={<Footer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
