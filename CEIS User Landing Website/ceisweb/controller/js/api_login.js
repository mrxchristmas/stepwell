let apiUrl_login = 'api/api_login.php';


function api_login(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_login;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'login',
            'email': options.email,
            'password': options.password,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Logging In...');
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
function api_logout(cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_login;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'logout'
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Logging Out...');
        },
        success: function(){
            cbsuccess();
        },
        complete: function(){
            hideLoadingReport();
            cbcomplete();
        }
    });
}
function api_checkIfLoggedIn(){
    let url = domain + apiUrl_login;
    return new Promise((res, rej)=>{
        $.ajax({
            async: false,
            url: url,
            contentType: "application/json",
            type: 'get',
            data: {
                'function': 'checkIfLoggedIn'
            },
            dataType: 'json',
            beforeSend: function(){
                showLoadingReport('Checking Credentials...');
            },
            success: function(data){
                if(data.response != "error"){
                    res(data);
                }else{
                    rej(data);
                }
            },
            complete: function(){
                hideLoadingReport();
            }
        });
    });
}
function api_validate(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_login;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'validate',
            'email': options.email,
            'password': options.password,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Validating Credentials...');
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
function api_checkPassword(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_login;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'checkPassword',
            'password': options.password,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Checking Credentials...');
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
