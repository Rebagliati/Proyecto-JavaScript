//Permite obtener productos inventario desde el JSON//
const obtenerProductos = async () => {
    try {
        const response = await fetch ('./stock.json');
        const data = await response.json ();
        return data;
    } catch (error) {
        console.log ('Hubo un error', error);
    }
}

export {obtenerProductos};