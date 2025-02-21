import React from "react";

const MemberCard = ({ member }) => {
  if (!member) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300 w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-purple-700 mb-4">
        Personal & Contact Information
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm font-semibold">Name</p>
          <p className="text-gray-700">{member.name}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Date of Birth</p>
          <p className="text-gray-700">
            {new Date(member.dob).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Phone Number</p>
          <p className="text-gray-700">{member.phone}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Location</p>
          <p className="text-gray-700">{member.location}</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm font-semibold">Address</p>
          <p className="text-gray-700">{member.address}</p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-purple-700 mb-4">
        Gift and Site Details
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm font-semibold">Food Hamper</p>
          <p className="text-gray-700">{member.gifts.foodHamper}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Liquid</p>
          <p className="text-gray-700">{member.gifts.liquid}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Gifts</p>
          <p className="text-gray-700">{member.gifts.articles}</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm font-semibold">Additional Gifts</p>
          <p className="text-gray-700">{member.gifts.additional}</p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-purple-700 mb-4">Gifters</h2>
      <div className="mb-6">
        <p className="text-gray-700">
          {Object.keys(member.gifters)
            .filter((key) => member.gifters[key])
            .join(", ")}
        </p>
      </div>

      <h2 className="text-xl font-bold text-purple-700 mb-4">
        Company Information
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-semibold">Company</p>
          <p className="text-gray-700">{member.company}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Additional Info</p>
          <p className="text-gray-700">{member.additionalInfo}</p>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
