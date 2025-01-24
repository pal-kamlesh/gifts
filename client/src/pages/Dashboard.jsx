import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "../components";
import { Archive, Dash, Delivery, Reports, Selection, User } from ".";
import MembersManagement from "./MembersManagement";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="fixed top-0 left-0 h-full">
        <Sidebar />
      </div>
      <div className="ml-64 flex-1 overflow-y-auto">
        {tab === "" && <Dash />}
        {tab === "members" && <MembersManagement />}
        {tab === "archive" && <Archive />}
        {tab === "selection" && <Selection />}
        {tab === "delivery" && <Delivery />}
        {tab === "reports" && <Reports />}
        {tab === "users" && <User />}
      </div>
    </div>
  );
}
