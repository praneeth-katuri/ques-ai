import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectHeader from "@/components/ui/ProjectHeader";
import CreateProjectModal from "@/components/projects/CreateProjectModal";
import NoProjects from "@/pages/NoProjects";
import styles from "@/styles/project/Projects.module.css";
import { useProjectsPage } from "@/hooks/useProjectsPage";

const Projects = () => {
  const {
    projects,
    projectsWithTime,
    isModalOpen,
    setIsModalOpen,
    handleProjectCreated,
  } = useProjectsPage();

  if (projects.length === 0) return <NoProjects />;

  return (
    <div className={styles.container}>
      <ProjectHeader />

      <div className={styles.projects}>
        <div className={styles.header}>
          <h2 className={styles.title}>Projects</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className={styles.createButton}
          >
            <Plus size={18} />
            Create New Project
          </button>
        </div>

        <CreateProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleProjectCreated}
        />

        <div className={styles.projectsGrid}>
          {projectsWithTime.map((proj) => (
            <Link
              to={`/${proj._id}`}
              key={proj._id}
              style={{ textDecoration: "none" }}
            >
              <ProjectCard {...proj} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
