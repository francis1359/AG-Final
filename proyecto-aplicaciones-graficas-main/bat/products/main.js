function ListarProd(producList) {
    const galeria = document.getElementById("galleryProduct");
    galeria.innerHTML = "";

    var url = window.location.href;
    var lastSlashIndex = url.lastIndexOf('/');
    var modifiedURL = url.substring(0, lastSlashIndex)  + "/bat/products/routs.php/product/imgPrint/?NumProd=";
    console.log(modifiedURL)
    
    producList.forEach(pro => {

        galeria.innerHTML += `
            <div class="product">
                <img class="imgProduct" src="${modifiedURL}${pro["NumProd"]}" alt="Product ${pro["NumProd"]}"  width="300" height="300"/>
                <h3>${pro["NombreProd"]}</h3>
                <p>C$ ${pro["PrecDeVentaPrecProd"]}</p>
                <p>
                    <button aria-label="boton" onclick="agregarProducto(${pro["NumProd"]}, '${pro["NombreProd"]}', ${pro["PrecDeVentaPrecProd"]}, 1)">add</button>
                </p>
            </div>`;
    }); 
}


function GetProduct() {
    // Crea un nuevo objeto XMLHttpRequest
    var xhr = new XMLHttpRequest();
    // Configura la solicitud
    var url = window.location.href;
    var lastSlashIndex = url.lastIndexOf('/');
    var modifiedURL = url.substring(0, lastSlashIndex);

    xhr.open('POST', modifiedURL + '/bat/products/routs.php/product/list', true);

    // Establece el encabezado de la solicitud
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Configura el manejo de la respuesta
    xhr.onload = function () {
        if (xhr.status === 200) {
            // La solicitud se completó exitosamente
            var response = JSON.parse(xhr.responseText);
            ListarProd(response);
        } else {
            // Hubo un error en la solicitud
            console.log('Error en la solicitud. Código de estado: ' + xhr.status);
        }
    };

    // Crea un objeto con los datos a enviar en el cuerpo de la solicitud
    var requestData = {
        // Agrega los datos necesarios para la solicitud POST
    };

    // Convierte el objeto a JSON
    var jsonData = JSON.stringify(requestData);

    // Envía la solicitud POST con los datos en el cuerpo
    xhr.send(jsonData);
}



window.addEventListener("load", (event) => {
    GetProduct()
});
