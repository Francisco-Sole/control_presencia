# ⏱️ Control de Presencia

Aplicación web en desarrollo para la **gestión de fichajes y control horario** de usuarios.  
Permite registrar entradas y salidas, consultar horarios y generar reportes básicos de asistencia.

---

## ✨ Características

- 👤 Gestión de usuarios y credenciales  
- 🕒 Registro de fichajes (entrada / salida)  
- 📅 Visualización de calendario de asistencia  
- 📊 Reportes básicos de control horario  
- 🎨 Interfaz con HTML, CSS y frameworks propios front-end  

---

## ⚙️ Requisitos

- 🐘 PHP 7.4 o superior  
- 🌍 Servidor web local (Apache/Nginx)  
- 🗄️ MySQL/MariaDB  
- 📱 Navegador moderno  

---

## 📂 Estructura del proyecto

- 📁 **css/** → Estilos de la aplicación  
- 📁 **font/** → Tipografías utilizadas  
- 📁 **frameworks/** → Librerías externas (JS/CSS)  
- 📁 **img/** → Recursos gráficos  
- 📁 **js/** → Scripts JavaScript  
- 📁 **php/** → Lógica de servidor y conexión a BD  
- 📄 **index.php** → Página principal de acceso  
- 📄 **cal.html** → Vista de calendario de asistencia

---

## 🗄️ Base de datos

👉 Los scripts SQL se encuentran en la carpeta [`/PHP/BD/SCHEMAS.SQL`]

Para importarla:

```bash
mysql -u usuario -p control_presencia < .php/BD/schema.sql
```

# 🚀 Puesta en marcha

## 📥 Clona el repositorio:

```bash
git clone https://github.com/Francisco-Sole/control_presencia.git
```

## 🗄️ Importa la base de datos desde los scripts SQL.

🔑 Configura las credenciales de conexión en php/main_controller.php

🌐 Abre index.php en tu navegador local.

# 🚧 Estado del proyecto
Este proyecto está en fase de desarrollo:

🔄 La estructura de tablas y funciones puede cambiar.

🛠️ Algunas funcionalidades aún no están implementadas.

🧪 Uso actual: prototipo/demostración en entorno local.

# 👤 Créditos
✍️ Autor: Francisco Solé

📍 Proyecto desarrollado en Barcelona, España

💡 Inspirado en la necesidad de gestionar fichajes y control horario de forma sencilla

# 📜 Licencia
Uso personal y educativo.
