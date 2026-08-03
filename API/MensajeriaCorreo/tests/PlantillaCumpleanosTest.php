<?php

require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/TestHarness.php';

use App\Correo\Templates\PlantillaCumpleanos;

$html = PlantillaCumpleanos::htmlTrabajador('Ana <Torres>');
assertVerdadero(strpos($html, '&lt;Torres&gt;') !== false, 'El nombre del trabajador se escapa en el HTML');
assertVerdadero(strpos($html, 'Ana') !== false, 'El HTML incluye el nombre del trabajador');

$texto = PlantillaCumpleanos::textoTrabajador('Ana Torres');
assertVerdadero(strpos($texto, 'Ana Torres') !== false, 'El texto plano incluye el nombre del trabajador');

$asuntoTrabajador = PlantillaCumpleanos::asuntoTrabajador();
assertVerdadero($asuntoTrabajador !== '', 'El asunto para el trabajador no esta vacio');

$htmlGerencia = PlantillaCumpleanos::htmlGerencia('Luis <Rios>');
assertVerdadero(strpos($htmlGerencia, '&lt;Rios&gt;') !== false, 'El nombre en el aviso a gerencia se escapa');

$textoGerencia = PlantillaCumpleanos::textoGerencia('Luis Rios');
assertVerdadero(strpos($textoGerencia, 'Luis Rios') !== false, 'El texto a gerencia incluye el nombre del cumpleanero');

$asuntoGerencia = PlantillaCumpleanos::asuntoGerencia();
assertVerdadero($asuntoGerencia !== '', 'El asunto para gerencia no esta vacio');

resumenPruebas();
