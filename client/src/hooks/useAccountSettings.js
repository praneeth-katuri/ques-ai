import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { updateProfile } from "@/services/userService";
import toast from "react-hot-toast";

export const useAccountSettings = () => {
  const { name, email } = useAuthStore((s) => s.user);
  const [username, setName] = useState(name);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim() === name.trim()) return;

    try {
      setLoading(true);
      await updateProfile({ name: username });
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error("Profile update error:", err.message);
      toast.error("Profile update failed");
      setName(name);
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    email,
    username,
    setName,
    loading,
    navigate,
    handleSubmit,
  };
};
