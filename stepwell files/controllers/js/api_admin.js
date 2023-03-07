let apiUrl_admin = 'api/api_admin.php';


function capi_prelogin(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_admin;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'prelogin',
            'companyid': options.companyid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Performing Pre Login.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
        },
        complete: function(){
            hideLoadingReport();
            cbcomplete();
        }
    });
}


function capi_fetchCompany(cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_admin;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchCompany',
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Performing Pre Login.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
        },
        complete: function(){
            hideLoadingReport();
            cbcomplete();
        }
    });
}
function capi_fetchCompanyModuleByCompanyId(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_admin;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchCompanyModuleByCompanyId',
            'companyid': options.companyid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Performing Pre Login.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
        },
        complete: function(){
            hideLoadingReport();
            cbcomplete();
        }
    });
}
function capi_fetchCompanyAdminByCompanyId(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_admin;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchCompanyAdminByCompanyId',
            'companyid': options.companyid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Performing Pre Login.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
        },
        complete: function(){
            hideLoadingReport();
            cbcomplete();
        }
    });
}
function capi_createCompanyModule(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_admin;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createCompanyModule',
            'id' : options.id,
            'companyid' : options.companyid,
            'modulename' : options.modulename,
            'moduleui' : options.moduleui
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Company Modules.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
        },
        complete: function(){
            hideLoadingReport();
            cbcomplete();
        }
    });
}
function capi_deleteCompanyModule(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_admin;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteCompanyModule',
            'id' : options.id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Company Modules.. Please Wait');
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
function capi_createCompanyAdmin(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_admin;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createCompanyAdmin',
            'accid' : options.accid,
            'companyid' : options.companyid,
            'firstname' : options.firstname,
            'lastname' : options.lastname
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Company Admin Account.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
        },
        complete: function(){
            hideLoadingReport();
            cbcomplete();
        }
    });
}
function capi_deleteCompanyAdmin(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_admin;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteCompanyAdmin',
            'accid' : options.accid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Company Admin Account.. Please Wait');
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
function capi_createCompany(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_admin;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createCompany',
            'companyid' : options.companyid,
            'databaseid' : options.databaseid,
            'name' : options.name
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Company.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
        },
        complete: function(){
            hideLoadingReport();
            cbcomplete();
        }
    });
}
function capi_updateCompanyStatus(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_admin;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateCompanyStatus',
            'companyid' : options.companyid,
            'status' : options.status
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Company.. Please Wait');
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

function capi_AdminfetchAccount(cbsuccess=()=>{}, cbcomplete=()=>{}){
    // if userlevel = 'na' then will fetch all account levels
    let url = domain + apiUrl_admin;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'adminfetchaccounts'
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Data.. Please Wait');
        },
        success: function(data){
            setTimeout(() => {
                // console.log(data);
                cbsuccess(data);
            }, 0);
        },
        complete: function(){
            // console.log('FUUUUCk');
            
            cbcomplete();
            hideLoadingReport();
        }
    });
}


function api_createMessage(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_admin;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createMessage',
            'id' : options.id,
            'owner' : options.owner,
            'sender' : options.sender,
            'message' : options.message
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Sending Message...');
        },
        success: function(data){
            cbsuccess(data);
        },
        complete: function(){
            hideLoadingReport();
            cbcomplete();
        }
    });
}
function api_fetchMessage(cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_admin;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchMessage'
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Sending Message...');
        },
        success: function(data){
            cbsuccess(data);
        },
        complete: function(){
            hideLoadingReport();
            cbcomplete();
        }
    });
}
function api_deleteOldMessages(cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_admin;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteOldMessages'
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Old Messages...');
        },
        success: function(data){
            cbsuccess(data);
        },
        complete: function(){
            hideLoadingReport();
            cbcomplete();
        }
    });
}