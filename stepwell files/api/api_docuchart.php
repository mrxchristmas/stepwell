<?php
include '../controllers/dbconn.php';
header("Content-Type:application/json");

if (isset($_GET['function']) && $_GET['function']!="") {

    if($_GET['function'] == 'updateplanningconnect'){
        $docid = $_GET['docid'];
        $projectid = $_GET['projectid'];
        $title = $_GET['title'];
    
        $query = "CALL updatePlanningConnect('$docid', '$projectid', '$title')";

        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }

    if($_GET['function'] == 'createplanningconnect'){
        $docid = $_GET['docid'];
        $projectid = $_GET['projectid'];
        $title = $_GET['title'];
    
        $query = "CALL createPlanningConnect('$docid', '$projectid', '$title')";

        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'createplanningdocumentlink'){
        $linkid = $_GET['linkid'];
        $docid = $_GET['docid'];
        $stage = $_GET['stage'];
    
        // (taskid, projectid, planid, taskname, startdate, enddate, cbsuccess = {})
        $query = "CALL createPlanningDocumentLink('$linkid', '$docid', '$stage')";

        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'createplanningschedulebydocid'){
        $docid = $_GET['docid'];
        $draftsd = $_GET['draftsd'];
        $drafted = $_GET['drafted'];
        $reviewed = $_GET['reviewed'];
        $approvaled = $_GET['approvaled'];
        $executioned = $_GET['executioned'];
        $postapprovaled = $_GET['postapprovaled'];
        
        $query = "CALL createPlanningScheduleByDocId('$docid','$draftsd','$drafted','$reviewed','$approvaled','$executioned','$postapprovaled')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }

    if($_GET['function'] == 'fetchplanningschedules'){
        $projectid = $_GET['projectid'];
        
    
        $query = "CALL fetchPlanningSchedules('$projectid')";
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
            $response['fetchPlanningSchedules'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }

    if($_GET['function'] == 'fetchprojectdocuments'){
        $projid = $_GET['projid'];
    
        $query = "CALL fetchProjectDocuments('$projid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['docid'] = $row['docid'];
                $response[$x]['title'] = $row['title'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchProjectDocuments'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'fetchplanningdocumentbydocname'){
        $title = $_GET['title'];
    
        $query = "CALL fetchPlanningDocumentByDocName('$title')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['title'] = $row['title'];
                $response[$x]['docid'] = $row['docid'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchPlanningDocumentByDocName'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }

    if($_GET['function'] == 'fetchplanningschedulebydocid'){
        $docid = $_GET['docid'];
    
        $query = "CALL fetchPlanningScheduleByDocId('$docid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['docid'] = $row['docid'];
                $response[$x]['draftsd'] = $row['draftsd'];
                $response[$x]['drafted'] = $row['drafted'];
                $response[$x]['reviewed'] = $row['reviewed'];
                $response[$x]['approvaled'] = $row['approvaled'];
                $response[$x]['executioned'] = $row['executioned'];
                $response[$x]['postapprovaled'] = $row['postapprovaled'];
                $response[$x]['mapid'] = $row['mapid'];
                $response[$x]['linkid'] = $row['linkid'];

                
                $response[$x]['docid'] = $row['docid'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['title'] = $row['title'];
                $response[$x]['draftsd'] = $row['draftsd'];
                $response[$x]['drafted'] = $row['drafted'];
                $response[$x]['reviewed'] = $row['reviewed'];
                $response[$x]['approvaled'] = $row['approvaled'];
                $response[$x]['executioned'] = $row['executioned'];
                $response[$x]['postapprovaled'] = $row['postapprovaled'];
                $response[$x]['mapid'] = $row['mapid'];
                $response[$x]['linkid'] = $row['linkid'];
                
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchPlanningScheduleByDocId'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }

    if($_GET['function'] == 'fetchplanningschedulebyprojectid'){
        $projectid = $_GET['projectid'];
        $query = "CALL fetchPlanningScheduleByProjectId('$projectid')";
        // CALL fetchPlanningScheduleByProjectId('$projectid')
        
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
                $response[$x]['actualid'] = $row['actualid'];
                $response[$x]['milestone'] = $row['milestone'];
                
                $response[$x]['linkid'] = $row['linkid'];
                $response[$x]['linkstage'] = $row['linkstage'];
                $response[$x]['producessorid'] = $row['producessorid'];
                $response[$x]['producessorstage'] = $row['producessorstage'];
                $response[$x]['actualtitle'] = $row['actualtitle'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchPlanningScheduleByDocId'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }

    }

    if($_GET['function'] == 'fetchbuildschedule'){
        $projectid = $_GET['projectid'];
        
        $query = "CALL fetchBuildSchedule('$projectid')";
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
                $response[$x]['actualid'] = $row['actualid'];
                $response[$x]['milestone'] = $row['milestone'];
                
                $response[$x]['linkid'] = $row['linkid'];
                $response[$x]['linkstage'] = $row['linkstage'];
                $response[$x]['producessorid'] = $row['producessorid'];
                $response[$x]['producessorstage'] = $row['producessorstage'];
                $response[$x]['actualtitle'] = $row['actualtitle'];
                $response[$x]['taskid'] = $row['taskid'];
                $response[$x]['taskstatus'] = $row['taskstatus'];
                $response[$x]['taskname'] = $row['taskname'];
                $response[$x]['tasksd'] = $row['tasksd'];
                $response[$x]['tasked'] = $row['tasked'];
                
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchBuildSchedule'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }

    if($_GET['function'] == 'fetchplanningtasksbydocid'){
        $docid = $_GET['docid'];
    
        $query = "CALL fetchPlanningTasksByDocid('$docid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['taskid'] = $row['taskid'];
                $response[$x]['docid'] = $row['docid'];
                $response[$x]['taskname'] = $row['taskname'];
                $response[$x]['startdate'] = $row['startdate'];
                $response[$x]['enddate'] = $row['enddate'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchPlanningTasksByDocid'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }

    if($_GET['function'] == 'fetchactualdocumentsbyprojectid'){
        $projectid = $_GET['projectid'];
        
        $query = "CALL fetchActualDocumentsByProjectId('$projectid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;

            // d.docid, d.title, pd.draftsd, pd.drafted, pd.reviewed, pd.approvaled, pd.executioned, pd.postapprovaled, 
            // d.ownerid, d.status, d.draftstamp, d.proofreadstamp, d.reviewstamp, d.approvestamp, d.postapprovestamp
            while($row = $rs->fetch_assoc()) {
                $response[$x]['docid'] = $row['docid'];
                $response[$x]['title'] = $row['title'];
                $response[$x]['mapid'] = $row['mapid'];
                $response[$x]['draftsd'] = $row['draftsd'];
                $response[$x]['drafted'] = $row['drafted'];
                $response[$x]['reviewed'] = $row['reviewed'];
                $response[$x]['approvaled'] = $row['approvaled'];
                $response[$x]['executioned'] = $row['executioned'];
                $response[$x]['postapprovaled'] = $row['postapprovaled'];
                $response[$x]['ownerid'] = $row['ownerid'];
                $response[$x]['status'] = $row['status'];
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
            $response['fetchActualDocumentsByProjectId'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }

    if($_GET['function'] == 'fetchplanningdocumentsbyprojectid'){
        $projectid = $_GET['projectid'];
        
        $query = "CALL fetchPlanningDocumentsByProjectId('$projectid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            // pc.projectid, pd.docid, pc.title, pc.mapid, pd.milestone, 
            // pd.draftsd, pd.drafted, pd.reviewed, pd.approvaled, pd.executioned, pd.postapprovaled
            while($row = $rs->fetch_assoc()) {
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['docid'] = $row['docid'];
                $response[$x]['title'] = $row['title'];
                $response[$x]['mapid'] = $row['mapid'];
                $response[$x]['milestone'] = $row['milestone'];
                $response[$x]['draftsd'] = $row['draftsd'];
                $response[$x]['drafted'] = $row['drafted'];
                $response[$x]['reviewed'] = $row['reviewed'];
                $response[$x]['approvaled'] = $row['approvaled'];
                $response[$x]['executioned'] = $row['executioned'];
                $response[$x]['postapprovaled'] = $row['postapprovaled'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchPlanningDocumentsByProjectId'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }

    if($_GET['function'] == 'fetchplanningdocumentlink'){
        $docid = $_GET['docid'];
        
    
        $query = "CALL fetchPlanningDocumentLink('$docid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['linkid'] = $row['linkid'];
                $response[$x]['docid'] = $row['docid'];
                $response[$x]['stage'] = $row['stage'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchPlanningDocumentLink'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }

    if($_GET['function'] == 'fetchplanningdocumentproducessor'){
        $docid = $_GET['docid'];
        $predid = $_GET['predid'];
        
    
        $query = "CALL fetchPlanningDocumentProducessor('$docid', '$predid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['predecessorid'] = $row['producessorid'];
                $response[$x]['docid'] = $row['docid'];
                $response[$x]['preddocid'] = $row['preddocid'];
                $response[$x]['stage'] = $row['stage'];
                $response[$x]['prevdate'] = $row['prevdate'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchPlanningDocumentProducessor'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }

    if($_GET['function'] == 'fetchdocumentsconnectedtoprojectupdated'){
        $projectid = $_GET['projectid'];
        
        $query = "CALL fetchDocumentsConnectedToProjectUpdated('$projectid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['planningid'] = $row['planningid'];
                $response[$x]['planningtitle'] = $row['planningtitle'];
                $response[$x]['draftsd'] = $row['draftsd'];
                $response[$x]['drafted'] = $row['drafted'];
                $response[$x]['reviewed'] = $row['reviewed'];
                $response[$x]['approvaled'] = $row['approvaled'];
                $response[$x]['executioned'] = $row['executioned'];
                $response[$x]['postapprovaled'] = $row['postapprovaled'];
                $response[$x]['actualid'] = $row['actualid'];
                $response[$x]['linkid'] = $row['linkid'];
                $response[$x]['linkstage'] = $row['linkstage'];
                $response[$x]['linkid'] = $row['producessorid'];
                $response[$x]['linkstage'] = $row['producessorstage'];
                $response[$x]['actualtitle'] = $row['actualtitle'];
                $response[$x]['ownerid'] = $row['ownerid'];
                $response[$x]['status'] = $row['status'];
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
            $response['fetchDocumentsConnectedToProjectUpdated'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }

    if($_GET['function'] == 'fetchdocumentdcheduleconnectedtoproject'){
        $projectid = $_GET['projectid'];
        
        $query = "CALL fetchDocumentScheduleConnectedToProject('$projectid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['planningid'] = $row['planningid'];
                $response[$x]['planningtitle'] = $row['planningtitle'];
                $response[$x]['draftsd'] = $row['draftsd'];
                $response[$x]['drafted'] = $row['drafted'];
                $response[$x]['reviewed'] = $row['reviewed'];
                $response[$x]['approvaled'] = $row['approvaled'];
                $response[$x]['executioned'] = $row['executioned'];
                $response[$x]['postapprovaled'] = $row['postapprovaled'];
                $response[$x]['actualid'] = $row['actualid'];
                $response[$x]['linkid'] = $row['linkid'];
                $response[$x]['linkstage'] = $row['linkstage'];
                $response[$x]['linkid'] = $row['producessorid'];
                $response[$x]['linkstage'] = $row['producessorstage'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchDocumentScheduleConnectedToProject'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }

    if($_GET['function'] == 'fetchtaskresourcesbyplanidprojid'){
        $planningid = $_GET['planningid'];
        $projectid = $_GET['projectid'];
        
        $query = "CALL fetchTaskResourcesByPlanidProjid('$planningid','$projectid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;

            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['type'] = $row['type'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['planid'] = $row['planid'];
                $response[$x]['taskid'] = $row['taskid'];
                $response[$x]['accid'] = $row['accid'];
                $response[$x]['supplierid'] = $row['supplierid'];
                $response[$x]['hours'] = $row['hours'];
                $response[$x]['stage'] = $row['stage'];
                $response[$x]['suggesteddate'] = $row['suggesteddate'];
                $response[$x]['assignment'] = $row['assignment'];
                $response[$x]['usercomment'] = $row['usercomment'];
                $response[$x]['pmcomment'] = $row['pmcomment'];
                $response[$x]['usrread'] = $row['usrread'];
                $response[$x]['pmread'] = $row['pmread'];
                
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchTaskResourcesByPlanidProjid'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }

    if($_GET['function'] == 'fetchprojectsbysuperiorid'){
        $accid = $_GET['accid'];
        
        $query = "CALL fetchProjectsBySuperiorId('$accid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;

            while($row = $rs->fetch_assoc()) {
                $response[$x]['id'] = $row['id'];
                $response[$x]['type'] = $row['type'];
                
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchProjectsBySuperiorId'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }
    }
    

    if($_GET['function'] == 'updateplanningdocumentlinks'){
        $linkid = $_GET['linkid'];
        $docid = $_GET['docid'];
        $linkstage = $_GET['linkstage'];
        $linkstatus = $_GET['linkstatus'];

    
        $query = "CALL updatePlanningDocumentLinks('$linkid','$docid','$linkstage','$linkstatus')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }

    if($_GET['function'] == 'updateplanningdocumentpredecessor'){
        $predid = $_GET['predid'];
        $docid = $_GET['docid'];
        $predstage = $_GET['predstage'];
        $predstatus = $_GET['predstatus'];
        $preddocid = $_GET['preddocid'];
        

    
        $query = "CALL updatePlanningDocumentProducessor('$predid','$docid','$predstage','$predstatus', '$preddocid')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }

    if($_GET['function'] == 'deletedocumentlink'){
        $linkid = $_GET['linkid'];
        $docid = $_GET['docid'];
        $stage = $_GET['stage'];
    
        $query = "CALL deleteDocumentLink('$linkid','$docid','$stage')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    
    if($_GET['function'] == 'updatemilestone'){
        $docid = $_GET['docid'];
        
    
        $query = "CALL updateMilestone('$docid')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }

    if($_GET['function'] == 'deletemilestone'){
        $docid = $_GET['docid'];
        
    
        $query = "CALL deleteMilestone('$docid')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }

    if($_GET['function'] == 'updateplanningschedulebydocid'){
        $docid = $_GET['docid'];
        $draftsd = $_GET['draftsd'];
        $drafted = $_GET['drafted'];
        $reviewed = $_GET['reviewed'];
        $approvaled = $_GET['approvaled'];
        $executioned = $_GET['executioned'];
        $postapprovaled = $_GET['postapprovaled'];
        $linkid = $_GET['linkid'];
        $linkstage = $_GET['linkstage'];
        $producessorid = $_GET['producessorid'];
        $producessorstage = $_GET['producessorstage'];
        
    
        $query = "CALL updatePlanningScheduleByDocId('$docid','$draftsd','$drafted','$reviewed','$approvaled','$executioned','$postapprovaled','$linkid','$linkstage','$producessorid','$producessorstage')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    
    if($_GET['function'] == 'updateplanningtasksbydocid'){
        $docid = $_GET['docid'];
        $taskname = $_GET['taskname'];
    
        $query = "CALL updatePlanningtasksByDocId('$docid','$taskname')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }

    if($_GET['function'] == 'searchplanningdocument'){
        $search = $_GET['search'];
    
        $query = "CALL searchPlanningDocument('$search')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['docid'] = $row['docid'];
                $response[$x]['projectid'] = $row['projectid'];
                $response[$x]['title'] = $row['title'];
                $response[$x]['mapid'] = $row['mapid'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['searchplanningdocument'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'updateplanningconnectmap'){
        $docid = $_GET['docid'];
        $mapid = $_GET['mapid'];
    
        $query = "CALL updatePlanningConnectMap('$docid','$mapid')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }

    if($_GET['function'] == 'createplanningdocument'){
        $docid = $_GET['docid'];
        $projectid = $_GET['projectid'];
        $title = $_GET['title'];
    
        $query = "CALL createPlanningDocument('$docid','$title', '$projectid')";
        // test doc 1 PD-569063886 P-230720344
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'deleteplanningdocument'){
        $docid = $_GET['docid'];
        $projectid = $_GET['projectid'];
    
        $query = "CALL deletePlanningDocument('$docid', '$projectid')";
        // test doc 1 PD-569063886 P-230720344
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'createplanningtestschedule'){
        $scheduleid = $_GET['scheduleid'];
        $tempscheduleid = $_GET['tempscheduleid'];
        $ownerid = $_GET['ownerid'];
        $title = $_GET['title'];
    
        $query = "CALL createPlanningTestSchedule('$scheduleid','$tempscheduleid', '$ownerid', '$title')";
        // test doc 1 PD-569063886 P-230720344
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }
    if($_GET['function'] == 'fetchplanningtestschedule'){
        $ownerid = $_GET['ownerid'];
    
        $query = "CALL fetchPlanningTestSchedule('$ownerid')";
        $rs = mysqli_query($link , $query);
        if(mysqli_num_rows($rs)>0){
            $x = 0;
            while($row = $rs->fetch_assoc()) {
                $response[$x]['scheduleid'] = $row['scheduleid'];
                $response[$x]['title'] = $row['title'];
                $x++;
            }
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
        }else{
            $response['fetchplanningtestschedule'] = 'error';
            $json_response = json_encode($response);
            echo $json_response;
            mysqli_close($link);
            // response(NULL, NULL, 200,"No Record Found");
        }
    }
    if($_GET['function'] == 'deletetmpplanningdocument'){

        $query = "CALL deleteTmpPlanningDocument();";
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
    if($_GET['function'] == 'updatescheduleidintoprojectid'){
        $scheduleid = $_GET['scheduleid'];
        $projectid = $_GET['projectid'];
    
        $query = "CALL updateScheduleIdIntoProjectId('$scheduleid','$projectid')";
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
    if($_GET['function'] == 'deleteplanningschedule'){
        $scheduleid = $_GET['scheduleid'];

        $query = "CALL deletePlanningSchedule('$scheduleid');";
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
    

    if($_GET['function'] == 'createplanningdocumentpredecessor'){
        $docid = $_GET['docid'];
        $predid = $_GET['predid'];
        $stage = $_GET['stage'];
        $preddocid = $_GET['preddocid'];
        
        $query = "CALL createPlanningDocumentPredecessor('$docid','$predid','$stage','$preddocid')";
        // $rs = mysqli_query($link , $query);
        if(mysqli_query($link , $query)){
            echo 'true';
            mysqli_close($link);
        }else{
            echo 'false';
            mysqli_close($link);
        }
    }

    if($_GET['function'] == 'deleteplanningdocumentpredecessor'){
        $docid = $_GET['docid'];
        $predid = $_GET['predid'];
        $stage = $_GET['stage'];
        $preddocid = $_GET['preddocid'];
    
        $query = "CALL 	deletePlanningDocumentPredecessor('$docid','$predid','$stage','$preddocid')";
        // $rs = mysqli_query($link , $query);
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