var category = {};


// Funcion para mostrar imágenes
function showImagesGallery(array) {

    let addContent = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        if (i === 0) {
        addContent += `
        <div class="carousel-item active">
            <img class="d-block w-100" src="${imageSrc}" alt="First slide">
         </div>
        `
    } else {
            addContent += `
        <div class="carousel-item ">
            <img class="d-block w-100" src="${imageSrc}" alt="First slide">
         </div>
         <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden"></span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden"></span>
              </button>
        `
    }
        document.getElementById("productImagesGallery").innerHTML = addContent;
    }
}

// Función para mostrar comentarios
function mostrarComentarios (array) {
    let comments = " ";
    for (let i = 0 ; i < array.length; i++) {
        let comentarios = array[i];
        
        comments += `
        <div class="ist-group-item list-group-item">
             <div ><b> ${comentarios.user} </b></div>
               <div id="estrelas"> ${mostrarEstrellas(comentarios.score)}</div>
               <div> <q>${comentarios.description} </q> </div>
               <div> ${comentarios.dateTime}</div>
               <br>
               <hr>
            </div>
        `
        document.getElementById("datos").innerHTML = comments;
    }
}


// Función para mostrar estrellas
function mostrarEstrellas(score) {
    let estrellas = "";

    for (let i = 1; i <=5; i++) {
        if (i<= score) {
            estrellas += `  <i class= "fas fa-star"></i>`;
        }
        else {
            estrellas += ` <i class= "far fa-star"></i>`;
        }
    }
    return estrellas;
}

// Función para mostrar productos relacionados
function mostrarProductos(array) {

    let productosRelacionados = " ";

    for (let i = 0; i < category.relatedProducts.length; i++) {
        let relacionado= array[category.relatedProducts[i]];

        productosRelacionados +=`
         <div class="card-body shadow"><div>  
            <img class="img-fluid img-thumbnail" src=" ${relacionado.imgSrc}" alt="#" ></div>
                <div class="relColor shadow"> ${relacionado.currency} ${relacionado.cost}  <br> ${relacionado.name}
                     <br>
                </div>
         </div>
        
          `
        document.getElementById("relatedtCriteria").innerHTML = productosRelacionados;
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

            categoryNameHTML.innerHTML = category.name;
            categoryDescriptionHTML.innerHTML = category.description;
            categoryCateHTML.innerHTML = category.category;
            productCountHTML.innerHTML = category.currency + category.cost;
            productCriteriaHTML.innerHTML = category.soldCount;

            //Muestro las imagenes en forma de galería
            showImagesGallery(category.images);
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (comentariosData) {

        comentariosArray = comentariosData.data;
        mostrarComentarios(comentariosArray);
});
    getJSONData(PRODUCTS_URL).then(function(productRE) {
        if (productRE.status === "ok") {

            productoslocos = productRE.data;

            mostrarProductos(productoslocos);
        };
    });
});
