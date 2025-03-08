import { ReactNode } from "react";

interface PopUpScreenProps {
  children: ReactNode;
}

const PopUpScreen: React.FC<PopUpScreenProps> = ({ children }) => {
  return (
    <div className="fixed -inset-24 flex justify-center items-center bg-black bg-opacity-50 z-50">
      {children}
    </div>
  );
};

export default PopUpScreen;
