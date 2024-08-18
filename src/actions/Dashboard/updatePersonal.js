import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

// const data = {
// 	id_city: 24092,
// 	gender: 1,
// 	martial: 1,
// 	differently_abled: 1,
// 	dob: "1995-10-21",
// 	id_cast_category: 2,
// 	name: "",
// 	id_self_student: 6,
// 	usercode: "",
// 	id_state: 3687,
// };

const updatePersonal = async (data) => {
  try {
    const queryString = Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join("&");
    console.log(queryString);
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/studentSelf/updatePersonal?${queryString}`,
      {},
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
