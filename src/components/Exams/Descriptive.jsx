import React from "react";
import radioBtn from "../../assets/LoginScreen/radioBtn.png";
import option from "../../assets/LoginScreen/option.png";
import arrowDown from "../../assets/LoginScreen/arrowDown.png";
import mic from "../../assets/LoginScreen/mic.png";

function Descriptive() {
	return (
		<div className="flex flex-col gap-4">
			<span className="text-sm">
				To Use the speech to text feature, Please select your preferred
				language and clicking on the start button. You can click on the
				stop button to Stop Speech
			</span>
			<div className="flex">
				<div className="flex flex-col h-24 w-32 text-sm p-3 justify-between bg-white rounded-md">
					<div className="flex  items-center gap-2">
						<img src={radioBtn} alt="" className="h-4 w-4" />
						<span className="font-medium">Text</span>
					</div>
					<div className="flex  items-center gap-2">
						<img src={option} alt="" className="h-4 w-4" />
						<span className="font-medium">Canvas</span>
					</div>
				</div>
				<div className="bg-white h-24 w-full ml-4 text-sm p-2 rounded-md">
					<span>Select language to speak</span>
					<div className="flex justify-between">
						<div className="h-16 py-1 flex flex-col justify-between">
							<span className="text-[#0C49CA]">
								Primary Language
							</span>
							<div className="flex items-center justify-between w-28 border px-2 border-black rounded-md py-1">
								<span className="text-base">English</span>
								<img src={arrowDown} alt="" />
							</div>
						</div>
						<div className="h-16 py-1 flex flex-col justify-between ">
							<span className="text-[#0C49CA]">
								Secondary Language
							</span>
							<div className="flex items-center justify-between w-28 border px-2 border-black rounded-md py-1">
								<span className="text-base">Hindi</span>
								<img src={arrowDown} alt="" />
							</div>
						</div>
						<div className="h-10 bg-[#1C4481] w-20 gap-2 text-white rounded-md flex justify-center items-center self-end">
							<img src={mic} alt="" className="h-6" />
							<span className="text-base">Start</span>
						</div>
					</div>
				</div>
			</div>
			<div className="h-80 w-full text-sm bg-white p-4 border rounded-lg">
				<span>Enter text here...</span>
			</div>
			<div className="flex items-center gap-2 text-sm font-medium">
				<div className="px-4 rounded-md text-white h-8 flex items-center justify-center bg-[#1C4481]">
					<span>Choose File</span>
				</div>
				<span className="text-sm ">
					No File Chosen{" "}
					<span className="text-[#B0B0B0]">
						(Allow Photo, Doc, PDF, Max size 1 MB)
					</span>
				</span>
			</div>
		</div>
	);
}

export default Descriptive;
