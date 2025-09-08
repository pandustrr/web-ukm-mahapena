// File: src/components/Navbar.jsx
const Navbar = ({ currentPage, setCurrentPage }) => {
    const navItems = ['Beranda', 'Profil', 'Proker', 'Blog', 'Store']

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold text-[#113F67]">MAHAPENA</span>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {navItems.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setCurrentPage(item)}
                                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${currentPage === item
                                            ? 'border-[#3674B5] text-gray-900'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className="sm:hidden">
                <div className="pt-2 pb-3 space-y-1">
                    {navItems.map((item) => (
                        <button
                            key={item}
                            onClick={() => setCurrentPage(item)}
                            className={`w-full text-left block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${currentPage === item
                                    ? 'border-[#3674B5] bg-[#A1E3F9] text-[#3674B5]'
                                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default Navbar