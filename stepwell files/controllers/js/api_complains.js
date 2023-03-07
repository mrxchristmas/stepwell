let apiUrl_complains = 'api/api_complains.php';

function capi_createComplain(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_complains;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createComplain',
            'id' : options.id,
            'companyid' : options.companyid,
            'sender' : options.sender,
            'type' : options.type,
            'message' : options.message,
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
function capi_updateComplainStatus(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_complains;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateComplainStatus',
            'id' : options.id,
            'status' : options.status
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
function capi_fetchActiveComplains(cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_complains;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchActiveComplains',
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
function capi_fetchArchivedComplains(cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_complains;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchArchivedComplains',
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
function capi_sendAlertReply(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_complains;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'sendAlertReply',
            'id' : options.id,
            'ownerid' : options.ownerid,
            'fn' : options.fn,
            'dataview' : options.dataview,
            'dataapprove' : options.dataapprove,
            'datareject' : options.datareject,
            'title' : options.title,
            'message' : options.message,
            'databaseid' : options.databaseid
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