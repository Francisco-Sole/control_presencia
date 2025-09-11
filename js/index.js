$(document).ready(function() {
	// evento click del menu
	$("#informes").click(function(event) {
		$(this).attr("activo", "1");
		$("#empleados").attr("activo", "0");
		$("#tarjetas").attr("activo", "0");
		$("#correccion").attr("activo", "0");
		$("#horarios").attr("activo", "0");
		$("#absentismos").attr("activo", "0");

		activo($(this));
		console.info("Click en boton menu informes");
		cargarSubMenu("informes");
	});
	$("#empleados").click(function(event) {
		$(this).attr("activo", "1");
		$("#informes").attr("activo", "0");
		$("#tarjetas").attr("activo", "0");
		$("#correccion").attr("activo", "0");
		$("#horarios").attr("activo", "0");
		$("#absentismos").attr("activo", "0");

		activo($(this));
		console.info("Click en boton menu empleados");
		cargarSubMenu("empleados");
	});
	$("#tarjetas").click(function(event) {
		$(this).attr("activo", "1");
		$("#empleados").attr("activo", "0");
		$("#informes").attr("activo", "0");
		$("#correccion").attr("activo", "0");
		$("#horarios").attr("activo", "0");
		$("#absentismos").attr("activo", "0");

		activo($(this));
		console.info("Click en boton menu tarjetas");
		cargarSubMenu("tarjetas");
	});
	$("#horarios").click(function(event) {
		$(this).attr("activo", "1");
		$("#empleados").attr("activo", "0");
		$("#informes").attr("activo", "0");
		$("#correccion").attr("activo", "0");
		$("#tarjetas").attr("activo", "0");
		$("#absentismos").attr("activo", "0");

		activo($(this));
		console.info("Click en boton menu horarios");
		cargarSubMenu("horarios");
	});
	$("#correccion").click(function(event) {
		$(this).attr("activo", "1");
		$("#empleados").attr("activo", "0");
		$("#tarjetas").attr("activo", "0");
		$("#informes").attr("activo", "0");
		$("#horarios").attr("activo", "0");
		$("#absentismos").attr("activo", "0");

		activo($(this));
		console.info("Click en boton menu correccion de horarios");
		cargarSubMenuControl();
	});
	$("#absentismos").click(function(event) {
		$(this).attr("activo", "1");
		$("#empleados").attr("activo", "0");
		$("#tarjetas").attr("activo", "0");
		$("#informes").attr("activo", "0");
		$("#horarios").attr("activo", "0");
		$("#correccion").attr("activo", "0");

		activo($(this));
		console.info("Click en boton menu absentismos");
		cargarMenuAbsentismos();
		
	});

	$("#sombra").click(function(event) {
		$(this).fadeOut(400);
		$("#auxiliar").fadeOut(200);
	});
});

var __fecha = new Date();
var __diasDeLaSemana = ["Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
var __meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

var __diaHoy = __fecha.getDate();
var __mesHoy = __fecha.getMonth()+1;
var __mesDelAnyo = __meses[__fecha.getMonth()]
var __anyoHoy = __fecha.getFullYear();
var __diaSemanaHoy = __diasDeLaSemana[__fecha.getDay()];

//datos del dia 1 de ese mes.
var __datosDia1 = new Date(__fecha.getTime() - ((24 * 60 * 60 * 1000) * (__diaHoy - 1)));
//obtenemos info del dia 1.
var __diaSemanaDia1 = __datosDia1.getDay();

/*
VARIABLES GLOBALES
*/
var __arrayDiasDelMes = new Array();
var reservasDelMes = new Array();
var __arrayDiasSeleccionados = new Array();
var nombreUser;
var color;
var miId;
var DELAY = 400;
var clicks = 0; 
var timer = null;

// funciones
//funcion que carga el submenu correspondiente en funcion del click hecho.
function cargarSubMenu(tipo){
	var html = undefined;
	var temp_html = undefined;
	// estructura principal (tarjetas, empleados)
	temp_html = "<ul>";
	temp_html += "<li id='ver{%replace%}' onclick='verVer{%replace%}();'>Ver </li>";
	temp_html += "<li id='crear{%replace%}' onclick='verCrear{%replace%}();'>Crear </li>";
	temp_html += "<li id='modificar{%replace%}' onclick='verModificar{%replace%}();'>Modificar </li>";
	temp_html += "<li id='eliminar{%replace%}' onclick='verEliminar{%replace%}();'>Eliminar </li>";
	temp_html += "<li id='listar{%replace%}' onclick='verListar{%replace%}();'>Listar </li>";
	temp_html += "</ul>";
	//buscamos el tipo
	switch(tipo) {
		case 'informes':
		alert("Menu no disponible.\n En breve recibira noticias del avance.")
		break;
		case 'empleados':
		html = temp_html.replace(/{%replace%}/g, "Empleados");
		$("#submenu").html(html);
		break;
		case 'tarjetas':
		temp_html = temp_html.replace(/{%replace%}/g, "Tarjetas");
		temp_html = temp_html.replace(/Modificar/g, "Activar");
		html = temp_html;
		$("#submenu").html(html);
		$("#liEliminar").remove();
		break;
		case 'correccion':
		html = temp_html.replace(/{%replace%}/g, "Correccion");
		$("#submenu").html(html);
		break;
		case 'horarios':
		html = temp_html.replace(/{%replace%}/g, "Horarios");
		$("#submenu").html(html);
		break;
		default:
		console.info("Opcion de menu no encontrada, contacte con el administrador.");
		$("#submenu").html("");
	}
}

//funcion que marcara el click. y borra los restantes. cambia la propiedad activo.
function activo(elemento){
	//borro a todos el hover y el activo
	$("li[tipo='boton_menu']").each(function(index, el) {
		//todos tiene hover
		$(el).css({
			"background-color": "#E4ECE2"
		})
		.attr("activo", "0")
		.hover(function() {
			$(el).css({
				"background-color": "#EBDFCF"
			})
		}, function() {
			$(el).css({
				"background-color": "#E4ECE2"
			})
		});
	});
	//el solo tiene el foco (pintado)
	$(elemento).css({
		"background-color": "#EBDFCF"
	})
	.attr("activo", "1")	
	.hover(function() {
		$(elemento).css({
			"background-color": "#EBDFCF"
		})
	}, function() {
		$(elemento).css({
			"background-color": "#EBDFCF"
		})
	});	
}

//funcion que mostrara el formulario de creacion de empleados.
function verCrearEmpleados(){
	marcarSubmenu("crearEmpleados");

	var html = undefined;
	html = "<span class='cabecera'>Crear nuevo empleado</span>"
	html += "<form method='POST' onsubmit='return validaDNI( $(\"#inputDNI\").val(), \"inputDNI\" );' action='php/model/graba_empleado.php' enctype='multipart/form-data'>";
	
	html += "<div style='float:left; width:60%'>";

	html += "<div id='nombre' style='float:left;width:100%'>";
	html += "<input class='campoFormulario' id='inputNombre' name='inputNombre' type='text' required='required' placeholder='Nombre'><span style='position: relative;top: -15px;left: 5px;'>*</span>";
	html += "</div>";

	html += "<div id='apellidos' style='float:left;width:100%'>";
	html += "<input class='campoFormulario' id='inputApellido1' name='inputApellido1' type='text' required='required' placeholder='Primer apellido'><span style='position: relative;top: -15px;left: 5px;'>*</span>";
	html += "<input class='campoFormulario' id='inputApellido2' name='inputApellido2' type='text' placeholder='Segundo apellido'>";
	html += "</div>";

	html += "<div id='dni' style='float:left;width:100%'>";
	html += "<input class='campoFormulario' id='inputDNI' name='inputDNI' max-length='9' onblur='validaDNI( $(\"#inputDNI\").val(), \"inputDNI\" );' type='text' required='required' placeholder='DNI'><span style='position: relative;top: -15px;left: 5px;'>*</span>";
	html += "<span class='errorFormulario' id='infoinputDNI'</span>";
	html += "</div>";

	html += "<div id='tarjeta' style='float:left;width:100%'>";
	html += "<input class='campoFormulario' readonly='readonly' id='inputTarjeta' name='inputTarjeta' type='text' placeholder='Tarjeta...'><span style='position: relative;top: 9px;left: -35px;cursor:pointer' onclick='buscarTarjeta(\"inputTarjeta\")'><img src='img/search.png' height='30px'/></span>";
	html += "</div>";

	html += "<div id='horario' style='float:left;width:100%'>";
	html += "<input class='campoFormulario' id='inputHorario' readonly='readonly' name='inputHorario' type='text' placeholder='Horario...'><span style='position: relative;top: -15px;left: 5px;'>*</span><span style='position: relative;top: 9px;left: -43px; cursor:pointer' onclick='buscarHorario(\"inputHorario\")'><img src='img/search.png' height='30px'/></span>";
	html += "</div>";

	html += "<div id='botonFormulario' style='float:left;width:100%'>";
	html += "<input class='botonFormulario' id='botonSubmit' type='submit' value='Guardar'>";
	html += "</div>";

	html += "<div id='infoFormulario' style='float:left;width:100%'>";
	html += "<span style='position: relative;top: 55px;' class='infoFormulario'>* Campos obligatorios.</span>";
	html += "</div>";
	
	html += "</div>";

	html += "<div id='foto' style='float:left;width:40%'>";
	html += "<span style='float: left;width: 100%;font-family: cuerpo;margin-bottom: 20px;float:left'>Foto</span>";
	html += "<input id='inputFoto' name='inputFoto' type='file' placeholder='Seleccione una imagen' style='float:left'>";
	html += "</div>";

	

	html += "</form>";

	$("#contenedorPrincipal").html(html);
	$("#inputFoto").change(function () {
		filePreview(this);
	});
}

//funcion que carga un preview de la imagen seleccionada.
function filePreview(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) {
			$('#inputFoto + img').remove();
			$('#inputFoto').after('<img style="margin-top:15px;" src="'+e.target.result+'" height="250"/>');
		}
		reader.readAsDataURL(input.files[0]);
	}
}

//funcion que valida el DNI
function validaDNI(dni, campo) {
	var numero
	var letr
	var letra
	var expresion_regular_dni
	var bool = false;

	expresion_regular_dni = /^\d{8}[a-zA-Z]$/;

	if(expresion_regular_dni.test (dni) == true){
		numero = dni.substr(0,dni.length-1);
		letr = dni.substr(dni.length-1,1);
		numero = numero % 23;
		letra='TRWAGMYFPDXBNJZSQVHLCKET';
		letra=letra.substring(numero,numero+1);
		if (letra!=letr.toUpperCase()) {
			$("#info"+campo).html("Dni invalido.");
			bool = false;
		}else{
			$("#info"+campo).html("Dni correcto.")
			.css('color', '#9AA381');
			bool = true;
		}
	}else{
		$("#info"+campo).html("Formato no válido.");
		bool = false;
	}
	return bool;
}

//funcion que mostrara popup
function aviso(msg, tipo){
	console.log(msg);
	console.log(tipo);

	switch (tipo)
	{
		//error
		case 0:
		$("#divinfo").html(msg)
		.addClass('error')
		.css('padding', '60px');

		break;

		//info
		case 1:
		$("#divinfo").html(msg)
		.addClass('info')
		.css('padding', '60px');

		setTimeout(function(){
			$("#divinfo").fadeOut(400);
			console.log("lo quito");
		}, 3000);

		break;

		default:
	}
}

function verificaModificacion(){
	// if () {}
}

function marcarSubmenu(submenu){
	//los desmarcamos todos
	$("#submenu ul li").css({
		"background-color": "#D4ACA9"
	})

	$("#"+ submenu).css({
		"background-color": "#EBDFCF"
	})

}
//#47644E, #D4ACA9, #EBDFCF, #E4ECE2, #AEE8EA
//funcion que permitira editar informacion de un empleado.
function verModificarEmpleados(){
	marcarSubmenu("modificarEmpleados");
	data = {};
	$.ajax({
		data:  data,
		url:   'php/controller/ver_datos_modificar.php',
		type:  'post',
		success:  function (response) {
			activaSombra();
			pintaAuxiliar(response);
		}
	});
}

//funcion para que se vea la sombra
function activaSombra(){
	$("#sombra").css({
		"position": "fixed",
		"width": '100vw',
		"height": '100vh',
		"background-color" : "rgba(0,0,0,0.3)",
		"top": "0"
	})
	.show();
	console.log("Pongo sombra");
}

//funcion que pintara un pop up con 'datos'
function pintaAuxiliar(datos){
	
	$("#auxiliar")
	.html(datos)
	.show();
	$("#auxiliar").css({
		"position": "fixed",
		"overflow": 'auto',
		"max-height": '50vh',
		"border": "1px solid black",
		"background-color": "#D4ACA9",
		"padding": "15px"
	})
	$("#tablaSeleccionEmpleados").DataTable();
	$("#tablaSeleccionTajetaLibre").DataTable();
	$("#tablaSeleccionHorarios").DataTable();
	$("#tablaBusquedaUsuarioBorrar").DataTable();
	$("#tablaVerTodasTarjetas").DataTable();
	$("#tablaVerTodosHorarios").DataTable();
	$("#tablaSeleccionEmpleadosModificar").DataTable();

	var tamano = $("#auxiliar").css('width');
	$("#auxiliar").css({
		"left": "calc( 50% - ("+tamano+" / 2 ))"
	});
	
	console.log("Pongo datos");
}

//funcion que manda el formulario y recibe respuestta.
function buscaDatos(idFormulario){
	//comprobar aqui si se clicko un empleado anteriormente.
	if (idFormulario == "formularioEliminar") {
		$.ajax({
			data:  $("#"+idFormulario).serialize(),
			url:   'php/controller/busca_datos_del.php',
			type:  'post',
			success:  function (response) {
				activaSombra();
				pintaAuxiliar(response);
			}
		});
	}
	else
	{
		$.ajax({
			data:  $("#"+idFormulario).serialize(),
			url:   'php/controller/busca_datos.php',
			type:  'post',
			success:  function (response) {
				activaSombra();
				pintaAuxiliar(response);
			}
		});
	}
	
}

//funcion que se dispara cuando se clicka en un empleado de la lista.
//carga informacion de la base de datos con param (id) y la proyecta.
function seleccionarEmpleado(params,formulario){
	$("#sombra").fadeOut(400);
	$("#auxiliar").fadeOut(200);
	if (formulario == "formularioEliminar") {
		$("#"+formulario).find("input[type='button']")
		.attr("funcion", "eliminar")
		.attr("value", "Eliminar")
		.attr("onclick", "EliminarEmpleado('" + formulario + "')");
		//cargar los datos en el formulario
		var datas = {"id": params};
		$.ajax({
			data:  datas,
			url:   'php/model/selecciona_empleado.php',
			type:  'post',
			success:  function (response) {	
				//llenamos los datos.
				$("#"+formulario).find("input[id='inputNombre']").val(response[0][1]);
				$("#"+formulario).find("input[id='inputApellido1']").val(response[0][2]);
				$("#"+formulario).find("input[id='inputApellido2']").val(response[0][3]);
				$("#"+formulario).find("input[id='inputDNI']").val(response[0][4]);
				$("#"+formulario).find("input[id='inputTarjeta']").val(response[0][6]);
				$("#"+formulario).find("input[id='inputHorario']").val(response[0][7])
				.append("<input type='hidden' id='inputId' name='inputId' value='" + response[0][0] + "'/>");
				$("#"+formulario).find("input[id='inputFoto']")
				.after("<img style='margin-top:15px;' src='data:image/png;base64," + response[0][5] + "' height='250px;'/>");
			}, dataType: 'JSON'
		});
	}
	else
	{
		$("#"+formulario).find("input[type='button']")
		.attr("funcion", "modificar")
		.attr("value", "Modificar")
		.attr("onclick", "modificarEmpleado('"+formulario+"')");
		//cargar los datos en el formulario
		var datas = {"id": params};
		$.ajax({
			data:  datas,
			url:   'php/model/selecciona_empleado.php',
			type:  'post',
			success:  function (response) {	
				//llenamos los datos.
				console.log(response[0][1]); 
				
				$("#"+formulario).find("input[id='inputNombre']").val(response[0][1]);
				$("#"+formulario).find("input[id='inputApellido1']").val(response[0][2]);
				$("#"+formulario).find("input[id='inputApellido2']").val(response[0][3]);
				$("#"+formulario).find("input[id='inputDNI']").val(response[0][4]);
				$("#"+formulario).find("input[id='inputTarjeta']").val(response[0][6]);
				$("#"+formulario).find("input[id='inputHorario']").val(response[0][7])
				.append("<input type='hidden' id='inputId' name='inputId' value='" + response[0][0] + "'/>");
				$("#"+formulario).find("input[id='inputFoto']")
				.after("<img style='margin-top:15px;' src='data:image/png;base64," + response[0][5] + "' height='250px;'/>");
			}, dataType: 'JSON'
		});
	}

}

//OJO LINK///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function modificarEmpleado(idFormulario){
	
	var formData = new FormData($("#inputFoto").val());
	console.log(formData);
	$.ajax({
		data:  formData,
		url:   'php/model/modifica_empleado.php',
		type:  'post',
		success:  function (response) {
			//console.log(response);
			//window.location.href = "index.php?update='" + response;
		}
	});
}


function verEliminarEmpleados(){
	marcarSubmenu("eliminarEmpleados");
	var html = undefined;
	html = "<span class='cabecera'>Eliminar empleado</span>"
	
	html += "<form method='POST' id='formularioEliminar' enctype='multipart/form-data'>";
	
	html += "<div style='float:left; width:60%'>";

	html += "<div id='nombre' style='float:left;width:100%'>";
	html += "<input class='campoFormulario' id='inputNombre' name='inputNombre' type='text' placeholder='Nombre'><span style='position: relative;top: -15px;left: 5px;'>&nbsp</span>";
	html += "</div>";

	html += "<div id='apellidos' style='float:left;width:100%'>";
	html += "<input class='campoFormulario' id='inputApellido1' name='inputApellido1' type='text' placeholder='Primer apellido'><span style='position: relative;top: -15px;left: 5px;'>&nbsp</span>";
	html += "<input class='campoFormulario' id='inputApellido2' name='inputApellido2' type='text' placeholder='Segundo apellido'>";
	html += "</div>";

	html += "<div id='dni' style='float:left;width:100%'>";
	html += "<input class='campoFormulario' id='inputDNI' name='inputDNI' max-length='9' onblur='validaDNI( $(\"#inputDNI\").val(), \"inputDNI\" );' type='text' placeholder='DNI'><span style='position: relative;top: -15px;left: 5px;'>&nbsp</span>";
	html += "<span class='errorFormulario' id='infoinputDNI'</span>";
	html += "</div>";

	html += "<div id='tarjeta' style='float:left;width:100%'>";
	html += "<input class='campoFormulario' id='inputTarjeta' name='inputTarjeta' type='text' placeholder='Tarjeta...'><span style='position: relative;top: 9px;left: -35px;cursor:pointer' onclick='buscarTarjeta(\"inputTarjeta\")'><img src='img/search.png' height='30px'/></span>";
	html += "</div>";

	html += "<div id='horario' style='float:left;width:100%'>";
	html += "<input class='campoFormulario' id='inputHorario' name='inputHorario' type='text' placeholder='Horario...'><span style='position: relative;top: 9px;left: -35px; cursor:pointer' onclick='buscarHorario(\"inputHorario\")'><img src='img/search.png' height='30px'/></span>";
	html += "</div>";

	html += "<div id='botonFormulario' style='float:left;width:100%'>";
	html += "<input class='botonFormulario' id='botonSubmit' type='button' funcion='busqueda' onclick='buscaDatos(\"formularioEliminar\")' value='Buscar'>";
	html += "</div>";

	html += "<div id='infoFormulario' style='float:left;width:100%'>";
	
	html += "</div>";
	
	html += "</div>";

	html += "<div id='foto' style='float:left;width:40%; float:left'>";
	html += "<span style='float: left;width: 100%;font-family: cuerpo;margin-bottom: 5px;float:left'>Foto</span>";
	html += "<input id='inputFoto' name='inputFoto' type='file' placeholder='Seleccione una imagen' style='float:left'>";
	html += "</div>";

	html += "</form>";

	$("#contenedorPrincipal").html(html);
	$("#inputFoto").change(function () {
		filePreview(this);
	});
}


//funcion que marca un empleado como borrado
function EliminarEmpleado(formulario){
	console.log("Borro empleado");
	//cojo la id que borraremos.
	var id = $("#"+formulario).find("input[id='inputId']").val();
	var data = {"id":id};
	$.ajax({
		data:  data,
		url:   'php/model/elimina_empleado.php',
		type:  'post',
		success:  function (response) {
			//console.log(response);
			window.location.href = "index.php?del='" + response;
		}
	});
}


//funcion que permitira ver la lista de los empleados actuales.
function verListarEmpleados(){
	window.open('php/model/busca_datos_todos.php', "_blank");	
}

//funcion que mostrara el formulario para crear tarjetas.
function verCrearTarjetas (){
	marcarSubmenu("crearTarjetas");
	var html = undefined;
	html = "<span class='cabecera'>Crear nueva tarjeta</span>"
	html += "<form method='POST' action='php/model/graba_tarjeta.php' enctype='multipart/form-data'>";
	
	html += "<div style='float:left; width:100%'>";

	html += "<div id='codigo' style='float:left;width:100%'>";
	html += "<input class='campoFormulario' id='inputCodigo' name='inputCodigo' type='text' required='required' placeholder='Codigo de tarjeta'><span style='position: relative;top: -15px;left: 5px;'>*</span>";
	html += "</div>";

	html += "<div id='botonFormulario' style='float:left;width:100%'>";
	html += "<input class='botonFormulario' id='botonSubmit' type='submit' value='Guardar'>";
	html += "</div>";

	html += "<div id='infoFormulario' style='float:left;width:100%'>";
	html += "<span style='position: relative;top: 55px;' class='infoFormulario'>* Campos obligatorios.</span>";
	html += "</div>";

	html += "</div>";

	html += "</form>";

	$("#contenedorPrincipal").html(html);	
}

function verActivarTarjetas(){
	marcarSubmenu("modificarTarjetas");
	$.ajax({
		url:   'php/controller/dame_tarjetas.php',
		type:  'post',
		success:  function (response) {
			console.log("cargo lista de tarjetas");
			$("#contenedorPrincipal").html(response);	
			$("#tablaActivaTarjetas").DataTable();
		}
	});
}


//funcion que cambia el estado de las tarjetas.
function cambiarEstado(id){
	var data = {"id": id};
	$.ajax({
		url:   'php/model/cambia_estado_tarjetas.php',
		type:  'post',
		data: data,
		success:  function (response) {
			console.log("cambio estado de tarjeta");
		}
	});
}


function verListarTarjetas (){
	window.open('php/model/busca_datos_todos_tarjetas.php', "_blank");	
}

function verCrearHorarios (){
	marcarSubmenu("crearHorarios");

	var html = undefined;
	html = "<span class='cabecera'>Crear nuevo horario</span>"
	html += "<form method='POST' action='php/model/graba_horario.php' enctype='multipart/form-data'>";
	
	html += "<div style='float:left; width:60%'>";

	html += "<div id='nombre' style='float:left;width:100%'>";
	html += "<input class='campoFormulario' id='inputNombreHorario' name='inputNombreHorario' type='text' required='required' placeholder='Nombre de horario'><span style='position: relative;top: -15px;left: 5px;'>*</span>";
	html += "</div>";

	html += "<div id='horas' style='float:left;width:100%'>";
	html += "<input class='campoFormulario' id='inputHoraInicio' name='inputHoraInicio' type='time' required='required' placeholder='Hora inicio'><span style='position: relative;top: -15px;left: 5px;'>*</span>";
	html += "<input class='campoFormulario' id='inputHoraFin' name='inputHoraFin' type='time' required='required' placeholder='Hora fin'><span style='position: relative;top: -15px;left: 5px;'>*</span>";
	html += "</div>";

	html += "<div id='botonFormulario' style='float:left;width:100%'>";
	html += "<input class='botonFormulario' id='botonSubmit' type='submit' value='Guardar'>";
	html += "</div>";

	html += "<div id='infoFormulario' style='float:left;width:100%'>";
	html += "<span style='position: relative;top: 55px;' class='infoFormulario'>* Campos obligatorios.</span>";
	html += "</div>";
	
	html += "</div>";

	html += "</form>";

	$("#contenedorPrincipal").html(html);
	$("#inputFoto").change(function () {
		filePreview(this);
	});
}

function verModificarHorarios (){
	marcarSubmenu("modificarHorarios");

	$.ajax({
		url:   'php/controller/dame_horarios.php',
		type:  'post',
		success:  function (response) {
			console.log("cargo lista de horarios modificables");
			$("#contenedorPrincipal").html(response);
			$("#tablaTodosHorariosModificables").DataTable();
		}
	});
}

function actualizaHorario(id){
	var data = {"id": id, "horaInicio": $("#horaInicio"+id).val(), "horaFin":$("#horaFin"+id).val(), "nombre": $("#nombreHorario"+id).val()};
	$.ajax({
		url:   'php/model/cambia_horas_horarios.php',
		type:  'post',
		data: data,
		success:  function (response) {
			console.log("cambio horarios");
		}
	});
}

function verEliminarHorarios(){
	marcarSubmenu("eliminarHorarios");
	$.ajax({
		url:   'php/model/elimina_horarios.php',
		type:  'post',
		success:  function (response) {
			console.log("cargo lista de horarios borrables");
			$("#contenedorPrincipal").html(response);
			$("#tablaHorariosEliminar").DataTable();
		}
	});
}

function verEliminarTarjetas(){
	marcarSubmenu("eliminarTarjetas");
	$.ajax({
		url:   'php/model/elimina_tarjetas.php',
		type:  'post',
		success:  function (response) {
			console.log("cargo lista de tarjetas borrables");
			$("#contenedorPrincipal").html(response);
			$("#tablaTarjetasEliminar").DataTable();
		}
	});
}

function borrarHorario(id){
	var data = {"id": id};
	$.ajax({
		url:   'php/model/del_horario.php',
		type:  'post',
		data: data,
		success:  function (response) {
			console.log("borro horario");
			verEliminarHorarios();
		}
	});
}

function borrarTarjeta(id){
	var data = {"id": id};
	$.ajax({
		url:   'php/model/del_horario.php',
		type:  'post',
		data: data,
		success:  function (response) {
			console.log("borro tarjeta");
			verEliminarTarjetas();
		}
	});
}


function verListarHorarios(){
	window.open('php/model/busca_datos_todos_horarios.php', "_blank");	
}

function buscarTarjeta (){
	$.ajax({
		url:   'php/controller/busca_tarjetas_libres.php',
		type:  'post',
		success:  function (response) {
			activaSombra();
			pintaAuxiliar(response);
		}
	});
}

function seleccionarTarjeta (id, form){
	$("#sombra").fadeOut(400);
	$("#auxiliar").fadeOut(200);
	$("#inputTarjeta").val(id);
}

function buscarHorario (){
	$.ajax({
		url:   'php/controller/busca_horarios.php',
		type:  'post',
		success:  function (response) {
			activaSombra();
			pintaAuxiliar(response);
		}
	});
}

function seleccionarHorario(id, form){
	$("#sombra").fadeOut(400);
	$("#auxiliar").fadeOut(200);
	$("#inputHorario").val(id);	
}

function cargarSubMenuControl(){
	$.ajax({
		url:   'php/model/dame_registros.php',
		type:  'post',
		success:  function (response) {
			$("#contenedorPrincipal").html(response);
			$('#tablaRegistros').DataTable({
				"scrollY":        "333px",
				"scrollCollapse": true
			});
			$("input[type='search']").addClass('campoFormulario');
			//$("#tablaRegistros_length").addClass('campoFormulario');

		}
	});
}

function seleccionarEmpleadoVerAbsentismo(datos){
	$("#sombra").fadeOut(400);
	$("#auxiliar").fadeOut(200);

	var html = "";

	html += "<div id='nombre' style='float:left; margin-bottom: 25px'>";
	html += "<input id='inputid' name='inputid' type='hidden' value='"+datos.id+"' readonly>";
	html += "<input class='campoFormulario' id='inputNombre' name='inputNombre' type='text' placeholder='Nombre' value='"+datos.nombre+"' readonly>";
	html += "</div>";

	html += "<div id='apellidos' style='float:left'>";
	html += "<input class='campoFormulario' id='inputApellido1' name='inputApellido1' type='text' placeholder='Primer apellido' value='"+datos.apellido1+"' readonly>";
	html += "<input class='campoFormulario' id='inputApellido2' name='inputApellido2' type='text' placeholder='Segundo apellido' value='"+datos.apellido2+"' readonly>";
	html += "</div>";

	html += "<div id='dni' style='float:left'>";
	html += "<input class='campoFormulario' id='inputDNI' name='inputDNI' max-length='9' type='text' placeholder='DNI' value='"+datos.dni+"' readonly>";
	html += "<span class='errorFormulario' id='infoinputDNI'</span>";
	html += "</div>";

	html += "<div id='tarjeta' style='float:left;'>";
	html += "<input class='campoFormulario' id='inputTarjeta' name='inputTarjeta' type='text' placeholder='Tarjeta...' value='"+datos.codigo+"' readonly>";
	html += "</div>";

	html += "<div id='horario' style='float:left;'>";
	html += "<input class='campoFormulario' id='inputHorario' name='inputHorario' type='text' placeholder='Horario...' value='"+datos.nomhorario+"' readonly>";
	html += "</div>";
	$("#datosEmpleado").html(html);

	var param = {"id": datos.id};
	$.ajax({
		url: 'php/controller/dame_registros_usuario.php',
		type: 'POST',
		data: param,
		success: function (data) {
			for (var i = 0; i < data.length; i++) {
				marcarEnCalendario(data[i].fecha_de_registro.split(" ")[0], data[i].nombre);
			}
		},
		dataType : 'JSON'
	});

}

function marcarEnCalendario(fechaAM, nombre){
	var anyo = fechaAM.split("-")[0];
	var mes = fechaAM.split("-")[1];
	var dia = fechaAM.split("-")[2];
	$("#tablaCalendario tr td[anyo="+anyo+"][mes="+(mes-1)+"][dia="+dia+"]").append("<div id='absentismo_"+nombre+"' class='redondo' style='height:20px;border-radius: 50px / 50px;float:left;text-align: center;padding-left: 25px;padding-right: 25px; background-color:pink'>"+nombre.toUpperCase()+"</div>");
}

function cargarMenuAbsentismos(){
	$("#submenu").hide();
	var  html = "<div id='datosEmpleado' style='width: 100%;'></div><div id='absentismos' style='float:left;width:99.5%; margin-left:5px;'>";
	html += "<select class='campoFormulario' id='selectMesTexto' style='margin-left:0px;'>";
	html += "<option value='0'>Enero</option>";
	html += "<option value='1'>Febrero</option>";
	html += "<option value='2'>Marzo</option>";
	html += "<option value='3'>Abril</option>";
	html += "<option value='4'>Mayo</option>";
	html += "<option value='5'>Junio</option>";
	html += "<option value='6'>Julio</option>";
	html += "<option value='7'>Agosto</option>";
	html += "<option value='8'>Septiembre</option>";
	html += "<option value='9'>Octubre</option>";
	html += "<option value='10'>Noviembre</option>";
	html += "<option value='11'>Diciembre</option>";
	html += "</select>";

	html += "<input type='number' id='anyoVisible' min='2014' step='1' class='campoFormulario'>";

	html += "<table style='background-color:white; color: black;' id='tablaCalendario' border='1px'>";
	html += "<tr id='fila0' class='diasSemana'>";
	html += "<th id=th0></th>";
	html += "<th id=th1></th>";
	html += "<th id=th2></th>";
	html += "<th id=th3></th>";
	html += "<th id=th4></th>";
	html += "<th id=th5></th>";
	html += "<th id=th6></th>";
	html += "</tr>";
	html += "<tr id='fila1'>";
	html += "<td valign='top' id=td-1-1></td>";
	html += "<td valign='top' id=td-1-2></td>";
	html += "<td valign='top' id=td-1-3></td>";
	html += "<td valign='top' id=td-1-4></td>";
	html += "<td valign='top' id=td-1-5></td>";
	html += "<td valign='top' id=td-1-6></td>";
	html += "<td valign='top' id=td-1-0></td>";
	html += "<tr id='fila2'>";
	html += "<td valign='top' id=td-2-1></td>";
	html += "<td valign='top' id=td-2-2></td>";
	html += "<td valign='top' id=td-2-3></td>";
	html += "<td valign='top' id=td-2-4></td>";
	html += "<td valign='top' id=td-2-5></td>";
	html += "<td valign='top' id=td-2-6></td>";
	html += "<td valign='top' id=td-2-0></td>";
	html += "</tr>";
	html += "<tr id='fila3'> ";
	html += "<td valign='top' id=td-3-1></td>";
	html += "<td valign='top' id=td-3-2></td>";
	html += "<td valign='top' id=td-3-3></td>";
	html += "<td valign='top' id=td-3-4></td>";
	html += "<td valign='top' id=td-3-5></td>";
	html += "<td valign='top' id=td-3-6></td>";
	html += "<td valign='top' id=td-3-0></td>";
	html += "</tr>";
	html += "<tr id='fila4'>";
	html += "<td valign='top' id=td-4-1></td>";
	html += "<td valign='top' id=td-4-2></td>";
	html += "<td valign='top' id=td-4-3></td>";
	html += "<td valign='top' id=td-4-4></td>";
	html += "<td valign='top' id=td-4-5></td>";
	html += "<td valign='top' id=td-4-6></td>";
	html += "<td valign='top' id=td-4-0></td>";
	html += "</tr>";
	html += "<tr id='fila5'>";
	html += "<td valign='top' id=td-5-1></td>";
	html += "<td valign='top' id=td-5-2></td>";
	html += "<td valign='top' id=td-5-3></td>";
	html += "<td valign='top' id=td-5-4></td>";
	html += "<td valign='top' id=td-5-5></td>";
	html += "<td valign='top' id=td-5-6></td>";
	html += "<td valign='top' id=td-5-0></td>";
	html += "</tr>";
	html += "<tr id='fila6'>";
	html += "<td valign='top' id=td-6-1></td>";
	html += "<td valign='top' id=td-6-2></td>";
	html += "<td valign='top' id=td-6-3></td>";
	html += "<td valign='top' id=td-6-4></td>";
	html += "<td valign='top' id=td-6-5></td>";
	html += "<td valign='top' id=td-6-6></td>";
	html += "<td valign='top' id=td-6-0></td>";
	html += "</tr>";
	html += "</table>";
	html += "</div>";

	html += "<div style='width: 10%;float: left;margin-top: 5%;margin-left: 0%;'  >";
	html += "<select id='tipoAbsentismo' class='campoFormulario'>";
	html += "<option id='1'>Vacaciones</option>";
	html += "<option id='2'>Permiso</option>";
	html += "<option id='3'>Baja</option>";
	html += "</select>";
	html += "<input type='button' class='botonFormulario' value='Guardar' style='width: 189px;' onclick='guardarAbsentismo();'/>";

	html += "</div>";
	
	html += "</form>";
	
	$("#contenedorPrincipal").html(html);
	
	$.ajax({
		url: 'php/controller/dame_actividad.php',
		type: 'POST',
		success: function (data) {
			//blanqueamos
			$("#tipoAbsentismo").html("");
			for (var i=0; i < data.length; i++) {
				$("#tipoAbsentismo").append('<option value="'+data[i].id+ "_"+i +'">'+data[i].nombre+'</option>')
			}
		},
		dataType : 'JSON'
	});

	$("#inputFoto").change(function () {
		filePreview(this);
	});

	__diaHoy = __fecha.getDate();
	__mesHoy = __fecha.getMonth()+1;
	__mesDelAnyo = __meses[__fecha.getMonth()]
	__anyoHoy = __fecha.getFullYear();
	__diaSemanaHoy = __diasDeLaSemana[__fecha.getDay()];

	//datos del dia 1 de ese mes.
	__datosDia1 = new Date(__fecha.getTime() - ((24 * 60 * 60 * 1000) * (__diaHoy - 1)));
	//obtenemos info del dia 1.
	__diaSemanaDia1 = __datosDia1.getDay();
	//asigno valor al input de fecha.
	$("#anyoVisible").val(__anyoHoy);

	//asigno valor al select.
	$("#selectMesTexto").val(__mesHoy-1);
	
	//comportamiento change del input mes.
	$("#selectMesTexto").bind({
		change:function(event){
			var mes = $(this).val();
			__datosDia1.setMonth(mes);
			__datosDia1.setFullYear($("#anyoVisible").val());
			pintaCalendario('limpia');
			resetArrayDiasSeleccionados();
		}
	});

	//comportamiento change del input año.
	$("#anyoVisible").bind({
		change: function (event){
			var anyo = $(this).val();
			__datosDia1.setFullYear(anyo);
			__datosDia1.setMonth($("#selectMesTexto").val());
			pintaCalendario('limpia');	
			resetArrayDiasSeleccionados();
		}
	});
	pintaCalendario()

	data = {};
	$.ajax({
		data:  data,
		url:   'php/controller/ver_datos_empleados_absentismos.php',
		type:  'post',
		success:  function (response) {
			activaSombra();
			pintaAuxiliar(response);
		}, dataType: 'html'
	});
}



function borrarRegistro (id){
	var data = {"id":id};
	$.ajax({
		url:   'php/model/borra_registro.php',
		type:  'post',
		data: data,
		success:  function (response) {
			cargarSubMenuControl();
			cargarSubMenu("");
		}
	});
}

function verVerEmpleados(){
	data = {};
	$.ajax({
		data:  data,
		url:   'php/controller/ver_datos.php',
		type:  'post',
		success:  function (response) {
			marcarSubmenu("verEmpleados");
			activaSombra();
			pintaAuxiliar(response);
		}
	});
}

function seleccionarEmpleadoVer(id){
	$("#sombra").fadeOut(400);
	$("#auxiliar").fadeOut(200);
	var html = undefined;
	html = "<span class='cabecera'>Ver empleado</span>"
	
	html = "<form method='POST' id='formularioVer' enctype='multipart/form-data'>";
	
	html += "<div style='float:left; width:60%'>";

	html += "<div id='nombre' style='float:left;width:100%'>";
	html += "<input class='campoFormulario' id='inputNombre' name='inputNombre' readonly='readonly' type='text' placeholder='Nombre'><span style='position: relative;top: -15px;left: 5px;'>&nbsp</span>";
	html += "</div>";

	html += "<div id='apellidos' style='float:left;width:100%'>";
	html += "<input class='campoFormulario' id='inputApellido1' name='inputApellido1' readonly='readonly' type='text' placeholder='Primer apellido'><span style='position: relative;top: -15px;left: 5px;'>&nbsp</span>";
	html += "<input class='campoFormulario' id='inputApellido2' name='inputApellido2' readonly='readonly' type='text' placeholder='Segundo apellido'>";
	html += "</div>";

	html += "<div id='dni' style='float:left;width:100%'>";
	html += "<input class='campoFormulario' id='inputDNI' name='inputDNI' readonly='readonly' max-length='9' onblur='validaDNI( $(\"#inputDNI\").val(), \"inputDNI\" );' type='text' placeholder='DNI'><span style='position: relative;top: -15px;left: 5px;'>&nbsp</span>";
	html += "<span class='errorFormulario' id='infoinputDNI'</span>";
	html += "</div>";

	html += "<div id='tarjeta' style='float:left;width:100%'>";
	html += "<input class='campoFormulario' id='inputTarjeta' name='inputTarjeta' readonly='readonly' type='text' placeholder='Tarjeta...'><span style='position: relative;top: 9px;left: -35px;cursor:pointer'><img src='img/search.png' height='30px'/></span>";
	html += "</div>";

	html += "<div id='horario' style='float:left;width:100%'>";
	html += "<input class='campoFormulario' id='inputHorario' name='inputHorario' readonly='readonly' type='text' placeholder='Horario...'><span style='position: relative;top: 9px;left: -35px; cursor:pointer'><img src='img/search.png' height='30px'/></span>";
	html += "</div>";

	html += "<div id='infoFormulario' style='float:left;width:100%'>";
	
	html += "</div>";
	
	html += "</div>";

	html += "<div id='foto' style='float:left;width:40%'>";
	html += "<span style='float: left;width: 100%;font-family: cuerpo;margin-bottom: 20px;float:left'>Foto</span>";
	html += "<input id='inputFoto' disabled='disabled' name='inputFoto' type='file' placeholder='Seleccione una imagen' style='float:left'>";
	html += "</div>";

	html += "</form>";

	$("#contenedorPrincipal").html(html);
	$("#inputFoto").change(function () {
		filePreview(this);
	});
	
	var data = {"id": id};
	$.ajax({
		data:  data,
		url:   'php/model/selecciona_empleado.php',
		type:  'post',
		success:  function (response) {	
			//llenamos los datos.
			console.log(response[0][1]); 

			$("#inputNombre").val(response[0][1]);
			$("#formularioVer").find("input[id='inputApellido1']").val(response[0][2]);
			$("#formularioVer").find("input[id='inputApellido2']").val(response[0][3]);
			$("#formularioVer").find("input[id='inputDNI']").val(response[0][4]);
			$("#formularioVer").find("input[id='inputTarjeta']").val(response[0][6]);
			$("#formularioVer").find("input[id='inputHorario']").val(response[0][7])
			.append("<input type='hidden' id='inputId' name='inputId' value='" + response[0][0] + "'/>");
			$("#formularioVer").find("input[id='inputFoto']")
			.after("<img style='margin-top:15px;' src='data:image/png;base64," + response[0][5] + "' height='250px;'/>");
		}, dataType: 'JSON'
	});
}

function seleccionarEmpleadoModificar(id){
	$("#sombra").fadeOut(400);
	$("#auxiliar").fadeOut(200);
	var html = undefined;
	html = "<span class='cabecera'>Ver empleado</span>"
	
	html = "<form method='POST' id='formularioVer' enctype='multipart/form-data' action='php/model/modifica_empleado.php'>";
	
	html += "<div style='float:left; width:60%'>";

	html += "<div id='nombre' style='float:left;width:100%'>";
	html += "<input class='campoFormulario' id='inputNombre' name='inputNombre' type='text' placeholder='Nombre'><span style='position: relative;top: -15px;left: 5px;'>&nbsp</span>";
	html += "</div>";

	html += "<div id='apellidos' style='float:left;width:100%'>";
	html += "<input class='campoFormulario' id='inputApellido1' name='inputApellido1'  type='text' placeholder='Primer apellido'><span style='position: relative;top: -15px;left: 5px;'>&nbsp</span>";
	html += "<input class='campoFormulario' id='inputApellido2' name='inputApellido2'  type='text' placeholder='Segundo apellido'>";
	html += "</div>";

	html += "<div id='dni' style='float:left;width:100%'>";
	html += "<input class='campoFormulario' id='inputDNI' name='inputDNI'  max-length='9' onblur='validaDNI( $(\"#inputDNI\").val(), \"inputDNI\" );' type='text' placeholder='DNI'><span style='position: relative;top: -15px;left: 5px;'>&nbsp</span>";
	html += "<span class='errorFormulario' id='infoinputDNI'</span>";
	html += "</div>";

	html += "<div id='tarjeta' style='float:left;width:100%'>";
	html += "<input class='campoFormulario' id='inputTarjeta' name='inputTarjeta' type='text' placeholder='Tarjeta...'><span style='position: relative;top: 9px;left: -35px;cursor:pointer'><img src='img/search.png' height='30px'/></span>";
	html += "</div>";

	html += "<div id='horario' style='float:left;width:100%'>";
	html += "<input class='campoFormulario' id='inputHorario' name='inputHorario' type='text' placeholder='Horario...'><span style='position: relative;top: 9px;left: -35px; cursor:pointer'><img src='img/search.png' height='30px'/></span>";
	html += "</div>";

	html += "<div id='infoFormulario' style='float:left;width:100%'>";
	
	html += "</div>";
	
	html += "</div>";

	html += "<div id='foto' style='float:left;width:40%'>";
	html += "<span style='float: left;width: 100%;font-family: cuerpo;margin-bottom: 20px;float:left'>Foto</span>";
	html += "<input id='inputFoto' name='inputFoto' type='file' placeholder='Seleccione una imagen' style='float:left'>";
	html += "</div>";

	html += "<div style='float:left; width: 100%;'> <input type='submit' name='editaEmpleado' value='Guardar cambios'></div>";
	html += "</form>";

	$("#contenedorPrincipal").html(html);
	$("#inputFoto").change(function () {
		filePreview(this);
	});
	
	var data = {"id": id};
	$.ajax({
		data:  data,
		url:   'php/model/selecciona_empleado.php',
		type:  'post',
		success:  function (response) {	
			//llenamos los datos.
			console.log(response[0][1]); 

			$("#inputNombre").val(response[0][1]);
			$("#formularioVer").find("input[id='inputApellido1']").val(response[0][2]);
			$("#formularioVer").find("input[id='inputApellido2']").val(response[0][3]);
			$("#formularioVer").find("input[id='inputDNI']").val(response[0][4]);
			$("#formularioVer").find("input[id='inputTarjeta']").val(response[0][6]);
			$("#formularioVer").find("input[id='inputHorario']").val(response[0][7])
			.append("<input type='hidden' id='inputId' name='inputId' value='" + response[0][0] + "'/>");
			$("#formularioVer").find("input[id='inputFoto']")
			.after("<img style='margin-top:15px;' src='data:image/png;base64," + response[0][5] + "' height='250px;'/>");
		}, dataType: 'JSON'
	});
}

function verVerTarjetas (){
	$.ajax({
		url:   'php/controller/ver_datos_tarjetas.php',
		type:  'post',
		success:  function (response) {
			activaSombra();
			pintaAuxiliar(response);
		}
	});
}

function verVerHorarios (){
	$.ajax({
		url:   'php/controller/ver_datos_horarios.php',
		type:  'post',
		success:  function (response) {
			activaSombra();
			pintaAuxiliar(response);
		}
	});	
}

/*
Pinta el calendario, puedes pasar parametro para limpiar el calendario.
*/
function pintaCalendario(parametro){

	if (parametro == 'limpia') {
		$("#tablaCalendario tr td").each(function(index, el) {
			$(this).empty()
			.removeAttr('dia')
			.removeAttr('mes')
			.removeAttr('anyo')
			.removeAttr('diaTexto')
			.removeAttr('mesTexto')
			.removeAttr('diaTextoNum')
			.removeAttr('onclick')
			.css({
				"background-color":"white"
			});
		});
	}

    //printamos las cabezeras del calendario
    $("#tablaCalendario tr th").each(function(index, el) 
    {
        //si el dia es domingo, pintalo el ultimo no el primero
        if (index == 6) 
        {
        	$(this).html(__diasDeLaSemana[0]).css({
        		"width": 'calc( 97vw / 7 )'
        	}); 
        }
        else
        {
        	$(this).html(__diasDeLaSemana[index+1]).css({
        		"width": 'calc( 97vw / 7 )'
        	}); 
        }
    });

    //hacemos un array con los dias del mes.
    var dia=1;
    var i=0;
    __arrayDiasDelMes = new Array();
    while(dia <= __datosDia1.getDate()){
    	__arrayDiasDelMes[i] = {};
    	__arrayDiasDelMes[i]['dia'] = __datosDia1.getDate();
    	__arrayDiasDelMes[i]['mes'] = __datosDia1.getMonth();
    	__arrayDiasDelMes[i]['anyo'] = __datosDia1.getFullYear();
    	__arrayDiasDelMes[i]['diaTexto'] = __diasDeLaSemana[__datosDia1.getDay()];
    	__arrayDiasDelMes[i]['mesTexto'] = __meses[__datosDia1.getMonth()];
    	__arrayDiasDelMes[i]['diaTextoNum'] = __datosDia1.getDay();
    	i++;
    	dia++;
    	__datosDia1.setDate(dia);
    }

    //empezamos en semana 1
    var sem=1;
    var izq;
    //bloque pinto dias del mes.
    //recorro el array, y busco por dia y dia de la semana, si el dia de la semana llega a domingo sumo 1 a la semana actual.
    for (var i = 0; i < __arrayDiasDelMes.length; i++) {
        //si el dia 1 es lunes, emepezamos en semana 2.
        if (i==0 && __arrayDiasDelMes[0]['diaTextoNum'] == 1) {
        	sem = 2;
        }
        id = "td-"+sem+"-"+__arrayDiasDelMes[i]['diaTextoNum'];
        //si solo es de un digito lo centro.
        if (__arrayDiasDelMes[i]['dia'].toString().length == 1) {
        	izq= "8.5";
        }
        else{
        	izq = "3.5";
        }
        var color = "transparent";
        //si el dia del array coincide con hoy lo pinto.
        if (__arrayDiasDelMes[i]['dia'] == __diaHoy && (__arrayDiasDelMes[i]['mes']+1)== __mesHoy && __arrayDiasDelMes[i]['anyo'] == __anyoHoy) {
        	color = "#00C0F3";
        }
        else{
        	color = "transparent";
        }
        //genero el dia, un circulo y le asigno unos atributos.
        $("#"+id).html("<div id='redondo"+__arrayDiasDelMes[i]['dia']+"' class='redondo' style='float:left;text-align: center;height:25px; width:25px; border-radius:50%; background-color: "+color+"'>"+__arrayDiasDelMes[i]['dia']+"</div>").attr({
        	dia: __arrayDiasDelMes[i]['dia'] ,
        	mes: __arrayDiasDelMes[i]['mes'] ,
        	anyo: __arrayDiasDelMes[i]['anyo'] ,
        	diaTexto: __arrayDiasDelMes[i]['diaTexto'] ,
        	mesTexto: __arrayDiasDelMes[i]['mesTexto'] , 
        	diaTextoNum: __arrayDiasDelMes[i]['diaTextoNum'],
        	activo: "0",
        	onclick: "marcarDiaCalendario(this);"
        })
        //.bind({
        // 	click: function(){
        // 		marcarDiaCalendario(this);
        // 	}
        // });
        //si llego a domingo , cambio de semana.
        if (__arrayDiasDelMes[i]['diaTextoNum'] == 0){
        	sem++;
        }
    }
};    

function marcarDiaCalendario(elemento){
	var activo = $(elemento).attr("activo");
	if (activo == "0") {
        //marco
        if (!isNaN(parseInt($(elemento).attr("dia")))) {
        	$(elemento).css({
        		"background-color": "darkturquoise"
        	}).attr("activo", "1");
        	agregarDia(parseInt($(elemento).attr("dia")),parseInt($(elemento).attr("mes"))+1, parseInt($(elemento).attr("anyo")));
        }  else{
        	console.log($(elemento).attr("dia") );
        }  
    }
    else{
        //desmarco
        if (!isNaN(parseInt($(elemento).attr("dia")))) {	
        	$(elemento).css({
        		"background-color": "white"
        	}).attr("activo", "0");
        	borrarDia(parseInt($(elemento).attr("dia")),parseInt($(elemento).attr("mes"))+1, parseInt($(elemento).attr("anyo")));
        }
    }
}

function resetArrayDiasSeleccionados(){
	__arrayDiasSeleccionados = new Array();
}

function agregarDia(dia, mes, anyo){
	var temp = {"dia": dia, "mes": mes, "anyo": anyo};
	__arrayDiasSeleccionados.push(temp);
	console.log(__arrayDiasSeleccionados);
}

function borrarDia(dia, mes, anyo){
	for (var i = 0; i < __arrayDiasSeleccionados.length; i++) {
		if(__arrayDiasSeleccionados[i].dia == dia && __arrayDiasSeleccionados[i].mes == mes && __arrayDiasSeleccionados[i].anyo == anyo){
			__arrayDiasSeleccionados.splice(i,1);
		}
	}
	console.log(__arrayDiasSeleccionados);
}

function guardarAbsentismo(){
	//comprobaciones
	var vamos = true;
	if ($("#inputid").val() == "" || $("#inputid").val() == undefined) {
		vamos = false;
	}

	if (__arrayDiasSeleccionados.length == 0) {
		vamos = false;
	}
	
	if (vamos) {
		data = {"id": $("#inputid").val(), "absentismo": $("#tipoAbsentismo option:selected").prop("value"), "fechas": JSON.stringify(__arrayDiasSeleccionados)};
		$.ajax({
			data:  data,
			url:   'php/model/insertar_registros.php',
			type:  'post',
			success:  function (response) {
				window.location.href = "index.php?registros=1'";
				
			}
		});		
	}else{
		alert("Error:\n-Debe seleccionar un empleado.\n-Debe seleccionar al menos una fecha.");
	}	
}


