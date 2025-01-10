import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "flowbite-react";
import { ExcelTable } from "../components/index.js";
import {
  addMember,
  getAllMembers,
  updateMember,
} from "../redux/user/userSlice.js";
import { unwrapResult } from "@reduxjs/toolkit";
import { useLocation, useNavigate } from "react-router-dom";
import { shouldDisable } from "../functiion.js";

const initalMember = {
  name: "",
  dob: "",
  address: "",
  phone: "",
  location: "",
  info: "",
  gift1: "",
  gift2: "",
  gift3: "",
  giftGiven: false,
  recived: false,
  company: "",
  employeeName: "",
  delivered: false,
  received: false,
  deliveryDate: "",
  isArchived: false,
};
export default function MembersManagement() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toUpdate, setToUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [member, setMember] = useState(initalMember);
  const [demoMembers, setDemoMembers] = useState([]);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object from the form
    const formData = new FormData(e.target);

    const obj = {
      name: formData.get("name") ?? "",
      dob: formData.get("dob") ?? "",
      address: formData.get("address") ?? "",
      phone: formData.get("phone") ?? "",
      location: formData.get("location") ?? "",
      info: formData.get("info") ?? "",
      gift1: formData.get("gift1") ?? "",
      gift2: formData.get("gift2") ?? "",
      gift3: formData.get("gift3") ?? "",
      recived: formData.get("recived") ?? false,
      company: formData.get("company") ?? "",
      employeeName: formData.get("employeeName") ?? "",
      delivered: formData.get("delivered") ?? false,
      deliveryDate: formData.get("deliveryDate") ?? "",
      isArchived: formData.get("isArchived") ?? false,
    };
    try {
      setLoading(true);
      const resultAction = await dispatch(addMember(obj));
      const result = unwrapResult(resultAction);
      setDemoMembers((prev) => [...prev, result.data]);
      setMember(initalMember);
      setOpen(!open);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const resultAction = await dispatch(getAllMembers());
        const result = unwrapResult(resultAction);
        setDemoMembers(result.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error", error);
      }
    }
    fetchData();
  }, [currentUser, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember((state) => ({ ...state, [name]: value }));
  };
  function setMemberToEdit(id) {
    const member = demoMembers.find((prev) => prev._id === id);
    setMember({
      ...member,
      dob: new Date(member.dob).toISOString().split("T")[0],
    });
    setDemoMembers(demoMembers.filter((member) => member._id !== id));
    setOpen(true);
    setToUpdate(true);
  }
  function filterSetMember(id, newMember) {
    const members = demoMembers.filter((prev) => prev._id !== id);
    setDemoMembers([...members, newMember]);
  }
  async function submitUpdate(id, member) {
    setLoading(true);
    const result = await dispatch(updateMember({ id, member }));
    const data = unwrapResult(result);
    console.log(data);
    setDemoMembers((prev) => [...prev, data.member]);
    setLoading(false);
    setMember(initalMember);
    setOpen(false);
    setToUpdate(false);
  }
  return (
    <div className=" w-full flex justify-center h-screen bg-gray-200">
      <div>
        <div className={` w-full mx-auto overflow-auto}`}>
          <div
            className={`transition-all duration-500 ease-in-out ${
              open
                ? "max-h-[1vh] opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            {open && (
              <form
                className="flex flex-col gap-6 rounded-lg bg-gray-100 p-6 shadow-lg md:flex-row md:items-start"
                onSubmit={handleSubmit}
                style={{ maxHeight: "60vh", overflowY: "auto" }}
              >
                {/* Left Section */}
                <div className="flex-1 space-y-4">
                  {/* Personal and Contact Information */}
                  <fieldset className="border rounded-md p-4">
                    <legend className="px-2 font-bold text-purple-600">
                      Personal & Contact Information
                    </legend>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {/* Name */}
                      <label className="flex flex-col">
                        Name
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter your name"
                          className="form-input mt-1 rounded border-gray-300"
                          value={member.name}
                          onChange={handleChange}
                          required
                          disabled={shouldDisable(currentUser.rights, "name")}
                        />
                      </label>
                      {/* Date of Birth */}
                      <label className="flex flex-col">
                        Date of Birth
                        <input
                          type="date"
                          name="dob"
                          className="form-input mt-1 rounded border-gray-300"
                          value={member.dob || ""}
                          onChange={handleChange}
                          disabled={shouldDisable(currentUser.rights, "dob")}
                        />
                      </label>
                      {/* Phone */}
                      <label className="flex flex-col">
                        Phone Number
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Enter your phone number"
                          className="form-input mt-1 rounded border-gray-300"
                          value={member.phone}
                          onChange={handleChange}
                          required
                          disabled={shouldDisable(currentUser.rights, "phone")}
                        />
                      </label>
                      {/* Location */}
                      <label className="flex flex-col">
                        Location
                        <input
                          type="text"
                          name="location"
                          placeholder="Enter your location"
                          className="form-input mt-1 rounded border-gray-300"
                          value={member.location}
                          onChange={handleChange}
                          disabled={shouldDisable(
                            currentUser.rights,
                            "location"
                          )}
                        />
                      </label>
                      {/* Address */}
                      <label className="md:col-span-2 flex flex-col">
                        Address
                        <textarea
                          name="address"
                          placeholder="Enter your address"
                          className="form-textarea mt-1 rounded border-gray-300"
                          value={member.address}
                          onChange={handleChange}
                          required
                          disabled={shouldDisable(
                            currentUser.rights,
                            "address"
                          )}
                        ></textarea>
                      </label>
                    </div>
                  </fieldset>
                </div>

                {/* Right Section */}
                <div className="flex-1 space-y-4">
                  {/* Gift and Site Details */}
                  <fieldset className="border rounded-md p-4">
                    <legend className="px-2 font-bold text-purple-600">
                      Gift and Site Details
                    </legend>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      {/* Gift 1 */}
                      <label className="flex flex-col">
                        Cake/Plum
                        <select
                          name="gift1"
                          className="form-input mt-1 rounded border-gray-300"
                          value={member.gift1}
                          onChange={(e) =>
                            setMember((prev) => ({
                              ...prev,
                              gift1: e.target.value,
                            }))
                          }
                          disabled={shouldDisable(currentUser.rights, "gift1")}
                        >
                          <option value=""></option>
                          <option value="cake">Cake</option>
                          <option value="plum">Plum</option>
                        </select>
                      </label>
                      {/* Gift 2 */}
                      <label className="flex flex-col">
                        Liquid
                        <select
                          name="gift2"
                          className="form-input mt-1 rounded border-gray-300"
                          value={member.gift2}
                          onChange={(e) =>
                            setMember((prev) => ({
                              ...prev,
                              gift2: e.target.value,
                            }))
                          }
                          disabled={shouldDisable(currentUser.rights, "gift2")}
                        >
                          <option value=""></option>
                          <option value="scotch">Scotch</option>
                          <option value="vodka">Vodka</option>
                          <option value="wine">Wine</option>
                          <option value="whisky">Whisky</option>
                        </select>
                      </label>
                      {/* Gift 3 */}
                      <label className="flex flex-col">
                        Gifts
                        <select
                          name="gift3"
                          className="form-input mt-1 rounded border-gray-300"
                          value={member.gift3}
                          onChange={(e) =>
                            setMember((prev) => ({
                              ...prev,
                              gift3: e.target.value,
                            }))
                          }
                          disabled={shouldDisable(currentUser.rights, "gift3")}
                        >
                          <option value=""></option>
                          <option value="article1">Article 1</option>
                          <option value="article2">Article 2</option>
                        </select>
                      </label>
                    </div>
                  </fieldset>
                  {/* Company Information */}
                  <fieldset className="border rounded-md p-4">
                    <legend className="px-2 font-bold text-purple-600">
                      Company Information
                    </legend>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {/* Company */}
                      <label className="flex flex-col">
                        Company
                        <input
                          type="text"
                          name="company"
                          placeholder="Enter company name"
                          className="form-input mt-1 rounded border-gray-300"
                          value={member.company}
                          onChange={handleChange}
                          disabled={shouldDisable(
                            currentUser.rights,
                            "company"
                          )}
                        />
                      </label>
                      {/* Additional Info */}
                      <label className="flex flex-col">
                        Additional Info
                        <input
                          type="text"
                          name="info"
                          placeholder="Enter additional info"
                          className="form-input mt-1 rounded border-gray-300"
                          value={member.info}
                          onChange={handleChange}
                          required
                          disabled={shouldDisable(currentUser.rights, "info")}
                        />
                      </label>
                    </div>
                  </fieldset>

                  <div className="mt-4 flex justify-center gap-3">
                    <button
                      disabled={loading}
                      className="w-full max-w-xs rounded bg-purple-600 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
                      onClick={
                        toUpdate
                          ? () => submitUpdate(member._id, member)
                          : () => handleSubmit()
                      }
                    >
                      {loading ? (
                        <>
                          <Spinner size="sm" />
                          <span className="pl-3">Loading...</span>
                        </>
                      ) : toUpdate ? (
                        "Update"
                      ) : (
                        "Submit"
                      )}
                    </button>
                    <button
                      disabled={loading}
                      className="w-full max-w-xs rounded bg-purple-600 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
                      onClick={() =>
                        !toUpdate
                          ? [
                              setOpen(false),
                              setMember(initalMember),
                              setToUpdate(false),
                            ]
                          : [
                              setDemoMembers((data) => [...data, member]),
                              setMember(initalMember),
                              setOpen(false),
                              setToUpdate(false),
                            ]
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
        {!open && tab === "members" && (
          <div className="mt-4 flex justify-center">
            <button
              className="w-full max-w-xs rounded bg-purple-600 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
              onClick={() => setOpen(!open)}
            >
              Add
            </button>
          </div>
        )}
        {/* Table Section */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            open ? "translate-y-[calc(60vh+1rem)]" : "translate-y-0"
          }`}
        >
          <ExcelTable
            members={demoMembers}
            fn={setMemberToEdit}
            filterSetMember={filterSetMember}
          />
        </div>
      </div>
    </div>
  );
}
