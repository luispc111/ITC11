import React from "react";
import { render } from '@testing-library/react';

import Semestre from "./Semestre";

const materias = [
  {
    nombre: 'Progra 1',
    color: 0,
  },
  {
    nombre: 'Progra 2',
    color: 1,
  },
  {
    nombre: 'Progra 3',
    color: 2,
  },
]

const colores = [
  { color: "#BF7913", nombre: 'Incompleto' },
  { color: "#439630", nombre: 'Completo'   },
  { color: "#C14B4C", nombre: 'Semestre-1' },
  { color: "#2653AD", nombre: 'Semestre-2' },
  { color: "#633B8D", nombre: 'Semestre-3' },
  { color: "#B02828", nombre: 'Semestre-4' },
  { color: "#008080", nombre: 'Semestre-5' }
];

const props = {
  clicks: {
    clickMateria: jest.fn(),
    clickSemestre: jest.fn()
  },
  nums: {
    numSemestre: jest.fn(),
    numMateria: jest.fn()
  },
};

it("renderiza un semestre", () => {

  const { getByText } = render(<Semestre
                                            numSemestre={0}
                                            materias={materias}
                                            tec21={false}
                                            colorSeleccionado={0}
                                            clicks={props.clicks}
                                            listaColores={colores}
                                          />);

  expect(getByText(/Semestre 1/)).toBeInTheDocument();
});

it("renderiza las materias de un semestre", () => {

  const { container, getByText } = render(<Semestre
                                            numSemestre={0}
                                            materias={materias}
                                            tec21={false}
                                            colorSeleccionado={0}
                                            clicks={props.clicks}
                                            listaColores={colores}
                                          />);

  expect(getByText(/Semestre 1/)).toBeInTheDocument();
  expect(getByText(/Progra 1/)).toBeInTheDocument();
  expect(getByText(/Progra 2/)).toBeInTheDocument();
  expect(getByText(/Progra 3/)).toBeInTheDocument();
});
