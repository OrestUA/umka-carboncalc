$(function(){
    var currentQuestion=1;
    var marginGroupHeight=$('.question#q'+currentQuestion).height();
    var marginItemHeight=$('.questionOptionVariant#qov'+currentQuestion).height()+10;
    $('.questionOption').css('margin-top', marginGroupHeight+'px');
    $('.questionButton').css('margin-top', marginItemHeight+'px');
    $('.questionNum').text('Питання '+currentQuestion);
    $('.questionButton').click(function() {
      $(".pbarItem#pb"+currentQuestion).removeClass('pbarItemCurrent');
      $(".pbarItem#pb"+currentQuestion).addClass('pbarItemVisited');
      currentQuestion+=1;
      $(".pbarItem#pb"+currentQuestion).addClass('pbarItemCurrent');
      $('.question').each(function() {
        $(this).css('visibility','hidden');
      });
      $('.questionOptionVariant').each(function() {
        $(this).css('visibility','hidden');
      });
      $('.question#q'+currentQuestion).css('visibility','visible');
      $('.questionOptionVariant#qov'+currentQuestion).css('visibility','visible');
       marginGroupHeight=$('.question#q'+currentQuestion).height();
       marginItemHeight=$('.questionOptionVariant#qov'+currentQuestion).height()+10;
      $('.questionOption').css('margin-top', marginGroupHeight+'px');
      $('.questionButton').css('margin-top', marginItemHeight+'px');
      $('.questionNum').text('Питання '+currentQuestion);
    });

});
