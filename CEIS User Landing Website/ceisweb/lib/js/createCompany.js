


















$(document).ready(function(){

    const cbsuccess =data=>{
        console.log(data);
    };
    const cbcomplete =()=>{
        
    };
    const options = {
        'companyid' : rngCompanyId(),
        'databaseid' : rngDatabaseId(),
        'owner' : $('#confirm-true-email').text()
    };
    api_createCompany(options, cbsuccess, cbcomplete);
});