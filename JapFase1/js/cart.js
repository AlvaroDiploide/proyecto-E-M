var cartproducts = [ ];

// Funcion para mostrar imágenes
function showImagesGallery() {
    let pord = cartproducts.articles;
    let htmlContentToAppend = "";
    let subTotal= 0;
    let iva = 0;
    let suma = 0;


    for (let i = 0; i < pord.length; i++) {
        let cartItem = pord[i];
        suma +=(cartItem.count) *(cartItem.unitCost);
        subTotal +=(cartItem.count) / 1.22;
        iva += subTotal * 22;

        htmlContentToAppend += `

          <tr>
                    <th scope="row-2"></th>
                    <td class="table__productos">
                        <img src="${cartItem.src}"alt="#">
                        <h6 class="Title"> "${cartItem.name}"</h6>
                    </td>
                    <td class="table__precio">
                        <p>${cartItem.currency} ${cartItem.unitCost}</p>
                    </td>
                    <td class="table__cantidad"><input type="number" min="1" value="${cartItem.count}">
                    </td>
                    <td class="row-cols-md-2"  id="subT">
                    </td>
                    <td class="row-cols-md-2"  id="iva(22%)">
                    </td>
                    <td class="row-cols-md-2"  id="suma">
                    </td>
                     

                     <td class="row-cols-md-1"  >
                     <button class="delete btn btn-danger">Eliminar</button>
                        <button class="btn btn-success">Comprar</button>
                    </td>
                </tr>
        `

    }
    document.getElementById("carrito").innerHTML = htmlContentToAppend;
    document.getElementById("suma").innerHTML = suma
    document.getElementById("subT").innerHTML = subTotal
    document.getElementById("iva(22%)").innerHTML = iva
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (cartPino) {
        if (cartPino.status === "ok") {
            cartproducts = cartPino.data;
            console.log (cartproducts);



          
          
            //Muestro las categorías ordenadas
            showImagesGallery();
        }

    });
});