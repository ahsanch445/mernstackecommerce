import axios from "axios";

export const CategoryData = async () => {
  let response1 = await axios.get("http://localhost:3000/categories/nav/all");
  return response1.data;
};
