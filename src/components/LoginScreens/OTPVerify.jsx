import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import queryString from "query-string";
import { useForm } from "react-hook-form";
import SlidingMessage from "../ApiResponse"; // Assuming this is a component for displaying error messages
import verifyOTP from "../../actions/LoginScreens/verifyOTP"; // Assuming this is your API call function
import passcodeVerifyOtp from "../../actions/LoginScreens/passcodeVerifyOtp";
import resendOTP from "../../actions/LoginScreens/resendOTP";
import arrowLeft from "../../assets/LoginScreen/arrowLeft.png";
import { BLANK_MSG, TRY_AGAIN_MSG } from "../../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OTPVerify() {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");
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

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
    setValue(`otp${index + 1}FormControl`, value, { shouldValidate: true });
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && e.target.value === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const otpVerifyHandler = async (formData) => {
    try {
      const otp = `${formData.otp1FormControl}${formData.otp2FormControl}${formData.otp3FormControl}${formData.otp4FormControl}`;

      if (otp.length !== 4) {
        setError(BLANK_MSG);
        return;
      }

      const userData = JSON.parse(localStorage.getItem("ps_loguser"));
      const id_self_student = JSON.parse(
        localStorage.getItem("id_self_student")
      );
      console.log(id_self_student);
      console.log(userData);
      const settings = JSON.parse(sessionStorage.getItem("pkshn_exam_set"));
      const parsed = queryString.parse(window.location.search);
      const querystr = parsed.q;
      if (!querystr) {
        setError(TRY_AGAIN_MSG);
        return;
      }
      const params = window.atob(querystr);
      const splitStr = params.split("//@spwd++sup@//");
      userData.usercode = splitStr[0];
      userData.userid = splitStr[1];
      userData.subuserid = splitStr[2];
      userData.id_self_student = splitStr[3];
      const otp_type = splitStr[4];

      const req_data = {
        usercode: userData.usercode,
        user_id: userData.userid,
        sub_user_id: userData.subuserid,
        id_self_student: userData.id_self_student,
        id_student: userData.id,
        otp,
        exam_id: settings.exam_id,
        otp_type,
      };
      console.log(req_data);
      const response = await verifyOTP(req_data);
      if (response.status === 200) {
        const code = response?.data?.code;
        const message = response?.data?.status;
        console.log(message);
        if (code === 1000) {
          switch (otp_type) {
            case "5":
              navigate("/login-with-passcode/upload-id");
              break;
            case "6":
              navigate("/login-with-passcode/verify-profile");
              break;
            default:
              setError(message);
              break;
          }
        } else {
          setError(message);
        }
      } else {
        setError(TRY_AGAIN_MSG);
      }
    } catch (error) {
      console.error("Error while verifying OTP:", error);
      setError(TRY_AGAIN_MSG);
    }
  };

  const resendOTPHandler = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("ps_loguser"));
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
      } else {
        toast.error("Request Invalid.");
      }
    } catch (error) {
      console.log("Error while resending OTP :: ", error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    console.log("Input Refs:", inputRefs.current);
  }, [inputRefs.current]);

  return (
    <form onSubmit={handleSubmit(otpVerifyHandler)}>
      <div className="w-1/4 bg-white rounded-3xl right-64 absolute border h-2/3 p-4 top-1/2 -translate-y-1/2">
        <div className="flex justify-between items-center">
          <img
            src={arrowLeft}
            onClick={handleBack}
            alt="Back"
            className="bg-[#1C4481] w-6 h-6 rounded-full cursor-pointer"
          />
          <div className="flex flex-col items-end">
            <span className="font-semibold text-[#AFAFAF]">OTP</span>
            <span className="font-semibold text-[#555555]">Verify</span>
          </div>
        </div>
        <div className="flex flex-col mt-14 items-center gap-6">
          <span className="text-sm font-medium">
            Enter 4 digit code sent to your mobile phone
          </span>
          <div className="flex gap-4">
            {[...Array(4)].map((_, index) => (
              <input
                key={index}
                type="text"
                className="h-12 appearance-none w-12 p-4 text-xl font-medium border-blue-700 border rounded outline-none"
                maxLength="1"
                inputMode="numeric"
                placeholder=""
                {...register(`otp${index + 1}FormControl`, { required: true })}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>
          <button
            type="submit"
            className="bg-[#1C4481] rounded-3xl w-full h-10 font-medium text-white"
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
        </div>
      </div>
      {error && <SlidingMessage message={error} setError={setError} />}
      <ToastContainer />
    </form>
  );
}

export default OTPVerify;
