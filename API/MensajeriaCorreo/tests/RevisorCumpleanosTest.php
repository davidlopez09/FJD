<?php

require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/TestHarness.php';
require_once __DIR__ . '/Dobles/MailerFalso.php';

use App\Correo\Cumpleanos\BuscadorCumpleanos;
use App\Correo\Cumpleanos\RegistroEnviados;
use App\Correo\Cumpleanos\RepositorioCumpleanos;
use App\Correo\Cumpleanos\RevisorCumpleanos;
use App\Correo\Tests\Dobles\MailerFalso;

function crearCsvTemporalRevisor(string $contenido): string
{
    $ruta = tempnam(sys_get_temp_dir(), 'roster_');
    file_put_contents($ruta, $contenido);
    return $ruta;
}

function nuevaRutaRegistro(): string
{
    $ruta = tempnam(sys_get_temp_dir(), 'registro_') . '.json';
    if (file_exists($ruta)) {
        unlink($ruta);
    }
    return $ruta;
}

// --- Caso 1: encuentra coincidencia y envia a trabajador y gerencia ---
$rutaCsv = crearCsvTemporalRevisor(
    "nombre,correo,dia,mes\n" .
    "Ana Torres,ana@example.com,15,MARZO\n" .
    "Luis Rios,luis@example.com,20,ABRIL\n"
);
$rutaRegistro = nuevaRutaRegistro();

$mailer = new MailerFalso();
$revisor = new RevisorCumpleanos(
    new RepositorioCumpleanos($rutaCsv),
    new BuscadorCumpleanos(),
    new RegistroEnviados($rutaRegistro),
    $mailer,
    'gerencia@example.com'
);

$hoy = new \DateTimeImmutable('2026-03-15');
$resultados = $revisor->ejecutar($hoy);

assertIgual(1, count($resultados), 'Encuentra exactamente un cumpleanero el 15 de marzo');
assertIgual('Ana Torres', $resultados[0]['nombre'], 'El cumpleanero encontrado es Ana Torres');
assertVerdadero($resultados[0]['enviadoTrabajador'], 'Se marca como enviado al trabajador');
assertVerdadero($resultados[0]['enviadoGerencia'], 'Se marca como enviado a gerencia');
assertIgual(2, count($mailer->enviados), 'Se enviaron 2 correos (trabajador + gerencia)');
assertIgual('ana@example.com', $mailer->enviados[0]['destinatario'], 'El primer correo va al trabajador');
assertIgual('gerencia@example.com', $mailer->enviados[1]['destinatario'], 'El segundo correo va a gerencia');

// --- Caso 2: si se ejecuta de nuevo el mismo dia, no reenvia (idempotencia) ---
$mailer2 = new MailerFalso();
$revisor2 = new RevisorCumpleanos(
    new RepositorioCumpleanos($rutaCsv),
    new BuscadorCumpleanos(),
    new RegistroEnviados($rutaRegistro),
    $mailer2,
    'gerencia@example.com'
);
$resultados2 = $revisor2->ejecutar($hoy);

assertIgual(0, count($mailer2->enviados), 'Segunda corrida el mismo dia no reenvia nada');

// --- Caso 3: nadie cumple anos esa fecha ---
$mailer3 = new MailerFalso();
$revisor3 = new RevisorCumpleanos(
    new RepositorioCumpleanos($rutaCsv),
    new BuscadorCumpleanos(),
    new RegistroEnviados($rutaRegistro),
    $mailer3,
    'gerencia@example.com'
);
$resultados3 = $revisor3->ejecutar(new \DateTimeImmutable('2026-01-01'));

assertIgual(0, count($resultados3), 'Ningun cumpleanero el 1 de enero');
assertIgual(0, count($mailer3->enviados), 'No se envia nada si no hay coincidencias');

// --- Caso 4: modo simulacion no envia correos ni marca el registro ---
$rutaRegistroSim = nuevaRutaRegistro();
$mailer4 = new MailerFalso();
$revisor4 = new RevisorCumpleanos(
    new RepositorioCumpleanos($rutaCsv),
    new BuscadorCumpleanos(),
    new RegistroEnviados($rutaRegistroSim),
    $mailer4,
    'gerencia@example.com'
);
$resultados4 = $revisor4->ejecutar($hoy, true);

assertIgual(0, count($mailer4->enviados), 'Modo simulacion no llama al mailer');
assertVerdadero(!file_exists($rutaRegistroSim), 'Modo simulacion no crea el archivo de registro');

// --- Caso 5: fallo al enviar a un trabajador no bloquea a los demas ni marca el registro ---
$rutaCsvDos = crearCsvTemporalRevisor(
    "nombre,correo,dia,mes\n" .
    "Fallara Perez,fallara@example.com,10,MAYO\n" .
    "Exitosa Gomez,exitosa@example.com,10,MAYO\n"
);
$rutaRegistroDos = nuevaRutaRegistro();
$mailer5 = new MailerFalso();
$mailer5->fallarPara[] = 'fallara@example.com';
$revisor5 = new RevisorCumpleanos(
    new RepositorioCumpleanos($rutaCsvDos),
    new BuscadorCumpleanos(),
    new RegistroEnviados($rutaRegistroDos),
    $mailer5,
    'gerencia@example.com'
);
$resultados5 = $revisor5->ejecutar(new \DateTimeImmutable('2026-05-10'));

assertIgual(2, count($resultados5), 'Ambas coincidencias se procesan aunque una falle');
assertVerdadero(!$resultados5[0]['enviadoTrabajador'], 'El envio fallido queda marcado como no enviado');
assertVerdadero($resultados5[1]['enviadoTrabajador'], 'El segundo trabajador si recibe su correo');

unlink($rutaCsv);
unlink($rutaCsvDos);
if (file_exists($rutaRegistro)) {
    unlink($rutaRegistro);
}
if (file_exists($rutaRegistroDos)) {
    unlink($rutaRegistroDos);
}

resumenPruebas();
