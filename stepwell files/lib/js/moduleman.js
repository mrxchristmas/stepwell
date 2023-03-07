const dragoption = {
    //this drag option is where you can manipulate whatever you are dragging
    start: function(e, ui) {
        // this function fires when you start dragging

        const name = $(ui.helper).text(); // $(ui.helper) is the element that you are dragging 
        const uid = $(ui.helper).attr('ui'); // so you can use it like $(ui.helper).attr('id') to get its id
        let gate = true;
        let clone;

        // this piece of code colors the droppable part whenever you start to drag an item

        $('.moduleman-company-modules-widget-con').children('.moduleman-company-modules-widget').each(function(){
            if($(this).attr('ui') == uid){
                gate = false;
                clone = $(this);
            }
        });
        if(gate){
            // console.log('not there');
            $('.moduleman-company-modules').css('background-color', GREEN_PALETTE);
        }else{
            // console.log('already there');
            blinkbg(clone, RED_PALETTE, BTN_COLOR);
            $('.moduleman-company-modules').css('background-color', YELLOW_PALETTE);
        }


        // so here on start you can color your droppable div
    },
    drag: function() {
    //   this function fires after you drag and while dragging
    },
    stop: function() {
    // this function fires when you stop dragging or if you dropped it
        $('.moduleman-company-modules').css('background-color', SUB_COLOR);
    // and here in stop you can color your droppable div into its original state
    },

    //these are just additional options for the draggable
    opacity: 0.7, // opacity of the draggable
    helper: "clone", // will not drag the actual element. instead will send a clone
    containment: "#moduleman-wrapper", // here is where the draggable can stay. if you put "body" then it can go around the whole page
                                       // but if you put "#sampleid" then it will contain the draggable within the range of the div with the id of 'sampleid'
    scroll: false,  // prevents scrolling
    cursorAt: { bottom: 0, left: 150}, // puts cursor at center bottom || remove left option to just simply put it in bottom
    revert: "invalid" // draggable will fall back to its place
};
let selCompanyId = '';

// $(document).on('click', '.moduleman-company-widget', function(){
//     const comname = $(this).text();
//     const comid = $(this).attr('comid');
//     selCompanyId = comid;
//     // console.log(comname, comid);
//     $('#moduleman-company-modules-title').text("Active Modules of " + comname).attr('comid', comid);
    
//     ajax_fetchPreModule('moduleman-company-widget', dragoption);
//     api_fetchCompanyModule(comid, 'moduleman-company-widget');

//     $('.moduleman-company-modules').show();
//     $('.moduleman-module-list').show();
// });
// $('.moduleman-company-modules').droppable({
//     accept: ".moduleman-module-list-widget", // this will determine which elements are accepted to drop in this case all element with the class of moduleman-module-list-widget will drop
//     drop: function( event, ui ) {
//         // $(this).css('background-color', 'red');

//         let moduleui = $(ui.draggable).attr('ui'); // same with the draggable. if you use this code, you can access the draggable element thats being dropped 
//         let modulename = $(ui.draggable).text();
//         let color = $(this).css('background-color');


//         // just ignore this code
//         if(rgb2hex(color).toUpperCase() == YELLOW_PALETTE){
//             showNotification('Module Management','The Module You are trying to add is already added');
//         }else{
//             // console.log('Able to Add', sessionStorage.getItem('comid'));
//             const cb = () => {
//                 api_fetchCompanyModule(selCompanyId, 'moduleman-company-widget');
//                 showNotification('Module Management','You have successfuly added the Module ' + modulename);
//             };
//             api_createCompanyModule(selCompanyId, modulename, moduleui, cb);
//         }
//         // just ignore this code
//     }
// });
// $(document).on('dblclick', '.moduleman-company-modules-widget', function(){
//     let companyid = selCompanyId;
//     let moduleui = $(this).attr('ui');
//     // console.log(companyid, moduleui);
//     api_deleteCompanyModule(companyid, moduleui);
//     api_fetchCompanyModule(companyid, 'moduleman-company-widget');
// });