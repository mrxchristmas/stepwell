$(document).on('click', '.complain-manage-widget', function(){
    const tid = $(this).attr('tid');
    // console.log(tid);
    const compobj = COMPANY.Complains.getObjByid(tid);
    const comobj = ADMIN.getCompanyObj(compobj.companyid);
    const typeobj = COMPANY.Complains.getComplainTypeNameById(compobj.type);

    $('.complain-details-widget-con').empty();
    $('.complain-details-widget-con').append(`
        <div class="sender">
            <span>${comobj.name}</span>
            <span>${compobj.sender}</span>
        </div>
        <span class="info">${typeobj.name} &nbsp;&bull;&nbsp; ${compobj.senddate}</span>
        <span class="context">Message</span>
        <span class="message">
            ${compobj.message}
        </span>
        <hr>
        <textarea name="" id="" class="reply" maxlength="500" placeholder="Maximum 500 Characters"></textarea>
        <button tid="${compobj.id}" accid="${compobj.sender}" comid="${compobj.companyid}" id="complain-details-widget-con-submit" class="submit">Send a Reply</button>
        <button tid="${compobj.id}" id="complain-details-widget-con-archive" class="archive">Archive Ticket</button>`).css('display', 'flex').show();
});


$(document).on('click', '#complain-details-widget-con-archive', function(){
    const tid = $(this).attr('tid');
    const cbtrue =()=>{
        const options ={
            "id" : tid,
            "status" : "archived"
        }
        const cb =()=>{
            fillComplains();
            $('.complain-details-widget-con').hide();
            showNotification("Complain Ticket", "Successfuly Archived Ticket");
        };
        COMPANY.Complains.updateStatus(options, cb);
    };
    const cbfalse =()=>{
        showNotification("Complain Ticket", "Cancelled Operation.");
    };
    showAction('Confrim to Archive this Ticket. Proceed?', cbtrue, cbfalse);
});
$(document).on('click', '#complain-details-widget-con-submit', function(){
    const ticketid = $(this).attr('tid');
    const accid = $(this).attr('accid');
    const comid = $(this).attr('comid');
    const comobj = ADMIN.getCompanyObj(comid);
    const message = $(this).siblings('.reply').val();
    const na = {
        "response" : "na"
    };
    const nastr = JSON.stringify(na);
    const options = {
        'id' : rngAlertId(),
        'ownerid' : accid,
        'fn' : "na",
        'dataview' : nastr,
        'dataapprove' : nastr,
        'datareject' : nastr,
        'title' : "Ticket Response",
        'message' : `Ticket ID: ${ticketid} :: ${message}`,
        'databaseid' : comobj.databaseid
    }
    const cb =()=>{
        $('#complain-details-widget-con-archive').click();
    };
    COMPANY.Complains.sendAlertReply(options, cb);
    console.log(options);
});