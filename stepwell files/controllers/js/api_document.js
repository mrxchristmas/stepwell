let apiUrl_document = `api/api_document.php`;


function api_createDocument(docid, comid, docsuff, cat1, cat2, cat3, cat4, ownerid, title, zurl, version, status, reference, projectid){
    let url = domain + apiUrl_document;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createdocument',
            'docid' : docid,
            'comid' : comid,
            'docsuff' : docsuff,
            'cat1' : cat1,
            'cat2' : cat2,
            'cat3' : cat3,
            'cat4' : cat4,
            'ownerid' : ownerid,
            'title' : title,
            'url' : zurl,
            'version' : version,
            'status' : status,
            'reference' : reference,
            'projectid' : projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Document.. Please Wait');
        },
        success: function(data){
            console.log('createdocument', data);
            hideLoadingReport();
        }
    });
}
function api_getDocumentCountByCategory(cat1, cat2, cat3, cat4, cb){
    let url = domain + apiUrl_document;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'getdocumentcountbycategory',
            'cat1' : cat1,
            'cat2' : cat2,
            'cat3' : cat3,
            'cat4' : cat4
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Document.. Please Wait');
        },
        success: function(data){
            // console.log('api_createDocument', data);
            cb(data);
            hideLoadingReport();
        }
    });
}
function api_deleteDocument(docid){
    let url = domain + apiUrl_document;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deletedocument',
            'docid' : docid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Document.. Please Wait');
        },
        success: function(data){
            console.log('deletedocument', data);
            hideLoadingReport();
        }
    });
}
function api_fetchDocumentQuery(comid, query, sender, cbcomplete=()=>{}){
    let url = domain + apiUrl_document;
    // "SELECT * FROM  tbl_document WHERE comid = '$comid' AND $query"
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchdocumentquery',
            'comid' : comid,
            'query' : query
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Documents.. Please Wait');
        },
        success: function(data){
            fetchDocumentQuery(data, sender);
            hideLoadingReport();
        },
        complete : function(){
            cbcomplete();
        }
    });
}
function api_updateDocumentStatus(docid, status, cb=()=>{}){
    // will also update tbl_document_history docstatus=status
    // will also delete from tbl_document_history
    let url = domain + apiUrl_document;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updatedocumentstatus',
            'docid' : docid,
            'status' : status
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Document.. Please Wait');
        },
        success: function(data){
            console.log('updatedocumentstatus', data);
            cb();
            hideLoadingReport();
            // cleanDocumentHistory(docid, status);
        }
    });
}
function api_fetchAvailableDocumentMap(comid, sender, cbcomplete=()=>{}){
    let url = domain + apiUrl_document;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchavailabledocumentmap',
            'comid' : comid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Documents.. Please Wait');
        },
        success: function(data){
            fetchAvailableDocumentMap(data, sender);
            hideLoadingReport();
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function api_getDocumentStatus(docid, sender, cbcomplete=()=>{}){
    let url = domain + apiUrl_document;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'getdocumentstatus',
            'docid' : docid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Documents.. Please Wait');
        },
        success: function(data){
            getDocumentStatus(data, sender);
            hideLoadingReport();
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function api_getDocumentStatusConnect(docid, role, sender, cbcomplete=()=>{}){
    let url = domain + apiUrl_document;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'getdocumentstatus',
            'docid' : docid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Documents.. Please Wait');
        },
        success: function(data){
            getDocumentStatusConnect(data, role, sender);
            hideLoadingReport();
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function api_createDocumentHistory(role, docid, accid, version, status, zurl, notes, reason){
    let url = domain + apiUrl_document;
    // console.log(id, docid, accid, version, status, zurl, notes, reason);
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createdocumenthistory',
            'role' : role,
            'docid' : docid,
            'accid' : accid,
            'version' : version,
            'status' : status,
            'url' : zurl,
            'notes' : notes,
            'reason' : reason
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Document History.. Please Wait');
        },
        success: function(data){
            console.log('createdocumenthistory', data);
            hideLoadingReport();
        }
    });
}
function api_updateDocumentHistoryStatus(docid, accid, version, status, role, reason, date){
    let url = domain + apiUrl_document;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updatedocumenthistorystatus',
            'docid' : docid,
            'accid' : accid,
            'version' : version,
            'status' : status,
            'role' : role,
            'reason' : reason,
            'date' : date
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Document History.. Please Wait');
        },
        success: function(data){
            console.log('updatedocumentstatus', data);
            hideLoadingReport();
        }
    });
}
function api_checkIfDocumentHistoryExists(docid, accid, role, cb){
    let url = domain + apiUrl_document;
    // console.log(docid, accid, version);
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'checkifdocumenthistoryexists',
            'docid' : docid,
            'accid' : accid,
            'role' : role
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Checking Files.. Please Wait');
        },
        success: function(data){
            // console.log('checkifdocumenthistoryexists', data.found);
            cb(data);
            hideLoadingReport();
        }
    });
}
function api_updateDocumentHistory(docid, accid, version, zurl, notes, role){
    let url = domain + apiUrl_document;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updatedocumenthistory',
            'docid' : docid,
            'accid' : accid,
            'version' : version,
            'url' : zurl,
            'notes' : notes,
            'role' : role
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Document History.. Please Wait');
        },
        success: function(data){
            console.log('updatedocumenthistory', data);
            hideLoadingReport();
        }
    });
}
function api_fetchDocumentHistoryStatus(docid, accid, role, cbsuccess){
    let url = domain + apiUrl_document;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchdocumenthistorystatus',
            'docid' : docid,
            'accid' : accid,
            'role' : role
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Document History.. Please Wait');
        },
        success: function(data){
            // console.log('updatedocumenthistory', data);
            cbsuccess(data);
            hideLoadingReport();
        }
    });
}
function api_fetchDocumentHistory(docid, sender, cbcomplete=()=>{}){
    let url = domain + apiUrl_document;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchdocumenthistory',
            'docid' : docid,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Document History.. Please Wait');
        },
        success: function(data){
            // console.log('updatedocumenthistory', data);
            fetchDocumentHistory(data, sender);
            hideLoadingReport();
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function api_fetchDocumentHistoryByAccid(accid, sender, cbcomplete=()=>{}){
    let url = domain + apiUrl_document;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchdocumenthistorybyaccid',
            'accid' : accid,
        },
        dataType: 'json',
        beforeSend: function(){
            // showLoadingReport('Fetching Document History.. Please Wait');
            console.log('START');
        },
        success: function(data){
            // console.log('updatedocumenthistory', data);
            fetchDocumentHistoryByAccid(data, sender);
            // hideLoadingReport();
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function api_fetchDocumentHistoryByOwnerId(ownerid, sender, cbcomplete=()=>{}){
    let url = domain + apiUrl_document;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchdocumenthistorybyownerid',
            'ownerid' : ownerid,
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Fetching Document History.. Please Wait');
            console.log('START');
        },
        success: function(data){
            // console.log('updatedocumenthistory', data);
            fetchDocumentHistoryByOwnerId(data, sender);
            hideLoadingReport();
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function api_updateDocumentCategory(docid, cat1, cat2, cat3, cat4, cbcomplete=()=>{}){
    let url = domain + apiUrl_document;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updatedocumentcategory',
            'docid' : docid,
            'cat1' : cat1,
            'cat2' : cat2,
            'cat3' : cat3,
            'cat4' : cat4
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Documents.. Please Wait');
        },
        success: function(data){
            console.log('updatedocumentcategory', data);
        },
        complete: function(){
            hideLoadingReport();
            cbcomplete();
        }
    });
}
function api_updateDocumentColumn(docid, columnname, value, cbcomplete=()=>{}){
    let url = domain + apiUrl_document;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updatedocumentcolumn',
            'docid' : docid,
            'columnname' : columnname,
            'value' : value
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating  Documents.. Please Wait');
        },
        success: function(data){
            console.log('updatedocumentcolumn', data);
            hideLoadingReport();
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function api_deleteDocumentMapping(planid, cbcomplete=()=>{}){
    let url = domain + apiUrl_document;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deletedocumentmapping',
            'planid' : planid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Documents.. Please Wait');
        },
        success: function(data){
            console.log('deletedocumentmapping', data);
            hideLoadingReport();
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function api_fetchDocumentMappingByAccountId(accid, sender, cbcomplete=()=>{}){
    let url = domain + apiUrl_document;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchdocumentmappingbyaccountid',
            'accid' : accid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Documents.. Please Wait');
        },
        success: function(data){
            // console.log('fetchdocumentmappingbyaccountid', data);
            fetchDocumentMappingByAccountId(data, sender);
            hideLoadingReport();
        },
        complete: function(){
            cbcomplete();
        }
    });
}

function api_fetchDocumentByProjectId(projectid, ownerid, sender, options={}, cbcomplete=()=>{}){
    let url = domain + apiUrl_document;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchdocumentbyprojectId',
            'projectid' : projectid,
            'ownerid' : ownerid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Documents.. Please Wait');
        },
        success: function(data){
            console.log('fetchdocumentbyprojectId', data);
            fetchDocumentByProjectId(data, sender, options);
        },
        complete: function(){
            cbcomplete();
            hideLoadingReport();
        }
    });
}
function api_createDocumentBank( docid, comid, projectid, ownerid, cat1, cat2, cat3, cat4, title, zurl, version, reference, cbcomplete=()=>{}){
    let url = domain + apiUrl_document;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createdocumentbank',
            'docid' : docid,
            'comid' : comid,
            'projectid' : projectid,
            'ownerid' : ownerid,
            'cat1' : cat1,
            'cat2' : cat2,
            'cat3' : cat3,
            'cat4' : cat4,
            'title' : title,
            'url' : zurl,
            'version' : version,
            'reference' : reference
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Documents.. Please Wait');
        },
        success: function(data){
            console.log('createdocumentbank', data);
            hideLoadingReport();
        },
        complete: function(){
            cbcomplete();
        }
    });
}
function api_getDocumentBankCategoryCount(cat1, cat2, cat3, cat4, sender, cbsuccess){
    let url = domain + apiUrl_document;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'getdocumentbankcategorycount',
            'cat1' : cat1,
            'cat2' : cat2,
            'cat3' : cat3,
            'cat4' : cat4
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Documents.. Please Wait');
        },
        success: function(data){
            // console.log('fetchdocumentbyprojectId', data);
            cbsuccess(data);
            hideLoadingReport();
        }
    });
}
function api_updateDocidToEffectiveId(newid, oldid, version, cbsuccess){
    let url = domain + apiUrl_document;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updatedocidtoeffectiveid',
            'newid' : newid,
            'oldid' : oldid,
            'version' : version
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Documents.. Please Wait');
        },
        success: function(data){
            console.log('updatedocidtoeffectiveid', data);
            cbsuccess(data);
            hideLoadingReport();
        }
    });
}
function api_updateDocumentSendToExecution( docid, version, cbsuccess){
    let url = domain + apiUrl_document;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updatedocumentsendtoexecution',
            'docid' : docid,
            'version' : version
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Documents.. Please Wait');
        },
        success: function(data){
            console.log('updatedocumentsendtoexecution', data);
            cbsuccess(data);
            hideLoadingReport();
        }
    });
}



function fetchDocumentQuery(data, sender){
    if(sender == '.documents-header-category-btn'){
        $('.documents-list-widget-con').empty();
        $('#documents-list-searchbox-tbox').attr('placeholder', "Search within Selected Category");
        $.each(data, function(key, value){
            if(value != 'error'){
                // console.log(value.docid, value.docsuff, value.cat1, value.cat2);
                
                
                $('.documents-list-widget-con').append(`
                    <div class="documents-list-widget btn-shadow" 
                    docid="${value.docid}" docsuff="${value.docsuff}" ownerid="${value.ownerid}" 
                    cat1="${value.cat1}" cat2="${value.cat2}" cat3="${value.cat3}" cat4="${value.cat4}" 
                    title="${value.title}" url="${value.url}" version="${value.version}" status="${value.status}" 
                    reference="${value.reference}" draftstamp="${value.draftstamp}" proofreadstamp="${value.proofreadstamp}" 
                    reviewstamp="${value.reviewstamp}" approvestamp="${value.approvestamp}" postapprovestamp="${value.postapprovestamp}" 
                    style="background-color: ${BTN_COLOR}"
                    >
                        <span style="color: ${FONT_COLOR}" class="documents-list-widget-title">${value.title}</span>
                        <span style="color: ${FONT_COLOR}" class="documents-list-widget-id">${value.docid}</span>
                    </div>
                `);
                
            }else{
                showNotification('Fetch Error', 'There was a problem Fetching the Document Category.');
            }
        });
    }
    if(sender == 'nav-me'){
        console.log(data, sender);
        $('.me-body').empty();
        $.each(data, function(key, value){
            if(value != 'error'){

                
                const ds = value.docsuff.split('-').pop();
                const showid = value.docid;
                let proofreadstage = 'wdidle';
                let reviewstage = 'wdidle';
                let approvestage = 'wdidle';
                let postapprovestage = 'wdidle';
                const status = value.status;

                
                // const draftwhen = dateFns.distanceInWordsToNow(Date.parse(value.draftstamp),{addSuffix: true});
                const draftwhen = dateFns.distanceInWordsStrict(
                    new Date(),
                    Date.parse(value.draftstamp),
                    {
                        addSuffix: true,
                        unit: 'd'
                    }
                )
                let proofreadwhen;
                let reviewwhen;
                let approvewhen;
                let postapprovewhen;

                let draftcontent = `<span class="stage-con-widget-content" style="color: white;">${draftwhen}</span>`;
                let proofreadcontent = `<i class="fas fa-times-circle stage-con-widget-content" style="color: white;"></i>`;
                let reviewcontent = `<i class="fas fa-times-circle stage-con-widget-content" style="color: white;"></i>`;
                let approvecontent = `<i class="fas fa-times-circle stage-con-widget-content" style="color: white;"></i>`;
                let postapprovecontent = `<i class="fas fa-times-circle stage-con-widget-content" style="color: white;"></i>`;

                if(status == 'proofread'){
                    proofreadstage = 'wdactive';

                    proofreadcontent = `<span class="stage-con-widget-content" style="color: white;">ongoing</span>`;
                }else if(status == 'review'){
                    reviewstage = 'wdactive';
                    // proofreadwhen = dateFns.distanceInWordsToNow(Date.parse(value.proofreadstamp),{addSuffix: true});
                    proofreadwhen = dateFns.distanceInWordsStrict(new Date(),Date.parse(value.proofreadstamp),{addSuffix: true, unit: 'd'});

                    proofreadcontent = `<span class="stage-con-widget-content"  style="color: white;">${proofreadwhen}</span>`;
                    reviewcontent = `<span class="stage-con-widget-content" style="color: white;">ongoing</span>`;
                }else if(status == 'approve'){
                    approvestage = 'wdactive';
                    proofreadwhen = dateFns.distanceInWordsStrict(new Date(),Date.parse(value.proofreadstamp),{addSuffix: true, unit: 'd'});
                    reviewwhen = dateFns.distanceInWordsStrict(new Date(),Date.parse(value.reviewstamp),{addSuffix: true, unit: 'd'});
                    
                    proofreadcontent = `<span class="stage-con-widget-content" style="color: white;">${proofreadwhen}</span>`;
                    reviewcontent = `<span class="stage-con-widget-content" style="color: white;">${reviewwhen}</span>`;
                    approvecontent = `<span class="stage-con-widget-content" style="color: white;">ongoing</span>`;
                }else if(status == 'postapprove'){
                    postapprovestage = 'wdactive';
                    proofreadwhen = dateFns.distanceInWordsStrict(new Date(),Date.parse(value.proofreadstamp),{addSuffix: true, unit: 'd'});
                    reviewwhen = dateFns.distanceInWordsStrict(new Date(),Date.parse(value.reviewstamp),{addSuffix: true, unit: 'd'});
                    approvewhen = dateFns.distanceInWordsStrict(new Date(),Date.parse(value.approvestamp),{addSuffix: true, unit: 'd'});

                    proofreadcontent = `<span class="stage-con-widget-content" style="color: white;">${proofreadwhen}</span>`;
                    reviewcontent = `<span class="stage-con-widget-content" style="color: white;">${reviewwhen}</span>`;
                    approvecontent = `<span class="stage-con-widget-content" style="color: white;">${approvewhen}</span>`;
                    postapprovecontent = `<span class="stage-con-widget-content" style="color: white;">ongoing</span>`;
                }else if(status == 'ok'){
                    postapprovestage = 'wdactive';
                    proofreadwhen = dateFns.distanceInWordsStrict(new Date(),Date.parse(value.proofreadstamp),{addSuffix: true, unit: 'd'});
                    reviewwhen = dateFns.distanceInWordsStrict(new Date(),Date.parse(value.reviewstamp),{addSuffix: true, unit: 'd'});
                    approvewhen = dateFns.distanceInWordsStrict(new Date(),Date.parse(value.approvestamp),{addSuffix: true, unit: 'd'});
                    postapprovewhen = dateFns.distanceInWordsStrict(new Date(),Date.parse(value.postapprovestamp),{addSuffix: true, unit: 'd'});
                    
                    proofreadcontent = `<span class="stage-con-widget-content" style="color: white;">${proofreadwhen}</span>`;
                    reviewcontent = `<span class="stage-con-widget-content" style="color: white;">${reviewwhen}</span>`;
                    approvecontent = `<span class="stage-con-widget-content" style="color: white;">${approvewhen}</span>`;
                    postapprovecontent = `<span class="stage-con-widget-content" style="color: white;">${postapprovewhen}</span>`;
                }

                $('.me-body').append(`
                    <div id="${value.docid}" class="me-body-widget color-sc">
                        <i class="fas fa-sync-alt me-body-widget-refresh" style="color: white;"></i>
                        <a href="${value.url}" download="${value.title}" class="me-body-widget-download" style="color: white;" ><i class="fas fa-file-download"></i></a>
                        <div class="me-body-widget-title-con">
                            <span class="me-body-widget-title color-font">${value.title}</span>&nbsp;
                            <span class="me-body-widget-version color-font">v${value.version}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span class="me-body-widget-showid color-font">${showid}</span>
                        </div>
                        <div class="me-body-widget-stage-con">

                            <div class="stage-con-widget color-draft wdidle">
                                <span class="stage-con-widget-title color-font">Draft</span>
                                ${draftcontent}
                            </div>
                            <div class="stage-con-widget color-proofread ${proofreadstage}">
                                <span class="stage-con-widget-title color-font">Proofread</span>
                                ${proofreadcontent}
                            </div>
                            <div class="stage-con-widget color-review ${reviewstage}">
                                <span class="stage-con-widget-title color-font">Review</span>
                                ${reviewcontent}
                            </div>
                            <div class="stage-con-widget color-approve ${approvestage}">
                                <span class="stage-con-widget-title color-font">Approve</span>
                                ${approvecontent}
                            </div>
                            <div class="stage-con-widget color-postapprove ${postapprovestage}">
                                <span class="stage-con-widget-title color-font">Post Approve</span>
                                ${postapprovecontent}
                            </div>

                        </div>
                        <br>
                        <span class="me-body-widget-director-title"  style="color: white;">Proofreaders</span>
                        <div class="me-body-widget-director-con">


                            
                           



                        </div>
                        <div class="me-body-widget-history-con">
                            <span class="me-body-widget-history-title">Document History</span>

                        </div>
                    </div>
                `);

                   
                


            }else{
                // showNotification('Fetch Error', 'There was a problem Fetching the Document Category.');
            }
        });
    }
    if(sender= 'showDocumentMapping'){
        // console.log(data);
        $('#document-mapping > .con > .doclist').empty();
        documentMappingList = [];
        let x = 0;
        $.each(data, function(key, value){
            if(value != 'error'){
                $('#document-mapping > .con > .doclist').append(`
                    <div class="document-mapping-doclist-widget btn-shadow">
                        <span class="doctitle">${value.title}</span>
                        <span class="docid">${value.docid}</span>
                    </div>
                `);
                documentMappingList[x] = {'docid' : value.docid, 'title' : value.title};
                x++;
            }
        });
    }
    
}
function fetchAvailableDocumentMap(data, sender){
    // console.log(data, sender);
    if(sender == 'sender'){

    }
}
function getDocumentStatus(data, sender){
    console.log(data, sender);
}
function getDocumentStatusConnect(data, role, sender){  // DEPRECATED
    // console.log(data, role, sender);
    if(sender == 'fetchDocumentConnectByAccid'){
        // DEPRECATED
        $.each(data, function(key, value){
            if(value != 'error'){
                // console.log('TEEEST', value.ownerid);
                // console.log(value.docid, value.status, role);
                if(value.status == role && role == 'proofread'){
                    proofreadActive[proofreadActive.length] = {
                        'docid' : value.docid,
                        'docsuff' : value.docsuff,
                        'cat1' : value.cat1,
                        'cat2' : value.cat2,
                        'cat3' : value.cat3,
                        'cat4' : value.cat4,
                        'ownerid' : value.ownerid,
                        'title' : value.title,
                        'url' : value.url,
                        'version' : value.version,
                        'status' : value.status,
                        'reference' : value.reference,
                        'draftstamp' : value.draftstamp,
                        'proofreadstamp' : 'na',
                        'reviewstamp' : 'na',
                        'approvestamp' : 'na',
                        'postapprovestamp' : 'na'
                    };
                }else if(value.status != role && role == 'proofread'){
                    proofreadInactive[proofreadInactive.length] = {
                        'docid' : value.docid,
                        'docsuff' : value.docsuff,
                        'cat1' : value.cat1,
                        'cat2' : value.cat2,
                        'cat3' : value.cat3,
                        'cat4' : value.cat4,
                        'ownerid' : value.ownerid,
                        'title' : value.title,
                        'url' : value.url,
                        'version' : value.version,
                        'status' : value.status,
                        'reference' : value.reference,
                        'draftstamp' : value.draftstamp,
                        'proofreadstamp' : 'na',
                        'reviewstamp' : 'na',
                        'approvestamp' : 'na',
                        'postapprovestamp' : 'na'
                    };
                }

                if(value.status == role && role == 'review'){
                    reviewActive[reviewActive.length] = {
                        'docid' : value.docid,
                        'docsuff' : value.docsuff,
                        'cat1' : value.cat1,
                        'cat2' : value.cat2,
                        'cat3' : value.cat3,
                        'cat4' : value.cat4,
                        'ownerid' : value.ownerid,
                        'title' : value.title,
                        'url' : value.url,
                        'version' : value.version,
                        'status' : value.status,
                        'reference' : value.reference,
                        'draftstamp' : value.draftstamp,
                        'proofreadstamp' : value.proofreadstamp,
                        'reviewstamp' : 'na',
                        'approvestamp' : 'na',
                        'postapprovestamp' : 'na'
                    };
                }else if(value.status != role && role == 'review'){
                    reviewInactive[reviewInactive.length] = {
                        'docid' : value.docid,
                        'docsuff' : value.docsuff,
                        'cat1' : value.cat1,
                        'cat2' : value.cat2,
                        'cat3' : value.cat3,
                        'cat4' : value.cat4,
                        'ownerid' : value.ownerid,
                        'title' : value.title,
                        'url' : value.url,
                        'version' : value.version,
                        'status' : value.status,
                        'reference' : value.reference,
                        'draftstamp' : value.draftstamp,
                        'proofreadstamp' : value.proofreadstamp,
                        'reviewstamp' : 'na',
                        'approvestamp' : 'na',
                        'postapprovestamp' : 'na'
                    };
                }

                if(value.status == role && role == 'approve'){
                    approveActive[approveActive.length] = {
                        'docid' : value.docid,
                        'docsuff' : value.docsuff,
                        'cat1' : value.cat1,
                        'cat2' : value.cat2,
                        'cat3' : value.cat3,
                        'cat4' : value.cat4,
                        'ownerid' : value.ownerid,
                        'title' : value.title,
                        'url' : value.url,
                        'version' : value.version,
                        'status' : value.status,
                        'reference' : value.reference,
                        'draftstamp' : value.draftstamp,
                        'proofreadstamp' : value.proofreadstamp,
                        'reviewstamp' : value.reviewstamp,
                        'approvestamp' : 'na',
                        'postapprovestamp' : 'na'
                    };
                }else if(value.status != role && role == 'approve'){
                    approveInactive[approveInactive.length] = {
                        'docid' : value.docid,
                        'docsuff' : value.docsuff,
                        'cat1' : value.cat1,
                        'cat2' : value.cat2,
                        'cat3' : value.cat3,
                        'cat4' : value.cat4,
                        'ownerid' : value.ownerid,
                        'title' : value.title,
                        'url' : value.url,
                        'version' : value.version,
                        'status' : value.status,
                        'reference' : value.reference,
                        'draftstamp' : value.draftstamp,
                        'proofreadstamp' : value.proofreadstamp,
                        'reviewstamp' : value.reviewstamp,
                        'approvestamp' : 'na',
                        'postapprovestamp' : 'na'
                    };
                }

                if(value.status == role && role == 'postapprove'){
                    postapproveActive[postapproveActive.length] = {
                        'docid' : value.docid,
                        'docsuff' : value.docsuff,
                        'cat1' : value.cat1,
                        'cat2' : value.cat2,
                        'cat3' : value.cat3,
                        'cat4' : value.cat4,
                        'ownerid' : value.ownerid,
                        'title' : value.title,
                        'url' : value.url,
                        'version' : value.version,
                        'status' : value.status,
                        'reference' : value.reference,
                        'draftstamp' : value.draftstamp,
                        'proofreadstamp' : value.proofreadstamp,
                        'reviewstamp' : value.reviewstamp,
                        'approvestamp' : value.approvestamp,
                        'postapprovestamp' : 'na'
                    };
                }else if(value.status != role && role == 'postapprove'){
                    postapproveInactive[postapproveInactive.length] = {
                        'docid' : value.docid,
                        'docsuff' : value.docsuff,
                        'cat1' : value.cat1,
                        'cat2' : value.cat2,
                        'cat3' : value.cat3,
                        'cat4' : value.cat4,
                        'ownerid' : value.ownerid,
                        'title' : value.title,
                        'url' : value.url,
                        'version' : value.version,
                        'status' : value.status,
                        'reference' : value.reference,
                        'draftstamp' : value.draftstamp,
                        'proofreadstamp' : value.proofreadstamp,
                        'reviewstamp' : value.reviewstamp,
                        'approvestamp' : value.approvestamp,
                        'postapprovestamp' : 'na'
                    };
                }

            }else{
                // showNotification('Fetch Error', 'There was a problem Fetching the Document Category.');
            }
        });
    }
}
function fetchDocumentHistory(data, sender){
    
    if(sender == 'document-list-widget'){
        $('.document-prefs-properties-history').children('.document-prefs-properties-history-event').remove();
        // console.log(data);
        if(data.fetchdocumenthistory != 'error'){
            // $('.document-prefs-properties-history').show();
            const doctitle = $('.document-prefs-properties-title').text();
            // console.log('doctitle', doctitle);
            
            $.each(data, function(key, value){
                
                // console.log(value.date);

                // const when = dateFns.distanceInWordsToNow(
                //     Date.parse(value.date + ' 08:00'),
                //     {
                //         addSuffix: true
                //     }
                // );
                const when = dateFns.distanceInWordsStrict(
                    new Date(),
                    Date.parse(value.date),
                    {
                        addSuffix: true,
                        unit: 'd'
                    }
                );
                const date = dateFns.format(
                    Date.parse(value.date + ' 08:00'),
                    'MMMM DD, YYYY'
                );
                if(value.url != ''){
                    // $('.document-prefs-properties-history-download').attr('href', '../../' + value.url)
                    $('.document-prefs-properties-history').append(`
                        <span style="color: white;" class="document-prefs-properties-history-event" ><b>Checkin ${value.role}: </b> ${value.accid} &nbsp;
                        <i title="${value.notes}" class="fas fa-comment-alt document-prefs-properties-history-notes"></i>
                        <a style="color: white;" href="${value.url}" download="${doctitle}_${value.accid}"><i class="fas fa-download"></i></a>
                        </span>
                    `);
                }
                if(value.status != 'na'){
                    $('.document-prefs-properties-history').append(`
                        <span style="color: white;" class="document-prefs-properties-history-event"><b>Action ${value.role}: </b>${value.accid} ${value.status.toUpperCase()} @ ${date} : ${when}&nbsp;
                        <i title="${value.reason}" class="fas fa-comment-alt document-prefs-properties-history-reason"></i></span> 
                    `);
                }
            });
            
        }else{
            // history not found
            console.log('history not found');
            $('.document-prefs-properties-history').append(`
                <span class="document-prefs-properties-history-event">No History Found</span>
            `);
            // $('.document-prefs-properties-history').hide();
        }
        
    }
}
function fetchDocumentHistoryByAccid(data, sender){
    // console.log(data, sender);
    if(sender == 'docflowready'){
        proofreadActive = [];
        proofreadInactive = [];

        reviewActive = [];
        reviewInactive = [];

        approveActive = [];
        approveInactive = [];

        postapproveActive = [];
        postapproveInactive = [];

        $.each(data, function(key, value){
            if(value != 'error'){
                // value.role
                // api_getDocumentStatusConnect(value.docid, value.role, 'fetchDocumentConnectByAccid');
                // console.log(value.docid, value.role, value.docstatus, value.status);
                const role = value.role;
                const docstatus = value.docstatus;
    
                if( docstatus != 'inactive' && docstatus != 'done' && role == 'proofread' ){
                    proofreadActive[proofreadActive.length] = {
                        'docid' : value.docid,
                        'docsuff' : value.docsuff,
                        'cat1' : value.cat1,
                        'cat2' : value.cat2,
                        'cat3' : value.cat3,
                        'cat4' : value.cat4,
                        'ownerid' : value.ownerid,
                        'title' : value.title,
                        'url' : value.docurl,
                        'version' : value.docversion,
                        'status' : value.maindocstatus,
                        'reference' : value.reference,
                        'draftstamp' : value.draftstamp,
                        'proofreadstamp' : 'na',
                        'reviewstamp' : 'na',
                        'approvestamp' : 'na',
                        'postapprovestamp' : 'na'
                    };
                }else if(docstatus == 'inactive' && role == 'proofread' ){
                    proofreadInactive[proofreadInactive.length] = {
                        'docid' : value.docid,
                        'docsuff' : value.docsuff,
                        'cat1' : value.cat1,
                        'cat2' : value.cat2,
                        'cat3' : value.cat3,
                        'cat4' : value.cat4,
                        'ownerid' : value.ownerid,
                        'title' : value.title,
                        'url' : value.docurl,
                        'version' : value.docversion,
                        'status' : value.maindocstatus,
                        'reference' : value.reference,
                        'draftstamp' : value.draftstamp,
                        'proofreadstamp' : 'na',
                        'reviewstamp' : 'na',
                        'approvestamp' : 'na',
                        'postapprovestamp' : 'na'
                    };
                }
    
                if( docstatus != 'inactive' && docstatus != 'done' && role == 'review' ){
                    reviewActive[reviewActive.length] = {
                        'docid' : value.docid,
                        'docsuff' : value.docsuff,
                        'cat1' : value.cat1,
                        'cat2' : value.cat2,
                        'cat3' : value.cat3,
                        'cat4' : value.cat4,
                        'ownerid' : value.ownerid,
                        'title' : value.title,
                        'url' : value.docurl,
                        'version' : value.docversion,
                        'status' : value.maindocstatus,
                        'reference' : value.reference,
                        'draftstamp' : value.draftstamp,
                        'proofreadstamp' : value.proofreadstamp,
                        'reviewstamp' : 'na',
                        'approvestamp' : 'na',
                        'postapprovestamp' : 'na'
                    };
                }else if(docstatus == 'inactive' && role == 'review' ){
                    reviewInactive[reviewInactive.length] = {
                        'docid' : value.docid,
                        'docsuff' : value.docsuff,
                        'cat1' : value.cat1,
                        'cat2' : value.cat2,
                        'cat3' : value.cat3,
                        'cat4' : value.cat4,
                        'ownerid' : value.ownerid,
                        'title' : value.title,
                        'url' : value.docurl,
                        'version' : value.docversion,
                        'status' : value.maindocstatus,
                        'reference' : value.reference,
                        'draftstamp' : value.draftstamp,
                        'proofreadstamp' : value.proofreadstamp,
                        'reviewstamp' : 'na',
                        'approvestamp' : 'na',
                        'postapprovestamp' : 'na'
                    };
                }
    
                if( docstatus != 'inactive' && docstatus != 'done' && role == 'approve' ){
                    approveActive[approveActive.length] = {
                        'docid' : value.docid,
                        'docsuff' : value.docsuff,
                        'cat1' : value.cat1,
                        'cat2' : value.cat2,
                        'cat3' : value.cat3,
                        'cat4' : value.cat4,
                        'ownerid' : value.ownerid,
                        'title' : value.title,
                        'url' : value.docurl,
                        'version' : value.docversion,
                        'status' : value.maindocstatus,
                        'reference' : value.reference,
                        'draftstamp' : value.draftstamp,
                        'proofreadstamp' : value.proofreadstamp,
                        'reviewstamp' : value.reviewstamp,
                        'approvestamp' : 'na',
                        'postapprovestamp' : 'na'
                    };
                }else if(docstatus == 'inactive' && role == 'approve' ){
                    approveInactive[approveInactive.length] = {
                        'docid' : value.docid,
                        'docsuff' : value.docsuff,
                        'cat1' : value.cat1,
                        'cat2' : value.cat2,
                        'cat3' : value.cat3,
                        'cat4' : value.cat4,
                        'ownerid' : value.ownerid,
                        'title' : value.title,
                        'url' : value.docurl,
                        'version' : value.docversion,
                        'status' : value.maindocstatus,
                        'reference' : value.reference,
                        'draftstamp' : value.draftstamp,
                        'proofreadstamp' : value.proofreadstamp,
                        'reviewstamp' : value.reviewstamp,
                        'approvestamp' : 'na',
                        'postapprovestamp' : 'na'
                    };
                }
                
                if( docstatus != 'inactive' && docstatus != 'done' && role == 'postapprove' ){
                    postapproveActive[postapproveActive.length] = {
                        'docid' : value.docid,
                        'docsuff' : value.docsuff,
                        'cat1' : value.cat1,
                        'cat2' : value.cat2,
                        'cat3' : value.cat3,
                        'cat4' : value.cat4,
                        'ownerid' : value.ownerid,
                        'title' : value.title,
                        'url' : value.docurl,
                        'version' : value.docversion,
                        'status' : value.maindocstatus,
                        'reference' : value.reference,
                        'draftstamp' : value.draftstamp,
                        'proofreadstamp' : value.proofreadstamp,
                        'reviewstamp' : value.reviewstamp,
                        'approvestamp' : value.approvestamp,
                        'postapprovestamp' : 'na'
                    };
                }else if(docstatus == 'inactive' && role == 'postapprove' ){
                    postapproveInactive[postapproveInactive.length] = {
                        'docid' : value.docid,
                        'docsuff' : value.docsuff,
                        'cat1' : value.cat1,
                        'cat2' : value.cat2,
                        'cat3' : value.cat3,
                        'cat4' : value.cat4,
                        'ownerid' : value.ownerid,
                        'title' : value.title,
                        'url' : value.docurl,
                        'version' : value.docversion,
                        'status' : value.maindocstatus,
                        'reference' : value.reference,
                        'draftstamp' : value.draftstamp,
                        'proofreadstamp' : value.proofreadstamp,
                        'reviewstamp' : value.reviewstamp,
                        'approvestamp' : value.approvestamp,
                        'postapprovestamp' : 'na'
                    };
                }

            }else{
                // showNotification('Fetch Error', 'There was a problem Fetching the Document Category.');
            }
        });
        
        console.log('END');
        $('.dashboard-header-widget-content').children('i').remove();
        
        $('.color-proofread').children('.dashboard-header-widget-content').empty();
        $('.color-proofread').children('.dashboard-header-widget-content').append(`
            <b><span style="color: ${FONT_COLOR}; font-size: 1.2em;">Active: ${proofreadActive.length}</span></b>
            <span style="color: ${FONT_COLOR}">Inactive: ${proofreadInactive.length}</span>
        `);
        $('.color-review').children('.dashboard-header-widget-content').empty();
        $('.color-review').children('.dashboard-header-widget-content').append(`
            <b><span style="color: ${FONT_COLOR}; font-size: 1.2em;">Active: ${reviewActive.length}</span></b>
            <span style="color: ${FONT_COLOR}">Inactive: ${reviewInactive.length}</span>
        `);
        $('.color-approve').children('.dashboard-header-widget-content').empty();
        $('.color-approve').children('.dashboard-header-widget-content').append(`
            <b><span style="color: ${FONT_COLOR}; font-size: 1.2em;">Active: ${approveActive.length}</span></b>
            <span style="color: ${FONT_COLOR}">Inactive: ${approveInactive.length}</span>
        `);
        $('.color-postapprove').children('.dashboard-header-widget-content').empty();
        $('.color-postapprove').children('.dashboard-header-widget-content').append(`
            <b><span style="color: ${FONT_COLOR}; font-size: 1.2em;">Active: ${postapproveActive.length}</span></b>
            <span style="color: ${FONT_COLOR}">Inactive: ${postapproveInactive.length}</span>
        `);
    }

    

}
function fetchDocumentHistoryByOwnerId(data, sender){

    if(sender == 'nav-me'){
        // console.log(data, sender);  
        $('.me-body').empty();
        mydocList = [];
        mydocListHistory = [];
        mydocListFull = [];
        $.each(data, function(key, value){
            if(value != 'error'){
                
                const ds = value.docsuff.split('-').pop();
                const showid = `D-${value.cat1}${value.cat2}${value.cat3}${value.cat4}${ds}`;
                let draftstage = 'wdidle';
                let proofreadstage = 'wdidle';
                let reviewstage = 'wdidle';
                let approvestage = 'wdidle';
                let postapprovestage = 'wdidle';
                const status = value.maindocstatus;
                let execution = value.execution;
                let effective = value.effective;

                let gate = true;
                
                for(i=0; i<=mydocList.length; i++){
                    if(value.docid == mydocList[i]){
                        gate = false;
                    }
                }


                

                if(gate){
                    // console.log('gate in');
                    mydocListFull[mydocListFull.length] = {
                        'docid' : value.docid,
                        'projectid' : value.projectid,
                        'comid' : value.comid,
                        'cat1' : value.cat1,
                        'cat2' : value.cat2,
                        'cat3' : value.cat3,
                        'cat4' : value.cat4,
                        'docsuff' : value.docsuff,
                        'ownerid' : value.ownerid,
                        'title' : value.title,
                        'docurl' : value.docurl,
                        'docversion' : value.docversion,
                        'effective' : value.effective,
                        'reference' : value.reference,
                    };



                    gate = true;
                    mydocList[mydocList.length] = value.docid;

                    // const draftwhen = dateFns.distanceInWordsToNow(Date.parse(value.draftstamp),{addSuffix: true});
                    
                    const draftwhen = dateFns.distanceInWordsStrict(new Date(), Date.parse(value.draftstamp), {addSuffix: true,unit: 'd'});
                    let proofreadwhen;
                    let reviewwhen;
                    let approvewhen;
                    let postapprovewhen;
    
                    let draftcontent = `<span class="stage-con-widget-content" style="color: white;">${draftwhen}</span>`;
                    let proofreadcontent = `<i class="fas fa-times-circle stage-con-widget-content" style="color: white;"></i>`;
                    let reviewcontent = `<i class="fas fa-times-circle stage-con-widget-content" style="color: white;"></i>`;
                    let approvecontent = `<i class="fas fa-times-circle stage-con-widget-content" style="color: white;"></i>`;
                    let postapprovecontent = `<i class="fas fa-times-circle stage-con-widget-content" style="color: white;"></i>`;
                    let executionContent = `color-sc`;
                    let executionBtnContent = ``;


                    if(effective == 'null' || effective == null || effective == ''){
                        executionContent = `color-sc`;
                        executionBtnContent = `<button id="${value.docid}_${value.maindocstatus}_effective" class="me-body-widget-effective btn-shadow color-font">Make Effective</button>`;
                    }else{
                        if(value.maindocstatus == 'ok'){
                            executionContent = `color-main`;
                            executionBtnContent = `<button id="${value.docid}_${value.maindocstatus}_execution" class="me-body-widget-execution btn-shadow color-font">Put Document on Execution</button>
                            <button id="${value.docid}_${value.maindocstatus}_effective" class="me-body-widget-effective btn-shadow color-font">Make Effective</button>`;
                        }else{
                            executionContent = `color-main`;
                            executionBtnContent = `<button id="${value.docid}_${value.maindocstatus}_execution" class="me-body-widget-execution btn-shadow color-font">Put Document on Execution</button>`;
                        }
                    }

                    if(execution == 'null' || execution == null || execution == ''){
                        executionContent += ` under-exec`;
                    }
                    




                    if(status == 'draft'){
                        draftstage = 'wdactive';
    
                        draftcontent = `<span class="stage-con-widget-content" style="color: white;">ongoing</span>`;
                    }else if(status == 'proofread'){
                        proofreadstage = 'wdactive';
    
                        proofreadcontent = `<span class="stage-con-widget-content" style="color: white;">ongoing</span>`;
                    }else if(status == 'review'){
                        reviewstage = 'wdactive';
                        proofreadwhen = dateFns.distanceInWordsStrict(new Date(), Date.parse(value.proofreadstamp),{addSuffix: true,unit: 'd'});
                        
                        proofreadcontent = `<span class="stage-con-widget-content"  style="color: white;">${proofreadwhen}</span>`;
                        reviewcontent = `<span class="stage-con-widget-content" style="color: white;">ongoing</span>`;
                    }else if(status == 'approve'){
                        approvestage = 'wdactive';
                        proofreadwhen = dateFns.distanceInWordsStrict(new Date(), Date.parse(value.proofreadstamp),{addSuffix: true,unit: 'd'});
                        reviewwhen = dateFns.distanceInWordsStrict(new Date(), Date.parse(value.reviewstamp),{addSuffix: true,unit: 'd'});
                        
                        proofreadcontent = `<span class="stage-con-widget-content" style="color: white;">${proofreadwhen}</span>`;
                        reviewcontent = `<span class="stage-con-widget-content" style="color: white;">${reviewwhen}</span>`;
                        approvecontent = `<span class="stage-con-widget-content" style="color: white;">ongoing</span>`;
                    }else if(status == 'postapprove'){
                        postapprovestage = 'wdactive';
                        proofreadwhen = dateFns.distanceInWordsStrict(new Date(), Date.parse(value.proofreadstamp),{addSuffix: true,unit: 'd'});
                        reviewwhen = dateFns.distanceInWordsStrict(new Date(), Date.parse(value.reviewstamp),{addSuffix: true,unit: 'd'});
                        approvewhen = dateFns.distanceInWordsStrict(new Date(), Date.parse(value.approvestamp),{addSuffix: true,unit: 'd'});
    
                        proofreadcontent = `<span class="stage-con-widget-content" style="color: white;">${proofreadwhen}</span>`;
                        reviewcontent = `<span class="stage-con-widget-content" style="color: white;">${reviewwhen}</span>`;
                        approvecontent = `<span class="stage-con-widget-content" style="color: white;">${approvewhen}</span>`;
                        postapprovecontent = `<span class="stage-con-widget-content" style="color: white;">ongoing</span>`;
                    }else if(status == 'ok'){
                        postapprovestage = 'wdactive';
                        proofreadwhen = dateFns.distanceInWordsStrict(new Date(), Date.parse(value.proofreadstamp),{addSuffix: true,unit: 'd'});
                        reviewwhen = dateFns.distanceInWordsStrict(new Date(), Date.parse(value.reviewstamp),{addSuffix: true,unit: 'd'});
                        approvewhen = dateFns.distanceInWordsStrict(new Date(), Date.parse(value.approvestamp),{addSuffix: true,unit: 'd'});
                        postapprovewhen = dateFns.distanceInWordsStrict(new Date(), Date.parse(value.postapprovestamp),{addSuffix: true,unit: 'd'});
                        
                        proofreadcontent = `<span class="stage-con-widget-content" style="color: white;">${proofreadwhen}</span>`;
                        reviewcontent = `<span class="stage-con-widget-content" style="color: white;">${reviewwhen}</span>`;
                        approvecontent = `<span class="stage-con-widget-content" style="color: white;">${approvewhen}</span>`;
                        postapprovecontent = `<span class="stage-con-widget-content" style="color: white;">ongoing</span>`;
                    }
                    // console.log(value.docurl);   
                    $('.me-body').append(`
                        <div id="me-body-${value.docid}" class="me-body-widget ${executionContent}">
                            <i class="fas fa-sync-alt me-body-widget-refresh" style="color: white;"></i>
                            <a href="${value.docurl}" download="${value.title}" class="me-body-widget-download" style="color: white;" ><i class="fas fa-file-download"></i></a>
                            <div class="me-body-widget-title-con">
                                <span class="me-body-widget-title color-font">${value.title}</span>&nbsp;
                                <span class="me-body-widget-version color-font">v${value.docversion}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <span class="me-body-widget-showid color-font">${value.docid}</span>
                            </div>
                            <div class="me-body-widget-stage-con">
    
                                <div stage="draft" class="stage-con-widget color-draft ${draftstage}">
                                    <span class="stage-con-widget-title color-font">Draft</span>
                                    ${draftcontent}
                                </div>
                                <div stage="proofread" class="stage-con-widget color-proofread ${proofreadstage}">
                                    <span class="stage-con-widget-title color-font">Proofread</span>
                                    ${proofreadcontent}
                                </div>
                                <div stage="review" class="stage-con-widget color-review ${reviewstage}">
                                    <span class="stage-con-widget-title color-font">Review</span>
                                    ${reviewcontent}
                                </div>
                                <div stage="approve" class="stage-con-widget color-approve ${approvestage}">
                                    <span class="stage-con-widget-title color-font">Approve</span>
                                    ${approvecontent}
                                </div>
                                <div stage="postapprove" class="stage-con-widget color-postapprove ${postapprovestage}">
                                    <span class="stage-con-widget-title color-font">Post Approve</span>
                                    ${postapprovecontent}
                                </div>
                            </div>

                            <span class="me-body-widget-director-title"  style="color: white;"></span>
                            <div class="me-body-widget-director-con">
    
                                

    
                            </div>
                            <div class="me-body-widget-history-con">
                                <span class="me-body-widget-history-title color-font">Document History</span>
    
                            </div>

                            <div class="me-body-widget-btn-con">
                                <button id="${value.docid}_${value.maindocstatus}" class="me-body-widget-nextstage btn-shadow color-font">Go to Next Stage of Document</button>
                                <button id="${value.docid}_${value.maindocstatus}_revision" class="me-body-widget-revision btn-shadow color-font">Upload a Revision</button>
                                <button id="${value.docid}_${value.maindocstatus}_postapprove" class="me-body-widget-postapprove btn-shadow color-font">Go to Post Approval Stage</button>
                                ${executionBtnContent}
                            </div>
                            
                            
                            </div>
                    `);

                    
    
                }

                // console.log('MAIN', value.docid, value.role, value.docstatus, value.maindocstatus, value.status);
                if(value.role == value.maindocstatus || (value.maindocstatus == 'ok' && value.role == 'postapprove')){
                    // console.log('main', value.docid);
                    if( value.url != 'na' && value.status == 'approve' ){
                        // console.log('Approve');
                        $(`#me-body-${value.docid}`).children('.me-body-widget-director-con').append(`
                            <div hid="${value.id}" status='approve' class="director-con-widget color-green">
                                <span class="director-con-widget-accid">${value.accid}</span>
                                <span class="director-con-widget-status">${value.status.toUpperCase()}<i class="fas fa-eye director-con-widget-view-history"></i></span>
                            </div>
                        `);
                        // console.log('ADD ',value.docid, value.accid, value.role, value.url, value.notes ,value.reason, value.date);
                        mydocListHistory[mydocListHistory.length] = {
                            'id' : value.id,
                            'docid' : value.docid,
                            'accid' : value.accid,
                            'status' : value.status,
                            'role' : value.role,
                            'url' : value.url,
                            'title' : value.title,
                            'notes' : value.notes,
                            'reason' : value.reason,
                            'date' : value.date
                        };
                    }else if(value.url != 'na' && value.status == 'reject' ){
                        // console.log('Reject');
                        $(`#me-body-${value.docid}`).children('.me-body-widget-director-con').append(`
                            <div hid="${value.id}" status='reject' class="director-con-widget color-red">
                                <span class="director-con-widget-accid">${value.accid}</span>
                                <span class="director-con-widget-status">${value.status.toUpperCase()}<i class="fas fa-eye director-con-widget-view-history"></i></span>
                            </div>
                        `);
                        mydocListHistory[mydocListHistory.length] = {
                            'id' : value.id,
                            'docid' : value.docid,
                            'accid' : value.accid,
                            'status' : value.status,
                            'role' : value.role,
                            'url' : value.url,
                            'title' : value.title,
                            'notes' : value.notes,
                            'reason' : value.reason,
                            'date' : value.date
                        };
                    }else if(value.url != 'na' && value.status == 'na' ){
                        // console.log('Checkin');
                        $(`#me-body-${value.docid}`).children('.me-body-widget-director-con').append(`
                            <div hid="${value.id}" status='waiting' class="director-con-widget color-yellow">
                                <span class="director-con-widget-accid">${value.accid}</span>
                                <span class="director-con-widget-status">Waiting<i class="fas fa-exclamation-circle"></i><i class="fas fa-eye director-con-widget-view-history"></i></span>
                            </div>
                        `);
                        // console.log(value.id, value.url, value.status);
                        mydocListHistory[mydocListHistory.length] = {
                            'id' : value.id,
                            'docid' : value.docid,
                            'accid' : value.accid,
                            'status' : value.status,
                            'role' : value.role,
                            'url' : value.url,
                            'title' : value.title,
                            'notes' : value.notes,
                            'reason' : value.reason,
                            'date' : value.date
                        };
                    }else if(value.url == 'na' && value.status == 'na'){
                        // console.log('Nothing');
                        $(`#me-body-${value.docid}`).children('.me-body-widget-director-con').append(`
                            <div status='waiting' class="director-con-widget color-yellow">
                                <span class="director-con-widget-accid">${value.accid}</span>
                                <span class="director-con-widget-status">Waiting<i class="fas fa-exclamation-circle"></i></span>
                            </div>
                        `);
                    }

                }

                
                $('.director-con-widget-accid').css('color', FONT_COLOR);
                $('.director-con-widget-status').css('color', FONT_COLOR);

                // $('.me-body-widget-history-con').hide();
                
            }else{
                // showNotification('Fetch Error', 'There was a problem Fetching the Document Category.');
            }
        });
        
        console.log('END');
    }
}
function fetchDocumentMappingByAccountId(data, sender){
    // console.log(data, sender);
    if(sender == 'dashboard_js'){
        $('.dashboard-con').children('.nav-content-').children('#dashboard-docmap').remove();
        $('.dashboard-con').children('.nav-content-').append(`
            <div id="dashboard-docmap">
                <span class="title color-title">Documents for Mapping</span>
                <div class="dashboard-docmap-widget-con">
                    
                </div>
            </div>  
        `);
        $.each(data, function(key, value){
            if(value != 'error'){
                $('.dashboard-con').children('.nav-content-').children('#dashboard-docmap').children('.dashboard-docmap-widget-con').append(`
                    <div class="dashboard-docmap-widget color-sc">
                        <span class="title">${value.title}</span>
                        <span class="id">${value.planid}</span>
                    </div>
                `);
            }else{
                $('.dashboard-con').children('.nav-content-').children('#dashboard-docmap').remove();
            }
        });
    }

    
}
function fetchDocumentByProjectId(data, sender, options){

    if(sender = 'map-header-search-project-submit'){
        $('.map-body-actual-list-con').empty();
        // mapActualdocList = [];
        $.each(data, function(key, value){
            if(value != 'error'){
                if(value.projectid != 'na'){
                    $('.map-body-actual-list-con').append(`
                        <div docid="${value.docid}" class="map-body-actual-list-widget btn-shadow">
                            <span class="map-body-actual-list-widget-title">${value.title}</span>
                            <span class="map-body-actual-list-widget-id">${value.docid}</span>
                        </div>
                    `);
                }
                // mapActualdocList[mapActualdocList.length] = {};
                $('.map-body-actual-list-widget').draggable(options);
            }else{

            }
        });
    }
    if(sender = 'cidDocs'){
        $('.preferences-body-list').empty();
        mapActualdocList = [];
        $.each(data, function(key, value){
            if(value != 'error'){
                if(value.projectid != 'na'){
                    $('.preferences-body-list').append(`
                        <span docid="${value.docid}" url="${value.url}" class="preferences-body-list-widget btn-shadow">${value.title} v${value.version}<i class="fas fa-trash"></i></span>
                    `);
                }else{
                    console.log('not connected', value.docid);
                }
                mapActualdocList[mapActualdocList.length] = {};
                $('.map-body-actual-list-widget').draggable(options);
            }else{

            }
        });
    }
    
}

function api_createPlanningDocumentUpdated(obj){
        
    let url = domain + apiUrl_document;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createplanningdocumentupdated',
            'projectid' : obj.projectid,
            'docid' : obj.docid,
            'title' : obj.title,
            'draftsd' : obj.draftsd,
            'drafted' : obj.drafted,
            'reviewed' : obj.reviewed,
            'approved' : obj.approved,
            'executioned' : obj.executioned,
            'postapproved' : obj.postapproved,
            'milestone' : obj.milestone,
            'linkid' : obj.linkid,
            'linkstage' : obj.linkstage,
            'predecessorid' : obj.predecessorid,
            'predecessorstage' : obj.predecessorstage
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Document.. Please Wait');
        },
        success: function(data){
            console.log('createplanningdocumentupdated', data);
            hideLoadingReport();
        }
    });
}








function capi_createPlanningDocument(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_document;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createplanningdocument',
            'docid' : options.docid,
            'projectid' : options.projectid,
            'title' : options.title,
            'draftsd' : options.draftsd,
            'drafted' : options.drafted,
            'reviewed' : options.reviewed,
            'executioned' : options.executioned,
            'approvaled' : options.approvaled,
            'postapprovaled' : options.postapprovaled
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
function capi_updatePlanningDocumentDates(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_document;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateplanningdocumentdates',
            'docid' : options.docid,
            'draftsd' : options.draftsd,
            'drafted' : options.drafted,
            'reviewed' : options.reviewed,
            'approvaled' : options.approvaled,
            'executioned' : options.executioned,
            'postapprovaled' : options.postapprovaled
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
function capi_updatePlanningDocumentMapid(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_document;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateplanningdocumentmapid',
            'docid' : options.docid,
            'mapid' : options.mapid
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
function capi_updatePlanningDocumentMapid(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_document;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateplanningdocumentmapid',
            'docid' : options.docid,
            'mapid' : options.mapid
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
function capi_updatePlanningDocumentMilestone(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_document;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updateplanningdocumentmilestone',
            'docid' : options.docid,
            'milestone' : options.milestone
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
function capi_deletePlanningDocument(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_document;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deleteplanningdocument',
            'docid' : options.docid
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
function capi_fetchPlanningDocumentByProjectId(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_document;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchplanningdocumentbyprojectid',
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
function capi_fetchPlanningDocuments(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_document;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchplanningdocuments',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Documents.. Please Wait');
        },
        success: function(data){
            console.log('fetchplanningdocuments', data);
            cbsuccess(data);
        },
        complete: function(){
            cbcomplete();
            hideLoadingReport();
        }
    });
}
function capi_fetchActualDocuments(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_document;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchactualdocuments',
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Retrieving Actual Documents.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
        },
        complete: function(data){
            cbcomplete();
            hideLoadingReport();
        }
    });
}


function capi_updateDocumentMapping(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_document;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updatedocumentmapping',
            'docid' : options.docid,
            'planid' : options.planid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Documents.. Please Wait');
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


function capi_mapTmpAccounts(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_document;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'maptmpaccounts',
            'tmpid' : options.tmpid,
            'accid' : options.accid,
            'roleid': options.roleid,
            'projectid' : options.projectid,
            'rateid' : options.rateid,
            'name' : options.name
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Mapping Resources.. Please Wait');
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
function capi_mapTmpSuppliers(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl_document;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'maptmpsuppliers',
            'tmpid' : options.tmpid,
            'supid' : options.supid,
            'rateid': options.rateid,
            'name' : options.name,
            'rate' : options.rate,
            'type' : options.type,
            'projectid' : options.projectid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Mapping Resources.. Please Wait');
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

