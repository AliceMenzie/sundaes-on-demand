import { render, screen } from "@testing-library/react";
import Options from "../Options";

describe("testing the server responses", () => {
  test("displays image for each scoop option from the server", async () => {
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
