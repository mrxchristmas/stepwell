<?php
include '../controllers/dbconn.php';
header("Content-Type:application/json");



if (isset($_GET['function']) && $_GET['function']!="") {

    if($_GET['function'] == 'createdocumentconnect'){
        $accid = $_GET['accid'];
        $docid = $_GET['docid'];
        $comid = $_GET['comid'];
        $role = $_GET['role'];
        // docid, catid, comid, ownerid, title, url, version, status
        $query = "CALL createDocumentConnect('$accid', '$docid', '$comid', '$role')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'deletedocumentconnect'){
        $accid = $_GET['accid'];
        $docid = $_GET['docid'];
        $role = $_GET['role'];
        // docid, catid, comid, ownerid, title, url, version, status
        $query = "CALL deleteDocumentConnect('$accid', '$docid', '$role')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchdocumentconnect'){
        $docid = $_GET['docid'];
        $comid = $_GET['comid'];
        // docid, catid, comid, ownerid, title, url, version, status
        $query = "CALL fetchDocumentConnect('$docid', '$comid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['accid'] = $row['accid'];
                $response[$x]['role'] = $row['role'];
                $response[$x]['firstname'] = $row['firstname'];
                $response[$x]['lastname'] = $row['lastname'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchDocumentConnect'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'fetchdocumentconnectread'){
        $accid = $_GET['accid'];
        $comid = $_GET['comid'];
        // docid, catid, comid, ownerid, title, url, version, status
        $query = "CALL fetchDocumentConnectRead('$accid', '$comid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['read'] = $row['read'];
                $response[$x]['docid'] = $row['docid'];
                $response[$x]['role'] = $row['role'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchDocumentConnectRead'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'fetchdocumentconnectbyaccid'){
        $accid = $_GET['accid'];
        $comid = $_GET['comid'];

        $query = "CALL fetchDocumentConnectByAccid('$accid', '$comid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['docid'] = $row['docid'];
                $response[$x]['role'] = $row['role'];
                $response[$x]['read'] = $row['read'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchdocumentconnectbyaccid'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'deletedocumentconnectbydocid'){
        $docid = $_GET['docid'];
        // docid, catid, comid, ownerid, title, url, version, status
        $query = "CALL deleteDocumentConnectByDocid('$docid')";
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