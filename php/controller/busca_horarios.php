<?php
include '../model/dbconnect.php';

//genero la consulta
$consulta="SELECT id,
nombre,
DATE_FORMAT(`fecha_creacion`,'%d/%m/%Y %H:%i') as fecha,
hora_inicio,
hora_fin
FROM horario
ORDER BY 2";

$html = "<div id='divTabla' style='float:left'>";
$html .= "<table id='tablaSeleccionHorarios' cellpadding='5' cellspacing='0' class='tabla' style='width: 100%;'>";
$html .= "<thead>";
$html .= "<th style='text-align: left;'>Id</th>";
$html .= "<th style='text-align: left;'>Nombre</th>";
$html .= "<th style='text-align: left;'>Hora inicio</th>";
$html .= "<th style='text-align: left;'>Hora fin</th>";
$html .= "</thead><tbody>";

$result = mysqli_query($link,$consulta);
while ($pos = mysqli_fetch_object($result))
{
	$html .= "<tr onclick='seleccionarHorario(\"".$pos->nombre."\", \"formularioCrearEmpleado\")'>";
	$html .= "<td>".$pos->id."</td>";
	$html .= "<td>".$pos->nombre."</td>";
	$html .= "<td>".$pos->hora_inicio."</td>";
	$html .= "<td>".$pos->hora_fin."</td>";
	$html .= "</tr>";
}

$html .= "</tbody></table>";
$html .= "</div>";

echo $html;