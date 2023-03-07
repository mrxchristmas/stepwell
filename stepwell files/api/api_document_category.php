<?php
include '../controllers/dbconn.php';
header("Content-Type:application/json");
if (isset($_GET['function']) && $_GET['function']!="") {

    if($_GET['function'] == 'createdocumentcategory'){
        $id = $_GET['id'];
        $companyid = $_GET['companyid'];
        $name = $_GET['name'];
        $ordernum = $_GET['ordernum'];
        $catnum = $_GET['catnum'];
        // zid, zcompanyid, zemail, zpassword, zuserlevel, zlastname, zfirstname, zphone, zbirthdate, zposition, zdepartment,
        $query = "CALL createDocumentCategory('$id', '$companyid', '$name', '$ordernum', '$catnum')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchdocumentcategory'){
        $companyid = $_GET['companyid'];
        $query = "CALL fetchDocumentCategory('$companyid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['name'] = $row['name'];
                $response[$x]['ordernum'] = $row['ordernum'];
                $response[$x]['catnum'] = $row['catnum'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchAccountModule'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'removedocumentcategory'){
        $id = $_GET['id'];
        // zid, zid, zemail, zpassword, zuserlevel, zlastname, zfirstname, zphone, zbirthdate, zposition, zdepartment,
        $query = "CALL removeDocumentCategory('$id')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'updatedocumentcategoryname'){
        $id = $_GET['id'];     
        $name = $_GET['name'];

        $query = "CALL updateDocumentCategoryName('$id', '$name')";
        $rs = mysqli_query($link , $query);
        if(mysqli_multi_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'deletedocumentcategorytest'){
        $category = $_GET['category'];
        $ordernum = $_GET['ordernum'];
        $query = "CALL deleteDocumentCategoryTest('$category', '$ordernum')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['docid'] = $row['docid'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['deleteDocumentCategoryTest'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    

}

?>