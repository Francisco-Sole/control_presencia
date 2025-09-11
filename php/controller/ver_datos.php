<?php
include '../model/dbconnect.php';

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

$html = "<div id='divTabla' style='float:left;'>";
$html .= "<table id='tablaSeleccionEmpleados' cellpadding='10' cellspacing='1'  class='tabla' style='width: 100%;'>";
$html .= "<thead>";
$html .= "<th style='text-align: left;'>Nombre</th>";
$html .= "<th style='text-align: left;'>Apellido 1</th>";
$html .= "<th style='text-align: left;'>Apellido 2</th>";
$html .= "<th style='text-align: left;'>DNI</th>";
$html .= "<th style='text-align: left;'>Tarjeta</th>";
$html .= "<th style='text-align: left;'>Horario</th>";
$html .= "<th style='text-align: left;'>Foto</th>";
$html .= "</thead><tbody>";

$result = mysqli_query($link,$consulta);
while ($pos = mysqli_fetch_object($result))
{
	$html .= "<tr onclick='seleccionarEmpleadoVer(".$pos->id.")' style='cursor:pointer'>";
	$html .= "<td>".$pos->nombre."</td>";
	$html .= "<td>".$pos->apellido1."</td>";
	$html .= "<td>".$pos->apellido2."</td>";
	$html .= "<td>".$pos->dni."</td>";
	$html .= "<td>".$pos->codigo."</td>";
	$html .= "<td style='text-align: center;'>".$pos->nomhorario."</td>";
	header('Content-Type: image/png');
	
	if (empty($pos->foto)) {
		$html .= "<td><img src='img/sin_foto.png' height=60px/></td>";		
	}else{
		$html .= "<td><img src='data:image/png;base64,".base64_encode($pos->foto)."' height=60px/></td>";		
	}

	$html .= "</tr>";
}

$html .= "</tbody></table>";
$html .= "</div>";

echo $html;
