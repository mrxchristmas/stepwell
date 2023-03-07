<?php
include '../controllers/dbconn.php';
header("Content-Type:application/json");



if (isset($_GET['function']) && $_GET['function']!="") {

    
    
    if($_GET['function'] == 'createsupplier'){
        $supplierid = trim($_GET['supplierid']);
        $companyid = trim($_GET['companyid']);
        $projectid = trim($_GET['projectid']);
        $name = trim($_GET['name']);
        // supplierid, catid, companyid, ownerid, title, url, version, status
        $query = "CALL createSupplier('$supplierid', '$companyid', '$projectid', '$name');";
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
    if($_GET['function'] == 'deletesupplier'){
        $supplierid = trim($_GET['supplierid']);
        // supplierid, catid, projectid, ownerid, title, url, version, status
        $query = "CALL deleteSupplier('$supplierid');";
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
    if($_GET['function'] == 'fetchsupplierbycompanyid'){
        $companyid = $_GET['companyid'];
        // docid, catid, comid, ownerid, title, url, version, status
        $query = "CALL fetchSupplierByCompanyId('$companyid');";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['supplierid'] = $row['supplierid'];
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
    if($_GET['function'] == 'fetchsupplierbyprojectresource'){
        $projectid = $_GET['projectid'];
        $query = "CALL fetchSupplierByProjectResource('$projectid');";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['suppliername'] = $row['suppliername'];
                $response[$x]['supplierid'] = $row['supplierid'];
                $response[$x]['type'] = $row['type'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchsupplierbycompanyid'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'createsupplierrate'){
        $id = trim($_GET['id']);
        $supplierid = trim($_GET['supplierid']);
        $projectid = trim($_GET['projectid']);
        $type = trim($_GET['type']);
        $rate = trim($_GET['rate']);
        // supplierid, catid, companyid, ownerid, title, url, version, status
        $query = "CALL createSupplierRate('$id', '$supplierid', '$projectid', '$type', '$rate');";
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
    if($_GET['function'] == 'fetchsupplierratebyprojectid'){
        $projectid = $_GET['projectid'];
        $query = "CALL fetchSupplierRateByProjectid('$projectid');";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['supplierid'] = $row['supplierid'];
                $response[$x]['type'] = $row['type'];
                $response[$x]['rate'] = $row['rate'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchsupplierbycompanyid'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }

    if($_GET['function'] == 'createtmpsupplier'){
        $id = $_GET['id'];
        $projectid = $_GET['projectid'];
        $name = $_GET['name'];

        $query = "INSERT INTO tbl_supplier_tmp (id, projectid, `name`) VALUES ('$id', '$projectid', '$name'); ";
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
    if($_GET['function'] == 'fetchtmpsupplierbyprojectid'){
        $projectid = $_GET['projectid'];
        $query = "SELECT * FROM tbl_supplier_tmp WHERE projectid = '$projectid'; ";
    
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['name'] = $row['name'];
                $response[$x]['mapsupid'] = $row['mapsupid'];
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
    
    
}

?>