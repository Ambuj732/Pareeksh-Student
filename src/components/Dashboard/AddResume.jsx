import React, { useState, useEffect } from "react";
import close from "../../assets/Dashboard/close.png";
import { DiVim } from "react-icons/di";
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
import { FaAngleDown } from "react-icons/fa6";
import message from "../../assets/LoginScreen/message.png";
import getHighQualList from "../../actions/LoginScreens/getHighQualList";

const AddResume = ({ onClose }) => {
  const { register, handleSubmit } = useForm();
  const [highestQualication, setHighestQualication] = useState([]);
  const [errors, setErrors] = useState({});

  const preData = async () => {
    try {
      const highQual = await getHighQualList();
      setHighestQualication(highQual?.data?.high_qual);
    } catch (error) {
      console.log(
        "Error while getting highest qualification or states :: ",
        error
      );
    }
  };

  useEffect(() => {
    preData();
  }, []);
  return (
    <div className="flex h-screen w-screen items-center justify-center  fixed top-0 left-0 z-50 bg-black bg-opacity-50 ">
      <div className="w-1/2 h-2/3 rounded-md shadow-md ">
        <div className="flex justify-between items-center bg-blue-100  rounded-t-md h-12">
          <h1 className="ml-8 items-center mt-3 font-semibold text-blue-800">
            Add Resume
          </h1>
          <img
            className="mr-8 items-center mt-2 h-8  cursor-pointer"
            src={close}
            onClick={onClose}
          />
        </div>
        <div className="overflow-y-scroll h-[90%] bg-white">
          <form>
            <div className=" px-5 mt-7">
              <div className="relative h-12 w-full">
                <div>
                  <input
                    type="text"
                    id="floating_filled"
                    className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-grey-500 focus:outline-none focus:ring-0 peer"
                    placeholder=""
                    {...register("username", {
                      required: true,
                    })}
                  />
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base pl-5 text-[#f1f2f3] dark:text-[#8b8e93] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#6c6d6f] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                    <label htmlFor="" className="pl-2">
                      Resume Headline
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddResume;
