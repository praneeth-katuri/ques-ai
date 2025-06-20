import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProjectStore } from "@/stores/projectStore";

export const useBreadcrumb = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const setSelectedProject = useProjectStore((s) => s.setSelectedProject);
  const getProjectNameById = useProjectStore((s) => s.getProjectNameById);

  useEffect(() => {
    if (projectId) {
      setSelectedProject(projectId);
    }
  }, [projectId, setSelectedProject]);

  const projectName = useMemo(
    () => getProjectNameById(projectId),
    [projectId, getProjectNameById]
  );

  const goHome = () => navigate("/projects");

  return {
    projectName,
    goHome,
    projectId,
  };
};
