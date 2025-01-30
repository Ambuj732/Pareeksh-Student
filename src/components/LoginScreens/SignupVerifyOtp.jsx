import React, { useState, useEffect, useRef } from "react";
import arrowLeft from "../../assets/LoginScreen/arrowLeft.png";
import logo from "../../assets/logo/pareekshn_logo.png";
import hand from "../../assets/LoginScreen/hand.png";
import laptop from "../../assets/LoginScreen/laptop.png";
import scaleAndPencil from "../../assets/LoginScreen/scaleAndPencil.png";
import student from "../../assets/LoginScreen/student.png";
import graduationCap from "../../assets/LoginScreen/cap.png";
import { useForm } from "react-hook-form";
import selfVerifyOTP from "../../actions/LoginScreens/selfVerifyOTP";
import resendOTP from "../../actions/LoginScreens/resendOTP";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignupVerifyOtp() {
  const { register, handleSubmit, setValue, watch } = useForm();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [resendTimer]);

  const otpVerifyHandler = async (formData) => {
    try {
      const id_self_student = JSON.parse(
        localStorage.getItem("id_self_student")
      );
      const otp = `${formData.firstDigit}${formData.secondDigit}${formData.thirdDigit}${formData.fourthDigit}`;
      const data = {
        id_self_student: id_self_student,
        otp: otp,
        otp_type: "1",
      };
      console.log("OTP::", otp);
      const response = await selfVerifyOTP(data);
      if (response?.data?.code === 1000) {
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error("Invalid otp");
      }
    } catch (error) {
      console.log("Error while verifying otp :: ", error);
    }
  };

  const resendOTPHandler = async () => {
    try {
      const id_self_student = JSON.parse(
        localStorage.getItem("id_self_student")
      );
      const data = {
        id_self_student: id_self_student,
      };
      const response = await resendOTP(data);
      if (response?.data?.code === 1000) {
        toast.success("OTP sent to your registered mobile.");
        setResendTimer(60);
      }
    } catch (error) {
      console.log("Error while resending OTP :: ", error);
    }
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      setValue(e.target.name, value);
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      setValue(e.target.name, "");
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen relative w-full lg:w-1/2 flex justify-center items-center">
      <img src={logo} alt="" className="absolute top-3 left-3 h-20" />
      <div className="absolute inset-0 z-[-1] overflow-hidden bg-[rgb(47,81,133)]">
        <img
          src={graduationCap}
          alt=""
          className="absolute h-16 top-10 right-10"
        />
        <img src={laptop} alt="" className="absolute bottom-72 h-16 left-10" />
        <img
          src={scaleAndPencil}
          alt=""
          className="absolute bottom-12 h-24 left-10"
        />
        <img src={hand} alt="" className="absolute bottom-12 h-16 right-24" />
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
            <span className="font-semibold text-[#555555]">OTP</span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(otpVerifyHandler)}
          className="flex flex-col mt-14 items-center gap-6"
        >
          <span className="text-sm font-medium">
            Enter 4 digit code sent to your mobile phone
          </span>
          <div className="flex flex-col gap-4 mt-4 justify-center items-center">
            <div className="flex gap-4">
              {["firstDigit", "secondDigit", "thirdDigit", "fourthDigit"].map(
                (name, index) => (
                  <div
                    key={name}
                    className="w-12 h-12 flex items-center justify-center"
                  >
                    <input
                      type="text"
                      className="h-12 appearance-none enabled:appearance-none w-12 p-4 text-xl font-medium border-blue-700 border rounded outline-none"
                      maxLength="1"
                      inputMode="numeric"
                      {...register(name, { required: true })}
                      ref={(el) => (inputRefs.current[index] = el)}
                      onChange={(e) => handleInputChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  </div>
                )
              )}
            </div>
            {errors.firstDigit ||
            errors.secondDigit ||
            errors.thirdDigit ||
            errors.fourthDigit ? (
              <div className="error flex text-red-600 font-medium text-sm items-center">
                Please enter a valid 4-digit code.
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="bg-[#1C4481] rounded-3xl w-full h-10 font-medium text-white mt-6"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={resendOTPHandler}
            className="text-md text-[#50B4ED] mt-4 text-center underline"
            disabled={resendTimer > 0}
          >
            {resendTimer > 0 ? `Resend (${resendTimer}s)` : "Resend"}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default SignupVerifyOtp;
