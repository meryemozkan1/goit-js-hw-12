import axios from "axios";

const API_KEY = "55027541-a06eab94a680beef161ebe8ea";
const BASE_URL = "https://pixabay.com/api/";

export async function fetchImages(query, page = 1) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      page,
      per_page: 20,
    },
  });

  return response.data;
}