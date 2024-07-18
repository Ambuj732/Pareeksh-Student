import React from "react";
import image from "../../assets/LoginScreen/image.png";

function ImageOptions() {
	return (
		<div className="flex flex-col gap-8">
			<div className="flex justify-between">
				<div className="flex items-center gap-4">
					<div className="h-10 w-10 rounded-full flex items-center justify-center border-2 border-black">
						<span className="text-xl font-semibold">A</span>
					</div>
					<img src={image} alt="" className="h-48" />
				</div>
				<div className="flex items-center gap-4">
					<div className="h-10 w-10 rounded-full flex items-center justify-center border-2 border-black">
						<span className="text-xl font-semibold">B</span>
					</div>
					<img src={image} alt="" className="h-48" />
				</div>
			</div>
			<div className="flex justify-between">
				<div className="flex items-center gap-4">
					<div className="h-10 w-10 rounded-full flex items-center justify-center border-2 border-black">
						<span className="text-xl font-semibold">C</span>
					</div>
					<img src={image} alt="" className="h-48" />
				</div>
				<div className="flex items-center gap-4">
					<div className="h-10 w-10 rounded-full flex items-center justify-center border-2 border-black">
						<span className="text-xl font-semibold">D</span>
					</div>
					<img src={image} alt="" className="h-48" />
				</div>
			</div>
		</div>
	);
}

export default ImageOptions;
