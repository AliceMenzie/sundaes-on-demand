// fireEvent
import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import SummaryForm from '../SummaryForm';

describe("checkbox enables and disables confirm order button", () => {

    test('checkbox is unchecked by default', () => {
        render(< SummaryForm />)
        const checkbox = screen.getByRole('checkbox', {name: /terms and conditions/i})
        expect(checkbox).not.toBeChecked()

        const btn = screen.getByRole('button', {name: 'Confirm order'})
        expect(btn).toBeDisabled()
    })
    
    test('checking checkbox enables confirm order button', () => {
        render( <SummaryForm />)
        const checkbox = screen.getByRole('checkbox')
        const btn = screen.getByRole('button', {name: 'Confirm order'})

        // fireEvent.click(checkbox)
        userEvent.click(checkbox)

        expect(btn).toBeEnabled()

        // unchecking checkbox disables confirm order button
        // fireEvent.click(checkbox)
        userEvent.click(checkbox)
        expect(btn).toBeDisabled()
    })
    
})

