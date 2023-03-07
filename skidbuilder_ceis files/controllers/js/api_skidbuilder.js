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
            'tag' : options.tag,
            'icon' : options.icon
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
            'tag' : options.tag,
            'icon' : options.icon
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
            'budget' : options.budget,
            'icon' : options.icon
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
            'budget' : options.budget,
            'icon' : options.icon
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


function capi_fetchSkidFileByOwner(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchSkidFileByOwner',
            'ownerid': options.ownerid,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Skid File.. Please Wait');
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
function capi_createSkidFile(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    const myblob = new Blob([options.content], {
        type: 'text/plain'
    });
    var fd = new FormData();
    fd.append('function','createSkidFile');
    fd.append('id', options.id);
    fd.append('ownerid', options.ownerid);
    fd.append('filename', options.filename);
    fd.append('content', myblob);
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'POST',
        data: fd,
        contentType: false,
        processData: false,
        cache:false,
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Skid File.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
            console.log(data);
        },
        complete: function(){
            cbcomplete();
            hideLoadingReport();
        }
    });
}
function capi_deleteSkidFile(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteSkidFile',
            'id' : options.id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Skid File.. Please Wait');
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
function capi_archiveSkidFile(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'archiveSkidFile',
            'id' : options.id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Archiving Skid File.. Please Wait');
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
function capi_updateSkidFile(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    const myblob = new Blob([options.content], {
        type: 'text/plain'
    });
    var fd = new FormData();
    fd.append('function','updateSkidFile');
    fd.append('id', options.id);
    fd.append('filename', options.filename);
    fd.append('content', myblob);
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'POST',
        data: fd,
        contentType: false,
        processData: false,
        cache:false,
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Skid File.. Please Wait');
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
function capi_fetchSkidFile(cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchSkidFile'
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Skid File.. Please Wait');
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


function capi_createSkidData(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    const myblob = new Blob([options.content], {
        type: 'text/plain'
    });
    var fd = new FormData();
    fd.append('function','createSkidData');
    fd.append('companyid', options.companyid);
    // fd.append('ownerid', options.ownerid);
    // fd.append('filename', options.filename);
    fd.append('content', myblob);
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'POST',
        data: fd,
        contentType: false,
        processData: false,
        cache:false,
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Skid Data.. Please Wait');
        },
        success: function(blob){
            cbsuccess(blob);
            console.log(blob);
        },
        complete: function(){
            cbcomplete();
            hideLoadingReport();
        }
    });
}
function capi_updateSkidData(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    const myblob = new Blob([options.content], {
        type: 'text/plain'
    });
    var fd = new FormData();
    fd.append('function','updateSkidData');
    fd.append('companyid', options.companyid);
    fd.append('content', myblob);
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'POST',
        data: fd,
        contentType: false,
        processData: false,
        cache:false,
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Skid Data.. Please Wait');
            showToast('Updating Skid Data.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
        },
        complete: function(){
            cbcomplete();
            hideLoadingReport();
            showToast('Successfully Updated Skid Data!');
        }
    });
}


function ajax_data_body_icon_browse_unit(cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    var fd = new FormData();
    const iconid = rngPassword();
    fd.append('function','data_body_icon_browse_unit');
    fd.append('iconid', iconid);
    var x = 0;
    fd.append('img', $('#data-body-icon-browse-unit')[0].files[x]);
    console.log(fd);
    
    $.ajax({
        async: false,
        url: url,
        type: 'post',
        data: fd,
        contentType: false,
        processData: false,
        beforeSend: function(){
            showLoadingReport('Uploading Document.. Please Wait');
        },
        success: function(data){
            console.log(data);
            
            cbsuccess(data);
        },
        complete: function(){
            cbcomplete();
            hideLoadingReport();
        }
    });
}
function ajax_data_body_icon_browse_equipment(cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    var fd = new FormData();
    const iconid = rngPassword();
    fd.append('function','data_body_icon_browse_equipment');
    fd.append('iconid', iconid);
    var x = 0;
    fd.append('img', $('#data-body-icon-browse-equipment')[0].files[x]);
    console.log(fd);
    
    $.ajax({
        async: false,
        url: url,
        type: 'post',
        data: fd,
        contentType: false,
        processData: false,
        beforeSend: function(){
            showLoadingReport('Uploading Document.. Please Wait');
        },
        success: function(data){
            console.log(data);
            
            cbsuccess(data);
        },
        complete: function(){
            cbcomplete();
            hideLoadingReport();
        }
    });
}
function ajax_data_body_icon_save_file(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    const myblob = new Blob([options.content], {
        type: 'text/plain'
    });
    var fd = new FormData();
    fd.append('function','ajax_data_body_icon_save_file');
    fd.append('companyid', options.companyid);
    fd.append('content', myblob);
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'POST',
        data: fd,
        contentType: false,
        processData: false,
        cache:false,
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Skid Icon Data.. Please Wait');
            showToast('Saving Skid Icon Data.. Please Wait');
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


function capi_deleteIcon(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteIcon',
            'url' : options.url
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Skid Icon.. Please Wait');
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

function capi_fetchSkidFileAccess(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchSkidFileAccess',
            'fileid': options.fileid,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Skid File.. Please Wait');
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
function capi_createSkidFileAccess(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createSkidFileAccess',
            'id': options.id,
            'fileid': options.fileid,
            'accountid': options.accountid,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Skid File.. Please Wait');
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
function capi_deleteSkidFileAccess(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteSkidFileAccess',
            'id' : options.id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Skid File.. Please Wait');
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


function capi_fetchSkidFileAccessRequest(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchSkidFileAccessRequest',
            'fileid': options.fileid,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Skid File.. Please Wait');
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
function capi_createSkidFileAccessRequest(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createSkidFileAccessRequest',
            'id': options.id,
            'fileid': options.fileid,
            'accountid': options.accountid,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Skid File.. Please Wait');
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
function capi_deleteSkidFileAccessRequest(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteSkidFileAccessRequest',
            'id' : options.id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Skid File.. Please Wait');
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

function capi_fetchSkidFileProflowConnect(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchSkidFileProflowConnect',
            'fileid': options.fileid,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Skid File.. Please Wait');
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
function capi_createSkidFileProflowConnect(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createSkidFileProflowConnect',
            'id': options.id,
            'fileid': options.fileid,
            'projectid': options.projectid,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Skid File.. Please Wait');
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
function capi_deleteSkidFileProflowConnect(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_skidbuilder;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteSkidFileProflowConnect',
            'id' : options.id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Skid File.. Please Wait');
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