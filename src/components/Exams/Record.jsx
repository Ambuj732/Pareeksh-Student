import React, { useState, useRef, useEffect } from "react";
import RecordRTC from "recordrtc";
import recordAudio from "../../assets/LoginScreen/recordAudio.png";
import recordVideo from "../../assets/LoginScreen/recordVideo.png";
import Swal from "sweetalert2";
import play from "../../assets/Exam/play.png";

function Record({ setVivaAnswer, setAnswerType, vivaAnswer, answerType }) {
	const [isRecordingAudio, setIsRecordingAudio] = useState(false);
	const [isRecordingVideo, setIsRecordingVideo] = useState(false);
	const [audioURL, setAudioURL] = useState("");
	const [videoURL, setVideoURL] = useState("");
	const audioRecorderRef = useRef(null);
	const videoRecorderRef = useRef(null);

	useEffect(() => {
		console.log(vivaAnswer);
		console.log(answerType);
		if (!vivaAnswer && !answerType) {
			setAudioURL("");
			setVideoURL("");
		} else if (answerType == 1) {
			console.log(vivaAnswer);
			setAudioURL(vivaAnswer);
			setVideoURL("");
		} else if (answerType == 2) {
			console.log(vivaAnswer);
			setAudioURL("");
			setVideoURL(vivaAnswer);
		}
	}, [vivaAnswer, answerType]);

	const startAudioRecording = async () => {
		setIsRecordingAudio(true);
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: true,
		});
		audioRecorderRef.current = new RecordRTC(stream, { type: "audio" });
		if (videoURL) Swal.fire("Media is re-recording now!");
		setAudioURL("");
		setVideoURL("");
		setVivaAnswer("");
		audioRecorderRef.current.startRecording();
	};

	const stopAudioRecording = () => {
		setIsRecordingAudio(false);
		audioRecorderRef.current.stopRecording(() => {
			const audioBlob = audioRecorderRef.current.getBlob();
			const audioUrl = URL.createObjectURL(audioBlob);
			setAudioURL(audioUrl);
			// Convert blob to Base64 with MIME type audio/wav
			const reader = new FileReader();
			const newBlob = new Blob([audioBlob], { type: "audio/wav" });
			reader.readAsDataURL(newBlob);
			reader.onloadend = () => {
				const base64data = reader.result;
				setVivaAnswer(base64data);
				setAnswerType("audio");
			};
		});
	};

	const startVideoRecording = async () => {
		setIsRecordingVideo(true);
		const stream = await navigator.mediaDevices.getUserMedia({
			video: true,
		});
		videoRecorderRef.current = new RecordRTC(stream, { type: "video" });
		if (audioURL) Swal.fire("Media is re-recording now!");
		setAudioURL("");
		setVideoURL("");
		setVivaAnswer("");
		videoRecorderRef.current.startRecording();
	};

	const stopVideoRecording = () => {
		setIsRecordingVideo(false);
		videoRecorderRef.current.stopRecording(() => {
			const videoBlob = videoRecorderRef.current.getBlob();
			const videoUrl = URL.createObjectURL(videoBlob);
			setVideoURL(videoUrl);
			const reader = new FileReader();
			const newBlob = new Blob([videoBlob], { type: "video/webm" });
			reader.readAsDataURL(newBlob);
			reader.onloadend = () => {
				const base64data = reader.result;
				setVivaAnswer(base64data);
				setAnswerType("video");
			};
		});
	};

	return (
		<div className="min-h-96 flex flex-col items-center gap-16">
			<div
				className={` ${
					isRecordingAudio || audioURL
						? "w-3/4 h-fit p-4"
						: "w-1/2 h-60"
				} rounded-[60px] bg-white flex items-center justify-center shadow-2xl flex-col gap-6 transition-all duration-700`}
			>
				<span className="text-xl text-[#1C4481] font-medium">
					Record Audio
				</span>
				{audioURL && (
					<div className="w-full flex items-center flex-col">
						{" "}
						<audio
							src={audioURL}
							controls
							className="w-full py-2 px-6"
							preload="auto"
						/>
						<span className="text-sm">
							Click this play button to listen recorded audio
						</span>
					</div>
				)}
				<div className="w-24 h-24 rounded-full shadow-completedHackathon xl bg-white flex items-center justify-center">
					<div className="bg-[#1C4481] rounded-full h-16 w-16 flex items-center justify-center">
						<img
							src={isRecordingAudio ? play : recordAudio}
							alt=""
							className={`cursor-pointer z-10 transition-all duration-700 ${
								isRecordingAudio
									? "h-8 w-8 object-cover"
									: "h-16 w-16"
							}`}
							onClick={
								isRecordingAudio
									? stopAudioRecording
									: startAudioRecording
							}
						/>
					</div>
				</div>
				<span className="text-sm font-medium">
					{isRecordingAudio
						? "Click this icon to stop recording audio"
						: audioURL
						? "Click this icon to re-record audio"
						: "Click this icon to record audio"}
				</span>
			</div>
			<div
				className={` ${
					isRecordingVideo || videoURL
						? "w-3/4 h-fit p-4"
						: "w-1/2 h-60"
				} rounded-[60px] bg-white flex items-center justify-center shadow-2xl flex-col gap-6 transition-all duration-700`}
			>
				<span className="text-xl text-[#1C4481] font-medium">
					Record Video
				</span>
				{videoURL && (
					<video className="w-3/4 p-2" controls preload="auto">
						<source src={videoURL} type="video/webm" />
					</video>
				)}
				<div className="w-24 h-24 rounded-full shadow-completedHackathon xl bg-white flex items-center justify-center">
					<div className="bg-[#1C4481] rounded-full h-16 w-16 flex items-center justify-center">
						<img
							src={isRecordingVideo ? play : recordVideo}
							alt=""
							className={` cursor-pointer z-10 transition-all duration-700 ${
								isRecordingVideo
									? "h-8 w-8 object-cover"
									: "h-16 w-16"
							}`}
							onClick={
								isRecordingVideo
									? stopVideoRecording
									: startVideoRecording
							}
						/>
					</div>
				</div>
				<span className="text-sm font-medium">
					{isRecordingVideo
						? "Click this icon to stop recording video"
						: videoURL
						? "Click this icon to re-record video"
						: "Click this icon to record video"}
				</span>
			</div>
		</div>
	);
}

export default Record;
