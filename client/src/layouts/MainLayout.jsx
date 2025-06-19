import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () => (
  <>
    <Sidebar />
    <nav></nav>
    <main>
      <Outlet />
    </main>
  </>
);

export default MainLayout;
