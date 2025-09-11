<?php
include '../model/dbconnect.php';

//rescatamos los datos.
$nombre = "";
$apellido1 = "";
$apellido2 = "";
$dni = "";
$tarjeta = "";
$horario = "";

//compruebo los opcionales
if (isset($_POST["inputNombre"])) {
	$nombre = $_POST["inputNombre"];
}

if (isset($_POST["inputApellido1"])) {
	$apellido1 = $_POST["inputApellido1"];
}

if (isset($_POST["inputApellido2"])) {
	$apellido2 = $_POST["inputApellido2"];
}

if (isset($_POST["inputDNI"])) {
	$dni = $_POST["inputDNI"];
}

if (isset($_POST["inputTarjeta"])) {
	$tarjeta = $_POST["inputTarjeta"];
}

if (isset($_POST["inputHorario"])) {
	$horario = $_POST["inputHorario"];
}

$resultado = [];

//genero la consulta
$consulta="SELECT 
u.id,
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
WHERE u.nombre LIKE '$nombre%' AND
u.apellido1 LIKE '$apellido1%' AND
(u.apellido2 LIKE ('$apellido2%') OR u.apellido2 is NULL) AND
u.dni LIKE '$dni%' AND
(t.codigo LIKE ('$tarjeta%') OR t.codigo is NULL) AND
(h.nombre LIKE ('$horario%') OR h.nombre is NULL) AND u.activo = 1
ORDER BY 2";


$result = mysqli_query($link,$consulta);
while ($pos = mysqli_fetch_object($result))
{
	$temp = [];
	array_push($temp, $pos->id);
	array_push($temp, $pos->nombre);
	array_push($temp, $pos->apellido1);
	array_push($temp, $pos->apellido2);
	array_push($temp, $pos->dni);
	array_push($temp, $pos->foto);
	array_push($temp, $pos->id_tarjeta);
	array_push($temp, $pos->id_horario);
	array_push($resultado, $temp);
}

$html = "<div id='divTabla' style='float:left;'>";
$html .= "<table id='tablaBusquedaUsuarioBorrar' cellpadding='5' cellspacing='0' class='tabla' style='width: 100%;'>";
$html .= "<thead>";
$html .= "<th>Id</th>";
$html .= "<th style='text-align: left;'>Nombre</th>";
$html .= "<th style='text-align: left;'>Apellido 1</th>";
$html .= "<th style='text-align: left;'>Apellido 2</th>";
$html .= "<th style='text-align: left;'>DNI</th>";
$html .= "<th style='text-align: left;'>Tarjeta</th>";
$html .= "<th style='text-align: left;'>Horario</th>";
$html .= "<th style='text-align: left;'>Foto</th>";
$html .= "</thead><tbody>";
for ($i=0; $i < count($resultado) ; $i++) { 
	$html .= "<tr onclick='seleccionarEmpleado(".$resultado[$i][0].", \"formularioEliminar\")'>";
	$html .= "<td>".$resultado[$i][0]."</td>";
	$html .= "<td>".$resultado[$i][1]."</td>";
	$html .= "<td>".$resultado[$i][2]."</td>";
	$html .= "<td>".$resultado[$i][3]."</td>";
	$html .= "<td>".$resultado[$i][4]."</td>";
	$html .= "<td>".$resultado[$i][6]."</td>";
	$html .= "<td style='text-align: center;'>".$resultado[$i][7]."</td>";
	header('Content-Type: image/png');
	if (empty($resultado[$i][5])) {
		$html .= "<td><img src='img/sin_foto.png' height=60px/></td>";
	}else{
		$html .= "<td><img src='data:image/png;base64,".base64_encode($resultado[$i][5])."' height=60px/></td>";		
	}
	$html .= "</tr>";
}
$html .= "</tbody></table>";
$html .= "</div>";

echo $html;
