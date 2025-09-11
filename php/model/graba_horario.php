<?php
include 'dbconnect.php';

//rescatamos los datos.
$nombre = $_POST["inputNombreHorario"];
$horaI = $_POST["inputHoraInicio"];
$horaF = $_POST["inputHoraFin"];


//genero la consulta
$consulta = "INSERT INTO horario (hora_inicio, hora_fin, nombre) VALUES('$horaI','$horaF','$nombre')";
//var_dump($consulta);
$result = mysqli_query($link,$consulta);

//redirijo a index.
//insert = 0 no insertado correctamente.
//insert = 1 insertado correctamente.
header('Location: ../../index.php?horario='.$result);