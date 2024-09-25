import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthRegister } from "../hooks/useAuthRegister";
import { registerSchema, RegisterFormData } from "../schemas/registerSchema";
import InputWithLabel from "../../../components/InputWithLabel";
import Button from "../../../components/Button";
import Typography from "../../../components/Typography";

const RegisterForm: React.FC = () => {
  const { error, onSubmit } = useAuthRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <InputWithLabel
        label="Email"
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />
      <InputWithLabel
        label="Password"
        type="password"
        {...register("password")}
        error={errors.password?.message}
      />
      <InputWithLabel
        label="Confirm Password"
        type="password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      {error && <Typography variant="error">{error}</Typography>}

      <Button label="Register" styleType="login" type="submit" />
    </form>
  );
};

export default RegisterForm;
