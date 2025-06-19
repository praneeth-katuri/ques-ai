import styles from "@/styles/AuthForms.module.css";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, registerSchema } from "@/schemas/authSchema";
import ErrorElement from "./ErrorElement";
import { login, signup } from "../../services/loginService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      reset();
      navigate("/projects");
      toast.success("Logged In Successfully");
    } catch (err) {
      console.log("Error Logging in", err.message);
      toast.error("Login failed!!");
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`${styles.field} ${
            errors.email ? styles.inputErrorMargin : ""
          }`}
        >
          <input
            type="text"
            id="email"
            placeholder=""
            {...register("email")}
            onChange={() => clearErrors("email")}
          />
          <label htmlFor="email">E-mail</label>
        </div>
        {errors.email && <ErrorElement>{errors.email.message}</ErrorElement>}

        <div
          className={`${styles.field} ${
            errors.password ? styles.inputErrorMargin : ""
          }`}
        >
          <input
            type="password"
            id="password"
            placeholder=""
            {...register("password")}
            onChange={() => clearErrors("password")}
          />
          <label htmlFor="password">Password</label>
        </div>
        {errors.password && (
          <ErrorElement>{errors.password.message}</ErrorElement>
        )}

        <button className={styles.submitBtn} type="submit">
          Login
        </button>
      </form>

      <p>
        Don&apos;t have an account? <Link to="/register">Create Account</Link>
      </p>
    </>
  );
};

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    try {
      await signup(data.name, data.email, data.password, data.confirmPassword);
      reset();
      toast.success("Registration Successful");
    } catch (err) {
      console.log("Registration error:", err.message);
      toast.error("Something went wrong!!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`${styles.field} ${
            errors.name ? styles.inputErrorMargin : ""
          }`}
        >
          <input
            type="text"
            id="name"
            placeholder=""
            {...register("name")}
            onChange={() => clearErrors("name")}
          />
          <label htmlFor="name">Username</label>
        </div>
        {errors.name && <ErrorElement>{errors.name.message}</ErrorElement>}

        <div
          className={`${styles.field} ${
            errors.email ? styles.inputErrorMargin : ""
          }`}
        >
          <input
            type="text"
            id="email"
            placeholder=""
            {...register("email")}
            onChange={() => clearErrors("email")}
          />
          <label htmlFor="email">E-mail</label>
        </div>
        {errors.email && <ErrorElement>{errors.email.message}</ErrorElement>}

        <div
          className={`${styles.field} ${
            errors.password ? styles.inputErrorMargin : ""
          }`}
        >
          <input
            type="password"
            id="password"
            placeholder=""
            {...register("password")}
            onChange={() => clearErrors("password")}
          />
          <label htmlFor="password">Password</label>
        </div>
        {errors.password && (
          <ErrorElement>{errors.password.message}</ErrorElement>
        )}

        <div
          className={`${styles.field} ${
            errors.confirmPassword ? styles.inputErrorMargin : ""
          }`}
        >
          <input
            type="password"
            id="confirmPassword"
            placeholder=""
            {...register("confirmPassword")}
            onChange={() => clearErrors("confirmPassword")}
          />
          <label htmlFor="confirmPassword">Confirm password</label>
        </div>
        {errors.confirmPassword && (
          <ErrorElement>{errors.confirmPassword.message}</ErrorElement>
        )}
        <button type="submit" className={styles.submitBtn}>
          Register
        </button>
      </form>

      <p className={styles.switch}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </>
  );
};
