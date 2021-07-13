import React from "react";
import { render } from '@testing-library/react';

import PlanesDeEstudio from "./PlanesDeEstudio";

it("renderiza texto estático.", () => {
  const { getByText } = render(<PlanesDeEstudio />);

  expect(getByText("Selecciona tu plan de estudios:")).toBeInTheDocument();
});

// TODO: Hacer mocks de los requests al back
