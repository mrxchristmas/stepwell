
class Company{
    constructor(options){
        this.id = options.id;
        this.name = options.name;
        this.logo = options.logo;
        
        this.userid = options.userid;
        this.userfirstname = options.userfirstname;
        this.userlevel = options.userlevel;
        this.userphoto = options.userphoto;
        this.userpassword = options.userpassword;
        
        this.Department = undefined;
        this.Position = undefined;
        this.AccUser = undefined;
        this.Group = undefined;
        this.Complains = undefined;
    }

    fillDepartments(location){
        $(location).empty();
        $.each(this.Department.getDepartmentsList(), function(key, value){
            $(location).append(`<span id="${value.id}" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR}" class="btn-shadow department-list-widget">${value.title}</span>`);
        });
    }
    fillDepartmentsTag(location){
        $(location).empty();
        $.each(this.Department.getDepartmentsList(), function(key, value){
            $(location).append(`<option value="${value.id}">${value.title}</option>`);
        });
    }
    fillPositions(location){
        $(location).empty();
        $.each(this.Position.getPositionsList(), function(key, value){
            $(location).append(`<span id="${value.id}" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR}" class="btn-shadow position-list-widget">${value.title}</span>`);
        });
    }
    fillPositionsByDepartment(location, department){
        $(location).empty();
        $.each(this.Position.getPositionsList(), function(key, value){
            if(value.department == department){
                $(location).append(`<span id="${value.id}" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR}" class="btn-shadow position-list-widget">${value.title}</span>`);
            }
        });
    }
    fillPositionsTag(location){
        $(location).empty();
        $.each(this.Position.getPositionsList(), function(key, value){
            $(location).append(`<option value="${value.id}">${value.title}</option>`);
        });
    }
    fillTag(location, list){
        $(location).empty();
        if(location == '#suuser-view-position'){
            $.each(list, function(key, value){
                $(location).append(`<option value="${value.id}">${value.title}</option>`);
            });
        }
        if(location == '#suuser-create-position'){
            $.each(list, function(key, value){
                $(location).append(`<option value="${value.id}">${value.title}</option>`);
            });
        }
        if(location =='#suuser-view-supervisor'){
            $(location).append(`
                <option value="independent">Independent Worker</option>
            `);
            $.each(list, function(key, value){
                $(location).append(`
                    <option value="${value.id}">${value.firstname}</option>
                `);
            });
        }
        if(location =='#suuser-create-supervisor'){
            $(location).append(`
                <option value="independent">Independent Worker</option>
            `);
            $.each(list, function(key, value){
                $(location).append(`
                    <option value="${value.id}">${value.firstname}</option>
                `);
            });
        }
    }
    fill(location, list){
        $(location).empty();
        if(location == '#suuser-search-list'){
            $.each(list, function(key, value){
                $(location).append(`<span class="btn-shadow suuser-search-list-widget" id="${value.id}"
                style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};">${value.email}</span>`);    
            });
        }
        if(location == '#group-manage-list'){
            $.each(list, function(key, value){
                // $(location).append(`
                //     <span grid="${value.id}" fn="${value.firstname}" ln="${value.lastname}" 
                //     ph="${value.photo}" ow="${value.owner}" class="group-manage-list-widget btn-shadow" 
                //     style="color: white; background-color: ${BTN_COLOR}" >${value.name}</span>
                // `);
                $(location).append(`
                    <span id="${value.id}" class="group-manage-list-widget btn-shadow" 
                    style="color: white; background-color: ${BTN_COLOR}" >${value.name}</span>
                `);
    
            });
        }
        if(location == '#group-launch-list'){
            $.each(list, function(key, value){
                $(location).append(`
                    <span id="${value.id}"
                    class="group-launch-list-widget btn-shadow" 
                    style="background-color: 
                    ${BTN_COLOR}; color: ${FONT_COLOR};">${value.firstname} ${value.lastname}</span>
                `);
            });
        }
        if(location == '.uac-user-widget-con'){
            $.each(list, function(key, value){
                $(location).append(`<span class="uac-user-widget btn-shadow" id="${value.id}"
                style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR};">${value.email}</span>`);    
            });
        }

    }

    getCompanyAccountsByUserLevel(level){
        const alist = this.AccUser.getCompanyAccounts();
        if(level != 'na'){
            let list = [];
            $.each(alist, function(key, value){
                console.log(value);
                if(value.userlevel == level){
                    list[list.length] = value;
                }
            });
            return list;
        }else{
            return alist;
        }
    }
    getSupervisorsByDepartment(depart, userlevel){
        const acclist = this.AccUser.getCompanyAccounts();
        let list = [];
        $.each(acclist, function(key, value){
            // console.log(value);
            if(value.department == depart){
                list[list.length] = value;
            }
        });
        return list;
    }
    getPositionsByDepartmentId(id){
        return this.Position.getPositionsByDepartmentId(id);
    }
    getGroupsByOwner(){
        let dis = this;
        const grouplist = this.Group.getGroupsList();
        let list = [];
        $.each(grouplist, function(key, value){
            // console.log(value);
            if(value.owner == dis.userid){
                list[list.length] = value;
            }
        });
        return list;
    }
    getGroupsConnectedTo(){
        return this.Group.getGroupsList();
    }

    createUserAccount(options, callback){
        this.AccUser.createCompanyAccounts(options, callback);
    }

    updateCompanyAccount(options, callback){
        this.AccUser.updateCompanyAccount(options, callback);
    }

    searchCompanyAccountsByEmail(email){
        let list = [];
        const acclist = this.AccUser.getCompanyAccounts();
        $.each(acclist, function(key, value){
            console.log(value);
            if(value.email.toLowerCase().includes(email)){
                list[list.length] = value;
            }
        });

        return list;
    }
    searchGroupsByName(zname){
        let list = [];
        const grouplist = this.Group.getGroupsList();
        $.each(grouplist, function(key, value){
            console.log(value);
            if(value.name.toLowerCase().includes(zname)){
                list[list.length] = value;
            }
        });

        return list;
    }
    searchGroupMembersByName(groupid, zname){
        let list = [];
        const members = this.Group.getGroup(groupid).GroupMembers.list;
        $.each(members, function(key, value){
            console.log(value);
            if(value.firstname.toLowerCase().includes(zname)){
                list[list.length] = value;
            }
        });

        return list;
    }

    checkList(list,callback,reset=false){
        const dis = this;
        if(list == 'AccUser'){
            if(dis.AccUser == undefined && !reset){
                dis.AccUser = new User({"id":dis.userid});
                dis.AccUser.companyid = dis.id;
                callback('Fetching AccUsers');
            }else if(reset){
                dis.Accuser = new User({"id":dis.userid,"callback" : callback});
                dis.AccUser.companyid = dis.id;
                callback('Fetching AccUsers');
            }else{
                callback("Data Already Fetched"); 
            }
        }
        if(list == 'Departments'){
            if(dis.Department == undefined && !reset){
                dis.Department = new Department({"comid":dis.id, "callback" : callback});
            }else if(reset){
                dis.Department = new Department({"comid":dis.id,"callback" : callback});
            }else{
                callback("Data Already Fetched"); 
            }
        }
        if(list == 'Positions'){
            if(dis.Position == undefined && !reset){
                dis.Position = new Position({"comid":dis.id, "callback" : callback});
            }else if(reset){
                dis.Positions = new Position({"comid":dis.id,"callback" : callback});
            }else{
                callback("Data Already Fetched"); 
            }
        }
        if(list == 'Group'){
            if(dis.Group == undefined && !reset){
                dis.Group = new Group({"memberid":dis.userid,"callback" : callback});
                dis.Group.companyid = dis.id;
            }else if(reset){
                dis.Group = new Group({"memberid":dis.userid,"callback" : callback});
                dis.Group.companyid = dis.id;
            }else{
                callback("Data Already Fetched"); 
            }
        }
        if(list == 'Complains'){
            if(dis.Complains == undefined && !reset){
                dis.Complains = new Complains();
                callback('Fetching Complains');
                // dis.Complains.companyid = dis.id;
            }else if(reset){
                dis.Complains = new Complains();
                callback('Fetching Complains');
                // dis.Complains.companyid = dis.id;
            }else{
                callback("Data Already Fetched"); 
            }
        }

    }
}





// class Position{

// }