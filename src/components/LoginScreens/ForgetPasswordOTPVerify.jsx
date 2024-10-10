import React from "react";
import arrowLeft from "../../assets/LoginScreen/arrowLeft.png";
import leftBg from "../../assets/LoginScreen/leftBg.jpg";
import { useForm } from "react-hook-form";
import selfVerifyOTP from "../../actions/LoginScreens/selfVerifyOTP";
import resendOTP from "../../actions/LoginScreens/resendOTP";
import { useNavigate } from "react-router";

function ForgetPasswordOTPVerify() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const otpVerifyHandler = async (formData) => {
    try {
      const data = {
        id_self_student: "1",
        otp: "1234",
        otp_type: "1",
      };
      await selfVerifyOTP(data);
      navigate("/login/forget-password/reset-password");
    } catch (error) {
      console.log("Error while verifying otp :: ", error);
    }
  };

  const resendOTPHandler = async (formData) => {
    try {
      const data = {
        id_self_student: "1",
      };
      await resendOTP(data);
    } catch (error) {
      console.log("Error while resending OTP :: ", error);
    }
  };
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen relative w-full lg:w-1/2 flex justify-center items-center">
      <div className="absolute inset-0 z-[-1] overflow-hidden min-h-screen">
        <img
          src={leftBg}
          alt=""
          className="w-full h-full  cursor-pointer absolute inset-0 object-fill"
        />
      </div>
      <div className="w-1/2 bg-white rounded-3xl border h-2/3 p-4 z-[1]">
        <div className="flex justify-between items-center">
          <img
            src={arrowLeft}
            alt=""
            className="bg-[#1C4481] w-6 h-6 rounded-full"
            onClick={handleBack}
          />
          <div className="flex flex-col items-end">
            <span className="font-semibold text-[#AFAFAF]">Candidate</span>
            <span className="font-semibold text-[#555555]">Panel</span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(otpVerifyHandler)}
          className="flex flex-col mt-14 items-center gap-6"
        >
          <span className="text-sm font-medium">
            Enter 4 digit code sent to your mobile phone
          </span>
          <div className="flex gap-4">
            <div className="w-12 h-12 flex items-center justify-center">
              <input
                type="text"
                className="h-12 appearance-none enabled:appearance-none w-12 p-4 text-xl font-medium border-blue-700 border rounded outline-none "
                maxLength="1"
                inputMode="numeric"
                {...register("firstDigit", { required: true })}
              />
            </div>
            <div className="w-12 h-12   flex items-center justify-center">
              <input
                type="text"
                className="h-12 appearance-none w-12 p-4 text-xl font-medium border-blue-700 border rounded outline-none "
                maxLength="1"
                {...register("secondDigit", { required: true })}
              />
            </div>
            <div className="w-12 h-12   flex items-center justify-center">
              <input
                type="text"
                className="h-12 appearance-none w-12 p-4 text-xl font-medium border-blue-700 border rounded outline-none "
                maxLength="1"
                {...register("thirdDigit", { required: true })}
              />
            </div>
            <div className="w-12 h-12   flex items-center justify-center">
              <input
                type="text"
                className="h-12 appearance-none w-12 p-4 text-xl font-medium border-blue-700 border rounded outline-none "
                maxLength="1"
                {...register("fourthDigit", { required: true })}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#1C4481] rounded-3xl w-full h-10 font-medium text-white"
          >
            Submit
          </button>
          <button onClick={resendOTPHandler}>
            <span className="text-sm text-[#50B4ED]">Resend(26)</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPasswordOTPVerify;
