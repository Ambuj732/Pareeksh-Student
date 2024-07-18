import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const vivaExaminitial = async (data) => {
	try {
		const response = await axios.post(
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/question/viva`,
			data,
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		console.log("Viva Exam Initial Response :: ", response);
		return response;
	} catch (error) {
		console.log("Error while Viva Exam Initial :: ", error);
		throw error;
	}
};

export default vivaExaminitial;
