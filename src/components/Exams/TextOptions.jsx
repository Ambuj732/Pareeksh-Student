import React, { useEffect, useState, memo } from "react";

const TextOptions = memo(
	({ question, setSelectedAnswer, selectedAnswer, mso }) => {
		const [options, setOptions] = useState(question?.options);
		const [selectedOptions, setSelectedOptions] = useState([]);

		useEffect(() => {
			setOptions(question?.options);
			console.log(selectedAnswer);
		}, [question?.options]);

		useEffect(() => {
			if (mso && selectedAnswer) {
				console.log(selectedAnswer);
				let selectedOptionArray = String(selectedAnswer).split(",");
				selectedOptionArray = selectedOptionArray?.map((option) =>
					Number(option)
				);
				console.log(selectedOptionArray);
				setSelectedOptions(selectedOptionArray);
			}
		}, [selectedAnswer, mso]);

		console.log(options);

		const optionsNumbering = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

		const setSelectedOptionsHandler = (optionId) => {
			const alreadySelected = selectedOptions?.includes(optionId);
			let newSelectedOptions = [...selectedOptions];
			if (alreadySelected) {
				newSelectedOptions = selectedOptions?.filter(
					(option) => option != optionId
				);
			} else newSelectedOptions?.push(optionId);
			const str = newSelectedOptions.join(",");
			console.log(str);
			setSelectedAnswer(str);
			setSelectedOptions(newSelectedOptions);
			console.log(newSelectedOptions);
		};

		const isSelected = (optionId) => {
			if (selectedOptions?.includes(optionId)) return true;
			else return false;
		};

		return (
			<div className="flex flex-col gap-6">
				{options?.map((option, index) => {
					const mediaType = option?.media_type;
					let media = null;
					if (mediaType === 1) {
						media = null;
					} else if (mediaType === 2) {
						media = (
							<img
								src={option?.upload_media}
								alt={option?.option}
								className="max-w-80 max-h-36"
							/>
						);
					} else if (mediaType === 3) {
						media = (
							<audio controls>
								<source
									src={option?.upload_media}
									type="audio/mpeg"
								/>
							</audio>
						);
					} else if (mediaType === 4) {
						media = (
							<video>
								<source src={option?.upload_media}></source>
							</video>
						);
					}
					return (
						<div
							key={option?.option_id}
							className="flex items-center gap-8 group"
							onClick={() => {
								if (mso) {
									setSelectedOptionsHandler(
										option?.option_id
									);
								} else {
									setSelectedAnswer(option?.option_id);
								}
							}}
						>
							<div
								className={`h-10 w-10 rounded-full flex items-center justify-center border-2 border-black group-hover:bg-[#1C4481] group-hover:text-white group-hover:border-none cursor-pointer ${
									mso
										? isSelected(option?.option_id)
											? "bg-[#1C4481] text-white border-none"
											: "border-black group-hover:bg-[#1C4481] group-hover:text-white group-hover:border-none"
										: selectedAnswer === option?.option_id
										? "text-white bg-[#1C4481] border-none"
										: "border-black group-hover:bg-[#1C4481] group-hover:text-white group-hover:border-none"
								}`}
							>
								<span className="text-xl font-semibold">
									{optionsNumbering[index]}
								</span>
							</div>
							<div
								className={`h-14 w-5/6 border  bg-white ${
									media ? "rounded-md" : "rounded-full"
								} flex items-center justify-center ${
									media ? "flex-col h-fit py-2" : "h-14"
								} cursor-pointer ${
									mso
										? isSelected(option?.option_id)
											? "border-2 border-[#1C4481] bg-white"
											: "border group-hover:border-2 group-hover:border-[#1C4481]"
										: selectedAnswer === option?.option_id
										? "border-2 border-[#1C4481] bg-white"
										: "border group-hover:border-2 group-hover:border-[#1C4481]"
								}`}
							>
								<span>{option?.option}</span>
								{media}
								{
									// media type
									// text - 1
									// image - 2
									// audio - 3
									// video - 4
								}
							</div>
						</div>
					);
				})}
			</div>
		);

		// <div className="flex items-center gap-8">
		// 	<div className="h-10 w-10 rounded-full flex items-center justify-center text-white bg-[#1C4481]">
		// 		<span className="text-xl font-semibold">B</span>
		// 	</div>
		// 	<div className="h-14 w-5/6 border-2 border-[#1C4481] bg-white rounded-full flex items-center justify-center">
		// 		<span>
		// 			Lorem ipsum dolor sit amet consectetur adipisicing elit.
		// 		</span>
		// 	</div>
		// </div>;
	}
);

export default TextOptions;
