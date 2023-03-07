<?php
include '../controllers/dbconn.php';
header("Content-Type:application/json");



if (isset($_GET['function']) && $_GET['function']!="") {

    if($_GET['function'] == 'createdocument'){
        $docid = trim($_GET['docid']);
        $comid = trim($_GET['comid']);
        $docsuff = trim($_GET['docsuff']);
        $cat1 = trim($_GET['cat1']);
        $cat2 = trim($_GET['cat2']);
        $cat3 = trim($_GET['cat3']);
        $cat4 = trim($_GET['cat4']);
        $ownerid = trim($_GET['ownerid']);
        $title = trim($_GET['title']);
        $url = trim($_GET['url']);
        $version = trim($_GET['version']);
        $status = trim($_GET['status']);
        $reference = trim($_GET['reference']);
        $projectid = trim($_GET['projectid']);
        // docid, catid, comid, ownerid, title, url, version, status
        $query = "CALL createDocument('$docid', '$comid', '$docsuff', '$cat1', '$cat2', '$cat3', '$cat4', '$ownerid', '$title', '$url', '$version', '$status', '$reference', '$projectid')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'getdocumentcountbycategory'){
        $cat1 = $_GET['cat1'];
        $cat2 = $_GET['cat2'];
        $cat3 = $_GET['cat3'];
        $cat4 = $_GET['cat4'];
        // docid, catid, comid, ownerid, title, url, version, status
        $query = "CALL getDocumentCountByCategory($cat1, $cat2, $cat3, $cat4)";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['found'] = $row['found'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['getDocumentCountByCategory'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'deletedocument'){
        $docid = $_GET['docid'];
        // docid, catid, comid, ownerid, title, url, version, status
        $query = "CALL deleteDocument('$docid')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchdocumentquery'){
        $query = $_GET['query'];
        $comid = $_GET['comid'];

        $query = "SELECT * FROM  tbl_document WHERE comid = '$comid' AND $query";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['docid'] = $row['docid'];
                $response[$x]['comid'] = $row['comid'];
                $response[$x]['docsuff'] = $row['docsuff'];
                $response[$x]['cat1'] = $row['cat1'];
                $response[$x]['cat2'] = $row['cat2'];
                $response[$x]['cat3'] = $row['cat3'];
                $response[$x]['cat4'] = $row['cat4'];
                $response[$x]['ownerid'] = $row['ownerid'];
                $response[$x]['title'] = $row['title'];
                $response[$x]['url'] = $row['url'];
                $response[$x]['version'] = $row['version'];
                $response[$x]['status'] = $row['status'];
                $response[$x]['reference'] = $row['reference'];
                $response[$x]['draftstamp'] = $row['draftstamp'];
                $response[$x]['proofreadstamp'] = $row['proofreadstamp'];
                $response[$x]['reviewstamp'] = $row['reviewstamp'];
                $response[$x]['approvestamp'] = $row['approvestamp'];
                $response[$x]['postapprovestamp'] = $row['postapprovestamp'];
                $response[$x]['mapid'] = $row['mapid'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchdocumentquery'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'updatedocumentstatus'){
        $docid = $_GET['docid'];
        $status = $_GET['status'];
        // docid, catid, comid, ownerid, title, url, version, status
        $query = "CALL updateDocumentStatus('$docid', '$status')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchavailabledocumentmap'){
        $comid = $_GET['comid'];

        $query = "CALL fetchAvailableDocumentMap('$comid');";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['docid'] = $row['docid'];
                $response[$x]['docsuff'] = $row['docsuff'];
                $response[$x]['cat1'] = $row['cat1'];
                $response[$x]['cat2'] = $row['cat2'];
                $response[$x]['cat3'] = $row['cat3'];
                $response[$x]['cat4'] = $row['cat4'];
                $response[$x]['ownerid'] = $row['ownerid'];
                $response[$x]['title'] = $row['title'];
                $response[$x]['url'] = $row['url'];
                $response[$x]['version'] = $row['version'];
                $response[$x]['status'] = $row['status'];
                $response[$x]['reference'] = $row['reference'];
                $response[$x]['draftstamp'] = $row['draftstamp'];
                $response[$x]['proofreadstamp'] = $row['proofreadstamp'];
                $response[$x]['reviewstamp'] = $row['reviewstamp'];
                $response[$x]['approvestamp'] = $row['approvestamp'];
                $response[$x]['postapprovestamp'] = $row['postapprovestamp'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchavailabledocumentmap'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'getdocumentstatus'){
        $docid = $_GET['docid'];

        $query = "CALL getDocumentStatus('$docid');";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['docid'] = $row['docid'];
                $response[$x]['docsuff'] = $row['docsuff'];
                $response[$x]['cat1'] = $row['cat1'];
                $response[$x]['cat2'] = $row['cat2'];
                $response[$x]['cat3'] = $row['cat3'];
                $response[$x]['cat4'] = $row['cat4'];
                $response[$x]['ownerid'] = $row['ownerid'];
                $response[$x]['title'] = $row['title'];
                $response[$x]['url'] = $row['url'];
                $response[$x]['version'] = $row['version'];
                $response[$x]['status'] = $row['status'];
                $response[$x]['reference'] = $row['reference'];
                $response[$x]['draftstamp'] = $row['draftstamp'];
                $response[$x]['proofreadstamp'] = $row['proofreadstamp'];
                $response[$x]['reviewstamp'] = $row['reviewstamp'];
                $response[$x]['approvestamp'] = $row['approvestamp'];
                $response[$x]['postapprovestamp'] = $row['postapprovestamp'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['getdocumentstatus'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'createdocumenthistory'){
        // id, docid, accid, version, status, url, notes, reason
        $role = trim($_GET['role']);
        $docid = trim($_GET['docid']);
        $accid = trim($_GET['accid']);
        $version = trim($_GET['version']);
        $status = trim($_GET['status']);
        $url = trim($_GET['url']);
        $notes = trim($_GET['notes']);
        $reason = trim($_GET['reason']);

        // $response['test'] =  $id. $docid. $accid. $version. $status. $url. $notes. $reason;
        // $json_response = json_encode($response);
        // echo $json_response;
        // id, docid, accid, version, ownerid, title, url, version, status
        // $query = "CALL createDocumentHistory('$id', '$docid', '$accid', '$version', '$status', '$url', '$notes', '$reason')";
        $query = "update tbl_document_history set version = '$version', status = '$status', url = '$url',notes = '$notes', reason = '$reason' where  docid = '$docid' and accid = '$accid' and role = '$role'; ";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'updatedocumenthistorystatus'){
        // docid, accid, version, status, reason, date
        $docid = $_GET['docid'];
        $accid = $_GET['accid'];
        $version = $_GET['version'];
        $status = $_GET['status'];
        $role = $_GET['role'];
        $reason = $_GET['reason'];
        $date = $_GET['date'];
        // docid, catid, comid, ownerid, title, url, version, status
        $query = "CALL updateDocumentHistoryStatus('$docid', '$accid', '$version', '$status', '$reason', '$date', '$role')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'checkifdocumenthistoryexists'){
        // docid, accid, version, status, reason, date
        $docid = $_GET['docid'];
        $accid = $_GET['accid'];
        $role = $_GET['role'];
        // docid, catid, comid, ownerid, title, url, version, status
        $query = "CALL checkIfDocumentHistoryExists('$docid', '$accid', '$role');";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            while($row = $rs->fetch_assoc()) {
                if($row['url'] == 'na'){
                    $response['found'] = 'false';
                    $json_response = json_encode($response);
                    echo $json_response;
                    mysqli_close($link);
                }else{
                    $response['found'] = $row['url'];
                    $json_response = json_encode($response);
                    echo $json_response;
                    mysqli_close($link);
                }
            }
        }else{
            $response['found'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'updatedocumenthistory'){
        // docid, accid, version, status, reason, date
        $docid = $_GET['docid'];
        $accid = $_GET['accid'];
        $version = $_GET['version'];
        $url = trim($_GET['url']);
        $notes = trim($_GET['notes']);
        $role = trim($_GET['role']);
        // docid, catid, comid, ownerid, title, url, version, status
        $query = "CALL updateDocumentHistory('$docid', '$accid', '$version', '$url', '$notes', '$role' )";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchdocumenthistorystatus'){
        $docid = $_GET['docid'];
        $accid = $_GET['accid'];
        $role = $_GET['role'];

        $query = "CALL fetchDocumentHistoryStatus('$docid', '$accid', '$role')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            while($row = $rs->fetch_assoc()) {
                $response['status'] =  $row['status'];
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchdocumenthistorystatus'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'fetchdocumenthistory'){
        $docid = $_GET['docid'];

        $query = "CALL fetchDocumentHistory('$docid')";
        // CALL fetchDocumentHistory('D-654113628', '0.1');
        
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                // id, notes, url, `status`, reason, date
                $response[$x]['id'] =  $row['id'];
                $response[$x]['accid'] =  $row['accid'];
                $response[$x]['role'] =  $row['role'];
                $response[$x]['notes'] =  $row['notes'];
                $response[$x]['url'] =  $row['url'];
                $response[$x]['status'] =  $row['status'];
                $response[$x]['reason'] =  $row['reason'];
                $response[$x]['date'] =  $row['date'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchdocumenthistory'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'fetchdocumenthistorybyaccid'){
        $accid = $_GET['accid'];

        $query = "CALL fetchDocumentHistoryByAccid('$accid')";
        // CALL fetchDocumentHistory('D-654113628', '0.1');
        
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                // id, notes, url, `status`, reason, date
                $response[$x]['docid'] =  $row['docid'];
                $response[$x]['role'] =  $row['role'];
                $response[$x]['docstatus'] =  $row['docstatus'];
                $response[$x]['version'] =  $row['version'];
                $response[$x]['status'] =  $row['status'];
                $response[$x]['url'] =  $row['url'];
                $response[$x]['notes'] =  $row['notes'];
                $response[$x]['reason'] =  $row['reason'];
                $response[$x]['date'] =  $row['date'];

                $response[$x]['docsuff'] =  $row['docsuff'];
                $response[$x]['cat1'] =  $row['cat1'];
                $response[$x]['cat2'] =  $row['cat2'];
                $response[$x]['cat3'] =  $row['cat3'];
                $response[$x]['cat4'] =  $row['cat4'];
                $response[$x]['ownerid'] =  $row['ownerid'];
                $response[$x]['title'] =  $row['title'];
                $response[$x]['docurl'] =  $row['docurl'];
                $response[$x]['docversion'] =  $row['docversion'];
                $response[$x]['maindocstatus'] =  $row['maindocstatus'];
                $response[$x]['reference'] =  $row['reference'];
                $response[$x]['draftstamp'] =  $row['draftstamp'];
                $response[$x]['proofreadstamp'] =  $row['proofreadstamp'];
                $response[$x]['reviewstamp'] =  $row['reviewstamp'];
                $response[$x]['approvestamp'] =  $row['approvestamp'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchdocumenthistorybyaccid'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'fetchdocumenthistorybyownerid'){
        $ownerid = $_GET['ownerid'];

        $query = "CALL fetchDocumentHistoryByOwnerId('$ownerid')";
        // CALL fetchDocumentHistory('D-654113628', '0.1');
        
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                // id, notes, url, `status`, reason, date
                $response[$x]['id'] =  $row['id'];
                $response[$x]['docid'] =  $row['docid'];
                $response[$x]['accid'] =  $row['accid'];
                $response[$x]['role'] =  $row['role'];
                $response[$x]['docstatus'] =  $row['docstatus'];
                $response[$x]['version'] =  $row['version'];
                $response[$x]['status'] =  $row['status'];
                $response[$x]['url'] =  $row['url'];
                $response[$x]['notes'] =  $row['notes'];
                $response[$x]['reason'] =  $row['reason'];
                $response[$x]['date'] =  $row['date'];

                $response[$x]['docsuff'] =  $row['docsuff'];
                $response[$x]['cat1'] =  $row['cat1'];
                $response[$x]['cat2'] =  $row['cat2'];
                $response[$x]['cat3'] =  $row['cat3'];
                $response[$x]['cat4'] =  $row['cat4'];
                $response[$x]['ownerid'] =  $row['ownerid'];
                $response[$x]['title'] =  $row['title'];
                $response[$x]['docurl'] =  $row['docurl'];
                $response[$x]['docversion'] =  $row['docversion'];
                $response[$x]['maindocstatus'] =  $row['maindocstatus'];
                $response[$x]['reference'] =  $row['reference'];
                $response[$x]['draftstamp'] =  $row['draftstamp'];
                $response[$x]['proofreadstamp'] =  $row['proofreadstamp'];
                $response[$x]['reviewstamp'] =  $row['reviewstamp'];
                $response[$x]['approvestamp'] =  $row['approvestamp'];
                $response[$x]['execution'] =  $row['execution'];
                $response[$x]['projectid'] =  $row['projectid'];
                $response[$x]['comid'] =  $row['comid'];
                $response[$x]['effective'] =  $row['effective'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchdocumenthistorybyaccid'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'updatedocumentcategory'){
        // docid, accid, version, status, reason, date
        $docid = $_GET['docid'];
        $cat1 = $_GET['cat1'];
        $cat2 = $_GET['cat2'];
        $cat3 = $_GET['cat3'];
        $cat4 = $_GET['cat4'];
        // docid, catid, comid, ownerid, title, url, version, status
        $query = "CALL updateDocumentCategory('$docid', '$cat1', '$cat2', '$cat3', '$cat4')";
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'updatedocumentcolumn'){
        // docid, accid, version, status, reason, date
        $docid = $_GET['docid'];
        $columnname = $_GET['columnname'];
        $value = $_GET['value'];
        // docid, catid, comid, ownerid, title, url, version, status
        $query = "CALL updateDocumentColumn('$docid', '$columnname', '$value')";
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'deletedocumentmapping'){
        // docid, accid, version, status, reason, date
        $planid = $_GET['planid'];
        $query = "CALL deleteDocumentMapping('$planid')";
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchdocumentmappingbyaccountid'){
        $accid = $_GET['accid'];

        $query = "CALL fetchDocumentMappingByAccountId('$accid')";
        // CALL fetchDocumentHistory('D-654113628', '0.1');
        
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                // id, notes, url, `status`, reason, date
                $response[$x]['planid'] =  $row['planid'];
                $response[$x]['title'] =  $row['title'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchdocumentmappingbyaccountid'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'updatedocumentmapping'){
        // docid, accid, version, status, reason, date
        $planid = $_GET['planid'];
        $docid = $_GET['docid'];
        $query = "CALL updateDocumentMapping('$docid', '$planid')";
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchdocumentbyprojectId'){
        $projectid = $_GET['projectid'];
        $ownerid = $_GET['ownerid'];

        $query = "CALL fetchDocumentByProjectId('$projectid', '$ownerid')";
        // CALL fetchDocumentHistory('D-654113628', '0.1');
        
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                // id, notes, url, `status`, reason, date
                $response[$x]['docid'] =  $row['docid'];
                $response[$x]['title'] =  $row['title'];
                $response[$x]['url'] =  $row['url'];
                $response[$x]['version'] =  $row['version'];
                $response[$x]['projectid'] =  $row['projectid'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchdocumentbyprojectId'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'createdocumentbank'){
        $docid = $_GET['docid'];
        $comid = $_GET['comid'];
        $projectid = $_GET['projectid'];
        $ownerid = $_GET['ownerid'];
        $cat1 = $_GET['cat1'];
        $cat2 = $_GET['cat2'];
        $cat3 = $_GET['cat3'];
        $cat4 = $_GET['cat4'];
        $title = $_GET['title'];
        $url = $_GET['url'];
        $version = $_GET['version'];
        $reference = $_GET['reference'];


        $query = "CALL createDocumentBank('$docid', '$comid', '$projectid', '$ownerid', '$cat1', '$cat2', '$cat3', '$cat4', '$title', '$url', '$version', '$reference')";
        if(mysqli_query($link , $query)){
            $response['createdocumentbank'] = 'true';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['createdocumentbank'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'getdocumentbankcategorycount'){
        $cat1 = $_GET['cat1'];
        $cat2 = $_GET['cat2'];
        $cat3 = $_GET['cat3'];
        $cat4 = $_GET['cat4'];

        $query = "CALL getDocumentBankCategoryCount('$cat1', '$cat2', '$cat3', '$cat4')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            while($row = $rs->fetch_assoc()) {
                $response['found'] =  $row['found'];
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['getdocumentbankcategorycount'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'updatedocidtoeffectiveid'){
        // docid, accid, version, status, reason, date
        $newid = $_GET['newid'];
        $oldid = $_GET['oldid'];
        $version = $_GET['version'];
        $query = "CALL updateDocidToEffectiveId('$oldid', '$newid', '$version')";
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
    if($_GET['function'] == 'updatedocumentsendtoexecution'){
        // docid, accid, version, status, reason, date
        $docid = $_GET['docid'];
        $version = $_GET['version'];
        $query = "CALL updateDocumentSendToExecution('$docid', '$version')";
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





    if($_GET['function'] == 'createplanningdocument'){
        // docid, accid, version, status, reason, date
        $docid = $_GET['docid'];
        $projectid = $_GET['projectid'];
        $title = $_GET['title'];
        $approvaled = $_GET['approvaled'];
        $draftsd = $_GET['draftsd'];
        $drafted = $_GET['drafted'];
        $reviewed = $_GET['reviewed'];
        $executioned = $_GET['executioned'];
        $postapprovaled = $_GET['postapprovaled'];
        
        $query = "INSERT INTO tbl_planning_document (docid, projectid, title, approvaled, draftsd, drafted, reviewed, executioned, postapprovaled, mapid, linkid, producessorid, milestone)
        VALUES ('$docid', '$projectid', '$title', '$approvaled', '$draftsd', '$drafted', '$reviewed', '$executioned', '$postapprovaled', DEFAULT, DEFAULT, DEFAULT, DEFAULT);
        ";
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
    if($_GET['function'] == 'updateplanningdocumentdates'){
        $docid = $_GET['docid'];
        $approvaled = $_GET['approvaled'];
        $draftsd = $_GET['draftsd'];
        $drafted = $_GET['drafted'];
        $reviewed = $_GET['reviewed'];
        $executioned = $_GET['executioned'];
        $postapprovaled = $_GET['postapprovaled'];
        
        $query = "UPDATE tbl_planning_document SET approvaled = '$approvaled', draftsd = '$draftsd', drafted = '$drafted', reviewed = '$reviewed', executioned = '$executioned', postapprovaled = '$postapprovaled' WHERE docid = '$docid'; ";
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
    if($_GET['function'] == 'updateplanningdocumentmapid'){
        // docid, accid, version, status, reason, date
        $docid = $_GET['docid'];
        $mapid = $_GET['mapid'];
        
        $query = " UPDATE tbl_planning_document SET mapid = '$mapid' WHERE docid = '$docid'; ";
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
    if($_GET['function'] == 'updateplanningdocumentmilestone'){
        // docid, accid, version, status, reason, date
        $docid = $_GET['docid'];
        $milestone = $_GET['milestone'];
        
        $query = " UPDATE tbl_planning_document SET milestone = '$milestone' WHERE docid = '$docid'; ";
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
    if($_GET['function'] == 'deleteplanningdocument'){
        $docid = $_GET['docid'];
        
        
        $query = "CALL deletePlanningDocument('$docid'); ";
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
    if($_GET['function'] == 'fetchplanningdocumentbyprojectid'){
        $projectid = $_GET['projectid'];
        
        $query = " SELECT * FROM tbl_planning_document WHERE projectid = '$projectid'; ";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['docid'] =  $row['docid'];
                $response[$x]['projectid'] =  $row['projectid'];
                $response[$x]['title'] =  $row['title'];
                $response[$x]['approvaled'] =  $row['approvaled'];
                $response[$x]['draftsd'] =  $row['draftsd'];
                $response[$x]['drafted'] =  $row['drafted'];
                $response[$x]['reviewed'] =  $row['reviewed'];
                $response[$x]['executioned'] =  $row['executioned'];
                $response[$x]['postapprovaled'] =  $row['postapprovaled'];
                $response[$x]['mapid'] =  $row['mapid'];
                $response[$x]['linkid'] =  $row['linkid'];
                $response[$x]['producessorid'] =  $row['producessorid'];
                $response[$x]['milestone'] =  $row['milestone'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchdocumentbyprojectId'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }


    
    if($_GET['function'] == 'fetchplanningdocuments'){
        $projectid = $_GET['projectid'];
    
        $query = "CALL fetchPlanningDocuments('$projectid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            
            while($row = $rs->fetch_assoc()) {
                $response[$x]['planningid'] = $row['planningid'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['planningtitle'] = $row['planningtitle'];
                $response[$x]['draftsd'] = $row['draftsd'];
                $response[$x]['drafted'] = $row['drafted'];
                $response[$x]['reviewed'] = $row['reviewed'];
                $response[$x]['approvaled'] = $row['approvaled'];
                $response[$x]['executioned'] = $row['executioned'];
                $response[$x]['postapprovaled'] = $row['postapprovaled'];
                $response[$x]['mapid'] = $row['mapid'];
                $response[$x]['milestone'] = $row['milestone'];
                $response[$x]['linkid'] = $row['linkid'];
                $response[$x]['linkstage'] = $row['linkstage'];
                $response[$x]['producessorid'] = $row['producessorid'];
                $response[$x]['producessorstage'] = $row['producessorstage'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchPlanningDocuments'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'createplanningdocumentupdated'){
        $projectid = $_GET['projectid'];
        $docid = $_GET['docid'];
        $title = $_GET['title'];
        $draftsd = $_GET['draftsd'];
        $drafted = $_GET['drafted'];
        $reviewed = $_GET['reviewed'];
        $approved = $_GET['approved'];
        $executioned = $_GET['executioned'];
        $postapproved = $_GET['postapproved'];
        $milestone = $_GET['milestone'];
        $linkid = $_GET['linkid'];
        $linkstage = $_GET['linkstage'];
        $predecessorid = $_GET['predecessorid'];
        $predecessorstage = $_GET['predecessorstage'];
    
        $query = "CALL createPlanningDocumentUpdated('$projectid', '$docid', '$title', '$draftsd', '$drafted', '$reviewed', '$approved', '$executioned', '$postapproved', '$milestone', '$linkid', '$linkstage', '$predecessorid', '$predecessorstage')";
        
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }

    

    if($_GET['function'] == 'fetchactualdocuments'){
        $projectid = $_GET['projectid'];
        
        $query = "CALL fetchActualDocuments('$projectid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;

            while($row = $rs->fetch_assoc()) {
                
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['docid'] = $row['docid'];
                $response[$x]['comid'] = $row['comid'];
                $response[$x]['docsuff'] = $row['docsuff'];
                $response[$x]['cat1'] = $row['cat1'];
                $response[$x]['cat2'] = $row['cat2'];
                $response[$x]['cat3'] = $row['cat3'];
                $response[$x]['cat4'] = $row['cat4'];
                $response[$x]['ownerid'] = $row['ownerid'];
                $response[$x]['title'] = $row['title'];
                $response[$x]['url'] = $row['url'];
                $response[$x]['version'] = $row['version'];
                $response[$x]['status'] = $row['status'];
                $response[$x]['reference'] = $row['reference'];
                $response[$x]['draftstamp'] = $row['draftstamp'];
                $response[$x]['proofreadstamp'] = $row['proofreadstamp'];
                $response[$x]['reviewstamp'] = $row['reviewstamp'];
                $response[$x]['approvestamp'] = $row['approvestamp'];
                $response[$x]['postapprovestamp'] = $row['postapprovestamp'];
                $response[$x]['mapid'] = $row['mapid'];
                $response[$x]['execution'] = $row['execution'];
                $response[$x]['effective'] = $row['effective'];
                $response[$x]['draftsd'] = $row['draftsd'];
                $response[$x]['drafted'] = $row['drafted'];
                $response[$x]['reviewed'] = $row['reviewed'];
                $response[$x]['approvaled'] = $row['approvaled'];
                $response[$x]['executioned'] = $row['executioned'];
                $response[$x]['postapprovaled'] = $row['postapprovaled'];
                $response[$x]['milestone'] = $row['milestone'];
                $response[$x]['linkid'] = $row['linkid'];
                $response[$x]['linkstage'] = $row['linkstage'];
                $response[$x]['producessorid'] = $row['producessorid'];
                $response[$x]['predecessorstage'] = $row['predecessorstage'];

                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchActualDocuments'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }



    if($_GET['function'] == 'maptmpaccounts'){
      
        $tmpid = $_GET['tmpid'];
        $accid = $_GET['accid'];
        $roleid = $_GET['roleid'];
        $projectid = $_GET['projectid'];
        $rateid = $_GET['rateid'];
        $name = $_GET['name'];

        $query = "CALL mapTmpAccounts('$tmpid','$accid','$rateid','$projectid','$roleid','$name')";
        
        
        
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'maptmpsuppliers'){
      
        $tmpid = $_GET['tmpid'];
        $supid = $_GET['supid'];
        $rateid = $_GET['rateid'];
        $name = $_GET['name'];
        $rate = $_GET['rate'];
        $type = $_GET['type'];
        $projectid = $_GET['projectid'];

        $query = "CALL mapTmpSupplier('$tmpid','$supid','$rateid','$name','$rate','$type','$projectid')";
        
        
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