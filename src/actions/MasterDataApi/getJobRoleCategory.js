import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

const getJobRoleCategory = async () => {
	try {
		const response = await axios.post(
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/masterData/fetchJobRoleCategory`,
			{},
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		console.log("Job Role Category Response :: ", response);
		return response;
	} catch (error) {
		console.log("Error while getting job role category :: ", error);
	}
};

export default getJobRoleCategory;
