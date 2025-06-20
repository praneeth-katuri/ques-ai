import { useState } from "react";
import toast from "react-hot-toast";
import { addPodcast } from "@/services/userService";
import { useProjectStore } from "@/stores/projectStore";

export const useAddPodcast = () => {
  const projectId = useProjectStore((s) => s.selectedProject);
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const openModal = (selectedSource, img) => {
    setSource(selectedSource);
    setImage(img);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSource(null);
    setImage(null);
  };

  const handleSubmit = async ({ name, description }) => {
    if (!name || !description) {
      toast.error("Both name and transcript are required");
      return;
    }

    try {
      setLoading(true);
      const podcast = { title: name, description };
      await addPodcast(podcast, projectId);
      toast.success("Podcast uploaded successfully");
      closeModal();
    } catch (err) {
      console.log("Podcast Upload Error", err.message);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    isOpen,
    openModal,
    closeModal,
    source,
    image,
    loading,
    handleSubmit,
  };
};
