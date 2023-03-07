<?php
include '../../controllers/idbconn.php';
header("Content-Type:application/json");


if (isset($_GET['function']) && $_GET['function']!="") {

    if($_GET['function'] == 'createComplain'){
        $id = trim($_GET['id']);
        $companyid = trim($_GET['companyid']);
        $sender = trim($_GET['sender']);
        $type = trim($_GET['type']);
        $message = trim($_GET['message']);

        // taskid, catid, projectid, ownerid, title, url, version, status
        $query = "INSERT INTO tbl_complains (id, companyid, sender, `type`, `message`, `status`, senddate) VALUES ('$id', '$companyid', '$sender', '$type', '$message', 'active', DEFAULT);";
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

    if($_GET['function'] == 'updateComplainStatus'){
        $id = $_GET['id'];
        $status = $_GET['status'];

        $query = "UPDATE tbl_complains SET `status` = '$status' WHERE id = '$id'; ";
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


    if($_GET['function'] == 'fetchActiveComplains'){
        // docid, catid, comid, ownerid, title, url, version, status
        $query = "SELECT * FROM tbl_complains WHERE `status` = 'active'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['companyid'] = $row['companyid'];
                $response[$x]['sender'] = $row['sender'];
                $response[$x]['type'] = $row['type'];
                $response[$x]['message'] = $row['message'];
                $response[$x]['status'] = $row['status'];
                $response[$x]['senddate'] = $row['senddate'];
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
    if($_GET['function'] == 'fetchArchivedComplains'){
        // docid, catid, comid, ownerid, title, url, version, status
        $query = "SELECT * FROM tbl_complains WHERE `status` = 'archived'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['companyid'] = $row['companyid'];
                $response[$x]['sender'] = $row['sender'];
                $response[$x]['type'] = $row['type'];
                $response[$x]['message'] = $row['message'];
                $response[$x]['status'] = $row['status'];
                $response[$x]['senddate'] = $row['senddate'];
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

    if($_GET['function'] == 'sendAlertReply'){
        $id = $_GET['id'];
        $ownerid = $_GET['ownerid'];
        $fn = $_GET['fn'];
        $dataview = $_GET['dataview'];
        $dataapprove = $_GET['dataapprove'];
        $datareject = $_GET['datareject'];
        $title = $_GET['title'];
        $message = $_GET['message'];

        $dbname = $_GET['databaseid'];
        $zlink = mysqli_connect($server,$username,$password, $dbname) or die("Connection failed: " . mysqli_connect_error());

        $query = "INSERT INTO tbl_alert (id, ownerid, `function`, `dataview`, `dataapprove`, `datareject`, `title`, `message`) VALUES ('$id', '$ownerid', '$fn', '$dataview', '$dataapprove', '$datareject', '$title', '$message'); ";

        // $rs = mysqli_query($link , $query);
        if(mysqli_query($zlink , $query)){
            $response['response'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($zlink);
        }else{
            $response['response'] = 'false';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($zlink);
        }
    }
}