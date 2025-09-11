<?php
include 'dbconnect.php';
//var_dump($_POST["datos"]);
//var_dump($_FILES);

//rescatamos los datos.
$id = $_POST["inputId"];
$nombre = $_POST["inputNombre"];
$apellido1 = $_POST["inputApellido1"];
$dni = $_POST["inputDNI"];
$apellido2 = "";
$hay_apellido = false;
$tarjeta = "";
$foto = "";
$hay_foto = false;
$horario = $_POST["inputHorario"];
//compruebo los opcionales
if (isset($_POST["inputApellido2"])) {
	if (empty($_POST["inputApellido2"])) {
		$hay_apellido = false;
	}
	else
	{
		$apellido2 = $_POST["inputApellido2"];
		$hay_apellido = true;
	}
}
else
{
	$hay_apellido = false;
}

if (isset($_POST["inputTarjeta"])) {
	if (empty($_POST["inputTarjeta"])) {
		$tarjeta = $_POST["inputTarjeta"];
		$hay_tarjeta = false;
	}
	else
	{
		$tarjeta = $_POST["inputTarjeta"];
		$hay_tarjeta = true;
		$idTarjeta = "";
		//consigo el id de la tarjeta.
		$consulta = "SELECT id FROM tarjeta WHERE codigo = '$tarjeta'";
		$result = mysqli_query($link,$consulta);
		while ($pos = mysqli_fetch_object($result))
		{
			$idTarjeta = $pos->id;
		} 
	}
}
if (isset($_FILES["inputFoto"])) {
	$foto = $_FILES["inputFoto"]["name"];
	//trato la foto
	if (!empty($foto)) {
		$foto = mysql_real_escape_string(file_get_contents($_FILES["inputFoto"]["tmp_name"]));
		$hay_foto = true;
	}
}

$idHorario = "";
//consigo el id de horario.
$consulta = "SELECT id FROM horario WHERE nombre = '$horario'";
$result = mysqli_query($link,$consulta);
while ($pos = mysqli_fetch_object($result))
{
	$idHorario = $pos->id;
} 
//genero la consulta
$consulta = "UPDATE 
`usuario` 
SET 
`nombre` = '$nombre',
`apellido1` = '$apellido1',";
if ($hay_apellido) {
	$consulta .= "`apellido2` = '$apellido2',";
}
else
{
	$consulta .= "`apellido2` = Null,";
}
$consulta .="`dni` = '$dni', 
`id_horario` = $idHorario,";
if ($hay_tarjeta) {
	$consulta .= "`id_tarjeta` = '$idTarjeta',";
}
else
{
	$consulta .= "`id_tarjeta` = Null,";
}

if ($hay_foto) {
	$consulta .= "`foto` = '$foto'";
}

$consulta .= " WHERE `id` = $id;";


$result = mysqli_query($link,$consulta);
echo mysqli_affected_rows($link);