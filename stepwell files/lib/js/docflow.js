let conList = [
    $('.nav-maincontainer'),
    
];





// ________________________________________________________________________________________________

let proofreadActive = [];
let proofreadInactive = [];
let reviewActive = [];
let reviewInactive = [];
let approveActive = [];
let approveInactive = [];
let postapproveActive = [];
let postapproveInactive = [];

let mydocList = [];
let mydocListHistory = [];
let mydocListFull = [];

let docflowbrowseDocument;

function fillDocumentList(arr, listcon){
    listcon.children('.document-list-widget-con').empty();
    // console.log(arr);
    for(i=0; i<arr.length; i++){
        const x = arr[i].docsuff;
        const xx = x.split('-');
        const docsuff = 'D-' + arr[i].cat1 + arr[i].cat2 + arr[i].cat3 + arr[i].cat4 + xx[1];
        // console.log(arr[i].docid, arr[i].draftstamp, arr[i].proofreadstamp, arr[i].reviewstamp, arr[i].approvestamp, arr[i].postapprovestamp );
        listcon.children('.document-list-widget-con').append(`
            <div class="document-list-widget btn-shadow" docid="${arr[i].docid}"
            title="${arr[i].title}" url="${arr[i].url}" version="${arr[i].version}" ownerid="${arr[i].ownerid}"
            status="${arr[i].status}" reference="${arr[i].reference}" draftstamp="${arr[i].draftstamp}" 
            proofreadstamp="${arr[i].proofreadstamp}" reviewstamp="${arr[i].reviewstamp}" 
            approvestamp="${arr[i].approvestamp}" postapprovestamp="${arr[i].postapprovestamp}" 
            style="background-color: ${BTN_COLOR}; color: white;">
                <span class="document-list-widget-title">${arr[i].title}</span>
                <span class="document-list-widget-id">${arr[i].docid}</span>
            </div>
        `);
    }
}
function docflowbrowse(){
    $(document).off('change', '#docflowbrowse'); 
    $(document).on('change','#docflowbrowse', function(){
        // console.log($(this).val().split('\\').pop());
        let filename = $(this).val().split('\\').pop();
        let extension = filename.split('.').pop();
        
        if(filename){
            // console.log(filename, extension);
            $('.docflowbrowse-upload-filename').val(filename);
            
        }else{
            console.log('cancelled');
        }
    });
}

// navigation events
$('.nav-widget-con').click(function(){
    const id = $(this).children('span').attr('id');
    if(id != undefined || id != null || id != ''){
        if(id == 'nav-dashboard'){
            const cbcomplete=()=>{
                const query = `ownerid = '${__ID}';` ;
                api_fetchDocumentQuery(__COMPANY_ID, query, '.documents-header-category-btn');
                $('.documents-prefs').hide();
                $('.documents-edit').hide();
                $('.documents-body').show();
            };
            api_fetchDocumentHistoryByAccid(__ID, 'docflowready', cbcomplete);
        }
        if(id == 'nav-document-proofread' || id == '#nav-document-review' || id == '#nav-document-approve' || id == '#nav-document-postapprove'){
 
            const id = $(this).children('span').attr('id');
            const x = id.split('-').pop();
            console.log(id);
        
        
            hideAllNav(conList);
            // $('.dashboard-con').hide();
            $('.document-handle-con').show();
            // $('.document-prefs-con').hide();
            $('.document-list-select').val('active');
        
            if(id.includes('proofread')){
                // console.log('proofread');
                fillDocumentList( proofreadActive, $('.document-list-con') );
                // $('.document-header').text('Documents for Proofreading').removeClass('color-review').removeClass('color-approve').removeClass('color-postapprove').addClass('color-proofread');
                $('.document-handle-con').children('.nav-content-').children('.document-header').remove();
                $('.document-handle-con').children('.nav-content-').prepend(`
                    <span name="proofread" class="document-header color-proofread" style="background-color: ${PROOFREAD_COLOR}; color: white;">Documents for Proofreading</span>  
                `);
            }
            if(id.includes('review')){
                fillDocumentList( reviewActive, $('.document-list-con') );
                // $('.document-header').text('Documents for Review').removeClass('color-proofread').removeClass('color-approve').removeClass('color-postapprove').addClass('color-review');
                $('.document-handle-con').children('.nav-content-').children('.document-header').remove();
                $('.document-handle-con').children('.nav-content-').prepend(`
                    <span name="review" class="document-header color-review" style="background-color: ${REVIEW_COLOR}; color: white;">Documents for Review</span>  
                `);
            }
            if(id.includes('approve')){
                fillDocumentList( approveActive, $('.document-list-con') );
                // $('.document-header').text('Documents for Approval').removeClass('color-proofread').removeClass('color-review').removeClass('color-postapprove').addClass('color-approve');
                $('.document-handle-con').children('.nav-content-').children('.document-header').remove();
                $('.document-handle-con').children('.nav-content-').prepend(`
                    <span name="approve" class="document-header color-approve" style="background-color: ${APPROVE_COLOR}; color: white;">Documents for Approval</span>  
                `);
            }
            if(id.includes('postapprove')){
                fillDocumentList( postapproveActive, $('.document-list-con') );
                // $('.document-header').text('Documents for Post Approval').removeClass('color-proofread').removeClass('color-review').removeClass('color-approve').addClass('color-postapprove');
                $('.document-handle-con').children('.nav-content-').children('.document-header').remove();
                $('.document-handle-con').children('.nav-content-').prepend(`
                    <span name="postapprove" class="document-header color-postapprove" style="background-color: ${POSTAPPROVE_COLOR}; color: white;">Documents for Post Approval</span>  
                `);
            }
        }
        if(id == 'nav-me'){
            api_fetchDocumentHistoryByOwnerId(__ID, 'nav-me');
            // console.log('mydocListHistory', mydocListHistory);  
        
            let nextgate = true;
            let approvegate = true;
            
            $('.me-body').children('.me-body-widget').each(function(){
                let id = $(this).attr('id');
                let executiongate = false;
                let effectivegate = false;
                if($(this).hasClass('under-exec')){
                    // console.log(id, 'IS ON EXECUTION');
                    executiongate = true;
                }
                if($(this).hasClass('color-main')){
                    // console.log(id, 'IS ON EXECUTION');
                    effectivegate = true;
                }
                let curstage = $(this).children('.me-body-widget-stage-con').children('.stage-con-widget.wdactive').attr('stage');
                // console.log('me-body-widget', id);
                // console.log(curstage);
                if(curstage != 'draft'){
        
                    if(curstage == 'approve'){
        
                        $(this).children('.me-body-widget-director-con').each(function(){
                            let revisiongate = false;
                            $(this).children('.director-con-widget').each(function(){
                                const status = $(this).attr('status');
                                // console.log(status);
                                if(status == 'reject' || status == 'waiting'){
                                    approvegate = false;
                                    if(status == 'reject'){
                                        revisiongate = true;
                                    }
                                }
                                
                            });
                            
                            if(approvegate){
                                console.log(executiongate);
                                if(!executiongate){
                                    $(this).siblings('.me-body-widget-btn-con').children('.me-body-widget-postapprove').show();
                                }else{
                                    $(this).siblings('.me-body-widget-btn-con').children('.me-body-widget-effective').show();
                                    $(this).siblings('.me-body-widget-btn-con').children('.me-body-widget-execution').show();
                                }
                            }else{
                                if(revisiongate){
                                    $(this).siblings('.me-body-widget-btn-con').children('.me-body-widget-revision').show();
                                }
                            }
                            approvegate = true;
                        });
        
                        
        
                    }else if(curstage == 'postapprove'){
        
                        $(this).children('.me-body-widget-director-con').each(function(){
                            let revisiongate = false;
                            $(this).children('.director-con-widget').each(function(){
                                const status = $(this).attr('status');
                                // console.log(status);
                                if(status == 'reject' || status == 'waiting'){
                                    approvegate = false;
                                    if(status == 'reject'){
                                        revisiongate = true;
                                    }
                                }
                                
                            });
                            console.log(mydocListHistory);
                            
                            if(approvegate){
                                console.log(approvegate);
                                // if(!executiongate){
                                    
                                // }
                                $(this).siblings('.me-body-widget-btn-con').children('.me-body-widget-effective').show();
                                // $(this).siblings('.me-body-widget-btn-con').children('.me-body-widget-execution').show();
                            }else{
                                if(revisiongate){
                                    $(this).siblings('.me-body-widget-btn-con').children('.me-body-widget-revision').show();
                                }
                            }
                            approvegate = true;
                        });
        
                    }else{
                        $(this).children('.me-body-widget-director-con').each(function(){
                            let revisiongate = false;
                            $(this).children('.director-con-widget').each(function(){
                                const status = $(this).attr('status');
                                
                                // console.log(id, status);
                                if(status == 'reject' || status == 'waiting'){
                                    nextgate = false;
                                    if(status == 'reject'){
                                        revisiongate = true;
                                    }
                                }
                            });
                            // console.log(nextgate);
                            if(nextgate){
                                $(this).siblings('.me-body-widget-btn-con').children('.me-body-widget-nextstage').show();
                            }else{
                                // console.log(status);
                                // $(this).siblings('.me-body-widget-btn-con').children('.me-body-widget-revision').show();
                                if(revisiongate){
                                    $(this).siblings('.me-body-widget-btn-con').children('.me-body-widget-revision').show();
                                }
                            }
                            nextgate = true;
                        });
        
                    }
        
                    
        
                }else{
                    $(this).children('.me-body-widget-nextstage').hide();
                    $(this).children('.me-body-widget-director-con').hide();
                    $(this).children('.me-body-widget-history-con').hide();
                    $(this).children('.me-body-widget-btn-con').hide();
                }
                
            });
        
        }
        if(id == 'nav-upload'){
            const cbcomplete=()=>{
                $('#docbuilderbrowse').val('');
                $('.create-upload-details-filename').val('');
                $('.create-upload-details-filetype').removeClass('fa-file fa-file-word fa-file-pdf fa-file-excel fa-file-image fa-file-archive file-alt').addClass('fa-file');
            
                $('.create-upload-con1').hide();
                $('.create-upload-con2').hide();
                $('.create-upload-con3').hide();
                $('.create-upload-con1-project-select').show();
                $('.create-upload-con1-selected-project-title').text('');
                $('.documents-edit').hide();
                $('.documents-prefs').hide();
                // $('.create-upload-details-con').hide();
            };
            api_fetchProjectByConnect(__ID, 'nav-create-upload', cbcomplete);
        }
    }
});



// DASHBOARD CLICK EVENTS
$(document).on('click', '.dashboard-header-widget' ,function(){
    const id = $(this).attr('name');
    const x = id.split('-').pop();
    console.log(id);
    $('.dashboard-con').hide();
    $('.document-handle-con').show();
    $('.document-prefs-con').hide();
    $('.document-list-select').val('active');

    if(id.includes('proofread')){
        fillDocumentList( proofreadActive, $('.document-list-con') );
        // $('.document-header').text('Documents for Proofreading').removeClass('color-review').removeClass('color-approve').removeClass('color-postapprove').addClass('color-proofread');
        $('.document-handle-con').children('.nav-content-').children('.document-header').remove();
        $('.document-handle-con').children('.nav-content-').prepend(`
            <span name="proofread" class="document-header color-proofread" style="background-color: ${PROOFREAD_COLOR}; color: white;">Documents for Proofreading</span>  
        `);
    }
    if(id.includes('review')){
        fillDocumentList( reviewActive, $('.document-list-con') );
        // $('.document-header').text('Documents for Review').removeClass('color-proofread').removeClass('color-approve').removeClass('color-postapprove').addClass('color-review');
        $('.document-handle-con').children('.nav-content-').children('.document-header').remove();
        $('.document-handle-con').children('.nav-content-').prepend(`
            <span name="review" class="document-header color-review" style="background-color: ${REVIEW_COLOR}; color: white;">Documents for Review</span>  
        `);
    }
    if(id.includes('approve')){
        fillDocumentList( approveActive, $('.document-list-con') );
        // $('.document-header').text('Documents for Approval').removeClass('color-proofread').removeClass('color-review').removeClass('color-postapprove').addClass('color-approve');
        $('.document-handle-con').children('.nav-content-').children('.document-header').remove();
        $('.document-handle-con').children('.nav-content-').prepend(`
            <span name="approve" class="document-header color-approve" style="background-color: ${APPROVE_COLOR}; color: white;">Documents for Approval</span>  
        `);
    }
    if(id.includes('postapprove')){
        fillDocumentList( postapproveActive, $('.document-list-con') );
        // $('.document-header').text('Documents for Post Approval').removeClass('color-proofread').removeClass('color-review').removeClass('color-approve').addClass('color-postapprove');
        $('.document-handle-con').children('.nav-content-').children('.document-header').remove();
        $('.document-handle-con').children('.nav-content-').prepend(`
            <span name="postapprove" class="document-header color-postapprove" style="background-color: ${POSTAPPROVE_COLOR}; color: white;">Documents for Post Approval</span>  
        `);
    }

    const conlist = ['.document-handle-con'];
    // showHeaderTab('document-handle-con');

});

// DOCUMENTS LIST EVENT
$(document).on('click', '.document-list-widget', function(){
    const prefsprops = $(this).parent('.document-list-widget-con').parent('.document-list-con').siblings('.document-prefs-con').children('.document-prefs-properties');
    prefsprops.children('.document-prefs-properties-title').text($(this).children('.document-list-widget-title').text());
    prefsprops.children('.document-prefs-properties-id').text($(this).children('.document-list-widget-id').text());
    prefsprops.children('.document-prefs-properties-version').text('version ' +  $(this).attr('version'));
    prefsprops.children('.document-prefs-properties-owner').empty().append('<b>Owner ID: </b>' + $(this).attr('ownerid'));
    prefsprops.children('.document-prefs-properties-reference').text();
    $('.document-prefs-con').show();

    // $('#document-prefs-reject').hide();
    // $('#document-prefs-approve').hide();

    $('#document-prefs-edits-download').attr({'href' : domain + $(this).attr('url'), 'download' : $(this).attr('title')});

    const ref = $(this).attr('reference');
    const ownerid = $(this).attr('ownerid');
    
    // console.log( ownerid);

    // SETTING UP REF #
    if(ref != '' && ref != 'na' ){
        prefsprops.children('.document-prefs-properties-reference').empty().append('<b>Reference #: </b> ' + ref).show();
        // prefsprops.children('.document-prefs-properties-reference b').text('Reference ID: ' + ref).show();
    }else{
        prefsprops.children('.document-prefs-properties-reference').hide();
    }
    

    // SETTING UP TIMESTAMPS ON CLICK
    let draftTS = $(this).attr('draftstamp');
    let proofreadTS = $(this).attr('proofreadstamp');
    let reviewTS = $(this).attr('reviewstamp');
    let approveTS = $(this).attr('approvestamp');
    let postapproveTS = $(this).attr('postapprovestamp');

    // console.log(draftTS, proofreadTS, reviewTS, approveTS, postapproveTS)

    prefsprops.children('.document-prefs-properties-timestamps').children('.document-prefs-properties-timestamps-date').remove();
    if(draftTS != 'na'){
        // const when = dateFns.distanceInWordsToNow(
        //     Date.parse(draftTS),
        //     {
        //         addSuffix: true
        //     }
        // );
        const when = dateFns.distanceInWordsStrict(
            new Date(),
            Date.parse(draftTS),
            {
                addSuffix: true,
                unit: 'd'
            }
        );
        const date = dateFns.format(
            Date.parse(draftTS),
            'MMMM D, YYYY'
        );
        prefsprops.children('.document-prefs-properties-timestamps').append(`
            <span class="document-prefs-properties-timestamps-date" style="color: white;"><b>Draft: </b>${date} : ${when}</span>
        `);
    }
    if(proofreadTS != 'na'){
        // const when = dateFns.distanceInWordsToNow(
        //     Date.parse(proofreadTS),
        //     {
        //         addSuffix: true
        //     }
        // );
        const when = dateFns.distanceInWordsStrict(
            new Date(),
            Date.parse(proofreadTS),
            {
                addSuffix: true,
                unit: 'd'
            }
        );
        const date = dateFns.format(
            Date.parse(proofreadTS),
            'MMMM D, YYYY'
        );
        prefsprops.children('.document-prefs-properties-timestamps').append(`
            <span class="document-prefs-properties-timestamps-date" style="color: white;"><b>Proofread: </b>${date} : ${when}</span>
        `);
    }
    if(reviewTS != 'na'){
        // const when = dateFns.distanceInWordsToNow(
        //     Date.parse(reviewTS),
        //     {
        //         addSuffix: true
        //     }
        // );
        const when = dateFns.distanceInWordsStrict(
            new Date(),
            Date.parse(reviewTS),
            {
                addSuffix: true,
                unit: 'd'
            }
        );
        const date = dateFns.format(
            Date.parse(reviewTS),
            'MMMM D, YYYY'
        );
        prefsprops.children('.document-prefs-properties-timestamps').append(`
            <span class="document-prefs-properties-timestamps-date" style="color: white;"><b>Review: </b>${date} : ${when}</span>
        `);
    }
    if(approveTS != 'na'){
        // const when = dateFns.distanceInWordsToNow(
        //     Date.parse(approveTS),
        //     {
        //         addSuffix: true
        //     }
        // );
        const when = dateFns.distanceInWordsStrict(
            new Date(),
            Date.parse(approveTS),
            {
                addSuffix: true,
                unit: 'd'
            }
        );
        const date = dateFns.format(
            Date.parse(approveTS),
            'MMMM D, YYYY'
        );
        prefsprops.children('.document-prefs-properties-timestamps').append(`
            <span class="document-prefs-properties-timestamps-date" style="color: white;"><b>Approve: </b>${date} : ${when}</span>
        `);
    }
    if(postapproveTS != 'na'){
        // const when = dateFns.distanceInWordsToNow(
        //     Date.parse(postapproveTS),
        //     {
        //         addSuffix: true
        //     }
        // );
        const when = dateFns.distanceInWordsStrict(
            new Date(),
            Date.parse(postapproveTS),
            {
                addSuffix: true,
                unit: 'd'
            }
        );
        const date = dateFns.format(
            Date.parse(postapproveTS),
            'MMMM D, YYYY'
        );
        prefsprops.children('.document-prefs-properties-timestamps').append(`
            <span class="document-prefs-properties-timestamps-date" style="color: white;"><b>Post Approve: </b>${date} : ${when}</span>
        `);
    }
    
    //document history
    $('#selected-document').attr({
        'docid' : $(this).attr('docid'),
        'version' : $(this).attr('version')
    });

    $('.document-prefs-properties-history-show').attr('status','show').click();

});
$('.document-prefs-properties-history-show').click(function(){
    if($(this).attr('status') == 'hide'){
        $(this).text('hide').attr('status','show');
        api_fetchDocumentHistory( $('#selected-document').attr('docid') , 'document-list-widget');
    }else{
        $('.document-prefs-properties-history').children('.document-prefs-properties-history-event').remove();
        $(this).text('view').attr('status','hide');
    }
});
$('.document-list-select').change(function(){
    // const id = $(this).parent('.document-list-con').attr('id');
    $('.document-prefs-con').hide();
    const id = $(this).parent('.document-list-con').parent('.document-body').siblings('.document-header').attr('name');
    const sel = $(this).val();
    const listcon = $('.document-list-con');

    console.log(id, sel);

    if(id == 'proofread' && sel == 'inactive'){
        fillDocumentList(proofreadInactive, listcon);
        $('#document-prefs-upload').hide();
        $('#document-prefs-reject').hide();
        $('#document-prefs-approve').hide();
    }else if(id == 'proofread' && sel == 'active'){
        fillDocumentList(proofreadActive, listcon);
        $('#document-prefs-upload').show();
        $('#document-prefs-reject').show();
        $('#document-prefs-approve').show();
    }else if(id == 'review' && sel == 'inactive'){
        fillDocumentList(reviewInactive, listcon);
        $('#document-prefs-upload').hide();
        $('#document-prefs-reject').hide();
        $('#document-prefs-approve').hide();
    }else if(id == 'review' && sel == 'active'){
        fillDocumentList(reviewActive, listcon);
        $('#document-prefs-upload').show();
        $('#document-prefs-reject').show();
        $('#document-prefs-approve').show();
    }else if(id == 'approve' && sel == 'inactive'){
        fillDocumentList(approveInactive, listcon);
        $('#document-prefs-upload').hide();
        $('#document-prefs-reject').hide();
        $('#document-prefs-approve').hide();
    }else if(id == 'approve' && sel == 'active'){
        fillDocumentList(approveActive, listcon);
        $('#document-prefs-upload').show();
        $('#document-prefs-reject').show();
        $('#document-prefs-approve').show();
    }else if(id == 'postapprove' && sel == 'inactive'){
        fillDocumentList(postapproveInactive, listcon);
        $('#document-prefs-upload').hide();
        $('#document-prefs-reject').hide();
        $('#document-prefs-approve').hide();
    }else if(id == 'postapprove' && sel == 'active'){
        fillDocumentList(postapproveActive, listcon);
        $('#document-prefs-upload').show();
        $('#document-prefs-reject').show();
        $('#document-prefs-approve').show();
    }
});
$('#document-prefs-download').click(function(e){
    $('#document-prefs-edits-download')[0].click();
});
$('#document-prefs-upload').click(function(){
    // console.log('test');
    $('.docflowbrowse-prefs').css('display', 'flex');
    $(this).hide();
    $('#document-prefs-approve').hide();
    $('#document-prefs-reject').hide();
    $('#document-prefs-download').hide();
});
$('.docflowbrowse-prefs-close').click(function(){
    $('.docflowbrowse-prefs').css('display', 'none');
    $('#document-prefs-upload').show();
    $('#document-prefs-download').show();
    $('#document-prefs-approve').show();
    $('#document-prefs-reject').show();
    $('#docflowbrowse-upload-filename').val('');
    $('.docflowbrowse-upload-notes').val('');
});

$('#document-prefs-approve, #document-prefs-reject').click(function(){
    const docid = $('#selected-document').attr('docid');
    const accid = __ID;
    const version = $('#selected-document').attr('version');
    const role = $('.document-header').attr('name');

    const cb = data => {
        console.log(data);
        if(data.found == 'false'){
            // No Record
            showNotification('Attention Document Director', 'You need to Checkin First Before you can Approve or Reject');
        }else{
            const cbsuccess = data => {
                console.log(data);
                if(data.status == 'na'){
                    $('.document-prefs-handling').css('display', 'flex');
                    $('#document-prefs-approve, #document-prefs-reject').hide();
                    const id = $(this).attr('id');
                    const status = id.split('-').pop().toUpperCase();
                    // console.log('status', status);
                    $('.document-prefs-handling-title').children('b').text(status);
                    $('.document-prefs-handling-submit').children('span').text(status);
                    $('#document-prefs-upload').hide();
                    $('#document-prefs-download').hide();
                    $('.document-prefs-handling-reason').val('');
                }else{
                    showNotification('Attention Document Director', 'You have already ' + data.status.toUpperCase() + '\'D this Document.');
                }
            };
            console.log(docid, accid, version, role);
            api_fetchDocumentHistoryStatus(docid, accid, role, cbsuccess);
        }
    };
    api_checkIfDocumentHistoryExists(docid, accid, role, cb);
});
$('.document-prefs-handling-close').click(function(){
    $('.document-prefs-handling').css('display', 'none');
    $('#document-prefs-approve, #document-prefs-reject').show();
    $('#document-prefs-upload').show();
    $('#document-prefs-download').show();
});

$('.docflowbrowse-upload-submit').click(function(){
    const notes = $('.docflowbrowse-upload-notes').val();
    const file = $('.docflowbrowse-upload-filename').val();
    const docid = $('#selected-document').attr('docid');
    const id = rngDirectorID();
    const accid = __ID;
    const version = $('#selected-document').attr('version');
    const role = $('.document-header').attr('name');
    let url ='';
    const status = 'na';
    
    const reason = 'na';
    // console.log(docid);
    if(notes && file){

        const cbok = ()=>{
            console.log('validate OK');

            const cb=data=>{
                console.log(data);
                if(data.found == 'error'){
                    console.log('totally not there');
                }else if(data.found == 'false'){
                    // Update
                    console.log('there but no URL');
                    const cbsuccess=data=>{
                        const x = data.split('++');
                        console.log(x[0]);
                        if(x[0] == 'OK'){
                            url = data.split('++').pop();
                            const notes = $('.docflowbrowse-upload-notes').val();
                            // console.log('ajax_docflow_uploaddoc OK');
                            // console.log('api_createDocumentHistory', id, docid, accid, version, status, url, notes, reason);
                            api_updateDocumentHistory(docid, accid, version, url, notes, role);
                            console.log('GEEZ',docid, accid, version, url, notes, role);
                            // SELECT * from tbl_document_history where docid = 'D-650067414'
                        }else{
                            console.log('ajax_docflow_uploaddoc ERROR');
                        }
                    }
                    const cbcomplete=()=>{
                        $('.docflowbrowse-prefs-close').click();
                        $('.docflowbrowse-upload-filename').val('');
                        $('#docflowbrowse').val('');
                        $('.docflowbrowse-upload-notes').val('');
                    }
                    ajax_docflow_uploaddoc($('#docflowbrowse'), docid, cbsuccess, cbcomplete);
                }else{
                    console.log('there with url');
                    const ajaxcb = data => {
                        if(data.includes('true')){
                            const cbsuccess1=data=>{
                                const x = data.split('++');
                                // console.log(x[0]);
                                if(x[0] == 'OK'){
                                    // console.log('PART1', docid, accid, version);
                                    const url = data.split('++').pop();
                                    const notes = $('.docflowbrowse-upload-notes').val();
                                    console.log('PART2', docid, accid, version, url, notes, role);
                                    api_updateDocumentHistory(docid, accid, version, url, notes, role);
                                    $('.docflowbrowse-upload-filename').val('');
                                    $('#docflowbrowse').val('');
                                    $('.docflowbrowse-upload-notes').val('');
                                }else{
                                    alert('An Error has Occured: ajax_docflow_uploaddoc:docflow.js:.docflowbrowse-upload-submit:data.found!=false: Please Contact Developers.');
                                }
                            }
                            const cbcomplete1=()=>{
                                // console.log('SHIIIIIT NIIICE');
                                $('.docflowbrowse-prefs-close').click();
                            }
                            ajax_docflow_uploaddoc($('#docflowbrowse'), docid, cbsuccess1, cbcomplete1);
                        }else if(data.includes('false')){
                            alert('An Error has Occured: ajax_deleteSingleImage:docflow.js:.docflowbrowse-upload-submit: Please Contact Developers.');
                        }else if(data.includes('error')){
                            alert('Some files are missing from the system. Please contact Developers.');
                        }
                    };
                    ajax_deleteSingleImage('../../' + data.found, ajaxcb);
                }
            };
            api_checkIfDocumentHistoryExists(docid, accid, role, cb);
            console.log(docid, accid, role);
        };
        const cberror = ()=>{
            console.log('validate ERROR');
            $('.docflowbrowse-upload-filename').val('');
            $('#docflowbrowse').val('');
            $('.docflowbrowse-upload-notes').val('');
            $('.docflowbrowse-prefs-close').click();
        };
        showValidate(cbok, cberror);
    
    }else if(!notes && !file){
        blinkbg($('.docflowbrowse-upload-notes'), RED_PALETTE, 'white');
        blinkbg($('.docflowbrowse-upload-filename'), RED_PALETTE, 'white');
    }else if(!file){
        blinkbg($('.docflowbrowse-upload-filename'), RED_PALETTE, 'white');
    }else if(!notes){
        blinkbg($('.docflowbrowse-upload-notes'), RED_PALETTE, 'white');
    }


});
$('.document-prefs-handling-submit').click(function(){
    let status = $(this).children('span').text().toLowerCase();
    let reason = $('.document-prefs-handling-reason').val();
    if(reason){
        const cbok = ()=>{
            const docid = $('#selected-document').attr('docid');
            const accid = __ID;
            const version = $('#selected-document').attr('version');
            const role = $('.document-header').attr('name');
    
            const d = new Date();
            const date = dateFns.format(
                Date.parse(d),
                'YYYY-MM-DD'
            );
            console.log(docid, accid, version, status, role, reason, date);
            api_updateDocumentHistoryStatus(docid, accid, version, status, role, reason, date);
            $('.document-prefs-handling-close').click();
        };
        const cberror = ()=>{
            $('.document-prefs-handling-close').click();
        };
        showValidate(cbok, cberror);
    }else{
        blinkbg($('.document-prefs-handling-reason'), RED_PALETTE, 'white');
    }
});


//MY DOCUMENTS EVENTS
$(document).on('click', '.director-con-widget-view-history', function(){
    const hid = $(this).parent('.director-con-widget-status').parent('.director-con-widget').attr('hid');
    // console.log(hid);
    for(i=0; i<mydocListHistory.length; i++){
        if(mydocListHistory[i].id == hid){
            const historycon = $(this)
            .parent('.director-con-widget-status')
            .parent('.director-con-widget')
            .parent('.me-body-widget-director-con')
            .siblings('.me-body-widget-history-con');

            historycon.children('.me-body-widget-history-event').remove();
            
            console.log(mydocListHistory[i].status, mydocListHistory[i].url);


            if(mydocListHistory[i].url != 'na'){
                historycon.append(`
                    <span class="me-body-widget-history-event">
                        <b>Checkin: </b> ${mydocListHistory[i].accid} &nbsp;
                    <i title="${mydocListHistory[i].notes}" class="fas fa-comment-alt .me-body-widget-history-notes"></i>
                    <a style="color: white;" href="${mydocListHistory[i].url}" download="${mydocListHistory[i].title}_${mydocListHistory[i].accid}"><i class="fas fa-download"></i></a>
                    </span>
                `);
            }
            // console.log(mydocListHistory[i].date);
            // const when = dateFns.distanceInWordsToNow(
            //     Date.parse(mydocListHistory[i].date),
            //     {
            //         addSuffix: true
            //     }
            // );
            const when = dateFns.distanceInWordsStrict(
                new Date(),
                Date.parse(mydocListHistory[i].date),
                {
                    addSuffix: true,
                    unit: 'd'
                }
            );
            const date = dateFns.format(
                Date.parse(mydocListHistory[i].date),
                'MMMM D, YYYY'
            );

            if( mydocListHistory[i].status != 'na' ){
                console.log('entered');
                historycon.append(`
                    <span class="me-body-widget-history-event"><b>Action: </b>${mydocListHistory[i].accid} ${mydocListHistory[i].status.toUpperCase()} @${when}&nbsp;
                    <i title="${mydocListHistory[i].reason}" class="fas fa-comment-alt me-body-widget-history-reason"></i></span> 
                `);
            }

            historycon.toggle();

            $('.me-body-widget-history-event').css('color', FONT_COLOR);
        }
    }
});
$(document).on('click', '.me-body-widget-refresh', function(){
    $('#nav-me').click();
});
$(document).on('click', '.me-body-widget-nextstage', function(){
    const uid = $(this).attr('id');
    const x = uid.split('_');
    const id = x[0];
    const status = x[1];

    console.log(id, status, ' : Perform update on document status');

    if(status == 'proofread'){
        const cb = () => {
            showNotification('Document Status', 'Updated Document Status into Proofread Stage.');
            $('#nav-me').click();
        };
        api_updateDocumentStatus(id, 'proofread', cb);
    }else if(status == 'review'){
        const cb = () => {
            showNotification('Document Status', 'Updated Document Status into Review Stage.');
            $('#nav-me').click();
        };
        api_updateDocumentStatus(id, 'review', cb);
    }else if(status == 'approve'){
        const cb = () => {
            showNotification('Document Status', 'Updated Document Status into Approve Stage.');
            $('#nav-me').click();
        };
        api_updateDocumentStatus(id, 'approve', cb);
    }


});
$(document).on('click', '.me-body-widget-effective', function(){
    const x = $(this).attr('id').split('_');
    // console.log('initial: ',x[0]);
    let newid = '';
    let docdata = {
        'docid' : '',
        'projectid' : '',
        'comid' : '',
        'cat1' : '',
        'cat2' : '',
        'cat3' : '',
        'cat4' : '',
        'docsuff' : '',
        'ownerid' : '',
        'title' : '',
        'docurl' : '',
        'docversion' : '',
        'effective' : '',
        'reference' : ''
    };
    
    for(i=0; i<mydocListFull.length; i++){
        if(x[0] == mydocListFull[i].docid){
            // console.log('found: ',mydocListFull[i].docid);
            docdata.docid = mydocListFull[i].docid;
            docdata.projectid = mydocListFull[i].projectid;
            docdata.comid = mydocListFull[i].comid;
            docdata.cat1 = mydocListFull[i].cat1;
            docdata.cat2 = mydocListFull[i].cat2;
            docdata.cat3 = mydocListFull[i].cat3;
            docdata.cat4 = mydocListFull[i].cat4;
            docdata.docsuff = mydocListFull[i].docsuff;
            docdata.ownerid = mydocListFull[i].ownerid;
            docdata.title = mydocListFull[i].title;
            docdata.docurl = mydocListFull[i].docurl;
            docdata.docversion = mydocListFull[i].docversion;
            docdata.effective = mydocListFull[i].effective;
            docdata.reference = mydocListFull[i].reference;
        }
    }

    if(docdata.effective == 'null' || docdata.effective == null || docdata.effective == ''){
        // console.log('not effective yet');
        const cbsuccess = data => {
            const c = parseInt(data.found);
            const count = (c + 1).pad(5);
            newid = `D-${docdata.cat1}${docdata.cat2}${docdata.cat3}${docdata.cat4}${count}`;
            // console.log(docdata.docurl);
            const cbsuccess1 = data => {
                // console.log(data.uploaddocumentbank);
                const x = data.uploaddocumentbank.split('++');
                if(x[0] == 'OK'){
                    const url = x[1];
                    // console.log(url);
                    const n = parseFloat(docdata.docversion);
                    const newversion = Math.ceil(n).toFixed(1);
                    console.log(newversion);

                    const cbcomplete2 = () => {
                        console.log('created');
                        const cbsuccess3 = data => {
                            // console.log(data);
                            if(data.response == 'true'){
                                $('#nav-me').click();
                                // end of loading animation
                            }
                        };
                        api_updateDocidToEffectiveId(newid, docdata.docid, newversion, cbsuccess3);
                    };
                    api_createDocumentBank( newid, docdata.comid, docdata.projectid, docdata.ownerid, docdata.cat1, docdata.cat2, docdata.cat3, docdata.cat4, docdata.title, url, newversion, docdata.reference, cbcomplete2);
                }
            };
            ajax_uploadDocumentBank(docdata.docurl, __ID, cbsuccess1);
        };
        api_getDocumentBankCategoryCount(docdata.cat1, docdata.cat2, docdata.cat3, docdata.cat4, 'me-body-widget-effective', cbsuccess);
        // start of loading animation
    }else{
        console.log('already effective. Please refresh page');
        showNotification('Document Bank', 'This Document is already Effective.');
        $('#nav-me').click();
    }
});
$(document).on('click', '.me-body-widget-execution', function(){
    const x = $(this).attr('id').split('_');
    // console.log('initial: ',x[0]);
    let newid = '';
    let docdata = {
        'docid' : '',
        'projectid' : '',
        'comid' : '',
        'cat1' : '',
        'cat2' : '',
        'cat3' : '',
        'cat4' : '',
        'docsuff' : '',
        'ownerid' : '',
        'title' : '',
        'docurl' : '',
        'docversion' : '',
        'effective' : '',
        'reference' : ''
    };
    
    for(i=0; i<mydocListFull.length; i++){
        if(x[0] == mydocListFull[i].docid){
            // console.log('found: ',mydocListFull[i].docid);
            docdata.docid = mydocListFull[i].docid;
            docdata.projectid = mydocListFull[i].projectid;
            docdata.comid = mydocListFull[i].comid;
            docdata.cat1 = mydocListFull[i].cat1;
            docdata.cat2 = mydocListFull[i].cat2;
            docdata.cat3 = mydocListFull[i].cat3;
            docdata.cat4 = mydocListFull[i].cat4;
            docdata.docsuff = mydocListFull[i].docsuff;
            docdata.ownerid = mydocListFull[i].ownerid;
            docdata.title = mydocListFull[i].title;
            docdata.docurl = mydocListFull[i].docurl;
            docdata.docversion = mydocListFull[i].docversion;
            docdata.effective = mydocListFull[i].effective;
            docdata.reference = mydocListFull[i].reference;
        }
    }
    
    const newversion = parseFloat(docdata.docversion) + 0.1;
    
    for(i=0; i<mydocListHistory.length; i++){
        if(mydocListHistory[i].docid == docdata.docid){
            console.log(docdata.docid, mydocListHistory[i].url);
            ajax_deleteSingleImage('../../' + mydocListHistory[i].url);
        }
    }

    const cbsuccess = data => {
        if(data.response == 'true'){
            $('#nav-me').click();
        }
    };
    api_updateDocumentSendToExecution( docdata.docid, newversion, cbsuccess);




});
$(document).on('click', '.me-body-widget-postapprove', function(){
    const x = $(this).attr('id').split('_');
    // console.log('initial: ',x[0]);
    let newid = '';
    let docdata = {
        'docid' : '',
        'projectid' : '',
        'comid' : '',
        'cat1' : '',
        'cat2' : '',
        'cat3' : '',
        'cat4' : '',
        'docsuff' : '',
        'ownerid' : '',
        'title' : '',
        'docurl' : '',
        'docversion' : '',
        'effective' : '',
        'reference' : ''
    };
    for(i=0; i<mydocListFull.length; i++){
        if(x[0] == mydocListFull[i].docid){
            // console.log('found: ',mydocListFull[i].docid);
            docdata.docid = mydocListFull[i].docid;
            docdata.projectid = mydocListFull[i].projectid;
            docdata.comid = mydocListFull[i].comid;
            docdata.cat1 = mydocListFull[i].cat1;
            docdata.cat2 = mydocListFull[i].cat2;
            docdata.cat3 = mydocListFull[i].cat3;
            docdata.cat4 = mydocListFull[i].cat4;
            docdata.docsuff = mydocListFull[i].docsuff;
            docdata.ownerid = mydocListFull[i].ownerid;
            docdata.title = mydocListFull[i].title;
            docdata.docurl = mydocListFull[i].docurl;
            docdata.docversion = mydocListFull[i].docversion;
            docdata.effective = mydocListFull[i].effective;
            docdata.reference = mydocListFull[i].reference;
        }
    }

    // console.log(docdata.docid);
    const cb = () => {
        showNotification('Document Status', 'Updated Document Status into Post Approve Stage.');
        $('#nav-me').click();
    };
    api_updateDocumentStatus(docdata.docid, 'approve', cb);
});


// UPLOAD DOCUMENTS EVENT
$('#create-upload-submit').click(function(){
    showSelCat();
    const docid = $('#create-upload-docid').val();
    selid = docid;
    // const docsuff = 
    // const catid = catid;
    const comid = __COMPANY_ID;
    const ownerid = __ID;
    const title = $('#create-upload-title').val();
    let url = '';
    const version = '0.1';
    const status = 'draft';
    const zreference = $('#create-upload-refid').val();
    let reference = '';


    if(zreference == "" || zreference == undefined){
        reference = 'na';
    }else{
        reference = $('#create-upload-refid').val();
    }
    const cbsuccess = data => {
        console.log(data);
        let x = data.split('++');
        url = x[1];
        gfUrl = x[1];
        gfDocid = docid;
        // console.log( docid, comid, docsuff, cat1, cat2, cat3, cat4, ownerid, title, url, version, status );
        // console.log(reference);
        console.log(uploadDocumentSelectedProjectId);
        api_createDocument(docid, comid, 'na', cat1, cat2, cat3, cat4, ownerid, title, url, version, status, reference, uploadDocumentSelectedProjectId);
        api_fetchAccount(__COMPANY_ID, 'na', 'create-upload-submit', docbuilder_dragoption);
        
        $('.create-upload-con1').hide();
        $('.create-upload-con2').hide();
        $('.create-upload-con3').css('display', 'flex').show();
        createUploadGate = true;
    }

    ajax_docbuilder_uploaddoc($('#docbuilderbrowse'), __COMPANY_ID, __ID, cbsuccess);
});
$('#create-upload-checkin').click(function(){
    if(createUploadProofreadList.length > 0 && createUploadReviewList.length > 0 && createUploadApproveList.length > 0 && createUploadDraftList.length > 0 ){
        createUploadAccountList = [];
        createUploadDraftList = [];
        createUploadProofreadList = [];
        createUploadReviewList = [];
        createUploadApproveList = [];
        createUploadPostApproveList = [];
        createUploadGate = false;
        $('.create-upload-details-filename').val('');
        $('#create-upload-title').val('');
        $('#create-upload-refid').val('');
        $('.create-upload-con3-connectList-widget-con').empty();
        $('.create-upload-con1').show();
        $('.create-upload-con2').hide();
        $('.create-upload-con3').hide();
        $( "#nav-dashboard").trigger( "click" );
        showNotification('Document Checkin', 'Successfuly Checked In Document');
    }else{
        showNotification('Document Checkin', 'Please Fill in all Required Roles');
    }
    
});
$(document).click(function(e){
    let gate = true;
    const id = e.target.id;
    
    if(createUploadGate){
        if(id.includes('logout')  || id.includes('nav') || id.includes('home')){
            gate = false;
        }
        for(i=0; i<e.target.classList.length; i++){
            let x = e.target.classList[i];
            if(x.includes('logout') || x.includes('nav') ){
                gate = false;
            }
        }
    }
    if(!gate){
        const cbtrue = () => {
            // console.log("Delete Document");
            // console.log(gfDocid, gfUrl);
            cancelDocument(gfDocid, '../../' + gfUrl);
            $('.create-upload-con1').show();
            $('.create-upload-con2').hide();
            $('.create-upload-con3').hide();
            // $( "#nav-dashboard").trigger( "click" );
            createUploadAccountList = [];
            createUploadDraftList = [];
            createUploadProofreadList = [];
            createUploadReviewList = [];
            createUploadApproveList = [];
            createUploadPostApproveList = [];
            createUploadGate = false;
            $('.create-upload-details-filename').val('');
            $('#create-upload-title').val('');
            $('#create-upload-refid').val('');
            $('.create-upload-con3-connectList-widget-con').empty();
            $('#' + id).click();
        };
        const cbfalse = () => {
            console.log("Stay on Page");
        };
        showAction('Leaving? Your Document Will not be saved! Do you still wish to continue?', cbtrue, cbfalse);
    }

});
$('#create-upload-con1-project-btn').click(function(){
    let x = $('#create-upload-con1-project-select').val().split('++');
    let prid = x[0];
    let prname = x[1];
    uploadDocumentSelectedProjectId = prid;
    console.log(prid);
    $('.create-upload-con1-selected-project-title').text(prname);

    $('.create-upload-con1').css('display', 'flex').show();
});



function docbuilderbrowse(){
    $('.create-upload-con2').css('display', 'flex').show();
    $(document).off('change', '#docbuilderbrowse'); 
    $(document).on('change','#docbuilderbrowse', function(){
        // console.log($(this).val().split('\\').pop());
        const docid = rngDocumentId();
        let filename = $(this).val().split('\\').pop();
        // console.log($(this).context.files[0].name);
        let extension = filename.split('.').pop();
        console.log(extension);
        if(filename){
            $('.create-upload-details-filename').val(filename);
            // fa-file, file-word, file-pdf, file-excel, file-image, file-archive
            if(extension == 'docx' ){
                $('.create-upload-details-filetype').removeClass('fa-file fa-file-word fa-file-pdf fa-file-excel fa-file-image fa-file-archive file-alt').addClass('fa-file-word');
                $('.create-upload-details-filename-icon').removeClass('fa-times-circle').addClass('fa-check-circle').css('color', GREEN_PALETTE);
                api_fetchDocumentCategory(__COMPANY_ID, 'docbuilderbrowse');
                // showSelCat();
                $('#create-upload-docid').val(docid);
            }else if(extension == 'pdf'){
                $('.create-upload-details-filetype').removeClass('fa-file fa-file-word fa-file-pdf fa-file-excel fa-file-image fa-file-archive file-alt').addClass('fa-file-pdf');
                $('.create-upload-details-filename-icon').removeClass('fa-times-circle').addClass('fa-check-circle').css('color', GREEN_PALETTE);
                api_fetchDocumentCategory(__COMPANY_ID, 'docbuilderbrowse');
                $('#create-upload-docid').val(docid);
                // showSelCat();
            }else if(extension == 'xlsx'){
                $('.create-upload-details-filetype').removeClass('fa-file fa-file-word fa-file-pdf fa-file-excel fa-file-image fa-file-archive file-alt').addClass('fa-file-excel');
                $('.create-upload-details-filename-icon').removeClass('fa-check-circle').addClass('fa-times-circle').css('color', RED_PALETTE);
                showNotification('Upload Error', 'Excel Files will need to be converted into Word or Pdf Document and be sent for review');
            }else if(extension == 'jpg' || extension == 'png' || extension == 'bmp' || extension == 'jpeg'){
                $('.create-upload-details-filetype').removeClass('fa-file fa-file-word fa-file-pdf fa-file-excel fa-file-image fa-file-archive file-alt').addClass('fa-file-image');
                $('.create-upload-details-filename-icon').removeClass('fa-check-circle').addClass('fa-times-circle').css('color', RED_PALETTE);
                showNotification('Upload Error', 'Image Files will need to be converted into Word or Pdf Document and be sent for review');
            }else if(extension == 'rar' || extension == 'zip'){
                $('.create-upload-details-filetype').removeClass('fa-file fa-file-word fa-file-pdf fa-file-excel fa-file-image fa-file-archive file-alt').addClass('fa-file-archive');
                $('.create-upload-details-filename-icon').removeClass('fa-check-circle').addClass('fa-times-circle').css('color', RED_PALETTE);
                showNotification('Upload Error', 'Invalid Filetype');
            }else if(extension == 'txt'){
                $('.create-upload-details-filetype').removeClass('fa-file fa-file-word fa-file-pdf fa-file-excel fa-file-image fa-file-archive file-alt').addClass('fa-file-alt');
                $('.create-upload-details-filename-icon').removeClass('fa-check-circle').addClass('fa-times-circle').css('color', RED_PALETTE);
                showNotification('Upload Error', 'Invalid Filetype');
            }else{
                $('.create-upload-details-filetype').removeClass('fa-file fa-file-word fa-file-pdf fa-file-excel fa-file-image fa-file-archive file-alt').addClass('fa-file');
                $('.create-upload-details-filename-icon').removeClass('fa-check-circle').addClass('fa-times-circle').css('color', RED_PALETTE);
                showNotification('Upload Error', 'Invalid Filetype');
            }
            // const cb = ret => {
            //     console.log(ret);
            // };
            // ajax_saveSingleDocument($('#docbuilderbrowse'), cb);
        }else{
            console.log('cancelled');
            $('.create-upload-con2').hide();
        }
        $('.create-upload-con1-project-select').hide();
        let x = filename.split('.');
        $('#create-upload-title').val(x[0]);
    });
}
function cancelDocument(docid, url){
    ajax_deleteSingleImage(url);
    api_deleteDocument(docid);
    api_deleteDocumentConnectByDocid(docid);
}
function showSelCat(){
    
    cat1 = parseInt($('#create-upload-cat1').val());
    cat2 = parseInt($('#create-upload-cat2').val());
    cat3 = parseInt($('#create-upload-cat3').val());
    cat4 = parseInt($('#create-upload-cat4').val());

    const cb = data => {
        let str = "" + ( parseInt( data[0].found ) + 1 );
        let pad = "00000";
        let zdocsuff = pad.substring(0, pad.length - str.length) + str;
        docsuff = 'D-' + zdocsuff;

        const cid = 'D-' + cat1 + cat2 + cat3 + cat4 + zdocsuff;
        $('#create-upload-docid').val(cid);
    };

    api_getDocumentCountByCategory(cat1, cat2, cat3, cat4, cb);
}
// UPLOAD DOCUMENT - SET CONNECT EVENTS
let createUploadAccountList = [];
let createUploadDraftList = [];
let createUploadProofreadList = [];
let createUploadReviewList = [];
let createUploadApproveList = [];
let createUploadPostApproveList = [];
let uploadDocumentSelectedProjectId = '';

const docbuilder_dragoption = {
    start: function(e, ui) {
        // this function fires when you start dragging
        const id = $(ui.helper).attr('zid');
        let draftGate = true;
        let proofreadGate = true;
        let reviewGate = true;
        let approveGate = true;
        let postapproveGate = true;

        for(i=0; i<createUploadDraftList.length; i++){
            if(createUploadDraftList[i] == id){
                draftGate = false;
            }
        }
        for(i=0; i<createUploadProofreadList.length; i++){
            // console.log(createUploadProofreadList[i] );
            if(createUploadProofreadList[i] == id){
                proofreadGate = false;
            }
        }
        for(i=0; i<createUploadReviewList.length; i++){
            if(createUploadReviewList[i] == id){
                reviewGate = false;
            }
        }
        for(i=0; i<createUploadApproveList.length; i++){
            if(createUploadApproveList[i] == id){
                approveGate = false;
            }
        }
        for(i=0; i<createUploadPostApproveList.length; i++){
            if(createUploadPostApproveList[i] == id){
                postapproveGate = false;
            }
        }

        if(draftGate){
            $('#connectList-draft').css('background-color', GREEN_PALETTE);
        }else{
            $('#connectList-draft').css('background-color', YELLOW_PALETTE);
        }
        if(proofreadGate){
            $('#connectList-proofread').css('background-color', GREEN_PALETTE);
        }else{
            $('#connectList-proofread').css('background-color', YELLOW_PALETTE);
        }
        if(reviewGate){
            $('#connectList-review').css('background-color', GREEN_PALETTE);
        }else{
            $('#connectList-review').css('background-color', YELLOW_PALETTE);
        }
        if(approveGate){
            $('#connectList-approve').css('background-color', GREEN_PALETTE);
        }else{
            $('#connectList-approve').css('background-color', YELLOW_PALETTE);
        }
        if(postapproveGate){
            $('#connectList-postapprove').css('background-color', GREEN_PALETTE);
        }else{
            $('#connectList-postapprove').css('background-color', YELLOW_PALETTE);
        }
        
        
    },
    drag: function() {
    //   this function fires after you drag and while dragging
    },
    stop: function() {
    // this function fires when you stop dragging or if you dropped it
        $('.create-upload-con3-connectList-widget').css('background-color', SUB_COLOR);
    // and here in stop you can color your droppable div into its original state
    },
    opacity: 0.7, // opacity of the draggable
    helper: "clone", // will not drag the actual element. instead will send a clone
    containment: ".create-upload-con3", // here is where the draggable can stay. if you put "body" then it can go around the whole page
                                       // but if you put "#sampleid" then it will contain the draggable within the range of the div with the id of 'sampleid'
    scroll: false,  // prevents scrolling
    cursorAt: { bottom: 0, left: 150}, // puts cursor at center bottom || remove left option to just simply put it in bottom
    revert: "invalid" // draggable will fall back to its place
};
$('.create-upload-con3-connectList-widget').droppable({
    accept: ".create-upload-con3-acclist-widget", // this will determine which elements are accepted to drop in this case all element with the class of moduleman-module-list-widget will drop
    drop: function( event, ui ) {
        // $(this).css('background-color', 'red');
        // console.log(ui.helper.id);
        let id = $(ui.draggable).attr('zid'); // same with the draggable. if you use this code, you can access the draggable element thats being dropped 
        let name = $(ui.draggable).attr('fn');
        let email = $(ui.draggable).attr('em');
        let connectType = $(this).attr('id');
        // console.log('id: ', id, name, email, connectType);
        const x = connectType.split('-');
        const xx = x[1];
        const prColor = $('#connectList-proofread').css('background-color');
        const rvColor = $('#connectList-review').css('background-color');
        const apColor = $('#connectList-approve').css('background-color');
        const drColor = $('#connectList-draft').css('background-color');
        const paColor = $('#connectList-postapprove').css('background-color');

        

        if(xx == 'draft'){
            if(rgb2hex(drColor).toUpperCase() == YELLOW_PALETTE){
                showNotification('Document Connect','The Account You are trying to add is already added');
            }else{
                $('#connectList-draft').children('.create-upload-con3-connectList-widget-con').append(`
                    <div class="create-upload-con3-connectList-widget-item btn-shadow" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};">
                        <span class="create-upload-con3-connectList-widget-item-name">${name}</span>
                        <span class="create-upload-con3-connectList-widget-item-email">${email}</span>
                        <i accid="${id}" docid="${selid}" class="create-upload-con3-connectList-widget-item-delete fas fa-trash"></i>
                    </div>
                `);
                createUploadDraftList[createUploadDraftList.length] = id;
                // console.log(id, selid, __COMPANY_ID, 'proofread');
                api_createDocumentConnect(id, selid, __COMPANY_ID, 'draft');
            }
        }else if(xx == 'proofread'){
            if(rgb2hex(prColor).toUpperCase() == YELLOW_PALETTE){
                showNotification('Document Connect','The Account You are trying to add is already added');
            }else{
                $('#connectList-proofread').children('.create-upload-con3-connectList-widget-con').append(`
                    <div class="create-upload-con3-connectList-widget-item btn-shadow" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};">
                        <span class="create-upload-con3-connectList-widget-item-name">${name}</span>
                        <span class="create-upload-con3-connectList-widget-item-email">${email}</span>
                        <i accid="${id}" docid="${selid}" class="create-upload-con3-connectList-widget-item-delete fas fa-trash"></i>
                    </div>
                `);
                createUploadProofreadList[createUploadProofreadList.length] = id;
                // console.log(id, selid, __COMPANY_ID, 'proofread');
                api_createDocumentConnect(id, selid, __COMPANY_ID, 'proofread');
            }
        }else if(xx == 'review'){
            // console.log('review');
            if(rgb2hex(rvColor).toUpperCase() == YELLOW_PALETTE){
                showNotification('Document Connect','The Account You are trying to add is already added');
            }else{
                $('#connectList-review').children('.create-upload-con3-connectList-widget-con').append(`
                    <div class="create-upload-con3-connectList-widget-item btn-shadow" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};">
                        <span class="create-upload-con3-connectList-widget-item-name">${name}</span>
                        <span class="create-upload-con3-connectList-widget-item-email">${email}</span>
                        <i accid="${id}" docid="${selid}" class="create-upload-con3-connectList-widget-item-delete fas fa-trash"></i>
                    </div>
                `);
                createUploadReviewList[createUploadReviewList.length] = id;
                // console.log(id, selid, __COMPANY_ID, 'review');
                api_createDocumentConnect(id, selid, __COMPANY_ID, 'review');
            }
        }else if(xx == 'approve'){
            // console.log('approve');
            if(rgb2hex(apColor).toUpperCase() == YELLOW_PALETTE){
                showNotification('Document Connect','The Account You are trying to add is already added');
            }else{
                $('#connectList-approve').children('.create-upload-con3-connectList-widget-con').append(`
                    <div class="create-upload-con3-connectList-widget-item btn-shadow" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};">
                        <span class="create-upload-con3-connectList-widget-item-name">${name}</span>
                        <span class="create-upload-con3-connectList-widget-item-email">${email}</span>
                        <i accid="${id}" docid="${selid}" class="create-upload-con3-connectList-widget-item-delete fas fa-trash"></i>
                    </div>
                `);
                createUploadApproveList[createUploadApproveList.length] = id;
                // console.log(id, selid, __COMPANY_ID, 'approve');
                api_createDocumentConnect(id, selid, __COMPANY_ID, 'approve');
            }
        }else if(xx == 'postapprove'){
            console.log('postapprove');
            if(rgb2hex(paColor).toUpperCase() == YELLOW_PALETTE){
                showNotification('Document Connect','The Account You are trying to add is already added');
            }else{
                $('#connectList-postapprove').children('.create-upload-con3-connectList-widget-con').append(`
                    <div class="create-upload-con3-connectList-widget-item btn-shadow" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};">
                        <span class="create-upload-con3-connectList-widget-item-name">${name}</span>
                        <span class="create-upload-con3-connectList-widget-item-email">${email}</span>
                        <i accid="${id}" docid="${selid}" class="create-upload-con3-connectList-widget-item-delete fas fa-trash"></i>
                    </div>
                `);
                createUploadPostApproveList[createUploadPostApproveList.length] = id;
                // console.log(id, selid, __COMPANY_ID, 'approve');
                api_createDocumentConnect(id, selid, __COMPANY_ID, 'postapprove');
            }
        }

        // ADD to tbl_document_connect
    }
});
$(document).on('click', '.create-upload-con3-connectList-widget-item-delete', function(){
    const accid = $(this).attr('accid');
    // const docid = selid;
    const xrole = $(this).parent('.create-upload-con3-connectList-widget-item').parent('.create-upload-con3-connectList-widget-con').parent('.create-upload-con3-connectList-widget').attr('id')
    const xxrole = xrole.split('-');
    const role = xxrole[1];
    // console.log(accid, selid, role);
    api_deleteDocumentConnect(accid, selid, role);
    showNotification('Document Connect', 'SUccessfuly Deleted Account Connection to Document');
    $(this).parent('.create-upload-con3-connectList-widget-item').remove();

    if(role == 'proofread'){
        createUploadProofreadList = $.grep(createUploadProofreadList, function(value) {
            return value != accid;
        });
    }else if(role == 'review'){
        createUploadReviewList = $.grep(createUploadReviewList, function(value) {
            return value != accid;
        });
    }else if(role == 'approve'){
        createUploadApproveList = $.grep(createUploadApproveList, function(value) {
            return value != accid;
        });
    }
});
$('#create-upload-con3-acclist-userlevel').change(function(){
    api_fetchAccount(__COMPANY_ID, $(this).val() , 'create-upload-submit', docbuilder_dragoption);
});
$('#create-upload-con3-acclist-search').keyup(function(){
    $('.create-upload-con3-acclist-widget-con').empty();
    let x = createUploadAccountList.length;
    let f = $(this).val();
    for(i=0; i<x; i++){
        if(createUploadAccountList[i].id.toLowerCase().includes(f.toLowerCase()) || createUploadAccountList[i].fn.toLowerCase().includes(f.toLowerCase()) || createUploadAccountList[i].em.toLowerCase().includes(f.toLowerCase()) || createUploadAccountList[i].ln.toLowerCase().includes(f.toLowerCase()) ){
            $('.create-upload-con3-acclist-widget-con').append(`
                <div zid="${createUploadAccountList[i].id}" fn="${createUploadAccountList[i].fn}" em="${createUploadAccountList[i].em}" class="create-upload-con3-acclist-widget btn-shadow" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};">
                    <span class="create-upload-con3-acclist-widget-name">${createUploadAccountList[i].fn}</span>
                    <span class="create-upload-con3-acclist-widget-email">${createUploadAccountList[i].em}</span>
                </div>
            `);
            // console.log(docbuilder_dragoption);
            $('.create-upload-con3-acclist-widget').draggable(docbuilder_dragoption);
        }
    }

});


let documentEditAccountList = [];
let documentEditCoownerAccountList = [];
let documentEditDraftList = [];
let documentEditProofreadList = [];
let documentEditReviewList = [];
let documentEditApproveList = [];
let documentEditPostApproveList = [];
// DOCUMENT ADVANCED SEARCH EVENTS
$('#documents-list-advanced-search-con').click(function(e){
    if(e.target.id == "documents-list-advanced-search-con"){
        $(this).hide();
    }
});
$('.documents-list-advanced-search').click(function(){
    $('#documents-list-advanced-search-con').css('display','flex').show(); 

});
$('#advanced-search-con-submit').click(function(){
    $('#documents-list-advanced-search-con').hide(); 
    $('.advanced-search-con').children('.advanced-search-con-widget').each(function(){
        let x = $(this).children('input').prop('checked');
        if(x){
            $('#documents-list-searchbox-tbox').attr('placeholder', $(this).children('input').val())
        }
    });
});


// DOCUMENT CATEGORY SEARCH EVENTS
$('.documents-header-category-btn').click(function(){
    // console.log($('#documents-header-category-options-multi').isChecked());
    if($('#documents-header-category-options-multi').is(':checked')){
        // console.log('fire');
        const cat1 = $('#documents-header-category-select1').val();
        const cat2 = $('#documents-header-category-select2').val();
        const cat3 = $('#documents-header-category-select3').val();
        const cat4 = $('#documents-header-category-select4').val();
        const query = `cat1 = ${cat1} AND cat2 = ${cat2} AND cat3 = ${cat3} AND cat4 = ${cat4};` ;
        api_fetchDocumentQuery(__COMPANY_ID, query, '.documents-header-category-btn');
    }else{
        // console.log('water');
    }
});
$('#documents-header-category-select1, #documents-header-category-select2, #documents-header-category-select3, #documents-header-category-select4 ').change(function(e){
    if($('#documents-header-category-options-single').is(':checked')){
        const catnum = $(this).attr('cat');
        const ordernum = $(this).val();
        // console.log(e.target.id, catnum, ordernum);
        const query = catnum + ' = ' + ordernum + ';';
        api_fetchDocumentQuery(__COMPANY_ID, query, '.documents-header-category-btn');
        $('#documents-header-category-select1, #documents-header-category-select2, #documents-header-category-select3, #documents-header-category-select4 ').val('0');
        $('#' + e.target.id).val(ordernum);
    }
});
$('#documents-header-category-options-multi, #documents-header-category-options-single').change(function(){
    $('#documents-header-category-select1, #documents-header-category-select2, #documents-header-category-select3, #documents-header-category-select4 ').val('0');
});

// DOCUMENT LIST WIDGET EVENTS
$(document).on('click', '.documents-list-widget', function(){
    const status = $(this).attr('status');
    const url =  $(this).attr('url');
    const uid = $(this).children('.documents-list-widget-id').text();
    const docid = $(this).attr('docid');
    const ownerid = $(this).attr('ownerid');

    const docsuff =  $(this).attr('docsuff');
    const cat1 =  $(this).attr('cat1');
    const cat2 =  $(this).attr('cat2');
    const cat3 =  $(this).attr('cat3');
    const cat4 =  $(this).attr('cat4');
    const title =  $(this).attr('title');
    const version =  $(this).attr('version');
    const reference =  $(this).attr('reference');

    
    $('.documents-prefs').css('display', 'flex').show();
    // console.log(ownerid, __ID)
    if(ownerid === __ID){
        $('#documents-prefs-edits-properties').show();
        $('#documents-prefs-edits-checkout').show();
        $('#documents-prefs-edits-docflow').show();
    }else{
        $('#documents-prefs-edits-properties').hide();
        $('#documents-prefs-edits-checkout').hide();
        $('#documents-prefs-edits-docflow').hide();
    }

    // console.log(docid);
    $('.documents-prefs-status-docid').text(uid).attr('docid', docid);
    // console.log(url);
    $('#documents-prefs-edits-download').attr({'href' : domain + $(this).attr('url'), 'download' : $(this).attr('title')});
    selDocRole = status;
    $('.documents-prefs-status-timestamp').children('.documents-prefs-status-timestamp-widget').remove();
    if(status == 'draft'){
        $('#documents-prefs-edits-docflow').show();
        $('.documents-prefs-status-handlers').show();

        $('#documents-prefs-status-draft').children('span').css({'background-color':'transparent', 'font-weight' : 'bold'});
        $('#documents-prefs-status-proofread').children('span').css({'background-color':'rgba(0, 0, 0, 0.26)', 'font-weight' : 'initial'});
        $('#documents-prefs-status-review').children('span').css({'background-color':'rgba(0, 0, 0, 0.26)', 'font-weight' : 'initial'});
        $('#documents-prefs-status-approve').children('span').css({'background-color':'rgba(0, 0, 0, 0.26)', 'font-weight' : 'initial'});
        $('#documents-prefs-status-postapprove').children('span').css({'background-color':'rgba(0, 0, 0, 0.26)', 'font-weight' : 'initial'});

        $('#documents-prefs-status-draft').children('i').addClass('fa-check-square').removeClass('fa-spinner');
        $('#documents-prefs-status-proofread').children('i').removeClass('fa-check-square').addClass('fa-spinner');
        $('#documents-prefs-status-review').children('i').removeClass('fa-check-square').addClass('fa-spinner');
        $('#documents-prefs-status-approve').children('i').removeClass('fa-check-square').addClass('fa-spinner');
        $('#documents-prefs-status-postapprove').children('i').removeClass('fa-check-square').addClass('fa-spinner');
        
    }else if(status == 'proofread'){
        $('#documents-prefs-edits-docflow').hide();
        $('.documents-prefs-status-handlers').show();

        $('#documents-prefs-status-proofread').children('span').css({'background-color':'transparent', 'font-weight' : 'bold'});
        $('#documents-prefs-status-draft').children('span').css({'background-color':'rgba(0, 0, 0, 0.26)', 'font-weight' : 'initial'});
        $('#documents-prefs-status-review').children('span').css({'background-color':'rgba(0, 0, 0, 0.26)', 'font-weight' : 'initial'});
        $('#documents-prefs-status-approve').children('span').css({'background-color':'rgba(0, 0, 0, 0.26)', 'font-weight' : 'initial'});
        $('#documents-prefs-status-postapprove').children('span').css({'background-color':'rgba(0, 0, 0, 0.26)', 'font-weight' : 'initial'});

        $('#documents-prefs-status-draft').children('i').addClass('fa-check-square').removeClass('fa-spinner');
        $('#documents-prefs-status-proofread').children('i').addClass('fa-check-square').removeClass('fa-spinner');
        $('#documents-prefs-status-review').children('i').removeClass('fa-check-square').addClass('fa-spinner');
        $('#documents-prefs-status-approve').children('i').removeClass('fa-check-square').addClass('fa-spinner');
        $('#documents-prefs-status-postapprove').children('i').removeClass('fa-check-square').addClass('fa-spinner');
    }else if(status == 'review'){
        $('#documents-prefs-edits-docflow').hide();
        $('.documents-prefs-status-handlers').show();

        $('#documents-prefs-status-review').children('span').css({'background-color':'transparent', 'font-weight' : 'bold'});
        $('#documents-prefs-status-draft').children('span').css({'background-color':'rgba(0, 0, 0, 0.26)', 'font-weight' : 'initial'});
        $('#documents-prefs-status-proofread').children('span').css({'background-color':'rgba(0, 0, 0, 0.26)', 'font-weight' : 'initial'});
        $('#documents-prefs-status-approve').children('span').css({'background-color':'rgba(0, 0, 0, 0.26)', 'font-weight' : 'initial'});
        $('#documents-prefs-status-postapprove').children('span').css({'background-color':'rgba(0, 0, 0, 0.26)', 'font-weight' : 'initial'});

        $('#documents-prefs-status-draft').children('i').addClass('fa-check-square').removeClass('fa-spinner');
        $('#documents-prefs-status-proofread').children('i').addClass('fa-check-square').removeClass('fa-spinner');
        $('#documents-prefs-status-review').children('i').addClass('fa-check-square').removeClass('fa-spinner');
        $('#documents-prefs-status-approve').children('i').removeClass('fa-check-square').addClass('fa-spinner');
        $('#documents-prefs-status-postapprove').children('i').removeClass('fa-check-square').addClass('fa-spinner');
    }else if(status == 'approve'){
        $('#documents-prefs-edits-docflow').hide();
        $('.documents-prefs-status-handlers').show();

        $('#documents-prefs-status-approve').children('span').css({'background-color':'transparent', 'font-weight' : 'bold'});
        $('#documents-prefs-status-draft').children('span').css({'background-color':'rgba(0, 0, 0, 0.26)', 'font-weight' : 'initial'});
        $('#documents-prefs-status-proofread').children('span').css({'background-color':'rgba(0, 0, 0, 0.26)', 'font-weight' : 'initial'});
        $('#documents-prefs-status-review').children('span').css({'background-color':'rgba(0, 0, 0, 0.26)', 'font-weight' : 'initial'});
        $('#documents-prefs-status-postapprove').children('span').css({'background-color':'rgba(0, 0, 0, 0.26)', 'font-weight' : 'initial'});

        $('#documents-prefs-status-draft').children('i').addClass('fa-check-square').removeClass('fa-spinner');
        $('#documents-prefs-status-proofread').children('i').addClass('fa-check-square').removeClass('fa-spinner');
        $('#documents-prefs-status-review').children('i').addClass('fa-check-square').removeClass('fa-spinner');
        $('#documents-prefs-status-approve').children('i').addClass('fa-check-square').removeClass('fa-spinner');
        $('#documents-prefs-status-postapprove').children('i').removeClass('fa-check-square').addClass('fa-spinner');
    }else if(status == 'postapprove'){
        $('#documents-prefs-edits-docflow').hide();
        $('.documents-prefs-status-handlers').show();

        $('#documents-prefs-status-postapprove').children('span').css({'background-color':'transparent', 'font-weight' : 'bold'});
        $('#documents-prefs-status-draft').children('span').css({'background-color':'rgba(0, 0, 0, 0.26)', 'font-weight' : 'initial'});
        $('#documents-prefs-status-proofread').children('span').css({'background-color':'rgba(0, 0, 0, 0.26)', 'font-weight' : 'initial'});
        $('#documents-prefs-status-review').children('span').css({'background-color':'rgba(0, 0, 0, 0.26)', 'font-weight' : 'initial'});
        $('#documents-prefs-status-approve').children('span').css({'background-color':'rgba(0, 0, 0, 0.26)', 'font-weight' : 'initial'});

        $('#documents-prefs-status-draft').children('i').addClass('fa-check-square').removeClass('fa-spinner');
        $('#documents-prefs-status-proofread').children('i').addClass('fa-check-square').removeClass('fa-spinner');
        $('#documents-prefs-status-review').children('i').addClass('fa-check-square').removeClass('fa-spinner');
        $('#documents-prefs-status-approve').children('i').addClass('fa-check-square').removeClass('fa-spinner');
        $('#documents-prefs-status-postapprove').children('i').addClass('fa-check-square').removeClass('fa-spinner');
    }
    
    if($(this).attr('draftstamp') != '' && $(this).attr('draftstamp') != null && $(this).attr('draftstamp') != 'null'){
        const when = dateFns.distanceInWordsToNow(
            Date.parse($(this).attr('draftstamp')),
            {
                addSuffix: true
            }
        );
        const date = dateFns.format(
            Date.parse($(this).attr('draftstamp')),
            'MMMM D, YYYY'
        );
        $('.documents-prefs-status-timestamp').append(`
            <span class="documents-prefs-status-timestamp-widget" style="color: ${FONT_COLOR}"><b>Draft: </b>${date} : ${when} </span>
        `);
    }
    if($(this).attr('proofreadstamp') != '' && $(this).attr('proofreadstamp') != null && $(this).attr('proofreadstamp') != 'null'){
        const when = dateFns.distanceInWordsToNow(
            Date.parse($(this).attr('proofreadstamp')),
            {
                addSuffix: true
            }
        );
        const date = dateFns.format(
            Date.parse($(this).attr('proofreadstamp')),
            'MMMM D, YYYY'
        );
        $('.documents-prefs-status-timestamp').append(`
            <span class="documents-prefs-status-timestamp-widget" style="color: ${FONT_COLOR}"><b>Proofread: </b>${date} : ${when} </span>
        `);
    }
    if($(this).attr('reviewstamp') != '' && $(this).attr('reviewstamp') != null && $(this).attr('reviewstamp') != 'null'){
        const when = dateFns.distanceInWordsToNow(
            Date.parse($(this).attr('reviewstamp')),
            {
                addSuffix: true
            }
        );
        const date = dateFns.format(
            Date.parse($(this).attr('reviewstamp')),
            'MMMM D, YYYY'
        );
        $('.documents-prefs-status-timestamp').append(`
            <span class="documents-prefs-status-timestamp-widget" style="color: ${FONT_COLOR}"><b>Review: </b>${date} : ${when} </span>
        `);
    }
    if($(this).attr('approvestamp') != '' && $(this).attr('approvestamp') != null && $(this).attr('approvestamp') != 'null'){
        // console.log( $(this).attr('approvestamp') );
        const when = dateFns.distanceInWordsToNow(
            Date.parse($(this).attr('approvestamp')),
            {
                addSuffix: true
            }
        );
        const date = dateFns.format(
            Date.parse($(this).attr('approvestamp')),
            'MMMM D, YYYY'
        );
        $('.documents-prefs-status-timestamp').append(`
            <span class="documents-prefs-status-timestamp-widget" style="color: ${FONT_COLOR}"><b>Approve: </b>${date} : ${when} </span>
        `);
    }
    if($(this).attr('postapprovestamp') != '' && $(this).attr('postapprovestamp') != null && $(this).attr('postapprovestamp') != 'null'){
        const when = dateFns.distanceInWordsToNow(
            Date.parse($(this).attr('postapprovestamp')),
            {
                addSuffix: true
            }
        );
        const date = dateFns.format(
            Date.parse($(this).attr('postapprovestamp')),
            'MMMM D, YYYY'
        );
        $('.documents-prefs-status-timestamp').append(`
            <span class="documents-prefs-status-timestamp-widget" style="color: ${FONT_COLOR}"><b>Post Approve: </b>${date} : ${when} </span>
        `);
    }
    // console.log($(this).attr('approvestamp'));

    $('.documents-prefs-status-doctitle').text($(this).attr('title') + " v" +  $(this).attr('version'));

    api_fetchDocumentConnect($(this).attr('docid'), __COMPANY_ID, '.documents-list-widget');

    $('.documents-prefs-status-header').attr({
        'uid' : uid,
        'docid' : docid,
        'ownerid' : ownerid,
        'docsuff' : docsuff,
        'cat1' : cat1,
        'cat2' : cat2,
        'cat3' : cat3,
        'cat4' : cat4,
        'title' : title,
        'version' : version,
        'reference' : reference
    });


});

// DOCUMENT EDIT PREFS EVENTS
$('#documents-prefs-edits-checkout').click(function(e){
    $('#documents-prefs-edits-download')[0].click();
});
$('#documents-prefs-edits-docflow').click(function(){
    const docid = $('.documents-prefs-status-docid').attr('docid');
    const zstatus = 'draft';
    console.log(docid, zstatus);
    selDocRole = 'proofread';
    const cb = ()=>{
        console.log('updated');
        $('#documents-prefs-edits-docflow').hide();
        $('.documents-prefs-status-handlers').show();

        $('#documents-prefs-status-proofread').children('span').css({'background-color':'transparent', 'font-weight' : 'bold'});
        $('#documents-prefs-status-draft').children('span').css({'background-color':'rgba(0, 0, 0, 0.26)', 'font-weight' : 'initial'});
        $('#documents-prefs-status-review').children('span').css({'background-color':'rgba(0, 0, 0, 0.26)', 'font-weight' : 'initial'});
        $('#documents-prefs-status-approve').children('span').css({'background-color':'rgba(0, 0, 0, 0.26)', 'font-weight' : 'initial'});

        $('#documents-prefs-status-draft').children('i').addClass('fa-check-square').removeClass('fa-spinner');
        $('#documents-prefs-status-proofread').children('i').addClass('fa-check-square').removeClass('fa-spinner');
        $('#documents-prefs-status-review').children('i').removeClass('fa-check-square').addClass('fa-spinner');
        $('#documents-prefs-status-approve').children('i').removeClass('fa-check-square').addClass('fa-spinner');
        api_fetchDocumentConnect( docid, __COMPANY_ID, '.documents-list-widget');
        $('.documents-list-widget-con').children('.documents-list-widget').each(function(){
            const zdocid = $(this).attr('docid');
            if(zdocid == docid){
                $(this).attr('status','proofread');
            }
        });
    }
    api_updateDocumentStatus(docid, zstatus, cb);
});
$('#documents-prefs-edits-properties').click(function(){
    const uid = $('.documents-prefs-status-header').attr('uid');
    const docid = $('.documents-prefs-status-header').attr('docid');
    const ownerid = $('.documents-prefs-status-header').attr('ownerid');

    const docsuff =  $('.documents-prefs-status-header').attr('docsuff');
    const cat1 =  $('.documents-prefs-status-header').attr('cat1');
    const cat2 =  $('.documents-prefs-status-header').attr('cat2');
    const cat3 =  $('.documents-prefs-status-header').attr('cat3');
    const cat4 =  $('.documents-prefs-status-header').attr('cat4');
    const title =  $('.documents-prefs-status-header').attr('title');
    const version =  $('.documents-prefs-status-header').attr('version');
    let reference =  $('.documents-prefs-status-header').attr('reference');
    
    $('.documents-edit-header-con').attr({
        'uid' : uid,
        'docid' : docid,
        'ownerid' : ownerid,
        'docsuff' : docsuff,
        'cat1' : cat1,
        'cat2' : cat2,
        'cat3' : cat3,
        'cat4' : cat4,
        'title' : title,
        'version' : version,
        'reference' : reference
    });
    
    $('.documents-edit-showid').text(uid);
    $('.documents-edit-version').text('version ' + version);
    $('#documents-edit-title').val(title);

    if(reference == 'na'){
        reference = '';
    }
    $('#documents-edit-reference').val(reference);

    //fill up categories first
    const cb = () => {
        // console.log('Category Fetch OK');
        $('#documents-edit-cat1').val(cat1);
        $('#documents-edit-cat2').val(cat2);
        $('#documents-edit-cat3').val(cat3);
        $('#documents-edit-cat4').val(cat4);
    };
    api_fetchDocumentCategory(__COMPANY_ID, 'documents-prefs-edits-properties', cb);
    
    $('.documents-edit-connect-title').children('i.hide').click();
    $('.documents-edit-coowner-title').children('i.hide').click();
    // $('documents-prefs-edits-properties-tab').show();
    $('.documents-edit').css('display', 'flex').show();
    $('.dashboard-con').hide();
});
$('.dashboard-con-documents-edit-close').click(function(){
    $('.documents-edit').hide();
    $('.dashboard-con').show();
    $('.documents-prefs').hide();
});


// DOCUMENT EDIT PROPERTIES EVENTS
const documents_edit_dragoption = {
    start: function(e, ui) {
        // this function fires when you start dragging
        const id = $(ui.helper).attr('accid');
        $(ui.helper).css('max-width','300px');
        let draftGate = true;
        let proofreadGate = true;
        let reviewGate = true;
        let approveGate = true;
        let postapproveGate = true;

        for(i=0; i<documentEditDraftList.length; i++){
            if(documentEditDraftList[i] == id){
                draftGate = false;
            }
        }
        for(i=0; i<documentEditProofreadList.length; i++){
            // console.log(documentEditProofreadList[i] );
            if(documentEditProofreadList[i] == id){
                proofreadGate = false;
            }
        }
        for(i=0; i<documentEditReviewList.length; i++){
            if(documentEditReviewList[i] == id){
                reviewGate = false;
            }
        }
        for(i=0; i<documentEditApproveList.length; i++){
            if(documentEditApproveList[i] == id){
                approveGate = false;
            }
        }
        for(i=0; i<documentEditPostApproveList.length; i++){
            if(documentEditPostApproveList[i] == id){
                postapproveGate = false;
            }
        }

        if(draftGate){
            $('#documents-edit-director-widget-draft').css('background-color', GREEN_PALETTE);
        }else{
            $('#documents-edit-director-widget-draft').css('background-color', YELLOW_PALETTE);
        }
        if(proofreadGate){
            $('#documents-edit-director-widget-proofread').css('background-color', GREEN_PALETTE);
        }else{
            $('#documents-edit-director-widget-proofread').css('background-color', YELLOW_PALETTE);
        }
        if(reviewGate){
            $('#documents-edit-director-widget-review').css('background-color', GREEN_PALETTE);
        }else{
            $('#documents-edit-director-widget-review').css('background-color', YELLOW_PALETTE);
        }
        if(approveGate){
            $('#documents-edit-director-widget-approve').css('background-color', GREEN_PALETTE);
        }else{
            $('#documents-edit-director-widget-approve').css('background-color', YELLOW_PALETTE);
        }
        if(postapproveGate){
            $('#documents-edit-director-widget-postapprove').css('background-color', GREEN_PALETTE);
        }else{
            $('#documents-edit-director-widget-postapprove').css('background-color', YELLOW_PALETTE);
        }
        
        
    },
    drag: function() {
    //   this function fires after you drag and while dragging
    },
    stop: function() {
    // this function fires when you stop dragging or if you dropped it
        $('.documents-edit-director-widget-list-con').css('background-color', SUB_COLOR);


    // and here in stop you can color your droppable div into its original state
    },
    opacity: 0.7, // opacity of the draggable
    helper: "clone", // will not drag the actual element. instead will send a clone
    // containment: ".documents-edit", // here is where the draggable can stay. if you put "body" then it can go around the whole page
                                       // but if you put "#sampleid" then it will contain the draggable within the range of the div with the id of 'sampleid'
    scroll: false,  // prevents scrolling
    cursorAt: { bottom: 0, left: 150}, // puts cursor at center bottom || remove left option to just simply put it in bottom
    revert: "invalid" // draggable will fall back to its place
};
$('.documents-edit-connect-show').click(function(){
    // console.log('start');
    const cbcomplete = () => {
        const docid = $('.documents-prefs-status-header').attr('docid');
        const cbcomplete1 = () => {
            // console.log('end');
            $(this).hide();
            $('.documents-edit-connect-con').css('display', 'flex').show();
            $(this).siblings('.documents-edit-connect-title').children('i.hide').show();
        };
        // console.log(docid, __COMPANY_ID);
        api_fetchDocumentConnect(docid, __COMPANY_ID, 'documents-edit-connect-show', cbcomplete1);
    };
    api_fetchAccount(__COMPANY_ID, 'na', 'documents-edit-connect-show', documents_edit_dragoption, cbcomplete);
});
$('.documents-edit-connect-title').children('i.hide').click(function(){
    $(this).hide();
    $(this).parent('.documents-edit-connect-title').siblings('.documents-edit-connect-show').show();
    $('.documents-edit-connect-con').hide();
});
$('.documents-edit-director-widget-list-con').droppable({
    accept: ".documents-edit-connect-list-widget", // this will determine which elements are accepted to drop in this case all element with the class of moduleman-module-list-widget will drop
    drop: function( event, ui ) {
        // $(this).css('background-color', 'red');
        // console.log(ui.helper.id);
        let id = $(ui.draggable).attr('accid'); // same with the draggable. if you use this code, you can access the draggable element thats being dropped 
        let firstname = $(ui.draggable).attr('fn');
        let lastname = $(ui.draggable).attr('fn');
        let email = $(ui.draggable).attr('em');
        let connectType = $(this).attr('id');
        const docid = $('.documents-prefs-status-header').attr('docid');
        const xx = connectType.split('-').pop();

        console.log('id: ', id, docid, firstname, lastname, email, xx);

        const prColor = $('#documents-edit-director-widget-proofread').css('background-color');
        const rvColor = $('#documents-edit-director-widget-review').css('background-color');
        const apColor = $('#documents-edit-director-widget-approve').css('background-color');
        const drColor = $('#documents-edit-director-widget-draft').css('background-color');
        const paColor = $('#documents-edit-director-widget-postapprove').css('background-color');

        

        if(xx == 'draft'){
            if(rgb2hex(drColor).toUpperCase() == YELLOW_PALETTE){
                showNotification('Document Connect','The Account You are trying to add is already added');
            }else{
                // console.log(id, docid, __COMPANY_ID, 'draft');
                $('#documents-edit-director-widget-draft').append(`
                    <div accid="${id}" class="documents-edit-director-widget-list btn-shadow">
                        <span class="documents-edit-director-widget-list-name">${firstname} ${lastname}</span>
                        <span class="documents-edit-director-widget-list-id">${id}</span>
                        <i class="documents-edit-director-widget-list-remove fas fa-trash"></i>
                    </div>
                `);
                documentEditDraftList[documentEditDraftList.length] = id;
                // console.log(id, selid, __COMPANY_ID, 'proofread');
                api_createDocumentConnect(id, docid, __COMPANY_ID, 'draft');
            }
        }else if(xx == 'proofread'){
            if(rgb2hex(prColor).toUpperCase() == YELLOW_PALETTE){
                showNotification('Document Connect','The Account You are trying to add is already added');
            }else{
                $('#documents-edit-director-widget-proofread').append(`
                    <div accid="${id}" class="documents-edit-director-widget-list btn-shadow">
                        <span class="documents-edit-director-widget-list-name">${firstname} ${lastname}</span>
                        <span class="documents-edit-director-widget-list-id">${id}</span>
                        <i class="documents-edit-director-widget-list-remove fas fa-trash"></i>
                    </div>
                `);
                documentEditProofreadList[documentEditProofreadList.length] = id;
                // console.log(id, selid, __COMPANY_ID, 'proofread');
                api_createDocumentConnect(id, docid, __COMPANY_ID, 'proofread');
            }
        }else if(xx == 'review'){
            // console.log('review');
            if(rgb2hex(rvColor).toUpperCase() == YELLOW_PALETTE){
                showNotification('Document Connect','The Account You are trying to add is already added');
            }else{
                $('#documents-edit-director-widget-review').append(`
                    <div accid="${id}" class="documents-edit-director-widget-list btn-shadow">
                        <span class="documents-edit-director-widget-list-name">${firstname} ${lastname}</span>
                        <span class="documents-edit-director-widget-list-id">${id}</span>
                        <i class="documents-edit-director-widget-list-remove fas fa-trash"></i>
                    </div>
                `);
                documentEditReviewList[documentEditReviewList.length] = id;
                // console.log(id, selid, __COMPANY_ID, 'proofread');
                api_createDocumentConnect(id, docid, __COMPANY_ID, 'review');
            }
        }else if(xx == 'approve'){
            // console.log('approve');
            if(rgb2hex(apColor).toUpperCase() == YELLOW_PALETTE){
                showNotification('Document Connect','The Account You are trying to add is already added');
            }else{
                $('#documents-edit-director-widget-approve').append(`
                    <div accid="${id}" class="documents-edit-director-widget-list btn-shadow">
                        <span class="documents-edit-director-widget-list-name">${firstname} ${lastname}</span>
                        <span class="documents-edit-director-widget-list-id">${id}</span>
                        <i class="documents-edit-director-widget-list-remove fas fa-trash"></i>
                    </div>
                `);
                documentEditApproveList[documentEditApproveList.length] = id;
                // console.log(id, selid, __COMPANY_ID, 'proofread');
                api_createDocumentConnect(id, docid, __COMPANY_ID, 'approve');
            }
        }else if(xx == 'postapprove'){
            // console.log('postapprove');
            if(rgb2hex(paColor).toUpperCase() == YELLOW_PALETTE){
                showNotification('Document Connect','The Account You are trying to add is already added');
            }else{
                $('#documents-edit-director-widget-postapprove').append(`
                    <div accid="${id}" class="documents-edit-director-widget-list btn-shadow">
                        <span class="documents-edit-director-widget-list-name">${firstname} ${lastname}</span>
                        <span class="documents-edit-director-widget-list-id">${id}</span>
                        <i class="documents-edit-director-widget-list-remove fas fa-trash"></i>
                    </div>
                `);
                documentEditPostApproveList[documentEditPostApproveList.length] = id;
                // console.log(id, selid, __COMPANY_ID, 'proofread');
                api_createDocumentConnect(id, docid, __COMPANY_ID, 'postapprove');
            }
        }

        // ADD to tbl_document_connect
    }
});
$(document).on('click', '.documents-edit-director-widget-list-remove', function(){
    const accid = $(this).siblings('.documents-edit-director-widget-list-id').text();
    const docid = $('.documents-prefs-status-header').attr('docid');
    const role = $(this).parent('.documents-edit-director-widget-list').parent('.documents-edit-director-widget-list-con').attr('id').split('-').pop();
    console.log(accid, docid, role)

    api_deleteDocumentConnect(accid, docid, role);
    showNotification('Document Connect', 'SUccessfuly Deleted Account Connection to Document');
    $(this).parent('.documents-edit-director-widget-list').remove();
    
    if(role == 'draft'){
        documentEditDraftList = $.grep(documentEditDraftList, function(value) {
            return value != accid;
        });
    }else if(role == 'proofread'){
        documentEditProofreadList = $.grep(documentEditProofreadList, function(value) {
            return value != accid;
        });
    }else if(role == 'review'){
        documentEditReviewList = $.grep(documentEditReviewList, function(value) {
            return value != accid;
        });
    }else if(role == 'approve'){
        documentEditApproveList = $.grep(documentEditApproveList, function(value) {
            return value != accid;
        });
    }else if(role == 'postapprove'){
        documentEditPostApproveList = $.grep(documentEditApproveList, function(value) {
            return value != accid;
        });
    }
});


const documents_edit_coowner_dragoption = {
    start: function(e, ui) {
        // this function fires when you start dragging
        const id = $(ui.helper).attr('accid');
        console.log(id);
        $(ui.helper).css('max-width','300px');
        $(ui.helper).css('z-index','1000');

        // let draftGate = true;
        // let proofreadGate = true;
        // let reviewGate = true;
        // let approveGate = true;
        // let postapproveGate = true;

        // for(i=0; i<createUploadDraftList.length; i++){
        //     if(createUploadDraftList[i] == id){
        //         draftGate = false;
        //     }
        // }
        // for(i=0; i<createUploadProofreadList.length; i++){
        //     // console.log(createUploadProofreadList[i] );
        //     if(createUploadProofreadList[i] == id){
        //         proofreadGate = false;
        //     }
        // }
        // for(i=0; i<createUploadReviewList.length; i++){
        //     if(createUploadReviewList[i] == id){
        //         reviewGate = false;
        //     }
        // }
        // for(i=0; i<createUploadApproveList.length; i++){
        //     if(createUploadApproveList[i] == id){
        //         approveGate = false;
        //     }
        // }
        // for(i=0; i<createUploadPostApproveList.length; i++){
        //     if(createUploadPostApproveList[i] == id){
        //         postapproveGate = false;
        //     }
        // }

        // if(draftGate){
        //     $('#connectList-draft').css('background-color', GREEN_PALETTE);
        // }else{
        //     $('#connectList-draft').css('background-color', YELLOW_PALETTE);
        // }
        // if(proofreadGate){
        //     $('#connectList-proofread').css('background-color', GREEN_PALETTE);
        // }else{
        //     $('#connectList-proofread').css('background-color', YELLOW_PALETTE);
        // }
        // if(reviewGate){
        //     $('#connectList-review').css('background-color', GREEN_PALETTE);
        // }else{
        //     $('#connectList-review').css('background-color', YELLOW_PALETTE);
        // }
        // if(approveGate){
        //     $('#connectList-approve').css('background-color', GREEN_PALETTE);
        // }else{
        //     $('#connectList-approve').css('background-color', YELLOW_PALETTE);
        // }
        // if(postapproveGate){
        //     $('#connectList-postapprove').css('background-color', GREEN_PALETTE);
        // }else{
        //     $('#connectList-postapprove').css('background-color', YELLOW_PALETTE);
        // }
    },
    drag: function() {
    //   this function fires after you drag and while dragging
    },
    stop: function() {
    // this function fires when you stop dragging or if you dropped it
        // $('.create-upload-con3-connectList-widget').css('background-color', SUB_COLOR);
    // and here in stop you can color your droppable div into its original state
    },
    opacity: 0.7, // opacity of the draggable
    helper: "clone", // will not drag the actual element. instead will send a clone
    // containment: ".documents-edit", // here is where the draggable can stay. if you put "body" then it can go around the whole page
                                       // but if you put "#sampleid" then it will contain the draggable within the range of the div with the id of 'sampleid'
    scroll: false,  // prevents scrolling
    cursorAt: { bottom: 0, left: 150}, // puts cursor at center bottom || remove left option to just simply put it in bottom
    revert: "invalid" // draggable will fall back to its place
};
$('.documents-edit-coowner-show').click(function(){
    // console.log('start');
    const cbcomplete = () => {
        $(this).hide();
        $('.documents-edit-coowner-con').css('display', 'flex').show();
        $(this).siblings('.documents-edit-coowner-title').children('i.hide').show();
        // console.log('end');
    };
    api_fetchAccount(__COMPANY_ID, 'na', 'documents-edit-coowner-show', documents_edit_coowner_dragoption, cbcomplete);
});
$('.documents-edit-coowner-title').children('i.hide').click(function(){
    $(this).hide();
    $(this).parent('.documents-edit-coowner-title').siblings('.documents-edit-coowner-show').show();
    $('.documents-edit-coowner-con').hide();
});

$('#documents-edit-title-submit').click(function(){
    const docid = $('.documents-edit-header-con').attr('docid');
    const oldtitle = $('.documents-edit-header-con').attr('title');
    const columnname = 'title';
    const value = $('#documents-edit-title').val();
    console.log(docid, oldtitle, value);
    if(oldtitle == value){
        blinkbg($('#documents-edit-title'), RED_PALETTE, 'white');
    }else{
        const cbcomplete = () => {
            showNotification('Document Update', 'Updated Document Title Successfuly');
            $('.documents-edit-header-con').attr('title', value);
        };
        api_updateDocumentColumn(docid, columnname, value, cbcomplete);
    }
});
$('#documents-edit-reference-submit').click(function(){
    const docid = $('.documents-edit-header-con').attr('docid');
    const oldreference = $('.documents-edit-header-con').attr('reference');
    const columnname = 'reference';
    const value = $('#documents-edit-reference').val();
    console.log(docid, oldreference, value);
    if(oldreference == value){
        blinkbg($('#documents-edit-reference'), RED_PALETTE, 'white');
    }else{
        const cbcomplete = () => {
            showNotification('Document Update', 'Updated Document Reference Successfuly');
            $('.documents-edit-header-con').attr('reference', value);
        };
        api_updateDocumentColumn(docid, columnname, value, cbcomplete);
    }
});
$('#documents-edit-category-submit').click(function(){
    const docid = $('.documents-edit-header-con').attr('docid');
    const oldcat1 = $('.documents-edit-header-con').attr('cat1');
    const oldcat2 = $('.documents-edit-header-con').attr('cat2');
    const oldcat3 = $('.documents-edit-header-con').attr('cat3');
    const oldcat4 = $('.documents-edit-header-con').attr('cat4');
    const cat1 = $('#documents-edit-cat1').val();
    const cat2 = $('#documents-edit-cat2').val();
    const cat3 = $('#documents-edit-cat3').val();
    const cat4 = $('#documents-edit-cat4').val();

    console.log(docid, cat1, cat2, cat3, cat4);

    if(oldcat1 == cat1 && oldcat2 == cat2 && oldcat3 == cat3 && oldcat4 == cat4){
        showNotification('Document Update', 'No Changes Have Been Made.');
    }
    if(oldcat1 != cat1 || oldcat2 != cat2 || oldcat3 != cat3 || oldcat4 != cat4){
        const cbcomplete = () => {
            showNotification('Document Update', 'Updated Document Category Successfuly.');
            $('.documents-edit-header-con').attr('cat1', cat1);
            $('.documents-edit-header-con').attr('cat2', cat2);
            $('.documents-edit-header-con').attr('cat3', cat3);
            $('.documents-edit-header-con').attr('cat4', cat4);
            const docsuff = $('.documents-edit-header-con').attr('docsuff');
            const x = docsuff.split('-').pop();
            const uid = `D-${cat1}${cat2}${cat3}${cat4}${x}`;
            $('.documents-edit-header-con').attr('uid', uid);
            $('.documents-edit-showid').text(uid);
        };
        api_updateDocumentCategory(docid, cat1, cat2, cat3, cat4, cbcomplete);
    }

});
$('.documents-prefs-close').click(function(){
    $('.documents-prefs').hide();
});





$(document).ready(function(){
    // this $(document).ready(); function runs after browser loads all html elements
    // it fires everytime you refresh the page. hence it runs when you first land on the page

    minimizeNav();
    const cb1 = data => {
        // console.log(data.ID);
        // all these variables are from defaults.js
        // variables are getting the data from the api call api_checkIfLoggedIn() which is from api_login.js
        // this function runs on success api call.
        __ID = data.ID;
        __USER_LEVEL =data.USER_LEVEL;
        __PASSWORD = data.PASSWORD;
        __PHOTO = data.PHOTO;
        __FIRST_NAME = data.FIRST_NAME;
        __COMPANY_ID = data.COMPANY_ID;
        __COMPANY_NAME = data.COMPANY_NAME;
        __COMPANY_LOGO = data.COMPANY_LOGO;
    };
    const cb2 = () => {
        // this function runs after api call is completed, right after success is called.
        // i mainly use this function to set the front end stuff. 
        hideAllNav(conList);
        // getAccountModules(__USER_LEVEL, __ID);
        // fillProfile(__PHOTO, __FIRST_NAME);
        fillCompany(__COMPANY_LOGO, __COMPANY_NAME);
        getAccountModules(__USER_LEVEL, __ID);

        $('#header-tab-module-name').text('Doc Flow');
        if( __USER_LEVEL != '' || __USER_LEVEL == null || __USER_LEVEL == undefined){
            if(__USER_LEVEL == '3'){
                // showAllNav(nav_usrconList);
                // $('.dashboard-user-con').show();
            }else if(__USER_LEVEL == '2'){
                // showAllNav(nav_supconList);
                // $('.dashboard-superuser-con').show();
            }else if(__USER_LEVEL == '1'){
                // showAllNav(nav_ceoconList);
                // $('.dashboard-admin-con').show();
            }else if(__USER_LEVEL == '0'){
                // showAllNav(nav_vipconList);
                // $('.dashboard-superadmin-con').show();
                // $('.moduleman-con').show();
            }
        }
    
        // showHeaderTab('docflow-dashboard-con');

        // showHeaderTab('document-handle-con');
        // $('.document-prefs-con').show();

        $('#nav-dashboard').click();
        
        // $('.bank-con').show();

        // $('.document-handle-con').show();
        // $('.docflowbrowse-prefs').show();
     
    };
    api_checkIfLoggedIn(cb1, cb2);
    // api_fetchAvailableDocumentMap(__COMPANY_ID, 'sender');
});
function init(){
    // api_fetchDocumentConnectByAccid(__ID, __COMPANY_ID, 'ready'); DEPRECATED
    api_fetchDocumentHistoryByAccid(__ID, 'docflowready');

    ACCUSER = new User({"id" : __ID, "companyid" : __COMPANY_ID});
    // ACCUSER.Supplier = new SupplierList();
    // SUPPLIER_LIST.fetch(()=>{});

    
    AlertWorker();
    const cb=()=>{
        // ACCUSER.checkList('ProjectGroup',()=>{});
        setTimeout(() => {
            const cb=data=>{
                setTimeout(() => {
                    // const cb=data=>{
                        console.log(data);
                        ACCUSER.Alert.fill();
                        alertHandleRedirect();
                        $('#nav-dashboard').click();
                        fillProfile();
                }, 0);
            }
            ACCUSER.checkList('Alert', cb);
        }, 0);
    };
    ACCUSER.checkList('COMPANY_ACCOUNTS', cb);

    

    // const result = dateFns.formatDistanceStrict(new Date(2016, 0, 1), new Date(2015, 0, 1), {
    //     unit: 'day'
    // });

    // const when = dateFns.distanceInWordsStrict(
    //     new Date(),
    //     new Date(2020, 8, 15),
    //     {
    //         addSuffix: true,
    //         unit: 'd'
    //     }
    // )
    // console.log(result);

    // const url = 'lib/documents/projectinfo/1596642326.pdf';
    // const cbsuccess = data => {
    //     console.log(data.uploaddocumentbank);
    // };
    // ajax_uploadDocumentBank(url, __ID, cbsuccess);

    // api_createDocumentBank( 'adocid', 'comid', 'projectid', 'ownerid', '0', '0', '0', '0', 'title', 'zurl', 'version', 'reference');

    // const cbsuccess3 = data => {
    //     console.log(data);
    // };
    // const newid = 'D-000000001';
    // const oldid = 'D-650067414';
    // api_updateDocidToEffectiveId(oldid, newid, cbsuccess3);
}

