<?php

/**
 * cron/revisar_cumpleanos.php
 *
 * Punto de entrada para el cron de cPanel. Revisa si alguien cumple anos
 * hoy y, de ser asi, envia el correo de felicitacion y el aviso a gerencia.
 *
 * Uso (cron de cPanel, una vez al dia, ej. 00:10):
 *   php /ruta/completa/a/API/MensajeriaCorreo/cron/revisar_cumpleanos.php
 */

require_once __DIR__ . '/../bootstrap.php';

use App\Correo\Cumpleanos\BuscadorCumpleanos;
use App\Correo\Cumpleanos\RegistroEnviados;
use App\Correo\Cumpleanos\RepositorioCumpleanos;
use App\Correo\Cumpleanos\RevisorCumpleanos;
use App\Correo\Mailer\ApiEmailMailer;
use App\Correo\Mailer\CorreoException;
use App\Correo\Mailer\EmailApiClient;

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit("Este script solo se ejecuta por consola (cron).\n");
}

$correoGerencia = getenv('GERENCIA_EMAIL') ?: ($_ENV['GERENCIA_EMAIL'] ?? '');

if ($correoGerencia === '') {
    fwrite(STDERR, "Falta la variable de entorno GERENCIA_EMAIL en .env\n");
    exit(1);
}

$emailApiUrl = getenv('EMAIL_API_URL') ?: ($_ENV['EMAIL_API_URL'] ?? '');

if ($emailApiUrl === '') {
    fwrite(STDERR, "Falta la variable de entorno EMAIL_API_URL en .env\n");
    exit(1);
}

$logger = function (string $nivel, string $mensaje): void {
    echo '[' . date('Y-m-d H:i:s') . "] [{$nivel}] {$mensaje}\n";
};

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

$revisor = new RevisorCumpleanos($repositorio, $buscador, $registro, $mailer, $correoGerencia, $logger);

try {
    $resultados = $revisor->ejecutar(new DateTimeImmutable('now'));
} catch (CorreoException $e) {
    fwrite(STDERR, 'Error cargando el roster: ' . $e->getMessage() . "\n");
    exit(1);
}

if (empty($resultados)) {
    echo "Hoy nadie cumple anos.\n";
}

exit(0);
