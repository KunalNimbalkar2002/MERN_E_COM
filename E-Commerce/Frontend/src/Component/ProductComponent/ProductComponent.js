import React, { Fragment, useEffect, useState } from "react";
import "./PorductComponent.css";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../Redux/Actions/productActions";
import Product from "../Home/Product";
import Pagination from "react-js-pagination";
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
  const { products, loading, productsCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const handlePrice = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    dispatch(getProduct(currentPage, price, category));
  }, [dispatch, currentPage, price, category]);

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
              <Slider
                value={price}
                onChange={handlePrice}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
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
