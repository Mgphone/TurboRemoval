// import { PaymentRequestButtonElement } from "@stripe/react-stripe-js";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// function Success() {
//   const { sessionId } = useParams();
//   const [paymentInfo, setPaymentInfo] = useState(null);
//   useEffect(() => {
//     // let isMounted = true;
//     // console.log("useeffect is working");
//     const fetchPayment = async () => {
//       try {
//         const response = await fetch(
//           // `${process.env.REACT_APP_SERVER_URL}paymentbooking/success`,
//           "http://192.168.1.216:4000/paymentbooking/success",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ checkout_session: sessionId }),
//           }
//         );
//         if (!response.ok) {
//           throw new Error(`Response error:${response.status}`);
//         }
//         const data = await response.json();
//         // if (isMounted) {
//         //   setPaymentInfo(data);
//         // }
//         setPaymentInfo(data);
//       } catch (error) {
//         console.error("Error Fetching payment information", error);
//       }
//     };
//     fetchPayment();
//     // return () => {
//     //   isMounted = false;
//     // };
//   }, []);
//   console.log(paymentInfo);
//   return (
//     <>
//       <h1>Payment Successful 🎉🫰</h1>;
//       {paymentInfo && <p>{JSON.stringify(paymentInfo)}</p>}
//     </>
//   );
// }

// export default Success;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Success() {
  const { sessionId } = useParams();
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    const fetchPaymentInformation = async () => {
      try {
        console.log(
          "Request Body:",
          JSON.stringify({ checkout_session: sessionId })
        );

        const response = await fetch(
          "http://192.168.1.216:4000/paymentbooking/success",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ checkout_session: sessionId }),
          }
        );

        if (!response.ok) {
          throw new Error(`Response error: ${response.status}`);
        }

        const data = await response.json();
        setPaymentInfo(data);
      } catch (error) {
        console.error("Error fetching payment information", error);
      }
    };

    fetchPaymentInformation();
  }, [sessionId]);

  return (
    <>
      <h1>Payment Successful 🎉🫰</h1>
      {paymentInfo && (
        <div>
          <p>Payment Information:</p>
          <pre>{JSON.stringify(paymentInfo, null, 2)}</pre>
        </div>
      )}
    </>
  );
}

export default Success;
