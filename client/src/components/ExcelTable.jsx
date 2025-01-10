import { useDispatch, useSelector } from "react-redux";
import { shouldDisable } from "../functiion";
import { useEffect, useState } from "react";
import { handleSelectMember } from "../redux/user/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";

// eslint-disable-next-line react/prop-types
const ExcelTable = ({ members, fn, filterSetMember }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();
  function handleEdit(id) {
    fn(id);
  }

  // Utility function to check if a field should be hidden
  const isFieldDisabled = (field) => shouldDisable(currentUser.rights, field);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  async function selectMember(id) {
    const result = await dispatch(handleSelectMember({ id }));
    const data = unwrapResult(result);
    if (data) {
      filterSetMember(id, data.member);
    }
  }
  return (
    <div className="overflow-auto my-3 mx-auto w-11/12">
      <table className="w-full border-collapse border border-gray-400 shadow-lg">
        <thead className="bg-gray-200">
          <tr>
            {!isFieldDisabled("name") && (
              <th className="border border-gray-400 px-4 py-2 text-left">
                Name
              </th>
            )}
            {!isFieldDisabled("dob") && (
              <th className="border border-gray-400 px-4 py-2 text-left">
                DOB
              </th>
            )}
            {!isFieldDisabled("address") && (
              <th className="border border-gray-400 px-4 py-2 text-left">
                Address
              </th>
            )}
            {!isFieldDisabled("phone") && (
              <th className="border border-gray-400 px-4 py-2 text-left">
                Phone
              </th>
            )}
            {!isFieldDisabled("location") && (
              <th className="border border-gray-400 px-4 py-2 text-left">
                Location
              </th>
            )}
            {!isFieldDisabled("info") && (
              <th className="border border-gray-400 px-4 py-2 text-left">
                Info
              </th>
            )}
            {!isFieldDisabled("gift1") && (
              <th className="border border-gray-400 px-4 py-2 text-left">
                Gifts
              </th>
            )}
            {!isFieldDisabled("giftGiven") && (
              <th className="border border-gray-400 px-4 py-2 text-left">
                Gift Given
              </th>
            )}
            {!isFieldDisabled("received") && (
              <th className="border border-gray-400 px-4 py-2 text-left">
                Received
              </th>
            )}
            {!isFieldDisabled("company") && (
              <th className="border border-gray-400 px-4 py-2 text-left">
                Company
              </th>
            )}
            {tab !== "selection" && (
              <th className="border border-gray-400 px-4 py-2 text-left">
                Actions
              </th>
            )}
            {tab === "selection" && (
              <th className="border border-gray-400 px-4 py-2 text-left">
                {`Selct for ${new Date().getFullYear()}`}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
            >
              {!isFieldDisabled("name") && (
                <td className="border border-gray-400 px-4 py-2">
                  {member.name}
                </td>
              )}
              {!isFieldDisabled("dob") && (
                <td className="border border-gray-400 px-4 py-2">
                  {new Date(member.dob).toISOString().split("T")[0]}
                </td>
              )}
              {!isFieldDisabled("address") && (
                <td className="border border-gray-400 px-4 py-2">
                  {member.address}
                </td>
              )}
              {!isFieldDisabled("phone") && (
                <td className="border border-gray-400 px-4 py-2">
                  {member.phone}
                </td>
              )}
              {!isFieldDisabled("location") && (
                <td className="border border-gray-400 px-4 py-2">
                  {member.location}
                </td>
              )}
              {!isFieldDisabled("info") && (
                <td className="border border-gray-400 px-4 py-2">
                  {member.info}
                </td>
              )}
              {!isFieldDisabled("gift1") && (
                <td className="border border-gray-400 px-4 py-2">
                  <span className="mr-2 block">{member?.gift1}</span>
                  <span className="mr-2 block">{member?.gift2}</span>
                  <span className="mr-2 block">{member?.gift3}</span>
                </td>
              )}
              {!isFieldDisabled("giftGiven") && (
                <td className="border border-gray-400 px-4 py-2">
                  {member.giftGiven ? "Yes" : "No"}
                </td>
              )}
              {!isFieldDisabled("received") && (
                <td className="border border-gray-400 px-4 py-2">
                  {member.recived ? "Yes" : "No"}
                </td>
              )}
              {!isFieldDisabled("company") && (
                <td className="border border-gray-400 px-4 py-2">
                  {member.company}
                </td>
              )}

              {tab !== "selection" && (
                <td className="border border-gray-400 px-4 py-2">
                  <button onClick={() => handleEdit(member._id)}>Edit</button>
                </td>
              )}
              {tab === "selection" && (
                <th className="border border-gray-400 px-4 py-2 text-left ">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={member.selected}
                      onChange={() => selectMember(member._id)}
                    />
                  </div>
                </th>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelTable;
