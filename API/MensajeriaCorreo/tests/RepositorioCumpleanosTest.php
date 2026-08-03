<?php

require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/TestHarness.php';

use App\Correo\Cumpleanos\RepositorioCumpleanos;
use App\Correo\Mailer\CorreoException;

function crearCsvTemporalRepo(string $contenido): string
{
    $ruta = tempnam(sys_get_temp_dir(), 'roster_');
    file_put_contents($ruta, $contenido);
    return $ruta;
}

// --- Caso 1: carga filas validas, con mes como nombre en espanol ---
$ruta = crearCsvTemporalRepo(
    "nombre,correo,dia,mes\n" .
    "Ana Torres,ana@example.com,15,MARZO\n" .
    "Luis Rios,luis@example.com,3,Febrero\n"
);
$registros = (new RepositorioCumpleanos($ruta))->cargar();

assertIgual(2, count($registros), 'Carga las dos filas validas');
assertIgual('Ana Torres', $registros[0]['nombre'], 'Nombre de la primera fila');
assertIgual(15, $registros[0]['dia'], 'Dia de la primera fila');
assertIgual(3, $registros[0]['mes'], 'MARZO se traduce a mes 3');
assertIgual(2, $registros[1]['mes'], 'Febrero (con minuscula) se traduce a mes 2');
unlink($ruta);

// --- Caso 2: acepta el mes como numero ---
$ruta2 = crearCsvTemporalRepo("nombre,correo,dia,mes\nJuan Perez,juan@example.com,9,4\n");
$registros2 = (new RepositorioCumpleanos($ruta2))->cargar();
assertIgual(4, $registros2[0]['mes'], 'Mes numerico se respeta tal cual');
unlink($ruta2);

// --- Caso 3: omite filas invalidas sin tumbar la carga completa ---
$mensajesLog = [];
$ruta3 = crearCsvTemporalRepo(
    "nombre,correo,dia,mes\n" .
    "Sin Correo,no-es-un-correo,10,MAYO\n" .
    "Sin Dia,valido@example.com,99,MAYO\n" .
    "Mes Invalido,valido2@example.com,10,MESQUENOEXISTE\n" .
    "Valida Perez,valida@example.com,10,MAYO\n"
);
$repositorio3 = new RepositorioCumpleanos($ruta3, function (string $nivel, string $mensaje) use (&$mensajesLog) {
    $mensajesLog[] = $mensaje;
});
$registros3 = $repositorio3->cargar();

assertIgual(1, count($registros3), 'Solo la fila valida sobrevive');
assertIgual('Valida Perez', $registros3[0]['nombre'], 'La fila que sobrevive es la valida');
assertIgual(3, count($mensajesLog), 'Se registraron las 3 filas invalidas en el log');
unlink($ruta3);

// --- Caso 4: archivo inexistente lanza CorreoException ---
$lanzo = false;
try {
    (new RepositorioCumpleanos(sys_get_temp_dir() . '/no_existe_' . uniqid() . '.csv'))->cargar();
} catch (CorreoException $e) {
    $lanzo = true;
}
assertVerdadero($lanzo, 'Archivo inexistente lanza CorreoException');

resumenPruebas();
