const viewportmeta = document.querySelector('meta[name="viewport"]');

let mode
let autolive,
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
      autolive = response.autolive;
      pagestate_ctrl(1)
      $('call_viewport').attr('content', 'width=device-width, initial-scale=1');
      console.log('client_mode: ' + mode);
      console.log('autolive: ' + autolive);
      //check the status of the autolive-checkbox...
      if (autolive == true) {
        $('table#operations td .autolive').prop("checked", true);
      } else {
        $('table#operations td .autolive').prop("checked", false);
      }
    },
    error: function(request, textStatus, errorThrown) {
      console.log('client_mode and autolive-status not reported')
    }
  });

  // Checkbox handler: autolive on/off
  $("#operations").on("click", ".autolive", function() {
    if ($(this).is(':checked')) {
      console.log("Autolive on");
      autolive = true;
      /*
      $('#stories tbody tr').each(function() {
        $(this).children().find("input[type='checkbox']").prop("checked", true);
      });
      */
    } else {
      console.log("Autolive off");
      autolive = false;
      /*
      $('#stories tbody tr').each(function() {
        $(this).children().find("input[type='checkbox']").prop("checked", false);
      });
      */
    }
    $.ajax({
      type: 'PUT',
      url: '/databases/autolive',
      contentType: 'application/json',
      data: JSON.stringify({
        autolive: autolive
      }),
      dataType: 'text',
      success: function(response) {
        console.log(response);
      },
      error: function(err) {
        console.log(err);
      }
    });
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
        dataType: 'JSON',
        success: function(response) {
          console.log('success');
          location.reload(response);
        },
        error: function(errorThrown) {
          console.log('error');
          console.log(errorThrown);

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
          console.log('error');
          console.log(errorThrown);
        }
      });
    }
  });

  // Button handler: storylive-status checkbox
  $("table#stories").on("click", ".storylive", function() {
    console.log('some stories autolive-checkbox was clicked');
    let storylive;
    if ($(this).is(':checked')) {
      console.log("Storylive true");
      storylive = true;
    } else {
      console.log("Storylive false");
      storylive = false;
    }

    let data = $(this).closest('tr').find("td:first-child").text()
    data = data.replace(/^\s+|\s+$/g, '');
    console.log('Story _id to change storylive-status: ' + data)
    //$(this).closest('tr').remove();
    $.ajax({
      type: 'PUT',
      url: '/databases/storylive',
      contentType: 'application/json',
      data: JSON.stringify({
        id: data,
        storylive: storylive
      }),
      dataType: 'JSON',
      success: function(response) {
        console.log('success');
        location.reload(response);
      },
      error: function(errorThrown) {
        console.log('error');
        console.log(errorThrown);
      }
    });
  });

});
