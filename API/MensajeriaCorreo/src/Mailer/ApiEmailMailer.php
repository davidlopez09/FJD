<?php

namespace App\Correo\Mailer;

/**
 * Adaptador que envia correo via el servicio HTTP interno email_api
 * (ver API_EMAIL.md) en vez de SMTP directo.
 *
 * Extiende CorreoMailer para poder inyectarse donde se espere esa clase
 * (ej. RevisorCumpleanos) sin modificar ningun consumidor existente.
 * Intencionalmente no llama al constructor padre: no necesita ConfigProviderInterface.
 */
class ApiEmailMailer extends CorreoMailer
{
    /** @var EmailApiClient */
    private $cliente;

    /** @var string|null Data URI base64 de la imagen a incrustar en cada correo (misma imagen para todos los envios de esta instancia) */
    private $imagenBase64;

    /** @var callable|null Logger opcional: function(string $nivel, string $mensaje) */
    private $logger;

    public function __construct(EmailApiClient $cliente, ?string $imagenBase64 = null, ?callable $logger = null)
    {
        $this->cliente = $cliente;
        $this->imagenBase64 = $imagenBase64;
        $this->logger = $logger;
    }

    public function enviar(string $destinatario, string $asunto, string $cuerpoHtml, string $cuerpoTexto = ''): bool
    {
        if (!filter_var($destinatario, FILTER_VALIDATE_EMAIL)) {
            throw new CorreoException("Correo electronico de destino no valido: {$destinatario}");
        }

        try {
            $this->cliente->enviarEmail($asunto, $destinatario, $cuerpoHtml, $this->imagenBase64);
        } catch (EmailApiException $e) {
            $this->log('error', 'Fallo enviando via email_api a ' . self::enmascarar($destinatario) . ': ' . $e->getMessage());
            throw $e;
        }

        $this->log('info', 'Correo enviado via email_api a ' . self::enmascarar($destinatario) . " | asunto: {$asunto}");

        return true;
    }

    private function log(string $nivel, string $mensaje): void
    {
        if ($this->logger !== null) {
            call_user_func($this->logger, $nivel, $mensaje);
        }
    }
}
