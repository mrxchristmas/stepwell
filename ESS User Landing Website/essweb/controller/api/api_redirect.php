<?php
// include '../dbconn.php';
// header("Content-Type:application/json");

        // $zlink = $_GET['link'];

        $response['link'] = $_GET['link'];
        // $response['zzz'] = 'TORPE';
        $json_response = json_encode($response);
        echo $json_response;

    // if ( isset($_GET['link']) ) {

    //     $link = $_GET['link'];
    //     $response['link'] = $link;
    //     $json_response = json_encode($response);
    //     echo $json_response;

    // }else{
    //     $response['link'] = 'NO DATA';
    //     $json_response = json_encode($response);
    //     echo $json_response;
    // }

?>
