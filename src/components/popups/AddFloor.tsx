import { X } from "lucide-react";
import { useState } from "react";

interface AddFloorProps {
  closePopup: () => void;
  environmentId: string;
}

const AddFloor: React.FC<AddFloorProps> = ({ closePopup, environmentId }) => {
  const [formData, setFormData] = useState({
    name: "",
    level: 1,
    description: "",
    width: 0,
    height: 0,
    building: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const body = {
        ...formData,
        environment_id: environmentId,
        grid_data: [],
        coordinates: "{}",
        grid_dimensions: [0, 0],
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_CARTOGRAPHIE_SERVICE}/floors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        console.log("Floor added successfully");
        closePopup();
      } else {
        console.error("Failed to add floor");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold text-black">Add Floor</h2>

        <div className="flex flex-col space-y-2 w-full">
          <p className="text-[16px] text-gray-700">Name</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 text-black"
          />
        </div>

        <div className="flex flex-col space-y-2 w-full mt-4">
          <p className="text-[16px] text-gray-700">Level</p>
          <input
            type="number"
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 text-black"
          />
        </div>

        <div className="flex flex-col space-y-2 w-full mt-4">
          <p className="text-[16px] text-gray-700">Description</p>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 text-black"
          />
        </div>

        <div className="flex flex-col space-y-2 w-full mt-4">
          <p className="text-[16px] text-gray-700">Width</p>
          <input
            type="number"
            name="width"
            value={formData.width}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 text-black"
          />
        </div>

        <div className="flex flex-col space-y-2 w-full mt-4">
          <p className="text-[16px] text-gray-700 text-black">Height</p>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 text-black"
          />
        </div>

        <div className="flex flex-col space-y-2 w-full mt-4">
          <p className="text-[16px] text-gray-700">Building</p>
          <input
            type="text"
            name="building"
            value={formData.building}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 text-black"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Submit
        </button>
        <button
          onClick={closePopup}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddFloor;