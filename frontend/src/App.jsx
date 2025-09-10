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

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <Router>
            <div className={`App min-h-screen flex flex-col ${isDarkMode ? "dark" : ""}`}>
                {/* Navbar hanya untuk user biasa */}
                <Routes>
                    <Route path="/admin/*" element={null} />
                    <Route path="/*" element={<Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
                </Routes>

                {/* Main content */}
                <main className="flex-grow">
                    <Routes>
                        {/* Halaman user biasa */}
                        <Route path="/" element={<Beranda />} />
                        <Route path="/profil" element={<Profil />} />
                        <Route path="/proker" element={<Proker />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/merchandise" element={<Merchandise />} />

                        {/* Halaman admin */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    </Routes>
                </main>

                {/* Footer hanya untuk user biasa */}
                <Routes>
                    <Route path="/admin/*" element={null} />
                    <Route path="/*" element={<Footer />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
