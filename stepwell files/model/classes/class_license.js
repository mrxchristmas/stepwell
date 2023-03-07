class License{
    constructor(){
        this.list = undefined;
        this.StaticLicense = this.fetchStaticLicense();
    }

    fetchStaticLicense(){
        return [
            {
                "id" : "proflow3M",
                "modulename" : "Pro Flow",
                "moduleui" : "proflow",
                "duration" : "3M",
                "title" : "Free Trial Subscription",
                "content" : [
                    "1 Free Admin Account",
                    "3 Free User Account",
                    "10 Projects",
                    "100Mb Storage",
                    "No Backup",
                    "Limited Basic Support"
                ],
                "price" : 0
            },{
                "id" : "proflow1Y",
                "modulename" : "Pro Flow",
                "moduleui" : "proflow",
                "duration" : "1Y",
                "title" : "Doc Flow Gold Subscription",
                "content" : [
                    "1 Free Admin Account",
                    "Pay as you go User Accounts",
                    "Unlimited Projects",
                    "1Gb Storage",
                    "Free Monthly Backup",
                    "Premium Support"
                ],
                "price" : 120
            },{
                "id" : "proflow3Y",
                "modulename" : "Pro Flow",
                "moduleui" : "proflow",
                "duration" : "3Y",
                "title" : "Platinum Subscription",
                "content" : [
                    "1 Free Admin Accounts",
                    "Pay as you go User Accounts",
                    "Unlimited Projects",
                    "1Gb Storage",
                    "Free Weekly Backup",
                    "24 hour Premium Support"
                ],
                "price" : 255
            },{
                "id" : "docflow3M",
                "modulename" : "Doc Flow",
                "moduleui" : "docflow",
                "duration" : "3M",
                "title" : "Free Trial Subscription",
                "content" : [
                    "1 Free Admin Account",
                    "3 Free User Account",
                    "10 Projects",
                    "100Mb Storage",
                    "No Backup",
                    "Limited Basic Support"
                ],
                "price" : 0
            },{
                "id" : "docflow1Y",
                "modulename" : "Doc Flow",
                "moduleui" : "docflow",
                "duration" : "1Y",
                "title" : "Doc Flow Gold Subscription",
                "content" : [
                    "1 Free Admin Account",
                    "Pay as you go User Accounts",
                    "Unlimited Projects",
                    "1Gb Storage",
                    "Free Monthly Backup",
                    "Premium Support"
                ],
                "price" : 120
            },{
                "id" : "docflow3Y",
                "modulename" : "Doc Flow",
                "moduleui" : "docflow",
                "duration" : "3Y",
                "title" : "Doc Flow Gold Subscription",
                "content" : [
                    "1 Free Admin Accounts",
                    "Pay as you go User Accounts",
                    "Unlimited Projects",
                    "1Gb Storage",
                    "Free Weekly Backup",
                    "24 hour Premium Support"
                ],
                "price" : 255
            },{
                "id" : "skidbuilder3M",
                "modulename" : "Skid Builder",
                "moduleui" : "skidbuilder",
                "duration" : "1M",
                "title" : "Skid Builder Free Trial Subscription",
                "content" : [
                    "1 Free Admin Account",
                    "2 Projects",
                    "200Mb Storage",
                    "Limited Basic Support"
                ],
                "price" : 0
            },{
                "id" : "skidbuilder1Y",
                "modulename" : "Skid Builder",
                "moduleui" : "skidbuilder",
                "duration" : "6M",
                "title" : "Skid Builder Basic Subscription",
                "content" : [
                    "1 Free Admin Account",
                    "Unlimited Projects",
                    "1Gb Storage",
                    "Free Monthly Backup",
                    "Premium Support"
                ],
                "price" : 200
            },{
                "id" : "skidbuilder3Y",
                "modulename" : "Skid Builder",
                "moduleui" : "skidbuilder",
                "duration" : "1Y",
                "title" : "Skid Builder Premium Subscription",
                "content" : [
                    "1 Free Admin Accounts",
                    "Unlimited Projects",
                    "2Gb Storage",
                    "Free Weekly Backup",
                    "24 hour Premium Support"
                ],
                "price" : 300
            },{
                "id" : "processbuilder3M",
                "modulename" : "Process Builder",
                "moduleui" : "processbuilder",
                "duration" : "1M",
                "title" : "Process Builder Free Trial Subscription",
                "content" : [
                    "1 Free Admin Account",
                    "2 Projects",
                    "200Mb Storage",
                    "Limited Basic Support"
                ],
                "price" : 0
            },{
                "id" : "processbuilder1Y",
                "modulename" : "Process Builder",
                "moduleui" : "processbuilder",
                "duration" : "1Y",
                "title" : "Process Builder Premium Subscription",
                "content" : [
                    "1 Free Admin Account",
                    "Unlimited Projects",
                    "1Gb Storage",
                    "Free Monthly Backup",
                    "Premium Support"
                ],
                "price" : 300
            },{
                "id" : "processbuilder3Y",
                "modulename" : "Process Builder",
                "moduleui" : "processbuilder",
                "duration" : "2Y",
                "title" : "Process Builder Gold Subscription",
                "content" : [
                    "1 Free Admin Accounts",
                    "Unlimited Projects",
                    "2Gb Storage",
                    "Free Weekly Backup",
                    "24 hour Premium Support"
                ],
                "price" : 500
            }
        ]
    }
    getStaticLicenseObjById(id){
        return this.StaticLicense.find(obj => obj.id == id);
    }
    getLicense(){
        return this.list;
    }
    getLicenseDistinctCompany(){
        let ret = [];
        $.each(this.list, function(key, value){
           if(ret.length == 0){
                ret.push(value.companyid);
           }else{
               let gate = true;
               $.each(ret, function(key, value1){
                   if(value1 == value.companyid){
                        gate = false;
                   }
               });
               if(gate){
                ret.push(value.companyid);
               }
           }
        });
        return ret;
    }
    getLicenseByCompanyId(companyid){
        let list = [];
        $.each(this.list, function(key, value){
            if(value.companyid == companyid){
                list.push(value);
            }
        });
        return list;
    }

    fetchLicense(){
        let list = [];
        const cbsuccess =data=>{
            console.log(data);
            if(data.response != "error"){
                $.each(data, function(key, value){
                    const obj ={
                        'id' : value.id,
                        'licenseid' : value.licenseid,
                        'companyid' : value.companyid,
                        'startdate' : value.startdate,
                        'enddate' : value.enddate,
                        'status' : value.status,
                    }
                    list.push(obj);
                });
            }
        }
        capi_fetchLicense(cbsuccess);
        return list;
    }
    getLicenseById(id){
        return this.list.find(obj => obj.id == id);
    }
    getLicenseByLicenseId(licenseid){
        let ret = true;
        $.each(this.list, function(key, value){
            if(value.licenseid == licenseid && value.companyid == "na"){
                ret = false;
            }
        });
        return ret;
    }

    create(options, callback){
        const cbsuccess=data=>{
            console.log(data);
            const obj ={
                'id' : options.id,
                'licenseid' : options.licenseid,
                'companyid' : options.companyid,
                'startdate' : options.startdate,
                'enddate' : options.enddate,
                'status' : options.status,
            }
            this.list.push(obj);
        };
        capi_createLicense(options, cbsuccess, callback);
    }
    updateCompanyId(options, callback){
        // console.log(options);
        const cbsuccess=data=>{
            console.log(data);
            const nobj = this.list.find(obj => obj.id == options.id);
            nobj.companyid = options.companyid;
        };
        capi_updateLicenseCompanyId(options, cbsuccess, callback);
    }

    deleteLicenseID(id, callback){
        const obj = this.list.find(obj => obj.id == id);
        console.log(obj);
        obj.status = 'archive';

        const cbcomplete =()=>{
            callback();
        }
        capi_deleteLicense(id, cbcomplete);
    }

    isLicenseAvailable(key){
        let gate = true;
        const licobj = this.list.find(obj => obj.id == key);
        if(licobj.companyid != "na" ){
            gate = false;
        }
        return gate;
    }

    licenseToData(licenseid){
        let duration = '';
        let modulename = '';
    
        if(licenseid.includes('3M')){
            duration = '3 Months';
        }else if(licenseid.includes('6M')){
            duration = '6 Months';
        }else if(licenseid.includes('1Y')){
            duration = '1 Year';
        }else if(licenseid.includes('2Y')){
            duration = '2 Years';
        }else if(licenseid.includes('3Y')){
            duration = '3 Years';
        }else if(licenseid.includes('4Y')){
            duration = '4 Years';
        }else if(licenseid.includes('5Y')){
            duration = '5 Years';
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

    getPriceByLicenseId(licenseid){
        const licobj = this.fetchStaticLicense();
        let nobj = licobj.find(obj => obj.id == licenseid);
        return nobj.price;
    }
    licenseToCheckoutData(licenseid){
        let duration = '';
        let modulename = '';
        let expiry = '';
        let today = new Date();
        const price = this.getPriceByLicenseId(licenseid);
    
        if(licenseid.includes('3M')){
            duration = '3 Months';
            today.setMonth(today.getMonth() + 3);
            expiry = dateFns.format(
                today,
                "YYYY-MM-DD"
            );
        }else if(licenseid.includes('6M')){
            duration = '6 Months';
            today.setMonth(today.getMonth() + 6);
            expiry = dateFns.format(
                today,
                "YYYY-MM-DD"
            );
        }else if(licenseid.includes('1Y')){
            duration = '1 Year';
            today.setFullYear(today.getFullYear() + 1);
            expiry = dateFns.format(
                today,
                "YYYY-MM-DD"
            );
        }else if(licenseid.includes('2Y')){
            duration = '2 Years';
            today.setFullYear(today.getFullYear() + 2);
            expiry = dateFns.format(
                today,
                "YYYY-MM-DD"
            );
        }else if(licenseid.includes('3Y')){
            duration = '3 Years';
            today.setFullYear(today.getFullYear() + 3);
            expiry = dateFns.format(
                today,
                "YYYY-MM-DD"
            );
        }else if(licenseid.includes('4Y')){
            duration = '4 Years';
            today.setFullYear(today.getFullYear() + 4);
            expiry = dateFns.format(
                today,
                "YYYY-MM-DD"
            );
        }else if(licenseid.includes('5Y')){
            duration = '5 Years';
            today.setFullYear(today.getFullYear() + 5);
            expiry = dateFns.format(
                today,
                "YYYY-MM-DD"
            );
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
            "id" : licenseid,
            "duration" : duration,
            "modulename" : modulename,
            "expiry" : expiry,
            "subtotal" : price.toFixed(2)
        }
    }

    checkList(list, callback, reset=false){
        const dis = this;
        if(list == 'list'){
            if(dis.list == undefined && !reset){
                dis.list = dis.fetchLicense();
                callback("Fetching License");
            }else if(reset){
                dis.list = dis.fetchLicense();
                callback("Fetching License");
            }else{
                callback("Data Already Fetched"); 
            }
        }
    }

}
