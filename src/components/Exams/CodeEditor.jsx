// MonacoEditorComponent.js
import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const MonacoEditorComponent = ({ setCode }) => {
	const [language, setLanguage] = useState("javascript");

	const handleLanguageChange = (event) => {
		setLanguage(event.target.value);
	};

	const handleEditorChange = (value, event) => {
		console.log(value);
		setCode(value);
	};

	return (
		<div className="flex flex-col gap-4">
			<select
				onChange={handleLanguageChange}
				value={language}
				className="border border-[#1C4481]"
			>
				<option value="cpp">C++</option>
				<option value="java">Java</option>
				<option value="python">Python</option>
				<option value="javascript">JavaScript</option>
			</select>

			<Editor
				height="90vh"
				defaultLanguage={language}
				defaultValue="// Write your code here"
				language={language}
				className="border border-[#1C4481]"
				onChange={handleEditorChange}
			/>
		</div>
	);
};

export default MonacoEditorComponent;
