import React from "react";
import notfound from "../../assets/Dashboard/notfound.png";

function QualificationPackNotFound() {
	return (
		<div className="flex items-center justify-center">
			<div className="min-h-96 pb-10 w-4/5 p-8 justify-between shadow-allBorder rounded-3xl flex flex-col items-center">
				<span className="text-2xl font-semibold text-[#0C49CA]">
					Qualifications Packs
				</span>
				<img src={notfound} alt="" className="h-28" />
				<div className="flex flex-col items-center gap-1 w-1/2">
					<span className="text-5xl font-bold">OPPs!</span>
					<span className="text-center text-sm">
						We didn’t find any qualification packs for you. You can
						check again to get qualification packs.
					</span>
				</div>
			</div>
		</div>
	);
}

export default QualificationPackNotFound;
