<?php
include '../controller/dbconn.php';
include '../controller/defaults.php';
header("Content-Type:application/json");


if (isset($_GET['function']) && $_GET['function']!="") {

    if($_GET['function'] == 'createBill'){
        $id = $_GET['id'];
        $billid = $_GET['billid'];
        $owner = $_GET['owner'];
        $licenseid = $_GET['licenseid'];
        $billdate = $_GET['billdate'];
        $expirydate = $_GET['expirydate'];
        $subtotal = $_GET['subtotal'];
        $status = $_GET['status'];
        
        $query = "INSERT INTO `web_billhistory` ( `id`, `billid`, `owner`, `licenseid`, `billdate`, `expirydate`, `subtotal`, `status`) 
        VALUES ( '$id', '$billid', '$owner', '$licenseid', '$billdate', '$expirydate', '$subtotal', '$status' ); ";

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

    if($_GET['function'] == 'fetchBillByOwner'){
        $owner = $_GET['owner'];

        $query = "SELECT * FROM web_billhistory WHERE `owner` = '$owner' ORDER BY `billdate` ASC; ";

        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            // session_start();
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['billid'] = $row['billid'];
                $response[$x]['owner'] = $row['owner'];
                $response[$x]['licenseid'] = $row['licenseid'];
                $response[$x]['billdate'] = $row['billdate'];
                $response[$x]['expirydate'] = $row['expirydate'];
                $response[$x]['subtotal'] = $row['subtotal'];
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

    if($_GET['function'] == 'fetchLicense'){
        $owner = trim($_GET['owner']);

        // taskid, catid, projectid, ownerid, title, url, version, status
        $query = "SELECT * FROM tbl_license WHERE `owner` = '$owner' ORDER BY `startdate` ASC;";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            // session_start();
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['licenseid'] = $row['licenseid'];
                $response[$x]['companyid'] = $row['companyid'];
                $response[$x]['owner'] = $row['owner'];
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
            // response(NULL, NULL, 200,"No Record Found");
        }
    }

    if($_GET['function'] == 'updateLicenseCompanyid'){
        $id = trim($_GET['id']);
        $companyid = trim($_GET['companyid']);
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


    
    
}

?>