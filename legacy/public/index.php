<?php
// One public entry point; existing page and API URLs stay unchanged.
require_once dirname(__DIR__) . '/app/bootstrap.php';

$legacyRouteMap = require LEGACY_ROOT . '/app/config/routes.php';
$legacyRequestPath = parse_url($_SERVER['REQUEST_URI'] ?? '/index.php', PHP_URL_PATH);
$legacyEntry = str_ends_with($legacyRequestPath, '/') ? 'index.php' : strtolower(basename($legacyRequestPath));

if (!isset($legacyRouteMap[$legacyEntry])) {
    http_response_code(404);
    exit('Not found.');
}

require LEGACY_ROOT . '/' . $legacyRouteMap[$legacyEntry];
