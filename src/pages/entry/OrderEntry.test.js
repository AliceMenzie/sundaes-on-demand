import { render, screen, waitFor } from "@testing-library/react";
import OrderEntry from "./OrderEntry";
import { rest } from "msw";
import { server } from "../../mocks/server";

describe("Alert banners on error", () => {
  test("handles errors for scoops and toppings routes", async () => {
    //  reset the handlers in the server
    server.resetHandlers(
      // create new handlers that will return errors
      //   scoops
      rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
        res(ctx.status(500))
      ),
      //   toppings
      rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
        res(ctx.status(500))
      )
    );

    render(<OrderEntry />);
        //  using waitFor becasue we have to get back two server responses without only getting back one
    await waitFor(async () => {
        const alerts = await screen.findAllByRole("alert", {
            // name: "An unexpected error occurred. Please try again later.",
          });
          expect(alerts).toHaveLength(2)

    })

    
  });
});
