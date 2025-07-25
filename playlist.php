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
    <title>SmartTunes - Playlist</title>
    <meta charset="UTF-8" />
    <meta name="description" content="SmartTunes" />
    <meta name="keywords" content="music, html" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Favicon -->
    <link href="img/favicon.ico" rel="shortcut icon" />

    <!-- Google font -->
    <link
      href="https://fonts.googleapis.com/css?family=Montserrat:300,300i,400,400i,500,500i,600,600i,700,700i&display=swap"
      rel="stylesheet"
    />

    <!-- Stylesheets -->
    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/font-awesome.min.css" />
    <link rel="stylesheet" href="css/owl.carousel.min.css" />
    <link rel="stylesheet" href="css/slicknav.min.css" />

    <!-- Main Stylesheets -->
    <link rel="stylesheet" href="css/style.css" />

    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <!-- Page Preloder -->
    <div id="preloder">
      <div class="loader"></div>
    </div>

    <!-- Header section -->
    <header class="header-section clearfix">
      <a href="index.php" class="site-logo">
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
        <li><a href="playlists.php">Playlists</a></li>
        <li><a href="contact.php">Contact Us</a></li>
      </ul>
    </header>
    <!-- Header section end -->

    <!-- Playlist section -->
    <div class="playlist-1">
      <div class="d-flex h-100 align-items-end">
        <form class="search-form">
          <input type="text" placeholder=" Add Song Into Playlist" />
          <button>Add</button>
        </form>
      </div>
      
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
          style="max-height: 690px; overflow-y: auto"
        >
        <div class="song-list-header-2">
            <h2>Song List</h2>
            <button id="delete-selected-btn" class="btn btn-danger-2">
            Delete
            </button>
          </div>
          <ul id="song-list"></ul>
        </div>
      </div>

      <div class="right-panel">
        <div id="karaoke-container">
          <div id="karaoke-video-wrapper">
            <video id="karaoke-video" controls style="width: 100%; border-radius: 8px;"></video>
          </div>
        </div>
        <div id="recording-panel" style="margin-top: 20px; padding: 20px; border-radius: 10px; background: #181818; color: white; box-shadow: 0 0 10px rgba(0,0,0,0.5); width: 100%;">
          <h3 style="margin-bottom: 15px;"><i class="fa fa-microphone"></i> Vocal Recorder</h3>
          <div id="record-controls" style="display: flex; gap: 10px; align-items: center;">
            <button id="start-recording" class="btn btn-success">
              <i class="fa fa-circle"></i> Start Recording
            </button>
            <button id="stop-recording" class="btn btn-danger" disabled>
              <i class="fa fa-stop"></i> Stop
            </button>
            <span id="recording-status" style="margin-left: 10px; font-weight: 600;"></span>
          </div>
          <audio id="playback" controls style="display: none; margin-top: 15px; width: 100%;"></audio>
        </div>
        
      </div>

    </div>
    <!-- Playlist section end -->

    <!-- Footer section -->
    <footer class="footer-section">
      <div class="container">
        <div class="row">
          <div class="col-xl-6 col-lg-7 order-lg-2">
            <div class="row">
              <div class="col-sm-4">
                <div class="footer-widget">
                  <h2>About us</h2>
                  <ul>
                    <li><a href="index.php">Our Story</a></li>
                    <li><a href="">Sol Music Blog</a></li>
                    <li><a href="">History</a></li>
                  </ul>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="footer-widget">
                  <h2>Ultilities</h2>
                  <ul>
                    <li><a href="karaoke.php">Music</a></li>
                    <li><a href="artists.html">Artists</a></li>
                    <li><a href="karaoke.php">Karaoke</a></li>
                    <li><a href="karaoke.php">Add Song</a></li>
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
                Music from the heart
            </div>
            <div class="social-links">
              <a href="https://www.instagram.com/mikee.conv/?hl=en"><i class="fa fa-instagram"></i></a>
              <a href="https://www.facebook.com/namanh.ha.1042/"><i class="fa fa-facebook"></i></a>
              <a href="https://www.youtube.com/@Mike-b6t9v"><i class="fa fa-youtube"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <!-- Footer section end -->

    <!--====== Javascripts & Jquery ======-->
    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery.slicknav.min.js"></script>
    <script src="js/owl.carousel.min.js"></script>
    <script src="js/mixitup.min.js"></script>
    <script src="js/main.js"></script>
  </body>
</html>
