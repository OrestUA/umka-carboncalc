$(function(){
    var currentQuestion=1;
    var marHeight=$('.question#q'+currentQuestion).height();
    $('.questionOption').css('margin-top',marHeight+'px');
    $('.questionNum').text('Питання '+currentQuestion);
    $('.questionButton').click(function() {
      currentQuestion+=1;
      $(".pbarItem#pb"+currentQuestion).addClass('pbarItemCurrent');
      $('.question').each(function() {
        $(this).css('visibility','hidden');
      });
      $('.question#q'+currentQuestion).css('visibility','visible');
      marHeight=$('.question#q'+currentQuestion).height();
      $('.questionOption').css('margin-top',marHeight+'px');
      $('.questionNum').text('Питання '+currentQuestion);
    });

});
