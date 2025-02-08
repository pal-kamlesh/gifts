import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExcelTable } from "@/components";
import { getSelectedMembers } from "@/redux/user/userSlice";

const Delivery = () => {
  const { selected } = useSelector((state) => state.user);
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    dispatch(getSelectedMembers());
  }, [dispatch]);

  useEffect(() => {
    switch (filterStatus) {
      case "all":
        setFilteredData(selected);
        break;
      case "pending":
        setFilteredData(
          selected.filter(
            (data) => data.deliveryDate !== "" && !data.confirmDelivery // Fixed typo here
          )
        );
        break;
      case "delivered":
        setFilteredData(
          selected.filter(
            (data) => data.deliveryDate !== "" && data.confirmDelivery // Fixed typo here
          )
        );
        break;
      default:
        break;
    }
  }, [filterStatus, selected]);
  console.log(filteredData);

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
        </div>
      </div>
      <ExcelTable members={filteredData} />
    </div>
  );
};

export default Delivery;
