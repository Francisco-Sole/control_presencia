<?php
include '../model/dbconnect.php';

$id = $_POST["id"];
//genero la consulta
$consulta='SELECT r.fecha_de_registro, r.id_actividad, a.nombre from registro r join actividad a on r.id_actividad = a.id where date_format(fecha_de_registro, "%Y-%m") = date_format(NOW(), "%Y-%m") and a.absentismo = 1 and r.id_usuario = '. $id;
$result = mysqli_query($link,$consulta);
$temp = [];
while ( $pos = mysqli_fetch_object($result)) {
	array_push($temp, $pos);	
}

echo json_encode($temp);