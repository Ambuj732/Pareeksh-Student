import React from "react";
import SignUp from "../../components/LoginScreens/SignUp";
import AboutPareekshn from "../../components/LoginScreens/AboutPareekshn";
import { Outlet } from "react-router";

function SignUpPage() {
	return (
		<div className="flex flex-col lg:flex-row  min-h-screen items-center font-custom">
			<Outlet />
			<AboutPareekshn />
		</div>
	);
}

export default SignUpPage;
