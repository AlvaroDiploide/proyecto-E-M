//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("entrada").innerHTML = localStorage.getItem("nombre");
});

function ingreso () {
    var email = document.getElementById("correo" ).value;
    localStorage.setItem("nombre", email )
}