//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

/*async function insertar_contenido (){
 let response = await fetch (`https://japdevdep.github.io/ecommerce-api/product/all.json`)

let data = await response.json()

let div = document.getElementsByTagName('div')[2];

let filas = ' ';

for (let index = 0; index < data.length; index++) {
    filas += `<tr>
    <td>${data[index].name}</td>
    <td>${data[index].description}</td>
    <td>${data[index].cost}</td>
    <td>${data[index].currency}</td>
    <td>${data[index].imgSrc}</td>
    <td>${data[index].soldCount}</td>
    </tr>`
}

let resultado = `<table>
      <tr><th>Name</th>
      <th>description</th><th>cost</th>
      <th>.currency</th><th>imgSrc</th>
      <th>soldCount</th>
      </tr> 
      ${filas}
      </table>`

      div.innerHTML= resultado;
};
 
insertar_contenido();*/

var categoriasProductos = [];

function showCategoriesList(array) {

    let htmlContentToAppend = " ";
    for (let i = 0; i < array.length; i++) {
        let category = array[i];

        htmlContentToAppend += `<div class="list-group-item list-group-item-action">
           <div class="row">
            <div class="col-3">
            <img src="` +
            category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
         </div>
         <div class="col">
         <div class="d-flex w-100 justify-content-between">
         <h4 class="mb-1">`+ category.name + `</h4>
         <small class="text-muted">` + category.currency + category.cost + ` </small>
           </div>
           <p>` + category.description + `</p>
           </div>
           </div>
           </div>`

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            categoriasProductos = resultObj.data;
            //Muestro las categorías ordenadas
            showCategoriesList(categoriasProductos);
        }
    });

});
