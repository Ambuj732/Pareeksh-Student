import React from "react";
import nextVideo from "../../assets/LoginScreen/nextVideo.png";

function GeneralInstruction({ instruction, onClose }) {
	return (
		<div className="flex items-center justify-center h-full w-full">
			<button onClick={onClose}>
				<img
					src={nextVideo}
					alt=""
					className="absolute left-10 h-10 top-1/2 scale-x-[-1]"
				/>
			</button>
			<div className="h-96 rounded-3xl p-8 bg-[#F3F3F3] w-2/3 ">
				<h1 className="text-[#0C49CA] text-lg font-bold">
					General Instruction
				</h1>
				<div className="mt-2 font-medium">
					<span>{instruction}</span>
				</div>
			</div>
		</div>
	);
}

export default GeneralInstruction;
