<?php
include 'dbconnect.php';

//rescatamos los datos.
$id = $_POST["id"];

//genero la consulta
$consulta="DELETE FROM 
  `registro` 
WHERE 
  `id` = $id;";

$result = mysqli_query($link,$consulta);
echo mysqli_affected_rows($link);

