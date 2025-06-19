// components/FullPageLoader.jsx
import styles from "@/styles/Spinner.module.css"; // or use module CSS

const Spinner = () => {
  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Spinner;
