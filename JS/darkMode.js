let botonDarkMode = document.getElementById("botonDarkMode")
let botonLightMode = document.getElementById("botonLightMode")


let modoOscuro 


if(localStorage.getItem("modoOscuro")){
    modoOscuro = localStorage.getItem("modoOscuro")
}else{
    localStorage.setItem("modoOscuro", false)
    modoOscuro = localStorage.getItem("modoOscuro")
} 


if(modoOscuro == "true"){
    document.body.classList.add("darkMode")
}else{
    document.body.classList.remove("darkMode")
}
//-------eventos DarkMode------------------------

botonDarkMode.addEventListener("click",()=>{
    document.body.classList.add("darkMode")
    localStorage.setItem("modoOscuro", true)
})

botonLightMode.addEventListener("click",()=>{
    document.body.classList.remove("darkMode")
    localStorage.setItem("modoOscuro", false)
})



