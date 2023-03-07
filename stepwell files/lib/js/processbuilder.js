let processbuilder_conList = [
    $('.nav-maincontainer'),
    
];


function hideAllNav(list){
    for(i=0; i < list.length; i++){
        list[i].css('display', 'none');
        // console.log(list[i]);
    }
}
function showAllNav(list){
    for(i=0; i < list.length; i++){
        list[i].css('display', 'flex');
        // console.log(list[i]);
    }
}
function logout(){
    api_logout();
    window.location.href = domain;
}
function fillProfile(ph, fn){
    if(ph == 'na'){
        $('#profile-img').attr('src','lib/images/avatardefault.png');
    }else{
        $('#profile-img').attr('src', ph);
    }
    $('#profile-name').text(fn);
}

// user profile functions
$('#profile-open').click(function(){
    $('#profile').toggle();
});
$('#profile').click(function(e){
    if(e.target != this){
        return;
    }else{
        $(this).toggle();
    }
});
$('#profile-logout').click(function(){
    logout();
});

//HOME EVENTS
$('#home-open').click(function(){
    window.location.href = domain + 'pages/control/';
});


//navigation default functions
$('.nav-subwidget-title').mouseenter(function(){
    $(this).css('background-color', SUB_COLOR);
    $(this).children('.nav-subwidget-icon').toggleClass('scale');
});
$('.nav-subwidget-title').mouseleave(function(){
    $(this).css('background-color', BTN_COLOR);
    $(this).children('.nav-subwidget-icon').toggleClass('scale');
});
$('.nav-widget').mouseenter(function(){
    // $(this).css('background-color', SUB_COLOR);
    $(this).children('.nav-widget-title').children('.nav-widget-icon').toggleClass('scale');
    $(this).children('.nav-widget-title').toggleClass('scale');
});
$('.nav-widget').mouseleave(function(){
    // $(this).css('background-color', BTN_COLOR);
    $(this).children('.nav-widget-title').children('.nav-widget-icon').toggleClass('scale');
    $(this).children('.nav-widget-title').toggleClass('scale');
    // $(this).children('.nav-sub-widget').toggleClass('hidden');
    $('#nav-sub-widget').toggleClass('hidden');
});
$('.nav-widget').click(function(){
    $(this).children('.nav-sub-widget').toggleClass('hidden');
});
$('.nav-sub-widget-title').click(function(){
    $('#nav-sub-widget').toggleClass('hidden');
});
$(document).on('click', '.nav-subwidget-title, .nav-widget-title', function(){
    // console.log();
    const id = $(this).attr('id');
    if(id != undefined){
        // console.log(id);
        if(id.includes('document')){

        }else{
            const idparts = id.split('-');
        
            if(idparts.length == 3){
                // console.log(idparts[0], idparts[1], idparts[2]);
                // console.log('.' + idparts[1] + '-' + idparts[2] + '-con');
                hideAllNav(processbuilder_conList);
                $('.' + idparts[1] + '-' + idparts[2] + '-con').css('display', 'flex');
            }else if(idparts.length == 2){
                // console.log('.' + idparts[1] + '-con');
                hideAllNav(processbuilder_conList);
                $('.' + idparts[1] + '-con').css('display', 'flex');
            }
        }
    }else{
        // console.log('not a nav....');
    }
});


// ________________________________________________________________________________________________






















// ________________________________________________________________________________________________

$(document).ready(function(){
    // this $(document).ready(); function runs after browser loads all html elements
    // it fires everytime you refresh the page. hence it runs when you first land on the page

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
    };
    const cb2 = () => {
        // this function runs after api call is completed, right after success is called.
        // i mainly use this function to set the front end stuff. 
        hideAllNav(processbuilder_conList);
        // getAccountModules(__USER_LEVEL, __ID);
        fillProfile(__PHOTO, __FIRST_NAME);

        if( __USER_LEVEL != '' || __USER_LEVEL == null || __USER_LEVEL == undefined){
            if(__USER_LEVEL == '3'){
                // showAllNav(nav_usrprocessbuilder_conList);
                // $('.dashboard-user-con').show();
            }else if(__USER_LEVEL == '2'){
                // showAllNav(nav_supprocessbuilder_conList);
                // $('.dashboard-superuser-con').show();
            }else if(__USER_LEVEL == '1'){
                // showAllNav(nav_ceoprocessbuilder_conList);
                // $('.dashboard-admin-con').show();
            }else if(__USER_LEVEL == '0'){
                // showAllNav(nav_vipprocessbuilder_conList);
                // $('.dashboard-superadmin-con').show();
                // $('.moduleman-con').show();
            }
        }
        $('.dashboard-con').show();
    };
    api_checkIfLoggedIn(cb1, cb2);
});
function init(){
    console.log('body has been loaded');
}