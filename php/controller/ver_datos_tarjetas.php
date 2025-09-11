<?php
include '../model/dbconnect.php';

$resultado = [];

//genero la consulta
$consulta="SELECT t.id,
       t.codigo
FROM tarjeta t
ORDER BY 2";

$html = "<div id='divTabla' style='float:left;'>";
$html .= "<table id='tablaVerTodasTarjetas' cellpadding='10' cellspacing='1'  class='tabla' style='width: 100%;'>";
$html .= "<thead>";
$html .= "<th style='text-align: left;'>Id</th>";
$html .= "<th style='text-align: left;'>Codigo</th>";
$html .= "</thead><tbody>";

$result = mysqli_query($link,$consulta);
while ($pos = mysqli_fetch_object($result))
{
	$html .= "<tr>";
	$html .= "<td>".$pos->id."</td>";
	$html .= "<td>".$pos->codigo."</td>";
	$html .= "</tr>";
}

$html .= "</tbody></table>";
$html .= "</div>";

echo $html;
