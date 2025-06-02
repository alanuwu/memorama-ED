'use client';
import { usePathname } from "next/navigation";
import Header from "./_components/Header";



export default function LayoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();

  return (
    <div className="bg-orange-50 min-h-screen flex flex-col justify-between">

    <Header />
      <main className="flex-grow">
        {children}
        {path === "/game"}
      </main>
    </div>
  );
}
