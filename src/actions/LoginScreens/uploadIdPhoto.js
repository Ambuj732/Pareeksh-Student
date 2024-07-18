import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const uploadIdPhoto = async (data, userData, exam_id) => {
	try {
		const response = await axios.post(
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/student/uploadbase64Idcard`,
			{
				files: data,
				exam_id: exam_id,
				student_id: userData["id"],
				sub_user_id: userData["subuserid"],
				user_id: userData["userid"],
				usercode: userData["usercode"],
			},
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		return response;
	} catch (error) {
		console.log("Error while uploading id photo :: ", error);
	}
};

export default uploadIdPhoto;
