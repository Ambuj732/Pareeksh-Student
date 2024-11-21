import React, { useEffect, useState } from "react";
import marital from "../../assets/Dashboard/marital.png";
import category from "../../assets/Dashboard/category.png";
import abled from "../../assets/Dashboard/abled.png";
import language from "../../assets/Dashboard/language.png";
import download from "../../assets/Dashboard/download.png";
import close from "../../assets/Dashboard/close.png";
import getResume from "../../actions/Dashboard/getResume";
import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";

function Resume() {
  const [resumes, setResumes] = useState([]);
  const [resumeHeadline, setResumeHeadline] = useState("");

  const getResumeHandler = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("ps_loguser"));
      const data = {
        usercode: user?.usercode,
        id_self_student: user?.id_self_student,
      };
      const response = await getResume(data);
      if (response?.data?.code === 1000) {
        setResumes(response?.data?.resume);
        setResumeHeadline(response?.data?.resume_headlines);
        console.log("Headline :: ", resumeHeadline);
      }
    } catch (error) {
      console.log("Error while getting resume :: ", error);
    }
  };

  useEffect(() => {
    getResumeHandler();
  }, []);

  const handleDownloadResume = (url, filename) => {
    const a = document.createElement("a");
    a.href = url; // Set the URL of the file
    a.setAttribute("download", filename); // Set the download attribute to the desired filename

    // Append the anchor to the document body to make it part of the DOM
    document.body.appendChild(a);

    // Programmatically click the anchor element to trigger download
    a.click();

    // Remove the anchor from the document after the download is triggered
    document.body.removeChild(a);
  };

  return (
    <div className="flex flex-col gap-8 p-4">
      <span className="font-medium">{resumeHeadline}</span>
      <div className="flex items-center">
        <div className="flex flex-col gap-2 w-2/5">
          <div className="flex items-center gap-2">
            <img src={marital} alt="" className="h-4" />
            <span className="text-sm text-[#1C4481]">Resume</span>
          </div>
          {resumes?.length > 0 && (
            <div className="h-auto flex justify-between items-center px-4 shadow-allBorder rounded-md">
              <Link to={resumes[0]?.file_url} target="_blank">
                <div className="flex flex-col">
                  <span className="font-medium">{resumes[0]?.doc_name}</span>
                  <span className="text-sm text-[#828282]">
                    Updated on {formatDate(resumes[0]?.add_date)}
                  </span>
                </div>
              </Link>
              <div className="flex">
                <img
                  src={download}
                  alt=""
                  className="cursor-pointer"
                  onClick={() =>
                    handleDownloadResume(
                      resumes[0]?.file_url,
                      resumes[0]?.doc_name
                    )
                  }
                />
                {/* <img src={close} alt="" /> */}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-[#E7F0FF] text-[#1C4481] font-medium p-2 rounded-md w-full">
        <span>Video Resume</span>
      </div>
      <div className="flex items-center">
        <div className="flex flex-col gap-2 w-2/5">
          <div className="flex items-center gap-2">
            <img src={marital} alt="" className="h-4" />
            <span className="text-sm text-[#1C4481]">Video Resume</span>
          </div>
          {resumes.length > 1 && (
            <div className="h-14 flex justify-between items-center px-4 shadow-allBorder rounded-md">
              <Link to={resumes[1]?.file_url} target="_blank">
                <div className="flex flex-col">
                  <span className="font-medium">{resumes[1]?.doc_name}</span>
                  <span className="text-sm text-[#828282]">
                    Updated on {formatDate(resumes[1]?.add_date)}
                  </span>
                </div>
              </Link>
              <div className="flex">
                <img
                  src={download}
                  alt=""
                  onClick={() =>
                    handleDownloadResume(
                      resumes[1]?.file_url,
                      resumes[1]?.doc_name
                    )
                  }
                />
                {/* <img src={close} alt="" /> */}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-[#E7F0FF] text-[#1C4481] font-medium p-2 rounded-md w-full">
        <span>Work Documents</span>
      </div>
      <div className="flex items-center">
        <div className="flex flex-col gap-2 w-2/5">
          <div className="flex items-center gap-2">
            <img src={marital} alt="" className="h-4" />
            <span className="text-sm text-[#1C4481]">Work Video</span>
          </div>
          <div className="h-auto flex justify-between items-center px-4 shadow-allBorder rounded-md">
            <div className="flex flex-col">
              <span className="font-medium">{resumes[0]?.doc_name}</span>
              <span className="text-sm text-[#828282]">
                Updated on {formatDate(resumes[0]?.add_date)}
              </span>
            </div>
            <div className="flex">
              <img
                src={download}
                alt=""
                className="cursor-pointer"
                onClick={() =>
                  handleDownloadResume(
                    resumes[0]?.file_url,
                    resumes[0]?.doc_name
                  )
                }
              />
              {/* <img src={close} alt="" /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center gap-2">
            <img src={marital} alt="" className="h-4" />
            <span className="text-sm text-[#1C4481]">Presentation</span>
          </div>
          <div className="flex gap-8">
            <div className="h-auto flex w-2/5 justify-between items-center px-4 shadow-allBorder rounded-md">
              <div className="flex flex-col">
                <span className="font-medium">{resumes[0]?.doc_name}</span>
                <span className="text-sm text-[#828282]">
                  Updated on {formatDate(resumes[0]?.add_date)}
                </span>
              </div>
              <div className="flex">
                <img
                  src={download}
                  alt=""
                  className="cursor-pointer"
                  onClick={() =>
                    handleDownloadResume(
                      resumes[0]?.file_url,
                      resumes[0]?.doc_name
                    )
                  }
                />
                {/* <img src={close} alt="" /> */}
              </div>
            </div>
            <div className="h-14 flex w-2/5 justify-between items-center px-4 shadow-allBorder rounded-md">
              <div className="flex flex-col">
                <span className="font-medium">KuldeepCV.dov(1.5 MB)</span>
                <span className="text-sm text-[#828282]">
                  Updated on Feb 2, 2023
                </span>
              </div>
              <div className="flex">
                <img
                  src={download}
                  alt=""
                  className="cursor-pointer"
                  onClick={() =>
                    handleDownloadResume(
                      resumes[0]?.file_url,
                      resumes[0]?.doc_name
                    )
                  }
                />
                {/* <img src={close} alt="" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume;
