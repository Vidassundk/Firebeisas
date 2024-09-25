import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { registerWithEmail } from "../../../services/authService";
import { RegisterFormData } from "../schemas/registerSchema";

export const useAuthRegister = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (data: RegisterFormData) => {
    const { email, password } = data;
    try {
      await registerWithEmail(email, password);
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    handleRegister(data);
  };

  return {
    error,
    onSubmit,
  };
};
