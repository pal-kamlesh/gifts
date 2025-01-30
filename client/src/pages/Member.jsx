import MembersManagement from "@/components/MembersManagement";
import { useSelector } from "react-redux";

const Member = () => {
  const { allMembers } = useSelector((state) => state.user);

  return (
    <div className=" w-full flex justify-center h-screen bg-gray-200">
      <MembersManagement memberData={allMembers} />
    </div>
  );
};

export default Member;
