import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "./Options";
import { OrderDetailsProvider } from "../../contexts/OrderDetails";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  // make sure total starts out at $0
  const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubtotal).toHaveTextContent("0.00");

  // update vanilla scooops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Raspberry",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check the subtotal
  const chocInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocInput);
  userEvent.type(chocInput, "2");
  expect(scoopSubtotal).toHaveTextContent("6.00");
});

// toppings are checked or unchecked

test("update toppings subtotal when scoops change", async () => {
  render(<Options optionType="toppings" />, { wrapper: OrderDetailsProvider });

  // assert on default toppings total is 0.00
  const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("0.00");

  // find and check on box, assert on updated subtotal
  const cherriesInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.clear(cherriesInput);
  expect(cherriesInput).not.toBeChecked();
  userEvent.click(cherriesInput);
  expect(cherriesInput).toBeChecked();
  expect(toppingsTotal).toHaveTextContent("1.50");

  // tick another box and and assert on subtotal
  const fudgeInput = await screen.findByRole("checkbox", {
    name: "Hot Fudge",
  });
  userEvent.clear(fudgeInput)
  userEvent.click(fudgeInput)
  expect(toppingsTotal).toHaveTextContent('3.00')
  
  //  uncheck a box and assert on subtotal
  userEvent.click(fudgeInput)
  expect(toppingsTotal).toHaveTextContent("1.50");
});
