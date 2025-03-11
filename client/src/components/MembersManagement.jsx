/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExcelTable, PageHeader } from "./index.js";
import {
  getAllMembers,
  moveMemberToScratchPad,
  openScratchpad,
} from "../redux/user/userSlice.js";
import { useLocation } from "react-router-dom";
import { Loading } from "./index.js";
import MemberForm from "./MemberForm.jsx";
import { Pagination } from "flowbite-react";
import { unwrapResult } from "@reduxjs/toolkit";

export default function MembersManagement({ memberData: allMembers }) {
  const { loading, openModal } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const onPageChange = (page) => setCurrentPage(page);

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    if (pathname) {
      setTab(pathname.slice(1));
    }
  }, [pathname]);
  const fetchMembers = async () => {
    try {
      const response = await dispatch(
        getAllMembers({ page: currentPage, limit })
      );
      const data = await unwrapResult(response);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(`Failed to fetch services`, error);
    }
  };
  useEffect(() => {
    fetchMembers();
  }, [currentPage]);

  function setMemberToEdit(id) {
    dispatch(moveMemberToScratchPad(id));
  }

  // async function handleSelectMember(id) {
  //   const result = await dispatch(handleSelectMember({ id }));
  //   const data = unwrapResult(result);
  //   if (data) {
  //     filterSetMember(id, data.member);
  //   }
  // }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className=" flex justify-center w-full mx-auto ">
      <div>
        <div>
          <PageHeader tab={tab} />
          <div
            className={`transition-all duration-500 ease-in-out ${
              openModal
                ? "max-h-[1vh] opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            {openModal && <MemberForm />}
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
          <div className="flex overflow-x-auto sm:justify-center">
            <Pagination
              layout="pagination"
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              previousLabel="Go back"
              nextLabel="Go forward"
              showIcons
            />
          </div>
        </div>
      </div>
    </div>
  );
}
