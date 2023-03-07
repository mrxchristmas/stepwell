// const domain = 'http://localhost:8080/essweb/';
// const domain = 'http://localhost:8080/internationalweb/';
// const domain = 'https://www.esscorp.ca/';
const domain = 'http://ess.prodocuflow.com/';

let ACCUSER;

// const MAIN_COLOR = '#3b5998';
// const SUB_COLOR = '#3E69C0';
// const BTN_COLOR = '#5294e2';

const MAIN_COLOR = '#282828';
const SUB_COLOR = '#424242';
const BTN_COLOR = 'goldenrod';

const FONT_COLOR = 'white';
// const TITLE_COLOR = SUB_COLOR;
const TITLE_COLOR = 'goldenrod';

const ORANGE_PALETTE = '#A57F59';
const GREEN_PALETTE = '#7FA559';
const RED_PALETTE = '#B24C4C';
const YELLOW_PALETTE = '#B2B24C';
const PURPLE_PALETTE = '#5959A5';
const BLUE_PALETTE = '#59A5A5';

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function rng09(){
    return Math.floor((Math.random() * 9) + 0);
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

$(document).on('mousedown', function(){
    $('img').prop("draggable", false);
});


function flashToast(message){
    $('#toast').children('span').text(message);
    $('#toast').css({'display' :'flex', "opacity" : "0"}).stop(true, true).animate({"opacity" : '1'}, 500, function(){
        setTimeout(() => {
            hideToast();
        }, 3000);
    });
}
function showToast(message){
    $('#toast').children('span').text(message);
    $('#toast').css({'display' :'flex', "opacity" : "0"}).stop(true, true).animate({"opacity" : '1'}, 500);
}
function hideToast(){
    $('#toast').stop(true, true).animate({"opacity" : '0'}, 500, function(){
        $('#toast').css('display' , 'none');
    });
}
$('#toast').children('span').click(function(){
    hideToast();
});