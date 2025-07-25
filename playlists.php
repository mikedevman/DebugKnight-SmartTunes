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
    <title>SmartTunes - Artists</title>
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
    <section class="playlist-section spad">
      <div class="container-fluid">
        <div class="section-title">
          <h2>Playlists</h2>
        </div>

        <div class="clearfix"></div>
        <div class="row playlist-area">
            <div class="mix col-lg-3 col-md-4 col-sm-6 genres">
              <div class="playlist-item">
                  <a href="playlist.php">
                    <img
                      src="img\playlist-img.png"
                      alt=""
                    />
                    <h5>Soobin Hoàng Sơn</h5>
                  </a>
                </div>
            </div>

          <div class="mix col-lg-3 col-md-4 col-sm-6 movies">
            <div class="playlist-item">
              <img
                src="D:\Download\DatabaseProject\img\playlist\J97.webp"
                alt=""
              />
              <h5>Trịnh Trần Phương Tuấn</h5>
            </div>
          </div>

          <div class="mix col-lg-3 col-md-4 col-sm-6 artists">
            <div class="playlist-item">
              <a href="playlist.php">
                <img
                  src="D:\Download\DatabaseProject\img\Soobin-H.jpg"
                  alt=""
                />
                <h5>Soobin Hoàng Sơn</h5>
              </a>
            </div>
          </div>

          <div class="mix col-lg-3 col-md-4 col-sm-6 labels">
            <div class="playlist-item">
              <a href="playlist.php">
                <img
                  src="D:\Download\DatabaseProject\img\Soobin-H.jpg"
                  alt=""
                />
                <h5>Soobin Hoàng Sơn</h5>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
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
