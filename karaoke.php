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
    <title>SmartTunes - Karaoke</title>
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
    <!-- View/Edit Song Details -->  
    <div class="upload-container" style="display: none" id="viewEditContainer">
      <button class="close-upload" id="closeViewEditBtn">&times;</button>
      <h2>Edit Song Details</h2>
      <form class="upload-form" id="viewEditForm" onsubmit="return saveEditedSong(event)">
        <input type="hidden" name="id" id="edit_id" />

        <label for="edit_title">Song Title:</label>
        <input type="text" name="title" id="edit_title" required />

        <label for="edit_content">YouTube Link:</label>
        <input type="text" name="content" id="edit_content" required />

        <label for="edit_tempo">Tempo (BPM):</label>
        <input type="number" name="tempo" id="edit_tempo" required />

        <label for="edit_songkey">Key:</label>
        <input type="text" name="songkey" id="edit_songkey" required />

        <label for="edit_genre">Genre:</label>
        <input type="text" name="genre" id="edit_genre" required />

        <label for="edit_year">Year Published:</label>
        <input type="number" name="year" id="edit_year" required />

        <label for="edit_album">Album:</label>
        <select name="album" id="edit_album" required>
          <option value="" disabled>Select album</option>
          <option value="1">Album 1</option>
          <option value="2">Album 2</option>
        </select>

        <button type="submit" class="site-btn">Save</button>
      </form>
    </div>

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
        <li><a href="playlists.php">Playlists</a></li>
        <li><a href="contact.php">Contact Us</a></li>
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
          style="max-height: 690px; overflow-y: auto"
        >
        <div class="song-list-header">
          <button id="show-upload-btn" class="btn btn-outline-light">
            Upload Song
            </button>

            <h2>Song List</h2>
            <button id="delete-selected-btn" class="btn btn-danger">
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
            <span id="record-timer" style="margin-left: 10px; font-weight: bold;"></span>
<span id="recording-status" style="display: block; margin-top: 10px;"></span>
            <span id="recording-status" style="margin-left: 10px; font-weight: 600;"></span>
          </div>
          <audio id="playback" controls style="display: none; margin-top: 15px; width: 100%;"></audio>
        </div>
        
      </div>

    </div>

    <!-- Upload Form Popup -->
    <div class="upload-container" style="display: none" id="uploadContainer">
  <button class="close-upload" id="closeUploadBtn">&times;</button>
  <h2>Upload a YouTube Song</h2>
  <form class="upload-form" action="upload_song.php" method="POST">
    <label for="title">Song Title:</label>
    <input type="text" name="title" placeholder="Enter song title" required />

    <label for="content">YouTube Link:</label>
    <input type="text" name="content" placeholder="https://www.youtube.com/watch?v=..." required />

    <label for="tempo">Tempo (BPM):</label>
    <input type="number" name="tempo" placeholder="Enter tempo" required />

    <label for="songkey">Key:</label>
    <input type="text" name="songkey" placeholder="Enter song key (e.g. C, Gm)" required />

    <label for="genre">Genre:</label>
    <input type="text" name="genre" placeholder="Enter genre" required />

    <label for="year">Year Published:</label>
    <input type="number" name="year" placeholder="2020" required />

    <label for="album">Album:</label>
    <select name="album" required>
      <option value="" disabled selected>Select album</option>
      <option value="1">Album 1</option>
      <option value="2">Album 2</option>
    </select>

    <button type="submit" class="site-btn">Upload</button>
  </form>
</div>

    <!-- Form Upload ẩn -->

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
    <script src="js/karaoke-recorder.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/pitchy@1.2.0/dist/pitchy.umd.js"></script>
  </body>
</html>
