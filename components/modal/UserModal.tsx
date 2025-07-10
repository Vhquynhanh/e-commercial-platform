import React, { useEffect, useState } from "react";
import Avatar from "../ui/Avatar";
import EditUserModal from "./EditModal";
interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CreateCustomer {
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"info" | "history">("info");
  const [user, setUser] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [ordersData, setOrdersData] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [editData, setEditData] = useState<CreateCustomer>({
    fullName: "",
    phoneNumber: "",
    email: "",
    address: ""
  });

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setUser(parsedData);
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (user && user._id && ordersData.length > 0) {
      console.log(user._id);
      const filtered = ordersData.filter(
        (order) => order.customer._id === user._id
      );
      setFilteredOrders(filtered);
      console.log(filtered);
    }
  }, [user, ordersData]);

  const handleEditClick = () => {
    setEditData({
      fullName: user?.fullName || "",
      phoneNumber: user?.phoneNumber || "",
      email: user?.email || "",
      address: user?.address || ""
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!user?._id) return;

    try {
      // const updatedUser = await updateInfoCustomer(user._id, editData);
      // setUser(updatedUser);
      // localStorage.setItem("userData", JSON.stringify(updatedUser));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed background-light800_dark400 text-dark100_light500 top-0 right-0 w-1/3 h-full bg-white shadow-lg z-50 flex flex-col items-center p-5">
      <button
        className="absolute top-5 right-5 text-xl font-bold "
        onClick={onClose}
      >
        ✕
      </button>
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-8 py-2 ${
            activeTab === "info"
              ? "border-primary-100 border-b-2"
              : " text-dark100_light500"
          }`}
          onClick={() => setActiveTab("info")}
        >
          User Information
        </button>
        <button
          className={`px-8 py-2 ${
            activeTab === "history"
              ? "border-primary-100 border-b-2"
              : " text-dark100_light500"
          }`}
          onClick={() => setActiveTab("history")}
        >
          Purchase History
        </button>
      </div>

      <Avatar user={user} setProfileUser={setUser} />
      <h2 className="text-2xl font-semibold mb-4">{user?.fullName}</h2>

      <button
        onClick={handleEditClick}
        className="bg-primary-100 text-white px-4 py-2 rounded mb-4"
      >
        Edit Info
      </button>

      {/* Info Tab */}
      {activeTab === "info" && (
        <div className="w-full pl-5">
          <p className="mt-3">
            <strong className="text-gray-400">Phone:</strong>{" "}
            {user?.phoneNumber}
          </p>
          <p className="mt-3">
            <strong className="text-gray-400">Email:</strong> {user?.email}
          </p>
          <p className="mt-3">
            <strong className="text-gray-400">Address:</strong> {user?.address}
          </p>
        </div>
      )}

      {activeTab === "history" && (
        <div className="w-full pl-5 overflow-y-auto h-96">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order._id} className="p-4 mb-4  rounded-lg shadow-md">
                <h3 className="text-lg font-semibold ">
                  Order ID: {order._id}
                </h3>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <p>
                  <strong>Cost:</strong> {order.cost.toLocaleString()}
                </p>
                <p>
                  <strong>Discount:</strong> {order.discount}
                </p>
                <p>
                  <strong>Shipping Method:</strong> {order.shippingMethod}
                </p>
                <p>
                  <strong>ETD:</strong>{" "}
                  {new Date(order.ETD).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No purchase history found.</p>
          )}
        </div>
      )}

      {isEditModalOpen && (
        <EditUserModal
          editData={editData}
          setEditData={setEditData}
          setIsEditModalOpen={setIsEditModalOpen}
          handleSaveEdit={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default UserModal;
