import privateApi from "../../axios";
import { userActionTypes } from "../Constants/userConstants";
import axios from "axios";

//LOGIN User
export const login = (email, password) => async (dispatch) => {
  try {
    console.log("::::::::userActionTypes::::::", userActionTypes);
    dispatch({
      type: userActionTypes.LOGIN_REQUEST,
    });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `http://localhost:4000/api/v1/login`,
      { email, password },
      config
    );
    console.log("-------token:::::::::", data.token);
    dispatch({
      type: userActionTypes.LOGIN_SUCCESS,
      payload: data.user,
      token: data.token,
    });
    localStorage.setItem("user", JSON.stringify(data.user));
    console.log("console data LOGIN_SUCCESS Actions:::::::::", data.user);
  } catch (error) {
    dispatch({
      type: userActionTypes.LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// export const Register = (userData) => async (dispatch) => {
//   console.log("---------------userdata--------------", userData);
//   try {
//     dispatch({ type: userActionTypes.REGISTER_REQUEST });

//     const config = { headers: { "Content-Type": "application/json" } };
//     console.log(
//       "type: userActionTypes.REGISTER_REQUEST:::::::::::::::::::",
//       userActionTypes.REGISTER_REQUEST
//     );

//     const { data } = await axios.post(
//       `http://localhost:4000/api/v1/register`,
//       userData,
//       config
//     );
//     console.log("testttttttttt2222222222data", data);
//     dispatch({ type: userActionTypes.REGISTER_SUCCESS, payload: data.user });
//   } catch (error) {
//     let errorMessage = "An error occurred";
//     if (error.response) {
//       // Server responded with a status other than 200 range
//       errorMessage = error.response.data?.message || errorMessage;
//     } else if (error.request) {
//       // Request was made but no response received
//       errorMessage = "No response from server";
//     } else {
//       // Something else caused the error
//       errorMessage = error.message;
//     }
//     console.error("Register error:", error);
//     dispatch({
//       type: userActionTypes.REGISTER_FAIL,
//       payload: errorMessage,
//     });
//   }
// };

//Register User@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
export const Register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: userActionTypes.REGISTER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `http://localhost:4000/api/v1/register`,
      userData,
      config
    );

    dispatch({ type: userActionTypes.REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    let errorMessage = "An error occurred";
    if (error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    } else if (error.request) {
      errorMessage = "No response from server";
    } else {
      errorMessage = error.message;
    }
    console.error("Register error:", error);
    dispatch({
      type: userActionTypes.REGISTER_FAIL,
      payload: errorMessage,
    });
  }
};
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// export const loadUser = () => async (dispatch, getState) => {
//   console.log("welcome to load user::::::::::::");
//   try {
//     dispatch({
//       type: userActionTypes.LOAD_USER_REQUEST,
//     });

//     const state = getState();
//     const { user } = state.user;

//     if (user) {
//       // User state is already available in the store, return it
//       return user;
//     } else {
//       // User state is not available in the store, make a request to the server to get the user data
//       const { data } = await privateApi.get(`http://localhost:4000/api/v1/me`);

//       dispatch({ type: userActionTypes.LOAD_USER_SUCCESS, payload: data.user });
//     }
//   } catch (error) {
//     dispatch({
//       type: userActionTypes.LOAD_USER_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

export const loadUser = () => async (dispatch, getState) => {
  console.log("loadUser");
  try {
    dispatch({
      type: userActionTypes.LOAD_USER_REQUEST,
    });

    const state = getState();
    const { user } = state.user;

    if (user) {
      // User state is already available in the store, return it
      return user;
    } else {
      // User state is not available in the store, make a request to the server to get the user data
      const token = localStorage.getItem("token");
      const User = localStorage.getItem("user");

      if (!User) {
        // Token is not available, so the user is not authenticated
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:4000/api/v1/me`,
        config
      );

      dispatch({ type: userActionTypes.LOAD_USER_SUCCESS, payload: data.user });
    }
  } catch (error) {
    dispatch({
      type: userActionTypes.LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Logout User
export const logout = () => async (dispatch) => {
  console.log("step 2 action ::::::::");
  try {
    await axios.get(`http://localhost:4000/api/v1/logout`);

    dispatch({ type: userActionTypes.LOGOUT_SUCCESS });
    console.log("console data LOGOUT_SUCCESS Actions:::::::::");
  } catch (error) {
    dispatch({
      type: userActionTypes.LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Update Profile
export const updateProfile = (userData) => async (dispatch) => {
  console.log("test 111 update profile");
  try {
    dispatch({ type: userActionTypes.UPDATE_PROFILE_REQUEST });
    console.log("request updateProfile");
    const config = { headers: { "content-type": "multipart/form-data" } };
    const { data } = await privateApi.put(
      `http://localhost:4000/api/v1/me/update`,
      userData,
      config
    );
    console.log("data ipdateProfile");
    dispatch({
      type: userActionTypes.UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
    console.log("success updateProfile");
  } catch (error) {
    console.log("Fail updateProfile:::::::::::", error);
    dispatch({
      type: userActionTypes.UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Update Password
export const updatePassword = (passwords) => async (dispatch) => {
  console.log("test 111 update profile");
  try {
    dispatch({ type: userActionTypes.UPDATE_PASSWORD_REQUEST });
    console.log("request updateProfile");
    const config = { headers: { "content-type": "application/json" } };
    const { data } = await privateApi.put(
      `http://localhost:4000/api/v1/password/update`,
      passwords,
      config
    );
    console.log("data ipdateProfile");
    dispatch({
      type: userActionTypes.UPDATE_PASSWORD_SUCCESS,
      payload: data.success,
    });
    console.log("success updateProfile");
  } catch (error) {
    console.log("Fail updateProfile:::::::::::", error);
    dispatch({
      type: userActionTypes.UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    console.log("::::::::userActionTypes::::::", userActionTypes);
    dispatch({
      type: userActionTypes.FORGOT_PASSWORD_REQUEST,
    });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `http://localhost:4000/api/v1/password/forgot`,
      email,
      config
    );
    console.log("-------token:::::::::", data.token);
    dispatch({
      type: userActionTypes.FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
    console.log("console data LOGIN_SUCCESS Actions:::::::::", data);
  } catch (error) {
    dispatch({
      type: userActionTypes.FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};
