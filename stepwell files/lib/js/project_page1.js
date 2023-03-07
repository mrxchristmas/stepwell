function getFormValue(e){
    let ret = "";
    if(e == "5.1"){
        ret = "Bacterial based recombinant protein";
    }else if(e == "5.2"){
        ret = "Monoclonal Antibodies";
    }else if(e == "5.3"){
        ret = "Polyclonal Antibodies";
    }else if(e == "5.4"){
        ret = "Modified Cohn process based Plasma Proteins or its fraction based Plasma Proteins";
    }else if(e == "5.5"){
        ret = "Chromatography based Plasma proteins";
    }else if(e == "5.6"){
        ret = "Other class of purification";
    }else if(e == "5.7"){
        ret = "Innovative Biotech product";
    }else if(e == "6.1"){
        ret = "Single Product facility";
    }else if(e == "6.2"){
        ret = "Multi Product facility";
    }else if(e == "6.3"){
        ret = "Multi Product from Single Input Material";
    }else if(e == "14.1"){
        ret = "One batch at a time.";
    }else if(e == "14.2"){
        ret = "Concurrent batches.";
    }else if(e == "15.1"){
        ret = "Build new manufacturing.";
    }else if(e == "15.2"){
        ret = "Retrofit of existing facility.";
    }else if(e == "15.3"){
        ret = "Expansion of current facility.";
    }
    return ret;
}

$(document).on('dblclick', '.pp1-productname', function(){
    // $(this).remove();
    const productid = $(this).attr('prid');
    api_deleteProjectProduct(productid);
    $(this).remove();
});
$('#pp1-form-add-product').submit(function(e){
    e.preventDefault();
    const productid = rngProductId();
    let productname = $('#pp1-txt-productname').val();
    api_createProjectProduct(productid, projectid, productname);
    $('#pp1-container-productname').append(`<span prid="${productid}" style="background-color: ${BTN_COLOR}" class="pp1-productname btn-shadow">${productname}</span>`);
    $('#pp1-txt-productname').val("");
});
 

$('#pp1-page-submit').click(function(){
    
    $('#project-launch1-con').hide();
    $('#project-launch2-con').show();
});



$('#pp1-project-class').change(function(){
    let v = $(this).val();
    api_updateProjectInfo(projectid, 'pi_5', v);
    // console.log('ProjectID: ', projectid);
});
$('#pp1-manufacturing-facility').change(function(){
    let v = $(this).val();
    api_updateProjectInfo(projectid, 'pi_6', v);
    // console.log('ProjectID: ', projectid); 
});
$('#pp1-pi_8').blur(function(){
    let v = $(this).val();
    api_updateProjectInfo(projectid, 'pi_8', v);
});
$('#pp1-pi_9').blur(function(){
    let v = $(this).val();
    api_updateProjectInfo(projectid, 'pi_9', v);
});

$('#pp1-hours-per-day').change(function(){
    let v = $(this).val();
    $('#pp1-show-hours-per-day').val(v);
    api_updateProjectInfo(projectid, 'pi_10', v);
});
$('#pp1-show-hours-per-day').blur(function(){
    let x = parseInt($(this).val());
    if(x > 24 || x < 0){
        showNotification('Input Error', 'Please Input a valid Hour');
        $(this).val('0');
        $('#pp1-hours-per-day').val(0);
    }else{
        $('#pp1-hours-per-day').val(x);
        api_updateProjectInfo(projectid, 'pi_10', x);
    }
});

$('#pp1-days-per-week').change(function(){
    let v = $(this).val();
    $('#pp1-show-days-per-week').val(v);
    api_updateProjectInfo(projectid, 'pi_11', v);
});
$('#pp1-show-days-per-week').blur(function(){
    let x = parseInt($(this).val());
    if(x > 7 || x < 0){
        showNotification('Input Error', 'Please Input a valid Number of Day');
        $(this).val('0');
        $('#pp1-days-per-week').val(0);
    }else{
        $('#pp1-days-per-week').val(x);
        api_updateProjectInfo(projectid, 'pi_11', x);
    }
});

$('#pp1-weeks-of-shutdown').change(function(){
    let v = $(this).val();
    $('#pp1-show-weeks-of-shutdown').val(v);
    api_updateProjectInfo(projectid, 'pi_12', v);
});
$('#pp1-show-weeks-of-shutdown').blur(function(){
    let x = parseInt($(this).val());
    if(x > 52 || x < 0){
        showNotification('Input Error', 'Please Input a valid Number of Weeks');
        $(this).val('0');
        $('#pp1-weeks-of-shutdown').val(0);
    }else{
        $('#pp1-weeks-of-shutdown').val(x);
        api_updateProjectInfo(projectid, 'pi_12', x);
    }
});

$('#pp1-months-of-shutdown').change(function(){
    let v = $(this).val();
    $('#pp1-show-months-of-shutdown').val(v);
    api_updateProjectInfo(projectid, 'pi_13', v);
});
$('#pp1-show-months-of-shutdown').blur(function(){
    let x = parseInt($(this).val());
    if(x > 12 || x < 0){
        showNotification('Input Error', 'Please Input a valid Number of Months');
        $(this).val('0');
        $('#pp1-months-of-shutdown').val(0);
    }else{
        $('#pp1-months-of-shutdown').val(x);
        api_updateProjectInfo(projectid, 'pi_13', x);
    }
});

$('#pp1-type-of-run').change(function(){
    let v = $(this).val();
    api_updateProjectInfo(projectid, 'pi_14', v);
});
$('#pp1-type-of-project').change(function(){
    let v = $(this).val();
    api_updateProjectInfo(projectid, 'pi_15', v);
});
$('#project-launch1-btn-close').click(function(){
    console.log('test');
    $('.projects-prefs-con').hide();
    $('.project-preferences-con').show();
});
