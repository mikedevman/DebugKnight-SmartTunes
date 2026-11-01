<?php
/** Shared database configuration for every legacy page and endpoint. */
function smarttunes_env($key, $default = null)
{
    static $settings = null;

    if ($settings === null) {
        $path = LEGACY_ROOT . '/app/config/.env';
        $settings = [];
        if (is_file($path)) {
            $settings = parse_ini_file($path, false, INI_SCANNER_RAW);
            if ($settings === false) {
                throw new RuntimeException('Unable to parse the database .env file.');
            }
        }
    }

    // Hosting environment variables take precedence over the local .env file.
    $value = getenv($key);
    return $value !== false ? $value : ($settings[$key] ?? $default);
}

function smarttunes_db_connect()
{
    $host = smarttunes_env('DB_HOST');
    $user = smarttunes_env('DB_USER');
    $password = smarttunes_env('DB_PASSWORD');
    $database = smarttunes_env('DB_NAME');
    $port = filter_var(smarttunes_env('DB_PORT', '3306'), FILTER_VALIDATE_INT,
        ['options' => ['min_range' => 1, 'max_range' => 65535]]);

    if (!$host || !$user || !$database || $password === null || $port === false) {
        throw new RuntimeException('Set valid DB_HOST, DB_USER, DB_PASSWORD, DB_NAME and DB_PORT values in .env.');
    }

    $connection = mysqli_init();
    $connection->options(MYSQLI_OPT_CONNECT_TIMEOUT, 10);
    $mode = strtoupper(smarttunes_env('DB_SSL_MODE', 'REQUIRED'));
    $flags = 0;

    if ($mode === 'REQUIRED') {
        // Encrypt traffic without requiring a local copy of Aiven's private CA.
        // Use VERIFY_IDENTITY with DB_SSL_CA to authenticate the server as well.
        $connection->ssl_set(null, null, null, null, null);
        $flags = MYSQLI_CLIENT_SSL | MYSQLI_CLIENT_SSL_DONT_VERIFY_SERVER_CERT;
    } elseif ($mode === 'VERIFY_IDENTITY') {
        $ca = smarttunes_env('DB_SSL_CA', '');
        if ($ca !== '' && !preg_match('~^(?:[A-Za-z]:[\\\\/]|/)~', $ca)) {
            $ca = LEGACY_ROOT . '/' . $ca;
        }
        if ($ca === '' || !is_readable($ca)) {
            throw new RuntimeException('DB_SSL_CA must point to the readable Aiven CA certificate for VERIFY_IDENTITY.');
        }
        $connection->ssl_set(null, null, $ca, null, null);
        $connection->options(MYSQLI_OPT_SSL_VERIFY_SERVER_CERT, true);
        $flags = MYSQLI_CLIENT_SSL;
    } elseif ($mode !== 'DISABLED') {
        throw new RuntimeException('DB_SSL_MODE must be REQUIRED, VERIFY_IDENTITY or DISABLED.');
    }

    $connection->real_connect($host, $user, $password, $database, $port, null, $flags);

    // Do not allow a successful TLS request to fall back to an unencrypted link.
    if (!$connection->connect_errno && $mode !== 'DISABLED') {
        $result = $connection->query("SHOW SESSION STATUS LIKE 'Ssl_cipher'");
        $cipher = $result ? $result->fetch_assoc() : null;
        if ($result) {
            $result->free();
        }
        if (!$cipher || $cipher['Value'] === '') {
            $connection->close();
            throw new RuntimeException('The database connection did not negotiate TLS.');
        }
    }

    return $connection;
}
