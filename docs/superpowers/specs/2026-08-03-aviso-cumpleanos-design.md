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
| `data/cumpleanos.csv` | Roster: columnas `nombre,correo,fecha_nacimiento` (formato `YYYY-MM-DD`). Editable a mano. |
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
4. `BuscadorCumpleanos` filtra quién cumple años hoy (día+mes, año ignorado).
5. Si no hay coincidencias, el script termina sin hacer nada (no se genera
   ningún correo ni log de envío).
6. Por cada coincidencia:
   - `RegistroEnviados` verifica si ese correo ya fue marcado como enviado
     hoy. Si ya se envió, se omite.
   - Si no se ha enviado: `CorreoMailer` envía el correo de felicitación al
     trabajador y, por separado, el aviso a `GERENCIA_EMAIL`.
   - Tras enviar (ambos correos, o al menos el del trabajador si gerencia
     falla), `RegistroEnviados` marca el correo como enviado hoy.

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

## Pendiente de datos del usuario

- Archivo `data/cumpleanos.csv` con nombre, correo y fecha de nacimiento de
  cada trabajador.
- Valor de `GERENCIA_EMAIL`.
