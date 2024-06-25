import { combineReducers } from "redux";
import { productReducer, productDetailsReducer } from "./productReducer";
import { cartReducer } from "./cartReducer";
import {
  userLoginReducer,
  profileReducer,
  forgotPasswordReducer,
} from "./userReducer";

const reducers = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userLoginReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
});

export default reducers;
