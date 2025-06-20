import { useState } from "react";
import { addProject } from "@/services/userService";
import toast from "react-hot-toast";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectCreated = async (projectData) => {
    try {
      await addProject(projectData);
      toast.success("Project created");
    } catch (err) {
      console.error("Error:", err.message);
      toast.error("Failed to add project");
    } finally {
      setIsModalOpen(false);
    }
  };

  return {
    isModalOpen,
    setIsModalOpen,
    handleProjectCreated,
  };
};

export default useModal;
