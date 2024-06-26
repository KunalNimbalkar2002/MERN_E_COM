import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./cartItemCard.js";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemsToCart,
  removeItemsFromCart,
} from "../../Redux/Actions/cartAction.js";
import { Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
// import { MdRemoveShoppingCart } from "react-icons/md";
import { MdRemoveShoppingCart } from "react-icons/md";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  console.log("cartItems::::::", cartItems);

  const increseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    console.log(
      "deleteCartItems :: :: :: :: :Carts:: :: :: :: :: :: :: ::",
      id
    );
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    const User = localStorage.getItem("user");
    if (!User) {
      navigate("/login?redirect=/shipping");
    }
    navigate("/shipping");
  };

  return (
    <Fragment>
      {typeof cartItems === "undefined" || cartItems.length === 0 ? (
        <div className="emptyCart">
          <MdRemoveShoppingCart />
          <Typography>No Product In Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard
                    item={item}
                    increaseQuantity={increseQuantity}
                    decreaseQuantity={decreaseQuantity}
                    deleteCartItems={deleteCartItems}
                  />

                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increseQuantity(item.product, item.quantity, item.stock)
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`$${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartBoxProfit">
              <div></div>
              <div className="cartBoxProfitBox">
                <p>Gross Total</p>
                <p>{`$${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
