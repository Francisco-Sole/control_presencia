<?php
include '../model/dbconnect.php';
header('Content-Type: text/html; charset=utf-8');
$resultado = [];

//genero la consulta
$consulta="SELECT id,
codigo,
DATE_FORMAT(`fecha_creacion`,'%d/%m/%Y %H:%i') as fecha,
activo,
observaciones
FROM tarjeta
ORDER BY 2";

$result = mysqli_query($link,$consulta);

$html = "<style>tr:nth-child(even) {background-color: rgba(0,0,0,0.1);}</style>";
$html .= "<table  cellpadding='5' cellspacing='0' class='tabla' style='width: 100%;'>";
$html .= "<tr>";
$html .= "<th style='text-align: left;'>Id</th>";
$html .= "<th style='text-align: left;'>Codigo</th>";
$html .= "<th style='text-align: left;'>Fecha de alta</th>";
$html .= "<th style='text-align: left; max-width: 445px;'>Observaciones</th>";
$html .= "<th style='text-align: left;'>Activo</th>";
$html .= "</tr>";

$result = mysqli_query($link,$consulta);
while ($pos = mysqli_fetch_object($result))
{
	$html .= "<tr>";
	$html .= "<td>".$pos->id."</td>";
	$html .= "<td>".$pos->codigo."</td>";
	$html .= "<td>".$pos->fecha."</td>";
	$html .= "<td style='max-width: 445px;'>".$pos->observaciones."</td>";
	$html .= "<td><input disabled='disabled' type='checkbox' name='inputActivo' id='inputActivo' ";
	if ($pos->activo == 1) {
		$html .= "checked='checked' />";
	}
	else
	{
		$html .= " /></td></tr>";
	}
	$html .= "</td></tr>";
}

$html .= "</table>";
$html .= "</div>";

echo $html;
?>
