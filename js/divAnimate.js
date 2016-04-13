jQuery(function($) {

    $('event-title').on('hover',function() {
        var $target = $(this).next('.div'),
            animIn = function () {
                $target.addClass('active').show().css({
                    left: -($target.width())
                }).animate({
                    left: 0
                }, 500);
            };

        if (!$target.hasClass('active')) {
            $other.removeClass('active').animate({
                    left: -$this.width()
                }, 500, animIn);
        } else if (!$target.hasClass('active')) {
            animIn();
        }
    });

});
