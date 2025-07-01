<?php
session_start();

$host = "127.0.0.1";
$user = "root";
$password = "";
$dbname = "register";

$conn = new mysqli($host, $user, $password, $dbname);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT ID, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        $stmt->bind_result($ID, $hashed_password);
        $stmt->fetch();

        if (password_verify($password, $hashed_password)) {
            $_SESSION['ID'] = $ID;
            $_SESSION['username'] = $username;
            header("Location: index.html");
            exit();
        } else {
            echo "Invalid password!";
        }
    } else {
        echo "No user found!";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <header><img src="img\logo.png" alt="Logo"></header>
    <title>Login to start listening</title>
</head>
<body>
    <form method="POST">
        Username <input type="text" name="username" required><br><br>
        Password <input type="password" name="password" required><br><br>
        <input type="submit" value="Login">
    </form>
</body>
</html>
