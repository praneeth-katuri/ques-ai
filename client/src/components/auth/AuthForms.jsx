import styles from "@/styles/auth/AuthForms.module.css";
import { Link } from "react-router-dom";
import ErrorElement from "@/components/ui/ErrorElement";
import { useLoginForm } from "@/hooks/useLoginForm";
import { useRegisterForm } from "@/hooks/useRegisterForm";

export const LoginForm = () => {
  const { register, handleSubmit, errors } = useLoginForm();

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div
          className={`${styles.field} ${
            errors.email ? styles.inputErrorMargin : ""
          }`}
        >
          <input type="text" id="email" placeholder="" {...register("email")} />
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
  const { register, handleSubmit, errors } = useRegisterForm();

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div
          className={`${styles.field} ${
            errors.name ? styles.inputErrorMargin : ""
          }`}
        >
          <input type="text" id="name" placeholder="" {...register("name")} />
          <label htmlFor="name">Username</label>
        </div>
        {errors.name && <ErrorElement>{errors.name.message}</ErrorElement>}

        <div
          className={`${styles.field} ${
            errors.email ? styles.inputErrorMargin : ""
          }`}
        >
          <input type="text" id="email" placeholder="" {...register("email")} />
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
