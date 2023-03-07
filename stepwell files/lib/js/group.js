let group_launch_owner = "";
let group_remove_id = '';


function fillGroupProjectList(groupid, owner){
    const prlist = ACCUSER.getProjectsWithGroupId(groupid);
    $('.group-manage-view-projects').empty();
    
    $.each(prlist, function(key, value){
        let accobj;
        let actionhtml = '';
        let owcr;
        // console.log("OWNERID", value.ownerid);
        if(value.ownerid == "na"){
            accobj = ACCUSER.getCompanyAccountById(value.creator);
            owcr = value.creator;
        }else{
            accobj = ACCUSER.getCompanyAccountById(value.ownerid);
            owcr = value.ownerid;
        }
        const status = value.groupid.split('_')[0].toUpperCase();

        // const owcr = value.ownerid = "na" ? value.creator : value.ownerid;
        console.log("OWCR", owcr, __ID);

        if(owcr == __ID && value.groupid.split('_')[0] == "invite"){
            actionhtml = `<div prid="${value.projectid}"  grid="${value.groupid}" owner="${owner}" class="action">
                <button class="reject group-manage-view-projects-widget-h btn-shadow">Reject</button>
                <button class="approve group-manage-view-projects-widget-h btn-shadow">Approve</button>
            </div>`
        }else if(owner == __ID && value.groupid.split('_')[0] == "member"){
            actionhtml = `<div prid="${value.projectid}"  grid="${value.groupid}" class="action">
                <button class="remove group-manage-view-projects-widget-h btn-shadow">Remove</button>
            </div>`
        }

        $('.group-manage-view-projects').append(
        `<div class="group-manage-view-projects-widget">
            <span class="projectname">${value.projectname}</span>
            <span class="status">${status}</span>
            <span class="projectid">${value.projectid}</span>
            <span class="owner">${accobj.firstname} ${accobj.lastname}</span>
            ${actionhtml}
        </div>`);
    });
    if(prlist.length <= 0){
        $('.group-manage-view-projects').append(
            `<div class="group-manage-view-projects-widget">
                <span class="projectname">No Projects Connected</span>
            </div>`);
    }

}
$('#group-create-submit').click(function(){
    let groupid = $('#groups-create-id').val();
    let groupname = $('#groups-create-name').val();
    console.log(groupid, groupname);
    if(groupname == ''){
        blinkbg($('#groups-create-name'), RED_PALETTE, 'white');
    }else{
        // console.log(groupid, groupname, COMPANY.userid);
        // api_createGroup(groupid, groupname, COMPANY.userid, __COMPANY_ID);
        // const acc = COMPANY.AccUser.getAccountObjById(COMPANY.userid);
        // console.log(acc);
        // const cbcomplete=data=>{
        //     console.log(data);
        //     // showNotification('Create Groups', __FIRST_NAME + ' has created the group ' + groupname);
        //     $('#groups-create-id').val(rngGroupId());
        //     $('#groups-create-name').val("");
        //     const list = COMPANY.getGroupsConnectedTo();
        //     COMPANY.fill('#group-manage-list',list);
        // }
        // COMPANY.Group.createGroup({
        //     'groupid' : groupid, 
        //     'groupname' : groupname, 
        //     'owner': acc.id, 
        //     'firstname': acc.firstname, 
        //     'lastname': acc.lastname, 
        //     'photo' : acc.photo,
        //     'callback' : cbcomplete
        // });
        const callback =()=>{
            showNotification('Create Groups', __FIRST_NAME + ' has created the Project Group ' + groupname);
            $('#groups-create-id').val(rngGroupId());
            $('#groups-create-name').val("");
            cidGroup();
        }
        const options = {
            'id' : groupid,
            'ownerid' : __ID,
            'name' : groupname,
            'description' : "",
        }
        ACCUSER.ProjectGroup.createProjectGroup(options, callback);

    }
    
});
$(document).on('click', '.group-manage-list-widget', function(){
    let groupid = $(this).attr('id');
    let ownerid = $(this).attr('owner');
    // console.log(groupid);
    // const group = COMPANY.Group.getGroup(groupid);
    // console.log(group);
    // const group = ACCUSER.ProjectGroup.getProjectByGroupId(groupid);
    // console.log(group);

    $('.group-manage-view-projects').show();
    $('.group-manage-view-content').hide();
    $('#group-manage-add-project-submit').attr('grid', groupid);

    if(ownerid == __ID){
        $('#administration-mods-add-project').parent('.administration-mods-widget').css('display', 'flex').show();
    }

    fillGroupProjectList(groupid, ownerid);

    $('.group-manage-list-widget').removeClass('active');
    $(this).addClass('active');

    // if(group != undefined){
    //     group_launch_owner = group.owner;
    //     $('#group-view-name').text(group.name);
    //     $('#group-view-id').text(groupid);
    //     $('.group-connect-search-list').hide();
    //     $('.group-create-widget-con').hide();

    //     if(group.photo == 'na' || group.photo == ''){
    //         $('#group-view-ownerphoto').attr('src', 'lib/images/avatardefault.png');
    //     }else{
    //         $('#group-view-ownerphoto').attr('src', group.photo);
    //     }
    //     if(group.owner == COMPANY.userid){
    //         $('#group-view-ownername').text('You');
    //         $('#group-view-delete').show();
    //         $('.group-manage-connect-con').show();
            
    //     }else{
    //         $('#group-view-delete').hide();
    //         $('#group-view-ownername').text(group.firstname + ' ' + group.lastname);
    //         $('.group-manage-connect-con').hide();
    //     }
        
    //     $('.group-manage-view-con').show();
    // }
});
$('#group-connect-search').click(function(){
    let id = $('#group-connect-search-id').val();
    if(id == ''){
        blinkbg($('#group-connect-search-id'), 'red', 'white');
    }else{
        const cbsuccess=data=>{
            console.log(data);
            $('#group-connect-search-select').empty();
            $.each(data, function(key, value){
                // console.log(value.id, __COMPANY_ID);
                if(value != 'error'){
                    $('#group-connect-search-select').append(`
                        <option value="${value.id}">${value.firstname} ${value.lastname} ${value.id}</option>
                    `);
                    $('.group-connect-search-list').css('display', 'flex').show();
                }else{
                    $('.group-connect-search-list').hide();
                    showNotification('Fetch Error', 'There was no account linked to the provided Name.');
                }
            });
            
        };
        api_searchAccountByName(id, cbsuccess);
    }
});
$('#group-connect-submitzz').click(function(){
    console.log('invited');
    let groupid = $('#group-view-id').text();
    let id = $('#group-connect-userid').text();
    // console.log(groupid, id);
    
    api_addGroupMember(groupid, id);
    $('.group-connect-search-list').hide();
    $('#group-connect-search-id').val();
});
$('#group-manage-search').keyup(function(){
    let name = $(this).val();
    const list = COMPANY.searchGroupsByName(name);
    COMPANY.fill('#group-manage-list', list);
    // console.log(group_manage_list);
    // let x = Object.size(group_manage_list);
    // // console.log(x);
    // $('#group-manage-list').empty();
    // for(i=0; i < x; i++){
    //     // console.log(group_manage_list[i][1]);
    //     if(group_manage_list[i][0].toLowerCase().includes(q.toLowerCase()) || group_manage_list[i][1].toLowerCase().includes(q.toLowerCase())){
    //         // console.log('Found');
    //         $('#group-manage-list').append(`<span grid="${group_manage_list[i][0]}" fn="${group_manage_list[i][3]}" ln="${group_manage_list[i][4]}" ph="${group_manage_list[i][5]}" ow="${group_manage_list[i][2]}" class="group-manage-list-widget btn-shadow">${group_manage_list[i][1]}</span>`);
    //     }else{
    //         // console.log('Not FOund');
    //     }
    // }
    // $('#group-view-name').text('group Name');
    // $('#group-view-id').text('group Id');
    // $('#group-view-ownerphoto').attr('src', 'lib/images/avatardefault.png');
    // $('#group-view-ownername').text('Owners Name');
    // $('.group-manage-view-con').hide();
    // $('.group-manage-connect-con').hide();
});
$('#group-view-launch').click(function(){
    const groupid = $('#group-view-id').text();
    const groupname = $('#group-view-name').text();
    const ownername = $('#group-view-ownername').text();
    console.log(groupid, groupname, ownername);

    const cbcomplete=data=>{
        console.log(data);
        $('.groups-con').hide();
        $('.groups-launch-con').show();
        $('#administration-mods-create-group').parent().hide();
        $('#administration-mods-close-group').parent('.administration-mods-widget').css('display','flex').show();
        
        $('#group-launch-delete-id').text(groupid);
        $('#group-launch-delete-name').text(groupname);
        $('.group-launch-remove-con').hide();
        // console.log(group_launch_owner, COMPANY.userid);
        if(group_launch_owner == COMPANY.userid){
            $('.group-launch-delete-con').show();
        }else{
            $('.group-launch-delete-con').hide();
        }
        setTimeout(function(){
            COMPANY.Group.fillMembers(groupid, '#group-launch-list');
        }, 0);
    };
    COMPANY.Group.fetchGroupMembers({'groupid' : groupid, 'callback' : cbcomplete});
    
    // api_fetchGroupMembers(groupid, 'group-view-launch');
});
$(document).on('click', '.group-launch-list-widget', function(){
    let fullname = $(this).text();
    let photo = $(this).attr('ph');
    let id = $(this).attr('zid');
    group_remove_id = id;

    if(photo == 'na'){
        $('#group-launch-memberphoto').attr('src', 'lib/images/avatardefault.png');
    }else{
        $('#group-launch-memberphoto').attr('src', photo);
    }
    if(id == COMPANY.userid){
        $('#group-launch-membername').text('You');
        $('#group-launch-remove-member').text('Cannot Remove Owner');
        $('#group-launch-remove-member').prop('disabled', true);
        $('#group-launch-remove-member').css('color', '#c7c7c7');
        $('#group-launch-remove-member').css('cursor', 'not-allowed');
    }else{
        $('#group-launch-membername').text(fullname);
        $('#group-launch-remove-member').text('Remove');
        $('#group-launch-remove-member').prop('disabled', false);
        $('#group-launch-remove-member').css('color', 'white');
        $('#group-launch-remove-member').css('cursor', 'pointer');
    }

    if(group_launch_owner == COMPANY.userid){
        $('.group-launch-delete-con').show();
        $('#group-launch-remove-member').show();
        $('.group-launch-remove-title').text('Remove Group Member');
        $('.group-launch-remove-con').css('width', '100%' );
        $('.group-launch-member').css({'position' : 'absolute', 'top' : 'initial', 'bottom': '10px', 'left' : '10px', 'width' : '30%' });
    }else{
        $('.group-launch-delete-con').hide();
        $('#group-launch-remove-member').hide();
        $('.group-launch-remove-title').text('View Member');
        $('.group-launch-remove-con').css('width', '300px' );
        $('.group-launch-member').css({'position' : 'relative', 'top' : '-40px', 'width' : '70%'});
    }
    
    $('.group-launch-remove-con').show();
});
$('#group-launch-search').keyup(function(){
    let name = $(this).val();
    const groupid = $('#group-launch-delete-id').html();
    const list = COMPANY.searchGroupMembersByName(groupid,name);
    COMPANY.fill('#group-launch-list', list);
    // console.log(group_launch_list);
    // let x = Object.size(group_launch_list);
    // // console.log(x);
    // $('#group-launch-list').empty();
    // for(i=0; i < x; i++){
    //     // console.log(project_manage_list[i][1]);
    //     if(group_launch_list[i][0].toLowerCase().includes(q.toLowerCase()) || group_launch_list[i][1].toLowerCase().includes(q.toLowerCase()) || group_launch_list[i][2].toLowerCase().includes(q.toLowerCase())){
    //         // console.log('Found');
    //         if(group_launch_list[i][0] == COMPANY.userid){
    //             $('#group-launch-list').prepend(`<span zid="${group_launch_list[i][0]}" fn="${group_launch_list[i][1]}" ln="${group_launch_list[i][2]}" ph="${group_launch_list[i][3]}" class="project-manage-list-widget btn-shadow">You</span>`);
    //         }else{
    //             $('#group-launch-list').append(`<span zid="${group_launch_list[i][0]}" fn="${group_launch_list[i][1]}" ln="${group_launch_list[i][2]}" ph="${group_launch_list[i][3]}" class="project-manage-list-widget btn-shadow">${group_launch_list[i][1]} ${group_launch_list[i][2]}</span>`);
    //         }
    //     }else{
    //         // console.log('Not FOund');
    //     }
    // }

    // $('.group-launch-remove-con').hide();
});
function copy_clipboard(id) {
    let copyText = document.getElementById(id);
    let textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
};
$('#group-view-id-copy').click(function(){
    copy_clipboard("group-view-id");
    groupid_clipboard = $('#group-view-id').text();
    showNotification('Group ID', 'Group ID copied to the clipboard');
});
$('#group-launch-delete-confirm').click(function(){
    const groupid = $('#group-launch-delete-id').text();
    const cbtrue = () => {
        // console.log('YES')
        // api_deleteGroup(groupid);
        // api_fetchProjectByConnect(COMPANY.userid, 'nav-projects-manage');
        const cbcomplete=data=>{
            console.log(data);
            $('.groups-con').show();
            $('.groups-launch-con').hide();
            $('.group-manage-view-con').hide();
            $('.group-manage-connect-con').hide();
            $('#administration-mods-close-group').parent('.administration-mods-widget').hide();
            $('#administration-mods-create-group').parent().show();
            
            const list = COMPANY.getGroupsConnectedTo();
            console.log(list);
            COMPANY.fill('#group-manage-list', list);
        };
        COMPANY.Group.deleteGroup(groupid,cbcomplete);
    };
    const cbfalse = () => {
        // console.log('NO')
        showNotification('Group Management', 'You Have Declined to Delete The Group ' + groupid);
    };
    showAction('Confirm Delete Group?', cbtrue, cbfalse);
});
$('#group-launch-remove-member').click(function(){
    const groupid = $('#group-launch-delete-id').text();
    console.log(groupid, group_remove_id);
    api_removeGroupMember(groupid, group_remove_id);
    $('.group-launch-remove-con').hide();
    api_fetchGroupMembers(groupid, 'group-view-launch');
});


$('#group-manage-add-project-filter').keyup(function(){
    ACCUSER.fillSelectTagWithProjectsWithNoGroupWithFilter($('#group-manage-add-project-projectid'), $(this).val());
});
$('#group-manage-add-project-close').click(function(){
    $('.group-manage-add-project').css('display', 'none').hide();
});

$('#group-manage-add-project-submit').click(function(){
    const projectid = $('#group-manage-add-project-projectid').val();
    const groupid = $(this).attr('grid');

    const options = {
        "projectid" : projectid,
        "groupid" : `invite_${groupid}`
    }
    console.log(options);
    const callback =()=>{
        const probj = ACCUSER.getProject(projectid).getData();
        const grobj = ACCUSER.ProjectGroup.fetchProjectGroupById({"groupid" : groupid}, ()=>{});
        let owcr;
        if(probj.ownerid == "na"){
            owcr = probj.creator;
        }else{
            owcr = probj.ownerid;
        }
        const optionsview = {
            "response" : "na"
        };
        const optionsapprove = {
            "projectid" : projectid,
            "groupid" : `member_${groupid}`
        }
        const optionsreject = {
            "projectid" : projectid,
            "groupid" : `na`
        }

        setTimeout(() => {
            const aloptions = {
                "id" : rngAlertId(),
                "ownerid" : owcr,
                "fn" : "project-groupid-update",
                "dataview" : JSON.stringify(optionsview),
                "dataapprove" : JSON.stringify(optionsapprove),
                "datareject" : JSON.stringify(optionsreject),
                "title" : "Project Groups",
                "message" : `Your Project <b>${probj.projectname}</b> has been invited to join the group <b>${grobj.name}</b>`,
            }
            console.log(aloptions);
            ACCUSER.Alert.create(aloptions, ()=>{});
        }, 0);

        $('.group-manage-add-project').css('display', 'none').hide();
        $(`.group-manage-list-widget_${groupid}`).click();
    }
    ACCUSER.getProject(projectid).updateProjectGroupId(options, callback);
});

$(document).on('click', '.group-manage-view-projects-widget-h', function(){
    const projectid = $(this).parent('.action').attr('prid');
    const groupid = $(this).parent('.action').attr('grid');
    const owner = $(this).parent('.action').attr('owner');

    const options = {
        "projectid" : projectid,
        "groupid" : $(this).hasClass('approve') ? `member_${groupid}` : "na"
    }

    const callback =()=>{
        fillGroupProjectList(groupid, owner);
    }
    ACCUSER.getProject(projectid).updateProjectGroupId(options, callback);
});
