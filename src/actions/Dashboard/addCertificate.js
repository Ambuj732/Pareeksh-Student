import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

const addEducation = async (data) => {
	try {
		const formData = new FormData();

		for (const key in data) {
			formData.append(key, data[key]);
		}

		for (const pair of formData?.entries()) {
			console.log(pair[0], pair[1]);
		}

		const response = await axios.post(
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/studentProfile/uploadCertificationWeb`,
			formData,
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		console.log("Add Education Response :: ", response);
		return response;
	} catch (error) {
		console.log("Error while adding Education :: ", error);
	}
};

export default addEducation;
