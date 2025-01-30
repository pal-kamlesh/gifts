import { useSelector } from "react-redux";
import MembersManagement from "../components/MembersManagement";
import { useEffect, useState } from "react";

export default function Selction() {
  const { allMembers } = useSelector((state) => state.user);
  const [activeMembers, setActiveMember] = useState([]);
  useEffect(() => {
    setActiveMember(allMembers?.filter((data) => !data.isArchived));
  }, [allMembers]);
  return (
    <div className=" w-full flex justify-center h-screen bg-gray-200">
      <MembersManagement memberData={activeMembers} />
    </div>
  );
}
