var category = {};


// Funcion para mostrar imágenes
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
         <hr>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

// Función para mostrar comentarios
function mostrarComentarios (array) {
    let comments = " ";
    for (let i = 0 ; i < array.length; i++) {
        let comentarios = array[i];
        
        comments += `
        <div class="ist-group-item list-group-item">
            <div id="diseñoCt">
             <div ><b> ${comentarios.user} </b></div>
               <div id="estrelas"> ${mostrarEstrellas(comentarios.score)}</div>
               <div> <q>${comentarios.description} </q> </div>
               <div> ${comentarios.dateTime}</div>
               <br>
               <hr>
            </div>
            </div>
        `
        document.getElementById("datos").innerHTML = comments;
    }
}

/*document.getElementById("formulario").addEventListener("submit", function (e) {
    e.preventDefault()//evita que se refresque la pagina     
    addComment(e)
})

function addComment(e) {
    var usuario = localStorage.getItem("Nombre")
    var score = document.getElementById("puntaje").value
    var comment = document.getElementById("comentarioNuevo").value
    var fecha = new Date()  
      let htmlContentToAppend = "";
    var div = document.createElement("div")
     htmlContentToAppend += `
        <div class="row gx-5">
            <p>+showStars(score) +<br> <b>+ usuario +  -</b> + fecha+ <br> + comment +<br></p>
        </div>`
             div.innerHTML = htmlContentToAppend
            document.getElementById("comentarios").appendChild(div)
              }*/


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

    let productosRelacionados = "";

    for (let i = 0; i < category.relatedProducts.length; i++) {
        let relacionado= array[category.relatedProducts[i]];

        productosRelacionados +=`
         <div class="card-body">
         
         <div>  <a  href="products.html" target="_blank">
         <img class="img-fluid img-thumbnail" src=" ${relacionado.imgSrc}" alt=""></a> </div>
         <div> ${relacionado.currency} ${relacionado.cost}  <br>${relacionado.name}
         <br>
         <br>
         </div>
          </div>
        
          `
        document.getElementById("relatedtCriteria").innerHTML = productosRelacionados;
    }

}

// Función para calificar (estrellas)

var contador;
function calificar(item) {
    console.log(item);
    contador = item.id[0];
    let nombre = item.id.substring(1);

    for (let index = 0; index < 5; index++) {
        if (i < contador) {
            document.getElementById((i + 1) + nombre).style.color = "orange";
        } else {
            document.getElementById((i + 1) + nombre).style.color = "black";
        }

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
