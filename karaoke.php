<?php
session_start();
if (!isset($_SESSION['username'])) {
  header("Location: login.php");
  exit();
}
?>

<!DOCTYPE html>
<html lang="zxx">
  <head>
    <title>SolMusic | HTML Template</title>
    <meta charset="UTF-8" />
    <meta name="description" content="SolMusic HTML Template" />
    <meta name="keywords" content="music, html" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link href="img/favicon.ico" rel="shortcut icon" />

    <link
      href="https://fonts.googleapis.com/css?family=Montserrat:300,300i,400,400i,500,500i,600,600i,700,700i&display=swap"
      rel="stylesheet"
    />

    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/font-awesome.min.css" />
    <link rel="stylesheet" href="css/owl.carousel.min.css" />
    <link rel="stylesheet" href="css/slicknav.min.css" />

    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body>
    <div id="preloder">
      <div class="loader"></div>
    </div>

    <header class="header-section clearfix">
      <a href="index.html" class="site-logo">
        <img src="img/logo.png" alt="" />
      </a>
      <div class="header-right">
        <a href="logout.php" class="hr-btn">Logout</a>
        <span>|</span>
        <div class="user-panel">
          <a href="" class="login">Login</a>
          <a href="" class="register">Create an account</a>
        </div>
      </div>
      <ul class="main-menu">
        <li><a href="index.php">Home</a></li>
        <li><a href="karaoke.php">Karaoke</a></li>
        <li><a href="artists.html">Artists</a></li>
        <li><a href="AddSong.php">Add Song</a></li>
        <li><a href="contact.html">Contact Us</a></li>
      </ul>
    </header>

    <div class="main-karaoke-content">
      <div class="left-panel">
        <div class="song-search-area">
          <div class="search-input-wrapper">
            <input
              type="text"
              id="song-search"
              placeholder="Enter song name or artirst"
            />
            <i class="fa fa-search search-icon" id="search-icon-btn"></i>
          </div>
        </div>

        <div
          class="song-list-wrapper"
          style="max-height: 530px; overflow-y: auto"
        >
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
            "
          >
            <h2>Song List</h2>
            <button
              id="delete-selected-btn"
              style="font-size: 14px; padding: 4px 8px"
            >
              🗑️ Delete
            </button>
          </div>
          <ul id="song-list"></ul>
        </div>
      </div>

      <div class="right-panel">
        <div id="karaoke-container">
          <video id="karaoke-video" controls></video>
          <div id="lyrics" class="lyrics-container"></div>
          <button id="fullscreen-btn">⛶</button>
        </div>
      </div>
    </div>

    <footer class="footer-section">
      <div class="container">
        <div class="row">
          <div class="col-xl-6 col-lg-7 order-lg-2">
            <div class="row">
              <div class="col-sm-4">
                <div class="footer-widget">
                  <h2>About us</h2>
                  <ul>
                    <li><a href="">Our Story</a></li>
                    <li><a href="">Sol Music Blog</a></li>
                    <li><a href="">History</a></li>
                  </ul>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="footer-widget">
                  <h2>Products</h2>
                  <ul>
                    <li><a href="">Music</a></li>
                    <li><a href="">Subscription</a></li>
                    <li><a href="">Custom Music</a></li>
                    <li><a href="">Footage</a></li>
                  </ul>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="footer-widget">
                  <h2>Playlists</h2>
                  <ul>
                    <li><a href="">Newsletter</a></li>
                    <li><a href="">Careers</a></li>
                    <li><a href="">Press</a></li>
                    <li><a href="">Contact</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-5 order-lg-1">
            <img src="img/logo.png" alt="" />
            <div class="copyright">
              Made in
              <script>
                document.write(new Date().getFullYear());
              </script>
              | This website is made with
              <i class="fa fa-heart-o" aria-hidden="true"></i>
            </div>
            <div class="social-links">
              <a href=""><i class="fa fa-instagram"></i></a>
              <a href=""><i class="fa fa-pinterest"></i></a>
              <a href=""><i class="fa fa-facebook"></i></a>
              <a href=""><i class="fa fa-twitter"></i></a>
              <a href=""><i class="fa fa-youtube"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery.slicknav.min.js"></script>
    <script src="js/owl.carousel.min.js"></script>
    <script src="js/mixitup.min.js"></script>
    <script src="js/main.js"></script>
    <script src="js/karaoke.js"></script>

    <script src="js/jquery.jplayer.min.js"></script>
    <script src="js/wavesurfer.min.js"></script>

    <script src="js/WaveSurferInit.js"></script>
    <script src="js/jplayerInit.js"></script>
  </body>
</html>
