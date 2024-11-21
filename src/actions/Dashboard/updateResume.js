import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

const updatePersonal = async (data) => {
  try {
    // const formData = new FormData();

    // for (const key in data) {
    // 	formData.append(key, data[key]);
    // }

    // for (const pair of formData?.entries()) {
    // 	console.log(pair[0], pair[1]);
    // }

    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/studentProfile/uploadResumeWeb`,
      data,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Update Personal Response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while updating personal :: ", error);
  }
};

export default updatePersonal;
