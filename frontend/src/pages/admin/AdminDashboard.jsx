import { useState } from "react";
import SidebarAdmin from "./SidebarAdmin";
import ManajemenMerchandise from "./ManajemenMerchandise";
import ManajemenDivisi from "./ManajemenDivisi";
import ManajemenPengurus from "./ManajemenPengurus";

function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-[#113F67] text-white min-h-screen">
        <SidebarAdmin activePage={activePage} setActivePage={setActivePage} />
      </aside>

      <main className="flex-1 p-6">
        {activePage === "dashboard" && (
          <h1 className="text-2xl font-bold text-[#113F67]">
            Selamat Datang di Dashboard Admin
          </h1>
        )}

        {activePage === "divisi" && <ManajemenDivisi />}

        {activePage === "pengurus" && <ManajemenPengurus />}


        {activePage === "merchandise" && <ManajemenMerchandise />}

        {activePage === "blog" && (
          <h1 className="text-2xl font-bold text-[#113F67]">
            Manajemen Blog (Coming Soon)
          </h1>
        )}

      </main>
    </div>
  );
}

export default AdminDashboard;
