$(document).ready(function() {
  // define time-regions for pop-up-title, text-display, image-display
  var popupStart = 6.2;
  var popupEnd = 11.3;
  var popup_duration = popupEnd - popupStart;
  var imagesStart = 17.6;
  var imagesEnd = 41.1;
  var image_duration = imagesEnd - imagesStart;
  // object to hold data fetched from database
  var data
  // array to store the image-URLS
  var urls = []
  // array to stores a time-marker per image-URL
  var markers = []
  // array index for currently-displayed image from url-array
  var url_index;
  // video object defined on startup
  var vid = document.getElementById("videoPlayer");

  // Submit request for systems ENV-mode:
  var mode
  $.ajax({
    type: 'GET',
    url: '/settings/mode',
    dataType: 'JSON',
    success: function(response) {
      mode = response.mode
      if (mode == 'development') {
        console.log('client_mode: ' + mode);
        console.log('showing video controls');
      } else {
        console.log('client_mode: ' + mode);
        vid.removeAttribute('controls');
        console.log('hiding video controls');
      }
    },
    error: function(request, textStatus, errorThrown) {
      if (mode == 'development') {
        console.log('client_mode not reported');
      }
    }
  });

  // on loadup...
  vid.onloadedmetadata = function() {
    // parse returned JSON from database
    data = <%-JSON.stringify(data)%>;
    if (mode == 'development') {
      console.log(data);
    }
    // pass title/story to HTML
    let title = storydata(data).title;
    let story = storydata(data).story;
    document.getElementById("popup_title_text").innerHTML = title;
    document.getElementById("scroller_text").innerHTML = story;
    urls = metadata(data, image_duration, imagesStart).urls
    markers = metadata(data, image_duration, imagesStart).markers
    // setup the first image
    url_index = 0
    document.getElementById("image").src = urls[url_index];
  };

  // during playback...
  $("#videoPlayer").on("timeupdate", function(event) {
    let currentTime = this.currentTime;
    // multimedia according to markers...
    if (currentTime >= markers[url_index]) {
      url_index++;
      if (url_index < urls.length) {
        if (mode == 'development') {
          console.log('New url_index: ' + url_index);
        }
        document.getElementById("image").src = urls[url_index];
      }
    }
    // control interface visibility...
    if (currentTime <= popupStart) {
      // times to jump to time during DEVELOPMENT
      if (mode == 'development') {
        // jump to title
        //this.currentTime = 7.0;
        // jump to story
        //this.currentTime = 16.0;
      }
    } else if (currentTime >= popupStart && currentTime <= popupEnd) {
      $("#popup_title").show()
    } else if (currentTime >= imagesStart && currentTime <= imagesEnd) {
      $("#image_frame").show()
      $("#image").show()
      $("#scroller").show()
    } else {
      $("#popup_title").hide()
      $("#image_frame").hide()
      $("#image").hide()
      $("#panel_title").hide()
      $("#scroller").hide()
    }
  });

  // on re-loadup...
  $("#videoPlayer").on("ended", function(event) {
    if (mode == 'development') {
      console.log('video ended... seeking new db-data ');
    }
    //location.reload(true);
    //window.location.reload(true);
    $.get("displays/request_new_story", function(data, status) {
      if (mode == 'development') {
        console.log(data);
      }
      // on-re-start reload metadata
      var vid = document.getElementById('videoPlayer');
      vid.onloadedmetadata = function() {
        // pass title/story to HTML
        let title = storydata(data).title;
        let story = storydata(data).story;
        document.getElementById("popup_title_text").innerHTML = title;
        document.getElementById("scroller_text").innerHTML = story;
        urls = metadata(data, image_duration, imagesStart).urls
        markers = metadata(data, image_duration, imagesStart).markers
        // setup the first image
        url_index = 0
        document.getElementById("image").src = urls[url_index];
      };
      // restart video
      vid.currentTime = 0;
      vid.load();
    });
  });
  $('#btnFullscreen').click(function() {
    vid.play();
    let i = document.getElementById('videoContainer');
    // go full-screen with cross-browser support
    if (i.requestFullscreen) {
      i.requestFullscreen();
    } else if (i.webkitRequestFullscreen) {
      i.webkitRequestFullscreen();
    } else if (i.mozRequestFullScreen) {
      i.mozRequestFullScreen();
    } else if (i.msRequestFullscreen) {
      i.msRequestFullscreen()
    }
  });
});
