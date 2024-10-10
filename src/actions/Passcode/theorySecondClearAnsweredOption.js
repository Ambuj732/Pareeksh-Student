import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const theorySecondClearAnsweredOption = async (data) => {
	try {
		const queryString = Object.keys(data)
			.map(
				(key) =>
					`${encodeURIComponent(key)}=${encodeURIComponent(
						data[key]
					)}`
			)
			.join("&");
		const response = await axios.post(
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/exam/theorySecond/clearAnsweredOption?${queryString}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		console.log(
			"Theory Second Clear Answered Option response :: ",
			response
		);
		return response;
	} catch (error) {
		console.log(
			"Error while Theory Second Clear Answered Option :: ",
			error
		);
		throw error;
	}
};

export default theorySecondClearAnsweredOption;
