<?php
session_start();

$host = "127.0.0.1";
$user = "root";
$password = "";
$dbname = "music_db";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$message = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    if (!empty($username) && !empty($password)) {
        $check = $conn->prepare("SELECT id FROM user WHERE username = ?");
        $check->bind_param("s", $username);
        $check->execute();
        $check->store_result();

        if ($check->num_rows > 0) {
            $message = "Username already exists!";
        } else {
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $conn->prepare("INSERT INTO user (username, password_hash, playlists_created) VALUES (?, ?, 0)");
            $stmt->bind_param("ss", $username, $hash);
            if ($stmt->execute()) {
                header("Location: login.php");
                exit;
            } else {
                $message = "Registration failed. Please try again.";
            }
        }

        $check->close();
    } else {
        $message = "All fields are required.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Register - SmartTunes</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: 'Inter', sans-serif;
      background-color: #0B1033;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .form-container {
      background-color: #121b45;
      padding: 40px 30px;
      border-radius: 16px;
      width: 360px;
      box-shadow: 0 0 25px rgba(248, 31, 127, 0.15);
      border: 1px solid #1e2b66;
    }

    .form-container h2 {
      text-align: center;
      margin-bottom: 25px;
      color: #f81f7f;
      font-size: 26px;
      font-weight: 600;
    }

    .form-container input {
      width: 100%;
      padding: 14px;
      margin-bottom: 16px;
      background-color: #1b2344;
      border: 1px solid #2c366a;
      border-radius: 8px;
      color: white;
      font-size: 15px;
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
      background-color: #e60e6d;
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
    <h2>Register</h2>

    <?php if (!empty($message)): ?>
      <div class="error-message"><?= htmlspecialchars($message) ?></div>
    <?php endif; ?>

    <form action="register.php" method="POST">
      <input type="text" name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>

    <div class="link">
      Already have an account? <a href="login.php">Login</a>
    </div>
  </div>
</body>
</html>
