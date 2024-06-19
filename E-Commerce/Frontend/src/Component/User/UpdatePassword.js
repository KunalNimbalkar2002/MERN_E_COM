import React, { Fragment, useState, useEffect, useCallback } from "react";
import "./UpdatePassword.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { TiLockOpenOutline } from "react-icons/ti";
import { TiLockClosedOutline } from "react-icons/ti";
import { MdOutlineVpnKey } from "react-icons/md";
import { updatePassword } from "../../Redux/Actions/userAction";
import { userActionTypes } from "../../Redux/Constants/userConstants";

const UpdatePassword = ({ history }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const myForm = new FormData();
      myForm.append("oldPassword", oldPassword);
      myForm.append("newPassword", newPassword);
      myForm.append("confirmPassword", confirmPassword);

      dispatch(updatePassword(myForm));
    },
    [oldPassword, newPassword, confirmPassword, dispatch]
  );

  useEffect(() => {
    console.log("isUpdated", isUpdated);
    if (isUpdated) {
      alert("Password Changed Successfully!!");
      navigate("/account");
      dispatch({
        type: userActionTypes.UPDATE_PASSWORD_RESET,
      });
    }
  }, [navigate, isUpdated, dispatch]);

  const updateOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const updateNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const updateConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <Fragment>
      {/* {loading ? (
      <p> Loading</p>
    ) : ( */}
      <div className="updatePasswordContainer">
        <div className="updatePasswordBox">
          <h2 className="updatePasswordHeading">Change Password</h2>
          <form
            className="updatePasswordForm"
            encType="multipart/formdata"
            onSubmit={updatePasswordSubmit}
          >
            <div className="signUpPassword">
              <MdOutlineVpnKey />
              <input
                type="password"
                name="password"
                required
                value={oldPassword}
                placeholder="Old Password"
                onChange={(e) => updateOldPasswordChange(e)}
              />
            </div>
            <div className="signUpPassword">
              <TiLockOpenOutline />
              <input
                type="password"
                name="password"
                required
                value={newPassword}
                placeholder="New Password"
                onChange={(e) => updateNewPasswordChange(e)}
              />
            </div>
            <div className="signUpPassword">
              <TiLockClosedOutline />
              <input
                type="password"
                name="password"
                required
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => updateConfirmPasswordChange(e)}
              />
            </div>
            <input
              type="submit"
              className="updatePassword-btn"
              value="Change"
            />
          </form>
        </div>
      </div>
      {/* )} */}
    </Fragment>
  );
};

export default UpdatePassword;
