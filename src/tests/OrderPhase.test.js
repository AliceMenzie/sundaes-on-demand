// Functional test 

// this we don't need a wrapper becasue 
// we are calling on app which already
// wraps everything in our context provider 
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'


test('Order Phases for Happy path', async () => {
    // render app
    render(< App />)
    //  add icecream scoops and toppings 
    const scoop = await screen.findByRole('spinbutton', {name: 'Chocolate'})
    userEvent.clear(scoop);
    userEvent.type(scoop, "2");

    const topping = await screen.findByRole('checkbox', {name: 'Cherries'})
    userEvent.click(topping)
    // find and click order button

    // , {name: 'Place Order'}
    const placeOrder = screen.getByRole('button', {name: 'Place Order'})
    userEvent.click(placeOrder)
    // expect(placeOrder).toBeClicked()

    // check summary information based on order
    // render(< App orderPhase = 'review' />)

    const reviewScoop = await screen.findByText('Scoops: $', {exact: false})
    expect(reviewScoop).toHaveTextContent("4.00");
    
    const reviewTopping = await screen.findByText('Toppings: $', {exact: false})
    expect(reviewTopping).toHaveTextContent("1.50");
    
    // accept terms and conditions and click button to confirm order 

    const terms = screen.getByRole('checkbox', {name: /Terms and Conditions/i})
    userEvent.click(terms)
    const confirmOrder = screen.getByRole('button', {name: /confirm order/i})
    userEvent.click(confirmOrder)

    // TODO:
    //  confirm order number on confirmation page 
    const orderNum = await screen.findByText(/order number/i)
    expect(orderNum).toBeInTheDocument()
    
    const confirmOrderHeader = await screen.findByRole('heading', {name: /thank you/i})
    expect(confirmOrderHeader).toBeInTheDocument()
    // click new order on the confirmation page

    const newOrder = screen.getByRole('button', {name: /create new order/i})
    userEvent.click(newOrder)
    // check that scoops and toppings subtotals have been reset 

    const resetScoop = await screen.findByText('Scoops total: $0.00')
    expect(resetScoop).toBeInTheDocument()
    const resetTopping = await screen.findByText('Toppings total: $0.00')
    expect(resetTopping).toBeInTheDocument()
})