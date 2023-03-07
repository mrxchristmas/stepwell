let apiUrl_document_connect = `api/api_document_connect.php`;


function api_createDocumentConnect(accid, docid, comid, role){
    let url = domain + apiUrl_document_connect;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createdocumentconnect',
            'accid' : accid,
            'docid' : docid,
            'comid' : comid,
            'role' : role
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Document Connect.. Please Wait');
        },
        success: function(data){
            console.log('createdocumentconnect', data);
            hideLoadingReport();
        }
    });
}
function api_deleteDocumentConnect(accid, docid, role){
    let url = domain + apiUrl_document_connect;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deletedocumentconnect',
            'accid' : accid,
            'docid' : docid,
            'role' : role
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Document Connect.. Please Wait');
        },
        success: function(data){
            console.log('deletedocumentconnect', data);
            // cb(data);
            hideLoadingReport();
        }
    });
}
function api_fetchDocumentConnect(docid, comid, sender, cbcomplete=()=>{}){
    let url = domain + apiUrl_document_connect;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchdocumentconnect',
            'docid' : docid,
            'comid' : comid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Document Connect.. Please Wait');
        },
        success: function(data){
            // console.log('api_createDocument', data);
            fetchDocumentConnect(data, sender);
            hideLoadingReport();
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function api_fetchDocumentConnectRead(accid, comid, sender){
    let url = domain + apiUrl_document_connect;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchdocumentconnectread',
            'accid' : accid,
            'comid' : comid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Document Connect.. Please Wait');
        },
        success: function(data){
            // console.log('api_createDocument', data);
            fetchDocumentConnectRead(data, sender);
            hideLoadingReport();
        }
    });
}
function api_fetchDocumentConnectByAccid(accid, comid, sender){
    let url = domain + apiUrl_document_connect;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchdocumentconnectbyaccid',
            'accid' : accid,
            'comid' : comid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Document Connect.. Please Wait');
            console.log('START');
        },
        success: function(data){
            // console.log('api_createDocument', data);
            fetchDocumentConnectByAccid(data, sender);
            hideLoadingReport();
        }
    });
}
function api_deleteDocumentConnectByDocid(docid){
    // This will also delete from tbl_document_history
    let url = domain + apiUrl_document_connect;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deletedocumentconnectbydocid',
            'docid' : docid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Document Connect.. Please Wait');
        },
        success: function(data){
            console.log('deletedocumentconnectbydocid', data);
            // cb(data);
            hideLoadingReport();
        }
    });
}


function fetchDocumentConnect(data, sender){
    // console.log(data, sender);
    if(sender == '.documents-list-widget'){
        // console.log(selDocRole);
        $('.documents-prefs-status-handlers').children('.documents-prefs-status-handlers-widget').remove();
        let x = 0;
        $.each(data, function(key, value){
            if(value != 'error'){
                // console.log(value.id, value.name, value.ordernum, value.catnum);
                if(value.role == selDocRole){
                    let role;
                    if(selDocRole == 'draft'){
                        role = "Draft Creator";
                    }if(selDocRole == 'proofread'){
                        role = "Proofreader";
                    }if(selDocRole == 'review'){
                        role = "Reviewer";
                    }if(selDocRole == 'approve'){
                        role = "Approver";
                    }if(selDocRole == 'postapprove'){
                        role = "Post Approver";
                    }
                    $('.documents-prefs-status-handlers').append(`
                        <span class="documents-prefs-status-handlers-widget" style="color: ${FONT_COLOR}"><b>${role}:</b> ${value.firstname} ${value.lastname}</span>
                    `);
                }
                x++;
            }else{
                // showNotification('Fetch Error', 'There was a problem Fetching the Document Category.');
            }
        });
    }
    if(sender == 'documents-edit-connect-show'){
        // console.log(data);
        $('#documents-edit-director-widget-draft, #documents-edit-director-widget-proofread, #documents-edit-director-widget-review, #documents-edit-director-widget-approve, #documents-edit-director-widget-postapprove').empty();
        documentEditDraftList = [];
        documentEditProofreadList = [];
        documentEditReviewList = [];
        documentEditApproveList = [];
        documentEditPostApproveList = [];
        $.each(data, function(key, value){
            if(value != 'error'){
                if(value.role == 'draft'){
                    documentEditDraftList[documentEditDraftList.length] = value.accid;
                    $('#documents-edit-director-widget-draft').append(`
                        <div class="documents-edit-director-widget-list btn-shadow">
                            <span class="documents-edit-director-widget-list-name">${value.firstname} ${value.lastname}</span>
                            <span class="documents-edit-director-widget-list-id">${value.accid}</span>
                            <i class="documents-edit-director-widget-list-remove fas fa-trash"></i>
                        </div>
                    `);
                }else if(value.role == 'proofread'){
                    documentEditProofreadList[documentEditProofreadList.length] = value.accid;
                    $('#documents-edit-director-widget-proofread').append(`
                        <div class="documents-edit-director-widget-list btn-shadow">
                            <span class="documents-edit-director-widget-list-name">${value.firstname} ${value.lastname}</span>
                            <span class="documents-edit-director-widget-list-id">${value.accid}</span>
                            <i class="documents-edit-director-widget-list-remove fas fa-trash"></i>
                        </div>
                    `);
                }else if(value.role == 'review'){
                    documentEditReviewList[documentEditReviewList.length] = value.accid;
                    $('#documents-edit-director-widget-review').append(`
                        <div class="documents-edit-director-widget-list btn-shadow">
                            <span class="documents-edit-director-widget-list-name">${value.firstname} ${value.lastname}</span>
                            <span class="documents-edit-director-widget-list-id">${value.accid}</span>
                            <i class="documents-edit-director-widget-list-remove fas fa-trash"></i>
                        </div>
                    `);
                }else if(value.role == 'approve'){
                    documentEditApproveList[documentEditApproveList.length] = value.accid;
                    $('#documents-edit-director-widget-approve').append(`
                        <div class="documents-edit-director-widget-list btn-shadow">
                            <span class="documents-edit-director-widget-list-name">${value.firstname} ${value.lastname}</span>
                            <span class="documents-edit-director-widget-list-id">${value.accid}</span>
                            <i class="documents-edit-director-widget-list-remove fas fa-trash"></i>
                        </div>
                    `);
                }else if(value.role == 'postapprove'){
                    documentEditPostApproveList[documentEditPostApproveList.length] = value.accid;
                    $('#documents-edit-director-widget-postapprove').append(`
                        <div class="documents-edit-director-widget-list btn-shadow">
                            <span class="documents-edit-director-widget-list-name">${value.firstname} ${value.lastname}</span>
                            <span class="documents-edit-director-widget-list-id">${value.accid}</span>
                            <i class="documents-edit-director-widget-list-remove fas fa-trash"></i>
                        </div>
                    `);
                }
            }
        });
    }
}
function fetchDocumentConnectRead(data, sender){
    console.log(data, sender);
}
function fetchDocumentConnectByAccid(data, sender){
    // DEPRECATED
    // console.log(data, sender);
    if(sender == 'ready'){
        // console.log(data);
        $.each(data, function(key, value){
            if(value != 'error'){
                // value.role
                api_getDocumentStatusConnect(value.docid, value.role, 'fetchDocumentConnectByAccid');
            }else{
                // showNotification('Fetch Error', 'There was a problem Fetching the Document Category.');
            }
        });

        console.log('END');
        $('.dashboard-header-widget-content').children('i').remove();
        
        $('.color-proofread').children('.dashboard-header-widget-content').append(`
            <b><span style="color: ${FONT_COLOR}; font-size: 1.2em;">Active: ${proofreadActive.length}</span></b>
            <span style="color: ${FONT_COLOR}">Inactive: ${proofreadInactive.length}</span>
        `);
        $('.color-review').children('.dashboard-header-widget-content').append(`
            <b><span style="color: ${FONT_COLOR}; font-size: 1.2em;">Active: ${reviewActive.length}</span></b>
            <span style="color: ${FONT_COLOR}">Inactive: ${reviewInactive.length}</span>
        `);
        $('.color-approve').children('.dashboard-header-widget-content').append(`
            <b><span style="color: ${FONT_COLOR}; font-size: 1.2em;">Active: ${approveActive.length}</span></b>
            <span style="color: ${FONT_COLOR}">Inactive: ${approveInactive.length}</span>
        `);
        $('.color-postapprove').children('.dashboard-header-widget-content').append(`
            <b><span style="color: ${FONT_COLOR}; font-size: 1.2em;">Active: ${postapproveActive.length}</span></b>
            <span style="color: ${FONT_COLOR}">Inactive: ${postapproveInactive.length}</span>
        `);

        // console.log(proofreadActive, proofreadInactive);
    }


}
