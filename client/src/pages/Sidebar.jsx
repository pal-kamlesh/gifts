import { Dropdown } from "flowbite-react";
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
  FaSignOutAlt,
} from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { currentUser } = useSelector((state) => state.user);
  const menuItem = [
    { path: "/", name: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/members", name: "Members", icon: <FaUsers /> },
    { path: "/archive", name: "Archive", icon: <FaArchive /> },
    { path: "/selection", name: "Selection", icon: <FaCogs /> },
    { path: "/delivery", name: "Delivery", icon: <FaTruck /> },
    { path: "/reports", name: "Reports", icon: <FaChartBar /> },
    { path: "/users", name: "Users", icon: <FaUsersGear /> },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        style={{ width: isOpen ? "200px" : "80px" }}
        className="fixed top-0 left-0 h-screen bg-gradient-to-b from-blue-600 to-purple-700 z-50 transition-all duration-300 ease-in-out"
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
        {/* User Section - Add this at the bottom of the sidebar */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-blue-500">
          <Dropdown
            label={
              <div
                className={`flex items-center text-white ${
                  isOpen ? "justify-start" : "justify-center"
                }`}
              >
                <FaUser className="text-xl" />
                <span
                  style={{ display: isOpen ? "inline" : "none" }}
                  className="ml-3 font-medium"
                >
                  {currentUser.username}
                </span>
              </div>
            }
            inline
            placement="top-start"
            className="w-full"
          >
            <Dropdown.Item className="flex items-center px-4 py-2 text-sm text-black hover:bg-white/20 transition-colors">
              <FaSignOutAlt className="mr-2" />
              Logout
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>

      {/* Main Content */}
      <main
        className="flex-1 p-1 bg-gray-50 transition-all duration-300 ease-in-out"
        style={{ marginLeft: isOpen ? "200px" : "80px" }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;
