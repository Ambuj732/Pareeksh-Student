import { BLANK_MSG, TRY_AGAIN_MSG } from "../../constants";
import React, { useState, useRef, useEffect } from "react";
import arrowLeft from "../../assets/LoginScreen/arrowLeft.png";
import upload from "../../assets/LoginScreen/upload.png";
import { useNavigate } from "react-router";
import uploadPhoto from "../../actions/LoginScreens/uploadPhoto";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import SlidingMessage from "../ApiResponse";
import uploadImageTheory2 from "../../actions/LoginScreens/uploadImageTheory2";
import psyUploadImage from "../../actions/LoginScreens/psyUploadImage";

function UploadPhoto() {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const [error, setError] = useState("");

  const capturePhoto = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const uploadPhotoHandler = async () => {
    if (capturedImage) {
      var userData = JSON.parse(localStorage.getItem("ps_loguser"));
      var settings = JSON.parse(sessionStorage.pkshn_exam_set);
      const theory2_login = settings.theory2_login;
      const entered_psyc = settings.entered_psyc;
      console.log(entered_psyc);
      console.log(theory2_login);
      if (theory2_login === 1) {
        uploadImageTheory2(capturedImage, userData, settings["exam_id"])
          .then((response) => {
            if (response.status == 200) {
              const code = response?.data?.code;
              const message = response?.data?.status;
              if (code == 1000) {
                setError("Your photo captured successfully.");
                navigate("/welcome");
              } else {
                setError(typeof message === "string" ? message : "");
                return;
              }
            } else {
              setError("Please try again.");
              return;
            }
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
          });
      } else if (entered_psyc === 1) {
        console.log("Hi psycho");
        psyUploadImage(capturedImage, userData, settings["exam_id"])
          .then((response) => {
            if (response.status == 200) {
              const code = response?.data?.code;
              const message = response?.data?.status;
              if (code == 1000) {
                setError("Your photo captured successfully.");
                navigate("/welcome");
              } else {
                setError(typeof message === "string" ? message : "");
                return;
              }
            } else {
              setError("Please try again.");
              return;
            }
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
          });
      } else {
        // Call your upload function here
        uploadPhoto(capturedImage, userData, settings["exam_id"])
          .then((response) => {
            if (response.status == 200) {
              const code = response?.data?.code;
              const message = response?.data?.status;
              if (code == 1000) {
                setError("Your photo captured successfully.");
                navigate("/welcome");
              } else {
                setError(typeof message === "string" ? message : "");
                return;
              }
            } else {
              setError("Please try again.");
              return;
            }
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
          });
      }
    }
  };

  const handleBack = () => {
    if (capturedImage) {
      setCapturedImage(null);
    } else if (isWebcamOpen) {
      setIsWebcamOpen(false);
    } else {
      // Navigate back two steps
      navigate(-2);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  return (
    <div className="w-1/4 bg-white rounded-3xl right-64 absolute border h-auto p-4">
      <div className="flex justify-between items-center">
        <img
          src={arrowLeft}
          alt=""
          className="bg-[#1C4481] w-6 h-6 rounded-full cursor-pointer"
          onClick={handleBack}
        />
        <div className="flex flex-col items-end">
          <span className="font-semibold text-[#AFAFAF]">Candidate</span>
          <span className="font-semibold text-[#555555]">Panel</span>
        </div>
      </div>
      <div className="flex flex-col justify-between text-sm items-center gap-6 my-8">
        <span className="font-bold">Upload/Capture photo</span>
        {isWebcamOpen && !capturedImage && (
          <div className="w-full h-64 relative rounded-md overflow-hidden border border-gray-300">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode: "environment",
              }}
              className="absolute inset-0 w-full h-64"
            />
            <button
              onClick={capturePhoto}
              className="bg-[#1C4481] text-white w-1/2 h-10 rounded-full absolute bottom-4 left-1/2 transform -translate-x-1/2"
            >
              Capture
            </button>
          </div>
        )}
        {capturedImage && (
          <div className="flex flex-col items-center">
            <img
              src={capturedImage}
              alt="Captured"
              className="w-24 h-24 rounded-full"
            />
            <button
              onClick={retakePhoto}
              className="text-[#1C4481] mt-2 underline cursor-pointer"
            >
              Retake
            </button>
          </div>
        )}
        {!isWebcamOpen && !capturedImage && (
          <img
            src={upload}
            alt=""
            className="h-28 cursor-pointer"
            onClick={() => setIsWebcamOpen(true)}
          />
        )}
        <span className="text-center text-[12px] text-[#6C6C6C]">
          Once you click a picture it will show in this window. You can retake
          the picture by clicking on the camera icon.
        </span>
        {capturedImage && (
          <button
            onClick={uploadPhotoHandler}
            className="bg-[#1C4481] text-white w-1/2 h-10 rounded-full"
          >
            Upload
          </button>
        )}
      </div>
      {error && <SlidingMessage message={error} setError={setError} />}
    </div>
  );
}

export default UploadPhoto;
