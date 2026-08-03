<?php

namespace App\Correo\Cumpleanos;

/**
 * Control de duplicados: recuerda a quien ya se le envio correo HOY,
 * para que un cron que corra dos veces el mismo dia no reenvie.
 *
 * Guarda solo la ultima fecha vista (no una lista que crece para siempre):
 * al cambiar de fecha, el control se reinicia.
 */
class RegistroEnviados
{
    /** @var string */
    private $rutaJson;

    public function __construct(string $rutaJson)
    {
        $this->rutaJson = $rutaJson;
    }

    public function yaEnviado(string $fecha, string $correo): bool
    {
        $registro = $this->leer();

        if ($registro['fecha'] !== $fecha) {
            return false;
        }

        return in_array($correo, $registro['correos'], true);
    }

    public function marcar(string $fecha, string $correo): void
    {
        $registro = $this->leer();

        if ($registro['fecha'] !== $fecha) {
            $registro = ['fecha' => $fecha, 'correos' => []];
        }

        if (!in_array($correo, $registro['correos'], true)) {
            $registro['correos'][] = $correo;
        }

        $this->guardar($registro);
    }

    /** @return array{fecha:string, correos:string[]} */
    private function leer(): array
    {
        if (!file_exists($this->rutaJson)) {
            return ['fecha' => '', 'correos' => []];
        }

        $contenido = file_get_contents($this->rutaJson);
        $datos = json_decode((string) $contenido, true);

        if (!is_array($datos) || !isset($datos['fecha'], $datos['correos'])) {
            return ['fecha' => '', 'correos' => []];
        }

        return $datos;
    }

    /** @param array{fecha:string, correos:string[]} $registro */
    private function guardar(array $registro): void
    {
        file_put_contents($this->rutaJson, json_encode($registro, JSON_PRETTY_PRINT), LOCK_EX);
    }
}
