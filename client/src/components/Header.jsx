import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { IoGiftSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { logout, signoutSuccess } from "../redux/user/userSlice";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
  const location = useLocation();

  return (
    <Navbar fluid rounded className=" border-b-2 ">
      <Navbar.Brand>
        <NavLink
          to="/"
          className="flex items-center space-x-2 hover:no-underline"
        >
          <div className="flex items-center justify-center rounded-full bg-indigo-500 p-2">
            <IoGiftSharp className="text-white text-3xl" />
          </div>
          <span className="text-2xl font-bold text-gray-800 dark:text-white tracking-wide">
            Gifts & Compliments
          </span>
        </NavLink>
      </Navbar.Brand>

      <div className="flex md:order-2">
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
            <Link to="/dashboard?tab=settings">
              <Dropdown.Item>Settings</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        )}
        <Navbar.Toggle />
      </div>
      {currentUser?.isAdmin ? (
        <Navbar.Collapse>
          <NavLink as="div">Welcom to the Dashboard</NavLink>
        </Navbar.Collapse>
      ) : (
        <Navbar.Collapse>
          <Link to="/">
            <Navbar.Link active={location.pathname === "/"} as={"div"}>
              Home
            </Navbar.Link>
          </Link>
          <Link to="/user">
            <Navbar.Link as={"div"} active={location.pathname === "/user"}>
              User
            </Navbar.Link>
          </Link>
          {/* <Navbar.Link as={"div"}>Contact</Navbar.Link>
          <Navbar.Link as={"div"}>About</Navbar.Link> */}
        </Navbar.Collapse>
      )}
    </Navbar>
  );
}
