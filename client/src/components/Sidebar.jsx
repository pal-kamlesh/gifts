import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaArchive,
  FaCogs,
  FaTruck,
  FaChartBar,
  FaBars,
  FaUser,
} from "react-icons/fa";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [tab, setTab] = useState("");
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab") || "dashboard"; // Default to "dashboard" if no tab is present
    setTab(tabFromUrl);
  }, [location.search]);

  const menuItems = [
    {
      icon: <FaTachometerAlt />,
      text: "Dashboard",
      link: "/",
      value: "dashboard",
    },
    {
      icon: <FaUsers />,
      text: "Members",
      link: "/?tab=members",
      value: "members",
    },
    {
      icon: <FaArchive />,
      text: "Archive",
      link: "/?tab=archive",
      value: "archive",
    },
    {
      icon: <FaCogs />,
      text: "Selection Process",
      link: "/?tab=selection",
      value: "selection",
    },
    {
      icon: <FaTruck />,
      text: "Delivery Management",
      link: "/?tab=delivery",
      value: "delivery",
    },
    {
      icon: <FaChartBar />,
      text: "Reports",
      link: "/?tab=reports",
      value: "reports",
    },
    {
      icon: <FaUser />,
      text: "Users",
      link: "/?tab=users",
      value: "users",
    },
  ];

  return (
    <div
      className={`h-screen bg-gray-800 text-white ${
        isCollapsed ? "w-16" : "w-64"
      } transition-all duration-300 flex flex-col`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="p-3 focus:outline-none hover:bg-gray-700"
      >
        <FaBars size={20} />
      </button>

      {/* Navigation Menu */}
      <nav className="mt-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`flex items-center p-2 ${
                tab === item.value ? "bg-gray-700" : "hover:bg-gray-700"
              } rounded-md`}
            >
              <Link to={item.link} className="flex items-center space-x-3">
                <span className="text-xl">{item.icon}</span>
                {!isCollapsed && <span className="text-sm">{item.text}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
