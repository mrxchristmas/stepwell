
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

// function hideAllNav(list){
//     for(i=0; i < list.length; i++){
//         list[i].css('display', 'none');
//         // console.log(list[i]);
//     }
// }
// function showAllNav(list){
//     for(i=0; i < list.length; i++){
//         list[i].css('display', 'flex');
//         // console.log(list[i]);
//     }
// }
// function logout(){
//     api_logout();
//     window.location.href = domain;
// }
// function fillProfile(ph, fn){
//     if(ph == 'na'){
//         $('#profile-img').attr('src','lib/images/avatardefault.png');
//     }else{
//         $('#profile-img').attr('src', ph);
//     }
//     $('#profile-name').text(fn);
// }

// // user profile functions
// $('#profile-open').click(function(){
//     $('#profile').toggle();
// });
// $('#profile').click(function(e){
//     if(e.target != this){
//         return;
//     }else{
//         $(this).toggle();
//     }
// });
// $('#profile-logout').click(function(){
//     logout();
// });

// //HOME EVENTS
// $('#home-open').click(function(){
//     window.location.href = domain + 'pages/control/';
// });

// //navigation default functions
// $('.nav-subwidget-title').mouseenter(function(){
//     $(this).css('background-color', SUB_COLOR);
//     $(this).children('.nav-subwidget-icon').toggleClass('scale');
// });
// $('.nav-subwidget-title').mouseleave(function(){
//     $(this).css('background-color', BTN_COLOR);
//     $(this).children('.nav-subwidget-icon').toggleClass('scale');
// });
// $('.nav-widget').mouseenter(function(){
//     // $(this).css('background-color', SUB_COLOR);
//     $(this).children('.nav-widget-title').children('.nav-widget-icon').toggleClass('scale');
//     $(this).children('.nav-widget-title').toggleClass('scale');
// });
// $('.nav-widget').mouseleave(function(){
//     // $(this).css('background-color', BTN_COLOR);
//     $(this).children('.nav-widget-title').children('.nav-widget-icon').toggleClass('scale');
//     $(this).children('.nav-widget-title').toggleClass('scale');
//     // $(this).children('.nav-sub-widget').toggleClass('hidden');
//     $('#nav-sub-widget').toggleClass('hidden');
// });
// $('.nav-widget').click(function(){
//     $(this).children('.nav-sub-widget').toggleClass('hidden');
// });
// $('.nav-sub-widget-title').click(function(){
//     $('#nav-sub-widget').toggleClass('hidden');
// });
// $(document).on('click', '.nav-subwidget-title, .nav-widget-title', function(){
//     // console.log();
//     const id = $(this).attr('id');
//     if(id != undefined){
//         // console.log(id);
//         const idparts = id.split('-');
        
//         if(idparts.length == 3){
//             // console.log(idparts[0], idparts[1], idparts[2]);
//             // console.log('.' + idparts[1] + '-' + idparts[2] + '-con');
//             hideAllNav(skid_conList);
//             $('.' + idparts[1] + '-' + idparts[2] + '-con').css('display', 'flex');
//         }else if(idparts.length == 2){
//             // console.log('.' + idparts[1] + '-con');
//             hideAllNav(skid_conList);
//             $('.' + idparts[1] + '-con').css('display', 'flex');
//         }
//     }else{
//         // console.log('not a nav....');
//     }
// });

// // ____________________________________________________________________________________


// // STATIC FUNCTIONS
// function rngUnitId(){
//     return 'U-' + rng09() + '' + rng09() + '' + rng09() + '' + rng09() + '' + rng09();
// }
// function rngSubUnitId(){
//     return 'SU-' + rng09() + '' + rng09() + '' + rng09() + '' + rng09() + '' + rng09();
// }
// function rngEquipmentId(){
//     return 'E-' + rng09() + '' + rng09() + '' + rng09() + '' + rng09() + '' + rng09();
// }
// function rngSubEquipmentId(){
//     return 'SE-' + rng09() + '' + rng09() + '' + rng09() + '' + rng09() + '' + rng09();
// }
// function rngSkidId(){
//     return 'S-' + rng09() + '' + rng09() + '' + rng09() + '' + rng09() + '' + rng09();
// }


// //NAVIGATAION FUNCTION
// $('#nav-manage-unit, #nav-manage-equipment,#launch-skid').click(function(){
//     api_fetchSkidOperation(__COMPANY_ID, 'ready');
// });
// $('#nav-build').click(function(){
//     api_fetchSkid(__COMPANY_ID, 'ready');
// });





// // BUILD-LAUNCH EVENTS
// $('.build-launch-unit-widget, .build-launch-equipment-widget').click(function(e){
//     if(e.target.tagName == "DIV"){
//         const id = $(this).attr('id');
//         const name = $(this).attr('name');
//         console.log('Fetch All Subunits', id);
//         api_fetchSkidSubOperation(__COMPANY_ID, id, '.manage-unit-widget');
//         $(this).siblings('.build-launch-equipment-widget').children('.build-launch-equipment-widget-subs').hide();
//         $(this).siblings('.build-launch-unit-widget').children('.build-launch-unit-widget-subs').hide();
        
//         $(this).children('.build-launch-unit-widget-subs').toggle();
//         $(this).children('.build-launch-equipment-widget-subs').toggle();

//     }
// });
//  $(document).on('click', '.nav-widget-title', function(){
//     // $('.build-list').hide();
//     $('.build-prefs').show();
// });
// $('.build-prefs-launch-btn').click(function(){
//     $('.build-list').hide();
//     $('.build-prefs').hide();
//     $('.build-launch').show();
// });
// //DRAG UNIT
// const unitdragoption = {
//     start: function(e, ui) {
//         // this function fires when you start dragging
//         // const id = $(ui.helper).attr('zid');
//         $(ui.helper).css('background-color', BTN_COLOR);
//         $('.build-launch-skid-con').css('background-color', GREEN_PALETTE);

//     },
//     drag: function() {
//     //   this function fires after you drag and while dragging
//     },
//     stop: function() {
//     // this function fires when you stop dragging or if you dropped it
//         $('.build-launch-skid-con').css('background-color', SUB_COLOR);
//     },
//     appendTo: 'body',
//     opacity: 0.7, 
//     helper: "clone", 
//     containment: ".build-launch", 
//     scroll: false, 
//     cursorAt: { bottom: 0, left: 150}, 
//     revert: "invalid" 
// };
// $('.build-launch-unit-widget-sub').draggable(unitdragoption);
// $('.build-launch-equipment-widget-sub').draggable(unitdragoption);
// $('.build-launch-skid-con').droppable({
//     accept: ".build-launch-unit-widget-sub, .build-launch-equipment-widget-sub", // this will determine which elements are accepted to drop in this case all element with the class of moduleman-module-list-widget will drop
//     drop: function( event, ui ) {

//         let id = $(ui.draggable).attr('id'); 
//         let name = $(ui.draggable).attr('name');
//         let main = $(ui.draggable).attr('main');

//         $('.build-launch-skid-widget-con').append(`
//             <span id="${id}" main="${main}" class="build-launch-skid-widget btn-shadow" style="background-color: ${BTN_COLOR}; color: white; ">${name}</span>
//         `);
//         // ADD to tbl_document_connect
//     }
// });



// // UNIT FUNCTIONS
// $('#manage-unit-create').click(function(){
//     const name = $('#manage-unit-name').val();
//     const comid = __COMPANY_ID;
//     const id = rngUnitId();
//     // console.log(id, comid, name); // these are all the variables you need to create a unit


//     if(name != ""){ // if statement to disable adding if name is empty
//         //this code will append to the list, use the same template when getting data from database api_fetchSkidUnit
        
//         api_createSkidOperation(id, comid, name);
//         console.log(id, comid, name);
        
//         $('.manage-unit-widget-con').append(`
//             <span id="${id}" name="${name}" class="manage-unit-widget btn-shadow" style="background-color: ${BTN_COLOR}; color: white; ">${name}<i class="fas fa-trash manage-unit-widget-delete"></i></span>
//         `);


//         $('#manage-unit-name').val("");
//     }else{
//         blinkbg($('#manage-unit-name'), RED_PALETTE, 'white'); // this is a function from defaults.js
//     }
// });
// $(document).on('click', '.manage-unit-widget', function(e){
//     if(e.target.tagName == "SPAN"){
//         $('.manage-unit-sublist').show();
//         const id = $(this).attr('id');
//         const name = $(this).attr('name');
//         console.log('Fetch All Subunits', id);
//         api_fetchSkidSubOperation(__COMPANY_ID, id, '.manage-unit-widget');

//         $('.manage-unit-list-sublist-title').text(name + ' Sub Units').attr('id', id); // setting name and id attributes
//     }
//     // use this id to get all subunits connected to it
// });
// //edit for skid part
// $(document).on('click', '.manage-unit-widget', function(e){
//     if(e.target.tagName == "SPAN"){
//         $('.manage-unit-sublist').show();
//         const id = $(this).attr('id');
//         const name = $(this).attr('name');
//         console.log('Fetch All Subunits', id);
//         api_fetchSkidSubOperation(__COMPANY_ID, id, '.manage-unit-widget');

//         $('.manage-unit-list-sublist-title').text(name + ' Sub Units').attr('id', id); // setting name and id attributes
//     }
//     // use this id to get all subunits connected to it
// });

// $(document).on('click', '.manage-unit-widget-delete', function(){
//     const id = $(this).parent('.manage-unit-widget').attr('id');
//     console.log('Delete this Unit', id);
//     // use this id to delete the specified id
//     // make sure to delete all subunits within it too
//     //api_deleteSkidUnitSubcategory(id);
//     $(this).parent('.manage-unit-widget').remove();
// });


// //SUBUNIT FUNCTIONS
// $('#manage-unit-create-subunit').click(function(){
//     const name = $('#manage-unit-subunit-name').val();
//     const comid = __COMPANY_ID;
//     const main =  $('.manage-unit-list-sublist-title').attr('id');
//     const id = rngSubUnitId();
//     console.log(id, comid, main, name); // these are all the variables you need to create a subunit

//     if(name != ""){ // if statement to disable adding if name is empty
//         //this code will append to the list, use the same template when getting data from database api_fetchSkidUnit
//         $('.manage-unit-subunit-widget-con').append(`
//             <span id="${id}" name="${name}" main="main" class="manage-unit-subunit-widget btn-shadow" style="background-color: ${BTN_COLOR}; color: white; ">${name}<i class="fas fa-trash manage-unit-subunit-widget-delete"></i></span>
//         `);
//         $('#manage-unit-subunit-name').val("");
//         api_createSkidUnitSubcategory(id, comid, main, name);

//     }else{
//         blinkbg($('#manage-unit-subunit-name'), RED_PALETTE, 'white'); // this is a function from defaults.js
//     }
// });
// $(document).on('click', '.manage-unit-subunit-widget-delete', function(){
//     const id = $(this).parent('.manage-unit-subunit-widget').attr('id');
//     // console.log('Delete this Unit', id);
//     // use this id to delete the specified id
//     // make sure to delete all subunits within it too
//     api_deleteSkidUnitSubcategory(id);
//     $(this).parent('.manage-unit-subunit-widget').remove();
// });
// $(document).on('click', '.manage-unit-subunit-widget', function(e){
//     if(e.target.tagName == "SPAN"){
//         $('.manage-unit-specs').show();
//         const id = $(this).attr('id');
//         const name = $(this).attr('name');
//         console.log('Hello', id, name);
//         // api_fetchSkidUnitSubcategory(__COMPANY_ID, id, '.manage-unit-widget'); 
//         $('.manage-unit-list-specs-title').text(name + ' Specifications').attr('id', id); // setting name and id attributes
//     }
//     // use this id to get all subunits connected to it
// });

// //UNIT SPECS
// $('#manage-unit-create-specs').click(function(){
//     const id =  $('.manage-unit-list-specs-title').attr('id');
//     const tag = $('#manage-unit-specs-tag').val();
//     const name = $('#manage-unit-specs-process').val();
//     console.log(id,tag,name); // these are all the variables you need to create a subunit

//     if(tag != ""){ // if statement to disable adding if name is empty
//         api_createSkidUnitSpecs(id, tag, name);

//     }else{
//         blinkbg($('#manage-unit-subunit-name'), RED_PALETTE, 'white'); // this is a function from defaults.js
//     }
// });

// $('#manage-equipment-create-specs').click(function(){
//     const id =  $('.manage-equipment-list-specs-title').attr('id');
//     const tag = $('#manage-equipment-specs-tag').val();
//     const quantity = $('#manage-equipment-specs-quantity').val();
//     const tank = $('#manage-equipment-specs-tank').val();
//     const room = $('#manage-equipment-specs-room').val();
//     const capacity = $('#manage-equipment-specs-capacity').val();
//     const dimensions = $('#manage-equipment-specs-dimensions').val(); 
//     const cost = $('#manage-equipment-specs-cost').val(); 
//     console.log(id,tag, quantity, capacity, tank, room, dimensions,cost); // these are all the variables you need to create a subunit

//     if(tag != ""){ // if statement to disable adding if name is empty
//         api_createSkidEquipmentSpecs(id,tag, quantity, capacity, tank, room, dimensions);
//         api_createSkidEquipmentSpecsCost(id,cost);
//     }else{
//         blinkbg($('#manage-unit-subunit-name'), RED_PALETTE, 'white'); // this is a function from defaults.js
//     }
// });

// //EQUIPMENT FUNCTIONS
// $('#manage-equipment-create').click(function(){
//     const name = $('#manage-equipment-id').val();
//     const comid = __COMPANY_ID;
//     const id = rngEquipmentId();
//     // console.log(id, comid, name); // these are all the variables you need to create a unit

//     if(name != ""){ 
//         console.log(id, comid, name);
//         api_createSkidOperation(id, comid, name);
//         $('.manage-equipment-widget-con').append(`
//             <span id="${id}" name="${name}" class="manage-equipment-widget btn-shadow" style="background-color: ${BTN_COLOR}; color: white; ">${name}<i class="fas fa-trash manage-equipment-widget-delete"></i></span>
//         `);
//         $('#manage-equipment-name').val("");
//     }else{
//         blinkbg($('#manage-equipment-name'), RED_PALETTE, 'white'); // this is a function from defaults.js
//     }
// });
// $(document).on('click', '.manage-equipment-widget', function(e){
//     if(e.target.tagName == "SPAN"){
//         $('.manage-equipment-sublist').show();
//         const id = $(this).attr('id');
//         const name = $(this).attr('name');
//         console.log('Fetch All Subequipmets', id);
//         api_fetchSkidSubOperation(__COMPANY_ID, id, '.manage-equipment-widget');

//         $('.manage-equipment-list-sublist-title').text(name + ' Sub Equipments').attr('id', id); // setting name and id attributes
//     }
//     // use this id to get all subunits connected to it
// });
// $(document).on('click', '.manage-equipment-subequipment-widget', function(e){
//     if(e.target.tagName == "SPAN"){
//         $('.manage-equipment-specs').show();
//         const id = $(this).attr('id');
//         const name = $(this).attr('name');
//         console.log('Fetch All Subunits', id);

//         $('.manage-equipment-list-specs-title').text(name + ' Specs').attr('id', id); // setting name and id attributes
//     }
//     // use this id to get all subunits connected to it
// });
// $(document).on('click', '.manage-equipment-widget-delete', function(){
//     const id = $(this).parent('.manage-equipment-widget').attr('id');
//     console.log('Delete this Equipment', id);
//     // use this id to delete the specified id
//     // make sure to delete all subunits within it too

//     $(this).parent('.manage-equipment-widget').remove();
// });

// //SUBEQUIPMENT FUNCTIONS
// $('#manage-equipment-create-subequipment').click(function(){
//     const name = $('#manage-equipment-subequipment-name').val();
//     const comid = __COMPANY_ID;
//     const main =  $('.manage-equipment-list-sublist-title').attr('id');
//     const id = rngSubEquipmentId();
//     console.log(id, comid, main, name); // these are all the variables you need to create a subunit


//     if(name != ""){ // if statement to disable adding if name is empty
//         //this code will append to the list, use the same template when getting data from database api_fetchSkidUnit
//         $('.manage-equipment-subequipment-widget-con').append(`
//             <span id="${id}" name="${name}" main="main" class="manage-equipment-subequipment-widget btn-shadow" style="background-color: ${BTN_COLOR}; color: white; ">${name}<i class="fas fa-trash manage-equipment-subequipment-widget-delete"></i></span>
//         `);
//         $('#manage-equipment-subequipment-name').val("");
//         api_createSkidUnitSubcategory(id, comid, main, name);

//     }else{
//         blinkbg($('#manage-equipment-subequipment-name'), RED_PALETTE, 'white'); // this is a function from defaults.js
//     }
// });
// $(document).on('click', '.manage-equipment-subequipment-widget-delete', function(){
//     const id = $(this).parent('.manage-equipment-subequipment-widget').attr('id');
//     console.log('Delete this Unit', id);
//     // use this id to delete the specified id
//     // make sure to delete all subunits within it too

//     api_deleteSkidUnitSubcategory(id);
//     $(this).parent('.manage-equipment-subequipment-widget').remove();
// });

// //SUBEQUIPMENT SPECS
// $('#manage-equipment-create-specs').click(function(){
//     let id = $('.manage-equipment-list-specs-title').attr('id');
//     // subopid			PK varchar 30			
// 	// quantity		    int 10
// 	// tank			    varchar 30
// 	// room			    varcahr 30
// 	// capacity		    double 50
// 	// capacity_unit	(liters/kilos)
// 	// dimLength		double 50
// 	// dimWidth		    double 50
// 	// dimHeight		double 50
// 	// cost_budget		double 50
// 	// cost_actual		double 50
//     console.log(id);
// });

// //LAUNCH SKID FUNCTIONS
// $('#create-new-skid').click(function(){
//     const name = $('#manage-skid-name').val();
//     const comid = __COMPANY_ID;
//     const id = rngSkidId();
//     const owner = __FIRST_NAME;
//     const createdate = Date.now();
//     console.log(id, comid, owner, name, createdate); // these are all the variables you need to create a unit

//     if(name != ""){ // if statement to disable adding if name is empty
//         //this code will append to the list, use the same template when getting data from database api_fetchSkidUnit
//         $('.build-widget-con').append(`
//             <span id="${id}" name="${name}" class="build-widget btn-shadow" style="background-color: ${BTN_COLOR}; color: white; ">${name}<i class="fas fa-trash"></i></span>
//         `);
//         api_createSkid(id, comid, owner, name, createdate);

//         $('#manage-skid-name').val("");
//     }else{
//         blinkbg($('#manage-skid-name'), RED_PALETTE, 'white'); // this is a function from defaults.js
//     }
// });
// $(document).on('click', '.manage-skid-widget-delete', function(){
//     const id = $(this).parent('.build-widget').attr('id');
//     console.log('Delete this Unit', id);
//     // use this id to delete the specified id
//     // make sure to delete all subunits within it too
//     $(this).parent('.build-widget').remove();
//     api_deleteSkid(id);
// });

function printPageArea(content){
    console.log("printing");
    // var printContentlegend = document.querySelector('.fintrack-legend');
    var win = window.open('', '', 'width=1200 ,height=980');
    win.document.write(`<html><head> 
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pro Flow</title>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.13.0/css/all.css">
        <link href="${domain}lib/css/default.css" rel="stylesheet" /> 
        <link href="${domain}lib/css/newskidbuilder.css" rel="stylesheet" /> 
        <link href="${domain}lib/css/skidbuilder.css" rel="stylesheet" /> 
        </head> <body style="font-size: 0.8em; height: auto; "> `);

        
    win.document.write(content);
    win.document.write('</body></html>');

    // $(win.document).children('html').children('body').children('.resource-body-accountlist').css({'max-height' : 'initial', "height" : "auto"});
    // $(win.document).children('html').children('body').children('.resource-body-accountlist').children('.resource-body-accountlist-widget').children('.step.tasklist').css({'display' : 'flex'}).show();
   
    // console.log(win.document);

    setTimeout(() => {
        win.print();
        win.close();
    }, 1500);
}



// ____________________________________________________________________________________
$(document).ready(function(){
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
        // console.log(obj);
        COMPANY = new Company(obj);
        setTimeout(() => {
            const cb =()=>{
                
            };
            COMPANY.checkList('Complains', cb); 
        }, 0);
    };
    const cb2 = () => {
        // this function runs after api_checkIfLoggedIn is completed
        // fillUnits();
        // fillEquipments();

        // api_fetchSkidOperation(__COMPANY_ID, 'ready');

        //api_fetchSkid(__COMPANY_ID, 'ready');

        // $('.dashboard-con').show();
        if(__USER_LEVEL == '1' || __USER_LEVEL == '2'){
            // $('#navcon-define').show();
        }else{
            // $('#navcon-define').hide();
        }
        $('.dashboard-con').show();
        // $('.build-con').show();


        ACCUSER = new User({"id" : __ID, "companyid" : __COMPANY_ID});
        // COMPANY = new Company(obj);
        

        // const alobj = ACCUSER.Alert.getObjById("AL-11111");
        // runAlert(alobj, console.log("AWESOOOOME"));

        setTimeout(() => {
            const cb=data=>{
                console.log(data);
                const cb=data=>{
                    console.log(data);
                    const cb=data=>{
                        console.log(data);
                        setTimeout(() => {
                                ACCUSER.Alert.fill();
                                fillProfile();
                                hideAllNav(skid_conList);
                                minimizeNav();
                                $('#nav-data').click();
                        }, 0);
                    }
                    ACCUSER.checkList('Skid', cb);
                }
                ACCUSER.checkList('COMPANY_ACCOUNTS', cb);
            }
            ACCUSER.checkList('Alert', cb);
        }, 0);
        AlertWorker();
    };



    api_checkIfLoggedIn(cb1, cb2);

});


$('.nav-widget-con').click(function(){
    const id = $(this).children('span').attr('id');
    // console.log(id);
    if(id != undefined && id != null && id != ''){
        if(id=="nav-dashboard"){
            console.log('dashboard');
            
        }else if(id=="nav-build"){
            console.log('build');
            $('.build-list').hide();
            $('.build-prefs').hide();
            // $('.build-launch').hide();

            
            // $('.build-launch-unit-con').children('.build-launch-unit-widget-con').children('.build-launch-unit-widget-sub').draggable(SubUnitDragOption);
            // $('.build-launch-skid-con > .build-launch-skid-widget-con').droppable(skidDropOption);
            $('.build-launch-equipment-widget-sub').draggable(subEquipmentDragOption);
            $('.build-launch-unit-widget-sub').draggable(subUnitDragOption);
            $('.build-launch-skid-widget-con').droppable(subUnitDropOption);
            
        }else if(id=="nav-manage-unit"){
            console.log('manage-unit');
            
        }else if(id=="nav-manage-equipment"){
            console.log('manage-equipment');
            
        }
        
    }
});






const testBoxDragOption = {
    start: function(e, ui) {
        $(ui.helper).css('max-width', '300px');

        $('.build-launch-skid-widget-con').css('background-color', GREEN_PALETTE);
    },
    drag: function() {
    //   this function fires after you drag and while dragging
    },
    stop: function() {
        $('.build-launch-skid-widget-con').css('background-color', SUB_COLOR);
    },
    containment: ".build-launch-skid-widget-con",
    // helper: "clone", 
    scroll: false,  // prevents scrolling
    // cursorAt: { bottom: 0, left: 150}, // puts cursor at center bottom || remove left option to just simply put it in bottom
    // revert: "invalid" // draggable will fall back to its place
};


var main;
var mainb4;
const resizableDragOption = {
    
    start: function(e) {
        main = $(this).parent();

        mainb4 = [e.clientX, e.clientY]
        console.log(mainb4);
    },
    drag: function() {
    //   this function fires after you drag and while dragging
    },
    stop: function(e) {
        console.log(e.clientX, e.clientY);
        mainafter = [e.clientX - mainb4[0], e.clientY - mainb4[1]];
        console.log('After: ', mainafter);
        main.width(main.width()+mainafter[0]);
        main.height(main.height()+mainafter[1]);
        
    },
    containment: ".build-launch-skid-widget-con",
    // helper: "clone", 
    scroll: false,  // prevents scrolling
    // cursorAt: { bottom: 0, left: 150}, // puts cursor at center bottom || remove left option to just simply put it in bottom
    // revert: "invalid" // draggable will fall back to its place
};
//BUILD SKID NAVIGATION 
const subEquipmentDragOption = {
    start: function(e, ui) {
        // this function fires when you start dragging
        $(ui.helper).css('max-width', '300px');
        
        const name = $(this).attr("name");
        const id = $(this).attr("id");
        const main = $(this).attr("main");

        console.log(id, name, main);

        $('.build-launch-skid-widget').each(function(){
            if($(this).children('.build-launch-widget-subs').children(`#${id}`).length <= 0){
                $(this).css('background-color', GREEN_PALETTE);
            }else{
                $(this).css('background-color', RED_PALETTE);
            }
        })
    },
    drag: function() {
    //   this function fires after you drag and while dragging
    },
    stop: function() {
    // this function fires when you stop dragging or if you dropped it
        $('.build-launch-skid-widget').css('background-color', SUB_COLOR);
    // and here in stop you can color your droppable div into its original state
    },
    // opacity: 0.7, // opacity of the draggable
    helper: "clone", // will not drag the actual element. instead will send a clone
    containment: ".build-launch", // here is where the draggable can stay. if you put "body" then it can go around the whole page
                                       // but if you put "#sampleid" then it will contain the draggable within the range of the div with the id of 'sampleid'
    scroll: false,  // prevents scrolling
    cursorAt: { bottom: 0, left: 150}, // puts cursor at center bottom || remove left option to just simply put it in bottom
    revert: "invalid" // draggable will fall back to its place
};
const subEquipmentDropOption = {
    accept: ".build-launch-equipment-widget-sub", // this will determine which elements are accepted to drop in this case all element with the class of moduleman-module-list-widget will drop
    drop: function( event, ui ) {
        // same with the draggable. if you use this code, you can access the draggable element thats being dropped 
        
        const equipmentname = $(ui.draggable).attr("name");
        const equipmentid = $(ui.draggable).attr("id");

        const unitname = $(this).attr("name");
        const unitid = $(this).attr("id");
        // console.log( $(ui.draggable));
        console.log(equipmentid, equipmentname);
        console.log(unitid, unitname);
        
        if($(`.build-launch-skid-widget-con > #${unitid} > .build-launch-widget-subs > #${equipmentid}`).length <= 0){
            console.log('Dropping');
            $(`.build-launch-skid-widget-con >  #${unitid} > .build-launch-widget-subs`).append(
                `<span id="${equipmentid}" name="${equipmentname}" main="${equipmentid}" class="build-launch-equipment-widget-sub color-sc">${equipmentname}</span>
                `)
        }
    }
}
const subUnitDragOption = {
    start: function(e, ui) {
        // this function fires when you start dragging
        // $(ui.helper).css('max-width', '300px');
        
        const name = $(this).attr("name");
        const id = $(this).attr("id");
        
        console.log(id);
        console.log(name);

        if($(`.build-launch-skid-widget-con > #${id}`).length <= 0){
            $('.build-launch-skid-widget-con').css('background-color', GREEN_PALETTE);
        }else{
            $('.build-launch-skid-widget-con').css('background-color', RED_PALETTE);
        }
        
    },
    drag: function() {
    //   this function fires after you drag and while dragging
    },
    stop: function() {
    // this function fires when you stop dragging or if you dropped it
        $('.build-launch-skid-widget-con').css('background-color', SUB_COLOR);
    // and here in stop you can color your droppable div into its original state
    },
    // opacity: 0.7, // opacity of the draggable
    helper: "clone", // will not drag the actual element. instead will send a clone
    containment: ".build-launch", // here is where the draggable can stay. if you put "body" then it can go around the whole page
                                       // but if you put "#sampleid" then it will contain the draggable within the range of the div with the id of 'sampleid'
    scroll: false,  // prevents scrolling
    cursorAt: { bottom: 0, left: 150}, // puts cursor at center bottom || remove left option to just simply put it in bottom
    revert: "invalid" // draggable will fall back to its place
};
const subUnitDropOption = {
    accept: ".build-launch-unit-widget-sub", // this will determine which elements are accepted to drop in this case all element with the class of moduleman-module-list-widget will drop
    drop: function( event, ui ) {
        // same with the draggable. if you use this code, you can access the draggable element thats being dropped 
        
        const name = $(ui.draggable).text();
        const id = $(ui.draggable).attr("id");
        // console.log( $(ui.draggable));
        console.log(id);
        console.log(name);
        
        if($(`.build-launch-skid-widget-con > #${id}`).length <= 0){
            console.log('Dropping');
            // $('.build-launch-skid-widget-con').append(
            //     `<div id="${id}" class="build-launch-skid-widget btn-shadow">
            //         <span class="build-launch-skid-widget">${name}</span>
            //         <div class="build-launch-widget-subs">
            //         </div>
            //     </div>`)
            // $(`.build-launch-skid-widget-con > #${id}`).droppable(subEquipmentDropOption);

            $('.build-launch-skid-widget-con').append(
                `<div id='${id}' class='testBox'>
                    <div class='moveable'></div>

                    <div class='resizer'></div>
                </div>`
            )
            $(`.build-launch-skid-widget-con > #${id}`).draggable(testBoxDragOption);
            $(`.build-launch-skid-widget-con > #${id} > .resizer`).draggable(resizableDragOption);
            
            // $(`.resizer`).mousemove(function(e){
            //     // console.log(e.clientX, e.clientY);
            //     console.log('yolo');
            // });
        
        }
    }

}



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
function cidUnit(){

    const cb=data=>{
        console.log(data);
        setTimeout(() => {
            $('#data-mods-unit').parent('.data-mods-widget').css('display', 'flex').show();
            $('#data-mods-equipment').parent('.data-mods-widget').hide();
            $('#data-mods-subequipment').parent('.data-mods-widget').hide();
            $('.data-body-unit-ui').hide();
            $('.data-body-equipment-ui').hide();
            fillUnits();
        }, 0);
    }
    ACCUSER.Skid.checkList('Unit', cb);
}
function cidEquipment(){
    const cb=data=>{
        console.log(data);
        setTimeout(() => {
            $('#data-mods-equipment').parent('.data-mods-widget').css('display', 'flex').show();
            $('#data-mods-unit').parent('.data-mods-widget').hide();
            $('#data-mods-subunit').parent('.data-mods-widget').hide();
            $('.data-body-unit-ui').hide();
            $('.data-body-equipment-ui').hide();
            fillEquipments();
        }, 0);
    }
    ACCUSER.Skid.checkList('Equipment', cb);
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

});
    // data management mods
$('.data-mods-widget').click(function(){
    const id = $(this).children('span').attr('id');
    console.log(id);
    // const projectid = $('#data-header-projectid').text();
    // console.log(projectid);
    
    
    if(id == 'data-mods-refresh'){
        console.log('refresh');
        
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
        const uid = $(this).children('span').attr('uid');
        console.log(uid);
        $('#data-body-unit-createsub-rngid').click();
        $('#data-body-unit-createsub-uid').val(uid);

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
        const eid = $(this).children('span').attr('eid');
        $('#data-body-equipment-createsub-rngid').click();
        $('#data-body-equipment-createsub-eid').val(eid);
        // console.log(eid);
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
$(document).on('click', '.data-body-unit-list-subwidget', function(){
    $('.data-body-unit-ui').hide();
    $('.data-body-equipment-ui').hide();

    // console.log($(this).attr('suid'));
    const suobj = ACCUSER.Skid.Unit.getSubUnitObjById($(this).attr('suid'));
    // console.log(suobj);
    $('#data-body-unit-updatesub-uid').val(suobj.unitid);
    $('#data-body-unit-updatesub-suid').val(suobj.id);
    $('#data-body-unit-updatesub-name').val(suobj.name);
    $('#data-body-unit-updatesub-process').val(suobj.process);
    $('#data-body-unit-updatesub-tag').val(suobj.tag);
    $('.data-body-unit-list-subwidget').removeClass('active');
    $(this).addClass('active');
    $('.data-body-unit-updatesub').css('display', 'flex').show();
});

$('#data-body-unit-create-save').click(function(){
    const options = {
        'id' : $('#data-body-unit-create-id').val(),
        'name' : $('#data-body-unit-create-name').val()
    }
    const cb =()=>{
        // console.log('tasty');
        showNotification('Unit Update','Saved Successfully.');
        fillUnits();
    };
    ACCUSER.Skid.Unit.createSkidUnit(options, cb);
});
$('#data-body-unit-createsub-save').click(function(){
    const options = {
        'id' : $('#data-body-unit-createsub-id').val(),
        'name' : $('#data-body-unit-createsub-name').val(),
        'unitid' : $('#data-body-unit-createsub-uid').val(),
        'process' : $('#data-body-unit-createsub-process').val(),
        'tag' : $('#data-body-unit-createsub-tag').val()
    }
    const cb =()=>{
        // console.log('tasty');
        showNotification('SubUnit Update','Saved Successfully.');
        fillUnits();
    };
    ACCUSER.Skid.Unit.createSkidSubUnit(options, cb);
});
$(document).on('click', '#data-body-unit-update-update', function(){
    const options = {
        'id' : $('#data-body-unit-update-unitid').val(),
        'name' : $('#data-body-unit-update-name').val()
    }
    const cb =()=>{
        // console.log('tasty');
        fillUnits();
        showNotification('Unit Update','Updated Successfully.');
    };
    ACCUSER.Skid.Unit.updateSkidUnit(options, cb);
});
$(document).on('click', '#data-body-unit-update-delete', function(){
    const cbtrue =()=>{
        const options = {
            'id' : $('#data-body-unit-update-unitid').val()
        }
        const cb =()=>{
            // console.log('tasty');
            fillUnits();
            showNotification('Unit Update','Deleted Successfully.');
        };
        ACCUSER.Skid.Unit.deleteSkidUnit(options, cb);
    };
    const cbfalse =()=>{
        showNotification('Unit Update','Cancelled Action');
    };
    showAction("Deleting the Unit will also delete all Subunits within it. Proceed?", cbtrue, cbfalse);
});
$(document).on('click', '#data-body-unit-updatesub-update', function(){
    const options = {
        'id' : $('#data-body-unit-updatesub-suid').val(),
        'name' : $('#data-body-unit-updatesub-name').val(),
        'unitid' : $('#data-body-unit-updatesub-uid').val(),
        'process' : $('#data-body-unit-updatesub-process').val(),
        'tag' : $('#data-body-unit-updatesub-tag').val()
    }
    const cb =()=>{
        fillUnits();
        showNotification('SubUnit Update','Updated Successfully.');
    };
    ACCUSER.Skid.Unit.updateSkidSubUnit(options, cb);
});
$(document).on('click', '#data-body-unit-updatesub-delete', function(){
    const options = {
        'id' : $('#data-body-unit-updatesub-suid').val()
    }
    const cb =()=>{
        fillUnits();
        showNotification('SubUnit Update','Deleted Successfully.');
    };
    ACCUSER.Skid.Unit.deleteSkidSubUnit(options, cb);
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
$(document).on('click', '.data-body-equipment-list-subwidget', function(){
    $('.data-body-equipment-ui').hide();
    $('.data-body-equipment-ui').hide();

    $('.data-body-equipment-updatesub').css('display', 'flex').show();
    // console.log($(this).attr('seid'));
    const suobj = ACCUSER.Skid.Equipment.getSubEquipmentObjById($(this).attr('seid'));
    console.log(suobj);

    $('#data-body-equipment-updatesub-eid').val(suobj.equipmentid);
    $('#data-body-equipment-updatesub-seid').val(suobj.id);
    $('#data-body-equipment-updatesub-name').val(suobj.name);
    $('#data-body-equipment-updatesub-equipmentid').val(suobj.equipmentid);
    $('#data-body-equipment-updatesub-process').val(suobj.process);
    $('#data-body-equipment-updatesub-tag').val(suobj.tag);
    $('#data-body-equipment-updatesub-quantity').val(suobj.quantity);
    $('#data-body-equipment-updatesub-capacity').val(suobj.capacity);
    $('#data-body-equipment-updatesub-tank').val(suobj.tank);
    $('#data-body-equipment-updatesub-room').val(suobj.room);
    $('#data-body-equipment-updatesub-dimension').val(suobj.dimensions);
    $('#data-body-equipment-updatesub-cost').val(suobj.cost);
    $('#data-body-equipment-updatesub-budget').val(suobj.budget);

    $('.data-body-equipment-list-subwidget').removeClass('active');
    $(this).addClass('active');
});

$('#data-body-equipment-create-save').click(function(){
    const options = {
        'id' : $('#data-body-equipment-create-id').val(),
        'name' : $('#data-body-equipment-create-name').val()
    }
    const cb =()=>{
        // console.log('tasty');
        showNotification('Equipment Update','Saved Successfully.');
        fillEquipments();
    };
    ACCUSER.Skid.Equipment.createSkidEquipment(options, cb);
});
$('#data-body-equipment-createsub-save').click(function(){
    const options = {
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
        'budget' : $('#data-body-equipment-createsub-budget').val()
    }
    console.log(options);
    const cb =()=>{
        // console.log('tasty');
        showNotification('SubEquipment Update','Saved Successfully.');
        fillEquipments();
    };
    ACCUSER.Skid.Equipment.createSkidSubEquipment(options, cb);
});
$(document).on('click', '#data-body-equipment-update-update', function(){
    const options = {
        'id' : $('#data-body-equipment-update-eid').val(),
        'name' : $('#data-body-equipment-update-name').val()
    }
    const cb =()=>{
        // console.log('tasty');
        fillEquipments();
        showNotification('Equipment Update','Updated Successfully.');
    };
    ACCUSER.Skid.Equipment.updateSkidEquipment(options, cb);
});
$(document).on('click', '#data-body-equipment-update-delete', function(){
    const cbtrue =()=>{
        const options = {
            'id' : $('#data-body-equipment-update-eid').val()
        }
        const cb =()=>{
            // console.log('tasty');
            fillEquipments();
            showNotification('Equipment Update','Deleted Successfully.');
        };
        ACCUSER.Skid.Equipment.deleteSkidEquipment(options, cb);
    };
    const cbfalse =()=>{
        showNotification('Equipment Update','Cancelled Action');
    };
    showAction("Deleting the Equipment will also delete all SubEquipments within it. Proceed?", cbtrue, cbfalse);
});
$(document).on('click', '#data-body-equipment-updatesub-update', function(){
    const options = {
        'id' : $('#data-body-equipment-updatesub-seid').val(),
        'name' : $('#data-body-equipment-updatesub-name').val(),
        'equipmentid' : $('#data-body-equipment-updatesub-eid').val(),
        'process' : $('#data-body-equipment-updatesub-process').val(),
        'tag' : $('#data-body-equipment-updatesub-tag').val(),
        'quantity' : $('#data-body-equipment-updatesub-quantity').val(),
        'capacity' : $('#data-body-equipment-updatesub-capacity').val(),
        'tank' : $('#data-body-equipment-updatesub-tank').val(),
        'room' : $('#data-body-equipment-updatesub-room').val(),
        'dimensions' : $('#data-body-equipment-updatesub-dimension').val(),
        'cost' : $('#data-body-equipment-updatesub-cost').val(),
        'budget' : $('#data-body-equipment-updatesub-budget').val()
    }
    const cb =()=>{
        fillEquipments();
        showNotification('SubEquipment Update','Updated Successfully.');
    };
    ACCUSER.Skid.Equipment.updateSkidSubEquipment(options, cb);
});
$(document).on('click', '#data-body-equipment-updatesub-delete', function(){
    const options = {
        'id' : $('#data-body-equipment-updatesub-seid').val()
    }
    const cb =()=>{
        fillEquipments();
        showNotification('SubEquipment Update','Deleted Successfully.');
    };
    ACCUSER.Skid.Equipment.deleteSkidSubEquipment(options, cb);
});