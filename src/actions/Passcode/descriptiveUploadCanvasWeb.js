import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const descriptiveUploadCanvasWeb = async (data) => {
	try {
		// const queryString = Object.keys(data)
		// 	.map(
		// 		(key) =>
		// 			`${encodeURIComponent(key)}=${encodeURIComponent(
		// 				data[key]
		// 			)}`
		// 	)
		// 	.join("&");
		const response = await axios.post(
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/exam/saveDescriptiveAnswerImageWeb`,
			data,
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		console.log("Descriptive Upload Canvas Web :: ", response);
		return response;
	} catch (error) {
		console.log("Error while Descriptive Upload Canvas Web :: ", error);
		throw error;
	}
};

export default descriptiveUploadCanvasWeb;
