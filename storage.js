//Funciones relacionadas con la data en storage//

//Guardar carrito//
const guardarCarritoStorage = (carritoDeCompras) => {
    localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));
}
//obtener carrito//
const obtenerCarritoStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito'));
    return carritoStorage;
}
//eliminar carrito//
const eliminarCarritoStorage = () => {
    localStorage.removeItem('carrito');
}

export {guardarCarritoStorage, obtenerCarritoStorage, eliminarCarritoStorage}