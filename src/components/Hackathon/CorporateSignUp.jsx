import React from "react";
import leftBg from "/leftBg.jpg";
import { BsThreeDots } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import { VscEye } from "react-icons/vsc";
import { LuSquareAsterisk } from "react-icons/lu";
import { FaCircleExclamation } from "react-icons/fa6";
import exam from "/exam.png";
import books from "/books.png";
import cap from "/cap.png";
import bulb from "/bulb.png";
import building from "/building.png";
import arrowLeft from "/arrowLeft.png";
import { FaAngleDown } from "react-icons/fa6";
import gender from "/gender.png";
import { FaRegCalendar } from "react-icons/fa";
import user from "/User.png";
import tablet from "/Tablet.png";
import message from "/message.png";
import date from "/date.png";
import userProfile from "/userProfile.png";
import viewHideIcon from "/View_hide_light.png";
import { Navigate, useNavigate } from "react-router";

function CorporateSignUp() {
  const handleBack = () => {
    Navigate(-1);
  };

  return (
    <div className="min-h-screen relative w-full lg:w-1/2 flex justify-center items-center">
      <div className="absolute inset-0 z-[-1] overflow-hidden min-h-screen">
        <img
          src={leftBg}
          alt=""
          className="w-full h-full absolute inset-0 object-fill cursor-pointer"
        />
      </div>
      <div className="bg-[#ffffff] h-4/5 w-3/4 lg:w-4/5 xl:w-2/3 rounded-3xl p-6 flex flex-col gap-4 relative z-10">
        <div className="flex justify-between items-center">
          <img
            src={arrowLeft}
            alt=""
            className="bg-[#1C4481] w-6 h-6 rounded-full"
            onClick={handleBack}
          />
          <div className="flex flex-col items-end">
            <span className="font-semibold text-[#AFAFAF]">Create</span>
            <span className="font-semibold text-[#222222]">an Account</span>
          </div>
        </div>
        <div className="border border-black h-12 rounded-md px-2 py-1 flex justify-between items-center">
          <div className="flex text-sm items-center gap-2 text-[#1C4481]">
            <img src={userProfile} alt="" className="h-5 w-5" />
            <input className="outline-none" placeholder={"Name*"}></input>
          </div>
        </div>
        <div className="border border-black h-12 rounded-md px-2 py-1 flex justify-between items-center">
          <div className="flex items-center text-sm gap-2 text-[#1C4481]">
            <img src={message} alt="" className="h-5 w-5" />
            <input className="outline-none" placeholder={"Email*"}></input>
          </div>
        </div>
        <div className="border border-black h-12 rounded-md px-2 py-1 flex justify-between items-center">
          <div className="flex items-center text-sm gap-2 text-[#1C4481]">
            <img src={tablet} alt="" className="h-5 w-5" />
            <input
              className="outline-none"
              placeholder={"Mobile Number*"}
            ></input>
          </div>
        </div>
        <div className="border border-black h-12 rounded-md px-2 py-1 flex justify-between items-center">
          <div className="flex items-center text-sm gap-2 text-[#1C4481]">
            <img src={userProfile} alt="" className="h-5 w-5" />
            <input className="outline-none" placeholder={"Location"}></input>
          </div>
        </div>
        <div className="border border-black h-12 rounded-md px-2 py-1 flex justify-between items-center">
          <div className="flex items-center text-sm gap-2 text-[#1C4481]">
            <img src={userProfile} alt="" className="h-5 w-5" />
            <input className="outline-none" placeholder={"User ID*"}></input>
          </div>
        </div>
        <div className="border border-black h-12 rounded-md px-2 py-1 flex justify-between items-center">
          <div className="flex items-center text-sm gap-2 text-[#1C4481]">
            <img src={message} alt="" className="h-5 w-5" />
            <input className="outline-none" placeholder={"Password*"}></input>
          </div>
          <div className="flex items-center justify-between">
            <img src={viewHideIcon} alt="" className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CorporateSignUp;
