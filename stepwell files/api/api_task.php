<?php
include '../controllers/dbconn.php';
header("Content-Type:application/json");



if (isset($_GET['function']) && $_GET['function']!="") {

    
    
    if($_GET['function'] == 'createtask'){
        $taskid = trim($_GET['taskid']);
        $projectid = trim($_GET['projectid']);
        $planid = trim($_GET['planid']);
        $taskname = trim($_GET['taskname']);
        $startdate = trim($_GET['startdate']);
        $enddate = trim($_GET['enddate']);
        
        // taskid, catid, projectid, ownerid, title, url, version, status
        $query = "CALL createTask('$taskid', '$projectid', '$planid', '$taskname', '$startdate', '$enddate');";
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
    if($_GET['function'] == 'deletetask'){
        $taskid = trim($_GET['taskid']);
        // taskid, catid, projectid, ownerid, title, url, version, status
        $query = "CALL deleteTask('$taskid');";
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
    if($_GET['function'] == 'fetchtaskbyprojectid'){
        $projectid = $_GET['projectid'];
        // docid, catid, comid, ownerid, title, url, version, status
        $query = "CALL fetchTaskByProjectid('$projectid');";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['taskid'] = $row['taskid'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['planid'] = $row['planid'];
                $response[$x]['status'] = $row['status'];
                $response[$x]['taskname'] = $row['taskname'];
                $response[$x]['startdate'] = $row['startdate'];
                $response[$x]['enddate'] = $row['enddate'];
                
                
                // $response[$x]['connectid'] = $row['connectid'];
                // $response[$x]['accid'] = $row['accid'];
                // $response[$x]['planid'] = $row['planid'];
                // $response[$x]['status'] = $row['status'];
                // $response[$x]['suggesteddate'] = $row['suggesteddate'];
                // $response[$x]['assignment'] = $row['assignment'];
                // $response[$x]['pmcomment'] = $row['pmcomment'];
                // $response[$x]['usercomment'] = $row['usercomment'];
                // $response[$x]['usrread'] = $row['usrread'];
                // $response[$x]['pmread'] = $row['pmread'];

                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchtaskbyprojectid'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'updatetaskdates'){
        $taskid = trim($_GET['taskid']);
        $startdate = trim($_GET['startdate']);
        $enddate = trim($_GET['enddate']);
        // taskid, catid, projectid, ownerid, title, url, version, status
        $query = "CALL updateTaskDates('$taskid', '$startdate', '$enddate');";
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
    if($_GET['function'] == 'createtaskresource'){
        $id = trim($_GET['id']);
        $taskid = trim($_GET['taskid']);
        $type = trim($_GET['type']);
        $projectid = trim($_GET['projectid']);
        $supplierid = trim($_GET['supplierid']);
        $accid = trim($_GET['accid']);
        $hours = trim($_GET['hours']);
        $planid = trim($_GET['planid']);


        // taskid, catid, projectid, ownerid, title, url, version, status
        $query = "CALL createTaskResource('$id', '$taskid', '$type', '$projectid', '$supplierid', '$accid', '$hours', '$planid');";
        // $query = "CALL createTaskResource('TR-713662755', 'T-228611615', 'supplier', 'P-120321127', 'SPL-874800880', '', '0', 'PD-113585186');";


        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['response'] = 'false';
            $response['server'] = $server;
            $response['username'] = $username;
            $response['password'] = $password;
            $response['dbname'] = $dbname;
            $response['id'] = trim($_GET['id']);
            $response['taskid'] = trim($_GET['taskid']);
            $response['type'] = trim($_GET['type']);
            $response['projectid'] = trim($_GET['projectid']);
            $response['supplierid'] = trim($_GET['supplierid']);
            $response['accid'] = trim($_GET['accid']);
            $response['hours'] = trim($_GET['hours']);
            $response['planid'] = trim($_GET['planid']);
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'deletetaskresource'){
        $id = trim($_GET['id']);
        $query = "CALL deleteTaskResource('$id');";
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
    if($_GET['function'] == 'fetchtaskresourcebyplanid'){
        $planid = $_GET['planid'];
        // docid, catid, comid, ownerid, title, url, version, status
        $query = "CALL fetchTaskResourceByPlanId('$planid');";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['taskid'] = $row['taskid'];
                $response[$x]['type'] = $row['type'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['planid'] = $row['planid'];
                $response[$x]['supplierid'] = $row['supplierid'];
                $response[$x]['accid'] = $row['accid'];
                $response[$x]['hours'] = $row['hours'];
                $response[$x]['status'] = $row['status'];
                $response[$x]['suggesteddate'] = $row['suggesteddate'];
                $response[$x]['assignment'] = $row['assignment'];
                $response[$x]['usercomment'] = $row['usercomment'];
                $response[$x]['pmcomment'] = $row['pmcomment'];
                $response[$x]['usrread'] = $row['usrread'];
                $response[$x]['pmread'] = $row['pmread'];
                $response[$x]['firstname'] = $row['firstname'];
                $response[$x]['lastname'] = $row['lastname'];
                $response[$x]['suppliername'] = $row['suppliername'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchtaskbyprojectid'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'fetchtaskresourcebyprojectid'){
        $projectid = $_GET['projectid'];
        // docid, catid, comid, ownerid, title, url, version, status
        $query = "CALL fetchTaskResourceByProjectId('$projectid');";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['taskid'] = $row['taskid'];
                $response[$x]['type'] = $row['type'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['planid'] = $row['planid'];
                $response[$x]['supplierid'] = $row['supplierid'];
                $response[$x]['accid'] = $row['accid'];
                $response[$x]['mapaccid'] = $row['mapaccid'];
                $response[$x]['hours'] = $row['hours'];
                $response[$x]['status'] = $row['status'];
                $response[$x]['suggesteddate'] = $row['suggesteddate'];
                $response[$x]['assignment'] = $row['assignment'];
                $response[$x]['usercomment'] = $row['usercomment'];
                $response[$x]['pmcomment'] = $row['pmcomment'];
                $response[$x]['usrread'] = $row['usrread'];
                $response[$x]['pmread'] = $row['pmread'];
                $response[$x]['firstname'] = $row['firstname'];
                $response[$x]['lastname'] = $row['lastname'];
                $response[$x]['suppliername'] = $row['suppliername'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchtaskresourcebyprojectid'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'updatetaskresourcecolumn'){
        $id = trim($_GET['id']);
        $columnname = trim($_GET['columnname']);
        $value = trim($_GET['value']);
        // id, catid, projectid, ownerid, title, url, version, status
        $query = "CALL updateTaskResourceColumn('$id', '$columnname', '$value');";
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
    if($_GET['function'] == 'updatepmcomment'){
        $taskid = trim($_GET['taskid']);
        $message = trim($_GET['message']);
        $query = "CALL updatePMComment('$taskid', '$message');";
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
    if($_GET['function'] == 'updatetaskresourcecolumnbytaskid'){
        $taskid = trim($_GET['taskid']);
        $columnname = trim($_GET['columnname']);
        $value = trim($_GET['value']);
        $query = "CALL updateTaskResourceColumnByTaskId('$taskid', '$columnname', '$value');";
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
    if($_GET['function'] == 'updatetaskresourcecolumnbyid'){
        $trid = trim($_GET['trid']);
        $columnname = trim($_GET['columnname']);
        $value = trim($_GET['value']);
        $query = "CALL updateTaskResourceColumnById('$trid', '$columnname', '$value');";
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
    if($_GET['function'] == 'updatetaskcolumnbyid'){
        $trid = trim($_GET['trid']);
        $columnname = trim($_GET['columnname']);
        $value = trim($_GET['value']);
        $query = "CALL updateTaskColumnById('$trid', '$columnname', '$value');";
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
    if($_GET['function'] == 'updatetaskresourcecolumnbytaskidandaccid'){
        $taskid = trim($_GET['taskid']);
        $accid = trim($_GET['accid']);
        $columnname = trim($_GET['columnname']);
        $value = trim($_GET['value']);
        $query = "CALL updateTaskResourceColumnByTaskidAndAccid('$taskid', '$accid', '$columnname', '$value');";
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
    if($_GET['function'] == 'updatetaskcolumn'){
        $taskid = trim($_GET['taskid']);
        $columnname = trim($_GET['columnname']);
        $value = trim($_GET['value']);
        $query = "CALL updateTaskColumn('$taskid', '$columnname', '$value');";
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
    
    
    if($_GET['function'] == 'fetchtaskresourcebyplanidupdated'){
        $planid = $_GET['planid'];
        // docid, catid, comid, ownerid, title, url, version, status
        $query = "CALL fetchTaskResourceByPlanIdUpdated('$planid');";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['taskid'] = $row['taskid'];
                $response[$x]['type'] = $row['type'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['planid'] = $row['planid'];
                $response[$x]['supplierid'] = $row['supplierid'];
                $response[$x]['accid'] = $row['accid'];
                $response[$x]['hours'] = $row['hours'];
                $response[$x]['status'] = $row['status'];
                $response[$x]['suggesteddate'] = $row['suggesteddate'];
                $response[$x]['assignment'] = $row['assignment'];
                $response[$x]['usercomment'] = $row['usercomment'];
                $response[$x]['pmcomment'] = $row['pmcomment'];
                $response[$x]['usrread'] = $row['usrread'];
                $response[$x]['pmread'] = $row['pmread'];
                $response[$x]['firstname'] = $row['firstname'];
                $response[$x]['lastname'] = $row['lastname'];
                $response[$x]['suppliername'] = $row['suppliername'];
                $response[$x]['taskname'] = $row['taskname'];
                $response[$x]['startdate'] = $row['startdate'];
                $response[$x]['enddate'] = $row['enddate'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchTaskResourceByPlanIdUpdated'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    
    
    
    
}

?>