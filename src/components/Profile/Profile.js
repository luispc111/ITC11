import React, { useContext, useState, useEffect } from 'react';
import { Image, Col, Container, Row } from 'react-bootstrap';
import axios from "axios";
import { useToasts } from 'react-toast-notifications';

import Planificado from "./Planificado";
import { BACKEND_URL, toQueryString } from "../utils"; 
import { UserContext } from "../../context";

async function fetchPlanificados(usuario, setPlanes, addToast) {
  const query = toQueryString({ usuario });
  const resGet = await axios
    .get(`${BACKEND_URL}/planificados?${query}`)
    .catch((err) => err);
  if (resGet instanceof Error) {
    addToast(`Error: ${resGet.message}`, {
      appearance: 'error',
      autoDismiss: true,
    });
    setPlanes(null);
    return;
  }
  setPlanes(resGet.data);
}

export default function Profile() {
  const loggedUser = useContext(UserContext);
  const [planes, setPlanes] = useState([]);

  const { addToast } = useToasts();

  useEffect(() => {
    if (!loggedUser) return;
    fetchPlanificados(loggedUser.matricula, setPlanes, addToast);
  }, [loggedUser, addToast]);

  return (
    <Container className="text-center mt-4">
      <Row>
        <Col className="Profile">
          <Image
            className="imagen-perfil-vista mb-4" 
            width={128}
            height={128}
            src={loggedUser?.urlFoto}
            roundedCircle
          />
          <h2>{`${loggedUser?.nombre} ${loggedUser?.apellido}`}</h2>
          <h2 className="font-weight-light">{loggedUser?.matricula}</h2>
          <div style={{ marginTop: "1.4em" }}>
            {!planes.length && (
              <p style={{ fontSize: "2em", fontWeight: "bold" }}>No tienes planes guardados.</p>
            )}
            {planes.map((p) => <Planificado plan={p} key={p.siglas} addToast={addToast} />)}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
