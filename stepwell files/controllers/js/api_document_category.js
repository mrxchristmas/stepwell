let apiUrl_document_category = `api/api_document_category.php`;

// console.log('api_document_category loaded');
let selCat = '';

function api_createDocumentCategory(id, companyid, name, ordernum, catnum){
    let url = domain + apiUrl_document_category;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'createdocumentcategory',
            'id' : id,
            'companyid' : companyid,
            'name' : name,
            'ordernum' : ordernum,
            'catnum' : catnum
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Creating Document Category.. Please Wait');
        },
        success: function(data){
            console.log('api_createDocumentCategory', data);
            hideLoadingReport();
        }
    });
}
function api_removeDocumentCategory(id,cb=()=>{}){
    let url = domain + apiUrl_document_category;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'removedocumentcategory',
            'id' : id
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Document Category.. Please Wait');
        },
        success: function(data){
            console.log('api_removeDocumentCategory', data);
        },
        complete: function(){
            cb();
            hideLoadingReport();
        }
    });
}
function api_fetchDocumentCategory(companyid, sender, cb=()=>{}){
    let url = domain + apiUrl_document_category;
    // console.log(url);
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'fetchdocumentcategory',
            'companyid' : companyid
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Deleting Document Category.. Please Wait');
        },
        success: function(data){
            // console.log('api_removeDocumentCategory', data);
            fetchDocumentCategory(data, sender);
            hideLoadingReport();
        },
        complete: function(){
            cb();
        }
    });
}
function api_updateDocumentCategoryName(id, name, cb=()=>{}){
    let url = domain + apiUrl_document_category;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'updatedocumentcategoryname',
            'id' : id,
            'name' : name
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Updating Document Category.. Please Wait');
        },
        success: function(data){
            console.log('updatedocumentcategoryname', data);
        },
        complete: function(){
            cb();
            hideLoadingReport();
        }
    });
}
function api_deleteDocumentCategoryTest(category, ordernum, cb){
    let url = domain + apiUrl_document_category;
    $.ajax({
        async: false,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'deletedocumentcategorytest',
            'category' : category,
            'ordernum' : ordernum
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Performing Category Delete Test.. Please Wait');
        },
        success: function(data){
            cb(data);
        },
        complete: function(){
            hideLoadingReport();
        }
    });
}


function fetchDocumentCategory(data, sender){
    // console.log('api_removeDocumentCategory', data, sender);
    if(sender == 'ready'){
        $('.define-con1-widget-con, .define-con2-widget-con, .define-con3-widget-con, .define-con4-widget-con').empty();
        doc_catnum1 = {};
        doc_catnum2 = {};
        doc_catnum3 = {};
        doc_catnum4 = {};
        $.each(data, function(key, value){
            if(value != 'error'){
                // console.log(value.id, value.name, value.ordernum, value.catnum);
                $(`.define-con${value.catnum}-widget-con`).append(`<span id="${value.id}" ord="${value.ordernum}" cat="${value.catnum}" name="${value.name}" class="define-con-widget btn-shadow" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};" >${value.ordernum} - ${value.name}<i class="fas fa-trash define-con-widget-delete"></i></span>`);
                if(value.catnum == 1){
                    doc_catnum1[value.ordernum] = {'id' : value.id, 'name' : value.name, 'ordernum' : value.ordernum, 'catnum' : value.catnum};
                }else if(value.catnum == 2){
                    doc_catnum2[value.ordernum] = {'id' : value.id, 'name' : value.name, 'ordernum' : value.ordernum, 'catnum' : value.catnum};
                }else if(value.catnum == 3){
                    doc_catnum3[value.ordernum] = {'id' : value.id, 'name' : value.name, 'ordernum' : value.ordernum, 'catnum' : value.catnum};
                }else if(value.catnum == 4){
                    doc_catnum4[value.ordernum] = {'id' : value.id, 'name' : value.name, 'ordernum' : value.ordernum, 'catnum' : value.catnum};
                }
            }else{
                // alert('You have not set up your positions. Please add positions first before creating new users.');
                showNotification('Fetch Error', 'There was a problem Fetching the Document Category.');
            }
        });
        // console.log(doc_catnum2[1]);
    }
    if(sender == 'cidSystem'){
        $.each(data, function(key, value){
            if(value != 'error'){
                // console.log(value.id, value.name, value.ordernum, value.catnum);
                defineDocCategoryList[defineDocCategoryList.length] = {
                    'catnum' : value.catnum,
                    'ordernum' : value.ordernum,
                    'name' : value.name,
                    'id' : value.id
                };
            }else{
                showNotification('Fetch Error', 'There was a problem Fetching the Document Category.');
            }
        });
    }
    if(sender == 'docbuilderbrowse'){
        $('#create-upload-cat1, #create-upload-cat2, #create-upload-cat3, #create-upload-cat4').empty();
        doc_catnum1 = {};
        doc_catnum2 = {};
        doc_catnum3 = {};
        doc_catnum4 = {};
        $(`#create-upload-cat1, #create-upload-cat2, #create-upload-cat3, #create-upload-cat4`).append(`<option id="na" value="0" >Select Option</option>`);
        $.each(data, function(key, value){
            if(value != 'error'){
                // console.log(value.id, value.name, value.ordernum, value.catnum);
                $(`#create-upload-cat${value.catnum}`).append(`<option id="${value.id}" ordernum="${value.ordernum}" value="${value.ordernum}" catnum="${value.catnum}" name="${value.name}" >${value.ordernum} - ${value.name}</option>`);
                if(value.catnum == 1){
                    doc_catnum1[value.ordernum] = {'id' : value.id, 'name' : value.name, 'ordernum' : value.ordernum, 'catnum' : value.catnum};
                }else if(value.catnum == 2){
                    doc_catnum2[value.ordernum] = {'id' : value.id, 'name' : value.name, 'ordernum' : value.ordernum, 'catnum' : value.catnum};
                }else if(value.catnum == 3){
                    doc_catnum3[value.ordernum] = {'id' : value.id, 'name' : value.name, 'ordernum' : value.ordernum, 'catnum' : value.catnum};
                }else if(value.catnum == 4){
                    doc_catnum4[value.ordernum] = {'id' : value.id, 'name' : value.name, 'ordernum' : value.ordernum, 'catnum' : value.catnum};
                }
            }else{
                // alert('You have not set up your positions. Please add positions first before creating new users.');
                showNotification('Fetch Error', 'There was a problem Fetching the Document Category.');
            }
        });
        // console.log(doc_catnum2[1]);
    }
    if(sender == 'nav-documents'){
        $(`#documents-header-category-select1, #documents-header-category-select2, #documents-header-category-select3, #documents-header-category-select4`).empty();
        $(`#documents-header-category-select1, #documents-header-category-select2, #documents-header-category-select3, #documents-header-category-select4`).append(`<option id="na" value="0" >Select Option</option>`);
        $.each(data, function(key, value){
            if(value != 'error'){
                // console.log(value.id, value.name, value.ordernum, value.catnum);
                $(`#documents-header-category-select${value.catnum}`).append(`<option id="${value.id}" ordernum="${value.ordernum}" value="${value.ordernum}" catnum="${value.catnum}" name="${value.name}" >${value.ordernum} - ${value.name}</option>`);
            }else{
                // alert('You have not set up your positions. Please add positions first before creating new users.');
                // showNotification('Fetch Error', 'There was a problem Fetching the Document Category.');
            }
        });
    }
    if(sender == 'documents-prefs-edits-properties'){
        // console.log(data);
        $('#documents-edit-cat1, #documents-edit-cat2, #documents-edit-cat3, #documents-edit-cat4').empty();
        $('#documents-edit-cat1, #documents-edit-cat2, #documents-edit-cat3, #documents-edit-cat4').append(`<option id="na" value="0" >No Category</option>`);
        $.each(data, function(key, value){
            if(value != 'error'){
                $(`#documents-edit-cat${value.catnum}`).append(`<option id="${value.id}" value="${value.ordernum}" >${value.ordernum} - ${value.name}</option>`);
            }else{
                // showNotification('Fetch Error', 'There was a problem Fetching the Document Category.');
            }
        });
    }
    
}