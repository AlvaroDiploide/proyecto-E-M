//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    let username = localStorage.getItem("nombreInicio");
    if (localStorage.getItem==null){
        location.href = "home.html"
    } else {
        document.getElementById("seccion").innerHTML=`Bienvenido ${username}`
    }
});

function datos(){
    var usuario=document.getElementById("correo").value;
    localStorage.setItem("nombreInicio", usuario);
}