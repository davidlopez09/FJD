<?php

namespace App\Correo\Cumpleanos;

use App\Correo\Mailer\CorreoException;

/**
 * Lee el roster de cumpleanos desde un CSV: columnas nombre,correo,dia,mes.
 * El mes acepta numero (1-12) o nombre en espanol (ENERO..DICIEMBRE).
 */
class RepositorioCumpleanos
{
    /** @var string */
    private $rutaCsv;

    /** @var callable|null Logger opcional: function(string $nivel, string $mensaje) */
    private $logger;

    /** @var array<string,int> */
    private static $MESES = [
        'ENERO' => 1, 'FEBRERO' => 2, 'MARZO' => 3, 'ABRIL' => 4,
        'MAYO' => 5, 'JUNIO' => 6, 'JULIO' => 7, 'AGOSTO' => 8,
        'SEPTIEMBRE' => 9, 'OCTUBRE' => 10, 'NOVIEMBRE' => 11, 'DICIEMBRE' => 12,
    ];

    public function __construct(string $rutaCsv, ?callable $logger = null)
    {
        $this->rutaCsv = $rutaCsv;
        $this->logger = $logger;
    }

    /**
     * @return array<int, array{nombre:string, correo:string, dia:int, mes:int}>
     */
    public function cargar(): array
    {
        if (!file_exists($this->rutaCsv)) {
            throw new CorreoException("No se encontro el archivo de roster: {$this->rutaCsv}");
        }

        $lineas = file($this->rutaCsv, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if ($lineas === false || count($lineas) < 2) {
            return [];
        }

        $encabezado = array_map('trim', str_getcsv(array_shift($lineas)));
        $columnas = array_flip($encabezado);

        foreach (['nombre', 'correo', 'dia', 'mes'] as $requerida) {
            if (!isset($columnas[$requerida])) {
                throw new CorreoException("El CSV de roster no tiene la columna requerida: {$requerida}");
            }
        }

        $registros = [];

        foreach ($lineas as $numero => $linea) {
            $fila = str_getcsv($linea);

            $nombre = trim($fila[$columnas['nombre']] ?? '');
            $correo = trim($fila[$columnas['correo']] ?? '');
            $diaTexto = trim($fila[$columnas['dia']] ?? '');
            $mesTexto = trim($fila[$columnas['mes']] ?? '');

            $dia = ctype_digit($diaTexto) ? (int) $diaTexto : 0;
            $mes = $this->numeroDeMes($mesTexto);

            $filaValida = $nombre !== ''
                && filter_var($correo, FILTER_VALIDATE_EMAIL) !== false
                && $dia >= 1 && $dia <= 31
                && $mes !== null;

            if (!$filaValida) {
                $this->log('warning', 'Fila de roster invalida, se omite (linea ' . ($numero + 2) . ')');
                continue;
            }

            $registros[] = [
                'nombre' => $nombre,
                'correo' => $correo,
                'dia' => $dia,
                'mes' => $mes,
            ];
        }

        return $registros;
    }

    private function numeroDeMes(string $valor): ?int
    {
        if (ctype_digit($valor)) {
            $numero = (int) $valor;
            return ($numero >= 1 && $numero <= 12) ? $numero : null;
        }

        $clave = strtoupper(trim($valor));

        return self::$MESES[$clave] ?? null;
    }

    private function log(string $nivel, string $mensaje): void
    {
        if ($this->logger !== null) {
            call_user_func($this->logger, $nivel, $mensaje);
        }
    }
}
