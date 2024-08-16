import React, { useEffect } from "react";
import close from "../../assets/Dashboard/close.png";
import { useForm } from "react-hook-form";
import marital from "../../assets/Dashboard/marital.png";
import category from "../../assets/Dashboard/category.png";
import updateDataCommon from "../../actions/Dashboard/updateDataCommon";
import { toast } from "react-toastify";
import { recallData } from "../../store/studentProfileSlice";
import { useDispatch } from "react-redux";

const EditProject = ({ onClose, projectData, mainData }) => {
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        setValue,
        watch,
    } = useForm({
        defaultValues: {
            project_name: projectData?.project_name || "",
            project_description: projectData?.project_description || "",
            role_in_project: projectData?.role_in_project || "",
            start_date: projectData?.project_start_date || "",
            project_end_date: projectData?.project_end_date || "",
        },
    });

    // Function to calculate duration
    function calculateDuration(startDate, endDate) {
        if (!startDate || !endDate) return '';

        const start = new Date(startDate);
        const end = new Date(endDate);

        // Calculate the difference in milliseconds
        const durationMs = Math.abs(end - start);

        // Convert milliseconds to days
        const days = Math.floor(durationMs / (1000 * 60 * 60 * 24));

        if (days > 30) {
            // Convert days to months
            const months = Math.floor(days / 30);
            return months.toString() + " month" + (months > 1 ? "s" : "");
        } else {
            return days.toString() + " day" + (days > 1 ? "s" : "");
        }
    }

    // Watch the start and end dates
    const startDate = watch("project_start_date");
    const endDate = watch("project_end_date");

    // Calculate duration
    const duration = calculateDuration(startDate, endDate);

    useEffect(() => {
        if (projectData) {
            setValue("project_name", projectData?.project_name);
            setValue("project_description", projectData?.project_description);
            setValue("role_in_project", projectData?.role_in_project);
            setValue("project_start_date", projectData?.project_start_date?.split('T')[0]);
            setValue("project_end_date", projectData?.project_end_date?.split('T')[0]);
        }
    }, [projectData, setValue]);

    // const onSubmit = async (data) => {
    //     console.log("Edited Data: ", data);
    //     try {
    //         const combinedData = {
    //             ...mainData,
    //             ...data,
    //             id_student_project: projectData?.id,  
    //         };

    //         console.log("Combined Data: ", combinedData);

    //         const response = await updateDataCommon('studentProfile/addProject', combinedData);

    //         if (response?.data?.code === 1000) {
    //             dispatch(recallData());
    //             toast.success("Project updated successfully");
    //             onClose();
    //         } else {
    //             toast.error("Failed to update project");
    //         }

    //     } catch (error) {
    //         console.error("Failed to update project: ", error);
    //         toast.error("An error occurred while updating the project");
    //     }
    // };

    const onSubmit = async (data) => {
        try {
            // Combine form data with existing project data
            const updatedData = {
                ...projectData, // Include existing project data
                ...data,        // Override with new form data
                id_student_project: projectData?.id // Ensure the project ID is included
            };

            // Create the payload for updating the project
            const payload = {
                desc: updatedData.project_description,  // Ensure keys match API's expected format
                end_date: updatedData.project_end_date,
                id_self_student: mainData.id_self_student,
                name: updatedData.project_name,
                role: updatedData.role_in_project,
                start_date: updatedData.project_start_date,
                usercode: mainData.usercode,
                id_student_project: updatedData.id_student_project // ID for identifying which project to update
            };

            console.log("Update Payload: ", payload);

            // Call API to update the project
            const response = await updateDataCommon('studentProfile/addProject', payload);

            if (response?.data?.code === 1000) {
                dispatch(recallData());
                toast.success("Project updated successfully");
                onClose();
            } else {
                toast.error("Failed to update project");
            }

        } catch (error) {
            console.error("Failed to update project: ", error);
            toast.error("An error occurred while updating the project");
        }
    };



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
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                    <div className="flex flex-col gap-4 p-8">
                        <div className="flex items-center">
                            <div className="flex flex-col gap-2 w-1/2">
                                <div className="flex items-center gap-2">
                                    <img src={marital} alt="" className="h-4" />
                                    <span className="text-sm text-[#1C4481]">Project Name</span>
                                </div>
                                <input
                                    type="text"
                                    className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md font-medium"
                                    {...register("project_name", { required: "Project Name is required" })}
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-1/2">
                                <div className="flex items-center gap-2">
                                    <img src={category} alt="" className="h-4" />
                                    <span className="text-sm text-[#1C4481]">Role in Project</span>
                                </div>
                                <input
                                    type="text"
                                    className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md font-medium"
                                    {...register("role_in_project", { required: "Role in Project is required" })}
                                />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex flex-col gap-2 w-1/2">
                                <div className="flex items-center gap-2">
                                    <img src={category} alt="" className="h-4" />
                                    <span className="text-sm text-[#1C4481]">Project Description</span>
                                </div>
                                <input
                                    type="text"
                                    className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md font-medium"
                                    {...register("project_description", { required: "Project Description is required" })}
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-1/2">
                                <div className="flex items-center gap-2">
                                    <img src={category} alt="" className="h-4" />
                                    <span className="text-sm text-[#1C4481]">Start Date</span>
                                </div>
                                <input
                                    type="date"
                                    className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md font-medium"
                                    {...register("project_start_date", { required: "Start Date is required" })}
                                />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex flex-col gap-2 w-1/2">
                                <div className="flex items-center gap-2">
                                    <img src={category} alt="" className="h-4" />
                                    <span className="text-sm text-[#1C4481]">End Date</span>
                                </div>
                                <input
                                    type="date"
                                    className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md font-medium"
                                    {...register("project_end_date", { required: "End Date is required" })}
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-1/2">
                                <div className="flex items-center gap-2">
                                    <img src={category} alt="" className="h-4" />
                                    <span className="text-sm text-[#1C4481]">Project Duration</span>
                                </div>
                                <input
                                    type="text"
                                    value={duration || 'N/A'}
                                    className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md font-medium"
                                    readOnly
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
    );
};

export default EditProject;
