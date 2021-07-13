import React from "react";
import { render } from '@testing-library/react';

import Materia from "./Materia";

const props = {
  nums: {
    numSemestre: jest.fn(),
    numMateria: jest.fn()
  },
  materia: {
    nombre: 'Progra 1',
    color: 0,
    unidades: '8',
    periodos: [true, false, false]
  },
  clickMateria: jest.fn()
};

const colores = [
  {
    color: '#AAA',
    nombre: 'a'
  }
]

it("renderiza una materia", () => {
  const { container, getByText } = render(<Materia
                                            nums={props.nums}
                                            materia={props.materia}
                                            tec21={false}
                                            clickMateria={props.clickMateria}
                                            listaColores={colores}
                                          />);

  expect(getByText(/Progra 1/)).toBeInTheDocument();

  expect(getByText(/Unidades: 8/)).toBeInTheDocument();

  const unidades = container.querySelector('.unidades');
  expect(unidades).toBeInTheDocument();
});

it("renderiza una materia de tec21", () => {
  const { container, getByText } = render(<Materia
                                            nums={props.nums}
                                            materia={props.materia}
                                            tec21={true}
                                            clickMateria={props.clickMateria}
                                            listaColores={colores}
                                          />);

  expect(getByText(/Progra 1/)).toBeInTheDocument();

  expect(getByText(/Unidades: 8/)).toBeInTheDocument();

  const unidades = container.querySelector('.unidades');
  expect(unidades).toBeInTheDocument();

  const seccionTec21 = container.querySelector('.tec21');
  expect(seccionTec21).toBeInTheDocument();

  const periodoActivo = container.querySelector('.bloque-tec21.activo');
  expect(periodoActivo).toBeInTheDocument();

  const periodosNoActivo = container.querySelectorAll('.bloque-tec21.no-activo');
  expect(periodosNoActivo[0]).toBeInTheDocument();
  expect(periodosNoActivo[1]).toBeInTheDocument();
});
