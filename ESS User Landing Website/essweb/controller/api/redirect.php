<?php

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
//         $response['function'] = $FN_NAME;
//         $response['data'] = $FN_DATA;
//         $json_response = json_encode($response);
//         echo $json_response;
//     }

// }

// $request = $_SERVER['REQUEST_URI'];
//   echo $request;

//   switch ($request) {
//       case `/` :
//           require __DIR__ . '/views/navbar.html';
//           break;
//       case '' :
//           require __DIR__ . '';
//           break;
//       case '/about' :
//           require __DIR__ . '/index.php?link=contact';
//           break;
//       case '/home' :
//         require __DIR__ . '';
//         break;
//       default:
//           http_response_code(404);
//           require __DIR__ . '/index.php?link=contact';
//           break;
//   }



?>