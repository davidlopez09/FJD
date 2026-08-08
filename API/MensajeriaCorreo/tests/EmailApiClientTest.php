<?php

require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/TestHarness.php';

use App\Correo\Mailer\EmailApiClient;
use App\Correo\Mailer\EmailApiException;

function transporteFalso(array $respuesta): callable
{
    return function (string $url, string $jsonBody, int $timeout) use ($respuesta) {
        return $respuesta;
    };
}

// --- Caso 1: respuesta exitosa devuelve el 'result' ---
$cliente1 = new EmailApiClient('https://conelec.co:2020/email_api', 60, transporteFalso([
    'body' => '{"status":"OK","result":"Email enviado Correctamente","error":{"code":"","message":""}}',
    'httpCode' => 200,
    'curlErr' => '',
]));
$resultado1 = $cliente1->enviarEmail('Asunto', 'destino@example.com', '<p>hola</p>');
assertIgual('Email enviado Correctamente', $resultado1, 'Devuelve el result cuando status es OK');

// --- Caso 2: envelope de error (status failed) lanza EmailApiException con el mensaje del servidor ---
$cliente2 = new EmailApiClient('https://conelec.co:2020/email_api', 60, transporteFalso([
    'body' => '{"status":"failed","result":[],"error":{"code":501,"error_msg":"Hubo un error al enviar el correo: SMTP Error"}}',
    'httpCode' => 200,
    'curlErr' => '',
]));
$lanzo2 = false;
$mensaje2 = '';
try {
    $cliente2->enviarEmail('Asunto', 'destino@example.com', '<p>hola</p>');
} catch (EmailApiException $e) {
    $lanzo2 = true;
    $mensaje2 = $e->getMessage();
}
assertVerdadero($lanzo2, 'Envelope de error lanza EmailApiException');
assertVerdadero(strpos($mensaje2, 'SMTP Error') !== false, 'El mensaje de la excepcion incluye el detalle del servidor');

// --- Caso 3: cuerpo vacio (falta configuracion SMTP en BD) lanza EmailApiException ---
$cliente3 = new EmailApiClient('https://conelec.co:2020/email_api', 60, transporteFalso([
    'body' => '',
    'httpCode' => 200,
    'curlErr' => '',
]));
$lanzo3 = false;
try {
    $cliente3->enviarEmail('Asunto', 'destino@example.com', '<p>hola</p>');
} catch (EmailApiException $e) {
    $lanzo3 = true;
}
assertVerdadero($lanzo3, 'Cuerpo vacio lanza EmailApiException');

// --- Caso 4: respuesta HTML (ruta 404 del servidor) lanza EmailApiException ---
$cliente4 = new EmailApiClient('https://conelec.co:2020/email_api', 60, transporteFalso([
    'body' => '<!DOCTYPE html><html><body>404</body></html>',
    'httpCode' => 200,
    'curlErr' => '',
]));
$lanzo4 = false;
try {
    $cliente4->enviarEmail('Asunto', 'destino@example.com', '<p>hola</p>');
} catch (EmailApiException $e) {
    $lanzo4 = true;
}
assertVerdadero($lanzo4, 'Respuesta HTML no-JSON lanza EmailApiException');

// --- Caso 5: error de transporte (curl fallo) lanza EmailApiException ---
$cliente5 = new EmailApiClient('https://conelec.co:2020/email_api', 60, transporteFalso([
    'body' => false,
    'httpCode' => 0,
    'curlErr' => 'Connection timed out',
]));
$lanzo5 = false;
try {
    $cliente5->enviarEmail('Asunto', 'destino@example.com', '<p>hola</p>');
} catch (EmailApiException $e) {
    $lanzo5 = true;
}
assertVerdadero($lanzo5, 'Fallo de transporte (curl) lanza EmailApiException');

// --- Caso 6: HTTP 5xx lanza EmailApiException ---
$cliente6 = new EmailApiClient('https://conelec.co:2020/email_api', 60, transporteFalso([
    'body' => 'Internal Server Error',
    'httpCode' => 500,
    'curlErr' => '',
]));
$lanzo6 = false;
try {
    $cliente6->enviarEmail('Asunto', 'destino@example.com', '<p>hola</p>');
} catch (EmailApiException $e) {
    $lanzo6 = true;
}
assertVerdadero($lanzo6, 'HTTP 5xx lanza EmailApiException');

// --- Caso 7: el payload enviado usa el mapa de campos correcto (asunto, to_email, email_body, procedure, fields, adjuntos) ---
$payloadCapturado = null;
$transporteCapturador = function (string $url, string $jsonBody, int $timeout) use (&$payloadCapturado) {
    $payloadCapturado = json_decode($jsonBody, true);
    return [
        'body' => '{"status":"OK","result":"Email enviado Correctamente","error":{"code":"","message":""}}',
        'httpCode' => 200,
        'curlErr' => '',
    ];
};
$cliente7 = new EmailApiClient('https://conelec.co:2020/email_api', 60, $transporteCapturador);
$cliente7->enviarEmail('Feliz cumpleanos', 'ana@example.com', '<p>hola Ana</p>');

assertIgual('Feliz cumpleanos', $payloadCapturado['asunto'], 'El payload envia el asunto correcto');
assertIgual('ana@example.com', $payloadCapturado['to_email'], 'El payload envia el destinatario correcto');
assertIgual('<p>hola Ana</p>', $payloadCapturado['email_body'], 'El payload envia el cuerpo HTML correcto');
assertIgual('', $payloadCapturado['procedure'], 'El payload no pide tabla (procedure vacio)');
assertVerdadero(isset($payloadCapturado['adjuntos']) && $payloadCapturado['adjuntos'] === [], 'El payload no incluye adjuntos');

// --- Caso 8: cuando se pasa una imagen, el payload incluye la clave 'image' ---
$payloadConImagen = null;
$transporteCapturadorImagen = function (string $url, string $jsonBody, int $timeout) use (&$payloadConImagen) {
    $payloadConImagen = json_decode($jsonBody, true);
    return [
        'body' => '{"status":"OK","result":"Email enviado Correctamente","error":{"code":"","message":""}}',
        'httpCode' => 200,
        'curlErr' => '',
    ];
};
$cliente8 = new EmailApiClient('https://conelec.co:2020/email_api', 60, $transporteCapturadorImagen);
$cliente8->enviarEmail('Asunto', 'ana@example.com', '<p>hola</p>', 'data:image/png;base64,AAAA');
assertVerdadero(isset($payloadConImagen['image']), 'El payload incluye la clave image cuando se pasa una imagen');
assertIgual('data:image/png;base64,AAAA', $payloadConImagen['image'], 'El payload envia la imagen exacta que se paso');

// --- Caso 9: sin imagen, el payload no incluye la clave 'image' ---
$payloadSinImagen = ['image' => 'no debe sobrevivir'];
$transporteCapturadorSinImagen = function (string $url, string $jsonBody, int $timeout) use (&$payloadSinImagen) {
    $payloadSinImagen = json_decode($jsonBody, true);
    return [
        'body' => '{"status":"OK","result":"Email enviado Correctamente","error":{"code":"","message":""}}',
        'httpCode' => 200,
        'curlErr' => '',
    ];
};
$cliente9 = new EmailApiClient('https://conelec.co:2020/email_api', 60, $transporteCapturadorSinImagen);
$cliente9->enviarEmail('Asunto', 'ana@example.com', '<p>hola</p>');
assertVerdadero(!isset($payloadSinImagen['image']), 'El payload no incluye la clave image cuando no se pasa imagen');

resumenPruebas();
