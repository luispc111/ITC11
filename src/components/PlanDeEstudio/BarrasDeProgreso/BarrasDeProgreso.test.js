import React from "react";
import { render } from '@testing-library/react';

import BarrasDeProgreso from "./BarrasDeProgreso";

const colores = [
  { color: "#BF7913", nombre: 'Incompleto' },
  { color: "#439630", nombre: 'Completo'   },
  { color: "#C14B4C", nombre: 'Semestre-1' },
  { color: "#2653AD", nombre: 'Semestre-2' },
  { color: "#633B8D", nombre: 'Semestre-3' },
  { color: "#B02828", nombre: 'Semestre-4' },
  { color: "#008080", nombre: 'Semestre-5' }
];
const cantMateriasPorColor = [
  [10, 0, 0, 0, 0, 0, 0],
  [2, 3, 4, 1, 0, 0, 0],
];

it("renderiza las barras de progreso", () => {

  const { container, getByText } = render(<BarrasDeProgreso
                                            listaColores={colores}
                                            cantMateriasPorColor={cantMateriasPorColor[0]}
                                            totalMaterias={10}
                                          />);

  expect(getByText(/100.00%/i)).toBeInTheDocument();
});

it("renderiza las barras de progreso con porcentajes diferentes", () => {

  const { container, getByText } = render(<BarrasDeProgreso
                                            listaColores={colores}
                                            cantMateriasPorColor={cantMateriasPorColor[1]}
                                            totalMaterias={10}
                                          />);

  expect(getByText(/20.00%/i)).toBeInTheDocument();
  expect(getByText(/30.00%/i)).toBeInTheDocument();
  expect(getByText(/40.00%/i)).toBeInTheDocument();
  expect(getByText(/10.00%/i)).toBeInTheDocument();
});
