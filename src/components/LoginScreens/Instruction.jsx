import React, { useEffect, useState } from "react";
import fileDock from "../../assets/LoginScreen/File_dock.png";
import videoPlay from "../../assets/LoginScreen/videoPlay.png";
import nextVideo from "../../assets/LoginScreen/nextVideo.png";
import getInstructions from "../../actions/LoginScreens/instructions";
import { Link } from "react-router-dom";
import GeneralInstruction from "./GeneralInstruction";
import { useNavigate } from "react-router-dom";
import { resolveInput } from "face-api.js";

function Instruction() {
  const [pdfUrl, setPdfUrl] = useState("");
  const [videoInstruction, setVideoInstruction] = useState("");
  const [instruction, setInstruction] = useState("");
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onClose = () => {
    setOpen(false);
  };

  const userData = JSON.parse(localStorage.getItem("ps_loguser"));
  console.log(userData);
  const settings = JSON.parse(sessionStorage.getItem("pkshn_exam_set"));
  console.log(settings);
  const theory2_login = settings.theory2_login;
  const entered_psyc = settings.entered_psyc;
  console.log(entered_psyc);
  console.log(theory2_login);
  let isAllowPsycho = false;
  let isTheory = false;
  let isAllowViva = false;
  let isTheory3 = false;

  if (userData["examstatus"] === undefined) {
    window.location.reload();
    return;
  }
  if (settings["entered_psyc"] == 1) {
    isAllowPsycho = true;
    isTheory = false;
    isAllowViva = false;
  } else if (settings["entered_theory3"] == 1) {
    isAllowPsycho = false;
    isTheory = false;
    isAllowViva = false;
    isTheory3 = true;
  } else {
    if (
      userData["examstatus"] == 0 &&
      settings["viva_assessor"] == 0 &&
      settings["module"] >= 2 &&
      settings["viva_first"] == 1
    ) {
      isAllowViva = true;
      isTheory = false;
    }
    if (
      userData["examstatus"] == 0 &&
      settings["module"] >= 2 &&
      settings["viva_first"] == 0
    ) {
      isAllowViva = false;
      isTheory = true;
    }
    if (
      userData["examstatus"] == 1 &&
      settings["module"] >= 2 &&
      settings["viva_first"] == 0
    ) {
      isAllowViva = true;
      isTheory = false;
    }
    if (
      userData["examstatus"] == 2 &&
      settings["viva_assessor"] == 0 &&
      settings["module"] >= 2 &&
      settings["viva_first"] == 1
    ) {
      isAllowViva = false;
      isTheory = true;
    }
    if (
      userData["examstatus"] == 2 &&
      settings["viva_assessor"] == 1 &&
      settings["module"] >= 2 &&
      settings["viva_first"] == 1
    ) {
      isAllowViva = false;
      isTheory = true;
    }
    if (userData["examstatus"] == 0 && settings["module"] == 1) {
      isAllowViva = false;
      isTheory = true;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          exam_id: settings?.exam_id,
          student_id: userData.id,
          streamvideo: settings?.video,
          usercode: userData?.usercode,
        };
        console.log(data);
        const response = await getInstructions(data);
        console.log(response);
        if (response?.data?.code === 1000) {
          let profile_data = {
            name: response?.data?.student_name,
            pic: response?.data?.pic,
          };
          localStorage.setItem(
            "pkshn_profileData",
            JSON.stringify(profile_data)
          );
          if (response?.data?.feed?.session != "") {
            const videostream = 1;
            let feedsetting = {
              sessid: response?.data.feed.session,
              toid: response?.data.feed.token,
            };
            sessionStorage.setItem(
              "pkshn_feedsetting",
              JSON.stringify(feedsetting)
            );
          } else {
            const videostream = 0;
          }

          setPdfUrl(response?.data?.pdf_url);
          setVideoInstruction(response?.data?.video_link);
          setInstruction(response?.data?.instruction);
          localStorage.setItem(
            "instruction",
            JSON.stringify(response?.data?.instruction)
          );
        }
      } catch (error) {
        console.log("Error while getting instruction:", error);
      } finally {
        setLoading(false); // Set loading state to false regardless of success or failure
      }
    };

    fetchData();
  }, []);

  const goToExamPage = () => {
    console.log("His");
    console.log(isTheory);
    if (isTheory === true) {
      console.log("Hi theory");
      navigate("/exams");
    } else if (theory2_login === 1) {
      console.log("Hi theory2");
      navigate("/exams");
    } else if (isAllowPsycho === true) {
      console.log("Hi psy");
      navigate("/exams");
    } else {
      console.log("Hi");
      navigate("/viva");
    }
  };

  return (
    <div className="bg-[#EDF2FF] h-screen m-4 rounded-3xl flex justify-center relative items-center">
      <div className="bg-[#FFFFFF] relative min-h-[480px] w-2/3 rounded-3xl p-4 flex flex-col items-center">
        {!open && (
          <div className="flex flex-col items-center h-fit w-2/3">
            <h1 className="text-[#1C4481] font-bold text-4xl">Welcome!</h1>
            {!loading && pdfUrl && (
              <Link to={pdfUrl}>
                <div className="border-[#1C4481] rounded-3xl my-8 px-2 border-[4px] h-12 w-fit text-sm flex items-center gap-2">
                  <img src={fileDock} alt="" className="h-8" />
                  <span className="font-bold text-[#1C4481]">
                    Download Instruction
                  </span>
                </div>
              </Link>
            )}
            <div className="flex flex-col items-center gap-2 w-full">
              <span className="font-bold">Video Instruction</span>
              {!loading && videoInstruction ? (
                <video
                  className="h-72 w-2/3 rounded-xl"
                  controls
                  autoPlay={true}
                  muted=""
                >
                  <source src={videoInstruction} type="video/mp4" />
                </video>
              ) : (
                <img src={videoPlay} alt="" className="h-72 w-2/3" />
              )}
            </div>
          </div>
        )}
        {open && instruction && (
          <GeneralInstruction instruction={instruction} onClose={onClose} />
        )}
        {!open && (
          <button onClick={() => setOpen(true)}>
            <img
              src={nextVideo}
              alt=""
              className="absolute right-10 h-10 top-1/2"
            />
          </button>
        )}
      </div>
      {open && instruction && (
        <button
          className="bg-[#1C4481] flex items-center justify-center absolute bottom-4 h-10 w-1/6 rounded-3xl text-white font-medium px-2"
          onClick={goToExamPage}
        >
          {isTheory === true
            ? "Start Theory"
            : theory2_login === 1
            ? "Start Theory2"
            : isAllowPsycho === true
            ? "Start Psychometric"
            : "Start Viva"}
        </button>
      )}
    </div>
  );
}

export default Instruction;
