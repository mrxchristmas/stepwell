class User{
    constructor(options){
        this.firstname = options == undefined ? "Guest" : options.FIRSTNAME;
        this.lastname = options == undefined ? "na" : options.LASTNAME;
        this.confirmed = options == undefined ? "na" : options.CONFIRMED;
        this.email = options == undefined ? "na" : options.EMAIL;
        this.phone = options == undefined ? "na" : options.PHONE;
        this.companyname = options == undefined ? "na" : options.COMPANY_NAME;

        this.Cart = undefined;
        this.Billing = undefined;
        this.Message = undefined;
        this.License = new License();

        this.initialize(options.callback);
        
    }

    initialize(callback){
        const dis = this;
        dis.fetchBilling()
        .then(data=>{
            dis.Billing = data;
            dis.fetchMessage()
            .then(data=>{
                dis.Message = data;
                dis.fetchLicense()
                .then(data=>{
                    dis.License.list = data;
                    callback();

                })
                .catch(err=>{
                    console.log(err);
                    dis.Message = undefined;
                });
            })
            .catch(err=>{
                console.log(err);
                dis.Message = undefined;
            });
        })
        .catch(err=>{
            console.log(err);
            dis.Billing = undefined;
        });
    }


    fillBilling(data){
        $('.userprofile-receipt-con').empty();
    
        function getDistinctBillId(obj){
            let list = [];
            $.each(obj, function(key, value){
                if(value.response != "error"){
                    if(list.length == 0){
                        list[0] = value.billid;
                    }
                    let gate = true;
                    $.each(list, function(key, val){
                        // console.log(val.partid, value.partid, val.partid == value.partid);
                        if(val == value.billid){
                            gate = false;
                        }
                    });
                    if(gate){
                        list[list.length] = value.billid;
                    }
                }
            });
            // list.sort((a, b) => (parseFloat(a.year) > parseFloat(b.year)) ? 1 : -1);
            return list;
        }
        function getBillByBillId(obj, billid){
            let list = [];
            $.each(obj, function(key, value){
                if(value.billid == billid){
                    list.push(value);
                }
            });
            return list;
        }
    
        if(data == null | data == undefined || data.length < 0 || data.response == "error"){
            const html = `
                    <div class="billing-widget">
                        <div class="title billing-widget-title-h">
                            <span class="billid">Empty</span>
                        </div>
                    </div>
                `;
        
                $('.userprofile-receipt-con').append(html);
        }else{
            const distBill =  getDistinctBillId(data);
            // console.log(distBill);
        
            $.each(distBill, function(key, value){
                const billList = getBillByBillId(data, value);
                // console.log(billList);
                let titleHtml = '';
                let billDate = '';
                let itemListHtml = '';
                let subt = 0;
                $.each(billList, function(key, val){
                    const licobj = Plans.licenseToData(val.licenseid);
                    titleHtml += `
                        <div class="title billing-widget-title-h ${val.status}">
                            <span>${licobj.modulename}</span>
                            <span>${
                                dateFns.distanceInWordsToNow(
                                    new Date(val.expirydate),
                                    { addSuffix: true }
                                )
                            }</span>
                            <i class="fas fa-circle"></i>
                        </div>
                    `;
                    billDate = val.billdate;
                    itemListHtml += `
                        <div class="detailspeck">
                            <span>${val.licenseid}</span>
                            <span>${parseFloat(val.subtotal) == 0 ? "FREE" : ("$" + parseFloat(val.subtotal).toFixed(2)) }</span>
                        </div>
                    `
                    subt += parseFloat(val.subtotal);
        
                });
                let hst = subt * 0.13;
                let total = subt + hst;
        
                const html = `
                    <div class="billing-widget">
                        <div class="title billing-widget-title-h">
                            <span class="billid">${value}</span>
                        </div>
                        ${titleHtml}
                        <div class="details hidden">
                            
                            <div class="detailspeck">
                                <span>Billing Date:</span>
                                <span>${billDate}</span>
                            </div>
                            <hr>
                            ${itemListHtml}
                            <div class="detailspeck">
                                <span>Subtotal:</span>
                                <span>$${subt.toFixed(2)}</span>
                            </div>
                            <div class="detailspeck">
                                <span>GST/HST:</span>
                                <span>$${hst.toFixed(2)}</span>
                            </div>
                            <div class="detailspeck">
                                <span>Total:</span>
                                <span>$${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                `;
        
                $('.userprofile-receipt-con').append(html);
            });
        }
    
        
            
    }
    fetchBilling(reset=false){
        return new Promise((res, rej)=>{
            const dis = this;
            if(dis.Billing == null || dis.Billing == undefined || dis.Billing.response == 'error' || reset){
                console.log('Fetching Billing from Database.');
                const cbs =data=>{
                    // console.log(data);
                    // setCookie("userbill", JSON.stringify(data), 1);
                    if(data.response != "error"){
                        // dis.Billing = data;
                        res(data);
                    }else{
                        rej('No Billing Statements Fetched');
                    }
                };
                api_fetchBill(cbs, ()=>{});
            }
        });
    }
    addBill(obj){
        const newobj = [...this.Billing, obj];
        this.Billing = newobj;
        this.fillBilling(this.Billing);
    }


    fillCompanyLicense(){
        $('#company-actions-licenselist').empty();
        $('#company-actions-select-licenselist').empty();
        let html = '<span class="title">My License Keys</span>';
        let selectoptions = '';
        const licobj = ACCUSER.License.list;
        $.each(licobj, function(key, value){
            html += `
                <div class="license">
                    <span class="key">${value.id} &bull; ${value.licenseid}</span>
                    <span class="company">${value.companyid == "na" ? "Unassigned" : value.companyid} &bull; ${value.status}</span>
                </div>
            `;
            if(value.companyid == "na"){
                selectoptions += `<option value="${value.id}">${value.id} &bull; ${value.licenseid}</option>`;
            }
        });
        console.log(html);
        $('#company-actions-licenselist').append(html);
        $('#company-actions-select-licenselist').append(selectoptions);
    }
    fetchLicense(reset=false){
        return new Promise((res, rej)=>{
            const dis = this;
            if(dis.License.list == null || dis.License.list == undefined || dis.License.list.response == 'error' || reset){
                console.log('Fetching License from Database.');
                api_fetchLicense()
                .then(data=>{
                    if(data.response != "error"){
                        res(data);
                    }else{
                        rej('No License Fetched');
                    }
                })
                .catch(err=>{
                    console.log(err);
                    showToast("There was an error Fetching License.");
                });
            }
        });
    }
    addLicense(obj){
        const newobj = [...this.License.list, obj];
        this.License.list = newobj;
        this.fillLicense(this.License.list);
    }
    getLicenseObj(licid){
        let ret;
        $.each(this.License.list, function(key, value){
            if(value.id == licid){
                ret = value;
            }
        });
        return  ret;
    }
    

    fillMessage(data){
    
        $.each(data, function(key, value){
            // console.log(value);
            const dt = dateFns.distanceInWords(
                new Date(),
                new Date(value.stamp),
                { addSuffix: true }
            );
            $('#userprofile-envelope-chatbox').append(`
                <div class="widget ${value.sender}">
                    <i class="fas ${value.sender == "user" ? "fa-user" : "fa-user-astronaut"}"></i>
                    <span>${value.message}</span>
                    <span class="timestamp">${dt}</span>
                </div>
            `);
        });
        scrollToBottom("userprofile-envelope-chatbox");
    }
    fetchMessage(reset=false){
        const dis = this;
        return new Promise((res, rej)=>{
            if(dis.Message == null || dis.Message == undefined || dis.Message.response == 'error' || reset){
                console.log('Fetching Message from Database.');
                const cbs =data=>{
                    // console.log(data);
                    if(data.response != "error"){
                        // dis.Message = data;
                        res(data);
                    }else{
                        rej("No Message Fetched");
                    }
                };
                api_fetchMessage(cbs, ()=>{});
            }
        });
    }
    addMessage(obj){
        const newobj = [...this.Message, obj];
        this.Message = newobj;
        this.fillMessage(this.Message);
    }
    

    fillCart(){
        // eraseCookie("usercart");
        $('#cart-container-widget-con').empty();
        const usercartcookie = getCookie("usercart");
        const usercartdata = JSON.parse(usercartcookie);
        if(usercartdata != null && usercartdata != undefined && usercartdata.length > 0){
            let subt = 0;
            $.each(usercartdata, function(key, value){
                subt += parseFloat(value.subtotal);
                $('#cart-container-widget-con').append(`
                    <div class="widget">
                        <div class="title">
                            <span>${value.modulename}</span>
                            <span>${value.duration}</span>
                        </div>
                        <div class="details">
                            <div class="detailspeck">
                                <span>License Expiry</span>
                                <span>${value.expiry}</span>
                            </div>
                            <div class="detailspeck">
                                <span>Subtotal</span>
                                <span>$${value.subtotal}</span>
                            </div>
                        </div>
                        <button lid="${value.id}" class="default-button-mini cart-widget-remove">Remove <i class="fas fa-trash"></i></button>
                    </div>
                `);
            });
            const hst = subt * 0.13;
            const total = subt + hst;
            const totalsHtml = `
                <div class="widget totals">
                    <div class="details">
                        <div class="detailspeck">
                            <span>Subtotal</span>
                            <span>$${subt.toFixed(2)}</span>
                        </div>
                        <div class="detailspeck">
                            <span>HST/HST</span>
                            <span>$${hst.toFixed(2)}</span>
                        </div>
                        <div class="detailspeck">
                            <span>Total</span>
                            <span>$${total.toFixed(2)}</span>
                        </div>
                    </div>
                    <button id="cart-container-widget-checkout" class="default-button-mini">Checkout</button>
                </div>
            `
            $('#cart-container-widget-con').append(totalsHtml);
            $('#usercart-counter').text(usercartdata.length);
        }else{
            $('#cart-container-widget-con').append(`
                <div class="widget">
                    <div class="title">
                        <span>Cart</span>
                        <span>Empty</span>
                    </div>
                </div>
            `);
            $('#usercart-counter').text("0");
        }
        
    }
    fillProfile(){
        console.log(this.email);
        if(this.email != "na" && this.email != undefined){
            $('#userprofile-user-con-firstname').val(this.firstname);
            $('#userprofile-user-con-lastname').val(this.lastname);
            $('#userprofile-user-con-email').val(this.email);
            $('#userprofile-user-con-phone').val(this.phone);
            $('#userprofile-user-con-companyname').val(this.companyname);

            $('#profile-container-login').hide();
            $('#profile-container-userprofile').css('display', 'flex').show();
        }else{
            $('#userprofile-user-con-firstname').val("");
            $('#userprofile-user-con-lastname').val("");
            $('#userprofile-user-con-email').val("");
            $('#userprofile-user-con-companyname').val("");

            $('#profile-container-login').css('display', 'flex').show();
            $('#profile-container-userprofile').hide();
        }

    }
    fillLicense(){
        const obj = this.License.fetchStaticLicense();
        // console.log(obj);
        $('#plans-content-widget-con').empty();
        $.each(obj, function(key, value){
            const licdata = Plans.licenseToData(value.id);
            let conhtml = ``;
            $.each(value.content, function(key, val){
                conhtml += `
                <div class="specs">
                    <i class="fas fa-check"></i>
                    <span>${val}</span>
                </div>
                `;
            });
            let html = `
            <div class="plans-content-widget">
                <div class="top awesomebg">
                    <span class="title">${licdata.modulename}</span>
                    <span class="duration">${licdata.duration}</span>
                </div>
                <span class="price">${value.price == 0 ? "FREE" : "$" + value.price}<span class="currency"> ${value.price == 0 ? "Trial" : "CAD"}</span> </span>
                ${conhtml}
                <div class="footer">
                    <button lid="${value.id}" class="default-button plans-content-widget-submit"><i class="fas fa-shopping-bag"></i>BUY NOW</button>
                    <span class="bottom">Instant Activation<br>One Time Payment</span>
                </div>
            </div>
            `
    
            $('#plans-content-widget-con').append(html);
        });
    }


    fill(){
        this.fillBilling(this.Billing);
        this.fillBilling(this.Billing);
        this.fillMessage(this.Message);
        this.fillCart();
        this.fillProfile();
        this.fillLicense();
        this.fillCompanyLicense();
    }

    






}