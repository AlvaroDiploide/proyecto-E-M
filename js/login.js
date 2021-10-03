//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function ingreso() {
    var email = document.getElementById("correo").value;
    localStorage.setItem("key", email)
}

document.addEventListener("DOMContentLoaded", function(e){
    let correo2 = localStorage.getItem("key");
    document.getElementById("entrada").innerHTML = correo2;
});

function redireccionar (){
    if (localStorage.getItem("key") === null) {
        window.location.href = "index.html";
    }
}

// Funcion mostrar menu



