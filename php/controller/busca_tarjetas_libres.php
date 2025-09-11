<?php
include '../model/dbconnect.php';

//genero la consulta
$consulta="SELECT t.`id`,
       t.`codigo`
	FROM `tarjeta` t
	WHERE t.`id` NOT IN (
                  SELECT id_tarjeta
                  FROM usuario
                  WHERE id_tarjeta IS NOT NULL
  	);";

$result = mysqli_query($link,$consulta);


$html = "<div id='divTabla' style='float:left;'>";
$html .= "<table id='tablaSeleccionTajetaLibre' cellpadding='5' cellspacing='0' class='tabla' style='width: 100%;'>";
$html .= "<thead>";
$html .= "<th style='text-align: left;'>Id</th>";
$html .= "<th style='text-align: left;'>Codigo</th>";
$html .= "</thead><tbody>";
while ($pos = mysqli_fetch_object($result))
{	$html .= "<tr onclick='seleccionarTarjeta(".$pos->codigo.", \"formularioCrearEmpleado\")'>";
	$html .= "<td>".$pos->id."</td>";
	$html .= "<td>".$pos->codigo."</td>";
	$html .= "</tr>";
}
$html .= "</tbody></table>";
$html .= "</div>";

echo $html;
