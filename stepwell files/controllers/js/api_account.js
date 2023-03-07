let apiUrl_account = `api/api_account.php`;
let apiUrl_adminaccount = `api/api_admin.php`;



function api_createAccount(id, companyid, email, password, userlevel, lastname, firstname, phone, birthdate, position, department, cbcomplete=()=>{}){
    let url = domain + apiUrl_account;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createaccount',
            'id' : id,
            'companyid' : companyid,
            'email' : email,
            'password' : password,
            'userlevel' : userlevel,
            'lastname' : lastname,
            'firstname' : firstname,
            'phone' : phone,
            'birthdate' : birthdate,
            'position' : position,
            'department' : department
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Account.. Please Wait');
        },
        success: function(data){
            // console.log('createAccount: ',data); 
            const d = new Date();
            console.log(d, ":: " + __ID + 'has created an account: ' + id + ' with userlevel ' + userlevel);
            hideLoadingReport();
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function api_fetchAccount(comid, userlevel, sender, options={}, cbcomplete=()=>{}, cbsuccess=()=>{}){
    // if userlevel = 'na' then will fetch all account levels
    let url = domain + apiUrl_account;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchaccounts',
            'comid' : comid,
            'userlevel' : userlevel
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Data.. Please Wait');
        },
        success: function(data){
            // console.log('fetchaccounts: ', data); 
            cbsuccess(data);
            fetchAccount(data, sender, options);
            hideLoadingReport();
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function api_updateAccount(id, email, userlevel, lastname, firstname, phone, birthdate, position, department, cbcomplete=()=>{}){
    let url = domain + apiUrl_account;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateaccount',
            'id' : id,
            'email' : email,
            'userlevel' : userlevel,
            'lastname' : lastname,
            'firstname' : firstname,
            'phone' : phone,
            'birthdate' : birthdate,
            'position' : position,
            'department' : department
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Data.. Please Wait');
        },
        success: function(data){
            // console.log('createAccount: ',data); 
            const d = new Date();
            console.log(d, ":: " + __ID + 'has updated an account: ' + id);
            hideLoadingReport();
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function api_getAccountInfo(id, sender){
    let url = domain + apiUrl_account;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'getaccountinfo',
            'id' : id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Data.. Please Wait');
        },
        success: function(data){
            // console.log('fetchaccounts: ', data); 
            getAccountInfo(data, sender);
            hideLoadingReport();
        }
    });
}

function api_createAccountModule(id, modulename, moduleui, cb){
    let url = domain + apiUrl_account;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createaccountmodule',
            'id': id,
            'modulename': modulename,
            'moduleui': moduleui
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Account Module.. Please Wait');
        },
        success: function(data){
            console.log(data);
        },
        complete: function(){
            hideLoadingReport();
            cb();
        }
    });
}
function api_fetchAccountModule(id, sender){
    let url = domain + apiUrl_account;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchaccountmodule',
            'id': id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Account Modules.. Please Wait');
        },
        success: function(data){
            console.log(data);
            fetchAccountModule(data, sender);
        },
        complete: function(){
            hideLoadingReport();
        }
    });
}
function api_deleteAccountModule(id, moduleui, cb){
    let url = domain + apiUrl_account;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteaccountmodule',
            'id': id,
            'moduleui': moduleui
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Account Module.. Please Wait');
        },
        success: function(data){
            console.log(data);
        },
        complete: function(){
            hideLoadingReport();
            cb();
        }
    });
}

function api_createAccountMachine(machineid, accid, cbcomplete=()=>{}){
    let url = domain + apiUrl_account;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createaccountmachine',
            'machineid': machineid,
            'accid': accid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Account Machine.. Please Wait');
        },
        success: function(data){
            console.log('createaccountmachine',data);
        },
        complete: function(){
            hideLoadingReport();
            cbcomplete();
        }
    });
}
function api_fetchAccountMachine(machineid, cbsuccess=()=>{}){
    let url = domain + apiUrl_account;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchaccountmachine',
            'machineid': machineid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Account Machine.. Please Wait');
        },
        success: function(data){
            console.log('fetchaccountmachine',data);
            cbsuccess(data);
        },
        complete: function(){
            hideLoadingReport();
        }
    });
}
function api_machineTest(machineid, accid, cbcomplete=()=>{}){
    let url = domain + apiUrl_account;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'machinetest',
            'machineid': machineid,
            'accid': accid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Account Machine.. Please Wait');
        },
        success: function(data){
            console.log('machinetest',data);
        },
        complete: function(){
            hideLoadingReport();
            cbcomplete();
        }
    });
}
function api_searchAccountByName(name, cbsuccess=()=>{}){
    let url = domain + apiUrl_account;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'searchaccountbyname',
            'name': name
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Accounts.. Please Wait');
        },
        success: function(data){
            console.log('searchaccountbyname',data);
            cbsuccess(data);
        },
        complete: function(){
            hideLoadingReport();
        }
    });
}
function api_createAccountSupervisor(accid, superid, cbcomplete=()=>{}){
    let url = domain + apiUrl_account;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createaccountsupervisor',
            'accid': accid,
            'superid': superid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Inserting Account Supervisor.. Please Wait');
        },
        success: function(data){
            console.log('createaccountsupervisor', data);
        },
        complete: function(){
            hideLoadingReport();
            cbcomplete();
        }
    });
}

function api_fetchAccountByProjectConnect(projectid, cbsuccess=()=>{}){
    let url = domain + apiUrl_account;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchaccountbyprojectconnect',
            'projectid' : projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Data.. Please Wait');
        },
        success: function(data){
            // console.log('fetchaccountbyprojectconnect: ', data); 
            cbsuccess(data);
            hideLoadingReport();
        }
    });
}



function fetchAccount(data, sender, options){
    if(sender == 'admin-emailList'){
        $('#suuser-search-list').empty();
        $.each(data, function(key, value){
            if(value != 'error'){
               if(value.userlevel != '0'){
                    $('#suuser-search-list').append(`<span class="btn-shadow suuser-search-list-widget" id="${value.id}" 
                    userlevel="${value.userlevel}"lastname="${value.lastname}"firstname="${value.firstname}"phone="${value.phone}"
                    birthdate="${value.birthdate}"position="${value.position}"department="${value.department}"
                    style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};">${value.email}</span>`);
               
                    adminAccountList[adminAccountList.length] = {
                        'id' : value.id,
                        'companyid' : value.companyid,
                        'email' : value.email,
                        'password' : value.password,
                        'userlevel' : value.userlevel,
                        'lastname' : value.lastname,
                        'firstname' : value.firstname,
                        'phone' : value.phone,
                        'birthdate' : value.birthdate,
                        'position' : value.position,
                        'department' : value.department,
                        'photo' : value.photo,
                        'superid' : value.superid
                   };
                    
                }
            }else{
                showNotification('Accounts', 'You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
    if(sender == 'nav-uac'){
        $('.uac-user-widget-con').empty();
        $.each(data, function(key, value){
            if(value != 'error'){
                $('.uac-user-widget-con').append(`<span class="btn-shadow uac-user-widget" id="${value.id}" 
                userlevel="${value.userlevel}"lastname="${value.lastname}"firstname="${value.firstname}"phone="${value.phone}"
                birthdate="${value.birthdate}"position="${value.position}"department="${value.department}"
                style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};">${value.email}</span>`);
            }else{
                showNotification('Accounts', 'You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
    if(sender == 'create-upload-submit'){
        $('.create-upload-con3-acclist-widget-con').empty();
        let x = 0;
        createUploadAccountList = [];
        $.each(data, function(key, value){
            if(value != 'error'){
               if(value.userlevel != '0'){
                    // $('#suuser-search-list').append(`<span class="btn-shadow suuser-search-list-widget" id="${value.id}" 
                    // userlevel="${value.userlevel}"lastname="${value.lastname}"firstname="${value.firstname}"phone="${value.phone}"
                    // birthdate="${value.birthdate}"position="${value.position}"department="${value.department}"
                    // style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};">${value.email}</span>`);
                    $('.create-upload-con3-acclist-widget-con').append(`
                        <div zid="${value.id}" fn="${value.firstname}" em="${value.email}" class="create-upload-con3-acclist-widget btn-shadow" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};">
                            <span class="create-upload-con3-acclist-widget-name">${value.firstname}</span>
                            <span class="create-upload-con3-acclist-widget-email">${value.email}</span>
                        </div>
                    `);
                    createUploadAccountList[x] = { "id":value.id, "fn":value.firstname, "em":value.email, "ln":value.lastname  };
                    $('.create-upload-con3-acclist-widget').draggable(options);
                    x++;
               }
            }else{
                showNotification('Accounts', 'Error Fetching Accounts. Please try again');
            }
        });
    }
    if(sender == 'documents-edit-connect-show'){
        // console.log(data);
        $('.documents-edit-connect-list').children('.documents-edit-connect-list-widget-con').empty();
        let x = 0;
        documentEditAccountList = [];
        $.each(data, function(key, value){
            if(value != 'error'){
                if(value.userlevel != '0'){
                    $('.documents-edit-connect-list').children('.documents-edit-connect-list-widget-con').append(`
                        <div accid="${value.id}" fn="${value.firstname}" ln="${value.lastname}" em="${value.email}" class="documents-edit-connect-list-widget btn-shadow">
                            <span class="documents-edit-connect-list-widget-name straight-text">${value.firstname} ${value.lastname}</span>
                            <span class="documents-edit-connect-list-widget-id">${value.email}</span>
                        </div>
                    `);
                    documentEditAccountList[x] = { "id":value.id, "fn":value.firstname, "em":value.email, "ln":value.lastname  };
                    $('.documents-edit-connect-list-widget').draggable(options);
                    x++;
                }
            }else{
                showNotification('Accounts', 'Error Fetching Accounts. Please try again');
            }
        });

    }
    if(sender == 'documents-edit-coowner-show'){
        // console.log(data);
        $('.documents-edit-coowner-list').children('.documents-edit-coowner-list-widget-con').empty();
        let x = 0;
        documentEditCoownerAccountList = [];
        $.each(data, function(key, value){
            if(value != 'error'){
                if(value.userlevel != '0'){
                    $('.documents-edit-coowner-list').children('.documents-edit-coowner-list-widget-con').append(`
                        <div accid="${value.id}" fn="${value.firstname}" ln="${value.lastname}" em="${value.email}" class="documents-edit-coowner-list-widget btn-shadow">
                            <span class="documents-edit-coowner-list-widget-name straight-text">${value.firstname} ${value.lastname}</span>
                            <span class="documents-edit-coowner-list-widget-id">${value.email}</span>
                        </div>
                    `);
                    documentEditCoownerAccountList[x] = { "id":value.id, "fn":value.firstname, "em":value.email, "ln":value.lastname  };
                    $('.documents-edit-coowner-list-widget').draggable(options);
                    x++;
                }
            }else{
                showNotification('Accounts', 'Error Fetching Accounts. Please try again');
            }
        });

    }
    if(sender == 'tasklist-widget-icon-resources'){
        // console.log(data);
        accountList = [];
        $.each(data, function(key, value){
            if(value != 'error'){
                if(value.userlevel != '0'){
                    accountList[accountList.length] = { "id":value.id, "fn":value.firstname, "em":value.email, "ln":value.lastname  };
                }
            }else{
                showNotification('Accounts', 'No Accounts Fetched. Please try again');
            }
        });

    }
    if(sender == 'fetchAccountData'){
        accountList = [];
        $.each(data, function(key, value){
            if(value != 'error'){
               if(value.userlevel != '0'){
                    accountList[accountList.length] =  {
                        'id' : value.id,
                        'class': new Account(value.id, value.companyid, value.email, value.password, value.userlevel, value.lastname, value.firstname, value.phone, value.birthdate, value.position, value.department, value.photo, value.superid)
                    }
                }
            }else{
                showNotification('Accounts', 'You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
    if(sender == 'pschedulelist-widget-icon-resources'){
        // console.log(data);
        accountList1 = [];
        $.each(data, function(key, value){
            if(value != 'error'){
                if(value.userlevel != '0'){
                    accountList1[accountList1.length] = { "id":value.id, "fn":value.firstname, "em":value.email, "ln":value.lastname  };
                }
            }else{
                showNotification('Accounts', 'No Accounts Fetched. Please try again');
            }
        });

    }
    
    
}
function getAccountInfo(data, sender){
    if(sender == '.project-manage-list-widget'){
        $.each(data, function(key, value){
            if(value != 'error'){
                if(value.photo != 'na'){
                    $('#project-view-ownerphoto').attr('src', value.photo);
                }else{
                    $('#project-view-ownerphoto').attr('src', 'lib/images/avatardefault.png');
                }
            }else{
                // alert('You have not set up your positions. Please add positions first before creating new users.');
                showNotification('Fetch Error', 'There was a problem Fetching the Users Account.');
            }
        });
    }
    if(sender == 'project-connect-search'){
        // console.log(data);
        $.each(data, function(key, value){
            // console.log(value.id, __COMPANY_ID);
            if(value != 'error'){
                if(value.photo != 'na'){
                    $('#project-connect-userphoto').attr('src', value.photo);
                }else{
                    $('#project-connect-userphoto').attr('src', 'lib/images/avatardefault.png');
                }
                $('#project-connect-userid').text(value.id);
                
                if(value.id == __ID){
                    $('#project-connect-username').text('You');
                    $('.project-manage-connect-con').animate({'height' : '300px'}, 500, function(){
                        $('#project-connect-userid, #project-connect-userphoto, #project-connect-username, #project-connect-submit').css('opacity', '0').show().animate({'opacity': '1'}, 200);
                        $('#project-connect-submit').text('Could not Connect').prop('disabled', true);
                    });
                }else{
                    $('#project-connect-username').text(value.firstname + ' ' + value.lastname);
                    $('.project-manage-connect-con').animate({'height' : '300px'}, 500, function(){
                        $('#project-connect-userid, #project-connect-userphoto, #project-connect-username, #project-connect-submit').css('opacity', '0').show().animate({'opacity': '1'}, 200);
                        $('#project-connect-submit').text('Connect').prop('disabled', false);
                    });
                }
                $('#project-connect-search-id').text('');
            }else{
                $('#project-connect-userid, #project-connect-userphoto, #project-connect-username, #project-connect-submit').animate({'opacity': '0'}, 200, function(){
                     $('.project-manage-connect-con').animate({'height' : '120px'}, 500);
                }).hide();
                showNotification('Fetch Error', 'There was no account linked to the provided Id.');
            }
        });
    }
    if(sender == 'group-connect-search'){
        $.each(data, function(key, value){
            // console.log(value.id, __COMPANY_ID);
            if(value != 'error'){
                if(value.photo != 'na'){
                    $('#group-connect-userphoto').attr('src', value.photo);
                }else{
                    $('#group-connect-userphoto').attr('src', 'lib/images/avatardefault.png');
                }

                $('#group-connect-userid').text(value.id);
                
                if(value.id == __ID){
                    $('#group-connect-username').text('You');
                    $('.group-manage-connect-con').animate({'height' : '300px'}, 500, function(){
                        $('#group-connect-userid, #group-connect-userphoto, #group-connect-username, #group-connect-submit').css('opacity', '0').show().animate({'opacity': '1'}, 200);
                        $('#group-connect-submit').text('Could not Invite Self').prop('disabled', true);
                    });
                }else{
                    $('#group-connect-username').text(value.firstname + ' ' + value.lastname);
                    $('.group-manage-connect-con').animate({'height' : '300px'}, 500, function(){
                        $('#group-connect-userid, #group-connect-userphoto, #group-connect-username, #group-connect-submit').css('opacity', '0').show().animate({'opacity': '1'}, 200);
                        $('#group-connect-submit').text('Invite').prop('disabled', false);
                    });
                }
                $('#group-connect-search-id').text('');
            }else{
                $('#group-connect-userid, #group-connect-userphoto, #group-connect-username, #group-connect-submit').animate({'opacity': '0'}, 200, function(){
                     $('.group-manage-connect-con').animate({'height' : '120px'}, 500);
                }).hide();
                showNotification('Fetch Error', 'There was no account linked to the provided Id.');
            }
        });
    }
    if(sender == 'docuchat'){
        // id, groupname, photo, firstname, lastname
        $.each(data, function(key, value){
            if(value != 'error'){
                
                
            }else{
                // showNotification('Fetch Error', 'There was no account linked to the provided Id.');
            }
        });
    }
    
}
function fetchAccountModule(data, sender){
    // console.log(data, sender);
    if(sender == 'uac-user-widget'){
        $('.uac-user-modules-widget-con').empty();
        // console.log(data);
        $.each(data, function(key, value){
            // console.log(value.name, value.ui);
            if(value.moduleui != undefined && value.moduleui != null && value.moduleui != ''){
                $('.uac-user-modules-widget-con').append(`<span ui="${value.moduleui}" class="uac-user-modules-widget color-sc shadow">${value.modulename}</span>`);
            }
        });
    }
    if(sender == 'getAccountModules'){
        // console.log(data);
        $('.nav-widget-con.module').hide();
        $.each(data, function(key, value){
            console.log(value.moduleui);
            if(value.moduleui != undefined && value.moduleui != null && value.moduleui != ''){
                $(`.nav-widget-con.module.${value.moduleui}`).show();
            }
        });
    }
    
}











function capi_fetchAccountsByProjectResource(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_account;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchaccountsbyprojectresource',
            'projectid': options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Accounts.. Please Wait');
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
function capi_createAccountRate(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_account;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createaccountrate',
            'id': options.id,
            'accid': options.accid,
            'projectid': options.projectid,
            'rate': options.rate
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Accounts.. Please Wait');
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
function capi_fetchAccountRatesByProjectId(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_account;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchaccountratesbyprojectid',
            'projectid': options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Accounts.. Please Wait');
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
function capi_fetchAccount(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    // if userlevel = 'na' then will fetch all account levels
    let url = domain + apiUrl_account;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchaccounts',
            'comid' : options.comid,
            'userlevel' : options.userlevel
        },
        dataType: 'json',
        beforeSend: function(){
            console.log(options);
            showLoadingReport('Fetching Data.. Please Wait');
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

function capi_createTmpAccount(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_account;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createtmpaccount',
            'id' : options.id,
            'projectid' : options.projectid,
            'name' : options.name
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Data.. Please Wait');
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
function capi_fetchTmpAccountByProjectId(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_account;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchtmpaccountbyprojectid',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Data.. Please Wait');
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
function capi_createTmpAccountRateRoll(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_account;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updatetmpaccountraterole',
            'id' : options.id,
            'rate' : options.rate,
            'role' : options.role
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Data.. Please Wait');
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
function capi_fetchAccountRoleByProjectId(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_account;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchAccountRoleByProjectId',
            'id' : options.id,
            'accid' : options.accid,
            'projectid' : options.projectid,
            'role' : options.role
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Data.. Please Wait');
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
function capi_createAccount(options, cbcomplete=()=>{}){
    let url = domain + apiUrl_account;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createaccount',
            'id' : options.id,
            'companyid' : options.companyid,
            'email' : options.email,
            'password' : options.password,
            'userlevel' : options.userlevel,
            'lastname' : options.lastname,
            'firstname' : options.firstname,
            'phone' : options.phone,
            'birthdate' : options.birthdate,
            'position' : options.position,
            'department' : options.department,
            'superid' : options.superid
            
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Account.. Please Wait');
        },
        success: function(data){
            console.log('createAccount: ',data); 
            // const d = new Date();
            // console.log(d, ":: " + __ID + 'has created an account: ' + id + ' with userlevel ' + userlevel);
        },
        complete: function(){
            cbcomplete('Creating new company account');
            hideLoadingReport();
        }
    });
}
function capi_updateAccount(options, cbcomplete=()=>{}){
    let url = domain + apiUrl_account;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateaccount',
            'id' : options.id,
            'email' : options.email,
            'userlevel' : options.userlevel,
            'lastname' : options.lastname,
            'firstname' : options.firstname,
            'phone' : options.phone,
            'birthdate' : options.birthdate,
            'position' : options.position,
            'department' : options.department,
            'superid' : options.superid
        },
        dataType: 'json',
        beforeSend: function(){
            console.log(options);
            showLoadingReport('Updating Data.. Please Wait');
        },
        success: function(data){
            // console.log('createAccount: ',data); 
            console.log(data);
            // const d = new Date();
            // console.log(d, ":: " + __ID + 'has updated an account: ' + id);
        },
        complete: function(){
            cbcomplete('Account Sucessfully Updated');
            hideLoadingReport();
        }
    });
}
function capi_adminCreateAccount(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_account;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'admincreateaccount',
            'id' : options.id,
            'companyid' : options.companyid,
            'email' : options.email,
            'password' : options.password,
            'userlevel' : options.userlevel,
            'lastname' : options.lastname,
            'firstname' : options.firstname,
            'phone' : options.phone,
            'birthdate' : options.birthdate,
            'position' : options.position,
            'department' : options.department,
            'superid' : options.superid,
            'databaseid' : options.databaseid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Account.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
        },
        complete: function(){
            cbcomplete('Creating new company account');
            hideLoadingReport();
        }
    });
}
function capi_updateAccountPhoto(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_account;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateAccountPhoto',
            'id' : options.id,
            'photo' : options.photo,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Account.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
        },
        complete: function(){
            cbcomplete('Creating new company account');
            hideLoadingReport();
        }
    });
}
