const MAIN_COLOR = '#bb8b12';
const SUB_COLOR = 'goldenrod';
const BTN_COLOR = '#e8b73d';

// const MAIN_COLOR = '#718e89';
// const SUB_COLOR = '#667f7b';
// const BTN_COLOR = '#5b716d';

// const MAIN_COLOR = '#476684';
// const SUB_COLOR = '#597FA5';
// const BTN_COLOR = '#2866A3';


const FONT_COLOR = 'white';
const TITLE_COLOR = SUB_COLOR;

// const ORANGE_PALETTE = '#CF842F';
// const GREEN_PALETTE = '#2FCF34';
// const RED_PALETTE = '#CF342F';
// const YELLOW_PALETTE = '#CACF2F';
// const PURPLE_PALETTE = '#842FCF';
// const BLUE_PALETTE = '#3FBFBF';

const ORANGE_PALETTE = '#A57F59';
const GREEN_PALETTE = '#7FA559';
const RED_PALETTE = '#B24C4C';
const YELLOW_PALETTE = '#B2B24C';
const PURPLE_PALETTE = '#5959A5';
const BLUE_PALETTE = '#59A5A5';

// const DRAFT_COLOR = '#7E7B7C';
// const PROOFREAD_COLOR = '#3DBC52';
// const REVIEW_COLOR = '#3DA7BC';
// const APPROVE_COLOR = '#992AD4';
// const POSTAPPROVE_COLOR = '#E5A119';
// const EXECUTION_COLOR = '#E519C6';

const DRAFT_COLOR = '#A0B14D';
const PROOFREAD_COLOR = '#4DB190';
const REVIEW_COLOR = '#4DA0B1';
const APPROVE_COLOR = '#904DB1';
const POSTAPPROVE_COLOR = '#B1904D';
const EXECUTION_COLOR = '#B14D6E';


const draftList = $('.color-draft');
const proofreadList = $('.color-proofread');
const reviewList = $('.color-review');
const approveList = $('.color-approve');
const postapproveList = $('.color-postapprove');
const executionList = $('.color-execution');

const fontdraftList = $('.font-color-draft');
const fontproofreadList = $('.font-color-proofread');
const fontreviewList = $('.font-color-review');
const fontapproveList = $('.font-color-approve');

const orangeList = $('.color-orange');
const greenList = $('.color-green');
const redList = $('.color-red');
const yellowList = $('.color-yellow');
const purpleList = $('.color-purple');
const blueList = $('.color-blue');

const fontorangeList = $('.font-color-orange');
const fontgreenList = $('.font-color-green');
const fontredList = $('.font-color-red');
const fontyellowList = $('.font-color-yellow');
const fontpurpleList = $('.font-color-purple');

const MCList = [
    $('.loginbox'),
    $('#nav'),
    $('#header'),
    $('.color-main')
];
const SCList = [
    $('.test'),
    $('.color-sc')
];
const FontList = [
    $('h1'),
    $('h2'),
    $('h3'),
    $('h4'),
    $('.color-font')
];
const BTNList = [
    $('.nav-widget'),
    $('.nav-mininav-con-widget'),
    $('.suadmin-emailList-list-widget'),
    $('.btn-shadow')
    // $('.suuser-sc')
];
const TitleList = [
    $('.color-title')
];

function paintMainColor(list){
    for(i=0; i < list.length; i++){
        list[i].css('background-color', MAIN_COLOR);
    }
}
function paintSubColor(list){
    for(i=0; i < list.length; i++){
        list[i].css('background-color', SUB_COLOR);
    }
}
function paintTitleColor(list){
    for(i=0; i < list.length; i++){
        list[i].css('color', TITLE_COLOR);
    }
}
function paintFontColor(list){
    for(i=0; i < list.length; i++){
        list[i].css('color', FONT_COLOR);
    }
}
function paintBtnColor(list){
    for(i=0; i < list.length; i++){
        list[i].css('background-color', BTN_COLOR);
        list[i].css('color', FONT_COLOR);
    }
}

function recolor(){
    paintMainColor(MCList);
    paintFontColor(FontList);
    paintBtnColor(BTNList);
    paintSubColor(SCList);
    // console.log('recolor');
    orangeList.css('background-color', ORANGE_PALETTE);
    greenList.css('background-color', GREEN_PALETTE);
    redList.css('background-color', RED_PALETTE);
    yellowList.css('background-color', YELLOW_PALETTE);
    purpleList.css('background-color', PURPLE_PALETTE);
    blueList.css('background-color', BLUE_PALETTE);

    fontorangeList.css('color', ORANGE_PALETTE);
    fontgreenList.css('color', GREEN_PALETTE);
    fontredList.css('color', RED_PALETTE);
    fontyellowList.css('color', YELLOW_PALETTE);
    fontpurpleList.css('color', PURPLE_PALETTE);

    draftList.css('background-color', DRAFT_COLOR);
    proofreadList.css('background-color', PROOFREAD_COLOR);
    reviewList.css('background-color', REVIEW_COLOR);
    approveList.css('background-color', APPROVE_COLOR);
    postapproveList.css('background-color', POSTAPPROVE_COLOR);
    executionList.css('background-color', EXECUTION_COLOR);

    fontdraftList.css('color', DRAFT_COLOR);
    fontproofreadList.css('color', PROOFREAD_COLOR);
    fontreviewList.css('color', REVIEW_COLOR);
    fontapproveList.css('color', APPROVE_COLOR);

    
    paintTitleColor(TitleList);
}
$(document).ready(function(){
    recolor();
    
    // document.documentElement.style.setProperty("--SUB_COLOR", "green");

    // console.log(document.styleSheets);
});

// $(document).ready(function(){
//     console.log('test');
    
// });