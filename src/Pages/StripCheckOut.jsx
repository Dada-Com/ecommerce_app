import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
// import "../Features/payment/Stripe.css";
import { useSelector } from "react-redux";
import {
  selectCurrentOrder,
  selectOrderStatus,
} from "../Features/Order/OrderSlice";
import { Grid } from "react-loader-spinner";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51NR8TRSIR2yADWSE7i4bR0un46QxZXqkooFtB2xmHDY5Xpb6AEbt9ebCemlwvJTKMzWvT4m4cDIhNFUUqHvyVmnk00BCTG0t7M"
);

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectCurrentOrder);
  const status = useSelector(selectOrderStatus);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:8080/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        totalAmount: currentOrder.totalAmount,
        orderId: currentOrder.id,
      }),
      meta: {
        order_id: currentOrder.id,
      },
      // this info will go to stripe  => and then to our weebhook
      //so we can conclude that the payment was sucessfull, even if client closes window after pay
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {/* {currentOrder === null ? (
        <div className="mx-6  my-6">
          <Grid
            height="150"
            width="150"
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : null} */}
      {currentOrder && currentOrder.totalAmount && clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
