// LSITAR PRACTICAS DEL ARRAY
let listarPracticas = document.getElementById("listadoPracticas");
function agregarPracticasListado() {
    for (const practica of arrayPracticasLS) {
        listarPracticas.innerHTML += `
     <tr class="table-dark table-hover mb-3">
        <td class="table-dark table-hover mr-2">${practica.cod_nom}</td>
        <td class="table-dark table-hover mr-2">${practica.nombreP}</td>
        <td class="table-dark table-hover mr-2">${practica.coseguro}</td>
        <td><button id='btn1${practica.id}' class="btn btn-danger btn-sm float-right eliminar">X</button> </td>
    </tr>
`;
    }
}
agregarPracticasListado();
//BOTON GRABAR
let form = document.getElementById("formulario1");
form.addEventListener("submit",cargaPracticas);
let boton = document.getElementById("boton2");
// CAMBIAR DE COLOR BOTON
boton.onmouseover = () => {
    boton.className = "btn btn-danger"
}
boton.onmouseout = () => {
    boton.className = "btn btn-primary"
}
// FUNCION CARGA AFILIADOS
const inputCodNom = document.getElementById("codNom")
const inputNombreP = document.getElementById("nombrep")
const inputCoseguro = document.getElementById("coseguro")
// EVENTO DE TECLADO
inputCodNom.onchange = () => {
    if (inputCodNom.value <= 0) {
        alert("Ingrese un numero mayor a 0");
        inputCodNom.value ="";
    }
}
inputCoseguro.onchange = () => {
    if (inputCoseguro.value <= 0) {
        alert("Ingrese un numero mayor a 0");
        inputCoseguro.value ="";
    }
}
inputNombreP.oninput = () => {
    if(isNaN(inputNombreP.value)) {
         inputNombreP.style.color="black";
    }
    else{
        inputNombreP.style.color="red"; 
        alert("No se admiten numericos");
        inputNombreP.value =""
    }
}
//VALIDAR FORMULARIO
let ingresoP = false;
function validarFormPracticas() {
    if ((inputCodNom.value == "") || (inputCoseguro.value == "")) {
        alert("ERROR Debe completar todos los campos para continuar");
        inputCodNom.focus();
        ingresoP = false;
    }
    else {
        ingresoP = true;
    }
}
function cargaPracticas(ev){
    ev.preventDefault();
    validarFormPracticas();
    if (ingresoP == true) {
        let opcion = confirm("Desea agragar la Practica");
        if (opcion == true) {
            //Agrego
            const practicaNuevo = new Practicas( inputCodNom.value, inputNombreP.value, inputCoseguro.value)
            arrayPracticasLS.push(practicaNuevo)
            console.table(arrayPracticasLS);
            guardar_localStorage();
            let listarPracticas = document.getElementById("listadoPracticas");
            listarPracticas.innerHTML += `
            <tr class="table-dark table-hover mb-3">
                <td class="table-dark table-hover mr-2">${practicaNuevo.cod_nom}</td>
                <td class="table-dark table-hover mr-2">${practicaNuevo.nombreP}</td>
                <td class="table-dark table-hover mr-2">${practicaNuevo.coseguro}</td>
                <td><button id='btn1${practicaNuevo.cod_nom}' class="btn btn-danger btn-sm float-right eliminarp">X</button> </td>
            </tr>
            `;
             alert("Se ha ingresado la practica con exito")
        }
      else {alert("Se ha cancelado el ingreso del usuario")}
      inputCodNom.focus();
      inputCodNom.value = ""
      inputCoseguro.value = "";
      inputNombreP.value = "";
     }
    }
 // ELIMINAR PRACTICAS
const botonBorrarPractica = document.querySelector("#listadoPracticas");
botonBorrarPractica.addEventListener("click", (es)=> {
    eliminarPractica(es.target);
    eliminarPracticaArray(es.target.parentElement.previousElementSibling.previousElementSibling.textContent);

})
function eliminarPractica(es) {
  if(es.classList.contains("eliminar")) {
    es.parentElement.parentElement.remove();
    localStorage.setItem("practicas", JSON.stringify(arrayPracticasLS))
    }
  }
function eliminarPracticaArray (es){
    console.log(es);
    var index = arrayPracticasLS.map(prac => prac.nombreP).indexOf(es);
    console.log(index);
    arrayPracticasLS.splice(index,1);
    localStorage.setItem("practicas",JSON.stringify(arrayPracticasLS));
    console.table(arrayPracticasLS);
}
//LOCAL STORAGE
function guardar_localStorage() {
    localStorage.setItem("practicas", JSON.stringify(arrayPracticasLS));
  }