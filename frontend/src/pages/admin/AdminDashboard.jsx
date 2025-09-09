import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        const token = sessionStorage.getItem("adminToken");
        if (!token) {
            window.location.href = "/admin/login";
            return;
        }

        axios.get("http://localhost:8000/api/admin/dashboard", {
            headers: { Authorization: token }
        }).then(res => {
            setMessage(res.data.message);
        }).catch(() => {
            sessionStorage.removeItem("adminToken");
            window.location.href = "/admin/login";
        });
    }, []);

    const handleLogout = () => {
        const token = sessionStorage.getItem("adminToken");
        axios.post("http://localhost:8000/api/admin/logout", {}, {
            headers: { Authorization: token }
        }).finally(() => {
            sessionStorage.removeItem("adminToken");
            window.location.href = "/admin/login";
        });
    };

    return (
        <div className="min-h-screen bg-[#FFFFFF]">
            <header className="bg-[#113F67] text-white p-4 text-xl font-bold flex justify-between items-center">
                Dashboard Admin
                <button onClick={handleLogout} className="bg-[#3674B5] px-3 py-1 rounded hover:bg-[#5682B1]">
                    Logout
                </button>
            </header>
            <main className="p-6">
                <h1 className="text-[#3674B5] text-2xl font-semibold">{message}</h1>
                <p className="text-[#000000] mt-2">Ini halaman dashboard admin yang aman tanpa session.</p>
            </main>
        </div>
    );
}
