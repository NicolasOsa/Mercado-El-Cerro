
class Producto{
    constructor(id, prod, marca, precio, imagen, categoria){
        this.id = id,
        this.prod = prod,
        this.marca = marca,
        this.precio = precio,
        this.imagen = imagen,
        this.categoria = categoria,
        this.cantidad = 1
    }

    sumarUnidad(){
        this.cantidad = this.cantidad + 1
        return this.cantidad
    }
    
    restarUnidad(){
        this.cantidad = this.cantidad - 1
        return this.cantidad
    }
}


let gondola = []

const cargarGondola = async () =>{
    const response = await fetch ("productos.json")
    const data = await response.json()
    console.log(data)
    for(let producto of data){
        let productoNuevo = new Producto(producto.id, producto.prod, producto.marca, producto.precio, producto.imagen, producto.categoria)
        gondola.push(productoNuevo)
    } 
}



if(localStorage.getItem("gondola")){
    for(let producto of JSON.parse(localStorage.getItem("gondola"))){
        let productoNuevo = new Producto(producto.id, producto.prod, producto.marca, producto.precio, producto.imagen, producto.categoria)
        gondola.push(productoNuevo)
    }
    console.log(gondola)
   
}else{   
    cargarGondola()
}
 