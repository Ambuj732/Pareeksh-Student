import { useState, useEffect, useRef } from "react";

const useSpeechRecognition = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState(""); // Holds final transcript
  const [isStoppedSpeechRecog, setIsStoppedSpeechRecog] = useState(false);
  const recognitionRef = useRef(null);
  const tempWords = useRef("");
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.error("Browser does not support speech recognition.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognitionRef.current = recognition;

    recognition.interimResults = true; // Capture interim results (partial transcripts)
    recognition.lang = "en-IN"; // Set language to English (Indian accent)

    // Event listener for when speech recognition detects results
    recognition.addEventListener("result", (e) => {
      const interimTranscript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");

      console.log("Interim result:", interimTranscript);
      if (interimTranscript) {
        tempWords.current = interimTranscript;
      }
    });

    // Event listener for when recognition ends
    recognition.addEventListener("end", () => {
      if (isStoppedSpeechRecog) {
        recognition.stop();
        console.log("Speech recognition stopped");
      } else {
        if (tempWords.current.trim() !== "") {
          wordConcat();
        }
        recognition.start();
      }
    });

    // Cleanup on unmount
    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, [isStoppedSpeechRecog]);

  const startListening = (speakLang = "en-IN") => {
    setIsStoppedSpeechRecog(false);
    if (recognitionRef.current) {
      recognitionRef.current.lang = speakLang; // Set recognition language
      recognitionRef.current.start(); // Start speech recognition
      setListening(true);
      console.log("Speech recognition started");
    }
  };

  const stopListening = () => {
    setIsStoppedSpeechRecog(true);
    setListening(false);
    wordConcat(); // Final concatenation before stopping
    if (recognitionRef.current) {
      recognitionRef.current.stop(); // Stop speech recognition
      console.log("Speech recognition stopped");
    }
  };

  const wordConcat = () => {
    console.log("Current interim words:", tempWords.current);

    if (tempWords.current.trim() !== "") {
      setTranscript((prevTranscript) => {
        const updatedTranscript =
          prevTranscript + " " + tempWords.current.trim() + "."; // Concatenate interim words
        console.log("Updated transcript:", updatedTranscript);
        tempWords.current = ""; // Reset tempWords after concatenation
        return updatedTranscript;
      });
    } else {
      console.log("No interim words to concatenate");
    }
  };

  const resetTranscript = () => {
    console.log(transcript);
    setTranscript(""); // Clear the transcript
  };

  return {
    transcript, // Return the updated transcript
    listening, // Return whether listening is active
    startListening, // Function to start listening
    stopListening, // Function to stop listening
    resetTranscript, // Function to reset the transcript
  };
};

export default useSpeechRecognition;
