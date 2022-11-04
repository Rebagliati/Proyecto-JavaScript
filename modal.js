import { eliminarProductoCarrito } from "./carrito.js";
import { obtenerCarritoStorage } from "./storage.js";

//Todas las funciones y variables relacionadas a las modales//
const modalCarrito = document.getElementById("carrito-contenedor")
const continuarCheckout = document.getElementById("btn-continuar")

//Eliminado de productos//
modalCarrito.addEventListener('click',(e)=>{
    e.stopPropagation();

    if(e.target.classList.contains('boton-eliminar'))
    {
        
        eliminarProductoCarrito(e.target.value);
        Toastify({
            text: "Se eliminó el producto",
            duration: 3000,
            style: {
                background: "linear-gradient(308deg, rgb(153, 231, 223) 0%, rgb(132, 194, 253) 50%)",
              },
        }).showToast();
    }   
})

//Funcion para continuar y validar productos en el carrito o ir al checkout//
continuarCheckout.addEventListener('click', (e) => {
    const carrito = obtenerCarritoStorage ();

    carrito.length > 0 ? checkout() : mensajeCarritoVacio();

    

})

//Cambia página index.html a checkout.html//
const checkout = () => {
    window.location="checkout.html";
}

//Toast con mensaje, carrito vacío//
const mensajeCarritoVacio = () => {
    Toastify({
        text: "No hay productos en el carrito",
        duration: 3000,
        style: {
            background: "linear-gradient(308deg, rgb(153, 231, 223) 0%, rgb(132, 194, 253) 50%)",
          },
    }).showToast();
}
