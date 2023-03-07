let apiUrl_department = `api/api_department.php`;


function api_fetchDepartments(comid, sender, cbcomplete=()=>{}){
    let url = domain + apiUrl_department;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchdepartments',
            'comid' : comid
        },
        dataType: 'json',
        beforeSend: function(){
            // showLoadingReport('Fetching Data.. Please Wait');
        },
        success: function(data){
            // console.log(data); OK
            fetchDepartments(data, sender);
            // hideLoadingReport();
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function api_createDepartment(comid, title){
    let url = domain + apiUrl_department;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createdepartment',
            'id' : rng5(),
            'comid' : comid,
            'title' : title
        },
        beforeSend: function(){
            showLoadingReport('Creating Data.. Please Wait');
        },
        dataType: 'json',
        success: function(data){
            console.log(data); 
            hideLoadingReport();
        }
    });
}
function api_updateDepartment(id, title){
    let url = domain + apiUrl_department;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updatedepartment',
            'id' : id,
            'title' : title
        },
        beforeSend: function(){
            showLoadingReport('Updating Data.. Please Wait');
        },
        dataType: 'json',
        success: function(data){
            console.log(data); 
            hideLoadingReport();
        }
    });
}
function api_deleteDepartment(id){
    let url = domain + apiUrl_department;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deletedepartment',
            'id' : id,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Data.. Please Wait');
        },
        success: function(data){
            console.log(data); 
            hideLoadingReport();
        }
    });
}
function api_searchDepartment(comid, title){
    let url = domain + apiUrl_department;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'searchdepartment',
            'comid' : comid,
            'title' : title
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Data.. Please Wait');
        },
        success: function(data){
            // console.log(data);
            searchDepartments(data);
            hideLoadingReport();
        }
    });
}



function fetchDepartments(data, sender){
    if(sender == 'departmenttab'){
        $('#department-list').empty();
        $.each(data, function(key, value){
            // console.log(value);
            if(value != 'error'){
                $('#department-list').append(`<span id="${value.id}" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR}" class="btn-shadow department-list-widget">${value.title}</span>`);
            }else{
                alert('You have not set up your departments. Please add departments first before creating new users.');
            }
        });
    }
    if(sender == 'create-user-department-list'){
        $('#suuser-create-department').empty();
        $('#suuser-create-department').append('<option value="na">Select Department</option>');
        $.each(data, function(key, value){
            if(value != 'error'){
                $('#suuser-create-department').append(`<option value="${value.id}">${value.title}</option>`);
            }else{
                alert('You have not set up your departments. Please add departments first before creating new users.');
            }
        });
    }
    if(sender == 'position-search-department'){
        $('#position-search-department').empty();
        $('#position-search-department').append(`<option value="null">All Positions</option><option value="na">Unassigned Position</option>`);
        $.each(data, function(key, value){
            if(value != 'error'){
                $('#position-search-department').append(`<option value="${value.id}">${value.title}</option>`);
            }else{
                alert('You have not set up your departments. Please add departments first before creating new users.');
            }
        });
    }
    if(sender == 'position-assign-department'){
        $('#position-assign-department').empty();
        $.each(data, function(key, value){
            if(value != 'error'){
                $('#position-assign-department').append(`<option value="${value.id}">${value.title}</option>`);
            }else{
                alert('You have not set up your departments. Please add departments first before creating new users.');
            }
        });
    }
    if(sender == 'suuser-view-department'){
        $('#suuser-view-department').empty();
        $.each(data, function(key, value){
            if(value != 'error'){
                $('#suuser-view-department').append(`<option value="${value.id}">${value.title}</option>`);
                departmentList[departmentList.length] = {
                    'id' : value.id,
                    'title': value.title
                };
            }else{
                alert('You have not set up your departments. Please add departments first before creating new users.');
            }
        });
    }
    if(sender == 'fetchAccountData'){
        departmentList = [];
        $.each(data, function(key, value){
            if(value != 'error'){
                departmentList[departmentList.length] = {
                    'id' : value.id,
                    'title': value.title
                };
            }else{
                alert('You have not set up your departments. Please add departments first before creating new users.');
            }
        });
    }
    
}
function searchDepartments(data){
    $('#department-list').empty();
    $.each(data, function(key, value){
        if(value != 'error'){
            $('#department-list').append(`<span id="${value.id}" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR}" class="btn-shadow department-list-widget">${value.title}</span>`);
        }else{
            // blinkbg($('#position-create-tbox'), 'red', 'white');
        }
    });
}




function capi_fetchDepartments(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_department;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchdepartments',
            'comid' : options.comid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Data.. Please Wait');
        },
        success: function(data){
            console.log(data);
            cbsuccess(data);
        },
        complete: function(){
            cbcomplete();
            // hideLoadingReport();
        }
    });
}
function capi_updateDepartment(options, cbcomplete=()=>{}){
    let url = domain + apiUrl_department;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updatedepartment',
            'id' : options.id,
            'title' : options.title
        },
        beforeSend: function(){
            showLoadingReport('Updating Data.. Please Wait');
        },
        dataType: 'json',
        success: function(data){
            // console.log(data);
        },
        complete: function(){
            cbcomplete();
            hideLoadingReport();
        }
    });
}
function capi_deleteDepartment(options, cbcomplete){
    let url = domain + apiUrl_department;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deletedepartment',
            'id' : options.id,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Data.. Please Wait');
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
function capi_createDepartment(options, cbcomplete){
    let url = domain + apiUrl_department;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createdepartment',
            'id' : options.id,
            'comid' : options.comid,
            'title' : options.title
        },
        beforeSend: function(){
            showLoadingReport('Creating Data.. Please Wait');
        },
        dataType: 'json',
        success: function(data){
            console.log(data); 
        },
        complete: function(){
            cbcomplete();
            hideLoadingReport();
        }
    });
}