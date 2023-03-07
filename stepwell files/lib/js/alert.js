const fnlist = [
    {
        "functionname" : "project-groupid-update",
        "function" : fn_ProjectGroupidUpdate
    },{
        "functionname" : "message-viewtask",
        "function" : fn_MessageViewtask
    },{
        "functionname" : "taskboard-message-markasread",
        "function" : fn_TaskboardMessageMarkasread
    },{
        "functionname" : "usertaskboard-dispute-date",
        "function" : fn_UsertaskboardDisputeDate
    },{
        "functionname" : "usertaskboard-dispute-assignment",
        "function" : fn_UsertaskboardDisputeAssignment
    }
    
    
]

const redirectlist = [
    {
        "rkey" : "redirect-viewtask",
        "rfunc" : rd_ViewTask
    },{
        "rkey" : "redirect-viewtask-dispute",
        "rfunc" : rd_ViewTaskDispute
    }
]



function fn_ProjectGroupidUpdate(data, callback){
    console.log(data);
    const cb=()=>{
        const cb1 =()=>{
            ACCUSER.Alert.fill();
            callback();
        }
        ACCUSER.Alert.delete({"id" : data.id}, cb1);
    }
    ACCUSER.getProject(data.projectid).updateProjectGroupId(data, cb);
}
function fn_MessageViewtask(data, callback){
    // console.log(data);
    const strdata = JSON.stringify(data);
    const loc = window.location;
    if(loc.toString().includes('pages/proflow')){
        // console.log('DO YOUR SHIT');
        rd_ViewTask(strdata);
    }else{
        window.location.href = domain + 'pages/proflow' ;
        setCookie("redirect-viewtask", strdata , 1);
    }

    callback();
}
function fn_TaskboardMessageMarkasread(data, callback){
    console.log(data);
    const cb=()=>{
        setTimeout(() => {
            const cb=()=>{
                const cb1 =()=>{
                    ACCUSER.Alert.fill();
                    callback();
                }
                ACCUSER.Alert.delete({"id" : data.id}, cb1);
            }
            ACCUSER.getProject(data.projectid).TaskResource.updateColumn(data, cb);
        }, 0);
    }
    ACCUSER.getProject(data.projectid).checkList('TaskResource', cb);
}
function fn_UsertaskboardDisputeDate(data, callback){
    console.log(data);
    const strdata = JSON.stringify(data);
    const loc = window.location;
    if(data.type == "view"){
        // console.log("VIEW THIS SHIT");
        if(loc.toString().includes('pages/proflow')){
            // console.log('DO YOUR SHIT');
            rd_ViewTaskDispute(strdata);
            callback();
        }else{
            window.location.href = domain + 'pages/proflow' ;
            setCookie("redirect-viewtask-dispute", strdata , 1);
        }
    }else if(data.type == "approve"){
        console.log("APPROVE THIS SHIT");
        

        const cb =()=>{
            const cb =()=>{
                setTimeout(() => {
                    const callbackz = ()=>{
                        const callback1 = ()=>{
                            const callback2 = ()=>{
                                const callback3 = ()=>{
                                    callback();
                                    const na = {
                                        "response" : "na"
                                    };
                                    const nastr = JSON.stringify(na);
                                    const tobj = ACCUSER.getProject(data.projectid).Task.getTaskObj(data.taskid);
                                    const aloptions = {
                                        'id' : rngAlertId(),
                                        'ownerid' : data.accid,
                                        'fn' : 'na',
                                        'dataview' : nastr,
                                        'dataapprove' : nastr,
                                        'datareject' : nastr,
                                        'title' : "Task Updates",
                                        'message' : `Your request to change end date of task <b>${tobj.taskname}</b> has been approved! `
                                    }
                                    console.log("DELETE ME",aloptions);
                                    const cbb =()=>{
                                        const cbb1 =()=>{
                                            ACCUSER.Alert.fill();
                                        }
                                        ACCUSER.Alert.delete({"id" : data.id}, cbb1);
                                    }
                                    ACCUSER.Alert.create(aloptions, cbb);
                                };
                                ACCUSER.getProject(data.projectid).Task.updateColumn({"taskid" : data.taskid, "columnname" : "status", "value" : "idle"}, callback3);
                            };
                            ACCUSER.getProject(data.projectid).TaskResource.updateColumnByTaskid({"taskid" : data.taskid, "columnname" : "status", "value" : "idle"}, callback2);
                        };
                        ACCUSER.getProject(data.projectid).TaskResource.updateColumnByTaskid({"taskid" : data.taskid, "columnname" : "suggesteddate", "value" : "null"}, callback1);
                    };
                    ACCUSER.getProject(data.projectid).Task.updateColumn({"taskid" : data.taskid, "columnname" : "enddate", "value" : data.enddate}, callbackz);
                }, 0);
            }
            ACCUSER.getProject(data.projectid).checkList("TaskResource", cb);
        }
        ACCUSER.getProject(data.projectid).checkList("Task", cb);
    }else if(data.type == "reject"){
        console.log("REJECT THIS SHIT");
        const cb =()=>{
            const cb =()=>{
                setTimeout(() => {
                    const callbackz = ()=>{
                        const callback1 = ()=>{
                            const callback2 = ()=>{
                                callback();
                                const na = {
                                    "response" : "na"
                                };
                                const nastr = JSON.stringify(na);
                                const tobj = ACCUSER.getProject(data.projectid).Task.getTaskObj(data.taskid);
                                const aloptions = {
                                    'id' : rngAlertId(),
                                    'ownerid' : data.accid,
                                    'fn' : 'na',
                                    'dataview' : nastr,
                                    'dataapprove' : nastr,
                                    'datareject' : nastr,
                                    'title' : "Task Updates",
                                    'message' : `Your request to change end date of task <b>${tobj.taskname}</b> has been rejected! `
                                }
                                console.log("DELETE ME",aloptions);
                                const cbb =()=>{
                                    const cbb1 =()=>{
                                        ACCUSER.Alert.fill();
                                    }
                                    ACCUSER.Alert.delete({"id" : data.id}, cbb1);
                                }
                                ACCUSER.Alert.create(aloptions, cbb);
                            };
                            ACCUSER.getProject(data.projectid).Task.updateColumn({"taskid" : data.taskid, "columnname" : "status", "value" : "idle"}, callback2);
                        };
                        ACCUSER.getProject(data.projectid).TaskResource.updateColumnByTaskidAndAccid({"taskid" : data.taskid, "accid" : data.accid, "columnname" : "status", "value" : "idle"}, callback1);
                    };
                    ACCUSER.getProject(data.projectid).TaskResource.updateColumnByTaskidAndAccid({"taskid" : data.taskid, "accid" : data.accid, "columnname" : "suggesteddate", "value" : "null"}, callbackz);
                }, 0);
            }
            ACCUSER.getProject(data.projectid).checkList("TaskResource", cb);
        }
        ACCUSER.getProject(data.projectid).checkList("Task", cb);

        
    }
}
function fn_UsertaskboardDisputeAssignment(data, callback){
    console.log(data);
    const strdata = JSON.stringify(data);
    const loc = window.location;
    if(data.type == "view"){
        // console.log("VIEW THIS SHIT");
        if(loc.toString().includes('pages/proflow')){
            // console.log('DO YOUR SHIT');
            rd_ViewTaskDispute(strdata);
            callback();
        }else{
            window.location.href = domain + 'pages/proflow' ;
            setCookie("redirect-viewtask-dispute", strdata , 1);
        }
    }else if(data.type == "approve"){
        console.log("APPROVE THIS SHIT");
        const cb1 =()=>{
            const cb2 =()=>{
                setTimeout(() => {
                    const callback0 = ()=>{
                        const callback1 = ()=>{
                            const callback2 = ()=>{
                                const callback2 = ()=>{
                                    const na = {
                                        "response" : "na"
                                    };
                                    const nastr = JSON.stringify(na);
                                    const tobj = ACCUSER.getProject(data.projectid).Task.getTaskObj(data.taskid);
                                    const accobj = ACCUSER.getCompanyAccountById(data.newaccid);
                                    const aloptions = {
                                        'id' : rngAlertId(),
                                        'ownerid' : data.oldaccid,
                                        'fn' : 'na',
                                        'dataview' : nastr,
                                        'dataapprove' : nastr,
                                        'datareject' : nastr,
                                        'title' : "Task Updates",
                                        'message' : `Your request to assign the task <b>${tobj.taskname}</b> to <b>${accobj.firstname}</b> has been approved! `
                                    }
                                    console.log("DELETE ME",aloptions);
                                    const cb =()=>{
                                        const cb =()=>{
                                            callback();
                                            ACCUSER.Alert.fill();
                                        }
                                        ACCUSER.Alert.delete({"id" : data.id}, cb);
                                    }
                                    ACCUSER.Alert.create(aloptions, cb);
                                };
                                ACCUSER.getProject(data.projectid).Task.updateColumn({"taskid" : data.taskid, "columnname" : "status", "value" : "idle"}, callback2);
                            };
                            ACCUSER.getProject(data.projectid).TaskResource.updateColumnByTaskid({"taskid" : data.taskid, "columnname" : "status", "value" : "idle"}, callback2);
                        };
                        ACCUSER.getProject(data.projectid).TaskResource.updateColumnByTaskid({"taskid" : data.taskid, "columnname" : "assignment", "value" : "ok"}, callback1);
                    };
                    ACCUSER.getProject(data.projectid).TaskResource.updateColumnByTaskidAndAccid({"taskid" : data.taskid, "accid" : data.oldaccid, "columnname" : "accid", "value" : data.newaccid}, callback0);
                }, 0);
            }
            ACCUSER.getProject(data.projectid).checkList("TaskResource", cb2);
        }
        ACCUSER.getProject(data.projectid).checkList("Task", cb1);
        
    }else if(data.type == "reject"){
        console.log("REJECT THIS SHIT");
        const cb1 =()=>{
            const cb2 =()=>{
                setTimeout(() => {
                    const callback0 = ()=>{
                        const callback1 = ()=>{
                            const callback2 = ()=>{
                                const na = {
                                    "response" : "na"
                                };
                                const nastr = JSON.stringify(na);
                                const tobj = ACCUSER.getProject(data.projectid).Task.getTaskObj(data.taskid);
                                const accobj = ACCUSER.getCompanyAccountById(data.newaccid);
                                const aloptions = {
                                    'id' : rngAlertId(),
                                    'ownerid' : data.accid,
                                    'fn' : 'na',
                                    'dataview' : nastr,
                                    'dataapprove' : nastr,
                                    'datareject' : nastr,
                                    'title' : "Task Updates",
                                    'message' : `Your request to assign the task <b>${tobj.taskname}</b> to <b>${accobj.firstname}</b> has been rejected! `
                                }
                                console.log("DELETE ME",aloptions);
                                const cb =()=>{
                                    const cb =()=>{
                                        callback();
                                        ACCUSER.Alert.fill();
                                    }
                                    ACCUSER.Alert.delete({"id" : data.id}, cb);
                                }
                                ACCUSER.Alert.create(aloptions, cb);
                            };
                            ACCUSER.getProject(data.projectid).Task.updateColumn({"taskid" : data.taskid, "columnname" : "status", "value" : "idle"}, callback2);
                        };
                        ACCUSER.getProject(data.projectid).TaskResource.updateColumnByTaskidAndAccid({"taskid" : data.taskid, "accid" : data.accid, "columnname" : "status", "value" : "idle"}, callback1);
                    };
                    ACCUSER.getProject(data.projectid).TaskResource.updateColumnByTaskidAndAccid({"taskid" : data.taskid, "accid" : data.accid, "columnname" : "assignment", "value" : "ok"}, callback0);
                }, 0);
            }
            ACCUSER.getProject(data.projectid).checkList("TaskResource", cb2);
        }
        ACCUSER.getProject(data.projectid).checkList("Task", cb1);

        
        
    }
}


function rd_ViewTask(data){
    // console.log('PEPEPET', data);
    setTimeout(() => {
        $('#loader').css('display', 'flex').show();
    }, 100);
    const rdata = JSON.parse(data);
    $('#nav-dashboard').click();

    setTimeout(() => {
        console.log('FIND NEXT TARGET');
        $('.project-manage-list-widget').each(function(){
            const prid = $(this).attr('prid');
            if(prid == rdata.projectid){
                $(this).click();
                setTimeout(() => {
                    $('#task-header-search-submit').click();
                    setTimeout(() => {
                        const tobj = ACCUSER.getProject(rdata.projectid).Task.getTaskObj(rdata.taskid);
                        $(`#tasklist_${tobj.planid}`).children('.tasklist-widget-title').children('span').click();
                        // console.log(`#tasklist_${tobj.planid}`);
                        setTimeout(() => {
                            $('#loader').css('display', 'none').hide();
                            eraseCookie("redirect-viewtask");
                        }, 0);
                    }, 0);
                }, 0);
            }
        });
    }, 0);
}
function rd_ViewTaskDispute(data){
    // console.log('PEPEPET', data);
    setTimeout(() => {
        $('#loader').css('display', 'flex').show();
    }, 100);
    const rdata = JSON.parse(data);
    $('#nav-dashboard').click();

    setTimeout(() => {
        console.log('FIND NEXT TARGET', rdata);
        $('.project-manage-list-widget').each(function(){
            const prid = $(this).attr('prid');
            if(prid == rdata.projectid){
                $(this).click();
                setTimeout(() => {
                    $('#project-view-boards-task').click();
                    setTimeout(() => {
                        const trobj = ACCUSER.getProject(rdata.projectid).TaskResource.getObjById(rdata.trid);
                        const tobj = ACCUSER.getProject(rdata.projectid).Task.getTaskObj(trobj.taskid);
                        console.log(trobj, tobj);
                        $('#taskboard-header-filter-datefrom').val(tobj.startdate);
                        $('#taskboard-header-filter-dateto').val('1y');
                        $('#taskboard-header-search-submit').click();
                        setTimeout(() => {
                            $(`#taskboard_${trobj.taskid}`).children('.taskboard-body-widget-icons-con').children('.taskboard-body-widget-icons-dispute').click();
                            eraseCookie("redirect-viewtask-dispute");
                        }, 0);
                    }, 0);
                }, 0);
            }
        });
    }, 0);
}



function alertHandleRedirect(){
    $.each(redirectlist, function(key, value){
        const rkey = getCookie(value.rkey);
        if(rkey){
            value.rfunc(rkey);
        }
    });
}

function getAlertObj(functionname){
    let obj = {};
    $.each(fnlist, function(key, value){
        if(value.functionname == functionname){
            obj = value;
        }
    });
    return obj;
}
function runAlert(options, callback){
    if(options.fn != "na"){
        const alobj = getAlertObj(options.fn);
        alobj.function(options.data, callback);
    }
    $('#alert').css('display', 'none').hide();
}



function AlertWorker(){
    setInterval(() => {
        const cb =()=>{
            ACCUSER.Alert.fill(); 
        }
        ACCUSER.checkList('Alert', cb, true);
    }, 30000);
}






$(document).on('click', '.alert-con-widget-h', function(){
    const fn = $(this).attr('fn');
    const type = $(this).attr('type');
    console.log($(this).attr('data'));
    const data = JSON.parse($(this).attr('data'));
    const alertid = $(this).attr('aid');
    data.id = alertid;
    data.type = type;
    const options = {
        "fn" : fn,
        "data" : data
    }
    const callback =()=>{
        console.log(options);
    }
    runAlert(options, callback)
});

$(document).on('click', '.alert-con-widget-delete', function(){
    const alertid = $(this).attr('aid');
    const cb =()=>{
        ACCUSER.Alert.fill();
    }
    ACCUSER.Alert.delete({"id" : alertid}, cb);
});


