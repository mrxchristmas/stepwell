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

    if($_GET['function'] == 'login'){
        $email = $_GET['email'];
        $password = sha1($_GET['password']);
        $conf = '';

        $query = "SELECT * FROM web_account WHERE email = '$email' AND `password` = '$password'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            session_start();
            while($row = $rs->fetch_assoc()) {
                $conf = $row['confirmed'];
                if($conf == "true"){
                    $response['firstname'] = $row['firstname'];
                    $response['lastname'] = $row['lastname'];
                    $response['companyname'] = $row['companyname'];
                    $response['phone'] = $row['phone'];
                    $response['email'] = $row['email'];
                    $response['confirmed'] = $row['confirmed'];
    
                    $_SESSION["FIRSTNAME"] = $row['firstname'];
                    $_SESSION["LASTNAME"] = $row['lastname'];
                    $_SESSION["COMPANY_NAME"] = $row['companyname'];
                    $_SESSION["PHONE"] = $row['phone'];
                    $_SESSION["CONFIRMED"] = $row['confirmed'];
                }else{
                    $response['response'] = 'unconfirmed';
                }
            }
            
            if($conf == "true"){
                $_SESSION["EMAIL"] = $email;
                $_SESSION["PASSWORD"] = $password; 
            }

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
    if($_GET['function'] == 'logout'){
        session_start();
        session_destroy();
        $_SESSION = array();
        // if (isset($_COOKIE['DATABASE_ID'])) {
        //     unset($_COOKIE['DATABASE_ID']); 
        //     setcookie('DATABASE_ID', null, -1, '/'); 
        // }
    }
    if($_GET['function'] == 'checkIfLoggedIn'){
        session_start();
        if (isset($_SESSION['EMAIL'])){
            $response['FIRSTNAME'] = $_SESSION['FIRSTNAME'];
            $response['LASTNAME'] = $_SESSION['LASTNAME'];
            $response['COMPANY_NAME'] = $_SESSION['COMPANY_NAME'];
            $response['PHONE'] = $_SESSION['PHONE'];
            $response['EMAIL'] = $_SESSION['EMAIL'];
            $response['PASSWORD'] = $_SESSION['PASSWORD'];
            $response['CONFIRMED'] = $_SESSION['CONFIRMED'];
            $json_response = json_encode($response);
            echo $json_response;
            // echo json_encode($_SESSION['FIRSTNAME']);
        }else{
            $response['response'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
        }
    }
    if($_GET['function'] == 'validate'){
        $email = $_GET['email'];
        $password = sha1($_GET['password']);
    
        $query = "SELECT * FROM web_account WHERE email = '$email' AND `password` = '$password'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            session_start();
            while($row = $rs->fetch_assoc()) {
                $response['response'] = 'success';
            }
          
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'checkPassword'){
        $password = sha1($_GET['password']);

        session_start();
        if (isset($_SESSION['PASSWORD'])){
            if($_SESSION['PASSWORD'] == $password){
                $response['response'] = 'success';
                $json_response = json_encode($response);
                echo $json_response;
            }else{
                $response['response'] = 'error_mismatch';
                $json_response = json_encode($response);
                echo $json_response;
            }
            // echo json_encode($_SESSION['FIRSTNAME']);
        }else{
            $response['response'] = 'error_logout';
            $json_response = json_encode($response);
            echo $json_response;
        }
    }
    
}

?>