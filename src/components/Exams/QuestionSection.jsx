import React, { useState, useEffect, memo } from "react";
import VideoPlayer from "./VideoPlayer";
import AudioPlayer from "./AudioPlayer";
import ImageQuestion from "./ImageQuestion";
import vivaQuestionIndex from "../../actions/Viva/vivaQuestionIndex";

const QuestionSection = memo(({ question }) => {
	console.log(question);

	let media = null;
	const mediaType = question?.media_type;
	if (mediaType === 1) {
		media = null;
	} else if (mediaType === 2) {
		media = (
			<img
				src={question?.media}
				alt={question?.question}
				className="h-2/3 max-w-full object-cover"
			/>
		);
	} else if (mediaType === 3) {
		media = (
			<audio controls>
				<source src={question?.media} type="audio/mpeg" />
			</audio>
		);
	} else if (mediaType === 4) {
		media = (
			<video controls className="h-full max-w-full p-3">
				<source src={question?.media}></source>
			</video>
		);
	}

	return (
		<div className="min-h-96 mb-8 flex flex-col gap-4">
			<span className="text-justify font-semibold">
				Q. {question?.question}
			</span>
			{media && (
				<div className="h-80 border border-black rounded-md flex items-center justify-center">
					{media}
				</div>
			)}
		</div>
	);
});

export default QuestionSection;
