var cartproducts = {};

// Funcion para mostrar imágenes
function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let cartItem = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="${cartItem.src}" alt="#">
                <div>Nombre: ${cartItem.name} </div>
                 <div>cantidad: ${cartItem.count}</div>
                
                  <div>Precio:  ${cartItem.currency} ${cartItem.unitCost}</div>
            </div>
        </div>
        `

        document.getElementById("imagen").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (cartPino) {
        if (cartPino.status === "ok") {
            cartproducts = cartPino.data;


            let categoryNameHTML = document.getElementById("imagen");
      
            categoryNameHTML.innerHTML = cartproducts.name;
          
          
            //Muestro las categorías ordenadas
            showImagesGallery(cartproducts.articles);
        }

    });
});