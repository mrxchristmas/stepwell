let conList = [
    $('.nav-maincontainer'),
];








$(document).ready(function(){
    
    // minimizeNav();
    const cb1 = data => {
        // console.log(data.ID);
        // all these variables are from defaults.js
        // variables are getting the data from the api call api_checkIfLoggedIn() which is from api_login.js
        // this function runs on success api call.
        __ID = data.ID;
        __USER_LEVEL =data.USER_LEVEL;
        __PASSWORD = data.PASSWORD;
        __PHOTO = data.PHOTO;
        __FIRST_NAME = data.FIRST_NAME;
        __COMPANY_ID = data.COMPANY_ID;
        __COMPANY_NAME = data.COMPANY_NAME;
        __COMPANY_LOGO = data.COMPANY_LOGO;
    };
    const cb2 = () => {
        hideAllNav(conList);
        fillProfile(__PHOTO, __FIRST_NAME);
        fillCompany(__COMPANY_LOGO, __COMPANY_NAME);
        getAccountModules(__USER_LEVEL, __ID);
        $('#header-tab-module-name').text('Doc Builder');
        minimizeNav();
        
        $('#nav-dashboard').click();
        // const cb = () => {
        //     // console.log('test');
        // };
    };
    api_checkIfLoggedIn(cb1, cb2);


    
});