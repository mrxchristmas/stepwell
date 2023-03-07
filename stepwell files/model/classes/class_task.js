// class TaskResource{
//     constructor(options){
//         this.id = options.id; 
//         this.taskid = options.taskid; 
//         this.type = options.type; 
//         this.projectid = options.projectid;
//         this.planid = options.planid;
//         this.supplierid = options.supplierid;
//         this.accid = options.accid;
//         this.hours = options.hours;
//         this.status = options.status;
//         this.suggesteddate = options.suggesteddate; 
//         this.assignment = options.assignment; 
//         this.usercomment = options.usercomment; 
//         this.pmcomment = options.pmcomment;
//         this.usrread = options.usrread;
//         this.pmread = options.pmread;
//         this.firstname = options.firstname;
//         this.lastname = options.lastname;
//         this.suppliername = options.suppliername;
//         this.task = undefined;
//         this.selid = undefined;

//         if(this.type == "hours"){
//             this.suppliername = undefined;
//             this.supplierid = undefined;
//             this.selid = options.accid;
//         }else if(this.type == "supplier"){
//             this.firstname = undefined;
//             this.lastname = undefined;
//             this.accid = undefined;
//             this.hours = 0;
//             this.assignment = undefined;
//             this.usercomment = undefined;
//             this.selid = options.supplierid;
//         }else if(this.type == "tm"){
//             this.firstname = undefined;
//             this.lastname = undefined;
//             this.accid = undefined;
//             this.assignment = undefined;
//             this.usercomment = undefined;
//             this.selid = options.supplierid;
//         }
//     }
//     fillTask(task){
//         this.task = task;
//     }
//     getId(){
//         if(this.type == "hours"){
//             return {
//                 "trid" : this.id,
//                 "type" : this.type,
//                 "id" : this.accid,
//                 "name" : `${this.firstname} ${this.lastname}`
//             }
//         }else if(this.type == "supplier"){
//             return {
//                 "trid" : this.id,
//                 "type" : this.type,
//                 "id" : this.supplierid,
//                 "name" : this.suppliername
//             }
//         }else if(this.type == "tm"){
//             return {
//                 "trid" : this.id,
//                 "type" : this.type,
//                 "id" : this.supplierid,
//                 "name" : this.suppliername
//             }
//         }
//     }

// }
// class TaskResourceList{
//     constructor(){
//         this.list = [];
//     }


//     fetchByProjectid(projectid, callback){
//         const cbsuccess=data=>{
//             let list = [];
//             $.each(data, function(key, value){
//                 if(value != 'error'){
//                     const options = {
//                         'id' : value.id,
//                         'taskid' : value.taskid,
//                         'type' : value.type,
//                         'projectid' : value.projectid,
//                         'planid' : value.planid,
//                         'supplierid' : value.supplierid,
//                         'accid' : value.accid,
//                         'hours' : value.hours,
//                         'status' : value.status,
//                         'suggesteddate' : value.suggesteddate,
//                         'assignment' : value.assignment,
//                         'usercomment' : value.usercomment,
//                         'pmcomment' : value.pmcomment,
//                         'usrread' : value.usrread,
//                         'pmread' : value.pmread,
//                         'firstname' : value.firstname,
//                         'lastname' : value.lastname,
//                         'suppliername' : value.suppliername
//                     };
//                     const x = new TaskResource(options);
//                     x.fillTask(resourceBoardTaskList.getTaskByTaskId(x.taskid));
//                     list[list.length] = x;
//                 }
//             });
//             this.list = list;
//         };
//         const cbcomplete=()=>{
//             callback();
//         };
//         capi_fetchTaskResourceByProjectId({"projectid" : projectid}, cbsuccess, cbcomplete);
//     }

//     getLength(){
//         return this.list.length;
//     }
//     getIdList(){
//         let alist = [];
//         for(i=0; i<this.list.length; i++){
//             const x = this.list[i].getId();
//             alist[alist.length] = x;
//         }
//         return alist;
//     }
//     getDistinctIdList(){
//         let l = this.getIdList();
//         let list = [];
//         for(let i=0; i<l.length; i++){
//             // console.log(l[i].id);
//             if(list.length == 0){
//                 list[0] = l[i];
//             }
//             let gate = true;
//             $.each(list, function(key, val){
//                 // console.log(val.id, l[i].id, val.id == l[i].id);
//                 if(val.id == l[i].id){
//                     gate = false;
//                 }
//             });
//             if(gate){
//                 list[list.length] = l[i];
//             }
//         }
//         list.sort((a, b) => (a.type > b.type) ? 1 : -1);


//         // console.log(list);
//         return list;
//     }
//     resourceBoardGetDatesByAccid(accid){
        
//         const startdates = [];
//         const enddates = [];
//         let hours = 0;
//         $.each(this.list, function(key, value){
//             if(value.selid == accid){
//                 hours += parseFloat(value.hours);
//                 const s = new Date(value.task.startdate);
//                 const e = new Date(value.task.enddate);
//                 s.setHours('00');
//                 s.setMinutes('00');
//                 s.setSeconds('00');
//                 s.setMilliseconds('00');
//                 e.setHours('00');
//                 e.setMinutes('00');
//                 e.setSeconds('00');
//                 e.setMilliseconds('00');

//                 startdates[startdates.length] = s;
//                 enddates[enddates.length] = e;
//             }
//         });

//         let min = startdates.reduce(function (a, b) { return a < b ? a : b; });
//         let max = enddates.reduce(function (a, b) { return a > b ? a : b; });

//         const minD = dateFns.format(
//             min,
//             'YYYY-MM-DD'
//         );
//         const maxD = dateFns.format(
//             max,
//             'YYYY-MM-DD'
//         );
//         return {
//             'startdate' : minD,
//             'enddate' : maxD,
//             'hours' : hours,
//             'days' : datediff(min, max)
//         }

//     }

//     resourceBoardGetTasksByAccid(accid){
//         let list = [];
//         $.each(this.list, function(key, value){
//             if(value.selid == accid){
//                 list[list.length] = value.task;
//             }
//         });
//         return list;
//     }
//     getTotalHoursOfTaskByAccid(taskid, accid){
//         let hours = 0;
//         $.each(this.list, function(key, value){
//             if(value.taskid == taskid && value.selid == accid){
//                 hours += parseFloat(value.hours);
//             }
//         });
//         return hours;
//     }
//     getProjectDates(projectid){
//         const startdates = [];
//         const enddates = [];
//         let totalHours = 0;
//         let userHours = 0;
//         $.each(this.list, function(key, value){
//             if(value.projectid == projectid){
//                 if(value.type == 'hours'){
//                     userHours += parseFloat(value.hours);
//                 }
//                 totalHours += parseFloat(value.hours);
//                 const s = new Date(value.task.startdate);
//                 const e = new Date(value.task.enddate);
//                 s.setHours('00');
//                 s.setMinutes('00');
//                 s.setSeconds('00');
//                 s.setMilliseconds('00');
//                 e.setHours('00');
//                 e.setMinutes('00');
//                 e.setSeconds('00');
//                 e.setMilliseconds('00');

//                 startdates[startdates.length] = s;
//                 enddates[enddates.length] = e;
//             }
//         });

//         let min = startdates.reduce(function (a, b) { return a < b ? a : b; });
//         let max = enddates.reduce(function (a, b) { return a > b ? a : b; });

//         const minD = dateFns.format(
//             min,
//             'YYYY-MM-DD'
//         );
//         const maxD = dateFns.format(
//             max,
//             'YYYY-MM-DD'
//         );
//         return {
//             'startdate' : minD,
//             'enddate' : maxD,
//             'totalhours' : totalHours,
//             'userhours' : userHours,
//             'days' : datediff(min, max),
//             'completedhours' : 15,
//             'variancehours' : (totalHours - 15)
//         }
//     }

//     resourceBoardTaskListHtmlByAccid(accid){
//         let tasklist = this.resourceBoardGetTasksByAccid(accid);
//         let dis = this;
//         let html = '';
//         $.each(tasklist, function(key, value){
//             let s = new Date(value.startdate);
//             let e = new Date(value.enddate);
//             s.setHours('00');
//             s.setMinutes('00');
//             s.setSeconds('00');
//             s.setMilliseconds('00');
//             e.setHours('00');
//             e.setMinutes('00');
//             e.setSeconds('00');
//             e.setMilliseconds('00');

//             let d = datediff(s, e);
//             let h = dis.getTotalHoursOfTaskByAccid(value.taskid, accid);
//             // console.log();
//             if(value.taskname != undefined){
//                 html += `
//                 <div class="tasklist-widget ${value.status}">
//                     <span class="title">${value.taskname}</span>
//                     <span class="hours">${h} Hours</span>
//                     <span class="startdate" title="Start Date">${value.startdate}</span>
//                     <span class="enddate" title="End Date">${value.enddate}</span>
//                     <span class="days" title="Total Days">${d} Days</span>
//                     <span class="blocking"></span>
//                 </div>
//             `;
//             }
            
//         });
//         return html;
//     }
//     resourceBoardFillAccounts(){
//         const data = this.getDistinctIdList();
//         const dis = this;
//         $('.resource-body-accountlist').empty();
//         $.each(data, function(key, value){
//             const dates = dis.resourceBoardGetDatesByAccid(value.id);
//             const tasklistHtml = dis.resourceBoardTaskListHtmlByAccid(value.id);
//             let type = '';
//             if(value.type == "hours"){
//                 type = 'Team';
//             }else if(value.type == "supplier"){
//                 type = 'Supplier';
//             }else if(value.type == "tm"){
//                 type = 'Time and Materials';
//             }
//             $('.resource-body-accountlist').append(`
//                 <div id="RB-accList_${value.id}" class="resource-body-accountlist-widget color-sc">
//                     <div class="step acc">
//                         <span class="name"><i class="fas fa-bars" status="closed"></i>${value.name}</span>
//                         <span class="type">${type}</span>
//                         <span class="hours">${dates.hours} Hours</span>
//                         <span class="sdate">${dates.startdate}</span>
//                         <span class="edate">${dates.enddate}</span>
//                         <span class="days">${dates.days} Days</span>
//                         <i class="fas fa-user-clock"></i>
//                     </div>
//                     <div class="step tasklist">
//                         ${tasklistHtml}
//                     </div>
//                 </div>
//             `);
//         });

//         $('.resource-body-accountlist-widget > .step.tasklist').hide();
//     }
//     resourceBoardFillFooter(projectid){ 
//         clearInterval(mainterval);
//         let dates = this.getProjectDates(projectid);

//         $('#resource-footer-hours-total').val(dates.totalhours);
//         $('#resource-footer-hours-startdate').val(dates.startdate);
//         $('#resource-footer-hours-enddate').val(dates.enddate);
//         $('#resource-footer-hours-completed').val(dates.completedhours);
//         $('#resource-footer-hours-user').val(dates.userhours);
//         $('#resource-footer-hours-variance').val(dates.variancehours);

//         const x = ( parseInt(dates.variancehours) / parseInt(dates.totalhours) ) * 100;
//         console.log('progressAnim', x);     
//         progressAnim(x);
//     }

    
// }
// class N_Task{
//     constructor(options){
//         this.taskid = options.taskid,
//         this.projectid = options.projectid,
//         this.planid = options.planid,
//         this.status = options.status,
//         this.taskname = options.taskname,
//         this.startdate = options.startdate,
//         this.enddate = options.enddate
//     }
//     getList(){
//         return {
//             "taskid" :  this.taskid,
//             "projectid" :  this.projectid,
//             "planid" :  this.planid,
//             "status" :  this.status,
//             "taskname" :  this.taskname,
//             "startdate" :  this.startdate,
//             "enddate" :  this.enddate
//         }
//     }

// }
// class N_TaskList{
//     constructor(){
//         this.list = [];
//     }
//     getTaskByTaskId(taskid){
//         let ret = {};
//         $.each(this.list, function(key, value){
//             if(value.taskid == taskid){
//                 ret = value;
//             }
//         });
//         return ret;
//     }
//     fetchByProjectid(projectid, callback){
//         const cbsuccess=data=>{
//             const list = [];
//             $.each(data, function(key, value){
//                 if(value != 'error'){
//                     const options = {
//                         'taskid' : value.taskid,
//                         'projectid' : value.projectid,
//                         'planid' : value.planid,
//                         'status' : value.status,
//                         'taskname' : value.taskname,
//                         'startdate' : value.startdate,
//                         'enddate' : value.enddate
//                     };
//                     const x = new N_Task(options);
//                     list[list.length] = x;
//                 }
//             });
//             this.list = list;
//         };
//         const cbcomplete=()=>{
//             callback();
//         };
//         capi_fetchTaskByProjectid({"projectid" : projectid}, cbsuccess, cbcomplete);
//     }

// }

class P_Task{
    constructor(options){
        this.list = this.fetch(options);
    }

    fetch(options){
        const list = [];
        const cbsuccess=data=>{
            $.each(data, function(key, value){
                if(value != 'error'){
                    const options = {
                        'taskid' : value.taskid,
                        'projectid' : value.projectid,
                        'planid' : value.planid,
                        'status' : value.status,
                        'taskname' : value.taskname,
                        'startdate' : value.startdate,
                        'enddate' : value.enddate
                    };
                    list[list.length] = options;
                }
            });
        };
        const cbcomplete=()=>{
            options.callback('Fetching Tasks');
        };
        capi_fetchTaskByProjectid(options, cbsuccess, cbcomplete);
        return list;
    }
    getMinMaxDates(taskid){
        const startdates = [];
        const enddates = [];

        $.each(this.list, function(key, value){
            if(value.taskid == taskid){
                const s = new Date(`${value.startdate} 00:00:00`);
                const e = new Date(`${value.enddate} 00:00:00`);
                startdates[startdates.length] = s;
                enddates[enddates.length] = e;
            }
        });

        // let minD;
        // let maxD;
        setTimeout(() => {
            
        }, 0);
        const min = startdates.reduce(function (a, b) { return a < b ? a : b; });
        const max = enddates.reduce(function (a, b) { return a > b ? a : b; });

        const minD = dateFns.format(
            min,
            'YYYY-MM-DD'
        );
        const maxD = dateFns.format(
            max,
            'YYYY-MM-DD'
        );

        return {
            "startdate" : minD,
            "enddate" : maxD,
        }
        
    }
    getprojectMinMaxDates(){
        const startdates = [];
        const enddates = [];

        $.each(this.list, function(key, value){
            const s = new Date(`${value.startdate} 00:00:00`);
            const e = new Date(`${value.enddate} 00:00:00`);
            startdates[startdates.length] = s;
            enddates[enddates.length] = e;
        });

        // let minD;
        // let maxD;
        setTimeout(() => {
            
        }, 0);
        let min, max, minD, maxD;

        if(startdates.length > 0 && enddates.length > 0){
            min = startdates.reduce(function (a, b) { return a < b ? a : b; });
            max = enddates.reduce(function (a, b) { return a > b ? a : b; });

            minD = dateFns.format(
                min,
                'YYYY-MM-DD'
            );
            maxD = dateFns.format(
                max,
                'YYYY-MM-DD'
            );
        }else{
            minD = "0000-00-00";
            maxD = "0000-00-00";
        }

        return {
            "startdate" : minD,
            "enddate" : maxD,
        }
        
    }
    getTaskObj(taskid){
        return this.list.find(obj => obj.taskid == taskid);
    }
    getTasks(){
        return this.list;
    }

    create(options, callback){
        const dis = this;
        const cbsuccess=()=>{
            const params = {
                'taskid' : options.taskid,
                'projectid' : options.projectid,
                'planid' : options.planid,
                'status' : 'idle',
                'taskname' : options.taskname,
                'startdate' : options.startdate,
                'enddate' : options.enddate
            };
            let addGate = true;
            $.each(this.list, function(key, value){
                if(value.taskid == params.taskid){
                    addGate = false;
                    dis.list[key]["taskname"] = params.taskname;
                    dis.list[key]["startdate"] = params.startdate;
                    dis.list[key]["enddate"] = params.enddate;
                }
            });
            if(addGate){
                this.list[this.list.length] = params;
            }
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createTask(options, cbsuccess, cbcomplete);
    }
    addObjToList(options){
        const params = {
            'taskid' : options.taskid,
            'projectid' : options.projectid,
            'planid' : options.planid,
            'status' : 'idle',
            'taskname' : options.taskname,
            'startdate' : options.startdate,
            'enddate' : options.enddate
        };
        this.list[this.list.length] = params;
    }
    updateTaskDates(options, callback){
        const dis = this;
        const cbsuccess=data=>{
            console.log(data);
            $.each(this.list, function(key, value){
                if(value.taskid == options.taskid){
                    dis.list[key][options.startdate] = options.startdate;
                    dis.list[key][options.enddate] = options.enddate;
                }
            });
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_updateTaskDates(options, cbsuccess, cbcomplete);
    }
    updateColumn(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const dis = this;
            $.each(this.list, function(key, value){
                if(value.taskid == options.taskid){
                    dis.list[key][options.columnname] = options.value;
                }
            });
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_updateTaskColumn(options, cbsuccess, cbcomplete);
    }
    delete(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const d = $.grep(this.list, function(e){ 
                return e.taskid != options.taskid; 
            });
            this.list = d;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_deleteTask(options, cbsuccess, cbcomplete);
    }

}
class P_TaskResource{
    constructor(options){
        this.list = this.fetch(options);
    }
    fetch(options){
        let list = [];
        const cbsuccess=data=>{

            $.each(data, function(key, value){
                if(value != 'error'){
                    const options = {
                        'id' : value.id,
                        'taskid' : value.taskid,
                        'type' : value.type,
                        'projectid' : value.projectid,
                        'planid' : value.planid,
                        'supplierid' : value.supplierid,
                        'accid' : value.accid,
                        'mapaccid' : value.mapaccid,
                        'hours' : value.hours,
                        'status' : value.status,
                        'suggesteddate' : value.suggesteddate,
                        'assignment' : value.assignment,
                        'usercomment' : value.usercomment,
                        'pmcomment' : value.pmcomment,
                        'usrread' : value.usrread,
                        'pmread' : value.pmread,
                        'firstname' : value.firstname,
                        'lastname' : value.lastname,
                        'suppliername' : value.suppliername
                    };

                    list[list.length] = options;
                }
            });
        };
        const cbcomplete=()=>{
            options.callback('Fetching Task Resources');
        };
        capi_fetchTaskResourceByProjectId(options, cbsuccess, cbcomplete);
        return list;
    }

    
    create(options, callback){
        // console.log(options);
        const cbsuccess=data=>{
            console.log(data);
            const params = {
                'id' : options.trid,
                'taskid' : options.taskid,
                'type' : options.type,
                'projectid' : options.projectid,
                'planid' : options.planid,
                'supplierid' : options.supplierid,
                'accid' : options.accid,
                'mapaccid' : null,
                'hours' : options.hours,
                'status' : 'idle',
                'suggesteddate' : null,
                'assignment' : 'ok',
                'usercomment' : null,
                'pmcomment' : null,
                'usrread' : null,
                'pmread' : null,
                'firstname' : options.firstname,
                'lastname' : options.lastname,
                'suppliername' : options.suppliername
            };
            this.list[this.list.length] = params;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createTaskResource(options, cbsuccess, cbcomplete);
    }
    delete(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const d = $.grep(this.list, function(e){ 
                return e.id != options.id; 
            });
            this.list = d;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_deleteTaskResource(options, cbsuccess, cbcomplete);
    }

    
    addObjToList(options){
        const params = {
            'id' : options.trid,
            'taskid' : options.taskid,
            'type' : options.type,
            'projectid' : options.projectid,
            'planid' : options.planid,
            'supplierid' : options.supplierid,
            'accid' : options.accid,
            'mapaccid' : null,
            'hours' : options.hours,
            'status' : 'idle',
            'suggesteddate' : null,
            'assignment' : 'ok',
            'usercomment' : null,
            'pmcomment' : null,
            'usrread' : null,
            'pmread' : null,
            'firstname' : options.firstname,
            'lastname' : options.lastname,
            'suppliername' : options.suppliername
        };
        this.list[this.list.length] = params;
    }
    getObj(){
        return this.list;
    }
    getObjById(id){
        return this.list.find(obj => obj.id == id);
    }
    getObjByAccid(accid){
        let list = [];
        $.each(this.list, function(key, value){
            if(value.accid == accid || value.supplierid == accid){
                list[list.length] = value;
            }
        });
        return list;
    }
    getObjByTaskId(taskid){
        let list = [];
        $.each(this.list, function(key, value){
            if(value.taskid == taskid){
                list[list.length] = value;
            }
        });
        return list;
    }
    getTaskByOwner(accid){
        let list = [];
        $.each(this.list, function(key, value){
            if(value.accid == accid){
                list[list.length] = value;
            }
        });
        return list;
    }
    updateColumn(options, callback){
        const dis = this;
        const cbsuccess=data=>{
            console.log(data);
            $.each(this.list, function(key, value){
                if(value.id == options.trid){
                    dis.list[key][options.columnname] = options.value;
                }
            });
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_updateTaskResourceColumnById(options, cbsuccess, cbcomplete);
    }
    getChartHours(){
        let total = 0;
        let idle = 0;
        let working = 0;
        let done = 0;
        $.each(this.list, function(key, value){
            if(value.status == 'work'){
                if(isNaN(parseFloat(value.hours))){
                    working += 0;
                }else{
                    working += parseFloat(value.hours);
                }
            }else if(value.status == 'idle'){
                if(isNaN(parseFloat(value.hours))){
                    idle += 0;
                }else{
                    idle += parseFloat(value.hours);
                }
            }else if(value.status == 'done'){
                if(isNaN(parseFloat(value.hours))){
                    done += 0;
                }else{
                    done += parseFloat(value.hours);
                }
            }

            
            if(isNaN(parseFloat(value.hours))){
                total += 0;
            }else{
                total += parseFloat(value.hours);
            }
        });
        return [
            ['Task' , 'Hours', { role: 'style' }],
            // ['total' , parseFloat(total)],
            [`Not Started : ${idle} Hours` , parseFloat(idle), 'grey'],
            [`In Progress : ${working} Hours` , parseFloat(working), GREEN_PALETTE],
            [`Completed : ${done} Hours` , parseFloat(done), 'color: #e5e4e2']
        ]

        // return[
        //     ['Task', 'Hours per Day'],
        //     ['Work', 8],
        //     ['Eat', 2],
        //     ['TV', 4],
        //     ['Gym', 2],
        //     ['Sleep', 8]
        // ]

    }
    getProjectProgress(){
        let total = 0;
        let done = 0;
        $.each(this.list, function(key, value){
            if(value.status.includes('tdone')){
                if(isNaN(parseFloat(value.hours))){
                    done += 0;
                }else{
                    done += parseFloat(value.hours);
                }
            }
            
            if(isNaN(parseFloat(value.hours))){
                total += 0;
            }else{
                total += parseFloat(value.hours);
            }
        });
        const progress = ((done / total) * 100);
        return progress.toFixed(2);
    }
    getProjectAllocatedHours(){
        let allocated = 0;
        $.each(this.list, function(key, value){
            if(isNaN(parseFloat(value.hours))){
                allocated += 0;
            }else{
                allocated += parseFloat(value.hours);
            }
        });
        return allocated;
    }
    getTaskResource(){
        return this.list;
    }
    getPmMessage(taskid){
        let ret = '';
        $.each(this.list, function(key, value){
            if(value.taskid == taskid){
                ret =  value.pmcomment;
            }
        });
        return ret;
    }
    updatePmMessage(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const dis = this;
            $.each(this.list, function(key, value){
                if(value.taskid == options.taskid){
                    console.log('HOHOHO', dis.list[key]['pmcomment']);
                    dis.list[key]['pmcomment'] = options.message;
                }
            });
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_updatePMComment(options, cbsuccess, cbcomplete);
    }
    getTaskResourceByTaskid(taskid){
        let list = [];
        $.each(this.list, function(key, value){
            if(value.taskid == taskid){
                list[list.length] = value;
            }
        });
        return list;
    }
    updateColumnByTaskid(options, callback){
        const dis = this;
        const cbsuccess=data=>{
            console.log(data);
            $.each(this.list, function(key, value){
                if(value.taskid == options.taskid){
                    dis.list[key][options.columnname] = options.value;
                }
            });
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_updateTaskResourceColumnByTaskId(options, cbsuccess, cbcomplete);
    }
    updateAccid(options, callback){
        const dis = this;
        const cbsuccess=data=>{
            console.log(data);
            $.each(this.list, function(key, value){
                if(value.taskid == options.taskid && value.accid == options.oldaccid){
                    dis.list[key]["accid"] = options.newaccid;
                }
            });
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_updateTaskResourceAccid(options, cbsuccess, cbcomplete);
    }
    updateColumnByTaskidAndAccid(options, callback){
        const dis = this;
        const cbsuccess=data=>{
            console.log(data);
            $.each(this.list, function(key, value){
                if(value.taskid == options.taskid && value.accid == options.accid){
                    dis.list[key][options.columnname] = options.value;
                }
            });
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_updateTaskResourceColumnByTaskidAndAccid(options, cbsuccess, cbcomplete);
    }
    getIdList(){
        let list = [];
        $.each(this.list, function(key, value){
            if(value.type == "hours"){
                list[list.length] = {
                    "id" : value.accid,
                    "type" : value.type,
                    "name" : `${value.firstname} ${value.lastname}`
                }
            }else if(value.type == "supplier"){
                list[list.length] = {
                    "id" : value.supplierid,
                    "type" : value.type,
                    "name" : value.suppliername
                }
            }else if(value.type == "tm"){
                list[list.length] = {
                    "id" : value.supplierid,
                    "type" : value.type,
                    "name" : value.suppliername
                }
            }
        });
        return list;
    }
    getDistinctIdList(){
        let l = this.getIdList();
        let list = [];
        $.each(l, function(key, value){
            if(list.length == 0){
                list[0] = value;
            }
            let gate = true;
            $.each(list, function(key, val){
                // console.log(val.id, l[i].id, val.id == l[i].id);
                if(val.id == value.id){
                    gate = false;
                }
            });
            if(gate){
                list[list.length] = value;
            }
        });
        list.sort((a, b) => (a.type > b.type) ? 1 : -1);
        return list;
    }
    getDistinctAccountIdList(){
        let list = [];
        $.each(this.list, function(key, value){
            if(value.type == "hours"){
                if(list.length == 0){
                    list[0] = value;
                }
                let gate = true;
                $.each(list, function(key, val){
                    // console.log(val.id, l[i].id, val.id == l[i].id);
                    if(val.accid == value.accid){
                        gate = false;
                    }
                });
                if(gate){
                    list[list.length] = value;
                }
            }
        });
        return list;
    }
    getDistinctSupplierIdList(){
        let list = [];
        // need to improve/ must differentiate same suppliers type. can have tm or lumpsum
        $.each(this.list, function(key, value){
            if(value.type == "tm" || value.type == "supplier"){
                if(list.length == 0){
                    list[0] = value;
                }
                let gate = true;
                $.each(list, function(key, val){
                    // console.log(val.id, l[i].id, val.id == l[i].id);
                    if(val.supplierid == value.supplierid && val.type == value.type){
                        gate = false;
                    }
                });
                if(gate){
                    list[list.length] = value;
                }
            }
        });
        return list;
    }

    getTotalHoursOfTaskByAccid(options){
        let hours = 0;
        $.each(this.list, function(key, value){
            if(value.taskid == options.taskid && (value.accid == options.accid || value.supplierid == options.accid)){
                hours += (isNaN(parseFloat(value.hours)) ? 0 : parseFloat(value.hours));
            }
        });
        return hours;
    }
    getAccidAllotedHoursByProjectid(options){
        let hours = 0;
        $.each(this.list, function(key, value){
            if(value.accid == options.accid){
                hours += (isNaN(parseFloat(value.hours)) ? 0 : parseFloat(value.hours));
            }
        });
        return hours;
    }
    getSupplierIdAllotedHoursByProjectid(options){
        let hours = 0;
        $.each(this.list, function(key, value){
            if(value.supplierid == options.supplierid && value.type == 'tm'){
                hours += (isNaN(parseFloat(value.hours)) ? 0 : parseFloat(value.hours));
            }
        });
        return hours;
    }
    getDistinctSupplierList(){
        let list = [];
        $.each(this.list, function(key, value){
            if(value.supplierid != null && value.supplierid != undefined && value.supplierid != ""){
                if(list.length == 0){
                    list[0] = value;
                }
                let gate = true;
                $.each(list, function(key, val){
                    // console.log(val.id, l[i].id, val.id == l[i].id);
                    if(val.supplierid == value.supplierid){
                        gate = false;
                    }
                });
                if(gate){
                    list[list.length] = {
                        "supplierid" : value.supplierid,
                        "suppliername" : value.suppliername,
                    };
                }
            }
        });
        list.sort((a, b) => (a.type > b.type) ? 1 : -1);
        return list;
    }
    mapAccid(options){
        $.each(this.list, function(key, value){
            if(value.accid == options.tmpid){
                value.accid = options.accid;
                value.firstname = options.name;
                value.lastname = '';
            }
        });
        return;
    }
    mapSupplierid(options){
        $.each(this.list, function(key, value){
            if(value.supplierid == options.tmpid){
                value.supplierid = options.supid;
                value.suppliername = options.name;
            }
        });
        return;
    }

    


}

class PlanningDoc{
    constructor(options){
        this.list = this.fetch(options);
    }

    fetch(options){
        let list = [];
        const cbsuccess=data=>{
            $.each(data, function(key, value){
                const options = {
                    "planningid" : value.planningid,
                    "projectid" : value.projectid,
                    "planningtitle" : value.planningtitle,
                    "draftsd" : value.draftsd,
                    "drafted" : value.drafted,
                    "reviewed" : value.reviewed,
                    "approvaled" : value.approvaled,
                    "executioned" : value.executioned,
                    "postapprovaled" : value.postapprovaled,
                    "actualid" : value.actualid,
                    "milestone" : value.milestone,
                    
                    "linkid" : value.linkid,
                    "linkstage" : value.linkstage,
                    "producessorid" : value.producessorid,
                    "producessorstage" : value.producessorstage,
                    "actualtitle" : value.actualtitle,
                    "taskid" : value.taskid,
                    "taskstatus" : value.taskstatus,
                    "taskname" : value.taskname,
                    "tasksd" : value.tasksd,
                    "tasked" : value.tasked
                };
                list[list.length] = options;
            }); 
        };
        const cbcomplete=()=>{
            options.callback('Fetching Planning Documents');
            console.log('Fetch Complete');
        };
        capi_fetchBuildSchedule(options.projectid, cbsuccess, cbcomplete );
        return list;
    }

    getObjByPlanningId(options){
        return this.list.find(obj => obj.planningid == options.planningid);
    }
}




class NewTask{
    constructor(){
        this.list = [];
    }
    addTask(options){
        this.list[this.list.length] = {
            "taskid" : options.taskid,
            "projectid" : options.projectid,
            "planid" : options.planid,
            "status" : options.status,
            "taskname" : options.taskname,
            "startdate" : options.startdate,
            "enddate" : options.enddate
        }
    }
    
    getAllTasks(){
        return this.list;
    }
    getTaskById(tid){
        $.each(this.list, function(key, value){
            if(value.taskid == tid){
                return value;
            }
        });
        return undefined;
    }
    getTaskByName(t){
        $.each(this.list, function(key, value){
            if(value.taskname == t){
                return value;
            }
        });
        return undefined;
    }
    getAllResources(){
        return this.resource.list;
    }
}
class Resource{
    constructor(){
        this.list = [];
    }
    addResource(options){
        this.list[this.list.length] = {
            "id" : options.id, 
            "taskid" : options.taskid, 
            "type" : options.type, 
            "projectid" : options.projectid,
            "planid" : options.planid,
            "supplierid" : options.supplierid,
            "accid" : options.accid,
            "hours" : options.hours,
            "status" : options.status,
            "suggesteddate" : options.suggesteddate, 
            "assignment" : options.assignment, 
            "usercomment" : options.usercomment, 
            "pmcomment" : options.pmcomment,
            "usrread" : options.usrread,
            "pmread" : options.pmread,
            "firstname" : options.firstname,
            "lastname" : options.lastname,
            "suppliername" : options.suppliername,
            "task" : undefined,
            "selid" : undefined
        }
        
        if(this.type == "hours"){
            this.list[this.list.length].suppliername = undefined;
            this.list[this.list.length].supplierid = undefined;
            this.list[this.list.length].selid = options.accid;
        }else if(this.type == "supplier"){
            this.list[this.list.length].firstname = undefined;
            this.list[this.list.length].lastname = undefined;
            this.list[this.list.length].accid = undefined;
            this.list[this.list.length].hours = 0;
            this.list[this.list.length].assignment = undefined;
            this.list[this.list.length].usercomment = undefined;
            this.list[this.list.length].selid = options.supplierid;
        }else if(this.type == "tm"){
            this.list[this.list.length].firstname = undefined;
            this.list[this.list.length].lastname = undefined;
            this.list[this.list.length].accid = undefined;
            this.list[this.list.length].assignment = undefined;
            this.list[this.list.length].usercomment = undefined;
            this.list[this.list.length].selid = options.supplierid;
        }
    }
    
    getId(){
        if(this.type == "hours"){
            return {
                "trid" : this.id,
                "type" : this.type,
                "id" : this.accid,
                "name" : `${this.firstname} ${this.lastname}`
            }
        }else if(this.type == "supplier"){
            return {
                "trid" : this.id,
                "type" : this.type,
                "id" : this.supplierid,
                "name" : this.suppliername
            }
        }else if(this.type == "tm"){
            return {
                "trid" : this.id,
                "type" : this.type,
                "id" : this.supplierid,
                "name" : this.suppliername
            }
        }
    }

}











