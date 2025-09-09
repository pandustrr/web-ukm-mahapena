// File: src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Beranda from "./pages/Beranda";
import Profil from "./pages/Profil";
import Proker from "./pages/Proker";
import Blog from "./pages/Blog";
import Merchandise from "./pages/Merchandise";
import Footer from "./components/Footer";

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <Router>
            <div className={`App min-h-screen flex flex-col ${isDarkMode ? "dark" : ""}`}>
                {/* Navbar dikasih props supaya bisa toggle dark mode */}
                <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
                
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Beranda />} />
                        <Route path="/profil" element={<Profil />} />
                        <Route path="/proker" element={<Proker />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/merchandise" element={<Merchandise />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
