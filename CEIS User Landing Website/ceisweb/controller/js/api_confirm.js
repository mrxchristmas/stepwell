let apiUrl_confirm = 'api/api_confirm.php';


function api_createConfirm(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_confirm;
    console.log('test', options);
    
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createConfirm',
            'email': options.email,
            'code': options.code,
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
