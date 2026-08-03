<?php

require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/TestHarness.php';

use App\Correo\Cumpleanos\RegistroEnviados;

$rutaJson = tempnam(sys_get_temp_dir(), 'registro_') . '.json';
if (file_exists($rutaJson)) {
    unlink($rutaJson);
}

$registro = new RegistroEnviados($rutaJson);

assertVerdadero(!$registro->yaEnviado('2026-03-15', 'ana@example.com'), 'Nada marcado todavia');

$registro->marcar('2026-03-15', 'ana@example.com');
assertVerdadero($registro->yaEnviado('2026-03-15', 'ana@example.com'), 'Se marca como enviado hoy');
assertVerdadero(!$registro->yaEnviado('2026-03-15', 'otro@example.com'), 'Otro correo distinto no queda marcado');

// --- Persiste entre instancias (nueva instancia lee del mismo archivo) ---
$registroOtraInstancia = new RegistroEnviados($rutaJson);
assertVerdadero($registroOtraInstancia->yaEnviado('2026-03-15', 'ana@example.com'), 'El marcado persiste en disco entre instancias');

// --- Un dia distinto resetea el control (no crece indefinidamente) ---
$registroOtraInstancia->marcar('2026-03-16', 'luis@example.com');
assertVerdadero(!$registroOtraInstancia->yaEnviado('2026-03-16', 'ana@example.com'), 'Ana no aparece como enviada en el nuevo dia');
assertVerdadero($registroOtraInstancia->yaEnviado('2026-03-16', 'luis@example.com'), 'Luis si queda marcado en el nuevo dia');

unlink($rutaJson);

resumenPruebas();
