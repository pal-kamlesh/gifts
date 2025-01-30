/* eslint-disable react/prop-types */
import { shouldDisable } from "@/functiion";
import { deliveryStatus } from "@/redux/user/userSlice";
import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function StatusAction({ onClose, activeMember }) {
  const { employeeName, delivered, deliveryDate, received } =
    activeMember.memberId;
  const [deliveryData, setDeliveryData] = useState({
    employeeName: "",
    delivered: "",
    deliveryDate: "",
    received: "",
  });
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    setDeliveryData((data) => ({
      ...data,
      employeeName: employeeName,
      delivered: delivered,
      deliveryDate: deliveryDate
        ? new Date(deliveryDate).toISOString().split("T")[0]
        : "",
      received: received,
    }));
  }, [activeMember, delivered, deliveryDate, employeeName, received]);
  const { currentUser } = useSelector((state) => state.user);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setDeliveryData((data) => ({
      ...data,
      [name]: type === "checkbox" ? checked : value, // Dynamically update the field
    }));

    // Special case for "delivered" to set deliveryDate
    if (name === "delivered" && e.target.checked) {
      setDeliveryData((data) => ({
        ...data,
        deliveryDate: new Date().toISOString().split("T")[0],
      }));
    }
    if (name === "delivered" && !e.target.checked) {
      setDeliveryData((data) => ({
        ...data,
        deliveryDate: "",
      }));
    }
  }
  async function handleSubmit(id) {
    await dispatch(deliveryStatus({ id, info: deliveryData }));
    setDeliveryData({
      employeeName: "",
      delivered: "",
      deliveryDate: "",
      received: "",
    });
    onClose();
  }

  return (
    <div className="p-6 bg-white rounded-md ">
      <div className="flex flex-col gap-6">
        <fieldset className="border rounded-md p-6">
          <legend className="px-4 font-semibold text-purple-600 text-lg">
            Delivery Information
          </legend>

          {/* Name Field */}
          <div className="flex justify-center mb-6">
            <label className="flex flex-col items-center w-full max-w-md">
              <span className="text-sm font-medium text-gray-700">Name</span>
              <input
                type="text"
                name="name"
                className="form-input mt-1 w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                value={activeMember?.memberId?.name}
                required
                disabled
              />
            </label>
          </div>

          {/* Grid Layout for Other Fields */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Delivered */}
            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">
                Delivered
              </span>
              <input
                type="checkbox"
                name="delivered"
                checked={deliveryData.delivered}
                className="form-checkbox mt-1 h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                disabled={shouldDisable(currentUser?.rights, "delivered")}
                onChange={(e) => handleChange(e)}
              />
            </label>

            {/* Delivered Date */}
            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">
                Delivered Date
              </span>
              <input
                type="date"
                name="deliveredDate"
                className="form-input mt-1 w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                value={
                  deliveryData?.deliveryDate !== ""
                    ? new Date(deliveryData?.deliveryDate)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                required
                disabled={shouldDisable(currentUser?.rights, "phone")}
                onChange={(e) => handleChange(e)}
              />
            </label>

            {/* Received */}
            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">
                Received
              </span>
              <input
                type="checkbox"
                name="received"
                className="form-checkbox mt-1 h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                checked={deliveryData.received}
                disabled={shouldDisable(currentUser?.rights, "received")}
                onChange={(e) => handleChange(e)}
              />
            </label>

            {/* Delivery Person */}
            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">
                Delivery Person
              </span>
              <input
                type="text"
                name="employeeName"
                className="form-textarea mt-1 w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                value={deliveryData.employeeName}
                disabled={shouldDisable(currentUser?.rights, "address")}
                onChange={(e) => handleChange(e)}
              ></input>
            </label>
          </div>
        </fieldset>
        <Button
          disabled={loading}
          onClick={() => handleSubmit(activeMember.memberId._id)}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <Spinner size="sm" className="mr-2" />
              <span>Submiting...</span>
            </div>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </div>
  );
}
