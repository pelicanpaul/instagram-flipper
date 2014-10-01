
/*
Author: Paul Lyons
2014.10.01
jQuery example of a creative way to display and Instagram feed
*/


var instagram = {
    displayInstagram: function (container, captionLength) {
        var checkInstagramLoad = setInterval(function () {
            if ($('.instagram-pic').is(":visible")) {
                clearInterval(checkInstagramLoad);

                var $container = $(container);

                $('.instagram-pic').wrap(function () {
                    return '<div class="flip-container"><div class="flipper"><a href="" target="_blank"></a></div></div>';
                });

                $container.find('.instagram-pic').each(function () {
                    var src = $(this).attr('rel')
                    var link = $(this).closest('a');
                    $(link).attr('href', src).attr('class', 'instagram-link');

                    var icon = '<i class="fa fa-instagram fa-2x icon-social"></i>';
                    var likes = '<span><i class="fa fa-heart icon-social-misc"></i>' + $(this).attr('data-likes') + '</span>';
                    var comments = '<span><i class="fa fa-comment icon-social-misc"></i> ' + $(this).attr('data-comments') + '</span><br /><br />';
                    var caption = $(this).attr('title');
                    var captionLen = caption.length;

                    if (caption.length > captionLength) {
                        caption = caption.substring(0, captionLength) + '...';
                    }

                    $(this).after('<div class="instagram-caption"></div>');
                    var captionDiv = $(this).next('.instagram-caption');
                    $(captionDiv).html(icon + likes + comments + caption);
                });
                $('.instagram-pic').addClass('instagram-pic-show');


            } else {
                console.log('loading...');
            }
        }, 1000);
    },

    getParameterByName: function (name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.search);
        if (results == null)
            return "";
        else
            return decodeURIComponent(results[1].replace(/\+/g, " "));
    }


};

$(document).ready(function () {

    var instagramUserid = instagram.getParameterByName('userid');

    if (instagramUserid != '') {
        $('#photosets').val(instagramUserid);
    } else {
        instagramUserid = 152721
    }

    $("#instagram").instagram('getStream', {
        count: 15,
        getUser: true,
        loadingMessage: '<span class="loading">loading...</span>',
        user: instagramUserid

    });

    instagram.displayInstagram('#instagram', 220);

    $('#photosets').on('change', function () {
        window.location = window.location.pathname + '?userid=' + $(this).val();
    })
});