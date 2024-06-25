import React, { useState, useEffect, useRef, Fragment } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./Payment.css";
import { FaRegCreditCard } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { MdOutlineVpnKey } from "react-icons/md";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const payBtn = useRef(null);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:4000/api/v1/payment",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        alert("error");
        console.log("error from payment result");
      } else {
        if (result.paymentIntent.status === "succeeded") {
          //WE WILL PUT ORDER HERE
          navigate("/success");
        } else {
          alert("there was some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert(error);
    }
  };

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  return (
    <Fragment>
      {console.log("---------rendering payment log----------")}
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <FaRegCreditCard />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <MdEventAvailable />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <MdOutlineVpnKey />
            <CardCvcElement className="paymentInput" />
          </div>
          <input
            type="submit"
            value={`Pay - $${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
