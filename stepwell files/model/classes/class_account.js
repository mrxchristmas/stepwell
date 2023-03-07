


class User{
    constructor(options){
        this.fetchCallback('START');
        this.id = options.id;
        this.companyid = options.companyid;
        this._PROJECTS = this.fetchProjects(options.id);
        this.connected_projects = undefined;
        this.COMPANY_ACCOUNTS = undefined;
        this.IncomingProjectRequest = undefined;
        this.OutgoingProjectRequest = undefined;
        this.Department = undefined;
        this.Position = undefined;
        this.UploadedDocument = undefined; // this will fetch out documents that are not assigned to a project. used for document mapping
        this.Supplier = undefined;
        this.ProjectGroup = undefined;
        this.ProjectGroupList = undefined;
        this.Alert = undefined;
        this.Skid = undefined;
        // this.Complains = undefined;
        this.fetchCallback('END');
        this.removeLoader();
        // this._SUPPLIER = new U_Supplier();
    }
    fetchProjects(id){
        let list = [];
        const cbsuccess=data=>{
            // console.log("fetchConnectProjects",data);
            const dis = this;
            console.log('----------------------',data);
            if(data.response != "error"){
                $.each(data, function(key, value){
                    const obj = {
                        "projectid" : value.projectid,
                        "companyid" : value.companyid,
                        "ownerid" : value.ownerid,
                        "creator" : value.creator,
                        "projectname" : value.projectname,
                        "reference" : value.reference,
                        "status" : value.status,
                        "groupid" : value.groupid,
                        "fetchCallback" : dis.fetchCallback
                    }
                    list[list.length] = new Project(obj);
                });
            }
        };
        const cbcomplete=()=>{
            // console.log('fetch ok: Connected Project: ');
        };
        // const param = {
        //     "id" : id
        // };
        // capi_fetchProjectByConnect(param, cbsuccess, cbcomplete);
        capi_fetchProjectsBySuperiorId({"accid": id}, cbsuccess, cbcomplete);
        return list;
    }
    fetchCompanyAccounts(options){
        let list = [];
        // console.log('fetching accounts');
        const cbsuccess=data=>{
            $.each(data, function(key, value){
                if(value.userlevel != '0' || __COMPANY_ID == "admincontrol"){
                    const obj = {
                        'id' : value.id,
                        'companyid' : value.companyid,
                        'email' : value.email,
                        'password' : value.password,
                        'userlevel' : value.userlevel,
                        'lastname' : value.lastname,
                        'firstname' : value.firstname,
                        'phone' : value.phone,
                        'birthdate' : value.birthdate,
                        'position' : value.position,
                        'department' : value.department,
                        'photo' : value.photo,
                        'superid' : value.superid,
                    };
                    list[list.length] = obj;
                }
            });
        };
        const cbcomplete=()=>{
            options.callback();
        };
        if(__COMPANY_ID != "admincontrol"){
            capi_fetchAccount(options, cbsuccess, cbcomplete);
            console.log('NOT ADMIN CONTROL');
        }else{
            capi_AdminfetchAccount(cbsuccess, cbcomplete);
            console.log('YES ADMIN CONTROL');
        }
        
        return list;
    }
    fetchIncomingProjectRequest(options){
        let list = [];
        const cbsuccess=data=>{
            console.log(data);
            $.each(data, function(key, value){
                if(value.userlevel != '0' && value.projectid != undefined){
                    const obj = {
                        'id' : value.id,
                        'projectid' : value.projectid,
                        'accid' : value.accid,
                        'status' : value.status,
                        'notes' : value.notes,
                    };
                    list[list.length] = obj;
                }
            });
        };
        const cbcomplete=()=>{
            options.callback();
        };
        capi_fetchProjectRequestConnectByAccid({"accid" : this.id}, cbsuccess, cbcomplete);
        return list;
    }
    fetchOutgoingProjectRequest(options){
        let list = [];
        const cbsuccess=data=>{
            console.log(data);
            $.each(data, function(key, value){
                if(value.userlevel != '0' && value.projectid != undefined){
                    const obj = {
                        'projectid' : value.projectid,
                        'projectname' : value.projectname,
                        'ownerid' : value.ownerid,
                        'creator' : value.creator,
                        'status' : value.status
                    };
                    list[list.length] = obj;
                }
            });
        };
        const cbcomplete=()=>{
            options.callback();
        };
        capi_fetchInactiveProjectbyAccid({"accid" : this.id}, cbsuccess, cbcomplete);
        return list;
    }
    fetchDepartment(options){
        let list = [];
        const cbsuccess=data=>{
            // console.log(data);
            $.each(data, function(key, value){
                if(value.userlevel != '0'){
                    const obj = {
                        'id' : value.id,
                        'title' : value.title
                    };
                    list[list.length] = obj;
                }
            });
        };
        const cbcomplete=()=>{
            options.callback();
        };
        capi_fetchDepartments({"comid" : this.companyid}, cbsuccess, cbcomplete);
        return list;
    }
    fetchPosition(options){
        let list = [];
        const cbsuccess=data=>{
            // console.log(data);
            $.each(data, function(key, value){
                if(value.userlevel != '0'){
                    const obj = {
                        'id' : value.id,
                        'title' : value.title,
                        'department' : value.department
                    };
                    list[list.length] = obj;
                }
            });
        };
        const cbcomplete=()=>{
            options.callback();
        };
        capi_fetchPosition({"comid" : this.companyid}, cbsuccess, cbcomplete);
        return list;
    }
    getProjectReport(){
        let obj = {
            "owned" : 0,
            "connected" : this._PROJECTS.length,
            "active" : 0,
            "inactive" : 0,
            "archived" : 0
        }
        $.each(this._PROJECTS, function(key, value){
            if(value.status == "active"){
                obj.active += 1;
            }else if(value.status == "inactive"){
                obj.inactive += 1;
            }else if(value.status == "archived"){
                obj.archived += 1;
            }
            if(obj.ownerid == __ID){
                obj.owned += 1;
            }
        });
        return obj;
    }


    fetchCallback(note){
        console.log(note);
    }

    
    removeLoader(){
        $('body').children('#loader').remove();
    }
    getProject(projectid){
        let obj = this._PROJECTS.find(obj => obj.projectid == projectid);
        return obj;
    }
    getInactiveProjectsByCreator(){
        let list = [];
        const dis = this;
        $.each(this._PROJECTS, function(key, value){
            const accobj = dis.getAccountObjById(value.creator);
            console.log('_________________________________', accobj);
            if((value.creator == dis.id || accobj.superid == dis.id) && value.status == "inactive"){

                let gate = true;
                $.each(dis.OutgoingProjectRequest, function(key, val){
                    if(value.projectid == val.projectid && (val.status == "idle" || val.status == "technical")){
                        gate = false;
                    }
                })
                if(gate){
                    console.log(value);
                    if(value.projectid != undefined && value.projectid!= null){
                        list[list.length] = value.getData();
                    }
                }
            }
        });
        return list;
    }
    getInactiveProjectsRequestByCreator(){
        let list = [];
        const dis = this;
        $.each(this._PROJECTS, function(key, value){
            // console.log(value.status, value.projectname);
            if(value.creator == dis.id && value.status == "inactive"){
                let gate = true;
                $.each(dis.OutgoingProjectRequest, function(key, val){
                    if(value.projectid == val.projectid){
                        gate = false;
                    }
                })
                if(gate){
                    list[list.length] = value.getData();
                }
            }
        });
        return list;
    }
    
    getInactiveProjectsByOwner(){
        let list = [];
        const dis = this;
        $.each(this._PROJECTS, function(key, value){
            // console.log(value.status, value.projectname, value.ownerid);
            if(value.ownerid == dis.id && value.status == "inactive"){
                list[list.length] = value.getData();
            }
        });
        return list;
    }
    getInactiveProjectsByCreatorOwner(){
        let list = [];
        const dis = this;
        $.each(this._PROJECTS, function(key, value){
            // console.log(value.status, value.projectname, value.ownerid);
            if((value.creator == dis.id || value.ownerid  == dis.id) && value.status == "inactive"){
                list[list.length] = value.getData();
            }
        });
        return list;
    }
    
    createProject(options, callback){
        const obj = {
            "projectid" : options.projectid,
            "companyid" : options.companyid,
            "ownerid" : options.owner,
            "creator" : options.creator,
            "projectname" : options.projectname,
            "reference" : options.reference,
            "status" : "inactive"
        }

        const cbsuccess=data=>{
            console.log(data);
            let newProj = new Project(obj);
            this._PROJECTS[this._PROJECTS.length] = newProj;
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createProject(options, cbsuccess, cbcomplete);

    }
    getAccountObjById(id){
        let obj = this.COMPANY_ACCOUNTS.find(obj => obj.id == id);
        return obj;
    }
    getConnectedProjects(){
        const list = [];
        $.each(this._PROJECTS, function(key, value){
            const extend = value.getData();
            list[list.length] = extend;
        })
        return list;
    }
    getIncomingProjectRequestObj(){
        return this.IncomingProjectRequest;
    }
    getOutgoingProjectRequestObj(){
        return this.OutgoingProjectRequest;
    }
    getDistinctInOutProject(){
        let ret = [];
        // console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', this.IncomingProjectReques,this.OutgoingProjectRequest );
        if(this.IncomingProjectRequest.length > 0){
            $.each(this.IncomingProjectRequest, function(key, value){
                if(ret.length == 0){
                        ret.push(value);
                }else{
                    let gate = true;
                    $.each(ret, function(key, value1){
                        if(value1.projectid == value.projectid){
                                gate = false;
                        }
                    });
                    if(gate){
                        ret.push(value);
                    }
                }
                });
        }
        if(this.OutgoingProjectRequest.length > 0){
            $.each(this.OutgoingProjectRequest, function(key, value){
                if(ret.length == 0){
                        ret.push(value);
                }else{
                    let gate = true;
                    $.each(ret, function(key, value1){
                        if(value1.projectid == value.projectid){
                            gate = false;
                        }
                    });
                    if(gate){
                    ret.push(value);
                    }
                }
                });
        }
        return ret;
    }
    searchOutgoingProjectRequest(projid){
        $.each(this.OutgoingProjectRequest, function(key, value){
            if(value.projectid == projid){
                console.log(value);
            }
        });
    }
    searchIncomingProjectRequest(projid){
        $.each(this.IncomingProjectRequest, function(key, value){
            console.log(value);
            if(value.projectid == projid){
                console.log(value);
            }
        });
    }

    getDepartment(){
        return this.Department;
    }
    getPosition(){
        return this.Position;
    }

    updateProfilePicture(callback){
        console.log(__PHOTO);
        let photo = '';
        const cb =data=>{
            console.log(data);  
            photo = data.url;
        };
        const cbcomp =()=>{
            const cb =()=>{
                callback();

            };
            this.updatePhoto({
                'id' : __ID,
                'photo' : photo
            }, cb);
        };
        ajax_profileUpload($('#profile-upload'), cb, cbcomp);
    }
    


    // fillProflowDashboardProject(){
    //     const dis = this;
    //     $('#project-manage-list').empty();  
    //     $.each(this._PROJECTS, function(key, value){
    //         const extend = value.getData();
    //         // console.log(value);
    //         if(extend.ownerid == dis.id){
    //             const html = `<span prid="${extend.projectid}" fn="${extend.firstname}" ln="${extend.lastname}" ph="${extend.photo}" ow="${extend.ownerid}" class="project-manage-list-widget btn-shadow" style="color: white; background-color: ${BTN_COLOR}" >${extend.projectname}</span>`
    //             $('#project-manage-list').append(html);
    //         }
    //     })
    // }
    fillProflowDashboardProject(){
        const dis = this;
        $('#project-manage-list').empty();  
        $.each(this._PROJECTS, function(key, value){
            const extend = value.getData();
            const ownerid = extend.ownerid;
            const owobj = ownerid != undefined ? dis.getCompanyAccountById(ownerid) : undefined;
            let gate = false;
            console.log(owobj);

            if(extend.status == "active"){
                if(owobj != undefined){
                    if(owobj.superid == dis.id){
                        gate = true;
                    } 
                }
                if(extend.ownerid == dis.id){
                    gate = true;
                } 
            }


            if(gate){
                const html = `<span prid="${extend.projectid}" fn="${owobj.firstname}" ln="${owobj.lastname}" ph="${extend.photo}" ow="${extend.ownerid}" class="project-manage-list-widget btn-shadow" style="color: white; background-color: ${BTN_COLOR}" >${extend.projectname}</span>`
                $('#project-manage-list').append(html);
            }


        })
    }


    fillSelectTagWithOwnedProject(selector){
        const dis = this;
        selector.empty();
        $.each(this._PROJECTS, function(key, value){
            const extend = value.getData();
            if(extend.ownerid == dis.id){
                selector.append(`<option value="${extend.projectid}">${extend.projectname}</option>`);
            }
        })
    }
    fillSelectTagWithConnectedProject(selector){
        const dis = this;
        selector.empty();
        $.each(this._PROJECTS, function(key, value){
            const extend = value.getData();
            selector.append(`<option value="${extend.projectid}">${extend.projectname}</option>`);
        })
    }
    fillSelectTagWithActiveConnectedProject(selector){
        const dis = this;
        selector.empty();
        $.each(this._PROJECTS, function(key, value){
            if(value.status == "active"){
                const extend = value.getData();
                selector.append(`<option value="${extend.projectid}">${extend.projectname}</option>`);
            }
        })
    }
    fillSelectTagWithConnectedProjectWithFilter(selector, filter){
        const dis = this;
        selector.empty();
        $.each(this._PROJECTS, function(key, value){
            const extend = value.getData();
            if(extend.projectname.toLowerCase().includes(filter.toLowerCase()) || extend.projectid.toLowerCase().includes(filter.toLowerCase())){
                selector.append(`<option value="${extend.projectid}">${extend.projectname}</option>`);
            }
        });
    }
    fillSelectTagWithProjectsWithNoGroup(selector){
        const dis = this;
        selector.empty();
        $.each(this._PROJECTS, function(key, value){
            const extend = value.getData();
            if(extend.groupid == "na"){
                selector.append(`<option value="${extend.projectid}">${extend.projectname}</option>`);
            }
        })
    }
    fillSelectTagWithProjectsWithNoGroupWithFilter(selector, filter){
        const dis = this;
        selector.empty();
        $.each(this._PROJECTS, function(key, value){
            const extend = value.getData();
            if(extend.groupid == "na" && (extend.projectname.toLowerCase().includes(filter.toLowerCase()) || extend.projectid.toLowerCase().includes(filter.toLowerCase())) ){
                selector.append(`<option value="${extend.projectid}">${extend.projectname}</option>`);
            }
        })
    }
    fillSelectTagWithCompanyAccount(selector){
        const dis = this;
        selector.empty();
        $.each(this.COMPANY_ACCOUNTS, function(key, value){
            selector.append(`<option value="${value.id}">${value.firstname} ${value.lastname}</option>`);
        });
    }
    fillSelectTagWithCompanyAccountByDepartment(selector, departmentid){
        const dis = this;
        selector.empty();
        $.each(this.COMPANY_ACCOUNTS, function(key, value){
            if(departmentid == value.department){
                selector.append(`<option value="${value.id}">${value.firstname} ${value.lastname}</option>`);
            }
        })
    }
    fillSelectTagWithDepartment(selector){
        const dis = this;
        selector.empty();
        $.each(this.Department, function(key, value){
            selector.append(`<option value="${value.id}">${value.title}</option>`);
        })
    }

    searchCompanyAccountById(zid){
        const list = [];
        const dis = this;

        $.each(dis.COMPANY_ACCOUNTS, function(key, value){
            if(value != 'error' && (value.firstname.includes(zid) || value.lastname.includes(zid))){
                list[list.length] = {
                    firstname: value.firstname,
                    id: value.id,
                    lastname: value.lastname
                };
            }
        });

        return list;
    }
    fillCompanyAccountSelectTag(selector, list){
        selector.empty();

        $.each(list, function(key, value){
            if(value != 'error'){
                selector.append(`
                    <option value="${value.id}">${value.firstname} ${value.lastname} ${value.id}</option>
                `);
            }else{
                showNotification('Fetch Error', 'There was no account linked to the provided Name.');
            }
        });
    }
    connectUserToProject(options){
        const cbsuccess=data=>{
            console.log(data);
        };
        const cbcomplete=data=>{
            console.log(data);
            options.callback();
        };
        capi_createProjectConnect(options, cbsuccess, cbcomplete);
    }

    getProjectsWithOccupiedGroupId(){
        const dis = this;
        let list = [];
        $.each(this._PROJECTS, function(key, value){
            const extend = value.getData();
            if(extend.groupid != "na"){
                list.push(extend);
            }
        })
        return list;
    }
    getProjectsWithGroupId(groupid){
        const dis = this;
        let list = [];
        $.each(this._PROJECTS, function(key, value){
            const extend = value.getData();
            if(extend.groupid != "na" && extend.groupid.split('_').pop() == groupid){
                list.push(extend);
            }
        })
        return list;
    }
    getCompanyAccounts(){
        return this.COMPANY_ACCOUNTS;
    }
    getCompanyAccountById(zid){
        return this.COMPANY_ACCOUNTS.find(obj => obj.id == zid);
    }
    createCompanyAccounts(options, callback){
        this.COMPANY_ACCOUNTS[this.COMPANY_ACCOUNTS.length] = {
            'birthdate' : options.birthdate, 
            'companyid' : options.companyid, 
            'department' : options.department, 
            'email' : options.email, 
            'firstname' : options.firstname, 
            'id' : options.id, 
            'lastname' : options.lastname, 
            'password' : options.password, 
            'phone' : options.phone, 
            'photo' : 'na', 
            'position' : options.position, 
            'superid' : options.superid, 
            'userlevel' : options.userlevel
        };
        capi_createAccount(options, callback);
    }
    updateCompanyAccount(options, callback){
        let acc = this.COMPANY_ACCOUNTS.find(obj => obj.id == options.id);

        acc.id = options.id;
        acc.email = options.email;
        acc.userlevel = options.userlevel;
        acc.lastname = options.lastname;
        acc.firstname = options.firstname;
        acc.phone = options.phone;
        acc.birthdate = options.birthdate;
        acc.position = options.position;
        acc.department = options.department;
        acc.superid = options.superid;

        capi_updateAccount(options, callback);
    }
    updatePhoto(options, callback){
        let gate = false;
        let oldphoto = '';
        const cbsuccess =data=>{
            console.log(data);
            let obj = this.COMPANY_ACCOUNTS.find(obj => obj.id == options.id);
            if(obj.photo != "na"){
                gate = true;
                oldphoto = obj.photo;
            }
            obj.photo = options.photo
        };
        const cbcomplete =()=>{
            if(gate){
                const cbsuccess =data=>{
                    console.log(data);
                      
                };
                const cbcomplete =()=>{
                    callback();
                };
                ajax_deleteSingleFile(`../../${oldphoto}`, cbsuccess, cbcomplete);
            }else{
                callback();
            }
        };
        capi_updateAccountPhoto(options, cbsuccess, cbcomplete);
    }
    getCompanySuppliers(){
        let list = [];
        $.each(this.Supplier.list, function(key, value){
            // console.log(value, '--------------------');
            list.push(value);
        });
        return list;
    }
    // getSupervisorAccount(){
    //     let nobj = this.COMPANY_ACCOUNTS.find(obj => obj.id == this.id);
    //     return this.getCompanyAccountById(nobj.superid);
    // }
    getSupervisorAccount(id){
        let nobj = this.COMPANY_ACCOUNTS.find(obj => obj.id == id);
        return this.getCompanyAccountById(nobj.superid);
    }

    
    updateConnect(options, callback=()=>{}){
        let obj = this.IncomingProjectRequest.find(obj => obj.id == options.id);
        if(obj != undefined){
            obj.status = options.status;
            obj.notes = options.notes;
        }
        callback();
    }
    deleteConnect(options, callback){
        const obj = $.grep(this.IncomingProjectRequest, function(e){ 
            return e.id != options.id;
        });
        this.IncomingProjectRequest = obj;
        callback();
    }
    createConnect(options){
        const obj = {
            'id' : options.id,
            'projectid' : options.projectid,
            'accid' : options.accid,
            'status' : "idle",
            'notes' : ''
        }
        this.IncomingProjectRequest.push(obj);
    }
    
    mapAccounts(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            let proj = this.getProject(options.projectid);
            if(proj != undefined && proj != null){
                proj.TaskResource.mapAccid(options);
                const rate = proj.getTmpAccountObj(options.tmpid);
                console.log(rate);
                options.rate = rate.rate;
                console.log(rate);
                proj.AccountRate.mapAccount(options);
                console.log(options);
            }
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_mapTmpAccounts(options, cbsuccess, cbcomplete);
    }
    mapSuppliers(options, callback){
        const cbsuccess=data=>{
            console.log(data);
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_mapTmpSuppliers(options, cbsuccess, cbcomplete);
    }

    

    projectValhalla(projectid, callback){
        let g = false;
        const cbsuccess =data=>{
            console.log(data);
            if(data.response != "error"){
                const obj = $.grep(this._PROJECTS, function(e){ 
                    return e.projectid != projectid;
                });
                this._PROJECTS = obj;
                g = true;
            }
        };
        const cbcomplete =()=>{
            callback(g);
        };
        capi_projectValhalla({projectid}, cbsuccess, cbcomplete);
    }

    uploadValhalla(projectobj, callback=()=>{}){
        const probj = new Project(projectobj);
        this._PROJECTS.push(probj);
        console.log(this._PROJECTS);
        callback();
    }






    checkList(list, callback, reset=false){
        const dis = this;
        if(list == 'COMPANY_ACCOUNTS'){
            if(dis.COMPANY_ACCOUNTS == undefined && !reset){
                dis.COMPANY_ACCOUNTS = dis.fetchCompanyAccounts({"comid" : dis.companyid, "userlevel" : "na", "callback" : callback});
            }else if(reset){
                dis.COMPANY_ACCOUNTS = dis.fetchCompanyAccounts({"comid" : dis.companyid, "userlevel" : "na", "callback" : callback});
            }else{
                callback("Data Already Fetched");
            }
        }
        if(list == 'OutgoingProjectRequest'){
            if(dis.OutgoingProjectRequest == undefined && !reset){
                dis.OutgoingProjectRequest = dis.fetchOutgoingProjectRequest({"callback" : callback});
            }else if(reset){
                dis.OutgoingProjectRequest = dis.fetchOutgoingProjectRequest({"callback" : callback});
            }else{
                callback("Data Already Fetched"); 
            }
        }
        if(list == 'IncomingProjectRequest'){
            if(dis.IncomingProjectRequest == undefined && !reset){
                dis.IncomingProjectRequest = dis.fetchIncomingProjectRequest({"callback" : callback});
            }else if(reset){
                dis.IncomingProjectRequest = dis.fetchIncomingProjectRequest({"callback" : callback});
            }else{
                callback("Data Already Fetched"); 
            }
        }
        if(list == 'Department'){
            if(dis.Department == undefined && !reset){
                dis.Department = dis.fetchDepartment({"callback" : callback});
            }else if(reset){
                dis.Department = dis.fetchDepartment({"callback" : callback});
            }else{
                callback("Data Already Fetched"); 
            }
        }
        if(list == 'Position'){
            if(dis.Position == undefined && !reset){
                dis.Position = dis.fetchPosition({"callback" : callback});
            }else if(reset){
                dis.Position = dis.fetchPosition({"callback" : callback});
            }else{
                callback("Data Already Fetched"); 
            }
        }
        if(list == 'Supplier'){
            if(dis.Supplier == undefined && !reset){
                dis.Supplier = new U_Supplier();
                callback("Fetching Suppliers");
            }else if(reset){
                dis.Supplier = new U_Supplier({'companyid' : dis.companyid, 'callback' : callback});
                callback("Fetching Suppliers");
            }else{
                callback("Data Already Fetched"); 
            }
        }
        if(list == 'Projects'){
            if(dis._PROJECTS == undefined && !reset){
                dis._PROJECTS =  this.fetchProjects(this.id);
                setTimeout(() => {
                    callback('Data fetching Projects');
                }, 0);
            }else if(reset){
                dis._PROJECTS =  this.fetchProjects(this.id);
                setTimeout(() => {
                    callback('Data fetching Projects');
                }, 0);
            }else{
                callback("Data Already Fetched"); 
            }
        }
        if(list == 'ConnectedProjects'){
            const cbcomplete=()=>{};
            if(dis.connected_projects == undefined && !reset){
                dis.connected_projects =  capi_fetchProjectByConnect(this.id, callback, cbcomplete);
            }else if(reset){
                dis.connected_projects =  capi_fetchProjectByConnect(this.id, callback, cbcomplete);;
            }else{
                callback("Data Already Fetched"); 
            }
        }
        if(list == 'ProjectGroup'){
            if(dis.ProjectGroup == undefined && !reset){
                dis.ProjectGroup = new ProjectGroup({"ownerid" : this.id});
                callback("Fetching Project Group");
            }else if(reset){
                dis.ProjectGroup = new ProjectGroup({"ownerid" : this.id});
                callback("Fetching Project Group");
            }else{
                callback("Data Already Fetched"); 
            }
        }
        if(list == 'Alert'){
            if(dis.Alert == undefined && !reset){
                dis.Alert = new Alert({"ownerid" : this.id});
                callback("Fetching Alerts");
            }else if(reset){
                dis.Alert = new Alert({"ownerid" : this.id});
                callback("Fetching Alerts");
            }else{
                callback("Data Already Fetched"); 
            }
        }
        if(list == 'Skid'){
            if(dis.Skid == undefined && !reset){
                dis.Skid = new Skid({"callback" : callback});
                // callback("Fetching Project Group");
            }else if(reset){
                dis.Skid = new Skid({"callback" : callback});
                // callback("Fetching Project Group");
            }else{
                callback("Data Already Fetched"); 
            }
        }
        // if(list == 'Complains'){
        //     if(dis.Complains == undefined && !reset){
        //         dis.Complains = new Complains();
        //         callback("Fetching Complains");
        //     }else if(reset){
        //         dis.Complains = new Complains();
        //         callback("Fetching Complains");
        //     }else{
        //         callback("Data Already Fetched"); 
        //     }
        // }
    }
}


class U_Supplier{
    constructor(options){
        this.list = this.fetch(options);
    }

    fetch(options){
        let list = [];
        const  cbsuccess=data=>{
            if(data.response != "error"){
                $.each(data, function(key, value){
                    const obj = {
                        'supplierid' : value.supplierid,
                        'companyid' : value.companyid,
                        'projectid' : value.projectid,
                        'name' : value.name
                    };
                    list[list.length] = obj;
                });
            }
        };
        const cbcomplete=()=>{
            // console.log(options);
            if(options != undefined){
                options.callback('Fetching Suppliers');
            }
        };
        capi_fetchSupplierByCompanyId({"companyid" : __COMPANY_ID}, cbsuccess, cbcomplete);
        return list;
    }
    fillSelectTag(selector){
        selector.empty();
        $.each(this.list, function(key, value){
            selector.append(`
                <option value="${value.supplierid}">${value.name}</option>
            `);
        });
    }
    getSelectTagHtml(){
        let ret = '';
        $.each(this.list, function(key, value){
            ret +=` <option value="${value.supplierid}">${value.name}</option>`;
        });
        return ret;
    }
    getObjById(id){
        let obj = this.list.find(obj => obj.supplierid == id);
        return obj;
    }
    getObj(){
        return this.list;
    }
    create(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = {
                'supplierid' : options.supplierid,
                'companyid' : options.companyid,
                'projectid' : options.projectid,
                'name' : options.name
            }
            this.list.push(obj);
        };
        const cbcomplete=()=>{
            callback();
        };
        capi_createSupplier(options, cbsuccess, cbcomplete);
    }
    

}

class ProjectGroup{
    constructor(options){
        const cb =()=>{
            setTimeout(() => {
                this.projects = this.fetchProjectGroupByGroupid(options);
            }, 0);
        }
        this.list = this.fetchProjectGroup(options, cb);
    }

    fetchProjectGroup(options, callback){
        let list = [];
        const cbsuccess =data=>{
            if(data.response != "error"){
                $.each(data, function(key, value){
                    list.push(value);
                });
            }
        }
        capi_fetchProjectGroup(options, cbsuccess, callback);
        return list;
    }
    createProjectGroup(options, callback){
        const cbsuccess =data=>{
            console.log(data);
            const obj = {
                'id' : options.id,
                'ownerid' : options.ownerid,
                'name' : options.name,
                'description' : options.description,
            }
            this.list.push(obj);
        };
        capi_createProjectGroup(options, cbsuccess, callback)
    }
    fetchProjectGroupByGroupid(){
        let list = [];
        $.each(this.list, function(key, value){
            const cbsuccess =data=>{
                console.log(data);
                $.each(data, function(key, value){
                    list.push(value);
                });
            };
            capi_fetchProjectByGroupid({"groupid" : value.id}, cbsuccess, ()=>{});
        });
        return list;
    }
    fetchProjectGroupById(options, callback){
        let ret = {};
        let gate = true;
        $.each(this.list, function(key, value){
            if(value.id == options.groupid){
                ret = value;
                gate = false;
            }
        });

        if(gate){
            const cbsuccess =data=>{
                if(data.response != "error"){
                    $.each(data, function(key, value){
                        ret = value;
                    });
                }
            }
            capi_fetchProjectGroupByGroupId(options, cbsuccess, callback);
        }
        return ret;
    }
    
    getProjectGroups(){
        return this.list;
    }
    getProjectByGroupId(groupid){
        let list = [];
        $.each(this.projects, function(key, value){
            if(value.groupid == groupid){
                list.push(value);
            }
        });
        return list;
    }
    
}

class Alert{
    constructor(options){
        this.list = this.fetch(options);
    }
    fetch(options){
        let list = [];
        const cbsuccess =data=>{
            // console.log('ALS:KJDLJLHKJADSKLJHDASKHJLASDKHJL', data);
            if(data.response != "error"){
                $.each(data, function(key, value){
                    // console.log(value.dataview);
                    // console.log('BBBBBBBBBBBBBBBBBB', JSON.parse(value.dataview));
                    const obj = {
                        'id' : value.id,
                        'ownerid' : value.ownerid,
                        'fn' : value.fn,
                        'dataview' : JSON.parse(value.dataview.toString()),
                        'dataapprove' : JSON.parse(value.dataapprove.toString()),
                        'datareject' : JSON.parse(value.datareject.toString()),
                        'title' : value.title,
                        'message' : value.message
                    }
                    list.push(obj);
                });
            }
        }
        capi_fetchAlert(options, cbsuccess);
        return list;
    }
    create(options, callback){
        const cbsuccess =data=>{
            console.log(data);
            if(data.response != "false"){
                const obj = {
                    'id' : options.id,
                    'ownerid' : options.ownerid,
                    'fn' : options.fn,
                    'dataview' : JSON.parse(options.dataview),
                    'dataapprove' : JSON.parse(options.dataapprove),
                    'datareject' : JSON.parse(options.datareject),
                    'title' : options.title,
                    'message' : options.message
                }
                if(obj.ownerid == __ID){
                    this.list.push(obj);
                }
            }
        }
        capi_createAlert(options, cbsuccess, callback);
    }
    delete(options, callback){
        const cbsuccess =data=>{
            console.log(data);
            if(data.response != "false"){
                const obj = $.grep(this.list, function(e){ 
                    return e.id != options.id;
                });
                this.list = obj;
            }
        }
        capi_deleteAlert(options, cbsuccess, callback);
    }
    getObjById(id){
        let obj = {};
        $.each(this.list, function(key, value){
            if(value.id == id){
                obj = value;
            }
        });
        return obj;
    }
    fill(){
        $('#alert').children('.alert-con').empty();
        // console.log(this.list);
        let x = 0;
        // console.log(this.list.length);
        // console.log(this.list);
        $.each(this.list, function(key, value){
            console.log(value);
            x++;
            let approveHtmlTitle = '';
            if(value.fn == "taskboard-message-markasread"){
                approveHtmlTitle = "Mark as Read"
            }else{
                approveHtmlTitle = "Approve";
            }
            
            
            let approveHtml = value.dataapprove.response != "na" ? `<button type="approve" fn="${value.fn}" aid="${value.id}" data='${JSON.stringify(value.dataapprove)}' class="btn-shadow alert-con-widget-h">${approveHtmlTitle}</button>` : '';
            let viewHtml = value.dataview.response != "na" ? `<button type="view" fn="${value.fn}" aid="${value.id}" data='${JSON.stringify(value.dataview)}' class="btn-shadow alert-con-widget-h">View</button>` : '';
            let rejectHtml = value.datareject.response != "na" ? `<button type="reject" fn="${value.fn}" aid="${value.id}" data='${JSON.stringify(value.datareject)}' class="btn-shadow alert-con-widget-h">Reject</button>` : '';
            
            // console.log(approveHtml);
            // console.log(viewHtml);
            // console.log(rejectHtml);
            $('#alert').children('.alert-con').append(`
                <div class="alert-con-widget">
                    <i aid="${value.id}" class="fas fa-trash alert-con-widget-delete"></i>
                    <span class="alert-con-widget-title">${value.title}</span>
                    <div class="alert-con-widget-message">
                        <span>${value.message}</span>
                        ${viewHtml}
                        ${approveHtml}
                        ${rejectHtml}
                    </div>
                </div>
            `);
        });

        if(x > 0 && this.list.length > 0){
            // console.log("got company!!");
            $('#alert-open').css({'color' : YELLOW_PALETTE, "animation" : "ring 0.4s infinite"});
        }else{
            $('#alert-open').css({'color' : 'white', "animation" : "unset"});
        }
        
    }



}


