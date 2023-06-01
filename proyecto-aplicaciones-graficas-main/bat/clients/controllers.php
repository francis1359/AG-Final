<?php
session_start();
// Incluir el archivo de conexión
require_once 'context.php';

// Controlador Productos

function add(){ //Agrega un nuevo cliente
    try {
    global $conn;
    // Obtener los datos del nuevo cliente del formulario
    $nombre = limpiarCaracteresDaninos($_POST['nombre']);
    $apellido = limpiarCaracteresDaninos($_POST['apellido']);
    $correo = limpiarCaracteresDaninos($_POST['correo']);
    $contrasena = limpiarCaracteresDaninos($_POST['contrasena']);


    // Verificar si el correo electrónico o el nombre de usuario ya existen
    $sql_verificar = "SELECT * FROM Clientes WHERE CorreoElectronico = '$correo'";
    $resultado = $conn->query($sql_verificar);
    
    if ($resultado->rowCount() > 0) {
        // El correo electrónico o el nombre de usuario ya existen
        echo "Este correo ya están registrado";
        return;
    }

    // Crear la consulta SQL para insertar el nuevo cliente
    $sql = "INSERT INTO Clientes (Nombre, Apellido, CorreoElectronico, Contrasena)
    VALUES ('$nombre', '$apellido', '$correo', '$contrasena')";

    // Ejecutar la consulta
    $conn->query($sql);
    newsession($nombre,$contrasena);
    } catch(PDOException $e) {
        echo "Error de conexión: " . $e->getMessage();
    }
}


function newsession($username = "",$password = ""){
    global $conn;
    if (isset($_SESSION['usuario']) && isset($_GET["verify"])) {
        header("Content-Type: application/json");
        echo  json_encode($_SESSION['usuario']);
    }else if(!isset($_SESSION['usuario']) && isset($_GET["verify"])){
        echo 400;
    }
     else {
        if($username == "" ){
            // Obtener las credenciales enviadas desde JavaScript
            $username = limpiarCaracteresDaninos($_POST['nombre']);
            $password = limpiarCaracteresDaninos($_POST['contrasena']);
        }
        // SQL query
        $sql = "SELECT * FROM Clientes WHERE Nombre = :username AND Contrasena = :password";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password', $password);
        $stmt->execute();

        // verificamos si el usuario existe
        if ($stmt->rowCount() > 0) {
            $client = $stmt->fetch(PDO::FETCH_ASSOC);
            // guardamos la informacion del cliente quiando la contraseña
            unset($client['Contrasena']);
            $_SESSION['usuario'] = $client;
            header("Location: ../../../../");
            exit();
        } else {
            echo "User does not exist or the provided username and credit card number combination is incorrect.";
        }
        
    }
}


function closesession(){
    // Cerrar la sesión y destruir las variables de sesión
    session_unset();
    session_destroy();
    if (isset($_SERVER['HTTP_REFERER'])) {
        $previousUrl = $_SERVER['HTTP_REFERER'];
        header("Location: $previousUrl");
        exit();
    }
}


function limpiarCaracteresDaninos($cadena) {
    // Lista de caracteres dañinos a eliminar
    $caracteresDaninos = array("'", '"', ';', '--');

    // Reemplazar los caracteres dañinos por una cadena vacía
    $cadenaLimpia = str_replace($caracteresDaninos, '', $cadena);

    return $cadenaLimpia;
}

?>