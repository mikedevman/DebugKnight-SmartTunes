<?php
session_start();

$host = "127.0.0.1";
$user = "root";
$password = "";
$dbname = "music_db";

$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$error = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    $stmt = $conn->prepare("SELECT id, password_hash FROM user WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        $stmt->bind_result($id, $hash);
        $stmt->fetch();

        if (password_verify($password, $hash)) {
            $_SESSION["user_id"] = $id;
            $_SESSION["username"] = $username;
            header("Location: index.php");
            exit;
        } else {
            $error = "Invalid password.";
        }
    } else {
        $error = "User not found.";
    }

    $stmt->close();
}
$conn->close();
?>


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Login - SolMusic</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

    body {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(145deg, #0b1033, #070c2b);
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .form-container {
      background: #121b45;
      padding: 40px 30px;
      border-radius: 16px;
      width: 360px;
      box-shadow: 0 0 25px rgba(248, 31, 127, 0.15);
      border: 1px solid #1e2b66;
    }

    .form-container h2 {
      text-align: center;
      margin-bottom: 30px;
      color: #f81f7f;
      font-weight: 600;
      font-size: 26px;
      letter-spacing: 1px;
    }

    .form-container input {
      width: 100%;
      padding: 14px 15px;
      margin-bottom: 16px;
      background-color: #1b2344;
      border: 1px solid #2c366a;
      border-radius: 8px;
      color: #fff;
      font-size: 15px;
      transition: 0.3s;
    }

    .form-container input:focus {
      outline: none;
      border-color: #f81f7f;
      box-shadow: 0 0 5px #f81f7f88;
    }

    .form-container input::placeholder {
      color: #888;
    }

    .form-container button {
      width: 100%;
      padding: 14px;
      background-color: #f81f7f;
      border: none;
      border-radius: 8px;
      color: white;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 0.5px;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .form-container button:hover {
      background-color: #e30e6c;
    }

    .form-container .link {
      text-align: center;
      margin-top: 18px;
      font-size: 14px;
    }

    .form-container .link a {
      color: #f81f7f;
      text-decoration: none;
      font-weight: 500;
    }

    .form-container .link a:hover {
      text-decoration: underline;
    }

    .error-message {
      background-color: #ff3d57;
      color: white;
      padding: 10px 15px;
      border-radius: 6px;
      text-align: center;
      margin-bottom: 18px;
      font-size: 14px;
      box-shadow: 0 0 8px rgba(255, 61, 87, 0.3);
    }
  </style>
</head>
<body>
  <div class="form-container">
    <h2>Login</h2>

    <?php if (!empty($error)): ?>
      <div class="error-message">
        <?= htmlspecialchars($error) ?>
      </div>
    <?php endif; ?>

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

