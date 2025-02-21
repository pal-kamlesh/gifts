/* eslint-disable react/prop-types */
import { shouldDisable } from "@/functiion";
import { deliveryStatus } from "@/redux/user/userSlice";
import {
  Button,
  Checkbox,
  Label,
  Spinner,
  Textarea,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function StatusAction({ onClose }) {
  const { scratchPad } = useSelector((state) => state.user);
  const {
    _id,
    name,
    deliveryStatus: {
      deliveryPerson,
      confirmDelivery,
      deliveryDate,
      onDeliveryNote,
    },
  } = scratchPad;

  const [deliveryData, setDeliveryData] = useState({
    deliveryDate: "",
    deliveryPerson: "",
    confirmDelivery: "",
    onDeliveryNote: "",
  });
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setDeliveryData((data) => ({
      ...data,
      deliveryPerson: deliveryPerson,
      confirmDelivery: confirmDelivery ? confirmDelivery : false,
      onDeliveryNote: onDeliveryNote,
      deliveryDate: deliveryDate
        ? new Date(deliveryDate).toISOString().split("T")[0]
        : "",
    }));
  }, [confirmDelivery, deliveryDate, deliveryPerson, onDeliveryNote]);
  const { currentUser } = useSelector((state) => state.user);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (name === "confirmDelivery") {
      if (deliveryData.deliveryDate === "") return;
    }
    setDeliveryData((data) => ({
      ...data,
      [name]: type === "checkbox" ? checked : value, // Dynamically update the field
    }));
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
    <div className="p-6 bg-white rounded-md">
      {/* Row 1: Name (full width) */}
      <div className="max-w-full grid grid-cols-6 mb-4">
        <div className="col-span-6">
          <div className="mb-2">
            <Label htmlFor="name">
              <span>Name</span>
              {/* Optionally add a required symbol here */}
            </Label>
          </div>
          <TextInput name="name" value={name} disabled />
        </div>
      </div>

      {/* Row 2: Delivery Person, Confirm Delivery, and Delivered Date */}
      <div className="max-w-full grid grid-cols-6 gap-6 mb-4">
        {/* Delivery Person */}
        <div className="col-span-3">
          <div className="mb-2">
            <Label htmlFor="deliveryPerson">
              <span>Delivery Person</span>
            </Label>
          </div>
          <TextInput
            name="deliveryPerson"
            value={deliveryData.deliveryPerson}
            onChange={handleChange}
          />
        </div>

        {/* Confirm Delivery */}
        <div className="col-span-1 flex flex-col justify-end">
          <div className="mb-2">
            <Label htmlFor="confirmDelivery">
              <span>Confirm Delivery</span>
            </Label>
          </div>
          <Checkbox
            id="confirmDelivery"
            name="confirmDelivery"
            checked={deliveryData.confirmDelivery}
            onChange={handleChange}
            disabled={shouldDisable(currentUser?.rights, "delivered")}
          />
        </div>

        {/* Delivered Date */}
        <div className="col-span-2">
          <div className="mb-2">
            <Label htmlFor="deliveryDate">
              <span>Delivered Date</span>
            </Label>
          </div>
          <TextInput
            type="date"
            name="deliveryDate"
            value={
              deliveryData.deliveryDate
                ? new Date(deliveryData.deliveryDate)
                    .toISOString()
                    .split("T")[0]
                : ""
            }
            onChange={handleChange}
            disabled={shouldDisable(currentUser?.rights, "phone")}
          />
        </div>
      </div>

      {/* Row 3: Delivery Note (full width) */}
      <div className="max-w-full grid grid-cols-6 mb-4">
        <div className="col-span-6">
          <div className="mb-2">
            <Label htmlFor="onDeliveryNote">
              <span>Delivery Note</span>
            </Label>
          </div>
          <Textarea
            name="onDeliveryNote"
            value={deliveryData.onDeliveryNote}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <Button disabled={loading} onClick={() => handleSubmit(_id)}>
          {loading ? (
            <div className="flex items-center gap-2">
              <Spinner size="sm" />
              <span>Submitting...</span>
            </div>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </div>
  );
}
