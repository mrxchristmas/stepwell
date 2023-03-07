
const listdraggsubsOption = {
    start: function(e, ui) {
        // this function fires when you start dragging
        $(ui.helper).css({
            'width' : '50px',
            'height' : '50px',
            'cursor' : 'grabbing'
        }).attr('id', $(e.target).attr('id'));
        
        // console.log($(e.target).attr('id'));
        // const docid = $(ui.helper).attr('docid');
        // console.log(docid);
        // $('.map-body-plandoc-list-con > .map-body-plandoc-list-widget').each(function(){
        //     const x = $(this).children('.widget-map');
        //     if(x.hasClass('idle')){
        //         x.css('background-color', GREEN_PALETTE);
        //     }else{
        //         if(x.children('span').text() == docid){
        //             x.css('background-color', YELLOW_PALETTE);
        //         }
        //     }
        // });
        
    },
    drag: function() {
    //   this function fires after you drag and while dragging
    },
    stop: function() {
    // this function fires when you stop dragging or if you dropped it
        // $('.create-upload-con3-connectList-widget').css('background-color', SUB_COLOR);
        // $('.map-body-plandoc-list-widget').children('.idle').css('background-color', 'grey');
        // $('.map-body-plandoc-list-widget').children('.active').css('background-color', 'white');
    // and here in stop you can color your droppable div into its original state
    },
    opacity: 0.7, // opacity of the draggable
    helper: "clone", // will not drag the actual element. instead will send a clone
    containment: "#builder-area", // here is where the draggable can stay. if you put "body" then it can go around the whole page
                                       // but if you put "#sampleid" then it will contain the draggable within the range of the div with the id of 'sampleid'
    scroll: false,  // prevents scrolling
    cursorAt: { bottom: 0, left: 0}, // puts cursor at center bottom || remove left option to just simply put it in bottom
    revert: "invalid" // draggable will fall back to its place
};
const builderAreaDropOption = {
    accept: ".list-dragg-subs-w.unit", // this will determine which elements are accepted to drop in this case all element with the class of moduleman-module-list-widget will drop
    drop: function( event, ui ) {
        console.log(ui.draggable);
        
        // same with the draggable. if you use this code, you can access the draggable element thats being dropped 
        let text = $(ui.draggable).text();
        let zid = $(ui.draggable).attr('id');
        let uid = $(ui.draggable).attr('uid');
        let zprocess = $(ui.draggable).attr('process');
        let tag = $(ui.draggable).attr('tag');
        // let doctitle = $(ui.draggable).children('.map-body-actual-list-widget-title').text(); 
        // const planid = $(event.target).attr('docid');
        // const plantitle = $(event.target).children('.widget-details').children('.map-body-plandoc-list-widget-title').text();
        // console.log(event.target);
        var x = event.pageX - $(event.target).offset().left;
        var y = event.pageY - $(event.target).offset().top;
        console.log(x, y);

        // const unitobj = ACCUSER.Skid.Unit.getSubUnitObj(zid);
        console.log(uid, zid);
        
        const unitobj = SKID_DATA.Unit.getSubUnitObj(uid, zid);
        console.log(unitobj);
        // const iconobj = ACCUSER.Skid.Icons.getUnitIconById(unitobj.icon);

        const obj = {
            // "content" : {
            //     "min" : null,
            //     "max" : null,
            //     "text" : unitobj.content
            // },
            "content" : unitobj.props,
            "type": "text",  
            "top": y,
            "left": x,
            "height": "150px",
            "width": "150px",
            "parent": $(event.target).attr('id'),
            "icon": unitobj.icon,
        }
        // unitobj.push(obj);
        unitobj.type = obj.type;
        unitobj.content = obj.content;
        unitobj.top = obj.top;
        unitobj.left = obj.left;
        unitobj.height = obj.height;
        unitobj.width = obj.width;
        unitobj.parent = obj.parent;
        unitobj.icon = obj.icon;
        const newid = OPEN_COMPONENT.createUnit(unitobj);
        addHeirarchyToList(newid);
        setComponentHeirarchy();

    }
}
const unitDraggOption = {
    start: function(e, ui) {
        // this function fires when you start dragging
        const id = $(ui.helper).attr('id');
        
    },
    drag: function(e, ui) {
        const id = $(ui.helper).attr('id');

        const trlist = OPEN_COMPONENT.getUnitTransferIdByUi(id);
        $.each(trlist, function(key, value){
            OPEN_COMPONENT.moveUnitTransfer(value);
        });
    },
    stop: function(e, ui) {
        const id = $(ui.helper).attr('id');
        const options = {
            "id" : id,
            "top" : ui.position.top,
            "left" : ui.position.left
        }
        OPEN_COMPONENT.moveUnit(options);
    },
    handle : ".unit-widget-action-maximize, legend",
    opacity: 0.7, // opacity of the draggable
    // helper: "clone", // will not drag the actual element. instead will send a clone
    containment: 'parent', // here is where the draggable can stay. if you put "body" then it can go around the whole page
                                       // but if you put "#sampleid" then it will contain the draggable within the range of the div with the id of 'sampleid'
    scroll: false,  // prevents scrolling
    // cursorAt: { bottom: 0, left: 0}, // puts cursor at center bottom || remove left option to just simply put it in bottom
    // revert: "invalid" // draggable will fall back to its place
};
const unitDropOption = {
    accept: ".list-dragg-subs-w.equipment", // this will determine which elements are accepted to drop in this case all element with the class of moduleman-module-list-widget will drop
    drop: function( event, ui ) {
        // same with the draggable. if you use this code, you can access the draggable element thats being dropped 
        let text = $(ui.draggable).text();
        let zid = $(ui.draggable).attr('id');
        let eid = $(ui.draggable).attr('eid');
        // let doctitle = $(ui.draggable).children('.map-body-actual-list-widget-title').text(); 
        const subunitid = $(event.target).attr('id');
        // const plantitle = $(event.target).children('.widget-details').children('.map-body-plandoc-list-widget-title').text();
        
        var x = event.pageX - $(event.target).offset().left;
        var y = event.pageY - $(event.target).offset().top;
        console.log(x, y);

        // let zid = rngMessageId();
        // console.log(zid, text);
        let gate = true;
        // $(event.target).children('.equipment-widget').each(function(){
        //     if($(this).attr('id') == zid){
        //         alert('Equipment is already in!');
        //         gate = false;
        //     }
        // });

        // const equipmentobj = ACCUSER.Skid.Equipment.getSubEquipmentObj(zid);
        const equipmentobj = SKID_DATA.Equipment.getSubEquipmentObj(eid, zid);
        console.log(equipmentobj);
        // const iconobj = ACCUSER.Skid.Icons.getequipmentIconById(equipmentobj.icon);

        const obj = {
            // "content": {
            //     "min" : null,
            //     "max" : null,
            //     "text" : equipmentobj.content
            // },
            "content": equipmentobj.props,
            "type": "text",
            "top": y,
            "left": x,
            "height": "100px",
            "width": "200px",
            "subunitid" : subunitid,
            "icon": equipmentobj.icon,
        }
        // equipmentobj.push(obj);
        equipmentobj.content = obj.content;
        equipmentobj.type = obj.type;
        equipmentobj.top = obj.top;
        equipmentobj.left = obj.left;
        equipmentobj.height = obj.height;
        equipmentobj.width = obj.width;
        equipmentobj.subunitid = obj.subunitid;
        equipmentobj.icon = obj.icon;

        // console.log(equipmentobj);
        const newid= OPEN_COMPONENT.createEquipment(equipmentobj);
        addHeirarchyToList(newid);
        setComponentHeirarchy();

        
        // if(gate){
        //     // get properties and added properties.
        //     $(event.target).prepend(`
        //         <div id="${zid}" class="equipment-widget">
        //             <span class="title"><img src="lib/images/avatardefault.png" alt="">${text}</span>
        //             <div class="params">
        //                 <span class="title">Volume</span>
        //                 <span class="content">45 L</span>
        //             </div>
        //             <div class="params">
        //                 <span class="title">Area</span>
        //                 <span class="content">462 sqft</span>
        //             </div>
        //             <div class="params">
        //                 <span class="title">Circumference</span>
        //                 <span class="content">4.2 Rad</span>
        //             </div>
        //             <i id="${zid}-arrow-top" class="equipment-widget-arrow-h top far fa-circle"></i>
        //             <i id="${zid}-arrow-bottom" class="equipment-widget-arrow-h bottom far fa-circle"></i>
        //             <i id="${zid}-arrow-left" class="equipment-widget-arrow-h left far fa-circle"></i>
        //             <i id="${zid}-arrow-right" class="equipment-widget-arrow-h right far fa-circle"></i>
        //         </div>
        //     `);

        //     // style="top=${value.top}; left=${value.left}; height=${value.height}; width=${value.width};"
        //     $(`#${zid}`).css({
        //         "top" : y - 10,
        //         "left" : x - 10
        //     }).draggable(equipmentDraggOption);
        // }
        
        
        

    }
}
const equipmentDraggOption = {
    start: function(e, ui) {
        
        
    },
    drag: function(e, ui) {
        const id = $(ui.helper).attr('id');

        const trlist = OPEN_COMPONENT.getEquipmentTransferIdByUi(id);
        $.each(trlist, function(key, value){
            OPEN_COMPONENT.moveEquipmentTransfer(value);
        });
    },
    stop: function(e, ui) {
        const id = $(ui.helper).attr('id');
        const options = {
            "id" : id,
            "top" : ui.position.top,
            "left" : ui.position.left
        }
        OPEN_COMPONENT.moveEquipment(options);
    },
    handle : ".title",
    opacity: 0.7, // opacity of the draggable
    // helper: "clone", // will not drag the actual element. instead will send a clone
    containment: "parent", // here is where the draggable can stay. if you put "body" then it can go around the whole page
                                       // but if you put "#sampleid" then it will contain the draggable within the range of the div with the id of 'sampleid'
    scroll: false,  // prevents scrolling
    // cursorAt: { bottom: 0, left: 0}, // puts cursor at center bottom || remove left option to just simply put it in bottom
    // revert: "invalid" // draggable will fall back to its place
};

let posUnitEl = {};
let posUnitGate = false;

let posEquipmentEl = {};
let posEquipmentGate = false;


let ongoingOperation = false;

let resizeObserver = new ResizeObserver(e => {
    
    $.each(e, function(key, value){
        // console.log(value.target.id);
        // if(value.target.id == "builder-area-page"){
        //     OPEN_COMPONENT.pageheight = `${value.contentRect.height}px`;
        //     $('#builder-area-page-svg').css({
        //         "height" : "100%"
        //     });
        // }else 
        if($(value.target).hasClass('unit-widget')){
            const id = value.target.id;
            const minimized = $(`#${id}`).attr('minimized');
            // console.log('RESIZING UNIT WIDGET!!!');
            if(minimized != "true"){
                const newHeight = `${value.contentRect.height}px`;
                const newWidth = `${value.contentRect.width}px`;
            
                $(`#${value.target.id}`).attr({
                    'height' : newHeight,
                    'width' : newWidth
                });
                const options = {
                    'id' : value.target.id,
                    'height' : newHeight,
                    'width' : newWidth
                }
                // console.log(options);
                OPEN_COMPONENT.resizeUnit(options);
                
                const trlist = OPEN_COMPONENT.getUnitTransferIdByUi(id);
                // console.log(id, trlist);
                $.each(trlist, function(key, value){
                    OPEN_COMPONENT.moveUnitTransfer(value);
                });
            }
            // const oldheight = $(this).attr('height');
            // const oldwidth = $(this).attr('width');
            // const rect = e.target.getBoundingClientRect();
        
            
        }else if($(value.target).hasClass('equipment-widget')){
            const id = value.target.id;
        
            const newHeight = `${value.contentRect.height}px`;
            const newWidth = `${value.contentRect.width}px`;
        
            $(`#${value.target.id}`).attr({
                'height' : newHeight,
                'width' : newWidth
            });
            const options = {
                'id' : value.target.id,
                'height' : newHeight,
                'width' : newWidth
            }
            // console.log(options);
            OPEN_COMPONENT.resizeEquipment(options);
            
            const trlist = OPEN_COMPONENT.getEquipmentTransferIdByUi(id);
            // console.log(id, trlist);
            $.each(trlist, function(key, value){
                OPEN_COMPONENT.moveEquipmentTransfer(value);
            });
        }
    });
    
});
// resizeObserver.observe($('#builder-area-page')[0]);
// PAGE EVENTS

// BUILDER AREA EVENTS
$('#builder-area-addpage').click(function(){
    OPEN_COMPONENT.createPage();
});
$(document).on('click', '.builder-area-page-delete', function(){
    const id = $(this).parent('.builder-area-page').attr('id');
    let x = 0;
    $(this).siblings('.unit-widget').each(function(){
        x++;
    });
    
    if(x > 0){
        showToast("Cannot Delete Page with Components");
    }else{
        OPEN_COMPONENT.deletePage(id);
        $(this).parent('.builder-area-page').remove();
        showToast('Page Deleted');
    }
});

// UNIT & EQUIPMENT LISTS AND INFO LIST EVENT
$(document).on('click', '.list-dragg > .title', function(){
    const status = $(this).attr('status');

    if(status != "closed"){
        $(this).children('span').css('display', 'flex').show();
        $(this).siblings('.content-wrapper').css('display', 'flex').show();
        $(this).siblings('.search').css('display', 'flex').show();
        $(this).attr('status', "closed");
        $(this).parent('.list-dragg').css('z-index', '1000');
    }else{
        $(this).children('span').css('display', 'none').hide();
        $(this).siblings('.content-wrapper').css('display', 'none').hide();
        $(this).siblings('.search').css('display', 'none').hide();
        $(this).attr('status', "open");
        $(this).parent('.list-dragg').css('z-index', '100');
    }
});
// $(document).on('mouseenter', '.list-dragg', function(){
//     $('.list-dragg').css('z-index', '99');
//     $(this).css('z-index', '1000');
// });
// $(document).on('mouseeleave', '.list-dragg', function(){
//     $(this).css('z-index', '100');
// });
$(document).on('click', '.content-widget-subs-h', function(){
    const status = $(this).attr('status');

    if(status != "closed"){
        $(this).siblings('.subs').css('display', 'flex').show();
        // $('.list-dragg > .content-wrapper').css('display', 'flex').show();
        $(this).attr('status', "closed");
    }else{
        $(this).siblings('.subs').css('display', 'none').hide();
        // $('.list-dragg > .content-wrapper').css('display', 'none').hide();
        $(this).attr('status', "open");
    }
});
$(document).on('click', '#list-dragg-unit-search-submit', function(){
    const q = $('#list-dragg-unit-search-field').val();
    fillUnitWithFilter(q);
});
$(document).on('click', '#list-dragg-equipment-search-submit', function(){
    const q = $('#list-dragg-equipment-search-field').val();
    fillEquipmentWithFilter(q);
});
$(document).on('keyup', '#list-dragg-equipment-search-field', function(){
    const q = $(this).val();
    if(q == ""){
        fillEquipment();
    }
});
$(document).on('keyup', '#list-dragg-unit-search-field', function(){
    const q = $(this).val();
    if(q == ""){
        fillUnit();
    }
});





// BUILDER FORMS EVENTS
const builderFormDropOption = {
    accept: ".builder-form-comp-create-view-connect-open-widget", // this will determine which elements are accepted to drop in this case all element with the class of moduleman-module-list-widget will drop
    drop: function( e, ui ) {
        // console.log(ui);
        const propstr = $(ui.helper).attr('props');
        const propobj = JSON.parse(propstr);
        // console.log(propobj);
        
        const idstr = $(ui.helper).attr('ids');
        const idsobj = JSON.parse(idstr);

        let html = `<div fileid="${idsobj.fileid}" formid="${idsobj.formid}" rowid="${idsobj.rowid}" class="values-widget link">`;

        let n = $('#builder-form-comp-create-columncount').val();

        if(propobj.length > n){
            showToast("Some Data was clipped because column length is too short.");
        }
        for(i=0;i<n;i++){
            html += `<input type="text" value="${propobj[i] == undefined ? "" : propobj[i]}" disabled>`;
            // html += `<span class="builder-form-comp-create-content-cell">${propobj[i] == undefined ? "" : propobj[i]}</span>`;
        }

        html += `<i class="builder-form-comp-create-view-widget-content-d fas fa-trash"></i></div>`;
        $(e.target).children('.values-con').append(html);
        


    }
}
const builderFormDragOption = {
    start: function(e, ui) {
        // this function fires when you start dragging
        // console.log(ui);
        // const id = $(ui.helper).attr('id');
        // console.log($(ui.helper.context));
        // console.log(e.target);
        if($(e.target).hasClass('link') && $(e.target).hasClass('accesserror')){

            showToast("You do not have access to this Form. Double Click to Send Request.");
            return false;
        }else if($(e.target).hasClass('link') && $(e.target).hasClass('accesspending')){

            showToast("Your Access Request to this Form is still Pending...");
            return false;
        }else{

            let list = [];
            $(e.target).children('span').each(function(){
                // console.log($(this).text());
                list.push($(this).text());
            });
            
            // console.log(list);
            let str = JSON.stringify(list);
            $(ui.helper).attr('props', str);

            // const idstr = $(e.target).attr('ids');
            // console.log(idstr);

            
            const fileid = $(e.target).attr('fileid');
            const formid = $(e.target).attr('formid');
            const rowid = $(e.target).attr('rowid');
            // console.log(fileid, formid, rowid);
            const obj = {
                fileid: fileid,
                formid: formid,
                rowid: rowid,
            }
            // console.log(obj);
            const idstr = JSON.stringify(obj);
            $(ui.helper).attr('ids', idstr);



            $(ui.helper.context).css({
                backgroundColor: 'var(--BTN_COLOR)',
            });
            $(ui.helper).empty().append('<i class="fas fa-boxes"></i>');
            $(ui.helper).css({
                width: 'auto',
                padding: '10px'
            });
            $(ui.helper).children('i').css({
                fontSize: '2em'
            });

            $('#builder-form-comp-create-view-widget-container').children('.content-widget').children('.header').css({
                backgroundColor: 'green'
            });

        }

    },
    drag: function(e, ui) {
        // const id = $(ui.helper).attr('id');

    },
    stop: function(e, ui) {
        // const id = $(ui.helper).attr('id');
        $(ui.helper.context).css({
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
        });
        $('#builder-form-comp-create-view-widget-container').children('.content-widget').children('.header').css({
            backgroundColor: 'unset'
        });
    },
    // handle : ".builder-form-comp-create-view-connect-open-widget, .builder-form-comp-create-view-connect-open-widget > span",
    opacity: 0.7, // opacity of the draggable
    helper: "clone", // will not drag the actual element. instead will send a clone
    // containment: '#builder-form-con', // here is where the draggable can stay. if you put "body" then it can go around the whole page
                                       // but if you put "#sampleid" then it will contain the draggable within the range of the div with the id of 'sampleid'
    scroll: false,  // prevents scrolling
    cursorAt: { bottom: 0, left: 25}, // puts cursor at center bottom || remove left option to just simply put it in bottom
    revert: "invalid" // draggable will fall back to its place
};
function getDatasheetDefaultSheets(n){
    let html = '';
    function singleWidget(name, num){
        let inhtml = '';
        for(i=0; i<num;i++){
            inhtml += `<input type="text" value="">`;
            // inhtml += `<span class="builder-form-comp-create-content-cell"></span>`;
        }
        let inhtml1 = '';
        for(i=0; i<n;i++){
            inhtml1 += `<input class="builder-form-comp-create-content-header" placeholder="Header "/>`;
        }
        return `
            <div class="content-widget">
                <div class="header">
                    <span status="open" class="builder-form-comp-create-view-widget-header-h">${name}</span>
                    <i class="builder-form-comp-create-view-widget-header-a fas fa-plus"></i>
                </div>
                <div class="values-con ">
                    <div class="values-widget-header">
                        ${inhtml1}
                        <i></i>
                    </div>
                    <div class="values-widget">
                        ${inhtml}
                        <i class="builder-form-comp-create-view-widget-content-d fas fa-trash"></i>
                    </div>
                </div>
            </div>
        `
    }
    html += singleWidget("IDENTIFICATION", n);
    html += singleWidget("SPECIFICATION", n);
    html += singleWidget("DOCUMENTATION", n);
    html += singleWidget("PROCESS DESCRIPTION", n);
    return html;
}
function redrawCellColumns(n){
    let errGate = false;

    $('#builder-form-comp-create-view-widget-container').children('.content-widget').each(function(){
        $(this).children('.values-con').children('.values-widget').each(function(){
            let z = n;
            $(this).children('input').each(function(){
                if(!z--){
                    if($(this).val() != ''){
                        errGate = true;
                    }
                }
            });
        });
        $(this).children('.values-con').children('.values-widget-header').each(function(){
            let z = n;
            $(this).children('input').each(function(){
                if(!z--){
                    if($(this).val() != ''){
                        errGate = true;
                    }
                }
            });
        });
    });

    

    if(errGate){
        showToast("There are some Values that will be deleted. Please fix this first before reducing column count.");
    }else{
        $('#builder-form-comp-create-view-widget-container').children('.content-widget').each(function(){
            $(this).children('.values-con').children('.values-widget').each(function(){
                let z = n;
                $(this).children('input').each(function(){
                    if(!z--){
                        $(this).remove();
                    }
                });
                if(z > 0 && !errGate){
                    $(this).children('i').remove();
                    for(i=0;i<z;i++){
                        $(this).append(`<input type="text" value="">`);
                        // $(this).append(`<span class="builder-form-comp-create-content-cell"></span>`);
                    }
                    $(this).append(`<i class="builder-form-comp-create-view-widget-content-d fas fa-trash"></i>`);
                }
            });

            $(this).children('.values-con').children('.values-widget-header').each(function(){
                let z = n;
                $(this).children('input').each(function(){
                    if(!z--){
                        $(this).remove();
                    }
                });
                if(z > 0 && !errGate){
                    $(this).children('i').remove();
                    for(i=0;i<z;i++){
                        $(this).append(`<input class="builder-form-comp-create-content-header" placeholder="Header "/>`);
                    }
                    $(this).append(`<i></i>`);
                }
            });
        });
    
        $('#builder-form-comp-create-view-widget-container').children('.content-widget').children('.values-con').children('.values-widget').children('span').css({
            width: 'calc( ( 100% - 25px ) / ${n} )'
        });
    }

    
    $('#builder-form-comp-create-view-widget-container').children('.content-widget').droppable(builderFormDropOption);
    return !errGate;

}
function fillMyForms(options){
    const fobj = OPEN_COMPONENT.getAllForms();
    console.log(fobj);
    let html = "";

    function widgetHtml(value){
        let tagHtml = "";
        if(value.tags != undefined && value.tags.length > 0){
            $.each(value.tags, function(key, value1){
                tagHtml += `<span>${value1}</span>`;
            }); 
        }
        return `
            <div fid="${value.formid}" class="builder-form-list-widget">
                <span class="title">${value.filename}</span>
                <div class="wcontent ">
                    ${tagHtml}
                </div>
            </div>`
    }

    $.each(fobj, function(key, value){
        if(options.datasheetview == "show" && value.type == "datasheet"){
            html += widgetHtml(value);
        }
        if(options.protocolview == "show" && value.type == "protocol"){
            html += widgetHtml(value);
        }
    });

    $('#builder-form-comp-view-formlist').empty().append(html);
}
function fillCreateForm(formid){
    const fobj = OPEN_COMPONENT.getForm(formid);

    $('#builder-form-comp-create-filename').val(fobj.filename).attr('formid', fobj.formid);
    $('input[type="radio"][name="builder-form-header-type"]').prop('checked', false);
    $(`input[type="radio"][name="builder-form-header-type"][ftype="${fobj.type}"]`).prop('checked', true);
    $('#builder-form-comp-create-columncount').val(fobj.columncount);
    $('#builder-form-comp-create-notes').val(fobj.notes);

    $('#builder-form-comp-create-view-widget-container').children('.content-widget').remove();
    $.each(fobj.content, function(key, value){
        let headerhtml = "";
        let headercount = 0;
        $.each(value.header, function(key, value){
            headerhtml += `<input class="builder-form-comp-create-content-header" value="${value}"/>`;
            headercount++;
        });
        for(headercount; headercount<fobj.columncount;headercount++){
            headerhtml += `<input class="builder-form-comp-create-content-header" value=""/>`;
        }

        let valueshtml = "";
        $.each(value.values, function(key, value1){
            if(value1.id != undefined){
                valueshtml += `<div rid="${value1.id}" class="values-widget">`;
                let valuescount = 0;
                $.each(value1.values, function(key, value2){
                    valueshtml += `<input type="text" value="${value2}">`;
                    valuescount++;
                });
                for(valuescount; valuescount<fobj.columncount;valuescount++){
                    valueshtml += `<input type="text" value="">`;
                }
                valueshtml += `<i class="builder-form-comp-create-view-widget-content-d fas fa-trash"></i></div>`;
            }else if(value1.link != undefined){
                const rowobj = SKID_FILE.getCompanyFileFormRow(value1.link.fileid, value1.link.formid, value1.link.rowid);
                console.log(rowobj);
                valueshtml += `<div fileid="${value1.link.fileid}" formid="${value1.link.formid}" rowid="${value1.link.rowid}" title="Linked From ${value1.link.formid} Form" class="values-widget link">`;
                // valueshtml += `<input type="text" value="${value1.link.fileid}">`;
                let valuescount = 0;
                $.each(rowobj, function(key, value){
                    valueshtml += `<input type="text" value="${value}" disabled>`;
                    valuescount++;
                });
                for(valuescount; valuescount<fobj.columncount;valuescount++){
                    valueshtml += `<input type="text" value="" disabled>`;
                }
                valueshtml += `<i class="builder-form-comp-create-view-widget-content-d fas fa-trash"></i></div>`;

            }
        });
       
        $('#builder-form-comp-create-view-widget-container').prepend(`
            <div class="content-widget">
                <div class="header">
                    <span status="open" class="builder-form-comp-create-view-widget-header-h">${value.name}</span>
                    <i class="builder-form-comp-create-view-widget-header-a fas fa-plus"></i>
                </div>
                <div class="values-con ">
                    <div class="values-widget-header">
                        ${headerhtml}
                        <i></i>
                    </div>
                    ${valueshtml}
                </div>
            </div>
        `);
        $('#builder-form-comp-create-view-widget-container').children('.content-widget').droppable(builderFormDropOption);
    });
    $('#builder-form-comp-create-view-connect-relation-container').empty();
    $.each(fobj.relation, function(key, value){
        $('#builder-form-comp-create-view-connect-relation-container').append(`
            <div fid="${value.formid}" class="widget">
                <span>${value.filename}</span>
                <button fileid="${value.fileid}" formid="${value.formid}" class="btn-shadow builder-form-comp-create-view-connect-openf">Open</button>
            </div>
        `);
    });
    $('#builder-form-comp-create-view-tag-container').empty();
    $.each(fobj.tags, function(key, value){
        $('#builder-form-comp-create-view-tag-container').append(`
            <div class="widget">
                <span>${value}</span>
                <i class="fas fa-trash" onclick="tagRemoveParent(this);" ></i>
            </div>
        `);
    });
            

}
function resetCreateForm(){
    $('#builder-form-comp-create-filename').val("");
    $('input[type="radio"][name="builder-form-header-type"]').prop('checked', false);
    $(`input[type="radio"][name="builder-form-header-type"][ftype="datasheet"]`).prop('checked', true);
    $('#builder-form-comp-create-columncount').val('2');
    $('#builder-form-comp-create-view-widget-container').children('.content-widget').remove();
    $('#builder-form-comp-create-notes').val("");
    $('#builder-form-comp-create-view-connect-relation-container').empty();
    $('#builder-form-comp-create-view-tag-container').empty();
}
function fillConnectionComponents(incoming=null){
    const unitobj = OPEN_COMPONENT.Unit;
    const equipmentobj = OPEN_COMPONENT.Equipment;

    const openForm = OPEN_COMPONENT.getForm( $('#builder-form-comp-create-filename').attr('formid') );
    // console.log('HELP', openForm);
    // console.log(unitobj, equipmentobj);
    let html = "";
    function checkIfLinked(compid){
        let ret;
        if(openForm != undefined && openForm.connect.length > 0){
            let gate = false;
            $.each(openForm.connect, function(key, value){
                if(compid == value){
                    gate = true;
                }
            });
            if(gate){
                ret = "unlink"; 
            }else{
                ret = "link"; 
            }
        }else{
            ret = "link";
        }
        return ret;
    }

    if($('#builder-form-comp-create-view-connect-connections-view-unit').is(':checked')){
        $.each(unitobj, function(key, value){
            const iconobj = SKID_DATA.Icons.getUnitIconById(value.icon);
            const linkstatus = checkIfLinked(value.id);
            if(incoming != null && incoming == value.id){
                html += `
                    <div status="unlink" cid="${value.id}" class="widget">
                        <img src="${iconobj.url}" alt="${iconobj.name}">
                        <span class="title">${value.name}</span>
                        <i class="builder-form-comp-create-view-connect-connections-linkstatus-dep fas fa-unlink"></i>
                    </div>
                `
            }else{
                html += `
                    <div status="${linkstatus}" cid="${value.id}" class="widget">
                        <img src="${iconobj.url}" alt="${iconobj.name}">
                        <span class="title">${value.name}</span>
                        <i class="builder-form-comp-create-view-connect-connections-linkstatus fas fa-${linkstatus}"></i>
                    </div>
                `
            }
            
        });
    }
    if($('#builder-form-comp-create-view-connect-connections-view-equipment').is(':checked')){
        $.each(equipmentobj, function(key, value){
            const iconobj = SKID_DATA.Icons.getEquipmentIconById(value.icon);
            const linkstatus = checkIfLinked(value.id);
            if(incoming != null && incoming == value.id){
                html += `
                    <div status="unlink" cid="${value.id}" class="widget">
                        <img src="${iconobj.url}" alt="${iconobj.name}">
                        <span class="title">${value.name}</span>
                        <i class="builder-form-comp-create-view-connect-connections-linkstatus fas fa-unlink"></i>
                    </div>
                `
            }else{
                html += `
                    <div status="${linkstatus}" cid="${value.id}" class="widget">
                        <img src="${iconobj.url}" alt="${iconobj.name}">
                        <span class="title">${value.name}</span>
                        <i class="builder-form-comp-create-view-connect-connections-linkstatus fas fa-${linkstatus}"></i>
                    </div>
                `
            }
            
        });
    }

    $('#builder-form-comp-create-view-connect-connections-widgetcon').empty().append(html);

}
function fetchAllSkidFiles(callback=()=>{}){
    const cb =()=>{
        const cfobj = SKID_FILE.getCompanyFiles();
        // console.log(cfobj);
        let x = 0;
        let y = cfobj.length;
        
        $.each(cfobj, function(key, value){
            const cb =data=>{
                console.log(data);
                if(x == (y-1)){
                    console.log('end');
                    callback();
                }else{
                    x++;
                }
            };
            SKID_FILE.getCompanyFileObject(value.id, cb);
        });
    };
    SKID_FILE.fetchAll(cb);
}
$('#builder-forms').click(function(){
    const cb =()=>{
        showToast("Done Fetching Please Proceed");
        $('#builder-form-con').css('display', 'flex').show();
        $('#builder-form-a-create').show();
        $('#builder-form-a-view').show();
        $('#builder-form-a-close').show();
    };
    fetchAllSkidFiles(cb);
});
$(document).on('click', '#builder-form-a-create', function(){
    let n = $('#builder-form-comp-create-columncount').val();
    resetCreateForm();

    $('.builder-form-comp').hide();
    $('.builder-form-comp-create').css('display', 'flex').show();
    $('.builder-form-comp-create-view-connect-content').hide();
    $('.builder-form-comp-create-view-connect-content.current').css('display', 'flex').show();
    $('.builder-form-comp-create-view-connect-h').removeClass('active');
    $('.builder-form-comp-create-view-connect-h[ts="current"]').addClass('active');
    $('.builder-form-comp-create-view-connect-h[ts="connections"]').attr('incoming', '');

    const html = getDatasheetDefaultSheets(n);
    $('#builder-form-comp-create-view-widget-container').children('.content-widget').remove();
    $('#builder-form-comp-create-view-widget-container').prepend(html);
    $('input[type="radio"][name="builder-form-header-type"]').prop('checked', false);
    $('input[type="radio"][name="builder-form-header-type"][ftype="datasheet"]').prop('checked', true);

    $('#builder-form-comp-create-view-widget-container').children('.content-widget').droppable(builderFormDropOption);

    $('#builder-form-a-save').attr('statype', 'create');
    $('#builder-form-comp-create-filename').attr('formid', '');

    $('#builder-form-a-done').hide();
    $('#builder-form-a-save').hide();
    $('#builder-form-a-create').hide();
    $('#builder-form-a-view').hide();
    $('#builder-form-a-close').hide();

    
    $('#builder-form-a-save').show();
    $('#builder-form-a-done').show();
    // $('#builder-form-a-view').show();
});
$(document).on('click', '#builder-form-a-save', function(){
    // showToast("This should only be visible on creating Forms.");
    
    const statype = $(this).attr('statype');

    console.log(statype);

    if(statype != "update"){
        const mainobj = {
            formid: rngPassword(),
            filename: $('#builder-form-comp-create-filename').val(),
            type: $('input[type="radio"][name="builder-form-header-type"]:checked').attr('ftype'),
            creator: __ID,
            createdate: dateFns.format(
                new Date(),
                'YYYY-MM-DD hh:mm:ss'
            ),
            modifydate: dateFns.format(
                new Date(),
                'YYYY-MM-DD hh:mm:ss'
            ),
            columncount: parseInt($('#builder-form-comp-create-columncount').val()),
            content: [
                // {
                //     name: "",
                //     header: ["text1", "text2"],
                //     values: [
                //         {
                //             id: "",
                //             values: ["text1", "text2"]
                //         },{
                //             id: "",
                //             values: ["text1", "text2"]
                //         },{
                //             id: "",
                //             values: ["text1", "text2"]
                //         }
                //     ]
                // }
            ],
            notes: $('#builder-form-comp-create-view-widget-container').children('.content-widget-notes').children('textarea').val(),
            connect: [],
            relation: [],
            tags: [],
        }

        $('#builder-form-comp-create-view-widget-container').children('.content-widget').each(function(){
            let obj= {
                name: $(this).children('.header').children('span').text(),
                header: [],
                values: []
            };

            $(this).children('.values-con').children('.values-widget').each(function(){
                let contentobj = [];
                if($(this).hasClass('link')){
                    obj.values.push({
                        id: rngPassword(),
                        link: {
                            sheetid: "",
                            rowid: ""
                        }
                    });
                }else{
                    $(this).children('input').each(function(){
                        contentobj.push( $(this).val() );
                    });
                    obj.values.push({
                        id: rngPassword(),
                        values: contentobj
                    });
                }
                
            });
            

            $(this).children('.values-con').children('.values-widget-header').children('input').each(function(){
                obj.header.push( $(this).val() );
            });

            mainobj.content.push(obj);
            mainobj.id = rngPassword();

        }); // manages content

        $('#builder-form-comp-create-view-connect-relation-container').children('.widget').each(function(){
            const obj = {
                fileid: $(this).children('button').attr('fileid'),
                formid: $(this).children('button').attr('formid'),
                filename: $.trim($(this).children('span').text())
            }
            mainobj.relation.push(obj);
        }); // manages relations

        $('#builder-form-comp-create-view-tag-container').children('.widget').each(function(){
            mainobj.tags.push( $(this).children('span').text() );
        }); // manages tags

        $('#builder-form-comp-create-view-connect-connections-widgetcon').children('.widget').each(function(){
            if($(this).attr('status') == "unlink"){
                mainobj.connect.push( $(this).attr('cid') );
            }
        }); // manages connections
        
        OPEN_COMPONENT.createForm(mainobj);
        
        showToast("Form Updated");
    }else{
        const mainobj = {
            formid: $('#builder-form-comp-create-filename').attr('formid'),
            filename: $('#builder-form-comp-create-filename').val(),
            type: $('input[type="radio"][name="builder-form-header-type"]:checked').attr('ftype'),
            creator: __ID,
            columncount: parseInt($('#builder-form-comp-create-columncount').val()),
            content: [
                // {
                //     name: "",
                //     header: ["text1", "text2"],
                //     values: [
                //         {
                //             id: "",
                //             values: ["text1", "text2"]
                //         },{
                //             id: "",
                //             values: ["text1", "text2"]
                //         },{
                //             id: "",
                //             values: ["text1", "text2"]
                //         }
                //     ]
                // }
            ],
            notes: $('#builder-form-comp-create-view-widget-container').children('.content-widget-notes').children('textarea').val(),
            connect: [],
            relation: [],
            tags: [],
        }

        $('#builder-form-comp-create-view-widget-container').children('.content-widget').each(function(){
            let obj= {
                name: $(this).children('.header').children('span').text(),
                header: [],
                values: []
            };

            $(this).children('.values-con').children('.values-widget').each(function(){
                let contentobj = [];
                if($(this).hasClass('link')){
                    const fileid = $(this).attr('fileid');
                    const formid = $(this).attr('formid');
                    const rowid = $(this).attr('rowid');
                    console.log(fileid, formid, rowid);
                    obj.values.push({
                        link: {
                            fileid: fileid,
                            formid: formid,
                            rowid: rowid,
                        }
                    });
                }else{
                    $(this).children('input').each(function(){
                        contentobj.push( $(this).val() );
                    });
                    obj.values.push({
                        id: rngPassword(),
                        values: contentobj
                    });
                }
                
            });
            

            $(this).children('.values-con').children('.values-widget-header').children('input').each(function(){
                obj.header.push( $(this).val() );
            });

            mainobj.content.push(obj);
            mainobj.id = rngPassword();

        }); // manages content

        $('#builder-form-comp-create-view-connect-relation-container').children('.widget').each(function(){
            const obj = {
                fileid: $(this).children('button').attr('fileid'),
                formid: $(this).children('button').attr('formid'),
                filename: $.trim($(this).children('span').text())
            }
            mainobj.relation.push(obj);
        }); // manages relations

        $('#builder-form-comp-create-view-tag-container').children('.widget').each(function(){
            mainobj.tags.push( $(this).children('span').text() );
        }); // manages tags

        $('#builder-form-comp-create-view-connect-connections-widgetcon').children('.widget').each(function(){
            if($(this).attr('status') == "unlink"){
                mainobj.connect.push( $(this).attr('cid') );
            }
        }); // manages connections
        
        // console.log('update', mainobj);

        OPEN_COMPONENT.createForm(mainobj);
        showToast("Form Saved");
    }
});
$(document).on('click', '#builder-form-a-view', function(){
    $('.builder-form-comp').hide();
    $('.builder-form-comp-view').removeClass('hidden').css('display', 'flex').show();
    resetCreateForm();

    const options = {
        datasheetview: "show",
        protocolview: "show"
    }
    fillMyForms(options);


    $('.builder-form-comp-view.properties').hide();
    $('.builder-form-comp-view.columncontainer').hide();

});
$(document).on('click', '#builder-form-a-close', function(){
    $('.builder-form-comp').hide();
    $('#builder-form-con').hide();
});
$(document).on('click', '#builder-form-a-done', function(){
    $('.builder-form-comp').hide();
    // $('.builder-form-comp-view').removeClass('hidden').css('display', 'flex').show();

    $('#builder-form-a-done').hide();
    $('#builder-form-a-save').hide();
    $('#builder-form-a-create').hide();
    $('#builder-form-a-view').hide();
    $('#builder-form-a-close').hide();

    
    $('#builder-form-a-close').show();
    $('#builder-form-a-create').show();
    $('#builder-form-a-view').show();
});

$(document).on('click', '.builder-form-comp-create-view-connect-h', function(){
    const ts = $(this).attr('ts');
    $(this).parent('.header').siblings(`.content`).hide();
    $(this).parent('.header').siblings(`.content.${ts}`).css('display', 'flex').show();
    $('.builder-form-comp-create-view-connect-h').removeClass('active');
    $(this).addClass('active');

    if(ts == "search"){
        $('#builder-form-comp-create-view-connect-search-container').empty();
        $('#builder-form-comp-create-view-connect-search-s').siblings('input').val("");
    }
    if(ts == "connections"){
        const incoming = $(this).attr('incoming');
        // console.log('HELP', incoming);
        // if($(this).attr('status') == "update"){
        //     fillConnectionComponents();
        //     // console.log($('#builder-form-comp-create-filename').attr('formid'));
        // }else{
        //     fillConnectionComponents();
        // }

        if(incoming != undefined && incoming != ""){
            fillConnectionComponents( incoming );
            // console.log($('#builder-form-comp-create-filename').attr('formid'));
        }else{
            fillConnectionComponents();
        }
    }
});




// connect connections events
$(document).on('click', '.builder-form-comp-create-view-connect-connections-linkstatus', function(){
    if($(this).hasClass('fa-link')){
        $(this).parent('.widget').attr('status', 'unlink');
        $(this).removeClass('fa-link').addClass('fa-unlink');
        showToast("Form is attached to the Component");
    }else if($(this).hasClass('fa-unlink')){
        $(this).parent('.widget').attr('status', 'link');
        $(this).removeClass('fa-unlink').addClass('fa-link');
        showToast("Form is detached to the Component");
    }
});




//  view forms formlist events
function openForm_handler(formid){
    fillCreateForm(formid);
    $('.builder-form-comp').hide();
    $('.builder-form-comp-create').css('display', 'flex').show();
    $('.builder-form-comp-create-view-connect-content').hide();
    $('#builder-form-a-save').attr('statype', 'update');
    $('.builder-form-comp-create-view-connect-h[ts="connections"]').attr('status', 'update');

    
    $('#builder-form-a-close').hide();
    $('#builder-form-a-done').hide();
    $('#builder-form-a-save').hide();
    $('#builder-form-a-create').hide();
    $('#builder-form-a-view').hide();
    $('#builder-form-a-close').hide();

    
    $('#builder-form-a-done').show();
    $('#builder-form-a-save').show();
}
$(document).on('change', '.builder-form-comp-view-header-options', function(){
    const options = {
        datasheetview: $('.builder-form-comp-view-header-options[ftype="datasheet"]').is(':checked') ? "show" : "hide",
        protocolview: $('.builder-form-comp-view-header-options[ftype="protocol"]').is(':checked') ? "show" : "hide",
    }
    fillMyForms(options);
});
$(document).on('click', '.builder-form-list-widget', function(){
    const fid = $(this).attr('fid');
    console.log(fid);
    const fobj = OPEN_COMPONENT.getForm(fid);
    console.log(fobj);

    $('#builder-form-comp-view-properties').empty();
    $('#builder-form-comp-view-properties').append(`
        <div class="builder-form-props-widget">
            <span class="label">File Name</span>
            <div class="value">
                <span>${fobj.filename}</span>
            </div>
        </div>
    `);
    $('#builder-form-comp-view-properties').append(`
        <div class="builder-form-props-widget">
            <span class="label">File ID</span>
            <div class="value">
                <span>${fobj.formid}</span>
            </div>
        </div>
    `);
    $('#builder-form-comp-view-properties').append(`
        <div class="builder-form-props-widget">
            <span class="label">Creator ID</span>
            <div class="value">
                <span>${fobj.creator}</span>
            </div>
        </div>
    `);
    $('#builder-form-comp-view-properties').append(`
        <div class="builder-form-props-widget">
            <span class="label">Create Date</span>
            <div class="value">
                <span>${fobj.createdate}</span>
            </div>
        </div>
    `);
    $('#builder-form-comp-view-properties').append(`
        <div class="builder-form-props-widget">
            <span class="label">Last Date Modified</span>
            <div class="value">
                <span>${fobj.modifydate}</span>
            </div>
        </div>
    `);
    $('#builder-form-comp-view-properties').append(`
        <div class="builder-form-props-widget">
            <span class="label">Column Count</span>
            <div class="value">
                <span>${fobj.columncount}</span>
            </div>
        </div>
    `);
    if(fobj.tags != undefined && fobj.tags.length > 0){
        $('#builder-form-comp-connect-tags').empty();
        $.each(fobj.tags, function(key, value){
            $('#builder-form-comp-connect-tags').append(`<span>${value}</span>`);
        });
    }
    if(fobj.relation != undefined && fobj.relation.length > 0){
        $('#builder-form-comp-connect-relations').empty();
        $.each(fobj.relation, function(key, value){
            $('#builder-form-comp-connect-relations').append(`<span>${value.filename}</span>`);
        });
    }
    if(fobj.connect != undefined && fobj.connect.length > 0){
        $('#builder-form-comp-connect-connections').empty();
        $.each(fobj.connect, function(key, value){
            $('#builder-form-comp-connect-connections').append(`<span>${value}</span>`);
        });
    }
    
    $('#builder-form-comp-view-properties').append(`
        <button id="builder-form-comp-view-properties-open" formid="${fid}" class="btn-shadow">OPEN FORM</button>   
    `);


    
    $('.builder-form-comp-view.properties').css('display', 'flex').show();
    $('.builder-form-comp-view.columncontainer').css('display', 'flex').show();
    // fill connections, childrens, parents

});
$(document).on('click', '#builder-form-comp-view-properties-open', function(){
    const formid = $(this).attr('formid');

    console.log(formid);
    openForm_handler(formid);
});



    // create view content header
$(document).on('click', '.builder-form-comp-create-view-widget-header-h', function(){
    const status = $(this).attr('status');
    if(status == "closed" || status == undefined){
        $(this).parent('.header').siblings('.values-con').css('display', 'flex').show();
        $(this).siblings('i').removeClass('fa-eye').addClass('fa-plus').attr('status', 'add');
        $(this).attr('status', 'open');
    }else if(status == "open"){
        $(this).parent('.header').siblings('.values-con').css('display', 'none').hide();
        $(this).siblings('i').removeClass('fa-plus').addClass('fa-eye').attr('status', 'idle');
        $(this).attr('status', 'closed');
    }

});
$(document).on('click', '.builder-form-comp-create-view-widget-header-a', function(){
    if($(this).hasClass('fa-plus')){
        let html = '<div class="values-widget">';
        let n = $('#builder-form-comp-create-columncount').val();
        for(i=0;i<n;i++){
            html += `<input type="text" value="">`;
        }
        html += `<i class="builder-form-comp-create-view-widget-content-d fas fa-trash"></i></div>`;
        $(this).parent('.header').siblings('.values-con').append(html);
    }else{
        $(this).siblings('.builder-form-comp-create-view-widget-header-h').click();
    }
});

    // create view header events
$(document).on('click', 'input[type="radio"][name="builder-form-header-type"]', function(){
    const ftype = $(this).attr('ftype');
    let n = $('#builder-form-comp-create-columncount').val();

    if(ftype == "datasheet"){
        const html = getDatasheetDefaultSheets(n);
        $('#builder-form-comp-create-view-widget-container').children('.content-widget').remove();
        $('#builder-form-comp-create-view-widget-container').prepend(html);
        $('#builder-form-comp-create-view-widget-container').children('.content-widget-notes').children('textarea').val("");

        $('#builder-form-comp-create-view-widget-container').children('.content-widget').droppable(builderFormDropOption);
    }else{
        $('#builder-form-comp-create-view-widget-container').children('.content-widget').remove();
        $('#builder-form-comp-create-view-widget-container').children('.content-widget-notes').children('textarea').val("");
    }
    
    $(`.builder-form-comp-create-view`).css('display', 'flex').show();
    $('.builder-form-comp-create-view-connect-h').removeClass('active');
    $('.builder-form-comp-create-view-connect-h[ts="current"]').addClass('active');
    
    $('.builder-form-comp-create-view-connect-content').hide();
    $('.builder-form-comp-create-view-connect-content.current').css('display', 'flex').show();
});
$(document).on('click', '#builder-form-comp-create-removecolumn', function(){
    let v = parseFloat($('#builder-form-comp-create-columncount').val());
    showToast("Tables on the left should adjust according to the value");
    
    if(v == 1){
        showToast("Columns cant be less than 1!");
    }else{
        if(redrawCellColumns(v - 1)){
            $('#builder-form-comp-create-columncount').val(v -= 1);
            // showToast("Tables on the left should adjust according to the value");
        };
    }
});
$(document).on('click', '#builder-form-comp-create-addcolumn', function(){
    let v = parseFloat($('#builder-form-comp-create-columncount').val());
    if(v > 5){
        showToast("Maximum Columns Reached!");
    }else{
        $('#builder-form-comp-create-columncount').val(v += 1);
        redrawCellColumns(v);
    }
});

    // create view content widget events
$(document).on('click', '.builder-form-comp-create-view-widget-content-d', function(){
    let errgate = false;

    $(this).siblings('input').each(function(){
        if($(this).val() != ""){
            errgate = true;
        }
    });

    console.log(errgate);
    if(errgate){
        const cbtrue =()=>{
            $(this).parent('.values-widget').remove();
        };
        showAction('There are values that will be deleted. Proceed?', cbtrue, ()=>{});
    }else{
        $(this).parent('.values-widget').remove();
    }
});
$(document).on('click', '#builder-form-comp-create-view-widget-add', function(){
    const name = $(this).siblings('input').val();
    let n = $('#builder-form-comp-create-columncount').val();

    function singleWidget(name, num){
        let inhtml = '';
        for(i=0; i<num;i++){
            inhtml += `<input type="text" value="">`;
            // inhtml += `<span class="builder-form-comp-create-content-cell"></span>`;
        }
        let inhtml1 = '';
        for(i=0; i<n;i++){
            inhtml1 += `<input class="builder-form-comp-create-content-header" placeholder="Header "/>`;
        }
        return `
            <div class="content-widget">
                <div class="header">
                    <span status="open" class="builder-form-comp-create-view-widget-header-h">${name}</span>
                    <i class="builder-form-comp-create-view-widget-header-a fas fa-plus"></i>
                </div>
                <div class="values-con ">
                    <div class="values-widget-header">
                        ${inhtml1}
                        <i></i>
                    </div>
                    <div class="values-widget">
                        ${inhtml}
                        <i class="builder-form-comp-create-view-widget-content-d fas fa-trash"></i>
                    </div>
                </div>
            </div>
        `
    }

    let html = singleWidget(name, n);
    $('#builder-form-comp-create-view-widget-container').prepend(html);
    $(this).siblings('input').val("");
});
$(document).on('click', '.builder-form-comp-create-content-cell', function(){
    $('#builder-form-comp-create-cellpopup').css('display', 'flex').show();
    $('#builder-form-comp-create-cellpopup-type').val("text");
    $(`#builder-form-comp-create-cellpopup-type-text`).css('display', 'flex').show();
    $(`#builder-form-comp-create-cellpopup-type-numeric`).hide();
});

    // create view tags events
function tagRemoveParent(e){
    $(e).parent('.widget').remove();
}
$(document).on('click', '#builder-form-comp-create-view-tag-add', function(){
    const v = $(this).siblings('input').val();

    if(v == ""){
        showToast("Please Input a proper Value");
    }else{
        $('#builder-form-comp-create-view-tag-container').append(`
            <div class="widget">
                <span>${v}</span>
                <i class="fas fa-trash" onclick="tagRemoveParent(this);" ></i>
            </div>
        `);
        $(this).siblings('input').val("");
    }
});

    // cellpopup events
$(document).on('change', '#builder-form-comp-create-cellpopup-type', function(){
    const v = $(this).val();
    $(`#builder-form-comp-create-cellpopup-type-text`).hide();
    $(`#builder-form-comp-create-cellpopup-type-numeric`).hide();
    $(`#builder-form-comp-create-cellpopup-type-${v}`).css('display', 'flex').show();
});
$(document).on('change', '#builder-form-comp-create-cellpopup-lock', function(){
    if($(this).is(':checked')){
        $(this).parent('label').html(`<input id="builder-form-comp-create-cellpopup-lock" type="checkbox" checked> Locked <i class="fas fa-lock"></i>`);
    }else{
        $(this).parent('label').html(`<input id="builder-form-comp-create-cellpopup-lock" type="checkbox"> Unlocked <i class="fas fa-unlock"></i>`);
    }
});
$(document).on('click', '#builder-form-comp-create-cellpopup-submit', function(){
    const obj = {
        type: $('#builder-form-comp-create-cellpopup-type').val(),
        name: $('#builder-form-comp-create-cellpopup-name').val(),
        measurement: $('#builder-form-comp-create-cellpopup-measurement').val(),
        content: {
            text: $('#builder-form-comp-create-cellpopup-text').val(),
            min: $('#builder-form-comp-create-cellpopup-min').val(),
            max: $('#builder-form-comp-create-cellpopup-max').val(),
            setpoint: $('#builder-form-comp-create-cellpopup-setpoint').val(),
        }
    }
    // console.log(obj);
    if(testFormObj(obj.content, obj.type)){
        if(obj.type == "numeric" && obj.measurement == ""){
            showToast("Please input a proper Measurement Unit.");
        }else{
            console.log("Carry ON");
        }
    }
});

    // search skids events
function addRelations(list){
    console.log(list);
    $('#builder-form-comp-create-view-connect-relation-container').children('.widget').each(function(){
        const fid = $(this).attr('fid');
        $.each(list, function(key, value){
            if(value.formid == fid){
                list[key].gate = false;
            }
        });
    });

    console.log(list);
    let gate = true;
    
    $.each(list, function(key, value){
        if(!value.gate && value.gate != undefined){
            showToast(`${value.filename} was already added`);
            gate = false;
        }else{
            $('#builder-form-comp-create-view-connect-relation-container').append(`
                <div fid="${value.formid}" class="widget">
                    <span>${value.filename}</span>
                    <button formid="${value.formid}"  fileid="${value.fileid}" class="btn-shadow builder-form-comp-create-view-connect-openf">Open</button>
                </div>
            `);
        }
    });

    if(gate){
        showToast("Relations Added!");
    }


}
$(document).on('click', '#builder-form-comp-create-view-connect-search-s', function(){
    const filenameGate = $('#builder-form-comp-create-view-connect-search-filename').is(':checked') ? true : false;
    const creatorGate = $('#builder-form-comp-create-view-connect-search-creator').is(':checked') ? true : false;
    const namesGate = $('#builder-form-comp-create-view-connect-search-names').is(':checked') ? true : false;
    const headersGate = $('#builder-form-comp-create-view-connect-search-headers').is(':checked') ? true : false;
    const propertiesGate = $('#builder-form-comp-create-view-connect-search-properties').is(':checked') ? true : false;
    const tagsGate = $('#builder-form-comp-create-view-connect-search-tags').is(':checked') ? true : false;
    const query = $(this).siblings('input').val();

    // console.log(filenameGate, creatorGate, namesGate, propertiesGate, datasheetGate, query);
    if(query == ""){
        showToast('Please Enter a Keyword');
        return;
    }
    function fillList(list){
        $('#builder-form-comp-create-view-connect-search-container').empty();
        $.each(list, function(key, value){
            let reporthtml = "";
            $.each(value.report, function(key, value1){
                reporthtml += value1;
                // console.log(value1);
            });
            $('#builder-form-comp-create-view-connect-search-container').append(`
                <div fileid="${value.fileid}" formid="${value.formid}" class="widget">
                    <label class="title"><input class="builder-form-comp-create-view-connect-search-cb" type="checkbox">${value.filename}</label>
                    <div class="wcontent ">
                        ${reporthtml}
                    </div>
                </div>
            `);
            // console.log(reporthtml);
        });
    }
    function unique(list) {
        var result = [];
        $.each(list, function (i, e) {
            var matchingItems = $.grep(result, function (item) {
                return item.id === e.id;
            });
            if (matchingItems.length === 0){
                result.push(e);
            }
        });
        return result;
    }

    const scfobj = SKID_FILE.getCompanyFiles();
    console.log(scfobj);
    let list = [];
    $.each(scfobj, function(key, value1){
        console.log(value1);
        if(value1.data.Form != undefined && value1.data.Form.length > 0){
            $.each(value1.data.Form, function(key, value){
                let report = [];
                const robj = {
                    filename : value.filename,
                    formid : value.formid,
                    fileid : value1.id,
                }
                let gate = false;
                if(filenameGate){
                    if(value.filename.toLowerCase().includes(query.toLowerCase())){
                        gate = true;
                        report.push(`<span>Filename Matched: ${value.filename} <label>from ${value1.filename}</label> </span>`);
                        
                    }
                }
                if(creatorGate){
                    if(value.creator.toLowerCase().includes(query.toLowerCase())){
                        gate = true;
                        report.push(`<span>Creator Matched: ${value.creator} <label>from ${value1.filename}</label> </span>`);
                        
                    }
                }
                if(namesGate){
                    $.each(value.content, function(key, value2){
                        if(value2.name.toLowerCase().includes(query.toLowerCase())){
                            gate = true;
                            report.push(`<span>Sheet Name Matched: ${value2.name} <label>from ${value1.filename}</label> </span>`);
                        }
                    });
                }
                if(headersGate){
                    $.each(value.content, function(key, value2){
                        $.each(value2.header, function(key, value3){
                            if(value3.toLowerCase().includes(query.toLowerCase())){
                                gate = true;
                                report.push(`<span>Headers Matched: ${value3} <label>from ${value1.filename}</label> </span>`);
                            }
                        });
                    });
                }
                if(propertiesGate){
                    $.each(value.content, function(key, value2){
                        if(value2.values != undefined && value2.values.length > 0){
                            $.each(value2.values, function(key, value3){
                                if(value3.values != undefined && value3.values.length > 0){
                                    $.each(value3.values, function(key, value4){
                                        if(value4.toLowerCase().includes(query.toLowerCase())){
                                            gate = true;
                                            report.push(`<span>Property Matched: ${value4} <label>from ${value1.filename}</label></span>`);
                                        }
                                    }); 
                                }
                            });
                        }
                    });
                }
                if(tagsGate){
                    if(value.tags != undefined && value.tags.length > 0){
                        $.each(value.tags, function(key, value2){
                            if(value2.toLowerCase().includes(query.toLowerCase())){
                                gate = true;
                                report.push(`<span>Tag Matched: ${value2} <label>from ${value1.filename}</label></span>`);
                            }
                        });
                    }
                }
                if(gate){
                    robj.report = report;
                    list.push(robj);
                }

            });
        }
    });

    // console.log(report);
    // if(report == ""){
    //     showToast("Nothing Found on Search");
    //     console.log('Nothing Found');
    //     // $('.skid-body-company-content-report').html("<span>NOTHING FOUND</span>").show();
    // }else{
    //     console.log('report');
    //     // $('.skid-body-company-content-report').html(report).show();
    // }

    console.log(list);
    if(list.length <= 0){
        showToast("Search showed empty results.. Please Try Again...");
    }

    
    fillList(list);


});
$(document).on('change', '.builder-form-comp-create-view-connect-search-cb', function(){
    const dis = $(this);
    if($(this).is(':checked')){
        const fileid = $(this).parent('.title').parent('.widget').attr('fileid');
        const formid = $(this).parent('.title').parent('.widget').attr('formid');
        // console.log(cid);
        let gate = false;
        const cb =data=>{
            // console.log(data);
            $.each(data, function(key, value){
                if(__ID == value.accountid){
                    gate = true;
                }
            });

            if(!gate){
                showToast("You Do not have Access to this Skid File, Please Request Access first.");
                dis.prop('checked', false);
            }
        };
        SKID_FILE.getCompanyFileAccess(fileid, cb);


        const fobj = SKID_FILE.getCompanyFileForm(fileid, formid);
        const curfid = $(`#builder-form-comp-create-filename`).attr('formid');
        // console.log(fobj.relation);
        $.each(fobj.relation, function(key, value){
            if(value.formid == curfid){
                showToast("The File You are trying to Connect is the parent of the Current Form.");
                dis.prop('checked', false);
            }
        });

    }
});
$(document).on('click', '#builder-form-comp-create-view-connect-search-submit', function(){
    let list = [];
    $('#builder-form-comp-create-view-connect-search-container').children('.widget').each(function(){
        if( $(this).children('.title').children('input').is(':checked') ){
            const obj = {
                filename: $.trim($(this).children('.title').text()),
                fileid: $(this).attr('fileid'),
                formid: $(this).attr('formid')
            }
            list.push(obj);
        }
    });


    console.log(list);
    addRelations(list);
});

    // create view search > open events
function fillViewConnectOpen(fileid, formid, refresh=false){
    let html = "";
    const data = SKID_FILE.getCompanyFileForm(fileid, formid);
    console.log('START');
    setTimeout(() => {
        showLoadingReport("Refreshing.. Please Wait");
    }, 0);

    $('#builder-form-comp-create-view-connect-searchopen-filename').text(data.filename).attr({
        fileid: fileid,
        formid: formid
    });
    $.each(data.content, function(key, value){
        html += `<span class="title">${value.name}</span>`;
        $.each(value.values, function(key, value1){
            // console.log(value1);
            if(value1.id != undefined){
                const obj = {
                    fileid: fileid,
                    formid: formid,
                    rowid: value1.id
                }
                const objstr = JSON.stringify(obj);
                html += `<div fileid="${fileid}" formid="${formid}" rowid="${value1.id}" ids="${objstr}" class="builder-form-comp-create-view-connect-open-widget widget">`;
                $.each(value1.values, function(key, value2){
                    html += `<span>${value2}</span>`;
                });
                html += "</div>"
            }else if(value1.link != undefined){
                // HELP HERE
                // console.log(fileid, formid, value1.link.rowid);
                const rowobj = SKID_FILE.getCompanyFileFormRow(value1.link.fileid, value1.link.formid, value1.link.rowid);
                // console.log(rowobj);

                // CHECK FILE ACCESS
                // accessok accesserror
                let accessstatus = '';
                let gate = false;
                const cb =data=>{
                    console.log('zzzz HELP',data);
                    $.each(data, function(key, value){
                        if(__ID == value.accountid){
                            gate = true;
                        }
                    });
        
                    if(!gate){
                        const farobj = SKID_FILE.getCompanyFileAccessRequest(value1.link.fileid, ()=>{});
                        let gate2 = false;
                        // console.log('HELP HERE',farobj);
                        $.each(farobj.data, function(key, value){
                            if(value.accountid == __ID){
                                gate2 = true;
                            }
                        });

                        if(gate2){
                            accessstatus = "accesspending";
                            showToast("Access is Pending....");
                        }else{
                            showToast("You do not have access to one or more Form Connections.");
                            accessstatus = "accesserror";
                        }
                    }else{
                        accessstatus = "accessok";
                    }
                };
                SKID_FILE.getCompanyFileAccess(value1.link.fileid, cb, refresh);
                
                html += `<div fileid="${value1.link.fileid}" formid="${value1.link.formid}" rowid="${value1.link.rowid}" title="Linked From ${value1.link.formid} Form" class="builder-form-comp-create-view-connect-open-widget widget link ${accessstatus}">`;
                // valueshtml += `<input type="text" value="${value1.link.fileid}">`;
                // let valuescount = 0;
                $.each(rowobj, function(key, value){
                    html += `<span>${value}</span>`;
                    // valuescount++;
                });
                // for(valuescount; valuescount<fobj.columncount;valuescount++){
                //     valueshtml += `<input type="text" value="" disabled>`;
                // }
                html += `</div>`;

            }
        });
    });


    
    
    console.log('END');
    $('#builder-form-comp-create-view-connect-searchopen-container').empty().append(html);
    $('.builder-form-comp-create-view-connect-open-widget').draggable(builderFormDragOption);

    setTimeout(() => {
        hideLoadingReport();
    }, 0);
}
$(document).on('click', '.builder-form-comp-create-view-connect-openf', function(){
    const formid = $(this).attr('formid');
    const fileid = $(this).attr('fileid');
    $('#builder-form-comp-create-view-connect-searchopen-filename').attr({
        formid,
        fileid
    });
    console.log(formid, fileid);
    // const fobj = OPEN_COMPONENT.getForm(fid);
    const cb =data=>{
        console.log(data);

    };
    fillViewConnectOpen(fileid, formid);


    $('.builder-form-comp-create-view-connect-content').hide();
    $('.builder-form-comp-create-view-connect-content.open').css('display', 'flex').show();
});
$(document).on('click', '#builder-form-comp-create-view-connect-searchopen-close', function(){
    $('.builder-form-comp-create-view-connect-content').hide();
    $('.builder-form-comp-create-view-connect-content.relations').css('display', 'flex').show();

});
$(document).on('click', '#builder-form-comp-create-view-connect-searchopen-refresh', function(){
    const formid = $('#builder-form-comp-create-view-connect-searchopen-filename').attr('formid');
    const fileid = $('#builder-form-comp-create-view-connect-searchopen-filename').attr('fileid');

    fillViewConnectOpen(fileid, formid, true);
});

$(document).on('dblclick', '.builder-form-comp-create-view-connect-open-widget', function(){
    console.log('test');
    const fileid = $(this).attr('fileid');
    const formid = $(this).attr('formid');

    if($(this).hasClass('accesserror')){
        console.log(fileid);
        const cb =data=>{
            console.log(data);
    
        };
        const sfaclass = SKID_FILE.getCompanyFile(fileid, cb);
        const callback =data=>{
            showToast("Successfully sent the Access Request.");
            setTimeout(() => {
                const formidz = $('#builder-form-comp-create-view-connect-searchopen-filename').attr('formid');
                const fileidz = $('#builder-form-comp-create-view-connect-searchopen-filename').attr('fileid');
                fillViewConnectOpen(fileidz, formidz);
            }, 100);
        };
        sfaclass.fileaccessrequest.create({
            'id': rngPassword(),
            'fileid': fileid,
            'accountid': __ID,
        }, callback, true);
    }else if($(this).hasClass('accesspending')){
        showToast("You Already Sent the Access Request for this Form.");
    }

});

$('.builder-form-comp-create-view-connect-open-widget').draggable(builderFormDragOption);
$('#builder-form-comp-create-view-widget-container').children('.content-widget').droppable(builderFormDropOption);










// BUILDER AREA FORMS EVENTS
function fillBuilderAreaForms(compid){
    const cobj = OPEN_COMPONENT.getFormByComponentId(compid);
    console.log(cobj);
    $('#builder-area-forms-formlist').children('.form').remove();
    $('#builder-area-forms-formvalues').children('.widget').remove();

    $.each(cobj, function(key, value){
        const fobj = OPEN_COMPONENT.getForm(value);
        $('#builder-area-forms-formlist').prepend(`<span formid="${value}" class="builder-area-forms-formlist-h form">${fobj.filename}</span>`);
    });

}
$(document).on('click', '#builder-area-forms-close', function(){
    $('#builder-area-forms').hide();
});
$(document).on('click', '.builder-area-forms-formlist-h', function(){
    const formid = $(this).attr('formid');

    console.log(formid);
    const fobj = OPEN_COMPONENT.getForm(formid);
    $('#builder-area-forms-formvalues').empty();

    $('.builder-area-forms-formlist-h').removeClass('active');
    $(this).addClass('active');

    $.each(fobj.content, function(key, value){
        let html = `<div class="widget">
        <span class="title">${value.name}</span>
        <div class="content">`;
        let headerhtml = `<div class="row header">`;
        let headercount = 0;
        $.each(value.header, function(key, value){
            headerhtml += `<span style="width: calc( (100% / ${fobj.columncount}) - 3px )" >${value}</span>`;
            headercount++;
        });
        for(headercount; headercount<fobj.columncount;headercount++){
            headerhtml += `<span style="width: calc( (100% / ${fobj.columncount}) - 3px )"></span>`;
        }
        headerhtml += `</div>`;
        html += headerhtml;

        
        $.each(value.values, function(key, value1){
            let valueshtml = "";
            if(value1.id != undefined){
                valueshtml += `<div rid="${value1.id}" class="row">`;
                let valuescount = 0;
                $.each(value1.values, function(key, value2){
                    valueshtml += `<span style="width: calc( (100% / ${fobj.columncount}) - 3px )">${value2}</span>`;
                    valuescount++;
                });
                for(valuescount; valuescount<fobj.columncount;valuescount++){
                    valueshtml += `<span style="width: calc( (100% / ${fobj.columncount}) - 3px )"></span>`;
                }
                valueshtml += `</div>`;
            }else if(value1.link != undefined){
                const rowobj = SKID_FILE.getCompanyFileFormRow(value1.link.fileid, value1.link.formid, value1.link.rowid);
                // console.log(rowobj);
                valueshtml += `<div fileid="${value1.link.fileid}" formid="${value1.link.formid}" rowid="${value1.link.rowid}" title="Linked From ${value1.link.formid} Form" class="row link">`;
                // valueshtml += `<input type="text" value="${value1.link.fileid}">`;
                let valuescount = 0;
                $.each(rowobj, function(key, value){
                    valueshtml += `<span style="width: calc( (100% / ${fobj.columncount}) - 3px )" >${value}</span>`;
                    valuescount++;
                });
                for(valuescount; valuescount<fobj.columncount;valuescount++){
                    valueshtml += `<span style="width: calc( (100% / ${fobj.columncount}) - 3px )"></span>`;
                }
                valueshtml += `</div>`;

            }
            html += valueshtml;
        });

        html += '</div></div>';

        // append
       $('#builder-area-forms-formvalues').append(html);
        
    });



});
$(document).on('click', '#builder-area-forms-formlist-addform', function(){
    const cb =()=>{
        showToast("Done Fetching Please Proceed");
        $('#builder-form-con').css('display', 'flex').show();
        $('#builder-form-a-create').show();
        $('#builder-form-a-view').show();
        $('#builder-form-a-close').show();
        $('#builder-area-forms').hide();
        $('#builder-form-a-create').click();

        const compid = $('#builder-area-forms').attr('componentid');
        $('.builder-form-comp-create-view-connect-h[ts="connections"]').attr('incoming', compid).attr('status', 'create');
        // $('#builder-form-comp-create-view-connect-connections-widgetcon').append(`
        //     <div class="widget">
        //         <img src="lib/images/skidicons/1.png">
        //         <span class="title">Unit Title</span>
        //         <i class="fas fa-link"></i>
        //     </div>
        // `);
    };
    fetchAllSkidFiles(cb);
});
$(document).on('click', '#builder-area-forms-edit', function(){
    let formid = '';
    $('.builder-area-forms-formlist-h').each(function(){
        if($(this).hasClass('active')){
            formid = $(this).attr('formid');
        }
    });

    console.log(formid);
    $('#builder-form-con').css('display', 'flex').show();
    $('#builder-form-a-create').show();
    $('#builder-form-a-view').show();
    $('#builder-form-a-close').show();
    $('#builder-area-forms').hide();
    openForm_handler(formid);
});





function list_dragg_info_params_type_h(e){
    console.log('hello',  $(e).val());
    if($(e).val() == "text"){
        $(e).siblings('.in').children('.values.text').css('display', 'flex').show();
        $(e).siblings('.in').children('.values.numeric').css('display', 'none').hide();
        $(e).siblings('span.lock-t').css('display', 'none').hide();
        $(e).siblings('.params-widget-new-lock').css('display', 'none').hide();
        $(e).siblings('.measurement').css('display', 'none').hide();
    }else if($(e).val() == "numeric"){
        $(e).siblings('.in').children('.values.numeric').css('display', 'flex').show();
        $(e).siblings('.in').children('.values.text').css('display', 'none').hide();
        $(e).siblings('span.lock-t').css('display', 'flex').show();
        $(e).siblings('.params-widget-new-lock').css('display', 'flex').show();
        $(e).siblings('.measurement').css('display', 'flex').show();
    }
    
}


// PROPERTIES INFO EVENTS
function resetPropertyUi(){
    $('#list-dragg-info-params-con').empty();
    $('#list-dragg-info-icon').attr('src', '');
    $('#list-dragg-info-actions-h').click();
}

$(document).on('click', '.list-info-dragg > .title', function(e){
    if($(e.target).hasClass("fa-times")){
        $(this).children('span').css('display', 'none').hide();
        $(this).siblings('.params-con').css('display', 'none').hide();
        $(this).siblings('img').css('display', 'none').hide();
        $(this).attr('status', "open");
        $(this).parent('.list-dragg').css('z-index', '100');
        $(this).children('.actions').children('.fa-save').css('display', 'none').hide();
        $(this).children('.actions').children('.fa-trash').css('display', 'none').hide();
        $('#list-dragg-info-actions-h').removeClass('fa-times').addClass('fa-sliders-h');
        $('#list-dragg-info').children('button').css('display', 'none').hide();
    }else{
        return;
    }
    // const status = $(this).attr('status');

    // if(status != "closed"){
    //     $(this).children('span').css('display', 'flex').show();
    //     $(this).siblings('.params-con').css('display', 'flex').show();
    //     $(this).siblings('img').css('display', 'flex').show();
    //     $(this).attr('status', "closed");
    //     $(this).parent('.list-dragg').css('z-index', '1000');
    //     $(this).children('.actions').children('.fa-save').css('display', 'flex').show();
    //     $(this).children('.actions').children('.fa-trash').css('display', 'flex').show();

    // }else{
    //     if($(e.target).hasClass("fa-times")){
    //         $(this).children('span').css('display', 'none').hide();
    //         $(this).siblings('.params-con').css('display', 'none').hide();
    //         $(this).siblings('img').css('display', 'none').hide();
    //         $(this).attr('status', "open");
    //         $(this).parent('.list-dragg').css('z-index', '100');
    //         $(this).children('.actions').children('.fa-save').css('display', 'none').hide();
    //         $(this).children('.actions').children('.fa-trash').css('display', 'none').hide();
    //         $('#list-dragg-info-actions-h').removeClass('fa-times').addClass('fa-sliders-h');
    //     }else{
    //         return;
    //     }
    // }
});
$(document).on('click', '#list-dragg-info-add', function(){
    $('#list-dragg-info-params-con').append(`
        <div class="params-widget-new">
            <span>Value Type</span>
            <select onChange="list_dragg_info_params_type_h(this);">
                <option value="text">Text</option>
                <option value="numeric">Numeric</option>
            </select>
            <span>Property Name</span>
            <input class="propname" type="text">
            <span class="measurement hidden">Measurement Unit</span>
            <input class="measurement hidden" type="text" placeholder="eg. k, kg, ml, cm, in, ft, sqft">
            <span>Proterty Value</span>
            <div class="in">
                <div class="values text ">
                    <input type="text" placeholder="Value">
                </div>
                <div class="values numeric hidden">
                    <input class="min" type="text" placeholder="Min Range">
                    <input class="max" type="text" placeholder="Max Range">
                    <input class="setpoint" type="text" placeholder="Set Point">
                </div>
            </div>
            <span>Show / Hide</span>
            <input type="checkbox">
            <span class="lock-t hidden">Lock / Unlock</span>
            <i status="unlocked" class="params-widget-new-lock hidden fas fa-lock-open"></i>
        </div>
    `);
});
$(document).on('click', '#list-dragg-info-submit', function(){
    const compid = $('#list-dragg-info').attr('compid');
    const suid = $('#list-dragg-info').attr('suid');
    const uid = $('#list-dragg-info').attr('uid');
    const type = compid.split('-')[0];
    function updateInfoUi(id){
        let propsobj, unitobj, iconobj;
        if(type == "CU"){
            propsobj = OPEN_COMPONENT.getUnitProps(id);
            unitobj = OPEN_COMPONENT.getUnitObj(id);
            // iconobj = ACCUSER.Skid.Icons.getUnitIconById(unitobj.icon);
            iconobj = SKID_DATA.Icons.getUnitIconById(unitobj.icon);
        }else if(type == "CE"){
            propsobj = OPEN_COMPONENT.getEquipmentProps(id);
            unitobj = OPEN_COMPONENT.getEquipmentObj(id);
            // iconobj = ACCUSER.Skid.Icons.getEquipmentIconById(unitobj.icon);
            iconobj = SKID_DATA.Icons.getEquipmentIconById(unitobj.icon);
        }

        $('#list-dragg-info-params-con').empty();
        $.each(propsobj, function(key, value){
            console.log(value.type);
            $('#list-dragg-info-params-con').append(`
                <div propid="${value.id}" class="params-widget">
                    <span>${value.name}</span>
                    <div class="in">
                        <div class="values text ${value.type == "text" ? "" : "hidden"}">
                            <input type="text" placeholder="Value" value="${value.content.text ? value.content.text : ""}">
                        </div>
                        <div class="values numeric ${value.type == "numeric" ? "" : "hidden"}">
                            <input class="min" type="text" placeholder="Min Range" value="${value.content.min ? value.content.min : ""}">
                            <input class="max" type="text" placeholder="Max Range" value="${value.content.max ? value.content.max : ""}">
                            <input class="setpoint" type="text" placeholder="Set Point" value="${value.content.setpoint ? value.content.setpoint : ""}">
                            <span class="measurement">${value.measurement}</span>
                        </div>
                        <div class="action">
                            <input type="checkbox" ${value.visible == "true" ? 'checked' : ""}>
                            ${value.type == "text" ? "" : `<i status="${value.lock}" class="params-widget-lock fas ${value.lock == "unlocked" ? "fa-lock-open" : "fa-lock"}"></i>`}
                            <i class="fas fa-trash"></i>
                        </div>
                    </div>
                </div>
            `);
        });
        $('#list-dragg-info-icon').attr('src', iconobj.url);
    }
    function testContent(obj, type){
        let gate = true;
        if(type == "numeric" && ( !isNum(obj.min) || !isNum(obj.max) || !isNum(obj.setpoint) ) ){
            showToast('Please Input a proper Min Max Set Point Value');
            gate = false;
        }
        if(type == "numeric" && (parseFloat(obj.setpoint) < parseFloat(obj.min)) || (parseFloat(obj.setpoint) > parseFloat(obj.max))  ){
            showToast('Set Point Value Should be within Min and Max');
            gate = false;
        }
        if(type == "numeric" && ( parseFloat(obj.max) <= parseFloat(obj.min) )  ){
            showToast('Max Value Should be Greater than Min Value');
            gate = false;
        }
        if(type == "numeric" && ( parseFloat(obj.min) >= parseFloat(obj.max) )  ){
            showToast('Min Value Should be Lesser than Max Value');
            gate = false;
        }
        if(type == "text" && obj.text == ""){
            showToast('Please Input a proper Value');
            gate = false;
        }
        return gate;
    }
    function getContentErrorMessage(obj, type){
        let ret = true;
        if(type == "numeric" && ( !isNum(obj.min) || !isNum(obj.max) || !isNum(obj.setpoint) ) ){
            ret = ('Please Input a proper Min Max Set Point Value');
        }
        if(type == "numeric" && (parseFloat(obj.setpoint) < parseFloat(obj.min)) || (parseFloat(obj.setpoint) > parseFloat(obj.max))  ){
            ret = ('Set Point Value Should be within Min and Max');
        }
        if(type == "numeric" && ( parseFloat(obj.max) <= parseFloat(obj.min) )  ){
            ret = ('Max Value Should be Greater than Min Value');
        }
        if(type == "numeric" && ( parseFloat(obj.min) >= parseFloat(obj.max) )  ){
            ret = ('Min Value Should be Lesser than Max Value');
        }
        if(type == "text" && obj.text == ""){
            ret = ('Please Input a proper Value');
        }
        return ret;
    }
    let errorGate = {
        gate: false,
        message: ""
    };

    $('#list-dragg-info-params-con').children().each(function(){
        if($(this).hasClass('params-widget')){
            console.log('Update Settings');
            const name = $(this).children('span').text();
            const lock = $(this).children('.in').children('.action').children('i.params-widget-lock').attr('status');
            console.log(lock);
            // const content = $(this).children('.in').children('input[type="text"]').val();
            const ptype = $(this).attr('type');
            
            const visible = $(this).children('.in').children('.action').children('input[type="checkbox"]').is(':checked') ? "true" : "false";
            const content = {
                "min" : ptype == "text" ? null : $(this).children('.in').children('.values.numeric').children('input.min').val(),
                "max" : ptype == "text" ? null : $(this).children('.in').children('.values.numeric').children('input.max').val(),
                "setpoint" : ptype == "text" ? null : $(this).children('.in').children('.values.numeric').children('input.setpoint').val(),
                "text" : ptype == "numeric" ? null : $(this).children('.in').children('.values.text').children('input').val()
            }
            // console.log(name, content, visible);
            console.log(testContent(content, ptype));
            if(testContent(content, ptype)){
                if(type == "CU"){
                    const options = {
                        'id' : $(this).attr('propid'),
                        'compid' : compid,
                        'unitid' : uid,
                        'subunitid' : suid,
                        'type' : ptype,
                        'lock' : lock,
                        'name' : name,
                        'content' : content,
                        'visible' : visible
                    }
                    console.log(options);
                    OPEN_COMPONENT.updateUnitProps(options);
                    OPEN_COMPONENT.drawUnit(options.compid);
                    updateInfoUi(options.compid);
                    showToast('Updated Unit Properties');
                }else if(type == "CE"){
                    const options = {
                        'id' : $(this).attr('propid'),
                        'compid' : compid,
                        'equipmentid' : uid,
                        'subequipmentid' : suid,
                        'type' : ptype,
                        'lock' : lock,
                        'name' : name,
                        'content' : content,
                        'visible' : visible
                    }
                    console.log(options);
                    OPEN_COMPONENT.updateEquipmentProps(options);
                    OPEN_COMPONENT.drawEquipment(options.compid);
                    updateInfoUi(options.compid);
                    showToast('Updated Equipment Properties');
                }
            }else{
                errorGate.gate = true;
                errorGate.message = getContentErrorMessage(content, ptype);
            }
        }else if($(this).hasClass('params-widget-new')){
            console.log('Create new Props');
            const name = $(this).children('input.propname').val();
            // const content = $(this).children('.in').children('input[type="text"]').val();
            const ptype = $(this).children('select').val();
            const measurement = ptype == "numeric" ? $(this).children('input.measurement').val() : null;
            const visible = $(this).children('input[type="checkbox"]').is(':checked') ? "true" : "false";
            const lock = $(this).children('.params-widget-new-lock').attr('status');
            console.log(visible);
            const content = {
                "min" : ptype == "text" ? null : $(this).children('.in').children('.values.numeric').children('input.min').val(),
                "max" : ptype == "text" ? null : $(this).children('.in').children('.values.numeric').children('input.max').val(),
                "setpoint" : ptype == "text" ? null : $(this).children('.in').children('.values.numeric').children('input.setpoint').val(),
                "text" : ptype == "numeric" ? null : $(this).children('.in').children('.values.text').children('input').val()
            }
            // console.log(name, content, visible);
            
            if(testContent(content, ptype)){
                if(type == "CU"){
                    const options = {
                        'compid' : compid,
                        'unitid' : uid,
                        'subunitid' : suid,
                        'type' : ptype,
                        'measurement' : measurement,
                        'lock' : lock,
                        'name' : name,
                        'content' : content,
                        'visible' : visible
                    }
                    console.log(options);
                    OPEN_COMPONENT.createUnitProps(options);
                    OPEN_COMPONENT.drawUnit(options.compid);
                    updateInfoUi(options.compid);
                    showToast('Created Unit Properties');
                }else if(type == "CE"){
                    const options = {
                        'compid' : compid,
                        'equipmentid' : uid,
                        'subequipmentid' : suid,
                        'type' : ptype,
                        'measurement' : measurement,
                        'lock' : lock,
                        'name' : name,
                        'content' : content,
                        'visible' : visible
                    }
                    console.log(options);
                    OPEN_COMPONENT.createEquipmentProps(options);
                    OPEN_COMPONENT.drawEquipment(options.compid);
                    updateInfoUi(options.compid);
                    showToast('Created Equipment Properties');
                }
            }else{
                errorGate = true;
                errorGate.message = getContentErrorMessage(content, ptype);
            }
            
        }
    });

    if(errorGate){
        showToast("There was a Problem with one or more of your Properties and were not saved. " + errorGate.message);
    }
    
    resetPropertyUi();  
    

});
$(document).on('click', '#list-dragg-info-forms', function(){
    const compid = $('#list-dragg-info').attr('compid');
    const cb =()=>{
        fillBuilderAreaForms(compid);
        $('#builder-area-forms').css('display', 'flex').show().attr('componentid', compid);
    };
    fetchAllSkidFiles(cb);
});
$(document).on('click', '#list-dragg-info-actions-delete', function(){

    const compid = $('#list-dragg-info').attr('compid');
    const suid = $('#list-dragg-info').attr('suid');
    const uid = $('#list-dragg-info').attr('uid');
    const type = compid.split('-')[0];

    function removeUI(idlist){
        $.each(idlist, function(key, value){
            const x = value.split('-')[0];
            if(x == "CE" || x == "CU"){
                $(`#${value}`).remove();
            }else if(x == "CET" || x == "CUT"){
                $(`#${value}_line`).remove();
                $(`#${value}_text`).remove();
                $(`#${value}_ar1`).remove();
                $(`#${value}_ar2`).remove();
            }
        });
    }
    // console.log('TESTING DELETE SHIT', compid);
    if(type == "CE"){
        const tpobj = OPEN_COMPONENT.getEquipmentTransferIdByUi(compid);
        if(tpobj.length > 0){
            // showToast('Has Transfer Parameter');
            const cbtrue =()=>{
                const robj = [...tpobj, compid];
                removeUI(robj);
                OPEN_COMPONENT.deleteEquipment(compid);
                console.log('equipment deleted');
                showToast("Equipment Deleted");
                resetPropertyUi();
            };
            showAction('The Attached Transfer Parameter will Also be deleted<br>Do you still wish to Proceed?', cbtrue, ()=>{});
        }else{
            const robj = [compid];
            removeUI(robj);
            OPEN_COMPONENT.deleteEquipment(compid);
            console.log('equipment deleted');
            showToast("Equipment Deleted");
            resetPropertyUi();
        }


    }else if(type == "CU"){
        const tpobj = OPEN_COMPONENT.getUnitTransferIdByUi(compid);
        const eqobj = OPEN_COMPONENT.getEquipmentObjsBySubUnitId(compid);
        let robj = [];

        if(eqobj.length > 0 || tpobj.length > 0){
            const cbtrue =()=>{
                if(tpobj.length > 0){
                    // showToast('Has Transfer Parameter');
                    robj = [...tpobj, compid];
                    $.each(eqobj, function(key, value){
                        robj.push(value.id);
                    });
                    removeUI(robj);
                    OPEN_COMPONENT.deleteUnit(compid);
                    resetPropertyUi();
                    console.log('Unit deleted');
                    showToast("Unit Deleted");
                }else{
                    const robj = [compid];
                    $.each(eqobj, function(key, value){
                        robj.push(value.id);
                    });
                    removeUI(robj);
                    OPEN_COMPONENT.deleteUnit(compid);
                    resetPropertyUi();
                    console.log('Unit deleted');
                    showToast("Unit Deleted");
                }
            };
            showAction('All SubEquipments and Transfer Parameter<br>in this Component will be deleted.<br>Do you still wish to Proceed?', cbtrue, ()=>{});
        }else{
            const robj = [compid];
            removeUI(robj);
            OPEN_COMPONENT.deleteUnit(compid);
            resetPropertyUi();
            console.log('Unit deleted');
            showToast("Unit Deleted");
        }


    }

    removeHeirarchyFromList(compid);
});
$(document).on('click', '#list-dragg-info-datasheet', function(){
    const compid = $('#list-dragg-info').attr('compid');
    const suid = $('#list-dragg-info').attr('suid');
    const uid = $('#list-dragg-info').attr('uid');
    const name = $('#list-dragg-info').attr('name');


    $('#builder-datasheet').css('display', 'flex').show();
    $('#builder-datasheet').children('.subtitle').text(name);

    $('#builder-datasheet-main.custom').remove();
    $('#builder-datasheet-main').each(function(){
        $(this).children('.widget-con').empty();
        $(this).children('textarea').val('');
    });
    $('#builder-datasheet').attr({
        'compid' : compid,
        'uid' : uid,
        'suid' : suid
    });




    // const dsobj = OPEN_COMPONENT.getDataSheet(compid);
    // $('#builder-datasheet-content').val(dsobj == undefined ? "" : dsobj.content);
    fillDataSheet(compid);
});
$(document).on('click', '.params-widget-new-lock', function(){
    const status = $(this).attr('status');
    if(status == "unlocked"){
        $(this).removeClass('fa-lock-open').addClass('fa-lock');
        $(this).attr('status', 'locked');
    }else{
        $(this).removeClass('fa-lock').addClass('fa-lock-open');
        $(this).attr('status', 'unlocked');
    }
});
$(document).on('click', '.params-widget-lock', function(){
    const status = $(this).attr('status');
    if(status == "unlocked"){
        $(this).removeClass('fa-lock-open').addClass('fa-lock');
        $(this).attr('status', 'locked');
    }else{
        $(this).removeClass('fa-lock').addClass('fa-lock-open');
        $(this).attr('status', 'unlocked');
    }
});
$(document).on('keyup', '.params-widget > .in > .values.numeric > input.setpoint, .params-widget-new > .in > .values.numeric > input.setpoint', function(){
    const min = parseFloat($(this).siblings('.min').val());
    const max = parseFloat($(this).siblings('.max').val());
    const v = parseFloat($(this).val());

    if(isNaN(min) || isNaN(max) || isNaN(v)){
        showToast("Please Make Sure all values are Numbers");
    }else{
        if(v >= min && v <= max){
            console.log('Values are okay');
            $(this).css('border', 'thin solid green');
        }else{
            showToast("Please Make Sure Value is within Min Max");
            $(this).css('border', 'thin solid red');
            // const z = $(this).val().slice(0, -1);
            // $(this).val(z);
        }
    }
});
$(document).on('focusout', '.params-widget > .in > .values.numeric > input.setpoint, .params-widget-new > .in > .values.numeric > input.setpoint', function(){
    const min = parseFloat($(this).siblings('.min').val());
    const max = parseFloat($(this).siblings('.max').val());
    const v = parseFloat($(this).val());

    if(isNaN(min) || isNaN(max) || isNaN(v)){
        showToast("Please Make Sure all values are Numbers");
    }else{
        if(v >= min && v <= max){
            console.log('Values are okay');
            $(this).css('border', '1px solid grey');
        }else{
            showToast("Please Make Sure Value is within Min Max");
            $(this).css('border', '1px solid grey');
            $(this).val('');
        }
    }
});


// TRANSFER PARAMETER EVENTS
$(document).on('click', '#builder-transferparameter', function(e){
    if(this != e.target){
        return;
    }else{
        $(this).hide();
        $('#builder-area').css('overflow', 'auto');
    }
});
$(document).on('click', '#builder-transferparameter-add', function(){
    $('#builder-transferparameter-container').append(`
        <div class="widget">
            <span class="title">Label</span>
            <input class="label" type="text">
            <span class="title">Value</span>
            <input class="value" type="text">
        </div>
    `);
});
$(document).on('click', '#builder-transferparameter-submit', function(){
    const uitype = $('#builder-transferparameter').attr('type');
    const ui1 = $('#builder-transferparameter').attr('ui1');
    const ui2 = $('#builder-transferparameter').attr('ui2');
    const parent = $('#builder-transferparameter').attr('parent');
    const name = $('#builder-transferparameter-name').val();
    const type = $('#builder-transferparameter-type').val();
    let props = [];
    $('#builder-transferparameter-container').children('.widget').each(function(){
        const obj = {
            "id" : rngComponentUnitTransferPropId(),
            "name" : $(this).children('input.label').val(),
            "content" : $(this).children('input.value').val()
        }
        props.push(obj);
    });

    const options = {
        "ui1" : ui1,
        "ui2" : ui2,
        "parent" : parent,
        "name" : name,
        "type" : type,
        "props" : props 
    }
    console.log(options);

    if(uitype == "unit"){
        const id = rngComponentUnitTransferId();
        options.id = id;
        OPEN_COMPONENT.createUnitTransfer(options);
    }else if(uitype == "equipment"){
        const id = rngComponentEquipmentTransferId();
        options.id = id;
        OPEN_COMPONENT.createEquipmentTransfer(options);
    }
    $('#builder-transferparameter').hide();
    $('#builder-area').css('overflow', 'auto');
});
$(document).on('click', '#builder-transferparameter-update', function(){
    const id = $('#builder-transferparameter').attr('trid');
    const uitype = $('#builder-transferparameter').attr('type');
    const ui1 = $('#builder-transferparameter').attr('ui1');
    const ui2 = $('#builder-transferparameter').attr('ui2');
    const parent = $('#builder-transferparameter').attr('parent');
    const name = $('#builder-transferparameter-name').val();
    const type = $('#builder-transferparameter-type').val();
    let props = [];
    $('#builder-transferparameter-container').children('.widget').each(function(){
        const obj = {
            "id" : rngComponentUnitTransferPropId(),
            "name" : $(this).children('input.label').val(),
            "content" : $(this).children('input.value').val()
        }
        props.push(obj);
    });

    const options = {
        "id" : id,
        "name" : name,
        "type" : type,
        "props" : props 
    }
    // console.log(options);
    if(uitype == "unit"){
        OPEN_COMPONENT.updateUnitTransfer(options);
    }else if(uitype == "equipment"){
        OPEN_COMPONENT.updateEquipmentTransfer(options);
    }
    $('#builder-transferparameter').hide();
    $('#builder-area').css('overflow', 'auto');
});
$(document).on('click', '.unit-transferparameter-h', function(){
    const transferid = $(this).attr('trid');
    const trobj = OPEN_COMPONENT.getUnitTransferObj(transferid);
    console.log(trobj);

    $('#builder-transferparameter').attr({
        "trid" : transferid,
        "type" : 'unit',
        "ui1" : trobj.ui1,
        "ui2" : trobj.ui2,
        "parent" : trobj.parent
    }).css('display', 'flex').show();
    $('#builder-transferparameter-name').val(trobj.name);
    $('#builder-transferparameter-type').val(trobj.type);

    $('#builder-transferparameter-container').empty();
    $.each(trobj.props, function(key, value){
        $('#builder-transferparameter-container').append(`
            <div class="widget">
                <span class="title">Label</span>
                <input class="label" type="text" value="${value.name}">
                <span class="title">Value</span>
                <input class="value" type="text" value="${value.content}">
            </div>
        `);
    });
    $('#builder-transferparameter-submit').hide();
    $('#builder-transferparameter-update').show();
    $('#builder-area').css('overflow', 'hidden');
});
$(document).on('click', '.equipment-transferparameter-h', function(){
    const transferid = $(this).attr('trid');
    const trobj = OPEN_COMPONENT.getEquipmentTransferObj(transferid);
    console.log(trobj);

    $('#builder-transferparameter').attr({
        "trid" : transferid,
        "type" : 'equipment',
        "ui1" : trobj.ui1,
        "ui2" : trobj.ui2,
        "parent" : trobj.parent
    }).css('display', 'flex').show();
    $('#builder-transferparameter-name').val(trobj.name);
    $('#builder-transferparameter-type').val(trobj.type);

    $('#builder-transferparameter-container').empty();
    $.each(trobj.props, function(key, value){
        $('#builder-transferparameter-container').append(`
            <div class="widget">
                <span class="title">Label</span>
                <input class="label" type="text" value="${value.name}">
                <span class="title">Value</span>
                <input class="value" type="text" value="${value.content}">
            </div>
        `);
    });
    $('#builder-transferparameter-submit').hide();
    $('#builder-transferparameter-update').show();
    $('#builder-area').css('overflow', 'hidden');
});

// UNIT WIDGET EVENTS
$(document).on('click', '.unit-widget-action-minimize', function(){
    const id = $(this).parent('.actions').parent('.unit-widget').attr('id');
    $(this).parent('.actions').hide();
    $(this).parent('.actions').siblings('legend').hide();
    $(this).parent('.actions').siblings('.params').hide();
    $(this).parent('.actions').siblings('.unit-widget-action-maximize').show();
    $(this).parent('.actions').siblings('.equipment-widget').hide();
    $(this).parent('.actions').parent('.unit-widget').css({
        "width" : "50px",
        "height" : "50px",
        "min-width" : "50px",
        "min-height" : "50px",
        "resize" : "none"
    }).attr('minimized', 'true');

    const trlist = OPEN_COMPONENT.getUnitTransferIdByUi(id);
    console.log(id, trlist);
    $.each(trlist, function(key, value){
        OPEN_COMPONENT.moveUnitTransfer(value);
    });
});
$(document).on('click', '.unit-widget-action-maximize', function(){
    $(this).siblings('.actions').show();
    $(this).siblings('legend').show();
    $(this).siblings('.params').show();
    // $(this).siblings('.actions').siblings('i').show();
    $(this).siblings('.equipment-widget').show();
    // const h = $(this).parent('.unit-widget').attr('h');
    // const w = $(this).parent('.unit-widget').attr('w');
    const id = $(this).parent('.unit-widget').attr('id');
    const unitobj = OPEN_COMPONENT.getUnitObj(id);
    console.log(unitobj);
    $(this).parent('.unit-widget').css({
        "width" : unitobj.width,
        "height" : unitobj.height,
        "min-width" : '250px',
        "min-height" : '150px',
        "resize" : "both"
    }).attr('minimized', 'false');
    $(this).hide();
    const trlist = OPEN_COMPONENT.getUnitTransferIdByUi(id);
    $.each(trlist, function(key, value){
        OPEN_COMPONENT.moveUnitTransfer(value);
    });
});
$(document).on('mousemove', '.unit-widget', function(e){
    $('.unit-widget').css('z-index', '99');
    $(this).css('z-index', '1000');
    if(e.target == this || $(e.target).hasClass('unit-widget-arrow-h') || $(e.target).hasClass('params') || $(e.target).hasClass('actions') || $(e.target).hasClass('actions-widget') || $(e.target).attr('id') == `${$(this).attr('id')}-svg`){
        $(this).children('.unit-widget-arrow-h').css('display', 'block').show();
        $(this).children('.actions').css('display', 'block').show();
    }else{
        $(this).children('.unit-widget-arrow-h').css('display', 'none').hide();
        $(this).children('.actions').css('display', 'none').hide();
    }
});
$(document).on('mouseleave', '.unit-widget', function(e){
    $(this).css('z-index', '100');
    // $(this).css('resize', 'none');
    // console.log('test');
    $(this).children('.unit-widget-arrow-h').each(function(){
        if(!$(this).hasClass('show')){
            $(this).css('display', 'none').hide();
        }
    });
    $(this).children('.actions').css('display', 'none').hide();
});
$(document).on('click', '.unit-widget-action-details', function(){
    const ui = $(this).parent('.actions').parent('.unit-widget');
    const id = ui.attr('id');
    const suid = ui.attr('suid');
    const uid = ui.attr('uid');
    const name = $(this).parent('.actions').siblings('legend').text();
    

    const propsobj = OPEN_COMPONENT.getUnitProps(id);
    // console.log(propsobj);
    const unitobj = OPEN_COMPONENT.getUnitObj(id);
    // const iconobj = ACCUSER.Skid.Icons.getUnitIconById(unitobj.icon);
    const iconobj = SKID_DATA.Icons.getUnitIconById(unitobj.icon);

    $('#list-dragg-info-params-con').empty();
    $.each(propsobj, function(key, value){
        console.log(value);
        $('#list-dragg-info-params-con').append(`
            <div propid="${value.id}" type="${value.type}" class="params-widget">
                <span>${value.name}</span>
                <div class="in">
                    <div class="values text ${value.type == "text" ? "" : "hidden"}">
                        <input type="text" placeholder="Value" value="${value.content.text ? value.content.text : ""}">
                    </div>
                    <div class="values numeric ${value.type == "numeric" ? "" : "hidden"}">
                        <input class="min" type="text" placeholder="Min Range" value="${value.content.min ? value.content.min : ""}">
                        <input class="max" type="text" placeholder="Max Range" value="${value.content.max ? value.content.max : ""}">
                        <input class="setpoint" type="text" placeholder="Set Point" value="${value.content.setpoint ? value.content.setpoint : ""}">
                        <span class="measurement">${value.measurement}</span>
                    </div>
                    <div class="action">
                        <input type="checkbox" ${value.visible == "true" ? 'checked' : ""}>
                        ${value.type == "text" ? "" : `<i status="${value.lock == undefined ? "unlocked" : value.lock }" class="params-widget-lock fas ${value.lock == "locked" ? "fa-lock" : "fa-lock-open"}"></i>`}
                        <i class="fas fa-trash"></i>
                    </div>
                </div>
            </div>
        `);
    });

    $('#list-dragg-info').children('.title').children('span').css('display', 'flex').show();
    $('#list-dragg-info').children('.params-con').css('display', 'flex').show();
    $('#list-dragg-info').children('button').css('display', 'block').show();
    $('#list-dragg-info').children('img').css('display', 'flex').show();
    $('#list-dragg-info').children('.title').attr('status', "closed");
    $('#list-dragg-info').css('z-index', '1000');
    $('#list-dragg-info').children('.title').children('.actions').children('.fa-save').css('display', 'flex').show();
    $('#list-dragg-info').children('.title').children('.actions').children('.fa-trash').css('display', 'flex').show();
    $('#list-dragg-info').children('.title').children('span').text(name);
    $('#list-dragg-info').attr({
        'compid' : id,
        'uid' : uid,
        'suid' : suid,
        'name' : name,
    });
    $('#list-dragg-info-actions-h').removeClass('fa-sliders-h').addClass('fa-times');
    $('#list-dragg-info-icon').attr('src', iconobj.url);

});
$(document).on('click', '.unit-widget-arrow-h', function(){
    // const uid = 'builder-area-page';
    const uid = $(this).parent('.unit-widget').parent('.builder-area-page').attr('id');
    if(!posUnitGate){
        posUnitEl.el1 = $(this).attr('id');
        $(this).addClass('show');
        posUnitGate = true;
        return;
    }
    if(posUnitGate){
        const ui1Id = `${posUnitEl.el1.split('-')[0]}-${posUnitEl.el1.split('-')[1]}`;
        console.log(ui1Id, $(this).attr('id'));
        if($(this).attr('id').includes(ui1Id)){
            console.log('cannot connec to self');
            $(`#${posUnitEl.el1}`).removeClass('show');
            posUnitEl.el1 = '';
            posUnitGate = false;
            return;
        }else{
            posUnitEl.el2 = $(this).attr('id');
            $(this).addClass('show');
            // drawArrowNew(posUnitEl.el1, posUnitEl.el2, uid);
            posUnitGate = false;
            $('#builder-transferparameter').attr({
                "type" : "unit",
                "ui1" : posUnitEl.el1,
                "ui2" : posUnitEl.el2,
                "parent" : uid
            }).css('display', 'flex').show();
            $('#builder-area').css('overflow', 'hidden');
            $('#builder-transferparameter-submit').show();
            $('#builder-transferparameter-update').hide();
            $('#builder-transferparameter-name').val("");
            $('#builder-transferparameter-type').val("single");
            $('#builder-transferparameter-container').empty();
            return;
        }
        
    }
});


// EQUIPMENT WIDGET EVENTS
$(document).on('mousemove', '.equipment-widget', function(e){
    $('.equipment-widget').css('z-index', '99');
    $(this).css('z-index', '1000');
    if(e.target == this || $(e.target).hasClass('equipment-widget-arrow-h') || $(e.target).hasClass('eqparams') ){
        $(this).children('.equipment-widget-arrow-h').css('display', 'block').show();
        $(this).children('.actions').css('display', 'block').show();
    }else{
        $(this).children('.equipment-widget-arrow-h').css('display', 'none').hide();
        $(this).children('.actions').css('display', 'none').hide();
    }
});
$(document).on('mouseleave', '.equipment-widget', function(){
    $(this).css({
        'z-index' : '100'
    });
    $(this).children('.equipment-widget-arrow-h').each(function(){
        if(!$(this).hasClass('show')){
            $(this).css('display', 'none').hide();
        }
    });
});
$(document).on('click', '.equipment-widget-action-details', function(){
    const ui = $(this).parent('.equipment-widget');
    const id = ui.attr('id');
    const suid = ui.attr('suid');
    const uid = ui.attr('uid');
    const name = $(this).text();
    

    const propsobj = OPEN_COMPONENT.getEquipmentProps(id);
    console.log(propsobj);
    const equipmentobj = OPEN_COMPONENT.getEquipmentObj(id);
    // const iconobj = ACCUSER.Skid.Icons.getEquipmentIconById(equipmentobj.icon);
    const iconobj = SKID_DATA.Icons.getEquipmentIconById(equipmentobj.icon);

    $('#list-dragg-info-params-con').empty();
    $.each(propsobj, function(key, value){
        // console.log(value.content);
        
        $('#list-dragg-info-params-con').append(`
            <div propid="${value.id}" class="params-widget">
                <span>${value.name}</span>
                <div class="in">
                    <div class="values text ${value.type == "text" ? "" : "hidden"}">
                        <input type="text" placeholder="Value" value="${value.content.text ? value.content.text : ""}">
                    </div>
                    <div class="values numeric ${value.type == "numeric" ? "" : "hidden"}">
                        <input class="min" type="text" placeholder="Min Range" value="${value.content.min ? value.content.min : ""}">
                        <input class="max" type="text" placeholder="Max Range" value="${value.content.max ? value.content.max : ""}">
                        <input class="setpoint" type="text" placeholder="Set Point" value="${value.content.setpoint ? value.content.setpoint : ""}">
                        <span class="measurement">${value.measurement}</span>
                    </div>
                    <div class="action">
                        <input type="checkbox" ${value.visible == "true" ? 'checked' : ""}>
                        ${value.type == "text" ? "" : `<i status="${value.lock == undefined ? "unlocked" : value.lock }" class="params-widget-lock fas ${value.lock == "locked" ? "fa-lock" : "fa-lock-open"}"></i>`}
                        <i class="fas fa-trash"></i>
                    </div>
                </div>
            </div>
        `);
    });

    $('#list-dragg-info').children('.title').children('span').css('display', 'flex').show();
    $('#list-dragg-info').children('.params-con').css('display', 'flex').show();
    $('#list-dragg-info').children('button').css('display', 'block').show();
    $('#list-dragg-info').children('img').css('display', 'flex').show();
    $('#list-dragg-info').children('.title').attr('status', "closed");
    $('#list-dragg-info').css('z-index', '1000');
    $('#list-dragg-info').children('.title').children('.actions').children('.fa-save').css('display', 'flex').show();
    $('#list-dragg-info').children('.title').children('.actions').children('.fa-trash').css('display', 'flex').show();
    $('#list-dragg-info').children('.title').children('span').text(name);
    $('#list-dragg-info').attr({
        'compid' : id,
        'uid' : uid,
        'suid' : suid,
    });
    $('#list-dragg-info-actions-h').removeClass('fa-sliders-h').addClass('fa-times');
    $('#list-dragg-info-icon').attr('src', iconobj.url);

});
$(document).on('click', '.equipment-widget-arrow-h', function(){
    const uid = $(this).parent('.equipment-widget').parent('.unit-widget').attr('id');
    if(!posEquipmentGate){
        posEquipmentEl.el1 = $(this).attr('id');
        $(this).addClass('show');
        posEquipmentGate = true;
        return;
    }
    if(posEquipmentGate){
        const ui1Id = `${posEquipmentEl.el1.split('-')[0]}-${posEquipmentEl.el1.split('-')[1]}`;
        // console.log(ui1Id, $(this).attr('id'));
        if($(this).attr('id').includes(ui1Id)){
            console.log('cannot connec to self');
            $(`#${posEquipmentEl.el1}`).removeClass('show');
            posEquipmentEl.el1 = '';
            posEquipmentGate = false;
            return;
        }else{
            posEquipmentEl.el2 = $(this).attr('id');
            $(this).addClass('show');
            // drawArrowNew(posEquipmentEl.el1, posEquipmentEl.el2, uid);
            posEquipmentGate = false;
            $('#builder-transferparameter').attr({
                "type" : "equipment",
                "ui1" : posEquipmentEl.el1,
                "ui2" : posEquipmentEl.el2,
                "parent" : uid
            }).css('display', 'flex').show();
            $('#builder-area').css('overflow', 'hidden');
            $('#builder-transferparameter-submit').show();
            $('#builder-transferparameter-update').hide();
            $('#builder-transferparameter-name').val("");
            $('#builder-transferparameter-type').val("single");
            $('#builder-transferparameter-container').empty();
            return;
        }
        
    }
});





// HEADER EVENTS
function setInitialHeaderState(){
    $('.builder-header-state-open').css('display', 'none').hide();
    $('.builder-header-state-init').css('display', 'flex').show();
}
function setOpenedHeaderState(){
    $('.builder-header-state-init').css('display', 'none').hide();
    $('.builder-header-state-open').css('display', 'flex').show();
}
$(document).on('click', '#builder-header-create', function(){
    const componentid = rngComponentId();
    $('#builder-area').attr('compid', componentid).css('display', 'flex').show();
    fillUnit();
    fillEquipment();
    // fillHeirarchy();
    clearBuilderAreaPage();
    OPEN_COMPONENT = new SkidComponent({"componentid" : componentid});
    OPEN_COMPONENT.updateCreator({
        "id" : __ID,
        "firstname" : __FIRST_NAME
    });
    setOpenedHeaderState();
});
$(document).on('click', '#builder-header-page', function(){
    $('#builder-pagesetup').css('display', 'flex').show();
    $('#builder-area').css('overflow', 'hidden');
});
$(document).on('click', '#builder-header-file', function(){
    $('#builder-fileoptions').css('display', 'flex').show();
    $('#builder-fileoptions-filename').val(OPEN_COMPONENT.filename);
});
$(document).on('click', '#builder-header-my', function(){
    fillMy();
    $('#builder-my').css('display', 'flex').show();
});
$(document).on('click', '#builder-header-close', function(){
    const sss = getUrlParams(window.location.href);
    

    if(OPEN_COMPONENT.isChanged){
        const cbtrue =()=>{
            $('#builder-area').hide();
            clearBuilderAreaPage();
            setInitialHeaderState();
            if(sss.viewonly != undefined && sss.viewonly == "true"){
                window.location.href = domain + `pages/builder/`;
            }
            
        };
        showAction('The Skid is currently not saved, any unsaved changes will be lost. Proceed?', cbtrue, ()=>{});
    }else{
        $('#builder-area').hide();
        clearBuilderAreaPage();
        setInitialHeaderState();
        if(sss.viewonly != undefined && sss.viewonly == "true"){
            window.location.href = domain + `pages/builder/`;
        }
    }
});
$(document).on('click', '#builder-header-print', function(){ // EDITED BY NOEL
    $('#builder-print').css('display', 'flex').show();
    OPEN_COMPONENT.setPrintImages();
    PreviewPrint();
});
$(document).on('click', '#builder-header-lock', function(){
    const state = $(this).attr('state');
    console.log(state);
    if(state == "locked"){
        $(this).removeClass('fa-lock').addClass('fa-unlock');
        $(this).attr('state', "unlocked");
        OPEN_COMPONENT.lock = "unlocked";
        OPEN_COMPONENT.updateChanged();
    }else{
        $(this).removeClass('fa-unlock').addClass('fa-lock');
        $(this).attr('state', "locked");
        OPEN_COMPONENT.lock = "locked";
        OPEN_COMPONENT.updateChanged();
    }
});
$(document).on('click', '#builder-header-report', function(){
    $('#builder-report').css('display', 'flex').show();

    const obj = {
        // "componentid": "COMP-752121206",
        // "filename": "Kaminari",
        // "fileid": "KukQauEz0cLwFFN",
        // "gridline": "show",
        // "orientation": "portrait",
        // "scroll": "vertical",
        // "pagesize": "letter",
        // "version": 7,
        // "creator": {
        //     "id": "noel",
        //     "firstname": "Noel"
        // },
        // "lastmodified": "2021-08-05T03:00:45.426Z",
        // "comparison_value": 1,
        // "isChanged": false,
        // "componentView": {
        //     "option1": "default",
        //     "option2": "all"
        // },
        // "lock": "locked",
        // "PrintProps": {},
        // "DataSheet": [],
        // "Form": [
        //     {
        //         "formid": "yz1WM0Kgfm43ksU",
        //         "filename": "Shotoroki",
        //         "type": "datasheet",
        //         "creator": "noel",
        //         "createdate": "2021-08-04 01:22:44",
        //         "modifydate": "2021-08-04 10:58:47",
        //         "columncount": 2,
        //         "content": [
        //             {
        //                 "name": "IDENTIFICATION",
        //                 "header": [
        //                     "AAA",
        //                     "AAA"
        //                 ],
        //                 "values": [
        //                     {
        //                         "id": "x8qwLYQOaxurH6c",
        //                         "values": [
        //                             "a",
        //                             "a"
        //                         ]
        //                     }
        //                 ]
        //             },
        //             {
        //                 "name": "SPECIFICATION",
        //                 "header": [
        //                     "BBB",
        //                     "BBB"
        //                 ],
        //                 "values": [
        //                     {
        //                         "id": "TqJ5NEDZroqgGzW",
        //                         "values": [
        //                             "b",
        //                             "b"
        //                         ]
        //                     }
        //                 ]
        //             },
        //             {
        //                 "name": "DOCUMENTATION",
        //                 "header": [
        //                     "CCC",
        //                     "CCC"
        //                 ],
        //                 "values": [
        //                     {
        //                         "id": "7iMy41Npbh6zrua",
        //                         "values": [
        //                             "c",
        //                             "c"
        //                         ]
        //                     }
        //                 ]
        //             },
        //             {
        //                 "name": "PROCESS DESCRIPTION",
        //                 "header": [
        //                     "DDD",
        //                     "DDD"
        //                 ],
        //                 "values": [
        //                     {
        //                         "id": "4iQ2fO6a0zBH2uN",
        //                         "values": [
        //                             "d",
        //                             "d"
        //                         ]
        //                     },
        //                     {
        //                         "link": {
        //                             "fileid": "lQNc4Yyni4PM1ao",
        //                             "formid": "LXt8249s50saOEj",
        //                             "rowid": "gmCdOROWilm9us8"
        //                         }
        //                     }
        //                 ]
        //             }
        //         ],
        //         "notes": "abcd",
        //         "connect": [
        //             "CU-210773544"
        //         ],
        //         "relation": [
        //             {
        //                 "fileid": "lQNc4Yyni4PM1ao",
        //                 "formid": "LXt8249s50saOEj",
        //                 "filename": "Optimus"
        //             },
        //             {
        //                 "fileid": "KukQauEz0cLwFFN",
        //                 "formid": "uW1waGH0yT4bDC6",
        //                 "filename": "OarMight"
        //             }
        //         ],
        //         "tags": [
        //             "abcd",
        //             "shoto",
        //             "todoroki"
        //         ]
        //     },
        //     {
        //         "formid": "uW1waGH0yT4bDC6",
        //         "filename": "OarMight",
        //         "type": "datasheet",
        //         "creator": "noel",
        //         "createdate": "2021-08-04 01:24:05",
        //         "modifydate": "2021-08-04 01:24:05",
        //         "columncount": 2,
        //         "content": [
        //             {
        //                 "name": "IDENTIFICATION",
        //                 "header": [
        //                     "QQQ",
        //                     "QQQ"
        //                 ],
        //                 "values": [
        //                     {
        //                         "id": "SxaAGjaTN1g3RkM",
        //                         "values": [
        //                             "q",
        //                             "q"
        //                         ]
        //                     },
        //                     {
        //                         "id": "J7q7NKWif1mflpg",
        //                         "values": [
        //                             "q1",
        //                             "q1"
        //                         ]
        //                     }
        //                 ]
        //             },
        //             {
        //                 "name": "SPECIFICATION",
        //                 "header": [
        //                     "WWW",
        //                     "WWW"
        //                 ],
        //                 "values": [
        //                     {
        //                         "id": "dxiI12vhsvTn1hv",
        //                         "values": [
        //                             "w",
        //                             "w"
        //                         ]
        //                     }
        //                 ]
        //             },
        //             {
        //                 "name": "DOCUMENTATION",
        //                 "header": [
        //                     "EEE",
        //                     "EEE"
        //                 ],
        //                 "values": [
        //                     {
        //                         "id": "n0K1cs68y7CwnIr",
        //                         "values": [
        //                             "e",
        //                             "e"
        //                         ]
        //                     }
        //                 ]
        //             },
        //             {
        //                 "name": "PROCESS DESCRIPTION",
        //                 "header": [
        //                     "RRR",
        //                     "RRR"
        //                 ],
        //                 "values": [
        //                     {
        //                         "id": "agMKSPgvRYAx9KJ",
        //                         "values": [
        //                             "r",
        //                             "rr"
        //                         ]
        //                     }
        //                 ]
        //             }
        //         ],
        //         "notes": "qwer",
        //         "connect": [],
        //         "relation": [],
        //         "tags": [
        //             "qwer",
        //             "All Might",
        //             "Oar",
        //             "Might"
        //         ]
        //     }
        // ],
        // "Pages": [
        //     "AXVr2drqXDY2K07"
        // ],
        // "ComponentHeirarchy": [
        //     "CU-210773544",
        //     "CU-653852346",
        //     "CE-254831227",
        //     "CE-660686648",
        //     "CE-130778321"
        // ],
        // "Unit": [
        //     {
        //         "id": "CU-210773544",
        //         "subunitid": "SSU-421461555",
        //         "unitid": "SU-753340582",
        //         "icon": "JNBuFFomN6i0kDA",
        //         "name": "Subunit1",
        //         "parent": "AXVr2drqXDY2K07",
        //         "top": 137,
        //         "left": 160,
        //         "height": "270px",
        //         "width": "430px"
        //     },
        //     {
        //         "id": "CU-653852346",
        //         "subunitid": "SSU-561211507",
        //         "unitid": "SU-753340582",
        //         "icon": "ByUGKYcX3U2G7s4",
        //         "name": "SubUnit2",
        //         "parent": "AXVr2drqXDY2K07",
        //         "top": 540,
        //         "left": 88,
        //         "height": "365px",
        //         "width": "590px"
        //     }
        // ],
        // "UnitTransfer": [
        //     {
        //         "id": "CUT-650642676",
        //         "ui1": "CU-210773544-arrow-bottom",
        //         "ui2": "CU-653852346-arrow-top",
        //         "parent": "AXVr2drqXDY2K07",
        //         "name": "Q",
        //         "type": "single",
        //         "props": [
        //             {
        //                 "id": "CUTP-322362577",
        //                 "name": "EEE",
        //                 "content": "ZZZ"
        //             }
        //         ]
        //     }
        // ],
        // "UnitProps": [
        //     {
        //         "id": "CUP-121533505",
        //         "compid": "CU-210773544",
        //         "unitid": "SU-753340582",
        //         "subunitid": "SSU-421461555",
        //         "type": "text",
        //         "name": "Process",
        //         "measurement": "",
        //         "content": {
        //             "text": "proc1"
        //         },
        //         "visible": "false"
        //     },
        //     {
        //         "id": "CUP-630232753",
        //         "compid": "CU-210773544",
        //         "unitid": "SU-753340582",
        //         "subunitid": "SSU-421461555",
        //         "type": "text",
        //         "name": "Tag",
        //         "measurement": "",
        //         "content": {
        //             "text": "tag1"
        //         },
        //         "visible": "false"
        //     },
        //     {
        //         "id": "CUP-035162155",
        //         "compid": "CU-210773544",
        //         "unitid": "SU-753340582",
        //         "subunitid": "SSU-421461555",
        //         "type": "numeric",
        //         "name": "Volume",
        //         "measurement": "L",
        //         "content": {
        //             "min": "12",
        //             "max": "43",
        //             "setpoint": "32"
        //         },
        //         "visible": "false"
        //     },
        //     {
        //         "id": "CUP-057063807",
        //         "compid": "CU-653852346",
        //         "unitid": "SU-753340582",
        //         "subunitid": "SSU-561211507",
        //         "type": "numeric",
        //         "name": "Volume",
        //         "measurement": "L",
        //         "content": {
        //             "min": "12",
        //             "max": "45",
        //             "setpoint": "25"
        //         },
        //         "visible": "false"
        //     }
        // ],
        // "Equipment": [
        //     {
        //         "id": "CE-254831227",
        //         "subunitid": "CU-210773544",
        //         "icon": "VtqQNdp7N922JIm",
        //         "name": "SubEquipment1",
        //         "top": 66,
        //         "left": 29,
        //         "height": "100px",
        //         "width": "200px"
        //     },
        //     {
        //         "id": "CE-660686648",
        //         "subunitid": "CU-653852346",
        //         "icon": "v3pGNtUyhvoVCaR",
        //         "name": "SubEquipment2",
        //         "top": 80,
        //         "left": 47,
        //         "height": "100px",
        //         "width": "200px"
        //     },
        //     {
        //         "id": "CE-130778321",
        //         "subunitid": "CU-653852346",
        //         "icon": "v3pGNtUyhvoVCaR",
        //         "name": "SubEquipment3",
        //         "top": 215,
        //         "left": 339,
        //         "height": "100px",
        //         "width": "200px"
        //     }
        // ],
        // "EquipmentTransfer": [],
        // "EquipmentProps": [
        //     {
        //         "id": "CEP-888666404",
        //         "compid": "CE-254831227",
        //         "type": "text",
        //         "name": "Process",
        //         "measurement": "",
        //         "content": {
        //             "text": "proc1"
        //         },
        //         "visible": "false"
        //     },
        //     {
        //         "id": "CEP-332634181",
        //         "compid": "CE-254831227",
        //         "type": "numeric",
        //         "name": "Area",
        //         "measurement": "sqft",
        //         "content": {
        //             "min": "12",
        //             "max": "43",
        //             "setpoint": "23"
        //         },
        //         "visible": "false"
        //     },
        //     {
        //         "id": "CEP-056224503",
        //         "compid": "CE-660686648",
        //         "type": "text",
        //         "name": "Process",
        //         "measurement": "",
        //         "content": {
        //             "text": "sag"
        //         },
        //         "visible": "false"
        //     },
        //     {
        //         "id": "CEP-101452713",
        //         "compid": "CE-660686648",
        //         "type": "numeric",
        //         "name": "Area",
        //         "measurement": "sqft",
        //         "content": {
        //             "min": "12",
        //             "max": "43",
        //             "setpoint": "32"
        //         },
        //         "visible": "false"
        //     },
        //     {
        //         "id": "CEP-544806133",
        //         "compid": "CE-130778321",
        //         "type": "numeric",
        //         "name": "Area",
        //         "measurement": "sqft",
        //         "content": {
        //             "min": "12",
        //             "max": "43",
        //             "setpoint": "40"
        //         },
        //         "visible": "false"
        //     }
        // ]
    }

    $('#builder-report-container').empty().append(OPEN_COMPONENT.report());
});








// BUILDER REPORT EVENTS
$(document).on('click', '#builder-report-close', function(){
    $('#builder-report').css('display', 'none').hide();
});
$(document).on('click', '#builder-report-print', function(){
    
    const cc = OPEN_COMPONENT.report();
    function print(content){
        
        // console.log(content);
        var windowFeatures = "clearcache=yes,width=1200 ,height=980";

        var win = window.open('', '',  windowFeatures);
        // console.log(domain);
        win.document.write(`
        <html>
            <head> 
               
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Pro Flow</title>
                <base href="${domain}" target="_self">
                <link href="lib/css/default.css" rel="stylesheet" /> 
                <link href="lib/css/builderreportprint.css" rel="stylesheet" /> 
    
                
            </head> 
            <body style="
                position:relative;
                overflow-y: scroll;
            "> `);
    
        win.document.write(content);
        win.document.write(`
                </body>
            </html>`);
        
    
        setTimeout(() => {
            setTimeout(() => {
            }, 0);
            win.print();
            win.close();
        }, 500);
    }
    setTimeout(() => {
        print(`<div id="builder-report-print">${cc}</div>`);
    }, 200);
});



// PAGE SETUP EVENTS
$(document).on('click', '#builder-pagesetup-submit', function(){
    let orientation = $('#builder-pagesetup-orientation-portrait').is(':checked') ? "portrait" : "landscape";
    let gridline = $('#builder-pagesetup-gridline-show').is(':checked') ? "show" : "hide";
    let scroll = $('#builder-pagesetup-scroll-vertical').is(':checked') ? "vertical" : "horizontal";

    let pagesize = "";
    if($('#builder-pagesetup-pagesize-letter').is(':checked')){
        pagesize = 'letter';
    }else if($('#builder-pagesetup-pagesize-afour').is(':checked')){
        pagesize = 'a4';
    }else if($('#builder-pagesetup-pagesize-legal').is(':checked')){
        pagesize = 'legal';
    }

    OPEN_COMPONENT.updateSettings({
        "gridline" : gridline,
        "orientation" : orientation,
        "pagesize" : pagesize,
        "scroll" : scroll,
    });


    showToast("Settings Applied");

    $('#builder-pagesetup').hide();
    $('#builder-area').css('overflow', 'auto');
    
});
$(document).on('click', '#builder-pagesetup', function(e){
    if(this != e.target){
        return;
    }else{
        $(this).hide();
        $('#builder-area').css('overflow', 'auto');
    }
});


// BUILDER DATASHEET EVENTS
function printSingleDatasheet(compid){
    const dsobj = OPEN_COMPONENT.getDataSheet(compid);
    let compobj;
    let compropobj;
    console.log(dsobj);
    let tag = "no tag";

    if(compid.split('-')[0] == "CE"){
        compobj = OPEN_COMPONENT.getEquipmentObj(compid);
        compropobj = OPEN_COMPONENT.getEquipmentProps(compid);
    }else if(compid.split('-')[0] == "CU"){
        compobj = OPEN_COMPONENT.getUnitObj(compid);
        compropobj = OPEN_COMPONENT.getUnitProps(compid);
    }

    $.each(compropobj, function(key, value){
        if(value.name.toLowerCase().includes("tag")){
            tag = value.content.text;
        }
    });

    let content = '';

    content += `
    <h2>DATASHEET INFORMATION</h2>
    <span style="color: black; font-size: 1.4em; font-weight: bold; ">${OPEN_COMPONENT.filename}</span>
    <span style="color: black; font-size: 1.2em; font-weight: bold; ">${compobj.name}</span>
    <span style="color: black;">${compid}</span>
    <span style="color: black;">${tag}</span>`;

    let a1Html = '';
    $.each(dsobj.content.identification, function(key, value){
        if(value.text == undefined){
            a1Html += `
            <tr>
                <td class="c30">${value.label}</td>
                <td class="c70">${value.value}</td>
            </tr>`
        }else{
            a1Html += `
            <tr>
                <td class="c100" colspan="2">${value.text}</td>
            </tr>`
        }
    });
    if(dsobj.content.identification.length > 0){
        content += `
        <h4 style="color: black; ">IDENTIFICATION</h4>
        <table>
            <colgroup>
                <col span="1" style="width: 30%;">
                <col span="1" style="width: 70%;">
            </colgroup>
            <thead>
                <tr>
                    <th>Label</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                ${a1Html}
            </tbody>
        </table>
        <br>
        `;
    }

    let a2Html = '';
    $.each(dsobj.content.specification, function(key, value){
        if(value.text == undefined){
            a2Html += `
            <tr>
                <td class="c30">${value.label}</td>
                <td class="c70">${value.value}</td>
            </tr>`
        }else{
            a2Html += `
            <tr>
                <td class="c100" colspan="2">${value.text}</td>
            </tr>`
        }
    });
    if(dsobj.content.specification.length > 0){
        content += `
        <h4 style="color: black; ">SPECIFICATION</h4>
        <table>
            <colgroup>
                <col span="1" style="width: 30%;">
                <col span="1" style="width: 70%;">
            </colgroup>
            <thead>
                <tr>
                    <th>Label</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                ${a2Html}
            </tbody>
        </table>
        <br>
        `;
    }

    let a3Html = '';
    $.each(dsobj.content.documentation, function(key, value){
        if(value.text == undefined){
            a3Html += `
            <tr>
                <td class="c30">${value.label}</td>
                <td class="c70">${value.value}</td>
            </tr>`
        }else{
            a3Html += `
            <tr>
                <td class="c100" colspan="2">${value.text}</td>
            </tr>`
        }
    });
    if(dsobj.content.documentation.length > 0){
        content += `
        <h4 style="color: black; ">DOCUMENTATION</h4>
        <table>
            <colgroup>
                <col span="1" style="width: 30%;">
                <col span="1" style="width: 70%;">
            </colgroup>
            <thead>
                <tr>
                    <th>Label</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                ${a3Html}
            </tbody>
        </table>
        <br>
        `;
    }

    let a4Html = '';
    $.each(dsobj.content.process, function(key, value){
        if(value.text == undefined){
            a4Html += `
            <tr>
                <td class="c30">${value.label}</td>
                <td class="c70">${value.value}</td>
            </tr>`
        }else{
            a4Html += `
            <tr>
                <td class="c100" colspan="2">${value.text}</td>
            </tr>`
        }
    });
    if(dsobj.content.process.length > 0){
        content += `
        <h4 style="color: black; ">PROCESS DESCRIPTION</h4>
        <table>
            <colgroup>
                <col span="1" style="width: 30%;">
                <col span="1" style="width: 70%;">
            </colgroup>
            <thead>
                <tr>
                    <th>Label</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                ${a4Html}
            </tbody>
        </table>
        <br>
        `;
    }

    $.each(dsobj.custom, function(key, value){
        let aHtml = '';
        $.each(value.content, function(key, value){
            if(value.text == undefined){
                aHtml += `
                <tr>
                    <td class="c30">${value.label}</td>
                    <td class="c70">${value.value}</td>
                </tr>`
            }else{
                aHtml += `
                <tr>
                    <td class="c100" colspan="2">${value.text}</td>
                </tr>`
            }
        });
        content += `
        <h4 style="color: black; ">${value.name}</h4>
        <table>
            <colgroup>
                <col span="1" style="width: 30%;">
                <col span="1" style="width: 70%;">
            </colgroup>
            <thead>
                <tr>
                    <th>Label</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                ${aHtml}
            </tbody>
        </table>
        <br>
        `;
    });


    content += `
    <h4 style="color: black; ">Notes</h4>
    <textarea>${dsobj.content.notes}</textarea>
    <br>
    `;


    printPageArea(`
        <div id="printcon-datasheet">
            ${content}
        </div>
    `);
}
function fillDataSheet(compid){
    const data = OPEN_COMPONENT.getDataSheet(compid);
    console.log(data);
    $('#builder-datasheet-identification').empty();
    $('#builder-datasheet-specification').empty();
    $('#builder-datasheet-documentation').empty();
    $('#builder-datasheet-process').empty();
    $('.builder-datasheet-main.custom').remove();
    $('#builder-datasheet-notes').val('');
    $('#builder-datasheet-addsheet-text').val('');
    if(data != undefined){
        $.each(data.content.identification, function(key, value){
            if(value.text == undefined){
                $('#builder-datasheet-identification').append(`
                    <div class="widget">
                        <div class="widget-param label">
                            <span class="label">Label</span>
                            <input type="text" value="${value.label}">
                        </div>
                        <div class="widget-param value">
                            <span class="label">Value</span>
                            <input type="text" value="${value.value}">
                        </div>
                    </div>
                `);
            }else{
                $('#builder-datasheet-identification').append(`
                    <div class="widget">
                        <div class="widget-param-single text">
                            <span class="label">Text</span>
                            <input type="text" value="${value.text}">
                        </div>
                    </div>
                `);
            }
        });

        $.each(data.content.specification, function(key, value){
            if(value.text == undefined){
                $('#builder-datasheet-specification').append(`
                    <div class="widget">
                        <div class="widget-param label">
                            <span class="label">Label</span>
                            <input type="text" value="${value.label}">
                        </div>
                        <div class="widget-param value">
                            <span class="label">Value</span>
                            <input type="text" value="${value.value}">
                        </div>
                    </div>
                `);
            }else{
                $('#builder-datasheet-specification').append(`
                    <div class="widget">
                        <div class="widget-param-single text">
                            <span class="label">Text</span>
                            <input type="text" value="${value.text}">
                        </div>
                    </div>
                `);
            }
        });

        $.each(data.content.documentation, function(key, value){
            if(value.text == undefined){
                $('#builder-datasheet-documentation').append(`
                    <div class="widget">
                        <div class="widget-param label">
                            <span class="label">Label</span>
                            <input type="text" value="${value.label}">
                        </div>
                        <div class="widget-param value">
                            <span class="label">Value</span>
                            <input type="text" value="${value.value}">
                        </div>
                    </div>
                `);
            }else{
                $('#builder-datasheet-documentation').append(`
                    <div class="widget">
                        <div class="widget-param-single text">
                            <span class="label">Text</span>
                            <input type="text" value="${value.text}">
                        </div>
                    </div>
                `);
            }
        });

        $.each(data.content.process, function(key, value){
            if(value.text == undefined){
                $('#builder-datasheet-process').append(`
                    <div class="widget">
                        <div class="widget-param label">
                            <span class="label">Label</span>
                            <input type="text" value="${value.label}">
                        </div>
                        <div class="widget-param value">
                            <span class="label">Value</span>
                            <input type="text" value="${value.value}">
                        </div>
                    </div>
                `);
            }else{
                $('#builder-datasheet-process').append(`
                    <div class="widget">
                        <div class="widget-param-single text">
                            <span class="label">Text</span>
                            <input type="text" value="${value.text}">
                        </div>
                    </div>
                `);
            }
        });

        $.each(data.custom, function(key, value){
            let propshtml = '';
            $.each(value.content, function(key, value){
                
                if(value.text == undefined){
                    propshtml += `
                        <div class="widget">
                            <div class="widget-param label">
                                <span class="label">Label</span>
                                <input type="text" value="${value.label}">
                            </div>
                            <div class="widget-param value">
                                <span class="label">Value</span>
                                <input type="text" value="${value.value}">
                            </div>
                        </div> 
                    `
                }else{
                    propshtml += `
                        <div class="widget">
                            <div class="widget-param-single text">
                                <span class="label">Text</span>
                                <input type="text" value="${value.text}">
                            </div>
                        </div>
                    `
                }
                
            });

            $('#builder-datasheet-container').append(`
                <div cname="${value.name}" class="builder-datasheet-main custom" status="closed">
                    <div class="header builder-datasheet-header-h">
                        <span class="title">${value.name.toUpperCase()}</span>
                        <i class="builder-datasheet-add fas fa-grip-lines hidden"></i>
                        <i class="builder-datasheet-addsingle fas fa-minus hidden"></i>
                    </div>
                    <div id="builder-datasheet-identification" class="widget-con hidden">
                        ${propshtml}
                    </div>
                </div>
            `);
            
        });



        $('#builder-datasheet-notes').val(data.content.notes);
    }

    
}
$(document).on('click', '#builder-datasheet-submit', function(){
    const compid = $('#builder-datasheet').attr('compid');
    const uid = $('#builder-datasheet').attr('uid');
    const suid = $('#builder-datasheet').attr('suid');
    // const content = $('#builder-datasheet-content').val();

    let content = {
        "identification" : [],
        "specification" : [],
        "documentation" : [],
        "process" : [],
        "notes" : '',
        
    };
    let custom = []

    $('#builder-datasheet-identification').children('.widget').each(function(){
        if($(this).children('div').hasClass('text') ){
            const object = {
                "text" : $(this).children('.widget-param-single.text').children('input').val(),
            }
            content.identification.push(object);
        }else{
            const object = {
                "label" : $(this).children('.widget-param.label').children('input').val(),
                "value" : $(this).children('.widget-param.value').children('input').val(),
            }
            content.identification.push(object);
        }
    });
    $('#builder-datasheet-specification').children('.widget').each(function(){
        if($(this).children('div').hasClass('text') ){
            const object = {
                "text" : $(this).children('.widget-param-single.text').children('input').val(),
            }
            content.specification.push(object);
        }else{
            const object = {
                "label" : $(this).children('.widget-param.label').children('input').val(),
                "value" : $(this).children('.widget-param.value').children('input').val(),
            }
            content.specification.push(object);
        }
    });
    $('#builder-datasheet-documentation').children('.widget').each(function(){
        if($(this).children('div').hasClass('text') ){
            const object = {
                "text" : $(this).children('.widget-param-single.text').children('input').val(),
            }
            content.documentation.push(object);
        }else{
            const object = {
                "label" : $(this).children('.widget-param.label').children('input').val(),
                "value" : $(this).children('.widget-param.value').children('input').val(),
            }
            content.documentation.push(object);
        }
    });
    $('#builder-datasheet-process').children('.widget').each(function(){
        if($(this).children('div').hasClass('text') ){
            const object = {
                "text" : $(this).children('.widget-param-single.text').children('input').val(),
            }
            content.process.push(object);
        }else{
            const object = {
                "label" : $(this).children('.widget-param.label').children('input').val(),
                "value" : $(this).children('.widget-param.value').children('input').val(),
            }
            content.process.push(object);
        }
    });
    content.notes = $('#builder-datasheet-notes').val();

    $('.builder-datasheet-main.custom').each(function(){
        let cobj = [];
        $(this).children('.widget-con').children('.widget').each(function(){

            if($(this).children('div').hasClass('text') ){
                const object = {
                    "text" : $(this).children('.widget-param-single.text').children('input').val(),
                }
                cobj.push(object);
            }else{
                const object = {
                    "label" : $(this).children('.widget-param.label').children('input').val(),
                    "value" : $(this).children('.widget-param.value').children('input').val(),
                }
                cobj.push(object);
            }
            
        });
        const obj = {
            "name" : $(this).attr('cname'),
            "content" : cobj
        }
        custom.push(obj);
    });
    
    const options = {
        "compid" : compid,
        "content" : content,
        "custom" : custom
    }
    console.log(options);
    OPEN_COMPONENT.createDatasheet(options);
    showToast('Datasheet Saved');

});
$(document).on('click', '#builder-datasheet-close', function(){
    $('#builder-datasheet').hide();
});
$(document).on('click', '#builder-datasheet-print', function(){
    const compid = $('#builder-datasheet').attr('compid');
    printSingleDatasheet(compid);
});
$(document).on('click', '#builder-datasheet', function(e){
    if(e.target != this){
        return;
    }else{
        $('#builder-datasheet').hide();
    }
});
$(document).on('click', '.builder-datasheet-header-h', function(e){
    const status = $(this).parent('.builder-datasheet-main').attr('status');
    let gate = false;
    if( e.target == this || $(e.target).hasClass('title') ){
        gate = true;
    }

    if(gate){
        if(status == "closed"){
            $(this).children('i').show();
            $(this).siblings('.widget-con').show();
            $(this).parent('.builder-datasheet-main').attr('status', 'open');
            if($(this).hasClass('notes')){
                $(this).siblings('textarea').show();
            }
        }else{
            $(this).children('i').hide();
            $(this).siblings('.widget-con').hide();
            $(this).parent('.builder-datasheet-main').attr('status', 'closed');
            if($(this).hasClass('notes')){
                $(this).siblings('textarea').hide();
            }
        }
    }
});
$(document).on('click', '.builder-datasheet-add', function(){
    $(this).parent('.header').siblings('.widget-con').append(`
        <div class="widget">
            <div class="widget-param label">
                <span class="label">Label</span>
                <input type="text">
            </div>
            <div class="widget-param value">
                <span class="label">Value</span>
                <input type="text">
            </div>
        </div>
    `);
});
$(document).on('click', '.builder-datasheet-addsingle', function(){
    $(this).parent('.header').siblings('.widget-con').append(`
        <div class="widget">
            <div class="widget-param-single text">
                <span class="label">Text</span>
                <input type="text">
            </div>
        </div>
    `);
});
$(document).on('click', '#builder-datasheet-addsheet-submit', function(){
    const id = rngSkidDataSheetCustomId();
    const name = $('#builder-datasheet-addsheet-text').val();
    
    $('#builder-datasheet-container').append(`
        <div cname="${name}" class="builder-datasheet-main custom" status="closed">
            <div class="header builder-datasheet-header-h">
                <span class="title">${name.toUpperCase()}</span>
                <i class="builder-datasheet-add fas fa-grip-lines hidden"></i>
                <i class="builder-datasheet-addsingle fas fa-minus hidden"></i>
            </div>
            <div id="builder-datasheet-custom-${id}" class="widget-con hidden">

            </div>
        </div>
    `);
});


// BUILDER FILEOPTIONS EVENTS
$(document).on('click', '#builder-fileoptions-close', function(){
    $('#builder-fileoptions').hide();
});
$(document).on('click', '#builder-fileoptions', function(e){
    if(e.target != this){
        return;
    }else{
        $('#builder-fileoptions').hide();
    }
});
$(document).on('click', '#builder-fileoptions-download', function(){
    const filename = $('#builder-fileoptions-filename').val();
    // OPEN_COMPONENT.version = OPEN_COMPONENT.version + 1;
    const jsonObj = OPEN_COMPONENT.export();
    console.log(jsonObj);
    const jsonStr = JSON.stringify(jsonObj);
    const encodedStringBtoA = btoa(jsonStr);
    console.log('encodedStringBtoA',encodedStringBtoA);


    $('#builder-fileoptions-a-download').attr({
        "href" : `data:application/octet-stream;charset=utf-8; txt, ${encodedStringBtoA}`,
        "download" : `${filename}.ceis`
    });
    OPEN_COMPONENT.updateFilename(filename);
    $('#builder-fileoptions-a-download')[0].click();
});
$(document).on('click', '#builder-fileoptions-save', function(){
    const fid = (OPEN_COMPONENT.fileid == null || OPEN_COMPONENT.fileid == undefined) ? rngSkidFileId() : OPEN_COMPONENT.fileid;
    if(__ID == OPEN_COMPONENT.creator.id){
        console.log(OPEN_COMPONENT.fileid, fid);
        const filename = $('#builder-fileoptions-filename').val();
        // OPEN_COMPONENT.version = OPEN_COMPONENT.version + 1;
        OPEN_COMPONENT.updateVersion();
        OPEN_COMPONENT.updateFilename(filename);
        OPEN_COMPONENT.updateModify();
        OPEN_COMPONENT.isChanged = false;
        let createGate = false;
        if(OPEN_COMPONENT.fileid == null){
            OPEN_COMPONENT.updateFileId(fid);
            createGate = true;
        }
        const jsonObj = OPEN_COMPONENT.export();
        const jsonStr = JSON.stringify(jsonObj);
        const encodedStringBtoA = btoa(jsonStr);

        const options = {
            'id' : fid,
            'ownerid' : __ID,
            'filename' : filename,
            'content' : encodedStringBtoA,
            'url' : `data/SkidFiles/${fid}.ceis`
        }
        const cbc =()=>{
            // console.log('saved file');
            showToast('saved file');
            $('#builder-fileoptions').hide();
            SKID_FILE.addFile(options);
            fillMy();
            // const obj = {
            //     'id' : options.id,
            //     'ownerid' : options.ownerid,
            //     'filename' : options.filename,
            // }
        };
        const cbu =()=>{
            // console.log('updated file');
            showToast('updated file');
            $('#builder-fileoptions').hide();
        };
        if(createGate){
            console.log(options);
            SKID_FILE.create(options, cbc);
        }else{
            console.log(options);
            SKID_FILE.update(options, cbu);
        }
    }else{
        showToast("You Do not Own this Project.");
    }


});

// BUILDER MY EVENTS
$(document).on('click', '#builder-my-close', function(){
    $('#builder-my').hide();
});
$(document).on('click', '#builder-my', function(e){
    if(e.target != this){
        return;
    }else{
        $('#builder-my').hide();
    }
});
$(document).on('click', '.builder-my-widget-open', function(){
    const fid = $(this).parent('.actions').parent('.widget').attr('fid');
    fillUnit();
    fillEquipment();
    $.get(`${domain}data/SkidFiles/${fid}.ceis`, function(res) {
        // console.log(res);
        var encodedStringAtoB = res;
        var decodedStringAtoB = atob(encodedStringAtoB);
        const decodedJSON = JSON.parse(decodedStringAtoB);
        console.log('decodedStringAtoB', decodedJSON);
        // const componentid = rngComponentId();
        setOpenedHeaderState();
        clearBuilderAreaPage();
        console.log(decodedJSON);
        OPEN_COMPONENT = new SkidComponent(decodedJSON);
        OPEN_COMPONENT.draw();
        $('#builder-area').attr('compid', decodedJSON.componentid).css('display', 'flex').show();
        fillHeirarchy();
    });
    $('#builder-my').hide();
});
$(document).on('click', '.builder-my-widget-delete', function(){
    const fid = $(this).parent('.actions').parent('.widget').attr('fid');
    const cb =()=>{
        showToast('File Deleted');
        fillMy();
    };
    SKID_FILE.delete({"id" : fid}, cb);
});



// BUILDER COMPONENT WATCHER EVENTS
function setComponentHeirarchy(){
    let list = [];
    $( "#builder-component-watcher-con" ).children('.builder-component-watcher-widget').each(function(){
        list.push($(this).attr('compid'));
    });
    OPEN_COMPONENT.setComponentHeirarchy(list);
}
function fillHeirarchy(){
    const hobj = OPEN_COMPONENT.getComponentHeirarchy();
    $( "#builder-component-watcher-con" ).empty();
    $.each(hobj, function(key, compid){
        addHeirarchyToList(compid);
    });
}
function addHeirarchyToList(compid){
    let comobj;
    let iconobj;

    if(compid.split('-')[0] == "CE"){
        comobj = OPEN_COMPONENT.getEquipmentObj(compid);
        iconobj = SKID_DATA.Icons.getEquipmentIconById(comobj.icon);
    }else if(compid.split('-')[0] == "CU"){
        comobj = OPEN_COMPONENT.getUnitObj(compid);
        iconobj = SKID_DATA.Icons.getUnitIconById(comobj.icon);
    }

    $( "#builder-component-watcher-con" ).append(`
        <div compid="${compid}" class="builder-component-watcher-widget">
            <img src="${iconobj.url}" alt="">
            <span>${comobj.name}</span>
        </div>
    `);
}
function removeHeirarchyFromList(compid){
    $( "#builder-component-watcher-con" ).children('.builder-component-watcher-widget').each(function(){
        if($(this).attr('compid') == compid){
            $(this).remove();
        }
    });
    setComponentHeirarchy();
}

$(document).on('click', '#builder-component-watcher-h', function(){
    const status = $(this).attr('status');
    if(status == "closed"){
        $('#builder-component-watcher').children('.hideui').css('display', 'flex').show();
        $(this).attr('status', "open");
    }else{
        $('#builder-component-watcher').children('.hideui').css('display', 'none').hide();
        $(this).attr('status', "closed");
    }
});
$( "#builder-component-watcher-con" ).sortable({
    placeholder : "builder-component-watcher-widget-highlight",
    containment :  $("#builder-component-watcher-con"),
    // handle : ".builder-component-watcher-widget"
    stop : function(event, ui){
        // let list = [];
        // $( "#builder-component-watcher-con" ).children('.builder-component-watcher-widget').each(function(){
        //     list.push($(this).children('span').text());
        // });
        setComponentHeirarchy();
        // console.log('test', list);
    }
});
$( "#builder-component-watcher-con" ).disableSelection();




//BUILDER COMPONENT VIEW EVENTS
$(document).on('click', '#builder-component-view-h', function(){
    const status = $(this).attr('status');
    if(status == "closed"){
        $('#builder-component-view').children('.hideui').css('display', 'flex').show();
        $(this).attr('status', "open");
    }else{
        $('#builder-component-view').children('.hideui').css('display', 'none').hide();
        $(this).attr('status', "closed");
    }
});
$(document).on('change', 'input[type=radio][name="builder-component-view-a"]', function(){
    const option = $(this).attr('id').split('-').pop();
    const dsoption = $('#builder-component-view-datasheet').is(":checked");
    OPEN_COMPONENT.setComponentViewOption1(option);

    if(option == "default"){

        OPEN_COMPONENT.ComponentView = 'default';
        clearBuilderAreaPage();
        OPEN_COMPONENT.draw();
        $('#builder-component-view-con').children('.hideui').css('display', 'none').hide();
    }else if(option == "icon"){

        OPEN_COMPONENT.ComponentView = 'icon';
        clearBuilderAreaPage();
        OPEN_COMPONENT.drawIcon(OPEN_COMPONENT.componentView.option2, dsoption);
        $('input[type=radio][name="builder-component-view-b"]').prop('checked', false);
        $(`#builder-component-view-comp-${OPEN_COMPONENT.componentView.option2}`).prop('checked', true);
        $('#builder-component-view-con').children('.hideui').css('display', 'flex').show();
    }
});
$(document).on('change', 'input[type=radio][name="builder-component-view-b"]', function(){
    const option = $(this).attr('id').split('-').pop();
    const dsoption = $('#builder-component-view-datasheet').is(":checked");
    OPEN_COMPONENT.setComponentViewOption2(option);
    // console.log(option);
    clearBuilderAreaPage();
    OPEN_COMPONENT.drawIcon(option, dsoption);
    $('#builder-component-view-con').children('.hideui').css('display', 'flex').show();
});
$(document).on('change', '#builder-component-view-datasheet', function(){
    const option = OPEN_COMPONENT.componentView.option2;
    const dsoption = $('#builder-component-view-datasheet').is(":checked");
    OPEN_COMPONENT.setComponentViewOption2(option);
    // console.log(option);
    clearBuilderAreaPage();
    OPEN_COMPONENT.drawIcon(option, dsoption);
    $('#builder-component-view-con').children('.hideui').css('display', 'flex').show();
});


// BUILDER PRINT PAGE EVENTS
function builder_print_browse(d){
    $(document).off('change', `#builder-print-${d}`); 
    $(document).on('change', `#builder-print-${d}`, function(e){
        console.log($(this).val().split('\\').pop());
        let filename = $(this).val().split('\\').pop();
        let extension = filename.split('.').pop();
        
        if(filename){
            // console.log(filename, extension);
            if(extension == "png" || extension == "jpeg" || extension == "jpg"){
                console.log('good to go');
                var reader = new FileReader();
                reader.onload = function(e){
                    if(d == "header-browse1"){
                        $('#builder-print-settings-header-img1').attr('src', reader.result );
                        // OPEN_COMPONENT.PrintHeaderImage1 = reader.result;
                    }if(d == "header-browse2"){
                        $('#builder-print-settings-header-img2').attr('src', reader.result );
                        // OPEN_COMPONENT.PrintHeaderImage2 = reader.result;
                    }if(d == "footer-browse1"){
                        $('#builder-print-settings-footer-img1').attr('src', reader.result );
                        // OPEN_COMPONENT.PrintFooterImage1 = reader.result;
                    }
                };
                reader.readAsDataURL(this.files[0]);

            }else{
                showToast("File Selected is not supported! Please select (.png, .jpeg, .jpg) ");
            }
            PreviewPrint();
        }else{
            console.log('cancelled');
        }
        
    });
}
function builder_print_settings_layout_image_h(e){
    $(e).siblings('input').click();
    const tid = $(e).siblings('input').attr('tid');
    
    if(tid == "1" || tid == "3" || tid == "5"){
        $('#builder-print-settings-img2').css('display', 'flex').show();
    }else{
        $('#builder-print-settings-img2').css('display', 'none').hide();
    }

    PreviewPrint();
}
function builder_print_settings_layout_image_f(e){
    $(e).siblings('input').click();
    const tid = $(e).siblings('input').attr('tid');
    
    PreviewPrint();
}
function headerLayout(options){

    return `
    <div class="header layout${options.layout}">
        ${options.layout == "4" ? "" : `<img src="${options.layout == "5" ? options.img2 : options.img1}" alt="">`}
        <div class="titlecon">
            <span class="title">${options.title}</span>
            <span class="subtitle">${options.subtitle}</span>
            <span class="mintitle">${options.mintitle}</span>
        </div>
        ${options.layout != "2" ? `<img src="${options.layout == "4" || options.layout == "5" ? options.img1 : options.img2}" alt="">` : ""}
    </div>`
}
function footerLayout(options){
    return `
    <div class="footer layout${options.layout}">
        <span class="title">${options.title}</span>
        ${options.layout == "2" ? `<img src="${options.img}" alt="">` : ""}
    </div>`
}
function getUserHeaderImage1(){
    $.ajax({
        // url : '../../lib/images/printimages/' + __ID + '.*',
        url : 'lib/images/printlayouts/footer1.*',
        type:'HEAD',
        error: function(e, r){
            //file not exists
            console.log('The file does not exist');
        },success: function(data){
            //file exists
            console.log('The file exists');
        }
    });

    // // Open a log file
    // var myLog = new File('../../lib/images/printimages/' + __ID + '.*', null);
    // // See if the file exists
    // if(myLog.exists()){
    //     console.log('The file exists');
    // }else{
    //     console.log('The file does not exist');
    // }
}


function PreviewPrint(){
    $('#builder-print-preview-container').empty();
    const layouth = $('input[type="radio"][name="builder-print-settings-layout"]:checked').attr('tid');
    const layoutf = $('input[type="radio"][name="builder-print-settings-layout-f"]:checked').attr('tid');

    const headeroptions = {
        visible : "true",
        layout : layouth,
        img1 : OPEN_COMPONENT.PrintProps.PrintHeaderImage1 == undefined ? "https://via.placeholder.com/150x70.png?text=No+Image+Selected" : OPEN_COMPONENT.PrintProps.PrintHeaderImage1,
        img2 : OPEN_COMPONENT.PrintProps.PrintHeaderImage2 == undefined ? "https://via.placeholder.com/150x70.png?text=No+Image+Selected" : OPEN_COMPONENT.PrintProps.PrintHeaderImage2,
        title : $('#builder-print-settings-header-title').val(),
        subtitle : $('#builder-print-settings-header-subtitle').val(),
        mintitle : $('#builder-print-settings-header-mintitle').val(),
    }
    // console.log(headeroptions);
    const footeroptions = {
        visible : "true",
        layout : layoutf,
        img : OPEN_COMPONENT.PrintProps.PrintFooterImage1 == undefined ? "https://via.placeholder.com/50x50.png?text=No+Image+Selected" : OPEN_COMPONENT.PrintProps.PrintFooterImage1,
        title : $('#builder-print-settings-footer-title').val(),
    }

    $('#builder-print-preview-container').append(`
        ${OPEN_COMPONENT.PrintProps.HeaderVisibility ? headerLayout(headeroptions) : ""}
        ${OPEN_COMPONENT.PrintProps.FooterVisibility ?  footerLayout(footeroptions) : ""}
    `);

}

$(document).on('click', '#builder-print-close', function(){
    $('#builder-print').hide();
});
$(document).on('click', '#builder-print', function(e){
    if(e.target != this){
        return;
    }else{
        $('#builder-print').hide();
    }
});
$(document).on('click', '#builder-print-header-save', function(){
    const options = {
        PrintHeaderImage1 : $('#builder-print-settings-header-img1').attr('src'),
        PrintHeaderImage2 : $('#builder-print-settings-header-img2').attr('src'),

        PrintHeaderTitle : $('#builder-print-settings-header-title').val(),
        PrintHeaderSubTitle : $('#builder-print-settings-header-subtitle').val(),
        PrintHeaderMinTitle : $('#builder-print-settings-header-mintitle').val(),
        HeaderLayout : $('input[type="radio"][name="builder-print-settings-layout"]:checked').attr('tid')
    }
    console.log(options);
    OPEN_COMPONENT.savePrintPropsHeader(options);
    OPEN_COMPONENT.drawPageHeaderFooter();
    PreviewPrint();

});
$(document).on('click', '#builder-print-footer-save', function(){
    const options = {
        PrintFooterImage1 : $('#builder-print-settings-footer-img1').attr('src'),
        PrintFooterTitle : $('#builder-print-settings-footer-title').val(),
        FooterLayout : $('input[type="radio"][name="builder-print-settings-layout-f"]:checked').attr('tid')
    }
    console.log(options);
    OPEN_COMPONENT.savePrintPropsFooter(options);
    OPEN_COMPONENT.drawPageHeaderFooter();
    PreviewPrint();
});
$(document).on('click', '.builder-print-settings-header-h', function(){
    $('.builder-print-settings-header-h').removeClass('active');
    $(this).addClass('active');
    if($(this).text() == "Header"){
        $('.builder-print-settings-body.header').css('display', 'flex').show();
        $('.builder-print-settings-body.footer').css('display', 'none').hide();
    }else{
        $('.builder-print-settings-body.footer').css('display', 'flex').show();
        $('.builder-print-settings-body.header').css('display', 'none').hide();
    }
});
$(document).on('change', '#builder-print-preview-header-visibility', function(){
    if($(this).is(':checked')){
        OPEN_COMPONENT.PrintProps.HeaderVisibility = true;
    }else{
        OPEN_COMPONENT.PrintProps.HeaderVisibility = false;
    }
    OPEN_COMPONENT.updateChanged();
    PreviewPrint();
});
$(document).on('change', '#builder-print-preview-footer-visibility', function(){
    if($(this).is(':checked')){
        OPEN_COMPONENT.PrintProps.FooterVisibility = true;
    }else{
        OPEN_COMPONENT.PrintProps.FooterVisibility = false;
    }
    OPEN_COMPONENT.updateChanged();
    PreviewPrint();
});

$(document).on('click', '#builder-print-preview-print', function(){
    if(OPEN_COMPONENT.pagesize.includes('letter')){
        if(OPEN_COMPONENT.orientation.includes('portrait')){
            height = '11in';
            width = '8.5in';
        }
        else{
            width = '11in';
            height = '8.5in';
        }
    }
    else if(OPEN_COMPONENT.pagesize.includes('a4')){
        if(OPEN_COMPONENT.orientation.includes('portrait')){
            height = '11.75in';
            width = '8.25in';
        }
        else{
            width = '11.75in';
            height = '8.25in';
        }
        console.log('Page Size: A4');
    } 
    else if(OPEN_COMPONENT.pagesize.includes('legal')){
        if(OPEN_COMPONENT.orientation.includes('portrait')){
            height = '14in';
            width = '8.5in';
        }
        else{
            width = '14in';
            height = '8.5in';
        }
    }

    let content = '';

    if(OPEN_COMPONENT.ComponentView == 'icon'){
        $('#builder-area').children('.builder-area-page-single').each(function(){
            content += `
            <div class="builder-area-page-single" style="
            width: ${width};
            height: auto;
            background-color: white;
            border: none;
            position: relative;
            margin: 0px;
            background-image: none;
            resize: none;
            z-index: 0;
            ">
                ${$(this).html()}
            </div>`;
            ;
            // console.log($(this).html());
        });
    }else{
        $('#builder-area').children('.builder-area-page').each(function(){
            content += `
            <div class="builder-area-page-print" style="
            width: ${width};
            height: ${height};
            background-color: white;
            border: none;
            position: relative;
            margin: 0px;
            background-image: none;
            resize: none;
            overflow: hidden;
            z-index: 0;
            ">
                ${$(this).html()}
            </div>`;
            ;
        });
    }

    

    // console.log(content);
    const options = {
        layout : OPEN_COMPONENT.PrintProps.HeaderLayout,
        img1 : OPEN_COMPONENT.PrintProps.PrintHeaderImage1 == undefined ? "https://via.placeholder.com/150x70.png?text=No+Image+Selected" : OPEN_COMPONENT.PrintProps.PrintHeaderImage1,
        img2 : OPEN_COMPONENT.PrintProps.PrintHeaderImage2 == undefined ? "https://via.placeholder.com/150x70.png?text=No+Image+Selected" : OPEN_COMPONENT.PrintProps.PrintHeaderImage2,
        title : OPEN_COMPONENT.PrintProps.PrintHeaderTitle,
        subtitle : OPEN_COMPONENT.PrintProps.PrintHeaderSubTitle,
        mintitle : OPEN_COMPONENT.PrintProps.PrintHeaderMinTitle,
    }
    const headerhtml = headerLayout(options);
    // console.log(headerhtml);
    const foptions = {
        layout : OPEN_COMPONENT.PrintProps.FooterLayout,
        img : OPEN_COMPONENT.PrintProps.PrintFooterImage1 == undefined ? "https://via.placeholder.com/150x70.png?text=No+Image+Selected" : OPEN_COMPONENT.PrintProps.PrintHeaderImage1,
        title : OPEN_COMPONENT.PrintProps.PrintFooterTitle,
    }
    const footerhtml = footerLayout(foptions);
    // console.log(footerhtml);

    printPageArea(`
    <div id="printcon" 
    style="
    height: auto;
    width: 100vw;
    display: flex;
    flex-direction: column;
    position: relative;
    ">
        <div class="builder-area-page-print">
            ${OPEN_COMPONENT.ComponentView == 'icon' && OPEN_COMPONENT.PrintProps.HeaderVisibility ? headerhtml : ""}
        </div>

        ${content}

        <div class="builder-area-page-print">
            ${OPEN_COMPONENT.ComponentView == 'icon' && OPEN_COMPONENT.PrintProps.FooterVisibility ? footerhtml : ""}
        </div>
    </div>
    `);



});




// BUILDER COMPARE EVENTS
function drawTablezzzzzz(components){
    $('#builder-area-compare-form-tbody').empty();
    let xo = 0;
    function isOdd(num) { return num % 2;}
    let html = '';
    $.each(components, function(key, value){
        let propobj;
        let compobj;

        if(value.split('-')[0] == "CU"){
            propobj = OPEN_COMPONENT.getUnitProps(value);
            compobj = OPEN_COMPONENT.getUnitObj(value);
        }else if(value.split('-')[0] == "CE"){
            propobj = OPEN_COMPONENT.getEquipmentProps(value);
            compobj = OPEN_COMPONENT.getEquipmentObj(value);
        }

        let x = 0;
        // console.log(propobj);
        // if(propobj[0].compid == "CU-285865388"){
        //     console.log('its this one', propobj);
        // }
        // console.log(propobj);
        $.each(propobj, function(key, value){
            // if(value.compid == "CU-285865388"){
            //     console.log('its this one', value);
            // }

            let td = '';
            if(x == 0){
                td += `<td ${isOdd( parseFloat(xo) ) ? `class="grey"` : "" } rowspan="${propobj.length}">${compobj.name}</td>`;
            };

            // console.log(value.id);
            
            td += `<td class=" ${isOdd( parseFloat(xo) ) ? `grey` : "" }"><input class="init" type="text" value="${value.name}" disabled></td>`
            td += `<td id="${value.id}_editor" ${value.type == "numeric" ? `cid="${value.id}"` : ""} ${value.type == "numeric" ? `cval="${value.content.min}"` : ""} ${value.type == "numeric" ? `cname="${value.name}"` : ""} class="editor-init-element ${value.type == "numeric" ? "editor-cell" : "" } ${isOdd( parseFloat(xo) ) ? `grey` : "" }"><input class="init" type="text" value="${value.type == "text" ? value.content.text : `${value.content.min} ${value.measurement} - ${value.content.max} ${value.measurement}`}" ${value.type == "text" ? "disabled" : value.lock == "locked" ? "disabled" : "" }>${value.type == "text" ? "" : value.lock == "locked" ? `<i class="fas fa-lock"></i>` : `<i class="fas fa-lock-open"></i>` } </td>`;

            if(value.compare1){
                // if(value.compid == "CU-285865388"){
                //     console.log('its this one inside compare1', value);
                // }
                // console.log('inside compare1', value.compare1);
                let fvalue;
                if(value.compare1.type == "text"){
                    fvalue = value.compare1.params[0];
                }else if(value.compare1.type == "operation"){
                    let opval = [];
                    let fcvalue = 0;
                    $.each(value.compare1.params, function(key, value){
                        if(value.includes('CUP')){
                            const pobj = OPEN_COMPONENT.getUnitPropObj(value);
                            // console.log(pobj);
                            opval.push(pobj.content.min);
                        }else if(value.includes('CEP')){
                            const pobj = OPEN_COMPONENT.getEquipmentPropObj(value);
                            // console.log(pobj);
                            opval.push(pobj.content.min);
                        }
                    });
                    // console.log(opval);
                    if(value.compare1.operation == "SUM"){
                        $.each(opval, function(key, value){
                            fcvalue += parseFloat(value);
                        });
                    }else if(value.compare1.operation == "SUBTRACT"){
                        fcvalue = parseFloat(opval[0]);
                        let x = 0;
                        $.each(opval, function(key, value){
                            if(x != 0){
                                fcvalue -= parseFloat(value);
                            }
                            x++;
                        });
                    }else if(value.compare1.operation == "MULTIPLY"){
                        fcvalue = parseFloat(opval[0]);
                        let x = 0;
                        $.each(opval, function(key, value){
                            fcvalue *= parseFloat(value);
                        });
                    }else if(value.compare1.operation == "DIVIDE"){
                        fcvalue = parseFloat(opval[0]);
                        let x = 0;
                        $.each(opval, function(key, value){
                            if(x != 0){
                                fcvalue /= parseFloat(value);
                            }
                            x++;
                        });
                    }

                    fvalue = fcvalue;
                }
                td += `<td id="${value.id}_compare1" cid="${value.id}" comparenum="compare1" type="${value.type}" class="editor-element editor-edited ${isOdd( parseFloat(xo) ) ? `grey` : "" }"><input class="init" type="text" value="${fvalue}" disabled ><i class="fas fa-asterisk"></i></td>`;
            }else{
                
                td += `<td id="${value.id}_compare1" cid="${value.id}" cval="${value.type == "text" ? value.content.text : value.content.min }" comparenum="compare1" type="${value.type}" class="editor-element ${value.lock == "locked" ? "editor-edit-locked" : "editor-edit"} ${isOdd( parseFloat(xo) ) ? `grey` : "" }"><input class="init" type="text" value="${value.type == "text" ? value.content.text : value.lock == "locked" ? `${value.content.min} ${value.measurement} - ${value.content.max} ${value.measurement}` : `${parseFloat(value.content.min) * parseFloat($('#builder-area-compare-form-thead-compare1').val()) } ${value.measurement} - ${parseFloat(value.content.max) * parseFloat($('#builder-area-compare-form-thead-compare1').val())} ${value.measurement}` }" disabled> </td>`;
                // if(value.compid == "CU-285865388"){
                //     console.log('its this one outside compare1', value, td);
                // }
            }

            if(value.compare2){
                
                // console.log('inside compare2', value.compare2);
                let fvalue;
                if(value.compare2.type == "text"){
                    fvalue = value.compare2.params[0];
                }else if(value.compare2.type == "operation"){
                    let opval = [];
                    let fcvalue = 0;
                    $.each(value.compare2.params, function(key, value){
                        if(value.includes('CUP')){
                            const pobj = OPEN_COMPONENT.getUnitPropObj(value);
                            // console.log(pobj);
                            opval.push(pobj.content.min);
                        }else if(value.includes('CEP')){
                            const pobj = OPEN_COMPONENT.getEquipmentPropObj(value);
                            // console.log(pobj);
                            opval.push(pobj.content.min);
                        }
                    });
                    // console.log(opval);
                    if(value.compare2.operation == "SUM"){
                        $.each(opval, function(key, value){
                            fcvalue += parseFloat(value);
                        });
                    }else if(value.compare2.operation == "SUBTRACT"){
                        fcvalue = parseFloat(opval[0]);
                        let x = 0;
                        $.each(opval, function(key, value){
                            if(x != 0){
                                fcvalue -= parseFloat(value);
                            }
                            x++;
                        });
                    }else if(value.compare2.operation == "MULTIPLY"){
                        fcvalue = parseFloat(opval[0]);
                        let x = 0;
                        $.each(opval, function(key, value){
                            fcvalue *= parseFloat(value);
                        });
                    }else if(value.compare2.operation == "DIVIDE"){
                        fcvalue = parseFloat(opval[0]);
                        let x = 0;
                        $.each(opval, function(key, value){
                            if(x != 0){
                                fcvalue /= parseFloat(value);
                            }
                            x++;
                        });
                    }

                    fvalue = fcvalue;
                }
                td += `<td id="${value.id}_compare2" cid="${value.id}" comparenum="compare2" type="${value.type}" class="editor-element editor-edited ${isOdd( parseFloat(xo) ) ? `grey` : "" }"><input class="init" type="text" value="${fvalue}" disabled ><i class="fas fa-asterisk"></i></td>`;
            }else{
                td += `<td id="${value.id}_compare2" cid="${value.id}" cval="${value.type == "text" ? value.content.text : value.content.min }" comparenum="compare2" type="${value.type}" class="editor-element ${value.lock == "locked" ? "editor-edit-locked" : "editor-edit"} ${isOdd( parseFloat(xo) ) ? `grey` : "" }"><input class="init" type="text" value="${value.type == "text" ? value.content.text : value.lock == "locked" ? `${value.content.min} ${value.measurement} - ${value.content.max} ${value.measurement}` : `${parseFloat(value.content.min) * parseFloat($('#builder-area-compare-form-thead-compare2').val())} ${value.measurement} - ${parseFloat(value.content.max) * parseFloat($('#builder-area-compare-form-thead-compare2').val())} ${value.measurement}` }" disabled> </td>`;
            }
            
            
            x++;

            html += `<tr>${td}</tr>`;

        });
        xo++;
    });

    $('#builder-area-compare-form-tbody').append(html)

}
function drawTable(components){
    
    let xo = 0;
    let propcount = 1;
    function isOdd(num) { return num % 2;}
    let html = '';
    
    $.each(components, function(key, value){
        let propobj;
        let compobj;

        if(value.split('-')[0] == "CU"){
            propobj = OPEN_COMPONENT.getUnitProps(value);
            compobj = OPEN_COMPONENT.getUnitObj(value);
        }else if(value.split('-')[0] == "CE"){
            propobj = OPEN_COMPONENT.getEquipmentProps(value);
            compobj = OPEN_COMPONENT.getEquipmentObj(value);
        }

        let x = 0;
        // console.log(propobj);
        $.each(propobj, function(key, value){


            let td = '';
            if(x == 0){
                // process name
                td += `<td ${isOdd( parseFloat(xo) ) ? `class="grey"` : "" } rowspan="${propobj.length}">${compobj.name}</td>`;
            };



            
            
            // parameter name
            td += `<td class=" ${isOdd( parseFloat(xo) ) ? `grey` : "" }"><input class="init" type="text" value="${value.name}" disabled></td>`
            // measurement unit
            td += `<td class="${isOdd( parseFloat(xo) ) ? `grey` : "" } ">${value.type == "text" ? "text" : value.measurement}</td>`;
            // column counter
            td += `<td class="num">${propcount}</td>`;

            // console.log(value.compare);
            if(value.compare != undefined){
                // initial value
                let obj = editorStringEvaluate(value.compare);
                // const xxx = excelFormula(obj);
                let result;
                let resultcompare1;
                let resultcompare2;
                // console.log(value.compare[0].type);
                if(obj[0].type == "text"){
                    result = obj[0].content;
                    resultcompare1 = result;
                    resultcompare2 = result;
                }else{
                    // console.log(value.compare);
                    let initres = excelFormula(obj);
                    // console.log(initres, initres.content);
                    let errorGate = false;
                    let xcount = 0;
                    $.each(initres, function(key, value){
                        if(value.type == "error"){
                            errorGate = true;
                        }
                        xcount++;
                    });

                    if(errorGate || xcount > 1){
                        result = "#error";
                        // console.log(result);
                        resultcompare1 = result;
                        resultcompare2 = result;
                    }else{
                        result = initres[0].content;
                        // console.log(result);
                        resultcompare1 = parseFloat(result) * parseFloat($('#builder-area-compare-form-thead-compare1').val() );
                        resultcompare2 = parseFloat(result) * parseFloat($('#builder-area-compare-form-thead-compare2').val() );
                    }
                }

                td += `<td fl="A${propcount}" cid="${value.id}" cval="${value.type == "text" ? value.content.text : value.content.setpoint }" type="${value.type}" lockstatus="${value.lock}" class="A${propcount} editor-link editor-edited ${value.lock == "locked" ? "editor-edit-locked" : "editor-edit"} ${isOdd( parseFloat(xo) ) ? `grey` : "" }"><input class="init" type="text" value="${`${result}`}" disabled> <i class="fas fa-asterisk"></i></td>`;
                // compare value1
                td += `<td fl="B${propcount}" class="B${propcount} editor-link ${isOdd( parseFloat(xo) ) ? `grey` : "" }"><input class="init" type="text" value="${resultcompare1}" disabled> </td>`;
                // compare value2
                td += `<td fl="C${propcount}" class="C${propcount} editor-link ${isOdd( parseFloat(xo) ) ? `grey` : "" }"><input class="init" type="text" value="${resultcompare2}" disabled> </td>`;
            }else{
                td += `<td fl="A${propcount}" cid="${value.id}" cval="${value.type == "text" ? value.content.text : value.content.setpoint }" type="${value.type}" lockstatus="${value.lock}" class="A${propcount} editor-link editor-element ${value.lock == "locked" ? "editor-edit-locked" : "editor-edit"} ${isOdd( parseFloat(xo) ) ? `grey` : "" }"><input class="init" type="text" value="${value.type == "text" ? value.content.text : `${value.content.setpoint} `}" disabled>${value.type == "text" ? "" : value.lock == "locked" ? `<i class="fas fa-lock"></i>` : `<i class="fas fa-lock-open"></i>` } </td>`;
                // compare value1
                td += `<td fl="B${propcount}" class="B${propcount} editor-link ${isOdd( parseFloat(xo) ) ? `grey` : "" }"><input class="init" type="text" value="${value.type == "text" ? value.content.text : value.lock == "locked" ? `${value.content.setpoint}` : `${parseFloat(value.content.setpoint) * parseFloat($('#builder-area-compare-form-thead-compare1').val() ) } ` }" disabled> </td>`;
                // compare value2
                td += `<td fl="C${propcount}" class="C${propcount} editor-link ${isOdd( parseFloat(xo) ) ? `grey` : "" }"><input class="init" type="text" value="${value.type == "text" ? value.content.text : value.lock == "locked" ? `${value.content.setpoint}` : `${parseFloat(value.content.setpoint) * parseFloat($('#builder-area-compare-form-thead-compare2').val() ) } ` }" disabled> </td>`;
            }
            
            
            x++;

            html += `<tr>${td}</tr>`;
            propcount ++;
        });
        xo++;
    });

    $('#builder-area-compare-form-tbody').empty();
    $('#builder-area-compare-form-tbody').append(html)

}
function addTableColumn(components){
    let html = [];
    let xo = 0;
    function isOdd(num) { return num % 2;}
    $.each(components, function(key, value){
        let propobj;

        if(value.split('-')[0] == "CU"){
            propobj = OPEN_COMPONENT.getUnitProps(value);
        }else if(value.split('-')[0] == "CE"){
            propobj = OPEN_COMPONENT.getEquipmentProps(value);
        }

        // console.log(propobj);
        $.each(propobj, function(key, value){
            html.push(`<td class="builder-area-compare-tf-h ${isOdd( parseFloat(xo) ) ? `grey` : "" }" ><input  type="text" value="${value.type == "text" ? value.content.text : `${value.content.min} ${value.measurement} - ${value.content.max} ${value.measurement}`}" ${value.type == "text" ? "disabled" : value.lock == "locked" ? "disabled" : "" }>${value.type == "text" ? "" : value.lock == "locked" ? `<i class="fas fa-lock"></i>` : `<i class="fas fa-lock-open"></i>` } </td>`);
        });
        xo++;
    });
    
    let x = 0;

    $('#builder-area-compare-form-tbody').children('tr').each(function(){
        $(this).append(html[x]);
        x++;
    });

    $('#builder-area-compare-form-thead').append(`<td><input type="text"/> </td>`);

    // $('#builder-area-compare-form-tbody').append(html)

}
function getComponentsDEPRECATED(){
    const pobj = OPEN_COMPONENT.getPages();
    let components = [];
    $.each(pobj, function(key, value){
        $(`#${value}`).children('.unit-widget').each(function(){
            const id = $(this).attr('id');
            components.push(id);
            $(`#${id}`).children('.equipment-widget').each(function(){
                const id = $(this).attr('id');
                components.push(id);
            });
        });
    });
    return components;
}
function getComponents(option="all"){
    const pobj = OPEN_COMPONENT.getComponentHeirarchy();
    // console.log("getComponents", pobj);
    let ret;
    if(option == "all"){
        ret = pobj;
        $('#compare-view-option-all').prop('checked', true);
    }else if(option == "unit"){
        const obj = $.grep(pobj, function(e){ 
            return e.includes("CU");
        });
        ret = obj;
    }else if(option == "equipment"){
        const obj = $.grep(pobj, function(e){ 
            return e.includes("CE");
        });
        ret = obj;
    }
    return ret;
}
$(document).on('click', '#builder-area-compare-form-close', function(){
    $('#builder-area-compare-form').hide();
    ongoingOperation = false;
    $('#editor').html('');
});
$(document).on('click', '#builder-area-compare-form-print', function(){
    let content = '';
    content += `
        <div id="printcon" class="builder-area-compare-tablecon" style="
        width: 100vw; 
        max-height: unset; 
        overflow: initial;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        ">

            <h1 className="title" style="color: black;
            width: 100%;
            text-align: center;
            margin: 20px 0px;
            ">${OPEN_COMPONENT.filename} Data Comparison Sheet</h1>
            ${$('.builder-area-compare-tablecon').html()}
        </div>
    `;
    printPageArea(content);

});
$(document).on('click', '#builder-area-compare-form', function(e){
    if(e.target != this){
        return;
    }else{
        $('#builder-area-compare-form').hide();
        ongoingOperation = false;
        $('#editor').html('');
    }
});
$(document).on('click', '#builder-area-compare', function(){
    $('#builder-area-compare-form').css('display', 'flex').show();
    
    drawTable(getComponents());
});
$(document).on('click', 'input[type="radio"][name="compare-view-option"]', function(){
    const id = $(this).attr('id');
    if(id.includes("all")){
        // console.log("show All");
        drawTable(getComponents());
    }else if(id.includes("unit")){
        drawTable(getComponents('unit'));
    }else if(id.includes("equipment")){
        drawTable(getComponents('equipment'));
    }
});



// BUILDER EDITOR EVENTS
function resetEditorElementColors(){
    $('.editor-init-element').each(function(){
        if($(this).hasClass('grey')){
            $(this).css('background-color', 'grey');
        }else{
            $(this).css('background-color', 'white');
        }
    });
}


function editorStringEvaluate(text, inside=false){
    let obj = [];
    let curstr = "";
    let prntsGate = false;
    let prntsEvtGate = false;
    function pusher(str){
        let inobj = {};
        if(str == "+" || str == "-" || str == "/" || str == "*" || str == "%" || str == "^"){
            inobj.type = "operation";
            inobj.content = str;
        }else if(str[0] == "("){
            if(inside == true){
                inobj.type = "error";
                inobj.content = str;
            }else{
                inobj.type = "equation";
                const ppp = str.substring(1, str.length-1);
                const GGG = editorStringEvaluate(ppp, true);
                inobj.content = GGG;
            }
        }else if( !isNaN(str) ){
            inobj.type = "number";
            inobj.content = parseFloat(str);
        }else if(str[0].toUpperCase() == "A" || str[0].toUpperCase() == "B" || str[0].toUpperCase() == "C"){
            inobj.type = "link";
            inobj.content = str.toUpperCase();
        }else{
            inobj.type = "error";
            inobj.content = str;
        }
        obj.push(inobj);
    }

    if(text[0] == "=" || inside){
        text = text.split('=').pop();
        for (let i = 0; i <= text.length; i++) {
            if(prntsGate){
                if(text[i] == ")"){
                    curstr += text[i];
                    pusher(curstr);
                    curstr = "";
                    prntsGate = false;
                    prntsEvtGate = true;
                }else{
                    curstr += text[i];
                }
            }else{
                if(text[i] == "("){
                    prntsGate = true;
                    curstr += text[i];
                }else{
                    if(text[i] == "+" || text[i] == "-" || text[i] == "/" || text[i] == "*" || text[i] == "%" || text[i] == "^"){
                        // curstr += text[i];
                        if(!prntsEvtGate){
                            pusher(curstr);
                            pusher(text[i]);
                            curstr = "";
                        }else{
                            pusher(text[i]);
                            curstr = "";
                            prntsEvtGate = false;
                        }
    
                    }else{
                        curstr += text[i];
                    }
            
                    if(i == text.length - 1){
                        pusher(curstr);
                        curstr = "";
                    }
                }
            }
            
            
        }
    }else{
        obj.push({
            type : "text",
            content : text
        });
    }
    

    return obj;
}

function excelFormula(zobj){
    let obj = [].concat(zobj);

    function getLinkValue(v){
        let ret = parseFloat($(`.editor-link.${v}`).children('input').val());
        return ret;
    }
    function performEquation(obj, callback=()=>{}){
        // let newobj = [].concat(obj);
        $.each(obj, function(key, value){
            if(value.type == "equation"){
                const calcret = runCalculations(value.content);
                // console.log(calcret);
                if(calcret.response != "error"){
                    // obj.slice(key, 1, calcret[0]);
                    obj.splice(key, 1, calcret[0]);
                }else{
                    showToast("Error in Calculation.");
                    return;
                }
            }
        });
        callback(obj);
        // callback(obj);
    }
    function performCalculation(obj, operation, callback=()=>{}){
        // let newobj = [].concat(obj);
        // console.log('performCalculation', operation, newobj);
        function calculate(pos){
            let ret;
            const v1 = obj[pos - 1];
            const v2 = obj[pos + 1];
            let c1, c2;
    
            // console.log(v1, v2);
            if(v1.type == "number"){
                c1 = parseFloat(v1.content);
            }else if(v1.type == "link"){
                c1 = getLinkValue(v1.content);
                // c1 = $(`.editor-link.${v1.content}`).children('input').val()
            }else{
                ret = {
                    "response" : "error"
                }
            }
    
            if(v2.type == "number"){
                c2 = parseFloat(v2.content);
            }else if(v2.type == "link"){
                c2 = getLinkValue(v2.content);
                // c2 = $(`.editor-link.${v2.content}`).children('input').val()
            }else{
                ret = {
                    "response" : "error"
                }
            }

            console.log(c1, c2);
    
            if(operation == "^"){
                const cc = Math.pow(c1, c2);
                ret = isNaN(Math.pow(c1, c2)) ? {
                    response : "error"
                } : {
                    response : "ok",
                    value : cc
                }
            }else if(operation == "+"){
                const cc = c1 + c2;
                ret = isNaN(c1 + c2) ? {
                    response : "error"
                } : {
                    response : "ok",
                    value : cc
                }
            }else if(operation == "-"){
                const cc = c1 - c2;
                // console.log(c1, c2);
                ret = isNaN(c1 - c2) ? {
                    response : "error"
                } : {
                    response : "ok",
                    value : cc
                }
            }else if(operation == "/"){
                const cc = c1 / c2;
                ret = isNaN(c1 / c2) ? {
                    response : "error"
                } : {
                    response : "ok",
                    value : cc
                }
            }else if(operation == "*"){
                const cc = c1 * c2;
                ret = isNaN(c1 * c2) ? {
                    response : "error"
                } : {
                    response : "ok",
                    value : cc
                }
            }
    
            
    
            return ret;
        }
        // console.log(obj);
        // function customSplice
        $.each(obj, function(key, value){
            if(value.type == "operation" && value.content == operation){
                // gate = true;
                const calcret = calculate(key);
                if(calcret.response != "error"){
                    // let zzobj = 
                    obj.splice((key - 1), 3, {
                        "type" : "number",
                        "content" : parseFloat(calcret.value)
                    });
                    // console.log("WWWWWW", newobj);
                    performCalculation(obj, operation);
    
                    // obj.splice((key - 1), 3, {
                    //     "type" : "number",
                    //     "content" : parseFloat(calcret.value)
                    // });
                    // performCalculation(obj, operation);
    
    
                    return false;
                }else{
                    showToast("Error in Calculation.");
                    return;
                }
            }
        });
        callback(obj);
    }
    function runCalculations(obj){
        let ret;
        const cb =data=>{
            // console.log("EXPONENT END",data);
            const cb =data=>{
                // console.log("MULTIPLICATION END",data);
                const cb =data=>{
                    // console.log("DIVISION END",data);
                    const cb =data=>{
                        // console.log("ADDITION END",data);
                        const cb =data=>{
                            // console.log("SUBTRACTION END",data);
                            // console.log("END ", data);
                            ret = data;
                        };
                        performCalculation(data, "-", cb);
                    };
                    performCalculation(data, "+", cb);
                };
                performCalculation(data, "/", cb);
            };
            performCalculation(data, "*", cb);
        };
        performCalculation(obj, "^", cb);
        return ret;
    }
    

    // const objclone = [...obj];
    let result;
    // console.log("START", objclone);

    const cb =data=>{
        result = runCalculations(data);
    };
    performEquation(obj, cb);

    return result;

}
$(document).on('click', '.editor-element', function(){
    $('.editor-con').css('display','flex').show();
    $('#editor-clear').css('display','flex').show();
    
    const val = $(this).attr('cval');
    const id = $(this).attr('cid');
    const lockstatus = $(this).attr('lockstatus');
    // const name = $(this).attr('cname');
    const fl = $(this).attr('fl');
    // console.log(fl, val, id);

    if(lockstatus == "locked"){
        $('#editor').prop('contenteditable', false);
    }else{
        $('#editor').prop('contenteditable', true);
    }

    $('.editor-link').css('background-color','white');
    $(this).css('background-color','green');

    $('#editor').html(`${val}`).attr({ cid : id, pos : fl, lockstatus});

});
$(document).on('click', '#editor-clear', function(){
    $('#editor').html('').focus();
});
$(document).on('click', '.editor-edited', function(){
    $('.editor-con').css('display','flex').show();
    $('#editor-clear').css('display','flex').show();
    
    const val = $(this).attr('cval');
    const id = $(this).attr('cid');
    const lockstatus = $(this).attr('lockstatus');
    // const name = $(this).attr('cname');
    const fl = $(this).attr('fl');
    // console.log(fl, val, id);
    let propobj;

    if(id.includes('CUP')){
        propobj = OPEN_COMPONENT.getUnitPropObj(id);
    }else if(id.includes('CEP')){
        propobj = OPEN_COMPONENT.getEquipmentPropObj(id);
    }
    
    // console.log(propobj);

    $('.editor-link').css('background-color','white');
    $(this).css('background-color','green');

    if(lockstatus == "locked"){
        $('#editor').prop('contenteditable', false);
    }else{
        $('#editor').prop('contenteditable', true);
    }
    $('#editor').html(`${propobj.compare}`).attr({ cid : id, pos : fl, lockstatus});

});
$('#builder-area-compare-form-save').click(function(){
    const text = $('#editor').text();
    const propid = $('#editor').attr('cid');
    const lockstatus = $('#editor').attr('lockstatus');
    // let obj = editorStringEvaluate(text);

    // let newobj = [].concat(obj);
    // const xxx = excelFormula(obj);
    // console.log(newobj, obj, xxx);

    if(lockstatus == "locked"){
        showToast("Property is Locked!");
    }else{
        if(propid.includes('CUP')){
            // propobj = OPEN_COMPONENT.getUnitPropObj(propid);
            OPEN_COMPONENT.updateUnitPropsCompare({
                id : propid,
                content : text
            });
        }else if(propid.includes('CEP')){
            // propobj = OPEN_COMPONENT.getEquipmentPropObj(propid);
            // console.log(objclone);
            OPEN_COMPONENT.updateEquipmentPropsCompare({
                id : propid,
                content : text
            });
        }
        // console.log(newobj, obj, xxx);
    }

    setTimeout(() => {
        drawTable(getComponents());
    }, 0);
    setTimeout(() => {
        drawTable(getComponents());
    }, 100);

});
$(document).on('change', '#builder-area-compare-form-thead-compare1', function(){
    setTimeout(() => {
        drawTable(getComponents());
    }, 500);
});














function showActiveHeader(){
    $('#builder-header-file').show();
    $('#builder-header-page').show();
    $('#builder-header-print').show();
    $('#builder-header-close').show();
}
function hideActiveHeader(){
    $('#builder-header-file').hide();
    $('#builder-header-page').hide();
    $('#builder-header-print').hide();
    $('#builder-header-close').hide();
}
function fillMy(){
    const fobj = SKID_FILE.getOwner(__ID);
    console.log(fobj);
    $('#builder-my-widget-con').empty();
    if(fobj.length > 0){
        $.each(fobj, function(key, value){
            $('#builder-my-widget-con').append(`
                <div fid="${value.id}" class="widget builder-my-widget">
                    <span>${value.filename}</span>
                    <div class="actions">
                        <i class="builder-my-widget-open fas fa-external-link-alt" title="Open File"></i>
                        <i class="builder-my-widget-delete fas fa-trash" title="Delete File"></i>
                    </div>
                </div>
            `);
        });
    }else{
        $('#builder-my-widget-con').append(`
            <span>Empty</span>
        `);
    }
}

function clearBuilderAreaPage(){
    resizeObserver.disconnect( $(`.unit-widget`)[0] );
    resizeObserver.disconnect( $(`.equipment-widget`)[0] );
    $('.builder-area-page').remove();
    $('.builder-area-page-single').remove();
    // $('.builder-area-page').children('.unit-widget').remove();
    // $('.builder-area-page-svg').children('line').remove();
    // $('.builder-area-page-svg').children('text').remove();
    // $('.builder-area-page-defs').children('marker').remove();
}
function importComponent(){
    $(document).off('change', '#importComponent'); 
    $(document).on('change','#importComponent', function(event){
        let filename = $(this).val().split('\\').pop();
        let extension = filename.split('.').pop();
        const dis = $(this);
        
        if(filename){
            console.log(filename, extension);
            if(extension == "ceis"){
                const reader = new FileReader();
                var textFile = dis.prop('files');
                const file = textFile[0];
    
                reader.onload = (e) => {
                    const file = e.target.result;
                    // This is a regular expression to identify carriage 
                    // Returns and line breaks
                    const lines = file.split(/\r\n|\n/);
                    // textarea.value = lines.join('\n');
                    // console.log(file);
    
                    // Define the string
                    var encodedStringAtoB = file;
    
                    // Decode the String
                    var decodedStringAtoB = atob(encodedStringAtoB);
    
                    const decodedJSON = JSON.parse(decodedStringAtoB);
                    console.log('decodedStringAtoB', decodedJSON);
    
                    // const componentid = rngComponentId();
                    clearBuilderAreaPage();
                    console.log(decodedJSON);
                    if(decodedJSON.componentid != undefined){
                        OPEN_COMPONENT = new SkidComponent(decodedJSON);
                        OPEN_COMPONENT.draw();
                        setOpenedHeaderState();
                        $('#builder-area').attr('compid', decodedJSON.componentid).css('display', 'flex').show();

                        OPEN_COMPONENT.applySettings();
                        fillUnit();
                        fillEquipment();
                        fillHeirarchy();
                    }else{
                        showToast("Invalid File or filesystem may be corrupt.");
                    }
    
                };
                reader.onerror = (e) => alert(e.target.error.name);
                reader.readAsText(file);
            }else{
                showToast("Invalid File selected.");
                return;
            }
        }else{
            console.log('cancelled');
        }
    });
}

















function resizeInput() {
    console.log('test');
    const l = $(this).val().length;
    $(this).attr('size', l);
}

function resizeIt(dis) {
    const str = $(dis).val();
    var cols = $(dis).attr('cols');
    var linecount = 0;
    $.each(str.split("\n"), function(key, value) {
      linecount += 1 + Math.floor(value.length / cols); // Take into account long lines
    })
    console.log(linecount);
    $(dis).attr("rows", parseFloat(linecount));
};













$('#builder-area-page').droppable(builderAreaDropOption);
$('.list-dragg-subs-w').draggable(listdraggsubsOption);

// $('.unit-widget').sortable({
//     items: "div"
//   });

// $('.unit-widget').draggable(unitDraggOption);
// $('.equipment-widget').draggable();


function reTrace(sel){
    let obj = [];
    var pos = $(sel).offset();
    let parentOffset = {
        top: pos.top,
        left: pos.left,
        height: $(sel).height(),
        width: $(sel).width(),
    }

    $(sel).children('div').each(function(){
        console.log($(this).text());
        var childPos = $(this).offset();
        var parentPos = $(this).parent().offset();
        var childOffset = {
            top: childPos.top - parentPos.top,
            left: childPos.left - parentPos.left,
            height: $(this).height(),
            width: $(this).width(),
        }
        // console.log(childOffset);
        obj.push(childOffset);
    });
    obj.push(parentOffset);
    return obj;
}

function reDraw(){
    const x = [
        {top: 183, left: 56, height: 118, width: 141},
        {top: 45, left: 15, height: 65, width: 178},
        {top: 45, left: 233, height: 65, width: 178},
        {top: 62, left: 493, height: 143, width: 141}
    ]
    const y = {top: 284, left: 344, height: 449, width: 763}
    let id = 'pekpek';

    $('#builder-area').append(`
        <div id="pekpek" class="unit-widget" h="${y.height}" w="${y.width}" >
            <i class="unit-widget-action-maximize fas fa-vector-square hidden"></i>
            <legend>Sub Unit 1 is too long</legend>
            <div class="actions">
                <i class="unit-widget-action-minimize fas fa-window-minimize"></i>
                <i class="unit-widget-action-details fas fa-sliders-h"></i>
            </div>
        </div>
    `);


    $(`#${id}`).css({
        "height" : y.height,
        "width" : y.width,
        "top" : y.top,
        "left" : y.left,
        // "z-index" : "1"
    }).draggable({ handle: "legend" });

    let i = 0;
    let ids = [
        "cust0",
        "cust1",
        "cust2",
        "cust3",
        "cust4",
        "cust5",
    ];
    $.each(x, function(key, value){
        let zid = rngMessageId();
        // let zid = `portogs${i}`;
        $(`#${id}`).append(`
            <div id="${zid}" class="equipment-widget">
                <span class="title"><img src="lib/images/avatardefault.png" alt="">Sub Equipment ${i}</span>
                <div class="params">
                    <span class="title">Volume</span>
                    <span class="content">45 L</span>
                </div>
                <div class="params">
                    <span class="title">Area</span>
                    <span class="content">462 sqft</span>
                </div>
                <div class="params">
                    <span class="title">Circumference</span>
                    <span class="content">4.2 Rad</span>
                </div>
                <i id="${ids[i]}" class="equipment-widget-arrow-h top far fa-circle"></i>
                <i class="equipment-widget-arrow-h bottom far fa-circle"></i>
                <i class="equipment-widget-arrow-h left far fa-circle"></i>
                <i class="equipment-widget-arrow-h right far fa-circle"></i>
            </div>
        `);

        // style="top=${value.top}; left=${value.left}; height=${value.height}; width=${value.width};"
        $(`#${zid}`).css({
            "height" : value.height,
            "width" : value.width,
            // "max-height" : value.height,
            // "max-width" : value.width,
            "top" : value.top,
            "left" : value.left
        }).draggable(equipmentDraggOption);

        
       
        

        // var new_row = document.createElement('div');
        // var new_text = document.createElement('span');
        // // new_row.style = 
        // // new_row.style.cssText = 'top=${value.top}; left=${value.left}; height=${value.height}; width=${value.width};';
        // new_text.className = 'title';
        // new_text.text = `SE-${i}`;
        // new_text.style.color = 'white';
        // new_row.appendChild(new_text);
        
        // new_row.className = 'equipment-widget';
        // new_row.style.height = value.height;
        // new_row.style.width = value.width;
        // new_row.style.top = value.top;
        // new_row.style.left = value.left;
        // // $(`#${id}`).appendChild(new_row);
        // document.getElementById(id).appendChild(new_row);


        
        i++;
    });

    $(`#${id}`).append(`
        <svg id="${id}_svg" class="unit-svg">
            <defs id="${id}_defs">
                <marker class="unit-svg-marker" id="arrowhead" markerWidth="10" markerHeight="7" 
                    refX="0" refY="3.5" orient="auto">
                    <polygon points="0 0, 5 3, 0 7" />
                </marker>

                <marker id="arrowhead1" markerWidth="10" markerHeight="7" 
                    refX="0" refY="3.5" orient="auto">
                    <polygon points="0 0, 5 3, 0 7" />
                </marker>
            </defs>
            <line id="line" class="unit-svg-line" marker-end="url(#arrowhead)"/>
            <line id="line2" class="unit-svg-line" marker-end="url(#arrowhead1)"/>
        </svg>
        <svg id="${id}_svg1" class="unit-svg">
            <defs id="${id}_defs">
                <marker class="unit-svg-marker" id="arrowhead" markerWidth="10" markerHeight="7" 
                    refX="0" refY="3.5" orient="auto">
                    <polygon points="0 0, 5 3, 0 7" />
                </marker>

                <marker id="arrowhead1" markerWidth="10" markerHeight="7" 
                    refX="0" refY="3.5" orient="auto">
                    <polygon points="0 0, 5 3, 0 7" />
                </marker>
            </defs>
            <line id="line3" class="unit-svg-line" marker-end="url(#arrowhead)"/>
            <line id="line4" class="unit-svg-line" marker-end="url(#arrowhead1)"/>
        </svg>
    `);
}


function fillUnit(){
    // const cb =data=>{
        // console.log(data);
        // setTimeout(() => {
            const unitobj = SKID_DATA.Unit.getUnit();
            // console.log('PEKPEKPEK', unitobj);
            

            $('#list-dragg-unit-content-wrapper').empty();
            $.each(unitobj, function(key, value){
                console.log('PEKPEKPEK',value);
                
                // const subunitobj = ACCUSER.Skid.Unit.getSubUnitByUnitId(value.id);
                const subunitobj = value.sub;

                let subunithtml = '';
                $.each(subunitobj, function(key, value1){
                    subunithtml += `
                        <span id="${value1.suid}" uid="${value.uid}" class="list-dragg-subs-w unit">${value1.name}</span>
                    `
                });

                $('#list-dragg-unit-content-wrapper').append(`
                    <div uid="${value.uid}" class="content-widget">
                        <span class="title content-widget-subs-h">${value.name}</span>
                        <div class="subs hidden">
                            ${subunithtml}
                        </div>
                    </div>
                `);
                $('.list-dragg-subs-w').draggable(listdraggsubsOption);
            });
        // }, 0);
    // };
    // ACCUSER.Skid.checkList('Unit', cb);
}
function fillUnitWithFilter(q){
    // const unitobj = ACCUSER.Skid.Unit.getUnit();
    const unitobj = SKID_DATA.Unit.getUnit();

    $('#list-dragg-unit-content-wrapper').empty();
    $.each(unitobj, function(key, value){
        // const subunitobj = ACCUSER.Skid.Unit.getSubUnitByUnitIdWithFilter(value.id, q);
        const subunitobj = SKID_DATA.Unit.getSubUnitByUnitIdWithFilter(value.uid, q);

        let subunithtml = '';
        let gate = true;
        if(subunitobj != undefined && subunitobj.length > 0){
            $.each(subunitobj, function(key, value1){
                subunithtml += `
                    <span id="${value1.suid}" uid="${value.uid}" class="list-dragg-subs-w unit">${value1.name}</span>
                `
            });
        }else{
            gate = false;
        }
        if(gate){
            $('#list-dragg-unit-content-wrapper').append(`
                <div uid="${value.uid}" class="content-widget">
                    <span class="title content-widget-subs-h" status="open" >${value.name}</span>
                    <div class="subs ">
                        ${subunithtml}
                    </div>
                </div>
            `);
            $('.list-dragg-subs-w').draggable(listdraggsubsOption);
        }
    });
}
function fillEquipment(){
    // const cb =data=>{
    //     setTimeout(() => {
    //         console.log(data);
            // const equipmentobj = ACCUSER.Skid.Equipment.getEquipment();
            const equipmentobj = SKID_DATA.Equipment.getEquipment();

            $('#list-dragg-equipment-content-wrapper').empty();
            $.each(equipmentobj, function(key, value){
                // const subequipmentobj = ACCUSER.Skid.Equipment.getSubEquipmentByEquipmentId(value.id);
                const subequipmentobj = value.sub;

                let subequipmenthtml = '';
                $.each(subequipmentobj, function(key, value1){
                    subequipmenthtml += `
                        <span  id="${value1.seid}" eid="${value.eid}" class="list-dragg-subs-w equipment">${value1.name}</span>
                    `
                });

                $('#list-dragg-equipment-content-wrapper').append(`
                    <div uid="${value.eid}" class="content-widget">
                        <span class="title content-widget-subs-h">${value.name}</span>
                        <div class="subs hidden">
                            ${subequipmenthtml}
                        </div>
                    </div>
                `);
                $('.list-dragg-subs-w').draggable(listdraggsubsOption);
            });
    //     }, 0);
    // };
    // ACCUSER.Skid.checkList('Equipment', cb);
}
function fillEquipmentWithFilter(q){
    // const cb =data=>{
    //     setTimeout(() => {
    //         console.log(data);
            // const equipmentobj = ACCUSER.Skid.Equipment.getEquipment();
            const equipmentobj = SKID_DATA.Equipment.getEquipment();

            $('#list-dragg-equipment-content-wrapper').empty();
            $.each(equipmentobj, function(key, value){
                // const subequipmentobj = ACCUSER.Skid.Equipment.getSubEquipmentByEquipmentIdWithFilter(value.id, q);
                const subequipmentobj = SKID_DATA.Equipment.getSubEquipmentByEquipmentIdWithFilter(value.eid, q);

                let subequipmenthtml = '';
                let gate = true;

                if(subequipmentobj != undefined && subequipmentobj.length > 0){
                    $.each(subequipmentobj, function(key, value1){
                        subequipmenthtml += `
                            <span id="${value1.seid}" eid="${value.eid}"  class="list-dragg-subs-w equipment">${value1.name}</span>
                        `
                    });
                }else{
                    gate = false;
                }

                if(gate){
                    $('#list-dragg-equipment-content-wrapper').append(`
                        <div uid="${value.eid}" class="content-widget">
                            <span class="title content-widget-subs-h" status="open">${value.name}</span>
                            <div class="subs ">
                                ${subequipmenthtml}
                            </div>
                        </div>
                    `);
                    $('.list-dragg-subs-w').draggable(listdraggsubsOption);
                }
            });
    //     }, 0);
    // };
    // ACCUSER.Skid.checkList('Equipment', cb);
}


$(document).ready(function(){
    // showToast('saved file');
    setTimeout(() => {
        // fillGridLine(8.5, 11);
    }, 0);
    const cb1 = data => {
        console.log(data, '-----------------------');
        // all these variables are from defaults.js
        // variables are getting the data from the api call api_checkIfLoggedIn() which is from api_login.js
        // this function runs on success api call.

        __ID = data.ID;
        __USER_LEVEL =data.USER_LEVEL;
        __PASSWORD = data.PASSWORD;
        __PHOTO = data.PHOTO;
        __FIRST_NAME = data.FIRST_NAME;
        __COMPANY_ID = data.COMPANY_ID;
        __DATABASE_ID = data.DATABASE_ID;

        const obj={
            'id':data.COMPANY_ID,
            'databaseid':data.DATABASE_ID,
            'name':data.COMPANY_NAME,
            'logo':data.COMPANY_LOGO,
            'userid' : data.ID,
            'userfirstname' : data.FIRST_NAME,
            'userlevel' : data.USER_LEVEL,
            'userphoto' : data.PHOTO,
            'userpassword' : data.PASSWORD
        }
        console.log(obj);
        COMPANY = new Company(obj);
        setTimeout(() => {
            const cb =()=>{
                // $('.list-dragg').draggable({containment : '#builder-area', handle : "> .title"});
                
            };
            COMPANY.checkList('Complains', cb); 
        }, 0);
    };
    const cb2 = () => {
        if(__USER_LEVEL == '1' || __USER_LEVEL == '2'){
            // $('#navcon-define').show();
        }else{
            // $('#navcon-define').hide();
        }
        $('.dashboard-con').show();
        // $('.build-con').show();


        ACCUSER = new User({"id" : __ID, "companyid" : __COMPANY_ID});
        

        // const alobj = ACCUSER.Alert.getObjById("AL-11111");
        // runAlert(alobj, console.log("AWESOOOOME"));

        setTimeout(() => {
            // const cb=data=>{
            //     console.log(data);
            //     const cb=data=>{
            //         console.log(data);
            //         const cb=data=>{
            //             console.log(data);
                        const cb =()=>{
                            setTimeout(() => {
                                const cb =()=>{
                                    setTimeout(() => {
                                        ACCUSER.Alert.fill();
                                        fillProfile();
                                        // hideAllNav(skid_conList);
                                        // minimizeNav();
                                        // $('#nav-data').click();
                                        
                                        // showLoadingReport("PEKTURE");

                                        const sss = getUrlParams(window.location.href);
                                        if(sss.viewonly != undefined && sss.viewonly == "true"){
                                            console.log(sss.fileid);
                                            $('#builder-header-my').hide();
                                            $('#builder-header-open').hide();
                                            $('#builder-header-create').hide();
                                            $('#builder-header-file').remove();
                                            

                                            const cb =()=>{
                                                // const skfobj = SKID_FILE.getCompanyFile(sss.fileid);
                                                // console.log(skfobj);

                                                const cbd =data=>{
                                                    console.log(data);
                                                    if(data == "error"){
                                                        showToast("Your Skid File was not Found.");
                                                        return false;
                                                    }
                                                    
                                                    OPEN_COMPONENT = new SkidComponent(data);
                                                    OPEN_COMPONENT.draw();
                                                    setOpenedHeaderState();
                                                    $('#builder-area').attr('compid', data.componentid).css('display', 'flex').show();
    
                                                    OPEN_COMPONENT.applySettings();
                                                    fillUnit();
                                                    fillEquipment();
                                                    fillHeirarchy();
                                                };
                                                SKID_FILE.getCompanyFileObject(sss.fileid, cbd);
                                                // console.log(aaa);

                                                
                                            };
                                            SKID_FILE.fetchAll(cb);


                                            
                                        }

                                    }, 0);
                                };
                                SKID_DATA = new SkidData(__COMPANY_ID, cb);
                            }, 0);
                        };
                        SKID_FILE = new SkidFile(__ID, cb);
        //             }
        //             ACCUSER.checkList('Skid', cb);
        //         }
        //         ACCUSER.checkList('COMPANY_ACCOUNTS', cb);
        //     }
        //     ACCUSER.checkList('Alert', cb);
        }, 0);
        // AlertWorker();


        
    };
    
    api_checkIfLoggedIn(cb1, cb2);




    

    
    

});


