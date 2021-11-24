var cartproducts = [];
var costoEnvio = 1.15;
let envio = document.getElementsByName('pago');


// Funcion para mostrar carrito y datos correspondientes
function mostrarCart() {
    let pord = cartproducts.articles;
    let addEndHTML = "";

  //  if (cartproducts.articles === 0) {
    //    document.getElementById("carrito").innerHTML ="";
   // }

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
                        <p>${cartItem.currency} <span class="datos1"> ${cartItem.unitCost}</span></p>
                    </td>
                    <td class="table__cantidad"><input type="number" min="1" onchange="cuentas('${cartItem.currency}')" value="${cartItem.count}">
                    <button class="delete btn btn-danger" onclick="eliminar(${i})">Eliminar</button>
                    </td>
               
                </tr>
        `
    }
    document.getElementById("carrito").innerHTML = addEndHTML;
    cuentas();
}
 
function eliminar(i) {
    cartproducts.articles.splice(i, 1);
    mostrarCart();
    cuentas();
}


// Función para cálculo de total y sub-total (recuadro inferior)
function cuentas(moneda) {
    let uniCost = document.getElementsByClassName("datos1"); // obtener datos dentro de span
    let cantProductos = document.getElementsByTagName("input"); // obtener valores de input
    let subtotal = 0;
    let costo = 0;
    let cantItem = 0;

    for (let i = 0; i < uniCost.length; i++) {
        
        if (moneda === "USD") {
    
            costo =  parseFloat(uniCost[i].innerHTML) * parseFloat(cantProductos[i].value);
        } else {
            costo = parseFloat(uniCost[i].innerHTML) * parseFloat(cantProductos[i].value);
        }
        subtotal += costo;
            cantItem += parseFloat(cantProductos[i].value);
    }
    costoEnvio =0;
    //let ninguno = true;
    for (let x=0; x< envio.length; x++){
        if (envio[x].checked){
            costoEnvio = cantProductos * parseFloat(envio[x].value);
            //ninguno = false;
        }

    }
    
    document.getElementById("sumaSub").innerHTML = `Sub-Total: USD ${subtotal}`;
    document.getElementById("sumaTotal").innerHTML = `Total: UYU ${Math.round(subtotal * 40)}`;
    document.getElementById('alerta').innerHTML=(costoEnvio).toFixed(2);
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_TWO).then(function (cartPino) {
        if (cartPino.status === "ok") {
            cartproducts = cartPino.data;
          
            //Muestrar resultados
            mostrarCart();
        }

    });
    for (let i=0; i< envio.length; i++){
        envio[i].addEventListener('click',()=>{
            cuentas();
        })
       
    }
});