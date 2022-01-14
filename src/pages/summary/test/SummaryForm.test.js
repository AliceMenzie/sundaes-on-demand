import { render, fireEvent, screen } from "@testing-library/react"
import SummaryForm from '../SummaryForm';

describe("checkbox enables and disables confirm order button", () => {

    test('checkbox is unchecked by default', () => {
        render(< SummaryForm />)
        const checkbox = screen.getByRole('checkbox', {name: 'I agree to'})
        expect(checkbox).not.toBeChecked()

        const btn = screen.getByRole('button', {name: 'Confirm order'})
        expect(btn).toBeDisabled()
    })
    
    test('checking checkbox enables confirm order button', () => {
        render( <SummaryForm />)
        const checkbox = screen.getByRole('checkbox')
        const btn = screen.getByRole('button', {name: 'Confirm order'})

        fireEvent.click(checkbox)

        expect(btn).toBeEnabled()

        // unchecking checkbox disables confirm order button
        fireEvent.click(checkbox)
        expect(btn).toBeDisabled()
    })
    
})

