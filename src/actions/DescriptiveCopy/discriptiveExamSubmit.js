import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const discriptiveExamSubmit = async (data) => {
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
    console.log("Discriptive Exam Submit response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while Discriptive Exam Submit in :: ", error);
    throw error;
  }
};

export default discriptiveExamSubmit;
