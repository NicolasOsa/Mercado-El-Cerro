
//--------------- PARA VER EN EL NAVEGADOR  --------------------------------------------------------------

//--- captura de los nodos DOM

let productos = document.getElementById('productos')
let guardarProdBtn = document.getElementById("guardarProdBtn")
let buscador = document.getElementById("buscador")
let respuesta = document.getElementById("respuesta")
let selectOrden = document.getElementById("selectOrden")
let botonCarrito = document.getElementById("botonCarrito")
let modalBodyCarrito = document.getElementById("modalBodyCarrito")
let formAgregarProd = document.getElementById("formAgregarProd")
let totalCarrito = document.getElementById("totalCarrito")
let btnFinalizarCompra = document.getElementById("btnFinalizarCompra")

let btnAlmacen = document.getElementById("btnAlmacen")
let btnLacteos = document.getElementById("btnLacteos")
let btnBebidas = document.getElementById("btnBebidas")
let btnLimpieza = document.getElementById("btnLimpieza")
let btnTodasCat = document.getElementById("btnTodasCat")



//-----FUNCIONES DE EL MERCADITO NAVEGADOR--------------------

function mostrarGondola(array){
    productos.innerHTML = ""
    for(let Producto of array){
    
        let nuevoProducto = document.createElement("div")
       
        nuevoProducto.classList.add("col-12", "col-md-6", "col-lg-4", "my-3")
        nuevoProducto.innerHTML = `
        <div id="${Producto.id}" class="card" style="width: 18rem;">
                <img class="card-img-top img-fluid" style="height: 200px;"src="imagenes/${Producto.imagen}" alt="${Producto.prod} de la marca ${Producto.marca}">
                <div class="card-body">
                            <h4 class="prodCard">${Producto.prod}</h4>
                            <p>${Producto.marca}</p>
                            <p>${Producto.categoria}</p>
                            <p class="">Precio: ${Producto.precio}</p>
                        <button id="agregarBtn${Producto.id}" class="btn btn-outline-success">Agregar al carrito</button>
                </div>
        </div>`
        productos.appendChild(nuevoProducto)

        let btnAgregar = document.getElementById(`agregarBtn${Producto.id}`)
           btnAgregar.addEventListener("click", ()=>{
           agregarAlCarrito(Producto)
            
        })
    }
}
 

//----------------AGREGAR al CARRITO-----------------------

let productosEnCarrito =  []

if (localStorage.getItem("carrito")){
    for(let producto of JSON.parse(localStorage.getItem("carrito"))){
        let cantStorage = producto.cantidad
        let productoCarr = new Producto(producto.id, producto.prod, producto.marca, producto.precio, producto.imagen, producto.categoria)
        productoCarr.cantidad = cantStorage
        productosEnCarrito.push(productoCarr)
    }
}else{
    productosEnCarrito = []
}


function agregarAlCarrito(producto){

    let productoAgregado = productosEnCarrito.find((elemento)=>elemento.id == producto.id)

    if(productoAgregado == undefined){

    productosEnCarrito.push(producto)
    
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
    Toastify({
        text: `Ha agregado el producto ${producto.prod} de la marca ${producto.marca}al carrito`,
        className: "info",
        timer: 2000,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();

    }else{
        Toastify({
            text: `El producto ${producto.prod} de la marca ${producto.marca} ya esta en el carrito`,
            className: "info",
            timer: 2000,
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
          }).showToast();
    }
    
}
//--------CARGAR PRODUCTO AL CARRITO----------------

function cargarCarrito(array){
    modalBodyCarrito.innerHTML = ""
    array.forEach((productoCarrito) => {
        modalBodyCarrito.innerHTML +=`
            <div class="card mb-3" id = "productoCarrito${productoCarrito.id}" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="imagenes/${productoCarrito.imagen}" class="img-fluid rounded-start" alt="...">
                        <button class= "btn btn-success" id="botonSumarUnidad${productoCarrito.id}"><i class=""></i>+1</button>
                         <button class= "btn btn-danger" id="botonEliminarUnidad${productoCarrito.id}"><i class=""></i>-1</button>
                    </div>
                 <div class="col-md-8">
                    <div class="card-body">
                        <button type="button" class="btn-close" aria-label="Close" id= "botonEliminar${productoCarrito.id}"></button>
                        <h5 class="card-title">${productoCarrito.prod}</h5>
                         <p class="card-text">${productoCarrito.marca}</p>
                         <p class="card-text"><small class="text-muted">$${productoCarrito.precio}</small></p>
                         <p class="card-text">Cantidad: ${productoCarrito.cantidad}</p>
                         <p class="card-text">SubTotal: ${productoCarrito.precio * productoCarrito.cantidad}</p>
                         
                    </div>
                 </div>
                </div>
            </div>
       
         `
    }); 
    //-----botones del carrito--------------------------
    array.forEach((productoCarrito) => {
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", ()=>{
            
            let cardPproducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
            cardPproducto.remove()
            let productoEliminar = array.find((prodEli)=>prodEli.id == productoCarrito.id)
            let posicion = array.indexOf(productoEliminar)
            array.splice(posicion, 1)
            localStorage.setItem('carrito', JSON.stringify(array))
            calculoTotalCarrito(array)
        })

        document.getElementById(`botonSumarUnidad${productoCarrito.id}`).addEventListener("click", () =>{
            productoCarrito.sumarUnidad()
            localStorage.setItem("carrito", JSON.stringify(array))
            cargarCarrito(array)
        })

        document.getElementById(`botonEliminarUnidad${productoCarrito.id}`).addEventListener('click', ()=>{

            let negativo = productoCarrito.restarUnidad()
            if(negativo<1){
                let cardPproducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
                cardPproducto.remove()
                let productoEliminar = array.find((prodEli)=>prodEli.id == productoCarrito.id)
                let posicion = array.indexOf(productoEliminar)
                array.splice(posicion, 1)
                localStorage.setItem('carrito', JSON.stringify(array))
                calculoTotalCarrito(array)
            }else{
                localStorage.setItem('carrito', JSON.stringify(array))
            }
            
            cargarCarrito(array)
        })
    })

    calculoTotalCarrito(array)
}


//----------------CARGAR PROD A LA GONDOLA-----------------------

function cargarProducto(array){
    
    let inputProd = document.getElementById("prodInput")
    let inputMarca = document.getElementById("marcaInput")
    let inputPrecio = document.getElementById("precioInput")
    let inputCategoria = document.getElementById("categoriaInput")

    const productoNuevo = new Producto(array.length+1, inputProd.value, inputMarca.value, inputPrecio.value, "nuevoProducto.jpg", inputCategoria.value)
    console.log(productoNuevo)
    
    array.push(productoNuevo)
    mostrarGondola(array)
    
    localStorage.setItem("gondola", JSON.stringify(array))
    mostrarGondola(array)

    formAgregarProd.reset()

    Swal.fire({
        icon: 'succes',
        title: 'Se ha agregado un producto',
        text: `El producto ${productoNuevo.prod} de la marca ${productoNuevo.marca} se ha agregado a la gondola.`,
      })
} 


//---------------BUSCAR PROD----------------------------

function buscarProdMarca(buscado, array) {
    
    let busquedaProd = array.filter(
        (articulo) => articulo.prod.toLowerCase().includes(buscado.toLowerCase()) || articulo.marca.toLowerCase().includes(buscado.toLowerCase())
        )
        
    busquedaProd.length == 0 ? (respuesta.innerHTML = `<h3>No hay stock del producto buscado</h3>`, mostrarGondola(busquedaProd))
    : (respuesta.innerHTML = "",  mostrarGondola(busquedaProd))

}

//--------------ORDENAR PRODUCTOS------------------------

function ordenarMenorMayor(array){
    
    const menorMayor = [].concat(array)
    
    menorMayor.sort((a,b) => a.precio - b.precio)
    mostrarGondola(menorMayor)
}

function ordenarMayorMenor(arr){

const mayorMenor = [].concat(arr)
mayorMenor.sort((param1, param2)=>{
    return param2.precio - param1.precio
})
mostrarGondola(mayorMenor)
}

function ordenarAlfabeticamente(array){
const ordenadoAlfabeticamente = [].concat(array)
 ordenadoAlfabeticamente.sort((a,b) => {
      if(a.prod > b.prod) {
        return 1
      }
      if (a.prod < b.prod) {
        return -1
      }
      
      return 0;
})
mostrarGondola(ordenadoAlfabeticamente)
}

// -----------BOTONES DE CATEGORIAS------------------------
function categoriasBtn(BotonCat, array){ 
      
    let artCategoria = array.filter(
        (Producto) => (Producto.categoria.toLowerCase() == BotonCat.toLowerCase()))
    
    artCategoria.length == 0 ? (respuesta.innerHTML = `<h3>No hay stock del producto buscado</h3>`, mostrarGondola(artCategoria))
    : (respuesta.innerHTML = "",  mostrarGondola(artCategoria))
}

 
//-----------------CALCULAR TOTAL CARRITO-----------------

function calculoTotalCarrito(array){
    let total = array.reduce((acc, productoCarrito)=> acc + (productoCarrito.precio * productoCarrito.cantidad), 0)
    
    total == 0 ? totalCarrito.innerHTML = `No hay productos en el carrito` :
    totalCarrito.innerHTML = `Total de la compra: $<strong>${total}</strong>`

    return total
}

//--------------------FINALIZAR COMPRA---------------------

function finalizarCompra(){
    console.log('funciona la funcion')

    Swal.fire({
        title: 'Esta seguro de finalizar la compra?',
        showDenyButton: true,        
        confirmButtonText: 'Comprar',
        denyButtonText: `No comprar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Su compra esta confirmada!', '', 'success')
          productosEnCarrito = []
          localStorage.removeItem('carrito')
        } else if (result.isDenied) {
          Swal.fire('Su compra aun no se confirmo.', '', 'info')
        }
      })

}


// ------------ EVENTOS----------------------------------

guardarProdBtn.addEventListener("click", ()=>{
    cargarProducto(gondola)    
})


buscador.addEventListener("input", ()=>{    
    buscarProdMarca(buscador.value, gondola)
}) 


selectOrden.addEventListener("change", ()=>{
    console.log(selectOrden.value)
    if(selectOrden.value == 1){
        ordenarMayorMenor(gondola)        
    }else if(selectOrden.value == 2){
        ordenarMenorMayor(gondola)
    }else if(selectOrden.value == 3){
        ordenarAlfabeticamente(gondola)        
    }else{
        mostrarGondola(gondola)
    }
})

botonCarrito.addEventListener("click", () =>{
    cargarCarrito(productosEnCarrito)
})

btnFinalizarCompra.addEventListener("click", () =>{ 
    finalizarCompra()
})


//----eventos botones categorias--------

btnAlmacen.onclick = () => {       
    categoriasBtn('almacen', gondola)    
}

btnLacteos.onclick = () => {    
    categoriasBtn('lacteos', gondola)
}

btnBebidas.onclick = () => {    
    categoriasBtn('bebidas', gondola)
}

btnLimpieza.onclick = () => {    
    categoriasBtn('limpieza', gondola)
}

btnTodasCat.onclick = () => {
    mostrarGondola(gondola)
}



//---------INVOCACION DE LA GONDOLA------------

mostrarGondola(gondola)