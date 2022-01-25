import Options from "./Options"
import Button from 'react-bootstrap/Button'
import { useOrderDetails } from '../../contexts/OrderDetails';

export default function OrderEntry({setOrderPhase}) {

    const [orderDetails] = useOrderDetails();
    

    const orderDisabled = orderDetails.totals.scoops === '$0.00'

    console.log(orderDetails)
    return (
        <div style={{ textAlign: 'center', marginTop: '5rem' }}>
            <h1>Design Your Sundae!</h1>
            < Options optionType='scoops'  />
            < Options optionType='toppings'  />
            <h2>Grand Total: {orderDetails.totals.grandTotal}</h2>

            <Button
            onClick={() => setOrderPhase('review')}
            disabled={orderDisabled}
            >Place Order</Button>
        </div>
    )
}
