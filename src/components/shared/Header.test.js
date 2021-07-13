import React from "react";
import { render } from '@testing-library/react';

import Header from "./Header";
import { UserContext } from "../../context";

it("renderiza header cuando no se ha iniciado sesión", () => {
  const { getByText } = render(<Header/>);

  expect(getByText("Planes de Estudio")).toBeInTheDocument();
  expect(getByText("Iniciar sesión")).toBeInTheDocument();
});

it("renderiza header cuando se ha iniciado sesión", () => {
  const { getByText, container } = render(
    <UserContext.Provider value={{urlFoto: "https://i.stack.imgur.com/YaL3s.jpg"}}>
      <Header/>
    </UserContext.Provider>
  );

  expect(getByText("Planes de Estudio")).toBeInTheDocument();

  const imagenPerfil = container.querySelector('.imagen-perfil');
  expect(imagenPerfil).toBeInTheDocument();
});
