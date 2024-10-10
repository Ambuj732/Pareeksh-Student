import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const vivaUploadAnswer = async (data) => {
	try {
		const response = await axios.post(
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/question/viva/saveweb`,
			data,
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		console.log("Viva Upload Answer Response :: ", response);
		return response;
	} catch (error) {
		console.log("Error while Viva Upload Answer :: ", error);
		throw error;
	}
};

export default vivaUploadAnswer;
