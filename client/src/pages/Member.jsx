import MembersManagement from "@/components/MembersManagement";
import { useSelector } from "react-redux";

const Member = () => {
  const { allMembers } = useSelector((state) => state.user);

  return (
    <div className="flex justify-center bg-gray-200">
      <MembersManagement memberData={allMembers} />
    </div>
  );
};

export default Member;
