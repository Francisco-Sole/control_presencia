<?php
include 'dbconnect.php';

//rescatamos los datos.
$id = $_POST["id"];

$d = date("Y-m-d H:i:s");
//genero la consulta
$consulta="UPDATE 
`usuario`  
SET 
`activo` = 0,
`fecha_baja` = '".$d."'
WHERE 
`id` = $id;";
//var_dump($consulta);
$result = mysqli_query($link,$consulta);

echo mysqli_affected_rows($link);


//FALTA TARJETA/////////////////////
//FALTA HORARIO////////////////////////