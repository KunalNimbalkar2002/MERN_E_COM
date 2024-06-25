import React, { Fragment, useState, useEffect, useCallback } from "react";
import "./ForgotPassword.css";
import { MdAttachEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { forgotPassword } from "../../Redux/Actions/userAction";
import { userActionTypes } from "../../Redux/Constants/userConstants";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message, loading } = useSelector((state) => state.forgotPassword);

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const myForm = new FormData();
      myForm.append("email", email);

      dispatch(forgotPassword(myForm));
    },
    [email, dispatch]
  );

  useEffect(() => {
    if (message) {
      alert.success(message);
    }
  }, [message, alert]);

  const forgotPasswordEmailSet = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Fragment>
      {/* {loading ? (
    <p> Loading</p>
  ) : ( */}
      <div className="forgotPasswordContainer">
        <div className="forgotPasswordBox">
          <h2 className="forgotPasswordHeading">Forgot Password</h2>
          <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit}>
            <div className="forgotPasswordEmail">
              <MdAttachEmail />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                required
                onChange={(e) => forgotPasswordEmailSet(e)}
              />
            </div>
            <input type="submit" className="forgotPassword-btn" value="Send" />
          </form>
        </div>
      </div>
      {/* )} */}
    </Fragment>
  );
};

export default ForgotPassword;
