var media_uploader = null;
var arr_img = [];
/*pathArray = location.href.split( '/' );
    protocol = pathArray[0];
    host = pathArray[2];
    url = protocol + '//' + host;
*/

jQuery(document).ready(function(){
    jQuery('input[name=topico_nome]').keyup(function(){
        jQuery('.short').text(jQuery(this).val());
    });
});

function open_media_uploader_image(){
        media_uploader = wp.media({
            frame:    "post", 
            state:    "insert", 
            multiple: false
        });

        media_uploader.on("insert", function(){
            var json = media_uploader.state().get("selection").first().toJSON();

            console.log(json);

            var parcialUrl = json.url.split("/");

            var imagePath = parcialUrl[parcialUrl.length - 5] +"/"+parcialUrl[parcialUrl.length - 4] +"/"+parcialUrl[parcialUrl.length - 3] + "/" + parcialUrl[parcialUrl.length - 2] + "/" + json.filename;
            console.log(imagePath);

            var image_url = json.url;
            var image_caption = json.caption;
            var image_title = json.title;

            jQuery('.topico-banners-preview').append('<img src="'+image_url+'" style="max-width:200px; height:auto;" />');

            var numSlides = jQuery('.banner-live-preview .carousel-inner .item.active').length;

            if(numSlides < 1){
                jQuery('.banner-live-preview .carousel-inner').append('<div class="item active">'
                              +'<img src="'+image_url+'">'
                            +'</div>');
                jQuery('.banner-live-preview .carousel-control').hide();

             }else{
                jQuery('.banner-live-preview .carousel-inner').append('<div class="item">'
                              +'<img src="'+image_url+'">'
                            +'</div>');
                jQuery('.banner-live-preview .carousel-control').show();

             }  

/*            

            jQuery('.topico-banners-preview img').each(function(){
                arr_img.push(jQuery(this).attr('src')); 
            });*/

            arr_img.push(imagePath);

            console.log(arr_img);

            jQuery("#topico_imagens").val(arr_img);

        });

        media_uploader.open();
}


/*function open_media_uploader_image_mobile(){
    media_uploader_mobile = wp.media({
        frame:    "post", 
        state:    "insert", 
        multiple: false
    });

    media_uploader_mobile.on("insert", function(){
        var json = media_uploader_mobile.state().get("selection").first().toJSON();

        var parcialUrl = json.url.split("/");

        var imagePath = parcialUrl[parcialUrl.length - 5] +"/"+parcialUrl[parcialUrl.length - 4] +"/"+parcialUrl[parcialUrl.length - 3] + "/" + parcialUrl[parcialUrl.length - 2] + "/" + json.filename;
        console.log(imagePath);

        var image_url = json.url;
        var image_caption = json.caption;
        var image_title = json.title;

        jQuery('.topico-banners-preview-mobile').append('<img src="'+image_url+'" />');

        var numSlidesmobile = jQuery('.banner-live-mobile-preview .carousel-inner .item.active').length;

        if(numSlidesmobile < 1){
            jQuery('.banner-live-mobile-preview .carousel-inner').append('<div class="item active">'
                          +'<img src="'+image_url+'">'
                        +'</div>');
            jQuery('.banner-live-mobile-preview .carousel-control').hide();

         }else{
            jQuery('.banner-live-mobile-preview .carousel-inner').append('<div class="item">'
                          +'<img src="'+image_url+'">'
                        +'</div>');
            jQuery('.banner-live-mobile-preview .carousel-control').show();

         }

        

        /*.banner-live-preview .carousel-inner*/
/*
        arr_mobile_img.push(); 


        console.log(arr_img);
        jQuery("#topico_imagens_mobile").val(arr_img);

    });

    media_uploader_mobile.open();
}*/