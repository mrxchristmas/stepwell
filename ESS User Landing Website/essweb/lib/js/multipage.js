$(document).ready(function(){
    
});


function findNavidByLink(link){
    let ret = '';
    const data = ACCUSER.Mininav;
    $.each(data, function(key, value){
        let navid = value.navid;
        function findLink(obj, link) {
            for ([k, v] of Object.entries(obj)){
                if (k == "link" && v == link) return v
                if (typeof v == 'object' &&  v !== null ){
                    let found = findLink(v, link)
                    if (found) return found
                }
            }
        }
        $.each(value, function(key, value){
            let x = findLink(value, link);
            if(x){
                ret = navid;
            };
        });
    });
    return ret;
}
function fillMiniNav(link){
    $('.multipage-mininav').children('.multipage-mininav-widget').remove();
    const navid = findNavidByLink(link);
    const navobj = ACCUSER.findMininavByNavid(navid);

    // console.log('navobj', navobj);

    if(navobj != undefined){
        $.each(navobj.data, function(key, value1){
            // console.log('BBBBBBBBBBBBBBBBBBBB',value1);
            let html = '<div class="multipage-mininav-widget idle">';
                
                html += `<span id="multipage-mininav-widget_${value1.link}" status="idle" link="${value1.link}" class="multipage-mininav-widget-maintitle multipage-mininav-handle maintitle">${value1.maintitle}<i class="fas fa-caret-right"></i></span>
                <div class="subtitle-con hidden">`;
                $.each(value1.subtitle, function(key, value2){
                    // console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCC',value2);
                    html += `<div class="subtitle">
                    <span id="multipage-mininav-widget_${value2.link}" status="idle" link="${value2.link}" class="title multipage-mininav-widget-subtitle multipage-mininav-handle">${value2.name}<i class="fas fa-caret-right"></i></span>
                    <div class="ktitle-con hidden">`;
                    $.each(value2.data, function(key, value3){
                        // console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',value3);
                        html += `<span status="idle" id="multipage-mininav-widget_${value3.link}" link="${value3.link}" class="ktitle multipage-mininav-widget-ktitle multipage-mininav-handle">${value3.name}</span>`;
                    });
                    html += `</div></div>`;
                });
                html += `</div>`;
            html += `</div>`;
            // console.log(html);
            $('.multipage-mininav').append(html);
        });
    }

}
function showMultipage(link){
    let gate = false;
    // let obj = undefined;
    let html = '';
    $('#multipage').children('.multipage-content').remove();

    const obj = ACCUSER.findMultipageObjByLink(link);

    if(obj != undefined){
        html += '<div class="multipage-content">';
        $('.multipage-header').children('.title').text(obj.content.title);
        $('.multipage-header').children('.subtitle').text(obj.content.subtitle);
        // console.log(obj);
        $.each(obj.content.data, function(key, value){
            // console.log(value);
            const zhtml = htmlValue(value);
            html += zhtml;
            
        });
        html += '</div>';
    }else{
        $('.multipage-header').children('.title').text('THIS PAGE');
        $('.multipage-header').children('.subtitle').text('IS NOT FOUND');
        html += `
        <div class="multipage-content">
            <span class="title">THE PAGE YOU ARE LOOKING FOR IS NOT HERE</span>
            <span class="text">Please Contact your Administrator if you think this is an error.</span>
        </div>`;
    }
    // console.log(html);
    $('#multipage').append(html);

}
function resetMininavStitle(){
    

}



$(document).on('click', '.multipage-mininav-widget-maintitle', function(){
    const status = $(this).attr('status');
    $('.multipage-mininav-widget-maintitle').each(function(){
        $(this).attr('status', 'idle');
        $(this).children('i').removeClass('fa-caret-down').addClass('fa-caret-right');
        $(this).parent('.multipage-mininav-widget').removeClass('active').addClass('idle');
        $(this).siblings('.subtitle-con').css('display', "none").hide();
    });
    $('.multipage-mininav-widget-subtitle').each(function(){
        $(this).attr('status', 'idle').css({
            "border-radius" : "10px",
            "background-color" : "transparent"
        });
        $(this).children('i').removeClass('fa-caret-right').addClass('fa-caret-right');
        $(this).siblings('.ktitle-con').css('display', "none").hide();
    });
    $('.multipage-mininav-widget-ktitle').each(function(){
        $(this).attr('status', 'idle').css({
            "letter-spacing" : "2px",
            "font-weight" : "initial"
        });
    });

    if(status == "idle"){
        $(this).children('i').removeClass('fa-caret-right').addClass('fa-caret-down');
        $(this).siblings('.subtitle-con').css('display', 'flex').show();
        $(this).parent('.multipage-mininav-widget').removeClass('idle').addClass('active');
        $(this).attr('status', 'active');
    }else{
        $(this).children('i').removeClass('fa-caret-down').addClass('fa-caret-right');
        $(this).siblings('.subtitle-con').css('display', 'none').hide();
        $(this).parent('.multipage-mininav-widget').removeClass('active').addClass('idle');
        $(this).attr('status', 'idle');
    }
});

$(document).on('click', '.multipage-mininav-widget-subtitle', function(){
    const status = $(this).attr('status');

    $('.multipage-mininav-widget-subtitle').each(function(){
        $(this).attr('status', 'idle').css({
            "border-radius" : "10px",
            "background-color" : "transparent"
        });
        $(this).children('i').removeClass('fa-caret-right').addClass('fa-caret-right');
        $(this).siblings('.ktitle-con').css('display', "none").hide();
    });
    $('.multipage-mininav-widget-ktitle').each(function(){
        $(this).attr('status', 'idle').css({
            "letter-spacing" : "2px",
            "font-weight" : "initial"
        });
    });
    
    if(status == "idle"){
        $(this).css({
            "border-radius" : "10px 10px 0px 0px",
            "background-color" : "rgba(0, 0, 0, 0.2)"
        });
        $(this).children('i').removeClass('fa-caret-right').addClass('fa-caret-down');
        $(this).siblings('.ktitle-con').css('display', 'flex').show();
        // $(this).parent('.multipage-mininav-widget').removeClass('idle').addClass('active');
        $(this).attr('status', 'active');
    }else{
        $(this).css({
            "border-radius" : "10px",
            "background-color" : "transparent"
        });
        $(this).children('i').removeClass('fa-caret-down').addClass('fa-caret-right');
        $(this).siblings('.ktitle-con').css('display', 'none').hide();
        // $(this).parent('.multipage-mininav-widget').removeClass('active').addClass('idle');
        $(this).attr('status', 'idle');
    }
});

$(document).on('click', '.multipage-mininav-widget-ktitle', function(){
    const status = $(this).attr('status');

    $('.multipage-mininav-widget-ktitle').each(function(){
        $(this).attr('status', 'idle').css({
            "letter-spacing" : "2px",
            "font-weight" : "initial"
        });
    });
    
    if(status == "idle"){
        $(this).css({
            "letter-spacing" : "2px2)",
            "font-weight" : "bold"
        });
        $(this).attr('status', 'active');
    }else{
        $(this).css({
            "letter-spacing" : "2px",
            "font-weight" : "initial"
        });
        $(this).attr('status', 'idle');
    }
});

$(document).on('click', '.multipage-mininav-handle', function(){
    const link = $(this).attr('link');
    showMultipage(link);
});


$(document).on('click', '.multipage-coll-content-h', function(){
    const status = $(this).attr('status');

    $('.multipage-coll-content-h').each(function(){
        $(this).siblings('.content').css('display', 'none').hide();
        $(this).children('i').removeClass('fa-caret-down').addClass('fa-caret-right');
        $(this).attr('status', 'closed');
    });
    $('.multipage-coll-content-hh').each(function(){
        $(this).siblings('.content').css('display', 'none').hide();
        $(this).children('i').removeClass('fa-caret-down').addClass('fa-caret-right');
        $(this).attr('status', 'closed');
    });

    console.log(status);
    if(status == 'closed'){
        $(this).siblings('.content').css('display', 'flex').show();
        $(this).children('i').removeClass('fa-caret-right').addClass('fa-caret-down');
        $(this).attr('status', 'open');
    }else{
        $(this).siblings('.content').css('display', 'none').hide();
        $(this).children('i').removeClass('fa-caret-down').addClass('fa-caret-right');
        $(this).attr('status', 'closed');
    }
    $(this).parent('.multipage-coll-content').get(0).scrollIntoView({ behavior: 'smooth' });
    
});
$(document).on('click', '.multipage-coll-content-hh', function(){
    const status = $(this).attr('status');

    $('.multipage-coll-content-hh').each(function(){
        $(this).siblings('.content').css('display', 'none').hide();
        $(this).children('i').removeClass('fa-caret-down').addClass('fa-caret-right');
        $(this).attr('status', 'closed');
    });

    console.log(status);
    if(status == 'closed'){
        $(this).siblings('.content').css('display', 'flex').show();
        $(this).children('i').removeClass('fa-caret-right').addClass('fa-caret-down');
        $(this).attr('status', 'open');
    }else{
        $(this).siblings('.content').css('display', 'none').hide();
        $(this).children('i').removeClass('fa-caret-down').addClass('fa-caret-right');
        $(this).attr('status', 'closed');
    }
    $(this).parent('.multipage-coll-content').get(0).scrollIntoView({ behavior: 'smooth' });
    
});

$(document).on('click', ".multipage-coll-content-scrollup", function() {
    
    $(this).parent('.content').parent('.multipage-coll-content').get(0).scrollIntoView({ behavior: 'smooth' });
});