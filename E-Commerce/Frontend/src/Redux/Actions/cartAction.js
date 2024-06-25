import { cartActionTypes } from "../Constants/cartConstants";
import axios from "axios";

//ADD TO CART
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  console.log("cart action addItemsToCart::::::::::::::");
  const { data } = await axios.get(
    `http://localhost:4000/api/v1/product/${id}`
  );

  dispatch({
    type: cartActionTypes.ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  console.log("cart action  removeItemsFromCart::::::::::::::");
  dispatch({
    type: cartActionTypes.REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  console.log("cart action  saveShippingInfo DATA::::::::::::::", data);
  dispatch({
    type: cartActionTypes.SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
