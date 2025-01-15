/* eslint-disable react/prop-types */
export default function PageHeader({ tab }) {
  if (tab === "selection") {
    return (
      <div className="w-full">
        <h1 className="text-center font-semibold text-2xl font-serif border-b-4 border-white py-1 my-4">
          Member Selection Management
        </h1>
      </div>
    );
  } else if (tab === "members") {
    return (
      <div className="w-full">
        <h1 className="text-center font-semibold text-2xl font-serif border-b-4 border-white py-1 my-4">
          Members Management
        </h1>
      </div>
    );
  } else if (tab === "archive") {
    return (
      <div className="w-full">
        <h1 className="text-center font-semibold text-2xl font-serif border-b-4 border-white py-1 my-4">
          Archived Members
        </h1>
      </div>
    );
  } else if (tab === "delivery") {
    return (
      <div className="w-full">
        <h1 className="text-center font-semibold text-2xl font-serif border-b-4 border-white py-1 my-4">
          Delivery Management
        </h1>
      </div>
    );
  } else if (tab === "reports") {
    return (
      <div className="w-full">
        <h1 className="text-center font-semibold text-2xl font-serif border-b-4 border-white py-1 my-4">
          Reports
        </h1>
      </div>
    );
  } else if (tab === "users") {
    return (
      <div className="w-full">
        <h1 className="text-center font-semibold text-2xl font-serif border-b-4 border-white py-1 my-4">
          Users Management
        </h1>
      </div>
    );
  } else {
    return <div>PageHeader</div>;
  }
}
