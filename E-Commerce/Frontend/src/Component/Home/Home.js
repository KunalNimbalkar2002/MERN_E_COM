import React, { Fragment, useEffect } from "react";
import "./Home.css";
import { CgMouse } from "react-icons/cg";
import Product from "./Product";
import tshirt from "../../Assets/tshirt-2.jpg";
import { getProduct } from "../../Redux/Actions/productActions";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, errors, products, productsCount } = useSelector(
    (state) => state.products
  );

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
              products.map((product) => <Product product={product} />)}
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Home;
