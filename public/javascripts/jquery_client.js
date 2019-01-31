const viewportmeta = document.querySelector('meta[name="viewport"]');
let mode, // expect mode=='ENV for logging
  title,
  story,
  feedback
$(document).ready(function() {
  // Submit request for systems ENV-mode:
  $.ajax({
    type: 'GET',
    url: '/mode',
    dataType: 'JSON',
    success: function(response) {
      mode = response.mode;
      pagestate_ctrl(1);
      $('call_viewport').attr('content', 'width=device-width, initial-scale=1');
      if (mode == 'development') {
        console.log('client_mode: ' + mode);
      }
    },
    error: function(request, textStatus, errorThrown) {
      if (mode == 'development') {
        console.log('client_mode not reported')
      }
    }
  });
  // disable RETURN key in text areas
  document.getElementById('title').addEventListener('keydown', function(k) {
    if (k.keyCode == 13) {
      k.preventDefault();
      return false;
    }
  });
  document.getElementById('story').addEventListener('keydown', function(k) {
    if (k.keyCode == 13) {
      k.preventDefault();
      return false;
    }
  });
  // index-page
  $('#1').click(function() {
    pagestate_ctrl(2)
    setTimeout(function() {
      $('#story').focus();
    }, 1);
    return false;
  });
  // submission from story page
  $('#2').submit(function(e) {
    e.preventDefault();
    if ($('#story').val()) {
      story = $('#story').val()
      story = story.trim()
      pagestate_ctrl(3)
      setTimeout(function() {
        $('#title').focus();
      }, 1);
      return false;
    }
    //
    else {
      if (mode == 'development') {
        console.log("You have not entered a valid story yet")
      }
    }
  });
  // submission from title-page
  $('#3').submit(function(e) {
    //e.preventDefault();
    if ($('#title').val()) {
      title = $('#title').val()
      title = title.trim()
      //Submit the form via Ajax POST request:
      $.ajax({
        type: 'POST',
        url: '/add_title_story',
        contentType: 'application/json',
        data: JSON.stringify({
          title: title.toUpperCase(),
          story: story
        }),
        dataType: 'text',
        success: function(response) {
          if (mode == 'development') {
            console.log(response)
          }
        },
        error: function(err) {
          if (mode == 'development') {
            console.log(err)
          }
        }
      });
      pagestate_ctrl(4)
      return false;
    }
    //
    else {
      console.log("You have not entered a valid story yet")
    }
  });
  // goto story-page
  $('#Goto_Start').click(function() {
    $('#story').val("");
    $('#title').val("");
    pagestate_ctrl(2)
    setTimeout(function() {
      $('#story').focus();
    }, 1);
    return false;
  });
  // goto feedback-page
  $('#Goto_Feedback').click(function() {
    pagestate_ctrl(5)
    setTimeout(function() {
      $('#feedback').focus();
    }, 1);
    return false;
  });
  // submission from feedback-page
  $('#5').submit(function(e) {
    e.preventDefault();
    if ($('#feedback').val()) {
      feedback = $('#feedback').val()
      feedback = feedback.trim()
      //Submit the form via Ajax POST request:
      $.ajax({
        type: 'POST',
        url: '/add_feedback',
        contentType: 'application/json',
        data: JSON.stringify({
          feedback: feedback
        }),
        dataType: 'text',
        success: function(response) {
          if (mode == 'development') {
            console.log(response)
          }
        },
        error: function(err) {
          if (mode == 'development') {
            console.log(err)
          }
        }
      });
      pagestate_ctrl(4);
      return false;
    }
    //
    else {
      console.log("You have not entered valid feedback yet")
    }
  });

});
