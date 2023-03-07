<?php
include '../controllers/dbconn.php';
include '../controllers/defaults.php';
header("Content-Type:application/json");
// session_start();

$cn = '';
$cid = '';
$clogo = '';

// function UniqueMachineID() {  
//     return gethostname();
//     // $localIP = getHostByName(php_uname('n'));
//     // $localIP = getHostByName(getHostName());
// }


// $dbname = $_COOKIE["DATABASE_ID"];
// $link = mysqli_connect($server,$username,$password, $dbname) or die("Connection failed: " . mysqli_connect_error());

if (isset($_GET['function']) && $_GET['function']!="") {

    if($_GET['function'] == 'adminlogin'){
        $id = $_GET['id'];
        $email = $_GET['email'];
        $companyid = $_GET['companyid'];
        $password = sha1($_GET['password']);

        // $response['login'] = 'success';
        // $response['id'] = $id;
        // $response['email'] = $email;
        // $response['companyid'] = $companyid;
        // $response['password'] = $password;
        // $response['dbname'] = $dbname;

        // $json_response = json_encode($response);
        // echo $json_response;
        // mysqli_close($link);


        $query = "CALL login('$id', '$email', '$password', '$companyid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            session_start();
            while($row = $rs->fetch_assoc()) {
                $response['login'] = 'success';
                $response['userlevel'] = $row['userlevel'];
                $response['firstname'] = $row['firstname'];
                $response['photo'] = $row['photo'];

                $_SESSION["USER_LEVEL"] = $row['userlevel'];
                $_SESSION["FIRSTNAME"] = $row['firstname'];
                $_SESSION["PHOTO"] = $row['photo'];
            }
            
            $_SESSION["ID"] = $id;
            $_SESSION["EMAIL"] = $email;
            $_SESSION["PASSWORD"] = $password;

            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['login'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }


    }
    if($_GET['function'] == 'fetchsessionvar'){
        session_start();
        // session_destroy();
        // $_SESSION = array();
        echo json_encode($_SESSION);
        
    }
    if($_GET['function'] == 'logout'){
        session_start();
        session_destroy();
        $_SESSION = array();
        if (isset($_COOKIE['DATABASE_ID'])) {
            unset($_COOKIE['DATABASE_ID']); 
            setcookie('DATABASE_ID', null, -1, '/'); 
        }
    }
    if($_GET['function'] == 'companyid'){
        session_start();
        if(empty($_SESSION['COMPANY_ID'])){
            echo 'none';
        }else{
            $response['prelogin'] = $_SESSION['COMPANY_ID'];
            echo json_encode($response);
        }
    }
    if($_GET['function'] == 'checkIfLoggedIn'){
        session_start();
        if (isset($_SESSION['COMPANY_ID'])){
            $response['COMPANY_ID'] = $_SESSION['COMPANY_ID'];
            $response['COMPANY_NAME'] = $_SESSION['COMPANY_NAME'];
            $response['COMPANY_LOGO'] = $_SESSION['COMPANY_LOGO'];
            $response['DATABASE_ID'] = $_SESSION['DATABASE_ID'];
            $response['ID'] = $_SESSION['ID'];
            $response['USER_LEVEL'] = $_SESSION['USER_LEVEL'];
            $response['PASSWORD'] = $_SESSION['PASSWORD'];
            $response['PHOTO'] = $_SESSION['PHOTO'];
            $response['FIRST_NAME'] = $_SESSION['FIRSTNAME'];
            $json_response = json_encode($response);
            echo $json_response;
            // echo json_encode($_SESSION['FIRSTNAME']);
        }else{
            echo json_encode('logout');
        }
    }
    if($_GET['function'] == 'validate'){
        $id = $_GET['id'];
        $email = $_GET['email'];
        $companyid = $_GET['companyid'];
        $password = sha1($_GET['password']);
    
        $query = "CALL login('$id', '$email', '$password', '$companyid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            session_start();
            while($row = $rs->fetch_assoc()) {
                $response['login'] = 'success';
            }
          
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['login'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'init'){
        $response = gethostname();
        $json_response = json_encode($response);
        echo $json_response;
        mysqli_close($link);
    }

    



}

?>