import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const vivaAnswerClear = async (data) => {
	try {
		const response = await axios.post(
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/question/viva/answerClear
`,
			data,
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		console.log("Viva Clearing Answer Response :: ", response);
		return response;
	} catch (error) {
		console.log("Error while Viva Clearing Answer :: ", error);
		throw error;
	}
};

export default vivaAnswerClear;
