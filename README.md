# Carrito de Compras - Restaurante

## Descripción corta del proyecto
Es una aplicación web interactiva que simula el menú y el carrito de compras de un restaurante de comidas rápidas. Permite a los usuarios visualizar productos, agregarlos al pedido, modificar cantidades y mantener el registro de su cuenta de forma dinámica. El proyecto destaca por tener separación de lógica de negocio, persistencia de datos y una robusta cobertura de pruebas unitarias.

## Requisitos previos
* **Para visualizar la página:** Ninguno. Solo necesitas un navegador web moderno (Chrome, Firefox, Edge, etc).
* **Para ejecutar las pruebas unitarias:** Necesitas tener [Node.js](https://nodejs.org/) instalado en tu computadora para poder usar los comandos de `npm` con jest.

## Cómo ejecutar el proyecto localmente

**1. Para ver la aplicación:**
* **Opción A (Recomendada):** Abre el proyecto en Visual Studio Code, haz clic derecho sobre el archivo `index.html` y selecciona **"Open with Live Server"** (requiere tener la extensión Live Server instalada).

**2. Para ejecutar las pruebas unitarias:**
Abre tu terminal en la carpeta del proyecto y ejecuta los siguientes comandos:
\`\`\`bash,

npm install   # Instala las dependencias de Jest (solo la primera vez),

npm test      # Ejecuta la batería de pruebas y muestra el reporte de cobertura
\`\`\`

## Estructura del proyecto
La arquitectura del proyecto está pensada para ser modular y escalable:

* `index.html`: Estructura base de la aplicación.
* `mi-carrito-app/css/style.css`: Hojas de estilo empleando CSS Grid y Flexbox para diseño Responsive.
* `mi-carrito-app/js/app.js`: Archivo principal que contiene la base de datos simulada, la lógica del negocio, la manipulación del DOM y el controlador de eventos.
* `mi-carrito-app/js/app.test.js`: Archivo de pruebas unitarias implementadas con el framework Jest.
* `mi-carrito-app/assets/img/`: Carpeta con las fotografías de los productos.

## Funcionalidades implementadas
- [x] Visualización en cuadrícula (Grid) del menú de productos.
- [x] Agregar productos al carrito de compras.
- [x] Detectar si un producto ya existe en el carrito y aumentar su cantidad en lugar de duplicarlo.
- [x] Aumentar y disminuir la cantidad de cada ítem desde el panel lateral.
- [x] Eliminar productos individuales del carrito.
- [x] Cálculo automático y en tiempo real del subtotal de la compra.
- [x] Botón para vaciar completamente el carrito.
- [x] Alertas informativas al finalizar la compra.
- [x] **Persistencia de datos:** El carrito sobrevive si el usuario recarga la página (usando `localStorage`).
- [x] **Diseño Responsive:** La interfaz se adapta automáticamente a pantallas de celulares y tablets.
- [x] **Calidad de Código:** Pruebas unitarias de la lógica principal usando Jest con una cobertura (Coverage) superior al 80%.

## Capturas de pantalla
![alt text](image.png)

## pruebas Unitarias

> carritodecompras@1.0.0 test
> jest --coverage

 PASS  mi-carrito-app/js/app.test.js
  Lógica del Carrito de Compras (Negocio)
    √ 1. Debe agregar un producto nuevo al carrito (2 ms)
    √ 2. Debe aumentar la cantidad si el producto ya existe en el carrito (1 ms)
    √ 3. Debe eliminar un producto del carrito por completo (1 ms)
    √ 4. Debe restar 1 a la cantidad usando el botón "-" (1 ms)
    √ 5. Debe eliminar el producto si la cantidad llega a 0 al restar
    √ 6. Debe vaciar todo el carrito al hacer clic en "Vaciar Carrito" (13 ms)
    √ 7. Debe mostrar alertas y vaciar el carrito al "Finalizar Compra" (2 ms)
    √ 8. Debe aumentar la cantidad usando el botón "+"
    √ 9. Debe cargar el carrito desde localStorage al cargar la página (DOMContentLoaded) (20 ms)
    √ 10. Debe dejar el carrito vacío al cargar la página si no hay nada en localStorage (5 ms)

----------|---------|----------|---------|---------|---------------------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|---------------------------------
All files |   89.47 |    78.57 |   84.61 |   88.23 |                                 
 app.js   |   89.47 |    78.57 |   84.61 |   88.23 | 130-131,135-136,140-141,145-146
----------|---------|----------|---------|---------|---------------------------------
Test Suites: 1 passed, 1 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        1.052 s, estimated 2 s
Ran all test suites.

## ¿Cómo se mide la cobertura en JavaScript?
La cobertura de código se mide a través de un proceso llamado Instrumentación (Code Instrumentation).
Las herramientas de prueba toman el código fuente y le inyectan pequeños "contadores" invisibles antes de ejecutar las pruebas unitarias. A medida que las pruebas se ejecutan, estos contadores registran exactamente qué partes del código fueron visitadas y cuáles no. Al finalizar, el sistema calcula el porcentaje matemático del código ejecutado frente al total del código disponible.

## ¿Qué herramientas permiten medir cobertura?
En el ecosistema de JavaScript, las herramientas más utilizadas son:

Jest: Es el framework más popular actualmente. Trae su propio medidor de cobertura integrado por defecto (basado en Istanbul/V8), por lo que solo requiere agregar el comando --coverage.

Istanbul (nyc): Es el motor clásico y el estándar de la industria para medir cobertura en JS. Muchas otras herramientas lo usan por debajo.

Vitest: Un framework moderno y muy rápido, diseñado especialmente para proyectos que usan Vite (muy usado con React o Vue).

Mocha + Chai: Son herramientas de pruebas muy robustas, pero requieren instalar Istanbul (nyc) por separado para poder generar los reportes de cobertura.

## ¿Cómo se configuran los umbrales mínimos (Thresholds)?
Los umbrales mínimos se configuran para obligar a que el proyecto mantenga un nivel de calidad. Si las pruebas corren y la cobertura está por debajo de los porcentajes exigidos, el sistema lanza un error y la prueba falla.

En herramientas como Jest, esto se configura en el archivo package.json o en jest.config.js. 
Ejemplo de configuración:

"jest": {
  "coverageThreshold": {
    "global": {
      "functions": 90,
      "lines": 90,
      "statements": 90,
      "branches": 80
    }
  }
}

## ¿Qué significa cada tipo de cobertura?
Las herramientas evalúan el código basándose en 4 métricas principales:

Functions (Funciones): Mide el porcentaje de funciones creadas en el código que fueron llamadas y ejecutadas al menos una vez por las pruebas.

Lines (Líneas): Mide el porcentaje de líneas físicas de código fuente que fueron recorridas durante la ejecución de las pruebas.

Statements (Sentencias): Es más preciso que las líneas. Mide cuántas instrucciones individuales se ejecutaron. Esto es importante porque en JavaScript puedes escribir múltiples sentencias en una sola línea física (ej. let a = 1; let b = 2;).

Branches (Ramas / Bifurcaciones): Es la métrica más estricta. Evalúa las decisiones lógicas del código (if, else, switch, operadores ternarios). Para alcanzar el 100% en esta métrica, las pruebas deben simular todos los caminos posibles (por ejemplo, probar qué pasa cuando un if es verdadero, y hacer otra prueba para cuando el mismo if es falso).


✅ Uso de jsdom

## ¿Qué es jsdom?
JSDOM es una biblioteca que implementa los estándares web (HTML y el DOM) puramente en JavaScript para que puedan ejecutarse dentro de un entorno de Node.js. En palabras sencillas, es un "navegador sin pantalla" o un "simulador de navegador" que vive directamente en la terminal de comandos.

## ¿Para qué sirve?
Por defecto, herramientas de testing como Jest se ejecutan en Node.js, el cual no tiene un entorno gráfico ni entiende qué es un document, un window o un innerHTML.
JSDOM sirve para engañar al código JavaScript, haciéndole creer que se está ejecutando en Google Chrome o Firefox. Esto nos permite probar funciones que manipulan la interfaz gráfica (hacer clics en botones, leer textos de un <p>, o crear <div> dinámicos) sin necesidad de abrir un navegador real, haciendo que las pruebas sean extremadamente rápidas (milisegundos).

## ¿Cómo se integra en las pruebas?
Para integrarlo en un proyecto con Jest, se realizan dos pasos sencillos:

Instalación: Se instala el paquete a través de npm junto con Jest:

Bash
npm install --save-dev jest-environment-jsdom

Configuración: Se le indica a Jest que utilice este entorno. Puede hacerse de forma global en el package.json o agregando un comentario especial en la primera línea del archivo de pruebas (app.test.js):

JavaScript
/**
 * @jest-environment jsdom
 */

 ## Demostración: Prueba utilizando jsdom
En el proyecto del carrito de compras, utilizamos jsdom para simular la estructura HTML básica y probar qué ocurre cuando un usuario hace clic real en el botón de "Vaciar Carrito".

Este es un ejemplo de cómo JSDOM nos permite buscar un botón por su ID (document.getElementById) y simular el evento .click() en la terminal:

* @jest-environment jsdom
 */
const { agregarAlCarrito, getCarrito } = require('./app.js');

describe('Interacciones con el DOM usando jsdom', () => {
    
    // 1. Preparamos el DOM simulado antes de la prueba
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="items-carrito"></div>
            <button id="btn-vaciar">Vaciar Carrito</button>
        `;
    });

    test('Debe vaciar todo el carrito al hacer clic en el botón (Simulación de DOM)', () => {
        // Llenamos el carrito con 2 productos lógicos
        agregarAlCarrito(101);
        agregarAlCarrito(102);
        expect(getCarrito().length).toBe(2);

        // Usamos jsdom para buscar el botón en el HTML simulado
        const btnVaciar = document.getElementById('btn-vaciar');
        
        // Ejecutamos el evento click tal como lo haría un usuario
        btnVaciar.click();

        // Verificamos que la lógica haya respondido a la acción del DOM
        expect(getCarrito().length).toBe(0);
    });
});

## Reflexión sobre qué partes fueron más difíciles de cubrir.

La refactorizacion de codigo ya separando la logica del dom ya que es una responsabilidad unica y asi que el codigo quede mas legible de leer y de entender.
Usar jsdom para simular el navegador para verificar que las pruebas esten correctas y el localStorage en node.js.
Evaluar caminos alternos y casos externoa para alcanzar la cobertura de ramas, demostrando que testear o hacer pruebas unitarias requiere codigo modular y que son muy importantes para el desarrollo.