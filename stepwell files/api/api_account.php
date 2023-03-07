<?php
include '../controllers/dbconn.php';
header("Content-Type:application/json");
if (isset($_GET['function']) && $_GET['function']!="") {

    if($_GET['function'] == 'fetchaccounts'){
        $comid = $_GET['comid'];
        $userlevel = $_GET['userlevel'];
        $query = '';

        if($userlevel == 'na'){
            $query = "CALL fetchAccounts('$comid')";
        }else{
            $query = "CALL fetchAccountsByUserlevel('$comid', '$userlevel')";
        }
    
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
                $response[$x]['phone'] = $row['phone'];
                $response[$x]['birthdate'] = $row['birthdate'];
                $response[$x]['position'] = $row['position'];
                $response[$x]['department'] = $row['department'];
                $response[$x]['photo'] = $row['photo'];
                $response[$x]['superid'] = $row['superid'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchaccounts'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'createaccount'){
        $id = $_GET['id'];
        $companyid = $_GET['companyid'];
        $email = $_GET['email'];
        $password = sha1($_GET['password']);
        $userlevel = $_GET['userlevel'];
        $lastname = $_GET['lastname'];
        $firstname = $_GET['firstname'];
        $phone = $_GET['phone'];
        $birthdate = $_GET['birthdate'];
        $position = $_GET['position'];
        $department = $_GET['department'];
        $superid = $_GET['superid'];
        // zid, zcompanyid, zemail, zpassword, zuserlevel, zlastname, zfirstname, zphone, zbirthdate, zposition, zdepartment,
        $query = "CALL createAccount('$id', '$companyid', '$email', '$password', '$userlevel', '$lastname', '$firstname', '$phone', '$birthdate', '$position', '$department', '$superid')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
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
    if($_GET['function'] == 'updateaccount'){
        $id = $_GET['id'];
        $email = $_GET['email'];
        $userlevel = $_GET['userlevel'];
        $lastname = $_GET['lastname'];
        $firstname = $_GET['firstname'];
        $phone = $_GET['phone'];
        $birthdate = $_GET['birthdate'];
        $position = $_GET['position'];
        $department = $_GET['department'];
        $superid = $_GET['superid'];


        
        // zid, zcompanyid, zemail, zpassword, zuserlevel, zlastname, zfirstname, zphone, zbirthdate, zposition, zdepartment,
        $query = "CALL updateAccount('$id', '$email', '$userlevel', '$lastname', '$firstname', '$phone', '$birthdate', '$position', '$department', '$superid')";
        // $query = "UPDATE tbl_account SET email = '$email', userlevel = '$userlevel', lastname = '$lastname', firstname = '$firstname', phone = '$phone', birthdate = '$birthdate', position = '$position', department = '$department', superid = '$superid' WHERE id = '$id'; ";



        




        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
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
    if($_GET['function'] == 'deleteaccount'){
        $id = $_GET['id'];
        // zid, zcompanyid, zemail, zpassword, zuserlevel, zlastname, zfirstname, zphone, zbirthdate, zposition, zdepartment,
        $query = "CALL deleteAccount('$id')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
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
    if($_GET['function'] == 'getaccountinfo'){
        $id = $_GET['id'];
        $query = "CALL getAccountInfo('$id')";
    
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
                $response[$x]['phone'] = $row['phone'];
                $response[$x]['birthdate'] = $row['birthdate'];
                $response[$x]['position'] = $row['position'];
                $response[$x]['department'] = $row['department'];;
                $response[$x]['photo'] = $row['photo'];;
                $response[$x]['superid'] = $row['superid'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['getAccountInfo'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    

    if($_GET['function'] == 'createaccountmodule'){
        $id = $_GET['id'];
        $modulename = $_GET['modulename'];
        $moduleui = $_GET['moduleui'];
        // zid, zcompanyid, zemail, zpassword, zuserlevel, zlastname, zfirstname, zphone, zbirthdate, zposition, zdepartment,
        $query = "CALL createAccountModule('$id', '$modulename', '$moduleui')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
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
    if($_GET['function'] == 'fetchaccountmodule'){
        $id = $_GET['id'];
        $query = "CALL fetchAccountModule('$id')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['modulename'] = $row['modulename'];
                $response[$x]['moduleui'] = $row['moduleui'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchAccountModule'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'deleteaccountmodule'){
        $id = $_GET['id'];
        $moduleui = $_GET['moduleui'];
        // zid, zid, zemail, zpassword, zuserlevel, zlastname, zfirstname, zphone, zbirthdate, zposition, zdepartment,
        $query = "CALL deleteAccountModule('$id', '$moduleui')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
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

    if($_GET['function'] == 'createaccountmachine'){
        $machineid = $_GET['machineid'];
        $accid = $_GET['accid'];

        $query = "CALL createAccountMachine('$machineid', '$accid')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
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
    if($_GET['function'] == 'fetchaccountmachine'){
        $machineid = $_GET['machineid'];
        $query = "CALL fetchAccountMachine('$machineid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['accid'] = $row['accid'];
                $response[$x]['firstname'] = $row['firstname'];
                $response[$x]['email'] = $row['email'];
                $response[$x]['photo'] = $row['photo'];
                $response[$x]['logo'] = $row['logo'];
                $response[$x]['companyid'] = $row['companyid'];
                $x++;

                // $_SESSION["COMPANY_ID"] = $row['companyid'];
                // $_SESSION["COMPANY_NAME"] = $row['companyname'];
                // $_SESSION["COMPANY_LOGO"] = $row['logo'];
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchaccountmachine'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'machinetest'){
        $machineid = $_GET['machineid'];
        $accid = $_GET['accid'];

        $query = "CALL machineTest('$machineid', '$accid')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
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
    if($_GET['function'] == 'searchaccountbyname'){
        $name = $_GET['name'];
        $query = "CALL searchAccountByName('$name')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['firstname'] = $row['firstname'];
                $response[$x]['lastname'] = $row['lastname'];
                $response[$x]['id'] = $row['id'];
                $response[$x]['photo'] = $row['photo'];
                $x++;

                // $_SESSION["COMPANY_ID"] = $row['companyid'];
                // $_SESSION["COMPANY_NAME"] = $row['companyname'];
                // $_SESSION["COMPANY_LOGO"] = $row['logo'];
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
    
    if($_GET['function'] == 'createaccountsupervisor'){
        $accid = $_GET['accid'];
        $superid = $_GET['superid'];

        $query = "CALL createAccountSupervisor('$accid', '$superid')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
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
    
    if($_GET['function'] == 'fetchaccountbyprojectconnect'){
        $projectid = $_GET['projectid'];
        $query = "CALL fetchAccountByProjectConnect('$projectid')";
    
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
                $response[$x]['phone'] = $row['phone'];
                $response[$x]['birthdate'] = $row['birthdate'];
                $response[$x]['position'] = $row['position'];
                $response[$x]['department'] = $row['department'];
                $response[$x]['photo'] = $row['photo'];
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

    if($_GET['function'] == 'fetchaccountsbyprojectresource'){
        $projectid = $_GET['projectid'];
        $query = "CALL fetchAccountsByProjectResource('$projectid')";
    
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['accid'] = $row['accid'];
                $response[$x]['firstname'] = $row['firstname'];
                $response[$x]['lastname'] = $row['lastname'];
                $response[$x]['photo'] = $row['photo'];
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
    
    if($_GET['function'] == 'createaccountrate'){
        $id = $_GET['id'];
        $accid = $_GET['accid'];
        $projectid = $_GET['projectid'];
        $rate = $_GET['rate'];

        $query = "CALL createAccountRate('$id', '$accid', '$projectid', '$rate')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
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
    if($_GET['function'] == 'fetchaccountratesbyprojectid'){
        $projectid = $_GET['projectid'];
        $query = "CALL fetchAccountRatesByProjectId('$projectid')";
    
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['accid'] = $row['accid'];
                $response[$x]['rate'] = $row['rate'];
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



    if($_GET['function'] == 'createtmpaccount'){
        $id = $_GET['id'];
        $projectid = $_GET['projectid'];
        $name = $_GET['name'];

        $query = "INSERT INTO tbl_account_tmp (id, projectid, `name`) VALUES ('$id', '$projectid', '$name')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
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
    if($_GET['function'] == 'fetchtmpaccountbyprojectid'){
        $projectid = $_GET['projectid'];
        $query = "SELECT * FROM tbl_account_tmp WHERE projectid = '$projectid'; ";
    
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['name'] = $row['name'];
                $response[$x]['rate'] = $row['rate'];
                $response[$x]['role'] = $row['role'];
                $response[$x]['mapaccid'] = $row['mapaccid'];
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
    if($_GET['function'] == 'updatetmpaccountraterole'){
        $id = $_GET['id'];
        $rate = $_GET['rate'];
        $role = $_GET['role'];

        $query = "UPDATE tbl_account_tmp SET rate = '$rate', `role` = '$role' WHERE id = '$id'; ";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
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

    // if($_GET['function'] == 'createAccountRole'){
    //     $id = $_GET['id'];
    //     $accid = $_GET['accid'];
    //     $projectid = $_GET['projectid'];
    //     $rate = $_GET['role'];

    //     $query = "CALL createAccountrole('$id', '$accid', '$projectid', '$role')";
    //     // $rs = mysqli_query($link , $query);
    //     if(mysqli_query($link , $query)){
    //         $response['response'] = 'true';
    //         $json_response = json_encode($response);
    //         echo $json_response;
    //         mysqli_close($link);
    //     }else{
    //         $response['response'] = 'error';
    //         $json_response = json_encode($response);
    //         echo $json_response;
    //         mysqli_close($link);
    //     }
    // }
    if($_GET['function'] == 'fetchAccountRoleByProjectId'){
        $projectid = $_GET['projectid'];
        $query = "SELECT * FROM tbl_account_role WHERE projectid = '$projectid'; ";
    
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['accid'] = $row['accid'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['role'] = $row['role'];
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
    
    if($_GET['function'] == 'admincreateaccount'){
        $id = $_GET['id'];
        $companyid = $_GET['companyid'];
        $email = $_GET['email'];
        $zpassword = sha1($_GET['password']);
        $userlevel = $_GET['userlevel'];
        $lastname = $_GET['lastname'];
        $firstname = $_GET['firstname'];
        $phone = $_GET['phone'];
        $birthdate = $_GET['birthdate'];
        $position = $_GET['position'];
        $department = $_GET['department'];
        $superid = $_GET['superid'];
        $databaseid = $_GET['databaseid'];


        


        
        $zlink = mysqli_connect($server,$username,$password, $databaseid) or die("Connection failed: " . mysqli_connect_error());

        // zid, zcompanyid, zemail, zpassword, zuserlevel, zlastname, zfirstname, zphone, zbirthdate, zposition, zdepartment,
        $query = "CALL createAccount('$id', '$companyid', '$email', '$zpassword', '$userlevel', '$lastname', '$firstname', '$phone', '$birthdate', '$position', '$department', '$superid')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($zlink , $query)){
            $response['response'] = 'true';
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
    
    if($_GET['function'] == 'updateAccountPhoto'){
        $id = $_GET['id'];
        $photo = $_GET['photo'];
        $query = "UPDATE tbl_account SET photo = '$photo' WHERE id = '$id';";
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
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