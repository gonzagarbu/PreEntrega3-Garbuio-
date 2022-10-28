// BUSCO EN LOCAL STORAGE SI HAY REGISTROS NUEVOS
const registroUsuarios = JSON.parse(localStorage.getItem("usuarios"));
if(registroUsuarios !== null) {
    for (const objeto of registroUsuarios) {
     arrayUsuariosLS.push(new Usuarios(objeto.usuario, objeto.nombre, objeto.email, objeto.contrasenia));
}
}
console.table(arrayUsuariosLS);
// DATOS DE IMPUTS
const inputUsuario = document.getElementById("dniu")
const inputNomApeU = document.getElementById("apenomu")
const inputEmail = document.getElementById("correou")
const inputContrasenia = document.getElementById("password")
//BOTON GRABAR
let miFormularioUsuarios = document.getElementById("botonusuario");
miFormularioUsuarios.onclick = () => {
    cargaUsuarios();
}
//EVENTOS PARA VALIDAR IMPUTS
inputNomApeU.oninput = () => {
  if(isNaN(inputNomApeU.value)) {
       inputNomApeU.style.color="white";
  }
  else{
      inputNomApeU.style.color="red"; 
      alert("No se admiten numericos");
      inputNomApeU.value =""
  }
}
inputUsuario.oninput = () => {
  if(!isNaN(inputUsuario.value)) {
    inputUsuario.style.color="white";
  }
  else{
    inputUsuario.style.color="red"; 
      alert("Solo se admiten numeros");
      inputUsuario.value =""
  }
}
// FUNCION CARGA USUARIOS
function cargaUsuarios(){
    const usuarioNuevo = new Usuarios( inputUsuario.value, inputNomApeU.value, inputEmail.value, inputContrasenia.value)
    arrayUsuariosLS.push(usuarioNuevo);
    guardar_localStorage();
    console.table(arrayUsuarios);
    borrarDatosFormulario();
  alert("Usuario: " +usuarioNuevo.nombre+ " Registrado con exito!!");
  console.table(arrayUsuariosLS);
}
function guardar_localStorage() {
    localStorage.setItem("usuarios", JSON.stringify(arrayUsuariosLS));

}
// FUNCION PARA BORRAR DATOS DE FORMULARIOS
function borrarDatosFormulario() {
  inputUsuario.value = "";
  inputNomApeU.value = "";
  inputEmail.value = "";
  inputContrasenia.value = "";
}


