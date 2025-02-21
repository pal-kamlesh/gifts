import { getHistory } from "@/redux/user/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MemberCard from "./MemberCard";

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
  mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
};
function HistoryView({ memberId }) {
  const [member, setMember] = useState(null);
  const [history, setHistory] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchHistory(id) {
      try {
        const data = await dispatch(getHistory({ id }));
        const result = unwrapResult(data);
        setMember(result.member);
        setHistory(result.member.history.changes || []);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    }

    if (memberId) {
      fetchHistory(memberId);
    }
  }, [memberId, dispatch]);
  console.log(history);
  return (
    <div className="flex flex-col h-screen p-4 space-y-6 bg-gray-100">
      {member && <MemberCard member={member} />}

      {/* History Carousel */}
      {history.length > 0 ? (
        <div className="bg-white shadow-md p-6 rounded-lg flex-1">
          <h2 className="text-xl font-semibold mb-4">History</h2>
          <Carousel responsive={responsive} infinite autoPlay>
            {history.map((item, index) => (
              <div key={index} className="p-2 m-1 bg-gray-50 rounded-lg shadow">
                <p>
                  <strong>Message:</strong> {item.message}
                </p>
                <p>
                  <strong>Created By:</strong> {item.author}
                </p>
                <p>
                  <strong>Timestamp:</strong>
                  {new Date(item.timestamp).toLocaleDateString()}
                </p>
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <p className="text-center text-gray-500">No history available</p>
      )}
    </div>
  );
}

export default HistoryView;
