import React, { useContext } from 'react'
import { Navbar, Image, Nav, Button, Container } from 'react-bootstrap'
import { GoogleLogin } from "react-google-login";

import { PUBLIC_URL } from './../utils';
import { login, logout, G_CLIENT_ID } from "../auth";
import logoutIcon from "./logout_white_24dp.svg";
import { UserContext } from "../../context";

/**
 * Parte superior, contiene controles de manejo de sesión y perfil
 * 
 * @param {Boolean} loggedUser Indica el usuario de la sesión.
 */
export default function Header({ checarSesion, addToast }) {
  const loggedUser = useContext(UserContext);
  const { matricula } = loggedUser || {};

  const iniciarSesion = async ({ profileObj }) => {
    await login(profileObj, addToast);
    checarSesion();
  }

  const cerrarSesion = () => {
    logout();
    checarSesion();
  }

  return (
    <Navbar variant="dark" className="header-navbar p-0" expand="md" height={56}>
      <Container fluid className="fixed-top pr-3 pl-3" height={56}>
        <Navbar.Brand href={`${PUBLIC_URL}/#/`}>
          <h1> Planes de Estudio </h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="header-collapse" />
        <Navbar.Collapse id="header-collapse" className="justify-content-end">
          {loggedUser && (
            <>
              <Nav.Link href={`${PUBLIC_URL}/#/perfil/${matricula}`} className="element p-1">
                <Button className="d-flex p-1">
                  <div style={{ lineHeight: "1em" }} className="flex-grow-1">Ver<br/>Perfil</div>
                  <Image
                    className="imagen-perfil" 
                    width={40}
                    height={40}
                    src={loggedUser.urlFoto}
                    roundedCircle
                  />
                </Button>
              </Nav.Link>
              <Nav.Link href={`${PUBLIC_URL}/#/`} className="element p-1">
                <Button onClick={cerrarSesion} variant="danger" className="d-flex p-1">
                  <div style={{ lineHeight: "1em" }}>Cerrar<br/>Sesión</div>
                  <Image src={logoutIcon} width={40} height={40} alt="Cerrar sesión" />
                </Button>
              </Nav.Link>
            </>
          )}
          {!loggedUser && (
            <div className="element">
              <GoogleLogin
                clientId={G_CLIENT_ID}
                buttonText="Iniciar sesión"
                onSuccess={iniciarSesion}
                onFailure={(res) => console.log(res)}
                cookiePolicy={"single_host_origin"}
                prompt="select_account"
              />
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
