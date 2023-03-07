let apiUrl_message = 'api/api_message.php';

function api_createMessage(options){
    let url = domain + apiUrl_message;
    return new Promise((res, rej)=>{
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
                if(data.response != "error"){
                    res(data);
                }else{
                    rej("Error Sending Message");
                }
            },
            complete: function(){
                hideLoadingReport();
            }
        });
    });
}
function api_fetchMessage(cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_message;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchMessageByOwner',
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
function api_deleteOldMessages(cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_message;
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