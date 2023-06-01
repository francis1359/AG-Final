<?php
// Incluir el archivo de conexión
require_once 'context.php';

// Controlador Productos

function productList(){ //Crea una lista de todos los productos
    global $conn;
    try {
        // Select all records from a table
        $stmt = $conn->query("SELECT catprod.NumProd, catprod.CodProd, catprod.NombreProd, catprod.ConcentracionPres, preccatprod.PrecDeVentaPrecProd
        from catproducto catprod
        inner join PrecioCatProducto preccatprod on(catprod.NumProd = preccatprod.NumProd)
        group by catprod.NumProd
        order by catprod.NumProd;
        ");
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        // Convert results to JSON
        $jsonResults = json_encode($results);
    
        // Output the JSON
        header('Content-Type: application/json');
        echo $jsonResults;
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}

function imgPrint() {
    global $conn;
    $productId = limpiarCaracteresDaninos($_GET["NumProd"]);
    
    //echo $productId;
    // Consultar la imagen desde la base de datos
    $stmt = $conn->prepare("SELECT ImagenProd FROM CatProducto WHERE NumProd = :NumProd");
    $stmt->bindParam(':NumProd', $productId);
    $stmt->execute();
    
    // Obtener la fila de resultados
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    // Obtener los datos de la imagen
    $imagen = $row['ImagenProd'];

    // Configurar las cabeceras HTTP para indicar que el contenido es una imagen
    header("Content-type: image/webp");

    // Imprimir la imagen en la salida
    echo $imagen;
}

function limpiarCaracteresDaninos($cadena) {
    // Lista de caracteres dañinos a eliminar
    $caracteresDaninos = array("'", '"', ';', '--');

    // Reemplazar los caracteres dañinos por una cadena vacía
    $cadenaLimpia = str_replace($caracteresDaninos, '', $cadena);

    return $cadenaLimpia;
}

?>