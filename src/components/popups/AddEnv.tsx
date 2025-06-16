// import { X } from "lucide-react";
// import { env } from "process";
// import { useState } from "react";

// interface AddUserProps {
//   closePopup: () => void;
// }

// const AddEnv: React.FC<AddUserProps> = ({ closePopup }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     environment_id: "",
//     level: 1,
//     description: "",
//     width: 0,
//     height: 0,
//     coordinates: "",
//     grid_data: "",
//     grid_dimensions: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const body = {
//         ...formData,
//         environment_id: "env-123",//has to be changed later
//         grid_data: [],
//         coordinates: "{}",
//         grid_dimensions: [0,0],
//       };

//       const response = await fetch("http://localhost:8000/floors", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//       });

//       if (response.ok) {
//         console.log("Environment added successfully");
//         closePopup();
//       } else {
//         console.error("Failed to add environment");
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   return (
//     <div
//       className="flex flex-col relative bg-irchad-gray-dark shadow-xl py-[30px] px-[45px] rounded-[30px] w-1/3 max-h-[80vh] overflow-y-auto"
//     >
//       <div className="absolute top-10 right-10">
//         <X className="cursor-pointer text-red-700" onClick={closePopup} />
//       </div>

//       <p className="text-xl text-irchad-white font-roboto-bold">Add Environment</p>

//       <div className="flex flex-col space-y-2 w-full">
//         <p className="text-[16px] text-irchad-gray-light font-roboto">Name</p>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto"
//         />
//       </div>

//       <div className="flex flex-col space-y-2 w-full">
//         <p className="text-[16px] text-irchad-gray-light font-roboto">Level</p>
//         <input
//           type="number"
//           name="level"
//           value={formData.level}
//           onChange={handleChange}
//           className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto"
//         />
//       </div>

//       <div className="flex flex-col space-y-2 w-full">
//         <p className="text-[16px] text-irchad-gray-light font-roboto">Description</p>
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto"
//         />
//       </div>

//       <div className="flex flex-col space-y-2 w-full">
//         <p className="text-[16px] text-irchad-gray-light font-roboto">Width</p>
//         <input
//           type="number"
//           name="width"
//           value={formData.width}
//           onChange={handleChange}
//           className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto"
//         />
//       </div>

//       <div className="flex flex-col space-y-2 w-full">
//         <p className="text-[16px] text-irchad-gray-light font-roboto">Height</p>
//         <input
//           type="number"
//           name="height"
//           value={formData.height}
//           onChange={handleChange}
//           className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto"
//         />
//       </div>

//       <div className="flex flex-col space-y-2 w-full">
//         <p className="text-[16px] text-irchad-gray-light font-roboto">Coordinates (JSON format)</p>
//         <textarea
//           name="coordinates"
//           value={formData.coordinates}
//           onChange={handleChange}
//           className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto"
//         />
//       </div>

//       <div className="flex flex-col space-y-2 w-full">
//         <p className="text-[16px] text-irchad-gray-light font-roboto">Grid Data (JSON format)</p>
//         <textarea
//           name="grid_data"
//           value={formData.grid_data}
//           onChange={handleChange}
//           className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto"
//         />
//       </div>

//       <div className="flex flex-col space-y-2 w-full">
//         <p className="text-[16px] text-irchad-gray-light font-roboto">Grid Dimensions (JSON format)</p>
//         <textarea
//           name="grid_dimensions"
//           value={formData.grid_dimensions}
//           onChange={handleChange}
//           className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto"
//         />
//       </div>

//       <div className="flex w-full">
//         <button
//           onClick={handleSubmit}
//           className="bg-irchad-orange text-irchad-gray-dark w-full px-4 py-3 mt-3 rounded-lg outline-none"
//         >
//           Add Environment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddEnv;

import { X } from "lucide-react";
import { useState } from "react";

interface AddEnvProps {
  closePopup: () => void;
  onAdd: (newEnv: any) => void;
}

const AddEnv: React.FC<AddEnvProps> = ({ closePopup }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_CARTOGRAPHIE_SERVICE}/environments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Environment added successfully");
        closePopup();
      } else {
        console.error("Failed to add environment");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div
      className="flex flex-col relative bg-irchad-gray-dark shadow-xl py-[30px] px-[45px] rounded-[30px] w-1/3 max-h-[80vh] overflow-y-auto"
    >
      <div className="absolute top-10 right-10">
        <X className="cursor-pointer text-red-700" onClick={closePopup} />
      </div>

      <p className="text-xl text-irchad-white font-roboto-bold">Add Environment</p>

      <div className="flex flex-col space-y-2 w-full">
        <p className="text-[16px] text-irchad-gray-light font-roboto">Name</p>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto"
        />
      </div>

      <div className="flex flex-col space-y-2 w-full">
        <p className="text-[16px] text-irchad-gray-light font-roboto">Address</p>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="border border-irchad-gray-light bg-irchad-gray rounded-lg p-4 text-[16px] text-irchad-gray-light font-roboto"
        />
      </div>

      <div className="flex w-full">
        <button
          onClick={handleSubmit}
          className="bg-irchad-orange text-irchad-gray-dark w-full px-4 py-3 mt-3 rounded-lg outline-none"
        >
          Add Environment
        </button>
      </div>
    </div>
  );
};

export default AddEnv;