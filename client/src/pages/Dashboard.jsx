import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "../components";
import {
  Archive,
  Dash,
  Delivery,
  Reports,
  Selection,
  User,
  MembersManagement,
} from "./index.js";

export default function Dashboard() {
  const { search } = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    // Extract the 'tab' parameter from the search string
    const params = new URLSearchParams(search);
    const tabFromUrl = params.get("tab");

    // Set the tab state if the 'tab' parameter exists
    if (tabFromUrl) {
      setTab(tabFromUrl);
    } else {
      setTab(""); // Reset tab if no 'tab' parameter is found
    }
  }, [search]); // Re-run the effect when the search string changes

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="fixed top-0 left-0 h-full">
        <Sidebar />
      </div>
      <div className="ml-64 flex-1 overflow-y-auto">
        {!tab && <Dash />}
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
