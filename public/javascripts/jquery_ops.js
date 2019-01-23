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
  // Button-delete handler:
  $("table#stories").on("click", ".remove", function() {
    if (confirm("Click OK to delete row?")) {
      let data = $(this).closest('tr').find("td:first-child").text()
      data = data.replace(/^\s+|\s+$/g, '');
      console.log('Selected to delete: ' + data)
      //$(this).closest('tr').remove();
      // Submit request for systems ENV-mode:
      $.ajax({
        type: 'DELETE',
        url: '/databases',
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
