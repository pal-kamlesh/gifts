import MembersManagement from "@/components/MembersManagement";
import { useSelector } from "react-redux";

const Member = () => {
  const { allMembers } = useSelector((state) => state.user);

  return (
    <div className="flex justify-center p-2">
      <MembersManagement memberData={allMembers} />
    </div>
  );
};

export default Member;
