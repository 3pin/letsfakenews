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

      //check the status of the autolive-checkbox...
      if (sessionStorage.getItem('autolive') == 'on') {
        console.log("Autolive on");
        $('table#operations td .autolive').prop("checked", true);
      } else if (sessionStorage.getItem('autolive') == 'off') {
        console.log("Autolive off");
        $('table#operations td .autolive').prop("checked", false);
      } else if (sessionStorage.getItem('autolive') == null) {
        console.log("Autolive off");
        sessionStorage.setItem('autolive', 'off')
        $('table#operations td .autolive').prop("checked", false);
      }
    },
    error: function(request, textStatus, errorThrown) {
      console.log('client_mode not reported')
    }
  });

  // Checkbox handler: autolive on/off
  $("#operations").on("click", ".autolive", function() {

    if ($(this).is(':checked')) {
      console.log("Autolive on");
      sessionStorage.setItem('autolive', 'on');
      $.ajax({
        type: 'POST',
        url: '/databases/autolive',
        contentType: 'application/json',
        data: JSON.stringify({
          autolive: sessionStorage.getItem('autolive')
        }),
        dataType: 'JSON',
        success: function(response) {
          console.log(response);
        },
        error: function(err) {
          console.log(err);
        }
      });
      /*
      $('#stories tbody tr').each(function() {
        $(this).children().find("input[type='checkbox']").prop("checked", true);
      });
      */
    } else {
      console.log("Autolive off");
      sessionStorage.setItem('autolive', 'off');
      $.ajax({
        type: 'POST',
        url: '/databases/autolive',
        contentType: 'application/json',
        data: JSON.stringify({
          autolive: sessionStorage.getItem('autolive')
        }),
        dataType: 'JSON',
        success: function(response) {
          console.log(response);
        },
        error: function(err) {
          console.log(err);
        }
      });
      /*
      $('#stories tbody tr').each(function() {
        $(this).children().find("input[type='checkbox']").prop("checked", false);
      });
      */
    }
  });

  // Checkbox handler: refresh-images
  $("table#operations").on("click", ".refresh", function() {
    console.log('refresh-images button clicked');
    /*
    if (confirm("OK to refresh images?")) {
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
    */
  });

  // Button handler: stories-clear
  $("table#operations").on("click", ".clear", function() {
    console.log('clear-stories button clicked');
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

  // Button handler: story-remove
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
