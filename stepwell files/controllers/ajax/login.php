<?php
include '../dbconn.php';


function login($username, $password, $link){
    $query = "CALL login('$username', '$password')";
    $rs = mysqli_query($link , $query);

    if($rs->num_rows > 0){
        while($row = $rs->fetch_assoc()) {
            echo( $row['userlevel'] );
        }
    }else{
        echo 'error';
    }
}

if(isset($_POST['function'])) {

    if($_POST['function'] == 'test') {
        echo 'test';
    }

    if($_POST['function'] == 'login') {
        $username = $_POST['username'];
        $password = $_POST['password'];
        $dbname = $_POST['databaseid'];
        $link = mysqli_connect($server,$username,$password, $dbname) or die("Connection failed: " . mysqli_connect_error());
        login($username, $password, $link);
    }
}