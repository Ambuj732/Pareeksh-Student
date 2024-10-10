import React from "react";
import { IoPerson } from "react-icons/io5";
import arrowLeft from "../../assets/LoginScreen/arrowLeft.png";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

function AadharVerify() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const aadharVerifyHandler = async () => {
    try {
      navigate("/welcome");
    } catch (error) {
      console.log("Error while verifying aadhar :: ", error);
    }
  };
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-1/4 bg-white rounded-3xl right-64 absolute border h-2/3 p-4">
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
      <form className="flex flex-col justify-between h-32 mt-8 px-2">
        <div className="border border-black rounded-md px-4 py-1">
          <div className="flex  items-center gap-2 text-[#1C4481]">
            <IoPerson />
            <span>Aadhar Number</span>
          </div>
          <input className="px-6">654123658987</input>
        </div>
        <button
          onClick={aadharVerifyHandler}
          className="bg-[#1C4481] rounded-3xl w-full h-10 font-medium text-white"
        >
          Verify
        </button>
      </form>
    </div>
  );
}

export default AadharVerify;
