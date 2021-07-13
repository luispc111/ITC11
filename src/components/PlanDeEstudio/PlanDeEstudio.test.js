import React from "react";
import { render, waitFor } from '@testing-library/react';

import { MemoryRouter, Route } from "react-router";
import axios from 'axios';
import { ToastProvider } from 'react-toast-notifications';

import PlanDeEstudio from "./PlanDeEstudio";
import { BACKEND_URL } from '../utils';
import { UserContext } from "./../../context";
import { 
  MateriasEjemplo,
  MateriasEjemploTec21,
  MateriasOficiales,
  MateriasOficialesTec21,
  MateriasPlanificados,
  EtiquetasEjemplo,
  PlanOficial,
  PlanOficialTec21,
  PlanPlanificado
} from './infoMock';

jest.mock('axios');

const PLAN_URL = (clave) => `${BACKEND_URL}/planes/${clave}`
const PLANIFICADO_URL = (clave) => `${BACKEND_URL}/planificados/${clave}`
const PLANIFICADO_PREDETERMINADO_URL = (clave) => `${BACKEND_URL}/planificados/crearPlanificadoBase/${clave}`
const componente = (clave) => <ToastProvider> <MemoryRouter initialEntries={[`/plan/${clave}`]}>  <Route path="/plan/:clave" component={PlanDeEstudio} /> </MemoryRouter> </ToastProvider>
const componenteSesionIniciada = (clave) => <UserContext.Provider value={{urlFoto: "https://www.dominio.com/imagen.jpg", matricula: 'A00822222'}}> {componente(clave)} </UserContext.Provider>
const componenteSesionNoIniciada = (clave) => <UserContext.Provider value={null}> {componente(clave)} </UserContext.Provider>

const data = [
  {
    data: PlanOficial
  },
  {
    data: PlanOficialTec21
  },
  {
    data: {
      oficial: PlanOficial,
      planificado: PlanPlanificado
    }
  }
]

it("renderiza que plan está cargando", async () => {
  const siglas = PlanOficial.siglas;
  axios.get.mockImplementationOnce(() => Promise.resolve(data[0]));

  const { getByText } = render(componenteSesionNoIniciada(siglas));

  expect(getByText(/Cargando plan de estudios.../)).toBeInTheDocument();
});

it("renderiza plan de estudios sin iniciar sesión", async () => {
  const siglas = PlanOficial.siglas;
  axios.get.mockImplementationOnce(() => Promise.resolve(data[0]));

  const { getByText, container } = render(componenteSesionNoIniciada(siglas));

  await waitFor(() => expect(axios.get).toHaveBeenCalledWith(PLAN_URL(siglas)));

  expect(getByText(/Ingeniería en Ciencias Computacionales/)).toBeInTheDocument();
  
  expect(getByText(/Semestre 1/)).toBeInTheDocument();

  expect(getByText(/Materia 1/)).toBeInTheDocument();
  expect(getByText(/Materia 2/)).toBeInTheDocument();
  expect(getByText(/Materia 3/)).toBeInTheDocument();
  expect(getByText(/Materia 4/)).toBeInTheDocument();
  expect(getByText(/Materia 5/)).toBeInTheDocument();
  expect(getByText(/Materia 6/)).toBeInTheDocument();

  expect(getByText(/100.00%/i)).toBeInTheDocument();

  expect(getByText(/Completo/)).toBeInTheDocument();
  expect(getByText(/Incompleto/i)).toBeInTheDocument();

  const botones = container.querySelectorAll('.boton-color');
  expect(botones.length).toBe(2);
  expect(botones[0]).toBeInTheDocument();
  expect(botones[1]).toBeInTheDocument();
});

it("renderiza plan de estudios tec21 sin iniciar sesión", async () => {
  const siglas = PlanOficialTec21.siglas;
  axios.get.mockImplementationOnce(() => Promise.resolve(data[1]));

  const { getByText, container } = render(componenteSesionNoIniciada(siglas));

  await waitFor(() => expect(axios.get).toHaveBeenCalledWith(PLAN_URL(siglas)));

  expect(getByText(/Ingeniería en Ciencias Computacionales/)).toBeInTheDocument();
  
  expect(getByText(/Semestre 1/)).toBeInTheDocument();

  expect(getByText(/Materia 1/)).toBeInTheDocument();
  expect(getByText(/Materia 2/)).toBeInTheDocument();
  expect(getByText(/Materia 3/)).toBeInTheDocument();
  expect(getByText(/Materia 4/)).toBeInTheDocument();
  expect(getByText(/Materia 5/)).toBeInTheDocument();
  expect(getByText(/Materia 6/)).toBeInTheDocument();

  expect(getByText(/100.00%/)).toBeInTheDocument();

  expect(getByText(/Completo/)).toBeInTheDocument();
  expect(getByText(/Incompleto/)).toBeInTheDocument();

  const botones = container.querySelectorAll('.boton-color');
  expect(botones.length).toBe(2);
  expect(botones[0]).toBeInTheDocument();
  expect(botones[1]).toBeInTheDocument();
});

it("renderiza plan de estudios con sesión iniciada", async () => {
  const siglas = PlanOficial.siglas;
  axios.post.mockImplementationOnce(() => Promise.resolve(data[2]));

  const { getByText, container } = render(componenteSesionIniciada(siglas));

  await waitFor(() => expect(axios.post).toHaveBeenCalledWith(PLANIFICADO_PREDETERMINADO_URL(siglas), { matricula: 'A00822222' }));

  expect(getByText(/Ingeniería en Ciencias Computacionales/i)).toBeInTheDocument();
  
  expect(getByText(/Semestre 1/)).toBeInTheDocument();

  expect(getByText(/Materia 1/)).toBeInTheDocument();
  expect(getByText(/Materia 2/)).toBeInTheDocument();
  expect(getByText(/Materia 3/)).toBeInTheDocument();
  expect(getByText(/Materia 4/)).toBeInTheDocument();
  expect(getByText(/Materia 5/)).toBeInTheDocument();
  expect(getByText(/Materia 6/)).toBeInTheDocument();

  const botones = container.querySelectorAll('.boton-color');
  expect(botones.length).toBe(3);
  expect(botones[0]).toBeInTheDocument();
  expect(botones[1]).toBeInTheDocument();
  expect(botones[2]).toBeInTheDocument();

  expect(getByText(/Completo/)).toBeInTheDocument();
  expect(getByText(/Incompleto/)).toBeInTheDocument();
  expect(getByText(/Verano/)).toBeInTheDocument();
});
