<?php

namespace App\Correo\Templates;

/**
 * Plantillas de correo para el aviso automatico de cumpleanos:
 * felicitacion al trabajador (tono calido) y aviso a gerencia.
 */
class PlantillaCumpleanos
{
    /** @var string Color principal de la marca */
    const COLOR_MARCA = '#1c44ed';

    public static function asuntoTrabajador(): string
    {
        return '¡Feliz cumpleaños!';
    }

    public static function htmlTrabajador(string $nombre): string
    {
        $nombreSeguro = htmlspecialchars($nombre, ENT_QUOTES, 'UTF-8');
        $color = self::COLOR_MARCA;

        return <<<HTML
<div style="font-family:Arial,Helvetica,sans-serif; color:#333; max-width:520px;">
    <h2 style="color:{$color}; margin-bottom:10px;">¡Feliz cumpleaños, {$nombreSeguro}!</h2>

    <p>Hoy es tu día especial y todo el equipo quiere desearte un cumpleaños lleno de alegría.</p>

    <p>Gracias por ser parte de este equipo. ¡Que tengas un excelente día!</p>

    <p style="margin-top:20px;">Con cariño,<br>Tu equipo</p>
</div>
HTML;
    }

    public static function textoTrabajador(string $nombre): string
    {
        return "¡Feliz cumpleaños, {$nombre}!\n\n"
            . "Hoy es tu día especial y todo el equipo quiere desearte un cumpleaños lleno de alegría.\n"
            . "Gracias por ser parte de este equipo. ¡Que tengas un excelente día!\n\n"
            . "Con cariño,\nTu equipo";
    }

    public static function asuntoGerencia(): string
    {
        return 'Aviso de cumpleaños';
    }

    public static function htmlGerencia(string $nombreCumpleanero): string
    {
        $nombreSeguro = htmlspecialchars($nombreCumpleanero, ENT_QUOTES, 'UTF-8');
        $color = self::COLOR_MARCA;

        return <<<HTML
<div style="font-family:Arial,Helvetica,sans-serif; color:#333; max-width:520px;">
    <h2 style="color:{$color}; margin-bottom:10px;">Hoy cumple años {$nombreSeguro}</h2>

    <p>Este es un recordatorio automático para que el equipo de gerencia pueda felicitar a {$nombreSeguro} en su cumpleaños.</p>
</div>
HTML;
    }

    public static function textoGerencia(string $nombreCumpleanero): string
    {
        return "Hoy cumple años {$nombreCumpleanero}.\n\n"
            . "Recordatorio automático para que el equipo de gerencia pueda felicitarle.";
    }
}
