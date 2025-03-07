"use client"; // Ensure this is a Client Component (if needed)

const Footer = () => {
  return (
    <footer className="bg-[ #2E2E2E] text-white py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Section - Privacy Policy & Terms of Use */}
        <div className="flex space-x-4">
          <p className="text-sm text-gray-400 cursor-pointer hover:text-white">Privacy Policy</p>
          <span className="text-gray-500">|</span> {/* Separator */}
          <p className="text-sm text-gray-400 cursor-pointer hover:text-white">Terms of Use</p>
        </div>

        {/* Right Section - Copyright */}
        <div className="text-center md:text-right">
          <p className="text-sm text-gray-400">
            © 2025 SoftGuar , all right preserved
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
