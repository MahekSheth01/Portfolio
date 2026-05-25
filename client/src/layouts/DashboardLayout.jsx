import { useState } from "react";
import {
  FaHome, FaProjectDiagram, FaImages, FaCode, FaEnvelope, FaSignOutAlt, FaBars, FaTimes,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const menuItems = [
  { title: "Dashboard", path: "/admin", icon: <FaHome /> },
  { title: "Projects", path: "/admin/projects", icon: <FaProjectDiagram /> },
  { title: "Gallery", path: "/admin/gallery", icon: <FaImages /> },
  { title: "Skills", path: "/admin/skills", icon: <FaCode /> },
  { title: "Messages", path: "/admin/messages", icon: <FaEnvelope /> },
];

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between p-6 sm:p-8">
      <div>
        {/* LOGO */}
        <h2
          className="text-2xl sm:text-3xl font-bold mb-10 sm:mb-16"
          style={{ color: "var(--accent)" }}
        >
          Mahek Admin
        </h2>

        {/* MENU */}
        <div className="flex flex-col gap-3 sm:gap-5">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end={item.path === "/admin"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 p-3 sm:p-4 rounded-2xl transition duration-300 ${isActive ? "translate-x-2" : ""}`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive ? "var(--accent)" : "var(--bg-primary)",
                color: isActive ? "#fff" : "var(--text-primary)",
              })}
            >
              <span className="text-lg sm:text-xl shrink-0">{item.icon}</span>
              <span className="text-sm sm:text-base">{item.title}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-4 p-3 sm:p-4 rounded-2xl transition duration-300 hover:opacity-80 mt-6"
        style={{ backgroundColor: "var(--accent)", color: "#fff" }}
      >
        <FaSignOutAlt />
        <span className="text-sm sm:text-base">Logout</span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex w-full overflow-x-hidden">

      {/* DESKTOP SIDEBAR */}
      <aside
        className="hidden md:flex flex-col w-64 lg:w-72 shrink-0 border-r overflow-y-auto"
        style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
      >
        <SidebarContent />
      </aside>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MOBILE SIDEBAR DRAWER */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 z-50 md:hidden flex flex-col border-r transition-transform duration-300 overflow-y-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
      >
        <SidebarContent />
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* MOBILE TOPBAR */}
        <header
          className="md:hidden flex items-center gap-4 px-4 py-4 border-b sticky top-0 z-30"
          style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
        >
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-xl">
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <h2 className="text-xl font-bold" style={{ color: "var(--accent)" }}>
            Mahek Admin
          </h2>
        </header>

        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 overflow-x-hidden">
          {children}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;