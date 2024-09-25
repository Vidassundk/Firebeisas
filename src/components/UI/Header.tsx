import React from "react";
import { cn } from "../../util/cn";
import Typography from "./Typography";
import Button from "./Button";

interface HeaderProps {
  user: {
    photoURL?: string;
    displayName?: string;
  };
  logout: () => void;
}

const Header = ({ user, logout }: HeaderProps) => {
  // galima naudoti !!user?.photoURL
  const userHasPhoto = user?.photoURL ? true : false;

  return (
    <section className="relative pt-40 pb-12">
      <img
        src="https://images.unsplash.com/photo-1700160571561-87466ede844d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="cover-image"
        className="w-full absolute top-0 left-0 z-0 h-60 object-cover object-center bg-slate-600"
      />
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div
          className={cn(
            userHasPhoto ? "mt-[0]" : "mt-[100px]",
            "flex items-center justify-center sm:justify-start relative z-10 mb-5"
          )}
        >
          {userHasPhoto && (
            <img
              src={user?.photoURL}
              alt="user-avatar-image"
              className="border-4 w-[150px] h-[150px] border-solid border-white rounded-full object-cover"
            />
          )}
        </div>
        <div className="flex flex-col md:flex-row max-md:gap-5 items-center justify-between mb-5">
          <div className="block flex flex-col gap-2">
            <Typography variant="h3" className="text-nowrap">
              {/* Kitur naudoji string literal. Gerai butu visur naudoti viena stiliu. */}
              {user?.displayName ? "Hello, " + user?.displayName : "Hello!"}
            </Typography>
            <Typography variant="label" className="text-nowrap">
              Organise your favorite movies.
            </Typography>
          </div>
          <div className="flex flex-row gap-2 w-full max-w-[600px]">
            <Button
              styleType="github"
              label="Get the code on Github"
              href="https://github.com/Vidassundk/Firebeisas"
            ></Button>
            <Button
              styleType="google"
              label="Sign Out"
              onClick={logout}
            ></Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
