import styles from "@/styles/LoginPage.module.css";
import Loginwave from "../assets/images/loginWave.avif";
import SmallLogo from "../assets/icons/logo_small.png";
import QuesLogo from "../assets/icons/QuesLogo.avif";
import Input from "../components/ui/Input";

function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      <div>
        <img src={Loginwave} alt="Purple gradient background" />
        <div className={styles.overlay}>
          <img src={QuesLogo} alt="Medium Logo" />
          <h1>
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
        <div className="text-center">
          <img src={SmallLogo} alt="Logo Small" />
          <h2>
            Welcome to <br />
            <span>Ques.AI</span>
          </h2>
        </div>
        <form>
          <Input type="text" id="name" label="username" />
          <Input type="password" id="password" label="password" />
          <button className={styles.submitBtn}>Login</button>
        </form>
        <p>
          Don't have an account? <a href="#">Create Account</a>
        </p>
      </div>
    </div>
  );
}
export default LoginPage;
