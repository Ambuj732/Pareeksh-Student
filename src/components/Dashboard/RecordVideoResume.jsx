import React, { useState, useRef, useEffect } from "react";
import close from "../../assets/Dashboard/close.png";

const VideoRecorder = ({
	videoResumeModalClose,
	setVideoResume,
	updateVideoResumeHandler,
}) => {
	const videoRef = useRef(null);
	const mediaRecorderRef = useRef(null);
	const [recording, setRecording] = useState(false);
	const [recordedChunks, setRecordedChunks] = useState([]);
	const [videoUrl, setVideoUrl] = useState("");
	const [timer, setTimer] = useState(180);

	useEffect(() => {
		const initCamera = async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: true,
				});
				videoRef.current.srcObject = stream;
			} catch (err) {
				console.error("Error accessing webcam: ", err);
			}
		};

		initCamera();
	}, []);

	useEffect(() => {
		let timerInterval;
		if (recording && timer > 0) {
			timerInterval = setInterval(() => {
				setTimer((prevTimer) => prevTimer - 1);
			}, 1000);
		} else if (timer === 0) {
			stopRecording();
		}

		return () => clearInterval(timerInterval);
	}, [recording, timer]);

	const startRecording = () => {
		setRecording(true);
		setRecordedChunks([]);
		setTimer(180);
		const options = { mimeType: "video/webm; codecs=vp9" };
		const mediaRecorder = new MediaRecorder(
			videoRef.current.srcObject,
			options
		);

		mediaRecorder.ondataavailable = (event) => {
			if (event.data.size > 0) {
				setRecordedChunks((prev) => [...prev, event.data]);
			}
		};

		mediaRecorder.onstop = async () => {
			const blob = new Blob(recordedChunks, { type: "video/webm" });
			const url = URL.createObjectURL(blob);
			setVideoUrl(url);

			// Convert Blob to base64
			const reader = new FileReader();
			reader.readAsDataURL(blob);
			reader.onloadend = () => {
				const base64data = reader.result;
				setVideoResume(base64data);
			};
		};

		mediaRecorder.start();
		mediaRecorderRef.current = mediaRecorder;
	};

	const stopRecording = () => {
		setRecording(false);
		mediaRecorderRef.current.stop();
	};

	const reRecord = () => {
		setVideoUrl("");
		startRecording();
	};

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${
			remainingSeconds < 10 ? "0" : ""
		}${remainingSeconds}`;
	};

	return (
		<div className="flex h-screen w-screen items-center justify-center fixed top-0 left-0 z-50 bg-[#1C4481] bg-opacity-50">
			<div className="w-1/2 h-2/3 rounded-md shadow-md flex items-center justify-center gap-4 bg-slate-100 relative">
				<img
					className="mr-8 items-center mt-2 h-8 cursor-pointer top-2 right-0 absolute"
					src={close}
					onClick={videoResumeModalClose}
				/>
				<div className="flex flex-col items-center">
					{recording && (
						<h3 className="font-bold text-[#1C4481]">Recording</h3>
					)}
					<video
						ref={videoRef}
						autoPlay
						muted
						className="h-80 w-80"
					/>
					<div>
						{!recording && !videoUrl && (
							<button
								className="bg-[#1C4481] text-white px-4 py-1 rounded font-medium"
								onClick={startRecording}
							>
								Start Recording
							</button>
						)}
						{recording && (
							<button
								className="bg-[#1C4481] text-white px-4 py-1 rounded font-medium"
								onClick={stopRecording}
							>
								Stop Recording
							</button>
						)}
						{!recording && videoUrl && (
							<button
								className="bg-[#1C4481] text-white px-4 py-1 rounded font-medium"
								onClick={reRecord}
							>
								Re-Record
							</button>
						)}
					</div>
				</div>
				{recording && (
					<div className="font-bold text-red-800 text-xl">
						Time Remaining: {formatTime(timer)}
					</div>
				)}
				{videoUrl && (
					<div className="h-80 w-80 flex  flex-col items-center">
						<h3 className="font-bold text-[#1C4481]">
							Recorded Video
						</h3>
						<video
							src={videoUrl}
							controls
							style={{ width: "100%" }}
							autoPlay
						/>
						<button
							className="h-12 mt-4 text-center rounded-md bg-[#1C4481] text-white w-1/2 font-semibold"
							onClick={() => {
								videoResumeModalClose();
								updateVideoResumeHandler();
							}}
						>
							Upload
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default VideoRecorder;
