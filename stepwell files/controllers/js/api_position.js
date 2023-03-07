let apiUrl_position = `api/api_position.php`;


function api_fetchPositions(comid, sender, cbcomplete=()=>{}){
    let url = domain + apiUrl_position;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchpositions',
            'comid' : comid
        },
        dataType: 'json',
        beforeSend: function(){
            $('#report span').text('Fetching Positions.. Please Wait');
            $('#report').css('display','flex').show();
        },
        success: function(data){
            // console.log(data); OK
            fetchPositions(data, sender);
            $('#report').css('display','none').hide();
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function api_fetchPositionByDepartment(comid, department, sender){
    let url = domain + apiUrl_position;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchpositionsbydepartment',
            'comid' : comid,
            'department' : department
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Data.. Please Wait');
        },
        success: function(data){
            // console.log(data); 
            fetchPositionByDepartment(data, sender);
            hideLoadingReport();
        }
    });
}
function api_createPosition(comid, title){
    let url = domain + apiUrl_position;
    console.log('comid-title:', comid, title);
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createposition',
            'id' : rng5(),
            'comid' : comid,
            'title' : title
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Position.. Please Wait');
        },
        success: function(data){
            console.log(data); 
            hideLoadingReport();
        }
    });
}
function api_updatePosition(id, title){
    let url = domain + apiUrl_position;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateposition',
            'id' : id,
            'title' : title
        },
        beforeSend: function(){
            showLoadingReport('Updating Position.. Please Wait');
        },
        dataType: 'json',
        success: function(data){
            console.log(data); 
            hideLoadingReport();
        }
    });
}
function api_deletePosition(id){
    let url = domain + apiUrl_position;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteposition',
            'id' : id,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Position.. Please Wait');
        },
        success: function(data){
            console.log(data); 
            hideLoadingReport();
        }
    });
}
function api_searchPosition(comid, title, department){
    let url = domain + apiUrl_position;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'searchposition',
            'comid' : comid,
            'title' : title,
            'department' : department
        },
        beforeSend: function(){
            showLoadingReport('Fetching Data.. Please Wait');
        },
        dataType: 'json',
        success: function(data){
            // console.log(data);
            searchPositions(data);
            hideLoadingReport();
        }
    });
}
function api_updatePositionDepartment(id, department){
    let url = domain + apiUrl_position;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updatepositiondepartment',
            'id' : id,
            'department' : department
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Data.. Please Wait');
        },
        success: function(data){
            console.log('updatepositiondepartment', data);
            // searchPositions(data);
            hideLoadingReport();
        }
    });
}

function fetchPositions(data, sender){
    if(sender == 'positiontab'){
        $('#position-list').empty();
        $.each(data, function(key, value){
            if(value != 'error'){
                $('#position-list').append(`<span id="${value.id}" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR}" class="btn-shadow position-list-widget">${value.title}</span>`);
            }else{
                // alert('You have not set up your positions. Please add positions first before creating new users.');
                showNotification();
            }
        });
    }
    if(sender == 'create-user-position-list'){
        $('#suuser-create-position').empty();
        $.each(data, function(key, value){
            if(value != 'error'){
                $('#suuser-create-position').append(`<option value="${value.id}">${value.title}</option>`);
            }else{
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
    if(sender == 'suuser-view-department'){
        positionList = [];
        $.each(data, function(key, value){
            if(value != 'error'){
                $('#suuser-create-position').append(`<option value="${value.id}">${value.title}</option>`);
                positionList[positionList.length] = {
                    'id' : value.id,
                    'title' : value.title,
                    'department' : value.department
                };
            }else{
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
    if(sender == 'fetchAccountData'){
        positionList = [];
        $.each(data, function(key, value){
            if(value != 'error'){
                positionList[positionList.length] = {
                    'id' : value.id,
                    'title' : value.title,
                    'department' : value.department
                };
            }else{
                // alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
}
function fetchPositionByDepartment(data, sender){
    if(sender == 'suuser-create-department'){
        $('#suuser-create-position').empty();
        $.each(data, function(key, value){
            if(value != 'error'){
                $('#suuser-create-position').append(`<option value="${value.id}">${value.title}</option>`);
            }else{
                alert('You have not set up your positions. Please add positions first before creating new users.');
            }
        });
    }
    // if(sender == 'suuser-view-position'){ // DEPRECATED
    //     $('#suuser-view-position').empty();
    //     $.each(data, function(key, value){
    //         if(value != 'error'){
    //             $('#suuser-view-position').append(`<option value="${value.id}">${value.title}</option>`);
    //         }else{
    //             alert('You have not set up your positions. Please add positions first before creating new users.');
    //         }
    //     });
    // }
    
}
function searchPositions(data){
    $('#position-list').empty();
    $.each(data, function(key, value){
        if(value != 'error'){
            $('#position-list').append(`<span id="${value.id}" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR}" class="btn-shadow position-list-widget">${value.title}</span>`);
        }else{
            // blinkbg($('#position-create-tbox'), 'red', 'white');
        }
    });
}




function capi_fetchPosition(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_position;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchpositions',
            'comid' : options.comid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Positions.. Please Wait');
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
function capi_createPosition(options, cbcomplete=()=>{}){
    let url = domain + apiUrl_position;
    // console.log('comid-title:', comid, title);
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createposition',
            'id' : options.id,
            'comid' : options.comid,
            'department' : options.department,
            'title' : options.title
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Position.. Please Wait');
        },
        success: function(data){
            console.log(data); 
        },
        complete: function(){
            cbcomplete();
            hideLoadingReport();
        }
    });
}
function capi_updatePosition(options, cbcomplete=()=>{}){
    let url = domain + apiUrl_position;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateposition',
            'id' : options.id,
            'title' : options.title
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Position.. Please Wait');
        },
        success: function(data){
            console.log(data); 
        },
        complete: function(){
            cbcomplete();
            hideLoadingReport();
        }
    });
}
function capi_deletePosition(options, cbcomplete=()=>{}){
    let url = domain + apiUrl_position;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteposition',
            'id' : options.id,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Position.. Please Wait');
        },
        success: function(data){
            console.log(data); 
        },
        complete: function(){
            cbcomplete();
            hideLoadingReport();
        }
    });
}
function capi_updatePositionDepartment(options, cbcomplete=()=>{}){
    let url = domain + apiUrl_position;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updatepositiondepartment',
            'id' : options.id,
            'department' : options.department
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Data.. Please Wait');
        },
        success: function(data){
            console.log(data);
        },
        complete: function(){
            cbcomplete();
            hideLoadingReport();
        }
    });
}