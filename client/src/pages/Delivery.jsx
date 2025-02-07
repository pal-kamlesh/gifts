import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomModal,
  Loading,
  MembersManagement,
  StatusAction,
} from "@/components";

const Delivery = () => {
  const { selected, allMembers } = useSelector((state) => state.user);
  const [filterStatus, setFilterStatus] = useState("all");
  const [statusModel, setStatusModel] = useState(false);
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="w-full mx-auto p-4 space-y-6">
      {/* Header with filters */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gift Delivery Management</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-4 py-2 rounded ${
              filterStatus === "all" ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus("pending")}
            className={`px-4 py-2 rounded ${
              filterStatus === "pending"
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilterStatus("delivered")}
            className={`px-4 py-2 rounded ${
              filterStatus === "delivered"
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Delivered
          </button>
          <button
            onClick={() => setFilterStatus("completed")}
            className={`px-4 py-2 rounded ${
              filterStatus === "completed"
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Completed
          </button>
        </div>
      </div>
      <MembersManagement memberData={allMembers} />
      <CustomModal
        isOpen={statusModel}
        onClose={() => setStatusModel(!statusModel)}
        size="xl"
        heading="New Contract"
        bg="bg-red-50"
      >
        <StatusAction
          onClose={() => setStatusModel(!statusModel)}
          activeMember={activeMember}
          setActiveId={setActiveId}
        />
      </CustomModal>
    </div>
  );
};

export default Delivery;
