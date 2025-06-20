import { useState, useEffect } from "react";

export const useAddPodcastModal = ({ isOpen, handleSubmit }) => {
  const [name, setName] = useState("");
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setTranscript("");
    }
  }, [isOpen]);

  const onUpload = () => {
    handleSubmit({
      name: name.trim(),
      description: transcript.trim(),
    });
  };

  return {
    name,
    setName,
    transcript,
    setTranscript,
    onUpload,
  };
};
