<html lang="en">
<?php
  include "controller/defaults.php";


//   Header always set Access-Control-Allow-Origin "https://esscorp.ca"

  // RewriteEngine On
  // RewriteCond %{HTTP_HOST} ^esscorp.ca
  // RewriteRule (.*) https://www.esscorp.ca/$1 [R=301,L]
  // RewriteCond %{HTTPS} !=on
  // RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301] 

  // $request = $_SERVER['REQUEST_URI'];
  // echo $request;

  // switch ($request) {
  //     case `/` :
  //         require __DIR__ . '/views/navbar.html';
  //         break;
  //     case '' :
  //         require __DIR__ . '';
  //         break;
  //     case '/about' :
  //         require __DIR__ . '/index.php?link=contact';
  //         break;
  //     case '/home' :
  //       require __DIR__ . '';
  //       break;
  //     default:
  //         http_response_code(404);
  //         require __DIR__ . '/index.php?link=contact';
  //         break;
  // }

  // $FN_NAME = '';
  // $FN_DATA = '';

  // $path = ltrim($_SERVER['REQUEST_URI'], '/');    // Trim leading slash(es)
  // $elements = explode('/', $path);                // Split path on slashes
  // if(empty($elements[0])) {                       // No path elements means home
  //     ShowHomepage();
  // } else switch(array_shift($elements)){           // Pop off first item and switch

  //     case 'products':
  //         // ShowPicture($elements); // passes rest of parameters to internal function
  //         $FN_NAME = 'TESTING';
  //         $FN_DATA = $elements;
  //         break;
  //     default:
  //         header('HTTP/1.1 404 Not Found');
  //         // Show404Error();
  // }


  // if (isset($_GET['function']) && $_GET['function']!="") {

  //     if($_GET['function'] == 'test'){
  //         $response['response'] = 'error';
  //         $response['function'] = '';
  //         $response['data'] = '';
  //         $json_response = json_encode($response);
  //         echo $json_response;
  //     }

  // }

?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ESS</title>
    <base href="<?php echo($rootLocation); ?>" target="_self">


    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="manifest" href="./manifest.json">
    <link rel="shortcut icon" href="lib/images/favicon.ico" type="image/x-icon"/>
    <link rel="icon" href="lib/images/favicon.ico" type="image/x-icon"/>

    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.13.0/css/all.css">
    <link href="lib/css/mobile.css" rel="stylesheet" />
    <link href="lib/css/index.css" rel="stylesheet" />
    <link href="lib/css/home.css" rel="stylesheet" />
    <link href="lib/css/multipage.css" rel="stylesheet" />
    <link href="lib/css/singlepage.css" rel="stylesheet" />
    <link href="lib/css/referencepage.css" rel="stylesheet" />
    <link href="lib/css/news.css" rel="stylesheet" />
    <link href="lib/css/style_renamed.css" rel="stylesheet" />
    <link href="lib/css/recruitment.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
      integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
      crossorigin=""/>
    <link href="lib/css/defaults.css" rel="stylesheet" />

    <link rel="manifest" href="manifest.json">

    <!-- <link rel="shortcut icon" type="image/png" href="http://www.esscorp.ca/lib/images/essbdt.png"> -->
</head>
<body onload="init();">
    <div id="content">
      <div id="loader">
        <i class="fas fa-cog"></i>
        <i class="fas fa-circle-notch"></i>
        <i class="fas fa-compact-disc"></i>
      </div>
      <div id="toast" class="hidden">
        <span>Message is too long  that i cannot comprehend  whatever its saying</span>
      </div>
      <?php
        // echo 'Hello ' . $_GET["link"] . '+++++' . isset($_GET['link']);
        include "views/searchbar.html";
        include "views/header.html";
        include "views/navbar.html";
        include "views/mobilenavbar.html";
        include "views/page.php";
        // include "views/footer.html"; 
      ?>
    </div>
    
    


    <!-- <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
    crossorigin=""></script> -->
    <script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"> 
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js" integrity="sha512-/seDHxVfh1NvFUscAj8GsHQVZJvr2jjAoYsNL7As2FCaFHUHYIarl3sRCvVlFgyouVNiRgHIebyLKjpgd1SLDw==" crossorigin="anonymous"></script>
    <script src="https://smtpjs.com/v3/smtp.js"></script>
    <script src="lib/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="lib/js/jquery-ui.js" type="text/javascript"></script>
    <script src="lib/js/jquery.rwdImageMaps.min.js" type="text/javascript"></script>
    
    <script src="class/main.js" type="text/javascript"></script>
    <script src="lib/js/index.js" type="text/javascript"></script>
    <script src="controller/defaults.js" type="text/javascript"></script>
    <!-- <script src="controller/js/api_redirect.js" type="text/javascript"></script> -->

    <script src="lib/js/multipage.js" type="text/javascript"></script>
    <script src="lib/js/mobile.js" type="text/javascript"></script>
    <script src="lib/js/singlepage.js" type="text/javascript"></script>
    <script src="lib/js/referencepage.js" type="text/javascript"></script>
    <script src="lib/js/news.js" type="text/javascript"></script>
    <script src="lib/js/script_file.js" type="text/javascript"></script>
    <script src="lib/js/recruitment.js" type="text/javascript"></script>
    <!-- <script src="controller/js/api_children.js" type="text/javascript"></script> -->
    
    
</body>
</html>
