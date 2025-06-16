"use client";
import Sidebar from '../../components/shared/sidebar/sidebar';
import Navbar from '../../components/shared/navbar/navbar';
import Footer from '../../components/shared/footer/footer';
import { useRouter } from "next/navigation";
import { NotificationsProvider } from '@/utils/notificationsContext';
import { useState, useEffect } from "react";
import { getProfile } from "@/services/UserManagementService";
import { ReloadProvider } from '@/utils/ReloadContext';

export default function Layout({ 
    children 
} : {
    children: React.ReactNode;
}) {

    const router = useRouter();

    const goToProfile = () => {
        router.push(``);
      };

      const goToNotification = () => {
        router.push(``);
      };
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
        <>
        <ReloadProvider>
            <NotificationsProvider userId={`${user.id}`}>
                <Navbar />
                <div className="flex">
                    <Sidebar />
                    <main className="flex-1 bg-irchad-gray-dark">{children}</main>
                </div>
                <Footer />
            </NotificationsProvider>
          </ReloadProvider>
        </>
    )
}