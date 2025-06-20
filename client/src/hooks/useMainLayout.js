import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjectStore } from "@/stores/projectStore";
import { getPodcasts } from "@/services/userService";
import { logout } from "@/services/loginService";

export const useMainLayout = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const getProjectNameById = useProjectStore((s) => s.getProjectNameById);

  const projectName = useMemo(
    () => getProjectNameById(projectId),
    [projectId, getProjectNameById]
  );

  const [sectionLabel, setSectionLabel] = useState("Add Podcast");

  useEffect(() => {
    const fetch = async () => {
      try {
        console.log("projectId from useParams:", projectId);
        await getPodcasts(projectId);
      } catch (err) {
        console.error("Failed to fetch podcasts:", err);
      }
    };

    if (projectId) fetch();
  }, [projectId]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return {
    projectId,
    projectName,
    sectionLabel,
    setSectionLabel,
    handleLogout,
  };
};
