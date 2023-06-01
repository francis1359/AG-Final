// Función para obtener la lista de productos del localStorage
function obtenerListaProductos() {
    const listaProductos = localStorage.getItem('productos');
    if (listaProductos) {
        return JSON.parse(listaProductos);
    } else {
        return [];
    }
}

// Función para guardar la lista de productos en el localStorage
function guardarListaProductos(lista) {
    localStorage.setItem('productos', JSON.stringify(lista));

    //UpDteInfo(true)
}

// Función para agregar un producto a la lista si no existe
function agregarProducto(id, nombre, precio, cantidad) {
    const listaProductos = obtenerListaProductos();

    // Verificar si el producto ya existe en la lista
    const productoExistente = listaProductos.find(producto => producto.id === id);
    if (productoExistente) {
        console.log('El producto ya existe en la lista.');
        return; // Salir de la función si el producto ya existe
    }

    const nuevoProducto = {
        id: id,
        nombre: nombre,
        precio: precio,
        cantidad: cantidad
    };
    listaProductos.push(nuevoProducto);
    guardarListaProductos(listaProductos);

UpDteInfo()
UpdateConteo()
}

// Función para modificar un producto en la lista
function modificarProducto(id) {

    const listaProductos = obtenerListaProductos();
    for (let i = 0; i < listaProductos.length; i++) {
        if (listaProductos[i].id === id) {
            listaProductos[i].cantidad = document.getElementById(`valmanual${id}`).value;
            break;
        }
    }
    guardarListaProductos(listaProductos);

    document.getElementById("spanidcartotal").innerHTML = obtenerListaProductos().length;
    productoModificado = obtenerListaProductos().filter(producto => producto.id == id)[0];
    document.getElementById("preciopp"+id).innerHTML = productoModificado.precio * productoModificado.cantidad;
    total = obtenerListaProductos().filter(producto => producto.id == id)[0];
    
    document.getElementById("spanidcartotalpagar").innerHTML = obtenerListaProductos().filter(producto => producto.cantidad > 0) // Filtrar productos con cantidad mayor a 0
    .reduce((total, producto) => total + (producto.precio * producto.cantidad), 0); // Calcular la suma total
}

// Función para eliminar un producto de la lista
function eliminarProducto(id) {
    const listaProductos = obtenerListaProductos();
    const nuevaListaProductos = listaProductos.filter(producto => producto.id !== id);
    guardarListaProductos(nuevaListaProductos);
    
    UpdateConteo();
    UpDteInfo();
   
}


function UpDteInfo(est = true) {
    lista = obtenerListaProductos()    
    let total = 0;
    document.getElementById("cartinlinebody").innerHTML = "";
    var url = window.location.href;
    var lastSlashIndex = url.lastIndexOf('/');
    var modifiedURL = url.substring(0, lastSlashIndex)  + "/bat/products/routs.php/product/imgPrint/?NumProd=";

    for (let i = 0; i < lista.length; i++) {
        const producto = lista[i];
        total += producto.precio * producto.cantidad;

        if (est) {
            document.getElementById("cartinlinebody").innerHTML +=
                `<div class="unit align-items-center">
        <div class="unit-left">
          <a class="cart-inline-figure" href="#"><img class="CarImg" src="${modifiedURL}${producto.id}" alt="" width="108" height="100"></a>
        </div>
        <div class="unit-body">
          <h6 class="cart-inline-name">
            <a href="#">${producto.nombre}</a>
          </h6>
          <div>
            <div class="group-xs group-inline-middle">
              <div class="table-cart-stepper">
                <div class="stepper "><input oninput="modificarProducto(${producto.id})" id="valmanual${producto.id}" class="form-input stepper-input" type="number" data-zeros="true" value="${producto.cantidad}" min="1" max="1000"><span class="stepper-arrow up" onclick="document.getElementById('valmanual${producto.id}').value= parseInt(document.getElementById('valmanual${producto.id}').value) + 1;modificarProducto(${producto.id})" ></span><span class="stepper-arrow down" onclick="document.getElementById('valmanual${producto.id}').value= parseInt(document.getElementById('valmanual${producto.id}').value) - 1;modificarProducto(${producto.id})"></span></div>
              </div>
              <h6 class="cart-inline-title" id="preciopp${producto.id}">${producto.precio * producto.cantidad}</h6><br>
              <button aria-label="boton" onclick="eliminarProducto(${producto.id})">Quitar</button>
            </div>
          </div>
        </div>
      </div>`;
        }

    }
    document.getElementById("spanidcartotal").innerHTML = obtenerListaProductos().length;
    document.getElementById("spanidcartotalpagar").innerHTML = total
}


function UpdateConteo() {
    document.getElementById("totaldearet").innerHTML = obtenerListaProductos().length
}

UpDteInfo()
UpdateConteo()