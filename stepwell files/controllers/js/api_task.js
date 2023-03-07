let apiUrl_task = `api/api_task.php`;

function api_createTask(taskid, projectid, planid, taskname, startdate, enddate, cbsuccess=()=>{}){
    let url = domain + apiUrl_task;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createtask',
            'taskid' : taskid,
            'projectid' : projectid,
            'planid' : planid,
            'taskname' : taskname,
            'startdate' : startdate,
            'enddate' : enddate
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Task.. Please Wait');
        },
        success: function(data){
            console.log('createtask: ',data); 
            cbsuccess(data);
            hideLoadingReport();
        }
    });
}
function api_deleteTask(taskid, cbsuccess=()=>{}){
    let url = domain + apiUrl_task;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deletetask',
            'taskid' : taskid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Task.. Please Wait');
        },
        success: function(data){
            console.log('deletetask: ',data); 
            cbsuccess(data);
             hideLoadingReport();
        }
    });
}
function api_fetchTaskByProjectid(projectid, sender, options={}, cbcomplete=()=>{}){
    let url = domain + apiUrl_task;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchtaskbyprojectid',
            'projectid' : projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Task.. Please Wait');
        },
        success: function(data){
            // console.log('createAccount: ',data); 
            hideLoadingReport();
            fetchTaskByProjectid(data, sender, options)
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function api_updateTaskDates(taskid, startdate, enddate, cbsuccess=()=>{}){
    let url = domain + apiUrl_task;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updatetaskdates',
            'taskid' : taskid,
            'startdate' : startdate,
            'enddate' : enddate
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Task.. Please Wait');
        },
        success: function(data){
            console.log('updatetaskdates: ',data); 
            cbsuccess(data);
             hideLoadingReport();
        }
    });
}
function api_createTaskResource(id, taskid, type, projectid, supplierid, accid, hours, planid, cbsuccess=()=>{}){
    let url = domain + apiUrl_task;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createtaskresource',
            'id' : id,
            'taskid' : taskid,
            'type' : type,
            'projectid' : projectid,
            'supplierid' : supplierid,
            'accid' : accid,
            'hours' : hours,
            'planid' : planid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Task Resource.. Please Wait');
        },
        success: function(data){
            console.log('createtaskresource: ',data); 
            cbsuccess(data);
            hideLoadingReport();
        }
    });
}

function api_fetchTaskResourceByPlanId(planid, sender, options={}, cbcomplete=()=>{}){
    let url = domain + apiUrl_task;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchtaskresourcebyplanid',
            'planid' : planid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Task.. Please Wait');
        },
        success: function(data){
            // console.log('createAccount: ',data); 
            hideLoadingReport();
            fetchTaskResourceByPlanId(data, sender, options);
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function api_fetchTaskResourceByProjectId(projectid, sender, options={}, cbcomplete=()=>{}){
    let url = domain + apiUrl_task;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchtaskresourcebyprojectid',
            'projectid' : projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Task.. Please Wait');
        },
        success: function(data){
            // console.log('createAccount: ',data); 
            hideLoadingReport();
            fetchTaskResourceByProjectId(data, sender, options);
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function api_updateTaskResourceColumn(id, columnname, value, cbsuccess=()=>{}){
    let url = domain + apiUrl_task;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updatetaskresourcecolumn',
            'id' : id,
            'columnname' : columnname,
            'value' : value
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Task.. Please Wait');
        },
        success: function(data){
            console.log('updatetaskresourcecolumn: ',data); 
            cbsuccess(data);
            hideLoadingReport();
        }
    });
}
function api_updatePMComment(taskid, message, cbsuccess=()=>{}){
    let url = domain + apiUrl_task;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updatepmcomment',
            'taskid' : taskid,
            'message' : message
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Task.. Please Wait');
        },
        success: function(data){
            console.log('updatepmcomment: ',data); 
            cbsuccess(data);
            hideLoadingReport();
        }
    });
}
function api_updateTaskResourceColumnByTaskId(taskid, columnname, value, cbsuccess=()=>{}){
    let url = domain + apiUrl_task;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updatetaskresourcecolumnbytaskid',
            'taskid' : taskid,
            'columnname' : columnname,
            'value' : value
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Task.. Please Wait');
        },
        success: function(data){
            console.log('updatetaskresourcecolumnbytaskid: ',data); 
            cbsuccess(data);
            hideLoadingReport();
        }
    });
}



function fetchTaskByProjectid(data, sender, options){
    // console.log('fetchTaskByProjectid',data, sender, options);
    // if(sender == 'task-header-filter-project-submit'){
    //     // console.log('test');
    //     taskList = [];
    //     $.each(data, function(key, value){
    //         if(value != 'error'){

    //             taskList[taskList.length] = {
    //                 'taskid' : value.taskid,
    //                 'projectid' : value.projectid,
    //                 'planid' : value.planid,
    //                 'taskname' : value.taskname,
    //                 'startdate' : value.startdate,
    //                 'enddate' : value.enddate
    //             };
    //         }
    //     });
    // }
    if(sender == 'task-header-search-submit'){
        // console.log(data);
        taskList = [];
        $.each(data, function(key, value){
            if(value != 'error'){
                // console.log(value);
                taskList[taskList.length] = {
                    'taskid' : value.taskid,
                    'projectid' : value.projectid,
                    'planid' : value.planid,
                    'status' : value.status,
                    'taskname' : value.taskname,
                    'startdate' : value.startdate,
                    'enddate' : value.enddate
                };
            }
        });
    }
    if(sender == 'taskboard-header-search-submit'){
        taskboardTaskList = [];
        $.each(data, function(key, value){
            if(value != 'error'){
                // console.log(value);
                taskboardTaskList[taskboardTaskList.length] = {
                    'taskid' : value.taskid,
                    'projectid' : value.projectid,
                    'planid' : value.planid,
                    'status' : value.status,
                    'taskname' : value.taskname,
                    'startdate' : value.startdate,
                    'enddate' : value.enddate
                };
            }
        });
    }
    if(sender == 'pschedule-header-search-submit'){
        // console.log(data);
        pscheduleList = [];
        $.each(data, function(key, value){
            if(value != 'error'){
                // console.log(value);
                pscheduleList[pscheduleList.length] = {
                    'taskid' : value.taskid,
                    'projectid' : value.projectid,
                    'planid' : value.planid,
                    'status' : value.status,
                    'taskname' : value.taskname,
                    'startdate' : value.startdate,
                    'enddate' : value.enddate
                };
            }
        });
    }
    

}
function fetchTaskResourceByPlanId(data, sender, options){
    // console.log('fetchTaskResourceByPlanId',data, sender, options);
    if(sender == 'tasklist-widget-title'){
        taskResouceList = [];
        $.each(data, function(key, value){
            if(value != 'error'){
                taskResouceList[taskResouceList.length] = {
                    'id' : value.id,
                    'taskid' : value.taskid,
                    'type' : value.type,
                    'projectid' : value.projectid,
                    'planid' : value.planid,
                    'supplierid' : value.supplierid,
                    'accid' : value.accid,
                    'hours' : value.hours,
                    'status' : value.status,
                    'suggesteddate' : value.suggesteddate,
                    'assignment' : value.assignment,
                    'usercomment' : value.usercomment,
                    'pmcomment' : value.pmcomment,
                    'usrread' : value.usrread,
                    'pmread' : value.pmread,
                    'firstname' : value.firstname,
                    'lastname' : value.lastname,
                    'suppliername' : value.suppliername,
                };
            }
        });
    }
    if(sender == 'pschedulelist-widget-title'){
        pscheduleResouceList = [];
        $.each(data, function(key, value){
            if(value != 'error'){
                pscheduleResouceList[pscheduleResouceList.length] = {
                    'id' : value.id,
                    'taskid' : value.taskid,
                    'type' : value.type,
                    'projectid' : value.projectid,
                    'planid' : value.planid,
                    'supplierid' : value.supplierid,
                    'accid' : value.accid,
                    'hours' : value.hours,
                    'status' : value.status,
                    'suggesteddate' : value.suggesteddate,
                    'assignment' : value.assignment,
                    'usercomment' : value.usercomment,
                    'pmcomment' : value.pmcomment,
                    'usrread' : value.usrread,
                    'pmread' : value.pmread,
                    'firstname' : value.firstname,
                    'lastname' : value.lastname,
                    'suppliername' : value.suppliername,
                };
            }
        });
    }
}
function fetchTaskResourceByProjectId(data, sender, options){
    // console.log('fetchTaskResourceByProjectId',data, sender, options);
    if(sender == 'taskboard-header-search-submit'){
        taskboardResouceList = [];
        $.each(data, function(key, value){
            if(value != 'error'){
                taskboardResouceList[taskboardResouceList.length] = {
                    'id' : value.id,
                    'taskid' : value.taskid,
                    'type' : value.type,
                    'projectid' : value.projectid,
                    'planid' : value.planid,
                    'supplierid' : value.supplierid,
                    'accid' : value.accid,
                    'hours' : value.hours,
                    'status' : value.status,
                    'suggesteddate' : value.suggesteddate,
                    'assignment' : value.assignment,
                    'usercomment' : value.usercomment,
                    'pmcomment' : value.pmcomment,
                    'usrread' : value.usrread,
                    'pmread' : value.pmread,
                    'firstname' : value.firstname,
                    'lastname' : value.lastname,
                    'suppliername' : value.suppliername
                };
            }
        });
    }
    
}





function capi_createTask(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_task;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createtask',
            'taskid' : options.taskid,
            'projectid' : options.projectid,
            'planid' : options.planid,
            'taskname' : options.taskname,
            'startdate' : options.startdate,
            'enddate' : options.enddate
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Task.. Please Wait');
        },
        success: function(data){
            console.log('createtask: ',data); 
            cbsuccess(data);
        },
        complete: function(){
            cbcomplete();
            hideLoadingReport();
        }
    });
}
function capi_createTaskResource(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_task;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createtaskresource',
            'id' : options.trid,
            'taskid' : options.taskid,
            'type' : options.type,
            'projectid' : options.projectid,
            'planid' : options.planid,
            'supplierid' : options.supplierid,
            'accid' : options.accid,
            'hours' : options.hours
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Task Resource.. Please Wait');
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
function capi_fetchTaskResourceByProjectId(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_task;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchtaskresourcebyprojectid',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Task.. Please Wait');
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
function capi_fetchTaskByProjectid(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_task;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchtaskbyprojectid',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Task.. Please Wait');
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
function capi_fetchTaskResourceByPlanId(planid, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_task;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchtaskresourcebyplanid',
            'planid' : planid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Task.. Please Wait');
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
function capi_updateTaskResourceColumnById(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_task;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updatetaskresourcecolumnbyid',
            'trid' : options.trid,
            'columnname' : options.columnname,
            'value' : options.value
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Task.. Please Wait');
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
function capi_updatePMComment(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_task;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updatepmcomment',
            'taskid' : options.taskid,
            'message' : options.message
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Task.. Please Wait');
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
function capi_updateTaskResourceColumnByTaskId(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_task;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updatetaskresourcecolumnbytaskid',
            'taskid' : options.taskid,
            'columnname' : options.columnname,
            'value' : options.value
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Task.. Please Wait');
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
function capi_updateTaskDates(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_task;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updatetaskdates',
            'taskid' : options.taskid,
            'startdate' : options.startdate,
            'enddate' : options.enddate
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Task.. Please Wait');
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
function capi_updateTaskResourceColumnByTaskidAndAccid(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_task;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updatetaskresourcecolumnbytaskidandaccid',
            'taskid' : options.taskid,
            'accid' : options.accid,
            'columnname' : options.columnname,
            'value' : options.value
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Task.. Please Wait');
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
function capi_updateTaskColumn(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_task;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updatetaskcolumn',
            'taskid' : options.taskid,
            'columnname' : options.columnname,
            'value' : options.value
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Task.. Please Wait');
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
function capi_deleteTask(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_task;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deletetask',
            'taskid' : options.taskid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Task.. Please Wait');
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
function capi_deleteTaskResource(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_task;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deletetaskresource',
            'id' : options.id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Task Resource.. Please Wait');
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


function capi_fetchTaskResourceByPlanIdUpdated(planid, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_task;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchtaskresourcebyplanidupdated',
            'planid' : planid
        },
        dataType: 'json',
        beforeSend: function(){
            // console.log("planning id: ", planid);
            showLoadingReport('Fetching Task.. Please Wait');
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

