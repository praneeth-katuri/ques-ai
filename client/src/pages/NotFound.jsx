import { Link } from "react-router-dom";
import NotFoundImage from "@/assets/images/404-illustration.svg";
import styles from "@/styles/pages/NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <img src={NotFoundImage} alt="404 Not Found" className={styles.image} />
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>
        Oops! The page you're looking for doesn’t exist.
      </p>
      <Link to="/" className={styles.link}>
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
