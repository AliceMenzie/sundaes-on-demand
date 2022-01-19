import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "./Options";
import { OrderDetailsProvider } from "../../contexts/OrderDetails";
import OrderEntry from "./OrderEntry";

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
  userEvent.clear(fudgeInput);
  userEvent.click(fudgeInput);
  expect(toppingsTotal).toHaveTextContent("3.00");

  //  uncheck a box and assert on subtotal
  userEvent.click(fudgeInput);
  expect(toppingsTotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  // MOVED
  // this test call on the option component which then calls on the server
  // get an error even though code passes because the component is still updating afterwards
  // MOVED into other test where these changes are happening as part of test
  //   test.only("grand total starts at $0.00", async () => {
  //     render(<OrderEntry />, { wrapper: OrderDetailsProvider });

  //     const grandTotal = await screen.findByRole("heading", {
  //       name: /grand total: \$/i,
  //     });
  //     expect(grandTotal).toHaveTextContent("0.00");
  //   });
  test("grand total updates properly if scoops is added first", async () => {
    render(<OrderEntry />, { wrapper: OrderDetailsProvider });

    // MOVED HERE
    const grandTotal = await screen.findByRole("heading", {
      name: /grand total: \$/i,
    });

    expect(grandTotal).toHaveTextContent("0.00");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Raspberry",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    const fudgeInput = await screen.findByRole("checkbox", {
      name: "Hot Fudge",
    });
    userEvent.click(fudgeInput);
    expect(grandTotal).toHaveTextContent("5.50");
  });
  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />, { wrapper: OrderDetailsProvider });

    const grandTotal = await screen.findByRole("heading", {
      name: /grand total: \$/i,
    });

    const fudgeInput = await screen.findByRole("checkbox", {
      name: "Hot Fudge",
    });
    userEvent.click(fudgeInput);
    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Raspberry",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });
  test("grand total updates properly if item is removed", async () => {
    render(<OrderEntry />, { wrapper: OrderDetailsProvider });

    const grandTotal = await screen.findByRole("heading", {
      name: /grand total: \$/i,
    });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Raspberry",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    const fudgeInput = await screen.findByRole("checkbox", {
      name: "Hot Fudge",
    });
    userEvent.click(fudgeInput);
    expect(grandTotal).toHaveTextContent("5.50");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("3.50");

    userEvent.click(fudgeInput);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
