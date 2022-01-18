import './App.css';
import Container from 'react-bootstrap/Container';
import OrderEntry from './pages/entry/OrderEntry';
// import SummaryForm from './pages/summary/SummaryForm';
import { OrderDetailsProvider } from './contexts/OrderDetails';

function App() {
  return (
    <Container>
      
      <OrderDetailsProvider>
        {/* Summary Page and entry page need the provider */}
      <OrderEntry />
      </OrderDetailsProvider>
      {/* Confirmation page doesn't need the provider */}
      {/* < SummaryForm /> */}
    </Container>
  );
}

export default App;
