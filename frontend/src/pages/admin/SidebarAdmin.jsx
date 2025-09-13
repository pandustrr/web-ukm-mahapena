// File: src/pages/admin/SidebarAdmin.jsx
import { BarChart3, FileText, ShoppingBag, Users, LogOut } from "lucide-react";

function SidebarAdmin({ activePage, setActivePage }) {
  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin logout?")) {
      // Hapus token dari sessionStorage
      sessionStorage.removeItem("adminToken");
      // Redirect ke login
      window.location.href = "/admin/login";
    }
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <BarChart3 size={20} /> },
    { id: "divisi", label: "Divisi", icon: <Users size={20} /> },
    { id: "pengurus", label: "Pengurus", icon: <Users size={20} /> },
    { id: "merchandise", label: "Merchandise", icon: <ShoppingBag size={20} /> },
    { id: "blog", label: "Blog", icon: <FileText size={20} /> },
  ];

  return (
    <nav className="p-4 flex flex-col h-full justify-between">
      {/* Menu navigasi */}
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activePage === item.id
                  ? "bg-blue-700 text-white"
                  : "text-blue-100 hover:bg-blue-700"
                }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          </li>
        ))}
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
