// fireEvent
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react"
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

describe("terms and conditions pop-up", () => {

    test('popover responds to hover', async () => {
        render(< SummaryForm />)
        // popover starts out hidden
        const nullPopOver = screen.queryByText(/no ice cream will be delivered/i)
        const tAndC = screen.getByText(/terms and conditions/i)

        expect(nullPopOver).not.toBeInTheDocument()

        //  popover appears upon mouse over of checkbox label
        userEvent.hover(tAndC)
        const popOver = screen.getByText(/no ice cream will be delivered/i)
        expect(popOver).toBeInTheDocument()    

        // popover disappears when we mouse out
        userEvent.unhover(tAndC)
        await waitForElementToBeRemoved(() => screen.queryByText(/no ice cream will be delivered/i))
        // expect(nullPopOverAgain).not.toBeInTheDocument()
    })
})