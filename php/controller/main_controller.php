<?php
error_reporting(0);
$link = new mysqli("10.2.232.17", "root", "masterkey", "bdpresencia");
$link->set_charset("utf8");
$codigo = "10";
$id = "3773635";
$d = date("Y-m-d");
$h = date("H:i:s");

$idUsuario = "-1";
$idActividad = "-1";
$nombre = "";
$nombreActividad = "";

$consulta = "SELECT u.`id`, u.`nombre`, u.`joranda_iniciada`
FROM usuario u
JOIN `tarjeta` t ON u.`id_tarjeta` = t.`id`
WHERE t.`codigo` = '$id'";
$result = mysqli_query($link,$consulta);
while ($pos = mysqli_fetch_object($result))
{
	$idUsuario = $pos->id;
	$nombre = $pos->nombre;
	$jorandaIniciada = $pos->joranda_iniciada; 
}

if ($idUsuario == "-1") 
{
	// Usuario no autorizado
	echo 1;
}
else
{
	$consulta = "SELECT a.`id`, a.`nombre`
	FROM actividad a
	WHERE a.`codigo` = '$codigo'";
	$result = mysqli_query($link,$consulta);
	while ($pos = mysqli_fetch_object($result))
	{
		$idActividad = $pos->id;
		$nombreActividad = $pos->nombre;
	}
	if ($idActividad == "-1") 
	{
		// Actividad incorrecta
		echo 2;
	}
	else
	{
		//Inteligencia

		//Si el codigo viene vacio (entrada/salida laboral)
		if ($codigo == "")
		{
			//Si no hay jornada
			if ($jorandaIniciada == 0) 
			{
				//Inicio la jornada
				$consulta = "UPDATE 
	  			`usuario`  	
				SET 
	  			`joranda_iniciada` = 1
				WHERE 
	  			`id` = '$idUsuario';";
	  			$result = mysqli_query($link,$consulta);

	  			//Grabo el registro con el tipo inicio
	  			$consulta = "INSERT INTO 
				`registro`
				(
				`fecha_de_registro`,
				`hora`,
				`id_usuario`,
				`id_actividad`,
				`tipo`
				) 
				VALUES (
				'$d',
				'$h',
				'$idUsuario',
				'$idActividad',
				'inicio'
				);";
				$result = mysqli_query($link,$consulta);
				echo "0:Bienvenido/a ".$nombre;
			}
			else
			{	
				//Si ya hay jornada iniciada

				//cierro la jornada
				$consulta = "UPDATE 
	  			`usuario`  	
				SET 
	  			`joranda_iniciada` = 0
				WHERE 
	  			`id` = '$idUsuario';";
	  			$result = mysqli_query($link,$consulta);
	  			//grabo el registro con el tipo fin
	  			$consulta = "INSERT INTO 
				`registro`
				(
				`fecha_de_registro`,
				`hora`,
				`id_usuario`,
				`id_actividad`,
				`tipo`
				) 
				VALUES (
				'$d',
				'$h',
				'$idUsuario',
				'$idActividad',
				'fin'
				);";
				$result = mysqli_query($link,$consulta);
				echo "0:Hasta luego! ".$nombre;
			}
		}
		//si hay un codigo
		else
		{	
			//comprobamos si el usuario tiene activa la jornada
			$consulta = "SELECT u.`joranda_iniciada`
				FROM `usuario` u
				WHERE u.`id` = '$idUsuario';";
    		$result = mysqli_query($link,$consulta);
    		$tieneJornada = 0;
  			if ($pos = mysqli_fetch_object($result))
			{
				$tieneJornada = $pos->joranda_iniciada;
			}

			//si no hay jornada, la inicio a la hora que le tocaba. (caso: viene tarde por el medico.)
			if (!$tieneJornada) 
			{
				//inicio jornada
				$consulta = "UPDATE 
	  			`usuario`  	
				SET 
	  			`joranda_iniciada` = 1
				WHERE 
	  			`id` = '$idUsuario';";
	  			$result = mysqli_query($link,$consulta);
	
				//capturo la hora a la que entraba y guardo un registro con esa hora.
				$consulta = "SELECT h.`hora_inicio`
				FROM `usuario` u JOIN `horario` h
				ON u.`id_horario` = h.id
				WHERE u.`id` = '$idUsuario';";
	    		$result = mysqli_query($link,$consulta);
	    		$horaInicioJornada = "";
	  			if ($pos = mysqli_fetch_object($result))
				{
					$horaInicioJornada = $pos->hora_inicio;
				}
	
				//hago el insert
				$consulta = "INSERT INTO 
				`registro`
				(
				`fecha_de_registro`,
				`hora`,
				`id_usuario`,
				`id_actividad`,
				`tipo`
				) 
				VALUES (
				'$d',
				'$horaInicioJornada',
				'$idUsuario',
				'1',
				'inicio'
				);";
				//var_dump($consulta);
				$result = mysqli_query($link,$consulta);
				//ahora hago un registro con el motivo del codigo.
				$consulta = "INSERT INTO 
				`registro`
				(
				`fecha_de_registro`,
				`hora`,
				`id_usuario`,
				`id_actividad`,
				`tipo`
				) 
				VALUES (
				'$d',
				'$horaInicioJornada',
				'$idUsuario',
				'$idActividad',
				'inicio'
				);";
				//var_dump($consulta);

				$result = mysqli_query($link,$consulta);
				//ahora con la hora de fin y motivo
				$consulta = "INSERT INTO 
				`registro`
				(
				`fecha_de_registro`,
				`hora`,
				`id_usuario`,
				`id_actividad`,
				`tipo`
				) 
				VALUES (
				'$d',
				'$h',
				'$idUsuario',
				'$idActividad',
				'fin'
				);";
				//var_dump($consulta);

				$result = mysqli_query($link,$consulta);
				echo "0:Inicio jornada-> ".$horaInicioJornada. " //".$horaInicioJornada."-> inicio " .$nombreActividad . " //".$h."-> fin " .$nombreActividad;
			}
			else
			{
				//averguo si la activida es de inicio o fin por dia y usuario
				$consulta = "SELECT r.`tipo`, r.`hora`
				FROM `registro` r
				WHERE r.`fecha_de_registro` = '$d' AND
				      r.`id_actividad` = '$idActividad' AND
				      r.`id_usuario` = '$idUsuario'
			    ORDER BY hora DESC
				LIMIT 1";
	    		$result = mysqli_query($link,$consulta);
  				if ($pos = mysqli_fetch_object($result))
				{
					$tipo = $pos->tipo;
					$horaInicio = $pos->hora;
				}
				else
				{
					//si ese dia no hay ninguna
					$info = "inicio";	
				}

				//invierto el tipo.
				if ( $tipo == "inicio") 
				{
					$info = "fin";	
				}
				else if( $tipo == "fin")
				{
					$info = "inicio";	
				}

				//grabo el registro con el tipo inicio/fin
	  			$consulta = "INSERT INTO 
				`registro`
				(
				`fecha_de_registro`,
				`hora`,
				`id_usuario`,
				`id_actividad`,
				`tipo`
				) 
				VALUES (
				'$d',
				'$h',
				'$idUsuario',
				'$idActividad',
				'$info'
				);";
				$result = mysqli_query($link,$consulta);

				$texto = "0:";
				
				//si el $info es de inicio 
				if ( $info == "inicio") 
				{
					$texto .= $nombreActividad. " en curso";	
				}
				else if( $info == "fin")
				{
					//como se ha acabdo esa actividad pongo el tiempo invertido
					$horai=substr($horaInicio,0,2);
					$mini=substr($horaInicio,3,2);
					$segi=substr($horaInicio,6,2);
				 
					$horaf=substr($h,0,2);
					$minf=substr($h,3,2);
					$segf=substr($h,6,2);
				 
					$ini=((($horai*60)*60)+($mini*60)+$segi);
					$fin=((($horaf*60)*60)+($minf*60)+$segf);
				 
					$dif=$fin-$ini;
				 
					$difh=floor($dif/3600);
					$difm=floor(($dif-($difh*3600))/60);
					$difs=$dif-($difm*60)-($difh*3600);
					$texto .= $nombreActividad. " duracion: ". date("H:i:s",mktime($difh,$difm,$difs));				
				}
				echo $texto;
			}
		}	
	}	
}