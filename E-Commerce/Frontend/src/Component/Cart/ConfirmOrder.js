import React, { Fragment, useMemo } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0),
    [cartItems]
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = async () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    await sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  return (
    <Fragment>
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmShippinAreaBox">
              <div>
                <p>Name:</p>
                <span>{user?.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo?.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems?.map((item) => (
                <div key={item.product}>
                  <img src={item.image} alt={item.name} />
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                  <span>
                    {item.quantity} x ${item.price} ={" "}
                    <b>${(item.price * item.quantity).toFixed(2)}</b>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/*  */}

        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>${shippingCharges.toFixed(2)}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
