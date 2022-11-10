<h1 align="center">GeoUIS</h1>

<h3 align="center">Sistema de información para gestionar las colecciones de muestras geológicas de la Escuela de Geología.</h3>

<h4>Enlace a la base de datos:</h4>
<p>https://drive.google.com/drive/folders/11aRmusWsoD-zkdNMGcalcLoX4Hv74nSO?usp=sharing</p>
<ol>
  <li>Debe crear una base de datos en pgAdmin.</li>
  <li>Debe restaurar el backup que está en el Drive en esta base de datos.</li>
  <li>Realizar la conexión en el archivo del backend db/connection.ts</li>
</ol>

<h4>Instalación de la aplicación:</h4>
<ol>
  <li>Clone el repositorio</li>
  <li>Moverse a la carpeta Back-GeoUIS</li>
  <li>Ejecutar el comando 'npm install' para instalar los módulos de Node.</li>
  <li>Moverse a la carpeta Front-GeoUIS</li>
  <li>Ejecutar el comando 'npm install' para instalar los módulos de Node.</li>
</ol>

<h4>Ejecución de la aplicación:</h4>
<ol>
  <li>Moverse a la carpeta Back-GeoUIS</li>
  <li>Ejecutar el comando 'tsc --watch' para compilar los cambios en typescript a tiempo real.</li>
  <li>Ejecutar el comando 'nodemon dist/app.js' para levantar el servidor.</li>
  <li>Moverse a la carpeta Front-GeoUIS</li>
  <li>Ejecutar el comando 'ng serve -o' para levantar el frontend.</li>
</ol>


