import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import { useNavigate } from "react-router-dom";
import Default from "../../../Assets/defaultUser.png";
import { FaHouseUser } from "react-icons/fa6";
import { MdExitToApp } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { logout } from "../../../Redux/Actions/userAction";
import { useDispatch } from "react-redux";

const UserOptions = ({ user }) => {
  console.log("userrrrrrrrrrrrrrrrrrrrr----------------", user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const options = [
    { icon: <FaClipboardList />, name: "Orders", func: orders },
    { icon: <FaHouseUser />, name: "Profile", func: account },
    { icon: <MdExitToApp />, name: "Logout", func: logoutUser },
  ];

  if (UserOptions.role === "user") {
    options.unshift({
      icon: <MdDashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/dashboard");
  }

  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function logoutUser() {
    console.log("step 1 userOptions");
    dispatch(logout());
    localStorage.removeItem("token");
    alert("Logout Successfully!!!!");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: 10 }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        style={{ zIndex: 11 }}
        icon={
          <img
            className="speedDialIcon"
            // src={user.avatar.url ? "user.avatar.url" : { Default }}
            src={Default}
            alt="profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
