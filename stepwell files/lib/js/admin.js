let positionList = [];
let departmentList = [];
let accountList = [];

// class Account{
//     constructor(id, companyid, email, password, userlevel, lastname, firstname, phone, birthdate, position, department, photo, superid){
//         this.id = id;
//         this.companyid = companyid;
//         this.email = email;
//         this.password = password;
//         this.userlevel = userlevel;
//         this.lastname = lastname;
//         this.firstname = firstname;
//         this.phone = phone;
//         this.birthdate = birthdate;
//         this.position = position;
//         this.department = department;
//         this.photo = photo;
//         this.superid = superid;
//         // addToList();
//     }

//     // addToList(){
//     //     accountList[accountList.length] = {
//     //         'id' : this.id,
//     //         'class': this
//     //     }
//     // }
//     update(email, userlevel, lastname, firstname, phone, birthdate, position, department, callback=()=>{}){
//         this.email = email;
//         this.userlevel = userlevel;
//         this.lastname = lastname;
//         this.firstname = firstname;
//         this.phone = phone;
//         this.birthdate = birthdate;
//         this.position = position;
//         this.department = department;
//         callback();
//     }
//     getMinData(){
//         return {
//             'id' : this.id,
//             'email' : this.email,
//             'userlevel' : this.userlevel,
//             'firstname' : this.firstname,
//             'lastname' : this.lastname,
//             'position' : this.position,
//             'department' : this.department,
//             'phone' : this.phone,
//             'birthdate' : this.birthdate,
//             'photo' : this.photo,
//             'superid' : this.superid
//         }
//     }
//     getId(){
//         return this.id;
//     }
//     createAccount(){
//         const cbcomplete = () => {
//             const cbcomplete1=()=>{
//                 console.log('createAccount Done');
//             };
//             console.log('api_createAccountSupervisor', this.id, this.superid);
//             api_createAccountSupervisor(this.id, this.superid, cbcomplete1);
//         };
//         api_createAccount(this.id, this.companyid, this.email, this.password, this.userlevel, this.lastname, this.firstname, this.phone, this.birthdate, this.position, this.department, cbcomplete);
//     }
//     updateAccount(email, userlevel, lastname, firstname, phone, birthdate, position, department, callback=()=>{}){
//         const cbcomplete = () => {
//             this.update(email, userlevel, lastname, firstname, phone, birthdate, position, department, callback);
//         };
//         api_updateAccount(this.id, email, userlevel, lastname, firstname, phone, birthdate, position, department, cbcomplete);
//     }

//     test(){
//         console.log('test');
//         // const cbcomplete=()=>{

//         // };
//         // api_createAccountSupervisor('pepet', 'bulag', cbcomplete);
//     }

// }




let password_status = 'idle';
let conList = [
    // $('.dashboard-superadmin-con'),
    // $('.dashboard-admin-con'),
    // $('.dashboard-superuser-con'),
    // $('.dashboard-user-con'),
    // $('.account-create-con'),
    // $('.account-manage-con'),
    // $('.crposition-con'),
    // $('.crdepartment-con'),
    // $('.projects-launch-con'),
    // $('#project-launch1-con'),
    // $('#project-launch2-con'),
    // $('.projects-create-con'),
    // $('.projects-manage-con'),
    // $('.company-create-con'),
    // $('.company-manage-con'),
    // $('.admin-create-con'),
    // $('.admin-manage-con'),
    // $('.admin-access-con'),
    // $('.license-create-con'),
    // $('.license-manage-con'),
    // $('.module-create-con'),
    // $('.module-manage-con'),
    // $('.complain-con'),
    // $('.other-con')
    $('.nav-maincontainer'),
    $('#navcon-document'),
    $('#administration-navigation-widget-control'),
    $('#administration-navigation-widget-system'),
    $('#administration-navigation-widget-group'),
    $('#administration-navigation-widget-account'),
    $('#administration-navigation-widget-position'),
    $('#administration-navigation-widget-department'),
    $('#navcon-webmsg')
    
    
];
let navConList = [
    $('#navcon-dashboard-superadmin'),
    $('#navcon-dashboard-admin'),
    $('#navcon-dashboard-superuser'),
    $('#navcon-dashboard-user'),
    // $('#navcon-account'),
    $('#nav-accounts-create'),
    $('#nav-accounts-manage'),
    $('#nav-uac'),
    $('#nav-crposition'),
    $('#nav-crdepartment'),
    $('#navcon-groups'),
    $('#navcon-projects'),
    $('#nav-projects-create'),
    $('#nav-projects-manage'),
    $('#navcon-company'),
    $('#nav-company-create'),
    $('#nav-company-manage'),
    $('#navcon-admin'),
    $('#nav-admin-create'),
    $('#nav-admin-manage'),
    $('#navcon-adminacc'),
    $('#navcon-license'),
    $('#nav-license-create'),
    $('#nav-license-manage'),
    $('#navcon-moduleman'),
    // $('#nav-module-create'),
    // $('#nav-module-manage'),
    $('#navcon-complain'),
    $('#navcon-other'),
    $('#navcon-skidbuilder'),
    $('#navcon-docuchat'),
    $('#navcon-modules'),
    $('#nav-modules-docuchart'),
    $('#nav-modules-docbuilder'),
    $('#nav-modules-docflow'),
    $('#nav-modules-skidbuilder'),
    $('#nav-modules-processbuilder'),
    $('#navcon-administration')
    
];
let nav_vipConList = [
    $('#navcon-dashboard'),
    $('#navcon-company'),
    $('#nav-company-create'),
    $('#nav-company-manage'),
    $('#navcon-admin'),
    $('#nav-admin-create'),
    $('#nav-admin-manage'),
    $('#navcon-adminacc'),
    $('#navcon-license'),
    $('#nav-license-create'),
    $('#nav-license-manage'),
    $('#navcon-moduleman'),
    $('#navcon-complain'),
    $('#navcon-other'),
    $('#navcon-skidbuilder'),
    $('#navcon-webmsg')
    
];
let nav_ceoConList = [
    $('#navcon-dashboard'),
    $('#navcon-document'),
    // $('#navcon-account'),
    // $('#nav-accounts-create'),
    // $('#nav-accounts-manage'),
    // $('#navcon-crposition'),
    // $('#navcon-crdepartment'),
    // $('#navcon-uac'),
    // $('#navcon-groups'),
    $('#navcon-projects'),
    // $('#nav-projects-create'),
    // $('#nav-projects-manage'),
    $('#navcon-administration'),
    // $('#nav-uac'),
    // $('#nav-crposition'),
    // $('#nav-crdepartment'),

    $('#administration-navigation-widget-control'),
    $('#administration-navigation-widget-system'),
    $('#administration-navigation-widget-group'),
    $('#administration-navigation-widget-account'),
    $('#administration-navigation-widget-position'),
    $('#administration-navigation-widget-department')
];
let nav_supConList = [
    // $('#navcon-account'),
    // $('#navcon-dashboard-superuser'),
    // $('#nav-accounts-create'),
    // $('#nav-accounts-manage'),
    // $('#navcon-groups'),
    // $('#nav-projects-create'),
    // $('#nav-projects-manage'),
    // $('#navcon-administration'),
    // $('#nav-crposition'),
    // $('#nav-crdepartment'),
    // $('#nav-uac'),

    
    $('#navcon-document'),
    $('#navcon-dashboard'),
    $('#navcon-projects'),
    $('#navcon-administration'),
    $('#administration-navigation-widget-control'),
    $('#administration-navigation-widget-system'),
    $('#administration-navigation-widget-group'),
    $('#administration-navigation-widget-position'),
    $('#administration-navigation-widget-department')
];
let nav_usrConList = [
    $('#navcon-document'),
    $('#navcon-dashboard'),
    $('#navcon-projects'),
    $('#navcon-administration'),
    $('#administration-navigation-widget-group')
];




//navigation functions towards other pages
$('.nav-widget-con.module.proflow').click(function(){
    window.location.href = domain + 'pages/proflow'
});
$('.nav-widget-con.module.docbuilder').click(function(){
    window.location.href = domain + 'pages/docbuilder'
});
$('.nav-widget-con.module.docflow').click(function(){
    window.location.href = domain + 'pages/docflow';
});
// $('#nav-modules-skidbuilder').click(function(){
//     window.location.href = domain + 'pages/skidbuilder';
// });
// $('#nav-modules-processbuilder').click(function(){
//     console.log('process');
//     window.location.href = domain + 'pages/processbuilder';
// });

// PROJECT SCHEDULES EVENT
function cidDepartment(){
    $('#administration-header-projectid').text('Department').attr('con', 'department');
    // api_fetchDepartments(__COMPANY_ID, 'departmenttab');
    COMPANY.fillDepartments('#department-list');

}
function cidPosition(){
    $('#administration-header-projectid').text('Schedules').attr('con', 'position');
    // api_fetchPositions(__COMPANY_ID , 'positiontab');
    // api_fetchDepartments(__COMPANY_ID, 'position-search-department');
    
    COMPANY.fillPositions('#position-list');
    COMPANY.fillDepartmentsTag('#position-assign-department');
    COMPANY.fillDepartmentsTag('#position-search-department');
    $('#position-search-department').prepend('<option value="na" selected disabled>Select Department</option>');
}
function cidAccount(){
    // const x = ;
    // fetchAccountData(nav_accounts_manage);

    // nav_accounts_manage();
    
    // COMPANY.fillPositionsTag('#suuser-view-position');
    const cb =()=>{
        setTimeout(() => {
            $('#administration-header-projectid').text('Account').attr('con', 'account');
            $('#administration-mods-create-account').parent('.administration-mods-widget').removeClass('hidden').show();
            $('.suuser-userprofile').hide();
            
            $('#suuser-search-list').empty();
            let category = $('#suuser-search-userlevel').val();
            console.log(category);
            let list = COMPANY.getCompanyAccountsByUserLevel('na');
            console.log(list);
            COMPANY.fill('#suuser-search-list', list);
            COMPANY.fillDepartmentsTag('#suuser-view-department');
        }, 0);
    };
    COMPANY.AccUser.checkList("COMPANY_ACCOUNTS", cb);

}
function cidGroup(){
    $('#administration-header-projectid').text('Group').attr('con', 'group');
    // nav_groups();
    // api_fetchGroupById(__ID, 'nav-groups-manage');
    // const cbcomplete=data=>{
        // console.log(data);
        $('#groups-create-id').val(rngGroupId());
        $('.group-manage-view-con').hide();
        $('.group-manage-connect-con').hide();
        $('#administration-mods-create-group').parent('.administration-mods-widget').show();

        setTimeout(function(){
            // const list = COMPANY.getGroupsConnectedTo();
            // console.log(list);
            // COMPANY.fill('#group-manage-list', list);
            const prgr = ACCUSER.getProjectsWithOccupiedGroupId();
            const prrgrr = ACCUSER.ProjectGroup.getProjectGroups();

            console.log(prgr, prrgrr);
            
            $('#group-manage-list').empty();
            $.each(prgr, function(key, value){
                const grid = value.groupid.split('_').pop();
                const grobj = ACCUSER.ProjectGroup.fetchProjectGroupById({"groupid" : grid}, ()=>{});
                // console.log(grobj);
                let gate = true;
                $('.group-manage-list-widget').each(function(){
                    const id = $(this).attr('id');
                    if(id == grobj.id){
                        gate = false;
                    }
                });
                if(gate){
                    $('#group-manage-list').append(`
                        <span id="${grobj.id}" owner="${grobj.ownerid}" class="group-manage-list-widget group-manage-list-widget_${grobj.id} btn-shadow" 
                        style="color: white; background-color: ${BTN_COLOR}" >${grobj.name}</span>
                    `);
                }
            });
            $.each(prrgrr, function(key, value){
                const grid = value.id;
                const grobj = ACCUSER.ProjectGroup.fetchProjectGroupById({"groupid" : grid}, ()=>{});
                // console.log(grobj);
                let gate = true;
                $('.group-manage-list-widget').each(function(){
                    const id = $(this).attr('id');
                    if(id == grobj.id){
                        gate = false;
                    }
                });
                if(gate){
                    $('#group-manage-list').append(`
                        <span id="${grobj.id}" owner="${grobj.ownerid}" class="group-manage-list-widget group-manage-list-widget_${grobj.id} btn-shadow" 
                        style="color: white; background-color: ${BTN_COLOR}" >${grobj.name}</span>
                    `);
                }
            });

        }, 0);
    // };
    // COMPANY.checkList('Group', cbcomplete);
    // COMPANY.checkList('Group', data=>console.log(data));
}
function cidSystem(){
    $('#administration-header-projectid').text('Document System').attr('con', 'system');
    api_fetchDocumentCategory(__COMPANY_ID, 'cidSystem');
}
function cidControl(){
    
    const cb =()=>{
        setTimeout(() => {
            $('#administration-header-projectid').text('Account Access Control').attr('con', 'control');
            nav_uac(); 
        }, 0);
    };
    COMPANY.AccUser.checkList("COMPANY_ACCOUNTS", cb);
}
$('.administration-navigation-widget').click(function(){
    const cid = $(this).attr('cid');
    $('#administration-mods-refresh').parent('.administration-mods-widget').removeClass('hidden').show();
    $('#administration-mods-add-project').parent('.administration-mods-widget').hide();
    // console.log(cid);
    $('.administration-navigation').children('.administration-navigation-widget').each(function(){
        const zid = $(this).attr('cid');
        if(zid == cid){
            $(this).addClass('selected');
        }else{
            $(this).removeClass('selected');
        }
    });
    $('.administration-body').children('.administration-body-widget-').hide();
    $('.administration-body').children('.administration-body-widget').hide();
    $(`.administration-body-${cid}`).css('display', 'flex').show();
    $('.administration-body').show();
    if(cid == 'department'){
        cidDepartment();
    }
    if(cid == 'position'){
        cidPosition();
    }
    if(cid == 'account'){
        const cb=()=>{
            cidAccount();
        }
        // cidAccount();
        COMPANY.AccUser.checkList('COMPANY_ACCOUNTS', cb);
    }else{
        $('#administration-mods-create-account').parent('.administration-mods-widget').addClass('hidden').hide();
    }
    if(cid == 'group'){

        const cb=()=>{
            const cb=()=>{
                $('#administration-mods-create-group').parent().css('display', 'flex').show();
                cidGroup();
            }
            ACCUSER.checkList('COMPANY_ACCOUNTS',cb);
        }
        ACCUSER.checkList('ProjectGroup',cb);
        // COMPANY.AccUser.checkList('COMPANY_ACCOUNTS', cb);
    }else{
        $('#administration-mods-create-group').parent().hide();
    }
    if(cid == 'system'){
        cidSystem();
    }
    if(cid == 'control'){
        const cb=()=>{
            cidControl();
        }
        // cidAccount();
        COMPANY.AccUser.checkList('COMPANY_ACCOUNTS', cb);
    }
});
$('.administration-mods-widget').click(function(){
    const id = $(this).children('span').attr('id');
    console.log('in', id);
    $('#administration-mods-add-project').parent('.administration-mods-widget').hide();
    if(id.includes('close-group')){
        $('.groups-con').show();
        $('.groups-launch-con').hide();
        $('#administration-mods-close-group').parent('.administration-mods-widget').hide();
        $('#administration-mods-create-group').parent().show();
        
        const list = COMPANY.getGroupsConnectedTo();
        COMPANY.fill('#group-manage-list',list);
    }
    if(id.includes('dashboard')){
        $('#nav-dashboard').click();
    }
    if(id.includes('create-account')){
        console.log('in create');
        suuser_create_user_new();
        // fillSuperList(d, 'suuser-create');
       
    }
    if(id.includes('refresh')){
        let cid = '';
        showRefreshReport("Refreshing...");
        setTimeout(() => {
            const cb=()=>{
                ACCUSER.Alert.fill();
                $('.administration-navigation').children('span').each(function(){
                    if($(this).hasClass('selected')){
                        cid = $(this).attr('cid');
                    }
                });
                if(cid == 'account'){
                    accountList = [];
                    setTimeout(() => {
                        cidAccount();
                    }, 0);
                }
                if(cid == 'department'){
                    accountList = [];
                    setTimeout(() => {
                        const cb=()=>{
                            setTimeout(() => {
                                cidDepartment();
                            }, 0);
                        }
                        COMPANY.checkList('Departments',cb,true);
                    }, 0);
                }
                if(cid == 'position'){
                    accountList = [];
                    setTimeout(() => {
                        const cb=()=>{
                            setTimeout(() => {
                                cidPosition();
                            }, 0);
                        }
                        COMPANY.checkList('Positions',cb,true);
                    }, 0);
                }
                if(cid == 'group'){
                    accountList = [];
                    setTimeout(() => {
                        const cb=()=>{
                            const cb=()=>{
                                const cb=()=>{
                                    setTimeout(() => {
                                        $('#administration-mods-create-group').parent().css('display', 'flex').show();
                                        $('.groups-con-pr').hide();
                                        cidGroup();
                                    }, 0);
                                }
                                ACCUSER.checkList('Projects',cb, true);
                            }
                            ACCUSER.checkList('COMPANY_ACCOUNTS',cb, true);
                        }
                        ACCUSER.checkList('ProjectGroup',cb, true);
                    }, 0);
                }
                if(cid == 'system'){
                    accountList = [];
                    setTimeout(() => {
                        cidSystem();
                    }, 0);
                }
                if(cid == 'control'){
                    accountList = [];
                    setTimeout(() => {
                        cidControl();
                    }, 0);
                }
            }
            ACCUSER.checkList('Alert', cb, true);
            setTimeout(() => {
                hideRefreshReport();
            }, 0);
        }, 0);
    }
    if(id.includes('create-group')){
        console.log('create group');
        $('.group-manage-view-con').hide();
        $('.group-manage-connect-con').hide();
        $('.group-create-widget-con').show();
        $('.group-manage-view-projects').hide();
        $('.group-manage-view-content').show();
        
        $('#groups-create-id').val(rngGroupId());
    }
    if(id.includes('add-project')){
        console.log('add project');
        $('.group-manage-add-project').css('display', 'flex').show();

        $('#administration-mods-add-project').parent('.administration-mods-widget').css('display', 'flex').show();
        ACCUSER.fillSelectTagWithProjectsWithNoGroup($('#group-manage-add-project-projectid'));
    }
});


const uac_dragoption = {
    start: function(e, ui) {
        const name = $(ui.helper).text();
        const uid = $(ui.helper).attr('ui');
        let gate = true;
        let clone;
        $('.uac-user-modules-widget-con').children('.uac-user-modules-widget').each(function(){
            if($(this).attr('ui') == uid){
                gate = false;
                clone = $(this);
            }
        });
        if(gate){
            // console.log('not there');
            $('.uac-user-modules').css('background-color', GREEN_PALETTE);
        }else{
            // console.log('already there');
            blinkbg(clone, RED_PALETTE, BTN_COLOR);
            $('.uac-user-modules').css('background-color', YELLOW_PALETTE);
        }
    },
    drag: function() {
    //   counts[ 1 ]++;
    //   updateCounterStatus( $drag_counter, counts[ 1 ] );
    },
    stop: function() {
    //   counts[ 2 ]++;
    //   updateCounterStatus( $stop_counter, counts[ 2 ] );
        $('.uac-user-modules').css('background-color', SUB_COLOR);
    },
    opacity: 0.7,
    helper: "clone",
    // containment: ".administration-body-widget",
    scroll: false,
    cursorAt: { bottom: 0, left: 150},
    revert: "invalid"
};

// nav functions default events
// $('#suuser-create-user-new').click(function(){
    
// });
$('#account-create-container-close').click(function(){
    $('#account-create-container').hide();
    $('.suuser-userprofile').show();
});
$('#group-create-rngid').click(function(){
    $('#groups-create-id').val(rngGroupId());
    // api_fetchGroupById(__ID, 'nav-groups-manage');
    $('.group-manage-view-con').hide();
    $('.group-manage-connect-con').hide();
});
function fetchAccountData(callback=()=>{}){
    console.log(accountList.length);
    if(accountList.length <= 0){
        const cbcomplete=()=>{
            const cbcomplete1=()=>{
                const cbcomplete2=()=>{
                    callback();
                };
                api_fetchPositions(__COMPANY_ID, 'fetchAccountData', cbcomplete2);
            };
            api_fetchDepartments(__COMPANY_ID, 'fetchAccountData', cbcomplete1)
        };
        api_fetchAccount(__COMPANY_ID, 'na', 'fetchAccountData', {}, cbcomplete);
    }else{
        callback();
    }
}
function fetchAccountByuserLevel(userlevel=''){
    let list = [];
    if(__COMPANY_ID != ''){

        if(userlevel == ''){
            for(i=0; i<accountList.length; i++){
                const x = accountList[i].class;
                const l = x.getMinData();
                if(parseInt(l.userlevel) > parseInt(__USER_LEVEL)){
                    list[list.length] = l;
                }
            };
        }else if(userlevel == 'na'){
            for(i=0; i<accountList.length; i++){
                const x = accountList[i].class;
                const l = x.getMinData();
                if(parseInt(l.userlevel) != 0){
                    list[list.length] = l;
                }
            };
        }else if(userlevel == '1'){
            for(i=0; i<accountList.length; i++){
                const x = accountList[i].class;
                const l = x.getMinData();
                if(parseInt(l.userlevel) == 1){
                    list[list.length] = l;
                }
            };
        }else if(userlevel == '2'){
            for(i=0; i<accountList.length; i++){
                const x = accountList[i].class;
                const l = x.getMinData();
                if(parseInt(l.userlevel) == 2){
                    list[list.length] = l;
                }
            };
        }else if(userlevel == '3'){
            for(i=0; i<accountList.length; i++){
                const x = accountList[i].class;
                const l = x.getMinData();
                if(parseInt(l.userlevel) == 3){
                    list[list.length] = l;
                }
            };
        }
        
    }else{
        alert('you are not logged in...');
        logout();
    }
    // console.log('zzz', list);
    return list;
}
function nav_accounts_manage(){
    console.log('test');
    // console.log(accountList);
    // console.log(departmentList);
    // console.log(positionList);

    $('#suuser-view-department').empty();
    $('#suuser-view-position').empty();
    $('#suuser-search-list').empty();

    const d = $('#suuser-view-department').val();

    $('#suuser-view-userlevel').empty();
    $('#suuser-view-userlevel').append(getUserlevelList());
    // fillSuperList('', 'suuser-view');

    for(i=0; i<departmentList.length; i++){
        $('#suuser-view-department').append(`
            <option value="${departmentList[i].id}">${departmentList[i].title}</option>
        `);
    }
    for(i=0; i<positionList.length; i++){
        if(positionList[i].department == d){
            $('#suuser-view-position').append(`
                <option value="${positionList[i].id}">${positionList[i].title}</option>
            `);
        }
    }

    const acvalue = fetchAccountByuserLevel();
    console.log('acvalue', acvalue);
    for(i=0; i< acvalue.length; i++){
        $('#suuser-search-list').append(`
            <span class="btn-shadow suuser-search-list-widget" id="${acvalue[i].id}" 
            userlevel="${acvalue[i].userlevel}"lastname="${acvalue[i].lastname}"firstname="${acvalue[i].firstname}"phone="${acvalue[i].phone}"
            birthdate="${acvalue[i].birthdate}"position="${acvalue[i].position}"department="${acvalue[i].department}" supervisor="${acvalue[i].superid}"
            email="${acvalue[i].email}" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};">${acvalue[i].firstname} ${acvalue[i].lastname}</span>
        `);
    }
}
function suuser_create_user_new(){
    $('#account-create-container').css('display', 'flex').show();
    $('.suuser-userprofile').hide();
    $('#suuser-create-department').empty();
    $('#suuser-create-position').empty();
    $('#suuser-create-supervisor').empty();

    
    COMPANY.fillDepartmentsTag('#suuser-create-department');
    const list = COMPANY.getPositionsByDepartmentId($('#suuser-create-department').val());
    console.log(list);

    COMPANY.fillTag('#suuser-create-position', list);

    // api_fetchPositions(__COMPANY_ID , 'create-user-position-list');
    // api_fetchDepartments(__COMPANY_ID , 'create-user-department-list');
    // for(i=0; i<departmentList.length; i++){
    //     $('#suuser-create-department').append(`
    //         <option value="${departmentList[i].id}">${departmentList[i].title}</option>
    //     `);
    // }
    // const d = $('.suuser-create-department').val();
    // for(i=0; i<positionList.length; i++){
    //     if(positionList[i].department == d){
    //         $('#suuser-create-position').append(`
    //             <option value="${positionList[i].id}">${positionList[i].title}</option>
    //         `);
    //     }
    // }
    

    $('#suuser-create-userlevel').empty();
    $('#suuser-create-userlevel').append(getUserlevelList());

    const userlevel = $('#suuser-create-userlevel').val();
    const suplist = COMPANY.getSupervisorsByDepartment($('#suuser-create-department').val(), userlevel);
    console.log(suplist);
    COMPANY.fillTag('#suuser-create-supervisor', suplist);

    const id = rngId(userlevel);
    $('#suuser-create-id').text(id);

    $('.conf-password').hide();
    $('#conf-password-report').hide();
    const password = rngPassword();
    $('#suuser-create-password').val(password);
    $('#suuser-create-conf-password').val('');
    
    const date = new Date();
    const year = date.getFullYear();
    const day = date.getDate();
    let month = '';
    if(date.getMonth() > 9){
        month = (date.getMonth() + 1);
    }else{
        month = '0' + (date.getMonth() + 1);
    }
    const fdate = year + '-' + month + '-' + day;
    $('#suuser-create-birthdate').attr('value', fdate);

    $('#suuser-create-email').val("");
    $('#suuser-create-lastname').val("");
    $('#suuser-create-firstname').val("");
    $('#suuser-create-phone').val("");
    // $('#suuser-create-department').val('na');
    // fillSuperList('', 'suuser-create');
}
function nav_groups(){
    $('#groups-create-id').val(rngGroupId());
    api_fetchGroupById(__ID, 'nav-groups-manage');
    $('.group-manage-view-con').hide();
    $('.group-manage-connect-con').hide();
}
function nav_uac(){
    const comid = COMPANY.id;
    if(comid != '' && comid != null && comid != undefined){
        let list = COMPANY.getCompanyAccountsByUserLevel('na');
        console.log(list);
        COMPANY.fill('.uac-user-widget-con', list);
        // COMPANY.fillUsers('.uac-user-widget-con');
        api_fetchCompanyModule(__COMPANY_ID, 'uac-user-widget', uac_dragoption);
    }else{
        logout();
    }
}
function fillSuperList(department, view){
    let list = fetchAccountByuserLevel('na');
    $('#suuser-view-supervisor').empty();
    $('#suuser-create-supervisor').empty();
    console.log(list);

    if(view == 'suuser-view'){
        $('#suuser-view-supervisor').append(`
            <option value="independent">Independent Worker</option>
        `);
        if(department != ''){
            for(i=0; i<list.length; i++){
                if(list[i].department == department){
                    $('#suuser-view-supervisor').append(`
                        <option value="${list[i].id}">${list[i].firstname} ${list[i].lastname}</option>
                    `);
                }
            }
        }
    }else if(view == 'suuser-create'){
        $('#suuser-create-supervisor').append(`
            <option value="independent">Independent Worker</option>
        `);
        if(department != ''){
            for(i=0; i<list.length; i++){
                if(list[i].department == department){
                    $('#suuser-create-supervisor').append(`
                        <option value="${list[i].id}">${list[i].firstname} ${list[i].lastname}</option>
                    `);
                }
            }
        }
    }
}
$('.nav-widget-con').click(function(){
    const id = $(this).children('span').attr('id');
    // console.log(id);
    if(id != undefined && id != null && id != ''){
        if(id=="nav-accounts-manage"){
            nav_accounts_manage();
        }
        if(id=="suuser-create-user-new"){
            suuser_create_user_new();
        }
        if(id=="nav-crposition"){
            // api_fetchPositions(__COMPANY_ID , 'positiontab');
            // api_fetchDepartments(__COMPANY_ID, 'position-search-department');
        }
        if(id=="nav-crdepartment"){
            // api_fetchDepartments(__COMPANY_ID, 'departmenttab');
        }
        if(id=="nav-groups"){
            // nav_groups();
        }
        if(id=="nav-moduleman"){
            api_fetchAllCompany('nav-moduleman');
            $('.moduleman-company-modules').hide();
            $('.moduleman-module-list').hide();
        }
        if(id=="nav-uac"){
            // nav_uac();
        }
        if(id=="nav-document-upload"){
            $('.create-upload-con2').hide();
            $('.create-upload-con3').hide();
            $('.catlist').hide();
            $('.documents-edit').hide();
            $('.documents-prefs').hide();
        }
        if(id=="nav-dashboard"){
            // $('#nav-dashboard').click();
        }
        if(id.includes('administration')){
            console.log('here');
            const cb=(data)=>{
                console.log(data);
                const cb=(data)=>{
                    console.log(data);
                    const cb=(data)=>{
                        console.log(data);
                    }
                    COMPANY.checkList('AccUser',cb);
                }
                COMPANY.checkList('Positions',cb);
            }
            COMPANY.checkList('Departments',cb);
            
        }
    }
});


// events
$('#suuser-create-confirm').click(function(){
    const id = $('#suuser-create-id').text();
    const comid = COMPANY.id;
    const email = $('#suuser-create-email').val();
    let password = '';
    const userlevel = $('#suuser-create-userlevel').val();
    const lastname = $('#suuser-create-lastname').val();
    const firstname = $('#suuser-create-firstname').val();
    const phone = $('#suuser-create-phone').val();
    const birthdate = $('#suuser-create-birthdate').val();
    const position = $('#suuser-create-position').val();
    const department = $('#suuser-create-department').val();
    const superid = $('#suuser-create-supervisor').val();
    let gate = false;

    if(password_status == 'idle' || password_status == 'ok'){
        password = $('#suuser-create-password').val();
    }else if(password_status == 'error'){
        password = 'error';
    }

    if(userlevel != '' && id != '' && comid != '' && validateEmail(email) && lastname != '' && firstname != '' && phone != '' && position != '' && department != 'na' && birthdate != '' && password != ''){
        gate = true;
    }

    if(!validateEmail(email)){
        blinkbg($('#suuser-create-email'), 'red', 'white');
        $('#conf-report').text('Please provide a valid Email Address');
        flash($('#conf-report'));
    }
    
    if(password != 'error' && gate ){
        // api_createAccount(id, comid, email, password, userlevel, lastname, firstname, phone, birthdate, position, department);
        // accountList[accountList.length] = {
        //     'id' : id,
        //     'class' : new Account(id, comid, email, password, userlevel, lastname, firstname, phone, birthdate, position, department, 'na', superid)
        // };
        // const c = accountList[accountList.length - 1].class;
        // console.log(c.getMinData());
        // c.createAccount();
        let options = {
            'birthdate' : birthdate, 
            'companyid' : comid, 
            'department' : department, 
            'email' : email, 
            'firstname' : firstname, 
            'id' : id, 
            'lastname' : lastname, 
            'password' : password, 
            'phone' : phone, 
            'position' : position, 
            'superid' : superid, 
            'userlevel' : userlevel
        };

        const cbcomplete=data=>{
            console.log(data);
            
            $('.suuser-create-user').toggle();
            const zid = rngId(userlevel);
            $('#suuser-create-id').text(zid);
    
            $('#suuser-create-email').val('');
            $('#suuser-create-lastname').val('');
            $('#suuser-create-firstname').val('');
            $('#suuser-create-phone').val('');
            $('#suuser-create-birthdate').val('0000-00-00');
            $('#suuser-create-password').val('');

            let category = $('#suuser-search-userlevel').val();
            let list = COMPANY.getCompanyAccountsByUserLevel(category); 
            COMPANY.fill('#suuser-search-list', list);
            
            $(`#${id}`).click();
            // $('#account-create-container-close').click();
            // nav_accounts_manage();
            if(options.superid != "independent"){
                const na = {
                    "response" : "na"
                };
                const nastr = JSON.stringify(na);
                // const probj = ACCUSER.getProject(projectid).getData();
                // const trobj = ACCUSER.getProject(projectid).Task.getTaskObj(taskid);
                const aloptions = {
                    'id' : rngAlertId(),
                    'ownerid' : options.superid,
                    'fn' : 'na',
                    'dataview' : nastr,
                    'dataapprove' : nastr,
                    'datareject' : nastr,
                    'title' : "New Supervisor",
                    'message' : `You have been assigned as Supervisor to <b>${options.firstname} ${options.lastname}</b>`
                }
                console.log("DELETE ME",aloptions);
                const cb =()=>{
                    ACCUSER.Alert.fill();
                }
                ACCUSER.Alert.create(aloptions, cb);
            }
            showNotification('Management', 'Successfuly Created Account');
        }
        COMPANY.createUserAccount(options, cbcomplete);

        // $('#administration-mods-refresh').parent('.administration-mods-widget').click();
    }else{
        // console.log('you may not add account');
        if(password == 'error'){
            blinkbg($('#suuser-create-password'), 'red', 'white');
        }
        if(firstname == ''){
            blinkbg($('#suuser-create-firstname'), 'red', 'white');
        }
        if(lastname == ''){
            blinkbg($('#suuser-create-lastname'), 'red', 'white');
        }
        if(email == ''){
            blinkbg($('#suuser-create-email'), 'red', 'white');
        }
        if(phone == ''){
            blinkbg($('#suuser-create-phone'), 'red', 'white');
        }
        if(department == 'na'){
            blinkbg($('#suuser-create-department'), 'red', 'white');
        }
        $('#conf-report').text('Please Fill Up All Forms');
        flash($('#conf-report'));
    }

});
$('#suuser-profile-update').click(function(){
    const id = $('#suuser-view-id').text();
    const email = $('#suuser-view-email').val();
    const userlevel = $('#suuser-view-userlevel').val();
    const lastname = $('#suuser-view-lastname').val();
    const firstname = $('#suuser-view-firstname').val();
    const phone = $('#suuser-view-phone').val();
    const birthdate = $('#suuser-view-birthdate').val();
    const position = $('#suuser-view-position').val();
    const department = $('#suuser-view-department').val();
    const superid = $('#suuser-view-supervisor').val();
    // console.log(id, email, userlevel, lastname, firstname, phone, birthdate, position, department);
    let options = {
        'id' : id,
        'email' : email,
        'userlevel' : __USER_LEVEL == "1" ? "1" : userlevel,
        'lastname' : lastname,
        'firstname' : firstname,
        'phone' : phone,
        'birthdate' : birthdate,
        'position' : position,
        'department' : department,
        'superid' : superid
    };
    console.log(options);
    const cbcomplete=data=>{
        console.log(data);
        $(`#${id}`).html(email);
        showNotification("Administration", "You have updated the account.");
    };
    COMPANY.updateCompanyAccount(options, cbcomplete);
    // c.updateAccount(email, userlevel, lastname, firstname, phone, birthdate, position, department, nav_accounts_manage);
    // nav_accounts_manage();
    // if(__COMPANY_ID != ''){
    //     api_fetchAccount(__COMPANY_ID, 'na', 'admin-emailList');
    // }else{
    //     alert('you are not logged in...');
    //     window.location.href = domain;
    // }
});

$('#suuser-profile-reset-password').click(function(){
    // alert('Function Available on Future Updates');
    showNotification("Administration", "Function Available on Future Updates. Please send a ticket if this is Urgent.");
});
$('#suuser-profile-reset-photo').click(function(){
    showNotification("Administration", "Function Available on Future Updates. Please send a ticket if this is Urgent.");
    // alert('Function Available on Future Updates');
});
$('#suuser-profile-delete').click(function(){
    showNotification("Administration", "Function Available on Future Updates. Please send a ticket if this is Urgent.");
    // alert('Function Available on Future Updates');
});




// DEFINE DOCUMENT EVENTS
function createDocumentCategory(name, ordernum, catnum){
    const id = rngDocumentCategoryId();
    const companyid = __COMPANY_ID;
   if(ordernum > 9 ){
        showNotification('Category Management', 'Category #' + catnum + ' has reached maximum number of data.');
   }else if(name == ''){
        showNotification('Category Management', 'Please Add a Name');
   }else{
        if(catnum == 1){
            $('.define-con1-widget-con').append(`<span id="${id}" name="${name}" ord="${ordernum}" cat="${catnum}" class="define-con-widget btn-shadow" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};" >${ordernum} - ${name}</span>`);
            doc_catnum1[ordernum] = {'id' : id, 'name' : name, 'ordernum' : ordernum, 'catnum' : catnum};
        }else if(catnum == 2){
            $('.define-con2-widget-con').append(`<span id="${id}" name="${name}" ord="${ordernum}" cat="${catnum}" class="define-con-widget btn-shadow" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};" >${ordernum} - ${name}</span>`);
            doc_catnum2[ordernum] = {'id' : id, 'name' : name, 'ordernum' : ordernum, 'catnum' : catnum};
        }else if(catnum == 3){
            $('.define-con3-widget-con').append(`<span id="${id}" name="${name}" ord="${ordernum}" cat="${catnum}" class="define-con-widget btn-shadow" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};" >${ordernum} - ${name}</span>`);
            doc_catnum3[ordernum] = {'id' : id, 'name' : name, 'ordernum' : ordernum, 'catnum' : catnum};
        }else if(catnum == 4){
            $('.define-con4-widget-con').append(`<span id="${id}" name="${name}" ord="${ordernum}" cat="${catnum}" class="define-con-widget btn-shadow" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};" >${ordernum} - ${name}</span>`);
            doc_catnum4[ordernum] = {'id' : id, 'name' : name, 'ordernum' : ordernum, 'catnum' : catnum};
        }
        api_createDocumentCategory(id, companyid, name, ordernum, catnum);
   }
}
function clearAndShowCatlist(curcat){
    $(`#catlist1`).children('input').val('').attr('id', '');
    $(`#catlist2`).children('input').val('').attr('id', '');
    $(`#catlist3`).children('input').val('').attr('id', '');
    $(`#catlist4`).children('input').val('').attr('id', '');
    $(`#catlist5`).children('input').val('').attr('id', '');
    $(`#catlist6`).children('input').val('').attr('id', '');
    $(`#catlist7`).children('input').val('').attr('id', '');
    $(`#catlist8`).children('input').val('').attr('id', '');
    $(`#catlist9`).children('input').val('').attr('id', '');

    $(`#catlist1`).children('button').text('insert').css('background-color', GREEN_PALETTE);
    $(`#catlist2`).children('button').text('insert').css('background-color', GREEN_PALETTE);
    $(`#catlist3`).children('button').text('insert').css('background-color', GREEN_PALETTE);
    $(`#catlist4`).children('button').text('insert').css('background-color', GREEN_PALETTE);
    $(`#catlist5`).children('button').text('insert').css('background-color', GREEN_PALETTE);
    $(`#catlist6`).children('button').text('insert').css('background-color', GREEN_PALETTE);
    $(`#catlist7`).children('button').text('insert').css('background-color', GREEN_PALETTE);
    $(`#catlist8`).children('button').text('insert').css('background-color', GREEN_PALETTE);
    $(`#catlist9`).children('button').text('insert').css('background-color', GREEN_PALETTE);
    for(i=0; i<defineDocCategoryList.length; i++){
        if(defineDocCategoryList[i].catnum == curcat){
            $(`#catlist${defineDocCategoryList[i].ordernum}`).children('input').val(defineDocCategoryList[i].name).attr('id', defineDocCategoryList[i].id);
            $(`#catlist${defineDocCategoryList[i].ordernum}`).children('button').text('update').css('background-color', YELLOW_PALETTE);
        }
    }
    
}
let defineDocCategoryList = [];
$('#define-header-widget1').click(function(){
    $('.catlist').children('span').text('Category 1').attr('curcat', '1');
    // console.log('1');
    clearAndShowCatlist('1');
    $('.catlist').show();
});
$('#define-header-widget2').click(function(){
    $('.catlist').children('span').text('Category 2').attr('curcat', '2');
    // console.log('2');
    clearAndShowCatlist('2');
    $('.catlist').show();
});
$('#define-header-widget3').click(function(){
    $('.catlist').children('span').text('Category 3').attr('curcat', '3');
    // console.log('3');
    clearAndShowCatlist('3');
    $('.catlist').show();

});
$('#define-header-widget4').click(function(){
    $('.catlist').children('span').text('Category 4').attr('curcat', '4');
    // console.log('4');
    clearAndShowCatlist('4');
    $('.catlist').show();

});
$(document).on('click', '.catlist-widget-update', function(){
    const catnum = $('.catlist').children('span').attr('curcat');
    const ordernum = $(this).siblings('.catlist-widget-num').text();
    let id = $(this).siblings('input').attr('id');
    const name = $(this).siblings('input').val();
    // console.log(name);
    if(id == undefined || id == ''){
        // insert
        id = rngDocumentCategoryId();
        // console.log('insert', catnum, ordernum, id, name);
        if(name == "" || name == undefined){
            blinkbg($(this).siblings('input'), RED_PALETTE, 'white');
        }else{
            $(this).css('background-color', YELLOW_PALETTE).text('update');
            api_createDocumentCategory(id, __COMPANY_ID, name, ordernum, catnum)
            showNotification('Document Category','Successfuly Created Category.');
            defineDocCategoryList[defineDocCategoryList.length] = {
                'catnum' : catnum,
                'ordernum' : ordernum,
                'name' : name,
                'id' : id
            };
            clearAndShowCatlist((catnum + ""));
        }
    }else{
        //update
        
        // console.log('update', catnum, ordernum, id, name);
        const cb = data => {
            for(i=0; i<defineDocCategoryList.length; i++){
                if(defineDocCategoryList[i].id == id){
                    defineDocCategoryList[i].name = name;
                }
            }
            showNotification('Document Category','Successfuly Updated Category Name.');
            clearAndShowCatlist((catnum + "")); 
        };
        api_updateDocumentCategoryName(id, name, cb);
    }
});
$(document).on('click', '.catlist-widget-delete', function(){
    const id = $(this).siblings('input').attr('id');
    if(id != undefined && id != ""){
        const cat = $('.catlist').children('h1').attr('curcat');
        const ordernum = $(this).siblings('.catlist-widget-num').text();
        const category = 'cat' + cat;
        // console.log(ordernum, category);
        const dcb = data => {
            // console.log(data);
            if(data.length > 0){
                showNotification('Cannot Delete','There are some affected Documents');
                $.each(data, function(key, value){
                    console.log('Cannot Delete, there are some affected files', value.docid);
                    // showAction('Cannot Delete, there are some affected files<br>Would you like to set them to 0?',);
                });
            }else{
                const cb = () => {
                    $(this).siblings('input').val('');
                    $(this).siblings('button').text('insert').css('background-color', GREEN_PALETTE);
                    showNotification('Document Category','Successfuly Deleted Category.');
                    clearAndShowCatlist((cat + ""));
                };
                api_removeDocumentCategory(id,cb);
                // console.log('able to delete');
            }
        };
        api_deleteDocumentCategoryTest(category, ordernum, dcb);
    }else{
        blinkbg($(this).siblings('input'), RED_PALETTE, 'white');
    }
});

$(document).on('click', '#navcon-webmsg', function(){
    const cb =data=>{
        // console.log(data);
        setTimeout(() => {
            ADMIN.WebMessage.fillSenderList();
        }, 0);
    };
    ADMIN.WebMessage.checkList("List", cb);
});
$(document).on('click', '.webmsg-list-widget', function(){
    const owner = $(this).attr('owner');
    ADMIN.WebMessage.fillChatBoxByOwner(owner);
    $('.webmsg-list-widget').removeClass('active');
    $(this).addClass('active');
    $('#webmsg-envelope-submit').attr('owner', owner);
});
$(document).on('click', '#webmsg-envelope-submit', function(){
    const options = {
        'id' : rngMessageId(),
        'owner' : $('#webmsg-envelope-submit').attr('owner'),
        'sender' : 'system',
        'message' :  $('#webmsg-envelope-message').val()
    }

    console.log(options);
    const cb =()=>{
        ADMIN.WebMessage.fillChatBoxByOwner(options.owner);
        $('#webmsg-envelope-message').val("");
    };
    ADMIN.WebMessage.createMessage(options, cb);
});


$(document).ready(function(){
    // this $(document).ready(); function runs after browser loads all html elements
    // it fires everytime you refresh the page. hence it runs when you first land on the page
    
    // minimizeNav();
    
    const cb1 = data => {
        // console.log('PEEEEKPEEEK', data);
        // all these variables are from defaults.js
        // variables are getting the data from the api call api_checkIfLoggedIn() which is from api_login.js
        // this function runs on success api call.
        // console.log('data', data);
        __ID = data.ID;
        __USER_LEVEL =data.USER_LEVEL;
        __PASSWORD = data.PASSWORD;
        __PHOTO = data.PHOTO;
        __FIRST_NAME = data.FIRST_NAME;
        __COMPANY_ID = data.COMPANY_ID;
        __COMPANY_NAME = data.COMPANY_NAME;
        __COMPANY_LOGO = data.COMPANY_LOGO;
        __DATABASE_ID = data.DATABASE_ID;

        const obj={
            'id':data.COMPANY_ID,
            'name':data.COMPANY_NAME,
            'logo':data.COMPANY_LOGO,
            'userid' : data.ID,
            'userfirstname' : data.FIRST_NAME,
            'userlevel' : data.USER_LEVEL,
            'userphoto' : data.PHOTO,
            'userpassword' : data.PASSWORD
        }
        console.log(obj);
        COMPANY = new Company(obj);
        setTimeout(() => {
            const cb =()=>{
                
            };
            COMPANY.checkList('Complains', cb); 
        }, 0);

    };
    const cb2 = () => {
        // this function runs after api call is completed, right after success is called.
        // i mainly use this function to set the front end stuff. 

        sessionStorage.setItem('selectedProjectId', '');
        sessionStorage.setItem('selectedProjectName', '');
        sessionStorage.setItem('selectedProjectOwnerId', '');
        sessionStorage.setItem('selectedProjectOwnerFirstname', '');
        sessionStorage.setItem('selectedProjectOwnerLastname', '');
        sessionStorage.setItem('selectedProjectOwnerPhoto', '');

        hideAllNav(navConList);
        hideAllNav(conList);
        getAccountModules(__USER_LEVEL, __ID);
        fillCompany(__COMPANY_LOGO, __COMPANY_NAME);
        $('#header-tab-module-name').text('Control');
        // console.log("LKJASDLJKDASJLKADSLJKADSJKL", __USER_LEVEL);
        if( __USER_LEVEL != '' || __USER_LEVEL == null || __USER_LEVEL == undefined){
            if(__USER_LEVEL == '3'){
                showAllNav(nav_usrConList);
                // $('.dashboard-user-con').show();
            }else if(__USER_LEVEL == '2'){
                showAllNav(nav_supConList);
                // $('.dashboard-superuser-con').show();
            }else if(__USER_LEVEL == '1'){
                setTimeout(() => {
                    // console.log('ALJSHDHJLKASDJLK',nav_ceoConList);
                    showAllNav(nav_ceoConList);
                }, 0);

                // $('.dashboard-admin-con').show();
            }else if(__USER_LEVEL == '0'){
                showAllNav(nav_vipConList);
                $('#complains-open').hide();
                $('#modules-open').hide();
                // $('.dashboard-superadmin-con').show();
                // $('.moduleman-con').show();
                setTimeout(() => {
                    const obj = {
                        "id" : __ID,
                        "firstname" : __FIRST_NAME,
                        "photo" : __PHOTO,
                    }
                    ADMIN = new Admin(obj);
                    setTimeout(() => {
                        // ADMIN.fetchCompany(()=>{});
                        showReloadReport('Fetching Data.. Please wait');
                        setTimeout(() => {
                            const callback =data=>{
                                console.log(data);
                                const callback =()=>{
                                    console.log(data);
                                    hideReloadReport();
                                }
                                ADMIN.checkList('License', callback);
                            }
                            ADMIN.checkList('Company', callback);
                        }, 0);
                        
                    }, 0);
                }, 0);
            }
        }

        $('.dashboard-con').show();
        // $('.webmsg-con').show();
        

        

        minimizeNav();

        ACCUSER = new User({"id" : __ID, "companyid" : __COMPANY_ID});

        setTimeout(() => {
            const cb=data=>{
                // console.log('AAA1', data);
                const cb=data=>{
                    // console.log('AAA2',data);
                    setTimeout(() => {
                        // console.log('AAA3');
                        ACCUSER.Alert.fill();
                        // if(__COMPANY_ID != "admincontrol"){
                            fillProfile();
                            
                        // }
                    }, 0);
                }
                ACCUSER.checkList('Alert', cb);
            }
            ACCUSER.checkList('COMPANY_ACCOUNTS', cb);

        }, 0);
        AlertWorker();

    };
    api_checkIfLoggedIn(cb1, cb2);

    

});

