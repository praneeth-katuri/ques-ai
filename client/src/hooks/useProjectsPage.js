import { useProjectStore } from "@/stores/projectStore";
import { formatDistanceToNow } from "date-fns";
import useModal from "@/hooks/useModal";

export const useProjectsPage = () => {
  const projects = useProjectStore((s) => s.projects);
  const { isModalOpen, setIsModalOpen, handleProjectCreated } = useModal();

  const projectsWithTime = projects.map((proj) => ({
    ...proj,
    lastEdited: formatDistanceToNow(new Date(proj.updatedAt), {
      addSuffix: true,
    }),
  }));

  return {
    projects,
    projectsWithTime,
    isModalOpen,
    setIsModalOpen,
    handleProjectCreated,
  };
};
