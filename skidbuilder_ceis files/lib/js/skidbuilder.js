
let skid_conList = [
    $('.nav-maincontainer'),
    // $('.build-prefs'),
    // $('.build-launch'),
    // $('.build-launch-unit-widget-subs'),
    // $('.build-launch-equipment-widget-subs'),
    // $('.manage-unit-sublist'),
    // $('.manage-unit-specs'),
    // $('.manage-equipment-sublist'),
    // $('.manage-equipment-specs')
];


function printPageArea(content){
    var win = window.open('', '', 'width=1200 ,height=980');
    win.document.write(`<html>
        <head> 
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Pro Flow</title>
            <base href="${domain}" target="_self">
            <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.13.0/css/all.css">
            <link href="${domain}lib/css/default.css" rel="stylesheet" /> 
            <link href="${domain}lib/css/newskidbuilder.css" rel="stylesheet" /> 
            <link href="${domain}lib/css/skidbuilder.css" rel="stylesheet" /> 
            <link href="${domain}lib/css/builder.css" rel="stylesheet" /> 
            <link href="${domain}lib/css/builderprint.css" rel="stylesheet" /> 
            <link href="${domain}lib/css/datasheetprint.css" rel="stylesheet" /> 
        </head> 
        <body style="position:relative;
                    overflow-y: scroll;"> `);

    win.document.write(content);
    win.document.write(`
                <script src="${domain}lib/js/jquery-1.10.2.js" type="text/javascript"></script>
                <script src="${domain}lib/js/jquery-ui.js" type="text/javascript"></script>
                <script src="${domain}lib/js/jquery.drawsvg.js" type="text/javascript"></script>
                <script src="${domain}lib/js/colors.js" type="text/javascript"></script>
                <script src="${domain}controllers/defaults.js" type="text/javascript"></script>
            
            </body>
        </html>`);


    // console.log(win.document.body);


    $(win.document.body).children('#printcon').children('.builder-area-page-print').children('i').hide();
    $(win.document.body).children('#printcon').children('.builder-area-page-print').children('.builder-area-page-footer').css('display', 'block').show();
    
    $(win.document.body).children('#printcon').children('table').children('thead').children('tr').children('td').css({
        'color' : "black",
        'border' : 'thin solid black'
    });
    $(win.document.body).children('#printcon').children('table').children('thead').children('tr').children('td').each(function(){
        if($(this).children('input')){
            let v = $(this).children('input').val();
            $(this).html(v);
        }
    });

    
    $(win.document.body).children('#printcon-datasheet').children('table').children('tbody').children('tr').children('td').css({
        width : 'auto',
        border: 'thin solid black',
        margin: '0px',
        backgroundColor: 'white',
        minWidth: '200px',
        position: 'relative',
        textAlign: 'center'
    });
    $(win.document.body).children('#printcon-datasheet').children('table').children('thead').children('tr').children('th').css({
        width : 'auto',
        border: 'thin solid black',
        margin: '0px',
        backgroundColor: 'white',
        minWidth: '200px',
        position: 'relative',
    });
    $(win.document.body).children('#printcon-datasheet').children('table').css({
        borderCollapse : 'collapse',
        borderSpacing : '0'
    });
    $(win.document.body).children('#printcon-datasheet').children('textarea').css({
        resize: "none",
        "min-width" : '400px'
    });
    

    setTimeout(() => {
        setTimeout(() => {
        }, 0);
        win.print();
        win.close();
    }, 500);

}



// ____________________________________________________________________________________
$(document).ready(function(){
    const cb1 = data => {
        console.log(data, '-----------------------');
        // all these variables are from defaults.js
        // variables are getting the data from the api call api_checkIfLoggedIn() which is from api_login.js
        // this function runs on success api call.

        if(data.response != "error"){
            __ID = data.ID;
            __USER_LEVEL =data.USER_LEVEL;
            __PASSWORD = data.PASSWORD;
            __PHOTO = data.PHOTO;
            __FIRST_NAME = data.FIRST_NAME;
            __COMPANY_ID = data.COMPANY_ID;
            __COMPANY_NAME = data.COMPANY_NAME;
            __DATABASE_ID = data.DATABASE_ID;

            // console.log("--------------------", __COMPANY_ID,"-----------------", __ID,"-----------------", __DATABASE_ID);
            // document.cookie = `DATABASE_ID=${__DATABASE_ID}`;

            const obj={
                'id':data.COMPANY_ID,
                'databaseid':data.DATABASE_ID,
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
        }
    };
    const cb2 = () => {
        if(__USER_LEVEL == '1' || __USER_LEVEL == '2'){
            // $('#navcon-define').show();
        }else{
            // $('#navcon-define').hide();
        }
        $('.dashboard-con').show();
        // $('.build-con').show();


        ACCUSER = new User({"id" : __ID, "companyid" : __COMPANY_ID});
        

        // const alobj = ACCUSER.Alert.getObjById("AL-11111");
        // runAlert(alobj, console.log("AWESOOOOME"));

        setTimeout(() => {
            const cb=data=>{
                console.log(data);
                const cb=data=>{
                    console.log(data);
                    const cb=data=>{
                        console.log(data);
                        const cb =()=>{
                            console.log(data);
                            const cb =()=>{
                                console.log(data);
                                setTimeout(() => {
                                        ACCUSER.Alert.fill();
                                        fillProfile();
                                        hideAllNav(skid_conList);
                                        minimizeNav();
                                        $('#nav-skid').click();

                                }, 0);
                            };
                            SKID_FILE = new SkidFile(__ID, cb);
                        };
                        SKID_DATA = new SkidData(__COMPANY_ID, cb);
                    }
                    ACCUSER.checkList('Skid', cb);
                }
                ACCUSER.checkList('COMPANY_ACCOUNTS', cb);
            }
            ACCUSER.checkList('Alert', cb);
        }, 0);
        AlertWorker();

        
        // console.log('ASDADSASDDAS', __COMPANY_ID);
        
    };
    
    api_checkIfLoggedIn(cb1, cb2);

});

function init(){
    // capi_checkIfLoggedIn()
    // .then(data=>{
    //     console.log("then1", data);
    //     return new Promise((res, rej)=>{
    //         if(data.response != "error"){
    //             __ID = data.ID;
    //             __USER_LEVEL =data.USER_LEVEL;
    //             __PASSWORD = data.PASSWORD;
    //             __PHOTO = data.PHOTO;
    //             __FIRST_NAME = data.FIRST_NAME;
    //             __COMPANY_ID = data.COMPANY_ID;
    //             __COMPANY_NAME = data.COMPANY_NAME;
    //             __DATABASE_ID = data.DATABASE_ID;
    
    //             // console.log("--------------------", __COMPANY_ID,"-----------------", __ID,"-----------------", __DATABASE_ID);
    //             // document.cookie = `DATABASE_ID=${__DATABASE_ID}`;
    
    //             const obj={
    //                 'id':data.COMPANY_ID,
    //                 'databaseid':data.DATABASE_ID,
    //                 'name':data.COMPANY_NAME,
    //                 'logo':data.COMPANY_LOGO,
    //                 'userid' : data.ID,
    //                 'userfirstname' : data.FIRST_NAME,
    //                 'userlevel' : data.USER_LEVEL,
    //                 'userphoto' : data.PHOTO,
    //                 'userpassword' : data.PASSWORD
    //             }
    //             console.log(obj);
    //             COMPANY = new Company(obj);
    //             setTimeout(() => {
    //                 const cb =()=>{
    //                     ACCUSER = new User({"id" : __ID, "companyid" : __COMPANY_ID});
    //                     res(data);
    //                 };
    //                 COMPANY.checkList('Complains', cb); 
    //             }, 0);
    //         }else{
    //             rej("error");
    //         }
    //     });
    // })
    // .then(data=>{
    //     console.log("then2", data); 
    //     if(data.response != "error"){

        

    //         if(__USER_LEVEL == '1' || __USER_LEVEL == '2'){
    //             // $('#navcon-define').show();
    //         }else{
    //             // $('#navcon-define').hide();
    //         }
    //         $('.dashboard-con').show();
               

    //         setTimeout(() => {
    //             const cb=data=>{
    //                 console.log(data);
    //                 const cb=data=>{
    //                     console.log(data);
    //                     const cb=data=>{
    //                         console.log(data);
    //                         const cb =()=>{
    //                             console.log(data);
    //                             const cb =()=>{
    //                                 console.log(data);
    //                                 setTimeout(() => {
    //                                         ACCUSER.Alert.fill();
    //                                         fillProfile();
    //                                         hideAllNav(skid_conList);
    //                                         minimizeNav();
    //                                         $('#nav-data').click();
    //                                 }, 0);
    //                             };
    //                             SKID_FILE = new SkidFile(__ID, cb);
    //                         };
    //                         SKID_DATA = new SkidData(__COMPANY_ID, cb);
    //                     }
    //                     ACCUSER.checkList('Skid', cb);
    //                 }
    //                 ACCUSER.checkList('COMPANY_ACCOUNTS', cb);
    //             }
    //             ACCUSER.checkList('Alert', cb);
    //         }, 0);
    //         AlertWorker();
    //     }
    // })
    // .catch(err=>{
    //     console.log(err);
    //     // err();
    // });
}


$('.nav-widget-con').click(function(){
    const id = $(this).children('span').attr('id');
    console.log(id);
    if(id != undefined && id != null && id != ''){
        if(id=="nav-dashboard"){
            console.log('dashboard');
            
        }else if(id=="nav-build"){
            console.log('build');
            // $('.build-list').hide();
            // $('.build-prefs').hide();
            // $('.build-launch').hide();
            window.location.href = domain + 'pages/builder';
        }else if(id=="nav-data"){
            console.log('Data Manager');
            $('.data-body-widget').hide();
            $('.data-body-widget-').hide();
        }
        
    }
});

 


// DATA MANAGEMENT NAVIGATION
function fillUnits(){
    const unitobj = ACCUSER.Skid.Unit.getUnit();
    $('.data-body-unit-list').children('.data-body-unit-list-widget').remove();
    $.each(unitobj, function(key, value){
        const subunitobj = ACCUSER.Skid.Unit.getSubUnitByUnitId(value.id);
        console.log(subunitobj);
        let subunithtml = '';
        let html = '';
        if(subunitobj != undefined){
            $.each(subunitobj, function(key, value1){
                subunithtml += `<span suid="${value1.id}" class="data-body-unit-list-subwidget">${value1.name}</span>`;
            });
        }else{
            subunithtml = `<span >Empty</span>`;
        }
        html = `
        <div uid="${value.id}" class="data-body-unit-list-widget shadow">
            <span class="title">${value.name}</span>
            <div class="subs hidden">
                ${subunithtml}
            </div>
        </div>`;
        $('.data-body-unit-list').append(html);
    });
    
    $('.data-body-unit-ui').hide();
    $('.data-body-equipment-ui').hide();
    $('#data-mods-subunit').parent('.data-mods-widget').hide();
}
function fillUnitsWithFilter(q){
    const unitobj = ACCUSER.Skid.Unit.getUnit();
    $('.data-body-unit-list').children('.data-body-unit-list-widget').remove();
    $.each(unitobj, function(key, value){
        const subunitobj = ACCUSER.Skid.Unit.getSubUnitByUnitIdWithFilter(value.id, q);
        // console.log(subunitobj);
           console.log(subunitobj);
        let subunithtml = '';
        let html = '';
        let gate = true;
        if(subunitobj != undefined && subunitobj.length != 0){
            $.each(subunitobj, function(key, value1){
                subunithtml += `<span suid="${value1.id}" class="data-body-unit-list-subwidget">${value1.name}</span>`;
            });
        }else if(subunitobj.length == 0 || subunitobj == undefined){
            gate = false;
        }
        if(gate){
            html = `
            <div uid="${value.id}" class="data-body-unit-list-widget shadow">
                <span class="title active">${value.name}</span>
                <div class="subs ">
                    ${subunithtml}
                </div>
            </div>`;
            $('.data-body-unit-list').append(html); 
        }
    });
    // $('.data-body-unit-ui').hide();
    // $('.data-body-equipment-ui').hide();
    // $('#data-mods-subunit').parent('.data-mods-widget').hide();
}
function fillEquipments(){
    const equipmentobj = ACCUSER.Skid.Equipment.getEquipment();
    $('.data-body-equipment-list').children('.data-body-equipment-list-widget').remove();
    $.each(equipmentobj, function(key, value){
        const subequipmentobj = ACCUSER.Skid.Equipment.getSubEquipmentByEquipmentId(value.id);
        console.log(subequipmentobj);
        let subequipmenthtml = '';
        let html = '';
        if(subequipmentobj != undefined){
            $.each(subequipmentobj, function(key, value1){
                subequipmenthtml += `<span seid="${value1.id}" class="data-body-equipment-list-subwidget">${value1.name}</span>`;
            });
        }else{
            subequipmenthtml = `<span >Empty</span>`;
        }
        html = `
        <div eid="${value.id}" class="data-body-equipment-list-widget shadow">
            <span class="title">${value.name}</span>
            <div class="subs hidden">
                ${subequipmenthtml}
            </div>
        </div>`;
        $('.data-body-equipment-list').append(html);
    });
    
    $('.data-body-unit-ui').hide();
    $('.data-body-equipment-ui').hide();
    $('#data-mods-subequipment').parent('.data-mods-widget').hide();
}
function fillEquipmentsWithFilter(q){
    const equipmentobj = ACCUSER.Skid.Equipment.getEquipment();
    $('.data-body-equipment-list').children('.data-body-equipment-list-widget').remove();
    $.each(equipmentobj, function(key, value){
        const subequipmentobj = ACCUSER.Skid.Equipment.getSubEquipmentByEquipmentIdWithFilter(value.id, q);
        console.log(subequipmentobj);
        let subequipmenthtml = '';
        let html = '';
        let gate = true;
        if(subequipmentobj != undefined && subequipmentobj.length != 0){
            $.each(subequipmentobj, function(key, value1){
                subequipmenthtml += `<span seid="${value1.id}" class="data-body-equipment-list-subwidget">${value1.name}</span>`;
            });
        }else if(subequipmentobj.length == 0 || subequipmentobj == undefined){
            gate = false;
        }
        if(gate){
            html = `
            <div eid="${value.id}" class="data-body-equipment-list-widget shadow">
                <span class="title active">${value.name}</span>
                <div class="subs ">
                    ${subequipmenthtml}
                </div>
            </div>`;
            $('.data-body-equipment-list').append(html);
        }
    });
    
    // $('.data-body-unit-ui').hide();
    // $('.data-body-equipment-ui').hide();
    // $('#data-mods-subequipment').parent('.data-mods-widget').hide();
}
function cidUnit(){

    // const cb=data=>{
        // console.log(data);
        // setTimeout(() => {
            $('#data-mods-unit').parent('.data-mods-widget').css('display', 'flex').show();
            $('#data-mods-equipment').parent('.data-mods-widget').hide();
            $('#data-mods-subequipment').parent('.data-mods-widget').hide();
            $('.data-body-unit-ui').hide();
            $('.data-body-equipment-ui').hide();
            fillUnitsSD();
        // }, 0);
    // }
    // ACCUSER.Skid.checkList('Unit', cb);
}
function cidEquipment(){
    // const cb=data=>{
    //     console.log(data);
    //     setTimeout(() => {
            $('#data-mods-equipment').parent('.data-mods-widget').css('display', 'flex').show();
            $('#data-mods-unit').parent('.data-mods-widget').hide();
            $('#data-mods-subunit').parent('.data-mods-widget').hide();
            $('.data-body-unit-ui').hide();
            $('.data-body-equipment-ui').hide();
            fillEquipmentsSD();
    //     }, 0);
    // }
    // ACCUSER.Skid.checkList('Equipment', cb);
}
function cidFile(){
    // $('#data-mods-file').parent('.data-mods-widget').css('display', 'flex').show();
    $('#data-mods-unit').parent('.data-mods-widget').hide();
    $('#data-mods-subunit').parent('.data-mods-widget').hide();
    $('#data-mods-equipment').parent('.data-mods-widget').hide();
    $('#data-mods-subequipment').parent('.data-mods-widget').hide();
    $('.data-body-unit-ui').hide();
    $('.data-body-equipment-ui').hide();

    // fillEquipments();
}
function cidIcon(){
    // $('#data-mods-icon').parent('.data-mods-widget').css('display', 'flex').show();
    $('#data-mods-unit').parent('.data-mods-widget').hide();
    $('#data-mods-subunit').parent('.data-mods-widget').hide();
    $('#data-mods-equipment').parent('.data-mods-widget').hide();
    $('#data-mods-subequipment').parent('.data-mods-widget').hide();
    $('.data-body-unit-ui').hide();
    $('.data-body-equipment-ui').hide();
    fillIcons();
    // fillEquipments();
}
function iconSelect(ui){
    const id = ui.attr('id');
    let obj = [];
    if(id.includes('unit')){
        // obj = ACCUSER.Skid.Icons.getUnitIcons();
        obj = SKID_DATA.Icons.getUnitIcons();
        $('#data-body-iconselect-search').attr('ui', 'unit');
        $('#data-body-iconselect-submit').attr({
            'ui' : 'unit'
        });
    }else if(id.includes('equipment')){
        // obj = ACCUSER.Skid.Icons.getEquipmentIcons();
        obj = SKID_DATA.Icons.getEquipmentIcons();
        $('#data-body-iconselect-search').attr('ui', 'equipment');
        $('#data-body-iconselect-submit').attr({
            'ui' : 'equipment'
        });
    }
    if(id.includes('update')){
        $('#data-body-iconselect-submit').attr({
            'operation' : 'update'
        });
    }else if(id.includes('create')){
        $('#data-body-iconselect-submit').attr({
            'operation' : 'create'
        });
    }

    $('.data-body-iconselect-icontainer').empty();
    $.each(obj, function(key, value){
        $('.data-body-iconselect-icontainer').append(`
            <img class="data-body-iconselect-iconwidget" iid="${value.id}" src="${value.url}" alt="${value.name}" title="${value.name}" >
        `);
    });

    $('.data-body-iconselect').css('display', 'flex').show();

}


function fillUnitsSD(){ // DONE UPDATE
    // const unitobj = ACCUSER.Skid.Unit.getUnit();
    const unitobj = SKID_DATA.Unit.getUnit();
    console.log('SKID_DATA.Unit.getUnit()', unitobj);
    
    $('.data-body-unit-list').children('.data-body-unit-list-widget').remove();
    $.each(unitobj, function(key, value){
        // const subunitobj = ACCUSER.Skid.Unit.getSubUnitByUnitId(value.id);
        const subunitobj = value.sub;
        console.log(subunitobj);
        let subunithtml = '';
        let html = '';
        if(subunitobj != undefined && subunitobj.length > 0){
            $.each(subunitobj, function(key, value1){
                subunithtml += `<span suid="${value1.suid}" uid="${value.uid}" class="data-body-unit-list-subwidget">${value1.name}</span>`;
            });
        }else{
            subunithtml = `<span >Empty</span>`;
        }
        html = `
        <div uid="${value.uid}" class="data-body-unit-list-widget shadow">
            <span class="title">${value.name}</span>
            <div class="subs hidden">
                ${subunithtml}
            </div>
        </div>`;
        $('.data-body-unit-list').append(html);
    });
    
    $('.data-body-unit-ui').hide();
    $('.data-body-equipment-ui').hide();
    $('#data-mods-subunit').parent('.data-mods-widget').hide();
}
function fillUnitsWithFilterSD(q){ // DONE UPDATE
    // const unitobj = ACCUSER.Skid.Unit.getUnit();
    const unitobj = SKID_DATA.Unit.getUnit();

    $('.data-body-unit-list').children('.data-body-unit-list-widget').remove();
    $.each(unitobj, function(key, value){
        // const subunitobj = ACCUSER.Skid.Unit.getSubUnitByUnitIdWithFilter(value.id, q);
        const subunitobj = SKID_DATA.Unit.getSubUnitByUnitIdWithFilter(value.uid, q);
        // console.log(subunitobj);
           console.log(subunitobj);
        let subunithtml = '';
        let html = '';
        let gate = true;
        if(subunitobj != undefined && subunitobj.length != 0){
            $.each(subunitobj, function(key, value1){
                subunithtml += `<span suid="${value1.suid}" uid="${value.uid}" class="data-body-unit-list-subwidget">${value1.name}</span>`;
            });
        }else if(subunitobj.length == 0 || subunitobj == undefined){
            gate = false;
        }
        if(gate){
            html = `
            <div uid="${value.uid}" class="data-body-unit-list-widget shadow">
                <span class="title active">${value.name}</span>
                <div class="subs ">
                    ${subunithtml}
                </div>
            </div>`;
            $('.data-body-unit-list').append(html); 
        }
    });
    // $('.data-body-unit-ui').hide();
    // $('.data-body-equipment-ui').hide();
    // $('#data-mods-subunit').parent('.data-mods-widget').hide();
}
function fillEquipmentsSD(){
    // const equipmentobj = ACCUSER.Skid.Equipment.getEquipment();
    const equipmentobj = SKID_DATA.Equipment.getEquipment();
    $('.data-body-equipment-list').children('.data-body-equipment-list-widget').remove();
    $.each(equipmentobj, function(key, value){
        // const subequipmentobj = ACCUSER.Skid.Equipment.getSubEquipmentByEquipmentId(value.id);
        const subequipmentobj = value.sub;
        console.log(subequipmentobj);
        let subequipmenthtml = '';
        let html = '';
        if(subequipmentobj != undefined){
            $.each(subequipmentobj, function(key, value1){
                subequipmenthtml += `<span seid="${value1.seid}" eid="${value.eid}" class="data-body-equipment-list-subwidget">${value1.name}</span>`;
            });
        }else{
            subequipmenthtml = `<span >Empty</span>`;
        }
        html = `
        <div eid="${value.eid}" class="data-body-equipment-list-widget shadow">
            <span class="title">${value.name}</span>
            <div class="subs hidden">
                ${subequipmenthtml}
            </div>
        </div>`;
        $('.data-body-equipment-list').append(html);
    });
    
    $('.data-body-unit-ui').hide();
    $('.data-body-equipment-ui').hide();
    $('#data-mods-subequipment').parent('.data-mods-widget').hide();
}
function fillEquipmentsWithFilterSD(q){
    // const equipmentobj = ACCUSER.Skid.Equipment.getEquipment();
    const equipmentobj = SKID_DATA.Equipment.getEquipment();
    $('.data-body-equipment-list').children('.data-body-equipment-list-widget').remove();
    $.each(equipmentobj, function(key, value){
        const subequipmentobj = SKID_DATA.Equipment.getSubEquipmentByEquipmentIdWithFilter(value.eid, q);
        console.log(subequipmentobj);
        let subequipmenthtml = '';
        let html = '';
        let gate = true;
        if(subequipmentobj != undefined && subequipmentobj.length != 0){
            $.each(subequipmentobj, function(key, value1){
                subequipmenthtml += `<span seid="${value1.seid}" eid="${value.eid}" class="data-body-equipment-list-subwidget">${value1.name}</span>`;
            });
        }else if(subequipmentobj.length == 0 || subequipmentobj == undefined){
            gate = false;
        }
        if(gate){
            html = `
            <div eid="${value.eid}" class="data-body-equipment-list-widget shadow">
                <span class="title active">${value.name}</span>
                <div class="subs ">
                    ${subequipmenthtml}
                </div>
            </div>`;
            $('.data-body-equipment-list').append(html);
        }
    });
    
    // $('.data-body-unit-ui').hide();
    // $('.data-body-equipment-ui').hide();
    // $('#data-mods-subequipment').parent('.data-mods-widget').hide();
}


$('.data-navigation-widget').click(function(){
    const cid = $(this).attr('cid');
    $('#data-mods-refresh').parent('.data-mods-widget').removeClass('hidden').show();

    $('.data-navigation').children('.data-navigation-widget').each(function(){
        const zid = $(this).attr('cid');
        if(zid == cid){
            $(this).addClass('selected');
        }else{
            $(this).removeClass('selected');
        }
    });
    $('.data-body').children('.data-body-widget-').hide();
    $('.data-body').children('.data-body-widget').hide();
    // $('#data-mods-request').parent('.data-mods-widget').addClass('hidden');
    $(`.data-body-${cid}`).css('display', 'flex').show();
    $('.data-body').show();

    if(cid == 'unit'){
        $('#data-header-projectid').attr('cid','unit');
        cidUnit();
        
    }
    if(cid == 'equipment'){
        $('#data-header-projectid').attr('cid','equipment');
        cidEquipment();
    }
    if(cid == 'file'){
        $('#data-header-projectid').attr('cid','file');
        cidFile();
    }
    if(cid == 'icon'){
        $('#data-header-projectid').attr('cid','icon');
        cidIcon();
    }

});
    // data management mods
$('.data-mods-widget').click(function(){
    const id = $(this).children('span').attr('id');
    console.log(id);
    // const projectid = $('#data-header-projectid').text();
    // console.log(projectid);
    
    
    if(id == 'data-mods-refresh'){
        console.log('refresh');

        const cid = $('.data-navigation-widget.selected').attr('cid');
        console.log(cid);
        if(cid != undefined){
            const cb = data=>{
                console.log(data);
                setTimeout(() => {
                    if(cid.includes('unit')){
                        const cb = data=>{
                            console.log(data);
                            setTimeout(() => {
                                fillUnits();
                            }, 0);
                        }
                        ACCUSER.Skid.checkList('Unit', cb, true);
                    }else if (cid.includes('equipment')){
                        const cb = data=>{
                            console.log(data);
                            setTimeout(() => {
                                fillEquipments();
                            }, 0);
                        }
                        ACCUSER.Skid.checkList('Equipment', cb, true);
                    }
                }, 0);
            }
            ACCUSER.checkList('Alert', cb, true);
        }
    }
    if(id == 'data-mods-dashboard'){
        console.log('dashboard');
        $('.data-con').hide();
        $('.dashboard-con').show();
    }
    if(id == 'data-mods-print'){
        console.log('Printing');
    
        let body = $('.data-body').html();
        let content = `<div class="data-body">${body}</div>`;

        printPageArea(content);
    }
    if(id == 'data-mods-dashboard'){
        console.log('dashboard');
    }
    if(id == 'data-mods-unit'){
        // console.log('unit');
        $('.data-body-unit-ui').hide();
        $('.data-body-unit-create').css('display', 'flex').show();
        $('#data-body-unit-create-rngid').click();
    }
    if(id == 'data-mods-subunit'){
        // console.log('subunit');
        $('.data-body-unit-ui').hide();
        $('.data-body-unit-createsub').css('display', 'flex').show();
        $('.data-body-unit-addprop').css('display', 'flex').show();
        const uid = $(this).children('span').attr('uid');
        console.log(uid);
        $('#data-body-unit-createsub-rngid').click();
        $('#data-body-unit-createsub-uid').val(uid);
        $('.data-body-unit-addprop').attr('ui','create');
        $('.data-body-unit-createsub').children('.propcon').empty().append(`
            <div class="widget" type="text">
                <span class="subtitle">Process</span>
                <div class="inputholder">
                    <input class="text" type="text" placeholder="Process">
                    <i onclick="removeProp(this);" class="fas fa-trash"></i>
                </div>
            </div>
            <div class="widget" type="text">
                <span class="subtitle">Tag</span>
                <div class="inputholder">
                    <input class="text" type="text" placeholder="Tag">
                    <i onclick="removeProp(this);" class="fas fa-trash"></i>
                </div>
            </div>
        `);
    }
    if(id == 'data-mods-equipment'){
        // console.log('equipment');
        $('.data-body-equipment-ui').hide();
        $('.data-body-equipment-create').css('display', 'flex').show();
        $('#data-body-equipment-create-rngid').click();
    }
    if(id == 'data-mods-subequipment'){
        // console.log('subequipment');
        $('.data-body-equipment-ui').hide();
        $('.data-body-equipment-createsub').css('display', 'flex').show();
        $('.data-body-equipment-addprop').css('display', 'flex').show();
        const eid = $(this).children('span').attr('eid');
        $('#data-body-equipment-createsub-rngid').click();
        $('#data-body-equipment-createsub-eid').val(eid);
        $('.data-body-equipment-addprop').attr('ui','create');
        // console.log(eid);
        $('.data-body-equipment-createsub').children('.propcon').empty().append(`
            <div class="widget" type="text">
                <span class="subtitle">Process</span>
                <div class="inputholder">
                    <input class="text" type="text" placeholder="Process">
                    <i onclick="removeProp(this);" class="fas fa-trash"></i>
                </div>
            </div>
            <div class="widget" type="text">
                <span class="subtitle">Tag</span>
                <div class="inputholder">
                    <input class="text" type="text" placeholder="Tag">
                    <i onclick="removeProp(this);" class="fas fa-trash"></i>
                </div>
            </div>
            <div class="widget" type="text">
                <span class="subtitle">Quantity</span>
                <div class="inputholder">
                    <input class="text" type="text" placeholder="Quantity">
                    <i onclick="removeProp(this);" class="fas fa-trash"></i>
                </div>
            </div>
            <div class="widget" type="text">
                <span class="subtitle">Capacity</span>
                <div class="inputholder">
                    <input class="text" type="text" placeholder="Capacity">
                    <i onclick="removeProp(this);" class="fas fa-trash"></i>
                </div>
            </div>
            <div class="widget" type="text">
                <span class="subtitle">Tank</span>
                <div class="inputholder">
                    <input class="text" type="text" placeholder="Tank">
                    <i onclick="removeProp(this);" class="fas fa-trash"></i>
                </div>
            </div>
            <div class="widget" type="text">
                <span class="subtitle">Room</span>
                <div class="inputholder">
                    <input class="text" type="text" placeholder="Room">
                    <i onclick="removeProp(this);" class="fas fa-trash"></i>
                </div>
            </div>
            <div class="widget" type="text">
                <span class="subtitle">Dimensions</span>
                <div class="inputholder">
                    <input class="text" type="text" placeholder="Dimensions">
                    <i onclick="removeProp(this);" class="fas fa-trash"></i>
                </div>
            </div>
            <div class="widget" type="text">
                <span class="subtitle">Cost</span>
                <div class="inputholder">
                    <input class="text" type="text" placeholder="Cost">
                    <i onclick="removeProp(this);" class="fas fa-trash"></i>
                </div>
            </div>
            <div class="widget" type="text">
                <span class="subtitle">Budget</span>
                <div class="inputholder">
                    <input class="text" type="text" placeholder="Budget">
                    <i onclick="removeProp(this);" class="fas fa-trash"></i>
                </div>
            </div>
        `);
    }

});



// FILE EVENTS
$(document).on('click', '#data-body-file-export', function(){
    const filename = __COMPANY_ID;
    // OPEN_COMPONENT.version = OPEN_COMPONENT.version + 1;
    const jsonObj = SKID_DATA.export();
    console.log(jsonObj);
    const jsonStr = JSON.stringify(jsonObj);
    const encodedStringBtoA = btoa(jsonStr);
    console.log('encodedStringBtoA',encodedStringBtoA);


    $('#data-body-file-export-h').attr({
        "href" : `data:application/octet-stream;charset=utf-8; txt, ${encodedStringBtoA}`,
        "download" : `${filename}.skiddata`
    });
    // OPEN_COMPONENT.updateFilename(filename);
    $('#data-body-file-export-h')[0].click();
});
$(document).on('click', '#data-body-file-save', function(){
    const filename = __COMPANY_ID;
    // OPEN_COMPONENT.version = OPEN_COMPONENT.version + 1;
    const jsonObj = SKID_DATA.export();
    console.log(jsonObj);
    const jsonStr = JSON.stringify(jsonObj);
    const encodedStringBtoA = btoa(jsonStr);
    console.log('encodedStringBtoA',encodedStringBtoA);

    const options = {
        companyid : __COMPANY_ID,
        content : encodedStringBtoA
    }
    const cb =()=>{
        console.log('awesome');
    };
    SKID_DATA.save(options, cb);   
});



//UNIT ADD PROPERTY EVENTS
function removeProp(e){
    $(e).parent('.inputholder').parent('.widget').remove();
}
function clearAddPropForm(){
    $('#data-body-unit-addprop-type').val("text");
    $('#data-body-unit-addprop-name').val("");
    $('#data-body-unit-addprop-text').val("");
    $('#data-body-unit-addprop-measurement').val("");
    $('#data-body-unit-addprop-min').val("");
    $('#data-body-unit-addprop-max').val("");
    $('#data-body-unit-addprop-setpoint').val("");
    $('.data-body-unit-addprop').children('.typenumeric').css('display', 'none').hide();
    $('.data-body-unit-addprop').children('.typetext').css('display', 'block').show();
}
function testObject(obj){
    let gate = true;
    console.log(obj);
    // if(obj.type == "numeric" && ( isNaN(parseFloat(obj.min)) || isNaN(parseFloat(obj.max)) ) ){
        // console.log( isNum(obj.min), obj.min , isNum(obj.max), obj.max);
    if(obj.type == "numeric" && ( !isNum(obj.min) || !isNum(obj.max) || !isNum(obj.setpoint) ) ){
        showToast('Please Input a proper Min Max Set Point Value');
        gate = false;
    }
    if(obj.type == "numeric" && (parseFloat(obj.setpoint) < parseFloat(obj.min)) || (parseFloat(obj.setpoint) > parseFloat(obj.max))  ){
        showToast('Set Point Value Should be within Min and Max');
        gate = false;
    }
    if(obj.type == "numeric" && ( parseFloat(obj.max) <= parseFloat(obj.min) )  ){
        showToast('Max Value Should be Greater than Min Value');
        gate = false;
    }
    if(obj.type == "numeric" && ( parseFloat(obj.min) >= parseFloat(obj.max) )  ){
        showToast('Min Value Should be Lesser than Max Value');
        gate = false;
    }
    if(obj.type == "numeric" && obj.measurement == ""){
        showToast('Please Input a proper Measurement Value');
        gate = false;
    }
    if(obj.type == "text" && obj.text == ""){
        showToast('Please Input a proper Value');
        gate = false;
    }
    if(obj.name == ""){
        showToast('Please Input a proper Name');
        gate = false;
    }
    return gate;
}
$(document).on('change', '#data-body-unit-addprop-type', function(){
    console.log($(this).val());
    
    if($(this).val() == "text"){
        $(this).siblings('.typetext').css('display', 'flex').show();
        $(this).siblings('.typenumeric').css('display', 'none').hide();
    }else{
        $(this).siblings('.typenumeric').css('display', 'flex').show();
        $(this).siblings('.typetext').css('display', 'none').hide();
    }
});
$(document).on('click', '#data-body-unit-addprop-submit', function(){
    const obj = {
        type : $('#data-body-unit-addprop-type').val(),
        name : $('#data-body-unit-addprop-name').val(),
        text : $('#data-body-unit-addprop-text').val(),
        measurement : $('#data-body-unit-addprop-measurement').val(),
        min : $('#data-body-unit-addprop-min').val(),
        max : $('#data-body-unit-addprop-max').val(),
        setpoint : $('#data-body-unit-addprop-setpoint').val(),
    }
    let gate = testObject(obj);

    if(gate){
        console.log(obj);
        const ui = $('.data-body-unit-addprop').attr('ui');
        let html = ``;
        if(obj.type == "text"){
            html = `
            <div class="widget" type="text">
                <span measurement="${obj.measurement}" class="subtitle">${obj.name}</span>
                <div class="inputholder">
                    <input class="text" type="text" placeholder="${obj.name}" value="${obj.text}">
                    <i onclick="removeProp(this);" class="fas fa-trash"></i>
                </div>
            </div>`;
        }else if(obj.type == "numeric"){
            html = `
            <div class="widget" type="numeric">
                <span class="subtitle">${obj.name}</span>
                <div class="inputholder">
                    <input title="Min Value" class="min" type="text" placeholder="Min" value="${obj.min}">
                    <input title="Max Value" class="max" type="text" placeholder="Max" value="${obj.max}">
                    <input title="Set Point Value" class="setpoint" type="text" placeholder="Set Point" value="${obj.setpoint}">
                    <label>${obj.measurement}</label>
                    <i onclick="removeProp(this);" class="fas fa-trash"></i>
                </div>
            </div>`;
        }
        $(`.data-body-unit-${ui}sub`).children('.propcon').append(html);
        clearAddPropForm();
    }
    
});




// UNIT EVENTS
$('#data-body-unit-create-rngid').click(function(){
    $('#data-body-unit-create-id').val(rngSkidUnitId());
});
$('#data-body-unit-createsub-rngid').click(function(){
    $('#data-body-unit-createsub-id').val(rngSkidSubUnitId());
});

$(document).on('click', '.data-body-unit-list-widget', function(e){ 
    if($(e.target).hasClass('title') || e.target == this){
        $('.data-body-unit-ui').hide();
        $('.data-body-equipment-ui').hide();
        if($(this).hasClass('active')){
            // $(this).children('.subs').hide();
            $('.data-body-unit-list-widget').children('.subs').hide();
            // $('.data-body-unit-list-widget').removeClass('active');
            $('#data-mods-subunit').parent('.data-mods-widget').hide();
            $('.data-body-unit-update').hide();
            $(this).removeClass('active');
        }else{
            $('.data-body-unit-list-widget').removeClass('active');
            $('.data-body-unit-list-widget').children('.subs').hide();
            $(this).addClass('active');
            $(this).children('.subs').css('display', 'flex').show();
            $('#data-mods-subunit').attr('uid', $(this).attr('uid')).parent('.data-mods-widget').css('display', 'flex').show();
            $('.data-body-unit-update').css('display', 'flex').show();
            $('#data-body-unit-update-unitid').val($(this).attr('uid'));
            $('#data-body-unit-update-name').val($(this).children('.title').text());
        }
        $('.data-body-unit-updatesub').hide();
        $('.data-body-unit-list-subwidget').removeClass('active');
    }
    
    
});
$(document).on('click', '.data-body-unit-list-subwidget', function(){ // DONE UPDATE
    $('.data-body-unit-ui').hide();
    $('.data-body-equipment-ui').hide();
    $('.data-body-unit-updatesub').children('.propcon').empty();
    $('.data-body-unit-addprop').attr('ui','update').css('display', 'flex').show();

    // console.log($(this).attr('suid'));
    // const suobj = ACCUSER.Skid.Unit.getSubUnitObjById($(this).attr('suid'));
    // // console.log(suobj);
    // const iconobj = ACCUSER.Skid.Icons.getUnitIconById(suobj.icon);

    console.log($(this).attr('uid'), $(this).attr('suid'));
    
    const suobj = SKID_DATA.Unit.getSubUnitObj($(this).attr('uid'), $(this).attr('suid'));
    // console.log(suobj);
    const iconobj = SKID_DATA.Icons.getUnitIconById(suobj.icon);

    // $('#data-body-unit-updatesub-uid').val(suobj.unitid);
    $('#data-body-unit-updatesub-suid').val(suobj.suid);
    $('#data-body-unit-updatesub-name').val(suobj.name);
    $('#data-body-unit-updatesub-uid').val($(this).attr('uid'));

    $.each(suobj.props, function(key, value){
        let html = '';
        if(value.type == "text"){
            html = `
            <div class="widget" type="text">
                <span class="subtitle">${value.name}</span>
                <div class="inputholder">
                    <input class="text" type="text" placeholder="${value.name}" value="${value.text}">
                    <i onclick="removeProp(this);" class="fas fa-trash"></i>
                </div>
            </div>`;
        }else if(value.type == "numeric"){
            html = `
            <div class="widget" type="numeric">
                <span class="subtitle">${value.name}</span>
                <div class="inputholder">
                    <input title="Min Value" class="min" type="text" placeholder="Min" value="${value.min}">
                    <input title="Max Value" class="max" type="text" placeholder="Max" value="${value.max}">
                    <input title="Set Point Value" class="setpoint" type="text" placeholder="Set Point" value="${value.setpoint}">
                    <label>${value.measurement}</label>
                    <i onclick="removeProp(this);" class="fas fa-trash"></i>
                </div>
            </div>`;
        }
        $('.data-body-unit-updatesub').children('.propcon').append(html);
    });
    // $('#data-body-unit-updatesub-process').val(suobj.process);
    // $('#data-body-unit-updatesub-tag').val(suobj.tag);

    if(iconobj != undefined){
        $('#data-body-unit-updatesub-icon').attr({
            'src' : iconobj.url,
            "iid" : suobj.icon,
            "title" : suobj.name,
        });
    }else{
        $('#data-body-unit-updatesub-icon').attr({
            'src' : 'lib/images/skidicons/default.png',
            "iid" : suobj.icon,
            "title" : 'No Selected Icon',
        });
    }
    $('.data-body-unit-list-subwidget').removeClass('active');
    $(this).addClass('active');
    $('.data-body-unit-updatesub').css('display', 'flex').show();
});

$('#data-body-unit-create-save').click(function(){ // DONE UPDATE
    const options = {
        'uid' : $('#data-body-unit-create-id').val(),
        'name' : $('#data-body-unit-create-name').val()
    }
    const cb =()=>{
        // console.log('tasty');
        showNotification('Unit Update','Saved Successfully.');
        // fillUnits();
        fillUnitsSD();
    };
    SKID_DATA.Unit.createUnit(options);
    setTimeout(() => {
        cb();
    }, 0);

    // to revert - change options.uid into options.id
    // ACCUSER.Skid.Unit.createSkidUnit(options, cb);
});
$('#data-body-unit-createsub-save').click(function(){ // DONE UPDATE
    const doptions = {
        'id' : $('#data-body-unit-createsub-id').val(),
        'name' : $('#data-body-unit-createsub-name').val(),
        'unitid' : $('#data-body-unit-createsub-uid').val(),
        'process' : $('#data-body-unit-createsub-process').val(),
        'tag' : $('#data-body-unit-createsub-tag').val(),
        'icon' : $('#data-body-unit-createsub-icon').attr('iid')
    }
    let mgate = true;
    const options = {
        'uid' : $('#data-body-unit-createsub-uid').val(),
        'suid' : $('#data-body-unit-createsub-id').val(),
        'name' : $('#data-body-unit-createsub-name').val(),
        'icon' : $('#data-body-unit-createsub-icon').attr('iid'),
        'props' : []
    }
    const cb =()=>{
        // console.log('tasty');
        showNotification('SubUnit Update','Saved Successfully.');
        // fillUnits();
        fillUnitsSD();
    };
    
    $('.data-body-unit-createsub').children('.propcon').children('.widget').each(function(){
        const obj = {
            type : $(this).attr('type'),
            name : $(this).children('span').text(),
            measurement : $(this).children('.inputholder').children('label').text(),
            min : $(this).children('.inputholder').children('input.min').val(),
            max : $(this).children('.inputholder').children('input.max').val(),
            setpoint : $(this).children('.inputholder').children('input.setpoint').val(),
            text : $(this).children('.inputholder').children('input.text').val()
        }

        if(testObject(obj)){
            options.props.push(obj);
            console.log(obj);
        }else{
            console.log('DID NOT PASS THE TRIAL');
            mgate = false;
        }
        
    });

    console.log(options);
    
    if(mgate){
        SKID_DATA.Unit.createSubUnit(options);
        cb();
    }

    // ACCUSER.Skid.Unit.createSkidSubUnit(options, cb);
    // console.log(options);
});
$(document).on('click', '#data-body-unit-update-update', function(){ // DONE UPDATE
    const doptions = {
        'id' : $('#data-body-unit-update-unitid').val(),
        'name' : $('#data-body-unit-update-name').val()
    }
    const options = {
        'uid' : $('#data-body-unit-update-unitid').val(),
        'name' : $('#data-body-unit-update-name').val()
    }
    const cb =()=>{
        // console.log('tasty');
        // fillUnits();
        fillUnitsSD();
        showNotification('Unit Update','Updated Successfully.');
    };

    SKID_DATA.Unit.updateUnit(options);
    cb();
    // ACCUSER.Skid.Unit.updateSkidUnit(options, cb);
});
$(document).on('click', '#data-body-unit-update-delete', function(){ // DONE UPDATE
    const cbtrue =()=>{
        const doptions = {
            'id' : $('#data-body-unit-update-unitid').val()
        }
        const options = {
            'uid' : $('#data-body-unit-update-unitid').val()
        }
        const cb =()=>{
            // console.log('tasty');
            // fillUnits();
            fillUnitsSD();
            showNotification('Unit Update','Deleted Successfully.');
        };

        SKID_DATA.Unit.deleteUnit(options);
        cb();
        // ACCUSER.Skid.Unit.deleteSkidUnit(options, cb);
    };
    const cbfalse =()=>{
        showNotification('Unit Update','Cancelled Action');
    };
    showAction("Deleting the Unit will also delete all Subunits within it. Proceed?", cbtrue, cbfalse);
});
$(document).on('click', '#data-body-unit-updatesub-update', function(){ // DONE UPDATE
    const doptions = {
        'id' : $('#data-body-unit-updatesub-suid').val(),
        'name' : $('#data-body-unit-updatesub-name').val(),
        'unitid' : $('#data-body-unit-updatesub-uid').val(),
        'process' : $('#data-body-unit-updatesub-process').val(),
        'tag' : $('#data-body-unit-updatesub-tag').val(),
        'icon' : $('#data-body-unit-updatesub-icon').attr('iid')
    }
    let mgate = true;
    const options = {
        'suid' : $('#data-body-unit-updatesub-suid').val(),
        'name' : $('#data-body-unit-updatesub-name').val(),
        'uid' : $('#data-body-unit-updatesub-uid').val(),
        'props' : [],
        'icon' : $('#data-body-unit-updatesub-icon').attr('iid')
    }

    $('.data-body-unit-updatesub').children('.propcon').children('.widget').each(function(){
        const obj = {
            type : $(this).attr('type'),
            name : $(this).children('span').text(),
            measurement : $(this).children('.inputholder').children('label').text(),
            min : $(this).children('.inputholder').children('input.min').val(),
            max : $(this).children('.inputholder').children('input.max').val(),
            setpoint : $(this).children('.inputholder').children('input.setpoint').val(),
            text : $(this).children('.inputholder').children('input.text').val()
        }
        if(testObject(obj)){
            options.props.push(obj);
        }else{
            mgate = false;
        }
    });

    if(mgate){
        const cb =()=>{
            // fillUnits();
            fillUnitsSD();
            showNotification('SubUnit Update','Updated Successfully.');
        };
        console.log(options);
        SKID_DATA.Unit.updateSubUnit(options);
        cb();
    }

    // ACCUSER.Skid.Unit.updateSkidSubUnit(options, cb);
});
$(document).on('click', '#data-body-unit-updatesub-delete', function(){ // DONE UPDATE
    const doptions = {
        'id' : $('#data-body-unit-updatesub-suid').val()
    }
    const options = {
        'suid' : $('#data-body-unit-updatesub-suid').val(),
        'uid' : $('#data-body-unit-updatesub-uid').val()
    }
    const cb =()=>{
        // fillUnits();
        fillUnitsSD();
        showNotification('SubUnit Update','Deleted Successfully.');
    };

    SKID_DATA.Unit.deleteSubUnit(options);
    cb();
    // ACCUSER.Skid.Unit.deleteSkidSubUnit(options, cb);
});

$(document).on('click', '#data-body-unit-search-submit', function(){ // DONE UPDATE
    const q = $('#data-body-unit-search-field').val();
    console.log(q);
    // fillUnitsWithFilter(q);
    fillUnitsWithFilterSD(q);
});
$(document).on('keyup', '#data-body-unit-search-field', function(){ // DONE UPDATE
    const q = $(this).val();

    if(q == ""){
        // fillUnits();
        fillUnitsSD();
    }
});



// UNIT && EQUIPMENTS SET POINT EVENTS
$(document).on('keyup', 'input.setpoint', function(){
    const min = parseFloat($(this).siblings('.min').val());
    const max = parseFloat($(this).siblings('.max').val());
    const v = parseFloat($(this).val());

    if(isNaN(min) || isNaN(max) || isNaN(v)){
        showToast("Please Make Sure all values are Numbers");
    }else{
        if(v >= min && v <= max){
            console.log('Values are okay');
            $(this).css('border', 'thin solid green');
        }else{
            showToast("Please Make Sure Value is within Min Max");
            $(this).css('border', 'thin solid red');
            // const z = $(this).val().slice(0, -1);
            // $(this).val(z);
        }
    }
});



// EQUIPMENTS ADD PROPERTY EVENTS EQUIPMENT
function clearAddPropFormEquipment(){
    $('#data-body-equipment-addprop-type').val("text");
    $('#data-body-equipment-addprop-name').val("");
    $('#data-body-equipment-addprop-text').val("");
    $('#data-body-equipment-addprop-measurement').val("");
    $('#data-body-equipment-addprop-min').val("");
    $('#data-body-equipment-addprop-max').val("");
    $('#data-body-equipment-addprop-setpoint').val("");
    $('.data-body-equipment-addprop').children('.typenumeric').css('display', 'none').hide();
    $('.data-body-equipment-addprop').children('.typetext').css('display', 'block').show();
}
$(document).on('change', '#data-body-equipment-addprop-type', function(){
    console.log($(this).val());
    
    if($(this).val() == "text"){
        $(this).siblings('.typetext').css('display', 'flex').show();
        $(this).siblings('.typenumeric').css('display', 'none').hide();
    }else{
        $(this).siblings('.typenumeric').css('display', 'flex').show();
        $(this).siblings('.typetext').css('display', 'none').hide();
    }
});
$(document).on('click', '#data-body-equipment-addprop-submit', function(){
    const obj = {
        type : $('#data-body-equipment-addprop-type').val(),
        name : $('#data-body-equipment-addprop-name').val(),
        text : $('#data-body-equipment-addprop-text').val(),
        measurement : $('#data-body-equipment-addprop-measurement').val(),
        min : $('#data-body-equipment-addprop-min').val(),
        max : $('#data-body-equipment-addprop-max').val(),
        setpoint : $('#data-body-equipment-addprop-setpoint').val(),
    }
    let gate = testObject(obj);

    if(gate){
        console.log(obj);
        const ui = $('.data-body-equipment-addprop').attr('ui');
        let html = ``;
        if(obj.type == "text"){
            html = `
            <div class="widget" type="text">
                <span class="subtitle">${obj.name}</span>
                <div class="inputholder">
                    <input class="text" type="text" placeholder="${obj.name}" value="${obj.text}">
                    <i onclick="removeProp(this);" class="fas fa-trash"></i>
                </div>
            </div>`;
        }else if(obj.type == "numeric"){
            html = `
            <div class="widget" type="numeric">
                <span measurement="${obj.measurement}" class="subtitle">${obj.name}</span>
                <div class="inputholder">
                    <input title="Min Value" class="min" type="text" placeholder="Min" value="${obj.min}">
                    <input title="Max Value" class="max" type="text" placeholder="Max" value="${obj.max}">
                    <input title="Set Point Value" class="setpoint" type="text" placeholder="Set Point" value="${obj.setpoint}">
                    <label>${obj.measurement}</label>
                    <i onclick="removeProp(this);" class="fas fa-trash"></i>
                </div>
            </div>`;
        }
        $(`.data-body-equipment-${ui}sub`).children('.propcon').append(html);
        clearAddPropForm();
    }
    
});


// EQUIPMENT EVENTS
$('#data-body-equipment-create-rngid').click(function(){
    $('#data-body-equipment-create-id').val(rngSkidEquipmentId());
});
$('#data-body-equipment-createsub-rngid').click(function(){
    $('#data-body-equipment-createsub-seid').val(rngSkidSubEquipmentId());
});

$(document).on('click', '.data-body-equipment-list-widget', function(e){
    if($(e.target).hasClass('title') || e.target == this){
        $('.data-body-unit-ui').hide();
        $('.data-body-equipment-ui').hide();
        if($(this).hasClass('active')){
            // $(this).children('.subs').hide();
            $('.data-body-equipment-list-widget').children('.subs').hide();
            // $('.data-body-equipment-list-widget').removeClass('active');
            $('#data-mods-subequipment').parent('.data-mods-widget').hide();
            $('.data-body-equipment-update').hide();
            $(this).removeClass('active');
        }else{
            $('.data-body-equipment-list-widget').removeClass('active');
            $('.data-body-equipment-list-widget').children('.subs').hide();
            $(this).addClass('active');
            $(this).children('.subs').css('display', 'flex').show();
            $('#data-mods-subequipment').attr('eid', $(this).attr('eid')).parent('.data-mods-widget').css('display', 'flex').show();
            $('.data-body-equipment-update').css('display', 'flex').show();
            $('#data-body-equipment-update-eid').val($(this).attr('eid'));
            // console.log($(this).attr('eid'));
            $('#data-body-equipment-update-name').val($(this).children('.title').text());
        }
        $('.data-body-equipment-updatesub').hide();
        $('.data-body-equipment-list-subwidget').removeClass('active');
    }
    
    
});
$(document).on('click', '.data-body-equipment-list-subwidget', function(){ // DONE UPDATE
    $('.data-body-equipment-ui').hide();
    $('.data-body-equipment-ui').hide();
    $('.data-body-equipment-updatesub').children('.propcon').empty();
    $('.data-body-equipment-addprop').css('display', 'flex').show();
    $('.data-body-equipment-addprop').attr('ui','update');


    $('.data-body-equipment-updatesub').css('display', 'flex').show();
    // console.log($(this).attr('seid'));
    // const suobj = ACCUSER.Skid.Equipment.getSubEquipmentObjById($(this).attr('seid'));
    const suobj = SKID_DATA.Equipment.getSubEquipmentObj($(this).attr('eid'), $(this).attr('seid'));
    // console.log(suobj);

    const iconobj = SKID_DATA.Icons.getEquipmentIconById(suobj.icon);
    // const iconobj = ACCUSER.Skid.Icons.getEquipmentIconById(suobj.icon);
    $('#data-body-equipment-updatesub-eid').val($(this).attr('eid'));
    $('#data-body-equipment-updatesub-seid').val(suobj.seid);
    // $('#data-body-equipment-updatesub-eid').val(suobj.equipmentid);
    // $('#data-body-equipment-updatesub-seid').val(suobj.id);
    $('#data-body-equipment-updatesub-name').val(suobj.name);
    $('#data-body-equipment-updatesub-equipmentid').val(suobj.equipmentid);
    
    // $('#data-body-equipment-updatesub-eid').val(suobj.equipmentid);
    // $('#data-body-equipment-updatesub-seid').val(suobj.id);
    // $('#data-body-equipment-updatesub-name').val(suobj.name);
    // $('#data-body-equipment-updatesub-equipmentid').val(suobj.equipmentid);
    // $('#data-body-equipment-updatesub-process').val(suobj.process);
    // $('#data-body-equipment-updatesub-tag').val(suobj.tag);
    // $('#data-body-equipment-updatesub-quantity').val(suobj.quantity);
    // $('#data-body-equipment-updatesub-capacity').val(suobj.capacity);
    // $('#data-body-equipment-updatesub-tank').val(suobj.tank);
    // $('#data-body-equipment-updatesub-room').val(suobj.room);
    // $('#data-body-equipment-updatesub-dimension').val(suobj.dimensions);
    // $('#data-body-equipment-updatesub-cost').val(suobj.cost);
    // $('#data-body-equipment-updatesub-budget').val(suobj.budget);

    $.each(suobj.props, function(key, value){
        let html = '';
        if(value.type == "text"){
            html = `
            <div class="widget" type="text">
                <span class="subtitle">${value.name}</span>
                <div class="inputholder">
                    <input class="text" type="text" placeholder="${value.name}" value="${value.text}">
                    <i onclick="removeProp(this);" class="fas fa-trash"></i>
                </div>
            </div>`;
        }else if(value.type == "numeric"){
            html = `
            <div class="widget" type="numeric">
                <span class="subtitle">${value.name}</span>
                <div class="inputholder">
                    <input title="Min Value" class="min" type="text" placeholder="Min" value="${value.min}">
                    <input title="Max Value" class="max" type="text" placeholder="Max" value="${value.max}">
                    <input title="Set Point Value" class="setpoint" type="text" placeholder="Set Point" value="${value.setpoint}">
                    <label>${value.measurement}</label>
                    <i onclick="removeProp(this);" class="fas fa-trash"></i>
                </div>
            </div>`;
        }
        $('.data-body-equipment-updatesub').children('.propcon').append(html);
    });

    if(iconobj != undefined){
        $('#data-body-equipment-updatesub-icon').attr({
            'src' : iconobj.url,
            "iid" : suobj.icon,
            "title" : suobj.name,
        });
    }else{
        $('#data-body-equipment-updatesub-icon').attr({
            'src' : 'lib/images/skidicons/default.png',
            "iid" : suobj.icon,
            "title" : 'No Selected Icon',
        });
    }

    $('.data-body-equipment-list-subwidget').removeClass('active');
    $(this).addClass('active');
});

$('#data-body-equipment-create-save').click(function(){ // DONE UPDATE
    const doptions = {
        'id' : $('#data-body-equipment-create-id').val(),
        'name' : $('#data-body-equipment-create-name').val()
    }
    const options = {
        'eid' : $('#data-body-equipment-create-id').val(),
        'name' : $('#data-body-equipment-create-name').val()
    }
    const cb =()=>{
        // console.log('tasty');
        showNotification('Equipment Update','Saved Successfully.');
        // fillEquipments();
        fillEquipmentsSD();
    };

    SKID_DATA.Equipment.createEquipment(options);
    cb();
    // ACCUSER.Skid.Equipment.createSkidEquipment(options, cb);
});
$('#data-body-equipment-createsub-save').click(function(){ // DONE UPDATE
    const doptions = {
        'id' : $('#data-body-equipment-createsub-seid').val(),
        'name' : $('#data-body-equipment-createsub-name').val(),
        'equipmentid' : $('#data-body-equipment-createsub-eid').val(),
        'process' : $('#data-body-equipment-createsub-process').val(),
        'tag' : $('#data-body-equipment-createsub-tag').val(),
        'quantity' : $('#data-body-equipment-createsub-quantity').val(),
        'capacity' : $('#data-body-equipment-createsub-capacity').val(),
        'tank' : $('#data-body-equipment-createsub-tank').val(),
        'room' : $('#data-body-equipment-createsub-room').val(),
        'dimensions' : $('#data-body-equipment-createsub-dimension').val(),
        'cost' : $('#data-body-equipment-createsub-cost').val(),
        'budget' : $('#data-body-equipment-createsub-budget').val(),
        'icon' : $('#data-body-equipment-createsub-icon').attr('iid')
    }
    let mgate = true;
    const options = {
        'eid' : $('#data-body-equipment-createsub-eid').val(),
        'seid' : $('#data-body-equipment-createsub-seid').val(),
        'name' : $('#data-body-equipment-createsub-name').val(),
        'icon' : $('#data-body-equipment-createsub-icon').attr('iid'),
        'props' : [],
    }
    $('.data-body-equipment-createsub').children('.propcon').children('.widget').each(function(){
        const obj = {
            type : $(this).attr('type'),
            name : $(this).children('span').text(),
            measurement : $(this).children('.inputholder').children('label').text(),
            min : $(this).children('.inputholder').children('input.min').val(),
            max : $(this).children('.inputholder').children('input.max').val(),
            setpoint : $(this).children('.inputholder').children('input.setpoint').val(),
            text : $(this).children('.inputholder').children('input.text').val()
        }
        if(testObject(obj)){
            options.props.push(obj);
        }else{
            mgate = false;
        }
    });
    console.log(options);
    if(mgate){
        const cb =()=>{
            // console.log('tasty');
            showNotification('SubEquipment Update','Saved Successfully.');
            // fillEquipments();
            fillEquipmentsSD();
        };
        SKID_DATA.Equipment.createSubEquipment(options);
        cb();
    }
    // ACCUSER.Skid.Equipment.createSkidSubEquipment(options, cb);
});
$(document).on('click', '#data-body-equipment-update-update', function(){ // DONE UPDATE
    const doptions = {
        'id' : $('#data-body-equipment-update-eid').val(),
        'name' : $('#data-body-equipment-update-name').val()
    }
    const options = {
        'eid' : $('#data-body-equipment-update-eid').val(),
        'name' : $('#data-body-equipment-update-name').val()
    }
    const cb =()=>{
        // console.log('tasty');
        // fillEquipments();
        fillEquipmentsSD();
        showNotification('Equipment Update','Updated Successfully.');
    };

    SKID_DATA.Equipment.updateEquipment(options);
    cb();
    // ACCUSER.Skid.Equipment.updateSkidEquipment(options, cb);
});
$(document).on('click', '#data-body-equipment-update-delete', function(){ // DONE UPDATE
    const cbtrue =()=>{
        const doptions = {
            'id' : $('#data-body-equipment-update-eid').val()
        }
        const options = {
            'eid' : $('#data-body-equipment-update-eid').val()
        }
        const cb =()=>{
            // console.log('tasty');
            // fillEquipments();
            fillEquipmentsSD();
            showNotification('Equipment Update','Deleted Successfully.');
        };
        // console.log(options);
        

        SKID_DATA.Equipment.deleteEquipment(options);
        cb();
        // ACCUSER.Skid.Equipment.deleteSkidEquipment(options, cb);
    };
    const cbfalse =()=>{
        showNotification('Equipment Update','Cancelled Action');
    };
    showAction("Deleting the Equipment will also delete all SubEquipments within it. Proceed?", cbtrue, cbfalse);
});
$(document).on('click', '#data-body-equipment-updatesub-update', function(){ // DONE UPDATE
    // const doptions = {
    //     'id' : $('#data-body-equipment-updatesub-seid').val(),
    //     'name' : $('#data-body-equipment-updatesub-name').val(),
    //     'equipmentid' : $('#data-body-equipment-updatesub-eid').val(),
    //     'process' : $('#data-body-equipment-updatesub-process').val(),
    //     'tag' : $('#data-body-equipment-updatesub-tag').val(),
    //     'quantity' : $('#data-body-equipment-updatesub-quantity').val(),
    //     'capacity' : $('#data-body-equipment-updatesub-capacity').val(),
    //     'tank' : $('#data-body-equipment-updatesub-tank').val(),
    //     'room' : $('#data-body-equipment-updatesub-room').val(),
    //     'dimensions' : $('#data-body-equipment-updatesub-dimension').val(),
    //     'cost' : $('#data-body-equipment-updatesub-cost').val(),
    //     'budget' : $('#data-body-equipment-updatesub-budget').val(),
    //     'icon' : $('#data-body-equipment-updatesub-icon').attr('iid')
    // }
    let mgate = true;
    const options = {
        'seid' : $('#data-body-equipment-updatesub-seid').val(),
        'name' : $('#data-body-equipment-updatesub-name').val(),
        'eid' : $('#data-body-equipment-updatesub-eid').val(),
        'icon' : $('#data-body-equipment-updatesub-icon').attr('iid'),
        'props' : []
    }
    $('.data-body-equipment-updatesub').children('.propcon').children('.widget').each(function(){
        const obj = {
            type : $(this).attr('type'),
            name : $(this).children('span').text(),
            measurement : $(this).children('.inputholder').children('label').text(),
            min : $(this).children('.inputholder').children('input.min').val(),
            max : $(this).children('.inputholder').children('input.max').val(),
            setpoint : $(this).children('.inputholder').children('input.setpoint').val(),
            text : $(this).children('.inputholder').children('input.text').val()
        }
        
        if(testObject(obj)){
            // console.log(obj);
            options.props.push(obj);
        }else{
            mgate = false;
        }
    });
    if(mgate){
        const cb =()=>{
            // fillEquipments();
            fillEquipmentsSD();
            showNotification('SubEquipment Update','Updated Successfully.');
        };
        SKID_DATA.Equipment.updateSubEquipment(options);
        cb();
    }
    // ACCUSER.Skid.Equipment.updateSkidSubEquipment(options, cb);
});
$(document).on('click', '#data-body-equipment-updatesub-delete', function(){ // DONE UPDATE
    const doptions = {
        'id' : $('#data-body-equipment-updatesub-seid').val()
    }
    const options = {
        'eid' : $('#data-body-equipment-updatesub-eid').val(),
        'seid' : $('#data-body-equipment-updatesub-seid').val()
    }
    const cb =()=>{
        // fillEquipments();
        fillEquipmentsSD();
        showNotification('SubEquipment Update','Deleted Successfully.');
    };
    SKID_DATA.Equipment.deleteSubEquipment(options);
    cb();
    // ACCUSER.Skid.Equipment.deleteSkidSubEquipment(options, cb);
});

$(document).on('click', '#data-body-equipment-search-submit', function(){
    const q = $('#data-body-equipment-search-field').val();
    console.log(q);
    // fillEquipmentsWithFilter(q);
    fillEquipmentsWithFilterSD(q);
});
$(document).on('keyup', '#data-body-equipment-search-field', function(){
    const q = $(this).val();

    if(q == ""){
        // fillEquipments();
        fillEquipmentsSD();
    }
});


// ICON SELECT EVENTS
function data_body_icon_browse_unit(){
    $(document).off('change', '#data-body-icon-browse-unit'); 
    $(document).on('change','#data-body-icon-browse-unit', function(){
        // console.log($(this).val().split('\\').pop());
        let filename = $(this).val().split('\\').pop();
        let extension = filename.split('.').pop();
        
        if(filename){
            console.log(filename, extension);
           
        }else{
            console.log('cancelled');
        }
    });
}
function data_body_icon_browse_equipment(){
    $(document).off('change', '#data-body-icon-browse-equipment'); 
    $(document).on('change','#data-body-icon-browse-equipment', function(){
        // console.log($(this).val().split('\\').pop());
        let filename = $(this).val().split('\\').pop();
        let extension = filename.split('.').pop();
        
        if(filename){
            console.log(filename, extension);
           
        }else{
            console.log('cancelled');
        }
    });
}
function deleteIcon(e){
    // $(e).parent('.widget').remove();
    const iconid = $(e).attr('iid');
    const type = $(e).attr('type');

    const options = {
        iconid,
        type
    }
    const callback =data=>{
        console.log(data);
        fillIcons();
    };

    SKID_DATA.Icons.deleteIcon(options, callback);
    
    // console.log(iconid, type);
    
}
function fillIcons(){
    const uiobj = SKID_DATA.Icons.getUnitIcons();
    const eiobj = SKID_DATA.Icons.getEquipmentIcons();

    // console.log(uiobj, eiobj);
    $('#data-body-icon-unit-widgetcon').empty();
    $.each(uiobj, function(key, value){
        $('#data-body-icon-unit-widgetcon').append(`
            <div class="widget">
                <img src="${value.url}" title="${value.name}" alt="${value.name}">
                <i iid="${value.id}" type="unit" class="fas fa-trash" onclick="deleteIcon(this);" ></i>
            </div>
        `);
    });

    $('#data-body-icon-equipment-widgetcon').empty();
    $.each(eiobj, function(key, value){
        $('#data-body-icon-equipment-widgetcon').append(`
            <div class="widget">
                <img src="${value.url}" title="${value.name}" alt="${value.name}">
                <i iid="${value.id}" type="equipment" class="fas fa-trash" onclick="deleteIcon(this);" ></i>
            </div>
        `);
    });
    resetIconForm();
    
}
function resetIconForm(){
    $('#data-body-icon-text-unit').val("");
    $('#data-body-icon-text-equipment').val("");
    $('#data-body-icon-browse-unit')[0].files[0] = null;
    $('#data-body-icon-browse-equipment')[0].files[0] = null;
    $('#data-body-icon-browse-unit').val(null);
    $('#data-body-icon-browse-equipment').val(null);
}
$(document).on('keyup', '#data-body-iconselect-search', function(){
    const q = $(this).val();
    const ui = $(this).attr('ui');
    let obj = [];
    if(ui.includes('unit')){
        obj = ACCUSER.Skid.Icons.getUnitIcons();
    }else if(ui.includes('equipment')){
        obj = ACCUSER.Skid.Icons.getEquipmentIcons();
    }
    

    $('.data-body-iconselect-icontainer').empty();
    $.each(obj, function(key, value){
        if(value.name.includes(q)){
            $('.data-body-iconselect-icontainer').append(`
                <img class="data-body-iconselect-iconwidget" iid="${value.id}" src="${value.url}" alt="${value.name}" title="${value.name}" >
            `);
        }
    });

    
});
$(document).on('click', '.data-body-iconselect-iconwidget', function(){
    $('.data-body-iconselect-iconwidget').removeClass('active');
    $(this).addClass('active');
    $('#data-body-iconselect-submit').attr({
        'icon' : $(this).attr('iid'),
        "url" :  $(this).attr('src')
    });
});
$(document).on('click', '#data-body-iconselect-submit', function(){
    const icon = $(this).attr('icon');
    const url = $(this).attr('url');
    const operation = $(this).attr('operation');
    const ui = $(this).attr('ui');
    console.log(`#data-body-${ui}-${operation}sub-icon`, icon);
    $(`#data-body-${ui}-${operation}sub-icon`).attr({
        'src' : url,
        'iid' : icon
    });
    $('.data-body-iconselect').hide();
});
$(document).on('click', '#data-body-icon-addequipment', function(){
    let gate = true;
    if($('#data-body-icon-browse-equipment')[0].files[0] == undefined || $('#data-body-icon-browse-equipment')[0].files[0] == null){
        showToast('Please Select an Image');
        gate = false;
    }
    if(gate){
        const options = {
            "name" : $('#data-body-icon-text-equipment').val()
        }
        const callback =data=>{
            console.log(data);
    
            if(!data.response.includes('error')){
                showNotification('Upload Success');
                fillIcons();
            }else{
                showNotification("Something went wrong.. Please try again..");
            }
            
        };
        SKID_DATA.Icons.addEquipmentIcon(options, callback);
    }

    // console.log();
    
});
$(document).on('click', '#data-body-icon-addunit', function(){
    
    const options = {
        "name" : $('#data-body-icon-text-unit').val()
    }
    const callback =data=>{
        console.log(data);

        if(!data.response.includes('error')){
            showNotification('Upload Success');
            fillIcons();
        }else{
            showNotification("Something went wrong.. Please try again..");
        }
        
    };
    SKID_DATA.Icons.addUnitIcon(options, callback);
});









// SKID NAVIGATION EVENTS
function cidMy(){
    fillSkidMy();
    $('.skid-body-my-details').css('display', 'none').hide();
    $('.skid-body-my-connect').css('display', 'none').hide();
    $('#skid-mods-connect').parent('.skid-mods-widget').css('display', 'flex').show();

}
function cidCompany(){
    $('.skid-body-company-content').css('display', 'none').hide();
    $('.skid-body-company-header').css('display', 'none').hide();
    $('#skid-mods-connect').parent('.skid-mods-widget').css('display', 'none').hide();

    console.log('start');
    showToast("Fetching All Company Data Files Please Wait...");
    const cb =()=>{
        const cfobj = SKID_FILE.getCompanyFiles();
        // console.log(cfobj);
        let x = 0;
        let y = cfobj.length;
        
        $.each(cfobj, function(key, value){
            const cb =data=>{
                console.log(data);
                if(x == (y-1)){
                    console.log('end');
                    showToast("Done Fetching Please Proceed");
                    $('.skid-body-company-header').css('display', 'flex').show();
                }else{
                    x++;
                }
            };
            SKID_FILE.getCompanyFileObject(value.id, cb);
        });
    };
    SKID_FILE.fetchAll(cb);
}
function cidArchive(){
    fillSkidArchive();
    $('.skid-body-archive-props').css('display', 'none').hide();
    // $('.skid-body-my-connect').css('display', 'none').hide();
    // $('#skid-mods-connect').parent('.skid-mods-widget').css('display', 'flex').show();

}
$('.skid-navigation-widget').click(function(){
    const cid = $(this).attr('cid');
    $('#skid-mods-refresh').parent('.data-mods-widget').removeClass('hidden').show();

    $('.skid-navigation').children('.skid-navigation-widget').each(function(){
        const zid = $(this).attr('cid');
        if(zid == cid){
            $(this).addClass('selected');
        }else{
            $(this).removeClass('selected');
        }
    });
    $('.skid-body').children('.skid-body-widget-').hide();
    $('.skid-body').children('.skid-body-widget').hide();
    // $('#skid-mods-request').parent('.skid-mods-widget').addClass('hidden');
    $(`.skid-body-${cid}`).css('display', 'flex').show();
    $('.skid-body').show();

    if(cid == 'my'){
        $('#skid-header-projectid').attr('cid','my');
        cidMy();
    }
    if(cid == 'company'){
        $('#skid-header-projectid').attr('cid','company');
        cidCompany();
    }
    if(cid == 'archive'){
        $('#skid-header-projectid').attr('cid','archive');
        cidArchive();
    }

});
    // data management mods
$('.skid-mods-widget').click(function(){
    const id = $(this).children('span').attr('id');
    console.log(id);
    // const projectid = $('#data-header-projectid').text();
    // console.log(projectid);
    
    
    if(id == 'skid-mods-refresh'){
        console.log('refresh');

        const cid = $('.skid-navigation-widget.selected').attr('cid');
        console.log(cid);
        if(cid != undefined){
            const cb = data=>{
                console.log(data);
                setTimeout(() => {
                    if(cid.includes('unit')){
                        const cb = data=>{
                            console.log(data);
                            
                        }
                        // ACCUSER.Skid.checkList('Unit', cb, true);
                    }else if (cid.includes('equipment')){
                        const cb = data=>{
                            console.log(data);
                            
                        }
                        // ACCUSER.Skid.checkList('Equipment', cb, true);
                    }
                }, 0);
            }
            ACCUSER.checkList('Alert', cb, true);
        }
    }
    if(id == 'skid-mods-dashboard'){
        console.log('dashboard');
        $('.skid-con').hide();
        $('.dashboard-con').show();
    }
    if(id == 'skid-mods-connect'){
        console.log('Connecct');
        $('#skid-mods-connect').attr('status', 'ok').parent('.skid-mods-widget').css('display', 'none').hide();
        $('#skid-mods-back').parent('.skid-mods-widget').css('display', 'flex').show();

        $('.skid-body-my-details').css('display', 'none').hide();
        $('.skid-body-my-connect').css('display', 'flex').show();
    }
    if(id == 'skid-mods-back'){
        console.log('Connecct');
        $('#skid-mods-back').parent('.skid-mods-widget').css('display', 'none').hide();
        $('#skid-mods-connect').attr('status', 'error').parent('.skid-mods-widget').css('display', 'flex').show();

        $('.skid-body-my-connect').css('display', 'none').hide();
        $('.skid-body-my-details').css('display', 'flex').show();
    }
    

});





// MY SKIDS EVENT
function fillSkidMy(){
    $('#skid-body-my-projectlist').empty();
    const data = SKID_FILE.getOwner(__ID);
    $.each(data, function(key, value){
        const html = `<span fid="${value.id}" class="skid-body-my-projectlist-h widget">${value.filename}</span>`;
        $('#skid-body-my-projectlist').append(html);
    });
}
function fillMyAccountList(id, callback=()=>{}){
    $('#skid-body-my-accountlist').empty();
    const cb =data=>{
        console.log(data);
        if(data.length == 0){
            $('#skid-body-my-accountlist').append('<span class="widget">Empty</span>');
        }else{
            $.each(data, function(key, value){
                const html = `<span fid="${id}" faid="${value.id}" class="skid-body-my-accountlist-h widget">${value.accountid}<i class="skid-body-my-accountlist-d fas fa-trash"></i></span>`;
                $('#skid-body-my-accountlist').append(html);
            });
        }
        callback();
    };
    SKID_FILE.getFileAccess(id, cb);
}
function fillMyFileAccessRequest(id, callback=()=>{}){
    $('#skid-body-my-fileaccessrequest').empty();
    const cb =data=>{
        console.log(data);
        if(data.length == 0){
            $('#skid-body-my-fileaccessrequest').append('<span class="widget">Empty</span>');
        }else{
            $.each(data, function(key, value){
                const html = `<span fid="${id}" farid="${value.id}" aid="${value.accountid}" class="skid-body-my-fileaccessrequest-h widget">${value.accountid} <div><button class="skid-body-my-fileaccessrequest-g">Grant Access</button> <i class="skid-body-my-fileaccessrequest-d fas fa-trash"></i></div></span>`;
                $('#skid-body-my-fileaccessrequest').append(html);
            });
        }
        callback();
    };
    SKID_FILE.getFileAccessRequest(id, cb);
}
function fillMyProFlowProjectList(id, prlist=[], callback=()=>{}){
    // console.log('fillMyProFlowProjectList', ACCUSER._PROJECTS);
    const cb =data=>{
        console.log(data);
        $('#skid-body-my-pfprojectlist').empty();
        $.each(ACCUSER._PROJECTS, function(key, value){
            console.log(value);
            let crgate = true;
            $.each(prlist, function(key, value1){
                if(value.projectid == value1){
                    crgate = false;
                }
            });
            if(crgate){
                $('#skid-body-my-pfprojectlist').append(`
                    <span fid="${id}" prid="${value.projectid}" class="skid-body-my-pfprojectlist-h widget">${value.projectname} - ${value.projectid} <i class="skid-body-my-pfprojectlist-a fas fa-plus"></i> </span>
                `);
            }
        });
        callback();
    };
    ACCUSER.checkList("Projects", cb);
}
function fillMyProFlowConnectList(id, callback=()=>{}){
    $('#skid-body-my-pfprojectconnectlist').empty();
    let ret = [];
    const cb =data=>{
        console.log(data);
        if(data.length == 0){
            $('#skid-body-my-pfprojectconnectlist').append('<span class="widget">Empty</span>');
        }else{
            $.each(data, function(key, value){
                const prdata = ACCUSER.getProject(value.projectid).getMinData();
                const html = `<span fid="${id}" fpfcid="${value.id}" aid="${value.projectid}" class="skid-body-my-pfprojectconnectlist-h widget">${prdata.projectname} - ${value.projectid} <i class="skid-body-my-pfprojectconnectlist-d fas fa-trash"></i></span>`;
                $('#skid-body-my-pfprojectconnectlist').append(html);
                ret.push(value.projectid);
            });
        }
        callback(ret);
    };
    SKID_FILE.getFileProflowConnect(id, cb);
}
function fillMyProflowCon(fid, callback=()=>{}){
    const cb =data=>{
        console.log(data);
        const cb =()=>{
            console.log('Done Fill');
            callback();
        };
        fillMyProFlowProjectList(fid, data, cb);
    };
    fillMyProFlowConnectList(fid, cb);
}
$(document).on('click', '.skid-body-my-projectlist-h', function(){
    const id = $(this).attr('fid');
    const cb =data=>{
        console.log(data);
        // do something with the ui potion.
        $('#skid-body-my-details-propscon > .filename').html(`${data.filename} <i class="fas ${data.lock == "locked" ? "fa-lock" : "fa-unlock"}"></i>`);
        $('#skid-body-my-details-propscon > .owner').html(`<b>Creator</b>: ${data.creator.firstname} ${data.creator.id}`);
        $('#skid-body-my-details-propscon > .pages').html(`<b>Pages</b>: ${data.Pages.length}`);
        $('#skid-body-my-details-propscon > .component').html(`<b>Components</b>: ${data.ComponentHeirarchy.length}`);
        $('#skid-body-my-details-propscon > .transfer').html(`<b>Transfer Parameter</b>: ${(parseFloat(data.UnitTransfer.length)) + (parseFloat(data.EquipmentTransfer.length))}`);
        $('#skid-body-my-details-propscon > .modify').html(`<b>Last Modified</b>: ${new Date(data.lastmodified)}`);
        const cb =()=>{
            const cb =()=>{
                const cb =()=>{
                    console.log("Done Fill");
                };
                fillMyProflowCon(id, cb);
            };
            fillMyFileAccessRequest(id, cb);
        };
        fillMyAccountList(id, cb);
        // console.log(faobj);
    };
    SKID_FILE.getFileObject(id, cb);
    $('#skid-body-my-download').attr('fid', id);
    $('#skid-body-my-access-submit').attr('fid', id);

    if($('#skid-mods-connect').attr('status') != "ok"){
        $('.skid-body-my-details').css('display', 'flex').show();
    }

    $('#skid-body-company-header-qr').qrcode({
        link : `http://localhost:8080/skidbuilder_ceis/pages/builder/?viewonly=true&fileid=${id}`,
        height : '120',
        width : '120'
    });

});
$(document).on('click', '.skid-body-my-fileaccessrequest-g', function(){
    const fileid = $(this).parent('div').parent('span').attr('fid');
    const filerequestid = $(this).parent('div').parent('span').attr('farid');
    const accountid = $(this).parent('div').parent('span').attr('aid');
    const cb =()=>{
        const fobj = SKID_FILE.getFile(fileid);
        const cb =()=>{
            const cb =()=>{
                const options = {
                    'id': rngPassword(),
                    'fileid': fileid,
                    'accountid': accountid,
                }
                const cb =()=>{
                    showToast("File Access Granted");
                    fillMyFileAccessRequest(fileid, callback=()=>{});
                };
                fobj.fileaccess.create(options, cb);
            };
            SKID_FILE.getFileAccess(fileid, cb);
        };
        fobj.fileaccessrequest.delete({id: filerequestid}, cb);
    };
    SKID_FILE.getFileAccessRequest(fileid, cb);
});
$(document).on('click', '.skid-body-my-fileaccessrequest-d', function(){
    const fileid = $(this).parent('div').parent('span').attr('fid');
    const filerequestid = $(this).parent('div').parent('span').attr('farid');
    const accountid = $(this).parent('div').parent('span').attr('aid');

    const cb =()=>{
        const fobj = SKID_FILE.getFile(fileid);
        const cb =()=>{
            showToast("File Access Rejected");
            fillMyFileAccessRequest(fileid, callback=()=>{});
        };
        fobj.fileaccessrequest.delete({id: filerequestid}, cb);
    };
    SKID_FILE.getFileAccessRequest(fileid, cb);
});

$(document).on('click', '#skid-body-my-download', function(){
    const id = $(this).attr('fid');
    const cb =jsonObj=>{
        const jsonStr = JSON.stringify(jsonObj);
        const encodedStringBtoA = btoa(jsonStr);
        console.log('encodedStringBtoA',encodedStringBtoA);

        $('#skid-body-my-a-download').attr({
            "href" : `data:application/octet-stream;charset=utf-8; txt, ${encodedStringBtoA}`,
            "download" : `${jsonObj.filename}.ceis`
        });
        $('#skid-body-my-a-download')[0].click();
    };
    SKID_FILE.getFileObject(id, cb);


});
$(document).on('click', '#skid-body-my-open', function(){
    const id = $('#skid-body-my-download').attr('fid');
    window.location.href = domain + `pages/builder/?viewonly=true&fileid=${id}`;
});
$(document).on('click', '#skid-body-my-access-submit', function(){
    const fileid = $(this).attr('fid');
    const accountid = $(this).siblings('input').val();
    const id = rngPassword();

    const obj = {
        'id': id,
        'fileid': fileid,
        'accountid': accountid,
    }
    if(accountid != ""){
        SKID_FILE.getFile(fileid).fileaccess.create(obj);
        // console.log(SKID_FILE.getFile(fileid));
        fillMyAccountList(fileid);
        $(this).siblings('input').val('');
    }else{
        showToast("Please Enter an Account ID");
    }
    // console.log(id, accid);
});
$(document).on('click', '.skid-body-my-accountlist-d', function(){
    const faid = $(this).parent('span').attr('faid');
    const fid = $(this).parent('span').attr('fid');
    // console.log(faid, fid);
    SKID_FILE.getFile(fid).fileaccess.delete({id: faid});
    fillMyAccountList(fid);
});

$(document).on('click', '.skid-body-my-pfprojectlist-a', function(){
    const prid = $(this).parent('span').attr('prid');
    const fid = $(this).parent('span').attr('fid');
    console.log(prid, fid);
    const cb =data=>{
        console.log(data);
        const fobj = SKID_FILE.getFile(fid);
        const cb =()=>{
            
            const cb =()=>{
                console.log("Done Fill");
            };
            fillMyProflowCon(fid, cb);
        };
        fobj.fileproflowconnect.create({
            id : rngPassword(),
            fileid : fid,
            projectid : prid
        }, cb);
    };
    SKID_FILE.getFileProflowConnect(fid, cb);
});
$(document).on('click', '.skid-body-my-pfprojectconnectlist-d', function(){
    const fpfcid = $(this).parent('span').attr('fpfcid');
    const fid = $(this).parent('span').attr('fid');

    const cb =data=>{
        console.log(data);
        const fobj = SKID_FILE.getFile(fid);
        const cb =()=>{
            const cb =()=>{
                console.log("Done Fill");
            };
            fillMyProflowCon(fid, cb);
        };
        fobj.fileproflowconnect.delete({
            id : fpfcid
        }, cb);
    };
    SKID_FILE.getFileProflowConnect(fid, cb);
});


// SEARCH SKIDS EVENT
$(document).on('click', '#skid-body-company-header-search', function(){
    // const filenameGate = $('#skid-body-company-header-filename').is(':checked') ? true : false;
    // const creatorGate = $('#skid-body-company-header-creator').is(':checked') ? true : false;
    // const namesGate = $('#skid-body-company-header-names').is(':checked') ? true : false;
    // const propertiesGate = $('#skid-body-company-header-properties').is(':checked') ? true : false;
    // const datasheetGate = $('#skid-body-company-header-datasheet').is(':checked') ? true : false;
    // const query = $(this).siblings('input').val();
    // let report = "";

    // // console.log(filenameGate, creatorGate, namesGate, propertiesGate, datasheetGate, query);
    // if(query == ""){
    //     showToast('Please Enter a Keyword');
    //     return;
    // }
    // function fillList(list){
    //     $('#skid-body-company-content-found').empty();
    //     $.each(list, function(key, value){
    //         $('#skid-body-company-content-found').append(`<span fid="${value.id}" class="skid-body-company-content-found-h widget">${value.filename}</span>`);
    //     });
    // }
    // function unique(list) {
    //     var result = [];
    //     $.each(list, function (i, e) {
    //         var matchingItems = $.grep(result, function (item) {
    //             return item.id === e.id;
    //         });
    //         if (matchingItems.length === 0){
    //             result.push(e);
    //         }
    //     });
    //     return result;
    // }

    // const scfobj = SKID_FILE.getCompanyFiles();
    // let list = [];
    // $.each(scfobj, function(key, value){
    //     if(filenameGate){
    //         if(value.filename.toLowerCase().includes(query.toLowerCase())){
    //             list.push({
    //                 filename : value.filename,
    //                 id : value.data.fileid
    //             });
    //             report += `<span>Filename Matched: ${value.filename}</span>`;
    //         }
    //     }
    //     if(creatorGate){
    //         if(value.data.creator.id.toLowerCase().includes(query.toLowerCase())){
    //             list.push({
    //                 filename : value.filename,
    //                 id : value.data.fileid
    //             });
    //             report += `<span>Creator Matched: ${value.data.creator.id}</span>`;
    //         }
    //     }
    //     if(namesGate){
    //         $.each(value.data.Unit, function(key, value1){
    //             if(value1.name.toLowerCase().includes(query.toLowerCase())){
    //                 list.push({
    //                     filename : value.filename,
    //                     id : value.data.fileid
    //                 });
    //                 report += `<span>Unit Matched: ${value1.name} <label>from ${value.filename}</label></span>`;
    //             }
    //         });
    //         $.each(value.data.Equipment, function(key, value1){
    //             if(value1.name.toLowerCase().includes(query.toLowerCase())){
    //                 list.push({
    //                     filename : value.filename,
    //                     id : value.data.fileid
    //                 });
    //                 report += `<span>Equipment Matched: ${value1.name} <label>from ${value.filename}</label></span>`;
    //             }
    //         });
    //     }
    //     if(propertiesGate){
    //         $.each(value.data.UnitProps, function(key, value1){
    //             if(value1.name.toLowerCase().includes(query.toLowerCase())){
    //                 list.push({
    //                     filename : value.filename,
    //                     id : value.data.fileid
    //                 });
    //                 report += `<span>Unit Property Matched: ${value1.name} <label>from ${value.filename}</label></span>`;
    //             }
    //         });
    //         $.each(value.data.EquipmentProps, function(key, value1){
    //             if(value1.name.toLowerCase().includes(query.toLowerCase())){
    //                 list.push({
    //                     filename : value.filename,
    //                     id : value.data.fileid
    //                 });
    //                 report += `<span>Equipment Property Matched: ${value1.name} <label>from ${value.filename}</label></span>`;
    //             }
    //         });
    //     }
    //     if(datasheetGate){
    //         $.each(value.data.DataSheet, function(key, value1){
    //             $.each(value1.content.documentation, function(key, value2){
    //                 if(value2.label != undefined){
    //                    if( value2.label.toLowerCase().includes(query.toLowerCase()) ){
    //                     list.push({
    //                         filename : value.filename,
    //                         id : value.data.fileid
    //                     });
    //                     report += `<span>${value1.compid.split('-')[0] == "CE" ? "Equipment" : "Unit"} Datasheet Matched: Documentation - ${value2.label} <label>from ${value.filename} ${value1.compid}</label></span>`;
    //                     } 
    //                 }
    //                 if(value2.value != undefined){
    //                    if( value2.value.toLowerCase().includes(query.toLowerCase()) ){
    //                     list.push({
    //                         filename : value.filename,
    //                         id : value.data.fileid
    //                     });
    //                     report += `<span>${value1.compid.split('-')[0] == "CE" ? "Equipment" : "Unit"} Datasheet Matched: Documentation - ${value2.value} <label>from ${value.filename} ${value1.compid}</label></span>`;
    //                     } 
    //                 }
    //                 if(value2.text != undefined){
    //                    if( value2.text.toLowerCase().includes(query.toLowerCase()) ){
    //                     list.push({
    //                         filename : value.filename,
    //                         id : value.data.fileid
    //                     });
    //                     report += `<span>${value1.compid.split('-')[0] == "CE" ? "Equipment" : "Unit"} Datasheet Matched: Documentation - ${value2.text} <label>from ${value.filename} ${value1.compid}</label></span>`;
    //                     } 
    //                 }
    //             });
    //             $.each(value1.content.identification, function(key, value2){
    //                 if(value2.label != undefined){
    //                    if( value2.label.toLowerCase().includes(query.toLowerCase()) ){
    //                     list.push({
    //                         filename : value.filename,
    //                         id : value.data.fileid
    //                     });
    //                     report += `<span>${value1.compid.split('-')[0] == "CE" ? "Equipment" : "Unit"} Datasheet Matched: Identification - ${value2.label} <label>from ${value.filename} ${value1.compid}</label></span>`;
    //                     } 
    //                 }
    //                 if(value2.value != undefined){
    //                    if( value2.value.toLowerCase().includes(query.toLowerCase()) ){
    //                     list.push({
    //                         filename : value.filename,
    //                         id : value.data.fileid
    //                     });
    //                     report += `<span>${value1.compid.split('-')[0] == "CE" ? "Equipment" : "Unit"} Datasheet Matched: Identification - ${value2.value} <label>from ${value.filename} ${value1.compid}</label></span>`;
    //                     } 
    //                 }
    //                 if(value2.text != undefined){
    //                    if( value2.text.toLowerCase().includes(query.toLowerCase()) ){
    //                     list.push({
    //                         filename : value.filename,
    //                         id : value.data.fileid
    //                     });
    //                     report += `<span>${value1.compid.split('-')[0] == "CE" ? "Equipment" : "Unit"} Datasheet Matched: Identification - ${value2.text} <label>from ${value.filename} ${value1.compid}</label></span>`;
    //                     } 
    //                 }
    //             });
    //             $.each(value1.content.process, function(key, value2){
    //                 if(value2.label != undefined){
    //                    if(value2.label.toLowerCase().includes(query.toLowerCase()) ){
    //                     list.push({
    //                         filename : value.filename,
    //                         id : value.data.fileid
    //                     });
    //                     report += `<span>${value1.compid.split('-')[0] == "CE" ? "Equipment" : "Unit"} Datasheet Matched: Process - ${value2.label} <label>from ${value.filename} ${value1.compid}</label></span>`;
    //                     } 
    //                 }
    //                 if(value2.value != undefined){
    //                    if(value2.value.toLowerCase().includes(query.toLowerCase()) ){
    //                     list.push({
    //                         filename : value.filename,
    //                         id : value.data.fileid
    //                     });
    //                     report += `<span>${value1.compid.split('-')[0] == "CE" ? "Equipment" : "Unit"} Datasheet Matched: Process - ${value2.value} <label>from ${value.filename} ${value1.compid}</label></span>`;
    //                     } 
    //                 }
    //                 if(value2.text != undefined){
    //                    if(value2.text.toLowerCase().includes(query.toLowerCase()) ){
    //                     list.push({
    //                         filename : value.filename,
    //                         id : value.data.fileid
    //                     });
    //                     report += `<span>${value1.compid.split('-')[0] == "CE" ? "Equipment" : "Unit"} Datasheet Matched: Process - ${value2.text} <label>from ${value.filename} ${value1.compid}</label></span>`;
    //                     } 
    //                 }
    //             });
    //             $.each(value1.content.specification, function(key, value2){
    //                 if(value2.label != undefined){
    //                    if(value2.label.toLowerCase().includes(query.toLowerCase()) ){
    //                     list.push({
    //                         filename : value.filename,
    //                         id : value.data.fileid
    //                     });
    //                     report += `<span>${value1.compid.split('-')[0] == "CE" ? "Equipment" : "Unit"} Datasheet Matched: Specification - ${value2.label} <label>from ${value.filename} ${value1.compid}</label></span>`;
    //                     } 
    //                 }
    //                 if(value2.value != undefined){
    //                    if(value2.value.toLowerCase().includes(query.toLowerCase()) ){
    //                     list.push({
    //                         filename : value.filename,
    //                         id : value.data.fileid
    //                     });
    //                     report += `<span>${value1.compid.split('-')[0] == "CE" ? "Equipment" : "Unit"} Datasheet Matched: Specification - ${value2.value} <label>from ${value.filename} ${value1.compid}</label></span>`;
    //                     } 
    //                 }
    //                 if(value2.text != undefined){
    //                    if(value2.text.toLowerCase().includes(query.toLowerCase()) ){
    //                     list.push({
    //                         filename : value.filename,
    //                         id : value.data.fileid
    //                     });
    //                     report += `<span>${value1.compid.split('-')[0] == "CE" ? "Equipment" : "Unit"} Datasheet Matched: Specification - ${value2.text} <label>from ${value.filename} ${value1.compid}</label></span>`;
    //                     } 
    //                 }
    //             });
    //             if(value1.content.notes.toLowerCase().includes(query.toLowerCase())){
    //                 list.push({
    //                     filename : value.filename,
    //                     id : value.data.fileid
    //                 });
    //                 report += `<span>${value1.compid.split('-')[0] == "CE" ? "Equipment" : "Unit"} Datasheet Matched: Notes <label>from ${value.filename} ${value1.compid}</label></span>`;
    //             }
    //             $.each(value1.custom, function(key, value2){
    //                 $.each(value2.content, function(key, value3){
    //                     if(value3.label != undefined){
    //                         if(value3.label.toLowerCase().includes(query.toLowerCase()) ){
    //                         list.push({
    //                             filename : value.filename,
    //                             id : value.data.fileid
    //                         });
    //                         report += `<span>${value1.compid.split('-')[0] == "CE" ? "Equipment" : "Unit"} Datasheet Matched: ${value2.name} - ${value3.label} <label>from ${value.filename} ${value1.compid}</label></span>`;
    //                         }
    //                     }
    //                     if(value3.value != undefined){
    //                         if(value3.value.toLowerCase().includes(query.toLowerCase()) ){
    //                         list.push({
    //                             filename : value.filename,
    //                             id : value.data.fileid
    //                         });
    //                         report += `<span>${value1.compid.split('-')[0] == "CE" ? "Equipment" : "Unit"} Datasheet Matched: ${value2.name} - ${value3.value} <label>from ${value.filename} ${value1.compid}</label></span>`;
    //                         }
    //                     }
    //                     if(value3.text != undefined){
    //                         if(value3.text.toLowerCase().includes(query.toLowerCase()) ){
    //                         list.push({
    //                             filename : value.filename,
    //                             id : value.data.fileid
    //                         });
    //                         report += `<span>${value1.compid.split('-')[0] == "CE" ? "Equipment" : "Unit"} Datasheet Matched: ${value2.name} - ${value3.text} <label>from ${value.filename} ${value1.compid}</label></span>`;
    //                         }
    //                     }
    //                 });
    //             });
    //         });
    //     }
    // });

    // console.log(report);
    // if(report == ""){
    //     showToast("Nothing Found on Search");
    //     $('.skid-body-company-content-report').html("<span>NOTHING FOUND</span>").show();
    // }else{
    //     $('.skid-body-company-content-report').html(report).show();
    // }

    // // console.log(list);
    // const a = unique(list);
    // fillList(a);

    // // console.log(a);

});
$(document).on('click', '#skid-body-company-header-search', function(){
    // const filenameGate = $('#builder-form-comp-create-view-connect-search-filename').is(':checked') ? true : false;
    // const creatorGate = $('#builder-form-comp-create-view-connect-search-creator').is(':checked') ? true : false;
    // const namesGate = $('#builder-form-comp-create-view-connect-search-names').is(':checked') ? true : false;
    // const headersGate = $('#builder-form-comp-create-view-connect-search-headers').is(':checked') ? true : false;
    // const propertiesGate = $('#builder-form-comp-create-view-connect-search-properties').is(':checked') ? true : false;
    // const tagsGate = $('#builder-form-comp-create-view-connect-search-tags').is(':checked') ? true : false;
    // const query = $(this).siblings('input').val();

    const filenameGate = $('#skid-body-company-header-filename').is(':checked') ? true : false;
    const creatorGate = $('#skid-body-company-header-creator').is(':checked') ? true : false;
    const namesGate = $('#skid-body-company-header-names').is(':checked') ? true : false;
    const headersGate = $('#skid-body-company-header-headers').is(':checked') ? true : false;
    const propertiesGate = $('#skid-body-company-header-properties').is(':checked') ? true : false;
    const tagsGate = $('#skid-body-company-header-tags').is(':checked') ? true : false;
    const query = $(this).siblings('input').val();
    let report = "";

    // console.log(filenameGate, creatorGate, namesGate, propertiesGate, datasheetGate, query);
    if(query == ""){
        showToast('Please Enter a Keyword');
        return;
    }
    // function fillList(list){
    //     $('#builder-form-comp-create-view-connect-search-container').empty();
    //     $.each(list, function(key, value){
    //         let reporthtml = "";
    //         $.each(value.report, function(key, value1){
    //             reporthtml += value1;
    //             // console.log(value1);
    //         });
    //         $('#builder-form-comp-create-view-connect-search-container').append(`
    //             <div fileid="${value.fileid}" formid="${value.formid}" class="widget">
    //                 <label class="title"><input class="builder-form-comp-create-view-connect-search-cb" type="checkbox">${value.filename}</label>
    //                 <div class="wcontent ">
    //                     ${reporthtml}
    //                 </div>
    //             </div>
    //         `);
    //         // console.log(reporthtml);
    //     });
    // }
    function fillList(list){
        $('#skid-body-company-content-found').empty();
        

        if(list.length <= 0){
            showToast("Search showed empty results.. Please Try Again...");
            $('.skid-body-company-content-report').html("<span>NOTHING FOUND</span>").show();
        }else{
            let reporthtml = '';
            $.each(list, function(key, value){
                $('#skid-body-company-content-found').append(`<span fileid="${value.fileid}" formid="${value.formid}" class="skid-body-company-content-found-h widget">${value.filename}</span>`);
                $.each(value.report, function(key, value1){
                    reporthtml += value1;
                });
            });
            $('.skid-body-company-content-report').html(reporthtml).show();
        }

    }
    function unique(list) {
        var result = [];
        $.each(list, function (i, e) {
            var matchingItems = $.grep(result, function (item) {
                return item.id === e.id;
            });
            if (matchingItems.length === 0){
                result.push(e);
            }
        });
        return result;
    }

    const scfobj = SKID_FILE.getCompanyFiles();
    console.log(scfobj);
    let list = [];
    $.each(scfobj, function(key, value1){
        console.log(value1);
        if(value1.data.Form != undefined && value1.data.Form.length > 0){
            $.each(value1.data.Form, function(key, value){
                let report = [];
                const robj = {
                    filename : value.filename,
                    formid : value.formid,
                    fileid : value1.id,
                }
                let gate = false;
                if(filenameGate){
                    if(value.filename.toLowerCase().includes(query.toLowerCase())){
                        gate = true;
                        report.push(`<span>Filename Matched: ${value.filename} <label>from ${value1.filename}</label> </span>`);
                        
                    }
                }
                if(creatorGate){
                    if(value.creator.toLowerCase().includes(query.toLowerCase())){
                        gate = true;
                        report.push(`<span>Creator Matched: ${value.creator} <label>from ${value1.filename}</label> </span>`);
                        
                    }
                }
                if(namesGate){
                    $.each(value.content, function(key, value2){
                        if(value2.name.toLowerCase().includes(query.toLowerCase())){
                            gate = true;
                            report.push(`<span>Sheet Name Matched: ${value2.name} <label>from ${value1.filename}</label> </span>`);
                        }
                    });
                }
                if(headersGate){
                    $.each(value.content, function(key, value2){
                        $.each(value2.header, function(key, value3){
                            if(value3.toLowerCase().includes(query.toLowerCase())){
                                gate = true;
                                report.push(`<span>Headers Matched: ${value3} <label>from ${value1.filename}</label> </span>`);
                            }
                        });
                    });
                }
                if(propertiesGate){
                    $.each(value.content, function(key, value2){
                        if(value2.values != undefined && value2.values.length > 0){
                            $.each(value2.values, function(key, value3){
                                if(value3.values != undefined && value3.values.length > 0){
                                    $.each(value3.values, function(key, value4){
                                        if(value4.toLowerCase().includes(query.toLowerCase())){
                                            gate = true;
                                            report.push(`<span>Property Matched: ${value4} <label>from ${value1.filename}</label></span>`);
                                        }
                                    }); 
                                }
                            });
                        }
                    });
                }
                if(tagsGate){
                    if(value.tags != undefined && value.tags.length > 0){
                        $.each(value.tags, function(key, value2){
                            if(value2.toLowerCase().includes(query.toLowerCase())){
                                gate = true;
                                report.push(`<span>Tag Matched: ${value2} <label>from ${value1.filename}</label></span>`);
                            }
                        });
                    }
                }
                if(gate){
                    robj.report = report;
                    list.push(robj);
                }

            });
        }
    });



    console.log(list);
    

    
    fillList(list);
    $('.skid-body-company-content').css('display', 'flex').show();
    $('.skid-body-company-content-hv').hide();
});

$(document).on('click', '.skid-body-company-content-found-h', function(){
    const fileid = $(this).attr('fileid');
    const formid = $(this).attr('formid');
    const cb =data=>{
        console.log(data);
        if(data = 'error'){
            showToast("Your Skid File was not Found");
            return false;
        }
        // do something with the ui potion.
        $('#skid-body-company-details-propscon > .filename').html(`${data.filename} <i class="fas ${data.lock == "locked" ? "fa-lock" : "fa-unlock"}"></i>`);
        $('#skid-body-company-details-propscon > .owner').html(`<b>Creator</b>: ${data.creator.firstname} ${data.creator.id}`);
        $('#skid-body-company-details-propscon > .pages').html(`<b>Pages</b>: ${data.Pages.length}`);
        $('#skid-body-company-details-propscon > .component').html(`<b>Components</b>: ${data.ComponentHeirarchy.length}`);
        $('#skid-body-company-details-propscon > .transfer').html(`<b>Transfer Parameter</b>: ${(parseFloat(data.UnitTransfer.length)) + (parseFloat(data.EquipmentTransfer.length))}`);
        $('#skid-body-company-details-propscon > .modify').html(`<b>Last Modified</b>: ${new Date(data.lastmodified)}`);
        
        // console.log(data.creator.id, __ID);
        if(data.creator.id == __ID){
            $('#skid-body-company-content-access-request').text("You Own This Skid").attr('status', "ok");
        }else{
            const cbsss =data=>{
                // console.log(data);
                let gate = false;
                $.each(data, function(key, value){
                    if(value.accountid == __ID){
                        gate = true;
                    }
                });
        
                if(gate){
                    $('#skid-body-company-content-access-request').text("Access Granted").attr('status', "ok");
                    $('#skid-body-company-content-download').show();
                }else{
                    let pendingGate = false;
                    const cbzz =data=>{
                        setTimeout(() => {
                            console.log(data);
                            $.each(data, function(key, value){
                                if(value.accountid == __ID){
                                    pendingGate = true;
                                }
                            });
                            if(pendingGate){
                                $('#skid-body-company-content-access-request').text("Request Pending").attr('status', "ok");
                                $('#skid-body-company-content-download').hide();
                            }else{
                                $('#skid-body-company-content-access-request').text("Request Access").attr('status', "notok");
                                $('#skid-body-company-content-download').hide();
                            }
                        }, 0);
                    };
                    SKID_FILE.getCompanyFileAccessRequest(fileid, cbzz);
                }
            };
            SKID_FILE.getCompanyFileAccess(fileid, cbsss);
        }
    };
    SKID_FILE.getCompanyFileObject(fileid, cb);
    $('#skid-body-company-content-download').attr('fid', fileid);
    $('#skid-body-company-content-access-request').attr('fid', fileid);
    $('.skid-body-company-content-hv').show();
    $('.skid-body-company-content-report').hide();

    
    


});

$(document).on('click', '#skid-body-company-content-download', function(){
    const id = $(this).attr('fid');
    const cb =jsonObj=>{
        const jsonStr = JSON.stringify(jsonObj);
        const encodedStringBtoA = btoa(jsonStr);
        console.log('encodedStringBtoA',encodedStringBtoA);

        $('#skid-body-company-content-download-a').attr({
            "href" : `data:application/octet-stream;charset=utf-8; txt, ${encodedStringBtoA}`,
            "download" : `${jsonObj.filename}.ceis`
        });
        $('#skid-body-company-content-download-a')[0].click();
    };
    SKID_FILE.getFileObject(id, cb);
});
$(document).on('click', '#skid-body-company-content-access-request', function(){
    const id = $(this).attr('fid');
    const status = $(this).attr('status');
    if(status == "notok"){
        console.log(id);
        const cbs =data=>{
            console.log(data);
            setTimeout(() => {
                const cfobj = SKID_FILE.getCompanyFile(id);
                console.log(cfobj);
                const options = {
                    'id': rngPassword(),
                    'fileid': id,
                    'accountid': __ID,
                }
                const cb =()=>{
                    showToast("Request Sent!");
                    $('#skid-body-company-content-access-request').text("Request Pending").attr('status', "ok");
                };
                cfobj.fileaccessrequest.create(options, cb);
            }, 0);
        };
        SKID_FILE.getCompanyFileAccessRequest(id, cbs);
    }
});



// ARCHIVE SKIDS EVENT
function fillSkidArchive(){
    $('#skid-body-archive-projectlist').empty();
    const data = SKID_FILE.getOwner(__ID);
    $.each(data, function(key, value){
        const html = `<span fid="${value.id}" class="skid-body-archive-projectlist-h widget">${value.filename}</span>`;
        $('#skid-body-archive-projectlist').append(html);
    });
}
$(document).on('click', '.skid-body-archive-projectlist-h', function(){
    const id = $(this).attr('fid');
    const cb =data=>{
        console.log(data);
        // do something with the ui potion.
        $('#skid-body-archive-propscon > .filename').html(`${data.filename} <i class="fas ${data.lock == "locked" ? "fa-lock" : "fa-unlock"}"></i>`);
        $('#skid-body-archive-propscon > .owner').html(`<b>Creator</b>: ${data.creator.firstname} ${data.creator.id}`);
        $('#skid-body-archive-propscon > .pages').html(`<b>Pages</b>: ${data.Pages.length}`);
        $('#skid-body-archive-propscon > .component').html(`<b>Components</b>: ${data.ComponentHeirarchy.length}`);
        $('#skid-body-archive-propscon > .transfer').html(`<b>Transfer Parameter</b>: ${(parseFloat(data.UnitTransfer.length)) + (parseFloat(data.EquipmentTransfer.length))}`);
        $('#skid-body-archive-propscon > .modify').html(`<b>Last Modified</b>: ${new Date(data.lastmodified)}`);
        $('#skid-body-archive-submit').attr('fid', id);
        $('.skid-body-archive-props').css('display', 'flex').show();
    };
    SKID_FILE.getFileObject(id, cb);
});
$(document).on('click', '#skid-body-archive-submit', function(){
    const fid = $('#skid-body-archive-submit').attr('fid');

    console.log(fid);
    const cbtrue =()=>{
        const cbok =()=>{
            const cb =()=>{
                showToast('Validation Success. Skid Archiving Success.');
                fillSkidArchive();
                $('.skid-body-archive-props').hide();
            };
            SKID_FILE.archiveSkidFile(fid, cb);
        };
        const cberror =()=>{
            showToast('Validation Error. Archive Cancelled.');
        };
        showValidate(cbok, cberror);
    };
    showAction('You are Trying to Archive this Skid File. Proceed?', cbtrue, ()=>{});
});