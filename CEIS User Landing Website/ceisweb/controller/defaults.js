const domain = 'http://localhost:8080/ceisweb/';
const motherdomain = 'http://localhost:8080/stepwell/';
let ACCUSER;
let __EMAIL = '';
let Plans;

// const domain = 'http://localhost:8080/stepwell/';
let toastTimeout;

function setCookie(name,value,days){
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function rngPassword(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
function rng09(){
    return Math.floor((Math.random() * 9) + 0);
}
function rngCode(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
function rngDatabaseId(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 8; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
function rngMainBillId(){
    return 'BIL-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngBillId(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
function rngCompanyId(){
    return 'C-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngMessageId(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
function scrollToBottom(id) {
    var div = document.getElementById(id);
    $('#' + id).animate({
       scrollTop: div.scrollHeight - div.clientHeight
    }, 500);
 }
function validateEmail(email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if( !emailReg.test( email ) ) {
        return false;
    } else {
        return true;
    }
}
function sendConfirmationEmail(options, callback){
    console.log("Sending Email");
    let toemail = '';
    let tx = 0;
    $.each(options.toemail, function(key, value){
        toemail += `${value}${tx == 0 ? "" : ","}`;
        tx++;
    });
    const ggdomain = `http://localhost:8080/ceisweb/`;
    const htmlBody = `
    <div style="width: 800px;
    height: auto;
    padding: 20px;
    display: block;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">

       <span class="subject" style="
        display: inline-block;
        font-size: 1.5em;
        font-weight: bold;
        background-color: #282828;
        color: white;
        width: 100%;
        padding: 10px 0px;
        text-align: center;
        margin-bottom: 20px;">WE HAVE RECEIVED YOUR REGISTRATION</span>
        <br>
        <br>
    
        <span class="text" style="
        display: inline-block;
        width: calc(100% - 40px);
        padding: 10px 20px;
        letter-spacing: 2px;
        line-height: 1.5em;
        font-size: 1.2em;">
           Thank you ${options.firstname} ${options.lastname} for registering with us! You're a few steps away from claiming a <b>Free 3 Month</b> experience with our latest Technology!
        </span>

        <span class="text" style="
        display: inline-block;
        width: calc(100% - 40px);
        padding: 10px 20px;
        letter-spacing: 2px;
        line-height: 1.5em;
        font-size: 1.2em;">
           To verify your Account, Please click on the button below!
        </span>
		
		<a style="
        display: inline-block;
        padding: 15px 50px;
        letter-spacing: 3px;
        line-height: 1.3em;
        font-size: 1.2em;
        font-weight: bold;
        background-color: #282828;
        color: whitesmoke;
        text-decoration: none;
        margin-top: 20px;"
        href="${domain}api/api_confirm.php?email=${options.email}&code=${options.code}" target="_blank">Verify Your Account</a>

		<br><br>

        <span class="text" style="
        display: inline-block;
        width: calc(100% - 40px);
        padding: 10px 20px;
        letter-spacing: 2px;
        line-height: 1.5em;
        font-size: 1.2em;">
           If the above button doesn't work, Please click this link or copy and paste it on to your browser <a target="_blank" href="${domain}api/api_confirm.php?email=${options.email}&code=${options.code}">${domain}api/api_confirm.php?email=${options.email}&code=${options.code}<a>
        </span>

        

        <br><br>

        
		<span class="text" style="
        display: inline-block;
        width: calc(100% - 40px);
        padding: 10px 20px;
        letter-spacing: 2px;
        line-height: 1.5em;
        font-size: 1.2em;">
           Thank you for your Patience! Once logged in, you may purchase the <b>3 Month subscription</b> for <b>FREE!</b> 
        </span>
		
		<a style="
        display: inline-block;
        padding: 15px 50px;
        letter-spacing: 3px;
        line-height: 1.3em;
        font-size: 1.2em;
        font-weight: bold;
        background-color: #282828;
        color: whitesmoke;
        text-decoration: none;
        margin-top: 20px;"
        href="${domain}" target="_blank">Get the Experience Now!</a>
    
        <br>
        <br>
        <br>
        <br>
        
        <table>
            <tbody>
                <tr>

                <td rowspan="5"><img src="${ggdomain}lib/images/companylogo.png" alt="" style="width: 250px;
                    height: 150px;
                    object-fit: contain;">
                    </td>
                    <td><img src="${ggdomain}lib/images/mobileemail/home.png" alt="" style="display: block; height: 20px; width: 20px; object-fit: contain; "></td>
                    <td><span style="font-size: 1em;">6115 Shawson Drive; Mississauga ON L5T 1E4; Canada</span></td>
                </tr>
                <tr>
                <td><img src="${ggdomain}lib/images/mobileemail/phonetoll.png" alt="" style="display: block; height: 20px; width: 20px; object-fit: contain; "></td>
                <td><span style="font-size: 1em;">877.896.9292 Toll Free</span></td>
                </tr>
                <tr>
                <td><img src="${ggdomain}lib/images/mobileemail/phoneintl.png" alt="" style="display: block; height: 20px; width: 20px; object-fit: contain; "></td>
                <td><span style="font-size: 1em;">905.696.9292</span></td>
                </tr>
                <tr>
                <td><img src="${ggdomain}lib/images/mobileemail/email.png" alt="" style="display: block; height: 20px; width: 20px; object-fit: contain; "></td>
                <td><span style="font-size: 1em;">info@ceisweb.ca</span></td>
                </tr>
                <tr>
                <td><img src="${ggdomain}lib/images/mobileemail/website.png" alt="" style="display: block; height: 20px; width: 20px; object-fit: contain; "></td>
                <td><a href="${ggdomain}">${ggdomain}</a></td>
                </tr>
            </tbody>
        </table>
    </div>`;
	Email.send({
	Host: "smtp.gmail.com",
	Username : "sampleaccout7@gmail.com",
	Password : "samplepassword",
    To : toemail,
    // Cc: options.cc != null && options.cc != undefined ? options.cc : "",
	From : "info@ceisweb.ca",
	Subject : "REGISTRATION CONFIRMATION EMAIL",
    Body : htmlBody,
	}).then(function(message){
        console.log("MESSAGE", message)
        callback();
    });
}
function blink(sel, color1, color2){
    sel.stop( true, true).animate({ "border-color": color1 }, 100).animate({ "border-color": color2 }, 130).animate({ "border-color": color1 }, 100).animate({ "border-color": color2 }, 130);
}
function blinkbg(sel, color1, color2){
    sel.stop( true, true).animate({ "background-color": color1 }, 100).animate({ "background-color": color2 }, 130).animate({ "background-color": color1 }, 100).animate({ "background-color": color2 }, 130);
}
function flash(sel){
    // console.log('flash');
    sel.stop( true, true).css('opcity', '0').animate({opacity: 1}, 1000).animate({opacity: 0}, 1000);
}
function showLoadingReport(message){
    $('#report span').text(message);
    $('#report').css('display','flex').show();
}
function hideLoadingReport(){
    $('#report').css('display','none').hide();
}
function showNotification(title, message){
    $('#notification span').text(message).css('display', 'none');
    $('#notification h2').text(title).css('display', 'none');
    $('#notification').css({'opacity' : '1', 'width' : '0px', 'display' : 'flex'}).animate({'width' : '25vw'}, 800, function(){
        // $('#notification-close').css({'opacity' : '0', 'display' : 'flex'}).animate({'opacity' : '1'}, 500);
        $('#notification span, #notification h2, #notification-close').css({'opacity' : '0', 'display' : 'flex'}).animate({'opacity' : '1'}, 500);
    });
    setTimeout(function(){
        hideNotification();
    }, 3000);
}
function hideNotification(){
    // console.log('running animations');
    $('#notification span, #notification h2').animate({'opacity' : '0'}, 400, function(){
        $('#notification').css('height', '90px').animate({'width' : '1px'}, 600, function(){
            $('#notification').animate({'opacity' : '0'}, 200, function(){
                $('#notification-close').css({'opacity' : '0', 'display' : 'none'});
                $('#notification').css('display', 'none');
            });
        });
    });
}
function showAction(title, callbacktrue, callbackfalse){
    $('#action-title').text(title);
    $('#action').show().css('display', 'flex');
    $('#action-select-yes').off();
    $('#action-select-no').off();
    $('#action-select-yes').click(function(){
        callbacktrue();
        $('#action').hide();
    });
    $('#action-select-no').click(function(){
        callbackfalse();
        $('#action').hide();
    });
}
function showToast(message){
    // console.log(message);
    clearTimeout(toastTimeout);
    $('#toast').children('span').text(message);
    $('#toast').stop(true, true).css({'opacity' : '0', "bottom" : "0px", "display" : "flex"}).animate({"opacity" : "1", "bottom" : "20px"}, 500, function(){
        toastTimeout = setTimeout(() => {
            $('#toast').stop(true, true).animate({"opacity" : "0", "bottom" : "0px"}, 500, function(){
                $('#toast').css({"display" : "none"}).hide();
            });
        }, 5000);
    });
}
$('#toast').children('span').click(function(){
    $('#toast').stop(true, true).animate({"opacity" : "0", "bottom" : "0px"}, 500, function(){
        $('#toast').css({"display" : "none"}).hide();
    });
});


$('#notification-close').click(function(){
    hideNotification();
});


