<?php
include '../controller/dbconn.php';
include '../controller/defaults.php';
header("Content-Type:application/json");


if (isset($_GET['function']) && $_GET['function']!="") {

    if($_GET['function'] == 'createMessage'){
        $id = $_GET['id'];
        $owner = $_GET['owner'];
        $sender = $_GET['sender'];
        $message = $_GET['message'];
  
        $query = "INSERT INTO `web_message` (id, `owner`, sender, `message`, `stamp`) 
        VALUES ( '$id', '$owner', '$sender', '$message', (SELECT CONVERT_TZ(NOW(), @@session.time_zone, '-04:00')) ); ";

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
    if($_GET['function'] == 'fetchMessageByOwner'){
        $owner = $_GET['owner'];

        $query = "SELECT * FROM web_message WHERE `owner` = '$owner' ORDER BY `stamp` ASC; ";

        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            // session_start();
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['sender'] = $row['sender'];
                $response[$x]['stamp'] = $row['stamp'];
                $response[$x]['message'] = $row['message'];
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
    if($_GET['function'] == 'deleteOldMessages'){
        
        $query = "DELETE FROM web_message WHERE UNIX_TIMESTAMP(stamp) < UNIX_TIMESTAMP(DATE_SUB((SELECT CONVERT_TZ(NOW(), @@session.time_zone, '-04:00')), INTERVAL 30 DAY)); ";

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

    
    
}

?>