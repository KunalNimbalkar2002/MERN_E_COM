import { combineReducers } from "redux";
import { productReducer, productDetailsReducer } from "./productReducer";
import { userLoginReducer, profileReducer } from "./userReducer";

const reducers = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userLoginReducer,
  profile: profileReducer,
});

export default reducers;
