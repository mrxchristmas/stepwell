const fetchDocumentConnectioninterval = 10000;

let fetchDocumentConnectionTimer = setInterval(function(){
    // console.log('fetchDocumentConnectionTimer test');
    // api_fetchDocumentConnectRead(__ID, __COMPANY_ID, 'docbuilder_timer');
    
},fetchDocumentConnectioninterval);

showAlert('Test Title', 'Test Message', 'View in Docuflow', '#nav-dashboard');

$(document).on('click', '.alert-con-widget', function(){
    console.log('test');
});