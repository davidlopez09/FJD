<?php

namespace App\Correo\Cumpleanos;

/**
 * Filtra, de un roster ya cargado, quienes cumplen anos en un dia/mes dado.
 */
class BuscadorCumpleanos
{
    /**
     * @param array<int, array{nombre:string, correo:string, dia:int, mes:int}> $roster
     * @return array<int, array{nombre:string, correo:string, dia:int, mes:int}>
     */
    public function buscar(array $roster, int $dia, int $mes): array
    {
        return array_values(array_filter(
            $roster,
            static function (array $persona) use ($dia, $mes): bool {
                return $persona['dia'] === $dia && $persona['mes'] === $mes;
            }
        ));
    }
}
