
// Función para ir agregando los productos al carrito!
// el querySelector me permite tener alguna clase de button o ID
const clickButton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
// este let va ser la matriz donde vamos a guardar la información
let carrito = []

// el forEach recorre la matriz de los button, todos los botones de los productos
// (16) aca evaluamos el evento, el click (con EventListener). El addTocarrito es la función que quiero q se ejecute, cada vez que haga click en el boton //añade ese item al carrito
clickButton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem)
})

// (22) si visualizamos en consola nos muestra el boton en el que hicimos click (el 1, el 5, etc)
//(23) con esta constante obtenemos el item (o card). El closest obtiene la clase más sercana a 'card', ese card es el contenedor padre de mi producto.
function addToCarritoItem(e) {
    const button = e.target
    const item = button.closest('.card')
    // (25)con esta constante vamos a tomar los datos de item "title" , 'card-title es una clase única, obtenemos el contenido del queySelector 
    //utilizamos: textContent
    const itemTitle = item.querySelector('.card-title').textContent;
    // (28) acá obtenemos el precio
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('.card-img-top').src;

    // en esta constante creamos objetos, donde guardamos el titulo, precio, imagen, etc
    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
    }

    //estos datos los vamos a pasar en una función
    addItemCarrito(newItem)
}

function addItemCarrito(newItem) {
    const alert = document.querySelector('.alert')
    setTimeout(function () {
        alert.classList.add('hide')
    }, 1000)
    alert.classList.remove('hide');


    // vamos hacer cambios en el "tbody (html) por acá nomás"
    // Imput es el elemnto que quiero manipular
    // el "tbody" ya se encuentra reenderizado cuando se ejecute esta funciòn

    const ImputElemnto = tbody.getElementsByClassName('input__elemento') // lo que digo es: obten el elemento que se encuentra en "tbody" de 
    //"input__elemento", pero este "ImputElemento" va a ser una matriz

    for (let i = 0; i < carrito.length; i++) {
        // el "trim() es simplemente para quitar los espacios que quedan a ambos lados"

        if (carrito[i].title.trim() === newItem.title.trim()) {

            // si esto se cumple quiere decir que ya esta agregado ese producto en "carrito.push(newItem)"
            carrito[i].cantidad++; // cada vez que esta condición se cumpla va a sumar

            const inputValue = ImputElemnto[i] // [i] es la posición donde nos encontramos

            inputValue.value++; // cada vez que pase esto se sume de igual forma

            CarritoTotal()
            return null;
            // con el return null no se ejecuta ni el "carrito.push" ni el "renderCarrito", simplemente sale de la función principal

        }
    }

    // dentro de la variable (let carrito) le voy a agregar el newItem
    carrito.push(newItem)

    renderCarrito()
}

// con esta función, todos los datos que se encuentren en la variable carrito( en los productos) va a ser reenderizados al archivo "mi carrito" (tabla)
function renderCarrito() {
    tbody.innerHTML = ' '

    // el map es porque no voy hacer ningún cambio en la función
    carrito.map(item => {
        const tr = document.createElement('tr') // crea un elemento que se encuentra adrento del "class tbody"

        tr.classList.add('itemCarrito') // el "tr" de la línea arriba va tener esta clase incorporada

        const Content = `
            <th scope="row">1</th>
                    <td class="table__productos">
                        <img src=${item.img} alt="">
                        <h6 class="title">${item.title}</h6>
                    </td>
                    <td class="table__precio"><p>${item.precio}</p></td>
                    <td class="table__cantidad">
                        <input type="number" min="1" value=${item.cantidad} class="input__elemento">
                        <button class="delete btn btn-danger">x</button>
                     </td>
            `
        tr.innerHTML = Content
        tbody.append(tr)

        tr.querySelector(".delete").addEventListener('click', removeItemCarrito);   // removemos un "item" del 
        //carrito
        tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
    });

}

// Funciòn para hacer la sumatoria del total

function CarritoTotal() {

    // variable inicializada en cero
    let Total = 0;

    //('.item...) en esa clase es donde va ir el Total
    const itemCartTotal = document.querySelector('.itemCartTotal')

    // en el carrito es donde se encuentra mi "item"
    // el for va a recorrer esa matriz principal
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$", ' ')) // en el "intem precio" le quitamos el dolar y le ///devolvemos un valor numerico
        Total = Total + precio * item.cantidad
    })

    itemCartTotal.innerHTML = `Total $${Total}`
    addLocalStorage()
}

// Función para remover un carrito
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

function sumaCantidad(e) {
    const sumaInput = e.target
    const tr = sumaInput.closest(".itemCarrito")
    tr.sumaCantidad()
}

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
document.addEventListener("DOMContentLoaded", function (e) {
});