import { useEffect, useState } from "react";
import ManajemenBlog from "./ManajemenBlog";
import ManajemenPengurus from "./ManajemenPengurus";
import SidebarAdmin from "./SidebarAdmin";

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

        <SidebarAdmin activePage={activePage} setActivePage={setActivePage} />

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
        {renderPageContent()}
      </main>
    </div>
  );
}
