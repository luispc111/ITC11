import React from "react";
import { render, screen } from '@testing-library/react';
// import { act } from "react-dom/test-utils";

import Footer from "./Footer";

it("renderea texto del footer", () => {
  render(<Footer />);

  const credits = screen.getByText(/Creada por:/);
  const adrian = screen.getByText(/Adrián García/);
  const ale = screen.getByText(/Alejandra García/);
  const diego = screen.getByText(/Diego Estrada/);
  const luisito = screen.getByText(/Luis Alberto Pérez/);

  expect(credits).toBeInTheDocument();
  expect(adrian).toBeInTheDocument();
  expect(ale).toBeInTheDocument();
  expect(diego).toBeInTheDocument();
  expect(luisito).toBeInTheDocument();
});