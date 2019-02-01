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
      if (mode == 'development') {
        console.log('client_mode: ' + mode);
        console.log('autolive: ' + autolive);
      }
      //check the status of the autolive-checkbox...
      if (autolive == true) {
        $('table#operations td .autolive').prop("checked", true);
      } else {
        $('table#operations td .autolive').prop("checked", false);
      }
    },
    error: function(request, textStatus, errorThrown) {
      if (mode == 'development') {
        console.log('client_mode and autolive-status not reported')
      }
    }
  });

  // Checkbox handler: autolive on/off
  $("#operations").on("click", ".autolive", function() {
    if ($(this).is(':checked')) {
      autolive = true;
    } else {
      autolive = false;
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
        if (mode == 'development') {
          console.log(response);
        }
      },
      error: function(err) {
        if (mode == 'development') {
          console.log(err);
        }
      }
    });
  });

  // Checkbox handler: refresh-images
  $("table#operations").on("click", ".refresh", function() {
    if (confirm("Sure you want to refresh all urls in database?")) {
      $.ajax({
        type: 'PUT',
        url: '/databases/refresh',
        dataType: 'text',
        success: function(response) {
          if (mode == 'development') {
            console.log(response);
          }
        },
        error: function(errorThrown) {
          if (mode == 'development') {
            console.log(errorThrown);
          }
        }
      });
    }
  });

  // Button handler: stories-clear
  $("table#operations").on("click", ".clear", function() {
    if (confirm("Sure you want to clear all stories from database?")) {
      $("table#stories > tbody").html("")
      $.ajax({
        type: 'DELETE',
        url: '/databases/clear',
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

  // Button handler: story-remove
  $("table#stories").on("click", ".remove", function() {
    if (confirm("Sure you want to remove this story from database?")) {
      let id = $(this).closest('tr').find("td:first-child").text()
      id = id.replace(/^\s+|\s+$/g, '');
      $(this).closest('tr').remove();
      $.ajax({
        type: 'DELETE',
        url: '/databases/remove',
        contentType: 'application/json',
        data: JSON.stringify({
          id: id
        }),
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

  // Button handler: storylive-status checkbox
  $("table#stories").on("click", ".storylive", function() {
    let storylive;
    if ($(this).is(':checked')) {
      storylive = true;
    } else {
      storylive = false;
    }
    let data = $(this).closest('tr').find("td:first-child").text()
    data = data.replace(/^\s+|\s+$/g, '');
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
  });

});
