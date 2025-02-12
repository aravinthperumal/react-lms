import { render } from "@testing-library/react";
import { NavBar } from "./NavBar";
import { BrowserRouter } from "react-router";

describe("Nab bar test", () => {
  it("render", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );
  });
});

