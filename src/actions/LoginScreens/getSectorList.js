import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

const getSectorList = async () => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/masterData/fetchJobRole?id_role_category=1`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Sector List response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while getting sector list :: ", error);
  }
};

export default getSectorList;
