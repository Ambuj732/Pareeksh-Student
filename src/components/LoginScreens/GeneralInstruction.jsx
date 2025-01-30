import React from "react";
import nextVideo from "../../assets/LoginScreen/nextVideo.png";
import InstructionPage from "../Exams/InstructionPage";
import close from "../../assets/LoginScreen/close.png";
import next from "../../assets/Instruction/next.png";
import previous from "../../assets/Instruction/previous.png";
import help_icon from "../../assets/Instruction/help_icon.png";
import slock from "../../assets/Instruction/slock.png";
import exit from "../../assets/Instruction/exit.png";
import reset from "../../assets/Instruction/reset.png";
import audio_large from "../../assets/Instruction/audio_large.png";
import sound_small from "../../assets/Instruction/sound_small.png";

function GeneralInstruction({ instruction, onClose }) {
  return (
    <div className="flex items-center justify-center h-auto w-full">
      <button onClick={onClose}>
        <img
          src={nextVideo}
          alt=""
          className="absolute left-10 h-10 top-1/2 scale-x-[-1]"
        />
      </button>
      <div className="h-auto rounded-3xl p-8 bg-[#F3F3F3] w-2/3 ">
        <h1 className="text-[#0C49CA] text-lg font-bold">
          General Instruction
        </h1>
        <div className="mt-2 font-medium">
          <span>{instruction}</span>
        </div>

        <div className="text-left">
          <h3 className="text-lg font-semibold mb-2">
            Colour Code Instructions
          </h3>
          <ul className="list-disc ml-5 mb-4">
            <li className="text-gray-500">
              Gray means question you have not visited or viewed yet.
            </li>
            <li className="text-green-500">
              Green means question you have answered.
            </li>
            <li className="text-white">
              <span className="text-black">
                White means current question you are at.
              </span>
            </li>
            <li className="text-purple-500">
              Violet means question you have visited but not answered.
            </li>

            <li className="text-red-500">
              Red means question you have answered and submitted. Now you can't
              access the question again.
            </li>
          </ul>

          <h3 className="text-lg font-semibold mb-2">Icons Instructions</h3>
          <ul className="list-disc ml-5">
            <li>
              <img src={next} alt="Next" className="inline-block h-5 mr-2" />
              Navigate to the next question.
            </li>
            <li>
              <img
                src={previous}
                alt="Previous"
                className="inline-block h-5 mr-2"
              />
              Go to the previous question.
            </li>
            <li>
              <img
                src={help_icon}
                alt="Help"
                className="inline-block h-5 mr-2"
              />
              View exam instructions.
            </li>
            <li>
              <img src={slock} alt="Lock" className="inline-block h-5 mr-2" />
              Lock your answer to prevent further review.
            </li>
            <li>
              <img src={exit} alt="Exit" className="inline-block h-5 mr-2" />
              Go to the exam summary and submit page.
            </li>
            <li>
              <img src={reset} alt="Reset" className="inline-block h-5 mr-2" />
              Reset the selected option.
            </li>
            <li>
              <img
                src={audio_large}
                alt="Mic"
                className="inline-block h-5 mr-2"
              />
              Record your answer in voice mode (viva exams).
            </li>
            <li>
              <img
                src={sound_small}
                alt="Speaker"
                className="inline-block h-5 mr-2"
              />
              Device reads out the question and options.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GeneralInstruction;
