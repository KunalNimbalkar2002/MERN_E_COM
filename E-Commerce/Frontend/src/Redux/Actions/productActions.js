import { ActionTypes } from "../Constants/productConstants";
import axios from "axios";

export const getProduct =
  (currentPage = 1, price = [0, 250000], category, ratings = 0) =>
  async (dispatch) => {
    console.log("dispatch :::::::::::::::::: ", dispatch);
    try {
      dispatch({
        type: ActionTypes.ALL_PRODUCT_REQUEST,
      });

      let url = `http://localhost:4000/api/v1/products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        url = `http://localhost:4000/api/v1/products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const response = await axios.get(url);
      console.log("responsee:::::::::", response);
      const data = response?.data;

      dispatch({
        type: ActionTypes.ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ActionTypes.ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  console.log("console dispatch from product Deatails productActions::::::::");
  try {
    dispatch({
      type: ActionTypes.PRODUCT_DETAILS_REQUEST,
    });

    const response = await axios.get(
      `http://localhost:4000/api/v1/product/${id}`
    );

    const data = response?.data;

    dispatch({
      type: ActionTypes.PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
    console.log(
      "console data get productDetails product Actions:::::::::",
      data
    );
  } catch (error) {
    dispatch({
      type: ActionTypes.PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = async (dispatch) => {
  dispatch({ type: ActionTypes.CLEAR_ERRORS });
};
