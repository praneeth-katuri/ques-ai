import { Home } from "lucide-react";
import styles from "@/styles/layout/Breadcrumb.module.css";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";

const Breadcrumb = ({ sectionLabel }) => {
  const { projectName, goHome } = useBreadcrumb();

  return (
    <nav className={styles.breadcrumb}>
      <span className={`${styles.link} ${styles.home}`} onClick={goHome}>
        <Home className={styles.homeIcon} />
        Home
      </span>
      {projectName && (
        <>
          <span className={styles.separator}>/</span>
          <span className={`${styles.link} ${styles.nopointer}`}>
            {projectName}
          </span>
        </>
      )}
      {sectionLabel && (
        <>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>{sectionLabel}</span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumb;
