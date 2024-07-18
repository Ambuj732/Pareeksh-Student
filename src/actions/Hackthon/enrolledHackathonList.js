import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const enrolledHackathonList = async (data) => {
  try {
    const queryString = Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join("&");
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/studentSelf/hackathon/enrolledList?${queryString}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Enrolled Hackathon List response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while Enrolled Hackathon List in :: ", error);
    throw error;
  }
};

export default enrolledHackathonList;
