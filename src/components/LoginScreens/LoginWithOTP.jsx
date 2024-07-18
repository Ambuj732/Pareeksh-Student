import React, { useState } from "react";
import tablet from "../../assets/LoginScreen/Tablet.png";
import arrowLeft from "../../assets/LoginScreen/arrowLeft.png";
import { useNavigate } from "react-router";
import loginWithOTP from "../../actions/LoginScreens/loginWithOTP";
import { useForm } from "react-hook-form";

function LoginWithOTP() {
	const navigate = useNavigate();

	const { register, handleSubmit } = useForm();

	const loginWithOTPHandler = async (formData) => {
		try {
			const data = {
				mobile_no: "6239132410",
			};
			await loginWithOTP(data);
			navigate("/login-with-otp/verify-otp");
		} catch (error) {
			console.log("Error while loggin with otp :: ", error);
		}
	};
	const handleBack = () => {
		navigate(-1);
	};

	return (
		<form
			onSubmit={handleSubmit(loginWithOTPHandler)}
			className="w-1/4 bg-white rounded-3xl right-64 absolute border h-96 px-4 py-2 "
		>
			<div className="flex justify-between items-center">
				<img
					src={arrowLeft}
					alt=""
					className="bg-[#1C4481] w-6 h-6 rounded-full  cursor-pointer"
					onClick={handleBack}
				/>
				<div className="flex flex-col items-end">
					<span className="font-semibold text-[#AFAFAF]">
						Login With
					</span>
					<span className="font-semibold text-[#222222]">OTP</span>
				</div>
			</div>
			<div className="relative h-12 my-8">
				<div>
					<input
						type="text"
						id="floating_filled"
						className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
						placeholder=""
						{...register("username", {
							required: true,
						})}
					/>
					<div
						htmlFor="floating_filled"
						className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
					>
						<img src={tablet} alt="" className="h-5 w-5" />
						<label htmlFor="" className="pl-2">
							Enter mobile number
						</label>
					</div>
				</div>
			</div>
			{/* <div className="border border-black rounded-md px-2 py-1 my-8 h-12 flex items-center">
				
				<div className="flex items-center gap-2 text-[#1C4481] w-full">
					<input
						type="number"
						placeholder="Enter Mobile Number"
						className="placeholder:text-black px-2 w-full outline-none no-spin"
						{...register("mobile_no", { required: true })}
					/>
				</div>
			</div> */}
			<button
				type="submit"
				className="bg-[#1C4481] text-white w-full h-10 rounded-3xl"
			>
				Continue
			</button>
		</form>
	);
}

export default LoginWithOTP;
