$('.nav-widget').mouseenter(function(){
    $(this).css('background-color', SUB_COLOR);
    $(this).children('.nav-widget-icon').toggleClass('scale');
});
$('.nav-widget').mouseleave(function(){
    $(this).css('background-color', BTN_COLOR);
    $(this).children('.nav-widget-icon').toggleClass('scale');
});

//navigation functions
let navList = [
    $('#home'),
    $('.suadmin-con')
];
function hideAllNav(list){
    for(i=0; i < list.length; i++){
        list[i].hide();
        // console.log(list[i]);
    }
}

$('#nav-suadmin').click(function(){
    hideAllNav(navList);
    $('.suadmin-con').show();
});


$(document).ready(function(){
    console.log('test');
    hideAllNav(navList);
    $('.suadmin-con').show();
});