const btnAñadir = document.querySelectorAll('.boton-destacados');

let carrito = JSON.parse(localStorage.getItem("pedido")) || [];
let totalCarrito = carrito.reduce((total, producto) => total + (producto.precio * producto.quantity), 0);


btnAñadir.forEach((boton) => {
    boton.addEventListener('click', function (event) {
        // Usa el objeto event para identificar el botón específico
        const botonClickeado = event.target;
        const card = botonClickeado.closest('.contenido-destacados'); // closest()se utiliza para encontrar el ancestro más cercano que cumple con un selector o una condición específica
        const nombreProducto = card.querySelector('h3').textContent; // Obtiene el nombre de la card
        const precioProducto = parseFloat(card.querySelector('span').textContent.replace('$', '')) // Obtiene el precio de la card
        Toastify({
            text: "Producto agregado al carrito",
            duration: 3000,
            close: true,
            style: {
                background: "darkgreen",
                borderRadius: "5px",
                fontSize: "15px"
            },
            offset: { x: 100, y: 50 },
            onClick: function(){
                window.location.href = "#carritoCompras";
            }
        }).showToast();

        // creo un objeto representando el producto
        const producto = {
            quantity: 1,
            nombre: nombreProducto,
            precio: precioProducto,
            fecha: new Date(),
        };

        const exists = carrito.some(product => product.nombre === producto.nombre);

        carrito = exists
            ? carrito.map(product => (product.nombre === producto.nombre ? { ...product, quantity: product.quantity + 1 } : product))
            : [...carrito, producto];
        //si el producto ya existe en el carrito aumenta la cantidad del producto en 1
        //si no existe, agrega el nuevo producto al carrito.

        actualizarCarrito()
        //agrego el producto al carrito 

        totalCarrito += precioProducto;//+= para sumar el precio del nuevo producto al que ya estaba, en vez de reasignarlo.

        // actualiza el total del carrito por cada producto agregado
        actualizarTotalCarrito(totalCarrito);
    });
})

document.addEventListener("DOMContentLoaded", actualizarCarrito())
actualizarTotalCarrito()

function actualizarCarrito() {

    const pizzasCarrito = document.getElementById("productosCarrito")
    const precioCarrito = document.getElementById("precioCarrito")
    const cantidadCarrito = document.getElementById("cantidadCarrito")

    pizzasCarrito.innerHTML = ''
    precioCarrito.innerHTML = ''
    cantidadCarrito.innerHTML = '';

    carrito.forEach((pizza, index) => {
        const botonEliminar = document.createElement('a');
        botonEliminar.innerHTML = `<i class="fa fa-trash"></i>`;
        botonEliminar.classList.add('deleteBtn')
        botonEliminar.addEventListener('click', function () {
            eliminarDelCarrito(index);
        });

        const btnAumentar = document.createElement('button');
        btnAumentar.innerHTML = "+"
        btnAumentar.classList.add("aumentarItem")
        btnAumentar.addEventListener('click', function () {
            aumentarItem(index)
        })

        const btnDisminuir = document.createElement('button');
        btnDisminuir.innerHTML = "-"
        btnDisminuir.classList.add("disminuirItem")
        btnDisminuir.addEventListener('click', function () {
            disminuirItem(index)
        })


        const liPizzas = document.createElement("li")
        const liPrecio = document.createElement("li")
        const pCantidad = document.createElement('div')
        liPizzas.innerHTML = `${pizza.nombre}`
        liPizzas.style.marginBottom = "5px"
        liPrecio.innerHTML = `$${pizza.precio.toFixed(2)}`
        liPrecio.style.marginBottom = "5px"
        pCantidad.innerHTML = `${pizza.quantity}`
        pCantidad.style.marginBottom = "5px"
        pizzasCarrito.appendChild(liPizzas)
        precioCarrito.appendChild(liPrecio)
        cantidadCarrito.appendChild(pCantidad)
        pCantidad.append(btnAumentar, btnDisminuir, botonEliminar);
        localStorage.setItem("pedido", JSON.stringify(carrito))
    })
}


function actualizarTotalCarrito() {
    const totalCarritoElement = document.getElementById("total");
    totalCarritoElement.textContent = `${totalCarrito.toFixed(2)}`;
}


let eliminarDelCarrito = (index) => {
    const productoAEliminar = carrito[index];
    totalCarrito -= productoAEliminar.precio * productoAEliminar.quantity;
    carrito.splice(index, 1); // elimino 1 solo elemento partiendo desde el indice proporcionado (index )
    actualizarCarrito();
    actualizarTotalCarrito(totalCarrito);
    Toastify({
        text: "Producto eliminado",
        duration: 1500,
        gravity: "bottom", // posición de la notificación 
        position: "center",
        offset: { x: 0, y: 20 },
        style: {
            background: "darkred",
            borderRadius: "5px",
            fontSize: "15px"},
        close: true
    }).showToast();
    localStorage.setItem("pedido", JSON.stringify(carrito))
}

let aumentarItem = (index) => {
    carrito[index].quantity++;
    actualizarCarrito();
    totalCarrito += carrito[index].precio;
    actualizarTotalCarrito(totalCarrito);
}

let disminuirItem = (index) => {
    if (carrito[index].quantity > 1) {
        carrito[index].quantity--;
        actualizarCarrito();
        totalCarrito -= carrito[index].precio;
        actualizarTotalCarrito(totalCarrito);
    }
}


const comprarButton = document.getElementById('comprar');
comprarButton.addEventListener('click', function () {
    const metodoPago = document.querySelector('input[name="metodo-pago"]:checked');
    if (carrito.length === 0) {
        Swal.fire({
            title: "No has agregado ningun producto",
            icon: "error",
            showCloseButton: true,
            timer: 3000
        });
    } else if (!metodoPago) {//si metodo de pago es falsy o false
        const pago = document.getElementById("no-pago")
        const parrafo = document.createElement("p")
        parrafo.innerHTML = "NO HAS ELEGIDO NINGUN METODO DE PAGO!"
        parrafo.style.color = "white"
        pago.appendChild(parrafo)
        function borrarP() {
            parrafo.style.display = "none";
        }
        setTimeout(borrarP, 1500)
    } else {
        Swal.fire({
            title: "Compra exitosa!",
            text: `Compra con ${metodoPago.value} - Total: $${totalCarrito.toFixed(2)}`,
            icon: "success",
            showCloseButton: true,
            timer: 4000
        });
        compraExistosa()
    }
    localStorage.setItem("pedido", JSON.stringify(carrito))
});

let compraExistosa = () => {
    carrito = []; 
    totalCarrito = 0; 
    actualizarCarrito();
    actualizarTotalCarrito(totalCarrito);
}


const btnVaciar = document.getElementById('vaciar')
btnVaciar.addEventListener('click', vaciarCarrito)

function vaciarCarrito() {
    if (carrito.length > 0) {
        Swal.fire({
            title: '¿Estás seguro?',
            icon: 'question',
            html: "Se eliminaran todos productos del carrito",
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        })
            .then((result) => {
                if (result.value) {
                    carrito = []; // vacío el carrito
                    totalCarrito = 0; // vuelvo a 0 el total del carrito
                    actualizarCarrito();
                    actualizarTotalCarrito(totalCarrito);
                    localStorage.setItem("pedido", JSON.stringify(carrito))
                }
            })
    }
}


