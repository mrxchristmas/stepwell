<?php
include '../controllers/idbconn.php';
header("Content-Type:application/json");
session_start();



if (isset($_GET['function']) && $_GET['function']!="") {
    
    if($_GET['function'] == 'prelogin'){
        $companyid = $_GET['companyid'];

        $query = "SELECT * FROM tbl_company WHERE companyid = '$companyid'; ";
        $rs = mysqli_query($link , $query);
        
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['companyid'] = $row['companyid'];
                $response[$x]['name'] = $row['name'];
                $response[$x]['logo'] = $row['logo'];
                $response[$x]['databaseid'] = $row['databaseid'];
                $response[$x]['status'] = $row['status'];

                setcookie("DATABASE_ID",  $row['databaseid']);
                $_SESSION["DATABASE_ID"] = $row['databaseid'];
                $_SESSION["COMPANY_ID"] = $row['companyid'];
                $_SESSION["COMPANY_NAME"] = $row['name'];
                $_SESSION["COMPANY_LOGO"] = $row['logo'];
                $x++;
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
    if($_GET['function'] == 'fetchCompany'){

        $query = "SELECT * FROM tbl_company; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['companyid'] = $row['companyid'];
                $response[$x]['databaseid'] = $row['databaseid'];
                $response[$x]['name'] = $row['name'];
                $response[$x]['logo'] = $row['logo'];
                $response[$x]['status'] = $row['status'];
                $x++;
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
    if($_GET['function'] == 'fetchCompanyModuleByCompanyId'){
        $companyid = $_GET['companyid'];

        $query = "SELECT * FROM tbl_company_module WHERE companyid = '$companyid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['companyid'] = $row['companyid'];
                $response[$x]['modulename'] = $row['modulename'];
                $response[$x]['moduleui'] = $row['moduleui'];
                $x++;
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
    if($_GET['function'] == 'fetchCompanyAdminByCompanyId'){
        $companyid = $_GET['companyid'];

        $query = "SELECT * FROM tbl_company_admin WHERE companyid = '$companyid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['accid'] = $row['accid'];
                $response[$x]['companyid'] = $row['companyid'];
                $response[$x]['firstname'] = $row['firstname'];
                $response[$x]['lastname'] = $row['lastname'];
                $x++;
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
    if($_GET['function'] == 'createCompanyModule'){
        $id = $_GET['id'];
        $companyid = $_GET['companyid'];
        $modulename = $_GET['modulename'];
        $moduleui = $_GET['moduleui'];

        $query = "INSERT INTO tbl_company_module (id, companyid, modulename, moduleui) VALUES ('$id', '$companyid', '$modulename', '$moduleui');";
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
    if($_GET['function'] == 'deleteCompanyModule'){
        $id = $_GET['id'];

        $query = "DELETE FROM tbl_company_module WHERE id = '$id';";
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
    if($_GET['function'] == 'createCompanyAdmin'){
        $accid = $_GET['accid'];
        $companyid = $_GET['companyid'];
        $firstname = $_GET['firstname'];
        $lastname = $_GET['lastname'];

        $query = "INSERT INTO tbl_company_admin (accid, companyid, firstname, lastname) VALUES ('$accid', '$companyid', '$firstname', '$lastname');";
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
    if($_GET['function'] == 'deleteCompanyAdmin'){
        $accid = $_GET['accid'];

        $query = "DELETE FROM tbl_company_admin WHERE accid = '$accid';";
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
    

    
    if($_GET['function'] == 'createCompany'){
        $companyid = $_GET['companyid'];
        $databaseid = $_GET['databaseid'];
        $name = $_GET['name'];

        $query = "INSERT INTO tbl_company (companyid, databaseid, `name`, logo, `status`) VALUES ('$companyid', '$databaseid', '$name', 'na', DEFAULT);";
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
    if($_GET['function'] == 'updateCompanyStatus'){
        $companyid = $_GET['companyid'];
        $status = $_GET['status'];

        $query = "UPDATE tbl_company SET `status` = '$status' WHERE companyid = '$companyid';";
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


    if($_GET['function'] == 'adminfetchaccounts'){

        $query = "SELECT * FROM tbl_account; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['companyid'] = $row['companyid'];
                $response[$x]['email'] = $row['email'];
                $response[$x]['password'] = $row['password'];
                $response[$x]['userlevel'] = $row['userlevel'];
                $response[$x]['lastname'] = $row['lastname'];
                $response[$x]['firstname'] = $row['firstname'];
                $response[$x]['photo'] = $row['photo'];
                $response[$x]['phone'] = "na";
                $response[$x]['birthdate'] = "na";
                $response[$x]['position'] = "na";
                $response[$x]['department'] = "na";
                $response[$x]['superid'] = "na";
                $x++;
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


    if($_GET['function'] == 'createMessage'){
        $id = $_GET['id'];
        $owner = $_GET['owner'];
        $sender = $_GET['sender'];
        $message = $_GET['message'];
  
        $query = "INSERT INTO `web_message` (id, `owner`, sender, `message`, `stamp`) 
        VALUES ( '$id', '$owner', '$sender', '$message', (SELECT CONVERT_TZ(NOW(), @@session.time_zone, '-04:00')) ); ";

        if(mysqli_multi_query($link , $query)){
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
    if($_GET['function'] == 'fetchMessage'){

        $query = "SELECT * FROM web_message ORDER BY `stamp` ASC; ";

        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            // session_start();
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['owner'] = $row['owner'];
                $response[$x]['sender'] = $row['sender'];
                $response[$x]['stamp'] = $row['stamp'];
                $response[$x]['message'] = $row['message'];
                $x++;
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
    if($_GET['function'] == 'deleteOldMessages'){
        
        $query = "DELETE FROM web_message WHERE UNIX_TIMESTAMP(stamp) < UNIX_TIMESTAMP(DATE_SUB((SELECT CONVERT_TZ(NOW(), @@session.time_zone, '-04:00')), INTERVAL 30 DAY)); ";

        if(mysqli_multi_query($link , $query)){
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