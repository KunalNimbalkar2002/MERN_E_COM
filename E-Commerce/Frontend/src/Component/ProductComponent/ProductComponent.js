import React, { useEffect } from "react";
import "./PorductComponent.css";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../Redux/Actions/productActions";
import Product from "../Home/Product";

const ProductComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct);
  }, [dispatch]);
  return <div>{}</div>;
};

export default ProductComponent;
