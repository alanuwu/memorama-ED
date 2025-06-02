import LandingPage from "./_components/LandingPage";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      
      <div className="space-y-8">
        <LandingPage />
       
      </div>
      <main className="p-4">{children}</main>
    </>
  );
}
