
let fecha = document.getElementById("fecha")
let hora = document.getElementById("hora")


//------FECHA-------------------------
const DateTime = luxon.DateTime

const fechaActual = DateTime.now()

let fechaDOM = fechaActual.toLocaleString(DateTime.DATE_FULL)
fecha.innerHTML = `${fechaDOM}`

//------HORA------------------------------

setInterval(() =>{
    let horaActual = DateTime.now().toLocaleString(DateTime.TIME_24_WITH_SECONDS)
    hora.innerHTML = `${horaActual}`
}, 1000)

