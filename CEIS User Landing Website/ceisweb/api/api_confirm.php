<?php
include '../controller/dbconn.php';
include '../controller/defaults.php';
header("Content-Type:application/json");
// session_start();


// function UniqueMachineID() {  
//     return gethostname();
//     // $localIP = getHostByName(php_uname('n'));
//     // $localIP = getHostByName(getHostName());
// }

// $dbname = $_COOKIE["DATABASE_ID"];
// $link = mysqli_connect($server,$username,$password, $dbname) or die("Connection failed: " . mysqli_connect_error());

if (isset($_GET['function']) && $_GET['function']!="") {

    if($_GET['function'] == 'createConfirm'){
        $email = $_GET['email'];
        $code = $_GET['code'];

        $query = "INSERT INTO `web_confirm` (email, code) VALUES ( '$email', '$code')";
        

        if(mysqli_query($link , $query)){
            $response['response'] = 'success';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    
    
}else if (isset($_GET['email']) && $_GET['email']!="" && isset($_GET['code']) && $_GET['code']!="") {

    // $email = $_GET['email'];
    // $code = $_GET['code'];

    $email = $_GET['email'];
    $code = $_GET['code'];

    $query = "CALL confirmEmail('$email', '$code', @cc); SELECT @cc as status;";
    $link->multi_query($query);
    $link->next_result();
    $rs = $link->store_result();  
    $status = $rs->fetch_object()->status;

    header("Location: " . $rootLocation . 'pages/confirm/' . $status . "?email=" . $email);
    mysqli_close($link); 
    $rs->free();
    
}





?>