$('.components-navigation a').on('click', function(){
  $('.components-navigation a').removeClass('components-active');
  $(this).addClass('components-active');
})