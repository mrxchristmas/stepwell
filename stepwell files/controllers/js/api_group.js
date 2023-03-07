let apiUrl_group = `api/api_group.php`;
let group_launch_list = {};
let group_manage_list = {};
let group_allconnected_list = 0;

function api_createGroup(groupid, groupname, owner, comid){
    let url = domain + apiUrl_group;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'creategroup',
            'groupid' : groupid,
            'groupname' : groupname,
            'owner' : owner,
            'comid' : comid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Group.. Please Wait');
            },
        success: function(data){
            console.log(data); 
            hideLoadingReport();
            showNotification('Group Management', 'You have Successfuly Created the Group ' + groupname);
        }
    });
}
function api_deleteGroup(groupid){
    let url = domain + apiUrl_group;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deletegroup',
            'groupid' : groupid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Group.. Please Wait');
        },
        success: function(data){
            console.log(data); 
            hideLoadingReport();
            showNotification('Group Management', 'You have Successfuly Deleted the Group ' + groupid);
        }
    });
}
function api_fetchGroupById(memberid, sender){
    let url = domain + apiUrl_group;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchgroupbyid',
            'memberid' : memberid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Groups.. Please Wait');
        },
        success: function(data){
            fetchGroupById(data, sender);
            hideLoadingReport();
        }
    });
}
function api_addGroupMember(groupid, memberid){
    let url = domain + apiUrl_group;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'addgroupmember',
            'groupid' : groupid,
            'memberid' : memberid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Adding Group Member.. Please Wait');
            },
        success: function(data){
            console.log(data); 
            hideLoadingReport();
            showNotification('Group Management', 'You have Successfuly Added ' + memberid + ' to the Group ' + groupid);
        }
    });
}
function api_removeGroupMember(groupid, memberid){
    let url = domain + apiUrl_group;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'removegroupmember',
            'groupid' : groupid,
            'memberid' : memberid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Removing Group Member.. Please Wait');
            },
        success: function(data){
            console.log(data); 
            hideLoadingReport();
            showNotification('Group Management', 'You have Successfuly Removed ' + memberid + ' to the Group ' + groupid);
        }
    });
}
function api_fetchGroupMembers(groupid, sender){
    let url = domain + apiUrl_group;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchgroupmembers',
            'groupid' : groupid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Group Members.. Please Wait');
        },
        success: function(data){
            fetchGroupMembers(data, sender);
            hideLoadingReport();
        }
    });
}
function api_fetchGroupInfo(groupid, sender){
    let url = domain + apiUrl_group;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchgroupinfo',
            'groupid' : groupid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Group Info.. Please Wait');
        },
        success: function(data){
            fetchGroupInfo(data, sender);
            hideLoadingReport();
        }
    });
}





function fetchGroupById(data, sender){
    if(sender == 'nav-groups-manage'){
        $('#group-manage-list').empty();
        let x = 0;
        $.each(data, function(key, value){
            if(value != 'error'){
                $('#group-manage-list').append(`<span grid="${value.groupid}" fn="${value.firstname}" ln="${value.lastname}" ph="${value.photo}" ow="${value.owner}" class="group-manage-list-widget btn-shadow" style="color: white; background-color: ${BTN_COLOR}" >${value.groupname}</span>`);
                group_manage_list[x] = [value.groupid, value.groupname, value.owner, value.firstname, value.lastname, value.photo];
                x++;
            }else{
                showNotification('Alert', 'You are not connected to any Group Right now.');
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
    if(sender == 'fetchAllConnectedProjects'){
        let x = 0;
        $.each(data, function(key, value){
            if(value != 'error'){
                // group_allconnected_list[x] = [value.groupid];
                // console.log(value.groupid);
                api_fetchProjectByConnect(value.groupid, 'fetchGroupById');
                x++;
            }else{
                showNotification('Alert', 'You are not connected to any Group Right now.');
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
    if(sender == 'docuchart-fetchAllConnectedProjects'){
        let x = 0;
        $.each(data, function(key, value){
            if(value != 'error'){
                // group_allconnected_list[x] = [value.groupid];
                // console.log(value.groupid);
                api_fetchProjectByConnect(value.groupid, 'docuchart-fetchGroupById');
                x++;
            }else{
                showNotification('Alert', 'You are not connected to any Group Right now.');
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
}
function fetchGroupMembers(data, sender){
    // console.log(data, sender);
    if(sender == 'group-view-launch'){
        $('#group-launch-list').empty();
        let x = 0;
        $.each(data, function(key, value){
            if(value != 'error'){
                if(value.id == __ID){
                    $('#group-launch-list').prepend(`<span zid="${value.id}" fn="${value.firstname}" ln="${value.lastname}" ph="${value.photo}" class="group-launch-list-widget btn-shadow" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};">You</span>`);
                }else{
                    $('#group-launch-list').append(`<span zid="${value.id}" fn="${value.firstname}" ln="${value.lastname}" ph="${value.photo}" class="group-launch-list-widget btn-shadow" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};">${value.firstname} ${value.lastname}</span>`);
                }
                group_launch_list[x] = [value.id, value.firstname, value.lastname, value.photo];
                x++;
            }else{
                showNotification('Alert', 'You are not connected to any Group Right now.');
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
    if(sender == 'docuchat'){
        // $('#group-launch-list').empty();
        $.each(data, function(key, value){
            if(value != 'error'){
                // if(value.id == __ID){
                //     $('#group-launch-list').prepend(`<span zid="${value.id}" fn="${value.firstname}" ln="${value.lastname}" ph="${value.photo}" class="group-launch-list-widget btn-shadow">You</span>`);
                // }else{
                //     $('#group-launch-list').append(`<span zid="${value.id}" fn="${value.firstname}" ln="${value.lastname}" ph="${value.photo}" class="group-launch-list-widget btn-shadow">${value.firstname} ${value.lastname}</span>`);
                // }
                // group_launch_list[x] = [value.id, value.firstname, value.lastname, value.photo];

                console.log(key, value);
                let x = Object.size(docuchat_userlist_project);
                // console.log(x);
                let gate = false;
                for(i=0; i<x; i++){
                    if(docuchat_userlist_project[i][0] == value.id){
                        // console.log('Same User');
                        gate = false;
                        break;
                    }else{
                        gate = true;
                    }
                }
                if(gate){
                    $('.doctest').append(`<span id="${value.id}" ph="${value.photo}" fn="${value.firstname}" ln="${value.lastname}" class="doctest-widget">${value.firstname} ${value.lastname}</span>`);
                    docuchat_userlist_project[docuchat_userlist_project_counter] = [value.id, value.firstname, value.lastname , value.photo];
                    docuchat_userlist_project_counter++;
                }
            }else{
                // showNotification('Alert', 'You are not connected to any Group Right now.');
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
}
function fetchGroupInfo(data, sender){
    // console.log(data, sender);
    if(sender == 'project-connect-search'){
        $.each(data, function(key, value){
            if(value != 'error'){
                
                if(value.photo != 'na'){
                    $('#project-connect-userphoto').attr('src', value.photo);
                }else{
                    $('#project-connect-userphoto').attr('src', 'lib/images/avatardefault.png');
                }
                $('#project-connect-userid').text(value.id);
                
                $('#project-connect-username').text(value.firstname + ' - ' + value.groupname);
                $('.project-manage-connect-con').animate({'height' : '300px'}, 500, function(){
                    $('#project-connect-userid, #project-connect-userphoto, #project-connect-username, #project-connect-submit').css('opacity', '0').show().animate({'opacity': '1'}, 200);
                    $('#project-connect-submit').text('Connect').prop('disabled', false);
                });

                $('#project-connect-search-id').text('');

                showNotification('Alert', 'The Group ' + value.groupname + ' has beed added to this project');
            }else{
                $('#project-connect-userid, #project-connect-userphoto, #project-connect-username, #project-connect-submit').animate({'opacity': '0'}, 200, function(){
                    $('.project-manage-connect-con').animate({'height' : '120px'}, 500);
               }).hide();
                showNotification('Alert', 'The Group ID You Entered is not Associated with any Groups');
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
    if(sender == 'fetchProjectConnectByProjectId'){
        // id, groupname, photo, firstname, lastname
        let photo = '';
        $.each(data, function(key, value){
            if(value != 'error'){
                if(value.photo != 'na'){
                    photo = value.photo;
                }else{
                    photo = 'lib/images/avatardefault.png';
                }
                $('#project-launch-list').append(`<span zid="${value.id}" gn="${value.groupname}" ph="${photo}" fn="${value.firstname}" ln="${value.lastname}" class="project-launch-list-widget btn-shadow">${value.groupname}</span>`);
                project_launch_list[project_launch_list_counter] = [value.id, value.groupname, photo, value.firstname, value.lastname];
                project_launch_list_counter++;

            }else{
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
    if(sender == 'docuchat'){
        // id, groupname, photo, firstname, lastname
        let photo = '';
        $.each(data, function(key, value){
            if(value != 'error'){
                // if(value.photo != 'na'){
                //     photo = value.photo;
                // }else{
                //     photo = 'lib/images/avatardefault.png';
                // }
                // $('#project-launch-list').append(`<span zid="${value.id}" gn="${value.groupname}" ph="${photo}" fn="${value.firstname}" ln="${value.lastname}" class="project-launch-list-widget btn-shadow">${value.groupname}</span>`);
                // project_launch_list[project_launch_list_counter] = [value.id, value.groupname, photo, value.firstname, value.lastname];
                // project_launch_list_counter++;
                // console.log(key, value);
                api_fetchGroupMembers(value.id, 'docuchat');
            }else{
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
}


function capi_fetchGroupById(options, cbsuccess, cbcomplete){
    let url = domain + apiUrl_group;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchgroupbyid',
            'memberid' : options.memberid
        },
        dataType: 'json',
        beforeSend: function(){
            // console.log(options);
            showLoadingReport('Fetching Groups.. Please Wait');
        },
        success: function(data){
            // fetchGroupById(data, sender);
            console.log(data);
            cbsuccess(data);
        },
        complete: function(){
            cbcomplete('Fetching Groups By ID');
            hideLoadingReport();
        }
    });
}
function capi_createGroup(options, cbcomplete){
    let url = domain + apiUrl_group;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'creategroup',
            'groupid' : options.groupid,
            'groupname' : options.groupname,
            'owner' : options.owner,
            'comid' : options.comid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Group.. Please Wait');
        },
        success: function(data){
            console.log(data); 
            // showNotification('Group Management', 'You have Successfuly Created the Group ' + groupname);
        },
        complete: function(){
            cbcomplete('Creating Group'); 
            showNotification('Group Management', 'You have Successfuly Created the Group ' + options.groupname);
            hideLoadingReport();
        }
    });
}
function capi_deleteGroup(options, cbcomplete){
    let url = domain + apiUrl_group;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deletegroup',
            'groupid' : options.groupid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Group.. Please Wait');
        },
        success: function(data){
            console.log(data); 
        },
        complete: function(){    
            hideLoadingReport();
            showNotification('Group Management', 'You have Successfuly Deleted the Group ' + options.groupid);
            cbcomplete('Deleting Group'); 
        }
    });
}
function capi_addGroupMember(options, cbcomplete){
    let url = domain + apiUrl_group;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'addgroupmember',
            'groupid' : options.groupid,
            'memberid' : options.memberid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Adding Group Member.. Please Wait');
        },
        success: function(data){
            console.log(data); 
        },
        complete: function(){
            console.log('Adding Group Member'); 
            hideLoadingReport();
            showNotification('Group Management', 'You have Successfuly Added ' + memberid + ' to the Group ' + groupid);
        }
    });
}
function capi_removeGroupMember(options, cbcomplete){
    let url = domain + apiUrl_group;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'removegroupmember',
            'groupid' : options.groupid,
            'memberid' : options.memberid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Removing Group Member.. Please Wait');
        },
        success: function(data){
            console.log(data); 
        },
        complete: function(){
            console.log('Removing Group Member'); 
            hideLoadingReport();
            showNotification('Group Management', 'You have Successfuly Removed ' + memberid + ' to the Group ' + groupid);
        }
    });
}
function capi_fetchGroupMembers(options, cbsuccess, cbcomplete){
    let url = domain + apiUrl_group;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchgroupmembers',
            'groupid' : options.groupid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Group Members.. Please Wait');
        },
        success: function(data){
            // fetchGroupMembers(data, sender);
            cbsuccess(data);
        },
        complete: function(){
            hideLoadingReport();
            cbcomplete('Fetching Group Members');
        }
    });
}
function capi_fetchGroupInfo(options, cbsuccess, cbcomplete){
    let url = domain + apiUrl_group;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchgroupinfo',
            'groupid' : options.groupid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Group Info.. Please Wait');
        },
        success: function(data){
            // fetchGroupInfo(data, sender);
            cbsuccess(data);
        },
        complete: function(){
            cbcomplete('Fetching Group Information');
            hideLoadingReport();
        }
    });
}