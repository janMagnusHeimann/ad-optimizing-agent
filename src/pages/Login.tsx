
import React from "react";
import LoginForm from "@/components/LoginForm";
import { ThemeToggle } from "@/components/ThemeToggle";

const Login = () => {
  return (
    <div className="relative min-h-screen">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
