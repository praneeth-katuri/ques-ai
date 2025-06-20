import styles from "@/styles/pages/NoProject.module.css";
import QuesLogo from "@/assets/icons/sidebar_logo.png";
import { Settings, Bell } from "lucide-react";

const ProjectHeader = () => (
  <header className={styles.header}>
    <span className={styles.logo}>
      <img src={QuesLogo} alt="Logo" />
    </span>
    <div className={styles.actions}>
      <button className={styles.iconButton}>
        <Settings size={32} strokeWidth={1.8} />
      </button>
      <button className={styles.iconButton}>
        <Bell size={32} strokeWidth={1.8} />
      </button>
    </div>
  </header>
);

export default ProjectHeader;
