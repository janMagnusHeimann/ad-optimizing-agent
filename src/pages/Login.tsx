
import React from "react";
import LoginForm from "@/components/LoginForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";

const Login = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`relative min-h-screen ${isDarkMode ? 'bg-gray-900' : ''}`}>
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
