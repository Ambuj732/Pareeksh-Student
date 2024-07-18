import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

// const data = {
// 	exam_id: 8551,
// 	student_id: 211037,
// 	streamvideo: 1,
// 	usercode: i9lBY5euU0vw,
// };

const getInstructions = async (data) => {
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
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/question/instruction?${queryString}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		console.log("Instruction response :: ", response);
		return response;
	} catch (error) {
		console.log("Error while getting instruction :: ", error);
	}
};

export default getInstructions;
