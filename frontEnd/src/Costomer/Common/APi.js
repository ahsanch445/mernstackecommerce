import axios from "axios";

export const CategoryData = async () => {
  let response1 = await axios.get(
    "https://frontend-eight-zeta-18.vercel.app/categories/nav/all"
  );
  return response1.data;
};
