let apiUrl_company = 'api/api_company.php';

function api_createCompany(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_company;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createCompany',
            'companyid' : options.companyid,
            'owner' : options.owner,
            'databaseid' : options.databaseid,
            'name' : options.name
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

function api_createCompanyRequest(options){
    let url = domain + apiUrl_company;
    return new Promise((res, rej)=>{
        $.ajax({
            async: false,
            url: url,
            contentType: "application/json",
            type: 'get',
            data: {
                'function': 'createCompanyRequest',
                'id' : options.id,
                'companyid' : options.companyid,
                'companyname' : options.companyname,
                'owner' : options.owner,
                'keys' : options.keys,
            },
            dataType: 'json',
            beforeSend: function(){
                showLoadingReport('Creating Company Request...');
            },
            success: function(data){
                if(data.response != "error"){
                    res(data);
                }else{
                    rej("Error Creating Request");
                }
            },
            complete: function(){
                hideLoadingReport();
                cbcomplete();
            }
        }); 
    });
}