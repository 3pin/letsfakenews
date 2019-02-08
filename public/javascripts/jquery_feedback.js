const viewportmeta = document.querySelector('meta[name="viewport"]');
let mode // expect mode=='ENV for logging
let title
let story
let feedback
$(document).ready(function() {
  // Submit request for systems ENV-mode:
  $.ajax({
    type: 'GET',
    url: '/settings/mode',
    dataType: 'JSON',
    success: function(response) {
      mode = response
      pagestate_ctrl(1)
      $('call_viewport').attr('content', 'width=device-width, initial-scale=1');
      console.log('client_mode: ' + mode)
    },
    error: function(request, textStatus, errorThrown) {
      console.log('client_mode not reported')
    }
  });

  // Button handler: stories-clear
  $("table#operations").on("click", ".clear", function() {
    if (confirm("Sure you want to clear all stories from database?")) {
      $("table#stories > tbody").html("")
      $.ajax({
        type: 'DELETE',
        url: '/databases/feedback_clear',
        dataType: 'JSON',
        success: function(response) {
          if (mode == 'development') {
            console.log('success');
          }
          //location.reload(response);
        },
        error: function(errorThrown) {
          if (mode == 'development') {
            console.log(errorThrown);
          }
        }
      });
    }
  });

});
