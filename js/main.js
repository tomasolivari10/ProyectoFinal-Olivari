const btnAñadir = document.querySelectorAll('.boton-destacados');

let carrito = [] //inicializo un array vacio para luego ir añadiendo los productos 
let historialPedidos = []
let totalCarrito = 0


btnAñadir.forEach((boton, indice) => {
    boton.addEventListener('click', function (event) {
        // Usa el objeto event para identificar el botón específico
        const botonClickeado = event.target;
        const card = botonClickeado.closest('.contenido-destacados'); // closest()se utiliza para encontrar el ancestro más cercano que cumple con un selector o una condición específica
        const nombreProducto = card.querySelector('h3').textContent; // Obtiene el nombre de la card
        const precioProducto = parseFloat(card.querySelector('span').textContent.replace('$', '')) // Obtiene el precio de la card


        // creo un objeto representando el producto
        const producto = {
            quantity: 1,
            nombre: nombreProducto,
            precio: precioProducto,
            fecha: new Date(),
        };

        /* const exists = carrito.some(product => product.nombre === producto.nombre);

        carrito = exists
            ? carrito.map(product => (product.nombre === producto.nombre ? { ...product, quantity: product.quantity + 1 } : product))
            : [...carrito, producto];
             */

        const exits = carrito.some((product => product.nombre === producto.nombre))
        //some() para ver si en el carrito ya existe el nombre del producto que estoy añadiendo al carrito, podria ser find() tmb.

        if (exits) {
            const products = carrito.map(product => { //si existe le aumento de 1 a 1 la cantidad para que no se vuelva a añadir como un nuevo producto
                if (product.nombre === producto.nombre) {
                    product.quantity++
                    return product
                } else {
                    return product
                }
            })
            carrito = [...products];
        } else {
            carrito = [...carrito, producto]
        }//la variable carrito se actualiza para que ahora haga referencia a la nueva copia que contiene todos los productos originales más el producto recién agregado. 
        //esto para agregar un nuevo producto al carrito sin modificar el array original.

        actualizarCarrito()
        // agrego el producto al carrito 

        totalCarrito += precioProducto;//+= para sumar el precio del nuevo producto al que ya estaba, en vez de reasignarlo.

        // actualiza el total del carrito por cada producto agregado
        actualizarTotalCarrito(totalCarrito);
    });
})


function actualizarCarrito() {

    const pizzasCarrito = document.getElementById("productosCarrito")
    const precioCarrito = document.getElementById("precioCarrito")
    const cantidadCarrito = document.getElementById("cantidadCarrito")

    pizzasCarrito.innerHTML = ''
    precioCarrito.innerHTML = ''
    cantidadCarrito.innerHTML = '';

    carrito.forEach((pizza, index) => {
        const botonEliminar = document.createElement('button');
        botonEliminar.innerHTML = `X`;
        botonEliminar.classList.add("deleteBtn")
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
    })
}

function actualizarTotalCarrito(total) {
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
        text: "Producto eliminado correctamente!",
        duration: 3000,  // Duración en milisegundos
        gravity: "bottom", // Posición de la notificación (puedes usar "top" o "bottom")
        position: "center", // Alineación horizontal de la notificación
        offset: { x: 0, y: 20 },
        backgroundColor: "darkred",
        close: true
    }).showToast();
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
        setTimeout(borrarP, 3000)
    } else {
        Swal.fire({
            title: "El pedido se realizo con exito!",
            text: `Compra con ${metodoPago.value} - Total: $${totalCarrito.toFixed(2)}`,
            icon: "success",
            showCloseButton: true,
            timer: 4000
        });
        almacenarCompra()
        vaciarCarrito()
    }
});


const btnVaciar = document.getElementById('vaciar')
btnVaciar.addEventListener('click', vaciarCarrito)

function vaciarCarrito() {
    carrito = []; // vacio el carrito
    totalCarrito = 0; // vuelve a 0 el total del carrito
    actualizarCarrito();
    actualizarTotalCarrito(totalCarrito);
}


let almacenarCompra = () => { localStorage.setItem("pedido", JSON.stringify(carrito)) }


fetch('../archivo.json')
    .then(response => response.json()) //.json() parsea los datos json a objetos.
    .then((archivo) =>
        console.table(archivo))
