import React, { useState } from "react";
import arrowLeft from "../../assets/LoginScreen/arrowLeft.png";
import logo from "../../assets/logo/pareekshn_logo.png";
import hand from "../../assets/LoginScreen/hand.png";
import laptop from "../../assets/LoginScreen/laptop.png";
import scaleAndPencil from "../../assets/LoginScreen/scaleAndPencil.png";
import student from "../../assets/LoginScreen/student.png";
import graduationCap from "../../assets/LoginScreen/cap.png";
import userProfile from "../../assets/LoginScreen/userProfile.png";
import { useForm } from "react-hook-form";
import { IoPerson } from "react-icons/io5";
import forgetPassword from "../../actions/LoginScreens/forgetPassword";
import OTPVerify from "../../actions/LoginScreens/verifyOTP";
import { useNavigate } from "react-router";
import resetPassword from "../../actions/LoginScreens/resetPassword";
import * as Yup from "yup";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPassword() {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPassword((prevShowPassword) => !prevShowPassword);
  };

  const resetPasswordSchema = Yup.object({
    newPassword: Yup.string()
      .required("Password is required")
      .min(6, " Password should be atleast 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must be  match")
      .required("Confirm password is required"),
  });

  const resetPasswordHandler = async (formData) => {
    try {
      const id_self_student = JSON.parse(
        localStorage.getItem("id_self_student")
      );
      const data = {
        id_self_student: id_self_student,
        password: formData?.newPassword,
        new_password: formData?.confirmPassword,
      };
      await resetPasswordSchema.validate(formData, { abortEarly: false });
      setErrors({});
      const response = await resetPassword(data);
      if (response?.data?.code === 1000) {
        toast.success("Your password has been changed successfully");
        localStorage.removeItem("id_self_student");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      console.log("Error while logging with passcode :: ", error);
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      console.log("Error ", newErrors);
      setErrors(newErrors);
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
      <form
        onSubmit={handleSubmit(resetPasswordHandler)}
        className="w-1/2 bg-white rounded-3xl border h-96 px-4 py-2 "
      >
        <div className="flex justify-between items-center">
          <img
            src={arrowLeft}
            alt=""
            className="bg-[#1C4481] w-6 h-6 rounded-full"
            onClick={handleBack}
          />
          <div className="flex flex-col items-end">
            <span className="font-semibold text-[#AFAFAF]">Forget</span>
            <span className="font-semibold text-[#222222]">Password</span>
          </div>
        </div>
        <div className="flex items-center justify-center mt-8">
          <span className="font-medium">Reset Your Password</span>
        </div>
        <div className="relative h-14 my-6">
          <div>
            <input
              type={showPassword ? "text" : "password"}
              id="floating_filled"
              className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
              placeholder=""
              {...register("newPassword", { required: true })}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-[#1C4481] focus:outline-none"
            >
              {showPassword ? <VscEyeClosed /> : <VscEye />}
            </button>
            <div
              htmlFor="floating_filled"
              className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
            >
              <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
              <label htmlFor="" className="pl-2">
                New Password
              </label>
            </div>
            {errors.newPassword && (
              <div className="error text-red-600 font-medium text-sm">
                {errors?.newPassword}
              </div>
            )}
          </div>
        </div>
        <div className="relative h-14 my-6">
          <div>
            <input
              type={confirmPassword ? "text" : "password"}
              id="floating_filled"
              className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
              placeholder=""
              {...register("confirmPassword", { required: true })}
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-[#1C4481] focus:outline-none"
            >
              {confirmPassword ? <VscEyeClosed /> : <VscEye />}
            </button>
            <div
              htmlFor="floating_filled"
              className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
            >
              <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
              <label htmlFor="" className="pl-2">
                Re-Enter New Password
              </label>
            </div>
          </div>
          {errors.confirmPassword && (
            <div className="error text-red-600 font-medium text-sm">
              {errors?.confirmPassword}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-[#1C4481] text-white font-medium h-12 w-full rounded-full"
        >
          Continue
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ResetPassword;
