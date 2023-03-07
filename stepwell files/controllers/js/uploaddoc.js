const url_upload = 'controllers/ajax/uploaddoc.php';
const url_profileupload = 'controllers/ajax/profileupload.php';

function api_uploadDocument(file){
    let url = domain + apiUrl_project;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'uploadocs',
            'file' : file
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Project.. Please Wait');
        },
        success: function(data){
            console.log(data); 
            hideLoadingReport();
        }
    });
}
function ajax_saveSingleImage(selector){
    var ret;
    var fd = new FormData();
    fd.append('function','uploadItemImages');
    var x = 0;
    fd.append('image', selector[0].files[x]);
    $.ajax({
        async: false,
        url: dbUrl,
        type: 'post',
        data: fd,
        contentType: false,
        processData: false,
        success: function(data){
            // alert(data);
            ret = data;
        },
    });
    return ret;
}

function ajax_deleteSingleImage(filename, cb=()=>{}){
    $.ajax({
        async: false,
        url: domain + url_upload,
        type: 'post',
        data: {
            "function": "deletesingleimage",
            "filename": filename
        },
        beforeSend: function(){
            showLoadingReport('Deleting Old Document.. Please Wait');
        },
        success: function(data){
            console.log('deletesingleimage', data);
            cb(data);
        },
        complete: function(){
            hideLoadingReport();
        }
    });
}
function ajax_saveSingleDocument(selector, cb){
    var fd = new FormData();
    fd.append('function','uploadocs');
    var x = 0;
    fd.append('doc', selector[0].files[x]);
    $.ajax({
        async: false,
        url: domain + url_upload,
        type: 'post',
        data: fd,
        contentType: false,
        processData: false,
        beforeSend: function(){
            showLoadingReport('Uploading Document.. Please Wait');
        },
        success: function(data){
            cb(data);
            hideLoadingReport();
        }
    });
}

function ajax_docbuilder_uploaddoc(selector, companyid, userid, cbsuccess, cbcomplete=()=>{}){
    var fd = new FormData();
    fd.append('function','docbuilder_uploaddoc');
    fd.append('companyid', companyid);
    fd.append('userid', userid);
    var x = 0;
    fd.append('doc', selector[0].files[x]);
    $.ajax({
        async: false,
        url: domain + url_upload,
        type: 'post',
        data: fd,
        contentType: false,
        processData: false,
        beforeSend: function(){
            showLoadingReport('Uploading Document.. Please Wait');
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
function ajax_docflow_uploaddoc(selector, docid, cbsuccess, cbcomplete=()=>{}){
    var fd = new FormData();
    fd.append('function','docflow_uploaddoc');
    fd.append('userid', docid);
    var x = 0;
    fd.append('doc', selector[0].files[x]);
    $.ajax({
        async: false,
        url: domain + url_upload,
        type: 'post',
        data: fd,
        contentType: false,
        processData: false,
        beforeSend: function(){
            showLoadingReport('Uploading Document.. Please Wait');
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
function ajax_uploadDocumentBank(url, ownerid, cbsuccess, cbcomplete=()=>{}){
    var fd = new FormData();
    fd.append('function','uploaddocumentbank');
    fd.append('url', url);
    fd.append('ownerid', ownerid);
    $.ajax({
        async: false,
        url: domain + url_upload,
        type: 'post',
        data: fd,
        dataType: 'json',
        contentType: false,
        processData: false,
        beforeSend: function(){
            showLoadingReport('Uploading Document.. Please Wait');
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
function ajax_budget_uploadfile(selector, budgetid, cbsuccess=()=>{}, cbcomplete=()=>{}){
    var fd = new FormData();
    fd.append('function','budget_uploadfile');
    fd.append('budgetid', budgetid);
    var x = 0;
    fd.append('doc', selector[0].files[x]);
    // console.log(fd);
    $.ajax({
        async: false,
        url: domain + url_upload,
        type: 'post',
        data: fd,
        contentType: false,
        processData: false,
        beforeSend: function(){
            showLoadingReport('Uploading Document.. Please Wait');
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
function ajax_deleteSingleFile(filename, cbsuccess=()=>{}, cbcomplete=()=>{}){
    $.ajax({
        async: false,
        url: domain + url_upload,
        type: 'post',
        data: {
            "function": "deletesinglefile",
            "filename": filename
        },
        beforeSend: function(){
            showLoadingReport('Deleting Old Document.. Please Wait');
        },
        success: function(data){
            console.log('deletesinglefile', data);
            cbsuccess(data);
        },
        complete: function(){
            hideLoadingReport();
            cbcomplete();
        }
    });
}
function ajax_profileUpload(selector, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let fd = new FormData();
    const xd = selector[0].files[0];
    fd.append('function','uploadProfile');
    fd.append('doc', xd);
    $.ajax({
        async: false,
        url: domain + url_upload,
        type: 'post',
        data: fd,
        contentType: false,
        processData: false,
        beforeSend: function(){
            showLoadingReport('Uploading Document.. Please Wait');
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

function ajax_zzprofileUpload(selector, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let fd = new FormData();
    fd.append('function','uploadProfile');
    fd.append('doc', selector[0].files[0]);
    // console.log(domain + url_profileupload);
    $.ajax({
        async: false,
        url: domain + url_profileupload,
        type: 'get',
        data: fd,
        contentType: false,
        processData: false,
        beforeSend: function(){
            showLoadingReport('Uploading Document.. Please Wait');
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