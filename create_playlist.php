<?php
session_start();
    $host = "127.0.0.1";
    $user = "root";
    $password = "";
    $dbname = "user";

    $conn = new mysqli($host, $user, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

if (!isset($_SESSION['user_id'])) {
    die("You must be logged in to create a playlist.");
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $playlistName = $_POST['playlist_name'];
    $desc = $_POST['description'];
    $userID = $_SESSION['user_id'];

    $stmt = $conn->prepare("INSERT INTO Playlist (UserCreated, PlaylistName, Description) VALUES (?, ?, ?)");
    $stmt->bind_param("iss", $userID, $playlistName, $desc);
    $stmt->execute();
    $playlistID = $stmt->insert_id;

    foreach ($_FILES['songs']['tmp_name'] as $index => $tmpName) {
        $name = $_FILES['songs']['name'][$index];
        $targetPath = "uploads/" . basename($name);

        if (move_uploaded_file($tmpName, $targetPath)) {
            $stmt = $conn->prepare("INSERT INTO Song (Name, Content) VALUES (?, ?)");
            $stmt->bind_param("ss", $name, $targetPath);
            $stmt->execute();
            $songID = $stmt->insert_id;

            $stmt2 = $conn->prepare("INSERT INTO PlaylistSong (PlaylistID, SongID, DateAdded) VALUES (?, ?, NOW())");
            $stmt2->bind_param("ii", $playlistID, $songID);
            $stmt2->execute();
        }
    }

    echo "Playlist created and songs uploaded!";
}
?>
