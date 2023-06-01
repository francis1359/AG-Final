<?php
// Incluir controladores
require_once 'controllers.php';

// Obtener la URL solicitada
$url = $_SERVER['REQUEST_URI'];

$string = $url;
$buscar = "routs.php";
$resultado = substr($string, 0, strpos($string, $buscar) + strlen($buscar));

//echo $url;
// Eliminar parámetros de consulta (si los hay)
$url = rtrim(strtok($url, '?'),"/");

// Definir las rutas disponibles y las funciones controladoras asociadas
$routes = [
    $resultado.'/client/add' => 'add',
    $resultado.'/client/newsession' => 'newsession',
    $resultado.'/client/closesession' => 'closesession',
];

//echo $url."<br>".$resultado."<br>";
// Verificar si la ruta solicitada existe en las rutas definidas
if (array_key_exists($url, $routes)) {
    $controller = $routes[$url];
    // Llamar a la función controladora correspondiente
    call_user_func($controller);
} else {
    // Ruta no encontrada, mostrar página de error o redireccionar a una página predeterminada
    echo "404 - Página no encontrada";
}
?>