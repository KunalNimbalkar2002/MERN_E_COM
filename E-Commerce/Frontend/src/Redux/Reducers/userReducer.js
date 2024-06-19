import { userActionTypes } from "../Constants/userConstants";

// const initialState = {};

export const userLoginReducer = (
  state = { user: {} },
  { type, payload, token }
) => {
  switch (type) {
    case userActionTypes.LOGIN_REQUEST:
    case userActionTypes.REGISTER_REQUEST:
    case userActionTypes.LOAD_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticatedUser: false,
      };
    case userActionTypes.LOGIN_SUCCESS:
    case userActionTypes.REGISTER_SUCCESS:
    case userActionTypes.LOAD_USER_SUCCESS:
      console.log("ActionTypes.LOGIN_SUCCESS::token:::::::", token);
      return {
        ...state,
        loading: false,
        isAuthenticatedUser: true,
        user: payload,
        token: token,
      };

    case userActionTypes.LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticatedUser: false,
      };

    case userActionTypes.LOGIN_FAIL:
    case userActionTypes.REGISTER_FAIL:
      console.log("ActionTypes.LOGIN_Fail:::::::::", payload);
      return {
        ...state,
        loading: false,
        isAuthenticatedUser: false,
        user: null,
        error: payload,
      };

    case userActionTypes.LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticatedUser: false,
        user: null,
        error: payload,
      };
    case userActionTypes.LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const profileReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case userActionTypes.UPDATE_PROFILE_REQUEST:
    case userActionTypes.UPDATE_PASSWORD_REQUEST:
      console.log("ActionTypes.UPDATE_REQUEST:::::::::");
      return {
        ...state,
        loading: true,
      };
    case userActionTypes.UPDATE_PROFILE_SUCCESS:
    case userActionTypes.UPDATE_PASSWORD_SUCCESS:
      console.log("ActionTypes.UPDATE_SUCCESS:::::::::");
      return {
        ...state,
        loading: false,
        isUpdated: payload,
      };
    case userActionTypes.LOGOUT_FAIL:
    case userActionTypes.UPDATE_PASSWORD_FAIL:
      console.log("ActionTypes.UPDATE_FAIL:::::::::", state);
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case userActionTypes.UPDATE_PROFILE_RESET:
    case userActionTypes.UPDATE_PASSWORD_RESET:
      console.log("ActionTypes.UPDATE_RESET:::::::::", state);
      return {
        ...state,
        isUpdated: false,
      };
    default:
      return state;
  }
};
