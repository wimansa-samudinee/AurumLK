import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div>
      <aside>Sidebar</aside>

      <main>
        <Outlet />
      </main>
    </div>
  );
}