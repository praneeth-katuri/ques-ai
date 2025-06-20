import styles from "@/styles/layout/AuthLayout.module.css";
import Loginwave from "@/assets/images/loginWave.avif";
import SmallLogo from "@/assets/icons/logo_small.png";
import QuesLogo from "@/assets/icons/QuesLogo.avif";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

function AuthLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (isAuthenticated) return <Navigate to="/projects" replace />;
  return (
    <div className={styles.loginContainer}>
      <div>
        <img src={Loginwave} alt="Purple gradient background" />
        <div className={styles.overlay}>
          <img src={QuesLogo} alt="Medium Logo" />
          <h1 className={styles.HeroText}>
            Your podcast <br />
            will no longer <br />
            be just a hobby
          </h1>
          <p>
            supercharge Your Distribution <br /> using our AI assistant!
          </p>
        </div>
      </div>
      <div className={`${styles.loginForm}`}>
        <div className={`${styles.welcome} text-center`}>
          <img src={SmallLogo} alt="Logo Small" />
          <h2>
            Welcome to <br />
            <span>Ques.AI</span>
          </h2>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
export default AuthLayout;
