class Project{
	constructor(options){
		this.projectid = options.projectid;
		this.companyid = options.companyid;
		this.ownerid = options.ownerid;
		this.creator = options.creator;
		this.projectname = options.projectname;
		this.reference = options.reference;
        this.status = options.status;
        this.groupid = options.groupid;
        this.callback = options.fetchCallback;
        
       
        this.ConnectByProjectId = options.ConnectByProjectId == undefined ? undefined : options.ConnectByProjectId; 
        this.ConnectByResource = options.ConnectByResource == undefined ? undefined : options.ConnectByResource; 
        
        this.Minutes = options.Minutes == undefined ? undefined : options.Minutes; 
        this.Notes = options.Notes == undefined ? undefined : options.Notes; 
        this.Register = options.Register == undefined ? undefined : options.Register; 
        this.Task = options.Task == undefined ? undefined : options.Task; 
        this.TaskResource = options.TaskResource == undefined ? undefined : options.TaskResource; 
        this.Timesheet = options.Timesheet == undefined ? undefined : options.Timesheet; 
        this.Supplier = options.Supplier == undefined ? undefined : options.Supplier; 
        this.AccountRate = options.AccountRate == undefined ? undefined : options.AccountRate; 
        this.AccountRole = options.AccountRole == undefined ? undefined : options.AccountRole; 
        this.SupplierRate = options.SupplierRate == undefined ? undefined : options.SupplierRate; 
        this.ScheduleDocument = options.ScheduleDocument == undefined ? undefined : options.ScheduleDocument; 
        this.ActualDocument = options.ActualDocument == undefined ? undefined : options.ActualDocument; 
        this.Request = options.Request == undefined ? undefined : options.Request; 
        this.Item = options.Item == undefined ? undefined : options.Item; 
        this.Budget = options.Budget == undefined ? undefined : options.Budget; 
        this.Invoice = options.Invoice == undefined ? undefined : options.Invoice; 
        this.Prerequest = options.Prerequest == undefined ? undefined : options.Prerequest; 
        this.TmpAccount = options.TmpAccount == undefined ? undefined : options.TmpAccount; 
        this.TmpSupplier = options.TmpSupplier == undefined ? undefined : options.TmpSupplier; 

    }
    getMinData(){
        return{
            "projectid" : this.projectid,
            "projectname" : this.projectname
        }
    }
    getData(){
        return{
            "projectid" : this.projectid,
            "companyid" : this.companyid,
            "ownerid" : this.ownerid,
            "creator" : this.creator,
            "projectname" : this.projectname,
            "reference" : this.reference,
            "status" : this.status,
            "groupid" : this.groupid
        }
    }
    updateProjectGroupId(options, callback){
        const cbsuccess =data=>{
            console.log(data);
            this.groupid = options.groupid;
        }
        capi_updateProjectGroupId(options, cbsuccess, callback);
    }
    fetchConnectByProjectId(options){
        let list = [];
        const cbsuccess=data=>{
            $.each(data, function(key, value){
                let photo = '';
                if(value.photo != 'na'){
                    photo = value.photo;
                }else{
                    photo = 'lib/images/avatardefault.png';
                }
                const obj = {
                    "id" : value.id,
                    "firstname" : value.firstname,
                    "lastname" : value.lastname,
                    "photo" : photo
                }
                list[list.length] = obj;
                
            });
        };
        const cbcomplete=()=>{
            const note = 'Fetching Accounts Connected to Project';
            options.callback(note);
        };
        capi_fetchProjectConnectByProjectId(options, cbsuccess, cbcomplete);
        return list;
    }
    fetchConnectByResource(options){
        let list = [];
        const cbsuccess=data=>{
            $.each(data, function(key, value){
                let photo = '';
                if(value.photo != 'na'){
                    photo = value.photo;
                }else{
                    photo = 'lib/images/avatardefault.png';
                }
                const obj = {
                    "accid" : value.accid,
                    "firstname" : value.firstname,
                    "lastname" : value.lastname,
                    "photo" : photo
                }
                list[list.length] = obj;
            });
        };
        const cbcomplete=()=>{
            const note = 'Fetching Accounts Connected to Resource';
            options.callback(note);
        };
        capi_fetchAccountsByProjectResource(options, cbsuccess, cbcomplete);
        return list;
    }
    fillProjectConnect(){
        setTimeout(() => {
            $('#project-launch-list').empty();
            console.log(this.ConnectByProjectId,'-----------');
            $.each(this.ConnectByProjectId, function(key, value){
                let photo = '';
                if(value.photo != 'na'){
                    photo = value.photo;
                }else{
                    photo = 'lib/images/avatardefault.png';
                }
                const html = `<span zid="${value.id}" gn=" " ph="${photo}" fn="${value.firstname}" ln="${value.lastname}" class="project-launch-list-widget btn-shadow" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};">${value.firstname} ${value.lastname}</span>`;
                $('#project-launch-list').append(html);
            });
        }, 0); 
    }
    getConnectByResource(){
        return this.ConnectByResource;
    }
    createTmpAccount(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = {
                'id' : options.id,
                'projectid' : options.projectid,
                'name' : options.name,
                'rate' : '0',
                'role' : null,
                'mapaccid' : null
            };
            this.TmpAccount[this.TmpAccount.length] = obj;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createTmpAccount(options, cbsuccess, cbcomplete);
    }
    createTmpSupplier(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = {
                'id' : options.id,
                'projectid' : options.projectid,
                'name' : options.name
            };
            this.TmpSupplier[this.TmpSupplier.length] = obj;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createTmpSupplier(options, cbsuccess, cbcomplete);
    }
    fillSelectTagWithConnectedAccount(selector){
        selector.empty();
        $.each(this.ConnectByProjectId, function(key, value){
            selector.append(`<option value="${value.id}">${value.firstname} ${value.lastname}</option>`);
        });
    }
    fillSelectTagWithTmpAccount(selector){
        selector.empty();
        $.each(this.TmpAccount, function(key, value){
            selector.append(`
                <option value="${value.id}">${value.name}</option>
            `);
        });
    }
    fillSelectTagWithTmpSupplier(selector){
        selector.empty();
        $.each(this.TmpSupplier, function(key, value){
            selector.append(`
                <option value="${value.id}">${value.name}</option>
            `);
        });
    }
    
    connectUsertoProject(obj){
        this.ConnectByProjectId[this.ConnectByProjectId.length] = obj;
    }

    getTasksByOwner(accid){
        const taskResouceList = this.TaskResource.getTaskByOwner(accid);
        const dis = this;
        const list = [];
        $.each(taskResouceList, function(key, value){
            const task = dis.Task.getTaskObj(value.taskid);
            list[list.length] = {
                'taskid' : value.taskid, 
                'taskname' : task.taskname, 
                'projectid' : value.projectid,
                'enddate' : task.enddate,
                'suggesteddate' : value.suggesteddate,
                'ownerid' : value.accid,
                'title' : undefined,
                'message' : undefined
            };
        });
        return list;
    }

    getTmpAccObj(){
        return this.TmpAccount;
    }
    getTmpSupObj(){
        return this.TmpSupplier;
    }
    getTmpAccountObj(id){
        let ret = {};
        $.each(this.TmpAccount, function(key, value){
            if(value.id == id){
                ret = value;
            }
        });
        if(ret == {}){
            ret = {
                "response" : "error"
            }
        }
        return ret;
    }
    getTmpSupplierObj(id){
        let ret = {};
        // console.log(id, this.TmpSupplier);
        $.each(this.TmpSupplier, function(key, value){
            if(value.id == id){
                ret = value;
            }
        });
        if(ret == {}){
            ret = {
                "response" : "error"
            }
        }
        return ret;
    }
    getConnectObjById(id){
        let obj = this.ConnectByProjectId.find(obj => obj.id == id);
        if(obj == undefined){
            obj = this.ConnectByResource.find(obj => obj.id == id);
        }
        return obj;
    }
    updateStatus(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            this.status = options.status;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_updateProjectStatus(options, cbsuccess, cbcomplete);
    }
    updateOwner(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            this.ownerid = options.ownerid;
        };
        capi_updateProjectOwner(options, cbsuccess, callback);
    }
    updateTmpAccountRateRoll(options, callback){
        let obj = this.TmpAccount.find(obj => obj.id == options.id);
        const cbsuccess=data=>{
            console.log(data);
            obj.rate = options.rate;
            obj.role = options.role;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createTmpAccountRateRoll(options, cbsuccess, cbcomplete);
    }
    mapDocument(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            // NEED TO UPDATE SCHEDULEDOCUMENT AND ACTUALDOCUMENT
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_updateDocumentMapping(options, cbsuccess, cbcomplete);
    }
    
    updateTmpAccMapAccIdById(options){
        let obj = this.TmpAccount.find(obj => obj.id == options.id);
        obj.mapaccid = options.mapaccid;
    }


    checkList(list, callback, reset=false){
        const dis = this;
        if(list == 'ConnectByProjectId'){
            if(dis.ConnectByProjectId == undefined && !reset){
                dis.ConnectByProjectId = dis.fetchConnectByProjectId({"projectid" : dis.projectid, "callback" : callback});
            }else if(reset){
                dis.ConnectByProjectId = dis.fetchConnectByProjectId({"projectid" : dis.projectid, "callback" : callback});
            }else{
                callback("Data Already Fetched");
            }
        }else if(list == 'ConnectByResource'){
            if(dis.ConnectByResource == undefined && !reset){
                dis.ConnectByResource = dis.fetchConnectByResource({"projectid" : dis.projectid, "callback" : callback});
            }else if(reset){
                dis.ConnectByResource = dis.fetchConnectByResource({"projectid" : dis.projectid, "callback" : callback});
            }else{
                callback("Data Already Fetched");
            }
        }else if(list == 'Minutes'){
            if(dis.Minutes == undefined && !reset){
                dis.Minutes = new ProjectMinutes({"projectid" : dis.projectid, "ownerid" : ACCUSER.id, "callback" : callback});
            }else if(reset){
                dis.Minutes = new ProjectMinutes({"projectid" : dis.projectid, "ownerid" : ACCUSER.id, "callback" : callback});
            }else{
                callback("Data Already Fetched");
            }
        }else if(list == 'Notes'){
            if(dis.Notes == undefined && !reset){
                dis.Notes = new ProjectRegisterList({"projectid" : dis.projectid, "ownerid" : __ID, "type" : "notes", "callback" : callback});
            }else if(reset){
                dis.Notes = new ProjectRegisterList({"projectid" : dis.projectid, "ownerid" : __ID, "type" : "notes", "callback" : callback});
            }else{
                callback("Data Already Fetched");
            }
        }else if(list == 'Register'){
            if(dis.Register == undefined && !reset){
                dis.Register = new ProjectRegisterList({"projectid" : dis.projectid, "ownerid" : __ID, "type" : "register", "callback" : callback});
            }else if(reset){
                dis.Register = new ProjectRegisterList({"projectid" : dis.projectid, "ownerid" : __ID, "type" : "register", "callback" : callback});
            }else{
                callback("Data Already Fetched");
            }
        }else if(list == 'Task'){
            if(dis.Task == undefined && !reset){
                dis.Task = new P_Task({"projectid" : dis.projectid, "callback" : callback});
            }else if(reset){
                dis.Task = new P_Task({"projectid" : dis.projectid, "callback" : callback});
            }else{
                callback("Data Already Fetched");
            }
        }else if(list == 'TaskResource'){
            if(dis.TaskResource == undefined && !reset){
                dis.TaskResource = new P_TaskResource({"projectid" : dis.projectid, "callback" : callback});
            }else if(reset){
                dis.TaskResource = new P_TaskResource({"projectid" : dis.projectid, "callback" : callback});
            }else{
                callback("Data Already Fetched");
            }
        }else if(list == 'Timesheet'){
            if(dis.Timesheet == undefined && !reset){
                dis.Timesheet = new ProjectTimesheet({"projectid" : dis.projectid, "callback" : callback});
            }else if(reset){
                dis.Timesheet = new ProjectTimesheet({"projectid" : dis.projectid, "callback" : callback});
            }else{
                callback("Data Already Fetched");
            }
        }else if(list == 'Supplier'){
            if(dis.Supplier == undefined && !reset){
                dis.Supplier = new P_Supplier({"projectid" : dis.projectid, "callback" : callback});
            }else if(reset){
                dis.Supplier = new P_Supplier({"projectid" : dis.projectid, "callback" : callback});
            }else{
                callback("Data Already Fetched");
            }
        }else if(list == 'AccountRate'){
            if(dis.AccountRate == undefined && !reset){
                dis.AccountRate = new P_AccountRate({"projectid" : dis.projectid, "callback" : callback});
            }else if(reset){
                dis.AccountRate = new P_AccountRate({"projectid" : dis.projectid, "callback" : callback});
            }else{
                callback("Data Already Fetched");
            }
        }else if(list == 'AccountRole'){
            if(dis.AccountRole == undefined && !reset){
                dis.AccountRole = new P_AccountRole({"projectid" : dis.projectid, "callback" : callback});
            }else if(reset){
                dis.AccountRole = new P_AccountRole({"projectid" : dis.projectid, "callback" : callback});
            }else{
                callback("Data Already Fetched");
            }
        }else if(list == 'SupplierRate'){
            if(dis.SupplierRate == undefined && !reset){
                dis.SupplierRate = new P_SupplierRate({"projectid" : dis.projectid, "callback" : callback});
            }else if(reset){
                dis.SupplierRate = new P_SupplierRate({"projectid" : dis.projectid, "callback" : callback});
            }else{
                callback("Data Already Fetched");
            }
        }else if(list == 'ScheduleDocument'){
            if(dis.ScheduleDocument == undefined && !reset){
                dis.ScheduleDocument = new ScheduleDocument({"projectid" : dis.projectid, "callback" : callback});
            }else if(reset){
                dis.ScheduleDocument = new ScheduleDocument({"projectid" : dis.projectid, "callback" : callback});
            }else{
                callback("Data Already Fetched");
            }
        }else if(list == 'ActualDocument'){
            if(dis.ActualDocument == undefined && !reset){
                dis.ActualDocument = new ActualDocument({"projectid" : dis.projectid, "callback" : callback});
            }else if(reset){
                dis.ActualDocument = new ActualDocument({"projectid" : dis.projectid, "callback" : callback});
            }else{
                callback("Data Already Fetched");
            }
        }else if(list == 'Request'){
            if(dis.Request == undefined && !reset){
                dis.Request = new ProjectRequest({"projectid" : dis.projectid,  "callback" : callback});
            }else if(reset){
                const cb =()=>{};
                dis.Request = new ProjectRequest({"projectid" : dis.projectid,  "callback" : callback});
            }else{
                callback("Data Already Fetched");
            }
            // console.log(dis.Request);
        }else if(list == 'Item'){
            if(dis.Item == undefined && !reset){
                dis.Item = new ProjectItem({"projectid" : dis.projectid,  "callback" : callback});
            }else if(reset){
                dis.Item = new ProjectItem({"projectid" : dis.projectid,  "callback" : callback});
            }else{
                callback("Data Already Fetched");
            }
        }else if(list == 'Budget'){
            if(dis.Budget == undefined && !reset){
                console.log('first if');
                dis.Budget = new ProjectBudget({"projectid" : dis.projectid,  "callback" : callback});
            }else if(reset){
                console.log('second if');
                dis.Budget = new ProjectBudget({"projectid" : dis.projectid,  "callback" : callback});
            }else{
                callback("Data Already Fetched");
            }
        }else if(list == 'TmpAccount'){
            if(dis.TmpAccount == undefined && !reset){
                let list = [];
                const cbsuccess=data=>{
                    $.each(data, function(key, value){
                        if(value != 'error'){
                            list.push(value);
                        }else{
                            list = [];
                        }
                    });
                };
                const cbcomplete=()=>{
                    dis.TmpAccount = list;
                    callback("Fetching Tmp Accounts");
                };
                capi_fetchTmpAccountByProjectId({"projectid" : dis.projectid}, cbsuccess, cbcomplete);
            }else if(reset){
                let list = [];
                const cbsuccess=data=>{
                    $.each(data, function(key, value){
                        if(value != 'error'){
                            list.push(value);
                        }else{
                            list = [];
                        }
                    });
                };
                const cbcomplete=()=>{
                    dis.TmpAccount = list;
                    callback("Fetching Tmp Accounts");
                };
                capi_fetchTmpAccountByProjectId({"projectid" : dis.projectid}, cbsuccess, cbcomplete);
            }else{
                callback("Data Already Fetched");
            }
        }else if(list == 'TmpSupplier'){
            if(dis.TmpSupplier == undefined && !reset){
                let list = [];
                const cbsuccess=data=>{
                    $.each(data, function(key, value){
                        if(value != 'error'){
                            list.push(value);
                        }else{
                            list = [];
                        }
                    });
                };
                const cbcomplete=()=>{
                    dis.TmpSupplier = list;
                    callback("Fetching Tmp Accounts");
                };
                capi_fetchTmpSupplierByProjectId({"projectid" : dis.projectid}, cbsuccess, cbcomplete);
            }else if(reset){
                let list = [];
                const cbsuccess=data=>{
                    $.each(data, function(key, value){
                        if(value != 'error'){
                            list.push(value);
                        }else{
                            list = [];
                        }
                    });
                };
                const cbcomplete=()=>{
                    dis.TmpSupplier = list;
                    callback("Fetching Tmp TmpSupplier");
                };
                capi_fetchTmpSupplierByProjectId({"projectid" : dis.projectid}, cbsuccess, cbcomplete);
            }else{
                callback("Data Already Fetched");
            }
        }else if(list == 'Invoice'){
            if(dis.Invoice == undefined && !reset){
                dis.Invoice = new ProjectInvoice({"projectid" : dis.projectid,  "callback" : callback});
            }else if(reset){
                dis.Invoice = new ProjectInvoice({"projectid" : dis.projectid,  "callback" : callback});
            }else{
                callback("Data Already Fetched");
            }
        }else if(list == 'Prerequest'){
            if(dis.Prerequest == undefined && !reset){
                dis.Prerequest = new ProjectPrerequest({"projectid" : dis.projectid,  "callback" : callback});
            }else if(reset){
                dis.Prerequest = new ProjectPrerequest({"projectid" : dis.projectid,  "callback" : callback});
            }else{
                callback("Data Already Fetched");
            }
        }
        
    }


    export(){
        return {
            "projectid" : this.projectid,
            "companyid" : this.companyid,
            "ownerid" : this.ownerid,
            "creator" : this.creator,
            "projectname" : this.projectname,
            "reference" : this.reference,
            "status" : this.status,
            "groupid" : this.groupid,
            "callback" : this.callback,
            "ConnectByProjectId" : this.ConnectByProjectId,
            "ConnectByResource" : this.ConnectByResource,
            "Minutes" : this.Minutes,
            "Notes" : this.Notes,
            "Register" : this.Register,
            "Task" : this.Task,
            "TaskResource" : this.TaskResource,
            "Timesheet" : this.Timesheet,
            "Supplier" : this.Supplier,
            "AccountRate" : this.AccountRate,
            "AccountRole" : this.AccountRole,
            "SupplierRate" : this.SupplierRate,
            "ScheduleDocument" : this.ScheduleDocument,
            "ActualDocument" : this.ActualDocument,
            "Request" : this.Request,
            "Item" : this.Item,
            "Budget" : this.Budget,
            "Invoice" : this.Invoice,
            "Prerequest" : this.Prerequest,
            "TmpAccount" : this.TmpAccount,
            "TmpSupplier" : this.TmpSupplier
        }
    }

}


class ProjectConnect{
    constructor(options){
        this.list = this.fetch(options);
    }
    fetch(options){
        const sd = [
            {
                "projectid" : options.projectid,
                "id" : "U-12398712983"
            },{
                "projectid" : options.projectid,
                "id" : "U-78632345513"
            }
        ]
        let list = [];
        $.each(sd, function(key, value){
            const options = {
                "projectid" : value.projectid,
                "id" : value.id
            };
            list[list.length] = options;
        });
        return list;
    }
    printData(){
        console.log(this.list);
    }
    create(options, callback){
        
        // api_createProjectConnect(options.projectid, options.id);
        const cbsuccess=data=>{
            console.log(data);
            this.list[this.list.length] = options;
        };
        const cbcomplete=data=>{
            console.log(data);
            options.callback();
        };
        capi_createProjectConnect(options, cbsuccess, cbcomplete);
    }
    

}
class ProjectRegister{
    constructor(options){
        this.id = options.id;
        this.projectid = options.projectid;
        this.ownerid = options.ownerid;
        this.date = options.date;
        this.time = options.time;
        this.subject = options.subject;
        this.type = options.type;
        this.mode = options.mode;
        this.impact = options.impact;
        this.impdescription = options.impdescription;
        this.description = options.description;
    }

    getJSON(){
        return {
            "id" : this.id,
            "projectid" : this.projectid,
            "ownerid" : this.ownerid,
            "date" : this.date,
            "time" : this.time,
            "subject" : this.subject,
            "type" : this.type,
            "mode" : this.mode,
            "impact" : this.impact,
            "impdescription" : this.impdescription,
            "description" : this.description
        }
    }
    create(cb){
        const options = this.getJSON();
        const cbsuccess=data=>{
            // callback(data.response);
            console.log(data);
        };
        api_createProjectRegister(options, cbsuccess, cb);
    }
    update(options, callback=()=>{}){
        const cbsuccess=data=>{
            this.date = options.date;
            this.time = options.time;
            this.subject = options.subject;
            this.type = options.type;
            this.mode = options.mode;
            this.impact = options.impact;
            this.impdescription = options.impdescription;
            this.description = options.description;
            callback(data.response);
        };
        api_updateProjectRegister(options, cbsuccess);
    }
    delete(callback=()=>{}){
        const options = {"id" : this.id};
        console.log(options);
        const cbsuccess=data=>{
            callback(data.response);
        };
        api_deleteProjectRegister(options, cbsuccess);
    }
}
class ProjectRegisterList{
    constructor(options){
        this.type = options.type;
        this.list = this.fetch(options);
    }
    
    fetch(options){
        const dis = this;
        let list = [];
        const cbsuccess=data=>{
            console.log(data);
            $.each(data, function(key, value){
                if(value != 'error'){
                    const x = {
                        "id" : value.id,
                        "projectid" : value.projectid,
                        "ownerid" : value.ownerid,
                        "date" : value.date,
                        "time" : value.time,
                        "subject" : value.subject,
                        "type" : value.type,
                        "mode" : value.mode,
                        "impact" : value.impact,
                        "impdescription" : value.impdescription,
                        "description" : value.description
                    }
                    if(dis.type == 'register'){
                        if(value.type == 'change' || value.type == 'decision'){
                            list[list.length] = new ProjectRegister(x);
                        }
                    }else if(dis.type == 'notes'){
                        if(value.type == 'info'){
                            list[list.length] = new ProjectRegister(x);
                        }
                    }
                }
            });
            this.list = list;
        };
        const cbcomplete=()=>{
            if(this.type == 'register'){
                this.fillRegister();
                options.callback('Fetching Project Register');
            }else if(this.type == 'notes'){
                this.fillNotes();
                options.callback('Fetching Project Notes');
            }
        };
        // let options = {
        //     'projectid': projectid,
        //     'ownerid': id
        // };
        api_fetchProjectRegisterByOwnerId(options, cbsuccess, cbcomplete);
        return list;
    }

    getJSONById(id){
        let obj = this.list.find(obj => obj.id == id);
        return obj.getJSON();
    }
    addToList(obj){
        this.list[this.list.length] = obj;
    }
    
    search(fromDate, toDate, t){
        const newList =[];
        $.each(this.list, function(key, value){
            const tmpDate = new Date(value.date);
            tmpDate.setDate(tmpDate.getDate() + 1);
            if(tmpDate<toDate && tmpDate>fromDate){
                if(t == ""){
                    newList[newList.length] = value;
                }else{
                    if(value.subject.toLowerCase().includes(t.toLowerCase())){
                        newList[newList.length] = value;
                    }
                }
            }
        });
        return newList;
    }
    fillRegisterByList(list){
        console.log(list);
        const nl = list.sort(function(a, b) {
            const aa = new Date(`${a.date} ${a.time}`);
            const bb = new Date(`${b.date} ${b.time}`);
            return aa > bb ? 1 : -1;
        });
        $('.preferences-body-register').children('.register-body').empty();
        $.each(nl, function(key, value){
            if(value.id != undefined){
                console.log(value);
                $('.preferences-body-register').children('.register-body').append(`
                        <div id="register_${value.id}" rid="${value.id}" class="register-body-widget color-sc idle">
                            <input type="date" value="${value.date}" disabled>
                            <input type="time" class="time" min="00:00" max="24:00" value="${value.time}" required  disabled>
                            <select class="type" disabled>
                                <option value="change">Change</option>
                                <option value="decision">Decision</option>
                            </select>
                            <select class="mode" disabled>
                                <option value="email">Email</option>
                                <option value="meeting">Meeting</option>
                                <option value="verbal">Verbal</option>
                            </select>
                            <select class="impact" disabled>
                                <option value="">Not Specified</option>
                                <option value="impact">Impact</option>
                                <option value="risk">Risk</option>
                                <option value="mitigation">Mitigation</option>
                            </select>
                            <input type="text" class="subject" placeholder="Subject" value="${value.subject}"  disabled>
                            <i class="fas fa-eye"></i>
                        </div>
                    `);
                    $(`#register_${value.id}`).children('select.type').val(value.type);
                    $(`#register_${value.id}`).children('select.mode').val(value.mode);
                    $(`#register_${value.id}`).children('select.impact').val(value.impact);
            }
        });
    }
    fillNotesByList(list){
        console.log(list);
        $('.preferences-body-notes').children('.notes-body').empty();
        const nl = list.sort(function(a, b) {
            const aa = new Date(`${a.date} ${a.time}`);
            const bb = new Date(`${b.date} ${b.time}`);
            return aa > bb ? 1 : -1;
        });
        $.each(nl, function(key, value){
            // console.log('fillNotes',value);
            if(value != 'error'){
                if(value.type == 'info'){
                    $('.preferences-body-notes').children('.notes-body').append(`
                        <div id="notes_${value.id}" rid="${value.id}" class="notes-body-widget color-sc idle">
                            <input type="date" value="${value.date}" disabled>
                            <input type="time" class="time" min="00:00" max="24:00" value="${value.time}" required  disabled>
                            <select class="type" disabled>
                                <option value="info">Information</option>
                            </select>
                            <select class="mode" disabled>
                                <option value="email">Email</option>
                                <option value="meeting">Meeting</option>
                                <option value="verbal">Verbal</option>
                            </select>
                            <select class="impact" disabled>
                                <option value="">Not Specified</option>
                                <option value="impact">Impact</option>
                                <option value="risk">Risk</option>
                                <option value="mitigation">Mitigation</option>
                            </select>
                            <input type="text" class="subject" placeholder="Subject" value="${value.subject}"  disabled>
                            <i class="fas fa-eye"></i>
                        </div>
                    `);
                    
                    $(`#notes_${value.id}`).children('select.type').val(value.type);
                    $(`#notes_${value.id}`).children('select.mode').val(value.mode);
                    $(`#notes_${value.id}`).children('select.impact').val(value.impact);
                }
            }else{
                showNotification('Fetch Error', 'Notes might be empty or there has been an error, Please Try again');
            }
        });
    }


    fillRegister(){
        $('.preferences-body-register').children('.register-body').empty();
        const nl = this.list.sort(function(a, b) {
            const aa = new Date(`${a.date} ${a.time}`);
            const bb = new Date(`${b.date} ${b.time}`);
            return aa > bb ? 1 : -1;
        });
        $.each(nl, function(key, value){
            console.log('fillRegister',value);
            if(value.id != undefined){
            // if(value.id != undefined){
                if(value.type != 'info'){
                    $('.preferences-body-register').children('.register-body').append(`
                        <div id="register_${value.id}" rid="${value.id}" class="register-body-widget color-sc idle">
                            <input type="date" value="${value.date}" disabled>
                            <input type="time" class="time" min="00:00" max="24:00" value="${value.time}" required  disabled>
                            <select class="type" disabled>
                                <option value="change">Change</option>
                                <option value="decision">Decision</option>
                            </select>
                            <select class="mode" disabled>
                                <option value="email">Email</option>
                                <option value="meeting">Meeting</option>
                                <option value="verbal">Verbal</option>
                            </select>
                            <select class="impact" disabled>
                                <option value="">Not Specified</option>
                                <option value="impact">Impact</option>
                                <option value="risk">Risk</option>
                                <option value="mitigation">Mitigation</option>
                            </select>
                            <input type="text" class="subject" placeholder="Subject" value="${value.subject}"  disabled>
                            <i class="fas fa-eye"></i>
                        </div>
                    `);
                    $(`#register_${value.id}`).children('select.type').val(value.type);
                    $(`#register_${value.id}`).children('select.mode').val(value.mode);
                    $(`#register_${value.id}`).children('select.impact').val(value.impact);
                }
            }else{
                showNotification('Fetch Error', 'Register might be empty or there has been an error, Please Try again');
            }
        });
    }
    fillNotes(){
        $('.preferences-body-notes').children('.notes-body').empty();
        const nl = this.list.sort(function(a, b) {
            const aa = new Date(`${a.date} ${a.time}`);
            const bb = new Date(`${b.date} ${b.time}`);
            return aa > bb ? 1 : -1;
        });
        $.each(nl, function(key, value){
            // console.log('fillNotes',value);
            if(value != 'error'){
                if(value.type == 'info'){
                    $('.preferences-body-notes').children('.notes-body').append(`
                        <div id="notes_${value.id}" rid="${value.id}" class="notes-body-widget color-sc idle">
                            <input type="date" value="${value.date}" disabled>
                            <input type="time" class="time" min="00:00" max="24:00" value="${value.time}" required  disabled>
                            <select class="type" disabled>
                                <option value="info">Information</option>
                            </select>
                            <select class="mode" disabled>
                                <option value="email">Email</option>
                                <option value="meeting">Meeting</option>
                                <option value="verbal">Verbal</option>
                            </select>
                            <select class="impact" disabled>
                                <option value="">Not Specified</option>
                                <option value="impact">Impact</option>
                                <option value="risk">Risk</option>
                                <option value="mitigation">Mitigation</option>
                            </select>
                            <input type="text" class="subject" placeholder="Subject" value="${value.subject}"  disabled>
                            <i class="fas fa-eye"></i>
                        </div>
                    `);
                    
                    $(`#notes_${value.id}`).children('select.type').val(value.type);
                    $(`#notes_${value.id}`).children('select.mode').val(value.mode);
                    $(`#notes_${value.id}`).children('select.impact').val(value.impact);
                }
            }else{
                showNotification('Fetch Error', 'Notes might be empty or there has been an error, Please Try again');
            }
        });
    }
    fillRegisterDescription(id){
        const obj = this.getJSONById(id);
        $('#register-description-id').attr('rid', id);
        $('#register-description-date').val(obj.date);
        $('#register-description-time').val(obj.time);
        $('#register-description-subject').val(obj.subject);
        $('#register-description-type').val(obj.type);
        $('#register-description-mode').val(obj.mode);
        $('#register-description-impact').val(obj.impact);
        $('#register-description-impact-field').val(obj.impdescription);
        $('#register-description-description').val(obj.description);
    }
    fillNotesDescription(id){
        const obj = this.getJSONById(id);
        console.log(obj);
        $('#notes-description-id').attr('rid', id);
        $('#notes-description-date').val(obj.date);
        $('#notes-description-time').val(obj.time);
        $('#notes-description-subject').val(obj.subject);
        $('#notes-description-type').val(obj.type);
        $('#notes-description-mode').val(obj.mode);
        $('#notes-description-impact').val(obj.impact);
        $('#notes-description-impact-field').val(obj.impdescription);
        $('#notes-description-description').val(obj.description);
    }
    update(id, options, callback){
        let obj = this.list.find(obj => obj.id == id);
        obj.update(options, callback);
        // console.log(this.list);
    }
    delete(id, callback){
        let obj = this.list.find(obj => obj.id == id);
        obj.delete(callback);
    }
    removeObj(id){
        const data = $.grep(this.list, function(e){ 
            return e.id != id; 
        });
        this.list = data;
    }

}
class ProjectMinutes{
    constructor(param){
        this.list = this.fetch(param);
    }
    getInfo(id){
        let obj = this.list.find(obj => obj.id == id);
        return{
            'id': obj.id,
            'date': obj.date,
            'time': obj.time,
            'subject': obj.subject,
            'type': obj.type,
            'mode': obj.mode,
            'location': obj.location,
            'attendees': obj.attendees,
            'responsible': obj.responsible,
            'respotype': obj.respotype,
            'respohours': obj.respohours,
            'due': obj.due,
            'description': obj.description
        }
    }
    getObjByPartId(pid){
        let list = [];
        $.each(this.list, function(key, value){
            if(value.partid == pid){
                list[list.length] = value;
            }
        });
        return list;
    }
    create(options, callback=()=>{}){
        // const options = this.getInfo();
        const cbsuccess=()=>{
            this.list[this.list.length] = options;
            this.fillMinutes();
            callback();
        };
        api_createProjectMinutes(options, cbsuccess);
    }
    fetch(options){
        console.log('-------------', options);
        const list = [];
        const cbsuccess=data=>{
            console.log("fetchminutesbyownerid", data);
            $.each(data, function(key, value){
                const obj = {
                    "id" : value.id,
                    "partid" : value.partid,
                    "date" : value.date,
                    "time" : value.time,
                    "subject" : value.subject,
                    "type" : value.type,
                    "mode" : value.mode,
                    "location" : value.location,
                    "attendees" : value.attendees,
                    "responsible" : value.responsible,
                    "respotype" : value.respotype,
                    "respohours" : value.respohours,
                    "due" : value.due,
                    "description" : value.description, 
                    "ownerid" : value.ownerid, 
                    "distributionid" : value.distributionid
                }
                list[list.length] = obj;
            });
            // this.list = list;
        };
        const cbcomplete=()=>{
            options.callback('Fetching Project Minutes');
        };
        // capi_fetchMinutesByOwnerId(options, cbsuccess, cbcomplete);
        capi_fetchMinutesByProjectId(options, cbsuccess, cbcomplete);
        return list;
    }
    getDistinctPartList(){
        let list = [];
        $.each(this.list, function(key, value){
            if(list.length == 0){
                list[0] = value;
            }
            let gate = true;
            $.each(list, function(key, val){
                console.log(val.partid, value.partid, val.partid == value.partid);
                if(val.partid == value.partid){
                    gate = false;
                }
            });
            if(gate){
                list[list.length] = value;
            }
        });
        return list;
    }
    search(fromDate, toDate, t){
        const newList =[];
        $.each(this.getDistinctPartList(), function(key, value){
            const tmpDate = new Date(value.date);
            tmpDate.setDate(tmpDate.getDate() + 1);
            if(tmpDate<toDate && tmpDate>fromDate){
                if(t == ""){
                    newList[newList.length] = value;
                }else{
                    if(value.subject.toLowerCase().includes(t.toLowerCase())){
                        newList[newList.length] = value;
                    }
                }
            }
        });
        return newList;
    }
    fillMinutesByList(list){
        console.log(list);
        const nl = list.sort(function(a, b) {
            const aa = new Date(`${a.date} ${a.time}`);
            const bb = new Date(`${b.date} ${b.time}`);
            return aa > bb ? 1 : -1;
        });
        $('.preferences-body-minutes').children('.minutes-body').empty();
        $.each(nl, function(key, value){
            if(value.id != undefined){
                console.log(value);
                $('.preferences-body-minutes').children('.minutes-body').append(`
                    <div pid="${value.partid}" class="minutes-body-widget ">
                        <input type="date" class="date" value="${value.date}" disabled>
                        <input type="time" class="time" min="00:00" max="24:00" value="${value.time}" disabled>
                        <input type="text" class="subject" placeholder="Subject" value="${value.subject}"  disabled>
                        <i class="fas fa-eye"></i>
                    </div>
                `);
            }
        });
    }
    fillMinutes(){
        const list = this.getDistinctPartList();
        console.log(list);
        const dis = this;
        const nl = list.sort(function(a, b) {
            const aa = new Date(`${a.date} ${a.time}`);
            const bb = new Date(`${b.date} ${b.time}`);
            return aa > bb ? 1 : -1;
        });
        $('.preferences-body-minutes').children('.minutes-body').empty();
        $.each(nl, function(key, value){
            if((value.id != undefined && value.ownerid == ACCUSER.id) || value.distributionid != null){
                console.log(value);
                $('.preferences-body-minutes').children('.minutes-body').append(`
                    <div pid="${value.partid}" class="minutes-body-widget ">
                        <input type="date" class="date" value="${value.date}" disabled>
                        <input type="time" class="time" min="00:00" max="24:00" value="${value.time}" disabled>
                        <input type="text" class="subject" placeholder="Subject" value="${value.subject}"  disabled>
                        <i class="fas fa-eye"></i>
                    </div>
                `);
            }
        });
    }
    distributeMinute(options, callback){
        const cbsuccess=data=>{
            console.log('Project Minute Distribution Successfull');
            console.log(data);
        };
        const cbcomplete=()=>{
            console.log('Project Minute Distribution Completed');
            callback();
        };
        capi_distributeMinuteByPartId(options, cbsuccess, cbcomplete);
        // return this.getObjByPartId(pid);
    }
    update(options, callback=()=>{}){
        let obj = this.list.find(obj => obj.id == options.id);
        const cbsuccess=()=>{
            obj.date = options.date;
            obj.time = options.time;
            obj.subject = options.subject;
            obj.type = options.type;
            obj.mode = options.mode;
            obj.location = options.location;
            obj.attendees = options.attendees;
            obj.responsible = options.responsible;
            obj.respotype = options.respotype;
            obj.respohours = options.respohours;
            obj.due = options.due;
            obj.description = options.description;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_updateProjectMinutes(options, cbsuccess, cbcomplete);
    }
    delete(options, callback=()=>{}){
        const cbsuccess=()=>{
            const data = $.grep(this.list, function(e){ 
                return e.id != options.id; 
            });
            this.list = data;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_deleteProjectMinutes(options, cbsuccess, cbcomplete);
    }


}
class ProjectTimesheet{
    constructor(options){
        this.list = this.fetch(options);
    }

    fetch(options){
        let list = [];
        const cbsuccess=data=>{
            $.each(data, function(key, value){
                const options = {
                    "id" : value.id,
                    "projectid" : value.projectid,
                    "ownerid" : value.ownerid,
                    "taskid" : value.taskid,
                    "date" : value.date,
                    "hours" : value.hours
                }
                list[list.length] = options;
            });
        };
        const cbcomplete=()=>{
            options.callback('Fetching Project Timesheet');
        };
        capi_fetchProjectTimesheetByProjectid(options, cbsuccess, cbcomplete);
        return list;
    }
    create(options, callback){
        const cbsuccess=data=>{
            const obj = {
                "id" : options.id,
                "projectid" : options.projectid,
                "ownerid" : options.ownerid,
                "taskid" : options.taskid,
                "date" : options.date,
                "hours" : options.hours
            }
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createProjectTimesheet(options, cbsuccess, cbcomplete);
    }
    addObjToList(obj){
        this.list[this.list.length] = obj;
    }
    fillTimesheetSingle(options){
        const list = [];
        $.each(this.list, function(key, value){
            if(value.taskid == options.taskid && value.ownerid == options.ownerid){
                list[list.length] = value;
            }
        });
        const nl = list.sort(function(a, b) {
            const aa = new Date(`${a.date} 00:00:00`);
            const bb = new Date(`${b.date} 00:00:00`);
            return aa > bb ? 1 : -1;
        });
        $(`#timesheettask_${options.taskid}`).children('.timesheet-body-widget-hours-con').empty();
        $.each(nl, function(key, value){
            $(`#timesheettask_${options.taskid}`).children('.timesheet-body-widget-hours-con').append(`
                <div tid="${value.id}" class="timesheet-body-widget-hours btn-shadow">
                    <input class="timesheet-body-widget-date" type="date" value="${value.date}" disabled>
                    <input class="timesheet-body-widget-hours" type="text" placeholder="Hours" value="${value.hours}" disabled>
                    <i status="delete" class="fas fa-trash timesheet-body-widget-save"></i>
                </div>
            `);
        });

        
    }
    delete(options, callback){
        const cbsuccess=()=>{
            const data = $.grep(this.list, function(e){ 
                return e.id != options.id; 
            });
            this.list = data;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_deleteProjectTimesheet(options, cbsuccess, cbcomplete);
    }
    getHoursByTask(options){
        let hours = 0;
        $.each(this.list, function(key, value){
            if(value.taskid == options.taskid && value.ownerid == options.ownerid){
                hours += parseFloat(value.hours);
            }
        });
        return hours;
    }
    getList(){
        return this.list;
    }
    getHoursByAccid(options){
        let hours = 0;
        $.each(this.list, function(key, value){
            if(value.ownerid == options.ownerid){
                hours += parseFloat(value.hours);
            }
        });
        return hours;
    }
    getActualHours(){
        let hours = 0;
        $.each(this.list, function(key, value){
            hours += parseFloat(value.hours);
        });
        return hours;
    }
    getDaysByTask(options){
        let ret = [];
        $.each(this.list, function(key, value){
            if(value.taskid == options.taskid && value.ownerid == options.accid){
                ret[ret.length] = value;
            }
        });
        return ret;
    }
    getObjByMinMaxDates(options){
        let ret = [];
        for (let dt = new Date(options.sd); dt < options.ed; dt.setDate(dt.getDate() + 1)) {
            $.each(this.list, function(key, value){
                const d = new Date(`${value.date} 00:00:00`);
                if(d.getTime() == dt.getTime()){
                    ret[ret.length] = value;
                }
            });
            
            console.log('inside loop',dt);
        }
        return ret;
    }
    getObjByMinMaxDatesOwner(options){
        let ret = [];
        for (let dt = new Date(options.sd); dt < options.ed; dt.setDate(dt.getDate() + 1)) {
            $.each(this.list, function(key, value){
                const d = new Date(`${value.date} 00:00:00`);
                if(d.getTime() == dt.getTime() && options.accid == value.ownerid){
                    ret[ret.length] = value;
                }
            });
            // console.log('inside loop',dt);
        }
        return ret;
    }
    getAccidActualHoursByProjectid(options){
        let hours = 0;
        $.each(this.list, function(key, value){
            if(value.ownerid == options.accid){
                hours += (isNaN(parseFloat(value.hours)) ? 0 : parseFloat(value.hours));
            }
        });
        return hours;
    }
}
class ProjectRequest{
    constructor(options){
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
                            const cb =data=>{
                                console.log(data);
                                const cb =data=>{
                                    console.log(data);
                                    options.callback("Finished Fetching Project Request");
                                };
                                this.scoreadd = this.fetchScoreAdd(options, cb);
                            };
                            this.score = this.fetchScore(options, cb);
                        };
                        this.lock = this.fetchLock(options, cb);
                    };
                    this.connect = this.fetchConnect(options, cb);
                };
                this.technicaladd = this.fetchTechAdd(options, cb);
            };
            this.technical = this.fetchTech(options, cb);
        };
        this.obj = this.fetch(options, cb);
        
    }

    fetch(options, callback){
        let list = {};
        const cbsuccess=data=>{
            console.log(data);
            if(data.response != "error"){
                $.each(data, function(key, value){
                    const zoptions = {
                        'requestid' : value.requestid,
                        'projectid' : value.projectid,
                        'name' : value.name,
                        'status' : value.status,
                        'lockstatus' : value.lockstatus,
                        'score' : value.score,
                        'description' : value.description,
                        'location1' : value.location1,
                        'location2' : value.location2,
                        'requestor' : value.requestor,
                        'manager' : value.manager,
                        'sponsor' : value.sponsor
                    }
                    list = zoptions;
                });
            }else{
                list = [];
            }
            
        };
        const cbcomplete=()=>{
            callback('Fetching Project Request');
        };
        capi_fetchProjectRequestByProjectid(options, cbsuccess, cbcomplete);
        return list;
    }
    create(options, callback){
        const cbsuccess=data=>{
            console.log(data);
                this.obj.requestid = options.requestid;
                this.obj.projectid = options.projectid;
                this.obj.name = options.name;
                this.obj.score = options.score;
                this.obj.description = options.description;
                this.obj.location1 = options.location1;
                this.obj.location2 = options.location2;
                this.obj.requestor = options.requestor;
                this.obj.manager = options.manager;
                this.obj.sponsor = options.sponsor;
                this.obj.status = "idle";
                // this.obj.lockstatus = '0';
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createProjectRequest(options, cbsuccess, cbcomplete);
    }
    delete(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            this.obj = undefined;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_deleteProjectRequest(options, cbsuccess, cbcomplete);
    }
    getObj(){
        return this.obj;
    }
    update(options, callback){
        console.log(options);
        let obj = this.obj.find(obj => obj.requestid == options.requestid);
        const cbsuccess=data=>{
            console.log(data);
            obj.requestid = options.requestid,
            obj.name = options.name,
            obj.score = options.score,
            obj.description = options.description,
            obj.location1 = options.location1,
            obj.location2 = options.location2,
            obj.requestor = options.requestor,
            obj.manager = options.manager,
            obj.sponsor = options.sponsor
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_updateProjectRequest(options, cbsuccess, cbcomplete);
    }
    updateStatus(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            this.obj.status = options.status;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_updateProjectRequestStatus(options, cbsuccess, cbcomplete);
    }
    updateLockStatus(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            this.obj.lockstatus = options.lockstatus;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_updateProjectRequestLockstatus(options, cbsuccess, cbcomplete);
    }


    fetchTech(options, callback){
        let list = {};
        const cbsuccess=data=>{
            if(data.response != "error"){
                $.each(data, function(key, value){
                    const zoptions = {
                        'requestid' : value.requestid,
                        'projectid' : value.projectid,
                        'desc_1' : value.desc_1,
                        'desc_2' : value.desc_2,
                        'desc_3' : value.desc_3,
                        'desc_4_1' : value.desc_4_1,
                        'desc_4_2' : value.desc_4_2,
                        'prior_1' : value.prior_1,
                        'prior_2' : value.prior_2,
                        'prior_3' : value.prior_3,
                        'prior_4' : value.prior_4,
                        'prior_5' : value.prior_5,
                        'prior_6' : value.prior_6,
                        'prior_7' : value.prior_7,
                        'prior_8' : value.prior_8,
                        'strat_1' : value.strat_1,
                        'strat_2' : value.strat_2
                    }
                    list = zoptions;
                });
            }else{
                list = undefined;
            }
            
        };
        const cbcomplete=()=>{
            callback('Fetching Project Request Technical');
        };
        capi_fetchProjectRequestTechnical(options, cbsuccess, cbcomplete);
        return list;
    }
    createTech(options, callback){
        console.log(options);
        const cbsuccess=data=>{
            console.log(data);
            const obj = {
                'requestid' : options.requestid,
                'projectid' : options.projectid,
                'desc_1' : options.desc_1,
                'desc_2' : options.desc_2,
                'desc_3' : options.desc_3,
                'desc_4_1' : options.desc_4_1,
                'desc_4_2' : options.desc_4_2,
                'prior_1' : options.prior_1,
                'prior_2' : options.prior_2,
                'prior_3' : options.prior_3,
                'prior_4' : options.prior_4,
                'prior_5' : options.prior_5,
                'prior_6' : options.prior_6,
                'prior_7' : options.prior_7,
                'prior_8' : options.prior_8,
                'strat_1' : options.strat_1,
                'strat_2' : options.strat_2
            }
            this.technical = obj;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createProjectRequestTechnical(options, cbsuccess, cbcomplete);
    }
    getTechObj(){
        return this.technical;
    }

    fetchTechAdd(options, callback){
        let list = [];
        const cbsuccess=data=>{
            if(data.response != "error"){
                $.each(data, function(key, value){
                    const zoptions = {
                        'id' : value.id,
                        'requestid' : value.requestid,
                        'projectid' : value.projectid,
                        'type' : value.type,
                        'subject' : value.subject,
                        'param' : value.param
                    }
                    list[list.length] = zoptions;
                });
            }else{
                list = [];
            }
            
        };
        const cbcomplete=()=>{
            callback('Fetching Project Request Technical Add');
        };
        capi_fetchRequestTechAddByProjectId(options, cbsuccess, cbcomplete);
        return list;
    }
    createTechAdd(options, callback){
        console.log(options);
        const cbsuccess=data=>{
            console.log(data);
            const obj = {
                'id' : options.id,
                'requestid' : options.requestid,
                'projectid' : options.projectid,
                'type' : options.type,
                'subject' : options.subject,
                'param' : options.param
            }
            let addGate = true;
            let selobj;
            $.each(this.technicaladd, function(key, value){
                if(value.id == obj.id){
                    addGate = false;
                    selobj = value;
                }
            });
            if(addGate){
                this.technicaladd[this.technicaladd.length] = obj;
            }else{
                selobj.id = obj.id,
                selobj.requestid = obj.requestid,
                selobj.projectid = obj.projectid,
                selobj.type = obj.type,
                selobj.subject = obj.subject,
                selobj.param = obj.param
            }
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createRequestTechnicalAdd(options, cbsuccess, cbcomplete);
    }
    getTechAddObj(){
        return this.technicaladd == undefined ? {} : this.technicaladd;
    }
    deleteTechAdd(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = $.grep(this.technicaladd, function(e){ 
                return e.id != options.id;
            });
            this.technicaladd = obj;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_deleteRequestTechnicalAdd(options, cbsuccess, cbcomplete)
    }
    

    fetchConnect(options, callback){
        let list = [];
        const cbsuccess=data=>{
            if(data.response != "error"){
                $.each(data, function(key, value){
                    const obj = {
                        'id' : value.id,
                        'projectid' : value.projectid,
                        'accid' : value.accid,
                        'status' : value.status,
                        'notes' : value.notes,
                    }
                    list[list.length] = obj;
                });
            }else{
                list = [];
            }
            
        };
        const cbcomplete=()=>{
            callback('Fetching Project Request Connect');
        };
        capi_fetchProjectRequestConnectByProjectId(options, cbsuccess, cbcomplete);
        return list;
    }
    createConnect(options, callback){
        console.log(options);
        const cbsuccess=data=>{
            console.log(data);
            const obj = {
                'id' : options.id,
                'projectid' : options.projectid,
                'accid' : options.accid,
                'status' : "idle",
                'notes' : ''
            }
            this.connect = obj;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createProjectRequestConnect(options, cbsuccess, cbcomplete);
    }
    deleteConnect(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = $.grep(this.connect, function(e){ 
                return e.accid != options.accid;
            });
            this.connect = obj;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_deleteProjectRequestConnect(options, cbsuccess, cbcomplete);
    }
    updateConnect(options, callback){
        console.log(options);
        let obj = this.connect.find(obj => obj.id == options.id);
        const cbsuccess=data=>{
            console.log(data);
            if(obj != undefined){
                obj.status = options.status;
                obj.notes = options.notes;
            }
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_updateProjectRequestConnectStatus(options, cbsuccess, cbcomplete);
    }
    updateConnectStatusByProjectId(options, callback){
        console.log(options);
        const cbsuccess=data=>{
            console.log(data);
            $.each(this.connect, function(key, value){
                console.log(value);
                if(value.projectid == options.projectid){
                    value.status = options.status;
                }
            });
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_updateProjectRequestConnectStatusByProjectId(options, cbsuccess, cbcomplete);
    }
    getConnectObj(){
        return this.connect;
    }


    fetchLock(options, callback){
        let list = [];
        const cbsuccess=data=>{
            if(data.response != "error"){
                $.each(data, function(key, value){
                    const obj = {
                        'id' : value.id,
                        'projectid' : value.projectid,
                        'api' : value.api,
                        'parameter' : value.parameter,
                        'type' : value.type,
                        'operation' : value.operation,
                        'description' : value.description
                    }
                    list[list.length] = obj;
                });
            }else{
                list = [];
            }
            
        };
        const cbcomplete=()=>{
            callback('Fetching Project Request Connect');
        };
        capi_fetchProjectRequestLock(options, cbsuccess, cbcomplete);
        return list;
    }
    createLock(options, callback){
        // console.log(options);
        const cbsuccess=data=>{
            console.log(data);
            const obj = {
                'id' : options.id,
                'projectid' : options.projectid,
                'api' : options.api,
                'parameter' : options.parameter,
                'type' : options.type,
                'operation' : options.operation,
                'description' : options.description
            }
            this.lock.push(obj);
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createProjectRequestLock(options, cbsuccess, cbcomplete);
    }   
    deleteAllLock(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            this.lock = [];
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_deleteProjectRequestLockByProjectId(options, cbsuccess, cbcomplete);
    }
    deleteLock(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = $.grep(this.lock, function(e){ 
                return e.id != options.id;
            });
            this.lock = obj;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_deleteProjectRequestLock(options, cbsuccess, cbcomplete);
    }
    isLocked(){
        let ret = false;
        // console.log("isLocked()",this.obj);
        // console.log("isLocked()",this.obj.length);
        if(this.obj != {}){
            if(this.obj.lockstatus == "1" || this.obj.lockstatus == 1){
                ret = true;
            }
        }

        return ret;
    }
    getLockObj(){
        return this.lock;
    }
    getLockObjById(id){
        let obj = this.lock.find(obj => obj.id == id);
        return obj;
    }

    fetchScore(options, callback){
        let list = [];
        const cbsuccess=data=>{
            if(data.response != "error"){
                $.each(data, function(key, value){
                    const obj = {
                        'requestid' : value.requestid,
                        'projectid' : value.projectid,
                        'desc_1' : value.desc_1,
                        'desc_2' : value.desc_2,
                        'desc_3' : value.desc_3,
                        'desc_4_1' : value.desc_4_1,
                        'desc_4_2' : value.desc_4_2,
                        'prior_1' : value.prior_1,
                        'prior_2' : value.prior_2,
                        'prior_3' : value.prior_3,
                        'prior_4' : value.prior_4,
                        'prior_5' : value.prior_5,
                        'prior_6' : value.prior_6,
                        'prior_7' : value.prior_7,
                        'prior_8' : value.prior_8,
                        'strat_1' : value.strat_1,
                        'strat_2' : value.strat_2
                    }
                    list = obj;
                });
            }else{
                list = {};
            }
            
        };
        const cbcomplete=()=>{
            callback('Fetching Project Request Scores');
        };
        capi_fetchProjectRequestScore(options, cbsuccess, cbcomplete);
        return list;
    }
    createScore(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = {
                'requestid' : options.requestid,
                'projectid' : options.projectid,
                'columnname' : options.columnname,
                'value' : options.value
            }
            if(this.score != undefined && this.score != []){
                this.score[obj.columnname] = options.value;
            }else{
                this.score = {
                    'requestid' : options.requestid,
                    'projectid' : options.projectid,
                    'desc_1' : '0',
                    'desc_2' : '0',
                    'desc_3' : '0',
                    'desc_4_1' : '0',
                    'desc_4_2' : '0',
                    'prior_1' : '0',
                    'prior_2' : '0',
                    'prior_3' : '0',
                    'prior_4' : '0',
                    'prior_5' : '0',
                    'prior_6' : '0',
                    'prior_7' : '0',
                    'prior_8' : '0',
                    'strat_1' : '0',
                    'strat_2' : '0'
                }
                this.score[obj.columnname] = options.value;
            }
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createProjectRequestScore(options, cbsuccess, cbcomplete);
    }
    getScore(){
        return this.score;
    }

    fetchScoreAdd(options, callback){
        let list = [];
        const cbsuccess=data=>{
            if(data.response != "error"){
                $.each(data, function(key, value){
                    const obj = {
                        'id' : value.id,
                        'requestid' : value.requestid,
                        'projectid' : value.projectid,
                        'score' : value.score,
                    }
                    list.push(obj);
                });
            }else{
                list = [];
            }
            
        };
        const cbcomplete=()=>{
            callback('Fetching Project Request Scores Add');
        };
        capi_fetchProjectRequestScoreAdd(options, cbsuccess, cbcomplete);
        return list;
    }
    createScoreAdd(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            
            let nobj = this.scoreadd.find(obj => obj.id == options.id);
            const obj = {
                'id' : options.id,
                'requestid' : options.requestid,
                'projectid' : options.projectid,
                'score' : options.score
            }
            if(nobj == undefined){
                this.scoreadd.push(obj);
            }else{
                nobj.score = options.score;
            }
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createProjectRequestScoreAdd(options, cbsuccess, cbcomplete);
    }
    getScoreAddById(id){
        return this.scoreadd.find(obj => obj.id == id);
    }

    getProjectScore(){
        let allocatedScore = 0;
        let totalScore = 0;
        Object.keys(this.score).forEach(key => {
            // console.log(key, obj[key]);
            if(key != "requestid" && key != "projectid"){
                allocatedScore += 10;
                totalScore += parseInt(this.score[key]) ? parseInt(this.score[key]) : 0;
            }
        });
        $.each(this.scoreadd, function(key, value){
            allocatedScore += 10;
            totalScore += parseInt(value.score) ? parseInt(value.score) : 0;
        });

        return ( (totalScore / allocatedScore) * 100 ).toFixed(2);
    }


}
class ProjectItem{
    constructor(options){
        const cb =data=>{
            console.log(data);
            const cb =data=>{
                console.log(data);
                options.callback("Finished Fetching Project Item");
            };
            this.Category = this.fetchCategory(options, cb);
        };
        this.Item = this.fetchItem(options, cb);
    }

    fetchItem(options, callback){
        let list = [];
        const cbsuccess=data=>{
            // console.log(data);
            if(data.response != "error"){
                $.each(data, function(key, value){
                    const obj = {
                        'id' : value.id,
                        'projectid' : value.projectid,
                        'categoryid' : value.categoryid,
                        'code' : value.code,
                        'name' : value.name,
                    }
                    list.push(obj);
                });
            }
        };
        const cbcomplete=()=>{
            callback('Fetching Project Items');
        };
        capi_fetchProjectItem(options, cbsuccess, cbcomplete);
        return list;
    }
    createItem(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = {
                'id' : options.id,
                'projectid' : options.projectid,
                'categoryid' : options.categoryid,
                'code' : options.code,
                'name' : options.name,
            };
            this.Item.push(obj);
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createProjectItem(options, cbsuccess, cbcomplete);
    }
    deleteItem(options, callback){ 
        const cbsuccess=data=>{
            console.log(data);
            const obj = $.grep(this.Item, function(e){ 
                return e.id != options.id; 
            });
            this.Item = obj;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_deleteProjectItem(options, cbsuccess, cbcomplete);
    }
    getItem(){
        return this.Item;
    }
    getItemObj(id){
        let obj = this.Item.find(obj => obj.id == id);
        return obj;
    }
    
    fetchCategory(options, callback){
        let list = [];
        const cbsuccess=data=>{
            // console.log(data);
            if(data.response != "error"){
                $.each(data, function(key, value){
                    const obj = {
                        'id' : value.id,
                        'projectid' : value.projectid,
                        'name' : value.name
                    }
                    list.push(obj);
                });
            }
        };
        const cbcomplete=()=>{
            callback('Fetching Project Items Category');
        };
        capi_fetchProjectItemCategory(options, cbsuccess, cbcomplete);
        return list;
    }
    createCategory(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = {
                'id' : options.id,
                'projectid' : options.projectid,
                'name' : options.name
            };
            this.Category.push(obj);
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createProjectItemCategory(options, cbsuccess, cbcomplete);
    }
    deleteCategory(options, callback){ 
        const cbsuccess=data=>{
            console.log(data);
            const obj = $.grep(this.Category, function(e){ 
                return e.id != options.id; 
            });
            this.Category = obj;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_deleteProjectItemCategory(options, cbsuccess, cbcomplete);
    }
    getCategory(){
        return this.Category;
    }
    getCategoryObj(id){
        let obj = this.Category.find(obj => obj.id == id);
        return obj;
    }

}
class ProjectBudget{
    constructor(options){
        console.log('start');
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
                            const cb =data=>{
                                console.log(data);
                                const cb =data=>{
                                    console.log(data);
                                    console.log('end');
                                    options.callback("Finished Fetching Project Budget");
                                };
                                this.Upload = this.fetchUpload(options, cb);
                            };
                            this.Forecast = this.fetchForecast(options, cb);
                        };
                        this.Manhours = this.fetchManhours(options, cb);
                    };
                    this.Milestone = this.fetchMilestone(options, cb);
                };
                this.Material = this.fetchMaterial(options, cb);
            };
            this.Lumpsum = this.fetchLumpsum(options, cb);
        };
        this.list = this.fetch(options, cb);

        
    }

    fetch(options, callback){
        let list = [];
        const cbsuccess=data=>{
            // console.log(data);
            $.each(data, function(key, value){
                const obj = {
                    'id' : value.id,
                    'projectid' : value.projectid,
                    'itemid' : value.itemid,
                    'type' : value.type,
                    'capexcost' : value.capexcost,
                    'opexcost' : value.opexcost,
                    'vendor' : value.vendor
                }
                list.push(obj);
            });
        };
        const cbcomplete=()=>{
            callback('Fetching Project Budget');
        };
        capi_fetchProjectBudget(options, cbsuccess, cbcomplete)
        return list;
    }
    create(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = {
                'id' : options.id,
                'projectid' : options.projectid,
                'itemid' : options.itemid,
                'type' : options.type,
                'capexcost' : options.capexcost,
                'opexcost' : options.opexcost,
                'vendor' : options.vendor
            };
            this.list.push(obj);
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createProjectBudget(options, cbsuccess, cbcomplete);
    }
    delete(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = $.grep(this.list, function(e){ 
                return e.id != options.id; 
            });
            this.list = obj;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_deleteProjectBudget(options, cbsuccess, cbcomplete);
    }
    getObj(){
        return this.list;
    }
    getObjById(id){
        let list = [];
        $.each(this.list, function(key, value){
            if(value.id == id){
                list.push(value);
            }
        });
        return list;
    }
    getObjByVendor(vendor){
        let list = [];
        $.each(this.list, function(key, value){
            if(value.vendor == vendor){
                list.push(value);
            }
        });
        return list;
    }
    getCapexObj(){
        let list = [];
        $.each(this.list, function(key, value){
            if(value.type == 'tm' || value.type == 'supplier'){
                list.push(value);
            }
        });
        return list;
    }
    getAllocatedBudget(){
        let ret = 0;
        $.each(this.list, function(key, value){
            if(value.type == 'hours'){
                ret += isNaN(parseFloat(value.opexcost)) ? 0 : parseFloat(value.opexcost);
            }
        });
        return ret;
    }



    fetchLumpsum(options, callback){
        let list = [];
        const cbsuccess=data=>{
            // console.log(data);
            $.each(data, function(key, value){
                const obj = {
                    'id' : value.id,
                    'budgetid' : value.budgetid,
                    'projectid' : value.projectid,
                    'name' : value.name,
                    'payment' : value.payment
                }
                list.push(obj);
            });
        };
        const cbcomplete=()=>{
            callback('Fetching Project Budget Lumpsum');
        };
        capi_fetchProjectBudgetLumpsum(options, cbsuccess, cbcomplete)
        return list;
    }
    createLumpsum(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            let nobj = this.Lumpsum.find(obj => obj.id == options.id);
            const obj = {
                'id' : options.id,
                'budgetid' : options.budgetid,
                'projectid' : options.projectid,
                'name' : options.name,
                'payment' : options.payment
            };
            
            if(nobj == undefined){
                this.Lumpsum.push(obj);
            }else{
                nobj.name = options.name;
                nobj.payment = options.payment;
            }
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createProjectBudgetLumpsum(options, cbsuccess, cbcomplete);
    }
    deleteLumpsum(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = $.grep(this.Lumpsum, function(e){ 
                return e.id != options.id; 
            });
            this.Lumpsum = obj;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_deleteProjectBudgetLumpsum(options, cbsuccess, cbcomplete);
    }
    getLumpsum(){
        return this.Lumpsum;
    }
    getLumpsumByBudgetId(budgetid){
        let list = [];
            $.each(this.Lumpsum, function(key, value){
                if(value.budgetid == budgetid){
                    list.push(value);
                }
            });
        return list;
    }
    getLumpsumCostingByBudgetId(budgetid){
        let val = 0;
        $.each(this.Lumpsum, function(key, value){
            if(value.budgetid == budgetid){
                val += isNaN(parseFloat(value.payment)) ? 0 : parseFloat(value.payment);
            }
        });
        return val;
    }

    fetchUpload(options, callback){
        let list = [];
        const cbsuccess=data=>{
            // console.log(data);
            $.each(data, function(key, value){
                const obj = {
                    'id' : value.id,
                    'projectid' : value.projectid,
                    'budgetid' : value.budgetid,
                    'link' : value.link,
                    'filename' : value.filename,
                    'costing' : value.costing
                }
                list.push(obj);
            });
        };
        const cbcomplete=()=>{
            callback('Fetching Project Budget Upload');
        };
        capi_fetchProjectBudgetUpload(options, cbsuccess, cbcomplete)
        return list;
    }
    createUpload(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            // let nobj = this.Upload.find(obj => obj.id == options.id);
            const obj = {
                'id' : options.id,
                'projectid' : options.projectid,
                'budgetid' : options.budgetid,
                'link' : options.link,
                'filename' : options.filename,
                'costing' : options.costing
            };
            console.log(this.Upload, obj);
            this.Upload.push(obj);
            // if(nobj == undefined){
            //     this.Upload.push(obj);
            // }else{
            //     nobj.name = options.name;
            //     nobj.payment = options.payment;
            // }
            
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createProjectBudgetUpload(options, cbsuccess, cbcomplete);
    }
    deleteUpload(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = $.grep(this.Upload, function(e){ 
                return e.id != options.id; 
            });
            this.Upload = obj;
        };
        const cbcomplete=()=>{
            ajax_deleteSingleFile(`../../${options.link}`, ()=>{}, callback);
        };
        capi_deleteProjectBudgetUpload(options, cbsuccess, cbcomplete);
    }
    deleteUploadByBudgetId(budgetid){
        const dis = this;
        $.each(this.Upload, function(key, value){
            if(value.budgetid == budgetid){
                dis.deleteUpload({"id" : value.id, "link" : value.link}, ()=>{});
            }
        });

    // callback();

    }
    getUploadByBudgetId(budgetid){
        let list = [];
        $.each(this.Upload, function(key, value){
            if(value.budgetid == budgetid){
                list.push(value);
            }
        });
        return list;
    }
    getUploadById(id){
        let list = {};
        $.each(this.Upload, function(key, value){
            if(value.id == id){
                list = value;
            }
        });
        return list;
    }

    fetchMaterial(options, callback){
        let list = [];
        const cbsuccess=data=>{
            console.log(data);
            $.each(data, function(key, value){
                const obj = {
                    'id' : value.id,
                    'budgetid' : value.budgetid,
                    'projectid' : value.projectid,
                    'name' : value.name,
                    'unit' : value.unit,
                    'quantity' : value.quantity,
                    'price' : value.price
                }
                list.push(obj);
            });
        };
        const cbcomplete=()=>{
            callback('Fetching Project Budget Material');
        };
        capi_fetchProjectBudgetMaterial(options, cbsuccess, cbcomplete)
        return list;
    }
    createMaterial(options, callback){
        let nobj = this.Material.find(obj => obj.id == options.id);
        const cbsuccess=data=>{
            console.log(data);
            const obj = {
                'id' : options.id,
                'budgetid' : options.budgetid,
                'projectid' : options.projectid,
                'name' : options.name,
                'unit' : options.unit,
                'quantity' : options.quantity,
                'price' : options.price
            };
            if(nobj == undefined){
                this.Material.push(obj);
            }else{
                nobj.name = options.name;
                nobj.unit = options.unit;
                nobj.quantity = options.quantity;
                nobj.price = options.price;
            }
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createProjectBudgetMaterial(options, cbsuccess, cbcomplete);
    }
    deleteMaterial(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = $.grep(this.Material, function(e){ 
                return e.id != options.id; 
            });
            this.Material = obj;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_deleteProjectBudgetMaterial(options, cbsuccess, cbcomplete);
    }
    getMaterialByBudgetId(budgetid){
        let list = [];
            $.each(this.Material, function(key, value){
                if(value.budgetid == budgetid){
                    list.push(value);
                }
            });
        return list;
    }
    getMaterialCostByBudgetId(budgetid){
        let ret = 0;
            $.each(this.Material, function(key, value){
                if(value.budgetid == budgetid){
                    // list.push(value);
                    const q = isNaN(parseFloat(value.quantity)) ? 0 : parseFloat(value.quantity);
                    const p = isNaN(parseFloat(value.price)) ? 0 : parseFloat(value.price);
                    ret += (q * p);
                }
            });
        return ret;
    }

    
    fetchMilestone(options, callback){
        let list = [];
        const cbsuccess=data=>{
            // console.log(data);
            $.each(data, function(key, value){
                const obj = {
                    'id' : value.id,
                    'projectid' : value.projectid,
                    'budgetid' : value.budgetid,
                    'resourceid' : value.resourceid,
                    'milestoneid' : value.milestoneid,
                    'name' : value.name,
                    'value' : value.value
                }
                list.push(obj);
            });
        };
        const cbcomplete=()=>{
            callback('Fetching Project Budget Milestone');
        };
        capi_fetchProjectBudgetMilestone(options, cbsuccess, cbcomplete)
        return list;
    }
    createMilestone(options, callback){
        let nobj = this.Milestone.find(obj => obj.id == options.id);
        const cbsuccess=data=>{
            console.log(data);
            const obj = {
                'id' : options.id,
                'projectid' : options.projectid,
                'budgetid' : options.budgetid,
                'resourceid' : options.resourceid,
                'milestoneid' : options.milestoneid,
                'name' : options.name,
                'value' : options.value
            };
            if(nobj == undefined){
                this.Milestone.push(obj);
            }else{
                nobj.name = options.name;
                nobj.value = options.value;
            }
            
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createProjectBudgetMilestone(options, cbsuccess, cbcomplete);
    }
    deleteMilestoneByMilestoneId(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = $.grep(this.Milestone, function(e){ 
                return e.milestoneid != options.milestoneid; 
            });
            this.Milestone = obj;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_deleteProjectBudgetMilestoneByMilestoneId(options, cbsuccess, cbcomplete);
    }
    getMilestone(){
        return this.Milestone;
    }
    getDistinctMilestoneIdByResourceId(budgetid){
        let list = [];
        $.each(this.Milestone, function(key, value){
            if(value.budgetid == budgetid){
                if(list.length == 0){
                    list[0] = value;
                }
                let gate = true;
                $.each(list, function(key, val){
                    // console.log(val.partid, value.partid, val.partid == value.partid);
                    if(val.milestoneid == value.milestoneid){
                        gate = false;
                    }
                });
                if(gate){
                    list[list.length] = value;
                }
            }
        });
        list.sort((a, b) => (a.budgetid > b.budgetid) ? 1 : -1);
        return list;
    }
    getMilestoneObjByMilestoneId(milestoneid){
        let list = [];
        $.each(this.Milestone, function(key, value){
            if(value.milestoneid == milestoneid){
                list.push(value);
            }
        });
        return list;
    }


    fetchManhours(options, callback){
        let list = [];
        const cbsuccess=data=>{
            console.log(data);
            $.each(data, function(key, value){
                const obj = {
                    'id' : value.id,
                    'budgetid' : value.budgetid,
                    'projectid' : value.projectid,
                    'name' : value.name,
                    'role' : value.role,
                    'hours' : value.hours,
                    'rate' : value.rate,
                    'weeks' : value.weeks,
                    'trips' : value.trips,
                    'distance' : value.distance,
                    'distancerate' : value.distancerate,
                    'triphours' : value.triphours,
                    'triphoursrate' : value.triphoursrate,
                    'fixedrate' : value.fixedrate
                }
                list.push(obj);
            });
        };
        const cbcomplete=()=>{
            callback('Fetching Project Budget Manhours');
        };
        capi_fetchProjectBudgetManhours(options, cbsuccess, cbcomplete)
        return list;
    }
    createManhours(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = {
                'id' : options.id,
                'budgetid' : options.budgetid,
                'projectid' : options.projectid,
                'name' : options.name,
                'role' : options.role,
                'hours' : options.hours,
                'rate' : options.rate
            };
            this.Manhours.push(obj);
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createProjectBudgetManhours(options, cbsuccess, cbcomplete);
    }
    deleteManhours(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = $.grep(this.Manhours, function(e){ 
                return e.id != options.id; 
            });
            this.Manhours = obj;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_deleteProjectBudgetManhours(options, cbsuccess, cbcomplete);
    }
    updateExpense(options, callback){
        let obj = this.Manhours.find(obj => obj.id == options.id);
        const cbsuccess=data=>{
            console.log(data);
            obj.date = options.date;
            obj.weeks = options.weeks;
            obj.trips = options.trips;
            obj.distance = options.distance;
            obj.distancerate = options.distancerate;
            obj.triphours = options.triphours;
            obj.triphoursrate = options.triphoursrate;
            obj.fixedrate = options.fixedrate;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_updateProjectBudgetExpense(options, cbsuccess, cbcomplete);
    }
    getManhourByBudgetId(budgetid){
        let list = [];
            $.each(this.Manhours, function(key, value){
                if(value.budgetid == budgetid){
                    list.push(value);
                }
            });
        return list;
    }
    getManhourCostByBudgetId(budgetid){
        let ret = 0;
            $.each(this.Manhours, function(key, value){
                if(value.budgetid == budgetid){
                    // list.push(value);
                    const r = isNaN(parseFloat(value.rate)) ? 0 : parseFloat(value.rate);
                    const h = isNaN(parseFloat(value.hours)) ? 0 : parseFloat(value.hours);
                    const weeks = isNaN(parseFloat(value.weeks)) ? 0 : parseFloat(value.weeks);
                    const trips = isNaN(parseFloat(value.trips)) ? 0 : parseFloat(value.trips);
                    const distance = isNaN(parseFloat(value.distance)) ? 0 : parseFloat(value.distance);
                    const distancerate = isNaN(parseFloat(value.distancerate)) ? 0 : parseFloat(value.distancerate);
                    const triphours = isNaN(parseFloat(value.triphours)) ? 0 : parseFloat(value.triphours);
                    const triphoursrate = isNaN(parseFloat(value.triphoursrate)) ? 0 : parseFloat(value.triphoursrate);
                    const fixedrate = isNaN(parseFloat(value.fixedrate)) ? 0 : parseFloat(value.fixedrate);

                    const m = (r * h);
                    const e = ( (weeks * trips * distance * distancerate) + (triphours * triphoursrate) + (fixedrate) );
                    ret += (m + e);
                }
            });
        return ret;
    }
    getManhourNameById(manhourid){
        let list = '';
            $.each(this.Manhours, function(key, value){
                if(value.id == manhourid){
                    list = value.name;
                }
            });
        return list;
    }
    getManhourRateById(manhourid){
        let list = '';
            $.each(this.Manhours, function(key, value){
                if(value.id == manhourid){
                    list = value.rate;
                }
            });
        return list;
    }
    

    fetchForecast(options, callback){
        let list = [];
        const cbsuccess=data=>{
            console.log(data);
            $.each(data, function(key, value){
                const obj = {
                    'id' : value.id,
                    'projectid' : value.projectid,
                    'resourceid' : value.resourceid,
                    'year' : value.year,
                    'type' : value.type,
                    'm1' : value.m1,
                    'm2' : value.m2,
                    'm3' : value.m3,
                    'm4' : value.m4,
                    'm5' : value.m5,
                    'm6' : value.m6,
                    'm7' : value.m7,
                    'm8' : value.m8,
                    'm9' : value.m9,
                    'm10' : value.m10,
                    'm11' : value.m11,
                    'm12' : value.m12
                }
                list.push(obj);
            });
        };
        const cbcomplete=()=>{
            callback('Fetching Project Budget Forecast');
        };
        capi_fetchProjectBudgetAForecast(options, cbsuccess, cbcomplete)
        return list;
    }
    createForecast(options, callback){
        let nobj = this.Forecast.find(obj => obj.id == options.id);
        const cbsuccess=data=>{
            console.log(data);
            const obj = {
                'id' : options.id,
                'projectid' : options.projectid,
                'resourceid' : options.resourceid,
                'year' : options.year,
                'type' : options.type,
                'm1' : options.m1,
                'm2' : options.m2,
                'm3' : options.m3,
                'm4' : options.m4,
                'm5' : options.m5,
                'm6' : options.m6,
                'm7' : options.m7,
                'm8' : options.m8,
                'm9' : options.m9,
                'm10' : options.m10,
                'm11' : options.m11,
                'm12' : options.m12,
            };
            if(nobj == undefined){
                this.Forecast.push(obj);
            }else{
                nobj.m1 = options.m1;
                nobj.m2 = options.m2;
                nobj.m3 = options.m3;
                nobj.m4 = options.m4;
                nobj.m5 = options.m5;
                nobj.m6 = options.m6;
                nobj.m7 = options.m7;
                nobj.m8 = options.m8;
                nobj.m9 = options.m9;
                nobj.m10 = options.m10;
                nobj.m11 = options.m11;
                nobj.m12 = options.m12;
            }
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createProjectBudgetAForecast(options, cbsuccess, cbcomplete);
    }
    getDistinctOpexForecastYearList(){
        let list = [];
        $.each(this.Forecast, function(key, value){
            if(value.type == "opex"){
                if(list.length == 0){
                    list[0] = {"year" : value.year};
                }
                let gate = true;
                $.each(list, function(key, val){
                    // console.log(val.partid, value.partid, val.partid == value.partid);
                    if(val.year == value.year){
                        gate = false;
                    }
                });
                if(gate){
                    list[list.length] = {"year" : value.year};;
                }
            }
        });
        list.sort((a, b) => (parseFloat(a.year) > parseFloat(b.year)) ? 1 : -1);
        return list;
    }
    getDistinctCapexForecastYearList(){
        let list = [];
        $.each(this.Forecast, function(key, value){
            if(value.response != "error" && value.type != undefined){
                if(value.type.includes("capex")){
                    if(list.length == 0){
                        list[0] = {"year" : value.year};
                    }
                    let gate = true;
                    $.each(list, function(key, val){
                        // console.log(val.partid, value.partid, val.partid == value.partid);
                        if(val.year == value.year){
                            gate = false;
                        }
                    });
                    if(gate){
                        list[list.length] = {"year" : value.year};;
                    }
                }
            }
        });
        list.sort((a, b) => (parseFloat(a.year) > parseFloat(b.year)) ? 1 : -1);
        return list;
    }
    getForecastObjByYear(year){
        let list = [];
            $.each(this.Forecast, function(key, value){
                if(value.year == year){
                    list.push(value);
                }
            });
        return list;
    }
    getCapexForecastObjByYear(year){
        let list = [];
            $.each(this.Forecast, function(key, value){
                if(value.year == year && this.type.includes('capex')){
                    list.push(value);
                }
            });
        return list;
    }
    getCapexForecastObjByYearAndResourceId(resourceid, year){
        let list = [];
            $.each(this.Forecast, function(key, value){
                if(value.year == year && this.type.includes('capex') && value.resourceid == resourceid){
                    list.push(value);
                }
            });
        return list;
    }
    getForecastObj(){
        return this.Forecast;
    }
    getTotalCapexBudget(){
        let ret = 0;
        $.each(this.Forecast, function(key, favalue){
            if(favalue.type == "capextm" || favalue.type == "capexsupplier"){
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
    
                ret += (zm1val + zm2val + zm3val + zm4val + zm5val + zm6val + zm7val + zm8val + zm9val + zm10val + zm11val + zm12val);
            }
        });
        return ret;
    }
    getCapexBudgetByResourceIdAndType(resid, type){
        let ret = 0;
        $.each(this.Forecast, function(key, favalue){
            if(favalue.type == type  && favalue.resourceid == resid){
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
    
                ret += (zm1val + zm2val + zm3val + zm4val + zm5val + zm6val + zm7val + zm8val + zm9val + zm10val + zm11val + zm12val);
            }
        });
        return ret;
    }
    getOpexBudgetByResourceId(resid){
        let ret = 0;
        $.each(this.Forecast, function(key, favalue){
            if(favalue.type == "opex"  && favalue.resourceid == resid){
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
    
                ret += (zm1val + zm2val + zm3val + zm4val + zm5val + zm6val + zm7val + zm8val + zm9val + zm10val + zm11val + zm12val);
            }
        });
        return ret;
    }

}
class ProjectInvoice{
    constructor(options){
        this.list = this.fetch(options);
        this.Lumpsum = this.fetchLumpsum(options);
        this.Material = this.fetchMaterial(options);
        this.Manhours = this.fetchManhours(options);
        this.Milestone = this.fetchMilestone(options);
        this.Expense = this.fetchExpense(options);
        this.Forecast = this.fetchForecast(options);
        this.Upload = this.fetchUpload(options);
    }

    fetch(options){
        let list = [];
        const cbsuccess=data=>{
            // console.log(data);
            $.each(data, function(key, value){
                const obj = {
                    'id' : value.id,
                    'projectid' : value.projectid,
                    'supplierid' : value.supplierid,
                    'budgetid' : value.budgetid,
                    'invoicedate' : value.invoicedate,
                    'invoicedetail' : value.invoicedetail,
                    'invoicenumber' : value.invoicenumber,
                    'exchangerate' : value.exchangerate
                }
                if(obj.id != undefined){
                    list.push(obj);
                }
            });
        };
        const cbcomplete=()=>{
            options.callback('Fetching Project Invoice');
        };
        capi_fetchProjectInvoice(options, cbsuccess, cbcomplete)
        return list;
    }
    createInvoice(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = {
                'id' : options.id,
                'projectid' : options.projectid,
                'supplierid' : options.supplierid,
                'budgetid' : options.budgetid,
                'invoicedate' : options.invoicedate,
                'invoicedetail' : options.invoicedetail,
                'invoicenumber' : options.invoicenumber,
                'exchangerate' : options.exchangerate
            };
            this.list.push(obj);
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createProjectInvoice(options, cbsuccess, cbcomplete);
    }
    updateInvoiceAttachment(options, callback){
        const cbsuccess=()=>{
            let obj = this.list.find(obj => obj.id == options.id);
            obj.attachment = options.attachment;
            obj.filename = options.filename;
        };
        const cbcomplete=()=>{
            callback();
        };
        api_updateProjectInvoiceAttachment(options, cbsuccess, cbcomplete);
    }
    getObj(){
        return this.list;
    }
    getObjByBudgetId(budgetid){
        let list = [];
        $.each(this.list, function(key, value){
            if(value.budgetid == budgetid){
                list.push(value);
            }
        });
        return list;
    }
    getObjByYear(year){
        let list = [];
        $.each(this.list, function(key, value){
            const d = value.invoicedate.split('-');
            const yyyy = d[0];
            // console.log(d, yyyy);
            if(yyyy == year){
                list.push(value);
            }
        });
        return list;
    }
    getObjByBudgetIdAndYear(budgetid, year){
        let list = [];
        $.each(this.list, function(key, value){
            const d = value.invoicedate.split('-');
            const yyyy = d[0];
            if(value.budgetid == budgetid && yyyy == year){
                list.push(value);
            }
        });
        return list;
    }


    fetchLumpsum(options){
        let list = [];
        const cbsuccess=data=>{
            // console.log(data);
            $.each(data, function(key, value){
                const obj = {
                    'id' : value.id,
                    'projectid' : value.projectid,
                    'invoiceid' : value.invoiceid,
                    'milestoneid' : value.milestoneid,
                    'amount' : value.amount,
                }
                if(obj.id != undefined){
                    list.push(obj);
                }
            });
        };
        const cbcomplete=()=>{
            options.callback('Fetching Project Invoice Lumpsum');
        };
        capi_fetchProjectInvoiceLumpsum(options, cbsuccess, cbcomplete)
        return list;
    }
    createInvoiceLumpsum(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = {
                'id' : options.id,
                'projectid' : options.projectid,
                'invoiceid' : options.invoiceid,
                'milestoneid' : options.milestoneid,
                'amount' : options.amount,
            };
            this.Lumpsum.push(obj);
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createProjectInvoiceLumpsum(options, cbsuccess, cbcomplete);
    }
    updateInvoiceLumpsum(options, callback){
        const cbsuccess=()=>{
            let obj = this.Lumpsum.find(obj => obj.id == options.id);
            obj.amount = options.amount;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_updateProjectInvoiceLumpsum(options, cbsuccess, cbcomplete);
    }
    getLumpsumObj(){
        return this.Lumpsum;
    }
    getLumpsumCostingByInvoiceId(invoiceid){
        let val = 0;
        $.each(this.Lumpsum, function(key, value){
            if(value.invoiceid == invoiceid){
                val += isNaN(parseFloat(value.amount)) ? 0 : parseFloat(value.amount);
            }
        });
        return val;
    }

    fetchUpload(options){
        let list = [];
        const cbsuccess=data=>{
            // console.log(data);
            $.each(data, function(key, value){
                const obj = {
                    'id' : value.id,
                    'projectid' : value.projectid,
                    'invoiceid' : value.invoiceid,
                    'link' : value.link,
                    'filename' : value.filename,
                    'costing' : value.costing
                }
                list.push(obj);
            });
        };
        const cbcomplete=()=>{
            options.callback('Fetching Project Invoice Upload');
        };
        capi_fetchProjectInvoiceUpload(options, cbsuccess, cbcomplete)
        return list;
    }
    createUpload(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            // let nobj = this.Upload.find(obj => obj.id == options.id);
            const obj = {
                'id' : options.id,
                'projectid' : options.projectid,
                'invoiceid' : options.invoiceid,
                'link' : options.link,
                'filename' : options.filename,
                'costing' : options.costing
            };
            console.log(this.Upload, obj);
            this.Upload.push(obj);
            // if(nobj == undefined){
            //     this.Upload.push(obj);
            // }else{
            //     nobj.name = options.name;
            //     nobj.payment = options.payment;
            // }
            
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createProjectInvoiceUpload(options, cbsuccess, cbcomplete);
    }
    deleteUpload(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = $.grep(this.Upload, function(e){ 
                return e.id != options.id; 
            });
            this.Upload = obj;
        };
        const cbcomplete=()=>{
            ajax_deleteSingleFile(`../../${options.link}`, ()=>{}, callback);
        };
        capi_deleteProjectInvoiceUpload(options, cbsuccess, cbcomplete);
    }
    deleteUploadByInvoiceid(invoiceid){
        const dis = this;
        $.each(this.Upload, function(key, value){
            if(value.invoiceid == invoiceid){
                dis.deleteUpload({"id" : value.id, "link" : value.link}, ()=>{});
            }
        });

    // callback();

    }
    getUploadByInvoiceId(invoiceid){
        let list = [];
        $.each(this.Upload, function(key, value){
            if(value.invoiceid == invoiceid){
                list.push(value);
            }
        });
        return list;
    }
    getUploadById(id){
        let list = {};
        $.each(this.Upload, function(key, value){
            if(value.id == id){
                list = value;
            }
        });
        return list;
    }


    fetchMaterial(options){
        let list = [];
        const cbsuccess=data=>{
            // console.log(data);
            $.each(data, function(key, value){
                const obj = {
                    'id':value.id,
                    'projectid':value.projectid,
                    'invoiceid':value.invoiceid,
                    'materialid':value.materialid,
                    'amount':value.amount
                }
                if(obj.id != undefined){
                    list.push(obj);
                }
            });
        };
        const cbcomplete=()=>{
            options.callback('Fetching Project Incoice Material');
        };
        capi_fetchProjectInvoiceMaterial(options, cbsuccess, cbcomplete)
        return list;
    }
    createInvoiceMaterial(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = {
                'id':options.id,
                'projectid':options.projectid,
                'invoiceid':options.invoiceid,
                'materialid':options.materialid,
                'amount':options.amount
            };
            this.Material.push(obj);
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createProjectInvoiceMaterial(options, cbsuccess, cbcomplete);
    }
    updateInvoiceMaterial(options, callback){
        const cbsuccess=()=>{
            let obj = this.Material.find(obj => obj.id == options.id);
            obj.amount = options.amount;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_updateProjectInvoiceMaterial(options, cbsuccess, cbcomplete);
    }
    getMaterialObj(){
        return this.Material;
    }
    getMaterialCostingByInvoiceId(invoiceid){
        let val = 0;
        $.each(this.Material, function(key, value){
            if(value.invoiceid == invoiceid){
                // console.log(value.amount);
                val += (isNaN(parseFloat(value.amount)) ? 0 : parseFloat(value.amount));
            }
        });
        return val;
    }

    fetchMilestone(options){
        let list = [];
        const cbsuccess=data=>{
            // console.log(data);
            $.each(data, function(key, value){
                
                const obj = {
                    'id':value.id,
                    'projectid':value.projectid,
                    'invoiceid':value.invoiceid,
                    'milestoneid':value.milestoneid,
                    'resourceid':value.resourceid,
                    'hours':value.hours,
                }
                if(obj.id != undefined){
                    list.push(obj);
                }
            });
        };
        const cbcomplete=()=>{
            options.callback('Fetching Project Incoice Milestone');
        };
        capi_fetchProjectInvoiceMilestone(options, cbsuccess, cbcomplete);
        return list;
    }
    createInvoiceMilestone(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            let nobj = this.Milestone.find(obj => obj.id == options.id);
            const obj = {
                'id':options.id,
                'projectid':options.projectid,
                'invoiceid':options.invoiceid,
                'milestoneid':options.milestoneid,
                'resourceid':options.resourceid,
                'hours':options.hours,
            };
            
            if(nobj == undefined){
                this.Milestone.push(obj);
            }else{
                nobj.hours = options.hours;
            }
            
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createProjectInvoiceMilestone(options, cbsuccess, cbcomplete);
    }
    updateInvoiceMilestone(options, callback){
        const cbsuccess=()=>{
            let obj = this.Milestone.find(obj => obj.id == options.id);
            obj.hours = options.hours;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_updateProjectInvoiceMilestone(options, cbsuccess, cbcomplete);
    }
    getMilestoneObj(){
        return this.Milestone;
    }
    getMilestoneObjByMilestoneId(milestoneid){
        let list = [];
        $.each(this.Milestone, function(key, value){
            if(value.milestoneid == milestoneid){
                list.push(value);
            }
        });
        return list;
    }
    getMilestoneObjByMilestoneIdAndInvoiceId(milestoneid, invoiceid){
        let list = [];
        $.each(this.Milestone, function(key, value){
            if(value.milestoneid == milestoneid && value.invoiceid == invoiceid){
                list.push(value);
            }
        });
        return list;
    }

    fetchManhours(options){
        let list = [];
        const cbsuccess=data=>{
            // console.log(data);
            $.each(data, function(key, value){
                const obj = {
                    'id' : value.id,
                    'projectid' : value.projectid,
                    'invoiceid' : value.invoiceid,
                    'resourceid' : value.resourceid,
                    'hours' : value.hours,
                }
                if(obj.id != undefined){
                    list.push(obj);
                }
            });
        };
        const cbcomplete=()=>{
            options.callback('Fetching Project Incoice Manhours');
        };
        capi_fetchProjectInvoiceManhours(options, cbsuccess, cbcomplete)
        return list;
    }
    createInvoiceManhours(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = {
                'id' : options.id,
                'projectid' : options.projectid,
                'invoiceid' : options.invoiceid,
                'resourceid' : options.resourceid,
                'hours' : options.hours,
            };
            this.Manhours.push(obj);
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createProjectInvoiceManhours(options, cbsuccess, cbcomplete);
    }
    updateInvoiceManhours(options, callback){
        const cbsuccess=()=>{
            let obj = this.Manhours.find(obj => obj.id == options.id);
            obj.hours = options.hours;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_updateProjectInvoiceManhours(options, cbsuccess, cbcomplete);
    }
    getManhoursObj(){
        return this.Manhours;
    }
    getManhoursObjByInvoiceId(invoiceid){
        let list = [];
        $.each(this.Manhours, function(key, value){
            if(value.invoiceid == invoiceid){
                list.push(value);
            }
        });
        return list;
    }
    

    fetchExpense(options){
        let list = [];
        const cbsuccess=data=>{
            // console.log(data);
            $.each(data, function(key, value){
                const obj = {
                    'id' : value.id,
                    'projectid' : value.projectid,
                    'invoiceid' : value.invoiceid,
                    'resourceid' : value.resourceid,
                    'weeks' : value.weeks,
                    'trips' : value.trips,
                    'distance' : value.distance,
                    'distancerate' : value.distancerate,
                    'triphours' : value.triphours,
                    'triphoursrate' : value.triphoursrate,
                    'fixedrate' : value.fixedrate,
                }
                if(obj.id != undefined){
                    list.push(obj);
                }
            });
        };
        const cbcomplete=()=>{
            options.callback('Fetching Project Incoice Expense');
        };
        capi_fetchProjectInvoiceExpense(options, cbsuccess, cbcomplete)
        return list;
    }
    createInvoiceExpense(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = {
                'id' : options.id,
                'projectid' : options.projectid,
                'invoiceid' : options.invoiceid,
                'resourceid' : options.resourceid,
                'weeks' : options.weeks,
                'trips' : options.trips,
                'distance' : options.distance,
                'distancerate' : options.distancerate,
                'triphours' : options.triphours,
                'triphoursrate' : options.triphoursrate,
                'fixedrate' : options.fixedrate,
            };
            this.Expense.push(obj);
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createProjectInvoiceExpense(options, cbsuccess, cbcomplete);
    }
    updateInvoiceExpense(options, callback){
        const cbsuccess=()=>{
            let obj = this.Expense.find(obj => obj.id == options.id);
            obj.weeks = options.weeks;
            obj.trips = options.trips;
            obj.distance = options.distance;
            obj.distancerate = options.distancerate;
            obj.triphours = options.triphours;
            obj.triphoursrate = options.triphoursrate;
            obj.fixedrate = options.fixedrate;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_updateProjectInvoiceExpense(options, cbsuccess, cbcomplete);
    }
    getExpenseObj(){
        return this.Expense;
    }
    getExpenseCostingByInvoiceId(invoiceid){
        let val = 0;
        $.each(this.Expense, function(key, value){
            if(value.invoiceid == invoiceid){
                const total = ( ( (isNaN(parseFloat(value.weeks)) ? 0 : parseFloat(value.weeks) ) * (isNaN(parseFloat(value.trips)) ? 0 : parseFloat(value.trips) ) * (isNaN(parseFloat(value.distance)) ? 0 : parseFloat(value.distance) ) * (isNaN(parseFloat(value.distancerate)) ? 0 : parseFloat(value.distancerate) ) ) + ( (isNaN(parseFloat(value.triphours)) ? 0 : parseFloat(value.triphours) ) * (isNaN(parseFloat(value.triphoursrate)) ? 0 : parseFloat(value.triphoursrate) ) ) + (isNaN(parseFloat(value.fixedrate)) ? 0 : parseFloat(value.fixedrate) ) );
                val += total;
            }
        });
        return val;
    }


    fetchForecast(options){
        let list = [];
        const cbsuccess=data=>{
            // console.log(data);
            $.each(data, function(key, value){
                const obj = {
                    'id' : value.id,
                    'projectid' : value.projectid,
                    'resourceid' : value.resourceid,
                    'year' : value.year,
                    'type' : value.type,
                    'm1' : value.m1,
                    'm2' : value.m2,
                    'm3' : value.m3,
                    'm4' : value.m4,
                    'm5' : value.m5,
                    'm6' : value.m6,
                    'm7' : value.m7,
                    'm8' : value.m8,
                    'm9' : value.m9,
                    'm10' : value.m10,
                    'm11' : value.m11,
                    'm12' : value.m12
                }
                if(obj.id != undefined){
                    list.push(obj);
                }
            });
        };
        const cbcomplete=()=>{
            options.callback('Fetching Project Incoice Forecast');
        };
        capi_fetchProjectInvoiceForecast(options, cbsuccess, cbcomplete)
        return list;
    }
    createInvoiceForecast(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            let nobj = this.Forecast.find(obj => obj.id == options.id);
            const obj = {
                'id' : options.id,
                'projectid' : options.projectid,
                'resourceid' : options.resourceid,
                'year' : options.year,
                'type' : options.type,
                'm1' : options.m1,
                'm2' : options.m2,
                'm3' : options.m3,
                'm4' : options.m4,
                'm5' : options.m5,
                'm6' : options.m6,
                'm7' : options.m7,
                'm8' : options.m8,
                'm9' : options.m9,
                'm10' : options.m10,
                'm11' : options.m11,
                'm12' : options.m12
            };
            if(nobj == undefined){
                this.Forecast.push(obj);
            }else{
                nobj.m1 = options.m1;
                nobj.m2 = options.m2;
                nobj.m3 = options.m3;
                nobj.m4 = options.m4;
                nobj.m5 = options.m5;
                nobj.m6 = options.m6;
                nobj.m7 = options.m7;
                nobj.m8 = options.m8;
                nobj.m9 = options.m9;
                nobj.m10 = options.m10;
                nobj.m11 = options.m11;
                nobj.m12 = options.m12;
            }
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createProjectInvoiceForecast(options, cbsuccess, cbcomplete);
    }
    getForecastObjByResourceIdAndYear(resourceid, year){
        let list = [];
        $.each(this.Forecast, function(key, value){
            if(value.resourceid == resourceid && value.year == year){
                list.push(value);
            }
        });
        return list;
    }
    getForecastObjByYear(year){
        let list = [];
        $.each(this.Forecast, function(key, value){
            if(value.year == year){
                list.push(value);
            }
        });
        return list;
    }


}
class ProjectPrerequest{
    constructor(options){
        this.list = this.fetch(options);
    }

    fetch(options){
        let list = [];
        const cbsuccess=data=>{
            // console.log(data);
            $.each(data, function(key, value){
                const obj = {
                    'id' : value.id,
                    'projectid' : value.projectid,
                    'name' : value.name,
                    'status' : value.status,
                    'docnum' : value.docnum,
                    'comments' : value.comments
                }
                if(obj.id != undefined){
                    list.push(obj);
                }
            });
        };
        const cbcomplete=()=>{
            options.callback('Fetching Project Prerequest');
        };
        capi_fetchProjectPrereq(options, cbsuccess, cbcomplete)
        return list;
    }
    create(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = {
                'id' : options.id,
                'projectid' : options.projectid,
                'name' : options.name,
                'status' : options.status,
                'docnum' : options.docnum,
                'comments' : options.comments
            };
            this.list.push(obj);
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createProjectPrereq(options, cbsuccess, cbcomplete);
    }
    delete(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = $.grep(this.list, function(e){ 
                return e.id != options.id; 
            });
            this.list = obj;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_deleteProjectPrereq(options, cbsuccess, cbcomplete);
    }
    update(options, callback){
        console.log(options);
        let obj = this.list.find(obj => obj.id == options.id);
        const cbsuccess=data=>{
            console.log(data);
            obj.name = options.name,
            obj.status = options.status,
            obj.docnum = options.docnum,
            obj.comments = options.comments
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_updateProjectPrereq(options, cbsuccess, cbcomplete);
    }

    getObj(){
        return this.list;
    }

}



class P_Supplier{
    constructor(options){
        this.list = this.fetch(options);
    }

    fetch(options){
        let list = [];
        const cbsuccess=data=>{
            // console.log(data);
            $.each(data, function(key, value){
                const obj = {
                    "supplierid" : value.supplierid,
                    "suppliername" : value.suppliername,
                    "type" : value.type
                };
                list[list.length] = obj;
            });
        };
        const cbcomplete=()=>{
            options.callback('Fetching Project Suppliers');
        };
        capi_fetchSupplierByProjectResource(options, cbsuccess, cbcomplete);
        return list;
    }
    getConnectByResource(){
        return this.list;
    }
    

}
class P_AccountRate{
    constructor(options){
        this.list = this.fetch(options);
    }
    
    fetch(options){
        let list = [];
        const cbsuccess=data=>{
            console.log(data);
            $.each(data, function(key, value){
                const obj = {
                    "id" : value.id,
                    "accid" : value.accid,
                    "rate" : value.rate
                };
                list[list.length] = obj;
            });
        };
        const cbcomplete=()=>{
            options.callback('Fetching Account Rates');
        };
        capi_fetchAccountRatesByProjectId(options, cbsuccess, cbcomplete);
        return list;
    }
    create(options, callback){
        const dis = this;
        const cbsuccess=data=>{
            console.log(data);
            let createGate = true;
            $.each(dis.list, function(key, value){
                if(value.id == options.id){
                    dis.list[key]["rate"] = options.rate;
                    createGate = false;
                }
            });
            if(createGate){
                dis.list[dis.list.length] = {
                    "id" : options.id,
                    "accid" : options.accid,
                    "rate" : options.rate
                };
            }
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createAccountRate(options, cbsuccess, cbcomplete);
    }
    getList(){
        return this.list;
    }
    getObjByAccidAndProjectid(options){
        let list = undefined;
        $.each(this.list, function(key, value){
            if(value.accid == options.accid){
                list = value;
            }
        });
        return list;
    }
    mapAccount(options){
        let tmpaccobj = this.list.find(obj => obj.id == options.tmpid);
        if(tmpaccobj != undefined){
            tmpaccobj.id = options.accid;
        }else{
            let accobj = this.list.find(obj => obj.id == options.accid);
            if(accobj == undefined){
                // const rate = this.TmpAccount.find(obj => obj.id == options.tmpid);
                const obj = {
                    "id" : options.rateid,
                    "accid" : options.accid,
                    "rate" : options.rate
                };
                this.list.push(obj);
            }
        }
    }

}

class P_AccountRole{
    constructor(options){
        this.list = this.fetch(options);
    }
    
    fetch(options){
        let list = [];
        const cbsuccess=data=>{
            console.log(data);
            $.each(data, function(key, value){
                const obj = {
                    'id' : options.id,
                    'accid' : options.accid,
                    'projectid' : options.projectid,
                    'role' : options.role
                };
                list[list.length] = obj;
            });
        };
        const cbcomplete=()=>{
            options.callback('Fetching Account Roles');
        };
        capi_fetchAccountRoleByProjectId(options, cbsuccess, cbcomplete);
        return list;
    }
    // create(options, callback){
    //     const dis = this;
    //     const cbsuccess=data=>{
    //         console.log(data);
    //         let createGate = true;
    //         $.each(dis.list, function(key, value){
    //             if(value.id == options.id){
    //                 dis.list[key]["rate"] = options.rate;
    //                 createGate = false;
    //             }
    //         });
    //         if(createGate){
    //             dis.list[dis.list.length] = {
    //                 "id" : options.id,
    //                 "accid" : options.accid,
    //                 "rate" : options.rate
    //             };
    //         }
    //     };
    //     const cbcomplete=()=>{
    //         callback();
    //     };
    //     capi_createAccountRate(options, cbsuccess, cbcomplete);
    // }
    getList(){
        return this.list;
    }
    getObjByAccid(accid){
        let list = [];
        $.each(this.list, function(key, value){
            if(value.accid == accid){
                list = value;
            }
        });
        return list;
    }

}
class P_SupplierRate{
    constructor(options){
        this.list = this.fetch(options);
    }
    
    fetch(options){
        let list = [];
        const cbsuccess=data=>{
            console.log(data);
            $.each(data, function(key, value){
                const obj = {
                    "id" : value.id,
                    "supplierid" : value.supplierid,
                    "type" : value.type,
                    "rate" : value.rate
                };
                list[list.length] = obj;
            });
        };
        const cbcomplete=()=>{
            options.callback('Fetching Supplier Rates');
        };
        capi_fetchSupplierRateByProjectid(options, cbsuccess, cbcomplete);
        return list;
    }
    create(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            let createGate = true;
            $.each(this.list, function(key, value){
                if(value.id == options.id){
                    this.list[key]["rate"] = options.rate;
                    createGate = false;
                }
            });
            if(createGate){
                this.list[this.list.length] = {
                    "id" : options.id,
                    "supplierid" : options.supplierid,
                    "type" : options.type,
                    "rate" : options.rate
                };
            }
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createSupplierRate(options, cbsuccess, cbcomplete);
    }
    getList(){
        return this.list;
    }
    getObjBySupplieridType(options){
        let list = undefined;
        $.each(this.list, function(key, value){
            if(value.supplierid == options.supplierid && value.type == options.type){
                list = value;
            }
        });
        return list;
    }

}
