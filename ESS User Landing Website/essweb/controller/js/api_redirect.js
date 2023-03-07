// let apiUrl = 'controller/api/api_redirect.php';
// let redirectUrl = 'controller/api/redirect.php';


// // function api_redirect(cbsuccess=()=>{}, cbcomplete=()=>{}){
// function api_redirect(){
//     const params = getUrlParams(location.search);
//     // console.log(params);

//     if(params.link != undefined){
//         // console.log(params.link);
//         showPages(params.link);
//     }


// }


// function getUrlParams(urlOrQueryString) {
//     if ((i = urlOrQueryString.indexOf('?')) >= 0) {
//         const queryString = urlOrQueryString.substring(i+1);
//         if (queryString) {
//         return _mapUrlParams(queryString);
//         } 
//     }

//     return {};
// }
// function _mapUrlParams(queryString) {
//     return queryString    
//     .split('&') 
//     .map(function(keyValueString) { return keyValueString.split('=') })
//     .reduce(function(urlParams, [key, value]) {
//     if (Number.isInteger(parseInt(value)) && parseInt(value) == value) {
//         urlParams[key] = parseInt(value);
//     } else {
//         urlParams[key] = decodeURI(value);
//     }
//     return urlParams;
//     }, {});
// }


// function rdfn_test(cbsuccess=()=>{}, cbcomplete=()=>{}){
//     let url = domain + 'index.php';
//     console.log('calling rdfn_test', url);
//     $.ajax({
//         async: true,
//         url: url,
//         contentType: "application/json",
//         type: 'get',
//         data: {
//             'function': 'test',
//         },
//         dataType: 'json',
//         beforeSend: function(){
//             showLoadingReport('Performing Pre Login.. Please Wait');
//         },
//         success: function(data){
//             cbsuccess(data);
//             console.log(data);
//         },
//         complete: function(){
//             hideLoadingReport();
//             cbcomplete();
//         }
//     });
// }