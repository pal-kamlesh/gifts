import { useSelector } from "react-redux";
import MembersManagement from "../components/MembersManagement";
import { useEffect, useState } from "react";

const Archive = () => {
  const { allMembers } = useSelector((state) => state.user);
  const [archiveMember, setArchiveMember] = useState([]);
  useEffect(() => {
    setArchiveMember(allMembers?.filter((data) => data.isArchived));
  }, [allMembers]);
  return (
    <div className="w-full flex justify-center p-2">
      <MembersManagement memberData={archiveMember} />
    </div>
  );
};

export default Archive;
