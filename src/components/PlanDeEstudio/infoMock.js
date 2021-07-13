export const MateriasEjemplo = [
  [
    { color: 0, unidades:  8, clave: 'TC1001', nombre: 'Materia 1' },
    { color: 1, unidades:  4, clave: 'TC1002', nombre: 'Materia 2' },
    { color: 2, unidades: 12, clave: 'TC1003', nombre: 'Materia 3' },
  ],
  [
    { color: 0, unidades:  8, clave: 'TC1004', nombre: 'Materia 4' },
    { color: 1, unidades:  4, clave: 'TC1005', nombre: 'Materia 5' },
    { color: 2, unidades: 12, clave: 'TC1006', nombre: 'Materia 6' },
  ]
]

export const MateriasEjemploTec21 = [
  [
    { color: 0, unidades:  8, clave: 'TC1001', nombre: 'Materia 1', bloques: [ true,  false, false ] },
    { color: 1, unidades:  4, clave: 'TC1002', nombre: 'Materia 2', bloques: [ false, true,  false ] },
    { color: 2, unidades: 12, clave: 'TC1003', nombre: 'Materia 3', bloques: [ false, false, true  ] },
  ],
  [
    { color: 0, unidades:  8, clave: 'TC1004', nombre: 'Materia 4' },
    { color: 1, unidades:  4, clave: 'TC1005', nombre: 'Materia 5' },
    { color: 2, unidades: 12, clave: 'TC1006', nombre: 'Materia 6' },
  ]
]

export const MateriasOficiales = [
  [
    { unidades:  8, clave: 'TC1001', nombre: 'Materia 1' },
    { unidades:  4, clave: 'TC1002', nombre: 'Materia 2' },
    { unidades: 12, clave: 'TC1003', nombre: 'Materia 3' },
  ],
  [
    { unidades:  8, clave: 'TC1004', nombre: 'Materia 4' },
    { unidades:  4, clave: 'TC1005', nombre: 'Materia 5' },
    { unidades: 12, clave: 'TC1006', nombre: 'Materia 6' },
  ]
]

export const MateriasOficialesTec21 = [
  [
    { unidades:  8, clave: 'TC1001', nombre: 'Materia 1', bloques: [ true,  false, false ] },
    { unidades:  4, clave: 'TC1002', nombre: 'Materia 2', bloques: [ false, true,  false ] },
    { unidades: 12, clave: 'TC1003', nombre: 'Materia 3', bloques: [ false, false, true  ] },
  ],
  [
    { unidades:  8, clave: 'TC1004', nombre: 'Materia 4', bloques: [ true,  false, false ] },
    { unidades:  4, clave: 'TC1005', nombre: 'Materia 5', bloques: [ false, true,  false ] },
    { unidades: 12, clave: 'TC1006', nombre: 'Materia 6', bloques: [ false, false, true  ] },
  ]
]

export const MateriasPlanificados = [
  [
    { color: 0, unidades:  8, clave: 'TC1001', nombre: 'Materia 1' },
    { color: 1, unidades:  4, clave: 'TC1002', nombre: 'Materia 2' },
    { color: 2, unidades: 12, clave: 'TC1003', nombre: 'Materia 3' },
  ],
  [
    { color: 0, unidades:  8, clave: 'TC1004', nombre: 'Materia 4' },
    { color: 1, unidades:  4, clave: 'TC1005', nombre: 'Materia 5' },
    { color: 2, unidades: 12, clave: 'TC1006', nombre: 'Materia 6' },
  ]
]

export const EtiquetasEjemplo = [
  { color: "#BF7913", nombre: 'Incompleto' }, 
  { color: "#439630", nombre: 'Completo' },
  { color: "#43A7D0", nombre: 'Verano' }
]

export const PlanOficial = {
  usuario: 'A00822222',
  siglas: 'ITC11',
  nombre: 'Ingeniería en Ciencias Computacionales',
  esTec21: false,
  materias: MateriasOficiales
}

export const PlanOficialTec21 = {
  usuario: 'A00822222',
  siglas: 'ITC19',
  nombre: 'Ingeniería en Ciencias Computacionales',
  esTec21: true,
  materias: MateriasOficialesTec21
}

export const PlanPlanificado = {
  usuario: 'A00822222',
  siglas: 'ITC11',
  nombre: 'Ingeniería en Ciencias Computacionales',
  etiquetas: EtiquetasEjemplo,
  materias: MateriasPlanificados
}
