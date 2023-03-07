<?php
include '../controllers/dbconn.php';
header("Content-Type:application/json");
if (isset($_GET['function']) && $_GET['function']!="") {

    if($_GET['function'] == 'fetchallcompany'){
        $query = "CALL fetchAllCompany()";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['companyid'] = $row['companyid'];
                $response[$x]['name'] = $row['name'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchAllCompany'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'createcompanymodule'){
        $companyid = $_GET['companyid'];
        $modulename = $_GET['modulename'];
        $moduleui = $_GET['moduleui'];
        // zid, zcompanyid, zemail, zpassword, zuserlevel, zlastname, zfirstname, zphone, zbirthdate, zposition, zdepartment,
        $query = "CALL createCompanyModule('$companyid', '$modulename', '$moduleui')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'admincreatecompanymodule'){
        $companyid = $_GET['companyid'];
        $modulename = $_GET['modulename'];
        $moduleui = $_GET['moduleui'];
        $databaseid = $_GET['databaseid'];

        $zlink = mysqli_connect($server,$username,$password, $databaseid) or die("Connection failed: " . mysqli_connect_error());
        
        $query = "CALL createCompanyModule('$companyid', '$modulename', '$moduleui')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($zlink , $query)){
            $response['response'] = 'success';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($zlink);
        }else{
            $response['response'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($zlink);
        }
    }
    if($_GET['function'] == 'admindeletecompanymodule'){
        $moduleui = $_GET['moduleui'];
        $databaseid = $_GET['databaseid'];
        
        $zlink = mysqli_connect($server,$username,$password, $databaseid) or die("Connection failed: " . mysqli_connect_error());
        
        $query = "DELETE FROM tbl_company_module WHERE moduleui = '$moduleui'; ";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($zlink , $query)){
            $response['response'] = 'success';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($zlink);
        }else{
            $response['response'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($zlink);
        }
    }
    if($_GET['function'] == 'fetchcompanymodule'){
        
        $companyid = $_GET['companyid'];
        $query = "CALL fetchCompanyModule('$companyid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['companyid'] = $row['companyid'];
                $response[$x]['modulename'] = $row['modulename'];
                $response[$x]['moduleui'] = $row['moduleui'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchCompanyModule'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'deletecompanymodule'){
        $companyid = $_GET['companyid'];
        $moduleui = $_GET['moduleui'];
        // zid, zcompanyid, zemail, zpassword, zuserlevel, zlastname, zfirstname, zphone, zbirthdate, zposition, zdepartment,
        $query = "CALL deleteCompanyModule('$companyid', '$moduleui')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    
    
}

?>