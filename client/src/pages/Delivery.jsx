/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  CheckCircle,
  XCircle,
  Calendar,
  Info,
  MapPin,
  Phone,
} from "lucide-react";
import { useSelector } from "react-redux";
import { CustomModal, StatusAction } from "@/components";

const GiftDeliveryDashboard = () => {
  const { allMembers } = useSelector((state) => state.user);
  const [filterStatus, setFilterStatus] = useState("all");
  const [statusModel, setStatusModel] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [activeMember, setActiveMember] = useState(null);
  const getStatusColor = (delivered, received) => {
    if (received) return "bg-green-100 text-green-800";
    if (delivered) return "bg-yellow-100 text-yellow-800";
    return "bg-blue-100 text-blue-800";
  };
  useEffect(() => {
    setActiveMember(allMembers?.find((m) => m._id === activeId));
  }, [activeId, allMembers]);

  const getStatusText = (delivered, received) => {
    if (received) return "Completed";
    if (delivered) return "Delivered";
    return "Pending";
  };

  const filteredMembers = allMembers?.filter((member) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "completed") return member.received;
    if (filterStatus === "delivered")
      return member.delivered && !member.received;
    return !member.delivered && !member.received;
  });

  return (
    <div className="w-full mx-auto p-4 space-y-6">
      {/* Header with filters */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gift Delivery Management</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-4 py-2 rounded ${
              filterStatus === "all" ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus("pending")}
            className={`px-4 py-2 rounded ${
              filterStatus === "pending"
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilterStatus("delivered")}
            className={`px-4 py-2 rounded ${
              filterStatus === "delivered"
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Delivered
          </button>
          <button
            onClick={() => setFilterStatus("completed")}
            className={`px-4 py-2 rounded ${
              filterStatus === "completed"
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Delivery Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers?.map((member) => (
          <Card key={member._id} className="flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{member.name}</CardTitle>
                <Badge
                  className={`${getStatusColor(
                    member.delivered,
                    member.received
                  )} px-2 py-1 rounded cursor-pointer`}
                  onClick={() => (
                    setStatusModel(true), setActiveId(member._id)
                  )}
                >
                  {getStatusText(member.delivered, member.received)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              {/* Contact & Location Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{member.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{member.phone}</span>
                </div>
                {member.location && (
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-gray-500" />
                    <span>{member.location}</span>
                  </div>
                )}
              </div>

              {/* Gifts Section */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Gifts
                </h3>
                <ul className="space-y-1">
                  {member.gift1 && (
                    <li className="flex items-center gap-2">
                      {member.delivered ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-gray-300" />
                      )}
                      {member.gift1}
                    </li>
                  )}
                  {member.gift2 && (
                    <li className="flex items-center gap-2">
                      {member.delivered ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-gray-300" />
                      )}
                      {member.gift2}
                    </li>
                  )}
                  {member.gift3 && (
                    <li className="flex items-center gap-2">
                      {member.delivered ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-gray-300" />
                      )}
                      {member.gift3}
                    </li>
                  )}
                </ul>
              </div>

              {/* Delivery Details */}
              {member.deliveryDate && (
                <div className="border-t mt-4 pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    Delivered on:{" "}
                    {new Date(member.deliveryDate).toLocaleDateString()}
                  </div>
                  {member.employeeName && (
                    <div className="text-sm text-gray-600 mt-1">
                      By: {member.employeeName}
                    </div>
                  )}
                </div>
              )}
              {/* Status Update Actions */}
            </CardContent>
          </Card>
        ))}
      </div>
      <CustomModal
        isOpen={statusModel}
        onClose={() => setStatusModel(!statusModel)}
        size="xl"
        heading="New Contract"
        bg="bg-red-50"
      >
        <StatusAction
          onClose={() => setStatusModel(!statusModel)}
          activeMember={activeMember}
          setActiveId={setActiveId}
        />
      </CustomModal>
    </div>
  );
};

export default GiftDeliveryDashboard;
