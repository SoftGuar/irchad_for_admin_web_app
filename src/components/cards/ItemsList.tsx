import { useState } from "react";
import ConfirmHelper from "../popups/ConfirmHelper";
import PopUpScreen from "../popups/popUpScreen";
interface ItemsListProps {
    title: string,
    items: { id: string; title: string; description: string; Status:string }[];
    onChange: () => void;
  }


const ItemsList: React.FC<ItemsListProps> = ({ title, items, onChange }) => {
    const [showPopup, setShowPopup] = useState<"confirm" | null>(null);
    const [IdToConfirm, setIdToConfirm] = useState<string | null>(null);
  
    
  
  
      const openConfirmHelperPopup = (id: string) => {
        setIdToConfirm(id);
        setShowPopup("confirm");
      };
  
      const closePopup = () => {
        setShowPopup(null);
        setIdToConfirm(null);
      };
  return (
    <div className="bg-[#2E2E2E] p-6 rounded-lg shadow-md mx-6 my-6">
      <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
      <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="bg-[#464646] p-4 rounded-md flex justify-between items-center">
          <div>
            <h3 className="text-white font-semibold">{item.title}</h3>
            <p className="text-white text-sm">{item.description}</p>
          </div>

          {title === "Emergency Contacts" && item.Status === "pending" && (
            <button
              className="bg-irchad-orange text-white px-4 py-2 rounded-md text-sm hover:bg-opacity-80"
              onClick={()=> openConfirmHelperPopup(item.id)}
            >
              Confirm
            </button>
          )}
        </div>
      ))}
    </div>
    {showPopup && (
        <PopUpScreen>
          {showPopup === "confirm" && IdToConfirm && <ConfirmHelper  id={IdToConfirm}  closePopup={closePopup} onChange={onChange}/>}
        </PopUpScreen>
      )}
    </div>
  );
};

export default ItemsList;