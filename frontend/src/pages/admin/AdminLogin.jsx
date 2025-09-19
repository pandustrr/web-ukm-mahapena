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
      sessionStorage.setItem("adminID", res.data.admin_id);
      window.location.href = "/admin/dashboard";
    } catch (err) {
      setMsg(err.response?.data?.message || "Terjadi kesalahan");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#A1E3F9]">
      <form
        onSubmit={handleLogin}
        className="bg-[#113F67] p-10 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-white text-2xl mb-6 text-center">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded"
        />
        <button
          type="submit"
          className="w-full p-3 bg-[#3674B5] text-white rounded hover:bg-[#5682B1]"
        >
          Login
        </button>
        {msg && <p className="text-white mt-3">{msg}</p>}
      </form>
    </div>
  );
}
