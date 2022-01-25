import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from '@testing-library/user-event'
import Options from "../Options";


describe("testing the server responses", () => {
  test("displays image for each scoop option from the server", async () => {
    // before global wrapper
    // render(<Options optionType="scoops" /> , { wrapper: OrderDetailsProvider });
    render(<Options optionType="scoops" />);

    // find images
    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    // confirm alt text of images
    const altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual(["Chocolate scoop", "Raspberry scoop"]);
  });

  test("displays image for each topping option from the server", async () => {
    render(<Options optionType="toppings" />);

    // find images
    const toppingImgs = await screen.findAllByRole("img", { name: /topping$/i })
    expect(toppingImgs).toHaveLength(3)

    // confirm alt text of images
    const altText = toppingImgs.map((element) => element.alt)
    expect(altText).toEqual(['Cherries topping', "M&Ms topping", "Hot Fudge topping"])
  });

});

test('the scoop subtotal doesn\'t up date with invalid input', async () => {
  render(< Options optionType='scoops' />)

  // enter invalid scoops 
  const scoop = await screen.findByRole('spinbutton', {name: 'Chocolate'})
  userEvent.clear(scoop)
  userEvent.type(scoop, '12')
  // check subtotal is $0.00
  const scoopTotal = screen.getByText('Scoops total: $', {exact: false})
  expect(scoopTotal).toHaveTextContent(0.00)
  // OR
  // const scoopTotal = screen.getByText('Scoops total: $0.00')
  // expect(scoopTotal).toBeInTheDocument()

} )