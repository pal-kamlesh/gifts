/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { shouldDisable } from "../functiion";
import { useEffect, useState } from "react";
import {
  copyToScratchPad,
  getHistory,
  handleSelectMember,
  handleUnSelectMember,
  moveMemberToScratchPad,
  unarchiveMember,
} from "../redux/user/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { FaEdit } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { Table } from "flowbite-react";
import { useLocation } from "react-router-dom";
import { CustomModal, StatusAction } from ".";
import HistoryView from "./HistoryView";

const ExcelTable = ({ members, filterSetMember }) => {
  const [statusModel, setStatusModel] = useState(false);
  const [historyModel, setHistoryModel] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();

  async function unArchive(id) {
    const result = await dispatch(unarchiveMember({ id }));
    const data = unwrapResult(result);
    if (data) {
      filterSetMember(id, data.member);
    }
  }

  // Utility function to check if a field should be hidden
  const isFieldDisabled = (field) => shouldDisable(currentUser.rights, field);

  useEffect(() => {
    setTab(pathname.slice(1));
  }, [pathname]);

  async function selectMember(id) {
    const result = await dispatch(handleSelectMember({ id }));
    const data = unwrapResult(result);
    if (data) {
      filterSetMember(id, data.member);
    }
  }
  async function unSelctMember(id) {
    const reuslt = await dispatch(handleUnSelectMember({ id }));
    const data = unwrapResult(reuslt);
    if (data) {
      filterSetMember(id, data.member);
    }
  }
  function copyToEdit(id) {
    dispatch(copyToScratchPad(id));
  }
  return (
    <div className="my-3">
      <Table hoverable={true}>
        <Table.Head>
          {!isFieldDisabled("name") && <Table.HeadCell>Name</Table.HeadCell>}
          {!isFieldDisabled("dob") && <Table.HeadCell>DOB</Table.HeadCell>}
          {!isFieldDisabled("phone") && <Table.HeadCell>Phone</Table.HeadCell>}
          {!isFieldDisabled("location") && (
            <Table.HeadCell>Location</Table.HeadCell>
          )}
          {!isFieldDisabled("info") && <Table.HeadCell>Gifts</Table.HeadCell>}
          {!isFieldDisabled("gift1") && (
            <Table.HeadCell>Gifters</Table.HeadCell>
          )}
          {!isFieldDisabled("giftGiven") && (
            <Table.HeadCell>CreatedBy</Table.HeadCell>
          )}
          {!isFieldDisabled("received") && (
            <Table.HeadCell>CreatedAt</Table.HeadCell>
          )}
          {tab !== "selection" && <Table.HeadCell>Actions</Table.HeadCell>}
          {tab === "members" && <Table.HeadCell>History</Table.HeadCell>}
          {tab === "selection" && (
            <Table.HeadCell>{`Select for ${new Date().getFullYear()}`}</Table.HeadCell>
          )}
        </Table.Head>
        <Table.Body className="divide-y">
          {members?.map((member, index) => (
            <Table.Row
              key={index}
              className={member?.isArchived ? "bg-red-300" : "bg-white"}
            >
              {!isFieldDisabled("name") && (
                <Table.Cell>{member.name}</Table.Cell>
              )}
              {!isFieldDisabled("dob") && (
                <Table.Cell>
                  {new Date(member.dob).toISOString().split("T")[0]}
                </Table.Cell>
              )}
              {!isFieldDisabled("phone") && (
                <Table.Cell>{member.phone}</Table.Cell>
              )}
              {!isFieldDisabled("location") && (
                <Table.Cell>{member.location}</Table.Cell>
              )}
              <Table.Cell>
                <div>
                  {Object.entries(member.gifts)
                    .filter(
                      ([_, value]) =>
                        value && value !== "na" && value.trim() !== ""
                    )
                    .map(([key, value]) => (
                      <div key={key}>{value}</div>
                    ))}
                </div>
              </Table.Cell>
              <Table.Cell>
                <div>
                  {Object.keys(member.gifters)
                    .filter((key) => member.gifters[key]) // Only keep keys where value is true
                    .map((key) => (
                      <div key={key}>{key}</div>
                    ))}
                </div>
              </Table.Cell>
              <Table.Cell>{member.createdBy}</Table.Cell>
              <Table.Cell>
                {new Date(member.createdAt).toLocaleDateString()}
              </Table.Cell>

              {tab !== "selection" && tab !== "archive" && (
                <Table.Cell>
                  <button
                    onClick={() =>
                      tab === "delivery"
                        ? [setStatusModel(true), copyToEdit(member._id)]
                        : [dispatch(moveMemberToScratchPad(member._id))]
                    }
                    className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md transition duration-150"
                    title="Edit this member"
                  >
                    <span className="flex items-center gap-1">
                      <FaEdit /> <span>Edit</span>
                    </span>
                  </button>
                </Table.Cell>
              )}
              {tab === "members" && (
                <Table.Cell>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => [
                        setHistoryModel(true),
                        setActiveId(member._id),
                      ]}
                      className={`bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md transition duration-150 ${
                        member.history ? "cursor-pointer" : "cursor-not-allowed"
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        <IoPersonRemoveSharp />
                        <span>History</span>
                      </span>
                    </button>
                  </div>
                </Table.Cell>
              )}
              {tab === "archive" && (
                <Table.Cell>
                  <button
                    onClick={() => unArchive(member._id)}
                    className={`bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md transition duration-150 ${
                      member.isArchived
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <IoPersonRemoveSharp />
                      <span>Remove</span>
                    </span>
                  </button>
                </Table.Cell>
              )}
              {tab === "selection" && (
                <Table.Cell>
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={member.selected}
                      disabled={member.isArchived}
                      onChange={
                        member.selected
                          ? () => unSelctMember(member._id)
                          : () => selectMember(member._id)
                      }
                      className={`${
                        member.isArchived
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    />
                  </div>
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <CustomModal
        isOpen={statusModel}
        onClose={() => setStatusModel(!statusModel)}
        size="2xl"
        heading="New Contract"
        bg="bg-red-50"
      >
        <StatusAction
          onClose={() => setStatusModel(!statusModel)}
          setActiveId={setActiveId}
          activeMember={{}}
        />
      </CustomModal>

      <CustomModal
        isOpen={historyModel}
        onClose={() => setHistoryModel(false)}
        size="7xl"
        heading="New Contract"
        bg="bg-red-50"
      >
        <HistoryView
          onClose={() => setHistoryModel(false)}
          memberId={activeId}
        />
      </CustomModal>
    </div>
  );
};

export default ExcelTable;
