$('.test').click(function(){
    // showLoadingReport('Hello');
    // setTimeout(function(){
    //     hideLoadingReport();
    // }, 2000);

    // showNotification('title', 'message');

    // const cbtrue = () => {
    //     console.log('true test');
    // };
    // const cbfalse = () => {
    //     console.log('false test');
    // };
    // showAction('Confirm Delete Test', cbtrue, cbfalse);

});

$(document).on('click', '.nav-widget', function(){
    const id = $(this).attr('id');

    if(id.includes('home')){
        window.location.href = domain;
    }else if(id.includes('contact')){
        window.location.href = domain + 'pages/contact';
    }else if(id.includes('plans')){
        window.location.href = domain + 'pages/plans';
    }else if(id.includes('setup')){
        window.location.href = domain + 'pages/setup';
    }else if(id.includes('about')){
        window.location.href = domain + 'pages/about';
    }else if(id.includes('company')){
        window.location.href = domain + 'pages/company';
    }
});



// USER PROFILE EVENTS

    // navigation
$(document).on('click', '#userprofile', function(){
    $('body').addClass('noscroll');
    $('#profile').css("dsiplay", "flex").show();
});
$(document).on('click', '#profile', function(e){
    if(e.target != this){
        return;
    }else{
        $(this).hide();
        $('body').removeClass('noscroll');
    }
});
$(document).on('click', '.userprofile-close', function(){
    $('#profile').hide();
    $('body').removeClass('noscroll');
});
$(document).on('click', '.userprofile-user', function(){
    $('.userprofile > .nav > i').removeClass('active');
    $('.userprofile-wild-con').hide();
    $('.userprofile-user-con').css('display', 'flex').show();
    $(this).addClass('active');
});
$(document).on('click', '.userprofile-envelope', function(){
    $('.userprofile > .nav > i').removeClass('active');
    $('.userprofile-wild-con').hide();
    $('.userprofile-envelope-con').css('display', 'flex').show();
    $(this).addClass('active');
});
$(document).on('click', '.userprofile-receipt', function(){
    $('.userprofile > .nav > i').removeClass('active');
    $('.userprofile-wild-con').hide();
    $('.userprofile-receipt-con').css('display', 'flex').show();
    $(this).addClass('active');
});

    // billing widgets
$(document).on('click', '.billing-widget-title-h', function(){
    console.log('test');
    const con = $(this).siblings('.details');
    if(con.hasClass('hidden')){
        con.removeClass('hidden').css("dsiplay", "flex").show();
    }else{
        con.addClass('hidden').hide();
    }
});


// CART EVENTS
$(document).on('click', '#usercart', function(){
    $('body').addClass('noscroll');
    $('#cart').css("dsiplay", "flex").show();
});
$(document).on('click', '#cart', function(e){
    if(e.target != this){
        return;
    }else{
        $(this).hide();
        $('body').removeClass('noscroll');
    }
});
$(document).on('click', '.usercart-close', function(){
    $('#cart').hide();
    $('body').removeClass('noscroll');
});
$(document).on('click', '.cart-widget-remove', function(){
    const lid = $(this).attr('lid');

    const usercartcookie = getCookie("usercart");
    const usercartdata = JSON.parse(usercartcookie);
    const obj = $.grep(usercartdata, function(e){ 
        return e.id != lid; 
    });
    const usercartstr = JSON.stringify(obj);
    setCookie("usercart", usercartstr, 1);
    ACCUSER.fillCart();
    $(this).parent('.widget').remove();
});



// REGISTER EVENTS
$(document).on('click', '#trial-form-submit', function(){
    const options = {
        'email' : $('#trial-form-email').val(),
        'firstname' : $('#trial-form-firstname').val(),
        'lastname' : $('#trial-form-lastname').val(),
        'phone' : $('#trial-form-phone').val(),
        'companyname' : $('#trial-form-companyname').val(),
        'password' : $('#trial-form-password').val(),
        'confirmpassword' : $('#trial-form-confirmpassword').val()
    }
    let gate = true;

    if(options.email == "" || options.email.length <= 3 || !validateEmail(options.email)){
        gate = false;
        blinkbg($('#trial-form-email'), 'red', 'rgba(255, 255, 255, 0.2)');
    }
    if(options.firstname == "" || options.firstname.length <= 3){
        gate = false;
        blinkbg($('#trial-form-firstname'), 'red', 'rgba(255, 255, 255, 0.2)');
    }
    if(options.lastname == "" || options.lastname.length <= 3){
        gate = false;
        blinkbg($('#trial-form-lastname'), 'red', 'rgba(255, 255, 255, 0.2)');
    }
    if(options.phone == "" || options.phone.length < 10 || options.phone.length > 10 || isNaN(options.phone)){
        gate = false;
        blinkbg($('#trial-form-phone'), 'red', 'rgba(255, 255, 255, 0.2)');
    }
    if(options.companyname == "" || options.companyname.length <= 3){
        gate = false;
        blinkbg($('#trial-form-companyname'), 'red', 'rgba(255, 255, 255, 0.2)');
    }
    if(options.password == "" || options.password.length <= 3 || options.password != options.confirmpassword){
        gate = false;
        blinkbg($('#trial-form-password'), 'red', 'rgba(255, 255, 255, 0.2)');
    }
    if(options.confirmpassword == "" || options.confirmpassword.length <= 3  || options.password != options.confirmpassword){
        gate = false;
        blinkbg($('#trial-form-confirmpassword'), 'red', 'rgba(255, 255, 255, 0.2)');
    }

    if(gate){
        // console.log(options);
        

        const cbs =data=>{
            console.log(data);
            if(data.response == "error"){
                showToast('An Error has Occured. Please try again or contact our administrators.');
            }else{
                showToast('Account Created! Please check your Email for Verification!');
            }
        };
        const cbc =()=>{
            $('#trial-form-email').val("");
            $('#trial-form-firstname').val("");
            $('#trial-form-lastname').val("");
            $('#trial-form-phone').val("");
            $('#trial-form-companyname').val("");
            $('#trial-form-password').val("");
            $('#trial-form-confirmpassword').val("");
            const code = rngCode();
            const cbs1 =data=>{
                console.log(data);
                
            };
            const cbc1 =()=>{
                const emailoptions = {
                    "toemail" : [options.email],
                    "firstname" : options.firstname,
                    "lastname" : options.lastname,
                    "email" : options.email,
                    "code" : code
                }
                const cb =()=>{
                    console.log('AWESOME');
                    showToast('Email Verification sent Please check your Email!');
                };
                sendConfirmationEmail(emailoptions, cb);
            };
            const confoptions = {
                'email': options.email,
                'code': code
            }
            api_createConfirm(confoptions, cbs1, cbc1);
        };
        api_createAccount(options, cbs, cbc);
    }

    
});


// PROFILE LOGIN
$(document).on('click', '#profile-login-submit', function(){
    const options = {
        "email" : $('#profile-login-email').val(),
        "password" : $('#profile-login-password').val()
    }
    let gate = false;
    // console.log(options);
    const cbsuccess =data=>{
        console.log(data);
        if(data.response == "error"){
            showToast("Invalid Login Credentials");
            $('#profile-container-login').css('display', 'flex').show();
            $('#profile-container-userprofile').hide();
        }else if(data.response == "unconfirmed"){
            showToast("Please Confirm your Account with us first.");
            $('#profile-container-login').css('display', 'flex').show();
            $('#profile-container-userprofile').hide();
        }else{
            if(data.confirmed != 'false'){
                gate = true;
            }else{
                showToast("Please Confirm your Email before logging in.");
            }
            
        }
        
    };
    const cbcomplete =()=>{
        if(gate){
            // fillProfile();
            // fillMessage();
            // fillCart();
            // fillBilling();
            // fillLicense();
            ACCUSER.fill();
        }
    };
    api_login(options, cbsuccess, cbcomplete);
});

// PROFILE USER
$(document).on('click', '#userprofile-user-con-update', function(){
    $('.userprofile-user-btn-d').hide();
    $('#userprofile-user-con-update-c').css('display', 'flex').show();
    $('#userprofile-user-con-oldpassword').css('display', 'flex').show();

    $('#userprofile-user-con-firstname').prop('disabled', false);
    $('#userprofile-user-con-lastname').prop('disabled', false);
    $('#userprofile-user-con-phone').prop('disabled', false);
    $('#userprofile-user-con-companyname').prop('disabled', false);
    // $('#userprofile-user-con-email').prop('disabled', false);
    
});
$(document).on('click', '#userprofile-user-con-update-c', function(){
    let gate = true;
    const cbs =data=>{
        console.log(data);
        if(data.response == "success"){
            const options = {
                'email' : $('#userprofile-user-con-email').val(),
                'firstname' : $('#userprofile-user-con-firstname').val(),
                'lastname' : $('#userprofile-user-con-lastname').val(),
                'phone' : $('#userprofile-user-con-phone').val(),
                'companyname' : $('#userprofile-user-con-companyname').val()
            }
            if(options.firstname == "" || options.firstname.length <= 3){
                gate = false;
                blinkbg($('#userprofile-user-con-firstname'), 'red', 'rgba(255, 255, 255, 0.2)');
            }
            if(options.lastname == "" || options.lastname.length <= 3){
                gate = false;
                blinkbg($('#userprofile-user-con-lastname'), 'red', 'rgba(255, 255, 255, 0.2)');
            }
            if(options.phone == "" || options.phone.length < 10 || options.phone.length > 10 || isNaN(options.phone)){
                gate = false;
                blinkbg($('#userprofile-user-con-phone'), 'red', 'rgba(255, 255, 255, 0.2)');
            }
            if(options.companyname == "" || options.companyname.length <= 3){
                gate = false;
                blinkbg($('#userprofile-user-con-companyname'), 'red', 'rgba(255, 255, 255, 0.2)');
            }

            if(gate){
                const cbs =data=>{
                    console.log(data);
                    if(data.response == "success"){
                        showToast("User Information Updated Successfully.");
                    }else{
                        showToast("An Error has Occured! System will refresh the page in 5 seconds.");
                        setTimeout(() => {
                            location.reload();
                        }, 5000);
                    }
                };
                api_updateAccount(options, cbs, ()=>{});
            }
            
        }else if(data.response == "error_mismatch"){
            showToast("Invalid Password. Please try again.");
            $('#userprofile-user-con-oldpassword').val("");
            blinkbg($('#userprofile-user-con-oldpassword'), "red", "rgba(255, 255, 255, 0.2)");
            ACCUSER.fillProfile();
        }else if(data.response == "error_logout"){
            showToast("You are not Logged In! Please login to continue!");
            ACCUSER.fillProfile();
        }
    };
    const cbc =()=>{
        if(gate){
            $('.userprofile-user-btn-h').hide();
            $('#userprofile-user-con-oldpassword').hide();
            $('.userprofile-user-btn-d').css('display', 'flex').show();

            $('#userprofile-user-con-firstname').prop('disabled', true);
            $('#userprofile-user-con-lastname').prop('disabled', true);
            $('#userprofile-user-con-phone').prop('disabled', true);
            $('#userprofile-user-con-companyname').prop('disabled', true);
            $('#userprofile-user-con-oldpassword').val("");
        }
    };
    api_checkPassword({"password" : $('#userprofile-user-con-oldpassword').val()}, cbs , cbc);
});

$(document).on('click', '#userprofile-user-con-changepassword', function(){
    $('.userprofile-user-btn-d').hide();
    $('#userprofile-user-con-changepassword-c').css('display', 'flex').show();
    $('#userprofile-user-con-oldpassword').css('display', 'flex').show();
    $('#userprofile-user-con-newpassword').css('display', 'flex').show();
    $('#userprofile-user-con-confirmpassword').css('display', 'flex').show();

    
    $('#userprofile-user-con-firstname').hide();
    $('#userprofile-user-con-phone').hide();
    $('#userprofile-user-con-lastname').hide();
    $('#userprofile-user-con-companyname').hide();
});
$(document).on('click', '#userprofile-user-con-changepassword-c', function(){
    let gate = true;

    const cbs =data=>{
        console.log(data);
        
        if(data.response == "success"){
            const options = {
                'email' : $('#userprofile-user-con-email').val(),
                'password': $('#userprofile-user-con-oldpassword').val(),
                'newpassword': $('#userprofile-user-con-newpassword').val(),
                'confirmpassword': $('#userprofile-user-con-confirmpassword').val()
            }
            if(options.newpassword == "" || options.password.length <= 3 || options.newpassword != options.confirmpassword){
                gate = false;
                blinkbg($('#userprofile-user-con-newpassword'), 'red', 'rgba(255, 255, 255, 0.2)');
            }
            if(options.confirmpassword == "" || options.confirmpassword.length <= 3  || options.newpassword != options.confirmpassword){
                gate = false;
                blinkbg($('#userprofile-user-con-confirmpassword'), 'red', 'rgba(255, 255, 255, 0.2)');
            }

            if(gate){
                const cbs =data=>{
                    console.log(data);
                    if(data.response == "success"){
                        showToast("Password Updated Successfully.");
                    }else{
                        showToast("An Error has Occured! System will refresh the page in 5 seconds.");
                        setTimeout(() => {
                            location.reload();
                        }, 5000);
                    }
                };
                api_updateAccountPassword(options, cbs, ()=>{});
            }

        }else if(data.response == "error_mismatch"){
            showToast("Invalid Password. Please try again.");
            $('#userprofile-user-con-oldpassword').val("");
            $('#userprofile-user-con-newpassword').val("");
            $('#userprofile-user-con-confirmpassword').val("");
            blinkbg($('#userprofile-user-con-oldpassword'), "red", "rgba(255, 255, 255, 0.2)");
        }else if(data.response == "error_logout"){
            showToast("You are not Logged In! Please login to continue!");
            fillProfile();
        }
    };
    const cbc =()=>{
        if(gate){
            $('.userprofile-user-btn-h').hide();
            $('#userprofile-user-con-oldpassword').val("").hide();
            $('#userprofile-user-con-newpassword').val("").hide();
            $('#userprofile-user-con-confirmpassword').val("").hide();
            $('.userprofile-user-btn-d').css('display', 'flex').show();
            
            $('#userprofile-user-con-firstname').css('display', 'flex').show();
            $('#userprofile-user-con-lastname').css('display', 'flex').show();
            $('#userprofile-user-con-companyname').css('display', 'flex').show();
            $('#userprofile-user-con-phone').css('display', 'flex').show();
        }
    };
    api_checkPassword({"password" : $('#userprofile-user-con-oldpassword').val()}, cbs , cbc);
});

$(document).on('click', '#userprofile-user-con-logout', function(){
    const cbs =data=>{
        console.log(data);
    };
    const cbc =()=>{
        ACCUSER.fillProfile();
        eraseCookie("usermessage");
        eraseCookie("userbill");
    };
    api_logout(cbs, cbc);
});


// MESSAGING EVENTS
$(document).on('click', '#userprofile-envelope-submit', function(){
    const options = {
        'id' : rngMessageId(),
        'owner' : __EMAIL,
        'sender' : 'user',
        'message' : $('#userprofile-envelope-message').val()
    }

    var regex = /^[a-zA-Z0-9.,?!@() ]+$/
    var gate = regex.test($('#userprofile-envelope-message').val());
    // const str = $('#userprofile-envelope-message').val().toString();
    // const gate = string.matches("[a-zA-Z.?! ]*");

    if(gate){
        api_createMessage(options)
        .then(data=>{
            console.log(data);  
            showToast("Message Sent Sucessfully!");
            $('#userprofile-envelope-message').val("");
            const zoptions = {
                'id' : options.id,
                'sender' :  options.sender,
                'message' :  options.message,
                'stamp' :  dateFns.format(
                    new Date(),
                    "YYYY-MM-DD hh:mm:ss"
                )
            }
            ACCUSER.addMessage(zoptions);
        })
        .catch(err=>{
            console.log(err);
            showToast("Something went wrong, Please check your internet connection or refresh the page.");
        });
    }else{
        blinkbg($('#userprofile-envelope-message'), "red", "white");
        showToast("Special Characters are not allowed.");
    }
    
});

// CHECKOUT EVENTS
$(document).on('click', '.plans-content-widget-submit', function(){
    const lid = $(this).attr('lid');
    console.log(lid);
    const licdata = Plans.licenseToCheckoutData(lid);
    const usercartcookie = getCookie("usercart");
    const userbillcookie = getCookie("userbill");
    if(usercartcookie != null && usercartcookie != undefined){
        const usercartdata = JSON.parse(usercartcookie);
        // const userbilldata = JSON.parse(userbillcookie);
        const userbilldata = ACCUSER.Billing;
        console.log(userbilldata);
        let gate = true;
        $.each(usercartdata, function(key, value){
            if(value.id == licdata.id){
                gate = false;
                showToast("The Item you are Buying is already in the cart");
            }
            const liczdata = Plans.licenseToData(value.id);
            if(liczdata.modulename == licdata.modulename){
                gate = false;
                showToast("You cannot add two License of the same Module.");
            }
        });
        $.each(userbilldata, function(key, value){
            const liczdata = Plans.licenseToData(value.licenseid);
            if(liczdata.modulename == licdata.modulename && value.status != "archive"){
                gate = false;
                showToast("You Still have an active Module of this Item. Contact Us if you would like to cancel your Subscription and purchase a new one.");
            }
        });
        if(gate){
            usercartdata.push(licdata);
            const usercartstr = JSON.stringify(usercartdata);
            setCookie("usercart", usercartstr, 1);
            $('#nav').get(0).scrollIntoView({ behavior: 'smooth' });
            ACCUSER.fillCart();
        }
        
    }else{
        let usercartObj = [];
        usercartObj.push(licdata);
        const usercartstr = JSON.stringify(usercartObj);
        setCookie("usercart", usercartstr, 1);
    }
    // console.log(licdata);
});
$(document).on('click', '#cart-container-widget-checkout', function(){
    console.log("test");
    const billid = rngMainBillId();

    const usercartcookie = getCookie("usercart");
    const usercartobj = JSON.parse(usercartcookie);

    let gate = true;

    $.each(usercartobj, function(key, value){
        const licensekey = rngPassword();
        const options = {
            'id' : licensekey,
            'billid' : billid,
            'owner' : __EMAIL,
            'licenseid' : value.id,
            'billdate' :  dateFns.format(
                new Date(),
                "YYYY-MM-DD"
            ),
            'expirydate' : value.expiry,
            'subtotal' : value.subtotal,
            'status' : 'pending'
        }
        console.log(options);
        api_createBill(options)
        .then(data=>{
            ACCUSER.addBill(options);
            showToast("Checkout Success! You will receive a confirmation Email within the next 24 hours!");
            const licoptions = {
                'id' : licensekey,
                'licenseid' : options.licenseid,
                'companyid' : "na",
                'owner' : __EMAIL,
                'startdate' : options.billdate,
                'enddate' : options.expirydate,
                'status' : 'active',
            }
            console.log(licoptions);
            api_createLicense(licoptions)
            .then(data=>{
                console.log(data);
                eraseCookie("usercart");
                ACCUSER.fillCart();
                ACCUSER.fillCompanyLicense();
            })
            .catch(err=>{
                console.log(err);
            });
        })
        .catch(err=>{
            console.log(err);
            showToast("An Error has Occured! Please Check your Internet Connection or Refresh this Page.");
        });
    });



    
});

// COMPANY LICENSE EVENTS
$(document).on('click', '#company-actions-select-licenselist-h', function(){
    const licid = $('#company-actions-select-licenselist').val();
    console.log(licid);
    if(licid != null){
        $('#company-actions-select-licenselist').children('option:selected').remove();
        $('#company-actions-select-licenselist-collection').append(`<span>${licid}  &nbsp; <i licid="${licid}" class="company-actions-select-licenselist-d fas fa-trash" style="cursor: pointer;"></i> </span>`);
    }
});
$(document).on('click', '.company-actions-select-licenselist-d', function(){
    const licid = $(this).parent().text();
    console.log(licid);
    const licobj = ACCUSER.getLicenseObj(licid.trim());
    console.log(licobj);
    $('#company-actions-select-licenselist').append(`<option value="${licobj.id}">${licobj.id} &bull; ${licobj.licenseid}</option>`);
    $(this).parent().remove();
});
$(document).on('click', '#company-actions-licenselist-request', function(){
    const companyname = $('#company-actions-select-companyname').val();
    const companyid = $('#company-actions-select-companyid').val();
    let liclist = [];
    $('#company-actions-select-licenselist-collection').children('span').each(function(){
        liclist.push($(this).text().trim());
    });

    const options = {
        'id' : rngPassword(),
        'companyid' : companyid == "" ? rngCompanyId() : companyid,
        'companyname' : companyname,
        'owner' : __EMAIL,
        'keys' : JSON.stringify(liclist)
    }
    console.log(options);
    

    api_createCompanyRequest(options)
    .then(data=>{
        console.log(data);
        // showToast("Your Request has been sent! please allow us 24 hours to process your request.");
        $('#company-actions-select-companyid').val("");
        $('#company-actions-select-companyname').val("");
        $('#company-actions-select-licenselist-collection').empty();
        if(liclist.length > 0){
            const gate = true;
            $.each(liclist, function(key, value){
                const uptions = {
                    'id' : value,
                    'companyid' : "request"
                }
                api_updateLicenseCompanyid(uptions)
                .then(data=>{
                    console.log(data);
                })
                .catch(err=>{
                    console.log(err);
                    gate = false;
                });
            });

            if(gate){
                showToast("Your Request has been sent! please allow us 24 hours to process your request.");
            }else{
                showToast("Your Request has been sent! But an internal error ocurred. please message our team regarding this error.");
            }
        }
    })
    .catch(err=>{
        console.log(err);
        showToast("There was an error creating the Request. Please Try again later.");
    });

});



function setActiveNavigation(){
    const loc = location.href;
    $('.nav-widget').removeClass('active');
    if(loc == domain){
        $('#nav-widget-home').addClass('active');
    }else if(loc.includes('contact')){
        $('#nav-widget-contact').addClass('active');
    }else if(loc.includes('about')){
        $('#nav-widget-about').addClass('active');
    }else if(loc.includes('plans')){
        $('#nav-widget-plans').addClass('active');
    }else if(loc.includes('setup')){
        $('#nav-widget-setup').addClass('active');
    }else if(loc.includes('company')){
        $('#nav-widget-company').addClass('active');
    }
}
function getRegisterUrl(){
    return domain + "contact";
}


// function fillCart(){
//     // eraseCookie("usercart");
//     $('#cart-container-widget-con').empty();
//     const usercartcookie = getCookie("usercart");
//     const usercartdata = JSON.parse(usercartcookie);
//     if(usercartdata != null && usercartdata != undefined && usercartdata.length > 0){
//         let subt = 0;
//         $.each(usercartdata, function(key, value){
//             subt += parseFloat(value.subtotal);
//             $('#cart-container-widget-con').append(`
//                 <div class="widget">
//                     <div class="title">
//                         <span>${value.modulename}</span>
//                         <span>${value.duration}</span>
//                     </div>
//                     <div class="details">
//                         <div class="detailspeck">
//                             <span>License Expiry</span>
//                             <span>${value.expiry}</span>
//                         </div>
//                         <div class="detailspeck">
//                             <span>Subtotal</span>
//                             <span>$${value.subtotal}</span>
//                         </div>
//                     </div>
//                     <button lid="${value.id}" class="default-button-mini cart-widget-remove">Remove <i class="fas fa-trash"></i></button>
//                 </div>
//             `);
//         });
//         const hst = subt * 0.13;
//         const total = subt + hst;
//         const totalsHtml = `
//             <div class="widget totals">
//                 <div class="details">
//                     <div class="detailspeck">
//                         <span>Subtotal</span>
//                         <span>$${subt.toFixed(2)}</span>
//                     </div>
//                     <div class="detailspeck">
//                         <span>HST/HST</span>
//                         <span>$${hst.toFixed(2)}</span>
//                     </div>
//                     <div class="detailspeck">
//                         <span>Total</span>
//                         <span>$${total.toFixed(2)}</span>
//                     </div>
//                 </div>
//                 <button id="cart-container-widget-checkout" class="default-button-mini">Checkout</button>
//             </div>
//         `
//         $('#cart-container-widget-con').append(totalsHtml);
//         $('#usercart-counter').text(usercartdata.length);
//     }else{
//         $('#cart-container-widget-con').append(`
//             <div class="widget">
//                 <div class="title">
//                     <span>Cart</span>
//                     <span>Empty</span>
//                 </div>
//             </div>
//         `);
//         $('#usercart-counter').text("0");
//     }
//     console.log(usercartdata);
    
// }
// function fillProfile(){
    
//     let options = {
//         COMPANY_NAME: "",
//         CONFIRMED: "",
//         EMAIL: "",
//         FIRSTNAME: "",
//         LASTNAME: "",
//         PASSWORD: "",
//         PHONE: ""
//     };
//     let gate = false;
//     const cbs =data=>{
//         console.log(data);    
//         if(data.response != "error"){
//             options.COMPANY_NAME = data.COMPANY_NAME;
//             options.CONFIRMED = data.CONFIRMED;
//             options.EMAIL = data.EMAIL;
//             options.FIRSTNAME = data.FIRSTNAME;
//             options.LASTNAME = data.LASTNAME;
//             options.PASSWORD = data.PASSWORD;
//             options.PHONE = data.PHONE;
//             __EMAIL = data.EMAIL;
//             gate = true;
//         }
//     };
//     const cbc =()=>{
//         if(gate){
//             $('#userprofile-user-con-firstname').val(options.FIRSTNAME);
//             $('#userprofile-user-con-lastname').val(options.LASTNAME);
//             $('#userprofile-user-con-email').val(options.EMAIL);
//             $('#userprofile-user-con-phone').val(options.PHONE);
//             $('#userprofile-user-con-companyname').val(options.COMPANY_NAME);

//             $('#profile-container-login').hide();
//             $('#profile-container-userprofile').css('display', 'flex').show();
//         }else{
//             $('#userprofile-user-con-firstname').val("");
//             $('#userprofile-user-con-lastname').val("");
//             $('#userprofile-user-con-email').val("");
//             $('#userprofile-user-con-companyname').val("");

//             $('#profile-container-login').css('display', 'flex').show();
//             $('#profile-container-userprofile').hide();
//         }
//     };
//     api_checkIfLoggedIn(cbs, cbc);
// }
// function fillLicense(){
//     const obj = Plans.fetchStaticLicense();
//     console.log(obj);
//     $('#plans-content-widget-con').empty();
//     $.each(obj, function(key, value){
//         const licdata = Plans.licenseToData(value.id);
//         let conhtml = ``;
//         $.each(value.content, function(key, val){
//             conhtml += `
//             <div class="specs">
//                 <i class="fas fa-check"></i>
//                 <span>${val}</span>
//             </div>
//             `;
//         });
//         let html = `
//         <div class="plans-content-widget">
//             <div class="top awesomebg">
//                 <span class="title">${licdata.modulename}</span>
//                 <span class="duration">${licdata.duration}</span>
//             </div>
//             <span class="price">${value.price == 0 ? "FREE" : "$" + value.price}<span class="currency"> ${value.price == 0 ? "Trial" : "CAD"}</span> </span>
//             ${conhtml}
//             <div class="footer">
//                 <button lid="${value.id}" class="default-button plans-content-widget-submit"><i class="fas fa-shopping-bag"></i>BUY NOW</button>
//                 <span class="bottom">Instant Activation<br>One Time Payment</span>
//             </div>
//         </div>
//         `

//         $('#plans-content-widget-con').append(html);
//     });
// }

function loggedincallback(){
    ACCUSER.fill();
}

$(document).ready(function(){
    // $('body').addClass('noscroll');
    Plans = new License();
   
    api_checkIfLoggedIn()
    .then(data=>{
        console.log(data);
        if(data.response != "error"){
            data.callback = loggedincallback;
            __EMAIL = data.EMAIL;
            ACCUSER = new User(data);
            setActiveNavigation();
        }else{
            
        }
    })
    .catch(err=>{
        console.log(err);
        console.log("Not Logged In..");
        // const data = {};
        // data.callback = loggedincallback;
        ACCUSER = new User({});
        ACCUSER.fillProfile();
        setActiveNavigation();
    });

    
    setInterval(() => {
        // $('#userprofile-envelope-chatbox').empty();
        const cbs =data=>{
            console.log(data);
            if(data.response != "error"){
                console.log('Fetching Message from Database.');
                const cbs =data=>{
                    // console.log(data);
                    setCookie("usermessage", JSON.stringify(data), 1);
                    if(data.response != "error"){
                        appendMessageToChatbox(data);
                    }  
                };
                const cbc =()=>{
                    scrollToBottom("userprofile-envelope-chatbox");
                };
                api_fetchMessage(cbs, cbc);
            }
        };
        const cbc =()=>{
            
        };
        // api_checkIfLoggedIn(cbs, cbc);
    }, 30000);
    

    // $('.company-widget').draggable();
});


