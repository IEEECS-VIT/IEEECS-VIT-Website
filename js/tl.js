$(document).ready(function() {
    $("#2014").hide();
    $("#2015").hide();
    $("#2016").hide();
    $("#2017").hide();
    $("#date1").click(function () {
        $("#2014").slideToggle("slow");
        $("#2015").hide();
        $("#2016").hide();
    });
    $("#date2").click(function(){
        $("#2014").fadeOut();
        $("#2015").slideToggle("slow");
    });
    $("#date3").click(function(){
        $("#2014").fadeOut();
        $("#2015").fadeOut();
        $("#2016").slideToggle("slow");
    });
    $("#date6").click(function(){
       $("#2014").fadeOut();
        $("#2015").fadeOut();
        $("#2016").fadeOut();
        $("#2017").slideToggle("slow");

    });

});