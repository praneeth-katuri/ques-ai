import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProjectStore } from "@/stores/projectStore";
import { updatePodcast } from "@/services/userService";
import toast from "react-hot-toast";

export const useEditPodcast = () => {
  const { projectId, podcastId } = useParams();
  const navigate = useNavigate();

  const podcast = useProjectStore((s) =>
    s.currentPodcasts.find((p) => p._id === podcastId)
  );

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");
  const [originalText, setOriginalText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (podcast) {
      const desc = podcast.description || "";
      setText(desc);
      setOriginalText(desc);
    }
  }, [podcast]);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setText(originalText);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await updatePodcast(podcastId, projectId, { description: text });
      setOriginalText(text);
      setIsEditing(false);
      toast.success("Podcast updated");
    } catch (err) {
      console.error("Failed to update podcast:", err);
      toast.error("Failed to update podcast");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => navigate(`/${projectId}`);

  return {
    podcast,
    text,
    isEditing,
    handleEdit,
    handleCancel,
    loading,
    handleSave,
    setText,
    goBack,
  };
};
