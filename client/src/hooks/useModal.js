import { useState } from "react";
import { addProject } from "@/services/userService";
import toast from "react-hot-toast";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleProjectCreated = async (projectData) => {
    try {
      setLoading(true);
      await addProject(projectData);
      toast.success("Project created");
    } catch (err) {
      console.error("Error:", err.message);
      toast.error("Failed to add project");
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  return {
    isModalOpen,
    loading,
    setIsModalOpen,
    handleProjectCreated,
  };
};

export default useModal;
