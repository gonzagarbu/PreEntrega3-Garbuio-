const carrito = [];
let contenedor = document.getElementById("misprods");
// BUSCO EN LOCAL STORAGE SI HAY REGISTROS NUEVOS
const registroCarrito = JSON.parse(localStorage.getItem("carrito"));
if(registroCarrito !== null) {
  
    for (const objeto of registroCarrito) {
     carrito.push(new Practicas(objeto.cod_nom, objeto.nombreP, objeto.coseguro));
     document.getElementById("tablabody").innerHTML += `
     <tr class="table-dark table-hover mb-3">
         <td class="table-dark table-hover mr-2">${objeto.nombreP}</td>
         <td class="table-dark table-hover mr-2">${objeto.cod_nom}</td>
         <td class="table-dark table-hover mr-2">$ ${objeto.coseguro}</td>
         <td><button id="'btn1${objeto.cod_nom}'" class="btn btn-danger btn-sm float-right eliminarcarro">X</button> </td>
     </tr>
 `;
let totalCarrito = carrito.reduce((acumulador,prod)=>acumulador+prod.coseguro,0);
document.getElementById("total").innerText = "Total a pagar $: "+totalCarrito;
}
}
console.table(carrito);
// AGREGO PRODUCTOS QUE ESTAN EN EL ARRAY
function renderizarProductos(){
    for(const producto of arrayPracticasLS){
        contenedor.innerHTML += `
       
        <div class="col">
          <div class="card h-100 text-bg-dark">
            <img src="./img/imgmedicina.png" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title text-wrap text-center fs-6">${producto.nombreP}</h5>
              <p class="card-text text-wrap text-center fs-6">Codigo: ${producto.cod_nom}</p>
              <p class="card-text text-wrap text-center fs-6">Coseguro: $ ${producto.coseguro}</p>
              <button id='btn${producto.nombreP}' class="btn btn-primary mx-auto">Agregar</button>
            </div>
          </div>
        </div>
      
        `;
    }
    //EVENTOS
    arrayPracticasLS.forEach((producto)=>{
        //evento para cada boton
        document.getElementById(`btn${producto.nombreP}`).addEventListener("click",function(){
            agregarAlCarrito(producto);
            
        });
    });
}
// LLAMO A LA FUNCION RENDERIZAR
renderizarProductos();
// AGREGO CARRITO
function agregarAlCarrito(productoAComprar){
    carrito.push(productoAComprar);
    guardar_localStorage();
    console.table(carrito);
    alert("Practica "+productoAComprar.nombreP+" agregado al carro!");
    document.getElementById("tablabody").innerHTML += `
        <tr class="table-dark table-hover mb-3">
            <td class="table-dark table-hover mr-2">${productoAComprar.nombreP}</td>
            <td class="table-dark table-hover mr-2">${productoAComprar.cod_nom}</td>
            <td class="table-dark table-hover mr-2">$ ${productoAComprar.coseguro}</td>
            <td><button id="'btn1${productoAComprar.cod_nom}'" class="btn btn-danger btn-sm float-right eliminarcarro">X</button> </td>
        </tr>
    `;
    let totalCarrito = carrito.reduce((acumulador,prod)=>acumulador+prod.coseguro,0);
    document.getElementById("total").innerText = "Total a pagar $: "+totalCarrito;

}
// ELIMINAR ELEMENTOS DEL CARRITO
const botonBorrarAfi = document.querySelector("#listadocarrito");
botonBorrarAfi.addEventListener("click", (e)=> {
    eliminarCarrito(e.target);
    eliminarCarritoArray(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

})
function eliminarCarrito(e) {
  if(e.classList.contains("eliminarcarro")) {
    e.parentElement.parentElement.remove();
    
    }
  }
function eliminarCarritoArray (e){
    console.log(e);
    var index = carrito.map(carr => carr.nombreP).indexOf(e);
    console.log(index);
    carrito.splice(index,1);
    console.table(carrito);
    let totalCarrito = carrito.reduce((acumulador,e)=>acumulador+e.coseguro,0);
    document.getElementById("total").innerText = "Total a pagar $: "+totalCarrito;
    localStorage.setItem("carrito",JSON.stringify(carrito));
    console.table(carrito);

}
//LOCAL STORAGE
function guardar_localStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
// TRAIGO AFILIADOS
let listaafi = document.getElementById("listaafiopciones");  
let correo = document.getElementById("email");  
for(const afili of arrayAfiliadosLS){
   listaafi.innerHTML += `
      <option value="${afili.id}">${afili.nombreApellido}</option>
    `;
}





