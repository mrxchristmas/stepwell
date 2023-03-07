
class Department{
    constructor(options){
        console.log(options);
        this.list = this.fetchDepartments(options);
    }
    fetchDepartments(options){
        let list = [];
        console.log(options);
        const cbsuccess=data=>{
            console.log(data);
            $.each(data, function(key, value){
                if(value != 'error' && value != undefined){
                    const obj = {
                        'id' : value.id,
                        'title' : value.title
                    };
                    list[list.length] = obj;
                }
            });
        }
        const cbcomplete=data=>{
            options.callback('Fetching departments');
        }
        capi_fetchDepartments(options, cbsuccess, cbcomplete);
        return list;
    }
    getDepartmentsList(){
        return this.list;
    }
    updateDepartment(options){
        let d = this.list.find(obj => obj.id == options.id);
        console.log(d);
        if(d != undefined){
            d.title = options.title;
        }
        const cbcomplete=()=>{
            options.callback('Updating Department');
        };
        capi_updateDepartment(options, cbcomplete);
    }
    getDepartment(id){
        return this.list.find(obj => obj.id == id);
    }
    createDepartment(options){
        const cbcomplete=()=>{
            this.list[this.list.length] = {'id':options.id, 'title':options.title};
            options.callback('Creating Department');
        };
        capi_createDepartment({'id': options.id, 'comid':options.comid, 'title': options.title}, cbcomplete);
    }
    deleteDepartment(options){
        let d = this.list.find(obj => obj.id == options.id);
        if(d != undefined){
            let index = this.list.indexOf(d);
            console.log(index);
            this.list.splice(index,1);
        }
        const cbcomplete=()=>{
            options.callback('Deleting Department');
        };
        capi_deleteDepartment(options, cbcomplete);
    }
    searchDepartment(name,location){
        $(location).empty();
        $.each(this.list, function(key, value){
            if(value.title.toLowerCase().includes(name)){
                $(location).append(`<span id="${value.id}" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR}" class="btn-shadow department-list-widget">${value.title}</span>`);
            }
        });
    }
    searchByTitle(t){
        return this.list.find(obj => obj.title == t);
    }
}