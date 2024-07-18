import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

const getInstitutes = async () => {
	try {
		const response = await axios.post(
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/masterData/fetchInstitutes`,
			{},
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		console.log("Get Institute Response :: ", response);
		return response;
	} catch (error) {
		console.log("Error while getting institutes :: ", error);
	}
};

export default getInstitutes;
