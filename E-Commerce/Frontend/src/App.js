import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import WebFont from "webfontloader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Component/layout/Header/Header.js";
import Footer from "./Component/layout/Footer/Footer.js";
import Home from "./Component/Home/Home.js";
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
import ForgotPassword from "./Component/User/ForgotPassword.js";
import Cart from "./Component/Cart/Cart.js";
import Shipping from "./Component/Cart/Shipping.js";
import ConfirmOrder from "./Component/Cart/ConfirmOrder.js";
import Payment from "./Component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const stripeAPIKey =
    "pk_test_51PV76ZCVMYD9qodp9tX7Tyug8eMFBFVoZb519z66j58VWDjkAolikUagkmMXPXbs5Ihle77MWw00UwebE9XWa04R006JCUFrz8";

  const { user, isAuthenticatedUser } = useSelector((state) => state.user);

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
      {console.log("user from ajj.js:::::::::::", user)}
      {isAuthenticatedUser && <UserOptions user={user} />}
      <Header />
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/product/:id" Component={productDetails} />
        <Route exact path="/products" Component={ProductComponent} />
        <Route exact path="/search" Component={Search} />
        <Route exact path="/login" Component={LoginSignUp} />
        <Route exact path="/cart" Component={Cart} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/account" element={<Profile />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/me/update" element={<UpdateProfile />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/password/update" element={<UpdatePassword />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/shipping" element={<Shipping />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/order/confirm" element={<ConfirmOrder />} />
        </Route>
        <Route
          path="/payment"
          element={
            <Elements stripe={loadStripe(stripeAPIKey)}>
              <Payment />
            </Elements>
          }
        />
      </Routes>
      <Footer />;
    </Router>
  );
}

export default App;
