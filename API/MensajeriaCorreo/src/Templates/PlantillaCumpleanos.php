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
        <p style="font-size:15px; letter-spacing:1px; text-transform:uppercase; color:{$colorAcento}; font-weight:bold; margin:0 0 8px;">🎉 Hoy es tu día 🎉</p>
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

    /**
     * Nota: hoy no se entrega — ApiEmailMailer no reenvia el texto plano a email_api (sin AltBody, ver API_EMAIL.md).
     */
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

    /**
     * Nota: hoy no se entrega — ApiEmailMailer no reenvia el texto plano a email_api (sin AltBody, ver API_EMAIL.md).
     */
    public static function textoGerencia(string $nombreCumpleanero): string
    {
        return "🎂 Hoy cumple años {$nombreCumpleanero}.\n\n"
            . "Recordatorio automático para que el equipo de gerencia se una a la celebración y le extienda una felicitación.";
    }
}
