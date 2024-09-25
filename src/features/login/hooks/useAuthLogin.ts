import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { loginWithEmail, loginWithGoogle } from "../../../services/authService";
import { LoginFormData } from "../schemas/loginSchema";

export const useAuthLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (data: LoginFormData) => {
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

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    handleLogin(data);
  };

  return {
    error,
    onSubmit,
    signInWithGoogle,
  };
};
