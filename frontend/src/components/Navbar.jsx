// File: src/components/Navbar.jsx
import { useState, useEffect } from "react"
import logo from "../assets/logo.png"

const Navbar = ({ currentPage, setCurrentPage }) => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navItems = ["Beranda", "Profil", "Proker", "Blog", "Store"]

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-6xl z-50 transition-all duration-500
            ${isScrolled
                    ? "shadow-lg bg-white/95"
                    : "shadow-md bg-white/70"}
            backdrop-blur-md rounded-xl px-6 py-2`}
        >
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <img src={logo} alt="Logo Mahapena" className="h-8 w-8 object-contain" />
                    <span className="text-lg font-bold text-[#113F67]">
                        MAHAPENA
                    </span>
                </div>

                {/* Navigation (Desktop) */}
                <div className="hidden md:flex items-center space-x-6 mx-auto">
                    {navItems.map((item) => (
                        <button
                            key={item}
                            onClick={() => setCurrentPage(item)}
                            className={`px-2 py-1 text-sm font-medium transition 
                                ${currentPage === item
                                    ? "text-[#3674B5] border-b-2 border-[#3674B5]"
                                    : "text-gray-700 hover:text-[#113F67]"
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {/* Hamburger Menu (Mobile Only) */}
                <button
                    className="md:hidden text-[#113F67] hover:text-[#3674B5]"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? "✖" : "☰"}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden mt-2 flex flex-col space-y-2">
                    {navItems.map((item) => (
                        <button
                            key={item}
                            onClick={() => {
                                setCurrentPage(item)
                                setIsMenuOpen(false)
                            }}
                            className={`px-4 py-2 rounded-lg text-sm font-medium 
                                ${currentPage === item
                                    ? "bg-[#3674B5] text-white"
                                    : "text-gray-700 hover:bg-[#A1E3F9]/80"
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            )}
        </nav>
    )
}

export default Navbar
