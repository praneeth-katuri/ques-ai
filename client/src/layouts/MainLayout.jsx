import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Breadcrumb from "../components/layout/Breadcrumb";
import { Bell, LogOut } from "lucide-react";
import styles from "@/styles/layout/MainLayout.module.css";
import { useMainLayout } from "@/hooks/useMainLayout";

const MainLayout = () => {
  const {
    projectId,
    projectName,
    sectionLabel,
    setSectionLabel,
    handleLogout,
  } = useMainLayout();

  return (
    <div className={styles.container}>
      <Sidebar projectId={projectId} setSectionLabel={setSectionLabel} />
      <div className={styles.content}>
        <header className={styles.header}>
          <Breadcrumb projectName={projectName} sectionLabel={sectionLabel} />
          <div className={styles.actions}>
            <Bell className={styles.icon} />
            <LogOut
              onClick={handleLogout}
              className={`${styles.icon} ${styles.iconExit}`}
            />
          </div>
        </header>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
