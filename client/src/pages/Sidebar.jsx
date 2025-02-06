import { useState } from "react";
import {
  FaBars,
  FaTachometerAlt,
  FaUsers,
  FaArchive,
  FaCogs,
  FaTruck,
  FaChartBar,
  FaUser,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    { path: "/", name: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/members", name: "Members", icon: <FaUsers /> },
    { path: "/archive", name: "Archive", icon: <FaArchive /> },
    { path: "/selection", name: "Selection", icon: <FaCogs /> },
    { path: "/delivery", name: "Delivery", icon: <FaTruck /> },
    { path: "/reports", name: "Reports", icon: <FaChartBar /> },
    { path: "/users", name: "Users", icon: <FaUser /> },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        style={{ width: isOpen ? "200px" : "80px" }}
        className="bg-gradient-to-b from-blue-600 to-purple-700 transition-all duration-300 ease-in-out"
      >
        <div className="flex items-center justify-between p-5 border-b border-blue-500">
          <h1
            style={{ display: isOpen ? "block" : "none" }}
            className="text-white text-xl font-bold truncate"
          >
            Admin Panel
          </h1>
          <FaBars
            onClick={toggle}
            className="text-white text-2xl cursor-pointer hover:text-blue-200 transition-colors"
          />
        </div>

        {/* Menu Items */}
        <div className="p-2">
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) => `
                                flex items-center text-white p-3 mb-1 rounded-lg 
                                transition-all duration-200 
                                hover:bg-white/20 
                                ${isActive ? "bg-white/30" : ""}
                                ${isOpen ? "justify-start" : "justify-center"}
                            `}
            >
              <span className="text-xl">{item.icon}</span>
              <span
                style={{ display: isOpen ? "inline" : "none" }}
                className="ml-3 font-medium"
              >
                {item.name}
              </span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-1 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;
