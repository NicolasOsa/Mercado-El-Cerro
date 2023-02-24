
// ---captura nodos validacion----------------
let formValidacion = document.getElementById("formValidacion")
let btnValidar = document.getElementById("btnValidar")

let inputNombre = document.getElementById("inputNombre")
let inputApellido = document.getElementById("inputApellido")
let inputEmail = document.getElementById("inputEmail")
let inputClave = document.getElementById("inputClave")
let inputCalle = document.getElementById("inputCalle") 
let inputNum = document.getElementById("inputNum")
let warnings = document.getElementById("warnings")

let entrarCtaBtn = document.getElementById("entrarCtaBtn")
let emailAccesoInput = document.getElementById("emailAccesoInput")
let claveAccesoInput = document.getElementById("claveAccesoInput")
let usuarioEntrar = document.getElementById("usuarioEntrar")
let formEntrarCta = document.getElementById("formEntrarCta")
let warningAcceso = document.getElementById("warningAcceso")

//------creacion de usuario---------
class Usuario{
   constructor(id, nombre, apellido, email, clave, calle, numero){
       this.id = id,
       this.nombre = nombre,
       this.apellido = apellido,
       this.email = email,
       this.clave = clave,
       this.calle = calle,
       this.numero = numero
      }
   } 
   
let usuarios = []
   
//----funcion validacion-----


function validarFormulario(){  
   
   const expresiones = {   
      nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
      apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
      email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      clave: /^.{4,12}$/, 
      calle: /^\d{0,4}[a-zA-ZÀ-ÿ\s]{1,40}$/,
      numero: /^\d{1,7}$/ 
   } 
   warnings.innerHTML = ""
   
   const patronNombre = expresiones.nombre
   resultado1 = patronNombre.test(inputNombre.value) 
    resultado1 == false && (warnings.innerHTML += 'El nombre no es valido <br>')


    const patronApellido = expresiones.apellido
    resultado2 = patronApellido.test(inputApellido.value) 
     resultado2 == false && (warnings.innerHTML += 'El apellido no es valido <br>')


    const patronEmail = expresiones.email
    resultado3 = patronEmail.test(inputEmail.value) 
     resultado3 == false && (warnings.innerHTML += 'El e-mail no es valido <br>')

    const patronClave = expresiones.clave
    resultado4 = patronClave.test(inputClave.value) 
      resultado4 == false && (warnings.innerHTML += 'La clave no es valida <br>')
      
    const patronCalle = expresiones.calle
      resultado5 = patronCalle.test(inputCalle.value) 
      resultado5 == false && (warnings.innerHTML += 'La calle de ladireccion no es valida <br>')

    const patronNum = expresiones.numero
        resultado6 = patronNum.test(inputNum.value) 
        resultado6 == false && (warnings.innerHTML += 'El numero de la direccion no es valido <br>')
       

generarUsuario(usuarios)
} 



function generarUsuario(array){
   
   const nuevoUsuario = new Usuario(array.length+1, inputNombre.value, inputApellido.value, inputEmail.value, inputClave.value, inputCalle.value, inputNum.value)
   
   console.log(nuevoUsuario)
   array.push(nuevoUsuario)
   console.log(usuarios)
   localStorage.setItem("usuarios", JSON.stringify(array))
    
        Swal.fire({
        icon: 'success',
        title: 'Se ha cargado su usuario',
        text: `${nuevoUsuario.nombre} ${nuevoUsuario.apellido} Bienvenido a mercado El Cerro. Ya puede hacer su compra.`,
      }) 
   
   formValidacion.reset()
} 


function entrarCuenta(){
   
   let usActual = JSON.parse(localStorage.getItem("usuarios"))
   
   let usuarioActual = usActual.find(usuario => {
      return usuario.email == emailAccesoInput.value;
   })
   
   if(usuarioActual == undefined) {(warningAcceso.innerHTML = 'El usuario no exite.')
   }else{
      console.log(usuarioActual)
      let verificacion = usuarioActual.clave == claveAccesoInput.value
      verificacion == true ? usuarioEntrar.innerHTML =`Usuario: ${usuarioActual.nombre} ${usuarioActual.apellido}` 
      : (warningAcceso.innerHTML = 'Contraceña incorrecta!Escriba la contraceña nuevamente.')
   }
   
   //formEntrarCta.reset()
}



//----evento validacion--------
      
btnValidar.addEventListener("click", () =>{
    validarFormulario()
})

entrarCtaBtn.addEventListener("click", ()=>{
   entrarCuenta()
})