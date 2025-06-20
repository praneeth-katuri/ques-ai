import { useState, useEffect } from "react";

export const useCreateProjectModal = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleCancel = () => {
    setError("");
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Project Name can't be empty");
      return;
    }
    onCreate({ title: name });
    setName("");
    setError("");
  };

  return {
    name,
    error,
    handleChange,
    handleSubmit,
    handleCancel,
  };
};
