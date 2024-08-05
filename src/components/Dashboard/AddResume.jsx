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
import updateResumeHeadline from "../../actions/Dashboard/updateResumeHeadline";
import { useSelector } from "react-redux";
import updateResume from "../../actions/Dashboard/updateResume";
import RecordVideoResume from "../../components/Dashboard/RecordVideoResume";

const AddResume = ({ onClose }) => {
  const user = useSelector((state) => state?.auth?.userData);
  console.log(user);
  const studentProfile = useSelector(
    (state) => state?.studentProfile?.studentProfileData
  );
  const { register, handleSubmit } = useForm();
  const [highestQualication, setHighestQualication] = useState([]);
  const [errors, setErrors] = useState({});
  const [videoResumeModal, setVideoResumeModal] = useState(false);
  const [videoResume, setVideoResume] = useState("");

  const videoResumeModalOpen = () => {
    setVideoResumeModal(true);
  };

  const videoResumeModalClose = () => {
    setVideoResumeModal(false);
  };

  const {
    register: registerResumeHeadline,
    handleSubmit: handleSubmitResumeHeadline,
  } = useForm();

  const { register: registerResume, handleSubmit: handleSubmitResume } =
    useForm();

  const {
    register: registerVideoResume,
    handleSubmit: handleSubmitVideoResume,
  } = useForm();

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

  const updateResumeHeadlineHandler = async (formData) => {
    try {
      console.log(formData);
      const data = {
        id_self_student: user?.id_self_student,
        usercode: user?.usercode,
        resume_headlines: formData?.headline,
      };
      console.log(data);
      const response = await updateResumeHeadline(data);
      console.log(response);
    } catch (error) {
      console.log("Error while updating resume headline :: ", error);
    }
  };

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  }

  const updateResumeHandler = async (formData) => {
    try {
      console.log(formData);
      const originalFile = formData?.resumeFile[0];
      const file = await fileToBase64(formData?.resumeFile[0]);
      let docType = 0;
      if (originalFile && originalFile.type === "application/pdf") {
        docType = 2;
      } else if (
        originalFile.type === "application/msword" ||
        originalFile.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        docType = 1;
      }
      const data = {
        id_self_student: user?.id_self_student,
        usercode: user?.usercode,
        file_name: formData?.resumeFile[0].name,
        doc_type: docType,
        file: file,
      };
      console.log(data);
      const response = await updateResume(data);
      console.log(response);
    } catch (error) {
      console.log("Error while updating resume :: ", error);
    }
  };

  const updateVideoResumeHandler = async () => {
    try {
      const data = {
        id_self_student: user?.id_self_student,
        usercode: user?.usercode,
        file_name: `VideoResume-${Math.floor(
          Math.random() * 10000
        )}.mp4`,
        doc_type: 3,
        file: videoResume,
      };
      console.log(data);
      const response = await updateResume(data);
      console.log(response);
    } catch (error) {
      console.log("Error while updating resume :: ", error);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center fixed top-0 left-0 z-50 bg-black bg-opacity-50 ">
      <div className="w-1/2 h-2/3 rounded-md shadow-md">
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
          <div>
            <h1 className="px-5 mt-4 font-semibold">
              Add Resume Headline
            </h1>
          </div>
          <hr className="border-black mt-1 mx-4"></hr>
          <form
            onSubmit={handleSubmitResumeHeadline(
              updateResumeHeadlineHandler
            )}
            className="flex flex-col gap-4"
          >
            <div className=" px-5 mt-7">
              <div className="relative h-12 w-full">
                <div>
                  <input
                    type="text"
                    id="floating_filled"
                    className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-grey-500 focus:outline-none focus:ring-0 peer"
                    placeholder=""
                    {...registerResumeHeadline("headline", {
                      required: true,
                    })}
                  />
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base pl-5 text-[#f1f2f3] dark:text-[#8b8e93] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#6c6d6f] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                    <label
                      htmlFor=""
                      className="pl-2 text-black"
                    >
                      Resume Headline
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="text-white font-sans text-lg  px-8 py-1 rounded-full bg-blue-800 w-1/4 mx-5"
            >
              Save
            </button>
          </form>
          <div>
            <h1 className="px-5 mt-4 font-semibold">Add Resume</h1>
          </div>
          <hr className="border-black mt-1 mx-4"></hr>
          <form
            onSubmit={handleSubmitResume(updateResumeHandler)}
            className="flex flex-col gap-2"
          >
            <div className="border mx-5 mt-3 h-12 flex items-center justify-center">
              <input
                type="file"
                id="resumeFile"
                {...registerResume("resumeFile")}
              />
              <label
                htmlFor="resumeFile"
                className="text-[#1C4481]"
              >
                Upload Resume (docs/pdf)
              </label>
            </div>
            <button
              type="submit"
              className="text-white font-sans text-lg  px-8 py-1 rounded-full bg-blue-800 w-1/4 mx-5"
            >
              Save
            </button>
          </form>
          <div>
            <h1 className="px-5 mt-4 font-semibold">
              Add Video Resume
            </h1>
          </div>
          <hr className="border-black mt-1 mx-4"></hr>
          <div className="flex flex-col gap-2">
            <div
              onClick={videoResumeModalOpen}
              className="h-14 mx-5 border rounded-md text-white text-xl font-semibold cursor-pointer mt-3 bg-[#1C4481] flex justify-center items-center mb-4"
            >
              <span>Record</span>
            </div>
          </div>
        </div>
      </div>
      {videoResumeModal && (
        <RecordVideoResume
          videoResumeModalClose={videoResumeModalClose}
          setVideoResume={setVideoResume}
          updateVideoResumeHandler={updateVideoResumeHandler}
        />
      )}
    </div>
  );
};

export default AddResume;
