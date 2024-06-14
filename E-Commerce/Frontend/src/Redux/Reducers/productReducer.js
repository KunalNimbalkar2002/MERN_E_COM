import { ActionTypes } from "../Constants/productConstants";

const initialState = {};

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ALL_PRODUCT_REQUEST:
      console.log("ActionTypes.ALL_PRODUCT_REQUEST:::::::::", payload);
      return {
        ...state,
        loading: true,
        product: [],
      };
    case ActionTypes.ALL_PRODUCT_SUCCESS:
      console.log("ActionTypes.ALL_PRODUCT_SUCCESS:::::::::", payload);
      return {
        ...state,
        loading: false,
        products: payload.products,
        productsCount: payload.productsCount,
        resultPerPage: payload.resultPerPage,
        // filteredProductsCount: payload.filteredProductsCount,
      };
    case ActionTypes.ALL_PRODUCT_FAIL:
      console.log("ActionTypes.ALL_PRODUCT_FAIL:::::::::", payload);
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ActionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.PRODUCT_DETAILS_REQUEST:
      console.log("ActionTypes.PRODUCT_DETAILS_REQUEST state::::::::::", state);
      console.log(
        "ActionTypes.PRODUCT_DETAILS_REQUEST payload::::::::::",
        payload
      );
      return {
        ...state,
        loading: true,
        product: [],
      };
    case ActionTypes.PRODUCT_DETAILS_SUCCESS:
      console.log(
        " ActionTypes.PRODUCT_DETAILS_SUCCESS state::::::::::",
        state
      );
      console.log(
        " ActionTypes.PRODUCT_DETAILS_SUCCESS payload::::::::::",
        payload
      );
      return {
        ...state,
        loading: false,
        product: payload,
      };
    case ActionTypes.PRODUCT_DETAILS_FAIL:
      console.log("ActionTypes.PRODUCT_DETAILS_FAIL state:::::::::", state);
      console.log("ActionTypes.PRODUCT_DETAILS_FAIL payload:::::::::", payload);
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ActionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
