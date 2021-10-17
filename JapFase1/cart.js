var cartproducts = [];

// Funcion para mostrar carrito y datos correspondientes
function mostrarCart() {
    let pord = cartproducts.articles;
    let addEndHTML = "";

    for (let i = 0; i < pord.length; i++) {
        let cartItem = pord[i];

        addEndHTML += `

          <tr>
                    <th scope="row-2"></th>
                    <td class="table__productos">
                        <img src="${cartItem.src}" alt="#">
                        <h6 class="Title"> "${cartItem.name}"</h6>
                    </td>
                    <td class="table__precio">
                        <p>${cartItem.currency} ${cartItem.unitCost}</p>
                    </td>
                    <td class="table__cantidad"><input type="number" min="1" value="${cartItem.count}">
                    <button class="delete btn btn-danger">Eliminar</button>
                    </td>
               
                </tr>
        `
    }
    document.getElementById("carrito").innerHTML = addEndHTML;  
}

// Función para cálculo de total y sub-total (recuadro inferior)
function cuentas() {
    let prod = cartproducts.articles;
    let addEndHTML = "";
    let subTotal= 0;
    let suma = 0;
    
    for(let i = 0; i < prod.length; i++) {
        let cartItem = prod[i];
        suma += parseFloat(cartItem.count) * parseFloat(cartItem.unitCost);
        subTotal += parseFloat(cartItem.count) * parseFloat(cartItem.unitCost);

        if (i == 0) {
        addEndHTML += `
             <tr>
             <td class="row-cols-md-4"  id="subT"></td>
                <td class="row-cols-md-2"  id="suma"></td>
                <td class="row-cols-md-1">
                <button class="btn btn-success">Comprar</button>  
             </td>
             </tr>
                    `
            }
    }
    document.getElementById("consumo__final").innerHTML = addEndHTML;
    document.getElementById("suma").innerHTML = suma
    document.getElementById("subT").innerHTML = subTotal
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_TWO).then(function (cartPino) {
        if (cartPino.status === "ok") {
            cartproducts = cartPino.data;
          
            //Muestrar resultados
            mostrarCart();
            cuentas();
        }

    });
});