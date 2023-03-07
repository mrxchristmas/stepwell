

$('#position-create').submit(function(e){
    e.preventDefault();
    let title = $('#position-create-tbox').val();
    let department = $('#position-search-department').val();
    let id = rng5();
    if(__COMPANY_ID != ''){
        // api_createPosition(__COMPANY_ID, title);
        // api_fetchPositions(__COMPANY_ID);
        const cb=data=>{
            console.log(data);
            $('#position-create-tbox').val('');
            COMPANY.fillPositionsByDepartment('#position-list', department);
            // $('#position-search-department').val("na");
            showNotification("Administration", "Created Position");
        };
        COMPANY.Position.createPosition({'id': id, 'comid':COMPANY.id, 'department':department, 'title': title, 'callback':cb});
    }
    // console.log(rng5());
});
$('#position-create-tbox').keyup(function(){
    let title = $(this).val();
    // console.log(title);
    if(__COMPANY_ID != ''){
        // api_searchPosition(__COMPANY_ID, title, $('#position-search-department').val());
        COMPANY.Position.searchPosition(title,'#position-list', $('#position-search-department').val());
    }
});
$(document).on('click', '.position-list-widget', function(){
    let title = $(this).text();
    let id = $(this).attr('id');
    console.log(id, title);
    $('#position-title-con').val(title).attr({'name': title, 'zid' : id});
    $('#position-title-con').focus();
    let p = COMPANY.Position.getPosition(id);
    console.log(p);

    $('#position-assign-department').val(p.department);
});
$('#position-update').click(function(){
    let title = $('#position-title-con').val();
    let oldtitle = $('#position-title-con').attr('name');
    let id = $('#position-title-con').attr('zid');

    if(title == '' || title == oldtitle){
        blink($('#position-title-con'), 'red', 'white');
    }else{
        if(__COMPANY_ID != ''){
            // api_updatePosition(id, title);
            // api_fetchPositions(__COMPANY_ID, 'positiontab'); 
            const cb=data=>{
                console.log(data);
                $('#position-title-con').val('').attr({'name': '', 'zid' : ''});
                $('#' + id).html(title);
                showNotification("Administration", "Updated Position");
            }
            COMPANY.Position.updatePosition({'id': id, 'title': title, 'callback':cb});
        }
    }
});
$('#position-delete').click(function(){
    let title = $('#position-title-con').val();
    let oldtitle = $('#position-title-con').attr('name');
    let id = $('#position-title-con').attr('zid');

    if(title == '' || title != oldtitle){
        blink($('#position-title-con'), 'red', 'white');
    }else{
        if(__COMPANY_ID != ''){
            const cb=data=>{
                console.log(data);
                $('#position-title-con').val('').attr({'name': '', 'zid' : ''});
                $('#' + id).remove();
                showNotification("Administration", "Deleted Position");
            }
            COMPANY.Position.deletePosition({'id': id, 'callback':cb});
            // api_deletePosition(id);
            // api_fetchPositions(__COMPANY_ID, 'positiontab'); 
        }
    }
});
$('#position-search-department').change(function(){
    let title = "";
    $('#position-create-tbox').val('');
    api_searchPosition(__COMPANY_ID, title, $('#position-search-department').val());
});
$('#position-update-department').click(function(){
    let title = "";
    const id = $('#position-title-con').attr('zid');
    const department = $('#position-assign-department').val();
    const zdepartment = $('#position-search-department').val();
    // api_updatePositionDepartment(id, department);
    // api_searchPosition(__COMPANY_ID, title, zdepartment);
    const cb=data=>{
        console.log(data);
        $('#position-title-con').val('').attr({'name': '', 'zid' : ''});
        showNotification("Administration", "Updated Department");
    }
    COMPANY.Position.updatePositionDepartment({'id': id, 'department': department, 'callback':cb});
});


$('#department-create').submit(function(e){
    e.preventDefault();
    let title = $('#department-create-tbox').val();
    let id = rng5();
    if(__COMPANY_ID != ''){
        const cb=data=>{
            console.log(data);
            $('#department-create-tbox').val('');
            COMPANY.fillDepartments('#department-list');
            showNotification("Administration", "Created Department");
        };
        COMPANY.Department.createDepartment({'id':id,'comid':__COMPANY_ID,'title':title, 'callback':cb});
        // api_createDepartment(__COMPANY_ID, title);
        // api_fetchDepartments(__COMPANY_ID, 'departmenttab');
    }
    // console.log(rng5());
});
$('#department-create-tbox').keyup(function(){
    let title = $(this).val();
    // console.log(title);
    if(__COMPANY_ID != ''){
        // api_searchDepartment(__COMPANY_ID, title);
        COMPANY.Department.searchDepartment(title,'#department-list');
    }
    
});
$(document).on('click', '.department-list-widget', function(){
    let title = $(this).text();
    let id = $(this).attr('id');
    console.log(id, title);
    $('#department-title-con').val(title).attr({'name': title, 'zid' : id});
    $('#department-title-con').focus();
});
$('#department-update').click(function(){
    let title = $('#department-title-con').val();
    let oldtitle = $('#department-title-con').attr('name');
    let id = $('#department-title-con').attr('zid');

    if(title == '' || title == oldtitle){
        blink($('#department-title-con'), 'red', 'white');
    }else{
        if(__COMPANY_ID != ''){
            const cb=data=>{
                console.log(data);
                $('#department-title-con').val('').attr({'name': '', 'zid' : ''});
                $('#' + id).html(title);
                showNotification("Administration", "Updated Department");
            };
            COMPANY.Department.updateDepartment({'id':id, 'title':title, 'callback':cb});
            // api_updateDepartment(id, title);
            // api_fetchDepartments(__COMPANY_ID, 'departmenttab');
        }
    }
});
$('#department-delete').click(function(){
    let title = $('#department-title-con').val();
    let oldtitle = $('#department-title-con').attr('name');
    let id = $('#department-title-con').attr('zid');

    if(title == '' || title != oldtitle){
        blink($('#department-title-con'), 'red', 'white');
    }else{
        if(__COMPANY_ID != ''){
            const cb=data=>{
                console.log(data);
                $('#department-title-con').val('').attr({'name': '', 'zid' : ''});
                $('#' + id).remove();
                showNotification("Administration", "Deleted Department");
            };
            COMPANY.Department.deleteDepartment({'id':id,'callback':cb});
            // api_deleteDepartment(id);
            // api_fetchDepartments(__COMPANY_ID, 'departmenttab');
        }
    }
});



$('#suuser-btn-generate-password').click(function(){
    $('.conf-password').hide();
    $('#conf-password-report').hide();
    const password = rngPassword();
    // console.log(password);
    password_status = 'idle';
    $('#suuser-create-password').val(password);
    $('#suuser-create-conf-password').val('');
    // console.log(password_status);
});
$('#suuser-btn-generate-id').click(function(){
    const userlevel = $('#suuser-create-userlevel').val();
    const id = rngId(userlevel);
    $('#suuser-create-id').text(id);
});
$('#suuser-create-userlevel').change(function(){
    const userlevel = $(this).val();
    const id = rngId(userlevel);
    $('#suuser-create-id').text(id);
    const dept = $('#suuser-create-department').val();
    const suplist = COMPANY.getSupervisorsByDepartment(dept, userlevel);
    console.log(suplist);
    COMPANY.fillTag('#suuser-create-supervisor', suplist);
});
$('#suuser-create-password, #suuser-create-conf-password').keyup(function(){
    $('.conf-password').show();
    $('#conf-password-report').show();
    if($('#suuser-create-password').val() == $('#suuser-create-conf-password').val() && $('#suuser-create-password').val() != '' && $('#suuser-create-conf-password').val() != ''){
        $('#conf-password-report').text('Passwords Match.');
        password_status = 'ok';
        // console.log(password_status);
    }else{
        $('#conf-password-report').text('Passwords Do Not Match');
        password_status = 'error';
        // console.log(password_status);
    }
});
$('#suuser-create-department').change(function(){
    $('#suuser-create-position').empty();
    const id = $(this).val();
    console.log(id);
    const userlevel = $('#suuser-create-userlevel').val();
    const list = COMPANY.getPositionsByDepartmentId(id);
    console.log(list);

    COMPANY.fillTag('#suuser-create-position', list);

    const suplist = COMPANY.getSupervisorsByDepartment(id, userlevel);
    console.log(suplist);
    COMPANY.fillTag('#suuser-create-supervisor', suplist);


});
$('#suuser-search-userlevel').change(function(){
    // $('#suuser-search-list').empty();
    let id = $(this).val();
    console.log(id);

    // '#suuser-search-list'
    const acclist = COMPANY.getCompanyAccountsByUserLevel(id);
    console.log(acclist);
    COMPANY.fill('#suuser-search-list', acclist);

    $('.suuser-userprofile').hide();
    // const acvalue = fetchAccountByuserLevel($(this).val());
    // // console.log('acvalue', acvalue);
    // for(i=0; i< acvalue.length; i++){
    //     $('#suuser-search-list').append(`
    //         <span class="btn-shadow suuser-search-list-widget" id="${acvalue[i].id}" 
    //         userlevel="${acvalue[i].userlevel}"lastname="${acvalue[i].lastname}"firstname="${acvalue[i].firstname}"phone="${acvalue[i].phone}"
    //         birthdate="${acvalue[i].birthdate}"position="${acvalue[i].position}"department="${acvalue[i].department}" supervisor="${acvalue[i].superid}"
    //         email="${acvalue[i].email}" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};">${acvalue[i].firstname} ${acvalue[i].lastname}</span>
    //     `);
    // }
});
$(document).on('click', '.suuser-search-list-widget', function(){
    // console.log($(this).attr('id'));
    const id = $(this).attr('id');

    const acc = COMPANY.AccUser.getCompanyAccountById(id);
    console.log(acc);
    // $('#suuser-view-position').empty();
    // for(i=0; i<positionList.length; i++){
    //     if(positionList[i].department == department){
    //         $('#suuser-view-position').append(`<option value="${positionList[i].id}">${positionList[i].title}</option>`);
    //     }
    // }
    // fillSuperList(department, 'suuser-view');
    
    const list = COMPANY.getPositionsByDepartmentId(acc.department);
    console.log(list);

    COMPANY.fillTag('#suuser-view-position', list);

    const suplist = COMPANY.getSupervisorsByDepartment(acc.department, acc.userlevel);
    // console.log(acc.department, acc.userlevel);
    console.log(suplist);
    COMPANY.fillTag('#suuser-view-supervisor', suplist);
    
    $('#suuser-view-id').text(acc.id);
    $('#suuser-view-email').val(acc.email);
    $('#suuser-view-lastname').val(acc.lastname);
    $('#suuser-view-firstname').val(acc.firstname);
    $('#suuser-view-phone').val(acc.phone);
    $('#suuser-view-birthdate').val(acc.birthdate);
    $('#suuser-view-position').val(acc.position);
    $('#suuser-view-department').val(acc.department);
    $('#suuser-view-userlevel').val(acc.userlevel);
    $('#suuser-view-supervisor').val(acc.superid);
    $('#account-create-container').hide();

    acc.userlevel == "1" ? $('#suuser-view-userlevel').prop('disabled', true) : $('#suuser-view-userlevel').prop('disabled', false);
    
    $('.suuser-userprofile').show();
});
$('#pp1-page-submit').click(function(){
    $('#project-page1-con').hide();
    $('#project-page2-con').show();
});
$('#notification-close').click(function(){
    hideNotification();
});
$('#suuser-view-department').change(function(){
    $('#suuser-view-position').empty();
    const id = $(this).val();
    const userlevel = $('#suuser-view-userlevel').val();
    const list = COMPANY.getPositionsByDepartmentId(id);
    console.log(list);

    COMPANY.fillTag('#suuser-view-position', list);
    const suplist = COMPANY.getSupervisorsByDepartment(id, userlevel);
    console.log(suplist);
    COMPANY.fillTag('#suuser-view-supervisor', suplist);
    // const d = $(this).val();
    // for(i=0; i<positionList.length; i++){
    //     if(positionList[i].department == d){
    //         $('#suuser-view-position').append(`
    //             <option value="${positionList[i].id}">${positionList[i].title}</option>
    //         `);
    //     }
    // }
    // fillSuperList(d, 'suuser-view');
});


$('.admin-emailList-searchbox').keyup(function(){
    let email = $(this).val();
    console.log(email);
    const acclist = COMPANY.searchCompanyAccountsByEmail(email);
    COMPANY.fill('#suuser-search-list', acclist);
});
// $(document).ready(function(){
//     setTimeout(function(){
//         const obj={
//             'id':__COMPANY_ID,
//             'name':__COMPANY_NAME,
//             'logo':__COMPANY_LOGO
//         }
//         console.log(obj);
//         COMPANY = new Company(obj)
//     }, 3000);
    

// });
const admincontrol_ui_dragoption = {
    //this drag option is where you can manipulate whatever you are dragging
    start: function(e, ui) {
        // this function fires when you start dragging

        const name = $(ui.helper).text(); // $(ui.helper) is the element that you are dragging 
        const uid = $(ui.helper).attr('ui'); // so you can use it like $(ui.helper).attr('id') to get its id
        // const comid = $('#moduleman-company-modules-title').attr('comid');
        let gate = true;
        let clone;

        // this piece of code colors the droppable part whenever you start to drag an item

        $('.moduleman-company-modules-widget-con').children('.moduleman-company-modules-widget').each(function(){
            if($(this).attr('ui') == uid){
                gate = false;
                clone = $(this);
            }
        });
        if(gate){
            // console.log('not there');
            $('.moduleman-company-modules').css('background-color', GREEN_PALETTE);
            
            
        }else{
            // console.log('already there');
            blinkbg(clone, RED_PALETTE, BTN_COLOR);
            $('.moduleman-company-modules').css('background-color', YELLOW_PALETTE);
        }


        // so here on start you can color your droppable div
    },
    drag: function() {
    //   this function fires after you drag and while dragging
    },
    stop: function() {
    // this function fires when you stop dragging or if you dropped it
        $('.moduleman-company-modules').css('background-color', SUB_COLOR);
    // and here in stop you can color your droppable div into its original state
    },

    //these are just additional options for the draggable
    opacity: 0.7, // opacity of the draggable
    helper: "clone", // will not drag the actual element. instead will send a clone
    containment: "#moduleman-wrapper", // here is where the draggable can stay. if you put "body" then it can go around the whole page
                                       // but if you put "#sampleid" then it will contain the draggable within the range of the div with the id of 'sampleid'
    scroll: false,  // prevents scrolling
    cursorAt: { bottom: 0, left: 150}, // puts cursor at center bottom || remove left option to just simply put it in bottom
    revert: "invalid" // draggable will fall back to its place
};
function cidModules(){
    $('.moduleman-company-modules').hide();
    $('.moduleman-module-list').hide();
    const comlobj = ADMIN.getCompanyList();
    $('.admincontrol-ui-body-modules').children('#moduleman-wrapper').children('.moduleman-company-list').children('.moduleman-company-widget-con').empty();
    $.each(comlobj, function(key, value){
        const comobj = value.getObj();
        // console.log(comobj);
        const html = `<span comid="${comobj.companyid}" class="moduleman-company-widget moduleman-company-widget btn-shadow">${comobj.name}</span>`;
        $('.admincontrol-ui-body-modules').children('#moduleman-wrapper').children('.moduleman-company-list').children('.moduleman-company-widget-con').append(html);
        showLoadingReport('Refreshing Data.. Please Wait');
        setTimeout(() => {
            const cb =data=>{
                console.log(data);
                hideLoadingReport();
            }
            ADMIN.getCompany(comobj.companyid).checkList("Module", cb);
        }, 0);
    });



}
function cidAdmins(){
    $('.admincontrol-ui-body-admins').children('#admincontrol-ui-admin-wrapper').children('.admincontrol-ui-admin-list').children('.admincontrol-ui-admin-widget-con').empty();
    
    const comlobj = ADMIN.getCompanyList();
    $.each(comlobj, function(key, value){
        const comobj = value.getObj();
        const html = `<span comid="${comobj.companyid}" class="admincontrol-ui-admin-widget btn-shadow">${comobj.name}</span>`;
        // console.log(comobj);
        
        showReloadReport('Refreshing Data.. Please Wait');
        setTimeout(() => {
            const cb =data=>{
                console.log(data);
                if(comobj.status == "active"){
                    $('.admincontrol-ui-body-admins').children('#admincontrol-ui-admin-wrapper').children('.admincontrol-ui-admin-list').children('.admincontrol-ui-admin-widget-con').append(html);
                }
                hideReloadReport();
            }
            ADMIN.getCompany(comobj.companyid).checkList("Admin", cb);
        }, 0);
    });


    
}
function cidLicense(){
    $('.admincontrol-ui-license-widget-con').empty();
    showReloadReport('Refreshing Data.. Please Wait');
    setTimeout(() => {
        const cb =data=>{
            const cb =data=>{
                const cb =data=>{
                    console.log(data);
                    const comlobj = ADMIN.getCompanyList();
                    $.each(comlobj, function(key, value){
                        const comobj = value.getObj();
                        if(comobj.status == "active"){
                            $('.admincontrol-ui-license-widget-con').append(`<span comid="${comobj.companyid}" class="admincontrol-ui-license-widget btn-shadow">${comobj.name}</span>`);
                        }
                    });
                    $('.admincontrol-ui-license-current').hide();
                    $('.admincontrol-ui-license-add').hide();
                    hideReloadReport();
                };
                ADMIN.License.checkList("list", cb);
            };
            ADMIN.checkList("License", cb);
        };
        ADMIN.checkList("Company", cb);
    }, 0);
}
function cidComplain(){
    $('.complain-manage-widget-con').empty();
    showReloadReport('Refreshing Data.. Please Wait');
    setTimeout(() => {
        const cb =data=>{
            console.log(data);
            const cb =data=>{
                console.log(data);
                setTimeout(() => {
                    fillComplains();
                    hideReloadReport();
                }, 0);
            };
            ADMIN.checkList("Company", cb);
        };
        COMPANY.checkList("Complains", cb);
    }, 0);
}
function cidCreateCompany(){
    $('.admincontrol-ui-body').children('.admincontrol-ui-body-widget-').hide();
    $('.admincontrol-ui-body').children('.admincontrol-ui-body-widget').hide();
    $('.admincontrol-ui-body-create-company').show();
    $('.admincontrol-ui-ccreate-create').hide();
    fillCompanyCreate();
}


function fillComplains(){
    const comlobj = COMPANY.Complains.get();
    console.log('PEKPEK', comlobj);
    $('.complain-manage-widget-con').empty();
    $.each(comlobj, function(key, value){
        const comobj = ADMIN.getCompanyObj(value.companyid);
        $('.complain-manage-widget-con').append(`<div tid="${value.id}" class="complain-manage-widget">
            <span>${comobj.name} &nbsp;&bull;&nbsp; ${value.sender}</span>
            <span>${value.type} &nbsp;&bull;&nbsp; ${value.senddate}</span>
        </div>`);
    });
}
function fillCompanyModule(comid){
    const commodlist = ADMIN.getCompany(comid).getModule();
    $('.moduleman-company-modules-widget-con').empty();
    // console.log('ASDASD', commodlist);
    $.each(commodlist, function(key, value){
        if(value.moduleui != undefined && value.moduleui != null && value.moduleui != ''){
            $('.moduleman-company-modules-widget-con').append(`<span ui="${value.moduleui}" mid="${value.id}" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};" class="moduleman-company-modules-widget btn-shadow">${value.modulename}</span>`);
        }
    });
}
function fillModuleList(){
    const modlist = ADMIN.getModuleList();
    $('.moduleman-module-list-widget-con').empty();
    $.each(modlist, function(key, value){
        if(value.ui != undefined && value.ui != null && value.ui != ''){
            $('.moduleman-module-list-widget-con').append(`<span ui="${value.ui}" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};" class="moduleman-module-list-widget btn-shadow">${value.name}</span>`);
            $('.moduleman-module-list-widget').draggable(admincontrol_ui_dragoption);
        }
    });
}
function fillCompanyAdmin(comid){
    const admlist = ADMIN.getCompany(comid).getAdmin();
    // console.log(admlist);
    $('.admincontrol-ui-admin-manage-widget-con').empty();
    $.each(admlist, function(key, value){
        if(value.accid != undefined && value.accid != null && value.accid != ''){
            $('.admincontrol-ui-admin-manage-widget-con').append(`<span accid="${value.accid}" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};" class="admincontrol-ui-admin-manage-widget btn-shadow">${value.firstname} ${value.lastname}</span>`);
        }
    });
}
function fillCompanyCreate(){
    const comlobj = ADMIN.getCompanyList();
    $('.admincontrol-ui-ccreate-widget-con').empty();
    $.each(comlobj, function(key, value){
        const comobj = value.getObj();
        // console.log(comobj);
        const html = `<span comid="${comobj.companyid}" dtid="${comobj.databaseid}" stat="${comobj.status}" class="admincontrol-ui-ccreate-widget btn-shadow">${comobj.name}</span>`;
        $('.admincontrol-ui-ccreate-widget-con').append(html);

    });
}
function fillCompanyLicenseCurrent(companyid){
    const liccomobj = ADMIN.License.getLicenseByCompanyId(companyid);
    $('.admincontrol-ui-license-current').empty();
    $.each(liccomobj, function(key, value){
        const licobj = licenseToData(value.licenseid);
        let statuscolor;
        if(value.status == "active"){
            statuscolor = GREEN_PALETTE;
        }else if(value.status == "expiring"){
            statuscolor = YELLOW_PALETTE;
        }else if(value.status == "archived"){
            statuscolor = RED_PALETTE;
        }
        const html = `<div class="admincontrol-ui-license-current-key">
            <div class="details">
                <span class="">${value.id} &bull; ${licobj.duration} &bull; ${licobj.modulename} </span>
                <span class="">${value.startdate} &bull; ${value.enddate}</span>
            </div>
            <div class="action">
                <i class="fas fa-circle" style="color: ${statuscolor}; "></i>
            </div>
        </div>`;
        $('.admincontrol-ui-license-current').append(html);
    });
    console.log(liccomobj);
    
}


$('.admincontrol-ui-navigation-widget').click(function(){
    const cid = $(this).attr('cid');
    // $('#admincontrol-ui-mods-refresh').parent('.admincontrol-ui-mods-widget').removeClass('hidden').show();
    // $('#admincontrol-ui-mods-add-project').parent('.admincontrol-ui-mods-widget').hide();
    // console.log(cid);
    $('.admincontrol-ui-navigation').children('.admincontrol-ui-navigation-widget').each(function(){
        const zid = $(this).attr('cid');
        if(zid == cid){
            $(this).addClass('selected');
        }else{
            $(this).removeClass('selected');
        }
    });
    $('.admincontrol-ui-body').children('.admincontrol-ui-body-widget-').hide();
    $('.admincontrol-ui-body').children('.admincontrol-ui-body-widget').hide();
    $(`.admincontrol-ui-body-${cid}`).css('display', 'flex').show();
    $('.admincontrol-ui-body').css('display', 'flex').show();
    if(cid == 'modules'){
        cidModules();
    }
    if(cid == 'admins'){
        cidAdmins();
        $('#admincontrol-ui-mods-create-admin').parent('.admincontrol-ui-mods-widget').css('display', 'flex').show();
    }else{
        $('#admincontrol-ui-mods-create-admin').parent('.admincontrol-ui-mods-widget').hide();
    }
    if(cid == 'license'){
        cidLicense();
        // $('.admincontrol-ui-license-add').css('display', 'none').hide();
        // $('.admincontrol-ui-license-current').css('display', 'none').hide();
    }
    if(cid == 'complain-manage'){
        cidComplain();
        $('.complain-details-widget-con').css('display', 'none').hide();
        // $('.admincontrol-ui-license-current').css('display', 'none').hide();
    }
    if(cid == 'create-company'){
        cidCreateCompany();
        $('#admincontrol-ui-mods-create-company').parent('.admincontrol-ui-mods-widget').css('display', 'flex').show();
        $('.admincontrol-ui-ccreate-update').css('display', 'none').hide();
        $('.admincontrol-ui-ccreate-create').css('display', 'none').hide();
    }else{
        $('#admincontrol-ui-mods-create-company').parent('.admincontrol-ui-mods-widget').hide();
    }

    

    
});
$('.admincontrol-ui-mods-widget').click(function(){
    const id = $(this).children('span').attr('id');
    // console.log('in', id);
    $('#admincontrol-ui-mods-add-project').parent('.admincontrol-ui-mods-widget').hide();

    if(id.includes('dashboard')){
        console.log('in dashboard');

    }

    if(id.includes('compfresh')){
        showReloadReport("Fetching Data.. Please wait..");
        setTimeout(() => {
            const cb =data=>{
                console.log(data);
                const cb1 =data=>{
                    console.log(data);
                    setTimeout(() => {
                        fillComplains();
                        hideReloadReport();
                    }, 0);
                };
                COMPANY.checkList("Complains", cb1, true);
            };
            ADMIN.checkList("Company", cb, true);
        }, 0);
    }
    if(id.includes('refresh')){
        const comlobj = ADMIN.getCompanyList();
        showLoadingReport('Refreshing Data.. Please Wait');
        setTimeout(() => {
            $.each(comlobj, function(key, value){
                const comobj = value.getObj();
                const cb =data=>{
                    console.log(data);
                    const cb1 =data=>{
                        console.log(data);
                    }
                    ADMIN.getCompany(comobj.companyid).checkList("Admin", cb1, true);
                }
                ADMIN.getCompany(comobj.companyid).checkList("Module", cb, true);
            });
            setTimeout(() => {
                const cb2 =data=>{
                    console.log(data);
                    hideLoadingReport();
                }
                ADMIN.checkList('Company', cb2);
            }, 0);
        }, 0);
    }
    if(id.includes('create-company')){
        console.log('in create company');
        $('.admincontrol-ui-ccreate-create').css('display','flex').show();
        $('.admincontrol-ui-ccreate-update').hide();
        $('#admincontrol-ui-ccreate-create-comid').val(rngCompanyId());
        $('#admincontrol-ui-ccreate-create-dtid').val(rngDatabaseId());
    }
    if(id.includes('create-admin')){
        // console.log('in create company');
        $('.admincontrol-ui-admin-manage').hide();
        $('.admincontrol-ui-admin-create').css('display', 'flex').show();
        // console.log(rngId());
        $('#admincontrol-ui-admin-create-accid').val(rngId(1));
    }
    if(id.includes('create-license')){
        // console.log('in create company');
        $('.admincontrol-ui-license-add').css('display', 'flex').show();
    }
});

$(document).on('click', '.moduleman-company-widget', function(){
    const comname = $(this).text();
    const comid = $(this).attr('comid');
    $('#moduleman-company-modules-title').text("Active Modules of " + comname).attr('comid', comid);

    fillCompanyModule(comid);
    // setTimeout(() => {
    fillModuleList();
    $('.moduleman-company-modules').show();
    $('.moduleman-module-list').show();
});
$(document).on('click', '.admincontrol-ui-admin-widget', function(){
    const comname = $(this).text();
    const comid = $(this).attr('comid');
    $('#admincontrol-ui-admin-company-title').children('b').text(comname).attr('comid', comid);
    $('#admincontrol-ui-admin-create-title').children('b').text(comname).attr('comid', comid);
    fillCompanyAdmin(comid);
    $('.admincontrol-ui-admin-manage').css('display', 'flex').show();
    $('#admincontrol-ui-admin-create-comid').val(comid);

    // $('.moduleman-module-list').show();
});
$(document).on('click', '.admincontrol-ui-ccreate-widget', function(){
    const comname = $(this).text();
    const comid = $(this).attr('comid');
    const databaseid = $(this).attr('dtid');
    const status = $(this).attr('stat');



    $('#admincontrol-ui-ccreate-update-comid').html(`${comid}<i id="admincontrol-ui-ccreate-create-copy" dtid="${comid}" class="fas fa-clipboard"></i>`);
    $('#admincontrol-ui-ccreate-update-comname').text(comname);
    $('#admincontrol-ui-ccreate-update-dtid').html(`${databaseid}<i id="admincontrol-ui-ccreate-create-copy" dtid="${databaseid}" class="fas fa-clipboard"></i>`);
    $('#admincontrol-ui-ccreate-update-stat').html(`${status}<i status="${status}" comid="${comid}" id="admincontrol-ui-ccreate-create-update" class="fas ${status == "inactive" ? "fa-toggle-off" : "fa-toggle-on"}"></i>`);

    $('.admincontrol-ui-ccreate-update').css('display', 'flex').show();
    $('.admincontrol-ui-ccreate-create').css('display', 'none').hide();
    // fillCompanyAdmin(comid);
    // $('.admincontrol-ui-admin-manage').css('display', 'flex').show();
    // $('#admincontrol-ui-admin-create-comid').val(comid);

    // $('.moduleman-module-list').show();
});
$(document).on('click', '.admincontrol-ui-license-widget', function(){
    const comname = $(this).text();
    const comid = $(this).attr('comid');
    fillCompanyLicenseCurrent(comid);
    $('.admincontrol-ui-license-add').children('span').text(`ADD LICENSE to ${comname}`).attr('comid', comid);


    $('.admincontrol-ui-license-current').css('display', 'flex').show();
    $('.admincontrol-ui-license-add').css('display', 'flex').show();
});


$('.moduleman-company-modules').droppable({
    accept: ".moduleman-module-list-widget", // this will determine which elements are accepted to drop in this case all element with the class of moduleman-module-list-widget will drop
    drop: function( event, ui ) {
        // $(this).css('background-color', 'red');

        let moduleui = $(ui.draggable).attr('ui'); // same with the draggable. if you use this code, you can access the draggable element thats being dropped 
        const modulename = $(ui.draggable).text();
        let color = $(this).css('background-color');
        const comid =  $('#moduleman-company-modules-title').attr('comid');

        // setCookie("DATABASE_ID", comobj.databaseid, 1);
        // console.log(comobj.databaseid);
        // just ignore this code
        console.log(rgb2hex(color).toUpperCase(), YELLOW_PALETTE);
        if(rgb2hex(color).toUpperCase() == YELLOW_PALETTE){
            showNotification('Module Management','The Module You are trying to add is already added');
        }else{
            // console.log('Able to Add', sessionStorage.getItem('comid'));
            console.log(comid, modulename);
            showNotification('Module Management', `You have successfuly added the Module ${modulename}`);
            const comobj = ADMIN.getCompany(comid).getObj();
            // console.log(comobj.databaseid);
            const options = {
                "id" : rngCompanyModuleId(),
                'companyid' : comid,
                'modulename' : modulename,
                'moduleui' : moduleui,
                'databaseid' : comobj.databaseid
            }
            const callback =()=>{
                console.log(options);
                setTimeout(() => {
                    const cb =()=>{
                        setTimeout(() => {
                            ADMIN.getCompany(comid).addModule(options);
                            setTimeout(() => {
                                fillCompanyModule(comid);
                            }, 0);
                        }, 0);
                    }
                    capi_admincreatecompanymodule(options, data=>{console.log(data)}, cb);
                }, 0);
            }
            ADMIN.getCompany(comid).createModule(options, callback);

        }
    }
});

$(document).on('dblclick', '.moduleman-company-modules-widget', function(){
    let moduleui = $(this).attr('ui');
    let id = $(this).attr('mid');
    const comid =  $('#moduleman-company-modules-title').attr('comid');
    const comobj = ADMIN.getCompany(comid).getObj();

    const options = {
        "id" : id,
        "moduleui" : moduleui,
        "databaseid" : comobj.databaseid,
    }
    // console.log(companyid, moduleui);
    // api_deleteCompanyModule(companyid, moduleui);
    // api_fetchCompanyModule(companyid, 'moduleman-company-widget');
    const callback =()=>{
        setTimeout(() => {
            const callback =()=>{
                setTimeout(() => {
                    fillCompanyModule(comid);
                }, 0);
            }
            capi_admindeletecompanymodule(options, callback);
        }, 0);
    }
    ADMIN.getCompany(comid).deleteModule(options, callback);
});


$('#admincontrol-ui-admin-create-submit').click(function(){
    // $('#admincontrol-ui-admin-create-accid').val(rngId(1));
    const options = {
        'accid' : $('#admincontrol-ui-admin-create-accid').val(),
        'companyid' : $('#admincontrol-ui-admin-create-comid').val(),
        'firstname' : $('#admincontrol-ui-admin-create-fname').val(),
        'lastname' : $('#admincontrol-ui-admin-create-lname').val(),
        'password' : $('#admincontrol-ui-admin-create-pword').val()
    }
    
    const comobj = ADMIN.getCompany(options.companyid).getObj();
    const dd = dateFns.format(
        new Date(),
        'YYYY-MM-DD'
    )
    const zoptions = {
        'id' : options.accid,
        'companyid' : options.companyid,
        'email' : $('#admincontrol-ui-admin-create-email').val(),
        'password' : options.password,
        'userlevel' : "1",
        'lastname' : options.lastname,
        'firstname' : options.firstname,
        'phone' : "",
        'birthdate' : dd,
        'position' : "",
        'department' : "",
        'superid' : "independent",
        'databaseid' : comobj.databaseid
    }

    function testString(str){
        if(str == "" || str.length <= 3 || str.length > 100){
            return true;
        }else{
            return false;
        }
    }

    let gate = true;
    if(testString(options.accid)){
        gate = false;
        blinkbg($('#admincontrol-ui-admin-create-accid'), RED_PALETTE, 'white');
    }
    if(testString(options.companyid)){
        gate = false;
        blinkbg($('#admincontrol-ui-admin-create-comid'), RED_PALETTE, 'white');
    }
    if(testString(options.firstname)){
        gate = false;
        blinkbg($('#admincontrol-ui-admin-create-fname'), RED_PALETTE, 'white');
    }
    if(testString(options.lastname)){
        gate = false;
        blinkbg($('#admincontrol-ui-admin-create-lname'), RED_PALETTE, 'white');
    }
    if(testString(options.password)){
        gate = false;
        blinkbg($('#admincontrol-ui-admin-create-pword'), RED_PALETTE, 'white');
    }
    if(testString($('#admincontrol-ui-admin-create-email').val())){
        gate = false;
        blinkbg($('#admincontrol-ui-admin-create-email'), RED_PALETTE, 'white');
    }

    if(gate){
        console.log(zoptions);
        const callback =()=>{
            setTimeout(() => {
                const cbsuccess =data=>{
                    console.log(data);
                }
                const cbcomplete =()=>{
                    $('#admincontrol-ui-admin-create-accid').val("");
                    $('#admincontrol-ui-admin-create-fname').val("");
                    $('#admincontrol-ui-admin-create-lname').val("");
                    $('#admincontrol-ui-admin-create-pword').val("");
                    $('#admincontrol-ui-admin-create-email').val("");
                    showNotification("Account Creation Success", "You have successfuly created an Admin Account.");
                    setTimeout(() => {
                        fillCompanyAdmin(options.companyid);
                    }, 0);
                }
                capi_adminCreateAccount(zoptions, cbsuccess, cbcomplete);
            }, 0);
        }
        ADMIN.getCompany(options.companyid).createAdmin(options, callback);
        // ADMIN.getCompany(options.companyid).addAdmin(options);
    }else{
        showNotification("Form Review", "Please Fill up Fields. Minimum 3 and Maximum 99 characters.");
    }
});
$('#admincontrol-ui-ccreate-create-submit').click(function(){
    const options = {
        'companyid' : $('#admincontrol-ui-ccreate-create-comid').val(),
        'databaseid' : $('#admincontrol-ui-ccreate-create-dtid').val(),
        'name' : $('#admincontrol-ui-ccreate-create-name').val()
    }

    let gate = true;
    if(testString(options.name)){
        gate = false;
        blinkbg($('#admincontrol-ui-ccreate-create-name'), RED_PALETTE, 'white');
    }

    function testString(str){
        if(str == "" || str.length <= 3 || str.length > 100){
            return true;
        }else{
            return false;
        }
    }

    if(gate){
        const callback=()=>{
            setTimeout(() => {
                // ADMIN.addCompany(options);
                setTimeout(() => {
                    fillCompanyCreate();
                    $('#admincontrol-ui-ccreate-create-name').val("");
                    showNotification("Company Create", `You have created a new Company ${options.name}`);
                    $('.admincontrol-ui-ccreate-create').hide();
                    $('.admincontrol-ui-ccreate-update').hide();
                }, 0);
            }, 0);
        }
        ADMIN.createCompany(options, callback);
    }


});
$('#admincontrol-ui-license-add-submit').click(function(){
    const companyid = $('.admincontrol-ui-license-add').children('span').attr('comid');
    const key = $('#admincontrol-ui-license-add-key').val();
    // console.log(companyid, key);
    if(ADMIN.License.isLicenseAvailable(key)){
        const options = {
            'id' : key,
            'companyid' :companyid
        }
        const cb =()=>{
            fillCompanyLicenseCurrent(companyid);
            showNotification("License Assignment", "License has been successfuly assigned to the Company.");
            $('#admincontrol-ui-license-add-key').val("");
        };
        ADMIN.License.updateCompanyId(options, cb);
    }else{
        showNotification("License Assignment", "This Key has already been claimed!");
        $('#admincontrol-ui-license-add-key').val("");
    }
});

$('#admincontrol-ui-license-add-key').focus(function(){
    this.setSelectionRange(0, this.value.length);
});


$(document).on("click", "#admincontrol-ui-ccreate-create-update", function(){
    const status = $(this).attr('status');
    const comid = $(this).attr('comid');
    const dis = $(this);

    if(status == "inactive"){
        console.log("make it active");
        const obj = {
            "companyid" : comid,
            "status" : 'active'
        }
        const cbtrue =()=>{
            console.log(obj);
            const callback =()=>{
                fillCompanyCreate();
                $('#admincontrol-ui-ccreate-update-stat').html(`${obj.status}<i status="${obj.status}" comid="${comid}" id="admincontrol-ui-ccreate-create-update" class="fas ${obj.status == "inactive" ? "fa-toggle-off" : "fa-toggle-on"}"></i>`);
            }
            ADMIN.updateCompanyStatus(obj, callback);
        }
        showAction("Set Company Status to Active?", cbtrue, ()=>{showNotification("Company Status", "Company Status remains inactive")});
    }else{
        console.log("make it inactive");
        const obj = {
            "companyid" : comid,
            "status" : 'inactive'
        }
        const cbtrue =()=>{
            console.log(obj);
            const callback =()=>{
                fillCompanyCreate();
                $('#admincontrol-ui-ccreate-update-stat').html(`${obj.status}<i status="${obj.status}" comid="${comid}" id="admincontrol-ui-ccreate-create-update" class="fas ${obj.status == "inactive" ? "fa-toggle-off" : "fa-toggle-on"}"></i>`);

            }
            ADMIN.updateCompanyStatus(obj, callback);
        }
        showAction("Set Company Status to Inactive? Users of this Company wont be able to Login. Proceed?", cbtrue, ()=>{showNotification("Company Status", "Company Status remains active")});
    }

});
$(document).on("click", "#admincontrol-ui-ccreate-create-copy", function(){
    Clipboard_Copy($(this).attr('dtid'));
    showNotification("Clipboard", "Data Copied to Clipboard!");
});