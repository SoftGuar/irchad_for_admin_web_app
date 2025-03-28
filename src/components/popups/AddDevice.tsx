
import { useState } from "react";
import { X, Upload } from "lucide-react";

interface AddDeviceProps {
  closePopup: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AddDevice: React.FC<AddDeviceProps> = ({ closePopup }) => {
  const formatDate = (date: Date) => date.toISOString().split(".")[0] + "Z"; // Remove milliseconds

  const [formData, setFormData] = useState({
    type: "",
    MAC: "",
    state: "",
    start_date: formatDate(new Date()),
    end_date: formatDate(new Date()),
    initial_state: "",
    product_id: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "product_id" ? Number(value) : value, // Convert product_id to number
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, user may not be authenticated.");
        return;
      }

      const formattedData = {
        ...formData,
        MAC: formData.MAC.replace(/-/g, ":"), // Ensure correct MAC format
      };

      console.log("Sending data:", JSON.stringify(formattedData, null, 2));

      const response = await fetch(`${API_URL}/admin/dispositive/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error(`Failed to add device. Status: ${response.status}`);
      }

      console.log("Device added successfully");
      closePopup();
    } catch (error) {
      console.error("Error adding device:", error);
    }
  };

  return (
    <div className="flex flex-col relative bg-irchad-gray-dark shadow-xl py-8 px-10 rounded-2xl space-y-4 w-1/3">
      <div className="absolute top-4 right-4">
        <X className="cursor-pointer text-red-700" onClick={closePopup} />
      </div>

      <p className="text-xl text-irchad-white font-roboto-bold">Add Device</p>

      {["type", "MAC", "state", "initial_state", "product_id"].map((field) => (
        <div key={field} className="flex flex-col space-y-1 w-full">
          <p className="text-sm text-irchad-gray-light font-roboto capitalize">{field.replace("_", " ")}</p>
          <input
            type={field === "product_id" ? "number" : "text"}
            name={field}
            value={formData[field as keyof typeof formData]}
            onChange={handleChange}
            className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-3 text-sm text-irchad-gray-light font-roboto"
          />
        </div>
      ))}

      <div className="flex flex-col space-y-2 w-full">
        <p className="text-sm text-irchad-gray-light font-roboto">Image</p>
        <label className="relative w-full cursor-pointer">
          <input type="file" className="hidden" />
          <div className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-3 text-sm text-irchad-gray-light font-roboto w-full flex items-center justify-end">
            <Upload className="text-irchad-gray-light" size={20} />
          </div>
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-irchad-orange text-irchad-gray-dark w-full px-4 py-3 mt-3 rounded-lg outline-none"
      >
        Add Device
      </button>
    </div>
  );
};

export default AddDevice;
