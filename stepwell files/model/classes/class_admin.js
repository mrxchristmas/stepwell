class Admin{
    constructor(options){
        this.id = options.id;
        this.firstname = options.firstname;
        this.photo = options.photo;
        this.Company = undefined;
        this.License = undefined;
        this.ModuleCollection = this.fetchModuleCollection();
        this.WebMessage = new WebMessage();
    }

    prelogin(options, callback){
        // console.log(options);
        // let ret = [];
        const cbsuccess=data=>{
            console.log(data[0]);
            callback(data[0]);
        };
        const cbcomplete=()=>{
            
        };
        capi_prelogin(options, cbsuccess, cbcomplete);
    }


    fetchCompany(){
        let list = [];
        const cbsuccess =data=>{
            // console.log('ASDASDASD', data);
            $.each(data, function(key, value){
                // console.log(value);
                const obj = {
                    'companyid' : value.companyid,
                    'databaseid' : value.databaseid,
                    'name' : value.name,
                    'logo' : value.logo,
                    'status' : value.status
                }
                const nobj = new ControlCompany(obj);
                if(obj.companyid != "admincontrol"){
                    list.push(nobj);
                }
            });
        }
        const cbcomplete =()=>{
            // callback();
        }
        capi_fetchCompany(cbsuccess, cbcomplete);
        this.Company = list;
    }
    fetchModuleCollection(){
        let url = domain + 'model/modules.json';
        let ret = {};
        $.ajax({
            url: url,
            dataType: 'json',
            async: false,
            success: function(data) {
                // console.log(data);
                ret = data;
            }
        });
        return ret;
    }

    getCompanyList(){
        return this.Company;
    }
    getCompany(companyid){
        let ret;
        $.each(this.Company, function(key, value){
            const cobj = value.getObj();
            if(cobj.companyid == companyid){
                ret = value;
            }
        });
        return ret;
    }
    getCompanyObj(companyid){
        let ret = {};
        $.each(this.Company, function(key, value){
            const cobj = value.getObj();
            if(cobj.companyid == companyid){
                ret = cobj;
            }
        });
        return ret;
    }

    getCompanyModule(companyid){
        let ret = {};
        $.each(this.Company, function(key, value){
            const cobj = value.getObj();
            if(cobj.companyid == companyid){
                ret = value.getModule();
            }
        });
        return ret;
    }
    getCompanyAdmin(companyid){
        let ret = {};
        $.each(this.Company, function(key, value){
            const cobj = value.getObj();
            if(cobj.companyid == companyid){
                ret = value.getAdmin();
            }
        });
        return ret;
    }
    getModuleList(){
        return this.ModuleCollection;
    }

    createCompany(options, callback){
        const cbsuccess =data=>{
            console.log(data);
            const obj = {
                'companyid' : options.companyid,
                'databaseid' : options.databaseid,
                'name' : options.name,
                'logo' : "na",
                'status' : "inactive"
            }
            const nobj = new ControlCompany(obj);
            this.Company.push(nobj);
        }
        const cbcomplete =()=>{
            callback();
        }
        capi_createCompany(options, cbsuccess, cbcomplete);
    }
    addCompany(options){
        const obj = {
            'companyid' : options.companyid,
            'databaseid' : options.databaseid,
            'name' : options.name,
            'logo' : "na",
            'status' : "inactive"
        }
        const nobj = new ControlCompany(obj);
        this.Company.push(nobj);
    }
    updateCompanyStatus(options, callback){
        const cbsuccess =data=>{
            console.log(data);
            setTimeout(() => {
                let obj = this.Company.find(obj => obj.companyid == options.companyid);
                obj.status = options.status;
            }, 0);
        }
        const cbcomplete =()=>{
            callback();
        }
        capi_updateCompanyStatus(options, cbsuccess, cbcomplete);
    }
    
    checkList(list, callback, reset=false){
        const dis = this;
        if(list == 'Company'){
            if(dis.Company == undefined && !reset){
                dis.fetchCompany();
                // setTimeout(() => {
                    callback("Fetching Company ");
                // }, 0);
            }else if(reset){
                dis.fetchCompany();
                // setTimeout(() => {
                    callback("Fetching Company ");
                // }, 0);
            }else{
                callback("Data Already Fetched");
            }
        }else if(list == 'License'){
            if(dis.License == undefined && !reset){
                dis.License = new License({"ownerid" : this.id});
                callback("Fetching License");
            }else if(reset){
                dis.License = new License({"ownerid" : this.id});
                callback("Fetching License");
            }else{
                callback("Data Already Fetched"); 
            }
        }
    }

}

class ControlCompany{
    constructor(options){
        this.companyid = options.companyid;
        this.databaseid = options.databaseid;
        this.name = options.name;
        this.logo = options.logo;
        this.status = options.status;
        this.Module = undefined;
        this.Admin = undefined; 
    }

    fetchModule(companyid){
        let list = [];
        const cbsuccess =data=>{
            if(data.response != "error"){
                $.each(data, function(key, value){
                    const obj = {
                        'id' : value.id,
                        'companyid' : value.companyid,
                        'modulename' : value.modulename,
                        'moduleui' : value.moduleui
                    }
                    list.push(obj);
                });
            }
        }
        capi_fetchCompanyModuleByCompanyId({"companyid" : companyid}, cbsuccess);
        this.Module = list;
        return list;
    }
    fetchAdmin(companyid){
        let list = [];
        const cbsuccess =data=>{
            if(data.response != "error"){
                $.each(data, function(key, value){
                    const obj = {
                        'accid' : value.accid,
                        'companyid' : value.companyid,
                        'firstname' : value.firstname,
                        'lastname' : value.lastname
                    }
                    list.push(obj);
                });
            }
        }
        capi_fetchCompanyAdminByCompanyId({"companyid" : companyid}, cbsuccess);
        this.Admin = list;
        return list;
    }

    getObj(){
        return {
            'companyid' : this.companyid,
            'databaseid' : this.databaseid,
            'name' : this.name,
            'logo' : this.logo,
            'status' : this.status
        }
    }
    getModule(){
        return this.Module;
    }
    getAdmin(){
        return this.Admin;
    }

    createModule(options, callback){
        const dis = this;
        const cbsuccess =data=>{
            console.log(data);
            // const obj = {
            //     'id' : options.id,
            //     'companyid' : options.companyid,
            //     'modulename' : options.modulename,
            //     'moduleui' : options.moduleui
            // }
            // setTimeout(() => {
            //     // dis.Module[dis.Module.length] = obj;
            //     // addModule(obj);
            // }, 0);
        }
        const cbcomplete =()=>{
            callback();
        }
        capi_createCompanyModule(options, cbsuccess, cbcomplete);
    }
    addModule(options){
        this.Module.push(options);
    }
    deleteModule(options, callback){
        const cbsuccess =data=>{
            console.log(data);
            const nobj = $.grep(this.Module, function(e){ 
                return e.id != options.id; 
            });
            this.Module = nobj;
        }
        const cbcomplete =()=>{
            callback();
        }
        capi_deleteCompanyModule(options, cbsuccess, cbcomplete);
    }

    createAdmin(options, callback){
        const dis = this;
        const cbsuccess =data=>{
            console.log(data);
            const obj = {
                'accid' : options.accid,
                'companyid' : options.companyid,
                'firstname' : options.firstname,
                'lastname' : options.lastname
            }
            this.Admin.push(obj);
        }
        const cbcomplete =()=>{
            callback();
        }
        capi_createCompanyAdmin(options, cbsuccess, cbcomplete);
    }
    addAdmin(options){
        this.Admin.push(options);
    }
    deleteAdmin(options, callback){
        const cbsuccess =data=>{
            console.log(data);
            const nobj = $.grep(this.Admin, function(e){ 
                return e.accid != options.accid; 
            });
            this.Admin = nobj;
        }
        const cbcomplete =()=>{
            callback();
        }
        capi_deleteCompanyAdmin(options, cbsuccess, cbcomplete);
    }



    checkList(list, callback, reset=false){
        const dis = this;
        if(list == 'Module'){
            if(dis.Module == undefined && !reset){
                dis.Module = dis.fetchModule(dis.companyid);
                // setTimeout(() => {
                    callback("Fetching Company Module");
                // }, 0);
            }else if(reset){
                dis.Module = dis.fetchModule(dis.companyid);
                // setTimeout(() => {
                    callback("Fetching Company Module");
                // }, 0);
            }else{
                callback("Data Already Fetched");
            }
        }
        if(list == 'Admin'){
            if(dis.Admin == undefined && !reset){
                dis.Admin = dis.fetchAdmin(dis.companyid);
                // setTimeout(() => {
                    callback("Fetching Company Admin");
                // }, 0);
            }else if(reset){
                dis.Admin = dis.fetchAdmin(dis.companyid);
                // setTimeout(() => {
                    callback("Fetching Company Admin");
                // }, 0);
            }else{
                callback("Data Already Fetched"); 
            }
        }
    }



}

class WebMessage{
    constructor(){
        this.list = undefined;
    }

    fetchMessage(callback){
        let list = [];
        const cbsuccess =data=>{
            console.log(data);
            if(data.response != "error"){
                $.each(data, function(key, value){
                    const obj = {
                        'id' : value.id,
                        'owner' : value.owner,
                        'sender' : value.sender,
                        'stamp' : value.stamp,
                        'message' : value.message
                    }
                    list.push(obj);
                });
            }
        };
        api_fetchMessage(cbsuccess, callback("Fetching Company WebMessage"));
        return list;
    }
    createMessage(options, callback){
        const dis = this;
        const cbsuccess =data=>{
            console.log(data);
            const obj = {
                'id' : options.id,
                'owner' : options.owner,
                'sender' : options.sender,
                'message' : options.message,
                'stamp' :  dateFns.format(
                    new Date(),
                    "YYYY-MM-DD hh:mm:ss"
                )
            }
            this.list.push(obj);
        }
        const cbcomplete =()=>{
            callback();
        }
        api_createMessage(options, cbsuccess, cbcomplete);
    }
    api_deleteOldMessages(callback){
        const cbsuccess =data=>{
            console.log(data);
        };
        const cbcomplete =()=>{
            this.checkList('List', callback, true);
        };
        api_deleteOldMessages(cbsuccess, cbcomplete);
    }

    getDistinctOwner(){
        let zlist = [];
        $.each(this.list, function(key, value){
            if(zlist.length == 0){
                zlist[0] = value.owner;
            }
            let gate = true;
            $.each(zlist, function(key, val){
                console.log(val, value.owner);
                if(val == value.owner){
                    gate = false;
                }
            });
            if(gate){
                zlist[zlist.length] = value.owner;
            }
        });
        // list.sort((a, b) => (new Date(a.stamp) > new Date(b.stamp)) ? 1 : -1);
        return zlist;
    }

    getMessageByOwner(owner){
        let list = [];
        $.each(this.list, function(key, value){
            if(value.owner == owner){
                list.push(value);
            }
        });
        list.sort((a, b) => (new Date(a.stamp) > new Date(b.stamp)) ? 1 : -1);
        return list;
    }

    fillChatBoxByOwner(owner){
        const data = this.getMessageByOwner(owner);
        $('#webmsg-envelope-chatbox').empty();
        $.each(data, function(key, value){
            // console.log(value);
            const dt = dateFns.distanceInWords(
                new Date(),
                new Date(value.stamp),
                { addSuffix: true }
            );
            $('#webmsg-envelope-chatbox').append(`
                <div class="widget ${value.sender}">
                    <i class="fas ${value.sender == "user" ? "fa-user" : "fa-user-astronaut"}"></i>
                    <span>${value.message}</span>
                    <span class="timestamp">${dt}</span>
                </div>
            `);
        });
    }
    fillSenderList(){
        const data = this.getDistinctOwner();
        $('#webmsg-envelope-list').empty();
        $.each(data, function(key, value){
            $('#webmsg-envelope-list').append(`
                <span owner="${value}" class="webmsg-list-widget unread">${value}<i class="fas fa-circle"></i></span>
            `);
        });
    }



    checkList(list, callback, reset=false){
        const dis = this;
        if(list == 'List'){
            if(dis.list == undefined && !reset){
                dis.list = dis.fetchMessage(callback);
                // setTimeout(() => {
                    // callback("Fetching Company WebMessage");
                // }, 0);
            }else if(reset){
                dis.list = dis.fetchMessage(callback);
                // setTimeout(() => {
                    // callback("Fetching Company WebMessage");
                // }, 0);
            }else{
                callback("Data Already Fetched");
            }
        }
    }
}