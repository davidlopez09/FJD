# Aviso automático de cumpleaños — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **EXCEPTION — Task 10:** requires personal data (names, personal emails,
> birth dates) that only exists in the human conversation that produced this
> plan, never written into this document or any tracked file. Task 10 MUST
> be executed directly by the orchestrating session that has that
> conversation context — do NOT dispatch it to a fresh subagent, which would
> have no way to complete it and might try to fabricate data instead.

**Goal:** Revisar automáticamente cada día si algún trabajador cumple años y, de ser así, enviarle un correo de felicitación y avisar a gerencia, reusando el módulo `CorreoMailer` ya existente.

**Architecture:** Nuevo submódulo `src/Cumpleanos/` dentro de `API/MensajeriaCorreo` con responsabilidades separadas (leer roster, buscar coincidencias, controlar duplicados, orquestar el envío), un punto de entrada CLI para el cron de cPanel, y un roster en CSV que nunca se versiona en git por contener datos personales.

**Tech Stack:** PHP >= 7.4, PHPMailer (ya instalado vía `CorreoMailer`), CSV plano, JSON plano. Sin nuevas dependencias de Composer.

## Global Constraints

- PHP >= 7.4 (sin constructor property promotion ni `readonly`, eso es PHP 8+).
- No se agregan dependencias nuevas a `composer.json`. El módulo no usa PHPUnit; las pruebas siguen el mismo patrón que `examples/probar_smtp.php`: scripts CLI que se ejecutan con `php archivo.php` y salen con código 0/1.
- Namespace raíz `App\Correo\` (PSR-4 → `src/`), igual que el resto del módulo.
- Nunca loguear ni imprimir un correo completo — usar `CorreoMailer::enmascarar()` como ya hace el resto del módulo.
- El archivo `data/cumpleanos.csv` (datos reales de personas) **nunca** se agrega a git. Solo se versiona `data/cumpleanos.csv.example` con datos ficticios.
- No modificar `CorreoMailer`, `PlantillaCodigo`, ni ningún archivo del flujo de 2FA/recuperación existente — este trabajo se construye al lado, sin tocarlos.

---

### Task 1: Blindaje de seguridad para los datos del roster

**Files:**
- Modify: `.gitignore` (raíz del repo)
- Create: `API/MensajeriaCorreo/data/.htaccess`
- Create: `API/MensajeriaCorreo/data/cumpleanos.csv.example`

**Interfaces:**
- Consumes: nada.
- Produces: convención de formato CSV que usarán las Tasks 3, 8 y 10 —
  columnas `nombre,correo,dia,mes` (mes: número 1-12 o nombre en español
  como `MARZO`).

- [ ] **Step 1: Agregar las rutas confidenciales al `.gitignore` raíz**

Añade al final de `.gitignore`:

```gitignore

# Modulo de mensajeria de correo — datos confidenciales, nunca en git
API/MensajeriaCorreo/data/cumpleanos.csv
API/MensajeriaCorreo/data/cumpleanos_enviados.json
API/MensajeriaCorreo/.env
API/MensajeriaCorreo/vendor/
```

- [ ] **Step 2: Crear `API/MensajeriaCorreo/data/.htaccess`**

```apache
# Bloquea cualquier acceso HTTP directo a esta carpeta.
# Contiene datos personales (roster de cumpleanos) que nunca deben
# poder pedirse por URL, aunque alguien adivine el nombre del archivo.

# Apache 2.4+
<IfModule mod_authz_core.c>
    Require all denied
</IfModule>

# Apache 2.2 (compatibilidad con hostings antiguos)
<IfModule !mod_authz_core.c>
    Order allow,deny
    Deny from all
</IfModule>
```

- [ ] **Step 3: Crear `API/MensajeriaCorreo/data/cumpleanos.csv.example`**

```csv
nombre,correo,dia,mes
Juan Perez,juan.perez@ejemplo.com,15,MARZO
Maria Gomez,maria.gomez@ejemplo.com,3,AGOSTO
```

- [ ] **Step 4: Verificar que git ignora el archivo real**

Run:

```bash
echo "prueba" > API/MensajeriaCorreo/data/cumpleanos.csv
git status --short
```

Expected: la salida **no** debe mostrar `API/MensajeriaCorreo/data/cumpleanos.csv`. Si aparece, el `.gitignore` está mal escrito — revisa el Step 1 antes de continuar.

```bash
rm API/MensajeriaCorreo/data/cumpleanos.csv
```

- [ ] **Step 5: Commit**

```bash
git add .gitignore API/MensajeriaCorreo/data/.htaccess API/MensajeriaCorreo/data/cumpleanos.csv.example
git commit -m "feat(cumpleanos): blindar acceso a los datos del roster"
```

---

### Task 2: `BuscadorCumpleanos` + arnés de pruebas del módulo

**Files:**
- Create: `API/MensajeriaCorreo/tests/TestHarness.php`
- Create: `API/MensajeriaCorreo/tests/BuscadorCumpleanosTest.php`
- Create: `API/MensajeriaCorreo/src/Cumpleanos/BuscadorCumpleanos.php`

**Interfaces:**
- Consumes: nada.
- Produces:
  - Funciones globales de prueba (usadas por todas las tasks siguientes):
    `assertIgual($esperado, $actual, string $mensaje): void`,
    `assertVerdadero(bool $condicion, string $mensaje): void`,
    `resumenPruebas(): void` (termina el script con `exit(0)` si todo pasó,
    `exit(1)` si algo falló).
  - `App\Correo\Cumpleanos\BuscadorCumpleanos::buscar(array $roster, int $dia, int $mes): array`
    — recibe un roster ya cargado (arreglo de arreglos con llaves
    `nombre`, `correo`, `dia`, `mes`) y devuelve el subconjunto que coincide
    con `$dia`/`$mes`, reindexado desde 0.

- [ ] **Step 1: Crear el arnés de pruebas**

```php
<?php

/**
 * tests/TestHarness.php
 *
 * Helper minimo de aserciones para los scripts de prueba de este modulo.
 * No usamos PHPUnit porque el resto del modulo tampoco lo usa (ver
 * examples/probar_smtp.php): se sigue el mismo patron de scripts CLI.
 */

$GLOBALS['__pruebas_total'] = 0;
$GLOBALS['__pruebas_fallidas'] = 0;

function assertIgual($esperado, $actual, string $mensaje): void
{
    $GLOBALS['__pruebas_total']++;

    if ($esperado !== $actual) {
        $GLOBALS['__pruebas_fallidas']++;
        echo "FALLO: {$mensaje}\n";
        echo '  esperado: ' . var_export($esperado, true) . "\n";
        echo '  actual  : ' . var_export($actual, true) . "\n";
        return;
    }

    echo "OK: {$mensaje}\n";
}

function assertVerdadero(bool $condicion, string $mensaje): void
{
    assertIgual(true, $condicion, $mensaje);
}

function resumenPruebas(): void
{
    $total = $GLOBALS['__pruebas_total'];
    $fallidas = $GLOBALS['__pruebas_fallidas'];
    $exitosas = $total - $fallidas;

    echo "\n{$exitosas}/{$total} pruebas exitosas.\n";

    exit($fallidas > 0 ? 1 : 0);
}
```

Save as `API/MensajeriaCorreo/tests/TestHarness.php`.

- [ ] **Step 2: Escribir la prueba de `BuscadorCumpleanos` (falla porque la clase no existe aún)**

```php
<?php

require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/TestHarness.php';

use App\Correo\Cumpleanos\BuscadorCumpleanos;

$roster = [
    ['nombre' => 'Ana Torres', 'correo' => 'ana@example.com', 'dia' => 15, 'mes' => 3],
    ['nombre' => 'Luis Rios', 'correo' => 'luis@example.com', 'dia' => 20, 'mes' => 4],
    ['nombre' => 'Eva Diaz', 'correo' => 'eva@example.com', 'dia' => 15, 'mes' => 3],
];

$buscador = new BuscadorCumpleanos();

$coincidencias = $buscador->buscar($roster, 15, 3);
assertIgual(2, count($coincidencias), 'Encuentra a los dos que cumplen anos el 15 de marzo');
assertIgual('Ana Torres', $coincidencias[0]['nombre'], 'El primer resultado es Ana Torres');
assertIgual('Eva Diaz', $coincidencias[1]['nombre'], 'El segundo resultado es Eva Diaz');

$sinCoincidencias = $buscador->buscar($roster, 1, 1);
assertIgual(0, count($sinCoincidencias), 'No hay coincidencias el 1 de enero');

assertIgual(0, count($buscador->buscar([], 15, 3)), 'Roster vacio no produce coincidencias');

resumenPruebas();
```

Save as `API/MensajeriaCorreo/tests/BuscadorCumpleanosTest.php`.

- [ ] **Step 3: Correr la prueba y confirmar que falla**

Run: `php API/MensajeriaCorreo/tests/BuscadorCumpleanosTest.php`
Expected: error fatal `Class "App\Correo\Cumpleanos\BuscadorCumpleanos" not found`.

- [ ] **Step 4: Implementar `BuscadorCumpleanos`**

```php
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
```

Save as `API/MensajeriaCorreo/src/Cumpleanos/BuscadorCumpleanos.php`.

- [ ] **Step 5: Correr la prueba y confirmar que pasa**

Run: `php API/MensajeriaCorreo/tests/BuscadorCumpleanosTest.php`
Expected: todas las líneas empiezan con `OK:` y termina con `5/5 pruebas exitosas.` (exit code 0).

- [ ] **Step 6: Commit**

```bash
git add API/MensajeriaCorreo/tests/TestHarness.php API/MensajeriaCorreo/tests/BuscadorCumpleanosTest.php API/MensajeriaCorreo/src/Cumpleanos/BuscadorCumpleanos.php
git commit -m "feat(cumpleanos): agregar BuscadorCumpleanos y arnes de pruebas"
```

---

### Task 3: `RepositorioCumpleanos` (lee y valida el CSV)

**Files:**
- Create: `API/MensajeriaCorreo/tests/RepositorioCumpleanosTest.php`
- Create: `API/MensajeriaCorreo/src/Cumpleanos/RepositorioCumpleanos.php`

**Interfaces:**
- Consumes: `assertIgual`, `assertVerdadero`, `resumenPruebas` (Task 2);
  `App\Correo\Mailer\CorreoException` (ya existe en el módulo).
- Produces: `App\Correo\Cumpleanos\RepositorioCumpleanos`, con:
  - `__construct(string $rutaCsv, ?callable $logger = null)` — `$logger` es
    `function(string $nivel, string $mensaje): void`, igual convención que
    `CorreoMailer`.
  - `cargar(): array` — devuelve
    `array<int, array{nombre:string, correo:string, dia:int, mes:int}>`.
    Lanza `App\Correo\Mailer\CorreoException` si el archivo no existe o le
    faltan columnas requeridas. Filas con datos inválidos (correo mal
    formado, día fuera de 1-31, mes no reconocido) se omiten y se registran
    en el logger, sin lanzar excepción.

- [ ] **Step 1: Escribir la prueba (falla porque la clase no existe aún)**

```php
<?php

require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/TestHarness.php';

use App\Correo\Cumpleanos\RepositorioCumpleanos;
use App\Correo\Mailer\CorreoException;

function crearCsvTemporalRepo(string $contenido): string
{
    $ruta = tempnam(sys_get_temp_dir(), 'roster_');
    file_put_contents($ruta, $contenido);
    return $ruta;
}

// --- Caso 1: carga filas validas, con mes como nombre en espanol ---
$ruta = crearCsvTemporalRepo(
    "nombre,correo,dia,mes\n" .
    "Ana Torres,ana@example.com,15,MARZO\n" .
    "Luis Rios,luis@example.com,3,Febrero\n"
);
$registros = (new RepositorioCumpleanos($ruta))->cargar();

assertIgual(2, count($registros), 'Carga las dos filas validas');
assertIgual('Ana Torres', $registros[0]['nombre'], 'Nombre de la primera fila');
assertIgual(15, $registros[0]['dia'], 'Dia de la primera fila');
assertIgual(3, $registros[0]['mes'], 'MARZO se traduce a mes 3');
assertIgual(2, $registros[1]['mes'], 'Febrero (con minuscula) se traduce a mes 2');
unlink($ruta);

// --- Caso 2: acepta el mes como numero ---
$ruta2 = crearCsvTemporalRepo("nombre,correo,dia,mes\nJuan Perez,juan@example.com,9,4\n");
$registros2 = (new RepositorioCumpleanos($ruta2))->cargar();
assertIgual(4, $registros2[0]['mes'], 'Mes numerico se respeta tal cual');
unlink($ruta2);

// --- Caso 3: omite filas invalidas sin tumbar la carga completa ---
$mensajesLog = [];
$ruta3 = crearCsvTemporalRepo(
    "nombre,correo,dia,mes\n" .
    "Sin Correo,no-es-un-correo,10,MAYO\n" .
    "Sin Dia,valido@example.com,99,MAYO\n" .
    "Mes Invalido,valido2@example.com,10,MESQUENOEXISTE\n" .
    "Valida Perez,valida@example.com,10,MAYO\n"
);
$repositorio3 = new RepositorioCumpleanos($ruta3, function (string $nivel, string $mensaje) use (&$mensajesLog) {
    $mensajesLog[] = $mensaje;
});
$registros3 = $repositorio3->cargar();

assertIgual(1, count($registros3), 'Solo la fila valida sobrevive');
assertIgual('Valida Perez', $registros3[0]['nombre'], 'La fila que sobrevive es la valida');
assertIgual(3, count($mensajesLog), 'Se registraron las 3 filas invalidas en el log');
unlink($ruta3);

// --- Caso 4: archivo inexistente lanza CorreoException ---
$lanzo = false;
try {
    (new RepositorioCumpleanos(sys_get_temp_dir() . '/no_existe_' . uniqid() . '.csv'))->cargar();
} catch (CorreoException $e) {
    $lanzo = true;
}
assertVerdadero($lanzo, 'Archivo inexistente lanza CorreoException');

resumenPruebas();
```

Save as `API/MensajeriaCorreo/tests/RepositorioCumpleanosTest.php`.

- [ ] **Step 2: Correr la prueba y confirmar que falla**

Run: `php API/MensajeriaCorreo/tests/RepositorioCumpleanosTest.php`
Expected: error fatal `Class "App\Correo\Cumpleanos\RepositorioCumpleanos" not found`.

- [ ] **Step 3: Implementar `RepositorioCumpleanos`**

```php
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
```

Save as `API/MensajeriaCorreo/src/Cumpleanos/RepositorioCumpleanos.php`.

- [ ] **Step 4: Correr la prueba y confirmar que pasa**

Run: `php API/MensajeriaCorreo/tests/RepositorioCumpleanosTest.php`
Expected: todas las líneas `OK:` y `10/10 pruebas exitosas.` (exit code 0).

- [ ] **Step 5: Commit**

```bash
git add API/MensajeriaCorreo/tests/RepositorioCumpleanosTest.php API/MensajeriaCorreo/src/Cumpleanos/RepositorioCumpleanos.php
git commit -m "feat(cumpleanos): agregar RepositorioCumpleanos"
```

---

### Task 4: `RegistroEnviados` (control de duplicados)

**Files:**
- Create: `API/MensajeriaCorreo/tests/RegistroEnviadosTest.php`
- Create: `API/MensajeriaCorreo/src/Cumpleanos/RegistroEnviados.php`

**Interfaces:**
- Consumes: `assertIgual`, `assertVerdadero`, `resumenPruebas` (Task 2).
- Produces: `App\Correo\Cumpleanos\RegistroEnviados`, con:
  - `__construct(string $rutaJson)`.
  - `yaEnviado(string $fecha, string $correo): bool` — `$fecha` en formato
    `Y-m-d`.
  - `marcar(string $fecha, string $correo): void` — persiste en
    `$rutaJson`. Guarda solo la última fecha vista (no una lista que crezca
    indefinidamente): si `$fecha` es distinta a la guardada, el registro se
    reinicia para esa fecha.

- [ ] **Step 1: Escribir la prueba (falla porque la clase no existe aún)**

```php
<?php

require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/TestHarness.php';

use App\Correo\Cumpleanos\RegistroEnviados;

$rutaJson = tempnam(sys_get_temp_dir(), 'registro_') . '.json';
if (file_exists($rutaJson)) {
    unlink($rutaJson);
}

$registro = new RegistroEnviados($rutaJson);

assertVerdadero(!$registro->yaEnviado('2026-03-15', 'ana@example.com'), 'Nada marcado todavia');

$registro->marcar('2026-03-15', 'ana@example.com');
assertVerdadero($registro->yaEnviado('2026-03-15', 'ana@example.com'), 'Se marca como enviado hoy');
assertVerdadero(!$registro->yaEnviado('2026-03-15', 'otro@example.com'), 'Otro correo distinto no queda marcado');

// --- Persiste entre instancias (nueva instancia lee del mismo archivo) ---
$registroOtraInstancia = new RegistroEnviados($rutaJson);
assertVerdadero($registroOtraInstancia->yaEnviado('2026-03-15', 'ana@example.com'), 'El marcado persiste en disco entre instancias');

// --- Un dia distinto resetea el control (no crece indefinidamente) ---
$registroOtraInstancia->marcar('2026-03-16', 'luis@example.com');
assertVerdadero(!$registroOtraInstancia->yaEnviado('2026-03-16', 'ana@example.com'), 'Ana no aparece como enviada en el nuevo dia');
assertVerdadero($registroOtraInstancia->yaEnviado('2026-03-16', 'luis@example.com'), 'Luis si queda marcado en el nuevo dia');

unlink($rutaJson);

resumenPruebas();
```

Save as `API/MensajeriaCorreo/tests/RegistroEnviadosTest.php`.

- [ ] **Step 2: Correr la prueba y confirmar que falla**

Run: `php API/MensajeriaCorreo/tests/RegistroEnviadosTest.php`
Expected: error fatal `Class "App\Correo\Cumpleanos\RegistroEnviados" not found`.

- [ ] **Step 3: Implementar `RegistroEnviados`**

```php
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
```

Save as `API/MensajeriaCorreo/src/Cumpleanos/RegistroEnviados.php`.

- [ ] **Step 4: Correr la prueba y confirmar que pasa**

Run: `php API/MensajeriaCorreo/tests/RegistroEnviadosTest.php`
Expected: todas las líneas `OK:` y `6/6 pruebas exitosas.` (exit code 0).

- [ ] **Step 5: Commit**

```bash
git add API/MensajeriaCorreo/tests/RegistroEnviadosTest.php API/MensajeriaCorreo/src/Cumpleanos/RegistroEnviados.php
git commit -m "feat(cumpleanos): agregar RegistroEnviados"
```

---

### Task 5: `PlantillaCumpleanos` (correos: trabajador y gerencia)

**Files:**
- Create: `API/MensajeriaCorreo/tests/PlantillaCumpleanosTest.php`
- Create: `API/MensajeriaCorreo/src/Templates/PlantillaCumpleanos.php`

**Interfaces:**
- Consumes: `assertVerdadero`, `resumenPruebas` (Task 2).
- Produces: `App\Correo\Templates\PlantillaCumpleanos`, con métodos
  estáticos: `asuntoTrabajador(): string`, `htmlTrabajador(string $nombre): string`,
  `textoTrabajador(string $nombre): string`, `asuntoGerencia(): string`,
  `htmlGerencia(string $nombreCumpleanero): string`,
  `textoGerencia(string $nombreCumpleanero): string`. Los métodos `html*`
  escapan el nombre con `htmlspecialchars` antes de interpolarlo (mismo
  patrón que `PlantillaCodigo`).

- [ ] **Step 1: Escribir la prueba (falla porque la clase no existe aún)**

```php
<?php

require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/TestHarness.php';

use App\Correo\Templates\PlantillaCumpleanos;

$html = PlantillaCumpleanos::htmlTrabajador('Ana <Torres>');
assertVerdadero(strpos($html, '&lt;Torres&gt;') !== false, 'El nombre del trabajador se escapa en el HTML');
assertVerdadero(strpos($html, 'Ana') !== false, 'El HTML incluye el nombre del trabajador');

$texto = PlantillaCumpleanos::textoTrabajador('Ana Torres');
assertVerdadero(strpos($texto, 'Ana Torres') !== false, 'El texto plano incluye el nombre del trabajador');

$asuntoTrabajador = PlantillaCumpleanos::asuntoTrabajador();
assertVerdadero($asuntoTrabajador !== '', 'El asunto para el trabajador no esta vacio');

$htmlGerencia = PlantillaCumpleanos::htmlGerencia('Luis <Rios>');
assertVerdadero(strpos($htmlGerencia, '&lt;Rios&gt;') !== false, 'El nombre en el aviso a gerencia se escapa');

$textoGerencia = PlantillaCumpleanos::textoGerencia('Luis Rios');
assertVerdadero(strpos($textoGerencia, 'Luis Rios') !== false, 'El texto a gerencia incluye el nombre del cumpleanero');

$asuntoGerencia = PlantillaCumpleanos::asuntoGerencia();
assertVerdadero($asuntoGerencia !== '', 'El asunto para gerencia no esta vacio');

resumenPruebas();
```

Save as `API/MensajeriaCorreo/tests/PlantillaCumpleanosTest.php`.

- [ ] **Step 2: Correr la prueba y confirmar que falla**

Run: `php API/MensajeriaCorreo/tests/PlantillaCumpleanosTest.php`
Expected: error fatal `Class "App\Correo\Templates\PlantillaCumpleanos" not found`.

- [ ] **Step 3: Implementar `PlantillaCumpleanos`**

```php
<?php

namespace App\Correo\Templates;

/**
 * Plantillas de correo para el aviso automatico de cumpleanos:
 * felicitacion al trabajador (tono calido) y aviso a gerencia.
 */
class PlantillaCumpleanos
{
    /** @var string Color principal de la marca */
    const COLOR_MARCA = '#1c44ed';

    public static function asuntoTrabajador(): string
    {
        return '¡Feliz cumpleaños!';
    }

    public static function htmlTrabajador(string $nombre): string
    {
        $nombreSeguro = htmlspecialchars($nombre, ENT_QUOTES, 'UTF-8');
        $color = self::COLOR_MARCA;

        return <<<HTML
<div style="font-family:Arial,Helvetica,sans-serif; color:#333; max-width:520px;">
    <h2 style="color:{$color}; margin-bottom:10px;">¡Feliz cumpleaños, {$nombreSeguro}!</h2>

    <p>Hoy es tu día especial y todo el equipo quiere desearte un cumpleaños lleno de alegría.</p>

    <p>Gracias por ser parte de este equipo. ¡Que tengas un excelente día!</p>

    <p style="margin-top:20px;">Con cariño,<br>Tu equipo</p>
</div>
HTML;
    }

    public static function textoTrabajador(string $nombre): string
    {
        return "¡Feliz cumpleaños, {$nombre}!\n\n"
            . "Hoy es tu día especial y todo el equipo quiere desearte un cumpleaños lleno de alegría.\n"
            . "Gracias por ser parte de este equipo. ¡Que tengas un excelente día!\n\n"
            . "Con cariño,\nTu equipo";
    }

    public static function asuntoGerencia(): string
    {
        return 'Aviso de cumpleaños';
    }

    public static function htmlGerencia(string $nombreCumpleanero): string
    {
        $nombreSeguro = htmlspecialchars($nombreCumpleanero, ENT_QUOTES, 'UTF-8');
        $color = self::COLOR_MARCA;

        return <<<HTML
<div style="font-family:Arial,Helvetica,sans-serif; color:#333; max-width:520px;">
    <h2 style="color:{$color}; margin-bottom:10px;">Hoy cumple años {$nombreSeguro}</h2>

    <p>Este es un recordatorio automático para que el equipo de gerencia pueda felicitar a {$nombreSeguro} en su cumpleaños.</p>
</div>
HTML;
    }

    public static function textoGerencia(string $nombreCumpleanero): string
    {
        return "Hoy cumple años {$nombreCumpleanero}.\n\n"
            . "Recordatorio automático para que el equipo de gerencia pueda felicitarle.";
    }
}
```

Save as `API/MensajeriaCorreo/src/Templates/PlantillaCumpleanos.php`.

- [ ] **Step 4: Correr la prueba y confirmar que pasa**

Run: `php API/MensajeriaCorreo/tests/PlantillaCumpleanosTest.php`
Expected: todas las líneas `OK:` y `7/7 pruebas exitosas.` (exit code 0).

- [ ] **Step 5: Commit**

```bash
git add API/MensajeriaCorreo/tests/PlantillaCumpleanosTest.php API/MensajeriaCorreo/src/Templates/PlantillaCumpleanos.php
git commit -m "feat(cumpleanos): agregar PlantillaCumpleanos"
```

---

### Task 6: `RevisorCumpleanos` (orquestador)

**Files:**
- Create: `API/MensajeriaCorreo/tests/Dobles/MailerFalso.php`
- Create: `API/MensajeriaCorreo/tests/RevisorCumpleanosTest.php`
- Create: `API/MensajeriaCorreo/src/Cumpleanos/RevisorCumpleanos.php`

**Interfaces:**
- Consumes:
  - `assertIgual`, `assertVerdadero`, `resumenPruebas` (Task 2).
  - `RepositorioCumpleanos::cargar(): array` (Task 3).
  - `BuscadorCumpleanos::buscar(array, int, int): array` (Task 2).
  - `RegistroEnviados::yaEnviado(string, string): bool` /
    `::marcar(string, string): void` (Task 4).
  - `PlantillaCumpleanos::asuntoTrabajador/htmlTrabajador/textoTrabajador/asuntoGerencia/htmlGerencia/textoGerencia` (Task 5).
  - `CorreoMailer::enviar(string $destinatario, string $asunto, string $cuerpoHtml, string $cuerpoTexto = ''): bool`
    (ya existe en `App\Correo\Mailer\CorreoMailer`, lanza `CorreoException`).
- Produces: `App\Correo\Cumpleanos\RevisorCumpleanos`, con:
  - `__construct(RepositorioCumpleanos $repositorio, BuscadorCumpleanos $buscador, RegistroEnviados $registro, CorreoMailer $mailer, string $correoGerencia, ?callable $logger = null)`.
  - `ejecutar(\DateTimeImmutable $hoy, bool $simular = false): array` — devuelve
    `array<int, array{nombre:string, correo:string, enviadoTrabajador:bool, enviadoGerencia:bool}>`.
    Usada por Task 7 (cron real) y Task 8 (script de prueba con `$simular`).

- [ ] **Step 1: Crear el doble de prueba de `CorreoMailer`**

```php
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
```

Save as `API/MensajeriaCorreo/tests/Dobles/MailerFalso.php`.

- [ ] **Step 2: Escribir la prueba de `RevisorCumpleanos` (falla porque la clase no existe aún)**

```php
<?php

require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/TestHarness.php';
require_once __DIR__ . '/Dobles/MailerFalso.php';

use App\Correo\Cumpleanos\BuscadorCumpleanos;
use App\Correo\Cumpleanos\RegistroEnviados;
use App\Correo\Cumpleanos\RepositorioCumpleanos;
use App\Correo\Cumpleanos\RevisorCumpleanos;
use App\Correo\Tests\Dobles\MailerFalso;

function crearCsvTemporalRevisor(string $contenido): string
{
    $ruta = tempnam(sys_get_temp_dir(), 'roster_');
    file_put_contents($ruta, $contenido);
    return $ruta;
}

function nuevaRutaRegistro(): string
{
    $ruta = tempnam(sys_get_temp_dir(), 'registro_') . '.json';
    if (file_exists($ruta)) {
        unlink($ruta);
    }
    return $ruta;
}

// --- Caso 1: encuentra coincidencia y envia a trabajador y gerencia ---
$rutaCsv = crearCsvTemporalRevisor(
    "nombre,correo,dia,mes\n" .
    "Ana Torres,ana@example.com,15,MARZO\n" .
    "Luis Rios,luis@example.com,20,ABRIL\n"
);
$rutaRegistro = nuevaRutaRegistro();

$mailer = new MailerFalso();
$revisor = new RevisorCumpleanos(
    new RepositorioCumpleanos($rutaCsv),
    new BuscadorCumpleanos(),
    new RegistroEnviados($rutaRegistro),
    $mailer,
    'gerencia@example.com'
);

$hoy = new \DateTimeImmutable('2026-03-15');
$resultados = $revisor->ejecutar($hoy);

assertIgual(1, count($resultados), 'Encuentra exactamente un cumpleanero el 15 de marzo');
assertIgual('Ana Torres', $resultados[0]['nombre'], 'El cumpleanero encontrado es Ana Torres');
assertVerdadero($resultados[0]['enviadoTrabajador'], 'Se marca como enviado al trabajador');
assertVerdadero($resultados[0]['enviadoGerencia'], 'Se marca como enviado a gerencia');
assertIgual(2, count($mailer->enviados), 'Se enviaron 2 correos (trabajador + gerencia)');
assertIgual('ana@example.com', $mailer->enviados[0]['destinatario'], 'El primer correo va al trabajador');
assertIgual('gerencia@example.com', $mailer->enviados[1]['destinatario'], 'El segundo correo va a gerencia');

// --- Caso 2: si se ejecuta de nuevo el mismo dia, no reenvia (idempotencia) ---
$mailer2 = new MailerFalso();
$revisor2 = new RevisorCumpleanos(
    new RepositorioCumpleanos($rutaCsv),
    new BuscadorCumpleanos(),
    new RegistroEnviados($rutaRegistro),
    $mailer2,
    'gerencia@example.com'
);
$resultados2 = $revisor2->ejecutar($hoy);

assertIgual(0, count($mailer2->enviados), 'Segunda corrida el mismo dia no reenvia nada');

// --- Caso 3: nadie cumple anos esa fecha ---
$mailer3 = new MailerFalso();
$revisor3 = new RevisorCumpleanos(
    new RepositorioCumpleanos($rutaCsv),
    new BuscadorCumpleanos(),
    new RegistroEnviados($rutaRegistro),
    $mailer3,
    'gerencia@example.com'
);
$resultados3 = $revisor3->ejecutar(new \DateTimeImmutable('2026-01-01'));

assertIgual(0, count($resultados3), 'Ningun cumpleanero el 1 de enero');
assertIgual(0, count($mailer3->enviados), 'No se envia nada si no hay coincidencias');

// --- Caso 4: modo simulacion no envia correos ni marca el registro ---
$rutaRegistroSim = nuevaRutaRegistro();
$mailer4 = new MailerFalso();
$revisor4 = new RevisorCumpleanos(
    new RepositorioCumpleanos($rutaCsv),
    new BuscadorCumpleanos(),
    new RegistroEnviados($rutaRegistroSim),
    $mailer4,
    'gerencia@example.com'
);
$resultados4 = $revisor4->ejecutar($hoy, true);

assertIgual(0, count($mailer4->enviados), 'Modo simulacion no llama al mailer');
assertVerdadero(!file_exists($rutaRegistroSim), 'Modo simulacion no crea el archivo de registro');

// --- Caso 5: fallo al enviar a un trabajador no bloquea a los demas ni marca el registro ---
$rutaCsvDos = crearCsvTemporalRevisor(
    "nombre,correo,dia,mes\n" .
    "Fallara Perez,fallara@example.com,10,MAYO\n" .
    "Exitosa Gomez,exitosa@example.com,10,MAYO\n"
);
$rutaRegistroDos = nuevaRutaRegistro();
$mailer5 = new MailerFalso();
$mailer5->fallarPara[] = 'fallara@example.com';
$revisor5 = new RevisorCumpleanos(
    new RepositorioCumpleanos($rutaCsvDos),
    new BuscadorCumpleanos(),
    new RegistroEnviados($rutaRegistroDos),
    $mailer5,
    'gerencia@example.com'
);
$resultados5 = $revisor5->ejecutar(new \DateTimeImmutable('2026-05-10'));

assertIgual(2, count($resultados5), 'Ambas coincidencias se procesan aunque una falle');
assertVerdadero(!$resultados5[0]['enviadoTrabajador'], 'El envio fallido queda marcado como no enviado');
assertVerdadero($resultados5[1]['enviadoTrabajador'], 'El segundo trabajador si recibe su correo');

unlink($rutaCsv);
unlink($rutaCsvDos);
if (file_exists($rutaRegistro)) {
    unlink($rutaRegistro);
}
if (file_exists($rutaRegistroDos)) {
    unlink($rutaRegistroDos);
}

resumenPruebas();
```

Save as `API/MensajeriaCorreo/tests/RevisorCumpleanosTest.php`.

- [ ] **Step 3: Correr la prueba y confirmar que falla**

Run: `php API/MensajeriaCorreo/tests/RevisorCumpleanosTest.php`
Expected: error fatal `Class "App\Correo\Cumpleanos\RevisorCumpleanos" not found`.

- [ ] **Step 4: Implementar `RevisorCumpleanos`**

```php
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
```

Save as `API/MensajeriaCorreo/src/Cumpleanos/RevisorCumpleanos.php`.

- [ ] **Step 5: Correr la prueba y confirmar que pasa**

Run: `php API/MensajeriaCorreo/tests/RevisorCumpleanosTest.php`
Expected: todas las líneas `OK:` y `15/15 pruebas exitosas.` (exit code 0).

- [ ] **Step 6: Commit**

```bash
git add API/MensajeriaCorreo/tests/Dobles/MailerFalso.php API/MensajeriaCorreo/tests/RevisorCumpleanosTest.php API/MensajeriaCorreo/src/Cumpleanos/RevisorCumpleanos.php
git commit -m "feat(cumpleanos): agregar RevisorCumpleanos"
```

---

### Task 7: Punto de entrada CLI para el cron de cPanel

**Files:**
- Create: `API/MensajeriaCorreo/cron/revisar_cumpleanos.php`
- Modify: `API/MensajeriaCorreo/.env.example`

**Interfaces:**
- Consumes: `RevisorCumpleanos::ejecutar()` (Task 6),
  `RepositorioCumpleanos`, `BuscadorCumpleanos`, `RegistroEnviados` (Tasks
  2-4), `EnvConfigProvider` y `CorreoMailer` (ya existentes).
- Produces: script CLI ejecutable por el cron de cPanel; variable de entorno
  `GERENCIA_EMAIL` documentada en `.env.example` (consumida también por
  Task 8).

- [ ] **Step 1: Agregar `GERENCIA_EMAIL` a `.env.example`**

Añade al final de `API/MensajeriaCorreo/.env.example`:

```ini

# --- Aviso automatico de cumpleanos ---
# Correo que recibe el aviso cuando un trabajador cumple anos.
GERENCIA_EMAIL=gerencia@tudominio.com
```

- [ ] **Step 2: Crear `cron/revisar_cumpleanos.php`**

```php
<?php

/**
 * cron/revisar_cumpleanos.php
 *
 * Punto de entrada para el cron de cPanel. Revisa si alguien cumple anos
 * hoy y, de ser asi, envia el correo de felicitacion y el aviso a gerencia.
 *
 * Uso (cron de cPanel, una vez al dia, ej. 00:10):
 *   php /ruta/completa/a/API/MensajeriaCorreo/cron/revisar_cumpleanos.php
 */

require_once __DIR__ . '/../bootstrap.php';

use App\Correo\Config\EnvConfigProvider;
use App\Correo\Cumpleanos\BuscadorCumpleanos;
use App\Correo\Cumpleanos\RegistroEnviados;
use App\Correo\Cumpleanos\RepositorioCumpleanos;
use App\Correo\Cumpleanos\RevisorCumpleanos;
use App\Correo\Mailer\CorreoException;
use App\Correo\Mailer\CorreoMailer;

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit("Este script solo se ejecuta por consola (cron).\n");
}

$correoGerencia = getenv('GERENCIA_EMAIL') ?: ($_ENV['GERENCIA_EMAIL'] ?? '');

if ($correoGerencia === '') {
    fwrite(STDERR, "Falta la variable de entorno GERENCIA_EMAIL en .env\n");
    exit(1);
}

$logger = function (string $nivel, string $mensaje): void {
    echo '[' . date('Y-m-d H:i:s') . "] [{$nivel}] {$mensaje}\n";
};

$repositorio = new RepositorioCumpleanos(__DIR__ . '/../data/cumpleanos.csv', $logger);
$buscador = new BuscadorCumpleanos();
$registro = new RegistroEnviados(__DIR__ . '/../data/cumpleanos_enviados.json');
$mailer = new CorreoMailer(new EnvConfigProvider(), $logger);

$revisor = new RevisorCumpleanos($repositorio, $buscador, $registro, $mailer, $correoGerencia, $logger);

try {
    $resultados = $revisor->ejecutar(new DateTimeImmutable('now'));
} catch (CorreoException $e) {
    fwrite(STDERR, 'Error cargando el roster: ' . $e->getMessage() . "\n");
    exit(1);
}

if (empty($resultados)) {
    echo "Hoy nadie cumple anos.\n";
}

exit(0);
```

Save as `API/MensajeriaCorreo/cron/revisar_cumpleanos.php`.

- [ ] **Step 3: Verificar la sintaxis**

Run: `php -l API/MensajeriaCorreo/cron/revisar_cumpleanos.php`
Expected: `No syntax errors detected`.

- [ ] **Step 4: Verificar el camino de error sin `GERENCIA_EMAIL`**

Sin crear `.env` todavía, corre (Windows PowerShell):

```powershell
$env:GERENCIA_EMAIL=""; php API/MensajeriaCorreo/cron/revisar_cumpleanos.php
```

Expected: imprime `Falta la variable de entorno GERENCIA_EMAIL en .env` por
stderr y termina con código de salida 1 — sin intentar tocar el roster ni
el SMTP.

- [ ] **Step 5: Commit**

```bash
git add API/MensajeriaCorreo/cron/revisar_cumpleanos.php API/MensajeriaCorreo/.env.example
git commit -m "feat(cumpleanos): agregar punto de entrada CLI para el cron"
```

---

### Task 8: Script manual de prueba (simulación sin esperar un cumpleaños real)

**Files:**
- Create: `API/MensajeriaCorreo/examples/probar_cumpleanos.php`

**Interfaces:**
- Consumes: `RevisorCumpleanos::ejecutar(\DateTimeImmutable $hoy, bool $simular = false)` (Task 6), `CorreoMailer::enmascarar()` (ya existente).
- Produces: script manual de verificación, mismo patrón que
  `examples/probar_smtp.php`.

- [ ] **Step 1: Crear `examples/probar_cumpleanos.php`**

```php
<?php

/**
 * examples/probar_cumpleanos.php
 *
 * Simula la revision de cumpleanos para una fecha arbitraria, sin esperar
 * a que llegue un cumpleanos real. Por defecto NO envia correos (modo
 * simulacion); pasa --enviar para que si los envie de verdad.
 *
 * Uso:
 *   php examples/probar_cumpleanos.php 15-03            (simula, no envia)
 *   php examples/probar_cumpleanos.php 15-03 --enviar   (envia de verdad)
 */

require_once __DIR__ . '/../bootstrap.php';

use App\Correo\Config\EnvConfigProvider;
use App\Correo\Cumpleanos\BuscadorCumpleanos;
use App\Correo\Cumpleanos\RegistroEnviados;
use App\Correo\Cumpleanos\RepositorioCumpleanos;
use App\Correo\Cumpleanos\RevisorCumpleanos;
use App\Correo\Mailer\CorreoException;
use App\Correo\Mailer\CorreoMailer;

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit("Este script solo se ejecuta por consola.\n");
}

$fechaTexto = $argv[1] ?? '';

if ($fechaTexto === '' || !preg_match('/^(\d{1,2})-(\d{1,2})$/', $fechaTexto, $m)) {
    exit("Uso: php examples/probar_cumpleanos.php DD-MM [--enviar]\n");
}

$enviarDeVerdad = in_array('--enviar', $argv, true);

$anoActual = (int) date('Y');
$fechaSimulada = sprintf('%04d-%02d-%02d', $anoActual, (int) $m[2], (int) $m[1]);
$hoySimulado = DateTimeImmutable::createFromFormat('Y-m-d', $fechaSimulada);

if ($hoySimulado === false) {
    exit("Fecha invalida: {$fechaTexto}\n");
}

echo 'Simulando fecha: ' . $hoySimulado->format('d-m') . "\n";
echo 'Modo: ' . ($enviarDeVerdad ? 'ENVIO REAL' : 'SIMULACION (sin enviar)') . "\n\n";

$correoGerencia = getenv('GERENCIA_EMAIL') ?: ($_ENV['GERENCIA_EMAIL'] ?? '');

$logger = function (string $nivel, string $mensaje): void {
    echo "[{$nivel}] {$mensaje}\n";
};

$repositorio = new RepositorioCumpleanos(__DIR__ . '/../data/cumpleanos.csv', $logger);
$buscador = new BuscadorCumpleanos();
$registro = new RegistroEnviados(__DIR__ . '/../data/cumpleanos_enviados.json');
$mailer = new CorreoMailer(new EnvConfigProvider(), $logger);

$revisor = new RevisorCumpleanos($repositorio, $buscador, $registro, $mailer, $correoGerencia, $logger);

try {
    $resultados = $revisor->ejecutar($hoySimulado, !$enviarDeVerdad);
} catch (CorreoException $e) {
    echo 'FALLO: ' . $e->getMessage() . "\n";
    exit(1);
}

if (empty($resultados)) {
    echo "Nadie cumple anos en esa fecha.\n";
    exit(0);
}

foreach ($resultados as $r) {
    echo "- {$r['nombre']} <" . CorreoMailer::enmascarar($r['correo']) . '> '
        . 'trabajador=' . ($r['enviadoTrabajador'] ? 'OK' : 'no')
        . ' gerencia=' . ($r['enviadoGerencia'] ? 'OK' : 'no') . "\n";
}
```

Save as `API/MensajeriaCorreo/examples/probar_cumpleanos.php`.

- [ ] **Step 2: Verificar la sintaxis**

Run: `php -l API/MensajeriaCorreo/examples/probar_cumpleanos.php`
Expected: `No syntax errors detected`.

- [ ] **Step 3: Probar en modo simulación con un CSV temporal**

```bash
cp API/MensajeriaCorreo/data/cumpleanos.csv.example API/MensajeriaCorreo/data/cumpleanos.csv
php API/MensajeriaCorreo/examples/probar_cumpleanos.php 15-03
```

Expected: imprime `Simulando fecha: 15-03`, `Modo: SIMULACION (sin enviar)`,
y una línea `- Juan Perez <ju********@ejemplo.com> trabajador=no gerencia=no`
(no envía nada de verdad en modo simulación).

- [ ] **Step 4: Limpiar el CSV temporal**

```bash
rm API/MensajeriaCorreo/data/cumpleanos.csv
```

(El roster real todavía no existe — se crea en la Task 10 — así que no se
debe dejar este archivo de prueba en su lugar.)

- [ ] **Step 5: Commit**

```bash
git add API/MensajeriaCorreo/examples/probar_cumpleanos.php
git commit -m "feat(cumpleanos): agregar script de prueba manual probar_cumpleanos.php"
```

---

### Task 9: Documentación en el README del módulo

**Files:**
- Modify: `API/MensajeriaCorreo/README.md`

**Interfaces:**
- Consumes: nada (solo documenta lo construido en Tasks 1-8).
- Produces: instrucciones para el operador humano — no afecta código.

- [ ] **Step 1: Agregar una sección nueva al final de `README.md`**

Añade al final del archivo (después de la sección 7 existente):

```markdown

---

## 8. Aviso automático de cumpleaños

Revisa diariamente si algún trabajador cumple años y, de ser así, le envía
un correo de felicitación y avisa a gerencia.

### Componentes

| Archivo | Rol |
|---|---|
| `data/cumpleanos.csv` | Roster real: `nombre,correo,dia,mes`. **Nunca se versiona en git.** |
| `data/cumpleanos.csv.example` | Ejemplo con datos ficticios, sí versionado. |
| `data/.htaccess` | Bloquea el acceso HTTP directo a la carpeta `data/`. |
| `src/Cumpleanos/RepositorioCumpleanos.php` | Lee y valida el CSV. |
| `src/Cumpleanos/BuscadorCumpleanos.php` | Filtra quién cumple años hoy. |
| `src/Cumpleanos/RegistroEnviados.php` | Evita reenvíos si el cron corre dos veces el mismo día. |
| `src/Cumpleanos/RevisorCumpleanos.php` | Orquesta todo lo anterior. |
| `src/Templates/PlantillaCumpleanos.php` | Correos de felicitación y de aviso a gerencia. |
| `cron/revisar_cumpleanos.php` | Punto de entrada para el cron. |
| `examples/probar_cumpleanos.php` | Prueba manual con fecha simulada. |

### Configurar el roster

Copia `data/cumpleanos.csv.example` como `data/cumpleanos.csv` y reemplaza
los datos de ejemplo por los reales (uno por trabajador):

```csv
nombre,correo,dia,mes
Juan Perez,juan.perez@ejemplo.com,15,MARZO
```

El mes acepta número (`3`) o nombre en español (`MARZO`). **Este archivo
contiene datos personales: nunca lo subas a git, y en el servidor déjalo
con permisos `640` o más restrictivos** (`chmod 640 data/cumpleanos.csv`).

### Configurar el correo de gerencia

En `.env`:

```ini
GERENCIA_EMAIL=gerencia@tudominio.com
```

### Programar el cron en cPanel

En cPanel → Cron Jobs, agrega una tarea diaria (ej. a las 00:10):

```
10 0 * * * php /home/tu_usuario/public_html/ruta/a/API/MensajeriaCorreo/cron/revisar_cumpleanos.php >> /home/tu_usuario/logs/cumpleanos.log 2>&1
```

Ajusta la ruta absoluta según dónde quede desplegado el módulo en tu
hosting.

### Probar sin esperar a un cumpleaños real

```bash
php examples/probar_cumpleanos.php 15-03              # simula, no envia
php examples/probar_cumpleanos.php 15-03 --enviar     # envia de verdad
```

### Seguridad

- `data/cumpleanos.csv` y `data/cumpleanos_enviados.json` están en
  `.gitignore`: nunca deben llegar a un commit.
- `data/.htaccess` bloquea cualquier acceso HTTP directo a esos archivos.
- Los logs solo muestran el correo enmascarado (`CorreoMailer::enmascarar()`),
  nunca el correo completo.
- El aviso a gerencia solo incluye el nombre del cumpleañero, no el roster
  completo ni las fechas de nacimiento de los demás.
```

- [ ] **Step 2: Commit**

```bash
git add API/MensajeriaCorreo/README.md
git commit -m "docs(cumpleanos): documentar el aviso automatico de cumpleanos"
```

---

### Task 10: Cargar el roster real (dato sensible — no delegar a un subagente sin contexto)

**⚠️ Esta task requiere los datos reales compartidos en la conversación
(nombres, correos personales, día y mes de nacimiento de 12 trabajadores, y
el correo de gerencia). Un subagente fresco no tiene esa información — esta
task la debe ejecutar directamente quien tiene el contexto de la
conversación, no un worker delegado.**

**Files:**
- Create: `API/MensajeriaCorreo/data/cumpleanos.csv` (real — gitignored, NO se versiona)
- Modify: `API/MensajeriaCorreo/.env` (real — gitignored, NO se versiona; créalo desde `.env.example` si no existe)

**Interfaces:**
- Consumes: formato validado por `RepositorioCumpleanos` (Task 3):
  columnas `nombre,correo,dia,mes`.
- Produces: nada consumido por otra task — es el dato final de producción.

- [ ] **Step 1: Confirmar que el `.gitignore` sigue cubriendo estos archivos**

Run: `git check-ignore -v API/MensajeriaCorreo/data/cumpleanos.csv API/MensajeriaCorreo/.env`
Expected: ambas rutas aparecen en la salida (están ignoradas). Si alguna no
aparece, **detente** y arregla el `.gitignore` (Task 1) antes de continuar.

- [ ] **Step 2: Crear `API/MensajeriaCorreo/data/cumpleanos.csv`**

Usa el encabezado `nombre,correo,dia,mes` y una fila por cada uno de los 12
trabajadores ya compartidos en la conversación (nombre completo, correo
personal, día y mes de nacimiento). El mes puede escribirse tal cual en
español (ej. `FEBRERO`). No repitas esos datos en este plan ni en ningún
otro archivo versionado — solo en este archivo, gitignored.

- [ ] **Step 3: Configurar `.env`**

Si `API/MensajeriaCorreo/.env` no existe, créalo a partir de `.env.example`
y completa `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`,
`SMTP_FROM_NAME`, `SMTP_SECURE` con las credenciales reales de correo del
remitente, y:

```ini
GERENCIA_EMAIL=analistaadministrativo@fjdsas.com.co
```

- [ ] **Step 4: Restringir permisos del archivo (si ya está en el servidor de hosting)**

En el servidor (no aplica en Windows local):

```bash
chmod 640 API/MensajeriaCorreo/data/cumpleanos.csv
```

- [ ] **Step 5: Prueba de humo end-to-end con datos reales, en modo simulación**

Usa la fecha real de nacimiento de cualquiera de los 12 trabajadores:

```bash
php API/MensajeriaCorreo/examples/probar_cumpleanos.php DD-MM
```

Expected: aparece esa persona en la salida con
`trabajador=no gerencia=no` (modo simulación, no se envía nada todavía) y
sin errores de parseo del CSV.

- [ ] **Step 6: Prueba de envío real (opcional, con tu confirmación explícita)**

Solo si quieres confirmar que el correo llega de verdad, con una fecha de
cumpleaños real:

```bash
php API/MensajeriaCorreo/examples/probar_cumpleanos.php DD-MM --enviar
```

Esto envía un correo real al trabajador y a gerencia. Pregunta antes de
correrlo si no estás seguro de que el usuario lo quiere en ese momento.

- [ ] **Step 7: Confirmar que nada sensible quedó en el árbol de git**

Run: `git status --short`
Expected: no debe aparecer `API/MensajeriaCorreo/data/cumpleanos.csv` ni
`API/MensajeriaCorreo/.env` en la salida. No hay commit en esta task — el
dato real nunca se versiona.
