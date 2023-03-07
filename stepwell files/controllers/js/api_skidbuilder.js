let apiUrl_skidbuilder = `api/api_skidbuilder.php`;

//OPERATIONS FUNCTIONS
function capi_fetchSkid(cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchSkid',
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Skid.. Please Wait');
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
function capi_createSkid(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createSkid',
            'id' : options.id,
            'creatorid' : options.creatorid,
            'date' : options.date
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Skid.. Please Wait');
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
function capi_deleteSkid(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteSkid',
            'id' : options.id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Skid.. Please Wait');
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


function capi_fetchSkidUnit(cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchSkidUnit',
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Skid Unit.. Please Wait');
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
function capi_createSkidUnit(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createSkidUnit',
            'id' : options.id,
            'name' : options.name
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Skid Unit.. Please Wait');
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
function capi_deleteSkidUnit(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteSkidUnit',
            'id' : options.id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Skid Unit.. Please Wait');
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
function capi_updateSkidUnit(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateSkidUnit',
            'id' : options.id,
            'name' : options.name
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Skid Unit.. Please Wait');
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




function capi_fetchSkidSubUnit(cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchSkidSubUnit',
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Skid SubUnit.. Please Wait');
        },
        success: function(data){
            // console.log(data);
            cbsuccess(data);
        },
        complete: function(){
            cbcomplete();
            hideLoadingReport();
        }
    });
}
function capi_createSkidSubUnit(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createSkidSubUnit',
            'id' : options.id,
            'name' : options.name,
            'unitid' : options.unitid,
            'process' : options.process,
            'tag' : options.tag
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Skid SubUnit.. Please Wait');
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
function capi_deleteSkidSubUnit(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteSkidSubUnit',
            'id' : options.id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Skid SubUnit.. Please Wait');
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
function capi_updateSkidSubUnit(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateSkidSubUnit',
            'id' : options.id,
            'name' : options.name,
            'unitid' : options.unitid,
            'process' : options.process,
            'tag' : options.tag
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Skid SubUnit.. Please Wait');
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



function capi_fetchSkidEquipment(cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchSkidEquipment',
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Skid Equipment.. Please Wait');
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
function capi_createSkidEquipment(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createSkidEquipment',
            'id' : options.id,
            'name' : options.name
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Skid Equipment.. Please Wait');
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
function capi_deleteSkidEquipment(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteSkidEquipment',
            'id' : options.id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Skid Equipment.. Please Wait');
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
function capi_updateSkidEquipment(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateSkidEquipment',
            'id' : options.id,
            'name' : options.name
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Skid Equipment.. Please Wait');
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


function capi_fetchSkidSubEquipment(cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchSkidSubEquipment',
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Skid SubEquipment.. Please Wait');
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
function capi_createSkidSubEquipment(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createSkidSubEquipment',
            'id' : options.id,
            'name' : options.name,
            'equipmentid' : options.equipmentid,
            'process' : options.process,
            'tag' : options.tag,
            'quantity' : options.quantity,
            'capacity' : options.capacity,
            'tank' : options.tank,
            'room' : options.room,
            'dimensions' : options.dimensions,
            'cost' : options.cost,
            'budget' : options.budget
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Skid SubEquipment.. Please Wait');
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
function capi_deleteSkidSubEquipment(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteSkidSubEquipment',
            'id' : options.id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Skid SubEquipment.. Please Wait');
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
function capi_updateSkidSubEquipment(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateSkidSubEquipment',
            'id' : options.id,
            'name' : options.name,
            'equipmentid' : options.equipmentid,
            'process' : options.process,
            'tag' : options.tag,
            'quantity' : options.quantity,
            'capacity' : options.capacity,
            'tank' : options.tank,
            'room' : options.room,
            'dimensions' : options.dimensions,
            'cost' : options.cost,
            'budget' : options.budget
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Skid SubEquipment.. Please Wait');
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