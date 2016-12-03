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

    $(document).on('click', '.rm-button', function(){
        image = $(this).data('path');

        for(var i = arr_img.length - 1; i >= 0; i--) {
            if(arr_img[i] === image) {
               arr_img.splice(i, 1);

            }
        }

        $(this).parent().remove();
        $('li[data-path="'+image+'"]').remove();
        $('#previewSlider').trigger('click');

        $("#topico_imagens").val(arr_img);

    });

    $(document).on('change', '.largura', function(){
        console.log('qqlr merda aí');
        var valor = $(this).find('option:selected').val();
        if(valor == "full"){
            $('.largura-max').attr('disabled', 'disabled');
            $('.largura-max').val(0);
        }

        if(valor == "pixel" || valor=="percent"){
            $('.largura-max').removeAttr('disabled');
        }

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

            $('.topico-banners-preview').append('<div class="item-preview"><img src="'+image_url+'" /> <button class="rm-button" data-path='+imagePath+'>x</button></div>');

            var numSlides = $('.banner-live-preview .bxslider li').length;

            $('.banner-live-preview .bxslider').append('<li data-path="'+imagePath+'">'
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