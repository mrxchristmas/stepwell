class Group{
    constructor(options){
        console.log(options);
        this.list = this.fetchGroups(options);
        this.GroupMembers = undefined;
    }
    fetchGroups(options){
        let list = [];
        console.log(options);
        const cbsuccess=data=>{
            console.log(data);
            $.each(data, function(key, value){
                console.log(value);
                if(value != 'error' && value != undefined){
                    const obj = {
                        'id' : value.groupid, 
                        'name' : value.groupname, 
                        'owner': value.owner, 
                        'firstname': value.firstname, 
                        'lastname': value.lastname, 
                        'photo' : value.photo,
                        'GroupMembers' : []
                    };
                    list[list.length] = obj;
                }
            });
        };
        const cbcomplete=data=>{
            options.callback(data);
        };
        capi_fetchGroupById(options, cbsuccess, cbcomplete);
        return list;
    
    }
    fetchGroupMembers(options){
        const g = this.list.find(obj => obj.id == options.groupid);
        if(g != undefined){
            g.GroupMembers = new GroupMember(options);
        }
    }
    getGroupsList(){
        return this.list;
    }
    getGroupMembers(groupid){
        const group = this.list.find(obj => obj.id == groupid);
        if(group != undefined){
            return group.GroupMembers.list;
        }
        return undefined;
    }
    getGroup(id){
        return this.list.find(obj => obj.id == id);
    }
    createGroup(options){
        this.list[this.list.length] = {
            'id' : options.groupid, 
            'name' : options.groupname, 
            'owner': options.owner, 
            'firstname': options.firstname, 
            'lastname': options.lastname, 
            'photo' : options.photo
        };
        const cbcomplete=data=>{
            options.callback(data);
        };
        capi_createGroup({'groupid': options.groupid,'groupname': options.groupname, 'owner': options.owner, 'comid':this.companyid}, cbcomplete);
    }
    deleteGroup(options){
        let g = this.list.find(obj => obj.id == options.id);
        if(g != undefined){
            let index = this.list.indexOf(g);
            console.log(index);
            this.list.splice(index,1);
        }
        const cbcomplete=()=>{
            options.callback('Deleting Group');
        };
        capi_deleteGroup(options, cbcomplete);
    }
    searchGroup(zname,location){
        $(location).empty();
        $.each(this.list, function(key, value){
            if(value.name.toLowerCase().includes(zname)){
                // $(location).append(`<span id="${value.id}" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR}" class="btn-shadow Group-list-widget">${value.title}</span>`);
            }
        });
    }
    searchByName(n){
        return this.list.find(obj => obj.name == n);
    }

    fillMembers(groupid, location){
        const group = this.list.find(obj => obj.id == groupid);
        if (group != undefined){
            const members = group.GroupMembers.list;
            $(location).empty();
            if(location == '#group-launch-list'){
                $.each(members, function(key, value){
                    $(location).append(`
                        <span id="${value.id}"
                        class="group-launch-list-widget btn-shadow" 
                        style="background-color: 
                        ${BTN_COLOR}; color: ${FONT_COLOR};">${value.firstname} ${value.lastname}</span>
                    `);
                });
            }
        }
    }

    deleteGroup(groupid, callback){
        let group = this.list.find(obj => obj.id == groupid);
        if(group != undefined){
            let index = this.list.indexOf(group);
            console.log(index);
            this.list.splice(index,1);

            capi_deleteGroup({'groupid': groupid}, callback);
        }
    }

    checkList(list, callback, reset=false){
        let dis = this;
    //     if(list == 'Group Member'){
    //         if(dis.Group == undefined && !reset){
    //             dis.GroupMember = new GroupMember({"memberid":dis.userid,"callback" : callback});
            
    //         }else if(reset){
    //             dis.GroupMember = new GroupMember({"memberid":dis.userid,"callback" : callback});
    //         }else{
    //             callback("Data Already Fetched"); 
    //         }
    //     }
    }
}

class GroupMember{
    constructor(options){
        console.log(options);
        this.list = this.fetchGroupMembers(options);
        this.groupID = options.groupid;
    }
    fetchGroupMembers(options){
        let list = [];
        console.log(options);
        const cbsuccess=data=>{
            console.log(data);
            $.each(data, function(key, value){
                console.log(value);
                if(value != 'error' && value != undefined){
                    const obj = {
                        'id' : value.id, 
                        'firstname': value.firstname, 
                        'lastname': value.lastname, 
                        'photo' : value.photo
                    };
                    list[list.length] = obj;
                }
            });
        };
        const cbcomplete=data=>{
            options.callback(data);
        };
        capi_fetchGroupMembers(options, cbsuccess, cbcomplete);
        return list;
    }
}