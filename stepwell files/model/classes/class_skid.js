class Skid{
    constructor(options){
        // const cb =data=>{
        //     console.log(data);
        //     const cb =data=>{
        //         console.log(data);
        //         const cb =data=>{
        //             console.log(data);
        //             options.callback("Finished Fetching Skid");
        //         };
        //         this.Equipment = new SkidEquipment(cb);
        //     };
        //     this.Unit = new SkidUnit(cb);
        // };
        this.Skid = this.fetchSkid(options.callback);
        this.Unit = undefined;
        this.Equipment = undefined;
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
        if(list == 'Unit'){
            if(dis.Unit == undefined && !reset){
                dis.Unit = new SkidUnit(callback);
            }else if(reset){
                dis.Unit = new SkidUnit(callback);
            }else{
                callback("Data Already Fetched");
            }
        }else if(list == 'Equipment'){
            if(dis.Equipment == undefined && !reset){
                dis.Equipment = new SkidEquipment(callback);
            }else if(reset){
                dis.Equipment = new SkidEquipment(callback);
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
            console.log('AAAAAAAAAAAAAAA',data);
            if(data.response != "error"){
                $.each(data, function(key, value){
                    const obj ={
                        'id' : value.id,
                        'name' : value.name,
                        'unitid' : value.unitid,
                        'process' : value.process,
                        'tag' : value.tag
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
                'tag' : options.tag
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
                    obj.tags = options.tag;
                }
            }
        };
        capi_updateSkidSubUnit(options, cbsuccess, callback);
    }

    getUnit(){
        return this.Unit;
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
                        'budget' : value.budget
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
                'budget' : options.budget
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
                }
            }
        };
        capi_updateSkidSubEquipment(options, cbsuccess, callback);
    }

    getEquipment(){
        return this.Equipment;
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
    getSubEquipmentObjById(id){
        return this.SubEquipment.find(obj => obj.id == id);
    }

}