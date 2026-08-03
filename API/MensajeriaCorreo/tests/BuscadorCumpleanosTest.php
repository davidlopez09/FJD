<?php

require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/TestHarness.php';

use App\Correo\Cumpleanos\BuscadorCumpleanos;

$roster = [
    ['nombre' => 'Ana Torres', 'correo' => 'ana@example.com', 'dia' => 15, 'mes' => 3],
    ['nombre' => 'Luis Rios', 'correo' => 'luis@example.com', 'dia' => 20, 'mes' => 4],
    ['nombre' => 'Eva Diaz', 'correo' => 'eva@example.com', 'dia' => 15, 'mes' => 3],
];

$buscador = new BuscadorCumpleanos();

$coincidencias = $buscador->buscar($roster, 15, 3);
assertIgual(2, count($coincidencias), 'Encuentra a los dos que cumplen anos el 15 de marzo');
assertIgual('Ana Torres', $coincidencias[0]['nombre'], 'El primer resultado es Ana Torres');
assertIgual('Eva Diaz', $coincidencias[1]['nombre'], 'El segundo resultado es Eva Diaz');

$sinCoincidencias = $buscador->buscar($roster, 1, 1);
assertIgual(0, count($sinCoincidencias), 'No hay coincidencias el 1 de enero');

assertIgual(0, count($buscador->buscar([], 15, 3)), 'Roster vacio no produce coincidencias');

resumenPruebas();
