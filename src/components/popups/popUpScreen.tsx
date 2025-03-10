import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface PopUpScreenProps {
  children: ReactNode;
}

const PopUpScreen: React.FC<PopUpScreenProps> = ({ children }) => {
  return createPortal(
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      {children}
    </div>,
    document.body
  );
};

export default PopUpScreen;
