import { validarProductoRepetido } from "./carrito.js";
import { alert } from "./alerta.js";
import { obtenerProductos } from "./obtenerProductos.js";

//Funciones generales de la aplicación//

//Donde guardo mis productos del inventario//
let inventarioProductos = [];

//Funciones de ordenar precios mayor a menor y viceversa//
async function ordenarMenorMayor() {
    inventarioProductos.sort((a, b) => a.precio - b.precio);
}
async function ordenarMayorMenor() {
    inventarioProductos.sort((a, b) => b.precio - a.precio);
}

let sortMayorBtn = document.getElementById("buttonSortMayor");

if (sortMayorBtn) {
    sortMayorBtn.addEventListener("click", sortMayor);
}


let sortMenorBtn = document.getElementById("buttonSortMenor");

if (sortMenorBtn) {
    sortMenorBtn.addEventListener("click", sortMenor);
}


function sortMenor() {
    ordenarMenorMayor();
    actualizarListaProductos();
}

function sortMayor() {
    ordenarMayorMenor();
    actualizarListaProductos();
}

//Visualizar productos del inventario//

const mostrarProductos = async () => {
    inventarioProductos = await obtenerProductos();
    pintarProductos(inventarioProductos);
}

const actualizarListaProductos = async () => {

    const contenedorProductos = document.querySelectorAll('#containerProductos div')

    contenedorProductos.forEach(producto => {
        producto.remove();
    })

    pintarProductos(inventarioProductos);

}

const pintarProductos = async (inventarioProductos) => {
    const contenedorProductos = document.getElementById('containerProductos')
    inventarioProductos.forEach(producto => {
        const div = document.createElement('div')
        div.classList.add('col-12')
        div.classList.add('col-md-4')
        div.classList.add('text-center')
        div.classList.add('p-3')

        div.innerHTML = `<div class="card" style="width: 18rem;"> 
        
            <img src="${producto.img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="titulo">${producto.nombre} ${producto.color}</h3>
                <p class="precio">$ ${producto.precio}</p>
                <button class="btn btn-outline-primary" id=boton${producto.id}>Comprar</button>
            </div>
        </div>`
        contenedorProductos.appendChild(div)

        const boton = document.getElementById(`boton${producto.id}`)

        boton.addEventListener('click', () => {
            validarProductoRepetido(producto.id)
            alert(`Se agrego el producto ${producto.nombre} ${producto.color}`, 'success')
            scroll(0, 0);
            setTimeout(function () {
                // Closing the alert
                $('#alert').alert('close');
            }, 2000);
        })
    })
}

//Buscador de productos por nombre y color en h3, los muestra o no dependiendo si se encuentra//

let buscador = document.getElementById("miInput");
if (buscador) {
    buscador.onkeyup = () => {
        var input, filter, section, div, h3, i;
        input = document.getElementById("miInput");
        filter = input.value.toUpperCase();
        section = document.getElementById("containerProductos");
        div = section.getElementsByTagName("div");

        for (i = 0; i < div.length; i++) {
            h3 = div[i].getElementsByTagName("h3")[0];
            if (h3) {
                var palabrasEnFiltro = filter.split(' ');
                var hallado = 0;
                for (var filtro of palabrasEnFiltro) {
                    if (h3.innerHTML.toUpperCase().indexOf(filtro) > -1) {
                        hallado++;
                    }
                }
                if (hallado === palabrasEnFiltro.length) {
                    div[i].style.display = "";
                } else {
                    div[i].style.display = "none";
                }
            }
        }
    }
}


export { inventarioProductos, mostrarProductos };