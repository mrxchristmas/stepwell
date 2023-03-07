let apiUrl_bill = 'api/api_billing.php';

function api_createBill(options){
    let url = domain + apiUrl_bill;
    return new Promise((res, rej)=>{
        $.ajax({
            async: false,
            url: url,
            contentType: "application/json",
            type: 'get',
            data: {
                'function': 'createBill',
                'id' : options.id,
                'billid' : options.billid,
                'owner' : options.owner,
                'licenseid' : options.licenseid,
                'billdate' : options.billdate,
                'expirydate' : options.expirydate,
                'subtotal' : options.subtotal,
                'status' : options.status
            },
            dataType: 'json',
            beforeSend: function(){
                showLoadingReport('Sending Message...');
            },
            success: function(data){
                if(data.response != "error"){
                    res(data);
                }else{
                    rej("Error Creating Bill");
                }
            },
            complete: function(){
                hideLoadingReport();
            }
        });
    });
}
function api_fetchBill(cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_bill;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchBillByOwner',
            'owner' : __EMAIL
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

function api_createLicense(options){
    let url = motherdomain + 'api/api_license.php';
    
    return new Promise((res, rej)=>{
        $.ajax({
            async: false,
            url: url,
            contentType: "application/json",
            type: 'get',
            data: {
                'function': 'createLicense',
                'id' : options.id,
                'licenseid' : options.licenseid,
                'companyid' : options.companyid,
                'owner' : options.owner,
                'startdate' : options.startdate,
                'enddate' : options.enddate,
                'status' : options.status,
            },
            dataType: 'json',
            beforeSend: function(){
                showLoadingReport('Fetching License.. Please Wait');
            },
            success: function(data){
                // cbsuccess(data);
                if(data.response != "error"){
                    res(data);
                }else{
                    rej("Error Creating License");
                }
            },
            complete: function(){
                hideLoadingReport();
            }
        });
    });

}
function api_fetchLicense(){
    let url = domain + apiUrl_bill;
    return new Promise((res, rej)=>{
        $.ajax({
            async: false,
            url: url,
            contentType: "application/json",
            type: 'get',
            data: {
                'function': 'fetchLicense',
                'owner' : __EMAIL
            },
            dataType: 'json',
            beforeSend: function(){
                showLoadingReport('Fetching License.. Please Wait');
            },
            success: function(data){
                // cbsuccess(data);
                if(data.response != "error"){
                    res(data);
                }else{
                    rej("Error Creating License");
                }
            },
            complete: function(){
                hideLoadingReport();
            }
        });
    });

}
function api_updateLicenseCompanyid(options){
    let url = domain + apiUrl_bill;
    return new Promise((res, rej)=>{
        $.ajax({
            async: false,
            url: url,
            contentType: "application/json",
            type: 'get',
            data: {
                'function': 'updateLicenseCompanyid',
                'id' : options.id,
                'companyid' : options.companyid
            },
            dataType: 'json',
            beforeSend: function(){
                showLoadingReport('Sending Message...');
            },
            success: function(data){
                if(data.response != "error"){
                    res(data);
                }else{
                    rej("Error Creating Bill");
                }
            },
            complete: function(){
                hideLoadingReport();
            }
        });
    });
}
