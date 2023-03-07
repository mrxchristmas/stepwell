<?php
include '../controllers/dbconn.php';
header("Content-Type:application/json");
if (isset($_GET['function']) && $_GET['function']!="") {

    if($_GET['function'] == 'fetchpositions'){
        $comid = $_GET['comid'];
    
        $query = "CALL fetchPositions('$comid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['title'] = $row['title'];
                $response[$x]['id'] = $row['id'];
                $response[$x]['department'] = $row['department'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchPositions'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'createposition'){
        $id = $_GET['id'];
        $comid = $_GET['comid'];
        $department = $_GET['department'];
        $title = $_GET['title'];
    
        // $query = "CALL createPosition('$id', '$comid','$title')";
        $query = "INSERT INTO tbl_position (id, companyid, department, title) VALUES ('$id', '$comid', '$department', '$title')";
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
    if($_GET['function'] == 'updateposition'){
        $id = $_GET['id'];
        $title = $_GET['title'];
        $query = "CALL updatePosition('$id','$title')";
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
    if($_GET['function'] == 'deleteposition'){
        $id = $_GET['id'];
    
        $query = "CALL deletePosition('$id')";
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
    if($_GET['function'] == 'searchposition'){
        $comid = $_GET['comid'];
        $title = $_GET['title'];
        $department = $_GET['department'];
        $query = "";
        
        if($department == 'null'){
            $query = "call searchPosition('$comid', '$title');";
        
        }else{
            $query = "call searchPositionByDepartment('$comid', '$title', '$department');";
        }
        
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
    if($_GET['function'] == 'updatepositiondepartment'){
        $id = $_GET['id'];
        $department = $_GET['department'];
        $query = "call updatePositionDepartment('$id', '$department');";
        
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
    if($_GET['function'] == 'fetchpositionsbydepartment'){
        $comid = $_GET['comid'];
        $department = $_GET['department'];
        $query = '';

        if($department == 'na'){
            $query = "CALL fetchPositions('$comid')";
        }else{
            $query = "CALL fetchPositionByDepartment('$comid', '$department')";
        }

        // $response['title'] = $query;
        // $json_response = json_encode($response);
        // echo $json_response;
        // mysqli_close($link);

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
            $response['fetchPositions'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }

}



?>