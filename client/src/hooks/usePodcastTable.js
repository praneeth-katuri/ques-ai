import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useProjectStore } from "@/stores/projectStore";
import { deletePodcast as deletePodcastService } from "@/services/userService";
import { useState } from "react";

export const usePodcastTable = () => {
  const podcasts = useProjectStore((s) => s.currentPodcasts);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { projectId } = useParams();

  const handleView = (podcastId) => {
    navigate(`/${projectId}/${podcastId}`);
  };

  const handleDelete = async (podcastId) => {
    try {
      setLoading(true);
      await deletePodcastService(projectId, podcastId);
      toast.success("Podcast Deleted");
    } catch (error) {
      console.error("Failed to delete podcast:", error);
      toast.error("Something went wrong, Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (isoDate) => {
    const date = new Date(isoDate);
    return date
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(",", " | ");
  };

  return {
    podcasts,
    handleView,
    loading,
    handleDelete,
    formatDateTime,
  };
};
