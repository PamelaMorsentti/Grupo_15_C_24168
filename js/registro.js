const formulario = document.getElementById("formulario"); // Accedemos al formulario
const inputs = document.querySelectorAll("#formulario input"); // Obtenemos acceso a todos los inputs del formulario y los guardamos en esta constante

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, números, guion y guion bajo
    password: /^.{4,12}$/, // 4 a 12 caracteres.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    fechaNacimiento: /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/ // Formato de fecha de nacimiento YYYY-MM-DD
};

// Inicializamos el objeto campos para todos los campos como falsos
const campos = {
    nombre: false,
    apellido: false,
    usuario: false,
    password: false,
    email: false,
    fn: false, // fecha de nacimiento
    edad: false
};

// Función para validar el formulario
const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, "nombre");
            break;
        case "apellido":
            validarCampo(expresiones.apellido, e.target, "apellido");
            break;
        case "usuario":
            validarCampo(expresiones.usuario, e.target, "usuario");
            break;
        case "email":
            validarCampo(expresiones.email, e.target, "email");
            break;
        case "password":
            validarCampo(expresiones.password, e.target, "password");
            validarPassword2();
            break;
        case "password2":
            validarPassword2();
            break;
        case "fn":
            validarFechaNacimiento(e.target.value);
            break;
        case "edad":
            validarEdad(e.target.value);
            break;
    }
};

// Función para validar campos según expresión regular
const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo_${campo}`).classList.remove("formulario_grupo-incorrecto");
        document.getElementById(`grupo_${campo}`).classList.add("formulario_grupo-correcto");
        document.querySelector(`#grupo_${campo} i`).classList.remove("uil-times-circle");
        document.querySelector(`#grupo_${campo} i`).classList.add("uil-check-circle");
        document.querySelector(`#grupo_${campo} .formulario_input-error`).classList.remove("formulario_input-error-activo");
        campos[campo] = true;
    } else {
        document.getElementById(`grupo_${campo}`).classList.add("formulario_grupo-incorrecto");
        document.getElementById(`grupo_${campo}`).classList.remove("formulario_grupo-correcto");
        document.querySelector(`#grupo_${campo} i`).classList.remove("uil-check-circle");
        document.querySelector(`#grupo_${campo} i`).classList.add("uil-times-circle");
        document.querySelector(`#grupo_${campo} .formulario_input-error`).classList.add("formulario_input-error-activo");
        campos[campo] = false;
    }
};

// Función para validar que las contraseñas coincidan
const validarPassword2 = () => {
    const inputPassword1 = document.getElementById("password");
    const inputPassword2 = document.getElementById("password2");

    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`grupo_password2`).classList.add("formulario_grupo-incorrecto");
        document.getElementById(`grupo_password2`).classList.remove("formulario_grupo-correcto");
        document.querySelector(`#grupo_password2 i`).classList.add("uil-times-circle"); // buscar el circulo con la cruz
        document.querySelector(`#grupo_password2 i`).classList.remove("uil-check-circle"); // cambie el fa-check-circle porque no funciona
        document.querySelector(`#grupo_password2 .formulario_input-error`).classList.add("formulario_input-error-activo");
        campos["password"] = false;
    } else {
        document.getElementById(`grupo_password2`).classList.remove("formulario_grupo-incorrecto");
        document.getElementById(`grupo_password2`).classList.add("formulario_grupo-correcto");
        document.querySelector(`#grupo_password2 i`).classList.remove("uil-times-circle");
        document.querySelector(`#grupo_password2 i`).classList.add("uil-check-circle");
        document.querySelector(`#grupo_password2 .formulario_input-error`).classList.remove("formulario_input-error-activo");
        campos["password"] = true;
    }
};

// Función para validar la fecha de nacimiento
const validarFechaNacimiento = (fecha) => {
    if (expresiones.fechaNacimiento.test(fecha)) {
        // Aquí puedes realizar cualquier validación adicional que necesites para la fecha de nacimiento
        document.getElementById(`grupo_fn`).classList.remove("formulario_grupo-incorrecto");
        document.getElementById(`grupo_fn`).classList.add("formulario_grupo-correcto");
        campos["fn"] = true;
    } else {
        document.getElementById(`grupo_fn`).classList.add("formulario_grupo-incorrecto");
        document.getElementById(`grupo_fn`).classList.remove("formulario_grupo-correcto");
        campos["fn"] = false;
    }
};

// Función para validar la edad
const validarEdad = (edad) => {
    // Aquí puedes agregar cualquier validación adicional que necesites para la edad
    if (edad >= 16) {
        document.getElementById(`grupo_edad`).classList.remove("formulario_grupo-incorrecto");
        document.getElementById(`grupo_edad`).classList.add("formulario_grupo-correcto");
        campos["edad"] = true;
    } else {
        document.getElementById(`grupo_edad`).classList.add("formulario_grupo-incorrecto");
        document.getElementById(`grupo_edad`).classList.remove("formulario_grupo-correcto");
        campos["edad"] = false;
    }
};

// Agregar eventos de validación para cada campo
inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});

// Validación del formulario al enviar
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const terminos = document.getElementById("terminos");
    if (campos.nombre && campos.apellido && campos.usuario && campos.password && campos.email && campos.fn && campos.edad && terminos.checked) {
        // Aquí puedes agregar el código para enviar el formulario si todos los campos son válidos
        formulario.reset();

        document.getElementById("formulario_mensaje-exito").classList.add("formulario_mensaje-exito-activo");
        setTimeout(() => {
            document.getElementById("formulario_mensaje-exito").classList.remove("formulario_mensaje-exito-activo");
        }, 5000);

        // Remover clases de éxito de todos los grupos
        document.querySelectorAll(".formulario_grupo-correcto").forEach((icono) => {
            icono.classList.remove("formulario_grupo-correcto");
        });
    } else {
        document.getElementById("formulario_mensaje").classList.add("formulario_mensaje-activo");
    }
});


// VALIDACION ALTERNATIVA para EMAIL
// const input = document.querySelector("input"),
//     emailIcon = document.querySelector(".email-icon");

// input.addEventListener("keyup", () => {
//     let pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
//     if (input.value = "") {
//         emailIcon.classList.replace("uil-check-circle", "uil-envelope");
//         return emailIcon.style.color = "#b4b4b4";
//     }

//     if (input.value.match(pattern)) {
//         emailIcon.classList.replace("uil-envelope", "uil-check-circle");
//         return emailIcon.style.color = "#4bb543";
//     }
//     emailIcon.classList.replace("uil-check-circle", "uil-envelope");
//     emailIcon.style.color = "#de0611";
// });