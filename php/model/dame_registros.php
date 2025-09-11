<?php
include '../model/dbconnect.php';

//genero la consulta
$consulta="SELECT r.id,
       r.fecha_creacion,
       DATE_FORMAT(r.fecha_de_registro, '%d/%m/%Y') 'fecha',
       r.hora,
       a.nombre 'actividad',
       u.nombre 'usuario',
       r.tipo
FROM `registro` r
     JOIN `actividad` a ON r.`id_actividad` = a.`id`
     JOIN `usuario` u ON r.`id_usuario` = u.`id`";

$html = "<span class='cabecera'>Control de registros</span><div id='divTabla' style='margin-left: -1px;margin-top: -1px;'>";
$html .= "<table id='tablaRegistros' cellpadding='5' cellspacing='0' class='tabla' style='width: 100%;'>";
$html .= "<thead><tr>";
$html .= "<th style='text-align: left;'>Usuario</th>";
$html .= "<th style='text-align: left;'>Fecha</th>";
$html .= "<th style='text-align: left;'>Hora</th>";
$html .= "<th style='text-align: left;'>Tipo</th>";
$html .= "<th style='text-align: left;'>Actividad</th>";
$html .= "<th style='text-align: left;'>Borrar</th>";
$html .= "</tr></thead><tbody>";

$result = mysqli_query($link,$consulta);
while ($pos = mysqli_fetch_object($result))
{
	$html .= "<tr>";
	$html .= "<td>".$pos->usuario."</td>";
	$html .= "<td>".$pos->fecha."</td>";
	$html .= "<td>".$pos->hora."</td>";
	$html .= "<td>".$pos->tipo."</td>";
	$html .= "<td>".$pos->actividad."</td>";
	$html .= "<td style='text-align: center; color: red' onclick='borrarRegistro(".$pos->id.")'>X</td>";
	$html .= "</tr>";
}

$html .= "</tbody></table>";
$html .= "</div>";

echo $html;