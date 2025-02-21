import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "flowbite-react";
import {
  addMember,
  archiveMember,
  closeScratchpad,
  closeUpdateMode,
  handleInputs,
  moveScratchPadToMemberList,
  updateMember,
} from "@/redux/user/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
const MemberForm = () => {
  const dispatch = useDispatch();
  const { scratchPad, loading, updateMode } = useSelector(
    (state) => state.user
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(addMember(scratchPad));
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // Helper function to handle nested object changes
  const handleNestedChange = (e, parentKey) => {
    const { name, value, type, checked } = e.target;
    handleChange({
      target: {
        name,
        value: type === "checkbox" ? checked : value,
        parentKey,
      },
    });
  };
  const handleChange = (e) => {
    const { name, value, parentKey } = e.target;
    dispatch(handleInputs({ name, value, parentKey }));
  };
  // eslint-disable-next-line no-unused-vars
  async function handleArchiveMember(id) {
    const result = await dispatch(archiveMember({ id }));
    const data = await unwrapResult(result);
    dispatch(
      handleInputs({ name: "isArchived", value: data.member.isArchived })
    );
  }
  function submitUpdate(id, member) {
    dispatch(updateMember({ id, scratchPad: member }));
  }
  return (
    <form
      className="flex flex-col gap-6 rounded-lg bg-gray-100 p-6 shadow-lg md:flex-row md:items-start"
      onSubmit={handleSubmit}
      style={{ maxHeight: "80vh", overflowY: "auto" }}
    >
      <div className="flex-1 space-y-4">
        <fieldset className="border rounded-md p-4">
          <legend className="px-2 font-bold text-purple-600">
            Personal & Contact Information
          </legend>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
              />
            </label>
            <label className="flex flex-col">
              Date of Birth
              <input
                type="date"
                name="dob"
                className="form-input mt-1 rounded border-gray-300"
                value={
                  scratchPad.dob
                    ? new Date(scratchPad.dob).toISOString().split("T")[0]
                    : ""
                }
                onChange={handleChange}
              />
            </label>
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
              />
            </label>
            <label className="flex flex-col">
              Location
              <input
                type="text"
                name="location"
                placeholder="Enter your location"
                className="form-input mt-1 rounded border-gray-300"
                value={scratchPad.location}
                onChange={handleChange}
              />
            </label>
            <label className="md:col-span-2 flex flex-col">
              Address
              <textarea
                name="address"
                placeholder="Enter your address"
                className="form-textarea mt-1 rounded border-gray-300"
                value={scratchPad.address}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        </fieldset>

        <fieldset className="border rounded-md p-1">
          <legend className="px-2 font-bold text-purple-600">Gifters</legend>
          <div className="flex justify-evenly items-center">
            {Object.keys(scratchPad.gifters).map((gifter) => (
              <label key={gifter} className="flex gap-2">
                {gifter}
                <input
                  type="checkbox"
                  name={gifter}
                  className="form-checkbox mt-1 rounded border-gray-300 cursor-pointer"
                  checked={scratchPad.gifters[gifter]}
                  onChange={(e) => handleNestedChange(e, "gifters")}
                />
              </label>
            ))}
          </div>
        </fieldset>
        {updateMode && (
          <fieldset className="border rounded-md p-1">
            <legend className="px-2 font-bold text-purple-600">
              Member Action
            </legend>
            <div className="flex justify-evenly items-center">
              <label className="flex gap-2">
                Archive Member
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
        )}
      </div>

      <div className="flex-1 space-y-4">
        <fieldset className="border rounded-md p-4">
          <legend className="px-2 font-bold text-purple-600">
            Gift and Site Details
          </legend>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <label className="flex flex-col">
              Food Hamper
              <select
                name="foodHamper"
                className="form-input mt-1 rounded border-gray-300"
                value={scratchPad.gifts.foodHamper}
                onChange={(e) => handleNestedChange(e, "gifts")}
              >
                <option value="na">NA</option>
                <option value="cake">Cake</option>
                <option value="plum">Plum</option>
                <option value="foodPack">Food Pack</option>
                <option value="dryFruits">Dry Fruits</option>
              </select>
            </label>
            <label className="flex flex-col">
              Liquid
              <select
                name="liquid"
                className="form-input mt-1 rounded border-gray-300"
                value={scratchPad.gifts.liquid}
                onChange={(e) => handleNestedChange(e, "gifts")}
              >
                <option value="na">NA</option>
                <option value="scotch">Scotch</option>
                <option value="vodka">Vodka</option>
                <option value="wine">Wine</option>
                <option value="whisky">Whisky</option>
              </select>
            </label>
            <label className="flex flex-col">
              Gifts
              <select
                name="gift"
                className="form-input mt-1 rounded border-gray-300"
                value={scratchPad.gifts.gift}
                onChange={(e) => handleNestedChange(e, "gifts")}
              >
                <option value="na">NA</option>
                <option value="article1">Article 1</option>
                <option value="article2">Article 2</option>
              </select>
            </label>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <label className="flex flex-col">
              Additional Gifts
              <textarea
                name="additionalGifts"
                className="form-textarea mt-1 rounded border-gray-300"
                value={scratchPad.gifts.additionalGifts}
                onChange={(e) => handleNestedChange(e, "gifts")}
              />
            </label>
          </div>
        </fieldset>

        <fieldset className="border rounded-md p-4">
          <legend className="px-2 font-bold text-purple-600">
            Company Information
          </legend>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="flex flex-col">
              Company
              <input
                type="text"
                name="company"
                placeholder="Enter company name"
                className="form-input mt-1 rounded border-gray-300"
                value={scratchPad.company}
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col">
              Additional Info
              <input
                type="text"
                name="info"
                placeholder="Enter additional info"
                className="form-input mt-1 rounded border-gray-300"
                value={scratchPad.info}
                onChange={handleChange}
                required
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
                <Spinner className="inline" size={16} />
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
  );
};

export default MemberForm;
