let apiUrl_project = `import/api/api_project.php`;



function api_createProject(projectid, projectname, owner, companyid, reference, cbsuccess=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createproject',
            'projectid' : projectid,
            'projectname' : projectname,
            'owner' : owner,
            'companyid' : companyid,
            'reference' : reference
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
            console.log(data); 
            hideLoadingReport();
        }
    });
}
function api_updateProject(projectid, projectname){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateproject',
            'projectid' : projectid,
            'projectname' : projectname
        },
        beforeSend: function(){
            showLoadingReport('Updating Project.. Please Wait');
        },
        dataType: 'json',
        success: function(data){
            console.log(data); 
            hideLoadingReport();
        }
    });
}
function api_deleteProject(projectid){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteproject',
            'projectid' : projectid,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Project.. Please Wait');
        },
        success: function(data){
            console.log(data); 
            hideLoadingReport();
        }
    });
}
function api_fetchProjectsByOwner(owner, sender, cbsuccess=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchprojectsbyowner',
            'owner' : owner
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Project.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
            // console.log(data); 
            fetchProjects(data, sender);
            hideLoadingReport();
        }
    });
}
function api_fetchProjectsByProjectId(projectid, sender){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchprojectsbyprojectid',
            'projectid' : projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Project.. Please Wait');
        },
        success: function(data){
            console.log(data); 
            fetchProjects(data, sender);
            hideLoadingReport();
        }
    });
}
function api_fetchProjectByConnect(id, sender, cbcomplete=()=>{}, cbsuccess=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchprojectbyconnect',
            'id' : id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Project.. Please Wait');
        },
        success: function(data){
            // console.log(data); 
            cbsuccess(data);
            fetchProjectByConnect(data, sender);
            hideLoadingReport();
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function api_createProjectConnect(projectid, id){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createprojectconnect',
            'projectid' : projectid,
            'id' : id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Connection.. Please Wait');
        },
        success: function(data){
            console.log(data); 
            hideLoadingReport();
        }
    });
}
function api_fetchProjectConnectByProjectId(projectid, sender){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchprojectconnectbyprojectid',
            'projectid' : projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Project Connections.. Please Wait');
        },
        success: function(data){
            // console.log(data); 
            fetchProjectConnectByProjectId(data, sender);
            hideLoadingReport();
        }
    });
}
function api_removeProjectConnect(id, projectid){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'removeprojectconnect',
            'id' : id,
            'projectid' : projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Removing Project Connection.. Please Wait');
        },
        success: function(data){
            console.log(data); 
            hideLoadingReport();
        }
    });
}
function api_createProjectProduct(productid, projectid, productname){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createprojectproduct',
            'productid' : productid,
            'projectid' : projectid,
            'productname' : productname
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Product.. Please Wait');
        },
        success: function(data){
            console.log(data); 
            hideLoadingReport();
        }
    });
}
function api_updateProjectProduct(productid, productname){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateprojectproduct',
            'productid' : productid,
            'productname' : productname
        },
        beforeSend: function(){
            showLoadingReport('Updating Project Product.. Please Wait');
        },
        dataType: 'json',
        success: function(data){
            console.log(data); 
            hideLoadingReport();
        }
    });
}
function api_deleteProjectProduct(productid){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteprojectproduct',
            'productid' : productid,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Project Product.. Please Wait');
        },
        success: function(data){
            console.log(data); 
            hideLoadingReport();
        }
    });
}
function api_fetchProjectProduct(projectid, sender){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchprojectproduct',
            'projectid' : projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Project Product.. Please Wait');
        },
        success: function(data){
            fetchProjectProduct(data, sender);
            hideLoadingReport();
        }
    });
}
function api_updateProjectInfo(projectid, columnname, value){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateprojectinfo',
            'projectid' : projectid,
            'columnname' : columnname,
            'value' : value
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Project Info.. Please Wait');
        },
        success: function(data){
            console.log('updateprojectinfo', data); 
            hideLoadingReport();
        }
    });
}
function api_fetchProjectInfo(projectid, sender, cbbfore, cbcomplete){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchprojectinfo',
            'projectid' : projectid
        },
        dataType: 'json',
        beforeSend: function(){
            cbbfore();
            showLoadingReport('Fetching Project Info.. Please Wait');
        },
        success: function(data){
            fetchProjectInfo(data, sender);
        },
        complete: function(){
            cbcomplete();
            hideLoadingReport();
        }
    });
}
function api_fetchProjectInfoColumn(projectid, colname, sender, cbbfore, cbcomplete){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchprojectinfocolumn',
            'projectid' : projectid,
            'colname' : colname
        },
        dataType: 'json',
        beforeSend: function(){
            cbbfore();
            showLoadingReport('Fetching Project Info.. Please Wait');
        },
        success: function(data){
            fetchProjectInfoColumn(data, sender);
        },
        complete: function(){
            cbcomplete();
            hideLoadingReport();
        }
    });
}
function api_fetchProjectbyCompanyId(comid, sender){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchprojectbycompanyid',
            'comid' : comid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Project.. Please Wait');
        },
        success: function(data){
            // console.log(data); 
            fetchProjectbyCompanyId(data, sender);
            hideLoadingReport();
        }
    });
}

function api_createProjectRegister(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createprojectregister',
            'id': options.id,
            'projectid': options.projectid,
            'ownerid': options.ownerid,
            'date': options.date,
            'time': options.time,
            'subject': options.subject,
            'type': options.type,
            'mode': options.mode,
            'impact': options.impact,
            'impdescription': options.impdescription,
            'description': options.description
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Register.. Please Wait');
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
function api_updateProjectRegister(options, cbsuccess=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateprojectregister',
            'id': options.id,
            'date': options.date,
            'time': options.time,
            'subject': options.subject,
            'type': options.type,
            'mode': options.mode,
            'impact': options.impact,
            'impdescription': options.impdescription,
            'description': options.description
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Project Register.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
            console.log(data); 
        },
        complete: function(){
            hideLoadingReport();
        }
    });
}
function api_deleteProjectRegister(options, cbsuccess=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteprojectregister',
            'id': options.id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Project Register.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
            console.log(data); 
            hideLoadingReport();
        }
    });
}
function api_fetchProjectRegisterByOwnerId(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchprojectregisterbyownerid',
            'projectid': options.projectid,
            'ownerid': options.ownerid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Project Register.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
            // console.log(data); 
            hideLoadingReport();
        },
        complete: function(){
            cbcomplete();
        }
    });
}


function api_createProjectMinutes(options, cbsuccess=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createprojectminutes',
            'id': options.id,
            'partid': options.partid,
            'projectid': options.projectid,
            'ownerid': options.ownerid,
            'date': options.date,
            'time': options.time,
            'subject': options.subject,
            'type': options.type,
            'mode': options.mode,
            'location': options.location,
            'attendees': options.attendees,
            'responsible': options.responsible,
            'respotype': options.respotype,
            'respohours': options.respohours,
            'due': options.due,
            'description': options.description
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Minutes.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
            console.log(data); 
            hideLoadingReport();
        }
    });
}




function fetchProjects(data, sender){
    if(sender == 'nav-projects-manage'){
        $('#project-manage-list').empty();
        $.each(data, function(key, value){
            if(value != 'error'){
                $('#project-manage-list').append(`<span prid="${value.projectid}"  class="project-manage-list-widget btn-shadow" style="color: white; background-color: ${BTN_COLOR}" >${value.projectname}</span>`);
            }else{
                // alert('You have not set up your positions. Please add positions first before creating new users.');
                showNotification('Alert', 'You are not connected to any Project Right now.');
            }
        });
    }
}
function fetchProjectByConnect(data, sender){
    // console.log(data);
    if(sender == 'nav-projects-manage'){
        let x = 0;
        $('#project-manage-list').empty();
        $.each(data, function(key, value){
            if(value != 'error'){
                $('#project-manage-list').append(`<span prid="${value.projectid}" fn="${value.firstname}" ln="${value.lastname}" ph="${value.photo}" ow="${value.ownerid}" class="project-manage-list-widget btn-shadow" style="color: white; background-color: ${BTN_COLOR}" >${value.projectname}</span>`);
                project_manage_list[x] = [value.projectid, value.projectname, value.ownerid, value.firstname, value.lastname, value.photo];
                x++;
            }else{
                showNotification('Alert', 'You are not connected to any Project Right now.');
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
    if(sender == 'fetchGroupById'){
        
        // console.log('1', data);
        $.each(data, function(key, value){
            if(value != 'error'){
                let x = Object.size(project_manage_list);
                let gate = false;
                // console.log(x, value.projectid);
                for(i=0; i<x; i++){
                    if(project_manage_list[i][0] == value.projectid){
                        // console.log(value.projectid, value.projectname, 'is already there');
                        gate = false;
                        break;
                    }else{
                        gate = true;
                    }
                }

                if(gate){
                    $('#project-manage-list').append(`<span prid="${value.projectid}" fn="${value.firstname}" ln="${value.lastname}" ph="${value.photo}" ow="${value.ownerid}" class="project-manage-list-widget btn-shadow" style="color: white; background-color: ${BTN_COLOR}" >${value.projectname}</span>`);
                    project_manage_list[group_allconnected_list] = [value.projectid, value.projectname, value.ownerid, value.firstname, value.lastname, value.photo];
                    group_allconnected_list++;
                }

            }else{
                // console.log('fetchGroupById error');
                // showNotification('Alert', 'You are not connected to any Project Right now.');
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
    if(sender == 'fetchAllConnectedProjects'){
        // console.log('2', data);
        $.each(data, function(key, value){
            if(value != 'error'){
                $('#project-manage-list').append(`<span prid="${value.projectid}" fn="${value.firstname}" ln="${value.lastname}" ph="${value.photo}" ow="${value.ownerid}" class="project-manage-list-widget btn-shadow" style="color: white; background-color: ${BTN_COLOR}" >${value.projectname}</span>`);
                project_manage_list[group_allconnected_list] = [value.projectid, value.projectname, value.ownerid, value.firstname, value.lastname, value.photo];
                group_allconnected_list++;
                // console.log( 'fetchAllConnectedProjects', value.projectid);
            }else{
                // console.log('fetchAllConnectedProjects error');
                // showNotification('Alert', 'You are not connected to any Project Right now.');
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
    if(sender == 'docuchart-fetchAllConnectedProjects'){
        
        $.each(data, function(key, value){
            if(value != 'error'){
                allProjects.push([value.projectid, value.projectname, value.ownerid]);
                
                // $('#project-manage-list').append(`<span prid="${value.projectid}" fn="${value.firstname}" ln="${value.lastname}" ph="${value.photo}" ow="${value.ownerid}" class="project-manage-list-widget btn-shadow">${value.projectname}</span>`);
                // project_manage_list[group_allconnected_list] = [value.projectid, value.projectname, value.ownerid, value.firstname, value.lastname, value.photo];
                // group_allconnected_list++;
                // console.log( 'fetchAllConnectedProjects', value.projectid);
            }else{
                // console.log('fetchAllConnectedProjects error');
                showNotification('Alert', 'You are not connected to any Project Right now.');
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
    if(sender == 'docuchart-fetchGroupById'){
        // console.log('2', data);
        $.each(data, function(key, value){
            if(value != 'error'){
                let x = Object.size(project_manage_list);
                let gate = false;
                // console.log(x, value.projectid);
                for(i=0; i<x; i++){
                    if(project_manage_list[i][0] == value.projectid){
                        // console.log(value.projectid, value.projectname, 'is already there');
                        gate = false;
                        break;
                    }else{
                        gate = true;
                    }
                }

                if(gate){
                    // $('#project-manage-list').append(`<span prid="${value.projectid}" fn="${value.firstname}" ln="${value.lastname}" ph="${value.photo}" ow="${value.ownerid}" class="project-manage-list-widget btn-shadow">${value.projectname}</span>`);
                    // console.log(value.projectid);
                    $('.doctest').append(`<span id="${value.projectid}" class="doctest-widget" style="color: white; background-color: ${BTN_COLOR}" >${value.projectname}</span>`);
                    project_manage_list[group_allconnected_list] = [value.projectid, value.projectname, value.ownerid, value.firstname, value.lastname, value.photo];
                    group_allconnected_list++;
                }

            }else{
                // console.log('fetchGroupById error');
                // showNotification('Alert', 'You are not connected to any Project Right now.');
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
    if(sender == 'nav-map'){
        $('#map-header-search-project-select').empty();
        $.each(data, function(key, value){
            if(value != 'error'){
                $('#map-header-search-project-select').append(`
                    <option value="${value.projectid}">${value.projectname}</option>
                `);
            }else{
                showNotification('Alert', 'You are not connected to any Project Right now.');
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
    if(sender == 'nav-create-upload'){
        $('#create-upload-con1-project-select').empty();
        $('#create-upload-con1-project-select').append(`
            <option value="na++No Project Selected">General Documentation</option>
        `);
        $.each(data, function(key, value){
            if(value != 'error'){
                $('#create-upload-con1-project-select').append(`
                    <option value="${value.projectid}++${value.projectname}">${value.projectname}</option>
                `);
            }else{
                showNotification('Alert', 'You are not connected to any Project Right now.');
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
    if(sender == 'nav-build'){
        $('#build-header-retrieve-project-con').empty();
        $('#build-header-retrieve-project-con').append(`
            <option value="test">Test Schedule</option>
        `);
        buildProjList = [];
        $.each(data, function(key, value){
            if(value != 'error'){
                $('#build-header-retrieve-project-con').append(`
                    <option value="${value.projectid}">${value.projectname}</option>
                `);
                buildProjList[buildProjList.length] = {
                    'projectid' : value.projectid,
                    'projectname' : value.projectname
                };
            }else{
                showNotification('Alert', 'You are not connected to any Project Right now.');
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
    // if(sender == 'nav-task'){
    //     $('#task-header-filter-project-select').empty();
    //     $.each(data, function(key, value){
    //         if(value != 'error'){
    //             $('#task-header-filter-project-select').append(`
    //                 <option value="${value.projectid}">${value.projectname}</option>
    //             `);

    //             taskProjList[taskProjList.length] = {
    //                 'projectid' : value.projectid,
    //                 'owner' : value.ownerid,
    //                 'projectname' : value.projectname
    //             };
    //         }else{
    //             showNotification('Alert', 'You are not connected to any Project Right now.');
    //             // alert('You have not set up your positions. Please add positions first before creating new users.');
    //         }
    //     });
    // }
    if(sender == 'nav-task'){
        $('#task-header-search-projectlist').empty();
        $.each(data, function(key, value){
            if(value != 'error'){
                $('#task-header-search-projectlist').append(`
                    <option value="${value.projectid}">${value.projectname}</option>
                `);
                $('.task-header-projectid').text(`Project Id: ${value.projectid}`).attr('prid', value.projectid).show();
                $('.task-header-ownerid').text(`Owner Id: ${value.ownerid}`).show();
            }else{
                showNotification('Alert', 'You are not connected to any Project Right now.');
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
    if(sender == 'nav-taskboard'){
        $('#taskboard-header-search-projectlist').empty();
        $.each(data, function(key, value){
            if(value != 'error'){
                $('#taskboard-header-search-projectlist').append(`
                    <option value="${value.projectid}">${value.projectname}</option>
                `);
                taskboardProjectList[taskboardProjectList.length] = {
                    'projectid' : value.projectid,
                    'projectname' : value.projectname,
                    'owner' : value.ownerid
                };
            }else{
                showNotification('Alert', 'You are not connected to any Project Right now.');
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
    if(sender == 'build-header-retrieve-pull'){
        $('#build-body-prefs-assign-projlist').empty();
        $.each(data, function(key, value){
            if(value != 'error'){
                $('#build-body-prefs-assign-projlist').append(`
                    <option value="${value.projectid}">${value.projectname}</option>
                `);
            }else{
                showNotification('Alert', 'You are not connected to any Project Right now.');
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
    if(sender == 'nav-pschedule'){
        $('#pschedule-header-search-projectlist').empty();
        $.each(data, function(key, value){
            if(value != 'error'){
                $('#pschedule-header-search-projectlist').append(`
                    <option value="${value.projectid}">${value.projectname}</option>
                `);
                $('.pschedule-header-projectid').text(`Project Id: ${value.projectid}`).attr('prid', value.projectid).show();
                $('.pschedule-header-ownerid').text(`Owner Id: ${value.ownerid}`).show();
            }else{
                showNotification('Alert', 'You are not connected to any Project Right now.');
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
    if(sender == 'docchart-cidShare'){
        $('#share-header-retrieve-project-con').empty();
        $.each(data, function(key, value){
            if(value != 'error'){
                $('#share-header-retrieve-project-con').append(`
                    <option value="${value.projectid}">${value.projectname}</option>
                `);
            }else{
                showNotification('Alert', 'You are not connected to any Project Right now.');
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
    

}
function fetchProjectProduct(data, sender){
    // console.log('fetchProjectProduct:', data, sender);
    if(sender == 'project-launch-view-prefs'){
        $('#pp1-container-productname').empty();
        $.each(data, function(key, value){
            if(value != 'error'){
                $('#pp1-container-productname').append(`<span prid="${value.productid}" style="color: white; background-color: ${BTN_COLOR}"  class="pp1-productname btn-shadow">${value.productname}</span>`);
                // project_manage_list[x] = [value.projectid, value.projectname, value.ownerid, value.firstname, value.lastname, value.photo];
            }else{
                // showNotification('Alert', 'You are not connected to any Project Right now.');
            }
        });
    }
}
function fetchProjectConnectByProjectId(data, sender){
    // if(sender == 'project-view-launch'){
    //     $('#project-launch-list').empty();
    //     let x = 0;
    //     $.each(data, function(key, value){
    //         if(value != 'error'){
    //             // if(value.id.charAt(0) == 'G'){
    //             //     // console.log('Its a Group: ' + value.id);
    //             //     api_fetchGroupInfo(value.id, 'fetchProjectConnectByProjectId');
    //             // }else{
    //             //     // console.log('Its a User: ' + value.id);
    //             //     api_getAccountInfo(value.id,'fetchProjectConnectByProjectId');
    //             // }
    //             // x++;
    //             if(value.photo != 'na'){
    //                 photo = value.photo;
    //             }else{
    //                 photo = 'lib/images/avatardefault.png';
    //             }
    //             $('#project-launch-list').append(`<span zid="${value.id}" gn=" " ph="${photo}" fn="${value.firstname}" ln="${value.lastname}" class="project-launch-list-widget btn-shadow" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};">${value.firstname} ${value.lastname}</span>`);
    //             project_launch_list[project_launch_list.length] = {'id': value.id, 'photo': photo, 'firstname': value.firstname, 'lastname': value.lastname};
    //         }else{
    //             showNotification('Alert', 'This Project is not Connected to Anyone Right Now.');
    //             // alert('You have not set up your positions. Please add positions first before creating new users.');
    //         }
    //     });
    // }
    if(sender == 'docuchat'){
        let x = 0;
        $.each(data, function(key, value){
            if(value != 'error'){
                // if(value.id.charAt(0) == 'G'){
                //     // console.log('Its a Group: ' + value.id);
                //     api_fetchGroupInfo(value.id, 'docuchat');
                // }else{
                //     // console.log('Its a User: ' + value.id);
                //     api_getAccountInfo(value.id,'docuchat');
                // }
                // x++;
                console.log(key, value);
                $('.doctest').append(`<span id="${value.id}" ph="${value.photo}" fn="${value.firstname}" ln="${value.lastname}" class="doctest-widget">${value.firstname} ${value.lastname}</span>`);
                docuchat_userlist_project[docuchat_userlist_project.length] = [value.id, value.firstname, value.lastname , value.photo];
            }else{
                showNotification('Alert', 'This Project is not Connected to Anyone Right Now.');
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
}
function fetchAllConnectedProjects(userid, sender){
    if(sender == 'nav-projects-manage'){
        group_allconnected_list = 0;
        project_manage_list = {};
        $('#project-manage-list').empty();
        api_fetchProjectByConnect(userid, 'fetchAllConnectedProjects');
        // api_fetchGroupById(userid, 'fetchAllConnectedProjects');
    }
    if(sender == 'docuchart'){
        group_allconnected_list = 0;
        project_manage_list = {};
        // $('#project-manage-list').empty();
        api_fetchProjectByConnect(userid, 'docuchart-fetchAllConnectedProjects');
        // api_fetchGroupById(userid, 'docuchart-fetchAllConnectedProjects');
    }
}
function fetchProjectInfo(data, sender){
    // console.log(data, sender);
    if(sender == 'project-launch-view-prefs'){
        $.each(data, function(key, value){
            if(value != 'error'){
                $.each(value, function(key, val){
                    if(key == 'pi_5' || key == 'pi_6' || key == 'pi_8' || key == 'pi_9' || key == 'pi_10' || key == 'pi_11' || key == 'pi_12' || key == 'pi_13' || key == 'pi_14' || key == 'pi_15'){
                        if(val == null || val == '' || val == undefined){
                            // $('.' + key).val('na');
                            if($('.' + key).is('input')){
                                $('.' + key).val('0');
                            }else if($('.' + key).is('select')){
                                $('.' + key).val('na');
                            }
                        }else{
                            $('.' + key).val(val);
                        }
                        // console.log( '.' + key, val);
                    }
                    if(key.includes('lock')){
                        // console.log(key, val);
                        if(val == 'lock'){
                            $('.' + key).removeClass('fa-unlock').addClass('fa-lock').css('color', GREEN_PALETTE).attr('status','locked');
                            $('.' + key).siblings('.pp2-widget-content').css('display', 'none');
                            $('.' + key).parent('.pp2-widget-con').animate({'min-height': '130px'}, 500);
                            $('.' + key).siblings('.pp2-sameline').children('.pp2-zicontext').css({"cursor":"not-allowed", "pointer-events":"none"});
                        }else{
                            $('.' + key).removeClass('fa-lock').addClass('fa-unlock').css('color', 'grey').attr('status','unlocked');
                            $('.' + key).siblings('.pp2-sameline').children('.pp2-zicontext').css({"pointer-events":"auto", 'cursor':'pointer'});
                        }
                    }
                    let k = key.split('_');
                    if(k.length == 3 && k[1] == '16'){
                        // console.log(key, val);
                        if(val != '' && val != undefined && val != null){
                            $('.' + key).children('.pp2-zicontext').each(function(){
                                if($(this).text().includes(val) && $(this).text() != 'partially known'){
                                    $(this).css('transform', 'scale(1.5)');
                                }else if($(this).text() == 'partially known' && val.includes('partially')){
                                    $('.pi_16_13_partial').css('transform', 'scale(1.5)');
                                }
                            });
                        }else{
                            $('.' + key).children('.pp2-zicontext').each(function(){
                                $(this).css('transform', 'scale(1)');
                            });
                        }
                    }
                    if(k.length == 4){
                        if(k[3] == 'upload'){
                            if(val != '' && val != null){
                                $('.' + key).parent('.pp2-sameline-r').children('a').remove();
                                $('.' + key).parent('.pp2-sameline-r').append(`<a href="${val}" download>Download</a>`);
                                let x = val.split('/').pop();
                                $('.' + key).val(x);
                            }
                        }else if(k[3] == 'report' || k[3] == 'link' || k[3] == 'note'){
                            if(val != '' && val != undefined && val != null){
                                $('.' + key).val(val);
                            }else{
                                $('.' + key).val('').attr('placeholder','Please Enter Desired Value');
                            }
                        }
                    }
                });
            }else{
                showNotification('Alert', 'This Project is not Connected to Anyone Right Now.');
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
    if(sender == 'project-launch-view-delete'){
        $.each(data, function(key, value){
            if(value != 'error'){
                $.each(value, function(key, val){
                    let k = key.split('_');
                    if(k.length == 4){
                        if(k[3] == 'upload'){
                            if(val != '' && val != null){
                                // console.log(val);
                                ajax_deleteSingleImage('../../' + val);
                            }
                        }
                    }
                });
            }else{
                showNotification('Alert', 'This Project is not Connected to Anyone Right Now.');
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
}
function fetchProjectInfoColumn(data, sender){
    if(sender == 'browse'){
        $.each(data, function(key, value){
            if(value != 'error'){
            //    console.log(value.url);
               ajax_deleteSingleImage('../../' + value.url);
            }else{
                // showNotification('Alert', 'You are not connected to any Project Right now.');
            }
        });
    }
}
function fetchProjectbyCompanyId(data, sender){
    console.log(data, sender);
}












function capi_fetchOverview(id, cbsuccess=()=>{}, cbcomplete=()=>{}){ // OK
    let url = domain + apiUrl_project;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchoverview',
            'id' : id
        },
        dataType: 'json',
        beforeSend: function(){
            // showLoadingReport('Fetching Project.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
        },
        complete: function(){
            // cbcomplete();
            // hideLoadingReport();
        }
    });
}

function capi_createProjectConnect(obj, cbsuccess, cbcomplete){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createprojectconnect',
            'projectid' : obj.projectid,
            'id' : obj.id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Connection.. Please Wait');
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

function capi_updateProjectStatus(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateprojectstatus',
            'projectid' : options.projectid,
            'status' : options.status
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Project.. Please Wait');
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
function capi_updateProjectOwner(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateprojectowner',
            'projectid' : options.projectid,
            'owner' : options.ownerid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Project.. Please Wait');
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
function capi_fetchProjectsByOwner(param, cbsuccess=()=>{}, cbcomplete=()=>{}){ // OK
    let url = domain + apiUrl_project;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchprojectsbyowner',
            'owner' : param.id
        },
        dataType: 'json',
        beforeSend: function(){
            // showLoadingReport('Fetching Project.. Please Wait');
        },
        success: function(data){
            // console.log("capi_fetchProjectsByOwner",data);
            cbsuccess(data);
            // hideLoadingReport();
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function capi_fetchProjectByConnect(param, cbsuccess=()=>{}, cbcomplete=()=>{}){ // OK
    let url = domain + apiUrl_project;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchprojectbyconnect',
            'id' : param.id
        },
        dataType: 'json',
        beforeSend: function(){
            // showLoadingReport('Fetching Project.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
            // hideLoadingReport();
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function capi_fetchMinutesByOwnerId(param, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchminutesbyownerid',
            'ownerid': param.ownerid,
            'projectid': param.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Project Minutes.. Please Wait');
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
function capi_fetchMinutesByProjectId(param, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchminutesbyprojectid',
            'ownerid': param.ownerid,
            'projectid': param.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Project Minutes.. Please Wait');
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
function capi_fetchProjectConnectByProjectId(param, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchprojectconnectbyprojectid',
            'projectid' : param.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Project Connections.. Please Wait');
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
function capi_updateProjectMinutes(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateprojectminutes',
            'id': options.id,
            'date': options.date,
            'time': options.time,
            'subject': options.subject,
            'type': options.type,
            'mode': options.mode,
            'location': options.location,
            'attendees': options.attendees,
            'responsible': options.responsible,
            'respotype': options.respotype,
            'respohours': options.respohours,
            'due': options.due,
            'description': options.description
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Minutes.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
            hideLoadingReport();
        },
        complete: function(){
            cbcomplete();
            hideLoadingReport();
        }
    });
}
function capi_deleteProjectMinutes(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteprojectminutes',
            'id': options.id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Project Minutes.. Please Wait');
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
function capi_createProjectTimesheet(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createprojecttimesheet',
            'id': options.id,
            'projectid': options.projectid,
            'ownerid': options.ownerid,
            'taskid': options.taskid,
            'date': options.date,
            'hours': options.hours
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Minutes.. Please Wait');
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
function capi_fetchProjectTimesheetByProjectid(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchprojecttimesheetbyprojectid',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
        },
        success: function(data){
            cbsuccess(data);
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function capi_deleteProjectTimesheet(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteprojecttimesheet',
            'id': options.id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Project Minutes.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
            console.log(data); 
        },
        complete: function(){
            cbcomplete();
            hideLoadingReport();
        }
    });
}
function capi_fetchProjectsBySuperiorId(options, cbsuccess=()=>{}, cbcomplete=()=>{}){ // OK
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchprojectsbysuperiorid',
            'accid' : options.accid
        },
        dataType: 'json',
        beforeSend: function(){
            // console.log('-----///////-----before send api call');
            showLoadingReport('Fetching Project.. Please Wait');
        },
        success: function(data){
            // console.log('success api call----------------------',data);
            cbsuccess(data);
        },
        complete: function(data){
            // console.log('//////////////////////completing api call', data);
            cbcomplete();
            hideLoadingReport();
        }
    });
}


function capi_createProjectRequest(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createprojectrequest',
            'requestid' : options.requestid,
            'projectid' : options.projectid,
            'name' : options.name,
            'score' : options.score,
            'description' : options.description,
            'location1' : options.location1,
            'location2' : options.location2,
            'requestor' : options.requestor,
            'manager' : options.manager,
            'sponsor' : options.sponsor
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Request.. Please Wait');
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
function capi_updateProjectRequest(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateprojectrequest',
            'requestid' : options.requestid,
            'name' : options.name,
            'score' : options.score,
            'description' : options.description,
            'location1' : options.location1,
            'location2' : options.location2,
            'requestor' : options.requestor,
            'manager' : options.manager,
            'sponsor' : options.sponsor
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Project Request.. Please Wait');
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
function capi_updateProjectRequestStatus(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateprojectrequeststatus',
            'projectid' : options.projectid,
            'status' : options.status
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Project Request.. Please Wait');
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
function capi_deleteProjectRequest(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteprojectrequest',
            'requestid' : options.requestid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Project Request.. Please Wait');
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
function capi_fetchProjectRequestByProjectid(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchprojectrequestbyprojectid',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Project Request.. Please Wait');
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

function capi_createProject(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createproject',
            'projectid' : options.projectid,
            'projectname' : options.projectname,
            'owner' : options.owner,
            'creator' : options.creator,
            'companyid' : options.companyid,
            'reference' : options.reference
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project.. Please Wait');
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

function capi_createProjectRequestTechnical(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createprojectrequesttechnical',
            'requestid' : options.requestid,
            'projectid' : options.projectid,
            'desc_1' : options.desc_1,
            'desc_2' : options.desc_2,
            'desc_3' : options.desc_3,
            'desc_4_1' : options.desc_4_1,
            'desc_4_2' : options.desc_4_2,
            'prior_1' : options.prior_1,
            'prior_2' : options.prior_2,
            'prior_3' : options.prior_3,
            'prior_4' : options.prior_4,
            'prior_5' : options.prior_5,
            'prior_6' : options.prior_6,
            'prior_7' : options.prior_7,
            'prior_8' : options.prior_8,
            'strat_1' : options.strat_1,
            'strat_2' : options.strat_2
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Request Technical.. Please Wait');
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
function capi_fetchProjectRequestTechnical(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchprojectrequesttechnical',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Project Request.. Please Wait');
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
function capi_createRequestTechnicalAdd(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createrequesttechnicaladd',
            'id' : options.id,
            'requestid' : options.requestid,
            'projectid' : options.projectid,
            'type' : options.type,
            'subject' : options.subject,
            'param' : options.param,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Request Technical.. Please Wait');
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
function capi_deleteRequestTechnicalAdd(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleterequesttechnicaladd',
            'id' : options.id,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Request Technical.. Please Wait');
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
function capi_fetchRequestTechAddByProjectId(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchrequesttechaddbyprojectid',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Project Request.. Please Wait');
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

function capi_createProjectRequestConnect(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createProjectRequestConnect',
            'id' : options.id,
            'projectid' : options.projectid,
            'accid' : options.accid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Request Connect.. Please Wait');
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
function capi_deleteProjectRequestConnect(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteProjectRequestConnect',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Request Connect.. Please Wait');
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
function capi_updateProjectRequestConnectStatus(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateProjectRequestConnectStatus',
            'id' : options.id,
            'status' : options.status,
            'notes' : options.notes
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Request Connect.. Please Wait');
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
function capi_updateProjectRequestConnectStatusByProjectId(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateProjectRequestConnectStatusByProjectId',
            'projectid' : options.projectid,
            'status' : options.status
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Project Request Connect.. Please Wait');
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
function capi_fetchProjectRequestConnectByProjectId(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchProjectRequestConnectByProjectId',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Request Connect.. Please Wait');
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
function capi_fetchProjectRequestConnectByAccid(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchProjectRequestConnectByAccid',
            'accid' : options.accid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Request Connect.. Please Wait');
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
function capi_fetchInactiveProjectbyAccid(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchInactiveProjectbyAccid',
            'accid' : options.accid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Request Connect.. Please Wait');
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



function capi_createProjectItemCategory(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createProjectItemCategory',
            'id' : options.id,
            'projectid' : options.projectid,
            'name' : options.name
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_deleteProjectItemCategory(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteProjectItemCategory',
            'id' : options.id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_fetchProjectItemCategory(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchProjectItemCategory',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_createProjectItem(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createProjectItem',
            'id' : options.id,
            'projectid' : options.projectid,
            'categoryid' : options.categoryid,
            'code' : options.code,
            'name' : options.name,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_deleteProjectItem(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteProjectItem',
            'id' : options.id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_fetchProjectItem(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchProjectItem',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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


function capi_createProjectBudget(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createProjectBudget',
            'id' : options.id,
            'projectid' : options.projectid,
            'itemid' : options.itemid,
            'type' : options.type,
            'capexcost' : options.capexcost,
            'opexcost' : options.opexcost,
            'vendor' : options.vendor
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_deleteProjectBudget(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteProjectBudget',
            'id' : options.id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_fetchProjectBudget(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchProjectBudget',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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

function capi_createProjectBudgetLumpsum(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createProjectBudgetLumpsum',
            'id' : options.id,
            'budgetid' : options.budgetid,
            'projectid' : options.projectid,
            'name' : options.name,
            'payment' : options.payment
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_deleteProjectBudgetLumpsum(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteProjectBudgetLumpsum',
            'id' : options.id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_fetchProjectBudgetLumpsum(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchProjectBudgetLumpsum',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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

function capi_createProjectBudgetMaterial(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createProjectBudgetMaterial',
            'id' : options.id,
            'budgetid' : options.budgetid,
            'projectid' : options.projectid,
            'name' : options.name,
            'unit' : options.unit,
            'quantity' : options.quantity,
            'price' : options.price
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_deleteProjectBudgetMaterial(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteProjectBudgetMaterial',
            'id' : options.id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_fetchProjectBudgetMaterial(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchProjectBudgetMaterial',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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

function capi_createProjectBudgetMilestone(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createProjectBudgetMilestone',
            'id' : options.id,
            'projectid' : options.projectid,
            'budgetid' : options.budgetid,
            'resourceid' : options.resourceid,
            'milestoneid' : options.milestoneid,
            'name' : options.name,
            'value' : options.value
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_deleteProjectBudgetMilestoneByMilestoneId(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteProjectBudgetMilestoneByMilestoneId',
            'milestoneid' : options.milestoneid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_fetchProjectBudgetMilestone(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchProjectBudgetMilestone',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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

function capi_createProjectBudgetManhours(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createProjectBudgetManhours',
            'id' : options.id,
            'budgetid' : options.budgetid,
            'projectid' : options.projectid,
            'name' : options.name,
            'role' : options.role,
            'hours' : options.hours,
            'rate' : options.rate
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_deleteProjectBudgetManhours(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteProjectBudgetManhours',
            'id' : options.id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_updateProjectBudgetExpense(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateProjectBudgetExpense',
            'id' : options.id,
            'weeks' : options.weeks,
            'trips' : options.trips,
            'distance' : options.distance,
            'distancerate' : options.distancerate,
            'triphours' : options.triphours,
            'triphoursrate' : options.triphoursrate,
            'fixedrate' : options.fixedrate
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_fetchProjectBudgetManhours(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchProjectBudgetManhours',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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

function capi_createProjectBudgetAForecast(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createProjectBudgetAForecast',
            'id' : options.id,
            'projectid' : options.projectid,
            'resourceid' : options.resourceid,
            'year' : options.year,
            'type' : options.type,
            'm1' : options.m1,
            'm2' : options.m2,
            'm3' : options.m3,
            'm4' : options.m4,
            'm5' : options.m5,
            'm6' : options.m6,
            'm7' : options.m7,
            'm8' : options.m8,
            'm9' : options.m9,
            'm10' : options.m10,
            'm11' : options.m11,
            'm12' : options.m12,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_fetchProjectBudgetAForecast(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchProjectBudgetAForecast',
            'projectid' : options.projectid,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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

function capi_createProjectRequestLock(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createProjectRequestLock',
            'id' : options.id,
            'projectid' : options.projectid,
            'api' : options.api,
            'parameter' : options.parameter,
            'type' : options.type,
            'operation' : options.operation,
            'description' : options.description
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_deleteProjectRequestLockByProjectId(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteProjectRequestLockByProjectId',
            'projectid' : options.projectid,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_deleteProjectRequestLock(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteProjectRequestLock',
            'id' : options.id,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_fetchProjectRequestLock(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchProjectRequestLock',
            'projectid' : options.projectid,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_updateProjectRequestLockstatus(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateProjectRequestLockstatus',
            'projectid' : options.projectid,
            'lockstatus' : options.lockstatus,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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


function capi_createProjectInvoice(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createProjectInvoice',
            'id' : options.id,
            'projectid' : options.projectid,
            'supplierid' : options.supplierid,
            'budgetid' : options.budgetid,
            'invoicedate' : options.invoicedate,
            'invoicedetail' : options.invoicedetail,
            'invoicenumber' : options.invoicenumber,
            'exchangerate' : options.exchangerate
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_updateProjectInvoiceAttachment(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateProjectInvoiceAttachment',
            'id' : options.id,
            'attachment' : options.attachment,
            'filename' : options.filename
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_fetchProjectInvoice(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchProjectInvoice',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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



function capi_createProjectInvoiceExpense(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createProjectInvoiceExpense',
            'id' : options.id,
            'projectid' : options.projectid,
            'invoiceid' : options.invoiceid,
            'resourceid' : options.resourceid,
            'weeks' : options.weeks,
            'trips' : options.trips,
            'distance' : options.distance,
            'distancerate' : options.distancerate,
            'triphours' : options.triphours,
            'triphoursrate' : options.triphoursrate,
            'fixedrate' : options.fixedrate,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_updateProjectInvoiceExpense(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateProjectInvoiceExpense',
            'id' : options.id,
            'weeks' : options.weeks,
            'trips' : options.trips,
            'distance' : options.distance,
            'distancerate' : options.distancerate,
            'triphours' : options.triphours,
            'triphoursrate' : options.triphoursrate,
            'fixedrate' : options.fixedrate,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_fetchProjectInvoiceExpense(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchProjectInvoiceExpense',
            'projectid' : options.projectid,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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

function capi_createProjectInvoiceManhours(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createProjectInvoiceManhours',
            'id' : options.id,
            'projectid' : options.projectid,
            'invoiceid' : options.invoiceid,
            'resourceid' : options.resourceid,
            'hours' : options.hours,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_updateProjectInvoiceManhours(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateProjectInvoiceManhours',
            'id' : options.id,
            'hours' : options.hours,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_fetchProjectInvoiceManhours(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchProjectInvoiceManhours',
            'projectid' : options.projectid,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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


function capi_createProjectInvoiceLumpsum(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createProjectInvoiceLumpsum',
            'id':options.id,
            'projectid':options.projectid,
            'invoiceid':options.invoiceid,
            'milestoneid':options.milestoneid,
            'amount':options.amount
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Invoice Lumpsum.. Please Wait');
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
function capi_updateProjectInvoiceLumpsum(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateProjectInvoiceLumpsum',
            'id' : options.id,
            'amount' : options.amount
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_fetchProjectInvoiceLumpsum(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchProjectInvoiceLumpsum',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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

function capi_createProjectInvoiceMaterial(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createProjectInvoiceMaterial',
            'id':options.id,
            'projectid':options.projectid,
            'invoiceid':options.invoiceid,
            'materialid':options.materialid,
            'amount':options.amount
            
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Invoice Lumpsum.. Please Wait');
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
function capi_updateProjectInvoiceMaterial(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateProjectInvoiceMaterial',
            'id' : options.id,
            'amount' : options.amount
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_fetchProjectInvoiceMaterial(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchProjectInvoiceMaterial',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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


function capi_createProjectInvoiceMilestone(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createProjectInvoiceMilestone',
            'id':options.id,
            'projectid':options.projectid,
            'invoiceid':options.invoiceid,
            'milestoneid':options.milestoneid,
            'resourceid':options.resourceid,
            'hours':options.hours,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Invoice Lumpsum.. Please Wait');
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
function capi_updateProjectInvoiceMilestone(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateProjectInvoiceMilestone',
            'id' : options.id,
            'hours' : options.hours
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_fetchProjectInvoiceMilestone(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchProjectInvoiceMilestone',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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

function capi_createProjectInvoiceForecast(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createProjectInvoiceForecast',
            'id' : options.id,
            'projectid' : options.projectid,
            'resourceid' : options.resourceid,
            'year' : options.year,
            'type' : options.type,
            'm1' : options.m1,
            'm2' : options.m2,
            'm3' : options.m3,
            'm4' : options.m4,
            'm5' : options.m5,
            'm6' : options.m6,
            'm7' : options.m7,
            'm8' : options.m8,
            'm9' : options.m9,
            'm10' : options.m10,
            'm11' : options.m11,
            'm12' : options.m12
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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
function capi_fetchProjectInvoiceForecast(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchProjectInvoiceForecast',
            'projectid' : options.projectid,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Item.. Please Wait');
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

function capi_createProjectBudgetUpload(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    console.log('commencing upload', options);
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createProjectBudgetUpload',
            'id' : options.id,
            'projectid' : options.projectid,
            'budgetid' : options.budgetid,
            'link' : options.link,
            'filename' : options.filename,
            'costing' : options.costing
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Budget Upload.. Please Wait');
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
function capi_deleteProjectBudgetUpload(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteProjectBudgetUpload',
            'id' : options.id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Project Budget Upload.. Please Wait');
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
function capi_fetchProjectBudgetUpload(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchProjectBudgetUpload',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Project Budget Upload.. Please Wait');
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

function capi_createProjectPrereq(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createProjectPrereq',
            'id' : options.id,
            'projectid' : options.projectid,
            'name' : options.name,
            'status' : options.status,
            'docnum' : options.docnum,
            'comments' : options.comments
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Prerequisite.. Please Wait');
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
function capi_deleteProjectPrereq(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteProjectPrereq',
            'id' : options.id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Project Prerequisite.. Please Wait');
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
function capi_fetchProjectPrereq(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchProjectPrereq',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Project Prerequisite.. Please Wait');
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
function capi_updateProjectPrereq(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateProjectPrereq',
            'id' : options.id,
            'name' : options.name,
            'status' : options.status,
            'docnum' : options.docnum,
            'comments' : options.comments
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Project Prerequisite.. Please Wait');
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


function capi_createProjectInvoiceUpload(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createProjectInvoiceUpload',
            'id' : options.id,
            'projectid' : options.projectid,
            'invoiceid' : options.invoiceid,
            'link' : options.link,
            'filename' : options.filename,
            'costing' : options.costing
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Budget Upload.. Please Wait');
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
function capi_deleteProjectInvoiceUpload(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteProjectInvoiceUpload',
            'id' : options.id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Project Budget Upload.. Please Wait');
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
function capi_fetchProjectInvoiceUpload(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchProjectInvoiceUpload',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Project Budget Upload.. Please Wait');
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

function capi_createProjectRequestScore(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createProjectRequestScore',
            'requestid' : options.requestid,
            'projectid' : options.projectid,
            'columnname' : options.columnname,
            'value' : options.value,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Request Score.. Please Wait');
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
function capi_fetchProjectRequestScore(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchProjectRequestScore',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Project Request Score.. Please Wait');
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

function capi_createProjectRequestScoreAdd(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createProjectRequestScoreAdd',
            'id' : options.id,
            'requestid' : options.requestid,
            'projectid' : options.projectid,
            'score' : options.score,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Request Score Add.. Please Wait');
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
function capi_fetchProjectRequestScoreAdd(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchProjectRequestScoreAdd',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Project Request Score Add.. Please Wait');
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


function capi_createProjectGroup(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createProjectGroup',
            'id' : options.id,
            'ownerid' : options.ownerid,
            'name' : options.name,
            'description' : options.description,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project Group.. Please Wait');
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
function capi_fetchProjectGroup(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchProjectGroup',
            'ownerid' : options.ownerid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Project Groups.. Please Wait');
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
function capi_fetchProjectGroupByGroupId(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchProjectGroupByGroupId',
            'groupid' : options.groupid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Project Groups.. Please Wait');
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
function capi_fetchProjectByGroupid(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchProjectByGroupid',
            'groupid' : options.groupid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Projects By Group.. Please Wait');
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

function capi_updateProjectGroupId(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateProjectGroupId',
            'projectid' : options.projectid,
            'groupid' : options.groupid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Projects.. Please Wait');
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


function capi_createAlert(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createAlert',
            'id' : options.id,
            'ownerid' : options.ownerid,
            'fn' : options.fn,
            'dataview' : options.dataview,
            'dataapprove' : options.dataapprove,
            'datareject' : options.datareject,
            'title' : options.title,
            'message' : options.message
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Projects.. Please Wait');
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
function capi_deleteAlert(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteAlert',
            'id' : options.id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Projects.. Please Wait');
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
function capi_fetchAlert(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchAlert',
            'ownerid' : options.ownerid
        },
        dataType: 'json',
        beforeSend: function(){
            // showLoadingReport('Updating Projects.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
        },
        complete: function(){
            cbcomplete();
            // hideLoadingReport();
        }
    });
}

function capi_distributeMinuteByPartId(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'distributeminutebypartid',
            'id': options.id,
            'projectid': options.projectid,
            'partid': options.partid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Distriuting Project Minutes.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
            console.log(data); 
        },
        complete: function(){
            hideLoadingReport();
            cbcomplete();
        }
    });
}


function capi_projectValhalla(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_project;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'projectValhalla',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            // showLoadingReport('Updating Projects.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
        },
        complete: function(){
            cbcomplete();
            // hideLoadingReport();
        }
    });
}