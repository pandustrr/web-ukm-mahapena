import { BarChart3, FileText, ShoppingBag, Users } from "lucide-react";
import { useState } from "react";

function SidebarAdmin({ activePage, setActivePage }) {
  return (
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
  );
}

export default SidebarAdmin;
