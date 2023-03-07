<?php
include '../controller/dbconn.php';
include '../controller/defaults.php';
header("Content-Type:application/json");


if (isset($_GET['function']) && $_GET['function']!="") {

    if($_GET['function'] == 'createCompany'){
        $companyid = $_GET['companyid'];
        $databaseid = $_GET['databaseid'];
        $owner = $_GET['owner'];

        $query = "CALL CurlCompany('$companyid', '$owner', '$databaseid');";
        // $rs = mysqli_query($link , $query);
        
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

    if($_GET['function'] == 'createCompanyRequest'){
        $id = $_GET['id'];
        $companyid = $_GET['companyid'];
        $companyname = $_GET['companyname'];
        $owner = $_GET['owner'];
        $keys = $_GET['keys'];

        $query = "INSERT INTO tbl_company_request (id, companyid, companyname, `owner`, lickeys) VALUES ('$id', '$companyid', '$companyname', '$owner', '$keys');";
        
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














