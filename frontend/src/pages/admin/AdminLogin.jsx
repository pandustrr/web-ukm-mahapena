import { useState } from "react";
import axios from "axios";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/admin/login", {
                username,
                password,
            });
            // Simpan token di sessionStorage
            sessionStorage.setItem("adminToken", res.data.token);
            window.location.href = "/admin/dashboard";
        } catch (err) {
            setMsg(err.response?.data?.message || "Terjadi kesalahan");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#A1E3F9] to-[#3674B5] p-4">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm"
            >
                <h2 className="text-[#113F67] text-2xl font-bold mb-6 text-center">
                    Admin Login
                </h2>

                {/* Username */}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3674B5] transition"
                />

                {/* Password */}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-6 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3674B5] transition"
                />

                {/* Tombol Login */}
                <button
                    type="submit"
                    className="w-full p-3 bg-[#113F67] text-white rounded-lg font-semibold hover:bg-[#0e2f4c] transition-colors"
                >
                    Login
                </button>

                {/* Pesan error */}
                {msg && (
                    <p className="text-red-500 text-sm mt-4 text-center bg-red-100 py-2 rounded">
                        {msg}
                    </p>
                )}
            </form>
        </div>
    );
}
