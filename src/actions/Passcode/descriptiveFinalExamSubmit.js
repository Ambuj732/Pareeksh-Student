import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const descriptiveFinalExamSubmit = async (data) => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/exam/endDescriptiveExam`,
      data,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Descriptive Final Exam Submit :: ", response);
    return response;
  } catch (error) {
    console.log("Error while Descriptive Final Exam Submit :: ", error);
    throw error;
  }
};

export default descriptiveFinalExamSubmit;
