import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerWithEmail,
  loginWithEmail,
  loginWithGoogle,
} from "../services/authService";

const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type AuthFormData = z.infer<typeof authSchema>;

export const useAuthService = () => {
  const [error, setError] = useState<string | null>(null);
  const [isRegister, setIsRegister] = useState(true);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const handleRegister = async (data: AuthFormData) => {
    const { email, password } = data;
    try {
      await registerWithEmail(email, password);
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleLogin = async (data: AuthFormData) => {
    const { email, password } = data;
    try {
      await loginWithEmail(email, password);
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const onSubmit: SubmitHandler<AuthFormData> = (data) => {
    if (isRegister) {
      handleRegister(data);
    } else {
      handleLogin(data);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    error,
    isRegister,
    setIsRegister,
    onSubmit,
    signInWithGoogle,
  };
};
