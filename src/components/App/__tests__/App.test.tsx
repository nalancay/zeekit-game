import React from "react";
import { render, screen } from "@testing-library/react";
import App from "..";

test("renders learn react link", () => {
  render(<App />);
  const titleApp = screen.getByText(/Zeekit Game/i);
  expect(titleApp).toBeInTheDocument();
});
