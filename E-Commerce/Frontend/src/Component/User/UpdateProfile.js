import React, { Fragment, useState, useEffect, useCallback } from "react";
import "./UpdateProfile.css";
import { MdAttachEmail } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser, updateProfile } from "../../Redux/Actions/userAction";
import { userActionTypes } from "../../Redux/Constants/userConstants";

const UpdateProfile = ({ history }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticatedUser } = useSelector((state) => state.user);
  const { isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [avatar, setAvatar] = useState("");
  // const [avatarPreview, setAvatarPreview] = useState(Avatar);

  const updateProfileSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const myForm = new FormData();
      myForm.append("name", name);
      myForm.append("email", email);

      // Check if avatar exists before appending it to the form data
      // if (avatar) {
      //   myForm.append("avatar", avatar);
      // }

      dispatch(updateProfile(myForm));
    },
    [name, email, dispatch]
  );

  // const updateProfileDataChange = (e) => {
  //   console.log("--whyyyy--");
  //   e.preventDefault();

  //   const reader = new FileReader();

  //   // reader.onload = () => {
  //   //   if (reader.readyState === 2) {
  //   //     setAvatarPreview(reader.result);
  //   //     setAvatar(reader.result);
  //   //   }
  //   // };
  //   // console.log("e.target", e.target);
  //   // reader.readAsDataURL(e.target.files[0]);
  // };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    console.log("isUpdated", isUpdated);
    if (isUpdated) {
      alert("Profile Updated Successfully!!");
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: userActionTypes.UPDATE_PROFILE_RESET,
      });
    }
  }, [navigate, isUpdated, dispatch, user]);

  const updateProfileDataChangeName = (e) => {
    setName(e.target.value);
  };

  const updateProfileDataChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Fragment>
      {/* {loading ? (
        <p> Loading</p>
      ) : ( */}
      <div className="updateProfileContainer">
        <div className="updateProfileBox">
          <h2 className="updateProfileHeading">Update Profile</h2>
          <form
            className="updateProfileForm"
            encType="multipart/formdata"
            onSubmit={updateProfileSubmit}
          >
            <div className="updateProfileName">
              <FaUserCircle />
              <input
                type="text"
                placeholder="Name"
                required
                // name="name"
                value={name}
                onChange={(e) => updateProfileDataChangeName(e)}
              />
            </div>
            <div className="updateProfileEmail">
              <MdAttachEmail />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                required
                onChange={(e) => updateProfileDataChangeEmail(e)}
              />
            </div>

            {/* <div id="updateProfileImage">
                <img src={avatarPreview} alt="Avatar" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={updateProfileDataChange}
                />
              </div> */}
            <input type="submit" className="updateProfile-btn" value="Update" />
          </form>
        </div>
      </div>
      {/* )} */}
    </Fragment>
  );
};

export default UpdateProfile;
