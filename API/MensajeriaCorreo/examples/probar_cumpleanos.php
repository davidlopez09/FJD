<?php

/**
 * examples/probar_cumpleanos.php
 *
 * Simula la revision de cumpleanos para una fecha arbitraria, sin esperar
 * a que llegue un cumpleanos real. Por defecto NO envia correos (modo
 * simulacion); pasa --enviar para que si los envie de verdad.
 *
 * Uso:
 *   php examples/probar_cumpleanos.php 15-03            (simula, no envia)
 *   php examples/probar_cumpleanos.php 15-03 --enviar   (envia de verdad)
 */

require_once __DIR__ . '/../bootstrap.php';

use App\Correo\Cumpleanos\BuscadorCumpleanos;
use App\Correo\Cumpleanos\RegistroEnviados;
use App\Correo\Cumpleanos\RepositorioCumpleanos;
use App\Correo\Cumpleanos\RevisorCumpleanos;
use App\Correo\Mailer\ApiEmailMailer;
use App\Correo\Mailer\CorreoException;
use App\Correo\Mailer\CorreoMailer;
use App\Correo\Mailer\EmailApiClient;

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit("Este script solo se ejecuta por consola.\n");
}

$fechaTexto = $argv[1] ?? '';

if ($fechaTexto === '' || !preg_match('/^(\d{1,2})-(\d{1,2})$/', $fechaTexto, $m)) {
    exit("Uso: php examples/probar_cumpleanos.php DD-MM [--enviar]\n");
}

$enviarDeVerdad = in_array('--enviar', $argv, true);

$anoActual = (int) date('Y');
$fechaSimulada = sprintf('%04d-%02d-%02d', $anoActual, (int) $m[2], (int) $m[1]);
$hoySimulado = DateTimeImmutable::createFromFormat('Y-m-d', $fechaSimulada);

if ($hoySimulado === false) {
    exit("Fecha invalida: {$fechaTexto}\n");
}

echo 'Simulando fecha: ' . $hoySimulado->format('d-m') . "\n";
echo 'Modo: ' . ($enviarDeVerdad ? 'ENVIO REAL' : 'SIMULACION (sin enviar)') . "\n\n";

$correoGerencia = getenv('GERENCIA_EMAIL') ?: ($_ENV['GERENCIA_EMAIL'] ?? '');
$emailApiUrl = getenv('EMAIL_API_URL') ?: ($_ENV['EMAIL_API_URL'] ?? '');

$logger = function (string $nivel, string $mensaje): void {
    echo "[{$nivel}] {$mensaje}\n";
};

$repositorio = new RepositorioCumpleanos(__DIR__ . '/../data/cumpleanos.csv', $logger);
$buscador = new BuscadorCumpleanos();
$registro = new RegistroEnviados(__DIR__ . '/../data/cumpleanos_enviados.json');
$mailer = new ApiEmailMailer(new EmailApiClient($emailApiUrl), $logger);

$revisor = new RevisorCumpleanos($repositorio, $buscador, $registro, $mailer, $correoGerencia, $logger);

try {
    $resultados = $revisor->ejecutar($hoySimulado, !$enviarDeVerdad);
} catch (CorreoException $e) {
    echo 'FALLO: ' . $e->getMessage() . "\n";
    exit(1);
}

if (empty($resultados)) {
    echo "Nadie cumple anos en esa fecha.\n";
    exit(0);
}

foreach ($resultados as $r) {
    echo "- {$r['nombre']} <" . CorreoMailer::enmascarar($r['correo']) . '> '
        . 'trabajador=' . ($r['enviadoTrabajador'] ? 'OK' : 'no')
        . ' gerencia=' . ($r['enviadoGerencia'] ? 'OK' : 'no') . "\n";
}
