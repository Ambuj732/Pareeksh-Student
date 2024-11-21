import React, { useEffect } from "react";
import LoginWithPasscode from "../../components/LoginScreens/LoginWithPasscode";
import { Outlet } from "react-router";

function LoginScreen() {
  return (
    <div className="flex flex-col lg:flex-row  min-h-screen items-center font-custom">
      {/* Left Side */}
      <Outlet />
      {/* Right Side */}
      <LoginWithPasscode />
    </div>
  );
}

export default LoginScreen;
