import { BLANK_MSG, TRY_AGAIN_MSG } from "../../constants";
import React, { useState, useRef } from "react";
import arrowLeft from "../../assets/LoginScreen/arrowLeft.png";
import idcard from "../../assets/LoginScreen/idcard.png";
import Webcam from "react-webcam";
import { useNavigate } from "react-router";
import uploadIdPhoto from "../../actions/LoginScreens/uploadIdPhoto";
import SlidingMessage from "../ApiResponse";

function UploadIDPhoto() {
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const webcamRef = useRef(null);
	const [capturedImage, setCapturedImage] = useState(null);
	const [isWebcamOpen, setIsWebcamOpen] = useState(false);

	const capturePhoto = () => {
		const imageSrc = webcamRef.current.getScreenshot();
		setCapturedImage(imageSrc);
	};

	const handleBack = () => {
		if (capturedImage) {
			setCapturedImage(null);
		} else if (isWebcamOpen) {
			setIsWebcamOpen(false);
		} else {
			navigate(-2);
		}
	};

	const uploadIdPhotoHandler = async () => {
		if (capturedImage) {
			var userData = JSON.parse(localStorage.getItem("ps_loguser"));
			var settings = JSON.parse(sessionStorage.pkshn_exam_set);
			// Call your upload function here
			uploadIdPhoto(capturedImage, userData, settings["exam_id"])
				.then((response) => {
					console.log(response.status);
					console.log(response.data.code);
					if (response.status == 200) {
						const code = response?.data?.code;
						if (code == 1000) {
							setError(
								"Your ID photo captured successfully. You will be redirected to capture your photo."
							);
							navigate(
								"/login-with-passcode/upload-photo"
							);
						} else {
							setError(message);
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
	};

	const retakePhoto = () => {
		setCapturedImage(null);
	};

	return (
		<div className="w-1/4 bg-white rounded-3xl right-64 absolute border h-2/3 p-4">
			<div className="flex justify-between items-center">
				<img
					src={arrowLeft}
					alt=""
					className="bg-[#1C4481] w-6 h-6 rounded-full cursor-pointer"
					onClick={handleBack}
				/>
				<div className="flex flex-col items-end">
					<span className="font-semibold text-[#AFAFAF]">
						Candidate
					</span>
					<span className="font-semibold text-[#555555]">Panel</span>
				</div>
			</div>
			<div className="flex flex-col justify-between text-sm items-center gap-6 my-8">
				<span className="font-bold">Upload/Capture ID Card</span>
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
					<div className="flex flex-col items-center">
						<img
							src={idcard}
							alt=""
							className="h-28 cursor-pointer"
							onClick={() => setIsWebcamOpen(true)}
						/>
						<span className="text-center text-[12px] text-[#6C6C6C]">
							Lorem Ipsum is simply dummy text of the printing and
							typesetting industry.
						</span>
					</div>
				)}
				{capturedImage && (
					<button
						onClick={uploadIdPhotoHandler}
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

export default UploadIDPhoto;
