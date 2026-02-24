/**
 * @jest-environment jsdom
 */

// 1. PREPARAR EL ESCENARIO (Mocking del DOM y LocalStorage)
// Simulamos el HTML que necesita app.js para no lanzar errores
document.body.innerHTML = `
    <div id="lista-productos"></div>
    <div id="items-carrito"></div>
    <span id="subtotal">0</span>
    <button id="btn-vaciar"></button>
    <button id="final"></button>
`;

// Simulamos el localStorage
global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn()
};

// 2. IMPORTAR LAS FUNCIONES A PROBAR
const { 
    agregarAlCarrito, 
    eliminarDelCarrito, 
    aumentarCantidad, 
    disminuirCantidad, 
    getCarrito, 
    setCarrito 
} = require('./app.js');

// 3. LAS PRUEBAS UNITARIAS
describe('Lógica del Carrito de Compras (Negocio)', () => {

    // Antes de cada prueba, dejamos el carrito en cero para que no se mezclen
    beforeEach(() => {
        setCarrito([]);
        jest.clearAllMocks();
    });

    test('1. Debe agregar un producto nuevo al carrito', () => {
        // ACT (Actuar)
        agregarAlCarrito(101); // 101 es la Hamburguesa
        
        // ASSERT (Comprobar)
        const carrito = getCarrito();
        expect(carrito.length).toBe(1);
        expect(carrito[0].id).toBe(101);
        expect(carrito[0].cantidad).toBe(1);
    });

    test('2. Debe aumentar la cantidad si el producto ya existe en el carrito', () => {
        agregarAlCarrito(101); // Agrega 1
        agregarAlCarrito(101); // Agrega el mismo otra vez
        
        const carrito = getCarrito();
        expect(carrito.length).toBe(1); // Sigue siendo un solo item en la lista
        expect(carrito[0].cantidad).toBe(2); // Pero su cantidad subió a 2
    });

    test('3. Debe eliminar un producto del carrito por completo', () => {
        agregarAlCarrito(101); // Hamburguesa
        agregarAlCarrito(104); // Cocacola
        
        eliminarDelCarrito(101); // Eliminamos la hamburguesa
        
        const carrito = getCarrito();
        expect(carrito.length).toBe(1);
        expect(carrito[0].id).toBe(104); // Solo quedó la Cocacola
    });

    test('4. Debe restar 1 a la cantidad usando el botón "-"', () => {
        agregarAlCarrito(101);
        agregarAlCarrito(101); // Tenemos 2 hamburguesas
        
        disminuirCantidad(0); // Disminuimos el producto en el índice 0
        
        const carrito = getCarrito();
        expect(carrito[0].cantidad).toBe(1);
    });

    test('5. Debe eliminar el producto si la cantidad llega a 0 al restar', () => {
        agregarAlCarrito(101); // Tenemos 1 hamburguesa
        
        disminuirCantidad(0); // Restamos 1, debería borrarse
        
        const carrito = getCarrito();
        expect(carrito.length).toBe(0);
    });

    test('6. Debe vaciar todo el carrito al hacer clic en "Vaciar Carrito"', () => {
        // Llenamos el carrito con 2 productos
        agregarAlCarrito(101);
        agregarAlCarrito(102);
        expect(getCarrito().length).toBe(2);

        // Simulamos el clic en el botón de vaciar
        const btnVaciar = document.getElementById('btn-vaciar');
        btnVaciar.click();

        // Comprobamos que el carrito quedó en cero
        expect(getCarrito().length).toBe(0);
    });

    test('7. Debe mostrar alertas y vaciar el carrito al "Finalizar Compra"', () => {
        // 1. Simulamos el alert de la ventana (para que Jest no lance error)
        window.alert = jest.fn();

        // 2. Agregamos algo al carrito
        agregarAlCarrito(103);
        expect(getCarrito().length).toBe(1);

        // 3. Simulamos el clic en el botón finalizar
        const btnFinalizar = document.getElementById('final');
        btnFinalizar.click();

        // 4. Comprobamos todo lo que debió pasar
        expect(window.alert).toHaveBeenCalledWith("!Compra Exitosa¡"); // Verificamos la primera alerta
        expect(window.alert).toHaveBeenCalledWith("Gracias por su compra, Que tengas un ecxelente dia😊"); // Verificamos la segunda alerta
        expect(getCarrito().length).toBe(0); // Verificamos que se vació el carrito
    });

    test('8. Debe aumentar la cantidad usando el botón "+"', () => {
        agregarAlCarrito(101); // Agregamos una hamburguesa al carrito (índice 0)
        
        aumentarCantidad(0); // Llamamos a tu función específica para el botón +
        
        const carrito = getCarrito();
        expect(carrito[0].cantidad).toBe(2);
    });

    test('9. Debe cargar el carrito desde localStorage al cargar la página (DOMContentLoaded)', () => {
        // 1. Usamos el localStorage real del entorno de pruebas para guardar datos
        const carritoFalso = [{ id: 105, nombre: 'Pizza', precio: 12000, cantidad: 3 }];
        localStorage.setItem('carrito-restaurante', JSON.stringify(carritoFalso));

        // 2. Disparamos el evento de "cargar la página" tal como lo hace el navegador
        document.dispatchEvent(new Event('DOMContentLoaded'));

        // 3. Comprobamos que el carrito en memoria absorbió los datos del LocalStorage
        const carritoActual = getCarrito();
        expect(carritoActual.length).toBe(1);
        expect(carritoActual[0].nombre).toBe('Pizza');
        expect(carritoActual[0].cantidad).toBe(3);
        
        // 4. Limpiamos el localStorage para dejar todo como estaba
        localStorage.clear();
    });

    test('10. Debe dejar el carrito vacío al cargar la página si no hay nada en localStorage', () => {
        // 1. Nos aseguramos de que el localStorage esté completamente vacío
        localStorage.clear();

        // 2. Disparamos el evento de carga de página
        document.dispatchEvent(new Event('DOMContentLoaded'));

        // 3. Verificamos que el carrito inicie en 0
        expect(getCarrito().length).toBe(0);
    });
});