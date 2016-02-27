(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

function hover(element) {
    element.setAttribute('src', "../images/GitHub_Logo1.png");
}
function unhover(element) {
    element.setAttribute('src', "../images/GitHub_Logo.png");
}
function hover2(element) {
    element.setAttribute('src', "../images/fb1.png");
}
function unhover2(element) {
    element.setAttribute('src', "../images/fb.png");
}