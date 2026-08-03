<?php

/**
 * tests/TestHarness.php
 *
 * Helper minimo de aserciones para los scripts de prueba de este modulo.
 * No usamos PHPUnit porque el resto del modulo tampoco lo usa (ver
 * examples/probar_smtp.php): se sigue el mismo patron de scripts CLI.
 */

$GLOBALS['__pruebas_total'] = 0;
$GLOBALS['__pruebas_fallidas'] = 0;

function assertIgual($esperado, $actual, string $mensaje): void
{
    $GLOBALS['__pruebas_total']++;

    if ($esperado !== $actual) {
        $GLOBALS['__pruebas_fallidas']++;
        echo "FALLO: {$mensaje}\n";
        echo '  esperado: ' . var_export($esperado, true) . "\n";
        echo '  actual  : ' . var_export($actual, true) . "\n";
        return;
    }

    echo "OK: {$mensaje}\n";
}

function assertVerdadero(bool $condicion, string $mensaje): void
{
    assertIgual(true, $condicion, $mensaje);
}

function resumenPruebas(): void
{
    $total = $GLOBALS['__pruebas_total'];
    $fallidas = $GLOBALS['__pruebas_fallidas'];
    $exitosas = $total - $fallidas;

    echo "\n{$exitosas}/{$total} pruebas exitosas.\n";

    exit($fallidas > 0 ? 1 : 0);
}
