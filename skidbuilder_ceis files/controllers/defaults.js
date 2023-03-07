
const domain = 'http://localhost:8080/skidbuilder_ceis/';
const stepwellDomain = 'http://localhost:8080/stepwell/';

// const domain = 'http://skidbuilder.prodocuflow.com/';
// const stepwellDomain = 'http://development.prodocuflow.com/';

let databaseid;
// const domain = 'http://localhost:8080/ceis/';
// const domain = 'http://localhost/stepwell/ceis/';
// const domain = 'http://192.168.64.2/ceis/';
// const db = openDatabase('secretdb', '1.0', 'something', 2 * 1024 * 1024); 
// let __COMPANY_ID = '';

let __ID = '';
let __USER_LEVEL = '';
let __PASSWORD = '';
let __PHOTO = '';
let __FIRST_NAME = '';
let __COMPANY_ID = '';
let __COMPANY_NAME = '';
let __COMPANY_LOGO = '';
let __DATABASE_ID = '';
let ACCUSER;
let COMPANY;
let ADMIN;
let OPEN_COMPONENT;
let SKID_DATA;
let SKID_FILE;

let project_manage_list = {};
let action_select = false;
let groupid_clipboard = '';
let project_launch_list = {};
let project_launch_list_counter = 0;
let docuchat_userlist_project = {};
let docuchat_userlist_project_counter = 0;


Object.size = function(obj) {
    let size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}
function parseDate(str) {
    var mdy = str.split('-');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
}
function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
$.fn.qrcode = function(options){
    const id = rngPassword();
    // https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=Hello%20world

    console.log(encodeURI(options.link));
    $(this).empty().append(`
        <a id="${id}" target="_blank" href="${options.link}"  >
            <img  src="https://chart.googleapis.com/chart?chs=${options.width == undefined ? '150' : options.width}x${options.height == undefined ? '150' : options.height}&cht=qr&chl=${encodeURI(options.link)}" alt="${options.alt == undefined ? 'QR CODE' : options.alt}">
            <span>Click/Scan to Open</span>
        </a>
    `);
}
    // usage
// $('#qrtest').qrcode({
//     link : "http://localhost:8080/skidbuilder_ceis/pages/builder/?viewonly=true&fileid=KukQauEz0cLwFFN",
//     // height : '350',
//     // width : '100'
// });


function isNum(str){
    const pattern = /^-?\d+\.?\d*$|^\d*\.>\d+$/;
    // const pattern = /^-?[0-9][0-9,\.]+$/;
    const stri = str.toString();
    // console.log('stri.length', stri.length, stri.length > 0);
    let ret = false;

    if(stri.length > 0){
        // console.log("pattern.test(str" , pattern.test(str) );
        ret = pattern.test(str);
    }else{
        ret = false;
    }
    return ret;
}
$.fn.testNum = function(){
    function isNum(str){
        const pattern = /^-?\d+\.?\d*$|^\d*\.>\d+$/;
        return pattern.test(str);
    }
    $(this).on("keyup", function(){
        // console.log($(this).val());
        const v = $(this).val();
        const t = isNum( v );
        if(v.length > 0){
            if(t){
                $(this).css({
                    "border" : "2px solid green",
                    "box-shadow" : "0px 0px 5px 0px green"
                });
                $(this).attr("isNum", "true");
            }else{
                $(this).css({
                    "border" : "2px solid red",
                    "box-shadow" : "0px 0px 5px 0px red"
                });
                $(this).attr("isNum", "false");
            }
        }else{
            $(this).css({
                "border" : "initial",
                "box-shadow" : "initial"
            });
        }
    });
}

$.fn.inputPlaceholder = function(options){
    const pl = $(this).attr("placeholder");
    const dis = this;
    // $(this).attr("contentEditable", "true");
    // $(this).attr("placeholder", "");
    // console.log(pl);

    $(this).css({
        height: options.height == undefined ? "25px" : options.height,
        width: options.width == undefined ? '200px' : options.width,
        position: "relative",
        display: 'flex',
        marginTop: options.marginTop == undefined ? '30px' : options.marginTop,
        alignItems: "center"
    });

    $(this).append(`
        <span class="placeholder" style="
        position: absolute;
        left: 10px;
        color: grey;
        opacity: 0.9;
        z-index: 1;
        ">${pl == undefined ? p : pl}</span>
        <input style="
        position: absolute;
        left: 0px;
        height: 100%;
        width: calc(100% - 10px);
        padding: 0px;
        padding-left: 10px;
        z-index: 0;
        " type="text" >
    `);

    $(this).children('input').on("focus", function(){
        $(this).siblings('.placeholder').animate({
            top: '-20px',
        }, 200).css({
            color: "black",
            opacity: '1'
        });
    });

    $(this).children('input').on("focusout", function(){
        console.log('focusout');
        if($(this).val() == ""){
            $(this).siblings('.placeholder').animate({
                top: '3px'
            }, 200).css({
                color: "grey",
                opacity: '0.9'
            });
        }else{
            dis.val( $(this).val() )
        }
    });

    if(options.testNum){
        $(this).testNum();
    }



}





function getUrlParams(urlOrQueryString) {
    if ((i = urlOrQueryString.indexOf('?')) >= 0) {
        const queryString = urlOrQueryString.substring(i+1);
        if (queryString) {
        return _mapUrlParams(queryString);
        } 
    }
    return {};
}
function _mapUrlParams(queryString) {
    return queryString    
    .split('&') 
    .map(function(keyValueString) { return keyValueString.split('=') })
    .reduce(function(urlParams, [key, value]) {
    if (Number.isInteger(parseInt(value)) && parseInt(value) == value) {
        urlParams[key] = parseInt(value);
    } else {
        urlParams[key] = decodeURI(value);
    }
    return urlParams;
    }, {});
}



function getAverageRGB(imgEl) {
    
    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;
        
    if (!context) {
        return defaultRGB;
    }
    
    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
    
    context.drawImage(imgEl, 0, 0);
    
    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */alert('x');
        return defaultRGB;
    }
    
    length = data.data.length;
    
    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }
    
    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);
    
    // return rgb;
    return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
    
}
function validateEmail(email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if( !emailReg.test( email ) ) {
        return false;
    } else {
        return true;
    }
}
function getDateNow(){
    // const d = new Date();
    // if((d.getMonth()+1) < 10){  
    //     return d.getFullYear() + "-0" + (d.getMonth()+1) + "-" + d.getDate();
    // }else{
    //     return d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
    // }
    const date = new Date();
    const d = date.getDay() + 1;
    const m = date.getMonth() + 1;
    const year = date.getFullYear();


    let day = '';
    let month = '';

    if(d <= 9){
        day = '0' + d;
    }else{
        day = d;
    }
    if(m <= 9){
        month = '0' + m;
    }else{
        month = m;
    }

    return `${year}-${month}-${day}`;
}
function getTimeNow(){
    const date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();


    let hour = '';
    let minute = '';

    if(h <= 9){
        hour = '0' + h;
    }else{
        hour = h;
    }
    if(m <= 9){
        minute = '0' + m;
    }else{
        minute = m;
    }

    return `${hour}:${minute}`;
}
function Clipboard_Copy(value) {
    var tempInput = document.createElement("input");
    tempInput.value = value;
    tempInput.style = {"display" : "none"};
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    showNotification("Clipboard", "Data has been copied to Clipboard");
}

function rngPassword(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
function rngMessageId(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
function randomId(){
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
function rngLicenseId(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function rngSkidFileId(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
function rngSkidPageId(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
function rngSkidDataSheetCustomId(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
function rngComponentId(){
    return 'COMP-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngComponentUnitId(){
    return 'CU-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngComponentUnitPropsId(){
    return 'CUP-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngComponentUnitTransferId(){
    return 'CUT-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngComponentUnitTransferPropId(){
    return 'CUTP-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngComponentEquipmentId(){
    return 'CE-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngComponentEquipmentPropsId(){
    return 'CEP-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngComponentEquipmentTransferId(){
    return 'CET-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngComponentEquipmentTransferPropId(){
    return 'CETP-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rng09(){
    return Math.floor((Math.random() * 9) + 0);
}

function rng255(){
    return Math.floor((Math.random() * 255) + 0);
}
function rngId(userlevel){
    if(userlevel >= 0){
        return 'U-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() ;
    }else{
        return 'error';
    }
}



function rngCompanyId(){
    return 'C-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectId(){
    const date = new Date();
    // console.log(date);
    // console.log(date.getFullYear() % 100);
    // console.log(date.getMonth());
    // console.log(date.getDate());
    const year = date.getFullYear() % 100;
    const day = date.getDate();
    let month = '';
    if(date.getMonth() > 9){
        month = (date.getMonth() + 1);
    }else{
        month = '0' + (date.getMonth() + 1);
    }
    
    return 'P-' + day + month + year + rng09() +  rng09() + rng09();
}
function rngGroupId(){
    return 'G-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngDocumentId(){
    return 'D-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngPlanningDocumentId(){
    return 'PD-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProductId(){
    return 'I-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngHeaderTabId(){
    return 'HT-' + rng09() +  rng09() + rng09() + rng09() + rng09();
}
function rngDocumentCategoryId(){
    return 'DC-' + rng09() +  rng09() + rng09() + rng09() + rng09();
}
function rngDirectorID(){
    return 'DD-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngDocumentId(){
    return 'D-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngScheduleId(){
    return 'SCH-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngTaskId(){
    return 'T-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngTaskResourceId(){
    return 'TR-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngSupplierId(){
    return 'SPL-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectRequestId(){
    return 'PR-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectRequestTechAdd(){
    return 'PRTA-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectRequestConnect(){
    return 'PRRC-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectRegisterId(){
    return 'PG-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectNoteId(){
    return 'PN-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectMinuteId(){
    return 'PM-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectMinuteDistributionId(){
    return 'PMD-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectMinutePartId(){
    return 'PMP-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectTimesheetId(){
    return 'PT-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngAccountRateId(){
    return 'AR-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngSupplierRateId(){
    return 'SR-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngTmpAccountId(){
    return 'TA-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngTmpSupplierId(){
    return 'TS-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngBudgetDashboardUploadId(){
    return 'BDU-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectItemId(){
    return 'PI-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectItemCategoryId(){
    return 'PIC-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectBudgetId(){
    return 'PB-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectBudgetId(){
    return 'PB-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectBudgetLumpsumId(){
    return 'PBL-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectBudgetMaterialId(){
    return 'PBT-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectBudgetMilestoneId(){
    return 'PBM-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectBudgetMilestoneCatId(){
    return 'PBS-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectBudgetManhourId(){
    return 'PBH-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectBudgetForecastId(){
    return 'PBF-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectRequestLocker(){
    return 'PRL-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectInvoiceId(){
    return 'PIV-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectInvoiceLumpsumId(){
    return 'PIVL-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectInvoiceMaterialId(){
    return 'PIVMT-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectInvoiceManhourId(){
    return 'PIVMN-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectInvoiceMilestoneId(){
    return 'PIVML-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectInvoiceExpenseId(){
    return 'PIVEX-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectInvoiceForecastId(){
    return 'PIVFC-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectBudgetUploadId(){
    return 'PBU-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectPrereqId(){
    return 'PRRQ-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngProjectInvoiceUploadId(){
    return 'PIU-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngAlertId(){
    return 'AL-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngSkidUnitId(){
    return 'SU-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngSkidSubUnitId(){
    return 'SSU-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngSkidEquipmentId(){
    return 'SE-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngSkidSubEquipmentId(){
    return 'SSE-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngCompanyModuleId(){
    return 'CM-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngComplainsId(){
    return 'TCKT-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rng5(){
    return rng09() + '' + rng09() + '' + rng09() + '' + rng09() + '' + rng09();
}
function generateDocumentID(){
    // Use: docId = generateDocumentID();
    // Generates a unique doc id
    return ("PD-" + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10))
}
function generateTaskID(){
    // Use: docId = generateDocumentID();
    // Generates a unique doc id
    return ("PT-" + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10))
}
function generateLinkID(){
    // Use: docId = generateDocumentID();
    // Generates a unique doc id
    return ("PDL-" + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10))
}
function generateProducessorID(){
    // Use: docId = generateDocumentID();
    // Generates a unique doc id
    return ("PDP-" + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10))
}


function showReport(message, duration){
    $('#reports').hide();
    $('#report_message').text(message);
    $('#reports').css('z-index', '999');
    $('#reports').show();
    var x = setTimeout(function(){
            $('#reports').css('z-index', '-200');
            $('#reports').hide();
    }, duration);
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
function defaultTest(){
    console.log('test success');
}
function showLoadingReport(message){
    // console.log(message);
    $('#report span').text(message);
    $('#report').css('display','flex').show();
}
function hideLoadingReport(){
    $('#report').css('display','none').hide();
}
function showReloadReport(message){
    $('#reportV2 span').text(message);
    $('#reportV2').css('display','flex').show();
}
function hideReloadReport(){
    $('#reportV2').css('display','none').hide();
}
function showRefreshReport(message){
    //temporarily disables report loading screen
    $('#report').css('display','none').hide();
    $('.tempReport').attr("id", "");
    $('#refreshReport span').text(message);
    $('#refreshReport').css('display','flex').show();
}
function hideRefreshReport(){
    $('.tempReport').attr("id", "report");
    $('#refreshReport').css('display','none').hide();
}
function getUserlevelList(){
    let ret = '';
    if(__USER_LEVEL != ''){
        if(__USER_LEVEL == 0){
            ret = `<option value="0">Developer</option>
            <option value="1">Admin</option>`;
        }else if(__USER_LEVEL == 1){
            ret = `<option value="2">Super User</option>
            <option value="3">User</option>`;
        }else if(__USER_LEVEL == 2){
            ret = `<option value="3">User</option>`;
        }
    }
    return ret;
}


//-------------NOTIFICATION--------------
let notificationtimer;
function showNotification(title, message){
    clearTimeout(notificationtimer);
    // $('body').remove('#notification').append(`
    //     <div id="notification" class="notification-con btn-shadow color-sc">
    //         <div id="notification-close">
    //             <i class="fas fa-caret-right"></i>
    //         </div>
    //         <h2>${title}</h2>
    //         <span>${message}</span>
    //     </div>
    // `);
    $('#notification').children('h2').text(title);
    $('#notification').children('span').text(message);
    $('#notification > span').css('display', 'none');
    $('#notification > h2').css({'display': 'none', "color" : "white"});
    $('#notification').stop(true, true).css({'opacity' : '1', 'width' : '0px', 'display' : 'flex'}).animate({'width' : '25vw'}, 800, function(){
        $('#notification > span, #notification > h2, #notification-close').stop(true, true).css({'opacity' : '0', 'display' : 'flex'}).animate({'opacity' : '1'}, 600, function(){
            // hidenotification
        });
    });
    notificationtimer = setTimeout(function(){
        hideNotification();
    }, 3000);
}
function hideNotification(){
    // console.log('running animations');
    $('#notification > span, #notification > h2').stop(true, true).animate({'opacity' : '0'}, 400, function(){
        $('#notification').stop(true, true).css('height', '90px').animate({'width' : '1px'}, 600, function(){
            $('#notification').stop(true, true).animate({'opacity' : '0'}, 200, function(){
                $('#notification-close').css({'opacity' : '0', 'display' : 'none'});
                $('#notification').css('display', 'none');
                clearTimeout(notificationtimer);
            });
        });
    });
}

//-------------ACTION--------------
function showAction(title, callbacktrue, callbackfalse){
    $('#action-title').html(title);
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

//-------------ALERT--------------
const alertLinks = {
    "usertaskboard" : (options)=>{
        console.log('Go to User Taskboard with options: ', options);
    }
};
function showAlert(title, message, linktitle=null, link=null, linkoptions=null){
    let btn = '';
    if(linktitle == null || link == null){
        btn = '';
    }else{
        btn = `<button link="${link}" class="alert-con-widget-button btn-shadow" style="color: ${FONT_COLOR}; background-color: ${BTN_COLOR};">${linktitle}</button>`;
    }

    $('#alert').children('.alert-con').append(`
    <div class="alert-con-widget">
        <i class="fas fa-trash alert-con-widget-delete" style="color: ${FONT_COLOR};" ></i>
        <span class="alert-con-widget-title" style="color: ${FONT_COLOR};">${title}</span>
        <div class="alert-con-widget-message">
            <span style="color: ${FONT_COLOR};">${message}</span>
            ${btn}
        </div>
    </div>
    `);
}
    // ALERT EVENTS
$(document).on('click', '.alert-con-widget-button', function(){
    const aid = $(this).attr('aid');
    console.log( aid);
    const obj = alerts.getObjById(aid);
    console.log(obj);

});
$(document).on('click', '.alert-con-widget-delete', function(){
    $(this).parent('.alert-con-widget').remove();
    // $('#alert').hide();
});
$('#alert-open').click(()=>{
    $('#alert').toggle();
    if( !$.trim( $('.alert-con').html() ).length ){
        $('.alert-con').append(`
            <div class="alert-con-widget">
                <span class="alert-con-widget-title" style="color: ${FONT_COLOR};" >Nothing to view</span>
            </div>
        `);
    }
});
$('#alert').click(function(e){
    if(e.target != this){
        return;
    }else{
        $(this).toggle();
    }
});



//-------------VALIDATE--------------
function showValidate(cbok, cberror){
    $('#validate').css('display','flex').show();
    $('#validate-id').val(__ID);

    $('#validate-submit').off('click');
    $('#validate-submit').on('click', function(){
        const id = $('#validate-id').val();
        const email = $('#validate-email').val();
        const password = $('#validate-password').val();
        const cbsuccess=data=>{
            // console.log('validate: ', data.login);
            if(data.login == 'success'){
                $('#validate').css('display', 'none').hide();
                $('#validate-id').val('');
                $('#validate-email').val('');
                $('#validate-password').val('');
                cbok();
            }else if(data.login == 'error'){
                $('#validate').css('display', 'none').hide();
                $('#validate-id').val('');
                $('#validate-email').val('');
                $('#validate-password').val('');
                showNotification('Account Validation', 'You have entered invalid credentials.');
                cberror();
            }
        };
        if(email && password){
            // console.log('showValidate: comid: ',__COMPANY_ID);
            api_validate(id, email, password, __COMPANY_ID, cbsuccess);
        }else{
            blinkbg($('#validate-email'), RED_PALETTE, 'white');
            blinkbg($('#validate-password'), RED_PALETTE, 'white');
            $('#validate-email').val('');
            $('#validate-password').val('');
        }
    });

    $('#validate-close').off('click');
    $('#validate-close').on('click', function(){
        $('#validate').css('display', 'none').hide();
    });
    $('#validate').off('click');
    $('#validate').on('click', function(e){
        if(e.target == this){
            $('#validate').css('display', 'none').hide();
        }
    });
}
// function showValidate(cbok, cberror=()=>{}){
//     cbok();
// };


//navigation default functions
function minimizeNav(){
    // $('#nav').css('width', '70px');
    // console.log($('#nav').attr('status'));
    if($('#nav').attr('status') != 'active'){
        $('#nav').animate({ "width": "-=230px" }, 0);
        $('#content').animate({ "width": "+=230px", "left": "-=230px" }, 0, function(){
            $('.nav-widget-con').children('span').hide();
        });
        $('#nav').attr('status', 'active');
    }
    
}
function maximizeNav(){
    if($('#nav').attr('status') == 'active'){
        // $('#nav').css('width', '300px');
        $('#nav').animate({ "width": "+=230px" }, 0);
        $('#content').animate({ "width": "-=230px", "left": "+=230px" }, 0, function(){
            $('.nav-widget-con').children('span').show();
        });
        $('#nav').attr('status', 'inactive');
    }
}

// DEFAULT FUNCTIONS
function hideAllNav(list){
    for(i=0; i < list.length; i++){
        list[i].css('display', 'none').hide();
        // console.log(list[i]);
    }
}
function showAllNav(list){
    // for(i=0; i < list.length; i++){
    //     list[i].css('display', 'flex').show();
    //     console.log(list[i]);
    // }
    $.each(list, function(key, value){
        setTimeout(() => {
            value.css('display', 'flex').show();
        }, 0);
        // console.log('LJHKASDLJKASDLJK',value[0]);
    });
}
function logout(){
    if(!createUploadGate){
        api_logout();
        window.location.href = stepwellDomain;
    }
}
function fillProfile(){
    // console.log('fillProfile', ph);
    
    const cb=data=>{
        // console.log('AAA2',data);
        setTimeout(() => {
            const accobj = ACCUSER.getAccountObjById(__ID);
            if(accobj != undefined){
                if(accobj.photo == 'na'){
                    $('#profile-img').attr('src','lib/images/avatardefault.png');
                }else{
                    $('#profile-img').attr('src', accobj.photo);
                }
                $('#profile-name').text(accobj.firstname);
            }
        }, 0);
    }
    ACCUSER.checkList('COMPANY_ACCOUNTS', cb);
}
function fillCompany(logo, name){
    if(logo == 'na'){
        $('#header-tab-company-logo').attr('src','lib/images/companydefault.png');
    }else{
        $('#header-tab-company-logo').attr('src', logo);
    }
    $('#header-tab-company-name').text(name);
}

let createUploadGate = false; //docbuilder : for cancelling documents
let createTestScheduleGate = false; //doc chart : for cancelling documents
// upon adding some more of this gates, update 
//     1. $(document).on('click', '.nav-widget-con', function(){
//     2. $('#home-open').click(function(){
//     3. $('#profile-logout').click(function(){

//navigation default events
$('.nav-widget-con').mouseenter(function(){
    $(this).css({
        'background-color': SUB_COLOR,
        '-webkit-box-shadow': 'inset 0px -12px 35px -21px rgba(0,0,0,0.24)',
        '-moz-box-shadow': 'inset 0px -12px 35px -21px rgba(0,0,0,0.24)',
        'box-shadow': 'inset 0px -12px 35px -21px rgba(0,0,0,0.24)'
    });
        
    $(this).children('i').toggleClass('scale');
});
$('.nav-widget-con').mouseleave(function(){
    $(this).css({
        'background-color': BTN_COLOR,
        '-webkit-box-shadow': 'inset 0px -12px 35px -21px rgba(0,0,0,0.24)',
        '-moz-box-shadow': 'inset 0px -12px 35px -21px rgba(0,0,0,0.24)',
        'box-shadow': 'inset 0px -12px 35px -21px rgba(0,0,0,0.24)'
    });
    $(this).children('i').toggleClass('scale');
});
$('.nav-widget').click(function(){
    // $(this).children('.nav-sub-widget').toggleClass('hidden');
    const id = $(this).attr('id');
    const div = $(this);
    if(div.hasClass('active')){
        div.children('.nav-sub-widget').hide();
        div.removeClass('active');
    }else{
        $('#nav').children('.nav-widget').each(function(){
            if($(this).attr('id') == id){
                $(this).children('.nav-sub-widget').show();
            }else{
                $(this).children('.nav-sub-widget').hide();
                $(this).removeClass('active');
            }
        });
        div.addClass('active');
    }
});
$(document).on('click', '.nav-widget-con', function(){
    // console.log();
    let id = '';

    if(createUploadGate){
        id = undefined;
    }else if(createTestScheduleGate){
        id = undefined;
    }else{
        id = $(this).children('span').attr('id');
    }
    // const id = $(this).children('span').attr('id');
    if(id != undefined){
        // console.log(id);
        const idparts = id.split('-');
        
        if(idparts.length == 3){
            // console.log(idparts[0], idparts[1], idparts[2]);
            // console.log('.' + idparts[1] + '-' + idparts[2] + '-con');
            hideAllNav(conList_main);
            $('.' + idparts[1] + '-' + idparts[2] + '-con').css('display', 'flex');
        }else if(idparts.length == 2){
            // console.log('.' + idparts[1] + '-con');
            hideAllNav(conList_main);
            $('.' + idparts[1] + '-con').css('display', 'flex');
        }
    }else{
        // console.log('not a nav....');
    }
});
$(document).on('mouseenter', '#nav', function(){
    const lock = $('.nav-locker').attr('status');
    if(lock == 'open'){
        maximizeNav();
    }else{
        const color1 = GREEN_PALETTE;
        const color2 = 'white';
        $('.nav-locker').stop( true, true).animate({ "color": color1 }, 100).animate({ "color": color2 }, 130).animate({ "color": color1 }, 100).animate({ "color": color2 }, 130);
    }
});
$(document).on('mouseleave', '#nav', function(){
    minimizeNav();
    $('.nav-sub-widget').hide();
});
let lockStatus = 'open';
$(document).on('click', '.nav-locker', function(){
    const status = $(this).attr('status');
    if(status == 'open'){
        $(this).removeClass('fa-lock-open').addClass('fa-lock');
        $(this).attr('status', 'locked');
        sessionStorage.setItem('lockStatus', 'fa-lock');
    }else{
        $(this).removeClass('fa-lock').addClass('fa-lock-open');
        $(this).attr('status', 'open');
        sessionStorage.setItem('lockStatus', 'fa-lock-open');
    }
});


//HOME EVENTS
$('#home-open').click(function(){
    let homeGate = true;
    if(createUploadGate){
        homeGate = false;
    }else if(createTestScheduleGate){
        homeGate = false;
    }
    if(homeGate){
        window.location.href = stepwellDomain + 'pages/control/';
    }
});
// user profile functions
$('#profile-open').click(function(){
    $('#profile').toggle();
});
$('#profile').click(function(e){
    if(e.target != this){
        return;
    }else{
        $(this).toggle();
    }
});
$('#profile-logout').click(function(){
    let logoutGate = true;
    if(createUploadGate){
        logoutGate = false;
    }else if(createTestScheduleGate){
        logoutGate = false;
    }
    if(logoutGate){
        logout();
    }
});
function profile_upload(){
    $(document).off('change', '#profile-upload'); 
    $(document).on('change','#profile-upload', function(){
        // console.log($(this).val().split('\\').pop());
        let filename = $(this).val().split('\\').pop();
        let extension = filename.split('.').pop();
        
        if(filename){
            console.log(filename, extension);

            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    $('#profile-img').attr('src',  e.target.result);
                }
                reader.readAsDataURL(this.files[0]);
            }
            $('.profile-img-save').css('display', 'flex').show();


            setTimeout(() => {
                // const cb =data=>{
                //     console.log(data);  
                // };
                // ajax_profileUpload($(this), cb, ()=>{});
                // ACCUSER.updateProfilePicture();
            }, 0);
        }else{
            console.log('cancelled');
        }
    });
}
$('#profile-img-upload').click(function(){
    ACCUSER.updateProfilePicture(()=>{
        showNotification("Account Update", "Updated Profile Picture");
        $('.profile-img-save').css('display', 'none').hide();
    });
});
$('#profile-img-cancel').click(function(){
    $('.profile-img-save').css('display', 'none').hide();
    fillProfile();
});

$('#complains-open').click(function(){
    const complaintypeobj = COMPANY.Complains.getComplainTypes();
    $('#complains-type').empty();
    setTimeout(() => {
        $.each(complaintypeobj, function(key, value){
            $('#complains-type').append(`
                <option value="${value.id}">${value.name}</option>
            `);
        }); 
    }, 0);
    $('#complains').toggle();
});
$('#complains').click(function(e){
    if(e.target != this){
        return;
    }else{
        $(this).toggle();
    }
});
$('#complains-submit').click(function(){
    const options = {
        'id' : rngComplainsId(),
        'companyid' : __COMPANY_ID,
        'sender' : __ID,
        'type' : $('#complains-type').val(),
        'message' : $('#complains-message').val(),
    }
    const cbtrue =()=>{
        console.log(options);

        const cb =()=>{
            showNotification("Ticket System", "Ticket sent successfuly! Updates may take 1-2 Business Days.");
            $('#complains').toggle();
            $('#complains-type').val("general");
            $('#complains-message').val("");
        };
        COMPANY.Complains.create(options, cb);
    };
    const cbfalse =()=>{
        showNotification("Ticket System", "Cancelled Ticket Sending");
        $('#complains').toggle();
    };
    showAction('Ready to send the Ticket?', cbtrue, cbfalse);
});

// MODULES EVENTS
$('#modules-open').click(function(){
    $('#modules').toggle();
});
$('#modules').click(function(e){
    if(e.target != this){
        return;
    }else{
        $(this).toggle();
    }
});
$('.modules-widget').click(function(){
    const mod = $(this).attr('id').split('-').pop();
    window.location.href = domain + 'pages/' + mod;
    
});
function getAccountModules(userlevel, id){
    // console.log('getAccountModules()', userlevel);
    if(userlevel != '' && userlevel != null && userlevel != undefined){
        if(userlevel == 1 || userlevel == 0){
            // ajax_fetchPreModule('getAccountModules', {});
            api_fetchCompanyModule(__COMPANY_ID, 'getAccountModules', {});
            $('#modules-open').show();
            // $('#modules-open').css('color','red' );
        }else if(userlevel == 3 || userlevel == 2){
            console.log('hide Modules');
            $('#modules-open').hide();
            api_fetchAccountModule(id, 'getAccountModules');
        }
    }
}



const conList_main = [
    $('.nav-maincontainer')
]
let headerTab = [];
let headerDefaultConlist = [
    {
        id: 'id',
        'title' : 'title',
        'conlist' : [
            '.con1',
            '.con2'
        ],
        'hideconlist' : [
            '.hidecon1',
            '.hidecon2'
        ]
    },{ // documents-prefs-edits-properties-tab
        id: 'documents-prefs-edits-properties-tab',
        'title' : 'Edit Document Properties',
        'conlist' : [
            '.documents-con',
            '.documents-edit'
        ],
        'hideconlist' : [
            '.documents-header',
            '.documents-body'
        ]
    },{ // docbuilder-dashboard-con
        id: 'docbuilder-dashboard-con',
        'title' : 'Dashboard',
        'conlist' : [
            '.dashboard-con'
        ],
        'hideconlist' : []
    },{ // define-con
        id: 'define-con',
        'title' : 'Define Documents',
        'conlist' : [
            '.define-con'
        ],
        'hideconlist' : []
    },{ // create-build-con
        id: 'create-build-con',
        'title' : 'Build Document',
        'conlist' : [
            '.create-build-con'
        ],
        'hideconlist' : []
    },{ // docbuilder-documents-con
        id: 'docbuilder-documents-con',
        'title' : 'My Documents',
        'conlist' : [
            '.documents-con',
            '.documents-header',
            '.documents-body'
        ],
        'hideconlist' : [
            '.documents-edit'
        ]
    },{ // create-upload-con
        id: 'create-upload-con',
        'title' : 'Upload New Document',
        'conlist' : [
            '.create-upload-con'
        ],
        'hideconlist' : []
    },{ // docflow-dashboard-con
        id: 'docflow-dashboard-con',
        'title' : 'Dashboard',
        'conlist' : [
            '.dashboard-con'
        ],
        'hideconlist' : []
    },{ // document-handle-con
        id: 'document-handle-con',
        'title' : 'Handle Document',
        'conlist' : [
            '.document-handle-con'
        ],
        'hideconlist' : [
            '.document-prefs-con'
        ]
    },{
        id: 'me-con',
        'title' : 'My Documents',
        'conlist' : [
            '.me-con'
        ],
        'hideconlist' : []
    },
];

function showHeaderTab(id){
    // const id = rngHeaderTabId();
    hideAllNav(conList_main);
    // console.log(id);
        let doublegate = true;
        let doubleid = '';
        for(i=0; i<headerTab.length; i++){
            if(id == headerTab[i].id){
                doublegate = false;
                doubleid = headerTab[i].id;
            }
        }

        let conlist = [];
        let hideconlist = [];
        let title;
        for(i=0; i<headerDefaultConlist.length; i++){
            if( id == headerDefaultConlist[i].id ){
                conlist = headerDefaultConlist[i].conlist;
                title = headerDefaultConlist[i].title;
                hideconlist = headerDefaultConlist[i].hideconlist;
            }
        }
    
        if(doublegate){
            const tab = `
                <div id="${id}" class="header-tab header-tab-active">
                    <i class="fas fa-times header-tab-close"></i>
                    <span class="header-tab-title">${title}</span>
                </div>
            `;
            $('#header').children('.header-tab-con').children('.header-tab').each(function(){
                $(this).removeClass('header-tab-active').addClass('header-tab-inactive');
            });
            $('#header').children('.header-tab-con').append(tab);

            
            
            for(i=0; i<hideconlist.length; i++){
                $(hideconlist[i]).hide();
            }
            for(i=0; i<conlist.length; i++){
                $(conlist[i]).show();
            }

            headerTab[headerTab.length] = {
                'id' : id,
                'title' : title,
                'conlist' : conlist,
                'hideconlist' : hideconlist
            };
    
            $(".header-tab-con").sortable({
                handle: ".header-tab, .header-tab-title",
                axis: "x",
                containment: '.header-tab-con',
                start: function(e, ui) {},
                helper: function(e, row) {
                  row.children().each(function() {
                    $(this).width($(this).width());
                  });
                  return row;
                }
            });
            $(".header-tab-con").disableSelection();
            
    
    
        }else{
            // console.log('already here');
            for(i=0; i<headerTab.length; i++){
                if(doubleid == headerTab[i].id){
                    const z = headerTab[i].hideconlist;
                    for(k=0; k<z.length; k++){
                        $(z[k]).hide();
                        // console.log(doubleid);
                    }
                    const x = headerTab[i].conlist;
                    for(j=0; j<x.length; j++){
                        $(x[j]).show();
                        // console.log(doubleid);
                    }
                    showActiveHeaderTab( $('#' + doubleid) );
                }
            }
        }
    
    // console.log(headerTab);
}
function showActiveHeaderTab(tab){
    
    hideAllNav(conList_main);
    const id = tab.attr('id');
    // console.log(id);
    $('#header').children('.header-tab-con').children('.header-tab').each(function(){
        $(this).removeClass('header-tab-active').addClass('header-tab-inactive');
    });
    tab.removeClass('header-tab-inactive').addClass('header-tab-active');

    for(i=0; i<headerTab.length; i++){
        if(headerTab[i].id == id){
            const conlist = headerTab[i].conlist;
            const hideconlist = headerTab[i].hideconlist;
            for(k=0; k<hideconlist.length; k++){
                $(hideconlist[k]).hide();
            }
            for(j=0; j<conlist.length; j++){
                $(conlist[j]).show();
            }
        }
    }
}
// HEADER TAB EVENTS
$(document).on('click', '.header-tab', function(e){
    // console.log('click');
    if(e.target == this || e.target.tagName == 'SPAN'){
        hideAllNav(conList_main);
        showActiveHeaderTab($(this));
    }
    
});
$(document).on('click', '.header-tab-close', function(){
    // console.log('close');
    const id = $(this).parent('.header-tab').attr('id');
    let x = 0;
    let idval = 0;
    let tabnum = $('#header').children('.header-tab-con').children('.header-tab').length;
    console.log(tabnum);
    $('#header').children('.header-tab-con').children('.header-tab').each(function(){
        if(id == $(this).attr('id')){
            idval = x;
        }
        x++;
    });

    // console.log(idval);
    if(idval > 0){
        for(i=0; i<headerTab.length; i++){
            if(headerTab[i].id == id){
                // console.log($('#' + headerTab[i].id)[0].classList[1]);
                const cl = $('#' + headerTab[i].id)[0].classList[1];
    
                if(cl.includes('inactive')){
                    // console.log('inactive');
                    $('#' + headerTab[i].id).remove();
                    // headerTab.splice((i-1), 1);
                    // console.log(headerTab, (i-1));
                    console.log(id);
                    headerTab = $.grep(headerTab, function(e){ 
                        return e.id != id; 
                    });
                }else{
                    // console.log('active');
                    $('#' + headerTab[i].id).remove();
                    // console.log('#' + headerTab[(i-1)].id);
                    showActiveHeaderTab( $('#' + headerTab[(i-1)].id) );
                    // headerTab.splice((i), 1);
                    // console.log(id);
                    headerTab = $.grep(headerTab, function(e){ 
                        return e.id != id; 
                    });
                    // console.log(headerTab, (i-1));
                }
            }
        }
    }else{
        for(i=0; i<headerTab.length; i++){
            if(headerTab[i].id == id){
                const cl = $('#' + headerTab[i].id)[0].classList[1];
                if(cl.includes('inactive')){
                    // console.log('inactive');
                    $('#' + headerTab[i].id).remove();
                    // headerTab.splice((i-1), 1);
                    // console.log(headerTab, (i-1));
                    console.log(id);
                    headerTab = $.grep(headerTab, function(e){ 
                        return e.id != id;
                    });
                }else{
                    // console.log('active');
                    $('#' + headerTab[i].id).remove();
                    // console.log('#' + headerTab[(i-1)].id);
                    if(tabnum > 1){
                        showActiveHeaderTab( $('#' + headerTab[(i+1)].id) );
                    }else{
                        hideAllNav(conList_main);
                    }
                    // headerTab.splice((i), 1);
                    // console.log(id);
                    headerTab = $.grep(headerTab, function(e){ 
                        return e.id != id; 
                    });
                    // console.log(headerTab, (i-1));
                }
            }
        }
    }
    // console.log(headerTab);
});


function showToast(message){
    $('#toast').children('span').text(message);
    $('#toast')
    .stop(true, true)
    .css({
        "opacity" : 0,
        "display" : "flex"
    })
    .show()
    .animate({"opacity" : 1}, 1000, function(){
        // setTimeout(() => {
        //     $('#toast').stop(true, true)
        //     .animate({"opacity" : 0}, 1000, function(){
        //         $('#toast').css({
        //             "opacity" : 0,
        //             "display" : "none"
        //         }).hide();
        //     });
        // }, 3000);
    })
    // .stop(true, true)
    .delay(3000)
    .stop(true, true)
    .animate({"opacity" : 0}, 3000, function(){
        $('#toast').css({
            "opacity" : 0,
            "display" : "none"
        }).hide();
    });
}

$(document).ready(function(){
    $('img').prop('draggable', false);

    lockStatus = sessionStorage.getItem('lockStatus');
    if(lockStatus == 'fa-lock'){
        $('#nav').append(`
            <i status="locked" class="fas fa-lock nav-locker"></i>
        `);
    }else{
        sessionStorage.setItem('lockStatus', 'fa-lock-open');
        $('#nav').append(`
            <i status="open" class="fas fa-lock-open nav-locker"></i>
        `);
    }


});


function task_assign_click(){
    // set some stuff in sessionstorage
        // 1. callid
    
}


// window.onbeforeunload = confirmExit;
// function confirmExit() {
//     console.log('test');
//     return "Your unsaved data will be deleted once you leave this webpage. Are you sure you want to leave?";
// }


// const alertList = {
//     'callid' : {
//         'title' : 'New Title',
//         'message' : 'Way too long Message',
//         'button-text' : 'View in Task',
//         'button-click' : task_assign_click
//     },
//     'callid' : {
//         'title' : 'New Title',
//         'message' : 'Way too long Message',
//         'button-text' : 'View in Task',
//         'button-click' : task_assign_click
//     },

// };





















function rngAccRoleId(){
    return 'AROLE-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}
function rngAccRateId(){
    return 'AR-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}

function rngSupRateId(){
    return 'SR-' + rng09() +  rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09() + rng09();
}