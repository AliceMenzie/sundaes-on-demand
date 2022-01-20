import axios from "axios"
import { useEffect, useState } from "react"
import { useOrderDetails } from "../../contexts/OrderDetails"

export default function OrderConfirmation({setOrderPhase}) {

    const [orderNum, setOrderNum] = useState(null)
    // below , , is ignoring the first two items and then destructing the third
    const [, , resetOrder] = useOrderDetails

    useEffect(() => {
        axios.post(`http://localhost:3030/order`)
        .then((response) => {
            setOrderNum(response.data.orderNumber)
        })
        .catch((error) => {
            // TODO handle error
        })
    }, [])

    function handleClick() {
        // reset order is where the context comes in 
        resetOrder();

        setOrderPhase('inProgress')
    }

    //  if orderNumber is falsey
    if (orderNum){
    return (
        <div>
            <h1>Thanks you!</h1>
            <p>Your order Number is </p>
            <p>as per our T&Cs, nothing will happen now</p>
            <button
            onClick={handleClick}
            >Create New Order</button>
        </div>
    )
} else {
 return (
     <div>
         Loading
     </div>
 )
}
}
