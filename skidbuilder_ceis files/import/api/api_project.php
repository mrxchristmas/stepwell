<?php
include '../../controllers/dbconn.php';
header("Content-Type:application/json");

// session_start();
// $response = $_SESSION["loggedin"];
// $json_response = json_encode($response);
// echo $json_response;

if (isset($_GET['function']) && $_GET['function']!="") {

    if($_GET['function'] == 'fetchoverview'){
        $id = $_GET['id'];
    
        $query = "CALL fetchOverview('$id')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['ownedProjects'] = $row['ownedProjects'];
                $response[$x]['connectedProjects'] = $row['connectedProjects'];
                $response[$x]['activeProjects'] = $row['activeProjects'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchOverview'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'createproject'){
        $projectid = $_GET['projectid'];
        $projectname = $_GET['projectname'];
        $owner = $_GET['owner'];
        $companyid = $_GET['companyid'];
        $reference = $_GET['reference'];
        $creator = $_GET['creator'];
    
        $query = "CALL createProject('$projectid', '$companyid', '$owner', '$projectname', '$reference', '$creator')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'updateproject'){
        $projectid = $_GET['projectid'];
        $projectname = $_GET['projectname'];
        $query = "CALL updateProject('$projectid','$projectname')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'updateprojectstatus'){
        $projectid = $_GET['projectid'];
        $status = $_GET['status'];
        $query = "UPDATE tbl_project SET `status` = '$status' WHERE projectid = '$projectid'; ";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'updateprojectowner'){
        $projectid = $_GET['projectid'];
        $owner = $_GET['owner'];
        $query = "UPDATE tbl_project SET `owner` = '$owner' WHERE projectid = '$projectid'; ";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'deleteproject'){
        $projectid = $_GET['projectid'];
    
        $query = "CALL deleteProject('$projectid')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchprojectsbyowner'){
        $owner = $_GET['owner'];
    
        $query = "CALL fetchProjectsByOwner('$owner')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['companyid'] = $row['companyid'];
                $response[$x]['ownedProjects'] = $row['owner'];
                $response[$x]['projectname'] = $row['projectname'];
                $response[$x]['reference'] = $row['reference'];
                $response[$x]['status'] = $row['status'];
                $response[$x]['groupid'] = $row['groupid'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchProjectsByCompany'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'fetchprojectsbyprojectid'){
        $projectid = $_GET['projectid'];
    
        $query = "CALL fetchProjectsByProjectId('$projectid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['projectid'] = $projectid;
                $response[$x]['projectname'] = $row['projectname'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchProjectsByProjectId'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'fetchprojectbyconnect'){
        $id = $_GET['id'];
        
        $query = "CALL fetchProjectByConnect('$id')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['projectname'] = $row['projectname'];
                $response[$x]['ownerid'] = $row['owner'];
                $response[$x]['firstname'] = $row['firstname'];
                $response[$x]['lastname'] = $row['lastname'];
                $response[$x]['photo'] = $row['photo'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchProjectByConnect'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }

        // session_start();
        // $response = $_SESSION["loggedin"];
        // $json_response = json_encode($response);
        // echo $json_response;
    }
    if($_GET['function'] == 'fetchInactiveProjectbyAccid'){
        
        $accid = $_GET['accid'];
    
        $query = "SELECT p.* FROM tbl_project p, tbl_project_request pr 
        WHERE (p.creator = '$accid' OR p.owner = '$accid') 
        AND p.status = 'inactive' 
        AND pr.status <> 'idle'
        AND p.projectid = pr.projectid;";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['projectname'] = $row['projectname'];
                $response[$x]['ownerid'] = $row['owner'];
                $response[$x]['creator'] = $row['creator'];
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
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'createprojectconnect'){
        $projectid = $_GET['projectid'];
        $id = $_GET['id'];
    
        $query = "CALL createProjectConnect('$projectid', '$id')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchprojectconnectbyprojectid'){
        $projectid = $_GET['projectid'];
        
        $query = "CALL fetchProjectConnectByProjectId('$projectid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['firstname'] = $row['firstname'];
                $response[$x]['lastname'] = $row['lastname'];
                $response[$x]['photo'] = $row['photo'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchProjectConnectByProjectId'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }


    }
    if($_GET['function'] == 'removeprojectconnect'){
        $id = $_GET['id'];
        $projectid = $_GET['projectid'];
    
        $query = "CALL removeProjectConnect('$id', '$projectid')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'updateprojectinfo'){
        $projectid = $_GET['projectid'];
        $columnname = $_GET['columnname'];
        $value = $_GET['value'];
    
        $query = "CALL updateProjectInfo('$projectid', '$columnname', '$value')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchprojectinfo'){
        $projectid = $_GET['projectid'];
    
        $query = "CALL fetchProjectInfo('$projectid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['pi_5'] = $row['pi_5'];
                $response[$x]['pi_6'] = $row['pi_6'];
                $response[$x]['pi_8'] = $row['pi_8'];
                $response[$x]['pi_9'] = $row['pi_9'];
                $response[$x]['pi_10'] = $row['pi_10'];
                $response[$x]['pi_11'] = $row['pi_11'];
                $response[$x]['pi_12'] = $row['pi_12'];
                $response[$x]['pi_13'] = $row['pi_13'];
                $response[$x]['pi_14'] = $row['pi_14'];
                $response[$x]['pi_15'] = $row['pi_15'];

                $response[$x]['pi_16_1'] = $row['pi_16_1'];
                $response[$x]['pi_16_1_lock'] = $row['pi_16_1_lock'];
                $response[$x]['pi_16_1_report'] = $row['pi_16_1_report'];
                $response[$x]['pi_16_1_upload'] = $row['pi_16_1_upload'];
                $response[$x]['pi_16_1_link'] = $row['pi_16_1_link'];
                $response[$x]['pi_16_1_note'] = $row['pi_16_1_note'];

                $response[$x]['pi_16_4'] = $row['pi_16_4'];
                $response[$x]['pi_16_4_lock'] = $row['pi_16_4_lock'];
                $response[$x]['pi_16_4_report'] = $row['pi_16_4_report'];
                $response[$x]['pi_16_4_upload'] = $row['pi_16_4_upload'];
                $response[$x]['pi_16_4_link'] = $row['pi_16_4_link'];
                $response[$x]['pi_16_4_note'] = $row['pi_16_4_note'];

                $response[$x]['pi_16_5'] = $row['pi_16_5'];
                $response[$x]['pi_16_5_lock'] = $row['pi_16_5_lock'];
                $response[$x]['pi_16_5_report'] = $row['pi_16_5_report'];
                $response[$x]['pi_16_5_upload'] = $row['pi_16_5_upload'];
                $response[$x]['pi_16_5_link'] = $row['pi_16_5_link'];
                $response[$x]['pi_16_5_note'] = $row['pi_16_5_note'];

                $response[$x]['pi_16_6'] = $row['pi_16_6'];
                $response[$x]['pi_16_6_lock'] = $row['pi_16_6_lock'];
                $response[$x]['pi_16_6_report'] = $row['pi_16_6_report'];
                $response[$x]['pi_16_6_upload'] = $row['pi_16_6_upload'];
                $response[$x]['pi_16_6_link'] = $row['pi_16_6_link'];
                $response[$x]['pi_16_6_note'] = $row['pi_16_6_note'];

                $response[$x]['pi_16_7'] = $row['pi_16_7'];
                $response[$x]['pi_16_7_lock'] = $row['pi_16_7_lock'];
                $response[$x]['pi_16_7_report'] = $row['pi_16_7_report'];
                $response[$x]['pi_16_7_upload'] = $row['pi_16_7_upload'];
                $response[$x]['pi_16_7_link'] = $row['pi_16_7_link'];
                $response[$x]['pi_16_7_note'] = $row['pi_16_7_note'];

                $response[$x]['pi_16_8'] = $row['pi_16_8'];
                $response[$x]['pi_16_8_lock'] = $row['pi_16_8_lock'];
                $response[$x]['pi_16_8_report'] = $row['pi_16_8_report'];
                $response[$x]['pi_16_8_upload'] = $row['pi_16_8_upload'];
                $response[$x]['pi_16_8_link'] = $row['pi_16_8_link'];
                $response[$x]['pi_16_8_note'] = $row['pi_16_8_note'];

                $response[$x]['pi_16_9'] = $row['pi_16_9'];
                $response[$x]['pi_16_9_lock'] = $row['pi_16_9_lock'];
                $response[$x]['pi_16_9_report'] = $row['pi_16_9_report'];
                $response[$x]['pi_16_9_upload'] = $row['pi_16_9_upload'];
                $response[$x]['pi_16_9_link'] = $row['pi_16_9_link'];
                $response[$x]['pi_16_9_note'] = $row['pi_16_9_note'];

                $response[$x]['pi_16_10'] = $row['pi_16_10'];
                $response[$x]['pi_16_10_lock'] = $row['pi_16_10_lock'];
                $response[$x]['pi_16_10_report'] = $row['pi_16_10_report'];
                $response[$x]['pi_16_10_upload'] = $row['pi_16_10_upload'];
                $response[$x]['pi_16_10_link'] = $row['pi_16_10_link'];
                $response[$x]['pi_16_10_note'] = $row['pi_16_10_note'];

                $response[$x]['pi_16_11'] = $row['pi_16_11'];
                $response[$x]['pi_16_11_lock'] = $row['pi_16_11_lock'];
                $response[$x]['pi_16_11_report'] = $row['pi_16_11_report'];
                $response[$x]['pi_16_11_upload'] = $row['pi_16_11_upload'];
                $response[$x]['pi_16_11_link'] = $row['pi_16_11_link'];
                $response[$x]['pi_16_11_note'] = $row['pi_16_11_note'];

                $response[$x]['pi_16_12'] = $row['pi_16_12'];
                $response[$x]['pi_16_12_lock'] = $row['pi_16_12_lock'];
                $response[$x]['pi_16_12_report'] = $row['pi_16_12_report'];
                $response[$x]['pi_16_12_upload'] = $row['pi_16_12_upload'];
                $response[$x]['pi_16_12_link'] = $row['pi_16_12_link'];
                $response[$x]['pi_16_12_note'] = $row['pi_16_12_note'];

                $response[$x]['pi_16_13'] = $row['pi_16_13'];
                $response[$x]['pi_16_13_lock'] = $row['pi_16_13_lock'];
                $response[$x]['pi_16_13_link'] = $row['pi_16_13_link'];
                $response[$x]['pi_16_13_note'] = $row['pi_16_13_note'];
                $response[$x]['pi_16_13_upload'] = $row['pi_16_13_upload'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchprojectinfo'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }

    if($_GET['function'] == 'createprojectproduct'){
        $productid = $_GET['productid'];
        $projectid = $_GET['projectid'];
        $productname = $_GET['productname'];
    
        $query = "CALL createProjectProduct('$productid', '$projectid','$productname')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'updateprojectproduct'){
        $productid = $_GET['productid'];
        $productname = $_GET['productname'];

        $query = "CALL updateProjectProduct('$productid','$productname')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'deleteprojectproduct'){
        $productid = $_GET['productid'];
    
        $query = "CALL deleteProjectProduct('$productid')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchprojectproduct'){
        $projectid = $_GET['projectid'];
    
        $query = "CALL fetchProjectProduct('$projectid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['productid'] = $row['productid'];
                $response[$x]['productname'] = $row['productname'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchProjectProduct'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'fetchprojectinfocolumn'){
        $projectid = $_GET['projectid'];
        $colname = $_GET['colname'];
    
        $query = "CALL fetchProjectInfoColumn('$projectid', '$colname')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['url'] = $row[$colname];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchProjectInfoColumn'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'fetchprojectbycompanyid'){
        $comid = $_GET['comid'];
        
        $query = "CALL fetchProjectbyCompanyId('$comid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['projectname'] = $row['projectname'];
                $response[$x]['owner'] = $row['owner'];
                $response[$x]['firstname'] = $row['firstname'];
                $response[$x]['lastname'] = $row['lastname'];
                $response[$x]['photo'] = $row['photo'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchProjectByConnect'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }

        // session_start();
        // $response = $_SESSION["loggedin"];
        // $json_response = json_encode($response);
        // echo $json_response;
    }

    
    if($_GET['function'] == 'createprojectregister'){
        
        $id = $_GET['id'];
        $projectid = $_GET['projectid'];
        $ownerid = $_GET['ownerid'];
        $date = $_GET['date'];
        $time = $_GET['time'];
        $subject = $_GET['subject'];
        $type = $_GET['type'];
        $mode = $_GET['mode'];
        $impact = $_GET['impact'];
        $impdescription = $_GET['impdescription'];
        $description = $_GET['description'];
    
        $query = "CALL createProjectRegister('$id', '$projectid', '$ownerid', '$date', '$time', '$subject', '$type', '$mode', '$impact', '$impdescription', '$description')";
        
        // (
        //     IN `zid` VARCHAR(50), 
        // IN `zprojectid` VARCHAR(50), 
        // IN `zownerid` VARCHAR(50), 
        // IN `zdate` VARCHAR(50), 
        // IN `ztime` VARCHAR(50), 
        // IN `zsubject` VARCHAR(300), 
        // IN `ztype` VARCHAR(50), 
        // IN `zmode` VARCHAR(50), 
        // IN `zimpact` VARCHAR(50), 
        // IN `zimpdescription` VARCHAR(500), 
        // IN `zdescription` VARCHAR(500))
        
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'updateprojectregister'){
        $id = $_GET['id'];
        $date = $_GET['date'];
        $time = $_GET['time'];
        $subject = $_GET['subject'];
        $type = $_GET['type'];
        $mode = $_GET['mode'];
        $impact = $_GET['impact'];
        $impdescription = $_GET['impdescription'];
        $description = $_GET['description'];

        $query = "CALL updateProjectRegister('$id', '$date', '$time', '$subject', '$type', '$mode', '$impact', '$impdescription', '$description')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'deleteprojectregister'){
        $id = $_GET['id'];
    
        $query = "CALL deleteProjectRegister('$id')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchprojectregisterbyownerid'){
        $projectid = $_GET['projectid'];
        $ownerid = $_GET['ownerid'];
    
        $query = "CALL fetchProjectRegisterByOwnerId('$projectid', '$ownerid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['date'] = $row['date'];
                $response[$x]['time'] = $row['time'];
                $response[$x]['subject'] = $row['subject'];
                $response[$x]['type'] = $row['type'];
                $response[$x]['mode'] = $row['mode'];
                $response[$x]['impact'] = $row['impact'];
                $response[$x]['impdescription'] = $row['impdescription'];
                $response[$x]['description'] = $row['description'];
                $response[$x]['ownerid'] = $row['ownerid'];
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


    if($_GET['function'] == 'createprojectminutes'){
        
        $id = $_GET['id'];
        $partid = $_GET['partid'];
        $projectid = $_GET['projectid'];
        $ownerid = $_GET['ownerid'];
        $date = $_GET['date'];
        $time = $_GET['time'];
        $subject = $_GET['subject'];
        $type = $_GET['type'];
        $mode = $_GET['mode'];
        $location = $_GET['location'];
        $attendees = $_GET['attendees'];
        $responsible = $_GET['responsible'];
        $respotype = $_GET['respotype'];
        $respohours = $_GET['respohours'];
        $due = $_GET['due'];
        $description = $_GET['description'];
    
        $query = "CALL createProjectMinutes('$id', '$partid', '$projectid', '$ownerid', '$date', '$time', '$subject', '$type', '$mode', '$location', '$attendees', '$responsible', '$respotype', '$respohours', '$due', '$description')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchminutesbyownerid'){
        $projectid = $_GET['projectid'];
        $ownerid = $_GET['ownerid'];
    
        $query = "CALL fetchMinutesByOwnerId('$projectid', '$ownerid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['partid'] = $row['partid'];
                $response[$x]['date'] = $row['date'];
                $response[$x]['time'] = $row['time'];
                $response[$x]['subject'] = $row['subject'];
                $response[$x]['type'] = $row['type'];
                $response[$x]['mode'] = $row['mode'];
                $response[$x]['location'] = $row['location'];
                $response[$x]['attendees'] = $row['attendees'];
                $response[$x]['responsible'] = $row['responsible'];
                $response[$x]['respotype'] = $row['respotype'];
                $response[$x]['respohours'] = $row['respohours'];
                $response[$x]['due'] = $row['due'];
                $response[$x]['description'] = $row['description'];
                $response[$x]['ownerid'] = $row['ownerid'];
                $response[$x]['distributionid'] = $row['dmid'];
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
    if($_GET['function'] == 'fetchminutesbyprojectid'){
        $projectid = $_GET['projectid'];
        $ownerid = $_GET['ownerid'];
    
        $query = "CALL fetchMinutesByProjectId('$projectid', '$ownerid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['partid'] = $row['partid'];
                $response[$x]['date'] = $row['date'];
                $response[$x]['time'] = $row['time'];
                $response[$x]['subject'] = $row['subject'];
                $response[$x]['type'] = $row['type'];
                $response[$x]['mode'] = $row['mode'];
                $response[$x]['location'] = $row['location'];
                $response[$x]['attendees'] = $row['attendees'];
                $response[$x]['responsible'] = $row['responsible'];
                $response[$x]['respotype'] = $row['respotype'];
                $response[$x]['respohours'] = $row['respohours'];
                $response[$x]['due'] = $row['due'];
                $response[$x]['description'] = $row['description'];
                $response[$x]['ownerid'] = $row['ownerid'];
                $response[$x]['distributionid'] = $row['dmid'];
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
    if($_GET['function'] == 'updateprojectminutes'){
        
        $id = $_GET['id'];
        $date = $_GET['date'];
        $time = $_GET['time'];
        $subject = $_GET['subject'];
        $type = $_GET['type'];
        $mode = $_GET['mode'];
        $location = $_GET['location'];
        $attendees = $_GET['attendees'];
        $responsible = $_GET['responsible'];
        $respotype = $_GET['respotype'];
        $respohours = $_GET['respohours'];
        $due = $_GET['due'];
        $description = $_GET['description'];
    
        $query = "CALL updateProjectMinutes('$id', '$date', '$time', '$subject', '$type', '$mode', '$location', '$attendees', '$responsible', '$respotype', '$respohours', '$due', '$description')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'deleteprojectminutes'){
        $id = $_GET['id'];
    
        $query = "CALL deleteProjectMinutes('$id')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'distributeminutebypartid'){
        
        $id = $_GET['id'];
        $projectid = $_GET['projectid'];
        $partid = $_GET['partid'];
    
        $query = "CALL distributeMinuteByPartId('$id', '$projectid', '$partid')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
   


    if($_GET['function'] == 'createprojecttimesheet'){
        
        $id = $_GET['id'];
        $projectid = $_GET['projectid'];
        $ownerid = $_GET['ownerid'];
        $taskid = $_GET['taskid'];
        $date = $_GET['date'];
        $hours = $_GET['hours'];
    
        $query = "CALL createProjectTimesheet('$id', '$projectid', '$ownerid', '$taskid', '$date', '$hours')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchprojecttimesheetbyprojectid'){
        $projectid = $_GET['projectid'];
    
        $query = "CALL fetchProjectTimesheetByProjectid('$projectid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['ownerid'] = $row['ownerid'];
                $response[$x]['taskid'] = $row['taskid'];
                $response[$x]['date'] = $row['date'];
                $response[$x]['hours'] = $row['hours'];
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
    if($_GET['function'] == 'deleteprojecttimesheet'){
        $id = $_GET['id'];
    
        $query = "CALL deleteProjectTimesheet('$id')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchprojectsbysuperiorid'){
        $accid = $_GET['accid'];

        $query = "CALL fetchProjectsBySuperiorId('$accid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['companyid'] = $row['companyid'];
                $response[$x]['ownerid'] = $row['owner'];
                $response[$x]['creator'] = $row['creator'];
                $response[$x]['projectname'] = $row['projectname'];
                $response[$x]['reference'] = $row['reference'];
                $response[$x]['status'] = $row['status'];
                $response[$x]['groupid'] = $row['groupid'];
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


    if($_GET['function'] == 'createprojectrequest'){
        
        $requestid = $_GET['requestid'];
        $projectid = $_GET['projectid'];
        $name = $_GET['name'];
        $score = $_GET['score'];
        $description = $_GET['description'];
        $location1 = $_GET['location1'];
        $location2 = $_GET['location2'];
        $requestor = $_GET['requestor'];
        $manager = $_GET['manager'];
        $sponsor = $_GET['sponsor'];
    
        $query = "CALL createProjectRequest('$requestid', '$projectid', '$name', '$score', '$description', '$location1', '$location2', '$requestor', '$manager', '$sponsor')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'updateprojectrequest'){
        
        $requestid = $_GET['requestid'];
        $name = $_GET['name'];
        $score = $_GET['score'];
        $description = $_GET['description'];
        $location1 = $_GET['location1'];
        $location2 = $_GET['location2'];
        $requestor = $_GET['requestor'];
        $requester = $_GET['requester'];
        $manager = $_GET['manager'];
        $sponsor = $_GET['sponsor'];
    
        $query = "CALL updateProjectRequest('$requestid', '$name', '$score', '$description', '$location1', '$location2', '$requestor', '$requester', '$manager', '$sponsor')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'updateprojectrequeststatus'){
        $projectid = $_GET['projectid'];
        $status = $_GET['status'];
    
        $query = "UPDATE tbl_project_request SET `status` = '$status' WHERE projectid = '$projectid'; ";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'deleteprojectrequest'){
        
        $requestid = $_GET['requestid'];
    
        $query = "CALL deleteProjectRequest('$requestid')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchprojectrequestbyprojectid'){
        
        $projectid = $_GET['projectid'];
    
        $query = "CALL fetchProjectRequestByProjectid('$projectid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['requestid'] = $row['requestid'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['name'] = $row['name'];
                $response[$x]['status'] = $row['status'];
                $response[$x]['lockstatus'] = $row['lockstatus'];
                $response[$x]['score'] = $row['score'];
                $response[$x]['description'] = $row['description'];
                $response[$x]['location1'] = $row['location1'];
                $response[$x]['location2'] = $row['location2'];
                $response[$x]['requestor'] = $row['requestor'];
                $response[$x]['manager'] = $row['manager'];
                $response[$x]['sponsor'] = $row['sponsor'];
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

    if($_GET['function'] == 'createprojectrequesttechnical'){
        $requestid = $_GET['requestid'];
        $projectid = $_GET['projectid'];
        $desc_1 = $_GET['desc_1'];
        $desc_2 = $_GET['desc_2'];
        $desc_3 = $_GET['desc_3'];
        $desc_4_1 = $_GET['desc_4_1'];
        $desc_4_2 = $_GET['desc_4_2'];
        $prior_1 = $_GET['prior_1'];
        $prior_2 = $_GET['prior_2'];
        $prior_3 = $_GET['prior_3'];
        $prior_4 = $_GET['prior_4'];
        $prior_5 = $_GET['prior_5'];
        $prior_6 = $_GET['prior_6'];
        $prior_7 = $_GET['prior_7'];
        $prior_8 = $_GET['prior_8'];
        $strat_1 = $_GET['strat_1'];
        $strat_2 = $_GET['strat_2'];

        $query = "CALL createProjectRequestTechnical('$requestid', '$projectid', '$desc_1', '$desc_2', '$desc_3', '$desc_4_1', '$desc_4_2', '$prior_1', '$prior_2', '$prior_3', '$prior_4', '$prior_5', '$prior_6', '$prior_7', '$prior_8', '$strat_1', '$strat_2')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchprojectrequesttechnical'){
        
        $projectid = $_GET['projectid'];
    
        $query = "CALL fetchProjectRequestTechnical('$projectid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['requestid'] = $row['requestid'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['desc_1'] = $row['desc_1'];
                $response[$x]['desc_2'] = $row['desc_2'];
                $response[$x]['desc_3'] = $row['desc_3'];
                $response[$x]['desc_4_1'] = $row['desc_4_1'];
                $response[$x]['desc_4_2'] = $row['desc_4_2'];
                $response[$x]['prior_1'] = $row['prior_1'];
                $response[$x]['prior_2'] = $row['prior_2'];
                $response[$x]['prior_3'] = $row['prior_3'];
                $response[$x]['prior_4'] = $row['prior_4'];
                $response[$x]['prior_5'] = $row['prior_5'];
                $response[$x]['prior_6'] = $row['prior_6'];
                $response[$x]['prior_7'] = $row['prior_7'];
                $response[$x]['prior_8'] = $row['prior_8'];
                $response[$x]['strat_1'] = $row['strat_1'];
                $response[$x]['strat_2'] = $row['strat_2'];
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
    if($_GET['function'] == 'createrequesttechnicaladd'){
        $id = $_GET['id'];
        $requestid = $_GET['requestid'];
        $projectid = $_GET['projectid'];
        $type = $_GET['type'];
        $subject = $_GET['subject'];
        $param = $_GET['param'];

        $query = "CALL createRequestTechnicalAdd('$id', '$requestid', '$projectid', '$type', '$subject', '$param')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'deleterequesttechnicaladd'){
        $id = $_GET['id'];

        $query = "DELETE FROM tbl_project_request_technical_add WHERE id = '$id'; ";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchrequesttechaddbyprojectid'){
        
        $projectid = $_GET['projectid'];
    
        $query = "CALL fetchRequestTechAddByProjectId('$projectid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['requestid'] = $row['requestid'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['type'] = $row['type'];
                $response[$x]['subject'] = $row['subject'];
                $response[$x]['param'] = $row['param'];
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
    



    if($_GET['function'] == 'createProjectRequestConnect'){
        $id = $_GET['id'];
        $projectid = $_GET['projectid'];
        $accid = $_GET['accid'];

        $query = "INSERT INTO tbl_project_request_connect (id, projectid, accid, `status`, notes) VALUES ('$id', '$projectid', '$accid', 'idle', ''); ";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'deleteProjectRequestConnect'){ 
        $projectid = $_GET['projectid'];

        $query = "DELETE FROM tbl_project_request_connect WHERE projectid = '$projectid'; ";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'updateProjectRequestConnectStatus'){
        $id = $_GET['id'];
        $status = $_GET['status'];
        $notes = $_GET['notes'];

        $query = "UPDATE tbl_project_request_connect SET `status` = '$status', `notes` = '$notes' WHERE id = '$id'; ";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'updateProjectRequestConnectStatusByProjectId'){
        $projectid = $_GET['projectid'];
        $status = $_GET['status'];

        $query = "CALL updateProjectRequestConnectStatusByProjectId('$projectid', '$status')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchProjectRequestConnectByProjectId'){
        $projectid = $_GET['projectid'];

        $query = "SELECT * FROM tbl_project_request_connect WHERE projectid = '$projectid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['accid'] = $row['accid'];
                $response[$x]['status'] = $row['status'];
                $response[$x]['notes'] = $row['notes'];
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
    if($_GET['function'] == 'fetchProjectRequestConnectByAccid'){
        $accid = $_GET['accid'];

        $query = "SELECT * FROM tbl_project_request_connect WHERE accid = '$accid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['accid'] = $row['accid'];
                $response[$x]['status'] = $row['status'];
                $response[$x]['notes'] = $row['notes'];
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
    
    
    if($_GET['function'] == 'createProjectItemCategory'){
        $id = $_GET['id'];
        $projectid = $_GET['projectid'];
        $name = $_GET['name'];

        $query = "INSERT INTO tbl_project_item_category (id, projectid, `name`) VALUES ('$id', '$projectid', '$name'); ";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'deleteProjectItemCategory'){
        $id = $_GET['id'];

        $query = "DELETE FROM tbl_project_item_category WHERE id = '$id'; ";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchProjectItemCategory'){
        $projectid = $_GET['projectid'];

        $query = "SELECT * FROM tbl_project_item_category WHERE projectid = '$projectid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['name'] = $row['name'];
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
    
    if($_GET['function'] == 'createProjectItem'){
        $id = $_GET['id'];
        $projectid = $_GET['projectid'];
        $categoryid = $_GET['categoryid'];
        $code = $_GET['code'];
        $name = $_GET['name'];

        $query = "INSERT INTO tbl_project_item (id, projectid, categoryid, code, `name`) VALUES ('$id', '$projectid', '$categoryid', '$code', '$name'); ";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'deleteProjectItem'){
        $id = $_GET['id'];

        $query = "DELETE FROM tbl_project_item WHERE id = '$id'; ";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchProjectItem'){
        $projectid = $_GET['projectid'];

        $query = "SELECT * FROM tbl_project_item WHERE projectid = '$projectid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['categoryid'] = $row['categoryid'];
                $response[$x]['code'] = $row['code'];
                $response[$x]['name'] = $row['name'];
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

    if($_GET['function'] == 'createProjectBudget'){
        $id = $_GET['id'];
        $projectid = $_GET['projectid'];
        $itemid = $_GET['itemid'];
        $type = $_GET['type'];
        $capexcost = $_GET['capexcost'];
        $opexcost = $_GET['opexcost'];
        $vendor = $_GET['vendor'];

        $query = "INSERT INTO tbl_project_budget ( id, projectid, itemid, `type`, capexcost, opexcost, vendor) 
        VALUES ( '$id', '$projectid', '$itemid', '$type', '$capexcost', '$opexcost', '$vendor'); ";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'deleteProjectBudget'){
        $id = $_GET['id'];

        $query = "CALL deleteBudget('$id');";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchProjectBudget'){
        $projectid = $_GET['projectid'];

        $query = "SELECT * FROM tbl_project_budget WHERE projectid = '$projectid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['itemid'] = $row['itemid'];
                $response[$x]['type'] = $row['type'];
                $response[$x]['capexcost'] = $row['capexcost'];
                $response[$x]['opexcost'] = $row['opexcost'];
                $response[$x]['vendor'] = $row['vendor'];
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

    if($_GET['function'] == 'createProjectBudgetLumpsum'){
        $id = $_GET['id'];
        $budgetid = $_GET['budgetid'];
        $projectid = $_GET['projectid'];
        $name = $_GET['name'];
        $payment = $_GET['payment'];

        // $query = "IF ( (SELECT COUNT(id) FROM tbl_project_budget_lumpsum WHERE id = '$id') > 0 ) THEN
        //     BEGIN
        //         UPDATE tbl_project_budget_lumpsum SET `name` = '$name', `payment` = '$payment' WHERE id = '$id';
        //     END;
        //     ELSE 
        //     BEGIN
        //         INSERT INTO tbl_project_budget_lumpsum ( id, projectid, budgetid, `name`, `payment`) 
        //         VALUES ( '$id', '$budgetid', '$projectid', '$name', '$payment');
        //     END;
        // END IF; ";

       

        $query = "CALL createProjectBudgetLumpsum('$id', '$budgetid', '$projectid', '$name', '$payment')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'deleteProjectBudgetLumpsum'){
        $id = $_GET['id'];

        $query = "DELETE FROM tbl_project_budget_lumpsum WHERE id = '$id'; ";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchProjectBudgetLumpsum'){
        $projectid = $_GET['projectid'];

        $query = "SELECT * FROM tbl_project_budget_lumpsum WHERE projectid = '$projectid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['budgetid'] = $row['budgetid'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['name'] = $row['name'];
                $response[$x]['payment'] = $row['payment'];
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
    
    if($_GET['function'] == 'createProjectBudgetMaterial'){
        $id = $_GET['id'];
        $budgetid = $_GET['budgetid'];
        $projectid = $_GET['projectid'];
        $name = $_GET['name'];
        $unit = $_GET['unit'];
        $quantity = $_GET['quantity'];
        $price = $_GET['price'];

        // $query = "IF ( (SELECT COUNT(id) FROM tbl_project_budget_material WHERE id = '$id') > 0 ) THEN
        //     BEGIN
        //         UPDATE tbl_project_budget_material SET `name` = '$name', `unit` = '$unit', `quantity` = '$quantity', `price` = '$price' WHERE id = '$id';
        //     END;
        //     ELSE 
        //     BEGIN
        //         INSERT INTO tbl_project_budget_material ( id, budgetid, projectid, `name`, `unit`, `quantity`, `price`) 
        //         VALUES ( '$id', '$budgetid', '$projectid', '$name', '$unit', '$quantity', '$price');
        //     END;
        // END IF;
        
        //  ";
        $query = "CALL createProjectBudgetMaterial('$id', '$budgetid', '$projectid', '$name', '$unit', '$quantity', '$price');";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'deleteProjectBudgetMaterial'){
        $id = $_GET['id']; 

        $query = "DELETE FROM tbl_project_budget_material WHERE id = '$id'; ";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchProjectBudgetMaterial'){
        $projectid = $_GET['projectid'];

        $query = "SELECT * FROM tbl_project_budget_material WHERE projectid = '$projectid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['budgetid'] = $row['budgetid'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['name'] = $row['name'];
                $response[$x]['unit'] = $row['unit'];
                $response[$x]['quantity'] = $row['quantity'];
                $response[$x]['price'] = $row['price'];
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

    if($_GET['function'] == 'createProjectBudgetMilestone'){
        $id = $_GET['id'];
        $projectid = $_GET['projectid'];
        $budgetid = $_GET['budgetid'];
        $resourceid = $_GET['resourceid'];
        $milestoneid = $_GET['milestoneid'];
        $name = $_GET['name'];
        $value = $_GET['value'];

        // $query = "IF ( (SELECT COUNT(id) FROM tbl_project_budget_milestone WHERE id = '$id') > 0 ) THEN
        //     BEGIN
        //         UPDATE tbl_project_budget_milestone SET `name` = '$name', `value` = '$value' WHERE id = '$id';
        //     END;
        //     ELSE 
        //     BEGIN
        //         INSERT INTO tbl_project_budget_milestone ( id, projectid, resourceid, milestoneid, `name`, `value`) 
        //         VALUES ( '$id', '$projectid', '$resourceid', '$milestoneid', '$name', '$value');
        //     END;
        // END IF;
          
        // ";

        $query = "CALL createProjectBudgetMilestone('$id', '$projectid', '$budgetid', '$resourceid', '$milestoneid', '$name', '$value');";

        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'deleteProjectBudgetMilestoneByMilestoneId'){
        $milestoneid = $_GET['milestoneid']; 

        $query = "DELETE FROM tbl_project_budget_milestone WHERE milestoneid = '$milestoneid'; ";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchProjectBudgetMilestone'){
        $projectid = $_GET['projectid'];

        $query = "SELECT * FROM tbl_project_budget_milestone WHERE projectid = '$projectid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['budgetid'] = $row['budgetid'];
                $response[$x]['resourceid'] = $row['resourceid'];
                $response[$x]['milestoneid'] = $row['milestoneid'];
                $response[$x]['name'] = $row['name'];
                $response[$x]['value'] = $row['value'];
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
    
    if($_GET['function'] == 'createProjectBudgetManhours'){
        $id = $_GET['id'];
        $budgetid = $_GET['budgetid'];
        $projectid = $_GET['projectid'];
        $name = $_GET['name'];
        $role = $_GET['role'];
        $hours = $_GET['hours'];
        $rate = $_GET['rate'];

        // $query = "IF ( (SELECT COUNT(id) FROM tbl_project_budget_manhours WHERE id = '$id') > 0 ) THEN
        //     BEGIN
        //         UPDATE tbl_project_budget_manhours SET `name` = '$name', `role` = '$role', `hours` = '$hours', `rate` = '$rate' WHERE id = '$id';
        //     END;
        //     ELSE 
        //     BEGIN
        //         INSERT INTO tbl_project_budget_manhours ( id, budgetid, projectid, `name`, `role`, `hours`, `rate`) 
        //         VALUES ( '$id', '$budgetid', '$projectid', '$name', '$role', '$hours', '$rate');
        //     END;
        // END IF; ";
        $query = "CALL createProjectBudgetManhours( '$id', '$budgetid', '$projectid', '$name', '$role', '$hours', '$rate'); ";

        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'deleteProjectBudgetManhours'){
        $id = $_GET['id']; 

        $query = "DELETE FROM tbl_project_budget_manhours WHERE id = '$id'; ";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'updateProjectBudgetExpense'){
        $id = $_GET['id'];
        $weeks = $_GET['weeks'];
        $trips = $_GET['trips'];
        $distance = $_GET['distance'];
        $distancerate = $_GET['distancerate'];
        $triphours = $_GET['triphours'];
        $triphoursrate = $_GET['triphoursrate'];
        $fixedrate = $_GET['fixedrate'];

        $query = "UPDATE tbl_project_budget_manhours 
        SET `weeks` = '$weeks', 
        `trips` = '$trips', 
        `distance` = '$distance', 
        `distancerate` = '$distancerate',
        `triphours` = '$triphours', 
        `triphoursrate` = '$triphoursrate', 
        `fixedrate` = '$fixedrate'
        WHERE id = '$id'; ";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchProjectBudgetManhours'){
        $projectid = $_GET['projectid'];

        $query = "SELECT * FROM tbl_project_budget_manhours WHERE projectid = '$projectid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['budgetid'] = $row['budgetid'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['name'] = $row['name'];
                $response[$x]['role'] = $row['role'];
                $response[$x]['hours'] = $row['hours'];
                $response[$x]['rate'] = $row['rate'];
                $response[$x]['weeks'] = $row['weeks'];
                $response[$x]['trips'] = $row['trips'];
                $response[$x]['distance'] = $row['distance'];
                $response[$x]['distancerate'] = $row['distancerate'];
                $response[$x]['triphours'] = $row['triphours'];
                $response[$x]['triphoursrate'] = $row['triphoursrate'];
                $response[$x]['fixedrate'] = $row['fixedrate'];
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

    if($_GET['function'] == 'createProjectBudgetAForecast'){
        $id = $_GET['id'];
        $projectid = $_GET['projectid'];
        $resourceid = $_GET['resourceid'];
        $year = $_GET['year'];
        $type = $_GET['type'];
        $m1 = $_GET['m1'];
        $m2 = $_GET['m2'];
        $m3 = $_GET['m3'];
        $m4 = $_GET['m4'];
        $m5 = $_GET['m5'];
        $m6 = $_GET['m6'];
        $m7 = $_GET['m7'];
        $m8 = $_GET['m8'];
        $m9 = $_GET['m9'];
        $m10 = $_GET['m10'];
        $m11 = $_GET['m11'];
        $m12 = $_GET['m12'];

        // $query = "IF ( (SELECT COUNT(id) FROM tbl_project_budget_forecast WHERE id = zid) > 0 ) THEN
        //     BEGIN
        //         UPDATE tbl_project_budget_forecast SET 
        //         `m1` = zm1, 
        //         `m2` = zm2, 
        //         `m3` = zm3, 
        //         `m4` = zm4, 
        //         `m5` = zm5, 
        //         `m6` = zm6, 
        //         `m7` = zm7, 
        //         `m8` = zm8, 
        //         `m9` = zm9, 
        //         `m10` = zm10, 
        //         `m11` = zm11, 
        //         `m12` = zm12
        //          WHERE id = zid;
        //     END;
        //     ELSE 
        //     BEGIN
        //         INSERT INTO tbl_project_budget_forecast ( id, projectid, resourceid, year, type, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12) 
        //         VALUES ( zid, zprojectid, zresourceid, zyear, ztype, zm1, zm2, zm3, zm4, zm5, zm6, zm7, zm8, zm9, zm10, zm11, zm12);
        //     END;
        // END IF; ";
        $query = "CALL createProjectBudgetAForecast('$id', '$projectid', '$resourceid', '$year', '$type', '$m1', '$m2', '$m3', '$m4', '$m5', '$m6', '$m7', '$m8', '$m9', '$m10', '$m11', '$m12' ); ";

        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchProjectBudgetAForecast'){
        $projectid = $_GET['projectid'];

        $query = "SELECT * FROM tbl_project_budget_forecast WHERE projectid = '$projectid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['resourceid'] = $row['resourceid'];
                $response[$x]['year'] = $row['year'];
                $response[$x]['type'] = $row['type'];
                $response[$x]['m1'] = $row['m1'];
                $response[$x]['m2'] = $row['m2'];
                $response[$x]['m3'] = $row['m3'];
                $response[$x]['m4'] = $row['m4'];
                $response[$x]['m5'] = $row['m5'];
                $response[$x]['m6'] = $row['m6'];
                $response[$x]['m7'] = $row['m7'];
                $response[$x]['m8'] = $row['m8'];
                $response[$x]['m9'] = $row['m9'];
                $response[$x]['m10'] = $row['m10'];
                $response[$x]['m11'] = $row['m11'];
                $response[$x]['m12'] = $row['m12'];
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


    if($_GET['function'] == 'createProjectRequestLock'){
        $id = $_GET['id'];
        $projectid = $_GET['projectid'];
        $api = $_GET['api'];
        $parameter = $_GET['parameter'];
        $type = $_GET['type'];
        $operation = $_GET['operation'];
        $description = $_GET['description'];

        $query = "INSERT INTO tbl_project_request_lock ( id, projectid, `api`, `parameter`, `type`, `operation`, `description`) 
        VALUES ( '$id', '$projectid', '$api', '$parameter', '$type', '$operation', '$description');";

        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'deleteProjectRequestLockByProjectId'){
        $projectid = $_GET['projectid'];

        $query = "DELETE FROM tbl_project_request_lock WHERE projectid = '$projectid'; ";

        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'deleteProjectRequestLock'){
        $id = $_GET['id'];

        $query = "DELETE FROM tbl_project_request_lock WHERE id = '$id'; ";

        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchProjectRequestLock'){
        $projectid = $_GET['projectid'];

        $query = "SELECT * FROM tbl_project_request_lock WHERE projectid = '$projectid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['api'] = $row['api'];
                $response[$x]['parameter'] = $row['parameter'];
                $response[$x]['type'] = $row['type'];
                $response[$x]['operation'] = $row['operation'];
                $response[$x]['description'] = $row['description'];
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

    if($_GET['function'] == 'updateProjectRequestLockstatus'){
        $projectid = $_GET['projectid'];
        $lockstatus = $_GET['lockstatus'];

        $query = "UPDATE tbl_project_request SET lockstatus = '$lockstatus' WHERE projectid = '$projectid'; ";

        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }

    if($_GET['function'] == 'createProjectInvoice'){
        $id = $_GET['id'];
        $projectid = $_GET['projectid'];
        $supplierid = $_GET['supplierid'];
        $budgetid = $_GET['budgetid'];
        $invoicedate = $_GET['invoicedate'];
        $invoicedetail = $_GET['invoicedetail'];
        $invoicenumber = $_GET['invoicenumber'];
        $exchangerate = $_GET['exchangerate'];

        $query = "INSERT INTO tbl_project_invoice ( id, projectid, supplierid, budgetid, invoicedate, invoicedetail, invoicenumber, exchangerate) 
        VALUES ( '$id', '$projectid', '$supplierid', '$budgetid', '$invoicedate', '$invoicedetail', '$invoicenumber', '$exchangerate');";

        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'updateProjectInvoiceAttachment'){
        $id = $_GET['id'];
        $attachment = $_GET['attachment'];
        $filename = $_GET['filename'];

        $query = "UPDATE tbl_project_invoice SET attachment = '$attachment', `filename` = '$filename' WHERE id = '$projectid';";

        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchProjectInvoice'){
        $projectid = $_GET['projectid'];

        $query = "SELECT * FROM tbl_project_invoice WHERE projectid = '$projectid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['supplierid'] = $row['supplierid'];
                $response[$x]['budgetid'] = $row['budgetid'];
                $response[$x]['invoicedate'] = $row['invoicedate'];
                $response[$x]['invoicedetail'] = $row['invoicedetail'];
                $response[$x]['invoicenumber'] = $row['invoicenumber'];
                $response[$x]['exchangerate'] = $row['exchangerate'];
                $response[$x]['attachment'] = $row['attachment'];
                $response[$x]['filename'] = $row['filename'];
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

    if($_GET['function'] == 'createProjectInvoiceLumpsum'){
        $id = $_GET['id'];
        $projectid = $_GET['projectid'];
        $invoiceid = $_GET['invoiceid'];
        $milestoneid = $_GET['milestoneid'];
        $amount = $_GET['amount'];
 

        $query = "INSERT INTO tbl_project_invoice_lumpsum ( id, projectid, invoiceid, milestoneid, amount) 
        VALUES ( '$id', '$projectid', '$invoiceid', '$milestoneid', '$amount' );";

        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'updateProjectInvoiceLumpsum'){
        $id = $_GET['id'];
        $amount = $_GET['amount'];
 

        $query = "UPDATE tbl_project_invoice_lumpsum SET amount = '$amount' WHERE id = '$id'; ";

        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchProjectInvoiceLumpsum'){
        $projectid = $_GET['projectid'];

        $query = "SELECT * FROM tbl_project_invoice_lumpsum WHERE projectid = '$projectid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['invoiceid'] = $row['invoiceid'];
                $response[$x]['milestoneid'] = $row['milestoneid'];
                $response[$x]['amount'] = $row['amount'];
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


    if($_GET['function'] == 'createProjectInvoiceMaterial'){
        $id = $_GET['id'];
        $projectid = $_GET['projectid'];
        $invoiceid = $_GET['invoiceid'];
        $materialid = $_GET['materialid'];
        $amount = $_GET['amount'];

        $query = "INSERT INTO tbl_project_invoice_material ( id, projectid, invoiceid, materialid, amount) 
        VALUES ( '$id', '$projectid', '$invoiceid', '$materialid', '$amount' );";

        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'updateProjectInvoiceMaterial'){
        $id = $_GET['id'];
        $amount = $_GET['amount'];
 

        $query = "UPDATE tbl_project_invoice_material SET amount = '$amount' WHERE id = '$id'; ";

        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchProjectInvoiceMaterial'){
        $projectid = $_GET['projectid'];

        $query = "SELECT * FROM tbl_project_invoice_material WHERE projectid = '$projectid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['invoiceid'] = $row['invoiceid'];
                $response[$x]['materialid'] = $row['materialid'];
                $response[$x]['amount'] = $row['amount'];
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

    
    if($_GET['function'] == 'createProjectInvoiceMilestone'){
        $id = $_GET['id'];
        $projectid = $_GET['projectid'];
        $invoiceid = $_GET['invoiceid'];
        $milestoneid = $_GET['milestoneid'];
        $resourceid = $_GET['resourceid'];
        $hours = $_GET['hours'];

        // $query = "INSERT INTO tbl_project_invoice_milestone ( id, projectid, invoiceid, milestoneid, resourceid, `hours`) 
        // VALUES ( '$id', '$projectid', '$invoiceid', '$milestoneid', '$resourceid', '$hours' );";

        $query = "CALL createProjectInvoiceMilestone('$id', '$projectid', '$invoiceid', '$milestoneid', '$resourceid', '$hours');";

        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'updateProjectInvoiceMilestone'){
        $id = $_GET['id'];
        $hours = $_GET['hours'];
 

        $query = "UPDATE tbl_project_invoice_milestone SET `hours` = '$hours' WHERE id = '$id'; ";

        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchProjectInvoiceMilestone'){
        $projectid = $_GET['projectid'];

        $query = "SELECT * FROM tbl_project_invoice_milestone WHERE projectid = '$projectid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['invoiceid'] = $row['invoiceid'];
                $response[$x]['milestoneid'] = $row['milestoneid'];
                $response[$x]['resourceid'] = $row['resourceid'];
                $response[$x]['hours'] = $row['hours'];
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

    if($_GET['function'] == 'createProjectInvoiceManhours'){
        $id = $_GET['id'];
        $projectid = $_GET['projectid'];
        $invoiceid = $_GET['invoiceid'];
        $resourceid = $_GET['resourceid'];
        $hours = $_GET['hours'];

        $query = "INSERT INTO tbl_project_invoice_manhours ( id, projectid, invoiceid, resourceid, `hours`) 
        VALUES ( '$id', '$projectid', '$invoiceid', '$resourceid', '$hours' );";

        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'updateProjectInvoiceManhours'){
        $id = $_GET['id'];
        $hours = $_GET['hours'];

        $query = "UPDATE tbl_project_invoice_manhours SET `hours` = '$hours' WHERE id = '$id'; ";

        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchProjectInvoiceManhours'){
        $projectid = $_GET['projectid'];

        $query = "SELECT * FROM tbl_project_invoice_manhours WHERE projectid = '$projectid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['invoiceid'] = $row['invoiceid'];
                $response[$x]['resourceid'] = $row['resourceid'];
                $response[$x]['hours'] = $row['hours'];
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

    if($_GET['function'] == 'createProjectInvoiceExpense'){
        $id = $_GET['id'];
        $projectid = $_GET['projectid'];
        $invoiceid = $_GET['invoiceid'];
        $resourceid = $_GET['resourceid'];
        $weeks = $_GET['weeks'];
        $trips = $_GET['trips'];
        $distance = $_GET['distance'];
        $distancerate = $_GET['distancerate'];
        $triphours = $_GET['triphours'];
        $triphoursrate = $_GET['triphoursrate'];
        $fixedrate = $_GET['fixedrate'];
  

        $query = "INSERT INTO tbl_project_invoice_expense ( id, projectid, invoiceid, resourceid, weeks, trips, distance, distancerate, triphours, triphoursrate, fixedrate) 
        VALUES ( '$id', '$projectid', '$invoiceid', '$resourceid', '$weeks', '$trips', '$distance', '$distancerate', '$triphours', '$triphoursrate', '$fixedrate' );";

        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'updateProjectInvoiceExpense'){
        $id = $_GET['id'];
        $weeks = $_GET['weeks'];
        $trips = $_GET['trips'];
        $distance = $_GET['distance'];
        $distancerate = $_GET['distancerate'];
        $triphours = $_GET['triphours'];
        $triphoursrate = $_GET['triphoursrate'];
        $fixedrate = $_GET['fixedrate'];
    
        $query = "UPDATE tbl_project_invoice_expense SET weeks = '$weeks', trips = '$trips', distance = '$distance', distancerate = '$distancerate', triphours = '$triphours', triphoursrate = '$triphoursrate', fixedrate = '$fixedrate' WHERE id = '$id'; ";

        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchProjectInvoiceExpense'){
        $projectid = $_GET['projectid'];

        $query = "SELECT * FROM tbl_project_invoice_expense WHERE projectid = '$projectid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['invoiceid'] = $row['invoiceid'];
                $response[$x]['resourceid'] = $row['resourceid'];
                $response[$x]['weeks'] = $row['weeks'];
                $response[$x]['trips'] = $row['trips'];
                $response[$x]['distance'] = $row['distance'];
                $response[$x]['distancerate'] = $row['distancerate'];
                $response[$x]['triphours'] = $row['triphours'];
                $response[$x]['triphoursrate'] = $row['triphoursrate'];
                $response[$x]['fixedrate'] = $row['fixedrate'];
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

    if($_GET['function'] == 'createProjectInvoiceForecast'){
        $id = $_GET['id'];
        $projectid = $_GET['projectid'];
        $resourceid = $_GET['resourceid'];
        $year = $_GET['year'];
        $type = $_GET['type'];
        $m1 = $_GET['m1'];
        $m2 = $_GET['m2'];
        $m3 = $_GET['m3'];
        $m4 = $_GET['m4'];
        $m5 = $_GET['m5'];
        $m6 = $_GET['m6'];
        $m7 = $_GET['m7'];
        $m8 = $_GET['m8'];
        $m9 = $_GET['m9'];
        $m10 = $_GET['m10'];
        $m11 = $_GET['m11'];
        $m12 = $_GET['m12'];

        $query = "CALL createProjectInvoiceForecast('$id', '$projectid', '$resourceid', '$year', '$type', '$m1', '$m2', '$m3', '$m4', '$m5', '$m6', '$m7', '$m8', '$m9', '$m10', '$m11', '$m12' ); ";

        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }

    if($_GET['function'] == 'fetchProjectInvoiceForecast'){
        $projectid = $_GET['projectid'];

        $query = "SELECT * FROM tbl_project_invoice_forecast WHERE projectid = '$projectid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['resourceid'] = $row['resourceid'];
                $response[$x]['year'] = $row['year'];
                $response[$x]['type'] = $row['type'];
                $response[$x]['m1'] = $row['m1'];
                $response[$x]['m2'] = $row['m2'];
                $response[$x]['m3'] = $row['m3'];
                $response[$x]['m4'] = $row['m4'];
                $response[$x]['m5'] = $row['m5'];
                $response[$x]['m6'] = $row['m6'];
                $response[$x]['m7'] = $row['m7'];
                $response[$x]['m8'] = $row['m8'];
                $response[$x]['m9'] = $row['m9'];
                $response[$x]['m10'] = $row['m10'];
                $response[$x]['m11'] = $row['m11'];
                $response[$x]['m12'] = $row['m12'];
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



    if($_GET['function'] == 'createProjectBudgetUpload'){
        $id = $_GET['id'];
        $projectid = $_GET['projectid'];
        $budgetid = $_GET['budgetid'];
        $slink = $_GET['link'];
        $filename = $_GET['filename'];
        $costing = $_GET['costing'];

        $query = "INSERT INTO tbl_project_budget_upload ( id, projectid, budgetid, link, `filename`, costing) 
        VALUES ( '$id', '$projectid', '$budgetid', '$slink', '$filename', '$costing' );";

        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'deleteProjectBudgetUpload'){
        $id = $_GET['id'];
    
        $query = "DELETE FROM tbl_project_budget_upload WHERE id = '$id'; ";

        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchProjectBudgetUpload'){
        $projectid = $_GET['projectid'];

        $query = "SELECT * FROM tbl_project_budget_upload WHERE projectid = '$projectid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['budgetid'] = $row['budgetid'];
                $response[$x]['link'] = $row['link'];
                $response[$x]['filename'] = $row['filename'];
                $response[$x]['costing'] = $row['costing'];
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


    if($_GET['function'] == 'createProjectPrereq'){
        $id = $_GET['id'];
        $projectid = $_GET['projectid'];
        $name = $_GET['name'];
        $status = $_GET['status'];
        $docnum = $_GET['docnum'];
        $comments = $_GET['comments'];

        $query = "INSERT INTO tbl_project_prereq ( id, projectid, `name`, `status`, docnum, comments) 
        VALUES ( '$id', '$projectid', '$name', '$status', '$docnum', '$comments' );";

        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'deleteProjectPrereq'){
        $id = $_GET['id'];
    
        $query = "DELETE FROM tbl_project_prereq WHERE id = '$id'; ";

        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchProjectPrereq'){
        $projectid = $_GET['projectid'];

        $query = "SELECT * FROM tbl_project_prereq WHERE projectid = '$projectid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['name'] = $row['name'];
                $response[$x]['status'] = $row['status'];
                $response[$x]['docnum'] = $row['docnum'];
                $response[$x]['comments'] = $row['comments'];
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
    if($_GET['function'] == 'updateProjectPrereq'){
        $id = $_GET['id'];
        $name = $_GET['name'];
        $status = $_GET['status'];
        $docnum = $_GET['docnum'];
        $comments = $_GET['comments'];

        $query = "UPDATE tbl_project_prereq SET `name` = '$name', `status` = '$status', docnum = '$docnum', comments = '$comments'WHERE id = '$id';";

        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }


    if($_GET['function'] == 'createProjectInvoiceUpload'){
        $id = $_GET['id'];
        $projectid = $_GET['projectid'];
        $invoiceid = $_GET['invoiceid'];
        $slink = $_GET['link'];
        $filename = $_GET['filename'];
        $costing = $_GET['costing'];

        $query = "INSERT INTO tbl_project_invoice_upload ( id, projectid, invoiceid, link, `filename`, costing) 
        VALUES ( '$id', '$projectid', '$invoiceid', '$slink', '$filename', '$costing' );";

        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'deleteProjectInvoiceUpload'){
        $id = $_GET['id'];
    
        $query = "DELETE FROM tbl_project_invoice_upload WHERE id = '$id'; ";

        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchProjectInvoiceUpload'){
        $projectid = $_GET['projectid'];

        $query = "SELECT * FROM tbl_project_invoice_upload WHERE projectid = '$projectid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['invoiceid'] = $row['invoiceid'];
                $response[$x]['link'] = $row['link'];
                $response[$x]['filename'] = $row['filename'];
                $response[$x]['costing'] = $row['costing'];
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


    
    if($_GET['function'] == 'createProjectRequestScore'){
        $requestid = $_GET['requestid'];
        $projectid = $_GET['projectid'];
        $columnname = $_GET['columnname'];
        $value = $_GET['value'];

        $query = "CALL createProjectRequestScore('$requestid', '$projectid', '$columnname', '$value');";

        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchProjectRequestScore'){
        $projectid = $_GET['projectid'];

        $query = "SELECT * FROM tbl_project_request_score WHERE projectid = '$projectid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['requestid'] = $row['requestid'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['desc_1'] = $row['desc_1'];
                $response[$x]['desc_2'] = $row['desc_2'];
                $response[$x]['desc_3'] = $row['desc_3'];
                $response[$x]['desc_4_1'] = $row['desc_4_1'];
                $response[$x]['desc_4_2'] = $row['desc_4_2'];
                $response[$x]['prior_1'] = $row['prior_1'];
                $response[$x]['prior_2'] = $row['prior_2'];
                $response[$x]['prior_3'] = $row['prior_3'];
                $response[$x]['prior_4'] = $row['prior_4'];
                $response[$x]['prior_5'] = $row['prior_5'];
                $response[$x]['prior_6'] = $row['prior_6'];
                $response[$x]['prior_7'] = $row['prior_7'];
                $response[$x]['prior_8'] = $row['prior_8'];
                $response[$x]['strat_1'] = $row['strat_1'];
                $response[$x]['strat_2'] = $row['strat_2'];
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
    
    if($_GET['function'] == 'createProjectRequestScoreAdd'){
        $id = $_GET['id'];
        $requestid = $_GET['requestid'];
        $projectid = $_GET['projectid'];
        $score = $_GET['score'];

        $query = "CALL createProjectRequestScoreAdd( '$id','$requestid', '$projectid', '$score');";

        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchProjectRequestScoreAdd'){
        $projectid = $_GET['projectid'];

        $query = "SELECT * FROM tbl_project_request_score_add WHERE projectid = '$projectid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['requestid'] = $row['requestid'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['score'] = $row['score'];
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


    if($_GET['function'] == 'createProjectGroup'){
        $id = $_GET['id'];
        $ownerid = $_GET['ownerid'];
        $name = $_GET['name'];
        $description = $_GET['description'];

        $query = "INSERT INTO tbl_project_group (id, ownerid, `name`, `description`) VALUES ('$id', '$ownerid', '$name', '$description')";

        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchProjectGroup'){
        $ownerid = $_GET['ownerid'];

        $query = "SELECT * FROM tbl_project_group WHERE ownerid = '$ownerid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['ownerid'] = $row['ownerid'];
                $response[$x]['name'] = $row['name'];
                $response[$x]['description'] = $row['description'];
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
    if($_GET['function'] == 'fetchProjectGroupByGroupId'){
        $groupid = $_GET['groupid'];

        $query = "SELECT * FROM tbl_project_group WHERE id = '$groupid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['ownerid'] = $row['ownerid'];
                $response[$x]['name'] = $row['name'];
                $response[$x]['description'] = $row['description'];
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
    if($_GET['function'] == 'fetchProjectByGroupid'){
        $groupid = $_GET['groupid'];

        $query = "SELECT * FROM tbl_project WHERE groupid = '$groupid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['companyid'] = $row['companyid'];
                $response[$x]['ownerid'] = $row['ownerid'];
                $response[$x]['creator'] = $row['creator'];
                $response[$x]['projectname'] = $row['projectname'];
                $response[$x]['reference'] = $row['reference'];
                $response[$x]['status'] = $row['status'];
                $response[$x]['groupid'] = $row['groupid'];
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

    
    if($_GET['function'] == 'updateProjectGroupId'){
        
        $projectid = $_GET['projectid'];
        $groupid = $_GET['groupid'];

        $query = "UPDATE tbl_project SET groupid = '$groupid' WHERE projectid = '$projectid'; ";
        
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }


    if($_GET['function'] == 'projectValhalla'){
        
        $projectid = $_GET['projectid'];

        $query = "CALL projectValhalla('$projectid'); ";
        
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    



}



?>



