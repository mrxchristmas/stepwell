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

    if($_GET['function'] == 'createAccount'){
        $email = $_GET['email'];
        $firstname = $_GET['firstname'];
        $lastname = $_GET['lastname'];
        $phone = $_GET['phone'];
        $companyname = $_GET['companyname'];
        $password = sha1($_GET['password']);

        
        $query = "INSERT INTO `web_account` (email, firstname, lastname, phone, companyname, `password`) 
        VALUES ( '$email', '$firstname', '$lastname', '$phone', '$companyname', '$password');";

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
    if($_GET['function'] == 'updateAccount'){
        $email = $_GET['email'];
        $firstname = $_GET['firstname'];
        $lastname = $_GET['lastname'];
        $phone = $_GET['phone'];
        $companyname = $_GET['companyname'];

        $query = "UPDATE `web_account` SET firstname = '$firstname', lastname = '$lastname', phone = '$phone', companyname = '$companyname'
        WHERE `email` = '$email';" ;

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
    if($_GET['function'] == 'updateAccountPassword'){
        $email = $_GET['email'];
        $password = sha1($_GET['password']);

        $query = "UPDATE `web_account` SET `password` = '$password'
        WHERE `email` = '$email';" ;

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
    if($_GET['function'] == 'updateAccountCompanyId'){
        $email = $_GET['email'];
        $companyid = $_GET['companyid'];

        $query = "UPDATE `web_account` SET `companyid` = '$companyid'
        WHERE `email` = '$email';" ;

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
    
}

?>