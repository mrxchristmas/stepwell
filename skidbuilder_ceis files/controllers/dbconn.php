<?php

$server = "198.71.225.55";
$username = "ceis_noel";
$password = "qwerty123";
// $username = "IWPG_ph14147720851";
// $password = "Prodocuflow123";

$dbname = isset($_COOKIE["DATABASE_ID"]) ? $_COOKIE["DATABASE_ID"] : "";
// $dbname = "admincontrol_db";
// $dbname = "stepwelldb";


$link = mysqli_connect($server,$username,$password, $dbname) or die("Connection failed: " . mysqli_connect_error());


$allowedOrigins = array(
    '(http(s)://)?(www\.)?prodocuflow\.com',
    '(http(s)://)?(localhost:8080/)?stepwell/'
);
   
  if (isset($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] != '') {
    foreach ($allowedOrigins as $allowedOrigin) {
      if (preg_match('#' . $allowedOrigin . '#', $_SERVER['HTTP_ORIGIN'])) {
        // header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
        header('Access-Control-Max-Age: 1000');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
        break;
      }
    }
  }

  
?>