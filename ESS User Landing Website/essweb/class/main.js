class User{
    constructor(callback){
        this.Multipage = undefined;
        this.Singlepage = undefined;
        this.Referencepage = undefined;
        this.Navbar = undefined;
        this.Mininav = undefined;
        this.News = undefined;
        this.Gallery = undefined;
        this.FooterMap = undefined;
        this.Joblist = undefined;
        this.Jobinfo = undefined;
        this.ProductModels = undefined;

        

        // $.each(fnlist, function(key, value){

        // });
        // function gg(dis){
        //     let x = 0;
        //     const fnlist = [
        //         dis.fetchMultipage(),
        //         dis.fetchSinglepage(),
        //         dis.fetchReferencepage(),
        //         dis.fetchNavbar(),
        //         dis.fetchMininav(),
        //         dis.fetchNews(),
        //         dis.fetchGallery(),
        //         dis.fetchFooterMap(),
        //         dis.fetchJoblist(),
        //         dis.fetchJobinfo(),
        //     ]
        //     // const l = ;
        //     console.log(fnlist.length);

        //     function run(callback){
        //         if(x < fnlist.length){
        //             fnlist[x].done(function(){
        //                 x++;
        //                 callback().done(function(){
        //                     run(fnlist[x]);
        //                 });
        //             });
        //         }
        //     }
        //     run(fnlist[x]);
        // }

        // gg(this);

        
        console.log("START");
        
        
        
        

        

        this.fetchMultipage().done(()=>{
            this.fetchSinglepage().done(()=>{
                this.fetchReferencepage().done(()=>{
                    this.fetchNavbar().done(()=>{
                        this.fetchMininav().done(()=>{
                            this.fetchNews().done(()=>{
                                this.fetchGallery().done(()=>{
                                    this.fetchFooterMap().done(()=>{
                                        this.fetchJoblist().done(()=>{
                                            this.fetchJobinfo().done(()=>{
                                                callback();
                                                console.log('CALLING CB');
                                                
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
        
        
        
        
        
        
        
        

        // this.callback = callback;
        console.log("END");
    }


    fetchReport(text){
        console.log(text);
    }
    
    getProductModelByCid(cid){
        let ret = {};
        $.each(this.ProductModels, function(key, value){
            if(value.cid == cid){
                ret = value;
            }
        });
        return ret;
    }
    

    fetchMultipage(){
        const dfrd = $.Deferred();
        let ret = undefined;
        const dis = this;
        $.getJSON( `${domain}model/multipage.json`, function( data ) {
            ret = data;
        }).done(function(){
            dis.Multipage = ret;
            dis.fetchReport("done fetching Multipage");
            dfrd.resolve();
        });
        return dfrd.promise();
    }
    findMultipageObjByLink(link){
        let obj = undefined;
        $.each(this.Multipage, function(key, value){
            if(value.link == link){
                obj = value;
            }
        });
        return obj;
    }


    fetchSinglepage(){
        const dfrd = $.Deferred();
        let ret = undefined;
        const dis = this;
        $.getJSON( `${domain}model/singlepage.json`, function( data ) {
            ret = data;
        }).done(function(){
            dis.Singlepage = ret;
            dis.fetchReport("done fetching Singlepage");
            dfrd.resolve();
        });
        return dfrd.promise();
    }
    findSinglepageObjByLink(link){
        let obj = undefined;
        $.each(this.Singlepage, function(key, value){
            if(value.link == link){
                obj = value;
            }
        });
        return obj;
    }


    fetchReferencepage(){
        const dfrd = $.Deferred();
        let ret = undefined;
        const dis = this;
        $.getJSON( `${domain}model/referencepage.json`, function( data ) {
            ret = data;
        }).done(function(){
            dis.Referencepage = ret;
            dis.fetchReport("done fetching Referencepage");
            dfrd.resolve();
        });
        return dfrd.promise();
    }
    findReferencepageObjByLink(link){
        let obj = undefined;
        $.each(this.Referencepage, function(key, value){
            if(value.link == link){
                obj = value;
            }
        });
        return obj;
    }


    fetchNavbar(){
        const dfrd = $.Deferred();
        let ret = undefined;
        const dis = this;
        $.getJSON( `${domain}model/navbar.json`, function( data ) {
            ret = data;
        }).done(function(){
            dis.Navbar = ret;
            dis.fetchReport("done fetching Navbar");
            dfrd.resolve();
        });
        return dfrd.promise();
    }


    fetchMininav(){
        const dfrd = $.Deferred();
        let ret = undefined;
        const dis = this;
        $.getJSON( `${domain}model/mininav.json`, function( data ) {
            ret = data;
        }).done(function(){
            dis.Mininav = ret;
            dis.fetchReport("done fetching Mininav");
            dfrd.resolve();
        });
        return dfrd.promise();
    }
    findMininavByNavid(navid){
        let ret = undefined;
        $.each(this.Mininav, function(key, value){
            if(value.navid == navid){
                ret = value;
            }
        });
        return ret;
    }
    


    fetchNews(){
        const dfrd = $.Deferred();
        let ret = undefined;
        const dis = this;
        $.getJSON( `${domain}model/news.json`, function( data ) {
            ret = data;
        }).done(function(){
            dis.News = ret;
            dis.fetchReport("done fetching News");
            dfrd.resolve();
        });
        return dfrd.promise();
    }


    fetchGallery(){
        const dfrd = $.Deferred();
        let ret = undefined;
        const dis = this;
        $.getJSON( `${domain}model/gallery.json`, function( data ) {
            ret = data;
        }).done(function(){
            dis.Gallery = ret;
            dis.fetchReport("done fetching Gallery");
            dfrd.resolve();
        });
        return dfrd.promise();
    }


    fetchFooterMap(){
        const dfrd = $.Deferred();
        let ret = undefined;
        const dis = this;
        $.getJSON( `${domain}model/footer_map.json`, function( data ) {
            ret = data;
        }).done(function(){
            dis.FooterMap = ret;
            dis.fetchReport("done fetching FooterMap");
            dfrd.resolve();
        });
        return dfrd.promise();
    }


    fetchJoblist(){
        const dfrd = $.Deferred();
        let ret = undefined;
        const dis = this;
        $.getJSON( `${domain}model/recruitment_joblist.json`, function( data ) {
            ret = data;
        }).done(function(){
            dis.Joblist = ret;
            dis.fetchReport("done fetching Joblist");
            dfrd.resolve();
        });
        return dfrd.promise();
    }


    fetchJobinfo(){
        const dfrd = $.Deferred();
        let ret = undefined;
        const dis = this;
        $.getJSON( `${domain}model/recruitment_jobinfo.json`, function( data ) {
            ret = data;
        }).done(function(){
            dis.Jobinfo = ret;
            dis.fetchReport("done fetching Jobinfo");
            dfrd.resolve();
        });
        return dfrd.promise();
    }





}

class ScrollGallery{
    constructor(options){
        this.list = options.list;
        this.id = options.id;
        this.interval = undefined;
        this.marginleft = -222;
    }

    // usage
    html(){
        return `
            <div id="home-content-gallery" class="contactgallery">
                <div class="scroller ">
                    <!-- <div class="widget">
                        <img src="" alt="">
                        <span>CompanyName</span>
                    </div> -->
                </div>
            </div>
        `
    }
    list(){
        return [
            {
                "image" : "lib/images/gallery/galimg1.jpg",
                "text" : "Partner 1"
            },{
                "image" : "lib/images/gallery/galimg2.jpg",
                "text" : "Partner 2"
            },{
                "image" : "lib/images/gallery/galimg3.jpg",
                "text" : "Partner 3"
            },{
                "image" : "lib/images/gallery/galimg4.jpg",
                "text" : "Partner 4"
            },{
                "image" : "lib/images/gallery/galimg5.jpg",
                "text" : "Partner 5"
            },{
                "image" : "lib/images/gallery/gallery1.jpg",
                "text" : "Partner 6"
            }
        ]
    }

    fill(){
        const dis = this;
        // console.log(this.list, this.id);
        // $(`#${this.id}`).children('.scroller').empty().css('margin-left', '0px');
        $.each(this.list, function(key, value){
            // console.log("TEEEST ", value);
            $(`#${dis.id}`).children('.scroller').append(`
                <div class="widget">
                    <img src="${value.image}" alt="">
                    <span>${value.text}</span>
                </div>
            `);
        });
        setTimeout(() => {
            $.each(this.list, function(key, value){
                $(`#${dis.id}`).children('.scroller').append(`
                    <div class="widget">
                        <img src="${value.image}" alt="">
                        <span>${value.text}</span>
                    </div>
                `);
            });
        }, 0);
    }
    start(){
        let y = this.list.length;
        let z = 0;
        const dis = this;
        $(`#${dis.id}`).children('.scroller').css({
            "margin-left" : `$0px`
        });
        setTimeout(() => {
            $(`#${dis.id}`).children('.scroller').animate({
                "margin-left" : `${dis.marginleft}px`
            }, 4000, function(){
                dis.marginleft -= 222;
                if(z >= y){
                    z = 0;
                }
                $(`#${dis.id}`).children('.scroller').prepend(`<hr/>`).children('.widget')[0].remove();
                $(`#${dis.id}`).children('.scroller').append(`
                    <div class="widget">
                        <img src="${dis.list[z].image}" alt="">
                        <span>${dis.list[z].text}</span>
                    </div>
                `);
                z++;
            });  
            this.interval = setInterval(() => {
                $(`#${dis.id}`).children('.scroller').animate({
                    "margin-left" : `${dis.marginleft}px`
                }, 4000, function(){
                    dis.marginleft -= 222;
                    if(z >= y){
                        z = 0;
                    }
                    $(`#${dis.id}`).children('.scroller').prepend(`<hr/>`).children('.widget')[0].remove();
                    $(`#${dis.id}`).children('.scroller').append(`
                        <div class="widget">
                            <img src="${dis.list[z].image}" alt="">
                            <span>${dis.list[z].text}</span>
                        </div>
                    `);
                    z++;
                });  
            }, 5000);
        }, 100);
    }
    stop(){
        $(`#${this.id}`).children('.scroller').stop(true, true).empty().css('margin-left', '0px');
        this.marginleft = -222;
        clearInterval(this.interval);
        this.interval = undefined;
        // console.log(this.id);
    }

}