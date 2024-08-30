import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

const addEducation = async (data) => {
  try {
    const queryString = Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join("&");
    console.log("qs", queryString);
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/studentProfile/updateEducation?${queryString}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Add Education Response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while adding Education :: ", error);
  }
};

export default addEducation;
