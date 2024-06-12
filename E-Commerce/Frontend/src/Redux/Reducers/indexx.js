import { combineReducers } from "redux";
import { productReducer, productDetailsReducer } from "./productReducer";

const reducers = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
});

export default reducers;
