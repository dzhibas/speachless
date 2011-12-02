var counter = 1;
var $container = null;

function onLoad() {
  document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
  window.plugins.tts.startup(startupWin, fail);
}

function startupWin(result) {
  // When result is equal to STARTED we are ready to play
    if (result == TTS.STARTED) {
      window.plugins.tts.getLanguage(win, fail);
      navigator.notification.vibrate(60);
      window.plugins.tts.speak("At your service my master");
    }
  }
function startupFail(result) {
  console.log("Startup failure = " + result);
}

function speak(what) {
  window.plugins.tts.speak(what);
}

function win(result) {
  console.log(result);
}

function fail(result) {
    console.log("Error = " + result);
}

$(document).ready(function() {
  $container = $("#container");

  $('.item').click(function() {
      counter=counter+1;

      $container.isotope({ filter: '.type'+counter });
      if (counter > 3)
      {
        $("#showAllButtons").show();
      }

      var oldval = $("#playMe").val();
      $("#playMe").val( oldval + " " + $(this).text());

      navigator.notification.vibrate(60);

      if ($("#speak").is(":checked"))
        speak($(this).text());
  });
      
  $container.isotope({
    itemSelector : '.item'
  });

  $('#showAllButtons').click(function() {
      $(this).hide();
      counter = 1;
      $container.isotope({filter: ''});
  });

  $('#clearButton').click(function() {
    $("#playMe").val('');
    $('#showAllButtons').hide();
    $container.isotope({ filter: '' });
    counter = 1;
  });

  $("#speakButton").click(function() {
    speak($("#playMe").val());
  });
});