import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const vivaQuestionByIndex = async (data) => {
	try {
		const response = await axios.post(
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/question/vivaquestionByNo`,
			data,
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		console.log("Viva Question By Index Response :: ", response);
		return response;
	} catch (error) {
		console.log("Error while Viva Question By Index :: ", error);
		throw error;
	}
};

export default vivaQuestionByIndex;
