import React from "react";
import Header from "./Header";

interface HeaderLayoutProps {
  user: {
    photoURL?: string;
    displayName?: string;
  };
  logout: () => void;
  children?: React.ReactNode;
}

const HeaderLayout = ({ user, children, logout }: HeaderLayoutProps) => {
  return (
    <section className="pb-40">
      <Header user={user} logout={logout} />
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">{children}</div>
    </section>
  );
};

export default HeaderLayout;
