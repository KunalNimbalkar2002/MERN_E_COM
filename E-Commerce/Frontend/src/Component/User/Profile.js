import React, { Fragment, useEffect } from "react";
import "./Pofile.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Default from "../../Assets/defaultUser.png";

const Profile = () => {
  const { user, isAuthenticatedUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <Fragment>
      <div className="profileContainer">
        <div>
          <h1>My Profile</h1>
          {/* <img src={user.avatar.url} alt={user.name} /> */}
          <img src={Default} alt={user.name} />
          <Link to="/me/update">Edit Profile</Link>
        </div>
        <div>
          <div>
            <h4>Full Name</h4>
            <p>{user ? user.name : ""}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{user ? user.email : ""}</p>
          </div>
          <div>
            <h4>Joined On</h4>
            <p>{user ? String(user.createdAt).substr(0, 10) : ""}</p>
          </div>
          <div>
            <Link to="/orders">My Orders</Link>
            <Link to="/password/update">Change Password</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
