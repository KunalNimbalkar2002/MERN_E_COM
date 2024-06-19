import React, { Fragment, useEffect } from "react";
//-------------------------------------------tempp=---------------------------------------------------------------------------
import { Search, Cart, Phone } from "react-bootstrap-icons";
import "./Home.css";
import { CgMouse } from "react-icons/cg";
import Product from "./Product";
import { getProduct } from "../../Redux/Actions/productActions";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.products);

  const nav1Icons = [
    {
      icon: <Search />,
      url: "/search",
      color: "rgba(35,35,35,0.8)",
      colorHover: "#eb4034",
    },
  ];

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        "Loading"
      ) : (
        <>
          <div className="banner">
            <p>Welcome To Ecommerce</p>
            <h1>Find Products Below</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product, index) => (
                <Product product={product} key={index} />
              ))}
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Home;
