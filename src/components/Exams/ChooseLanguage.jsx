import React from "react";
import arrowDown from "/arrowDown.png";

function ChooseLanguage() {
	return (
		<div className="flex flex-col text-sm">
			<span className="text-[#0C49CA] mb-1">Secondary Language</span>
			<span className="border rounded-md p-1 font-medium px-2 flex items-center justify-between">
				English
				<img src={arrowDown} alt="" className="h-2" />
			</span>
		</div>
	);
}

export default ChooseLanguage;
