import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

import BarrasDeProgreso from './BarrasDeProgreso/BarrasDeProgreso';
import Semestre from './Semestre/Semestre';

/** Boton individual de la lista de colores **/
const BotonDeColor = ({ color, cambiarColorSeleccionado, colorSeleccionado }) => {
  return (
    <div
      className={`boton-color bg-${color} ${(color === colorSeleccionado) ? 'boton-seleccionado' : ''}`}
      onClick={() => cambiarColorSeleccionado(color)}
    />
  )
}

/** Vista de la tabla de un plan de estudio individual, junto con una lista de colores y barras de progreso **/
export default function PlanDeEstudio() {

  // const { clave } = useParams();

  const [planDeEstudios, setPlanDeEstudios] = useState({materias: []});
  const [colores, setColores] = useState(["orange", "green", "blue", "purple", "pink", "red", "teal"])
  const [colorSeleccionado, setColorSeleccionado] = useState('green')
  const [cantMateriasPorColor, setCantMateriasPorColor] = useState({})
  const [cantMaterias, setCantMaterias] = useState(0);

  useEffect(() => {
    // TODO: request a la base de datos

    let materias = [
      {nombre: 'Fundamentos de programación',},
      {nombre: 'Programación Orientada a Objetos',},
      {nombre: 'Estructura de Datos',}
    ]

    let cant = 0;

    let carrera = [];

    for (let i = 0; i < 9; i++) {
      let semestre = [];

      for (let i = 0; i < 7; i++) {
        semestre.push(materias[Math.floor(Math.random() * 3)]);
        cant++;
      }

      carrera.push(semestre);
    }

    let plan = { nombre: 'ITC 11', tec21: false, materias: carrera };

    let cantMaterias = {}

    colores.forEach(color => {
      cantMaterias[color] = 0;
    })

    cantMaterias['orange'] = cant - 10;
    cantMaterias['green'] = 10;

    setPlanDeEstudios(plan);
    setCantMaterias(cant);
    setCantMateriasPorColor(cantMaterias);
  }, [])
  
  document.title = planDeEstudios.nombre

  const actualizarCantMaterias = (colorViejo, colorNuevo) => {
    console.log("a");
    let cantMaterias = cantMateriasPorColor;
    cantMateriasPorColor[colorViejo] -= 1;
    cantMateriasPorColor[colorNuevo] += 1;
    console.log(cantMateriasPorColor);
    console.log(cantMateriasPorColor[colorViejo]);
    console.log(cantMateriasPorColor[colorNuevo]);
    setCantMateriasPorColor(cantMaterias);
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2 className="titulo-tabla">
            Plan de estudios {planDeEstudios.nombre}
          </h2>
        </Col>
      </Row>
      <Row className="colorBtns mt-4">
        {colores.map((color, indice) => (
          <BotonDeColor
            key={indice}
            color={color}
            cambiarColorSeleccionado={setColorSeleccionado}
            colorSeleccionado={colorSeleccionado}
          />
        ))}
      </Row>
      <Row>
        <Col className="m-0 p-0 mt-4">
          <BarrasDeProgreso 
            listaColores={colores}
            cantMateriasPorColor={cantMateriasPorColor}
            totalMaterias={cantMaterias}
          />
        </Col>
      </Row>
      <Row className="mt-4">
        {planDeEstudios.materias.map((semestre, indice) => (
          <Semestre
            key={indice}
            materias={semestre}
            numSemestre={indice + 1}
            tec21={planDeEstudios?.tec21}
            colorSeleccionado={colorSeleccionado}
            listaColores={colores}
            actualizarCantMaterias={actualizarCantMaterias}
          />
        ))}
      </Row>
    </Container>
  )
}
