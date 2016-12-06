var user={};
var gender='';
var salary='';
var airTravel;
var innerHeight=$('.innerContainer').height();
var ENDPOINT_URI = 'http://172.23.76.243:8080/carbon_footprint';
// $(window).bind('beforeunload',function(){
//   return 'Are you sure you want to leave?';
// });

$('#no-travel').click(function() {
  if ($('#no-travel').prop('checked')) {
    $('.travel').each(function() {
      $(this).attr('disabled', true).parent().removeClass('questionOptionVariantBad').addClass('questionOptionVariantGood');
    });
  }
  else {
    $('.travel').each(function() {
      $(this).attr('disabled', false).parent().removeClass('questionOptionVariantGood').removeClass('questionOptionVariantBad');
    });
  }
});

$('#no-car').click(function() {
  if ($('#no-car').prop('checked')) {
    $('.car').each(function() {
      $(this).attr('disabled', true).css('border-color', '#bdc3c7');
    });
  }
  else {
    $('.car').each(function() {
      $(this).attr('disabled', false);
    });
  }
});

$('.gender').click(function() {
  gender=$(this).val();
});

$('.salary').click(function() {
  salary=$(this).val();
});

$("input[type=checkbox]").click(function() {
  if($(this).prop('checked'))
    $(this).parent().addClass('questionOptionVariantCurrent');
  else
    $(this).parent().removeClass('questionOptionVariantCurrent');
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
          firstInput=$('.questionOptionVariant#qov'+currentQuestion).children().first().val();
          var travel='';
          var engine="lorem ipsum";
          var kilos="lorem ipsum";
          if($('#no-car').prop('checked')){
            engine='0.0';
            kilos='0.0';
          }
          else {
            engine=$('#engine').val();
            kilos=$('#kilos').val();
          }
          if($('#no-travel').prop('checked')){
            travel=$('#no-travel').val();
            airTravel=false;
          }
          else {
            airTravel=true;
            $('input.travel:checked').each(function() {
              travel+=$(this).val()+', ';
            });
            travel=travel.substring(0, travel.length - 2);
          }
          var errorInput='Неправильний ввід даних, будь ласка, повторіть ще раз.';
          var questionText=$('.question#q'+currentQuestion).text();
            switch(currentQuestion) {
              case 1:
                if (!$.isNumeric(firstInput)){
                  $('#rooms').css('border-color','tomato');
                  return;
                }
                user['rooms']=parseInt(firstInput);
                break;
              case 2:
                if (!$.isNumeric(firstInput)){
                  $('#roommates').css('border-color','tomato');
                  return;
                }
                user['roommates']=parseInt(firstInput);
                break;
              case 3:
                if (!$.isNumeric(firstInput)){
                  $('#electricity').css('border-color','tomato');
                  return;
                }
                user['electricity']=parseFloat(firstInput);
                break;
              case 4:
                if (!$.isNumeric(firstInput)){
                  $('#gas').css('border-color','tomato');
                  return;
                }
                user['gas']=parseFloat(firstInput);
                break;
              case 5:
                if (!$.isNumeric(firstInput)){
                  $('#hotWater').css('border-color','tomato');
                  return;
                }
                user['hotWater']=parseFloat(firstInput);
                break;
              case 6:
                if (!$.isNumeric(kilos)){
                  $('#kilos').css('border-color','tomato');
                  return;
                }
                if (!$.isNumeric(engine)){
                  $('#engine').css('border-color','tomato');
                  return;
                }
                user['carEngineVolume']=parseFloat(engine);
                user['carDistance']=parseFloat(kilos);
                break;
              case 7:
                if (travel=='') {
                  $('.questionOptionVariant#qov'+currentQuestion).addClass('questionOptionVariantBad');
                  return;
                }
                if(!airTravel)
                  travel='';
                user['countries']=travel;
                user['airTravel']=airTravel;
                break;
              case 8:
                if (!$.isNumeric(firstInput)){
                  $('#age').css('border-color','tomato');
                  return;
                }
                user['age']=parseInt(firstInput);
                break;
              case 9:
                if (gender=='') {
                  $('.questionOptionVariant#qov'+currentQuestion).css('color','tomato');
                  return;
                }
                user['gender']=gender;
                break;
              case 10:
                if (salary=='') {
                  $('.questionOptionVariant#qov'+currentQuestion).css('color','tomato');
                  return;
                }
                user['salary']=salary;
                return sendFormData();
              default:
                break;
            }
          $("li#pb"+currentQuestion).removeClass('is-active');
          $("li#pb"+currentQuestion).addClass('is-complete');
          var add;
          if(currentQuestion==5){
            add=innerHeight+50;
            $('.innerContainer').height(add);
          }
          if(currentQuestion==6)
          {
            add=innerHeight+120;
            $('.innerContainer').height(add);
            $('.not-index').height($('.not-index').height()+100);
          }
          if(currentQuestion==7)
          {
            $('.innerContainer').height(innerHeight);
            $('.not-index').height($('.not-index').height()-100);
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
      user.name = localStorage.getItem('name');
      user.email = localStorage.getItem('email');
      user.subscription = JSON.parse(localStorage.getItem('subscription'));
      $.ajax({
          type : "POST",
          url : ENDPOINT_URI,
          contentType: "application/json; charset=utf-8",
          data : JSON.stringify(user),
          success : function(data) {
            // Put the object into storage
            localStorage.setItem('resultData', JSON.stringify(data));
            window.location.href = 'results.html';
          },
          error : function(error) {
            console.error( "error" );
          },
      });
    }
});
