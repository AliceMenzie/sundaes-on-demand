import axios from "axios";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderConfirmation({ setOrderPhase }) {
  const [orderNumber, setOrderNumber] = useState(null);
  // below , , is ignoring the first two items and then destructing the third
  const [, , resetOrder] = useOrderDetails();

  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => {
        // TODO handle error
      });
  }, []);

  function handleClick() {
    // reset order is where the context comes in
    resetOrder();

    setOrderPhase("inProgress");
  }

  //  if orderNumber is falsey
  if (orderNumber) {
    return (
      <div style={{ textAlign: 'center', marginTop: '5rem' }}>
        <h1>Thank you!</h1>
        <p>Your order Number is { orderNumber } </p>
        <p style={{ fontSize: '45%' }}>as per our T&Cs, nothing will happen now</p>
        <Button onClick={handleClick}>Create New Order</Button>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
