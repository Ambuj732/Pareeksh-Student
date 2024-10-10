import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

// const data = {
// 	id_self_student: 1,
// 	usercode: ""
// }

const profilePercentage = async (data) => {
  try {
    const queryString = Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join("&");
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/studentProfile/getProfilePercentage?${queryString}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Profile Percentage Response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while getting profile percentage :: ", error);
  }
};

export default profilePercentage;
