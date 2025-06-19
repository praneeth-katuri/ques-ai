import styles from "@/styles/Input.module.css";
import clsx from "clsx";

const Input = ({ type, id, label, className = "" }) => {
  return (
    <div className={clsx(styles.field, className)}>
      <input type={type} id={id} placeholder="" />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Input;
