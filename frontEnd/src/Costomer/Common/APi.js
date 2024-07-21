import axios from "axios";

export const CategoryData = async () => {
  let response1 = await axios.get(
    "https://ecommerce-api-one-iota.vercel.app/categories/nav/all"
  );
  return response1?.data;
};
