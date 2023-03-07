<?php
include '../controllers/idbconn.php';
header("Content-Type:application/json");


if (isset($_GET['function']) && $_GET['function']!="") {

    if($_GET['function'] == 'createLicense'){
        $id = trim($_GET['id']);
        $licenseid = trim($_GET['licenseid']);
        $companyid = trim($_GET['companyid']);
        $owner = trim($_GET['owner']);
        $startdate = trim($_GET['startdate']);
        $enddate = trim($_GET['enddate']);
        $status = trim($_GET['status']);

        // taskid, catid, projectid, ownerid, title, url, version, status
        $query = "INSERT INTO tbl_license (id, licenseid, companyid, `owner`, startdate, enddate, `status`) VALUES ('$id', '$licenseid', '$companyid', '$owner', '$startdate', '$enddate', '$status');";
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

    if($_GET['function'] == 'updateLicenseCompanyId'){
        $id = $_GET['id'];
        $companyid = $_GET['companyid'];

        $query = "UPDATE tbl_license SET companyid = '$companyid' WHERE id = '$id'; ";
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

    // WHERE `status` <> 'archived'
    if($_GET['function'] == 'fetchLicense'){
        // docid, catid, comid, ownerid, title, url, version, status
        $query = "SELECT * FROM tbl_license; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['licenseid'] = $row['licenseid'];
                $response[$x]['companyid'] = $row['companyid'];
                $response[$x]['startdate'] = $row['startdate'];
                $response[$x]['enddate'] = $row['enddate'];
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


    if($_GET['function'] == 'deleteLicense'){
        $id = $_GET['id'];

        $query = "UPDATE tbl_license SET status = 'archived' WHERE id = '$id'; ";
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