import { useEffect } from "react";

export default function AdminDashboard() {
    useEffect(() => {
        const checkLogin = () => {
            const token = sessionStorage.getItem("adminToken");
            if (!token) window.location.href = "/admin/login";
        };

        checkLogin();
        window.addEventListener("pageshow", checkLogin);

        return () => window.removeEventListener("pageshow", checkLogin);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-[#113F67] text-white flex flex-col">
                <div className="p-6 text-2xl font-bold border-b border-[#3674B5]">
                    Admin Panel
                </div>

                <nav className="flex-1 flex flex-col p-4 space-y-2">
                    <button className="text-left p-3 rounded hover:bg-[#3674B5]">
                        Manajemen Merchandise
                    </button>
                    <button className="text-left p-3 rounded hover:bg-[#3674B5]">
                        Manajemen Blog
                    </button>
                </nav>

                <div className="p-4 border-t border-[#3674B5]">
                    <button
                        onClick={handleLogout}
                        className="w-full p-3 bg-[#3674B5] rounded hover:bg-[#5682B1]"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Konten Dashboard */}
            <main className="flex-1 p-6 bg-[#F5F5F5]">
                <h1 className="text-[#3674B5] text-2xl font-semibold">
                    Selamat datang, Admin!
                </h1>
                <p className="mt-2 text-black">
                    Pilih menu di sidebar untuk mengelola konten.
                </p>
            </main>
        </div>
    );
}
