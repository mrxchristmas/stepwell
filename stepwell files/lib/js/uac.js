
let selUserId = '';

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}


$(document).on('click', '.uac-user-widget', function(){
    const email = $(this).text();
    const uid = $(this).attr('id');
    selUserId = uid;
    console.log(email, uid);
    $('#uac-user-modules-title').text("Active Modules of " + email);
    
     //to be put on 3rd part
    api_fetchAccountModule(selUserId, 'uac-user-widget');

    $('.uac-user-modules').show();
    $('.uac-module-list').show();
});

$('.uac-user-modules').droppable({
    accept: ".uac-module-list-widget",
    drop: function( event, ui ) {
        // $(this).css('background-color', 'red');

        // console.log(ui.draggable[0]);
        // console.log(event);
        let moduleui = $(ui.draggable).attr('ui');
        let modulename = $(ui.draggable).text();
        let color = $(this).css('background-color');
        // console.log(rgb2hex(color).toUpperCase(), YELLOW_PALETTE);
        if(rgb2hex(color).toUpperCase() == YELLOW_PALETTE){
            showNotification('Module Management','The Module You are trying to add is already added');
        }else{
            // console.log('Able to Add', sessionStorage.getItem('comid'));
            const cb = () => {
                api_fetchAccountModule(selUserId, 'uac-user-widget');
                showNotification('Module Management','You have successfuly added the Module ' + modulename);
                const na = {
                    "response" : "na"
                };
                const nastr = JSON.stringify(na);
                // const probj = ACCUSER.getProject(projectid).getData();
                // const trobj = ACCUSER.getProject(projectid).Task.getTaskObj(taskid);
                const aloptions = {
                    'id' : rngAlertId(),
                    'ownerid' : selUserId,
                    'fn' : 'na',
                    'dataview' : nastr,
                    'dataapprove' : nastr,
                    'datareject' : nastr,
                    'title' : "Module Access",
                    'message' : `You have been granted an access to module <b>${modulename.toUpperCase()}</b>`
                }
                console.log("DELETE ME",aloptions);
                const cb =()=>{
                    ACCUSER.Alert.fill();
                }
                ACCUSER.Alert.create(aloptions, cb);
            };
            api_createAccountModule(selUserId, modulename, moduleui, cb);
        }
    }
});


$(document).on('dblclick', '.uac-user-modules-widget', function(){
    let id = selUserId;
    let moduleui = $(this).attr('ui');
    let modulename = $(this).text();

    // console.log(id, moduleui);
    const cb = () => {
        api_fetchAccountModule(id, 'uac-user-widget');
        showNotification('Module Management','You have successfuly Deleted the Module ' + modulename);
        const na = {
            "response" : "na"
        };
        const nastr = JSON.stringify(na);
        // const probj = ACCUSER.getProject(projectid).getData();
        // const trobj = ACCUSER.getProject(projectid).Task.getTaskObj(taskid);
        const aloptions = {
            'id' : rngAlertId(),
            'ownerid' : id,
            'fn' : 'na',
            'dataview' : nastr,
            'dataapprove' : nastr,
            'datareject' : nastr,
            'title' : "Module Access",
            'message' : `Your access to the module <b>${modulename.toUpperCase()}</b> have been removed.`
        }
        console.log("DELETE ME",aloptions);
        const cb =()=>{
            ACCUSER.Alert.fill();
        }
        ACCUSER.Alert.create(aloptions, cb);
    };
    api_deleteAccountModule(id, moduleui, cb);
});      