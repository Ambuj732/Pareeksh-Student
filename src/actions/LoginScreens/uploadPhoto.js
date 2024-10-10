import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const uploadPhoto = async (data, userData, exam_id) => {
	try {
		const response = await axios.post(
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/student/uploadbase64`,
			{
				file: data,
				exam_id: exam_id,
				student_id: userData["id"],
				sub_user_id: userData["subuserid"],
				user_id: userData["userid"],
				usercode: userData["usercode"],
			},
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
					// "mimeType": "multipart/form-data",
					// "contentType": false,
				},
			}
		);
		return response;
	} catch (error) {
		console.log("Error while uploading photo :: ", error);
	}
};

export default uploadPhoto;
