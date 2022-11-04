import { inventarioProductos } from "./app.js";
import { guardarCarritoStorage, obtenerCarritoStorage } from "./storage.js";

//Acciones del carrito de compras general//

let carritoCompras = [];

//Verifica que el producto está en el carrito. Si se encuentra le suma más stock y lo pinta con el subtotal. Si no se agrega uno nuevo//
const validarProductoRepetido = (productoID) => {

    if (localStorage.getItem('carrito')) {
        carritoCompras = obtenerCarritoStorage();
    }

    const productoRepetido = carritoCompras.find(producto => producto.id === productoID)

    if (productoRepetido)
    {
        productoRepetido.stock++;
        const cantidadProducto = document.getElementById(`cantidad${productoRepetido.id}`)
        cantidadProducto.innerText = `cantidad: ${productoRepetido.stock}`
        let modificacionPrecio = document.getElementById(`precio${productoRepetido.id}`)
        let precioActualizado = carritoCompras[carritoCompras.indexOf(productoRepetido)].precio * carritoCompras[carritoCompras.indexOf(productoRepetido)].stock
        modificacionPrecio.innerHTML = `${productoRepetido.nombre} ${productoRepetido.color} $${precioActualizado}`
        renderSubtotal();
    }
  
    else 
    {
        carritoIndex (productoID)
    }

    guardarCarritoStorage (carritoCompras);
}
//Se agrega un producto y pinta al carrito por medio del ID. Se muestrar los subtotales//
const carritoIndex = (productoID) => {

    const contenedorCarrito = document.getElementById("carrito-contenedor")
    const renderProductosCarrito = () => {
        
        let producto = inventarioProductos.find(producto => producto.id === productoID)

            carritoCompras.push(producto)
            let div = document.createElement("div")
            div.classList.add("productoEnCarrito")
            div.innerHTML = `<p id="precio${producto.id}">${producto.nombre} ${producto.color} $${producto.precio}</p>
            <p class="cantidad-texto" id="cantidad${producto.id}">Cantidad: ${producto.stock}</p>
            <button id="eliminar${producto.id}" value='${producto.id}'  class="btn btn-primary boton-eliminar">
            x</button>`
            contenedorCarrito.appendChild(div)      
    
    }

    renderProductosCarrito()
    renderSubtotal() 
}

//Suma los precios multiplicado por el stock de cada producto y se guarda el carrito en storage al modificarse//
const renderSubtotal = () => {
    const contenedorSubtotal = document.getElementById("carrito-subtotal")
    let subtotal = 0;
    carritoCompras.forEach(producto => {
        subtotal = subtotal + producto.precio * producto.stock
    });
    contenedorSubtotal.innerHTML = `<h5>Subtotal: $ ${subtotal}</h5>`

    actualizarContador();
    guardarCarritoStorage (carritoCompras);
}
//Actualiza el contador de cantidad de productos en el carrito//
const actualizarContador = () =>{
    const contadorCarrito = document.getElementById("contador-carrito")
    const totalCantidad = carritoCompras.reduce((acc, producto) => acc + producto.stock, 0);
    contadorCarrito.innerHTML = totalCantidad; 
}
//Elimina un producto particular//
const eliminarProductoCarrito = (productoId) => {
    const carritoStorage = obtenerCarritoStorage();
    const carritoActualizado = carritoStorage.filter(producto => producto.id != productoId);

    pintarCarrito(carritoActualizado);
};

//Pinta el carrito al cargar si hay algo en el local storage//
const pintarCarrito = (carrito) => {
    const contenedor = document.getElementById('carrito-contenedor');

    contenedor.innerHTML = '';

    carrito.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('productoEnCarrito');
        div.innerHTML = `<p id="precio${producto.id}">${producto.nombre} ${producto.color} $${producto.precio}</p>
        <p class="cantidad-texto" id="cantidad${producto.id}">Cantidad: ${producto.stock}</p>
        <button id="eliminar${producto.id}" value='${producto.id}' class="btn btn-primary boton-eliminar">
        x</button>`
        contenedor.appendChild(div);
    })

    carritoCompras = carrito;
    renderSubtotal(); 
    
}


export { pintarCarrito, carritoIndex, validarProductoRepetido, eliminarProductoCarrito};