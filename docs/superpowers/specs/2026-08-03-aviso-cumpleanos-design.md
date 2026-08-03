# Aviso automático de cumpleaños — Diseño

## Contexto

`API/MensajeriaCorreo` ya es un módulo portable para enviar correos por SMTP
(vía `CorreoMailer` + PHPMailer), usado hoy para códigos de verificación (2FA
y recuperación de contraseña). Se pidió una nueva funcionalidad: revisar
diariamente si algún trabajador cumple años y, de ser así, enviarle un correo
de felicitación y avisar a gerencia para que también lo celebre.

Este documento describe el diseño de esa funcionalidad, construida encima del
módulo existente sin modificar lo que ya funciona.

## Decisiones tomadas con el usuario

- **Fuente de datos:** archivo CSV editable a mano (no base de datos). El
  usuario mantiene el archivo con Excel/Sheets.
- **Disparador:** cron de cPanel (hosting compartido), corre un script PHP
  por CLI una vez al día, después de medianoche.
- **Destinatario de gerencia:** un solo correo.
- **Duplicados:** el sistema debe evitar reenviar el mismo aviso si el cron
  corre dos veces el mismo día.
- **Tono del correo al cumpleañero:** cercano y cálido (no corporativo/formal).
- **Confidencialidad:** los datos personales (nombre, correo personal, día y
  mes de nacimiento) deben quedar protegidos contra extracción — nunca en el
  repositorio git, sin exposición por HTTP, con permisos de archivo
  restringidos. Sin cifrado adicional en disco (se evaluó y se descartó por
  ahora; ver sección de Seguridad).
- **Ubicación en el hosting:** la carpeta `API/MensajeriaCorreo` queda dentro
  de `public_html` (mismo lugar que el resto de la web), por lo que el
  archivo de datos necesita bloqueo explícito de acceso HTTP.

## Arquitectura

Nuevo submódulo `src/Cumpleanos/` dentro de `API/MensajeriaCorreo`, que
reutiliza `CorreoMailer` y `bootstrap.php` ya existentes. Un script CLI
(`cron/revisar_cumpleanos.php`) se registra en el cron de cPanel para correr
una vez al día. El script lee el roster CSV, detecta coincidencias con la
fecha de hoy (comparando solo día+mes, ignorando el año) y dispara los
correos correspondientes.

## Componentes

| Archivo | Rol |
|---|---|
| `data/cumpleanos.csv` | Roster real: columnas `nombre,correo,dia,mes`. Editable a mano. **No se versiona en git** (ver Seguridad). |
| `data/cumpleanos.csv.example` | Versión de ejemplo con datos ficticios, sí versionada, para que cualquiera que clone el repo entienda el formato esperado. |
| `data/.htaccess` | Bloquea cualquier acceso HTTP directo a la carpeta `data/` (`Deny from all` / `Require all denied`). |
| `src/Cumpleanos/RepositorioCumpleanos.php` | Lee y parsea el CSV; devuelve un arreglo de registros. Filas mal formadas se omiten y se loguean, sin detener la carga. |
| `src/Cumpleanos/BuscadorCumpleanos.php` | Recibe la fecha de "hoy" y el roster; devuelve los registros cuyo día+mes de `fecha_nacimiento` coincide con hoy. |
| `src/Cumpleanos/RegistroEnviados.php` | Control de duplicados. Guarda en `data/cumpleanos_enviados.json` un mapa `{"YYYY-MM-DD": ["correo1", "correo2", ...]}`. Antes de enviar, pregunta si ese correo ya está marcado para la fecha de hoy; después de enviar, lo marca. |
| `src/Templates/PlantillaCumpleanos.php` | Genera HTML/texto/asunto de dos correos: felicitación al cumpleañero (tono cálido) y aviso a gerencia (incluye nombre del trabajador). |
| `cron/revisar_cumpleanos.php` | Punto de entrada CLI. Orquesta: cargar config → cargar roster → buscar coincidencias de hoy → por cada una, enviar y marcar si no se ha enviado ya. |
| `.env` (nueva variable) | `GERENCIA_EMAIL=` — correo que recibe el aviso de gerencia. |

## Flujo de datos

1. El cron de cPanel ejecuta `php cron/revisar_cumpleanos.php` diariamente
   (ej. 00:10, hora del servidor).
2. El script toma la fecha actual del servidor.
3. `RepositorioCumpleanos` carga `data/cumpleanos.csv`.
4. `BuscadorCumpleanos` filtra quién cumple años hoy comparando directamente
   las columnas `dia`/`mes` del roster contra el día/mes de hoy (no se guarda
   ni se necesita el año de nacimiento).
5. Si no hay coincidencias, el script termina sin hacer nada (no se genera
   ningún correo ni log de envío).
6. Por cada coincidencia:
   - `RegistroEnviados` verifica si ese correo ya fue marcado como enviado
     hoy. Si ya se envió, se omite.
   - Si no se ha enviado: `CorreoMailer` envía el correo de felicitación al
     trabajador y, por separado, el aviso a `GERENCIA_EMAIL`.
   - Tras enviar (ambos correos, o al menos el del trabajador si gerencia
     falla), `RegistroEnviados` marca el correo como enviado hoy.

## Seguridad y confidencialidad

Estos datos (nombres completos, correos personales, día y mes de nacimiento)
son información personal y deben tratarse como confidenciales. Medidas
aplicadas:

- **Nunca en git.** `data/cumpleanos.csv` (el real, con datos de personas) se
  agrega a `.gitignore`. Solo se versiona `data/cumpleanos.csv.example` con
  datos ficticios. El archivo real se coloca directo en el servidor (subida
  manual por SFTP/panel de archivos de cPanel), nunca a través de un commit
  ni de este chat/historial de conversación.
- **Sin acceso HTTP.** Como `API/MensajeriaCorreo` vive dentro de
  `public_html`, se añade `data/.htaccess` con `Deny from all` (Apache 2.2) /
  `Require all denied` (Apache 2.4) para que nadie pueda pedir el CSV por URL
  aunque la adivine. `cumpleanos_enviados.json` queda en la misma carpeta y
  hereda la misma protección.
- **Permisos de archivo restringidos.** Se documenta en el README del
  submódulo que el CSV debe quedar con permisos `640` o más restrictivos
  (solo lectura para el usuario/grupo del hosting), no `644`.
- **Nunca en logs ni en errores.** Los logs solo registran el nombre y el
  correo enmascarado (reutilizando `CorreoMailer::enmascarar()`), igual que
  ya hace el módulo de 2FA. Nunca se loguea el correo completo ni se expone
  el CSV completo en ningún mensaje de error.
- **Sin cifrado adicional en disco (decisión tomada).** Se evaluó cifrar el
  CSV con una clave en `.env`, pero se descartó por ahora: el acceso ya
  queda restringido (fuera de git, sin ruta HTTP, permisos de archivo), y
  cifrar añade una pieza más que mantener (gestión de la clave) sin una
  amenaza adicional identificada que lo justifique hoy. Si más adelante cambia
  el nivel de riesgo (ej. el hosting deja de ser de confianza exclusiva),
  esta decisión se puede revisar.
- **El correo de gerencia recibe solo el nombre del cumpleañero**, no la lista
  completa del roster ni las fechas de nacimiento de los demás.

## Manejo de errores

- Fila de CSV mal formada (columnas faltantes, fecha inválida): se omite esa
  fila y se registra en log; el resto de la carga continúa.
- Falla en el envío al trabajador (`CorreoException`): se loguea el error y
  se continúa con la siguiente coincidencia; un fallo no bloquea a los demás
  trabajadores que cumplen años el mismo día.
- El envío a gerencia se intenta independientemente del envío al trabajador:
  si uno falla, no impide el intento del otro.
- Igual que el resto del módulo, ninguna excepción interna (host/credenciales
  SMTP) se expone fuera del log.

## Pruebas

- `examples/probar_cumpleanos.php`: script manual (como `probar_smtp.php`)
  que acepta una fecha por parámetro para simular "hoy" sin esperar a un
  cumpleaños real, y reporta qué coincidencias encontró y a quién les
  enviaría correo (con opción de simular en seco, sin enviar).

## Fuera de alcance

- Interfaz web para administrar el roster (se edita el CSV directamente).
- Notificaciones para aniversarios laborales u otras fechas — solo
  cumpleaños.
- Zona horaria distinta a la del servidor de hosting.

## Datos recibidos del usuario

- Roster de 12 trabajadores (nombre, correo personal, día, mes) — recibido
  en la conversación. **No se transcribe en este documento ni en ningún
  archivo versionado**; se cargará directo en `data/cumpleanos.csv` en el
  servidor/entorno local, protegido según la sección de Seguridad.
- `GERENCIA_EMAIL=analistaadministrativo@fjdsas.com.co`.
