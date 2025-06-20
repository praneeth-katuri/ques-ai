import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas/authSchema";
import { signup } from "@/services/loginService";
import { toast } from "react-hot-toast";

export const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    try {
      await signup(data.name, data.email, data.password, data.confirmPassword);
      reset();
      toast.success("Registration Successful");
    } catch (err) {
      console.error("Registration error:", err.message);
      toast.error("Something went wrong!!");
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
  };
};
