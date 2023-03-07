// $(document).ready(function(){
//     if( /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
//         mobilenav();
//         mobileHeader();
//     }
// });

function init(){
    
    // if( /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    //     console.log('mobile init');
    //     // mobilenav();
    //     // mobileHeader();
    // }else{
    //     console.log('desktop init');
        
    // }
    
   
}


$(document).ready(function(){
    // if( /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    //     // ACCUSER = new User(accusercb);
    // }else{
    //     console.log('desktop init');
    // }
});


function mobilenav(){
    const dfrd = $.Deferred();
    console.log('Mobile Navigation');
    $('#navbar').css('display', 'none').hide();
    // $('#mobinavtab').css('display', 'flex').show();
    $('#burger-container').css('display', 'block').show();

    fillMobileNavigation();
    dfrd.resolve();
    
    $('#burger-container').click(function(){
        $('#burger-container').toggleClass('open');
        if($('#burger-container').hasClass('open')){
            $('#mobinavtab').css('display','flex').animate({"opacity" : "1"}, 400);
            
        }else{
            $('#mobinavtab').animate({"opacity" : "0"}, 400, function(){
                $(this).css('display','none');
            });
        }
        
    });
    return dfrd.promise();
}
function fillMobileNavigation(){
    $('#mobinavtab').empty();
    let html = '';
    $.each(ACCUSER.Navbar, function(key, value){
        
        function findRightPanel(pid){
            let ret = null;
            if(value.rightpanel != "undefined"){
                $.each(value.rightpanel, function(key, rvalue){
                    if(rvalue.pid == pid){
                        ret = rvalue.content;
                    }
                });
            }
            return ret;
        }

        if(value.leftpanel != "undefined"){
            html += `<div class="tlink">
            <span class="title mobinavtab-tlink-h">${value.name}<i class="fas fa-caret-right"></i></span>`;

            $.each(value.leftpanel, function(key, value1){
                const rpanel = findRightPanel(value1.pid);
                if(rpanel != null){
                    html += `<div class="slink hidden">
                    <span class="title mobinavtab-slink-h">${value1.name}<i class="fas fa-caret-right"></i></span>
                    <div class="mlink hidden">
                    `;
                    $.each(rpanel, function(key, value2){
                        html += `<span link="${value2.link}" class="title mobile navbar-popup-widget-c">${value2.name}</span>`;
                    });
                    html += '</div></div>';
                }else{
                    html += `<div class="slink hidden">
                    <span link="${value1.link}" class="title mobinavtab-slink-h mobile navbar-popup-widget-c">${value1.name}</i></span></div>
                    `;
                }

            });

            html += '</div>';
        }else{
            html += `<div class="tlink">
            <span link="${value.link}" class="title mobinavtab-tlink-h mobile navbar-popup-widget-c">${value.name}</span></div>`;
        }
        
    });
    $('#mobinavtab').append(html);
}
function mobileMininav(){
    const dfrd = $.Deferred();

    
    $('#multipage-mininav').prepend(`
        <i id="multipage-mininav-mobile-x" class="fas fa-times"></i>
    `).addClass('hidden');
    $('#multipage').children('.multipage-header').prepend(`
        <i id="multipage-mininav-mobile-h" class="fas fa-bars closed"></i>
    `);

    dfrd.resolve();

    $(document).on('click', '#multipage-mininav-mobile-h', function(){
        console.log('test');
        $('#multipage-mininav').toggleClass('hidden');
    });
    $(document).on('click', '#multipage-mininav-mobile-x', function(){
        console.log('test');
        $('#multipage-mininav').toggleClass('hidden');
    });

    return dfrd.promise();
}

function mobileHeader(){
    console.log('Mobile Header');
    const header = $('#header');
    // header.children('.textarea').empty().append(`
    //     <span class="mtitle">ENGINEERING & INNOVATION BEYOND EXPECTATION</span>
    //     <span class="msubtitle">Engineered System & Specialties</span>
    // `);

}


$(document).on('click', '.mobinavtab-tlink-h', function(){
    const status = $(this).attr('status');
    if(status == 'open'){
        $(this).attr('status', 'closed');
        $(this).siblings('.slink').css('display', 'none').hide();
        $(this).children('i').removeClass('fa-caret-down').addClass('fa-caret-right');
    }else{
        $(this).attr('status', 'open');
        $(this).siblings('.slink').css('display', 'flex').show();
        $(this).children('i').removeClass('fa-caret-right').addClass('fa-caret-down');
    }
});
$(document).on('click', '.mobinavtab-slink-h', function(){
    const status = $(this).attr('status');
    if(status == 'open'){
        $(this).attr('status', 'closed');
        $(this).siblings('.mlink').css('display', 'none').hide();
        $(this).children('i').removeClass('fa-caret-down').addClass('fa-caret-right');
    }else{
        $(this).attr('status', 'open');
        $(this).siblings('.mlink').css('display', 'flex').show();
        $(this).children('i').removeClass('fa-caret-right').addClass('fa-caret-down');
    }
});
$(document).on('click', '.navbar-popup-widget-c', function(){

    if($(this).hasClass('mobile')){
        const dfd = $.Deferred();
        dfd
        .done( $('#burger-container').toggleClass('open'),  $('#mobinavtab').animate({"opacity" : "0"}, 400, function(){$(this).css('display','none');}) )
        .done(function( n ) {
            console.log(n);
        });
    }

    // $('#burger-container').toggleClass('open');
    // $('#mobinavtab').animate({"opacity" : "0"}, 400, function(){$(this).css('display','none');});
    
});


