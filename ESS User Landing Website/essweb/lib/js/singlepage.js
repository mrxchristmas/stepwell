function showSinglepage(link){
    // console.log(link, `${domain}model/singlepage.json`);
    let gate = false;
    let obj = ACCUSER.findSinglepageObjByLink(link);
    let html = '';
    $('#singlepage').children('.singlepage-content').remove();

    if(obj != undefined){
        html += '<div class="singlepage-content">';
        $('.singlepage-header').children('.title').text(obj.content.title);
        
        // console.log(obj);
        $.each(obj.content.data, function(key, value){
            // console.log(value);
            const zhtml = htmlValue(value);
            html += zhtml;
        });
        html += '</div>';
    }else{
        $('.singlepage-header').children('.title').text('THIS PAGE IS NOT FOUND');
        html += `
        <div class="singlepage-content">
            <span class="title">THE PAGE YOU ARE LOOKING FOR IS NOT HERE</span>
            <span class="text">Please Contact your Administrator if you think this is an error.</span>
        </div>`;
    }
    // console.log(html);
    $('#singlepage').append(html);
    
}