import React, { useState } from "react";
import avatar from "/avatar.png";
// import CorporateHackathonSidebar from "../CorporateHackathonSidebar";
import close from "../../assets/Hackathon/close.png";
import twoperson from "../../assets/Hackathon/twoperson.png";
import bannertitle from "../../assets/Hackathon/bannertitle.png";
import arrowDown from "../../assets/Hackathon/arrowDown.png";
import time from "../../assets/Hackathon/time.png";
import bannersize from "../../assets/Hackathon/bannersize.png";
import edit from "../../assets/Hackathon/edit.png";
import { useForm } from "react-hook-form";
import userProfile from "../../assets/LoginScreen/userProfile.png";

function CorporateHackathonDashboard2() {
  const { register, handleSubmit } = useForm();

  return (
    <div className="h-screen flex overflow-hidden">
      {/* <CorporateHackathonSidebar /> */}
      <div className="w-5/6 p-4 overflow-y-scroll no-scrollbar">
        <div className="bg-[#EDF2FF] min-h-screen flex justify-center items-center rounded-3xl">
          <div className="bg-white min-h-screen ps-8 flex flex-col gap-6 py-4 pe-4 w-full m-4 rounded-3xl">
            <div className="w-full flex justify-between items-center">
              <span className="text-xl font-medium text-[#1C4481]">
                Create Hackathon
              </span>
              <img src={close} alt="" className="h-7" />
            </div>
            <div className="flex  px-6 ">
              <div className="w-full relative h-12 ">
                <input
                  type="text"
                  id="floating_filled"
                  className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                  placeholder=""
                  {...register("Add Title", { required: true })}
                />
                <div
                  htmlFor="floating_filled"
                  className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                >
                  <img src={twoperson} alt="" className="h-5 w-5" />
                  <label htmlFor="" className="pl-2">
                    Add Title
                  </label>
                </div>
              </div>
            </div>
            <div className="flex items-center w-full justify-around">
              <div className="flex items-center justify-center mx-7 mt-4 gap-10">
                <input
                  id="default-radio-1"
                  type="radio"
                  value=""
                  name="fresher"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-white-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-radio-1"
                  class="ms-2 text-2xl font-semibold text-gray-900 dark:text-gray-300"
                >
                  Free
                </label>
                <div class="flex items-center">
                  <input
                    checked
                    id="default-radio-2"
                    type="radio"
                    value=""
                    name="fresher"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-radio-2"
                    class="ms-2 text-2xl font-semibold text-gray-900 dark:text-gray-300"
                  >
                    Paid
                  </label>
                </div>
              </div>
              <div className="relative h-12 flex grow">
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
                    <label htmlFor="" className="pl-2">
                      {" "}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="bg-[#E7F0FF] px-4 py-2 rounded-md text-[#1C4481] font-medium">
                <span>Add Banner</span>
              </div>
              <div className="flex gap-5 justify-around px-5 mt-7">
                <div className="relative h-12 w-1/2">
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
                      <img src={bannertitle} />
                      <label htmlFor="" className="pl-2">
                        Banner Title
                      </label>
                    </div>
                  </div>
                </div>
                <div className="relative h-12 w-1/2">
                  <div>
                    <input
                      type="date"
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
                      <img src={bannertitle} />

                      <label htmlFor="" className="pl-2">
                        Time
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <span className="font-medium mt-7">Banner Image</span>
              <div className="flex gap-5 justify-around px-4 mt-2 mb-10">
                <div className="relative flex flex-col h-12 w-1/2">
                  <div>
                    <input
                      type="file"
                      id="floating_filled"
                      className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                      placeholder="Banner Size - 800x400px"
                      {...register("username", {
                        required: true,
                      })}
                    />
                    <div
                      htmlFor="floating_filled"
                      className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                    >
                      <img src={bannertitle} />
                      <label htmlFor="" className="pl-2">
                        Select Banner Image
                      </label>
                    </div>
                  </div>
                  <span className="text-[12px] text-[#848484]">
                    Supported formats PNG, JPEG and File size max.5 mb
                  </span>
                </div>
                <div className="relative flex flex-col h-12 mb-4 w-1/2">
                  <div className="">
                    <input
                      type="file"
                      id="floating_filled"
                      className=" block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                      placeholder=""
                      {...register("username", {
                        required: true,
                      })}
                    />
                    <div
                      htmlFor="floating_filled"
                      className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                    >
                      <img src={bannertitle} />

                      <label htmlFor="" className="pl-2">
                        Upload file
                      </label>
                    </div>
                  </div>
                  <span className="text-[12px] text-[#848484]">
                    Supported formats PNG, JPEG and File size max.5 mb
                  </span>
                </div>
              </div>
              <div className="relative h-12 px-4 w-1/2">
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
                    <img src={bannersize} />
                    <label htmlFor="" className="pl-2">
                      Download Sample Banner
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex px-4 ">
                <div className="w-full relative h-12 ">
                  <input
                    type="text"
                    id="floating_filled"
                    className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                    placeholder=""
                    {...register("Add Title", { required: true })}
                  />
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <img src={edit} alt="" className="h-5 w-5" />
                    <label htmlFor="" className="pl-2">
                      Edit
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CorporateHackathonDashboard2;
