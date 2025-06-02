// app/dashboard/page.tsx (o donde uses este layout)

import LayoutDashboard from './layout'; // Ajusta la ruta si es necesario

export default function DashboardPage() {
  const mainContent = (
    <div className="p-4">
      <h1 className="text-xl font-bold">Bienvenido al Dashboard</h1>
      <p>Aquí va el contenido principal del dashboard.</p>
    </div>
  );

  const locationsContent = (
    <aside className="ml-4 p-4 bg-white rounded shadow">
      <h2 className="font-semibold mb-2">Ubicaciones</h2>
      <ul className="list-disc list-inside">
        <li>Ubicación 1</li>
        <li>Ubicación 2</li>
        <li>Ubicación 3</li>
      </ul>
    </aside>
  );

  return (
    <LayoutDashboard locations={locationsContent}>
      {mainContent}
    </LayoutDashboard>
  );
}
