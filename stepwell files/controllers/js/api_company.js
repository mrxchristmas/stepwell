let apiUrl_company = 'api/api_company.php';

function api_fetchAllCompany(sender){
    let url = domain + apiUrl_company;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchallcompany'
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching All Companies.. Please Wait');
        },
        success: function(data){
            fetchAllCompany(data, sender);
        },
        complete: function(){
            hideLoadingReport();
        }
    });
}
function api_createCompanyModule(companyid, modulename, moduleui, cb){
    let url = domain + apiUrl_company;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createcompanymodule',
            'companyid': companyid,
            'modulename': modulename,
            'moduleui': moduleui
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Company Module.. Please Wait');
        },
        success: function(data){
            console.log(data);
        },
        complete: function(){
            hideLoadingReport();
            cb();
        }
    });
}
function api_fetchCompanyModule(companyid, sender, dragoption={}){
    let url = domain + apiUrl_company;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchcompanymodule',
            'companyid': companyid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Company Modules.. Please Wait');
        },
        success: function(data){
            fetchCompanyModule(data, sender, dragoption);
        },
        complete: function(){
            hideLoadingReport();
        }
    });
}
function api_deleteCompanyModule(companyid, moduleui){
    let url = domain + apiUrl_company;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deletecompanymodule',
            'companyid': companyid,
            'moduleui': moduleui
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Company Module.. Please Wait');
        },
        success: function(data){
            console.log(data);
        },
        complete: function(){
            hideLoadingReport();
        }
    });
}
function ajax_fetchPreModule(sender, dragoption = {}){
    let url = domain + 'model/modules.json';
    $.getJSON(url, function(data) {
        fetchPreModule(data, sender, dragoption);
    });
}

function fetchAllCompany(data, sender){
    // console.log(data, sender);
    if(sender == 'nav-moduleman'){
        $('.moduleman-company-widget-con').empty();
        $.each(data, function(key, value){
            if(value != 'error'){
                // console.log(value.companyid, value.name);
                $('.moduleman-company-widget-con').append(`<span comid="${value.companyid}" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};" class="moduleman-company-widget btn-shadow">${value.name}</span>`);

            }else{
                // showNotification('Fetch Error', 'There was no account linked to the provided Id.');
            }
        });
    }
}
function fetchCompanyModule(data, sender, dragoption){
    // console.log(data, sender);
    if(sender == 'moduleman-company-widget'){
        $('.moduleman-company-modules-widget-con').empty();
        // console.log(data);
        $.each(data, function(key, value){
            // console.log(value.name, value.ui);
            if(value.moduleui != undefined && value.moduleui != null && value.moduleui != ''){
                $('.moduleman-company-modules-widget-con').append(`<span ui="${value.moduleui}" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};" class="moduleman-company-modules-widget btn-shadow">${value.modulename}</span>`);
            }
        });
    }
    if(sender == 'nav-uac'){
        // console.log(data);
        $.each(data, function(key, value){
            // console.log(value.name, value.ui);
            if(value.moduleui != undefined && value.moduleui != null && value.moduleui != ''){
                $('.moduleman-company-modules-widget-con').append(`<span ui="${value.moduleui}" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};" class="moduleman-company-modules-widget btn-shadow">${value.modulename}</span>`);
            }
        });
    }
    if(sender == 'uac-user-widget'){
        $('.uac-module-list-widget-con').empty();
        // console.log(data);
        $.each(data, function(key, value){
            // console.log(value.name, value.ui);
            if(value.moduleui != undefined && value.moduleui != null && value.moduleui != ''){
                $('.uac-module-list-widget-con').append(`<span ui="${value.moduleui}" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};" class="uac-module-list-widget btn-shadow">${value.modulename}</span>`);
                $('.uac-module-list-widget').draggable(dragoption);
            }
        });
    }
    if(sender == 'getAccountModules'){
        // $('.uac-module-list-widget-con').empty();
        $('#modules').children('.modules-con').children('.modules-widget').hide();
        // console.log('getAccountModules',data);
        $.each(data, function(key, value){
            // console.log(value.name, value.ui);
            if(value.moduleui != undefined && value.moduleui != null && value.moduleui != ''){
                $(`#modules-${value.moduleui}`).show();
            }
        });
    }
    
}
function fetchPreModule(data, sender, dragoption){
    // console.log(data, sender);
    if(sender == 'moduleman-company-widget'){
        // console.log(data);
        $('.moduleman-module-list-widget-con').empty();
        $.each(data, function(key, value){
            console.log(value.name, value.ui);
            if(value.ui != undefined && value.ui != null && value.ui != ''){
                $('.moduleman-module-list-widget-con').append(`<span ui="${value.ui}" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};" class="moduleman-module-list-widget btn-shadow">${value.name}</span>`);
                $('.moduleman-module-list-widget').draggable(dragoption);
            }
        });
    }
    if(sender == 'getAccountModules'){
        // console.log(data);
        // return data;
        // $('.moduleman-module-list-widget-con').empty();
        $.each(data, function(key, value){
            // console.log(key, value);
            // console.log(value.name, value.ui);
            if(value.ui != undefined && value.ui != null && value.ui != ''){
                $('#navcon-modules').show();
                $('#' + value.ui).show();
            }
        });

    }
    
}

function capi_fetchCompanyModule(options, cbsuccess, cbcomplete,){
    let url = domain + apiUrl_company;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchcompanymodule',
            'companyid': options.companyid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Company Modules.. Please Wait');
        },
        success: function(data){
            fetchCompanyModule(data, sender, dragoption);
        },
        complete: function(){
            hideLoadingReport();
        }
    });
}

function capi_admincreatecompanymodule(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_company;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'admincreatecompanymodule',
            'companyid': options.companyid,
            'modulename': options.modulename,
            'moduleui': options.moduleui,
            'databaseid': options.databaseid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Company Modules.. Please Wait');
        },
        success: function(data){
            console.log(data);
            cbsuccess(data);
        },
        complete: function(){
            hideLoadingReport();
            cbcomplete();
        }
    });
}
function capi_admindeletecompanymodule(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_company;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'admindeletecompanymodule',
            'moduleui': options.moduleui,
            'databaseid': options.databaseid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Company Modules.. Please Wait');
        },
        success: function(data){
            console.log(data);
            cbsuccess(data);
        },
        complete: function(){
            hideLoadingReport();
            cbcomplete();
        }
    });
}