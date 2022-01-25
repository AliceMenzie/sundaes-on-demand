import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ScoopOptions from '../ScoopOption.js'

test('invalid input turns scoop option box red', async () => {
    render( < ScoopOptions name="" imagePath="" updateItemCount={jest.fn()} />)

    // input a negative number 
    // , {name: 'Chocolate'}
    const chocInput = screen.getByRole('spinbutton')
    userEvent.clear(chocInput)
    userEvent.type(chocInput, '-1')
    expect(chocInput).toHaveClass('is-invalid')

    
    // input a float
    userEvent.clear(chocInput)
    userEvent.type(chocInput, '1.5')
    expect(chocInput).toHaveClass('is-invalid')

    // input greater than 10 
    userEvent.clear(chocInput)
    userEvent.type(chocInput, '11')
    expect(chocInput).toHaveClass('is-invalid')

    // check valid input
    userEvent.clear(chocInput)
    userEvent.type(chocInput, '2')
    expect(chocInput).not.toHaveClass('is-invalid')
})