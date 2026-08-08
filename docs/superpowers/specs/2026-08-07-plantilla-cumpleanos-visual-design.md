# Rediseño visual del correo de cumpleaños — Spec

**Fecha:** 2026-08-07
**Contexto:** El aviso automático de cumpleaños (`docs/superpowers/plans/2026-08-03-aviso-cumpleanos.md`) ya está implementado y en producción (envía vía el servicio `email_api`, ver `API_EMAIL.md`). La plantilla actual (`PlantillaCumpleanos`) es texto plano con estilos mínimos. Se pide un rediseño visual más festivo/elegante, reutilizando una imagen ya existente en el sitio (`public/images/cumpleaños.webp`).

## Objetivo

Mejorar el impacto visual del correo de felicitación al trabajador y del aviso a gerencia, incrustando la imagen de cumpleaños ya diseñada (tarjeta "Feliz Cumple" en azul/dorado) y modernizando el HTML de ambas plantillas, sin tocar la lógica ya probada del módulo (`RevisorCumpleanos`, `CorreoMailer`, `ApiEmailMailer.enviar()`).

## Arquitectura

### Asset de imagen

- `public/images/cumpleaños.webp` (800×568, ~37KB) se convierte **una sola vez**, de forma manual/build-time, a PNG redimensionado (~560px de ancho) y se guarda como `API/MensajeriaCorreo/assets/cumpleanos.png`.
- Razón para copiarla dentro del módulo en vez de referenciar `public/images/` en tiempo de ejecución: el módulo es portable (ver README §Instalación) y el cron de cPanel puede ejecutarse en un contexto donde `public/images/` no es accesible o no existe en esa ruta relativa. Un asset propio del módulo elimina esa dependencia externa.
- Formato PNG (no WebP): compatibilidad de clientes de correo — varios clientes de escritorio (Outlook clásico en particular) no renderizan WebP incrustado.

### Transporte de la imagen (`email_api`)

- `email_api` soporta un campo `image` en el payload de `/email_api/email`: data URI base64, se incrusta como imagen embebida (CID) **antepuesta automáticamente arriba del cuerpo del correo** (ver `API_EMAIL.md` §4). No hay forma de posicionarla en otro lugar del cuerpo — es responsabilidad de la API, no nuestra.
- `EmailApiClient::enviarEmail()` gana un parámetro opcional `?string $image = null` (data URI completa, ej. `data:image/png;base64,...`). Cuando no es null, se agrega la clave `image` al payload; cuando es null, se omite (la API la trata como ausente).
- `ApiEmailMailer` recibe la imagen ya codificada en base64 (data URI completa) en su constructor: `__construct(EmailApiClient $cliente, ?string $imagenBase64 = null, ?callable $logger = null)`. La misma imagen se usa para **todos** los correos que envíe esa instancia (no varía por destinatario). En cada llamada a `enviar()`, si `$imagenBase64` no es null, se pasa a `$this->cliente->enviarEmail(..., $imagenBase64)`.
- **No se toca** la firma de `CorreoMailer::enviar()` (`destinatario, asunto, cuerpoHtml, cuerpoTexto`) — sigue sin parámetro de imagen. `RevisorCumpleanos` no cambia. `MailerFalso` (doble de prueba) no cambia.
- El cron (`cron/revisar_cumpleanos.php`) y el script manual (`examples/probar_cumpleanos.php`) cargan el PNG del disco, lo codifican en base64 una vez al arrancar, y lo pasan al construir `ApiEmailMailer`. Si el archivo del asset no existe, se registra un warning por el logger y se continúa **sin imagen** (no se bloquea el envío del correo por un asset faltante).

### Plantillas (`PlantillaCumpleanos`)

- `htmlTrabajador(string $nombre): string` — tarjeta con fondo azul pastel suave (`#eaf1ff`), encabezado en azul de marca (`#1c44ed`), acentos dorados (`#f5b301` aprox., a tono con la imagen), emojis (🎉🎂💙), bordes redondeados (`border-radius`), tipografía más grande para el saludo. Como la imagen ya incluye el texto "Feliz Cumple", el cuerpo **no repite** ese titular — arranca directo con el saludo personalizado (`¡Hola, {nombre}!` o similar).
- `htmlGerencia(string $nombreCumpleanero): string` — mismo tratamiento visual (misma paleta, misma imagen arriba), pero copy orientado a gerencia: aviso de que hoy es el cumpleaños de `{nombre}`, invitación a felicitarle.
- `textoTrabajador()` / `textoGerencia()` (fallback texto plano) se actualizan con emojis simples compatibles con texto plano, sin HTML.
- `asuntoTrabajador()` → `"🎉 ¡Feliz cumpleaños!"`. `asuntoGerencia()` → `"🎂 Aviso de cumpleaños"`.
- Sin animaciones CSS (`@keyframes`, `animation`): la mayoría de clientes de correo las ignoran o las eliminan por completo al sanitizar el HTML. El efecto "vivo" viene de color, tipografía, la imagen y los emojis — no de movimiento.

## Testing

- `EmailApiClientTest.php`: nuevo caso — cuando se pasa `$image` a `enviarEmail()`, el payload capturado incluye la clave `image` con el valor exacto pasado; cuando no se pasa, la clave `image` está ausente del payload (la API la trata distinto de una cadena vacía).
- `ApiEmailMailerTest.php`: nuevo caso — construir `ApiEmailMailer` con una imagen fija y verificar (via un `EmailApiClient` con transporte falso que captura el payload) que la imagen llega en cada llamada a `enviarEmail()`.
- `PlantillaCumpleanosTest.php`: se mantienen las aserciones existentes (escape de nombre, asunto no vacío) — se agregan aserciones sobre presencia de elementos clave del nuevo diseño si aplica (ej. que el HTML siga incluyendo el nombre escapado).
- No se agrega ninguna prueba automatizada de "verse bien" (eso no es testeable con el arnés actual) — la validación visual final es manual, con el script `probar_cumpleanos.php --enviar` contra una casilla real.

## Fuera de alcance

- No se reemplaza `public/images/cumpleaños.webp` ni se toca el sitio web — solo se copia/convierte una vez hacia el módulo de correo.
- No se agregan más imágenes ni variantes por mes/estación — una sola imagen fija para todos los cumpleaños.
- No se cambia `RevisorCumpleanos`, `RegistroEnviados`, `RepositorioCumpleanos`, `BuscadorCumpleanos`, ni el contrato de `CorreoMailer`.
