const viewportmeta = document.querySelector('meta[name="viewport"]');
let mode // expect mode=='ENV for logging
let title
let story
let feedback
$(document).ready(function() {
  // Submit request for systems ENV-mode:
  $.ajax({
    type: 'GET',
    url: '/mode',
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
  // Button-delete handler:
  $("table#feedback").on("click", ".remove", function () {
    if (confirm("Click OK to delete row?")) {
      let data = $(this).closest('tr').find("td:nth-child(3)").text()
      data = data.replace(/^\s+|\s+$/g, '');
      console.log('Selected to delete: ' + data)
      $(this).closest('tr').remove();
      // Submit request for systems ENV-mode:
      $.ajax({
        type: 'DELETE',
        url: '/databases',
        contentType: 'application/json',
        data: JSON.stringify({
          data: data
        }),
        dataType: 'JSON'
      });
    }
  });
});
