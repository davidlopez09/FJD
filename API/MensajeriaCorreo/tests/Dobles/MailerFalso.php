<?php

namespace App\Correo\Tests\Dobles;

use App\Correo\Mailer\CorreoException;
use App\Correo\Mailer\CorreoMailer;

/**
 * Doble de prueba de CorreoMailer: no hace ninguna conexion SMTP real.
 * Registra los correos "enviados" en memoria para poder verificarlos
 * en las pruebas de RevisorCumpleanos.
 */
class MailerFalso extends CorreoMailer
{
    /** @var array<int, array{destinatario:string, asunto:string}> */
    public $enviados = [];

    /** @var string[] Direcciones para las que enviar() debe lanzar CorreoException */
    public $fallarPara = [];

    public function __construct()
    {
        // Intencional: no llama al constructor padre, no necesita config SMTP real.
    }

    public function enviar(string $destinatario, string $asunto, string $cuerpoHtml, string $cuerpoTexto = ''): bool
    {
        if (in_array($destinatario, $this->fallarPara, true)) {
            throw new CorreoException("Fallo simulado enviando a {$destinatario}");
        }

        $this->enviados[] = ['destinatario' => $destinatario, 'asunto' => $asunto];

        return true;
    }
}
