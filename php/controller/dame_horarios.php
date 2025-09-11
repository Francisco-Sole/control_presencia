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

$html = "<span class='cabecera'>Modifica horarios</span><div id='divTabla' style='margin-left: -1px;margin-top: -1px;'>";
$html .= "<table id='tablaTodosHorariosModificables' cellpadding='5' cellspacing='0' class='tabla' style='width: 100%;'>";
$html .= "<thead>";
$html .= "<th style='text-align: left;'>Id</th>";
$html .= "<th style='text-align: left;'>Nombre</th>";
$html .= "<th style='text-align: left;'>Fecha de alta</th>";
$html .= "<th style='text-align: left;'>Hora inicio</th>";
$html .= "<th style='text-align: left;'>Hora fin</th>";
$html .= "</thead><tbody>";

$result = mysqli_query($link,$consulta);
while ($pos = mysqli_fetch_object($result))
{
	$html .= "<tr>";
	$html .= "<td>".$pos->id."</td>";
	$html .= "<td><input class='campoFormulario' style='border: none;padding: 0;background: transparent; margin-top: 20px;' id='nombreHorario".$pos->id."' type='text' value='".$pos->nombre."' onblur='actualizaHorario(".$pos->id.")'/></td>";
	$html .= "<td>".$pos->fecha."</td>";
	$html .= "<td><input class='campoFormulario' style='border: none;padding: 0;background: transparent; margin-top: 20px;' id='horaInicio".$pos->id."' type='time' value='".$pos->hora_inicio."' onblur='actualizaHorario(".$pos->id.")'/></td>";
	$html .= "<td><input class='campoFormulario' style='border: none;padding: 0;background: transparent; margin-top: 20px;' id='horaFin".$pos->id."' type='time' value='".$pos->hora_fin."' onblur='actualizaHorario(".$pos->id.")'/></td>";
	$html .= "</tr>";
}

$html .= "</tbody></table>";
$html .= "</div>";

echo $html;