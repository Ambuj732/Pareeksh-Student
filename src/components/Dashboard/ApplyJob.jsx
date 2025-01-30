import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { IoPerson } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import close from "../../assets/Hackathon/close.png";
import { useNavigate, useLocation } from "react-router";
import queryString from "query-string";
import arrowDown from "../../assets/Hackathon/arrowDown.png";
import Editor from "react-simple-wysiwyg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import applyforJob from "../../actions/Dashboard/applyforJob";
import getJobPostDetails from "../../actions/Dashboard/getJobPostDetails";
import getResume from "../../actions/Dashboard/getResume";

const ApplyJob = () => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const [htmlDescription, setHtml] = useState("");
  const [postDetails, setPostDetails] = useState({});
  const [question, setQuestionsComing] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [questionSet, setQuestions] = useState([]);
  const [items, setItems] = useState([]);
  const [file, setFile] = useState("");
  const [files, setFiles] = useState("");
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [resume, setResume] = useState([]);
  const [resumeHeadline, setResumeHeadline] = useState("");
  const [selectResume, setSelectResume] = useState("");
  const [answers, setAnswers] = useState({});
  const job_id = location.state.id;
  console.log(job_id);

  const getProfileResume = async () => {
    try {
      const userinfo = JSON.parse(localStorage.getItem("ps_loguser"));
      const data = {
        usercode: userinfo?.usercode,
        id_self_student: userinfo?.id_self_student,
      };
      const response = await getResume(data);
      console.log(response);
      setResume(response?.data?.resume);
    } catch (error) {
      console.error("Error while getting resume", error);
    }
  };

  const getJobPostDetail = async () => {
    try {
      const userinfo = JSON.parse(localStorage.getItem("ps_loguser"));
      const data = {
        usercode: userinfo?.usercode,
        id_self_student: userinfo?.id_self_student,
        id_job_post: job_id,
      };
      console.log(data);
      const response = await getJobPostDetails(data);
      console.log(response);
      if (response?.data?.code === 1000) {
        setPostDetails(response?.data?.job_post);
        setQuestions(response?.data?.job_post?.questions || []);
      }
    } catch (error) {
      console.error("Error while getting job post details", error);
    }
  };

  useEffect(() => {
    getJobPostDetail();
    getProfileResume();
  }, []);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const createJobHandler = async () => {
    try {
      const userinfo = JSON.parse(localStorage.getItem("ps_loguser"));
      // Transform answers object into desired array format
      const formattedAnswers = Object.entries(answers).map(([id, answer]) => ({
        id_job_question: parseInt(id, 10),
        answer,
      }));
      console.log(formattedAnswers);
      const data = {
        usercode: userinfo?.usercode,
        id_self_student: userinfo?.id_self_student,
        cover_letter: htmlDescription,
        use_previous: selectedResumeId ? 1 : 0,
        doc_name: file?.name || "My Resume",
        doc_type: file?.type === "application/pdf" ? 2 : 3,
        file: selectedResumeId ? file.file_url : files,
        id_job_post: job_id,
        web: 1,
        answers: formattedAnswers,
      };
      console.log(data);
      const response = await applyforJob(data);
      console.log(response);
      if (response?.data?.code === 1000) {
        toast.success("Job application submitted successfully!");
      } else {
        toast.error("Request Keys contain wrong data");
      }
    } catch (error) {
      console.error("Error while applying for job", error);
      toast.error("Failed to submit job application.");
    }
  };

  const handleEditorChange = (e) => setHtml(e.target.value);

  const handleResumeSelection = (resumeId, resumeFile) => {
    setSelectedResumeId(resumeId);
    setFile(resumeFile);
  };

  return (
    <div className="h-screen flex overflow-hidden font-custom -mt-10">
      <div className="flex flex-col w-screen p-2 overflow-y-scroll no-scrollbar">
        <div className="h-screen border rounded-2xl p-4 m-5 bg-[#e0e9f6] overflow-y-scroll no-scrollbar">
          <form onSubmit={handleSubmit(createJobHandler)}>
            <div className="flex flex-col w-full mt-10 border border-gray-400 rounded-3xl pb-5 px-10 pt-6 gap-7">
              <span className="text-[#1C4481]">Resume</span>
              <div className="h-12 w-[90%] border border-gray-300 rounded-md flex items-center justify-center p-10">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Choose File
                </label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={(e) => {
                    const selectedFile = e.target.files[0];
                    setFiles(selectedFile);
                    setSelectedResumeId(null); // Reset previous selection
                  }}
                />
              </div>
              {resume.length > 0 && (
                <ul>
                  {resume.map((res) => (
                    <li key={res.id} className="list-none mb-4">
                      <p>
                        <strong>Document Name:</strong> {res.doc_name}
                      </p>
                      <a
                        href={res.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {res.file_url}
                      </a>
                      <input
                        type="checkbox"
                        name="resumeSelect"
                        className="ml-2 rounded"
                        onChange={() => handleResumeSelection(res.id, res)}
                      />
                      <span className="ml-2">Use this Resume</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-col h w-full mt-10 border border-gray-400 rounded-3xl pb-5">
              <span className="m-7 text-[#1C4481]">Cover Letter</span>
              <Editor value={htmlDescription} onChange={handleEditorChange} />
            </div>

            {questionSet?.length > 0 && (
              <div className="border border-gray-400 rounded-3xl shadow-2xl mt-5 px-4">
                <div className="flex gap-4 mx-2 mt-4">
                  <span className="text-[#1C4481] text-2xl">Questionnaire</span>
                  <span className="text-[#939292] font-custom">
                    (Questionnaire is not mandatory)
                  </span>
                </div>
                {questionSet.map((question, index) => (
                  <div
                    key={question?.id}
                    className="mb-5 flex flex-col  mt-4 gap-4"
                  >
                    <span className="mx-4">
                      Q: {index + 1} - {question?.question}
                    </span>
                    <textarea
                      placeholder="Write your answer here"
                      className="border rounded-xl w-[40%] h-[80px] shadow-sm mx-4 px-5 py-2 outline-none resize-none"
                      onChange={(e) =>
                        handleAnswerChange(question?.id, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="relative h-12 w-full mt-12">
              <button
                type="submit"
                className="bg-blue-900 text-white px-5 py-2 rounded-full mt-5 mb-5"
              >
                Apply Job
              </button>
            </div>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
