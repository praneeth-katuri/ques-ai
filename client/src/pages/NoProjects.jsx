import { Plus } from "lucide-react";
import styles from "@/styles/pages/NoProject.module.css";
import illustration from "@/assets/images/no_projects.webp";
import CreateProjectModal from "@/components/projects/CreateProjectModal";
import ProjectHeader from "../components/ui/ProjectHeader";
import useModal from "@/hooks/useModal";

const NoProjects = () => {
  const { isModalOpen, setIsModalOpen, handleProjectCreated } = useModal();

  return (
    <div className={styles.wrapper}>
      <ProjectHeader />

      <main className={styles.main}>
        <h1 className={styles.title}>Create a New Project</h1>
        <img
          src={illustration}
          alt="Create project illustration"
          className={styles.illustration}
        />
        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia
          suscipit reiciendis nostrum amet ullam laboriosam maxime cum vitae
          quidem? Nostrum alias accusamus ullam ex fuga aliquid, maiores
          laudantium obcaecati similique.
        </p>
        <button
          className={styles.createButton}
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={20} />
          Create New Project
        </button>
      </main>

      {/* Modal */}
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleProjectCreated}
      />
    </div>
  );
};

export default NoProjects;
