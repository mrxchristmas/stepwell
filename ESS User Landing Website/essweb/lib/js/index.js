let gallerynow = 0;
let galleryInterval;
let contactGalleryInterval;
let homeGalleryInterval;

const gallist = [
    {
        "image" : "lib/images/minigallery/minigal1.jpg",
        "text" : ""
    },{
        "image" : "lib/images/minigallery/minigal2.jpg",
        "text" : ""
    },{
        "image" : "lib/images/minigallery/minigal3.jpg",
        "text" : ""
    },{
        "image" : "lib/images/minigallery/minigal4.jpg",
        "text" : ""
    },{
        "image" : "lib/images/minigallery/minigal5.jpg",
        "text" : ""
    },{
        "image" : "lib/images/minigallery/minigal6.jpg",
        "text" : ""
    },{
        "image" : "lib/images/minigallery/minigal7.jpg",
        "text" : ""
    },{
        "image" : "lib/images/minigallery/minigal8.jpg",
        "text" : ""
    },{
        "image" : "lib/images/minigallery/minigal9.jpg",
        "text" : ""
    },{
        "image" : "lib/images/minigallery/minigal10.jpg",
        "text" : ""
    },{
        "image" : "lib/images/minigallery/minigal11.jpg",
        "text" : ""
    },{
        "image" : "lib/images/minigallery/minigal12.jpg",
        "text" : ""
    },{
        "image" : "lib/images/minigallery/minigal13.jpg",
        "text" : ""
    }
]

function googleTranslateElementInit() {  
    new google.translate.TranslateElement( 
        {pageLanguage: 'en'},  
        'google_translate_element' 
    );  
}  

function googleTranslateElementInit() {
    // set div <div id="google_translate_element"></div>  
    new google.translate.TranslateElement({
        pageLanguage: 'en', 
        includedLanguages: 'ar,en,es,jv,ko,pa,pt,ru,zh-CN', 
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE, 
        autoDisplay: false}, 
        'google_translate_element'
    );
}

function addMap(options){
    // set div like so : <div id="mapid"></div>
    // then add the id of the div to the options.
    
    let mymap = L.map(options.id).setView([options.long, options.lat], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: options.text,
        maxZoom: 20,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibXJ4Y2hyaXN0bWFzIiwiYSI6ImNra2NxaWtzZzBrYzYydnBidjY3OTBudTcifQ.6C-gHfqMfXJ6JVTybr87BQ'
    }).addTo(mymap);
    
    if(options.marker != undefined){
        L.marker([options.long,options.lat]).addTo(mymap)
        .bindPopup(options.marker)
        .openPopup();
    }else{
        L.marker([options.long,options.lat]).addTo(mymap)
        .openPopup();
    }
}

function sendEmail(options, callback){
    console.log("Sending Email");
    let toemail = '';
    let tx = 0;
    $.each(options.toemail, function(key, value){
        toemail += `${value}${tx == 0 ? "" : ","}`;
        tx++;
    });
	Email.send({
	Host: "smtp.gmail.com",
	Username : "sampleaccout7@gmail.com",
	Password : "samplepassword",
    To : toemail,
    // Cc: options.cc != null && options.cc != undefined ? options.cc : "",
	From : options.from,
	Subject : options.subject,
    Body : options.body,
    Attachments : options.attachments != null && options.attachments != undefined ? options.attachments : ""
    // [
    //     {
    //         name : "newinvoice.pdf",
    //         path : "http://development.prodocuflow.com/lib/documents/projectinfo/1597293780.pdf"
    //     }
    // ]
	}).then(function(message){
        console.log("MESSAGE", message)
        callback();
    });
    // console.log("Email Sent");
}
function sendConfirmationEmail(options, callback){
    console.log("Sending Email");
    let toemail = '';
    let tx = 0;
    $.each(options.toemail, function(key, value){
        toemail += `${value}${tx == 0 ? "" : ","}`;
        tx++;
    });
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
        margin-bottom: 20px;">WE HAVE RECEIVED YOUR EMAIL</span>
        <br>
        <br>
    
        <span class="text" style="
        display: inline-block;
        width: calc(100% - 40px);
        padding: 10px 20px;
        letter-spacing: 2px;
        line-height: 1.5em;
        font-size: 1.2em;">
           Thank you ${options.fname} ${options.lname} for contacting us!
        </span>

        <span class="text" style="
        display: inline-block;
        width: calc(100% - 40px);
        padding: 10px 20px;
        letter-spacing: 2px;
        line-height: 1.5em;
        font-size: 1.2em;">
           We're Currently Reviewing your email. Due to high quantities of emails, there is a  1-2 business day waiting time for our reply so sit tight and we will be right back at you as soon as we can. 
        </span>

        <span class="text" style="
        display: inline-block;
        width: calc(100% - 40px);
        padding: 10px 20px;
        letter-spacing: 2px;
        line-height: 1.5em;
        font-size: 1.2em;">
           In the meantime, we would appreciate it if you could give us a review on Google if you'd like!
        </span>

        <a style="
        display: inline-block;
        padding: 15px 50px;
        letter-spacing: 3px;
        line-height: 1.3em;
        font-size: 1.2em;
        font-weight: bold;
        background-color: #282828;
        color: whitesmoke;
        text-decoration: none;
        margin-top: 20px;"
        href="https://g.page/esscorp/review?rc">Give us a Review!</a>

        <br><br>

        <span class="text" style="
        display: inline-block;
        width: calc(100% - 40px);
        padding: 10px 20px;
        letter-spacing: 2px;
        line-height: 1.5em;
        font-size: 1.2em;">
           Or you could visit our website and browse through our content.
        </span>

        <a style="
        display: inline-block;
        padding: 15px 50px;
        letter-spacing: 3px;
        line-height: 1.3em;
        font-size: 1.2em;
        font-weight: bold;
        background-color: #282828;
        color: whitesmoke;
        text-decoration: none;
        margin-top: 20px;"
        href="http://esscorp.ca">Go to Website</a>
    
        
    
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
      
    
    
    </div>`;
	Email.send({
	Host: "smtp.gmail.com",
	Username : "sampleaccout7@gmail.com",
	Password : "samplepassword",
    To : toemail,
    // Cc: options.cc != null && options.cc != undefined ? options.cc : "",
	From : "info@esscorp.ca",
	Subject : "CONFIRMATION EMAIL",
    Body : htmlBody,
	}).then(function(message){
        console.log("MESSAGE", message)
        callback();
    });
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});








const options = {
    "id" : "mapid",
    "long" : 43.7574994,
    "lat" : -79.4858961,
    "text" : "Headquarters",
    "marker" : "Headquarters"
};

let homeCGal;
let contactCGal;
// addMap(options);

const mobileaccusercb =()=>{
    const dfrd = $.Deferred();
    console.log('mobile init');
    mobilenav().done(function(){
        dfrd.resolve();
    });
    return dfrd.promise();
}
const desktopaccusercb =()=>{
    homeCGal = new ScrollGallery({"list" : gallist, "id" : "home-content-gallery"});
    contactCGal = new ScrollGallery({"list" : gallist, "id" : "contact-content-gallery"});
    fillFooter().done(function(){
        fillNavigation().done(function(){
            fillGallery().done(function(){
                fetchProductModels().done(function(){
                    console.log(navigator.userAgent);
                    if( (/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {
                        mobileaccusercb().done(function(){
                            mobileMininav().done(function(){
                                $('#header').get(0).scrollIntoView({ behavior: 'smooth' });
                            });
                        });
                    }
                    // api_redirect();
                    // rdfn_test(()=>{console.log("PEKPEKPEKPEK",data)});
                    setTimeout(() => {
                        $('#mobinavtab').css('display', 'none').hide();
                        $('#loader').animate({'opacity' : '0'}, 500, function(){
                            $(this).css('display', 'none').children('i').css('animation', 'none')
                        });
                    }, 1000);
                });
            });
        });
    });
}

function reloadCache(){
    const dfrd = $.Deferred();

    window.location.reload(true, function(){
        console.log('awesome');
    });
    
    return dfrd.promise();
}



$(document).ready(function(){

    // reloadCache().done(function(){
    //     console.log('awesome');
    // });

    ACCUSER = new User(desktopaccusercb);
    // $('.page-content').hide();
    // $('#recruitment').show();
    // $('#contactlinktest').click();
    console.log('ready');
    // setTimeout(() => {
    //     showPages("contact");
    //     setTimeout(() => {
    //         // hideToast();
    //         flashToast('Email has been sent! we will send you a confirmation email that we have accepted your application.');
    //     }, 2000);
    // }, 6000);

    // flashToast('Email has been sent');
    // showToast('Sending Email');

    // setTimeout(() => {
    //     // hideToast();
    //     flashToast('Email has been sent! we will send you a confirmation email that we have accepted your application.');
    // }, 3000);
});



function fillFooter(){
    const dfrd = $.Deferred();
    $('#footer').children('.footer-map').children('.footer-map-widget').remove();

    // $.getJSON( `${domain}model/footer_map.json`, function( data ) {
        let html = '';
        $.each( ACCUSER.FooterMap, function( key, value ) {
            let z1 = '';
            let z2 = '';
            let z3 = '';
            let z4 = '';
            if(value.z1.length > 0){
                $.each(value.z1, function(key, zvalue){
                    z1 += `<span class="z1">${zvalue}</span>`;
                }); 
            }
            if(value.z2.length > 0){
                $.each(value.z2, function(key, zvalue){
                    z2 += `<span class="z2">${zvalue}</span>`;
                }); 
            }
            if(value.z3.length > 0){
                $.each(value.z3, function(key, zvalue){
                    z3 += `<span class="z3">${zvalue}</span>`;
                }); 
            }
            if(value.z4.length > 0){
                $.each(value.z4, function(key, zvalue){
                    z4 += `<span class="z4"><b>${zvalue}</b></span>`;
                }); 
            }
            
            html += `
                <div mapid="${value.mapid}" mapimg="${value.mapimg}" link="${value.link}" dataid="${value.dataid}" class="footer-map-widget navbar-popup-widget-c">
                    <i class="hidden fas fa-map-marker-alt"></i>
                    ${z1}
                    ${z2}
                    ${z3}
                    ${z4}
                </div>`;
                dfrd.resolve();
        });
        
        $('#footer').children('.footer-map').append(html);
    // });
    return dfrd.promise();
    // $('#footer').children('.footer-map').prepend(`<img id="footer-map-mapimg" src="./lib/images/maps/map-france.png" alt="">`);
}
function fillNavigation(){
    const dfrd = $.Deferred();
    $('#navbar').children('.bar').empty();
    $('#navbar').children('.popup').empty();
    let barhtml = '';
    let popuphtml = '';
        // console.log(data);
    // const data = ;
    $.each(ACCUSER.Navbar, function(key, value){
        let righthtml = '';
        let lefthtml = '';
        barhtml += `
            <div popup="${value.popupid}" status="closed" link="${value.link}" class="navbar-popup-widget-c navbar-widget">
                <span>${value.name}</span>
                ${value.link == "none" ? '<i class="fas fa-caret-right"></i>' : ""}
            </div>
        `;
        if(value.leftpanel != "undefined"){
            $.each(value.leftpanel, function(key, lvalue){
                lefthtml += `<span class="navbar-popup-widget-c" link="${lvalue.link}" pid="${lvalue.pid}">${lvalue.name}${lvalue.caret == "true" ? '<i class="fas fa-caret-right "></i>' : ""}</span>`;
            });
        }
        if(value.rightpanel != "undefined"){
            $.each(value.rightpanel, function(key, rvalue){
                righthtml += `<div div class="navbar-popup-widget-r navbar-popup-widget-r-${rvalue.pid}">`;
                $.each(rvalue.content, function(key, rcvalue){
                    righthtml += `<span link="${rcvalue.link}" class="navbar-popup-widget-c">${rcvalue.name}</span>`;
                });
                righthtml += "</div>";
            });
        }
        popuphtml += `
            <div class="navbar-popup-widget popup-${value.popupid} hidden">
                <div class="leftpanel">${lefthtml}</div>
                <div class="rightpanel">${righthtml}</div>
            </div>
        `;
        dfrd.resolve();
    });
    $('#navbar').children('.bar').append(barhtml);
    $('#navbar').children('.popup').append(popuphtml);
    return dfrd.promise();
}
function fillGallery(){
    const dfrd = $.Deferred();
    $('.gallery-collection').empty();
    $('.gallery-icons').empty();
    $.each(ACCUSER.Gallery, function(key, value){
        $('.gallery-collection').append(`
            <div status="idle" gid="${value.gid}" class="widget hidden">
                <img src="${value.img}" alt="">
                <div class="textcontent">
                    <span class="title">${value.title}</span>
                    <span class="subtitle">${value.subtitle}</span>
                    <span class="content">${value.content}</span>
                    <button link="${value.link}" class="navbar-popup-widget-c shadow">Learn More</button>
                </div>
            </div>
        `);
        $('.gallery-icons').append(`<i gid="${value.gid}" status="idle" class="gallery-icons-handle far fa-circle"></i>`);
    });
    $('.gallery-collection').children(":first").css('display', 'flex').show();
    $('.gallery-icons').children(":first").removeClass('far').addClass('fas');
    startGallery();
    // console.log('gallery test');
    
    // fillHomeGallery(gallist, "home-content-gallery");
    // startHomeGallery(gallist, "home-content-gallery");
    
    homeCGal.fill();
    homeCGal.start();
    dfrd.resolve();
    return dfrd.promise();
}
function startGallery(){
    // let now = curWidget;
    let jsonObj = [];
    let len = 0;
    $.getJSON(`${domain}model/gallery.json`, function(data){
        jsonObj = data;
    }).done(function(){
        len = jsonObj.length;
        // console.log(jsonObj[1], 'len');
    });
    
    function play(gid){
        $('.gallery-collection').children('.widget').stop(0).animate({"opacity" : 0}, 500, function(){
            $('.gallery-collection').children('.widget').each(function(){
                const zgid = $(this).attr('gid');
                if(gid == zgid){
                    // $('.gallery-collection').children('.widget').css({'display' : 'none'}).hide();
                    $('.gallery-collection').children('.widget').css({'opacity' : '0', 'display' : 'none'}).hide();
                    $(this).css('display', 'flex').show();
                    $(this).stop(0).animate({"opacity" : 1}, 500);
                }
            });
            $('.gallery-icons').children('.gallery-icons-handle').each(function(){
                const zgid = $(this).attr('gid');
                if(gid == zgid){
                    // $('.gallery-collection').children('.widget').css({'display' : 'none'}).hide();
                    $('.gallery-icons').children('.gallery-icons-handle').removeClass('fas').addClass('far');
                    $(this).removeClass('far').addClass('fas');
                }
            });
        });
    }
    galleryInterval = setInterval(() => {
        if(gallerynow < len-1){
            gallerynow++;
            const gid = jsonObj[gallerynow].gid;
            play(gid);
            console.log(gallerynow);
        }else{
            gallerynow = 0;
            console.log(gallerynow);
            const gid = jsonObj[gallerynow].gid;
            play(gid);
        }
    }, 10000);
}
function stopGallery(){
    clearInterval(galleryInterval);
    // galleryInterval.clearInterval();
};
function showPages(link, data=undefined){
    $('.page-content').css('display', 'none').hide();
    stopGallery();
    // stopContactGallery();
    // stopHomeGallery();
    homeCGal.stop();
    contactCGal.stop();

    if(link.includes('mnav')){
        $('#multipage').css('display', 'flex').show();
        fillMiniNav(link);
        showMultipage(link);
        showMiniNav($(`#multipage-mininav-widget_${link}`));
    }else if(link.includes('home')){
        $('#home').css('display', 'flex').show();
        fillGallery();
    }else if(link.includes('spage')){
        $('#singlepage').css('display', 'flex').show();
        showSinglepage(link);
    }else if(link.includes('rpage')){
        $('#referencepage').css('display', 'flex').show();
        showReferencePage(link);
    }else if(link.includes('news')){
        $('#news').css('display', 'flex').show();
        showNewsPage();
    }else if(link.includes('contact')){
        fetchProductModels();
        if($('#contact-form-product').val() == "na"){
            $('.contact-product-spec').hide();
            $('#contact-form-message').css('height', '100%');
        }else{
            $('.contact-product-spec').show();
            $('#contact-form-message').css('height', '50%');
        }
        fillContactPage();
        contactCGal.fill();
        contactCGal.start();
        $('#contact').css('display', 'flex').show();
    }else if(link.includes('fmap')){
        $('#contact').css('display', 'flex').show();
        $('#contact-form-location').val(data);
        $('#contact-form-location').trigger('change');
        console.log(data);
    }else if(link.includes('career')){
        $('#recruitment').css('display', 'flex').show();
        fillJobList();
    }

    $("#header").get(0).scrollIntoView({ behavior: 'smooth' });
    
}
function resetNav(){
    $('#navbar-popup').css('display', 'none').hide();
    $('.navbar-widget').children('i').removeClass('fa-caret-down').addClass('fa-caret-right');
    $('#navbar-popup').children('div').css('display', 'none').hide();
    $('.navbar-widget').attr('status','closed');
    $('.navbar-widget').children().css('color', 'rgba(255, 255, 255, 0.7)');
    $('.navbar-widget').css('background-color', 'initial');
    $('.navbar-popup-widget').children('.rightpanel').children('.navbar-popup-widget-r').css('display', 'none').hide();
    $('.navbar-popup-widget > .leftpanel > span').css('color', 'white');
}
function showMiniNav(dis){
    $('.multipage-mininav-handle').removeClass('active');
    // console.log(dis);
    const link = dis.attr('link');
    const ll = link.split('_');
    console.log(link, ll, ll.length);
    let mlink;
    let slink;
    let tlink;
    // const mnavobj = ACCUSER.Mininav;
    if(ll.length == 3){
        mlink = link;
        slink = dis.parent('.ktitle-con').siblings('.multipage-mininav-widget-subtitle').attr('link');
        tlink = dis.parent('.ktitle-con').parent('.subtitle').parent('.subtitle-con').siblings('.multipage-mininav-widget-maintitle').attr('link');
    }else if(ll.length == 2){
        mlink = "none";
        slink = link;
        tlink = dis.parent('.subtitle').parent('.subtitle-con').siblings('.multipage-mininav-widget-maintitle').attr('link');
    }else{
        mlink = "none";
        slink = "none";
        tlink = link;
    }

    const obj = {
        "mlink" : mlink,
        "slink" : slink,
        "tlink" : tlink
    }

    console.log(obj);
    if(tlink != undefined){
        $(`#multipage-mininav-widget_${tlink}`).siblings('.subtitle-con').css('display', 'flex').show();
        $(`#multipage-mininav-widget_${tlink}`).trigger('click');
        if(slink != undefined && slink != "none"){
            // $(`#multipage-mininav-widget_${slink}`).siblings('.ktitle-con').css('display', 'flex').show().attr('status', 'active').addClass('active');
            $(`#multipage-mininav-widget_${slink}`).trigger('click');
            if(mlink != undefined && mlink != "none"){
                $(`#multipage-mininav-widget_${mlink}`).attr('status', 'active').addClass('active');
                $(`#multipage-mininav-widget_${mlink}`).trigger('click');
            }
        }
    }
    
}




function htmlValue(value){
    let html = "";
    if(value.type == "title"){
        html += `<span class="title">${value.data}</span>`;
    }else if(value.type == "text"){
        if(typeof value.data == 'object'){
            $.each(value.data, function(key, value){
                html += `<span class="text">${value}</span>\n`;
            });
        }else{
            html += `<span class="text">${value.data}</span>`;
        }
    }else if(value.type == "video"){
        html += `<iframe class="video" src="${value.data}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }else if(value.type == "image"){
        html += `<img class="image" src="${value.data}" alt="">`;
    }else if(value.type.includes("imagetext")){
        console.log('test');
        if(value.type == "imagetext-r"){
            html += `<div class="imagetext imagetext-r ">
                <div>
                    <img src="${value.data.image}" alt="" >
                </div>
                <span>${value.data.text}</span>
            </div>`;
        }else{
            html += `<div class="imagetext imagetext-l ">
                <div>
                    <img src="${value.data.image}" alt="" >
                </div>
                <span>${value.data.text}</span>
            </div>`;
        }
    }else if(value.type == "imagecontain"){
        html += `<img class="imagecontain" src="${value.data}" alt="">`;
    }else if(value.type == "list"){
        html += '<ul class="list">'
        $.each(value.data, function(key, value){
            html += `<li>${value}</li>`;
        });
        html += '</ul>'
    }else if(value.type == "list2"){
        const right = value.data.right;
        const left = value.data.left;
        html += `<div class="list2"> <span class="title">${value.caption}</span>
        <div class="left list2container">
        <span class="title">${left.title}</span>
        <span class="text">${left.text}</span>
        <ul>`;
        $.each(left.data, function(key, value){
            html += `<li>${value}</li>`;
        });

        html += `</ul></div><div class="right list2container">
            <span class="title">${right.title}</span>
            <span class="text">${right.text}</span>
            <ul>`;
        $.each(right.data, function(key, value){
            html += `<li>${value}</li>`;
        });
        html += '</ul></div></div>';
    }else if(value.type == "table"){
        const thead = value.data.thead;
        const tbody = value.data.tbody;
        const tfoot = value.data.tfoot;
        let zhtml = '<table class="table">';
        let x = 0;
        zhtml += `<caption>${value.data.caption}</caption><thead><tr>`;
        $.each(thead, function(key, value){
            zhtml += `<th>${value}</th>`;
        });
        zhtml += `</tr></thead><tbody>`;
        $.each(tbody, function(key, value){
            zhtml += "<tr>";
            $.each(value.data, function(key, value1){
                zhtml += `<td>${value1}</td>`;
            });
            zhtml += "</tr>";
        });
        zhtml += "</tbody><tfoot><tr>";
        $.each(tfoot, function(key, value){
            zhtml += `<td>${value}</td>`;
        });
        zhtml += "</tr></tfoot></table>";
        html += zhtml;
    }else if(value.type == "specificationspage-model"){
        let tecsheetHtml = '';
        if(value.data.techsheet != 'none'){
            tecsheetHtml = `<span filelink="${value.data.techsheet}" class="techsheet">TECHNICAL SHEET<i class="fas fa-download"></i></span>`;
        }
        html += `
        <div class="multipage-specificationspage-model">
            <img src="${value.data.image}" alt="">
            <div class="model-con">
                <span class="title">Model</span>
                <span class="modeltext">${value.data.modeltext}</span>
                ${tecsheetHtml}
                <span cid="${value.data.cid}" class="contact specificationspage-model-contact-handle">CONTACT<i class="fas fa-id-card-alt"></i></span>
            </div>
        </div>`;
    }else if(value.type == "specificationspage-practicalcase"){
        html += `
        <div class="multipage-specificationspage-practicalcase">
            <div class="model-con">
                <span class="title">DESCRIPTION</span>
                <span class="modeltext">${value.data.description}</span>
                <br>
                <span class="title">APPLICATIONS </span>
                <span class="modeltext">${value.data.applications}</span>
            </div>
            <img src="${value.data.image}" alt="">
        </div>`;
    }else if(value.type == "space"){
        html += `<div class="space"></div>`;
    }else if(value.type == "multipage-coll-content"){
        html += `<div class="multipage-coll-content">
        <span status="closed" class="title multipage-coll-content-h">${value.data.title}<i class="fas fa-caret-right"></i></span>
        <div class="content hidden">`;
        $.each(value.data.content, function(key, value){
            if(value.type == "title"){
                html += `<span class="title">${value.data}</span>`;
            }else if(value.type == "text"){
                if(typeof value.data == 'object'){
                    $.each(value.data, function(key, value){
                        html += `<span class="text">${value}</span>\n`;
                    });
                }else{
                    html += `<span class="text">${value.data}</span>`;
                }
            }else if(value.type == "video"){
                html += `<iframe class="video" src="${value.data}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            }else if(value.type == "image"){
                html += `<img class="image" src="${value.data}" alt="">`;
            }else if(value.type == "imagecontain"){
                html += `<img class="imagecontain" src="${value.data}" alt="">`;
            }else if(value.type == "list"){
                html += '<ul class="list">'
                $.each(value.data, function(key, value){
                    html += `<li>${value}</li>`;
                });
                html += '</ul>'
            }else if(value.type == "table"){
                const thead = value.data.thead;
                const tbody = value.data.tbody;
                const tfoot = value.data.tfoot;
                let zhtml = '<table class="table">';
                let x = 0;
                zhtml += `<caption>${value.data.caption}</caption><thead><tr>`;
                $.each(thead, function(key, value){
                    zhtml += `<th>${value}</th>`;
                });
                zhtml += `</tr></thead><tbody>`;
                $.each(tbody, function(key, value){
                    zhtml += "<tr>";
                    $.each(value.data, function(key, value1){
                        zhtml += `<td>${value1}</td>`;
                    });
                    zhtml += "</tr>";
                });
                zhtml += "</tbody><tfoot><tr>";
                $.each(tfoot, function(key, value){
                    zhtml += `<td>${value}</td>`;
                });
                zhtml += "</tr></tfoot></table>";
                html += zhtml;
            }else if(value.type == "specificationspage-model"){
                let tecsheetHtml = '';
                if(value.data.techsheet != 'none'){
                    tecsheetHtml = `<span filelink="${value.data.techsheet}" class="techsheet">TECHNICAL SHEET<i class="fas fa-download"></i></span>`;
                }
                html += `
                <div class="multipage-specificationspage-model">
                    <img src="${value.data.image}" alt="">
                    <div class="model-con">
                        <span class="title">Model</span>
                        <span class="modeltext">${value.data.modeltext}</span>
                        ${tecsheetHtml}
                        <span cid="${value.data.cid}" class="contact specificationspage-model-contact-handle">CONTACT<i class="fas fa-id-card-alt"></i></span>
                    </div>
                </div>`;
            }else if(value.type == "specificationspage-practicalcase"){
                html += `
                <div class="multipage-specificationspage-practicalcase">
                    <div class="model-con">
                        <span class="title">DESCRIPTION</span>
                        <span class="modeltext">${value.data.description}</span>
                        <br>
                        <span class="title">APPLICATIONS </span>
                        <span class="modeltext">${value.data.applications}</span>
                    </div>
                    <img src="${value.data.image}" alt="">
                </div>`;
            }else if(value.type == "space"){
                html += `<div class="space"></div>`;
            }else if(value.type == "multipage-coll-content"){
                html += `<div class="multipage-coll-content">
                <span status="closed" class="title multipage-coll-content-hh">${value.data.title}<i class="fas fa-caret-right"></i></span>
                <div class="content hidden">`;
                $.each(value.data.content, function(key, value){
                    if(value.type == "title"){
                        html += `<span class="title">${value.data}</span>`;
                    }else if(value.type == "text"){
                        if(typeof value.data == 'object'){
                            $.each(value.data, function(key, value){
                                html += `<span class="text">${value}</span>\n`;
                            });
                        }else{
                            html += `<span class="text">${value.data}</span>`;
                        }
                    }else if(value.type == "video"){
                        html += `<iframe class="video" src="${value.data}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                    }else if(value.type == "image"){
                        html += `<img class="image" src="${value.data}" alt="">`;
                    }else if(value.type == "imagecontain"){
                        html += `<img class="imagecontain" src="${value.data}" alt="">`;
                    }else if(value.type == "list"){
                        html += '<ul class="list">'
                        $.each(value.data, function(key, value){
                            html += `<li>${value}</li>`;
                        });
                        html += '</ul>'
                    }else if(value.type == "table"){
                        const thead = value.data.thead;
                        const tbody = value.data.tbody;
                        const tfoot = value.data.tfoot;
                        let zhtml = '<table class="table">';
                        let x = 0;
                        zhtml += `<caption>${value.data.caption}</caption><thead><tr>`;
                        $.each(thead, function(key, value){
                            zhtml += `<th>${value}</th>`;
                        });
                        zhtml += `</tr></thead><tbody>`;
                        $.each(tbody, function(key, value){
                            zhtml += "<tr>";
                            $.each(value.data, function(key, value1){
                                zhtml += `<td>${value1}</td>`;
                            });
                            zhtml += "</tr>";
                        });
                        zhtml += "</tbody><tfoot><tr>";
                        $.each(tfoot, function(key, value){
                            zhtml += `<td>${value}</td>`;
                        });
                        zhtml += "</tr></tfoot></table>";
                        html += zhtml;
                    }else if(value.type == "specificationspage-model"){
                        let tecsheetHtml = '';
                        if(value.data.techsheet != 'none'){
                            tecsheetHtml = `<span filelink="${value.data.techsheet}" class="techsheet">TECHNICAL SHEET<i class="fas fa-download"></i></span>`;
                        }
                        html += `
                        <div class="multipage-specificationspage-model">
                            <img src="${value.data.image}" alt="">
                            <div class="model-con">
                                <span class="title">Model</span>
                                <span class="modeltext">${value.data.modeltext}</span>
                                ${tecsheetHtml}
                                <span cid="${value.data.cid}" class="contact specificationspage-model-contact-handle">CONTACT<i class="fas fa-id-card-alt"></i></span>
                            </div>
                        </div>`;
                    }else if(value.type == "specificationspage-practicalcase"){
                        html += `
                        <div class="multipage-specificationspage-practicalcase">
                            <div class="model-con">
                                <span class="title">DESCRIPTION</span>
                                <span class="modeltext">${value.data.description}</span>
                                <br>
                                <span class="title">APPLICATIONS </span>
                                <span class="modeltext">${value.data.applications}</span>
                            </div>
                            <img src="${value.data.image}" alt="">
                        </div>`;
                    }else if(value.type == "space"){
                        html += `<div class="space"></div>`;
                    }
                }); 
                html += '<i class="fas fa-arrow-alt-circle-up scrollup multipage-coll-content-scrollup"></i></div></div>';
            }
        }); 
        html += '<i class="fas fa-arrow-alt-circle-up scrollup multipage-coll-content-scrollup"></i></div></div>';
    }
    return html;
}

// HEADER EVENTS
$('#header-btn-language').click(function(){
    const status = $(this).attr('status');
    $('#header-btn-language').attr('status', 'closed');
    $('#header-btn-search').attr('status', 'closed');
    if(status == "closed"){
        $('#searchbar').animate({"height" : "45px"}, 200, function(){
            $('#searchbar').children('.language').css('display', 'flex').show();
            $('#searchbar').children('.search').css('display', 'none').hide();
            $('#searchbar').children('.adminlogin').css('display', 'none').hide();
        });
        $(this).attr('status', "open");
    }else{
        $('#searchbar').animate({"height" : "10px"}, 200, function(){
            $('#searchbar').children('.language').css('display', 'none').hide();
            $('#searchbar').children('.search').css('display', 'none').hide();
        });
        $(this).attr('status', "closed");
    }

    
});
$('#header-btn-search').click(function(){
    const status = $(this).attr('status');
    $('#header-btn-language').attr('status', 'closed');
    $('#header-btn-search').attr('status', 'closed');
    if(status == "closed"){
        $('#searchbar').animate({"height" : "45px"}, 200, function(){
            $('#searchbar').children('.search').css('display', 'flex').show();
            $('#searchbar').children('.language').css('display', 'none').hide();
            $('#searchbar').children('.adminlogin').css('display', 'none').hide();
        });
        $(this).attr('status', "open");
    }else{
        $('#searchbar').animate({"height" : "10px"}, 200, function(){
            $('#searchbar').children('.language').css('display', 'none').hide();
            $('#searchbar').children('.search').css('display', 'none').hide();
        });
        $(this).attr('status', "closed");
    }
});
$('.searchbar-close').click(function(){
    $('#searchbar').animate({"height" : "10px"}, 200, function(){
        $('#searchbar').children('.language').css('display', 'none').hide();
        $('#searchbar').children('.search').css('display', 'none').hide();
        $('#searchbar').children('.adminlogin').css('display', 'none').hide();
    });
});
$('.company-logo').click(function(){
    console.log('Take me Home');

    showPages('home');
});
$('.company-logo').dblclick(function(){
    $('#searchbar').animate({"height" : "45px"}, 200, function(){
        $('#searchbar').children('.search').css('display', 'none').hide();
        $('#searchbar').children('.language').css('display', 'none').hide();
        $('#searchbar').children('.adminlogin').css('display', 'flex').show();
    });
});
$('#adminlogin-tbox').keyup(function(){
    const p = $(this).val();
    
    if(p == "qwerty123"){
        window.location.href = domain + 'admin/';
    }
});



// NAVIGATION EVENTS
$(document).on('click', '.navbar-widget', function(){
    const status = $(this).attr('status');
    const popup = $(this).attr('popup');
    const link = $(this).attr('link');

    
    // console.log(popup);
    $('.navbar-widget').children('i').removeClass('fa-caret-down').addClass('fa-caret-right');
    $('#navbar-popup').children('div').css('display', 'none').hide();
    $('.navbar-widget').attr('status','closed');
    $('.navbar-widget').children().css('color', 'rgba(255, 255, 255, 0.7)');
    $('.navbar-widget').css('background-color', 'initial');
    $('.navbar-popup-widget').children('.rightpanel').children('.navbar-popup-widget-r').css('display', 'none').hide();
    $('.navbar-popup-widget > .leftpanel > span').css('color', 'white');

    if(status == "closed"){
        $(this).children('i').removeClass('fa-caret-right').addClass('fa-caret-down');
        $(this).attr('status','open');
        $(this).children().css('color', 'white');
        $(this).css('background-color', SUB_COLOR);
        if(link == "none"){
            $('#navbar-popup').children(`.popup-${popup}`).css('display', 'flex').show();
            $('#navbar-popup').css('display', 'flex').show();
        }else{
            $('#navbar-popup').css('display', 'none').hide();
        }
    }else{
        $(this).children('i').removeClass('fa-caret-down').addClass('fa-caret-right');
        $(this).attr('status','closed');
        $('#navbar-popup').children(`.popup-${popup}`).css('display', 'none').hide();
        $('#navbar-popup').css('display', 'none').hide();
    }
});
$(document).on('mouseover', '.navbar-popup-widget > .leftpanel > span', function(){
    const pid = $(this).attr('pid');
    $('.navbar-popup-widget > .leftpanel > span').css('color', 'white');
    $(this).css('color', 'rgb(161, 161, 161)');

    $('.navbar-popup-widget > .rightpanel').children(`.navbar-popup-widget-r`).css('display', 'none').hide();
    $('.navbar-popup-widget > .rightpanel').children(`.navbar-popup-widget-r-${pid}`).css('display', 'flex').show();
});
$(document).on('click', '.navbar-popup-widget-c', function(){
    const link = $(this).attr('link');
    if(link != "none"){
        // console.log(link);
        if(link.includes('fmap')){
            showPages(link, $(this).attr('dataid'));
            console.log($(this).attr('dataid'));
        }else{
            showPages(link);
        }
        // $('#navbar-popup').css('display', 'none').hide();
        resetNav();
        
    }
});



// FOOTER EVENTS
$(document).on('mouseover', '.footer-map-widget', function(e){
    const mapid = $(this).attr('mapid');
    const mapimg = $(this).attr('mapimg');
    $('.footer-map-widget').children('i').css('display', 'none').hide();
    $(this).children('i').css('display', 'flex').show();
    $('#footer-map-mapimg').attr('src', mapimg);
});
$(document).on('mouseout', '.footer-map-widget', function(e){
    $('.footer-map-widget').children('i').css('display', 'none').hide();
    $('#footer-map-mapimg').attr('src', "lib/images/maps/map-0.png");
});


// GALLERY EVENTS
$(document).on('click', '.gallery-icons-handle', function(){
    const gid = $(this).attr('gid');
    // console.log(gid);
    
    $('.gallery-collection').children('.widget').stop(0).animate({"opacity" : 0}, 500, function(){
        let q = 0;
        $('.gallery-collection').children('.widget').each(function(){
            const zgid = $(this).attr('gid');
            if(gid == zgid){
                // $('.gallery-collection').children('.widget').css({'display' : 'none'}).hide();
                $('.gallery-collection').children('.widget').css({'opacity' : '0', 'display' : 'none'}).hide();
                $(this).css('display', 'flex').show();
                $(this).stop(0).animate({"opacity" : 1}, 500);
                gallerynow = q;
                // console.log(q);
            }else{
                q++;
            }

        });
    });

    $('.gallery-icons').children('i').removeClass('fas').addClass('far');
    $(this).removeClass('far').addClass('fas');
});


// MODELS - CONTACT EVENT
$(document).on('click', '.specificationspage-model-contact-handle', function(){
    const options = {
        "cid" : $(this).attr('cid')
    }
    productInquire(options);
});



