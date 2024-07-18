import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const vivaExamSubmit = async (data) => {
	try {
		const response = await axios.post(
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/question/viva/submit`,
			data,
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		console.log("Viva Exam Submit Response :: ", response);
		return response;
	} catch (error) {
		console.log("Error while Viva Exam Submit :: ", error);
		throw error;
	}
};

export default vivaExamSubmit;
