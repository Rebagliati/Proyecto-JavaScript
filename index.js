import { pintarCarrito } from "./carrito.js";
import { obtenerCarritoStorage } from "./storage.js"
import {mostrarProductos} from "./app.js"

//Funciones al cagar la página, revisar local storage para obtener productos guardados//
document.addEventListener('DOMContentLoaded', () => {

    mostrarProductos();

    if (localStorage.getItem('carrito'))
    {
    const carrito = obtenerCarritoStorage();
    pintarCarrito(carrito);
    }
   
})