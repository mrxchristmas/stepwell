<?php
include '../controllers/dbconn.php';
header("Content-Type:application/json");
if (isset($_GET['function']) && $_GET['function']!="") {


    if($_GET['function'] == 'creategroup'){
        $groupid = $_GET['groupid'];
        $groupname = $_GET['groupname'];
        $owner = $_GET['owner'];
        $comid = $_GET['comid'];
    
        $query = "CALL createGroup('$groupid', '$groupname', '$owner', '$comid')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'deletegroup'){
        $groupid = $_GET['groupid'];
        $query = "CALL deleteGroup('$groupid')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchgroupbyid'){
        $memberid = $_GET['memberid'];
    
        $query = "CALL fetchGroupById('$memberid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['groupname'] = $row['groupname'];
                $response[$x]['groupid'] = $row['groupid'];
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
            $response['fetchGroupById'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'addgroupmember'){
        $groupid = $_GET['groupid'];
        $memberid = $_GET['memberid'];
    
        $query = "CALL addGroupMember('$groupid', '$memberid')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'removegroupmember'){
        $groupid = $_GET['groupid'];
        $memberid = $_GET['memberid'];
    
        $query = "CALL removeGroupMember('$groupid', '$memberid')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchgroupmembers'){
        $groupid = $_GET['groupid'];
    
        $query = "CALL fetchGroupMembers('$groupid')";
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
            $response['fetchGroupById'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'fetchgroupinfo'){
        $groupid = $_GET['groupid'];
    
        $query = "CALL fetchGroupInfo('$groupid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['groupname'] = $row['groupname'];
                $response[$x]['ownerid'] = $row['ownerid'];
                $response[$x]['firstname'] = $row['firstname'];
                $response[$x]['lastname'] = $row['lastname'];
                $response[$x]['photo'] = $row['photo'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchGroupInfo'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    

}

?>