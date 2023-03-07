let filename = '';
function contactImageUpload(){
    $(document).off('change', '#contactImageUpload'); 
    $(document).on('change','#contactImageUpload', function(){
        // console.log($(this).val().split('\\').pop());
        let fn = $(this).val().split('\\').pop();
        let extension = fn.split('.').pop();
        
        if(fn){
            console.log(fn, extension);
            $('#contact-form-image').text(fn);
            filename = fn;
        }else{
            console.log('cancelled');
        }
    });
}
function productInquire(options){
    fillContactPage();
    contactCGal.fill();
    contactCGal.start();
    console.log(options);
    const pobj = ACCUSER.getProductModelByCid(options.cid);
    $('.contact-product-spec').children('span').text(pobj.modeltext);
    $('.contact-product-spec').children('img').attr('src', pobj.image);
    $('#contact-form-product').val(options.cid);
    $('.page-content').hide();
    $('.contact-product-spec').show();
    $('#contact-form-message').css('height', '50%');
    $('#contact').show();
    $('#contact-content-form').get(0).scrollIntoView({ behavior: 'smooth' });
}
function fillContactPage(){
    if($('#contact-form-product').attr('status') != "filled" ){
        $('#contact-form-product').empty().append(`<option value="na">General Inquiry</option>`);
        // console.log("FILLING CONTACT PAGE");
        // console.log(ACCUSER.ProductModels);
        let gg = [];
        $.each(ACCUSER.ProductModels, function(key, value){
            // console.log(value);
            let addGate = true;
            if(gg.length == 0){
                gg.push(value.cid);
            }
            $.each(gg, function(key, fvalue){
                // console.log(value.cid, fvalue);
                if(value.cid == fvalue){
                    addGate = false;
                }
            });
            // console.log(gg);

            if(addGate){
                gg.push(value.cid);
                $('#contact-form-product').append(`<option value="${value.cid}">${value.modeltext}</option>`);
            }
            
        });
        $('#contact-form-product').attr('status', 'filled');
    }
}

function fetchProductModels(){
    const dfrd = $.Deferred();
    if(ACCUSER.ProductModels == undefined){
        console.log("FETCHING PRODUCT MODELS");
        let ret = [];
        const data = ACCUSER.Multipage;
        const data2 = ACCUSER.Singlepage;
        // console.log(data);
        $.each(data, function(key, value){
            function findLink(obj) {
                for ([k, v] of Object.entries(obj)){
                    if (k == "type" && v == 'specificationspage-model'){
                        ret.push(obj['data']);
                    }
                    if (typeof v == 'object' &&  v !== null ){
                        findLink(v);
                    }
                }
            }
            $.each(value, function(key, value){
                findLink(value);
            });
        });
        $.each(data2, function(key, value){
            function findLink(obj) {
                for ([k, v] of Object.entries(obj)){
                    if (k == "type" && v == 'specificationspage-model'){
                        // console.log(obj['data']);
                        ret.push(obj['data']);
                    }
                    if (typeof v == 'object' &&  v !== null ){
                        findLink(v);
                    }
                }
            }
            $.each(value, function(key, value){
                findLink(value);
                
            });
        });
        ACCUSER.ProductModels = ret;
        dfrd.resolve();
    }
    return dfrd.promise();
}

$('#contact-form-submit').click(function(){
    const obj = {
        "productid" : $('#contact-form-product').val(),
        "fname" : $('#contact-form-fname').val(),
        "lname" : $('#contact-form-lname').val(),
        "phone" : $('#contact-form-phone').val(),
        "email" : $('#contact-form-email').val(),
        "message" : $('#contact-form-message').val(),
    }
    
    
    // console.log(obj);
    let gate = true;
    if(obj.fname == ""){
        blinkbg($('#contact-form-fname'), RED_PALETTE, 'whitesmoke');
        gate = false;
    }
    if(obj.lname == ""){
        blinkbg($('#contact-form-lname'), RED_PALETTE, 'whitesmoke');
        gate = false;
    }
    if(obj.phone == "" || obj.phone.length != 10){
        blinkbg($('#contact-form-phone'), RED_PALETTE, 'whitesmoke');
        alert("Please input a valid Phone Number.");
        gate = false;
    }
    if(obj.email == ""){
        blinkbg($('#contact-form-email'), RED_PALETTE, 'whitesmoke');
        gate = false;
    }
    if(obj.message == ""){
        blinkbg($('#contact-form-message'), RED_PALETTE, 'whitesmoke');
        gate = false;
    }
    // console.log(validateEmail(obj.email));
    if(!validateEmail(obj.email)){
        blinkbg($('#contact-form-email'), RED_PALETTE, 'whitesmoke');
        $('#contact-form-email').val("");
        alert("Please input a valid Email.");
        gate = false;
    }

    if(gate){
        console.log('alright send it');
        $('#contact-form-address').val("na");
        $('#contact-form-fname').val("");
        $('#contact-form-lname').val("");
        $('#contact-form-phone').val("");
        $('#contact-form-email').val("");
        $('#contact-form-message').val("");
        console.log(obj);
        let pobj;
        if(obj.productid != "na"){
            pobj = ACCUSER.getProductModelByCid(obj.productid);
            obj.product = pobj.modeltext;
        }else{
            obj.product = "General Inquiry";
        }

        const ggdomain = `https://www.esscorp.ca/`;

        const htmlBody = `
        <div style="width: 800px;
        height: auto;
        padding: 20px;
        display: block;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <span class="subject" style="
            display: inline-block;
            font-size: 1.5em;
            font-weight: bold;
            background-color: #282828;
            color: white;
            width: 100%;
            padding: 10px 0px;
            text-align: center;
            margin-bottom: 20px;">Product Inquiry</span>
            <br>
            <br>
        
            <span class="text" style="
            display: inline-block;
            width: calc(100% - 40px);
            padding: 20px;
            letter-spacing: 2px;
            line-height: 1.3em;
            font-size: 1.2em;">
               <b>${obj.fname} ${obj.lname}</b> has requested for information with ${obj.product == "General Inquiry" ? "<b>General Inquiry</b>" : `our product <b>${pobj.modeltext}</b>`} and left a note for the request:
            </span>
            
            <span class="text" style="
            display: inline-block;
            width: calc(100% - 40px);
            padding: 20px;
            letter-spacing: 2px;
            line-height: 1.3em;
            font-size: 1.2em;
            border: thin dashed black;">
               ${obj.message}
            </span>
        
            <span class="text" style="display: inline-block;
            width: calc(100% - 40px);
            padding: 20px;
            letter-spacing: 2px;
            line-height: 1.3em;
            font-size: 1.2em;">
                Please see attached documents if the user has attached one for a more detailed information.
            </span>
        
            <span class="text" style="
            display: inline-block;
            width: calc(100% - 40px);
            padding: 20px;
            letter-spacing: 2px;
            line-height: 1.3em;
            font-size: 1.2em;">
               You may contact the user via <a href="tel:${obj.phone}" style="text-decoration: underline;
               letter-spacing: 1px;
               line-height: 1.2em;
               align-self: flex-start;
               color: black;
               margin-bottom: 5px;">phone</a> : ${obj.phone} or via <a href="mailto:${obj.email}" style="text-decoration: underline;
               letter-spacing: 1px;
               line-height: 1.2em;
               align-self: flex-start;
               color: black;
               margin-bottom: 5px;">Email</a> : ${obj.email}
            </span>
        
            <br>
            <br>
            
            <table>
                <tbody>
                    <tr>
                    <td rowspan="5"><img src="${ggdomain}lib/images/companylogo.png" alt="" style="width: 150px;
                        height: 150px;
                        object-fit: contain;">
                        </td>
                        <td><img src="${ggdomain}lib/images/mobileemail/home.png" alt="" style="display: block; height: 20px; width: 20px; object-fit: contain; "></td>
                        <td><span style="font-size: 1em;">6115 Shawson Drive; Mississauga ON L5T 1E4; Canada</span></td>
                    </tr>
                    <tr>
                    <td><img src="${ggdomain}lib/images/mobileemail/phonetoll.png" alt="" style="display: block; height: 20px; width: 20px; object-fit: contain; "></td>
                    <td><span style="font-size: 1em;">877.896.9292  Toll Free</span></td>
                    </tr>
                    <tr>
                    <td><img src="${ggdomain}lib/images/mobileemail/phoneintl.png" alt="" style="display: block; height: 20px; width: 20px; object-fit: contain; "></td>
                    <td><span style="font-size: 1em;">905.696.9292</span></td>
                    </tr>
                    <tr>
                    <td><img src="${ggdomain}lib/images/mobileemail/email.png" alt="" style="display: block; height: 20px; width: 20px; object-fit: contain; "></td>
                    <td><span style="font-size: 1em;">info@esscorp.ca</span></td>
                    </tr>
                    <tr>
                    <td><img src="${ggdomain}lib/images/mobileemail/website.png" alt="" style="display: block; height: 20px; width: 20px; object-fit: contain; "></td>
                    <td><a href="${ggdomain}">${ggdomain}</a></td>
                    </tr>
                </tbody>
            </table>
          
        
        
        </div>

        `;

        let gate = false;
        const file = document.querySelector('#contactImageUpload').files[0];
        if(file){
            gate = true;
        }
        async function convert() {
            if( document.querySelector('#contactImageUpload').files[0] ){
                const ret =  await toBase64(file);
                return ret;
            }
        }


        showToast("Sending Email");
        if(gate){
            convert().then(
                data => {
                    // console.log('AAAAAAAAAAAAA', data);
                    const options = {
                        // "toemail" : ["noelsantillan.com@gmail.com"],
                        "toemail" : ["info@esscorp.ca"],
                        "from" : "noreply@websitecontact@esscorp.ca",
                        "subject" : "Product Information Request",
                        "body" : htmlBody,
                        "attachments" : [
                            {
                                name : filename,
                                data : data
                            }
                        ]
                    }
                    const confirmoptions = {
                        "toemail" : [obj.email],
                        "fname" : obj.fname,
                        "lname" : obj.lname
                    }
                
                    
                    setTimeout(() => {
                        console.log(options);
                        const callback =()=>{
                            const callback =()=>{
                                // alert('Email has been sent! we will send you a confirmation email that we have accepted your application.');
                                flashToast("Email has been sent! we will send you a confirmation email that we have accepted your application.");
                            }
                            sendConfirmationEmail(confirmoptions, callback);
                        }
                        sendEmail(options, callback);
                    }, 100);
                }
            );
        }else{
            const options = {
                // "toemail" : ["noelsantillan.com@gmail.com"],
                "toemail" : ["info@esscorp.ca"],
                "from" : "websitecontact@esscorp.ca",
                "subject" : "Product Information Request",
                "body" : htmlBody,
                "attachments" : null
            }
            const confirmoptions = {
                "toemail" : [obj.email],
                "fname" : obj.fname,
                "lname" : obj.lname
            }
            setTimeout(() => {
                // console.log(options);
                const callback =()=>{
                    const callback =()=>{
                        // alert('Email has been sent! we will send you a confirmation email that we have accepted your application.');
                        flashToast("Email has been sent! we will send you a confirmation email that we have accepted your application.");
                    }
                    sendConfirmationEmail(confirmoptions, callback);
                }
                sendEmail(options, callback);
            }, 100);
        }
    }
    
});


$('#contact-form-product').change(function(){
    const v = $(this).val();
    const pobj = ACCUSER.getProductModelByCid(v);
    if(v == "na"){
        $('.contact-product-spec').hide();
        $('#contact-form-message').css('height', '100%');
    }else{
        $('.contact-product-spec').children('span').text(pobj.modeltext);
        $('.contact-product-spec').children('img').attr("src",pobj.image);
        $('.contact-product-spec').show();
        $('#contact-form-message').css('height', '50%');
    }
    
});


function validate(evt) {
    var theEvent = evt || window.event;
    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
    // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
}


