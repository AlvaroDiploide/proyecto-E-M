//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var category = {};
function mostrarProductos(array) {

    let productosRelacionados = " ";

    for (let i = 0; i < category.relatedProducts.length; i++) {
        let relacionado = array[category.relatedProducts[i]];

        productosRelacionados += `
         <div class="card-body">
         <div>  
         <img class="img-fluid img-thumbnail" src=" ${relacionado.imgSrc}" alt="#" ></div>
         <div class="relColor"> ${relacionado.currency} ${relacionado.cost}  <br>${relacionado.name}
         <br>
         </div>
        </div>
        
          `
        document.getElementById("poraca").innerHTML = productosRelacionados;
    }

}
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (productRE) {
        if (productRE.status === "ok") {

            productoslocos = productRE.data;

            mostrarProductos(productoslocos);
        };
    });
});

//Funcion para guardar datos del carrito al refrescar la página
function addLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function () {
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if (storage) {
        carrito = storage;
        renderCarrito()
    }

}

function removeItemCarrito(e) {
    const buttonDelete = e.target // nos da el boton al cual dimos click (en este caso el de eliminar)
    const tr = buttonDelete.closest(".itemCarrito");
    tr.remove()
    const alert = document.querySelector('.remove')
    setTimeout(function () {
        alert.classList.add('remove')
    }, 1000)
    alert.classList.remove('remove');
    console.log('te  lavaste');
}