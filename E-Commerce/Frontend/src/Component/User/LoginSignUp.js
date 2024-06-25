import React, {
  Fragment,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import "./LoginSignUp.css";
import { MdAttachEmail } from "react-icons/md";
import { TiLockOpenOutline } from "react-icons/ti";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../Assets/defaultUser.png";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, Register } from "../../Redux/Actions/userAction";

const LoginSignUp = ({ history }) => {
  const [data, setData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthenticatedUser, token } = useSelector(
    (state) => state.user
  );
  console.log("loginpage ---token-test", token);
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(Avatar);

  const loginSubmit = (e) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      dispatch(login(loginEmail, loginPassword));
      alert("Login Successfully!!");
      navigate(redirect);
    } else {
      console.error("Email and password are required");
    }
  };

  useEffect(() => {
    if (isAuthenticatedUser) {
      localStorage.setItem("token", token);
    }
  }, [isAuthenticatedUser, token]);

  const registerSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const myForm = new FormData();
      myForm.append("name", name);
      myForm.append("email", email);
      myForm.append("password", password);

      // Check if avatar exists before appending it to the form data
      if (avatar) {
        myForm.append("avatar", avatar);
      }

      dispatch(Register(myForm));
    },
    [name, email, password, avatar, dispatch]
  );

  const registerDataChange = (e) => {
    e.preventDefault();
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (isAuthenticatedUser) {
      navigate(redirect);
    }
  }, [navigate, isAuthenticatedUser, redirect]);

  //This switch tabs is used to navigate from login to register or register to login using "className"
  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="Login-SignUp-Toggle">
              <p onClick={(e) => switchTabs(e, "login")}>Login</p>
              <p onClick={(e) => switchTabs(e, "register")}>Register</p>
            </div>
            <button ref={switcherTab}></button>
            {/* this button is used to change className and shift  */}
          </div>
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <MdAttachEmail />
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                required
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <TiLockOpenOutline />
              <input
                type="password"
                required
                value={loginPassword}
                placeholder="Password"
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Link to="/password/forgot">Forgot Password ?</Link>
            <input type="submit" value="login" className="login-btn" />
          </form>
          <form
            className="signUpForm"
            ref={registerTab}
            encType="multipart/formdata"
            onSubmit={registerSubmit}
          >
            <div className="signUpName">
              <FaUserCircle />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpEmail">
              <MdAttachEmail />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                required
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpPassword">
              <TiLockOpenOutline />
              <input
                type="password"
                name="password"
                required
                value={password}
                placeholder="Password"
                onChange={registerDataChange}
              />
            </div>
            <div id="registerImage">
              <img src={avatarPreview} alt="Avatar" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div>
            <input type="submit" className="signUp-btn" value="Register" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginSignUp;
