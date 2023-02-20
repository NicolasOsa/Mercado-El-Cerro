

// ---formulario validacion----------------
let formValidacion = document.getElementById("formValidacion")
let btnValidar = document.getElementById("btnValidar")

//----evento validacion--------

btnValidar.addEventListener("click", () =>{
   validarFormulario()
})


//-----inputs------------------


//----funcion validacion-----

function validarFormulario(){
    
    let inputNombre = document.getElementById("inputNombre")
    let inputApellido = document.getElementById("inputApellido")
    let inputEmail = document.getElementById("inputEmail")
    let inputClave = document.getElementById("inputClave")
    let inputCalle = document.getElementById("inputCalle") 
    let inputNum = document.getElementById("inputNum")
    let warnings = document.getElementById("warnings")

    warnings.innerHTML = ""

    const patronNombre =  /^[a-zA-ZÀ-ÿ\s]{1,40}$/
    resultado1 = patronNombre.test(inputNombre.value) 
     if(resultado1 == true){
        console.log('El nombre es valido')
     }else{warnings.innerHTML += 'El nombre no es valido <br>'}


    const patronApellido = /^[a-zA-ZÀ-ÿ\s]{1,40}$/
    resultado2 = patronApellido.test(inputApellido.value) 
     if(resultado2 == true){
        console.log('El apellido es valido')
     }else{warnings.innerHTML += 'El apellido no es valido <br>'}


    const patronEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    resultado3 = patronEmail.test(inputEmail.value) 
     if(resultado3 == true){
        console.log('El email es valido')
     }else{warnings.innerHTML += 'El e-mail no es valido <br>'}

    const patronClave = /^.{4,12}$/
    resultado4 = patronClave.test(inputClave.value) 
      if(resultado4 == true){
         console.log('La clave es valida')
      }else{warnings.innerHTML += 'La clave no es valida <br>'}

      
     const patronCalle = /^\d{0,4}[a-zA-ZÀ-ÿ\s]{1,40}$/
      resultado5 = patronCalle.test(inputCalle.value) 
      if(resultado5 == true){
          console.log('Direccion es valida')
        }else{warnings.innerHTML += 'La direccion no es valida <br>'}


    const patronNum = /^\d{1,5}$/
        resultado6 = patronNum.test(inputNum.value) 
        if(resultado6 == true){
            console.log('Direccion es valida')
          }else{warnings.innerHTML += 'La direccion no es valida <br>'}
      } 
        /* 
    const expresiones = {
        usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        password: /^.{4,12}$/, // 4 a 12 digitos.
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,14}$/ // 7 a 14 numeros.
    } */