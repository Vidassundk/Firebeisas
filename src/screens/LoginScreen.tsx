import React from "react";
import Typography from "../components/UI/Typography";
import Button from "../components/UI/Button";
import InputWithLabel from "../components/UI/InputWithLabel";
import { useAuthService } from "../hooks/useAuthService";

const LoginScreen: React.FC = () => {
  const {
    register,
    handleSubmit,
    errors,
    error,
    isRegister,
    setIsRegister,
    onSubmit,
    signInWithGoogle,
  } = useAuthService();

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
                <InputWithLabel
                  label="Email"
                  type="email"
                  name="email"
                  {...register("email")}
                  error={errors.email?.message}
                />

                <InputWithLabel
                  label="Password"
                  type="password"
                  name="password"
                  {...register("password")}
                  error={errors.password?.message}
                />

                {error && (
                  <Typography variant="error" className="text-red-500">
                    {error}
                  </Typography>
                )}

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
            <div className="flex p-5">
              <Button
                styleType="github"
                className="w-full"
                label="Get the code on Github"
                href="https://github.com/Vidassundk/Firebeisas"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginScreen;
