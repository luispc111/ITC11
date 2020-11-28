let materias;
let maxLength = 0;
let materiasSem = [];

function createTable(studyPlan) {

    let settings = {
        url: `json/${studyPlan}.json`,
        method: "GET",
        success: function (responseJSON){
            console.log(responseJSON);
            materias = responseJSON;

            // creates array where classes will be stored
            materiasSem = [];

            // stores classes in array seprated by semester
            for (let i = 0; i < materias.length; i++) {
                // creates a new semester in case needed
                while (materiasSem.length < materias[i].semestre) {
                    materiasSem.push([]);
                }
                materiasSem[materias[i].semestre - 1].push(materias[i]);
            }

            // localStorage.cantSemestres = materiasSem.length;

            console.log(materiasSem);
            // creates the quantity of semesters in study plan
            for (let i = 1; i <= materiasSem.length; i ++) {
                $("#rowSemester").append(`
                <th id="s${i}" style="background-color: #BF7913;" class="semestre"><label class="labelSemestre">Semestre ${i}</label></th>
                `);
            }

            // checks the maximum quantity of classes on a single semester
            for (let i = 0; i < materiasSem.length; i++) {
                if (materiasSem[i].length > maxLength) {
                    maxLength = materiasSem[i].length;
                }
            }

            // creates trs for the table where courses will be added
            for (let i = 0; i < maxLength; i++) {
                $(".courseRows").append(`
                <tr id="row${i+1}">
				</tr>
                `);
            }
        
            // poblates table with the classes of each semester
            for (let i = 0; i < materiasSem.length; i++) {
                for (let j = 0; j < maxLength; j++) {
                    let num = j+1;
                    
                    // checks if there's a class or if it needs to create an empty <td></td> for the table to be correct
                    if (materiasSem[i][j] != undefined) {
                        $("#row" + num).append(`
                        <td id="s${materiasSem[i][j].semestre}m${num}" style="background-color: #BF7913;" value="${materiasSem[i][j].clave}" class="materia"><label class="labelMateria">${materiasSem[i][j].nombre}</label></td>
                        `);
                    } 
                    else {
                        $("#row" + num).append(`<td></td>`);
                    }
                    
                }
            }
            sendMethodsJS(materias.length);
            materiasBtns();
        },
        error: function (error) {
            console.log(error);
        }
    }

    $.ajax(settings);
}

// function requisitosON(a){
//     // materias requisitos se ponen este contorno
    
//     var i;
//     var j;
//     for (i = 0; i < materiasSem.length; i++) {
//         for(j = 0; j < materiasSem[i].length; j++){
//             // if(materiasSem)
//         }
//     }
//     // alert(a.name);
//     // alert()
// }