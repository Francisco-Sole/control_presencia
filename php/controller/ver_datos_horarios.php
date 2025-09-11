<?php
include '../model/dbconnect.php';

$resultado = [];

//genero la consulta
$consulta="SELECT 
	h.nombre,
    h.hora_inicio,
    h.hora_fin,
    DATE_FORMAT(h.fecha_creacion,'%d/%m/%Y') as 'fecha'
FROM horario h
ORDER BY 1";

$html = "<div id='divTabla' style='float:left;'>";
$html .= "<table id='tablaVerTodosHorarios' cellpadding='10' cellspacing='1' class='tabla' style='width: 100%;'>";
$html .= "<thead>";
$html .= "<th style='text-align: left;'>Nombre</th>";
$html .= "<th style='text-align: left;'>Hora inicio</th>";
$html .= "<th style='text-align: left;'>Hora fin</th>";
$html .= "<th style='text-align: right;'>Fecha de creacion</th>";
$html .= "</thead><tbody>";

$result = mysqli_query($link,$consulta);
while ($pos = mysqli_fetch_object($result))
{
	$html .= "<tr>";
	$html .= "<td>".$pos->nombre."</td>";
	$html .= "<td>".$pos->hora_inicio."</td>";
	$html .= "<td>".$pos->hora_fin."</td>";
	$html .= "<td style='text-align: right;'>".$pos->fecha."</td>";
	$html .= "</tr>";
}

$html .= "</tbody></table>";
$html .= "</div>";

echo $html;
