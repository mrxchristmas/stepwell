let apiUrl_supplier = `api/api_supplier.php`;

function api_createSupplier(supplierid, companyid, projectid, name, cbsuccess=()=>{}){
    let url = domain + apiUrl_supplier;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createsupplier',
            'supplierid' : supplierid,
            'companyid' : companyid,
            'projectid' : projectid,
            'name' : name
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Supplier.. Please Wait');
        },
        success: function(data){
            console.log('createsupplier: ',data); 
            cbsuccess(data);
             hideLoadingReport();
        }
    });
}
function api_deleteSupplier(supplierid, cbsuccess=()=>{}){
    let url = domain + apiUrl_supplier;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deletesupplier',
            'supplierid' : supplierid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Supplier.. Please Wait');
        },
        success: function(data){
            console.log('deletesupplier: ',data); 
            cbsuccess(data);
             hideLoadingReport();
        }
    });
}
function api_fetchSupplierByCompanyId(companyid, sender, options={}, cbcomplete=()=>{}, cbsuccess=()=>{}){
    let url = domain + apiUrl_supplier;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchsupplierbycompanyid',
            'companyid' : companyid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Supplier.. Please Wait');
        },
        success: function(data){
            // console.log('createAccount: ',data); 
            cbsuccess(data);
            hideLoadingReport();
            fetchSupplierByCompanyId(data, sender, options);
        },
        complete: function(){
            cbcomplete();
        }
    });
}

function fetchSupplierByCompanyId(data, sender, options){
    // console.log(data, sender);
    if(sender == 'tasklist-widget-icon-resources'){
        supplierList = [];
        $.each(data, function(key, value){
            if(value != 'error'){
                supplierList[supplierList.length] = { 
                    "supplierid":value.supplierid, 
                    "projectid":value.projectid, 
                    "name":value.name
                };
            }else{
                // showNotification('Suppliers', 'No Suppliers Fetched. Please create a new one');
            }
        });
    }
    if(sender == 'pschedulelist-widget-icon-resources'){
        supplierList1 = [];
        $.each(data, function(key, value){
            if(value != 'error'){
                supplierList1[supplierList1.length] = { 
                    "supplierid":value.supplierid, 
                    "projectid":value.projectid, 
                    "name":value.name
                };
            }else{
                // showNotification('Suppliers', 'No Suppliers Fetched. Please create a new one');
            }
        });
    }
}








function capi_fetchSupplierByProjectResource(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_supplier;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchsupplierbyprojectresource',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Suppliers.. Please Wait');
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
function capi_fetchSupplierByCompanyId(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_supplier;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchsupplierbycompanyid',
            'companyid' : options.companyid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Supplier.. Please Wait');
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
function capi_createSupplierRate(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_supplier;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createsupplierrate',
            'id' : options.id,
            'supplierid' : options.supplierid,
            'projectid' : options.projectid,
            'type' : options.type,
            'rate' : options.rate
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Supplier.. Please Wait');
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
function capi_fetchSupplierRateByProjectid(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_supplier;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchsupplierratebyprojectid',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Supplier.. Please Wait');
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

function capi_createTmpSupplier(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_supplier;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createtmpsupplier',
            'id' : options.id,
            'projectid' : options.projectid,
            'name' : options.name
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Data.. Please Wait');
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
function capi_fetchTmpSupplierByProjectId(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_supplier;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchtmpsupplierbyprojectid',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Data.. Please Wait');
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
function capi_createSupplier(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_supplier;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createsupplier',
            'supplierid' : options.supplierid,
            'companyid' : options.companyid,
            'projectid' : options.projectid,
            'name' : options.name
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Supplier.. Please Wait');
        },
        success: function(data){
            // console.log('createsupplier: ',data); 
            cbsuccess(data);
        },
        complete : function(){
            cbcomplete();
            hideLoadingReport();
        }
    });
}