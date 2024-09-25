import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputWithLabel from "../../../components/InputWithLabel";
import Button from "../../../components/Button";
import Typography from "../../../components/Typography";
import { useAuthLogin } from "../hooks/useAuthLogin";
import { LoginFormData, loginSchema } from "../schemas/loginSchema";

const LoginForm: React.FC = () => {
  const { error, onSubmit, signInWithGoogle } = useAuthLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
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
      {error && <Typography variant="error">{error}</Typography>}
      <div className="gap-4 mt-4 flex flex-col">
        <Button label="Login" styleType="login" type="submit" />
        <Button
          label="Join with Google"
          styleType="google"
          onClick={signInWithGoogle}
        />
      </div>
    </form>
  );
};

export default LoginForm;
