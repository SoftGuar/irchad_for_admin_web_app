"use client";
import Sidebar from '../../components/shared/sidebar/sidebar';
import Navbar from '../../components/shared/navbar/navbar';
import Footer from '../../components/shared/footer/footer';
import { useRouter } from "next/navigation";

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

    return (
        <>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-6 bg-gray-100">{children}</main>
            </div>
            <Footer />
        </>
    )
}
