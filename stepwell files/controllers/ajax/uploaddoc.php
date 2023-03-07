<?php
include '../dbconn.php';
header("Content-Type:application/json");

    function saveSingleImage($name, $size){
        $userfile_name = $name;
        $userfile_size = $size;
        $target_dir = "../../lib/images/userimages/";
        $imgurl_dir = "lib/images/userimages/";
        $location = $target_dir.$userfile_name;
        $userfile_type = pathinfo($location,PATHINFO_EXTENSION);
        $imgurl = "";
        $uploadOk = 1;

        // allow filesize up to 5mb
        if ($userfile_size > 5000000) {
            echo("error_filesize");
            $uploadOk = 0;
        }

        // Allow certain file formats
        $valid_extensions = array("jpg","jpeg","png","webp");
        if( !in_array(strtolower($userfile_type),$valid_extensions) ) {
            echo("error_filetype");
            $uploadOk = 0;
        }
        if($uploadOk == 1){
            $temp = explode(".", $userfile_name);
            $newfilename = round(microtime(true)) . '.' . end($temp);
            
            $finalfileupload = $target_dir . $newfilename;
            $imgurl = $imgurl_dir . $newfilename;
            do { $newfilename = round(microtime(true)) . '.' . end($temp);
            } while (file_exists($finalfileupload));
            if(move_uploaded_file($_FILES['image']['tmp_name'], $finalfileupload)){
                echo($imgurl);
            }
        }
    }
    function deleteSingleImage($filename){
        if (file_exists($filename)) {
            // echo "The file $filename exists";
            unlink($filename);
            echo('true');
        } else {
            echo "The file $filename does not exist";
        }
    }
    function saveSingleDocument($name, $size){
        $userfile_name = $name;
        $userfile_size = $size;
        $target_dir = "../../lib/documents/projectinfo/";
        $imgurl_dir = "lib/documents/projectinfo/";
        $location = $target_dir.$userfile_name;
        $userfile_type = pathinfo($location,PATHINFO_EXTENSION);
        $imgurl = "";
        $uploadOk = 1;

        // allow filesize up to 5mb
        if ($userfile_size > 5000000) {
            echo("error_filesize");
            $uploadOk = 0;
        }

        // Allow certain file formats
        $valid_extensions = array("jpg","jpeg","png","webp",'pdf','xlsx','docx');
        if( !in_array(strtolower($userfile_type),$valid_extensions) ) {
            echo("error_filetype");
            $uploadOk = 0;
        }
        if($uploadOk == 1){
            $temp = explode(".", $userfile_name);
            $newfilename = round(microtime(true)) . '.' . end($temp);
            
            $finalfileupload = $target_dir . $newfilename;
            $imgurl = $imgurl_dir . $newfilename;

            do { $newfilename = round(microtime(true)) . '.' . end($temp);
            }while (file_exists($finalfileupload));

            if(move_uploaded_file($_FILES['doc']['tmp_name'], $finalfileupload)){
                echo('OK++'.$imgurl);
            }
        }
    }
    function deleteSingleDocument($filename){
        if (file_exists($filename)) {
            // echo "The file $filename exists";
                // $a = '../../lib/documents/directors/D-87727477/1597976950.docx';
            if(unlink($filename)){
                echo('true');
            }else{
                echo('false');
            }
        } else {
            echo "error";
        }
    }
    function docbuilder_UploadDoc($name, $size, $companyid, $userid){
        $userfile_name = $name;
        $userfile_size = $size;
        $initial_target_dir = "../../lib/documents/";
        $target_dir = $initial_target_dir . $companyid . '/' . $userid . '/';
        $doc_dir = "lib/documents/" . $companyid . '/' . $userid . '/';
        
        if (!file_exists($target_dir)) {
            if(mkdir($target_dir, 0777, true)){
                // echo "The directory $target_dir was successfully created.";

            }else{
                echo "error_mkdir";
            }
        }
        
        $location = $target_dir.$userfile_name;
        $userfile_type = pathinfo($location,PATHINFO_EXTENSION);
        $docurl = "";
        $uploadOk = 1;
        


        // allow filesize up to 5mb
        if ($userfile_size > 5000000) {
            echo("error_filesize");
            $uploadOk = 0;
        }

        // Allow certain file formats
        $valid_extensions = array("jpg","jpeg","png","webp",'pdf','xlsx','docx');
        if( !in_array(strtolower($userfile_type),$valid_extensions) ) {
            echo("error_filetype");
            $uploadOk = 0;
        }

        if($uploadOk == 1){
            $temp = explode(".", $userfile_name);
            $newfilename = round(microtime(true)) . '.' . end($temp);
            
            $finalfileupload = $target_dir . $newfilename;
            $docurl = $doc_dir . $newfilename;

            do { $newfilename = round(microtime(true)) . '.' . end($temp);
            }while (file_exists($finalfileupload));

            if(move_uploaded_file($_FILES['doc']['tmp_name'], $finalfileupload)){
                echo('OK++'.$docurl);
            }else{
                echo('error_upload');
            }
        }
    }
    function docflow_UploadDoc($name, $size, $userid){
        $userfile_name = $name;
        $userfile_size = $size;
        $initial_target_dir = "../../lib/documents/directors/";
        $target_dir = $initial_target_dir . $userid . '/';
        $doc_dir = "lib/documents/directors/" . $userid . '/';
        
        if (!file_exists($target_dir)) {
            if(mkdir($target_dir, 0777, true)){
                // echo "The directory $target_dir was successfully created.";

            }else{
                echo "error_mkdir";
            }
        }
        
        $location = $target_dir.$userfile_name;
        $userfile_type = pathinfo($location,PATHINFO_EXTENSION);
        $docurl = "";
        $uploadOk = 1;

        // allow filesize up to 5mb
        if ($userfile_size > 5000000) {
            echo("error_filesize");
            $uploadOk = 0;
        }

        // Allow certain file formats
        $valid_extensions = array("jpg","jpeg","png","webp",'pdf','xlsx','docx');
        if( !in_array(strtolower($userfile_type),$valid_extensions) ) {
            echo("error_filetype");
            $uploadOk = 0;
        }

        if($uploadOk == 1){
            $temp = explode(".", $userfile_name);
            $newfilename = round(microtime(true)) . '.' . end($temp);
            
            $finalfileupload = $target_dir . $newfilename;
            $docurl = $doc_dir . $newfilename;

            do { $newfilename = round(microtime(true)) . '.' . end($temp);
            }while (file_exists($finalfileupload));

            // echo('OK++'.$docurl);

            if(move_uploaded_file($_FILES['doc']['tmp_name'], $finalfileupload)){
                echo('OK++'.$docurl);
            }else{
                echo('error_upload');
            }
        }
    }
    function uploadDocumentBank($url, $ownerid){

        $initial_target_dir = "../../lib/documents/bank/";
        $target_dir = $initial_target_dir . $ownerid . '/';
        $doc_dir = "lib/documents/bank/" . $ownerid . '/';

        if (!file_exists($target_dir)) {
            if(mkdir($target_dir, 0777, true)){
                // echo "The directory $target_dir was successfully created.";

            }else{
                $response['uploaddocumentbank'] = 'error_mkdir';
                $json_response = json_encode($response);
                echo $json_response;
            }
        }

        $temp = explode(".", $url);
        $newfilename = round(microtime(true)) . '.' . end($temp);
        
        $finalfileupload = $target_dir . $newfilename;
        $docurl = $doc_dir . $newfilename;

        do { 
            $newfilename = round(microtime(true)) . '.' . end($temp);
        }while (file_exists($finalfileupload));

        if(copy('../../' . $url, $finalfileupload)){
            // echo('OK++'.$docurl);
            $response['uploaddocumentbank'] = 'OK++'.$docurl;
            $json_response = json_encode($response);
            echo $json_response;
        }else{
            $response['uploaddocumentbank'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
        }

    }
    function uploadBudgetFile($name, $size, $budgetid){
        $userfile_name = $name;
        $userfile_size = $size;
        $initial_target_dir = "../../lib/documents/budgetupload/";
        $target_dir = $initial_target_dir . $budgetid . '/';
        $doc_dir = "lib/documents/budgetupload/" . $budgetid . '/';
        
        if (!file_exists($target_dir)) {
            if(mkdir($target_dir, 0777, true)){
                // echo "The directory $target_dir was successfully created.";

            }else{
                $response['response'] = 'error_mkdir';
                $json_response = json_encode($response);
                echo $json_response;
            }
        }
        
        $location = $target_dir.$userfile_name;
        $userfile_type = pathinfo($location,PATHINFO_EXTENSION);
        $docurl = "";
        $uploadOk = 1;

        // allow filesize up to 5mb
        if ($userfile_size > 5000000) {
            $response['response'] = 'error_filesize';
            $json_response = json_encode($response);
            echo $json_response;
            $uploadOk = 0;
        }

        // Allow certain file formats
        $valid_extensions = array("jpg","jpeg","png","webp",'pdf','xlsx','docx');
        if( !in_array(strtolower($userfile_type),$valid_extensions) ) {
            $response['response'] = 'error_filetype';
            $json_response = json_encode($response);
            echo $json_response;
            $uploadOk = 0;
        }

        if($uploadOk == 1){
            $temp = explode(".", $userfile_name);
            $newfilename = round(microtime(true)) . '.' . end($temp);
            
            $finalfileupload = $target_dir . $newfilename;
            $docurl = $doc_dir . $newfilename;

            do { $newfilename = round(microtime(true)) . '.' . end($temp);
            }while (file_exists($finalfileupload));

            // echo('OK++'.$docurl);

            if(move_uploaded_file($_FILES['doc']['tmp_name'], $finalfileupload)){
                $response['response'] = 'OK';
                $response['url'] = $docurl;
                $json_response = json_encode($response);
                echo $json_response;
            }else{
                $response['url'] = 'error_upload';
                $json_response = json_encode($response);
                echo $json_response;
            }
        }
    }
    function deleteSingleFile($filename){
        if (file_exists($filename)) {
            // echo "The file $filename exists";
                // $a = '../../lib/documents/directors/D-87727477/1597976950.docx';
            if(unlink($filename)){
                $response['response'] = 'success';
                $json_response = json_encode($response);
                echo $json_response;
            }else{
                $response['response'] = 'error_delete';
                $json_response = json_encode($response);
                echo $json_response;
            }
        } else {
            $response['response'] = 'error_file';
            $json_response = json_encode($response);
            echo $json_response;
        }
    }
    function uploadInvoiceFile($name, $size, $invoiceid){
        $userfile_name = $name;
        $userfile_size = $size;
        $initial_target_dir = "../../lib/documents/invoiceupload/";
        $target_dir = $initial_target_dir . $invoiceid . '/';
        $doc_dir = "lib/documents/invoiceupload/" . $invoiceid . '/';
        
        if (!file_exists($target_dir)) {
            if(mkdir($target_dir, 0777, true)){
                // echo "The directory $target_dir was successfully created.";

            }else{
                $response['response'] = 'error_mkdir';
                $json_response = json_encode($response);
                echo $json_response;
            }
        }
        
        $location = $target_dir.$userfile_name;
        $userfile_type = pathinfo($location,PATHINFO_EXTENSION);
        $docurl = "";
        $uploadOk = 1;

        // allow filesize up to 5mb
        if ($userfile_size > 5000000) {
            $response['response'] = 'error_filesize';
            $json_response = json_encode($response);
            echo $json_response;
            $uploadOk = 0;
        }

        // Allow certain file formats
        $valid_extensions = array("jpg","jpeg","png","webp",'pdf','xlsx','docx');
        if( !in_array(strtolower($userfile_type),$valid_extensions) ) {
            $response['response'] = 'error_filetype';
            $json_response = json_encode($response);
            echo $json_response;
            $uploadOk = 0;
        }

        if($uploadOk == 1){
            $temp = explode(".", $userfile_name);
            $newfilename = round(microtime(true)) . '.' . end($temp);
            
            $finalfileupload = $target_dir . $newfilename;
            $docurl = $doc_dir . $newfilename;

            do { $newfilename = round(microtime(true)) . '.' . end($temp);
            }while (file_exists($finalfileupload));

            // echo('OK++'.$docurl);

            if(move_uploaded_file($_FILES['doc']['tmp_name'], $finalfileupload)){
                $response['response'] = 'OK';
                $response['url'] = $docurl;
                $json_response = json_encode($response);
                echo $json_response;
            }else{
                $response['url'] = 'error_upload';
                $json_response = json_encode($response);
                echo $json_response;
            }
        }
    }
    function uploadProfile($name, $size){
        $userfile_name = $name;
        $userfile_size = $size;
        $target_dir = "../../lib/images/profiles/";
        $imgurl_dir = "lib/images/profiles/";
        $userfile_name = $name;
        $userfile_size = $size;

        $target_dir = "../../lib/images/profiles/";
        $doc_dir = "lib/images/profiles/";
        
        if (!file_exists($target_dir)) {
            if(mkdir($target_dir, 0777, true)){
                // echo "The directory $target_dir was successfully created.";

            }else{
                $response['response'] = 'error_mkdir';
                $json_response = json_encode($response);
                echo $json_response;
            }
        }
        
        $location = $target_dir.$userfile_name;
        $userfile_type = pathinfo($location,PATHINFO_EXTENSION);
        $docurl = "";
        $uploadOk = 1;

        // allow filesize up to 5mb
        if ($userfile_size > 5000000) {
            $response['response'] = 'error_filesize';
            $json_response = json_encode($response);
            echo $json_response;
            $uploadOk = 0;
        }

        // Allow certain file formats
        $valid_extensions = array("jpg","jpeg","png","webp",'pdf','xlsx','docx');
        if( !in_array(strtolower($userfile_type),$valid_extensions) ) {
            $response['response'] = 'error_filetype';
            $json_response = json_encode($response);
            echo $json_response;
            $uploadOk = 0;
        }

        if($uploadOk == 1){
            $temp = explode(".", $userfile_name);
            $newfilename = round(microtime(true)) . '.' . end($temp);
            
            $finalfileupload = $target_dir . $newfilename;
            $docurl = $doc_dir . $newfilename;

            do { $newfilename = round(microtime(true)) . '.' . end($temp);
            }while (file_exists($finalfileupload));

            // echo('OK++'.$docurl);

            if(move_uploaded_file($_FILES['doc']['tmp_name'], $finalfileupload)){
                $response['response'] = 'OK';
                $response['url'] = $docurl;
                $json_response = json_encode($response);
                echo $json_response;
            }else{
                $response['url'] = 'error_upload';
                $json_response = json_encode($response);
                echo $json_response;
            }
        }
    }



    if(isset($_POST["function"])) {

        if($_POST["function"] == "uploadocs"){
            $userfile_name = $_FILES['doc']['name'];
            $userfile_size = $_FILES['doc']['size'];
            saveSingleDocument($userfile_name, $userfile_size);
        }
        if($_POST["function"] == "uploadProfile"){
            $userfile_name = $_FILES['doc']['name'];
            $userfile_size = $_FILES['doc']['size'];
            uploadProfile($userfile_name, $userfile_size);
            // echo($userfile_name.$userfile_size);
        }
        
        if($_POST["function"] == "deletesingleimage"){
            $filename = $_POST["filename"];
            deleteSingleDocument($filename);
        }
        if($_POST["function"] == "docbuilder_uploaddoc"){
            $userfile_name = $_FILES['doc']['name'];
            $userfile_size = $_FILES['doc']['size'];
            $companyid = $_POST["companyid"];
            $userid = $_POST["userid"];
            docbuilder_UploadDoc($userfile_name, $userfile_size, $companyid, $userid);
        }
        if($_POST["function"] == "docflow_uploaddoc"){
            // set_time_limit(500);
            $userfile_name = $_FILES['doc']['name'];
            $userfile_size = $_FILES['doc']['size'];
            $userid = $_POST["userid"];
            docflow_UploadDoc($userfile_name, $userfile_size, $userid);
        }
        if($_POST["function"] == "uploaddocumentbank"){
            // set_time_limit(500);
            $url = $_POST['url'];
            $ownerid = $_POST['ownerid'];
            uploadDocumentBank($url, $ownerid);
        }
        if($_POST["function"] == "budget_uploadfile"){
            // set_time_limit(500);
            $userfile_name = $_FILES['doc']['name'];
            $userfile_size = $_FILES['doc']['size'];
            $budgetid = $_POST["budgetid"];
            uploadBudgetFile($userfile_name, $userfile_size, $budgetid);
        }
        if($_POST["function"] == "deletesinglefile"){
            $filename = $_POST["filename"];
            deleteSingleFile($filename);
        }

        if($_POST["function"] == "invoice_uploadfile"){
            // set_time_limit(500);
            $userfile_name = $_FILES['doc']['name'];
            $userfile_size = $_FILES['doc']['size'];
            $invoiceid = $_POST["invoiceid"];
            uploadBudgetFile($userfile_name, $userfile_size, $invoiceid);
        }

        
        
        // echo 'ASDASDDASSDA';
        
    }

    





?>