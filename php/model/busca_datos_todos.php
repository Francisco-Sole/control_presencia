<?php
include '../model/dbconnect.php';
header('Content-Type: text/html; charset=utf-8');
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
WHERE u.activo = 1
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
	array_push($temp, $pos->codigo);
	array_push($temp, $pos->nomhorario);
	array_push($resultado, $temp);
}

$html = "<style>tr:nth-child(even) {background-color: rgba(0,0,0,0.1);}</style>";
$html .= "<div id='divTabla' style=''>";
$html .= "<table cellpadding='5' cellspacing='0' class='tabla' style='width: 100%;'>";
$html .= "<tr>";
$html .= "<th>Id</th>";
$html .= "<th style='text-align: left;'>Nombre</th>";
$html .= "<th style='text-align: left;'>Apellido 1</th>";
$html .= "<th style='text-align: left;'>Apellido 2</th>";
$html .= "<th style='text-align: left;'>DNI</th>";
$html .= "<th style='text-align: left;'>Tarjeta</th>";
$html .= "<th style='text-align: left;'>Horario</th>";
$html .= "<th style='text-align: left;'>Foto</th>";
$html .= "</tr>";
for ($i=0; $i < count($resultado) ; $i++) { 
	$html .= "<tr onclick='seleccionarEmpleado(".$resultado[$i][0].", \"formularioEliminar\")'>";
	$html .= "<td>".$resultado[$i][0]."</td>";
	$html .= "<td>".$resultado[$i][1]."</td>";
	$html .= "<td>".$resultado[$i][2]."</td>";
	$html .= "<td>".$resultado[$i][3]."</td>";
	$html .= "<td>".$resultado[$i][4]."</td>";
	$html .= "<td>".$resultado[$i][6]."</td>";
	$html .= "<td>".$resultado[$i][7]."</td>";
	$html .= "<td><img src='data:image/png;base64,".base64_encode($resultado[$i][5])."' height=100px/></td>";
	$html .= "</tr>";
}
$html .= "</table>";
$html .= "</div>";

echo $html;
?>
