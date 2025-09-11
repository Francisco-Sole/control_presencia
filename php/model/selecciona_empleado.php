<?php
include '../model/dbconnect.php';

$id = $_POST["id"];

$resultado = [];

//genero la consulta
$consulta="SELECT u.id,
       u.nombre,
       u.apellido1,
       u.apellido2,
       u.dni,
       u.foto,
       t.codigo,
       h.nombre as 'nomhorario'
FROM usuario u
     join `tarjeta` t on u.id_tarjeta = t.id
     join `horario` h on u.id_horario = h.id
WHERE u.id = $id
ORDER BY 2";

$result = mysqli_query($link,$consulta);
if ($pos = mysqli_fetch_object($result))
{
	$temp = [];
	array_push($temp, $pos->id);
	array_push($temp, $pos->nombre);
	array_push($temp, $pos->apellido1);
	array_push($temp, $pos->apellido2);
	array_push($temp, $pos->dni);
	array_push($temp, base64_encode($pos->foto));
	array_push($temp, $pos->codigo);
	array_push($temp, $pos->nomhorario);
	array_push($resultado, $temp);
}

echo json_encode($resultado);
