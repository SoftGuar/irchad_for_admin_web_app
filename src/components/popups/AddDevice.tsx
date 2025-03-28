import { useState } from "react";
import { X, Upload } from "lucide-react";
import { deviceApi } from "@/services/deviceApi";

interface AddDeviceProps {
  closePopup: () => void;
}

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "product_id" ? Number(value) : value, // Convertir `product_id` en nombre
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Format du MAC
      const formattedData = {
        ...formData,
        MAC: formData.MAC.replace(/-/g, ":"),
        name: formData.type, // Assuming 'type' can be used as 'name'
        status: formData.state, // Assuming 'state' can be used as 'status'
      };

      console.log("Sending data:", JSON.stringify(formattedData, null, 2));

      // Appel direct à deviceApi
      await deviceApi.create(formattedData);

      setSuccess(true);
      setTimeout(closePopup, 1500); // Ferme la pop-up après 1.5s
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

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">Device added successfully!</p>}

      <button
        onClick={handleSubmit}
        className="bg-irchad-orange text-irchad-gray-dark w-full px-4 py-3 mt-3 rounded-lg outline-none"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Device"}
      </button>
    </div>
  );
};

export default AddDevice;
