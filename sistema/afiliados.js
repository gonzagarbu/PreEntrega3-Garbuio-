
// LISTAR AFILIADOS DEL ARRAY
let listarAfiliado = document.getElementById("listado");
function renderizarAfiliados() {
  for(const afis of arrayAfiliadosLS){
    listarAfiliado.innerHTML += `
    <tr id="items" class="table-dark table-dark table-hover mb-3">
      <td class="mr-2">${afis.id}</td>
      <td class=" mr-2">${afis.nombreApellido}</td>
      <td class=" mr-2">${afis.nacionalidad}</td>
      <td class=" mr-2">${afis.email}</td>
      <td class=" mr-2">${afis.direccion}</td>
      <td class=" mr-2">${afis.dealta}</td>
      <td><button id='btn1${afis.id}' class="btn btn-danger btn-sm float-right eliminar">X</button> </td>
    </tr>
    `;
}
}
renderizarAfiliados();
//BOTON GRABAR
let miFormulario = document.querySelector("#formulario");
miFormulario.addEventListener("submit", cargaAfiliados);
let boton1 = document.getElementById("boton1");

boton1.onmouseover = () => {
  boton1.className = "btn btn-danger";
};

boton1.onmouseout = () => {
  boton1.className = "btn btn-primary";
};
// TRAER DATOS
const inputDni = document.getElementById("dni");
const inputNomApe = document.getElementById("apeNom");
const inputNacionalidad = document.getElementById("nacionalidad");
const inputEmail = document.getElementById("email");
const inputDireccion = document.getElementById("direccion");
// VALIDAR DATOS
inputDni.onchange = () => {
  if (!isNaN(inputDni.value)) {
    inputDni.style.color = "black";
  } else {
    inputDni.style.color = "red";
    alert("No se admiten numericos");
    inputDni.value = "";
  }
};
inputNomApe.oninput = () => {
  if (isNaN(inputNomApe.value)) {
    inputNomApe.style.color = "black";
  } else {
    inputNomApe.style.color = "red";
    alert("No se admiten caracteres");
    inputNomApe.value = "";
  }
};
inputNacionalidad.oninput = () => {
  if (isNaN(inputNacionalidad.value)) {
    inputNacionalidad.style.color = "black";
  } else {
    inputNacionalidad.style.color = "red";
    alert("No se admiten numericos");
    inputNacionalidad.value = "";
  }
};
//VALIDAR FORMULARIO
let ingreso = false;
function validarForm() {
  console.log(inputDni.value);
  console.log(inputNomApe.value);
  if (inputDni.value == "" || inputNomApe.value == "" || inputDireccion.value == "" || inputEmail.value == "" || inputNacionalidad.value == "") {
    alert("ERROR Debe completar todos los campos para continuar");
    inputDni.focus();
    ingreso = false;
  } else {
    ingreso = true;
  }
}
// FUNCION CARGA AFILIADOS
function cargaAfiliados(e) {
  e.preventDefault();
  validarForm();
  if (ingreso == true) {
    let opcion = confirm("Desea agragar al afiliado");
    if (opcion == true) {
      //Agrego
      const afiliadoNuevo = new Afiliados(
        inputDni.value,
        inputNomApe.value,
        inputNacionalidad.value,
        inputEmail.value,
        inputDireccion.value
      );
      arrayAfiliadosLS.push(afiliadoNuevo);
      guardar_localStorage();
      // Inserto en HTML
      let listarAfiliado = document.getElementById("listado");
      listarAfiliado.innerHTML += `
                <tr id="items" class="table-dark table-hover mb-3">
                    <td class="table-dark table-hover mr-2">${afiliadoNuevo.id}</td>
                    <td class="ttable-dark table-hover mr-2">${afiliadoNuevo.nombreApellido}</td>
                    <td class="table-dark table-hover mr-2">${afiliadoNuevo.nacionalidad}</td>
                    <td class="table-dark table-hover mr-2">${afiliadoNuevo.email}</td>
                    <td class="table-dark table-hover mr-2">${afiliadoNuevo.direccion}</td>
                    <td class="table-dark table-hover mr-2">${afiliadoNuevo.dealta}</td>
                    <td><button id='btn1${afiliadoNuevo.id}' class="btn btn-danger btn-sm float-right eliminar">X</button> </td>
                </tr>
                 `;
      alert(
        "Afiliado: " + afiliadoNuevo.nombreApellido + "\n ingresado con exito"
      );
      vaciarImputs();
    } else {
      alert("Se ha cancelado el ingreso del usuario");
    }
    inputDni.focus();
    vaciarImputs();
  }
}
// VACIAR IMPUTS
function vaciarImputs() {
  inputDni.value = "";
  inputDireccion.value = "";
  inputNacionalidad.value = "";
  inputEmail.value = "";
  inputNomApe.value = "";
}
// ELIMINAR AFILIADO
const botonBorrarAfi = document.querySelector("#listado");
botonBorrarAfi.addEventListener("click", (ev) => {
  eliminarAfiliado(ev.target);
  eliminarAfiliadoArray(
    ev.target.parentElement.previousElementSibling.previousElementSibling
      .previousElementSibling.previousElementSibling.previousElementSibling
      .textContent
  );
});
function eliminarAfiliado(ev) {
  if (ev.classList.contains("eliminar")) {
    ev.parentElement.parentElement.remove();
  }
}
function eliminarAfiliadoArray(ev) {
  console.log("trae")
  console.log(ev);
  var index = arrayAfiliadosLS.map((afi) => afi.nombreApellido).indexOf(ev);
  console.log("Index de la persona a eliminar: " +index);
  arrayAfiliadosLS.splice(index, 1);
  localStorage.setItem("afiliados", JSON.stringify(arrayAfiliadosLS));
}
// LOCAL STORAGE
function guardar_localStorage() {
  localStorage.setItem("afiliados", JSON.stringify(arrayAfiliadosLS));
}

