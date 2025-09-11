<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<!-- para ver acentos y la ñ -->
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Control y Gestion de presencia</title>
	<!-- El css -->
	<link rel="stylesheet" href="css/datatables.css"/>
	<link rel="stylesheet" href="css/jquery-ui.css"/>
	<link rel="stylesheet" href="css/jquery-ui.structure.css"/>
	<link rel="stylesheet" href="css/jquery-ui.theme.css"/>
	<link rel="stylesheet" href="css/index.css" />

	<!-- Jquery -->
	<script type="text/javascript" src="frameworks/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="frameworks/datatables.min.js"></script>
	<script type="text/javascript" src="frameworks/jquery-ui.js"></script>

	<!-- index.js -->
	<script type="text/javascript" src="js/index.js"></script>
</head>
<body style="width: 100%">
	<script>
		const ERROR = 0;
		const INFO = 1;
	</script>
	<!-- El titulo de la web -->
	<div class="titulo">Control y gestion de presencia</div>
	<!-- El menu -->
	<nav class="menu">
		<ul>
			<li id="informes" tipo="boton_menu" activo="0">Informes</li>
			<li id="empleados" tipo="boton_menu" activo="0">Empleados</li>
			<li id="tarjetas" tipo="boton_menu" activo="0">Tarjetas</li>
			<li id="horarios" tipo="boton_menu" activo="0">Horarios</li>
			<li id="absentismos" tipo="boton_menu" activo="0">Absentismos</li>
			<li id="correccion" tipo="boton_menu" activo="0">Control horarios</li>
		</ul>
	</nav>
	<!-- el submenu -->
	<aside class="submenu" id="submenu">
	</aside>
	<!-- el contenedor principal -->
	<main class="main" id="contenedorPrincipal">
		<p class="subtitulo">Bienvenido/a</p>
		<p style="font-family: titulo_hv">Selecciona una opcion del menu para poder gestionar el control de presencia.</p>
	</main>
	<div class="main" id="divinfo" style="float: left; width: 71%;margin-left: 13%;padding: 0; text-align: center;border: 1px solid black;background-color: #D4ACA9;border:none"></div>
	<div id="sombra"></div>
	<div id="auxiliar"></div>
</body>
</html>

<?php
//insert = "" no insertado correctamente.
//insert = 1 insertado correctamente.
if(isset($_GET["insert"])){
	if($_GET["insert"] == ""){
		?>
		<script>
			aviso("No se pudo crear el empleado. Contacte con informatica.<br/><br/> <p style='font-style: italic'>informatica@impackta.com</p>", ERROR);
		</script>
		<?php
	}
	else
	{
		?>
		<script>
			aviso("Empleado creado correctamente", INFO);
		</script>
		<?php	
	}
}
if(isset($_GET["update"])){
	if($_GET["update"] == "" || $_GET["update"] == "-1"){
		?>
		<script>
			aviso("Error al actualizar los datos del empledo. Contacte con informatica.<br/><br/> <p style='font-style: italic'>informatica@impackta.com</p>", ERROR);
		</script>
		<?php
	}
	else
	{
		?>
		<script>
			aviso("Empleado actualizado correctamente", INFO);
		</script>
		<?php	
	}
}

if(isset($_GET["del"])){
	if($_GET["del"] == "" || $_GET["del"] == "-1"){
		?>
		<script>
			aviso("Error al eliminar los datos del empledo. Contacte con informatica.<br/><br/> <p style='font-style: italic'>informatica@impackta.com</p>", ERROR);
		</script>
		<?php
	}
	else
	{
		?>
		<script>
			aviso("Datos de empleado eliminados correctamente", INFO);
		</script>
		<?php	
	}
}

if(isset($_GET["tarjeta"])){
	if($_GET["tarjeta"] == "" || $_GET["tarjeta"] == "-1"){
		?>
		<script>
			aviso("Error al crear los datos de la tarjeta. Contacte con informatica.<br/><br/> <p style='font-style: italic'>informatica@impackta.com</p>", ERROR);
		</script>
		<?php
	}
	else
	{
		?>
		<script>
			aviso("Datos de tarjeta creados correctamente", INFO);
		</script>
		<?php	
	}
}

if(isset($_GET["horario"])){
	if($_GET["horario"] == "" || $_GET["horario"] == "-1"){
		?>
		<script>
			aviso("Error al crear el horario. Contacte con informatica.<br/><br/> <p style='font-style: italic'>informatica@impackta.com</p>", ERROR);
		</script>
		<?php
	}
	else
	{
		?>
		<script>
			aviso("Horario creado correctamente", INFO);
		</script>
		<?php	
	}
}

if(isset($_GET["registros"])){
	if($_GET["registros"] == "" || $_GET["registros"] == "-1"){
		?>
		<script>
			aviso("Error al crear el registro. Contacte con informatica.<br/><br/> <p style='font-style: italic'>informatica@impackta.com</p>", ERROR);
		</script>
		<?php
	}
	else
	{
		?>
		<script>
			aviso("Registro/s creado/s correctamente", INFO);
		</script>
		<?php	
	}
}
?>