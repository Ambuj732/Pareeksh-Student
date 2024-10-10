import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const disciptiveExamFetch = async (data) => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/exam/getOnlineDesciptiveExams`,
      data,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Disciptive Exam Fetch response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while Disciptive Exam Fetch in :: ", error);
    throw error;
  }
};

export default disciptiveExamFetch;
