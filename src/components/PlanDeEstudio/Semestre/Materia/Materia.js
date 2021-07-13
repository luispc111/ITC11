import React from 'react';
import { Row, Col } from 'react-bootstrap';

/** Bloque de una materia individual **/
export default function Materia ({ nums, materia, tec21, clickMateria, listaColores }) {
  const {numSemestre, numMateria} = nums

  return (
    <div className="materia" style={{backgroundColor: listaColores[materia.color]?.color ?? '#BF7913'}} onClick={() => clickMateria(numSemestre, numMateria)}>
      <div className="labelMateria">
        <div className="nombre-materia">
          <label className="m-0">{materia.nombre}</label>
        </div>
        <label className="unidades d-block m-0">
          Unidades: {materia.unidades}
        </label>
      </div>
      {tec21 && (
        <Row className="tec21 p-0 m-0 w-100">
          <Col className={`bloque-tec21 ${(materia?.periodos ? materia?.periodos[0] : false) ? 'activo bg-white' : 'no-activo'} p-0 m-0`}></Col>
          <Col className={`bloque-tec21 ${(materia?.periodos ? materia?.periodos[1] : false) ? 'activo bg-white' : 'no-activo'} p-0 m-0`}></Col>
          <Col className={`bloque-tec21 ${(materia?.periodos ? materia?.periodos[2] : false) ? 'activo bg-white' : 'no-activo'} p-0 m-0`}></Col>
        </Row>
      )}
    </div>
  )
}
