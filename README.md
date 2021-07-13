# Planes de Estudio ITESM

Página web dónde puedes ver los diferentes planes de estudio del Tec de Monterrey. Te muestra las materias de cada plan de estudios en una tabla y te deja utilizar diferentes colores para marcarlas, ayudandote a planear tus siguientes semestres y ver tu progreso en la carrera. Puedes probarla [en este link](https://luispc111.github.io/PlanesDeEstudio/).

([Link del deploy de pruebas](https://dino-4-fantasticos.github.io/PlanesDeEstudio/#/))

La página usa la libreria de `html2canvas` para generar una imagen de la tabla del usuario.
- [Repositorio de Github](https://github.com/niklasvh/html2canvas)
- [Documentación](https://html2canvas.hertzen.com/)

## Instrucciones de la aplicación

La página está desarrollada en React, entonces si te sabes los scripts básicos del framework, no tendrás problema corriendo la aplicación.

### __Cómo instalarla__

Clona o descarga el repo, desde una terminal vete a la carpeta donde lo tengas y escribe `npm install` para instalar todas las dependencias de Node.

### __Cómo correrla__

Desde la terminal, escribe `npm start` estando en la carpeta del repo y la aplicación empezará a correr, abriendo automaticamente una pestaña en tu navegador de preferencia. Como estamos utilizando React, el servidor tiene '_hot reload_', por lo que se actualizará solo cada que guardes cambios.

También necesitas el servidor del back-end corriendo, encontrado en [este link](https://github.com/Dino-4-Fantasticos/PlanesDeEstudioBack).

### __Cómo correr las pruebas__

Desde la terminal, escribe `npm test` estando en la carpeta del repo y se empezarán las pruebas solas. Al igual que al correr la aplicación, cada vez que guardes cambios, las pruebas se correran solas de nuevo.

### __Variables de ambiente__

Necesitas las siguientes variables de ambiente:

```
REACT_APP_BACKEND_URL=http://localhost:5000/api
```

## Guía de contribución

### __Código__

Si quieres contribuir al código, crea un pull request con tu aportación. Al crear un pull request, asegurate que `proyecto-web` sea la branch objetivo e incluye el siguiente formato en la descripción del PR:

```
## Descripción

Pequeña descripción de la tarea

## Checklist

* [ ] La branch que se está mergeando está actualizada con la branch objetivo
* [ ] Agregaron pruebas unitarias
* [ ] Todas las pruebas pasaron localmente

## Checado por:

* [ ] Adrián
* [ ] Ale
* [ ] Diego
* [ ] Luisito
```

### __Plan de Estudio__

Si quieres aportar con la información de tu plan de estudios, mandanos la información del plan de estudio con el siguiente formato:

```json
{
  "nombre": "Ingeniería en CienciasComputacionales",
  "siglas": "ITC19",
  "esTec21": true,
  "materias": [
    [
      {
        "clave": "TC1018",
        "nombre": "Estructura de datos",
        "horasClase": 3,
        "horasLaboratorio": 0,
        "unidades": 8,
        "creditosAcademicos": 8,
        "unidadesDeCarga": 3.5,
        "periodos": [true, false, false] // únicamente para planes de estudios de Tec21
      }
    ]
  ]
}
```
