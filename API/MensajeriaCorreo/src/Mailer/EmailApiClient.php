<?php

namespace App\Correo\Mailer;

/**
 * Cliente del servicio HTTP interno email_api (ver API_EMAIL.md en la raiz
 * del proyecto). Particularidades de esa API que este cliente ya maneja:
 *
 * - Siempre responde HTTP 200, incluso en error: la fuente de verdad es
 *   el campo 'status' del JSON, nunca el codigo HTTP (salvo 5xx).
 * - Si falta la configuracion SMTP en su base de datos, responde con el
 *   cuerpo vacio (0 bytes) en vez de un JSON de error.
 * - Una ruta invalida devuelve HTML (pagina 404), no JSON.
 *
 * El transporte HTTP es inyectable para poder probar sin red real.
 */
class EmailApiClient
{
    /** @var string */
    private $baseUrl;

    /** @var int */
    private $timeout;

    /** @var callable */
    private $transporte;

    /**
     * @param callable|null $transporte function(string $url, string $jsonBody, int $timeout): array{body: string|false, httpCode: int, curlErr: string}
     */
    public function __construct(string $baseUrl, int $timeout = 60, ?callable $transporte = null)
    {
        $this->baseUrl = rtrim($baseUrl, '/');
        $this->timeout = $timeout;
        $this->transporte = $transporte ?? [self::class, 'transporteCurl'];
    }

    /**
     * Envia un correo a un unico destinatario via POST /email_api/email.
     * No se piden tabla (procedure vacio) ni adjuntos: no los usa el modulo de cumpleanos.
     *
     * @throws EmailApiException
     */
    public function enviarEmail(string $asunto, string $toEmail, string $emailBody): string
    {
        $payload = [
            'asunto' => $asunto,
            'to_email' => $toEmail,
            'email_body' => $emailBody,
            'procedure' => '',
            'fields' => (object) [],
            'adjuntos' => [],
        ];

        return $this->post('/email', $payload);
    }

    /**
     * @throws EmailApiException
     */
    private function post(string $ruta, array $payload): string
    {
        $jsonBody = json_encode($payload, JSON_UNESCAPED_UNICODE);

        $respuesta = call_user_func($this->transporte, $this->baseUrl . $ruta, $jsonBody, $this->timeout);

        return $this->interpretarRespuesta($respuesta['body'], $respuesta['httpCode'], $respuesta['curlErr'], $ruta);
    }

    /**
     * @param string|false $body
     * @throws EmailApiException
     */
    private function interpretarRespuesta($body, int $httpCode, string $curlErr, string $ruta): string
    {
        if ($body === false) {
            throw new EmailApiException("Error de transporte hacia email_api{$ruta}: {$curlErr}");
        }

        if ($httpCode >= 500) {
            throw new EmailApiException("Error interno del servidor ({$httpCode}) en email_api{$ruta}");
        }

        if (trim($body) === '') {
            throw new EmailApiException(
                "Respuesta vacia de email_api{$ruta}: falta la configuracion SMTP en la base de datos. El correo no se envio."
            );
        }

        $data = json_decode($body, true);
        if (!is_array($data)) {
            throw new EmailApiException(
                "Respuesta no-JSON de email_api{$ruta} (¿ruta incorrecta o metodo no permitido?): " . substr(strip_tags((string) $body), 0, 200)
            );
        }

        if (!isset($data['status']) || $data['status'] !== 'OK') {
            $codigo = $data['error']['code'] ?? '?';
            $mensaje = $data['error']['error_msg'] ?? 'sin detalle';
            throw new EmailApiException("email_api devolvio error [{$codigo}] {$mensaje}");
        }

        $resultado = $data['result'] ?? '';

        return is_string($resultado) ? $resultado : json_encode($resultado);
    }

    /**
     * Transporte por defecto: cURL nativo, sin dependencias.
     *
     * @return array{body: string|false, httpCode: int, curlErr: string}
     */
    public static function transporteCurl(string $url, string $jsonBody, int $timeout): array
    {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
            CURLOPT_POSTFIELDS => $jsonBody,
            CURLOPT_TIMEOUT => $timeout,
        ]);

        $body = curl_exec($ch);
        $curlErr = curl_error($ch);
        $httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        return ['body' => $body, 'httpCode' => $httpCode, 'curlErr' => $curlErr];
    }
}
