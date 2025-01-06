import { useSelector } from "react-redux";
import { shouldDisable } from "../functiion";

// eslint-disable-next-line react/prop-types
const ExcelTable = ({ members, fn }) => {
  const { currentUser } = useSelector((state) => state.user);

  function handleEdit(id) {
    console.log(id);
    fn(id);
  }

  // Utility function to check if a field should be hidden
  const isFieldDisabled = (field) => shouldDisable(currentUser.rights, field);

  return (
    <div className="overflow-auto my-3 mx-auto w-11/12">
      <table className="w-full border-collapse border border-gray-400 shadow-lg">
        <thead className="bg-gray-200">
          <tr>
            {!isFieldDisabled("name") && (
              <th className="border border-gray-400 px-4 py-2 text-left">
                Name
              </th>
            )}
            {!isFieldDisabled("dob") && (
              <th className="border border-gray-400 px-4 py-2 text-left">
                DOB
              </th>
            )}
            {!isFieldDisabled("address") && (
              <th className="border border-gray-400 px-4 py-2 text-left">
                Address
              </th>
            )}
            {!isFieldDisabled("phone") && (
              <th className="border border-gray-400 px-4 py-2 text-left">
                Phone
              </th>
            )}
            {!isFieldDisabled("location") && (
              <th className="border border-gray-400 px-4 py-2 text-left">
                Location
              </th>
            )}
            {!isFieldDisabled("info") && (
              <th className="border border-gray-400 px-4 py-2 text-left">
                Info
              </th>
            )}
            {!isFieldDisabled("gifts") && (
              <th className="border border-gray-400 px-4 py-2 text-left">
                Gifts
              </th>
            )}
            {!isFieldDisabled("giftGiven") && (
              <th className="border border-gray-400 px-4 py-2 text-left">
                Gift Given
              </th>
            )}
            {!isFieldDisabled("received") && (
              <th className="border border-gray-400 px-4 py-2 text-left">
                Received
              </th>
            )}
            {!isFieldDisabled("company") && (
              <th className="border border-gray-400 px-4 py-2 text-left">
                Company
              </th>
            )}
            {!isFieldDisabled("action") && (
              <th className="border border-gray-400 px-4 py-2 text-left">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
            >
              {!isFieldDisabled("name") && (
                <td className="border border-gray-400 px-4 py-2">
                  {member.name}
                </td>
              )}
              {!isFieldDisabled("dob") && (
                <td className="border border-gray-400 px-4 py-2">
                  {member.dob}
                </td>
              )}
              {!isFieldDisabled("address") && (
                <td className="border border-gray-400 px-4 py-2">
                  {member.address}
                </td>
              )}
              {!isFieldDisabled("phone") && (
                <td className="border border-gray-400 px-4 py-2">
                  {member.phone}
                </td>
              )}
              {!isFieldDisabled("area") && (
                <td className="border border-gray-400 px-4 py-2">
                  {member.area}
                </td>
              )}
              {!isFieldDisabled("site") && (
                <td className="border border-gray-400 px-4 py-2">
                  {member.site}
                </td>
              )}
              {!isFieldDisabled("gifts") && (
                <td className="border border-gray-400 px-4 py-2">
                  <span className="mr-2">{member.gifts.gift1}</span>
                  <span className="mr-2">{member.gifts.gift2}</span>
                  <span className="mr-2">{member.gifts.gift3}</span>
                </td>
              )}
              {!isFieldDisabled("giftGiven") && (
                <td className="border border-gray-400 px-4 py-2">
                  {member.giftGiven ? "Yes" : "No"}
                </td>
              )}
              {!isFieldDisabled("received") && (
                <td className="border border-gray-400 px-4 py-2">
                  {member.recived ? "Yes" : "No"}
                </td>
              )}
              {!isFieldDisabled("company") && (
                <td className="border border-gray-400 px-4 py-2">
                  {member.company}
                </td>
              )}
              {!isFieldDisabled("action") && (
                <td className="border border-gray-400 px-4 py-2">
                  <button onClick={() => handleEdit(member._id)}>Edit</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelTable;
