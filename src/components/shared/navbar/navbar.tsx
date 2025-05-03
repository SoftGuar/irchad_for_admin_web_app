import { MagnifyingGlassIcon, BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProfile } from "@/services/UserManagementService";

const Navbar = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null)
  const [user, setUser] = useState(
      {
        id: '',
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        joinedAt: '', 
        avatar: '',
        role: '',
      }
    )
    
    useEffect(() => {
      const getPersonalInfos = async () => {
        try {
          const response = await getProfile(); 
          if(response.success){
            const user = response.data;
            const userData = {
              id: user.id.toString(),
              userName: `${user.first_name} ${user.last_name}`.trim(),
              firstName: user.first_name,
              lastName: user.last_name,
              email: user.email,
              phone: user.phone,
              joinedAt: new Date().toISOString().split('T')[0], 
              avatar: "/images/ProfilePic.png",
              role: localStorage.getItem("role") || "admin",
              
            };
            setUser(userData); 
          }else {
            setError('Failed to get personal informations');
          }
  
        } catch (error) {
          setError('An error occurred while getting personal informations.');
          console.error("Failed to get personal informations:", error);
        } finally {
          setLoading(false);
        }
      };
  
      getPersonalInfos();
    }, []);

  return (
    <nav className="bg-[#2E2E2E] text-white py-3 px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2 text-xl font-bold text-white">
        <Image src="/images/logo.png" alt="IRCHAD" width={32} height={32} />
        <span>IRCHAD</span>
      </div>

      <div className="flex items-center bg-[#2E2E2E] px-3 py-2 rounded-md border border-irchad-orange/35">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 " />
        <input type="text" placeholder="Search..." className="bg-transparent text-white placeholder-gray-500 focus:outline-none px-2" />
      </div>

      {/* Notification & User Info */}
      <div className="flex items-center gap-4">
        <BellIcon onClick={()=> router.push('/notifications')} className="h-6 w-6 text-gray-400 cursor-pointer hover:text-white" />
        <div className="flex items-center gap-2">
          <UserCircleIcon onClick={()=> router.push('/profile')}  className="h-8 w-8 text-gray-400 cursor-pointer" />
          <div className="text-sm">
            <p className="font-semibold">{user.userName}</p>
            <p className="text-gray-400 text-xs">{user.role}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
