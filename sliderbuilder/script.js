var media_uploader = null;
var arr_img = [];
var $ = jQuery;
/*pathArray = location.href.split( '/' );
    protocol = pathArray[0];
    host = pathArray[2];
    url = protocol + '//' + host;
*/

$(document).ready(function(){
    var slider = $('.bxslider').bxSlider();

    $('input[name=topico_nome]').keyup(function(){
        $('.short').text($(this).val());
    });

    $('#previewSlider').click(function(e){

        e.preventDefault();
        slider.reloadSlider();
                
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

            $('.topico-banners-preview').append('<img src="'+image_url+'" style="max-width:200px; height:auto;" />');

            var numSlides = $('.banner-live-preview .bxslider li').length;

                $('.banner-live-preview .bxslider').append('<li>'
                              +'<img src="'+image_url+'">'
                            +'</li>');

                $('#previewSlider').trigger('click');
/*            

            $('.topico-banners-preview img').each(function(){
                arr_img.push($(this).attr('src')); 
            });*/

            arr_img.push(imagePath);

            console.log(arr_img);

            $("#topico_imagens").val(arr_img);

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

        $('.topico-banners-preview-mobile').append('<img src="'+image_url+'" />');

        var numSlidesmobile = $('.banner-live-mobile-preview .carousel-inner .item.active').length;

        if(numSlidesmobile < 1){
            $('.banner-live-mobile-preview .carousel-inner').append('<div class="item active">'
                          +'<img src="'+image_url+'">'
                        +'</div>');
            $('.banner-live-mobile-preview .carousel-control').hide();

         }else{
            $('.banner-live-mobile-preview .carousel-inner').append('<div class="item">'
                          +'<img src="'+image_url+'">'
                        +'</div>');
            $('.banner-live-mobile-preview .carousel-control').show();

         }

        

        /*.banner-live-preview .carousel-inner*/
/*
        arr_mobile_img.push(); 


        console.log(arr_img);
        $("#topico_imagens_mobile").val(arr_img);

    });

    media_uploader_mobile.open();
}*/