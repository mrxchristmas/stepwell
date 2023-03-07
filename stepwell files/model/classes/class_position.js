class Position{
    constructor(options){
        this.list = this.fetchPositions(options);
    }
    fetchPositions(options){
        let list = [];
        console.log(options);
        const cbsuccess=data=>{
            console.log(data);
            $.each(data, function(key, value){
                if(value != 'error' && value != undefined){
                    const obj = {
                        'id' : value.id,
                        'department' : value.department,
                        'title' : value.title
                    };
                    list[list.length] = obj;
                }
            });
        }
        const cbcomplete=data=>{
            options.callback('Fetching Positions');
        }
        capi_fetchPosition(options, cbsuccess, cbcomplete);
        return list;
    }
    updatePosition(options){
        let d = this.list.find(obj => obj.id == options.id);
        console.log(d);
        if(d != undefined){
            d.title = options.title;
        }
        const cbcomplete=()=>{
            options.callback('Updating Position');
        };
        capi_updatePosition(options, cbcomplete);
    }
    updatePositionDepartment(options){
        let d = this.list.find(obj => obj.id == options.id);
        console.log(d);
        if(d != undefined){
            d.department = options.department;
        }
        const cbcomplete=()=>{
            options.callback('Updating Position Department');
        };
        capi_updatePositionDepartment(options, cbcomplete);
    }
    getPositionsList(){
        return this.list;
    }
    getPosition(id){
        return this.list.find(obj => obj.id == id);
    }
    getPositionsByDepartmentId(id){
        let list = [];
        $.each(this.list, function(key, value){
            if(value.department.includes(id)){
                list[list.length] = value;
            }
        });
        return list;
    }
    createPosition(options){
        const cbcomplete=()=>{
            this.list[this.list.length] = {'id':options.id, 'title':options.title, 'department':options.department};
            options.callback('Creating Position');
        };
        console.log(options);
        capi_createPosition(options, cbcomplete);
    }
    deletePosition(options){
        let d = this.list.find(obj => obj.id == options.id);
        if(d != undefined){
            let index = this.list.indexOf(d);
            console.log(index);
            this.list.splice(index,1);
        }
        const cbcomplete=()=>{
            options.callback('Deleting Position');
        };
        capi_deletePosition(options, cbcomplete);
    }
    searchPosition(name,location, department){
        $(location).empty();
        $.each(this.list, function(key, value){
            if(name == ""){
                if(value.department == department){
                    $(location).append(`<span id="${value.id}" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR}" class="btn-shadow position-list-widget">${value.title}</span>`);
                }
            }else if(value.title.toLowerCase().includes(name)){
                $(location).append(`<span id="${value.id}" style="background-color: ${BTN_COLOR}; color: ${FONT_COLOR}" class="btn-shadow position-list-widget">${value.title}</span>`);
            }
        });
    }
}