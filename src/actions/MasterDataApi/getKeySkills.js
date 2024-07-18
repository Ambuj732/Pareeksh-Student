import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

const getKeySkills = async () => {
	try {
		const response = await axios.post(
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/masterData/fetchKeySkills`,
			{},
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		console.log("Key Skills Response :: ", response);
		return response;
	} catch (error) {
		console.log("Error while getting key skills :: ", error);
	}
};

export default getKeySkills;
