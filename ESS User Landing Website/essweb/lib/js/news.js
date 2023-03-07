function showNewsPage(){
    // console.log(link, `${domain}model/singlepage.json`);
    
    $('.news-featured').children('.text-content').empty();
    $('.news-active').empty();
    $('.news-archived-nav').empty();
    $('.news-archived-content').children('.news-archived-widget-con').remove();

    const data = ACCUSER.News;
    $.each(data.featured, function(key, value){
        let html = '';
        if(value.type == "title"){
            html += `<span class="title">${value.data}</span>`;
        }else if(value.type == "text"){
            html += `<span class="text">${value.data}</span>`;
        }else if(value.type == "video"){
            html += `<iframe class="video" src="${value.data}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        }else if(value.type == "image"){
            html += `<img class="image" src="${value.data}" alt="">`;
        }else if(value.type == "list"){
            html += '<ul class="list">'
            $.each(value.data, function(key, value){
                html += `<li>${value}</li>`;
            });
            html += '</ul>'
        }
        $('.news-featured').children('.text-content').append(html);
    });
    $.each(data.active, function(key, value){
        const d = value.date.split('-');
        let m = {
            "01" : "Jan",
            "02" : "Feb",
            "03" : "Mar",
            "04" : "Apr",
            "05" : "May",
            "06" : "Jun",
            "07" : "Jul",
            "08" : "Aug",
            "09" : "Sep",
            "10" : "Oct",
            "11" : "Nov",
            "12" : "Dec",
        }
        let html = `
        <div class="news-active-widget">
            <img src="${value.image}" alt="">
            <div class="footer">
                <div class="date">
                    <span>${m[d[1]]}</span>
                    <span>${d[2]} - ${d[0]}</span>
                </div>
                <span link="${value.link}" class="title news-active-handle">${value.title}</span>
            </div>
        </div>`;
        $('.news-active').append(html);
    });
    $.each(data.archived, function(key, value){
        let html = '';
        $('.news-archived-nav').append(`<span yearid="${value.yearid}" class="news-archived-nav-widget active">${value.yearid}</span>`);
        html += `<div yearid="${value.yearid}" class="news-archived-widget-con hidden">`;
        $.each(value.content, function(key, value){
            html += `
            <div link="${value.link}" class="news-archived-widget news-archived-handle">
                <div class="date">
                    <span>${value.month}</span>
                    <span>${value.day}</span>
                </div>
                <img src="${value.img}" alt="">
                <span class="title ">${value.title}</span>
            </div>`;
        });
        html += "</div>";
        $('.news-archived-content').append(html);
    });
    
}


$(document).on('click', '.news-archived-nav-widget', function(){
    const yearid = $(this).attr('yearid');
    // console.log(yearid);
    $('.news-archived-widget-con').css('display', 'none').hide();
    $('.news-archived-content').children('.news-archived-widget-con').each(function(){
        const zyearid = $(this).attr('yearid');
        if(yearid == zyearid){
            $(this).css('display', 'flex').show();
        }
    });

    $('.news-archived-nav-widget').removeClass('active');
    $(this).addClass('active');
});

$(document).on('click', '.news-active-handle', function(){
    const link = $(this).attr('link');
    console.log(link);
    $('.page-content').css('display', 'none').hide();
    stopGallery();
    
    showSinglepage(link);
    $('#singlepage').css('display', 'flex').show();
});
$(document).on('click', '.news-archived-handle', function(){
    const link = $(this).attr('link');
    console.log(link);
    $('.page-content').css('display', 'none').hide();
    stopGallery();

    showSinglepage(link);
    $('#singlepage').css('display', 'flex').show();
});