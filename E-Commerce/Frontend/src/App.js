import "./App.css";
import WebFont from "webfontloader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Component/layout/Header/Header.js";
import Footer from "./Component/layout/Footer/Footer.js";
import Home from "./Component/Home/Home.js";
import { useEffect } from "react";
import productDetails from "./Component/ProductDetails/productDetails.js";
import ProductComponent from "./Component/ProductComponent/ProductComponent.js";
import Search from "./Component/ProductComponent/Search.js";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <Router>
      <Header />;
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/product/:id" Component={productDetails} />
        <Route exact path="/products" Component={ProductComponent} />
        <Route exact path="/search" Component={Search} />
      </Routes>
      <Footer />;
    </Router>
  );
}

export default App;
