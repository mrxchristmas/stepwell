let apiUrl_license = 'api/api_license.php';

function capi_createLicense(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_license;
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
            'owner' : options.owner == undefined ? "na" : options.owner,
            'startdate' : options.startdate,
            'enddate' : options.enddate,
            'status' : options.status,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching License.. Please Wait');
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
function capi_updateLicenseCompanyId(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_license;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateLicenseCompanyId',
            'id' : options.id,
            'companyid' : options.companyid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating License.. Please Wait');
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
function capi_fetchLicense(cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_license;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchLicense',
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching License.. Please Wait');
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
function capi_deleteLicense(id, cbcomplete=()=>{}){
    let url = domain + apiUrl_license;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteLicense',
            'id' : id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting License.. Please Wait');
        },
        complete: function(){
            hideLoadingReport();
            cbcomplete();
        }
    });
}