$(".expand_menu").click(function(){
    //alert($(".menu_item").css("display"))
    if ($(".menu_item").css("display") == "none") {
      $(".menu_item").css("display", "block")
    }
    else {
     $(".menu_item").css("display", "none")
    }
  })
  $(window).resize(function() {
    if ($(".expand_menu").css("display") == "none") {
      $(".menu_item").css("display", "block")
    }
    else {
      $(".menu_item").css("display", "none")
    }
  });
  $('#main').on('scroll', function() {
    $('#menu_item_text_left').toggleClass("hovered");
  })
  $('#corpus').on('scroll', function() {
    $('#corpus_link').toggleClass("hovered");
  })