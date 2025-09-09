// File: src/App.jsx
import { useState } from "react";
import Navbar from "./components/Navbar";
import Beranda from "./pages/Beranda";
import Profil from "./pages/Profil";
import Proker from "./pages/Proker";
import Blog from "./pages/Blog";
import Merchandise from "./pages/Merchandise";
import Footer from "./components/Footer";

function App() {
    const [currentPage, setCurrentPage] = useState("Beranda");
    const [isDarkMode, setIsDarkMode] = useState(false); 

    const renderPage = () => {
        switch (currentPage) {
            case "Beranda":
                return <Beranda setCurrentPage={setCurrentPage} />;
            case "Profil":
                return <Profil />;
            case "Proker":
                return <Proker />;
            case "Blog":
                return <Blog />;
            case "Merchandise":
                return <Merchandise />;
            default:
                return <Beranda setCurrentPage={setCurrentPage} />;
        }
    };

    return (
        <div className={`App min-h-screen flex flex-col ${isDarkMode ? "dark" : ""}`}>
            <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            <main className="flex-grow">
                {renderPage()}
            </main>
            <Footer setCurrentPage={setCurrentPage} />
        </div>
    );
}

export default App;