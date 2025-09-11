<?php
include '../model/dbconnect.php';

//genero la consulta
$consulta="SELECT t.id,
t.codigo,
DATE_FORMAT(t.fecha_creacion,'%d/%m/%Y %H:%i') as fecha
FROM tarjeta t WHERE t.id NOT IN (SELECT id_tarjeta FROM usuario)";

$html = "<span class='cabecera'>Modifica horarios</span><div id='divTabla' style='margin-left: -1px;margin-top: -1px;'>";
$html .= "<table id='tablaTarjetasEliminar' cellpadding='5' cellspacing='0' class='tabla' style='width: 100%;'>";
$html .= "<thead>";
$html .= "<th style='text-align: left;'>Id</th>";
$html .= "<th style='text-align: left;'>Codigo</th>";
$html .= "<th style='text-align: left;'>Fecha de alta</th>";
$html .= "<th style='text-align: left;'>Borrar</th>";
$html .= "</thead><tbody>";

$result = mysqli_query($link,$consulta);
while ($pos = mysqli_fetch_object($result))
{
	$html .= "<tr>";
	$html .= "<td>".$pos->id."</td>";
	$html .= "<td>".$pos->codigo."</td>";
	$html .= "<td>".$pos->fecha."</td>";
	$html .= "<th style='text-align: center;background-color: rgba(255,0,0,0.6);cursor:pointer' onclick='borrarTarjeta(".$pos->id.")'><span>X</span></th>";
	$html .= "</tr>";
}

$html .= "</tbody></table>";
$html .= "</div>";

echo $html;