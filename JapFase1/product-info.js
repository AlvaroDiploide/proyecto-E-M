var category = {};

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            category = resultObj.data;

            let categoryNameHTML = document.getElementById("categoryName");
            let categoryDescriptionHTML = document.getElementById("categoryDescription");
            let categoryCateHTML = document.getElementById("categoryCate");
            let productCountHTML = document.getElementById("productCount");
            let productCriteriaHTML = document.getElementById("productCriteria");
            let relatedProductsHTML = document.getElementById("relatedtCriteria");

            categoryNameHTML.innerHTML = category.name;
            categoryDescriptionHTML.innerHTML = category.description;
            categoryCateHTML.innerHTML = category.category;
            productCountHTML.innerHTML = category.currency + category.cost;
            productCriteriaHTML.innerHTML = category.soldCount;
            relatedProductsHTML.innerHTML = category.relatedProducts;

            //Muestro las imagenes en forma de galería
            showImagesGallery(category.images);
        }
    });
});


function showCategoriesList() {

    let productsPages = " ";
    for (let i = 0; i < categoriasProductos.length; i++) {
        let category = categoriasProductos[i];

        productsPages +=
            ` <a href="product-info.html" class="list-group-item list-group-item-action">
         <div class="ist-group-item list-group-item-action">
           <div class="row">
            <div class="col-3">
            <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
         </div>
         <div class="col">
         <div class="d-flex w-100 justify-content-between">
         <h4 class="mb-1">`+ category.name + `</h4>
         <small class="text-muted">` + category.soldCount + ` articulos </small>
           </div>
           <p>` + category.description + `</p>
           <p> ${category.cost}  ${category.currency}  </p>
           </div>
           </div>
           </div>`
    }

    document.getElementById("cat-list-container").innerHTML = productsPages;
}

