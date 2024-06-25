import { cartActionTypes } from "../Constants/cartConstants";

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
export const cartReducer = (
  state = { initialState, shippingInfo: {} },
  { type, payload }
) => {
  switch (type) {
    case cartActionTypes.ADD_TO_CART:
      console.log("Reducer cartActionTypes.ADD_TO_CART:::::::::::::");
      const item = payload;
      console.log(
        "cartttt TESTT localStorage:::::::::",
        initialState.shippingInfo
      );
      const isItemExist = (state.cartItems || []).find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [
            ...(state.cartItems && Array.isArray(state.cartItems)
              ? state.cartItems
              : []),
            item,
          ],
        };
      }

    case cartActionTypes.REMOVE_CART_ITEM:
      console.log("Reducer cartActionTypes.REMOVE_CART_ITEM:::::::::::::");
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== payload),
      };
    case cartActionTypes.SAVE_SHIPPING_INFO:
      console.log("Reducer cartActionTypes.SAVE_SHIPPING_INFO:::::::::::::");
      return {
        ...state,
        shippingInfo: payload,
      };
    default:
      return state;
  }
};
