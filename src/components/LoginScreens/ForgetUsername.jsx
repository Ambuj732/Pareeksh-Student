import React, { useState } from "react";
import tablet from "../../assets/LoginScreen/Tablet.png";
import arrowLeft from "../../assets/LoginScreen/arrowLeft.png";
import logo from "../../assets/logo/pareekshn_logo.png";
import hand from "../../assets/LoginScreen/hand.png";
import laptop from "../../assets/LoginScreen/laptop.png";
import scaleAndPencil from "../../assets/LoginScreen/scaleAndPencil.png";
import student from "../../assets/LoginScreen/student.png";
import graduationCap from "../../assets/LoginScreen/cap.png";
import forgetUsername from "../../actions/LoginScreens/forgetUsername";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import * as Yup from "yup";

function ForgetUsername() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(false);

  const forgetUsernameSchema = Yup.object({
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Phone Number must be 10 digits")
      .required(" Phone Number is required")
      .min(6, "Phone number must be 10 digit"),
  });

  const forgetUsernameHandler = async (formData) => {
    try {
      console.log("Form Data :: ", formData);
      const data = {
        mobile_no: formData?.mobile,
      };
      // await forgetUsernameSchema.validate(data, { abortEarly: false });
      console.log("Data :: ", data);
      const response = await forgetUsername(data);
      console.log(response);
      if (response?.data?.code === 1000) {
        setMessage(true);
        setTimeout(() => {
          navigate("/");
        }, 10000);
      } else if (response?.data?.status === "Keys does not match !!") {
        toast.error("Keys does not match !!");
      } else if (
        response?.data?.status === "Mobile number is not registered."
      ) {
        toast.error("Mobile number is not registered");
      }
    } catch (error) {
      console.log("Error while logging with passcode :: ", error);
      toast.error("Enter valid Username/mobileNumber");
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
        <img src={hand} alt="" className="absolute bottom-16 h-16 left-10" />
      </div>
      <form
        onSubmit={handleSubmit(forgetUsernameHandler)}
        className="w-1/2 bg-white rounded-3xl  border h-96 px-4 py-2 "
      >
        <div className="flex justify-between items-center">
          <img
            src={arrowLeft}
            alt=""
            className="bg-[#1C4481] w-6 h-6 rounded-full cursor-pointer"
            onClick={handleBack}
          />
          <div className="flex flex-col items-end">
            <span className="font-semibold text-[#AFAFAF]">Forget</span>
            <span className="font-semibold text-[#222222]">User Name</span>
          </div>
        </div>
        {message && (
          <p className="text-[12px] mt-4 text-center text-green-700">
            Your User name has been sent to your Mobile Number after matching
            our records. you will be redirected to the login page with in 10
            seconds.
          </p>
        )}
        <div className="relative h-14 rounded-md px-2 py-1 my-8">
          <div>
            <input
              type="text"
              id="floating_filled"
              className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
              placeholder=""
              {...register("mobile", {
                required: true,
              })}
            />
            <div
              htmlFor="floating_filled"
              className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
            >
              <img src={tablet} alt="" className="h-5 w-5" />
              <label htmlFor="" className="pl-2">
                Enter Mobile Number
              </label>
            </div>
          </div>
          {errors.mobile && (
            <div className="error text-red-600 font-medium text-sm">
              {errors?.mobile}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-[#1C4481] text-white font-medium h-12 w-full rounded-full"
        >
          Continue
        </button>
        <Link to={"/"}>
          <button className="bg-white text-[#E88686] border-2 border-[#E88686] my-4 font-medium h-12 w-full rounded-full">
            Cancel
          </button>
        </Link>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ForgetUsername;
