import React from 'react'
import { ProgressBar } from 'react-bootstrap';

/** Barra para indicar el porcentaje de los distintos colores en el plan de estudios. **/
export default function BarrasDeProgreso({ listaColores, cantMateriasPorColor, totalMaterias }) {
  return (
    <ProgressBar className="m-0 barra-progreso">
      {listaColores.map((color, indice) => {
        let cant = (cantMateriasPorColor[indice] / totalMaterias * 100).toFixed(2) || 0;
        return (
          <ProgressBar
            className="barra"
            style={{backgroundColor: color.color}}
            now={cant}
            label={`${cant}%`}
            key={indice}
          />  
        )
      })}
    </ProgressBar>
  )
}
