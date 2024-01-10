import React from "react";
import {
  FaPaypal,
  FaCcAmex,
  FaApplePay,
  FaGooglePay,
  FaCcMastercard,
} from "react-icons/fa";

const PaymentIcons = () => {
  return (
    <>
      <div className="home-payment">
        <div className="payment-header">
          <p>We accept payment by</p>
        </div>
        <div className="payment-icons">
          <FaPaypal className="paypal-icon" />
          <FaCcAmex className="amex-icon" />
          <FaApplePay className="apple-pay-icon" />
          <FaGooglePay className="google-pay-icon" />
          <FaCcMastercard className="mastercard-icon" />
        </div>
      </div>
    </>
  );
};

export default PaymentIcons;
