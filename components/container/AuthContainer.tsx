import React from "react";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

const AuthContainer: React.FC<AuthCardProps> = ({
  children,
  className = ""
}) => {
  return (
    <div
      className={`w-full max-w-md mx-auto p-6 rounded-3xl shadow-2xl bg-light100_dark100 dark:bg-dark-400 ${className}`}
    >
      {children}
    </div>
  );
};

export default AuthContainer;
