// let dbUrl = 'controllers/ajax/login.php';
let apiUrl = `api/api_login.php`;
let comid = "";
let id = "";
let name = "";
let companyname = "";
let photo = "";
let machineid = '';
let rememberGate = true;
let selcompanyid = '';
let companystatus = '';

function login(data){
    if(data.userlevel == '0' || data.userlevel == '1' || data.userlevel == '2' || data.userlevel == '3'){
        window.location.href = domain + 'pages/control';
        return true;
    }else{
        return false;
    }
}


function adminPrelogin(data){
    console.log(data);
    if(data.response != "error"){
        companyname = data.name;
        // console.log(data.name);
        if(data.logo == 'na'){
            photo = "lib/images/avatardefault.png";
        }else{
            photo = data.logo;
        }
        $('#login-submit').css({opacity: 1, display: 'initial'}).animate({opacity: 0}, 300).remove();
        $('.loginbox').animate({height: '500px'}, 400, function(){
            $('#login-id').blur().prop('disabled', true);
            $('.login-greeting').text(`${companyname}`);
            $('.login-image').attr('src', photo);
            $('.login-image').css({opacity: 0, display: 'initial'}).animate({opacity: 1}, 300);
            $('.login-greeting').css({opacity: 0, display: 'initial'}).animate({opacity: 1}, 300);
            $('.login-continue').css({opacity: 0, display: 'initial'}).animate({opacity: 1}, 300).focus();
        });
        comid = data.companyid;
        databaseid = data.databaseid;
        companystatus = data.status;
        // setDBConn(databaseid);
        // return true;
    }else{
        $('.loginbox').animate({height: '300px'}, 50, function(){
            $('.login-greeting').text(``);
            $('.login-image').hide();
            $('.login-image').animate({opacity: 1}, 50);
            $('.login-greeting').animate({opacity: 0}, 50);
            $('.login-continue').animate({opacity: 0}, 50);
        });
        // return false;
    }
}
// function setDBConn(databaseid){
//     console.log(databaseid);
//     // sessionStorage.setItem('DATABASE_ID', databaseid);
// }


function api_adminlogin(options, cbsuccess=()=>{}, cbcomplete=()=>{}){
    let url = domain + apiUrl;
    $.ajax({
        async: true,
        url: url,
        contentType: "application/json",
        type: 'get',
        data: {
            'function': 'adminlogin',
            'id' : options.id,
            'email' : options.email,
            'companyid' : options.companyid,
            'password' : options.password
        },
        dataType: 'json',
        beforeSend: function(){
            showLoadingReport('Performing Pre Login.. Please Wait');
        },
        success: function(data){
            cbsuccess(data);
            console.log(data);
        },
        complete: function(){
            hideLoadingReport();
            cbcomplete();
        }
    });
}
// API EVENTS 
$('.login-btn').click(function(e){
    console.log('login btn');
    e.preventDefault();
    let email = $('#login-email').val();
    let password = $('#login-password').val();
    let id = $('#login-userid').val();
    
    // if($('#remember').is(':checked')){
    //     console.log('add machine name', machineid);
    //     api_createAccountMachine(machineid, id);
    // }
    

    // console.log(id, email, password);
    const options = {
        "id" : id, 
        "email" : email, 
        "password" : password, 
        "companyid" : selcompanyid
    }
    // api_login(options);
    const cb =data=>{
        login(data);
    }
    api_adminlogin(options, cb);
});
$('#login-submit').click(function(){
    console.log('login submit');
    let id = $('#login-id').val();
    selcompanyid = id;
    const cb =data=>{
        // console.log(data);
        adminPrelogin(data);
    };
    ADMIN.prelogin({"companyid" : id}, cb); 
});




// STATIC EVENT 
$('.login-continue').click(function(){
    console.log('login continue');
    console.log(companystatus);
    if(companystatus == "active" || selcompanyid == "admincontrol"){
        $('.login-image').animate({opacity: 0}, 300).remove();
        $('.login-greeting').animate({opacity: 0}, 300).remove();
        $('#login-id').animate({opacity: 0}, 300).remove();
        $('.login-continue').animate({opacity: 0}, 300, function(){
            $('#login-userid').css({opacity: 0, display: 'initial'}).animate({opacity: 1}, 300);
            $('#login-email').css({opacity: 0, display: 'initial'}).animate({opacity: 1}, 300);
            $('#login-password').css({opacity: 0, display: 'initial'}).animate({opacity: 1}, 300);
            $('.login-btn').css({opacity: 0, display: 'initial'}).animate({opacity: 1}, 300);
            
            $('.loginbox').animate({height: '350px'}, 400, function(){
                $('.login-title').css({opacity: 0, display: 'initial'}).text(`You are Logging in to ${companyname}`).animate({opacity: 1}, 300);
            });

        }).remove();
        // setDBConn(databaseid);
    }else{
        alert("This Company is still tagged as Inactive, if you think this is an error, please contact us.");
        // showNotification("Company Status", "This Company is still tagged as Inactive, if you think this is an error, please contact us.");
    }
    
});




$(document).ready(function(){
    $('#loginform').show();
    $('.loginbox').css('display','flex').show();
    ADMIN = new Admin({});

});













// $('#remember-form').submit(function(e){
//     e.preventDefault();
//     let companyid = $(this).attr('companyid');
//     let password = $('.remember-password').val();
//     let email = $(this).attr('email');
//     let accid = $(this).attr('accid');

//     const cbcomplete = () => {
//         e.preventDefault();
//         console.log(accid, email, password);
    
//         api_login(accid, email, password, companyid);
//     };
//     api_prelogin(companyid, 'remember-form', cbcomplete);
// });
// $('.remember-back').click(function(){
//     $('#remember-form').hide();
//     $('#loginform').show();
//     $('.loginbox').css('display','flex').show();
//     rememberGate = false;
// });