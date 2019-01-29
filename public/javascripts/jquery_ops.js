const viewportmeta = document.querySelector('meta[name="viewport"]');
let mode // for non-production debugging
let title
let story
let feedback
$(document).ready(function() {
  // Submit request for systems ENV-mode:
  $.ajax({
    type: 'GET',
    url: '/mode',
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
  $("table#operations").on("click", ".remove", function() {
    console.log('clear button clicked');
    if (confirm("OK to clear all stories from database?")) {
      $.ajax({
        type: 'DELETE',
        url: '/databases/clear',
        success: function(response) {
          console.log('success');
          location.reload(response);
        },
        error: function(errorThrown) {
          console.log('failure' + errorThrown);
        }
      });
    }
  });

  // Button handler: story-delete
  $("table#stories").on("click", ".remove", function() {
    console.log('remove button clicked');
    if (confirm("OK to remove story from database?")) {
      let data = $(this).closest('tr').find("td:first-child").text()
      data = data.replace(/^\s+|\s+$/g, '');
      console.log('Selected to delete: ' + data)
      //$(this).closest('tr').remove();
      $.ajax({
        type: 'DELETE',
        url: '/databases/remove',
        contentType: 'application/json',
        data: JSON.stringify({
          data: data
        }),
        dataType: 'JSON',
        success: function(response) {
          console.log('success');
          location.reload(response);
        },
        error: function(errorThrown) {
          console.log('failure' + errorThrown);
        }
      });
    }
  });

});
