import React, { useState } from "react";
import Typography from "../components/Typography";
import Button from "../components/Button";
import LoginForm from "../features/login/components/LoginForm";
import RegisterForm from "../features/register/components/RegisterForm";

const AuthScreen: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <div className="flex flex-col gap-8">
          <Typography variant="h1" className="text-nowrap">
            Firebeisas 🔥
          </Typography>
          <Typography variant="p">
            Google <b>Authentication</b> and <b>CRUD</b> with <b>React</b> /{" "}
            <b>Firebase</b> / <b>TailwindCSS</b> / <b>Form Validation</b>
          </Typography>

          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <div className="px-5 py-7">
              {isRegister ? <RegisterForm /> : <LoginForm />}
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

export default AuthScreen;
