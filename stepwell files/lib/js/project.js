let projectid = '';
Object.size = function(obj) {
    let size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

$('#project-rng-id').click(function(){
    $('#project-id').val(rngProjectId());
});
$('#project-create').click(function(){
    const projectid = $('#project-id').val();
    const projectname = $('#project-name').val();
    const reference = $('#project-reference').val();
    
    if(projectname == '' || projectid == ''){
        blinkbg($('#project-name'),'red','white');
        blinkbg($('#project-id'),'red','white');
    }else{
        const callback =()=>{
            $('#project-id').val('');
            $('#project-name').val('');
            $('#project-reference').val('');
            showNotification(__FIRST_NAME + ' has successfuly created the project ' + projectname);
        }
        const options = {
            "projectid" : projectid,
            "companyid" : __COMPANY_ID,
            "owner" : 'na',
            "creator" : __ID,
            "projectname" : projectname,
            "reference" : reference
        }
        // api_createProject(projectid, projectname, __ID, __COMPANY_ID, reference, cbsuccess);
        ACCUSER.createProject(options, callback);
    }
});
function fillProflowDashboard(projectid){
    const probj = ACCUSER.getProject(projectid).getData();
    const owobj = ACCUSER.getCompanyAccountById(probj.ownerid);
    const projectProgress = ACCUSER.getProject(projectid).TaskResource.getProjectProgress();
    const datesobj = ACCUSER.getProject(projectid).Task.getprojectMinMaxDates();
    const taskobj = ACCUSER.getProject(projectid).Task.getTasks();
    const traccobj = ACCUSER.getProject(projectid).TaskResource.getDistinctAccountIdList();
    const allocatedHours = ACCUSER.getProject(projectid).TaskResource.getProjectAllocatedHours();
    const actualHours = ACCUSER.getProject(projectid).Timesheet.getActualHours();
    const remainingHours = (isNaN(allocatedHours) ? 0 : allocatedHours) - (isNaN(actualHours) ? 0 : actualHours);

    const zactualHoursPercent = ((isNaN(actualHours) ? 0 : actualHours) / (isNaN(allocatedHours) ? 0 : allocatedHours)) * 100;
    const zremainingHoursPercent = ((isNaN(remainingHours) ? 0 : remainingHours) / (isNaN(allocatedHours) ? 0 : allocatedHours)) * 100;
    
    const actualHoursPercent = isNaN(parseFloat(zactualHoursPercent)) ? 0 : zactualHoursPercent;
    const remainingHoursPercent = isNaN(parseFloat(zremainingHoursPercent)) ? 0 : zremainingHoursPercent;

    const allocatedBudget = ACCUSER.getProject(projectid).Budget.getAllocatedBudget();
    const rateobj = ACCUSER.getProject(projectid).AccountRate.getList();
    const tsheetobj = ACCUSER.getProject(projectid).Timesheet.getList();
    let actualBudget = 0;

    console.log(tsheetobj);
    $.each(tsheetobj, function(key, value){
        const robj = rateobj.find(obj => obj.accid == value.ownerid);
        if(robj){
            // console.log(robj.rate, value.hours);
            actualBudget += (isNaN(parseFloat(value.hours)) ? 0 : parseFloat(value.hours)) * (isNaN(parseFloat(robj.rate)) ? 0 : parseFloat(robj.rate));
            // console.log(actualBudget);
        }else{
            console.log('no rates');
        }
    });

    const remainingBudgetHtml = ((isNaN(parseFloat(allocatedBudget)) ? 0 : parseFloat(allocatedBudget)) - (isNaN(parseFloat(actualBudget)) ? 0 : parseFloat(actualBudget))) >= 0 ? `$${(allocatedBudget - actualBudget).toFixed(2)}` : `($${(allocatedBudget - actualBudget).toFixed(2).toString().substring(1)})`;
    const remainingBudget = parseFloat(allocatedBudget) - parseFloat(actualBudget);
    
    const zactualBudgetPercent = ((isNaN(parseFloat(actualBudget)) ? 0 : parseFloat(actualBudget)) / (isNaN(parseFloat(allocatedBudget)) ? 0 : parseFloat(allocatedBudget))) * 100;
    const zremainingBudgetPercent = ((isNaN(parseFloat(remainingBudget)) ? 0 : parseFloat(remainingBudget)) / (isNaN(parseFloat(allocatedBudget)) ? 0 : parseFloat(allocatedBudget))) * 100;
    const remainingBudgetPercent = isNaN(parseFloat(zremainingBudgetPercent)) ? 0 : zremainingBudgetPercent;
    const actualBudgetPercent = isNaN(parseFloat(zactualBudgetPercent)) ? 0 : zactualBudgetPercent;
    console.log((parseFloat(remainingBudget) / parseFloat(allocatedBudget)) * 100);
    console.log(actualBudgetPercent, remainingBudgetPercent);



    $('#dashboard-body-content-project-image').attr('src', owobj.photo == "na" ? "lib/images/avatardefault.png" : owobj.photo);
    $('#dashboard-body-content-project-projectname').text(probj.projectname);
    $('#dashboard-body-content-project-projectid').text(probj.projectid);
    $('#dashboard-body-content-project-projectmanager').text(owobj.firstname + ' ' + owobj.lastname);
    $('#dashboard-body-content-project-projectmanager-id').text(probj.ownerid);
    $('#dashboard-body-content-project-progress').text(`Project's Progress : ${projectProgress}%`);
    $('#dashboard-body-content-project-progressbar').css('background', `linear-gradient(146deg, var(--BLUE_PALETTE) ${projectProgress}%, rgba(128, 128, 128, 0.2) ${parseFloat(projectProgress) + 5}%)`);
    $("#dashboard-body-content-details-startdate").text(datesobj.startdate);
    $("#dashboard-body-content-details-enddate").text(datesobj.enddate);
    $("#dashboard-body-content-details-task").text(taskobj.length);
    $("#dashboard-body-content-details-users").text(traccobj.length);
    $("#dashboard-body-content-hours-allocated").html(`<span class="title">Allocated:</span> ${isNaN(allocatedHours) ? 0 : allocatedHours} Hours`);
    $("#dashboard-body-content-hours-actual").html(`<span class="title">Actual:</span> ${isNaN(actualHours) ? 0 : actualHours} Hours`);
    $("#dashboard-body-content-hours-remaining").html(`<span class="title">Remaining:</span> ${remainingHours.toFixed(0)} Hours`);
    $("#dashboard-body-content-budget-allocated").html(`<span class="title">Allocated:</span> $${allocatedBudget.toFixed(0)} `);
    $("#dashboard-body-content-budget-allocated").html(`<span class="title">Allocated:</span> $${allocatedBudget.toFixed(0)} `);
    $("#dashboard-body-content-budget-actual").html(`<span class="title">Actual:</span> $${actualBudget.toFixed(0)} `);
    $("#dashboard-body-content-budget-remaining").html(`<span class="title">Remaining:</span> ${remainingBudgetHtml} `);

    if(actualHoursPercent > 100){
        console.log('went above budget');
        const rr = actualHoursPercent - 100;
        $("#dashboard-body-content-hours-actual-bar").css('background', `linear-gradient(146deg, var(--RED_PALETTE) ${rr}%, var(--YELLOW_PALETTE) ${rr + 5}%)`);
        let cc = 100 - rr;
        $("#dashboard-body-content-hours-remaining-bar").css('background', `linear-gradient(146deg, rgba(128, 128, 128, 0.2) ${cc}%, var(--RED_PALETTE) ${cc + 5}%)`);
    }else{

        $("#dashboard-body-content-hours-actual-bar").css('background', `linear-gradient(146deg, var(--YELLOW_PALETTE) ${actualHoursPercent}%, rgba(128, 128, 128, 0.2) ${parseFloat(actualHoursPercent) + 5}%)`);
        $("#dashboard-body-content-hours-remaining-bar").css('background', `linear-gradient(146deg, var(--GREEN_PALETTE) ${remainingHoursPercent}%, rgba(128, 128, 128, 0.2) ${remainingHoursPercent + 5}%)`);
    }

    if(actualBudgetPercent > 100){
        $('#dashboard-body-content-budget-allocated-bar').append('<i class="fas fa-exclamation-triangle" title="One or more Accounts have no Rate, Please Fix this issue to view this accurately."></i>');
        console.log('went above budget');
        const rr = actualBudgetPercent - 100;
        $("#dashboard-body-content-budget-actual-bar").css('background', `linear-gradient(146deg, var(--RED_PALETTE) ${rr}%, var(--YELLOW_PALETTE) ${rr + 5}%)`);
        let cc = 100 - rr;
        $("#dashboard-body-content-budget-remaining-bar").css('background', `linear-gradient(146deg, rgba(128, 128, 128, 0.2) ${cc}%, var(--RED_PALETTE) ${cc + 5}%)`);
        
    }else{
        $('#dashboard-body-content-budget-allocated-bar').children('i').remove();
        $("#dashboard-body-content-budget-actual-bar").css('background-color', 'rgba(128, 128, 128, 0.2)');
        $("#dashboard-body-content-budget-remaining-bar").css('background-color', 'rgba(128, 128, 128, 0.2)');

        $("#dashboard-body-content-budget-actual-bar").css('background', `linear-gradient(146deg, var(--YELLOW_PALETTE) ${actualBudgetPercent}%, rgba(128, 128, 128, 0.2) ${parseFloat(actualBudgetPercent) + 5}%)`);

        $("#dashboard-body-content-budget-remaining-bar").css('background', `linear-gradient(146deg, var(--GREEN_PALETTE) ${remainingBudgetPercent}%, rgba(128, 128, 128, 0.2) ${parseFloat(remainingBudgetPercent) + 5}%)`);

    }

    let hh = 0;
    let mostTaskOwned;
    let mostHoursOwned;
    $.each(traccobj, function(key, value){
        if(!value.accid.includes("TA")){
            const trobj = ACCUSER.getProject(projectid).TaskResource.getObjByAccid(value.accid);
            if(trobj.length > hh){
                hh = trobj.length;
                mostTaskOwned = value.accid;
            }

        }
    });

    console.log(mostTaskOwned);

    
}
function fillProflowStaticDashboard(){
    const prrepobj = ACCUSER.getProjectReport();
    $('#active-overview-owned-projects').children('.stat').text(prrepobj.owned);
    $('#active-overview-connected-projects').children('.stat').text(prrepobj.connected);
    $('#active-overview-active-projects').children('.stat').text(prrepobj.active);
    $('#active-overview-inactive-projects').children('.stat').text(prrepobj.inactive);
    $('#active-overview-archived-projects').children('.stat').text(prrepobj.archived);

}
$(document).on('click', '.project-manage-list-widget', function(){
    let projectName = $(this).text();
    let projectid = $(this).attr('prid');
    let firstname = $(this).attr('fn');
    let lastname = $(this).attr('ln');
    let photo = $(this).attr('ph');
    let owner = $(this).attr('ow');

    $('.dashboard-body-header-widget.schedule, .dashboard-body-header-widget.map, .dashboard-body-header-widget.launch, .dashboard-body-header-widget.boards, .dashboard-body-header-widget.finance').css('display', 'none').hide();
    $('#dashboard-body-projectname').text(projectName).attr({
        'prid': projectid,
        'pn': projectName,
        'fn': firstname,
        'ln': lastname,
        'photo': photo,
        'ow': owner
    });
    	
    showRefreshReport("Loading...");
    setTimeout(() => {
        const cb =data=>{
            console.log(data);
            const cb1 =data=>{
                console.log(data);
                const cb2 =data=>{
                    console.log(data);
                    const cb3 =data=>{
                        console.log(data);
                        const cb4 =data=>{
                            console.log(data);
                            const cb5 =data=>{
                                console.log(data);
                                const cb5 =data=>{
                                    console.log(data);
                                    const cb5 =data=>{
                                        console.log(data);
                                        const cb5 =data=>{
                                            console.log(data);
                                            const cb6 =data=>{
                                                console.log(data);
                                                const cb7 =data=>{
                                                    console.log(data);
                                                    // type totalhours startdate enddate completed hours
                                                    $('.dashboard-body-header-widget.schedule, .dashboard-body-header-widget.map, .dashboard-body-header-widget.launch, .dashboard-body-header-widget.boards, .dashboard-body-header-widget.finance').css('display', 'flex').show();
                                                    setTimeout(() => {
                                                        hideRefreshReport();
                                                        fillProflowDashboard(projectid);
                                                        $('.dashboard-body-content-project').css('display', 'flex').show();
                                                        $('.dashboard-body-content-details').css('display', 'flex').show();
                                                        $('.dashboard-body-content-hours').css('display', 'flex').show();
                                                        $('.dashboard-body-content-budget').css('display', 'flex').show();
                                                        // $('.dashboard-body-content-honors').css('display', 'flex').show();
                                                    }, 0);
                                                };
                                                ACCUSER.getProject(projectid).checkList('AccountRate',cb7);
                                            };
                                            ACCUSER.getProject(projectid).checkList('Budget',cb6);
                                        };
                                        ACCUSER.getProject(projectid).checkList('TmpSupplier',cb5);
                                    };
                                    ACCUSER.getProject(projectid).checkList('TmpAccount',cb5);
                                };
                                ACCUSER.getProject(projectid).checkList('ActualDocument',cb5);
                            };
                            ACCUSER.checkList('COMPANY_ACCOUNTS',cb5);
                        };
                        ACCUSER.getProject(projectid).checkList('ConnectByProjectId',cb4);
                    };
                    ACCUSER.getProject(projectid).checkList('ScheduleDocument',cb3);
                };
                ACCUSER.getProject(projectid).checkList('Timesheet',cb2);
            };
            ACCUSER.getProject(projectid).checkList('TaskResource',cb1);
        };
        ACCUSER.getProject(projectid).checkList('Task',cb);
    }, 0);



});
$('#project-manage-search').keyup(function(){
    let q = $(this).val();
     // console.log(project_manage_list);
     let x = Object.size(project_manage_list);
     // console.log(x);
     $('#project-manage-list').empty();
     for(i=0; i < x; i++){
         // console.log(project_manage_list[i][1]);
         if(project_manage_list[i][0].toLowerCase().includes(q.toLowerCase()) || project_manage_list[i][1].toLowerCase().includes(q.toLowerCase())){
             // console.log('Found');
             $('#project-manage-list').append(`<span prid="${project_manage_list[i][0]}" fn="${project_manage_list[i][3]}" ln="${project_manage_list[i][4]}" ph="${project_manage_list[i][5]}" ow="${project_manage_list[i][2]}" class="project-manage-list-widget btn-shadow">${project_manage_list[i][1]}</span>`);
         }else{
             // console.log('Not FOund');
         }
     }
     $('#project-view-name').text('Project Name');
     $('#project-view-id').text('Project Id');
     $('#project-view-ownerphoto').attr('src', 'lib/images/avatardefault.png');
     $('#project-view-ownername').text('Owners Name');

     $('.project-manage-view-con').hide();
     $('.project-manage-connect-con').hide();
    
});

$('#project-view-launch').click(function(){
    console.log('test');
    showRefreshReport("Loading...");
    setTimeout(() => {
        let projectid = $('#dashboard-body-projectname').attr('prid');
        let ownerid = $('#dashboard-body-projectname').attr('ow');
        let firstname = $('#dashboard-body-projectname').attr('fn');
        let lastname = $('#dashboard-body-projectname').attr('ln');
        let photo = $('#dashboard-body-projectname').attr('ph');
        let projectname = $('#dashboard-body-projectname').attr('pn');

        selprojectid = projectid;
        selprojectname = projectname;
        selownerid = ownerid;
        selfirstname = firstname;
        sellastname = lastname;
        selphoto = photo;

        $('#preferences-header-projectid').text(projectid);
        $('#preferences-header-projectname').text(projectname);
        $('.preferences-navigation-widget').removeClass('selected');
        $('.preferences-body').hide();
        $('.dashboard-con').hide();
        $('.project-preferences-con').show();

        
        $('#preferences-mods-financial').parent('.preferences-mods-widget').hide();
        $('#preferences-mods-technical').parent('.preferences-mods-widget').hide();

        const cb=data=>{
            console.log(data);
            const cb1=data=>{
                console.log(data);
                const cb2=data=>{
                    console.log(data);
                    const cb3=data=>{
                        console.log(data);
                        const cb4=data=>{
                            console.log(data);
                        };
                        ACCUSER.getProject(projectid).checkList('Request', cb4);
                    };
                    ACCUSER.getProject(projectid).checkList('Minutes', cb3);
                };
                ACCUSER.getProject(projectid).checkList('Notes', cb2);
            };
            ACCUSER.getProject(projectid).checkList('Register', cb1);
        };
        ACCUSER.getProject(projectid).checkList('ConnectByProjectId', cb);
    }, 0);
    setTimeout(() => {
        hideRefreshReport();
    }, 0);
    

});
$('#project-connect-search').click(function(){
    let id = $('#project-connect-search-id').val();
    if(id == ''){
        blinkbg($('#project-connect-search-id'), 'red', 'white');
    }else{
        const cbsuccess=data=>{
            console.log(data);
            $('#project-connect-search-select').empty();
            $.each(data, function(key, value){
                // console.log(value.id, __COMPANY_ID);
                if(value != 'error'){
                    $('#project-connect-search-select').append(`
                        <option value="${value.id}">${value.firstname} ${value.lastname} ${value.id}</option>
                    `);
                    $('.project-connect-search-list').css('display', 'flex').show();
                }else{
                    $('.project-connect-search-list').hide();
                    showNotification('Fetch Error', 'There was no account linked to the provided Name.');
                }
            });
            $('.dashboard-body-header-widget.share').animate({'height' : '180px'}, 200);
        };
        api_searchAccountByName(id, cbsuccess);
    }

});
$('#project-connect-submit').click(function(){
    console.log('connect');
    let projectid = $('#share-header-retrieve-project-con').val();
    let id = $('#project-connect-search-select').val();
    // console.log(projectid, id);
    api_createProjectConnect(projectid, id);
    $('.project-connect-search-list').hide();
    $('#project-connect-search-id').val();
    showNotification('Project Connect', 'Successfuly Connected Account to Project');
    
    $('.dashboard-body-header-widget.share').animate({'height' : '130px'}, 200);
});
$('#project-connect-search-id').focus(function(){
    if(groupid_clipboard != ''){
        $(this).val(groupid_clipboard);
    }
});
$(document).on('click', '.project-launch-list-widget', function(){
    let id = $(this).attr('zid');
    let firstname = $(this).attr('fn');
    let lastname = $(this).attr('ln');
    let photo = $(this).attr('ph');
    let groupname = $(this).attr('gn');
    // id, groupname, photo, firstname, lastname
    let owner = $('#project-launch-view-ownername').attr('zid');
    // console.log(id, groupname, photo, firstname, lastname);
    $('#project-launch-usg-id').text(id);
    $('#project-launch-usg-groupname').text(groupname);
    $('#project-launch-usg-photo').attr('src', photo);
    $('#project-launch-usg-ownername').text(firstname + ' ' + lastname);

    // if(owner == __ID){
    //     $('#project-launch-usg-remove').show();
    // }else{
    //     $('#project-launch-usg-remove').hide();
    // }

    if(id == __ID){
        $('#project-launch-usg-remove').prop('disabled', true).text('Cannot Remove Self').css({'color' :'#c7c7c7', 'cursor': 'not-allowed'});
    }else{
        $('#project-launch-usg-remove').prop('disabled', false).text('Remove from Project').css({'color' :'white', 'cursor': 'pointer'});
    }
    
    if(id.charAt(0) == 'G'){
        $('.project-launch-usg-con').css('background-color', ORANGE_PALETTE);
    }else{
        $('.project-launch-usg-con').css('background-color', BTN_COLOR);
    }

    

    $('.project-launch-add-user').hide();
    $('.project-launch-usg-con').show();
    $('.project-launch-view-content').show();
});
$('#project-launch-usg-remove').click(function(){
    const id = $('#project-launch-usg-id').text();
    const projectid = selprojectid;
    
    const cbtrue = () => {
        api_removeProjectConnect(id, projectid);
        showNotification('Project Connect', 'You have Removed ' + id + ' From Project.');
        $('.project-launch-usg-con').hide();
        // api_fetchProjectConnectByProjectId(projectid, 'project-view-launch');
        $('#project-launch-list').children('.project-launch-list-widget').each(function(){
            const zid = $(this).attr('zid');
            if(zid == id){
                $(this).remove();
            }
        });
    };
    const cbfalse = () => {
        showNotification('Project Connect', 'You have Declined to Remove ' + id + ' From Project.');
    };

    showAction('Confirm to Remove from Project?', cbtrue, cbfalse);
});
$('#preferences-mods-delete').click(function(){
    const projectid = selprojectid;
    const cbtrue = () => {
        const cbbfore = () => {};
        const cbcomplete = () => { 
            $('.project-info-con').hide();
            $('.dashboard-con').show();
            showNotification('Project Management', 'You have Deleted The Project ' + projectid); 
            api_deleteProject(projectid);
        };

        api_fetchProjectInfo(projectid, 'project-launch-view-delete', cbbfore, cbcomplete);
    
    };
    const cbfalse = () => {
        showNotification('Project Connect', 'You have Declined to Delete The Project.');
    };
    showAction('Confirm to Delete Project?', cbtrue, cbfalse);
});
$('#preferences-mods-prefs').click(function(){
    const cbbefore = () => {
        $('#project-launch1-projectname').text(selprojectname);
        $('#project-launch1-projectid').text(selprojectid);
    };
    const cbcomplete = () => {};

    api_fetchProjectProduct(selprojectid, 'project-launch-view-prefs');
    api_fetchProjectInfo(selprojectid, 'project-launch-view-prefs', cbbefore, cbcomplete);

    $('.project-preferences-con').hide();
    $('.projects-prefs-con').show();
    $('#project-launch1-con').show();
    $('#project-launch2-con').hide();
});
$('#preferences-mods-exit').click(function(){
    $('.project-preferences-con').hide();
    $('.dashboard-con').show();
    // $('#nav-dashboard')
});
$('#share-header-retrieve-pull').click(function(){
    $('.schedule-body-share > .content').show();
});


//Active Projects > Launch > Connect 
$('#project-launch-add-user-search').click(function(){
    console.log('Active Projects > Launch > Connect > Add Users > Search');
    const prid = $('#preferences-header-projectid').html();
    console.log(prid);
    let id = $('#project-launch-add-user-search-id').val();
    if(id == ''){
        blinkbg($('#project-launch-add-user-search-id'), 'red', 'white');
    }else{
        const cbsuccess=data=>{
            console.log(data);
            $('#project-launch-add-user-search-select').empty();
            $.each(data, function(key, value){
                if(value != 'error'){
                    $('#project-launch-add-user-search-select').append(`
                        <option value="${value.id}">${value.firstname} ${value.lastname} ${value.id}</option>
                    `);
                }else{
                    showNotification('Fetch Error', 'There was no account linked to the provided Name.');
                }
            });
            // $('.dashboard-body-header-widget.share').animate({'height' : '180px'}, 200);
        };
        // api_searchAccountByName(id, cbsuccess);
        const list = ACCUSER.searchCompanyAccountById(id);
        console.log(list,'--------------');
        ACCUSER.fillCompanyAccountSelectTag($('#project-launch-add-user-search-select'), list);
    }

});
$('#project-launch-add-user-submit').click(function(){
    console.log('Active Projects > Launch > Connect > Add Users > Connect');
    const prid = $('#preferences-header-projectid').html();
    const id = $('#project-launch-add-user-search-select').val();
    console.log(prid);
    const callback=data=>{
        console.log(data);
        showNotification('Completed', 'Account has been connected to the project.');
        cidConnect();
    };
    const options = {
        'id' : id,
        'projectid' : prid,
        'callback' : callback
    };
    ACCUSER.connectUserToProject(options);
});


