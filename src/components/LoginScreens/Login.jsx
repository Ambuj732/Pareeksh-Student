import React, { useState, useEffect } from "react";
import leftBg from "../../assets/LoginScreen/leftBg.jpg";
import { BsThreeDots } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import { VscEye } from "react-icons/vsc";
import { LuSquareAsterisk } from "react-icons/lu";
import { FaCircleExclamation } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { Link, Outlet } from "react-router-dom";
import login from "../../actions/LoginScreens/login";
import { useNavigate } from "react-router-dom";
import SlidingMessage from "../ApiResponse";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import logo from "../../assets/logo/pareekshn_logo.png";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../../store/authSlice";
import books from "../../assets/LoginScreen/books.png";
import graduationCap from "../../assets/LoginScreen/cap.png";
import scaleAndPencle from "../../assets/LoginScreen/scalepencle.jpg";
import exam from "../../assets/LoginScreen/exam.png";
import parkeeshnLogo from "../../assets/LoginScreen/parkeeshnLogo.png";
import hand from "../../assets/LoginScreen/hand.png";
import laptop from "../../assets/LoginScreen/laptop.png";
import scaleAndPencil from "../../assets/LoginScreen/scaleAndPencil.png";
import student from "../../assets/LoginScreen/student.png";
import bulb from "../../assets/LoginScreen/bulb.png";
import building from "../../assets/LoginScreen/building.png";
import personWithLaptop from "../../assets/LoginScreen/personWithLaptop.png";

function Login() {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState("password");
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username/Email is required")
      .min(6, "Username should be more than 6 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 8 characters"),
  });

  const loginHandler = async (formData) => {
    try {
      const data = {
        username: formData?.username,
        password: formData?.password,
        notification_id: "sdfsdfssdf",
      };
      await validationSchema.validate(data, { abortEarly: false });
      setErrors({});
      const response = await login(data);
      const code = response?.data?.code;
      const message = response?.data?.status;
      if (code !== 1000) {
        toast.error("Username or Password Wrong!");
        console.log("Message :: ", message);
        return;
      } else if (code === 1000) {
        toast.success("You have successfully logged in!");
        setTimeout(() => {
          navigate("/dashboard/exams");
        }, 1000);
      }
      localStorage.setItem("ps_loguser", JSON.stringify(response.data.info));
      dispatch(authLogin(response?.data?.info));
    } catch (error) {
      const newErrors = {};
      console.log(error);
      error?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen relative w-full lg:w-2/3 flex justify-center items-center">
      <img src={logo} alt="" className="absolute top-3 left-3 h-20" />
      <div className="absolute inset-0 z-[-1] overflow-hidden bg-[rgb(47,81,133)]">
        {/* <img
					src={leftBg}
					alt=""
					className="w-full h-full object-fill  cursor-pointer absolute inset-0"
				/> */}
        <img
          src={graduationCap}
          alt=""
          className="absolute h-16 top-10 right-10"
        />
        <img src={laptop} alt="" className="absolute bottom-72 h-16 left-10" />
        <img src={hand} alt="" className="absolute bottom-16 h-16 left-10" />
      </div>

      <form
        onSubmit={handleSubmit(loginHandler)}
        className="bg-[#ffffff] h-[470px] w-3/5 lg:w-4/5 xl:w-[400px] rounded-3xl p-4 flex flex-col gap-4 relative z-10"
      >
        <h1 className="text-xl font-medium text-[#858585]">Candidate Login</h1>
        <Link to={"/login-with-otp/login-otp"}>
          <div className="bg-[#1b4581] text-white h-12 p-4 text-center rounded-3xl flex items-center justify-center gap-4 hover:cursor-pointer">
            <BsThreeDots className="text-[#1b4581] bg-white rounded h-5 w-8" />
            <p className="text-sm font-medium">Login with OTP</p>
          </div>
        </Link>
        <div className="relative w-full mx-auto my-2">
          <div className="absolute top-1/2 left-0 w-full border-t border-[#9E9E9E73]"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#CECECE] rounded-full flex items-center justify-center">
            <span className="text-[#5C5C5C] text-[12px] font-medium">OR</span>
          </div>
        </div>
        <p className="text-center text-sm font-medium text-[#383838]">
          Login With Username/Email
        </p>
        <div className="flex flex-col gap-2">
          <div className="relative h-12">
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
                <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                <label htmlFor="" className="pl-2">
                  Username/Email
                </label>
              </div>
            </div>
          </div>
          {errors?.username && (
            <div className="error text-red-600 font-medium text-sm">
              {errors?.username}
            </div>
          )}
          <Link to={"/login/forget-username"}>
            <p className="text-[#7c7b7b] text-sm hover:cursor-pointer">
              Forget Username?
            </p>
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <div className="relative h-12">
            <div>
              <input
                type={isPasswordVisible}
                id="floating_filled"
                className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                placeholder=""
                {...register("password", {
                  required: true,
                })}
              />
              {isPasswordVisible === "password" ? (
                <FaRegEye
                  onClick={() => setIsPasswordVisible("text")}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-[#1C4481] cursor-pointer"
                />
              ) : (
                <FaRegEyeSlash
                  onClick={() => setIsPasswordVisible("password")}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-[#1C4481] cursor-pointer"
                />
              )}
              <div
                htmlFor="floating_filled"
                className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
              >
                <LuSquareAsterisk className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />

                <label htmlFor="" className="pl-2">
                  Password
                </label>
              </div>
            </div>
          </div>
          {errors?.password && (
            <div className="error text-red-600 font-medium text-sm">
              {errors?.password}
            </div>
          )}
          <Link to={"/login/forget-password"}>
            <p className="text-[#7c7b7b] text-sm hover:cursor-pointer">
              Forget Password?
            </p>
          </Link>
        </div>
        <div className="bg-[#1b4581] text-white h-12 p-2 flex justify-center items-center rounded-3xl hover:cursor-pointer">
          <button type="submit" className="h-full w-full">
            Login
          </button>
        </div>
        <div className="text-sm text-center font-semibold text-[#3C4345]">
          <p>
            Not registered yet?{" "}
            <Link to={"/signup/account"}>
              <span className="text-[#0F9FCC] hover:cursor-pointer font-medium">
                Create an account
              </span>
            </Link>
          </p>
        </div>
      </form>
      {error && <SlidingMessage message={error} setError={setError} />}
      <ToastContainer />
    </div>
  );
}

export default Login;
