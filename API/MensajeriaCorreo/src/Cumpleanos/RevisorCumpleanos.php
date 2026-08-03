<?php

namespace App\Correo\Cumpleanos;

use App\Correo\Mailer\CorreoException;
use App\Correo\Mailer\CorreoMailer;
use App\Correo\Templates\PlantillaCumpleanos;
use DateTimeImmutable;

/**
 * Orquesta la revision diaria: carga el roster, busca coincidencias con
 * "hoy", y envia el correo de felicitacion al trabajador y el aviso a
 * gerencia, evitando reenvios el mismo dia via RegistroEnviados.
 */
class RevisorCumpleanos
{
    /** @var RepositorioCumpleanos */
    private $repositorio;

    /** @var BuscadorCumpleanos */
    private $buscador;

    /** @var RegistroEnviados */
    private $registro;

    /** @var CorreoMailer */
    private $mailer;

    /** @var string */
    private $correoGerencia;

    /** @var callable|null */
    private $logger;

    public function __construct(
        RepositorioCumpleanos $repositorio,
        BuscadorCumpleanos $buscador,
        RegistroEnviados $registro,
        CorreoMailer $mailer,
        string $correoGerencia,
        ?callable $logger = null
    ) {
        $this->repositorio = $repositorio;
        $this->buscador = $buscador;
        $this->registro = $registro;
        $this->mailer = $mailer;
        $this->correoGerencia = $correoGerencia;
        $this->logger = $logger;
    }

    /**
     * @return array<int, array{nombre:string, correo:string, enviadoTrabajador:bool, enviadoGerencia:bool}>
     */
    public function ejecutar(DateTimeImmutable $hoy, bool $simular = false): array
    {
        $fechaClave = $hoy->format('Y-m-d');
        $roster = $this->repositorio->cargar();
        $coincidencias = $this->buscador->buscar($roster, (int) $hoy->format('j'), (int) $hoy->format('n'));

        $resultados = [];

        foreach ($coincidencias as $persona) {
            $resultado = [
                'nombre' => $persona['nombre'],
                'correo' => $persona['correo'],
                'enviadoTrabajador' => false,
                'enviadoGerencia' => false,
            ];

            if ($this->registro->yaEnviado($fechaClave, $persona['correo'])) {
                $this->log('info', "Omitido (ya enviado hoy): {$persona['nombre']}");
                $resultados[] = $resultado;
                continue;
            }

            if ($simular) {
                $this->log('info', "[SIMULACION] Se enviaria correo a {$persona['nombre']}");
                $resultados[] = $resultado;
                continue;
            }

            try {
                $this->mailer->enviar(
                    $persona['correo'],
                    PlantillaCumpleanos::asuntoTrabajador(),
                    PlantillaCumpleanos::htmlTrabajador($persona['nombre']),
                    PlantillaCumpleanos::textoTrabajador($persona['nombre'])
                );
                $resultado['enviadoTrabajador'] = true;
            } catch (CorreoException $e) {
                $this->log('error', "Fallo enviando felicitacion a {$persona['nombre']}: " . $e->getMessage());
            }

            try {
                $this->mailer->enviar(
                    $this->correoGerencia,
                    PlantillaCumpleanos::asuntoGerencia(),
                    PlantillaCumpleanos::htmlGerencia($persona['nombre']),
                    PlantillaCumpleanos::textoGerencia($persona['nombre'])
                );
                $resultado['enviadoGerencia'] = true;
            } catch (CorreoException $e) {
                $this->log('error', "Fallo enviando aviso a gerencia por {$persona['nombre']}: " . $e->getMessage());
            }

            if ($resultado['enviadoTrabajador']) {
                $this->registro->marcar($fechaClave, $persona['correo']);
            }

            $resultados[] = $resultado;
        }

        return $resultados;
    }

    private function log(string $nivel, string $mensaje): void
    {
        if ($this->logger !== null) {
            call_user_func($this->logger, $nivel, $mensaje);
        }
    }
}
