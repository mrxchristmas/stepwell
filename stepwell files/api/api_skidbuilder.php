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


        $query = "INSERT INTO `tbl_skid_subequipment` (`id`, `name`, `equipmentid`, `process`, `tag`, `quantity`, `capacity`, `tank`, `room`, `dimensions`, `cost`, `budget`) 
                        VALUES ('$id', '$name', '$equipmentid', '$process', '$tag', '$quantity', '$capacity', '$tank', '$room', '$dimensions', '$cost', '$budget');";

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


        $query = "UPDATE `tbl_skid_subequipment` SET `name`= '$name', `equipmentid`= '$equipmentid', `process`= '$process', `tag`='$tag',
                    `quantity`= '$quantity', `capacity`= '$capacity', `tank`= '$tank', `room`= '$room', `dimensions`= '$dimensions', `cost`= '$cost', `budget`= '$budget' WHERE `id` = '$id';";

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


        $query = "INSERT INTO `tbl_skid_subunit` (`id`, `name`, `unitid`, `process`, `tag`) 
                        VALUES ('$id', '$name', '$unitid', '$process', '$tag');";

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


        $query = "UPDATE `tbl_skid_subunit` SET `name`= '$name', `unitid`= '$unitid', `process`= '$process', `tag`= '$tag' WHERE `id` = '$id';";

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
?>