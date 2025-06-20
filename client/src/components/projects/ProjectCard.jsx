import styles from "@/styles/project/ProjectCard.module.css";

const ProjectCard = ({
  title,
  podcastCount,
  lastEdited,
  bgColor = "#F59E0B",
}) => {
  const getInitials = (title) =>
    title
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() || "")
      .join("");

  const initials = getInitials(title);

  return (
    <div className={styles.card}>
      <div className={styles.icon} style={{ backgroundColor: bgColor }}>
        {initials}
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.files}>{podcastCount} Episodes</div>
        <div className={styles.edited}>Last edited {lastEdited}</div>
      </div>
    </div>
  );
};

export default ProjectCard;
