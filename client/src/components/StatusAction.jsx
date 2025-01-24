import { shouldDisable } from "@/functiion";
import { useSelector } from "react-redux";

export default function StatusAction({ onClose, activeMember, setActiveId }) {
  const { currentUser } = useSelector((state) => state.user);

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
                value={activeMember.name}
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
                className="form-checkbox mt-1 h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                checked={activeMember.delivered || false}
                disabled={shouldDisable(currentUser?.rights, "delivered")}
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
                value={activeMember.phone}
                required
                disabled={shouldDisable(currentUser?.rights, "phone")}
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
                checked={activeMember.recived || false}
                disabled={shouldDisable(currentUser?.rights, "location")}
              />
            </label>

            {/* Delivery Person */}
            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">
                Delivery Person
              </span>
              <input
                type="text"
                name="deliveryPerson"
                className="form-textarea mt-1 w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                value={activeMember.deleveryPerson}
                disabled={shouldDisable(currentUser?.rights, "address")}
              ></input>
            </label>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
