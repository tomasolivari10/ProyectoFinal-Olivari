let pizzas;
const container = document.querySelector('.container');
let productosJson = "archivo.json";


    fetch(productosJson)
        .then(response => response.json())
        .then(data => {
            pizzas = data;
            pizzas.forEach(element => {
                const card = document.createElement('div');
                card.classList.add('destacados', 'wow', 'bounceInUp');
                card.style.visibility = 'visible';
                card.style.animationName = 'fadeInUp';

                card.innerHTML = `
                    <div class="flip-card">
                        <!--flip cards con rotacion 180 y contenido de ambos lados-->
                        <div class="flip-card-inner">
                            <div class="imagen-destacados flip-card-front">
                                <img src="${element.imagen}" alt="${element.nombre}">
                            </div>
                            <div class="flip-card-back">
                                <h2>Ingredientes:</h2>
                                <p>${element.ingrediente1}</p>
                                <p>${element.ingrediente2}</p>
                                <p>${element.ingrediente3}</p>
                                <h2>Precio:</h2>
                                <p>${element.precio}</p>
                            </div>
                        </div>
                    </div>
                    <div class="contenido-destacados">
                        <h3>${element.nombre}</h3>
                        <p>${element.tipo}</p>
                        <a href="./pages/pedido.html" class="boton-destacados">Ordena Online</a>
                    </div>`;

                container.appendChild(card);
            });
        });


