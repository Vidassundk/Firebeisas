import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleLogin = async (data: AuthFormData) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
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
