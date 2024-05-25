// api/products.js
import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";

export const getProducts = async (search, category, sortBy) => {
  console.log("data fatched");
  try {
    let { data } = await axios.get(
      `${BASE_URL}/products${category ? `/category/${category}` : ""}`,
      {
        params: {
          ...(sortBy && { sort: sortBy }),
        },
      }
    );

    if (search) {
      data = data.filter((e) => e.title.indexOf(search) >= 0);
      console.log(data.filter((e) => e.title.indexOf(search) >= 0))
    }
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/products/categories`);
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
