<?php
include 'dbconnect.php';

//rescatamos los datos.
$id = $_POST["id"];
$horaI = $_POST["horaInicio"];
$horaF = $_POST["horaFin"];
$nombre = $_POST["nombre"];
//genero la consulta
$consulta="UPDATE 
`horario`
SET 
`hora_inicio` = '$horaI',
`hora_fin` = '$horaF',
`nombre` = '$nombre'
WHERE 
`id` = $id;";

$result = mysqli_query($link,$consulta);

echo mysqli_affected_rows($link);