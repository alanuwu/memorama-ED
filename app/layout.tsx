'use client';
import { usePathname } from "next/navigation";
import Header from "./game/_components/Header";


export default function LayoutDashboard ({children
}: Readonly<{
  children: React.ReactNode;
  locations : React.ReactNode;
}>) {
    const path = usePathname();
    return (
        <div className="bg-orange-50">
            <Header/>
            <div className=" flex flex-row items-center">
            {children}
            {path === "/game"}
            </div>
        </div>
    )
}