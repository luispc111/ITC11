import React, { useState, useEffect, useCallback } from 'react';
import { Button, Col, Container, Row, FormControl, InputGroup } from 'react-bootstrap';

const PlanesDeEstudio = () => {
  const [planesDeEstudio, setPlanesDeEstudio] = useState([]);

  const [filtroCarreras, setFiltroCarreras] = useState('');

  useEffect(() => {
    let planes = [
      {nombre: 'ITC 11', clave: 'itc_11',},
      {nombre: 'LAD 11', clave: 'lad_11',},
      {nombre: 'LAD 17', clave: 'lad_17',},
      {nombre: 'LAD 11', clave: 'lad_11',},
      {nombre: 'LAD 11', clave: 'lad_11',},
      {nombre: 'LAD 11', clave: 'lad_11',},
      {nombre: 'LAD 11', clave: 'lad_11',},
      {nombre: 'LAF 11', clave: 'laf_11',},
      {nombre: 'LAD 11', clave: 'lad_11',},
      {nombre: 'LAD 11', clave: 'lad_11',},
      {nombre: 'LAD 11', clave: 'lad_11',},
      {nombre: 'LAD 11', clave: 'lad_11',},
      {nombre: 'LAD 11', clave: 'lad_11',},
      {nombre: 'LAD 11', clave: 'lad_11',},
      {nombre: 'LAD 11', clave: 'lad_11',},
      {nombre: 'LAD 11', clave: 'lad_11',},
      {nombre: 'LAD 11', clave: 'lad_11',},
      {nombre: 'LAD 11', clave: 'lad_11',},
    ];

    setPlanesDeEstudio(planes);
  }, []);

  return (
    <Container fluid>
      <Row className="mb-3" width ="100%">
        <Col>
          <h1 className="titulo">Planes de estudio</h1>
        </Col>
      </Row>
      <Row className="mb-3" width ="100%">
        <h2 className="mb-4">
          Selecciona tu plan de estudios:
        </h2>
        <InputGroup>
          <FormControl
            placeholder="Ingresa tu carrera"
            aria-label="Clave del plan de estudio"
            onChange={(event) => {setFiltroCarreras(event.target.value.toUpperCase())}}
          />
        </InputGroup>
      </Row>
      <Row className="mb-3" width ="100%">
        {planesDeEstudio.filter(carrera => carrera.nombre.includes(filtroCarreras)).sort((a, b) => (a.nombre).localeCompare(b.nombre)).map(({clave, nombre}, indice) => (
          <Button
            className="m-2 boton-carrera"
            key={indice}
            variant="primary"
            value={clave}
            href={`/plan/${clave}`}
          >
            {nombre}    
          </Button>
        ))}
      </Row>
    </Container>
  )
}

export default PlanesDeEstudio;
