# Rediseño visual del correo de cumpleaños — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar la plantilla de texto plano del correo de cumpleaños por un diseño visual con la imagen ya existente en el sitio (`public/images/cumpleaños.webp`) incrustada, y colores/emojis más festivos, tanto para el trabajador como para gerencia.

**Architecture:** Se copia y convierte la imagen a PNG dentro del propio módulo (`API/MensajeriaCorreo/assets/`). `EmailApiClient` gana un parámetro opcional de imagen; `ApiEmailMailer` la recibe fija en su constructor y la reenvía en cada envío. Las plantillas HTML se rediseñan con la nueva paleta. Nada de esto toca `RevisorCumpleanos`, `CorreoMailer` ni `MailerFalso`.

**Tech Stack:** PHP >= 7.4, extensión GD (ya incluida en PHP, sin nuevas dependencias de Composer), el mismo arnés de pruebas CLI del módulo (`tests/TestHarness.php`).

## Global Constraints

- PHP >= 7.4 (sin constructor property promotion ni `readonly`).
- No se agregan dependencias nuevas a `composer.json`.
- Namespace raíz `App\Correo\` (PSR-4 → `src/`).
- Nunca loguear ni imprimir un correo completo — usar `CorreoMailer::enmascarar()`.
- No se modifica la firma de `CorreoMailer::enviar()`, ni `RevisorCumpleanos`, ni `MailerFalso` — el soporte de imagen se agrega solo en `EmailApiClient` y `ApiEmailMailer`.
- El asset de imagen vive dentro del módulo (`API/MensajeriaCorreo/assets/`), no se referencia `public/images/` en tiempo de ejecución — el módulo debe seguir siendo portable.

---

### Task 1: Generar el asset de imagen PNG dentro del módulo

**Files:**
- Create: `API/MensajeriaCorreo/assets/cumpleanos.png` (binario, se commitea)

**Interfaces:**
- Consumes: `public/images/cumpleaños.webp` (fuente, en la raíz del proyecto, NO dentro del módulo).
- Produces: `API/MensajeriaCorreo/assets/cumpleanos.png`, PNG redimensionado a 560px de ancho — lo consume la Task 5.

- [ ] **Step 1: Crear el script de conversión temporal**

Guarda este contenido como `scripts_tmp_convertir_cumpleanos.php` en la raíz del repositorio (fuera del módulo, es un script de un solo uso, no se commitea):

```php
<?php

$origen = __DIR__ . '/public/images/cumpleaños.webp';
$destino = __DIR__ . '/API/MensajeriaCorreo/assets/cumpleanos.png';
$anchoDestino = 560;

$imagenOrigen = imagecreatefromwebp($origen);
if ($imagenOrigen === false) {
    fwrite(STDERR, "No se pudo leer la imagen origen: {$origen}\n");
    exit(1);
}

$anchoOrigen = imagesx($imagenOrigen);
$altoOrigen = imagesy($imagenOrigen);
$altoDestino = (int) round($altoOrigen * ($anchoDestino / $anchoOrigen));

$imagenDestino = imagecreatetruecolor($anchoDestino, $altoDestino);
imagealphablending($imagenDestino, false);
imagesavealpha($imagenDestino, true);
$transparente = imagecolorallocatealpha($imagenDestino, 0, 0, 0, 127);
imagefill($imagenDestino, 0, 0, $transparente);

imagecopyresampled(
    $imagenDestino, $imagenOrigen,
    0, 0, 0, 0,
    $anchoDestino, $altoDestino, $anchoOrigen, $altoOrigen
);

if (!is_dir(dirname($destino))) {
    mkdir(dirname($destino), 0755, true);
}

imagepng($imagenDestino, $destino, 6);

imagedestroy($imagenOrigen);
imagedestroy($imagenDestino);

echo "OK: {$destino} ({$anchoDestino}x{$altoDestino})\n";
```

- [ ] **Step 2: Ejecutar el script y verificar la salida**

Run: `php scripts_tmp_convertir_cumpleanos.php`
Expected: `OK: .../API/MensajeriaCorreo/assets/cumpleanos.png (560x398)` (el alto exacto depende del aspect ratio real del webp, pero debe imprimir "OK" y una ruta existente).

Verifica el archivo generado:

Run: `php -r "var_dump(getimagesize('API/MensajeriaCorreo/assets/cumpleanos.png'));"`
Expected: un array con `[0]` (ancho) = 560, `[2]` = `IMAGETYPE_PNG` (valor `3`), sin errores.

- [ ] **Step 3: Borrar el script temporal**

```bash
rm scripts_tmp_convertir_cumpleanos.php
```

- [ ] **Step 4: Commit**

```bash
git add API/MensajeriaCorreo/assets/cumpleanos.png
git commit -m "feat(cumpleanos): agregar asset de imagen para el correo"
```

---

### Task 2: `EmailApiClient` — soporte opcional de imagen

**Files:**
- Modify: `API/MensajeriaCorreo/src/Mailer/EmailApiClient.php`
- Modify: `API/MensajeriaCorreo/tests/EmailApiClientTest.php`

**Interfaces:**
- Consumes: nada nuevo.
- Produces: `EmailApiClient::enviarEmail(string $asunto, string $toEmail, string $emailBody, ?string $image = null): string` — cuando `$image` no es `null` ni `''`, el payload HTTP incluye la clave `image` con ese valor exacto (data URI base64). La Task 3 depende de esta firma.

- [ ] **Step 1: Agregar los casos de prueba (fallan porque el parametro no existe aun)**

Abre `API/MensajeriaCorreo/tests/EmailApiClientTest.php` y agrega este bloque **inmediatamente antes** de la línea `resumenPruebas();` al final del archivo:

```php
// --- Caso 8: cuando se pasa una imagen, el payload incluye la clave 'image' ---
$payloadConImagen = null;
$transporteCapturadorImagen = function (string $url, string $jsonBody, int $timeout) use (&$payloadConImagen) {
    $payloadConImagen = json_decode($jsonBody, true);
    return [
        'body' => '{"status":"OK","result":"Email enviado Correctamente","error":{"code":"","message":""}}',
        'httpCode' => 200,
        'curlErr' => '',
    ];
};
$cliente8 = new EmailApiClient('https://conelec.co:2020/email_api', 60, $transporteCapturadorImagen);
$cliente8->enviarEmail('Asunto', 'ana@example.com', '<p>hola</p>', 'data:image/png;base64,AAAA');
assertVerdadero(isset($payloadConImagen['image']), 'El payload incluye la clave image cuando se pasa una imagen');
assertIgual('data:image/png;base64,AAAA', $payloadConImagen['image'], 'El payload envia la imagen exacta que se paso');

// --- Caso 9: sin imagen, el payload no incluye la clave 'image' ---
$payloadSinImagen = ['image' => 'no debe sobrevivir'];
$transporteCapturadorSinImagen = function (string $url, string $jsonBody, int $timeout) use (&$payloadSinImagen) {
    $payloadSinImagen = json_decode($jsonBody, true);
    return [
        'body' => '{"status":"OK","result":"Email enviado Correctamente","error":{"code":"","message":""}}',
        'httpCode' => 200,
        'curlErr' => '',
    ];
};
$cliente9 = new EmailApiClient('https://conelec.co:2020/email_api', 60, $transporteCapturadorSinImagen);
$cliente9->enviarEmail('Asunto', 'ana@example.com', '<p>hola</p>');
assertVerdadero(!isset($payloadSinImagen['image']), 'El payload no incluye la clave image cuando no se pasa imagen');
```

- [ ] **Step 2: Correr la prueba y confirmar que falla**

Run: `php API/MensajeriaCorreo/tests/EmailApiClientTest.php`
Expected: `FALLO: El payload incluye la clave image cuando se pasa una imagen` (PHP no falla por pasar un 4to argumento de mas a un metodo que solo declara 3 — simplemente lo ignora — asi que el caso 8 corre pero la asercion falla porque el metodo actual todavia no agrega la clave `image` al payload).

- [ ] **Step 3: Modificar `EmailApiClient::enviarEmail()`**

En `API/MensajeriaCorreo/src/Mailer/EmailApiClient.php`, reemplaza el método completo:

```php
    /**
     * Envia un correo a un unico destinatario via POST /email_api/email.
     * No se piden tabla (procedure vacio) ni adjuntos: no los usa el modulo de cumpleanos.
     *
     * @param string|null $image Data URI base64 completa (ej. 'data:image/png;base64,...').
     *                           Si es null o '', no se incluye la clave 'image' en el payload.
     *
     * @throws EmailApiException
     */
    public function enviarEmail(string $asunto, string $toEmail, string $emailBody, ?string $image = null): string
    {
        $payload = [
            'asunto' => $asunto,
            'to_email' => $toEmail,
            'email_body' => $emailBody,
            'procedure' => '',
            'fields' => (object) [],
            'adjuntos' => [],
        ];

        if ($image !== null && $image !== '') {
            $payload['image'] = $image;
        }

        return $this->post('/email', $payload);
    }
```

- [ ] **Step 4: Correr la prueba y confirmar que pasa**

Run: `php API/MensajeriaCorreo/tests/EmailApiClientTest.php`
Expected: todas las líneas `OK:` y `15/15 pruebas exitosas.` (exit code 0).

- [ ] **Step 5: Commit**

```bash
git add API/MensajeriaCorreo/src/Mailer/EmailApiClient.php API/MensajeriaCorreo/tests/EmailApiClientTest.php
git commit -m "feat(cumpleanos): EmailApiClient acepta imagen opcional"
```

---

### Task 3: `ApiEmailMailer` — imagen fija por instancia

**Files:**
- Modify: `API/MensajeriaCorreo/src/Mailer/ApiEmailMailer.php`
- Modify: `API/MensajeriaCorreo/tests/ApiEmailMailerTest.php`

**Interfaces:**
- Consumes: `EmailApiClient::enviarEmail(string, string, string, ?string $image = null): string` (Task 2).
- Produces: `ApiEmailMailer::__construct(EmailApiClient $cliente, ?string $imagenBase64 = null, ?callable $logger = null)` — **cambia el orden de los parametros** respecto a la version anterior (antes era `(EmailApiClient $cliente, ?callable $logger = null)`). La Task 5 debe actualizar todos los sitios que instancian `ApiEmailMailer` con 2 argumentos posicionales.

- [ ] **Step 1: Agregar los casos de prueba (fallan porque el parametro no existe aun)**

Abre `API/MensajeriaCorreo/tests/ApiEmailMailerTest.php` y agrega este bloque **inmediatamente antes** de la línea `resumenPruebas();` al final del archivo:

```php
// --- Caso 6: la imagen fija del constructor se reenvia en cada llamada a enviarEmail() ---
$imagenPayload = null;
$transporteCapturadorImagenMailer = function (string $url, string $jsonBody, int $timeout) use (&$imagenPayload) {
    $imagenPayload = json_decode($jsonBody, true);
    return [
        'body' => '{"status":"OK","result":"Email enviado Correctamente","error":{"code":"","message":""}}',
        'httpCode' => 200,
        'curlErr' => '',
    ];
};
$cliente6 = new EmailApiClient('https://conelec.co:2020/email_api', 60, $transporteCapturadorImagenMailer);
$mailer6 = new ApiEmailMailer($cliente6, 'data:image/png;base64,BBBB');
$mailer6->enviar('ana@example.com', 'Asunto', '<p>hola</p>');
assertIgual('data:image/png;base64,BBBB', $imagenPayload['image'], 'La imagen fija del constructor se envia en el payload');

// --- Caso 7: sin imagen en el constructor, el payload no incluye la clave image ---
$sinImagenPayload = ['image' => 'no debe sobrevivir'];
$transporteCapturadorSinImagenMailer = function (string $url, string $jsonBody, int $timeout) use (&$sinImagenPayload) {
    $sinImagenPayload = json_decode($jsonBody, true);
    return [
        'body' => '{"status":"OK","result":"Email enviado Correctamente","error":{"code":"","message":""}}',
        'httpCode' => 200,
        'curlErr' => '',
    ];
};
$cliente7 = new EmailApiClient('https://conelec.co:2020/email_api', 60, $transporteCapturadorSinImagenMailer);
$mailer7 = new ApiEmailMailer($cliente7);
$mailer7->enviar('ana@example.com', 'Asunto', '<p>hola</p>');
assertVerdadero(!isset($sinImagenPayload['image']), 'Sin imagen en el constructor, el payload no incluye la clave image');
```

- [ ] **Step 2: Correr la prueba y confirmar que falla**

Run: `php API/MensajeriaCorreo/tests/ApiEmailMailerTest.php`
Expected: `FALLO: La imagen fija del constructor se envia en el payload` (o un error de indice indefinido `image`), porque `ApiEmailMailer` todavia no reenvia ninguna imagen.

- [ ] **Step 3: Modificar `ApiEmailMailer`**

Reemplaza el contenido completo de `API/MensajeriaCorreo/src/Mailer/ApiEmailMailer.php`:

```php
<?php

namespace App\Correo\Mailer;

/**
 * Adaptador que envia correo via el servicio HTTP interno email_api
 * (ver API_EMAIL.md) en vez de SMTP directo.
 *
 * Extiende CorreoMailer para poder inyectarse donde se espere esa clase
 * (ej. RevisorCumpleanos) sin modificar ningun consumidor existente.
 * Intencionalmente no llama al constructor padre: no necesita ConfigProviderInterface.
 */
class ApiEmailMailer extends CorreoMailer
{
    /** @var EmailApiClient */
    private $cliente;

    /** @var string|null Data URI base64 de la imagen a incrustar en cada correo (misma imagen para todos los envios de esta instancia) */
    private $imagenBase64;

    /** @var callable|null Logger opcional: function(string $nivel, string $mensaje) */
    private $logger;

    public function __construct(EmailApiClient $cliente, ?string $imagenBase64 = null, ?callable $logger = null)
    {
        $this->cliente = $cliente;
        $this->imagenBase64 = $imagenBase64;
        $this->logger = $logger;
    }

    public function enviar(string $destinatario, string $asunto, string $cuerpoHtml, string $cuerpoTexto = ''): bool
    {
        if (!filter_var($destinatario, FILTER_VALIDATE_EMAIL)) {
            throw new CorreoException("Correo electronico de destino no valido: {$destinatario}");
        }

        try {
            $this->cliente->enviarEmail($asunto, $destinatario, $cuerpoHtml, $this->imagenBase64);
        } catch (EmailApiException $e) {
            $this->log('error', 'Fallo enviando via email_api a ' . self::enmascarar($destinatario) . ': ' . $e->getMessage());
            throw $e;
        }

        $this->log('info', 'Correo enviado via email_api a ' . self::enmascarar($destinatario) . " | asunto: {$asunto}");

        return true;
    }

    private function log(string $nivel, string $mensaje): void
    {
        if ($this->logger !== null) {
            call_user_func($this->logger, $nivel, $mensaje);
        }
    }
}
```

- [ ] **Step 4: Correr la prueba y confirmar que pasa**

Run: `php API/MensajeriaCorreo/tests/ApiEmailMailerTest.php`
Expected: todas las líneas `OK:` y `7/7 pruebas exitosas.` (exit code 0).

- [ ] **Step 5: Commit**

```bash
git add API/MensajeriaCorreo/src/Mailer/ApiEmailMailer.php API/MensajeriaCorreo/tests/ApiEmailMailerTest.php
git commit -m "feat(cumpleanos): ApiEmailMailer reenvia una imagen fija en cada envio"
```

---

### Task 4: Rediseño visual de `PlantillaCumpleanos`

**Files:**
- Modify: `API/MensajeriaCorreo/src/Templates/PlantillaCumpleanos.php`
- Modify: `API/MensajeriaCorreo/tests/PlantillaCumpleanosTest.php`

**Interfaces:**
- Consumes: nada nuevo.
- Produces: mismos métodos públicos que antes (`asuntoTrabajador`, `htmlTrabajador`, `textoTrabajador`, `asuntoGerencia`, `htmlGerencia`, `textoGerencia`) — mismas firmas, contenido rediseñado. `RevisorCumpleanos` no cambia porque el contrato no cambia.

- [ ] **Step 1: Reemplazar las aserciones de la prueba existente**

Reemplaza el contenido completo de `API/MensajeriaCorreo/tests/PlantillaCumpleanosTest.php`:

```php
<?php

require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/TestHarness.php';

use App\Correo\Templates\PlantillaCumpleanos;

$html = PlantillaCumpleanos::htmlTrabajador('Ana <Torres>');
assertVerdadero(strpos($html, '&lt;Torres&gt;') !== false, 'El nombre del trabajador se escapa en el HTML');
assertVerdadero(strpos($html, 'Ana') !== false, 'El HTML incluye el nombre del trabajador');
assertVerdadero(strpos($html, 'FJD GROUP') !== false, 'El HTML del trabajador menciona a la empresa');

$texto = PlantillaCumpleanos::textoTrabajador('Ana Torres');
assertVerdadero(strpos($texto, 'Ana Torres') !== false, 'El texto plano incluye el nombre del trabajador');

$asuntoTrabajador = PlantillaCumpleanos::asuntoTrabajador();
assertVerdadero($asuntoTrabajador !== '', 'El asunto para el trabajador no esta vacio');
assertVerdadero(strpos($asuntoTrabajador, '🎉') !== false, 'El asunto del trabajador incluye un emoji festivo');

$htmlGerencia = PlantillaCumpleanos::htmlGerencia('Luis <Rios>');
assertVerdadero(strpos($htmlGerencia, '&lt;Rios&gt;') !== false, 'El nombre en el aviso a gerencia se escapa');

$textoGerencia = PlantillaCumpleanos::textoGerencia('Luis Rios');
assertVerdadero(strpos($textoGerencia, 'Luis Rios') !== false, 'El texto a gerencia incluye el nombre del cumpleanero');

$asuntoGerencia = PlantillaCumpleanos::asuntoGerencia();
assertVerdadero($asuntoGerencia !== '', 'El asunto para gerencia no esta vacio');
assertVerdadero(strpos($asuntoGerencia, '🎂') !== false, 'El asunto de gerencia incluye un emoji festivo');

resumenPruebas();
```

- [ ] **Step 2: Correr la prueba y confirmar que falla**

Run: `php API/MensajeriaCorreo/tests/PlantillaCumpleanosTest.php`
Expected: `FALLO: El HTML del trabajador menciona a la empresa` y `FALLO: El asunto del trabajador incluye un emoji festivo` y `FALLO: El asunto de gerencia incluye un emoji festivo` (la plantilla actual no tiene ni "FJD GROUP" ni emojis en el asunto).

- [ ] **Step 3: Reemplazar `PlantillaCumpleanos`**

Reemplaza el contenido completo de `API/MensajeriaCorreo/src/Templates/PlantillaCumpleanos.php`:

```php
<?php

namespace App\Correo\Templates;

/**
 * Plantillas de correo para el aviso automatico de cumpleanos:
 * felicitacion al trabajador (tono calido) y aviso a gerencia.
 *
 * La imagen de cumpleanos (ver API/MensajeriaCorreo/assets/cumpleanos.png)
 * la incrusta email_api arriba de este HTML — ver ApiEmailMailer. Por eso
 * estas plantillas no repiten el titulo "Feliz Cumple": arrancan directo
 * con el saludo personalizado.
 */
class PlantillaCumpleanos
{
    /** @var string Color principal de la marca */
    const COLOR_MARCA = '#1c44ed';

    /** @var string Fondo pastel de la tarjeta */
    const COLOR_FONDO = '#eaf1ff';

    /** @var string Acento dorado, a tono con la imagen de cumpleanos */
    const COLOR_ACENTO = '#a66b00';

    public static function asuntoTrabajador(): string
    {
        return '🎉 ¡Feliz cumpleaños!';
    }

    public static function htmlTrabajador(string $nombre): string
    {
        $nombreSeguro = htmlspecialchars($nombre, ENT_QUOTES, 'UTF-8');
        $colorMarca = self::COLOR_MARCA;
        $colorFondo = self::COLOR_FONDO;
        $colorAcento = self::COLOR_ACENTO;

        return <<<HTML
<div style="font-family:Arial,Helvetica,sans-serif; max-width:560px; margin:0 auto;">
    <div style="background-color:{$colorFondo}; border-radius:16px; padding:32px 28px; text-align:center;">
        <p style="font-size:15px; letter-spacing:1px; text-transform:uppercase; color:{$colorAcento}; font-weight:bold; margin:0 0 8px;">🎉 Hoy es tu dia 🎉</p>
        <h1 style="color:{$colorMarca}; font-size:28px; margin:0 0 20px;">¡Hola, {$nombreSeguro}!</h1>
        <p style="color:#333333; font-size:16px; line-height:1.6; margin:0 0 16px;">
            En <strong>FJD GROUP</strong> queremos desearte un cumpleaños increíble, lleno de alegría y momentos especiales junto a quienes más quieres. 🎂
        </p>
        <p style="color:#333333; font-size:16px; line-height:1.6; margin:0 0 24px;">
            Gracias por tu dedicación y por ser parte fundamental de este equipo. ¡Que este nuevo año de vida esté lleno de éxitos!
        </p>
        <p style="color:{$colorMarca}; font-size:18px; font-weight:bold; margin:0;">Con cariño, tu equipo 💙</p>
    </div>
</div>
HTML;
    }

    public static function textoTrabajador(string $nombre): string
    {
        return "🎉 ¡Hola, {$nombre}! 🎉\n\n"
            . "En FJD GROUP queremos desearte un cumpleaños increíble, lleno de alegría y momentos especiales junto a quienes más quieres.\n\n"
            . "Gracias por tu dedicación y por ser parte fundamental de este equipo. ¡Que este nuevo año de vida esté lleno de éxitos!\n\n"
            . "Con cariño, tu equipo";
    }

    public static function asuntoGerencia(): string
    {
        return '🎂 Aviso de cumpleaños';
    }

    public static function htmlGerencia(string $nombreCumpleanero): string
    {
        $nombreSeguro = htmlspecialchars($nombreCumpleanero, ENT_QUOTES, 'UTF-8');
        $colorMarca = self::COLOR_MARCA;
        $colorFondo = self::COLOR_FONDO;
        $colorAcento = self::COLOR_ACENTO;

        return <<<HTML
<div style="font-family:Arial,Helvetica,sans-serif; max-width:560px; margin:0 auto;">
    <div style="background-color:{$colorFondo}; border-radius:16px; padding:32px 28px; text-align:center;">
        <p style="font-size:15px; letter-spacing:1px; text-transform:uppercase; color:{$colorAcento}; font-weight:bold; margin:0 0 8px;">🎂 Aviso de cumpleaños 🎂</p>
        <h1 style="color:{$colorMarca}; font-size:24px; margin:0 0 20px;">Hoy cumple años {$nombreSeguro}</h1>
        <p style="color:#333333; font-size:16px; line-height:1.6; margin:0;">
            Este es un recordatorio automático para que el equipo de gerencia se una a la celebración y le extienda una felicitación a {$nombreSeguro}. 💙
        </p>
    </div>
</div>
HTML;
    }

    public static function textoGerencia(string $nombreCumpleanero): string
    {
        return "🎂 Hoy cumple años {$nombreCumpleanero}.\n\n"
            . "Recordatorio automático para que el equipo de gerencia se una a la celebración y le extienda una felicitación.";
    }
}
```

- [ ] **Step 4: Correr la prueba y confirmar que pasa**

Run: `php API/MensajeriaCorreo/tests/PlantillaCumpleanosTest.php`
Expected: todas las líneas `OK:` y `10/10 pruebas exitosas.` (exit code 0).

- [ ] **Step 5: Commit**

```bash
git add API/MensajeriaCorreo/src/Templates/PlantillaCumpleanos.php API/MensajeriaCorreo/tests/PlantillaCumpleanosTest.php
git commit -m "feat(cumpleanos): rediseno visual de PlantillaCumpleanos"
```

---

### Task 5: Cablear el asset de imagen en el cron y en el script manual

**Files:**
- Modify: `API/MensajeriaCorreo/cron/revisar_cumpleanos.php`
- Modify: `API/MensajeriaCorreo/examples/probar_cumpleanos.php`

**Interfaces:**
- Consumes: `API/MensajeriaCorreo/assets/cumpleanos.png` (Task 1), `ApiEmailMailer::__construct(EmailApiClient $cliente, ?string $imagenBase64 = null, ?callable $logger = null)` (Task 3).
- Produces: nada consumido por otra task — es el punto de entrada final.

- [ ] **Step 1: Modificar `cron/revisar_cumpleanos.php`**

Reemplaza estas dos líneas:

```php
$repositorio = new RepositorioCumpleanos(__DIR__ . '/../data/cumpleanos.csv', $logger);
$buscador = new BuscadorCumpleanos();
$registro = new RegistroEnviados(__DIR__ . '/../data/cumpleanos_enviados.json');
$mailer = new ApiEmailMailer(new EmailApiClient($emailApiUrl), $logger);
```

por:

```php
$rutaImagen = __DIR__ . '/../assets/cumpleanos.png';
$imagenBase64 = null;
if (file_exists($rutaImagen)) {
    $imagenBase64 = 'data:image/png;base64,' . base64_encode(file_get_contents($rutaImagen));
} else {
    $logger('warning', "No se encontro el asset de imagen ({$rutaImagen}); se enviara sin imagen.");
}

$repositorio = new RepositorioCumpleanos(__DIR__ . '/../data/cumpleanos.csv', $logger);
$buscador = new BuscadorCumpleanos();
$registro = new RegistroEnviados(__DIR__ . '/../data/cumpleanos_enviados.json');
$mailer = new ApiEmailMailer(new EmailApiClient($emailApiUrl), $imagenBase64, $logger);
```

- [ ] **Step 2: Verificar la sintaxis**

Run: `php -l API/MensajeriaCorreo/cron/revisar_cumpleanos.php`
Expected: `No syntax errors detected`.

- [ ] **Step 3: Modificar `examples/probar_cumpleanos.php`**

Reemplaza estas dos líneas:

```php
$repositorio = new RepositorioCumpleanos(__DIR__ . '/../data/cumpleanos.csv', $logger);
$buscador = new BuscadorCumpleanos();
$registro = new RegistroEnviados(__DIR__ . '/../data/cumpleanos_enviados.json');
$mailer = new ApiEmailMailer(new EmailApiClient($emailApiUrl), $logger);
```

por:

```php
$rutaImagen = __DIR__ . '/../assets/cumpleanos.png';
$imagenBase64 = null;
if (file_exists($rutaImagen)) {
    $imagenBase64 = 'data:image/png;base64,' . base64_encode(file_get_contents($rutaImagen));
} else {
    $logger('warning', "No se encontro el asset de imagen ({$rutaImagen}); se enviara sin imagen.");
}

$repositorio = new RepositorioCumpleanos(__DIR__ . '/../data/cumpleanos.csv', $logger);
$buscador = new BuscadorCumpleanos();
$registro = new RegistroEnviados(__DIR__ . '/../data/cumpleanos_enviados.json');
$mailer = new ApiEmailMailer(new EmailApiClient($emailApiUrl), $imagenBase64, $logger);
```

- [ ] **Step 4: Verificar la sintaxis**

Run: `php -l API/MensajeriaCorreo/examples/probar_cumpleanos.php`
Expected: `No syntax errors detected`.

- [ ] **Step 5: Probar en modo simulación**

```bash
GERENCIA_EMAIL=analistaadministrativo@fjdsas.com.co EMAIL_API_URL=https://conelec.co:2020/email_api php API/MensajeriaCorreo/examples/probar_cumpleanos.php 09-04
```

Expected: `Simulando fecha: 09-04`, `Modo: SIMULACION (sin enviar)`, una línea `[SIMULACION] Se enviaria correo a EDUARDO DAVID LOPEZ ALMARIO`, sin ningún `[error]` sobre el asset de imagen (confirma que `assets/cumpleanos.png` se encontró y se leyó bien).

- [ ] **Step 6: Correr toda la batería de pruebas del módulo para confirmar que nada se rompió**

```bash
for f in API/MensajeriaCorreo/tests/*Test.php; do echo "== $f =="; php "$f" | tail -2; done
```

Expected: todas las suites terminan en `N/N pruebas exitosas.` (ninguna con `FALLO:`).

- [ ] **Step 7: Commit**

```bash
git add API/MensajeriaCorreo/cron/revisar_cumpleanos.php API/MensajeriaCorreo/examples/probar_cumpleanos.php
git commit -m "feat(cumpleanos): incrustar la imagen del asset en los correos enviados"
```

---

### Task 6: Verificación manual — envío real solo a davlis0927@gmail.com (sin gerencia)

**⚠️ Esta task envía un correo real. `RevisorCumpleanos` siempre envía al trabajador Y a gerencia juntos cuando hay coincidencia de fecha — para esta verificación puntual se pidió enviar SOLO al trabajador, así que se llama a `ApiEmailMailer` directamente, sin pasar por `RevisorCumpleanos`, y por lo tanto sin tocar gerencia en absoluto.**

**Files:**
- Ninguno (script de verificación manual, no se commitea nada de código nuevo).

**Interfaces:**
- Consumes: `ApiEmailMailer` (Task 3), `PlantillaCumpleanos` (Task 4), el asset de imagen (Task 1).
- Produces: nada — es la verificación visual final de las tasks anteriores.

- [ ] **Step 1: Crear el script de verificación temporal**

Guarda este contenido como `scripts_tmp_probar_plantilla.php` en la raíz del repositorio (no se commitea):

```php
<?php

require_once __DIR__ . '/API/MensajeriaCorreo/bootstrap.php';

use App\Correo\Mailer\ApiEmailMailer;
use App\Correo\Mailer\CorreoException;
use App\Correo\Mailer\EmailApiClient;
use App\Correo\Templates\PlantillaCumpleanos;

$emailApiUrl = getenv('EMAIL_API_URL') ?: ($_ENV['EMAIL_API_URL'] ?? '');
if ($emailApiUrl === '') {
    exit("Falta EMAIL_API_URL en el entorno.\n");
}

$rutaImagen = __DIR__ . '/API/MensajeriaCorreo/assets/cumpleanos.png';
if (!file_exists($rutaImagen)) {
    exit("No se encontro el asset de imagen: {$rutaImagen}\n");
}
$imagenBase64 = 'data:image/png;base64,' . base64_encode(file_get_contents($rutaImagen));

$logger = function (string $nivel, string $mensaje): void {
    echo "[{$nivel}] {$mensaje}\n";
};

$mailer = new ApiEmailMailer(new EmailApiClient($emailApiUrl), $imagenBase64, $logger);

$nombre = 'EDUARDO DAVID LOPEZ ALMARIO';
$destino = 'davlis0927@gmail.com';

try {
    $mailer->enviar(
        $destino,
        PlantillaCumpleanos::asuntoTrabajador(),
        PlantillaCumpleanos::htmlTrabajador($nombre),
        PlantillaCumpleanos::textoTrabajador($nombre)
    );
    echo "Enviado correctamente a {$destino}.\n";
} catch (CorreoException $e) {
    echo 'FALLO: ' . $e->getMessage() . "\n";
    exit(1);
}
```

- [ ] **Step 2: Ejecutar el envío (solo a davlis, sin gerencia)**

```bash
EMAIL_API_URL=https://conelec.co:2020/email_api php -d curl.cainfo="C:\Program Files\Git\mingw64\etc\ssl\certs\ca-bundle.crt" scripts_tmp_probar_plantilla.php
```

Expected: `[info] Correo enviado via email_api a da********@gmail.com | asunto: 🎉 ¡Feliz cumpleaños!` y `Enviado correctamente a davlis0927@gmail.com.` — **sin ninguna línea sobre gerencia** (no se instanció ningún envío a gerencia en este script).

- [ ] **Step 3: Confirmar visualmente**

Revisa la bandeja de `davlis0927@gmail.com`: el correo debe mostrar la imagen de cumpleaños incrustada arriba, seguida de la tarjeta azul/dorada con el saludo personalizado.

- [ ] **Step 4: Borrar el script temporal**

```bash
rm scripts_tmp_probar_plantilla.php
```

(No hay commit en esta task — es solo verificación manual, ningún archivo de código se crea ni se modifica.)
