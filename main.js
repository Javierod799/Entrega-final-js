class Producto { 
    constructor(id, nombre, precio, img){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

const dogpro = new Producto(1, "Dogpro", 7000, "img/dogproadultos.jpg");
const canactive = new Producto(2,"CanActive", 5500, "img/canactiveadultos.jpg");
const wau = new Producto(3,"Wau", 3000, "img/wau.jpg");
const huellas = new Producto(4, "4 Huellas", 3500, "img/4huellasadulto.jpg");
const chapote = new Producto(5, "Chapote", 3300, "img/chapote.jpg");
const waugold = new Producto(6, "Wau Gold", 4000, "img/waugold.jpg");

// creamos un array con nuestros productos:

const productos = [dogpro, canactive, wau, huellas, chapote,waugold];

// creamos el carrito

let carrito = [];

// localstorage
if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

console.log(productos);

// modificamos el DOM para mostrar los productos

const contenedorProductos = document.getElementById("contenedorProductos");

// funcion para mostrar los productos

const mostrarProductos = () => {
    productos.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("con-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
        <div class="card bgColor">
        <img src="${producto.img}" class="card-img.top imgProductos">
        <div class="card-body">
        <h5 class="card-tittle"> ${producto.nombre} </h5>
        <P class="card-text"> ${producto.precio} </p>
        <button class=" colorBoton" id="boton${producto.id}"> Agregar al carrito </div>
        </div>
        `
        contenedorProductos.appendChild(card);

//agregamos los productos al carrito

        const boton=document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id),
            Toastify({
                text:"Producto agregado al carrito",
                duration:"3000",
                gravity: "top",
                position:"right",
                style: {
                    color: "black",
                    background: "linear-gradient(0deg, rgba(247,242,83,1) 22%, rgba(251,164,6,1) 100%, rgba(0,0,0,0.7539390756302521) 100%)",
                  }
            }).showToast();
        })
    })
}


//creamos la funcion para agregar productos al carrito

const agregarAlCarrito = (id) => {
    const producto = productos.find((producto) => producto.id ===id);
    const productoEnCarrito = carrito.find((producto)=> producto.id === id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
    } else {
        carrito.push(producto);
        
//localStorage
localStorage.setItem("carrito",JSON.stringify(carrito));
    }
    calcularTotal();
} 

mostrarProductos();


//mostrar carrito de compras

const contenedorCarrito = document.getElementById("contenedorCarrito");

const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
});

// funcion para mostrarnos el carrito

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML ="";
    carrito.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card bgColor">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                <h5 class="card-title"> ${producto.nombre} </h5>
                <p class="card-text"> ${producto.precio} </p>
                <p class="card-text"> ${producto.cantidad} </p>
                <button class="btn colorBoton" id="eliminar${producto.id}"> Eliminar Producto </button>
                </div>
            </div>
        `
        contenedorCarrito.appendChild(card);

        // para eliminar productos del carrito

        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
            Toastify({
                text:"Producto eliminado del carrito",
                duration:"3000",
                gravity: "bottom",
                position:"right",
                style: {
                    color: "black",
                    background: "linear-gradient(0deg, rgba(247,242,83,1) 22%, rgba(251,164,6,1) 100%, rgba(0,0,0,0.7539390756302521) 100%)",
                  }
            }).showToast();
        })
    })
    calcularTotal();
}


//funcion para eliminar productos del carrito


const eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();

    //LocalStorage:
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


//vaciamos todo el carrito 

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

//función para eliminar todo el carrito


const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    //LocalStorage. 
    localStorage.clear();
}

vaciarCarrito.addEventListener("click", () =>{
    Swal.fire({
        title: '¿Estás seguro de eliminar todos los productos?',
        text: "Se eliminaran todos los productos de tu carrito",
        icon: 'warning',
        showCancelButton: true,
        background: "#FFFFAD",
        confirmButtonColor: "#EBB31A",
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Vaciaste el carrito!',
            'Todos los productos del carrito fueron eliminados',
            'success'
        )
        }
      })
})

//mostramos el total de la compra 

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0; 
    carrito.forEach((producto) => {
        totalCompra += producto.precio * producto.cantidad;  
    })
    total.innerHTML = `Total: $${totalCompra}`;
}



//seccion de fotos cargada con fetch

const listado = document.getElementById("listado");
const nosotrosFotos = "json/nosotros.json";

fetch(nosotrosFotos)
    .then(respuesta => respuesta.json())
    .then(datos=>{
        datos.forEach( nosotros => {
            const card = document.createElement("div");
            card.classList.add("con-xl-3", "col-md-6", "col-xs-12");
            card.innerHTML = `
            <div class="card bgColor">
            <img src="${nosotros.img}" class="card-img.top imgProductos">
            <div class="card-body">
            <h3 class="card-tittle"> ${nosotros.titulo} </h3>
            <P class="card-text"> ${nosotros.descripcion} </p>
            </div>
            `
            contenedorNosotros.appendChild(card);
    }).catch(error => console.log(error))
});