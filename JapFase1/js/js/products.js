//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

const ORDER_ASC_BY_PRICE = "precioA";
const ORDER_DESC_BY_PRICE = "precioD";
const ORDER_BY_PROD_COUNT = "Relevancia";
var categoriasProductos = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showCategoriesList() {

    let productsPages = " ";
    for (let i = 0; i < categoriasProductos.length; i++) {
        let category = categoriasProductos[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))) {
                

        productsPages +=
         `
        <div class="col-md-4">
           <div class="card  border-warning  mb-3 bg-light rounded" style="max-width: 120rem">
            <h4 class="card-title text-center shadow pt-2 text-dark">`+ category.name + `</h4>

              <p class="text-dark shadow text-center">
              <small>` + category.soldCount + ` articulos en stock</small>
              </p>

              <img src=` + category.imgSrc + ` alt="..">
              <br>

              <p class="deslizar text-dark text-center shadow d-flex w-100 justify-content-between">` + category.description + `</p>

             <p class="text-center text-light bg-warning"> ${category.currency} ${category.cost } </p>

             <a href="product-info.html" class="text-center">
             <button class="btn btn-primary button">+ Información</button>
             </a>
             <br>
           </div>
           </div>
         </div>
         `
        }

        document.getElementById("cat-list-container").innerHTML = productsPages;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
         categoriasProductos = categoriesArray;
    }

     categoriasProductos = sortCategories(currentSortCriteria,  categoriasProductos);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            categoriasProductos = resultObj.data;
            //Muestro las categorías ordenadas
            showCategoriesList(categoriasProductos);
        }
    
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_DESC_BY_PRICE);
    } ) ;

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();

});
    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showCategoriesList();
    });
}); 