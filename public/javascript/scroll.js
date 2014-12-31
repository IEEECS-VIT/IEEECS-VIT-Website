/**
 * Created by Ayush Agarwal on 31/12/14.
 */
/* Navigation Click Action */
$(document).ready(function () {
    $('.scroll-link').on('click', function (event) {
        event.preventDefault();
        var sectionID = $(this).attr("data-id");
        scrollToID('#' + sectionID, 750);
        $('#go-top').show('slow');
    });
    $('#go-top').hide();
});
/* Scroll Function */
function scrollToID(id, speed) {
    var offSet = 50;
    var targetOffset = $(id).offset().top - offSet;
    $('html,body').animate({scrollTop: targetOffset}, speed);
}