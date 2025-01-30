import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const psyUploadIDImage = async (data, userData, exam_id) => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/exam/psyc/uploadIdCardWeb`,
      //2- post- body me is tarah se data send krte hain.
      {
        file: data,
        exam_id: exam_id,
        student_id: userData["id"],
        sub_user_id: userData["subuserid"],
        user_id: userData["userid"],
        usercode: userData["usercode"],
      },
      // 3- token is tarah send ktre hain.
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log("Error while uploading id photo :: ", error);
  }
};

export default psyUploadIDImage;
