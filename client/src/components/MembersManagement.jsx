/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "flowbite-react";
import { ExcelTable, PageHeader } from "./index.js";
import {
  addMember,
  archiveMember,
  closeScratchpad,
  closeUpdateMode,
  getAllMembers,
  handleInputs,
  moveMemberToScratchPad,
  moveScratchPadToMemberList,
  openScratchpad,
  updateMember,
} from "../redux/user/userSlice.js";
import { unwrapResult } from "@reduxjs/toolkit";
import { useLocation, useNavigate } from "react-router-dom";
import { shouldDisable } from "../functiion.js";
import { Loading } from "./index.js";

export default function MembersManagement({ memberData: allMembers }) {
  const { currentUser, scratchPad, loading, openModal, updateMode } =
    useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    if (pathname) {
      setTab(pathname.slice(1));
    }
  }, [pathname]);

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
      dispatch(addMember(obj));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    function fetchData() {
      try {
        dispatch(getAllMembers());
      } catch (error) {
        console.error("Error", error);
      }
    }
    fetchData();
  }, [currentUser, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleInputs({ name, value }));
  };
  function setMemberToEdit(id) {
    dispatch(moveMemberToScratchPad(id));
  }
  function submitUpdate(id, member) {
    dispatch(updateMember({ id, scratchPad: member }));
  }
  // async function handleSelectMember(id) {
  //   const result = await dispatch(handleSelectMember({ id }));
  //   const data = unwrapResult(result);
  //   if (data) {
  //     filterSetMember(id, data.member);
  //   }
  // }
  async function handleArchiveMember(id) {
    const result = await dispatch(archiveMember({ id }));
    const data = unwrapResult(result);
    if (data) {
      filterSetMember(id, data.member);
    }
  }
  const filterSetMember = () => {};
  if (loading) {
    return <Loading />;
  }
  return (
    <div className=" flex justify-center h-screen bg-gray-200">
      <div>
        <div className={` w-full mx-auto overflow-auto}`}>
          <PageHeader tab={tab} />
          <div
            className={`transition-all duration-500 ease-in-out ${
              openModal
                ? "max-h-[1vh] opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            {openModal && (
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
                          value={scratchPad.name}
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
                          value={
                            scratchPad.dob
                              ? new Date(scratchPad.dob)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
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
                          value={scratchPad.phone}
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
                          value={scratchPad.location}
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
                          value={scratchPad.address}
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
                  <fieldset className="border rounded-md p-1">
                    <legend className="px-2 font-bold text-purple-600">
                      Actions on Members
                    </legend>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {/* Company */}
                      <label className="flex gap-2">
                        Archive
                        <input
                          type="checkbox"
                          name="isArchived"
                          className={`form-input mt-1 rounded border-gray-300 ${
                            scratchPad.isArchived
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                          checked={scratchPad.isArchived}
                          value={scratchPad.isArchived}
                          disabled={scratchPad.isArchived}
                          onChange={() => {
                            handleArchiveMember(scratchPad._id);
                          }}
                        />
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
                          value={scratchPad.gift1}
                          onChange={(e) => handleChange(e)}
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
                          value={scratchPad.gift2}
                          onChange={(e) => handleChange(e)}
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
                          value={scratchPad.gift3}
                          onChange={(e) => handleChange(e)}
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
                          value={scratchPad.company}
                          onChange={(e) => handleChange(e)}
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
                          value={scratchPad.info}
                          onChange={(e) => handleChange(e)}
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
                        updateMode
                          ? () => submitUpdate(scratchPad._id, scratchPad)
                          : () => handleSubmit()
                      }
                    >
                      {loading ? (
                        <>
                          <Spinner size="sm" />
                          <span className="pl-3">Loading...</span>
                        </>
                      ) : updateMode ? (
                        "Update"
                      ) : (
                        "Submit"
                      )}
                    </button>
                    <button
                      disabled={loading}
                      className="w-full max-w-xs rounded bg-purple-600 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
                      onClick={() => {
                        if (updateMode) {
                          dispatch(moveScratchPadToMemberList());
                        } else {
                          dispatch(closeScratchpad());
                          dispatch(closeUpdateMode());
                        }
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
        {!openModal && tab === "members" && (
          <div className="mt-4 flex justify-center">
            <button
              className="w-full max-w-xs rounded bg-purple-600 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
              onClick={() => dispatch(openScratchpad())}
            >
              Add
            </button>
          </div>
        )}
        {/* Table Section */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            openModal ? "translate-y-[calc(60vh+1rem)]" : "translate-y-0"
          }`}
        >
          <ExcelTable members={allMembers} fn={setMemberToEdit} />
        </div>
      </div>
    </div>
  );
}
