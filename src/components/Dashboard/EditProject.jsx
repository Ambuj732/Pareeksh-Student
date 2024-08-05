import React, { useState, useEffect } from "react";
import close from "../../assets/Dashboard/close.png";
import { IoPerson } from "react-icons/io5";
import { useForm } from "react-hook-form";
import addProject from "../../actions/Dashboard/addITSkill";
import marital from "../../assets/Dashboard/marital.png";
import category from "../../assets/Dashboard/category.png";

const EditProject = ({ onClose, projectData, mainData }) => {
    return (
        <div className="flex min-h-screen w-screen items-center justify-center fixed top-0 left-0 z-50 bg-black bg-opacity-50">
            <div className="w-1/2 h-2/3 rounded-md shadow-md bg-white">
                <div className="flex justify-between items-center bg-blue-100 rounded-t-md h-12">
                    <h1 className="ml-8 items-center mt-3 font-semibold text-blue-800">
                        Edit Project
                    </h1>
                    <img
                        className="mr-8 items-center mt-2 h-8 cursor-pointer"
                        src={close}
                        onClick={onClose}
                        alt="Close"
                    />
                </div>
                <form className="flex flex-col">
                    <div className="flex flex-col gap-4 p-8">
                        <div className="flex items-center">
                            <div className="flex flex-col gap-2 w-1/2">
                                <div className="flex items-center gap-2">
                                    <img src={marital} alt="" className="h-4" />
                                    <span className="text-sm text-[#1C4481]">Project Name</span>
                                </div>
                                <input
                                    disabled
                                    type="text"
                                    // value={project?.project_name}
                                    className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md	 font-medium"
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-1/2">
                                <div className="flex items-center gap-2">
                                    <img src={category} alt="" className="h-4" />
                                    <span className="text-sm text-[#1C4481]">Role in Project</span>
                                </div>
                                <input
                                    disabled
                                    type="text"
                                    // value={project?.role_in_project}
                                    className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md	 font-medium"
                                />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex flex-col gap-2 w-1/2">
                                <div className="flex items-center gap-2">
                                    <img src={category} alt="" className="h-4" />
                                    <span className="text-sm text-[#1C4481]">
                                        Project Description
                                    </span>
                                </div>
                                <input
                                    disabled
                                    type="text"
                                    // value={project.project_description}
                                    className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md	 font-medium"
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-1/2">
                                <div className="flex items-center gap-2">
                                    <img src={category} alt="" className="h-4" />
                                    <span className="text-sm text-[#1C4481]">Project Duration</span>
                                </div>
                                <input
                                    disabled
                                    type="text"
                                    // value={calculateDuration(
                                    //     project?.project_start_date,
                                    //     project?.project_end_date
                                    // )}
                                    className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md	 font-medium"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="text-white font-sans text-lg px-8 py-1 mb-4 mt-3 rounded-full bg-blue-800"
                        >
                            Edit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProject
