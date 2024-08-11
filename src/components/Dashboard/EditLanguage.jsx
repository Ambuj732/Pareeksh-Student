import React, { useEffect, useState } from "react";
import close from "../../assets/Dashboard/close.png";
import { useForm } from "react-hook-form";
import language from "../../assets/Dashboard/language.png";
import getLanguageList from "../../actions/MasterDataApi/getLanguageList";

const EditLanguage = ({ onClose, languageData }) => {
    const [languageList, setLanguageList] = useState([]);

    const [proficient, setProficient] = useState([
        { id: 1, proficiency: "Beginner" },
        { id: 2, proficiency: "Proficient" },
        { id: 3, proficiency: "Expert" },
    ]);

    const fetchLanguages = async () => {
        try {
            const response = await getLanguageList();
            setLanguageList(response?.data?.lang_list || []);
        } catch (error) {
            console.error("Failed to fetch languages: ", error);
        }
    };

    useEffect(() => {
        fetchLanguages();
    }, []);

    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            lang_name: languageData?.lang_name || "",
            id_proficiency: languageData?.id_proficiency || "",
            read: languageData?.read || 0,
            write: languageData?.write || 0,
            speak: languageData?.speak || 0,
        },
    });

    // Set default values when languageData changes
    useEffect(() => {
        if (languageData) {
            setValue("lang_name", languageData.lang_name);
            setValue("id_proficiency", languageData.id_proficiency);
            setValue("read", languageData.read);
            setValue("write", languageData.write);
            setValue("speak", languageData.speak);
        }
    }, [languageData, setValue]);

    const onSubmit = async (data) => {
        const transformedData = {
            ...data,
            read: data.read ? 1 : 0,
            write: data.write ? 1 : 0,
            speak: data.speak ? 1 : 0,
        };

        console.log("Form Data: ", transformedData);

        onClose(); // Close the modal after submission
    };

    return (
        <div className="flex min-h-screen w-screen items-center justify-center fixed top-0 left-0 z-50 bg-black bg-opacity-50">
            <div className="w-1/2 h-2/3 rounded-md shadow-md bg-white">
                <div className="flex justify-between items-center bg-blue-100 rounded-t-md h-12">
                    <h1 className="ml-8 items-center mt-3 font-semibold text-blue-800">
                        Edit Language
                    </h1>
                    <img
                        className="mr-8 items-center mt-2 h-8 cursor-pointer"
                        src={close}
                        onClick={onClose}
                        alt="Close"
                    />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                    <div className="p-8">
                        <div className="flex items-center">
                            <div className="flex flex-col gap-2 w-1/3">
                                <div className="flex items-center gap-2">
                                    <img src={language} alt="" className="h-4" />
                                    <span className="text-sm text-[#1C4481]">Language</span>
                                </div>
                                <select
                                    id="language"
                                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                                    {...register("lang_name", {
                                        required: true,
                                    })}
                                >
                                    <option value="" disabled hidden>
                                        Select
                                    </option>
                                    {languageList.map((language) => (
                                        <option
                                            key={language.id}
                                            value={language.lang_name}
                                            selected={
                                                language?.lang_name === languageData?.lang_name
                                            }
                                        >
                                            {language.lang_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-2 w-1/3 ml-4">
                                <div className="flex items-center gap-2">
                                    <img src={language} alt="" className="h-4" />
                                    <span className="text-sm text-[#1C4481]">Level</span>
                                </div>
                                <select
                                    id="proficient"
                                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                                    {...register("id_proficiency", {
                                        required: true,
                                    })}
                                >
                                    <option value="" disabled hidden>
                                        Proficient
                                    </option>
                                    {proficient?.map((proc) => (
                                        <option
                                            key={proc?.id}
                                            value={proc.id}
                                            selected={proc?.id === languageData?.id_proficiency}
                                        >
                                            {proc.proficiency}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-4 p-4 text-sm">
                            <div className="flex gap-2">
                                <input
                                    type="checkbox"
                                    {...register("read")}
                                    value={1}
                                    defaultChecked={languageData?.read === 1}
                                />
                                <label htmlFor="read">Read</label>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="checkbox"
                                    {...register("write")}
                                    value={1}
                                    defaultChecked={languageData?.write === 1}
                                />
                                <label htmlFor="write">Write</label>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="checkbox"
                                    {...register("speak")}
                                    value={1}
                                    defaultChecked={languageData?.speak === 1}
                                />
                                <label htmlFor="speak">Speak</label>
                            </div>
                        </div>
                        <div className="flex ">
                            <button
                                type="submit"
                                className="text-white font-sans text-lg px-8 py-1 mb-4 mt-3 rounded-full bg-blue-800"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditLanguage;
