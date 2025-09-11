<?php
include 'dbconnect.php';

//rescatamos los datos.
$id = $_POST["id"];
$tipo = $_POST["absentismo"];
$fechas = json_decode($_POST["fechas"]);
$hoy = date("H:i:s");
//genero la consulta
for ($i=0; $i < count($fechas) ; $i++) { 
	$fec = $fechas[$i]->anyo ."-".$fechas[$i]->mes ."-".$fechas[$i]->dia . " " .$hoy;  
	var_dump($fec);
	$consulta="INSERT INTO `registro`(`fecha_de_registro`, `tipo`, `id_actividad`, `id_usuario`) VALUES ( '$fec', 'ADMIN', '$id', '$tipo')";
	$result = mysqli_query($link,$consulta);
}

