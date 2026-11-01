<?php
// Shared, bounded song queries for the karaoke library and album contents.
function smarttunes_song_record($row)
{
    return [
        'id' => $row['song_id'],
        'title' => $row['name'],
        'video' => !empty($row['content']) ? $row['content'] : null,
        'tempo' => $row['tempo'],
        'songkey' => $row['key'],
        'genre' => $row['genre'],
        'year' => $row['year_publish'],
        'album' => $row['album'],
        'timeplayed' => $row['time_played'],
    ];
}

function smarttunes_song_page($conn, $albumId = null, $playlistId = null)
{
    $page = filter_var($_GET['page'] ?? 1, FILTER_VALIDATE_INT,
        ['options' => ['default' => 1, 'min_range' => 1]]) ?: 1;
    $perPage = 20;
    $sort = is_string($_GET['sort'] ?? null) ? $_GET['sort'] : '';
    $query = is_string($_GET['q'] ?? null) ? trim($_GET['q']) : '';
    $where = [];
    $types = '';
    $params = [];
    if ($albumId !== null) {
        $where[] = 'album = ?';
        $types .= 'i';
        $params[] = $albumId;
    }
    if ($playlistId !== null) {
        $where[] = 'EXISTS (SELECT 1 FROM playlist_song ps WHERE ps.song_id = song.song_id AND ps.playlist_id = ?)';
        $types .= 'i';
        $params[] = $playlistId;
    }
    $scopeWhere = $where;
    $scopeTypes = $types;
    $scopeParams = $params;
    if ($query !== '') {
        $where[] = "name LIKE ? ESCAPE '!'";
        $types .= 's';
        $params[] = '%' . str_replace(['!', '%', '_'], ['!!', '!%', '!_'], $query) . '%';
    }
    $whereSql = $where ? 'WHERE ' . implode(' AND ', $where) : '';
    $order = match ($sort) {
        'az' => 'name ASC, song_id DESC',
        'za' => 'name DESC, song_id DESC',
        'views' => 'view DESC, song_id DESC',
        'played' => 'time_played DESC, song_id DESC',
        default => 'song_id DESC',
    };

    $stmt = $conn->prepare("SELECT COUNT(*) AS total FROM song $whereSql");
    if ($types !== '') {
        $stmt->bind_param($types, ...$params);
    }
    $stmt->execute();
    $total = (int) $stmt->get_result()->fetch_assoc()['total'];
    $stmt->close();
    $totalPages = max(1, (int) ceil($total / $perPage));
    $page = min($page, $totalPages);
    $offset = ($page - 1) * $perPage;

    $stmt = $conn->prepare("SELECT * FROM song $whereSql ORDER BY $order LIMIT ? OFFSET ?");
    $pageParams = array_merge($params, [$perPage, $offset]);
    $stmt->bind_param($types . 'ii', ...$pageParams);
    $stmt->execute();
    $result = $stmt->get_result();
    $songs = [];
    while ($row = $result->fetch_assoc()) {
        $songs[] = smarttunes_song_record($row);
    }
    $stmt->close();

    $response = [
        'success' => true,
        'songs' => $songs,
        'pagination' => [
            'page' => $page, 'per_page' => $perPage, 'total' => $total,
            'total_pages' => $totalPages,
            'from' => $total > 0 ? $offset + 1 : 0,
            'to' => min($offset + $perPage, $total),
        ],
    ];

    // Deep links must play even if the selected song is outside the visible page.
    $selectedId = filter_var($_GET['selected_id'] ?? null, FILTER_VALIDATE_INT,
        ['options' => ['min_range' => 1]]);
    if ($selectedId) {
        $response['selected_song'] = null;
        $selectedWhere = array_merge(['song_id = ?'], $scopeWhere);
        $selectedParams = array_merge([$selectedId], $scopeParams);
        $stmt = $conn->prepare('SELECT * FROM song WHERE ' . implode(' AND ', $selectedWhere) . ' LIMIT 1');
        $stmt->bind_param('i' . $scopeTypes, ...$selectedParams);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        if ($row) {
            $response['selected_song'] = smarttunes_song_record($row);
        }
        $stmt->close();
    }
    return $response;
}
