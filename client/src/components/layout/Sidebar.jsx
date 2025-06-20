import { NavLink } from "react-router-dom";
import { User } from "lucide-react";
import styles from "@/styles/layout/Sidebar.module.css";
import QuesLogo from "@/assets/icons/sidebar_logo.png";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";
import { navItems } from "@/data/navItems";

const Sidebar = ({ projectId, setSectionLabel }) => {
  const { name, email } = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  return (
    <aside className={styles.sidebar}>
      <div>
        <img src={QuesLogo} className={styles.logo} alt="Ques Logo" />
        <nav className={styles.nav}>
          <ul>
            {navItems.map(({ to, label, Icon }) => (
              <li key={to} className={styles.navItem}>
                <NavLink
                  to={`/${projectId}${to ? `${to}` : ""}`}
                  end
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navLink} ${styles.active}`
                      : styles.navLink
                  }
                  onClick={() => setSectionLabel(label)}
                >
                  <Icon className={styles.icon} />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.userBox} onClick={() => navigate("user/edit")}>
        <User className={styles.avatarIcon} />
        <div>
          <div className={styles.username}>{name}</div>
          <div className={styles.email}>{email}</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
