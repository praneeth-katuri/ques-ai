import { ArrowLeft, User } from "lucide-react";
import styles from "@/styles/auth/AccountSettings.module.css";
import Spinner from "../ui/Spinner";
import { useAccountSettings } from "@/hooks/useAccountSettings";

const AccountSettings = () => {
  const { email, username, setName, loading, navigate, handleSubmit } =
    useAccountSettings();

  if (loading) return <Spinner />;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ArrowLeft
          onClick={() => navigate("/projects")}
          className={styles.backIcon}
        />
        <h1 className={styles.title}>Account Settings</h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.avatarIcon}>
          <User size={64} />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>User Name</label>
          <input
            value={username}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit(e);
            }}
            className={styles.input}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Email</label>
          <input value={email} disabled readOnly className={styles.input} />
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
