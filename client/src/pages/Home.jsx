import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "flowbite-react";
import { ExcelTable } from "../components";
import { addMember, getAllMembers } from "../redux/user/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { shouldDisable } from "../functiion.js";
// const demoMembers = [
//   {
//     name: "John Doe",
//     dob: "1990-05-12",
//     address: "123 Elm Street, Springfield",
//     phone: "9876543210",
//     area: "North Zone",
//     site: "Downtown Site A",
//     gifts: "Watch, Pen",
//     giftGiven: true,
//     recived: false,
//     company: "Acme Corp",
//   },
//   {
//     name: "Jane Smith",
//     dob: "1985-08-22",
//     address: "456 Maple Avenue, Riverdale",
//     phone: "8765432109",
//     area: "East Zone",
//     site: "Uptown Site B",
//     gifts: "Perfume, Diary",
//     giftGiven: false,
//     recived: true,
//     company: "Global Tech",
//   },
//   {
//     name: "Michael Johnson",
//     dob: "1992-01-15",
//     address: "789 Oak Lane, Brookfield",
//     phone: "7654321098",
//     area: "South Zone",
//     site: "Industrial Site C",
//     gifts: "Bag, Book",
//     giftGiven: true,
//     recived: true,
//     company: "NextGen Solutions",
//   },
//   {
//     name: "Emily Davis",
//     dob: "1998-11-30",
//     address: "101 Pine Road, Lakeside",
//     phone: "6543210987",
//     area: "West Zone",
//     site: "Residential Site D",
//     gifts: "Keychain, Mug",
//     giftGiven: false,
//     recived: false,
//     company: "EcoWorld",
//   },
//   {
//     name: "Robert Brown",
//     dob: "1980-07-19",
//     address: "202 Cedar Drive, Hilltop",
//     phone: "5432109876",
//     area: "Central Zone",
//     site: "Downtown Site E",
//     gifts: "Notebook, Plant",
//     giftGiven: true,
//     recived: true,
//     company: "TechEdge",
//   },
//   {
//     name: "Sophia Wilson",
//     dob: "1995-03-27",
//     address: "303 Birch Boulevard, Midtown",
//     phone: "4321098765",
//     area: "North-East Zone",
//     site: "Industrial Site F",
//     gifts: "Gift Card, Charger",
//     giftGiven: true,
//     recived: false,
//     company: "Smart Solutions",
//   },
//   {
//     name: "Liam Martin",
//     dob: "1987-12-05",
//     address: "404 Willow Way, Bayside",
//     phone: "3210987654",
//     area: "South-West Zone",
//     site: "Residential Site G",
//     gifts: "Headphones, Pen Drive",
//     giftGiven: false,
//     recived: true,
//     company: "Prime Industries",
//   },
// ];

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toUpdate, setToUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [member, setMember] = useState({
    name: "",
    dob: "",
    address: "",
    phone: "",
    location: "",
    info: "",
    gift1: "",
    gift2: "",
    gift3: "",
    giftGiven: false,
    recived: false,
    company: "",
  });
  const [demoMembers, setDemoMembers] = useState([]);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object from the form
    const formData = new FormData(e.target);

    const obj = {
      name: formData.get("name") ?? "",
      dob: formData.get("dob") ?? "",
      address: formData.get("address") ?? "",
      phone: formData.get("phone") ?? "",
      area: formData.get("area") ?? "",
      site: formData.get("site") ?? "",
      gift1: formData.get("gift1") ?? "",
      gift2: formData.get("gift2") ?? "",
      gift3: formData.get("gift3") ?? "",
      giftGiven: formData.get("giftGiven") ?? false,
      recived: formData.get("recived") ?? false,
      company: formData.get("company") ?? "",
    };
    try {
      setLoading(true);
      const resultAction = await dispatch(addMember(obj));
      // eslint-disable-next-line no-unused-vars
      const result = unwrapResult(resultAction);
      setDemoMembers((prev) => [...prev, result.data]);
      setMember({
        name: "",
        dob: "",
        address: "",
        phone: "",
        location: "",
        info: "",
        gift1: "",
        gift2: "",
        gift3: "",
        giftGiven: false,
        recived: false,
        company: "",
      });
      setOpen(!open);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const resultAction = await dispatch(getAllMembers());
        const result = unwrapResult(resultAction);
        setDemoMembers(result.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error", error);
      }
    }
    fetchData();
  }, [currentUser, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember((state) => ({ ...state, [name]: value }));
  };
  function setMemberToEdit(id) {
    const member = demoMembers.find((prev) => prev._id === id);
    setMember(member);
    setOpen(!open);
    setToUpdate(!toUpdate);
  }

  return (
    <>
      <div className={`my-3 mx-auto w-11/12 overflow-auto}`}>
        <div
          className={`transition-all duration-500 ease-in-out ${
            open
              ? "max-h-[1vh] opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          {open && (
            <form
              className="flex flex-col gap-6 rounded-lg bg-gray-100 p-6 shadow-lg md:flex-row md:items-start"
              onSubmit={handleSubmit}
              style={{ maxHeight: "60vh", overflowY: "auto" }}
            >
              {/* Left Section */}
              <div className="flex-1 space-y-4">
                {/* Personal Information */}
                <fieldset className="border rounded-md p-4">
                  <legend className="px-2 font-bold text-purple-600">
                    Personal Information
                  </legend>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <label className="flex flex-col">
                      Name
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        className="form-input mt-1 rounded border-gray-300"
                        value={member.name}
                        onChange={handleChange}
                        required
                        disabled={shouldDisable(currentUser.rights, "name")}
                      />
                    </label>
                    <label className="flex flex-col">
                      Date of Birth
                      <input
                        type="date"
                        name="dob"
                        className="form-input mt-1 rounded border-gray-300"
                        value={member.dob || ""}
                        onChange={handleChange}
                        disabled={shouldDisable(currentUser.rights, "dob")}
                      />
                    </label>
                  </div>
                  <label className="mt-4 flex flex-col">
                    Address
                    <textarea
                      name="address"
                      placeholder="Enter your address"
                      className="form-textarea mt-1 rounded border-gray-300"
                      value={member.address}
                      onChange={handleChange}
                      required
                      disabled={shouldDisable(currentUser.rights, "address")}
                    ></textarea>
                  </label>
                </fieldset>

                {/* Contact Information */}
                <fieldset className="border rounded-md p-4">
                  <legend className="px-2 font-bold text-purple-600">
                    Contact Information
                  </legend>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <label className="flex flex-col">
                      Phone Number
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number"
                        className="form-input mt-1 rounded border-gray-300"
                        value={member.phone}
                        onChange={handleChange}
                        required
                        disabled={shouldDisable(currentUser.rights, "phone")}
                      />
                    </label>
                    <label className="flex flex-col">
                      Location
                      <input
                        type="text"
                        name="location"
                        placeholder="Enter your location"
                        className="form-input mt-1 rounded border-gray-300"
                        value={member.location}
                        disabled={shouldDisable(currentUser.rights, "location")}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </fieldset>
              </div>

              {/* Right Section */}
              <div className="flex-1 space-y-4">
                {/* Gift and Site Details */}
                <fieldset className="border rounded-md p-4">
                  <legend className="px-2 font-bold text-purple-600">
                    Gift and Site Details
                  </legend>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <label className="flex flex-col">
                      Cacke/Plum??
                      <select
                        name="gift1"
                        className="form-input mt-1 rounded border-gray-300"
                        value={member.gift1 || ""}
                        onChange={(e) =>
                          setMember((prev) => ({
                            ...prev,
                            gift1: e.target.value,
                          }))
                        }
                        disabled={shouldDisable(currentUser.rights, "gift1")}
                      >
                        <option></option>
                        <option>Cacke</option>
                        <option>Plum</option>
                      </select>
                    </label>
                    <label className="flex flex-col">
                      Liquid
                      <select
                        name="gift2"
                        className="form-input mt-1 rounded border-gray-300"
                        value={member.gift2 || ""}
                        onChange={(e) =>
                          setMember((prev) => ({
                            ...prev,
                            gift2: e.target.value,
                          }))
                        }
                        disabled={shouldDisable(currentUser.rights, "gift2")}
                      >
                        <option></option>
                        <option value="scotch">Scotch</option>
                        <option value="vodka">Vodka</option>
                        <option value="wine">Wine</option>
                        <option value="whisky">Whisky</option>
                      </select>
                    </label>
                    <label className="flex flex-col">
                      Gifts
                      <select
                        name="gift3"
                        value={member.gift3 || ""}
                        className="form-input mt-1 rounded border-gray-300"
                        onChange={(e) =>
                          setMember((prev) => ({
                            ...prev,
                            gift3: e.target.value,
                          }))
                        }
                        disabled={shouldDisable(currentUser.rights, "gift3")}
                      >
                        <option></option>
                        <option>Article 1</option>
                        <option>Article 2</option>
                      </select>
                    </label>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="giftGiven"
                        className="form-checkbox"
                        checked={member.giftGiven}
                        onChange={handleChange}
                        disabled={shouldDisable(
                          currentUser.rights,
                          "giftGiven"
                        )}
                      />
                      Gift Given
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="recived"
                        className="form-checkbox"
                        checked={member.recived}
                        onChange={handleChange}
                        disabled={shouldDisable(currentUser.rights, "recived")}
                      />
                      Received
                    </label>
                  </div>
                </fieldset>

                {/* Company Information */}
                <fieldset className="border rounded-md p-4">
                  <legend className="px-2 font-bold text-purple-600">
                    Company Information
                  </legend>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <label className="flex flex-col">
                      Company
                      <input
                        type="text"
                        name="company"
                        placeholder="Enter company name"
                        className="form-input mt-1 rounded border-gray-300"
                        value={member.company}
                        onChange={handleChange}
                        disabled={shouldDisable(currentUser.rights, "company")}
                      />
                    </label>
                    <label className="flex flex-col">
                      Additionl info
                      <input
                        type="text"
                        name="info"
                        placeholder="Info..."
                        className="form-input mt-1 rounded border-gray-300"
                        value={member.info}
                        onChange={handleChange}
                        required
                        disabled={shouldDisable(currentUser.rights, "info")}
                      />
                    </label>
                  </div>
                </fieldset>
                {/* Submit Button */}

                <div className="mt-4 flex justify-center gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full max-w-xs rounded bg-purple-600 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" />
                        <span className="pl-3">Loading...</span>
                      </>
                    ) : toUpdate ? (
                      "Update"
                    ) : (
                      "Submit"
                    )}
                  </button>
                  <button
                    disabled={loading}
                    className="w-full max-w-xs rounded bg-purple-600 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
      {!open && (
        <div className="mt-4 flex justify-center">
          <button
            className="w-full max-w-xs rounded bg-purple-600 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
            onClick={() => setOpen(!open)}
          >
            Add
          </button>
        </div>
      )}
      {/* Table Section */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          open ? "translate-y-[calc(60vh+1rem)]" : "translate-y-0"
        }`}
      >
        <ExcelTable members={demoMembers} fn={setMemberToEdit} />
      </div>
    </>
  );
}
