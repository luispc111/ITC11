import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';

import { PUBLIC_URL, BACKEND_URL } from '../utils'; 
import { UserContext } from "./../../context";

import BarrasDeProgreso from './BarrasDeProgreso/BarrasDeProgreso';
import Semestre from './Semestre/Semestre';
import BotonesDeColor from './BotonesDeColor/BotonesDeColor';

import refreshIcon from "./refresh_white_24dp.svg";

/** Vista de la tabla de un plan de estudio individual, junto con una lista de colores y barras de progreso **/
export default function PlanDeEstudio() {
  const loggedUser = useContext(UserContext);
  const { matricula } = loggedUser || {};

  const { clave } = useParams();

  const { addToast } = useToasts();

  const [planDeEstudios, setPlanDeEstudios] = useState(undefined);

  const [colores, setColores] = useState(undefined);
  const [colorSeleccionado, setColorSeleccionado] = useState(1);
  
  const agregarToastError = (mensaje) => {
    addToast(`Error: ${mensaje || "Hubo un error de conexión al servidor."}`, {
      appearance: 'error',
      autoDismiss: true,
    });
  }

  const clickMateria = (sem, materia) => {
    let plan = JSON.parse(JSON.stringify(planDeEstudios));
    plan.materias[sem][materia].color = colorSeleccionado;
    setPlanDeEstudios(plan);
  }

  const clickSemestre = (sem) => {
    let plan = JSON.parse(JSON.stringify(planDeEstudios));
    plan.materias[sem].forEach(materia => materia.color = colorSeleccionado);
    setPlanDeEstudios(plan);
  }

  const guardarPlanificado = (e) => {
    let plan = {
      usuario: matricula,
      siglas: planDeEstudios.siglas,
      nombre: planDeEstudios.nombre,
      etiquetas: JSON.parse(JSON.stringify(colores)),
      materias: planDeEstudios.materias.map(sem => sem.map(materia => ({ clave: materia.clave, color: materia.color}))),
    }
    axios.put(`${BACKEND_URL}/planificados/${planDeEstudios._id}`, plan)
      .then(res => {
        addToast(`¡Actualización exitosa! ${res.data}`, {
          appearance: 'success',
          autoDismiss: true,
        });
      })
      .catch((err) => {
        console.log({...err});
        agregarToastError(err?.response?.data?.msg);
      });
  }

  /** Consigue la información del plan de estudios **/
  useEffect(() => {
    if (loggedUser === undefined) return;
    
    const conseguirPlan = async () => {
      if (loggedUser === null) {
        const resGet = await axios
          .get(`${BACKEND_URL}/planes/${clave}`)
          .catch((err) => err);
        if (resGet instanceof Error) {
          console.log(resGet);
          
          window.location = PUBLIC_URL;
          return;
        }
        const planOficial = JSON.parse(JSON.stringify(resGet.data));
  
        planOficial.materias = planOficial.materias.map(sem => sem.map(materia => {
          return {
            clave: materia.clave,
            nombre: materia.nombre,
            unidades: materia.unidades,
            color: 0,
            periodos: materia.periodos || [false, false, false]
          }
        }));
    
        setPlanDeEstudios(planOficial);
        setColores([
          { color: "#BF7913", nombre: 'Incompleto' },
          { color: "#439630", nombre: 'Completo' }
        ]);

        return;
      }
        
      const resPost = await axios
        .post(`${BACKEND_URL}/planificados/crearPlanificadoBase/${clave}`, { matricula })
        .catch((err) => err);
      if (resPost instanceof Error) {
        console.log(resPost);
        agregarToastError(resPost?.response?.data?.msg);
        window.location = PUBLIC_URL;
        return;
      }
      const oficial = resPost.data.oficial;
      const planificado = resPost.data.planificado;

      const plan = {
        _id: planificado._id,
        nombre: oficial.nombre,
        siglas: oficial.siglas,
        esTec21: oficial.esTec21,
        materias: oficial.materias.map(
          (sem, semIdx) => sem.map(
            (materia, matIdx) => ({
              nombre: materia.nombre,
              clave: materia.clave,
              color: planificado?.materias?.[semIdx]?.[matIdx]?.color ?? 0,
              unidades: materia.unidades,
              periodos: materia.periodos || [false, false, false]
            })
          )
        ),
      }

      setPlanDeEstudios(plan);
      setColores(planificado.etiquetas);
    }

    conseguirPlan();
  }, [clave, loggedUser, matricula, addToast]);

  const stillLoading = !planDeEstudios || !colores;
  if (stillLoading) {
    return (
      <section className="row mt-5">
        <div className="loading-logo" style={{ margin: "0 auto", textAlign: "center" }}>
          <img src={refreshIcon} alt="loading" />
          <p>Cargando plan de estudios...</p>
        </div>
      </section>
    );
  }
  
  document.title = planDeEstudios.nombre;

  /** Actualiza la cantidad de materias por color **/
  let cantMaterias = 0;
  const cantMateriasPorColor = colores.map(() => 0);
  const cantUnidadesPorColor = colores.map(() => 0);
  planDeEstudios.materias.forEach((semestre) => {
    semestre.forEach(materia => {
      cantMaterias++;
      cantMateriasPorColor[materia.color] += 1;
      cantUnidadesPorColor[materia.color] += materia.unidades;
    });
  });

  return (
    <Container fluid>
      <Row className="mt-3 justify-content-center">
        <h2 className="titulo-tabla font-weight-light">
          {planDeEstudios.nombre}
        </h2>
      </Row>
      <Row className="m-0 p-0 align-items-center">
        {loggedUser &&
          <Col xs={12} md={2} xl={1} className="mt-2 mb-2">
            <Button className="w-100" onClick={guardarPlanificado}> Guardar Plan </Button>
          </Col>
        }
        <BotonesDeColor
          colores={colores}
          cambiarColores={setColores}
          cambiarColorSeleccionado={setColorSeleccionado}
          colorSeleccionado={colorSeleccionado}
          cantMateriasPorColor={cantMateriasPorColor}
          cantUnidadesPorColor={cantUnidadesPorColor}
        />
      </Row>
      <Row>
        <Col className="m-0 p-0 mt-3">
          <BarrasDeProgreso 
            listaColores={colores}
            cantMateriasPorColor={cantMateriasPorColor}
            totalMaterias={cantMaterias}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        {planDeEstudios.materias.map((semestre, indice) => (
          <Semestre
            key={indice}
            numSemestre={indice}
            materias={semestre}
            tec21={planDeEstudios?.esTec21}
            colorSeleccionado={colorSeleccionado}
            clicks={{clickSemestre, clickMateria}}
            listaColores={colores}
          />
        ))}
      </Row>
    </Container>
  )
}
