<?php

include '../controllers/dbconn.php';
header("Content-Type:application/json");

if (isset($_GET['function']) && $_GET['function']!="") {

    
    if($_GET['function'] == 'createSkid'){
        $id = $_GET['id'];
        $creatorid = $_GET['creatorid'];
        $date = $_GET['date'];

        // $query = "IF ( (SELECT COUNT(id) FROM `tbl_skid` WHERE id='$id') <= 0 ) THEN
        //             BEGIN
        //                 INSERT INTO `tbl_skid`("id", "creatorid", "date", "equipmentid", "unitid") 
        //                 VALUES ('$id','$creatorid','$date', NULL, NULL);
        //             END;
        //         END IF;";
        $query = "INSERT INTO `tbl_skid`(`id`, `creatorid`, `date`) VALUES ('$id', '$creatorid', '$date');";

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
    if($_GET['function'] == 'deleteSkid'){
        $id = $_GET['id'];

        $query = "DELETE FROM `tbl_skid` WHERE `id`= '$id';";

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
    if($_GET['function'] == 'fetchSkid'){

        // $query = "SELECT DISTINCT * from `tbl_skid` AS s WHERE s.creatorid = $id OR 
        //         s.creatorid IN (SELECT acs.accid FROM `tbl_account_supervisor` AS acs WHERE acs.superid = $id);";

        $query = "SELECT * from `tbl_skid`";


        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['creatorid'] = $row['creatorid'];
                $response[$x]['date'] = $row['date'];
                $x++;
            }
            // $response['response'] = 'success';
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

    if($_GET['function'] == 'createSkidEquipment'){
        $id = $_GET['id'];
        $name = $_GET['name'];

        $query = "INSERT INTO `tbl_skid_equipment` (`id`, `name`) VALUES ('$id', '$name');";

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
    if($_GET['function'] == 'deleteSkidEquipment'){
        $id = $_GET['id'];

        $query = "DELETE FROM `tbl_skid_equipment` WHERE `id` = '$id'; DELETE FROM `tbl_skid_subequipment` WHERE `equipmentid`= '$id';";

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
    if($_GET['function'] == 'updateSkidEquipment'){
        $id = $_GET['id'];
        $name = $_GET['name'];

        $query = "UPDATE tbl_skid_equipment SET `name` = '$name' WHERE `id` = '$id'; ";

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
    if($_GET['function'] == 'fetchSkidEquipment'){

        $query = "SELECT * FROM `tbl_skid_equipment`;";

        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
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
        }
    }

    if($_GET['function'] == 'createSkidSubEquipment'){
        $id = $_GET['id'];
        $name = $_GET['name'];
        $equipmentid = $_GET['equipmentid'];
        $process = $_GET['process'];
        $tag = $_GET['tag'];
        $quantity = $_GET['quantity'];
        $capacity = $_GET['capacity'];
        $tank = $_GET['tank'];
        $room = $_GET['room'];
        $dimensions = $_GET['dimensions'];
        $cost = $_GET['cost'];
        $budget = $_GET['budget'];
        $icon = $_GET['icon'];


        $query = "INSERT INTO `tbl_skid_subequipment` (`id`, `name`, `equipmentid`, `process`, `tag`, `quantity`, `capacity`, `tank`, `room`, `dimensions`, `cost`, `budget`, `icon`) 
                        VALUES ('$id', '$name', '$equipmentid', '$process', '$tag', '$quantity', '$capacity', '$tank', '$room', '$dimensions', '$cost', '$budget', '$icon');";

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
    if($_GET['function'] == 'updateSkidSubEquipment'){
        $id = $_GET['id'];
        $name = $_GET['name'];
        $equipmentid = $_GET['equipmentid'];
        $process = $_GET['process'];
        $tag = $_GET['tag'];
        $quantity = $_GET['quantity'];
        $capacity = $_GET['capacity'];
        $tank = $_GET['tank'];
        $room = $_GET['room'];
        $dimensions = $_GET['dimensions'];
        $cost = $_GET['cost'];
        $budget = $_GET['budget'];
        $icon = $_GET['icon'];


        $query = "UPDATE `tbl_skid_subequipment` SET `name`= '$name', `equipmentid`= '$equipmentid', `process`= '$process', `tag`='$tag',
                    `quantity`= '$quantity', `capacity`= '$capacity', `tank`= '$tank', `room`= '$room', `dimensions`= '$dimensions', `cost`= '$cost', `budget`= '$budget', `icon`= '$icon' 
                    WHERE `id` = '$id';";

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
    if($_GET['function'] == 'deleteSkidSubEquipment'){
        $id = $_GET['id'];

        $query = "DELETE FROM `tbl_skid_subequipment` WHERE `id`= '$id';";

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
    if($_GET['function'] == 'fetchSkidSubEquipment'){

        $query = "SELECT * FROM `tbl_skid_subequipment`;";

        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['name'] = $row['name'];
                $response[$x]['equipmentid'] = $row['equipmentid'];
                $response[$x]['process'] = $row['process'];
                $response[$x]['tag'] = $row['tag'];
                $response[$x]['quantity'] = $row['quantity'];
                $response[$x]['capacity'] = $row['capacity'];
                $response[$x]['tank'] = $row['tank'];
                $response[$x]['room'] = $row['room'];
                $response[$x]['dimensions'] = $row['dimensions'];
                $response[$x]['cost'] = $row['cost'];
                $response[$x]['budget'] = $row['budget'];
                $response[$x]['icon'] = $row['icon'];

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

    if($_GET['function'] == 'createSkidUnit'){
        $id = $_GET['id'];
        $name = $_GET['name'];

        $query = "INSERT INTO `tbl_skid_unit` (`id`, `name`) 
                        VALUES ('$id', '$name');";

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
    if($_GET['function'] == 'deleteSkidUnit'){
        $id = $_GET['id'];

        $query = "DELETE FROM `tbl_skid_unit` WHERE `id`= '$id'; DELETE FROM `tbl_skid_subunit` WHERE `unitid`= '$id';";

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
    if($_GET['function'] == 'updateSkidUnit'){
        $id = $_GET['id'];
        $name = $_GET['name'];

        $query = "UPDATE `tbl_skid_unit` SET `name` = '$name' WHERE `id`= '$id'; ";

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
    if($_GET['function'] == 'fetchSkidUnit'){

        $query = "SELECT * FROM `tbl_skid_unit`;";

        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
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
        }
    }

    if($_GET['function'] == 'createSkidSubUnit'){
        $id = $_GET['id'];
        $name = $_GET['name'];
        $unitid = $_GET['unitid'];
        $process = $_GET['process'];
        $tag = $_GET['tag'];
        $icon = $_GET['icon'];


        $query = "INSERT INTO `tbl_skid_subunit` (`id`, `name`, `unitid`, `process`, `tag`, `icon`) 
                        VALUES ('$id', '$name', '$unitid', '$process', '$tag', '$icon');";

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
    if($_GET['function'] == 'updateSkidSubUnit'){
        $id = $_GET['id'];
        $name = $_GET['name'];
        $unitid = $_GET['unitid'];
        $process = $_GET['process'];
        $tag = $_GET['tag'];
        $icon = $_GET['icon'];


        $query = "UPDATE `tbl_skid_subunit` SET `name`= '$name', `unitid`= '$unitid', `process`= '$process', `tag`= '$tag', `icon`= '$icon' WHERE `id` = '$id';";

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
    if($_GET['function'] == 'deleteSkidSubUnit'){
        $id = $_GET['id'];

        $query = "DELETE FROM `tbl_skid_subunit` WHERE `id`= '$id';";

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
    if($_GET['function'] == 'fetchSkidSubUnit'){

        $query = "SELECT * FROM `tbl_skid_subunit`;";

        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['name'] = $row['name'];
                $response[$x]['unitid'] = $row['unitid'];
                $response[$x]['process'] = $row['process'];
                $response[$x]['tag'] = $row['tag'];
                $response[$x]['icon'] = $row['icon'];
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

    
    if($_GET['function'] == 'createSkidSubUnitParam'){
        $id = $_GET['id'];
        $unitid = $_GET['unitid'];
        $name = $_GET['name'];
        $content = $_GET['content'];
        $visible = $_GET['visible'];

        $query = "INSERT INTO `tbl_skid_unit_params` (`id`, `unitid`, `name`, `content`, `visible`) 
                        VALUES ('$id', '$unitid', '$name', '$content', '$visible');";

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
    if($_GET['function'] == 'deleteSkidSubUnitParam'){
        $id = $_GET['id'];

        $query = "DELETE FROM `tbl_skid_unit_params` WHERE `id`= '$id';";

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
    if($_GET['function'] == 'fetchSkidSubUnitParam'){

        $query = "SELECT * FROM `tbl_skid_unit_params`; ";

        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['name'] = $row['name'];
                $response[$x]['unitid'] = $row['unitid'];
                $response[$x]['process'] = $row['process'];
                $response[$x]['tag'] = $row['tag'];
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


    function secure_delete($file_path){
        $file_size = filesize($file_path);
        $new_content = str_repeat('0', $file_size);
        file_put_contents($file_path, $new_content);
        unlink($file_path);
    }
    
    // if($_GET['function'] == 'createSkidFileTest'){
    //     $id = $_GET['id'];
    //     $content = $_GET['content'];

    //     $fp = fopen("../data/SkidFiles/" . $id . ".ceis","wb");
    //     fwrite($fp, $content);
    //     fclose($fp);
    
    // }
    
    if($_GET['function'] == 'deleteSkidFile'){
        $id = $_GET['id'];

        $query = "DELETE FROM `tbl_skid_files` WHERE `id`= '$id';";

        if(mysqli_query($link , $query)){
            secure_delete("../data/SkidFiles/" . $id . ".ceis");

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
    if($_GET['function'] == 'archiveSkidFile'){
        $id = $_GET['id'];

        $query = "DELETE FROM `tbl_skid_files` WHERE `id`= '$id';";

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
    
    if($_GET['function'] == 'fetchSkidFileByOwner'){
        $ownerid = $_GET['ownerid'];

        $query = "SELECT * FROM `tbl_skid_files` WHERE ownerid = '$ownerid'; ";

        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['ownerid'] = $row['ownerid'];
                $response[$x]['filename'] = $row['filename'];
                $response[$x]['url'] = $row['url'];
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
    if($_GET['function'] == 'fetchSkidFile'){
        $query = "SELECT * FROM `tbl_skid_files`; ";

        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['ownerid'] = $row['ownerid'];
                $response[$x]['filename'] = $row['filename'];
                $response[$x]['url'] = $row['url'];
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
    


    if($_GET["function"] == "deleteIcon"){
        $file_path = $_GET["url"];
        // secure_delete($url);
        if (file_exists($file_path)) {
            // echo "The file $filename exists";
            $file_size = filesize($file_path);
            $new_content = str_repeat('0', $file_size);
            file_put_contents($file_path, $new_content);
            unlink($file_path);

            $response['response'] = 'success';
            $json_response = json_encode($response);
            echo $json_response;
        } else {
            $response['response'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
        }

    }






    if($_GET['function'] == 'createSkidFileAccess'){
        $id = $_GET['id'];
        $fileid = $_GET['fileid'];
        $accountid = $_GET['accountid'];

        $query = "INSERT INTO `tbl_skid_files_access` (`id`, `fileid`, `accountid`) 
                        VALUES ('$id', '$fileid', '$accountid');";

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
    if($_GET['function'] == 'deleteSkidFileAccess'){
        $id = $_GET['id'];

        $query = "DELETE FROM `tbl_skid_files_access` WHERE `id`= '$id';";

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
    if($_GET['function'] == 'fetchSkidFileAccess'){
        $fileid = $_GET['fileid'];

        $query = "SELECT * FROM `tbl_skid_files_access` WHERE fileid = '$fileid'; ";

        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['fileid'] = $row['fileid'];
                $response[$x]['accountid'] = $row['accountid'];
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



    if($_GET['function'] == 'createSkidFileAccessRequest'){
        $id = $_GET['id'];
        $fileid = $_GET['fileid'];
        $accountid = $_GET['accountid'];

        $query = "INSERT INTO `tbl_skid_files_access_request` (`id`, `fileid`, `accountid`) 
                        VALUES ('$id', '$fileid', '$accountid'); ";

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
    if($_GET['function'] == 'deleteSkidFileAccessRequest'){
        $id = $_GET['id'];

        $query = "DELETE FROM `tbl_skid_files_access_request` WHERE `id`= '$id';";

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
    if($_GET['function'] == 'fetchSkidFileAccessRequest'){
        $fileid = $_GET['fileid'];

        $query = "SELECT * FROM `tbl_skid_files_access_request` WHERE fileid = '$fileid'; ";

        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['fileid'] = $row['fileid'];
                $response[$x]['accountid'] = $row['accountid'];
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


    if($_GET['function'] == 'createSkidFileProflowConnect'){
        $id = $_GET['id'];
        $fileid = $_GET['fileid'];
        $projectid = $_GET['projectid'];

        $query = "INSERT INTO `tbl_skid_files_proflow_connect` (`id`, `fileid`, `projectid`) 
                        VALUES ('$id', '$fileid', '$projectid');";

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
    if($_GET['function'] == 'deleteSkidFileProflowConnect'){
        $id = $_GET['id'];

        $query = "DELETE FROM `tbl_skid_files_proflow_connect` WHERE `id`= '$id';";

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
    if($_GET['function'] == 'fetchSkidFileProflowConnect'){
        $fileid = $_GET['fileid'];

        $query = "SELECT * FROM `tbl_skid_files_proflow_connect` WHERE fileid = '$fileid'; ";

        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['fileid'] = $row['fileid'];
                $response[$x]['projectid'] = $row['projectid'];
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








}

if (isset($_POST['function']) && $_POST['function']!="") {
    function secure_update($file_path, $content){
        file_put_contents($file_path, $content);
    }
    function uploadimage($name, $size, $companyid, $userid){
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
    function saveSkidIconImage($iconid, $name, $size){
        $userfile_name = $name;
        $userfile_size = $size;
        $target_dir = "../lib/images/skidicons/";
        $doc_dir = "lib/images/skidicons/";
        
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
        $valid_extensions = array("jpg","jpeg","png","webp");
        if( !in_array(strtolower($userfile_type),$valid_extensions) ) {
            $response['response'] = 'error_filetype';
            $json_response = json_encode($response);
            echo $json_response;
            $uploadOk = 0;
        }

        if($uploadOk == 1){
            $temp = explode(".", $userfile_name);
            $newfilename = $iconid . '.' . end($temp);
            
            $finalfileupload = $target_dir . $newfilename;
            $docurl = $doc_dir . $newfilename;

            // do { $newfilename = round(microtime(true)) . '.' . end($temp);
            // }while (file_exists($finalfileupload));

            // echo('OK++'.$docurl);

            if(move_uploaded_file($_FILES['img']['tmp_name'], $finalfileupload)){
                $response['response'] = 'OK';
                $response['url'] = $docurl;
                $response['iconid'] = $iconid;
                $json_response = json_encode($response);
                echo $json_response;
            }else{
                $response['response'] = 'error_upload';
                $json_response = json_encode($response);
                echo $json_response;
            }
        }
    }
    function deleteSingleImage($filename){
        if (file_exists($filename)) {
            // echo "The file $filename exists";
            unlink($filename);
            $response['response'] = 'success';
            $json_response = json_encode($response);
            echo $json_response;
        } else {
            $response['response'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
        }
    }
    

    function deleteIcon($filename){
        if (file_exists($filename)) {
            // echo "The file $filename exists";
            unlink($filename);
            $response['response'] = 'success';
            $json_response = json_encode($response);
            echo $json_response;
        } else {
            $response['response'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
        }
    }

    if($_POST['function'] == 'createSkidFile'){
        // $id = $_GET['id'];
        // $ownerid = $_GET['ownerid'];
        // $filename = $_GET['filename'];
        // $content = $_GET['content'];
    
        $id = $_POST['id'];
        $ownerid = $_POST['ownerid'];
        $filename = $_POST['filename'];
        // $url = "/data/SkidFiles/" . $id . ".ceis";
        // $content = file_get_contents($_FILES['content']['tmp_name']);

        // $finalfileupload = $id . 'ceis';
        $finalfileupload = "../data/SkidFiles/" . $id . ".ceis";
        

        function blob_to_string($bin){
            $char = explode(' ', $bin);
            $userStr = '';
            foreach($char as $ch) 
            $userStr .= chr(bindec($ch));
            return $userStr;
        }
    
        $query = "INSERT INTO `tbl_skid_files` (`id`, `ownerid`, `filename`, `url`) VALUES ('$id', '$ownerid', '$filename', '$url');";
    
        if(mysqli_query($link , $query)){
    
            move_uploaded_file($_FILES['content']['tmp_name'], $finalfileupload);
            // $fp = fopen("../data/SkidFiles/" . $id . ".ceis","wb");
            // fwrite($fp, blob_to_string($content));
            // fclose($fp);
            
            $response['response'] = 'success';
            // $response['content'] = $ccontent;
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
    
        }else{
            $response['response'] = 'error';
            $response['errormsg1'] = $link -> error;
            $response['errormsg2'] = mysqli_error($link);
            

            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_POST['function'] == 'updateSkidFile'){
        $id = $_POST['id'];
        $filename = $_POST['filename'];
        $finalfileupload = "../data/SkidFiles/" . $id . ".ceis";
        // $content = $_POST['content'];

        $query = "UPDATE `tbl_skid_files` SET `filename` = '$filename' WHERE `id`= '$id';";

        if(mysqli_query($link , $query)){
            $response['response'] = 'success';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);

            if(file_exists($finalfileupload)) {
                chmod($finalfileupload,0755); //Change the file permissions if allowed
                unlink($finalfileupload); //remove the file
                move_uploaded_file($_FILES['content']['tmp_name'], $finalfileupload);
            }
            // secure_update("../data/SkidFiles/" . $id . ".ceis", $content);
        }else{
            $response['response'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    if($_POST['function'] == 'createSkidData'){
        // $id = $_GET['id'];
        // $ownerid = $_GET['ownerid'];
        // $filename = $_GET['filename'];
        // $content = $_GET['content'];
    
        $companyid = $_POST['companyid'];
        // $url = "/data/SkidFiles/" . $id . ".ceis";
        // $content = file_get_contents($_FILES['content']['tmp_name']);

        // $finalfileupload = $id . 'ceis';
        $finalfileupload = "../data/SkidData/" . $companyid . ".skiddata";
        

        function blob_to_string($bin){
            $char = explode(' ', $bin);
            $userStr = '';
            foreach($char as $ch) 
            $userStr .= chr(bindec($ch));
            return $userStr;
        }
    
        // $query = "INSERT INTO `tbl_skid_files` (`id`, `ownerid`, `filename`, `url`) VALUES ('$id', '$ownerid', '$filename', '$url');";
    
        // if(mysqli_query($link , $query)){
    
            move_uploaded_file($_FILES['content']['tmp_name'], $finalfileupload);
            // $fp = fopen("../data/SkidFiles/" . $id . ".ceis","wb");
            // fwrite($fp, blob_to_string($content));
            // fclose($fp);
            
            $response['response'] = 'success';
            // $response['content'] = $ccontent;
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
    
        // }else{
        //     $response['response'] = 'error';
        //     $json_response = json_encode($response);
        //     echo $json_response;
        //     mysqli_close($link);
        // }
    }
    if($_POST['function'] == 'updateSkidData'){
        $companyid = $_POST['companyid'];
        // $filename = $_POST['filename'];
        $finalfileupload = "../data/SkidData/" . $companyid . ".skiddata";
        // $content = $_POST['content'];

        // $query = "UPDATE `tbl_skid_files` SET `filename` = '$filename' WHERE `id`= '$id';";

        // if(mysqli_query($link , $query)){
            

            if(file_exists($finalfileupload)) {
                chmod($finalfileupload,0755); //Change the file permissions if allowed
                unlink($finalfileupload); //remove the file
                move_uploaded_file($_FILES['content']['tmp_name'], $finalfileupload);
                $response['response'] = 'success';
                $json_response = json_encode($response);
                echo $json_response;
            }else{
                $response['response'] = 'error';
                $json_response = json_encode($response);
                echo $json_response;
            }
            // secure_update("../data/SkidFiles/" . $id . ".ceis", $content);
        // }else{
        //     $response['response'] = 'error';
        //     $json_response = json_encode($response);
        //     echo $json_response;
        //     mysqli_close($link);
        // }
    }



    if($_POST["function"] == "deleteIcon"){
        $url = $_POST["url"];
        deleteIcon($url);
    }
    if($_POST["function"] == "data_body_icon_browse_unit"){
        $iconid = $_POST["iconid"];
        $userfile_name = $_FILES['img']['name'];
        $userfile_size = $_FILES['img']['size'];
        saveSkidIconImage($iconid, $userfile_name, $userfile_size);
    }
    if($_POST["function"] == "data_body_icon_browse_equipment"){
        $iconid = $_POST["iconid"];
        $userfile_name = $_FILES['img']['name'];
        $userfile_size = $_FILES['img']['size'];
        saveSkidIconImage($iconid, $userfile_name, $userfile_size);
    }
    if($_POST['function'] == 'ajax_data_body_icon_save_file'){
        $companyid = $_POST['companyid'];
        // $filename = $_POST['filename'];
        $finalfileupload = "../data/SkidIcon/" . $companyid . ".skiddata";
        // $content = $_POST['content'];

        // $query = "UPDATE `tbl_skid_files` SET `filename` = '$filename' WHERE `id`= '$id';";

        // if(mysqli_query($link , $query)){
            

            if(file_exists($finalfileupload)) {
                chmod($finalfileupload,0755); //Change the file permissions if allowed
                unlink($finalfileupload); //remove the file
                move_uploaded_file($_FILES['content']['tmp_name'], $finalfileupload);
                $response['response'] = 'success';
                $json_response = json_encode($response);
                echo $json_response;
            }else{
                move_uploaded_file($_FILES['content']['tmp_name'], $finalfileupload);
                $response['response'] = 'success';
                $json_response = json_encode($response);
                echo $json_response;
            }
            // secure_update("../data/SkidFiles/" . $id . ".ceis", $content);
        // }else{
        //     $response['response'] = 'error';
        //     $json_response = json_encode($response);
        //     echo $json_response;
        //     mysqli_close($link);
        // }
    }




}

?>



