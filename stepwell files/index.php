<html lang="en">
<?php
  include "controllers/defaults.php";
?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CEIS - Login</title>
    <base href="<?php echo($rootLocation); ?>" target="_self">
    <link href="lib/css/default.css" rel="stylesheet" />
    <link href="lib/css/main.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.13.0/css/all.css">

</head>
<!-- <body onload="api_init()"> -->
<body>
    

  <form action="" id="loginform">
    <div class="loginbox">
      <h2 class="login-title">Welcome to CEIS</h2>
      <input id="login-id" type="text" placeholder="Company Id">
      <button id="login-submit" class="btn-shadow">Enter</button>
      <img class="login-image hidden" src="lib/images/avatardefault.png" >
      <h2 class="login-greeting hidden">Welcome back, Noel</h2>
      <button class="login-continue btn-shadow hidden">Continue Login</button>
      <input id="login-userid" class="login-tbox hidden" type="text" placeholder="User Id">
      <input id="login-email" class="login-tbox hidden" type="text" placeholder="Email">
      <input id="login-password" class="login-tbox hidden" type="password" placeholder="Password">
      <div class="login-remember hidden">
        <label for="remember">Remember me on this Computer</label>
        <input type="checkbox" class="" id="remember">
      </div>
      <button class="login-btn btn-shadow hidden">Login</button>
    </div>
  </form>

  <form action="" id="remember-form" class="color-main">
    <i class="fas fa-caret-left remember-back"></i>
    <img id="i"  class="remember-image" src="lib/images/user4.jpg" >
    <img class="remember-company-image" src="lib/images/company3.jpg" >
    <span class="remember-greeting">Welcome back, <span class="remember-name">Tony</span></span>
    <input class="remember-password" type="password" placeholder="Please Enter your Password">
    <button class="remember-submit btn-shadow">Login</button>
  </form>






    <script src="lib/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="lib/js/jquery-ui.js" type="text/javascript"></script>
    <script src="lib/js/colors.js" type="text/javascript"></script>
    <script src="controllers/defaults.js" type="text/javascript"></script>
    <script src="controllers/global.js" type="text/javascript"></script>
    <script src="controllers/js/main.js" type="text/javascript"></script>
    <script src="controllers/js/api_account.js" type="text/javascript"></script>
    <script src="controllers/js/api_admin.js" type="text/javascript"></script>
    <script src="model/classes/class_admin.js" type="text/javascript"></script>
</body>
</html>