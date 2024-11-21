import React, { useState, useEffect } from "react";
import close from "../../assets/Dashboard/close.png";
import { IoPerson } from "react-icons/io5";
import { useForm } from "react-hook-form";
import addProject from "../../actions/Dashboard/addITSkill";
import updateDataCommon from "../../actions/Dashboard/updateDataCommon";
import { recallData } from "../../store/studentProfileSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const EditSkill = ({ onClose, skillData, mainData }) => {
    console.log("skillData: ", skillData,);
    const dispatch = useDispatch()
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            software_name: skillData?.software_name || "",
            experience: skillData?.experience || "",
            last_used: skillData?.last_used || "",
        },
    });
    console.log("skillData: ", skillData,);
    useEffect(() => {
        if (skillData) {
            setValue("software_name", skillData.software_name);
            setValue("experience", skillData.experience);
            setValue("last_used", skillData.last_used);
            // setValue("id_software", skillData.id_software);
            // setValue("id", skillData.id);

        }
    }, [skillData, setValue]);

    const onSubmit = async (data) => {
        console.log("Edited Data: ", data);
        try {
            const combinedData = { ...mainData, ...data  , id_it_skill : skillData?.id };
            console.log("Combined Data: ", combinedData);
           const response = await updateDataCommon('studentProfile/addITSkill', combinedData);
           if (response?.data?.code === 1000) {
               dispatch(recallData());
               toast.success("IT Skill Update successfully");
               onClose();
           }
           console.log("Response: ", response);

            onClose();
        } catch (error) {
            console.error("Failed to update skill: ", error);
        }
    };

    return (
        <div className="flex min-h-screen w-screen items-center justify-center fixed top-0 left-0 z-50 bg-black bg-opacity-50">
            <div className="w-1/2 h-2/3 rounded-md shadow-md bg-white">
                <div className="flex justify-between items-center bg-blue-100 rounded-t-md h-12">
                    <h1 className="ml-8 items-center mt-3 font-semibold text-blue-800">
                        Edit Skill
                    </h1>
                    <img
                        className="mr-8 items-center mt-2 h-8 cursor-pointer"
                        src={close}
                        onClick={onClose}
                        alt="Close"
                    />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                    <div className="flex gap-5 justify-around px-5 mt-5">
                        <div className="relative h-12 w-1/2">
                            <div>
                                <input
                                    type="text"
                                    id="software_name"
                                    className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                                    placeholder=""
                                    {...register("software_name", {
                                        required: true,
                                    })}
                                />
                                <div
                                    className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                                >
                                    <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                                    <label htmlFor="softwareName" className="pl-2">
                                        Software Name
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-12 w-1/2">
                            <div>
                                <input
                                    type="text"
                                    id="experience"
                                    className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                                    placeholder=""
                                    {...register("experience", {
                                        required: true,
                                    })}
                                />
                                <div
                                    className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                                >
                                    <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                                    <label htmlFor="experience" className="pl-2">
                                        Experience (months)
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex px-5 mt-5 mb-4">
                        <div className="relative h-12 w-1/2">
                            <div>
                                <input
                                    type="text"
                                    id="last_used"
                                    className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                                    placeholder=""
                                    {...register("last_used", {
                                        required: true,
                                    })}
                                />
                                <div
                                    className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                                >
                                    <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                                    <label htmlFor="last_used" className="pl-2">
                                        Last Used (Year)
                                    </label>
                                </div>
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

export default EditSkill;
