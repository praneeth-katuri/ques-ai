import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProjectStore } from "@/stores/projectStore";
import { updatePodcast } from "@/services/userService";

export const useEditPodcast = () => {
  const { projectId, podcastId } = useParams();
  const navigate = useNavigate();

  const podcast = useProjectStore((s) =>
    s.currentPodcasts.find((p) => p._id === podcastId)
  );

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");
  const [originalText, setOriginalText] = useState("");

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
      await updatePodcast(podcastId, projectId, { description: text });
      setOriginalText(text);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update podcast:", err);
    }
  };

  const goBack = () => navigate(`/${projectId}`);

  return {
    podcast,
    text,
    isEditing,
    handleEdit,
    handleCancel,
    handleSave,
    setText,
    goBack,
  };
};
