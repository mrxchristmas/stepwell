let apiUrl_login = `api/api_login.php`;

function api_fetchsessionvar(){
    let url = domain + apiUrl_login;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchsessionvar'
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Data.. Please Wait');
        },
        success: function(data){
            console.log('fetchsessionvar: ', data); 
            hideLoadingReport();
        }
    });
}
function api_logout(){
    let url = domain + apiUrl_login;
    $.ajax({
        async: false,
        url: url,
        // contentType: "application/json",
        type: 'get',
        data: {
            'function': 'logout'
        },
        dataType: 'json',
        success: function(data){
            console.log('logout: ', data); 
        }
    });
}
function api_COMPANY_ID(){
    let ret = '';
    let url = domain + apiUrl_login;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'companyid'
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Data.. Please Wait');
        },
        success: function(data){
            console.log(data); 
            ret = data;
            hideLoadingReport();
        }
    });
    return ret;
}
function api_checkIfLoggedIn(cb1, cb2){
    // console.log('testtest');
    let url = domain + apiUrl_login;
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
            showLoadingReport('Fetching Data.. Please Wait');
        },
        success: function(data){
            // console.log('api_checkIfLoggedIn', data);
            if(data == 'logout'){
                window.location.href = domain;
            }else{
                cb1(data);
            }
        },
        complete: function(){
            cb2();
            hideLoadingReport();
        }
    });
}
function capi_checkIfLoggedIn(){
    // console.log('testtest');
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
                showLoadingReport('Fetching Data.. Please Wait');
            },
            success: function(data){
                console.log('api_checkIfLoggedIn', data);
                if(data == 'logout'){
                    rej(()=>{
                        window.location.href = domain;
                    });
                }else{
                    res(data);
                }
            },
            complete: function(){
                hideLoadingReport();
            }
        });
    });
    
}
function capi_redirect(){
    // console.log('testtest');
    let url = domain + `controllers/defaults.php`;
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
                showLoadingReport('Fetching Data.. Please Wait');
            },
            success: function(data){
                console.log('capi_redirect', data);
                if(data == 'logout'){
                    rej(()=>{
                        window.location.href = domain;
                    });
                }else{
                    res(data);
                }
            },
            complete: function(){
                hideLoadingReport();
            }
        });
    });
    
}
function api_validate(id, email, password, companyid, cbsuccess=()=>{}){
    let url = domain + apiUrl_login;
    $.ajax({
        async: false,
        url: url,
        // contentType: "application/json",
        type: 'get',
        data: {
            'function': 'validate',
            'id': id,
            'email': email,
            'password': password,
            'companyid': companyid
        },
        dataType: 'json',
        success: function(data){
            cbsuccess(data);
        }
    });
}

