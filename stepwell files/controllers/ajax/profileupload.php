<?php
include '../dbconn.php';
header("Content-Type:application/json");

function uploadProfile($name, $size){
    $userfile_name = $name;
    $userfile_size = $size;
    $target_dir = "../../lib/images/profiles/";
    $imgurl_dir = "lib/images/profiles/";
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

if(isset($_GET["function"])) {
    
    // if($_GET["function"] == "uploadProfile"){
    //     // $userfile_name = $_FILES['doc']['name'];
    //     // $userfile_size = $_FILES['doc']['size'];
    //     // uploadProfile($userfile_name, $userfile_size);
    //     echo($userfile_name.$userfile_size);
    // }

}