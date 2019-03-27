let mode // expect mode=='ENV for logging
let feedback
$(document).ready(function() {
  // Submit request for systems ENV-mode:
  $.ajax({
    type: 'GET',
    url: '/settings/mode',
    dataType: 'JSON',
    success: function(response) {
      mode = response.mode;
      pagestate_ctrl(1);
      $('call_viewport').attr('content', 'width=device-width, initial-scale=1');
      console.log('client_mode: ' + mode);
    },
    error: function(request, textStatus, errorThrown) {
      console.log('client_mode not reported');
    }
  });

  // Button handler: stories-clear
  $("table#ops_feedback").on("click", ".clear", function() {
    if (confirm("Sure you want to clear all entries from database?")) {
      $.ajax({
        type: 'DELETE',
        url: '/databases/feedback_clear',
        dataType: 'JSON',
        success: function(response) {
          $("table#feedback > tbody").html("")
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
