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
    <nav className="p-4 flex flex-col h-full justify-between">
      {/* Menu navigasi */}
      <ul className="space-y-2">
        {/* Dashboard */}
        <li>
          <button
            onClick={() => setActivePage("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activePage === "dashboard"
                ? "bg-blue-700 text-white"
                : "text-blue-100 hover:bg-blue-700"
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
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
              activePage === "divisi" || activePage === "pengurus"
                ? "bg-blue-700 text-white"
                : "text-blue-100 hover:bg-blue-700"
            }`}
          >
            <div className="flex items-center gap-3">
              <Users size={20} />
              <span>Profil</span>
            </div>
            {profilOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>

          {profilOpen && (
            <ul className="ml-8 mt-2 space-y-1">
              <li>
                <button
                  onClick={() => setActivePage("divisi")}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                    activePage === "divisi"
                      ? "bg-blue-600 text-white"
                      : "text-blue-100 hover:bg-blue-600"
                  }`}
                >
                  Divisi
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage("pengurus")}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                    activePage === "pengurus"
                      ? "bg-blue-600 text-white"
                      : "text-blue-100 hover:bg-blue-600"
                  }`}
                >
                  Pengurus
                </button>
              </li>
            </ul>
          )}
        </li>

        {/* Proker */}
        <li>
          <button
            onClick={() => setActivePage("proker")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activePage === "proker"
                ? "bg-blue-700 text-white"
                : "text-blue-100 hover:bg-blue-700"
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
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activePage === "blog"
                ? "bg-blue-700 text-white"
                : "text-blue-100 hover:bg-blue-700"
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
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activePage === "merchandise"
                ? "bg-blue-700 text-white"
                : "text-blue-100 hover:bg-blue-700"
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
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activePage === "portofolio"
                ? "bg-blue-700 text-white"
                : "text-blue-100 hover:bg-blue-700"
            }`}
          >
            <Briefcase size={20} />
            <span>Portofolio</span>
          </button>
        </li>
      </ul>

      {/* Tombol Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-500 hover:bg-red-600 hover:text-white transition-colors"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </nav>
  );
}

export default SidebarAdmin;
