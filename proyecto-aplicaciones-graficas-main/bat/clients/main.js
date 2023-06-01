document.addEventListener('DOMContentLoaded', function () {
    var url = 'http://localhost/proyecto-aplicaciones-graficas-main/bat/clients/routs.php/client/newsession/?verify=1';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error en la solicitud POST');
            }
        })
        .then(function (data) {
            // Manejar los datos de la respuesta JSON
            //console.log('Respuesta:', data);
            // Extraer los datos de la respuesta como JSON
            if (data != 400) {
                document.getElementById("labelusername").innerHTML = data.Nombre + " " + data.Apellido + '<br> <a href="./bat/clients/routs.php/client/closesession">cerrar sesión</a>';
            }
        })
        .catch(function (error) {
            console.log('Error:', error);
        });
});