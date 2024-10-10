import axios from "axios";
import { gapikey } from "../../constants"; // Ensure this is the correct path and variable

const googleTranslateApi = async (detail) => {
  try {
    console.log(detail);
    const data = {
      q: detail.allOptions,
      source: detail.primary_lang_code,
      target: detail.secondary_lang_code,
      format: "text",
    };
    console.log(data);
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${gapikey}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Google Translate response :: ", response.data);
    return response.data;
  } catch (error) {
    console.log(
      "Error while Google Translate :: ",
      error.response ? error.response.data : error.message
    );
    console.log("api is not working");
    throw error;
  }
};

export default googleTranslateApi;
