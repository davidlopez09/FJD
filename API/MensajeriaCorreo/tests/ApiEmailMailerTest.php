<?php

require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/TestHarness.php';

use App\Correo\Mailer\ApiEmailMailer;
use App\Correo\Mailer\CorreoException;
use App\Correo\Mailer\EmailApiClient;
use App\Correo\Mailer\EmailApiException;

function transporteFalsoMailer(array $respuesta): callable
{
    return function (string $url, string $jsonBody, int $timeout) use ($respuesta) {
        return $respuesta;
    };
}

// --- Caso 1: envio exitoso devuelve true y usa el cliente correctamente ---
$cliente1 = new EmailApiClient('https://conelec.co:2020/email_api', 60, transporteFalsoMailer([
    'body' => '{"status":"OK","result":"Email enviado Correctamente","error":{"code":"","message":""}}',
    'httpCode' => 200,
    'curlErr' => '',
]));
$mailer1 = new ApiEmailMailer($cliente1);
$resultado1 = $mailer1->enviar('ana@example.com', 'Feliz cumpleanos', '<p>hola Ana</p>');
assertVerdadero($resultado1, 'enviar() devuelve true cuando la API responde OK');

// --- Caso 2: destinatario invalido lanza CorreoException sin llamar a la API ---
$llamadas2 = 0;
$cliente2 = new EmailApiClient('https://conelec.co:2020/email_api', 60, function () use (&$llamadas2) {
    $llamadas2++;
    return ['body' => '{"status":"OK","result":"x","error":{"code":"","message":""}}', 'httpCode' => 200, 'curlErr' => ''];
});
$mailer2 = new ApiEmailMailer($cliente2);
$lanzo2 = false;
try {
    $mailer2->enviar('no-es-un-correo', 'Asunto', '<p>hola</p>');
} catch (CorreoException $e) {
    $lanzo2 = true;
}
assertVerdadero($lanzo2, 'Destinatario invalido lanza CorreoException');
assertIgual(0, $llamadas2, 'No se llama a la API si el destinatario es invalido');

// --- Caso 3: fallo de la API se propaga como CorreoException (RevisorCumpleanos ya sabe capturarla) ---
$cliente3 = new EmailApiClient('https://conelec.co:2020/email_api', 60, transporteFalsoMailer([
    'body' => '{"status":"failed","result":[],"error":{"code":501,"error_msg":"Hubo un error al enviar el correo: SMTP Error"}}',
    'httpCode' => 200,
    'curlErr' => '',
]));
$mailer3 = new ApiEmailMailer($cliente3);
$lanzo3 = false;
try {
    $mailer3->enviar('ana@example.com', 'Asunto', '<p>hola</p>');
} catch (EmailApiException $e) {
    $lanzo3 = true;
} catch (CorreoException $e) {
    $lanzo3 = true;
}
assertVerdadero($lanzo3, 'Fallo de la API se propaga como CorreoException (EmailApiException es subclase)');

// --- Caso 4: el cuerpo de texto plano se ignora sin error (la API no soporta AltBody) ---
$cliente4 = new EmailApiClient('https://conelec.co:2020/email_api', 60, transporteFalsoMailer([
    'body' => '{"status":"OK","result":"Email enviado Correctamente","error":{"code":"","message":""}}',
    'httpCode' => 200,
    'curlErr' => '',
]));
$mailer4 = new ApiEmailMailer($cliente4);
$resultado4 = $mailer4->enviar('ana@example.com', 'Asunto', '<p>html</p>', 'texto plano ignorado');
assertVerdadero($resultado4, 'Pasar cuerpoTexto no rompe el envio aunque la API lo ignore');

// --- Caso 6: la imagen fija del constructor se reenvia en cada llamada a enviarEmail() ---
$imagenPayload = null;
$transporteCapturadorImagenMailer = function (string $url, string $jsonBody, int $timeout) use (&$imagenPayload) {
    $imagenPayload = json_decode($jsonBody, true);
    return [
        'body' => '{"status":"OK","result":"Email enviado Correctamente","error":{"code":"","message":""}}',
        'httpCode' => 200,
        'curlErr' => '',
    ];
};
$cliente6 = new EmailApiClient('https://conelec.co:2020/email_api', 60, $transporteCapturadorImagenMailer);
$mailer6 = new ApiEmailMailer($cliente6, 'data:image/png;base64,BBBB');
$mailer6->enviar('ana@example.com', 'Asunto', '<p>hola</p>');
assertIgual('data:image/png;base64,BBBB', $imagenPayload['image'], 'La imagen fija del constructor se envia en el payload');

// --- Caso 7: sin imagen en el constructor, el payload no incluye la clave image ---
$sinImagenPayload = ['image' => 'no debe sobrevivir'];
$transporteCapturadorSinImagenMailer = function (string $url, string $jsonBody, int $timeout) use (&$sinImagenPayload) {
    $sinImagenPayload = json_decode($jsonBody, true);
    return [
        'body' => '{"status":"OK","result":"Email enviado Correctamente","error":{"code":"","message":""}}',
        'httpCode' => 200,
        'curlErr' => '',
    ];
};
$cliente7 = new EmailApiClient('https://conelec.co:2020/email_api', 60, $transporteCapturadorSinImagenMailer);
$mailer7 = new ApiEmailMailer($cliente7);
$mailer7->enviar('ana@example.com', 'Asunto', '<p>hola</p>');
assertVerdadero(!isset($sinImagenPayload['image']), 'Sin imagen en el constructor, el payload no incluye la clave image');

resumenPruebas();
