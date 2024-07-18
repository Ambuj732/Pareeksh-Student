// src/config.js
const PUBLIC_REST_API_ENDPOINT = String(
	import.meta.env.VITE_PUBLIC_REST_API_ENDPOINT
);
const BEARER_TOKEN = String(import.meta.env.VITE_BEARER_TOKEN);
const gapikey = String(import.meta.env.VITE_GAPIKEY);
const TOTAL_IMAGE_CAPTURE_COUNT = 30;
const BLANK_MSG = String("Please fill all the fields.");
const TRY_AGAIN_MSG = String("Please try again...");
const RPAY_KEY_ID = String(import.meta.env.VITE_RPAY_KEY_ID);
const RPAY_KEY_SECRET = String(import.meta.env.VITE_RPAY_KEY_SECRET);

export {
	PUBLIC_REST_API_ENDPOINT,
	BEARER_TOKEN,
	BLANK_MSG,
	TRY_AGAIN_MSG,
	gapikey,
	TOTAL_IMAGE_CAPTURE_COUNT,
	RPAY_KEY_ID,
	RPAY_KEY_SECRET,
};
