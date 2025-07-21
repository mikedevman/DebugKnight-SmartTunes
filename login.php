<?php
session_start();

$host = "127.0.0.1";
$user = "root";
$password = "";
$dbname = "user";

$conn = new mysqli($host, $user, $password, $dbname);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    $stmt = $conn->prepare("SELECT * FROM user WHERE Username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        if ($row['Password'] === $password) {
            $_SESSION['user_id'] = $row['ID'];
            $_SESSION['username'] = $row['Username'];
            echo "Login successful! Redirecting...";
            header("Location: index.php");
            exit;
        } else {
            echo "Incorrect password!";
        }
    } else {
        echo "User not found!";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Login</title>
  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
      background-color: #0B1033; /* navy background */
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .form-container {
      background-color: #111840;
      padding: 40px 30px;
      border-radius: 10px;
      width: 350px;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
    }

    .form-container h2 {
      text-align: center;
      margin-bottom: 25px;
      color: #f81f7f; /* match SOLMUSIC pink */
    }

    .form-container input {
      width: 100%;
      padding: 12px;
      margin: 10px 0;
      background-color: #1b2344;
      border: none;
      border-radius: 5px;
      color: white;
      font-size: 14px;
    }

    .form-container input::placeholder {
      color: #888;
    }

    .form-container button {
      width: 100%;
      padding: 12px;
      margin-top: 15px;
      background-color: #f81f7f;
      border: none;
      border-radius: 5px;
      color: white;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.3s;
    }

    .form-container button:hover {
      background-color: #e60e6d;
    }

    .form-container .link {
      text-align: center;
      margin-top: 15px;
      font-size: 14px;
    }

    .form-container .link a {
      color: #f81f7f;
      text-decoration: none;
    }

    .form-container .link a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="form-container">
    <h2>Login</h2>
    <form action="login.php" method="POST">
      <input type="text" name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <div class="link">
      Don't have an account? <a href="register.php">Register</a>
    </div>
  </div>
</body>
</html>

