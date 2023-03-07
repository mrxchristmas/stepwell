let apiUrl_register = 'api/api_register.php';


function api_createAccount(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_register;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createAccount',
            'email' : options.email,
            'firstname' : options.firstname,
            'lastname' : options.lastname,
            'phone' : options.phone,
            'companyname' : options.companyname,
            'password' : options.password
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Account...');
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
function api_updateAccount(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_register;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateAccount',
            'email' : options.email,
            'firstname' : options.firstname,
            'lastname' : options.lastname,
            'phone' : options.phone,
            'companyname' : options.companyname
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Account...');
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
function api_updateAccountPassword(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_register;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateAccountPassword',
            'email': options.email,
            'password': options.password,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Password...');
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
function api_updateAccountCompanyId(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_register;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateAccountCompanyId',
            'email': options.email,
            'companyid': options.companyid,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Company Id...');
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