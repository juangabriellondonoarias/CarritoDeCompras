// 1. BASE DE DATOS (Datos crudos)

const productos = [
    {id:101, nombre:'Hamburguesa', precio:15000, descripcion:'Delicia artesanal con queso', imagen: './mi-carrito-app/assets/img/hamburguesa-especial.png'},
    {id:102, nombre:'Perro Caliente', precio:10000, descripcion:'Tradición urbana colombiana', imagen:'./mi-carrito-app/assets/img/peroro-especial.png'},
    {id:103, nombre:'Pollo', precio:20000, descripcion:'Crujiente dorado irresistible', imagen:'./mi-carrito-app/assets/img/pollo.png'},
    {id:104, nombre:'Cocacola', precio:5000, descripcion:'Sabor original incomparable', imagen:'./mi-carrito-app/assets/img/cocacola.webp'},
    {id:105, nombre:'Pizza', precio:12000, descripcion:'Clásica pepperoni deliciosa', imagen:'./mi-carrito-app/assets/img/pizza.png'},
    {id:106, nombre:'Sprite', precio:4000, descripcion:'Refrescante limón burbujeante', imagen:'./mi-carrito-app/assets/img/sprite.jpg'}
];


//  2. LÓGICA DE NEGOCIO
let carrito = [];

function cargarDesdeStorage() {
    const guardado = localStorage.getItem('carrito-restaurante');
    if (guardado) carrito = JSON.parse(guardado);
}

function guardarEnStorage() {
    localStorage.setItem('carrito-restaurante', JSON.stringify(carrito));
}

function calcularSubtotal() {
    return carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
}

function logicaAgregarAlCarrito(id) {
    const existe = carrito.some(prod => prod.id === id);
    if (existe) {
        carrito.forEach(prod => { if (prod.id === id) prod.cantidad++; });
    } else {
        const item = productos.find(prod => prod.id === id);
        if (item) carrito.push({ ...item, cantidad: 1 });
    }
    guardarEnStorage();
}

function logicaEliminarDelCarrito(id) {
    carrito = carrito.filter(prod => prod.id !== id);
    guardarEnStorage();
}

function logicaAumentarCantidad(index) {
    carrito[index].cantidad++;
    guardarEnStorage();
}

function logicaDisminuirCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
    } else {
        carrito.splice(index, 1);
    }
    guardarEnStorage();
}

function logicaVaciarCarrito() {
    carrito = [];
    guardarEnStorage();
}


// 3. MANIPULACIÓN DEL DOM (Solo pinta HTML)
const contenedorProductos = document.getElementById('lista-productos');
const contenedorCarrito = document.getElementById('items-carrito');
const subtotalElemento = document.getElementById('subtotal');
const btnVaciar = document.getElementById('btn-vaciar');
const finalizarCompra = document.getElementById('final');

function renderizarProductos() {
    contenedorProductos.innerHTML = '';
    productos.forEach((producto) => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('card');
        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="Foto de ${producto.nombre}">
            <div class="card-body">
                <p>Codigo:${producto.id}</p>
                <h3>${producto.nombre}</h3>
                <p style="color: #555; margin-top: 5px; margin-bottom: 5px;">$${producto.precio.toLocaleString('es-CO')}</p>
                <p>${producto.descripcion}</p>
                <button onclick="accionAgregarAlCarrito(${producto.id})">Agregar al carrito</button>
            </div>
        `;
        contenedorProductos.appendChild(tarjeta);
    });
}

function renderizarCarritoUI() {
    contenedorCarrito.innerHTML = '';

    carrito.forEach((prod, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-carrito');
        itemDiv.innerHTML = `
            <div>
                <strong>${prod.nombre}</strong> <br>
                <small>Cant: ${prod.cantidad}</small>
            </div>
            <div>
                <button class="btn" onclick="accionDisminuirCantidad(${index})">-</button>
                <span>$${(prod.precio * prod.cantidad).toLocaleString('es-CO')}</span>
                <button class="btn" onclick="accionAumentarCantidad(${index})">+</button>
                <button class="btn-eliminar" aria-label="Eliminar producto del carrito" onclick="accionEliminarDelCarrito(${prod.id})">X</button>
            </div>
        `;
        contenedorCarrito.appendChild(itemDiv);
    });

    // Pide el número puro a la lógica y lo inyecta en el HTML
    subtotalElemento.textContent = calcularSubtotal().toLocaleString('es-CO');
}


// 4. EL CONTROLADOR (El Puente / Eventos)
// Conecta los clics del usuario con la lógica y la vista

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarDesdeStorage();
    renderizarProductos();
    renderizarCarritoUI();
});

// Usamos el objeto "window" para que el HTML pueda encontrar las funciones.
// El puente ejecuta la lógica matemática, y luego ordena repintar la pantalla.
window.accionAgregarAlCarrito = function(id) {
    logicaAgregarAlCarrito(id);
    renderizarCarritoUI();
};

window.accionEliminarDelCarrito = function(id) {
    logicaEliminarDelCarrito(id);
    renderizarCarritoUI();
};

window.accionAumentarCantidad = function(index) {
    logicaAumentarCantidad(index);
    renderizarCarritoUI();
};

window.accionDisminuirCantidad = function(index) {
    logicaDisminuirCantidad(index);
    renderizarCarritoUI();
};

btnVaciar.addEventListener('click', () => {
    logicaVaciarCarrito();
    renderizarCarritoUI();
});

finalizarCompra.addEventListener('click', () => {
    alert("!Compra Exitosa¡");
    logicaVaciarCarrito();
    renderizarCarritoUI();
    alert("Gracias por su compra, Que tengas un ecxelente dia😊");
});


// =========================================================
// 🧪 5. EXPORTACIÓN PARA PRUEBAS (JEST) - NO BORRAR
// Nota: Jest ahora testeará las funciones PURAS de la sección 2.
// =========================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        agregarAlCarrito: logicaAgregarAlCarrito,
        eliminarDelCarrito: logicaEliminarDelCarrito,
        aumentarCantidad: logicaAumentarCantidad,
        disminuirCantidad: logicaDisminuirCantidad,
        getCarrito: () => carrito,
        setCarrito: (nuevoCarrito) => { carrito = nuevoCarrito; }
    };
}