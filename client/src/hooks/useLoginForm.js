import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/authSchema";
import { login } from "@/services/loginService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const useLoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      reset();
      navigate("/projects");
      toast.success("Logged In Successfully");
    } catch (err) {
      console.error("Login failed", err.message);
      toast.error("Login failed!!");
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
  };
};
