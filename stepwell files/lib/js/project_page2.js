let curAc;

$('.pp2-icontext').click(function(){
    // $(this).parent('.pp2-widget-content-sub').siblings('.pp2-widget-content').toggle();
    // $('#' + $(this).attr('name')).show();
    let nn = $(this).attr('name').split('-');
    let aa = $(this).attr('name');
    let bb = '#' + $(this).attr('name');

    if(nn[2] == 'upload' || nn[2] == 'link' || nn[2] == 'certificate'){
        $('#' + curAc).hide();
        $(this).parent('.pp2-sameline').parent('.pp2-widget-content-sub').parent('.pp2-widget-content').parent('.pp2-widget-con').animate({'min-height': '310px'}, 500, function(){
            curAc = aa;
            $(bb).css('display', 'flex');
        });
    }else if(nn[2] == 'notes'){
        $('#' + curAc).hide();
        $(this).parent('.pp2-sameline').parent('.pp2-widget-content-sub').parent('.pp2-widget-content').parent('.pp2-widget-con').animate({'min-height': '420px'}, 500, function(){
            curAc = aa;
            $(bb).css('display', 'flex');
        });
    }
    
});

$('.pp2-zicontext').click(function(){
    let status = $(this).parent('.pp2-sameline').siblings('.pp2-widget-gate').attr('status');
    // console.log(status);
    if(status == 'unlocked'){
        let nn = $(this).attr('name').split('-');
        // console.log($(this).attr('name'));
        let zz = '#' + $(this).attr('name');
        if(nn[0] == 'na'){
            // console.log(nn[1] + '-' + nn[2]);
            $('#' + nn[1] + '-' + nn[2]).toggleClass('pp2-hidden');
            $(this).parent('.pp2-sameline').parent('.pp2-widget-con').animate({'min-height': '130px'}, 500);
            $(this).parent('.pp2-sameline').siblings('.pp2-widget-content').css('display','none');
        }else{
            // console.log(nn[1] + '-' + nn[2]);
            if(nn[1] == "16_3"){
                $('#ac-16_2').css('display','none');
            }else if(nn[1] == "16_2"){
                $('#ac-16_3').css('display','none');
            }
            $('.pp2-sameline-r').css('display','none');
            $(this).parent('.pp2-sameline').parent('.pp2-widget-con').animate({'min-height': '230px'}, 500, function(){
                $(zz).css({'opacity': '0', 'display' : 'flex'}).animate({'opacity' : '1'}, 200).parent('.pp2-widget-content').css('display','flex');
            });
        }
        $(this).css('transform', 'scale(1.5)');
        $(this).siblings('.pp2-zicontext').css('transform', 'scale(1)');

    }else{
        $(this).parent('.pp2-sameline').siblings('.pp2-widget-gate').animate({'color': 'white'}, 100).animate({'color': GREEN_PALETTE}, 100).animate({'color': 'white'}, 100).animate({'color': GREEN_PALETTE}, 100);
    }
});

$('.pp2-widget-gate').click(function(){
    let s = $(this).attr('status');
    let id = $(this).attr('zid');
    if($(this).attr('status') == 'unlocked'){
        $(this).removeClass('fa-unlock').addClass('fa-lock').css('color', GREEN_PALETTE).attr('status','locked');
        $(this).siblings('.pp2-widget-content').css('display', 'none');
        $(this).parent('.pp2-widget-con').animate({'min-height': '130px'}, 500);
        // console.log('Locked: ',s, id);
        const uid = 'pi_' + id + '_lock';
        $(this).siblings('.pp2-sameline').children('.pp2-zicontext').css({"cursor":"not-allowed", "pointer-events":"none"});
        api_updateProjectInfo(projectid, uid, 'lock');
    }else{
        $(this).removeClass('fa-lock').addClass('fa-unlock').css('color', 'grey').attr('status','unlocked');
        // console.log('Unlocked: ', s, id);
        const uid = 'pi_' + id + '_lock';
        $(this).siblings('.pp2-sameline').children('.pp2-zicontext').css({"pointer-events":"auto", 'cursor':'pointer'});
        api_updateProjectInfo(projectid, uid, 'unlock');
    }
});

function browse(e){
    $(document).off('change', '#' + e); 
    $(document).on('change','#' + e, function(){
        let filename = $(this).val().split('\\').pop();
        if(filename){
            let n = $(this).attr('name');
            let nn = n.split('-').pop();
            let uid = 'pi_' + nn + '_upload';
            // console.log('#'+ $(this).attr('name') +'-upload');
            let t = '';
    
            const cb = ret => {
                // console.log(ret);
                const rr = ret.split('++');
                // console.log(rr[1]); //rr[1] is the location of the file. lib/documents/projectinfo/docname
                const r = rr[1].split('/').pop();
                t = rr[1];
                // console.log(r);
                $('#'+ $(this).attr('name') +'-upload').children('input').val(r);
                // console.log(projectid, uid, t);
                api_updateProjectInfo(projectid, uid, t);
            };
    
            const cbcomplete = () => {};
            const cbbfore = () => {};
    
            api_fetchProjectInfoColumn(projectid, uid, 'browse', cbbfore, cbcomplete);
            ajax_saveSingleDocument($('#' + e), cb);

            $(this).siblings('#ac-' + nn + '-upload').children('a').remove();
            $(this).siblings('#ac-' + nn + '-upload').append(`<a href="${t}" download>Download</a>`);
        }else{
            console.log('cancelled');
        }

    });
    
    $('#' + e).off();
}

$('.pp2-input-save').blur(function(){
    const parent = $(this).parent('.pp2-sameline-r');
    const parentid = parent.attr('id').split('-');;
    let uid = parentid[1];

    if(uid == '16_2' || uid == '16_3'){
        uid = '16_1';
    }

    const columnname = 'pi_' + uid;
    let zcolumnname = '';
    let gate = false;
    if(parentid[2] == 'certificate'){
        zcolumnname = columnname + '_report';
        gate = true;
    }else if(parentid[2] == 'link'){
        zcolumnname = columnname + '_link';
        gate = true;
    }else if(parentid[2] == 'notes'){
        zcolumnname = columnname + '_note';
        gate = true;
    }else if(parentid[2] == 'upload'){
        zcolumnname = columnname + '_upload';
        gate = false;
        // break;
    }

    const v = $(this).val();
    // console.log(v);

    if(gate){
        api_updateProjectInfo(projectid, zcolumnname, v);
    }
    
});
$('.pp2-zicontext').click(function(){
    let t = $(this).text();
    const n = $(this).attr('name');
    const nn = n.split('-');
    let uid = '';
    if(nn.length == 2){
        // console.log(nn[1]);
        uid = nn[1];
    }else if(nn.length == 3){
        // console.log(nn[2]);
        uid = nn[2];
    }

    if(uid == '16_2' || uid == '16_3'){
        uid = '16_1';
    }

    const uuid = 'pi_' + uid;


    // console.log(projectid, uuid, t);
    api_updateProjectInfo(projectid, uuid, t);
});

$('#project-launch2-btn-close').click(function(){
    $('.projects-prefs-con').hide();
    $('.project-preferences-con').show();
});
$('#project-launch2-btn-back').click(function(){
    $('#project-launch2-con').hide();
    $('#project-launch1-con').show();
});