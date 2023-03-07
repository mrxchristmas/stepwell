class Skid{
    constructor(options){
        this.Skid = this.fetchSkid(options.callback);
    }

    fetchSkid(callback){
        let list = [];
        const cbsuccess =data=>{
            // console.log(data);
            if(data.response != "error"){
                $.each(data, function(key, value){
                    const obj ={
                        'id' : value.id,
                        'creatorid' : value.creatorid,
                        'date' : value.date
                    }
                    list.push(obj);
                });
            }
        }
        capi_fetchSkid(cbsuccess, callback("Fetching Skid"));
        return list;
    }
    createSkid(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj ={
                'id' : options.id,
                'creatorid' : options.creatorid,
                'date' : options.date
            }
            this.Skid.push(obj);
        };
        capi_createSkid(options, cbsuccess, callback);
    }
    deleteSkid(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = $.grep(this.Skid, function(e){ 
                return e.id != options.id;
            });
            this.Skid = obj;
        };
        capi_deleteSkid(options, cbsuccess, callback);
    }


    checkList(list, callback, reset=false){
        const dis = this;
        if(list == 'Skid'){
            if(dis.Skid == undefined && !reset){
                dis.Skid = dis.fetchSkid(options.callback);
            }else if(reset){
                dis.Skid = dis.fetchSkid(options.callback);
            }else{
                callback("Data Already Fetched");
            }
        }
    }
}
class SkidUnit{
    constructor(callback){
        const cb =data=>{
            console.log(data);
            const cb =data=>{
                console.log(data);
                callback("Finished Fetching Skid Units");

            };
            this.SubUnit = this.fetchSkidSubUnit(cb);
        };
        this.Unit = this.fetchSkidUnit(cb);
    }

    fetchSkidUnit(callback){
        let list = [];
        const cbsuccess =data=>{
            // console.log(data);
            if(data.response != "error"){
                $.each(data, function(key, value){
                    const obj ={
                        'id' : value.id,
                        'name' : value.name
                    }
                    list.push(obj);
                });
            }
        }
        capi_fetchSkidUnit(cbsuccess, callback('Fetching Skid Unit'));
        return list;
    }
    createSkidUnit(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj ={
                'id' : options.id,
                'name' : options.name
            }
            this.Unit.push(obj);
        };
        capi_createSkidUnit(options, cbsuccess, callback);
    }
    deleteSkidUnit(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = $.grep(this.Unit, function(e){ 
                return e.id != options.id;
            });
            this.Unit = obj;
            const sobj = $.grep(this.SubUnit, function(e){ 
                return e.id != options.id;
            });
            this.SubUnit = sobj;
        };
        capi_deleteSkidUnit(options, cbsuccess, callback);
    }
    updateSkidUnit(options, callback){
        let obj = this.Unit.find(obj => obj.id == options.id);
        const cbsuccess=data=>{
            console.log(data);
            if(data.response != "error"){
                if(obj != undefined){
                    obj.name = options.name;
                }
            }
        };
        capi_updateSkidUnit(options, cbsuccess, callback);
    }

    fetchSkidSubUnit(callback){
        let list = [];
        const cbsuccess =data=>{
            // console.log('AAAAAAAAAAAAAAA',data);
            if(data.response != "error"){
                $.each(data, function(key, value){
                    const obj ={
                        'id' : value.id,
                        'name' : value.name,
                        'unitid' : value.unitid,
                        'process' : value.process,
                        'tag' : value.tag,
                        'icon' : value.icon
                    }
                    list.push(obj);
                });
            }
        }
        capi_fetchSkidSubUnit(cbsuccess, callback('Fetching Skid SubUnit'));
        return list;
    }
    createSkidSubUnit(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj ={
                'id' : options.id,
                'name' : options.name,
                'unitid' : options.unitid,
                'process' : options.process,
                'tag' : options.tag,
                'icon' : options.icon
            }
            this.SubUnit.push(obj);
        };
        capi_createSkidSubUnit(options, cbsuccess, callback);
    }
    deleteSkidSubUnit(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const sobj = $.grep(this.SubUnit, function(e){ 
                return e.id != options.id;
            });
            this.SubUnit = sobj;
        };
        capi_deleteSkidSubUnit(options, cbsuccess, callback);
    }
    updateSkidSubUnit(options, callback){
        let obj = this.SubUnit.find(obj => obj.id == options.id);
        const cbsuccess=data=>{
            console.log(data);
            if(data.response != "error"){
                if(obj != undefined){
                    obj.name = options.name;
                    obj.unitids = options.unitid;
                    obj.processs = options.process;
                    obj.tag = options.tag;
                    obj.icon = options.icon;
                }
            }
        };
        capi_updateSkidSubUnit(options, cbsuccess, callback);
    }

    getUnit(){
        return this.Unit;
    }
    getUnitObj(id){
        return this.Unit.find(obj => obj.id == id);
    }
    getSubUnitByUnitId(id){
        let list = [];
        $.each(this.SubUnit, function(key, value){
            if(value.unitid == id){
                list.push(value);
            }
        });
        return list;
    }
    getSubUnitObj(id){
        return this.SubUnit.find(obj => obj.id == id);
    }
    getSubUnitByUnitIdWithFilter(id, q){
        let list = [];
        $.each(this.SubUnit, function(key, value){
            if(value.unitid == id && (value.name).toLowerCase().includes(q.toLowerCase())){
                list.push(value);
            }
        });
        return list;
    }
    getSubUnitObjById(id){
        return this.SubUnit.find(obj => obj.id == id);
    }

}
class SkidEquipment{
    constructor(callback){
        const cb =data=>{
            console.log(data);
            const cb =data=>{
                console.log(data);
                callback("Finished Fetching Skid Equipments");
            };
            this.SubEquipment = this.fetchSkidSubEquipment(cb);
        };
        this.Equipment = this.fetchSkidEquipment(cb);
    }

    fetchSkidEquipment(callback){
        let list = [];
        const cbsuccess =data=>{
            console.log(data);
            if(data.response != "error"){
                $.each(data, function(key, value){
                    const obj ={
                        'id' : value.id,
                        'name' : value.name
                    }
                    list.push(obj);
                });
            }
        }
        capi_fetchSkidEquipment(cbsuccess, callback("Fetching Skid Equipments"));
        return list;
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
    createSkidEquipment(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj ={
                'id' : options.id,
                'name' : options.name
            }
            this.Equipment.push(obj);
        };
        capi_createSkidEquipment(options, cbsuccess, callback);
    }
    deleteSkidEquipment(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj = $.grep(this.Equipment, function(e){ 
                return e.id != options.id;
            });
            this.Equipment = obj;
            const sobj = $.grep(this.SubEquipment, function(e){ 
                return e.id != options.id;
            });
            this.SubEquipment = sobj;
        };
        capi_deleteSkidEquipment(options, cbsuccess, callback);
    }
    updateSkidEquipment(options, callback){
        let obj = this.Equipment.find(obj => obj.id == options.id);
        const cbsuccess=data=>{
            console.log(data);
            if(data.response != "error"){
                if(obj != undefined){
                    obj.name = options.name;
                }
            }
        };
        capi_updateSkidEquipment(options, cbsuccess, callback);
    }

    fetchSkidSubEquipment(callback){
        let list = [];
        const cbsuccess =data=>{
            console.log(data);
            if(data.response != "error"){
                $.each(data, function(key, value){
                    const obj ={
                        'id' : value.id,
                        'name' : value.name,
                        'equipmentid' : value.equipmentid,
                        'process' : value.process,
                        'tag' : value.tag,
                        'quantity' : value.quantity,
                        'capacity' : value.capacity,
                        'tank' : value.tank,
                        'room' : value.room,
                        'dimensions' : value.dimensions,
                        'cost' : value.cost,
                        'budget' : value.budget,
                        'icon' : value.icon
                    }
                    list.push(obj);
                });
            }
        }
        capi_fetchSkidSubEquipment(cbsuccess, callback("Fetching Skid SubEquipments"));
        return list;
    }
    createSkidSubEquipment(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj ={
                'id' : options.id,
                'name' : options.name,
                'equipmentid' : options.equipmentid,
                'process' : options.process,
                'tag' : options.tag,
                'quantity' : options.quantity,
                'capacity' : options.capacity,
                'tank' : options.tank,
                'room' : options.room,
                'dimensions' : options.dimensions,
                'cost' : options.cost,
                'budget' : options.budget,
                'icon' : options.icon
            }
            this.SubEquipment.push(obj);
        };
        capi_createSkidSubEquipment(options, cbsuccess, callback);
    }
    deleteSkidSubEquipment(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const sobj = $.grep(this.SubEquipment, function(e){ 
                return e.id != options.id;
            });
            this.SubEquipment = sobj;
        };
        capi_deleteSkidSubEquipment(options, cbsuccess, callback);
    }
    updateSkidSubEquipment(options, callback){
        let obj = this.SubEquipment.find(obj => obj.id == options.id);
        const cbsuccess=data=>{
            console.log(data);
            if(data.response != "error"){
                if(obj != undefined){
                    obj.name = options.name;
                    obj.equipmentid = options.equipmentid;
                    obj.process = options.process;
                    obj.tag = options.tag;
                    obj.quantity = options.quantity;
                    obj.capacity = options.capacity;
                    obj.tank = options.tank;
                    obj.room = options.room;
                    obj.dimensions = options.dimensions;
                    obj.cost = options.cost;
                    obj.budget = options.budget;
                    obj.icon = options.icon;
                }
            }
        };
        capi_updateSkidSubEquipment(options, cbsuccess, callback);
    }

    getEquipment(){
        return this.Equipment;
    }
    getSubEquipmentObj(id){
        return this.SubEquipment.find(obj => obj.id == id);
    }
    getSubEquipmentByEquipmentId(id){
        let list = [];
        $.each(this.SubEquipment, function(key, value){
            if(value.equipmentid == id){
                list.push(value);
            }
        });
        return list;
    }
    getSubEquipmentByEquipmentIdWithFilter(id, q){
        let list = [];
        $.each(this.SubEquipment, function(key, value){
            if(value.equipmentid == id && (value.name).toLowerCase().includes(q.toLowerCase())){
                list.push(value);
            }
        });
        return list;
    }
    getSubEquipmentObjById(id){
        return this.SubEquipment.find(obj => obj.id == id);
    }

}

class SkidFile{
    constructor(id, callback){
        this.id = id;
        this.Files = this.fetch(id, callback);
        this.CompanyFiles = undefined;
    }

    get(){
        return this.Files;
    }
    getOwner(ownerid){
        let ret = [];
        $.each(this.Files, function(key, value){
            if(ownerid == value.ownerid){
                ret.push(value);
            }
        });
        return ret;
    }
    getFile(fileid){
        return this.Files.find(obj => obj.id == fileid);
    }
    getCompanyFiles(){
        return this.CompanyFiles;
    }
    getCompanyFile(fileid){
        return this.CompanyFiles.find(obj => obj.id == fileid);
    }
    // getCompanyFilesForms(){
    //     let list = [];
    //     $.each(this.CompanyFiles, function(key, value){
    //         const newobj = [...list, ...value.Forms];
    //         list = newobj;
    //     });
    // }
    
    fetch(id, callback=()=>{}){
        let list = [];
        const cbs =data=>{
            console.log(data);
            if(data.response != "error"){
                $.each(data, function(key, value){
                    const obj = {
                        'id' : value.id,
                        'ownerid' : value.ownerid,
                        'filename' : value.filename,
                        'url' : value.url,
                    }
                    list.push(obj);
                });
            }
        };
        capi_fetchSkidFileByOwner({"ownerid" : id}, cbs, callback);
        return list;
    }
    fetchAll(callback=()=>{}){
        if(this.CompanyFiles == undefined){
            let list = [];
            const cbs =data=>{
                if(data.response != "error"){
                    $.each(data, function(key, value){
                        const obj = {
                            'id' : value.id,
                            'ownerid' : value.ownerid,
                            'filename' : value.filename,
                            'url' : value.url,
                        }
                        list.push(obj);
                    });
                }
            };
            const cbc =()=>{
                this.CompanyFiles = list;
                callback();
            };
            capi_fetchSkidFile(cbs, cbc);
            
        }else{
            callback();
        }
    }
    create(options, callback){
        const dis = this;
        const cbs =data=>{
            console.log(data);
            if(data.response != "error"){
                
            }else{
                alert('There was a problem');
            }
        };
        capi_createSkidFile(options, cbs, callback);
    }
    addFile(options){
        const obj = {
            'id' : options.id,
            'ownerid' : options.ownerid,
            'filename' : options.filename,
            'url' : options.url
        }
        this.Files.push(obj);
    }
    update(options, callback=()=>{}){
        const dis = this;
        const cbs =data=>{
            if(data.response != "error"){
                const obj = dis.Files.find(obj => obj.id == options.id);
                obj.filename = options.filename;
            }
        };
        capi_updateSkidFile(options, cbs, callback);
    }
    delete(options, callback=()=>{}){
        const dis = this;
        const cbs =data=>{
            if(data.response != "error"){
                const obj = $.grep(dis.Files, function(e){ 
                    return e.id != options.id;
                });
                dis.Files = obj;
            }
        };
        capi_deleteSkidFile(options, cbs, callback);
    }
    getFileObject(id, callback=()=>{}){
        const obj = this.Files.find(obj => obj.id == id);

        if(obj.data == undefined){
            const loading =()=>{
                console.log('Fetching Data...');
            }
            const cb =data=>{
                console.log(data);
                if(data.response == "ok"){
                    obj.data = data.data;
                }
                callback(data.data);
            }
            new SkidFileObject({"id" : id, loading: loading, callback: cb});
        }else{
            callback(obj.data);
        }
    }
    getCompanyFileObject(id, callback=()=>{}){
        const obj = this.CompanyFiles.find(obj => obj.id == id);
        if(obj != undefined){
            if(obj.data == undefined){
                const loading =()=>{
                    console.log('Fetching Data...');
                }
                const cb =data=>{
                    console.log(data);
                    if(data.response == "ok"){
                        obj.data = data.data;
                    }
                    callback(data.data);
                }
                new SkidFileObject({"id" : id, loading: loading, callback: cb});
            }else{
                callback(obj.data);
            }
        }else{
            callback('error')
        }
    }
    getFileAccess(fileid, callback=()=>{}){
        const fobj = this.Files.find(obj => obj.id == fileid);
        if(fobj.fileaccess == undefined){
            fobj.fileaccess = new SkidFileAccess({fileid, callback});
        }else{
            callback(fobj.fileaccess.data);
        }
        return fobj.fileaccess;
    }
    getCompanyFileAccess(fileid, callback=()=>{}, refresh=false){
        const fobj = this.CompanyFiles.find(obj => obj.id == fileid);
        if(refresh){
            // console.log('OMG HELP');
            fobj.fileaccess = new SkidFileAccess({fileid, callback});
            callback(fobj.fileaccess.data);
        }else{
            if(fobj.fileaccess == undefined){
                fobj.fileaccess = new SkidFileAccess({fileid, callback});
                callback(fobj.fileaccess.data);
            }else{
                callback(fobj.fileaccess.data);
            }
        }
        return fobj.fileaccess;
    }
    getFileAccessRequest(fileid, callback=()=>{}){
        const fobj = this.Files.find(obj => obj.id == fileid);
        if(fobj.fileaccessrequest == undefined){
            fobj.fileaccessrequest = new SkidFileAccessRequest({fileid, callback});
        }else{
            callback(fobj.fileaccessrequest.data);
        }
        return fobj.fileaccessrequest;
    }
    getCompanyFileAccessRequest(fileid, callback=()=>{}, refresh=false){
        const fobj = this.CompanyFiles.find(obj => obj.id == fileid);
        if(refresh){
            fobj.fileaccessrequest = new SkidFileAccessRequest({fileid, callback});
        }else{
            if(fobj.fileaccessrequest == undefined){
                fobj.fileaccessrequest = new SkidFileAccessRequest({fileid, callback});
            }else{
                callback(fobj.fileaccessrequest.data);
            }
        }
        return fobj.fileaccessrequest;
    }
    getFileProflowConnect(fileid, callback=()=>{}){
        const fobj = this.Files.find(obj => obj.id == fileid);
        if(fobj.fileproflowconnect == undefined){
            fobj.fileproflowconnect = new SkidFileProflowConnect({fileid, callback});
        }else{
            callback(fobj.fileproflowconnect.data);
        }
        return fobj.fileproflowconnect;
    }

    getCompanyFileForm(fileid, formid){
        const fobj = this.CompanyFiles.find(obj => obj.id == fileid);
        // console.log(fobj);
        let ret;
        if(fobj != undefined){
            let x = fobj.data.Form.length;
            $.each(fobj.data.Form, function(key, value){
                if(value.formid == formid){
                    // console.log(value);
                    ret = value;
                    return false;
                }
            });
        }
        return ret;
    }
    getCompanyFileFormRow(fileid, formid, rowid){
        let ret;
        const fobj = this.getCompanyFileForm(fileid, formid);
        // console.log(fobj);
        if(fobj != undefined){
            $.each(fobj.content, function(key, value){
                $.each(value.values, function(key, value1){
                    if(value1.id == rowid){
                        ret = value1.values;
                        return false;
                    }
                });
            });
        }
        return ret;
    }



    archiveSkidFile(id, callback=()=>{}){
        const cb =data=>{
            console.log(data);
            const obj = $.grep(this.Files, function(e){ 
                return e.id != id;
            });
            this.Files = obj;
            if(this.CompanyFiles){
                const obj = $.grep(this.CompanyFiles, function(e){ 
                    return e.id != id;
                });
                this.CompanyFiles = obj;
            }
        };
        capi_archiveSkidFile({id}, cb, callback);
    }


}
class SkidFileObject{
    constructor(options){
        this.getData(options.id, options.loading, options.callback);
    }
   
    getData(id, loading=()=>{}, callback=()=>{}){
        let ret;
        $.get(`${domain}data/SkidFiles/${id}.ceis`, function(res) {
            // console.log(res);
            loading();
        })
        .success(function(res){
            const encodedStringAtoB = res;
            const decodedStringAtoB = atob(encodedStringAtoB);
            const decodedJSON = JSON.parse(decodedStringAtoB);

            ret = decodedJSON;
        })
        .done(function(){
            callback({
                response : "ok",
                data : ret
            });
        })
        .error(function(jqXHR, textStatus, errorThrown){
            callback({
                response : "error",
                data : errorThrown
            });
            // showToast('There was an error saving the file, Please contact our administrators');
        });
    }
}
class SkidFileAccess{
    constructor(options){
        this.fileid = options.fileid;
        this.data = this.fetch(options.fileid, options.callback);
    }

    fetch(fileid, callback=()=>{}){
        let ret;
        const cbs =data=>{
            console.log(data);
            if(data.response != 'error'){
                ret = data;
            }else{
                ret = [];
            }
        };
        const cbc =()=>{
            callback(ret);
        };
        capi_fetchSkidFileAccess({fileid}, cbs, cbc);
        return ret;
    }
    refresh(callback=()=>{}){
        this.data = this.fetch(this.fileid, callback);
    }
    create(options, callback=()=>{}){
        const cbs =data=>{
            console.log(data);
            if(data.response != "error"){
                const obj = {
                    'id': options.id,
                    'fileid': options.fileid,
                    'accountid': options.accountid,
                }
                this.data.push(obj);
            }
        };
        const cbc =()=>{
            callback();
        };
        capi_createSkidFileAccess(options, cbs, cbc);
    }
    delete(options, callback=()=>{}){
        const cbs =data=>{
            console.log(data);
            if(data.response != "error"){
                const obj = $.grep(this.data, function(e){ 
                    return e.id != options.id;
                });
                this.data = obj;
            }
        };
        const cbc =()=>{
            callback();
        };
        capi_deleteSkidFileAccess(options, cbs, cbc);
    }
    
}
class SkidFileAccessRequest{
    constructor(options){
        this.fileid = options.fileid;
        this.data = this.fetch(options.fileid, options.callback);
    }

    fetch(fileid, callback=()=>{}){
        console.log(fileid);
        let ret;
        const cbs =data=>{
            console.log(data);
            if(data.response != 'error'){
                ret = data;
            }else{
                ret = [];
            }
        };
        const cbc =()=>{
            callback(ret);
        };
        capi_fetchSkidFileAccessRequest({fileid}, cbs, cbc);
        return ret;
    }
    refresh(callback=()=>{}){
        this.data = this.fetch(this.fileid, callback);
        console.log(this.data);
    }
    create(options, callback=()=>{}){
        const dis = this;
        const cbs =data=>{
            console.log(data);
            if(data.response != "error"){
                const obj = {
                    'id': options.id,
                    'fileid': options.fileid,
                    'accountid': options.accountid,
                }
                dis.data.push(obj);
            }
        };
        const cbc =()=>{
            callback();
        };
        capi_createSkidFileAccessRequest(options, cbs, cbc);
    }
    delete(options, callback=()=>{}){
        const cbs =data=>{
            console.log(data);
            if(data.response != "error"){
                const obj = $.grep(this.data, function(e){
                    return e.id != options.id;
                });
                this.data = obj;
            }
        };
        const cbc =()=>{
            callback();
        };
        capi_deleteSkidFileAccessRequest(options, cbs, cbc);
    }
    refresh(callback){
        this.data = this.fetch(this.fileid, callback);
    }
    
}
class SkidFileProflowConnect{
    constructor(options){
        this.fileid = options.fileid;
        this.data = this.fetch(options.fileid, options.callback);
    }

    fetch(fileid, callback=()=>{}){
        let ret;
        const cbs =data=>{
            console.log(data);
            if(data.response != 'error'){
                ret = data;
            }else{
                ret = [];
            }
        };
        const cbc =()=>{
            callback(ret);
        };
        capi_fetchSkidFileProflowConnect({fileid}, cbs, cbc);
        return ret;
    }
    create(options, callback=()=>{}){
        const cbs =data=>{
            console.log(data);
            if(data.response != "error"){
                const obj = {
                    'id': options.id,
                    'fileid': options.fileid,
                    'projectid': options.projectid,
                }
                this.data.push(obj);
            }
        };
        const cbc =()=>{
            callback();
        };
        capi_createSkidFileProflowConnect(options, cbs, cbc);
    }
    delete(options, callback=()=>{}){
        const cbs =data=>{
            console.log(data);
            if(data.response != "error"){
                const obj = $.grep(this.data, function(e){
                    return e.id != options.id;
                });
                this.data = obj;
            }
        };
        const cbc =()=>{
            callback();
        };
        capi_deleteSkidFileProflowConnect(options, cbs, cbc);
    }
    refresh(callback){
        this.data = this.fetch(this.fileid, callback);
    }
    
}


class SkidComponent{
    constructor(options){
        this.componentid = options.componentid;
        this.filename = options.filename == undefined ? "" : options.filename;
        this.fileid = options.fileid == undefined ? null : options.fileid;
        this.gridline = options.gridline == undefined ? "show" : options.gridline;
        this.orientation = options.orientation == undefined ? "portrait" : options.orientation;
        this.scroll = options.scroll == undefined ? "vertical" : options.scroll;
        this.pagesize = options.pagesize == undefined ? "letter" : options.pagesize;
        this.version = options.version == undefined ? 0 : options.version;
        this.creator = options.creator;
        this.lastmodified = options.lastmodified == undefined ? new Date() : options.lastmodified;
        this.comparison_value = options.comparison_value == undefined ? 1 : options.comparison_value;
        this.isChanged = false;
        this.componentView = options.componentView == undefined ? { option1: "default", option2: "all" } : options.componentView;
        this.lock = options.lock == undefined ? "locked" : options.lock;
        this.status = options.status == undefined ? "active" : options.status;


        this.PrintProps = options.PrintProps == undefined ? {} : options.PrintProps;
        // this.PrintHeaderImage1 = options.PrintHeaderImage1;
        // this.PrintHeaderImage2 = options.PrintHeaderImage2;
        // this.PrintHeaderTitle = options.PrintHeaderTitle;
        // this.PrintHeaderSubTitle = options.PrintHeaderSubTitle;
        // this.PrintHeaderMinTitle = options.PrintHeaderMinTitle;

        // this.PrintFooterTitle = options.PrintFooterTitle;
        // this.PrintFooterImage1 = options.PrintFooterImage1;
        // this.PrintFooterImage2 = options.PrintFooterImage2;
        
        // $('#builder-area-page').attr('oldheight', options.pageheight == undefined ? "1056px" : options.pageheight);
        // this.background = options.background == undefined ? "#ffffff" : options.background;
        // this.color = options.color == undefined ? "#000000" : options.color;

        this.DataSheet = options.DataSheet == undefined ? [] : options.DataSheet;
        this.Form = options.Form == undefined ? [] : options.Form;
        this.Pages = options.Pages == undefined ? [] : options.Pages;
        this.ComponentHeirarchy = options.ComponentHeirarchy == undefined ? [] : options.ComponentHeirarchy;

        this.Unit = options.Unit == undefined ? [] : options.Unit;
        this.UnitTransfer = options.UnitTransfer == undefined ? [] : options.UnitTransfer;
        this.UnitProps = options.UnitProps == undefined ? [] : options.UnitProps;

        this.Equipment = options.Equipment == undefined ? [] : options.Equipment;
        this.EquipmentTransfer = options.EquipmentTransfer == undefined ? [] : options.EquipmentTransfer;
        this.EquipmentProps = options.EquipmentProps == undefined ? [] : options.EquipmentProps;
    }

    applySettings(){
        let w = 0;
        let h = 0;
        if(this.pagesize == "letter"){
            w = this.orientation == 'landscape' ? 11 : 8.5;
            h = this.orientation == 'landscape' ? 8.5 : 11;
        }else if(this.pagesize == "a4"){
            w = this.orientation == 'landscape' ? 11.75 : 8.25;
            h = this.orientation == 'landscape' ? 8.25 : 11.75;
        }else if(this.pagesize == "legal"){
            w = this.orientation == 'landscape' ? 14 : 8.5;
            h = this.orientation == 'landscape' ? 8.5 : 14;
        }
        
        $('.builder-area-page').css({
            "width" : `calc(${w}in)`,
            "min-width" : `calc(${w}in)`,
            "max-width" : `calc(${w},)`,
            "height" : `calc(${h}in)`,
            "min-height" : `calc(${h}in)`,
            "max-height" : `calc(${h}in)`,
            "left" : this.scroll == "vertical" ? `calc( (100% - (${w}in)) / 2 )` : "initial",
            "margin" : this.scroll == "vertical" ? "20px 0px" : "20px",
            "background-image" : this.gridline == "show" ? 'repeating-linear-gradient(#ccc 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%)' : "none",
            // "border" : this.gridline == "show" ? 'repeating-linear-gradient(#ccc 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%)' : "none"
        });
        $('#builder-area').css({
            'flex-direction' : this.scroll == "vertical" ? "column" : "row"
        });


        // SETTING UP PAGE SETUP UI
        if(this.gridline == "show"){
            $(`#builder-pagesetup-gridline-show`).prop("checked", true);
            $(`#builder-pagesetup-gridline-hide`).prop('checked', false);
        }else{
            $(`#builder-pagesetup-gridline-show`).prop('cheked', false);
            $(`#builder-pagesetup-gridline-hide`).prop('checked', true);
        }

        if(this.orientation == "landscape"){
            $(`#builder-pagesetup-orientation-landscape`).prop("checked", true);
            $(`#builder-pagesetup-orientation-portrait`).prop('checked', false);
        }else{
            $(`#builder-pagesetup-orientation-landscape`).prop('cheked', false);
            $(`#builder-pagesetup-orientation-portrait`).prop('checked', true);
        }

        if(this.scroll == "vertical"){
            $(`#builder-pagesetup-scroll-vertical`).prop("checked", true);
            $(`#builder-pagesetup-scroll-horizontal`).prop('checked', false);
        }else{
            $(`#builder-pagesetup-scroll-vertical`).prop('cheked', false);
            $(`#builder-pagesetup-scroll-horizontal`).prop('checked', true);
        }

        if(this.pagesize == "letter"){
            $(`#builder-pagesetup-pagesize-letter`).prop("checked", true);
            $(`#builder-pagesetup-pagesize-afour`).prop('checked', false);
            $(`#builder-pagesetup-pagesize-legal`).prop('checked', false);
        }else if(this.pagesize == "a4"){
            $(`#builder-pagesetup-pagesize-afour`).prop('checked', true);
            $(`#builder-pagesetup-pagesize-letter`).prop('cheked', false);
            $(`#builder-pagesetup-pagesize-legal`).prop('cheked', false);
        }else if(this.pagesize == "legal"){
            $(`#builder-pagesetup-pagesize-legal`).prop('checked', true);
            $(`#builder-pagesetup-pagesize-letter`).prop('cheked', false);
            $(`#builder-pagesetup-pagesize-afour`).prop('cheked', false);
        }


        $('#builder-header-lock').attr('state', this.lock);
        if(this.lock == "unlocked"){
            $('#builder-header-lock').removeClass('fa-lock').addClass('fa-unlock');
        }else{
            $('#builder-header-lock').removeClass('fa-unlock').addClass('fa-lock');
        }

        // $(`#builder-pagesetup-gridline-${}`).prop('cheked', true);
        // console.log('AAAAAAAA', this.gridline);


    }
    updateSettings(options){
        this.gridline = options.gridline;
        this.orientation = options.orientation;
        this.pagesize = options.pagesize;
        this.scroll = options.scroll;
        // this.background = options.background;
        // this.color = options.color;
        this.applySettings();
        this.updateChanged();
    }
    updateFilename(filename){
        this.filename = filename;
        this.updateChanged();
    }
    updateVersion(v = null){
        if(v == null){
            this.version += 1;
        }else{
            this.version = v;
        }
        this.updateChanged();
    }
    updateFileId(fileid){
        this.fileid = fileid;
        this.updateChanged();
    }
    updateCreator(creator){
        this.creator = creator;
        this.updateChanged();
    }
    updateModify(){
        this.lastmodified = new Date();
        // this.updateChanged();
    }
    updateStatus(status){
        this.status = status;
        // this.updateChanged();
    }
    setComponentHeirarchy(obj){
        this.ComponentHeirarchy = obj;
        this.updateChanged();
    }
    getComponentHeirarchy(){
        return this.ComponentHeirarchy.length == 0 ? [] : this.ComponentHeirarchy;
    }
    setComponentViewOption1(option){
        this.componentView.option1 = option;
        this.updateChanged();
    }
    setComponentViewOption2(option){
        this.componentView.option2 = option;
        this.updateChanged();
    }
    setPrintImages(){
        
        if(this.PrintProps != undefined){
            this.PrintProps.PrintHeaderImage1 == undefined ? $('#builder-print-settings-footer-img1').attr('src', "https://via.placeholder.com/150x70.png?text=No+Image+Selected" ) : $('#builder-print-settings-header-img1').attr('src', this.PrintProps.PrintHeaderImage1 );
            this.PrintProps.PrintHeaderImage2 == undefined ? $('#builder-print-settings-footer-img1').attr('src', "https://via.placeholder.com/150x70.png?text=No+Image+Selected" ) : $('#builder-print-settings-header-img2').attr('src', this.PrintProps.PrintHeaderImage2 );
            this.PrintProps.PrintFooterImage1 == undefined ? $('#builder-print-settings-footer-img1').attr('src', "https://via.placeholder.com/70x70.png?text=No+Image+Selected" ) : $('#builder-print-settings-footer-img1').attr('src', this.PrintProps.PrintFooterImage1 );

            this.PrintProps.HeaderVisibility == undefined ? $('#builder-print-preview-header-visibility').prop('checked', false) : this.PrintProps.HeaderVisibility ? $('#builder-print-preview-header-visibility').prop('checked', true) : $('#builder-print-preview-header-visibility').prop('checked', false);
            this.PrintProps.HeaderVisibility == undefined ? $('#builder-print-preview-footer-visibility').prop('checked', false) : this.PrintProps.FooterVisibility ? $('#builder-print-preview-footer-visibility').prop('checked', true) : $('#builder-print-preview-footer-visibility').prop('checked', false);

            $('#builder-print-settings-footer-title').val(this.PrintProps.PrintFooterTitle == undefined ? "" : this.PrintProps.PrintFooterTitle);
            $('#builder-print-settings-header-title').val(this.PrintProps.PrintHeaderTitle == undefined ? __COMPANY_NAME : this.PrintProps.PrintHeaderTitle);
            $('#builder-print-settings-header-subtitle').val(this.PrintProps.PrintHeaderSubTitle == undefined ? this.filename : this.PrintProps.PrintHeaderSubTitle);
            $('#builder-print-settings-header-mintitle').val(this.PrintProps.PrintHeaderMinTitle == undefined ? this.componentid : this.PrintProps.PrintHeaderMinTitle);

            $(`input[type="radio"][name="builder-print-settings-layout"][tid="${this.PrintProps.HeaderLayout == undefined ? "1" : this.PrintProps.HeaderLayout}"`).prop('checked', true);
            $(`input[type="radio"][name="builder-print-settings-layout-f"][tid="${this.PrintProps.FooterLayout == undefined ? "1" : this.PrintProps.FooterLayout}"`).prop('checked', true);

        }else{
            $('#builder-print-settings-footer-img1').attr('src', "https://via.placeholder.com/150x70.png?text=No+Image+Selected" );
            $('#builder-print-settings-footer-img1').attr('src', "https://via.placeholder.com/150x70.png?text=No+Image+Selected" );
            $('#builder-print-settings-footer-img1').attr('src', "https://via.placeholder.com/70x70.png?text=No+Image+Selected" );
            $('#builder-print-settings-footer-title').val("");
            $('#builder-print-settings-header-title').val(__COMPANY_NAME);
            $('#builder-print-settings-header-subtitle').val(this.filename);
            $('#builder-print-settings-header-mintitle').val(this.fileid);
            $(`input[type="radio"][name="builder-print-settings-layout"][tid="1"`).prop('checked', true);
            $(`input[type="radio"][name="builder-print-settings-layout-f"][tid="1"`).prop('checked', true);
        }
        
    }
    savePrintPropsHeader(options){
        this.PrintProps.PrintHeaderImage1 = options.PrintHeaderImage1;
        this.PrintProps.PrintHeaderImage2 = options.PrintHeaderImage2; 
        this.PrintProps.PrintHeaderTitle = options.PrintHeaderTitle; 
        this.PrintProps.PrintHeaderSubTitle = options.PrintHeaderSubTitle; 
        this.PrintProps.PrintHeaderMinTitle = options.PrintHeaderMinTitle; 
        this.PrintProps.HeaderLayout = options.HeaderLayout;
        this.updateChanged();
    }
    savePrintPropsFooter(options){
        this.PrintProps.PrintFooterImage1 = options.PrintFooterImage1;
        this.PrintProps.PrintFooterTitle = options.PrintFooterTitle; 
        this.PrintProps.FooterLayout = options.FooterLayout;
        this.updateChanged();
    }
    
    updateChanged(){
        this.updateModify();
        this.isChanged = true;
    }



    
    getUnitObj(id){
        return this.Unit.find(obj => obj.id == id);
    }
    createUnit(subunitobj){
        const dis = this;
        const id = rngComponentUnitId();
        const obj = {
            "id": id,
            "subunitid": subunitobj.suid,
            "unitid": subunitobj.uid,
            "icon": subunitobj.icon,
            "name": subunitobj.name,
            "parent": subunitobj.parent,
            "top": subunitobj.top,
            "left": subunitobj.left,
            "height": subunitobj.height,
            "width": subunitobj.width
        }
        $.each(subunitobj.content, function(key, value){
            const zobj = {
                'id' : rngComponentUnitPropsId(),
                'compid' : id,
                'unitid' : subunitobj.uid,
                'subunitid' : subunitobj.suid,
                'type' : value.type == undefined ? 'text' : value.type,
                'name' : value.name,
                'measurement' : value.measurement,
                'content' : {
                    "min" : value.min,
                    "max" : value.max,
                    "setpoint" : value.setpoint,
                    "text" : value.text
                },
                'visible' : 'false'
            }
            dis.UnitProps.push(zobj);
        });

        this.Unit.push(obj);
        this.drawUnit(id);
        this.updateChanged();
        return id;
    }
    deleteUnit(componentid){
        const dis = this;
        resizeObserver.disconnect( $(`#${componentid}`)[0] );
        this.deleteDataSheet(componentid);
        this.deleteUnitTransfer(componentid);
        this.deleteUnitProps(componentid);
        const eqobj = this.getEquipmentObjsBySubUnitId(componentid);
        $.each(eqobj, function(key, value){
            dis.deleteEquipment(value.id);
        });
        const obj = $.grep(this.Unit, function(e){ 
            return e.id != componentid;
        });
        this.Unit = obj;
        this.updateChanged();
    }
    drawUnit(id){
        const obj = this.getUnitObj(id);
        const dis = this;
        // console.log(obj);
        // const iconobj = ACCUSER.Skid.Icons.getUnitIconById(obj.icon);
        const iconobj = SKID_DATA.Icons.getUnitIconById(obj.icon);
        const propsobj = this.getUnitProps(obj.id);
        let propshtml = '';
        const subeqobj = this.getEquipmentObjsBySubUnitId(obj.id);

        // console.log(subeqobj);
        

        $.each(propsobj, function(key, value){
            if(value.visible == "true"){
                // console.log(value);
                const prval = value.type == "text" ? `<span class="content">${value.content.text}</span>` : `<span class="content">${value.content.setpoint}</span>`;
                // console.log(prval);
                propshtml += `
                <div id="${value.id}" class="params-widget">
                    <span class="title">${value.name}</span>
                    ${prval}
                </div>
            `; 
            }
        });
        $(`#${obj.id}`).remove();
        $(`#${obj.parent}`).prepend(`
            <div id="${obj.id}" suid="${obj.subunitid}" uid="${obj.unitid}" process="${obj.process}" tag="${obj.tag}" class="unit-widget" style="top=${obj.top}px; left=${obj.left}px; width:${obj.width}; height:${obj.height};"
            height="${obj.height}" width="${obj.width}" >
                <i id="${obj.id}-arrow-top" class="hidden unit-widget-arrow-h top far fa-circle"></i>
                <i id="${obj.id}-arrow-bottom" class="hidden unit-widget-arrow-h bottom far fa-circle"></i>
                <i id="${obj.id}-arrow-left" class="hidden unit-widget-arrow-h left far fa-circle"></i>
                <i id="${obj.id}-arrow-right" class="hidden unit-widget-arrow-h right far fa-circle"></i>
                <img class="unit-widget-action-maximize hidden" src="${iconobj.url}" alt="${obj.name}" title="${obj.name}">
                <div class="actions hidden">
                    <i class="actions-widget unit-widget-action-minimize fas fa-window-minimize"></i>
                    <i class="actions-widget unit-widget-action-details fas fa-sliders-h"></i>
                </div>
                <legend>${obj.name}</legend>
                
                <div class="params ">
                    ${propshtml}
                </div>

                <svg id="${obj.id}-svg" class="unit-svg">
                    <defs id="${obj.id}-svg-defs">
                        
                    </defs>
                </svg>
            </div>
        `);
        
        // <i class="actions-widget unit-widget-action-datasheet fas fa-digital-tachograph"></i>

        $(`#${obj.id}`).css({
            "top" : `${obj.top}px`,
            "left" : `${obj.left}px`
        }).draggable(unitDraggOption).droppable(unitDropOption);
        // setTimeout(() => {
            resizeObserver.observe( $(`#${obj.id}`)[0] );
        // }, 0);
        $.each(subeqobj, function(key, value){
            dis.drawEquipment(value.id);
        });
    }
    moveUnit(options){
        const obj = this.Unit.find(obj => obj.id == options.id);
        obj.top = options.top;
        obj.left = options.left;
    }
    resizeUnit(options){
        const obj = this.Unit.find(obj => obj.id == options.id);
        obj.width = options.width;
        obj.height = options.height;
    }
    checkIfUnitHasIncomingTransfer(compid){
        let ret = false;
        $.each(this.UnitTransfer, function(key, value){
            if(value.ui2.includes(compid)){
                ret = true;
            }
        });
        return ret;
    }

    updateUnitProps(options){
        const obj = this.UnitProps.find(obj => obj.id == options.id);
        obj.name = options.name;
        obj.content = options.content;
        obj.visible = options.visible;
        obj.lock = options.lock;
        this.updateChanged();
    }
    createUnitProps(options){
        const obj = {
            'id' : rngComponentUnitPropsId(),
            'compid' : options.compid,
            'unitid' : options.unitid,
            'subunitid' : options.subunitid,
            'name' : options.name,
            'type' : options.type,
            'lock' : options.lock,
            'measurement' : options.measurement,
            'content' : options.content,
            'visible' : options.visible
        }
        this.UnitProps.push(obj);
        this.updateChanged();
    }
    getUnitProps(id){
        let list = [];
        $.each(this.UnitProps, function(key, value){
            // console.log(value);
            if(value.compid == id){
                list.push(value);
            }
        });
        return list;
    }
    updateUnitPropsCompare(options){
        const obj = this.UnitProps.find(obj => obj.id == options.id);
        obj['compare'] = options.content;
        this.updateChanged();
    }
    getUnitPropObj(id){
        return this.UnitProps.find(obj => obj.id == id);
    }
    deleteUnitProps(componentid){
        const obj = $.grep(this.UnitProps, function(e){ 
            return e.compid != componentid;
        });
        this.UnitProps = obj;
        this.updateChanged();
    }

    createUnitTransfer(options){
        const obj = {
            "id" : options.id,
            "ui1" : options.ui1,
            "ui2" : options.ui2,
            "parent" : options.parent,
            "name" : options.name,
            "type" : options.type,
            "props" : options.props
        }
        this.UnitTransfer.push(obj);
        this.drawUnitTransfer(obj.id);
        this.updateChanged();
    }
    updateUnitTransfer(options){
        const n = this.getUnitTransferObj(options.id);
        let gate = false;
        let oldtype = '';
        if(n.name != options.name || n.type != options.type){
            gate = true;
            oldtype = n.type;
        }
        n.name = options.name;
        n.type = options.type;
        n.props = options.props;
        if(gate){
            this.drawUnitTransfer(options.id, false, oldtype);
        }
        this.updateChanged();
    }
    getUnitTransferObj(transferid){
        return this.UnitTransfer.find(obj => obj.id == transferid);
    }
    drawUnitTransfer(transferid, create = true, oldtype=null){
        
        const options = this.getUnitTransferObj(transferid);
        console.log(options);
        // document.getElementById(`#${transferid}`).remove();
        if(create){
            // console.log(options);
            const parentPos = $(`#${options.parent}`).offset();
        
            // console.log($(`#${ui1}`), $(`#${ui1}`).offset());
            
            $(`#${options.ui1}`).addClass('show').css('display', 'block').show();
            $(`#${options.ui2}`).addClass('show').css('display', 'block').show();


            const pos1 = {
                top: $(`#${options.ui1}`).offset().top - parentPos.top,
                left: $(`#${options.ui1}`).offset().left - parentPos.left,
                id: options.ui1
            }
            const pos2 = {
                top: $(`#${options.ui2}`).offset().top - parentPos.top,
                left: $(`#${options.ui2}`).offset().left - parentPos.left,
                id: options.ui2
            }
        
            // console.log(pos1, pos2);
            let x1 = 0;
            let x2 = 0;
            let y1 = 0;
            let y2 = 0;
        
            if(pos1.id.includes('right')){
                x1 = (pos1.left + 20).toFixed(0);
                y1 = (pos1.top).toFixed(0);
            }else if(pos1.id.includes('left')){
                x1 = (pos1.left - 20).toFixed(0);
                y1 = (pos1.top).toFixed(0);
            }else if(pos1.id.includes('top')){
                x1 = (pos1.left).toFixed(0);
                y1 = (pos1.top - 20).toFixed(0);
            }else if(pos1.id.includes('bottom')){
                x1 = (pos1.left).toFixed(0);
                y1 = (pos1.top + 20).toFixed(0);
            }
        
            if(pos2.id.includes('right')){
                x2 = (pos2.left + 20).toFixed(0);
                y2 = (pos2.top).toFixed(0);
            }else if(pos2.id.includes('left')){
                x2 = (pos2.left - 20).toFixed(0);
                y2 = (pos2.top).toFixed(0);
            }else if(pos2.id.includes('top')){
                x2 = (pos2.left).toFixed(0);
                y2 = (pos2.top - 20).toFixed(0);
            }else if(pos2.id.includes('bottom')){
                x2 = (pos2.left).toFixed(0);
                y2 = (pos2.top + 20).toFixed(0);
            }
        
            const lid = `${transferid}_line`;
            const tid = `${transferid}_text`;
            const hid = `${transferid}_ar1`;
            const hid2 = `${transferid}_ar2`;

            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('class', 'unit-svg-line');
            line.setAttribute('id', lid);
            line.setAttribute('marker-end', `url(#${hid})`);

            const angleDeg = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

            const distx = ((parseFloat(x2) + parseFloat(x1)) / 2) - 10;
            const disty = ((parseFloat(y2) + parseFloat(y1)) / 2) - 10;

            if(y2 > y1){
                distx + 20;
                disty + 20;
            }

            const arrowtext = document.createElementNS("http://www.w3.org/2000/svg", "text");
            // console.log(arrowtext);
            arrowtext.setAttribute('id', tid);
            arrowtext.setAttribute('class', 'unit-transferparameter-h');
            arrowtext.setAttribute('trid', options.id);
            arrowtext.setAttribute('text-anchor', 'middle');
            arrowtext.setAttribute('fill', 'black');
            arrowtext.setAttribute('transform', `translate(${distx}, ${disty}) rotate(${angleDeg}) ${x2 < x1 ? "scale(-1)" : ""}`);
            arrowtext.textContent = options.name;

            function addArrow1(){
                const arrowhead = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
                arrowhead.setAttribute('points', `0 0, 5 3, 0 7`);
                const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
                marker.setAttribute('id', hid);
                marker.setAttribute('class', 'unit-svg-marker');
                marker.setAttribute('markerWidth', '10');
                marker.setAttribute('markerHeight', '7');
                marker.setAttribute('refX', '0');
                marker.setAttribute('refY', '3.5');
                marker.setAttribute('orient', 'auto');
                marker.appendChild(arrowhead);

                document.getElementById(`${options.parent}-svg-defs`).appendChild(marker);
            }
            function addArrow2(){
                const arrowhead2 = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
                arrowhead2.setAttribute('points', `0 3.5, 5 0, 5 7`);
                const marker2 = document.createElementNS("http://www.w3.org/2000/svg", "marker");
                marker2.setAttribute('id', hid2);
                marker2.setAttribute('class', 'unit-svg-marker');
                marker2.setAttribute('markerWidth', '10');
                marker2.setAttribute('markerHeight', '7');
                marker2.setAttribute('refX', '5');
                marker2.setAttribute('refY', '3.5');
                marker2.setAttribute('orient', 'auto');
                marker2.appendChild(arrowhead2);
                line.setAttribute('marker-start', `url(#${hid2})`);
                document.getElementById(`${options.parent}-svg-defs`).appendChild(marker2);
            }

            if(options.type == "double"){
                addArrow1();
                addArrow2();
            }
            if(options.type == "single"){
                addArrow1();
            }

            document.getElementById(`${options.parent}-svg`).appendChild(line);
            document.getElementById(`${options.parent}-svg`).appendChild(arrowtext);
            
        }else{
            // $(`#${transferid}_line`).remove();
            $(`#${transferid}_text`).text(options.name);

            if(options.type == "single"){
                // $(`#${transferid}_ar1`).remove();
                $(`#${transferid}_ar2`).remove();
            }else if(options.type == "double"){
                // $(`#${transferid}_ar1`).remove();
                if(oldtype == "single"){
                    const arrowhead2 = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
                    arrowhead2.setAttribute('points', `0 3.5, 5 0, 5 7`);
                    const marker2 = document.createElementNS("http://www.w3.org/2000/svg", "marker");
                    marker2.setAttribute('id', `${transferid}_ar2`);
                    marker2.setAttribute('class', 'unit-svg-marker');
                    marker2.setAttribute('markerWidth', '10');
                    marker2.setAttribute('markerHeight', '7');
                    marker2.setAttribute('refX', '5');
                    marker2.setAttribute('refY', '3.5');
                    marker2.setAttribute('orient', 'auto');
                    marker2.appendChild(arrowhead2);
                    $(`#${transferid}_line`).attr('marker-start', `url(#${transferid}_ar2)`);
                    document.getElementById(`${options.parent}-svg-defs`).appendChild(marker2);
                }
            }else if(oldtype == "double"){

            }
        }
    
        $(`#${options.ui1}`).removeClass('show').hide();
        $(`#${options.ui2}`).removeClass('show').hide();

        $(`#${options.ui1}`).addClass('out');
        $(`#${options.ui2}`).addClass('in');

        // function addT
    }
    moveUnitTransfer(transferid){
        const options = this.getUnitTransferObj(transferid);
        const parentPos = $(`#${options.parent}`).offset();
    
        $(`#${options.ui1}`).show();
        $(`#${options.ui2}`).show();

        const ui1MiniGate = $(`#${options.ui1}`).parent('.unit-widget').attr('minimized') == "true" ? true : false;
        const ui2MiniGate = $(`#${options.ui2}`).parent('.unit-widget').attr('minimized') == "true" ? true : false;

        // console.log(ui1MiniGate, ui2MiniGate);

        const pos1 = {
            top: ui1MiniGate ? $(`#${options.ui1}`).siblings('.unit-widget-action-maximize').offset().top - parentPos.top + 25 : $(`#${options.ui1}`).offset().top - parentPos.top,
            left: ui1MiniGate ? $(`#${options.ui1}`).siblings('.unit-widget-action-maximize').offset().left - parentPos.left : $(`#${options.ui1}`).offset().left - parentPos.left,
            id: options.ui1
        }
        const pos2 = {
            top: ui2MiniGate ? $(`#${options.ui2}`).siblings('.unit-widget-action-maximize').offset().top - parentPos.top + 25 : $(`#${options.ui2}`).offset().top - parentPos.top,
            left: ui2MiniGate ? $(`#${options.ui2}`).siblings('.unit-widget-action-maximize').offset().left - parentPos.left : $(`#${options.ui2}`).offset().left - parentPos.left,
            id: options.ui2
        }

        let x1 = 0;
        let x2 = 0;
        let y1 = 0;
        let y2 = 0;
    
        if(pos1.id.includes('right')){
            x1 = (pos1.left + 20).toFixed(0);
            y1 = (pos1.top).toFixed(0);
        }else if(pos1.id.includes('left')){
            x1 = (pos1.left - 20).toFixed(0);
            y1 = (pos1.top).toFixed(0);
        }else if(pos1.id.includes('top')){
            x1 = (pos1.left).toFixed(0);
            y1 = (pos1.top - 20).toFixed(0);
        }else if(pos1.id.includes('bottom')){
            x1 = (pos1.left).toFixed(0);
            y1 = (pos1.top + 20).toFixed(0);
        }
    
        if(pos2.id.includes('right')){
            x2 = (pos2.left + 20).toFixed(0);
            y2 = (pos2.top).toFixed(0);
        }else if(pos2.id.includes('left')){
            x2 = (pos2.left - 20).toFixed(0);
            y2 = (pos2.top).toFixed(0);
        }else if(pos2.id.includes('top')){
            x2 = (pos2.left).toFixed(0);
            y2 = (pos2.top - 20).toFixed(0);
        }else if(pos2.id.includes('bottom')){
            x2 = (pos2.left).toFixed(0);
            y2 = (pos2.top + 20).toFixed(0);
        }
        const lid = `${transferid}_line`;
        const tid = `${transferid}_text`;
        $(`#${lid}`).attr('x1', x1);
        $(`#${lid}`).attr('y1', y1);
        $(`#${lid}`).attr('x2', x2);
        $(`#${lid}`).attr('y2', y2);
        const angleDeg = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        const distx = ((parseFloat(x2) + parseFloat(x1)) / 2) - 10;
        const disty = ((parseFloat(y2) + parseFloat(y1)) / 2) - 10;
        if(y2 > y1){
            distx + 20;
            disty + 20;
        }
        $(`#${tid}`).attr('transform', `translate(${distx}, ${disty}) rotate(${angleDeg}) ${x2 < x1 ? "scale(-1)" : ""}`);
        $(`#${options.ui1}`).hide();
        $(`#${options.ui2}`).hide();
    }
    getUnitTransferIdByUi(ui){
        let list = [];
        $.each(this.UnitTransfer, function(key, value){
            if(value.ui1.includes(ui) || value.ui2.includes(ui)){
                list.push(value.id);
            }
        });
        return list;
    }
    deleteUnitTransfer(componentid){
        const obj = $.grep(this.UnitTransfer, function(e){ 
            return ( e.ui1.includes(componentid) || e.ui2.includes(componentid));
        }, true);
        this.UnitTransfer = obj;
        this.updateChanged();
    }



    
    getEquipmentObj(id){
        return this.Equipment.find(obj => obj.id == id);
    }
    getEquipmentObjsBySubUnitId(subunitid){
        let list = [];
        $.each(this.Equipment, function(key, value){
            if(value.subunitid == subunitid){
                list.push(value);
            }
        });
        return list;
    }
    createEquipment(subequipmentobj){
        const dis = this;
        const id = rngComponentEquipmentId();
        const obj = {
            "id": id,
            "subunitid": subequipmentobj.subunitid,
            "equipmentid": subequipmentobj.equipmentid,
            "subequipmentid": subequipmentobj.id,
            "icon": subequipmentobj.icon,
            "name": subequipmentobj.name,
            "top": subequipmentobj.top,
            "left": subequipmentobj.left,
            "height": subequipmentobj.height,
            "width": subequipmentobj.width
        }
        $.each(subequipmentobj.content, function(key, value){
            const zobj = {
                'id' : rngComponentEquipmentPropsId(),
                'compid' : id,
                'equipmentid' : subequipmentobj.uid,
                'subequipmentid' : subequipmentobj.suid,
                'type' : value.type == undefined ? 'text' : value.type,
                'name' : value.name,
                'measurement' : value.measurement,
                'content' : {
                    "min" : value.min,
                    "max" : value.max,
                    "setpoint" : value.setpoint,
                    "text" : value.text
                },
                'visible' : 'false'
            }
            dis.EquipmentProps.push(zobj);
        });
        // $.each(propsobj, function(key, value){
        //     dis.EquipmentProps.push(value);
        // });

        this.Equipment.push(obj);
        this.drawEquipment(id);
        this.updateChanged();
        return id;
    }
    deleteEquipment(componentid){
        resizeObserver.disconnect( $(`#${componentid}`)[0] );
        this.deleteDataSheet(componentid);
        this.deleteEquipmentTransfer(componentid);
        this.deleteEquipmentProps(componentid);
        const obj = $.grep(this.Equipment, function(e){ 
            return e.id != componentid;
        });
        this.Equipment = obj;
        this.updateChanged();
    }
    drawEquipment(id){
        const obj = this.getEquipmentObj(id);
        // console.log(obj);
        // const iconobj = ACCUSER.Skid.Icons.getEquipmentIconById(obj.icon);
        const iconobj = SKID_DATA.Icons.getEquipmentIconById(obj.icon);
        console.log(iconobj);
        const propsobj = this.getEquipmentProps(obj.id);
        let propshtml = '';

        $.each(propsobj, function(key, value){
            if(value.visible == "true"){
                propshtml += `
                <div id="${value.id}" class="eqparams">
                    <span class="title">${value.name}</span>
                    ${ value.type == "text" ? `<span class="content">${value.content.text}</span>` : `<span class="content">${value.content.setpoint}</span>` }
                </div>
            `; 
            }
        });
        $(`#${obj.id}`).remove();
        $(`#${obj.subunitid}`).prepend(`
            <div id="${obj.id}" suid="${obj.subequipmentid}" uid="${obj.equipmentid}" process="${obj.process}" tag="${obj.tag}" class="equipment-widget" style="top=${obj.top}px; left=${obj.left}px; width:${obj.width}; height:${obj.height};"
            height="${obj.height}" width="${obj.width}" >
                <span class="title equipment-widget-action-details"><img src="${iconobj.url}" alt="">${obj.name}</span>
                
                ${propshtml}

                <i id="${obj.id}-arrow-top" class="hidden equipment-widget-arrow-h top far fa-circle"></i>
                <i id="${obj.id}-arrow-bottom" class="hidden equipment-widget-arrow-h bottom far fa-circle"></i>
                <i id="${obj.id}-arrow-left" class="hidden equipment-widget-arrow-h left far fa-circle"></i>
                <i id="${obj.id}-arrow-right" class="hidden equipment-widget-arrow-h right far fa-circle"></i>
            </div>
        `);

        $(`#${obj.id}`).css({
            "top" : `${obj.top}px`,
            "left" : `${obj.left}px`
        }).draggable(equipmentDraggOption);
        resizeObserver.observe( $(`#${obj.id}`)[0] );
    }
    moveEquipment(options){
        const obj = this.Equipment.find(obj => obj.id == options.id);
        obj.top = options.top;
        obj.left = options.left;
    }
    resizeEquipment(options){
        const obj = this.Equipment.find(obj => obj.id == options.id);
        obj.width = options.width;
        obj.height = options.height;
    }

    updateEquipmentProps(options){
        const obj = this.EquipmentProps.find(obj => obj.id == options.id);
        obj.name = options.name;
        obj.content = options.content;
        obj.visible = options.visible;
        obj.lock = options.lock;
        this.updateChanged();
    }
    createEquipmentProps(options){
        const obj = {
            'id' : rngComponentEquipmentPropsId(),
            'compid' : options.compid,
            'equipmentid' : options.equipmentid,
            'subequipmentid' : options.subequipmentid,
            'name' : options.name,
            'type' : options.type,
            'measurement' : options.measurement,
            'lock' : options.lock,
            'content' : options.content,
            'visible' : options.visible
        }
        this.EquipmentProps.push(obj);
        this.updateChanged();
    }
    getEquipmentProps(id){
        let list = [];
        $.each(this.EquipmentProps, function(key, value){
            // console.log(value);
            if(value.compid == id){
                list.push(value);
            }
        });
        return list;
    }
    updateEquipmentPropsCompare(options){
        const obj = this.EquipmentProps.find(obj => obj.id == options.id);
        obj['compare'] = options.content;
        this.updateChanged();
    }
    getEquipmentPropObj(id){
        return this.EquipmentProps.find(obj => obj.id == id);
    }
    deleteEquipmentProps(componentid){
        const obj = $.grep(this.EquipmentProps, function(e){ 
            return e.compid != componentid;
        });
        this.EquipmentProps = obj;
        this.updateChanged();
    }


    createEquipmentTransfer(options){
        const obj = {
            "id" : options.id,
            "ui1" : options.ui1,
            "ui2" : options.ui2,
            "parent" : options.parent,
            "name" : options.name,
            "type" : options.type,
            "props" : options.props
        }
        this.EquipmentTransfer.push(obj);
        this.drawEquipmentTransfer(obj.id);
        this.updateChanged();
    }
    updateEquipmentTransfer(options){
        const n = this.getEquipmentTransferObj(options.id);
        let gate = false;
        let oldtype = '';
        if(n.name != options.name || n.type != options.type){
            gate = true;
            oldtype = n.type;
        }
        n.name = options.name;
        n.type = options.type;
        n.props = options.props;
        if(gate){
            this.drawEquipmentTransfer(options.id, false, oldtype);
        }
        this.updateChanged();
    }
    getEquipmentTransferObj(transferid){
        return this.EquipmentTransfer.find(obj => obj.id == transferid);
    }
    drawEquipmentTransfer(transferid, create = true, oldtype=null){
        
        const options = this.getEquipmentTransferObj(transferid);
        // document.getElementById(`#${transferid}`).remove();
        $(`#${options.ui1}`).show();
        $(`#${options.ui2}`).show();
        if(create){
            // console.log(options);
            const parentPos = $(`#${options.parent}`).offset();
        
            // console.log($(`#${ui1}`), $(`#${ui1}`).offset());
        
            const pos1 = {
                top: $(`#${options.ui1}`).offset().top - parentPos.top,
                left: $(`#${options.ui1}`).offset().left - parentPos.left,
                id: options.ui1
            }
            const pos2 = {
                top: $(`#${options.ui2}`).offset().top - parentPos.top,
                left: $(`#${options.ui2}`).offset().left - parentPos.left,
                id: options.ui2
            }
        
            console.log(pos1, pos2);
            let x1 = 0;
            let x2 = 0;
            let y1 = 0;
            let y2 = 0;
        
            if(pos1.id.includes('right')){
                x1 = (pos1.left + 20).toFixed(0);
                y1 = (pos1.top).toFixed(0);
            }else if(pos1.id.includes('left')){
                x1 = (pos1.left - 20).toFixed(0);
                y1 = (pos1.top).toFixed(0);
            }else if(pos1.id.includes('top')){
                x1 = (pos1.left).toFixed(0);
                y1 = (pos1.top - 20).toFixed(0);
            }else if(pos1.id.includes('bottom')){
                x1 = (pos1.left).toFixed(0);
                y1 = (pos1.top + 20).toFixed(0);
            }
        
            if(pos2.id.includes('right')){
                x2 = (pos2.left + 20).toFixed(0);
                y2 = (pos2.top).toFixed(0);
            }else if(pos2.id.includes('left')){
                x2 = (pos2.left - 20).toFixed(0);
                y2 = (pos2.top).toFixed(0);
            }else if(pos2.id.includes('top')){
                x2 = (pos2.left).toFixed(0);
                y2 = (pos2.top - 20).toFixed(0);
            }else if(pos2.id.includes('bottom')){
                x2 = (pos2.left).toFixed(0);
                y2 = (pos2.top + 20).toFixed(0);
            }
        
            const lid = `${transferid}_line`;
            const tid = `${transferid}_text`;
            const hid = `${transferid}_ar1`;
            const hid2 = `${transferid}_ar2`;

            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('class', 'unit-svg-line');
            line.setAttribute('id', lid);
            line.setAttribute('marker-end', `url(#${hid})`);

            const angleDeg = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

            const distx = ((parseFloat(x2) + parseFloat(x1)) / 2) - 10;
            const disty = ((parseFloat(y2) + parseFloat(y1)) / 2) - 10;

            if(y2 > y1){
                distx + 20;
                disty + 20;
            }

            const arrowtext = document.createElementNS("http://www.w3.org/2000/svg", "text");
            console.log(arrowtext);
            arrowtext.setAttribute('id', tid);
            arrowtext.setAttribute('class', 'equipment-transferparameter-h');
            arrowtext.setAttribute('trid', options.id);
            arrowtext.setAttribute('text-anchor', 'middle');
            arrowtext.setAttribute('fill', 'black');
            arrowtext.setAttribute('transform', `translate(${distx}, ${disty}) rotate(${angleDeg}) ${x2 < x1 ? "scale(-1)" : ""}`);
            arrowtext.textContent = options.name;

            function addArrow1(){
                const arrowhead = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
                arrowhead.setAttribute('points', `0 0, 5 3, 0 7`);
                const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
                marker.setAttribute('id', hid);
                marker.setAttribute('class', 'unit-svg-marker');
                marker.setAttribute('markerWidth', '10');
                marker.setAttribute('markerHeight', '7');
                marker.setAttribute('refX', '0');
                marker.setAttribute('refY', '3.5');
                marker.setAttribute('orient', 'auto');
                marker.appendChild(arrowhead);

                document.getElementById(`${options.parent}-svg-defs`).appendChild(marker);
            }
            function addArrow2(){
                const arrowhead2 = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
                arrowhead2.setAttribute('points', `0 3.5, 5 0, 5 7`);
                const marker2 = document.createElementNS("http://www.w3.org/2000/svg", "marker");
                marker2.setAttribute('id', hid2);
                marker2.setAttribute('class', 'unit-svg-marker');
                marker2.setAttribute('markerWidth', '10');
                marker2.setAttribute('markerHeight', '7');
                marker2.setAttribute('refX', '5');
                marker2.setAttribute('refY', '3.5');
                marker2.setAttribute('orient', 'auto');
                marker2.appendChild(arrowhead2);
                line.setAttribute('marker-start', `url(#${hid2})`);
                document.getElementById(`${options.parent}-svg-defs`).appendChild(marker2);
            }

            if(options.type == "double"){
                addArrow1();
                addArrow2();
            }
            if(options.type == "single"){
                addArrow1();
            }

            document.getElementById(`${options.parent}-svg`).appendChild(line);
            document.getElementById(`${options.parent}-svg`).appendChild(arrowtext);

            
        }else{
            // $(`#${transferid}_line`).remove();
            $(`#${transferid}_text`).text(options.name);

            if(options.type == "single"){
                // $(`#${transferid}_ar1`).remove();
                $(`#${transferid}_ar2`).remove();
            }else if(options.type == "double"){
                // $(`#${transferid}_ar1`).remove();
                if(oldtype == "single"){
                    const arrowhead2 = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
                    arrowhead2.setAttribute('points', `0 3.5, 5 0, 5 7`);
                    const marker2 = document.createElementNS("http://www.w3.org/2000/svg", "marker");
                    marker2.setAttribute('id', `${transferid}_ar2`);
                    marker2.setAttribute('class', 'unit-svg-marker');
                    marker2.setAttribute('markerWidth', '10');
                    marker2.setAttribute('markerHeight', '7');
                    marker2.setAttribute('refX', '5');
                    marker2.setAttribute('refY', '3.5');
                    marker2.setAttribute('orient', 'auto');
                    marker2.appendChild(arrowhead2);
                    $(`#${transferid}_line`).attr('marker-start', `url(#${transferid}_ar2)`);
                    document.getElementById(`${options.parent}-svg-defs`).appendChild(marker2);
                }
            }else if(oldtype == "double"){

            }
        }
    
        $(`#${options.ui1}`).removeClass('show').hide();
        $(`#${options.ui2}`).removeClass('show').hide();

        $(`#${options.ui1}`).addClass('out');
        $(`#${options.ui2}`).addClass('in');
    }
    moveEquipmentTransfer(transferid){
        const options = this.getEquipmentTransferObj(transferid);
        const parentPos = $(`#${options.parent}`).offset();
    
        $(`#${options.ui1}`).show();
        $(`#${options.ui2}`).show();

        const pos1 = {
            top: $(`#${options.ui1}`).offset().top - parentPos.top,
            left: $(`#${options.ui1}`).offset().left - parentPos.left,
            id: options.ui1
        }
        const pos2 = {
            top: $(`#${options.ui2}`).offset().top - parentPos.top,
            left: $(`#${options.ui2}`).offset().left - parentPos.left,
            id: options.ui2
        }

        let x1 = 0;
        let x2 = 0;
        let y1 = 0;
        let y2 = 0;
    
        if(pos1.id.includes('right')){
            x1 = (pos1.left + 20).toFixed(0);
            y1 = (pos1.top).toFixed(0);
        }else if(pos1.id.includes('left')){
            x1 = (pos1.left - 20).toFixed(0);
            y1 = (pos1.top).toFixed(0);
        }else if(pos1.id.includes('top')){
            x1 = (pos1.left).toFixed(0);
            y1 = (pos1.top - 20).toFixed(0);
        }else if(pos1.id.includes('bottom')){
            x1 = (pos1.left).toFixed(0);
            y1 = (pos1.top + 20).toFixed(0);
        }
    
        if(pos2.id.includes('right')){
            x2 = (pos2.left + 20).toFixed(0);
            y2 = (pos2.top).toFixed(0);
        }else if(pos2.id.includes('left')){
            x2 = (pos2.left - 20).toFixed(0);
            y2 = (pos2.top).toFixed(0);
        }else if(pos2.id.includes('top')){
            x2 = (pos2.left).toFixed(0);
            y2 = (pos2.top - 20).toFixed(0);
        }else if(pos2.id.includes('bottom')){
            x2 = (pos2.left).toFixed(0);
            y2 = (pos2.top + 20).toFixed(0);
        }
        const lid = `${transferid}_line`;
        const tid = `${transferid}_text`;
        $(`#${lid}`).attr('x1', x1);
        $(`#${lid}`).attr('y1', y1);
        $(`#${lid}`).attr('x2', x2);
        $(`#${lid}`).attr('y2', y2);
        const angleDeg = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        const distx = ((parseFloat(x2) + parseFloat(x1)) / 2) - 10;
        const disty = ((parseFloat(y2) + parseFloat(y1)) / 2) - 10;
        if(y2 > y1){
            distx + 20;
            disty + 20;
        }
        $(`#${tid}`).attr('transform', `translate(${distx}, ${disty}) rotate(${angleDeg}) ${x2 < x1 ? "scale(-1)" : ""}`);
        $(`#${options.ui1}`).hide();
        $(`#${options.ui2}`).hide();
        // this.updateChanged();

    }
    getEquipmentTransferIdByUi(ui){
        let list = [];
        $.each(this.EquipmentTransfer, function(key, value){
            if(value.ui1.includes(ui) || value.ui2.includes(ui)){
                list.push(value.id);
            }
        });
        return list;
    }
    deleteEquipmentTransfer(componentid){
        const obj = $.grep(this.EquipmentTransfer, function(e){ 
            return ( e.ui1.includes(componentid) || e.ui2.includes(componentid));
        }, true);
        this.EquipmentTransfer = obj;
        this.updateChanged();
    }
    

    createDatasheet(options){
        const obj = this.DataSheet.find(obj => obj.compid == options.compid);
        // console.log(obj);
        if(obj == undefined){
            const dsobj = {
                "compid" : options.compid,
                "content" : options.content,
                "custom" : options.custom
            }
            this.DataSheet.push(dsobj);
        }else{
            obj.content = options.content;
            obj.custom = options.custom;
        }
        this.updateChanged();
    }
    getDataSheet(compid){
        return this.DataSheet.find(obj => obj.compid == compid);
    }
    deleteDataSheet(componentid){
        const obj = $.grep(this.DataSheet, function(e){ 
            return e.compid != componentid;
        });
        this.DataSheet = obj;
        this.updateChanged();
    }

    createCustomSheet(options){
        const obj = {
            "name" : options.name,
            "content" : options.content
        }
        
        if(this.DataSheet.custom){
            this.DataSheet.custom.push(obj);
        }else{
            this.DataSheet.custom = [];
            this.DataSheet.custom.push(obj);
        }
        this.updateChanged();
    }

    createForm(options){
        const obj = this.Form.find(obj => obj.formid == options.formid);
        // console.log('CLASS FORM OPTIONS',options);
        if(obj == undefined){
            const fobj = {
                formid: options.formid,
                filename: options.filename,
                type: options.type,
                creator: options.creator,
                createdate: options.createdate,
                modifydate: options.modifydate,
                columncount: options.columncount,
                content: options.content,
                notes: options.notes,
                connect: options.connect,
                relation: options.relation,
                tags: options.tags
            }
            // console.log('CLASS CREATEFORM',fobj);
            this.Form.push(fobj);
        }else{
            // console.log('CLASS UPDATEFORM',obj);
            obj.formconnect = options.formconnect;
            obj.columncount = options.columncount;
            obj.content = options.content;
            obj.connect = options.connect;
            obj.relation = options.relation;
            obj.tags = options.tags;
            obj.notes = options.notes;
            obj.modifydate = dateFns.format(
                new Date(),
                'YYYY-MM-DD hh:mm:ss'
            );

        }
        this.updateChanged();
    }
    getForm(formid){
        return this.Form.find(obj => obj.formid == formid);
    }
    deleteForm(fileid){
        const obj = $.grep(this.Form, function(e){ 
            return e.fileid != fileid;
        });
        this.Form = obj;
        this.updateChanged();
    }
    getAllForms(){
        return this.Form;
    }
    getFormByComponentId(compid){
        let list = [];
        $.each(this.Form, function(key, value){
            $.each(value.connect, function(key, value1){
                if(value1 == compid){
                    list.push(value.formid);
                }
            });
        });
        return list;
    }
    



    createPage(){
        const id = rngSkidPageId();
        this.Pages.push(id);
        this.drawPage(id);
        this.updateChanged();
    }
    deletePage(id){
        const obj = $.grep(this.Pages, function(e){ 
            return e != id;
        });
        this.Pages = obj;
        this.updateChanged();
    }
    drawPage(id, x=this.Pages.length){
        // const id = rngSkidPageId();
        
        $('#builder-area').append(`
            <div id="${id}" class="builder-area-page">

                <i class="builder-area-page-delete fas fa-trash"></i>
                <span class="builder-area-page-footer">${this.filename} ${x}</span>
                <svg id="${id}-svg" class="builder-area-page-svg unit-svg">
                    <defs id="${id}-svg-defs" class="builder-area-page-defs">
                        
                    </defs>
                </svg>
            </div>
        `);
        $(`#${id}`).droppable(builderAreaDropOption);
        this.applySettings();
        this.drawPageHeaderFooter();
    }
    drawPageHeaderFooter(){
        function headerLayout(options){
            // console.log("KWEEEEK", options.layout);
            // console.log("KWEEEEK", options.layout != "2" ? `<img src="${options.layout == "4" || options.layout == "5" ? 'options.img1' : 'options.img2'}" alt="">` : "");
            // console.log("KWEEEEK", options.img1 == options.img2);
            return options.visible ? `<div class="header layout${options.layout}">
            ${options.layout == "4" ? "" : `<img src="${options.layout == "5" ? options.img2 : options.img1}" alt="">`}
            <div class="titlecon">
                <span class="title">${options.title}</span>
                <span class="subtitle">${options.subtitle}</span>
                <span class="mintitle">${options.mintitle}</span>
            </div>
            ${options.layout != "2" ? `<img src="${options.layout == "4" || options.layout == "5" ? options.img1 : options.img2}" alt="">` : ""}
        </div>` : ""
        }
        function footerLayout(options){
            return options.visible ? `
            <div class="footer layout${options.layout}">
                <span class="title">${options.title}</span>
                ${options.layout == "2" ? `<img src="${options.img}" alt="">` : ""}
            </div>` : ""
        }

        const headeroptions = {
            visible : this.PrintProps.HeaderVisibility == undefined ? false : this.PrintProps.HeaderVisibility,
            layout : this.PrintProps.HeaderLayout == undefined ? "1" : this.PrintProps.HeaderLayout,
            img1 : this.PrintProps.PrintHeaderImage1 == undefined ? "https://via.placeholder.com/150x70.png?text=No+Image+Selected" : this.PrintProps.PrintHeaderImage1,
            img2 : this.PrintProps.PrintHeaderImage2 == undefined ? "https://via.placeholder.com/150x70.png?text=No+Image+Selected" : this.PrintProps.PrintHeaderImage2,
            title : this.PrintProps.PrintHeaderTitle  == undefined ? __COMPANY_NAME : this.PrintProps.PrintHeaderTitle,
            subtitle : this.PrintProps.PrintHeaderSubTitle  == undefined ? this.filename : this.PrintProps.PrintHeaderSubTitle,
            mintitle : this.PrintProps.PrintHeaderMinTitle  == undefined ? this.fileid : this.PrintProps.PrintHeaderMinTitle,
        }
        const footeroptions = {
            visible : this.PrintProps.FooterVisibility == undefined ? false : this.PrintProps.FooterVisibility,
            layout : this.PrintProps.FooterLayout == undefined ? "1" : this.PrintProps.FooterLayout,
            img :  this.PrintProps.PrintFooterImage1 == undefined ? "https://via.placeholder.com/70x70.png?text=No+Image+Selected" : this.PrintProps.PrintFooterImage1,
            title : this.PrintProps.PrintFooterTitle  == undefined ? __COMPANY_NAME : this.PrintProps.PrintFooterTitle,
        }

        
        $('#builder-area').children('.builder-area-page').children('.header').remove();
        $('#builder-area').children('.builder-area-page').children('.footer').remove();
        $('#builder-area').children('.builder-area-page').append(`
            ${headerLayout(headeroptions)}
            ${footerLayout(footeroptions)}
        `);

        console.log(headerLayout(headeroptions));
    }
    getPages(){
        return this.Pages;
    }


    export(){
        return {
            "componentid" : this.componentid,
            "gridline" : this.gridline,
            "orientation" : this.orientation,
            "scroll" : this.scroll,
            "pagesize" : this.pagesize,
            "filename" : this.filename,
            "version" : this.version,
            "fileid" : this.fileid,
            "creator" : this.creator,
            "lastmodified" : this.lastmodified,
            "comparison_value" : this.comparison_value,
            "componentView" : this.componentView,
            "lock" : this.lock,
            "status" : this.status,

            PrintProps : this.PrintProps,

            "ComponentHeirarchy" : this.ComponentHeirarchy,
            "DataSheet" : this.DataSheet,
            "Form" : this.Form,
            "Pages" : this.Pages,
            "Unit" : this.Unit,
            "UnitTransfer" : this.UnitTransfer,
            "UnitProps" : this.UnitProps,
            "Equipment" : this.Equipment,
            "EquipmentTransfer" : this.EquipmentTransfer,
            "EquipmentProps" : this.EquipmentProps
        }
    }
    draw(){
        // this.applySettings();
        const dis = this;
        let x = 1;
        $.each(this.Pages, function(key, value){
            dis.drawPage(value, x);
            x++;
        });
        $.each(this.Unit, function(key, value){
            dis.drawUnit(value.id);
        });
        setTimeout(() => {
            $.each(this.UnitTransfer, function(key, value){
                dis.drawUnitTransfer(value.id);
            });
            $.each(this.EquipmentTransfer, function(key, value){
                dis.drawEquipmentTransfer(value.id);
            });
        }, 0);
        this.applySettings();
    }
    drawIcon(option = "all", datasheet=false){
        const dis = this;
        let html = '';
        let obj;
        if(option == "unit"){
            obj = $.grep(this.getComponentHeirarchy(), function(e){ 
                const type = e.split('-')[0];
                return type == "CU"
            });
        }else if(option == "equipment"){
            obj = $.grep(this.getComponentHeirarchy(), function(e){ 
                const type = e.split('-')[0];
                return type == "CE"
            });
        }else if(option == "all"){
            obj = this.getComponentHeirarchy();
        }


        // const hobj = this.getComponentHeirarchy();
        function datasheetHtml(title, obj){
            let html = `<div class="dswidget">
            <span class="title">${title}</span>
            <div class="content">`;
            $.each(obj, function(key, value){
                if(value.text){
                    html += `<span>${value.text}</span>`
                }else{
                    html += `<span>${value.label} : ${value.value}</span>`
                }
            });
            html += "</div></div>";
            return html;
        }

        $.each(obj, function(key, value){
            let compobj;
            let iconobj;
            let propobj;
            let dsobj;
            let prophtml = '';
            let dshtml = '';
            let dsnum = 0;
            if(value.split('-')[0] == "CE"){
                compobj = dis.getEquipmentObj(value);
                iconobj = SKID_DATA.Icons.getEquipmentIconById(compobj.icon);
                propobj  = dis.getEquipmentProps(value);
            }else if(value.split('-')[0] == "CU"){
                compobj = dis.getUnitObj(value);
                iconobj = SKID_DATA.Icons.getUnitIconById(compobj.icon);
                propobj  = dis.getUnitProps(value);
            }
            dsobj = dis.getDataSheet(value);
            $.each(propobj, function(key, value){
                prophtml += `
                    <div class="props">
                        <span class="label">${value.name}</span>
                        ${value.type == "numeric" ? `<span class="value">${value.content.min} ${value.measurement} - ${value.content.max} ${value.measurement}</span>` : `<span class="value">${value.content.text}</span>`}
                    </div>
                `
            });
            // console.log(dsobj);
            if(dsobj != undefined){
                // console.log("INSIDE DATASHEET");
                if(dsobj.content.documentation && dsobj.content.documentation.length > 0){
                    dsnum += 1;
                    dshtml += datasheetHtml("Documentation", dsobj.content.documentation);
                }
                if(dsobj.content.identification && dsobj.content.identification.length > 0){
                    dsnum += 1;
                    dshtml += datasheetHtml("Identification", dsobj.content.identification);
                }
                if(dsobj.content.process && dsobj.content.process.length > 0){
                    dsnum += 1;
                    dshtml += datasheetHtml("Process", dsobj.content.process);
                }
                if(dsobj.content.specification && dsobj.content.specification.length > 0){
                    dsnum += 1;
                    dshtml += datasheetHtml("Specification", dsobj.content.specification);
                }
                // console.log(dsobj);
                if(dsobj.custom && dsobj.custom.length > 0){
                    $.each(dsobj.custom, function(key, value){
                        dsnum += 1;
                        dshtml += datasheetHtml(value.name, value.content);
                    });
                }
                if(dsobj.content.notes){
                    dsnum += 1;
                    dshtml +=  `<div class="dswidget">
                    <span class="title">${title}</span>
                    <div class="content">
                        <span>${dsobj.content.notes}</span>
                    <div/><div/>`;
                }

            }

            html += `
                <div class="widget">
                    <div class="widget-component">
                        <img src="${iconobj.url}" />
                        ${prophtml}
                    </div>    
                    <div class="widget-datasheet">
                        ${datasheet ? dshtml : ""}
                    </div>
                </div>
            `

            // console.log("KKAKAKKAK", html);
        });

        $('#builder-area').append(`
            <div class="builder-area-page-single">
                ${html}    
            </div>
        `);
    }

    report(){
        const dis = this;
        function getPropertiesHtml(){
            return `
                <div class="properties">
                    <div class="widget">
                        <span class="filename">${dis.filename}</span>
                        <span class="fileid">${dis.fileid}</span>
                    </div>
                    <div class="widget">
                        <span class="label">Creator</span>
                        <span class="value">${dis.creator.firstname} ${dis.creator.id}</span>
                    </div>
                    <div class="widget">
                        <span class="label">Version</span>
                        <span class="value">${dis.version}</span>
                    </div>
                    <div class="widget">
                        <span class="label">Last Modified</span>
                        <span class="value">${new Date(dis.lastmodified)}</span>
                    </div>
                    <div class="widget">
                        <span class="label">Lock Status</span>
                        <span class="value">${dis.lock}</span>
                    </div>
                </div>
            `
        }
        function getComponentHtml(obj, type){
            
            const iconurl = type == "unit" ? SKID_DATA.Icons.getUnitIconById(obj.icon) : SKID_DATA.Icons.getEquipmentIconById(obj.icon);
            console.log(iconurl);
            function getPropHtml(){
                const propobj = type == "unit" ? dis.getUnitProps(obj.id) : dis.getEquipmentProps(obj.id);
                // console.log(propobj);
                let html = '';
                $.each(propobj, function(key, value){
                    html += `
                        <tr>
                            <td><span>${value.name}</span></td>
                            <td><span>${ value.type == "text" ? value.content.text : `min: ${value.content.min}, max: ${value.content.max}, setpoint: ${value.content.setpoint}` }</span></td>
                        </tr>
                    `
                });
                return html;
                // `<tr>
                //     <table class="border">
                //         <tbody>
                //             ${html}
                //         </tbody>
                //     </table>

                // </tr>`
            }

            return `
                <table>
                    <thead>
                        <tr>
                            <th colspan="2" class="title center">
                                <img src="${iconurl.url}" alt="">
                                <span>${obj.name}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><span>id</span></td>
                            <td><span>${obj.id}</span></td>
                        </tr>
                        <tr>
                            <td><span>subunitid</span></td>
                            <td><span>${obj.subunitid}</span></td>
                        </tr>
                        <tr>
                            <td><span>unitid</span></td>
                            <td><span>${obj.unitid}</span></td>
                        </tr>
                        <tr>
                            <th colspan="2" class="bold center">Properties</th>
                        </tr>
                        ${getPropHtml()}                        
                    </tbody>
                </table>
                <br />
            `;
        }
        function getHeirarchyHtml(){

            function getHtml(id){
                const type = id.split('-')[0];
                const obj = type == "CE" ? dis.getEquipmentObj(id) : dis.getUnitObj(id);
                const iconobj = type == "CU" ? SKID_DATA.Icons.getUnitIconById(obj.icon) : SKID_DATA.Icons.getEquipmentIconById(obj.icon);
                return  `
                <tr>
                    <td colspan="2" class="center">
                        <img src="${iconobj.url}" alt="">
                        <span>${obj.name} - ${obj.id}</span>
                    </td>
                </tr>`
            }
            let html = '';
            $.each(dis.ComponentHeirarchy, function(key, value){
                html += getHtml(value);
            });
            return `
                <table>
                    <tbody>
                        ${html}
                    </tbody>
                </table>`
        }
        function getTransferParameterHtml(obj){

            function getPropsHtml(obj){
                let html = '';
                $.each(obj, function(key, value){
                    html += `
                    <tr>
                        <td><span>${value.name}</span></td>
                        <td><span>${value.content}</span></td>
                    </tr>`
                });
                return html;
            }
            return `
            <table>
                <thead>
                    <tr>
                        <th colspan="2" class="title center">
                            <span>${obj.name}</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><span>id</span></td>
                        <td><span>${obj.id}</span></td>
                    </tr>
                    <tr>
                        <td><span>origin</span></td>
                        <td><span>${obj.ui1}</span></td>
                    </tr>
                    <tr>
                        <td><span>destination</span></td>
                        <td><span>${obj.ui2}</span></td>
                    </tr>
                    <tr>
                        <td><span>type</span></td>
                        <td><span>${obj.type} arrow</span></td>
                    </tr>
                    <tr>
                        <th colspan="2" class="center bold">Properties</th>
                    </tr>
                    ${getPropsHtml(obj.props)}
                </tbody>
            </table>
            <br />`
        }
        function getFormsHtml(obj){

            function getTagHtml(obj){
                let html = '';
                if(obj.length > 0){
                    $.each(obj, function(key, value){
                        html += `${value}, `
                    });
                }else{
                    html += `Empty`
                }
                return `
                <tr>
                    <table class="border">
                        <thead>
                            <tr>
                                <td colspan="2" class="subtitle center">Tags</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span>${html}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </tr>`
            }
            function getConnectionHtml(obj){
                let html = '';
                if(obj.length > 0){
                    $.each(obj, function(key, value){
                        html += `${value}, `
                    });
                }else{
                    html += `Empty`
                }
                return `
                <tr>
                    <table class="border">
                        <thead>
                            <tr>
                                <td colspan="2" class="subtitle center">Connections</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span>${html}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </tr>`
            }
            function getRelationHtml(obj){
                let html = '';
                let x= 0;
                if(obj.length > 0){
                    $.each(obj, function(key, value){
                        if(x == 0){
                            html += `
                            <table class="border">
                                <thead>
                                    <tr>
                                        <td colspan="2" class="subtitle center">Relations</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><span>Filename</span></td>
                                        <td><span>${value.filename}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span>Formid</span></td>
                                        <td><span>${value.formid}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span>Fileid</span></td>
                                        <td><span>${value.fileid}</span></td>
                                    </tr>
                                </tbody>
                            </table>`
                        }else{
                            html += `
                            <table class="border">
                                <tbody>
                                    <tr>
                                        <td><span>Filename</span></td>
                                        <td><span>${value.filename}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span>Formid</span></td>
                                        <td><span>${value.formid}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span>Fileid</span></td>
                                        <td><span>${value.fileid}</span></td>
                                    </tr>
                                </tbody>
                            </table>`
                        }
                        x++;
                        
                    });
                }else{
                    html += `
                    <table class="border">
                        <tbody>
                            <tr>
                                <td><span>Empty</span></td>
                                <td><span>Empty</span></td>
                            </tr>
                        </tbody>
                    </table>` 
                }
                return html;
            }
            function getContentHtml(obj, cc){
                let headerhtml = '';
                let headercount = 0;
                let propshtml = '';
                let propscount = 0;
                $.each(obj.header, function(key, value){
                    headerhtml += `<td class="center bold"><span>${value}</span></td>`;
                    headercount ++;
                });
                for(headercount; headercount<parseInt(cc); headercount++){
                    headerhtml += `<td class="center bold"><span></span></td>`;
                }
                $.each(obj.values, function(key, value){
                    if(value.id != undefined){
                        propshtml += '<tr>';
                        $.each(value.values, function(key, value1){
                            propshtml += `<td class="center"><span>${value1}</span></td>`;
                            propscount ++;
                        });
                        for(propscount; propscount<parseInt(cc); propscount++){
                            propshtml += `<td class="center"><span></span></td>`;
                        }
                        propshtml += '</tr>';
                    }else if(value.link != undefined){
                        propshtml += `<tr><td colspan="${cc}" class="center"><span>Linked: fileid=${value.link.fileid}, formid=${value.link.formid}, rowid=${value.link.rowid};</span></td></tr>`;
                    }
                });
                
                console.log(cc);
                return `
                <tr>
                    <table class="border">
                        <thead>
                            <tr>
                                <td colspan="${cc}" class="subtitle center">${obj.name}</td>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
                                ${headerhtml}
                            </tr>
                        </thead>
                        <tbody>
                            ${propshtml}
                        </tbody>
                    </table>
                </tr>`
            }
            function getAllContentHtml(obj, cc){
                let html = '';
                $.each(obj, function(key, value){
                    html += getContentHtml(value, cc);
                });
                return html;
            }
            function getNotesHtml(text){
                return `
                <tr>
                    <table class="border">
                        <thead>
                            <tr>
                                <td class="subtitle center">NOTES</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="regular start" ><span>${text}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </tr>`
            }

            return `
            <table>
                <thead>
                    <tr>
                        <td colspan=2 class="title center">
                            <span>${obj.filename}</span>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><span>id</span></td>
                        <td><span>${obj.formid}</span></td>
                    </tr>
                    <tr>
                        <td><span>creator</span></td>
                        <td><span>${obj.creator}</span></td>
                    </tr>
                    <tr>
                        <td><span>Create Date</span></td>
                        <td><span>${obj.createdate}</span></td>
                    </tr>
                    <tr>
                        <td><span>Modify Date</span></td>
                        <td><span>${obj.modifydate}</span></td>
                    </tr>
                    <tr>
                        <td><span>Form Type</span></td>
                        <td><span>${obj.type}</span></td>
                    </tr>
                    <tr>
                        <td><span>Column Count</span></td>
                        <td><span>${obj.columncount}</span></td>
                    </tr>
                    ${getTagHtml(obj.tags)}
                    ${getConnectionHtml(obj.connect)}
                    ${getRelationHtml(obj.relation)}
                    ${getAllContentHtml(obj.content, obj.columncount)}
                    ${getNotesHtml(obj.notes)}
                </tbody>
            </table>
            <br />`
        }
        
        let comphtmlu = '';
        $.each(dis.Unit, function(key, value){
            comphtmlu += getComponentHtml(value, 'unit');
        });
        let comphtmle = '';
        $.each(dis.Equipment, function(key, value){
            comphtmle += getComponentHtml(value, 'equipment');
        });
        let comphtmlut = '';
        $.each(dis.UnitTransfer, function(key, value){
            comphtmlut += getTransferParameterHtml(value);
        });
        let comphtmlet = '';
        $.each(dis.EquipmentTransfer, function(key, value){
            comphtmlet += getTransferParameterHtml(value);
        });
        let comphtmlf = '';
        $.each(dis.Form, function(key, value){
            comphtmlf += getFormsHtml(value);
        });

        return `
            ${getPropertiesHtml()}
            <span class="title">Component Heirarchy</span>
            ${getHeirarchyHtml()}
            <br />

            <span class="title">Units</span>
            ${ comphtmlu }
            <br />

            ${ dis.UnitTransfer.length > 0 ? `
            <span class="title">Unit Transfers</span>
            ${ comphtmlut }
            <br />
            ` : '' }

            <span class="title">Equipments</span>
            ${ comphtmle }

            ${ dis.EquipmentTransfer.length > 0 ? `
            <span class="title">Equipment Transfers</span>
            ${ comphtmlet }
            <br />
            ` : '' }

            ${ dis.Form.length > 0 ? `
            <span class="title">Forms</span>
            ${ comphtmlf }
            <br />
            ` : '' }

            
        `;
        
    }


}


class SkidForm{
    constructor(){
        this.fileid = options.fileid;
        this.filename = options.filename;
        this.type = options.type;
        this.creator = options.creator;
        this.createdate = options.createdate;
        this.modifydate = options.modifydate;
        this.parents = options.parents;
        this.childrens = options.childrens;
        this.columncount = options.columncount;
        this.connect = options.connect;
        this.content = options.content;
        this.tags = options.tags;
        this.notes = options.notes;
    }

    addRelation(options){
        if(options.type == "parent"){
            const newobj = [...this.parents, options.value];
            this.parent = newobj;
        }
        if(options.type == "children"){
            const newobj = [...this.childrens, options.value];
            this.parent = newobj;
        }
    }

    save(){

    }

}

class Icons{
    constructor(companyid, callback){
        this.UnitIcon = [];
        this.EquipmentIcon = [];
        setTimeout(() => {
            this.initializeData(companyid, callback);
        }, 0);
    }

    initializeData(companyid, callback){
        const dis = this;
        $.get(`${domain}data/SkidIcon/${companyid}.skiddata`, function(res) {
            // console.log(res);
            const encodedStringAtoB = res;
            const decodedStringAtoB = atob(encodedStringAtoB);
            const decodedJSON = JSON.parse(decodedStringAtoB);
            // console.log('decodedStringAtoB', decodedJSON);
    
            // console.log(decodedJSON);
            // console.log(decodedJSON.UnitIcon.length, decodedJSON.EquipmentIcon.length);
            
            dis.UnitIcon = decodedJSON.UnitIcon;
            dis.EquipmentIcon = decodedJSON.EquipmentIcon;
            // dis.SubUnit = decodedJSON.SubUnit.length == 0 ? new Array : decodedJSON.SubUnit;
            // dis.SubEquipment = decodedJSON.SubEquipment.length == 0 ? new Array : decodedJSON.SubEquipment;
        })
        .success(function(result){
            // console.log(result);
        })
        .done(function(){
            callback("Initializing Skid Data");
        })
        .error(function(jqXHR, textStatus, errorThrown){
            console.log(errorThrown);
            // showToast('There was an error saving the file, Please contact our administrators');
        });
    }

    getUnitIcons(){
        // const defaultobj = {
        //     "id" : "na",
        //     "name" : "no selected icon",
        //     "url" : "lib/images/skidicons/default.png"
        // }
        // const newObj = [...this.UnitIcon, defaultobj];
        return this.UnitIcon;
    }
    getEquipmentIcons(){
        // const defaultobj = {
        //     "id" : "na",
        //     "name" : "no selected icon",
        //     "url" : "lib/images/skidicons/default.png"
        // }
        // const newObj = [...this.EquipmentIcon, defaultobj];
        return this.EquipmentIcon;
    }

    getUnitIconById(id){
        const iconobj = this.UnitIcon.find(obj => obj.id == id);
        return iconobj == undefined ? {
            "id" : "default",
            "name" : "default",
            "url" : "lib/images/skidicons/default.png"
        } : iconobj;
    }
    getEquipmentIconById(id){
        const iconobj = this.EquipmentIcon.find(obj => obj.id == id);
        return iconobj == undefined ? {
            "id" : "default",
            "name" : "default",
            "url" : "lib/images/skidicons/default.png"
        } : iconobj;
    }
    
    saveIconFile(callback){
        const jsonObj = {
            UnitIcon : this.UnitIcon,
            EquipmentIcon : this.EquipmentIcon
        };
        console.log(jsonObj);
        const jsonStr = JSON.stringify(jsonObj);
        const encodedStringBtoA = btoa(jsonStr);
        console.log('encodedStringBtoA',encodedStringBtoA);

        const options = {
            companyid : __COMPANY_ID,
            content : encodedStringBtoA
        }
        console.log(options);
        
        const cbsuccess =data=>{
            console.log(data);
            callback(data);
        };
        ajax_data_body_icon_save_file(options, cbsuccess, ()=>{});
    }
    addUnitIcon(options, callback){
        const cbs =data=>{
            console.log(data);
            if(data.response != "error"){
                const obj = {
                    "id" : data.iconid,
                    "name" : options.name,
                    "url" : data.url
                }
                this.UnitIcon.push(obj);
                const callback =data=>{
                    console.log(data);
                    if(data.response != "error"){
                        showToast('Successfully Updated Skid Icon Data!');
                    }else{
                        showToast('There was an error Saving the Data.. Preparing Filysystem Fix');
                    }
                };
                this.saveIconFile(callback);
            }
            callback(data);
        };
        ajax_data_body_icon_browse_unit(cbs, ()=>{});
    }
    addEquipmentIcon(options, callback){
        const cbs =data=>{
            console.log(data);
            if(data.response != "error"){
                const obj = {
                    "id" : data.iconid,
                    "name" : options.name,
                    "url" : data.url
                }
                this.EquipmentIcon.push(obj);
                const callback =data=>{
                    console.log(data);
                    if(data.response != "error"){
                        showToast('Successfully Updated Skid Icon Data!');
                    }else{
                        showToast('There was an error Saving the Data.. Preparing Filysystem Fix');
                    }
                    
                };
                this.saveIconFile(callback);
            }
            callback(data);
        };
        ajax_data_body_icon_browse_equipment(cbs, ()=>{});
    }

    deleteIcon(options, callback){
        const dis = this;
        let obj;
        if(options.type == "unit"){
            obj = dis.UnitIcon.find(obj => obj.id == options.iconid);
        }else if(options.type == "equipment"){
            obj = dis.EquipmentIcon.find(obj => obj.id == options.iconid);
        }
        const zoptions = {
            "url" : `../${obj.url}`
        }
        const cbsuccess =data=>{
            console.log(data);
            if(data.response != "error"){
                if(options.type == "unit"){
                    const obj = $.grep(dis.UnitIcon, function(e){ 
                        return e.id != options.iconid;
                    });
                    dis.UnitIcon = obj;
                }else if(options.type == "equipment"){
                    const obj = $.grep(dis.EquipmentIcon, function(e){ 
                        return e.id != options.iconid;
                    });
                    dis.EquipmentIcon = obj;
                    // dis.saveIconFile(callback);
                }
            }
        };
        const cbcomplete =()=>{
            dis.saveIconFile(callback);
            // console.log(zoptions);
        };
        // const cbsuccess =data=>{
        //     console.log(data);
        // };
        
        capi_deleteIcon(zoptions, cbsuccess, cbcomplete);
    }

}

class SkidData {
    constructor(companyid, callback){
        this.Unit = undefined;
        this.Equipment = undefined;
        // this.SubUnit = undefined;
        // this.SubEquipment = undefined;
        setTimeout(() => {
            const cb =data=>{
                console.log(data);
                setTimeout(() => {
                    this.Icons = new Icons(companyid, callback);
                }, 0);
            };
            this.initializeSkidData(companyid, cb);
        }, 0);
        // console.log('SkidData test', companyid);
    }

    initializeSkidData(companyid, callback){
        const dis = this;
        $.get(`${domain}data/SkidData/${companyid}.skiddata`, function(res) {
            // console.log(res);
            const encodedStringAtoB = res;
            const decodedStringAtoB = atob(encodedStringAtoB);
            const decodedJSON = JSON.parse(decodedStringAtoB);
            // console.log('decodedStringAtoB', decodedJSON);
    
            // console.log(decodedJSON);
            // console.log(decodedJSON.Unit.length, decodedJSON.Equipment.length);
            
            dis.Unit = new SkidDataUnit(decodedJSON.Unit);
            dis.Equipment = new SkidDataEquipment(decodedJSON.Equipment);
            // dis.SubUnit = decodedJSON.SubUnit.length == 0 ? new Array : decodedJSON.SubUnit;
            // dis.SubEquipment = decodedJSON.SubEquipment.length == 0 ? new Array : decodedJSON.SubEquipment;

        })
        .success(function(result){
            // console.log(result);
        })
        .done(function(){
            callback("Initializing Skid Data");
        })
        .error(function(jqXHR, textStatus, errorThrown){
            console.log(errorThrown);
            console.log('Creating new Data File');

            const jsonObj = {
                Unit: [],
                Equipment : []
            };
            const jsonStr = JSON.stringify(jsonObj);
            const encodedStringBtoA = btoa(jsonStr);
            capi_createSkidData({companyid: companyid, content: encodedStringBtoA});
            dis.Unit = [];
            dis.Equipment = [];
            // dis.SubUnit = [];
            // dis.SubEquipment = [];
        });
    }

    export(){
        return {
            "Unit" : this.Unit.data,
            "Equipment" : this.Equipment.data
        }
    }
    save(options, callback){
        const cb =data=>{
            console.log(data);
        };
        capi_updateSkidData(options, cb, callback);
    }




}

class SkidDataUnit{
    constructor(data){
        this.data = data;
    }

    createUnit(options){
        const obj = {
            'uid' : options.uid,
            'name' : options.name,
            'sub' : [],
        }
        this.data.push(obj);
    }
    updateUnit(options){
        let obj = this.data.find(obj => obj.uid == options.uid);
        obj.name = options.name;
    }
    deleteUnit(options){
        const obj = $.grep(this.data, function(e){ 
            return e.uid != options.uid;
        });
        this.data = obj;
    }

    createSubUnit(options){
        const obj ={
            'uid' : options.uid,
            'suid' : options.suid,
            'name' : options.name,
            'icon' : options.icon,
            'props' : options.props,
        }
        // const props = {
        //     type : $(this).attr('type'),
        //     name : $(this).children('span').text(),
        //     measurement : $(this).children('span').attr('measurement'),
        //     min : $(this).children('.inputholder').children('input.min').val(),
        //     max : $(this).children('.inputholder').children('input.max').val(),
        //     text : $(this).children('.inputholder').children('input.text').val()
        // }
        let uobj = this.data.find(obj => obj.uid == options.uid);
        uobj.sub.push(obj); 
    }
    updateSubUnit(options){
        let uobj = this.data.find(obj => obj.uid == options.uid);
        let suobj = uobj.sub.find(obj => obj.suid == options.suid);
        suobj.name = options.name;
        suobj.icon = options.icon;
        suobj.props = options.props;
    }
    deleteSubUnit(options){
        let uobj = this.data.find(obj => obj.uid == options.uid);
        let suobj = $.grep(uobj.sub, function(e){ 
            return e.suid != options.suid;
        });
        uobj.sub = suobj;
    }


    getUnit(){
        // let list = [];
        // // console.log('pepet', this.data);
        // $.each(this.data, function(key, value){
        //     console.log('pekpek', value);
            
        //     const obj = {
        //         uid : value.uid,
        //         name : value.name
        //     }
        //     list.push(obj);  
        // });
        return this.data;
    }
    getUnitObj(uid){
        const obj = this.data.find(obj => obj.uid == uid);
        return {
            uid : obj.uid,
            name : obj.name
        }
    }
    getSubUnitByUnitId(uid){
        let uobj = this.data.find(obj => obj.uid == uid);
        return uobj.sub;
    }
    getSubUnitObj(uid, suid){
        let uobj = this.data.find(obj => obj.uid == uid);
        return uobj.sub.find(obj => obj.suid == suid);
    }
    getSubUnitByUnitIdWithFilter(uid, q){
        let list = [];
        let uobj = this.data.find(obj => obj.uid == uid);
        $.each(uobj.sub, function(key, value){
            if((value.name).toLowerCase().includes(q.toLowerCase())){
                list.push(value);
            }
        });
        return list;
    }


}
class SkidDataEquipment{
    constructor(data){
        this.data = data;
    }

    createEquipment(options){
        const obj ={
            'eid' : options.eid,
            'name' : options.name,
            'sub' : [],
        }
        this.data.push(obj);
    }
    deleteEquipment(options){
        console.log(options);
        
        const eobj = $.grep(this.data, function(e){ 
            return e.eid != options.eid;
        });
        this.data = eobj;
        // console.log(eobj);
    }
    updateEquipment(options){
        let obj = this.data.find(obj => obj.eid == options.eid);
        obj.name = options.name;
    }

    createSubEquipment(options){
        const obj ={
            'eid' : options.eid,
            'seid' : options.seid,
            'name' : options.name,
            'icon' : options.icon,
            'props' : options.props
        }
        let eobj = this.data.find(obj => obj.eid == options.eid);
        eobj.sub.push(obj);
    }
    deleteSubEquipment(options){
        let eobj = this.data.find(obj => obj.eid == options.eid);
        const seobj = $.grep(eobj.sub, function(e){ 
            return e.seid != options.seid;
        });
        eobj.sub = seobj;
    }
    updateSubEquipment(options){
        let eobj = this.data.find(obj => obj.eid == options.eid);
        let seobj = eobj.sub.find(obj => obj.seid == options.seid);
        seobj.name = options.name;
        seobj.props = options.props;
        seobj.icon = options.icon;
    }

    getEquipment(){
        // let list = [];
        // $.each(this.data, function(key, value){
        //     const obj = {
        //         eid : value.eid,
        //         name : value.name
        //     }
        //     list.push(obj);  
        // });
        return this.data;
    }
    getSubEquipmentObj(eid, seid){
        const eobj = this.data.find(obj => obj.eid == eid);
        return eobj.sub.find(obj => obj.seid == seid);
    }
    getSubEquipmentByEquipmentId(eid){
        let eobj = this.data.find(obj => obj.eid == eid);
        return eobj.sub;
    }
    getSubEquipmentByEquipmentIdWithFilter(eid, q){
        let list = [];
        let eobj = this.data.find(obj => obj.eid == eid);
        $.each(eobj.sub, function(key, value){
            if((value.name).toLowerCase().includes(q.toLowerCase())){
                list.push(value);
            }
        });
        return list;
    }

}