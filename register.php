<?php
    $host = "127.0.0.1";
    $user = "root";
    $password = "";
    $dbname = "register";

    $conn = new mysqli($host, $user, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $username = $_POST["username"];
        $password = $_POST["password"];

        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        if (!$stmt) {
            die("Prepare failed: " . $conn->error);
        }
        $stmt->bind_param("ss", $username, $hashed_password);


        if ($stmt->execute()) {
            header("Location: login.php");
        }
        else {
            echo "Error: Couldn't register!";
        }

    }
?>

<!DOCTYPE html>
<html>
<head>
    <header><img src="img\logo.png" alt="Logo"></header>
    <title>Create an account to start listening</title>
</head>
<body>
    <form method="POST">
        Username <input type="text" name="username" required><br><br>
        Password <input type="password" name="password" required><br><br>
        <input type="submit" value="Register">
    </form>
</body>
</html>