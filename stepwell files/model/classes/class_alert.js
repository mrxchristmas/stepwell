// class Alert{
//     constructor(options){
//         this.list = this.fetch(options);
//     }
//     fetch(options){
//         let list = [];
//         const cbsuccess =data=>{
//             // console.log('ALS:KJDLJLHKJADSKLJHDASKHJLASDKHJL', data);
//             if(data.response != "error"){
//                 $.each(data, function(key, value){
//                     // console.log(value.dataview);
//                     // console.log('BBBBBBBBBBBBBBBBBB', JSON.parse(value.dataview));
//                     const obj = {
//                         'id' : value.id,
//                         'ownerid' : value.ownerid,
//                         'fn' : value.fn,
//                         'dataview' : JSON.parse(value.dataview.toString()),
//                         'dataapprove' : JSON.parse(value.dataapprove.toString()),
//                         'datareject' : JSON.parse(value.datareject.toString()),
//                         'title' : value.title,
//                         'message' : value.message
//                     }
//                     list.push(obj);
//                 });
//             }
//         }
//         capi_fetchAlert(options, cbsuccess);
//         return list;
//     }
//     create(options, callback){
//         const cbsuccess =data=>{
//             console.log(data);
//             if(data.response != "false"){
//                 const obj = {
//                     'id' : options.id,
//                     'ownerid' : options.ownerid,
//                     'fn' : options.fn,
//                     'dataview' : JSON.parse(options.dataview),
//                     'dataapprove' : JSON.parse(options.dataapprove),
//                     'datareject' : JSON.parse(options.datareject),
//                     'title' : options.title,
//                     'message' : options.message
//                 }
//                 if(obj.ownerid == __ID){
//                     this.list.push(obj);
//                 }
//             }
//         }
//         capi_createAlert(options, cbsuccess, callback);
//     }
//     delete(options, callback){
//         const cbsuccess =data=>{
//             console.log(data);
//             if(data.response != "false"){
//                 const obj = $.grep(this.list, function(e){ 
//                     return e.id != options.id;
//                 });
//                 this.list = obj;
//             }
//         }
//         capi_deleteAlert(options, cbsuccess, callback);
//     }
//     getObjById(id){
//         let obj = {};
//         $.each(this.list, function(key, value){
//             if(value.id == id){
//                 obj = value;
//             }
//         });
//         return obj;
//     }
//     fill(){
//         $('#alert').children('.alert-con').empty();
//         // console.log(this.list);
//         let x = 0;
//         // console.log(this.list.length);
//         // console.log(this.list);
//         $.each(this.list, function(key, value){
//             console.log(value);
//             x++;
//             let approveHtmlTitle = '';
//             if(value.fn == "taskboard-message-markasread"){
//                 approveHtmlTitle = "Mark as Read"
//             }else{
//                 approveHtmlTitle = "Approve";
//             }
            
            
//             let approveHtml = value.dataapprove.response != "na" ? `<button type="approve" fn="${value.fn}" aid="${value.id}" data='${JSON.stringify(value.dataapprove)}' class="btn-shadow alert-con-widget-h">${approveHtmlTitle}</button>` : '';
//             let viewHtml = value.dataview.response != "na" ? `<button type="view" fn="${value.fn}" aid="${value.id}" data='${JSON.stringify(value.dataview)}' class="btn-shadow alert-con-widget-h">View</button>` : '';
//             let rejectHtml = value.datareject.response != "na" ? `<button type="reject" fn="${value.fn}" aid="${value.id}" data='${JSON.stringify(value.datareject)}' class="btn-shadow alert-con-widget-h">Reject</button>` : '';
            
//             // console.log(approveHtml);
//             // console.log(viewHtml);
//             // console.log(rejectHtml);
//             $('#alert').children('.alert-con').append(`
//                 <div class="alert-con-widget">
//                     <i aid="${value.id}" class="fas fa-trash alert-con-widget-delete"></i>
//                     <span class="alert-con-widget-title">${value.title}</span>
//                     <div class="alert-con-widget-message">
//                         <span>${value.message}</span>
//                         ${viewHtml}
//                         ${approveHtml}
//                         ${rejectHtml}
//                     </div>
//                 </div>
//             `);
//         });

//         if(x > 0 && this.list.length > 0){
//             // console.log("got company!!");
//             $('#alert-open').css({'color' : YELLOW_PALETTE, "animation" : "ring 0.4s infinite"});
//         }else{
//             $('#alert-open').css({'color' : 'white', "animation" : "unset"});
//         }
        
//     }



// }