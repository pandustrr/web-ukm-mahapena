// File: src/components/Navbar.jsx
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import logo from "../assets/logo.png"

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()

    // Daftar menu dengan path router
    const navItems = [
        { name: "Beranda", path: "/" },
        { name: "Profil", path: "/profil" },
        { name: "Proker", path: "/proker" },
        { name: "Blog", path: "/blog" },
        { name: "Portofolio", path: "/portofolio" },
        { name: "Merchandise", path: "/merchandise" },
    ]

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
                    ? "shadow-lg bg-white/95 dark:bg-[#113F67]/95"
                    : "shadow-md bg-white/70 dark:bg-[#113F67]/70"} 
            backdrop-blur-md rounded-xl px-6 py-2`}
        >
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <img src={logo} alt="Logo Mahapena" className="h-8 w-8 object-contain" />
                    <span className="text-lg font-bold text-[#113F67] dark:text-[#A1E3F9]">
                        MAHAPENA
                    </span>
                </div>

                {/* Navigation (Desktop) */}
                <div className="hidden md:flex items-center space-x-6 mx-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`px-2 py-1 text-sm font-medium transition 
                                ${location.pathname === item.path
                                    ? "text-[#3674B5] dark:text-[#A1E3F9] border-b-2 border-[#3674B5]"
                                    : "text-gray-700 dark:text-[#A1E3F9]/80 hover:text-[#113F67] dark:hover:text-[#A1E3F9]"
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Right menu: Hamburger + Dark Mode */}
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="px-2 py-1 rounded bg-gray-200 dark:bg-[#3674B5] text-gray-800 dark:text-white"
                    >
                        {isDarkMode ? "🌙" : "☀️"}
                    </button>

                    <button
                        className="md:hidden text-[#113F67] dark:text-[#A1E3F9] hover:text-[#3674B5]"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? "✖" : "☰"}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden mt-2 flex flex-col space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsMenuOpen(false)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium 
                                ${location.pathname === item.path
                                    ? "bg-[#3674B5] text-white dark:bg-[#5682B1]"
                                    : "text-gray-700 dark:text-[#A1E3F9]/80 hover:bg-[#A1E3F9]/80 dark:hover:bg-[#3674B5]"
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    )
}

export default Navbar
