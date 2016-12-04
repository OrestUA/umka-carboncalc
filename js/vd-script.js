var user={};
$(window).bind('beforeunload',function(){
  return 'are you sure you want to leave?';
});
$(function(){
    var currentQuestion=1;

    var mobileCurrentQuestion;

    if (window.matchMedia('only screen and (max-width: 425px)').matches)
      $('ol.Progress').remove();
    else
      $('.progress').remove();

    var marginGroupHeight=$('.question#q'+currentQuestion).height();
    $('.questionOption').css('margin-top', marginGroupHeight+'px');

    var marginItemHeight=$('.questionOptionVariant#qov'+currentQuestion).height()+10;
    $('#questionButton').css('margin-top', marginItemHeight+'px');
    $('#skipButton').css('margin-top', marginItemHeight+'px');

    $('.questionNum').text('Питання '+currentQuestion);

    var firstInput=$('.questionOptionVariant#qov'+currentQuestion).children().first().val();
    var lastInput=$('.questionOptionVariant#qov'+currentQuestion).children().last().val();

    $('#questionButton').click(function() {
          $("li#pb"+currentQuestion).removeClass('is-active');
          $("li#pb"+currentQuestion).addClass('is-complete');

          firstInput=$('.questionOptionVariant#qov'+currentQuestion).children().first().val();
          lastInput=$('.questionOptionVariant#qov'+currentQuestion).children().last().val();
          
            switch(currentQuestion) {
              case 1:
                user['rooms']=firstInput;
                break;
              case 2:
                user['roommates']=firstInput;
                break;
              case 3:
                user['electricity']=firstInput;
                break;
              case 4:
                user['gas']=firstInput;
                break;
              case 5:
                user['hotWater']=firstInput;
                break;
              case 6:
                user['carEngineVolume']=firstInput;
                user['carDistance']=lastInput;
                break;
              case 7:
                user['airTravel']=firstInput;
                break;
              case 8:
                user['age']=firstInput;
                break;
              case 9:
                user['gender']=$('input.gender:checked').val();
                break;
              case 10:
                user['salary']=$('input.salary:checked').val();
                sendFormData();
                break;
              default:
                break;
            }

          currentQuestion+=1;
          $("li#pb"+currentQuestion).addClass('is-active');
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
          $('#questionButton').css('margin-top', marginItemHeight+'px');
          $('#skipButton').css('margin-top', marginItemHeight+'px');
          $('.questionNum').text('Питання '+currentQuestion);

          mobileCurrentQuestion=10*(currentQuestion-1);
          $('#mobileProgressBar').css('width',mobileCurrentQuestion+'%');
    });

    function sendFormData() {
      // console.log(11, user);
      $.post( "http://172.23.76.243:8080/carboncalc", user, function(data) {
        console.log(data);
        // Put the object into storage
        localStorage.setItem('resultData', JSON.stringify(data));
        window.location.href = 'results.html';
      })
      .fail(function() {
        console.error( "error" );
      })
    }
});
