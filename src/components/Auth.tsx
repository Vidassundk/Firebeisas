import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom"; // For navigation
import Typography from "./UI/Typography";
import Button from "./UI/Button";
import InputWithLabel from "./UI/InputWithLabel"; // Ensure the path is correct

// Zod schema for validation
const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type AuthFormData = z.infer<typeof authSchema>;

const Auth: React.FC = () => {
  const [error, setError] = useState<string | null>(null); // For error messages
  const [isRegister, setIsRegister] = useState(true); // Toggle between login and register
  const navigate = useNavigate(); // Use react-router-dom's useNavigate for redirection

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  // Email/password registration function
  const handleRegister = async (data: AuthFormData) => {
    const { email, password } = data;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redirect to dashboard on success
    } catch (error: any) {
      setError(error.message); // Set the error message
    }
  };

  // Email/password login function
  const handleLogin = async (data: AuthFormData) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redirect to dashboard on success
    } catch (error: any) {
      setError(error.message); // Set the error message
    }
  };

  // Google sign-in function
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard"); // Redirect to dashboard on success
    } catch (error: any) {
      setError(error.message); // Set the error message
    }
  };

  // Form submit handler (switch between register and login)
  const onSubmit: SubmitHandler<AuthFormData> = (data) => {
    if (isRegister) {
      handleRegister(data);
    } else {
      handleLogin(data);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <div className="flex flex-col gap-8">
          <Typography variant="h1" className="text-nowrap">
            Firebeisas 🔥
          </Typography>
          <Typography variant="p">
            Google <b>Authentication</b> and <b>Crud</b> with <b>React</b> /{" "}
            <b>Firebase</b> / <b>TailwindCSS</b> / <b>Form Validation</b>
          </Typography>

          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <div className="px-5 py-7">
              <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                {/* Email Field */}
                <InputWithLabel
                  label="Email"
                  type="email"
                  name="email"
                  {...register("email")} // Spread the register properties into the component
                  error={errors.email?.message}
                />

                <InputWithLabel
                  label="Password"
                  type="password"
                  name="password"
                  {...register("password")} // Spread the register properties into the component
                  error={errors.password?.message}
                />

                {/* Error Message */}
                {error && (
                  <Typography variant="p" className="text-red-500">
                    {error}
                  </Typography>
                )}

                {/* Submit and Google Buttons */}
                <div className="flex flex-col mt-4 gap-4">
                  <Button
                    label={isRegister ? "Register" : "Login"}
                    styleType="login"
                    arrow={true}
                    type="submit"
                  />
                  <Button
                    label="Google"
                    styleType="google"
                    onClick={signInWithGoogle}
                  />
                </div>
              </form>
            </div>
            <div className="p-5">
              {/* Toggle between register and login */}
              <div className="text-center gap-2 flex flex-col">
                <Typography variant="label">
                  {isRegister
                    ? "Already have an account?"
                    : "Don't have an account?"}
                </Typography>
                <Button
                  label={isRegister ? "Login here" : "Register here"}
                  styleType="login"
                  onClick={() => setIsRegister(!isRegister)}
                />
              </div>
            </div>
            <div className="gap-2 p-5">
              <Button
                label="Checkout on Github"
                styleType="github"
                onClick={() => {
                  console.log("Github button clicked");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
