import React, { useEffect } from "react";
import close from "../../assets/Dashboard/close.png";
import { useForm } from "react-hook-form";
import marital from "../../assets/Dashboard/marital.png";
import category from "../../assets/Dashboard/category.png";
import updateDataCommon from "../../actions/Dashboard/updateDataCommon";

const EditCertificate = ({ onClose, certificateData, mainData }) => {
    console.log("Certificate Data: ", certificateData);
    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            cert_name: certificateData?.cert_name || "",
            cert_provider: certificateData?.cert_provider || "",
            cert_completion_id: certificateData?.cert_completion_id || "",
            cert_url: certificateData?.cert_url || "",
            end_year: certificateData?.end_year || "",
        }
    });

    useEffect(() => {
        if (certificateData) {
            setValue("cert_name", certificateData?.cert_name);
            setValue("cert_provider", certificateData?.cert_provider);
            setValue("cert_completion_id", certificateData?.cert_completion_id);
            setValue("cert_url", certificateData?.cert_url);
            setValue("end_year", certificateData?.end_year || "");
        }
    }, [certificateData, setValue]);

    const onSubmit = async (data) => {
        const combinedData = { ...mainData, ...data, id_certificate: certificateData?.id };

        console.log("Combined Data: ", combinedData);

        try {
            // const response = await updateDataCommon('studentProfile/addCertificate', combinedData);
            onClose();
        } catch (error) {
            console.error("Failed to update certificate: ", error);
        }
    };

    return (
        <div className="flex min-h-screen w-screen items-center justify-center fixed top-0 left-0 z-50 bg-black bg-opacity-50">
            <div className="w-1/2 h-2/3 rounded-md shadow-md bg-white">
                <div className="flex justify-between items-center bg-blue-100 rounded-t-md h-12">
                    <h1 className="ml-8 items-center mt-3 font-semibold text-blue-800">
                        Edit Certificate
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
                                    <span className="text-sm text-[#1C4481]">Certificate Name</span>
                                </div>
                                <input
                                    type="text"
                                    className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md font-medium"
                                    {...register("cert_name", { required: "Certificate Name is required" })}
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-1/2">
                                <div className="flex items-center gap-2">
                                    <img src={category} alt="" className="h-4" />
                                    <span className="text-sm text-[#1C4481]">Certificate Provider</span>
                                </div>
                                <input
                                    type="text"
                                    className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md font-medium"
                                    {...register("cert_provider", { required: "Provider is required" })}
                                />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex flex-col gap-2 w-1/2">
                                <div className="flex items-center gap-2">
                                    <img src={category} alt="" className="h-4" />
                                    <span className="text-sm text-[#1C4481]">Certificate Completion Id</span>
                                </div>
                                <input
                                    type="text"
                                    className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md font-medium"
                                    {...register("cert_completion_id", { required: "Completion Id is required" })}
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-1/2">
                                <div className="flex items-center gap-2">
                                    <img src={category} alt="" className="h-4" />
                                    <span className="text-sm text-[#1C4481]">Certificate URL</span>
                                </div>
                                <input
                                    type="url"
                                    className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md font-medium"
                                    {...register("cert_url", { required: "URL is required" })}
                                />
                            </div>
                        </div>
                        {/* <div className="flex items-center">
                            <div className="flex flex-col gap-2 w-1/2">
                                <div className="flex items-center gap-2">
                                    <img src={category} alt="" className="h-4" />
                                    <span className="text-sm text-[#1C4481]">Completion Year</span>
                                </div>
                                <input
                                    type="number"
                                    min="1900"
                                    max="2100"
                                    className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md font-medium"
                                    {...register("end_year", { required: "Completion Year is required" })}
                                />
                            </div>
                        </div> */}
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
}

export default EditCertificate;
