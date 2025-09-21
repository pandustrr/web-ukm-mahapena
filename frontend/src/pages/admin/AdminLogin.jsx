import { useState } from "react";
import axios from "axios";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMsg("");
        
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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-800 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#A1E3F9]/20 to-[#3674B5]/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#5682B1]/15 to-[#3674B5]/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-md">
                    {/* Login Container */}
                    <div className="bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-slate-700">
                        {/* Header */}
                        <div className="text-center mb-8">
                            {/* Logo/Icon */}
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#3674B5] to-[#5682B1] rounded-full flex items-center justify-center shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                            </div>
                            
                            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#3674B5] to-[#5682B1] bg-clip-text text-transparent mb-2">
                                Admin Login
                            </h2>
                            <div className="w-12 h-1 bg-gradient-to-r from-[#3674B5] to-[#A1E3F9] mx-auto rounded-full"></div>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleLogin} className="space-y-6">
                            {/* Username Field */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#3674B5] focus:border-transparent transition-all duration-300 shadow-sm"
                                />
                            </div>

                            {/* Password Field */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#3674B5] focus:border-transparent transition-all duration-300 shadow-sm"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 px-4 bg-gradient-to-r from-[#3674B5] to-[#5682B1] text-white font-semibold rounded-xl shadow-lg hover:from-[#5682B1] hover:to-[#3674B5] focus:outline-none focus:ring-2 focus:ring-[#3674B5] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                        </svg>
                                        Masuk...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                                        </svg>
                                        Masuk
                                    </div>
                                )}
                            </button>

                            {/* Error Message */}
                            {msg && (
                                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                                            {msg}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </form>

                        {/* Footer */}
                        <div className="mt-8 text-center">
                            <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                                Akses khusus administrator
                            </p>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-20 right-20 w-3 h-3 bg-gradient-to-r from-[#3674B5] to-[#A1E3F9] rounded-full opacity-20"></div>
                    <div className="absolute bottom-20 left-20 w-4 h-4 bg-gradient-to-r from-[#5682B1] to-[#A1E3F9] rounded-full opacity-30"></div>
                </div>
            </div>
        </div>
    );
}