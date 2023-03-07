function licenseToData(licenseid){
    let duration = '';
    let modulename = '';

    if(licenseid.includes('1M')){
        duration = '1 Month';
    }else if(licenseid.includes('6M')){
        duration = '6 Month';
    }else if(licenseid.includes('1Y')){
        duration = '1 Year';
    }else if(licenseid.includes('2Y')){
        duration = '2 Years';
    }

    if(licenseid.includes('proflow')){
        modulename = 'Pro Flow';
    }else if(licenseid.includes('docbuilder')){
        modulename = 'Doc Builder';
    }else if(licenseid.includes('docflow')){
        modulename = 'Doc Flow';
    }else if(licenseid.includes('skidbuilder')){
        modulename = 'Skid Builder';
    }else if(licenseid.includes('processbuilder')){
        modulename = 'Process Builder';
    }

    return {
        "duration" : duration,
        "modulename" : modulename
    }

}
function archiveLicense(licenseid){
    showAction('You are about to Archive this License. Proceed?',);
}

function fillLicenseList(){
    const distcomlic = ADMIN.License.getLicenseDistinctCompany();
    $('.license-create-list-widget-con').empty();
    $.each(distcomlic, function(key, value){
        const liccomobj = ADMIN.License.getLicenseByCompanyId(value);
        let companyName = '';
        console.log(value);
        if(value == "na"){
            companyName = "Unassigned License"; 
        }else{
            const comobj = ADMIN.getCompanyObj(value);
            companyName = comobj.name;
        }
        let mainhtml = '';
        let popuphtml = '';
        $.each(liccomobj, function(key, value1){
            console.log(value1);
            const licdata = licenseToData(value1.licenseid);
            mainhtml += `<span class="modulename">${licdata.duration} &bull; ${licdata.modulename}</span>`;

            popuphtml += `<div id="${value}" class="license-create-list-widget-current-key">
                <div class="details">
                    <span class="">${value1.id} &bull; ${value1.licenseid.split('_').pop()} &bull; ${value1.licenseid.split('_')[0]}</span>
                    <span class="">${value1.startdate} &bull; ${value1.enddate}</span>
                </div>`
                    
            if(value1.status.includes('active')){
                popuphtml += `<div class="action">
                        <i onclick="Clipboard_Copy('${value1.id}');" class="fas fa-clipboard"></i>
                        <i id="${value1.id}" class="fas fa-trash"></i>
                    </div>
                </div>`;
            }else{
                popuphtml += `<div class="action">
                        <i onclick="Clipboard_Copy('${value1.id}');" class="fas fa-clipboard"></i>
                    </div>
                </div>`;
            }
        });

        let html = `
            <div class="license-create-list-widget">
                <i status="closed" class="license-create-list-widget-toggle fas fa-eye"></i>
                <span class="companyname">${companyName}</span>
                ${mainhtml}
                <div id="${value}" class="license-create-list-widget-current hidden">
                    ${popuphtml}
                </div>
            </div>
        `;

        $('.license-create-list-widget-con').append(html);

    });

}
$('#navcon-license').click(function(){
    console.log('Hello');
    const cb =data=>{
        console.log(data);
        $.ajax({
            async: false,
            url: domain + 'model/modules.json',
            contentType: "application/json",
            type: 'get',
            dataType: 'json',
            beforeSend: function(){
                showLoadingReport('Fetching License.. Please Wait');
            },
            success: function(data){
                // cbsuccess(data);
                // console.log('awesome', data);
                $('.license-create-module-list').empty();
                $.each(data, function(key, value){
                    $('.license-create-module-list').append(`<span mui="${value.ui}" class="license-create-module-list-widget" mui="proflow" >${value.name}</span>`);
                });
            },
            complete: function(){
                hideLoadingReport();
                fillLicenseList();
                $('.license-create-form').hide();
                // cbcomplete();
            }
        });
    };
    ADMIN.License.checkList('list', cb);
    

   

   

});

$(document).on('click', '.license-create-module-list-widget', function(){
    const mui = $(this).attr('mui');
    $('.license-create-form').empty();
    $('.license-create-form').append(`
        <span class="title">LICENSE CREATION TAB</span>
        <span mui="${mui}" class="modulename">${$(this).text()}</span>
        <span class="durationtext">Duration</span>
        <div class="duration">
            <span mid="3M" class="license-create-form-duration">3 Month</span>
            <span mid="1Y" class="license-create-form-duration">1 Year</span>
            <span mid="3Y" class="license-create-form-duration">3 Years</span>
        </div>
        <div class="bottom">
        </div>
    `);
    $('.license-create-form').css('display', 'flex').show();
});
$(document).on('click', '.license-create-form-duration', function(){
    const mid = $(this).attr('mid');
    const mui = $('.license-create-form').children('.modulename').attr('mui');

    console.log(mui+mid);
    const licobj = ADMIN.License.getStaticLicenseObjById(mui+mid);
    console.log('locobj', licobj);
    $('.license-create-form').children('.bottom').empty();
    const pricetag = parseFloat(licobj.price).toFixed(2);
    let price = '';
    let subprice = '';
    let contenthtml = '';
    if(pricetag > 0){
        const prminus = parseFloat(pricetag) - 0.01;
        price = `$${prminus.toString().split('.')[0]}`
        subprice = `.${prminus.toString().split('.').pop()}`;
    }else{
        price = "FREE"
    } 
    $.each(licobj.content, function(key, value){
        contenthtml += `<li >${value}</li>`;
    });
    $('.license-create-form').children('.bottom').append(`
        <br><br>
        <span class="license-title">${licobj.title}</span>
        <br>
        <ul>
        ${contenthtml}
        </ul>
        <br><br>
        <span class="price">${price}<span class="subprice">${subprice}</span> </span>
        <br><br>
        <button lid="${mui}_${mid}" mid="${mid}" class="submit license-create-form-submit">Create License</button>
    `);

    $('.license-create-form-duration').removeClass('active');
    $(this).addClass('active');


});
$(document).on('click', '.license-create-form-submit', function(){
    const licenseid = $(this).attr('lid');
    const mid = $(this).attr('mid');
    const today = new Date();

    const sd =  dateFns.format(
        today,
        'YYYY-MM-DD'
    );
    let ned;
    if(mid == "1M"){
        ned = new Date(today.setMonth(today.getMonth()+1));
    }else if(mid == "6M"){
        ned = new Date(today.setMonth(today.getMonth()+6));
    }else if(mid == "1Y"){
        ned = new Date(today.setFullYear(today.getFullYear()+1));
    }else if(mid == "2Y"){
        ned = new Date(today.setFullYear(today.getFullYear()+2));
    }
    const ed = dateFns.format(
        ned,
        'YYYY-MM-DD'
    );


    const options = {
        'id' : rngLicenseId(),
        'licenseid' : licenseid,
        'companyid' : "na",
        'startdate' : sd,
        'enddate' : ed,
        'status' : 'active',
    }
    console.log(options);
    const cb =()=>{
        showNotification("License Management", "You Created a new License.");
        fillLicenseList();
    };
    ADMIN.License.create(options, cb);
});

$(document).on('click', '.license-create-list-widget-toggle', function(){
    const status = $(this).attr('status');
    if(status == "closed"){
        $(this).siblings('.license-create-list-widget-current').css('display', 'flex').show();
        $(this).attr('status', 'open');
        $(this).removeClass('fa-eye').addClass('fa-eye-slash');
    }else{
        $(this).siblings('.license-create-list-widget-current').hide();
        $(this).attr('status', 'closed');
        $(this).removeClass('fa-eye-slash').addClass('fa-eye');
    }
});

$(document).on('click', '.license-create-list-widget-current-key > .action >.fa-trash', function(){
    const companyid = $(this).parent(".action").parent(".license-create-list-widget-current-key").attr("id");
    const id = $(this).attr("id");
    console.log('delete license');
    console.log(companyid);
    console.log(id);

    const callback =()=>{
        console.log('do something');
        $(this).remove();
    }
    ADMIN.License.deleteLicenseID(id, callback);

})
    