import React, { useState } from "react";
import { X } from "lucide-react";
import { deviceApi } from "@/services/deviceApi"; // adjust based on your project structure

interface AddDeviceProps {
  closePopup: () => void;
}

const AddDevice: React.FC<AddDeviceProps> = ({ closePopup }) => {
  const [formData, setFormData] = useState({
    type: "",
    MAC: "",
    state: "",
    initial_state: "",
    product_id: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formattedData = {
        type: formData.type,
        MAC: formData.MAC.replace(/-/g, ":"),
        state: formData.state,
        initial_state: formData.initial_state,
        product_id: formData.product_id,
        start_date: new Date(),
        end_date: new Date(),
      };

      console.log("Sending data:", JSON.stringify(formattedData, null, 2));
      await deviceApi.create(formattedData);

      setSuccess(true);
      setTimeout(closePopup, 1500);
    } catch (error) {
      setError((error as Error).message || "Failed to add device.");
    } finally {
      setLoading(false);
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
          <p className="text-sm text-irchad-gray-light font-roboto capitalize">
            {field.replace("_", " ")}
          </p>
          <input
            type={field === "product_id" ? "number" : "text"}
            value={formData[field as keyof typeof formData]}
            onChange={(e) => handleChange(field, field === "product_id" ? +e.target.value : e.target.value)}
            className="bg-irchad-gray-light text-irchad-white p-2 rounded-md outline-none"
          />
        </div>
      ))}

      <div className="flex flex-col space-y-2 w-full">
        <p className="text-sm text-irchad-gray-light font-roboto">Image</p>
        <label className="relative w-full cursor-pointer">
          <div className="border border-dashed border-gray-400 rounded-md p-4 text-center text-gray-400">
            (Image upload placeholder)
          </div>
        </label>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">Device added successfully!</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-irchad-orange text-irchad-gray-dark w-full px-4 py-3 mt-3 rounded-lg outline-none"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

export default AddDevice;
