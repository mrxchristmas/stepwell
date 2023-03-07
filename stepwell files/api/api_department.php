<?php
include '../controllers/dbconn.php';
header("Content-Type:application/json");
if (isset($_GET['function']) && $_GET['function']!="") {

    if($_GET['function'] == 'fetchdepartments'){
        $comid = $_GET['comid'];
    
        $query = "CALL fetchDepartments('$comid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['title'] = $row['title'];
                $response[$x]['id'] = $row['id'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchDepartments'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'createdepartment'){
        $id = $_GET['id'];
        $comid = $_GET['comid'];
        $title = $_GET['title'];
    
        $query = "CALL createDepartment('$id', '$comid','$title')";
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
    if($_GET['function'] == 'updatedepartment'){
        $id = $_GET['id'];
        $title = $_GET['title'];
        $query = "CALL updateDepartment('$id','$title')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'deletedepartment'){
        $id = $_GET['id'];
    
        $query = "CALL deleteDepartment('$id')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'searchdepartment'){
        $comid = $_GET['comid'];
        $title = $_GET['title'];
    
        $query = "call searchDepartment('$comid', '$title');";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['title'] = $row['title'];
                $response[$x]['id'] = $row['id'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response[0] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }

}


?>