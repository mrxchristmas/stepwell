let apiUrl_docuchart = 'api/api_docuchart.php';

function api_createPlanningConnect(docid, projectid, title){
    let url = domain + apiUrl_docuchart;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createplanningconnect',
            'docid' : docid,
            'projectid' : projectid,
            'title' : title
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Assigning Project.. Please Wait');

        },
        success: function(data){
            console.log("Sucess: ", data); 
            hideLoadingReport();
        }
    });
}
function api_createPlanningScheduleByDocId(docid,draftsd,drafted,reviewed,approvaled,executioned,postapprovaled){
    let url = domain + apiUrl_docuchart;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createplanningschedulebydocid',
            'docid' : docid,
            'draftsd' : draftsd,
            'drafted' : drafted,
            'reviewed' : reviewed,
            'approvaled' : approvaled,
            'executioned' : executioned,
            'postapprovaled' : postapprovaled,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Saving Schedule.. Please Wait');

        },
        success: function(data){
            console.log("Sucess: ", data); 
            hideLoadingReport();
        }
    });

}
function api_createPlanningDocumentLink(linkid, docid, stage){
    let url = domain + apiUrl_docuchart;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createplanningdocumentlink',
            'linkid' : linkid,
            'docid' : docid,
            'stage' : stage
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Link.. Please Wait');
        },
        success: function(data){
            console.log("Link Sucessfully saved: ", data); 
            hideLoadingReport();
        }
    });
}


function api_fetchPlanningSchedules(projectid,  cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_docuchart;

    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchplanningschedules',
            'projectid': projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Retrieving Schedule..');
        },
        success: function(data){
            console.log(data);
            cbsuccess(data);
            // fetchSchedule(data, sender);
        },
        complete : function(){
            cbcomplete();
            hideLoadingReport();
        }
    });
}
function api_fetchPlanningDocumentById(docid, sender){
    let url = domain + apiUrl_docuchart;

    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchplanningdocumentbydocid',
            'docid' : docid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Pulling data.. Please Wait');
        },
        success: function(data){
            // console.log(data);
            fetchDocument(data, sender);
            hideLoadingReport();
        }
    });
}
function api_fetchPlanningDocumentByDocName(docname, sender){
    let url = domain + apiUrl_docuchart;

    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchplanningdocumentbydocname',
            'title' : docname
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Pulling data.. Please Wait');
        },
        success: function(data){
            console.log(data);
            fetchDocument(data, sender);
            hideLoadingReport();
        }
    });
}
function api_fetchPlanningScheduleById(docid, sender){
    let url = domain + apiUrl_docuchart;

    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchplanningschedulebydocid',
            'docid' : docid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Retrieving Data.. Please Wait');
        },
        success: function(data){
            // console.log(data);
            fetchDocument(data, sender);
            hideLoadingReport();
        }
    });
}
function api_fetchPlanningScheduleByProjectId(projectid, sender, options={}){
    let url = domain + apiUrl_docuchart;
    // console.log(projectid);
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchplanningschedulebyprojectid',
            'projectid' : projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Retrieving Documents.. Please Wait');
        },
        success: function(data){
            console.log("fetchPlanningScheduleByProjectId", data);
            fetchPlanningScheduleByProjectId(data, sender, options);
        },
        complete : function(){
            hideLoadingReport();
        }
    });
}

function api_fetchBuildSchedule(projectid, sender){
    let url = domain + apiUrl_docuchart;

    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchbuildschedule',
            'projectid' : projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Retrieving Schedules.. Please Wait');
        },
        success: function(data){
            // console.log(data);
            fetchSchedule(data, sender);
            hideLoadingReport();
        }
    });
}

function api_fetchActualDocumentsByProjectId(projectid, sender){
    let url = domain + apiUrl_docuchart;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchactualdocumentsbyprojectid',
            'projectid' : projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Retrieving Documents.. Please Wait');
        },
        success: function(data){
            // console.log('Actual Documents: ', data);
            fetchActualDocument(data, sender);
            hideLoadingReport();
        }
    });
}

function api_fetchPlanningDocumentsByProjectId(projectid, sender){
    let url = domain + apiUrl_docuchart;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchplanningdocumentsbyprojectid',
            'projectid' : projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Retrieving Documents.. Please Wait');
        },
        success: function(data){
            // console.log('Actual Documents: ', data);
            fetchPlanningDocument(data, sender);
            hideLoadingReport();
        }
    });
}

function api_fetchProjectsBySuperiorId(projectid, sender){
    let url = domain + apiUrl_docuchart;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            // p.companyid, p.owner, p.projectname, p.reference, p.status
            'function': 'fetchprojectsbysuperiorid',
            'projectid' : projectid,
            'companyid' : companyid,
            'owner' : owner,
            'projectname' : projectname,
            'reference' : reference,
            'status' : status
            
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Retrieving Projects.. Please Wait');
        },
        success: function(data){
            console.log('Retrieving projects connected as well as junior projects: ', data);
            hideLoadingReport();
        }
    });
}

function api_fetchPlanningDocumentLink(docid, sender){
    let url = domain + apiUrl_docuchart;

    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchplanningdocumentlink',
            'docid': docid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Loading..');
        },
        success: function(data){
            hideLoadingReport();
            fetchDocumentLinks(data, sender);
        }
    });
}

function api_deleteDocumentLink(linkid, docid, stage){
    let url = domain + apiUrl_docuchart;

    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deletedocumentlink',
            'linkid': linkid,
            'docid': docid,
            'stage' : stage
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Link..');
        },
        success: function(data){
            hideLoadingReport();
        }
    });
}


function api_fetchDocumentsConnectedToProjectUpdated(projectid, sender){
    let url = domain + apiUrl_docuchart;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchdocumentsconnectedtoprojectupdated',
            'projectid' : projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Retrieving Documents.. Please Wait');
        },
        success: function(data){
            // console.log('Actual Documents: ', data);
            fetchDocumentsConnectedToProjectUpdated(data, sender);
            hideLoadingReport();
        }
    });
}

function api_fetchDocumentScheduleConnectedToProject(projectid, sender){
    let url = domain + apiUrl_docuchart;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchdocumentdcheduleconnectedtoproject',
            'projectid' : projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Retrieving Documents.. Please Wait');
        },
        success: function(data){
            // console.log('Actual Documents: ', data);
            fetchDocument(data, sender);
            hideLoadingReport();
        }
    });
}

function api_fetchTaskResourcesByPlanidProjid(planningid, projectid, sender){
    let url = domain + apiUrl_docuchart;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchtaskresourcesbyplanidprojid',
            'planningid' : planningid,
            'projectid' : projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Loading.. Please Wait');
        },
        success: function(data){
            // console.log('Actual Documents: ', data);
            fetchTaskResources(data, sender);
            hideLoadingReport();
        }
    });
}

function api_updateMilestone(docid){
    let url = domain + apiUrl_docuchart;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updatemilestone',
            'docid' : docid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Milestone.. Please Wait');

        },
        success: function(data){
            console.log("Sucess: ", data); 
            hideLoadingReport();
        }
    });
}

function api_deleteMilestone(docid){
    let url = domain + apiUrl_docuchart;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deletemilestone',
            'docid' : docid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Removing Milestone.. Please Wait');

        },
        success: function(data){
            console.log("Sucess: ", data); 
            hideLoadingReport();
        }
    });
}

function api_updatePlanningDocumentPredecessor(predid, docid, predstage, predstatus, preddocid){
    let url = domain + apiUrl_docuchart;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateplanningdocumentpredecessor',
            'predid' : predid,
            'docid' : docid,
            'predstage' : predstage,
            'predstatus' : predstatus,
            'preddocid' : preddocid,
            
            
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Predecessor.. Please Wait');

        },
        success: function(data){
            console.log("Sucess: ", data); 
            hideLoadingReport();
        }
    });
}

function api_updatePlanningConnect(docid, projectid, title){
    let url = domain + apiUrl_docuchart;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateplanningconnect',
            'docid' : docid,
            'projectid' : projectid,
            'title' : title
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Assigning Project.. Please Wait');

        },
        success: function(data){
            console.log("Sucess: ", data); 
            hideLoadingReport();
        }
    });
}
function api_updatePlanningScheduleByDocId (docid,draftsd,drafted,reviewed,approvaled,executioned,postapprovaled, linkid, linkstage, producessorid, producessorstage)
{
    let url = domain + apiUrl_docuchart;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateplanningschedulebydocid',
            'docid' : docid,
            'draftsd' : draftsd,
            'drafted' : drafted,
            'reviewed' : reviewed,
            'approvaled' : approvaled,
            'executioned' : executioned,
            'postapprovaled' : postapprovaled,
            'linkid' : linkid,
            'linkstage' : linkstage,
            'producessorid' : producessorid,
            'producessorstage' : producessorstage
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Saving Schedule.. Please Wait');

        },
        success: function(data){
            console.log("Sucess: ", data); 
            hideLoadingReport();
        }
    });
}
function api_fetchPlanningTasksByDocid(docid, sender){
    let url = domain + apiUrl_docuchart;

    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchplanningtasksbydocid',
            'docid' : docid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Loading.. Please Wait');
        },
        success: function(data){
            // console.log(data);
            fetchDocument(data, sender);
            hideLoadingReport();
        }
    });
}


function api_searchPlanningDocument(search, sender){
    let url = domain + apiUrl_docuchart;

    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'searchplanningdocument',
            'search' : search
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Loading.. Please Wait');
        },
        success: function(data){
            // console.log(data);
            searchPlanningDocument(data, sender);
            hideLoadingReport();
        }
    });
}
function api_updatePlanningConnectMap(docid, mapid){
    let url = domain + apiUrl_docuchart;

    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateplanningconnectmap',
            'docid' : docid,
            'mapid' : mapid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Loading.. Please Wait');
        },
        success: function(data){
            console.log('updateplanningconnectmap', data);
            hideLoadingReport();
        }
    });
}

function api_createPlanningDocument(docid, projectid, title, cbcomplete=()=>{}){
    let url = domain + apiUrl_docuchart;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createplanningdocument',
            'docid' : docid,
            'projectid' : projectid,
            'title' : title
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Loading.. Please Wait');
        },
        success: function(data){
            console.log('createplanningdocument', data);
            hideLoadingReport();
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function api_deletePlanningDocument(docid, projectid, cbcomplete=()=>{}){
    let url = domain + apiUrl_docuchart;

    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteplanningdocument',
            'docid' : docid,
            'projectid' : projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Loading.. Please Wait');
        },
        success: function(data){
            console.log('deleteplanningdocument', data);
            hideLoadingReport();
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function api_createPlanningTestSchedule(scheduleid, tempscheduleid, ownerid, title, cbcomplete=()=>{}){
    let url = domain + apiUrl_docuchart;

    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createplanningtestschedule',
            'scheduleid' : scheduleid,
            'tempscheduleid' : tempscheduleid,
            'ownerid' : ownerid,
            'title' : title
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Loading.. Please Wait');
        },
        success: function(data){
            console.log('createplanningtestschedule', data);
            hideLoadingReport();
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function api_fetchPlanningTestSchedule(ownerid, sender, cbcomplete=()=>{}){
    let url = domain + apiUrl_docuchart;

    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchplanningtestschedule',
            'ownerid' : ownerid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Loading.. Please Wait');
        },
        success: function(data){
            // console.log('fetchplanningtestschedule', data);
            fetchPlanningTestSchedule(data, sender);
            hideLoadingReport();
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function api_deleteTmpPlanningDocument(cbcomplete=()=>{}){
    let url = domain + apiUrl_docuchart;

    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deletetmpplanningdocument'
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Loading.. Please Wait');
        },
        success: function(data){
            console.log('deletetmpplanningdocument', data);
            hideLoadingReport();
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function api_updateScheduleIdIntoProjectId(scheduleid, projectid, cbcomplete=()=>{}){
    let url = domain + apiUrl_docuchart;

    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updatescheduleidintoprojectid',
            'scheduleid' : scheduleid,
            'projectid' : projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Loading.. Please Wait');
        },
        success: function(data){
            console.log('updatescheduleidintoprojectid', data);
            hideLoadingReport();
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function api_deletePlanningSchedule(scheduleid, cbcomplete=()=>{}){
    let url = domain + apiUrl_docuchart;

    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteplanningschedule',
            'scheduleid' : scheduleid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Loading.. Please Wait');
        },
        success: function(data){
            console.log('deleteplanningschedule', data);
            hideLoadingReport();
        },
        complete: function(){
            cbcomplete();
        }
    });
}



function fetchDocument(data, sender, options){
    console.log('HELOOOOOOO');

    console.log('HOHOHOHOHO');
}
function fetchPlanningScheduleByProjectId(data, sender, options){
    if(sender == 'task-header-search-submit'){
        console.log(data);
        $('.tasklist-widget-con').empty();
        // buildPlandocList = [];
        let list = [];
        let projectid = '';
        // const d = dateFns.format(
        //     new Date(),
        //     'YYYY-MM-DD'
        // );
        
        $.each(data, function(key, value){
            // console.log(value.name, value.ui);
            if(value != 'error'){
                // $('.tasklist-widget-con').append(`
                //     <div id="tasklist_${value.docid}" sd="${value.draftsd}" ed="${value.postapprovaled}" class="tasklist-widget color-sc">
                //         <div status="closed"  class="tasklist-widget-title">
                //             <i status="bars" class="fas fa-bars handle tasklist-widget-addtask"></i>
                //             <span>${value.title}</span>
                //             <input class="tasklist-widget-dates-draftsd" value="${value.draftsd}" type="date" disabled>
                //             <input class="tasklist-widget-dates-drafted" value="${value.drafted}" type="date" disabled>
                //             <input class="tasklist-widget-dates-reviewed" value="${value.reviewed}" type="date" disabled>
                //             <input class="tasklist-widget-dates-approveed" value="${value.approveed}" type="date" disabled>
                //             <input class="tasklist-widget-dates-executioned" value="${value.executioned}" type="date" disabled>
                //             <input class="tasklist-widget-dates-postapproveed" value="${value.postapproveed}" type="date" disabled>
                //             <i class="fas fa-edit handler-icon"></i>
                //             <i class="fas fa-link handler-icon"></i>
                //             <i class="fas fa-paperclip handler-icon"></i>
                //         </div>
                //     </div>
                // `);
                // $('.tasklist-widget').droppable(options);
                list[list.length] = {
                    'planid' : value.planningid, 
                    'title' : value.planningtitle, 
                    'mapid' : value.actualid, 
                    'draftsd' : value.draftsd,
                    'drafted' : value.drafted,
                    'reviewed' : value.reviewed,
                    'approvaled' : value.approvaled,
                    'executioned' : value.executioned,
                    'postapprovaled' : value.postapprovaled,
                    'startdate' : value.draftsd,
                    'enddate' : value.postapprovaled
                };
                projectid = value.projectid;

            }else{
                $('.tasklist-widget-con').empty();
            }
        });
        taskPlanDocList[projectid] = list; 
    }
    if(sender == 'build-header-retrieve-pull'){
        console.log(data);
        clearList(planningDocuments);

        $('.build-body-doclist-widget-con').empty();
        buildPlandocList = [];
        $.each(data, function(key, value){
            // console.log(value.name, value.ui);
            if(value != 'error'){
                $('.build-body-doclist-widget-con').append(`
                    <span docid="${value.docid}" class="build-body-doclist-widget btn-shadow">${value.title}<i class="fas fa-trash build-body-doclist-widget-delete"></i></span>
                `);
            }else{
                $('.build-body-doclist-widget-con').empty();
            }

            buildPlandocList[buildPlandocList.length] = {
                'planid' : value.docid, 
                'title' : value.title, 
                'mapid' : value.mapid, 
                'draftsd' : value.draftsd,
                'drafted' : value.drafted,
                'reviewed' : value.reviewed,
                'approvaled' : value.approvaled,
                'executioned' : value.executioned,
                'postapprovaled' : value.postapprovaled
            };

            // newDoc = new Doc(value.title);
            // newDoc.id = value.docid;

            // draft = new Stage("Draft");
            // review = new Stage("Review");
            // approval = new Stage("Approval");
            // executionStage = new Stage("Execution");
            // postApprovalStage = new Stage("Post-Approval");

            // newDoc.project = p;
            // newDoc.stage = draft;
            // draft.setNextStage(review);
            // review.setPreviousStage(draft);
            // review.setNextStage(approval);
            // approval.setPreviousStage(review);
            // approval.setNextStage(executionStage);
            // executionStage.setPreviousStage(approval);
            // executionStage.setNextStage(postApprovalStage);
            // postApprovalStage.setPreviousStage(executionStage);

            // newDoc.hasSchedule = true;
            // newDoc.retrieved = true;
            // newDoc.mapid = value.mapid;

            // draft.sd = value.draftsd;
            // draft.ed = value.drafted;
            // if(draft.sd != null && draft.ed != null){
            //     draft.days = generateDays(draft.sd, draft.ed);
            // }

            // review.sd = value.drafted;
            // review.ed = value.reviewed;
            // if(review.sd != null && review.ed != null){
            //     review.days = generateDays(review.sd, review.ed);
            // }

            // approval.sd = value.reviewed;
            // approval.ed = value.approvaled;
            // if(approval.sd != null && approval.ed != null){
            //     approval.days = generateDays(approval.sd, approval.ed);
            // }

            // executionStage.sd = value.approvaled;
            // executionStage.ed = value.executioned;
            // if(executionStage.sd != null && executionStage.ed != null){
            //     executionStage.days = generateDays(executionStage.sd, executionStage.ed);
            // }
            
            // postApprovalStage.sd = value.executioned;
            // postApprovalStage.ed = value.postapprovaled;
            // if(postApprovalStage.sd != null && postApprovalStage.ed != null){
            //     postApprovalStage.days = generateDays(postApprovalStage.sd, postApprovalStage.ed);
            // }

            // planningDocuments.push(newDoc);
            console.log("planning Documents: ", planningDocuments);

        });


    }
    if(sender == 'map-header-search-project-submit'){
        // console.log(data);
        $('.map-body-plandoc-list-con').empty();
        // mapPlandocList = [];
        $.each(data, function(key, value){
            // console.log(value.name, value.ui);
            if(value != 'error'){
                if(value.actualid == 'null' || value.actualid == null){
                    $('.map-body-plandoc-list-con').append(`
                        <div docid="${value.planningid}" class="map-body-plandoc-list-widget btn-shadow">
                            <div class="widget-details">
                            <span class="map-body-plandoc-list-widget-title">${value.planningtitle}</span>
                            <span class="map-body-plandoc-list-widget-id">${value.planningid}</span>
                            </div>
                            <div class="widget-map idle">
                                <span class="map-body-plandoc-list-widget-mapid">Not Mapped</span>
                            </div>
                        </div>
                    `);
                }else{
                    $('.map-body-plandoc-list-con').append(`
                        <div docid="${value.planningid}" class="map-body-plandoc-list-widget btn-shadow">
                            <div class="widget-details">
                            <span class="map-body-plandoc-list-widget-title">${value.planningtitle}</span>
                            <span class="map-body-plandoc-list-widget-id">${value.planningid}</span>
                            </div>
                            <div class="widget-map active">
                                <span class="map-body-plandoc-list-widget-mapid">${value.actualid}</span>
                            </div>
                        </div>
                    `);
                }
                $('.map-body-plandoc-list-widget').droppable(options);
            }else{
                $('.map-body-plandoc-list-con').empty();
            }

            mapPlandocList[mapPlandocList.length] = {'planid' : value.planningid, 'title' : value.planningtitle, 'mapid' : value.actualid};
        });
    }
    if(sender == 'pschedule-header-search-submit'){
        console.log(data);
        $('.tasklist-widget-con').empty();
        // buildPlandocList = [];
        let list = [];
        let projectid = '';
        // const d = dateFns.format(
        //     new Date(),
        //     'YYYY-MM-DD'
        // );
        
        $.each(data, function(key, value){
            // console.log(value.name, value.ui);
            if(value != 'error'){
                // $('.tasklist-widget-con').append(`
                //     <div id="tasklist_${value.docid}" sd="${value.draftsd}" ed="${value.postapprovaled}" class="tasklist-widget color-sc">
                //         <div status="closed"  class="tasklist-widget-title">
                //             <i status="bars" class="fas fa-bars handle tasklist-widget-addtask"></i>
                //             <span>${value.title}</span>
                //             <input class="tasklist-widget-dates-draftsd" value="${value.draftsd}" type="date" disabled>
                //             <input class="tasklist-widget-dates-drafted" value="${value.drafted}" type="date" disabled>
                //             <input class="tasklist-widget-dates-reviewed" value="${value.reviewed}" type="date" disabled>
                //             <input class="tasklist-widget-dates-approveed" value="${value.approveed}" type="date" disabled>
                //             <input class="tasklist-widget-dates-executioned" value="${value.executioned}" type="date" disabled>
                //             <input class="tasklist-widget-dates-postapproveed" value="${value.postapproveed}" type="date" disabled>
                //             <i class="fas fa-edit handler-icon"></i>
                //             <i class="fas fa-link handler-icon"></i>
                //             <i class="fas fa-paperclip handler-icon"></i>
                //         </div>
                //     </div>
                // `);
                // $('.tasklist-widget').droppable(options);
                list[list.length] = {
                    'planid' : value.planningid, 
                    'title' : value.planningtitle, 
                    'mapid' : value.actualid, 
                    'draftsd' : value.draftsd,
                    'drafted' : value.drafted,
                    'reviewed' : value.reviewed,
                    'approvaled' : value.approvaled,
                    'executioned' : value.executioned,
                    'postapprovaled' : value.postapprovaled,
                    'startdate' : value.draftsd,
                    'enddate' : value.postapprovaled
                };
                projectid = value.projectid;

            }else{
                $('.tasklist-widget-con').empty();
            }
        });
        pschedulePlanDocList[projectid] = list; 
    }
}
function fetchDocumentsConnectedToProjectUpdated(data, sender){
    if(sender == 'status-board'){
        console.log('Data Retrieved');
        console.log(data);

        clearList(planningDocuments);
        clearList(actualDocuments);

        var i;

        for(i =0; i<data.length;i++){
            var newDoc = new Doc(data[i].planningtitle);
            var draft;
            var review;
            var approval;
            var executionStage;
            var postApprovalStage;

            // var sel = document.getElementById("statusBoard-selProjectList");
            // var projectIndex = searchProject(sel.value);
            // var p = new Project(allProjects[projectIndex][0],allProjects[projectIndex][1],allProjects[projectIndex][2]);
            
            newDoc.linkid = data[i].linkid;
            newDoc.linkstage = data[i].linkstage;

            draft = new Stage("Draft");
            review = new Stage("Review");
            approval = new Stage("Approval");
            executionStage = new Stage("Execution");
            postApprovalStage = new Stage("Post-Approval");

            // newDoc.project = p;
            newDoc.id = data[i].planningid;
            newDoc.stage = draft;
            
            draft.setNextStage(review);
            review.setPreviousStage(draft);
            review.setNextStage(approval);
            approval.setPreviousStage(review);
            approval.setNextStage(executionStage);
            executionStage.setPreviousStage(approval);
            executionStage.setNextStage(postApprovalStage);
            postApprovalStage.setPreviousStage(executionStage);

            draft.sd = data[i].draftsd;
            draft.ed = data[i].drafted;
            if(draft.sd != null && draft.ed != null){
                draft.days = generateDays(draft.sd, draft.ed);
            }

            review.sd = data[i].drafted;
            review.ed = data[i].reviewed;
            if(review.sd != null && review.ed != null){
                review.days = generateDays(review.sd, review.ed);
            }

            approval.sd = data[i].reviewed;
            approval.ed = data[i].approvaled;
            if(approval.sd != null && approval.ed != null){
                approval.days = generateDays(approval.sd, approval.ed);
            }

            executionStage.sd = data[i].approvaled;
            executionStage.ed = data[i].executioned;
            if(executionStage.sd != null && executionStage.ed != null){
                executionStage.days = generateDays(executionStage.sd, executionStage.ed);
            }
            
            postApprovalStage.sd = data[i].executioned;
            postApprovalStage.ed = data[i].postapprovaled;
            if(postApprovalStage.sd != null && postApprovalStage.ed != null){
                postApprovalStage.days = generateDays(postApprovalStage.sd, postApprovalStage.ed);
            }
            
            // console.log("Actualid: ", actualid);
            // if document is mapped
            if(data[i].actualid != null){
                newDoc.actualid = data[i].actualid;
                newDoc.actualtitle = data[i].actualtitle;
                newDoc.ownerid = data[i].ownerid;

                draft.timestamp = data[i].proofreadstamp;
                review.timestamp = data[i].reviewstamp;
                approval.timestamp = data[i].approvestamp;
                postApprovalStage.timestamp = data[i].postapprovestamp;
                
                if (data[i].status == 'draft'){
                    newDoc.status = draft;
                }else if (data[i].status == 'review'){
                    newDoc.status = review;
                }else if (data[i].status == 'approve'){
                    newDoc.status = approval;
                }else if (data[i].status == 'execution'){
                    newDoc.status = executionStage;
                }else if (data[i].status == 'postapprove'){
                    newDoc.status = postApprovalStage;
                }
                
                actualDocuments.push(newDoc);
            }
            planningDocuments.push(newDoc);

        }
        
    }
    
    if(sender == 'build-schedule'){
        console.log('Data Retrieved');
        console.log(data);

        clearList(planningDocuments);

        var i;

        $('.build-body-doclist-widget-con').empty();

        for(i =0; i<data.length;i++){
            var newDoc = new Doc(data[i].planningtitle);
            var draft;
            var review;
            var approval;
            var executionStage;
            var postApprovalStage;

            // var sel = document.getElementById("statusBoard-selProjectList");
            // var projectIndex = searchProject(sel.value);
            // var p = new Project(allProjects[projectIndex][0],allProjects[projectIndex][1],allProjects[projectIndex][2]);
            
            newDoc.linkid = data[i].linkid;
            newDoc.linkstage = data[i].linkstage;
            newDoc.producessorid = data[i].producessorid;
            newDoc.producessorstage = data[i].producessorstage;
            

            draft = new Stage("Draft");
            review = new Stage("Review");
            approval = new Stage("Approval");
            executionStage = new Stage("Execution");
            postApprovalStage = new Stage("Post-Approval");

            // newDoc.project = p;
            newDoc.id = data[i].planningid;
            newDoc.stage = draft;
            
            draft.setNextStage(review);
            review.setPreviousStage(draft);
            review.setNextStage(approval);
            approval.setPreviousStage(review);
            approval.setNextStage(executionStage);
            executionStage.setPreviousStage(approval);
            executionStage.setNextStage(postApprovalStage);
            postApprovalStage.setPreviousStage(executionStage);

            draft.sd = data[i].draftsd;
            draft.ed = data[i].drafted;
            if(draft.sd != null && draft.ed != null){
                draft.days = dateFns.differenceInCalendarDays(
                    Date.parse(draft.ed),
                    Date.parse(draft.sd)
                );
            }

            review.sd = data[i].drafted;
            review.ed = data[i].reviewed;
            if(review.sd != null && review.ed != null){
                review.days = dateFns.differenceInCalendarDays(
                    Date.parse(review.ed),
                    Date.parse(review.sd)
                );
            }

            approval.sd = data[i].reviewed;
            approval.ed = data[i].approvaled;
            if(approval.sd != null && approval.ed != null){
                approval.days = dateFns.differenceInCalendarDays(
                    Date.parse(approval.ed),
                    Date.parse(approval.sd)
                );
            }

            executionStage.sd = data[i].approvaled;
            executionStage.ed = data[i].executioned;
            if(executionStage.sd != null && executionStage.ed != null){
                executionStage.days = dateFns.differenceInCalendarDays(
                    Date.parse(executionStage.ed),
                    Date.parse(executionStage.sd)
                );
            }
            
            postApprovalStage.sd = data[i].executioned;
            postApprovalStage.ed = data[i].postapprovaled;
            if(postApprovalStage.sd != null && postApprovalStage.ed != null){
                postApprovalStage.days = dateFns.differenceInCalendarDays(
                    Date.parse(postApprovalStage.ed),
                    Date.parse(postApprovalStage.sd)
                );
            }
            
            // adds documents on the GUI
            $('.build-body-doclist-widget-con').append(`
                <span docid="${newDoc.id}" class="build-body-doclist-widget btn-shadow">${newDoc.name}<i class="fas fa-trash build-body-doclist-widget-delete"></i></span>
            `);

            planningDocuments.push(newDoc);
            // console.log(planningDocuments);
        }
        
    }
}
function fetchDocumentLinks(data, sender){
    if(sender == 'planning'){
        // console.log("data: ", data);
        
        if(data.length > 0){
            var index = searchDocumentArray(planningDocuments, data[0].docid, 'docname');
            var i;
            if (index != -1){
                let doc = planningDocuments[index];

                for(i=0;i<data.length;i++){
                    let newLink = new Link();
                    let docIndex = searchDocumentArray(planningDocuments, data[i].docid, 'docName');
                    newLink.stage = data[i].stage;
                    newLink.id = data[i].linkid;
                    newLink.docid = data[i].docid;
                    newLink.docname = planningDocuments[docIndex].name;
                    newLink.stage = data[i].stage;
                    newLink.date = doc.searchStage(data[i].stage).ed;
                    doc.appendLink(newLink);

                    // console.log("new Link: ", newLink);
                    
                }
                // console.log("doc: ",doc);
            }
        }
        


    }
    if(sender == 'actual'){
        // console.log("data: ", data);
        
        if(data.length > 0){
            var index = searchDocumentArray(actualDocuments, data[0].docid, 'docname');
            var i;
            if (index != -1){
                let doc = actualDocuments[index];

                for(i=0;i<data.length;i++){
                    let newLink = new Link();
                    let docIndex = searchDocumentArray(actualDocuments, data[i].docid, 'docName');
                    newLink.stage = data[i].stage;
                    newLink.id = data[i].linkid;
                    newLink.docid = data[i].docid;
                    newLink.docname = actualDocuments[docIndex].name;
                    newLink.stage = data[i].stage;
                    newLink.date = doc.searchStage(data[i].stage).ed;
                    doc.appendLink(newLink);

                    // console.log("new Link: ", newLink);
                    
                }
                // console.log("doc: ",doc);
            }
        }
        


    }


}

function fetchActualDocument(data, sender){
    if(sender == 'pull-actual-documents'){
        // console.log("inside function");
        
        var i;
        var newDoc;
        var draft;
        var review;
        var approval;
        var executionStage;
        var postApprovalStage;

        // var elms = document.getElementById("boardDisplayProjects").getElementsByTagName("label");
        // var p = new Project(elms[0].innerHTML,elms[1].innerHTML,elms[2].innerHTML);

        clearList(actualDocuments);

        for(i=0;i<data.length;i++){
            draft = new Stage("Draft");
            review = new Stage("Review");
            approval = new Stage("Approval");
            executionStage = new Stage("Execution");
            postApprovalStage = new Stage("Post-Approval");

            
            // retrieved data attributes
            // d.docid, d.title, pd.draftsd, pd.drafted, pd.reviewed, pd.approvaled, pd.executioned, pd.postapprovaled, 
            // d.ownerid, d.status, d.draftstamp, d.proofreadstamp, d.reviewstamp, d.approvestamp, d.postapprovestamp

            newDoc = new Doc(data[i].title);

            newDoc.hasSchedule = true;
            newDoc.retrieved = true;
            // newDoc.project = p;
            newDoc.stage = draft;

            newDoc.id = data[i].docid;
            newDoc.ownerid = data[i].ownerid;
            newDoc.mapid = data[i].mapid;

            if (data[i].status == 'draft'){
                newDoc.status = draft;
            }else if (data[i].status == 'review'){
                newDoc.status = review;
            }else if (data[i].status == 'approve'){
                newDoc.status = approval;
            }else if (data[i].status == 'execution'){
                newDoc.status = executionStage;
            }else if (data[i].status == 'postapprove'){
                newDoc.status = postApprovalStage;
            }

            draft.setNextStage(review);
            review.setPreviousStage(draft);
            review.setNextStage(approval);
            approval.setPreviousStage(review);
            approval.setNextStage(executionStage);
            executionStage.setPreviousStage(approval);
            executionStage.setNextStage(postApprovalStage);
            postApprovalStage.setPreviousStage(executionStage);
            
            draft.sd = data[i].draftsd;
            draft.ed = data[i].drafted;
            draft.timestamp = data[i].proofreadstamp;
            // takes the proof-read stamp 
            if(draft.sd != null && draft.ed != null){
                draft.days = generateDays(draft.sd, draft.ed);
            }

            review.sd = data[i].drafted;
            review.ed = data[i].reviewed;
            review.timestamp = data[i].reviewstamp;
            if(review.sd != null && review.ed != null){
                review.days = generateDays(review.sd, review.ed);
            }

            approval.sd = data[i].reviewed;
            approval.ed = data[i].approvaled;
            approval.timestamp = data[i].approvestamp;
            if(approval.sd != null && approval.ed != null){
                approval.days = generateDays(approval.sd, approval.ed);
            }

            executionStage.sd = data[i].approvaled;
            executionStage.ed = data[i].executioned;
            if(executionStage.sd != null && executionStage.ed != null){
                executionStage.days = generateDays(executionStage.sd, executionStage.ed);
            }
            
            postApprovalStage.sd = data[i].executioned;
            postApprovalStage.ed = data[i].postapprovaled;
            postApprovalStage.timestamp = data[i].postapprovestamp;
            if(postApprovalStage.sd != null && postApprovalStage.ed != null){
                postApprovalStage.days = generateDays(postApprovalStage.sd, postApprovalStage.ed);
            }

            // actualDocuments.push(newDoc);
            ACTUAL_DOCUMENTS.addNewDoc(newDoc);
        }
        // console.log("Actual Documents List: ", actualDocuments);
        
    }
}

function searchPlanningDocument(data, sender){
    console.log(data, sender);
    if(sender == 'map-header-search-project-submit'){
        $('.map-body-plandoc-list-con').empty();
        $.each(data, function(key, value){
            if(value != 'error'){
                $('.map-body-plandoc-list-con').append(`
                    <div docid="${value.docid}" prid="${value.projectid}" doctitle="${value.title}" mapid="${value.mapid}"
                     class="map-body-plandoc-list-widget btn-shadow">
                        <span class="map-body-plandoc-list-widget-title">${value.title}</span>
                        <span class="map-body-plandoc-list-widget-id">${value.docid}</span>
                    </div>
                `);
            }
        });
    }
}
function fetchPlanningTestSchedule(data, sender){
    // console.log(data, sender);
    if(sender == 'nav-build'){
        $.each(data, function(key, value){
            if(value != 'error'){
                $('#build-header-retrieve-project-con').append(`
                    <option value="${value.scheduleid}">TEST - ${value.title}</option>
                `);
            }else{
                // showNotification('Alert', 'You are not connected to any Project Right now.');
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
    if(sender == 'cidSchedule'){
        $('#pschedule-header-search-projectlist').empty();
        $.each(data, function(key, value){
            if(value != 'error'){
                $('#pschedule-header-search-projectlist').append(`
                    <option value="${value.scheduleid}">TEST - ${value.title}</option>
                `);
            }else{
                // showNotification('Alert', 'You are not connected to any Project Right now.');
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
   
}


function fetchSchedule(data, sender){

    if(sender == 'fetch-build-schedule'){
        // console.log("Brijesh - inside fetch-build-schedule function");
        clearList(planningDocuments);
        // clearList(PLANNING_DOCUMENTS);
        
        console.log("Fetched Planning Data: ", data);

        $('.tasklist-widget-con').empty();

        var i;
        for(i=0; i<data.length; i++){

            if(data[i].planningid == 'nst' || data[i].planningtitle != null){
                    
                var index = searchPlanningId(data[i].planningid);
                // var index = PLANNING_DOCUMENTS.searchDocById(data[i].planningid);
                
                var newDoc;
                
                if(index == -1){
                    // console.log("UNIQUE: " + value.planningid + "|" + value.planningtitle);
                    
                    newDoc = new Doc(data[i].planningtitle);
                    newDoc.id = data[i].planningid;
                     
                    newDoc.milestone = data[i].milestone;

                    draft = new Stage("Draft");
                    review = new Stage("Review");
                    approval = new Stage("Approval");
                    executionStage = new Stage("Execution");
                    postApprovalStage = new Stage("Post-Approval");

                    // newDoc.project = p;
                    newDoc.stage = draft;
                    draft.setNextStage(review);
                    review.setPreviousStage(draft);
                    review.setNextStage(approval);
                    approval.setPreviousStage(review);
                    approval.setNextStage(executionStage);
                    executionStage.setPreviousStage(approval);
                    executionStage.setNextStage(postApprovalStage);
                    postApprovalStage.setPreviousStage(executionStage);

                    draft.sd = data[i].draftsd;
                    draft.ed = data[i].drafted;
                    if(draft.sd != null && draft.ed != null){
                        draft.days = generateDays(draft.sd, draft.ed);
                    }
                    review.sd = data[i].drafted;
                    review.ed = data[i].reviewed;
                    if(review.sd != null && review.ed != null){
                        review.days = generateDays(review.sd, review.ed);
                    }
                    approval.sd = data[i].reviewed;
                    approval.ed = data[i].approvaled;
                    if(approval.sd != null && approval.ed != null){
                        approval.days = generateDays(approval.sd, approval.ed);
                    }
                    executionStage.sd = data[i].approvaled;
                    executionStage.ed = data[i].executioned;
                    if(executionStage.sd != null && executionStage.ed != null){
                        executionStage.days = generateDays(executionStage.sd, executionStage.ed);
                    }
                    postApprovalStage.sd = data[i].executioned;
                    postApprovalStage.ed = data[i].postapprovaled;
                    if(postApprovalStage.sd != null && postApprovalStage.ed != null){
                        postApprovalStage.days = generateDays(postApprovalStage.sd, postApprovalStage.ed);
                    }

                    // newDoc.hasSchedule = true;
                    // newDoc.retrieved = true;

                    newDoc.linkid = data[i].linkid;
                    newDoc.linkstage = data[i].linkstage;
                    newDoc.producessorid = data[i].producessorid;
                    newDoc.producessorstage = data[i].producessorstage;
                    // if mapped then fill in actualid and actualtitle slots
                    if(data[i].actualid != null || data[i].actualid != '' || data[i].actualid != undefined){
                        newDoc.actualid = data[i].actualid;
                        newDoc.actualtitle = data[i].actualtitle;
                    }
                    
                    planningDocuments.push(newDoc);
                    // PLANNING_DOCUMENTS.addNewDoc(newDoc);
                    
                    if(newDoc.id == "nst"){
                        $('.tasklist-widget-con').append(`
                        <div id="tasklist_nst" class="tasklist-widget color-sc">
                            <div status="closed" class="tasklist-widget-title">
                                <i status="bars" class="fas fa-bars handle tasklist-widget-addtask"></i>
                                <span>Non Specified Task</span>
                            </div>
                        </div>`);
                        $('.tasklist-widget').droppable(docListDropOption);
                    }else{
                        let ed = '';
                        if(postApprovalStage.ed != null && postApprovalStage.ed != undefined){
                            ed = postApprovalStage.ed;
                        }else{
                            ed = approval.ed;
                        }

                        if(data[i].milestone != 'true'){
                            $('.tasklist-widget-con').append(`
                                <div id="tasklist_${newDoc.id}" sd="${draft.sd}"  ed="${ed}" class="tasklist-widget color-sc">
                                    <div status="closed"  class="tasklist-widget-title">
                                        <i status="bars" class="fas fa-bars handle tasklist-widget-addtask"></i>
                                        <span for="scales" id = '${newDoc.id}'><input type="checkbox" name="schedulehandler" class="tasklist-widget-title-documenthandler"><i class="far fa-star idle" status="idle"></i>${newDoc.name}</span>
                                        <input class="tasklist-widget-dates-draftsd editable first" value="${draft.sd}" type="date" disabled>
                                        <input class="tasklist-widget-dates-drafted editable" value="${draft.ed}" type="date" disabled>
                                        <input class="tasklist-widget-dates-reviewed editable" value="${review.ed}" type="date" disabled>
                                        <input class="tasklist-widget-dates-approveed editable" value="${approval.ed}" type="date" disabled>
                                        <input class="tasklist-widget-dates-executioned editable" value="${executionStage.ed}" type="date" disabled>
                                        <input class="tasklist-widget-dates-postapproveed editable" value="${postApprovalStage.ed}" type="date" disabled>
                                    </div>
                                </div>
                            `);
                        }else{
                            $('.tasklist-widget-con').append(`
                                <div id="tasklist_${newDoc.id}" sd="${draft.sd}"  ed="${ed}" class="tasklist-widget color-sc">
                                    <div status="closed"  class="tasklist-widget-title">
                                        <i status="bars" class="fas fa-bars handle tasklist-widget-addtask"></i>
                                        <span for="scales" id = '${newDoc.id}'><input type="checkbox" name="schedulehandler" class="tasklist-widget-title-documenthandler"><i class="fas fa-star active" status="active"></i>${newDoc.name}</span>
                                        <input class="tasklist-widget-dates-draftsd editable first" value="${draft.sd}" type="date" disabled>
                                        <input class="tasklist-widget-dates-drafted editable" value="${draft.ed}" type="date" disabled>
                                        <input class="tasklist-widget-dates-reviewed editable" value="${review.ed}" type="date" disabled>
                                        <input class="tasklist-widget-dates-approveed editable" value="${approval.ed}" type="date" disabled>
                                        <input class="tasklist-widget-dates-executioned editable" value="${executionStage.ed}" type="date" disabled>
                                        <input class="tasklist-widget-dates-postapproveed editable" value="${postApprovalStage.ed}" type="date" disabled>
                                    </div>
                                </div>
                            `);

                        }

                        $('.tasklist-widget').droppable(docListDropOption);
                    }

                }else{
                    newDoc = planningDocuments[index];
                    // newDoc = index;
                }

                if(data[i].taskname != null){
                    var newTask = new Task(data[i].taskname);
                    newTask.id = data[i].taskid;
                    newTask.status = data[i].taskstatus;
                    newTask.sd = data[i].tasksd;
                    newTask.ed = data[i].tasked;
                    // console.log("new task: ", newTask);
                    newDoc.appendTask(newTask);

                    let projectid = "";
                    let hours_pre = "";
                    let total_hours = "";
                    let counter = 0;
                    $(`#tasklist_${newDoc.id}`).append(`
                    <div id="${newTask.id}" planid="${newDoc.id}" projectid="${projectid}" name="${newTask.name}" class="tasklist-widget-task">
                        <input value="${newTask.name}" type="text" class="tasklist-widget-task-name-i">
                        <span class="tasklist-widget-task-name-s">${newTask.name}  <div><span class="totalhours">${hours_pre} ${total_hours} Hours</span><span class="counter">${counter}</span></div></span>
                        <input class="tasklist-widget-date-start" value="${newTask.sd}" type="date" max="${newDoc.searchStage("Post-Approval").ed}" disabled>
                        <input class="tasklist-widget-date-end" value="${newTask.ed}" type="date" max="${newDoc.searchStage("Post-Approval").ed}" disabled>
                        <i class="fas fa-user-plus tasklist-widget-icon-resources"></i>
                        <i class="fas fa-clipboard-list tasklist-widget-icon-clipboard"></i>
                        <i status="edit" class="fas fa-edit tasklist-widget-icon-edit"></i>
                        <i class="fas fa-trash tasklist-widget-icon-delete"></i>
                    </div>
                    `);
                }
                
                    
            }    


        }

        console.log('Planning Documents: ', planningDocuments);
        // console.log(planningDocuments[9]);

        $('.tasklist-widget-task').hide();
    }
    if(sender == 'fetch-new-project-schedule'){
        let list = [];
        $.each(data, function(key, value){
            if(value != 'error'){
                // console.log("Value: ", value);
                list = {
                    'projectid' : value.projectid,
                    'planningid' : value.planningid, 
                    'planningtitle' : value.planningtitle, 
                    'draftsd' : value.draftsd,
                    'drafted' : value.drafted,
                    'reviewed' : value.reviewed,
                    'approvaled' : value.approvaled,
                    'executioned' : value.executioned,
                    'postapprovaled' : value.postapprovaled,
                    'startdate' : value.draftsd,
                    'enddate' : value.postapprovaled,
                    'linkid' : value.linkid,
                    'linkstage' : value.linkstage,
                    'predecessorid' : value.producessorid,
                    'predecessorstage' : value.producessorstage,
                    // 'milestone' : milestone
                    
                };
                let newDoc = new NewDoc(list);
                SCHEDULE_DOCUMENTS.addNewDoc(newDoc);
            }
        });
    }
    if(sender == 'test'){
        console.log('test sucessfull. Data Retrieved');
        console.log(data);
    }


}

function fetchTaskResources(data, sender){
    if(sender == 'build-task'){
        console.log("Resouces Retrieved");

        var i;

        for(i=0; i<data.length;i++){
            var index = searchDocumentArray(planningDocuments, data[i].planningid, 'docname');

            if(index > -1){
                var d = planningDocuments[index];
                var t = d.searchTask(data[i].taskid);

                if(t != undefined){
                    
                    var r = new Resource(data.id);
                    r.taskid = data[i].taskid;
                    r.type = data[i].type;
                    r.hours = data[i].hours;
                    r.accountid = data[i].accid;
                    r.supplierid = data[i].supplierid;
                    r.suggestedsd = data[i].suggesteddate;
                    r.assignment = data[i].assignment;
                    r.usercomment = data[i].usercomment;
                    r.userread = data[i].usrread;
                    r.pmcomment = data[i].pmcomment;
                    r.pmread = data[i].pmread;
                
                    t.appendResource(r);
                }

            
            }
        }
        console.log("planningDocuments: ", planningDocuments);
    }
}

function fetchDocumentPredecessors(data, sender){
    if(sender == 'fetch-pred'){
        console.log('data: ', data);
        let length = data.length;
        if(length >0){
            
            $('.document-pred-form-document-list').empty();
            $('#choose-preds-stage').val(data[0].stage);
            $('#choose-preds-stage').attr('disabled', 'disabled');
            $('#preds-btn-select-stage').attr('disabled', 'disabled');
                        
            var doc = planningDocuments[searchDocumentArray(planningDocuments, data[0].docid, 'docname')];
            var i;
            for(i=0;i<length;i++){
                let tmpDoc = planningDocuments[searchDocumentArray(planningDocuments, data[i].preddocid, 'docname')];

                let newPred = new Producessor();
                newPred.id = data[i].producessorid;
                newPred.docid = data[i].preddocid;
                newPred.stage = data[i].stage;
                newPred.docname = tmpDoc.name;
                newPred.date = tmpDoc.searchStage(data[i].stage).ed;
                
                doc.appendProducessor(newPred);

                $('.document-preds-form-document-list').append(`<span id = "${newPred.docname}">${newPred.docname}<span id = "pred-document-trash">${newPred.date}<i class="fas fa-trash"></i></span></span>`);
                        
            }

        }
    }
}
function fetchPlanningDocument(data, sender){
    if(sender == 'pull-planning-documents'){
        var i;
        var newDoc;
        var draft;
        var review;
        var approval;
        var executionStage;
        var postApprovalStage;

        for(i=0;i<data.length;i++){
            draft = new Stage("Draft");
            review = new Stage("Review");
            approval = new Stage("Approval");
            executionStage = new Stage("Execution");
            postApprovalStage = new Stage("Post-Approval");

            newDoc = new Doc(data[i].title);

            newDoc.stage = draft;
            newDoc.id = data[i].docid;
            newDoc.mapid = data[i].mapid;
            newDoc.milestone = data[i].milestone;

            // 
            // pc.projectid, pd.docid, pc.title, pc.mapid, pd.milestone, 
            // pd.draftsd, pd.drafted, pd.reviewed, pd.approvaled, pd.executioned, pd.postapprovaled
            if (data[i].status == 'draft'){
                newDoc.status = draft;
            }else if (data[i].status == 'review'){
                newDoc.status = review;
            }else if (data[i].status == 'approve'){
                newDoc.status = approval;
            }else if (data[i].status == 'execution'){
                newDoc.status = executionStage;
            }else if (data[i].status == 'postapprove'){
                newDoc.status = postApprovalStage;
            }

            draft.setNextStage(review);
            review.setPreviousStage(draft);
            review.setNextStage(approval);
            approval.setPreviousStage(review);
            approval.setNextStage(executionStage);
            executionStage.setPreviousStage(approval);
            executionStage.setNextStage(postApprovalStage);
            postApprovalStage.setPreviousStage(executionStage);
            
            draft.sd = data[i].draftsd;
            draft.ed = data[i].drafted;
            // takes the proof-read stamp 
            if(draft.sd != null && draft.ed != null){
                draft.days = generateDays(draft.sd, draft.ed);
            }

            review.sd = data[i].drafted;
            review.ed = data[i].reviewed;
            if(review.sd != null && review.ed != null){
                review.days = generateDays(review.sd, review.ed);
            }

            approval.sd = data[i].reviewed;
            approval.ed = data[i].approvaled;
            if(approval.sd != null && approval.ed != null){
                approval.days = generateDays(approval.sd, approval.ed);
            }

            executionStage.sd = data[i].approvaled;
            executionStage.ed = data[i].executioned;
            if(executionStage.sd != null && executionStage.ed != null){
                executionStage.days = generateDays(executionStage.sd, executionStage.ed);
            }
            
            postApprovalStage.sd = data[i].executioned;
            postApprovalStage.ed = data[i].postapprovaled;
            if(postApprovalStage.sd != null && postApprovalStage.ed != null){
                postApprovalStage.days = generateDays(postApprovalStage.sd, postApprovalStage.ed);
            }

            PLANNING_DOCUMENTS.addNewDoc(newDoc);
        }
        // console.log("Actual Documents List: ", actualDocuments);
        
    }
}

















function capi_fetchPlanningSchedules(projectid,  cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_docuchart;

    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchplanningschedules',
            'projectid': projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Retrieving Schedule..');
        },
        success: function(data){
            cbsuccess(data);
            // fetchSchedule(data, sender);
        },
        complete : function(){
            cbcomplete();
            hideLoadingReport();
        }
    });
}
function capi_updatePlanningScheduleByDocId (docid,draftsd,drafted,reviewed,approvaled,executioned,postapprovaled, linkid, linkstage, producessorid, producessorstage)
{
    let url = domain + apiUrl_docuchart;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateplanningschedulebydocid',
            'docid' : docid,
            'draftsd' : draftsd,
            'drafted' : drafted,
            'reviewed' : reviewed,
            'approvaled' : approvaled,
            'executioned' : executioned,
            'postapprovaled' : postapprovaled,
            'linkid' : linkid,
            'linkstage' : linkstage,
            'producessorid' : producessorid,
            'producessorstage' : producessorstage
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Saving Schedule.. Please Wait');

        },
        success: function(data){
            console.log("Sucess: ", data); 
            hideLoadingReport();
        }
    });
}
function capi_fetchBuildSchedule(projectid, cbsuccess=()=>{}, cbcomplete=()=>{} ){
    let url = domain + apiUrl_docuchart;

    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchbuildschedule',
            'projectid' : projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Retrieving Schedules.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
        },
        complete: function(){
            cbcomplete();
            hideLoadingReport();
        }
    });
}
function capi_fetchProjectDocuments(projid, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_docuchart;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchprojectdocuments',
            'projid' : projid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Retrieving Documents.. Please Wait');
        },
        success: function(data){
            console.log(data);
            cbsuccess(data);
        },
        complete: function(){
            cbcomplete();
            hideLoadingReport();
        }
    });
}
function capi_createPlanningDocumentLink(options, cbsuccess=()=>{}, cbcomplete=()=>{} ){
    let url = domain + apiUrl_docuchart;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createplanningdocumentlink',
            'linkid' : options.linkid,
            'docid' : options.planningid,
            'stage' : options.linkstage
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Link.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
        },
        complete: function(data){
            cbcomplete(data);
            hideLoadingReport();
        }
    });
}
function capi_deleteDocumentLink(obj, cbsuccess=()=>{}){
    let url = domain + apiUrl_docuchart;

    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deletedocumentlink',
            'linkid': obj.linkid,
            'docid': obj.docid,
            'stage' : obj.stage
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Link..');
        },
        success: function(data){
            hideLoadingReport();
            cbsuccess();
        }
    });
}
function capi_updateMilestone(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_docuchart;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updatemilestone',
            'docid' : options.docid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Milestone.. Please Wait');

        },
        success: function(data){
            cbsuccess(data);
        },
        complete: function(){
            cbcomplete();
            hideLoadingReport();
        }
    });
}
function capi_deleteMilestone(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_docuchart;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deletemilestone',
            'docid' : options.docid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Removing Milestone.. Please Wait');

        },
        success: function(data){
            cbsuccess(data);
        },
        complete: function(){
            cbcomplete();
            hideLoadingReport();
        }
    });
}
























































function capi_fetchPlanningDocumentPredecessor(options, cbsuccess=()=>{}){
    let url = domain + apiUrl_docuchart;

    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchplanningdocumentproducessor',
            'docid' : options.docid,
            'predid' : options.predecessorid
            
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Loading Predecessors.. Please Wait');
        },
        success: function(data){
            console.log(data);
            cbsuccess(data);
            hideLoadingReport();
        }
    });
}
function capi_createPlanningDocumentPredecessor(options, cbcomplete=()=>{}){
    let url = domain + apiUrl_docuchart;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createplanningdocumentpredecessor',
            'docid' : options.docid,
            'predid' : options.predecessorid,
            'stage' : options.stage,
            'preddocid' : options.preddocid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Adding Predecessor.. Please Wait');
        },
        success: function(data){
            console.log(data);
        },
        complete: function(data){
            cbcomplete();
            hideLoadingReport();
        }
    });
}
function capi_deletePlanningDocumentPredecessor(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_docuchart;

    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteplanningdocumentpredecessor',
            'docid' : options.docid,
            'predid' : options.predecessorid,
            'stage' : options.stage,
            'preddocid' : options.preddocid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Predecessor..');
        },
        success: function(data){
            cbsuccess();
            // hideLoadingReport();
        },
        complete: function(data){
            cbcomplete();
            hideLoadingReport();
        }
        
    });
}