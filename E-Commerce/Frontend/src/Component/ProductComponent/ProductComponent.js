import React, { Fragment, useEffect, useState } from "react";
import "./PorductComponent.css";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../Redux/Actions/productActions";
import Product from "../Home/Product";
import Pagination from "react-js-pagination";
import styled from "@emotion/styled";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Fashion",
  "Camera",
  "SmartPhones",
];

const ProductComponent = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 250000]);
  const [ratings, setRatings] = useState(0);
  const { products, loading, productsCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const handlePrice = (event, newPrice) => {
    console.log("new-price-slider::::::", newPrice);
    setPrice(newPrice);
  };

  const handleRating = (event, newRatings) => {
    console.log("new-price-slider::::::", newRatings);
    setRatings(newRatings);
  };

  useEffect(() => {
    dispatch(getProduct(currentPage, price, category, ratings));
  }, [dispatch, currentPage, price, category, ratings]);

  const CustomSlider = styled(Slider)({
    color: "#ff6f61", // Change this to your desired color
    height: 8,
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      "&:hover": {
        boxShadow: "0 0 0 8px rgba(255, 111, 97, 0.16)",
      },
      "& .Mui-active": {
        boxShadow: "0 0 0 14px rgba(255, 111, 97, 0.16)",
      },
    },
    "& .MuiSlider-valueLabel": {
      backgroundColor: "#ff6f61",
    },
  });

  return (
    <Fragment>
      {loading ? (
        "Loading"
      ) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
          <div className="filterbox">
            <Box sx={{ width: 200 }}>
              <Typography>Price</Typography>
              <CustomSlider
                value={price}
                onChange={handlePrice}
                valueLabelDisplay="auto"
                aria-labelledby="continuous-slider"
                min={0}
                max={250000}
              />
              <Typography>Categories</Typography>
              <ul className="categoryBox">
                {categories.map((category) => (
                  <li
                    className="category-link"
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
              <fieldset>
                <Typography component="legend">Ratings Above</Typography>
                <CustomSlider
                  value={ratings}
                  onChange={handleRating}
                  min={0}
                  max={5}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                />
              </fieldset>
            </Box>
          </div>
          {resultPerPage < productsCount && (
            <div>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next > "
                prevPageText="< Prev "
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductComponent;
