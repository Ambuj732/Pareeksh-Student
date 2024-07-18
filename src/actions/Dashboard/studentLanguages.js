import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

// const data = {
// 	id_self_student: 116,
// 	usercode: "",
// };

const studentLanguages = async (data) => {
  try {
    const queryString = Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join("&");
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/studentProfile/getStudentLangs?${queryString}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Student Languages Response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while getting languages :: ", error);
  }
};

export default studentLanguages;
