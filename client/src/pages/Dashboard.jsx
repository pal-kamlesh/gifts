import { useEffect, useState } from "react";
import { FaUsers, FaGift, FaArchive, FaTruck } from "react-icons/fa";
import { Spinner } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { dashboardData } from "@/redux/user/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const Dashboard = () => {
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(dashboardData());
      const data = unwrapResult(result);
      setData(data);
    };
    fetchData();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!data) {
    return <div className="text-center text-red-500">Failed to load data</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {/** Card 1: Total Members */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl shadow-md p-6">
        <div className="flex items-center gap-4">
          <FaUsers className="text-blue-600 text-3xl" />
          <h3 className="text-xl font-semibold text-blue-800">Total Members</h3>
        </div>
        <div className="mt-4 text-2xl font-bold text-blue-900">
          {data.totalMember}
        </div>
      </div>

      {/** Card 2: Archived Members */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl shadow-md p-6">
        <div className="flex items-center gap-4">
          <FaArchive className="text-gray-600 text-3xl" />
          <h3 className="text-xl font-semibold text-gray-800">
            Archived Members
          </h3>
        </div>
        <div className="mt-4 text-2xl font-bold text-gray-900">
          {data.archivedMember}
        </div>
      </div>

      {/** Card 3: Gifts Delivered */}
      <div className="bg-green-50 border border-green-200 rounded-2xl shadow-md p-6">
        <div className="flex items-center gap-4">
          <FaTruck className="text-green-600 text-3xl" />
          <h3 className="text-xl font-semibold text-green-800">
            Gifts Delivered
          </h3>
        </div>
        <div className="mt-4 text-2xl font-bold text-green-900">
          {data.giftsDelivered}
        </div>
      </div>

      {/** Card 4: Pending Deliveries */}
      <div className="bg-red-50 border border-red-200 rounded-2xl shadow-md p-6">
        <div className="flex items-center gap-4">
          <FaTruck className="text-red-600 text-3xl" />
          <h3 className="text-xl font-semibold text-red-800">
            Pending Deliveries
          </h3>
        </div>
        <div className="mt-4 text-2xl font-bold text-red-900">
          {data.pendingDelivered}
        </div>
      </div>

      {/** Card 5: Selected Members */}
      <div className="bg-purple-50 border border-purple-200 rounded-2xl shadow-md p-6">
        <div className="flex items-center gap-4">
          <FaUsers className="text-purple-600 text-3xl" />
          <h3 className="text-xl font-semibold text-purple-800">
            Selected Members
          </h3>
        </div>
        <div className="mt-4 text-2xl font-bold text-purple-900">
          {data.selectedMember}
        </div>
      </div>

      {/** Card 6: Gift Distribution */}
      {data.giftCounts.map((gift) => (
        <div
          key={gift._id}
          className="bg-yellow-50 border border-yellow-200 rounded-2xl shadow-md p-6"
        >
          <div className="flex items-center gap-4">
            <FaGift className="text-yellow-600 text-3xl" />
            <h3 className="text-xl font-semibold text-yellow-800">
              {gift._id}
            </h3>
          </div>
          <div className="mt-4 text-2xl font-bold text-yellow-900">
            {gift.count}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
