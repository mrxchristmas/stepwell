function showReferencePage(link){
    let obj = ACCUSER.findReferencepageObjByLink(link);
    let html = '';
    $('#referencepage').children('.referencepage-content').remove();
    if(obj != undefined){
        html += '<div class="referencepage-content"><div class="ref">';
        $('.referencepage-header').children('.title').text(obj.title);
        $('.referencepage-header').children('.subtitle').text(obj.subtitle);
        $.each(obj.content, function(key, value){
            html += `
            <div class="referencepage-widget">
                <span>${value.name}</span>
                <span>${value.location}</span>
            </div>`;
        });
        html += `</div><img src="${obj.image}" alt=""></div>`;
    }else{
        $('.referencepage-header').children('.title').text('THIS PAGE IS');
        $('.referencepage-header').children('.subtitle').text('NOT FOUND');
    }
    $('#referencepage').append(html);
}