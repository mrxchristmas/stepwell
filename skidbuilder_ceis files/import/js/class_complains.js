class Complains{
    constructor(){
        this.list = this.fetch();
        this.Archived = undefined;
    }

    fetch(){
        let list = [];
        const cbsuccess =data=>{
            console.log(data);
            if(data.response != "error"){
                $.each(data, function(key, value){
                    const obj ={
                        'id' : value.id,
                        'companyid' : value.companyid,
                        'sender' : value.sender,
                        'type' : value.type,
                        'message' : value.message,
                        'status' : value.status,
                        'senddate' : value.senddate,
                    }
                    list.push(obj);
                });
            }
        }
        capi_fetchActiveComplains(cbsuccess);
        return list;
    }

    get(){
        return this.list;
    }
    getObjByid(id){
        return this.list.find(obj => obj.id == id);
    }

    updateStatus(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const nobj = $.grep(this.list, function(e){ 
                return e.id != options.id; 
            });
            this.list = nobj;
        };
        capi_updateComplainStatus(options, cbsuccess, callback);
    }

    create(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj ={
                'id' : options.id,
                'companyid' : options.companyid,
                'sender' : options.sender,
                'type' : options.type,
                'message' : options.message,
                'status' : options.status,
                'senddate' : new Date(),
            }
            this.list.push(obj);
        };
        capi_createComplain(options, cbsuccess, callback);
    }

    getComplainTypes(){
        return [
            {
                "id" : "general",
                "name" : "General Inquiry"
            },{
                "id" : "tech",
                "name" : "Technical Assistance"
            },{
                "id" : "bill",
                "name" : "Billing Assistance"
            },{
                "id" : "bug",
                "name" : "Bug Report"
            }
        ]
    }
    getComplainTypeNameById(id){
        const obj = this.getComplainTypes();
        return obj.find(obj => obj.id == id);
    }


    sendAlertReply(options, callback){
        const cbsuccess=data=>{
            console.log(data);
        };
        capi_sendAlertReply(options, cbsuccess, callback);
    }

}