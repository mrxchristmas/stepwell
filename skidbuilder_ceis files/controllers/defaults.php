<?php
$rootLocation = 'http://localhost:8080/skidbuilder_ceis/';
$controlLocation = 'http://localhost:8080/stepwell/';

// $rootLocation = 'http://skidbuilder.prodocuflow.com/';
// $controlLocation = 'http://development.prodocuflow.com/';


if (isset($_GET['function']) && $_GET['function']!="") {

    if($_GET['function'] == 'redirect'){
        session_start();
        $__ID = $_GET['__ID'];
        $__USER_LEVEL = $_GET['__USER_LEVEL'];
        $__PASSWORD = $_GET['__PASSWORD'];
        $__PHOTO = $_GET['__PHOTO'];
        $__FIRST_NAME = $_GET['__FIRST_NAME'];
        $__COMPANY_ID = $_GET['__COMPANY_ID'];
        $__COMPANY_NAME = $_GET['__COMPANY_NAME'];
        $__COMPANY_LOGO = $_GET['__COMPANY_LOGO'];
        $__DATABASE_ID = $_GET['__DATABASE_ID'];

        $_SESSION['COMPANY_ID'] = $__COMPANY_ID;
        $_SESSION['COMPANY_NAME'] = $__COMPANY_NAME;
        $_SESSION['COMPANY_LOGO'] = $__COMPANY_LOGO;
        $_SESSION['DATABASE_ID'] = $__DATABASE_ID;
        $_SESSION['ID'] = $__ID;
        $_SESSION['USER_LEVEL'] = $__USER_LEVEL;
        $_SESSION['PASSWORD'] = $__PASSWORD;
        $_SESSION['PHOTO'] = $__PHOTO;
        $_SESSION['FIRST_NAME'] = $__FIRST_NAME;

        setcookie("DATABASE_ID", $_GET['__DATABASE_ID']);



        // $response['COMPANY_ID'] = $_SESSION['COMPANY_ID'];
        // $response['COMPANY_NAME'] = $_SESSION['COMPANY_NAME'];
        // $response['COMPANY_LOGO'] = $_SESSION['COMPANY_LOGO'];
        // $response['DATABASE_ID'] = $_SESSION['DATABASE_ID'];
        // $response['ID'] = $_SESSION['ID'];
        // $response['USER_LEVEL'] = $_SESSION['USER_LEVEL'];
        // $response['PASSWORD'] = $_SESSION['PASSWORD'];
        // $response['PHOTO'] = $_SESSION['PHOTO'];
        // $response['FIRST_NAME'] = $_SESSION['FIRSTNAME'];

        // $json_response = json_encode($response);
        // echo $json_response;

        // unset($_QUERY['__ID']);
        // header($rootLocation);
        // $x = 'http://url.com/search/?location=london&page_number=1';

        // $parsed = parse_url($x);
        // $query = $parsed['query'];

        // parse_str($query, $params);

        // echo($params['page_number']);
        // unset($params['page_number']);
        // $string = http_build_query($params);
        // var_dump($string);
        // echo($_SERVER['REQUEST_URI']);
        
        // http_build_query($rootLocation);
        // http_build_query('', $rootLocation);
    }

}
?>