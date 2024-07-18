import React, { useEffect, useState } from "react";
import fileDock from "../../assets/LoginScreen/File_dock.png";
import videoPlay from "../../assets/LoginScreen/videoPlay.png";
import nextVideo from "../../assets/LoginScreen/nextVideo.png";
import getInstructions from "../../actions/LoginScreens/instructions";
import { Link } from "react-router-dom";
import GeneralInstruction from "./GeneralInstruction";

function Instruction() {
	const [pdfUrl, setPdfUrl] = useState("");
	const [videoInstruction, setVideoInstruction] = useState("");
	const [instruction, setInstruction] = useState("");
	const [loading, setLoading] = useState(true);
	const [response, setResponse] = useState("");
	const [open, setOpen] = useState(false);

	const onClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = {
					exam_id: 8551,
					student_id: 211037,
					streamvideo: 1,
					usercode: "i9lBY5euU0vw",
				};
				const response = await getInstructions(data);
				setPdfUrl(response?.data?.pdf_url);
				setVideoInstruction(response?.data?.video_link);
				setInstruction(response?.data?.instruction);
			} catch (error) {
				console.log("Error while getting instruction:", error);
			} finally {
				setLoading(false); // Set loading state to false regardless of success or failure
			}
		};

		fetchData();
	}, []);

	return (
		<div className="bg-[#EDF2FF] h-screen m-4 rounded-3xl flex justify-center relative items-center">
			<div className="bg-[#FFFFFF] relative min-h-[480px] w-2/3 rounded-3xl p-4 flex flex-col items-center">
				{!open && (
					<div className="flex flex-col items-center h-fit w-2/3">
						<h1 className="text-[#1C4481] font-bold text-4xl">
							Welcome!
						</h1>
						{!loading && pdfUrl && (
							<Link to={pdfUrl}>
								<div className="border-[#1C4481] rounded-3xl my-8 px-2 border-[4px] h-12 w-fit text-sm flex items-center gap-2">
									<img
										src={fileDock}
										alt=""
										className="h-8"
									/>
									<span className="font-bold text-[#1C4481]">
										Download Instruction
									</span>
								</div>
							</Link>
						)}
						<div className="flex flex-col items-center gap-2 w-full">
							<span className="font-bold">Video Instruction</span>
							{!loading && videoInstruction ? (
								<video
									className="h-72 w-2/3 rounded-xl"
									controls
									autoPlay={true}
									muted=""
								>
									<source
										src={videoInstruction}
										type="video/mp4"
									/>
								</video>
							) : (
								<img
									src={videoPlay}
									alt=""
									className="h-72 w-2/3"
								/>
							)}
						</div>
					</div>
				)}
				{open && instruction && (
					<GeneralInstruction
						instruction={instruction}
						onClose={onClose}
					/>
				)}
				{!open && (
					<button onClick={() => setOpen(true)}>
						<img
							src={nextVideo}
							alt=""
							className="absolute right-10 h-10 top-1/2"
						/>
					</button>
				)}
			</div>
			<button className="bg-[#1C4481] absolute bottom-1 h-10 w-1/6 rounded-3xl text-white font-medium m-1">
				Start Theory
			</button>
		</div>
	);
}

export default Instruction;
