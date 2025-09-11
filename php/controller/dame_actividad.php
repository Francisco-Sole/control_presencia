<?php
include '../model/dbconnect.php';

//genero la consulta
$consulta="SELECT id, nombre FROM `actividad` WHERE activo = 1  AND absentismo = 1 order by nombre";

$result = mysqli_query($link,$consulta);
$temp = [];
while ( $pos = mysqli_fetch_object($result)) {
	array_push($temp, $pos);	
}


echo json_encode($temp);