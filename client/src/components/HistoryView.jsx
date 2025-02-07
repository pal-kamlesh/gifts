import { getHistory } from "@/redux/user/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// eslint-disable-next-line react/prop-types
function HistoryView({ memberId }) {
  const [history, setHistory] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    async function handleHistory(id) {
      const data = await dispatch(getHistory({ id }));
      const result = unwrapResult(data);
      setHistory(result);
    }
    if (memberId) {
      handleHistory(memberId);
    }
  }, [memberId, dispatch]);
  console.log(history);
  return (
    <div className="bg-green-500">
      <div>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut
        perspiciatis ex itaque vel assumenda accusamus ipsa enim ab architecto,
        iste impedit cupiditate ratione. Reiciendis optio excepturi nesciunt
        voluptatum sit repellat.
      </div>
    </div>
  );
}

export default HistoryView;
