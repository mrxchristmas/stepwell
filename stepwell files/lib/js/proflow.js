
// ///////// NOEL CODE ////////////////



class Account{
    constructor(options){
        this.id = options.id;
        this.companyid = options.companyid;
        this.email = options.email;
        this.password = options.password;
        this.userlevel = options.userlevel;
        this.lastname = options.lastname;
        this.firstname = options.firstname;
        this.phone = options.phone;
        this.birthdate = options.birthdate;
        this.position = options.position;
        this.department = options.department;
        this.photo = options.photo;
        this.superid = options.superid;
    }

    getMinInfo(){
        return {
            "id" : this.id,
            "firstname" : this.firstname,
            "lastname" : this.lastname
        }
    }

}
class AccountList{
    constructor(type){
        this.list = [];
        this.type = type;
    }

    fetch(param){
        if(this.type == "account"){
            const cbsuccess=data=>{
                $.each(data, function(key, val){
                    const options = {
                        "id" : value.id,
                        "companyid" : value.companyid,
                        "email" : value.email,
                        "password" : value.password,
                        "userlevel" : value.userlevel,
                        "lastname" : value.lastname,
                        "firstname" : value.firstname,
                        "phone" : value.phone,
                        "birthdate" : value.birthdate,
                        "position" : value.position,
                        "department" : value.department,
                        "photo" : value.photo
                    }
                    this.list[this.list.length] = new Account(options);
                });
            };
            const cbcomplete=()=>{
                console.log('Account Fetch Successful');
            };
            api_fetchAccount(param, 'na', '', {}, cbcomplete, cbsuccess);
        }else if(this.type == "project"){
            const dis = this;
            const cbsuccess=data=>{
                $.each(data, function(key, value){
                    const options = {
                        "id" : value.id,
                        "companyid" : value.companyid,
                        "email" : value.email,
                        "password" : value.password,
                        "userlevel" : value.userlevel,
                        "lastname" : value.lastname,
                        "firstname" : value.firstname,
                        "phone" : value.phone,
                        "birthdate" : value.birthdate,
                        "position" : value.position,
                        "department" : value.department,
                        "photo" : value.photo
                    }
                    dis.list[dis.list.length] = new Account(options);
                });
            };
            api_fetchAccountByProjectConnect(param, cbsuccess);
        }
    }
    fillSelectTag(selector){
        selector.empty();
        $.each(this.list, function(key, value){
            const x = value.getMinInfo();
            selector.append(`
                <option value="${x.id}">${x.firstname} ${x.lastname}</option>
            `);
        });
    }
    
}
class Supplier{
    constructor(options){
        this.supplierid = options.supplierid;
        this.companyid = options.companyid;
        this.projectid = options.projectid;
        this.name = options.name;
    }
    getInfo(){
        return{
            'supplierid' : options.supplierid,
            'companyid' : options.companyid,
            'projectid' : options.projectid,
            'name' : options.name
        }
    }
    create(callback=()=>{}){
        const options = this.getInfo();
        const cbsuccess=()=>{
            callback();
        };
        api_createSupplier(options.supplierid, options.companyid, options.projectid, options.name, cbsuccess);
    }
    delete(callback=()=>{}){
        const options = this.getInfo();
        const cbsuccess=()=>{
            callback();
        };
        api_deleteSupplier(options.supplierid, cbsuccess);
    }
}
class SupplierList{
    constructor(){
        this.list = [];
        this.ConnectByResource = undefined;
    }
    fetch(callback){
        const  cbsuccess=data=>{
            const dis = this;
            if(data.response != "error"){
                $.each(data, function(key, value){
                    const options = {
                        'supplierid' : value.supplierid,
                        'companyid' : value.companyid,
                        'projectid' : value.projectid,
                        'name' : value.name
                    };
                    dis.list[dis.list.length] = new Supplier(options);
                });
            }
        };
        const cbcomplete=()=>{
            callback();
        };
        api_fetchSupplierByCompanyId(__COMPANY_ID, '', {}, cbcomplete, cbsuccess);
    }
    fillSelectTag(selector){
        selector.empty();
        $.each(this.list, function(key, value){
            selector.append(`
                <option value="${value.supplierid}">${value.name}</option>
            `);
        });
    }
    getObjById(id){
        let obj = this.list.find(obj => obj.supplierid == id);
        return obj;
    }

}





// let account = new Account('project');
// account.fetch();

let ACCOUNT_LIST;
let ACCOUNT_PROJECT_LIST;
// let ACCUSER.Supplier;

let buildProjList = [];

let mapPlandocList = [];
let mapActualdocList = [];

let buildPlandocList = [];

let testScheduleId = '';
let temptestScheduleId = '';


let selprojectid = '';
let selprojectname = '';
let selownerid = '';
let selfirstname = '';
let sellastname = '';
let selphoto = '';

let mainterval;

let conList = [
    $('.nav-maincontainer'),
];


let alerts;

$(document).ready(function(){
    // this $(document).ready(); function runs after browser loads all html elements
    // it fires everytime you refresh the page. hence it runs when you first land on the page

    const cb1 = data => {
        // console.log(data.ID);
        // all these variables are from defaults.js
        // variables are getting the data from the api call api_checkIfLoggedIn() which is from api_login.js
        // this function runs on success api call.
        __ID = data.ID;
        __USER_LEVEL =data.USER_LEVEL;
        __PASSWORD = data.PASSWORD;
        __PHOTO = data.PHOTO;
        __FIRST_NAME = data.FIRST_NAME;
        __COMPANY_ID = data.COMPANY_ID;
        __COMPANY_NAME = data.COMPANY_NAME;
        __COMPANY_LOGO = data.COMPANY_LOGO;

        const obj={
            'id':data.COMPANY_ID,
            'name':data.COMPANY_NAME,
            'logo':data.COMPANY_LOGO,
            'userid' : data.ID,
            'userfirstname' : data.FIRST_NAME,
            'userlevel' : data.USER_LEVEL,
            'userphoto' : data.PHOTO,
            'userpassword' : data.PASSWORD
        }
        // console.log(obj);
        COMPANY = new Company(obj);
        setTimeout(() => {
            const cb =()=>{
                
            };
            COMPANY.checkList('Complains', cb); 
        }, 0);
    };
    const cb2 = () => {
        // this function runs after api call is completed, right after success is called.
        // i mainly use this function to set the front end stuff. 
        hideAllNav(conList);
        fillCompany(__COMPANY_LOGO, __COMPANY_NAME);
        getAccountModules(__USER_LEVEL, __ID);
        $('#header-tab-module-name').text('Pro Flow');

        if( __USER_LEVEL != '' || __USER_LEVEL == null || __USER_LEVEL == undefined){
            if(__USER_LEVEL == '3'){
                // showAllNav(nav_usrconList);
                // $('.dashboard-user-con').show();
            }else if(__USER_LEVEL == '2'){
                // showAllNav(nav_supconList);
                // $('.dashboard-superuser-con').show();
            }else if(__USER_LEVEL == '1'){
                // showAllNav(nav_ceoconList);
                // $('.dashboard-admin-con').show();
            }else if(__USER_LEVEL == '0'){
                // showAllNav(nav_vipconList);
                // $('.dashboard-superadmin-con').show();
                // $('.moduleman-con').show();
            }
        }

        
        console.log("YOur Id is: ",__ID);
        

        // $('.project-schedule-con').show();
        // $('.schedule-body').show();
        // $('.request-createtool-con').css('display', 'flex').show();
        // $('.request-createtool-technical-con').css('display', 'flex').show();
        
        // $('.finance-spending-con').show();
        // $('.finance-spending-con').children('div').children('.popup').css('display', 'flex').show();
        // $('.finance-widget-upload').css('display', 'flex').show();
        // $('.popup-widget-upload').css('display', 'flex').show();
        

        // $('schedule-body').css('display', 'flex').show();
        // $('.request-createtool-con').css('display', 'flex').show();

        
        
        // $('.taskboard-dispute-con').css({"display" : "flex"}).show();

        

  

        
    };
    api_checkIfLoggedIn(cb1, cb2);
    // api_fetchProjectByConnect(__ID,"docuchart-fetchAllConnectedProjects");


    
    
    
});

function init(){
    // this function runs as soon as body element is loaded

    // $('#project-view-boards').click();
    minimizeNav();

    ACCUSER = new User({"id" : __ID, "companyid" : __COMPANY_ID});
    // ACCUSER.Supplier = new SupplierList();
    // SUPPLIER_LIST.fetch(()=>{});

    
    AlertWorker();
    const cb=()=>{
        const cb=()=>{
            // ACCUSER.checkList('ProjectGroup',()=>{});
            setTimeout(() => {
                const cb=data=>{
                    setTimeout(() => {
                        // const cb=data=>{
                            console.log(data);
                            ACCUSER.Alert.fill();
                            alertHandleRedirect();
                            $('#nav-dashboard').click();
                            fillProfile();
                        // }
                        // ACCUSER.checkList('Complains', cb);
                    }, 0);
                }
                ACCUSER.checkList('Alert', cb);
            }, 0);
        };
        ACCUSER.checkList('Supplier', cb);
    };
    ACCUSER.checkList('COMPANY_ACCOUNTS', cb);

    $('#loader').hide();

    // const cbsuccess=data=>{
    //     console.log(data);
    // };
    // capi_fetchAccountsByProjectResource({"projectid" : "P-230720344"}, cbsuccess);
    
    // showAlert(title, message, linktitle=null, link=null);
    // showAlert('Task Assignment asdasd  asd dasd asd a sda d', 'You have been Assigned to a new Task', 'View in User Taskboard', "usertaskboard");

    // alerts = new Alert({"accid" : __ID});
    // alerts.fill();
    
    //  ACCUSER.getProject('P-80221864').checkList('Budget',data=>console.log(data));
    //  ACCUSER.getProject('P-80221864').checkList('Item',data=>console.log(data));
    //  ACCUSER.getProject('P-80221864').checkList('Invoice',data=>console.log(data));
    //  $('#profile-open').css('color','red' );
}


// $(document).on('keydown', function(e){
//     console.log(e.which);
// });

window.addEventListener('load', function() {
    console.log('teeest');
    // var status = document.getElementById("status");
    // var log = document.getElementById("log");
    
    function updateOnlineStatus(event) {
        var condition = navigator.onLine ? "online" : "offline";
        console.log("beforeend", "Event: " + event.type + "; Status: " + condition);
        // status.className = condition;
        // status.innerHTML = condition.toUpperCase();
    
        // log.insertAdjacentHTML("beforeend", "Event: " + event.type + "; Status: " + condition);
    }
    
    window.addEventListener('online',  updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});



$('#finance_tracking_device_testing_btn').click(function(){
    var printContent = document.querySelector('#helooooooo');
    // var printContentlegend = document.querySelector('.fintrack-legend');
    var win = window.open('', '', 'width=1200 ,height=980');
    win.document.write(`<html><head> 
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pro Flow</title>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.13.0/css/all.css">
        <link href="${domain}lib/css/default.css" rel="stylesheet" /> 
        <link href="${domain}lib/css/project_launch.css" rel="stylesheet" /> 
        <link href="${domain}lib/css/project_page1.css" rel="stylesheet" />
        <link href="${domain}lib/css/project_page2.css" rel="stylesheet" />
        <link href="${domain}lib/css/project.css" rel="stylesheet" /> 
        <link href="${domain}lib/css/docuchat.css" rel="stylesheet" /> 
        </head> <body style="font-size: 0.8em; height: auto; background-color: transparent; border: 1px solid black; color: black; "> `);

    win.document.write(printContent.innerHTML);


    // win.document.write(`
    // <table class="tg">
    //     <thead>
    //         <tr>
    
    // `);
    // $('#helooooooo').children('.resource-body-legend').children('span').each(function(){
    //     win.document.write(`<th class="tg-0pky">${$(this).text()}</th>`);
    // });
    // win.document.write(`
    //     </tr>
    //     </thead>
    //     <tbody>
    // `);
    // $('#helooooooo').children('.resource-body-accountlist').children('.resource-body-accountlist-widget').each(function(){
    //     let acc = $(this).children('.step.acc');
    //     win.document.write(`
    //         <tr>
    //         <td class="tg-0pky">${acc.children('.name').text()}</td>
    //         <td class="tg-0lax">${acc.children('.type').text()}</td>
    //         <td class="tg-0pky">${acc.children('.hours').text()}</td>
    //         <td class="tg-0pky">${acc.children('.sdate').text()}</td>
    //         <td class="tg-0pky">${acc.children('.edate').text()}</td>
    //         <td class="tg-0pky">${acc.children('.days').text()}</td>
    //         </tr>
    //     `);
    //     $(this).children('.step.tasklist').children('.tasklist-widget').each(function(){
    //         win.document.write(`
    //             <tr>
    //             <td class="tg-0pky">${$(this).children('.title').text()}</td>
    //             <td class="tg-0lax"></td>
    //             <td class="tg-0pky">${$(this).children('.hours').text()}</td>
    //             <td class="tg-0pky">${$(this).children('.startdate').text()}</td>
    //             <td class="tg-0pky">${$(this).children('.enddate').text()}</td>
    //             <td class="tg-0pky">${$(this).children('.days').text()}</td>
    //             </tr>
    //         `);
    //     });
    // });

    // win.document.write(`
 
    //     </tbody>
    // </table>
    // `);
    // win.document.write('</body></html>');




    $(win.document).children('html').children('body').children('.resource-body-accountlist').css({'max-height' : 'initial', "height" : "auto"});
    $(win.document).children('html').children('body').children('.resource-body-accountlist').children('.resource-body-accountlist-widget').children('.step.tasklist').css({'display' : 'flex'}).show();



    $(win.document).children('html').children('body').children('.resource-body-accountlist').children('.resource-body-accountlist-widget').css({'border' : '1px solid black' , "background-color" : "white", "color" : "black"});
    $(win.document).children('html').children('body').children('.resource-body-accountlist').children('.resource-body-accountlist-widget').children('.step.tasklist').children('.tasklist-widget').css({'border' : '1px solid black' , "background-color" : "white", "color" : "black"});
    // console.log(win.document);

    setTimeout(() => {
        win.print();
        win.close();
    }, 1000);
});




function setProgress(p){
    let i = 0;
    let interval = setInterval(function(){
        if(i > p){
            clearInterval(interval);
        }else{
            $('.resource-footer-progress').text('Project Progress: ' + i + '%');
            $('.resource-footer-progress').css({
                'background' : `linear-gradient(146deg, ${GREEN_PALETTE} ${i}%, grey ${i+10}%)`
            });
            
            i++;
        }
    }, 20);
}
function progressAnim(p){
    clearInterval(mainterval);
    let interval = setInterval(function(){
        $('.resource-footer-progress').text('Project Progress: ' + i + '%');
        $('.resource-footer-progress').css({
            'background' : `linear-gradient(146deg, ${GREEN_PALETTE} ${i}%, grey ${i+5}%)`
        });
        i++;
        if(i > p){
            clearInterval(interval);
        }
    }, 20);

    mainterval = setInterval(function(){
        setProgress(p);
    }, 7000);
}




//NAVIGATION EVENTS
$('.nav-widget-con').click(function(){
    const id = $(this).children('span').attr('id');
    console.log(id);
    if(id != undefined && id != null && id != ''){
        if(id=="nav-chart"){

            const cb =()=>{
                const x = ACCUSER.getProject('P-230720344').TaskResource.getChartHours();
                // Load google charts
                google.charts.load('current', {'packages':['corechart']});
                google.charts.setOnLoadCallback(drawChart);
    
                // Draw the chart and set the chart values
                function drawChart() {
                    console.log(x);
                    var data = google.visualization.arrayToDataTable(x);
    
                    // Optional; add a title and set the width and height of the chart
                    var options = {'title':'Project Chart'};
    
                    // Display the chart inside the <div> element with id="piechart"
                    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
                    chart.draw(data, options);
                }
            };
            ACCUSER.getProject('P-230720344').checkList('TaskResource', cb);
            
        }
        if(id=="nav-project-schedule"){
            console.log('Build Schedule clicked');
            showRefreshReport('Loading...');
            setTimeout(() => {
                const cb =()=>{
                    const cb =()=>{
                        const cb =()=>{
                            const cb =()=>{
                                const cb =()=>{
                                    // const prlist = ACCUSER.getConnectedProjects();
                                    // console.log(prlist);
                                    // $.each(prlist, function(key,value){
                                    //     const callback =() =>{
                                    //     };
                                    //     ACCUSER.getProject(value.projectid).checkList('Request',callback);
                                    // });
                                };
                                ACCUSER.checkList("Position", cb);
                            };
                            ACCUSER.checkList("Department", cb);
                        };
                        ACCUSER.checkList("IncomingProjectRequest", cb);
                    };
                    ACCUSER.checkList("OutgoingProjectRequest", cb);
                };
                ACCUSER.checkList("COMPANY_ACCOUNTS", cb);
                setTimeout(() => {
                    hideRefreshReport();
                }, 0);
            }, 0);
        }
        if(id=="nav-schedule-task"){
            
        }
        if(id=="nav-finance-tracker"){
            ACCUSER.fillSelectTagWithConnectedProject( $('#project-fintrack-list') );
            $('#project-fintrack-list').prepend(`
                <option value="na">Select Project</option>
            `);
            $('#project-fintrack-list')[0].selectedIndex = 0;

            $('.fintrack-footer').css({'display': 'none'}).hide();
            $('.fintrack-body').css({'display': 'none'}).hide();
            $('.fintrack-legend').css({'display': 'none'}).hide();
            $('#fintrack-mods-calendar').parent('.fintrack-mods-widget').css({"display" : "none"}).hide();
            $('#fintrack-mods-tracking').parent('.fintrack-mods-widget').css({"display" : "none"}).hide();
        }
        if(id=="nav-finance-budget"){
            ACCUSER.fillSelectTagWithConnectedProject( $('#project-finbud-list') );
            $('#project-finbud-list').prepend(`
                <option value="na">Select Project</option>
            `);
            $('#project-finbud-list')[0].selectedIndex = 0;
            $('.finbud-footer').css({'display': 'none'}).hide();
            $('.finbud-body').css({'display': 'none'}).hide();
            $('.finbud-legend').css({'display': 'none'}).hide();
        }
        if(id=="nav-dashboard"){
            showRefreshReport("Loading...");
                    
            $('.project-manage-view-con').hide();
            $('.project-manage-connect-con').hide();
            $('.dashboard-body-header-widget.map, .dashboard-body-header-widget.schedule, .dashboard-body-header-widget.launch, .dashboard-body-header-widget.boards, .dashboard-body-header-widget.finance').hide();
            $('#dashboard-body-projectname').text('');
            $('.project-finance-divider').hide();
            $('.project-view-finance-widget').hide();
            $('.project-board-divider').hide();
            $('.project-view-boards-widget').hide();
            console.log('nice');

            ACCUSER.fillProflowDashboardProject();
            // setTimeout(() => {
            //     const cb=data=>{
            //         console.log(data);
            //         $('#active-overview-owned-projects').children('.stat').html(data.ownedProjects);
            //         $('#active-overview-connected-projects').children('.stat').html(data.connectedProjects);
            //         $('#active-overview-active-projects').children('.stat').html(data.activeProjects);
            //     };
            //     ACCUSER.checkList('Overview', cb);
            // }, 0);
            fillProflowStaticDashboard();
            $('.dashboard-body-content-project').hide();
            $('.dashboard-body-content-details').hide();
            $('.dashboard-body-content-hours').hide();
            $('.dashboard-body-content-budget').hide();
            $('.dashboard-body-content-honors').hide();
            setTimeout(() => {
                hideRefreshReport();
            }, 0);
                
        }
        if(id=="nav-project-timesheet"){

            ACCUSER.fillSelectTagWithActiveConnectedProject( $('#project-timesheet-list') );
            $('#project-timesheet-list').prepend(`
                <option value="na">Select Project</option>
            `);
            $('#project-timesheet-list')[0].selectedIndex = 0;
            $('.timesheet-footer').css({'display': 'none'}).hide();
            $('.timesheet-body').css({'display': 'none'}).hide();
            $('.timesheet-legend').css({'display': 'none'}).hide();
            // console.log('test');
            const today = new Date();
            today.setHours(0,0,0,0);
            const cyear = today.getFullYear();
            const start = dateFns.startOfWeek(today, {weekStartsOn: 1});
            const ww = dateFns.getISOWeek(new Date(start), {weekStartsOn: 1});
            $('#timesheet-mods-week').val(`${cyear}-W${ww}`);

            $('#timesheet-mods-calendar').parent('.fintrack-mods-widget').css({"display" : "none"}).hide();
        }
        if(id=="nav-usertaskboard"){
            ACCUSER.fillSelectTagWithConnectedProject( $('#usertaskboard-header-filter-project') );
            $('#usertaskboard-header-filter-project').prepend(`
                <option value="na">Select Project</option>
            `);
            $('#usertaskboard-header-filter-project')[0].selectedIndex = 0;
            // $('#usertaskboard-header-filter-project').prepend(`<option value="all">All Projects</option>`)
            $('.usertaskboard-body').css({"display" : "none"}).hide();  

            const tmp = new Date();
            var day = ("0" + tmp.getDate()).slice(-2);
            var month = ("0" + (tmp.getMonth() + 1)).slice(-2);
            const dateStr = tmp.getFullYear() + '-' + month + '-' + day;
            console.log(dateStr);
            $('.usertaskboard-header-filter-datefrom > input').val(dateStr);
        }
        if(id=="nav-archive"){
            fillArchiveUI();
        }
    }
});

// displayDocumentSchedule()

let resourceBoardTasklist = [];
let resourceBoardTaskResourceList = [];

// DASHBOARD EVENTS // other events on dashboard are from project.js - need to move 
    // OBSOLETE EVENTS START
$('.dashboard-body-header-widget.share').click(function(e){
    if($(this).attr('status') == 'closed'){
        $('.dashboard-body-header-widget.launch').animate({'opacity' : 0}, 200), function(){
            $(this).hide();
        };
        $('.dashboard-body-header-widget.create').animate({'opacity' : 0}, 200), function(){
            $(this).hide();
        };
        $('.dashboard-body-header-widget.boards').animate({'opacity' : 0}, 200), function(){
            $(this).hide();
        };
        setTimeout(function(){
            $('.dashboard-body-header-widget.share').css('position','absolute').animate({'left': '0px', 'top' : '0px'}, 200, function(){
                $('.dashboard-body-header-widget.share > .dashboard-body-title').css({
                    'border-left': 'none',
                    'border-top': 'none'
                }).removeClass('btn-shadow');
                $('.dashboard-body-header-widget.share').css({
                    'background-color':  BTN_COLOR,
                    'border-left': '2px solid whitesmoke',
                    'border-top': '1px solid whitesmoke'
                }).animate({
                    'width' : '400px', 
                    'height' : '150px'
                }, 200, function(){
                    $('.dashboard-body-header-widget.share > .content').css({'display': 'flex', 'opacity' : '1'}).show();
                    $('.dashboard-body-header-widget.share').attr('status', 'open');
                    $('#dashboard-share-close').show();
                }).addClass('btn-shadow');
    
            });
        }, 200);
    }
});
$('#dashboard-share-close').click(function(){
    $(this).hide();
    $('.dashboard-body-header-widget.share > .content').animate({'opacity': '0'}, 200, function(){
        $(this).hide();
        $('.dashboard-body-header-widget.share').animate({'width' : '150px', 'height' : '50px'}, 200, function(){
            $('.dashboard-body-header-widget.share').attr('status', 'closed');
            $('.dashboard-body-header-widget.launch').animate({'opacity' : 1}, 200), function(){
                $(this).show();
            };
            $('.dashboard-body-header-widget.create').animate({'opacity' : 1}, 200), function(){
                $(this).show();
            };
            $('.dashboard-body-header-widget.share').css({'position': 'initial', 'opacity' : '0'}).animate({'opacity' : 1}, 200), function(){
                $(this).show();
            };
            $('.dashboard-body-header-widget.boards').css({'position': 'initial', 'opacity' : '0'}).animate({'opacity' : 1}, 200), function(){
                $(this).show();
            };
        });
    });

});
$('.dashboard-body-header-widget.create').click(function(e){
    if($(this).attr('status') == 'closed'){
        $('.dashboard-body-header-widget.launch').animate({'opacity' : 0}, 200), function(){
            $(this).hide();
        };
        $('.dashboard-body-header-widget.share').animate({'opacity' : 0}, 200), function(){
            $(this).hide();
        };
        $('.dashboard-body-header-widget.boards').animate({'opacity' : 0}, 200), function(){
            $(this).hide();
        };
        setTimeout(function(){
            $('.dashboard-body-header-widget.create').css('position','absolute').animate({'left': '0px', 'top' : '0px'}, 200, function(){
                $('.dashboard-body-header-widget.create > .dashboard-body-title').css({
                    'border-left': 'none',
                    'border-top': 'none'
                }).removeClass('btn-shadow');
                $('.dashboard-body-header-widget.create').css({
                    'background-color':  BTN_COLOR,
                    'border-left': '2px solid whitesmoke',
                    'border-top': '1px solid whitesmoke'
                }).animate({
                    'width' : '400px', 
                    'height' : '250px'
                }, 200, function(){
                    $('.dashboard-body-header-widget.create > .content').css({'display': 'flex', 'opacity' : '1'}).show();
                    $('.dashboard-body-header-widget.create').attr('status', 'open');
                    $('#dashboard-create-close').show();
                }).addClass('btn-shadow');
    
            });
        }, 200);
    }
});
$('#dashboard-create-close').click(function(){
    $(this).hide();
    $('.dashboard-body-header-widget.create > .content').animate({'opacity': '0'}, 200, function(){
        $(this).hide();
        $('.dashboard-body-header-widget.create').animate({'width' : '150px', 'height' : '50px'}, 200, function(){
            $('.dashboard-body-header-widget.create').attr('status', 'closed');
            
            $('.dashboard-body-header-widget.launch').animate({'opacity' : 1}, 200), function(){
                $(this).show();
            };
            $('.dashboard-body-header-widget.share').animate({'opacity' : 1}, 200), function(){
                $(this).show();
            };
            $('.dashboard-body-header-widget.create').css({'position': 'initial', 'opacity' : '0'}).animate({'opacity' : 1}, 200), function(){
                $(this).show();
            };
            $('.dashboard-body-header-widget.boards').css({'position': 'initial', 'opacity' : '0'}).animate({'opacity' : 1}, 200), function(){
                $(this).show();
            };
        });
    });

});
    // OBSOLETE EVENTS END


    // project status board events
$('#project-view-boards-task').click(function(){
    // console.log('HUKBALAHAP');
    const projectid = $('#dashboard-body-projectname').attr('prid');
    const projectname = $('#dashboard-body-projectname').attr('pn');
    const firstname = $('#dashboard-body-projectname').attr('fn');
    const lastname = $('#dashboard-body-projectname').attr('ln');
    const photo = $('#dashboard-body-projectname').attr('photo');
    const ownerid = $('#dashboard-body-projectname').attr('ow');
    // console.log(projectid, projectname, firstname, lastname, photo, ownerid);

    
    showRefreshReport("Loading...");
    setTimeout(() => {
        const cb =data=>{
            console.log(data);
            const cb1 =data=>{
                console.log(data);
                $('#taskboard-header-projectname').text(projectname);
                $('#taskboard-header-projectid').text(projectid);
                $('#taskboard-header-ownername').text(`${firstname} ${lastname}`);
            
                $('.dashboard-con').hide();
                $('.taskboard-con').show();
                $('.taskboard-body').hide();
                
                $('#taskboard-header-filter-datefrom').val(getDateNow()).attr('max', getDateNow());
                hideLoadingReport();
            };
            ACCUSER.getProject(projectid).checkList('TaskResource',cb1);
        };
        ACCUSER.getProject(projectid).checkList('Task',cb);
    }, 0);
    setTimeout(() => {
        hideRefreshReport();
    }, 0);
   
});
$('#project-view-boards-document').click(function(){
    const projectid = $('#dashboard-body-projectname').attr('prid');
    const projectname = $('#dashboard-body-projectname').attr('pn');
    const firstname = $('#dashboard-body-projectname').attr('fn');
    const lastname = $('#dashboard-body-projectname').attr('ln');
    const photo = $('#dashboard-body-projectname').attr('photo');
    const ownerid = $('#dashboard-body-projectname').attr('ow');

    $('#status-header-projectname').text(projectname);
    $('#status-header-projectid').text(projectid);
    $('#status-header-ownername').text(`${firstname} ${lastname}`);

    $('.dashboard-con').hide();
    $('.status-con').show();

    $('#status-header-filter-fromdate').val(getDateNow()).attr('max', getDateNow());

});
$('#project-view-boards-resource').click(function(){
    const projectid = $('#dashboard-body-projectname').attr('prid');
    const projectname = $('#dashboard-body-projectname').attr('pn');
    const firstname = $('#dashboard-body-projectname').attr('fn');
    const lastname = $('#dashboard-body-projectname').attr('ln');
    const photo = $('#dashboard-body-projectname').attr('photo');
    const ownerid = $('#dashboard-body-projectname').attr('ow');

    let hours_total = 0;
    let hours_startdate = "";
    let hours_enddate = "";
    let tmp_hours_startdate = [];
    let tmp_hours_enddate = [];
    let hours_user = 0;
    let hours_completed = 0;
    let hours_variance = 0;

    
    showRefreshReport("Loading...");
    setTimeout(() => {
        $('#resource-header-projectname').text(projectname);
        $('#resource-header-projectid').text(projectid);
        $('#resource-header-ownername').text(`${firstname} ${lastname}`);

        const distinctIdList = ACCUSER.getProject(projectid).TaskResource.getDistinctIdList();
        console.log(distinctIdList);
        let hours = 0;
        $('.resource-body-accountlist').empty();
        $.each(distinctIdList, function(key, value){
            const trObj = ACCUSER.getProject(projectid).TaskResource.getObjByAccid(value.id);

            let thours = 0;
            let chours = 0;
            let minD;
            let maxD;
            let tasklistHtml = '';
            let name = '';
            if(trObj.length > 0){
                let startdates = [];
                let enddates = [];
        
                $.each(trObj, function(key, value1){
                    // console.log('ASDASDASDSAD',value1.taskid);
                    const dates = ACCUSER.getProject(projectid).Task.getMinMaxDates(value1.taskid);
                    const h = ACCUSER.getProject(projectid).Timesheet.getHoursByTask({"taskid" : value1.taskid, "ownerid" : value.id});
                    const tobj = ACCUSER.getProject(projectid).Task.getTaskObj(value1.taskid);
                    const hh =  ACCUSER.getProject(projectid).TaskResource.getTotalHoursOfTaskByAccid({"taskid" : value1.taskid, "accid" : value.id});
                    const s = new Date(`${dates.startdate} 00:00:00`);
                    const e = new Date(`${dates.enddate} 00:00:00`);
                    chours += (isNaN(parseFloat(h)) ? 0 : parseFloat(h));
                    thours += (isNaN(parseFloat(value1.hours)) ? 0 : parseFloat(value1.hours));
                    startdates[startdates.length] = s;
                    enddates[enddates.length] = e;
                    hours_total += thours;

                    tasklistHtml += `
                        <div class="tasklist-widget ${tobj.status}">
                            <span class="title">${tobj.taskname}</span>
                            <span class="hours">${hh} Hours</span>
                            <span class="startdate" title="Start Date">${tobj.startdate}</span>
                            <span class="enddate" title="End Date">${tobj.enddate}</span>
                            <span class="days" title="Total Days">${h} Hours</span>
                            <span class="blocking"></span>
                        </div>
                    `;
                });
        
                let min = startdates.reduce(function (a, b) { return a < b ? a : b; });
                let max = enddates.reduce(function (a, b) { return a > b ? a : b; });
        
                minD = dateFns.format(
                    min,
                    'YYYY-MM-DD'
                );
                maxD = dateFns.format(
                    max,
                    'YYYY-MM-DD'
                );

                tmp_hours_startdate[tmp_hours_startdate.length] = min;
                tmp_hours_enddate[tmp_hours_enddate.length] = max;

                
            }else{
                // hours = 0;
                // minD = 0;
                // maxD = 0;
            }
            // console.log(value.id, value.name, value.type, thours, minD, maxD, chours);
            let type;
            if(value.type == "hours"){
                type = 'Team';
                if(value.id.includes('TA')){
                    const tmpaccobj = ACCUSER.getProject(projectid).getTmpAccountObj(value.id);
                    name = `${tmpaccobj.name} (TEMP)`;
                }else{
                    name = `${value.name}`;
                }
                hours_user += thours;
                hours_completed += chours;

            }else if(value.type == "supplier"){
                type = 'Supplier';
                if(value.id.includes("TS") ){
                    const tmpaccobj = ACCUSER.getProject(projectid).getTmpSupplierObj(value.id);
                    name =  `${tmpaccobj.name} (TEMP)`;
                }
                else{
                    name = `${value.name} `;
                }

            }else if(value.type == "tm"){
                type = 'Time and Materials';
                if(value.id.includes("TS") ){
                    const tmpaccobj = ACCUSER.getProject(projectid).getTmpSupplierObj(value.id);
                    name =  `${tmpaccobj.name} (TEMP)`;
                }
                else{
                    name = `${value.name} `;
                }
            }
            // console.log(tasklistHtml);

            $('.resource-body-accountlist').append(`
                <div id="RB-accList_${value.id}" class="resource-body-accountlist-widget color-sc">
                    <div class="step acc">
                        <span class="name"><i class="fas fa-bars" status="closed"></i>${name}</span>
                        <span class="type">${type}</span>
                        <span class="hours">${thours} Hours</span>
                        <span class="sdate">${minD}</span>
                        <span class="edate">${maxD}</span>
                        <span class="days">${chours} Hours</span>
                        <i class="fas fa-user-clock"></i>
                    </div>
                    <div class="step tasklist">
                        ${tasklistHtml}
                    </div>
                </div>
            `);

            $('.resource-body-accountlist-widget > .step.tasklist').hide();
        });

        setTimeout(() => {
            const zzzstart = tmp_hours_startdate.reduce(function (a, b) { return a < b ? a : b; });
            const zzzend = tmp_hours_enddate.reduce(function (a, b) { return a > b ? a : b; });
            
            hours_startdate = dateFns.format(
                zzzstart,
                'YYYY-MM-DD'
            );
            hours_enddate = dateFns.format(
                zzzend,
                'YYYY-MM-DD'
            );
            hours_variance = ((hours_completed / hours_user) * 100);

            // set date to week input
            const today = new Date();
            today.setHours(0,0,0,0);
            const cyear = today.getFullYear();
            const start = dateFns.startOfWeek(today, {weekStartsOn: 1});
            const ww = dateFns.getISOWeek(new Date(start), {weekStartsOn: 1});
            $('#timesheet-mods-week').val(`${cyear}-W${ww}`);

            $('.dashboard-con').hide();
            $('.boards-resources-con').show();
            $('.resource-body').show();
            $('.resource-calendar').hide();
            $('#resource-mods-resource').parent('.resource-mods-widget').hide();

            $('#resource-footer-hours-total').val(hours_total.toFixed(2) + ' hrs');
            $('#resource-footer-hours-startdate').val(hours_startdate);
            $('#resource-footer-hours-enddate').val(hours_enddate);
            $('#resource-footer-hours-user').val(hours_user.toFixed(2) + ' hrs');
            $('#resource-footer-hours-completed').val(hours_completed.toFixed(2) + ' hrs');
            $('#resource-footer-hours-variance').val(hours_variance.toFixed(2) + '%');
        }, 0);
    }, 0);
    setTimeout(() => {
        hideRefreshReport();
    }, 0);


});
$('#project-view-launch').click(function(){
    // const projectid = $('#dashboard-body-projectname').attr('prid');
    // showLoadingReport('Fetching Data.. Please Wait');
    // setTimeout(() => {
    //     const cb=data=>{
    //         console.log(data);
    //         const cb1=data=>{
    //             console.log(data);
    //             const cb2=data=>{
    //                 console.log(data);
    //                 const cb3=data=>{
    //                     console.log(data);
    //                     const cb4=data=>{
    //                         console.log(data);
    //                         hideLoadingReport();
    //                     };
    //                     ACCUSER.getProject(projectid).checkList('Request', cb4);
    //                 };
    //                 ACCUSER.getProject(projectid).checkList('Minutes', cb3);
    //             };
    //             ACCUSER.getProject(projectid).checkList('Notes', cb2);
    //         };
    //         ACCUSER.getProject(projectid).checkList('Register', cb1);
    //     };
    //     ACCUSER.getProject(projectid).checkList('ConnectByProjectId', cb);
    // }, 0);
    
    // $('#preferences-mods-financial').parent('.preferences-mods-widget').hide();
    // $('#preferences-mods-technical').parent('.preferences-mods-widget').hide();
    // cidRegister('');
    // cidNotes('');
    // cidMinutes('');

});
$('#project-view-boards').click(function(){
    const status = $(this).parent('.dashboard-body-header-widget').attr('status');
    if(status == 'open'){
        $(".project-view-boards-widget.conc, .project-board-divider.conc").hide( 'bounce', {'times' : 1}, 100, function(){
            $(".project-view-boards-widget.conb, .project-board-divider.conb").hide( 'bounce', {'times' : 1}, 100, function(){
                $(".project-view-boards-widget.cona, .project-board-divider.cona").hide( 'bounce', {'times' : 1}, 100, function(){
                    $(this).parent('.dashboard-body-header-widget').attr('status', 'closed');
                });
            });
        });
    }else{
        $(".project-view-boards-widget.cona, .project-board-divider.cona").show( 'bounce', {'times' : 1}, 100, function(){
            $(".project-view-boards-widget.conb, .project-board-divider.conb").show( 'bounce', {'times' : 1}, 100, function(){
                $(".project-view-boards-widget.conc, .project-board-divider.conc").show( 'bounce', {'times' : 1}, 100, function(){
                    $(this).parent('.dashboard-body-header-widget').attr('status', 'open');
                });
            });
        });
    }
});
$('#project-view-finance').click(function(){
    const status = $(this).parent('.dashboard-body-header-widget').attr('status');
    if(status == 'open'){
        $(".project-view-finance-widget.conc, .project-finance-divider.conc").hide( 'bounce', {'times' : 1}, 100, function(){
            $(".project-view-finance-widget.conb, .project-finance-divider.conb").hide( 'bounce', {'times' : 1}, 100, function(){
                $(".project-view-finance-widget.cona, .project-finance-divider.cona").hide( 'bounce', {'times' : 1}, 100, function(){
                    $(this).parent('.dashboard-body-header-widget').attr('status', 'closed');
                });
            });
        });
    }else{
        $(".project-view-finance-widget.cona, .project-finance-divider.cona").show( 'bounce', {'times' : 1}, 100, function(){
            $(".project-view-finance-widget.conb, .project-finance-divider.conb").show( 'bounce', {'times' : 1}, 100, function(){
                $(".project-view-finance-widget.conc, .project-finance-divider.conc").show( 'bounce', {'times' : 1}, 100, function(){
                    $(this).parent('.dashboard-body-header-widget').attr('status', 'open');
                });
            });
        });
    }
});
$('#project-view-finance-spending').click(function(){
    console.log('test');
    const projectid = $('#dashboard-body-projectname').attr('prid');
    const projectname = $('#dashboard-body-projectname').attr('pn');
    
    showRefreshReport("Loading...");
    setTimeout(() => {
        const cb =data=>{
            console.log(data);
            const cb =data=>{
                console.log(data);
                const callback=data=>{
                    console.log(data);
                    const cb =data=>{
                        console.log(data);
                        const cb =data=>{
                            console.log(data);
                            const cb =data=>{
                                console.log(data);
                                const cb =data=>{
                                    console.log(data);
                                    const cb =data=>{
                                        console.log(data);
                                        $('.dashboard-con').hide();
                                        $('.finance-spending-con').show();
                                        $('#spending-header-projectname').text(projectname);
                                        $('#spending-header-projectid').text(projectid);
                                        // hideLoadingReport();
                                        setTimeout(() => {
                                            hideRefreshReport();
                                        }, 0);
                                    };
                                    ACCUSER.getProject(projectid).checkList('AccountRate',cb);
                                };
                                ACCUSER.getProject(projectid).checkList('TmpSupplier',cb);
                            };
                            ACCUSER.getProject(projectid).checkList('AccountRole',cb);
                        };
                        ACCUSER.getProject(projectid).checkList('TmpAccount',cb);
                    };
                    ACCUSER.getProject(projectid).checkList('Invoice',cb);
                }
                ACCUSER.checkList('Supplier', callback);
            };
            ACCUSER.getProject(projectid).checkList('Item',cb);
        };
        ACCUSER.getProject(projectid).checkList('Budget',cb);
    }, 0);
	
    showLoadingReport('Fetching Data.. Please Wait');
});
$('#project-view-finance-budgeting').click(function(){
    const projectid = $('#dashboard-body-projectname').attr('prid');
    const projectname = $('#dashboard-body-projectname').attr('pn');
    
    showRefreshReport('Loading...');
    setTimeout(() => {
        const zcb=data=>{
            console.log(data);
            const zcb1=data=>{
                console.log(data);
                const zcb2=data=>{
                    console.log(data);
                    const zcb3=data=>{
                        console.log(data);
                        const zcb4=data=>{
                            console.log(data);
                            const zcb5=data=>{
                                console.log(data);
                                const zcb6=data=>{
                                    console.log(data);
                                    const zcb6=data=>{
                                        console.log(data);
                                        const zcb6=data=>{
                                            console.log(data);
                                            setTimeout(() => {
                                                fillFinanceBudgeting(projectid);
                                                $('.dashboard-con').hide();
                                                $('.finance-budget-con').css('display', 'flex').show();
                                                $('#finbud-header-projectname').text(projectname);
                                                $('#finbud-header-projectid').text(projectid);
                                            }, 0);
                                            setTimeout(() => {
                                                hideRefreshReport();
                                            }, 0);
                                        };
                                        ACCUSER.getProject(projectid).checkList('TmpSupplier', zcb6);
                                    };
                                    ACCUSER.getProject(projectid).checkList('TmpAccount', zcb6);
                                };
                                ACCUSER.getProject(projectid).checkList('ConnectByProjectId', zcb6);
                            };
                            ACCUSER.getProject(projectid).checkList('ConnectByResource', zcb5);
                        };
                        ACCUSER.getProject(projectid).checkList('SupplierRate', zcb4);
                    };
                    ACCUSER.getProject(projectid).checkList('AccountRate', zcb3);
                };
                ACCUSER.getProject(projectid).checkList('Timesheet', zcb2);
            };
            ACCUSER.getProject(projectid).checkList('TaskResource', zcb1);
        };
        ACCUSER.getProject(projectid).checkList('Supplier', zcb);
    }, 0);
        
});
$('#project-view-finance-tracker').click(function(){
    const projectid = $('#dashboard-body-projectname').attr('prid');
    const projectname = $('#dashboard-body-projectname').attr('pn');
    
    showRefreshReport('Loading...');
    setTimeout(() => {
        const zcb=data=>{
            console.log(data);
            const zcb1=data=>{
                console.log(data);
                const zcb2=data=>{
                    console.log(data);
                    const zcb3=data=>{
                        console.log(data);
                        const zcb4=data=>{
                            console.log(data);
                            const zcb5=data=>{
                                console.log(data);
                                const zcb6=data=>{
                                    console.log(data);
                                    const zcb6=data=>{
                                        console.log(data);
                                        const zcb6=data=>{
                                            console.log(data);
                                            setTimeout(() => {
                                                fillFinanceTracking(projectid);
                                                $('.dashboard-con').hide();
                                                $('.finance-tracker-con').css('display', 'flex').show();
                                                $('#fintrack-header-projectname').text(projectname);
                                                $('#fintrack-header-projectid').text(projectid);
                                                $('#fintrack-mods-tracking').parent('.fintrack-mods-widget').hide();
                                            }, 0);
                                            setTimeout(() => {
                                                hideRefreshReport();
                                            }, 0);
                                        };
                                        ACCUSER.getProject(projectid).checkList('TmpSupplier', zcb6);
                                    };
                                    ACCUSER.getProject(projectid).checkList('TmpAccount', zcb6);
                                };
                                ACCUSER.getProject(projectid).checkList('ConnectByProjectId', zcb6);
                            };
                            ACCUSER.getProject(projectid).checkList('ConnectByResource', zcb5);
                        };
                        ACCUSER.getProject(projectid).checkList('SupplierRate', zcb4);
                    };
                    ACCUSER.getProject(projectid).checkList('AccountRate', zcb3);
                };
                ACCUSER.getProject(projectid).checkList('Timesheet', zcb2);
            };
            ACCUSER.getProject(projectid).checkList('TaskResource', zcb1);
        };
        ACCUSER.getProject(projectid).checkList('Supplier', zcb);
    }, 0);
    
});
 








// PROJECT ARCHIVE EVENTS
function fillArchiveUI(){
    const probj = ACCUSER.getConnectedProjects();
            // console.log(probj);
    $('#archive-archivelist-content').empty();
    $('#archive-projectlist-content').empty();

    let prhtml = '';
    let arhtml = '';
    let x = probj.length;
    $.each(probj, function(key, value){
        if(value.status == "archived"){
            arhtml += `
                <div class="widget">
                    <span>${value.projectname}</span>
                    <div class="action">
                        <button onclick="deleteArchivedProject('${value.projectid}')" title="Permanently Removes all record of the Project" class="btn-shadow">Delete</button>
                        <button onclick="downloadArchivedProject('${value.projectid}')" title="Download the project File" class="btn-shadow">Download</button>
                        <button onclick="revertArchivedProject('${value.projectid}')" title="Will Set Project Status into Inactive" class="btn-shadow">Put Back to Inactive</button>
                    </div>
                </div>
            `;
        }else{
            prhtml += `<span class="widget">${value.projectname} - ${value.status} <i onclick="archiveProject('${value.projectid}')" title="Archive the Project" class="fas fa-archive"></i> </span>`
        }

        if(!--x){
            $('#archive-archivelist-content').append(arhtml);
            $('#archive-projectlist-content').append(prhtml);
        }
    });
}
function archiveProject(e){
    console.log(e);
    const cbtrue =()=>{
        const cbok =()=>{
            const cb =data=>{
                console.log(data);
                showNotification("Validate Success. Project Archived.");
                fillArchiveUI();
            };
            const options = {
                status: "archived",
                projectid: e 
            }
            ACCUSER.getProject(e).updateStatus(options, cb);
        };
        const cberror =()=>{
            showNotification("Validate Failed.");
        };

        showValidate(cbok, cberror);
    };
    showAction("You are about to archive this project. Proceed?", cbtrue, ()=>{});
}
function revertArchivedProject(e){
    console.log(e);
    const cbtrue =()=>{
        const cbok =()=>{
            const cb =data=>{
                console.log(data);
                const cb =()=>{
                    setTimeout(() => {
                        const cb =data=>{
                            console.log(data);
                            fillArchiveUI();
                            showNotification("Validate Success. Project Reverted.");
                        };
                        const options = {
                            status: "idle",
                            projectid: e 
                        }
                        ACCUSER.getProject(e).Request.updateStatus(options, cb);
                    }, 0);
                };
                ACCUSER.getProject(e).checkList("Request", cb);
            };
            const options = {
                status: "inactive",
                projectid: e 
            }
            ACCUSER.getProject(e).updateStatus(options, cb);
        };
        const cberror =()=>{
            showNotification("Validate Failed.");
        };
        showValidate(cbok, cberror);
    };
    showAction("You are about to revert this project to inactive status. Proceed?", cbtrue, ()=>{});

}
function deleteArchivedProject(e){
    console.log(e);
    

    const cbtrue =()=>{
        const cbok =()=>{
            const jsonObj = ACCUSER.getProject(e).export();
            const jsonStr = JSON.stringify(jsonObj);
            const encodedStringBtoA = btoa(jsonStr);
            console.log('encodedStringBtoA',encodedStringBtoA);
            $('#archive-body-a-download').attr({
                "href" : `data:application/octet-stream;charset=utf-8; txt, ${encodedStringBtoA}`,
                "download" : `${e}.proflowproject`
            });

            const cb =g=>{
                if(g){
                    $('#archive-body-a-download')[0].click();
                    showNotification("Validate Success. Project Downloaded and Deleted.");
                    fillArchiveUI();
                }else{
                    showNotification("Something Went Wrong...");
                    fillArchiveUI();
                }
            };
            ACCUSER.projectValhalla(e, cb);


        };
        const cberror =()=>{
            showNotification("Validate Failed.");
        };

        showValidate(cbok, cberror);
    };
    showAction("You are about to Delete all traces of this project. Proceed?", cbtrue, ()=>{});


}
function downloadArchivedProject(e){
    console.log(e);

    const jsonObj = ACCUSER.getProject(e).export();
    const jsonStr = JSON.stringify(jsonObj);
    const encodedStringBtoA = btoa(jsonStr);
    console.log('encodedStringBtoA',encodedStringBtoA);
    $('#archive-body-a-download').attr({
        "href" : `data:application/octet-stream;charset=utf-8; txt, ${encodedStringBtoA}`,
        "download" : `${e}.proflowproject`
    });
    $('#archive-body-a-download')[0].click();


}
function archive_mods_widget_browse(){
    $(document).off('change', `#archive-mods-widget-browse`); 
    $(document).on('change', `#archive-mods-widget-browse`, function(e){
        console.log($(this).val().split('\\').pop());
        let filename = $(this).val().split('\\').pop();
        let extension = filename.split('.').pop();
        
        if(filename){
            // console.log(filename, extension);
            if(extension == "proflowproject"){
                console.log('good to go');
                var reader = new FileReader();
                reader.onload = (e)=>{
                    const file = e.target.result;
                    console.log(file);
                    var encodedStringAtoB = file;
                    var decodedStringAtoB = atob(encodedStringAtoB);
    
                    const decodedJSON = JSON.parse(decodedStringAtoB);
                    decodedJSON.status = "deletedarchive";
                    console.log('decodedStringAtoB', decodedJSON);
                    ACCUSER.uploadValhalla(decodedJSON);
                };  
                reader.readAsText(this.files[0], "UTF-8");
            }else{
                showNotification("File Selected is not supported! Please select (.proflowproject) Files ");
            }
        }else{
            console.log('cancelled');
        }
        
    });
}
$(document).on('click', '#archive-mods-refresh', function(){
    $('.archive-body').hide();
    const callback =data=>{
        console.log(data);
        fillArchiveUI();
        $('.archive-body').css('display', 'flex').show();
    };
    ACCUSER.checkList('Projects', callback, true);
});
$(document).on('click', '#archive-mods-dashboard', function(){
    $('.archive-con').hide();
    $('.dashboard-con').css('display', 'flex').show();
});

























// PROJECT FINANCE BUDGETING EVENTS
    // retrieve data events

function fillFinanceBudgeting(projectid){
    // console.log(ACCUSER);
    // const list = ACCUSER.getProject(projectid).getConnectByResource();
    // const slist = ACCUSER.getProject(projectid).Supplier.getConnectByResource();
    const list = ACCUSER.getProject(projectid).TaskResource.getDistinctAccountIdList();
    const slist = ACCUSER.getProject(projectid).TaskResource.getDistinctSupplierIdList();
    console.log(slist);

    let usernum = 0;
    let suppliernum = 0;
    let tmnum = 0;
    let allotednum = 0;
    let actualnum = 0;
    let variancenum = 0;

    let totalR = 0;
    let actualR = 0;
    let varianceR = 0;

    $('.finbud-body').empty();
    $.each(list, function(key, value){
        if(value.accid != undefined){
            const allotedH = ACCUSER.getProject(projectid).TaskResource.getAccidAllotedHoursByProjectid({"accid" : value.accid});
            const actualH = ACCUSER.getProject(projectid).Timesheet.getAccidActualHoursByProjectid({"accid" : value.accid});
            const zrate = ACCUSER.getProject(projectid).AccountRate.getObjByAccidAndProjectid({"accid" : value.accid});
            const rate = zrate == undefined ? "0" : zrate.rate;
            const varianceH = (actualH / allotedH) * 100;
            let name = "";
            // console.log(zrate);
            if(value.accid.includes("TA") ){
                const tmpaccobj = ACCUSER.getProject(projectid).getTmpAccountObj(value.accid);
                name = tmpaccobj.name;
            }
            else{
                name = `${value.firstname} ${value.lastname}`
            }
            $('.finbud-body').append(`
                <div rateid="${zrate == undefined ? 'na' : zrate.id}" id="finbud_${value.accid}" type="hours" class="finbud-body-widget color-sc">
                    <div class="top part">
                        <div class="leftside">
                            <span status="closed" class="project-finbud-accid">${name}</span>
                            <input class="project-finbud-hours-alloted" type="text" value="${allotedH} Hrs" disabled>
                            <input class="project-finbud-hours-actual" type="text" value="${actualH} Hrs" disabled>
                        </div>
                        <div class="rightside">
                            <div class="top">
                                <input curval="${rate}" class="project-finbud-rate" value="$${parseFloat(rate).toFixed(2)}" type="text" disabled>
                                <input curval="0" class="project-finbud-lumpsum" value="N/A" type="text" disabled>
                                <input curval="0" class="project-finbud-material" value="N/A" type="text" disabled>
                                <i status="edit" class="fas fa-edit project-finbud-edit"></i>
                            </div>
                            <span class="bot project-finbud-progress">
                                Budget Consumed: ${varianceH.toFixed(2)}%
                            </span>
                        </div>
                    </div>
                </div>
            `);
    
            $(`#finbud_${value.accid}`).children('.top.part').children('.rightside').children('.project-finbud-progress').css({
                'background' : `linear-gradient(146deg, teal ${varianceH.toFixed(2)}%, grey ${varianceH.toFixed(2)+10}%)`
            });
            if(zrate != undefined){
                $(`#finbud_${value.accid}`).children('.top.part').children('.rightside').children('.top').children('.project-finbud-rate').css({"font-weight" : "bold"});
                actualR++;
            }
    
            usernum++;
            allotednum += isNaN(parseFloat(allotedH)) ? 0 : parseFloat(allotedH);
            actualnum += isNaN(parseFloat(actualH)) ? 0 : parseFloat(actualH);
            totalR++;
        }
    });
    $.each(slist, function(key, value){
        if(value.supplierid != undefined){
            let allotedH = 'N/A';
            const zrate = ACCUSER.getProject(projectid).SupplierRate.getObjBySupplieridType({"supplierid" : value.supplierid, "type" : value.type});
            const rate = zrate == undefined ? "0" : zrate.rate;
            // console.log(zrate);
            let lumpsumrate = "N/A";
            let materialrate = "N/A";
            if(value.type == 'tm'){
                allotedH = ACCUSER.getProject(projectid).TaskResource.getSupplierIdAllotedHoursByProjectid({"supplierid" : value.supplierid});
                materialrate = `$${parseFloat(rate).toFixed(2)}`;
                tmnum++;
                allotednum += isNaN(parseFloat(allotedH)) ? 0 : parseFloat(allotedH);
            }else{
                lumpsumrate = `$${parseFloat(rate).toFixed(2)}`;
                suppliernum++;
            }

            let name = "";
            // console.log(zrate);
            if(value.supplierid.includes("TS") ){
                const tmpaccobj = ACCUSER.getProject(projectid).getTmpSupplierObj(value.supplierid);
                name = tmpaccobj.name;
            }
            else{
                name = `${value.suppliername} `;
            }
    
            $('.finbud-body').append(`
                <div rateid="${zrate == undefined ? 'na' : zrate.id}" id="finbud_${value.type}_${value.supplierid}" type="${value.type}" class="finbud-body-widget color-sc">
                    <div class="top part">
                        <div class="leftside">
                            <span status="closed" class="project-finbud-accid">${name} (${value.type == "supplier" ? "Lumpsum" : "T&M"})</span>
                            <input class="project-finbud-hours-alloted" type="text" value="${allotedH} Hrs" disabled>
                            <input class="project-finbud-hours-actual" type="text" value="N/A" disabled>
                        </div>
                        <div class="rightside">
                            <div class="top">
                                <input curval="0" class="project-finbud-rate" value="N/A" type="text" disabled>
                                <input curval="${rate}" class="project-finbud-lumpsum" value="${lumpsumrate}" type="text" disabled>
                                <input curval="${rate}" class="project-finbud-material" value="${materialrate}" type="text" disabled>
                                <i status="edit" class="fas fa-edit project-finbud-edit"></i>
                            </div>
                            <span class="bot project-finbud-progress">
                                Budget Consumed: 0%
                            </span>
                        </div>
                    </div>
                </div>
            `);
    
            $(`#finbud_${value.type}_${value.supplierid}`).children('.top.part').children('.rightside').children('.project-finbud-progress').css({"background-color" : "grey"});
            if(zrate != undefined && value.type == 'supplier'){
                $(`#finbud_${value.supplierid}`).children('.top.part').children('.rightside').children('.top').children('.project-finbud-lumpsum').css({"font-weight" : "bold"});
                $(`#finbud_${value.type}_${value.supplierid}`).children('.top.part').children('.rightside').children('.project-finbud-progress').css({
                    'background' : `linear-gradient(146deg, teal 100%, grey 100%)`
                }).text(`Budget Consumed: 100%`);
                actualR++;
            }
            if(zrate != undefined && value.type == 'tm'){
                $(`#finbud_${value.supplierid}`).children('.top.part').children('.rightside').children('.top').children('.project-finbud-material').css({"font-weight" : "bold"});
                $(`#finbud_${value.type}_${value.supplierid}`).children('.top.part').children('.rightside').children('.project-finbud-progress').css({
                    'background' : `linear-gradient(146deg, teal 100%, grey 100%)`
                }).text(`Budget Consumed: 100%`);
                actualR++;
            }
            totalR++; 
        }
    });

    variancenum = (actualnum / allotednum) * 100;
    varianceR = (actualR / totalR) * 100;
    const p = ACCUSER.getProject(projectid);
    // const o = p.getConnectObjById(p.ownerid);

    $('#finbud-header-projectname').text(p.projectname);
    $('#finbud-header-projectid').text(projectid);
    // $('#finbud-header-ownername').text(`${o.firstname} ${o.lastname}`);
    $('.finbud-footer').css({'display': 'flex'}).show();
    $('.finbud-body').css({'display': 'flex'}).show();
    $('.finbud-legend').css({'display': 'flex'}).show();


    $('#finbud-footer-hours').val(usernum);
    $('#finbud-footer-supplier').val(suppliernum);
    $('#finbud-footer-tm').val(tmnum);
    $('#finbud-footer-alloted').val(allotednum);
    $('#finbud-footer-actual').val(actualnum);
    $('#finbud-footer-variance').val(`${variancenum.toFixed(2)}%`);
    $('#finbud-footer-progress').html(`Assigned Rates : ${varianceR.toFixed(2)}%`).css({
        'background' : `linear-gradient(146deg, teal ${varianceR.toFixed(2)}%, grey ${varianceR.toFixed(2)+10}%)`
    });
}
    // update rate events
$(document).on('click', '.project-finbud-edit', function(){
    const projectid = $('#finbud-header-projectid').text();
    const id = $(this).parent('.top').parent('.rightside').parent('.top.part').parent('.finbud-body-widget').attr('id').split('_').pop();
    const type = $(this).parent('.top').parent('.rightside').parent('.top.part').parent('.finbud-body-widget').attr('type');
    const rateid = $(this).parent('.top').parent('.rightside').parent('.top.part').parent('.finbud-body-widget').attr('rateid');
    const ratecon = $(this).siblings('.project-finbud-rate');
    const lumpsumcon = $(this).siblings('.project-finbud-lumpsum');
    const materialcon = $(this).siblings('.project-finbud-material');

    const status = $(this).attr('status');

    const callback=()=>{
        console.log('test');
    };

    if(status == 'edit'){
        if(type == "hours"){
            ratecon.prop('disabled', false).val(ratecon.attr("curval"));

        }else if(type == "supplier"){
            lumpsumcon.prop('disabled', false).val(lumpsumcon.attr("curval"));
        }else if(type == "tm"){
            materialcon.prop('disabled', false).val(materialcon.attr("curval"));
        }
        $(this).removeClass('fa-edit').addClass('fa-save').attr('status', 'save');
    }else if(status == 'save'){
        let val;
        if(type == "hours"){
            val = isNaN(parseFloat(ratecon.val())) ? 0 : ratecon.val();
            ratecon.prop('disabled', true).val(`$${parseFloat(val).toFixed(2)}`).attr('curval', val);
            const options = {
                "id": rateid == 'na' ? rngAccountRateId() : rateid,
                "accid": id,
                "projectid": projectid,
                "rate": val
            };
            ACCUSER.getProject(projectid).AccountRate.create(options, callback);
        }else if(type == "supplier"){
            val = isNaN(parseFloat(lumpsumcon.val())) ? 0 : lumpsumcon.val();
            lumpsumcon.prop('disabled', true).val(`$${parseFloat(val).toFixed(2)}`).attr('curval', val);
            const options = {
                "id": rateid == 'na' ? rngSupplierRateId() : rateid,
                "supplierid" : id,
                "projectid" : projectid,
                "type" : type,
                "rate" : val
            };
            ACCUSER.getProject(projectid).SupplierRate.create(options, callback);
        }else if(type == "tm"){
            val = isNaN(parseFloat(materialcon.val())) ? 0 : materialcon.val();
            materialcon.prop('disabled', true).val(`$${parseFloat(val).toFixed(2)}`).attr('curval', val);
            const options = {
                "id": rateid == 'na' ? rngSupplierRateId() : rateid,
                "supplierid" : id,
                "projectid" : projectid,
                "type" : type,
                "rate" : val
            };
            ACCUSER.getProject(projectid).SupplierRate.create(options, callback);
        }

        $(this).removeClass('fa-save').addClass('fa-edit').attr('status', 'edit');
    }

    

});



// PROJECT FINANCE TRACKING EVENTS

    // retrieve data events
function fillFinanceTracking(projectid){
    // const list = ACCUSER.getProject(projectid).getConnectByResource();
    const list = ACCUSER.getProject(projectid).TaskResource.getDistinctAccountIdList();
    const slist = ACCUSER.getProject(projectid).TaskResource.getDistinctSupplierIdList();
    // const slist = ACCUSER.getProject(projectid).Supplier.getConnectByResource();
    let usernum = 0;
    let suppliernum = 0;
    let tmnum = 0;
    let allotednum = 0;
    let actualnum = 0;
    let variancenum = 0;

    

    $('.fintrack-body').empty();
    $.each(list, function(key, value){
        const allotedH = ACCUSER.getProject(projectid).TaskResource.getAccidAllotedHoursByProjectid({"accid" : value.accid});
        const actualH = ACCUSER.getProject(projectid).Timesheet.getAccidActualHoursByProjectid({"accid" : value.accid});
        const varianceH = (parseFloat(actualH) / parseFloat(allotedH)) * 100;
        const zrate = ACCUSER.getProject(projectid).AccountRate.getObjByAccidAndProjectid({"accid" : value.accid, "projectid" : value.projectid});
        const rate = zrate == undefined ? "0" : zrate.rate;
        let allotedB = parseFloat(rate) * (isNaN(parseFloat(allotedH)) ? 0 : parseFloat(allotedH));
        let actualB = parseFloat(rate) * (isNaN(parseFloat(actualH)) ? 0 : parseFloat(actualH));
        let varianceB = parseFloat(allotedB) - parseFloat(actualB);
        let name = '';
        if(value.accid.includes("TA") ){
            const tmpaccobj = ACCUSER.getProject(projectid).getTmpAccountObj(value.accid);
            name = tmpaccobj.name;
        }
        else{
            name = `${value.firstname} ${value.lastname}`
        }
        
        $('.fintrack-body').append(`
            <div rateid="${zrate == undefined ? 'na' : zrate.id}" id="fintrack_${value.accid}" type="hours" class="fintrack-body-widget color-sc">
                <div class="top part">
                    <div class="leftside">
                        <span status="closed" class="project-fintrack-accid">${name}</span>
                        <input class="project-fintrack-hours-rate" type="text" value="$${parseFloat(rate).toFixed(2)}" disabled>
                        <input class="project-fintrack-hours-alloted" type="text" value="${allotedH} Hrs" disabled>
                        <input class="project-fintrack-hours-actual" type="text" value="${actualH} Hrs" disabled>
                    </div>
                    <div class="rightside">
                        <div class="top">
                            <input class="project-fintrack-budget-alloted" value="$${allotedB.toFixed(2)}" type="text" disabled>
                            <input class="project-fintrack-budget-actual" value="$${actualB.toFixed(2)}" type="text" disabled>
                            <input class="project-fintrack-budget-variance" value="$${varianceB.toFixed(2)}" type="text" disabled>
                            <i class="fas fa-edit project-fintrack-edit"></i>
                        </div>
                        <span class="bot project-fintrack-progress">
                            Budget Consumed: ${varianceH.toFixed(2)}%
                        </span>
                    </div>
                </div>

            </div>
        `);

        $(`#fintrack_${value.accid}`).children('.top.part').children('.rightside').children('.project-fintrack-progress').css({
            'background' : `linear-gradient(146deg, teal ${varianceH.toFixed(2)}%, grey ${varianceH.toFixed(2)+10}%)`
        });
        if(zrate != undefined){
            $(`#fintrack_${value.accid}`).children('.top.part').children('.rightside').children('.top').children('input').css({"font-weight" : "bold"});
            actualnum += parseFloat(actualB);
        }
        usernum++;
        allotednum += parseFloat(allotedB);
    });
    $.each(slist, function(key, value){
        let allotedH = 'N/A';
        const zrate = ACCUSER.getProject(projectid).SupplierRate.getObjBySupplieridType({"supplierid" : value.supplierid, "type" : value.type});
        const rate = zrate == undefined ? "0" : zrate.rate;
        // console.log(zrate);
        let yrate = "N/A";

        if(value.type == 'tm'){
            allotedH = ACCUSER.getProject(projectid).TaskResource.getSupplierIdAllotedHoursByProjectid({"supplierid" : value.supplierid});
            yrate = `$${parseFloat(rate).toFixed(2)}`;
            tmnum++;
        }else{
            yrate = `$${parseFloat(rate).toFixed(2)}`;
            suppliernum++;
        }

        let name = "";
        if(value.supplierid.includes("TS") ){
            const tmpaccobj = ACCUSER.getProject(projectid).getTmpSupplierObj(value.supplierid);
            name = tmpaccobj.name;
        }
        else{
            name = `${value.suppliername} `;
        }

        $('.fintrack-body').append(`
            <div rateid="${zrate == undefined ? 'na' : zrate.id}" id="fintrack_${value.type}_${value.supplierid}" type="hours" class="fintrack-body-widget color-sc">
                <div class="top part">
                    <div class="leftside">
                        <span status="closed" class="project-fintrack-accid">${name} (${value.type == "supplier" ? "Lumpsum" : "T&M"})</span>
                        <input class="project-fintrack-hours-rate" type="text" value="$${parseFloat(rate).toFixed(2)}" disabled>
                        <input class="project-fintrack-hours-alloted" type="text" value="${allotedH} Hrs" disabled>
                        <input class="project-fintrack-hours-actual" type="text" value="${allotedH} Hrs" disabled>
                    </div>
                    <div class="rightside">
                        <div class="top">
                            <input class="project-fintrack-budget-alloted" value="${yrate}" type="text" disabled>
                            <input class="project-fintrack-budget-actual" value="${yrate}" type="text" disabled>
                            <input class="project-fintrack-budget-variance" value="100%" type="text" disabled>
                            <i class="fas fa-edit project-fintrack-edit"></i>
                        </div>
                        <span class="bot project-fintrack-progress">
                            Budget Consumed: 100%
                        </span>
                    </div>
                </div>

            </div>
        `);

        $(`#fintrack_${value.type}_${value.supplierid}`).children('.top.part').children('.rightside').children('.project-fintrack-progress').css({"background-color" : "teal"}).text(`Budget Consumed: 100%`);
        if(zrate != undefined && value.type == 'supplier'){
            $(`#fintrack_${value.type}_${value.supplierid}`).children('.top.part').children('.rightside').children('.top').children('.project-fintrack-lumpsum').css({"font-weight" : "bold"});
            actualnum += parseFloat(rate);
        }
        if(zrate != undefined && value.type == 'tm'){
            $(`#fintrack_${value.type}_${value.supplierid}`).children('.top.part').children('.rightside').children('.top').children('.project-fintrack-material').css({"font-weight" : "bold"});
            actualnum += parseFloat(rate);
        }
        allotednum += parseFloat(rate);
    });

    const p = ACCUSER.getProject(projectid);
    // const o = p.getConnectObjById(p.ownerid);

    variancenum = allotednum - actualnum;
    const vn = (actualnum / allotednum) * 100;

    $('#fintrack-header-projectname').text(p.projectname);
    $('#fintrack-header-projectid').text(projectid);
    // $('#fintrack-header-ownername').text(`${o.firstname} ${o.lastname}`);
    $('.fintrack-footer').css({'display': 'flex'}).show();
    $('.fintrack-body').css({'display': 'flex'}).show();
    $('.fintrack-legend').css({'display': 'flex'}).show();

    $('#fintrack-footer-hours').val(usernum);
    $('#fintrack-footer-supplier').val(suppliernum);
    $('#fintrack-footer-tm').val(tmnum);
    $('#fintrack-footer-alloted').val(`$${allotednum.toFixed(2)}`);
    $('#fintrack-footer-actual').val(`$${actualnum.toFixed(2)}`);
    $('#fintrack-footer-variance').val(`$${variancenum.toFixed(2)}`);
    $('#fintrack-footer-progress').html(`Budget Variance : ${vn.toFixed(2)}%`).css({
        'background' : `linear-gradient(146deg, teal ${vn.toFixed(2)}%, grey ${vn.toFixed(2)+10}%)`
    });

    $('#fintrack-mods-calendar').parent('.fintrack-mods-widget').css({"display" : "flex"}).show();
}
$('#fintrack-mods-tracking').click(function(){
    const projectid = $('#fintrack-header-projectid').text();
    $('#fintrack-project-submit').click();
    $('#fintrack-mods-tracking').parent('.fintrack-mods-widget').css({"display" : "none"}).hide();
    $('#fintrack-mods-calendar').parent('.fintrack-mods-widget').css({"display" : "flex"}).show();
    fillFinanceTracking(projectid);
});

    // weekly budget events
$('#fintrack-mods-week').on('change', function(){
    const projectid = $('#fintrack-header-projectid').text();
    const week = $(this).val();
    const y = week.split('-')[0];
    const w = week.split('W').pop();
    const sd = new Date(`${y}-01-01 00:00:00`);
    sd.setDate(sd.getDate() + ((7 * (w - 1)) - (sd.getDay() - 1) )); // setting the day multiplied by weeks minus getDay
    const ed = new Date(sd);
    ed.setHours(0,0,0,0);
    ed.setDate(ed.getDate() + 7);


    // const list = ACCUSER.getProject(projectid).getConnectByResource();
    const list = ACCUSER.getProject(projectid).TaskResource.getDistinctAccountIdList();
    let usernum = 0;
    let suppliernum = 0;
    let tmnum = 0;
    let allotednum = 0;
    let actualnum = 0;
    let variancenum = 0;

    $('.fintrack-body').empty();
    $.each(list, function(key, value){
        const allotedH = ACCUSER.getProject(projectid).TaskResource.getAccidAllotedHoursByProjectid({"accid" : value.accid});
        // const actualH = ACCUSER.getProject(projectid).Timesheet.getAccidActualHoursByProjectid({"accid" : value.accid});
        const timeList = ACCUSER.getProject(projectid).Timesheet.getObjByMinMaxDatesOwner({"sd" : sd, "ed" : ed, "accid" : value.accid});
        let actualH = 0;
        $.each(timeList, function(key, value){
            actualH += parseFloat(value.hours);
        });

        let name = '';
        if(value.accid.includes("TA") ){
            const tmpaccobj = ACCUSER.getProject(projectid).getTmpAccountObj(value.accid);
            name = tmpaccobj.name;
        }
        else{
            name = `${value.firstname} ${value.lastname}`
        }

        
        const varianceH = (parseFloat(actualH) / parseFloat(allotedH)) * 100;
        const zrate = ACCUSER.getProject(projectid).AccountRate.getObjByAccidAndProjectid({"accid" : value.accid, "projectid" : value.projectid});
        const rate = zrate == undefined ? "0" : zrate.rate;
        let allotedB = parseFloat(rate) * (isNaN(parseFloat(allotedH)) ? 0 : parseFloat(allotedH));
        let actualB = parseFloat(rate) * (isNaN(parseFloat(actualH)) ? 0 : parseFloat(actualH));
        let varianceB = parseFloat(allotedB) - parseFloat(actualB);

        $('.fintrack-body').append(`
            <div rateid="${zrate == undefined ? 'na' : zrate.id}" id="fintrack_${value.accid}" type="hours" class="fintrack-body-widget color-sc">
                <div class="top part">
                    <div class="leftside">
                        <span status="closed" class="project-fintrack-accid">${name}</span>
                        <input class="project-fintrack-hours-rate" type="text" value="$${parseFloat(rate).toFixed(2)}" disabled>
                        <input class="project-fintrack-hours-alloted" type="text" value="${allotedH} Hrs" disabled>
                        <input class="project-fintrack-hours-actual" type="text" value="${actualH} Hrs" disabled>
                    </div>
                    <div class="rightside">
                        <div class="top">
                            <input class="project-fintrack-budget-alloted" value="$${allotedB.toFixed(2)}" type="text" disabled>
                            <input class="project-fintrack-budget-actual" value="$${actualB.toFixed(2)}" type="text" disabled>
                            <input class="project-fintrack-budget-variance" value="$${varianceB.toFixed(2)}" type="text" disabled>
                            <i class="fas fa-edit project-fintrack-edit"></i>
                        </div>
                        <span class="bot project-fintrack-progress">
                            Budget Consumed This Week: ${varianceH.toFixed(2)}%
                        </span>
                    </div>
                </div>

            </div>
        `);

        $(`#fintrack_${value.accid}`).children('.top.part').children('.rightside').children('.project-fintrack-progress').css({
            'background' : `linear-gradient(146deg, teal ${varianceH.toFixed(2)}%, grey ${varianceH.toFixed(2)+10}%)`
        });
        if(zrate != undefined){
            $(`#fintrack_${value.accid}`).children('.top.part').children('.rightside').children('.top').children('input').css({"font-weight" : "bold"});
            actualnum += parseFloat(actualB);
        }
        usernum++;
        allotednum += parseFloat(allotedB);
    });

    const p = ACCUSER.getProject(projectid);
    // const o = p.getConnectObjById(p.ownerid);
    // const o = ACCUSER.getAccountObjById(p.ownerid);

    variancenum = allotednum - actualnum;
    const vn = (actualnum / allotednum) * 100;

    $('#fintrack-header-projectname').text(p.projectname);
    $('#fintrack-header-projectid').text(projectid);
    // $('#fintrack-header-ownername').text(`${o.firstname} ${o.lastname}`);
    $('.fintrack-footer').css({'display': 'flex'}).show();
    $('.fintrack-body').css({'display': 'flex'}).show();
    $('.fintrack-legend').css({'display': 'flex'}).show();

    $('#fintrack-footer-hours').val(usernum);
    $('#fintrack-footer-supplier').val('N/A');
    $('#fintrack-footer-tm').val('N/A');
    $('#fintrack-footer-alloted').val(`$${allotednum.toFixed(2)}`);
    $('#fintrack-footer-actual').val(`$${actualnum.toFixed(2)}`);
    $('#fintrack-footer-variance').val(`$${variancenum.toFixed(2)}`);
    $('#fintrack-footer-progress').html(`Budget Variance : ${vn.toFixed(2)}%`).css({
        'background' : `linear-gradient(146deg, teal ${vn.toFixed(2)}%, grey ${vn.toFixed(2)+10}%)`
    });
    $('#fintrack-mods-tracking').parent('.fintrack-mods-widget').css({"display" : "flex"}).show();
    $('#fintrack-mods-calendar').parent('.fintrack-mods-widget').css({"display" : "none"}).hide();
});

    // mods events
$('#fintrack-mods-calendar').click(function(){
    $('#fintrack-mods-week').trigger('change');
});
$('#fintrack-mods-dashboard').click(function(){
    $('#nav-dashboard').click();
});
$('#fintrack-mods-refresh').click(function(){
    
});

    
        
        
            
    
    

















// PROJECT PREFERENCES EVENT
function cidConnect(){
    console.log(selprojectid);
    $('.project-launch-usg-con').hide();
    ACCUSER.getProject(selprojectid).fillProjectConnect();
    $('#preferences-mods-add-user').parent().show();
    $('.project-launch-add-user').hide();
    $('#project-launch-add-user-search-id').val("");
    $('#project-launch-add-user-search-select').empty();
    
}
function cidDocs(){
    const projectid = $('#preferences-header-projectid').text();
    const cbcomplete=()=>{
        
    };
    api_fetchDocumentByProjectId(projectid, __ID, 'cidDocs', {}, cbcomplete);
    $('#preferences-mods-add-user').parent().hide();
}
function cidRegister(sender=''){
    // if(projectRegisterList == undefined || sender != ''){
    //     const projectid = $('#preferences-header-projectid').text();
    //     projectRegisterList = new ProjectRegisterList('register');
    //     projectRegisterList.fetch(projectid, __ID);
    // }else{
    //     console.log('No Fetch');
    //     projectRegisterList.fillRegister();
    // }
    
    ACCUSER.getProject(selprojectid).Register.fillRegister();
    const tmp = new Date();
    var day = ("0" + tmp.getDate()).slice(-2);
    var month = ("0" + (tmp.getMonth() + 1)).slice(-2);
    const str = tmp.getFullYear() + '-' + month + '-' + day;
    console.log(str, '---------------');
    $('#preferences-body-register-from-date').val(str);
    $('#preferences-mods-add-user').parent().hide();
}
function cidNotes(sender=""){
    ACCUSER.getProject(selprojectid).Notes.fillNotes();
    const tmp = new Date();
    var day = ("0" + tmp.getDate()).slice(-2);
    var month = ("0" + (tmp.getMonth() + 1)).slice(-2);
    const str = tmp.getFullYear() + '-' + month + '-' + day;
    console.log(str, '---------------');
    $('#preferences-body-notes-from-date').val(str);
    $('#preferences-mods-add-user').parent().hide();
    // if(projectNotesList == undefined || sender != ''){
    //     const projectid = $('#preferences-header-projectid').text();
    //     projectNotesList = new ProjectRegisterList('notes');
    //     projectNotesList.fetch(projectid, __ID);
    // }else{
    //     console.log('No Fetch');
    //     projectNotesList.fillNotes();
    // }
}
function cidMinutes(sender=''){
    const projectid = $('#preferences-header-projectid').text();

    setTimeout(() => {
        ACCUSER.getProject(projectid).Minutes.fillMinutes();
    }, 0);

    const tmp = new Date();
    var day = ("0" + tmp.getDate()).slice(-2);
    var month = ("0" + (tmp.getMonth() + 1)).slice(-2);
    const str = tmp.getFullYear() + '-' + month + '-' + day;
    console.log(str, '---------------');
    $('#preferences-body-minutes-from-date').val(str);
    $('#preferences-mods-add-user').parent().hide();

}
function cidLaunchRequest(){
    const projectid = $('#preferences-header-projectid').text();
    // fillLaunchTechnical(projectid);

    showRefreshReport("Loading...");
    setTimeout(() => {
        $('.preferences-body-request-technical-con').css('display','none').hide();
        $('.preferences-body-request-financial-con').css('display','none').hide();
        $('#preferences-mods-add-user').parent().hide();
        const callback=data=>{
            console.log(data);
            const callback=data=>{
                console.log(data);
                const callback=data=>{
                    console.log(data);
                    const callback=data=>{
                        console.log(data);
                    }
                    ACCUSER.getProject(projectid).checkList('Prerequest', callback);
                }
                ACCUSER.getProject(projectid).checkList('Item', callback);
            }
            ACCUSER.getProject(projectid).checkList('Budget', callback);
        }
        ACCUSER.getProject(projectid).checkList('Request', callback);
    }, 0);
    setTimeout(() => {
        hideRefreshReport();
    }, 0);
}
function fillLaunchTechnical(prid, sender="creator"){
    // console.log('AAAAAAAAAAAAAAAAAAAAAAAA');
    const probj = ACCUSER.getProject(prid).getData();
    const reqobj = ACCUSER.getProject(prid).Request.getObj();
    const isOwner = $('.build-body').children('.build-body-header').attr("owner");
    let requestid = '';
    // $('#request-createtool-required-requestid').attr('sender', sender);
    // const prscore = ACCUSER.getProject(prid).Request.getProjectScore();
    // $('#request-createtool-required-score').val(prscore);


    // $('#request-createtool-required-projectname').val(probj.projectname);
    // $('#request-createtool-required-requestid').attr('sender', sender);
    // ACCUSER.fillSelectTagWithCompanyAccount($('#request-createtool-required-manager'));
    // ACCUSER.fillSelectTagWithCompanyAccount($('#request-createtool-required-requestor'));
    // ACCUSER.fillSelectTagWithDepartment($('#request-createtool-required-department'));
    const superobj = ACCUSER.getSupervisorAccount(probj.creator);

        // fill default technical fields
    const techobj = ACCUSER.getProject(prid).Request.getTechObj();
    if(techobj != undefined){
        requestid = reqobj.requestid;

        $('#preferences-body-request-technical-desc_1').val(techobj.desc_1).attr("oldvalue", techobj.desc_1);
        $('#preferences-body-request-technical-desc_2').val(techobj.desc_2).attr("oldvalue", techobj.desc_2);
        $('#preferences-body-request-technical-desc_3').val(techobj.desc_3).attr("oldvalue", techobj.desc_3);
        $('#preferences-body-request-technical-desc_4_1').val(techobj.desc_4_1).attr("oldvalue", techobj.desc_4_1);
        $('#preferences-body-request-technical-desc_4_2').val(techobj.desc_4_2).attr("oldvalue", techobj.desc_4_2);
        $('#preferences-body-request-technical-prior_1').val(techobj.prior_1).attr("oldvalue", techobj.prior_1);
        $('#preferences-body-request-technical-prior_2').val(techobj.prior_2).attr("oldvalue", techobj.prior_2);
        $('#preferences-body-request-technical-prior_3').val(techobj.prior_3).attr("oldvalue", techobj.prior_3);
        $('#preferences-body-request-technical-prior_4').val(techobj.prior_4).attr("oldvalue", techobj.prior_4);
        $('#preferences-body-request-technical-prior_5').val(techobj.prior_5).attr("oldvalue", techobj.prior_5);
        $('#preferences-body-request-technical-prior_6').val(techobj.prior_6).attr("oldvalue", techobj.prior_6);
        $('#preferences-body-request-technical-prior_7').val(techobj.prior_7).attr("oldvalue", techobj.prior_7);
        $('#preferences-body-request-technical-prior_8').val(techobj.prior_8).attr("oldvalue", techobj.prior_8);
        $('#preferences-body-request-technical-strat_1').val(techobj.strat_1).attr("oldvalue", techobj.strat_1);
        $('#preferences-body-request-technical-strat_2').val(techobj.strat_2).attr("oldvalue", techobj.strat_2);



        const scoreobj = ACCUSER.getProject(prid).Request.getScore();
        console.log('AHKJJJJJJJJJJJJJJJJJJJJ',superobj);

        

        function starhtml(link){
            return `
            <div link="${link}" vvv="${scoreobj[link]}" reqid="${requestid}" prid="${prid}" class="request-createtool-technical-con-scoring ${superobj.id == __ID ? "active" : ""}">
                <i class="far fa-info-circle" title="Click to Save Score"></i>
                <i class="${parseInt(scoreobj[link]) >= 1 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star1" star="1"></i>
                <i class="${parseInt(scoreobj[link]) >= 2 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star2" star="2"></i>
                <i class="${parseInt(scoreobj[link]) >= 3 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star3" star="3"></i>
                <i class="${parseInt(scoreobj[link]) >= 4 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star4" star="4"></i>
                <i class="${parseInt(scoreobj[link]) >= 5 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star5" star="5"></i>
                <i class="${parseInt(scoreobj[link]) >= 6 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star6" star="6"></i>
                <i class="${parseInt(scoreobj[link]) >= 7 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star7" star="7"></i>
                <i class="${parseInt(scoreobj[link]) >= 8 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star8" star="8"></i>
                <i class="${parseInt(scoreobj[link]) >= 9 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star9" star="9"></i>
                <i class="${parseInt(scoreobj[link]) >= 10 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star10" star="10"></i>
            </div>
        `;
        }
        


        $('#preferences-body-request-technical-desc_1').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#preferences-body-request-technical-desc_2').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#preferences-body-request-technical-desc_3').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#preferences-body-request-technical-desc_4_1').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#preferences-body-request-technical-desc_4_2').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#preferences-body-request-technical-prior_1').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#preferences-body-request-technical-prior_2').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#preferences-body-request-technical-prior_3').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#preferences-body-request-technical-prior_4').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#preferences-body-request-technical-prior_5').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#preferences-body-request-technical-prior_6').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#preferences-body-request-technical-prior_7').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#preferences-body-request-technical-prior_8').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#preferences-body-request-technical-strat_1').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#preferences-body-request-technical-strat_2').parent('.content').children('.request-createtool-technical-con-scoring').remove();

        $('#preferences-body-request-technical-desc_1').parent('.content').append(starhtml("desc_1"));
        $('#preferences-body-request-technical-desc_2').parent('.content').append(starhtml("desc_2"));
        $('#preferences-body-request-technical-desc_3').parent('.content').append(starhtml("desc_3"));
        $('#preferences-body-request-technical-desc_4_1').parent('.content').append(starhtml("desc_4_1"));
        $('#preferences-body-request-technical-desc_4_2').parent('.content').append(starhtml("desc_4_2"));
        $('#preferences-body-request-technical-prior_1').parent('.content').append(starhtml("prior_1"));
        $('#preferences-body-request-technical-prior_2').parent('.content').append(starhtml("prior_2"));
        $('#preferences-body-request-technical-prior_3').parent('.content').append(starhtml("prior_3"));
        $('#preferences-body-request-technical-prior_4').parent('.content').append(starhtml("prior_4"));
        $('#preferences-body-request-technical-prior_5').parent('.content').append(starhtml("prior_5"));
        $('#preferences-body-request-technical-prior_6').parent('.content').append(starhtml("prior_6"));
        $('#preferences-body-request-technical-prior_7').parent('.content').append(starhtml("prior_7"));
        $('#preferences-body-request-technical-prior_8').parent('.content').append(starhtml("prior_8"));
        $('#preferences-body-request-technical-strat_1').parent('.content').append(starhtml("strat_1"));
        $('#preferences-body-request-technical-strat_2').parent('.content').append(starhtml("strat_2"));
    }else{
        $('#preferences-body-request-technical-desc_1').val("").attr("oldvalue", "");
        $('#preferences-body-request-technical-desc_2').val("").attr("oldvalue", "");
        $('#preferences-body-request-technical-desc_3').val("").attr("oldvalue", "");
        $('#preferences-body-request-technical-desc_4_1').val("").attr("oldvalue", "");
        $('#preferences-body-request-technical-desc_4_2').val("").attr("oldvalue", "");
        $('#preferences-body-request-technical-prior_1').val("").attr("oldvalue", "");
        $('#preferences-body-request-technical-prior_2').val("").attr("oldvalue", "");
        $('#preferences-body-request-technical-prior_3').val("").attr("oldvalue", "");
        $('#preferences-body-request-technical-prior_4').val("").attr("oldvalue", "");
        $('#preferences-body-request-technical-prior_5').val("").attr("oldvalue", "");
        $('#preferences-body-request-technical-prior_6').val("").attr("oldvalue", "");
        $('#preferences-body-request-technical-prior_7').val("").attr("oldvalue", "");
        $('#preferences-body-request-technical-prior_8').val("").attr("oldvalue", "");
        $('#preferences-body-request-technical-strat_1').val("").attr("oldvalue", "");
        $('#preferences-body-request-technical-strat_2').val("").attr("oldvalue", "");
    }

        // fill dynamic technical fields
    const techaddobj = ACCUSER.getProject(prid).Request.getTechAddObj();
    $('.createtool-subtitle.dynamic').remove();
    // console.log("getTechAddObj", techaddobj);


    
    

    $.each(techaddobj, function(key, value){
        const scoreaddobj = ACCUSER.getProject(prid).Request.getScoreAddById(value.id);
        console.log(value.id, scoreaddobj);
        const sssc = scoreaddobj != undefined ? scoreaddobj.score : 0;
        // console.log('HHHHHHHHHHHHHHHHHHHHHHH',value.type);
        const h =`
            <div id="${value.id}" class="createtool-subtitle dynamic launch ${value.type}">
                <span class="crtitle btn-shadow"><input type="text" placeholder="Subject" oldvalue="${value.subject}" value="${value.subject}" ><i class="fas fa-caret-left"></i></span>
                <div class="content">
                    <span class="instruction">Instruction: Add Custom Parameter</span>
                    <textarea  class="halfw" maxlength="500" oldvalue="${value.param}" placeholder="500 Characters Maximum">${value.param}</textarea>
                    <div link="${`add+${value.id}`}" vvv="${sssc}" reqid="${requestid}" prid="${prid}" class="request-createtool-technical-con-scoring ${superobj.id == __ID ? "active" : ""}">
                        <i class="far fa-info-circle" title="Click to Save Score"></i>
                        <i class="${parseInt(sssc) >= 1 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star1" star="1"></i>
                        <i class="${parseInt(sssc) >= 2 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star2" star="2"></i>
                        <i class="${parseInt(sssc) >= 3 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star3" star="3"></i>
                        <i class="${parseInt(sssc) >= 4 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star4" star="4"></i>
                        <i class="${parseInt(sssc) >= 5 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star5" star="5"></i>
                        <i class="${parseInt(sssc) >= 6 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star6" star="6"></i>
                        <i class="${parseInt(sssc) >= 7 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star7" star="7"></i>
                        <i class="${parseInt(sssc) >= 8 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star8" star="8"></i>
                        <i class="${parseInt(sssc) >= 9 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star9" star="9"></i>
                        <i class="${parseInt(sssc) >= 10 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star10" star="10"></i>
                    </div>
                </div>
            </div>
        `;
        $('#preferences-body-request-createtool-container').children(`.createtool-maintitle.launch.${value.type}2`).children('.content').prepend(h);
    });

    // setRequestToolLock(sender);
    $('.request-createtool-con').css('display', 'flex').show();
    
    // $('.request-createtool-header-w').removeClass('active').addClass('idle');
    $('#preferences-body-request-createtool-container').css('display', 'flex').show().attr({"prid" : prid, "reqid" : requestid});


}
function fillLaunchFinancial(projectid){
    const budgetobj = ACCUSER.getProject(projectid).Budget.getObj();
    let totalcapex = 0;
    let totalopex = 0;
    let totalcosting = 0;


    // $('.createtool-financial-itemlist-body').empty();
    $('.launch-financial-itemlist-body').empty();
    $.each(budgetobj, function(key, value){
        let costing = 0;
        if(value.type != undefined){
            
            if(value.type == "tm"){
                const matobj = ACCUSER.getProject(projectid).Budget.getMaterialCostByBudgetId(value.id);
                const manobj = ACCUSER.getProject(projectid).Budget.getManhourCostByBudgetId(value.id);
                costing = matobj + manobj;
            }else if(value.type == "supplier"){
                costing = value.capexcost;
            }else if(value.type == "hours"){
                costing = value.opexcost;
            }
            

            // console.log('value.itemid',value.itemid);ss

            const itemobj = ACCUSER.getProject(projectid).Item.getItemObj(value.itemid);
            // console.log('itemobj', itemobj);
            const itemcatobj = ACCUSER.getProject(projectid).Item.getCategoryObj(itemobj.categoryid);
            // console.log('itemcatobj', itemcatobj);
            const vendorobj = ACCUSER.getProject(projectid).getTmpSupplierObj(value.vendor);
            let html = `
                <div class="createtool-financial-itemlist-widget">
                    <input value="${itemobj.name}" type="text" placeholder="Item Name" disabled>
                    <input value="${value.capexcost}" type="text" placeholder="$" disabled>
                    <input value="${value.opexcost}" type="text" placeholder="$" disabled>
                    <input value="${vendorobj.name}" type="text" placeholder="Vendor" disabled>
                    <input value="${costing}" type="text" placeholder="Costing Available" disabled>
                </div>
            `;
            $('.launch-financial-itemlist-body').append(html);
            
            totalcapex += (isNaN(parseFloat(value.capexcost)) ? 0 : parseFloat(value.capexcost)); 
            totalopex += (isNaN(parseFloat(value.opexcost)) ? 0 : parseFloat(value.opexcost)); 
            totalcosting += (isNaN(parseFloat(costing)) ? 0 : parseFloat(costing)); 

            $('#launch-financial-itemlist-totals-contingency').val('10');
            const contingencynum = $('#launch-financial-itemlist-totals-contingency').val();
            const contingencycapex = ( ( totalcapex * parseFloat(contingencynum) ) / 100 );
            const contingencyopex = ( ( totalopex * parseFloat(contingencynum) ) / 100 );
            const projectcost = ( totalcosting + contingencycapex + contingencyopex );

            $('#launch-financial-itemlist-totals-contingency-capex').val(`$${contingencycapex.toFixed(2)}`);
            $('#launch-financial-itemlist-totals-contingency-opex').val(`$${contingencyopex.toFixed(2)}`);
            $('#launch-financial-itemlist-totals-capex').val(`$${totalcapex.toFixed(2)}`);
            $('#launch-financial-itemlist-totals-opex').val(`$${totalopex.toFixed(2)}`);
            $('#launch-financial-itemlist-totals-projectcost').val(`$${projectcost.toFixed(2)}`);
        }
    });
}
function fillLaunchFinancialPrereq(projectid){
    const obj = ACCUSER.getProject(projectid).Prerequest.getObj();
    $('.launch-financial-preqlist-body').empty();
    $.each(obj, function(key, value){
        $('.launch-financial-preqlist-body').append(`
            <div class="createtool-financial-preqlist-widget">
                <input class="item" type="text" placeholder="Item / Document" value="${value.name}" disabled>
                <select>
                    <option value="approved" ${value.status == "approved" ? "selected" : ""}>Approved</option>
                    <option value="approval" ${value.status == "approval" ? "selected" : ""}>Under Approval</option>
                    <option value="notapproved" ${value.status == "notapproved" ? "selected" : ""}>Not Approved</option>
                </select>
                <input class="doc" type="text" placeholder="Doc #" value="${value.docnum}" disabled>
                <textarea maxlength="200" placeholder="200 Chars Maximum">${value.comments}</textarea>
                <div pid="${value.id}" class="action">
                    <i class="fas fa-save createtool-financial-preqlist-widget-edit"></i>
                    <i class="fas fa-trash createtool-financial-preqlist-widget-delete"></i>
                </div>
            </div>
        `);
    });
}

$('.preferences-navigation-widget').click(function(){
    const cid = $(this).attr('cid');
    // console.log(cid);
    $('.preferences-navigation').children('.preferences-navigation-widget').each(function(){
        const zid = $(this).attr('cid');
        if(zid == cid){
            $(this).addClass('selected');
        }else{
            $(this).removeClass('selected');
        }
    });
    $('#preferences-mods-financial').parent('.preferences-mods-widget').hide();
    $('#preferences-mods-technical').parent('.preferences-mods-widget').hide();
    $('.preferences-body').children('.preferences-body-widget').hide();
    $('.preferences-body').children('.preferences-body-widget-').hide();
    $(`.preferences-body-${cid}`).css('display', 'flex').show();
    $('.preferences-body').show();
    if(cid == 'connect'){
        cidConnect();
    }
    if(cid == 'docs'){
        cidDocs();
    }
    if(cid == 'register'){
        cidRegister();
    }
    if(cid == 'notes'){
        cidNotes();
    }
    if(cid == 'minutes'){
        cidMinutes();
    }
    if(cid == 'request'){
        cidLaunchRequest();
        $('#preferences-mods-financial').parent('.preferences-mods-widget').show();
        $('#preferences-mods-technical').parent('.preferences-mods-widget').show();
    }
});
$('#preferences-mods-financial').click(function(){
    const projectid = $('#preferences-header-projectid').text();
    $('.preferences-body-request-technical-con').css('display','none').hide();
    $('.preferences-body-request-financial-con').css('display','flex').show();
    fillLaunchFinancial(projectid);
    fillLaunchFinancialPrereq(projectid);
});
$('#preferences-mods-technical').click(function(){
    const projectid = $('#preferences-header-projectid').text();
    const cb =()=>{
        setTimeout(() => {
            $('.preferences-body-request-technical-con').css('display','flex').show();
            $('.preferences-body-request-financial-con').css('display','none').hide();
            fillLaunchTechnical(projectid);
        }, 0);
    }
    ACCUSER.getProject(projectid).checkList('Budget', cb);
    
});

// technical events
$(document).on('click', '#launch-createtool-add-d', function(){
    const h =`
        <div class="createtool-subtitle dynamic d">
            <span class="crtitle btn-shadow"><input type="text" placeholder="Subject" value="Custom Subject" ><i class="fas fa-caret-left"></i></span>
            <div class="content">
                <span class="instruction">Instruction: Add Custom Parameter</span>
                <textarea class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
            </div>
        </div>
    `;
    $('.createtool-maintitle.d2').children('.content').prepend(h);
});
$(document).on('click', '#launch-createtool-add-p', function(e){
    const h =`
        <div class="createtool-subtitle dynamic p">
            <span class="crtitle btn-shadow"><input type="text" placeholder="Subject" value="Custom Subject" ><i class="fas fa-caret-left"></i></span>
            <div class="content">
                <span class="instruction">Instruction: Add Custom Parameter</span>
                <textarea class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
            </div>
        </div>
    `;
    $('.createtool-maintitle.p2').children('.content').prepend(h);
});
$(document).on('click', '#launch-createtool-add-s', function(e){
    const h =`
        <div class="createtool-subtitle dynamic s">
            <span class="crtitle btn-shadow"><input type="text" placeholder="Subject" value="Custom Subject" ><i class="fas fa-caret-left"></i></span>
            <div class="content">
                <span class="instruction">Instruction: Add Custom Parameter</span>
                <textarea class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
            </div>
        </div>
    `;
    $('.createtool-maintitle.s2').children('.content').prepend(h);
});
function saveLaunchRequestTechAdd(callback){
    $('.createtool-subtitle.launch.dynamic').each(function(){
        // console.log("running saveRequestTechAdd", $(this));
        let type = '';
        const dis = $(this);
        let id = $(this).attr('id') == undefined ? rngProjectRequestTechAdd() : $(this).attr('id');
        let subject = $(this).children('.crtitle').children('input').val();
        let param = $(this).children('.content').children('textarea').val();
        let osubject = $(this).children('.crtitle').children('input').attr("oldvalue");
        let oparam = $(this).children('.content').children('textarea').attr("oldvalue");
        if($(this).hasClass('d')){
            type = 'd';
        }else if($(this).hasClass('p')){
            type = 'p';
        }else if($(this).hasClass('s')){
            type = 's';
        }

        const obj = {
            'id' : id,
            'requestid' : $('#preferences-body-request-createtool-container').attr('reqid'),
            'projectid' : $('#preferences-body-request-createtool-container').attr('prid'),
            'type' : type,
            'subject' : subject,
            'param' : param,
        }
        const objoldvalue = [
            {"ki" : 'subject', "val" : osubject},
            {"ki" : 'param', "val" : oparam},
        ]
        
        let createGate = false;

        // console.log('KHJADSHKJASDHJKADSHJK',objoldvalue);

        $.each(objoldvalue, function(key, value){
            if(obj[value.ki] != value.val && (value.val != "" || value.val != undefined)){
                createGate = true;
            }
        });

        // let x = ACCUSER.getProject(obj.projectid).Request.isLocked();
        if(createGate){
            ACCUSER.getProject(obj.projectid).Request.createTechAdd(obj, callback);
        }


    });
}
$(document).on('click', '#preferences-body-request-createtool-save', function(e){
    // console.log("HELLO");
    const tobj = {
        'requestid' : $('#preferences-body-request-createtool-container').attr('reqid'),
        'projectid' : $('#preferences-body-request-createtool-container').attr('prid'),
        'desc_1' : $('#preferences-body-request-technical-desc_1').val(),
        'desc_2' : $('#preferences-body-request-technical-desc_2').val(),
        'desc_3' : $('#preferences-body-request-technical-desc_3').val(),
        'desc_4_1' : $('#preferences-body-request-technical-desc_4_1').val(),
        'desc_4_2' : $('#preferences-body-request-technical-desc_4_2').val(),
        'prior_1' : $('#preferences-body-request-technical-prior_1').val(),
        'prior_2' : $('#preferences-body-request-technical-prior_2').val(),
        'prior_3' : $('#preferences-body-request-technical-prior_3').val(),
        'prior_4' : $('#preferences-body-request-technical-prior_4').val(),
        'prior_5' : $('#preferences-body-request-technical-prior_5').val(),
        'prior_6' : $('#preferences-body-request-technical-prior_6').val(),
        'prior_7' : $('#preferences-body-request-technical-prior_7').val(),
        'prior_8' : $('#preferences-body-request-technical-prior_8').val(),
        'strat_1' : $('#preferences-body-request-technical-strat_1').val(),
        'strat_2' : $('#preferences-body-request-technical-strat_2').val()
    }
    const tobjoldvalue = [
        {"ki" : 'desc_1', "val" : $('#preferences-body-request-technical-desc_1').attr("oldvalue")},
        {"ki" : 'desc_2', "val" : $('#preferences-body-request-technical-desc_2').attr("oldvalue")},
        {"ki" : 'desc_3', "val" : $('#preferences-body-request-technical-desc_3').attr("oldvalue")},
        {"ki" : 'desc_4_1', "val" : $('#preferences-body-request-technical-desc_4_1').attr("oldvalue")},
        {"ki" : 'desc_4_2', "val" : $('#preferences-body-request-technical-desc_4_2').attr("oldvalue")},
        {"ki" : 'prior_1', "val" : $('#preferences-body-request-technical-prior_1').attr("oldvalue")},
        {"ki" : 'prior_2', "val" : $('#preferences-body-request-technical-prior_2').attr("oldvalue")},
        {"ki" : 'prior_3', "val" : $('#preferences-body-request-technical-prior_3').attr("oldvalue")},
        {"ki" : 'prior_4', "val" : $('#preferences-body-request-technical-prior_4').attr("oldvalue")},
        {"ki" : 'prior_5', "val" : $('#preferences-body-request-technical-prior_5').attr("oldvalue")},
        {"ki" : 'prior_6', "val" : $('#preferences-body-request-technical-prior_6').attr("oldvalue")},
        {"ki" : 'prior_7', "val" : $('#preferences-body-request-technical-prior_7').attr("oldvalue")},
        {"ki" : 'prior_8', "val" : $('#preferences-body-request-technical-prior_8').attr("oldvalue")},
        {"ki" : 'strat_1', "val" : $('#preferences-body-request-technical-strat_1').attr("oldvalue")},
        {"ki" : 'strat_2', "val" : $('#preferences-body-request-technical-strat_2').attr("oldvalue")}
    ]

    let createGate2 = false;
    $.each(tobjoldvalue, function(key, value){
        if(tobj[value.ki] != value.val){
            createGate2 = true;
        }
    });

    if(createGate2){
        const callback=()=>{
            saveLaunchRequestTechAdd(()=>{}); // save and update dynamic technical fields
        };
        ACCUSER.getProject(tobj.projectid).Request.createTech(tobj, callback); // save and update default technical fields
    }else{
        saveLaunchRequestTechAdd(()=>{}); // save and update dynamic technical fields
    }

});


// PROJECT SCHEDULES EVENT // NOW CALLED NEW PROJECTS NAV

function cidCreate(){
    $('#schedule-header-projectid').text('Create Project').attr('con', 'create');
}
function cidBuild(){
    $('#schedule-header-projectid').text('Build Schedule').attr('con', 'build');
    $('.build-body').hide();
    $('.schedule-body-build').children('.build-projectlist').empty();
    setTimeout(() => {
        const prlist = ACCUSER.getInactiveProjectsByCreator();
        const pmprlist = ACCUSER.getInactiveProjectsByOwner();
        console.log('asdasd', prlist);
        console.log('asdasd', pmprlist);

        setTimeout(() => {
            $.each(prlist, function(key, value){
                ACCUSER.getProject(value.projectid).checkList('Request',()=>{});
        
                const ow = ACCUSER.getAccountObjById(value.owner);
                const cr = ACCUSER.getAccountObjById(value.creator);
                const owobj = ow == null || ow == undefined || ow == "" ? {"firstname" : "Unidentified", "lastname" : ""} : ow;
                const crobj = cr == null || cr == undefined || cr == "" ? {"firstname" : "Unidentified", "lastname" : ""} : cr; 
                const html = `<span owner="false" prname="${value.projectname}" prid="${value.projectid}" crid="${crobj.firstname} ${crobj.lastname}" ownerid="${owobj.firstname} ${owobj.lastname}" class="build-projectlist-widget shadow">${value.projectname}</span>`;
                $('.schedule-body-build').children('.build-projectlist').append(html);
            });
            $.each(pmprlist, function(key, value){
                console.log(value);
                ACCUSER.getProject(value.projectid).checkList('Request',()=>{});
                setTimeout(() => { 
                    let reqobj;
                    if(value.projectid != undefined){
                        reqobj = ACCUSER.getProject(value.projectid).Request.getObj();
                    }
                    console.log('ASKLDJHKJALSDH', reqobj);
                    if(reqobj != {}){
                        console.log('ASKLDJHKJALSDH', reqobj.manager, __ID);
                        if(reqobj.manager == __ID){
                            const ow = ACCUSER.getAccountObjById(reqobj.manager);
                            const cr = ACCUSER.getAccountObjById(reqobj.requestor);
                            const owobj = ow == null || ow == undefined || ow == "" ? {"firstname" : "Unidentified", "lastname" : ""} : ow;
                            const crobj = cr == null || cr == undefined || cr == "" ? {"firstname" : "Unidentified", "lastname" : ""} : cr; 
                            const html = `<span owner="true" prname="${value.projectname}" prid="${value.projectid}" crid="${crobj.firstname} ${crobj.lastname}" ownerid="${owobj.firstname} ${owobj.lastname}" 
                            class="build-projectlist-widget shadow owner">${value.projectname}</span>`;
                            $('.schedule-body-build').children('.build-projectlist').append(html);
                        }
                    }
                }, 0);
            });
        }, 0);
    
        setTimeout(() => {
        }, 0);
        
        ACCUSER.checkList("COMPANY_ACCOUNTS", ()=>{});
        setTimeout(() => {
            hideRefreshReport();
        }, 0);
    }, 0);
    
}
function cidRequest(){
    $('#schedule-header-projectid').text('Request Project').attr('con', 'request');
    $('#schedule-mods-request').parent('.schedule-mods-widget').removeClass('hidden').show();
    $('.build-body').hide();
    $('#request-create-con-prlist').empty().prepend(`<option value="na">Select Project</option>`);
    $('.request-create-account-list').empty();

    showRefreshReport("Loading...");
    setTimeout(() => {
        prlist = ACCUSER.getInactiveProjectsRequestByCreator();
        console.log(prlist);
        $.each(prlist, function(key, value){
            const callback=()=>{};
            ACCUSER.getProject(value.projectid).checkList('Request',callback);
    
            const reqObj = ACCUSER.getProject(value.projectid).Request.getObj();
                if(reqObj.status == 'idle'){
                    const html = `<option value="${value.projectid}">${value.projectname}</option>`;
                    $('#request-create-con-prlist').append(html);
                }
        });
    
        let idobj = ACCUSER.getAccountObjById(__ID);
        let supobj = ACCUSER.getAccountObjById(idobj.superid);
        if(supobj != undefined){
            $('.request-create-account-list').append(`
                <span class="request-create-account btn-shadow" aid="${supobj.id}">${supobj.firstname} ${supobj.lastname} (Supervisor)<i class="fas fa-trash"></i></span>
            `);
        }
        $('#request-create-con-addlist').empty();
        
        setTimeout(() => {
            fillIncomingRequest();
            setTimeout(() => {
                fillOutgoingRequest();
                setTimeout(() => {
                    hideRefreshReport();
                }, 0);
            }, 0);
        }, 0);
	}, 0);
}
function cidProposal(){
    $('#schedule-header-projectid').text('Propose Project').attr('con', 'proposal');
    
}
function cidShare(){
    $('#schedule-header-projectid').text('Share Project').attr('con', 'share');
    $('.schedule-body-share > .content').hide();
    $('#share-header-retrieve-project-con').empty();

    showRefreshReport("Loading...");
    setTimeout(() => {
        let list = ACCUSER.getInactiveProjectsByCreatorOwner();
        console.log(list);
        $.each(list, function(key, value){
            $('#share-header-retrieve-project-con').append(`
                <option value="${value.projectid}">${value.projectname}</option>
            `);
        });
    }, 0);
    setTimeout(() => {
        hideRefreshReport();
    }, 0);

}
function cidSchedule(){
    $('#schedule-header-projectid').text('Schedules').attr('con', 'schedule');
    // const cbcomplete=()=>{
    //     getpscheduleClipboard();
    //     $('.pschedulelist-widget-con').empty();
    //     $('.pschedule-header-projectid').hide();
    //     $('.pschedule-header-ownerid').hide();
    //     $('.pschedule-body-prefs-resources').hide();
    //     $('.pschedule-body').hide();
    //     $('.pschedule-resources-form-type-hours').css('display','flex').show();
    // };
    // api_fetchProjectByConnect(__ID, 'nav-pschedule', cbcomplete);

    // fetch Test Schedules
    const cbcomplete=()=>{
        getpscheduleClipboard();
        $('.pschedulelist-widget-con').empty();
        $('.pschedule-header-projectid').hide();
        $('.pschedule-header-ownerid').hide();
        $('.pschedule-body-prefs-resources').hide();
        $('.pschedule-body').hide();
        $('.pschedule-resources-form-type-hours').css('display','flex').show();

        console.log(ACCUSER.getConnectedProjects());
        ACCUSER.fillSelectTagWithConnectedProject($('#pschedule-header-search-projectlist'));
    };
    api_fetchPlanningTestSchedule(__ID, 'cidSchedule', cbcomplete );
}
//New Projects > Sub Headers Click
$('.schedule-navigation-widget').click(function(){
    const cid = $(this).attr('cid');
    $('#schedule-mods-refresh').parent('.schedule-mods-widget').removeClass('hidden').show();

    $('.schedule-navigation').children('.schedule-navigation-widget').each(function(){
        const zid = $(this).attr('cid');
        if(zid == cid){
            $(this).addClass('selected');
        }else{
            $(this).removeClass('selected');
        }
    });
    $('.schedule-body').children('.schedule-body-widget-').hide();
    $('.schedule-body').children('.schedule-body-widget').hide();
    // $('#schedule-mods-request').parent('.schedule-mods-widget').addClass('hidden');
    $(`.schedule-body-${cid}`).css('display', 'flex').show();
    $('.schedule-body').show();

    if(cid == 'create'){
        $('#schedule-header-projectid').attr('cid','create');
        cidCreate();
    }
    if(cid == 'build'){
        $('#schedule-header-projectid').attr('cid','build');
        showRefreshReport('Loading...');
        setTimeout(() => {
            cidBuild();
        }, 0);
    }
    if(cid == 'request'){
        $('#schedule-header-projectid').attr('cid','request');
        $('.request-create-account-list').empty();
        $('.request-incoming-widget-con').empty();
        $('.request-outgoing-widget-con').empty();
        $('#request-create-con-addlist').empty();
        $('#request-create-con-prlist').empty().prepend(`<option value="na">Select Project</option>`);
        showRefreshReport('Loading...');
        setTimeout(() => {
            let prlist = ACCUSER.getIncomingProjectRequestObj();
            console.log(prlist);
            $.each(prlist, function(key,value){
                const callback =() =>{};
                ACCUSER.getProject(value.projectid).checkList('Request',callback);
            });
            prlist = ACCUSER.getOutgoingProjectRequestObj();
            console.log(prlist);
            $.each(prlist, function(key,value){
                const callback =() =>{};
                ACCUSER.getProject(value.projectid).checkList('Request',callback);
            });
            cidRequest();
        }, 0);

        setTimeout(() => {
            hideRefreshReport();
        }, 0);
    }
    if(cid == 'proposal'){
        $('#schedule-header-projectid').attr('cid','proposal');
        cidProposal();
    }
    if(cid == 'share'){
        $('#schedule-header-projectid').attr('cid','share');
        cidShare();
    }
    if(cid == 'schedule'){
        $('#schedule-header-projectid').attr('cid','schedule');
        cidSchedule();
    }
});

$('#schedule-mods-request').click(function(){
    const status = $(this).attr('status');
    $('.request-create-con').toggle();
    if(status == 'closed'){
        // fetch Accounts
        // fetch Projects
        const cbcomplete=()=>{
            const cbcomplete1=()=>{
                $(this).attr('status', 'open');
                $('.request-create-account-list').empty();
            };
            api_fetchAccount(__COMPANY_ID, 'na', 'schedule-mods-request', {}, cbcomplete1);
        };
        api_fetchProjectByConnect(__ID, 'schedule-mods-request', cbcomplete);
    }else{
        $(this).attr('status', 'closed');
    }
    
});








function cidDashboard(){
    // console.log("cidDashboard");
    fillSpendingDashboard();
}
function cidOpexspend(){
    // console.log("cidOpexspend");
    fillSpendingOpexSpend();
}
function cidCapexspend(){
    // console.log("cidCapexspend");
    fillSpendingCapexSpend();
}
function cidOpexforecast(){
    // console.log("cidOpexforecast");
}
function cidCapexforecast(){
    // console.log("cidCapexforecast");
    fillInvoiceCapexForecastAnnual();
}
$('.spending-navigation-widget').click(function(){
    const cid = $(this).attr('cid');
    // console.log(cid);
    $('.spending-navigation').children('.spending-navigation-widget').each(function(){
        const zid = $(this).attr('cid');
        if(zid == cid){
            $(this).addClass('selected');
        }else{
            $(this).removeClass('selected');
        }
    });
    $('.spending-body').children('.spending-body-widget').hide();
    $('.spending-body').children('.spending-body-widget-').hide();
    $(`.spending-body-${cid}`).css('display', 'flex').show();
    $('.spending-body').show();
    $('#spending-mods-suppier').parent('.spending-mods-widget').hide();
    if(cid == 'dashboard'){
        cidDashboard();
    }
    if(cid == 'opexspend'){
        cidOpexspend();
    }
    if(cid == 'capexspend'){
        cidCapexspend();
        $('#spending-mods-suppier').parent('.spending-mods-widget').show();
    }
    if(cid == 'opexforecast'){
        cidOpexforecast();
    }
    if(cid == 'capexforecast'){
        cidCapexforecast();
    }

});


// SPENDING DASHBOARD EVENTS
function finance_popup_widget_upload(e){
    console.log('test');
    // const bid = e.attr('bid');
    // console.log(bid);
    $(document).off('change', `#finance-widget-upload-hiddeninput`); 
    $(document).on('change', `#finance-widget-upload-hiddeninput`, function(){
        // console.log($(this).val().split('\\').pop());
        let vfile = $(this).val().split('\\').pop();
        const filename = vfile.split('.')[0];
        let extension = filename.split('.').pop();
        
        // console.log(filename);
        
        if(filename){
            // console.log(filename, extension);
            $('#finance-widget-upload-filename').val(filename);
            $('#finance-widget-upload-submit').show();
            $('#finance-widget-upload-view').hide();
        }else{
            console.log('cancelled');
        }
    });

    
    // $('.request-createtool-con').children('.popup').css('display', 'flex').show();
    // $('.request-createtool-con').children('.popup').children('.finance-widget-upload').css('display', 'flex').show();
}

$(document).on('click', '.spending-itemlist-widget-upload-view', function(){
    const projectid = $('#spending-header-projectid').text();
    const bid = $(this).attr('bid');
    const iid = $(this).attr('iid');
    // console.log(projectid, itemid);
    const itemobj = ACCUSER.getProject(projectid).Item.getItemObj(iid);
    // console.log(itemobj);
    $('#finance-widget-upload-title').attr('bid', bid).text(itemobj.name);
    $('#finance-widget-upload-hiddeninput').attr('bid', bid);

    $('.finance-spending-con').children('div').children('.finance-popup').css('display', 'flex').show();
    $('.finance-spending-con').children('div').children('.finance-popup').children('.finance-widget-upload').attr({'bid': bid, 'prid': projectid}).css('display', 'flex').show();
    
    $('#finance-widget-upload-folder').empty();
    const bupobj = ACCUSER.getProject(projectid).Invoice.getUploadByInvoiceId(bid);
    $.each(bupobj, function(key, value){
        $('#finance-widget-upload-folder').append(`
            <span link="${value.link}" costing="${value.costing}" class="finance-widget-upload-folder">${value.filename}<i bupid="${value.id}" prid="${projectid}" class="fas fa-trash finance-widget-upload-folder-delete"></i></span>
        `);
    });

    $('#finance-widget-upload-submit').hide();
    $('#finance-widget-upload-view').hide();
});

    // popup events - upload
$('#finance-widget-upload-submit').click(function(){
    console.log("save the record");
    const invoiceid = $('.finance-widget-upload').attr('bid');
    const projectid = $('.finance-widget-upload').attr('prid');
    const filename = $(this).parent('.action').siblings('.filename').children('input').val();
    const costing = $(this).parent('.action').siblings('.costing').children('input').val();
    $('.finance-popup').css('display', 'none').hide();
    $('.finance-popup').children('.finance-widget-upload').css('display', 'none').hide();
    let gate = true;
    let link = '';
    const cbsuccess=data=>{
        console.log(data);
        if(data.response == 'OK'){
            link = data.url;
        }else{
            gate = false;
            console.log(data.response);
            showNotification("Upload Failed", `Error Message: ${data.response}`);
        }
    };
    const cbcomplete=()=>{
        if(gate){
            const options = {
                'id' : rngProjectInvoiceUploadId(),
                'projectid' : projectid,
                'invoiceid' : invoiceid,
                'link' : link,
                'filename' : filename,
                'costing' : costing
            }
            console.log(options);
            const callback=()=>{
                console.log("awesome");
                $('#finance-widget-upload-filename').val("");
                $('#finance-widget-upload-costing').val("");
                $('#finance-widget-upload-hiddeninput').val("");
            };
            ACCUSER.getProject(projectid).Invoice.createUpload(options, callback);
        }
    };
    ajax_budget_uploadfile($('#finance-widget-upload-hiddeninput'), invoiceid, cbsuccess, cbcomplete);
});

    // popup events - documentlist delete
$(document).on('click', '.finance-widget-upload-folder-delete', function(){
    const bupid = $(this).attr('bupid');
    const projectid = $(this).attr('prid');
    const link = $(this).parent('.finance-widget-upload-folder').attr('link');

    const callback = ()=>{
        $(this).parent('span').remove();
        $('.finance-widget-upload-folder-delete').parent('span').removeClass('active');
        $('#finance-widget-upload-filename').val("");
        $('#finance-widget-upload-costing').val("");
    }
    ACCUSER.getProject(projectid).Invoice.deleteUpload({"id" : bupid, "link" : link}, callback);
});
    // popup events - documentlist click
$(document).on('click', '.finance-widget-upload-folder', function(){
    const costing = $(this).attr('costing');
    const link = $(this).attr('link');
    const filename = $(this).text();
    
    $('#finance-widget-upload-view-h').attr('href', `${link}`);
    $('#finance-widget-upload-view').show();
    $('#finance-widget-upload-filename').val(filename);
    $('#finance-widget-upload-costing').val(costing);
});

$('#finance-widget-upload-cancel').click(function(){
    console.log("saving cancelled");
    $('.finance-spending-con').children('div').children('.finance-popup').css('display', 'none').hide();
    $('.finance-spending-con').children('div').children('.finance-popup').children('.finance-widget-upload').css('display', 'none').hide();
});






// SPENDING CAPEX SPEND EVENTS
function fillSpendingDashboard(){
    const projectid = $('#spending-header-projectid').text();
    console.log(projectid);
    
    const budgetobj = ACCUSER.getProject(projectid).Budget.getObj();
    // 'id' : value.id,
    // 'projectid' : value.projectid,
    // 'itemid' : value.itemid,
    // 'type' : value.type,
    // 'capexcost' : value.capexcost,
    // 'opexcost' : value.opexcost,
    // 'vendor' : value.vendor
    $('.spending-itemlist-body').empty();
    $.each(budgetobj, function(key, value){
        const itemobj = ACCUSER.getProject(projectid).Item.getItemObj(value.itemid);
        const invoiceobj = ACCUSER.getProject(projectid).Invoice.getObjByBudgetId(value.id);
        let capexcost = 0;
        let opexcost = 0;
        let typehtml = '';
        let totalActualCapex = 0;
        let vendor = '';
        let vendorlist = [];

        if(value.type == "tm"){
            createGate = true;
            const manv = ACCUSER.getProject(projectid).Budget.getManhourCostByBudgetId(value.id);
            const matv = ACCUSER.getProject(projectid).Budget.getMaterialCostByBudgetId(value.id);
            // capexcost = ((isNaN(parseFloat(manv)) ? 0 : parseFloat(manv) + isNaN(parseFloat(matv)) ? 0 : parseFloat(matv)));
            // console.log(invoiceobj);
            $.each(invoiceobj, function(key, ivalue){
                let materialcostA = ACCUSER.getProject(projectid).Invoice.getMaterialCostingByInvoiceId(ivalue.id);
                let imanhourObj = ACCUSER.getProject(projectid).Invoice.getManhoursObjByInvoiceId(ivalue.id);
                let manhourcostA = 0;
                // console.log(imanhourObj);
                $.each(imanhourObj, function(key, ivalue){
                    const manhourRateA = ACCUSER.getProject(projectid).Budget.getManhourRateById(ivalue.resourceid);
                    manhourcostA += ((isNaN(parseFloat(ivalue.hours)) ? 0 : parseFloat(ivalue.hours)) * (isNaN(parseFloat(manhourRateA)) ? 0 : parseFloat(manhourRateA)));
                });
                let expensecostA = ACCUSER.getProject(projectid).Invoice.getExpenseCostingByInvoiceId(ivalue.id);
                totalActualCapex += (materialcostA + manhourcostA + expensecostA);
                console.log(materialcostA, manhourcostA, expensecostA);
                
                // console.log(ivalue.supplierid);

                let vgate = true;
                console.log(vendorlist);
                $.each(vendorlist, function(key, value){
                    if(value == ivalue.supplierid){
                        vgate = false;
                    }
                });
                if(vgate){
                    const supplierobj = ACCUSER.Supplier.getObjById(ivalue.supplierid);
                    vendor += `<option value="${ivalue.supplierid}">${supplierobj.name}</option>`;
                    vendorlist.push(ivalue.supplierid);
                }
            });
            capexcost = (matv + manv);
            typehtml = '<option value="tm">T&M</option>';
        }else if(value.type == "supplier"){
            capexcost = value.capexcost;
            typehtml = '<option value="supplier">Lumpsum</option>';
            $.each(invoiceobj, function(key, ivalue){
                let lumpsumcostA = ACCUSER.getProject(projectid).Invoice.getLumpsumCostingByInvoiceId(ivalue.id);
                totalActualCapex += isNaN(parseFloat(lumpsumcostA)) ? 0 : parseFloat(lumpsumcostA); 

                // console.log(ivalue.supplierid);
                const supplierobj = ACCUSER.Supplier.getObjById(ivalue.supplierid);let vgate = true;
                $.each(vendorlist, function(key, value){
                    if(value == ivalue.supplierid){
                        vgate = false;
                    }
                });
                if(vgate){
                    vendor += `<option value="${ivalue.supplierid}">${supplierobj.name}</option>`;
                    vendorlist.push(ivalue.supplierid);
                }
            });
        }else if(value.type == "hours"){
            opexcost = value.opexcost;
            typehtml = '<option value="hours">Internal</option>';
        }

        console.log(invoiceobj);


        // console.log(value.itemid, capexcost);

        $('.spending-itemlist-body').append(`
            <div class="spending-itemlist-widget">
                <input value="${itemobj.name}" class="spending-itemlist-widget-budgetitem" type="text" placeholder="Budget Item" disabled>
                <select value="${value.type}" class="spending-itemlist-widget-item" disabled>
                    ${typehtml}
                </select>
                <input value="$${capexcost}" class="spending-itemlist-widget-capexbudget" type="text" placeholder="$" disabled>
                <input value="$${totalActualCapex.toFixed(2)}" class="spending-itemlist-widget-capexactual" type="text" placeholder="$" disabled>
                <input value="$${opexcost}" class="spending-itemlist-widget-opexbudget" type="text" placeholder="$" disabled>
                <input class="spending-itemlist-widget-opexactual" type="text" placeholder="$" disabled>
                <select class="spending-itemlist-widget-vendor" >
                    ${vendor}
                </select>
                <div>
                    <i bid="${itemobj.id}" iid="${itemobj.id}" class="fas fa-cloud-upload-alt spending-itemlist-widget-upload-view" title="upload attachment"></i>
                </div>
            </div>
        `);
    });

}

function fillSpendingCapexSpend(){
    const projectid = $('#spending-header-projectid').text();
    const invoiceobj = ACCUSER.getProject(projectid).Invoice.getObj();
    // console.log('invoiceobj', invoiceobj);
    $('.capexspend-itemlist-body').empty();
    
        $.each(invoiceobj, function(key, value){
            if(invoiceobj[0].id != undefined){
                const supplierobj = ACCUSER.Supplier.getObjById(value.supplierid);
                const budgetobj = ACCUSER.getProject(projectid).Budget.getObjById(value.budgetid);
                // console.log("budgetobj", budgetobj);
                const itemobj = ACCUSER.getProject(projectid).Item.getItemObj(budgetobj[0].itemid);
                // console.log("itemobj", itemobj);
                let typehtml = '';
                let totalActual = 0;
                let totalAlloted = 0;
                console.log(budgetobj);
                if(budgetobj[0].type == "supplier"){
                    typehtml = `<i class="fas fa-coins capexspend-itemlist-widget-lumpsum" title="Lumpsum Popup"></i>`;
                    let lumpsumcostA = ACCUSER.getProject(projectid).Invoice.getLumpsumCostingByInvoiceId(value.id);
                    let lumpsumcostB = ACCUSER.getProject(projectid).Budget.getLumpsumCostingByBudgetId(value.budgetid);

                    totalActual = isNaN(parseFloat(lumpsumcostA)) ? 0 : parseFloat(lumpsumcostA);
                    totalAlloted = isNaN(parseFloat(lumpsumcostB)) ? 0 : parseFloat(lumpsumcostB);
                }else if(budgetobj[0].type == "tm"){
                    typehtml = `
                    <i class="fas fa-shapes capexspend-itemlist-widget-material" title="Material Popup"></i>
                    <i class="fas fa-people-carry capexspend-itemlist-widget-manhour" title="Manhour Popup"></i>
                    <i class="fas fa-route capexspend-itemlist-widget-expense" title="Expense Popup"></i>`;
                    
                    let materialcostA = ACCUSER.getProject(projectid).Invoice.getMaterialCostingByInvoiceId(value.id);
                    let imanhourObj = ACCUSER.getProject(projectid).Invoice.getManhoursObjByInvoiceId(value.id);
                    let manhourcostA = 0;
                    $.each(imanhourObj, function(key, value){
                        const manhourRateA = ACCUSER.getProject(projectid).Budget.getManhourRateById(value.resourceid);
                        manhourcostA += ((isNaN(parseFloat(value.hours)) ? 0 : parseFloat(value.hours)) * isNaN(parseFloat(manhourRateA)) ? 0 : parseFloat(manhourRateA));
                    });
                    let expensecostA = ACCUSER.getProject(projectid).Invoice.getExpenseCostingByInvoiceId(value.id);
                    
                    let materialcostB = ACCUSER.getProject(projectid).Budget.getMaterialCostByBudgetId(value.budgetid);
                    let manhourcostB = ACCUSER.getProject(projectid).Budget.getManhourCostByBudgetId(value.budgetid);
                    
                    totalActual = (materialcostA + manhourcostA + expensecostA);
                    totalAlloted = (materialcostB + manhourcostB);
                }

                // console.log(totalActual, totalAlloted);
                const pp = ((totalActual / totalAlloted) * 100);

                $('.capexspend-itemlist-body').append(`
                    <div class="capexspend-itemlist-widget">
                        <select class="capexspend-itemlist-widget-supplierid" disabled>
                            <option value="${value.supplierid}">${supplierobj.name}</option>
                        </select>
                        <select ivid="${value.id}" class="capexspend-itemlist-widget-budgetid" disabled>
                            <option value="${value.budgetid}">${itemobj.name} - ${budgetobj[0].type}</option>
                        </select>
                        <input class="capexspend-itemlist-widget-invoicedate" type="date" value="${value.invoicedate}" disabled>
                        <input class="capexspend-itemlist-widget-invoicedetail" type="text" title="${value.invoicedetail}" value="${value.invoicedetail}" placeholder="Invoice Detail" disabled>
                        <input class="capexspend-itemlist-widget-invoicenumber" type="text" value="${value.invoicenumber}" placeholder="Invoice Number" disabled>
                        <input class="capexspend-itemlist-widget-exchangerate" type="text" value="${value.exchangerate}" placeholder="Exchange Rate" disabled>
                        <input value="$${totalActual}" class="capexspend-itemlist-widget-capexbudget" type="text" placeholder="Actual Spend" disabled>
                        <input value="${pp.toFixed(2)}%" class="capexspend-itemlist-widget-capexactual" type="text" placeholder="Payment %" disabled>
                        <div>
                            <i  bid="${itemobj.id}" iid="${itemobj.id}" class="fas fa-cloud-upload-alt spending-itemlist-widget-upload-view" title="upload attachment"></i>
                            ${typehtml}
                        </div>
                    </div>
                `);
            }
        }); 
    
}
function fillInvoiceLumpsum(){
    const projectid = $('#spending-header-projectid').text();
    const invoiceid = $('.popup-spending-supplier').attr('ivid');
    const budgetid = $('.popup-spending-supplier').attr('bid');

    const lumpsumobj = ACCUSER.getProject(projectid).Budget.getLumpsumByBudgetId(budgetid);
    const ivlumpsum = ACCUSER.getProject(projectid).Invoice.getLumpsumObj();
    const budgetobj = ACCUSER.getProject(projectid).Budget.getObjById(budgetid);
    let createHtml = true;
    $('.popup-spending-supplier-widget-con').empty();
    $.each(lumpsumobj, function(key, value){
        const cc = isNaN(parseFloat(budgetobj[0].capexcost)) ? 0 : parseFloat(budgetobj[0].capexcost);
        const pp = isNaN(parseFloat(value.payment)) ? 0 : parseFloat(value.payment);
        const amount = (cc * pp) / 100;
        let ivlidhtml = '';
        if(ivlumpsum != undefined){
            $.each(ivlumpsum, function(key, ivalue){
                // if(){
                    
                // }
                // console.log(ivalue.milestoneid , value.id);
                if(ivalue.milestoneid == value.id && ivalue.invoiceid == invoiceid){
                    createHtml = false;
                    ivlidhtml = ivalue.id;
                    vv = ivalue.amount;
                    acvv = (cc * vv) / 100;
                    
                    // console.log('madaar');
                }
            }); 
        }

        if(createHtml){
            $('.popup-spending-supplier-widget-con').append(`
                <div ivlid="${ivlidhtml}" create="create" mid="${value.id}" class="popup-spending-supplier-widget">
                    <input value="${value.name}" type="text" class="name" placeholder="Item Name" disabled>
                    <input value="${value.payment}" type="text" class="payment popup-spending-supplier-widget-payment" placeholder="%" disabled>
                    <input value="${amount}"type="text" class="total" plaecholder="Total Amount" disabled>
                    <input type="text" class="popup-spending-supplier-widget-amount" plaecholder="Payment %" >
                    <input type="text" class="total" plaecholder="Actual Spend" disabled>
                </div>
            `);
        }else{
            $('.popup-spending-supplier-widget-con').append(`
                <div ivlid="${ivlidhtml}" create="update" mid="${value.id}" class="popup-spending-supplier-widget">
                    <input value="${value.name}" type="text" class="name" placeholder="Item Name" disabled>
                    <input value="${value.payment}" type="text" class="payment popup-spending-supplier-widget-payment" placeholder="%" disabled>
                    <input value="${amount}"type="text" class="total" plaecholder="Total Amount" disabled>
                    <input value="${vv}" type="text" class="popup-spending-supplier-widget-amount" plaecholder="Payment %" >
                    <input value="${acvv}" type="text" class="total" plaecholder="Actual Spend" disabled>
                </div>
            `);
        }
    });
}
function fillInvoiceMaterial(){
    const projectid = $('#spending-header-projectid').text();
    const invoiceid = $('.popup-spending-tm').attr('ivid');
    const budgetid = $('.popup-spending-tm').attr('bid');

    const matobj = ACCUSER.getProject(projectid).Budget.getMaterialByBudgetId(budgetid);
    const ivmatobj = ACCUSER.getProject(projectid).Invoice.getMaterialObj();
    let totalamount = 0;
    $('.popup-spending-supplier-material-widget-con').empty();
    $.each(matobj, function(key, value){
        let ivmatidhtml = '';
        let createHtml = true;
        let vv = '';
        if(ivmatobj != undefined){
            $.each(ivmatobj, function(key, ivalue){
                if(ivalue.materialid == value.id && ivalue.invoiceid == invoiceid){
                    createHtml = false;
                    ivmatidhtml = ivalue.id;
                    vv = ivalue.amount;
                }
            }); 
        }

        totalamount += (isNaN(parseFloat(vv)) ? 0 : parseFloat(vv));

        if(value.id != undefined && value.id != ''){
            if(createHtml){
                $('.popup-spending-supplier-material-widget-con').append(`
                    <div ivmatid="${ivmatidhtml}" create="create" mid="${value.id}" class="popup-spending-supplier-material-widget">
                        <input value="${value.name}" class="name" type="text" placeholder="Item Name" disabled>
                        <input value="${value.unit}" class="unit" type="text" placeholder="Unit" disabled>
                        <input value="${value.quantity}" class="quantity" type="text" placeholder="Qty." disabled>
                        <input value="${value.price}" class="price" type="text" placeholder="$" disabled>
                        <input class="amount" type="text" placeholder="$" >
                        <i class="fas fa-save popup-spending-supplier-material-widget-save"></i>
                    </div>
                `);
            }else{
                $('.popup-spending-supplier-material-widget-con').append(`
                    <div ivmatid="${ivmatidhtml}" create="update" mid="${value.id}" class="popup-spending-supplier-material-widget">
                        <input value="${value.name}" class="name" type="text" placeholder="Item Name" disabled>
                        <input value="${value.unit}" class="unit" type="text" placeholder="Unit" disabled>
                        <input value="${value.quantity}" class="quantity" type="text" placeholder="Qty." disabled>
                        <input value="${value.price}" class="price" type="text" placeholder="$" disabled>
                        <input value="${vv}" class="amount" type="text" placeholder="$" >
                        <i class="fas fa-save popup-spending-supplier-material-widget-save"></i>
                    </div>
                `);
            }
        }
    });


    $('.popup-spending-supplier-material-totals').text(`Total Amount: $${totalamount.toFixed(2)}`);
}
function fillInvoiceManhour(){
    const projectid = $('#spending-header-projectid').text();
    const invoiceid = $('.popup-spending-tm').attr('ivid');
    const budgetid = $('.popup-spending-tm').attr('bid');
    
    const manobj = ACCUSER.getProject(projectid).Budget.getManhourByBudgetId(budgetid);
    const ivmanobj = ACCUSER.getProject(projectid).Invoice.getManhoursObj();
    // console.log(manobj, ivmanobj);
    let totalamount = 0;
    $('.popup-spending-supplier-manhour-widget-con').empty();
    $.each(manobj, function(key, value){
        let ivmanidhtml = '';
        let createHtml = true;
        let vv = '';
        let vvs = 0;
        if(ivmanobj != undefined){
            $.each(ivmanobj, function(key, ivalue){
                if(ivalue.resourceid == value.id && ivalue.invoiceid == invoiceid){
                    createHtml = false;
                    ivmanidhtml = ivalue.id;
                    vv = isNaN(parseFloat(ivalue.hours)) ? 0 : parseFloat(ivalue.hours);
                    vvs = (vv * (isNaN(parseFloat(value.rate)) ? 0 : parseFloat(value.rate)));
                }
            }); 
        }

        totalamount += (isNaN(parseFloat(vvs)) ? 0 : parseFloat(vvs));

        if(value.id != undefined && value.id != ''){
            if(createHtml){
                $('.popup-spending-supplier-manhour-widget-con').append(`
                    <div ivmanid="${ivmanidhtml}" create="create" rid="${value.id}" class="popup-spending-supplier-manhour-widget">
                        <input value="${value.name}" class="name" type="text" placeholder="Resource Name" disabled>
                        <input value="${value.role}"class="role" type="text" placeholder="Role" disabled>
                        <input class="hours" type="text" placeholder="Hours">
                        <input value="${value.rate}" class="rate" type="text" placeholder="$" disabled>
                        <input class="amount" type="text" placeholder="$" disabled>
                        <i class="fas fa-save popup-spending-supplier-manhour-widget-save"></i>
                    </div>
                `);
            }else{
                $('.popup-spending-supplier-manhour-widget-con').append(`
                    <div ivmanid="${ivmanidhtml}" create="update" rid="${value.id}" class="popup-spending-supplier-manhour-widget">
                        <input value="${value.name}" class="name" type="text" placeholder="Resource Name" disabled>
                        <input value="${value.role}" class="role" type="text" placeholder="Role" disabled>
                        <input value="${vv}" class="hours" type="text" placeholder="Hours">
                        <input value="${value.rate}" class="rate" type="text" placeholder="$" disabled>
                        <input value="${vvs}" class="amount" type="text" placeholder="$" disabled>
                        <i class="fas fa-save popup-spending-supplier-manhour-widget-save"></i>
                    </div>
                `);
            }
        }
    });


    $('.popup-spending-supplier-manhour-totals').text(`Total Amount: $${totalamount.toFixed(2)}`);
}
function fillInvoiceMilestone(){
    const projectid = $('#spending-header-projectid').text();
    const invoiceid = $('.popup-spending-tm').attr('ivid');
    const budgetid = $('.popup-spending-tm').attr('bid');
    console.log(invoiceid, budgetid);
    
    const milobj = ACCUSER.getProject(projectid).Budget.getDistinctMilestoneIdByResourceId(budgetid);
    const manobj = ACCUSER.getProject(projectid).Budget.getManhourByBudgetId(budgetid);
    // console.log(milobj, manobj);
    let legendhtml = "";
    let defaultreshtml = '';

    manobj.sort(function(a, b) {
        return a.id > b.id ? 1 : -1;
    });
    $.each(manobj, function(key, value){
        legendhtml += `<span>${value.name}</span>`;
        defaultreshtml += `<input resourceid="${value.id}" type="text" placeholder="$">`;
    });
    


    $('.popup-spending-supplier-milestone-widget-con').empty();
    $('.popup-spending-supplier-milestone-legend-resource-con').empty();

    $.each(milobj, function(key, value){
        let vv = 0;
        let reshtml = '';
        let gate = false;
        const ivmilobj = ACCUSER.getProject(projectid).Invoice.getMilestoneObjByMilestoneIdAndInvoiceId(value.milestoneid, invoiceid);
        console.log(ivmilobj);
        if(ivmilobj != undefined && ivmilobj.length > 0){
            ivmilobj.sort(function(a, b) {
                return a.resourceid > b.resourceid ? 1 : -1;
            });
            $.each(ivmilobj, function(key, ivalue){
                reshtml += `<input value="${ivalue.hours}" mid="${ivalue.id}" resourceid="${ivalue.resourceid}" invoiceid="${ivalue.invoiceid}" type="text" placeholder="Hours">`;
                vv += isNaN(parseFloat(ivalue.hours)) ? 0 : parseFloat(ivalue.hours);
            });
            gate = true;
        }



        $('.popup-spending-supplier-milestone-widget-con').append(`
            <div milestoneid="${value.milestoneid}" class="popup-spending-supplier-milestone-widget">
                <input value="${value.name}" class="name" type="text" placeholder="Item Name" disabled>
                <div class="resource">
                    ${gate ? reshtml : defaultreshtml}
                </div>
                <input value="${vv}" class="popup-spending-supplier-milestone-allotedhours" type="text" placeholder="Hrs" disabled>
                <i class="fas fa-save popup-spending-supplier-milestone-widget-save"></i>
            </div>
        `);
    });

    // console.log(legendhtml);

    $('.popup-spending-supplier-milestone-legend-resource-con').append(legendhtml);
}
function fillInvoiceExpense(){
    const projectid = $('#spending-header-projectid').text();
    const invoiceid = $('.popup-spending-tm').attr('ivid');
    const budgetid = $('.popup-spending-tm').attr('bid');
    
    const manobj = ACCUSER.getProject(projectid).Budget.getManhourByBudgetId(budgetid);
    const ivexpobj = ACCUSER.getProject(projectid).Invoice.getExpenseObj();
    // console.log(manobj, ivmanobj);
    let totalamount = 0;
    $('.popup-spending-supplier-expense-widget-con').empty();
    $.each(manobj, function(key, value){
        let ivexpidhtml = '';
        let createHtml = true;
        let reshtml = '';
        let defaultreshtml = `<input value="${value.name}" type="text" placeholder="Resource Name" disabled>
        <input class="weeks" type="text" placeholder="Total Weeks">
        <input class="trips" type="text" placeholder="Trips/Week">
        <input class="distance" type="text" placeholder="Km/Miles">
        <input class="distancerate" type="text" placeholder="$">
        <input class="triphours" type="text" placeholder="hrs">
        <input class="triphoursrate" type="text" placeholder="$">
        <input class="fixedrate" type="text" placeholder="$">
        <input class="total" type="text" placeholder="$" disabled>`;
        if(ivexpobj != undefined){
            $.each(ivexpobj, function(key, ivalue){
                if(ivalue.resourceid == value.id && ivalue.invoiceid == invoiceid){
                    createHtml = false;
                    ivexpidhtml = ivalue.id;
                    const total = ( ( (isNaN(parseFloat(ivalue.weeks)) ? 0 : parseFloat(ivalue.weeks) ) * (isNaN(parseFloat(ivalue.trips)) ? 0 : parseFloat(ivalue.trips) ) * (isNaN(parseFloat(ivalue.distance)) ? 0 : parseFloat(ivalue.distance) ) * (isNaN(parseFloat(ivalue.distancerate)) ? 0 : parseFloat(ivalue.distancerate) ) ) + ( (isNaN(parseFloat(ivalue.triphours)) ? 0 : parseFloat(ivalue.triphours) ) * (isNaN(parseFloat(ivalue.triphoursrate)) ? 0 : parseFloat(ivalue.triphoursrate) ) ) + (isNaN(parseFloat(ivalue.fixedrate)) ? 0 : parseFloat(ivalue.fixedrate) ) );
                    reshtml = `<input value="${value.name}" type="text" placeholder="Resource Name" disabled>
                    <input value="${ivalue.weeks}" class="weeks" type="text" placeholder="Total Weeks">
                    <input value="${ivalue.trips}" class="trips" type="text" placeholder="Trips/Week">
                    <input value="${ivalue.distance}" class="distance" type="text" placeholder="Km/Miles">
                    <input value="${ivalue.distancerate}" class="distancerate" type="text" placeholder="$">
                    <input value="${ivalue.triphours}" class="triphours" type="text" placeholder="hrs">
                    <input value="${ivalue.triphoursrate}" class="triphoursrate" type="text" placeholder="$">
                    <input value="${ivalue.fixedrate}" class="fixedrate" type="text" placeholder="$">
                    <input value="${total}" class="total" type="text" placeholder="$" disabled>`;
                    totalamount += total;
                }
            }); 
        }


        if(value.id != undefined && value.id != ''){
            if(createHtml){
                $('.popup-spending-supplier-expense-widget-con').append(`
                    <div ivexpid="${ivexpidhtml}" create="create" rid="${value.id}" class="popup-spending-supplier-expense-widget">
                        ${defaultreshtml}
                        <i class="fas fa-save popup-spending-supplier-expense-widget-save"></i>
                    </div>
                `);
            }else{
                $('.popup-spending-supplier-expense-widget-con').append(`
                    <div ivexpid="${ivexpidhtml}" create="update" rid="${value.id}" class="popup-spending-supplier-expense-widget">
                        ${reshtml}
                        <i class="fas fa-save popup-spending-supplier-expense-widget-save"></i>
                    </div>
                `);
            }
        }
    });


    $('.popup-spending-supplier-expense-totals').text(`Total Amount: $${totalamount.toFixed(2)}`);
}
function fillInvoiceCapexForecastAnnual(){
    const projectid = $('#spending-header-projectid').text();
    const invoiceid = $('.popup-spending-tm').attr('ivid');
    const budgetid = $('.popup-spending-tm').attr('bid');

    const forecastyearobj =  ACCUSER.getProject(projectid).Budget.getDistinctCapexForecastYearList();
    // const capexobj = ACCUSER.getProject(projectid).Budget.getCapexObj();
    // const projectTotalActualBudget = ACCUSER.getProject(projectid).Budget.getTotalCapexBudget();
    // let projectTotalAllocatedBudget = 0;

    // $.each(capexobj, function(key, bvalue){
    //     if(bvalue.type == "tm"){
    //         const material = ACCUSER.getProject(projectid).Budget.getMaterialCostByBudgetId(bvalue.id);
    //         const mahours = ACCUSER.getProject(projectid).Budget.getManhourCostByBudgetId(bvalue.id);
    //         const matv = isNaN(parseFloat(material)) ? 0 : parseFloat(material);
    //         const manv = isNaN(parseFloat(mahours)) ? 0 : parseFloat(mahours);
    //         // console.log(matv, manv);
    //         projectTotalAllocatedBudget += (matv + manv);
    //     }else if(bvalue.type == "supplier"){
    //         projectTotalAllocatedBudget += isNaN(parseFloat(bvalue.capexcost)) ? 0 : parseFloat(bvalue.capexcost);
    //     }
    // });

    $('.spending-body-capexforecast').empty();
    $.each(forecastyearobj, function(key, yvalue){
        const capexforecastannualobj = ACCUSER.getProject(projectid).Budget.getCapexForecastObjByYear(yvalue.year);
        const invoiceforecastannualobj = ACCUSER.getProject(projectid).Invoice.getObjByYear(yvalue.year);
        const invoiceforecastobj = ACCUSER.getProject(projectid).Invoice.getForecastObjByYear(yvalue.year);

        let m1Base = 0;
        let m2Base = 0;
        let m3Base = 0;
        let m4Base = 0;
        let m5Base = 0;
        let m6Base = 0;
        let m7Base = 0;
        let m8Base = 0;
        let m9Base = 0;
        let m10Base = 0;
        let m11Base = 0;
        let m12Base = 0;
        let totalBase = 0;
        
        $.each(capexforecastannualobj, function(key, cvalue){
            m1Base += isNaN(parseFloat(cvalue.m1)) ? 0 : parseFloat(cvalue.m1);
            m2Base += isNaN(parseFloat(cvalue.m2)) ? 0 : parseFloat(cvalue.m2);
            m3Base += isNaN(parseFloat(cvalue.m3)) ? 0 : parseFloat(cvalue.m3);
            m4Base += isNaN(parseFloat(cvalue.m4)) ? 0 : parseFloat(cvalue.m4);
            m5Base += isNaN(parseFloat(cvalue.m5)) ? 0 : parseFloat(cvalue.m5);
            m6Base += isNaN(parseFloat(cvalue.m6)) ? 0 : parseFloat(cvalue.m6);
            m7Base += isNaN(parseFloat(cvalue.m7)) ? 0 : parseFloat(cvalue.m7);
            m8Base += isNaN(parseFloat(cvalue.m8)) ? 0 : parseFloat(cvalue.m8);
            m9Base += isNaN(parseFloat(cvalue.m9)) ? 0 : parseFloat(cvalue.m9);
            m10Base += isNaN(parseFloat(cvalue.m10)) ? 0 : parseFloat(cvalue.m10);
            m11Base += isNaN(parseFloat(cvalue.m11)) ? 0 : parseFloat(cvalue.m11);
            m12Base += isNaN(parseFloat(cvalue.m12)) ? 0 : parseFloat(cvalue.m12);
            totalBase += ( (isNaN(parseFloat(cvalue.m1)) ? 0 : parseFloat(cvalue.m1)) + (isNaN(parseFloat(cvalue.m2)) ? 0 : parseFloat(cvalue.m2)) + (isNaN(parseFloat(cvalue.m3)) ? 0 : parseFloat(cvalue.m3)) + (isNaN(parseFloat(cvalue.m4)) ? 0 : parseFloat(cvalue.m4)) + (isNaN(parseFloat(cvalue.m5)) ? 0 : parseFloat(cvalue.m5)) + (isNaN(parseFloat(cvalue.m6)) ? 0 : parseFloat(cvalue.m6)) + (isNaN(parseFloat(cvalue.m7)) ? 0 : parseFloat(cvalue.m7)) + (isNaN(parseFloat(cvalue.m8)) ? 0 : parseFloat(cvalue.m8)) + (isNaN(parseFloat(cvalue.m9)) ? 0 : parseFloat(cvalue.m9)) + (isNaN(parseFloat(cvalue.m10)) ? 0 : parseFloat(cvalue.m10)) + (isNaN(parseFloat(cvalue.m11)) ? 0 : parseFloat(cvalue.m11)) + (isNaN(parseFloat(cvalue.m12)) ? 0 : parseFloat(cvalue.m12)));
        });

        let m1Actual = 0;
        let m2Actual = 0;
        let m3Actual = 0;
        let m4Actual = 0;
        let m5Actual = 0;
        let m6Actual = 0;
        let m7Actual = 0;
        let m8Actual = 0;
        let m9Actual = 0;
        let m10Actual = 0;
        let m11Actual = 0;
        let m12Actual = 0;
        let totalActual = 0;
        // console.log('invoiceforecastannualobj', invoiceforecastannualobj);
        $.each(invoiceforecastannualobj, function(key, value){
            let d = value.invoicedate.split('-');
            let mm = d[1];

            let cost = 0;
            const ilumpsumV = ACCUSER.getProject(projectid).Invoice.getLumpsumCostingByInvoiceId(value.id);
            const imaterialV = ACCUSER.getProject(projectid).Invoice.getMaterialCostingByInvoiceId(value.id);

            const iexpenseV = ACCUSER.getProject(projectid).Invoice.getExpenseCostingByInvoiceId(value.id);
            const imanhourobj = ACCUSER.getProject(projectid).Invoice.getManhoursObjByInvoiceId(value.id);

            let imanhourV = 0;
            $.each(imanhourobj, function(key, value){
                const rate = ACCUSER.getProject(projectid).Budget.getManhourRateById(value.resourceid);
                imanhourV += ((isNaN(parseFloat(rate)) ? 0 : parseFloat(rate)) * isNaN(parseFloat(value.hours)) ? 0 : parseFloat(value.hours));
            });

            cost += ((isNaN(parseFloat(ilumpsumV)) ? 0 : parseFloat(ilumpsumV)) + (isNaN(parseFloat(imaterialV)) ? 0 : parseFloat(imaterialV)) + (isNaN(parseFloat(iexpenseV)) ? 0 : parseFloat(iexpenseV)) + imanhourV );

            if(mm == '01'){m1Actual += cost; totalActual += cost; }
            if(mm == '02'){m2Actual += cost; totalActual += cost; }
            if(mm == '03'){m3Actual += cost; totalActual += cost; }
            if(mm == '04'){m4Actual += cost; totalActual += cost; }
            if(mm == '05'){m5Actual += cost; totalActual += cost; }
            if(mm == '06'){m6Actual += cost; totalActual += cost; }
            if(mm == '07'){m7Actual += cost; totalActual += cost; }
            if(mm == '08'){m8Actual += cost; totalActual += cost; }
            if(mm == '09'){m9Actual += cost; totalActual += cost; }
            if(mm == '10'){m10Actual += cost; totalActual += cost; }
            if(mm == '11'){m11Actual += cost; totalActual += cost; }
            if(mm == '12'){m12Actual += cost; totalActual += cost; }

        });


        let m1Forecast = 0;
        let m2Forecast = 0;
        let m3Forecast = 0;
        let m4Forecast = 0;
        let m5Forecast = 0;
        let m6Forecast = 0;
        let m7Forecast = 0;
        let m8Forecast = 0;
        let m9Forecast = 0;
        let m10Forecast = 0;
        let m11Forecast = 0;
        let m12Forecast = 0;
        let totalForecast = 0;

        $.each(invoiceforecastobj, function(key, cvalue){
            m1Forecast += isNaN(parseFloat(cvalue.m1)) ? 0 : parseFloat(cvalue.m1);
            m2Forecast += isNaN(parseFloat(cvalue.m2)) ? 0 : parseFloat(cvalue.m2);
            m3Forecast += isNaN(parseFloat(cvalue.m3)) ? 0 : parseFloat(cvalue.m3);
            m4Forecast += isNaN(parseFloat(cvalue.m4)) ? 0 : parseFloat(cvalue.m4);
            m5Forecast += isNaN(parseFloat(cvalue.m5)) ? 0 : parseFloat(cvalue.m5);
            m6Forecast += isNaN(parseFloat(cvalue.m6)) ? 0 : parseFloat(cvalue.m6);
            m7Forecast += isNaN(parseFloat(cvalue.m7)) ? 0 : parseFloat(cvalue.m7);
            m8Forecast += isNaN(parseFloat(cvalue.m8)) ? 0 : parseFloat(cvalue.m8);
            m9Forecast += isNaN(parseFloat(cvalue.m9)) ? 0 : parseFloat(cvalue.m9);
            m10Forecast += isNaN(parseFloat(cvalue.m10)) ? 0 : parseFloat(cvalue.m10);
            m11Forecast += isNaN(parseFloat(cvalue.m11)) ? 0 : parseFloat(cvalue.m11);
            m12Forecast += isNaN(parseFloat(cvalue.m12)) ? 0 : parseFloat(cvalue.m12);
            totalForecast += ( (isNaN(parseFloat(cvalue.m1)) ? 0 : parseFloat(cvalue.m1)) + (isNaN(parseFloat(cvalue.m2)) ? 0 : parseFloat(cvalue.m2)) + (isNaN(parseFloat(cvalue.m3)) ? 0 : parseFloat(cvalue.m3)) + (isNaN(parseFloat(cvalue.m4)) ? 0 : parseFloat(cvalue.m4)) + (isNaN(parseFloat(cvalue.m5)) ? 0 : parseFloat(cvalue.m5)) + (isNaN(parseFloat(cvalue.m6)) ? 0 : parseFloat(cvalue.m6)) + (isNaN(parseFloat(cvalue.m7)) ? 0 : parseFloat(cvalue.m7)) + (isNaN(parseFloat(cvalue.m8)) ? 0 : parseFloat(cvalue.m8)) + (isNaN(parseFloat(cvalue.m9)) ? 0 : parseFloat(cvalue.m9)) + (isNaN(parseFloat(cvalue.m10)) ? 0 : parseFloat(cvalue.m10)) + (isNaN(parseFloat(cvalue.m11)) ? 0 : parseFloat(cvalue.m11)) + (isNaN(parseFloat(cvalue.m12)) ? 0 : parseFloat(cvalue.m12)));
            fidhtml = `fid="${cvalue.id}"`;
        });
        

        const html = `
            <div id="capexforecast-widget_${yvalue.year}" class="spending-body-capexforecast-widget">
                <div class="header shadow">
                    <span status="closed" class="spending-body-capexforecast-widget-head-btn">${yvalue.year}</span>
                    <div class="header-widget-con ">
                    <div class="header-annual-widget">
                        <span>Jan</span>
                        <input value="${m1Base}" type="text" title="Builder 1, Builder 2" disabled>
                        <input value="${m1Forecast}" type="text" disabled>
                        <input value="${m1Actual}" type="text" disabled>
                    </div>
                    <div class="header-annual-widget">
                        <span>Feb</span>
                        <input value="${m2Base}" type="text" disabled>
                        <input value="${m2Forecast}" type="text" disabled>
                        <input value="${m2Actual}" type="text" disabled>
                    </div>
                    <div class="header-annual-widget">
                        <span>Mar</span>
                        <input value="${m3Base}" type="text" disabled>
                        <input value="${m3Forecast}" type="text" disabled>
                        <input value="${m3Actual}" type="text" disabled>
                    </div>
                    <div class="header-annual-widget">
                        <span>Apr</span>
                        <input value="${m4Base}" type="text" disabled>
                        <input value="${m4Forecast}" type="text" disabled>
                        <input value="${m4Actual}" type="text" disabled>
                    </div>
                    <div class="header-annual-widget">
                        <span>May</span>
                        <input value="${m5Base}" type="text" disabled>
                        <input value="${m5Forecast}" type="text" disabled>
                        <input value="${m5Actual}" type="text" disabled>
                    </div>
                    <div class="header-annual-widget">
                        <span>Jun</span>
                        <input value="${m6Base}" type="text" disabled>
                        <input value="${m6Forecast}" type="text" disabled>
                        <input value="${m6Actual}" type="text" disabled>
                    </div>
                    <div class="header-annual-widget">
                        <span>Jul</span>
                        <input value="${m7Base}" type="text" disabled>
                        <input value="${m7Forecast}" type="text" disabled>
                        <input value="${m7Actual}" type="text" disabled>
                    </div>
                    <div class="header-annual-widget">
                        <span>Aug</span>
                        <input value="${m8Base}" type="text" disabled>
                        <input value="${m8Forecast}" type="text" disabled>
                        <input value="${m8Actual}" type="text" disabled>
                    </div>
                    <div class="header-annual-widget">
                        <span>Sep</span>
                        <input value="${m9Base}" type="text" disabled>
                        <input value="${m9Forecast}" type="text" disabled>
                        <input value="${m9Actual}" type="text" disabled>
                    </div>
                    <div class="header-annual-widget">
                        <span>Oct</span>
                        <input value="${m10Base}" type="text" disabled>
                        <input value="${m10Forecast}" type="text" disabled>
                        <input value="${m10Actual}" type="text" disabled>
                    </div>
                    <div class="header-annual-widget">
                        <span>Nov</span>
                        <input value="${m11Base}" type="text" disabled>
                        <input value="${m11Forecast}" type="text" disabled>
                        <input value="${m11Actual}" type="text" disabled>
                    </div>
                    <div class="header-annual-widget">
                        <span>Dec</span>
                        <input value="${m12Base}" type="text" disabled>
                        <input value="${m12Forecast}" type="text" disabled>
                        <input value="${m12Actual}" type="text" disabled>
                    </div>
                    <div class="header-annual-widget">
                        <span>Total</span>
                        <input value="${totalBase}" type="text" disabled>
                        <input value="${totalForecast}" type="text" disabled>
                        <input value="${totalActual}" type="text" disabled>
                    </div>

                    </div>
                </div>
                <div class="content hidden">

                </div>
            </div>
            `;

        $('.spending-body-capexforecast').append(html);

    });



}
function fillInvoiceCapexForecastResource(){
    const projectid = $('#spending-header-projectid').text();
    const invoiceid = $('.popup-spending-tm').attr('ivid');
    const budgetid = $('.popup-spending-tm').attr('bid');

    const forecastyearobj =  ACCUSER.getProject(projectid).Budget.getDistinctCapexForecastYearList();
    
        $.each(forecastyearobj, function(key, yvalue){
            $(`#capexforecast-widget_${yvalue.year}`).children('.content').empty();
            
            const budgetobj = ACCUSER.getProject(projectid).Budget.getObj();
            // console.log(budgetobj);
            $.each(budgetobj, function(key, value){
                
                const itemobj = ACCUSER.getProject(projectid).Item.getItemObj(value.itemid);
                const invoiceobj = ACCUSER.getProject(projectid).Invoice.getObjByBudgetIdAndYear(value.id, yvalue.year);
                const capexforecastannualobj = ACCUSER.getProject(projectid).Budget.getCapexForecastObjByYearAndResourceId(value.id,  yvalue.year);
                const invoiceforecastobj = ACCUSER.getProject(projectid).Invoice.getForecastObjByResourceIdAndYear(value.id, yvalue.year);

                console.log(capexforecastannualobj);
                let acchtml = '';

                let m1Actual = 0;
                let m2Actual = 0;
                let m3Actual = 0;
                let m4Actual = 0;
                let m5Actual = 0;
                let m6Actual = 0;
                let m7Actual = 0;
                let m8Actual = 0;
                let m9Actual = 0;
                let m10Actual = 0;
                let m11Actual = 0;
                let m12Actual = 0;
                let totalActual = 0;

                let m1Base = 0;
                let m2Base = 0;
                let m3Base = 0;
                let m4Base = 0;
                let m5Base = 0;
                let m6Base = 0;
                let m7Base = 0;
                let m8Base = 0;
                let m9Base = 0;
                let m10Base = 0;
                let m11Base = 0;
                let m12Base = 0;
                let totalBase = 0;

                let m1Forecast = 0;
                let m2Forecast = 0;
                let m3Forecast = 0;
                let m4Forecast = 0;
                let m5Forecast = 0;
                let m6Forecast = 0;
                let m7Forecast = 0;
                let m8Forecast = 0;
                let m9Forecast = 0;
                let m10Forecast = 0;
                let m11Forecast = 0;
                let m12Forecast = 0;
                let totalForecast = 0;

                $.each(invoiceobj, function(key, value){
                    let d = value.invoicedate.split('-');
                    let mm = d[1];
            
                    // const budgetobj = ACCUSER.getProject(projectid).Budget.getObjById(value.budgetid);
                    // const itemobj = ACCUSER.getProject(projectid).Item.getItemObj(budgetobj[0].itemid);
                    // console.log('AAAAAAAAAAAAAAA', budgetobj, itemobj );
            
                    const ilumpsumV = ACCUSER.getProject(projectid).Invoice.getLumpsumCostingByInvoiceId(value.id);
                    const imaterialV = ACCUSER.getProject(projectid).Invoice.getMaterialCostingByInvoiceId(value.id);
            
                    const iexpenseV = ACCUSER.getProject(projectid).Invoice.getExpenseCostingByInvoiceId(value.id);
                    const imanhourobj = ACCUSER.getProject(projectid).Invoice.getManhoursObjByInvoiceId(value.id);
            
                    let imanhourV = 0;
                    $.each(imanhourobj, function(key, value){
                        const rate = ACCUSER.getProject(projectid).Budget.getManhourRateById(value.resourceid);
                        imanhourV += ((isNaN(parseFloat(rate)) ? 0 : parseFloat(rate)) * isNaN(parseFloat(value.hours)) ? 0 : parseFloat(value.hours));
                    });

                    const cost = ((isNaN(parseFloat(ilumpsumV)) ? 0 : parseFloat(ilumpsumV)) + (isNaN(parseFloat(imaterialV)) ? 0 : parseFloat(imaterialV)) + (isNaN(parseFloat(iexpenseV)) ? 0 : parseFloat(iexpenseV)) + imanhourV );
                    
                    if(mm == '01'){m1Actual += cost; totalActual += cost; }
                    if(mm == '02'){m2Actual += cost; totalActual += cost; }
                    if(mm == '03'){m3Actual += cost; totalActual += cost; }
                    if(mm == '04'){m4Actual += cost; totalActual += cost; }
                    if(mm == '05'){m5Actual += cost; totalActual += cost; }
                    if(mm == '06'){m6Actual += cost; totalActual += cost; }
                    if(mm == '07'){m7Actual += cost; totalActual += cost; }
                    if(mm == '08'){m8Actual += cost; totalActual += cost; }
                    if(mm == '09'){m9Actual += cost; totalActual += cost; }
                    if(mm == '10'){m10Actual += cost; totalActual += cost; }
                    if(mm == '11'){m11Actual += cost; totalActual += cost; }
                    if(mm == '12'){m12Actual += cost; totalActual += cost; }
                });

                $.each(capexforecastannualobj, function(key, cvalue){
                    m1Base += isNaN(parseFloat(cvalue.m1)) ? 0 : parseFloat(cvalue.m1);
                    m2Base += isNaN(parseFloat(cvalue.m2)) ? 0 : parseFloat(cvalue.m2);
                    m3Base += isNaN(parseFloat(cvalue.m3)) ? 0 : parseFloat(cvalue.m3);
                    m4Base += isNaN(parseFloat(cvalue.m4)) ? 0 : parseFloat(cvalue.m4);
                    m5Base += isNaN(parseFloat(cvalue.m5)) ? 0 : parseFloat(cvalue.m5);
                    m6Base += isNaN(parseFloat(cvalue.m6)) ? 0 : parseFloat(cvalue.m6);
                    m7Base += isNaN(parseFloat(cvalue.m7)) ? 0 : parseFloat(cvalue.m7);
                    m8Base += isNaN(parseFloat(cvalue.m8)) ? 0 : parseFloat(cvalue.m8);
                    m9Base += isNaN(parseFloat(cvalue.m9)) ? 0 : parseFloat(cvalue.m9);
                    m10Base += isNaN(parseFloat(cvalue.m10)) ? 0 : parseFloat(cvalue.m10);
                    m11Base += isNaN(parseFloat(cvalue.m11)) ? 0 : parseFloat(cvalue.m11);
                    m12Base += isNaN(parseFloat(cvalue.m12)) ? 0 : parseFloat(cvalue.m12);
                    totalBase += ( (isNaN(parseFloat(cvalue.m1)) ? 0 : parseFloat(cvalue.m1)) + (isNaN(parseFloat(cvalue.m2)) ? 0 : parseFloat(cvalue.m2)) + (isNaN(parseFloat(cvalue.m3)) ? 0 : parseFloat(cvalue.m3)) + (isNaN(parseFloat(cvalue.m4)) ? 0 : parseFloat(cvalue.m4)) + (isNaN(parseFloat(cvalue.m5)) ? 0 : parseFloat(cvalue.m5)) + (isNaN(parseFloat(cvalue.m6)) ? 0 : parseFloat(cvalue.m6)) + (isNaN(parseFloat(cvalue.m7)) ? 0 : parseFloat(cvalue.m7)) + (isNaN(parseFloat(cvalue.m8)) ? 0 : parseFloat(cvalue.m8)) + (isNaN(parseFloat(cvalue.m9)) ? 0 : parseFloat(cvalue.m9)) + (isNaN(parseFloat(cvalue.m10)) ? 0 : parseFloat(cvalue.m10)) + (isNaN(parseFloat(cvalue.m11)) ? 0 : parseFloat(cvalue.m11)) + (isNaN(parseFloat(cvalue.m12)) ? 0 : parseFloat(cvalue.m12)));
                });

                let fidhtml = '';
                $.each(invoiceforecastobj, function(key, cvalue){
                    m1Forecast += isNaN(parseFloat(cvalue.m1)) ? 0 : parseFloat(cvalue.m1);
                    m2Forecast += isNaN(parseFloat(cvalue.m2)) ? 0 : parseFloat(cvalue.m2);
                    m3Forecast += isNaN(parseFloat(cvalue.m3)) ? 0 : parseFloat(cvalue.m3);
                    m4Forecast += isNaN(parseFloat(cvalue.m4)) ? 0 : parseFloat(cvalue.m4);
                    m5Forecast += isNaN(parseFloat(cvalue.m5)) ? 0 : parseFloat(cvalue.m5);
                    m6Forecast += isNaN(parseFloat(cvalue.m6)) ? 0 : parseFloat(cvalue.m6);
                    m7Forecast += isNaN(parseFloat(cvalue.m7)) ? 0 : parseFloat(cvalue.m7);
                    m8Forecast += isNaN(parseFloat(cvalue.m8)) ? 0 : parseFloat(cvalue.m8);
                    m9Forecast += isNaN(parseFloat(cvalue.m9)) ? 0 : parseFloat(cvalue.m9);
                    m10Forecast += isNaN(parseFloat(cvalue.m10)) ? 0 : parseFloat(cvalue.m10);
                    m11Forecast += isNaN(parseFloat(cvalue.m11)) ? 0 : parseFloat(cvalue.m11);
                    m12Forecast += isNaN(parseFloat(cvalue.m12)) ? 0 : parseFloat(cvalue.m12);
                    totalForecast += ( (isNaN(parseFloat(cvalue.m1)) ? 0 : parseFloat(cvalue.m1)) + (isNaN(parseFloat(cvalue.m2)) ? 0 : parseFloat(cvalue.m2)) + (isNaN(parseFloat(cvalue.m3)) ? 0 : parseFloat(cvalue.m3)) + (isNaN(parseFloat(cvalue.m4)) ? 0 : parseFloat(cvalue.m4)) + (isNaN(parseFloat(cvalue.m5)) ? 0 : parseFloat(cvalue.m5)) + (isNaN(parseFloat(cvalue.m6)) ? 0 : parseFloat(cvalue.m6)) + (isNaN(parseFloat(cvalue.m7)) ? 0 : parseFloat(cvalue.m7)) + (isNaN(parseFloat(cvalue.m8)) ? 0 : parseFloat(cvalue.m8)) + (isNaN(parseFloat(cvalue.m9)) ? 0 : parseFloat(cvalue.m9)) + (isNaN(parseFloat(cvalue.m10)) ? 0 : parseFloat(cvalue.m10)) + (isNaN(parseFloat(cvalue.m11)) ? 0 : parseFloat(cvalue.m11)) + (isNaN(parseFloat(cvalue.m12)) ? 0 : parseFloat(cvalue.m12)));
                    fidhtml = `fid="${cvalue.id}"`;
                });



                acchtml += `
                    <div status="closed" class="spending-body-capexforecast-widget-resource">
                        <span class="tagger">${itemobj.name}</span>
                        <div class="spending-body-capexforecast-widget-resource-annual hidden">
                            <div class="legend">
                                <span>Month</span>
                                <span>Baseline</span>
                                <span>Forecast</span>
                                <span>Actual</span>
                            </div>
                            <div ${fidhtml} class="annual" year="${yvalue.year}" projectid="${projectid}" resourceid="${value.id}" >
                                <div class="annual-widget"  mm="m1">
                                    <input value="January" type="text" disabled>
                                    <input class="baseline" value="${m1Base}" type="text" disabled>
                                    <input class="forecast" value="${m1Forecast}" type="text">
                                    <input class="actual" value="${m1Actual}" type="text" disabled>
                                </div>
                                <div class="annual-widget" mm="m2">
                                    <input value="February" type="text" disabled>
                                    <input class="baseline" value="${m2Base}" type="text" disabled>
                                    <input class="forecast" value="${m2Forecast}" type="text">
                                    <input class="actual" value="${m2Actual}" type="text" disabled>
                                </div>
                                <div class="annual-widget" mm="m3">
                                    <input value="March" type="text" disabled>
                                    <input class="baseline" value="${m3Base}" type="text" disabled>
                                    <input class="forecast" value="${m3Forecast}" type="text">
                                    <input class="actual" value="${m3Actual}" type="text" disabled>
                                </div>
                                <div class="annual-widget" mm="m4">
                                    <input value="April" type="text" disabled>
                                    <input class="baseline" value="${m4Base}" type="text" disabled>
                                    <input class="forecast" value="${m4Forecast}" type="text">
                                    <input class="actual" value="${m4Actual}" type="text" disabled>
                                </div>
                                <div class="annual-widget" mm="m5">
                                    <input value="May" type="text" disabled>
                                    <input class="baseline" value="${m5Base}" type="text" disabled>
                                    <input class="forecast" value="${m5Forecast}" type="text">
                                    <input class="actual" value="${m5Actual}" type="text" disabled>
                                </div>
                                <div class="annual-widget" mm="m6">
                                    <input value="June" type="text" disabled>
                                    <input class="baseline" value="${m6Base}" type="text" disabled>
                                    <input class="forecast" value="${m6Forecast}" type="text">
                                    <input class="actual" value="${m6Actual}" type="text" disabled>
                                </div>
                                <div class="annual-widget" mm="m7">
                                    <input value="July" type="text" disabled>
                                    <input class="baseline" value="${m7Base}" type="text" disabled>
                                    <input class="forecast" value="${m7Forecast}" type="text">
                                    <input class="actual" value="${m7Actual}" type="text" disabled>
                                </div>
                                <div class="annual-widget" mm="m8">
                                    <input value="August" type="text" disabled>
                                    <input class="baseline" value="${m8Base}" type="text" disabled>
                                    <input class="forecast" value="${m8Forecast}" type="text">
                                    <input class="actual" value="${m8Actual}" type="text" disabled>
                                </div>
                                <div class="annual-widget" mm="m9">
                                    <input value="September" type="text" disabled>
                                    <input class="baseline" value="${m9Base}" type="text" disabled>
                                    <input class="forecast" value="${m9Forecast}" type="text">
                                    <input class="actual" value="${m9Actual}" type="text" disabled>
                                </div>
                                <div class="annual-widget" mm="m10">
                                    <input value="October" type="text" disabled>
                                    <input class="baseline" value="${m10Base}" type="text" disabled>
                                    <input class="forecast" value="${m10Forecast}" type="text">
                                    <input class="actual" value="${m10Actual}" type="text" disabled>
                                </div>
                                <div class="annual-widget" mm="m11">
                                    <input value="November" type="text" disabled>
                                    <input class="baseline" value="${m11Base}" type="text" disabled>
                                    <input class="forecast" value="${m11Forecast}" type="text">
                                    <input class="actual" value="${m11Actual}" type="text" disabled>
                                </div>
                                <div class="annual-widget" mm="m12">
                                    <input value="December" type="text" disabled>
                                    <input class="baseline" value="${m12Base}" type="text" disabled>
                                    <input class="forecast" value="${m12Forecast}" type="text">
                                    <input class="actual" value="${m12Actual}" type="text" disabled>
                                </div>
                            </div>
                            <div class="totals">
                                <input value="TOTALS" type="text" disabled>
                                <input class="baseline" value="${totalBase}" type="text" disabled>
                                <input class="forecast" value="${totalForecast}" type="text" disabled>
                                <input class="actual"  value="${totalActual}" type="text" disabled>
                            </div>
                            <button class="spending-body-capexforecast-widget-resource-annual-save btn-shadow">Save</button>
                      
                        </div>
                    </div>`;

                $(`#capexforecast-widget_${yvalue.year}`).children('.content').append(acchtml);
            });
            
        });
    
}
function fillSpendingOpexSpend(){
    const projectid = $('#spending-header-projectid').text();

    const trobj = ACCUSER.getProject(projectid).TaskResource.getDistinctAccountIdList();
    console.log(trobj);
    $('.spending-opexspend-itemlist-body').empty();
    $.each(trobj, function(key, value){
        // const hours = ACCUSER.getProject(projectid).TaskResource.getAccidAllotedHoursByProjectid(value.accid);
        const zrate = ACCUSER.getProject(projectid).AccountRate.getObjByAccidAndProjectid({"accid" : value.accid});
        const rate = zrate == undefined ? "0" : zrate.rate;
        const hours = ACCUSER.getProject(projectid).TaskResource.getAccidAllotedHoursByProjectid({"accid" : value.accid});
        const actualhours = ACCUSER.getProject(projectid).Timesheet.getAccidActualHoursByProjectid({"accid" : value.accid});
        // const accobj = ACCUSER.getAccountObjById(value.accid);
        // console.log(hours);
        // console.log(value.accid);
        let name = '';
        let role = '';
        let budgetamount;
        let actualamount;

        if(value.accid.includes('TA')){
            const tmpaccobj = ACCUSER.getProject(projectid).getTmpAccountObj(value.accid);
            name = `${tmpaccobj.name} (TEMPORARY)`;
            role = tmpaccobj.role == undefined ? "Undefined" : tmpaccobj.role;
        }else{
            const actualaccobj = ACCUSER.getAccountObjById(value.accid);
            name = `${actualaccobj.firstname} ${actualaccobj.lastname}`;
            const tmpaccobj = ACCUSER.getProject(projectid).getTmpAccountObj(value.mapaccid);
            
            // const roleobj =  ACCUSER.getProject(projectid).AccountRole.getObjByAccid(value.accid);
            role = tmpaccobj.role == undefined ? "Undefined" : tmpaccobj.role;
        }

        budgetamount = (isNaN(parseFloat(rate)) ? 0 : parseFloat(rate)) * (isNaN(parseFloat(hours)) ? 0 : parseFloat(hours)) ; 
        actualamount = (isNaN(parseFloat(rate)) ? 0 : parseFloat(rate)) * (isNaN(parseFloat(actualhours)) ? 0 : parseFloat(actualhours)) ; 
        

        $('.spending-opexspend-itemlist-body').append(`
            <div class="spending-opexspend-itemlist-widget">
                <input value="${name}" class="name" type="text" placeholder="Team Member Name"  disabled>
                <input value="${role}" class="role" type="text" placeholder="Role" disabled>
                <input value="${rate}" class="rate" type="text" placeholder="Rate $/hr" disabled>
                <input value="${hours}" class="hours" type="text" placeholder="Alloted Hours" disabled>
                <input value="${actualhours}" class="total" type="text" placeholder="Actual Hours" disabled>
                <input value="${budgetamount}" class="total" type="text" placeholder="$" disabled>
                <input value="${actualamount}" class="total" type="text" placeholder="$" disabled>
            </div>
        `);
    });
}



    // OPEXSPEND EVENTS




    // dashboard events
function spending_popup_widget_upload(e){
    console.log('test');
    const bid = e.attr('bid');
    $(document).off('change', `#pwu_${bid}`); 
    $(document).on('change', `#pwu_${bid}`, function(){
    // console.log($(this).val().split('\\').pop());
    let filename = $(this).val().split('\\').pop();
    let extension = filename.split('.').pop();
    
    if(filename){
        console.log(filename, extension);
        $('.popup-spending-upload').children('.popup-widget-upload').children('.filename').children('input').val(filename);
    }else{
        console.log('cancelled');
    }
});





    $('.request-createtool-con').children('.popup').css('display', 'flex').show();
    $('.request-createtool-con').children('.popup').children('.popup-widget-upload').css('display', 'flex').show();
}

    // dashboard events
$(document).on('click', '.capexspend-itemlist-widget-lumpsum', function(){
    const budgetid = $(this).parent('div').siblings('.capexspend-itemlist-widget-budgetid').val();
    const invoiceid = $(this).parent('div').siblings('.capexspend-itemlist-widget-budgetid').attr('ivid');

    $('.popup-spending-supplier').attr('ivid', invoiceid);
    $('.popup-spending-supplier').attr('bid', budgetid);
    fillInvoiceLumpsum();
    $('.popup-spending-supplier').css('display', 'flex').show();
});
$(document).on('click', '.capexspend-itemlist-widget-material', function(){
    const budgetid = $(this).parent('div').siblings('.capexspend-itemlist-widget-budgetid').val();
    const invoiceid = $(this).parent('div').siblings('.capexspend-itemlist-widget-budgetid').attr('ivid');
    $('.popup-spending-tm').children('.popup-spending-supplier-form').children('.createtool-container').children('.createtool-maintitle').hide();
    $('.popup-spending-supplier-material').show();
    
    $('.popup-spending-tm').attr('ivid', invoiceid);
    $('.popup-spending-tm').attr('bid', budgetid);
    fillInvoiceMaterial();
    $('.popup-spending-tm').css('display', 'flex').show();
    // fill tm-material popup

});
$(document).on('click', '.capexspend-itemlist-widget-manhour', function(){
    const budgetid = $(this).parent('div').siblings('.capexspend-itemlist-widget-budgetid').val();
    const invoiceid = $(this).parent('div').siblings('.capexspend-itemlist-widget-budgetid').attr('ivid');
    $('.popup-spending-tm').children('.popup-spending-supplier-form').children('.createtool-container').children('.createtool-maintitle').hide();
    
    $('.popup-spending-tm').attr('ivid', invoiceid);
    $('.popup-spending-tm').attr('bid', budgetid);
    fillInvoiceManhour();
    fillInvoiceMilestone();
    
    $('.popup-spending-supplier-manhour').show();
    $('.popup-spending-supplier-milestone').show();
    $('.popup-spending-tm').css('display', 'flex').show();
    // fill tm- popup

});
$(document).on('click', '.capexspend-itemlist-widget-expense', function(){
    const budgetid = $(this).parent('div').siblings('.capexspend-itemlist-widget-budgetid').val();
    const invoiceid = $(this).parent('div').siblings('.capexspend-itemlist-widget-budgetid').attr('ivid');
    // fill tm-expense popup
    $('.popup-spending-tm').attr('ivid', invoiceid);
    $('.popup-spending-tm').attr('bid', budgetid);
    fillInvoiceExpense();
    
    $('.popup-spending-tm').children('.popup-spending-supplier-form').children('.createtool-container').children('.createtool-maintitle').hide();
    $('.popup-spending-supplier-expense').show();
    $('.popup-spending-tm').css('display', 'flex').show();
});

    // create supplier popup
$('#spending-mods-suppier').click(function(){
    $('.popup-spending-createsupplier').css('display', 'flex').show();
});
$('#popup-spending-createsupplier-close').click(function(){
    $('.popup-spending-createsupplier').css('display', 'none').hide();
});
$('.popup-spending-createsupplier').click(function(e){
    if(e.target != this){
        return;
    }else{
        $('.popup-spending-createsupplier').css('display', 'none').hide();
    }
});
$('#popup-spending-createsupplier-add').click(function(){
    const name = $('#popup-spending-createsupplier-name').val();
    const projectid = $('#spending-header-projectid').text();

    console.log(name);

    const callback=()=>{
        $('.popup-spending-createsupplier').css('display', 'none').hide();
        showNotification('Create Supplier', `${__FIRST_NAME} has created a new Supplier ${name}`);
    }
    const options = {
        'supplierid' : rngSupplierId(),
        'companyid' : __COMPANY_ID,
        'projectid' : projectid,
        'name' : name
    };

    ACCUSER.Supplier.create(options, callback);
});



    // CAPEXSPEND EVENTS
$('#capexspend-itemlist-addrows').click(function(){
    const projectid = $('#spending-header-projectid').text();

    const budgetobj = ACCUSER.getProject(projectid).Budget.getObj();
    const supplierhtml = ACCUSER.Supplier.getSelectTagHtml();
    let budgetitemhtml = '';
    $.each(budgetobj, function(key, value){
        console.log(value);
        const itemobj = ACCUSER.getProject(projectid).Item.getItemObj(value.itemid);
        if(value.type != "hours"){
            budgetitemhtml += `<option value="${value.id}">${itemobj.name} - ${value.type}</option>`;
        }
    });
    $('.capexspend-itemlist-body').append(`
        <div class="capexspend-itemlist-widget">
            <select class="capexspend-itemlist-widget-supplierid">
                ${supplierhtml}
            </select>
            <select class="capexspend-itemlist-widget-budgetid">
                ${budgetitemhtml}
            </select>
            <input class="capexspend-itemlist-widget-invoicedate" type="date" value="${getDateNow()}">
            <input class="capexspend-itemlist-widget-invoicedetail" type="text" placeholder="Invoice Detail">
            <input class="capexspend-itemlist-widget-invoicenumber" type="text" placeholder="Invoice Number">
            <input class="capexspend-itemlist-widget-exchangerate" type="text" placeholder="Exchange Rate">
            <input class="capexspend-itemlist-widget-capexbudget" type="text" placeholder="Actual Spend" disabled>
            <input class="capexspend-itemlist-widget-capexactual" type="text" placeholder="Payment %" disabled>
            <div>
                
                <i class="fas fa-save capexspend-itemlist-widget-save" title="Save"></i>
            </div>
        </div>
    `);
});
        // save event
$(document).on('click', '.capexspend-itemlist-widget-save', function(){
    const id = rngProjectInvoiceId();
    const projectid = $('#spending-header-projectid').text();
    const supplierid = $(this).parent('div').siblings('.capexspend-itemlist-widget-supplierid').val();
    const budgetid = $(this).parent('div').siblings('.capexspend-itemlist-widget-budgetid').val();
    const invoicedate = $(this).parent('div').siblings('.capexspend-itemlist-widget-invoicedate').val();
    const invoicedetail = $(this).parent('div').siblings('.capexspend-itemlist-widget-invoicedetail').val();
    const invoicenumber = $(this).parent('div').siblings('.capexspend-itemlist-widget-invoicenumber').val();
    const exchangerate = $(this).parent('div').siblings('.capexspend-itemlist-widget-exchangerate').val();
    
    const options = {
        'id' : id,
        'projectid' : projectid,
        'supplierid' : supplierid,
        'budgetid' : budgetid,
        'invoicedate' : invoicedate,
        'invoicedetail' : invoicedetail,
        'invoicenumber' : invoicenumber,
        'exchangerate' : exchangerate
    };
    console.log(options);
    const callback=()=>{
        //fill CAPEX SPENDING
        console.log('awesome');
        fillSpendingCapexSpend();
    }
    ACCUSER.getProject(projectid).Invoice.createInvoice(options, callback);
});

    //  popup supplier events
$('.popup-spending-supplier').click(function(e){
    if(e.target != this){
        return;
    }else{
        $(this).css('display', 'none').hide();
    }
});
$('#popup-spending-supplier-form-save').click(function(){
    const projectid = $('#spending-header-projectid').text();
    $('.popup-spending-supplier-widget-con').children('.popup-spending-supplier-widget').each(function(){
        const create = $(this).attr('create');
        const options = {
            'id': $(this).attr('ivlid') == "" ? rngProjectInvoiceLumpsumId() : $(this).attr('ivlid'),
            'projectid': projectid,
            'invoiceid': $('.popup-spending-supplier').attr('ivid'),
            'milestoneid': $(this).attr('mid'),
            'amount':  $(this).children('.popup-spending-supplier-widget-amount').val()
        }
        console.log(options);

        if(create == "create"){
            // console.log('create');
            const callback=()=>{

            }
            ACCUSER.getProject(projectid).Invoice.createInvoiceLumpsum(options, callback);
        }else if(create == "update"){
            // console.log('update');
            const callback=()=>{

            }
            ACCUSER.getProject(projectid).Invoice.updateInvoiceLumpsum(options, callback);
        }

    });
    
    fillInvoiceLumpsum();
});

    //  POPUP TM EVENTS
$('.popup-spending-tm').click(function(e){
    if(e.target != this){
        return;
    }else{
        $(this).css('display', 'none').hide();
    }
});
        // material events
$(document).on('click', '.popup-spending-supplier-material-widget-save', function(){
    const projectid = $('#spending-header-projectid').text();
    const create = $(this).parent('.popup-spending-supplier-material-widget').attr('create');
    const options = {
        'id': $(this).parent('.popup-spending-supplier-material-widget').attr('ivmatid') == "" ? rngProjectInvoiceMaterialId() : $(this).parent('.popup-spending-supplier-material-widget').attr('ivmatid'),
        'projectid': projectid,
        'invoiceid': $('.popup-spending-tm').attr('ivid'),
        'materialid': $(this).parent('.popup-spending-supplier-material-widget').attr('mid'),
        'amount':  $(this).siblings('.amount').val()
    }
    console.log(options);

    if(create == "create"){
        // console.log('create', options);
        const callback=()=>{

        }
        ACCUSER.getProject(projectid).Invoice.createInvoiceMaterial(options, callback);
    }else if(create == "update"){
        // console.log('update', options);
        const callback=()=>{

        }
        ACCUSER.getProject(projectid).Invoice.updateInvoiceMaterial(options, callback);
    }

    
    fillInvoiceMaterial();
    fillSpendingCapexSpend();
});
        // manhour events
$(document).on('click', '.popup-spending-supplier-manhour-widget-save', function(){
    const projectid = $('#spending-header-projectid').text();
    const create = $(this).parent('.popup-spending-supplier-manhour-widget').attr('create');
    const options = {
        'id': $(this).parent('.popup-spending-supplier-manhour-widget').attr('ivmanid') == "" ? rngProjectInvoiceManhourId() : $(this).parent('.popup-spending-supplier-manhour-widget').attr('ivmanid'),
        'projectid': projectid,
        'invoiceid': $('.popup-spending-tm').attr('ivid'),
        'resourceid': $(this).parent('.popup-spending-supplier-manhour-widget').attr('rid'),
        'hours':  $(this).siblings('.hours').val()
    }
    console.log(options);

    if(create == "create"){
        // console.log('create', options);
        const callback=()=>{

        }
        ACCUSER.getProject(projectid).Invoice.createInvoiceManhours(options, callback);
    }else if(create == "update"){
        // console.log('update', options);
        const callback=()=>{

        }
        ACCUSER.getProject(projectid).Invoice.updateInvoiceManhours(options, callback);
    }

    
    fillInvoiceManhour();
    fillSpendingCapexSpend();
});
        // milestone events
$(document).on('click', '.popup-spending-supplier-milestone-widget-save', function(){
    const projectid = $('#spending-header-projectid').text();
    const invoiceid = $('.popup-spending-tm').attr('ivid');
    
    
    $(this).siblings('.resource').children('input').each(function(){
        const options = {
            'id' : $(this).attr("mid") == undefined ? rngProjectInvoiceMilestoneId() : $(this).attr("mid"),
            'projectid' : projectid,
            'invoiceid' : invoiceid,
            'milestoneid' : $(this).parent('.resource').parent('.popup-spending-supplier-milestone-widget').attr("milestoneid"),
            'resourceid' : $(this).attr("resourceid"),
            'hours' : $(this).val(),
        }
        console.log(options);
    
        if(isNaN(options.hours)){
            blinkbg($(this), RED_PALETTE, "white");
        }else{
            const callback=()=>{
                
            }
            ACCUSER.getProject(projectid).Invoice.createInvoiceMilestone(options, callback);
        }
        
    });

    
    fillInvoiceMilestone();
    fillSpendingCapexSpend();
});
        // expense events
$(document).on('click', '.popup-spending-supplier-expense-widget-save', function(){
    const projectid = $('#spending-header-projectid').text();
    const create = $(this).parent('.popup-spending-supplier-expense-widget').attr('create');
    const options = {
        'id': $(this).parent('.popup-spending-supplier-expense-widget').attr('ivexpid') == "" ? rngProjectInvoiceExpenseId() : $(this).parent('.popup-spending-supplier-expense-widget').attr('ivexpid'),
        'projectid': projectid,
        'invoiceid': $('.popup-spending-tm').attr('ivid'),
        'resourceid': $(this).parent('.popup-spending-supplier-expense-widget').attr('rid'),
        'weeks' : $(this).siblings('.weeks').val(),
        'trips' : $(this).siblings('.trips').val(),
        'distance' : $(this).siblings('.distance').val(),
        'distancerate' : $(this).siblings('.distancerate').val(),
        'triphours' : $(this).siblings('.triphours').val(),
        'triphoursrate' : $(this).siblings('.triphoursrate').val(),
        'fixedrate' : $(this).siblings('.fixedrate').val(),
    }
    console.log(options);

    if(create == "create"){
        // console.log('create', options);
        const callback=()=>{

        }
        ACCUSER.getProject(projectid).Invoice.createInvoiceExpense(options, callback);
    }else if(create == "update"){
        // console.log('update', options);
        const callback=()=>{

        }
        ACCUSER.getProject(projectid).Invoice.updateInvoiceExpense(options, callback);
    }

    
    fillInvoiceExpense();
    fillSpendingCapexSpend();
});


    // CAPEX FORECAST EVENTS
$(document).on('click', '.spending-body-capexforecast-widget-head-btn', function(){
    const status = $(this).attr('status');
    if(status == "closed"){
        $(this).siblings('.header-widget-con').css('display', 'none').hide();
        $(this).parent('.header').siblings('.content').css('display', 'flex').show();
        $(this).attr('status', 'open');
        fillInvoiceCapexForecastResource();
    }else{
        $(this).siblings('.header-widget-con').css('display', 'flex').show();
        $(this).parent('.header').siblings('.content').css('display', 'none').hide();
        $(this).attr('status', 'closed');
        fillInvoiceCapexForecastAnnual();
    }
});
$(document).on('click', '.spending-body-capexforecast-widget-resource', function(e){
    const status = $(this).attr('status');
    if($(e.target).hasClass('tagger')){
        if(status == "closed"){
            $(this).children('.spending-body-capexforecast-widget-resource-annual').css('display', 'flex').show();
            $(this).attr('status', 'open');
        }else{
            $(this).children('.spending-body-capexforecast-widget-resource-annual').css('display', 'none').hide();
            $(this).attr('status', 'closed');
        }
    }else{
        return;
    }
});
$(document).on('click', '.spending-body-capexforecast-widget-resource-annual-save', function(e){
    const projectid = $(this).siblings('.annual').attr('projectid');
    const resourceid = $(this).siblings('.annual').attr('resourceid');
    const year = $(this).siblings('.annual').attr('year');
    const id = $(this).siblings('.annual').attr('fid') == undefined ? rngProjectInvoiceForecastId() : $(this).siblings('.annual').attr('fid');
    const options = {
        'id' : id,
        'projectid' : projectid,
        'resourceid' : resourceid,
        'year' : year,
        'type' : 'capex',
        'm1' : "",
        'm2' : "",
        'm3' : "",
        'm4' : "",
        'm5' : "",
        'm6' : "",
        'm7' : "",
        'm8' : "",
        'm9' : "",
        'm10' : "",
        'm11' : "",
        'm12' : ""
    }
    $(this).siblings('.annual').children('.annual-widget').each(function(){
        const forecast = $(this).children('.forecast').val();
        const mm = $(this).attr('mm');
        // console.log(forecast);
        options[mm] = forecast;
    });
    console.log(options);

    const callback=()=>{
        fillInvoiceCapexForecastResource();
    }
    ACCUSER.getProject(projectid).Invoice.createInvoiceForecast(options, callback);

});































// PROJECT REQUEST EVENTS
function fillIncomingRequest(){
    const reqobj = ACCUSER.getIncomingProjectRequestObj();
    console.log(reqobj);
    $('.request-incoming-widget-con').empty();
    if(reqobj.length > 0 && reqobj[0].projectid != undefined){
        if(reqobj[0].id != undefined){
            $.each(reqobj, function(key, value){
                console.log(value);
                const probj = ACCUSER.getProject(value.projectid).getData();
                const accobj = ACCUSER.getAccountObjById(probj.creator);
                if(value.status.includes('idle')){
                    $('.request-incoming-widget-con').append(`
                        <div class="request-incoming-widget btn-shadow">
                            <span class="projectname" prid="${value.projectid}">${probj.projectname}</span>
                            <span class="owner">${accobj.firstname} ${accobj.lastname}</span>
            
                            <textarea name="" id="" maxlength="100" placeholder="Note Limit 100 characters">${value.notes}</textarea>
                            <div class="btn" prid="${value.projectid}" cid="${value.id}">
                                <button class="btn-shadow request-incoming-widget-action inreject">Reject</button>
                                <button class="btn-shadow request-incoming-widget-action inview">View</button>
                                <button class="btn-shadow request-incoming-widget-action inapprove">Approve</button>
                            </div>
                        </div>
                    `);
                }else{
                    $('.request-incoming-widget-con').append(`
                        <div class="request-incoming-widget btn-shadow">
                            <span class="projectname" prid="${value.projectid}">${probj.projectname}</span>
                            <span class="owner">${accobj.firstname} ${accobj.lastname}</span>
            
                            <textarea disabled name="" id="" maxlength="100" placeholder="Note Limit 100 characters">${value.notes}</textarea>
                            <div class="btn" prid="${value.projectid}" cid="${value.id}">
                                <button disabled class="btn-shadow request-incoming-widget-action inreject">Reject</button>
                                <button class="btn-shadow request-incoming-widget-action inview">View</button>
                                <button disabled class="btn-shadow request-incoming-widget-action inapprove">Approve</button>
                            </div>
                        </div>
                    `);
                }
            });
        }
    }
}
function fillOutgoingRequest(){
    const reqobj = ACCUSER.getOutgoingProjectRequestObj();
    console.log('ASLDJHKLASJDHHJLASD', reqobj);
    $('.request-outgoing-widget-con').empty();
    if(reqobj.length != 0 && reqobj[0].projectid != undefined){
        $.each(reqobj, function(key, value){
            // const callback=()=>{
            //     console.log(ACCUSER.getProject(value.projectid).Request);
            // };
            // ACCUSER.getProject(value.projectid).checkList('Request',callback);

            let zreqobj = ACCUSER.getProject(value.projectid).Request.getConnectObj();
            let xreqobj = ACCUSER.getProject(value.projectid).Request.getObj();
            // console.log('HJKASDKHJGASDKHLGJ', reqobj);
            let reqhtml = '';
            let activateGate = true;
            let retryGate = false;

            $.each(zreqobj, function(key, reqvalue){
                // console.log('ASDADSDSA', reqvalue.status);     
                const accobj = ACCUSER.getAccountObjById(reqvalue.accid);
                // console.log("OUTGOING REQUEST KAJSHDKJASDHJKDHJK", reqvalue.accid, reqvalue.status);
                if(reqvalue.status == "idle"){
                    reqhtml += `
                        <span class="request-outgoing-account waiting shadow" title="${reqvalue.notes}">${accobj.firstname} ${accobj.lastname}<i class="fas fa-minus-circle"></i></span>
                    `;
                    activateGate = false;
                }
                if(reqvalue.status == "approve"){
                    reqhtml += `
                        <span class="request-outgoing-account approved shadow" title="${reqvalue.notes}">${accobj.firstname} ${accobj.lastname}<i class="fas fa-check-circle"></i></span>
                    `;
                }
                if(reqvalue.status == "reject"){
                    reqhtml += `
                        <span class="request-outgoing-account rejected shadow" title="${reqvalue.notes}">${accobj.firstname} ${accobj.lastname}<i class="fas fa-times-circle"></i></span>
                    `;
                    activateGate = false;
                    retryGate = true;
                }
            });

            // console.log('ASDASDASDASDDAS', activateGate, xreqobj.status);
            
            let activatehtml = ``; 
            let retryhtml = ``; 
            // console.log('KLJHASDKJLHDASKJLHADS', value.ownerid);
            if(activateGate && xreqobj.status == "technical"){
                if(value.ownerid == __ID){
                    activatehtml = `<button class="btn-shadow activate hidden request-outgoing-widget-activate" prid="${value.projectid}" status="technical">Send Financial Request</button>`;
                }
            }else if(activateGate && xreqobj.status == "financial"){
                if(value.ownerid == __ID){
                    activatehtml = `<button class="btn-shadow activate hidden request-outgoing-widget-activate" prid="${value.projectid}" status="financial">Activate Project</button>`;
                }
            }

            if(retryGate && xreqobj.status == "technical"){
                retryhtml = `<button class="btn-shadow retry hidden request-outgoing-widget-retry" prid="${value.projectid}" status="${xreqobj.status}" title="Another request will be sent to the directors. Old Requests will be deleted.">Resend Technical Request</button>`;
            }else if(retryGate && xreqobj.status == "financial"){
                if(value.ownerid == __ID){
                    retryhtml = `<button class="btn-shadow retry hidden request-outgoing-widget-retry" prid="${value.projectid}" status="${xreqobj.status}" title="Another request will be sent to the directors. Old Requests will be deleted.">Resend Financial Request</button>`;
                }
            }
            console.log(xreqobj);
            $('.request-outgoing-widget-con').append(`
            <div class="request-outgoing-widget btn-shadow">
                <div class="title">
                    <span class="projectname" prid="${value.projectid}">${value.projectname} - ${xreqobj.status}</span>
                    <div class="icons">
                        <i class="fas fa-eye request-outgoing-widget-close" status="${xreqobj.status}"></i>
                        <i class="fas fa-trash request-outgoing-widget-trash"></i>
                    </div>
                </div>
                <div class="request-outgoing-account-list hidden ">
                    ${reqhtml}
                </div>
                ${activatehtml}
                ${retryhtml}
            </div>
            `);
        
        });
    }
}
$(document).on('click', '.request-outgoing-widget-trash', function(){
    const projectid = $(this).parent().siblings("span").attr('prid');
    const projectname = $(this).parent().siblings("span").html().split(' - ')[0];
    const status = $(this).parent().siblings("span").html().split(' - ')[1];
    const dis = this;
    console.log(projectid, status, projectname);
    if(status.includes("technical")){
        const cbtrue =()=>{
            const cb=()=>{
                console.log("Request Removed Sucessfully");
                const cb1=()=>{
                    console.log("Request Connects Removed Sucessfully");
                    $('#schedule-mods-refresh').click(); //Refreshes
                    showNotification("Request Deletion", "You have Successfully Deleted the Request. You may create another one again.");
                    dis.remove();
                };
                ACCUSER.getProject(projectid).Request.deleteConnect({'projectid' : projectid}, cb1);
            };
            ACCUSER.getProject(projectid).Request.updateStatus({'projectid' : projectid, 'status' : 'idle'}, cb);

        };
        const cbfalse =()=>{
            showNotification("Request Deletion", "Action Cancelled");
        };
        showAction("Confirm Deletion of Request?", cbtrue, cbfalse);        
    }

});
$(document).on('click', '.request-outgoing-widget-close', function(){
    const status = $(this).attr('status');
    if($(this).hasClass('fa-eye')){
        $(this).removeClass('fa-eye').addClass('fa-eye-slash');
        $(this).parent('.icons').parent('.title').siblings('.request-outgoing-account-list').removeClass('hidden').show();
        let activateGate = true;
        let retryGate = false;
        $(this).parent('.icons').parent('.title').siblings('.request-outgoing-account-list').children('.request-outgoing-account').each(function(){
            if(!$(this).hasClass('approved')){
                activateGate = false;
            }
            if($(this).hasClass('rejected')){
                retryGate = true;
            }

        });

        if(activateGate){
            $(this).parent('.icons').parent('.title').siblings('button.activate').removeClass('hidden').show();
        }
        if(retryGate){
            $(this).parent('.icons').parent('.title').siblings('button.retry').removeClass('hidden').show();
        }
        
    }else{
        $(this).removeClass('fa-eye-slash').addClass('fa-eye');
        $(this).parent('.icons').parent('.title').siblings('.request-outgoing-account-list').addClass('hidden');
        $(this).parent('.icons').parent('.title').siblings('button').addClass('hidden');
    }
});
$('#request-create-con-search').click(function(){
    const name = $(this).siblings('input').val();

    const acclist = ACCUSER.getCompanyAccounts();
    console.log(acclist);
    $('#request-create-con-addlist').empty();
    $.each(acclist, function(key, value){
        if(value.firstname.toLowerCase().includes(name.toLowerCase()) || 
        value.lastname.toLowerCase().includes(name.toLowerCase()) || 
        value.email.toLowerCase().includes(name.toLowerCase()) || 
        value.department.toLowerCase().includes(name.toLowerCase()) || 
        value.position.toLowerCase().includes(name.toLowerCase()) ){
            $('#request-create-con-addlist').append(`
                <option value="${value.id}">${value.firstname} ${value.lastname}</option>
            `);
        }
    });

});
$('#request-create-con-add').click(function(){
    const id = $('#request-create-con-addlist').val();
    const name = $('#request-create-con-addlist option:selected').text();
    let createGate = true;
    let dup;
    $('.request-create-account-list').children('.request-create-account').each(function(){
        const accid = $(this).attr('aid');
        if(id == accid){
            createGate = false;
            dup = $(this);
        }
    });
    if(createGate){
        $('.request-create-account-list').append(`
            <span class="request-create-account btn-shadow" aid="${id}">${name}<i class="fas fa-trash"></i></span>
        `);
    }else{
        blinkbg(dup, YELLOW_PALETTE, BTN_COLOR);
    }

});
$(document).on('click', '.request-create-account > .fa-trash', function(){
    $(this).parent('span').remove();
});
$('#request-create-con-submit').click(function(){
    const projectid = $('#request-create-con-prlist').val();
    console.log('----------------------------------' + projectid, ACCUSER.getProject(projectid));
    
    const lockStatus = ACCUSER.getProject(projectid).Request.isLocked();
    console.log('locked status ', lockStatus);

    if(lockStatus){
        showNotification("Error","The Project is locked!");
    }else{
        let x = ACCUSER.getProject(projectid).Request.getObj();
        if(x == undefined || x.requestid == undefined){
            showNotification("Project Request", "Please build the technical information first before sending a request.");
        }else{
            // console.log("Gather list of people");
            $('.request-create-account').each(function(){
                const aid = $(this).attr('aid');
                console.log(aid);
                setTimeout(() => {
                    if(aid != "na"){
                        api_createProjectConnect(projectid, aid);
                    }
                }, 0);
            });
            const callback =()=>{
                $('.request-create-account-list').children('.request-create-account').each(function(){
                    const accid = $(this).attr('aid');
                    const obj = {
                        'id' : rngProjectRequestConnect(),
                        'projectid' : projectid,
                        'accid' : accid
                    };
                    const callback =()=>{
                        ACCUSER.createConnect(obj);
                        console.log('added to request connect:', accid);
                        const na = {
                            "response" : "na"
                        };
                        const nastr = JSON.stringify(na);
                        const probj = ACCUSER.getProject(projectid).getData();
                        const aloptions = {
                            'id' : rngAlertId(),
                            'ownerid' : obj.accid,
                            'fn' : 'na',
                            'dataview' : nastr,
                            'dataapprove' : nastr,
                            'datareject' : nastr,
                            'title' : "Project Request",
                            'message' : `You have been assigned as a director for the project <b>${probj.projectname}</b>`
                        }
                        ACCUSER.Alert.create(aloptions, ()=>{ACCUSER.Alert.fill()});
                    };
                    ACCUSER.getProject(projectid).Request.createConnect(obj, callback);
                });
                // console.log('project request was sent for technical approval');
                showNotification("Project Request", "Project Request was sent for approval.");
                $('.request-create-account-list').children('.request-create-account').remove();
                $('#request-create-con-prlist').val("na");
                $('#request-create-con-addlist').empty();
                const callback=()=>{
                    const callback=()=>{
                        const callback=()=>{
                            setTimeout(() => {
                                fillIncomingRequest();
                                fillOutgoingRequest();
                                
                            }, 0);
                        }
                        ACCUSER.getProject(projectid).checkList('Request', callback, true);
                    }
                    ACCUSER.checkList('IncomingProjectRequest', callback, true);
                }
                ACCUSER.checkList('OutgoingProjectRequest', callback, true);
                
                // $('#schedule-mods-refresh').click(); //Refreshes
            };
            ACCUSER.getProject(projectid).Request.updateStatus({"projectid" : projectid, "status" : "technical"}, callback);
    
        }
    }
    
    
    console.log('----------------------------------' + projectid, ACCUSER.getProject(projectid));
    
});
$('#request-create-con-prlist').change(function(){
    const projectid = $(this).val();
    console.log(projectid);
    if(projectid != "na"){
        ACCUSER.getProject(projectid).checkList("Request",data=>{console.log(data)});
    }
});
$(document).on('click', '.request-incoming-widget-action', function(){
    const projectid = $(this).parent('.btn').attr('prid');
    const id = $(this).parent('.btn').attr('cid');
    const notes = $(this).parent('.btn').siblings('textarea').val();
    $('#request-createtool-required-requestid').attr("sender", "viewer");

    console.log(projectid);
    if($(this).hasClass("inapprove")){
        // console.log('approve');
        const callback =()=>{
            setTimeout(() => {
                ACCUSER.updateConnect({
                    'id' : id,
                    'status' : 'approve',
                    'notes' : notes
                });
                fillIncomingRequest();
                fillOutgoingRequest();
            }, 0);
        }
        ACCUSER.getProject(projectid).Request.updateConnect({
            'id' : id,
            'status' : 'approve',
            'notes' : notes
        }, callback);
    }else if($(this).hasClass("inreject")){
        // console.log('reject');
        const callback =()=>{
            setTimeout(() => {
                ACCUSER.updateConnect({
                    'id' : id,
                    'status' : 'reject',
                    'notes' : notes
                });
                fillIncomingRequest();
                fillOutgoingRequest();
            }, 0);
        }
        ACCUSER.getProject(projectid).Request.updateConnect({
            'id' : id,
            'status' : 'reject',
            'notes' : notes
        }, callback);
    }else if($(this).hasClass("inview")){
        // console.log('view');
        $('.request-createtool-con').show();
        showRefreshReport('Loading...');
        const callback=data=>{
            const callback=data=>{
                const callback=data=>{
                    console.log(data);
                    const callback=data=>{
                        console.log(data);
                    }
                    ACCUSER.getProject(projectid).checkList("Request", callback);
                    setTimeout(() => {
                        fillRequestTool(projectid, "viewer");
                        hideRefreshReport();
                    }, 0);
                }
                ACCUSER.getProject(projectid).checkList("Prerequest", callback);
            }
            ACCUSER.getProject(projectid).checkList("Budget", callback);
        }
        ACCUSER.getProject(projectid).checkList("ScheduleDocument", callback);
    }
});
$(document).on('click', ".request-outgoing-widget-activate", function(){
    const projectid = $(this).attr('prid');
    const status = $(this).attr('status');
    console.log("Activate: ", projectid, status);
    if(status == "technical"){
        const reqobj = ACCUSER.getProject(projectid).Request.getObj();
        console.log(reqobj);
        if(reqobj.manager == "" || reqobj.manager == null || reqobj.manager == undefined){
            showNotification("Project Request", "Please Provide a Project Manager Before Sending into Financial");
        }else{
            const callback =()=>{
                const reqconnobj = ACCUSER.getProject(projectid).Request.getConnectObj();
                $.each(reqconnobj, function(key, value){
                    const callback1 = ()=>{
                        const callback2 = ()=>{
                            fillIncomingRequest();
                            fillOutgoingRequest();
                        }
                        ACCUSER.updateConnect({"id" : value.id, "status" : "idle", "notes" : ""}, callback2);
                    }
                    ACCUSER.getProject(projectid).Request.updateConnect({"id" : value.id, "status" : "idle", "notes" : ""}, callback1);
                });
            }
            ACCUSER.getProject(projectid).Request.updateStatus({"projectid" : projectid, "status" : "financial"}, callback);
        }
        
    }else if(status == "financial"){
        const callback =()=>{
            const callback =()=>{
                const reqconnobj = ACCUSER.getProject(projectid).Request.getConnectObj();
                $.each(reqconnobj, function(key, value){
                    const callback = ()=>{
                        const callback =()=>{
                            fillIncomingRequest();
                            fillOutgoingRequest();
                        }
                        ACCUSER.getProject(projectid).Request.deleteConnect({"projectid" : projectid}, callback);
                    }
                    ACCUSER.deleteConnect({"id" : value.id}, callback);
                });
            }
            ACCUSER.getProject(projectid).Request.updateStatus({"projectid" : projectid, "status" : "active"}, callback);
        }
        ACCUSER.getProject(projectid).updateStatus({"projectid" : projectid, "status" : "active"}, callback);
    }

});
$(document).on('click', ".request-outgoing-widget-retry", function(){
    const projectid = $(this).attr('prid');
    const status = $(this).attr('status');
    console.log("Retry: ", projectid, status);
    

    // const cb =()=>{
        const reqconnobj = ACCUSER.getProject(projectid).Request.getConnectObj();
        $.each(reqconnobj, function(key, value){
            const callback1 = ()=>{
                const callback2 = ()=>{
                    fillIncomingRequest();
                    fillOutgoingRequest();
                }
                ACCUSER.updateConnect({"id" : value.id, "status" : "idle", "notes" : ""}, callback2);
            }
            ACCUSER.getProject(projectid).Request.updateConnect({"id" : value.id, "status" : "idle", "notes" : ""}, callback1);
        });
    // }
    // ACCUSER.getProject(projectid).checkList("Request", cb);

});






// ACTIVE PROJECTS DASHBOARD EVENTS
$('.dashboard-body-content-static').children('.widget').mouseenter(function(){
    $(this).stop().animate({"border-radius" : "5px"}, 1000);
    $(this).children('.title').stop().animate({"border-radius" : "5px"}, 1000);
});
$('.dashboard-body-content-static').children('.widget').mouseleave(function(){
    $(this).stop().animate({"border-top-right-radius" : "25px", "border-bottom-left-radius" : "25px"}, 1000);
    $(this).children('.title').stop().animate({"border-bottom-left-radius" : "25px"}, 1000);
});




// PROJECT REQUEST CREATE TOOL EVENTS

function saveRequestTechAdd(callback){
    $('.createtool-subtitle.dynamic').each(function(){
        console.log("running saveRequestTechAdd", $(this));

        let type = '';
        const dis = $(this);
        let id = $(this).attr('id') == undefined ? rngProjectRequestTechAdd() : $(this).attr('id');
        let subject = $(this).children('.crtitle').children('input').val();
        let param = $(this).children('.content').children('textarea').val();
        let osubject = $(this).children('.crtitle').children('input').attr("oldvalue");
        let oparam = $(this).children('.content').children('textarea').attr("oldvalue");
        if($(this).hasClass('d')){
            type = 'd';
        }else if($(this).hasClass('p')){
            type = 'p';
        }else if($(this).hasClass('s')){
            type = 's';
        }

        const obj = {
            'id' : id,
            'requestid' : $('#request-createtool-required-requestid').val(),
            'projectid' : $('#request-createtool-required-requestid').attr('prid'),
            'type' : type,
            'subject' : subject,
            'param' : param,
        }
        const objclone = {
            'id' : id,
            'requestid' : $('#request-createtool-required-requestid').val(),
            'projectid' : $('#request-createtool-required-requestid').attr('prid'),
            'type' : type,
            'subject' : subject,
            'param' : param,
        }
        const objoldvalue = [
            {"ki" : 'subject', "val" : osubject},
            {"ki" : 'param', "val" : oparam},
        ]
        
        let desc = '';
        let createGate = false;

        // console.log('KHJADSHKJASDHJKADSHJK',objoldvalue);

        $.each(objoldvalue, function(key, value){
            if(obj[value.ki] != value.val && (value.val != "" || value.val != undefined)){
                console.log(`${value.ki} was changed from ${value.val} to ${obj[value.ki]}`);
                let tloc = '';
                let tn = '';

                if(obj.type == "d"){
                    tloc = `Description`;
                }if(obj.type == "p"){
                    tloc = `Prioritization`;
                }if(obj.type == "s"){
                    tloc = `Strategy`;
                }

                if(value.ki == "subject"){
                    tn = "Subject";
                }else if(value.ki == "param"){
                    tn = obj.subject;
                }

                if(dis.attr('id') == undefined){
                    desc = `${tloc} > ${tn} > was created and given a value of ${obj[value.ki]}, `;
                }else{
                    desc = `${tloc} > ${tn} > was updated and changed from ${value.val} to ${obj[value.ki]}, `;
                }
                        
                objclone[value.ki] = value.val;
                createGate = true;
            }
        });

        let x = ACCUSER.getProject(obj.projectid).Request.isLocked();
        if(createGate && x != "0"){
            const options = {
                "id" : rngProjectRequestLocker(),
                "projectid" : objclone.projectid,
                "api" : "Request.createTechAdd",
                "parameter" : JSON.stringify(objclone),
                "type" : 'technical',
                "operation" : dis.attr('id') == undefined ? "create" : "update",
                "description" : `Technical > ${desc}`,
            }
            console.log(options);
            const callback1=()=>{
                console.log(options);
                ACCUSER.getProject(obj.projectid).Request.createTechAdd(obj, callback);
            }
            ACCUSER.getProject(objclone.projectid).Request.createLock(options, callback1);
        }else if(createGate){
            ACCUSER.getProject(obj.projectid).Request.createTechAdd(obj, callback);
        }


    });
}
function fillRequestTool(prid, sender="creator"){
    // console.log('AAAAAAAAAAAAAAAAAAAAAAAA');
    const probj = ACCUSER.getProject(prid).getData();
    const reqobj = ACCUSER.getProject(prid).Request.getObj();
    const isOwner = $('.build-body').children('.build-body-header').attr("owner");
    let requestid = '';
    $('#request-createtool-required-requestid').attr('sender', sender);
    const prscore = ACCUSER.getProject(prid).Request.getProjectScore();
    $('#request-createtool-required-score').val(prscore);


    $('#request-createtool-required-projectname').val(probj.projectname);
    $('#request-createtool-required-requestid').attr('sender', sender);
    ACCUSER.fillSelectTagWithCompanyAccount($('#request-createtool-required-manager'));
    ACCUSER.fillSelectTagWithCompanyAccount($('#request-createtool-required-requestor'));

    

    ACCUSER.fillSelectTagWithDepartment($('#request-createtool-required-department'));
    console.log(probj.creator);

    const accobj = ACCUSER.getAccountObjById(probj.creator);
    let superobj = undefined;

    if(accobj.superid == "independent"){
        superobj = accobj;
    }else{
        superobj = ACCUSER.getSupervisorAccount(probj.creator);
    }
    console.log(superobj);
    // ACCUSER.fillSelectTagWithCompanyAccountByDepartment($('#request-createtool-required-requestor'), $('#request-createtool-required-department').val());
    // ACCUSER.fillSelectTagWithCompanyAccountByDepartment($('#request-createtool-required-manager'), $('#request-createtool-required-department').val());
        
    

        // fill required fields
        // console.log(reqobj.status != undefined, reqobj.length);
    if(reqobj.status != undefined && reqobj != {}){
        // console.log('LKJAHSDKJHGASDKJHGASDJKGH', reqobj);
        requestid = reqobj.requestid;
        const accobj = ACCUSER.getAccountObjById(reqobj.requestor);
        $('#request-createtool-required-requestid').val(reqobj.requestid).attr("oldvalue", reqobj.requestid).attr('prid', reqobj.projectid);
        $('#request-createtool-required-projectname').val(reqobj.name).attr("oldvalue", reqobj.name);
        // $('#request-createtool-required-score').val(reqobj.score).attr("oldvalue", reqobj.score);
        $('#request-createtool-required-description').val(reqobj.description).attr("oldvalue", reqobj.description);
        $('#request-createtool-required-loc1').val(reqobj.location1).attr("oldvalue", reqobj.location1);
        $('#request-createtool-required-loc2').val(reqobj.location2).attr("oldvalue", reqobj.location2);
        $('#request-createtool-required-requestor').val(reqobj.requestor).attr("oldvalue", reqobj.requestor);
        // $('#request-createtool-required-department').val(accobj.department).attr("oldvalue", accobj.department);
        $('#request-createtool-required-manager').val(reqobj.manager).attr("oldvalue", reqobj.manager);
        $('#request-createtool-required-sponsor').val(reqobj.sponsor).attr("oldvalue", reqobj.sponsor);

        if(reqobj.status == "idle"){
            $('#request-createtool-header-budget').hide();
            $('#request-createtool-header-financial').hide();
            $('#request-createtool-required-requestid').attr('status', 'idle');
        }
        if(reqobj.status == "technical"){
            $('#request-createtool-header-budget').hide();
            $('#request-createtool-header-financial').hide();
            $('#request-createtool-required-requestid').attr('status', 'technical');
        }
        if(reqobj.status == "financial"){
            if(sender == "viewer"){
                $('#request-createtool-header-budget').show();
                $('#request-createtool-header-financial').show();
                $('#request-createtool-required-requestid').attr('status', 'financial');
            }else{
                if(isOwner == "true"){
                    $('#request-createtool-header-budget').show();
                    $('#request-createtool-header-financial').show();
                    $('#request-createtool-required-requestid').attr('status', 'financial');
                }else{
                    $('#request-createtool-header-budget').hide();
                    $('#request-createtool-header-financial').hide();
                    $('#request-createtool-required-requestid').attr('status', 'financial');
                }
            }
        }

    }else{
        $('#request-createtool-header-budget').hide();
        $('#request-createtool-header-financial').hide();
        // $('#request-createtool-required-score').val("");
        $('#request-createtool-required-description').val("");
        $('#request-createtool-required-loc1').val("");
        $('#request-createtool-required-loc2').val("");
        $('#request-createtool-required-requestor').val("");
        $('#request-createtool-required-requester').val("");
        $('#request-createtool-required-manager').val("");
        $('#request-createtool-required-sponsor').val("");
    }

    

        // fill default technical fields
    const techobj = ACCUSER.getProject(prid).Request.getTechObj();
    if(techobj != undefined){
        $('#request-createtool-technical-desc_1').val(techobj.desc_1).attr("oldvalue", techobj.desc_1);
        $('#request-createtool-technical-desc_2').val(techobj.desc_2).attr("oldvalue", techobj.desc_2);
        $('#request-createtool-technical-desc_3').val(techobj.desc_3).attr("oldvalue", techobj.desc_3);
        $('#request-createtool-technical-desc_4_1').val(techobj.desc_4_1).attr("oldvalue", techobj.desc_4_1);
        $('#request-createtool-technical-desc_4_2').val(techobj.desc_4_2).attr("oldvalue", techobj.desc_4_2);
        $('#request-createtool-technical-prior_1').val(techobj.prior_1).attr("oldvalue", techobj.prior_1);
        $('#request-createtool-technical-prior_2').val(techobj.prior_2).attr("oldvalue", techobj.prior_2);
        $('#request-createtool-technical-prior_3').val(techobj.prior_3).attr("oldvalue", techobj.prior_3);
        $('#request-createtool-technical-prior_4').val(techobj.prior_4).attr("oldvalue", techobj.prior_4);
        $('#request-createtool-technical-prior_5').val(techobj.prior_5).attr("oldvalue", techobj.prior_5);
        $('#request-createtool-technical-prior_6').val(techobj.prior_6).attr("oldvalue", techobj.prior_6);
        $('#request-createtool-technical-prior_7').val(techobj.prior_7).attr("oldvalue", techobj.prior_7);
        $('#request-createtool-technical-prior_8').val(techobj.prior_8).attr("oldvalue", techobj.prior_8);
        $('#request-createtool-technical-strat_1').val(techobj.strat_1).attr("oldvalue", techobj.strat_1);
        $('#request-createtool-technical-strat_2').val(techobj.strat_2).attr("oldvalue", techobj.strat_2);



        const scoreobj = ACCUSER.getProject(prid).Request.getScore();
        // console.log('AHKJJJJJJJJJJJJJJJJJJJJ',superobj);

        

        function starhtml(link){
            return `
            <div link="${link}" vvv="${scoreobj[link]}" reqid="${requestid}" prid="${prid}" class="request-createtool-technical-con-scoring ${superobj.id == __ID ? "active" : ""}">
                <i class="far fa-info-circle" title="Click to Save Score"></i>
                <i class="${parseInt(scoreobj[link]) >= 1 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star1" star="1"></i>
                <i class="${parseInt(scoreobj[link]) >= 2 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star2" star="2"></i>
                <i class="${parseInt(scoreobj[link]) >= 3 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star3" star="3"></i>
                <i class="${parseInt(scoreobj[link]) >= 4 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star4" star="4"></i>
                <i class="${parseInt(scoreobj[link]) >= 5 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star5" star="5"></i>
                <i class="${parseInt(scoreobj[link]) >= 6 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star6" star="6"></i>
                <i class="${parseInt(scoreobj[link]) >= 7 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star7" star="7"></i>
                <i class="${parseInt(scoreobj[link]) >= 8 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star8" star="8"></i>
                <i class="${parseInt(scoreobj[link]) >= 9 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star9" star="9"></i>
                <i class="${parseInt(scoreobj[link]) >= 10 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star10" star="10"></i>
            </div>
        `;
        }
        


        $('#request-createtool-technical-desc_1').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#request-createtool-technical-desc_2').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#request-createtool-technical-desc_3').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#request-createtool-technical-desc_4_1').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#request-createtool-technical-desc_4_2').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#request-createtool-technical-prior_1').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#request-createtool-technical-prior_2').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#request-createtool-technical-prior_3').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#request-createtool-technical-prior_4').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#request-createtool-technical-prior_5').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#request-createtool-technical-prior_6').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#request-createtool-technical-prior_7').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#request-createtool-technical-prior_8').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#request-createtool-technical-strat_1').parent('.content').children('.request-createtool-technical-con-scoring').remove();
        $('#request-createtool-technical-strat_2').parent('.content').children('.request-createtool-technical-con-scoring').remove();

        $('#request-createtool-technical-desc_1').parent('.content').append(starhtml("desc_1"));
        $('#request-createtool-technical-desc_2').parent('.content').append(starhtml("desc_2"));
        $('#request-createtool-technical-desc_3').parent('.content').append(starhtml("desc_3"));
        $('#request-createtool-technical-desc_4_1').parent('.content').append(starhtml("desc_4_1"));
        $('#request-createtool-technical-desc_4_2').parent('.content').append(starhtml("desc_4_2"));
        $('#request-createtool-technical-prior_1').parent('.content').append(starhtml("prior_1"));
        $('#request-createtool-technical-prior_2').parent('.content').append(starhtml("prior_2"));
        $('#request-createtool-technical-prior_3').parent('.content').append(starhtml("prior_3"));
        $('#request-createtool-technical-prior_4').parent('.content').append(starhtml("prior_4"));
        $('#request-createtool-technical-prior_5').parent('.content').append(starhtml("prior_5"));
        $('#request-createtool-technical-prior_6').parent('.content').append(starhtml("prior_6"));
        $('#request-createtool-technical-prior_7').parent('.content').append(starhtml("prior_7"));
        $('#request-createtool-technical-prior_8').parent('.content').append(starhtml("prior_8"));
        $('#request-createtool-technical-strat_1').parent('.content').append(starhtml("strat_1"));
        $('#request-createtool-technical-strat_2').parent('.content').append(starhtml("strat_2"));
    }else{
        $('#request-createtool-technical-desc_1').val("").attr("oldvalue", "");
        $('#request-createtool-technical-desc_2').val("").attr("oldvalue", "");
        $('#request-createtool-technical-desc_3').val("").attr("oldvalue", "");
        $('#request-createtool-technical-desc_4_1').val("").attr("oldvalue", "");
        $('#request-createtool-technical-desc_4_2').val("").attr("oldvalue", "");
        $('#request-createtool-technical-prior_1').val("").attr("oldvalue", "");
        $('#request-createtool-technical-prior_2').val("").attr("oldvalue", "");
        $('#request-createtool-technical-prior_3').val("").attr("oldvalue", "");
        $('#request-createtool-technical-prior_4').val("").attr("oldvalue", "");
        $('#request-createtool-technical-prior_5').val("").attr("oldvalue", "");
        $('#request-createtool-technical-prior_6').val("").attr("oldvalue", "");
        $('#request-createtool-technical-prior_7').val("").attr("oldvalue", "");
        $('#request-createtool-technical-prior_8').val("").attr("oldvalue", "");
        $('#request-createtool-technical-strat_1').val("").attr("oldvalue", "");
        $('#request-createtool-technical-strat_2').val("").attr("oldvalue", "");
    }

        // fill dynamic technical fields
    const techaddobj = ACCUSER.getProject(prid).Request.getTechAddObj();
    $('.createtool-subtitle.dynamic').remove();
    // console.log("getTechAddObj", techaddobj);


    
    

    $.each(techaddobj, function(key, value){
        const scoreaddobj = ACCUSER.getProject(prid).Request.getScoreAddById(value.id);
    
        const sssc = scoreaddobj != undefined ? scoreaddobj.score : 0;
        // console.log(value.id, scoreaddobj);
        const h =`
            <div id="${value.id}" class="createtool-subtitle dynamic ${value.type}">
                <span class="crtitle btn-shadow"><input type="text" placeholder="Subject" oldvalue="${value.subject}" value="${value.subject}" ><i class="fas fa-caret-left"></i></span>
                <div class="content">
                    <span class="instruction">Instruction: Add Custom Parameter</span>
                    <textarea  class="halfw" maxlength="500" oldvalue="${value.param}" placeholder="500 Characters Maximum">${value.param}</textarea>
                    <div link="${`add+${value.id}`}" vvv="${sssc}" reqid="${requestid}" prid="${prid}" class="request-createtool-technical-con-scoring ${superobj.id == __ID ? "active" : ""}">
                        <i class="far fa-info-circle" title="Click to Save Score"></i>
                        <i class="${parseInt(sssc) >= 1 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star1" star="1"></i>
                        <i class="${parseInt(sssc) >= 2 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star2" star="2"></i>
                        <i class="${parseInt(sssc) >= 3 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star3" star="3"></i>
                        <i class="${parseInt(sssc) >= 4 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star4" star="4"></i>
                        <i class="${parseInt(sssc) >= 5 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star5" star="5"></i>
                        <i class="${parseInt(sssc) >= 6 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star6" star="6"></i>
                        <i class="${parseInt(sssc) >= 7 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star7" star="7"></i>
                        <i class="${parseInt(sssc) >= 8 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star8" star="8"></i>
                        <i class="${parseInt(sssc) >= 9 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star9" star="9"></i>
                        <i class="${parseInt(sssc) >= 10 ? "fas" : "far"} fa-star request-createtool-technical-con-scoring-star star10" star="10"></i>
                    </div>
                </div>
            </div>
        `;
        $(`.createtool-maintitle.${value.type}`).children('.content').prepend(h);
    });

    setRequestToolLock(sender);
    $('.request-createtool-con').css('display', 'flex').show();
    $('.request-createtool-header-w').removeClass('active').addClass('idle');
    $('.createtool-container').addClass('hidden').css('display', 'none').hide();

    if(sender == "viewer"){
        $('#request-createtool-save').hide();
        $('#preqsched-body-preqtasklist-legend-add').hide();
        $('.request-createtool-body').children('.createtool-container').children('button').hide();
        $('.request-createtool-header-lock').hide();
        $('#createtool-budget-itemlist-addrow').hide();
        $('#createtool-budget-itemlist-additems').hide();
        $('.createtool-budget-itemlist-widget').children('.action').hide();
        $('.createtool-opex-itemlist-widget-save').hide();
        $('#createtool-budget-forecast-addyear-opex').hide();
        $('#createtool-budget-forecast-addyear-capex').hide();
        $('.preqtasklist-widget-title-milestone').hide();
    }else{
        $('#request-createtool-save').show();
        $('#preqsched-body-preqtasklist-legend-add').show();
        $('.request-createtool-body').children('.createtool-container').children('button').show();
        $('.request-createtool-header-lock').show();
        $('#createtool-budget-itemlist-addrow').show();
        $('#createtool-budget-itemlist-additems').show();
        $('.createtool-budget-itemlist-widget').children('.action').show();
        $('.createtool-opex-itemlist-widget-save').show();
        $('#createtool-budget-forecast-addyear-opex').show();
        $('#createtool-budget-forecast-addyear-capex').show();
        $('.preqtasklist-widget-title-milestone').show();
        // $('.preqtasklist-widget-title-milestone').hide();
    }


    
}

function setRequestToolLock(sender){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    let lock = ACCUSER.getProject(projectid).Request.isLocked();
    $('.request-createtool-header').children('.request-createtool-header-w').each(function(){
        $(this).removeClass('active').addClass('idle');
        $(this).css("background-color", "grey");
    });
    console.log('LOOOOOOCK',lock);
    if(lock){
        fillRequestToolReview(sender);
        $('#request-createtool-header-review').css('display', 'flex').show();
        $('.request-createtool-header-lock').removeClass('fa-unlock').addClass('fa-lock').css("color", RED_PALETTE).attr("status", "locked");
    }else{
        $('#request-createtool-header-review').css('display', 'none').hide();
        $('.request-createtool-header-lock').removeClass('fa-lock').addClass('fa-unlock').css("color", GREEN_PALETTE).attr("status", "unlocked");
    }

}
function fillRequestToolReview(sender){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const lockobj =  ACCUSER.getProject(projectid).Request.getLockObj();
    $('.createtool-review-technical-widget-con').empty();
    $('.createtool-review-schedule-widget-con').empty();
    $('.createtool-review-budget-widget-con').empty();
    $('.createtool-review-financial-widget-con').empty();
    $.each(lockobj, function(key, value){
        // 'id' : value.id,
        // 'projectid' : value.projectid,
        // 'api' : value.api,
        // 'parameter' : value.parameter,
        // 'type' : value.type,
        // 'operation' : value.operation,
        // 'description' : value.description
        let reverthtml = sender == "creator" ? `<i class="createtool-review-technical-widget-revert fas fa-history" title="Revert"></i>` : "<i></i>"
        if(sender != "creator"){
            $('.request-createtool-header-lock').hide();
        }else{
            $('.request-createtool-header-lock').show();
        }

        if(value.type == "technical"){
            $('.createtool-review-technical-widget-con').append(`
                <div id="lock_${value.id}" api="${value.api}" parameter="${value.parameter}" operation="${value.operation}"
                lid="${value.id}" class="createtool-review-technical-widget">
                    <textarea class="description" title="${value.description}" disabled>${value.description}</textarea>
                    ${reverthtml}
                </div>
            `);
        }
        if(value.type == "schedule"){
            $('.createtool-review-schedule-widget-con').append(`
                <div id="lock_${value.id}" api="${value.api}" parameter="${value.parameter}" operation="${value.operation}"
                lid="${value.id}" class="createtool-review-technical-widget">
                    <textarea class="description" title="${value.description}" disabled>${value.description}</textarea>
                    ${reverthtml}
                </div>
            `);
        }
        if(value.type == "budget"){
            $('.createtool-review-budget-widget-con').append(`
                <div id="lock_${value.id}" api="${value.api}" parameter="${value.parameter}" operation="${value.operation}"
                lid="${value.id}" class="createtool-review-technical-widget">
                    <textarea class="description" title="${value.description}" disabled>${value.description}</textarea>
                    ${reverthtml}
                </div>
            `);
        }
        if(value.type == "financial"){
            $('.createtool-review-financial-widget-con').append(`
                <div id="lock_${value.id}" api="${value.api}" parameter="${value.parameter}" operation="${value.operation}"
                lid="${value.id}" class="createtool-review-technical-widget">
                    <textarea class="description" title="${value.description}" disabled>${value.description}</textarea>
                    ${reverthtml}
                </div>
            `);
        }
    });

}
function revertLockChanges(selector, callback){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const id = selector.attr('lid');
    const lockobj = ACCUSER.getProject(projectid).Request.getLockObjById(id);


    const api = lockobj.api;
    const parameter = lockobj.parameter;
    const operation = lockobj.operation;
    
    console.log(parameter);
    const jsonparam = JSON.parse(parameter);

    if(operation == "create"){
        if(api == "Request.createTechAdd"){
            const cb=()=>{
                const cb1=()=>{
                    callback();
                }
                ACCUSER.getProject(projectid).Request.deleteLock({"id" : id}, cb1);
            }
            ACCUSER.getProject(projectid).Request.deleteTechAdd({"id" : jsonparam.id}, cb);
        }
    }else if(operation == "update"){
        if(api == "Request.create"){
            const cb=()=>{
                const cb1=()=>{
                    callback();
                }
                ACCUSER.getProject(projectid).Request.deleteLock({"id" : id}, cb1);
            }
            ACCUSER.getProject(projectid).Request.create(jsonparam, cb);
        }else if(api == "Request.createTech"){
            const cb=()=>{
                const cb1=()=>{
                    callback();
                }
                ACCUSER.getProject(projectid).Request.deleteLock({"id" : id}, cb1);
            }
            ACCUSER.getProject(projectid).Request.createTech(jsonparam, cb);
        }else if(api == "Request.createTechAdd"){
            const cb=()=>{
                const cb1=()=>{
                    callback();
                }
                ACCUSER.getProject(projectid).Request.deleteLock({"id" : id}, cb1);
            }
            ACCUSER.getProject(projectid).Request.createTechAdd(jsonparam, cb);
        }
    }

}
function fillRequestToolFinancial(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const budgetobj = ACCUSER.getProject(projectid).Budget.getObj();
    let totalcapex = 0;
    let totalopex = 0;
    let totalcosting = 0;


    $('.createtool-financial-itemlist-body').empty();
    $.each(budgetobj, function(key, value){
        let costing = 0;
        if(value.type != undefined){
            
            if(value.type == "tm"){
                const matobj = ACCUSER.getProject(projectid).Budget.getMaterialCostByBudgetId(value.id);
                const manobj = ACCUSER.getProject(projectid).Budget.getManhourCostByBudgetId(value.id);
                costing = matobj + manobj;
            }else if(value.type == "supplier"){
                costing = value.capexcost;
            }else if(value.type == "hours"){
                costing = value.opexcost;
            }
            

            // console.log('value.itemid',value.itemid);ss

            const itemobj = ACCUSER.getProject(projectid).Item.getItemObj(value.itemid);
            // console.log('itemobj', itemobj);
            const itemcatobj = ACCUSER.getProject(projectid).Item.getCategoryObj(itemobj.categoryid);
            // console.log('itemcatobj', itemcatobj);
            const vendorobj = ACCUSER.getProject(projectid).getTmpSupplierObj(value.vendor);
            let html = `
                <div class="createtool-financial-itemlist-widget">
                    <input value="${itemobj.name}" type="text" placeholder="Item Name" disabled>
                    <input value="${value.capexcost}" type="text" placeholder="$" disabled>
                    <input value="${value.opexcost}" type="text" placeholder="$" disabled>
                    <input value="${vendorobj.name}" type="text" placeholder="Vendor" disabled>
                    <input value="${costing}" type="text" placeholder="Costing Available" disabled>
                </div>
            `;
            $('.createtool-financial-itemlist-body').append(html);
            
            totalcapex += (isNaN(parseFloat(value.capexcost)) ? 0 : parseFloat(value.capexcost)); 
            totalopex += (isNaN(parseFloat(value.opexcost)) ? 0 : parseFloat(value.opexcost)); 
            totalcosting += (isNaN(parseFloat(costing)) ? 0 : parseFloat(costing)); 

            const contingencynum = $('#createtool-financial-itemlist-totals-contingency').val();
            const contingencycapex = ( ( totalcapex * contingencynum ) / 100 );
            const contingencyopex = ( ( totalopex * contingencynum ) / 100 );
            const projectcost = ( totalcosting + contingencycapex + contingencyopex );

            $('#createtool-financial-itemlist-totals-contingency-capex').val(`$${contingencycapex.toFixed(2)}`);
            $('#createtool-financial-itemlist-totals-contingency-opex').val(`$${contingencyopex.toFixed(2)}`);
            $('#createtool-financial-itemlist-totals-capex').val(`$${totalcapex.toFixed(2)}`);
            $('#createtool-financial-itemlist-totals-opex').val(`$${totalopex.toFixed(2)}`);
            $('#createtool-financial-itemlist-totals-projectcost').val(`$${projectcost.toFixed(2)}`);

        }
    });
}

    // required field events
$('#request-createtool-required-department').click(function(){
    const departmentid = $(this).val();
    ACCUSER.fillSelectTagWithCompanyAccountByDepartment($('#request-createtool-required-requestor'), departmentid);
});

    // save request events
$(document).on('click', '#request-createtool-save', function(e){
    console.log("saving==========================================================");
    const requestid = $('#request-createtool-required-requestid').val();
    const projectid  = $('#request-createtool-required-requestid').attr('prid');
    const name = $('#request-createtool-required-projectname').val();
    const score = $('#request-createtool-required-score').val();
    const description = $('#request-createtool-required-description').val();
    const location1 = $('#request-createtool-required-loc1').val();
    const location2 = $('#request-createtool-required-loc2').val();
    const requestor = $('#request-createtool-required-requestor').val();
    const manager = $('#request-createtool-required-manager').val();
    const sponsor = $('#request-createtool-required-sponsor').val();

    const obj = {
        'requestid' : requestid,
        'projectid' : projectid,
        'name' : name,
        'score' : score,
        'description' : description,
        'location1' : location1,
        'location2' : location2,
        'requestor' : requestor,
        'manager' : manager,
        'sponsor' : sponsor
    }
    
    // console.log("AAAAAAAAAAAAAAAAAAAAAA", score, obj.score);

    let objclone = {
        'requestid' : requestid,
        'projectid' : projectid,
        'name' : name,
        'score' : score,
        'description' : description,
        'location1' : location1,
        'location2' : location2,
        'requestor' : requestor,
        'manager' : manager,
        'sponsor' : sponsor,
    };
    // console.log(objclone.score);
    const objoldvalue = [
        {"ki" : 'name',  "val" : $('#request-createtool-required-projectname').attr("oldvalue")},
        {"ki" : 'score',  "val" : $('#request-createtool-required-score').attr("oldvalue")},
        {"ki" : 'description',  "val" : $('#request-createtool-required-description').attr("oldvalue")},
        {"ki" : 'location1',  "val" : $('#request-createtool-required-loc1').attr("oldvalue")},
        {"ki" : 'location2',  "val" : $('#request-createtool-required-loc2').attr("oldvalue")},
        {"ki" : 'requestor',  "val" : $('#request-createtool-required-requestor').attr("oldvalue")},
        {"ki" : 'manager',  "val" : $('#request-createtool-required-manager').attr("oldvalue")},
        {"ki" : 'sponsor',  "val" : $('#request-createtool-required-sponsor').attr("oldvalue")}
    ]
    const tobj = {
        'requestid' : $('#request-createtool-required-requestid').val(),
        'projectid' : $('#request-createtool-required-requestid').attr('prid'),
        'desc_1' : $('#request-createtool-technical-desc_1').val(),
        'desc_2' : $('#request-createtool-technical-desc_2').val(),
        'desc_3' : $('#request-createtool-technical-desc_3').val(),
        'desc_4_1' : $('#request-createtool-technical-desc_4_1').val(),
        'desc_4_2' : $('#request-createtool-technical-desc_4_2').val(),
        'prior_1' : $('#request-createtool-technical-prior_1').val(),
        'prior_2' : $('#request-createtool-technical-prior_2').val(),
        'prior_3' : $('#request-createtool-technical-prior_3').val(),
        'prior_4' : $('#request-createtool-technical-prior_4').val(),
        'prior_5' : $('#request-createtool-technical-prior_5').val(),
        'prior_6' : $('#request-createtool-technical-prior_6').val(),
        'prior_7' : $('#request-createtool-technical-prior_7').val(),
        'prior_8' : $('#request-createtool-technical-prior_8').val(),
        'strat_1' : $('#request-createtool-technical-strat_1').val(),
        'strat_2' : $('#request-createtool-technical-strat_2').val()
    }
    let tobjclone = {
        'requestid' : $('#request-createtool-required-requestid').val(),
        'projectid' : $('#request-createtool-required-requestid').attr('prid'),
        'desc_1' : $('#request-createtool-technical-desc_1').val(),
        'desc_2' : $('#request-createtool-technical-desc_2').val(),
        'desc_3' : $('#request-createtool-technical-desc_3').val(),
        'desc_4_1' : $('#request-createtool-technical-desc_4_1').val(),
        'desc_4_2' : $('#request-createtool-technical-desc_4_2').val(),
        'prior_1' : $('#request-createtool-technical-prior_1').val(),
        'prior_2' : $('#request-createtool-technical-prior_2').val(),
        'prior_3' : $('#request-createtool-technical-prior_3').val(),
        'prior_4' : $('#request-createtool-technical-prior_4').val(),
        'prior_5' : $('#request-createtool-technical-prior_5').val(),
        'prior_6' : $('#request-createtool-technical-prior_6').val(),
        'prior_7' : $('#request-createtool-technical-prior_7').val(),
        'prior_8' : $('#request-createtool-technical-prior_8').val(),
        'strat_1' : $('#request-createtool-technical-strat_1').val(),
        'strat_2' : $('#request-createtool-technical-strat_2').val()
    };
    const tobjoldvalue = [
        {"ki" : 'desc_1', "val" : $('#request-createtool-technical-desc_1').attr("oldvalue")},
        {"ki" : 'desc_2', "val" : $('#request-createtool-technical-desc_2').attr("oldvalue")},
        {"ki" : 'desc_3', "val" : $('#request-createtool-technical-desc_3').attr("oldvalue")},
        {"ki" : 'desc_4_1', "val" : $('#request-createtool-technical-desc_4_1').attr("oldvalue")},
        {"ki" : 'desc_4_2', "val" : $('#request-createtool-technical-desc_4_2').attr("oldvalue")},
        {"ki" : 'prior_1', "val" : $('#request-createtool-technical-prior_1').attr("oldvalue")},
        {"ki" : 'prior_2', "val" : $('#request-createtool-technical-prior_2').attr("oldvalue")},
        {"ki" : 'prior_3', "val" : $('#request-createtool-technical-prior_3').attr("oldvalue")},
        {"ki" : 'prior_4', "val" : $('#request-createtool-technical-prior_4').attr("oldvalue")},
        {"ki" : 'prior_5', "val" : $('#request-createtool-technical-prior_5').attr("oldvalue")},
        {"ki" : 'prior_6', "val" : $('#request-createtool-technical-prior_6').attr("oldvalue")},
        {"ki" : 'prior_7', "val" : $('#request-createtool-technical-prior_7').attr("oldvalue")},
        {"ki" : 'prior_8', "val" : $('#request-createtool-technical-prior_8').attr("oldvalue")},
        {"ki" : 'strat_1', "val" : $('#request-createtool-technical-strat_1').attr("oldvalue")},
        {"ki" : 'strat_2', "val" : $('#request-createtool-technical-strat_2').attr("oldvalue")}
    ]

    let desc = '';
    let createGate1 = false;
    $.each(objoldvalue, function(key, value){
        if(obj[value.ki] != value.val){
            console.log(obj[value.ki] , value.val, obj[value.ki] != value.val);
            // console.log(`${value.ki} was changed from ${value.val} to ${obj[value.ki]}`);
            desc += `${value.ki} was changed from ${value.val} to ${obj[value.ki]}, `;
            objclone[value.ki] = value.val;
            createGate1 = true;
        }
    });

    let tdesc = '';
    let createGate2 = false;
    $.each(tobjoldvalue, function(key, value){
        if(tobj[value.ki] != value.val){
            let tloc = '';
            let tn = '';

            if(value.ki.includes("desc")){
                tloc = `Description`;
            }if(value.ki.includes("prior")){
                tloc = `Prioritization`;
            }if(value.ki.includes("strat")){
                tloc = `Strategy`;
            }

            if(value.ki == "desc_1"){
                tn = "Background";
            }else if(value.ki == "desc_2"){
                tn = "Project Objectives";
            }else if(value.ki == "desc_3"){
                tn = "Project Alternatives";
            }else if(value.ki == "desc_3"){
                tn = "Project Scope";
            }else if(value.ki == "prior_1"){
                tn = "Quality";
            }else if(value.ki == "prior_2"){
                tn = "Financials";
            }else if(value.ki == "prior_3"){
                tn = "Conpliance";
            }else if(value.ki == "prior_4"){
                tn = "Continuity Risk";
            }else if(value.ki == "prior_5"){
                tn = "Profitability";
            }else if(value.ki == "prior_6"){
                tn = "Assumptions";
            }else if(value.ki == "prior_7"){
                tn = "Risks";
            }else if(value.ki == "prior_8"){
                tn = "Site Resources";
            }else if(value.ki == "strat_1"){
                tn = "Strategy 1";
            }else if(value.ki == "strat_2"){
                tn = "Close out Requirements";
            }



            tdesc += `${tloc} > ${tn} > was changed from ${value.val} to ${tobj[value.ki]}, `;
            
            tobjclone[value.ki] = value.val;
            createGate2 = true;
        }
    });
    
    console.log(obj,'======================================///////////////////////////////');

    if(obj.manager != "" && obj.manager != undefined && obj.manager != null){
        const cb1 =()=>{

        };
        ACCUSER.getProject(obj.projectid).updateOwner({"projectid" : obj.projectid, "ownerid" : obj.manager}, cb1); // update project manager if set
    }

    if(createGate1 && createGate2){
        const callback=()=>{
            const callback=()=>{
                saveRequestTechAdd(()=>{}); // save and update dynamic technical fields
            };
            ACCUSER.getProject(tobj.projectid).Request.createTech(tobj, callback); // save and update default technical fields
        };
        ACCUSER.getProject(obj.projectid).Request.create(obj, callback); // save and update required fields
    }else if(createGate1 && !createGate2){
        const callback=()=>{
            saveRequestTechAdd(()=>{}); // save and update dynamic technical fields
        };
        ACCUSER.getProject(obj.projectid).Request.create(obj, callback); // save and update required fields
    }else if(!createGate1 && createGate2){
        const callback=()=>{
            saveRequestTechAdd(()=>{}); // save and update dynamic technical fields
        };
        ACCUSER.getProject(tobj.projectid).Request.createTech(tobj, callback); // save and update default technical fields
    }else if(!createGate1 && !createGate2){
        saveRequestTechAdd(()=>{}); // save and update dynamic technical fields
    }

    let x = ACCUSER.getProject(projectid).Request.isLocked();
    // console.log("HOMAGHAAAAA", x);

    if(createGate1){
        const options = {
            "id" : rngProjectRequestLocker(),
            "projectid" : objclone.projectid,
            "api" : "Request.create",
            "parameter" : JSON.stringify(objclone),
            "type" : 'technical',
            "operation" : "update",
            "description" : `Technical > Required > ${desc}`,
        }
        if(x && (!desc.includes("score") ) ){
            const callback=()=>{
                console.log(options);
            }
            ACCUSER.getProject(objclone.projectid).Request.createLock(options, callback);
        }
        

    }

    if(createGate2){
        const options = {
            "id" : rngProjectRequestLocker(),
            "projectid" : tobjclone.projectid,
            "api" : "Request.createTech",
            "parameter" : JSON.stringify(tobjclone),
            "type" : 'technical',
            "operation" : "update",
            "description" : `Technical > ${tdesc} `,
        }
        console.log(options);

        if(x){
            const callback=()=>{
                console.log(options);
            }
            ACCUSER.getProject(objclone.projectid).Request.createLock(options, callback);
        }
    }

    $('#build-body-action-build').trigger('click');
    

});
    // request lock events
$('.request-createtool-header-lock').click(function(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const status = $(this).attr('status');

    const cbtrue=()=>{
        const cbok=()=>{
            // update Lock
            if(status == "locked"){
                console.log("update lockstatus to unlocked : 0");
                
                const callback=()=>{
                    const cbtrue=()=>{
                        ACCUSER.getProject(projectid).Request.deleteAllLock({"projectid" : projectid}, ()=>{console.log("Delete all logs.");});
                    };
                    const cbfalse=()=>{
                        console.log("Cancelled.");
                    };
                    showAction("Would you like to delete all logs? ", cbtrue, cbfalse);
                    setRequestToolLock();
                };
                ACCUSER.getProject(projectid).Request.updateLockStatus({"projectid": projectid, "lockstatus" : "0"}, callback);
            }else{
                console.log("update lockstatus to locked : 1");
                const callback=()=>{
                    const cbtrue=()=>{
                        ACCUSER.getProject(projectid).Request.deleteAllLock({"projectid" : projectid}, ()=>{console.log("Delete all logs.");});
                    };
                    const cbfalse=()=>{
                        console.log("Cancelled.");
                    };
                    showAction("Would you like to delete all logs as well? ", cbtrue, cbfalse);
                    setRequestToolLock();
                };
                ACCUSER.getProject(projectid).Request.updateLockStatus({"projectid": projectid, "lockstatus" : "1"}, callback);
            }
        };
        const cberror=()=>{
            showNotification("Credentials Verification", "Failed to verify credentials! Please try again.");
        };
        showValidate(cbok, cberror);
    };
    const cbfalse=()=>{
        console.log("Cancelled.");
    };
    showAction(status == "unlocked" ? "You will need to verify your account before locking the Request." : "You will need to verify your account before unlocking the Request.", cbtrue, cbfalse);

});
    // request lock revert events
$(document).on('click', '.createtool-review-technical-widget-revert', function(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const selector = $(this).parent('.createtool-review-technical-widget');
    const callback=()=>{
        fillRequestTool(projectid);
    }
    revertLockChanges(selector, callback);
});
    
    // request scoring events
$(document).on('mouseover', '.request-createtool-technical-con-scoring-star', function(){
    const gate = $(this).parent('.request-createtool-technical-con-scoring').hasClass('active');
    if(gate){
        const star = $(this).attr('star');
        $(this).siblings(`.request-createtool-technical-con-scoring-star`).removeClass('fas').addClass('far');
        const ss = parseInt(star);
        for(i=1; i<=ss; i++){
            // console.log(i, ss);
            $(this).siblings(`.request-createtool-technical-con-scoring-star.star${i}`).removeClass('far').addClass('fas');
            $(this).removeClass('far').addClass('fas');
        }
    }
});
$(document).on('mouseout', '.request-createtool-technical-con-scoring', function(){
    const gate = $(this).hasClass('active');
    if(gate){
        const value = $(this).attr('vvv');
        $(this).children(`.request-createtool-technical-con-scoring-star`).removeClass('fas').addClass('far');
        // $(this).removeClass('fas').addClass('far');
        for(i=1; i<=parseInt(value); i++){
            // console.log(i, ss);
            $(this).children(`.request-createtool-technical-con-scoring-star.star${i}`).removeClass('far').addClass('fas');
        }
    }
});

$(document).on('click', '.request-createtool-technical-con-scoring-star', function(){
    const gate = $(this).parent('.request-createtool-technical-con-scoring').hasClass('active');
    // const reqid = $(this).parent('.request-createtool-technical-con-scoring').attr('reqid');
    // const prid = $(this).parent('.request-createtool-technical-con-scoring').attr('prid');
    // const link = $(this).parent('.request-createtool-technical-con-scoring').attr('link');
    // let star = $(this).attr('star');

    const options = {
        "requestid" : $(this).parent('.request-createtool-technical-con-scoring').attr('reqid'),
        "projectid" : $(this).parent('.request-createtool-technical-con-scoring').attr('prid'),
        "columnname" : $(this).parent('.request-createtool-technical-con-scoring').attr('link'),
        "value" : $(this).attr('star')
    }
    
    if(gate){
        if(options.columnname.split('+')[0] == "add"){
            const addoptions = {
                'id' : options.columnname.split('+').pop(),
                'requestid' : options.requestid,
                'projectid' : options.projectid,
                'score' : options.value
            }
            // console.log(addoptions);
            const callback =()=>{
                console.log('updated');
                $(this).parent('.request-createtool-technical-con-scoring').attr('vvv', addoptions.score);
                const prscore = ACCUSER.getProject(options.projectid).Request.getProjectScore();
                $('#request-createtool-required-score').val(prscore);
            }
            ACCUSER.getProject(options.projectid).Request.createScoreAdd(addoptions, callback);
        }else{
            const callback =()=>{
                console.log('updated');
                $(this).parent('.request-createtool-technical-con-scoring').attr('vvv', options.value);
                const prscore = ACCUSER.getProject(options.projectid).Request.getProjectScore();
                $('#request-createtool-required-score').val(prscore);
            }
            ACCUSER.getProject(options.projectid).Request.createScore(options, callback);
        }
    }

});


    
    // build project events
$('#build-body-action-build').click(function(){
    // const prname = $('.build-body').children('.build-body-header').children('.projectname').attr('prname');
    const prid = $('.build-body').children('.build-body-header').children('.projectid').attr('prid');
    const reqid = rngProjectRequestId();
    $('#request-createtool-required-requestid').attr('prid', prid).val(reqid).attr('reqid', reqid);
    

        // fetch Schedule Data
    
    const callback=data=>{
        console.log(data);
        const callback=data=>{
            console.log(data);
            const callback=data=>{
                console.log(data);
                fillRequestTool(prid);
            }
            ACCUSER.getProject(prid).checkList("Request", callback);
        }
        ACCUSER.getProject(prid).checkList("Prerequest", callback);
    }
    ACCUSER.getProject(prid).checkList("ScheduleDocument", callback);

});
$('#build-body-action-reset').click(function(){
    // $('.request-createtool-con').css('display', 'flex').show();
    const cbtrue = ()=>{
        console.log('RESET');
    };
    const cbfalse = ()=>{
        console.log('CANCELLED');
    };
    showValidate(cbtrue, cbfalse);
});
$('#build-body-action-delete').click(function(){
    const cbtrue = ()=>{
        console.log('DELETE');
    };
    const cbfalse = ()=>{
        console.log('CANCELLED');
    };
    showValidate(cbtrue, cbfalse);
});
$(document).on('click', '.build-projectlist-widget', function(){
    const prid = $(this).attr('prid');
    const prname = $(this).attr('prname');
    const crid = $(this).attr('crid');
    const ownerid = $(this).attr('ownerid');
    const isOwner = $(this).attr('owner');
    
    
    $('.build-body').children('.build-body-header').attr('owner', isOwner).empty().append(`
        <span class="projectname" prname="${prname}">${prname}<span class="owner" title="Project Manager">PM: ${ownerid}</span></span>
        <span class="projectid" prid="${prid}">${prid}<span class="creator" title="Project Creator">RQ: ${crid}</span></span>
    `);
    $('.build-body').css('display', 'flex').show();

    showRefreshReport('Loading...');
    setTimeout(() => {
        const callback1 =data=>{
            console.log(data);
            const callback2 =data=>{
                console.log(data);
                const callback =data=>{
                    console.log(data);
                    const callback =data=>{
                        console.log(data);
                        // hideReloadReport();
                        $('.build-body').children('.build-body-header').attr('owner', isOwner).empty().append(`
                            <span class="projectname" prname="${prname}">${prname}<span class="owner" title="Project Manager">PM: ${ownerid}</span></span>
                            <span class="projectid" prid="${prid}">${prid}<span class="creator" title="Project Creator">RQ: ${crid}</span></span>
                        `);
                        $('.build-body').css('display', 'flex').show();
                    };
                    ACCUSER.getProject(prid).checkList('Budget', callback);
                };
                ACCUSER.getProject(prid).checkList('Request', callback); 
            };
            ACCUSER.getProject(prid).checkList('TaskResource', callback2); 
        };
        ACCUSER.getProject(prid).checkList('Task', callback1); 
    }, 0);
    setTimeout(() => {
        hideRefreshReport();
    }, 0);
});

$(document).on('click', '.crtitle', function(e){
    const i = $(this).children('i');
    let type;
    if($(this).hasClass('crtitle-forecast-year')){
        type = $(this).parent('.createtool-subtitle').siblings('.header').children('.fill.type').children('select').val();
        $(this).siblings('.createtool-budget-forecast-year').children('.createtool-budget-forecast-year-widget').removeClass('hidden').addClass('hidden').hide();
    }

    if(i.hasClass('fa-caret-left')){
        // its closed
        if(e.target.tagName == "INPUT"){
            if($(e.target).attr('status') != 'done'){
                return;
            }
        }
        if($(this).hasClass('crtitle-forecast-year')){
            $(this).siblings('.content').children(`.calendar-${type}`).removeClass('hidden').show();
        }
        $(this).css({"border-top-left-radius" : "15px"});
        $(this).siblings('.content').css('display','flex').show();
        i.removeClass('fa-caret-left').addClass('fa-caret-down');
        $(this).children('input').prop('disabled', true).attr('status', 'done');
    }else{
        // its open
        $(this).css({"border-top-left-radius" : "0px"});
        $(this).siblings('.content').css('display','none').hide();
        i.removeClass('fa-caret-down').addClass('fa-caret-left');
        // $(this).children('input').prop('disabled', false);
    }
});
$(document).on('click', '.crtitle-forecast-year', function(e){
    // console.log('test');
    // const i = $(this).children('i');
    // const type = $(this).parent('.createtool-subtitle').siblings('.header').children('.fill.type').children('select').val();
    // $(this).siblings('.createtool-budget-forecast-year').children('.createtool-budget-forecast-year-widget').removeClass('hidden').addClass('hidden').hide();
    // if(!i.hasClass('fa-caret-left')){
    //     // its closed
    //     console.log(type);
    //     $(this).siblings('.content').children(`.calendar-${type}`).removeClass('hidden').show();
        
    // }
});

    // navigation events
$(document).on('click', '.request-createtool-header-w', function(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    let lock = ACCUSER.getProject(projectid).Request.isLocked();
    const id = $(this).attr('id');
    $('.request-createtool-header').children('.request-createtool-header-w').each(function(){
        $(this).removeClass('active').addClass('idle');
        $(this).css("background-color", "grey");
        
    });
    $(this).removeClass('idle').addClass('active');
    $('.createtool-container').css('display', 'none').hide();
    $('.request-createtool-required').css('display', 'none').hide();

    if(id.includes('technical')){
        $('.request-createtool-technical-con').css('display', 'flex').show();
        $('.request-createtool-required').css('display', 'flex').show();
    }else if(id.includes('financial')){
        const projectid = $('#request-createtool-required-requestid').attr('prid');
        const callback=()=>{
            const callback1=()=>{
                const callback1=()=>{
                    const callback1=()=>{
                        const callback1=()=>{
                            setTimeout(() => {
                                fillRequestToolFinancial();
                                $('.request-createtool-financial-con').css('display', 'flex').show();
                                $('.request-createtool-required').css('display', 'none').hide();
                            }, 0);
                        }
                        ACCUSER.getProject(projectid).checkList("Item", callback1);
                    }
                    ACCUSER.getProject(projectid).checkList("TaskResource", callback1);
                }
                ACCUSER.getProject(projectid).checkList("Task", callback1);
            }
            ACCUSER.getProject(projectid).checkList("TmpSupplier", callback1);
        }
        ACCUSER.getProject(projectid).checkList("TmpAccount", callback);
    }else if(id.includes('budget')){
        // $('.request-createtool-budget-con').css('display', 'flex').show();

        const projectid = $('#request-createtool-required-requestid').attr('prid');
        const callback=()=>{
            const callback1=()=>{
                const callback1=()=>{
                    const callback1=()=>{
                        const callback1=()=>{
                            $('.request-createtool-budget-con').css('display', 'flex').show();
                            $('.request-createtool-required').css('display', 'none').hide();
                            setTimeout(() => {
                                fillCreateToolBudgeting();
                                fillBudgetingDashboard();
                                fillOpexForecast();
                                fillCapexForecast();
                            }, 0);
                        }
                        ACCUSER.getProject(projectid).checkList("Item", callback1);
                    }
                    ACCUSER.getProject(projectid).checkList("TaskResource", callback1);
                }
                ACCUSER.getProject(projectid).checkList("Task", callback1);
            }
            ACCUSER.getProject(projectid).checkList("TmpSupplier", callback1);
        }
        ACCUSER.getProject(projectid).checkList("TmpAccount", callback);
    }else if(id.includes('schedule')){
        const projectid = $('#request-createtool-required-requestid').attr('prid');
        const callback=()=>{
            const callback1=()=>{
                const callback1=()=>{
                    const callback1=()=>{
                        $('.request-createtool-schedule-con').css('display', 'flex').show();
                        $('.request-createtool-required').css('display', 'none').hide();
                        fillPreqTasklist(projectid);
                    }
                    ACCUSER.getProject(projectid).checkList("TaskResource", callback1);
                }
                ACCUSER.getProject(projectid).checkList("Task", callback1);
            }
            ACCUSER.getProject(projectid).checkList("TmpSupplier", callback1);
        }
        ACCUSER.getProject(projectid).checkList("TmpAccount", callback);

    }else if(id.includes('review')){
        $('.request-createtool-review-con').css('display', 'flex').show();
        $('.request-createtool-required').css('display', 'none').hide();


        // const projectid = $('#request-createtool-required-requestid').attr('prid');
        // const callback=()=>{
        //     const callback1=()=>{
        //         const callback1=()=>{
        //             const callback1=()=>{
        //                 $('.request-createtool-review-con').css('display', 'flex').show();
        //                 $('.request-createtool-required').css('display', 'none').hide();
        //             }
        //             ACCUSER.getProject(projectid).checkList("TaskResource", callback1);
        //         }
        //         ACCUSER.getProject(projectid).checkList("Task", callback1);
        //     }
        //     ACCUSER.getProject(projectid).checkList("TmpSupplier", callback1);
        // }
        // ACCUSER.getProject(projectid).checkList("TmpAccount", callback);
    }

    if(lock != "0" && lock != undefined){
        $(this).css("background-color", RED_PALETTE);
    }else{
        $(this).css("background-color", SUB_COLOR);
    }


});
$(document).on('click', '.request-createtool-header-close', function(){
    $('.request-createtool-con').hide();
});
$(document).on('click', '.request-createtool-con', function(e){
    if(e.target != this){
        return;
    }else{
        $(this).hide();
    }
});

$(document).on('click', '#createtool-add-d', function(){
    const h =`
        <div class="createtool-subtitle dynamic d">
            <span class="crtitle btn-shadow"><input type="text" placeholder="Subject" value="Custom Subject" ><i class="fas fa-caret-left"></i></span>
            <div class="content">
                <span class="instruction">Instruction: Add Custom Parameter</span>
                <textarea class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
            </div>
        </div>
    `;
    $('.createtool-maintitle.d').children('.content').prepend(h);
});
$(document).on('click', '#createtool-add-p', function(e){
    const h =`
        <div class="createtool-subtitle dynamic p">
            <span class="crtitle btn-shadow"><input type="text" placeholder="Subject" value="Custom Subject" ><i class="fas fa-caret-left"></i></span>
            <div class="content">
                <span class="instruction">Instruction: Add Custom Parameter</span>
                <textarea class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
            </div>
        </div>
    `;
    $('.createtool-maintitle.p').children('.content').prepend(h);
});
$(document).on('click', '#createtool-add-s', function(e){
    const h =`
        <div class="createtool-subtitle dynamic s">
            <span class="crtitle btn-shadow"><input type="text" placeholder="Subject" value="Custom Subject" ><i class="fas fa-caret-left"></i></span>
            <div class="content">
                <span class="instruction">Instruction: Add Custom Parameter</span>
                <textarea class="halfw" maxlength="500" placeholder="500 Characters Maximum"></textarea>
            </div>
        </div>
    `;
    $('.createtool-maintitle.s').children('.content').prepend(h);
});

    // add rows events
$(document).on('click', '#createtool-financial-preqlist-add', function(){
    $('.createtool-financial-preqlist-body').append(`
        <div class="createtool-financial-preqlist-widget">
            <input class="item" type="text" placeholder="Item / Document">
            <select>
                <option value="na" selected disabled>Select One</option>
                <option value="approved">Approved</option>
                <option value="approval">Under Approval</option>
                <option value="notapproved">Not Approved</option>
            </select>
            <input class="doc" type="text" placeholder="Doc #">
            <textarea maxlength="200" placeholder="200 Chars Maximum"></textarea>
            <div class="action">
                <i class="fas fa-save createtool-financial-preqlist-widget-save"></i>
            </div>
        </div>
    `);
});
// $(document).on('click', '#createtool-financial-itemlist-add', function(){
//     $('.createtool-financial-itemlist-body').append(`
//         <div class="createtool-financial-itemlist-widget">
//             <input type="text" placeholder="Item Name">
//             <input type="text" placeholder="$">
//             <input type="text" placeholder="$">
//             <input type="text" placeholder="Vendor">
//             <input type="text" placeholder="Costing Available">
//         </div>
//     `);
// });
$(document).on('click', '#createtool-budget-itemlist-addrow', function(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const catlist = ACCUSER.getProject(projectid).Item.getCategory();
    const itemlist = ACCUSER.getProject(projectid).Item.getItem();
    const bid = rngBudgetDashboardUploadId();
    let cathtml = '';
    let itemhtml = '';

    $.each(catlist, function(key, value){
        if(value.id != undefined){
            cathtml += `<option value="${value.id}">${value.name}</option>`;
        }
    });
    console.log(itemlist);
    $.each(itemlist, function(key, value){
        console.log(value.categoryid, catlist[0].id);
        if(value.categoryid == catlist[0].id){
            itemhtml += `<option value="${value.id}">${value.name}</option>`;
        }
    });

   

    $('.createtool-budget-itemlist-body').append(`
        <div class="createtool-budget-itemlist-widget">
            <select class="budget-itemlist-widget-itemcategory">
                ${cathtml}
            </select>
            <select class="budget-itemlist-widget-item">
                ${itemhtml}
            </select>
            <select  class="budget-itemlist-widget-category">
                <option value="hours">Internal</option>
                <option value="supplier">Supplier (Lumpsum)</option>
                <option value="tm">Supplier (T&M)</option>
            </select>
            <input class="budget-itemlist-widget-capex" type="text" placeholder="$" disabled>
            <input class="budget-itemlist-widget-opex" type="text" placeholder="$">
            <select class="budget-itemlist-widget-vendor" disabled>
                
            </select>
            <input class="budget-itemlist-widget-costing" type="text" placeholder="Costing" disabled>
            <div>
                <i class="fas fa-coins popup-widget-upload-costing" style="display: none;"  bid="${bid}" title="Generate Costing"></i>
                <i class="fas fa-save budget-itemlist-widget-save" title="save"></i>
            </div>
        </div>
    `);
});
$(document).on('click', '#createtool-budget-opexforecast-add', function(){
    const bid = rngBudgetDashboardUploadId();
    $('.createtool-budget-forecast-con').prepend(`
        <div class="createtool-subtitle">
            <span class="crtitle crtitle-forecast-year btn-shadow"><input type="text"><i class="fas fa-caret-left"></i></span>
            <div class="content createtool-budget-forecast-year">
                <div class="createtool-budget-forecast-year-widget calendar-monthly hidden">
                    <div class="widget jan">
                        <span class="title">January</span>
                        <input type="text" placeholder="$">
                    </div>
                    <div class="widget feb">
                        <span class="title">February</span>
                        <input type="text" placeholder="$">
                    </div>
                    <div class="widget mar">
                        <span class="title">March</span>
                        <input type="text" placeholder="$">
                    </div>
                    <div class="widget apr">
                        <span class="title">April</span>
                        <input type="text" placeholder="$">
                    </div>
                    <div class="widget may">
                        <span class="title">May</span>
                        <input type="text" placeholder="$">
                    </div>
                    <div class="widget jun">
                        <span class="title">June</span>
                        <input type="text" placeholder="$">
                    </div>
                    <div class="widget jul">
                        <span class="title">July</span>
                        <input type="text" placeholder="$">
                    </div>
                    <div class="widget aug">
                        <span class="title">August</span>
                        <input type="text" placeholder="$">
                    </div>
                    <div class="widget sep">
                        <span class="title">September</span>
                        <input type="text" placeholder="$">
                    </div>
                    <div class="widget oct">
                        <span class="title">October</span>
                        <input type="text" placeholder="$">
                    </div>
                    <div class="widget nov">
                        <span class="title">November</span>
                        <input type="text" placeholder="$">
                    </div>
                    <div class="widget dec">
                        <span class="title">December</span>
                        <input type="text" placeholder="$">
                    </div>
                </div>
                <div class="createtool-budget-forecast-year-widget calendar-trimester hidden">
                    <div class="widget t1">
                    <span class="title">T1</span>
                    <input type="text" placeholder="$">
                    </div>
                    <div class="widget t2">
                    <span class="title">T2</span>
                    <input type="text" placeholder="$">
                    </div>
                    <div class="widget t3">
                    <span class="title">T3</span>
                    <input type="text" placeholder="$">
                    </div>
                </div>
                <div class="createtool-budget-forecast-year-widget calendar-quarter">
                    <div class="widget q1">
                    <span class="title">Q1</span>
                    <input type="text" placeholder="$">
                    </div>
                    <div class="widget q2">
                    <span class="title">Q2</span>
                    <input type="text" placeholder="$">
                    </div>
                    <div class="widget q3">
                    <span class="title">Q3</span>
                    <input type="text" placeholder="$">
                    </div>
                    <div class="widget q4">
                    <span class="title">Q4</span>
                    <input type="text" placeholder="$">
                    </div>
                </div>
            </div>
        </div>
    `);

});



// REQUEST CREATETOOL FINANCIAL TAB
$('#request-createtool-header-financial').click(function(){
    fillCreateToolFinancialPrereq();
});
function fillCreateToolFinancialPrereq(){
    const obj = ACCUSER.getProject($('#request-createtool-required-requestid').attr('prid')).Prerequest.getObj();
    $('.createtool-financial-preqlist-body').empty();
    $.each(obj, function(key, value){
        $('.createtool-financial-preqlist-body').append(`
            <div class="createtool-financial-preqlist-widget">
                <input class="item" type="text" placeholder="Item / Document" value="${value.name}" disabled>
                <select>
                    <option value="approved" ${value.status == "approved" ? "selected" : ""}>Approved</option>
                    <option value="approval" ${value.status == "approval" ? "selected" : ""}>Under Approval</option>
                    <option value="notapproved" ${value.status == "notapproved" ? "selected" : ""}>Not Approved</option>
                </select>
                <input class="doc" type="text" placeholder="Doc #" value="${value.docnum}" disabled>
                <textarea maxlength="200" placeholder="200 Chars Maximum">${value.comments}</textarea>
                <div pid="${value.id}" class="action">
                    <i class="fas fa-save createtool-financial-preqlist-widget-edit"></i>
                    <i class="fas fa-trash createtool-financial-preqlist-widget-delete"></i>
                </div>
            </div>
        `);
    });
}

$(document).on('click', '.createtool-financial-preqlist-widget-save', function(){
    const options = {
        'id' : rngProjectPrereqId(),
        'projectid' : $('#request-createtool-required-requestid').attr('prid'),
        'name' : $(this).parent('.action').siblings('input.item').val(),
        'status' : $(this).parent('.action').siblings('select').val(),
        'docnum' : $(this).parent('.action').siblings('input.doc').val(),
        'comments' : $(this).parent('.action').siblings('textarea').val()
    }
    let gate = true;
    if(options.name == ""){
        gate = false;
        blinkbg($(this).parent('.action').siblings('input.item'), RED_PALETTE, 'white');
    }
    if(options.status == "na" || options.status == null){
        gate = false;
        blinkbg($(this).parent('.action').siblings('select'), RED_PALETTE, 'white');
    }
    if(options.docnum == ""){
        gate = false;
        blinkbg($(this).parent('.action').siblings('input.doc'), RED_PALETTE, 'white');
    }
    if(options.comments == ""){
        gate = false;
        blinkbg($(this).parent('.action').siblings('textarea'), RED_PALETTE, 'white');
    }
    console.log(options);

    if(gate){
        const prrq = ACCUSER.getProject(options.projectid).Prerequest;
        console.log(prrq);
        const callback =()=>{
            // console.log('awesomely created');
            fillCreateToolFinancialPrereq();
        }
        prrq.create(options, callback);
    }
});
$(document).on('click', '.createtool-financial-preqlist-widget-edit', function(){
    const options = {
        'id' :  $(this).parent('.action').attr('pid'),
        'name' : $(this).parent('.action').siblings('input.item').val(),
        'status' : $(this).parent('.action').siblings('select').val(),
        'docnum' : $(this).parent('.action').siblings('input.doc').val(),
        'comments' : $(this).parent('.action').siblings('textarea').val()
    }
    let gate = true;
    if(options.name == ""){
        gate = false;
        blinkbg($(this).parent('.action').siblings('input.item'), RED_PALETTE, 'white');
    }
    if(options.status == "na" || options.status == null){
        gate = false;
        blinkbg($(this).parent('.action').siblings('select'), RED_PALETTE, 'white');
    }
    if(options.docnum == ""){
        gate = false;
        blinkbg($(this).parent('.action').siblings('input.doc'), RED_PALETTE, 'white');
    }
    if(options.comments == ""){
        gate = false;
        blinkbg($(this).parent('.action').siblings('textarea'), RED_PALETTE, 'white');
    }
    console.log(options);

    if(gate){
        const prrq = ACCUSER.getProject($('#request-createtool-required-requestid').attr('prid')).Prerequest;
        console.log(prrq);
        const callback =()=>{
            fillCreateToolFinancialPrereq();
        }
        prrq.update(options, callback);
    }
});
$(document).on('click', '.createtool-financial-preqlist-widget-delete', function(){
    const id = $(this).parent('.action').attr('pid');
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    callback =()=>{
        fillCreateToolFinancialPrereq();
    }
    ACCUSER.getProject(projectid).Prerequest.delete({"id" : id}, callback);
});
$(document).on('keyup', '#createtool-financial-itemlist-totals-contingency', function(){
    // const projectid = $('#request-createtool-required-requestid').attr('prid');
    // const v = $(this).val();
    fillRequestToolFinancial();
});




// REQUEST CREATETOOL BUDGETING TAB
function popup_widget_upload(e){
    console.log('test');
    // const bid = e.attr('bid');
    // console.log(bid);
    $(document).off('change', `#popup-widget-upload-hiddeninput`); 
    $(document).on('change', `#popup-widget-upload-hiddeninput`, function(){
        // console.log($(this).val().split('\\').pop());
        let vfile = $(this).val().split('\\').pop();
        const filename = vfile.split('.')[0];
        let extension = filename.split('.').pop();
        
        // console.log(filename);
        
        if(filename){
            // console.log(filename, extension);
            $('#popup-widget-upload-filename').val(filename);
            $('#popup-widget-upload-submit').show();
            $('#popup-widget-upload-view').hide();
        }else{
            console.log('cancelled');
        }
    });

    
    // $('.request-createtool-con').children('.popup').css('display', 'flex').show();
    // $('.request-createtool-con').children('.popup').children('.popup-widget-upload').css('display', 'flex').show();
}
function fillCreateToolBudgeting(){
    fillCreateToolBudgetingOpexDashboard();

}
function fillCreateToolBudgetingOpexDashboard(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    // const isOwner = $('.build-body').children('.build-body-header').attr("owner");
    const isOwner = $('#request-createtool-required-requestid').attr('sender');

    const trobj = ACCUSER.getProject(projectid).TaskResource.getDistinctIdList();
    // console.log(trobj);
    $('.createtool-opex-itemlist-body').empty();
    let totalhours = 0;
    let totalrate = 0;
    let totalAmount = 0;
    $.each(trobj, function(key, value){
        if(value.id.split('-')[0] == 'TA'){
            const accobj = ACCUSER.getProject(projectid).getTmpAccountObj(value.id);
            const hours = ACCUSER.getProject(projectid).TaskResource.getAccidAllotedHoursByProjectid({"accid" : value.id});
            const rate = 0;
            const amt = (parseFloat(accobj.rate) != undefined ? parseFloat(accobj.rate) : 0) * (parseFloat(hours) != undefined ? parseFloat(hours) : 0) ;
            // console.log(accobj, hours);
            // console.log(isOwner);
            let isOwnerhtml = isOwner == "viewer" ? '<i class="fas fa-ban"></i>' : `<i class="fas fa-save createtool-opex-itemlist-widget-save" aid="${value.id}"></i>`;
            // console.log(isOwnerhtml);
            const html = `<div class="createtool-opex-itemlist-widget">
                <input class="name" type="text" placeholder="Team Member Name" value="${accobj.name}" disabled>
                <input class="role" type="text" placeholder="Role" value="${accobj.role == undefined ? "" : accobj.role}">
                <input class="hours" type="text" placeholder="Alloted Hours" value="${hours}" disabled>
                <input class="rate" type="text" placeholder="Rate $/hr" value="${accobj.rate == undefined ? "" : accobj.rate}">
                <input class="total" type="text" placeholder="$" value="${amt}" disabled>
                ${isOwnerhtml}
            </div>`;
            $('.createtool-opex-itemlist-body').append(html);
            totalhours += isNaN(parseFloat(hours)) ? 0 : parseFloat(hours);
            totalrate += isNaN(parseFloat(accobj.rate)) ? 0 : parseFloat(accobj.rate);
            totalAmount += ((isNaN(parseFloat(hours)) ? 0 : parseFloat(hours)) * (isNaN(parseFloat(accobj.rate)) ? 0 : parseFloat(accobj.rate)));
            console.log(totalAmount);

        }
    });
    const html = `<div class="createtool-opex-itemlist-widget">
        <input class="createtool-opex-itemlist-widget-total-name" type="text" placeholder="Team Member Name" value="TOTALS" disabled>
        <input class="createtool-opex-itemlist-widget-total-role" type="text" placeholder="" disabled>
        <input class="createtool-opex-itemlist-widget-total-hours" type="text" placeholder="Alloted Hours" value="${totalhours}" disabled>
        <input class="createtool-opex-itemlist-widget-total-rate" type="text" placeholder="Rate $/hr" value="${totalrate}" disabled>
        <input class="createtool-opex-itemlist-widget-total-total" type="text" placeholder="$" value="$${totalAmount}" disabled>
        <i></i>
    </div>`;
    $('.createtool-opex-itemlist-body').append(html);
}
function fillCreateToolBudgetingOpexDashboardTotals(){
    let rate = 0;
    let total = 0;
    $('.createtool-opex-itemlist-body').children('.createtool-opex-itemlist-widget').each(function(){
        const zrate = $(this).children('.createtool-opex-itemlist-widget-rate').val();
        const ztotal = $(this).children('.createtool-opex-itemlist-widget-total').attr("amt");
        
        rate += isNaN(parseFloat(zrate)) ? 0 : parseFloat(zrate);
        total += isNaN(parseFloat(ztotal)) ? 0 : parseFloat(ztotal);
    });
    $('.createtool-opex-itemlist-widget-total-rate').val(`$${rate}`).attr('amt', rate);
    $('.createtool-opex-itemlist-widget-total-total').val(`$${total}`).attr('amt', total);
}
function fillAdditemCategoryCon(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');

    // const itemlist = ACCUSER.getProject(projectid).Item.getItem();
    const catlist = ACCUSER.getProject(projectid).Item.getCategory();
    console.log(catlist);
    
    $('.popup-budget-itemadd-form-itemlist').hide();
    $('.popup-budget-itemadd-form-catlist-widget-con').empty();
    $.each(catlist, function(key, value){
        if(value.id != undefined){
            $('.popup-budget-itemadd-form-catlist-widget-con').append(`
                <span cid="${value.id}" class="popup-budget-itemadd-form-catlist-widget btn-shadow">${value.name}<i class="fas fa-trash"></i></span>
            `);
        }
    });
}
function fillAddItemCon(cid){
    const projectid = $('#request-createtool-required-requestid').attr('prid');

    const itemlist = ACCUSER.getProject(projectid).Item.getItem();
    $('.popup-budget-itemadd-form-itemlist-widget-con').empty();
    $.each(itemlist, function(key, value){
        if(value.id != undefined){
            if(value.categoryid == cid){
                $('.popup-budget-itemadd-form-itemlist-widget-con').append(`
                    <span iid="${value.id}" class="popup-budget-itemadd-form-itemlist-widget btn-shadow">${value.name} - ${value.code}<i class="fas fa-trash"></i></span>
                `);
            }
        }
    });
}
function fillBudgetingDashboard(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const isOwner = $('#request-createtool-required-requestid').attr('sender');
    // console.log(projectid   );
    const obj = ACCUSER.getProject(projectid).Budget.getObj();
    $('.createtool-budget-itemlist-body').empty();
    if(obj.length > 0){
        $.each(obj, function(key, value){
            let costing = 0;
            if(value.type != undefined){
                
                if(value.type == "tm"){
                    const matobj = ACCUSER.getProject(projectid).Budget.getMaterialCostByBudgetId(value.id);
                    const manobj = ACCUSER.getProject(projectid).Budget.getManhourCostByBudgetId(value.id);
                    costing = matobj + manobj;
                }else if(value.type == "supplier"){
                    costing = value.capexcost;
                }else if(value.type == "hours"){
                    costing = value.opexcost;
                }
    
                // console.log('value.itemid',value.itemid);ss
    
                const itemobj = ACCUSER.getProject(projectid).Item.getItemObj(value.itemid);
                // console.log('itemobj', itemobj);
                const itemcatobj = ACCUSER.getProject(projectid).Item.getCategoryObj(itemobj.categoryid);
                // console.log('itemcatobj', itemcatobj);
                const vendorobj = ACCUSER.getProject(projectid).getTmpSupplierObj(value.vendor);
                let iconHtml = isOwner == "viewer" ? `<div class="action">
                    ${value.type == "hours" ? "" : `<i vendorname="${vendorobj.name}" vendor="${vendorobj.id}" itemname="${itemobj.name}" class="fas fa-coins popup-widget-upload-costing" title="Generate Costing"></i>`}
                </div>`
                : `<div class="action">
                    <i class="fas fa-upload budget-itemlist-widget-upload" bid="${value.id}" iid="${itemobj.id}" title="upload attachment"></i>
                    ${value.type == "hours" ? "" : `<i vendorname="${vendorobj.name}" vendor="${vendorobj.id}" itemname="${itemobj.name}" class="fas fa-coins popup-widget-upload-costing" title="Generate Costing"></i>`}
                    <i class="fas fa-trash budget-itemlist-widget-delete" title="delete"></i>
                </div>`;
                let html = `
                    <div id="budget_${value.id}" class="createtool-budget-itemlist-widget">
                        <select class="budget-itemlist-widget-itemcategory" value="${itemcatobj.id}" disabled>
                            <option value="${itemcatobj.id}">${itemcatobj.name}</option>
                        </select>
                        <select class="budget-itemlist-widget-item" value="${itemobj.id}" disabled>
                            <option value="${itemobj.id}">${itemobj.name}</option>
                        </select>
                        <select class="budget-itemlist-widget-category popup_widget_upload-category" value="${value.type}" disabled>
                            <option value="hours">Internal</option>
                            <option value="supplier">Supplier (Lumpsum)</option>
                            <option value="tm">Supplier (T&M)</option>
                        </select>
                        <input class="budget-itemlist-widget-capex" type="text" value="${value.type == "hours" ? "0" : value.capexcost}" placeholder="$" disabled>
                        <input class="budget-itemlist-widget-opex" type="text" value="${value.type == "hours" ? value.opexcost : "0"}" placeholder="$" disabled>
                        <select class="budget-itemlist-widget-vendor" value="${value.type == "hours" ? "" : value.vendor}" disabled>
                            <option value="${vendorobj.id}">${vendorobj.name}</option>
                        </select>
                        <input class="budget-itemlist-widget-costing" type="text" placeholder="Costing" value="$${costing}" disabled>
                        ${iconHtml}
                    </div>
                `;
                $('.createtool-budget-itemlist-body').append(html);
                $(`#budget_${value.id}`).children('.budget-itemlist-widget-itemcategory').val(itemcatobj.id);
                $(`#budget_${value.id}`).children('.budget-itemlist-widget-item').val(itemobj.id);
                $(`#budget_${value.id}`).children('.budget-itemlist-widget-category').val(value.type);
                $(`#budget_${value.id}`).children('.budget-itemlist-widget-vendor').val(vendorobj.id);
                
            }
        });
    }
}
function fillPopupSupplier(budgetid){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const obj = ACCUSER.getProject(projectid).Budget.getLumpsumByBudgetId(budgetid);
    const budgetobj = ACCUSER.getProject(projectid).Budget.getObjById(budgetid);
    const isOwner = $('#request-createtool-required-requestid').attr('sender');
    // console.log(budgetobj);
    $('.popup-budget-supplier-widget-con').empty();
    $.each(obj, function(key, value){
        // console.log(value.payment, budgetobj[0].capexcost);
        // const x =  (isNaN(parseFloat(value.payment)) ? 0 : parseFloat(value.payment) * isNaN(parseFloat(budgetobj[0].capexcost)) ? 0 : parseFloat(budgetobj[0].capexcost)) / 100 ;
        const x = (parseFloat(value.payment) * parseFloat(budgetobj[0].capexcost)) / 100;
        const html = `<div lid="${value.id}" id="lumpsum_${value.id}" bid="${value.budgetid}" class="popup-budget-supplier-widget">
        <input type="text" class="name" placeholder="Item Name" value="${value.name}">
        <input type="text" class="payment popup-budget-supplier-widget-payment" placeholder="%" value="${value.payment}">
        <input type="text" class="total" plaecholder="Total Amount" disabled>
      </div>`;
      $('.popup-budget-supplier-widget-con').append(html);
      $(`#lumpsum_${value.id}`).children('.total').val(`$${x != undefined || x != null || x != NaN ? x : 0}`);
    });
    if(isOwner == "viewer"){
        $('#popup-budget-supplier-form-add').hide();
        $('#popup-budget-supplier-form-save').hide();
    }else{
        $('#popup-budget-supplier-form-add').show();
        $('#popup-budget-supplier-form-save').show();
    }
}
function fillPopupTm(budgetid){
    fillPopupTmMaterial(budgetid);
    fillPopupTmManhours(budgetid);
    fillPopupTmMilestone(budgetid);
    fillPopupTmExpense(budgetid);
}
function fillPopupTmMaterial(budgetid){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const isOwner = $('#request-createtool-required-requestid').attr('sender');

    const materialobj = ACCUSER.getProject(projectid).Budget.getMaterialByBudgetId(budgetid);
    $('.popup-budget-supplier-material-widget-con').empty();
    let totals = 0;
    $.each(materialobj, function(key, value){
        let amt = parseFloat(value.quantity) * parseFloat(value.price);
        totals += amt;
        const deleteHtml = isOwner == "viewer" ? `<i class="fas fa-ban"></i>` : `<i matid="${value.id}" class="fas fa-trash popup-budget-supplier-material-widget-delete"></i>`;
        const html = `
            <div class="popup-budget-supplier-material-widget">
                <input class="name" type="text" placeholder="Item Name" value="${value.name}">
                <input class="unit" type="text" placeholder="Unit"  value="${value.unit}">
                <input class="quantity" type="text" placeholder="Qty."  value="${value.quantity}">
                <input class="price" type="text" placeholder="$"  value="${value.price}">
                <input class="amount" type="text" placeholder="$" disabled  value="${amt}">
                ${deleteHtml}
            </div>
        `;
        $('.popup-budget-supplier-material-widget-con').append(html);
    });
    $('.popup-budget-supplier-material-totals').text(`Total Amount: $${totals.toFixed(2)}`);
    if(isOwner == "viewer"){
        $('#popup-budget-supplier-material-add').hide();
    }else{
        $('#popup-budget-supplier-material-add').show();
    }
}
function fillPopupTmManhours(budgetid){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const isOwner = $('#request-createtool-required-requestid').attr('sender');
    const manhourobj = ACCUSER.getProject(projectid).Budget.getManhourByBudgetId(budgetid);
    let totals = 0;
    $('.popup-budget-supplier-manhour-widget-con').empty();
    $.each(manhourobj, function(key, value){
        let amt = parseFloat(value.hours) * parseFloat(value.rate);
        totals += amt;
        const deleteHtml = isOwner == "viewer" ? `<i class="fas fa-ban"></i>` : `<i manid="${value.id}" class="fas fa-trash popup-budget-supplier-manhour-widget-delete"></i>`;
        const html = `
            <div class="popup-budget-supplier-manhour-widget">
                <input class="name" type="text" placeholder="Resource Name" value="${value.name}">
                <input class="role" type="text" placeholder="Role"  value="${value.role}">
                <input class="hours" type="text" placeholder="Hours"  value="${value.hours}">
                <input class="rate" type="text" placeholder="$"  value="${value.rate}">
                <input class="amount" type="text" placeholder="$" disabled  value="${amt}">
                ${deleteHtml}
            </div>
        `;
        $('.popup-budget-supplier-manhour-widget-con').append(html);
    });
    $('.popup-budget-supplier-manhour-totals').text(`Total Amount: $${totals.toFixed(2)}`);
    if(isOwner == "viewer"){
        $('#popup-budget-supplier-manhour-add').hide();
    }else{
        $('#popup-budget-supplier-manhour-add').show();
    }
}
function fillPopupTmMilestone(budgetid){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const isOwner = $('#request-createtool-required-requestid').attr('sender');
    const milestonelist = ACCUSER.getProject(projectid).Budget.getDistinctMilestoneIdByResourceId(budgetid);
    const manhourobj = ACCUSER.getProject(projectid).Budget.getManhourByBudgetId(budgetid);
    let resleghtml = ``;
    $.each(manhourobj, function(key, value){
        resleghtml += `<span>${value.name}</span>`;
    });

    $('.popup-budget-supplier-milestone-con').children('.legend').children('.legend-resource').empty();
    let percentageobj = [];
    $('.popup-budget-supplier-milestone-widget-con').empty();
    // console.log(milestonelist);
    $.each(milestonelist, function(key, value){
        const milestoneobj = ACCUSER.getProject(projectid).Budget.getMilestoneObjByMilestoneId(value.milestoneid);
        let hours = 0;
        // console.log(milestoneobj);
        
        let reshtml = ``;
        $.each(manhourobj, function(key, value1){
            let chour = '';
            let cid = undefined;
            let cmilid = undefined;
            let cgate = false;
            $.each(milestoneobj, function(key, value2){
                if(value2.resourceid == value1.id){
                   cgate = true;
                   hours += parseFloat(value2.value);
                   chour = value2.value;
                   cid = value2.id;
                }
                cmilid = value2.milestoneid;
            });
            //    console.log('ASJDHJKHLDSAHJKL', value1.name, cgate);
            if(cgate){
                reshtml += `<input id="resid_${value1.id}" resid="${value1.id}" misid="${cid}" milid="${cmilid}" type="text" placeholder="$" value="${chour}"> `;
            }else{
                reshtml += `<input id="resid_${value1.id}" resid="${value1.id}" milid="${cmilid}" type="text" placeholder="$" > `; 
            }
        });

        const saveHtml = isOwner == "viewer" ? `<i class="fas fa-ban"></i>` : `<i milid="${value.milestoneid}" class="fas fa-save popup-budget-supplier-milestone-widget-save"></i>`;
        const html = `
        <div id="milestone_${value.id}" class="popup-budget-supplier-milestone-widget">
            <input class="name" type="text" placeholder="Resource Name" value="${value.name}">
            <input class="percent" type="text" placeholder="Percentage" disabled>
            <div class="resource">
                ${reshtml}
            </div>
            <input class="popup-budget-supplier-milestone-allotedhours" type="text" placeholder="Hrs" value="${hours}" disabled>
            ${saveHtml}
        </div>`; 
        $('.popup-budget-supplier-milestone-widget-con').append(html);
        percentageobj.push({"id" : value.id, "hours" : hours});
    });

    $('.popup-budget-supplier-milestone-con').children('.legend').children('.legend-resource').append(resleghtml);
    let totalpercent = 0;
    $.each(percentageobj, function(key, value){
        totalpercent += parseFloat(value.hours);
    });
    // console.log(percentageobj);

    $.each(percentageobj, function(key, value){
        console.log(totalpercent, value.hours);
        const p = (value.hours / totalpercent) * 100;
        $(`#milestone_${value.id}`).children('.percent').val(`${p.toFixed(2)}%`);
    })

    if(isOwner == "viewer"){
        $('#popup-budget-supplier-milestone-addrows').hide();
    }else{
        $('#popup-budget-supplier-milestone-addrows').show();
    }
    
}
function fillPopupTmExpense(budgetid){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const isOwner = $('#request-createtool-required-requestid').attr('sender');
    const manhourobj = ACCUSER.getProject(projectid).Budget.getManhourByBudgetId(budgetid);
    $('.popup-budget-supplier-expense-widget-con').empty();
    let totals = 0;
    $.each(manhourobj, function(key, value){
        const weeks = value.weeks == undefined ? 0 : parseFloat(value.weeks);
        const trips = value.trips == undefined ? 0 : parseFloat(value.trips);
        const distance = value.distance == undefined ? 0 : parseFloat(value.distance);
        const distancerate = value.distancerate == undefined ? 0 : parseFloat(value.distancerate);
        const triphours = value.triphours == undefined ? 0 : parseFloat(value.triphours);
        const triphoursrate = value.triphoursrate == undefined ? 0 : parseFloat(value.triphoursrate);
        const fixedrate = value.fixedrate == undefined ? 0 : parseFloat(value.fixedrate);

        const total = (weeks * trips * distance * distancerate) + (triphours * triphoursrate) + fixedrate;
        
        totals += total;

        const saveHtml = isOwner == "viewer" ? `<i class="fas fa-ban"></i>` : `<i class="fas fa-save popup-budget-supplier-expense-widget-save"></i>`;
        const html = `
            <div id="expense_${value.id}" manid="${value.id}" class="popup-budget-supplier-expense-widget">
                <input type="text" placeholder="Resource Name" value="${value.name}" disabled>
                <input class="weeks" type="text" placeholder="Total Weeks" value="${weeks}">
                <input class="trips" type="text" placeholder="Trips/Week" value="${trips}">
                <input class="distance" type="text" placeholder="Km/Miles" value="${distance}">
                <input class="distancerate" type="text" placeholder="$" value="${distancerate}">
                <input class="triphours" type="text" placeholder="hrs" value="${triphours}">
                <input class="triphoursrate" type="text" placeholder="$" value="${triphoursrate}">
                <input class="fixedrate" type="text" placeholder="$" value="${fixedrate}">
                <input class="total" type="text" placeholder="$" value="${total}" disabled>
                ${saveHtml}
            </div>
        `;
        $('.popup-budget-supplier-expense-widget-con').append(html);
    });
    $('.popup-budget-supplier-expense-totals').text(`Total Amount: $${totals.toFixed(2)}`);

}

function fillOpexForecast(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const forecastyearobj =  ACCUSER.getProject(projectid).Budget.getDistinctOpexForecastYearList();
    const isOwner = $('#request-createtool-required-requestid').attr('sender');
    $('.request-createtool-budget-baselineforecast-opex').children('.createtool-subtitle').remove();
    $.each(forecastyearobj, function(key, yvalue){
        let projectTotalBudget = 0;
        let projectTotalActualBudget = 0;
        let projectTotalActualBudgetAll = 0;
        const forecastobjlist = ACCUSER.getProject(projectid).Budget.getForecastObjByYear(yvalue.year);
        const forecastobjlistall = ACCUSER.getProject(projectid).Budget.getForecastObj();
        const trobj = ACCUSER.getProject(projectid).TaskResource.getDistinctIdList();
        let acchtml = '';
        let totalBudget = 0;
        let totalActualBudget = 0;
        let totalActualBudgetAll = 0;
        $.each(trobj, function(key, value){
            if(value.id.split('-')[0] == 'TA'){
                const hours = ACCUSER.getProject(projectid).TaskResource.getAccidAllotedHoursByProjectid({"accid" : value.id});
                const accobj = ACCUSER.getProject(projectid).getTmpAccountObj(value.id);

                let ahours = isNaN(parseFloat(hours)) ? 0 : parseFloat(hours);
                let rate = isNaN(parseFloat(accobj.rate)) ? 0 : parseFloat(accobj.rate);

                totalBudget += (ahours * rate);
                
                const allotedHours = ACCUSER.getProject(projectid).TaskResource.getAccidAllotedHoursByProjectid({"accid" : value.id});
                const allotedBudget = (isNaN(parseFloat(accobj.rate)) ? 0 : parseFloat(accobj.rate)) * (isNaN(parseFloat(allotedHours)) ? 0 : parseFloat(allotedHours));
                // console.log(accobj.name, accobj.rateallotedHours);
               
                let forecastobj = undefined;
                $.each(forecastobjlist, function(key, fvalue){
                    if(fvalue.resourceid == value.id){
                        forecastobj = fvalue;
                    }
                });

                let fidhtml = forecastobj == undefined ? "" : `fid="${forecastobj.id}"`;
                let m1val = "";
                let m2val = "";
                let m3val = "";
                let m4val = "";
                let m5val = "";
                let m6val = "";
                let m7val = "";
                let m8val = "";
                let m9val = "";
                let m10val = "";
                let m11val = "";
                let m12val = "";
                let q1val = "";
                let q2val = "";
                let q3val = "";
                let q4val = "";
                
                if(forecastobj != undefined){
                    m1val = forecastobj.m1 == undefined ? "" : forecastobj.m1;
                    m2val = forecastobj.m2 == undefined ? "" : forecastobj.m2;
                    m3val = forecastobj.m3 == undefined ? "" : forecastobj.m3;
                    m4val = forecastobj.m4 == undefined ? "" : forecastobj.m4;
                    m5val = forecastobj.m5 == undefined ? "" : forecastobj.m5;
                    m6val = forecastobj.m6 == undefined ? "" : forecastobj.m6;
                    m7val = forecastobj.m7 == undefined ? "" : forecastobj.m7;
                    m8val = forecastobj.m8 == undefined ? "" : forecastobj.m8;
                    m9val = forecastobj.m9 == undefined ? "" : forecastobj.m9;
                    m10val = forecastobj.m10 == undefined ? "" : forecastobj.m10;
                    m11val = forecastobj.m11 == undefined ? "" : forecastobj.m11;
                    m12val = forecastobj.m12 == undefined ? "" : forecastobj.m12;
                    
         
                    q1val = (isNaN(parseFloat(m1val)) ? 0 : parseFloat(m1val)) + (isNaN(parseFloat(m2val)) ? 0 : parseFloat(m2val)) + (isNaN(parseFloat(m3val)) ? 0 : parseFloat(m3val));
                    q2val = (isNaN(parseFloat(m4val)) ? 0 : parseFloat(m4val)) + (isNaN(parseFloat(m5val)) ? 0 : parseFloat(m5val)) + (isNaN(parseFloat(m6val)) ? 0 : parseFloat(m6val));
                    q3val = (isNaN(parseFloat(m7val)) ? 0 : parseFloat(m7val)) + (isNaN(parseFloat(m8val)) ? 0 : parseFloat(m8val)) + (isNaN(parseFloat(m9val)) ? 0 : parseFloat(m9val));
                    q4val = (isNaN(parseFloat(m10val)) ? 0 : parseFloat(m10val)) + (isNaN(parseFloat(m11val)) ? 0 : parseFloat(m11val)) + (isNaN(parseFloat(m12val)) ? 0 : parseFloat(m12val));
                }
                const actualbudget = 
                (isNaN(parseFloat(m1val)) ? 0 : parseFloat(m1val)) + 
                (isNaN(parseFloat(m2val)) ? 0 : parseFloat(m2val)) + 
                (isNaN(parseFloat(m3val)) ? 0 : parseFloat(m3val)) + 
                (isNaN(parseFloat(m4val)) ? 0 : parseFloat(m4val)) + 
                (isNaN(parseFloat(m5val)) ? 0 : parseFloat(m5val)) + 
                (isNaN(parseFloat(m6val)) ? 0 : parseFloat(m6val)) + 
                (isNaN(parseFloat(m7val)) ? 0 : parseFloat(m7val)) + 
                (isNaN(parseFloat(m8val)) ? 0 : parseFloat(m8val)) + 
                (isNaN(parseFloat(m9val)) ? 0 : parseFloat(m9val)) + 
                (isNaN(parseFloat(m10val)) ? 0 : parseFloat(m10val)) + 
                (isNaN(parseFloat(m11val)) ? 0 : parseFloat(m11val)) + 
                (isNaN(parseFloat(m12val)) ? 0 : parseFloat(m12val));


                let actualbudgetAll = 0;
                // console.log('forecastobjlistall',forecastobjlistall);
                $.each(forecastobjlistall, function(key, favalue){
                    if(favalue.resourceid == value.id){
                        const zm1val = favalue.m1 == undefined || favalue.m1 == ""  ? 0 : isNaN(parseFloat(favalue.m1)) ? 0 : parseFloat(favalue.m1);
                        const zm2val = favalue.m2 == undefined || favalue.m2 == ""  ? 0 : isNaN(parseFloat(favalue.m2)) ? 0 : parseFloat(favalue.m2);
                        const zm3val = favalue.m3 == undefined || favalue.m3 == ""  ? 0 : isNaN(parseFloat(favalue.m3)) ? 0 : parseFloat(favalue.m3);
                        const zm4val = favalue.m4 == undefined || favalue.m4 == ""  ? 0 : isNaN(parseFloat(favalue.m4)) ? 0 : parseFloat(favalue.m4);
                        const zm5val = favalue.m5 == undefined || favalue.m5 == ""  ? 0 : isNaN(parseFloat(favalue.m5)) ? 0 : parseFloat(favalue.m5);
                        const zm6val = favalue.m6 == undefined || favalue.m6 == ""  ? 0 : isNaN(parseFloat(favalue.m6)) ? 0 : parseFloat(favalue.m6);
                        const zm7val = favalue.m7 == undefined || favalue.m7 == ""  ? 0 : isNaN(parseFloat(favalue.m7)) ? 0 : parseFloat(favalue.m7);
                        const zm8val = favalue.m8 == undefined || favalue.m8 == ""  ? 0 : isNaN(parseFloat(favalue.m8)) ? 0 : parseFloat(favalue.m8);
                        const zm9val = favalue.m9 == undefined || favalue.m9 == ""  ? 0 : isNaN(parseFloat(favalue.m9)) ? 0 : parseFloat(favalue.m9);
                        const zm10val = favalue.m10 == undefined || favalue.m10 == ""  ? 0 : isNaN(parseFloat(favalue.m10)) ? 0 : parseFloat(favalue.m10);
                        const zm11val = favalue.m11 == undefined || favalue.m11 == ""  ? 0 : isNaN(parseFloat(favalue.m11)) ? 0 : parseFloat(favalue.m11);
                        const zm12val = favalue.m12 == undefined || favalue.m12 == ""  ? 0 : isNaN(parseFloat(favalue.m12)) ? 0 : parseFloat(favalue.m12);

                        actualbudgetAll += (zm1val + zm2val + zm3val + zm4val + zm5val + zm6val + zm7val + zm8val + zm9val + zm10val + zm11val + zm12val);
                        // console.log('AAAAAAAAAAAA', actualbudgetAll);
                    }
                });









                totalActualBudget += actualbudget;
                totalActualBudgetAll += actualbudgetAll;
                const remainingBudget = allotedBudget - actualbudgetAll;
                

                // console.log('KLJASHDKLJHASDHJKLADSHJK', actualbudgetAll);
                let saveHtml = isOwner == "viewer" ? "" : `<button class="btn-shadow createtool-budget-forecast-save">Save</button>`;
                const html = `
                    <div id="forecastwidget_${yvalue.year}" year="${yvalue.year}" resid="${value.id}" type="opex" ${fidhtml} class="createtool-subtitle">
                        <span class="crtitle crtitle-forecast-year btn-shadow"><input status="done" type="text" value="${accobj.name}" disabled><span>$${actualbudget.toFixed(2)}</span><i class="fas fa-caret-left"></i></span>
                        <div class="content createtool-budget-forecast-year">
                            <span class="instruction">Total Budget: $${allotedBudget.toFixed(2)} &nbsp;&nbsp; Spent Budget: $${actualbudget.toFixed(2)} &nbsp;&nbsp; Remaining Budget: $${remainingBudget.toFixed(2)}</span>
                            <div class="createtool-budget-forecast-year-widget calendar-monthly hidden">
                                <div class="widget jan">
                                    <span class="title">January</span>
                                    <input value="${m1val}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m1" placeholder="$">
                                </div>
                                <div class="widget feb">
                                    <span class="title">February</span>
                                    <input value="${m2val}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m2" placeholder="$">
                                </div>
                                <div class="widget mar">
                                    <span class="title">March</span>
                                    <input value="${m3val}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m3" placeholder="$">
                                </div>
                                <div class="widget apr">
                                    <span class="title">April</span>
                                    <input value="${m4val}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m4" placeholder="$">
                                </div>
                                <div class="widget may">
                                    <span class="title">May</span>
                                    <input value="${m5val}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m5" placeholder="$">
                                </div>
                                <div class="widget jun">
                                    <span class="title">June</span>
                                    <input value="${m6val}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m6" placeholder="$">
                                </div>
                                <div class="widget jul">
                                    <span class="title">July</span>
                                    <input value="${m7val}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m7" placeholder="$">
                                </div>
                                <div class="widget aug">
                                    <span class="title">August</span>
                                    <input value="${m8val}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m8" placeholder="$">
                                </div>
                                <div class="widget sep">
                                    <span class="title">September</span>
                                    <input value="${m9val}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m9" placeholder="$">
                                </div>
                                <div class="widget oct">
                                    <span class="title">October</span>
                                    <input value="${m10val}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m10" placeholder="$">
                                </div>
                                <div class="widget nov">
                                    <span class="title">November</span>
                                    <input value="${m11val}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m11" placeholder="$">
                                </div>
                                <div class="widget dec">
                                    <span class="title">December</span>
                                    <input value="${m12val}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m12" placeholder="$">
                                </div>
                            </div>
                            <div class="createtool-budget-forecast-year-widget calendar-quarter hidden">
                                <div class="widget q1">
                                    <span class="title">Q1</span>
                                    <input value="${q1val}" class="createtool-budget-forecast-year-widget-q" type="text" cid="q1" placeholder="$">
                                </div>
                                <div class="widget q2">
                                    <span class="title">Q2</span>
                                    <input value="${q2val}" class="createtool-budget-forecast-year-widget-q" type="text" cid="q2" placeholder="$">
                                </div>
                                <div class="widget q3">
                                    <span class="title">Q3</span>
                                    <input value="${q3val}" class="createtool-budget-forecast-year-widget-q" type="text" cid="q3" placeholder="$">
                                </div>
                                <div class="widget q4">
                                    <span class="title">Q4</span>
                                    <input value="${q4val}" class="createtool-budget-forecast-year-widget-q" type="text" cid="q4" placeholder="$">
                                </div>
                            </div>
                            ${saveHtml}
                        </div>
                    </div>`;
                acchtml += html;
                }
            });
            projectTotalBudget = totalBudget;
            projectTotalActualBudget += totalActualBudget;
            projectTotalActualBudgetAll += totalActualBudgetAll;
            // console.log('KAJSHDKLHJASDKJHLADSJKHL', projectTotalBudget, projectTotalActualBudget);

            const ratio = (projectTotalActualBudget / projectTotalBudget) * 100;
            const rb = projectTotalBudget - projectTotalActualBudgetAll;
        
            const html = `
                <div class="createtool-subtitle">
                    <span class="crtitle btn-shadow">${yvalue.year} - ${ratio.toFixed(2)}%<i class="fas fa-caret-left"></i></span>
                    <div class="content createtool-budget-forecast createtool-budget-forecast-con">
                        
                        ${acchtml}
            
                        <div class="header">
                            <div class="fill">
                                <span>Budget Amount</span>
                                <input type="text" value="$${projectTotalBudget.toFixed(2)}" disabled>
                            </div>
                            <div class="fill">
                                <span>Remaining Budget</span>
                                <input type="text" value="$${rb.toFixed(2)}" disabled>
                            </div>
                            <div class="fill type">
                                <span>View Type</span>
                                <select name="" id="">
                                    <option value="monthly">Monthly</option>
                                    <option value="quarter">Quarterly</option>
                                </select>
                            </div>
                            <i class="fas fa-trash"></i>
                        </div><br>
                    </div>
                </div>`;
        
        $('.request-createtool-budget-baselineforecast-opex').prepend(html);

        
    });

}
function fillCapexForecastOld(){
    console.log("START FILLING CAPEX FORECAST");
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const forecastyearobj =  ACCUSER.getProject(projectid).Budget.getDistinctCapexForecastYearList();
    const capexobj = ACCUSER.getProject(projectid).Budget.getCapexObj();
    const projectTotalActualBudget = ACCUSER.getProject(projectid).Budget.getTotalCapexBudget();
    let projectTotalAllocatedBudget = 0;

    // console.log("capexobj", capexobj);
    $.each(capexobj, function(key, bvalue){
        if(bvalue.type == "tm"){
            const material = ACCUSER.getProject(projectid).Budget.getMaterialCostByBudgetId(bvalue.id);
            const mahours = ACCUSER.getProject(projectid).Budget.getManhourCostByBudgetId(bvalue.id);
            const matv = isNaN(parseFloat(material)) ? 0 : parseFloat(material);
            const manv = isNaN(parseFloat(mahours)) ? 0 : parseFloat(mahours);
            // console.log(matv, manv);
            projectTotalAllocatedBudget += (matv + manv);
        }else if(bvalue.type == "supplier"){
            projectTotalAllocatedBudget += isNaN(parseFloat(bvalue.capexcost)) ? 0 : parseFloat(bvalue.capexcost);
            // console.log(isNaN(parseFloat(bvalue.capexcost)) ? 0 : parseFloat(bvalue.capexcost));
        }
        // console.log(projectTotalAllocatedBudget);  

    });


    // console.log(projectTotalAllocatedBudget);
    $('.request-createtool-budget-baselineforecast-capex').children('.createtool-subtitle').remove();
    $.each(forecastyearobj, function(key, yvalue){
        const forecastobjlist = ACCUSER.getProject(projectid).Budget.getForecastObjByYear(yvalue.year);
        const forecastobjlistall = ACCUSER.getProject(projectid).Budget.getForecastObj();
        const trobj = ACCUSER.getProject(projectid).TaskResource.getDistinctIdList();
        let annualActualBudget = 0;

        // console.log("forecastobjlist",forecastobjlist);
        // console.log("trobj",trobj);
        
        let acchtml = '';
        $.each(trobj, function(key, value){
            if(value.id.split('-')[0] == 'TS'){
                const accobj = ACCUSER.getProject(projectid).getTmpSupplierObj(value.id);
                const budgetobj = ACCUSER.getProject(projectid).Budget.getObjByVendor(value.id);
                let allotedBudget = 0;
                // console.log(budgetobj);
    
                let tmAllotedBudget = 0;
                let supplierAllotedBudget = 0;
                let tmActualBudget = 0;
                let supplierActualBudget = 0;


                let tmHtmlGate = false;
                let supplierHtmlGate = false;

                
                
              

    
                $.each(budgetobj, function(key, bvalue){
                    if(bvalue.type == "tm"){
                        const material = ACCUSER.getProject(projectid).Budget.getMaterialCostByBudgetId(bvalue.id);
                        const mahours = ACCUSER.getProject(projectid).Budget.getManhourCostByBudgetId(bvalue.id);
                        const matv = isNaN(parseFloat(material)) ? 0 : parseFloat(material);
                        const manv = isNaN(parseFloat(mahours)) ? 0 : parseFloat(mahours);
                        tmAllotedBudget += (matv + manv);
                        tmHtmlGate = true;
                    }else if(bvalue.type == "supplier"){
                        supplierAllotedBudget += isNaN(parseFloat(bvalue.capexcost)) ? 0 : parseFloat(bvalue.capexcost);
                        supplierHtmlGate = true;
                    }
                });
    
                if(tmHtmlGate){
                    let fobtm = undefined;
                    $.each(forecastobjlist, function(key, fvalue){
                        if(fvalue.type == "capextm" && fvalue.resourceid == value.id){
                            fobtm = fvalue;
                        }
                    });

                    let resourceActualBudgetAll = 0;
                    // console.log('forecastobjlistall',forecastobjlistall);
                    $.each(forecastobjlistall, function(key, favalue){
                        if(favalue.resourceid == value.id && favalue.type == "capextm"){
                            const zm1val = favalue.m1 == undefined || favalue.m1 == ""  ? 0 : isNaN(parseFloat(favalue.m1)) ? 0 : parseFloat(favalue.m1);
                            const zm2val = favalue.m2 == undefined || favalue.m2 == ""  ? 0 : isNaN(parseFloat(favalue.m2)) ? 0 : parseFloat(favalue.m2);
                            const zm3val = favalue.m3 == undefined || favalue.m3 == ""  ? 0 : isNaN(parseFloat(favalue.m3)) ? 0 : parseFloat(favalue.m3);
                            const zm4val = favalue.m4 == undefined || favalue.m4 == ""  ? 0 : isNaN(parseFloat(favalue.m4)) ? 0 : parseFloat(favalue.m4);
                            const zm5val = favalue.m5 == undefined || favalue.m5 == ""  ? 0 : isNaN(parseFloat(favalue.m5)) ? 0 : parseFloat(favalue.m5);
                            const zm6val = favalue.m6 == undefined || favalue.m6 == ""  ? 0 : isNaN(parseFloat(favalue.m6)) ? 0 : parseFloat(favalue.m6);
                            const zm7val = favalue.m7 == undefined || favalue.m7 == ""  ? 0 : isNaN(parseFloat(favalue.m7)) ? 0 : parseFloat(favalue.m7);
                            const zm8val = favalue.m8 == undefined || favalue.m8 == ""  ? 0 : isNaN(parseFloat(favalue.m8)) ? 0 : parseFloat(favalue.m8);
                            const zm9val = favalue.m9 == undefined || favalue.m9 == ""  ? 0 : isNaN(parseFloat(favalue.m9)) ? 0 : parseFloat(favalue.m9);
                            const zm10val = favalue.m10 == undefined || favalue.m10 == ""  ? 0 : isNaN(parseFloat(favalue.m10)) ? 0 : parseFloat(favalue.m10);
                            const zm11val = favalue.m11 == undefined || favalue.m11 == ""  ? 0 : isNaN(parseFloat(favalue.m11)) ? 0 : parseFloat(favalue.m11);
                            const zm12val = favalue.m12 == undefined || favalue.m12 == ""  ? 0 : isNaN(parseFloat(favalue.m12)) ? 0 : parseFloat(favalue.m12);

                            resourceActualBudgetAll += (zm1val + zm2val + zm3val + zm4val + zm5val + zm6val + zm7val + zm8val + zm9val + zm10val + zm11val + zm12val);
                        }
                    });

                    let m1valtm = "";
                    let m2valtm = "";
                    let m3valtm = "";
                    let m4valtm = "";
                    let m5valtm = "";
                    let m6valtm = "";
                    let m7valtm = "";
                    let m8valtm = "";
                    let m9valtm = "";
                    let m10valtm = "";
                    let m11valtm = "";
                    let m12valtm = "";

                    
                    let tmfidhtml = fobtm == undefined ? "" : `fid="${fobtm.id}"`;
                    if(fobtm != undefined){
                        m1valtm = fobtm.m1 == undefined ? "" : fobtm.m1;
                        m2valtm = fobtm.m2 == undefined ? "" : fobtm.m2;
                        m3valtm = fobtm.m3 == undefined ? "" : fobtm.m3;
                        m4valtm = fobtm.m4 == undefined ? "" : fobtm.m4;
                        m5valtm = fobtm.m5 == undefined ? "" : fobtm.m5;
                        m6valtm = fobtm.m6 == undefined ? "" : fobtm.m6;
                        m7valtm = fobtm.m7 == undefined ? "" : fobtm.m7;
                        m8valtm = fobtm.m8 == undefined ? "" : fobtm.m8;
                        m9valtm = fobtm.m9 == undefined ? "" : fobtm.m9;
                        m10valtm = fobtm.m10 == undefined ? "" : fobtm.m10;
                        m11valtm = fobtm.m11 == undefined ? "" : fobtm.m11;
                        m12valtm = fobtm.m12 == undefined ? "" : fobtm.m12;
                    }
                    
            
                    let q1valtm = (isNaN(parseFloat(m1valtm)) ? 0 : parseFloat(m1valtm)) + (isNaN(parseFloat(m2valtm)) ? 0 : parseFloat(m2valtm)) + (isNaN(parseFloat(m3valtm)) ? 0 : parseFloat(m3valtm));
                    let q2valtm = (isNaN(parseFloat(m4valtm)) ? 0 : parseFloat(m4valtm)) + (isNaN(parseFloat(m5valtm)) ? 0 : parseFloat(m5valtm)) + (isNaN(parseFloat(m6valtm)) ? 0 : parseFloat(m6valtm));
                    let q3valtm = (isNaN(parseFloat(m7valtm)) ? 0 : parseFloat(m7valtm)) + (isNaN(parseFloat(m8valtm)) ? 0 : parseFloat(m8valtm)) + (isNaN(parseFloat(m9valtm)) ? 0 : parseFloat(m9valtm));
                    let q4valtm = (isNaN(parseFloat(m10valtm)) ? 0 : parseFloat(m10valtm)) + (isNaN(parseFloat(m11valtm)) ? 0 : parseFloat(m11valtm)) + (isNaN(parseFloat(m12valtm)) ? 0 : parseFloat(m12valtm));

                    tmActualBudget = 
                    (isNaN(parseFloat(m1valtm)) ? 0 : parseFloat(m1valtm)) + 
                    (isNaN(parseFloat(m2valtm)) ? 0 : parseFloat(m2valtm)) + 
                    (isNaN(parseFloat(m3valtm)) ? 0 : parseFloat(m3valtm)) + 
                    (isNaN(parseFloat(m4valtm)) ? 0 : parseFloat(m4valtm)) + 
                    (isNaN(parseFloat(m5valtm)) ? 0 : parseFloat(m5valtm)) + 
                    (isNaN(parseFloat(m6valtm)) ? 0 : parseFloat(m6valtm)) + 
                    (isNaN(parseFloat(m7valtm)) ? 0 : parseFloat(m7valtm)) + 
                    (isNaN(parseFloat(m8valtm)) ? 0 : parseFloat(m8valtm)) + 
                    (isNaN(parseFloat(m9valtm)) ? 0 : parseFloat(m9valtm)) + 
                    (isNaN(parseFloat(m10valtm)) ? 0 : parseFloat(m10valtm)) + 
                    (isNaN(parseFloat(m11valtm)) ? 0 : parseFloat(m11valtm)) + 
                    (isNaN(parseFloat(m12valtm)) ? 0 : parseFloat(m12valtm));

                    annualActualBudget += tmActualBudget;
                    let tmRemainingBudget = (tmAllotedBudget - resourceActualBudgetAll); 
                    const html = `
                        <div id="forecastwidget_${yvalue.year}" year="${yvalue.year}" resid="${value.id}" type="capextm" ${tmfidhtml} class="createtool-subtitle">
                            <span class="crtitle crtitle-forecast-year btn-shadow"><input status="done" type="text" value="${accobj.name} - SUPPLIER(TM)" disabled><span>$${tmActualBudget.toFixed(2)}</span><i class="fas fa-caret-left"></i></span>
                            <div class="content createtool-budget-forecast-year">
                                <span class="instruction">Total Budget: $${tmAllotedBudget.toFixed(2)} &nbsp;&nbsp; Spent Budget: $${tmActualBudget.toFixed(2)} &nbsp;&nbsp; Remaining Budget: $${tmRemainingBudget.toFixed(2)}</span>
                                <div class="createtool-budget-forecast-year-widget calendar-monthly hidden">
                                    <div class="widget jan">
                                        <span class="title">January</span>
                                        <input value="${m1valtm}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m1" placeholder="$">
                                    </div>
                                    <div class="widget feb">
                                        <span class="title">February</span>
                                        <input value="${m2valtm}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m2" placeholder="$">
                                    </div>
                                    <div class="widget mar">
                                        <span class="title">March</span>
                                        <input value="${m3valtm}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m3" placeholder="$">
                                    </div>
                                    <div class="widget apr">
                                        <span class="title">April</span>
                                        <input value="${m4valtm}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m4" placeholder="$">
                                    </div>
                                    <div class="widget may">
                                        <span class="title">May</span>
                                        <input value="${m5valtm}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m5" placeholder="$">
                                    </div>
                                    <div class="widget jun">
                                        <span class="title">June</span>
                                        <input value="${m6valtm}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m6" placeholder="$">
                                    </div>
                                    <div class="widget jul">
                                        <span class="title">July</span>
                                        <input value="${m7valtm}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m7" placeholder="$">
                                    </div>
                                    <div class="widget aug">
                                        <span class="title">August</span>
                                        <input value="${m8valtm}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m8" placeholder="$">
                                    </div>
                                    <div class="widget sep">
                                        <span class="title">September</span>
                                        <input value="${m9valtm}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m9" placeholder="$">
                                    </div>
                                    <div class="widget oct">
                                        <span class="title">October</span>
                                        <input value="${m10valtm}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m10" placeholder="$">
                                    </div>
                                    <div class="widget nov">
                                        <span class="title">November</span>
                                        <input value="${m11valtm}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m11" placeholder="$">
                                    </div>
                                    <div class="widget dec">
                                        <span class="title">December</span>
                                        <input value="${m12valtm}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m12" placeholder="$">
                                    </div>
                                </div>
                                <div class="createtool-budget-forecast-year-widget calendar-quarter hidden">
                                    <div class="widget q1">
                                        <span class="title">Q1</span>
                                        <input value="${q1valtm}" class="createtool-budget-forecast-year-widget-q" type="text" cid="q1" placeholder="$">
                                    </div>
                                    <div class="widget q2">
                                        <span class="title">Q2</span>
                                        <input value="${q2valtm}" class="createtool-budget-forecast-year-widget-q" type="text" cid="q2" placeholder="$">
                                    </div>
                                    <div class="widget q3">
                                        <span class="title">Q3</span>
                                        <input value="${q3valtm}" class="createtool-budget-forecast-year-widget-q" type="text" cid="q3" placeholder="$">
                                    </div>
                                    <div class="widget q4">
                                        <span class="title">Q4</span>
                                        <input value="${q4valtm}" class="createtool-budget-forecast-year-widget-q" type="text" cid="q4" placeholder="$">
                                    </div>
                                </div>
                                <button class="btn-shadow createtool-budget-forecast-save">Save</button>
                            </div>
                        </div>`;
                    acchtml += html;
                }
                if(supplierHtmlGate){
                    let fobsupplier = undefined;
                    $.each(forecastobjlist, function(key, fvalue){
                        if(fvalue.type == "capexsupplier" && fvalue.resourceid == value.id){
                            fobsupplier = fvalue;
                        }
                    });

                    let resourceActualBudgetAll = 0;
                    // console.log('forecastobjlistall',forecastobjlistall);
                    $.each(forecastobjlistall, function(key, favalue){
                        if(favalue.resourceid == value.id && favalue.type == "capexsupplier"){
                            const zm1val = favalue.m1 == undefined || favalue.m1 == ""  ? 0 : isNaN(parseFloat(favalue.m1)) ? 0 : parseFloat(favalue.m1);
                            const zm2val = favalue.m2 == undefined || favalue.m2 == ""  ? 0 : isNaN(parseFloat(favalue.m2)) ? 0 : parseFloat(favalue.m2);
                            const zm3val = favalue.m3 == undefined || favalue.m3 == ""  ? 0 : isNaN(parseFloat(favalue.m3)) ? 0 : parseFloat(favalue.m3);
                            const zm4val = favalue.m4 == undefined || favalue.m4 == ""  ? 0 : isNaN(parseFloat(favalue.m4)) ? 0 : parseFloat(favalue.m4);
                            const zm5val = favalue.m5 == undefined || favalue.m5 == ""  ? 0 : isNaN(parseFloat(favalue.m5)) ? 0 : parseFloat(favalue.m5);
                            const zm6val = favalue.m6 == undefined || favalue.m6 == ""  ? 0 : isNaN(parseFloat(favalue.m6)) ? 0 : parseFloat(favalue.m6);
                            const zm7val = favalue.m7 == undefined || favalue.m7 == ""  ? 0 : isNaN(parseFloat(favalue.m7)) ? 0 : parseFloat(favalue.m7);
                            const zm8val = favalue.m8 == undefined || favalue.m8 == ""  ? 0 : isNaN(parseFloat(favalue.m8)) ? 0 : parseFloat(favalue.m8);
                            const zm9val = favalue.m9 == undefined || favalue.m9 == ""  ? 0 : isNaN(parseFloat(favalue.m9)) ? 0 : parseFloat(favalue.m9);
                            const zm10val = favalue.m10 == undefined || favalue.m10 == ""  ? 0 : isNaN(parseFloat(favalue.m10)) ? 0 : parseFloat(favalue.m10);
                            const zm11val = favalue.m11 == undefined || favalue.m11 == ""  ? 0 : isNaN(parseFloat(favalue.m11)) ? 0 : parseFloat(favalue.m11);
                            const zm12val = favalue.m12 == undefined || favalue.m12 == ""  ? 0 : isNaN(parseFloat(favalue.m12)) ? 0 : parseFloat(favalue.m12);

                            resourceActualBudgetAll += (zm1val + zm2val + zm3val + zm4val + zm5val + zm6val + zm7val + zm8val + zm9val + zm10val + zm11val + zm12val);
                        }
                    });

                    let m1valsupplier = "";
                    let m2valsupplier = "";
                    let m3valsupplier = "";
                    let m4valsupplier = "";
                    let m5valsupplier = "";
                    let m6valsupplier = "";
                    let m7valsupplier = "";
                    let m8valsupplier = "";
                    let m9valsupplier = "";
                    let m10valsupplier = "";
                    let m11valsupplier = "";
                    let m12valsupplier = "";

                    let supplierfidhtml = fobsupplier == undefined ? "" : `fid="${fobsupplier.id}"`;
                    if(fobsupplier != undefined){
                        m1valsupplier = fobsupplier.m1 == undefined ? "" : fobsupplier.m1;
                        m2valsupplier = fobsupplier.m2 == undefined ? "" : fobsupplier.m2;
                        m3valsupplier = fobsupplier.m3 == undefined ? "" : fobsupplier.m3;
                        m4valsupplier = fobsupplier.m4 == undefined ? "" : fobsupplier.m4;
                        m5valsupplier = fobsupplier.m5 == undefined ? "" : fobsupplier.m5;
                        m6valsupplier = fobsupplier.m6 == undefined ? "" : fobsupplier.m6;
                        m7valsupplier = fobsupplier.m7 == undefined ? "" : fobsupplier.m7;
                        m8valsupplier = fobsupplier.m8 == undefined ? "" : fobsupplier.m8;
                        m9valsupplier = fobsupplier.m9 == undefined ? "" : fobsupplier.m9;
                        m10valsupplier = fobsupplier.m10 == undefined ? "" : fobsupplier.m10;
                        m11valsupplier = fobsupplier.m11 == undefined ? "" : fobsupplier.m11;
                        m12valsupplier = fobsupplier.m12 == undefined ? "" : fobsupplier.m12;
                    }
                    
            
                    let q1valsupplier = (isNaN(parseFloat(m1valsupplier)) ? 0 : parseFloat(m1valsupplier)) + (isNaN(parseFloat(m2valsupplier)) ? 0 : parseFloat(m2valsupplier)) + (isNaN(parseFloat(m3valsupplier)) ? 0 : parseFloat(m3valsupplier));
                    let q2valsupplier = (isNaN(parseFloat(m4valsupplier)) ? 0 : parseFloat(m4valsupplier)) + (isNaN(parseFloat(m5valsupplier)) ? 0 : parseFloat(m5valsupplier)) + (isNaN(parseFloat(m6valsupplier)) ? 0 : parseFloat(m6valsupplier));
                    let q3valsupplier = (isNaN(parseFloat(m7valsupplier)) ? 0 : parseFloat(m7valsupplier)) + (isNaN(parseFloat(m8valsupplier)) ? 0 : parseFloat(m8valsupplier)) + (isNaN(parseFloat(m9valsupplier)) ? 0 : parseFloat(m9valsupplier));
                    let q4valsupplier = (isNaN(parseFloat(m10valsupplier)) ? 0 : parseFloat(m10valsupplier)) + (isNaN(parseFloat(m11valsupplier)) ? 0 : parseFloat(m11valsupplier)) + (isNaN(parseFloat(m12valsupplier)) ? 0 : parseFloat(m12valsupplier));
                    

                    supplierActualBudget = 
                    (isNaN(parseFloat(m1valsupplier)) ? 0 : parseFloat(m1valsupplier)) + 
                    (isNaN(parseFloat(m2valsupplier)) ? 0 : parseFloat(m2valsupplier)) + 
                    (isNaN(parseFloat(m3valsupplier)) ? 0 : parseFloat(m3valsupplier)) + 
                    (isNaN(parseFloat(m4valsupplier)) ? 0 : parseFloat(m4valsupplier)) + 
                    (isNaN(parseFloat(m5valsupplier)) ? 0 : parseFloat(m5valsupplier)) + 
                    (isNaN(parseFloat(m6valsupplier)) ? 0 : parseFloat(m6valsupplier)) + 
                    (isNaN(parseFloat(m7valsupplier)) ? 0 : parseFloat(m7valsupplier)) + 
                    (isNaN(parseFloat(m8valsupplier)) ? 0 : parseFloat(m8valsupplier)) + 
                    (isNaN(parseFloat(m9valsupplier)) ? 0 : parseFloat(m9valsupplier)) + 
                    (isNaN(parseFloat(m10valsupplier)) ? 0 : parseFloat(m10valsupplier)) + 
                    (isNaN(parseFloat(m11valsupplier)) ? 0 : parseFloat(m11valsupplier)) + 
                    (isNaN(parseFloat(m12valsupplier)) ? 0 : parseFloat(m12valsupplier));

                    annualActualBudget += supplierActualBudget;
                    let supplierRemainingBudget = (supplierAllotedBudget - resourceActualBudgetAll);

                    const html = `
                        <div id="forecastwidget_${yvalue.year}" year="${yvalue.year}" resid="${value.id}" type="capexsupplier" ${supplierfidhtml} class="createtool-subtitle">
                            <span class="crtitle crtitle-forecast-year btn-shadow"><input status="done" type="text" value="${accobj.name} - SUPPLIER(LUMPSUM)" disabled><span>$${supplierActualBudget.toFixed(2)}</span><i class="fas fa-caret-left"></i></span>
                            <div class="content createtool-budget-forecast-year">
                                <span class="instruction">Total Budget: $${supplierAllotedBudget.toFixed(2)} &nbsp;&nbsp; Spent Budget: $${supplierActualBudget.toFixed(2)} &nbsp;&nbsp; Remaining Budget: $${supplierRemainingBudget.toFixed(2)}</span>
                                <div class="createtool-budget-forecast-year-widget calendar-monthly hidden">
                                    <div class="widget jan">
                                        <span class="title">January</span>
                                        <input value="${m1valsupplier}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m1" placeholder="$">
                                    </div>
                                    <div class="widget feb">
                                        <span class="title">February</span>
                                        <input value="${m2valsupplier}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m2" placeholder="$">
                                    </div>
                                    <div class="widget mar">
                                        <span class="title">March</span>
                                        <input value="${m3valsupplier}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m3" placeholder="$">
                                    </div>
                                    <div class="widget apr">
                                        <span class="title">April</span>
                                        <input value="${m4valsupplier}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m4" placeholder="$">
                                    </div>
                                    <div class="widget may">
                                        <span class="title">May</span>
                                        <input value="${m5valsupplier}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m5" placeholder="$">
                                    </div>
                                    <div class="widget jun">
                                        <span class="title">June</span>
                                        <input value="${m6valsupplier}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m6" placeholder="$">
                                    </div>
                                    <div class="widget jul">
                                        <span class="title">July</span>
                                        <input value="${m7valsupplier}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m7" placeholder="$">
                                    </div>
                                    <div class="widget aug">
                                        <span class="title">August</span>
                                        <input value="${m8valsupplier}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m8" placeholder="$">
                                    </div>
                                    <div class="widget sep">
                                        <span class="title">September</span>
                                        <input value="${m9valsupplier}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m9" placeholder="$">
                                    </div>
                                    <div class="widget oct">
                                        <span class="title">October</span>
                                        <input value="${m10valsupplier}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m10" placeholder="$">
                                    </div>
                                    <div class="widget nov">
                                        <span class="title">November</span>
                                        <input value="${m11valsupplier}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m11" placeholder="$">
                                    </div>
                                    <div class="widget dec">
                                        <span class="title">December</span>
                                        <input value="${m12valsupplier}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m12" placeholder="$">
                                    </div>
                                </div>
                                <div class="createtool-budget-forecast-year-widget calendar-quarter hidden">
                                    <div class="widget q1">
                                        <span class="title">Q1</span>
                                        <input value="${q1valsupplier}" class="createtool-budget-forecast-year-widget-q" type="text" cid="q1" placeholder="$">
                                    </div>
                                    <div class="widget q2">
                                        <span class="title">Q2</span>
                                        <input value="${q2valsupplier}" class="createtool-budget-forecast-year-widget-q" type="text" cid="q2" placeholder="$">
                                    </div>
                                    <div class="widget q3">
                                        <span class="title">Q3</span>
                                        <input value="${q3valsupplier}" class="createtool-budget-forecast-year-widget-q" type="text" cid="q3" placeholder="$">
                                    </div>
                                    <div class="widget q4">
                                        <span class="title">Q4</span>
                                        <input value="${q4valsupplier}" class="createtool-budget-forecast-year-widget-q" type="text" cid="q4" placeholder="$">
                                    </div>
                                </div>
                                <button class="btn-shadow createtool-budget-forecast-save">Save</button>
                            </div>
                        </div>`;
                    acchtml += html;
                }
    
            }

        });

        const ratio = (annualActualBudget / projectTotalAllocatedBudget) * 100;
        const rb = (projectTotalAllocatedBudget - projectTotalActualBudget);
        // const projectTotalBudget = 12;
        const html = `
            <div class="createtool-subtitle">
                <span class="crtitle btn-shadow">${yvalue.year} - ${ratio.toFixed(2)}%<i class="fas fa-caret-left"></i></span>
                <div class="content createtool-budget-forecast createtool-budget-forecast-con">
                    
                    ${acchtml}
        
                    <div class="header">
                        <div class="fill">
                            <span>Budget Amount</span>
                            <input type="text" value="$${projectTotalAllocatedBudget.toFixed(2)}" disabled>
                        </div>
                        <div class="fill">
                            <span>Remaining Budget</span>
                            <input type="text" value="$${rb.toFixed(2)}" disabled>
                        </div>
                        <div class="fill type">
                            <span>View Type</span>
                            <select name="" id="">
                                <option value="monthly">Monthly</option>
                                <option value="quarter">Quarterly</option>
                            </select>
                        </div>
                        <i class="fas fa-trash"></i>
                    </div><br>
                </div>
            </div>`;
        
        $('.request-createtool-budget-baselineforecast-capex').prepend(html);

        
    });

}
function fillCapexForecast(){
    console.log("START FILLING CAPEX FORECAST");
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const isOwner = $('#request-createtool-required-requestid').attr('sender');
    const forecastyearobj =  ACCUSER.getProject(projectid).Budget.getDistinctCapexForecastYearList();
    const capexobj = ACCUSER.getProject(projectid).Budget.getCapexObj();
    const projectTotalActualBudget = ACCUSER.getProject(projectid).Budget.getTotalCapexBudget();
    let projectTotalAllocatedBudget = 0;
    

    $.each(capexobj, function(key, bvalue){
            

        if(bvalue.type == "tm"){
            const material = ACCUSER.getProject(projectid).Budget.getMaterialCostByBudgetId(bvalue.id);
            const mahours = ACCUSER.getProject(projectid).Budget.getManhourCostByBudgetId(bvalue.id);
            const matv = isNaN(parseFloat(material)) ? 0 : parseFloat(material);
            const manv = isNaN(parseFloat(mahours)) ? 0 : parseFloat(mahours);
            // console.log(matv, manv);
            projectTotalAllocatedBudget += (matv + manv);
        }else if(bvalue.type == "supplier"){
            projectTotalAllocatedBudget += isNaN(parseFloat(bvalue.capexcost)) ? 0 : parseFloat(bvalue.capexcost);
        }

    });

    $('.request-createtool-budget-baselineforecast-capex').children('.createtool-subtitle').remove();
    $.each(forecastyearobj, function(key, yvalue){
        let acchtml = '';
        let annualActualBudget = 0;

        $.each(capexobj, function(key, value){
            const itemobj = ACCUSER.getProject(projectid).Item.getItemObj(value.itemid);
            const forecastobjlist = ACCUSER.getProject(projectid).Budget.getForecastObjByYear(yvalue.year);
            const forecastobjlistall = ACCUSER.getProject(projectid).Budget.getForecastObj();

            let tmAllotedBudget = 0;
            let supplierAllotedBudget = 0;
            let tmActualBudget = 0;
            let supplierActualBudget = 0;


            let tmHtmlGate = false;
            let supplierHtmlGate = false;

            if(value.type == "tm"){
                const material = ACCUSER.getProject(projectid).Budget.getMaterialCostByBudgetId(value.id);
                const mahours = ACCUSER.getProject(projectid).Budget.getManhourCostByBudgetId(value.id);
                const matv = isNaN(parseFloat(material)) ? 0 : parseFloat(material);
                const manv = isNaN(parseFloat(mahours)) ? 0 : parseFloat(mahours);
                tmAllotedBudget += (matv + manv);
                tmHtmlGate = true;
            }else if(value.type == "supplier"){
                supplierAllotedBudget += isNaN(parseFloat(value.capexcost)) ? 0 : parseFloat(value.capexcost);
                supplierHtmlGate = true;
            }




            if(tmHtmlGate){
                let fobtm = undefined;
                $.each(forecastobjlist, function(key, fvalue){
                    if(fvalue.type == "capextm" && fvalue.resourceid == value.id){
                        fobtm = fvalue;
                    }
                });

                let resourceActualBudgetAll = 0;
                // console.log('forecastobjlistall',forecastobjlistall);
                $.each(forecastobjlistall, function(key, favalue){
                    if(favalue.resourceid == value.id && favalue.type == "capextm"){
                        const zm1val = favalue.m1 == undefined || favalue.m1 == ""  ? 0 : isNaN(parseFloat(favalue.m1)) ? 0 : parseFloat(favalue.m1);
                        const zm2val = favalue.m2 == undefined || favalue.m2 == ""  ? 0 : isNaN(parseFloat(favalue.m2)) ? 0 : parseFloat(favalue.m2);
                        const zm3val = favalue.m3 == undefined || favalue.m3 == ""  ? 0 : isNaN(parseFloat(favalue.m3)) ? 0 : parseFloat(favalue.m3);
                        const zm4val = favalue.m4 == undefined || favalue.m4 == ""  ? 0 : isNaN(parseFloat(favalue.m4)) ? 0 : parseFloat(favalue.m4);
                        const zm5val = favalue.m5 == undefined || favalue.m5 == ""  ? 0 : isNaN(parseFloat(favalue.m5)) ? 0 : parseFloat(favalue.m5);
                        const zm6val = favalue.m6 == undefined || favalue.m6 == ""  ? 0 : isNaN(parseFloat(favalue.m6)) ? 0 : parseFloat(favalue.m6);
                        const zm7val = favalue.m7 == undefined || favalue.m7 == ""  ? 0 : isNaN(parseFloat(favalue.m7)) ? 0 : parseFloat(favalue.m7);
                        const zm8val = favalue.m8 == undefined || favalue.m8 == ""  ? 0 : isNaN(parseFloat(favalue.m8)) ? 0 : parseFloat(favalue.m8);
                        const zm9val = favalue.m9 == undefined || favalue.m9 == ""  ? 0 : isNaN(parseFloat(favalue.m9)) ? 0 : parseFloat(favalue.m9);
                        const zm10val = favalue.m10 == undefined || favalue.m10 == ""  ? 0 : isNaN(parseFloat(favalue.m10)) ? 0 : parseFloat(favalue.m10);
                        const zm11val = favalue.m11 == undefined || favalue.m11 == ""  ? 0 : isNaN(parseFloat(favalue.m11)) ? 0 : parseFloat(favalue.m11);
                        const zm12val = favalue.m12 == undefined || favalue.m12 == ""  ? 0 : isNaN(parseFloat(favalue.m12)) ? 0 : parseFloat(favalue.m12);

                        resourceActualBudgetAll += (zm1val + zm2val + zm3val + zm4val + zm5val + zm6val + zm7val + zm8val + zm9val + zm10val + zm11val + zm12val);
                    }
                });

                let m1valtm = "";
                let m2valtm = "";
                let m3valtm = "";
                let m4valtm = "";
                let m5valtm = "";
                let m6valtm = "";
                let m7valtm = "";
                let m8valtm = "";
                let m9valtm = "";
                let m10valtm = "";
                let m11valtm = "";
                let m12valtm = "";

                
                let tmfidhtml = fobtm == undefined ? "" : `fid="${fobtm.id}"`;
                if(fobtm != undefined){
                    m1valtm = fobtm.m1 == undefined ? "" : fobtm.m1;
                    m2valtm = fobtm.m2 == undefined ? "" : fobtm.m2;
                    m3valtm = fobtm.m3 == undefined ? "" : fobtm.m3;
                    m4valtm = fobtm.m4 == undefined ? "" : fobtm.m4;
                    m5valtm = fobtm.m5 == undefined ? "" : fobtm.m5;
                    m6valtm = fobtm.m6 == undefined ? "" : fobtm.m6;
                    m7valtm = fobtm.m7 == undefined ? "" : fobtm.m7;
                    m8valtm = fobtm.m8 == undefined ? "" : fobtm.m8;
                    m9valtm = fobtm.m9 == undefined ? "" : fobtm.m9;
                    m10valtm = fobtm.m10 == undefined ? "" : fobtm.m10;
                    m11valtm = fobtm.m11 == undefined ? "" : fobtm.m11;
                    m12valtm = fobtm.m12 == undefined ? "" : fobtm.m12;
                }
                
        
                let q1valtm = (isNaN(parseFloat(m1valtm)) ? 0 : parseFloat(m1valtm)) + (isNaN(parseFloat(m2valtm)) ? 0 : parseFloat(m2valtm)) + (isNaN(parseFloat(m3valtm)) ? 0 : parseFloat(m3valtm));
                let q2valtm = (isNaN(parseFloat(m4valtm)) ? 0 : parseFloat(m4valtm)) + (isNaN(parseFloat(m5valtm)) ? 0 : parseFloat(m5valtm)) + (isNaN(parseFloat(m6valtm)) ? 0 : parseFloat(m6valtm));
                let q3valtm = (isNaN(parseFloat(m7valtm)) ? 0 : parseFloat(m7valtm)) + (isNaN(parseFloat(m8valtm)) ? 0 : parseFloat(m8valtm)) + (isNaN(parseFloat(m9valtm)) ? 0 : parseFloat(m9valtm));
                let q4valtm = (isNaN(parseFloat(m10valtm)) ? 0 : parseFloat(m10valtm)) + (isNaN(parseFloat(m11valtm)) ? 0 : parseFloat(m11valtm)) + (isNaN(parseFloat(m12valtm)) ? 0 : parseFloat(m12valtm));

                tmActualBudget = 
                (isNaN(parseFloat(m1valtm)) ? 0 : parseFloat(m1valtm)) + 
                (isNaN(parseFloat(m2valtm)) ? 0 : parseFloat(m2valtm)) + 
                (isNaN(parseFloat(m3valtm)) ? 0 : parseFloat(m3valtm)) + 
                (isNaN(parseFloat(m4valtm)) ? 0 : parseFloat(m4valtm)) + 
                (isNaN(parseFloat(m5valtm)) ? 0 : parseFloat(m5valtm)) + 
                (isNaN(parseFloat(m6valtm)) ? 0 : parseFloat(m6valtm)) + 
                (isNaN(parseFloat(m7valtm)) ? 0 : parseFloat(m7valtm)) + 
                (isNaN(parseFloat(m8valtm)) ? 0 : parseFloat(m8valtm)) + 
                (isNaN(parseFloat(m9valtm)) ? 0 : parseFloat(m9valtm)) + 
                (isNaN(parseFloat(m10valtm)) ? 0 : parseFloat(m10valtm)) + 
                (isNaN(parseFloat(m11valtm)) ? 0 : parseFloat(m11valtm)) + 
                (isNaN(parseFloat(m12valtm)) ? 0 : parseFloat(m12valtm));

                annualActualBudget += tmActualBudget;
                let tmRemainingBudget = (tmAllotedBudget - resourceActualBudgetAll); 
                let saveHtml = isOwner == "viewer" ? "" : `<button class="btn-shadow createtool-budget-forecast-save">Save</button>`;
                const html = `
                    <div id="forecastwidget_${yvalue.year}" year="${yvalue.year}" resid="${value.id}" type="capextm" ${tmfidhtml} class="createtool-subtitle">
                        <span class="crtitle crtitle-forecast-year btn-shadow"><input status="done" type="text" value="${itemobj.name} - SUPPLIER(TM)" disabled><span>$${tmActualBudget.toFixed(2)}</span><i class="fas fa-caret-left"></i></span>
                        <div class="content createtool-budget-forecast-year">
                            <span class="instruction">Total Budget: $${tmAllotedBudget.toFixed(2)} &nbsp;&nbsp; Spent Budget: $${tmActualBudget.toFixed(2)} &nbsp;&nbsp; Remaining Budget: $${tmRemainingBudget.toFixed(2)}</span>
                            <div class="createtool-budget-forecast-year-widget calendar-monthly hidden">
                                <div class="widget jan">
                                    <span class="title">January</span>
                                    <input value="${m1valtm}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m1" placeholder="$">
                                </div>
                                <div class="widget feb">
                                    <span class="title">February</span>
                                    <input value="${m2valtm}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m2" placeholder="$">
                                </div>
                                <div class="widget mar">
                                    <span class="title">March</span>
                                    <input value="${m3valtm}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m3" placeholder="$">
                                </div>
                                <div class="widget apr">
                                    <span class="title">April</span>
                                    <input value="${m4valtm}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m4" placeholder="$">
                                </div>
                                <div class="widget may">
                                    <span class="title">May</span>
                                    <input value="${m5valtm}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m5" placeholder="$">
                                </div>
                                <div class="widget jun">
                                    <span class="title">June</span>
                                    <input value="${m6valtm}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m6" placeholder="$">
                                </div>
                                <div class="widget jul">
                                    <span class="title">July</span>
                                    <input value="${m7valtm}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m7" placeholder="$">
                                </div>
                                <div class="widget aug">
                                    <span class="title">August</span>
                                    <input value="${m8valtm}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m8" placeholder="$">
                                </div>
                                <div class="widget sep">
                                    <span class="title">September</span>
                                    <input value="${m9valtm}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m9" placeholder="$">
                                </div>
                                <div class="widget oct">
                                    <span class="title">October</span>
                                    <input value="${m10valtm}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m10" placeholder="$">
                                </div>
                                <div class="widget nov">
                                    <span class="title">November</span>
                                    <input value="${m11valtm}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m11" placeholder="$">
                                </div>
                                <div class="widget dec">
                                    <span class="title">December</span>
                                    <input value="${m12valtm}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m12" placeholder="$">
                                </div>
                            </div>
                            <div class="createtool-budget-forecast-year-widget calendar-quarter hidden">
                                <div class="widget q1">
                                    <span class="title">Q1</span>
                                    <input value="${q1valtm}" class="createtool-budget-forecast-year-widget-q" type="text" cid="q1" placeholder="$">
                                </div>
                                <div class="widget q2">
                                    <span class="title">Q2</span>
                                    <input value="${q2valtm}" class="createtool-budget-forecast-year-widget-q" type="text" cid="q2" placeholder="$">
                                </div>
                                <div class="widget q3">
                                    <span class="title">Q3</span>
                                    <input value="${q3valtm}" class="createtool-budget-forecast-year-widget-q" type="text" cid="q3" placeholder="$">
                                </div>
                                <div class="widget q4">
                                    <span class="title">Q4</span>
                                    <input value="${q4valtm}" class="createtool-budget-forecast-year-widget-q" type="text" cid="q4" placeholder="$">
                                </div>
                            </div>
                            ${saveHtml}
                        </div>
                    </div>`;
                acchtml += html;
            }
            if(supplierHtmlGate){
                let fobsupplier = undefined;
                $.each(forecastobjlist, function(key, fvalue){
                    if(fvalue.type == "capexsupplier" && fvalue.resourceid == value.id){
                        fobsupplier = fvalue;
                    }
                });

                let resourceActualBudgetAll = 0;
                // console.log('forecastobjlistall',forecastobjlistall);
                $.each(forecastobjlistall, function(key, favalue){
                    if(favalue.resourceid == value.id && favalue.type == "capexsupplier"){
                        const zm1val = favalue.m1 == undefined || favalue.m1 == ""  ? 0 : isNaN(parseFloat(favalue.m1)) ? 0 : parseFloat(favalue.m1);
                        const zm2val = favalue.m2 == undefined || favalue.m2 == ""  ? 0 : isNaN(parseFloat(favalue.m2)) ? 0 : parseFloat(favalue.m2);
                        const zm3val = favalue.m3 == undefined || favalue.m3 == ""  ? 0 : isNaN(parseFloat(favalue.m3)) ? 0 : parseFloat(favalue.m3);
                        const zm4val = favalue.m4 == undefined || favalue.m4 == ""  ? 0 : isNaN(parseFloat(favalue.m4)) ? 0 : parseFloat(favalue.m4);
                        const zm5val = favalue.m5 == undefined || favalue.m5 == ""  ? 0 : isNaN(parseFloat(favalue.m5)) ? 0 : parseFloat(favalue.m5);
                        const zm6val = favalue.m6 == undefined || favalue.m6 == ""  ? 0 : isNaN(parseFloat(favalue.m6)) ? 0 : parseFloat(favalue.m6);
                        const zm7val = favalue.m7 == undefined || favalue.m7 == ""  ? 0 : isNaN(parseFloat(favalue.m7)) ? 0 : parseFloat(favalue.m7);
                        const zm8val = favalue.m8 == undefined || favalue.m8 == ""  ? 0 : isNaN(parseFloat(favalue.m8)) ? 0 : parseFloat(favalue.m8);
                        const zm9val = favalue.m9 == undefined || favalue.m9 == ""  ? 0 : isNaN(parseFloat(favalue.m9)) ? 0 : parseFloat(favalue.m9);
                        const zm10val = favalue.m10 == undefined || favalue.m10 == ""  ? 0 : isNaN(parseFloat(favalue.m10)) ? 0 : parseFloat(favalue.m10);
                        const zm11val = favalue.m11 == undefined || favalue.m11 == ""  ? 0 : isNaN(parseFloat(favalue.m11)) ? 0 : parseFloat(favalue.m11);
                        const zm12val = favalue.m12 == undefined || favalue.m12 == ""  ? 0 : isNaN(parseFloat(favalue.m12)) ? 0 : parseFloat(favalue.m12);

                        resourceActualBudgetAll += (zm1val + zm2val + zm3val + zm4val + zm5val + zm6val + zm7val + zm8val + zm9val + zm10val + zm11val + zm12val);
                    }
                });

                let m1valsupplier = "";
                let m2valsupplier = "";
                let m3valsupplier = "";
                let m4valsupplier = "";
                let m5valsupplier = "";
                let m6valsupplier = "";
                let m7valsupplier = "";
                let m8valsupplier = "";
                let m9valsupplier = "";
                let m10valsupplier = "";
                let m11valsupplier = "";
                let m12valsupplier = "";

                let supplierfidhtml = fobsupplier == undefined ? "" : `fid="${fobsupplier.id}"`;
                if(fobsupplier != undefined){
                    m1valsupplier = fobsupplier.m1 == undefined ? "" : fobsupplier.m1;
                    m2valsupplier = fobsupplier.m2 == undefined ? "" : fobsupplier.m2;
                    m3valsupplier = fobsupplier.m3 == undefined ? "" : fobsupplier.m3;
                    m4valsupplier = fobsupplier.m4 == undefined ? "" : fobsupplier.m4;
                    m5valsupplier = fobsupplier.m5 == undefined ? "" : fobsupplier.m5;
                    m6valsupplier = fobsupplier.m6 == undefined ? "" : fobsupplier.m6;
                    m7valsupplier = fobsupplier.m7 == undefined ? "" : fobsupplier.m7;
                    m8valsupplier = fobsupplier.m8 == undefined ? "" : fobsupplier.m8;
                    m9valsupplier = fobsupplier.m9 == undefined ? "" : fobsupplier.m9;
                    m10valsupplier = fobsupplier.m10 == undefined ? "" : fobsupplier.m10;
                    m11valsupplier = fobsupplier.m11 == undefined ? "" : fobsupplier.m11;
                    m12valsupplier = fobsupplier.m12 == undefined ? "" : fobsupplier.m12;
                }
                
        
                let q1valsupplier = (isNaN(parseFloat(m1valsupplier)) ? 0 : parseFloat(m1valsupplier)) + (isNaN(parseFloat(m2valsupplier)) ? 0 : parseFloat(m2valsupplier)) + (isNaN(parseFloat(m3valsupplier)) ? 0 : parseFloat(m3valsupplier));
                let q2valsupplier = (isNaN(parseFloat(m4valsupplier)) ? 0 : parseFloat(m4valsupplier)) + (isNaN(parseFloat(m5valsupplier)) ? 0 : parseFloat(m5valsupplier)) + (isNaN(parseFloat(m6valsupplier)) ? 0 : parseFloat(m6valsupplier));
                let q3valsupplier = (isNaN(parseFloat(m7valsupplier)) ? 0 : parseFloat(m7valsupplier)) + (isNaN(parseFloat(m8valsupplier)) ? 0 : parseFloat(m8valsupplier)) + (isNaN(parseFloat(m9valsupplier)) ? 0 : parseFloat(m9valsupplier));
                let q4valsupplier = (isNaN(parseFloat(m10valsupplier)) ? 0 : parseFloat(m10valsupplier)) + (isNaN(parseFloat(m11valsupplier)) ? 0 : parseFloat(m11valsupplier)) + (isNaN(parseFloat(m12valsupplier)) ? 0 : parseFloat(m12valsupplier));
                

                supplierActualBudget = 
                (isNaN(parseFloat(m1valsupplier)) ? 0 : parseFloat(m1valsupplier)) + 
                (isNaN(parseFloat(m2valsupplier)) ? 0 : parseFloat(m2valsupplier)) + 
                (isNaN(parseFloat(m3valsupplier)) ? 0 : parseFloat(m3valsupplier)) + 
                (isNaN(parseFloat(m4valsupplier)) ? 0 : parseFloat(m4valsupplier)) + 
                (isNaN(parseFloat(m5valsupplier)) ? 0 : parseFloat(m5valsupplier)) + 
                (isNaN(parseFloat(m6valsupplier)) ? 0 : parseFloat(m6valsupplier)) + 
                (isNaN(parseFloat(m7valsupplier)) ? 0 : parseFloat(m7valsupplier)) + 
                (isNaN(parseFloat(m8valsupplier)) ? 0 : parseFloat(m8valsupplier)) + 
                (isNaN(parseFloat(m9valsupplier)) ? 0 : parseFloat(m9valsupplier)) + 
                (isNaN(parseFloat(m10valsupplier)) ? 0 : parseFloat(m10valsupplier)) + 
                (isNaN(parseFloat(m11valsupplier)) ? 0 : parseFloat(m11valsupplier)) + 
                (isNaN(parseFloat(m12valsupplier)) ? 0 : parseFloat(m12valsupplier));

                annualActualBudget += supplierActualBudget;
                let supplierRemainingBudget = (supplierAllotedBudget - resourceActualBudgetAll);

                const html = `
                    <div id="forecastwidget_${yvalue.year}" year="${yvalue.year}" resid="${value.id}" type="capexsupplier" ${supplierfidhtml} class="createtool-subtitle">
                        <span class="crtitle crtitle-forecast-year btn-shadow"><input status="done" type="text" value="${itemobj.name} - SUPPLIER(LUMPSUM)" disabled><span>$${supplierActualBudget.toFixed(2)}</span><i class="fas fa-caret-left"></i></span>
                        <div class="content createtool-budget-forecast-year">
                            <span class="instruction">Total Budget: $${supplierAllotedBudget.toFixed(2)} &nbsp;&nbsp; Spent Budget: $${supplierActualBudget.toFixed(2)} &nbsp;&nbsp; Remaining Budget: $${supplierRemainingBudget.toFixed(2)}</span>
                            <div class="createtool-budget-forecast-year-widget calendar-monthly hidden">
                                <div class="widget jan">
                                    <span class="title">January</span>
                                    <input value="${m1valsupplier}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m1" placeholder="$">
                                </div>
                                <div class="widget feb">
                                    <span class="title">February</span>
                                    <input value="${m2valsupplier}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m2" placeholder="$">
                                </div>
                                <div class="widget mar">
                                    <span class="title">March</span>
                                    <input value="${m3valsupplier}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m3" placeholder="$">
                                </div>
                                <div class="widget apr">
                                    <span class="title">April</span>
                                    <input value="${m4valsupplier}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m4" placeholder="$">
                                </div>
                                <div class="widget may">
                                    <span class="title">May</span>
                                    <input value="${m5valsupplier}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m5" placeholder="$">
                                </div>
                                <div class="widget jun">
                                    <span class="title">June</span>
                                    <input value="${m6valsupplier}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m6" placeholder="$">
                                </div>
                                <div class="widget jul">
                                    <span class="title">July</span>
                                    <input value="${m7valsupplier}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m7" placeholder="$">
                                </div>
                                <div class="widget aug">
                                    <span class="title">August</span>
                                    <input value="${m8valsupplier}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m8" placeholder="$">
                                </div>
                                <div class="widget sep">
                                    <span class="title">September</span>
                                    <input value="${m9valsupplier}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m9" placeholder="$">
                                </div>
                                <div class="widget oct">
                                    <span class="title">October</span>
                                    <input value="${m10valsupplier}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m10" placeholder="$">
                                </div>
                                <div class="widget nov">
                                    <span class="title">November</span>
                                    <input value="${m11valsupplier}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m11" placeholder="$">
                                </div>
                                <div class="widget dec">
                                    <span class="title">December</span>
                                    <input value="${m12valsupplier}" class="createtool-budget-forecast-year-widget-m" type="text" cid="m12" placeholder="$">
                                </div>
                            </div>
                            <div class="createtool-budget-forecast-year-widget calendar-quarter hidden">
                                <div class="widget q1">
                                    <span class="title">Q1</span>
                                    <input value="${q1valsupplier}" class="createtool-budget-forecast-year-widget-q" type="text" cid="q1" placeholder="$">
                                </div>
                                <div class="widget q2">
                                    <span class="title">Q2</span>
                                    <input value="${q2valsupplier}" class="createtool-budget-forecast-year-widget-q" type="text" cid="q2" placeholder="$">
                                </div>
                                <div class="widget q3">
                                    <span class="title">Q3</span>
                                    <input value="${q3valsupplier}" class="createtool-budget-forecast-year-widget-q" type="text" cid="q3" placeholder="$">
                                </div>
                                <div class="widget q4">
                                    <span class="title">Q4</span>
                                    <input value="${q4valsupplier}" class="createtool-budget-forecast-year-widget-q" type="text" cid="q4" placeholder="$">
                                </div>
                            </div>
                            <button class="btn-shadow createtool-budget-forecast-save">Save</button>
                        </div>
                    </div>`;
                acchtml += html;
            }

        });

        const ratio = (annualActualBudget / projectTotalAllocatedBudget) * 100;
        const rb = (projectTotalAllocatedBudget - projectTotalActualBudget);

        const html = `
            <div class="createtool-subtitle">
                <span class="crtitle btn-shadow">${yvalue.year} - ${ratio.toFixed(2)}%<i class="fas fa-caret-left"></i></span>
                <div class="content createtool-budget-forecast createtool-budget-forecast-con">
                    
                    ${acchtml}
        
                    <div class="header">
                        <div class="fill">
                            <span>Budget Amount</span>
                            <input type="text" value="$${projectTotalAllocatedBudget.toFixed(2)}" disabled>
                        </div>
                        <div class="fill">
                            <span>Remaining Budget</span>
                            <input type="text" value="$${rb.toFixed(2)}" disabled>
                        </div>
                        <div class="fill type">
                            <span>View Type</span>
                            <select name="" id="">
                                <option value="monthly">Monthly</option>
                                <option value="quarter">Quarterly</option>
                            </select>
                        </div>
                        <i class="fas fa-trash"></i>
                    </div><br>
                </div>
            </div>`;
        
        $('.request-createtool-budget-baselineforecast-capex').prepend(html);


    });
}
function calculateForecastMonthly(main){
    const mcon = main.children('.content').children('.calendar-monthly');
    const qcon = main.children('.content').children('.calendar-quarter');

    const mobj = {
        'm1' : "",
        'm2' : "",
        'm3' : "",
        'm4' : "",
        'm5' : "",
        'm6' : "",
        'm7' : "",
        'm8' : "",
        'm9' : "",
        'm10' : "",
        'm11' : "",
        'm12' : "",
    }
    mcon.children('.widget').each(function(){
        const v = $(this).children('input');
        mobj[v.attr("cid")] = v.val();
    });

    const qobj = {
        'q1' : (isNaN(parseFloat(mobj.m1)) ? 0 : parseFloat(mobj.m1)) + (isNaN(parseFloat(mobj.m2)) ? 0 : parseFloat(mobj.m2)) + (isNaN(parseFloat(mobj.m3)) ? 0 : parseFloat(mobj.m3)),
        'q2' : (isNaN(parseFloat(mobj.m4)) ? 0 : parseFloat(mobj.m4)) + (isNaN(parseFloat(mobj.m5)) ? 0 : parseFloat(mobj.m5)) + (isNaN(parseFloat(mobj.m6)) ? 0 : parseFloat(mobj.m6)),
        'q3' : (isNaN(parseFloat(mobj.m7)) ? 0 : parseFloat(mobj.m7)) + (isNaN(parseFloat(mobj.m8)) ? 0 : parseFloat(mobj.m8)) + (isNaN(parseFloat(mobj.m9)) ? 0 : parseFloat(mobj.m9)),
        'q4' : (isNaN(parseFloat(mobj.m10)) ? 0 : parseFloat(mobj.m10)) + (isNaN(parseFloat(mobj.m11)) ? 0 : parseFloat(mobj.m11)) + (isNaN(parseFloat(mobj.m12)) ? 0 : parseFloat(mobj.m12)),
    }

    console.log(mobj, qobj);
    qcon.children('.widget').each(function(){
        const v = $(this).children('input');
        v.val(qobj[v.attr("cid")].toFixed(2));
    });


}
function calculateForecastQuarterly(main){
    const mcon = main.children('.content').children('.calendar-monthly');
    const qcon = main.children('.content').children('.calendar-quarter');

    const qobj = {
        'q1' : "",
        'q2' : "",
        'q3' : "",
        'q4' : "",
    }
    qcon.children('.widget').each(function(){
        const v = $(this).children('input');
        qobj[v.attr("cid")] = v.val();
    });

    const mobj = {
        'm1' : (isNaN(parseFloat(qobj["q1"])) ? 0 : parseFloat(qobj["q1"])) / 3,
        'm2' : (isNaN(parseFloat(qobj["q1"])) ? 0 : parseFloat(qobj["q1"])) / 3,
        'm3' : (isNaN(parseFloat(qobj["q1"])) ? 0 : parseFloat(qobj["q1"])) / 3,
        'm4' : (isNaN(parseFloat(qobj["q2"])) ? 0 : parseFloat(qobj["q2"])) / 3,
        'm5' : (isNaN(parseFloat(qobj["q2"])) ? 0 : parseFloat(qobj["q2"])) / 3,
        'm6' : (isNaN(parseFloat(qobj["q2"])) ? 0 : parseFloat(qobj["q2"])) / 3,
        'm7' : (isNaN(parseFloat(qobj["q3"])) ? 0 : parseFloat(qobj["q3"])) / 3,
        'm8' : (isNaN(parseFloat(qobj["q3"])) ? 0 : parseFloat(qobj["q3"])) / 3,
        'm9' : (isNaN(parseFloat(qobj["q3"])) ? 0 : parseFloat(qobj["q3"])) / 3,
        'm10' : (isNaN(parseFloat(qobj["q4"])) ? 0 : parseFloat(qobj["q4"])) / 3,
        'm11' : (isNaN(parseFloat(qobj["q4"])) ? 0 : parseFloat(qobj["q4"])) / 3,
        'm12' : (isNaN(parseFloat(qobj["q4"])) ? 0 : parseFloat(qobj["q4"])) / 3,
    }
    // console.log(mobj, qobj);

    // mcon.children('.widget').each(function(){
    //     const v = $(this).children('input');
    //     v.val(mobj[v.attr("cid").toFixed(2)]);
    // });

}
    // OPEX Dashboard
$(document).on('keyup', '.createtool-opex-itemlist-widget-rate', function(){
    const rate = $(this).val();
    const hours = $(this).siblings('.createtool-opex-itemlist-widget-hours').val();
    $(this).siblings('.createtool-opex-itemlist-widget-total').val(`$${(rate * hours).toFixed(2)}`).attr('amt', (rate * hours).toFixed(2));
    fillCreateToolBudgetingOpexDashboardTotals();
});
$(document).on('click', '.createtool-opex-itemlist-widget-save', function(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    
    const callback=()=>{
        fillCreateToolBudgetingOpexDashboard();
    }
    const options = {
        'id' : $(this).attr('aid'),
        'rate' : $(this).siblings('.rate').val(),
        'role' : $(this).siblings('.role').val()
    };
    console.log(options);
    ACCUSER.getProject(projectid).updateTmpAccountRateRoll(options, callback);


});

    // BASELINE OPEX FORECAST
$(document).on('click', '#createtool-budget-forecast-addyear-opex', function(){
    const d = new Date();
    let year = d.getFullYear();
    $('#createtool-subtitle-popup-addyear-opex').children('select').empty();
    for(i=0; i<20; i++){
        $('#createtool-subtitle-popup-addyear-opex').children('select').append(`
            <option value="${year}">${year}</option>
        `);
        year++;
    }
    $('#createtool-subtitle-popup-addyear-opex').css('display', 'flex').show();
});
$(document).on('click', '#createtool-subtitle-popup-addyear-btn-opex', function(){
    const year = $(this).siblings('select').val();
    $('#createtool-subtitle-popup-addyear-opex').css('display', 'none').hide();
    
    
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const trobj = ACCUSER.getProject(projectid).TaskResource.getDistinctIdList();
    const forecastyearobj =  ACCUSER.getProject(projectid).Budget.getDistinctOpexForecastYearList();
    
    let acchtml = '';
    let createGate = true;
    $.each(forecastyearobj, function(key, value){
        if(value.year == year){
            createGate = false;
        }
    });

    if(createGate){
        $.each(trobj, function(key, value){
            if(value.id.split('-')[0] == 'TA'){
                const accobj = ACCUSER.getProject(projectid).getTmpAccountObj(value.id);
                const allotedHours = ACCUSER.getProject(projectid).TaskResource.getAccidAllotedHoursByProjectid({"accid" : value.id});
                const allotedBudget = (isNaN(parseFloat(accobj.rate)) ? 0 : parseFloat(accobj.rate)) * (isNaN(parseFloat(allotedHours)) ? 0 : parseFloat(allotedHours));
                const resourceTotalActualBudget = ACCUSER.getProject(projectid).Budget.getOpexBudgetByResourceId(value.id);
                console.log(accobj.name, accobj.rate,  allotedHours);
                const rb = (allotedBudget - resourceTotalActualBudget);
                const html = `
                <div year="${year}" resid="${value.id}" type="opex" class="createtool-subtitle">
                    <span class="crtitle crtitle-forecast-year btn-shadow"><input status="done" type="text" value="${accobj.name}" disabled><span>0%</span><i class="fas fa-caret-left"></i></span>
                    <div class="content createtool-budget-forecast-year">
                        <span class="instruction">Total Budget: $${allotedBudget.toFixed(2)} &nbsp;&nbsp; Remaining Budget: $${rb.toFixed(2)}</span>
                        <div class="createtool-budget-forecast-year-widget calendar-monthly hidden">
                            <div class="widget jan">
                                <span class="title">January</span>
                                <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m1" placeholder="$">
                            </div>
                            <div class="widget feb">
                                <span class="title">February</span>
                                <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m2" placeholder="$">
                            </div>
                            <div class="widget mar">
                                <span class="title">March</span>
                                <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m3" placeholder="$">
                            </div>
                            <div class="widget apr">
                                <span class="title">April</span>
                                <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m4" placeholder="$">
                            </div>
                            <div class="widget may">
                                <span class="title">May</span>
                                <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m5" placeholder="$">
                            </div>
                            <div class="widget jun">
                                <span class="title">June</span>
                                <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m6" placeholder="$">
                            </div>
                            <div class="widget jul">
                                <span class="title">July</span>
                                <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m7" placeholder="$">
                            </div>
                            <div class="widget aug">
                                <span class="title">August</span>
                                <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m8" placeholder="$">
                            </div>
                            <div class="widget sep">
                                <span class="title">September</span>
                                <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m9" placeholder="$">
                            </div>
                            <div class="widget oct">
                                <span class="title">October</span>
                                <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m10" placeholder="$">
                            </div>
                            <div class="widget nov">
                                <span class="title">November</span>
                                <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m11" placeholder="$">
                            </div>
                            <div class="widget dec">
                                <span class="title">December</span>
                                <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m12" placeholder="$">
                            </div>
                        </div>
                        <div class="createtool-budget-forecast-year-widget calendar-quarter hidden">
                            <div class="widget q1">
                                <span class="title">Q1</span>
                                <input class="createtool-budget-forecast-year-widget-q" type="text" cid="q1" placeholder="$">
                            </div>
                            <div class="widget q2">
                                <span class="title">Q2</span>
                                <input class="createtool-budget-forecast-year-widget-q" type="text" cid="q2" placeholder="$">
                            </div>
                            <div class="widget q3">
                                <span class="title">Q3</span>
                                <input class="createtool-budget-forecast-year-widget-q" type="text" cid="q3" placeholder="$">
                            </div>
                            <div class="widget q4">
                                <span class="title">Q4</span>
                                <input class="createtool-budget-forecast-year-widget-q" type="text" cid="q4" placeholder="$">
                            </div>
                        </div>
                        <button class="btn-shadow createtool-budget-forecast-save">Save</button>
                    </div>
                </div>`;
            acchtml += html;
            }
        });

        const html = `
        <div class="createtool-subtitle">
            <span class="crtitle btn-shadow">${year} - 0%<i class="fas fa-caret-left"></i></span>
            <div class="content createtool-budget-forecast createtool-budget-forecast-con">
                
                ${acchtml}

                <div class="header">
                    <div class="fill">
                        <span>Budget Amount</span>
                        <input type="text" value="$1200.00" disabled>
                    </div>
                    <div class="fill">
                        <span>Remaining Budget</span>
                        <input type="text" value="$1200.00" disabled>
                    </div>
                    <div class="fill type">
                        <span>View Type</span>
                        <select name="" id="">
                            <option value="monthly">Monthly</option>
                            <option value="quarter">Quarterly</option>
                        </select>
                    </div>
                    <i class="fas fa-trash"></i>
                </div><br>
            </div>
        </div>`;

        $('.request-createtool-budget-baselineforecast-opex').prepend(html);
    }else{
        showNotification("Add Error", "Year Already Exists");
    }
});
$(document).on('click', '.createtool-budget-forecast-save', function(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const main = $(this).parent('.content').parent('.createtool-subtitle');
    const year = main.attr('year');
    const id = main.attr('fid');
    const type = main.attr('type');
    const resourceid = main.attr('resid');
    const mcon = $(this).siblings('.calendar-monthly');
    const qcon = $(this).siblings('.calendar-quarter');
    const viewtype = $(this).parent('.createtool-budget-forecast-year').parent('.createtool-subtitle').siblings('.header').children('.fill.type').children('select').val();
    console.log(viewtype);
    let options = {
        'id' : id == undefined ? rngProjectBudgetForecastId() : id,
        'projectid' : projectid,
        'resourceid' : resourceid,
        'year' : year,
        'type' : type,
        'm1' : "",
        'm2' : "",
        'm3' : "",
        'm4' : "",
        'm5' : "",
        'm6' : "",
        'm7' : "",
        'm8' : "",
        'm9' : "",
        'm10' : "",
        'm11' : "",
        'm12' : "",
    };

    if(viewtype == "monthly"){
        mcon.children('.widget').each(function(){
            const v = $(this).children('input');
            options[v.attr("cid")] = v.val();
        });
    }else if(viewtype == "quarter"){
        qcon.children('.widget').each(function(){
            const v = $(this).children('input');
            // options[v.attr("cid")] = v.val();
            console.log('pekpek',v.attr('cid'), v.val());
            if(v.attr('cid') == "q1"){
                const amt = (parseFloat(v.val()) / 3);
                options.m1 = amt.toFixed(2);
                options.m2 = amt.toFixed(2);
                options.m3 = amt.toFixed(2);
            }
            if(v.attr('cid') == "q2"){
                const amt = (parseFloat(v.val()) / 3);
                console.log(amt);
                options.m4 = amt.toFixed(2);
                options.m5 = amt.toFixed(2);
                options.m6 = amt.toFixed(2);
            }
            if(v.attr('cid') == "q3"){
                const amt = (parseFloat(v.val()) / 3);
                options.m7 = amt.toFixed(2);
                options.m8 = amt.toFixed(2);
                options.m9 = amt.toFixed(2);
            }
            if(v.attr('cid') == "q4"){
                const amt = (parseFloat(v.val()) / 3);
                options.m10 = amt.toFixed(2);
                options.m11 = amt.toFixed(2);
                options.m12 = amt.toFixed(2);
            }
        });
    }
    

    const callback=()=>{
        // console.log('ehem', options);
        fillOpexForecast();
        fillCapexForecast();
    }
    ACCUSER.getProject(projectid).Budget.createForecast(options, callback);


});
$(document).on('keyup', '.createtool-budget-forecast-year-widget-m', function(){
    const main = $(this).parent('.widget').parent('.createtool-budget-forecast-year-widget').parent('.content').parent('.createtool-subtitle');
    calculateForecastMonthly(main);
});
$(document).on('keyup', '.createtool-budget-forecast-year-widget-q', function(){
    const main = $(this).parent('.widget').parent('.createtool-budget-forecast-year-widget').parent('.content').parent('.createtool-subtitle');
    calculateForecastQuarterly(main);
});

// BASELINE CAPEX FORECAST
$(document).on('click', '#createtool-budget-forecast-addyear-capex', function(){
    const d = new Date();
    let year = d.getFullYear();
    $('#createtool-subtitle-popup-addyear-capex').children('select').empty();
    for(i=0; i<20; i++){
        $('#createtool-subtitle-popup-addyear-capex').children('select').append(`
            <option value="${year}">${year}</option>
        `);
        year++;
    }
    $('#createtool-subtitle-popup-addyear-capex').css('display', 'flex').show();
});
$(document).on('click', '#createtool-subtitle-popup-addyear-btn-capex', function(){
    const year = $(this).siblings('select').val();
    $('#createtool-subtitle-popup-addyear-capex').css('display', 'none').hide();
    
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const forecastyearobj =  ACCUSER.getProject(projectid).Budget.getDistinctCapexForecastYearList();
    // const trobj = ACCUSER.getProject(projectid).TaskResource.getDistinctIdList();
    const capexobj = ACCUSER.getProject(projectid).Budget.getCapexObj();
    let acchtml = '';
    let createGate = true;
    $.each(forecastyearobj, function(key, value){
        if(value.year == year){
            createGate = false;
        }
    });
    if(createGate){
        $.each(capexobj, function(key, value){
            // const accobj = ACCUSER.getProject(projectid).getTmpSupplierObj(value.id);
            const itemobj = ACCUSER.getProject(projectid).Item.getItemObj(value.itemid);
            // const budgetobj = ACCUSER.getProject(projectid).Budget.getObjByVendor(value.id);
            let allotedBudget = 0;
            // console.log(budgetobj);

            let tmAllotedBudget = 0;
            let supplierAllotedBudget = 0;
            let tmHtmlGate = false;
            let supplierHtmlGate = false;

            
            if(value.type == "tm"){
                const material = ACCUSER.getProject(projectid).Budget.getMaterialCostByBudgetId(value.id);
                const mahours = ACCUSER.getProject(projectid).Budget.getManhourCostByBudgetId(value.id);
                const matv = isNaN(parseFloat(material)) ? 0 : parseFloat(material);
                const manv = isNaN(parseFloat(mahours)) ? 0 : parseFloat(mahours);
                tmAllotedBudget += (matv + manv);
                tmHtmlGate = true;
            }else if(value.type == "supplier"){
                supplierAllotedBudget += isNaN(parseFloat(value.capexcost)) ? 0 : parseFloat(value.capexcost);
                supplierHtmlGate = true;
            }

            if(tmHtmlGate){
                const projectTotalActualBudget = ACCUSER.getProject(projectid).Budget.getCapexBudgetByResourceIdAndType(value.id, "capextm");
                const rb = (tmAllotedBudget - projectTotalActualBudget); 
                const html = `
                    <div year="${year}" resid="${value.id}" type="capextm" class="createtool-subtitle">
                        <span class="crtitle crtitle-forecast-year btn-shadow"><input status="done" type="text" value="${itemobj.name} - SUPPLIER(TM)" disabled><span>0%</span><i class="fas fa-caret-left"></i></span>
                        <div class="content createtool-budget-forecast-year">
                            <span class="instruction">Total Budget: $${tmAllotedBudget.toFixed(2)} &nbsp;&nbsp; Remaining Budget: $${rb.toFixed(2)}</span>
                            <div class="createtool-budget-forecast-year-widget calendar-monthly hidden">
                                <div class="widget jan">
                                    <span class="title">January</span>
                                    <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m1" placeholder="$">
                                </div>
                                <div class="widget feb">
                                    <span class="title">February</span>
                                    <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m2" placeholder="$">
                                </div>
                                <div class="widget mar">
                                    <span class="title">March</span>
                                    <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m3" placeholder="$">
                                </div>
                                <div class="widget apr">
                                    <span class="title">April</span>
                                    <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m4" placeholder="$">
                                </div>
                                <div class="widget may">
                                    <span class="title">May</span>
                                    <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m5" placeholder="$">
                                </div>
                                <div class="widget jun">
                                    <span class="title">June</span>
                                    <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m6" placeholder="$">
                                </div>
                                <div class="widget jul">
                                    <span class="title">July</span>
                                    <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m7" placeholder="$">
                                </div>
                                <div class="widget aug">
                                    <span class="title">August</span>
                                    <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m8" placeholder="$">
                                </div>
                                <div class="widget sep">
                                    <span class="title">September</span>
                                    <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m9" placeholder="$">
                                </div>
                                <div class="widget oct">
                                    <span class="title">October</span>
                                    <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m10" placeholder="$">
                                </div>
                                <div class="widget nov">
                                    <span class="title">November</span>
                                    <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m11" placeholder="$">
                                </div>
                                <div class="widget dec">
                                    <span class="title">December</span>
                                    <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m12" placeholder="$">
                                </div>
                            </div>
                            <div class="createtool-budget-forecast-year-widget calendar-quarter hidden">
                                <div class="widget q1">
                                    <span class="title">Q1</span>
                                    <input class="createtool-budget-forecast-year-widget-q" type="text" cid="q1" placeholder="$">
                                </div>
                                <div class="widget q2">
                                    <span class="title">Q2</span>
                                    <input class="createtool-budget-forecast-year-widget-q" type="text" cid="q2" placeholder="$">
                                </div>
                                <div class="widget q3">
                                    <span class="title">Q3</span>
                                    <input class="createtool-budget-forecast-year-widget-q" type="text" cid="q3" placeholder="$">
                                </div>
                                <div class="widget q4">
                                    <span class="title">Q4</span>
                                    <input class="createtool-budget-forecast-year-widget-q" type="text" cid="q4" placeholder="$">
                                </div>
                            </div>
                            <button class="btn-shadow createtool-budget-forecast-save">Save</button>
                        </div>
                    </div>`;
                acchtml += html;
            }
            if(supplierHtmlGate){
                const projectTotalActualBudget = ACCUSER.getProject(projectid).Budget.getCapexBudgetByResourceIdAndType(value.id, "capexsupplier");
                const rb = (supplierAllotedBudget - projectTotalActualBudget); 
                const html = `
                    <div year="${year}" resid="${value.id}" type="capexsupplier" class="createtool-subtitle">
                        <span class="crtitle crtitle-forecast-year btn-shadow"><input status="done" type="text" value="${itemobj.name} - SUPPLIER(LUMPSUM)" disabled><span>0%</span><i class="fas fa-caret-left"></i></span>
                        <div class="content createtool-budget-forecast-year">
                            <span class="instruction">Total Budget: $${supplierAllotedBudget.toFixed(2)} &nbsp;&nbsp; Remaining Budget: $${rb.toFixed(2)}</span>
                            <div class="createtool-budget-forecast-year-widget calendar-monthly hidden">
                                <div class="widget jan">
                                    <span class="title">January</span>
                                    <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m1" placeholder="$">
                                </div>
                                <div class="widget feb">
                                    <span class="title">February</span>
                                    <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m2" placeholder="$">
                                </div>
                                <div class="widget mar">
                                    <span class="title">March</span>
                                    <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m3" placeholder="$">
                                </div>
                                <div class="widget apr">
                                    <span class="title">April</span>
                                    <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m4" placeholder="$">
                                </div>
                                <div class="widget may">
                                    <span class="title">May</span>
                                    <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m5" placeholder="$">
                                </div>
                                <div class="widget jun">
                                    <span class="title">June</span>
                                    <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m6" placeholder="$">
                                </div>
                                <div class="widget jul">
                                    <span class="title">July</span>
                                    <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m7" placeholder="$">
                                </div>
                                <div class="widget aug">
                                    <span class="title">August</span>
                                    <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m8" placeholder="$">
                                </div>
                                <div class="widget sep">
                                    <span class="title">September</span>
                                    <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m9" placeholder="$">
                                </div>
                                <div class="widget oct">
                                    <span class="title">October</span>
                                    <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m10" placeholder="$">
                                </div>
                                <div class="widget nov">
                                    <span class="title">November</span>
                                    <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m11" placeholder="$">
                                </div>
                                <div class="widget dec">
                                    <span class="title">December</span>
                                    <input class="createtool-budget-forecast-year-widget-m" type="text" cid="m12" placeholder="$">
                                </div>
                            </div>
                            <div class="createtool-budget-forecast-year-widget calendar-quarter hidden">
                                <div class="widget q1">
                                    <span class="title">Q1</span>
                                    <input class="createtool-budget-forecast-year-widget-q" type="text" cid="q1" placeholder="$">
                                </div>
                                <div class="widget q2">
                                    <span class="title">Q2</span>
                                    <input class="createtool-budget-forecast-year-widget-q" type="text" cid="q2" placeholder="$">
                                </div>
                                <div class="widget q3">
                                    <span class="title">Q3</span>
                                    <input class="createtool-budget-forecast-year-widget-q" type="text" cid="q3" placeholder="$">
                                </div>
                                <div class="widget q4">
                                    <span class="title">Q4</span>
                                    <input class="createtool-budget-forecast-year-widget-q" type="text" cid="q4" placeholder="$">
                                </div>
                            </div>
                            <button class="btn-shadow createtool-budget-forecast-save">Save</button>
                        </div>
                    </div>`;
                acchtml += html;
            }

        });
        const html = `
            <div class="createtool-subtitle">
                <span class="crtitle btn-shadow">${year} - 0%<i class="fas fa-caret-left"></i></span>
                <div class="content createtool-budget-forecast createtool-budget-forecast-con">
                    
                    ${acchtml}

                    <div class="header">
                        <div class="fill">
                            <span>Budget Amount</span>
                            <input type="text" value="$1200.00" disabled>
                        </div>
                        <div class="fill">
                            <span>Remaining Budget</span>
                            <input type="text" value="$1200.00" disabled>
                        </div>
                        <div class="fill type">
                            <span>View Type</span>
                            <select name="" id="">
                                <option value="monthly">Monthly</option>
                                <option value="quarter">Quarterly</option>
                            </select>
                        </div>
                        <i class="fas fa-trash"></i>
                    </div><br>
                </div>
            </div>`;
        $('.request-createtool-budget-baselineforecast-capex').prepend(html);
    }else{
        showNotification("Add Error", "Year Already Exists");
    }
});
   
    // saving event
$('#request-createtool-budget-save').click(function(){
    // saveOpexForecast();
});

    // in row events - budget
$(document).on('click', '.popup-widget-upload-costing', function(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const bid = $(this).parent('div').parent('.createtool-budget-itemlist-widget').attr('id').split('_').pop();
    const cat =  $(this).parent('div').siblings('.budget-itemlist-widget-category').val();
    const capexcost =  $(this).parent('div').siblings('.budget-itemlist-widget-capex').val();
    
    if(cat == 'supplier' || cat == 'tm'){
        // const vendor =  $(this).parent('div').siblings('.budget-itemlist-widget-category').val();
        // const item =  $(this).parent('div').siblings('.budget-itemlist-widget-category option:selected').text();
        // const supobj = ACCUSER.getProject(projectid).getTmpSupplierObj(vendor);
        
        const vendorname =  $(this).attr('vendorname');
        const itemname =  $(this).attr('itemname');
        // console.log(supobj, item);
        $('.popup-budget-supplier-form').children('.suppliername').text(`${vendorname} : ${itemname}`);
    }

    // console.log(cat, bid);
    if(cat == 'supplier'){
        $('.popup-budget-supplier').css('display', 'flex').show().attr({'bid': bid, 'cost' : capexcost});
        fillPopupSupplier(bid);
    }
    if(cat == 'tm'){
        fillPopupTm(bid);
        $('.popup-budget-tm').css('display', 'flex').show().attr('bid', bid);
        $('.popup-budget-tm').children('.popup-budget-supplier-form').children('.createtool-container').css('display', 'flex').show();
    }

    
});
        // item category change
$(document).on('change', '.budget-itemlist-widget-itemcategory', function(){
    const categoryid = $(this).val();
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const itemlist = ACCUSER.getProject(projectid).Item.getItem();
    let itemhtml = '';
    $.each(itemlist, function(key, value){
        if(value.categoryid == categoryid){
            itemhtml += `<option value="${value.id}">${value.name}</option>`;
        }
    });
    $(this).siblings('.budget-itemlist-widget-item').empty().append(itemhtml);
});
$(document).on('change', '.budget-itemlist-widget-category', function(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const type = $(this).val();
    const dis = $(this);
    if(type == 'hours'){
        $(this).siblings('.budget-itemlist-widget-capex').prop('disabled', true);
        $(this).siblings('.budget-itemlist-widget-opex').prop('disabled', false);
        $(this).siblings('.budget-itemlist-widget-vendor').prop('disabled', true).empty();
        // $(this).siblings('div').children('i.fa-coins').hide();
    }else if(type == 'supplier' || type == 'tm'){
        $(this).siblings('.budget-itemlist-widget-opex').prop('disabled', true);
        $(this).siblings('.budget-itemlist-widget-capex').prop('disabled', false);
        $(this).siblings('.budget-itemlist-widget-vendor').prop('disabled', false).empty();
        // $(this).siblings('div').children('i.fa-coins').show();
        const slist = ACCUSER.getProject(projectid).TaskResource.getDistinctSupplierList();
        console.log(slist);
        $.each(slist, function(key, value){
            const sobj = ACCUSER.getProject(projectid).getTmpSupplierObj(value.supplierid);
            console.log(value.supplierid, sobj);
            dis.siblings('.budget-itemlist-widget-vendor').append(`
                <option value="${value.supplierid}">${sobj.name}</option>
            `);
        });
    }
});
        // item save event
$(document).on('click', '.budget-itemlist-widget-save', function(){
    const id = rngProjectBudgetId();
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const itemid =  $(this).parent('div').siblings('.budget-itemlist-widget-item').val();
    const type =  $(this).parent('div').siblings('.budget-itemlist-widget-category').val();
    const capexcost =  $(this).parent('div').siblings('.budget-itemlist-widget-capex').val();
    const opexcost =  $(this).parent('div').siblings('.budget-itemlist-widget-opex').val();
    const vendor =  $(this).parent('div').siblings('.budget-itemlist-widget-vendor').val();
    let gate = true;
    // console.log(cat, bid);
    const options = {
        'id' : id,
        'projectid' : projectid,
        'itemid' : itemid,
        'type' : type,
        'capexcost' : type == "hours" ? "" : capexcost,
        'opexcost' : type == "hours" ? opexcost : "",
        'vendor' : type == "hours" ? "" : vendor
    }

    if(options.itemid == "" || options.itemid == undefined || options.itemid == null){
        blinkbg($(this).parent('div').siblings('.budget-itemlist-widget-item'), RED_PALETTE, 'white');
        gate = false;
    }
    if(options.type == "hours" && (options.opexcost == "" || options.opexcost == undefined || options.opexcost == null)){
        blinkbg($(this).parent('div').siblings('.budget-itemlist-widget-opex'), RED_PALETTE, 'white');
        gate = false;
    }
    if(options.type != "hours" && (options.capexcost == "" || options.capexcost == undefined || options.capexcost == null)){
        blinkbg($(this).parent('div').siblings('.budget-itemlist-widget-capex'), RED_PALETTE, 'white');
        gate = false;
    }

    if(gate){
        console.log(options);
    
        const callback =()=>{
            fillBudgetingDashboard();
        }
        ACCUSER.getProject(projectid).Budget.create(options, callback);
    }



    
});
$(document).on('click', '.budget-itemlist-widget-delete', function(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const itemid =  $(this).parent('div').parent('.createtool-budget-itemlist-widget').attr('id').split('_').pop();

    console.log(itemid);
    const cb =()=>{
        fillBudgetingDashboard();
        ACCUSER.getProject(projectid).Budget.deleteUploadByBudgetId(itemid);
    }
    // console.log(itemid);
    ACCUSER.getProject(projectid).Budget.delete({"id" : itemid}, cb);
});
$(document).on('click', '.budget-itemlist-widget-upload', function(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const itemid =  $(this).parent('div').parent('.createtool-budget-itemlist-widget').attr('id').split('_').pop();
    const bid = $(this).attr('bid');
    const iid = $(this).attr('iid');
    // console.log(projectid, itemid);
    const itemobj = ACCUSER.getProject(projectid).Item.getItemObj(iid);
    // console.log(itemobj);
    $('#popup-widget-upload-title').attr('bid', bid).text(itemobj.name);
    $('#popup-widget-upload-hiddeninput').attr('bid', bid);

    $('.request-createtool-con').children('.popup').css('display', 'flex').show();
    $('.request-createtool-con').children('.popup').children('.popup-widget-upload').attr({'bid': bid, 'prid': projectid}).css('display', 'flex').show();
    
    $('#popup-widget-upload-folder').empty();
    const bupobj = ACCUSER.getProject(projectid).Budget.getUploadByBudgetId(bid);
    $.each(bupobj, function(key, value){
        $('#popup-widget-upload-folder').append(`
            <span link="${value.link}" costing="${value.costing}" class="popup-widget-upload-folder">${value.filename}<i bupid="${value.id}" prid="${projectid}" class="fas fa-trash popup-widget-upload-folder-delete"></i></span>
        `);
    });

    $('#popup-widget-upload-submit').hide();
    $('#popup-widget-upload-view').hide();
});
        

    // popup events - upload
$('#popup-widget-upload-submit').click(function(){
    console.log("save the record");
    const budgetid = $('.request-createtool-con').children('.popup').children('.popup-widget-upload').attr('bid');
    const projectid = $('.request-createtool-con').children('.popup').children('.popup-widget-upload').attr('prid');
    const filename = $(this).parent('.action').siblings('.filename').children('input').val();
    const costing = $(this).parent('.action').siblings('.costing').children('input').val();
    $('.request-createtool-con').children('.popup').css('display', 'none').hide();
    $('.request-createtool-con').children('.popup').children('.popup-widget-upload').css('display', 'none').hide();
    let gate = true;
    let link = '';
    const cbsuccess=data=>{
        console.log(data);
        if(data.response == 'OK'){
            link = data.url;
        }else{
            gate = false;
            console.log(data.response);
            showNotification("Upload Failed", `Error Message: ${data.response}`);
        }
    };
    const cbcomplete=()=>{
        if(gate){
            const options = {
                'id' : rngProjectBudgetUploadId(),
                'projectid' : projectid,
                'budgetid' : budgetid,
                'link' : link,
                'filename' : filename,
                'costing' : costing
            }
            console.log(options);
            const callback=()=>{
                console.log("awesome");
            };
            // capi_createProjectBudgetUpload(options, cbsuccess, cbcomplete);
            ACCUSER.getProject(projectid).Budget.createUpload(options, callback);
        }
    };
    ajax_budget_uploadfile($('#popup-widget-upload-hiddeninput'), budgetid, cbsuccess, cbcomplete);
});

    // popup events - documentlist delete
$(document).on('click', '.popup-widget-upload-folder-delete', function(){
    const bupid = $(this).attr('bupid');
    const projectid = $(this).attr('prid');
    const link = $(this).parent('.popup-widget-upload-folder').attr('link');

    const callback = ()=>{
        $(this).parent('span').remove();
        $('.popup-widget-upload-folder-delete').parent('span').removeClass('active');
        $('#popup-widget-upload-filename').val("");
        $('#popup-widget-upload-costing').val("");

    }
    ACCUSER.getProject(projectid).Budget.deleteUpload({"id" : bupid, "link" : link}, callback);
});
    // popup events - documentlist click
$(document).on('click', '.popup-widget-upload-folder', function(){
    const costing = $(this).attr('costing');
    const link = $(this).attr('link');
    const filename = $(this).text();
    
    $('#popup-widget-upload-view-h').attr('href', `${link}`);
    $('#popup-widget-upload-view').show();
    $('#popup-widget-upload-filename').val(filename);
    $('#popup-widget-upload-costing').val(costing);
});


$('#popup-widget-upload-cancel').click(function(){
    console.log("saving cancelled");
    $('.request-createtool-con').children('.popup').css('display', 'none').hide();
    $('.request-createtool-con').children('.popup').children('.popup-widget-upload').css('display', 'none').hide();
});











   
    // popup events - supplier lumpsum
$('.popup-budget-supplier').click(function(e){
    if(e.target != this){
        return;
    }else{
        $(this).css('display', 'none').hide();
    }
});
$('#popup-budget-supplier-form-add').click(function(){

    $('.popup-budget-supplier-widget-con').append(`
        <div class="popup-budget-supplier-widget">
            <input type="text" class="name" placeholder="Item Name">
            <input type="text" class="payment popup-budget-supplier-widget-payment" placeholder="%">
            <input type="text" class="total" plaecholder="Total Amount" disabled>
        </div>
    `);
});
$('#popup-budget-supplier-form-save').click(function(){
    // console.log('save records');
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const bid = $('.popup-budget-supplier').attr('bid');
    $('.popup-budget-supplier-widget-con').children('.popup-budget-supplier-widget').each(function(){
        const callback =()=>{
            $('.popup-budget-supplier').css('display', 'none').hide();
            fillPopupSupplier(bid);
        }
        const options = {
            'id' : $(this).attr('lid') == undefined ? rngProjectBudgetLumpsumId() : $(this).attr('lid'),
            'budgetid' : bid,
            'projectid' : projectid,
            'name' : $(this).children('input.name').val(),
            'payment' : $(this).children('input.payment').val()
        }
        ACCUSER.getProject(projectid).Budget.createLumpsum(options, callback);
    });
});
$(document).on('keyup', '.popup-budget-supplier-widget-payment', function(){
    const cost = $('.popup-budget-supplier').attr('cost');
    const payment = $(this).val();
    $(this).siblings('.total').val(`$${ (cost * payment) / 100 }`);

});

    // popup events - supplier tm
$('.popup-budget-tm').click(function(e){
    if(e.target != this){
        return;
    }else{
        $(this).css('display', 'none').hide();
    }
});
        // materials
$('#popup-budget-supplier-material-add').click(function(){
    $('.popup-budget-supplier-material-widget-con').append(`
        <div class="popup-budget-supplier-material-widget">
            <input class="name" type="text" placeholder="Item Name">
            <input class="unit" type="text" placeholder="Unit">
            <input class="quantity" type="text" placeholder="Qty.">
            <input class="price" type="text" placeholder="$">
            <input class="amount" type="text" placeholder="$" disabled>
            <i class="fas fa-save popup-budget-supplier-material-widget-save"></i>
        </div>
    `);
});
$(document).on('click', '.popup-budget-supplier-material-widget-save', function(){
    const id = $(this).attr('matid') == undefined ? rngProjectBudgetMaterialId() : $(this).attr('matid');
    const budgetid = $('.popup-budget-tm').attr('bid');
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const name = $(this).siblings('input.name').val();
    const unit = $(this).siblings('input.unit').val();
    const quantity = $(this).siblings('input.quantity').val();
    const price = $(this).siblings('input.price').val();

    const callback=()=>{
        fillPopupTmMaterial(budgetid);
    }
    const options = {
        'id' : id,
        'budgetid' : budgetid,
        'projectid' : projectid,
        'name' : name,
        'unit' : unit,
        'quantity' : quantity,
        'price' : price
    }
    console.log(options);
    ACCUSER.getProject(projectid).Budget.createMaterial(options, callback);

});
$(document).on('click', '.popup-budget-supplier-material-widget-delete', function(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const budgetid = $('.popup-budget-tm').attr('bid');
    const id = $(this).attr('matid');

    const callback=()=>{
        fillPopupTmMaterial(budgetid);
    }
    ACCUSER.getProject(projectid).Budget.deleteMaterial({'id' : id}, callback);

});
        // manhour
$('#popup-budget-supplier-manhour-add').click(function(){
    $('.popup-budget-supplier-manhour-widget-con').append(`
        <div class="popup-budget-supplier-manhour-widget">
            <input class="name" type="text" placeholder="Resource Name">
            <input class="role" type="text" placeholder="Role">
            <input class="hours" type="text" placeholder="Hours">
            <input class="rate" type="text" placeholder="$">
            <input class="amount" type="text" placeholder="$" disabled>
            <i class="fas fa-save popup-budget-supplier-manhour-widget-save"></i>
        </div>
    `);
});
$(document).on('click', '.popup-budget-supplier-manhour-widget-save', function(){
    const id = $(this).attr('manid') == undefined ? rngProjectBudgetManhourId() : $(this).attr('manid');
    const budgetid = $('.popup-budget-tm').attr('bid');
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const name = $(this).siblings('input.name').val();
    const role = $(this).siblings('input.role').val();
    const hours = $(this).siblings('input.hours').val();
    const rate = $(this).siblings('input.rate').val();

    const callback=()=>{
        fillPopupTmManhours(budgetid);
        fillPopupTmMilestone(budgetid);
    }
    const options = {
        'id' : id,
        'budgetid' : budgetid,
        'projectid' : projectid,
        'name' : name,
        'role' : role,
        'hours' : hours,
        'rate' : rate
    }
    console.log(options);
    ACCUSER.getProject(projectid).Budget.createManhours(options, callback);
});
$(document).on('click', '.popup-budget-supplier-manhour-widget-delete', function(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const budgetid = $('.popup-budget-tm').attr('bid');
    const id = $(this).attr('manid');

    const callback=()=>{
        const callback=()=>{
            fillPopupTmManhours(budgetid);
            fillPopupTmMilestone(budgetid);
        }
        ACCUSER.getProject(projectid).Budget.deleteMilestoneByMilestoneId({'milestoneid' : id}, callback);
    }
    ACCUSER.getProject(projectid).Budget.deleteManhours({'id' : id}, callback);

});
        // milestones
$('#popup-budget-supplier-milestone-addrows').click(function(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const budgetid = $('.popup-budget-tm').attr('bid');
    const manhourobj = ACCUSER.getProject(projectid).Budget.getManhourByBudgetId(budgetid);
    let reshtml = '';
    let resleghtml = '';
    $('.popup-budget-supplier-milestone-con').children('.legend').children('.legend-resource').empty();
    // $('.popup-budget-supplier-milestone-widget-con').empty();
    $.each(manhourobj, function(key, value){
        reshtml += `<input id="resid_${value.id}" resid="${value.id}" type="text" placeholder="Hrs" >`;
        resleghtml += `<span>${value.name}</span>`;
    });
    $('.popup-budget-supplier-milestone-widget-con').append(`
        <div class="popup-budget-supplier-milestone-widget">
            <input class="name" type="text" placeholder="Resource Name">
            <input class="percent type="text" placeholder="Percentage" disabled>
            <div class="resource">
                ${reshtml}
            </div>
            <input class="popup-budget-supplier-milestone-allotedhours" type="text" placeholder="Hrs" disabled>
            <i class="fas fa-save popup-budget-supplier-milestone-widget-save"></i>
        </div>
    `);
    $('.popup-budget-supplier-milestone-con').children('.legend').children('.legend-resource').append(resleghtml);
});
$(document).on('click', '.popup-budget-supplier-milestone-widget-save', function(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const budgetid = $('.popup-budget-tm').attr('bid');
    const name = $(this).siblings('input.name').val();
    const milestoneid = $(this).attr('milid') == undefined ? rngProjectBudgetMilestoneCatId() : $(this).attr('milid');
    

    $(this).siblings('.resource').children('input').each(function(){
        const id = $(this).attr('misid') == undefined ? rngProjectBudgetMilestoneId() : $(this).attr('misid');
        const resourceid = $(this).attr('resid');
        const value = $(this).val();
        const callback=()=>{
            fillPopupTmMilestone(budgetid);
        }
        const options = {
            'id' : id,
            'projectid' : projectid,
            'budgetid' : budgetid,
            'resourceid' : resourceid,
            'milestoneid' : milestoneid,
            'name' : name,
            'value' : value
        }
        console.log(options);
        ACCUSER.getProject(projectid).Budget.createMilestone(options, callback);
    });
});
$(document).on('click', '.popup-budget-supplier-milestone-widget-delete', function(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const budgetid = $('.popup-budget-tm').attr('bid');
    const id = $(this).attr('milid');

    const callback=()=>{
        fillPopupTmMilestone(budgetid);
    }
    ACCUSER.getProject(projectid).Budget.deleteMilestone({'id' : id}, callback);

});
        // expense
$(document).on('click', '.popup-budget-supplier-expense-widget-save', function(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const budgetid = $('.popup-budget-tm').attr('bid');
    const manid = $(this).parent('.popup-budget-supplier-expense-widget').attr('manid');
    
    const callback=()=>{
        fillPopupTmExpense(budgetid);
    }
    const options = {
        'id' : manid,
        'weeks' : $(this).siblings('.weeks').val(),
        'trips' : $(this).siblings('.trips').val(),
        'distance' : $(this).siblings('.distance').val(),
        'distancerate' : $(this).siblings('.distancerate').val(),
        'triphours' : $(this).siblings('.triphours').val(),
        'triphoursrate' : $(this).siblings('.triphoursrate').val(),
        'fixedrate' : $(this).siblings('.fixedrate').val(),
    }
    console.log(options);
    ACCUSER.getProject(projectid).Budget.updateExpense(options, callback);
    
});
    

    //Budgeting Dashboard
        // add items event
$('#createtool-budget-itemlist-additems').click(function(){
    $('.popup-budget-itemadd').css('display', 'flex').show();
    fillAdditemCategoryCon();
});
        // itemadd popup events
$('.popup-budget-itemadd').click(function(e){
    if(e.target != this){
        return;
    }else{
        $(this).css('display', 'none').hide();
        fillBudgetingDashboard();
    }
});
$('#popup-budget-itemadd-form-catlist-add').click(function(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const name = $(this).siblings('input').val();
    const id = rngProjectItemCategoryId();

    const callback =()=>{
        fillAdditemCategoryCon();
        $(this).siblings('input').val("");
    }
    const options = {
        "id" : id,
        "projectid" : projectid,
        "name" : name,
    }
    ACCUSER.getProject(projectid).Item.createCategory(options, callback);
});
$(document).on('click', '.popup-budget-itemadd-form-catlist-widget', function(e){
    const name = $(this).text();
    const id = $(this).attr('cid');
    if(e.target != this){
        return;
    }else{
        $('.popup-budget-itemadd-form-itemlist').show();
        $('.popup-budget-itemadd-form-itemlist').children('.category').text(name).attr('cid', id);
        fillAddItemCon(id);
    }
});
$(document).on('click', '.popup-budget-itemadd-form-catlist-widget > i', function(e){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const id = $(this).parent('span').attr('cid');
    const callback =()=>{
        fillAdditemCategoryCon();
    }
    ACCUSER.getProject(projectid).Item.deleteCategory({"id" : id}, callback);
});
$('#popup-budget-itemadd-form-itemlist-add').click(function(){
    const id = rngProjectItemId();
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const categoryid = $('.popup-budget-itemadd-form-itemlist').children('.category').attr('cid');
    const code = $(this).siblings('input.code').val();
    const name = $(this).siblings('input.name').val();

    if(name == ''){
        blinkbg($(this).siblings('input.name'), RED_PALETTE, "white");
    }else{
        const callback =()=>{
            fillAddItemCon(categoryid);
            $(this).siblings('input.name').val("");
        }
        const options = {
            'id' : id,
            'projectid' : projectid,
            'categoryid' : categoryid,
            'code' : code,
            'name' : name,
        };
        ACCUSER.getProject(projectid).Item.createItem(options, callback);
    }

});
$(document).on('click', '.popup-budget-itemadd-form-itemlist-widget > i', function(e){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const id = $(this).parent('span').attr('iid');
    const categoryid = $('.popup-budget-itemadd-form-itemlist').children('.category').attr('cid');
    const callback =()=>{
        fillAddItemCon(categoryid);
    }
    ACCUSER.getProject(projectid).Item.deleteItem({"id" : id}, callback);
});









// PROJECT TIMESHEET EVENTS
function setTimesheetProgress(p){
    let i = 0;
    let interval = setInterval(function(){
        if(i > p){
            clearInterval(interval);
        }else{
            $('.timesheet-footer-progress').text(`Project's Task Progress : ${i}%`);
            $('.timesheet-footer-progress').css({
                'background' : `linear-gradient(146deg, ${GREEN_PALETTE} ${i}%, grey ${i+10}%)`
            });
            
            i++;
        }
    }, 20);
}
function timesheetProgressAnim(p){
    // clearInterval(mainterval);
    // $('.timesheet-footer-progress').text(`Project's Task Progress : ${p}%`);
    // let interval = setInterval(function(){
    //     $('.timesheet-footer-progress').text(`Project's Task Progress : ${i}%`);
    //     $('.timesheet-footer-progress').css({
    //         'background' : `linear-gradient(146deg, ${GREEN_PALETTE} ${i}%, grey ${i+5}%)`
    //     });
    //     i++;
    //     if(i > p){
    //         clearInterval(interval);
    //     }
    // }, 20);

    // mainterval = setInterval(function(){
    //     setTimesheetProgress(p);
    // }, 7000);
    if(p != NaN){
        $('.timesheet-footer-progress').text(`Project's Task Progress : ${p}%`);
        $('.timesheet-footer-progress').css({
            'background' : `linear-gradient(146deg, ${GREEN_PALETTE} ${p}%, grey ${p+5}%)`
        });
    }else{
        $('.timesheet-footer-progress').text(`Nothing Started Yet`);
        $('.timesheet-footer-progress').css({
            'background-color' : GREEN_PALETTE
        });
    }
}
function updateTimesheetFooter(){

    let list = [];
    let totalHours = 0;
    let completedHours = 0;
    let earliestDate;
    let latestDate;
    let userHours = 0;
    let variance;
    let prog;
    $('.timesheet-body').children('.timesheet-body-widget').each(function(){
        const th = $(this).children('.top.part').children('.rightside').children('.top').children('.project-timesheet-total').attr('hr');
        const ch = $(this).children('.top.part').children('.rightside').children('.top').children('.project-timesheet-completed').attr('hr');

        const options = {
            "startdate" : $(this).children('.top.part').children('.leftside').children('.project-timesheet-startdate').val(),
            "enddate" : $(this).children('.top.part').children('.leftside').children('.project-timesheet-enddate').val(),
            "completed" : th,
            "total" : ch
        };
        totalHours += parseFloat(th);
        userHours += parseFloat(th);
        let x;
        if(parseFloat(ch) > parseFloat(th)){
            x = th;
        }else{
            x = ch;
        }
        completedHours += parseFloat(x);
        list[list.length] = options;
    });

    const edate = new Date(Math.min(...list.map(e => new Date(`${e.startdate} 00:00:00`)) ));
    const ldate = new Date(Math.max(...list.map(e => new Date(`${e.enddate} 00:00:00`)) ));

    earliestDate = dateFns.format(
        new Date(edate),
        'YYYY-MM-DD'
    )
    latestDate = dateFns.format(
        new Date(ldate),
        'YYYY-MM-DD'
    )

    let v = totalHours - completedHours;
    if(v > 0){
        variance = `+${v}`;
    }else if(v < 0){
        variance = `-${v}`;
    }else if(variance == 0){
        variance = `perfect`;
    }
    prog = ((completedHours / totalHours) * 100).toFixed(2);



    $('#timesheet-footer-hours-total').val(`${totalHours} Hrs`);
    $('#timesheet-footer-hours-startdate').val(earliestDate);
    $('#timesheet-footer-hours-enddate').val(latestDate);
    $('#timesheet-footer-hours-user').val(`${userHours} Hrs`);
    $('#timesheet-footer-hours-completed').val(`${completedHours} Hrs`);
    $('#timesheet-footer-hours-variance').val(variance);

    timesheetProgressAnim(prog);
}
function numToDay(num){
    let ret;
    if(num == 1){
        ret = 'Monday';
    }else if(num == 2){
        ret = 'Tuesday';
    }else if(num == 3){
        ret = 'Wednesday';
    }else if(num == 4){
        ret = 'Thursday';
    }else if(num == 5){
        ret = 'Friday';
    }else if(num == 6){
        ret = 'Saturday';
    }else if(num == 0){
        ret = 'Sunday';
    }
    return ret;
}
function setProjectTimesheetCalendarByProjectId(options){
    const week = options.week;
    const y = week.split('-')[0];
    const w = week.split('W').pop();
    const sd = new Date(`${y}-01-01 00:00:00`);
    sd.setDate(sd.getDate() + ((7 * (w - 1)) - (sd.getDay() - 1) )); // setting the day multiplied by weeks minus getDay
    const ed = new Date(sd);
    ed.setHours(0,0,0,0);
    ed.setDate(ed.getDate() + 7);
    let list = ACCUSER.getProject(options.projectid).Timesheet.getObjByMinMaxDatesOwner({"sd" : sd, "ed" : ed, "accid" : __ID});
    
    let dcon = [];
    dcon[0] = $(`.${options.selector}.sun`);
    dcon[1] = $(`.${options.selector}.mon`);
    dcon[2] = $(`.${options.selector}.tue`);
    dcon[3] = $(`.${options.selector}.wed`);
    dcon[4] = $(`.${options.selector}.thu`);
    dcon[5] = $(`.${options.selector}.fri`);
    dcon[6] = $(`.${options.selector}.sat`);

    for(let dt = new Date(sd); dt < ed; dt.setDate(dt.getDate() + 1)){
        const showdate = dateFns.format(dt, 'MMM DD, YYYY');
        const showday = numToDay(dt.getDay());
        dcon[dt.getDay()].children('span.title').html(`${showday}<br>${showdate}`);
    }

    let thour = [];
    thour[0] = 0;
    thour[1] = 0;
    thour[2] = 0;
    thour[3] = 0;
    thour[4] = 0;
    thour[5] = 0;
    thour[6] = 0;

    let th = 0;
    $.each(list, function(key, value){
        const d = new Date(`${value.date} 00:00:00`);
        const day = d.getDay();
        thour[day] += parseFloat(value.hours);
        th += parseFloat(value.hours);
    });

    $.each(thour, function(key, value){
        dcon[key].children('span.hours').html(`
            ${value} Hrs
        `);
    });

    $(`.${options.selector}.total`).children('span.hours').html(`${th} Hrs`);

}
function getProjectTimesheetCalendarByProjectId(options){
    const week = options.week;
    const y = week.split('-')[0];
    const w = week.split('W').pop();
    const sd = new Date(`${y}-01-01 00:00:00`);
    sd.setDate(sd.getDate() + ((7 * (w - 1)) - (sd.getDay() - 1) )); // setting the day multiplied by weeks minus getDay
    const ed = new Date(sd);
    ed.setHours(0,0,0,0);
    ed.setDate(ed.getDate() + 7);
    let list = ACCUSER.getProject(options.projectid).Timesheet.getObjByMinMaxDatesOwner({"sd" : sd, "ed" : ed, "accid" : __ID});
    
    let thour = [];
    thour[0] = 0;
    thour[1] = 0;
    thour[2] = 0;
    thour[3] = 0;
    thour[4] = 0;
    thour[5] = 0;
    thour[6] = 0;

    let th = 0;
    $.each(list, function(key, value){
        const d = new Date(`${value.date} 00:00:00`);
        const day = d.getDay();
        thour[day] += parseFloat(value.hours);
        th += parseFloat(value.hours);
    });

    return thour;

}
    // retrieve data events
$('#timesheet-project-submit').click(function(){

    const projectid = $('#project-timesheet-list').val();
    const resource = ACCUSER.getProject(projectid).TaskResource.getTaskByOwner(__ID);
    $('.timesheet-body').empty();
    const tasklist = [];
    // console.log(resource);
    $.each(resource, function(key, value){
        // console.log(value.taskid);
        // tasklist[tasklist.length]["trid"] = value.id;
        tasklist[tasklist.length] = {...ACCUSER.getProject(projectid).Task.getTaskObj(value.taskid), "trid" : value.id};
    });

    const nl = tasklist.sort(function(a, b) {
        const as = new Date(`${a.startdate}`);
        const ae = new Date(`${a.enddate}`);
        const bs = new Date(`${b.startdate}`);
        const be = new Date(`${b.enddate}`);

        if(as == bs){
            return ae < be ? 1 : -1;
        }else{
            return as > bs ? 1 : -1;
        }
    });

    $.each(nl, function(key, value){
        const res = resource.find(obj => obj.taskid == value.taskid);
        const hours = ACCUSER.getProject(projectid).Timesheet.getHoursByTask({"taskid" : value.taskid, "ownerid" : res.accid});
        const remain = parseFloat(res.hours) - hours;
        const prog = (( hours / parseFloat(res.hours) ) * 100).toFixed(2);

        $('.timesheet-body').append(`
            <div id="timesheettask_${value.taskid}" class="timesheet-body-widget color-sc" taskid="${value.taskid}" trid="${value.trid}">
                <div class="top part">
                    <div class="leftside">
                    <span status="closed" class="project-timesheet-taskname">${value.taskname}</span>
                    <input class="project-timesheet-startdate" type="date" value="${value.startdate}" disabled>
                    <input class="project-timesheet-enddate" type="date" value="${value.enddate}"disabled>
                    </div>
                    <div class="rightside">
                        <div class="top">
                            <span hr="${hours}" class="project-timesheet-completed">${hours} Hrs</span>
                            <span hr="${remain}" class="project-timesheet-remaining">${remain} Hrs</span>
                            <span hr="${res.hours}" class="project-timesheet-total">${res.hours} Hrs</span>
                            <i class="fas fa-business-time project-timesheet-add"></i>
                            <i class="fas fa-calendar-week project-timesheet-calendar"></i>
                        </div>
                        <span class="bot project-timesheet-progress">
                            Task Progress: ${prog}%
                        </span>
                    </div>
                </div>
                <div class="bottom part timesheet-body-widget-hours-con">


                </div>
            </div>
        `);

        $(`#timesheettask_${value.taskid}`).children('.top.part').children('.rightside').children('.project-timesheet-progress').css({
            'background' : `linear-gradient(146deg, teal ${prog}%, grey ${prog+3}%)`
        });
        ACCUSER.getProject(projectid).Timesheet.fillTimesheetSingle({"taskid" : value.taskid, "ownerid" : res.accid});
    });

    updateTimesheetFooter();
    const p = ACCUSER.getProject(projectid);
    // const o = p.getConnectObjById(p.ownerid);

    $('#timesheet-header-projectname').text(p.projectname);
    $('#timesheet-header-projectid').text(projectid);
    // $('#timesheet-header-ownername').text(`${o.firstname} ${o.lastname}`);
    $('.timesheet-footer').css({'display': 'flex'}).show();
    $('.timesheet-body').css({'display': 'flex'}).show();
    $('.timesheet-legend').css({'display': 'flex'}).show();

    $('#timesheet-mods-calendar').parent('.fintrack-mods-widget').css({"display" : "flex"}).show();
});
$('#project-timesheet-list').on('change', function(){
    const projectid = $(this).val();
    const zcb=data=>{
        console.log(data);
        const zcb1=data=>{
            console.log(data);
            const zcb2=data=>{
                console.log(data);
                const zcb5=data=>{
                    console.log(data);
                    const zcb6=data=>{
                        console.log(data);
                        
                    };
                    ACCUSER.getProject(projectid).checkList('ConnectByProjectId', zcb6);
                };
                ACCUSER.getProject(projectid).checkList('ConnectByResource', zcb5);
            };
            ACCUSER.getProject(projectid).checkList('Timesheet', zcb2);
        };
        ACCUSER.getProject(projectid).checkList('TaskResource', zcb1);
    };
    ACCUSER.getProject(projectid).checkList('Task', zcb);
});


    // timesheet body events
$(document).on('click', '.project-timesheet-add', function(){
    const con = $(this).parent('div.top').parent('div.rightside').parent('.top.part').siblings('.bottom.part');
    const max = $(this).parent('div.top').parent('div.rightside').siblings('div.leftside').children('.project-timesheet-enddate').val();
    const min = $(this).parent('div.top').parent('div.rightside').siblings('div.leftside').children('.project-timesheet-startdate').val();
    
    let x = 0;
    $(this).parent('.top').parent('.rightside').parent('.top.part').siblings('.timesheet-body-widget-hours-con').children('.timesheet-body-widget-hours').each(function(){
        x++;
    });
    if(x == 0){
        $(this).parent('.top').parent('.rightside').parent('.top.part').siblings('.timesheet-body-widget-hours-con').empty();
    }

    con.append(`
        <div class="timesheet-body-widget-hours btn-shadow">
            <input class="timesheet-body-widget-date" type="date" min="${min}" max="${max}" value="${min}">
            <input class="timesheet-body-widget-hours" type="text" placeholder="Hours">
            <i status="save" class="fas fa-save timesheet-body-widget-save"></i>
        </div>
    `);

    $(this).parent('.top').parent('.rightside').parent('.top.part').siblings('.timesheet-body-widget-hours-con').css('display', 'block').show();
    $(this).parent('.top').parent('.rightside').siblings('.leftside').children('.project-timesheet-taskname').attr('status','open');
});
$(document).on('click', '.project-timesheet-taskname', function(){
    const status = $(this).attr('status');
    const botcon = $(this).parent('div.leftside').parent('.top.part').siblings('.timesheet-body-widget-hours-con');
    if(status == "closed"){
        $(this).attr('status','open');
        botcon.css('display', 'block').show();
        
        let x = 0;
        botcon.children('.timesheet-body-widget-hours').each(function(){
            x++;
        });
        if(x == 0){
            botcon.empty().append('<span>Empty</span>');
        }

    }else{
        $(this).attr('status','closed');
        botcon.css('display', 'none').hide();
    }
});
$(document).on('click', '.timesheet-body-widget-save', function(){
    const status = $(this).attr('status');
    const projectid = $('#timesheet-header-projectid').text();
    const taskid = $(this).parent('.timesheet-body-widget-hours').parent('.timesheet-body-widget-hours-con').parent('.timesheet-body-widget').attr('taskid');
    const trid = $(this).parent('.timesheet-body-widget-hours').parent('.timesheet-body-widget-hours-con').parent('.timesheet-body-widget').attr('trid');
    const date = $(this).siblings('.timesheet-body-widget-date').val();
    const hours = $(this).siblings('.timesheet-body-widget-hours').val();
    const id = $(this).parent('.timesheet-body-widget-hours').attr('tid');

    // console.log(projectid, trid, taskid);

    const totalhours = $(this).parent('.timesheet-body-widget-hours').parent('.timesheet-body-widget-hours-con').siblings('.top.part').children('.rightside').children('.top').children('.project-timesheet-total').attr('hr');
    const completed = $(this).parent('.timesheet-body-widget-hours').parent('.timesheet-body-widget-hours-con').siblings('.top.part').children('.rightside').children('.top').children('.project-timesheet-completed').attr('hr');
    const remaining = $(this).parent('.timesheet-body-widget-hours').parent('.timesheet-body-widget-hours-con').siblings('.top.part').children('.rightside').children('.top').children('.project-timesheet-remaining').attr('hr');
    const dis = $(this);

    if(status == 'save'){
        // save to database
        const save =()=>{
            const cbcomplete = ()=>{
                dis.siblings('input').prop('disabled', true);
                dis.removeClass('fa-save').addClass('fa-trash').attr('status','delete');

                const newcompleted = parseFloat(completed) + parseFloat(hours);
                const newremaining = parseFloat(totalhours) - newcompleted;
                const newprog = (( newcompleted / parseFloat(totalhours) ) * 100).toFixed(2);
                dis.parent('.timesheet-body-widget-hours').parent('.timesheet-body-widget-hours-con').siblings('.top.part').children('.rightside').children('.top').children('.project-timesheet-completed').text(`${newcompleted} Hrs`).attr('hr',newcompleted);
                dis.parent('.timesheet-body-widget-hours').parent('.timesheet-body-widget-hours-con').siblings('.top.part').children('.rightside').children('.top').children('.project-timesheet-remaining').text(`${newremaining} Hrs`).attr('hr',newremaining);
                dis.parent('.timesheet-body-widget-hours').parent('.timesheet-body-widget-hours-con').siblings('.top.part').children('.rightside').children('.project-timesheet-progress').text(`Task Progress: ${newprog}%`);
                dis.parent('.timesheet-body-widget-hours').parent('.timesheet-body-widget-hours-con').siblings('.top.part').children('.rightside').children('.project-timesheet-progress').css({
                    'background' : `linear-gradient(146deg, teal ${newprog}%, grey ${newprog+3}%)`
                });
            };
            const options = {
                "id" : rngProjectTimesheetId(),
                "projectid" : projectid,
                "ownerid" : __ID,
                "taskid" : taskid,
                "date" : date,
                "hours" : hours
            };
            // console.log(options);
            const callback = ()=>{
                cbcomplete();
                ACCUSER.getProject(projectid).Timesheet.addObjToList(options);
                ACCUSER.getProject(projectid).Timesheet.fillTimesheetSingle({"taskid" : options.taskid, "ownerid" : __ID});
                updateTimesheetFooter();

            };
            ACCUSER.getProject(projectid).Timesheet.create(options, callback);
        }

        let gate = true;
        if( (parseFloat(completed) + parseFloat(hours) > parseFloat(totalhours)) ){
            const cbtrue = ()=>{
                gate = true;
                // const projectid = $('#usertaskboard-header-projectid').text();
                // const tid = $(this).parent('.usertaskboard-body-widget-icons-con').parent('.usertaskboard-body-widget').attr('id').split('_').pop();
                // const trid = $(this).parent('.usertaskboard-body-widget-icons-con').parent('.usertaskboard-body-widget').attr('trid');
                console.log(completed, taskid, trid);
                

                if(parseFloat(completed) > 0){
                    save();
                }else{
                    const cbtrue =()=>{
                        const callback = ()=>{
                            const callback1 = ()=>{
                                save();
                                const na = {
                                    "response" : "na"
                                };
                                const nastr = JSON.stringify(na);
                                const probj = ACCUSER.getProject(projectid).getData();
                                const trobj = ACCUSER.getProject(projectid).Task.getTaskObj(taskid);
                                const aloptions = {
                                    'id' : rngAlertId(),
                                    'ownerid' : probj.ownerid,
                                    'fn' : 'na',
                                    'dataview' : nastr,
                                    'dataapprove' : nastr,
                                    'datareject' : nastr,
                                    'title' : "Task Updates",
                                    'message' : `<b>${__FIRST_NAME}</b> has started working on the task <b>${trobj.taskname}</b>`
                                }
                                console.log("DELETE ME",aloptions);
                                ACCUSER.Alert.create(aloptions, ()=>{});
                            };
                            ACCUSER.getProject(projectid).Task.updateColumn({"taskid" : taskid, "columnname" : "status", "value" : "working"}, callback1);
                        };
                        ACCUSER.getProject(projectid).TaskResource.updateColumn({"trid" : trid, "columnname" : "status", "value" : "work"}, callback);
                    };
                    const cbfalse = ()=>{
                
                        console.log('Cancelled');
                    };
                    showAction('Start Working on this Task?', cbtrue, cbfalse);
                }
                
            };
            const cbfalse = ()=>{
                gate = false;
                $(this).parent('.timesheet-body-widget-hours').remove();
            };
            showAction(`Entered Hours is more than what is available! you may only input ${totalhours - completed} Hrs, Do you still wish to continue?`, cbtrue, cbfalse);
        }else{
            console.log(completed, taskid, trid);
            if(parseFloat(completed) > 0){
                save();
            }else{
                const cbtrue =()=>{
                    const callback = ()=>{
                        const callback1 = ()=>{
                            save();
                            const na = {
                                "response" : "na"
                            };
                            const nastr = JSON.stringify(na);
                            const probj = ACCUSER.getProject(projectid).getData();
                            const trobj = ACCUSER.getProject(projectid).Task.getTaskObj(taskid);
                            const aloptions = {
                                'id' : rngAlertId(),
                                'ownerid' : probj.ownerid,
                                'fn' : 'na',
                                'dataview' : nastr,
                                'dataapprove' : nastr,
                                'datareject' : nastr,
                                'title' : "Task Updates",
                                'message' : `<b>${__FIRST_NAME}</b> has started working on the task <b>${trobj.taskname}</b>`
                            }
                            console.log("DELETE ME",aloptions);
                            ACCUSER.Alert.create(aloptions, ()=>{});
                        };
                        ACCUSER.getProject(projectid).Task.updateColumn({"taskid" : taskid, "columnname" : "status", "value" : "working"}, callback1);
                    };
                    ACCUSER.getProject(projectid).TaskResource.updateColumn({"trid" : trid, "columnname" : "status", "value" : "work"}, callback);
                };
                const cbfalse = ()=>{
            
                    console.log('Cancelled');
                };
                showAction('Start Working on this Task?', cbtrue, cbfalse);
            }
        }

        

    }else{
        // delete from database
        const cbcomplete = ()=>{
            let x = 0;
            $(this).parent('.timesheet-body-widget-hours').parent('.timesheet-body-widget-hours-con').children('.timesheet-body-widget-hours').each(function(){
                x++;
            });
            if(x == 0){
                $(this).parent('.timesheet-body-widget-hours').parent('.timesheet-body-widget-hours-con').empty().append('<span>Empty</span>');
            }
            const h = $(this).siblings('.timesheet-body-widget-hours').val();
            const newcompleted = parseFloat(completed) - parseFloat(h);
            const newremaining = parseFloat(totalhours) - newcompleted;
            const newprog = (( newcompleted / parseFloat(totalhours) ) * 100).toFixed(2);
            $(this).parent('.timesheet-body-widget-hours').parent('.timesheet-body-widget-hours-con').siblings('.top.part').children('.rightside').children('.top').children('.project-timesheet-completed').text(`${newcompleted} Hrs`).attr('hr',newcompleted);
            $(this).parent('.timesheet-body-widget-hours').parent('.timesheet-body-widget-hours-con').siblings('.top.part').children('.rightside').children('.top').children('.project-timesheet-remaining').text(`${newremaining} Hrs`).attr('hr',newremaining);
            $(this).parent('.timesheet-body-widget-hours').parent('.timesheet-body-widget-hours-con').siblings('.top.part').children('.rightside').children('.project-timesheet-progress').text(`Task Progress: ${newprog}%`);
            $(this).parent('.timesheet-body-widget-hours').parent('.timesheet-body-widget-hours-con').siblings('.top.part').children('.rightside').children('.project-timesheet-progress').css({
                'background' : `linear-gradient(146deg, teal ${newprog}%, grey ${newprog+3}%)`  
            });

        };
        cbcomplete();
        const callback = ()=>{
            ACCUSER.getProject(projectid).Timesheet.fillTimesheetSingle({"taskid" : taskid, "ownerid" : __ID});
            cbcomplete();
            updateTimesheetFooter();
        };
        
        ACCUSER.getProject(projectid).Timesheet.delete({"id" : id}, callback);
    }
});
$(document).on('click', '.project-timesheet-calendar', function(){
    const projectid = $('#timesheet-header-projectid').text();
    const taskid = $(this).parent('div.top').parent('div.rightside').parent('.top.part').parent('.timesheet-body-widget').attr('taskid');
    const taskname = $(this).parent('div.top').parent('div.rightside').siblings('div.leftside').children('.project-timesheet-taskname').text();
    const con = $(this).parent('div.top').parent('div.rightside').parent('.top.part').siblings('.bottom.part');
    const max = $(this).parent('div.top').parent('div.rightside').siblings('div.leftside').children('.project-timesheet-enddate').val();
    const min = $(this).parent('div.top').parent('div.rightside').siblings('div.leftside').children('.project-timesheet-startdate').val();

    const sd = new Date(`${min} 00:00:00`);
    const ed = new Date(`${max} 00:00:00`);

    const sdDay = sd.getDay();
    const edDay = ed.getDay();

    const sdd = numToDay(sdDay);
    const edd = numToDay(edDay);
    const diff = dateFns.differenceInCalendarDays(ed,sd);
    const start = dateFns.startOfWeek(sd, {weekStartsOn: 1});
    const ssss = dateFns.format(
        start,
        'YYYY-MM-DD'
    );
    const end = new Date(`${ssss} 00:00:00`);
    end.setDate(end.getDate() + 7);

    // console.log(sdd, edd, diff, start);


    // // const darr = getDaysArray(sd, ed);
    // // console.log(taskid);
    const darr = ACCUSER.getProject(projectid).Timesheet.getDaysByTask({"taskid" : taskid, "accid" : __ID});


    

    const sw = dateFns.format(
        start,
        'MMMM DD'
    );
    const ew = dateFns.format(
        end,
        'MMMM DD'
    );

    let tcal = [];
    tcal[0] = 0;
    tcal[1] = 0;
    tcal[2] = 0;
    tcal[3] = 0;
    tcal[4] = 0;
    tcal[5] = 0;
    tcal[6] = 0;

    // $('.timesheet-calendar-taskname').text(taskname);
    // $('.timesheet-calendar-week').text(`${sw} to ${ew}`);
    let hours = 0;
    $.each(darr, function(key, value){
        const date = new Date(`${value.date} 00:00:00`);
        const zs = dateFns.startOfWeek(date, {weekStartsOn: 1});
        console.log(start, zs);
        if(start.getTime() === zs.getTime()){
            const dd = date.getDay();
            console.log(dd);
            tcal[dd] = parseFloat(value.hours) + parseFloat(tcal[dd]);
            hours += parseFloat(value.hours);
        }
    });


    if(end.getTime() > ed.getTime()){
        $('.timesheet-calendar-next').prop('disabled', true);
    }else{
        $('.timesheet-calendar-next').prop('disabled', false);
    }

    if(sd.getTime() > start.getTime()){
        $('.timesheet-calendar-prev').prop('disabled', true);
    }else{
        $('.timesheet-calendar-prev').prop('disabled', false);
    }

    $('.timesheet-calendar-con').empty().append(`
        <div class="timesheet-calendar-widget" sd="${min}" ed="${max}" tid="${taskid}" start="${ssss}">
            <div class="timesheet-calendar-widget-title">
                <span class="timesheet-calendar-taskname">${taskname}</span>
                <span class="timesheet-calendar-week">${sw} to ${ew}</span>
            </div>
            <div class="timesheet-calendar-widget-body">
                <button class="timesheet-calendar-prev"><i class="fas fa-caret-left"></i></button>
                <div class="calendar">
                <div class="top">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                    <span>Total Hours</span>
                </div>
                <div class="bottom">
                    <span class="timesheet-calendar-mon">${tcal[1]}</span>
                    <span class="timesheet-calendar-tue">${tcal[2]}</span>
                    <span class="timesheet-calendar-wed">${tcal[3]}</span>
                    <span class="timesheet-calendar-thu">${tcal[4]}</span>
                    <span class="timesheet-calendar-fri">${tcal[5]}</span>
                    <span class="timesheet-calendar-sat">${tcal[6]}</span>
                    <span class="timesheet-calendar-sun">${tcal[0]}</span>
                    <span class="timesheet-calendar-total">${hours}</span>
                </div>
                </div>
                <button class="timesheet-calendar-next"><i class="fas fa-caret-right"></i></button>
            </div>
        </div>
    `);

    $('.timesheet-calendar').css({"display" : "flex"}).show();

});

    // timesheet calendar events
$(document).on('click', '.timesheet-calendar-next', function(){
    const projectid = $('#timesheet-header-projectid').text();
    const taskid = $(this).parent('.timesheet-calendar-widget-body').parent('.timesheet-calendar-widget').attr('tid');
    const sd = new Date(`${$(this).parent('.timesheet-calendar-widget-body').parent('.timesheet-calendar-widget').attr('sd')} 00:00:00`);
    const ed = new Date(`${$(this).parent('.timesheet-calendar-widget-body').parent('.timesheet-calendar-widget').attr('ed')} 00:00:00`);

    const start = new Date(`${$(this).parent('.timesheet-calendar-widget-body').parent('.timesheet-calendar-widget').attr('start')} 00:00:00`);
    start.setDate(start.getDate() + 7);
    const ssss = dateFns.format(
        start,
        'YYYY-MM-DD'
    );
    const end  = new Date(`${$(this).parent('.timesheet-calendar-widget-body').parent('.timesheet-calendar-widget').attr('start')} 00:00:00`);
    end.setDate(end.getDate() + 14);

    const darr = ACCUSER.getProject(projectid).Timesheet.getDaysByTask({"taskid" : taskid, "accid" : __ID});


    const sw = dateFns.format(
        start,
        'MMMM DD'
    );
    const ew = dateFns.format(
        end,
        'MMMM DD'
    );

    let tcal = [];
    tcal[0] = $(this).siblings('.calendar').children('.bottom').children('.timesheet-calendar-sun');
    tcal[1] = $(this).siblings('.calendar').children('.bottom').children('.timesheet-calendar-mon');
    tcal[2] = $(this).siblings('.calendar').children('.bottom').children('.timesheet-calendar-tue');
    tcal[3] = $(this).siblings('.calendar').children('.bottom').children('.timesheet-calendar-wed');
    tcal[4] = $(this).siblings('.calendar').children('.bottom').children('.timesheet-calendar-thu');
    tcal[5] = $(this).siblings('.calendar').children('.bottom').children('.timesheet-calendar-fri');
    tcal[6] = $(this).siblings('.calendar').children('.bottom').children('.timesheet-calendar-sat');

    $.each(tcal, function(key, value){
        value.text('0');
    });

    $('.timesheet-calendar-week').text(`${sw} to ${ew}`);
    let hours = 0;
    $.each(darr, function(key, value){
        const date = new Date(`${value.date} 00:00:00`);
        const zs = dateFns.startOfWeek(date, {weekStartsOn: 1});
        console.log(start, zs);
        if(start.getTime() === zs.getTime()){
            const dd = date.getDay();
            console.log(dd);
            const tcalz = tcal[dd].text();
            tcal[dd].text(parseFloat(value.hours) + parseFloat(tcalz));
            hours += parseFloat(value.hours);
        }
    });

    $(this).siblings('.calendar').children('.bottom').children('.timesheet-calendar-total').text(hours);
    $(this).parent('.timesheet-calendar-widget-body').parent('.timesheet-calendar-widget').attr('start', ssss);
    
    if(end.getTime() > ed.getTime()){
        $(this).prop('disabled', true);
    }else{
        $(this).prop('disabled', false);
    }

    if(sd.getTime() > start.getTime()){
        $(this).siblings('.timesheet-calendar-prev').prop('disabled', true);
    }else{
        $(this).siblings('.timesheet-calendar-prev').prop('disabled', false);
    }
    
});
$(document).on('click', '.timesheet-calendar-prev', function(){
    const projectid = $('#timesheet-header-projectid').text();
    const taskid = $(this).parent('.timesheet-calendar-widget-body').parent('.timesheet-calendar-widget').attr('tid');
    const sd = new Date(`${$(this).parent('.timesheet-calendar-widget-body').parent('.timesheet-calendar-widget').attr('sd')} 00:00:00`);
    const ed = new Date(`${$(this).parent('.timesheet-calendar-widget-body').parent('.timesheet-calendar-widget').attr('ed')} 00:00:00`);

    const start = new Date(`${$(this).parent('.timesheet-calendar-widget-body').parent('.timesheet-calendar-widget').attr('start')} 00:00:00`);
    start.setDate(start.getDate() - 7);
    const ssss = dateFns.format(
        start,
        'YYYY-MM-DD'
    );
    const end  = new Date(`${$(this).parent('.timesheet-calendar-widget-body').parent('.timesheet-calendar-widget').attr('start')} 00:00:00`);
    end.setDate(end.getDate() - 14);

    const darr = ACCUSER.getProject(projectid).Timesheet.getDaysByTask({"taskid" : taskid, "accid" : __ID});


    const sw = dateFns.format(
        start,
        'MMMM DD'
    );
    const ew = dateFns.format(
        end,
        'MMMM DD'
    );

    let tcal = [];
    tcal[0] = $(this).siblings('.calendar').children('.bottom').children('.timesheet-calendar-sun');
    tcal[1] = $(this).siblings('.calendar').children('.bottom').children('.timesheet-calendar-mon');
    tcal[2] = $(this).siblings('.calendar').children('.bottom').children('.timesheet-calendar-tue');
    tcal[3] = $(this).siblings('.calendar').children('.bottom').children('.timesheet-calendar-wed');
    tcal[4] = $(this).siblings('.calendar').children('.bottom').children('.timesheet-calendar-thu');
    tcal[5] = $(this).siblings('.calendar').children('.bottom').children('.timesheet-calendar-fri');
    tcal[6] = $(this).siblings('.calendar').children('.bottom').children('.timesheet-calendar-sat');

    $.each(tcal, function(key, value){
        value.text('0');
    });

    $(this).siblings('.calendar').children('.bottom').children('.timesheet-calendar-week').text(`${sw} to ${ew}`);
    let hours = 0;
    $.each(darr, function(key, value){
        const date = new Date(`${value.date} 00:00:00`);
        const zs = dateFns.startOfWeek(date, {weekStartsOn: 1});
        console.log(start, zs);
        if(start.getTime() === zs.getTime()){
            const dd = date.getDay();
            console.log(dd);
            const tcalz = tcal[dd].text();
            tcal[dd].text(parseFloat(value.hours) + parseFloat(tcalz));
            hours += parseFloat(value.hours);
        }
    });

    $('.timesheet-calendar-total').text(hours);
    $(this).parent('.timesheet-calendar-widget-body').parent('.timesheet-calendar-widget').attr('start', ssss);

    
    if(sd.getTime() > start.getTime()){
        $(this).prop('disabled', true);
    }else{
        $(this).prop('disabled', false);
    }

    if(end.getTime() > ed.getTime()){
        $(this).siblings('.timesheet-calendar-next').prop('disabled', true);
    }else{
        $(this).siblings('.timesheet-calendar-next').prop('disabled', false);
    }
    
});

    // mods events
$('#timesheet-mods-week').on('change', function(){
    const projectid = $('#timesheet-header-projectid').text();
    const week = $(this).val();
    const y = week.split('-')[0];
    const w = week.split('W').pop();
    const sd = new Date(`${y}-01-01 00:00:00`);
    sd.setDate(sd.getDate() + ((7 * (w - 1)) - (sd.getDay() - 1) )); // setting the day multiplied by weeks minus getDay
    const ed = new Date(sd);
    ed.setHours(0,0,0,0);
    ed.setDate(ed.getDate() + 7);
    
    setProjectTimesheetCalendarByProjectId({"projectid" : projectid, "selector" : "timesheet-week-widget-con", "week" : week});
    const ps = ACCUSER.getConnectedProjects();
    let list = [];
    list[0] = 0;
    list[1] = 0;
    list[2] = 0;
    list[3] = 0;
    list[4] = 0;
    list[5] = 0;
    list[6] = 0;
    

    $.each(ps, function(key, value){
        const zcb=data=>{
            console.log(data);
        };
        ACCUSER.getProject(value.projectid).checkList('Timesheet', zcb);
    });

    $.each(ps, function(key, value){
        const x =  getProjectTimesheetCalendarByProjectId({"projectid" : value.projectid, "week" : week});
        $.each(list, function(key, value1){
            list[key] = value1 + x[key];
        });
    });
    let dcon = [];
    dcon[0] = $(`.timesheet-pweek-widget-con.sun`);
    dcon[1] = $(`.timesheet-pweek-widget-con.mon`);
    dcon[2] = $(`.timesheet-pweek-widget-con.tue`);
    dcon[3] = $(`.timesheet-pweek-widget-con.wed`);
    dcon[4] = $(`.timesheet-pweek-widget-con.thu`);
    dcon[5] = $(`.timesheet-pweek-widget-con.fri`);
    dcon[6] = $(`.timesheet-pweek-widget-con.sat`);
    for(let dt = new Date(sd); dt < ed; dt.setDate(dt.getDate() + 1)){
        const showdate = dateFns.format(dt, 'MMM DD, YYYY');
        const showday = numToDay(dt.getDay());
        dcon[dt.getDay()].children('span.title').html(`${showday}<br>${showdate}`);
    }
    let th = 0;
    $.each(list, function(key, value){
        dcon[key].children('span.hours').html(`${value} Hrs`);
        th += parseFloat(value);
    });
    $(`.timesheet-pweek-widget-con.total`).children('.hours').html(`${th} Hrs`);
    $('.timesheet-week').css({"display" : "flex"}).show();
});
$('#timesheet-mods-calendar').on('click', function(){
    $('#timesheet-mods-week').trigger('change');
});

    // ui events
$('.timesheet-calendar').click(function(e){
    if(e.target != this){
        return;
    }else{
        $('.timesheet-calendar').hide();
    }
});
$('.timesheet-pweek-con-close').click(function(){
    $('.timesheet-week').css({"display" : "none"}).hide();
});
$('.timesheet-week').click(function(e){
    if(this != e.target){
        return;
    }else{
        $(this).css({"display" : "none"}).hide();
    }
});



















// PROJECT MINUTES EVENTS

    //static events
$(document).on('click', '.minutes-addform-con > i.close', function(){
    $('.minutes-addform').addClass('hidden').hide();
});
$('#preferences-body-minutes-add').click(function(){
    // ACCOUNT_PROJECT_LIST.fillSelectTag($('#minutes-description-responsible'));
    // $('#minutes-description-responsible').prepend(`
    //     <option value="general">General Account</option>
    // `);

    $('.minutes-addform-date').val(getDateNow()).prop('disabled', false);
    $('.minutes-addform-time').val(getTimeNow()).prop('disabled', false);
    $('.minutes-addform-subject').val('').prop('disabled', false);
    $('.minutes-addform-location').val('').prop('disabled', false);
    $('.minutes-addform-attendees').val('').prop('disabled', false);
    
    $('.minutes-addform-widget-con').empty();
    $('#minutes-addform-submit').attr('status', 'save').css('display', 'none').hide();
    // $('#minutes-description-type').val('info');
    // $('#minutes-description-responsible')[0].selectedIndex = 0;
    // $('#minutes-description-hours').val('');
    // $('#minutes-description-due').val(getDateNow());
    // $('#minutes-description-description').val('');
    
    $('#minutes-addform-delete').hide();
    // $('#minutes-description-save').css({'width': '100%', 'border-bottom-left-radius': '15px'}).attr('status', 'save');
    $('.minutes-addform').css('display', 'flex').show();
    $('#minutes-addform-addmins').css('display', 'block').show();

    // $('.minutes-description-con').children('.sameline.actiontype').hide();
    // $('.minutes-description-con').children('.sameline.responsible').children('.sameline-.hours').hide();
    // $('.minutes-description-con').children('.sameline.responsible').children('.sameline-.responsible').css({'width': '100%'});

});
$('.minutes-addform').click(function(e){
    if(e.target == this){
        $(this).addClass('hidden').hide();
    }else{
       return;
    }
});
$('#minutes-addform-addmins').click(function(){
    const id = rngProjectMinuteId();
    $('.minutes-addform-widget-con').append(`
    <div id="minute_${id}" class="minutes-addform-widget">
        <div class="line1">
        <div class="minutes-sameline- type">
            <span>Type</span>
            <select class="minutes-addform-type">
            <option value="info">I</option>
            <option value="change">C</option>
            <option value="decision">D</option>
            <option value="action">A</option>
            </select>
        </div>
        <div class="minutes-sameline- desc">
            <span>Description</span>
            <textarea class="minutes-addform-description" maxlength="200"></textarea>
        </div>
        <i class="minutes-addform-widget-remove fas fa-trash"></i>
        </div>
        <div class="line2 hidden">
        <div class="minutes-sameline- actiontype ">
            <span>Type of Resource</span>
            <select class="minutes-addform-typea" name="" id="">
            <option value="hours">Team</option>
            <option value="supplier">Supplier</option>
            <option value="tm">T&M</option>
            </select>
        </div>
        <div class="minutes-sameline- responsible">
            <span>Responsible</span>
            <select class="minutes-addform-responsible">
            <option value="">Name1</option>
            <option value="">Name2</option>
            <option value="">Name3</option>
            <option value="">Name4</option>
            </select>
        </div>
        <div class="minutes-sameline- hours">
            <span>Hours</span>
            <input class="minutes-addform-hours" type="text">
        </div>
        <div class="minutes-sameline- due ">
            <span>Due Date</span>
            <input class="minutes-addform-due" class="due" type="date">
        </div>
        </div>

        
        
        
    </div>
    `);
    
    $('#minutes-addform-submit').css('display', 'block').show();
});
$('#preferences-body-minutes-search').click(function(){
    console.log('Active Project > Launch > Minutes > Search');

    const prid = $('#preferences-header-projectid').html();
    const fromDate = $('#preferences-body-minutes-from-date').val();
    const dateRange = $('#preferences-body-minutes-to-date').val();
    const subject = $('#preferences-body-minutes-search-subject').val();
    let toDate;

    console.log(prid, fromDate, dateRange, subject);
    if(fromDate == ""){
        toDate = new Date();
    }else{
        toDate = new Date(new Date(fromDate));
        toDate.setDate(toDate.getDate() + 1);
    }
    console.log('Before Date',toDate);

    if(dateRange == '1w'){
        toDate.setDate(toDate.getDate() + 7);
    }else if(dateRange == '2w'){
        toDate.setDate(toDate.getDate() + 14);
    }else if(dateRange == '1m'){
        toDate.setMonth(toDate.getMonth() + 1);
    }else if(dateRange == '2m'){
        toDate.setMonth(toDate.getMonth() + 2);
    }else if(dateRange == '4m'){
        toDate.setMonth(toDate.getMonth() + 4);
    }else if(dateRange == '6m'){
        toDate.setMonth(toDate.getMonth() + 6);
    }else if(dateRange == '1y'){
        toDate.setYear(toDate.getYear() + 1);
    }else if(dateRange == '2y'){
        toDate.setYear(toDate.getYear() + 2);
    }else if(dateRange == '5y'){
        toDate.setYear(toDate.getYear() + 5);
    }
    console.log('After Date',toDate);

    const list = ACCUSER.getProject(prid).Minutes.search(new Date(fromDate), toDate, subject);
    console.log(list);
    ACCUSER.getProject(prid).Minutes.fillMinutesByList(list);

});
$('#preferences-body-minutes-view-all').click(function(){
    console.log('Active Project > Launch > Minutes > View All');
    const prid = $('#preferences-header-projectid').html();
    ACCUSER.getProject(prid).Minutes.fillMinutes();
});

    // addform events
$(document).on('change', '.minutes-addform-type', function(){
    const projectid = $('#preferences-header-projectid').text();
    const status = $(this).val();
    console.log(status);
    if(status == 'action'){
        $(this).parent('.minutes-sameline-').parent('.line1').siblings('.line2').css('display','flex').show();
        $(this).parent('.minutes-sameline-').parent('.line1').siblings('.line2.actiontype').children('.minutes-addform-typea').val('hours');
        
        ACCUSER.getProject(projectid).fillSelectTagWithConnectedAccount($(this).parent('.minutes-sameline-').parent('.line1').siblings('.line2').children('.minutes-sameline-.responsible').children('.minutes-addform-responsible'));
        $(this).parent('.minutes-sameline-').parent('.line1').siblings('.line2').children('.minutes-sameline-.responsible').children('.minutes-addform-responsible').prepend(`
            <option value="ghost">General Account</option>
        `);
        $(this).parent('.minutes-sameline-').parent('.line1').siblings('.line2').children('.minutes-sameline-.responsible').children('.minutes-addform-responsible')[0].selectedIndex = 0;

    }else{
        $(this).parent('.minutes-sameline-').parent('.line1').siblings('.line2').css('display','none').hide();
    }

});
$(document).on('click', '.minutes-addform-widget-remove', function(){
    $(this).parent('.line1').parent('.minutes-addform-widget').remove();
    let x = 0;
    $('.minutes-addform-widget-con').children('.minutes-addform-widget').each(function(){
        x++;
    });
    if(x == 0){
        $('#minutes-addform-submit').css('display', 'none').hide();
    }
});
$(document).on('click', '.minutes-addform-typea', function(){
    const projectid = $('#preferences-header-projectid').text();
    const id = $(this).val();
    console.log(id);
    if(id == 'supplier'){
        $(this).parent('.minutes-sameline-.actiontype').siblings('.minutes-sameline-.hours').hide();
        $(this).parent('.minutes-sameline-.actiontype').siblings('.minutes-sameline-.responsible').css({'width': '75%'});
    }else{
        $(this).parent('.minutes-sameline-.actiontype').siblings('.minutes-sameline-.hours').show();
        $(this).parent('.minutes-sameline-.actiontype').siblings('.minutes-sameline-.responsible').css({'width': '60%'});
    }
    
    if(id == 'supplier' || id == 'tm'){
        ACCUSER.Supplier.fillSelectTag( $(this).parent('.minutes-sameline-.actiontype').siblings('.minutes-sameline-.responsible').children('.minutes-addform-responsible'));
    }else if(id == 'hours'){
        ACCUSER.getProject(projectid).fillSelectTagWithConnectedAccount($(this).parent('.minutes-sameline-.actiontype').siblings('.minutes-sameline-.responsible').children('.minutes-addform-responsible'));
        $(this).parent('.minutes-sameline-.actiontype').siblings('.minutes-sameline-.responsible').children('.minutes-addform-responsible').prepend(`
            <option value="ghost">General Account</option>
        `);
        $(this).parent('.minutes-sameline-.actiontype').siblings('.minutes-sameline-.responsible').children('.minutes-addform-responsible')[0].selectedIndex = 0;
    }

});

    // saving events
$('#minutes-addform-submit').click(function(){
    console.log('test');
    const status = $(this).attr('status');

    const partid = rngProjectMinutePartId();
    const projectid = $('#preferences-header-projectid').text();
    const date = $('.minutes-addform-date').val();
    const time = $('.minutes-addform-time').val();
    const subject = $('.minutes-addform-subject').val();
    const location = $('.minutes-addform-location').val();
    const attendees = $('.minutes-addform-attendees').val();
    let createTaskGate = true;
    let createTaskId = '';

    $('.minutes-addform-widget-con').children('.minutes-addform-widget').each(function(){
        const type = $(this).children('.line1').children('.minutes-sameline-.type').children('.minutes-addform-type').val();
        const description = $(this).children('.line1').children('.minutes-sameline-.desc').children('.minutes-addform-description').val();
        const mid = $(this).attr('id').split('_').pop();
        let responsible = '';
        let respotype = '';
        let respohours = '';
        let due = '';

        if(status == 'save'){
            if(type == 'action'){
                // console.log($(this).children('.minutes-sameline.actiontype').children('.minutes-addform-type-hour'));
                respotype = $(this).children('.line2').children('.minutes-sameline-.actiontype').children('.minutes-addform-typea').val();
                console.log('RESPOTYPE::::: ', respotype);
                responsible = $(this).children('.line2').children('.minutes-sameline-.responsible').children('.minutes-addform-responsible').val();
                respohours = $(this).children('.line2').children('.minutes-sameline-.hours').children('.minutes-addform-hours').val();
                due = $(this).children('.line2').children('.minutes-sameline-.due').children('.minutes-addform-due').val();
            }else{
                responsible = 'na';
                respotype = 'na';
                respohours = 'na';
                due = '0000-00-00';
            }
    
            const options = {
                "id": mid,
                "partid": partid,
                "projectid": projectid,
                "ownerid": __ID,
                "date": date,
                "time": time,
                "subject": subject,
                "type": type,
                "mode" : "meeting",
                "location": location,
                "attendees": attendees,
                "responsible": responsible,
                "respotype": respotype,
                "respohours": respohours,
                "due": due,
                "description": description
            }
            console.log(options);
            // console.log('Save Sequence');
            const cb=()=>{
                // console.log('Nice');
                const registerOptions = {
                    "id" : rngProjectRegisterId(),
                    "projectid" : options.projectid,
                    "ownerid" : options.ownerid,
                    "date" : options.date,
                    "time" : options.time,
                    "subject" : options.subject,
                    "type" : options.type,
                    "mode" : options.mode,
                    "impact" : "",
                    "impdescription" : "",
                    "description" : options.description
                };
                let tt = '';
                if(createTaskGate){
                    tt = rngTaskId();
                }else{
                    tt = createTaskId;
                }

                const taskOptions = {
                    "taskid" : tt,
                    "trid" : rngTaskResourceId(),
                    "projectid" : options.projectid,
                    "planid" : 'nst',
                    "taskname" : options.subject,
                    "startdate" : options.date,
                    "enddate" : options.due,
                    "subject" : options.subject,
                    "type" : options.respotype,
                    "supplierid" : options.responsible,
                    "accid" : options.responsible,
                    "hours" : options.respohours,
                    "firstname" : "",
                    "lastname" : "",
                    "suppliername" : "",
    
                };
    
                if(options.type == 'change' || options.type == 'decision'){
                    const callback1=()=>{
                        ACCUSER.getProject(projectid).Register.addToList(x);
                    };
                    const x = new ProjectRegister(registerOptions);
                    x.create(callback1);
                }else if(options.type == 'info'){
                    const callback2=()=>{
                        ACCUSER.getProject(projectid).Notes.addToList(x);
                    };
                    const x = new ProjectRegister(registerOptions);
                    x.create(callback2);
                }else if(options.type == 'action'){
                    if(createTaskGate){
                        console.log('taskOptions', taskOptions);
                        if(taskOptions.type == 'hours'){
                            taskOptions.supplierid = '';
                            const obj = ACCUSER.getProject(projectid).getConnectObjById(taskOptions.accid);
                            taskOptions.firstname = obj.firstname;
                            taskOptions.lastname = obj.lastname;
                        }else if(taskOptions.type == 'supplier' || taskOptions.type == 'tm'){
                            taskOptions.accid = '';
                            const obj = ACCUSER.Supplier.getObjById(taskOptions.supplierid);
                            taskOptions.suppliername = obj.name;
                        }
        
                        const callback = ()=>{
                            const callback1 = ()=>{
                                // ACCUSER.getProject(projectid).TaskResource.addObjToList(taskOptions);
                                const na = {
                                    "response" : "na"
                                };
                                const ddataview = {
                                    "projectid" : projectid,
                                    "taskid" : taskOptions.taskid
                                };
                                const aloptions = {
                                    'id' : rngAlertId(),
                                    'ownerid' : taskOptions.accid,
                                    'fn' : 'message-viewtask',
                                    'dataview' : JSON.stringify(ddataview),
                                    'dataapprove' : JSON.stringify(na),
                                    'datareject' : JSON.stringify(na),
                                    'title' : "Task Assignment",
                                    'message' : `You have Been Assigned to <b>${taskOptions.taskname}</b>. Task ends in ${taskOptions.enddate}`
                                }
                                ACCUSER.Alert.create(aloptions, ()=>{});
                            };
                            ACCUSER.getProject(projectid).TaskResource.create(taskOptions, callback1);
                            // ACCUSER.getProject(projectid).Task.addObjToList(taskOptions);
                        };
                        ACCUSER.getProject(projectid).Task.create(taskOptions, callback);
                        createTaskGate = false;
                        createTaskId = taskOptions.taskid;
                    }else{
                        console.log('taskOptions', taskOptions);
                        const callback1 = ()=>{
                            // ACCUSER.getProject(projectid).TaskResource.addObjToList(taskOptions);
                            const na = {
                                "response" : "na"
                            };
                            const ddataview = {
                                "projectid" : projectid,
                                "taskid" : taskOptions.taskid
                            };
                            const aloptions = {
                                'id' : rngAlertId(),
                                'ownerid' : taskOptions.accid,
                                'fn' : 'message-viewtask',
                                'dataview' : JSON.stringify(ddataview),
                                'dataapprove' : JSON.stringify(na),
                                'datareject' : JSON.stringify(na),
                                'title' : "Task Assignment",
                                'message' : `You have Been Assigned to <b>${taskOptions.taskname}</b>. Task ends in ${taskOptions.enddate}`
                            }
                            ACCUSER.Alert.create(aloptions, ()=>{});
                        };
                        ACCUSER.getProject(projectid).TaskResource.create(taskOptions, callback1);
                    }
                }
                
            };
            // cb();
            ACCUSER.getProject(projectid).Minutes.create(options, cb);
        }
        
    });
    $('.minutes-addform').hide();
});

    // viewing events
$(document).on('click', '.minutes-body-widget > i.fa-eye', function(){
    // console.log('test');
    const  projectid = $('#preferences-header-projectid').text();
    const pid = $(this).parent('.minutes-body-widget').attr('pid');

    console.log(projectid, pid);

    const list = ACCUSER.getProject(projectid).Minutes.getObjByPartId(pid);
    console.log(list);
    $('#minutes-addform-addmins').hide();
    $('#minutes-addform-submit').hide();
    if(list[0].distributionid == null){
        $('#minutes-addform-dist').show().attr("pid", pid);
    }
    $('.minutes-addform-widget-con').empty();

    console.log(list);

    const nl = list.sort((a, b) => (a.type > b.type) ? 1 : -1);

    $.each(nl, function(key, value){
        $('.minutes-addform-date').val(value.date).prop('disabled', true);
        $('.minutes-addform-time').val(value.time).prop('disabled', true);
        $('.minutes-addform-location').val(value.location).prop('disabled', true);
        $('.minutes-addform-attendees').val(value.attendees).prop('disabled', true);
        $('.minutes-addform-subject').val(value.subject).prop('disabled', true);

        const actionhide = value.type == "action" ? true : false;
        const hourshide = value.respotype == "supplier" ? true : false;

        const line2content = actionhide ? `
            <div class="line2 ${actionhide}">
                <div class="minutes-sameline- actiontype">
                    <span>Type of Resource</span>
                    <select class="minutes-addform-typea" name="" id="" disabled>
                        <option value="hours">Team</option>
                        <option value="supplier">Supplier</option>
                        <option value="tm">T&M</option>
                    </select>
                </div>
                <div class="minutes-sameline- responsible">
                    <span>Responsible</span>
                    <select class="minutes-addform-responsible" disabled>
                        <option value="">Name1</option>
                        <option value="">Name2</option>
                        <option value="">Name3</option>
                        <option value="">Name4</option>
                    </select>
                </div>
                <div class="minutes-sameline- hours ">
                    <span>Hours</span>
                    <input class="minutes-addform-hours" type="text" value="${value.respohours}" disabled>
                </div>
                <div class="minutes-sameline- due ">
                    <span>Due Date</span>
                    <input class="minutes-addform-due" class="due" type="date" value="${value.due}" disabled>
                </div>
            </div>
        ` : '';

        console.log(value.description);
        $('.minutes-addform-widget-con').append(`
            <div id="minute_${value.id}" class="minutes-addform-widget">
                <div class="line1">
                    <div class="minutes-sameline- type">
                        <span>Type</span>
                        <select class="minutes-addform-type" disabled>
                        <option value="info">I</option>
                        <option value="change">C</option>
                        <option value="decision">D</option>
                        <option value="action">A</option>
                        </select>
                    </div>
                    <div class="minutes-sameline- desc">
                        <span>Description</span>
                        <textarea class="minutes-addform-description" maxlength="200" disabled>${value.description}</textarea>
                    </div>
                    <i class="minutes-addform-widget-remove"></i>
                </div>
                ${line2content}
            </div>
        `);

        const typecon = $(`#minute_${value.id}`).children('.line1').children('.minutes-sameline-.type').children('.minutes-addform-type');
        const respotypecon = $(`#minute_${value.id}`).children('.line2').children('.minutes-sameline-.actiontype').children('.minutes-addform-typea');
        const responsiblecon = $(`#minute_${value.id}`).children('.line2').children('.minutes-sameline-.responsible').children('.minutes-addform-responsible');
        const mresponsiblecon = $(`#minute_${value.id}`).children('.line2').children('.minutes-sameline-.responsible');
        const hourscon = $(`#minute_${value.id}`).children('.line2').children('.minutes-sameline-.hours');
        
        ACCUSER.getProject(projectid).fillSelectTagWithConnectedAccount(responsiblecon);
        responsiblecon.prepend(`<option value="ghost">General Account</option>`);
        responsiblecon.val(value.responsible);
        respotypecon.val(value.respotype);
        typecon.val(value.type);

        if(hourshide){
            hourscon.hide();
            mresponsiblecon.css("width", "75%");
        }else{
            hourscon.show();
            mresponsiblecon.css("width", "60%"); 
        }

    });

    $('.minutes-addform').css("display", "flex").show();
    
});
    
    // distribute events
$('#minutes-addform-dist').click(function(){
    const pid = $(this).attr('pid');
    // const mid = $(this).attr('mid');
    // console.log('pid', pid);
    const prid = $('#preferences-header-projectid').html();
    // console.log('prid', prid);
    const callback=()=>{
        console.log('Project Minute Distribution Completed');
        $(this).remove();
        showNotification('Successfully Distributed!', 'This minute can now be viewed by everyone connected to the project!');
    };
    ACCUSER.getProject(prid).Minutes.distributeMinute({'partid' : pid, 'projectid' : prid, 'id' : rngProjectMinuteDistributionId()}, callback);
    

});

    // deprecated code
$('#minutes-description-save').click(function(){
    const status = $(this).attr('status');
    const projectid = $('#preferences-header-projectid').text();
    console.log(status);
    if(status == 'save'){
        const id = rngProjectMinuteId();
        const ownerid = __ID;
        const date = $('#minutes-description-date').val();
        const time = $('#minutes-description-time').val();
        const subject = $('#minutes-description-subject').val();
        const type = $('#minutes-description-type').val();
        const mode = $('#minutes-description-mode').val();
        const location = $('#minutes-description-location').val();
        const attendees = $('#minutes-description-attendees').val();
        const responsible = $('#minutes-description-responsible').val();
        const respohours = $('#minutes-description-hours').val();
        const due = $('#minutes-description-due').val();
        const description = $('#minutes-description-description').val();
        let  respotype = "";

        
        let gate = true;

        if($('#minutes-description-type-hour').is(':checked')){
            respotype = 'hours';
        }else if($('#minutes-description-type-supplier').is(':checked')){
            respotype = 'supplier';
        }else if($('#minutes-description-type-tm').is(':checked')){
            respotype = 'tm';
        }

        const options = {
            'id': id,
            'projectid': projectid,
            'ownerid': ownerid,
            'date': date,
            'time': time,
            'subject': subject,
            'type': type,
            'mode': mode,
            'location': location,
            'attendees': attendees,
            'responsible': responsible,
            'respotype': respotype,
            'respohours': respohours,
            'due': due,
            'description': description
        };
        const cb=()=>{
            console.log('Nice');
            const registerOptions = {
                "id" : rngProjectRegisterId(),
                "projectid" : options.projectid,
                "ownerid" : options.ownerid,
                "date" : options.date,
                "time" : options.time,
                "subject" : options.subject,
                "type" : options.type,
                "mode" : options.mode,
                "impact" : "",
                "impdescription" : "",
                "description" : options.description
            };
            const taskOptions = {
                "taskid" : rngTaskId(),
                "trid" : rngTaskResourceId(),
                "projectid" : options.projectid,
                "planid" : 'nst',
                "taskname" : options.subject,
                "startdate" : options.date,
                "enddate" : options.due,
                "subject" : options.subject,
                "type" : options.respotype,
                "supplierid" : options.responsible,
                "accid" : options.responsible,
                "hours" : options.respohours,
                "firstname" : "",
                "lastname" : "",
                "suppliername" : "",

            };

            if(options.type == 'change' || options.type == 'decision'){
                const callback1=()=>{
                    ACCUSER.getProject(projectid).Register.addToList(x);
                };
                const x = new ProjectRegister(registerOptions);
                x.create(callback1);
            }else if(options.type == 'info'){
                const callback2=()=>{
                    ACCUSER.getProject(projectid).Notes.addToList(x);
                };
                const x = new ProjectRegister(registerOptions);
                x.create(callback2);
            }else if(options.type == 'action'){
                // capi_createTask(taskOptions);
                // capi_createTaskResource(taskOptions);
                if(taskOptions.type == 'hours'){
                    taskOptions.supplierid = '';
                    const obj = ACCUSER.getProject(projectid).getConnectObjById(taskOptions.accid);
                    taskOptions.firstname = obj.firstname;
                    taskOptions.lastname = obj.lastname;
                }else if(taskOptions.type == 'supplier' || taskOptions.type == 'tm'){
                    taskOptions.accid = '';
                    const obj = ACCUSER.Supplier.getObjById(taskOptions.supplierid);
                    taskOptions.suppliername = obj.name;
                }

                const callback = ()=>{
                    const callback1 = ()=>{
                        ACCUSER.getProject(projectid).TaskResource.addObjToList(taskOptions);
                        const na = {
                            "response" : "na"
                        };
                        const ddataview = {
                            "projectid" : projectid,
                            "taskid" : taskOptions.taskid
                        };
                        const aloptions = {
                            'id' : rngAlertId(),
                            'ownerid' : taskOptions.accid,
                            'fn' : 'message-viewtask',
                            'dataview' : JSON.stringify(ddataview),
                            'dataapprove' : JSON.stringify(na),
                            'datareject' : JSON.stringify(na),
                            'title' : "Task Assignment",
                            'message' : `You have Been Assigned to <b>${taskOptions.taskname}</b>. Task ends in ${taskOptions.enddate}`
                        }
                        ACCUSER.Alert.create(aloptions, ()=>{});
                    };
                    ACCUSER.getProject(projectid).TaskResource.create(taskOptions, callback1);
                    ACCUSER.getProject(projectid).Task.addObjToList(taskOptions);
                };
                ACCUSER.getProject(projectid).Task.create(taskOptions, callback);
            }

            
        };
        ACCUSER.getProject(projectide).Minutes.crate(options, cb);

    }else if(status == 'update'){
        const id = $('#minutes-description-id').attr('mid');

        const date = $('#minutes-description-date').val();
        const time = $('#minutes-description-time').val();
        const subject = $('#minutes-description-subject').val();
        const type = $('#minutes-description-type').val();
        const mode = $('#minutes-description-mode').val();
        const location = $('#minutes-description-location').val();
        const attendees = $('#minutes-description-attendees').val();
        const responsible = $('#minutes-description-responsible').val();
        let respohours = $('#minutes-description-hours').val();
        const due = $('#minutes-description-due').val();
        const description = $('#minutes-description-description').val();
        let  respotype = "";

        if(type != 'action'){
            respohours = '';
            respotype = '';
        }else{
            if($('#minutes-description-type-hour').is(':checked')){
                respotype = 'hours';
            }else if($('#minutes-description-type-supplier').is(':checked')){
                respotype = 'supplier';
            }else if($('#minutes-description-type-tm').is(':checked')){
                respotype = 'tm';
            }
        }

        const options = {
            'id': id,
            'date': date,
            'time': time,
            'subject': subject,
            'type': type,
            'mode': mode,
            'location': location,
            'attendees': attendees,
            'responsible': responsible,
            'respotype': respotype,
            'respohours': respohours,
            'due': due,
            'description': description
        };

        console.log(options);
        const callback = ()=>{
            ACCUSER.getProject(projectid).Minutes.fillMinutes();
        };
        ACCUSER.getProject(projectid).Minutes.update(options, callback);
    }
    $('.minutes-description').hide();
});












// USER TASKBOARD EVENTS || will work as long as ACCUSER is defined
function appendUserTaskboardTask(container, arr){
    let color = '';
    let con = $(`#usertaskboard-body-widget-${container}`);
    let when;

    const sdate = new Date(`${arr.startdate} 00:00:00`);
    const edate = new Date(`${arr.enddate} 00:00:00`);
    const tdate = new Date();
    let statusContent = '';
    
    tdate.setHours(0,0,0,0);

    // console.log(arr.startdate, sdate, tdate);

    if(container == 'notstarted' ){
        when = dateFns.distanceInWordsStrict(tdate, sdate, {addSuffix: true, unit: 'd'});
    }else if(container == 'started' ){
        when = dateFns.distanceInWordsStrict(tdate, edate, {addSuffix: true, unit: 'd'});
    }else if(container == 'due' ){
        when = dateFns.distanceInWordsStrict(tdate, sdate, {addSuffix: true, unit: 'd'});
    }else if(container == 'pastdue' ){
        when = dateFns.distanceInWordsStrict(tdate, edate, {addSuffix: true, unit: 'd'});
    }else if(container == 'done' ){
        when = dateFns.distanceInWordsStrict(tdate, edate, {addSuffix: true, unit: 'd'});
    }

    if(arr.trstatus == 'tdone'){
        color = 'blue';
    }if(arr.trstatus == 'done'){
        color = 'orange';
    }else if(arr.trstatus == 'work'){
        color = 'green';
    }else if(arr.trstatus == 'dispute'){
        color = 'red';
    }else if(arr.trstatus == 'idle'){
        color = 'grey';
    }

    
    let pmreadContent = '';
    let disputeContent = '';
    let sgd = arr.suggesteddate;

    // console.log(arr[i].firstname, sgd, arr[i].assignment);


    if(arr.pmread == 'unread'){
        pmreadContent = 'icon-alert';
    }
    if( sgd != 'null' && sgd != '' && sgd != null && sgd != undefined && sgd != '0000-00-00'){
        disputeContent = 'icon-alert';
    }
    if( arr.assignment != 'ok' ){
        disputeContent = 'icon-alert';
    }

    if(arr.trstatus == 'idle' || arr.trstatus == 'dispute'){
        statusContent = `
            <i class="usertaskboard-body-widget-icons-start fas fa-briefcase" title="Start Working on this Task"></i>
            <i class="usertaskboard-body-widget-icons-dispute fas fa-exclamation-triangle ${disputeContent}" title="Put Task under dispute"></i>
            <i class="usertaskboard-body-widget-icons-pmmsg fas fa-comment-alt ${pmreadContent}" title="PM Message"></i>
            <i class="usertaskboard-body-widget-icons-usrmsg fas fa-reply" title="Send Message to PM"></i>
        `;
    }else if(arr.trstatus == 'done'){
        statusContent = `
            <i class="usertaskboard-body-widget-icons-tdone fas fa-check-double" title="Set Task as Done"></i>
            <i class="usertaskboard-body-widget-icons-pmmsg fas fa-comment-alt ${pmreadContent}" title="PM Message"></i>
            <i class="usertaskboard-body-widget-icons-usrmsg fas fa-reply" title="Send Message to PM"></i>
        `;
    }else if(arr.trstatus == 'tdone'){
        statusContent = `
            <i class="usertaskboard-body-widget-icons-pmmsg fas fa-comment-alt ${pmreadContent}" title="PM Message"></i>
            <i class="usertaskboard-body-widget-icons-usrmsg fas fa-reply" title="Send Message to PM"></i>
        `;
    }else if(arr.trstatus == 'work'){
        statusContent = `
            <i class="usertaskboard-body-widget-icons-done fas fa-gavel" title="Task is Done"></i>
            <i class="usertaskboard-body-widget-icons-pmmsg fas fa-comment-alt ${pmreadContent}" title="PM Message"></i>
            <i class="usertaskboard-body-widget-icons-usrmsg fas fa-reply" title="Send Message to PM"></i>
        `;
    }

    const sd = arr.startdate;
    const ed = arr.enddate;

    con.append(`
        <div id="usertaskboard_${arr.taskid}" trid="${arr.trid}" class="usertaskboard-body-widget shadow ${color} ">
            <span class="usertaskboard-body-widget-id" title="Task Id">${arr.taskid}</span>
            <div class="usertaskboard-body-widget-name">
                <span class="usertaskboard-body-widget-name-title" >${arr.taskname}</span>
            </div>
            <span class="usertaskboard-body-widget-dates" >${sd} <i class="fas fa-angle-right"></i> ${ed}</span>
            <span class="usertaskboard-body-widget-when" >${when}</span>
            <div class="usertaskboard-body-widget-icons-con">
                ${statusContent}
            </div>
        </div>
    `);
    
}
function fillUsrDisputeCon(options){
    const projectid = $('#usertaskboard-header-projectid').text();
    const resource = ACCUSER.getProject(projectid).TaskResource;
    const obj = resource.getObjById(options.trid);

    const sgd = obj.suggesteddate;

    console.log(obj.assignment);

    if( sgd != 'null' && sgd != '' && sgd != null && sgd != undefined && sgd != '0000-00-00'){
        $('.usertaskboard-dispute-form').children('.usertaskboard-dispute-widget.date').children('.message').text('You Already Sent A request');
        $('.usertaskboard-dispute-form').children('.usertaskboard-dispute-widget.date').children('.msgdate').children('span').text('Selected Request Date');
        $('.usertaskboard-dispute-form').children('.usertaskboard-dispute-widget.date').children('.msgdate').children('input').val(sgd).prop('disabled', true);
        $('.usertaskboard-dispute-form').children('.usertaskboard-dispute-widget.date').children('.usertaskboard-dispute-submit.date').prop('disabled', true).css('cursor', 'not-allowed');
    }else{
        $('.usertaskboard-dispute-form').children('.usertaskboard-dispute-widget.date').children('.message').text('Request a new End Date for the Task');
        $('.usertaskboard-dispute-form').children('.usertaskboard-dispute-widget.date').children('.msgdate').children('span').text('Select Date');
        $('.usertaskboard-dispute-form').children('.usertaskboard-dispute-widget.date').children('.msgdate').children('input').val(getDateNow()).prop('disabled', false);
        $('.usertaskboard-dispute-form').children('.usertaskboard-dispute-widget.date').children('.usertaskboard-dispute-submit.date').prop('disabled', false).css('cursor', 'pointer');
    }
    if( obj.assignment != 'ok' ){
        $('.usertaskboard-dispute-form').children('.usertaskboard-dispute-widget.assignment').children('.message').text('You have already suggested a Team Member');
        $('#usertaskboard-dispute-accountlist').val(obj.assignment).prop('disabled', true);
        $('.usertaskboard-dispute-submit.assignment').prop('disabled', true).css('cursor', 'not-allowed');
    }else{
        $('.usertaskboard-dispute-form').children('.usertaskboard-dispute-widget.assignment').children('.message').text('Suggest a new Team Member to handle Task');
        $('#usertaskboard-dispute-accountlist').prop('disabled', false);
        $('.usertaskboard-dispute-submit.assignment').prop('disabled', false).css('cursor', 'pointer');
    }
}
function fillPmmessageCon(options){
    const projectid = $('#usertaskboard-header-projectid').text();
    const resource = ACCUSER.getProject(projectid).TaskResource;
    const obj = resource.getObjById(options.trid);

    let cm = '';
    if(obj.pmcomment == 'null' || obj.pmcomment == null || obj.pmcomment == undefined){
        cm = 'Empty';
    }else{
        cm = obj.pmcomment;
    }
    $('.usertaskboard-pmmessage-widget').children('.message').text(cm);

}
function fillUsrmessageCon(options){
    const projectid = $('#usertaskboard-header-projectid').text();
    const obj = ACCUSER.getProject(projectid).TaskResource.getObjById(options.trid);
    $('#usertaskboard-usrmessage-msg').text(obj.usercomment);
}
    // usrmsg events
$(document).on('click', '.usertaskboard-body-widget-icons-usrmsg', function(){
    const tid = $(this).parent('.usertaskboard-body-widget-icons-con').parent('.usertaskboard-body-widget').attr('id').split('_').pop();
    const trid = $(this).parent('.usertaskboard-body-widget-icons-con').parent('.usertaskboard-body-widget').attr('trid');

    fillUsrmessageCon({"trid" : trid});
    $('.usertaskboard-usrmessage-con').attr({"tid" : tid, "trid" : trid}).css({"display" : "flex"}).show();
});
$('.usertaskboard-usrmessage-con').click(function(e){
    if(e.target != this){
        return;
    }else{
        $(this).css({"display" : "none"}).hide();
    }
});
$('#usertaskboard-usrmessage-submit').click(function(){
    const projectid = $('#usertaskboard-header-projectid').text();
    const msg = $(this).siblings('#usertaskboard-usrmessage-msg').val();
    const tid = $(this).parent('.usertaskboard-usrmessage-form').parent('.usertaskboard-usrmessage-con').attr('tid');
    const trid = $(this).parent('.usertaskboard-usrmessage-form').parent('.usertaskboard-usrmessage-con').attr('trid');

    const callback = ()=>{
        const callback1 = ()=>{
            console.log(tid, trid, msg);
            $('.usertaskboard-usrmessage-con').css({"display" : "none"}).hide();
            const na = {
                "response" : "na"
            };
            const nastr = JSON.stringify(na);
            const approveobj = {
                "trid" : trid,
                "columnname" : "pmread",
                "value" : 'read',
                "projectid" : projectid
            }
            const approveobjstr = JSON.stringify(approveobj);
            const probj = ACCUSER.getProject(projectid).getData();
            const trobj = ACCUSER.getProject(projectid).Task.getTaskObj(tid);
            const aloptions = {
                'id' : rngAlertId(),
                'ownerid' : probj.ownerid,
                'fn' : 'taskboard-message-markasread',
                'dataview' : nastr,
                'dataapprove' : approveobjstr,
                'datareject' : nastr,
                'title' : `New Message From <b>${trobj.taskname}</b>`,
                'message' : `<b>${__FIRST_NAME}</b> said: ${msg}`
            }
            console.log("DELETE ME",aloptions);
            ACCUSER.Alert.create(aloptions, ()=>{});
        };
        const options = {
            "trid" : trid,
            "columnname" : "usrread",
            "value" : 'unread'
        };
        ACCUSER.getProject(projectid).TaskResource.updateColumn(options, callback1);
    };
    const options = {
        "trid" : trid,
        "columnname" : "usercomment",
        "value" : msg
    };
    ACCUSER.getProject(projectid).TaskResource.updateColumn(options, callback);
});

    // pmmsg events
$(document).on('click', '.usertaskboard-body-widget-icons-pmmsg', function(){
    const tid = $(this).parent('.usertaskboard-body-widget-icons-con').parent('.usertaskboard-body-widget').attr('id').split('_').pop();
    const trid = $(this).parent('.usertaskboard-body-widget-icons-con').parent('.usertaskboard-body-widget').attr('trid');

    fillPmmessageCon({"trid" : trid});
    $('.usertaskboard-pmmessage-con').attr({"tid" : tid, "trid" : trid}).css({"display" : "flex"}).show();
    console.log(tid, trid);
});
$('.usertaskboard-pmmessage-close').click(function(){
    $('.usertaskboard-pmmessage-con').css({"display" : "none"}).hide();
});
$('.usertaskboard-pmmessage-con').click(function(e){
    if(e.target != this){
        return;
    }else{
        $(this).css({"display" : "none"}).hide();
    }
});
$('.usertaskboard-pmmessage-widget').children('.mark').click(function(){
    const projectid = $('#usertaskboard-header-projectid').text();
    const trid = $(this).parent('.usertaskboard-pmmessage-widget').parent('.usertaskboard-pmmessage-form').parent('.usertaskboard-pmmessage-con').attr('trid');
    console.log(trid);

    const callback = ()=>{
        // fillPmmessageCon({"trid" : trid});
        $('#usertaskboard-header-search-submit').click();
    };
    const options = {
        "trid" : trid,
        "columnname" : "pmread",
        "value" : 'read'
    };
    ACCUSER.getProject(projectid).TaskResource.updateColumn(options, callback);
});

    // dispute events
$(document).on('click', '.usertaskboard-body-widget-icons-dispute', function(){
    const tid = $(this).parent('.usertaskboard-body-widget-icons-con').parent('.usertaskboard-body-widget').attr('id').split('_').pop();
    const trid = $(this).parent('.usertaskboard-body-widget-icons-con').parent('.usertaskboard-body-widget').attr('trid');

    fillUsrDisputeCon({"trid" : trid});
    $('.usertaskboard-dispute-con').attr({"tid" : tid, "trid" : trid}).css({"display" : "flex"}).show();
});
$('.usertaskboard-dispute-close').click(function(){
    $('.usertaskboard-dispute-con').css({"display" : "none"}).hide();
});
$('.usertaskboard-dispute-con').click(function(e){
    if(e.target != this){
        return;
    }else{
        $(this).css({"display" : "none"}).hide();
    }
});
$('.usertaskboard-dispute-submit.date').click(function(){
    const projectid = $('#usertaskboard-header-projectid').text();
    const sd = $('#usertaskboard-dispute-widget-suggestedenddate').val();
    const tid = $(this).parent('.usertaskboard-dispute-widget').parent('.usertaskboard-dispute-form').parent('.usertaskboard-dispute-con').attr('tid');
    const trid = $(this).parent('.usertaskboard-dispute-widget').parent('.usertaskboard-dispute-form').parent('.usertaskboard-dispute-con').attr('trid');

    const callback = ()=>{
        const callback = ()=>{
            const callback1 = ()=>{
                console.log(tid, trid, sd);
                fillUsrDisputeCon({"trid" : trid});
                $('#usertaskboard-header-search-submit').click();

                const na = {
                    "response" : "na"
                };
                const nastr = JSON.stringify(na);
                const dataviewobj = {
                    "trid" : trid,
                    "projectid" : projectid
                };
                const dataapproveobj = {
                    "taskid" : tid,
                    "projectid" : projectid,
                    "enddate" : sd,
                    "accid" : __ID
                };
                const datarejectobj = {
                    "taskid" : tid,
                    "projectid" : projectid,
                    "accid" : __ID
                };
                const probj = ACCUSER.getProject(projectid).getData();
                const trobj = ACCUSER.getProject(projectid).Task.getTaskObj(tid);
                const aloptions = {
                    'id' : rngAlertId(),
                    'ownerid' : probj.ownerid,
                    'fn' : 'usertaskboard-dispute-date',
                    'dataview' : JSON.stringify(dataviewobj),
                    'dataapprove' : JSON.stringify(dataapproveobj),
                    'datareject' : JSON.stringify(datarejectobj),
                    'title' : "Task Dispute",
                    'message' : `<b>${__FIRST_NAME}</b> suggested to use a new enddate on the task <b>${trobj.taskname}</b> into ${sd}`
                }
                console.log("DELETE ME",aloptions);
                ACCUSER.Alert.create(aloptions, ()=>{});
            };
            ACCUSER.getProject(projectid).Task.updateColumn({"taskid" : tid, "columnname" : "status", "value" : "dispute"}, callback1);
        };
        const options = {
            "trid" : trid,
            "columnname" : "status",
            "value" : "dispute"
        };
        ACCUSER.getProject(projectid).TaskResource.updateColumn(options, callback);
    };
    const options = {
        "trid" : trid,
        "columnname" : "suggesteddate",
        "value" : sd
    };
    ACCUSER.getProject(projectid).TaskResource.updateColumn(options, callback);
});
$('.usertaskboard-dispute-submit.assignment').click(function(){
    const projectid = $('#usertaskboard-header-projectid').text();
    const accid = $(this).siblings('select').val();
    const tid = $(this).parent('.usertaskboard-dispute-widget').parent('.usertaskboard-dispute-form').parent('.usertaskboard-dispute-con').attr('tid');
    const trid = $(this).parent('.usertaskboard-dispute-widget').parent('.usertaskboard-dispute-form').parent('.usertaskboard-dispute-con').attr('trid');

    const callback = ()=>{
        const callback = ()=>{
            const callback1 = ()=>{
                // console.log(tid, trid, sd);
                fillUsrDisputeCon({"trid" : trid});
                $('#usertaskboard-header-search-submit').click();
                const na = {
                    "response" : "na"
                };
                const dataviewobj = {
                    "trid" : trid,
                    "projectid" : projectid
                };
                const dataapproveobj = {
                    "projectid" : projectid,
                    "taskid" : tid,
                    "oldaccid" : __ID,
                    "newaccid" : accid
                };
                const datarejectobj = {
                    "projectid" : projectid,
                    "taskid" : tid,
                    "accid" : __ID,
                    "newaccid" : accid
                };
                const probj = ACCUSER.getProject(projectid).getData();
                const trobj = ACCUSER.getProject(projectid).Task.getTaskObj(tid);
                const accobj = ACCUSER.getCompanyAccountById(accid);
                const aloptions = {
                    'id' : rngAlertId(),
                    'ownerid' : probj.ownerid,
                    'fn' : 'usertaskboard-dispute-assignment',
                    'dataview' : JSON.stringify(dataviewobj),
                    'dataapprove' : JSON.stringify(dataapproveobj),
                    'datareject' : JSON.stringify(datarejectobj),
                    'title' : "Task Dispute",
                    'message' : `<b>${__FIRST_NAME}</b> suggested to transfer the task <b>${trobj.taskname}</b> to ${accobj.firstname} ${accobj.lastname}`
                }
                console.log("DELETE ME",aloptions);
                ACCUSER.Alert.create(aloptions, ()=>{});
            };
            ACCUSER.getProject(projectid).Task.updateColumn({"taskid" : tid, "columnname" : "status", "value" : "dispute"}, callback1);
        };
        const options = {
            "trid" : trid,
            "columnname" : "status",
            "value" : "dispute"
        };
        ACCUSER.getProject(projectid).TaskResource.updateColumn(options, callback);
    };
    const options = {
        "trid" : trid,
        "columnname" : "assignment",
        "value" : accid
    };
    ACCUSER.getProject(projectid).TaskResource.updateColumn(options, callback);
});

    // done events
$(document).on('click', '.usertaskboard-body-widget-icons-done', function(){
    const projectid = $('#usertaskboard-header-projectid').text();
    const tid = $(this).parent('.usertaskboard-body-widget-icons-con').parent('.usertaskboard-body-widget').attr('id').split('_').pop();
    const trid = $(this).parent('.usertaskboard-body-widget-icons-con').parent('.usertaskboard-body-widget').attr('trid');

    const cbtrue = ()=>{
        const callback = ()=>{
            console.log(tid, trid);
            $('#usertaskboard-header-search-submit').click();
            const na = {
                "response" : "na"
            };
            const probj = ACCUSER.getProject(projectid).getData();
            const trobj = ACCUSER.getProject(projectid).TaskResource.getObjById(trid);
            const tobj = ACCUSER.getProject(projectid).Task.getTaskObj(tid);
            const accobj = ACCUSER.getCompanyAccountById(trobj.accid);
            const aloptions = {
                'id' : rngAlertId(),
                'ownerid' : probj.ownerid,
                'fn' : 'na',
                'dataview' : JSON.stringify(na),
                'dataapprove' : JSON.stringify(na),
                'datareject' : JSON.stringify(na),
                'title' : "Task Updates",
                'message' : `<b>${accobj.firstname}</b> updated their task <b>${tobj.taskname}</b> status to done!`
            }
            console.log("DELETE ME",aloptions);
            const cb =()=>{
                ACCUSER.Alert.fill();
            };
            ACCUSER.Alert.create(aloptions, cb);
        };
        const options = {
            "trid" : trid,
            "columnname" : "status",
            "value" : 'done'
        };
        ACCUSER.getProject(projectid).TaskResource.updateColumn(options, callback);
    };
    const cbfalse = ()=>{

        console.log('Cancelled');
    };
    showAction('Are you sure that this Task is Done?', cbtrue, cbfalse);
});

    // task done events
$(document).on('click', '.usertaskboard-body-widget-icons-tdone', function(){
    const projectid = $('#usertaskboard-header-projectid').text();
    const tid = $(this).parent('.usertaskboard-body-widget-icons-con').parent('.usertaskboard-body-widget').attr('id').split('_').pop();
    const trid = $(this).parent('.usertaskboard-body-widget-icons-con').parent('.usertaskboard-body-widget').attr('trid');

    const cbtrue = ()=>{
        const callback = ()=>{
            const callback = ()=>{
                console.log(tid, trid);
                $('#usertaskboard-header-search-submit').click();
                const na = {
                    "response" : "na"
                };
                const probj = ACCUSER.getProject(projectid).getData();
                const trobj = ACCUSER.getProject(projectid).TaskResource.getObjById(trid);
                const tobj = ACCUSER.getProject(projectid).Task.getTaskObj(tid);
                const accobj = ACCUSER.getCompanyAccountById(trobj.accid);
                const aloptions = {
                    'id' : rngAlertId(),
                    'ownerid' : probj.ownerid,
                    'fn' : 'message',
                    'dataview' : JSON.stringify(na),
                    'dataapprove' : JSON.stringify(na),
                    'datareject' : JSON.stringify(na),
                    'title' : "Task Updates",
                    'message' : `<b>${accobj.firstname}</b> updated their task <b>${tobj.taskname}</b> status to totally done, task is now completed!`
                }
                console.log("DELETE ME",aloptions);
                const cb =()=>{
                    ACCUSER.Alert.fill();
                };
                ACCUSER.Alert.create(aloptions, cb);
            };
            const options = {
                "trid" : trid,
                "columnname" : "status",
                "value" : 'tdone'
            };
            ACCUSER.getProject(projectid).TaskResource.updateColumn(options, callback);
        };
        ACCUSER.getProject(projectid).Task.updateColumn({"taskid" : tid, "columnname" : "status", "value" : "done"}, callback);
    };
    const cbfalse = ()=>{
        console.log('Cancelled');
    };
    showAction('Set Task as Done? some Team Member might still be working on it. Proceed?', cbtrue, cbfalse);

});

    // working events
$(document).on('click', '.usertaskboard-body-widget-icons-start', function(){
    const projectid = $('#usertaskboard-header-projectid').text();
    const tid = $(this).parent('.usertaskboard-body-widget-icons-con').parent('.usertaskboard-body-widget').attr('id').split('_').pop();
    const trid = $(this).parent('.usertaskboard-body-widget-icons-con').parent('.usertaskboard-body-widget').attr('trid');

    showNotification('Task', 'Please Input Your Time in Project Timesheet if you wish to start working on this Task.');
    alert("Please Input Your Time in Project Timesheet if you wish to start working on this Task.");
    // const cbtrue =()=>{
    //     const callback = ()=>{
    //         const callback1 = ()=>{
    //             console.log(tid, trid);
    //             $('#usertaskboard-header-search-submit').click();
    //         };
    //         ACCUSER.getProject(projectid).Task.updateColumn({"taskid" : tid, "columnname" : "status", "value" : "working"}, callback1);
    //     };
    //     const options = {
    //         "trid" : trid,
    //         "columnname" : "status",
    //         "value" : 'work'
    //     };
    //     ACCUSER.getProject(projectid).TaskResource.updateColumn(options, callback);
    // };
    // const cbfalse = ()=>{

    //     console.log('Cancelled');
    // };
    // showAction('Start Working on this Task?', cbtrue, cbfalse);
});
    
    // task name event
$(document).on('click', '.usertaskboard-body-widget-name', function(){
    $(this).toggle();
    $(this).siblings('.usertaskboard-body-widget-id').toggle();
    $(this).siblings('.usertaskboard-body-widget-dates').toggle();
    $(this).siblings('.usertaskboard-body-widget-when').toggle();
});
$(document).on('click', '.usertaskboard-body-widget-id', function(){
    $(this).siblings('.usertaskboard-body-widget-name').toggle();
    $(this).toggle();
    $(this).siblings('.usertaskboard-body-widget-dates').toggle();
    $(this).siblings('.usertaskboard-body-widget-when').toggle();
});

    // Retrieve Data Events
$('#usertaskboard-header-search-submit').click(function(){
    // console.log("Clicked on Highway");
    const projectid = $('#usertaskboard-header-filter-project').val();
    const dateto = $('#usertaskboard-header-filter-dateto').val();
    const datefrom = $('#usertaskboard-header-filter-datefrom').val();

    // console.log(datefrom);
    const today = new Date();
    const fromdate = new Date(`${datefrom} 00:00:00`);
    const todate =  new Date(`${datefrom} 00:00:00`);

    const notstartedcon = $('#usertaskboard-body-widget-notstarted');
    const startedcon = $('#usertaskboard-body-widget-started');
    const duecon = $('#usertaskboard-body-widget-due');
    const pastduecon = $('#usertaskboard-body-widget-pastdue');
    const donecon = $('#usertaskboard-body-widget-done');
    notstartedcon.empty();
    startedcon.empty();
    duecon.empty();
    pastduecon.empty();
    donecon.empty();

    if(dateto == '1w'){
        todate.setDate(todate.getDate() + 7); //last date
    }else if(dateto == '2w'){
        todate.setDate(todate.getDate() + 14); //last date
    }else if(dateto == '1m'){
        todate.setMonth(todate.getMonth() + 1); //last date
    }else if(dateto == '2m'){
        todate.setMonth(todate.getMonth() + 2); //last date
    }else if(dateto == '3m'){
        todate.setMonth(todate.getMonth() + 3); //last date
    }else if(dateto == '6m'){
        todate.setMonth(todate.getMonth() + 6); //last date
    }else if(dateto == '1y'){
        todate.setFullYear(todate.getFullYear() + 1); //last date
    }else if(dateto == '2y'){
        todate.setFullYear(todate.getFullYear() + 2); //last date
    }else if(dateto == '5y'){
        todate.setFullYear(todate.getFullYear() + 5); //last date
    }else if(dateto == '10y'){
        todate.setFullYear(todate.getFullYear() + 10); //last date
    }


    const tlist = ACCUSER.getProject(projectid).TaskResource.getTaskByOwner(__ID);
    const tasklist = [];
    $.each(tlist, function(key, value){
        const options = {
            ...ACCUSER.getProject(projectid).Task.getTaskObj(value.taskid),
            "trid" : value.id,
            "trstatus" : value.status,
            "pmread" : value.pmread,
            "assignment" : value.assignment,
            "suggesteddate" : value.suggesteddate
        };
        // tasklist[tasklist.length] = ACCUSER.getProject(projectid).Task.getTaskObj(value.taskid);
        tasklist[tasklist.length] = options;
    });

    console.log(fromdate, todate);
    const tempList = tasklist.filter(function(item) { 
        const d = new Date(item.enddate);
        return d > fromdate && d < todate; 
    });
    const nl = tempList.sort(function(a, b) {
		const aa = new Date(`${a.startdate} 00:00:00`);
		const bb = new Date(`${b.startdate} 00:00:00`);
		return aa > bb ? 1 : -1;
	});


    $.each(nl, function(key, value){

        if(value.trstatus == 'done' || value.trstatus == 'tdone'){
            // console.log('append to done', value);
            appendUserTaskboardTask('done', value);
        }else{
            const sd = new Date(`${value.startdate} 00:00:00`);
            const ed = new Date(`${value.enddate} 00:00:00`);

            if( sd >= today){
                // console.log('notstarted',value.taskid, ed, today);
                appendUserTaskboardTask('notstarted', value);
            }else if(sd < today && ed >= today){
                // console.log('started',value.taskid, ed, today);
                appendUserTaskboardTask('started', value);
            }else if(sd < today && ed.getTime() === today.getTime()){
                // console.log('due',value.taskid, ed, today);
                appendUserTaskboardTask('due', value);
            }else if(sd < today && ed < today){
                // console.log('pastdue',value.taskid, ed, today);
                appendUserTaskboardTask('pastdue', value);
            }
        }

    });


    const projectname = ACCUSER.getProject(projectid).projectname;
    const ownerid = ACCUSER.getProject(projectid).ownerid;
    // const ownerobj = ACCUSER.getProject(projectid).getConnectObjById(ownerid);
    // const ownername = `${ownerobj.firstname} ${ownerobj.lastname}`;

    $('#usertaskboard-header-projectname').text(projectname);
    $('#usertaskboard-header-projectid').text(projectid);
    $('#usertaskboard-header-ownername').text('');
    
    ACCUSER.getProject(projectid).fillSelectTagWithConnectedAccount($('#usertaskboard-dispute-accountlist'));
    console.log(tasklist, tempList);
    $('.usertaskboard-body').css({"display" : "flex"}).show();
});
$('#usertaskboard-header-filter-project').on('change', function(){
    const projectid = $(this).val();
    const zcb=data=>{
        console.log(data);
        const zcb=data=>{
            console.log(data);
            const zcb=data=>{
                console.log(data);
                
            };
            ACCUSER.getProject(projectid).checkList('ConnectByProjectId', zcb);
        };
        ACCUSER.getProject(projectid).checkList('Task', zcb);
    };
    ACCUSER.getProject(projectid).checkList('TaskResource', zcb);
});









// PROJECT REGISTER EVENTS
// let projectRegisterList;
$('#preferences-body-register-add').click(function(){
    $('#register-description-date').val(getDateNow());
    $('#register-description-time').val(getTimeNow());
    $('#register-description-subject').val('');
    $('#register-description-type')[0].selectedIndex = 0;
    $('#register-description-mode')[0].selectedIndex = 0;
    $('#register-description-impact')[0].selectedIndex = 0;
    $('#register-description-impact-field').val('');
    $('#register-description-description').val('');


    $('.register-description-con').children('span.subject').text('');
    $('.register-description').css('display', 'flex').show();

    $('#register-description-delete').hide();
    $('#register-description-save').css({'width': '100%', 'border-bottom-left-radius': '15px'}).attr('status', 'save');
    $('.register-description-con').children('.sameline').children('.sameline-').css({'width': '100%'});
});
$(document).on('click', '.register-body-widget > i.fa-eye', function(){
    const rid = $(this).parent('.register-body-widget').attr('rid');
    console.log(rid);
    const projectid = $('#preferences-header-projectid').text();
    ACCUSER.getProject(projectid).Register.fillRegisterDescription(rid);

    $('.register-description').css('display', 'flex').show();

    $('#register-description-delete').show();
    $('#register-description-save').css({'width': '50%', 'border-bottom-left-radius': '0px'}).attr('status', 'update');
    $('.register-description-con').children('.sameline').children('.sameline-').css({'width': '50%'});
});
$(document).on('click', '.register-description-con > i.close', function(){
    $('.register-description').addClass('hidden').hide();
});
$('.register-description').click(function(e){
    if(e.target == this){
        $(this).addClass('hidden').hide();
    }else{
       return;
    }
});
$('#register-description-save').click(function(){
    const status = $(this).attr('status');
    console.log(status);
    if(status == 'save'){
        const projectid = $('#preferences-header-projectid').text();
        const date = $('#register-description-date').val();
        const time = $('#register-description-time').val();
        const subject = $('#register-description-subject').val();
        const type = $('#register-description-type').val();
        const mode = $('#register-description-mode').val();
        const impact = $('#register-description-impact').val();
        const impdescription = $('#register-description-impact-field').val();
        const description = $('#register-description-description').val();
        let gate = true;

        if(subject == ''){
            gate = false;
            blinkbg($('#register-description-subject'), RED_PALETTE, 'white');
        }
        if(impdescription == ''){
            gate = false;
            blinkbg($('#register-description-impact-field'), RED_PALETTE, 'white');
        }
        if(description == ''){
            gate = false;
            blinkbg($('#register-description-description'), RED_PALETTE, 'white');
        }

        if(gate){
            const options = {
                "id" : rngProjectRegisterId(),
                "projectid" : $('#preferences-header-projectid').text(),
                "ownerid" : __ID,
                "date" : date,
                "time" : time,
                "subject" : subject,
                "type" : type,
                "mode" : mode,
                "impact" : impact,
                "impdescription" : impdescription,
                "description" : description
            };
            const x = new ProjectRegister(options);
            const cb = data=>{
                console.log('Create Success!');
                $('.register-description').hide();
                ACCUSER.getProject(projectid).Register.addToList(x);
                ACCUSER.getProject(projectid).Register.fillRegister();
            };
            x.create(cb);
        }
        
       
    }else if(status == 'update'){
        const id = $('#register-description-id').attr('rid');
        const options = {
            "id" : id,
            "date" : $('#register-description-date').val(),
            "time" : $('#register-description-time').val(),
            "subject" : $('#register-description-subject').val(),
            "type" : $('#register-description-type').val(),
            "mode" : $('#register-description-mode').val(),
            "impact" : $('#register-description-impact').val(),
            "impdescription" : $('#register-description-impact-field').val(),
            "description" : $('#register-description-description').val(),
        }
        const callback =data=>{
            blinkbg($('#register-description-save'), GREEN_PALETTE, BTN_COLOR);
            ACCUSER.getProject(selprojectid).Register.fillRegister();
        };
        ACCUSER.getProject(selprojectid).Register.update(id, options, callback);
    }
});
$('#register-description-delete').click(function(){
    const projectid = $('#preferences-header-projectid').text();
    const id = $('#register-description-id').attr('rid');
    const cbtrue = ()=>{
        const callback=()=>{
            $('.register-description').hide();
            ACCUSER.getProject(projectid).Register.removeObj(id);
            ACCUSER.getProject(projectid).Register.fillRegister();
        };
        ACCUSER.getProject(projectid).Register.delete(id, callback);
    };
    const cbfalse = ()=>{
        console.log('Cancelled Delete');
    };
    showAction('Confirm Delete Register', cbtrue, cbfalse);
});
$('#preferences-body-register-search').click(function(){
    console.log('Active Project > Launch > register > Search');

    const prid = $('#preferences-header-projectid').html();
    const fromDate = $('#preferences-body-register-from-date').val();
    const dateRange = $('#preferences-body-register-to-date').val();
    const subject = $('#preferences-body-register-search-subject').val();
    let toDate;

    console.log(prid, fromDate, dateRange, subject);
    if(fromDate == ""){
        toDate = new Date();
    }else{
        toDate = new Date(new Date(fromDate));
        toDate.setDate(toDate.getDate() + 1);
    }
    console.log('Before Date',toDate);

    if(dateRange == '1w'){
        toDate.setDate(toDate.getDate() + 7);
    }else if(dateRange == '2w'){
        toDate.setDate(toDate.getDate() + 14);
    }else if(dateRange == '1m'){
        toDate.setMonth(toDate.getMonth() + 1);
    }else if(dateRange == '2m'){
        toDate.setMonth(toDate.getMonth() + 2);
    }else if(dateRange == '4m'){
        toDate.setMonth(toDate.getMonth() + 4);
    }else if(dateRange == '6m'){
        toDate.setMonth(toDate.getMonth() + 6);
    }else if(dateRange == '1y'){
        toDate.setYear(toDate.getYear() + 1);
    }else if(dateRange == '2y'){
        toDate.setYear(toDate.getYear() + 2);
    }else if(dateRange == '5y'){
        toDate.setYear(toDate.getYear() + 5);
    }
    console.log('After Date',toDate);

    const list = ACCUSER.getProject(prid).Register.search(new Date(fromDate), toDate, subject);
    console.log(list);
    ACCUSER.getProject(prid).Register.fillRegisterByList(list);
});
$('#preferences-body-register-view-all').click(function(){
    console.log('Active Project > Launch > Register > View All');
    const prid = $('#preferences-header-projectid').html();
    ACCUSER.getProject(prid).Register.fillRegister();
});



// PROJECT NOTES EVENTS
// let ACCUSER.getProject(selprojectid).Notes;
$('#preferences-body-notes-add').click(function(){
    $('#notes-description-date').val(getDateNow());
    $('#notes-description-time').val(getTimeNow());
    $('#notes-description-subject').val('');
    $('#notes-description-type')[0].selectedIndex = 0;
    $('#notes-description-mode')[0].selectedIndex = 0;
    // $('#notes-description-impact')[0].selectedIndex = 0;
    $('#notes-description-impact-field').val('');
    $('#notes-description-description').val('');


    $('.notes-description-con').children('span.subject').text('');
    $('.notes-description').css('display', 'flex').show();

    $('#notes-description-delete').hide();
    $('#notes-description-save').css({'width': '100%', 'border-bottom-left-radius': '15px'}).attr('status', 'save');
    $('.notes-description-con').children('.sameline').children('.sameline-').css({'width': '100%'});
});
$(document).on('click', '.notes-body-widget > i.fa-eye', function(){
    const rid = $(this).parent('.notes-body-widget').attr('rid');
    console.log(rid);
    ACCUSER.getProject(selprojectid).Notes.fillNotesDescription(rid);

    const subject = $(this).siblings('input.subject').val();
    $('.notes-description-con').children('span.subject').text(subject);
    $('.notes-description').css('display', 'flex').show();

    $('#notes-description-delete').show();
    $('#notes-description-save').css({'width': '50%', 'border-bottom-left-radius': '0px'}).attr('status', 'update');
    $('.notes-description-con').children('.sameline').children('.sameline-').css({'width': '50%'});

});
$(document).on('click', '.notes-description-con > i.close', function(){
    $('.notes-description').addClass('hidden').hide();
});
$('.notes-description').click(function(e){
    if(e.target == this){
        $(this).addClass('hidden').hide();
    }else{
       return;
    }
});
$('#notes-description-save').click(function(){
    const status = $(this).attr('status');
    console.log(status);
    if(status == 'save'){
        const date = $('#notes-description-date').val();
        const time = $('#notes-description-time').val();
        const subject = $('#notes-description-subject').val();
        const type = $('#notes-description-type').val();
        const mode = $('#notes-description-mode').val();
        const impact = $('#notes-description-impact').val();
        const impdescription = $('#notes-description-impact-field').val();
        const description = $('#notes-description-description').val();
        let gate = true;

        if(subject == ''){
            gate = false;
            blinkbg($('#notes-description-subject'), RED_PALETTE, 'white');
        }
        if(impdescription == ''){
            gate = false;
            blinkbg($('#notes-description-impact-field'), RED_PALETTE, 'white');
        }
        if(description == ''){
            gate = false;
            blinkbg($('#notes-description-description'), RED_PALETTE, 'white');
        }

        if(gate){
            const options = {
                "id" : rngProjectNoteId(),
                "projectid" : $('#preferences-header-projectid').text(),
                "ownerid" : __ID,
                "date" : date,
                "time" : time,
                "subject" : subject,
                "type" : type,
                "mode" : mode,
                "impact" : impact,
                "impdescription" : impdescription,
                "description" : description
            };
            const x = new ProjectRegister(options);
            const cb =()=>{
                setTimeout(() => {
                    console.log('Create Success!');
                    $('.notes-description').hide();
                    ACCUSER.getProject(selprojectid).Notes.addToList(x);
                    ACCUSER.getProject(selprojectid).Notes.fillNotes();
                }, 0);
            };
            x.create(cb);
        }
        
       
    }else if(status == 'update'){
        const id = $('#notes-description-id').attr('rid');
        const options = {
            "id" : id,
            "date" : $('#notes-description-date').val(),
            "time" : $('#notes-description-time').val(),
            "subject" : $('#notes-description-subject').val(),
            "type" : $('#notes-description-type').val(),
            "mode" : $('#notes-description-mode').val(),
            "impact" : $('#notes-description-impact').val(),
            "impdescription" : $('#notes-description-impact-field').val(),
            "description" : $('#notes-description-description').val(),
        }
        const callback =data=>{
            blinkbg($('#notes-description-save'), GREEN_PALETTE, BTN_COLOR);
            ACCUSER.getProject(selprojectid).Notes.fillNotes();
            $('.notes-description').hide();
        };
        // console.log('FUUUCK',options);
        ACCUSER.getProject(selprojectid).Notes.update(id, options, callback);
    }
});
$('#notes-description-delete').click(function(){
    const id = $('#notes-description-id').attr('rid');
    const cbtrue = ()=>{
        const callback=()=>{
            $('.notes-description').hide();
            ACCUSER.getProject(selprojectid).Notes.removeObj(id);
            ACCUSER.getProject(selprojectid).Notes.fillNotes();
        };
        ACCUSER.getProject(selprojectid).Notes.delete(id, callback);
    };
    const cbfalse = ()=>{
        console.log('Cancelled Delete');
    };
    showAction('Confirm Delete Register', cbtrue, cbfalse);
});
$('#preferences-body-notes-search').click(function(){
    console.log('Active Project > Launch > notes > Search');

    const prid = $('#preferences-header-projectid').html();
    const fromDate = $('#preferences-body-notes-from-date').val();
    const dateRange = $('#preferences-body-notes-to-date').val();
    const subject = $('#preferences-body-notes-search-subject').val();
    let toDate;

    console.log(prid, fromDate, dateRange, subject);
    if(fromDate == ""){
        toDate = new Date();
    }else{
        toDate = new Date(new Date(fromDate));
        toDate.setDate(toDate.getDate() + 1);
    }
    console.log('Before Date',toDate);

    if(dateRange == '1w'){
        toDate.setDate(toDate.getDate() + 7);
    }else if(dateRange == '2w'){
        toDate.setDate(toDate.getDate() + 14);
    }else if(dateRange == '1m'){
        toDate.setMonth(toDate.getMonth() + 1);
    }else if(dateRange == '2m'){
        toDate.setMonth(toDate.getMonth() + 2);
    }else if(dateRange == '4m'){
        toDate.setMonth(toDate.getMonth() + 4);
    }else if(dateRange == '6m'){
        toDate.setMonth(toDate.getMonth() + 6);
    }else if(dateRange == '1y'){
        toDate.setYear(toDate.getYear() + 1);
    }else if(dateRange == '2y'){
        toDate.setYear(toDate.getYear() + 2);
    }else if(dateRange == '5y'){
        toDate.setYear(toDate.getYear() + 5);
    }
    console.log('After Date',toDate);

    const list = ACCUSER.getProject(prid).Notes.search(new Date(fromDate), toDate, subject);
    console.log(list);
    ACCUSER.getProject(prid).Notes.fillNotesByList(list);
});
$('#preferences-body-notes-view-all').click(function(){
    console.log('Active Project > Launch > Notes > View All');
    const prid = $('#preferences-header-projectid').html();
    ACCUSER.getProject(prid).Notes.fillNotes();
});



// RESOURCE BOARD EVENTS
$(document).on('click', '.resource-body-accountlist-widget > .step > .name > i', function(){
    const status = $(this).attr('status');
    console.log('test', status);
    if(status == 'closed'){
        $(this).removeClass('fa-bars').addClass('fa-times').attr('status', 'open');
        $(this).parent('.name').parent('.step.acc').siblings('.step.tasklist').show();
    }else{
        $(this).removeClass('fa-times').addClass('fa-bars').attr('status', 'closed');
        $(this).parent('.name').parent('.step.acc').siblings('.step.tasklist').hide();
    }
});

$('#resource-mods-exit').parent('.resource-mods-widget').click(function(){
    $('.dashboard-con').show();
    $('.boards-resources-con').hide();
});
$('#resource-mods-dashboard').parent('.resource-mods-widget').click(function(){
    $('#nav-dashboard').click();
});
$('#resource-mods-refresh').parent('.resource-mods-widget').click(function(){
    const projectid = $('#resource-header-projectid').text();
    console.log('Refreshing');
    showRefreshReport("Refreshing...");
    setTimeout(() => {
        const cb=()=>{
            ACCUSER.Alert.fill();
            const cb =data=>{
                console.log(data);
                const cb =data=>{
                    console.log(data);
                    const cb =data=>{
                        console.log(data);
                        const cb =data=>{
                            console.log(data);
                            $('#project-view-boards-resource').click();
                            setTimeout(() => {
                                hideRefreshReport();
                            }, 0);
                        }
                        ACCUSER.getProject(projectid).checkList('Timesheet', cb, true);
                    }
                    ACCUSER.getProject(projectid).checkList('ConnectByProjectId', cb, true);
                }
                ACCUSER.getProject(projectid).checkList('TaskResource', cb, true);
            }
            ACCUSER.getProject(projectid).checkList('Task', cb, true);
        }
        ACCUSER.checkList('Alert', cb, true);
    }, 0);

});
$('#resource-mods-resource').parent('.resource-mods-widget').click(function(){
    // $('.resource-navigation').children('button').click();
    $('.resource-body').show();
    $('.resource-calendar').hide();
    $('#resource-navigation-submit').attr('status', 'idle');
    
    $('#resource-mods-resource').parent('.resource-mods-widget').css('display', 'none').hide();
});
$('#resource-navigation-submit').click(function(){
    console.log('test');
    const projectid = $('#resource-header-projectid').text();
    const week = $('#resource-navigation-week').val();

    $(this).attr('status', "active");
    // 2020-W46

    console.log(week);
    const y = week.split('-')[0];
    const w = week.split('W').pop();
    console.log(y, w);

    const sd = new Date(`${y}-01-01 00:00:00`);

    // console.log(sd);
    sd.setDate(sd.getDate() + ((7 * w) - (sd.getDay() - 1) )); // setting the day multiplied by weeks minus getDay
    const ed = new Date(sd);
    ed.setHours(0,0,0,0);
    ed.setDate(ed.getDate() + 7);

    console.log('sd, ed', sd, ed);
    let list = ACCUSER.getProject(projectid).Timesheet.getObjByMinMaxDates({"sd" : sd, "ed" : ed});
    console.log(list);

    let dcon = [];
    dcon[0] = $('.resource-calendar-widget-con.sun');
    dcon[1] = $('.resource-calendar-widget-con.mon');
    dcon[2] = $('.resource-calendar-widget-con.tue');
    dcon[3] = $('.resource-calendar-widget-con.wed');
    dcon[4] = $('.resource-calendar-widget-con.thu');
    dcon[5] = $('.resource-calendar-widget-con.fri');
    dcon[6] = $('.resource-calendar-widget-con.sat');

    $.each(dcon, function(key, value){
        value.empty();
    });
    
    for (let dt = new Date(sd); dt < ed; dt.setDate(dt.getDate() + 1)) {
        const showdate = dateFns.format(
            dt,
            'MMM DD, YYYY'
        );
        const showday = numToDay(dt.getDay());
        dcon[dt.getDay()].siblings('span.title').html(`
            ${showday}<br>${showdate}
        `);
    }


    let thour = [];
    thour[0] = 0;
    thour[1] = 0;
    thour[2] = 0;
    thour[3] = 0;
    thour[4] = 0;
    thour[5] = 0;
    thour[6] = 0;



    $.each(list, function(key, value){
        const d = new Date(`${value.date} 00:00:00`);
        const day = d.getDay();
        const accObj = ACCUSER.getProject(projectid).getConnectObjById(value.ownerid);
        
        dcon[day].append(`
            <div class="resource-calendar-widget-time">
                <span class="name" title="${accObj.firstname} ${accObj.lastname}">${accObj.firstname} ${accObj.lastname}</span>
                <span class="hours">${value.hours} Hours</span>
            </div>
        `);
        // console.log('thour', thour[day], value.hours);
        thour[day] += parseFloat(value.hours);
    });

    $.each(thour, function(key, value){
        // value.empty();
        dcon[key].siblings('span.footer').html(`
            Actual Hours<br>${value} Hrs
        `);
    });


    $('.resource-body').hide();
    $('.resource-calendar').show();
    $('#resource-mods-resource').parent('.resource-mods-widget').css('display', 'flex').show();

});



// MAPPING CON EVENTS
const docchartMapActualOption = {
    start: function(e, ui) {
        // this function fires when you start dragging
        $(ui.helper).css('max-width', '300px');
        const docid = $(ui.helper).attr('docid');
        console.log(docid);
        $('.map-body-plandoc-list-con > .map-body-plandoc-list-widget').each(function(){
            const x = $(this).children('.widget-map');
            if(x.hasClass('idle')){
                x.css('background-color', GREEN_PALETTE);
            }else{
                if(x.children('span').text() == docid){
                    x.css('background-color', YELLOW_PALETTE);
                }
            }
        });
        
    },
    drag: function() {
    //   this function fires after you drag and while dragging
    },
    stop: function() {
    // this function fires when you stop dragging or if you dropped it
        // $('.create-upload-con3-connectList-widget').css('background-color', SUB_COLOR);
        $('.map-body-plandoc-list-widget').children('.idle').css('background-color', 'grey');
        $('.map-body-plandoc-list-widget').children('.active').css('background-color', 'white');
    // and here in stop you can color your droppable div into its original state
    },
    opacity: 0.7, // opacity of the draggable
    helper: "clone", // will not drag the actual element. instead will send a clone
    // containment: ".map-body", // here is where the draggable can stay. if you put "body" then it can go around the whole page
                                       // but if you put "#sampleid" then it will contain the draggable within the range of the div with the id of 'sampleid'
    scroll: false,  // prevents scrolling
    cursorAt: { bottom: 0, left: 150}, // puts cursor at center bottom || remove left option to just simply put it in bottom
    revert: "invalid" // draggable will fall back to its place
};
const docchartMapPlanningOption = {
    accept: ".map-body-actual-list-widget", // this will determine which elements are accepted to drop in this case all element with the class of moduleman-module-list-widget will drop
    drop: function( event, ui ) {
        // same with the draggable. if you use this code, you can access the draggable element thats being dropped 
        let docid = $(ui.draggable).attr('docid');
        // let doctitle = $(ui.draggable).children('.map-body-actual-list-widget-title').text(); 
        const planid = $(event.target).attr('docid');
        // const plantitle = $(event.target).children('.widget-details').children('.map-body-plandoc-list-widget-title').text();
        
        function push(docid, planid){
            const projectid = $('#map-header-projectid').text();
            const callback=()=>{
                // console.log(planid);
                // console.log('DOC', doctitle,'PLAN', plantitle);
                $(event.target).children('.widget-map').removeClass('idle').addClass('active').children('span').text(docid);
                
                ACCUSER.getProject(projectid).ScheduleDocument.updateMapId(planid, docid);
                ACCUSER.getProject(projectid).ActualDocument.updateMapId(docid, planid);

                fillDocumentMapping(projectid);
            };
            const options = {
                'docid' : docid,
                'planid' : planid
            };
            console.log(options);
            ACCUSER.getProject(projectid).mapDocument(options, callback);
        }

        if($(event.target).children('.widget-map').hasClass('idle')){
            // console.log('dropped to idle');
            push(docid, planid);
        }else{
            // console.log('dropped to active');
            const cbtrue = ()=>{
                push(docid, planid);
            };
            const cbfalse = ()=>{};
            showAction('This Document Is already Mapped. Do you still wish to continue?',cbtrue, cbfalse);
        }

        
        
        
        

    }
}
    // retrieve data events
function fillDocumentMapping(projectid){
    const actuallist = ACCUSER.getProject(projectid).ActualDocument.getList();
    const planlist = ACCUSER.getProject(projectid).ScheduleDocument.getList();
    $('.map-body-plandoc-list-con').empty();
    $('.map-body-actual-list-con').empty();
    
    // ACTUAL DOCUMENT CODE
    $.each(actuallist, function(key, value){
        // console.log(value);
        const obj = value.getData();
        // console.log(obj);
        $('.map-body-actual-list-con').append(`
            <div docid="${obj.docid}" class="map-body-actual-list-widget btn-shadow">
                <span class="map-body-actual-list-widget-title">${obj.title}</span>
                <span class="map-body-actual-list-widget-id">${obj.docid}</span>
            </div>
        `);
        $('.map-body-actual-list-widget').draggable(docchartMapActualOption);
    });


    // PLANNING DOCUMENTS CODE
    $.each(planlist, function(key, value){
        console.log(value.mapid, value.mapid == undefined);
        if(value.mapid == undefined){
            $('.map-body-plandoc-list-con').append(`
                <div docid="${value.docid}" class="map-body-plandoc-list-widget btn-shadow">
                    <div class="widget-details">
                    <span class="map-body-plandoc-list-widget-title">${value.title}</span>
                    <span class="map-body-plandoc-list-widget-id">${value.docid}</span>
                    </div>
                    <div class="widget-map idle">
                        <span class="map-body-plandoc-list-widget-mapid">Not Mapped</span>
                    </div>
                </div>
            `);
        }else{
            $('.map-body-plandoc-list-con').append(`
                <div docid="${value.docid}" class="map-body-plandoc-list-widget btn-shadow">
                    <div class="widget-details">
                    <span class="map-body-plandoc-list-widget-title">${value.title}</span>
                    <span class="map-body-plandoc-list-widget-id">${value.docid}</span>
                    </div>
                    <div class="widget-map active">
                        <span class="map-body-plandoc-list-widget-mapid">${value.mapid}</span>
                    </div>
                </div>
            `);
        }
        $('.map-body-plandoc-list-widget').droppable(docchartMapPlanningOption);

    });

}



$('#map-header-search-project-submit').click(function(){
    let projectid = $('#dashboard-body-projectname').attr('prid');
    let ownerid = $('#dashboard-body-projectname').attr('ow');
    let firstname = $('#dashboard-body-projectname').attr('fn');
    let lastname = $('#dashboard-body-projectname').attr('ln');
    let photo = $('#dashboard-body-projectname').attr('ph');
    let projectname = $('#dashboard-body-projectname').attr('pn');

    // // console.log(projectid, projectname, ownerid, firstname, lastname, photo);
    selprojectid = projectid;
    selprojectname = projectname;
    selownerid = ownerid;
    selfirstname = firstname;
    sellastname = lastname;
    selphoto = photo;

    
    showRefreshReport("Loading...");
    setTimeout(() => {
        const callback =data=>{
            console.log(data);
            const callback2 =data=>{
                console.log(data);
                const callback3 =data=>{
                    console.log(data);
                    const callback4 =data=>{
                        console.log(data);
                        const callback5 =data=>{
                            $('#map-header-projectid').text(projectid);
                            $('#map-header-projectname').text(projectname);
                            $('#map-header-ownername').text(`${firstname} ${lastname}`);
                            $('.map-navigation-widget').removeClass('selected');
                            // $('.map-body').hide();
                            $('.dashboard-con').hide();
                            $('.map-con').show();
                        
                            // const projectid = $('#map-header-search-project-select').val();
                            console.log(projectid);
                        
                            fillDocumentMapping(projectid);
                            fillAccountMapping(projectid);
                            fillSupplierMapping(projectid);
                            
                            $('.map-body-document').css('display','none').hide();
                            $('.map-body-resource').css('display','none').hide();
                        };
                        ACCUSER.getProject(projectid).checkList('AccountRate', callback5);
                    };
                    ACCUSER.checkList('Supplier', callback4);
                };
                ACCUSER.getProject(projectid).checkList('TmpSupplier', callback3);
            };
            ACCUSER.getProject(projectid).checkList('TmpAccount', callback2);
        };
        ACCUSER.getProject(projectid).checkList('TaskResource', callback); 
    }, 0);
    setTimeout(() => {
        hideRefreshReport();
    }, 0);



});

    // widget events
$(document).on('click', '.map-body-plandoc-list-widget', function(){
    const title = $(this).attr('doctitle');
    const prid = $(this).attr('prid');
    const id = $(this).attr('docid');
    const mapid = $(this).attr('mapid');

    $('.map-body-plandoc-props-header').attr('docid', id);
    // console.log(mapid);
    if(mapid == 'null'){
        console.log('map is null');
        $('.map-body-plandoc-props-connect-title').text('This Document is not Mapped');
        $('.map-body-plandoc-props-connect-account').text('');
    }else{
        $('.map-body-plandoc-props-connect-title').text('This Document is currently Mapped to');
        $('.map-body-plandoc-props-connect-account').text(mapid);
    }
    $('.map-body-plandoc-props-header-title').text(title);
    $('.map-body-plandoc-props-header-docid').text(id);
    $('.map-body-plandoc-props-header-prid').text(prid);

    $('.map-body-plandoc-props-assign').show();

    $('.map-body-plandoc-props-con').show();
    
});
$(document).on('click', '.map-body-actual-list-widget', function(){
    const docid = $(this).attr('docid');
    const d = $(this);
    $('.map-body-plandoc-list-con').children('.map-body-plandoc-list-widget').each(function(){
        const x = $(this).children('.widget-map');
        if(x.hasClass('active')){
            if(x.children('span').text() == docid){
                // x.css('background-color', YELLOW_PALETTE);
                blinkbg(x, YELLOW_PALETTE, 'white')
                blinkbg(d, 'white', BTN_COLOR);
            }
        }
    });
});
$('.map-body-plandoc-props-assign').click(function(){
    $('.map-body-plandoc-list').hide();
    $('.map-body-account-list').show();
});

    // map dashboard events
// $('.map-mods-widget').click(function(){
//     const id = $(this).children('span').attr('id');

//     if(id.includes('refresh')){
//         $('#map-header-search-project-submit').click();
//     }
//     if(id.includes('document')){
//         $('.map-body-document').css('display', 'flex').show();
//         $('.map-body-resource').css('display','none').hide();
//         $('.map-body-supplier').css('display','none').hide();
//     }
//     if(id.includes('resource')){
//         $('.map-body-document').css('display','none').hide();
//         $('.map-body-resource').css('display', 'flex').show();
//         $('.map-body-supplier').css('display','none').hide();
//     }
//     if(id.includes('supplier')){
//         $('.map-body-document').css('display','none').hide();
//         $('.map-body-resource').css('display','none').hide();
//         $('.map-body-supplier').css('display', 'flex').show();
//     }
//     if(id.includes('dashboard')){
//         $('#nav-dashboard').click();
//     }
// });









// BUILD CON EVENTS
$('.build-body-prefs').click(function(){
    // console.log('pref click');
    $('.build-body-prefs').animate({'width' : '70%'},0);
    $('.build-body-doclist').animate({'width' : '30%'},0);

});
$('.build-body-doclist').click(function(){
    // console.log('doclist click');
    $('.build-body-prefs').animate({'width' : '60%'},0);
    $('.build-body-doclist').animate({'width' : '40%'},0);
});


$('#build-header-retrieve-pull').click(function(){
    const id = $('#build-header-retrieve-project-con').val();
    const x = $('#build-header-retrieve-project-con').val().split('-');
    const sch = x[0];
    console.log(id);

    SCHEDULE_DOCUMENTS = new ScheduleDocs();
    $('.build-body-doclist-widget-con').empty();
    if(sch == 'P'){
        // api_fetchPlanningScheduleByProjectId(id, 'build-header-retrieve-pull');
        // api_fetchDocumentsConnectedToProjectUpdated(id, 'build-schedule');
        const cbcomplete=()=>{
            $('.build-body').show();
            $('.build-body-prefs').show();
            $('.build-body-prefs-schedule').hide();
            $('.build-body-prefs-assign').hide();
        }
        
        SCHEDULE_DOCUMENTS.fetch(id, 'new-project-build-schedule', cbcomplete);

    }else if(sch == 'SCH'){
        const cbcomplete=()=>{
            // api_fetchPlanningScheduleByProjectId(id, 'build-header-retrieve-pull');
            // api_fetchDocumentsConnectedToProjectUpdated(id, 'build-schedule');
            $('.build-body').show();
            $('.build-body-prefs').show();

            $('.build-body-prefs-schedule').hide();
            $('.build-body-prefs-assign').show();
        };
        // api_fetchProjectByConnect(__ID, 'build-header-retrieve-pull', cbcomplete);
        
        SCHEDULE_DOCUMENTS.fetch(id, 'new-project-build-schedule', cbcomplete);
        // console.log(SCHEDULE_DOCUMENTS.list);

    }else if(id == 'test'){
        $('.build-body').show();
        $('.build-body-prefs').show();

        testScheduleId = rngScheduleId();
        temptestScheduleId = 'tmp' + rngScheduleId();
        $('.build-body-prefs-schedule').hide();
        $('.build-body-prefs-assign').hide();
        $('.build-body-prefs-header').hide();
        $('.build-body-doclist-widget-con').empty();
    }
    console.log(SCHEDULE_DOCUMENTS.list);
});
$('#build-doclist-add-submit').click(function(){
    const title = $('#build-doclist-add-tbox').val();
    let projectid = $('#build-header-retrieve-project-con').val();
    const planid = generateDocumentID();
    let x = false;

    console.log(projectid);

    if(projectid == 'test'){
        projectid = temptestScheduleId;
        x = true;
    }

    const cbcomplete=()=>{
        // console.log(title, planid, projectid);
        const cbcomplete1=()=>{
            $('#build-doclist-add-tbox').val('');
            $('.build-body-doclist-widget-con').append(`
                <span docid="${planid}" class="build-body-doclist-widget btn-shadow">${title}<i class="fas fa-trash build-body-doclist-widget-delete"></i></span>
            `);
            if(x){
                $('.build-body-prefs-schedule').show();
                createTestScheduleGate = true;
            }
        };
        api_fetchProjectByConnect(__ID, 'build-header-retrieve-pull', cbcomplete1);
    };
    api_createPlanningDocument(planid, projectid, title, cbcomplete);
});
$(document).on('click', '.build-body-doclist-widget-delete', function(){
    // console.log('test');
    const projectid = $('#build-header-retrieve-project-con').val();
    const planid = $(this).parent('.build-body-doclist-widget').attr('docid');

    const cbcomplete=()=>{
        console.log(projectid, planid);
        $(this).parent('.build-body-doclist-widget').remove();
        $('.build-body-prefs-header').hide();
        let x = 0;
        $('.build-body-doclist-widget-con').children('.build-body-doclist-widget').each(function(){
            x++;
        });
        if(x == 0){
            $('.build-body-prefs-schedule').hide();
            createTestScheduleGate = false;
        }else{
            if(projectid == 'test'){
                createTestScheduleGate = true;
                $('.build-body-prefs-schedule').show();
            }
        }
    };
    SCHEDULE_DOCUMENTS.remove(planid, projectid, cbcomplete);
    // api_deletePlanningDocument(planid, projectid, cbcomplete);
});
$(document).on('click', '.build-body-doclist-widget', function(e){
    if(e.target != this){
        return;
    }
    const planid = $(this).attr('docid');
    const plantitle = $(this).text();
    $('.build-body-prefs-id').text(planid);
    $('.build-body-prefs-title').text(plantitle);
    console.log(testScheduleId);
    $('.build-body-prefs-header').show();
});

$('#build-body-prefs-schedule-submit').click(function(){
    const title = $('#build-body-prefs-schedule-title').val();
    if(title != ''){
        const cbcomplete=()=>{
            console.log('saved');
            $('.build-body-prefs-assign').show();
            $('.build-body-prefs-schedule').hide();
            createTestScheduleGate = false;
        };
        api_createPlanningTestSchedule(testScheduleId, temptestScheduleId, __ID, title, cbcomplete);
    }else{
        blinkbg($('#build-body-prefs-schedule-title'), RED_PALETTE, 'white');
    }
});
$('#build-body-prefs-schedule-cancel').click(function(){
    const cbcomplete=()=>{
        createTestScheduleGate = false;
        $('#nav-schedule-document').click();
    };
    api_deleteTmpPlanningDocument(cbcomplete);
});
$(document).click(function(e){
    let gate = true;
    const id = e.target.id;
    const classList = e.target.classList;


    if(createTestScheduleGate){
        if(id.includes('logout')  || id.includes('nav') || id.includes('home') || id.includes('pull')){
            gate = false;
        }
        for(i=0; i<e.target.classList.length; i++){
            let x = e.target.classList[i];
            // console.log(x);
            if(x.includes('logout') || x.includes('nav') ){
                gate = false;
            }
        }
    }
    if(!gate){
        const cbtrue = () => {
            const cbcomplete=()=>{
                console.log("Leave Page");
                createTestScheduleGate = false;
                if(id != null && id != undefined){
                    $(`#${id}`).click();
                }else{
                    $('#nav-dashboard').click();
                }
            };
            api_deleteTmpPlanningDocument(cbcomplete);
        };
        const cbfalse = () => {
            console.log("Stay on Page");
        };
        showAction('Leaving? Your Test Schedule Will not be saved! Do you still wish to continue?', cbtrue, cbfalse);
    }

});
$('#build-body-prefs-assign-submit').click(function(){
    const scheduleid = $('#build-header-retrieve-project-con').val();
    const projectid = $('#build-body-prefs-assign-projlist').val();
    const cbcomplete=()=>{
        $('#nav-schedule-document').click();
        showNotification('Planning Schedule', 'Your Planning Schedule has been Assigned to the Project');
    };
    api_updateScheduleIdIntoProjectId(scheduleid, projectid, cbcomplete);
});
$('#build-body-prefs-assign-delete').click(function(){
    const scheduleid = $('#build-header-retrieve-project-con').val();
    console.log(scheduleid);
    const cbcomplete=()=>{
        cidBuild();
        showNotification('Planning Schedule', 'Your Planning Schedule has been Deleted');
    };
    api_deletePlanningSchedule(scheduleid, cbcomplete);
});


// STATUS BOARD UI EVENTS
$(document).on('click', '#status-header-filter-fromdate-setnow', function(){
    $('#status-header-filter-fromdate').val(getDateNow());
});
$(document).on('hover', '.status-body-widget-dates' ,function(){
    $(this).siblings('.status-body-widget-when').show();
    $(this).hide();
});
$(document).on('mouseout', '.status-body-widget-when',function(){
    $(this).siblings('.status-body-widget-dates').show();
    $(this).hide();
});
$(document).on('click', '.id-name-switch', function(){
    if($(this).attr('status') == 'id'){
        $(this).parent('.status-body-widget-icons-con').siblings('.status-body-widget-name').show();
        $(this).parent('.status-body-widget-icons-con').siblings('.status-body-widget-id').hide();
        $(this).parent('.status-body-widget-icons-con').siblings('.status-body-widget-when').hide();
        $(this).parent('.status-body-widget-icons-con').siblings('.status-body-widget-dates').show();
        $(this).attr('status','name');
    }else if($(this).attr('status') == 'name'){
        $(this).parent('.status-body-widget-icons-con').siblings('.status-body-widget-name').hide();
        $(this).parent('.status-body-widget-icons-con').siblings('.status-body-widget-id').show();
        $(this).parent('.status-body-widget-icons-con').siblings('.status-body-widget-when').show();
        $(this).parent('.status-body-widget-icons-con').siblings('.status-body-widget-dates').hide();
        $(this).attr('status','id');
    }
});
$("#statusBoard-btnPullProjectsBoard").on('click', function(){
    // FOR UPDATE BRIJESH
    var sel = document.getElementById("statusBoard-selProjectList");
    // boardProjInfo(sel.value, "boardDisplayProjects");
    var projectIndex = searchProject(sel.value);
    var projid
    if(projectIndex == -1){
        // project not found
        $('.status-body-widget').remove();
    }else{
        projid = allProjects[projectIndex][0];
        api_fetchDocumentsConnectedToProjectUpdated(projid, 'status-board');
        // console.log(planningDocuments);
        // console.log(actualDocuments);
        for(i=0;i<planningDocuments.length;i++){
            let j;
            let doc = planningDocuments[i];
            console.log("Doc: ", doc);
            console.log("Linkid: ", doc.linkid);
            for(j=0;j<planningDocuments.length;j++){
                if(planningDocuments[j] != undefined && planningDocuments[j] != doc && planningDocuments[j].linkid == doc.linkid){
                    let newLink = new Link();
                    newLink.id = doc.linkid;
                    newLink.stage = doc.linkstage;

                    if(planningDocuments[j].actualid == null){
                        newLink.docid = planningDocuments[j].id;
                        newLink.docname = planningDocuments[j].name;
                    }else{
                        newLink.docid = planningDocuments[j].actualid;
                        newLink.docname = planningDocuments[j].actualtitle;
                    }
                    
                    // put the end date OVER HERE
                    doc.appendLink(newLink);
                }
            }
        }
    }
    // console.log('hello');
})
$('#status-mods-exit').parent('.status-mods-widget').click(function(){
    $('.dashboard-con').show();
    $('.status-con').hide();
});
$('#status-mods-dashboard').parent('.status-mods-widget').click(function(){
    $('#nav-dashboard').click();
});
$('#status-mods-refresh').parent('.status-mods-widget').click(function(){
    const prid = $('#status-header-projectid').html();

    showRefreshReport("Refreshing...");
    setTimeout(() => {
        const cb=()=>{
            ACCUSER.Alert.fill();
            const cb=()=>{
                const cb=()=>{
                    const cb=()=>{
                        $('.status-navigation').children('button').click();
                        setTimeout(() => {
                            hideRefreshReport();
                        }, 0);
                    }
                    ACCUSER.getProject(prid).checkList('ConnectByProjectId', cb, true);
                }
                ACCUSER.getProject(prid).checkList('ActualDocument', cb, true);
            }
            ACCUSER.getProject(prid).checkList('ScheduleDocument', cb, true);
        }
        ACCUSER.checkList('Alert', cb, true);
    }, 0);

});






// TASK BOARD EVENTS
let taskboardProjectList = [];
let taskboardTaskList = [];
let taskboardResouceList = [];
let selid = '';
let selTask = '';
let selDisputeIcon;


function appendTaskboardTask(container, arr){
    let color = '';
    let con = $(`#taskboard-body-widget-${container}`);
    let when;

    const sdate = new Date(arr.startdate);
    const edate = new Date(arr.enddate);
    const tdate = new Date();
    sdate.setDate(sdate.getDate() + 1);
    edate.setDate(edate.getDate() + 1);
    sdate.setHours(0,0,0,0);
    edate.setHours(0,0,0,0);
    tdate.setHours(0,0,0,0);

    // console.log(arr.startdate, sdate, tdate);

    if(container == 'notstarted' ){
        // color = 'grey';
        when = dateFns.distanceInWordsStrict(tdate, sdate, {addSuffix: true, unit: 'd'});
    }else if(container == 'started' ){
        // color = 'green';
        when = dateFns.distanceInWordsStrict(tdate, edate, {addSuffix: true, unit: 'd'});
    }else if(container == 'due' ){
        // color = 'orange';
        when = dateFns.distanceInWordsStrict(tdate, sdate, {addSuffix: true, unit: 'd'});
    }else if(container == 'pastdue' ){
        // color = 'red';
        when = dateFns.distanceInWordsStrict(tdate, edate, {addSuffix: true, unit: 'd'});
    }else if(container == 'done' ){
        // color = 'blue';
        when = dateFns.distanceInWordsStrict(tdate, edate, {addSuffix: true, unit: 'd'});
    }


    if(arr.status == 'done'){
        color = 'blue';
    }else if(arr.status == 'working'){
        color = 'green';
    }else if(arr.status == 'dispute'){
        color = 'red';
    }else if(arr.status == 'idle'){
        color = 'grey';
    }

    const sd = arr.startdate;
    const ed = arr.enddate;
    let link = '';
    if(arr.planid == 'nst'){
        link = 'Non Specified Task';
    }else{
        link = arr.planid;
    }

    
    
    con.append(`
        <div id="taskboard_${arr.taskid}" taskid="${arr.taskid}"  planid="${arr.planid}" taskid="${arr.taskid}"  class="taskboard-body-widget shadow ${color} unassigned">
            <span class="taskboard-body-widget-id" title="">${arr.taskid}</span>
            <div class="taskboard-body-widget-name">
                <span class="taskboard-body-widget-name-title" >${arr.taskname}</span>
            </div>
            <span class="taskboard-body-widget-dates" sd="${sd}" ed="${ed}" >${sd} - ${ed}</span>
            <span class="taskboard-body-widget-when" >${when}</span>
            <div status="empty" class="taskboard-body-widget-icons-con">
                <i class="fas fa-link taskboard-body-widget-icons-link" title="Task Assigned to ${link}"></i>
            </div>
        </div>
    `);
    
}
function fillTaskboardTasks(datefrom, dateto){
    
}
function setTaskboardTasksUIColors(arr){
    // test out if: has any resource / msgread is unread/ if dispute
        // console.log(arr);
    for(i=0; i<arr.length; i++){
        let resourceGate = false;
        let usrreadGate = false;
        let disputeGate = false;

        let sgd = arr[i].suggesteddate;
        let acd = arr[i].accid;
        let spl = arr[i].supplierid

        // console.log(arr[i].firstname, sgd, arr[i].assignment);

        if( (acd != 'null' && acd != '' && acd != null && acd != undefined) || (spl != 'null' && spl != '' && spl != null && spl != undefined) ){
            resourceGate = true;
        }
        if(arr[i].usrread == 'unread'){
            usrreadGate = true;
        }
        if( sgd != 'null' && sgd != '' && sgd != null && sgd != undefined && sgd != '0000-00-00'){
            disputeGate = true;
        }
        if( arr[i].assignment != 'ok' ){
            disputeGate = true;
        }
        
        
        if(resourceGate){
            $(`#taskboard_${arr[i].taskid}`).removeClass('unassigned').addClass('assigned');
            const con = $(`#taskboard_${arr[i].taskid}`).children('.taskboard-body-widget-icons-con');
            const s = con.attr('status');

            if(s == 'empty'){
                con.append(`
                    <i class="fas fa-exclamation-triangle taskboard-body-widget-icons-dispute" title="View Disputes"></i>
                    <i class="fas fa-comment-alt taskboard-body-widget-icons-usrmsg"></i>
                    <i class="fas fa-reply taskboard-body-widget-icons-pmmsg"></i>
                `).attr('status','full');
            }

            if(usrreadGate){
                $(`#taskboard_${arr[i].taskid}`).children('.taskboard-body-widget-icons-con').children('.taskboard-body-widget-icons-usrmsg').addClass('icon-alert');
            }
            
            if(disputeGate){
                $(`#taskboard_${arr[i].taskid}`).children('.taskboard-body-widget-icons-con').children('.taskboard-body-widget-icons-dispute').addClass('icon-alert');
            }
        }
        
    }
}
function updateTaskBoardResourceList(selid='na', taskid, col, val){
    if(selid != 'na'){
        for(i=0; i<taskboardResouceList.length; i++){
            if(taskboardResouceList[i].id == selid){
                taskboardResouceList[i][col] = val;
            }
        }
    }else{
        console.log('updating by taskid: ', taskid, col, val );
        console.log(taskboardResouceList);
        for(i=0; i<taskboardResouceList.length; i++){
            if(taskboardResouceList[i].taskid == taskid){
                taskboardResouceList[i][col] = val;
            }
        }
    }
    
}
function checkIfDisputeIsNull(con){
    let x = 0;
    $('.taskboard-dispute-con').children('.taskboard-dispute-widget').each(function(){
        x++;
    });
    if(x == 0){
        con.removeClass('icon-alert');
    }
}
    // filter events
$('.taskboard-header-filter-datefrom-reset').click(function(){
    $('#taskboard-header-filter-datefrom').val(getDateNow());
});

    // pmmessage events
$('.taskboard-pmmessage-con').click(function(e){
    if(this != e.target){
        return;
    }else{
        $(this).hide();
    }
});
$('.taskboard-pmmessage-close').click(function(){
    $('.taskboard-pmmessage-con').hide();
});
$(document).on('click', '.taskboard-body-widget-icons-pmmsg', function(){
    const projectid = $('#taskboard-header-projectid').text();
    const main = $(this).parent('.taskboard-body-widget-icons-con').parent('.taskboard-body-widget');
    const taskid = main.attr('taskid');
    $('#taskboard-pmmessage-msg').val('').attr('status', 'empty');
    $('.taskboard-pmmessage-con').attr('tid', taskid);
    // selid = '';
    // selTask = taskid;

    const msg = ACCUSER.getProject(projectid).TaskResource.getPmMessage(taskid); // added stuff

    console.log(msg);

    // for(i=0; i<taskboardResouceList.length; i++){
    //     if(taskboardResouceList[i].taskid == taskid){
    //         selid = taskboardResouceList[i].id;
    //         const st = $('#taskboard-pmmessage-msg').attr('status');
    //         if(st != 'full'){
    //             $('#taskboard-pmmessage-msg').val(taskboardResouceList[i].pmcomment);
    //             $('#taskboard-pmmessage-msg').attr('status', 'full');
    //         }
    //     }
    // }

    $('.taskboard-pmmessage-con').css('display', 'flex').show();
    $('#taskboard-pmmessage-msg').val(msg); // added stuff
    $('#taskboard-pmmessage-msg').focus();
});
$('#taskboard-pmmessage-submit').click(function(){
    const projectid = $('#taskboard-header-projectid').text();
    const taskid = $(this).parent('.taskboard-pmmessage-form').parent('.taskboard-pmmessage-con').attr('tid');
    const msg = $('#taskboard-pmmessage-msg').val();
    console.log(projectid, taskid, msg);
    // update pmcomment on taskid not on TR id

    
    // const cbsuccess=()=>{
    //     $('.taskboard-pmmessage-con').hide();
    //     $('#taskboard-pmmessage-msg').val('');
    //     updateTaskBoardResourceList('na', selTask, 'pmcomment', msg);
    // };
    // api_updatePMComment(selTask, msg, cbsuccess);

    const callback = ()=>{
        const callback1 = ()=>{
            $('.taskboard-pmmessage-con').hide();
            $('#taskboard-pmmessage-msg').val('');
            const na = {
                "response" : "na"
            };
            const probj = ACCUSER.getProject(projectid).getData();
            const praccobj = ACCUSER.getCompanyAccountById(probj.ownerid);
            // const trobj = ACCUSER.getProject(projectid).TaskResource.getObjById(trid);
            const tobj = ACCUSER.getProject(projectid).Task.getTaskObj(taskid);

            const trlist = ACCUSER.getProject(projectid).TaskResource.getObjByTaskId(taskid);
            console.log('TRTRTRTRTR',trlist);
            $.each(trlist, function(key, value){
                // const accobj = ACCUSER.getCompanyAccountById(value.accid);
                if(value.accid != "na" && value.accid != "" && value.accid != null && value.accid != undefined){
                    const aloptions = {
                        'id' : rngAlertId(),
                        'ownerid' : value.accid,
                        'fn' : 'na',
                        'dataview' : JSON.stringify(na),
                        'dataapprove' : JSON.stringify(na),
                        'datareject' : JSON.stringify(na),
                        'title' : "Task Updates",
                        'message' : `PM <b>${praccobj.firstname}</b> has sent a message <b>${msg}</b> to the task <b>${tobj.taskname}</b>!`
                    }
                    console.log("DELETE ME",aloptions);
                    const cb =()=>{
                        ACCUSER.Alert.fill();
                    };
                    ACCUSER.Alert.create(aloptions, cb);
                }
            });
        };
        ACCUSER.getProject(projectid).TaskResource.updateColumnByTaskid({"taskid" : taskid, "columnname" : "pmread", "value" : "unread"}, callback1);
    };
    ACCUSER.getProject(projectid).TaskResource.updatePmMessage({"taskid" : taskid, "message" : msg}, callback);
});

    // usrmessage events
$('.taskboard-usrmessage-con').click(function(e){
    if(this != e.target){
        return;
    }else{
        $(this).hide();
    }
});
$(document).on('click', '.taskboard-body-widget-icons-usrmsg', function(){
    const projectid = $('#taskboard-header-projectid').text();
    const dis = $(this);
    const main = $(this).parent('.taskboard-body-widget-icons-con').parent('.taskboard-body-widget');
    const taskid = main.attr('id').split('_').pop();
    selid = '';
    let readGate = false;
    $('.taskboard-usrmessage-form').children('.taskboard-usrmessage-widget').remove();

    // for(i=0; i<taskboardResouceList.length; i++){
    //     if(taskboardResouceList[i].taskid == taskid){
    //         // console.log(taskboardResouceList[i].taskid, taskboardResouceList[i].usercomment);
    //         selid = taskboardResouceList[i].id;

    //         if(taskboardResouceList[i].usercomment != null && taskboardResouceList[i].usercomment != 'null' && taskboardResouceList[i].usercomment != ''){
    //             // console.log('not null');
    //             $('.taskboard-usrmessage-form').append(`
    //                 <div class="taskboard-usrmessage-widget shadow color-sc">
    //                     <span class="message">${taskboardResouceList[i].usercomment}</span>
    //                     <span class="name">${taskboardResouceList[i].firstname} ${taskboardResouceList[i].lastname}</span>
    //                 </div>
    //             `);
    //             $('.taskboard-usrmessage-con').css('display', 'flex').show();
    //             dis.removeClass('icon-alert');
    //             console.log(taskboardResouceList[i].taskid, taskboardResouceList[i].usrread);
    //             if(taskboardResouceList[i].usrread == 'unread'){
    //                 readGate = true;
    //             }
    //         }else{
    //             // console.log('totally null');
    //             $('#taskboard-usrmessage-msg').val('');
    //             $('#taskboard-usrmessage-name').val(``);
    //         }
    //     }
    // }

    // console.log('readgate', readGate);
    // // console.log(taskboardResouceList);
    // if(readGate){
    //     const cbsuccess=()=>{
    //         updateTaskBoardResourceList('na', taskid, 'usrread', 'read');
    //     };
    //     // console.log('taskid: ', taskid);
    //     api_updateTaskResourceColumnByTaskId(taskid, 'usrread', 'read', cbsuccess);
    // }

    const list = ACCUSER.getProject(projectid).TaskResource.getTaskResourceByTaskid(taskid);
    // $('.taskboard-usrmessage-form').empty();
    let x = 0;
    $.each(list, function(key, value){
        if(value.usercomment != null && value.usercomment != 'null' && value.usercomment != ''){
            // console.log('not null');
            $('.taskboard-usrmessage-form').append(`
                <div class="taskboard-usrmessage-widget shadow color-sc">
                    <span class="message">${value.usercomment}</span>
                    <span class="name">${value.firstname} ${value.lastname}</span>
                </div>
            `);
            dis.removeClass('icon-alert');
            // console.log(value.taskid, value.usrread);
            if(value.usrread == 'unread'){
                // readGate = true;
                const callback = ()=>{

                };
                ACCUSER.getProject(projectid).TaskResource.updateColumnByTaskid({"taskid" : taskid, "columnname" : "usrread", "value" : "read"}, callback);
            }
            x++;
        }
    });

    if(x == 0){
        $('.taskboard-usrmessage-form').append(`
            <div class="taskboard-usrmessage-widget shadow color-sc">
                <span class="message">Empty</span>
                <span class="name">Empty</span>
            </div>
        `);
    }

    $('.taskboard-usrmessage-con').css('display', 'flex').show();


});

    // dispute events
$('.taskboard-dispute-con').click(function(e){
    if(this != e.target){
        return;
    }else{
        $(this).hide();
        $('.taskboard-dispute-form').children('.taskboard-dispute-widget').remove();
    }
});
$('.taskboard-dispute-close').click(function(){
    $('.taskboard-dispute-con').hide();
    $('.taskboard-dispute-form').children('.taskboard-dispute-widget').remove();
});
$(document).on('click', '.taskboard-body-widget-icons-dispute', function(){
    const projectid = $('#taskboard-header-projectid').text();
    const dis = $(this);
    const main = $(this).parent('.taskboard-body-widget-icons-con').parent('.taskboard-body-widget');
    const taskid = main.attr('id').split('_').pop();
    const sd = $(this).parent().siblings('.taskboard-body-widget-dates').attr('sd');
    const ed = $(this).parent().siblings('.taskboard-body-widget-dates').attr('ed');
    selid = '';
    $('.taskboard-dispute-con').attr({"sd" : sd, "ed" : ed, "tid" : taskid});
    $('.taskboard-dispute-form').children('.taskboard-dispute-widget').remove();

    // for(i=0; i<taskboardResouceList.length; i++){
    //     if(taskboardResouceList[i].taskid == taskid){
    //         selid = taskboardResouceList[i].id;
    //         const sgd = taskboardResouceList[i].suggesteddate;
    //         const asg = taskboardResouceList[i].assignment;
    //         // console.log(taskboardResouceList[i].taskid, sgd, asg);
    //         let openGate = false;

    //         if(sgd != 'null' && sgd != null && sgd != '' && sgd != '0000-00-00'){
    //             //add shit
    //             // console.log('append');
    //             $('.taskboard-dispute-form').append(`
    //                 <div id="${selid}" type="sgd" class="taskboard-dispute-widget shadow color-sc">
    //                     <span class="name"><i class="fas fa-calendar-day"></i>${taskboardResouceList[i].firstname} ${taskboardResouceList[i].lastname}</span>
    //                     <span class="message">Suggested New End Date <input type="date" value="${taskboardResouceList[i].suggesteddate}" disabled></span>
    //                     <button class="btn-shadow taskboard-dispute-submit reject">Reject</button>
    //                     <button class="btn-shadow taskboard-dispute-submit approve">Approve</button>
    //                 </div>
    //             `);
    //             openGate = true;
    //         }
    //         if(asg == 'dispute'){
    //             //add shit
    //             // console.log('append');
    //             $('.taskboard-dispute-form').append(`
    //                 <div id="${selid}" type="asg" class="taskboard-dispute-widget shadow color-sc">
    //                     <span class="name"><i class="fas fa-unlink"></i> ${taskboardResouceList[i].firstname} ${taskboardResouceList[i].lastname}</span>
    //                     <span class="message">Request to remove Assignment from Task.</span>
    //                     <button class="btn-shadow taskboard-dispute-submit reject">Reject</button>
    //                     <button class="btn-shadow taskboard-dispute-submit approve">Approve</button>
    //                 </div>
    //             `);
    //             openGate = true;
    //         }
    //         if(openGate){
    //             $('.taskboard-dispute-con').css('display', 'flex').show();
    //         }else{
    //             console.log('totally empty');
    //         }
    //     }
    // }

    const list = ACCUSER.getProject(projectid).TaskResource.getTaskResourceByTaskid(taskid);
    console.log(projectid, taskid);
    let openGate = false;
    $.each(list, function(key, value){
        // selid = value.id;
        $('.taskboard-dispute-con').attr('tid', taskid);
        const sgd = value.suggesteddate;
        const asg = value.assignment;
        console.log(value.taskid, sgd, asg);

        if(sgd != 'null' && sgd != null && sgd != '' && sgd != '0000-00-00'){
            // console.log('append');
            $('.taskboard-dispute-form').append(`
                <div id="${selid}"  type="sgd" class="taskboard-dispute-widget shadow color-sc">
                    <span class="name" accid="${value.accid}" ><i class="fas fa-calendar-day"></i>${value.firstname} ${value.lastname}</span>
                    <span class="message">Suggests to move Tasks End Date to <input type="date" value="${value.suggesteddate}" disabled></span>
                    <button class="btn-shadow taskboard-dispute-submit reject">Reject</button>
                    <button class="btn-shadow taskboard-dispute-submit approve">Approve</button>
                </div>
            `);
            openGate = true;
        }
        if(asg != 'ok'){
            //add shit
            // console.log('append');
            const accobj = ACCUSER.getProject(projectid).getConnectObjById(value.assignment);
            $('.taskboard-dispute-form').append(`
                <div id="${selid}" type="asg" class="taskboard-dispute-widget shadow color-sc">
                    <span class="name" accid="${value.accid}" ><i class="fas fa-unlink"></i> ${value.firstname} ${value.lastname}</span>
                    <span class="message">Suggests to give the Task to <input type="text" accid="${value.assignment}" value="${accobj.firstname} ${accobj.lastname}" disabled></span>
                    <button class="btn-shadow taskboard-dispute-submit reject">Reject</button>
                    <button class="btn-shadow taskboard-dispute-submit approve">Approve</button>
                </div>
            `);
            openGate = true;
        }
        
    });

    if(!openGate){
        console.log('totally empty');
        $('.taskboard-dispute-form').append(`
            <div id="${selid}" type="sgd" class="taskboard-dispute-widget shadow color-sc">
                <span class="name"><i class="fas fa-calendar-day"></i>Empty</span>
                <span class="message">Empty</span>
            </div>
        `);
    }

    $('.taskboard-dispute-con').css('display', 'flex').show();


    // selDisputeIcon = dis;
});
$(document).on('click', '.taskboard-dispute-submit.reject', function(){
    console.log('reject');
    const projectid = $('#taskboard-header-projectid').text();
    const main = $(this).parent('.taskboard-dispute-widget');
    // const accid = $(this).siblings('.name').attr('accid');
    const taskid = $(this).parent('.taskboard-dispute-widget').parent('.taskboard-dispute-form').parent('.taskboard-dispute-con').attr('tid');
    const type = $(this).parent('.taskboard-dispute-widget').attr('type');
    // const startdate = $(this).parent('.taskboard-dispute-widget').parent('.taskboard-dispute-form').parent('.taskboard-dispute-con').attr('sd');
    let title;
    let newaccid = '';
    const accid = $(this).siblings('.name').attr('accid');
    if(type == 'sgd'){
        title = 'Confirm Rejection of Suggested Date';
    }else{
        title = 'This will still keep the Team Member from the Task';
        newaccid = $(this).siblings('.message').children('input').attr('accid');
    }

    const cbtrue =()=>{
        if(type == 'sgd'){
            // change task resource suggesteddate into null where taskid and accid
            const callback = ()=>{
                const callback1 = ()=>{
                    const callback2 = ()=>{
                        main.remove();
                        $('#taskboard-header-search-submit').click();
                        const na = {
                            "response" : "na"
                        };
                        const nastr = JSON.stringify(na);
                        const probj = ACCUSER.getProject(projectid).getData();
                        const tobj = ACCUSER.getProject(projectid).Task.getTaskObj(taskid);
                        const aloptions = {
                            'id' : rngAlertId(),
                            'ownerid' : accid,
                            'fn' : 'na',
                            'dataview' : nastr,
                            'dataapprove' : nastr,
                            'datareject' : nastr,
                            'title' : "Task Updates",
                            'message' : `Your request to change end date of task <b>${tobj.taskname}</b> has been rejected! `
                        }
                        console.log("DELETE ME",aloptions);
                        ACCUSER.Alert.create(aloptions, ()=>{});
                    };
                    ACCUSER.getProject(projectid).Task.updateColumn({"taskid" : taskid, "columnname" : "status", "value" : "idle"}, callback2);
                };
                ACCUSER.getProject(projectid).TaskResource.updateColumnByTaskidAndAccid({"taskid" : taskid, "accid" : accid, "columnname" : "status", "value" : "idle"}, callback1);
            };
            ACCUSER.getProject(projectid).TaskResource.updateColumnByTaskidAndAccid({"taskid" : taskid, "accid" : accid, "columnname" : "suggesteddate", "value" : "null"}, callback);
        }else{
            // change task resource assignment into ok where taskid and accid
            const callback = ()=>{
                const callback1 = ()=>{
                    const callback2 = ()=>{
                        main.remove();
                        $('#taskboard-header-search-submit').click();
                        const na = {
                            "response" : "na"
                        };
                        const nastr = JSON.stringify(na);
                        // const probj = ACCUSER.getProject(projectid).getData();
                        const tobj = ACCUSER.getProject(projectid).Task.getTaskObj(taskid);
                        const accobj = ACCUSER.getCompanyAccountById(newaccid);
                        const aloptions = {
                            'id' : rngAlertId(),
                            'ownerid' : accid,
                            'fn' : 'na',
                            'dataview' : nastr,
                            'dataapprove' : nastr,
                            'datareject' : nastr,
                            'title' : "Task Updates",
                            'message' : `Your request to assign the task <b>${tobj.taskname}</b> to <b>${accobj.firstname}</b> has been rejected! `
                        }
                        console.log("DELETE ME",aloptions);
                        ACCUSER.Alert.create(aloptions, ()=>{});
                    };
                    ACCUSER.getProject(projectid).Task.updateColumn({"taskid" : taskid, "columnname" : "status", "value" : "idle"}, callback2);
                };
                ACCUSER.getProject(projectid).TaskResource.updateColumnByTaskidAndAccid({"taskid" : taskid, "accid" : accid, "columnname" : "status", "value" : "idle"}, callback1);
            };
            ACCUSER.getProject(projectid).TaskResource.updateColumnByTaskidAndAccid({"taskid" : taskid, "accid" : accid, "columnname" : "assignment", "value" : "ok"}, callback);
        }
    };
    const cbfalse =()=>{
        console.log('Cancelled');
    };

    showAction(title, cbtrue, cbfalse);
});
$(document).on('click', '.taskboard-dispute-submit.approve', function(){
    console.log('approve');
    const projectid = $('#taskboard-header-projectid').text();
    const main = $(this).parent('.taskboard-dispute-widget');
    const id = $(this).parent('.taskboard-dispute-widget').attr('id');
    const taskid = $(this).parent('.taskboard-dispute-widget').parent('.taskboard-dispute-form').parent('.taskboard-dispute-con').attr('tid');
    const type = $(this).parent('.taskboard-dispute-widget').attr('type');
    const startdate = $(this).parent('.taskboard-dispute-widget').parent('.taskboard-dispute-form').parent('.taskboard-dispute-con').attr('sd');
    // console.log(id, "HUUUUTANGNAAA");
    let enddate;
    let title;
    const oldaccid = $(this).siblings('.name').attr('accid');
    let newaccid;
    if(type == 'sgd'){
        enddate = $(this).siblings('.message').children('input').val();
        title = 'Confirm Approval of Suggested Date';
    }else{
        title = 'This will still keep the Team Member from the Task';
        newaccid = $(this).siblings('.message').children('input').attr('accid');
    }
    
    const cbtrue =()=>{
        // console.log(id, type, date);
        if(type == 'sgd'){
            const callback = ()=>{
                const callback1 = ()=>{
                    const callback2 = ()=>{
                        const callback2 = ()=>{
                            main.remove();
                            $('#taskboard-header-search-submit').click();
                            // console.log(ACCUSER.getProject(projectid).TaskResource.list);
                            const na = {
                                "response" : "na"
                            };
                            const nastr = JSON.stringify(na);
                            const probj = ACCUSER.getProject(projectid).getData();
                            const tobj = ACCUSER.getProject(projectid).Task.getTaskObj(taskid);
                            const aloptions = {
                                'id' : rngAlertId(),
                                'ownerid' : oldaccid,
                                'fn' : 'na',
                                'dataview' : nastr,
                                'dataapprove' : nastr,
                                'datareject' : nastr,
                                'title' : "Task Updates",
                                'message' : `Your request to change end date of task <b>${tobj.taskname}</b> has been approved! `
                            }
                            console.log("DELETE ME",aloptions);
                            ACCUSER.Alert.create(aloptions, ()=>{});
                        };
                        ACCUSER.getProject(projectid).Task.updateColumn({"taskid" : taskid, "columnname" : "status", "value" : "idle"}, callback2);
                    };
                    ACCUSER.getProject(projectid).TaskResource.updateColumnByTaskid({"taskid" : taskid, "columnname" : "status", "value" : "idle"}, callback2);
                };
                ACCUSER.getProject(projectid).TaskResource.updateColumnByTaskid({"taskid" : taskid, "columnname" : "suggesteddate", "value" : "null"}, callback1);
            };
            ACCUSER.getProject(projectid).Task.updateColumn({"taskid" : taskid, "columnname" : "enddate", "value" : enddate}, callback);
            // console.log(taskid, startdate, enddate);
        }else{
            // change task resource accid into selaccid where accid = curaccid
            // change task resource assignment into ok
            // change task resource status into idle
            // change task status into idle
            const callback = ()=>{
                const callback1 = ()=>{
                    const callback2 = ()=>{
                        const callback2 = ()=>{
                            main.remove();
                            $('#taskboard-header-search-submit').click();
                            // console.log(ACCUSER.getProject(projectid).TaskResource.list);
                            const na = {
                                "response" : "na"
                            };
                            const nastr = JSON.stringify(na);
                            // const probj = ACCUSER.getProject(projectid).getData();
                            const tobj = ACCUSER.getProject(projectid).Task.getTaskObj(taskid);
                            const accobj = ACCUSER.getCompanyAccountById(newaccid);
                            const aloptions = {
                                'id' : rngAlertId(),
                                'ownerid' : oldaccid,
                                'fn' : 'na',
                                'dataview' : nastr,
                                'dataapprove' : nastr,
                                'datareject' : nastr,
                                'title' : "Task Updates",
                                'message' : `Your request to assign the task <b>${tobj.taskname}</b> to <b>${accobj.firstname}</b> has been approved! `
                            }
                            // console.log("DELETE ME",aloptions);
                            const cb1 =()=>{
                                const zaccobj = ACCUSER.getCompanyAccountById(oldaccid);
                                const ztobj = ACCUSER.getProject(projectid).Task.getTaskObj(taskid);
                                const zaloptions = {
                                    'id' : rngAlertId(),
                                    'ownerid' : newaccid,
                                    'fn' : 'na',
                                    'dataview' : nastr,
                                    'dataapprove' : nastr,
                                    'datareject' : nastr,
                                    'title' : "Task Assignment",
                                    'message' : `You have been assigned to the task <b>${ztobj.taskname}</b> as suggested by <b>${zaccobj.firstname}</b>.`
                                }
                                // console.log("DELETE ME",aloptions);
                                ACCUSER.Alert.create(zaloptions, ()=>{});
                            };
                            ACCUSER.Alert.create(aloptions, cb1);
                        };
                        ACCUSER.getProject(projectid).Task.updateColumn({"taskid" : taskid, "columnname" : "status", "value" : "idle"}, callback2);
                    };
                    ACCUSER.getProject(projectid).TaskResource.updateColumnByTaskid({"taskid" : taskid, "columnname" : "status", "value" : "idle"}, callback2);
                };
                ACCUSER.getProject(projectid).TaskResource.updateColumnByTaskid({"taskid" : taskid, "columnname" : "assignment", "value" : "ok"}, callback1);
            };
            ACCUSER.getProject(projectid).TaskResource.updateColumnByTaskidAndAccid({"taskid" : taskid, "accid" : oldaccid, "columnname" : "accid", "value" : newaccid}, callback);
        }
    };
    const cbfalse =()=>{
        console.log('Cancelled');
    };

    showAction(title, cbtrue, cbfalse);
});


$(document).on('click', '.taskboard-body-widget-name', function(){
    $(this).siblings('.taskboard-body-widget-id').show();
    $(this).hide();
    $(this).siblings('.taskboard-body-widget-dates').hide();
    $(this).siblings('.taskboard-body-widget-when').show();
});
$(document).on('click', '.taskboard-body-widget-id', function(){
    $(this).siblings('.taskboard-body-widget-name').show();
    $(this).hide();
    $(this).siblings('.taskboard-body-widget-dates').show();
    $(this).siblings('.taskboard-body-widget-when').hide();
});


    // fetch data events
$('#taskboard-header-search-submit').click(function(){
    const projectid = $('#taskboard-header-projectid').text();
    const datefrom = $('#taskboard-header-filter-datefrom').val();
    const dateto = $('#taskboard-header-filter-dateto').val();

    const today = new Date();
    const fromdate = new Date(`${datefrom} 00:00:00`);
    const todate =  new Date(`${datefrom} 00:00:00`);
    
    today.setHours(0,0,0,0);
    const notstartedcon = $('#taskboard-body-widget-notstarted');
    const startedcon = $('#taskboard-body-widget-started');
    const duecon = $('#taskboard-body-widget-due');
    const pastduecon = $('#taskboard-body-widget-pastdue');
    const donecon = $('#taskboard-body-widget-done');
    notstartedcon.empty();
    startedcon.empty();
    duecon.empty();
    pastduecon.empty();
    donecon.empty();


    if(dateto == '1w'){
        todate.setDate(today.getDate() + 7); //last date
    }else if(dateto == '2w'){
        todate.setDate(today.getDate() + 14); //last date
    }else if(dateto == '1m'){
        todate.setMonth(today.getMonth() + 1); //last date
    }else if(dateto == '2m'){
        todate.setMonth(today.getMonth() + 2); //last date
    }else if(dateto == '3m'){
        todate.setMonth(today.getMonth() + 3); //last date
    }else if(dateto == '6m'){
        todate.setMonth(today.getMonth() + 6); //last date
    }else if(dateto == '1y'){
        todate.setFullYear(today.getFullYear() + 1); //last date
    }else if(dateto == '2y'){
        todate.setFullYear(today.getFullYear() + 2); //last date
    }else if(dateto == '5y'){
        todate.setFullYear(today.getFullYear() + 5); //last date
    }else if(dateto == '10y'){
        todate.setFullYear(today.getFullYear() + 10); //last date
    }

    // const tempList = $.grep(taskboardTaskList, function(e){ 
    //     const ztoday = new Date();
    //     const zfromdate = new Date(fromdate);
    //     const ztodate = new Date(todate);
    //     const d = new Date(e.enddate);

    //     // return e.taskid != taskid; 
    //     return d > zfromdate && d < ztodate;
    // });
    const tlist = ACCUSER.getProject(projectid).Task.getTasks();

    // console.log(tlist);

    const tempList = tlist.filter(function(item) { 
        const d = new Date(`${item.enddate} 00:00:00`);
        return d > fromdate && d < todate; 
    });

    console.log(tempList);

    // console.log(tempList.length);
    // console.log(taskboardTaskList);
    // console.log(taskboardTaskList);
    // not started, started, due, past due, done

    $.each(tempList, function(key, value){
        if(value.status == 'done'){
            // console.log('append to done', tempList[i]);
            appendTaskboardTask('done', value);
        }else{
            const sd = new Date(`${value.startdate} 00:00:00`);
            const ed = new Date(`${value.enddate} 00:00:00`);
            // sd.setDate(sd.getDate() + 1);
            // sd.setHours(0,0,0,0);
            // ed.setDate(ed.getDate() + 1);
            // ed.setHours(0,0,0,0);

            // console.log("sd: ", sd, "ed: ", ed, "today: ", today);


            if( sd >= today){
                // console.log('notstarted',value.taskid, sd, today);
                appendTaskboardTask('notstarted', value);
            }else if(sd < today && ed > today){
                // console.log('started',value.taskid, ed, today);
                appendTaskboardTask('started', value);
            }else if(sd < today && ed.getTime() === today.getTime()){
                // console.log('due',value.taskid, ed, today);
                appendTaskboardTask('due', value);
            }else if(sd < today && ed < today){
                // console.log('pastdue',value.taskid, ed, today);
                appendTaskboardTask('pastdue', value);
            }
        }
    });

    // for(i=0; i<tempList.length; i++){
    //     // console.log(tempList[i].status, i);

    //     if(tempList[i].status == 'done'){
    //         // console.log('append to done', tempList[i]);
    //         appendTaskboardTask('done', tempList[i]);
    //     }else{
    //         const sd = new Date(tempList[i].startdate);
    //         const ed = new Date(tempList[i].enddate);
    //         sd.setDate(sd.getDate() + 1);
    //         sd.setHours(0,0,0,0);
    //         ed.setDate(ed.getDate() + 1);
    //         ed.setHours(0,0,0,0);


    //         if( sd > today){
    //             // console.log('notstarted',tempList[i].taskid, ed, today);
    //             appendTaskboardTask('notstarted', tempList[i]);
    //         }else if(sd < today && ed > today){
    //             // console.log('started',tempList[i].taskid, ed, today);
    //             appendTaskboardTask('started', tempList[i]);
    //         }else if(sd < today && ed.getTime() === today.getTime()){
    //             // console.log('due',tempList[i].taskid, ed, today);
    //             appendTaskboardTask('due', tempList[i]);
    //         }else if(sd < today && ed < today){
    //             // console.log('pastdue',tempList[i].taskid, ed, today);
    //             appendTaskboardTask('pastdue', tempList[i]);
    //         }
    //     }
    // }

    const trlist = ACCUSER.getProject(projectid).TaskResource.getTaskResource();
    setTaskboardTasksUIColors(trlist);
    $('.taskboard-body').css({"display" : "flex"}).show();
});
    
    // mods events
$('#taskboard-mods-exit').parent('.taskboard-mods-widget').click(function(){
    $('.dashboard-con').show();
    $('.taskboard-con').hide();
});
$('#taskboard-mods-dashboard').parent('.taskboard-mods-widget').click(function(){
    $('#nav-dashboard').click();
});
$('#taskboard-mods-refresh').parent('.taskboard-mods-widget').click(function(){
    const projectid = $('#taskboard-header-projectid').text();

    showRefreshReport("Refreshing...");
    setTimeout(() => {
        const cb=()=>{
            ACCUSER.Alert.fill();
            const fetchCallback =data=>{
                console.log(data);
                    const fetchCallback1 =data=>{
                        console.log(data);
                        $('#taskboard-header-search-submit').click();
                        setTimeout(() => {
                            hideRefreshReport();
                        }, 0);
                    };
                    ACCUSER.getProject(projectid).checkList('TaskResource', fetchCallback1, true);
            };
            ACCUSER.getProject(projectid).checkList('Task', fetchCallback, true);
        }
        ACCUSER.checkList('Alert', cb, true);
    }, 0);

});










let taskPlanDocList = {}; // list of all documents
let taskList = [];
let taskConnectList = [];
let taskResouceList = []; // list of all resource
let taskProjList = [];
let accountList = [];
let supplierList = [];
let curPlanid = '';

const clipboardDragOption = {
    start: function(e, ui) {
        // this function fires when you start dragging
        $('.tasklist-widget').css('background-color', GREEN_PALETTE);
        $(ui.helper).css('max-width', '300px');
        $(ui.helper).css('cursor', 'grabbing');

        // const tid = $(ui.helper).attr('tid');
        // const name = $(ui.helper).attr('name');
        
        
    },
    drag: function() {
    //   this function fires after you drag and while dragging
    },
    stop: function() {
    // this function fires when you stop dragging or if you dropped it
        // $('.create-upload-con3-connectList-widget').css('background-color', SUB_COLOR);
        $('.tasklist-widget').css('background-color', SUB_COLOR);
    // and here in stop you can color your droppable div into its original state
    },
    opacity: 0.7, // opacity of the draggable
    helper: "clone", // will not drag the actual element. instead will send a clone
    // containment: ".task-con", // here is where the draggable can stay. if you put "body" then it can go around the whole page
                                       // but if you put "#sampleid" then it will contain the draggable within the range of the div with the id of 'sampleid'
    scroll: false,  // prevents scrolling
    cursorAt: { bottom: 10, left: 150}, // puts cursor at center bottom || remove left option to just simply put it in bottom
    // cursor: 'grabbing',
    revert: "invalid" // draggable will fall back to its place
};
const docListDropOption = {
    accept: ".task-clipboard-tasklist-widget", // this will determine which elements are accepted to drop in this case all element with the class of moduleman-module-list-widget will drop
    drop: function( event, ui ) {
        // same with the draggable. if you use this code, you can access the draggable element thats being dropped 
        const taskid = rngTaskId();
        const projectid = $('.task-header-projectid').attr('prid');
        const planid = $(event.target).attr('id').split('_').pop();
        const name = $(ui.draggable).attr('name');
        let sd = $(event.target).attr('sd');
        let ed = $(event.target).attr('ed');
        let maxd = ed;
        let mind = sd;


        if(sd == 'null' || sd == null || sd == undefined || sd == ''){
            sd = getDateNow();
            mind = '';
        }
        if(ed == 'null' || ed == null || ed == undefined || ed == ''){
            ed = getDateNow();
            maxd = '';
        }
        

        $(event.target).append(`
            <div id="${taskid}" planid="${planid}" projectid="${projectid}" name="${name}" class="tasklist-widget-task">
                <input type="text"  value="${name}" class="tasklist-widget-task-name-i" placeholder="Please Enter TaskName">
                <span class="tasklist-widget-task-name-s">${name}</span>
                <input class="tasklist-widget-date-start" value="${sd}" type="date">
                <input class="tasklist-widget-date-end" value="${ed}" type="date">
                <i class="fas fa-user-plus"></i>
                <i class="fas fa-clipboard-list tasklist-widget-icon-clipboard"></i>
                <i status="save" class="fas fa-save tasklist-widget-icon-edit"></i>
                <i class="fas fa-trash tasklist-widget-icon-delete"></i>
            </div>
        `);
        $(`#${taskid}`).children('.tasklist-widget-task-name-i').show();
        $(`#${taskid}`).children('.tasklist-widget-task-name-s').hide();
        blinkbg($(`#${taskid}`).children('.tasklist-widget-icon-edit'),GREEN_PALETTE, 'transparent');
        $(event.target).children('.tasklist-widget-task').show();
        
    }
};

let selTaskId = '';
let selPlanId = '';
let selType = 'hours';


function initializeLinkAndPredsActual(projectid){
    const list = ACCUSER.getProject(projectid).ScheduleDocument.getList();
    // console.log(list);
    let linkGate = true;
    let predsGate = true;
    let selLinkStage = '';
    
    $.each(list, function(key, value){
        const vv = value.getData();

        linkGate = vv.linkid == undefined || vv.linkid == null ? false : true;
        predsGate = vv.predecessorid == undefined || vv.predecessorid == null ? false : true;

        if(linkGate){
            const linkobj = ACCUSER.getProject(projectid).ScheduleDocument.getDocsByLinkid(vv.linkid);
            // console.log('ASKLJDGHOILUASHDIUSADHG', linkobj);
            selLinkStage = linkobj[0].linkstage;
            let dArr = [];
            $.each(linkobj, function(key, value){
                let d = new Date(`${value[selLinkStage]} 00:00:00`);
                dArr.push({
                    "date" : d
                });
                
                // console.log(date);
                $(`#tasklist_${value.docid}`).children('.tasklist-widget-title').children(`.tasklist-widget-dates-${selLinkStage}`).removeClass('editable').addClass('uneditable');
           
            });
            
            const nl = dArr.sort(function(a, b) {
                const aa = a.date;
                const bb = b.date;
                return aa < bb ? 1 : -1;
            });

            $.each(linkobj, function(key, value){
                console.log(nl[0].date);
                let zdate = dateFns.format(nl[0].date, "YYYY-MM-DD");
                console.log(zdate);
                $(`#tasklist_${value.docid}`).children('.tasklist-widget-title').children(`.tasklist-widget-dates-${selLinkStage}`).val(zdate).css('background-color', 'red');
            });

        }

        if(predsGate){
            const predobj = ACCUSER.getProject(projectid).ScheduleDocument.getObjByDocId(vv.docid).predecessor.list;
            

            // console.log('ASKLJDGHOILUASHDIUSADHG', predobj);
            selStage = predobj[0].stage;
            let dArr = [];
            $.each(predobj, function(key, value){
                const dddd = ACCUSER.getProject(projectid).ScheduleDocument.getObjByDocId(value.preddocid).getData();
                // console.log('DDDDDDDDDDD', dddd[selStage], selStage);
                const preddate = new Date(`${dddd[selStage]} 00:00:00`);
                dArr.push({
                    "date" : preddate
                });
            });
            const nl = dArr.sort(function(a, b) {
                const aa = a.date;
                const bb = b.date;
                return aa < bb ? 1 : -1;
            });
            // console.log('PREDEDDDDD', nl[0]);

            const x = $(`#tasklist_${value.docid}`).children('.tasklist-widget-title').children(`.tasklist-widget-dates-${selStage}`)[0].previousElementSibling;
            // console.log('KLASJDHKLJHASDHJKLSADHJKLHJKLHKJKHJHKJKHJHJKL', x);
            
            // console.log($(x).val(), nl[0].date);
            let xdate = new Date(`${$(x).val()} 00:00:00`);
            let ydate = nl[0].date;
            console.log(xdate, ydate);

            if(ydate.getTime() > xdate.getTime()){
                let zdate = dateFns.format(nl[0].date, "YYYY-MM-DD");
                console.log(zdate);
                $(x).val(zdate).removeClass('editable').addClass('uneditable').css('background-color', 'red');
            }else{
                $(x).removeClass('editable').addClass('uneditable');
            }

        }


    });
}
function fillTasklistWidgetCon(projectid){
    const list = ACCUSER.getProject(projectid).ScheduleDocument.getList();
    console.log(list);
    $('.tasklist-widget-con').empty();
    $.each(list, function(key, value){
        const vv = value.getData();
        let ed = '';
        if(vv.postapprovaled == "" || vv.postapprovaled == undefined || vv.postapprovaled == null){
            ed = vv.approvaled;
        }else{
            ed = vv.postapprovaled;
        }
        let milestonestatus = vv.milestone == "true" || vv.milestone == true ? `<i class="fas fa-star tasklist-widget-title-milestone active" status="active"></i>` : `<i class="far fa-star tasklist-widget-title-milestone idle" status="idle"></i>`;


        $('.tasklist-widget-con').append(`
            <div id="tasklist_${vv.docid}" sd="${vv.draftsd}" ed="${ed}" class="tasklist-widget color-sc">
                <div status="closed"  class="tasklist-widget-title">
                    <i status="bars" class="fas fa-bars handle tasklist-widget-addtask"></i>
                    <span for="scales"><input type="checkbox" name="schedulehandler" class="tasklist-widget-title-documenthandler">${milestonestatus}${vv.title}</span>
                    <input class="tasklist-widget-dates-draftsd editable first" value="${vv.draftsd}" type="date" disabled>
                    <input class="tasklist-widget-dates-drafted editable" value="${vv.drafted}" type="date" disabled>
                    <input class="tasklist-widget-dates-reviewed editable" value="${vv.reviewed}" type="date" disabled>
                    <input class="tasklist-widget-dates-approvaled editable" value="${vv.approvaled}" type="date" disabled>
                    <input class="tasklist-widget-dates-executioned editable" value="${vv.executioned}" type="date" disabled>
                    <input class="tasklist-widget-dates-postapprovaled editable" value="${vv.postapprovaled}" type="date" disabled>
                </div>
            </div>
        `);
        $('.tasklist-widget').droppable(docListDropOption);
    });

    $('.tasklist-widget-con').append(`
        <div id="tasklist_nst" class="tasklist-widget color-sc">
            <div status="closed" class="tasklist-widget-title">
                <i status="bars" class="fas fa-bars handle tasklist-widget-addtask"></i>
                <span>Non Specified Task</span>
            </div>
        </div>
    `);
    $('.tasklist-widget').droppable(docListDropOption);

    $('.handler-icon.fa-edit').css("display", "none").hide();
    $('.handler-icon.fa-link').css("display", "none").hide();
    $('.handler-icon.fa-paperclip').css("display", "none").hide();
    $('.handler-icon.fa-trash').css("display", "none").hide();
    initializeLinkAndPredsActual(projectid);


}
function setTaskClipboard(name){
    const g = localStorage.getItem('taskclipboard');
    // console.log(g);

    let arr = [];
    if(g == null || g == '' || g == undefined){
        arr = [];
    }else{
        arr = JSON.parse(g);
    }
    arr[arr.length] = {
        'id' : rng5(),
        'name' : name
    };
    // console.log(arr);
    localStorage.setItem('taskclipboard',  JSON.stringify(arr));
    getTaskClipboard();
}
function getTaskClipboard(){
    $('.task-clipboard-tasklist').empty();
    const g = localStorage.getItem('taskclipboard');
    let arr = [];
    if(g == null || g == '' || g == undefined){
        arr = [];
    }else{
        arr = JSON.parse(g);
    }
    // console.log(arr);
    $.each(arr, function(key,val) {                    
        $('.task-clipboard-tasklist').prepend(`
            <span tid="${val.id}" name="${val.name}" class="task-clipboard-tasklist-widget color-sc shadow">${val.name}<i class="fas fa-trash"></i></span>
        `);
    });
    $('.task-clipboard-tasklist-widget').draggable(clipboardDragOption);
}
function removeTaskClipboard(id){
    const g = localStorage.getItem('taskclipboard');
    let arr = JSON.parse(g);
    
    // console.log(arr);
    const data = $.grep(arr, function(e){ 
        return e.id != id; 
    });
    localStorage.setItem('taskclipboard',  JSON.stringify(data));
}
function fillTasks(projectid, planid){
    const tlist = ACCUSER.getProject(projectid).Task.getTasks();
    
    tlist.sort(function(a, b) {
        var c = new Date(a.startdate);
        var d = new Date(b.startdate);
        return c-d;
    });
    $(`#tasklist_${planid}`).children('.tasklist-widget-task').remove();
    $.each(tlist, function(key, value){
        if(value.planid == planid){
            const planDocEd = $(`#tasklist_${value.planid}`).attr('ed');
            let counter = 0;
            let total_hours = 0;
            let hours_pre = '';
            const trlist = ACCUSER.getProject(projectid).TaskResource.getObjByTaskId(value.taskid);

            $.each(trlist, function(key, value){
                counter++;
                if(value.type == 'supplier'){
                    if(!hours_pre.includes('Suppliers')){
                        hours_pre += 'Suppliers, ';
                    }
                }else if(value.type == 'hours'){
                    if(!hours_pre.includes('Team')){
                        hours_pre += 'Team, ';
                    }
                }else if(value.type == 'tm'){
                    if(!hours_pre.includes('T&M')){
                        hours_pre += 'T&M, ';
                    }
                }

                if(value.type == 'supplier'){
                    total_hours += 0;
                }else{
                    total_hours += parseFloat(value.hours);
                }
            });

            total_hours = total_hours == "NaN" || total_hours == undefined || total_hours == NaN ? 0 : total_hours;

            $(`#tasklist_${value.planid}`).append(`
                <div id="${value.taskid}" planid="${value.planid}" projectid="${value.projectid}" name="${value.taskname}" class="tasklist-widget-task">
                    <input value="${value.taskname}" type="text" class="tasklist-widget-task-name-i">
                    <span class="tasklist-widget-task-name-s">${value.taskname}  <div><span class="totalhours">${hours_pre} ${total_hours} Hours</span><span class="counter">${counter}</span></div></span>
                    <input class="tasklist-widget-date-start" value="${value.startdate}" type="date" max="${planDocEd}"  disabled>
                    <input class="tasklist-widget-date-end" value="${value.enddate}" type="date" max="${planDocEd}" disabled>
                    <i class="fas fa-user-plus tasklist-widget-icon-resources"></i>
                    <i class="fas fa-clipboard-list tasklist-widget-icon-clipboard"></i>
                    <i status="edit" class="fas fa-edit tasklist-widget-icon-edit"></i>
                    <i class="fas fa-trash tasklist-widget-icon-delete"></i>
                </div>
            `);
        }

    });

}
function fillTaskResourceFormConnectList(taskid, planid){

    const projectid = $('#dashboard-body-projectname').attr('prid');
    let totalhours = 0;
    const trlist = ACCUSER.getProject(projectid).TaskResource.getTaskResourceByTaskid(taskid);

    $('.task-resources-form-connect-list').empty();
    $.each(trlist, function(key, value){
        let name = '';
        const accid = value.accid;
        const supplierid = value.supplierid;
        const hours = value.hours;
        let isSupplierContent = '';

        // console.log(value.accid);
        // let cs = value.accid.split('-');
        const acctype = value.accid == null || value.accid == "" || value.accid == undefined ? "na" : value.accid.split('-')[0] == "TA" ? true : false;
        const spltype = value.supplierid == null || value.supplierid == "" || value.supplierid == undefined ? "na" : value.supplierid.split('-')[0] == "TS" ? true : false;

        let accobj = {};
        let splobj = {};

        
        // console.log(acctype, spltype);
        if(acctype == "na"){
            accobj = {};
        }else if(acctype){
            accobj = ACCUSER.getProject(projectid).getTmpAccountObj(value.accid);
        }else if(!acctype){
            accobj = ACCUSER.getAccountObjById(value.accid);
            accobj.name = `${accobj.firstname} ${accobj.lastname}`;
        }

        if(spltype == "na"){
            splobj = {};
        }else if(spltype){
            splobj = ACCUSER.getProject(projectid).getTmpSupplierObj(value.supplierid);
        }else if(!spltype){
            splobj = ACCUSER.Supplier.getObjById(value.supplierid);
        }
        
        if(value.type == "supplier"){
            name = splobj == undefined ? "" : splobj.name;
            uid = supplierid;
            isSupplierContent = '';
        }else if(value.type == "tm"){
            name = splobj == undefined ? "" : splobj.name;
            uid = accid;
            isSupplierContent = `
                <input type="text" placeholder="hours" value="${hours}" disabled>
                <i status="edit" class="fas fa-edit task-resources-form-connect-list-widget-edit"></i>
            `;
        }else if(value.type == "hours"){
            name = accobj.name;
            uid = accid;
            isSupplierContent = `
                <input type="text" placeholder="hours" value="${hours}" disabled>
                <i status="edit" class="fas fa-edit task-resources-form-connect-list-widget-edit"></i>
            `;
        }

        $('.task-resources-form-connect-list').append(`
            <span rid="${value.id}" tid="${taskid}" class="task-resources-form-connect-list-widget color-sc">${name}
                <div>
                    ${isSupplierContent}
                    <i class="fas fa-trash task-resources-form-connect-list-widget-delete"></i>
                </div>
            </span>
        `);

        totalhours += isNaN(hours) || hours == null || hours == 'null' ? 0 : parseFloat(hours);
        // console.log('PEPEPEPEPET', totalhours);

        $('.task-resources-form-totalhours').text(totalhours);
        fillTasks(projectid, planid);
    });

}
function fillTaskResource(taskid){
    const projectid = $('#dashboard-body-projectname').attr('prid');
    const trlist = ACCUSER.getProject(projectid).TaskResource.getObjByTaskId(taskid);

    $.each(trlist, function(key, value){
        let name = '';
            const accid = value.accid;
            const supplierid = value.supplierid;
            if(accid == 'null' || accid == '' || accid == null || accid == undefined){
                name = value.suppliername;
            }else if(supplierid == 'null' || supplierid == '' || supplierid == null || supplierid == undefined){
                name = `${value.firstname} ${value.lastname}`;
            }

            $('.task-body-prefs-resources-widget-con').append(`
                <span id="${value.id}" class="task-body-prefs-resources-widget btn-shadow task-prefs-widget-item-d">${name}  <i class="fas fa-trash task-body-prefs-resources-widget-delete"></i></span>
            `);
    });
}
function showScheduleboardIcons(){
    let counter = 0;
    $('.tasklist-widget-con').children('.tasklist-widget').each(function(){
        let cb = $(this).children('.tasklist-widget-title').children('span').children('input');
        if(cb.is(':checked')){
            counter++;
        }
    });
    console.log("counter: ", counter);
    if(counter == 1){
        $('.fa-edit.handler-icon').show();
        $('.handler-icon.fa-link').show();
        $('.handler-icon.fa-paperclip').show();
        $('.handler-icon.fa-bolt').show();
        $('.handler-icon.fa-trash').show();
    }else if(counter > 1){
        $('.handler-icon.fa-edit').show();
        $('.handler-icon.fa-link').hide();
        $('.handler-icon.fa-paperclip').hide();
        $('.handler-icon.fa-bolt').show();
        $('.handler-icon.fa-trash').hide();
    }else if(counter <= 0){
        $('.handler-icon.fa-edit').hide();
        $('.handler-icon.fa-link').hide();
        $('.handler-icon.fa-paperclip').hide();
        $('.handler-icon.fa-bolt').hide();
        $('.handler-icon.fa-trash').hide();
    }
}


// initializes links after retrieving document information
function createLinks(list){
    var i;
    for(i=0;i<list.length;i++){
        var j;
        var linkid = list[i].linkid;
        var linkstage = list[i].linkstage;

        for(j=0;j<list.length;j++){
            let newLink = new Link();
            if(j != i && list[j].linkid != undefined && list[j].linkid == linkid){
                newLink.id = linkid;
                newLink.stage = linkstage;
                newLink.date = list[j].searchStage(linkstage);
                if(list[j].actualtitle == undefined){
                    newLink.docname = list[j].name;
                    newLink.docid = list[j].id;
                }else{
                    newLink.docname = list[j].actualtitle;
                    newLink.docid = list[j].actualid;
                }
                list[i].appendLink(newLink);
            }
        }
    }
}
// initializes producessor after retrieving document information
function createProducessor(list){
    var i;
    for(i=0;i<list.length;i++){
        var j;
        var producessorid = list[i].producessorid;
        var producessorstage = list[i].producessorstage;

        for(j=0;j<list.length;j++){
            let newProducessor = new Producessor();
            if(j != i && list[j].producessorid != undefined && list[j].producessorid == producessorid){
                newProducessor.id = producessorid;
                newProducessor.stage = producessorstage;
                newProducessor.date = list[j].searchStage(producessorstage);
                if(list[j].actualtitle == undefined){
                    newProducessor.docname = list[j].name;
                    newProducessor.docid = list[j].id;
                }else{
                    newProducessor.docname = list[j].actualtitle;
                    newProducessor.docid = list[j].actualid;
                }
                list[i].appendProducessor(newProducessor);
            }
        }
    }
}

// TASK EVENTS -> Now Called Schedule UNDER ACTIVE DOCUMENTS
$('#task-header-search-submit').click(function(){
    let projectid = $('#dashboard-body-projectname').attr('prid');
    let ownerid = $('#dashboard-body-projectname').attr('ow');
    let firstname = $('#dashboard-body-projectname').attr('fn');
    let lastname = $('#dashboard-body-projectname').attr('ln');
    let photo = $('#dashboard-body-projectname').attr('ph');
    let projectname = $('#dashboard-body-projectname').attr('pn');

    selprojectid = projectid;
    selprojectname = projectname;
    selownerid = ownerid;
    selfirstname = firstname;
    sellastname = lastname;
    selphoto = photo;

    showRefreshReport("Loading...");
    setTimeout(() => {
        $('#task-header-projectid').text(projectid);
        $('#task-header-projectname').text(projectname);
        $('#task-header-ownername').text(`${firstname} ${lastname}`);
        $('.task-navigation-widget').removeClass('selected');
        $('.task-body').hide();
        $('.dashboard-con').hide();
        $('.task-con').show();
    
        $('.handler-icon.fa-edit').hide();
        $('.handler-icon.fa-link').hide();
        $('.handler-icon.fa-paperclip').hide();
        $('.handler-icon.fa-bolt').hide();
    
        $('.task-header-projectid').text(`Project Id: ${projectid}`).attr('prid', projectid);
        $('.task-body').css('display', 'flex').show();
        fillTasklistWidgetCon(projectid);
    
        $('.task-body').css('display', 'flex').show();
        $('.task-header-projectid').show();
        $('.task-header-ownerid').show();
        $('.task-body-prefs-resources').hide();
        getTaskClipboard();
    
        const callback=(data)=>{
            console.log(data);
            const callback1=(data1)=>{
                console.log(data1);
            };
            ACCUSER.getProject(projectid).checkList('TmpSupplier',callback1,true);
        };
        ACCUSER.getProject(projectid).checkList('TmpAccount',callback,true);
    }, 0);
    setTimeout(() => {
        hideRefreshReport();
    }, 0);
    

});

    // tasklist checkbox event
$(document).on('change', '.tasklist-widget-title-documenthandler', function(){
    const editcon = $('#task-body-tasklist-legend-edit');

    if(editcon.hasClass('fa-save')){
        $(this).prop("checked", true);
    }else{
        showScheduleboardIcons();
    }

    
});

    // Document Main Events
$(document).on('click', '.tasklist-widget-title > span', function(e){
    
    let projectid = $('#dashboard-body-projectname').attr('prid');
    const main = $(this).parent('.tasklist-widget-title').parent('.tasklist-widget');
    const planid = main.attr('id').split('_').pop();
    console.log(planid);
    $('.task-body-prefs-resources').hide();

    if(e.target.tagName == "I"){
        // console.log('I');
        return;
    }else if(e.target.tagName == "INPUT"){
        // console.log('INPUT');
        return;
    }else if(e.target.tagName == "SPAN"){
        // console.log('SPAN');
    }

    if($(this).parent('.tasklist-widget-title').attr('status') == 'closed'){
        // apend the tasks
        $(this).parent('.tasklist-widget-title').attr('status','open');
        $(this).siblings('i').removeClass('fa-bars').addClass('fa-plus').attr('status', 'plus');
        
        fillTasks(projectid, planid);
        $(this).siblings('input').css('display', 'none');
        $(this).siblings('.handler-icon').css('display', 'none');
        $(this).siblings('span').css({
            'text-overflow': 'initial',
            'overflow': 'initial',
            'background-color': SUB_COLOR,
            'z-index': '100'
        });
        $(this).siblings('span').show();

    }else if($(this).parent('.tasklist-widget-title').attr('status') == 'open'){
        // remove the tasks
        $(this).parent('.tasklist-widget-title').attr('status','closed');
        $(this).siblings('i').removeClass('fa-plus').addClass('fa-bars').attr('status', 'bars');
        main.children('.tasklist-widget-task').remove();

        $(this).siblings('input').css('display', 'block');
        $(this).siblings('.handler-icon').css('display', 'block');
        $(this).siblings('span').css({
            'text-overflow': 'ellipsis',
            'overflow': 'hidden',
            'background-color': 'initial',
            'z-index': 'initial'
        });
        $(this).siblings('span').hide();
    }
    
    
    
});

$(document).on('mouseover', '.tasklist-widget-title > span', function(e){
    $(this).siblings('input').hide();
    $(this).siblings('.handler-icon').hide();
    $(this).siblings('span').css({
        'text-overflow': 'initial',
        'overflow': 'initial',
        'background-color': SUB_COLOR,
        'z-index': '100'
    });
});
$(document).on('mouseout', '.tasklist-widget-title > span', function(){
    if($(this).parent('.tasklist-widget-title').attr('status') == 'closed'){
        $(this).siblings('input').show();
        $(this).siblings('.handler-icon').show();
        $(this).siblings('span').css({
            'text-overflow': 'ellipsis',
            'overflow': 'hidden',
            'background-color': 'initial',
            'z-index': 'initial'
        });
    }
});
$(document).on('click', '.tasklist-widget-addtask', function(){  // OK
    const planid = $(this).parent('.tasklist-widget-title').parent('.tasklist-widget').attr('id').split('_').pop();
    const taskid = rngTaskId();
    const projectid = $('#task-header-projectid').text();
    const sd = $(this).parent('.tasklist-widget-title').parent('.tasklist-widget').attr('sd');
    const ed = $(this).parent('.tasklist-widget-title').parent('.tasklist-widget').attr('ed');

    console.log(projectid);

    const status = $(this).attr('status');

    if(status == 'plus'){
        $(`#tasklist_${planid}`).append(`
            <div id="${taskid}" planid="${planid}" projectid="${projectid}" class="tasklist-widget-task">
                <input type="text" class="tasklist-widget-task-name-i" placeholder="Please Enter TaskName">
                <span class="tasklist-widget-task-name-s"></span>
                <input class="tasklist-widget-date-start" value="${sd}" type="date">
                <input class="tasklist-widget-date-end" value="${ed}" type="date">
                <i class="fas fa-user-plus"></i>
                <i class="fas fa-clipboard-list tasklist-widget-icon-clipboard"></i>
                <i status="save" class="fas fa-save tasklist-widget-icon-edit"></i>
                <i class="fas fa-trash tasklist-widget-icon-delete"></i>
            </div>
        `);
        $(`#${taskid}`).children('.tasklist-widget-task-name-i').show();
        $(`#${taskid}`).children('.tasklist-widget-task-name-s').hide();
        blinkbg($(`#${taskid}`).children('.tasklist-widget-icon-edit'), GREEN_PALETTE, 'transparent');
    }else{
        $(this).siblings('span').click();
    }
});

    // Clipboard Events
$(document).on('click', '.task-clipboard-tasklist-widget > i', function(){
    const id = $(this).parent('.task-clipboard-tasklist-widget').attr('tid');
    console.log(id);
    removeTaskClipboard(id);
    $(this).parent('.task-clipboard-tasklist-widget').remove();
});

    // TaskList Icon Events
$(document).on('click', '.tasklist-widget-icon-clipboard', function(){
    const name = $(this).siblings('.tasklist-widget-task-name-s')
    .clone()    //clone the element
    .children() //select all the children
    .remove()   //remove all the children
    .end()  //again go back to selected element
    .text();

    setTaskClipboard(name);
    blinkbg($('.task-clipboard'), GREEN_PALETTE, BTN_COLOR);
});
$(document).on('click', '.tasklist-widget-icon-edit', function(){
    const main = $(this).parent('.tasklist-widget-task');
    const planid = main.attr('planid');
    const projectid = $('#dashboard-body-projectname').attr('prid');
    const taskid = main.attr('id');
    const taskname = main.children('.tasklist-widget-task-name-i').val();
    const startdate = $(this).siblings('.tasklist-widget-date-start').val();
    const enddate = $(this).siblings('.tasklist-widget-date-end').val();
    
    // console.log(planid, projectid, taskid, taskname, startdate, enddate);
    if($(this).attr('status') == 'save'){
        // save the record
        const callback =()=> {
            $(this).attr('status','edit');
            $(this).siblings('.tasklist-widget-date-start').prop('disabled', true);
            $(this).siblings('.tasklist-widget-date-end').prop('disabled', true);
            main.children('.tasklist-widget-task-name-i').hide();
            main.children('.tasklist-widget-task-name-s').text(taskname).show();
            $(this).removeClass('fa-save').addClass('fa-edit');
            $(this).siblings('.fa-user-plus').addClass('tasklist-widget-icon-resources');
            fillTasks(projectid, planid);
        };

        const obj = {
            'taskid' : taskid,
            'projectid' : projectid,
            'planid' : planid,
            'taskname' : taskname,
            'startdate' : startdate,
            'enddate' : enddate
        }
        console.log(obj);
        // api_createTask(taskid, projectid, planid, taskname, startdate, enddate, cbsuccess);
        ACCUSER.getProject(projectid).Task.create(obj, callback);

    }else if($(this).attr('status') == 'edit'){
        $(this).attr('status','save');
        // enable editing
        $(this).siblings('.tasklist-widget-date-start').prop('disabled', false);
        $(this).siblings('.tasklist-widget-date-end').prop('disabled', false);
        main.children('.tasklist-widget-task-name-i').show();
        main.children('.tasklist-widget-task-name-s').hide();
        $(this).removeClass('fa-edit').addClass('fa-save');
    }

});
$(document).on('click', '.tasklist-widget-icon-delete', function(){ // OK
    const taskid = $(this).parent('.tasklist-widget-task').attr('id');
    const projectid = $(this).parent('.tasklist-widget-task').attr('projectid');
    const planid = $(this).parent('.tasklist-widget-task').attr('planid');
    console.log(taskid);
    const cbtrue = () => {
        const callback=()=>{
            fillTasks(projectid, planid);
        }
        ACCUSER.getProject(projectid).Task.delete({"taskid" : taskid}, callback);
    };
    const cbfalse = () => console.log('Cancelled Delete');
    showAction('All Resources attached to this Task will also be deleted. Do you still wish to proceed?', cbtrue, cbfalse);

});
$(document).on('click', '.tasklist-widget-icon-resources', function(){ // OK
    const taskid = $(this).parent('.tasklist-widget-task').attr('id');
    const taskname = $(this).siblings('.tasklist-widget-preqsched-name-s')
        .clone()    //clone the element
        .children() //select all the children
        .remove()   //remove all the children
        .end()  //again go back to selected element
        .text();
    const planid =  $(this).parent('.tasklist-widget-task').parent('.tasklist-widget').attr('id').split('_').pop();
    $('.task-resources-con').attr({"taskid" : taskid, "planid" : planid}).css('display', 'flex').show();
    fillTaskResourceFormConnectList(taskid, planid);
});
$(document).on('click', '.tasklist-widget-title-milestone', function(){  // OK
    const projectid = $('#dashboard-body-projectname').attr('prid');
    const status = $(this).attr('status');
    const planid = $(this).parent('span').parent('.tasklist-widget-title').parent('.tasklist-widget').attr('id').split('_').pop();

    if(status == 'idle'){
        const callback=()=>{
            $(this).removeClass('far').addClass('fas').attr('status', 'active');
            $(this).removeClass('idle').addClass('active');
        }
        ACCUSER.getProject(projectid).ScheduleDocument.getObjByDocId(planid).updateMilestone(callback);
    }else{
        const callback=()=>{
            $(this).removeClass('fas').addClass('far').attr('status', 'idle');
            $(this).removeClass('active').addClass('idle');
        }
        ACCUSER.getProject(projectid).ScheduleDocument.getObjByDocId(planid).deleteMilestone(callback);
    }
});


    // Task Resource Events
$('.task-resources-form-type-handle').click(function(){
    const projectid = $('#dashboard-body-projectname').attr('prid');
    const id = $(this).attr('id').split('-').pop();
    selType = id;
    $('.task-resources-form-type-container').hide();
    $(`.task-resources-form-type-${id}`).css('display','flex').show();

    if(id == 'hours'){
        // $('#preqsched-resources-form-type-hours-select').empty();
        ACCUSER.getProject(projectid).fillSelectTagWithConnectedAccount($('#task-resources-form-type-hours-select'));
    }else if(id == 'supplier'){
        // $('#task-resources-form-type-supplier-select').empty();
        ACCUSER.Supplier.fillSelectTag($('#task-resources-form-type-supplier-select'));
    }else if(id == 'tm'){
        // $('#task-resources-form-type-tm-select').empty();
        ACCUSER.Supplier.fillSelectTag($('#task-resources-form-type-tm-select'));
    }

});
$('.task-resources-form-type-submit').click(function(){
    const w = $(this);
    const projectid = $('#dashboard-body-projectname').attr('prid');
    const planid = $('.task-resources-con').attr('planid');
    const taskid = $('.task-resources-con').attr('taskid');
    const trid = rngTaskResourceId();
    let type = '';
    let supplierid = '';
    let accid = '';
    let hours = '';
    let fname = '';
    let lname = '';
    let sname = '';

    let createNewSupplierGate = undefined; 
    let createNewTMGate = undefined; 
    // if false then create taskresourece 
    // else { create new supplier and taskresource}


    if($(this).hasClass('hours')){
        type = 'hours';
        const x = parseFloat($('#task-resources-form-type-hours-input').val());
        accid = $('#task-resources-form-type-hours-select').val();
        const name = $('#task-resources-form-type-hours-select option:selected').text();
        const v = name.split(' ');
        lname = v[v.length - 1];
        for(k=0; k<(v.length - 1); k++){
            fname += `${v[k]} `; 
        }
        sname = 'na';

        if(x != ''){
            if(isNaN(x)){
                blinkbg($('#task-resources-form-type-hours-input'), RED_PALETTE, 'white');
                $('#task-resources-form-type-hours-input').val('');
                return;
            }else{
                hours = x;
            }
        }

    }else if($(this).hasClass('supplier')){
        type = 'supplier';
        const spl = $('#task-resources-form-type-supplier-select').val();
        const name = $('#task-resources-form-type-supplier-select option:selected').text();
        const newsuppliername = $('#task-resources-form-type-supplier-input').val();

        if(newsuppliername == "" || newsuppliername == undefined || newsuppliername == null){
            blinkbg($('#task-resources-form-type-supplier-select'), GREEN_PALETTE, 'white');
            sname = name;
            supplierid = spl;
            createNewSupplierGate = false;
        }else{
            createNewSupplierGate = true;
            sname = newsuppliername;
            supplierid = rngSupplierId();
            blinkbg($('#task-resources-form-type-supplier-input'), GREEN_PALETTE, 'white');
        }
        createNewTMGate = undefined;
    }else if($(this).hasClass('tm')){
        type = 'tm';
        const spl = $('#task-resources-form-type-tm-select').val();
        const name = $('#task-resources-form-type-tm-select option:selected').text();
        const newsuppliername = $('#task-resources-form-type-tm-input').val();
        const mhours = parseFloat($('#task-resources-form-type-tm-maxhours').val());
        
        if(mhours != ''){
            if(!Number.isInteger(parseInt(mhours))){
                blinkbg($('#task-resources-form-type-tm-maxhours'), RED_PALETTE, 'white');
                $('#task-resources-form-type-tm-maxhours').val('');
                return;
            }else{
                hours = mhours;
            }
        }
        
        if(mhours != "" && newsuppliername != ""){
            createNewTMGate = true;
            sname = newsuppliername;
            supplierid = rngSupplierId();
            blinkbg($('#task-resources-form-type-tm-maxhours'), GREEN_PALETTE, 'white');
            blinkbg($('#task-resources-form-type-tm-input'), GREEN_PALETTE, 'white');
        }else{
            createNewTMGate = false;
            sname = name;
            supplierid = spl;
            blinkbg($('#task-resources-form-type-tm-select'), GREEN_PALETTE, 'white');
        }
        createNewSupplierGate = undefined;
    }

 
    if(hours == ''){
        hours = 0;
    }
    const params = {
        'trid' : trid,
        'taskid' : taskid,
        'type' : type,
        'projectid' : projectid,
        'planid' : planid,
        'supplierid' : supplierid,
        'accid' : accid,
        'hours' : hours,
        'firstname' : fname,
        'lastname' : lname,
        'suppliername' : sname
    };

    if(type == 'hours'){
        const callback=()=>{
            let name = '';
            if(sname == 'na'){
                name = fname; 
            }else{
                name = sname;
            }

            let xxx = '';
            if(type != "supplier"){
                xxx = `<input type="text" placeholder="hours" value="${hours}" disabled>
                <i status="edit" class="fas fa-edit task-resources-form-connect-list-widget-edit"></i>`;
            }


            $('.task-resources-form-connect-list').append(`
                <span rid="${trid}" class="task-resources-form-connect-list-widget color-sc">${name}
                    <div>
                        ${xxx}
                        <i class="fas fa-trash task-resources-form-connect-list-widget-delete"></i>
                    </div>
                </span>
            `);

            if(type == 'hours'){
                const naobj = {
                    "response" : "na"
                };
                const ddataview = {
                    "projectid" : projectid,
                    "taskid" : taskid
                };
                const taskobj = ACCUSER.getProject(projectid).Task.getTaskObj(taskid);
                const aloptions = {
                    'id' : rngAlertId(),
                    'ownerid' : params.accid,
                    'fn' : 'message-viewtask',
                    'dataview' : JSON.stringify(ddataview),
                    'dataapprove' : JSON.stringify(naobj),
                    'datareject' : JSON.stringify(naobj),
                    'title' : "Task Assignment",
                    'message' : `You have Been Assigned to <b>${taskobj.taskname}</b>. Task ends in ${taskobj.enddate}`
                }
                ACCUSER.Alert.create(aloptions, ()=>{});
            }
            
        };
        ACCUSER.getProject(projectid).TaskResource.create(params, callback);
    }



    if(createNewSupplierGate != undefined && createNewSupplierGate == true){
        const cbsuccess1=()=>{
            const cbsuccess=()=>{
                $(`#tasklist_${planid}`).children('.tasklist-widget-task').remove();
                let name = '';
                if(sname == 'na'){
                    name = fname + ' ' + lname; 
                }else{
                    name = sname;
                }
                $('.task-resources-form-connect-list').append(`
                    <span rid="${trid}" class="task-resources-form-connect-list-widget color-sc">${name}
                        <div>
                            <i class="fas fa-trash task-resources-form-connect-list-widget-delete"></i>
                        </div>
                    </span>
                `);
                $('#task-resources-form-type-supplier-select').append(`
                    <option value="${supplierid}">${sname}</option>
                `);

            };
            const sploptions = {
                'supplierid' : supplierid,
                'companyid' : __COMPANY_ID,
                'projectid' : projectid,
                'name' : sname
            }
            ACCUSER.Supplier.create(sploptions, cbsuccess);
        };
        const toptions = {
            'trid' : trid,
            'taskid' : taskid,
            'type' : type,
            'projectid' : projectid,
            'planid' : planid,
            'supplierid' : supplierid,
            'accid' : accid,
            'hours' : hours,
            'firstname' : fname,
            'lastname' : lname,
            'suppliername' : sname
        }
        ACCUSER.getProject(projectid).TaskResource.create(toptions, cbsuccess1);
    }else if(createNewSupplierGate != undefined && createNewSupplierGate == false){
        if(supplierid == null || supplierid == undefined){
            showNotification("Supplier Error", "Please Select a Supplier.");
        }else{
            const cbsuccess=()=>{
                $(`#tasklist_${planid}`).children('.tasklist-widget-task').remove();
                let name = '';
                if(sname == 'na'){
                    name = fname + ' ' + lname; 
                }else{
                    name = sname;
                }
                $('.task-resources-form-connect-list').append(`
                    <span rid="${trid}" class="task-resources-form-connect-list-widget color-sc">${name}
                        <div>
                            <i class="fas fa-trash task-resources-form-connect-list-widget-delete"></i>
                        </div>
                    </span>
                `);
                // $('.task-resources-con').hide();
            };
            const toptions = {
                'trid' : trid,
                'taskid' : taskid,
                'type' : type,
                'projectid' : projectid,
                'planid' : planid,
                'supplierid' : supplierid,
                'accid' : accid,
                'hours' : hours,
                'firstname' : fname,
                'lastname' : lname,
                'suppliername' : sname
            }
            ACCUSER.getProject(projectid).TaskResource.create(toptions, cbsuccess);

        }
    }

    if(createNewTMGate != undefined && createNewTMGate == true){
        const cbsuccess1=()=>{
            const cbsuccess=()=>{
                $(`#tasklist_${planid}`).children('.tasklist-widget-task').remove();
                let name = '';
                if(sname == 'na'){
                    name = fname + ' ' + lname; 
                }else{
                    name = sname;
                }
                $('.task-resources-form-connect-list').append(`
                    <span rid="${trid}" class="task-resources-form-connect-list-widget color-sc">${name}
                        <div>
                            <i class="fas fa-trash task-resources-form-connect-list-widget-delete"></i>
                        </div>
                    </span>
                `);
                $('#task-resources-form-type-supplier-select').append(`
                    <option value="${supplierid}">${sname}</option>
                `);

            };
            const sploptions = {
                'supplierid' : supplierid,
                'companyid' : __COMPANY_ID,
                'projectid' : projectid,
                'name' : sname
            }
            ACCUSER.Supplier.create(sploptions, cbsuccess);
        };
        const toptions = {
            'trid' : trid,
            'taskid' : taskid,
            'type' : type,
            'projectid' : projectid,
            'planid' : planid,
            'supplierid' : supplierid,
            'accid' : accid,
            'hours' : hours,
            'firstname' : fname,
            'lastname' : lname,
            'suppliername' : sname
        }
        ACCUSER.getProject(projectid).TaskResource.create(toptions, cbsuccess1);
    }else if(createNewTMGate != undefined && createNewTMGate == false){
        if(supplierid == null || supplierid == undefined){
            showNotification("Supplier Error", "Please Select a Supplier.");
        }else{
            const cbsuccess=()=>{
                $(`#tasklist_${planid}`).children('.tasklist-widget-task').remove();
                let name = '';
                if(sname == 'na'){
                    name = fname + ' ' + lname; 
                }else{
                    name = sname;
                }
                $('.task-resources-form-connect-list').append(`
                    <span rid="${trid}" class="task-resources-form-connect-list-widget color-sc">${name}
                        <div>
                            <i class="fas fa-trash task-resources-form-connect-list-widget-delete"></i>
                        </div>
                    </span>
                `);
                // $('.task-resources-con').hide();
            };
            const toptions = {
                'trid' : trid,
                'taskid' : taskid,
                'type' : type,
                'projectid' : projectid,
                'planid' : planid,
                'supplierid' : supplierid,
                'accid' : accid,
                'hours' : hours,
                'firstname' : fname,
                'lastname' : lname,
                'suppliername' : sname
            }
            // console.log('HAHAHHA',toptions);
            ACCUSER.getProject(projectid).TaskResource.create(toptions, cbsuccess);

        }
    }



    fillTaskResourceFormConnectList(taskid, planid);
    fillTasks(projectid, planid);

});
$('.task-resources-con').click(function(e){
    const projectid = $('#dashboard-body-projectname').attr('prid');
    const planid = $('.task-resources-con').attr('planid');
    const taskid = $('.task-resources-con').attr('taskid');
    if(this != e.target){
        return;
    }else{
        $(this).hide();
        $(`#tasklist_${selPlanId}`).children('.tasklist-widget-task').remove();
        fillTaskResource(taskid);
        fillTasks(projectid, planid);
    }
});

    // Task events scheduleboard BRIJESH CODES GO HERE
function findSelectedDocument(){
    let list = [];
    $('.tasklist-widget-con').children('.tasklist-widget').each(function(){
        let cb = $(this).children('.tasklist-widget-title').children('span').children('input');
        if(cb.is(':checked')){
            list[list.length] = $(this);
        }
    });


    return list;
}
$('.document-link-con').click(function(e){
    if(e.target != this){
        return;
    }else{
        $(this).toggle();
    }
});
$('.document-preds-con').click(function(e){
    if(e.target != this){
        return;
    }else{
        $(this).toggle();
    }
});
$(document).on('click', '.task-body-tasklist-legend > .blocking > .handler-icon.fa-link', function(){
    let planid = '';
    $('.tasklist-widget-con').children('.tasklist-widget').each(function(){
        let cb = $(this).children('.tasklist-widget-title').children('span').children('input');
        if(cb.is(':checked')){
            const docname = $(this).children('.tasklist-widget-title').children('span').text();
            planid = $(this).attr('id').split('_').pop();
            $('.document-link-form-title-documentname').text(docname);
            console.log(planid, docname);
            $('.document-link-con').css('display', 'flex').show();
        }
    });

});
$(document).on('click', '.task-body-tasklist-legend > .blocking > .handler-icon.fa-paperclip', function(){
    let planid = '';
    $('.tasklist-widget-con').children('.tasklist-widget').each(function(){
        let cb = $(this).children('.tasklist-widget-title').children('span').children('input');
        if(cb.is(':checked')){
            const docname = $(this).children('.tasklist-widget-title').children('span').text();
            planid = $(this).attr('id').split('_').pop();
            $('.document-preds-form-title-documentname').text(docname);
            console.log(planid, docname);
            $('.document-preds-con').css('display', 'flex').show();
        }
    });
});
$(document).on('click', '.task-body-tasklist-legend > .blocking > .handler-icon.fa-edit', function(){
    const projectid = $('#dashboard-body-projectname').attr('prid');
    console.log(projectid);

    // $(this).siblings('input.editable').prop('disabled', false).css('border-left', '1px solid ' + SUB_COLOR);
    $(this).removeClass('fa-edit').addClass('fa-save').attr('msg','Save').css('background-color', MAIN_COLOR);
    $('.tasklist-widget-con').children('.tasklist-widget').each(function(){
        let cb = $(this).children('.tasklist-widget-title').children('span').children('input');
        if(cb.is(':checked')){
            $(this).children('.tasklist-widget-title').children('input.editable').prop('disabled', false).css('border-left', '1px solid ' + SUB_COLOR);
        }
    });
});
$(document).on('click', '.task-body-tasklist-legend > .blocking > .handler-icon.fa-bolt', function(){
    const draftsd = $(this).siblings('.tasklist-widget-dates-draftsd').val();
    const drafted = $(this).siblings('.tasklist-widget-dates-drafted').val();
    const reviewed = $(this).siblings('.tasklist-widget-dates-reviewed').val();
    const approvaled = $(this).siblings('.tasklist-widget-dates-approvaled').val();
    const executioned = $(this).siblings('.tasklist-widget-dates-executioned').val();
    const postapprovaled = $(this).siblings('.tasklist-widget-dates-postapprovaled').val();


    console.log(draftsd, drafted, reviewed, approvaled, executioned, postapprovaled);

    
});
$(document).on('click', '.task-body-tasklist-legend > .blocking > .handler-icon.fa-plus', function(){
    $('.task-add-con').css('display', 'flex').show();
});
$(document).on('click', '.task-body-tasklist-legend > .blocking > .handler-icon.fa-trash', function(){
    const projectid = $('#dashboard-body-projectname').attr('prid');
    const cbok=()=>{
        $('.tasklist-widget-con').children('.tasklist-widget').each(function(){
            let docid = $(this).attr('id').split('_').pop();
            let cb = $(this).children('.tasklist-widget-title').children('span').children('input');
            if(cb.is(':checked')){
                // $(this).children('.preqtasklist-widget-title').children('input.editable').prop('disabled', false).css('border-left', '1px solid ' + SUB_COLOR);
                const callback=()=>{
                    fillTasklistWidgetCon(projectid);
                }
                const links = ACCUSER.getProject(projectid).ScheduleDocument.getDocByPlanningId(docid).link;
                console.log(links.list);
                $.each(links.list, function(key, value){
                    console.log(value,'0000000000000000000000000000');
                    console.log(value.planningid);
                    const doc = ACCUSER.getProject(projectid).ScheduleDocument.getDocByPlanningId(value.planningid);
                    console.log(doc);
                    console.log(ACCUSER.getProject(projectid).ScheduleDocument);
                    doc.link = new NewLink();
                    doc.linkid = undefined;
                    doc.linkstage = undefined;
                });
                ACCUSER.getProject(projectid).ScheduleDocument.delete({"docid" : docid}, callback);
            }
        });
    };
    const cberror=()=>{
        console.log('cancelled');
    };
    showValidate(cbok, cberror);
    console.log('cancelled');
});
$(document).on('click', '.task-body-tasklist-legend > .blocking > .handler-icon.fa-save', function(){
    const projectid = $('#dashboard-body-projectname').attr('prid');
    console.log(projectid);
    $(this).removeClass('fa-save').addClass('fa-edit').attr('msg','Edit').css('background-color', BTN_COLOR);
    $('.tasklist-widget-con').children('.tasklist-widget').each(function(){
        const docid = $(this).attr('id').split('_').pop();
        const cb = $(this).children('.tasklist-widget-title').children('span').children('input');
        const draftsd = $(this).children('.tasklist-widget-title').children('.tasklist-widget-dates-draftsd').val();
        const drafted = $(this).children('.tasklist-widget-title').children('.tasklist-widget-dates-drafted').val();
        const reviewed = $(this).children('.tasklist-widget-title').children('.tasklist-widget-dates-reviewed').val();
        const approvaled = $(this).children('.tasklist-widget-title').children('.tasklist-widget-dates-approvaled').val();
        const executioned = $(this).children('.tasklist-widget-title').children('.tasklist-widget-dates-executioned').val();
        const postapprovaled = $(this).children('.tasklist-widget-title').children('.tasklist-widget-dates-postapprovaled').val();

        if(cb.is(':checked')){
            const obj = {
                'docid' : docid,
                'draftsd' : draftsd,
                'drafted' : drafted,
                'reviewed' : reviewed,
                'approvaled' : approvaled,
                'executioned' : executioned,
                'postapprovaled' : postapprovaled
            };
            console.log(obj);
            const callback=()=>{
                $(this).children('.tasklist-widget-title').children('input.editable').prop('disabled', true).css('border-left', '1px solid white');
                cb.prop('checked', false);
                $('.handler-icon.fa-edit').css("display", "none").hide();
                $('.handler-icon.fa-link').css("display", "none").hide();
                $('.handler-icon.fa-paperclip').css("display", "none").hide();
                $('.handler-icon.fa-trash').css("display", "none").hide();
            }
            ACCUSER.getProject(projectid).ScheduleDocument.update(obj, callback);
        }
    });
});

    // Task Header Events------Schedule Board Header Events
$('.task-mods-widget').click(function(){
    const id = $(this).children('span').attr('id');
    console.log(id);
    let projectid = $('#task-header-projectid').html();
    console.log(projectid);
    if(id.includes('clipboard')){
        const s = $(this).attr('status');
        if(s == 'show'){
            $(this).children('i').removeClass('fa-eye-slash').addClass('fa-eye');
            $('.task-clipboard').hide();
            $(this).attr('status', 'hide');
        }else if(s == 'hide'){
            $(this).children('i').removeClass('fa-eye').addClass('fa-eye-slash');
            $('.task-clipboard').show();
            $(this).attr('status', 'show');
        }
    }
    if(id.includes('refresh')){
        showRefreshReport("Refreshing...");
        setTimeout(() => {
            const cb=()=>{
                ACCUSER.Alert.fill();
                const callback1=(data1)=>{
                    console.log(data1);
                    const callback1=(data1)=>{
                        console.log(data1);
                        $('#task-header-search-submit').click();
                    };
                    ACCUSER.getProject(projectid).checkList('ConnectByProjectId',callback1,true);
                };
                ACCUSER.getProject(projectid).checkList('ScheduleDocument',callback1,true);
            }
            ACCUSER.checkList('Alert', cb, true);
        }, 0);
        setTimeout(() => {
            hideRefreshReport();
        }, 0);

    }
    if(id.includes('exit')){
        $('.task-con').hide();
        $('.dashboard-con').show();
    }
    if(id.includes('dashboard')){
        $('#nav-dashboard').click();
    }
    if(id.includes('print')){
        console.log('Printing');
        let body = $('.task-body-tasklist').html();
        let content = `<div class="task-body-tasklist">${body}</div>`;

        printPageArea(content);
    }

});

    // Task Resource Events
$(document).on('click', '.task-resources-form-connect-list-widget-edit', function(){
    const projectid = $('#dashboard-body-projectname').attr('prid');
    const planid = $('.task-resources-con').attr("planid");
    const status = $(this).attr('status');
    const trid = $(this).parent('div').parent('.task-resources-form-connect-list-widget').attr('rid');
    const taskid = $(this).parent('div').parent('.task-resources-form-connect-list-widget').attr('tid');

    if(status == 'edit'){
        $(this).attr('status', 'save');
        $(this).removeClass('fa-edit').addClass('fa-save');
        $(this).siblings('input').prop('disabled', false);
    }else if(status == 'save'){
        const hour = parseFloat($(this).siblings('input').val());
        let tHours = 0;
        if(isNaN(hour)){
            console.log('string', hour);
            blinkbg($(this).siblings('input'), RED_PALETTE, 'white');
            return;
        }else{

            const callback=()=>{
                let th = 0;
                $('.task-resources-form-connect-list').children('.task-resources-form-connect-list-widget').each(function(){
                    let x = $(this).children('div').children('input').val();
                    if(isNaN(x)){
                        x = 0;
                    }
                    th += parseFloat(x);
                });
                $('.task-resources-form-totalhours').text(th);
                fillTasks(projectid, planid);
            }
            const options = {
                'trid' : trid,
                'columnname' : 'hours',
                'value' : hour
            };
            ACCUSER.getProject(projectid).TaskResource.updateColumn(options, callback);


            
        }

        $(this).attr('status', 'edit');
        $(this).removeClass('fa-save').addClass('fa-edit');
        $(this).siblings('input').prop('disabled', true);
    }
});
$(document).on('click', '.task-resources-form-connect-list-widget-delete', function(){
    const projectid = $('#dashboard-body-projectname').attr('prid');
    const planid = $('.task-resources-con').attr("planid");
    const rid = $(this).parent('div').parent('.task-resources-form-connect-list-widget').attr('rid');
    const callback=()=>{
        $(this).parent('div').parent('.task-resources-form-connect-list-widget').remove();
        let th = 0;
        $('.task-resources-form-connect-list').children('.task-resources-form-connect-list-widget').each(function(){
            let x = $(this).children('div').children('input').val();
            if(isNaN(x)){
                x = 0;
            }
            th += parseFloat(x);
        });
        $('.task-resources-form-totalhours').text(th);
        fillTasks(projectid, planid);
    };
    ACCUSER.getProject(projectid).TaskResource.delete({"id" : rid}, callback);
});

    // task events clipboard
$('.task-clipboard').draggable({
    start: function(e, ui) {
        // this function fires when you start dragging
        // $('.tasklist-widget').css('background-color', GREEN_PALETTE);
        // $(ui.helper).css('max-width', '300px');

        // const tid = $(ui.helper).attr('tid');
        // const name = $(ui.helper).attr('name');
        
        
    },
    drag: function() {
    //   this function fires after you drag and while dragging
    },
    stop: function() {
    // this function fires when you stop dragging or if you dropped it
        // $('.create-upload-con3-connectList-widget').css('background-color', SUB_COLOR);
        // $('.tasklist-widget').css('background-color', BTN_COLOR);
    // and here in stop you can color your droppable div into its original state
    },
    opacity: 0.7, // opacity of the draggable
    // helper: "clone", // will not drag the actual element. instead will send a clone
    // containment: ".task-con", // here is where the draggable can stay. if you put "body" then it can go around the whole page
                                       // but if you put "#sampleid" then it will contain the draggable within the range of the div with the id of 'sampleid'
    scroll: false,  // prevents scrolling
    // cursorAt: { bottom: 10, left: 50}, // puts cursor at center bottom || remove left option to just simply put it in bottom
    // cursor: 'grabbing',
    // revert: "none" // draggable will fall back to its place
});
$('.task-clipboard').click(function(){
    const status = $(this).attr('status');
    if(status == 'closed'){
        $(this).animate({'height' : '400px', 'border-radius' : '25px', 'border-top-right-radius' : '0px'}, 200, function(){
            $(this).animate({'width' : '300px'}, 200, function(){
                $('.task-clipboard-icon').css({'opacity' : '1'}).animate({'opacity' : '0'}, 200, function(){
                    $('.task-clipboard-form').css({'display': 'flex', 'opacity' : '0'}).animate({'opacity' : '1'}, 200);
                }).hide();
            });
        }).css({
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'position': 'absolute',
            'bottom': '5vh',
            'right': '5vw',
        });
        $(this).attr('status', 'open');
    }
   
});
$('.task-clipboard-title > i').click(function(){
    // console.log('close');
    $('.task-clipboard-form').css({'display': 'flex', 'opacity' : '1'}).animate({'opacity' : '0'}, 100, function(){
        // $('.task-clipboard').animate({'width' : '80px'}, 200);
        $('.task-clipboard').animate({'width' : '80px', 'height' : '80px', 'border-radius' : '50%', 'border-top-right-radius' : 'initial'}, 200, function(){
            $('.task-clipboard-icon').css({'display': 'initial', 'opacity' : '0'}).animate({'opacity' : '1'}, 200, function(){
                $('.task-clipboard').attr('status', 'closed');
            });
        });
    }).hide();
    
});
$('.task-clipboard-addtask > button').click(function(){
    const name = $('.task-clipboard-addtask > input').val();
    setTaskClipboard(name);
    $('.task-clipboard-addtask > input').val('');
});


    // task-add-con - static events
$('.task-add-con').click(function(e){
    if(e.target != this){
        return;
    }else{
        $(this).css("display","none").hide();
    }
});
$('#task-add-form-cancel').click(function(){
    $('.task-add-con').css("display","none").hide();
});

    // task-add-con - save event
$('#task-add-form-save').click(function(){
        const projectid = $('#dashboard-body-projectname').attr('prid');
        const draftsd = $('#task-add-form-draftsd').val();
        const drafted = $('#task-add-form-drafted').val();
        const reviewed = $('#task-add-form-reviewed').val();
        const approvaled = $('#task-add-form-approvaled').val();
        const executioned = $('#task-add-form-executioned').val();
        const postapprovaled = $('#task-add-form-postapprovaled').val();
        const title = $('#task-add-form-title').val();
        let createGate = true;
    
        if(draftsd == ""){
            blinkbg($('#task-add-form-draftsd'), RED_PALETTE, "white");
            createGate = false;
        }
        if(drafted == ""){
            blinkbg($('#task-add-form-drafted'), RED_PALETTE, "white");
            createGate = false;
        }
        if(reviewed == ""){
            blinkbg($('#task-add-form-reviewed'), RED_PALETTE, "white");
            createGate = false;
        }
        if(approvaled == ""){
            blinkbg($('#task-add-form-approvaled'), RED_PALETTE, "white");
            createGate = false;
        }
        if(title == ""){
            blinkbg($('#task-add-form-title'), RED_PALETTE, "white");
            createGate = false;
        }
    
        if(createGate){
            const obj = {
                'docid' : rngPlanningDocumentId(),
                'projectid' : projectid,
                'title' : title,
                'approvaled' : approvaled,
                'draftsd' : draftsd,
                'drafted' : drafted,
                'reviewed' : reviewed,
                'executioned' : executioned,
                'postapprovaled' : postapprovaled
            };
            console.log(obj);
    
            const callback=()=>{
                fillTasklistWidgetCon(projectid);
                $('.task-add-con').css("display","none").hide();
            }
            ACCUSER.getProject(obj.projectid).ScheduleDocument.create(obj, callback);
        }
    
    });






    






// REQUEST CREATETOOL SCHEDULE > UNDER NEW PROJECTS>>BUILD EVENTS

function fillPreqTaskResourceFormConnectList(taskid, planid){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const sender = $('#request-createtool-required-requestid').attr('sender');
    let totalhours = 0;
    const trlist = ACCUSER.getProject(projectid).TaskResource.getTaskResourceByTaskid(taskid);

    $('.preqsched-resources-form-connect-list').empty();
    $.each(trlist, function(key, value){
        let name = '';
        const accid = value.accid;
        const supplierid = value.supplierid;
        const hours = value.hours;
        let isSupplierContent = '';
        
        let accobj = ACCUSER.getProject(projectid).getTmpAccountObj(value.accid);
        let splobj = ACCUSER.getProject(projectid).getTmpSupplierObj(value.supplierid);
        
        if(value.type == "supplier"){
            name = splobj.name;
            uid = supplierid;
            isSupplierContent = '';
        }else if(value.type == "tm"){
            name = splobj.name;
            uid = accid;
            isSupplierContent = sender == "viewer" ? `<input type="text" placeholder="hours" value="${hours}" disabled>` : `
                <input type="text" placeholder="hours" value="${hours}" disabled>
                <i status="edit" class="fas fa-edit preqsched-resources-form-connect-list-widget-edit"></i>
            `;
        }else if(value.type == "hours"){
            name = accobj.name;
            uid = accid;
            isSupplierContent = sender == "viewer" ? `<input type="text" placeholder="hours" value="${hours}" disabled>` : `
                <input type="text" placeholder="hours" value="${hours}" disabled>
                <i status="edit" class="fas fa-edit preqsched-resources-form-connect-list-widget-edit"></i>
            `;
        }

        let senderhtml = sender == "viewer" ? `` : `<i class="fas fa-trash preqsched-resources-form-connect-list-widget-delete"></i>`;

        $('.preqsched-resources-form-connect-list').append(`
            <span rid="${value.id}" tid="${taskid}" class="preqsched-resources-form-connect-list-widget color-sc">${name}
                <div>
                    ${isSupplierContent}
                    ${senderhtml}
                </div>
            </span>
        `);

        totalhours += isNaN(hours) || hours == null || hours == 'null' ? 0 : parseFloat(hours);
        console.log('PEPEPEPEPET', totalhours);

        $('.preqsched-resources-form-totalhours').text(totalhours);
        fillPreqTasks(projectid, planid);
    });
}
function fillPreqTasks(projectid, planid){
    const sender = $('#request-createtool-required-requestid').attr('sender');
    // $('.preqtasklist-widget').children('.preqtasklist-widget-task').remove();
    setTimeout(() => {
        const tlist = ACCUSER.getProject(projectid).Task.getTasks();
        
        tlist.sort(function(a, b) {
            var c = new Date(a.startdate);
            var d = new Date(b.startdate);
            return c-d;
        });
    
        
        console.log(tlist);

        let senderhtml = sender == "viewer" ? `<i class="fas fa-eye preqtasklist-widget-icon-resources"></i>` : 
        `<i class="fas fa-user-plus preqtasklist-widget-icon-resources"></i>
        <i status="edit" class="fas fa-edit preqtasklist-widget-icon-edit"></i>
        <i class="fas fa-trash preqtasklist-widget-icon-delete"></i>`;
        
        $(`#preqtasklist_${planid}`).children('.preqtasklist-widget-task').remove();
        $.each(tlist, function(key, value){
            console.log(value);
            
            if(value.planid == planid){
                const planDocEd = $(`#tasklist_${value.planid}`).attr('ed');
                let counter = 0;
                let total_hours = 0;
                let hours_pre = '';
                const trlist = ACCUSER.getProject(projectid).TaskResource.getObjByTaskId(value.taskid);
    
                $.each(trlist, function(key, value){
                    counter++;
                    if(value.type == 'supplier'){
                        if(!hours_pre.includes('Suppliers')){
                            hours_pre += 'Suppliers, ';
                        }
                    }else if(value.type == 'hours'){
                        if(!hours_pre.includes('Team')){
                            hours_pre += 'Team, ';
                        }
                    }else if(value.type == 'tm'){
                        if(!hours_pre.includes('T&M')){
                            hours_pre += 'T&M, ';
                        }
                    }
    
                    if(value.type == 'supplier'){
                        total_hours += 0;
                    }else{
                        total_hours += parseFloat(value.hours);
                    }
                });
    
                total_hours = total_hours == "NaN" || total_hours == undefined || total_hours == NaN ? 0 : total_hours;
                $(`#preqtasklist_${value.planid}`).append(`
                    <div id="${value.taskid}" planid="${value.planid}" projectid="${value.projectid}" name="${value.taskname}" class="preqtasklist-widget-task">
                        <input value="${value.taskname}" type="text" class="preqtasklist-widget-preqsched-name-i">
                        <span class="preqtasklist-widget-preqsched-name-s">${value.taskname}  <div><span class="totalhours">${hours_pre} ${total_hours} Hours</span><span class="counter">${counter}</span></div></span>
                        <input class="preqtasklist-widget-date-start" value="${value.startdate}" type="date" max="${planDocEd}"  disabled>
                        <input class="preqtasklist-widget-date-end" value="${value.enddate}" type="date" max="${planDocEd}" disabled>
                        ${senderhtml}
                    </div>
                `);
            }
        }); 
    }, 0);

}
function initializeLinkAndPreds(projectid){
    const list = ACCUSER.getProject(projectid).ScheduleDocument.getList();
    // console.log(list);
    let linkGate = true;
    let predsGate = true;
    let selLinkStage = '';
    
    $.each(list, function(key, value){
        const vv = value.getData();

        linkGate = vv.linkid == undefined || vv.linkid == null ? false : true;
        predsGate = vv.predecessorid == undefined || vv.predecessorid == null ? false : true;

        if(linkGate){
            const linkobj = ACCUSER.getProject(projectid).ScheduleDocument.getDocsByLinkid(vv.linkid);
            // console.log('ASKLJDGHOILUASHDIUSADHG', linkobj);
            selLinkStage = linkobj[0].linkstage;
            let dArr = [];
            $.each(linkobj, function(key, value){
                let d = new Date(`${value[selLinkStage]} 00:00:00`);
                dArr.push({
                    "date" : d
                });
                
                // console.log(date);
                $(`#preqtasklist_${value.docid}`).children('.preqtasklist-widget-title').children(`.preqtasklist-widget-dates-${selLinkStage}`).removeClass('editable').addClass('uneditable');
           
            });
            
            const nl = dArr.sort(function(a, b) {
                const aa = a.date;
                const bb = b.date;
                return aa < bb ? 1 : -1;
            });

            $.each(linkobj, function(key, value){
                console.log(nl[0].date);
                let zdate = dateFns.format(nl[0].date, "YYYY-MM-DD");
                // const date = new Date(nl[0]);
                // const d = date.getDay() + 1;
                // const m = date.getMonth() + 1;
                // const year = date.getFullYear();


                // let day = '';
                // let month = '';

                // if(d <= 9){
                //     day = '0' + d;
                // }else{
                //     day = d;
                // }
                // if(m <= 9){
                //     month = '0' + m;
                // }else{
                //     month = m;
                // }
                // const zdate = `${year}-${month}-${day}`;
                console.log(zdate);
                $(`#preqtasklist_${value.docid}`).children('.preqtasklist-widget-title').children(`.preqtasklist-widget-dates-${selLinkStage}`).val(zdate).css('background-color', 'red');
            });

        }

        if(predsGate){
            const predobj = ACCUSER.getProject(projectid).ScheduleDocument.getObjByDocId(vv.docid).predecessor.list;
            

            // console.log('ASKLJDGHOILUASHDIUSADHG', predobj);
            selStage = predobj[0].stage;
            let dArr = [];
            $.each(predobj, function(key, value){
                const dddd = ACCUSER.getProject(projectid).ScheduleDocument.getObjByDocId(value.preddocid).getData();
                // console.log('DDDDDDDDDDD', dddd[selStage], selStage);
                const preddate = new Date(`${dddd[selStage]} 00:00:00`);
                dArr.push({
                    "date" : preddate
                });
            });
            const nl = dArr.sort(function(a, b) {
                const aa = a.date;
                const bb = b.date;
                return aa < bb ? 1 : -1;
            });
            // console.log('PREDEDDDDD', nl[0]);

            const x = $(`#preqtasklist_${value.docid}`).children('.preqtasklist-widget-title').children(`.preqtasklist-widget-dates-${selStage}`)[0].previousElementSibling;
            // console.log('KLASJDHKLJHASDHJKLSADHJKLHJKLHKJKHJHKJKHJHJKL', x);
            
            // console.log($(x).val(), nl[0].date);
            let xdate = new Date(`${$(x).val()} 00:00:00`);
            let ydate = nl[0].date;
            console.log(xdate, ydate);

            if(ydate.getTime() > xdate.getTime()){
                let zdate = dateFns.format(nl[0].date, "YYYY-MM-DD");
                console.log(zdate);
                $(x).val(zdate).removeClass('editable').addClass('uneditable').css('background-color', 'red');
            }else{
                $(x).removeClass('editable').addClass('uneditable');
            }


            // 
        }


        // $('.preqtasklist-widget-con').append(`
        //     <div id="preqtasklist_${vv.docid}" sd="${vv.draftsd}" ed="${ed}" class="preqtasklist-widget color-sc">
        //         <div status="closed"  class="preqtasklist-widget-title">
        //             <i status="bars" class="fas fa-bars handle preqtasklist-widget-addtask"></i>
        //             ${titlehtml}
        //             <input class="preqtasklist-widget-dates-draftsd editable first" value="${vv.draftsd}" type="date" disabled>
        //             <input class="preqtasklist-widget-dates-drafted editable" value="${vv.drafted}" type="date" disabled>
        //             <input class="preqtasklist-widget-dates-reviewed editable" value="${vv.reviewed}" type="date" disabled>
        //             <input class="preqtasklist-widget-dates-approvaled editable" value="${vv.approvaled}" type="date" disabled>
        //             <input class="preqtasklist-widget-dates-executioned editable" value="${vv.executioned}" type="date" disabled>
        //             <input class="preqtasklist-widget-dates-postapprovaled editable" value="${vv.postapprovaled}" type="date" disabled>
        //         </div>

        //     </div>
        // `);



    });
}
function fillPreqTasklist(projectid){
    const sender = $('#request-createtool-required-requestid').attr('sender');
    const list = ACCUSER.getProject(projectid).ScheduleDocument.getList();
    console.log("MATANE!!", list);

    
    $('.preqtasklist-widget-con').empty();
    $.each(list, function(key, value){
        const vv = value.getData();
        let ed = '';
        if(vv.postapprovaled == "" || vv.postapprovaled == undefined || vv.postapprovaled == null){
            ed = vv.approvaled;
        }else{
            ed = vv.postapprovaled;
        }
        let milestonestatus = vv.milestone == "true" || vv.milestone == true ? `<i class="fas fa-star ${sender != "creator" ? "" : `preqtasklist-widget-title-milestone`} active" status="active"></i>` : `<i class="far fa-star ${sender != "creator" ? "" : `preqtasklist-widget-title-milestone`} idle" status="idle"></i>`;
        let titlehtml = sender == "viewer" ? `<span for="scales">${milestonestatus}${vv.title}</span>` : 
        `<span for="scales"><input type="checkbox" name="schedulehandler" class="preqtasklist-widget-title-documenthandler">${milestonestatus}${vv.title}</span>`;

        $('.preqtasklist-widget-con').append(`
            <div id="preqtasklist_${vv.docid}" sd="${vv.draftsd}" ed="${ed}" class="preqtasklist-widget color-sc">
                <div status="closed"  class="preqtasklist-widget-title">
                    <i status="bars" class="fas fa-bars handle preqtasklist-widget-addtask"></i>
                    ${titlehtml}
                    <input class="preqtasklist-widget-dates-draftsd editable first" value="${vv.draftsd}" type="date" disabled>
                    <input class="preqtasklist-widget-dates-drafted editable" value="${vv.drafted}" type="date" disabled>
                    <input class="preqtasklist-widget-dates-reviewed editable" value="${vv.reviewed}" type="date" disabled>
                    <input class="preqtasklist-widget-dates-approvaled editable" value="${vv.approvaled}" type="date" disabled>
                    <input class="preqtasklist-widget-dates-executioned editable" value="${vv.executioned}" type="date" disabled>
                    <input class="preqtasklist-widget-dates-postapprovaled editable" value="${vv.postapprovaled}" type="date" disabled>
                </div>

            </div>
        `);
    });

    $('.preqtasklist-widget-con').append(`
        <div id="preqtasklist_nst" class="preqtasklist-widget color-sc">
            <div status="closed" class="preqtasklist-widget-title">
                <i status="bars" class="fas fa-bars handle preqtasklist-widget-addtask"></i>
                <span>Non Specified Task</span>
            </div>
        </div>
    `);

    initializeLinkAndPreds(projectid);
    $('.handler-icon.fa-edit').css("display", "none").hide();
    $('.handler-icon.fa-link').css("display", "none").hide();
    $('.handler-icon.fa-paperclip').css("display", "none").hide();
    $('.handler-icon.fa-trash').css("display", "none").hide();
}
function showPreqBoardIcons(){
    let counter = 0;
    $('.preqtasklist-widget-con').children('.preqtasklist-widget').each(function(){
        let cb = $(this).children('.preqtasklist-widget-title').children('span').children('input');
        if(cb.is(':checked')){
            counter++;
        }
    });
    console.log("counter: ", counter);
    if(counter == 1){
        $('.fa-edit.handler-icon').css("display", "flex").show();
        $('.handler-icon.fa-link').css("display", "flex").show();
        $('.handler-icon.fa-paperclip').css("display", "flex").show();
        $('.handler-icon.fa-bolt').css("display", "flex").show();
        $('.handler-icon.fa-trash').css("display", "flex").show();
    }else if(counter > 1){
        $('.handler-icon.fa-edit').css("display", "flex").show();
        $('.handler-icon.fa-link').css("display", "none").hide();
        $('.handler-icon.fa-paperclip').css("display", "none").hide();
        $('.handler-icon.fa-bolt').css("display", "flex").show();
        $('.handler-icon.fa-trash').css("display", "flex").show();
    }else if(counter <= 0){
        $('.handler-icon.fa-edit').css("display", "none").hide();
        $('.handler-icon.fa-link').css("display", "none").hide();
        $('.handler-icon.fa-paperclip').css("display", "none").hide();
        $('.handler-icon.fa-bolt').css("display", "none").hide();
        $('.handler-icon.fa-trash').css("display", "none").hide();
    }
}
function fillPreqTaskResource(taskid){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const trlist = ACCUSER.getProject(projectid).TaskResource.getObjByTaskId(taskid);

    $.each(trlist, function(key, value){
        let name = '';
            const accid = value.accid;
            const supplierid = value.supplierid;
            if(accid == 'null' || accid == '' || accid == null || accid == undefined){
                name = value.suppliername;
            }else if(supplierid == 'null' || supplierid == '' || supplierid == null || supplierid == undefined){
                name = `${value.firstname} ${value.lastname}`;
            }

            $('.preqsched-body-prefs-resources-widget-con').append(`
                <span id="${value.id}" class="preqsched-body-prefs-resources-widget btn-shadow preqsched-prefs-widget-item-d">${name}  <i class="fas fa-trash preqsched-body-prefs-resources-widget-delete"></i></span>
            `);
    });
}

    // legend icons events
// $(document).on('click', '.preqsched-body-preqtasklist-legend > .blocking > .handler-icon.fa-link', function(){
//     let planid = '';
//     $('.preqtasklist-widget-con').children('.preqtasklist-widget').each(function(){
//         let cb = $(this).children('.preqtasklist-widget-title').children('span').children('input');
//         if(cb.is(':checked')){
//             const docname = $(this).children('.preqtasklist-widget-title').children('span').text();
//             planid = $(this).attr('id').split('_').pop();
//             $('.preqdocument-link-form-title-documentname').text(docname);
//             console.log(planid, docname);
//             $('.preqdocument-link-con').css('display', 'flex').show();
//         }
//     });

// });
// $(document).on('click', '.preqsched-body-preqtasklist-legend > .blocking > .handler-icon.fa-paperclip', function(){
//     let planid = '';
//     $('.preqtasklist-widget-con').children('.preqtasklist-widget').each(function(){
//         let cb = $(this).children('.preqtasklist-widget-title').children('span').children('input');
//         if(cb.is(':checked')){
//             const docname = $(this).children('.preqtasklist-widget-title').children('span').text();
//             planid = $(this).attr('id').split('_').pop();
//             $('.preqdocument-preds-form-title-documentname').text(docname);
//             console.log(planid, docname);
//             $('.preqdocument-preds-con').css('display', 'flex').show();
//         }
//     });
// });
$(document).on('click', '.preqsched-body-preqtasklist-legend > .blocking > .handler-icon.fa-edit', function(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    console.log(projectid);

    $('.handler-icon.fa-link').css("display", "none").hide();
    $('.handler-icon.fa-paperclip').css("display", "none").hide();

    $(this).removeClass('fa-edit').addClass('fa-save').attr('msg','Save').css('background-color', MAIN_COLOR);
    $('.preqtasklist-widget-con').children('.preqtasklist-widget').each(function(){
        let cb = $(this).children('.preqtasklist-widget-title').children('span').children('input');
        if(cb.is(':checked')){
            $(this).children('.preqtasklist-widget-title').children('input.editable').prop('disabled', false).css('border-left', '1px solid ' + SUB_COLOR);
        }
    });
});
$(document).on('click', '.preqsched-body-preqtasklist-legend > .blocking > .handler-icon.fa-save', function(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    console.log(projectid);

    $(this).removeClass('fa-save').addClass('fa-edit').attr('msg','Edit').css('background-color', BTN_COLOR);
    $('.preqtasklist-widget-con').children('.preqtasklist-widget').each(function(){
        const docid = $(this).attr('id').split('_').pop();
        const cb = $(this).children('.preqtasklist-widget-title').children('span').children('input');
        const draftsd = $(this).children('.preqtasklist-widget-title').children('.preqtasklist-widget-dates-draftsd').val();
        const drafted = $(this).children('.preqtasklist-widget-title').children('.preqtasklist-widget-dates-drafted').val();
        const reviewed = $(this).children('.preqtasklist-widget-title').children('.preqtasklist-widget-dates-reviewed').val();
        const approvaled = $(this).children('.preqtasklist-widget-title').children('.preqtasklist-widget-dates-approvaled').val();
        const executioned = $(this).children('.preqtasklist-widget-title').children('.preqtasklist-widget-dates-executioned').val();
        const postapprovaled = $(this).children('.preqtasklist-widget-title').children('.preqtasklist-widget-dates-postapprovaled').val();

        if(cb.is(':checked')){
            const obj = {
                'docid' : docid,
                'draftsd' : draftsd,
                'drafted' : drafted,
                'reviewed' : reviewed,
                'approvaled' : approvaled,
                'executioned' : executioned,
                'postapprovaled' : postapprovaled
            };
            // console.log(obj);
            const callback=()=>{
                $(this).children('.preqtasklist-widget-title').children('input.editable').prop('disabled', true).css('border-left', '1px solid white');
                cb.prop('checked', false);
                $('.handler-icon.fa-edit').css("display", "none").hide();
                $('.handler-icon.fa-link').css("display", "none").hide();
                $('.handler-icon.fa-paperclip').css("display", "none").hide();
                $('.handler-icon.fa-trash').css("display", "none").hide();
            }
            ACCUSER.getProject(projectid).ScheduleDocument.update(obj, callback);
        }
    });
});
$(document).on('click', '.preqsched-body-preqtasklist-legend > .blocking > .handler-icon.fa-plus', function(){
    $('.preqsched-add-con').css('display', 'flex').show();
});
$(document).on('click', '.preqsched-body-preqtasklist-legend > .blocking > .handler-icon.fa-trash', function(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const cbok=()=>{
        $('.preqtasklist-widget-con').children('.preqtasklist-widget').each(function(){
            let docid = $(this).attr('id').split('_').pop();
            let cb = $(this).children('.preqtasklist-widget-title').children('span').children('input');
            if(cb.is(':checked')){
                // $(this).children('.preqtasklist-widget-title').children('input.editable').prop('disabled', false).css('border-left', '1px solid ' + SUB_COLOR);
                const callback=()=>{
                    fillPreqTasklist(projectid);
                }
                ACCUSER.getProject(projectid).ScheduleDocument.delete({"docid" : docid}, callback);
            }
        });
    };
    const cberror=()=>{
        console.log('cancelled');
    };
    showValidate(cbok, cberror);
    console.log('cancelled');
});

    // preqsched-add-con - static events
$('.preqsched-add-con').click(function(e){
    console.log('adding!');
    if(e.target != this){
        return;
    }else{
        $(this).css("display","none").hide();
    }
});
$('#preqsched-add-form-cancel').click(function(){
    $('.preqsched-add-con').css("display","none").hide();
});
    
        // preqsched-add-con - save event
$('#preqsched-add-form-save').click(function(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const draftsd = $('#preqsched-add-form-draftsd').val();
    const drafted = $('#preqsched-add-form-drafted').val();
    const reviewed = $('#preqsched-add-form-reviewed').val();
    const approvaled = $('#preqsched-add-form-approvaled').val();
    const executioned = $('#preqsched-add-form-executioned').val();
    const postapprovaled = $('#preqsched-add-form-postapprovaled').val();
    const title = $('#preqsched-add-form-title').val();
    let createGate = true;

    if(draftsd == ""){
        blinkbg($('#preqsched-add-form-draftsd'), RED_PALETTE, "white");
        createGate = false;
    }
    if(drafted == ""){
        blinkbg($('#preqsched-add-form-drafted'), RED_PALETTE, "white");
        createGate = false;
    }
    if(reviewed == ""){
        blinkbg($('#preqsched-add-form-reviewed'), RED_PALETTE, "white");
        createGate = false;
    }
    if(approvaled == ""){
        blinkbg($('#preqsched-add-form-approvaled'), RED_PALETTE, "white");
        createGate = false;
    }
    if(title == ""){
        blinkbg($('#preqsched-add-form-title'), RED_PALETTE, "white");
        createGate = false;
    }

    if(createGate){
        const obj = {
            'docid' : rngPlanningDocumentId(),
            'projectid' : projectid,
            'title' : title,
            'approvaled' : approvaled,
            'draftsd' : draftsd,
            'drafted' : drafted,
            'reviewed' : reviewed,
            'executioned' : executioned,
            'postapprovaled' : postapprovaled
        };
        console.log(obj);

        const callback=()=>{
            fillPreqTasklist(projectid);
            $('.preqsched-add-con').css("display","none").hide();
        }
        ACCUSER.getProject(obj.projectid).ScheduleDocument.create(obj, callback)
    }

});
    
    // tasklist checkbox event
$(document).on('change', '.preqtasklist-widget-title-documenthandler', function(){
    console.log("on change");
    const editcon = $('#preqsched-body-preqtasklist-legend-edit');

    if(editcon.hasClass('fa-save')){
        $(this).prop("checked", true);
    }else{
        
        showPreqBoardIcons();
    }

});

    // Document Main Events
$(document).on('click', '.preqtasklist-widget-title > span', function(e){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const sender = $('#request-createtool-required-requestid').attr('sender');
    const main = $(this).parent('.preqtasklist-widget-title').parent('.preqtasklist-widget');
    const planid = main.attr('id').split('_').pop();
    console.log(planid);
    $('.preqsched-body-prefs-resources').hide();

    if(e.target.tagName == "I"){
        // console.log('I');
        return;
    }else if(e.target.tagName == "INPUT"){
        // console.log('INPUT');
        return;
    }else if(e.target.tagName == "SPAN"){
        // console.log('SPAN');
    }

    if($(this).parent('.preqtasklist-widget-title').attr('status') == 'closed'){
        // apend the tasks
        if(sender != "viewer"){
            $(this).siblings('i').removeClass('fa-bars').addClass('fa-plus').attr('status', 'plus');
        }else{
            $(this).siblings('i').attr('status', 'bars');
        }
        $(this).parent('.preqtasklist-widget-title').attr('status','open');
        $(this).siblings('input').css('display', 'none');
        $(this).siblings('.handler-icon').css('display', 'none');
        $(this).siblings('span').css({
                'text-overflow': 'initial',
                'overflow': 'initial',
                'background-color': SUB_COLOR,
                'z-index': '100'
            });
     
        setTimeout(() => {
            fillPreqTasks(projectid, planid);
        }, 0);

    }else if($(this).parent('.preqtasklist-widget-title').attr('status') == 'open'){
        // remove the tasks
        $(this).parent('.preqtasklist-widget-title').attr('status','closed');
        $(this).siblings('i').removeClass('fa-plus').addClass('fa-bars').attr('status', 'bars');
        // $(this).siblings('.preqtasklist-widget-addtask').hide();
        main.children('.preqtasklist-widget-task').remove();

        $(this).siblings('input').css('display', 'block');
        $(this).siblings('.handler-icon').css('display', 'block');
        $(this).siblings('span').css({
            'text-overflow': 'ellipsis',
            'overflow': 'hidden',
            'background-color': 'initial',
            'z-index': 'initial'
        });
    }
});
$(document).on('mouseover', '.preqtasklist-widget-title > span', function(e){
    $(this).siblings('input').hide();
    $(this).siblings('.handler-icon').hide();
    $(this).siblings('span').css({
        'text-overflow': 'initial',
        'overflow': 'initial',
        'background-color': SUB_COLOR,
        'z-index': '100'
    });
});
$(document).on('mouseout', '.preqtasklist-widget-title > span', function(){
    if($(this).parent('.preqtasklist-widget-title').attr('status') == 'closed'){
        $(this).siblings('input').show();
        $(this).siblings('.handler-icon').show();
        $(this).siblings('span').css({
            'text-overflow': 'ellipsis',
            'overflow': 'hidden',
            'background-color': 'initial',
            'z-index': 'initial'
        });
    }
});
$(document).on('click', '.preqtasklist-widget-addtask', function(){  // OK
        const docid = $(this).parent('.preqtasklist-widget-title').parent('.preqtasklist-widget').attr('id').split('_').pop();
        const taskid = rngTaskId();
        const projectid = $('#request-createtool-required-requestid').attr("prid");
        const sd = $(this).parent('.preqtasklist-widget-title').parent('.preqtasklist-widget').attr('sd');
        const ed = $(this).parent('.preqtasklist-widget-title').parent('.preqtasklist-widget').attr('ed');
    
        console.log(projectid);
    
        const status = $(this).attr('status');
    
        // <i class="fas fa-user-plus preqtasklist-widget-icon-resources"></i>
        if(status == 'plus'){
            $(`#preqtasklist_${docid}`).append(`
                <div id="${taskid}" planid="${docid}" projectid="${projectid}" class="preqtasklist-widget-task">
                    <input type="text" class="preqtasklist-widget-preqsched-name-i" placeholder="Please Enter TaskName">
                    <span class="preqtasklist-widget-preqsched-name-s"></span>
                    <input class="preqtasklist-widget-date-start" max="${ed}" min="${sd}" value="${sd}" type="date">
                    <input class="preqtasklist-widget-date-end" max="${ed}" min="${sd}" value="${ed}" type="date">
                    <i class="fas fa-user-plus"></i>
                    <i status="save" class="fas fa-save preqtasklist-widget-icon-edit"></i>
                    <i class="fas fa-trash preqtasklist-widget-icon-delete"></i>
                </div>
            `);
            $(`#${taskid}`).children('.preqtasklist-widget-preqsched-name-i').show();
            $(`#${taskid}`).children('.preqtasklist-widget-preqsched-name-s').hide();
            blinkbg($(`#${taskid}`).children('.preqtasklist-widget-icon-edit'), GREEN_PALETTE, 'transparent');
        }else{
            $(this).siblings('span').click();
        }
    });
$(document).on('click', '.preqtasklist-widget-title-milestone', function(){  // OK
    const projectid = $('#request-createtool-required-requestid').attr("prid");
    const status = $(this).attr('status');
    const planid = $(this).parent('span').parent('.preqtasklist-widget-title').parent('.preqtasklist-widget').attr('id').split('_').pop();

    console.log( planid);
    if(status == 'idle'){
        const callback=()=>{
            $(this).removeClass('far').addClass('fas').attr('status', 'active');
            $(this).removeClass('idle').addClass('active');
        }
        ACCUSER.getProject(projectid).ScheduleDocument.getObjByDocId(planid).updateMilestone(callback);
    }else{
        const callback=()=>{
            $(this).removeClass('fas').addClass('far').attr('status', 'idle');
            $(this).removeClass('active').addClass('idle');
        }
        ACCUSER.getProject(projectid).ScheduleDocument.getObjByDocId(planid).deleteMilestone(callback);
    }
});


    // preqtasklist Icon Events
$(document).on('click', '.preqtasklist-widget-icon-edit', function(){ // OK
    const main = $(this).parent('.preqtasklist-widget-task');
    const planid = main.attr('planid');
    const projectid = main.attr('projectid');
    const taskid = main.attr('id');
    const taskname = main.children('.preqtasklist-widget-preqsched-name-i').val();
    const startdate = $(this).siblings('.preqtasklist-widget-date-start').val();
    const enddate = $(this).siblings('.preqtasklist-widget-date-end').val();
    
    // console.log(planid, projectid, taskid, taskname, startdate, enddate);
    if($(this).attr('status') == 'save'){
        // save the record
        const callback =()=> {
            $(this).attr('status','edit');
            $(this).siblings('.preqtasklist-widget-date-start').prop('disabled', true);
            $(this).siblings('.preqtasklist-widget-date-end').prop('disabled', true);
            main.children('.preqtasklist-widget-preqsched-name-i').hide();
            main.children('.preqtasklist-widget-preqsched-name-s').text(taskname).show();
            $(this).removeClass('fa-save').addClass('fa-edit');
            $(this).siblings('.fa-user-plus').addClass('preqtasklist-widget-icon-resources');
            fillPreqTasks(projectid, planid);
        };

        const obj = {
            'taskid' : taskid,
            'projectid' : projectid,
            'planid' : planid,
            'taskname' : taskname,
            'startdate' : startdate,
            'enddate' : enddate
        }
        console.log(obj);
        // api_createTask(taskid, projectid, planid, taskname, startdate, enddate, cbsuccess);
        ACCUSER.getProject(projectid).Task.create(obj, callback);

    }else if($(this).attr('status') == 'edit'){
        $(this).attr('status','save');
        // enable editing
        $(this).siblings('.preqtasklist-widget-date-start').prop('disabled', false);
        $(this).siblings('.preqtasklist-widget-date-end').prop('disabled', false);
        main.children('.preqtasklist-widget-preqsched-name-i').show();
        main.children('.preqtasklist-widget-preqsched-name-s').hide();
        $(this).removeClass('fa-edit').addClass('fa-save');

    }

});
$(document).on('click', '.preqtasklist-widget-icon-delete', function(){ 
    const taskid = $(this).parent('.preqtasklist-widget-task').attr('id');
    const projectid = $(this).parent('.preqtasklist-widget-task').attr('projectid');
    const planid = $(this).parent('.preqtasklist-widget-task').attr('planid');
    console.log(taskid);
    const cbtrue = () => {
        const callback=()=>{
            fillPreqTasks(projectid, planid);
        }
        ACCUSER.getProject(projectid).Task.delete({"taskid" : taskid}, callback);
    };
    const cbfalse = () => console.log('Cancelled Delete');
    showAction('All Resources attached to this Task will also be deleted. Do you still wish to proceed?', cbtrue, cbfalse);
});
$(document).on('click', '.preqtasklist-widget-icon-resources', function(){ 
    const sender = $('#request-createtool-required-requestid').attr('sender');
    const taskid = $(this).parent('.preqtasklist-widget-task').attr('id');
    const taskname = $(this).siblings('.preqtasklist-widget-preqsched-name-s')
        .clone()    //clone the element
        .children() //select all the children
        .remove()   //remove all the children
        .end()  //again go back to selected element
        .text();
    const planid =  $(this).parent('.preqtasklist-widget-task').parent('.preqtasklist-widget').attr('id').split('_').pop();
    $('.preqsched-resources-con').attr({"taskid" : taskid, "planid" : planid}).css('display', 'flex').show();
    fillPreqTaskResourceFormConnectList(taskid, planid);
    if(sender == "viewer"){
        $('.preqsched-resources-form-type-con').hide();
    }else{
        $('.preqsched-resources-form-type-con').show();
    }
});

    // preqsched-resources-con > add tmp resource events
$('#preqsched-resources-form-add-tmpaccount').click(function(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const name = $(this).siblings('input').val();
    const obj = {
        "id" : rngTmpAccountId(),
        "projectid" : projectid,
        "name" : name
    }
    const callback =()=>{
        ACCUSER.getProject(projectid).fillSelectTagWithTmpAccount($('#preqsched-resources-form-type-hours-select'));
    }
    ACCUSER.getProject(projectid).createTmpAccount(obj, callback);
});
$('#preqsched-resources-form-add-tmpsupplier').click(function(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const name = $(this).siblings('input').val();
    const obj = {
        "id" : rngTmpSupplierId(),
        "projectid" : projectid,
        "name" : name
    }
    const callback =()=>{
        ACCUSER.getProject(projectid).fillSelectTagWithTmpSupplier($('#preqsched-resources-form-type-supplier-select'));
    }
    ACCUSER.getProject(projectid).createTmpSupplier(obj, callback);
});
$('#preqsched-resources-form-add-tmptm').click(function(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const name = $(this).siblings('input').val();
    const obj = {
        "id" : rngTmpSupplierId(),
        "projectid" : projectid,
        "name" : name
    }
    const callback =()=>{
        ACCUSER.getProject(projectid).fillSelectTagWithTmpSupplier($('#preqsched-resources-form-type-tm-select'));
    }
    ACCUSER.getProject(projectid).createTmpSupplier(obj, callback);
});

    // preqsched-resources-con > events
$('.preqsched-resources-form-type-handle').click(function(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const id = $(this).attr('id').split('-').pop();
    selType = id;
    $('.preqsched-resources-form-type-container').hide();
    $(`.preqsched-resources-form-type-${id}`).css('display','flex').show();

    if(id == 'hours'){
        // $('#preqsched-resources-form-type-hours-select').empty();
        ACCUSER.getProject(projectid).fillSelectTagWithTmpAccount($('#preqsched-resources-form-type-hours-select'));
    }else if(id == 'supplier'){
        // $('#preqsched-resources-form-type-supplier-select').empty();
        ACCUSER.getProject(projectid).fillSelectTagWithTmpSupplier($('#preqsched-resources-form-type-supplier-select'));
    }else if(id == 'tm'){
        // $('#preqsched-resources-form-type-tm-select').empty();
        ACCUSER.getProject(projectid).fillSelectTagWithTmpSupplier($('#preqsched-resources-form-type-tm-select'));
    }

});
$('.preqsched-resources-form-type-submit').click(function(){
    const w = $(this);
    const trid = rngTaskResourceId();
    const taskid = $('.preqsched-resources-con').attr('taskid');
    let type = '';
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const planid = $('.preqsched-resources-con').attr('planid');
    let supplierid = '';
    let accid = '';
    let hours = '';
    let fname = '';
    let lname = '';
    let sname = '';


    if($(this).hasClass('hours')){
        type = 'hours';
        const x = parseFloat($('#preqsched-resources-form-type-hours-input').val());
        accid = $('#preqsched-resources-form-type-hours-select').val();
        const name = $('#preqsched-resources-form-type-hours-select option:selected').text();
        fname = name;
        lname = '';
        sname = 'na';
        // console.log('fname', fname, 'lname', lname, 'sname', sname);

        if(x != ''){
            if(isNaN(x)){
                blinkbg($('#preqsched-resources-form-type-hours-input'), RED_PALETTE, 'white');
                $('#preqsched-resources-form-type-hours-input').val('');
                return;
            }else{
                hours = x;
            }
        }

    }else if($(this).hasClass('supplier')){
        type = 'supplier';
        const spl = $('#preqsched-resources-form-type-supplier-select').val();
        const name = $('#preqsched-resources-form-type-supplier-select option:selected').text();
        if(spl == 'null' || spl == '' || spl == null || spl == undefined){
            blinkbg($('#preqsched-resources-form-type-supplier-select'), RED_PALETTE, 'white');
            blinkbg($('#preqsched-resources-form-type-supplier-input'), GREEN_PALETTE, 'white');
            return;
        }else{
            supplierid = spl;
            sname = name; 
            fname = 'na';
            lname = 'na';
        }
    }else if($(this).hasClass('tm')){
        type = 'tm';
        const spl = $('#preqsched-resources-form-type-tm-select').val();
        const name = $('#preqsched-resources-form-type-tm-select option:selected').text();
        if(spl == 'null' || spl == '' || spl == null || spl == undefined){
            blinkbg($('#preqsched-resources-form-type-tm-select'), RED_PALETTE, 'white');
            blinkbg($('#preqsched-resources-form-type-tm-input'), GREEN_PALETTE, 'white');
            return;
        }else{
            supplierid = spl;
            sname = name; 
            fname = 'na';
            lname = 'na';
        }

        const y = $('#preqsched-resources-form-type-tm-maxhours').val();
        if(y != ''){
            if(Number.isInteger(parseInt(y))){
                const x = parseInt(y);
                hours = x;
            }else{
                blinkbg($('#preqsched-resources-form-type-tm-maxhours'), RED_PALETTE, 'white');
                $('#preqsched-resources-form-type-tm-maxhours').val('');
                return;
            }
        }
    }

 
    if(hours == ''){
        hours = 0;
    }
    const params = {
        'trid' : trid,
        'taskid' : taskid,
        'type' : type,
        'projectid' : projectid,
        'planid' : planid,
        'supplierid' : supplierid,
        'accid' : accid,
        'hours' : hours,
        'firstname' : fname,
        'lastname' : lname,
        'suppliername' : sname
    };

    console.log(params);
    const callback=()=>{
        let name = '';
        if(sname == 'na'){
            name = fname; 
        }else{
            name = sname;
        }

        let xxx = '';
        if(type != "supplier"){
            xxx = `<input type="text" placeholder="hours" value="${hours}" disabled>
            <i status="edit" class="fas fa-edit preqsched-resources-form-connect-list-widget-edit"></i>`;
        }


        $('.preqsched-resources-form-connect-list').append(`
            <span rid="${trid}" class="preqsched-resources-form-connect-list-widget color-sc">${name}
                <div>
                    ${xxx}
                    <i class="fas fa-trash preqsched-resources-form-connect-list-widget-delete"></i>
                </div>
            </span>
        `);


    };

    ACCUSER.getProject(projectid).TaskResource.create(params, callback);
    fillPreqTaskResourceFormConnectList(taskid, planid);
    fillPreqTasks(projectid, planid);

    // console.log('KARDASIAN!!!!! ', id, taskid, type, projectid, supplierid, accid, hours, planid);
    
    // api_createTaskResource(id, taskid, type, projectid, supplierid, accid, hours, planid, cbsuccess1);

    // let th = 0;
    // $('.preqsched-resources-form-connect-list').children('.preqsched-resources-form-connect-list-widget').each(function(){
    //     let x = $(this).children('div').children('input').val();
    //     if(isNaN(x) || x == undefined || x == null){
    //         x = 0;
    //     }
    //     th += parseFloat(x);
    // });
    // $('.preqsched-resources-form-totalhours').text(th);

});
$('.preqsched-resources-con').click(function(e){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const taskid = $('.preqsched-resources-con').attr('taskid');
    const planid = $('.preqsched-resources-con').attr('planid');
        if(this != e.target){
            return;
        }else{
            $(this).hide();
            $(`#preqtasklist_${selPlanId}`).children('.preqtasklist-widget-task').remove();
            fillPreqTaskResource(taskid);
            fillPreqTasks(projectid, planid);
        }
    });

    // Task Resource Events
$(document).on('click', '.preqsched-resources-form-connect-list-widget-edit', function(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const planid = $('.preqsched-resources-con').attr("planid");
    const status = $(this).attr('status');
    const trid = $(this).parent('div').parent('.preqsched-resources-form-connect-list-widget').attr('rid');
    const taskid = $(this).parent('div').parent('.preqsched-resources-form-connect-list-widget').attr('tid');

    if(status == 'edit'){
        $(this).attr('status', 'save');
        $(this).removeClass('fa-edit').addClass('fa-save');
        $(this).siblings('input').prop('disabled', false);
    }else if(status == 'save'){
        const hour = parseFloat($(this).siblings('input').val());
        let tHours = 0;
        if(isNaN(hour)){
            console.log('string', hour);
            blinkbg($(this).siblings('input'), RED_PALETTE, 'white');
            return;
        }else{

            const callback=()=>{
                let th = 0;
                $('.preqsched-resources-form-connect-list').children('.preqsched-resources-form-connect-list-widget').each(function(){
                    let x = $(this).children('div').children('input').val();
                    if(isNaN(x)){
                        x = 0;
                    }
                    th += parseFloat(x);
                });
                $('.preqsched-resources-form-totalhours').text(th);
                fillPreqTasks(projectid, planid);
            }
            const options = {
                'trid' : trid,
                'columnname' : 'hours',
                'value' : hour
            };
            ACCUSER.getProject(projectid).TaskResource.updateColumn(options, callback);


            
        }

        $(this).attr('status', 'edit');
        $(this).removeClass('fa-save').addClass('fa-edit');
        $(this).siblings('input').prop('disabled', true);
    }
});
$(document).on('click', '.preqsched-resources-form-connect-list-widget-delete', function(){
    const projectid = $('#request-createtool-required-requestid').attr('prid');
    const planid = $('.preqsched-resources-con').attr("planid");
    const rid = $(this).parent('div').parent('.preqsched-resources-form-connect-list-widget').attr('rid');
    const callback=()=>{
        $(this).parent('div').parent('.preqsched-resources-form-connect-list-widget').remove();
        // const data = $.grep(taskResouceList, function(e){ 
        //     return e.id != rid; 
        // });
        // taskResouceList = data;

        let th = 0;
        $('.preqsched-resources-form-connect-list').children('.preqsched-resources-form-connect-list-widget').each(function(){
            let x = $(this).children('div').children('input').val();
            if(isNaN(x)){
                x = 0;
            }
            th += parseFloat(x);
        });
        $('.preqsched-resources-form-totalhours').text(th);
        fillPreqTasks(projectid, planid);
    };
    // api_deleteTaskResource(rid, cbsuccess);

    ACCUSER.getProject(projectid).TaskResource.delete({"id" : rid}, callback);
});
    
$('.preqdocument-link-con').click(function(e){
    if(e.target != this){
        return;
    }else{
        $(this).toggle();
    }
});
$('.preqdocument-preds-con').click(function(e){
    if(e.target != this){
        return;
    }else{
        $(this).toggle();
    }
});

    // Task Header Events
$('.preqsched-mods-widget').click(function(){
    const id = $(this).children('span').attr('id');
    if(id.includes('refresh')){
        $('#preqsched-header-search-submit').click();
    }
    if(id.includes('exit')){
        $('.preqsched-con').hide();
        $('.dashboard-con').show();
    }
    if(id.includes('dashboard')){
        $('#nav-dashboard').click();
    }
});
    
    












// ///////// NOEL CODE END////////////////










































































function printPageArea(content){
    console.log("printing");
    // var printContentlegend = document.querySelector('.fintrack-legend');
    var win = window.open('', '', 'width=1200 ,height=980');
    win.document.write(`<html><head> 
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pro Flow</title>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.13.0/css/all.css">
        <link href="${domain}lib/css/default.css" rel="stylesheet" /> 
        <link href="${domain}lib/css/project_launch.css" rel="stylesheet" /> 
        <link href="${domain}lib/css/project_page1.css" rel="stylesheet" />
        <link href="${domain}lib/css/project_page2.css" rel="stylesheet" />
        <link href="${domain}lib/css/project.css" rel="stylesheet" /> 
        <link href="${domain}lib/css/docuchat.css" rel="stylesheet" /> 
        </head> <body style="font-size: 0.8em; height: auto; "> `);

        
    win.document.write(content);
    win.document.write('</body></html>');

    // $(win.document).children('html').children('body').children('.resource-body-accountlist').css({'max-height' : 'initial', "height" : "auto"});
    // $(win.document).children('html').children('body').children('.resource-body-accountlist').children('.resource-body-accountlist-widget').children('.step.tasklist').css({'display' : 'flex'}).show();
   
    // console.log(win.document);

    setTimeout(() => {
        win.print();
        win.close();
    }, 1500);
}
function printPMTaskboard(){
    console.log("printing printPMTaskboard");
    // var printContentlegend = document.querySelector('.fintrack-legend');
    var win = window.open('', '', 'width=1200 ,height=980');
    let body = $('.taskboard-body').html();
    let header = $('.taskboard-header').html();
    let content = `
    <div class="taskboard-header">${header}</div>
    <div class="taskboard-body">${body}</div>`;

    win.document.write(`<html><head> 
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Project Manager's Taskboard</title>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.13.0/css/all.css">
        <link href="${domain}lib/css/default.css" rel="stylesheet" /> 
        <link href="${domain}lib/css/project_launch.css" rel="stylesheet" /> 
        <link href="${domain}lib/css/project_page1.css" rel="stylesheet" />
        <link href="${domain}lib/css/project_page2.css" rel="stylesheet" />
        <link href="${domain}lib/css/project.css" rel="stylesheet" /> 
        <link href="${domain}lib/css/docuchat.css" rel="stylesheet" /> 
        </head> <body style="font-size: 0.8em; height: auto; "> `);

        
    win.document.write(content);
    win.document.write('</body></html>');

    $(win.document).children('html').children('body').children('.taskboard-body').children('.taskboard-body-widget-con').children('.taskboard-body-widget-container').css({'background-color' : 'transparent', 'border' : "thin solid grey", 'border-top' : "none"});
    $(win.document).children('html').children('body').children('.taskboard-body').children('.taskboard-body-widget-con').children('.taskboard-body-widget-container').children('.taskboard-body-widget').removeClass('shadow');
    $(win.document).children('html').children('body').children('.taskboard-header').children('.taskboard-panel').children('.taskboard-mods').remove();
    $(win.document).children('html').children('body').children('.taskboard-header').children('.taskboard-panel').children('.taskboard-navigation').children('button').remove();
    $(win.document).children('html').children('body').children('.taskboard-header').children('.taskboard-panel').children('.taskboard-navigation').css({"justify-content" : "flex-start"});

    // console.log(win.document);

    setTimeout(() => {
        win.print();
        win.close();
    }, 1500);
}
function printStatusboard(){
    console.log("printing printStatusboard");
    // var printContentlegend = document.querySelector('.fintrack-legend');
    var win = window.open('', '', 'width=1200 ,height=980');
    
    let body = $('.status-body').html();
    let header = $('.status-header').html();
    let content = `
    <div class="status-header">${header}</div>
    <div class="status-body">${body}</div>`;

    win.document.write(`<html><head> 
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Project Manager's Taskboard</title>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.13.0/css/all.css">
        <link href="${domain}lib/css/default.css" rel="stylesheet" /> 
        <link href="${domain}lib/css/project_launch.css" rel="stylesheet" /> 
        <link href="${domain}lib/css/project_page1.css" rel="stylesheet" />
        <link href="${domain}lib/css/project_page2.css" rel="stylesheet" />
        <link href="${domain}lib/css/project.css" rel="stylesheet" /> 
        <link href="${domain}lib/css/docuchat.css" rel="stylesheet" /> 
        </head> <body style="font-size: 0.8em; height: auto; "> `);

        
    win.document.write(content);
    win.document.write('</body></html>');

    $(win.document).children('html').children('body').children('.status-body').children('.status-body-widget-con').children('.status-body-widget-container').css({'background-color' : 'transparent', 'border' : "thin solid grey", 'border-top' : "none"});
    $(win.document).children('html').children('body').children('.status-body').children('.status-body-widget-con').children('.status-body-widget-container').children('.status-body-widget').removeClass('shadow');
    $(win.document).children('html').children('body').children('.status-header').children('.status-panel').children('.status-mods').remove();
    $(win.document).children('html').children('body').children('.status-header').children('.status-panel').children('.status-navigation').children('button').remove();
    $(win.document).children('html').children('body').children('.status-header').children('.status-panel').children('.status-navigation').css({"justify-content" : "flex-start"});

    // console.log(win.document);

    setTimeout(() => {
        win.print();
        win.close();
    }, 1500);
}
function printResourceboard(){
    console.log("printing printStatusboard");
    // var printContentlegend = document.querySelector('.fintrack-legend');
    var win = window.open('', '', 'width=1200 ,height=980');
    const status = $('#resource-navigation-submit').attr('status');

    let body = $('.resource-body').html();
    let header = $('.resource-header').html();
    let calendar = $('.resource-calendar').html();
    let footer = $('.resource-footer').html();
    let content = '';
    if(status == "active"){
        content = `
        <div class="resource-header">${header}</div>
        <div class="resource-calendar">${calendar}</div>`;
    }else{
        content = `
        <div class="resource-header">${header}</div>
        <div class="resource-body">${body}</div>
        <div class="resource-footer color-sc">${footer}</div>`;
    }
    

    win.document.write(`<html><head> 
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Project Manager's Taskboard</title>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.13.0/css/all.css">
        <link href="${domain}lib/css/default.css" rel="stylesheet" /> 
        <link href="${domain}lib/css/project_launch.css" rel="stylesheet" /> 
        <link href="${domain}lib/css/project_page1.css" rel="stylesheet" />
        <link href="${domain}lib/css/project_page2.css" rel="stylesheet" />
        <link href="${domain}lib/css/project.css" rel="stylesheet" /> 
        <link href="${domain}lib/css/docuchat.css" rel="stylesheet" /> 
        </head> <body style="font-size: 0.8em; height: auto; "> `);

        
    win.document.write(content);
    win.document.write('</body></html>');



    $(win.document).children('html').children('body').children('.resource-body').children('.resource-body-accountlist').children('.resource-body-accountlist-widget').css({'background-color' : 'transparent', 'border' : "thin solid grey"});
    $(win.document).children('html').children('body').children('.resource-body').children('.resource-body-accountlist').children('.resource-body-accountlist-widget').children('.tasklist').children('span').css({'color' : 'black', 'border-right' : "thin solid grey", 'border-left' : "thin solid grey"});
    $(win.document).children('html').children('body').children('.resource-body').children('.resource-body-accountlist').children('.resource-body-accountlist-widget').children('.tasklist').css({"display" : "flex"}).show();
    $(win.document).children('html').children('body').children('.resource-body').children('.resource-body-accountlist').children('.resource-body-accountlist-widget').children('.acc').children('span').css({'color' : 'black'});
    $(win.document).children('html').children('body').children('.resource-body').children('.resource-body-accountlist').css({'height' : 'auto', "max-height" : "unset", "overflow-y" : "unset", "overflow" : "unset"});
    $(win.document).children('html').children('body').children('.resource-body').css({'height' : 'auto', "max-height" : "unset", "overflow-y" : "unset", "overflow" : "unset"});
    
    
    $(win.document).children('html').children('body').children('.resource-header').children('.resource-panel').children('.resource-mods').remove();
    $(win.document).children('html').children('body').children('.resource-header').children('.resource-panel').children('.resource-navigation').children('button').remove();
    $(win.document).children('html').children('body').children('.resource-header').children('.resource-panel').children('.resource-navigation').css({"justify-content" : "flex-start"});

    // console.log(win.document);

    setTimeout(() => {
        win.print();
        win.close();
    }, 1500);
}


function sendEmail(dest) {
    // <script src="https://smtpjs.com/v3/smtp.js"></script>
    console.log("Sending Email");
	Email.send({
	Host: "smtp.gmail.com",
	Username : "sampleaccout7@gmail.com",
	Password : "samplepassword",
    // To : 'bjpatel1998@hotmail.com, webmusterr@gmail.com',
    To : dest,
    Cc: dest,
    Bcc: dest,
	From : "sampleaccout7@gmail.com",
	Subject : "Test for Email notification",
    Body : `This is a sample email for testing purpose. 
            <table style="width: auto; height: 450px; background-color: #ede1d2; border-radius: 25px; ">
                <tr>
                    <th style="text-align:center;vertical-align:middle" ><img src="http://development.prodocuflow.com/lib/images/stepwell.png" style="position:relative; max-height:100px; top:10px; left:10px; z-index: 100;" draggable="false"/></th>
                </tr>
                <tr>
                    <th class="text-align:center;vertical-align:middle"><span style="font-size:24px; color: #38220f; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;">Hello <span style="font-weight: bold;">'. random name .'</span></span></th>
                </tr>
                <tr>
                    <th class="text-align:center;vertical-align:middle"><span style="font-size:24px; color: #38220f; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; padding-left: 20px; padding-right: 20px;">Please use this code to verify your email with us</span></th>
                </tr>
                <tr>
                    <th class="text-align:center;vertical-align:middle"><span style="font-size:30px; color: #38220f; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; padding: 10px; background-color: #dbc1ac; border-radius: 15px; padding-left: 30px; letter-spacing: 20px;">'. 45468563541 .'</span></th>
                </tr>
                <tr>
                    <th class="text-align:right;vertical-align:bottom" ><img src="http://development.prodocuflow.com/lib/images/avatardefault.png" style="max-height:100px;" /></th>
                </tr>
            </table>`,
    Attachments : [
        {
            name : "newinvoice.pdf",
            path : "http://development.prodocuflow.com/lib/documents/projectinfo/1597293780.pdf"
        }]
	}).then(
        message => alert("mail sent successfully")
        
    );
    
    console.log("Email Sent");
}




//Active Projects > Launch
$('.preferences-mods-widget').click(function(){
    const id = $(this).children('span').attr('id');
    console.log(id);
    const projectid = $('#preferences-header-projectid').text();
    console.log(projectid);
    if(id.includes('print')){
        console.log('Printing');
    
        $('.createtool-maintitle').each(function(){
            $(this).children('.content').show();
            $(this).children('.content').children('.createtool-subtitle').each(function(){
                $(this).children('.content').show();
            });
        });

        let body = $('.preferences-body').html();
        let content = `<div class="preferences-body">${body}</div>`;

        printPageArea(content);
        
        $('.createtool-maintitle').each(function(){
            $(this).children('.content').hide();
            $(this).children('.content').children('.createtool-subtitle').each(function(){
                $(this).children('.content').hide();
            });
        });

    }
    if(id.includes('refresh')){
        console.log('ActiveProject > Launch > Refresh');
        const cid = $('.preferences-navigation-widget.selected').attr('cid');
        console.log(cid);

        	

        if(cid != undefined){
            showRefreshReport("Refreshing...");
            setTimeout(() => {
                const cb=()=>{
                    ACCUSER.Alert.fill();
                    setTimeout(() => {
                        if(cid.includes('connect')){
                            console.log('ActiveProject > Launch > ProjectConnect > Refresh');
                            const cb =data=>{
                                console.log(data);
                                ACCUSER.getProject(projectid).fillProjectConnect();
                            };
                            ACCUSER.getProject(projectid).checkList('ConnectByProjectId', cb,true);
                        }
                        if(cid.includes('minutes')){
                            console.log('ActiveProject > Launch > ProjectMinutes> Refresh');
                            const cb =data=>{
                                console.log(data);
                                const cb =data=>{
                                    console.log(data);
                                    setTimeout(() => {
                                        cidMinutes();
                                    }, 0);
                                };
                                ACCUSER.checkList('Supplier', cb,true);
                            };
                            ACCUSER.getProject(projectid).checkList('Minutes', cb,true);
                        }
                        if(cid.includes('register')){
                            console.log('ActiveProject > Launch > ProjectRegister > Refresh');
                            const cb =data=>{
                                console.log(data);
                                    ACCUSER.getProject(projectid).Register.fillRegister();
                            };
                            ACCUSER.getProject(projectid).checkList('Register', cb,true);
                        }
                        if(cid.includes('notes')){
                            console.log('ActiveProject > Launch > ProjectNotes > Refresh');
                            const cb =data=>{
                                console.log(data);
                                    ACCUSER.getProject(projectid).Notes.fillNotes();
                            };
                            ACCUSER.getProject(projectid).checkList('Notes', cb,true);
                        }
                        if(cid.includes('docs')){
                            console.log('ActiveProject > Launch > ProjectDocs > Refresh');
                            const cb =data=>{
                                console.log(data);
                                    ACCUSER.getProject(projectid).ActualDocument.fillDocs('.preferences-body-list');
                            };
                            ACCUSER.getProject(projectid).checkList('ActualDocument', cb,true);
                        }
                        if(cid.includes('request')){
                            console.log('ActiveProject > Launch > ProjectRequest > Refresh');
                            const cb =data=>{
                                console.log(data);
                                setTimeout(() => {
                                    fillLaunchTechnical(projectid);
                                }, 0);
                            };
                            ACCUSER.getProject(projectid).checkList('Request', cb,true);
                        }
                    }, 0);
                }
                ACCUSER.checkList('Alert', cb, true);
                setTimeout(() => {
                    hideRefreshReport();
                }, 0);
            }, 0);
        }

    }
    if(id.includes('add-user')){
        console.log('Add User');
        $('.project-launch-add-user').show();
        $('.project-launch-view-content').hide();
    }

});
//Active Projects > Status Board > Reseource
$('.resource-mods-widget').click(function(){
    const id = $(this).children('span').attr('id');
    // console.log(id);
    const projectid = $('#resource-header-projectid').text();
    // console.log(projectid);
    
    if(id.includes('print')){
        // console.log('Printing');

        printResourceboard();
    }

});
//Active Projects > Status Board > Task
$('.taskboard-mods-widget').click(function(){
    const id = $(this).children('span').attr('id');
    // console.log(id);
    const projectid = $('#taskboard-header-projectid').text();
    // console.log(projectid);
    
    if(id.includes('print')){
        // console.log('Printing');
        

        printPMTaskboard();
    }

});
//Active Projects > Status Board > Document
$('.status-mods-widget').click(function(){
    const id = $(this).children('span').attr('id');
    console.log(id);
    const projectid = $('#status-header-projectid').text();
    console.log(projectid);
    
    if(id.includes('print')){
        console.log('Printing');

        // printPageArea(content);
        printStatusboard();
    }

});
//Active Projects > Mapping
$('.map-mods-widget').click(function(){
    const id = $(this).children('span').attr('id');
    console.log(id);
    const projectid = $('#map-header-projectid').text();
    console.log(projectid);

    if(id.includes('refresh')){
        console.log(id);
        // $('#map-header-search-project-submit').click();
        
        
        showRefreshReport("Refreshing...");
        setTimeout(() => {
            const cb=()=>{
                ACCUSER.Alert.fill();
                const callback1 =data=>{
                    console.log(data);
                    const callback2 =data=>{
                        console.log(data);
                        const callback3 =data=>{
                            console.log(data);
                            const callback4 =data=>{
                                console.log(data);
                                const callback =data=>{
                                    console.log(data);
                                    const callback0 =data=>{
                                        console.log(data);
                                        setTimeout(() => {
                                            $('#map-header-search-project-submit').click();
                                        }, 0);
                                        setTimeout(() => {
                                            hideRefreshReport();
                                        }, 0);
                                    };
                                    ACCUSER.getProject(projectid).checkList('ScheduleDocument', callback0,true); 
                                };
                                ACCUSER.getProject(projectid).checkList('ActualDocument', callback,true); 
                            };
                            ACCUSER.checkList('Supplier', callback4,true);
                        };
                        ACCUSER.getProject(projectid).checkList('TmpSupplier', callback3,true);
                    };
                    ACCUSER.getProject(projectid).checkList('TmpAccount', callback2,true);
                };
                ACCUSER.getProject(projectid).checkList('TaskResource', callback1,true); 
            }
            ACCUSER.checkList('Alert', cb, true);
        }, 0);

    }
    if(id.includes('document')){
        console.log(id);
        $('.map-body-document').css('display', 'flex').show();
        $('.map-body-resource').css('display','none').hide();
        $('.map-body-supplier').css('display','none').hide();
    }
    if(id.includes('resource')){
        console.log(id);
        $('.map-body-document').css('display','none').hide();
        $('.map-body-resource').css('display', 'flex').show();
        $('.map-body-supplier').css('display','none').hide();
    }
    if(id.includes('supplier')){
        console.log(id);
        $('.map-body-document').css('display','none').hide();
        $('.map-body-resource').css('display','none').hide();
        $('.map-body-supplier').css('display', 'flex').show();
    }
    if(id.includes('dashboard')){
        console.log(id);
        $('#nav-dashboard').click();
    }
});
//Active Projects > Finance > Budgeting
$('.finbud-mods-widget').click(function(){
    const id = $(this).children('span').attr('id');
    console.log(id);
    const projectid = $('#dashboard-body-projectname').attr('prid');
    console.log(projectid);

    if(id.includes('finbud-mods-refresh')){
        console.log('Refresh');

        showRefreshReport("Refreshing...");
        setTimeout(() => {
            const cb=()=>{
                ACCUSER.Alert.fill();
                const zcb=data=>{
                    console.log(data);
                    const zcb1=data=>{
                        console.log(data);
                        const zcb2=data=>{
                            console.log(data);
                            const zcb3=data=>{
                                console.log(data);
                                const zcb4=data=>{
                                    console.log(data);
                                    const zcb5=data=>{
                                        console.log(data);
                                        const zcb6=data=>{
                                            console.log(data);
                                            const zcb6=data=>{
                                                console.log(data);
                                                const zcb6=data=>{
                                                    console.log(data);
                                                    setTimeout(() => {
                                                        $('#project-view-finance-budgeting').click();
                                                    }, 0);
                                                    setTimeout(() => {
                                                        hideRefreshReport();
                                                    }, 0);
                                                };
                                                ACCUSER.getProject(projectid).checkList('TmpSupplier', zcb6,true);
                                            };
                                            ACCUSER.getProject(projectid).checkList('TmpAccount', zcb6,true);
                                        };
                                        ACCUSER.getProject(projectid).checkList('ConnectByProjectId', zcb6,true);
                                    };
                                    ACCUSER.getProject(projectid).checkList('ConnectByResource', zcb5,true);
                                };
                                ACCUSER.getProject(projectid).checkList('SupplierRate', zcb4,true);
                            };
                            ACCUSER.getProject(projectid).checkList('AccountRate', zcb3,true);
                        };
                        ACCUSER.getProject(projectid).checkList('Timesheet', zcb2,true);
                    };
                    ACCUSER.getProject(projectid).checkList('TaskResource', zcb1,true);
                };
                ACCUSER.getProject(projectid).checkList('Supplier', zcb,true);
            }
            ACCUSER.checkList('Alert', cb, true);
        }, 0);
    }
    if(id.includes('finbud-mods-dashboard')){
        console.log('Dashboard');
        $('#nav-dashboard').click();
    }
    if(id.includes('finbud-mods-exit')){
        console.log('Exit');
        $('.finance-budget-con').hide();
        $('.dashboard-con').show();
    }
    if(id.includes('print')){
        console.log('Printing');
        let legend = $('.finbud-legend').html();
        let body = $('.finbud-body').html();
        let footer = $('.finbud-footer').html();
        
        let content = `<div class="finbud-legend">${legend}</div>
                        <div class="finbud-body">${body}</div>
                        <div class="finbud-footer  color-sc">${footer}</div>`;

        printPageArea(content);
    }

});
//Active Projects > Finance > Tracking
$('.fintrack-mods-widget').click(function(){
    const id = $(this).children('span').attr('id');
    console.log(id);
    const projectid = $('#dashboard-body-projectname').attr('prid');
    console.log(projectid);

    if(id.includes('fintrack-mods-refresh')){
        showRefreshReport("Loading...");
        setTimeout(() => {
            const cb=()=>{
                ACCUSER.Alert.fill();
                const zcb=data=>{
                    console.log(data);
                    const zcb1=data=>{
                        console.log(data);
                        const zcb2=data=>{
                            console.log(data);
                            const zcb3=data=>{
                                console.log(data);
                                const zcb4=data=>{
                                    console.log(data);
                                    const zcb5=data=>{
                                        console.log(data);
                                        const zcb6=data=>{
                                            console.log(data);
                                            const zcb6=data=>{
                                                console.log(data);
                                                const zcb6=data=>{
                                                    console.log(data);
                                                    setTimeout(() => {
                                                        $('#project-view-finance-tracker').click();
                                                    }, 0);
                                                    setTimeout(() => {
                                                        hideRefreshReport();
                                                    }, 0);
                                                };
                                                ACCUSER.getProject(projectid).checkList('TmpSupplier', zcb6,true);
                                            };
                                            ACCUSER.getProject(projectid).checkList('TmpAccount', zcb6,true);
                                        };
                                        ACCUSER.getProject(projectid).checkList('ConnectByProjectId', zcb6,true);
                                    };
                                    ACCUSER.getProject(projectid).checkList('ConnectByResource', zcb5,true);
                                };
                                ACCUSER.getProject(projectid).checkList('SupplierRate', zcb4,true);
                            };
                            ACCUSER.getProject(projectid).checkList('AccountRate', zcb3,true);
                        };
                        ACCUSER.getProject(projectid).checkList('Timesheet', zcb2,true);
                    };
                    ACCUSER.getProject(projectid).checkList('TaskResource', zcb1,true);
                };
                ACCUSER.getProject(projectid).checkList('Supplier', zcb,true);
                
            }
            ACCUSER.checkList('Alert', cb, true);
        }, 0);
            
    }
    if(id.includes('fintrack-mods-dashboard')){
        console.log('Dashboard');
        $('#nav-dashboard').click();
    }
    if(id.includes('fintrack-mods-exit')){
        console.log('Exit');
        $('.finance-tracking-con').hide();
        $('.dashboard-con').show();
    }
    if(id.includes('print')){
        console.log('Printing');
        let legend = $('.fintrack-legend').html();
        let body = $('.fintrack-body').html();
        let footer = $('.fintrack-footer').html();
        
        let content = `<div class="fintrack-legend">${legend}</div>
                        <div class="fintrack-body">${body}</div>
                        <div class="fintrack-footer  color-sc">${footer}</div>`;

        printPageArea(content);
    }
});
//Active Projects > Finance > Spending
$('.spending-mods-widget').click(function(){
    const id = $(this).children('span').attr('id');
    console.log(id);
    const projectid = $('#spending-header-projectid').text();
    console.log(projectid);

    if(id.includes('spending-mods-refresh')){
        console.log('Refresh');
        const cid = $('.spending-navigation-widget.selected').attr('cid');

        $('.spending-body').children('.spending-body-widget').hide();
        $('.spending-body').children('.spending-body-widget-').hide();
        $(`.spending-body-${cid}`).css('display', 'flex').show();
        $('.spending-body').show();
        
        
        showRefreshReport("Refreshing...");
        setTimeout(() => {
            const cb=()=>{
                ACCUSER.Alert.fill();
                setTimeout(() => {

                    const cb =data=>{
                        console.log(data);
                        const cb =data=>{
                            console.log(data);
                            const cb =data=>{
                                console.log(data);
                                const cb =data=>{
                                    console.log(data);
                                    setTimeout(() => {
                                        if(cid == 'dashboard'){
                                            console.log('Spending Dashboard');
                                            cidDashboard();
                                        }
                                        else if(cid == 'opexspend'){
                                            console.log('Spending opexspend');
                                            cidOpexspend();
                                        }
                                        else if(cid == 'capexspend'){
                                            console.log('Spending capexspend');
                                            cidCapexspend();
                                        }
                                        else if(cid == 'opexforecast'){
                                            console.log('Spending opexforecast');
                                            cidOpexforecast();
                                        }
                                        else if(cid == 'capexforecast'){
                                            console.log('Spending capexforecast');
                                            cidCapexforecast();
                                        }
                                        hideRefreshReport();
                                    }, 0);
                                };
                                ACCUSER.checkList('Supplier',cb,true);
                            };
                            ACCUSER.getProject(projectid).checkList('Invoice',cb,true);
                        };
                        ACCUSER.getProject(projectid).checkList('Item',cb,true);
                    };
                    ACCUSER.getProject(projectid).checkList('Budget',cb,true);
                    
                }, 0);
            }
            ACCUSER.checkList('Alert', cb, true);
        }, 0);
    }
    if(id.includes('spending-mods-dashboard')){
        console.log('Dashboard');
        $('.spending-body').children('.spending-body-widget').hide();
        $('.spending-body').children('.spending-body-widget-').hide();
        $(`.spending-body-dashboard`).css('display', 'flex').show();
    }
    if(id.includes('spending-mods-exit')){
        console.log('Exit');
        $('.finance-spending-con').hide();
        $('.dashboard-con').show();
    }
    if(id.includes('print')){
        console.log('Printing');
        let body = $('.spending-body').html();
        
        let content = `<div class="spending-body">${body}</div>`;

        printPageArea(content);
    }
});

//New-Project > Header
$('.schedule-mods-widget').click(function(){
    const id = $(this).children('span').attr('id');
    console.log(id);
    const projectid = $('#schedule-header-projectid').text();
    console.log(projectid);
    
    if(id.includes('refresh')){
        console.log('refresh');
        const cid = $('#schedule-header-projectid').attr('cid');
        console.log("CID: ", cid);

        showRefreshReport('Refreshing...');
        const cb=()=>{
            ACCUSER.Alert.fill();
            if(cid == 'create'){
                console.log("New-Projects > create > Refresh");
                $(".schedule-body-create").children('.content').each(function(){
                    $(this).find('input').val("");
                });
                setTimeout(() => {
                    hideRefreshReport();
                }, 0);
            }
            if(cid == 'build'){
                console.log("New-Projects > Build > Refresh");
                $('.schedule-body-build').children('.build-projectlist').empty();
                $('.schedule-body-build').children('.build-body').css('display', 'none');

                //for testing purposse only - delete this after
                ACCUSER._PROJECTS = undefined;
                ACCUSER.OutgoingProjectRequest = undefined;
                ACCUSER.IncomingProjectRequest = undefined;
                
                const cb =()=>{
                    const cb =()=>{
                        const cb =()=>{
                            const cb =()=>{
                                const cb =()=>{
                                    const cb =()=>{
                                        setTimeout(() => {
                                            cidBuild();
                                        }, 0);
                                    };
                                    ACCUSER.checkList("Projects", cb, true);
                                };
                                ACCUSER.checkList("Position", cb, true);
                            };
                            ACCUSER.checkList("Department", cb, true);
                        };
                        ACCUSER.checkList("IncomingProjectRequest", cb, true);
                    };
                    ACCUSER.checkList("OutgoingProjectRequest", cb, true);
                };
                ACCUSER.checkList("COMPANY_ACCOUNTS", cb, true);
                
                
            }
            if(cid == 'request'){
                console.log("New-Projects > request > Refresh");
                setTimeout(() => {
                    const cb =()=>{
                        const cb =()=>{
                            const cb =()=>{
                                const cb =()=>{
                                   setTimeout(() => {
                                        const list = ACCUSER.getDistinctInOutProject();
                                        console.log(list, list.length,'------------------');
                                        setTimeout(() => {
                                            $.each(list, function(key, value){
                                                ACCUSER.getProject(value.projectid).checkList("Request", ()=>{}, true);
                                            }); 
                                            setTimeout(() => {
                                                cidRequest();
                                            }, 0);
                                        }, 0);
                                   }, 0);
                                };
                                ACCUSER.checkList("IncomingProjectRequest", cb, true);
                            };
                            ACCUSER.checkList("OutgoingProjectRequest", cb, true);
                        };
                        ACCUSER.checkList("COMPANY_ACCOUNTS", cb, true);
                    };
                    ACCUSER.checkList("Projects", cb, true);
                }, 0);
            }
            if(cid == 'proposal'){
                console.log("New-Projects > proposal > Refresh");
                setTimeout(() => {
                    hideRefreshReport();
                }, 0);
            }
            if(cid == 'share'){
                console.log("New-Projects > share > Refresh");
                
                $('#project-connect-search-id').val('');
                $('#project-connect-search-select').empty();
                $('.project-connect-search-list').hide();
                
                setTimeout(() => {
                    const cb =()=>{
                        const cb =()=>{
                            console.log("Fetched projects");
                            setTimeout(() => {
                                cidShare();
                            }, 0);
                        };
                        ACCUSER.checkList("Projects", cb, true);
                    };
                    ACCUSER.checkList("COMPANY_ACCOUNTS", cb, true);
                }, 0);
                
            }
        }
        ACCUSER.checkList('Alert', cb, true);
    }
    if(id.includes('print')){
        console.log('Printing');
    
        let body = $('.schedule-body').html();
        let content = `<div class="schedule-body">${body}</div>`;

        printPageArea(content);
        
    }
    if(id.includes('email')){
        console.log('email');

        var destination = prompt("Enter Email:", "sampleaccout7@gmail.com");
        sendEmail(destination);
    }

});
//New Project > Build > Print
$('.request-createtool-header-print').click(function(){
    console.log('Printing');

    $('.request-createtool-body').children('.createtool-container').each(function(){
        $(this).children('.createtool-maintitle').children('.content').show();
    });

    let required = $('.request-createtool-required').html();
    let body = $('.request-createtool-body').html();
    let content = `<div class="request-createtool-required">${required}</div>
                    <div class="request-createtool-body">${body}</div>`;

   
    printPageArea(content);

    $('.request-createtool-body').children('.createtool-container').each(function(){
        $(this).children('.createtool-maintitle').children('.content').hide();
    });
});
//Build Project > Dashboard
$('.schedule-mods-widget').children('#schedule-mods-dashboard').click(function(){
    const cid = $('#schedule-header-projectid').attr('cid');
    console.log("CID: ", cid);
    $('.schedule-navigation').children('.schedule-navigation-widget, .selected').removeClass('selected');
    if(cid == 'build'){
        console.log("New-Projects > Build > Dashboard");
        $('.schedule-body-build').hide();
    }
    if(cid == 'share'){
        console.log("New-Projects > share > Dashboard");
        $('.schedule-body-share').hide();
    }
    if(cid == 'create'){
        console.log("New-Projects > create > Dashboard");
        $(".schedule-body-create").children('.content').each(function(){
            $(this).find('input').val("");
        });
        $('.schedule-body-create').hide();
    }
    if(cid == 'request'){
        console.log("New-Projects > request > Dashboard");
        $('.schedule-body-request').hide();
        
    }
});

//Project TimeSheet > header
$('.timesheet-mods-widget').click(function(){
    const id = $(this).children('span').attr('id');
    console.log(id);
    const projectid = $('#timesheet-header-projectid').text();
    console.log(projectid);
    
    if(id.includes('print')){
        console.log('Printing');
        let legend = $('.timesheet-legend').html();
        let body = $('.timesheet-body').html();
        let footer = $('.timesheet-footer').html();
        let content = `<div class="timesheet-legend">${legend}</div>
                        <div class="timesheet-body">${body}</div>
                        <div class="timesheet-footer">${footer}</div>`;

        printPageArea(content);
    }
    if(id.includes('refresh')){
        console.log('Refresh');

        showRefreshReport("Refreshing...");
        const cb=()=>{
            ACCUSER.Alert.fill();
            const cb=()=>{
                if(projectid != undefined && projectid != null && projectid != ""){
                    setTimeout(() => {
                        hideRefreshReport();
                    }, 0);
                }else{
                    setTimeout(() => {
                        hideRefreshReport();
                    }, 10);
                }
            };
            ACCUSER.checkList('Projects',cb, true);
        }
        ACCUSER.checkList('Alert', cb, true);
    }

});
//User Taskboard > header
$('.usertaskboard-mods-widget').click(function(){
    const id = $(this).children('span').attr('id');
    console.log(id);
    const projectid = $('#usertaskboard-header-projectid').text();
    console.log(projectid);
    
    if(id.includes('print')){
        console.log('Printing');
        let body = $('.usertaskboard-body').html();
        let content = `<div class="usertaskboard-body">${body}</div>`;

        printPageArea(content);
    }
    if(id.includes('refresh')){
        console.log('refresh');
        showRefreshReport("Refreshing...");
        const cb=()=>{
            ACCUSER.Alert.fill();
            const cb=()=>{
                if(projectid != undefined && projectid != null && projectid != ""){
                    const cb =()=>{
                        const cb =()=>{
                            const cb =()=>{
                                setTimeout(() => {
                                    ACCUSER.fillSelectTagWithConnectedProject( $('#usertaskboard-header-filter-project') );
                                    $('#usertaskboard-header-filter-project').val(projectid);
                                    $('#usertaskboard-header-search-submit').click();
                                }, 0);
                                setTimeout(() => {
                                    hideRefreshReport();
                                }, 0);
                            };
                            ACCUSER.getProject(projectid).checkList('ConnectByProjectId', cb, true);
                        };
                        ACCUSER.getProject(projectid).checkList('Task', cb, true);
                    };
                    ACCUSER.getProject(projectid).checkList('TaskResource', cb, true);
                }else{
                    setTimeout(() => {
                        hideRefreshReport();
                    }, 10);
                }
            };
            ACCUSER.checkList('Projects',cb, true);
        }
        ACCUSER.checkList('Alert', cb, true);
        
    }
    if(id.includes('dashboard')){
        
        console.log('Going to dashboard');
        $('#nav-dashboard').click();
    }

});


//Active Projects Account Mapping
const actualAccOption = {
    start: function(e, ui) {
        // this function fires when you start dragging
        $(ui.helper).css('max-width', '300px');
        const id = $(ui.helper).attr('aid');
        
        console.log(id);
        // console.log(ui.helper);
        $('.map-body-tmpacc-list-con > .map-body-tmpacc-list-widget').each(function(){
            const x = $(this).children('.widget-map');
            
            if(x.children('span').text() == id){
                x.css('background-color', YELLOW_PALETTE);
            }
            
        });
       
        
    },
    drag: function() {
    //   this function fires after you drag and while dragging
    },
    stop: function() {
    // this function fires when you stop dragging or if you dropped it
        // $('.create-upload-con3-connectList-widget').css('background-color', SUB_COLOR);
        $('.map-body-tmpacc-list-widget').children('.idle').css('background-color', 'grey');
        $('.map-body-tmpacc-list-widget').children('.active').css('background-color', 'white');
    // and here in stop you can color your droppable div into its original state

        // $('.map-body-tmpacc-list-con > .map-body-tmpacc-list-widget').
    },
    opacity: 0.7, // opacity of the draggable
    helper: "clone", // will not drag the actual element. instead will send a clone
    // containment: ".map-body", // here is where the draggable can stay. if you put "body" then it can go around the whole page
                                       // but if you put "#sampleid" then it will contain the draggable within the range of the div with the id of 'sampleid'
    scroll: false,  // prevents scrolling
    cursorAt: { bottom: 0, left: 150}, // puts cursor at center bottom || remove left option to just simply put it in bottom
    revert: "invalid" // draggable will fall back to its place
};
const tmpAccOption = {
    accept: ".map-body-actualacc-list-widget", // this will determine which elements are accepted to drop in this case all element with the class of moduleman-module-list-widget will drop
    drop: function( event, ui ) {
        console.log('trying to drop');

        // same with the draggable. if you use this code, you can access the draggable element thats being dropped 
        const actualid = $(ui.draggable).attr('aid');
        // let doctitle = $(ui.draggable).children('.map-body-actualacc-list-widget-title').text(); 
        const tmpid = $(event.target).attr('id');
        // const plantitle = $(event.target).children('.widget-details').children('.map-body-plandoc-list-widget-title').text();
        const prid = $(ui.draggable).attr('prid');
        const actualname = $(ui.draggable).attr('fn');

        console.log(tmpid, actualid);
        function push(actualid, tmpid){
            const projectid = $('#map-header-projectid').text();
            const callback=()=>{
                $(event.target).children('.widget-map').removeClass('idle').addClass('active').children('span').text(actualid);
                // $(event.target).children('.widget-details').children('map-body-tmpacc-list-widget-title').text(actualname);

                console.log('Will be mapped');
                ACCUSER.getProject(projectid).ScheduleDocument.updateMapId(tmpid, actualid);
                ACCUSER.getProject(projectid).ActualDocument.updateMapId(actualid, tmpid);

                // fillDocumentMapping(projectid);
                

            };
            const accOptions = {
                'accid' : actualid,
                'tmpid' : tmpid,
                'roleid' : rngAccRoleId(),
                'projectid' : prid,
                'rateid' : rngAccRateId(),
                'name' : $(ui.draggable).attr('fn')
            };
            
            ACCUSER.mapAccounts(accOptions, callback);
        }

        if($(event.target).children('.widget-map').hasClass('idle')){
            // api_createProjectConnect(prid,actualid);
            // console.log(ACCUSER.getProject(prid).ConnectByProjectId);
            // console.log(ACCUSER.getCompanyAccountById(actualid));
            const accObj = ACCUSER.getCompanyAccountById(actualid)
            const newObj = {
                'firstname' : accObj.firstname,
                'id' : accObj.id,
                'lastname' : accObj.lastname,
                'photo' : accObj.photo
            };
            console.log(newObj);
            ACCUSER.getProject(prid).connectUsertoProject(newObj);
            const na = {
                "response" : "na"
            };
            const nastr = JSON.stringify(na);
            const probj = ACCUSER.getProject(prid).getData();
            const aloptions = {
                'id' : rngAlertId(),
                'ownerid' : actualid,
                'fn' : 'na',
                'dataview' : nastr,
                'dataapprove' : nastr,
                'datareject' : nastr,
                'title' : "Project Updates",
                'message' : `You have been assigned as a new member of the project <b>${probj.projectname}</b>. Please view your New Tasks.`
            }
            ACCUSER.Alert.create(aloptions, ()=>{ACCUSER.Alert.fill()});
            
            const tasksList = ACCUSER.getProject(prid).getTasksByOwner(actualid);
            console.log('-----------Task Object----------------------', tasksList);
            console.log('dropped to idle');

            push(actualid, tmpid);

        }else{
            // console.log('dropped to active');
           showNotification("Mapping Alert", "This account has already been mapped");
        }
        
    }
    //need to connect with classes
}

$(document).on('click', '.map-body-tmpacc-list-widget', function(){
    const name = $(this).attr('name');
    const prid = $(this).attr('prid');
    const id = $(this).attr('id');
    const mapid = $(this).attr('mapid');

    console.log(id, name, prid, mapid);
    
    // $('.map-body-plandoc-props-header').attr('docid', id);
    // console.log(mapid);
    // if(mapid == 'null'){
    //     console.log('map is null');
    //     $('.map-body-plandoc-props-connect-title').text('This Document is not Mapped');
    //     $('.map-body-plandoc-props-connect-account').text('');
    // }else{
    //     $('.map-body-plandoc-props-connect-title').text('This Document is currently Mapped to');
    //     $('.map-body-plandoc-props-connect-account').text(mapid);
    // }
    // $('.map-body-plandoc-props-header-title').text(title);
    // $('.map-body-plandoc-props-header-docid').text(id);
    // $('.map-body-plandoc-props-header-prid').text(prid);

    // $('.map-body-plandoc-props-assign').show();

    // $('.map-body-plandoc-props-con').show();
    
});
$(document).on('click', '.map-body-actualacc-list-widget', function(){
    const firstname = $(this).attr('fn');
    const lastname = $(this).attr('ln');
    const id = $(this).attr('id');
    const d = $(this);

    console.log(id, firstname, lastname);
    $('.map-body-tmpacc-list-con').children('.map-body-tmpacc-list-widget').each(function(){
        const x = $(this).children('.widget-map');
        if(x.hasClass('active')){
            if(x.children('span').text() == id){
                // x.css('background-color', YELLOW_PALETTE);
                blinkbg(x, YELLOW_PALETTE, 'white')
                blinkbg(d, 'white', BTN_COLOR);
            }
        }
    });
});

function fillAccountMapping(projectid){
    console.log("filling resources");
    

    const tmpArea = $('.map-body-tmpacc-list').children('.map-body-tmpacc-list-con');
    const actualArea = $('.map-body-actualacc-list').children('.map-body-actualacc-list-con');
    
    const actualacclist = ACCUSER.getCompanyAccounts();
    // const actualsuplist = ACCUSER.getCompanySuppliers();

   
    
    const tmpacclist = ACCUSER.getProject(projectid).getTmpAccObj();

    // console.log('actual resource list: ', actualacclist, actualsuplist);
    // console.log('tmp resource list: ', tmpacclist);
    
    tmpArea.empty();
    actualArea.empty();

    // actual accounts
    $.each(actualacclist, function(key, value){
        actualArea.append(`<div class="map-body-actualacc-list-widget shadow tmpacc" prid="${projectid}" aid="${value.id}" fn="${value.firstname}" ln="${value.lastname}">
        <span class="map-body-actualacc-list-widget-title">${value.firstname} ${value.lastname}</span>
        <span class="map-body-actualacc-list-widget-id">${value.id}</span>
        </div>`);
        $('.map-body-actualacc-list-widget').draggable(actualAccOption);
    });

    // // actual suppliers
    // $.each(actualsuplist, function(key, value){
    //     console.log(value);
    //     actualArea.append(`<div class="map-body-actualacc-list-widget shadow tmpsupp" prid="${projectid}" aid="${value.supplierid}" name="${value.name}">
    //     <span class="map-body-actualacc-list-widget-title">${value.name}</span>
    //     <span class="map-body-actualacc-list-widget-id">${value.supplierid}</span>
    //     </div>`);
    //     $('.map-body-actualacc-list-widget').draggable(actualResourceOption);
    // });

    // temporary accountsresources
    $.each(tmpacclist, function(key, value){
       
            // tmpArea.append(`
            //     <div class="map-body-tmpacc-list-widget shadow tmpsupp"  mapid= "${value.mapid}" id= "${value.id}" name="${value.name}" prid="${value.projectid}">
            //         <div class="widget-details">
            //             <span class="map-body-tmpacc-list-widget-title">${value.name}</span>
            //             <span class="map-body-tmpacc-list-widget-id tmpacc">${value.id}</span>
            //         </div>
            //         <div class="widget-map idle">
            //             <span class="map-body-tmpacc-list-widget-mapid">Not Mapped</span>
            //         </div>
            //     </div>`);
            let maphtml = '';
            if(value.mapaccid != null){
                maphtml = `<div class="widget-map active">
                <span class="map-body-tmpacc-list-widget-mapid">${value.mapaccid}</span>
                </div>`;
            }else{
                maphtml = `<div class="widget-map idle">
                <span class="map-body-tmpacc-list-widget-mapid">Not Mapped</span>
                </div>`;
            }
        tmpArea.append(`
        <div class="map-body-tmpacc-list-widget shadow tmpacc" mapid= "${value.mapid}" id= "${value.id}" name="${value.name}" prid="${value.projectid}">
            <div class="widget-details">
                <span class="map-body-tmpacc-list-widget-title">${value.name}</span>
                <span class="map-body-tmpacc-list-widget-id tmpacc">${value.id}</span>
            </div>
            ${maphtml}
        </div>`);
        
        $('.map-body-tmpacc-list-widget').droppable(tmpAccOption);
    });

}


// Active Projects > Supplier mapping
const actualSupOption = {
    start: function(e, ui) {
        // this function fires when you start dragging
        $(ui.helper).css('max-width', '300px');
        const id = $(ui.helper).attr('aid');
        
        console.log(id);
        // console.log(ui.helper);
        $('.map-body-tmpsup-list-con > .map-body-tmpsup-list-widget').each(function(){
            const x = $(this).children('.widget-map');
            
            if(x.children('span').text() == id){
                x.css('background-color', YELLOW_PALETTE);
            }
            
        });
       
        
    },
    drag: function() {
    //   this function fires after you drag and while dragging
    },
    stop: function() {
    // this function fires when you stop dragging or if you dropped it
        // $('.create-upload-con3-connectList-widget').css('background-color', SUB_COLOR);
        $('.map-body-tmpsup-list-widget').children('.idle').css('background-color', 'grey');
        $('.map-body-tmpsup-list-widget').children('.active').css('background-color', 'white');
    // and here in stop you can color your droppable div into its original state

        // $('.map-body-tmpsup-list-con > .map-body-tmpsup-list-widget').
    },
    opacity: 0.7, // opacity of the draggable
    helper: "clone", // will not drag the actual element. instead will send a clone
    // containment: ".map-body", // here is where the draggable can stay. if you put "body" then it can go around the whole page
                                       // but if you put "#sampleid" then it will contain the draggable within the range of the div with the id of 'sampleid'
    scroll: false,  // prevents scrolling
    cursorAt: { bottom: 0, left: 150}, // puts cursor at center bottom || remove left option to just simply put it in bottom
    revert: "invalid" // draggable will fall back to its place
};
const tmpSupOption = {
    accept: ".map-body-actualsup-list-widget", // this will determine which elements are accepted to drop in this case all element with the class of moduleman-module-list-widget will drop
    drop: function( event, ui ) {
        console.log('trying to drop');

        // same with the draggable. if you use this code, you can access the draggable element thats being dropped 
        const actualid = $(ui.draggable).attr('aid');
        // let doctitle = $(ui.draggable).children('.map-body-actualsup-list-widget-title').text(); 
        const tmpid = $(event.target).attr('id');
        // const plantitle = $(event.target).children('.widget-details').children('.map-body-plandoc-list-widget-title').text();
        const prid = $(ui.draggable).attr('prid');
        const actualname = $(ui.draggable).attr('name');

        console.log(tmpid, actualid);

        function push(actualid, tmpid){
            const projectid = $('#map-header-projectid').text();
            const callback=()=>{
                $(event.target).children('.widget-map').removeClass('idle').addClass('active').children('span').text(actualid);
                // $(event.target).children('.widget-details').children('map-body-tmpacc-list-widget-title').text(actualname);

                console.log('Will be mapped');
                // ACCUSER.getProject(projectid).ScheduleDocument.updateMapId(tmpid, actualid);
                // ACCUSER.getProject(projectid).ActualDocument.updateMapId(actualid, tmpid);

                // fillDocumentMapping(projectid);
            };
            const supOptions = {
                'tmpid' : tmpid,
                'supid' : actualid,
                'rateid': rngSupRateId(),
                'name' : actualname,
                'rate' : '0',
                'type' : null,
                'projectid' : prid
            };
            
            ACCUSER.mapSuppliers(supOptions, callback);
        }

        if($(event.target).children('.widget-map').hasClass('idle')){
            console.log('dropped to idle');
            push(actualid, tmpid);
        }else{
            // console.log('dropped to active');
           showNotification("Mapping Alert", "This account has already been mapped");
        }
        
    }
}

$(document).on('click', '.map-body-tmpacc-list-widget', function(){
    const name = $(this).attr('name');
    const prid = $(this).attr('prid');
    const id = $(this).attr('id');
    const mapid = $(this).attr('mapid');

    console.log(id, name, prid, mapid);
    
    // $('.map-body-plandoc-props-header').attr('docid', id);
    // console.log(mapid);
    // if(mapid == 'null'){
    //     console.log('map is null');
    //     $('.map-body-plandoc-props-connect-title').text('This Document is not Mapped');
    //     $('.map-body-plandoc-props-connect-account').text('');
    // }else{
    //     $('.map-body-plandoc-props-connect-title').text('This Document is currently Mapped to');
    //     $('.map-body-plandoc-props-connect-account').text(mapid);
    // }
    // $('.map-body-plandoc-props-header-title').text(title);
    // $('.map-body-plandoc-props-header-docid').text(id);
    // $('.map-body-plandoc-props-header-prid').text(prid);

    // $('.map-body-plandoc-props-assign').show();

    // $('.map-body-plandoc-props-con').show();
    
});
$(document).on('click', '.map-body-actualsup-list-widget', function(){
    const firstname = $(this).attr('fn');
    const lastname = $(this).attr('ln');
    const id = $(this).attr('id');
    const d = $(this);

    console.log(id, firstname, lastname);
    $('.map-body-tmpsup-list-con').children('.map-body-tmpsup-list-widget').each(function(){
        const x = $(this).children('.widget-map');
        if(x.hasClass('active')){
            if(x.children('span').text() == id){
                // x.css('background-color', YELLOW_PALETTE);
                blinkbg(x, YELLOW_PALETTE, 'white')
                blinkbg(d, 'white', BTN_COLOR);
            }
        }
    });
});

function fillSupplierMapping(projectid){
    console.log("filling resources");
    

    const tmpArea = $('.map-body-tmpsup-list').children('.map-body-tmpsup-list-con');
    const actualArea = $('.map-body-actualsup-list').children('.map-body-actualsup-list-con');
    
    const actualsuplist = ACCUSER.getCompanySuppliers();
    // const actualsuplist = ACCUSER.getCompanySuppliers();
    const tmpsuplist = ACCUSER.getProject(projectid).getTmpSupObj();

    console.log('actual resource list: ', actualsuplist);
    console.log('tmp resource list: ', tmpsuplist);
    
    tmpArea.empty();
    actualArea.empty();

    // actual suppliers
    $.each(actualsuplist, function(key, value){
        console.log(value, '------------------------');
        actualArea.append(`<div class="map-body-actualsup-list-widget shadow" prid="${projectid}" aid="${value.supplierid}" name="${value.name}">
                            <span class="map-body-actualsup-list-widget-title">${value.name}</span>
                            <span class="map-body-actualsup-list-widget-id">${value.supplierid}</span>
                        </div>`);
        $('.map-body-actualsup-list-widget').draggable(actualSupOption);
    });

    // temporary supplier sresources
    $.each(tmpsuplist, function(key, value){
       
            // tmpArea.append(`
            //     <div class="map-body-tmpsup-list-widget shadow tmpsupp"  mapid= "${value.mapid}" id= "${value.id}" name="${value.name}" prid="${value.projectid}">
            //         <div class="widget-details">
            //             <span class="map-body-tmpsup-list-widget-title">${value.name}</span>
            //             <span class="map-body-tmpsup-list-widget-id tmpacc">${value.id}</span>
            //         </div>
            //         <div class="widget-map idle">
            //             <span class="map-body-tmpsup-list-widget-mapid">Not Mapped</span>
            //         </div>
            //     </div>`);
        let maphtml = '';
        if(value.mapsupid != null){
            maphtml = `<div class="widget-map active">
            <span class="map-body-tmpsup-list-widget-mapid">${value.mapsupid}</span>
            </div>`;
        }else{
            maphtml = `<div class="widget-map idle">
            <span class="map-body-tmpsup-list-widget-mapid">Not Mapped</span>
            </div>`;
        }
        tmpArea.append(`
            <div class="map-body-tmpsup-list-widget shadow tmpacc" mapid= "${value.mapsupid}" id= "${value.id}" name="${value.name}" prid="${value.projectid}">
                <div class="widget-details">
                    <span class="map-body-tmpsup-list-widget-title">${value.name}</span>
                    <span class="map-body-tmpsup-list-widget-id tmpacc">${value.id}</span>
                </div>
                ${maphtml}
            </div>`);
        
        $('.map-body-tmpsup-list-widget').droppable(tmpSupOption);
    });

}








