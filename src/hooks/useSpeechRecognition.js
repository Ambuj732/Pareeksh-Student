import { useState, useEffect, useRef } from "react";

const useSpeechRecognition = () => {
	const [listening, setListening] = useState(false);
	const [transcript, setTranscript] = useState("");
	const [isStoppedSpeechRecog, setIsStoppedSpeechRecog] = useState(false);
	const recognitionRef = useRef(null);
	let tempWords = useRef("");

	useEffect(() => {
		if (!("webkitSpeechRecognition" in window)) {
			console.error("Browser does not support speech recognition.");
			return;
		}

		const recognition = new window.webkitSpeechRecognition();
		recognitionRef.current = recognition;

		recognition.interimResults = true;
		recognition.lang = "en-US";

		recognition.addEventListener("result", (e) => {
			const transcript = Array.from(e.results)
				.map((result) => result[0])
				.map((result) => result.transcript)
				.join("");
			if (transcript !== undefined) {
				tempWords.current = transcript;
			}
		});

		recognition.addEventListener("end", () => {
			if (isStoppedSpeechRecog) {
				recognition.stop();
				console.log("End speech recognition");
			} else {
				wordConcat();
				recognition.start();
			}
		});

		return () => {
			recognition.stop();
			recognitionRef.current = null;
		};
	}, [isStoppedSpeechRecog]);

	const startListening = (speakLang = "en-US") => {
		setIsStoppedSpeechRecog(false);
		if (recognitionRef.current) {
			recognitionRef.current.lang = speakLang;
			recognitionRef.current.start();
			setListening(true);
			console.log("Speech recognition started");
		}
	};

	const stopListening = () => {
		setIsStoppedSpeechRecog(true);
		setListening(false);
		wordConcat();
		if (recognitionRef.current) {
			recognitionRef.current.stop();
			console.log("End speech recognition");
		}
	};

	const wordConcat = () => {
		setTranscript(
			(prevTranscript) => prevTranscript + " " + tempWords.current + "."
		);
		tempWords.current = "";
	};

	const resetTranscript = () => {
		setTranscript("");
	};

	return {
		transcript,
		listening,
		startListening,
		stopListening,
		resetTranscript,
	};
};

export default useSpeechRecognition;
