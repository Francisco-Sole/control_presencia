<?php
include 'dbconnect.php';

//rescatamos los datos.
$tarjeta = $_POST["inputCodigo"];

//genero la consulta
$consulta = "INSERT INTO tarjeta (codigo) VALUES('$tarjeta')";
$result = mysqli_query($link,$consulta);

//redirijo a index.
//insert = 0 no insertado correctamente.
//insert = 1 insertado correctamente.
header('Location: ../../index.php?tarjeta='.$result);