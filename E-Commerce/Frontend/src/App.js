import "./App.css";
import WebFont from "webfontloader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Component/layout/Header/Header.js";
import Footer from "./Component/layout/Footer/Footer.js";
import Home from "./Component/Home/Home.js";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import productDetails from "./Component/ProductDetails/productDetails.js";
import ProductComponent from "./Component/ProductComponent/ProductComponent.js";
import Search from "./Component/ProductComponent/Search.js";
import LoginSignUp from "./Component/User/LoginSignUp.js";
import store from "./Redux/Store.js";
import { loadUser } from "./Redux/Actions/userAction.js";
import UserOptions from "./Component/layout/Header/UserOptions.js";
import Profile from "./Component/User/Profile.js";
import ProtectedRoutes from "./Component/Route/ProtectedRoutes.js";
import UpdateProfile from "./Component/User/UpdateProfile.js";
import UpdatePassword from "./Component/User/UpdatePassword.js";

function App() {
  const { user, isAuthenticatedUser } = useSelector((state) => state.user);
  console.log("isAuthenticatedUser app:::::::", isAuthenticatedUser);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      {isAuthenticatedUser && <UserOptions user={user} />}
      <Header />
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/product/:id" Component={productDetails} />
        <Route exact path="/products" Component={ProductComponent} />
        <Route exact path="/search" Component={Search} />
        <Route exact path="/login" Component={LoginSignUp} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/account" element={<Profile />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/me/update" element={<UpdateProfile />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/password/update" element={<UpdatePassword />} />
        </Route>
      </Routes>
      <Footer />;
    </Router>
  );
}

export default App;
