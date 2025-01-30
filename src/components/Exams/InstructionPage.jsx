import React from "react";
import close from "../../assets/LoginScreen/close.png";
import next from "../../assets/Instruction/next.png";
import previous from "../../assets/Instruction/previous.png";
import help_icon from "../../assets/Instruction/help_icon.png";
import slock from "../../assets/Instruction/slock.png";
import exit from "../../assets/Instruction/exit.png";
import reset from "../../assets/Instruction/reset.png";
import audio_large from "../../assets/Instruction/audio_large.png";
import sound_small from "../../assets/Instruction/sound_small.png";

const InstructionPage = ({ closeModal }) => {
  const instruction = JSON.parse(localStorage.getItem("instruction"));
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#1C4481] bg-opacity-50 z-50">
      <div className="bg-white w-3/4 max-w-2xl rounded-lg shadow-lg p-6 relative">
        {/* Modal Content */}

        {/* Instructions */}
        <div className="text-left">
          <h3 className="text-lg font-semibold mb-2">General Instructions</h3>
          <ul className="list-disc ml-5 mb-4">
            <span>{instruction}</span>
          </ul>

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
            <li className="">White means current question you are at.</li>
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

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionPage;
