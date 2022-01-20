import "./App.css";
import { useState } from "react";
import Container from "react-bootstrap/Container";

// import SummaryForm from './pages/summary/SummaryForm';
import { OrderDetailsProvider } from "./contexts/OrderDetails";

import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";


function App() {
  // 'inProgress' 'review' 'completed'
  const [orderPhase, setOrderPhase] = useState("inProgress");

  let Component = OrderEntry;
  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry;
      break;

    case "review":
      Component = OrderSummary;
      break;

    case "completed":
      Component = OrderConfirmation;
      break;

    default:
  }

  return (
    <OrderDetailsProvider>
      {/* Summary Page and entry page need the provider */}
      <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
    </OrderDetailsProvider>
  );
}

export default App;
