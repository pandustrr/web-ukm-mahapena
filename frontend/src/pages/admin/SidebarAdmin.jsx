// File: src/pages/admin/SidebarAdmin.jsx
import { useState } from "react";
import {
  BarChart3,
  FileText,
  ShoppingBag,
  Users,
  LogOut,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Briefcase,
  GraduationCap,
  Layers, // 🆕 icon Divisi
  UserCircle2, // 🆕 icon Pengurus
} from "lucide-react";

function SidebarAdmin({ activePage, setActivePage }) {
  const [profilOpen, setProfilOpen] = useState(false);

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin logout?")) {
      sessionStorage.removeItem("adminToken");
      window.location.href = "/admin/login";
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#113F67] text-blue-100">
      {/* Header / Logo */}
      <div className="flex items-center justify-center py-6 border-b border-blue-800">
        <h1 className="text-xl font-bold text-white tracking-wide">
          Admin Panel
        </h1>
      </div>

      {/* Menu navigasi */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {/* Dashboard */}
          <li>
            <button
              onClick={() => setActivePage("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activePage === "dashboard"
                  ? "bg-blue-700 text-white shadow-md"
                  : "hover:bg-blue-700 hover:text-white"
              }`}
            >
              <BarChart3 size={20} />
              <span>Dashboard</span>
            </button>
          </li>

          {/* Profil (submenu) */}
          <li>
            <button
              onClick={() => setProfilOpen(!profilOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                ["divisi", "pengurus", "alumni"].includes(activePage)
                  ? "bg-blue-700 text-white shadow-md"
                  : "hover:bg-blue-700 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Users size={20} />
                <span>Profil</span>
              </div>
              {profilOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>

            {profilOpen && (
              <ul className="ml-6 mt-2 space-y-1 animate-fadeIn">
                {/* Divisi */}
                <li>
                  <button
                    onClick={() => setActivePage("divisi")}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                      activePage === "divisi"
                        ? "bg-blue-600 text-white shadow"
                        : "hover:bg-blue-600 hover:text-white"
                    }`}
                  >
                    <Layers size={18} />
                    <span>Divisi</span>
                  </button>
                </li>

                {/* Pengurus */}
                <li>
                  <button
                    onClick={() => setActivePage("pengurus")}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                      activePage === "pengurus"
                        ? "bg-blue-600 text-white shadow"
                        : "hover:bg-blue-600 hover:text-white"
                    }`}
                  >
                    <UserCircle2 size={18} />
                    <span>Pengurus</span>
                  </button>
                </li>

                {/* Alumni */}
                <li>
                  <button
                    onClick={() => setActivePage("alumni")}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                      activePage === "alumni"
                        ? "bg-blue-600 text-white shadow"
                        : "hover:bg-blue-600 hover:text-white"
                    }`}
                  >
                    <GraduationCap size={18} />
                    <span>Alumni</span>
                  </button>
                </li>
              </ul>
            )}
          </li>

          {/* Proker */}
          <li>
            <button
              onClick={() => setActivePage("proker")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activePage === "proker"
                  ? "bg-blue-700 text-white shadow-md"
                  : "hover:bg-blue-700 hover:text-white"
              }`}
            >
              <ClipboardList size={20} />
              <span>Proker</span>
            </button>
          </li>

          {/* Blog */}
          <li>
            <button
              onClick={() => setActivePage("blog")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activePage === "blog"
                  ? "bg-blue-700 text-white shadow-md"
                  : "hover:bg-blue-700 hover:text-white"
              }`}
            >
              <FileText size={20} />
              <span>Blog</span>
            </button>
          </li>

          {/* Merchandise */}
          <li>
            <button
              onClick={() => setActivePage("merchandise")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activePage === "merchandise"
                  ? "bg-blue-700 text-white shadow-md"
                  : "hover:bg-blue-700 hover:text-white"
              }`}
            >
              <ShoppingBag size={20} />
              <span>Merchandise</span>
            </button>
          </li>

          {/* Portofolio */}
          <li>
            <button
              onClick={() => setActivePage("portofolio")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activePage === "portofolio"
                  ? "bg-blue-700 text-white shadow-md"
                  : "hover:bg-blue-700 hover:text-white"
              }`}
            >
              <Briefcase size={20} />
              <span>Portofolio</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Tombol Logout */}
      <div className="p-4 border-t border-blue-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-400 hover:bg-red-600 hover:text-white transition-colors duration-200"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default SidebarAdmin;
