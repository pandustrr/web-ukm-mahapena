import { BarChart3, FileText, ShoppingBag, Users } from "lucide-react";
import { useEffect, useState } from "react";
import ManajemenBlog from "./ManajemenBlog";
import ManajemenPengurus from "./ManajemenPengurus";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

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

  const renderPageContent = () => {
    switch (activePage) {
      case "blog":
        return <ManajemenBlog />;

      case "pengurus":
        return <ManajemenPengurus />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#113F67] text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-[#3674B5]">
          Admin Panel
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {[
              {
                id: "dashboard",
                label: "Dashboard",
                icon: <BarChart3 size={20} />,
              },
              {
                id: "pengurus",
                label: "Pengurus",
                icon: <Users size={20} />,
              },
              {
                id: "marchandise",
                label: "Marchandise",
                icon: <ShoppingBag size={20} />,
              },
              {
                id: "blog",
                label: "Blog",
                icon: <FileText size={20} />,
              },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activePage === item.id
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
      <main className="flex-1 p-6 overflow-y-auto bg-[#F5F5F5]">
        {/* <h1 className="text-[#3674B5] text-2xl font-semibold">
          Selamat datang, Admin!
        </h1>
        <p className="mt-2 text-black">
          Pilih menu di sidebar untuk mengelola konten.
        </p> */}
        {renderPageContent()}
      </main>
    </div>
  );
}
