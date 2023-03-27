////const inputNacimiento = document.querySelector("#birth");

//inputNacimiento.addEventListener("blur",(evento) => {
   ////validarNacimiento(evento.target) 
///})
export function valida (input){
    const tipodeInput = input.dataset.tipo;
   if (validadores[tipodeInput]){
    validadores[tipodeInput](input);
   }

   if(input.validity.valid){
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML=""
   } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = mostrarError(tipodeInput,input);
   }

}

const tipoErrores=[
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensajeError = {
    nombre:{
        valueMissing: "Este campo no puede estar vacio",
    },
    email:{
        valueMissing: "Este campo no puede estar vacio",
        typeMismatch: "El correo no es valido",

    },
    password:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
    },
    nacimiento:{
        valueMissing: "Este campo no puede estar vacio",
        customError: "Tener al menos 18 años",
    },
    numero:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es  XXXXXXXXXX",
    },
    direccion:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: " Minimo 10 caracteres - Maximo 40 caracteres",
    },
};

const validadores = {
    nacimiento: input => validarNacimiento(input)
   
};

function mostrarError(tipodeInput,input){
    let mensaje = " ";
    tipoErrores.forEach( error => {
        if (input.validity[error]) {
            console.log(tipodeInput,error);
            console.log (input.validity[error]);
            console.log(mensajeError[tipodeInput][error]);
            mensaje = mensajeError[tipodeInput][error];
        }
    });
    return mensaje
}

function validarNacimiento(input){
    const fechaCliente = new Date (input.value);
    let mensaje =""
    
    if(!mayorEdad(fechaCliente)){
        mensaje = "tener al menos 18 años";
    }
    input.setCustomValidity(mensaje)
}

function mayorEdad(fecha){
    const fechaActual = new Date ();
    const diferenciaFechas = new Date (
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate() 
        );

    return  diferenciaFechas <= fechaActual ;
}

///comando para levantar server y evitar el error de js module 
///browser-sync start -s -f . --directory en la terminal, instalar browser sync