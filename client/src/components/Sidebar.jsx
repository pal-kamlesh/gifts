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
import { Avatar, Dropdown } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { logout, signoutSuccess } from "../redux/user/userSlice.js";

const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [tab, setTab] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();

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

  const handleSignout = async () => {
    try {
      const res = dispatch(logout());
      const data = await res.json();
      if (!res.ok) {
        console.log(data.messsage);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.messsage);
    }
  };

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
      <nav className="mt-4 relative flex flex-col h-full">
        <ul className="space-y-2 flex-grow">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`flex items-center p-3 ${
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
        <div className="absolute bottom-0 w-full">
          {currentUser && (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{currentUser?.username}</span>
                <span className="block truncate text-sm font-medium">
                  {currentUser?.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
            </Dropdown>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
