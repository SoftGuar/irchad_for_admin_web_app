"use client";
import { useState, useRef, useEffect } from "react";
import { Pen, Save } from "lucide-react";
import { Environment } from "@/types/environment";

interface Props {
  data: Environment;
}

const EnvironmentInfo: React.FC<Props> = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Environment>({ ...data });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (field: keyof Environment, value: string) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saved Data:", editedData);
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = "auto"; 
      textarea.style.height = `${Math.min(textarea.scrollHeight, 10 * 24)}px`; 
    }
  }, [isEditing, editedData.description]);

  return (
    <div className="flex flex-col w-full bg-irchad-gray p-5 rounded-md space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold text-irchad-gray-light">Environment Info</p>
        {isEditing ? (
          <button
            onClick={handleSave}
            className="flex items-center text-irchad-gray-light hover:text-white transition-colors"
          >
            <Save className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center text-irchad-gray-light hover:text-white transition-colors"
          >
            <Pen className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-y-5 text-white">
        <p className="font-semibold">Name</p>
        {isEditing ? (
          <input
            type="text"
            value={editedData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="bg-transparent border-b border-irchad-gray-light"
          />
        ) : (
          <p>{data.name}</p>
        )}

        <p className="font-semibold">Address</p>
        {isEditing ? (
          <input
            type="text"
            value={editedData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className="bg-transparent border-b border-irchad-gray-light"
          />
        ) : (
          <p>{data.address}</p>
        )}

        <p className="font-semibold">Type</p>
        {isEditing ? (
          <input
            type="text"
            value={editedData.type}
            onChange={(e) => handleInputChange("type", e.target.value)}
            className="bg-transparent border-b border-irchad-gray-light"
          />
        ) : (
          <p>{data.type}</p>
        )}

        <p className="font-semibold">Activation Date</p>
        {isEditing ? (
          <input
            type="text"
            value={editedData.addingDate}
            onChange={(e) => handleInputChange("addingDate", e.target.value)}
            className="bg-transparent border-b border-irchad-gray-light"
          />
        ) : (
          <p>{data.addingDate}</p>
        )}

        <p className="font-semibold">Layers</p>
        {isEditing ? (
          <input
            type="text"
            value={editedData.layers}
            onChange={(e) => handleInputChange("layers", e.target.value)}
            className="bg-transparent border-b border-irchad-gray-light"
          />
        ) : (
          <p>{data.layers}</p>
        )}

        <p className="font-semibold">Description</p>
        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={editedData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="bg-transparent border-b border-irchad-gray-light resize-none overflow-y-hidden"
            rows={1}
            style={{ minHeight: "24px", maxHeight: "192px" }}
          />
        ) : (
          <p>{data.description}</p>
        )}
      </div>
    </div>
  );
};

export default EnvironmentInfo;