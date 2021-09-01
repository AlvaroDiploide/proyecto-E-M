//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    if (localStorage.getItem("user") == null){
        window.location.herf = home.html
    }
    document.getElementById("desplegar").innerHTML = "Bienvenida/a" + localStorage.getItem("user");
});

function usuario(){
    var usuario = document.getElementById("correo").nodeValue;
    localStorage.setItem("user", usuario);
}